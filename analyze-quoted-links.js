#!/usr/bin/env node
/**
 * analyze-quoted-links.js — classify what sweep-quoted-links.js found (S186)
 *
 * Class A (REDUNDANT): the anchor inside the quotation points at the SAME href
 *   as a citation-label anchor adjacent to that quotation. The link is pure
 *   noise — unwrapping loses nothing, because the href survives on the label.
 *   Mechanically safe.
 *
 * Class B (UNIQUE): the inner anchor's href appears nowhere else near the
 *   quotation. Unwrapping drops a link, so it must be re-homed into the prose
 *   gloss beside the verse. Editorial.
 *
 * Class C (ELSEWHERE): the href is not on the adjacent label but DOES appear
 *   elsewhere on the same page. Unwrapping costs the page nothing.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const NEAR = 260;

const SKIP_DIRS = new Set(['archive', '.s137-bak', 'node_modules', '.git', 'Reformed Sources', 'docs']);
const SKIP_FILES = new Set(['all-content.html', '404.html']);
const REF_RE = /\b(?:[1-3]\s?)?(?:[A-Z][a-zA-Z]{2,}|[A-Z]{3,})\.?\s+\d{1,3}\s?:\s?\d{1,3}/;
const LABEL_ONLY_RE = /^\s*(?:[—–-]\s*)?(?:[1-3]\s?)?[A-Za-z][A-Za-z ]{1,20}\.?\s*\d{1,3}\s?:\s?\d{1,3}(?:\s?[-–]\s?\d{1,3})?\s*$/;
const CITATION_CLASS_RE = /class="[^"]*(?:verse-ref|passage-verse|scripture-ref|cite|chain-link-greek)[^"]*"/i;
const CARD_CLASS_RE = /class="[^"]*(?:card|tile|door|cta|nav-|pill|hub-|grid-item|verse-box|topic-|chip)[^"]*"/i;
const isCard = (an, html) => CARD_CLASS_RE.test(an.tag) || /<(?:div|h[1-6]|section|article|ul|ol|table)\b/i.test(html.slice(an.contentStart, an.end));

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue; walk(path.join(d, e.name), o); }
    else if (e.name.endsWith('.html') && !SKIP_FILES.has(e.name)) o.push(path.join(d, e.name));
  }
  return o;
}

function tokenize(html) {
  const tokens = [], anchors = [], stack = [];
  let inTag = false, tagStart = 0, skipUntil = null;
  for (let i = 0; i < html.length; i++) {
    const c = html[i];
    if (skipUntil) { if (c === '<' && html.startsWith(skipUntil, i)) { i += skipUntil.length - 1; skipUntil = null; } continue; }
    if (!inTag && c === '<') {
      const lo = html.slice(i, i + 8).toLowerCase();
      if (lo.startsWith('<script')) { const e = html.indexOf('>', i); if (e > -1) { i = e; skipUntil = '</script'; continue; } }
      if (lo.startsWith('<style'))  { const e = html.indexOf('>', i); if (e > -1) { i = e; skipUntil = '</style';  continue; } }
      if (html.startsWith('<!--', i)) { const e = html.indexOf('-->', i); if (e > -1) { i = e + 2; continue; } }
      inTag = true; tagStart = i; continue;
    }
    if (inTag) {
      if (c === '>') {
        const tag = html.slice(tagStart, i + 1), lo = tag.toLowerCase();
        if (lo.startsWith('<a ') || lo === '<a>') stack.push({ open: tagStart, contentStart: i + 1, tag });
        else if (lo.startsWith('</a')) { const a = stack.pop(); if (a) anchors.push({ start: a.open, contentStart: a.contentStart, end: i + 1, tag: a.tag, text: html.slice(a.contentStart, tagStart).replace(/<[^>]*>/g, '').trim() }); }
        inTag = false;
      }
      continue;
    }
    if (c === '"' || c === '“' || c === '”') tokens.push({ pos: i, depth: stack.length, anchorOpen: stack.length ? stack[stack.length - 1].open : null });
  }
  return { tokens, anchors };
}

const href = t => (t.match(/href="([^"]*)"/) || [, ''])[1];

let A = 0, B = 0, C = 0, W = 0;
const perFile = {};
const files = walk(ROOT);

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const { tokens, anchors } = tokenize(html);
  const pageHrefs = anchors.map(a => href(a.tag));
  const rel = path.relative(ROOT, f);

  for (let k = 0; k + 1 < tokens.length; k += 2) {
    const a = tokens[k], b = tokens[k + 1];
    const span = html.slice(a.pos, b.pos + 1);
    const plain = span.replace(/<[^>]*>/g, '');
    if (plain.length < 20 || plain.length > 600) continue;
    const after = html.slice(b.pos + 1, b.pos + 161).replace(/<[^>]*>/g, ' ');
    if (!REF_RE.test(plain) && !REF_RE.test(after)) continue;

    // labels adjacent to this quotation (before or after)
    const nearLabels = anchors.filter(an =>
      (an.start > b.pos && an.start < b.pos + NEAR) || (an.end < a.pos && an.end > a.pos - NEAR));
    const nearHrefs = new Set(nearLabels.map(an => href(an.tag)));

    for (const an of anchors.filter(x => x.start > a.pos && x.start < b.pos)) {
      if (LABEL_ONLY_RE.test(an.text) || CITATION_CLASS_RE.test(an.tag) || isCard(an, html)) continue;
      const h = href(an.tag);
      let cls;
      if (nearHrefs.has(h)) cls = 'A';
      else if (pageHrefs.filter(x => x === h).length > 1) cls = 'C';
      else cls = 'B';
      cls === 'A' ? A++ : cls === 'C' ? C++ : B++;
      (perFile[rel] ||= { A: 0, B: 0, C: 0, W: 0 })[cls]++;
    }
    if (a.depth > 0 && a.anchorOpen !== null) {
      const an = anchors.find(x => x.start === a.anchorOpen);
      if (an && !LABEL_ONLY_RE.test(an.text) && !CITATION_CLASS_RE.test(an.tag) && !isCard(an, html)) { W++; (perFile[rel] ||= { A: 0, B: 0, C: 0, W: 0 }).W++; }
    }
  }
}

console.log('\n  CLASSIFICATION OF LINKS INSIDE QUOTED SCRIPTURE\n');
console.log(`  Class A  REDUNDANT  ${String(A).padStart(4)}  href duplicated by an adjacent citation label — safe to unwrap`);
console.log(`  Class C  ELSEWHERE  ${String(C).padStart(4)}  href appears elsewhere on the page — safe to unwrap`);
console.log(`  Class B  UNIQUE     ${String(B).padStart(4)}  sole occurrence — unwrapping drops a link; re-home it in prose`);
console.log(`  WRAPPED             ${String(W).padStart(4)}  the whole quotation is itself a link\n`);

const top = Object.entries(perFile).sort((x, y) => (y[1].A + y[1].B + y[1].C + y[1].W) - (x[1].A + x[1].B + x[1].C + x[1].W)).slice(0, 99);
console.log('  WORST PAGES        A    C    B    W');
for (const [f, v] of top) console.log(`  ${f.padEnd(48)} ${String(v.A).padStart(3)} ${String(v.C).padStart(4)} ${String(v.B).padStart(4)} ${String(v.W).padStart(4)}`);
console.log(`\n  ${Object.keys(perFile).length} page(s) affected of ${files.length} scanned\n`);
