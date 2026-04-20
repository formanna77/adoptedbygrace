#!/usr/bin/env node
/*
 * strip-dead-analytics-hints.js
 * Removes unused preconnect + dns-prefetch hints to googletagmanager.com.
 * The site has no gtag / GTM / GA script anywhere — the hints do nothing
 * but add tiny latency and touch a Google endpoint for no reason.
 * Sprint 7 #49. Idempotent.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TARGET = /^\s*<link rel="(?:preconnect|dns-prefetch)" href="https:\/\/www\.googletagmanager\.com">\s*\n?/gm;

let scanned = 0, modified = 0;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
for (const file of files) {
  const full = path.join(ROOT, file);
  const content = fs.readFileSync(full, 'utf8');
  scanned++;
  if (!TARGET.test(content)) continue;
  const stripped = content.replace(TARGET, '');
  if (stripped !== content) {
    fs.writeFileSync(full, stripped, 'utf8');
    modified++;
  }
}

// Also walk /essays/ subdirectory
const essaysDir = path.join(ROOT, 'essays');
if (fs.existsSync(essaysDir)) {
  const essayFiles = fs.readdirSync(essaysDir).filter(f => f.endsWith('.html'));
  for (const file of essayFiles) {
    const full = path.join(essaysDir, file);
    const content = fs.readFileSync(full, 'utf8');
    scanned++;
    if (!TARGET.test(content)) continue;
    const stripped = content.replace(TARGET, '');
    if (stripped !== content) {
      fs.writeFileSync(full, stripped, 'utf8');
      modified++;
    }
  }
}

console.log(`\n📊 Dead analytics hints stripped`);
console.log(`   Files scanned:  ${scanned}`);
console.log(`   Files modified: ${modified}`);
