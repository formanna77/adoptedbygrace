#!/usr/bin/env node
/**
 * audit-titles.js
 * Scan every HTML page for <title> tags that exceed 60 characters — the
 * practical SEO limit past which Google truncates. Emit a CSV-ish report.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LIMIT = 60;

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

const report = [];
for (const file of walk(ROOT)) {
  if (path.basename(file) === '_nav-template.html') continue;
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (!m) continue;
  const title = m[1].trim();
  if (title.length > LIMIT) {
    report.push({
      file: path.relative(ROOT, file),
      len: title.length,
      title
    });
  }
}

report.sort((a, b) => b.len - a.len);
console.log(`Over-long titles (> ${LIMIT} chars): ${report.length}`);
for (const r of report) {
  console.log(`${r.len}\t${r.file}\t${r.title}`);
}
