#!/usr/bin/env node
/**
 * prune-audit.js — The Tier 3 Pruning-Audit surfacer for adoptedbygrace.net
 *
 * Companion to strategic-audit.js. Where strategic-audit.js TIERS pages,
 * this script SURFACES candidates for cut-or-elevate decisions per
 * HAMMER-EXPANSION.md §"Tier 3 — The Pruning Audit."
 *
 * THIS SCRIPT IS A SURFACER, NOT A MUTATOR.
 *
 * It reads `audit-data.json`, scans the live HTML for HAMMER-LOCKED /
 * POLISH-LOCKED markers, classifies every non-INFRA page into one of four
 * dispositions per the §Tier 3 cut/elevate criteria, and writes a ranked
 * candidate ledger to `PRUNE-CANDIDATES.md`.
 *
 * No HTML is touched. No file is deleted. The ledger is the deliverable —
 * a future audit-execution session walks the ledger top-down with Aaron's
 * sign-off and runs the actual cuts (or elevates a page back into Tier 1).
 *
 * Dispositions:
 *
 *   RETIRE-STUB         — words < 500 AND inbound ≤ 2. Below publication grade.
 *                         (Tier-3 cut criterion: "Stub or abandoned drafts that
 *                         never reached publication quality.")
 *
 *   RETIRE-LOW-VALUE    — wordCount < 700 AND inbound ≤ 1. Almost no internal
 *                         pull and not enough body to carry a reader. The wiring
 *                         can be redirected; the page can come down.
 *                         (Tier-3 cut criterion: "Pages that exist only because
 *                         old wiring depended on them.")
 *
 *   MERGE-CANDIDATE     — explicit duplicate-pair mappings flagged by
 *                         MISSION-CONTROL.md §Phase 1 + same-stem siblings
 *                         across `apologetic-` / `question-` / `objection-` /
 *                         `pastoral-`. Merge the weaker into the stronger.
 *                         (Tier-3 cut criterion: "Duplicate or near-duplicate
 *                         to a stronger page.")
 *
 *   ELEVATE             — high inbound (≥ 6) but body small (< 1500 words),
 *                         AND not yet HAMMER-LOCKED or POLISH-LOCKED. These
 *                         pages carry load with too little muscle. Promote
 *                         to Tier 1 for a full rebuild.
 *                         (Tier-3 elevate criterion: "Pages carrying a
 *                         load-bearing argument not covered elsewhere.")
 *
 *   KEEP-AS-IS          — passes thresholds; not a Tier 3 candidate this run.
 *                         Reported only as the residual count, not enumerated.
 *
 * The script is idempotent — re-running it produces the same ledger from the
 * same audit snapshot. Re-run after any pruning session to see the new state.
 *
 * Usage: node prune-audit.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const AUDIT_PATH = path.join(ROOT, 'audit-data.json');
const OUT_PATH = path.join(ROOT, 'PRUNE-CANDIDATES.md');

// ─── Inputs ────────────────────────────────────────────────────────

if (!fs.existsSync(AUDIT_PATH)) {
  console.error('✗ audit-data.json missing. Run `node strategic-audit.js` first.');
  process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(AUDIT_PATH, 'utf8'));
const pages = audit.pages || {};

// ─── Locked-page detection (single pass over disk) ─────────────────

const HAMMER_LOCKED = new Set();
const POLISH_LOCKED = new Set();

// Markers sit immediately after `<article class="article-body">`. On typical
// pages that opening tag lands ~150 lines in (the head + nav template are
// large), so the marker can sit 6–10 KB into the file. Read a generous
// 24 KB head — well past any plausible nav-template length, still cheap.
for (const file of Object.keys(pages)) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) continue;
  const stat = fs.statSync(fp);
  const readLen = Math.min(stat.size, 24576);
  const fd = fs.openSync(fp, 'r');
  const buf = Buffer.alloc(readLen);
  fs.readSync(fd, buf, 0, readLen, 0);
  fs.closeSync(fd);
  const head = buf.toString('utf8');
  if (head.includes('HAMMER-LOCKED')) HAMMER_LOCKED.add(file);
  else if (head.includes('POLISH-LOCKED')) POLISH_LOCKED.add(file);
}

// ─── Explicit known merge pairs (from MISSION-CONTROL.md Phase 1) ─

// Format: [weaker → stronger]. Stronger wins. Weaker is the merge candidate.
const KNOWN_MERGE_PAIRS = [
  ['apologetic-perseverance.html', 'question-perseverance.html'],
  ['apologetic-evangelism.html',   'pastoral-evangelism.html'],
  ['apologetic-babies.html',       'objection-babies.html'],
];

// Same-stem sibling detection across these prefix families.
// If two pages share the same trailing stem after one of these prefixes,
// the lower-inbound page is flagged as a merge candidate against the higher.
const SIBLING_PREFIXES = [
  'apologetic-', 'question-', 'objection-', 'pastoral-',
  'demolition-', 'compare-',
];

function stemOf(file) {
  for (const p of SIBLING_PREFIXES) {
    if (file.startsWith(p)) return file.slice(p.length).replace(/\.html$/, '');
  }
  return null;
}

// Build stem → [pages] index across SIBLING_PREFIXES.
const stemIndex = new Map();
for (const [file, p] of Object.entries(pages)) {
  if (p.isHub || p.isUtility) continue;
  const stem = stemOf(file);
  if (!stem) continue;
  if (!stemIndex.has(stem)) stemIndex.set(stem, []);
  stemIndex.get(stem).push(file);
}

// ─── Classification ───────────────────────────────────────────────

function classify(p) {
  const file = p.file;

  // Skip infra and locked pages from active surfacing.
  if (p.isHub || p.isUtility) return { disposition: 'INFRA-SKIP' };
  if (HAMMER_LOCKED.has(file)) return { disposition: 'HAMMER-LOCKED-SKIP' };
  if (POLISH_LOCKED.has(file)) return { disposition: 'POLISH-LOCKED-SKIP' };

  // Known merge-pair (weaker side flagged).
  for (const [weaker, stronger] of KNOWN_MERGE_PAIRS) {
    if (file === weaker) {
      return { disposition: 'MERGE-CANDIDATE', mergeInto: stronger, reason: 'known duplicate pair (MISSION-CONTROL §Phase 1)' };
    }
  }

  // Same-stem siblings — weaker side flagged.
  const stem = stemOf(file);
  if (stem && stemIndex.has(stem) && stemIndex.get(stem).length > 1) {
    const siblings = stemIndex.get(stem);
    // Pick the strongest sibling (highest inbound, then highest words).
    const ranked = siblings
      .map(s => pages[s])
      .filter(Boolean)
      .sort((a, b) => (b.inboundCount - a.inboundCount) || (b.wordCount - a.wordCount));
    const winner = ranked[0];
    if (winner.file !== file) {
      return {
        disposition: 'MERGE-CANDIDATE',
        mergeInto: winner.file,
        reason: `same-stem sibling — winner has ${winner.inboundCount} inbound vs. this page's ${p.inboundCount}`,
      };
    }
  }

  // Stub (publication-grade fail).
  if (p.wordCount < 500 && p.inboundCount <= 2) {
    return { disposition: 'RETIRE-STUB', reason: `${p.wordCount}w · ${p.inboundCount} inbound — below publication grade` };
  }

  // Low-value — short and almost no pull.
  if (p.wordCount < 700 && p.inboundCount <= 1) {
    return { disposition: 'RETIRE-LOW-VALUE', reason: `${p.wordCount}w · ${p.inboundCount} inbound — wiring redirectable` };
  }

  // Elevate — load-bearing argument with too little muscle.
  if (p.inboundCount >= 6 && p.wordCount < 1500) {
    return { disposition: 'ELEVATE', reason: `${p.inboundCount} inbound but only ${p.wordCount}w — promote to Tier 1` };
  }

  return { disposition: 'KEEP-AS-IS' };
}

// ─── Run classification ──────────────────────────────────────────

const buckets = {
  'RETIRE-STUB': [],
  'RETIRE-LOW-VALUE': [],
  'MERGE-CANDIDATE': [],
  'ELEVATE': [],
  'KEEP-AS-IS': 0,
  'HAMMER-LOCKED-SKIP': 0,
  'POLISH-LOCKED-SKIP': 0,
  'INFRA-SKIP': 0,
};

for (const p of Object.values(pages)) {
  const result = classify(p);
  const d = result.disposition;
  if (Array.isArray(buckets[d])) {
    buckets[d].push({ ...p, ...result });
  } else {
    buckets[d]++;
  }
}

// ─── Sort each surfaced bucket ───────────────────────────────────

// RETIRE-STUB: weakest first (lowest words, lowest inbound).
buckets['RETIRE-STUB'].sort((a, b) => (a.wordCount - b.wordCount) || (a.inboundCount - b.inboundCount));

// RETIRE-LOW-VALUE: weakest first.
buckets['RETIRE-LOW-VALUE'].sort((a, b) => (a.inboundCount - b.inboundCount) || (a.wordCount - b.wordCount));

// MERGE-CANDIDATE: by mergeInto target alphabetically, then by inbound desc.
buckets['MERGE-CANDIDATE'].sort((a, b) => a.mergeInto.localeCompare(b.mergeInto) || (b.inboundCount - a.inboundCount));

// ELEVATE: highest impact first (highest inbound, then lowest words = most undersized).
buckets['ELEVATE'].sort((a, b) => (b.inboundCount - a.inboundCount) || (a.wordCount - b.wordCount));

// ─── Render ledger ───────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);
const md = [];

md.push('# PRUNE-CANDIDATES — The Tier 3 Pruning Audit Ledger');
md.push('');
md.push(`> Generated ${today} by \`prune-audit.js\`. Re-run anytime to refresh.`);
md.push('> Surfacer only. No HTML mutated. Cuts and elevations are human-sign-off.');
md.push('> Source criteria: `HAMMER-EXPANSION.md` §"Tier 3 — The Pruning Audit."');
md.push('');

// Executive summary
const totalSurfaced =
  buckets['RETIRE-STUB'].length +
  buckets['RETIRE-LOW-VALUE'].length +
  buckets['MERGE-CANDIDATE'].length +
  buckets['ELEVATE'].length;

md.push('## Executive summary');
md.push('');
md.push('| Disposition | Count | Action |');
md.push('|---|--:|---|');
md.push(`| RETIRE-STUB | ${buckets['RETIRE-STUB'].length} | Below publication grade. Cut, redirect inbound wiring. |`);
md.push(`| RETIRE-LOW-VALUE | ${buckets['RETIRE-LOW-VALUE'].length} | Short + almost unlinked. Cut, redirect wiring. |`);
md.push(`| MERGE-CANDIDATE | ${buckets['MERGE-CANDIDATE'].length} | Fold into a stronger sibling. |`);
md.push(`| ELEVATE | ${buckets['ELEVATE'].length} | Load-bearing but undersized. Promote to Tier 1 rebuild. |`);
md.push(`| KEEP-AS-IS | ${buckets['KEEP-AS-IS']} | Passes Tier 3 thresholds — not flagged this run. |`);
md.push(`| POLISH-LOCKED (skipped) | ${buckets['POLISH-LOCKED-SKIP']} | Already on the polished shelf. |`);
md.push(`| HAMMER-LOCKED (skipped) | ${buckets['HAMMER-LOCKED-SKIP']} | Already on the cathedral spine. |`);
md.push(`| INFRA (skipped) | ${buckets['INFRA-SKIP']} | Hubs + utility pages — out of scope for content pruning. |`);
md.push('');
md.push(`**Total surfaced for human review: ${totalSurfaced} pages.**`);
md.push('');
md.push('Walk top-down within each section. Aaron signs off on every cut. The scaffold flags; the pastor decides.');
md.push('');
md.push('---');
md.push('');

function section(heading, helpText, rows, columns) {
  md.push(`## ${heading}`);
  md.push('');
  md.push(`> ${helpText}`);
  md.push('');
  if (rows.length === 0) {
    md.push('_No candidates flagged in this disposition._');
    md.push('');
    md.push('---');
    md.push('');
    return;
  }
  md.push('| ' + columns.map(c => c.header).join(' | ') + ' |');
  md.push('|' + columns.map(c => c.align || '---').join('|') + '|');
  for (const r of rows) {
    md.push('| ' + columns.map(c => c.cell(r)).join(' | ') + ' |');
  }
  md.push('');
  md.push('---');
  md.push('');
}

section(
  'RETIRE-STUB — below publication grade',
  'Pages with `< 500 words` AND `≤ 2 inbound`. Almost certainly stubs or abandoned drafts. Cut after redirecting any inbound link.',
  buckets['RETIRE-STUB'],
  [
    { header: 'File',     align: '---', cell: r => `\`${r.file}\`` },
    { header: 'Words',    align: '--:', cell: r => r.wordCount },
    { header: 'Inbound',  align: '--:', cell: r => r.inboundCount },
    { header: 'Tier',     align: '---', cell: r => r.tier },
    { header: 'Reason',   align: '---', cell: r => r.reason },
  ]
);

section(
  'RETIRE-LOW-VALUE — short body and unlinked',
  'Pages with `< 700 words` AND `≤ 1 inbound`. Body is small enough that the argument is almost certainly carried better elsewhere; the only reason this URL exists is residual wiring. Redirect the wiring, then cut.',
  buckets['RETIRE-LOW-VALUE'],
  [
    { header: 'File',     align: '---', cell: r => `\`${r.file}\`` },
    { header: 'Words',    align: '--:', cell: r => r.wordCount },
    { header: 'Inbound',  align: '--:', cell: r => r.inboundCount },
    { header: 'Tier',     align: '---', cell: r => r.tier },
    { header: 'Reason',   align: '---', cell: r => r.reason },
  ]
);

section(
  'MERGE-CANDIDATE — fold into a stronger sibling',
  'Two patterns: (1) the explicit duplicate pairs from MISSION-CONTROL §Phase 1, (2) same-stem siblings across `apologetic-` / `question-` / `objection-` / `pastoral-` / `demolition-` / `compare-` where one page out-pulls the other. Fold the weaker into the stronger and 301 the URL.',
  buckets['MERGE-CANDIDATE'],
  [
    { header: 'File',         align: '---', cell: r => `\`${r.file}\`` },
    { header: 'Merge → into', align: '---', cell: r => `\`${r.mergeInto}\`` },
    { header: 'Words',        align: '--:', cell: r => r.wordCount },
    { header: 'Inbound',      align: '--:', cell: r => r.inboundCount },
    { header: 'Reason',       align: '---', cell: r => r.reason },
  ]
);

section(
  'ELEVATE — load-bearing but undersized',
  'Pages with `≥ 6 inbound` and `< 1500 words` that are NOT yet HAMMER-LOCKED or POLISH-LOCKED. They carry weight in the internal traversal but their bodies are too small for what they are doing. Promote to Tier 1 for a full Hammer-Spine rebuild.',
  buckets['ELEVATE'],
  [
    { header: 'File',     align: '---', cell: r => `\`${r.file}\`` },
    { header: 'Inbound',  align: '--:', cell: r => r.inboundCount },
    { header: 'Words',    align: '--:', cell: r => r.wordCount },
    { header: 'Tier',     align: '---', cell: r => r.tier },
    { header: 'Reason',   align: '---', cell: r => r.reason },
  ]
);

md.push('## Methodology');
md.push('');
md.push('Source signals:');
md.push('');
md.push('- `audit-data.json` (built by `strategic-audit.js`) provides per-page wordCount, inboundCount, tier, category, isHub, isUtility.');
md.push('- HTML files are scanned for `HAMMER-LOCKED` and `POLISH-LOCKED` markers. Locked pages are excluded from active surfacing — they have already been judged worth keeping.');
md.push('- Hub and utility files are excluded from content-level pruning.');
md.push('');
md.push('Decision rules (encoded in `prune-audit.js`):');
md.push('');
md.push('1. **HAMMER-LOCKED or POLISH-LOCKED** → SKIP (already vetted).');
md.push('2. **Hub or utility** → SKIP (out of scope).');
md.push('3. **Known merge pair** (`apologetic-perseverance` → `question-perseverance`, etc.) → MERGE-CANDIDATE.');
md.push('4. **Same-stem sibling** with a stronger page (higher inbound, then higher words) → MERGE-CANDIDATE against the winner.');
md.push('5. **`words < 500` AND `inbound ≤ 2`** → RETIRE-STUB.');
md.push('6. **`words < 700` AND `inbound ≤ 1`** → RETIRE-LOW-VALUE.');
md.push('7. **`inbound ≥ 6` AND `words < 1500`** (and not locked) → ELEVATE.');
md.push('8. Otherwise → KEEP-AS-IS.');
md.push('');
md.push('Re-run after any pruning or elevation work to refresh the ledger.');
md.push('');
md.push('---');
md.push('');
md.push(`*Generated by \`prune-audit.js\` on ${today}.*`);
md.push('');

fs.writeFileSync(OUT_PATH, md.join('\n'));

// ─── Console summary ─────────────────────────────────────────────

console.log('');
console.log('prune-audit.js — Tier 3 Pruning Audit (surfacer)');
console.log('───────────────────────────────────────────────');
console.log(`Total pages in audit-data.json    : ${Object.keys(pages).length}`);
console.log(`HAMMER-LOCKED (skipped)           : ${buckets['HAMMER-LOCKED-SKIP']}`);
console.log(`POLISH-LOCKED (skipped)           : ${buckets['POLISH-LOCKED-SKIP']}`);
console.log(`INFRA / hub / utility (skipped)   : ${buckets['INFRA-SKIP']}`);
console.log('');
console.log(`RETIRE-STUB                       : ${buckets['RETIRE-STUB'].length}`);
console.log(`RETIRE-LOW-VALUE                  : ${buckets['RETIRE-LOW-VALUE'].length}`);
console.log(`MERGE-CANDIDATE                   : ${buckets['MERGE-CANDIDATE'].length}`);
console.log(`ELEVATE                           : ${buckets['ELEVATE'].length}`);
console.log(`KEEP-AS-IS                        : ${buckets['KEEP-AS-IS']}`);
console.log('───────────────────────────────────────────────');
console.log(`Total surfaced for human review   : ${totalSurfaced}`);
console.log('');
console.log(`Ledger written → ${path.relative(ROOT, OUT_PATH)}`);
console.log('');
