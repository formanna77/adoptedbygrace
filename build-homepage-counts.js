#!/usr/bin/env node
/**
 * build-homepage-counts.js  (v2)
 *
 * Bakes REAL counts into index.html's "What's Inside" explorer — as BOTH the
 * data-target (used by the JS count-up animation) AND the visible text content.
 * Because the visible text is the real number, the true counts show even with
 * zero JavaScript: no more "0 Articles" for crawlers, no-JS, or pre-scroll users.
 *
 * Counts derive from tags.json — the single canonical article index
 * (build-tags.js) — so the homepage total reconciles EXACTLY with /all-content.
 * Special feature tiles (verse flood, source library, connections map, essays)
 * are measured from their own pages, since they aren't article-body pages.
 *
 * Run:  node build-homepage-counts.js   (after build-tags.js)
 * MUST be run after creating or deleting any HTML article pages.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const INDEX_FILE = path.join(SITE_DIR, 'index.html');
const tags = JSON.parse(fs.readFileSync(path.join(SITE_DIR, 'tags.json'), 'utf8'));
const pages = tags.pages || [];
const TOTAL = pages.length; // canonical browseable article count (== /all-content)

// Count canonical articles whose filename starts with any of these prefixes
const byPrefix = (...prefixes) => pages.filter(p => prefixes.some(pre => p.file.startsWith(pre))).length;

// ── Special feature pages (not in tags.json — they lack <article class="article-body">) ──
const hubCardCount = (file) => ((fs.readFileSync(path.join(SITE_DIR, file), 'utf8').match(/class="hub-card"/g) || []).length);
const tsunamiVerses = () => {
  const h = fs.readFileSync(path.join(SITE_DIR, 'scripture-tsunami.html'), 'utf8');
  const m = h.match(/contains (\d+) verses/i) || h.match(/(\d+) Bible Verses/i);
  return m ? parseInt(m[1], 10) : 470;
};
const NAVISH = new Set(['/', '/best-reads', '/start-here', '/questions', '/systematic-theology',
  '/demolition-hub', '/psychology-hub', '/scripture-tsunami', '/devotionals', '/about', '/contact',
  '/donate', '/all-content', '/theologians', '/reformed-sources', '/connections', '/topics']);
const uniqueArticleLinks = (file) => {
  const h = fs.readFileSync(path.join(SITE_DIR, file), 'utf8');
  const set = new Set([...h.matchAll(/href="(\/[a-z0-9-]+)"/g)].map(m => m[1]).filter(u => !NAVISH.has(u)));
  return set.size;
};
const dirHtmlCount = (dir) => { try { return fs.readdirSync(path.join(SITE_DIR, dir)).filter(f => f.endsWith('.html')).length; } catch (e) { return 0; } };

// ── href (as written in index.html) -> real count ──
const COUNT = {
  '/start-here': byPrefix('start-here-', 'phase-'),
  '/questions': byPrefix('question-'),
  '/apologetics': byPrefix('apologetic-'),
  '/reformed-apologetics-hub': byPrefix('reformed-apologetics-'),
  '/presuppositional-apologetics-hub': byPrefix('presuppositional-'),
  '/demolition-hub': byPrefix('demolition-', 'counter-'),
  '/psychology-hub': byPrefix('psychology-', 'resistance-'),
  '/systematic-theology': byPrefix('systematic-'),
  '/devotionals': byPrefix('devotional-', 'hymn-'),
  '/stories': byPrefix('story-', 'analogy-', 'parable-'),
  // S191: this key read '/questions#objections' and matched NO tile — index.html
  // writes href="/questions#demolishing-the-objections". The Hard Objections
  // count was therefore unmanaged and hand-frozen; it happened to be right, and
  // would have drifted silently on the next objection page.
  '/questions#demolishing-the-objections': byPrefix('objection-'),
  '/ot-hub': byPrefix('ot-', 'psalm-'),
  '/history-timeline': byPrefix('history-', 'creed-', 'canons-', 'westminster-', 'heidelberg-'),
  '/secular-evidence': byPrefix('secular-'),
  '/philosophy-hub': byPrefix('philosophy-', 'analytical-'),
  '/theologians': byPrefix('theologian-'),
  '/comparisons-hub': byPrefix('compare-', 'comparison-'),
  // Printables aren't article-body pages, so count them on their own hub:
  '/printables': hubCardCount('printables.html'),
  '/anxious-mind-hub': byPrefix('anxious-mind-'),
  '/broken-mirror-hub': byPrefix('broken-mirror-'),
  '/open-wound-hub': byPrefix('open-wound-'),
  '/invisible-wall-hub': byPrefix('invisible-wall-'),
  '/shattered-lens-hub': byPrefix('shattered-lens-'),
  '/pastoral-hub': byPrefix('pastoral-', 'for-pastors', 'just-realized'),
  '/joy-hub': byPrefix('joy-'),
  '/testimony-hub': byPrefix('testimony-', 'story-testimony'),
  // Special feature tiles:
  '/reformed-sources': hubCardCount('reformed-sources.html'),
  '/scripture-tsunami': tsunamiVerses(),
  '/connections': uniqueArticleLinks('connections.html'),
  '/essays': dirHtmlCount('essays'),
};

let html = fs.readFileSync(INDEX_FILE, 'utf8');
let changes = 0;

// Update each explorer/healing tile: set BOTH data-target and the visible text.
const tileRegex = /<a\s[^>]*class="(?:explorer-tile|healing-tile)"[^>]*>[\s\S]*?<\/a>/g;
html = html.replace(tileRegex, (tile) => {
  const hrefMatch = tile.match(/href="([^"]+)"/);
  if (!hrefMatch) return tile;
  const href = hrefMatch[1];
  if (!(href in COUNT)) { console.log(`  (no rule for tile ${href} — left as-is)`); return tile; }
  const n = COUNT[href];
  const updated = tile.replace(
    /(<span class="tile-count")\s+data-target="\d+"\s*>\s*[\d,]*\s*<\/span>/,
    `$1 data-target="${n}">${n}</span>`
  );
  if (updated !== tile) { changes++; console.log(`  ${href}: ${n}`); }
  return updated;
});

// Update the grand total: data-target AND visible text.
html = html.replace(
  /(<span class="total-number")\s+data-target="\d+"\s*>\s*[\d,]*\s*<\/span>/,
  `$1 data-target="${TOTAL}">${TOTAL}</span>`
);
console.log(`  TOTAL: ${TOTAL}`);

fs.writeFileSync(INDEX_FILE, html, 'utf8');
console.log(`\nUpdated homepage counts to canonical totals (${TOTAL} articles). Tiles changed: ${changes}.`);
