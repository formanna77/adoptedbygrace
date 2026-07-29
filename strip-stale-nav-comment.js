#!/usr/bin/env node
/* ============================================================
   STRIP: the pasted CANONICAL NAV TEMPLATE comment block  (S194, 2026-07-29)
   ------------------------------------------------------------
   86 pages carry a full copy of the nav template's instruction comment —
   ~900 bytes each, 76 KB total, downloaded by every reader and read by none.
   It is documentation, and documentation belongs in the file it documents:
   /_nav-template.html, which is and remains canonical.

   Worse, the copies had already gone stale and self-contradictory. A previous
   sanitising pass had eaten tags out of the middle of them, leaving lines like

       REQUIRED in <head>:

       REQUIRED before :

   — a required instruction with its requirement deleted. A future agent
   reading that learns nothing and may well "fix" it by guessing.

   These blocks also cost real analysis time: a commented-out
   <script src="/nav.js"> inside them reads exactly like a live duplicate to
   any grep, and did — it produced a confident, wrong "41 pages double-load
   nav.js" finding before the comment boundaries were checked. Dead markup
   that mimics live markup is a trap laid for every future reader of this
   codebase, human or otherwise. Remove it.

   Safety: verified on all 86 pages that the real <nav> element sits OUTSIDE
   the comment, so nothing functional is inside the span being removed.
   Idempotent.
   ============================================================ */

const fs = require('fs');

// The whole comment, from ITS OWN <!-- through ITS OWN -->, plus surrounding
// indentation/newline so no blank hole is left behind.
//
// The (?:(?!-->)[^])*? guards are load-bearing and were learned the hard way.
// The obvious pattern — /<!--[^]*?CANONICAL NAV TEMPLATE[^]*?-->/ — looks
// correct and is not: the engine anchors on the EARLIEST <!-- in the file,
// then lazily expands across everything between it and the marker. On ten
// pages an unrelated comment sat higher in <head>, so the match opened there
// and swallowed the <link rel="stylesheet" href="/global.css"> on its way
// down. Ten pages shipped unstyled before CHECK 3 caught it.
//
// "Not followed by -->" on every character makes the match physically unable
// to cross a comment boundary, so it can only ever consume one comment.
const BLOCK = /[ \t]*<!--(?:(?!-->)[^])*?CANONICAL NAV TEMPLATE(?:(?!-->)[^])*?-->[ \t]*\r?\n?/;

let pages = 0, bytes = 0, skipped = [];

for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) {
  if (f === '_nav-template.html') continue;          // the canonical source: keep
  const before = fs.readFileSync(f, 'utf8');
  const m = before.match(BLOCK);
  if (!m) continue;

  // Refuse to touch a page where live markup somehow sits inside the comment.
  if (/<nav\b|<script\b[^>]*src="\/nav\.js"[^>]*><\/script>\s*$/.test(m[0].replace(/<!--|-->/g, '')) && /<nav\b/.test(m[0])) {
    skipped.push(f);
    continue;
  }

  fs.writeFileSync(f, before.replace(BLOCK, ''));
  pages++; bytes += m[0].length;
}

console.log(`stripped stale nav-template comment from ${pages} page(s) — ${(bytes / 1024).toFixed(1)} KB no longer shipped`);
if (skipped.length) console.log(`skipped (live markup inside comment): ${skipped.join(', ')}`);
