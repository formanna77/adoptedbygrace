#!/usr/bin/env node
/**
 * build-sitemap.js
 *
 * PROJECT LIGHTHOUSE — Pillar 3: CRAWL GUIDANCE
 *
 * Regenerates sitemap.xml from scratch with:
 *   - every .html page at the repo root (except internal/skip list)
 *   - a fresh <lastmod> (today) so Google re-crawls
 *   - intelligent <priority> weights:
 *       1.0  → index
 *       0.95 → flagship / pillar pages
 *       0.9  → hubs + about + big category indexes
 *       0.85 → question + demolition + philosophy + comparisons
 *       0.8  → systematic + devotionals + psychology
 *       0.75 → secular + history + theologians
 *       0.65 → stories + objections + counters
 *       0.5  → 404, utility
 *   - <changefreq>:
 *       index        → daily
 *       hubs         → daily
 *       flagships    → weekly
 *       articles     → weekly
 *       old-history  → monthly
 *       utility      → yearly
 *
 * Run with:  node build-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE = 'https://adoptedbygrace.net';

const SKIP_FILES = new Set([
  '_nav-template.html',
  'nav-template.html',
]);

// Pages we intentionally de-prioritize
const UTILITY = new Set([
  '404.html',
]);

// The crown jewels — interactive flagship experiences. Maximum priority.
const FLAGSHIPS = new Set([
  'the-60-second-case.html',
  'fork-in-the-road.html',
  'the-golden-chain.html',
  'golden-chain.html',
  'the-scripture-cascade.html',
  'the-mirror.html',
  'the-objection-collapse.html',
  'the-two-arms.html',
  'the-breath-prayer.html',
  'philosophy-mirror-you-refuse.html',
  'philosophy-adam-test.html',
  'psychology-conversion-memory-test.html',
  'verse-explorer.html',
  'all-content.html',
  'about.html',
]);

// Hub pages — all tagged daily-refresh
const HUBS = new Set([
  'questions.html',
  'demolition-hub.html',
  'psychology-hub.html',
  'philosophy-hub.html',
  'stories.html',
  'devotionals.html',
  'secular-evidence.html',
  'systematic-theology.html',
  'theologians.html',
  'history-timeline.html',
  'ot-hub.html',
  'essays.html',
  'comparisons-hub.html',
  'pastoral-hub.html',
  'testimony-hub.html',
  'invisible-wall-hub.html',
  'open-wound-hub.html',
  'shattered-lens-hub.html',
  'broken-mirror-hub.html',
  'anxious-mind-hub.html',
  'analogies-illustrations.html',
  'creeds-confessions.html',
]);

function urlFor(file) {
  if (file === 'index.html') return SITE + '/';
  return SITE + '/' + file.replace(/\.html$/, '');
}

function priorityFor(file) {
  if (file === 'index.html') return '1.0';
  if (UTILITY.has(file)) return '0.5';
  if (FLAGSHIPS.has(file)) return '0.95';
  if (HUBS.has(file)) return '0.9';
  if (file.startsWith('question-') || file.startsWith('objection-')) return '0.85';
  if (file.startsWith('demolition-')) return '0.85';
  if (file.startsWith('philosophy-')) return '0.85';
  if (file.startsWith('compare-') || file.startsWith('counter-')) return '0.85';
  if (file.startsWith('systematic-')) return '0.8';
  if (file.startsWith('devotional-') || file.startsWith('meditation-')) return '0.8';
  if (file.startsWith('psychology-')) return '0.8';
  if (file.startsWith('secular-')) return '0.75';
  if (file.startsWith('history-')) return '0.75';
  if (file.startsWith('theologian-')) return '0.75';
  if (file.startsWith('analogy-') || file.startsWith('story-') || file.startsWith('parable-') || file.startsWith('illustration-')) return '0.75';
  if (file.startsWith('pastoral-')) return '0.8';
  if (file.startsWith('testimony-')) return '0.75';
  if (file.startsWith('ot-') || file.startsWith('essay-')) return '0.75';
  if (file.startsWith('invisible-wall-') || file.startsWith('open-wound-') || file.startsWith('shattered-lens-') || file.startsWith('broken-mirror-') || file.startsWith('anxious-mind-')) return '0.75';
  return '0.7';
}

function changefreqFor(file) {
  if (file === 'index.html') return 'daily';
  if (UTILITY.has(file)) return 'yearly';
  if (HUBS.has(file)) return 'daily';
  if (FLAGSHIPS.has(file)) return 'weekly';
  return 'weekly';
}

function lastmodFor(file) {
  // Use today for every page — we just regenerated schema + social meta on all of them.
  const today = new Date().toISOString().split('T')[0];
  return today;
}

function escape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildEntry(file) {
  const loc = escape(urlFor(file));
  const lastmod = lastmodFor(file);
  const priority = priorityFor(file);
  const changefreq = changefreqFor(file);
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  const files = fs
    .readdirSync('.')
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !SKIP_FILES.has(f));

  // Sort priority DESC so crawlers prefer top entries
  files.sort((a, b) => {
    const pa = parseFloat(priorityFor(a));
    const pb = parseFloat(priorityFor(b));
    if (pa !== pb) return pb - pa;
    return a.localeCompare(b);
  });

  const urls = files.map(buildEntry).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  fs.writeFileSync('sitemap.xml', sitemap);

  // Quick tally by priority
  const tally = {};
  for (const f of files) {
    const p = priorityFor(f);
    tally[p] = (tally[p] || 0) + 1;
  }
  console.log(`✓ Sitemap rebuilt: ${files.length} URLs (lastmod: ${new Date().toISOString().split('T')[0]})`);
  console.log('  Priority distribution:');
  for (const p of Object.keys(tally).sort().reverse()) {
    console.log(`    ${p}  →  ${tally[p]} pages`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { priorityFor, changefreqFor };
