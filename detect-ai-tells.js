#!/usr/bin/env node
/*
 * detect-ai-tells.js — the UNIFORMITY detector.  (built S183)
 *
 * Specified in VOICE.md §XXII's companion-tooling note and carried unbuilt on
 * every kickoff since S177. §XXII.5 names the thing it exists to find:
 *
 *   "Every tic above can be scrubbed and the prose will still read as
 *    manufactured, because the real fingerprint is not any feature — it is
 *    THE ABSENCE OF VARIANCE. ... He does not think 'a computer wrote this.'
 *    He thinks 'something is off,' and he leaves."
 *
 * ── THE LOAD-BEARING DESIGN DECISION: NO ABSOLUTE THRESHOLD ─────────────────
 * The obvious implementation — flag any page whose paragraph-length variance
 * falls under some hard-coded number — is worthless here, and for a reason
 * worth writing down. "Low variance" has no meaning in the abstract: a 400-word
 * printable and a 3,000-word systematic page have different natural spreads,
 * and any constant picked today silently mis-scores the whole corpus tomorrow.
 *
 * So this scores every page AGAINST THE CORPUS ITSELF. It computes the
 * coefficient of variation (SD/mean, which is scale-free and therefore
 * comparable across page lengths) for paragraph length and for sentence
 * length, ranks all 691 pages, and reports the flattest tail. The output is
 * always relative: "this page is in the bottom decile of rhetorical variance
 * for this site." That is a claim the number can actually support.
 *
 * A LOW score is the flag. This is the one detector here where the suspicious
 * direction is downward, so read the table accordingly.
 *
 * ── WHAT IT DOES NOT KNOW ───────────────────────────────────────────────────
 * Uniformity is a SMELL, never a verdict — more purely triage than any other
 * script in this repo. A genuinely tight, disciplined page can score low; a
 * page padded with ragged filler scores beautifully and is worse. §XXII.5's
 * own resolution of the tension with §VII.1 is the reading instruction:
 * compression removes sentences doing NO WORK, unevenness governs the REGISTER
 * of the sentences that remain. This script measures register, not filler. It
 * cannot tell a plain stretch carrying the reader (working, sanctioned) from a
 * flat stretch that never woke up. Only the cold read does that.
 *
 * The surface tics from §XXII.4 are also counted, per the spec. They are
 * secondary: any one of them can be scrubbed while the page stays synthetic,
 * which is the entire point of §XXII.5.
 *
 * Usage:
 *   node detect-ai-tells.js               # flattest 25 pages, corpus-relative
 *   node detect-ai-tells.js --top 40      # show more
 *   node detect-ai-tells.js --tics        # rank by surface tics instead
 *   node detect-ai-tells.js <page>.html   # one page, with its corpus percentile
 */

const fs = require('fs');

const args = process.argv.slice(2);
const only = args.find(a => a.endsWith('.html'));
const byTics = args.includes('--tics');
const topN = (() => { const i = args.indexOf('--top'); return i >= 0 ? +args[i + 1] : 25; })();

// Furniture that is not the writer's prose. Card decks, nav rails and the
// "Go Deeper" blocks are uniform BY DESIGN — including them would make every
// page look flat and drown the real signal. Same lesson the close detector
// learned across S179/S180 (five false-positive classes, all containers).
const FURNITURE = /(related-articles|hub-card|card-description|card-title|card-footer|card-scripture|nav-|footer|breadcrumb|share-|engage-cta|go-deeper|explore-further|next-step|fork-actions|fork-btn|print-tip|print-btn|mirror-q|step-q|footer-small)/i;

function prose(file) {
  let raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/<article class="article-body">([\s\S]*?)<\/article>/);
  let body = m ? m[1] : raw;
  body = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const paras = [];
  const re = /<p\b([^>]*)>([\s\S]*?)<\/p>/gi;
  let x;
  while ((x = re.exec(body))) {
    if (FURNITURE.test(x[1])) continue;
    const before = body.slice(Math.max(0, x.index - 260), x.index);
    if (FURNITURE.test(before)) continue;
    const t = x[2].replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—')
      .replace(/&[a-z]+;|&#\d+;/gi, ' ').replace(/\s+/g, ' ').trim();
    if (t.split(' ').length >= 12) paras.push(t);
  }
  return paras;
}

const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const sd = a => {
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1));
};
// Coefficient of variation: scale-free, so a 400-word printable and a 3,000-word
// systematic page are actually comparable.
const cv = a => (a.length < 2 || mean(a) === 0) ? 0 : sd(a) / mean(a);

function score(file) {
  const paras = prose(file);
  if (paras.length < 5) return null;
  const words = paras.map(p => p.split(/\s+/).length);
  const sents = paras.flatMap(p => p.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 1))
    .map(s => s.split(/\s+/).length);
  if (sents.length < 12) return null;

  const text = paras.join(' ');
  const wc = text.split(/\s+/).length;
  const per1k = n => +(n / wc * 1000).toFixed(1);

  // §XXII.4 surface tics
  const emdash = (text.match(/—/g) || []).length;
  const antithesis = (text.match(/\b(?:is|was|are|it's|it is) not\b[^.!?]{0,70}\.\s*(?:It|He|You|That|This)\s+(?:is|was)\b/gi) || []).length
    + (text.match(/\bnot [a-z]+[^.!?]{0,40}\bbut\b/gi) || []).length;
  const staccato = (text.match(/(?:\b\w[\w'-]*\s?[\w'-]*\.\s+){3,}/g) || [])
    .filter(s => s.split('.').filter(Boolean).every(f => f.trim().split(/\s+/).length <= 3)).length;
  const tricolon = (text.match(/\b\w[^.,!?;]{2,40},\s[^.,!?;]{2,40},\s(?:and\s)?[^.,!?;]{2,40}[.!?]/g) || []).length;
  const rhetQ = (text.match(/\?\s+[A-Z]/g) || []).length;

  return {
    file, paras: paras.length, words: wc,
    pCV: +cv(words).toFixed(3),
    sCV: +cv(sents).toFixed(3),
    flat: +((cv(words) + cv(sents)) / 2).toFixed(3),
    emdash: per1k(emdash), antithesis, staccato, tricolon, rhetQ,
    tics: antithesis * 2 + staccato * 3 + Math.max(0, emdash / wc * 1000 - 12) + tricolon,
  };
}

const files = only ? [only]
  : fs.readdirSync('.').filter(f => f.endsWith('.html')).sort();
const rows = files.map(score).filter(Boolean);

console.log('\n  detect-ai-tells.js — VOICE §XXII.5, the uniformity metric\n');
console.log('  A LOW score is the flag. flat = mean of the paragraph- and sentence-length');
console.log('  coefficients of variation. Scored against THIS corpus, never an absolute:');
console.log('  the table is a percentile, not a verdict.\n');

if (only) {
  const r = rows[0];
  if (!r) { console.log('  too short to score.\n'); process.exit(0); }
  const all = fs.readdirSync('.').filter(f => f.endsWith('.html')).map(score).filter(Boolean);
  const pct = Math.round(all.filter(o => o.flat < r.flat).length / all.length * 100);
  console.log(`  ${r.file}`);
  console.log(`    paragraphs ${r.paras} · words ${r.words}`);
  console.log(`    paragraph-length CV ${r.pCV} · sentence-length CV ${r.sCV}`);
  console.log(`    flat ${r.flat}  → ${pct}th percentile of site variance` +
    (pct <= 10 ? '   ← BOTTOM DECILE: read it aloud for flat temperature' : ''));
  console.log(`    em-dash/1k ${r.emdash} · antithesis ${r.antithesis} · staccato ${r.staccato} · tricolon ${r.tricolon} · rhet-Q ${r.rhetQ}\n`);
  process.exit(0);
}

rows.sort((a, b) => byTics ? b.tics - a.tics : a.flat - b.flat);
const cut = [...rows].sort((a, b) => a.flat - b.flat)[Math.floor(rows.length * 0.1)];
console.log('  flat   pCV    sCV    em/1k  anti stac tric  page');
console.log('  ' + '─'.repeat(74));
for (const r of rows.slice(0, topN)) {
  console.log('  ' + String(r.flat).padEnd(7) + String(r.pCV).padEnd(7) + String(r.sCV).padEnd(7)
    + String(r.emdash).padEnd(7) + String(r.antithesis).padEnd(5) + String(r.staccato).padEnd(5)
    + String(r.tricolon).padEnd(6) + r.file.replace(/\.html$/, ''));
}
console.log(`\n  ${rows.length} page(s) scored · bottom-decile flat threshold ${cut.flat}`);
console.log('  corpus median flat ' + [...rows].sort((a, b) => a.flat - b.flat)[Math.floor(rows.length / 2)].flat + '\n');
console.log('  TRIAGE, NOT VERDICT — more so than any other detector here. A tight');
console.log('  disciplined page can score low; a page padded with ragged filler scores');
console.log('  well and is worse. §XXII.5: compression removes sentences doing no work,');
console.log('  unevenness governs the register of the ones that remain. Read it aloud.\n');
