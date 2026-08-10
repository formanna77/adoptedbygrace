#!/usr/bin/env node
/**
 * archive/session-brief.js — the session router. (Built S203, at Aaron's
 * directive to reorient the whole operation toward throughput.)
 *
 *   node archive/session-brief.js
 *
 * WHY THIS EXISTS
 * ---------------
 * At ~8 pages a session the §XXIII pass projects to ~51 sessions. That number
 * is wrong, and the reason it is wrong is that "502 remaining" is a PROVENANCE
 * number, not a DEFECT number: 346 pages last reviewed against an older bar
 * plus 156 locked pages carrying no session tag at all. Measured against the
 * detectors the corpus actually owns, the hard-flagged population is closer to
 * 160. The other ~340 need a confirmation, not a rewrite — and confirmation is
 * the one thing that parallelises cleanly.
 *
 * So the bottleneck was never writing speed. It was that every page went
 * through one 200K context window, serially, with no router deciding which
 * pages needed a craftsman and which needed thirty seconds.
 *
 * WHAT IT DOES
 * ------------
 * Runs every detector once, joins the results into one defect vector per page,
 * folds in review provenance from archive/coverage.json, and sorts the corpus
 * into three lanes:
 *
 *   LANE C — REBUILD.  Multiple defects, or a structural/close defect on a
 *                      doorway. The lead writes these. Never delegated.
 *   LANE B — SURGICAL. One or two defects of a known, named class. Batched by
 *                      CLASS (not by hub, not by alphabet) and handed to a
 *                      subagent that loads one mental model and runs it six
 *                      times. This is where the throughput is.
 *   LANE A — CONFIRM.  Zero detector flags, stale provenance. Spot cold-read
 *                      the opener and the close, then stamp.
 *
 * It also emits archive/freshness-ledger.json — every page's closing cadence
 * and which of the named secular bridges and stock images it already spends.
 * That file is the guardrail on parallel production and it is NOT optional:
 * eight agents writing catches at the same time will independently reach for
 * the same Passover, the same Lazarus, the same phone that was already
 * ringing, and the corpus will get fresher and flatter in the same session.
 * VOICE §XXI calls that the one failure grace does not cover. Every factory
 * brief pastes in the relevant slice of this ledger.
 *
 * THE ADAPTER SELF-CHECK (CLAUDE.md law 3, and it is load-bearing)
 * ---------------------------------------------------------------
 * Each detector prints its own total. Each adapter here extracts page names by
 * pattern. If the two disagree, the adapter has silently drifted from the
 * detector's output format — which is exactly how a router starts quietly
 * routing the wrong pages, and it would look like success. So a mismatch is a
 * HARD ABORT, not a warning. Do not soften it; if a detector's output changes,
 * fix the adapter.
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_MATRIX = path.join(__dirname, 'defect-matrix.json');
const OUT_FRESH = path.join(__dirname, 'freshness-ledger.json');

const ARTICLE_OPEN = '<article class="article-body"';

function run(script, args = []) {
  try {
    return execFileSync('node', [path.join(ROOT, script), ...args], {
      cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 300000,
    });
  } catch (e) {
    // several detectors exit non-zero when they find things; stdout is still good
    return (e.stdout || '') + (e.stderr || '');
  }
}

// Detectors that speak JSON are read as JSON. This is not a convenience — the
// human reports truncate their rosters (gospel-absence at 40 of 127) and carry
// optional columns (multiplied-close's `!`), and a stdout regex gets both wrong
// in the direction that looks like success. The FIRST run of this router caught
// exactly that and aborted, which is why the self-check below is a hard abort.
function runJson(script) {
  const out = run(script, ['--json']).trim();
  const last = out.split('\n').filter(Boolean).pop() || '{}';
  try { return JSON.parse(last); } catch { return null; }
}

const slug = s => s.replace(/\.html$/, '');

/**
 * Each adapter: run the detector, pull the page list, and pull the detector's
 * OWN stated total so the two can be compared.
 */
const ADAPTERS = [
  {
    id: 'gospel-absence',
    label: 'Christ absent from the catch',
    severity: 3,
    script: 'detect-gospel-absence.js',
    json: true,
    collect(j, human) {
      const pages = [...(j.absent || []), ...(j.noLanding || [])].map(slug);
      const stated = (human.match(/NO LANDING \(none in final 20%\)\s*\.*\s*(\d+)/) || [])[1];
      const statedAbsent = (human.match(/ABSENT \(zero mentions\)\s*\.*\s*(\d+)/) || [])[1];
      return { pages, stated: stated === undefined ? null : Number(stated) + Number(statedAbsent || 0) };
    },
  },
  {
    id: 'multiplied-close',
    label: 'Doubled / tripled close',
    severity: 3,
    script: 'detect-multiplied-close.js',
    json: true,
    collect(j, human) {
      const pages = (j.flagged || []).map(slug);
      // cross-check against the human roster rows, allowing the optional `!` column
      const rows = [...human.matchAll(/^\s*\d+\s+\d+\s+\d+\s+[!\s]\s+\S/gm)].length;
      return { pages, stated: rows || null };
    },
  },
  {
    id: 'feeling-slip',
    label: 'Feeling-slip / conditional catch (§XXIII)',
    severity: 3,
    script: 'detect-feeling-slip.js',
    extract(out) {
      const pages = [...out.matchAll(/^\s*── (\S+)\s*$/gm)].map(m => slug(m[1]));
      const stated = (out.match(/(\d+) page\(s\) flagged/) || [])[1];
      return { pages, stated: stated === undefined ? null : Number(stated) };
    },
  },
  {
    id: 'structural-rot',
    label: 'Structural / secondary markup finding',
    // ADVISORY, not a lane class. 0 pages carry real structural rot; the 124
    // "secondary findings" are lint, and weighting them as prose defects
    // inflated the factory to 17 phantom agents on the first run. Listed at
    // the end of the brief so nobody loses them, routed nowhere.
    advisory: true,
    severity: 0,
    script: 'detect-structural-rot.js',
    extract(out) {
      const m = out.match(/(\d+)\s+with STRUCTURAL rot/);
      const start = out.indexOf('STRUCTURAL');
      const pages = start < 0 ? [] :
        [...out.slice(0, start).matchAll(/^(\S+\.html)\s*$/gm)].map(x => slug(x[1]));
      return { pages, stated: m ? Number(m[1]) : null, statedIsStructuralOnly: true };
    },
  },
];

console.log('\n' + '='.repeat(74));
console.log('  SESSION BRIEF — defect matrix + lane assignment');
console.log('='.repeat(74) + '\n');

// ── 1. run detectors, with the hard self-check ────────────────────────────
const flags = {}; // slug -> [{id,label,severity}]
const advisory = {}; // id -> {label, pages}  (listed, never routed)
let aborted = false;

for (const a of ADAPTERS) {
  process.stdout.write(`  running ${a.script} … `);
  const human = run(a.script);
  let res;
  if (a.json) {
    const j = runJson(a.script);
    res = j ? a.collect(j, human) : null;
  } else {
    res = a.extract(human);
  }
  if (!res) {
    console.log('ADAPTER FOUND NO SECTION — output format changed. ABORT.');
    aborted = true;
    continue;
  }
  const uniq = [...new Set(res.pages)];
  // The self-check. A silent drift here routes the wrong pages and looks fine.
  if (res.stated !== null && !res.statedIsStructuralOnly && uniq.length !== res.stated) {
    console.log(`MISMATCH — adapter found ${uniq.length}, detector reported ${res.stated}. ABORT.`);
    aborted = true;
    continue;
  }
  console.log(`${uniq.length} page(s)`);
  if (a.advisory) { advisory[a.id] = { label: a.label, pages: uniq }; continue; }
  for (const p of uniq) (flags[p] = flags[p] || []).push({ id: a.id, label: a.label, severity: a.severity });
}

if (aborted) {
  console.log('\n  ❌ One or more adapters disagreed with its detector. The router is not');
  console.log('     trustworthy until that is fixed. Do NOT run a session off this matrix.\n');
  process.exit(1);
}

// ── 2. provenance ─────────────────────────────────────────────────────────
let coverage = { pages: {} };
try { coverage = JSON.parse(fs.readFileSync(path.join(__dirname, 'coverage.json'), 'utf8')); } catch {}
const CURRENT = (coverage.meta && coverage.meta.currentVoice && coverage.meta.currentVoice.section) || '§XXIII';
const SINCE = (coverage.meta && coverage.meta.currentVoice && coverage.meta.currentVoice.sinceSession) || 191;

// ── 3. the prose corpus ───────────────────────────────────────────────────
const prose = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'))
  .filter(f => fs.readFileSync(path.join(ROOT, f), 'utf8').includes(ARTICLE_OPEN));

// Doorways stay with the lead no matter how clean they scan.
const DOORWAY = /^(index|start-here|questions|topics|best-reads|all-content|for-|systematic-theology|theologian-|question-|demolition-|scripture-tsunami)/;

const matrix = {};
for (const f of prose) {
  const s = slug(f);
  const cov = coverage.pages[f] || {};
  // Provenance uses archive/coverage.js's OWN definitions verbatim. Two
  // counters that disagree about the same corpus is the exact defect class the
  // last four sessions were spent on; do not re-derive these tests.
  const atCurrent = cov.lastSession != null && cov.lastSession >= SINCE;
  const untagged = cov.lastSession == null;
  const d = flags[s] || [];
  const weight = d.reduce((a, x) => a + x.severity, 0);

  let lane;
  const doorway = DOORWAY.test(s);
  // Lane C is COMPOUND defects only. A doorway with one named defect is still
  // factory work — it just may not ship without the lead reading it first.
  // Reserving every doorway for the lead put 56 pages in a lane that clears at
  // ~6 a session, which is the bottleneck this router exists to remove.
  if (weight >= 6) lane = 'C';
  else if (weight > 0) lane = 'B';
  else if (atCurrent) lane = 'DONE';
  else lane = 'A';

  matrix[s] = { lane, weight, defects: d.map(x => x.id), doorway, leadReview: doorway && lane === 'B', atCurrent, untagged, lastSession: cov.lastSession || null };
}

// ── 4. freshness ledger ───────────────────────────────────────────────────
// What a parallel factory must not re-spend. Keyword lists are deliberately
// short and named: these are the wells VOICE §XXI.1 says are already deep.
const BRIDGES = ['libet', 'anosognosia', 'phantom limb', 'lottery', 'drowning', 'default mode',
  'münchhausen', 'munchhausen', 'addiction', 'placebo', 'split-brain', 'blindsight'];
const IMAGES = ['lazarus', 'passover', 'burning building', 'fireman', 'the rope', 'cargo',
  'mirror', 'envelope', 'baseboard', 'prodigal', 'ringing', 'doorframe', 'kettle', 'shipwreck'];

const fresh = {};
for (const f of prose) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const a = src.indexOf(ARTICLE_OPEN);
  const r = src.indexOf('<!-- RELATED-ARTICLES-START -->');
  const body = src.slice(a, r > 0 ? r : src.length);
  const text = body.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  const tail = text.slice(-900).toLowerCase();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  fresh[slug(f)] = {
    closer: sentences.slice(-1)[0] ? sentences.slice(-1)[0].slice(0, 120) : '',
    bridges: BRIDGES.filter(b => text.toLowerCase().includes(b)),
    images: IMAGES.filter(i => tail.includes(i)),   // only what the CATCH spends
    words: text.split(' ').length,
  };
}

fs.writeFileSync(OUT_MATRIX, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), current: CURRENT, matrix }, null, 1) + '\n');
fs.writeFileSync(OUT_FRESH, JSON.stringify(fresh, null, 1) + '\n');

// ── 5. the brief ──────────────────────────────────────────────────────────
const byLane = { C: [], B: [], A: [], DONE: [] };
for (const [s, v] of Object.entries(matrix)) byLane[v.lane].push(s);

console.log(`\n  prose corpus ......... ${prose.length}`);
console.log('  already at ' + CURRENT + ' ..... run `node archive/coverage.js report` — that script owns this');
console.log('                            number. Two counters for one corpus is the defect the last');
console.log('                            four sessions were spent on. This one deliberately abstains.');
console.log(`  LANE C  rebuild ...... ${byLane.C.length}   (lead only — never delegated)`);
console.log(`  LANE B  surgical ..... ${byLane.B.length}   (factory: batch by CLASS)`);
console.log(`  LANE A  confirm ...... ${byLane.A.length}   (spot cold-read opener + close, then stamp)`);
console.log(`     of which untagged locks: ${byLane.A.filter(s => matrix[s].untagged).length}`);

// BATCH must equal the batch size in make-factory-brief.js line ~92.
//
// S204: it did not. This printed rosters of SIX while make-factory-brief.js wrote
// payload files of FIVE, so `batch 3` here and `gospel-absence-batch-3.md` on disk
// named different pages, and the drift compounded with every batch. Nothing caught
// it: both numbers are internally consistent, the rosters stay disjoint, and every
// page still gets covered exactly once. The damage is silent and lands on the LEAD —
// territory assignments, register warnings ("all five of yours are devotionals") and
// the per-page cautions are written from this roster and handed to an agent holding
// a different five. Two S204 agents opened their brief, found none of the pages they
// had been briefed on, and reported the mismatch themselves. A third was told its
// batch closed escape routes in Hebrews 6; it was holding philosophy pages.
//
// The general form: two independent computations of the same partition will diverge,
// and a partition that is merely *consistent* is not the same as *correct*.
const BATCH = 5;

console.log(`\n  ── LANE B FACTORY ROSTERS (one class per subagent, ${BATCH} pages each) ──`);
console.log('  These rosters are generated with the SAME batch size make-factory-brief.js uses,');
console.log('  so `batch N` below is exactly archive/factory-briefs/<class>-batch-N.md on disk.');
for (const a of ADAPTERS) {
  const roster = byLane.B.filter(s => matrix[s].defects.includes(a.id));
  if (!roster.length) continue;
  console.log(`\n  ${a.label} — ${roster.length} page(s) → ${Math.ceil(roster.length / BATCH)} agent(s)`);
  for (let i = 0; i < roster.length; i += BATCH) {
    console.log('     batch ' + (i / BATCH + 1) + ': ' + roster.slice(i, i + BATCH).map(x => matrix[x].leadReview ? x + '*' : x).join(' '));
  }
}

if (byLane.C.length) {
  console.log('\n  ── LANE C (lead writes these) ──');
  byLane.C.sort((x, y) => matrix[y].weight - matrix[x].weight)
    .slice(0, 20).forEach(s => console.log(`     w${matrix[s].weight}  ${s}  [${matrix[s].defects.join(', ')}]`));
}

for (const [id, v] of Object.entries(advisory)) {
  console.log(`\n  ── ADVISORY (not routed): ${v.label} — ${v.pages.length} page(s) ──`);
  console.log('     ' + v.pages.slice(0, 12).join(' ') + (v.pages.length > 12 ? ` … +${v.pages.length - 12}` : ''));
}
console.log('\n  wrote archive/defect-matrix.json + archive/freshness-ledger.json');
console.log('  Paste the relevant freshness-ledger slice into EVERY factory brief.\n');
