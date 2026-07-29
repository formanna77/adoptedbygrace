#!/usr/bin/env node
/* ============================================================
   FIX: render-blocking + double-loaded nav scripts   (S194, 2026-07-29)
   ------------------------------------------------------------
   Two defects, both site-wide, both invisible to every existing check.

   1. /nav.js was render-BLOCKING on all 687 pages. It is 184 KB, and 150 KB
      of that (81%) is the static MEGA_MENU_DATA literal — a navigation blob
      the reader cannot see until they open a menu, parsed before the first
      word of the page paints. On a phone on cellular data that is the
      difference between arriving and bouncing. We can out-argue every peer
      site on the page and still lose the reader who never got to read it.

      Deferring is provably safe here: nav.js contains no document.write, and
      its own bootstrap already waits for DOMContentLoaded before touching the
      DOM (`if (document.readyState === 'loading') addEventListener(...)`).
      Under defer the script executes with readyState 'interactive', so
      _navInit() simply runs immediately — identical behaviour, off the
      critical path.

   2. 41 pages — including index.html, the front door — loaded BOTH /nav.js
      and /ux-enhancements.js twice. That is 199 KB re-fetched and re-parsed
      per pageview, and nav init running twice over the same DOM.

   Idempotent: safe to re-run, changes nothing on a clean corpus.
   ============================================================ */

const fs = require('fs');

const TARGETS = ['/nav.js', '/ux-enhancements.js'];

// Matches one whole <script ... src="/x.js" ...></script> line, with its
// leading indentation and trailing newline, so removal leaves no blank gap.
const lineFor = src =>
  new RegExp(`^[ \\t]*<script\\b[^>]*src="${src.replace(/[/.]/g, '\\$&')}"[^>]*>\\s*</script>[ \\t]*\\r?\\n`, 'gm');

let dedupedPages = 0, deferredPages = 0, tagsRemoved = 0;

for (const file of fs.readdirSync('.').filter(f => f.endsWith('.html'))) {
  const before = fs.readFileSync(file, 'utf8');
  let html = before;

  // --- 1. De-duplicate: keep the LAST occurrence (the canonical block that
  //        sits before </body>), drop every earlier copy. ---
  let didDedupe = false;
  for (const src of TARGETS) {
    const hits = [...html.matchAll(lineFor(src))];
    if (hits.length < 2) continue;
    // Walk backwards so earlier indices stay valid while splicing.
    for (const m of hits.slice(0, -1).reverse()) {
      html = html.slice(0, m.index) + html.slice(m.index + m[0].length);
      tagsRemoved++;
    }
    didDedupe = true;
  }
  if (didDedupe) dedupedPages++;

  // --- 2. Take /nav.js off the critical path. ---
  let didDefer = false;
  html = html.replace(
    /<script\b([^>]*)src="\/nav\.js"([^>]*)>/g,
    (whole, pre, post) => {
      if (/\bdefer\b|\basync\b/.test(pre + post)) return whole;
      didDefer = true;
      return `<script${pre}src="/nav.js"${post} defer>`;
    }
  );
  if (didDefer) deferredPages++;

  if (html !== before) fs.writeFileSync(file, html);
}

console.log(`de-duplicated : ${dedupedPages} page(s), ${tagsRemoved} redundant <script> tag(s) removed`);
console.log(`deferred nav  : ${deferredPages} page(s) — 184 KB off the critical path each`);
