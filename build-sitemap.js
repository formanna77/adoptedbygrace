#!/usr/bin/env node
/**
 * build-sitemap.js
 *
 * PROJECT LIGHTHOUSE — Pillar 3: CRAWL GUIDANCE
 *
 * Regenerates sitemap.xml from scratch with:
 * - every .html page at the repo root (except internal/skip list)
 * - a fresh <lastmod> (today) so Google re-crawls
 * - intelligent <priority>weights:
 * 1.0  → index
 * 0.95 → flagship / pillar pages
 * 0.9  → hubs + about + big category indexes
 * 0.85 → question + demolition + philosophy + comparisons
 * 0.8  → systematic + devotionals + psychology
 * 0.75 → secular + history + theologians
 * 0.65 → stories + objections + counters
 * 0.5  → 404, utility
 * - <changefreq>:
 * index → daily
 * hubs → daily
 * flagships → weekly
 * articles → weekly
 * old-history  → monthly
 * utility → yearly
 *
 * Run with:  node build-sitemap.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SITE = 'https://adoptedbygrace.net';

// Per-file content-hash manifest. Lets unchanged pages keep their REAL
// last-changed date instead of being stamped "today" on every run — an
// always-today lastmod trains Google to ignore the freshness signal.
// IMPORTANT: commit .sitemap-hashes.json so the dates persist across machines
// and Netlify builds; otherwise every build re-stamps everything as today.
const HASH_MANIFEST = '.sitemap-hashes.json';

const SKIP_FILES = new Set([
  '_nav-template.html',
  'nav-template.html',
  'testimony-thank-you.html', // noindex post-submission page — keep out of sitemap
]);

// Pages we intentionally de-prioritize
const UTILITY = new Set([
  '404.html',
  'share-your-story.html',
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

const TODAY = new Date().toISOString().split('T')[0];

function loadManifest() {
  try {
  return JSON.parse(fs.readFileSync(HASH_MANIFEST, 'utf8'));
  } catch (e) {
  return {};
  }
}

function hashFile(file) {
  return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
}

// ------------------------------------------------------------
// ONE SOURCE OF TRUTH FOR "WHEN DID THIS CHANGE" (rewritten S199, 2026-08-09).
//
// Measured against the live sitemap on 2026-08-09: of 685 URLs, the number
// whose <lastmod> agreed with that same page's JSON-LD dateModified was
// ZERO. 457 contradicted outright (about.html: sitemap 2026-07-29, page
// 2026-04-20) and 228 pages carried no JSON-LD date at all. Every page on
// the site was handing crawlers two different answers to the same question.
//
// The cause was the `: TODAY` fallback below. The hash-reuse idea is sound,
// but the eight-script pipeline rewrites every HTML file on every run, so
// the hash always differs, so every page got stamped with the day
// build-sitemap.js last happened to run — which is why 637 URLs shared the
// single date 2026-07-29. That is a bulk stamp wearing a freshness signal's
// clothes, and Google discounts a sitemap it can prove unreliable.
//
// So the order of preference is now: the page's own JSON-LD dateModified,
// then its datePublished (an honest lower bound), then a recorded hash match
// (an observed fact), and then NOTHING. <lastmod> is optional in the sitemap
// protocol; omitting it says "unknown," which is true. Stamping TODAY says
// "changed today," which is not, and CLAUDE.md's PRESENTATION INTEGRITY law
// 11 is explicit that the invented date is the direction that deceives.
// ------------------------------------------------------------
const JSONLD_MODIFIED = /"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/;
const JSONLD_PUBLISHED = /"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})/;

function lastmodFor(file, prevManifest, nextManifest) {
  const hash = hashFile(file);
  const prev = prevManifest[file];
  const html = fs.readFileSync(file, 'utf8');

  const lastmod =
    (html.match(JSONLD_MODIFIED) || [])[1] ||
    (html.match(JSONLD_PUBLISHED) || [])[1] ||
    (prev && prev.hash === hash ? prev.lastmod : null) ||
    null;

  nextManifest[file] = { hash, lastmod };
  return lastmod;
}

function escape(s) {
  return s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');
}

function buildEntry(file, prevManifest, nextManifest) {
  const loc = escape(urlFor(file));
  const lastmod = lastmodFor(file, prevManifest, nextManifest);
  const priority = priorityFor(file);
  const changefreq = changefreqFor(file);
  // <lastmod> is optional in the protocol. Omit it rather than invent it.
  const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
  return `  <url>
    <loc>${loc}</loc>${lastmodTag}
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

  const prevManifest = loadManifest();
  const nextManifest = {};
  const urls = files.map((f) => buildEntry(f, prevManifest, nextManifest)).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  fs.writeFileSync('sitemap.xml', sitemap);
  fs.writeFileSync(HASH_MANIFEST, JSON.stringify(nextManifest, null, 0) + '\n');

  // Quick tally by priority
  const tally = {};
  for (const f of files) {
  const p = priorityFor(f);
  tally[p] = (tally[p] || 0) + 1;
  }
  console.log(` Sitemap rebuilt: ${files.length} URLs (lastmod: ${new Date().toISOString().split('T')[0]})`);
  console.log('  Priority distribution:');
  for (const p of Object.keys(tally).sort().reverse()) {
  console.log(` ${p}  →  ${tally[p]} pages`);
  }
}

if (require.main === module) {
  main();
}

module.exports = { priorityFor, changefreqFor };
