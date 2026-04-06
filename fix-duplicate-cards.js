#!/usr/bin/env node
/**
 * fix-duplicate-cards.js — Removes duplicate .hub-card entries from hub pages.
 * A "duplicate" = two <a> tags with class="hub-card" pointing to the same href.
 * Keeps the FIRST occurrence, removes subsequent ones.
 */

const fs = require('fs');

const HUBS = [
  'questions.html', 'demolition-hub.html', 'psychology-hub.html', 'philosophy-hub.html',
  'stories.html', 'devotionals.html', 'analogies-illustrations.html', 'secular-evidence.html',
  'systematic-theology.html', 'theologians.html', 'history-timeline.html', 'essays.html',
  'comparisons-hub.html', 'pastoral-hub.html', 'ot-hub.html',
  'invisible-wall-hub.html', 'open-wound-hub.html', 'shattered-lens-hub.html',
  'broken-mirror-hub.html', 'anxious-mind-hub.html'
];

let totalRemoved = 0;

for (const hub of HUBS) {
  if (!fs.existsSync(hub)) continue;
  let content = fs.readFileSync(hub, 'utf8');

  // Find all hub-card blocks: <a href="..." class="hub-card...">...</a>
  // Use a regex that matches the full card block
  const cardRegex = /<a\s+href="([^"]+)"\s+class="hub-card[^"]*"[\s\S]*?<\/a>/g;
  const seen = new Set();
  const duplicates = [];
  let match;

  while ((match = cardRegex.exec(content)) !== null) {
    const href = match[1];
    const normalized = href.replace(/^\//, '').replace(/\.html$/, '');
    if (seen.has(normalized)) {
      duplicates.push({ href, fullMatch: match[0], index: match.index });
    } else {
      seen.add(normalized);
    }
  }

  if (duplicates.length > 0) {
    console.log(`\n${hub}: removing ${duplicates.length} duplicate cards`);
    // Remove from end to start to preserve indices
    for (const dupe of duplicates.reverse()) {
      console.log(`  🗑 Removing duplicate: ${dupe.href}`);
      content = content.slice(0, dupe.index) + content.slice(dupe.index + dupe.fullMatch.length);
    }
    // Clean up any resulting blank lines (more than 2 in a row)
    content = content.replace(/\n{3,}/g, '\n\n');
    fs.writeFileSync(hub, content, 'utf8');
    totalRemoved += duplicates.length;
  }
}

console.log(`\n═══════════════════════════════════════`);
console.log(`Total duplicate cards removed: ${totalRemoved}`);
console.log(`═══════════════════════════════════════`);
