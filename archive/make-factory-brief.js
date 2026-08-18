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

const { extractBody } = require('./prose-body.js');

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

// S210 — AN EXPLICIT PAGE LIST. The generator could only ever brief a defect
// CLASS out of the matrix, so the moment a human eye (or a Lane A confirm run)
// found pages the detectors call clean, there was no way to brief them and the
// findings died in a report. That is the same shape as every other bug this
// session: the tool could only see what an automated list already contained.
//   node archive/make-factory-brief.js --pages a,b,c mybatch
const pagesArg = process.argv.indexOf('--pages');
const roster = pagesArg !== -1
  ? process.argv[pagesArg + 1].split(',').map(x => x.trim().replace(/\.html$/, '')).filter(Boolean)
  : Object.entries(matrix)
      .filter(([, v]) => v.lane === 'B' && v.defects.includes(cls))
      .map(([s]) => s);

if (!roster.length) { console.log(`no Lane B pages for class "${cls}"`); process.exit(0); }

fs.mkdirSync(OUTDIR, { recursive: true });

const batches = [];
const STEP = pagesArg !== -1 ? roster.length : 5;
for (let i = 0; i < roster.length; i += STEP) batches.push(roster.slice(i, i + STEP));

// --pages always means 'brief exactly this list', so argv[3] is the flag, not a batch number.
const wanted = (which === 'all' || pagesArg !== -1) ? batches.map((_, i) => i) : [Number(which) - 1];

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

    // S210 — THE WINDOW IS ANCHORED TO PROSE, NOT TO A CHARACTER OFFSET.
    //
    // The old version took the last 25% of the RAW body and then truncated at
    // the first name on a five-item BOUNDARIES list. That is the allowlist
    // habit S209 spent a session killing in the detectors, still running here
    // — and it cost two sessions on one page. `start-here-phase4` closes with
    // a 50-line Knowledge Check quiz, a phase-nav rail and a continue-journey
    // deck; none of those three is on the list, so the brief's "closing HTML"
    // was 100% furniture. An agent told "never anchor inside furniture" and
    // handed nothing but furniture correctly refuses to write the page, and
    // did, twice.
    //
    // The fix is not a sixth name. It is to ask the ONE module that decides the
    // prose/furniture boundary for this whole codebase (archive/prose-body.js,
    // the three S209 structural rules) which paragraphs are real, and then cut
    // the window from the ORIGINAL source so the agent still gets verbatim HTML
    // it can Edit against. The window now provably STARTS and ENDS on prose.
    const clean = extractBody(src);
    const PARA = /<(p|blockquote|h[23])\b[^>]*>[\s\S]*?<\/\1>/gi;
    const wc = (h) => h.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ')
      .split(/\s+/).filter(Boolean).length;

    // Every prose block, in source order, that survives the furniture excision
    // AND still exists verbatim in the raw body (so it is a usable Edit anchor).
    const paras = [];
    if (clean) {
      for (const m of clean.matchAll(PARA)) {
        if (wc(m[0]) < 12) continue;             // labels, one-line rails
        const at = body.indexOf(m[0]);
        if (at === -1) continue;                  // rewritten by the excision
        paras.push({ html: m[0], at, end: at + m[0].length, words: wc(m[0]) });
      }
    }

    let tail;
    if (paras.length) {
      // walk back from the last real paragraph until the window holds ~25% of
      // the page's PROSE words (never of its furniture), floor 250 words.
      const totalWords = paras.reduce((n, p) => n + p.words, 0);
      const want = Math.max(250, Math.floor(totalWords * TAIL_FRACTION));
      let k = paras.length - 1, got = 0;
      while (k > 0 && got < want) { got += paras[k].words; k--; }
      tail = body.slice(paras[k].at, paras[paras.length - 1].end);
    } else {
      // no recoverable prose at all — say so loudly rather than hand an agent
      // a window of furniture and let it discover the problem.
      tail = '<!-- NO PROSE FOUND IN THIS PAGE\'S CLOSING. Do not guess an anchor. -->';
    }

    const refs = [...new Set([...body.matchAll(new RegExp(BOOKS + '\\s+\\d+:\\d+(?:-\\d+)?', 'g'))].map(m => m[0]))];
    const resolved = refs.map(ref => {
      const key = ref.replace(/^Psalms /, 'Psalm ');
      return NIV[key] ? `- **${key}** — "${NIV[key]}"` : `- ${ref} — NOT IN GROUND TRUTH (do not quote it verbatim)`;
    });

    const f = fresh[p] || {};
    L.push(`## ${p}`);
    L.push('');
    L.push(`**Edit this file:** \`/Users/aaronforman/Documents/adoptedbygracewebsite/${p}.html\``);
    L.push('');
    L.push(`Length ${f.words || '?'}w · already spends bridges[${(f.bridges || []).join(', ')}] catch-images[${(f.images || []).join(', ')}]`);
    L.push('');
    L.push('### Closing HTML — VERBATIM, and it begins and ends on real prose');
    L.push('(The first and last blocks below are prose the furniture-excision module kept, so');
    L.push('both ends are safe to anchor on. Anything between them that looks like a card rail');
    L.push('IS one — it sits mid-body on this page — and you must not write into it.)');
    L.push('');
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
