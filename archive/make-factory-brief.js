#!/usr/bin/env node
/**
 * archive/make-factory-brief.js — pre-load a factory agent's context so it can
 * spend its window WRITING instead of READING.
 *
 *   node archive/make-factory-brief.js gospel-absence 1
 *   node archive/make-factory-brief.js gospel-absence all
 *
 * WHY THIS EXISTS — the S203 factory test, which failed and was worth it
 * ---------------------------------------------------------------------
 * The first live factory agent was handed five pages and a brief that said
 * "read ONLY the final 25% of each page" and "check every quotation against
 * scripture-niv.js (it is ground truth)."
 *
 * It burned **75,278 tokens across 15 tool calls and produced ZERO edits.**
 * It never got past reading. Nothing shipped, nothing broke, and the repo was
 * untouched — the whole cost was discovering why.
 *
 * The why is arithmetic, and it is entirely the brief's fault:
 *
 *   5 pages, whole-file, because Read defaults to whole-file ....  38K tokens
 *   scripture-niv.js, 248 KB, because the brief said to check it .  63K tokens
 *   ------------------------------------------------------------------------
 *   floor before a single Edit could be attempted .................102K tokens
 *
 * Half the agent's window, spent before it wrote a word. "Read only the final
 * 25%" is not an instruction an agent can follow — Read has no such mode
 * unless you compute the offset for it. And casually pointing five agents at a
 * quarter-megabyte ground-truth file costs more than everything else combined.
 *
 * THE GENERAL LAW, and it is the one worth carrying forward:
 * **An instruction the agent has no mechanism to obey is not a constraint, it
 * is a wish.** Do not tell an agent to read less. Hand it less.
 *
 * WHAT THIS DOES
 * --------------
 * For each page in a batch it extracts:
 *   1. the final ~25% of the article body, as VERBATIM HTML, so the agent can
 *      choose its own unique Edit anchor without ever opening the file;
 *   2. every Scripture reference that page cites, resolved against
 *      scripture-niv.js — so the agent gets the six verses it needs instead of
 *      the 992 it does not;
 *   3. the freshness ledger row for that page.
 *
 * Result: the agent's read cost drops from ~102K to one small file, and the
 * window goes where it belongs. Same five pages, same standard, roughly a
 * tenth of the intake.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUTDIR = path.join(__dirname, 'factory-briefs');
const ARTICLE_OPEN = '<article class="article-body"';
const TAIL_FRACTION = 0.25;

const cls = process.argv[2];
const which = process.argv[3] || 'all';
if (!cls) {
  console.log('usage: node archive/make-factory-brief.js <defect-class> [batchNumber|all]');
  console.log('       classes: gospel-absence | multiplied-close | feeling-slip');
  process.exit(1);
}

const matrixFile = path.join(__dirname, 'defect-matrix.json');
if (!fs.existsSync(matrixFile)) {
  console.log('No defect matrix. Run: node archive/session-brief.js');
  process.exit(1);
}
const { matrix } = JSON.parse(fs.readFileSync(matrixFile, 'utf8'));
const fresh = JSON.parse(fs.readFileSync(path.join(__dirname, 'freshness-ledger.json'), 'utf8'));

// ── ground truth, loaded ONCE here so no agent ever has to ────────────────
const nivSrc = fs.readFileSync(path.join(ROOT, 'scripture-niv.js'), 'utf8');
const NIV = {};
for (const m of nivSrc.matchAll(/"([^"]+ \d+:\d+(?:-\d+)?)":\s*"((?:[^"\\]|\\.)*)"/g)) {
  NIV[m[1]] = m[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

const BOOKS = '(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalm|Psalms|Proverbs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation)';

const roster = Object.entries(matrix)
  .filter(([, v]) => v.lane === 'B' && v.defects.includes(cls))
  .map(([s]) => s);

if (!roster.length) { console.log(`no Lane B pages for class "${cls}"`); process.exit(0); }

fs.mkdirSync(OUTDIR, { recursive: true });

const batches = [];
for (let i = 0; i < roster.length; i += 5) batches.push(roster.slice(i, i + 5));

const wanted = which === 'all' ? batches.map((_, i) => i) : [Number(which) - 1];

for (const bi of wanted) {
  const batch = batches[bi];
  if (!batch) continue;
  const L = [];
  L.push(`# FACTORY BRIEF — ${cls} — batch ${bi + 1} of ${batches.length}`);
  L.push('');
  L.push('Everything you need is in this file. **Do not open the source pages** — the');
  L.push('closing HTML is reproduced verbatim below, and the only Scripture you might');
  L.push('need is resolved below. Opening the five pages costs ~38K tokens and opening');
  L.push('scripture-niv.js costs ~63K; the agent that did both last session ran out of');
  L.push('window before it wrote a single word.');
  L.push('');
  L.push('For each page: choose a unique span from the HTML shown, and `Edit` the real');
  L.push(`file at /Users/aaronforman/Documents/adoptedbygracewebsite/<page>.html`);
  L.push('');

  for (const p of batch) {
    const file = path.join(ROOT, p + '.html');
    if (!fs.existsSync(file)) { L.push(`## ${p} — FILE MISSING, SKIP`); continue; }
    const src = fs.readFileSync(file, 'utf8');
    const a = src.indexOf(ARTICLE_OPEN);
    const r = src.indexOf('<!-- RELATED-ARTICLES-START -->');
    const body = src.slice(a, r > 0 ? r : src.length);
    const cut = Math.floor(body.length * (1 - TAIL_FRACTION));
    // start the excerpt at a tag boundary so the HTML the agent sees is well-formed
    const startAt = body.indexOf('\n   <', cut);
    const tail = body.slice(startAt > 0 ? startAt : cut);

    const refs = [...new Set([...body.matchAll(new RegExp(BOOKS + '\\s+\\d+:\\d+(?:-\\d+)?', 'g'))].map(m => m[0]))];
    const resolved = refs.map(ref => {
      const key = ref.replace(/^Psalms /, 'Psalm ');
      return NIV[key] ? `- **${key}** — "${NIV[key]}"` : `- ${ref} — NOT IN GROUND TRUTH (do not quote it verbatim)`;
    });

    const f = fresh[p] || {};
    L.push(`## ${p}`);
    L.push('');
    L.push(`Length ${f.words || '?'}w · already spends bridges[${(f.bridges || []).join(', ')}] catch-images[${(f.images || []).join(', ')}]`);
    L.push('');
    L.push('### Closing HTML (verbatim — pick your Edit anchor from here)');
    L.push('```html');
    L.push(tail.trim());
    L.push('```');
    L.push('');
    L.push('### Scripture this page already cites, resolved to NIV 2011 ground truth');
    L.push(resolved.length ? resolved.join('\n') : '- (none cited)');
    L.push('');
    L.push('---');
    L.push('');
  }

  const out = path.join(OUTDIR, `${cls}-batch-${bi + 1}.md`);
  fs.writeFileSync(out, L.join('\n'));
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`wrote ${path.relative(ROOT, out)}  (${batch.length} pages, ${kb} KB ≈ ${Math.round(fs.statSync(out).size / 4 / 1000)}K tokens)`);
}

console.log(`\n${roster.length} Lane B page(s) for "${cls}" → ${batches.length} batch(es) of 5.`);
console.log('Hand ONE brief file per agent. The agent reads that file and nothing else.');
