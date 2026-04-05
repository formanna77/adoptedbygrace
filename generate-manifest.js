#!/usr/bin/env node
/**
 * Generate Content Manifest
 * 
 * Generates content-manifest.js from search-index.js and git history.
 * Filters out hub pages, utility pages, and non-article content.
 * Creates a sortable, browsable catalog of all 270+ articles.
 * 
 * Usage:
 *   node generate-manifest.js
 * 
 * Must be run AFTER build-search-index.js has been run.
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Pages to exclude from the manifest
const EXCLUDE_PATTERNS = [
  'index.html',
  'about.html',
  'best-reads.html',
  'start-here.html',
  'contact.html',
  'privacy.html',
  '404.html',
  'search.html',
  'quiz.html',
  'freedom.html',
  'all-content.html',
  'topics.html',
  'scripture-tsunami.html',
  'belief-assessment.html',
  'connections.html',
  'debate-free-will.html',
  '_nav-template.html',
];

function shouldExclude(url) {
  const filename = url.replace(/^\//, '') + '.html';
  
  // Direct pattern match
  if (EXCLUDE_PATTERNS.includes(filename)) return true;
  
  // Suffix patterns
  if (filename.endsWith('-hub.html')) return true;
  if (filename.startsWith('start-here-')) return true;
  if (filename === 'analogies-illustrations.html') return true;
  if (filename === 'creeds-confessions.html') return true;
  if (filename === 'comparisons-hub.html') return true;
  
  return false;
}

// Load search index
console.log('Loading search index...');
const indexContent = fs.readFileSync('search-index.js', 'utf8');
const match = indexContent.match(/window\.SEARCH_INDEX = \[(.*?)\];/s);

if (!match) {
  console.error('ERROR: Could not find SEARCH_INDEX in search-index.js');
  console.error('Ensure build-search-index.js has been run first.');
  process.exit(1);
}

let data;
try {
  data = JSON.parse('[' + match[1] + ']');
} catch (e) {
  console.error('ERROR: Could not parse SEARCH_INDEX:', e.message);
  process.exit(1);
}

console.log(`Found ${data.length} indexed pages`);

// Filter to articles only
const articles = data.filter(item => !shouldExclude(item.url));
console.log(`Filtered to ${articles.length} article pages`);

// Get git dates and build manifest
console.log('Fetching git creation dates...');
const manifest = articles.map((item, idx) => {
  const filename = item.url.replace(/^\//, '') + '.html';
  let added = '2026-03-01'; // fallback
  
  try {
    const logOutput = execSync(`git log --diff-filter=A --format=%ai -- "${filename}" 2>/dev/null | head -1`, {
      encoding: 'utf8'
    }).trim();
    if (logOutput) {
      added = logOutput;
    }
  } catch (e) {
    // Use fallback
  }
  
  // Extract excerpt from description
  let excerpt = (item.desc || '').trim();
  const sentenceMatch = excerpt.match(/^[^.!?]*[.!?]/);
  if (sentenceMatch) {
    excerpt = sentenceMatch[0];
  }
  if (excerpt.length > 150) {
    excerpt = excerpt.substring(0, 150).trim();
    if (!excerpt.endsWith('.') && !excerpt.endsWith('!') && !excerpt.endsWith('?')) {
      excerpt += '...';
    }
  }
  
  // Show progress every 50 articles
  if ((idx + 1) % 50 === 0) {
    console.log(`  Processed ${idx + 1}/${articles.length}...`);
  }
  
  return {
    url: item.url,
    title: item.title,
    category: item.cat,
    excerpt: excerpt,
    added: added
  };
});

// Sort by date descending (newest first)
console.log('Sorting by date (newest first)...');
manifest.sort((a, b) => new Date(b.added) - new Date(a.added));

// Write to file
console.log('Writing manifest...');
const output = `const CONTENT_MANIFEST = ${JSON.stringify(manifest, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTENT_MANIFEST;
}
`;

fs.writeFileSync('content-manifest.js', output);

// Summary
console.log('\n=== MANIFEST GENERATED ===');
console.log(`Total articles: ${manifest.length}`);
console.log(`Categories: ${new Set(manifest.map(m => m.category)).size}`);
console.log(`Newest: ${manifest[0].title}`);
console.log(`  Added: ${manifest[0].added.substring(0, 10)}`);
console.log(`Oldest: ${manifest[manifest.length - 1].title}`);
console.log(`  Added: ${manifest[manifest.length - 1].added.substring(0, 10)}`);
console.log('\nFile: content-manifest.js');
console.log(`Size: ${(output.length / 1024).toFixed(1)} KB`);
console.log('\n✓ Ready to deploy');
