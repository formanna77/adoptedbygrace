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
  let anchorId = 'main-content';

  // --- target anchor ---
  const hasTarget = /id="main-content"/.test(html);
  if (!hasTarget) {
    if (/<article class="article-body"/.test(html)) {
      // THE id GOES AFTER THE class. NOT BEFORE. This is not style.
      //
      // 21 scripts — build-tags, build-all-content, build-homepage-counts,
      // dedupe-prose-links, share-bar (a RUNTIME script), every detect-*/audit-*,
      // and validate-site CHECK 11 — match the exact literal substring
      // `<article class="article-body"`. Writing `<article id="main-content"
      // class="article-body">` is semantically identical HTML, indistinguishable
      // in a browser, and invisible to all 21 of them: in S194 that one edit
      // dropped the canonical article count from 618 to 89 while the validator
      // still reported every check passing, because CHECK 11 does
      // `if (open === -1) continue` and silently skipped 529 pages.
      //
      // This script carried that exact bug until S198. It reported "0 pages"
      // and looked harmless only because every page with an article wrapper
      // already had a skip link — a loaded gun waiting for the first new
      // article page that did not. CHECK 14 is the guardrail; do not rely on it.
      html = html.replace('<article class="article-body"', '<article class="article-body" id="main-content"');
      idAdded++;
    } else {
      // NON-ARTICLE PAGES GET AN ANCHOR TOO (S198).
      //
      // The original bailed here, on the reasonable-sounding grounds that it
      // should not invent an anchor in markup it does not understand. The
      // effect was that 26 pages — including `questions`, `start-here`,
      // `best-reads`, `topics`, and every audience landing page (`for-doubters`,
      // `for-hurting`, `for-skeptics`, `for-new-believers`, `for-arminians`) —
      // permanently failed WCAG 2.4.1. Those are doorways. A reader arriving on
      // `for-hurting` with a screen reader had to hear the entire navigation
      // before the first word written for them.
      //
      // The markup is not actually unknown: 22 of the 26 use `.hub-container`
      // and the rest have a <main>. Anchor the real content region, in
      // preference order, and REUSE an existing id rather than adding a second.
      const target =
        html.match(/<main\b[^>]*\bid="([^"]+)"/) ||
        html.match(/<(?:main|section|div)\b[^>]*\bclass="[^"]*\bhub-container\b[^"]*"[^>]*\bid="([^"]+)"/);
      if (target) {
        anchorId = target[1];                    // already anchorable
      } else {
        const m =
          html.match(/<main\b[^>]*>/) ||
          html.match(/<(?:main|section|div)\b[^>]*\bclass="[^"]*\bhub-container\b[^"]*"[^>]*>/) ||
          // Widgets that carry article-body on a non-<article> element, or with
          // extra classes after it, so the exact-literal branch above misses
          // them: <article class="article-body sixty-stage">, <section
          // class="cascade-container article-body">. Anchoring these is safe —
          // the id lands at the END of the attribute list, so the literal
          // `<article class="article-body"` substring is never disturbed.
          html.match(/<(?:article|section|div)\b[^>]*\bclass="[^"]*\barticle-body\b[^"]*"[^>]*>/);
        if (!m) { if (!/skip-to-content/.test(html)) skipped.push(f); continue; }
        html = html.replace(m[0], m[0].replace(/>$/, ' id="main-content">'));
        idAdded++;
      }
    }
  }

  // --- the link itself, first focusable element in <body> ---
  if (!/skip-to-content/.test(html)) {
    const m = html.match(/<body[^>]*>/);
    if (m) {
      const link = LINK.replace('#main-content', '#' + anchorId);
      html = html.replace(m[0], m[0] + '\n    ' + link);
      added++;
    }
  }

  if (html !== before) fs.writeFileSync(f, html);
}

console.log(`skip links added : ${added} page(s)`);
console.log(`#main-content ids: ${idAdded} page(s)`);
if (skipped.length) console.log(`left alone (no article wrapper to anchor): ${skipped.length} page(s)`);
