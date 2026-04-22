#!/usr/bin/env node
/**
 * build-homepage-counts.js
 *
 * Counts articles per category and updates the data-target attributes
 * in the Content Explorer section of index.html.
 *
 * Run:  node build-homepage-counts.js
 *
 * MUST be run after creating or deleting any HTML article pages.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const INDEX_FILE = path.join(SITE_DIR, 'index.html');

// Hub pages, utility pages, and non-article pages to exclude from counts
const SKIP = new Set([
  'index.html', '_nav-template.html', 'search.html', '404.html',
  'about.html', 'contact.html', 'donate.html', 'privacy.html', 'terms.html',
  'sitemap.html', 'all-content.html', 'topics.html',
  'belief-assessment.html', 'question-faith-origin-test.html', 'verse-explorer.html',
  'explore-map.html', 'connections.html', 'best-reads.html',
  'google0af1fbedb3c930a8.html',
  // Hub pages (not articles themselves)
  'questions.html', 'demolition-hub.html', 'psychology-hub.html',
  'systematic-theology.html', 'devotionals.html', 'stories.html',
  'ot-hub.html', 'history-timeline.html', 'secular-evidence.html',
  'philosophy-hub.html', 'theologians.html', 'analogies-illustrations.html',
  'comparisons-hub.html', 'start-here.html', 'essays.html', 'pastoral-hub.html', 'joy-hub.html',
  'creeds-confessions.html',
  // Healing hub pages
  'anxious-mind-hub.html', 'broken-mirror-hub.html', 'open-wound-hub.html',
  'invisible-wall-hub.html', 'shattered-lens-hub.html',
]);

// Category definitions: each maps a hub href to filename patterns
const CATEGORIES = [
  { href: '/questions', patterns: [/^question-/, /^apologetic-/, /^debate-/, /^for-skeptics/, /^for-arminians/] },
  { href: '/demolition-hub', patterns: [/^demolition-/, /^counter-/, /^romans-3/, /^romans-8/, /^romans-9/] },
  { href: '/psychology-hub', patterns: [/^psychology-/, /^resistance-/] },
  { href: '/systematic-theology', patterns: [/^systematic-/] },
  { href: '/devotionals', patterns: [/^devotional-/, /^hymn-/, /^for-new-believers/, /^for-deconstructed/, /^for-hurting/] },
  { href: '/stories', patterns: [/^story-/, /^analogy-/] },
  { href: '/questions#objections', patterns: [/^objection-/] },
  { href: '/ot-hub', patterns: [/^ot-/, /^psalm-/, /^psalms-/] },
  { href: '/history-timeline', patterns: [/^history-/, /^creed-/, /^canons-/, /^westminster-/, /^heidelberg-/] },
  { href: '/secular-evidence', patterns: [/^secular-/] },
  { href: '/philosophy-hub', patterns: [/^philosophy-/, /^freedom/] },
  { href: '/theologians', patterns: [/^theologian-/] },
  // Analogies merged into /stories — { href: '/analogies-illustrations' } is retired
  { href: '/comparisons-hub', patterns: [/^compare-/, /^comparison-/] },
  { href: '/start-here', patterns: [/^start-here-/, /^phase-/, /^scripture-tsunami/] },
  // Healing sub-hubs
  { href: '/anxious-mind-hub', patterns: [/^anxious-mind-/] },
  { href: '/broken-mirror-hub', patterns: [/^broken-mirror-/] },
  { href: '/open-wound-hub', patterns: [/^open-wound-/] },
  { href: '/invisible-wall-hub', patterns: [/^invisible-wall-/] },
  { href: '/shattered-lens-hub', patterns: [/^shattered-lens-/] },
  { href: '/pastoral-hub', patterns: [/^pastoral-/, /^for-pastors/, /^just-realized/] },
  { href: '/joy-hub', patterns: [/^joy-/] },
  { href: '/printables', patterns: [/^printable-/] },
  // Combined healing count (all 5 sub-hubs merged for homepage tile)
  { href: 'healing-combined', patterns: [/^anxious-mind-/, /^broken-mirror-/, /^open-wound-/, /^invisible-wall-/, /^shattered-lens-/] },
];

// Get all article HTML files
const allFiles = fs.readdirSync(SITE_DIR).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (SKIP.has(f)) return false;
  if (f.startsWith('_') || f.startsWith('.')) return false;
  return true;
});

// Count per category
const counts = {};
const assignedFiles = new Set();

for (const cat of CATEGORIES) {
  let count = 0;
  for (const file of allFiles) {
    if (cat.patterns.some(p => p.test(file))) {
      count++;
      assignedFiles.add(file);
    }
  }
  counts[cat.href] = count;
}

const totalAssigned = assignedFiles.size;

// Read index.html
let html = fs.readFileSync(INDEX_FILE, 'utf8');
let changes = 0;

// Find all <a> tiles (explorer-tile and healing-tile) and update data-target within each
// Strategy: find each <a ...class="explorer-tile"...>...</a> block and update its data-target
const tileRegex = /<a\s[^>]*class="(?:explorer-tile|healing-tile)"[^>]*>[\s\S]*?<\/a>/g;
let match;
while ((match = tileRegex.exec(html)) !== null) {
  const tileHtml = match[0];
  const tileStart = match.index;

  // Check for combined healing tile first
  const combinedMatch = tileHtml.match(/data-combined="healing"/);
  let cat;
  if (combinedMatch) {
    cat = CATEGORIES.find(c => c.href === 'healing-combined');
  } else {
    // Extract href from this tile
    const hrefMatch = tileHtml.match(/href="([^"]+)"/);
    if (!hrefMatch) continue;
    const href = hrefMatch[1];
    cat = CATEGORIES.find(c => c.href === href);
  }
  if (!cat) continue;

  // Extract current data-target
  const targetMatch = tileHtml.match(/data-target="(\d+)"/);
  if (!targetMatch) continue;
  const oldVal = parseInt(targetMatch[1], 10);
  const newVal = counts[cat.href];

  if (oldVal !== newVal) {
    const updatedTile = tileHtml.replace(/data-target="\d+"/, `data-target="${newVal}"`);
    html = html.substring(0, tileStart) + updatedTile + html.substring(tileStart + tileHtml.length);
    // Reset regex index since we modified the string
    tileRegex.lastIndex = tileStart + updatedTile.length;
    changes++;
    console.log(`  ${cat.href}: ${oldVal} → ${newVal}`);
  }
}

// Update total counter: the .total-number element
const totalRegex = /(class="total-number"\s+data-target=")\d+(")/;
const totalMatch2 = html.match(totalRegex);
if (totalMatch2) {
  const oldTotal = parseInt(html.match(/class="total-number"\s+data-target="(\d+)"/)[1], 10);
  if (oldTotal !== totalAssigned) {
    html = html.replace(totalRegex, `$1${totalAssigned}$2`);
    changes++;
    console.log(`  TOTAL: ${oldTotal} → ${totalAssigned}`);
  }
}

// Write back
fs.writeFileSync(INDEX_FILE, html, 'utf8');

if (changes > 0) {
  console.log(`\n✅ Updated ${changes} counter(s) in index.html (${totalAssigned} total articles)`);
} else {
  console.log(`✅ All counters already up to date (${totalAssigned} total articles)`);
}
