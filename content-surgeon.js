#!/usr/bin/env node
/**
 * Content Surgeon — Word Count Audit & Rewrite Queue Generator
 * 
 * Scans all article pages, measures word counts, and generates
 * REWRITE-QUEUE.md — a prioritized list for the Master Rewriter.
 * 
 * Usage: node content-surgeon.js
 */

const fs = require('fs');
const path = require('path');

// Pages that are NOT articles (skip these)
const SKIP = new Set([
  'index.html', 'topics.html', 'for-skeptics.html', 'belief-assessment.html',
  'verse-explorer.html', 'question-faith-origin-test.html', '404.html',
  'sitemap.html', 'about.html', 'contact.html', 'donate.html', 'privacy.html',
  'terms.html', 'start-here.html', 'best-reads.html', 'for-deconstructed.html',
  'connections.html'
]);

// Hub pages (skip these too)
const HUB_PATTERNS = [
  /-hub\.html$/, /^questions\.html$/, /^devotionals\.html$/, /^stories\.html$/,
  /^theologians\.html$/, /^history-timeline\.html$/, /^creeds-confessions\.html$/,
  /^systematic-theology\.html$/, /^essays\.html$/, /^secular-evidence\.html$/,
  /^analogies-illustrations\.html$/, /^ot-hub\.html$/
];

function isHub(file) {
  return HUB_PATTERNS.some(p => p.test(file));
}

function getCategory(file) {
  if (file.startsWith('question-') || file.startsWith('objection-')) return 'Questions';
  if (file.startsWith('demolition-')) return 'Demolition';
  if (file.startsWith('devotional-') || file.startsWith('rest-') || file.startsWith('truth-')) return 'Devotionals';
  if (file.startsWith('story-') || file.startsWith('analogy-')) return 'Stories';
  if (file.startsWith('systematic-')) return 'Systematic Theology';
  if (file.startsWith('theologian-')) return 'Theologians';
  if (file.startsWith('history-') || file.startsWith('creed-')) return 'History';
  if (file.startsWith('psychology-') || file.startsWith('resistance-')) return 'Psychology';
  if (file.startsWith('philosophy-')) return 'Philosophy';
  if (file.startsWith('secular-')) return 'Secular Evidence';
  if (file.startsWith('compare-')) return 'Comparisons';
  if (file.startsWith('pastoral-')) return 'Pastoral';
  if (file.startsWith('ot-')) return 'Old Testament';
  if (file.startsWith('open-wound-') || file.startsWith('broken-mirror-') || file.startsWith('shattered-lens-') || file.startsWith('invisible-wall-') || file.startsWith('anxious-mind-')) return 'Healing';
  if (file.startsWith('spotlight-') || file.startsWith('quick-')) return 'Short-Form';
  return 'Other';
}

function extractWordCount(html) {
  const articleMatch = html.match(/<article[^>]*class="article-body"[^>]*>([\s\S]*?)<\/article>/i)
    || html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    || html.match(/<div[^>]*class="(?:article-body|content-wrap|article-content|content-wrapper)"[^>]*>([\s\S]*?)<\/div>/i);

  if (!articleMatch) return 0;

  const text = articleMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (!match) return '(no title)';
  return match[1].replace(/\s*[|–—]\s*Adopted by Grace\s*$/i, '').trim();
}

// Main
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !SKIP.has(f) && !isHub(f));

const results = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const wordCount = extractWordCount(html);
  if (wordCount < 30) continue; // skip near-empty stubs
  const title = extractTitle(html);
  const category = getCategory(file);
  const readMin = Math.ceil(wordCount / 200);
  results.push({ file, title, category, wordCount, readMin });
}

results.sort((a, b) => b.wordCount - a.wordCount);

const TARGET = 1500;
const over = results.filter(r => r.wordCount > TARGET);
const under = results.filter(r => r.wordCount <= TARGET);

// Priority tiers
const critical = results.filter(r => r.wordCount > 4000);   // 20+ min reads
const high = results.filter(r => r.wordCount > 2500 && r.wordCount <= 4000);
const medium = results.filter(r => r.wordCount > TARGET && r.wordCount <= 2500);

// Generate REWRITE-QUEUE.md
let md = `# REWRITE QUEUE — Content Surgery Tracker
Generated: ${new Date().toISOString().split('T')[0]}
Target: ~1,500 words max per article (~10 min read)

## Summary
| Metric | Count |
|--------|-------|
| Total articles scanned | ${results.length} |
| Already at target (<=1500) | ${under.length} (${Math.round(under.length/results.length*100)}%) |
| Need rewriting (>1500) | ${over.length} (${Math.round(over.length/results.length*100)}%) |
| CRITICAL (>4000 words) | ${critical.length} |
| HIGH (2500-4000 words) | ${high.length} |
| MEDIUM (1500-2500 words) | ${medium.length} |

## How To Use This Queue
1. Start from the TOP (longest articles = most overdue for surgery)
2. Use the **master-rewriter** skill: read it at \`/.claude/skills/master-rewriter/SKILL.md\`
3. After rewriting, change the status from \`OPEN\` to \`DONE\` and log the new word count
4. Run all 5 build scripts after modifying any HTML

## Priority Key
- **CRITICAL** = 20+ minute read. Readers are guaranteed to bounce.
- **HIGH** = 13-20 minute read. Most readers won't finish.
- **MEDIUM** = 8-13 minute read. Could be tightened but less urgent.
- **SPLIT?** = Article may contain multiple separable arguments worth splitting into individual pages.

---

## CRITICAL PRIORITY (>${4000} words) — ${critical.length} articles

| # | Status | File | Title | Category | Words | Read Time | Notes |
|---|--------|------|-------|----------|-------|-----------|-------|
`;

critical.forEach((r, i) => {
  const splitFlag = r.wordCount > 5000 ? 'SPLIT?' : '';
  md += `| ${i+1} | OPEN | \`${r.file}\` | ${r.title} | ${r.category} | ${r.wordCount} | ~${r.readMin} min | ${splitFlag} |\n`;
});

md += `
## HIGH PRIORITY (2500-4000 words) — ${high.length} articles

| # | Status | File | Title | Category | Words | Read Time | Notes |
|---|--------|------|-------|----------|-------|-----------|-------|
`;

high.forEach((r, i) => {
  md += `| ${i+1} | OPEN | \`${r.file}\` | ${r.title} | ${r.category} | ${r.wordCount} | ~${r.readMin} min | |\n`;
});

md += `
## MEDIUM PRIORITY (1500-2500 words) — ${medium.length} articles

| # | Status | File | Title | Category | Words | Read Time | Notes |
|---|--------|------|-------|----------|-------|-----------|-------|
`;

medium.forEach((r, i) => {
  md += `| ${i+1} | OPEN | \`${r.file}\` | ${r.title} | ${r.category} | ${r.wordCount} | ~${r.readMin} min | |\n`;
});

md += `
## ALREADY AT TARGET (<=1500 words) — ${under.length} articles
These do NOT need rewriting. Listed for reference only.

| File | Title | Category | Words |
|------|-------|----------|-------|
`;

under.forEach(r => {
  md += `| \`${r.file}\` | ${r.title} | ${r.category} | ${r.wordCount} |\n`;
});

md += `
---
## CLOSED LOG
*Completed rewrites go here. Never delete entries.*

| Date | File | Before | After | Reduction | Agent |
|------|------|--------|-------|-----------|-------|
`;

fs.writeFileSync('REWRITE-QUEUE.md', md);
console.log(`REWRITE-QUEUE.md generated.`);
console.log(`  ${critical.length} CRITICAL | ${high.length} HIGH | ${medium.length} MEDIUM | ${under.length} at target`);
console.log(`  Total needing surgery: ${over.length} of ${results.length} articles`);
