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
 * Method: n-grams of PROSE ONLY, appearing on 3+ distinct pages.
 *
 * THE LOAD-BEARING DESIGN DECISION: quoted Scripture is SUPPOSED to repeat
 * verbatim across pages — that is the site's whole NIV-verbatim posture. So
 * every verse container, blockquote, and cite is stripped BEFORE n-gramming.
 * Without that strip the output is nothing but John 6:44 and Ephesians 2:8-9
 * and the real signal is invisible. Same for baked furniture (nav, footer,
 * related-articles, hub cards, the grace-warning) which is identical by law.
 *
 * TRIAGE, NOT VERDICT — exactly like detect-multiplied-close.js. Some shared
 * phrases are legitimate: doctrinal formulae ("the doctrines of grace"),
 * standard theological phrases, and deliberate cross-page callbacks. What you
 * are hunting is a shared RHETORICAL DEVICE — a closing machine, a heading
 * mold, a transition formula, a stinger family.
 *
 * Usage:
 *   node detect-shared-phrases.js              # default: 8-grams, 3+ pages
 *   node detect-shared-phrases.js --n 6        # shorter phrases (noisier)
 *   node detect-shared-phrases.js --min 5      # only phrases on 5+ pages
 *   node detect-shared-phrases.js --tail       # only the closing 25% of pages
 *   node detect-shared-phrases.js --top 40
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const getArg = (flag, dflt) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? parseInt(args[i + 1], 10) : dflt;
};
const N = getArg('--n', 8);
const MIN_PAGES = getArg('--min', 3);
const TOP = getArg('--top', 60);
const TAIL_ONLY = args.includes('--tail');

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
  // Apply outermost-first, back to front.
  marks.sort((a, b) => b[0] - a[0]);
  let out = html;
  let lastStart = Infinity;
  for (const [s, e] of marks) {
    if (s >= lastStart) continue; // nested inside an already-removed block
    out = out.slice(0, s) + ' ' + out.slice(e);
    lastStart = s;
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
  body = body.replace(/<[^>]+>/g, ' ');
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
  body = body.replace(/[""][^""]{0,600}[""]/g, ' ');
  body = body.replace(/"[^"]{0,600}"/g, ' ');
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
// Scan
// ---------------------------------------------------------------------------

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();
const gramPages = new Map(); // ngram -> Set(page)
const pageTokens = new Map();
let scanned = 0;

for (const f of files) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const prose = extractProse(html);
  if (!prose) continue;
  let toks = tokenize(prose);
  if (toks.length < N + 5) continue;
  if (TAIL_ONLY) toks = toks.slice(Math.floor(toks.length * 0.75));
  scanned++;
  pageTokens.set(f, toks);
  const seenHere = new Set();
  for (let i = 0; i + N <= toks.length; i++) {
    const g = toks.slice(i, i + N).join(' ');
    if (seenHere.has(g)) continue;
    seenHere.add(g);
    if (!gramPages.has(g)) gramPages.set(g, new Set());
    gramPages.get(g).add(f);
  }
}

// Keep only multi-page n-grams.
let hits = [];
for (const [g, pages] of gramPages) {
  if (pages.size >= MIN_PAGES) hits.push({ gram: g, pages: [...pages].sort() });
}

// Merge into maximal phrases: drop any n-gram that is a substring of a longer
// hit sharing the same page set. Otherwise one 20-word mold prints 13 times.
hits.sort((a, b) => b.gram.length - a.gram.length);
const kept = [];
for (const h of hits) {
  const key = h.pages.join('|');
  const swallowed = kept.some(k => k.pages.join('|') === key && k.gram.includes(h.gram));
  if (!swallowed) kept.push(h);
}

kept.sort((a, b) => (b.pages.length - a.pages.length) || (b.gram.length - a.gram.length));

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

console.log(`\nscanned ${scanned} prose pages  ·  ${N}-grams  ·  threshold ${MIN_PAGES}+ pages${TAIL_ONLY ? '  ·  CLOSING 25% ONLY' : ''}`);
console.log(`  shared phrases found: ${kept.length}\n`);

if (!kept.length) {
  console.log('  no cross-page phrase mold at this threshold.\n');
} else {
  console.log('WORST FIRST  (pages sharing the phrase)\n');
  for (const h of kept.slice(0, TOP)) {
    console.log(`  [${String(h.pages.length).padStart(2)} pages]  "${h.gram}"`);
    console.log(`             ${h.pages.map(p => p.replace(/\.html$/, '')).join(', ')}\n`);
  }
  if (kept.length > TOP) console.log(`  … ${kept.length - TOP} more (raise --top)\n`);
}

console.log('TRIAGE, NOT VERDICT. A shared doctrinal formula is fine. A shared');
console.log('RHETORICAL DEVICE — closing machine, heading mold, stinger family —');
console.log('is VOICE §XVIII.3 and must be broken page by page, each on its own image.\n');
