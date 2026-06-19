#!/usr/bin/env node
/**
 * build-og-cards.js — per-page Open Graph quote-cards for the flagship 50.
 * S109 (Campaign 3, Roads leg 2). Lane 3 cheap multiplier.
 *
 * For each flagship page: extract the page's OWN words (first pull-quote if
 * 30–180 chars, else meta description, else title), render a 1200x630 SVG in
 * the site palette (gold #d4a254 / ember #e8642c / dark #0a0a0f / cream
 * #f0ece4, Lora serif), rasterize to PNG in /og-cards/, and rewrite the
 * page's og:image + twitter:image + og:image:alt to the page-specific card.
 *
 * Truthful by construction: every quote is lifted verbatim from the page.
 * Requires: @resvg/resvg-js (render). Run: node build-og-cards.js [--check]
 * --check: verify-only parse pass (no writes).
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT_DIR = path.join(ROOT, 'og-cards');
const SITE = 'https://adoptedbygrace.net';

// The flagship 50: request-indexing queue's 30 + the next 20.
const FLAGSHIPS = [
  // — the request-indexing queue 30 (docs/request-indexing-queue.md) —
  'question-faithgift', 'question-where-did-your-faith-come-from', 'question-am-i-chosen',
  'question-depravity', 'scripture-tsunami', 'start-here', 'question-what-is-sovereign-grace',
  'question-romans9', 'question-john6', 'reformed-sources', 'systematic-soteriology',
  'systematic-election', 'systematic-atonement', 'systematic-effectual-calling',
  'systematic-perseverance', 'question-regeneration-precedes-faith', 'question-dead-in-sin-meaning',
  'question-pharaoh-hardened', 'question-ephesians1', 'question-foreknowledge',
  'question-is-predestination-in-the-bible', 'question-does-god-choose-who-goes-to-heaven',
  'question-predestined-to-hell', 'compare-calvinism-arminianism', 'compare-monergism-synergism',
  'objection-author-of-sin', 'objection-faith-choice', 'demolition-faith-is-not-a-gift',
  'question-calvinist-on-knees', 'question-john10',
  // — the next 20 —
  'question-unfair', 'demolition-1tim2-4', 'demolition-2peter3-9', 'demolition-ezekiel33-11',
  'demolition-matthew-23-37', 'question-godwants', 'philosophy-problem-of-merit',
  'psychology-why-we-resist', 'analogy-lazarus-grave', 'devotional-chosen-before-you-were-broken',
  'story-hard-hitting-the-drowning-man', 'compare-reformed-vs-eastern-orthodox',
  'compare-lutheranism', 'compare-can-the-saved-be-lost', 'analytical-divine-simplicity',
  'analytical-impassibility', 'analytical-immutability', 'question-free-offer-of-the-gospel',
  'question-1john5-1', 'best-reads',
  // — S110 Phase D builds —
  'analytical-archetypal-ectypal', 'analytical-necessity-of-the-atonement', 'analytical-glory-and-election',
  // — S113 Phase D builds —
  'demolition-john15-2', 'apologetic-i-never-knew-you',
  // — S116 Phase D builds —
  'compare-wesleyan-methodism', 'compare-provisionism',
  // — S119 Phase D build —
  'compare-hyper-calvinism',
  // — S122 Phase D build —
  'question-what-is-the-gospel',
  // — S133 Phase D build: the Seeker's Threshold trio —
  'question-what-must-i-do-to-be-saved', 'question-i-cant-believe', 'question-is-it-too-late',
];

const FONT_FILES = [
  '/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf',
  '/usr/share/fonts/truetype/google-fonts/Lora-Italic-Variable.ttf',
  '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',
];

function stripTags(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
function decodeEntities(s) {
  return s
    .replace(/&ldquo;|&#8220;/g, '“').replace(/&rdquo;|&#8221;/g, '”')
    .replace(/&lsquo;|&#8216;/g, '‘').replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&mdash;|&#8212;/g, '—').replace(/&ndash;|&#8211;/g, '–')
    .replace(/&hellip;/g, '…').replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function extractQuote(html, slug) {
  // 1) first pull-quote (any of the three classes), 30–180 chars
  const pqRe = /<(?:blockquote|div)[^>]*class="[^"]*(?:sop-pullquote|pull-quote|pullquote)[^"]*"[^>]*>([\s\S]*?)<\/(?:blockquote|div)>/g;
  let m;
  while ((m = pqRe.exec(html)) !== null) {
    const t = decodeEntities(stripTags(m[1]));
    if (t.length >= 30 && t.length <= 180) return { text: t, source: 'pull-quote' };
  }
  // 2) meta description
  const md = html.match(/<meta name="description" content="([^"]+)"/);
  if (md) {
    const t = decodeEntities(md[1]).trim();
    if (t.length >= 30 && t.length <= 200) return { text: t, source: 'description' };
    if (t.length > 200) return { text: t.slice(0, 197).replace(/\s+\S*$/, '') + '…', source: 'description' };
  }
  // 3) title
  const tt = html.match(/<title>([^<]+)<\/title>/);
  return { text: decodeEntities(tt ? tt[1].split('|')[0].trim() : slug), source: 'title' };
}

function extractTitle(html, slug) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1) {
    let t = decodeEntities(stripTags(h1[1]));
    if (t.length > 90) t = t.slice(0, 87).replace(/\s+\S*$/, '') + '…';
    return t;
  }
  const tt = html.match(/<title>([^<]+)<\/title>/);
  return decodeEntities(tt ? tt[1].split('|')[0].trim() : slug);
}

// Greedy word-wrap to a max chars-per-line.
function wrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) { lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function buildSvg(quote, title) {
  // Size the quote type to its length.
  let fs1, maxChars;
  const L = quote.length;
  if (L <= 70) { fs1 = 52; maxChars = 30; }
  else if (L <= 110) { fs1 = 44; maxChars = 36; }
  else if (L <= 150) { fs1 = 38; maxChars = 44; }
  else { fs1 = 33; maxChars = 50; }
  const lines = wrap(quote, maxChars);
  const lh = Math.round(fs1 * 1.32);
  const blockH = lines.length * lh;
  const centerY = 295;
  const firstY = centerY - blockH / 2 + lh * 0.75;

  const titleLines = wrap(title, 58);
  const quoteTspans = lines.map((ln, i) =>
    `<text x="600" y="${Math.round(firstY + i * lh)}" text-anchor="middle" font-family="Lora" font-size="${fs1}" font-weight="500" fill="#f0ece4">${xmlEscape(ln)}</text>`
  ).join('\n  ');
  const titleText = titleLines.map((ln, i) =>
    `<text x="600" y="${505 + i * 30}" text-anchor="middle" font-family="Lora" font-size="22" fill="#d4a254">${xmlEscape(ln)}</text>`
  ).join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#12121a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="20" y="20" width="1160" height="590" rx="8" fill="none" stroke="#d4a254" stroke-width="1" opacity="0.3"/>
  <line x1="600" y1="52" x2="600" y2="112" stroke="#d4a254" stroke-width="2" opacity="0.35"/>
  <line x1="575" y1="77" x2="625" y2="77" stroke="#d4a254" stroke-width="2" opacity="0.35"/>
  ${quoteTspans}
  <line x1="450" y1="460" x2="750" y2="460" stroke="#e8642c" stroke-width="1" opacity="0.55"/>
  ${titleText}
  <text x="600" y="588" text-anchor="middle" font-family="Lora" font-size="17" fill="#807b75">adoptedbygrace.net</text>
</svg>`;
}

function rewriteMeta(html, slug, altText) {
  const url = `${SITE}/og-cards/${slug}.png`;
  let out = html;
  let changed = 0;
  out = out.replace(/(<meta property="og:image" content=")[^"]+(")/,
    (_, a, b) => { changed++; return a + url + b; });
  out = out.replace(/(<meta name="twitter:image" content=")[^"]+(")/,
    (_, a, b) => { changed++; return a + url + b; });
  out = out.replace(/(<meta property="og:image:alt" content=")[^"]+(")/,
    (_, a, b) => { changed++; return a + altText.replace(/"([^"]*)"/g, '‘$1’').replace(/"/g, '’') + b; });
  return { out, changed };
}

function main() {
  const checkOnly = process.argv.includes('--check');
  if (!checkOnly && !fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

  let Resvg = null;
  if (!checkOnly) {
    try { Resvg = require('@resvg/resvg-js').Resvg; }
    catch (e) {
      try { Resvg = require('/tmp/node_modules/@resvg/resvg-js').Resvg; }
      catch (e2) { console.error('FATAL: @resvg/resvg-js not found (npm install @resvg/resvg-js)'); process.exit(1); }
    }
  }
  const fontFiles = FONT_FILES.filter(f => fs.existsSync(f));

  let built = 0, wired = 0, failures = 0, checked = 0;
  for (const slug of FLAGSHIPS) {
    const file = path.join(ROOT, slug + '.html');
    if (!fs.existsSync(file)) { console.error('MISSING PAGE: ' + slug); failures++; continue; }
    const html = fs.readFileSync(file, 'utf8');

    if (checkOnly) {
      const og = html.match(/<meta property="og:image" content="([^"]+)"/);
      const tw = html.match(/<meta name="twitter:image" content="([^"]+)"/);
      const expect = `${SITE}/og-cards/${slug}.png`;
      const pngOk = fs.existsSync(path.join(OUT_DIR, slug + '.png'));
      const ok = og && tw && og[1] === expect && tw[1] === expect && pngOk;
      if (!ok) { console.error(`CHECK FAIL ${slug}: og=${og && og[1]} tw=${tw && tw[1]} png=${pngOk}`); failures++; }
      else checked++;
      continue;
    }

    const { text: quote } = extractQuote(html, slug);
    const title = extractTitle(html, slug);
    const svg = buildSvg(quote, title);
    try {
      const resvg = new Resvg(svg, {
        fitTo: { mode: 'width', value: 1200 },
        font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Lora' },
        background: '#0a0a0f',
      });
      fs.writeFileSync(path.join(OUT_DIR, slug + '.png'), resvg.render().asPng());
      built++;
    } catch (e) { console.error('RENDER FAIL ' + slug + ': ' + e.message); failures++; continue; }

    const alt = `${title} — Adopted by Grace`;
    const { out, changed } = rewriteMeta(html, slug, alt);
    if (changed < 2) { console.error('WIRE FAIL ' + slug + ' (only ' + changed + ' meta tags matched)'); failures++; continue; }
    fs.writeFileSync(file, out);
    wired++;
  }
  if (checkOnly) console.log(`CHECK: ${checked}/${FLAGSHIPS.length} pages verified, ${failures} failures`);
  else console.log(`Built ${built} cards, wired ${wired} pages, ${failures} failures.`);
  process.exit(failures ? 1 : 0);
}
main();
