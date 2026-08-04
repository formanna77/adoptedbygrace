#!/usr/bin/env node
/**
 * stamp-modified.js — make JSON-LD dateModified true from here forward
 *
 * THE PROBLEM (found S198, 2026-08-04)
 * ------------------------------------
 * 373 pages carry `"dateModified": "2026-04-..."` after a summer of substantive
 * rewrites, and nothing in the corpus has a `datePublished` later than
 * 2026-06-30. PRESENTATION INTEGRITY law 7 is explicit that this counts:
 * "a machine-readable falsehood is still a falsehood."
 *
 * WHY THE HISTORICAL DATES WERE NOT BULK-CORRECTED
 * ------------------------------------------------
 * There is no honest record of when each page actually changed. GIT POLICY
 * forbids reading git history; `archive/coverage.json` stores only session
 * numbers, not dates; and mtime is worthless because the eight-script pipeline
 * rewrites every file on every run.
 *
 * Stamping all 373 with today's date would replace one machine-readable
 * falsehood with a louder one — announcing to every crawler that the entire
 * corpus changed on a single day, which is both untrue and a spam signal. The
 * current wrong direction at least UNDERSTATES freshness; the fabricated one
 * would overstate it, which is the direction that actually deceives a reader.
 *
 * So the historical values are left alone, and the field is made true going
 * forward: run this on the pages a session actually edited, and from now on
 * dateModified is a record instead of a guess.
 *
 * Usage:
 *   node stamp-modified.js page-one.html page-two.html     # stamp these
 *   node stamp-modified.js --check                          # report drift only
 *
 * It never invents a datePublished, and never moves a date backwards.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const targets = args.filter(a => a.endsWith('.html'));
const TODAY = new Date().toISOString().slice(0, 10);

if (CHECK) {
  const buckets = {};
  let missing = 0;
  for (const f of fs.readdirSync(ROOT).filter(x => x.endsWith('.html'))) {
    const t = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const m = t.match(/"dateModified":\s*"(\d{4}-\d{2})/);
    if (!m) { if (/"@type":\s*"(Article|BlogPosting)"/.test(t)) missing++; continue; }
    buckets[m[1]] = (buckets[m[1]] || 0) + 1;
  }
  console.log('\ndateModified across the corpus:');
  Object.entries(buckets).sort().forEach(([k, v]) => console.log(`  ${k}   ${String(v).padStart(4)} page(s)`));
  if (missing) console.log(`  (${missing} article page(s) carry no dateModified at all)`);
  console.log('\nStamp the pages you edited:  node stamp-modified.js <page.html> ...\n');
  process.exit(0);
}

if (!targets.length) {
  console.error('Usage: node stamp-modified.js <page.html> [more.html ...]   |   --check');
  process.exit(2);
}

let stamped = 0, added = 0, skipped = [];
for (const f of targets) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { skipped.push(`${f} (not found)`); continue; }
  const before = fs.readFileSync(p, 'utf8');

  if (!/"@context"\s*:\s*"https?:\/\/schema\.org"/.test(before)) {
    skipped.push(`${f} (no JSON-LD block)`);
    continue;
  }

  let html = before;
  if (/"dateModified":\s*"[^"]*"/.test(html)) {
    const current = (html.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})/) || [])[1];
    if (current && current > TODAY) { skipped.push(`${f} (dated in the future: ${current})`); continue; }
    html = html.replace(/"dateModified":\s*"[^"]*"/, `"dateModified": "${TODAY}"`);
    stamped++;
  } else if (/"datePublished":\s*"[^"]*"/.test(html)) {
    // Add it next to datePublished so the pair reads together.
    html = html.replace(/("datePublished":\s*"[^"]*")/, `$1,\n    "dateModified": "${TODAY}"`);
    added++;
  } else {
    skipped.push(`${f} (no datePublished to anchor to)`);
    continue;
  }

  if (html !== before) fs.writeFileSync(p, html);
}

console.log(`dateModified updated : ${stamped} page(s)`);
if (added) console.log(`dateModified added   : ${added} page(s)`);
if (skipped.length) {
  console.log(`skipped              : ${skipped.length}`);
  skipped.slice(0, 10).forEach(s => console.log(`   ${s}`));
}
