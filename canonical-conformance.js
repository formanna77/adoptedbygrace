#!/usr/bin/env node
/**
 * canonical-conformance.js
 *
 * PROJECT LIGHTHOUSE — Pillar 3 / Phase 5 Workstream 1 (SEO Foundation)
 *
 * Scans every HTML file at repo root and verifies:
 *   1. <link rel="canonical"> exists.
 *   2. The href is the production HTTPS origin (https://adoptedbygrace.net/...).
 *   3. The path is EXTENSIONLESS — no .html suffix (per VOICE.md §IX).
 *   4. The canonical path matches the filename (modulo .html stripping).
 *      Mismatches indicate a copy-paste bug from another page.
 *
 * Outputs a report to stdout. Exits 0 if everything passes, 1 if any
 * page fails.
 *
 * Run with:  node canonical-conformance.js
 *
 * Authored 2026-04-27 (Session 30 — Phase 5 Workstream 1).
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ORIGIN = 'https://adoptedbygrace.net';

// Files we exempt from the canonical-tag requirement.
// (Index page, nav templates, redirect pages, etc.)
const EXEMPT = new Set([
  '_nav-template.html',
  'nav-template.html',
]);

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();

const missing = [];      // No <link rel="canonical">
const wrongOrigin = [];  // Canonical points to a non-production host
const hasExtension = []; // Canonical includes ".html"
const mismatch = [];     // Canonical path != filename (probable copy-paste bug)
let ok = 0;

const canonicalRE = /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i;

for (const file of files) {
  if (EXEMPT.has(file)) continue;
  const filepath = path.join(ROOT, file);
  const html = fs.readFileSync(filepath, 'utf8');
  const m = html.match(canonicalRE);

  if (!m) {
    missing.push(file);
    continue;
  }
  const url = m[1];
  if (!url.startsWith(ORIGIN)) {
    wrongOrigin.push({ file, url });
    continue;
  }
  let pathPart = url.slice(ORIGIN.length); // e.g. "/about" or "/about.html"
  if (pathPart.startsWith('/')) pathPart = pathPart.slice(1);
  if (pathPart.endsWith('.html')) {
    hasExtension.push({ file, url });
  }
  // Compare path to filename (strip .html from both sides for comparison)
  const expectedSlug = file === 'index.html' ? '' : file.replace(/\.html$/, '');
  const actualSlug = pathPart.replace(/\.html$/, '').replace(/\/$/, '');
  if (expectedSlug !== actualSlug) {
    mismatch.push({ file, expected: expectedSlug, actual: actualSlug });
  } else {
    ok++;
  }
}

const total = files.length - EXEMPT.size;
const failures = missing.length + wrongOrigin.length + hasExtension.length + mismatch.length;

console.log('CANONICAL CONFORMANCE REPORT');
console.log('============================');
console.log(`Total HTML files scanned:   ${files.length}`);
console.log(`Exempt (templates/etc.):    ${EXEMPT.size}`);
console.log(`Pages checked:              ${total}`);
console.log(`Pages OK:                   ${ok}`);
console.log(`Pages with issues:          ${failures}`);
console.log('');

if (missing.length) {
  console.log(`MISSING <link rel="canonical">  (${missing.length})`);
  missing.slice(0, 20).forEach(f => console.log('  ' + f));
  if (missing.length > 20) console.log(`  ... and ${missing.length - 20} more`);
  console.log('');
}
if (wrongOrigin.length) {
  console.log(`WRONG ORIGIN  (${wrongOrigin.length})`);
  wrongOrigin.slice(0, 20).forEach(o => console.log(`  ${o.file}  →  ${o.url}`));
  console.log('');
}
if (hasExtension.length) {
  console.log(`HAS .html SUFFIX (VOICE.md §IX violation)  (${hasExtension.length})`);
  hasExtension.slice(0, 20).forEach(o => console.log(`  ${o.file}  →  ${o.url}`));
  console.log('');
}
if (mismatch.length) {
  console.log(`PATH/FILENAME MISMATCH  (${mismatch.length})`);
  mismatch.slice(0, 20).forEach(o => console.log(`  ${o.file}  expected:${o.expected || '(root)'}  actual:${o.actual || '(root)'}`));
  console.log('');
}

if (failures === 0) {
  console.log('✅ All canonical URLs are conformant.');
  process.exit(0);
} else {
  console.log(`❌ ${failures} canonical-conformance issue(s) found.`);
  process.exit(1);
}
