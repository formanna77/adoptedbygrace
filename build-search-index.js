#!/usr/bin/env node
/**
 * build-search-index.js
 *
 * Crawls every HTML page in the site, extracts full text content,
 * and generates /search-index.js — a complete full-text search index.
 *
 * Run:  node build-search-index.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const OUTPUT = path.join(SITE_DIR, 'search-index.js');

// Files/dirs to skip
const SKIP = new Set([
  '_nav-template.html',
  'search.html',       // search page itself
  '404.html',
  'google0af1fbedb3c930a8.html', // verification files
]);

const SKIP_PREFIXES = ['_', '.'];

function stripHtml(html) {
  // Remove script and style blocks entirely
  let text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  // Remove nav, footer, and mega-menu blocks (boilerplate, not content)
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  text = text.replace(/<div class="mega-menu"[\s\S]*?<!-- Search overlay -->/gi, ' ');
  text = text.replace(/<div class="search-overlay"[\s\S]*?<\/div>\s*<\/div>/gi, ' ');
  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode common HTML entities
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&#x[0-9A-Fa-f]+;/g, ' ');
  text = text.replace(/&#\d+;/g, ' ');
  text = text.replace(/&[a-z]+;/gi, ' ');
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function extractTitle(html) {
  // Try <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    let t = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    // Remove site suffix
    t = t.replace(/\s*[|\u2014\u2013–-]\s*Adopted by Grace.*$/i, '').trim();
    if (t) return t;
  }
  // Try <h1>
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].replace(/<[^>]+>/g, '').trim();
  }
  return '';
}

function extractDescription(html) {
  const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (metaMatch) return metaMatch[1].trim();
  // Try og:description
  const ogMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  if (ogMatch) return ogMatch[1].trim();
  return '';
}

function extractCategory(html, filename) {
  // Try to detect from path patterns or page content
  const catMap = [
    [/^(question-|q-|apologetic-|debate-)/, 'The Evidence'],
    [/^demo(lition)?-/, 'Demolition Zone'],
    [/^devotional-|^dev-/, 'Devotionals'],
    [/^story-/, 'Stories'],
    [/^secular-/, 'Secular Evidence'],
    [/^history-|^hist-|^theologian-/, 'History'],
    [/^analogy-|^illustration-/, 'Analogies'],
    [/^theology-|^systematic-|^st-/, 'Theology'],
    [/^start-here|^phase-/, 'Start Here'],
    [/^psychology-|^psych-/, 'Why We Resist'],
    [/^ot-/, 'Old Testament'],
    [/^compare-|^comparison-/, 'Comparisons'],
    [/^pastoral-/, 'Pastoral'],
    [/^creed|^confession|^canons-|^westminster-|^heidelberg-/, 'Creeds & Confessions'],
    [/^best-reads/, 'Best Reads'],
  ];
  for (const [re, cat] of catMap) {
    if (re.test(filename)) return cat;
  }
  // Check body classes or data attributes
  const bodyClassMatch = html.match(/<body[^>]*class=["']([^"']*)["']/i);
  if (bodyClassMatch) {
    const cls = bodyClassMatch[1].toLowerCase();
    if (cls.includes('devotional')) return 'Devotionals';
    if (cls.includes('evidence') || cls.includes('question')) return 'The Evidence';
    if (cls.includes('demolition')) return 'Demolition Zone';
    if (cls.includes('theology')) return 'Theology';
  }
  return 'General';
}

// Main
const htmlFiles = fs.readdirSync(SITE_DIR).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (SKIP.has(f)) return false;
  if (SKIP_PREFIXES.some(p => f.startsWith(p))) return false;
  return true;
});

console.log(`Found ${htmlFiles.length} HTML files to index...`);

const pages = [];

for (const file of htmlFiles) {
  const filePath = path.join(SITE_DIR, file);
  let html;
  try {
    html = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.log(`  Skipping ${file} (unreadable: ${e.code || e.message})`);
    continue;
  }

  const title = extractTitle(html);
  const description = extractDescription(html);
  const fullText = stripHtml(html);
  const category = extractCategory(html, file);
  const url = '/' + file.replace(/\.html$/, '');

  // Skip nearly empty pages
  if (fullText.length < 50 && !title) {
    console.log(`  Skipping ${file} (too little content)`);
    continue;
  }

  // Crown jewel: psychology-cost-of-rejecting-grace.html gets priority 1
  const isCrownJewel = file === 'psychology-cost-of-rejecting-grace.html';

  pages.push({
    url,
    title: title || file.replace(/\.html$/, '').replace(/-/g, ' '),
    desc: description,
    cat: category,
    text: fullText,
    priority: isCrownJewel ? 1 : 0
  });
}

// Sort alphabetically by title
pages.sort((a, b) => a.title.localeCompare(b.title));

console.log(`Indexed ${pages.length} pages.`);

// Write the index as a JS file that sets window.SEARCH_INDEX
const jsContent = `/* Auto-generated full-text search index — ${new Date().toISOString().slice(0,10)} */
/* ${pages.length} pages indexed */
window.SEARCH_INDEX = ${JSON.stringify(pages)};
`;

fs.writeFileSync(OUTPUT, jsContent, 'utf-8');
console.log(`Wrote ${OUTPUT} (${(fs.statSync(OUTPUT).size / 1024).toFixed(0)} KB)`);
