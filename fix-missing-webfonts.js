#!/usr/bin/env node
/* ============================================================
   FIX: 362 pages rendered in fallback fonts   (S194, 2026-07-29)
   ------------------------------------------------------------
   /global.css has always demanded two typefaces it never supplied:

       body          { font-family: 'Inter', sans-serif; }
       h1, h2, h3, h4{ font-family: 'Playfair Display', serif; }

   with zero @font-face and zero @import anywhere in the stylesheet. The only
   source of either typeface is a <link> to Google Fonts pasted into each
   page's <head> — and that link was present on just 325 of 687 pages.

   So 347 live ARTICLES — 56% of the corpus — rendered every heading in the
   browser's default serif (Times New Roman) and every paragraph in the
   default sans (Arial), while the other pages rendered in Playfair Display
   and Inter. The site had two entirely different typographic identities and
   which one a reader met depended on which door they came through.

   The standard is that no matter what page someone lands on, they must feel
   the undeniable force of truth in its words. A reader who lands on Romans 9
   set in Times New Roman has already been told something about how seriously
   to take it, before reading a line. Typography is not decoration here; it is
   the difference between a doorway and a draft.

   The fingerprint of how it happened is still on the pages: 340 of the 362
   carry <link rel="preconnect" href="https://fonts.googleapis.com"> and no
   font request at all. An automated "performance hints" pass added
   connection warm-ups for a stylesheet that was never there — optimising the
   loading of nothing, on more than half the site, for months.

   This restores the link, and adds the fonts.gstatic.com preconnect (the one
   that actually matters, since the font FILES come from gstatic, not from
   googleapis). display=swap is already in the URL, so text paints immediately
   in the fallback and swaps when the face arrives — no invisible-text stall.

   Idempotent.
   ============================================================ */

const fs = require('fs');

const FONT_CSS =
  '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">';
const PRE_API = '<link rel="preconnect" href="https://fonts.googleapis.com">';
const PRE_STATIC = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
const ANCHOR = '<link rel="stylesheet" href="/global.css">';

let fixed = 0, addedStatic = 0, addedApi = 0, skipped = [];

for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) {
  if (f === '_nav-template.html') continue;            // a fragment, not a page
  const before = fs.readFileSync(f, 'utf8');
  if (before.includes('fonts.googleapis.com/css')) continue;   // already fine
  if (!before.includes(ANCHOR)) { skipped.push(f); continue; }

  // Build only the pieces this page is actually missing, so re-runs are inert
  // and pages that already warm the connection don't get a second copy.
  const parts = [];
  if (!/preconnect[^>]*fonts\.googleapis/.test(before)) { parts.push(PRE_API); addedApi++; }
  if (!/preconnect[^>]*fonts\.gstatic/.test(before)) { parts.push(PRE_STATIC); addedStatic++; }
  parts.push(FONT_CSS);

  // Fonts must be requested BEFORE global.css, so the face is in flight while
  // the 303 KB stylesheet downloads rather than after it.
  fs.writeFileSync(f, before.replace(ANCHOR, parts.join('\n    ') + '\n    ' + ANCHOR));
  fixed++;
}

console.log(`restored web fonts on ${fixed} page(s)`);
console.log(`  + ${addedApi} googleapis preconnect(s), + ${addedStatic} gstatic preconnect(s)`);
if (skipped.length) console.log(`  skipped (no /global.css anchor): ${skipped.join(', ')}`);
