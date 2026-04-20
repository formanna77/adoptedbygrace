#!/usr/bin/env node
/**
 * dedupe-assets.js
 *
 * Scans every HTML file and removes duplicate <link rel="stylesheet"> and
 * <script src=""> tags that load the exact same URL. Keeps the FIRST
 * occurrence, drops subsequent identical tags. Self-contained, idempotent.
 *
 * Why: auditing showed ~44 pages loading /global.css, /nav.js, or Google
 * Fonts multiple times — wasted bytes and double render-blocking.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (entry.name === 'node_modules') continue;
    if (entry.name === 'archive' || entry.name === 'Reformed Sources') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Pull the href/src URL from a tag string
function urlOf(tag) {
  const href = tag.match(/href\s*=\s*["']([^"']+)["']/i);
  if (href) return 'css:' + href[1];
  const src = tag.match(/src\s*=\s*["']([^"']+)["']/i);
  if (src) return 'js:' + src[1];
  return null;
}

// Find all self-closing/open <link rel=stylesheet> and <script src=""> tags
const LINK_RE = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi;
const SCRIPT_RE = /<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>\s*<\/script>/gi;

let filesTouched = 0;
let tagsRemoved = 0;
const perFile = [];

for (const file of walk(ROOT)) {
  if (path.basename(file) === '_nav-template.html') continue;
  const original = fs.readFileSync(file, 'utf8');
  let html = original;
  const seen = new Set();
  let removedHere = 0;

  // Pass 1: stylesheet links
  html = html.replace(LINK_RE, (m) => {
    const u = urlOf(m);
    if (!u) return m;
    if (seen.has(u)) { removedHere++; return ''; }
    seen.add(u);
    return m;
  });

  // Pass 2: script tags (only external src)
  html = html.replace(SCRIPT_RE, (m) => {
    const u = urlOf(m);
    if (!u) return m;
    if (seen.has(u)) { removedHere++; return ''; }
    seen.add(u);
    return m;
  });

  if (html !== original) {
    // Collapse any blank lines we may have left behind
    html = html.replace(/\n[ \t]*\n[ \t]*\n+/g, '\n\n');
    fs.writeFileSync(file, html, 'utf8');
    filesTouched++;
    tagsRemoved += removedHere;
    perFile.push({ file: path.relative(ROOT, file), removed: removedHere });
  }
}

console.log(`dedupe-assets: ${filesTouched} files updated, ${tagsRemoved} duplicate tags removed.`);
if (perFile.length) {
  console.log('Top offenders:');
  perFile.sort((a, b) => b.removed - a.removed).slice(0, 25).forEach(r => {
    console.log(`  ${r.removed.toString().padStart(3)}  ${r.file}`);
  });
}
