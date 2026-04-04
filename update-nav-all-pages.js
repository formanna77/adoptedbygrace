#!/usr/bin/env node
/**
 * update-nav-all-pages.js
 *
 * Updates ALL HTML pages with the new nav template.
 * Finds the <nav> block (including mega-menu and search overlay)
 * and replaces it with the new structure from _nav-template.html
 *
 * Run: node update-nav-all-pages.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const NAV_TEMPLATE_FILE = path.join(SITE_DIR, '_nav-template.html');

// Files to skip when updating nav
const SKIP = new Set([
  '_nav-template.html', 'search.html', '404.html',
  'index.html', 'index-old.html', 'index-new.html',
]);

// Read the nav template
const templateContent = fs.readFileSync(NAV_TEMPLATE_FILE, 'utf-8');
const templateLines = templateContent.split('\n');

// Extract lines 29-92 (nav template is at these lines, 1-indexed in editor = 0-indexed in array)
// The template includes: nav + mega-menu + search-overlay
const newNavBlock = templateLines.slice(28, 92).join('\n');

if (!newNavBlock || newNavBlock.trim().length === 0) {
  console.error('ERROR: Could not extract nav section from _nav-template.html');
  process.exit(1);
}

console.log(`Extracted ${newNavBlock.split('\n').length} lines from nav template\n`);

// Get all HTML files
const htmlFiles = fs.readdirSync(SITE_DIR).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (SKIP.has(f)) return false;
  if (f.startsWith('_') || f.startsWith('.')) return false;
  return true;
});

console.log(`Found ${htmlFiles.length} HTML pages to update...\n`);

let updatedCount = 0;
let skippedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(SITE_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Find and replace the nav block
  // Match from <nav to the closing </div> of the search-overlay
  // This captures: nav + mega-menu + search-overlay
  const navRegex = /<nav[\s\S]*?<div class="search-results"[\s\S]*?<\/div>\s*\n\s*(?=<)/;

  if (!navRegex.test(content)) {
    console.log(`SKIP: ${file} — no nav block found`);
    skippedCount++;
    continue;
  }

  const oldLength = content.length;
  content = content.replace(navRegex, newNavBlock + '\n    ');
  const newLength = content.length;

  fs.writeFileSync(filePath, content, 'utf-8');
  updatedCount++;
  console.log(`UPDATED: ${file}`);
}

console.log(`\n✓ Updated ${updatedCount} pages`);
console.log(`✗ Skipped ${skippedCount} pages`);
console.log(`\nNav structure updated to new umbrella architecture (7 umbrellas, 10 nav links)`);
