#!/usr/bin/env node
/*
 * verify-scripture.js — Scripture-quotation consistency auditor (corpus-free).
 *
 * The site quotes the same verses many times. This script extracts every
 * quoted passage that sits next to a Scripture reference, groups the quotes by
 * reference, and flags any reference whose wording DIVERGES across pages —
 * because if "Romans 8:1" is quoted one way on 9 pages and a different way on
 * the 10th (and neither is a partial/substring of the other), at least one of
 * them is a misquote. This catches NIV-exactness errors without needing a
 * licensed Bible text to diff against.
 *
 * Also flags any banned "(NIV)" suffix (CLAUDE.md forbids it).
 *
 * Output: console summary + scripture-audit-report.txt (full detail).
 * Re-run any time: node verify-scripture.js
 */
const fs = require('fs');

const BOOKS = [
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles',
  '1 Corinthians','2 Corinthians','1 Thessalonians','2 Thessalonians',
  '1 Timothy','2 Timothy','1 Peter','2 Peter','1 John','2 John','3 John',
  'Song of Songs','Genesis','Exodus','Leviticus','Numbers','Deuteronomy',
  'Joshua','Judges','Ruth','Ezra','Nehemiah','Esther','Job','Psalms','Psalm',
  'Proverbs','Ecclesiastes','Isaiah','Jeremiah','Lamentations','Ezekiel',
  'Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk',
  'Zephaniah','Haggai','Zechariah','Malachi','Matthew','Mark','Luke','John',
  'Acts','Romans','Galatians','Ephesians','Philippians','Colossians','Titus',
  'Philemon','Hebrews','James','Jude','Revelation'
];
// Longer/numbered names first so "1 Corinthians" wins over "Corinthians"/"John".
const bookAlt = BOOKS.map(b => b.replace(/ /g, '\\s')).join('|');
const REF_NEAR = new RegExp('(' + bookAlt + ')\\s(\\d+):(\\d+)(?:[-\\u2013\\u2014]\\d+)?');

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&rsquo;|&#39;|&apos;/g, "'").replace(/&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"').replace(/&quot;/g, '"')
    .replace(/&hellip;/g, '…');
}
function clean(s) { return s.replace(/\s+/g, ' ').trim(); }
function norm(s) {
  return clean(s).toLowerCase()
    .replace(/[‘’']/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}
function keyFor(m) {
  let b = m[1].replace(/\s+/g, ' ');
  if (b === 'Psalms') b = 'Psalm';
  return b + ' ' + m[2] + ':' + m[3];
}

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const byRef = {};       // ref key -> [{n, disp, file}]
let totalQuotes = 0;
const nivSuffix = [];

// straight "..." OR curly “...”
const QUOTE_RE = /"([^"]{6,400})"|“([^”]{6,400})”/g;

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  if (/\(NIV\)/.test(html)) nivSuffix.push(file);
  const text = stripTags(html);
  let m;
  QUOTE_RE.lastIndex = 0;
  while ((m = QUOTE_RE.exec(text))) {
    const raw = m[1] || m[2];
    const after = text.slice(QUOTE_RE.lastIndex, QUOTE_RE.lastIndex + 60);
    const before = text.slice(Math.max(0, m.index - 60), m.index);
    const refm = REF_NEAR.exec(after) || REF_NEAR.exec(before);
    if (!refm) continue;
    const n = norm(raw);
    if (n.split(' ').length < 3) continue; // too short to be a verse quote
    const key = keyFor(refm);
    (byRef[key] = byRef[key] || []).push({ n, disp: clean(raw), file });
    totalQuotes++;
  }
}

// Divergence = same ref, two normalized quotes where neither contains the other.
const divergences = [];
for (const key of Object.keys(byRef)) {
  const arr = byRef[key];
  if (arr.length < 2) continue;
  const variants = [];
  for (const q of arr) if (!variants.some(v => v.n === q.n)) variants.push(q);
  if (variants.length < 2) continue;
  let conflict = false;
  for (let i = 0; i < variants.length; i++)
    for (let j = i + 1; j < variants.length; j++) {
      const a = variants[i].n, b = variants[j].n;
      if (!a.includes(b) && !b.includes(a)) conflict = true;
    }
  if (conflict) divergences.push({ key, arr });
}

let out = 'SCRIPTURE QUOTATION CONSISTENCY AUDIT\n';
out += 'Generated ' + new Date().toISOString() + '\n\n';
out += 'Files scanned: ' + files.length + '\n';
out += 'Quoted-and-referenced passages extracted: ' + totalQuotes + '\n';
out += 'Distinct references quoted: ' + Object.keys(byRef).length + '\n';
out += 'References quoted in 2+ places: ' + Object.keys(byRef).filter(k => byRef[k].length > 1).length + '\n';
out += 'References with DIVERGENT wording (review): ' + divergences.length + '\n';
out += 'Files with banned "(NIV)" suffix: ' + nivSuffix.length + (nivSuffix.length ? ' -> ' + nivSuffix.join(', ') : '') + '\n\n';
out += '=== DIVERGENT REFERENCES (at least one rendering may be a misquote) ===\n\n';
divergences.sort((a, b) => a.key.localeCompare(b.key));
for (const d of divergences) {
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
fs.writeFileSync('scripture-audit-report.txt', out);
console.log('Files scanned: ' + files.length +
  ' | quotes: ' + totalQuotes +
  ' | distinct refs: ' + Object.keys(byRef).length +
  ' | multi-page refs: ' + Object.keys(byRef).filter(k => byRef[k].length > 1).length +
  ' | DIVERGENT: ' + divergences.length +
  ' | (NIV) files: ' + nivSuffix.length);
console.log('Full report -> scripture-audit-report.txt');
