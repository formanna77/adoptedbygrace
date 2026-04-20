#!/usr/bin/env node
/**
 * wire-manifest.js
 *
 * Inserts <link rel="manifest" href="/manifest.webmanifest"> into the <head>
 * of every HTML page that does not already have it. Places it immediately
 * after the first <link rel="stylesheet" href="/global.css"> so the
 * installability hint ships on every route.
 *
 * Idempotent — safe to re-run.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MANIFEST_LINK = '<link rel="manifest" href="/manifest.webmanifest">';
const GLOBAL_CSS_RE = /(<link[^>]*rel=["']stylesheet["'][^>]*href=["']\/global\.css["'][^>]*>)/i;

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

let touched = 0;
let skipped = 0;
let already = 0;

for (const file of walk(ROOT)) {
  // Skip the nav partial — it has no <head>
  if (path.basename(file) === '_nav-template.html') continue;

  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('rel="manifest"') || html.includes("rel='manifest'")) {
    already++;
    continue;
  }
  const m = html.match(GLOBAL_CSS_RE);
  if (!m) {
    skipped++;
    continue;
  }
  const next = html.replace(
    GLOBAL_CSS_RE,
    `$1\n    ${MANIFEST_LINK}`
  );
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    touched++;
  }
}

console.log(`wire-manifest: ${touched} updated, ${already} already wired, ${skipped} skipped (no /global.css link).`);
