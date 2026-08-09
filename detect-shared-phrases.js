#!/usr/bin/env node
/*
 * detect-shared-phrases.js — the cross-page TEMPLATE detector.
 *
 * Built S181. VOICE.md §XVIII.3 names the template as the one unredeemable
 * failure, and §XXII.5 names UNIFORMITY as the deepest tell. Every cross-page
 * mold broken so far (the presup trio, the testimony shelf, the Catch-Beneath
 * H2s, the 84 Steel Man / Socratic Trap headings, the 7-page "So we confess it"
 * closing machine) was found BY HAND, by an agent noticing that several pages
 * scored the same odd shape for the same reason. This finds them mechanically.
 *
 * Method: MAXIMAL SHARED PASSAGES in PROSE ONLY, on 2+ distinct pages.
 *
 * THE LOAD-BEARING DESIGN DECISION: quoted Scripture is SUPPOSED to repeat
 * verbatim across pages — that is the site's whole NIV-verbatim posture. So
 * every verse container, blockquote, and cite is stripped BEFORE n-gramming.
 * Without that strip the output is nothing but John 6:44 and Ephesians 2:8-9
 * and the real signal is invisible. Same for baked furniture (nav, footer,
 * related-articles, hub cards, the grace-warning) which is identical by law.
 *
 * ---------------------------------------------------------------------------
 * REBUILT S197, BECAUSE THE S181 VERSION WAS SILENT WHILE THE DEFECT GREW.
 *
 * Three design faults, each of which alone made the report unreadable — and an
 * unreadable report is not a check. Run as shipped (8-grams, 3+ pages) it
 * printed 1,110 hits, and the top of the list was 68 pages sharing "chose you
 * before the foundation of the world." That is not a clone. That is the site's
 * doctrine, in Paul's words, which it is supposed to say on every page it can.
 *
 *  1. THE THRESHOLD WAS THE SELECTOR. Default --min 3 cannot see a two-page
 *     clone, and a two-page clone IS the defect: S196 shipped three pages in
 *     one night sharing two signature sentences near-verbatim ("nothing has
 *     gone wrong and nothing has been withheld" on two; "the way to find out
 *     whether you are among the given" on two). Nothing caught it. Default is
 *     now 2.
 *  2. IT REPORTED SHINGLES, NOT PASSAGES. A single cloned paragraph surfaced
 *     as twelve overlapping n-grams, each printed with its own page list, so
 *     ~40 real findings wore 1,053 rows. Seeds are now EXTENDED MAXIMALLY in
 *     both directions while every occurrence still agrees, then deduplicated —
 *     one row per cloned passage.
 *  3. SCRIPTURE ESCAPED THE STRIP WHENEVER IT WAS UNQUOTED. The quote-span
 *     strip only catches verses inside quotation marks; allusion and running
 *     paraphrase sail through, which is what put Ephesians 1:4 and Philippians
 *     1:6 at the head of the list. Every candidate passage is now checked
 *     against scripture-niv.js and dropped if the NIV contains it.
 *
 * Ranking is by DUPLICATED VOLUME — words × (pages − 1), the number of words a
 * reader going door to door meets a second time. That is the quantity §XXI
 * actually cares about; page count alone ranks a shared four-word idiom above
 * a cloned paragraph.
 * ---------------------------------------------------------------------------
 *
 * TRIAGE, NOT VERDICT — exactly like detect-multiplied-close.js. Some shared
 * phrases are legitimate: doctrinal formulae ("the doctrines of grace"),
 * standard theological phrases, and deliberate cross-page callbacks. What you
 * are hunting is a shared RHETORICAL DEVICE — a closing machine, a heading
 * mold, a transition formula, a stinger family — or, worst, a whole cloned
 * paragraph, which is §XIII.1's slogan-trap ("the same angle in identical
 * phrasing across articles") wearing a paragraph's clothes.
 *
 * Usage:
 *   node detect-shared-phrases.js              # 12-word seeds, 2+ pages
 *   node detect-shared-phrases.js --n 8        # shorter seeds (noisier)
 *   node detect-shared-phrases.js --min 4      # only passages on 4+ pages
 *   node detect-shared-phrases.js --tail       # only the closing 25% of pages
 *   node detect-shared-phrases.js --printables # include printable-* boilerplate
 *   node detect-shared-phrases.js --top 40
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const getArg = (flag, dflt) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? parseInt(args[i + 1], 10) : dflt;
};
const N = getArg('--n', 12);
const MIN_PAGES = getArg('--min', 2);
const TOP = getArg('--top', 60);
const TAIL_ONLY = args.includes('--tail');
const WITH_PRINTABLES = args.includes('--printables');

const ROOT = __dirname;

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

// Containers whose contents are quoted Scripture or baked furniture. Anything
// matching is removed wholesale before tokenizing. Keep this list in sync with
// auto-linker.js's UNSAFE_CLASSES — they exist for the same reason.
const STRIP_CLASS_RE = new RegExp(
  '(scripture|verse|quote|blockquote|cite|chain-quote|benediction|' +
  'related-articles|continue-journey|further-reading|go-deeper|explore-further|' +
  'footer|nav|hub-card|card-|breadcrumb|progress|in-brief-box)',
  'i'
);

function stripElement(html, tagName) {
  // Removes <tag ...>...</tag> including nesting of the same tag.
  const re = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  let out = html;
  let m;
  while ((m = re.exec(out)) !== null) {
    const start = m.index;
    let depth = 1;
    const scan = new RegExp(`<(/?)${tagName}\\b[^>]*>`, 'gi');
    scan.lastIndex = re.lastIndex;
    let end = -1;
    let s;
    while ((s = scan.exec(out)) !== null) {
      depth += s[1] === '/' ? -1 : 1;
      if (depth === 0) { end = scan.lastIndex; break; }
    }
    if (end === -1) break;
    out = out.slice(0, start) + ' ' + out.slice(end);
    re.lastIndex = start;
  }
  return out;
}

function stripClassedDivs(html) {
  // Walk the tag stack; drop any element (div/section/aside/p/span) whose
  // class attribute matches STRIP_CLASS_RE, along with everything inside it.
  const tagRe = /<(\/?)(div|section|aside|blockquote|p|span|figure)\b([^>]*)>/gi;
  const marks = [];
  const stack = [];
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    if (!closing) {
      const isVoid = /\/\s*$/.test(attrs);
      if (isVoid) continue;
      const cls = (attrs.match(/class\s*=\s*["']([^"']*)["']/i) || [])[1] || '';
      stack.push({ tag, start: m.index, kill: STRIP_CLASS_RE.test(cls) });
    } else {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          const el = stack[i];
          stack.length = i;
          if (el.kill) marks.push([el.start, tagRe.lastIndex]);
          break;
        }
      }
    }
  }
  // COLLAPSE TO OUTERMOST RANGES FIRST, THEN APPLY BACK TO FRONT (fixed S198).
  //
  // The old code sorted descending by start and skipped any mark whose start
  // was >= the previously applied one, with the comment "nested inside an
  // already-removed block." Sorted descending, the NESTED mark is the one that
  // comes first — so the guard never fired, and both the child and its parent
  // were spliced out using offsets taken from the ORIGINAL string. Cutting the
  // child first shifts everything after it, so the parent's stored end offset
  // then points too far along, and the splice eats however many characters the
  // child had already removed — from the prose FOLLOWING the parent.
  //
  // Every page carries a <section class="related-articles"> holding several
  // <span class="related-article-desc"> children, all of them kill-marked. So
  // the block that should have been removed cleanly instead removed itself
  // plus a swathe of whatever came next. This is the second reason the check
  // could not be made to fail: a paragraph cloned in immediately after that
  // section was deleted before it was ever tokenized.
  //
  // Sort ascending, keep only ranges not contained in a previous one, then
  // splice from the end so earlier offsets stay valid.
  marks.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const outer = [];
  let reach = -1;
  for (const [s, e] of marks) {
    if (s < reach) continue;          // genuinely nested — the parent covers it
    outer.push([s, e]);
    reach = e;
  }
  let out = html;
  for (let i = outer.length - 1; i >= 0; i--) {
    const [s, e] = outer[i];
    out = out.slice(0, s) + ' ' + out.slice(e);
  }
  return out;
}

function extractProse(html) {
  const am = html.match(/<article\b[^>]*class=["'][^"']*article-body[^"']*["'][^>]*>([\s\S]*)<\/article>/i);
  if (!am) return null;
  let body = am[1];
  body = stripElement(body, 'script');
  body = stripElement(body, 'style');
  body = stripElement(body, 'blockquote');
  body = stripElement(body, 'cite');
  body = stripClassedDivs(body);

  // THE QUOTE STRIP RUNS PER TEXT NODE, AND THAT IS THE WHOLE POINT (S198).
  //
  // It used to run over the entire flattened page, pairing straight quotes
  // sequentially from the top. A quotation lives inside ONE element; quote
  // characters do not. So a single unbalanced `"` anywhere — an inch mark, a
  // nested quotation, one unclosed span — re-paired every following quote with
  // the wrong partner and deleted up to 600 characters of authorial prose per
  // pair, all the way down the page.
  //
  // Measured before this fix: the straight-quote strip was removing 99,516
  // tokens, 7.5% of ALL prose on the site, from the detector's view, and 15
  // pages carried an odd number of straight quotes, which guarantees the
  // mispairing. That is why the check could not be made to fail: a 75-word
  // paragraph cloned verbatim onto question-freewill.html was swallowed whole
  // by a mispaired quote and the totals did not move by a single word.
  //
  // A DETECTOR THAT CANNOT BE MADE TO FAIL IS NOT A DETECTOR. Splitting at tag
  // boundaries first confines any mispairing to the paragraph that caused it.
  // Cost: a verse broken across an inline <em> no longer strips — but the
  // isScripture() check against scripture-niv.js, added in S197, catches those
  // at the candidate stage, which is where the guard belongs anyway.
  body = body.split(/(<[^>]+>)/).map(seg => {
    if (seg.startsWith('<')) return ' ';
    return seg
      .replace(/[“”][^“”]{0,600}[“”]/g, ' ')
      .replace(/"[^"]{0,600}"/g, ' ');
  }).join(' ');

  body = body
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')
    .replace(/&mdash;|&ndash;/g, ' ').replace(/&[a-z]+;|&#\d+;/gi, ' ');

  // THE SECOND SCRIPTURE STRIP, and the one that actually matters.
  // Most quoted verses do NOT live in a verse container — they sit inline in
  // the prose, inside quotation marks ("No one can come to me unless..."). The
  // container strip alone leaves them, and then the entire report is John 6:44
  // and Ephesians 2:8-9 on 70 pages, which is not a finding: it is the site
  // doing exactly what it is supposed to do. So: drop every quoted span.
  // Cost: the site's own repeated *quoted* phrases are lost too. Accepted —
  // a mold worth breaking is nearly always in unquoted authorial voice.
  // (Performed above, per text node — see the S198 note.)
  return body;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// The NIV blob — so Scripture that escaped the quote-strip cannot be reported
// as a clone. Verses are joined by a sentinel token so a passage cannot match
// by straddling two unrelated verses.
// ---------------------------------------------------------------------------

function buildNivBlob() {
  let src;
  try { src = fs.readFileSync(path.join(ROOT, 'scripture-niv.js'), 'utf8'); }
  catch { return ''; }
  const verses = [];
  const re = /:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    verses.push(tokenize(m[1].replace(/\\"/g, '"')).join(' '));
  }
  return ' ' + verses.join(' qzqsentinelqzq ') + ' ';
}
const NIV_BLOB = buildNivBlob();
const isScripture = (p) => NIV_BLOB.length > 2 && NIV_BLOB.includes(' ' + p + ' ');

// ---------------------------------------------------------------------------
// Scan — seed index, one entry per (gram, page)
// ---------------------------------------------------------------------------

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort()
  .filter(f => WITH_PRINTABLES || !/^printable-/.test(f));

const pages = [];                 // { file, toks }
const seeds = new Map();          // gram -> [packed]  (packed = pageIdx * 1e7 + pos)
const PACK = 1e7;

for (const f of files) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const prose = extractProse(html);
  if (!prose) continue;
  let toks = tokenize(prose);
  if (toks.length < N + 5) continue;
  if (TAIL_ONLY) toks = toks.slice(Math.floor(toks.length * 0.75));
  const pi = pages.length;
  pages.push({ file: f, toks });
  const seenHere = new Set();
  for (let i = 0; i + N <= toks.length; i++) {
    const g = toks.slice(i, i + N).join(' ');
    if (seenHere.has(g)) continue;   // one occurrence per page: the first
    seenHere.add(g);
    let a = seeds.get(g);
    if (!a) { a = []; seeds.set(g, a); }
    a.push(pi * PACK + i);
  }
}
const scanned = pages.length;

// ---------------------------------------------------------------------------
// Extend each shared seed to its MAXIMAL common span across all its pages.
// This is what turns twelve overlapping shingles back into one passage.
// ---------------------------------------------------------------------------

const CAP = 400;
function maximalSpan(occ) {
  const pi = (x) => Math.floor(x / PACK);
  const po = (x) => x % PACK;
  let right = N, left = 0;
  while (right - left < CAP) {
    const t = pages[pi(occ[0])].toks[po(occ[0]) + right];
    if (t === undefined) break;
    let ok = true;
    for (let k = 1; k < occ.length; k++) {
      if (pages[pi(occ[k])].toks[po(occ[k]) + right] !== t) { ok = false; break; }
    }
    if (!ok) break;
    right++;
  }
  while (right - left < CAP) {
    const p0 = po(occ[0]) + left - 1;
    if (p0 < 0) break;
    const t = pages[pi(occ[0])].toks[p0];
    let ok = true;
    for (let k = 1; k < occ.length; k++) {
      const pk = po(occ[k]) + left - 1;
      if (pk < 0 || pages[pi(occ[k])].toks[pk] !== t) { ok = false; break; }
    }
    if (!ok) break;
    left--;
  }
  const base = pages[pi(occ[0])];
  const text = base.toks.slice(po(occ[0]) + left, po(occ[0]) + right).join(' ');
  return { text, words: right - left };
}

let cands = [];
for (const [, occ] of seeds) {
  if (occ.length < MIN_PAGES) continue;
  const span = maximalSpan(occ);
  cands.push({
    text: span.text,
    words: span.words,
    pages: occ.map(x => pages[Math.floor(x / PACK)].file).sort(),
  });
}

// Deduplicate: drop any passage contained in a longer kept passage whose page
// set covers it. (Same passage, seeded at a dozen different offsets.)
cands.sort((a, b) => b.words - a.words);
const seenText = new Set();
const kept = [];
for (const c of cands) {
  if (seenText.has(c.text)) continue;
  seenText.add(c.text);
  const covered = kept.some(k =>
    k.text.includes(c.text) && c.pages.every(p => k.pages.includes(p)));
  if (!covered) kept.push(c);
}

// Drop pure Scripture — allusion and running paraphrase sail past the
// quotation-mark strip, and the NIV repeating itself is the site working.
const scripture = kept.filter(k => isScripture(k.text));
const clones = kept.filter(k => !isScripture(k.text));

// Rank by DUPLICATED VOLUME: the words a door-to-door reader meets twice.
clones.forEach(c => { c.volume = c.words * (c.pages.length - 1); });
clones.sort((a, b) => b.volume - a.volume);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const wrap = (s, w, pad) => {
  const out = []; let line = '';
  for (const word of s.split(' ')) {
    if ((line + ' ' + word).trim().length > w) { out.push(line.trim()); line = word; }
    else line += ' ' + word;
  }
  if (line.trim()) out.push(line.trim());
  return out.map((l, i) => (i ? pad : '') + l).join('\n');
};

console.log(`\nscanned ${scanned} prose pages  ·  ${N}-word seeds, extended maximally  ·  threshold ${MIN_PAGES}+ pages`);
console.log(`${TAIL_ONLY ? '  CLOSING 25% ONLY\n' : ''}${WITH_PRINTABLES ? '  including printable-* boilerplate\n' : '  printable-* excluded (non-prose utilities; --printables to include)\n'}`);
console.log(`  cloned passages: ${clones.length}   ·   suppressed as Scripture: ${scripture.length}`);
console.log(`  total duplicated words: ${clones.reduce((s, c) => s + c.volume, 0)}\n`);

if (!clones.length) {
  console.log('  no cross-page passage clone at this threshold.\n');
} else {
  console.log('WORST FIRST  —  by duplicated volume (words x extra pages)\n');
  for (const c of clones.slice(0, TOP)) {
    console.log(`  [${String(c.pages.length).padStart(2)} pages · ${String(c.words).padStart(3)} words · vol ${c.volume}]`);
    console.log(`     "${wrap(c.text, 92, '      ')}"`);
    console.log(`     ${c.pages.map(p => p.replace(/\.html$/, '')).join(', ')}\n`);
  }
  if (clones.length > TOP) console.log(`  … ${clones.length - TOP} more (raise --top)\n`);
}

console.log('TRIAGE, NOT VERDICT. A shared doctrinal formula is fine. A shared');
console.log('RHETORICAL DEVICE — closing machine, heading mold, stinger family —');
console.log('is VOICE §XVIII.3 and must be broken page by page, each on its own image.');
console.log('A cloned PARAGRAPH is §XIII.1: the same mirror held to the same face twice.\n');
