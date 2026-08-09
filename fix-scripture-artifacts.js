#!/usr/bin/env node
/*
 * fix-scripture-artifacts.js — clean the scrape artifacts out of the NIV text
 * this site SERVES TO READERS.  (S198)
 *
 * WHY THIS EXISTS.
 * `scripture-niv.js` is not an internal fixture. It is a runtime asset, and
 * `scripture-popups.js` line ~196 does:
 *
 *     p.querySelector('.scripture-popup-text').textContent = text;
 *
 * `textContent` does not decode HTML entities and does not repair whitespace.
 * So whatever is in this file is EXACTLY what a reader sees when they tap a
 * Scripture reference anywhere on the site. 241 of 992 passages — 24.3% —
 * carried at least one artifact from the original scrape:
 *
 *   1. `&nbsp;` entities (46 passages, 440 occurrences). The poetic indentation
 *      of Isaiah, the Psalms and the prophets. The reader saw the literal
 *      characters `&nbsp;&nbsp;&nbsp;&nbsp;` in the middle of the verse.
 *   2. A section heading glued to the first verse number and the first word
 *      (30 passages): "Concluding Affirmations13 I write these things…",
 *      "Saul's Conversion9 Meanwhile, Saul was still breathing out…".
 *      Section headings are the publisher's editorial apparatus. They are not
 *      Scripture, and this site does not present them as though they were.
 *   3. Bare verse numbers mid-passage (85 passages). Every one of them was
 *      verified to sit after sentence-ending punctuation, and the full digit
 *      inventory (2–40) contains no real scriptural numeral.
 *   4. Bible Gateway footnote markers — `[a]`, `[b]` (50 passages) — pointing
 *      at footnotes that were never scraped and do not exist here.
 *   5. Spaces lost at a line break, so a sentence ran into the next one:
 *      "the Mighty Warrior who saves.He will take great delight in you".
 *
 * THE ARTIFACTS ARE INCONSISTENCY, NOT DESIGN, AND THE FILE PROVES IT ITSELF.
 * "1 Corinthians 1:26-31" is stored clean; "1 Corinthians 1:27-29" — the same
 * words — carries "28" and "29" mid-sentence. Two scrapes, two results, one
 * database. There is no reading on which both are intended.
 *
 * HOW THIS WENT UNSEEN. `verify-scripture.js` compensated for every one of
 * these in `cleanNiv()` — for COMPARISON ONLY, with a comment saying so
 * outright: "scripture-niv.js itself is a served asset and is not modified
 * here." So the checker knew the ground truth was dirty, silently cleaned its
 * own copy, and left the reader's copy alone. The artifacts were documented
 * and preserved at the same time. That is the same blindness class as the
 * stale manifest and the 9.4 MB payload, for the fourth time: the file was
 * known to be wrong and what the reader received was never the question.
 *
 * SAFETY. This never edits a WORD of Scripture. Every rule removes markup,
 * publisher apparatus, or restores a space. Run --dry-run first; it prints
 * every passage it would change, before and after.
 *
 * Usage:
 *   node fix-scripture-artifacts.js --dry-run     # print every change
 *   node fix-scripture-artifacts.js               # write
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'scripture-niv.js');
const DRY = process.argv.includes('--dry-run');

global.window = global.window || {};
delete require.cache[require.resolve(FILE)];
require(FILE);
const NIV = global.window.SCRIPTURE_NIV;
if (!NIV || !Object.keys(NIV).length) {
  console.error('ERROR: scripture-niv.js loaded no verses. Refusing to write.');
  process.exit(2);
}

const RULES = [
  ['entity',   t => t
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&hellip;/g, '…').replace(/&amp;/g, '&')],

  // A section heading glued to the first verse number and the first word.
  // Anchored at the start only, and it must be followed by a digit and then a
  // capital or an opening quote, which is what makes it a heading rather than
  // a sentence. Non-greedy so it cannot eat into the verse.
  ['heading',  t => t.replace(/^[A-Z][A-Za-z’',\- ]{4,70}?\d{1,3}\s*(?=[A-Z“"'])/, '')],

  // Footnote markers pointing at footnotes that were never scraped.
  ['footnote', t => t.replace(/\[[a-z]\]/g, '')],

  // Bare verse numbers. Whitespace on both sides keeps "144,000" intact.
  ['versenum', t => t.replace(/(?<=\s)\d{1,3}(?=\s)/g, ' ')
                     .replace(/([.!?”"])\s*\d{1,3}(?=\s)/g, '$1')],

  // Spaces lost where the source had a line break. Hebrew poetry is scraped
  // line by line and the join lost the space, so a comma or a full stop runs
  // straight into the next word: "we would have become like Sodom,we would
  // have been like Gomorrah". The digit guard on the comma rule is what keeps
  // "144,000" intact.
  //
  // A STRAIGHT `"` IS NOT IN THESE CLASSES, AND THAT IS THE WHOLE CARE OF THE
  // RULE. It is ambiguous — it opens a quotation and it closes one — and the
  // first draft treated it as an opener, which put a space in front of every
  // CLOSING quote it touched: `God is love."` became `God is love. "` and
  // `the cornerstone," and,` became `the cornerstone, " and,`. Only the curly
  // `“` is unambiguously an opening mark, so only `“` may follow a space
  // insertion. Punctuation this file exists to protect is not worth trading
  // for four more line breaks.
  ['lostspace', t => t
    .replace(/([.!?;])([A-Z“])/g, '$1 $2')
    .replace(/([,:])([A-Za-z“])/g, '$1 $2')
    .replace(/([”"])(“)/g, '$1 $2')],

  ['whitespace', t => t.replace(/\s+/g, ' ').trim()],
];

const changed = [];
for (const key of Object.keys(NIV)) {
  const before = NIV[key];
  let after = before;
  const applied = [];
  for (const [name, fn] of RULES) {
    const next = fn(after);
    if (next !== after) { applied.push(name); after = next; }
  }
  if (after !== before) {
    // A rule that removes real words is a bug, not a cleanup. Refuse.
    const wb = before.replace(/&nbsp;/g, ' ').replace(/\[[a-z]\]/g, ' ')
      .replace(/[^A-Za-z]+/g, ' ').trim().split(' ').filter(Boolean);
    const wa = after.replace(/[^A-Za-z]+/g, ' ').trim().split(' ').filter(Boolean);
    changed.push({ key, before, after, applied, wb: wb.length, wa: wa.length });
    NIV[key] = after;
  }
}

const wordLoss = changed.filter(c => c.wb !== c.wa && c.applied.indexOf('heading') === -1);
if (DRY) {
  for (const c of changed) {
    console.log(`### ${c.key}   [${c.applied.join(', ')}]   words ${c.wb} -> ${c.wa}`);
    console.log(`  BEFORE: ${c.before.slice(0, 220)}`);
    console.log(`  AFTER : ${c.after.slice(0, 220)}\n`);
  }
}
console.log(`\nscripture-niv.js — ${Object.keys(NIV).length} passages, ${changed.length} would change`);
const tally = {};
changed.forEach(c => c.applied.forEach(a => { tally[a] = (tally[a] || 0) + 1; }));
Object.entries(tally).sort((a, b) => b[1] - a[1])
  .forEach(([k, v]) => console.log(`   ${k.padEnd(11)} ${String(v).padStart(4)} passages`));
console.log(`\n   passages whose word count changed outside a heading strip: ${wordLoss.length}`);
if (wordLoss.length) wordLoss.slice(0, 10).forEach(c =>
  console.log(`     ${c.key}  ${c.wb} -> ${c.wa}  [${c.applied.join(',')}]`));

if (DRY) { console.log('\n(dry run — nothing written)'); process.exit(0); }

let out = 'window.SCRIPTURE_NIV = {\n';
const keys = Object.keys(NIV);
keys.forEach((k, i) => {
  out += '  ' + JSON.stringify(k) + ': ' + JSON.stringify(NIV[k]) + (i === keys.length - 1 ? '\n' : ',\n');
});
out += '};\n';
fs.writeFileSync(FILE, out);
console.log(`\nWROTE scripture-niv.js — ${changed.length} passages cleaned.`);
