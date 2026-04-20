#!/usr/bin/env node
/*
 * add-bylines.js
 * Adds a visible byline block to every article page that has
 *   <article class="article-body">
 * and does NOT already have a <p class="article-byline">.
 * Pulls datePublished from JSON-LD when present. Idempotent.
 * Sprint 3 #22.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SKIP_FILES = new Set([
  'index.html', '404.html', 'sitemap.html',
  'manifest.webmanifest',
]);

function isHubPage(content) {
  return /class="hub-hero"/.test(content) || /hub-grid/.test(content);
}

function hasByline(content) {
  return /class=["']article-byline["']/.test(content);
}

function extractDate(content) {
  const m = content.match(/"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  return null;
}

function formatDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  return `${months[m-1]} ${d}, ${y}`;
}

function bylineHTML(dateIso) {
  const pretty = formatDate(dateIso);
  const time = dateIso
    ? ` · <time datetime="${dateIso}">${pretty}</time>`
    : '';
  return `        <p class="article-byline">By <a href="/about">Aaron Forman</a>${time}</p>`;
}

function injectByline(content) {
  // Insert immediately before the closing </header> that wraps .page-hero
  // Only the first page-hero header (the article's own).
  const heroRe = /(<header class="page-hero">[\s\S]*?)(<\/header>)/;
  const match = content.match(heroRe);
  if (!match) return null;
  const dateIso = extractDate(content);
  const byline = bylineHTML(dateIso);
  // Don't double-insert (defensive — hasByline check above already handles most)
  if (match[1].includes('class="article-byline"')) return null;
  return content.replace(heroRe, `${match[1]}${byline}\n    ${match[2]}`);
}

let scanned = 0, modified = 0, skipped = 0;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

for (const file of files) {
  if (SKIP_FILES.has(file)) { skipped++; continue; }
  const full = path.join(ROOT, file);
  const content = fs.readFileSync(full, 'utf8');
  scanned++;

  // Article pages only
  if (!/class="article-body"/.test(content)) { continue; }
  // Already has byline
  if (hasByline(content)) { continue; }
  // Skip hub-hero pages (their headers are different)
  if (isHubPage(content)) { continue; }

  const updated = injectByline(content);
  if (updated && updated !== content) {
    fs.writeFileSync(full, updated, 'utf8');
    modified++;
    console.log(`  ✅ ${file}`);
  }
}

console.log('\n══════════════════════════════════════');
console.log(`📊 BYLINE PASS RESULTS`);
console.log(`   Files scanned:  ${scanned}`);
console.log(`   Bylines added:  ${modified}`);
console.log(`   Files skipped:  ${skipped}`);
console.log('══════════════════════════════════════');
