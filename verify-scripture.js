#!/usr/bin/env node
/*
 * verify-scripture.js — does every quoted verse actually say what the NIV says?
 *
 * REWRITTEN S198 (2026-08-04). The old version's own header explained its
 * central limitation: it caught "NIV-exactness errors WITHOUT needing a
 * licensed Bible text to diff against." So it compared the site's quotations
 * against EACH OTHER and flagged any reference worded two different ways.
 *
 * That premise had been obsolete for a long time. The site ships
 * scripture-niv.js — 992 NIV passages, a runtime asset served to every reader.
 * The ground truth was sitting in the repo the whole time, and the checker was
 * still triangulating around it.
 *
 * The cost of guessing instead of checking:
 *   - It could only ever say "these two differ," never "this one is wrong."
 *     Every one of its 269 findings still required a human to open a Bible.
 *   - Its noise made it unreadable, so nobody did. It had run every session for
 *     months and never once caused a correction.
 *   - It was silent about the failure that matters most: a verse quoted the
 *     SAME wrong way on every page. Perfect consistency, uniformly misquoted,
 *     and a cross-page comparator cannot see it by construction.
 *
 * NOW: every quotation is diffed against the actual NIV text for the reference
 * it claims. A quote is VERIFIED if it appears in the NIV verbatim (ellipsis
 * segments checked in order, punctuation and curly quotes normalized away).
 * Otherwise it is scored by word overlap:
 *
 *   MISQUOTE   — high overlap, but the wording does not match. Real finding.
 *                Someone paraphrased and presented it inside quotation marks.
 *   UNMATCHED  — low overlap. Almost always the extractor grabbing ordinary
 *                prose that happened to sit near a reference, not a claim about
 *                Scripture. Suppressed unless --noise.
 *   REVIEW     — no NIV text on file for that reference; falls back to the old
 *                cross-page divergence test, which is still worth something.
 *
 * Also flags the banned "(NIV)" suffix (CLAUDE.md forbids it).
 *
 * Usage:
 *   node verify-scripture.js              # summary + scripture-audit-report.txt
 *   node verify-scripture.js --noise      # include UNMATCHED extractor noise
 *   node verify-scripture.js --strict     # exit 1 if any MISQUOTE remains
 *
 * WHY SOME PAGES ARE EXCLUDED. all-content.html, search.html and the topic
 * indexes are GENERATED: they are walls of card titles and excerpts. Quoted
 * fragments there are not the site making a claim about a verse, they are a
 * build script concatenating headlines. Auditing them produced entries like
 * 1 Corinthians 10:13 "quoted" as a run-on of three unrelated card blurbs.
 * A checker that reports generated text as a misquotation trains its reader to
 * ignore it.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SHOW_NOISE = process.argv.includes('--noise');
const STRICT = process.argv.includes('--strict');

// ── Ground truth ──────────────────────────────────────────────────────────
global.window = global.window || {};
require(path.join(ROOT, 'scripture-niv.js'));
const NIV = global.window.SCRIPTURE_NIV || {};
if (!Object.keys(NIV).length) {
  console.error('ERROR: scripture-niv.js loaded no verses. Nothing to diff against.');
  process.exit(2);
}

// ── Generated / index pages: not the site's own claims about Scripture ────
const EXCLUDE = new Set([
  'all-content.html', 'search.html', 'sitemap.html', 'topics.html',
  'connections.html', 'explore-map.html', 'verse-explorer.html',
  'verse-navigator.html', 'quote-cards.html', 'scripture-tsunami.html',
  '_nav-template.html', '404.html',
]);
const isExcluded = f => EXCLUDE.has(f) || /-hub\.html$/.test(f);

const BOOKS = [
  '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  '1 Corinthians', '2 Corinthians', '1 Thessalonians', '2 Thessalonians',
  '1 Timothy', '2 Timothy', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Song of Songs', 'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Psalm',
  'Proverbs', 'Ecclesiastes', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel',
  'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John',
  'Acts', 'Romans', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', 'Titus',
  'Philemon', 'Hebrews', 'James', 'Jude', 'Revelation',
];
const bookAlt = BOOKS.map(b => b.replace(/ /g, '\\s')).join('|');
// CASE-INSENSITIVE, AND THE DASH MAY BE SURROUNDED BY WHITESPACE (S198).
// Two bugs lived in this one line.
//   1. Case. systematic-imputation cites "ROMANS 4:3 (quoting Genesis 15:6)".
//      A case-sensitive match walked past the small-caps ROMANS, matched the
//      parenthetical Genesis instead, and diffed a Romans quotation against a
//      verse in Genesis. Every small-caps citation on the site had this.
//   2. The dash. A range is often written across markup — `Ephesians 1:4</a>–5`
//      or with an `&ndash;` entity outside the anchor — and stripTags() leaves
//      a space where the tag was. Without `\s*` the range collapsed to its
//      first verse, so every correctly quoted later verse read as inserted
//      text. Six confirmed false positives came from this alone.
const REF_NEAR = new RegExp('(' + bookAlt + ')\\s(\\d+):(\\d+)(?:\\s*[-\\u2013\\u2014]\\s*(\\d+))?', 'i');

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&rsquo;|&#39;|&apos;/g, "'").replace(/&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"').replace(/&quot;/g, '"')
    .replace(/&hellip;/g, '…');
}
const clean = s => s.replace(/\s+/g, ' ').trim();

// ELLIPSIS SURVIVES NORMALIZATION, and it has to.
// The first version stripped all punctuation to spaces before splitting on the
// ellipsis — so every legitimate partial quotation ("in Adam all die... in
// Christ all will be made alive") arrived at the verifier as one run-on string
// that of course did not appear in the NIV contiguously. It reported them as
// misquotations at 100% word overlap. The marker is converted to a token that
// survives the strip, and split on afterwards.
// The token must be LOWERCASE ALPHABETIC, not whitespace. The first attempt
// used a whitespace marker and it silently did nothing: the final
// `\s+ -> ' '` collapse at the end of norm() ate it, so the fix looked
// present in the source while changing nothing at all. Only an alphabetic
// sentinel survives both the punctuation strip and the whitespace collapse.
//
// AND THE SENTINEL MUST BE SPLIT ON AS A REGEX, NOT AS THE PADDED STRING (S198).
// The padding is inserted by the replace above, but norm() ends in .trim() — so
// a quotation that OPENS or CLOSES with an ellipsis, which is the single most
// common form of legitimate partial quotation on this site, loses the padding
// at exactly that edge. `split(' qqellipsisqq ')` then matches nothing, the
// sentinel stays welded to the verse, indexOf() can never find it in the NIV,
// and the quotation is reported as a MISQUOTE at 96-99% overlap. 1 Peter 1:5 on
// apologetic-kept-by-the-power-of-god was quoted PERFECTLY and sat in the
// queue for it. This is the third time this one constant has been got wrong;
// SPLIT_RE is why there will not be a fourth.
const ELLIPSIS = ' qqellipsisqq ';
const SPLIT_RE = /\s*qqellipsisqq\s*/;
function norm(s) {
  return clean(s).toLowerCase()
    // Bracketed editorial insertions are correct scholarly practice, not a
    // misquotation: "the secret things [that] belong to the LORD our God" is
    // signalling the addition honestly. Dropped before comparison so the rest
    // of the quotation can be checked against the NIV on its own terms.
    .replace(/\[[^\]]{0,40}\]/g, ' ')
    .replace(/[‘’']/g, '')
    .replace(/\s*(?:\.\s*\.\s*\.|…)\s*/g, ELLIPSIS)
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

// The NIV source carries scraping artifacts: 59 entries have verse numbers
// embedded mid-sentence ("...the things that are, 29 so that no one may boast")
// and 24 begin with a section heading glued to the first word ("Praise to God
// for a Living Hope3 Praise be to the God..."). Neither is Scripture; both
// break contiguity and made honest quotations look wrong. Stripped for
// comparison only — scripture-niv.js itself is a served asset and is not
// modified here.
function cleanNiv(t) {
  return clean(
    t
      // THE NIV SOURCE IS HTML, AND NOBODY WAS DECODING IT (S198).
      // 440 `&nbsp;` entities across 46 passages carry the poetic indentation of
      // Isaiah, the Psalms and the prophets. The PAGE side goes through
      // stripTags(), which decodes them; the NIV side never did. So every
      // entity survived the punctuation strip as the literal word "nbsp" and
      // broke contiguity at exactly the line breaks — which is to say, in the
      // middle of every quotation of Hebrew poetry. Isaiah 14:24 was quoted
      // PERFECTLY, word for word, and reported as a misquotation because four
      // invisible entities sat between two of its lines.
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
      .replace(/&rsquo;|&#39;|&apos;/g, "'").replace(/&lsquo;/g, "'")
      .replace(/&ldquo;|&rdquo;/g, '"').replace(/&quot;/g, '"')
      .replace(/&hellip;/g, '…').replace(/&amp;/g, '&')
      // A section heading glued to the first verse number and the first word:
      //   "Praise to God for a Living Hope3 Praise be to the God and Father..."
      .replace(/^[A-Z][A-Za-z'\u2019,\- ]{4,70}?\d{1,3}\s+(?=[A-Z\u201c"])/, '')
      // Verse numbers standing alone between words. This must NOT require a
      // capital letter after the digit -- the first version did, and so it
      // walked straight past "...to nullify the things that are, 29 so that no
      // one may boast", leaving a bare "29" mid-sentence that broke contiguity
      // and reported honest quotations as misquotes. Whitespace on both sides
      // keeps real numerals ("144,000") intact.
      .replace(/(?<=\s)\d{1,3}(?=\s)/g, ' ')
      // A verse number fused to the preceding word: "...that are,29 so that"
      .replace(/([a-z,;:.\u2019"\u201d])\d{1,3}(?=\s)/g, '$1')
  );
}

function refKey(m) {
  // The match is case-insensitive now, so restore the canonical capitalisation
  // before it is used as a dictionary key.
  let b = m[1].replace(/\s+/g, ' ').toLowerCase();
  b = BOOKS.find(x => x.toLowerCase() === b) || m[1].replace(/\s+/g, ' ');
  if (b === 'Psalms') b = 'Psalm';
  return { book: b, chap: m[2], verse: m[3], end: m[4] || null };
}

// The dictionary was built by more than one scrape and its range keys use BOTH
// a hyphen and an en dash — 262 of one, 64 of the other. nivFor() only ever
// built hyphen keys, so those 64 passages were unreachable by range lookup and
// silently fell back to a single verse. `2 Timothy 2:24–25` is the one that
// surfaced it. Any key built here is tried in all three dash forms.
const DASHES = ['-', '–', '—'];
function tryKeys(book, chap, a, b) {
  for (const d of DASHES) {
    const k = `${book} ${chap}:${a}${d}${b}`;
    if (NIV[k]) return NIV[k];
  }
  return null;
}
// The smallest stored range that fully contains [a,b]. Preferring the SMALLEST
// keeps the comparison as tight as possible; a containing range is still ground
// truth, just with extra verses around the quotation, which verifiedAgainst()
// handles because it only asks that each segment appear IN the NIV text.
function containingRange(book, chap, a, b) {
  let best = null, bestSpan = Infinity;
  for (const k of Object.keys(NIV)) {
    const m = k.match(/^(.+?)\s(\d+):(\d+)[-–—](\d+)$/);
    if (!m || m[1] !== book || m[2] !== chap) continue;
    if (+m[3] <= a && +m[4] >= b) {
      const span = +m[4] - +m[3];
      if (span < bestSpan) { bestSpan = span; best = NIV[k]; }
    }
  }
  return best;
}

// Resolve a reference to NIV text. Tries the exact key, then the range key,
// then stitches consecutive single verses together — the dictionary stores some
// passages as ranges ("Romans 8:29-30") and some as individual verses.
function nivFor(r) {
  const base = `${r.book} ${r.chap}:${r.verse}`;
  if (r.end) {
    const exact = tryKeys(r.book, r.chap, r.verse, r.end);
    if (exact) return exact;
    // A CONTAINING RANGE BEATS A STITCH OF WHAT WE HAPPEN TO HOLD.
    // The old order stitched individual verses first, and the dictionary is
    // incomplete — it has no John 6:38, no Ephesians 1:12. So a request for
    // John 6:37-39 returned v37 + v39 CONCATENATED, with the missing verse
    // simply absent, and a page that had quoted all three verbatim was told
    // it had inserted a sentence. Reaching for the containing range first
    // means an incomplete dictionary produces silence, not a false accusation.
    const cont = containingRange(r.book, r.chap, +r.verse, +r.end);
    if (cont) return cont;
    const parts = [];
    let complete = true;
    for (let v = +r.verse; v <= +r.end; v++) {
      const t = NIV[`${r.book} ${r.chap}:${v}`];
      if (t) parts.push(t); else complete = false;
    }
    // Only trust a stitch that is actually whole.
    if (parts.length && complete) return parts.join(' ');
    if (parts.length && !complete) return null;
  }
  if (NIV[base]) return NIV[base];
  // A single-verse citation may sit inside a stored range.
  return containingRange(r.book, r.chap, +r.verse, +r.verse);
}

// A quote is VERIFIED if every ellipsis-separated segment appears in the NIV
// text, in order. That is how a legitimate partial quotation reads:
//   "does not accept the things that come from the Spirit... cannot understand"
function verifiedAgainst(quoteNorm, nivNorm) {
  const segs = quoteNorm.split(SPLIT_RE).map(s => s.trim()).filter(s => s.split(' ').filter(Boolean).length >= 2);
  if (!segs.length) return false;
  let cursor = 0;
  for (const seg of segs) {
    const at = nivNorm.indexOf(seg, cursor);
    if (at === -1) return false;
    cursor = at + seg.length;
  }
  return true;
}

// TITLE CASE IS A HEADING, NOT A QUOTATION.
// "God Commands All to Repent" sits inside quotation marks next to Acts 17:30
// on nine pages and scores 100% word overlap with the verse, because every word
// in it does appear there. It is the NIV's own section heading, reused as a
// card title. Nine identical "misquotations" of a verse nobody misquoted is
// exactly the kind of noise that teaches a reader to stop reading the report.
// Headings are separated out, not counted as findings.
const MINOR = new Set(['a','an','the','and','but','or','nor','of','to','in','for','with',
  'by','from','as','at','on','is','are','be','who','that','all','not','no','his','her',
  'their','its','it','was','were','has','have','had','you','your','our','we','they','he',
  'she','him','them','us','me','my','so','if','then','than','through','into','upon','out']);
function looksLikeHeading(raw) {
  const w = clean(raw).split(' ').filter(Boolean);
  if (w.length < 2 || w.length > 12) return false;
  if (/[.!?;]/.test(raw.slice(0, -1))) return false;      // real sentences punctuate
  const major = w.filter(x => !MINOR.has(x.toLowerCase().replace(/[^a-z]/g, '')));
  if (major.length < 2) return false;
  return major.every(x => /^[A-Z0-9“"']/.test(x));
}

function overlap(quoteNorm, nivNorm) {
  const q = quoteNorm.split(' ').filter(Boolean);
  if (!q.length) return 0;
  const nset = new Set(nivNorm.split(' '));
  return q.filter(w => nset.has(w)).length / q.length;
}

// ── Extract ───────────────────────────────────────────────────────────────
const QUOTE_RE = /"([^"]{6,400})"|“([^”]{6,400})”/g;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

const verified = [];
const misquotes = [];
const unmatched = [];
const headings = [];
const noGroundTruth = {};      // ref -> [{n, disp, file}]
const nivSuffix = [];
let totalQuotes = 0, scanned = 0;

for (const file of files) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (/\(NIV\)/.test(html)) nivSuffix.push(file);
  if (isExcluded(file)) continue;
  scanned++;

  const text = stripTags(html);
  QUOTE_RE.lastIndex = 0;
  let m;
  while ((m = QUOTE_RE.exec(text))) {
    const raw = m[1] || m[2];
    const after = text.slice(QUOTE_RE.lastIndex, QUOTE_RE.lastIndex + 60);
    const before = text.slice(Math.max(0, m.index - 60), m.index);
    const refm = REF_NEAR.exec(after) || REF_NEAR.exec(before);
    if (!refm) continue;

    const n = norm(raw);
    if (n.split(' ').length < 4) continue;      // too short to judge
    totalQuotes++;

    const r = refKey(refm);
    const key = r.book + ' ' + r.chap + ':' + r.verse + (r.end ? '-' + r.end : '');
    const nivText = nivFor(r);

    if (!nivText) {
      (noGroundTruth[key] = noGroundTruth[key] || []).push({ n, disp: clean(raw), file });
      continue;
    }
    const nn = norm(cleanNiv(nivText));
    const rec = { key, disp: clean(raw), file, niv: cleanNiv(nivText), ov: overlap(n.split(new RegExp(SPLIT_RE, 'g')).join(' ').replace(/\s+/g, ' ').trim(), nn) };

    if (verifiedAgainst(n, nn)) verified.push(rec);
    else if (looksLikeHeading(raw)) headings.push(rec);
    else if (rec.ov >= 0.6) misquotes.push(rec);
    else unmatched.push(rec);
  }
}

// ── Fallback: cross-page divergence where we have no NIV text ─────────────
const review = [];
for (const key of Object.keys(noGroundTruth)) {
  const arr = noGroundTruth[key];
  const variants = [];
  for (const q of arr) if (!variants.some(v => v.n === q.n)) variants.push(q);
  if (variants.length < 2) continue;
  let conflict = false;
  for (let i = 0; i < variants.length; i++)
    for (let j = i + 1; j < variants.length; j++) {
      const a = variants[i].n, b = variants[j].n;
      if (!a.includes(b) && !b.includes(a)) conflict = true;
    }
  if (conflict) review.push({ key, arr });
}

// ── Report ────────────────────────────────────────────────────────────────
misquotes.sort((a, b) => b.ov - a.ov || a.key.localeCompare(b.key));

let out = 'SCRIPTURE FIDELITY AUDIT — quotations diffed against scripture-niv.js\n';
out += 'Generated ' + new Date().toISOString() + '\n\n';
out += `Ground truth: ${Object.keys(NIV).length} NIV passages\n`;
out += `Pages scanned: ${scanned} (of ${files.length}; generated/index pages excluded)\n`;
out += `Quotations with a nearby reference: ${totalQuotes}\n\n`;
out += `  VERIFIED  ${verified.length}  — appear in the NIV verbatim\n`;
out += `  MISQUOTE  ${misquotes.length}  — high word overlap, wording does not match\n`;
out += `  HEADING   ${headings.length}  — title-case heading near a reference, not a quotation\n`;
out += `  UNMATCHED ${unmatched.length}  — low overlap; almost all extractor noise\n`;
out += `  REVIEW    ${review.length}  — no NIV text on file; cross-page divergence only\n`;
out += `  banned "(NIV)" suffix: ${nivSuffix.length}${nivSuffix.length ? ' -> ' + nivSuffix.join(', ') : ''}\n\n`;

out += '='.repeat(72) + '\nMISQUOTATIONS — presented as a quotation, not what the NIV says\n' + '='.repeat(72) + '\n\n';
for (const q of misquotes) {
  out += `### ${q.key}   [${q.file}]   overlap ${(q.ov * 100).toFixed(0)}%\n`;
  out += `  PAGE: "${q.disp}"\n`;
  out += `  NIV : "${q.niv}"\n\n`;
}

out += '\n' + '='.repeat(72) + '\nREVIEW — no NIV text on file, wording differs across pages\n' + '='.repeat(72) + '\n\n';
review.sort((a, b) => a.key.localeCompare(b.key));
for (const d of review) {
  out += '### ' + d.key + '\n';
  const seen = {};
  for (const q of d.arr) {
    if (seen[q.n]) { seen[q.n].files.push(q.file); continue; }
    seen[q.n] = { disp: q.disp, files: [q.file] };
  }
  for (const k of Object.keys(seen)) {
    out += '  - "' + seen[k].disp + '"\n      [' + [...new Set(seen[k].files)].join(', ') + ']\n';
  }
  out += '\n';
}

if (SHOW_NOISE) {
  out += '\n' + '='.repeat(72) + '\nUNMATCHED — low overlap; prose near a reference, not a quotation of it\n' + '='.repeat(72) + '\n\n';
  for (const q of unmatched) {
    out += `### ${q.key}   [${q.file}]   overlap ${(q.ov * 100).toFixed(0)}%\n  "${q.disp}"\n\n`;
  }
}

fs.writeFileSync(path.join(ROOT, 'scripture-audit-report.txt'), out);

console.log(`\nSCRIPTURE FIDELITY — ${totalQuotes} quotations on ${scanned} pages, diffed against ${Object.keys(NIV).length} NIV passages\n`);
console.log(`  VERIFIED   ${String(verified.length).padStart(5)}   appear in the NIV verbatim`);
console.log(`  MISQUOTE   ${String(misquotes.length).padStart(5)}   <-- real findings`);
console.log(`  HEADING    ${String(headings.length).padStart(5)}   title-case headings, not quotations`);
console.log(`  UNMATCHED  ${String(unmatched.length).padStart(5)}   low overlap; extractor noise (--noise to list)`);
console.log(`  REVIEW     ${String(review.length).padStart(5)}   no NIV text on file`);
console.log(`  "(NIV)"    ${String(nivSuffix.length).padStart(5)}   banned suffix\n`);
if (misquotes.length) {
  console.log('  Worst by overlap (closest to right, therefore most likely a real misquote):');
  misquotes.slice(0, 8).forEach(q =>
    console.log(`    ${(q.ov * 100).toFixed(0)}%  ${q.key.padEnd(22)} ${q.file}`));
  console.log('');
}
console.log('Full report -> scripture-audit-report.txt');

if (STRICT && misquotes.length) process.exit(1);
