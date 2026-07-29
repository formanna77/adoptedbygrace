#!/usr/bin/env node
/* ============================================================
   FIX: skip-to-content link missing on 572 pages   (S194, 2026-07-29)
   ------------------------------------------------------------
   115 pages carried a working skip link. The other 572 did not — so a reader
   using a keyboard or a screen reader had to tab through the site name, the
   hamburger, the search button, and ten navigation links before reaching the
   first word of the article. On every page. Every time.

   That is WCAG 2.4.1 (Bypass Blocks), and it is not an abstraction here. The
   mission is that someone searching for what is true finds it. Nothing in that
   sentence has an exception for the reader who cannot use a mouse.

   Two pieces are required and the existing 115 pages prove the pattern:
     1. <a href="#main-content" class="skip-to-content">  as the first
        focusable element in <body> — the styling already exists in global.css
        (visually hidden until focused).
     2. id="main-content" on the article wrapper, so the link has a target.
        A skip link pointing at a missing anchor is worse than none: it looks
        like compliance and moves focus nowhere.

   Only touches pages that already have <article class="article-body">, and
   never adds a second id or a second link. Idempotent.
   ============================================================ */

const fs = require('fs');

const LINK = '<a href="#main-content" class="skip-to-content">Skip to content</a>';

let added = 0, idAdded = 0, skipped = [];

for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) {
  if (f === '_nav-template.html') continue;
  const before = fs.readFileSync(f, 'utf8');
  let html = before;

  // --- target anchor ---
  const hasTarget = /id="main-content"/.test(html);
  if (!hasTarget) {
    if (/<article class="article-body"/.test(html)) {
      html = html.replace('<article class="article-body"', '<article id="main-content" class="article-body"');
      idAdded++;
    } else {
      // No article wrapper (hub, widget, utility). Leave it alone rather than
      // inventing an anchor in markup this script does not understand.
      if (!/skip-to-content/.test(html)) skipped.push(f);
      continue;
    }
  }

  // --- the link itself, first focusable element in <body> ---
  if (!/skip-to-content/.test(html)) {
    const m = html.match(/<body[^>]*>/);
    if (m) { html = html.replace(m[0], m[0] + '\n    ' + LINK); added++; }
  }

  if (html !== before) fs.writeFileSync(f, html);
}

console.log(`skip links added : ${added} page(s)`);
console.log(`#main-content ids: ${idAdded} page(s)`);
if (skipped.length) console.log(`left alone (no article wrapper to anchor): ${skipped.length} page(s)`);
