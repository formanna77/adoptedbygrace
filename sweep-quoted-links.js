#!/usr/bin/env node
/**
 * sweep-quoted-links.js — THE QUOTATION SWEEP, built by ALTERNATION (S186)
 *
 * WHY THIS EXISTS
 * ---------------
 * Standing law: after `auto-linker.js` runs, re-run the quotation sweep. The
 * auto-linker inserts internal links into prose; if one lands INSIDE a quoted
 * Scripture span, the site has silently edited the Bible's own words with
 * markup (VOICE §IX.4 — links live in prose only; §V.2 — Scripture quoted is
 * Scripture verbatim).
 *
 * WHY THE NAIVE BUILD WAS THROWN OUT (three kickoffs' worth of false signal)
 * -------------------------------------------------------------------------
 * A regex of the form /"[^"]{30,400}"/ pairs the CLOSING quote of one
 * quotation with the OPENING quote of the NEXT one, capturing the ordinary
 * prose between them. On this corpus that reported 548 "hits," nearly all
 * artifacts. Masking HTML tags kills attribute-quote noise but NOT this,
 * because the defect is in the PAIRING, not the alphabet.
 *
 * THE CORRECT BUILD
 * -----------------
 *   1. Walk the document once, tracking (a) whether we are inside an HTML tag,
 *      (b) whether we are inside <script>/<style>, (c) anchor nesting depth.
 *      Only quote characters in live text are tokenized.
 *   2. Pair the tokens BY ALTERNATION — 1st<->2nd, 3rd<->4th — never by
 *      regex adjacency. Odd token counts are reported, not silently paired.
 *   3. Require a verse reference adjacent to the span (inside it, or within
 *      REF_WINDOW chars after it). A quoted span with no verse near it is
 *      dialogue or emphasis, not Scripture.
 *   4. Flag two shapes:
 *        INSIDE  — an <a> opens within the quoted span.
 *        WRAPPED — the whole quoted span sits inside an <a> opened earlier.
 *   5. Exclude legitimate citation labels: an anchor whose visible text IS the
 *      reference ("ROMANS 8:29-30", "John 6:37"), or which carries a citation
 *      class (passage-verse-ref, verse-ref, chain-link-ref, cite...).
 *   6. Exclude CARDS. A hub tile, related-article card, CTA or door is a link
 *      wrapping a whole block, and its title or blurb may legitimately contain
 *      a quoted verse phrase. That is a card, not a link woven into Scripture,
 *      and it was 49 of the first run's 372 findings. A detector's
 *      false-positive classes are part of its spec, not an afterthought.
 *
 * THE RECALL HOLE THIS DETECTOR STILL HAS — AND ITS SHAPE (S186)
 * ---------------------------------------------------------------
 * Everything above keys on QUOTATION MARKS. The corpus also quotes Scripture
 * in ITALICS WITH NO MARKS AT ALL:
 *
 *     <em>Nor anything else in all creation will be able to separate us from
 *     the love of God that is <a href="/devotional-in-christ">in Christ</a>
 *     Jesus our Lord.</em>
 *
 * That is Romans 8:39 verbatim, with a link woven through it, on a page this
 * detector reported CLEAN — because there is no mark to pair. Extending the
 * pairing logic cannot reach it; a different SHAPE was required. This is the
 * S185 grammar law recurring one turn out: a detector cannot find what its
 * grammar never learned to name, and a pairing fix will not supply a missing
 * shape. `--italic` mode below is the probe for it.
 *
 * A second, smaller hole: a short quoted fragment whose verse reference sits
 * further than REF_WINDOW away is filtered out by the ref requirement
 * (`"In Christ all will be made alive"` on systematic-federal-headship).
 * Precision is cheap; recall is not.
 *
 *   node sweep-quoted-links.js              # the mark-paired sweep
 *   node sweep-quoted-links.js --italic     # the unmarked-italic probe
 *
 * TRIAGE, NOT VERDICT. Read the page before unwrapping anything.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const REF_WINDOW = 160;          // chars after the closing quote to look for a ref
const MIN_SPAN = 20;
const MAX_SPAN = 600;

const SKIP_DIRS = new Set(['archive', '.s137-bak', 'node_modules', '.git', 'Reformed Sources', 'docs']);
const SKIP_FILES = new Set(['all-content.html', '404.html']);

// A Scripture reference: optional leading book number, book name, chap:verse.
const REF_RE = /\b(?:[1-3]\s?)?(?:[A-Z][a-zA-Z]{2,}|[A-Z]{3,})\.?\s+\d{1,3}\s?:\s?\d{1,3}/;
// An anchor whose visible text is nothing but a reference / verse label.
const LABEL_ONLY_RE = /^\s*(?:[—–-]\s*)?(?:[1-3]\s?)?[A-Za-z][A-Za-z ]{1,20}\.?\s*\d{1,3}\s?:\s?\d{1,3}(?:\s?[-–]\s?\d{1,3})?\s*$/;
const CITATION_CLASS_RE = /class="[^"]*(?:verse-ref|passage-verse|scripture-ref|cite|chain-link-greek)[^"]*"/i;
// A card/tile/door/CTA wraps a whole block; a quoted verse phrase in its title
// or blurb is not a link woven into Scripture.
const CARD_CLASS_RE = /class="[^"]*(?:card|tile|door|cta|nav-|pill|hub-|grid-item|verse-box|topic-|chip)[^"]*"/i;
const isCard = (an, html) =>
  CARD_CLASS_RE.test(an.tag) ||
  /<(?:div|h[1-6]|section|article|ul|ol|table)\b/i.test(html.slice(an.contentStart, an.end));

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue;
      walk(path.join(dir, e.name), out);
    } else if (e.name.endsWith('.html') && !SKIP_FILES.has(e.name)) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

/**
 * Single pass. Returns { tokens, anchors } where tokens are the positions of
 * live-text quote characters, each carrying the anchor depth at that position.
 */
function tokenize(html) {
  const tokens = [];
  const anchors = [];          // { start, end, open, close, cls, text }
  const stack = [];
  let inTag = false, tagStart = 0;
  let skipUntil = null;        // closing tag name we are skipping to

  for (let i = 0; i < html.length; i++) {
    const c = html[i];

    if (skipUntil) {
      if (c === '<' && html.startsWith(skipUntil, i)) {
        i += skipUntil.length - 1;
        skipUntil = null;
      }
      continue;
    }

    if (!inTag && c === '<') {
      const lower = html.slice(i, i + 8).toLowerCase();
      if (lower.startsWith('<script')) { const e = html.indexOf('>', i); if (e > -1) { i = e; skipUntil = '</script'; continue; } }
      if (lower.startsWith('<style'))  { const e = html.indexOf('>', i); if (e > -1) { i = e; skipUntil = '</style';  continue; } }
      if (html.startsWith('<!--', i))  { const e = html.indexOf('-->', i); if (e > -1) { i = e + 2; continue; } }
      inTag = true; tagStart = i;
      continue;
    }

    if (inTag) {
      if (c === '>') {
        const tag = html.slice(tagStart, i + 1);
        const lower = tag.toLowerCase();
        if (lower.startsWith('<a ') || lower === '<a>') {
          stack.push({ open: tagStart, contentStart: i + 1, tag });
        } else if (lower.startsWith('</a')) {
          const a = stack.pop();
          if (a) anchors.push({
            start: a.open, contentStart: a.contentStart, end: i + 1,
            tag: a.tag,
            text: html.slice(a.contentStart, tagStart).replace(/<[^>]*>/g, '').trim()
          });
        }
        inTag = false;
      }
      continue;
    }

    if (c === '"' || c === '“' || c === '”') {
      tokens.push({ pos: i, depth: stack.length, anchorOpen: stack.length ? stack[stack.length - 1].open : null });
    }
  }
  return { tokens, anchors };
}

function analyze(file, html) {
  const { tokens, anchors } = tokenize(html);
  const findings = [];
  const oddCount = tokens.length % 2 === 1;

  for (let k = 0; k + 1 < tokens.length; k += 2) {
    const a = tokens[k], b = tokens[k + 1];
    const span = html.slice(a.pos, b.pos + 1);
    const plain = span.replace(/<[^>]*>/g, '');
    if (plain.length < MIN_SPAN || plain.length > MAX_SPAN) continue;

    // Require a verse reference inside the span or just after it.
    const after = html.slice(b.pos + 1, b.pos + 1 + REF_WINDOW).replace(/<[^>]*>/g, ' ');
    if (!REF_RE.test(plain) && !REF_RE.test(after)) continue;

    // Shape 1: an anchor OPENS inside the quoted span.
    const inner = anchors.filter(an => an.start > a.pos && an.start < b.pos);
    for (const an of inner) {
      if (LABEL_ONLY_RE.test(an.text)) continue;            // citation label — legitimate
      if (CITATION_CLASS_RE.test(an.tag)) continue;
      if (isCard(an, html)) continue;                        // card/tile — not a woven link
      findings.push({ shape: 'INSIDE', quote: plain.slice(0, 110), link: an.text.slice(0, 60), tag: an.tag.slice(0, 90) });
    }

    // Shape 2: the whole quoted span sits INSIDE an anchor opened earlier.
    if (a.depth > 0 && a.anchorOpen !== null) {
      const an = anchors.find(x => x.start === a.anchorOpen);
      if (an && !LABEL_ONLY_RE.test(an.text) && !CITATION_CLASS_RE.test(an.tag) && !isCard(an, html)) {
        findings.push({ shape: 'WRAPPED', quote: plain.slice(0, 110), link: an.text.slice(0, 60), tag: an.tag.slice(0, 90) });
      }
    }
  }
  return { findings, oddCount, tokenCount: tokens.length };
}

/**
 * ITALIC PROBE — the shape the mark-pairing sweep is structurally blind to.
 *
 * PRECISION COMES FROM THE SITE'S OWN BIBLE. The first cut of this probe keyed
 * on "long italic span + a verse reference nearby" and returned 508 spans, most
 * of them the site italicising its OWN commentary. Useless. The fix was to stop
 * guessing what looks like Scripture and instead ASK: `scripture-niv.js` already
 * ships the NIV text of every verse the site quotes. Shingle that corpus, and an
 * italic span is Scripture if and only if a run of its words is actually in the
 * Bible. Guessing became lookup, and the noise went away.
 */
const SHINGLE = 7;
const normWords = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

/**
 * S188 — WHY THIS SWEEP REPORTED A CLEAN CORPUS IT HAD ONLY PARTLY READ.
 *
 * The pairing logic keys on quote CHARACTERS. The corpus writes curly quotes as
 * HTML ENTITIES far more often than literally — `&ldquo;` 346 times across 50
 * pages, the literal `“` only 91 — so four quotations in five were never even
 * tokenized, and the anchors woven through them could not be counted. 12 such
 * anchors on 7 pages, including two inside Matthew 11:27, were sitting in plain
 * sight while this tool and `analyze-quoted-links.js` both reported the class
 * closed. `auto-linker.js`'s parity GUARD had the identical blind spot, for the
 * identical reason: guard and detector were built from one model of a quotation.
 *
 * Decoding at read time is the whole fix — every downstream pairing, masking and
 * shingle test then operates on the text a reader actually sees. Single-quote
 * entities are left alone on purpose: `&rsquo;` is an apostrophe here.
 *
 * AND IT MUST DECODE TEXT ONLY, NEVER TAGS. `&quot;` occurs 2,501 times corpus-wide
 * and some of those are INSIDE attribute values — `data-search="&quot;christ died
 * for all&quot; …"` on the baked card pages. A blunk string replace turns those into
 * bare `"` in the middle of an attribute and every tokenizer downstream loses the
 * shape of the tag. So the tag alternative is matched FIRST and passed through
 * untouched; only text runs are decoded.
 */
const decodeQuoteEntities = s => s.replace(
  /(<[^>]*>)|(&ldquo;|&#8220;|&#x201C;)|(&rdquo;|&#8221;|&#x201D;)|(&quot;|&#34;|&#x22;)/gi,
  (m, tag, open, close, straight) => tag ? tag : open ? '“' : close ? '”' : '"'
);

function buildNivShingles() {
  const set = new Set();
  const src = path.join(ROOT, 'scripture-niv.js');
  if (!fs.existsSync(src)) return set;
  const raw = fs.readFileSync(src, 'utf8');
  const body = raw.slice(raw.indexOf('{'));
  let data;
  try { data = JSON.parse(body.replace(/;\s*$/, '')); } catch { return set; }
  for (const text of Object.values(data)) {
    const w = normWords(String(text));
    for (let i = 0; i + SHINGLE <= w.length; i++) set.add(w.slice(i, i + SHINGLE).join(' '));
  }
  return set;
}
const NIV_SHINGLES = buildNivShingles();

/**
 * THE DECISIVE TEST, and it is not "does this span look like Scripture."
 * A long italic span is mostly the site's own commentary with a verse fragment
 * somewhere inside it, so "a Bible shingle occurs anywhere in this span" still
 * returned 359 spans of noise. The question that actually decides the case is
 * narrower and exact:
 *
 *     ARE THE LINK'S OWN WORDS PART OF A SENTENCE IN THE BIBLE?
 *
 * So: reconstruct the span's words, note which word indices belong to the
 * anchor, and require a NIV shingle that OVERLAPS those indices. The link is
 * then provably sitting inside the text of Scripture — quotation marks or not.
 */
function linkInsideScripture(inner) {
  const hits = [];
  const re = /<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(inner))) {
    const before = normWords(inner.slice(0, m.index).replace(/<[^>]*>/g, ' '));
    const linkW  = normWords(m[2].replace(/<[^>]*>/g, ' '));
    const after  = normWords(inner.slice(m.index + m[0].length).replace(/<[^>]*>/g, ' '));
    if (!linkW.length) continue;
    const all = [...before, ...linkW, ...after];
    const lo = before.length, hi = before.length + linkW.length - 1;
    let inside = false;
    for (let i = Math.max(0, lo - SHINGLE + 1); i + SHINGLE <= all.length && i <= hi; i++) {
      if (NIV_SHINGLES.has(all.slice(i, i + SHINGLE).join(' '))) { inside = true; break; }
    }
    if (inside) hits.push(`${m[2].replace(/<[^>]*>/g, '').trim()} -> ${m[1]}`);
  }
  return hits;
}

function italicProbe(html) {
  const out = [];
  // S188: THE ITALIC PROBE HAD THE PAIRING BUG IT WAS BUILT TO AVOID.
  // The old pattern was /<(em|i)\b[^>]*>([\s\S]{40,900}?)<\/\1>/ — a 40-char MINIMUM on
  // the RAW span. When a real italic span is shorter than that (`<em>anything else in
  // all creation</em>`, 29 chars), the minimum forces the match past its own closing
  // tag to the NEXT one, swallowing all the ordinary prose in between — and reporting
  // that prose's perfectly legitimate links as links inside Scripture. This is S186's
  // quote-mark mis-pairing exactly, recurring in tag form: pair to the NEAREST close.
  // The plain-text length filter below already enforces the 40-char floor honestly.
  const re = /<(em|i)\b[^>]*>((?:(?!<\/?(?:em|i)\b)[\s\S])*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const inner = m[2];
    if (!/<a\s[^>]*href="\//i.test(inner)) continue;
    const plain = inner.replace(/<[^>]*>/g, '').trim();
    if (plain.length < 40) continue;
    if (/^["“]/.test(plain)) continue;                        // covered by the paired sweep
    const links = linkInsideScripture(inner);
    if (!links.length) continue;
    out.push({ text: plain.slice(0, 140), links });
  }
  return out;
}

// ---------------------------------------------------------------- run
const ITALIC = process.argv.includes('--italic');
const only = process.argv.find(a => a.endsWith('.html'));
const files = only ? [path.join(ROOT, only)] : walk(ROOT);

if (ITALIC) {
  let n = 0, pages = 0;
  console.log('\n  ITALIC PROBE — internal links inside UNMARKED (italic) Scripture\n');
  for (const f of files) {
    const hits = italicProbe(decodeQuoteEntities(fs.readFileSync(f, 'utf8')));
    if (!hits.length) continue;
    pages++; n += hits.length;
    console.log(`  ── ${path.relative(ROOT, f)}`);
    for (const h of hits) {
      console.log(`     ${h.text}`);
      for (const l of h.links) console.log(`        link: ${l}`);
    }
    console.log('');
  }
  console.log(`  ${files.length} page(s) scanned · ${pages} flagged · ${n} span(s)\n`);
  console.log('  HIGH RECALL BY DESIGN. Emphasis on the site\'s own prose is the expected');
  console.log('  false positive. Flag only where the italic text is Scripture verbatim.\n');
  process.exit(0);
}

let flagged = 0, total = 0, odd = 0;
const rows = [];

for (const f of files) {
  // S188: the PAIRED path is deliberately NOT entity-decoded. Every decoded mark is
  // another parity token, and with no BLOCK_RESET here one odd count lets a "quoted
  // run" swallow the page's footer nav. The italic path above IS decoded, because it
  // is gated on the NIV shingle and cannot run away. See analyze-quoted-links.js.
  const html = fs.readFileSync(f, 'utf8');
  const { findings, oddCount } = analyze(f, html);
  if (oddCount) odd++;
  if (!findings.length) continue;
  flagged++;
  total += findings.length;
  rows.push({ file: path.relative(ROOT, f), findings });
}

console.log('\n  THE QUOTATION SWEEP — links inside quoted Scripture (paired by alternation)\n');
if (!rows.length) {
  console.log('  CLEAN — no link found inside any quoted Scripture span.\n');
} else {
  for (const r of rows) {
    console.log(`  ── ${r.file}`);
    for (const f of r.findings) {
      console.log(`     ${f.shape.padEnd(8)} link text: "${f.link}"`);
      console.log(`              quote: ${f.quote}`);
    }
    console.log('');
  }
}
console.log(`  ${files.length} page(s) scanned · ${flagged} flagged · ${total} finding(s) · ${odd} page(s) with an odd quote-token count\n`);
console.log('  TRIAGE, NOT VERDICT. A link whose visible text IS the reference is a');
console.log('  citation label and legitimate. The defect is an internal link woven into');
console.log('  the Bible\'s own words: unwrap it and re-home the link in the prose gloss');
console.log('  beside the verse (VOICE §IX.4, §V.2).\n');
console.log('  HEADINGS: run  grep -c \'<h2[^>]*>[^<]*<a \' *.html  — must stay at 0.\n');
