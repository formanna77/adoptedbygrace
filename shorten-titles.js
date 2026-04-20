#!/usr/bin/env node
/**
 * shorten-titles.js
 *
 * Shortens <title> tags over 60 chars without losing meaning:
 *   Step 1  Drop " | Adopted by Grace" brand suffix (saves 20 chars).
 *   Step 2  If still long AND has an em-dash / hyphen subtitle, keep the
 *           portion before the first " — " / " – " / " - ", but only if
 *           that portion is ≥ 25 chars (avoids tiny fragments).
 *   Step 3  If still long AND has " : ", keep the portion before the colon
 *           under the same 25-char floor.
 *
 * Only touches the tag between <title>...</title>. Writes a report.
 * Preserves the OG/Twitter titles (they stay long for social share).
 * Idempotent.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LIMIT = 60;
// Only aggressively shorten titles above 70 — Google's pixel-based SERP
// truncation lets 60-70 through comfortably. 70+ is where it really bites.
const AGGRESSIVE_LIMIT = 70;
const MIN_STEM = 20;
const AGGRESSIVE_MIN_STEM = 14;
const BRAND_SUFFIXES = [
  ' | Adopted by Grace',
  ' | Adopted By Grace',
  ' - Adopted by Grace',
  ' — Adopted by Grace'
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (entry.name === 'node_modules' || entry.name === 'archive' || entry.name === 'Reformed Sources') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function shorten(title) {
  let t = title.trim();
  if (t.length <= LIMIT) return t;

  // Step 1 — drop brand suffix
  for (const suf of BRAND_SUFFIXES) {
    if (t.endsWith(suf)) {
      t = t.slice(0, -suf.length).trim();
      break;
    }
  }
  if (t.length <= LIMIT) return t;

  // Floor for stem length depends on how long the title still is
  const floor = t.length > AGGRESSIVE_LIMIT ? AGGRESSIVE_MIN_STEM : MIN_STEM;

  // Step 2 — trim after em-dash / en-dash / hyphen
  for (const sep of [' — ', ' – ', ' - ']) {
    const i = t.indexOf(sep);
    if (i >= floor) {
      const stem = t.slice(0, i).trim();
      if (stem.length <= LIMIT && stem.length >= floor) {
        t = stem;
        break;
      }
    }
  }
  if (t.length <= LIMIT) return t;

  // Step 3 — trim after colon
  const ci = t.indexOf(': ');
  if (ci >= floor) {
    const stem = t.slice(0, ci).trim();
    if (stem.length <= LIMIT && stem.length >= floor) return stem;
  }

  // Step 4 — trim after question mark / exclamation (hook-style titles)
  for (const punct of ['? ', '! ']) {
    const qi = t.indexOf(punct);
    if (qi >= floor - 1) {
      const stem = t.slice(0, qi + 1).trim(); // keep the punct
      if (stem.length <= LIMIT && stem.length >= floor) return stem;
    }
  }

  // Step 5 — trim after " | " pipe separator (e.g., "Main Title | Subtitle")
  const pi = t.indexOf(' | ');
  if (pi >= floor) {
    const stem = t.slice(0, pi).trim();
    if (stem.length <= LIMIT && stem.length >= floor) return stem;
  }

  return t; // leave as-is if no good shortening available
}

let touched = 0;
let stillLong = 0;
const changes = [];

for (const file of walk(ROOT)) {
  if (path.basename(file) === '_nav-template.html') continue;
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (!m) continue;
  const original = m[1];
  if (original.trim().length <= LIMIT) continue;
  const next = shorten(original);
  if (next === original.trim()) {
    stillLong++;
    continue;
  }
  const newHtml = html.replace(/<title>[^<]*<\/title>/i, `<title>${next}</title>`);
  if (newHtml !== html) {
    fs.writeFileSync(file, newHtml, 'utf8');
    touched++;
    changes.push({ file: path.relative(ROOT, file), from: original.trim(), to: next });
  }
}

console.log(`shorten-titles: ${touched} titles shortened, ${stillLong} still long (no safe shortening).`);
if (changes.length) {
  console.log('\nSample:');
  changes.slice(0, 12).forEach(c => {
    console.log(`  ${c.file}`);
    console.log(`    was (${c.from.length}): ${c.from}`);
    console.log(`    now (${c.to.length}): ${c.to}`);
  });
}
