#!/usr/bin/env node
/**
 * strategic-audit.js — Strategic content-tier audit for adoptedbygrace.net
 *
 * Different from validate-site.js (which checks integrity).
 * This script answers: which pages are doing the most mission work?
 * Which are dead weight? Which are redundant? Where are the orphans?
 *
 * Output:
 *   audit-data.json      — machine-readable full dataset
 *   AUDIT-REPORT.md      — human-readable summary for MISSION-CONTROL
 *
 * Tiers:
 *   HAMMER   — inbound ≥ 6 AND words ≥ 700 AND in mission-core category → rewrite to extraordinary
 *   KEEP     — solid middle tier — minor polish, cross-link more
 *   THIN     — word count < 350 → candidate for merge or expansion
 *   ORPHAN   — inbound link count ≤ 1 → wire in or retire
 *   RETIRE   — THIN + ORPHAN → merge into a stronger page or delete
 *
 * Usage: node strategic-audit.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// ─── Configuration ─────────────────────────────────────────────────

const IGNORE_FILES = new Set([
  '_nav-template.html', '404.html', 'search.html'
]);

// Hub pages — tracked separately, not scored as content pages
const HUB_FILES = new Set([
  'questions.html', 'demolition-hub.html', 'psychology-hub.html',
  'philosophy-hub.html', 'stories.html', 'devotionals.html',
  'analogies-illustrations.html', 'secular-evidence.html',
  'systematic-theology.html', 'theologians.html', 'history-timeline.html',
  'ot-hub.html', 'essays.html', 'invisible-wall-hub.html',
  'open-wound-hub.html', 'shattered-lens-hub.html', 'broken-mirror-hub.html',
  'anxious-mind-hub.html', 'pastoral-hub.html', 'comparisons-hub.html',
  'sermons.html', 'for-doubters.html', 'printables.html',
  'testimony-hub.html', 'quotes.html', 'all-content.html',
  'topics.html', 'connections.html', 'explore-map.html', 'best-reads.html',
  'start-here.html', 'start-here-assessment.html', 'testimony-wall.html'
]);

const UTILITY_FILES = new Set([
  'index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html',
  'manifest.webmanifest', 'sitemap.xml', 'robots.txt'
]);

// Categories ranked by mission-core-ness
const MISSION_CORE = new Set([
  'demolition-', 'question-', 'systematic-', 'devotional-',
  'theologian-', 'objection-', 'story-', 'apologetic-',
  'argument-', 'counter-', 'compare-'
]);

const HEALING_SERIES = new Set([
  'anxious-mind-', 'broken-mirror-', 'open-wound-',
  'invisible-wall-', 'shattered-lens-'
]);

// ─── Helpers ───────────────────────────────────────────────────────

function getCategory(file) {
  // Try longer prefixes first (e.g., "anxious-mind-")
  const prefixes = [
    'anxious-mind-', 'broken-mirror-', 'open-wound-',
    'invisible-wall-', 'shattered-lens-', 'start-here-'
  ];
  for (const p of prefixes) if (file.startsWith(p)) return p;
  const m = file.match(/^([a-z]+)-/);
  return m ? m[1] + '-' : 'misc';
}

function stripHtml(html) {
  // Remove script/style blocks entirely
  html = html.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  html = html.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  // Remove HTML comments
  html = html.replace(/<!--[\s\S]*?-->/g, ' ');
  // Strip tags
  html = html.replace(/<[^>]+>/g, ' ');
  // Decode a few basic entities
  html = html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"').replace(/&#\d+;/g, ' ');
  return html.replace(/\s+/g, ' ').trim();
}

function stripBodyChrome(html) {
  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) body = bodyMatch[1];
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  body = body.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  // Remove site-header (distinct from article page-hero)
  body = body.replace(/<header[^>]*class="[^"]*site-header[^"]*"[\s\S]*?<\/header>/gi, ' ');
  return body;
}

function extractArticleBody(html) {
  // Always measure the whole content region (body minus nav/footer/site-header)
  // and keep it as the authoritative text for word-count + link extraction.
  return stripBodyChrome(html);
}

function hasStructuralBug(html) {
  // Two possible canonical shapes:
  //   A) <article class="article-body">...real content...</article>
  //   B) utility/hub pages that don't need article-body
  //
  // A "structural bug" = canonical article-body exists but is empty (hero-only, <500 chars text)
  // while the rest of the body has substantial prose (>1500 chars text).
  const m = html.match(/<article[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
  if (!m) return false;
  const primaryText = stripHtml(m[1]);
  if (primaryText.length >= 500) return false;
  const after = html.slice(html.indexOf(m[0]) + m[0].length);
  const outsideText = stripHtml(after);
  return outsideText.length > 1500;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!m) return '';
  return m[1].trim().split('|')[0].trim();
}

function extractMetaDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  return m ? m[1].trim() : '';
}

function extractInternalLinks(html, validFiles) {
  // Only look at hrefs inside the body text — skip head
  const bodyStart = html.indexOf('<body');
  const body = bodyStart >= 0 ? html.slice(bodyStart) : html;
  const re = /href=["'](?:\/)?([a-z0-9_-]+)(?:\.html)?(?:#[^"']*)?["']/gi;
  const links = new Set();
  let m;
  while ((m = re.exec(body)) !== null) {
    const target = m[1] + '.html';
    if (validFiles.has(target)) links.add(target);
  }
  return links;
}

// ─── Main scan ─────────────────────────────────────────────────────

const allHtml = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html') && !f.startsWith('.') && !f.startsWith('_') && !IGNORE_FILES.has(f));

const allFiles = new Set(allHtml);
console.log(`Scanning ${allHtml.length} HTML files...`);

const pages = {}; // file -> record
const outLinks = {}; // file -> Set of targets

for (const file of allHtml) {
  const filePath = path.join(ROOT, file);
  let html;
  try { html = fs.readFileSync(filePath, 'utf8'); } catch { continue; }

  const body = extractArticleBody(html);
  const text = stripHtml(body);
  const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const links = extractInternalLinks(html, allFiles);

  pages[file] = {
    file,
    category: getCategory(file),
    title: extractTitle(html),
    metaDescription: extractMetaDescription(html),
    wordCount,
    outboundLinks: [...links],
    outboundCount: links.size,
    inboundCount: 0, // filled in later
    isHub: HUB_FILES.has(file),
    isUtility: UTILITY_FILES.has(file),
    hasPageHero: /class="[^"]*page-hero/i.test(html),
    hasEyebrow: /class="[^"]*eyebrow/i.test(html),
    structuralBug: hasStructuralBug(html),
  };
  outLinks[file] = links;
}

// Build inbound graph
const inbound = {};
for (const f of allHtml) inbound[f] = new Set();
for (const [src, targets] of Object.entries(outLinks)) {
  for (const t of targets) {
    if (t !== src) inbound[t] && inbound[t].add(src);
  }
}
for (const f of Object.keys(pages)) {
  pages[f].inboundCount = inbound[f].size;
  pages[f].inboundFrom = [...inbound[f]].slice(0, 12); // sample
}

// ─── Tier assignment ───────────────────────────────────────────────

function assignTier(p) {
  if (p.isHub || p.isUtility) return 'INFRA';
  const isMissionCore = MISSION_CORE.has(p.category) || HEALING_SERIES.has(p.category);

  // RETIRE: thin + orphaned
  if (p.wordCount < 350 && p.inboundCount <= 1) return 'RETIRE';
  // ORPHAN: barely linked
  if (p.inboundCount <= 1) return 'ORPHAN';
  // THIN: short body
  if (p.wordCount < 350) return 'THIN';
  // HAMMER: load-bearing
  if (isMissionCore && p.wordCount >= 700 && p.inboundCount >= 6) return 'HAMMER';
  return 'KEEP';
}

for (const p of Object.values(pages)) p.tier = assignTier(p);

// ─── Redundancy detection (filename-based) ─────────────────────────
// Pages whose core slug (strip prefix, strip trailing -vN) overlaps.
const slugBuckets = {};
for (const p of Object.values(pages)) {
  if (p.isHub || p.isUtility) continue;
  const core = p.file
    .replace(/\.html$/, '')
    .replace(/^(demolition|question|objection|apologetic|argument|counter|devotional|systematic|theologian|psychology|philosophy|history|secular|story|analogy|ot|compare|pastoral|testimony|response|joy)-/, '')
    .replace(/-v\d+$/, '')
    .replace(/-(full|simple|short|long)$/, '');
  // very coarse stem — first 3 tokens
  const stem = core.split('-').slice(0, 3).join('-');
  slugBuckets[stem] = slugBuckets[stem] || [];
  slugBuckets[stem].push(p.file);
}
const redundancyClusters = Object.entries(slugBuckets)
  .filter(([_, files]) => files.length >= 2)
  .sort((a, b) => b[1].length - a[1].length);

// ─── Output JSON ────────────────────────────────────────────────────

const tiers = { HAMMER: [], KEEP: [], THIN: [], ORPHAN: [], RETIRE: [], INFRA: [] };
for (const p of Object.values(pages)) tiers[p.tier].push(p.file);

const structurallyBroken = Object.values(pages)
  .filter(p => p.structuralBug)
  .map(p => ({ file: p.file, words: p.wordCount, inbound: p.inboundCount }));

const summary = {
  generatedAt: new Date().toISOString(),
  totalPages: allHtml.length,
  tierCounts: Object.fromEntries(Object.entries(tiers).map(([k, v]) => [k, v.length])),
  categoryCounts: {},
  topHammers: [],
  topOrphans: [],
  thinnestPages: [],
  deepestBacklinked: [],
  redundancyClusters: redundancyClusters.slice(0, 40),
  structurallyBroken,
};

for (const p of Object.values(pages)) {
  summary.categoryCounts[p.category] = (summary.categoryCounts[p.category] || 0) + 1;
}

summary.topHammers = Object.values(pages)
  .filter(p => p.tier === 'HAMMER')
  .sort((a, b) => (b.inboundCount + b.wordCount / 200) - (a.inboundCount + a.wordCount / 200))
  .slice(0, 60)
  .map(p => ({ file: p.file, inbound: p.inboundCount, words: p.wordCount, category: p.category }));

summary.topOrphans = Object.values(pages)
  .filter(p => p.tier === 'ORPHAN' || p.tier === 'RETIRE')
  .sort((a, b) => a.inboundCount - b.inboundCount || a.wordCount - b.wordCount)
  .slice(0, 80)
  .map(p => ({ file: p.file, inbound: p.inboundCount, words: p.wordCount, tier: p.tier }));

summary.thinnestPages = Object.values(pages)
  .filter(p => !p.isHub && !p.isUtility)
  .sort((a, b) => a.wordCount - b.wordCount)
  .slice(0, 40)
  .map(p => ({ file: p.file, words: p.wordCount, inbound: p.inboundCount, tier: p.tier }));

summary.deepestBacklinked = Object.values(pages)
  .filter(p => !p.isHub && !p.isUtility)
  .sort((a, b) => b.inboundCount - a.inboundCount)
  .slice(0, 30)
  .map(p => ({ file: p.file, inbound: p.inboundCount, words: p.wordCount, category: p.category }));

fs.writeFileSync(
  path.join(ROOT, 'audit-data.json'),
  JSON.stringify({ summary, pages }, null, 2)
);
console.log('✓ wrote audit-data.json');

// ─── Human report ──────────────────────────────────────────────────

const md = [];
md.push('# Strategic Audit Report — adoptedbygrace.net');
md.push('');
md.push(`_Generated: ${summary.generatedAt}_`);
md.push(`_Script: \`strategic-audit.js\` — rerun anytime to refresh._`);
md.push('');
md.push('## Snapshot');
md.push('');
md.push(`Total HTML pages scanned: **${summary.totalPages}**`);
md.push('');
md.push('| Tier | Count | Meaning |');
md.push('|---|---:|---|');
md.push(`| HAMMER | ${summary.tierCounts.HAMMER} | load-bearing mission pages — rewrite to extraordinary |`);
md.push(`| KEEP | ${summary.tierCounts.KEEP} | solid middle — polish + cross-link |`);
md.push(`| THIN | ${summary.tierCounts.THIN} | under 350 words — merge or expand |`);
md.push(`| ORPHAN | ${summary.tierCounts.ORPHAN} | inbound ≤ 1 — wire in or retire |`);
md.push(`| RETIRE | ${summary.tierCounts.RETIRE} | thin AND orphaned — merge into stronger page |`);
md.push(`| INFRA | ${summary.tierCounts.INFRA} | hubs + utility pages (excluded from content tiers) |`);
md.push('');

md.push('## Category Breakdown');
md.push('');
md.push('| Category | Count |');
md.push('|---|---:|');
for (const [cat, n] of Object.entries(summary.categoryCounts).sort((a, b) => b[1] - a[1])) {
  md.push(`| ${cat} | ${n} |`);
}
md.push('');

md.push('## The Hammer Candidates — Top 60 by mission impact');
md.push('');
md.push('_High inbound link count + substantial word count + mission-core category._');
md.push('_These are the pages worth making extraordinary. Each should be rewritten to be the best page on the internet on its topic._');
md.push('');
md.push('| # | File | Inbound | Words | Category |');
md.push('|---:|---|---:|---:|---|');
summary.topHammers.forEach((p, i) => {
  md.push(`| ${i+1} | \`${p.file}\` | ${p.inbound} | ${p.words} | ${p.category} |`);
});
md.push('');

md.push('## Deepest Backlinked (Top 30)');
md.push('');
md.push('_These pages, regardless of tier, are referenced most across the site. They carry disproportionate SEO + journey weight._');
md.push('');
md.push('| # | File | Inbound | Words | Category |');
md.push('|---:|---|---:|---:|---|');
summary.deepestBacklinked.forEach((p, i) => {
  md.push(`| ${i+1} | \`${p.file}\` | ${p.inbound} | ${p.words} | ${p.category} |`);
});
md.push('');

md.push('## Orphans & Retire Candidates (Top 80)');
md.push('');
md.push('_Pages with ≤ 1 inbound link. Either wire them into a hub/sibling, merge them, or retire them._');
md.push('');
md.push('| File | Inbound | Words | Tier |');
md.push('|---|---:|---:|---|');
summary.topOrphans.forEach(p => {
  md.push(`| \`${p.file}\` | ${p.inbound} | ${p.words} | ${p.tier} |`);
});
md.push('');

md.push('## Thinnest Content (Bottom 40 by word count)');
md.push('');
md.push('_Pages with low word count. Either expand substantially or merge into a stronger page._');
md.push('');
md.push('| File | Words | Inbound | Tier |');
md.push('|---|---:|---:|---|');
summary.thinnestPages.forEach(p => {
  md.push(`| \`${p.file}\` | ${p.words} | ${p.inbound} | ${p.tier} |`);
});
md.push('');

md.push('## Redundancy Clusters (Top 40)');
md.push('');
md.push('_Pages with overlapping slug stems — candidates for consolidation. Investigate each cluster to confirm real duplication vs. legitimate complementary pages._');
md.push('');
for (const [stem, files] of redundancyClusters.slice(0, 40)) {
  md.push(`**\`${stem}\`** (${files.length} pages)`);
  md.push('');
  for (const f of files) {
    const p = pages[f];
    md.push(`- \`${f}\` — ${p.wordCount}w, ${p.inboundCount} inbound`);
  }
  md.push('');
}

md.push('## Structurally Broken Pages');
md.push('');
md.push('_Pages where `<article class="article-body">` is empty but substantial content exists outside it. Violates the CLAUDE.md canonical-design mandate. Content looks fine to readers but the structural wrapper is missing content. Fix: move the real content INTO the `article-body` wrapper._');
md.push('');
if (structurallyBroken.length === 0) {
  md.push('_None found._');
} else {
  md.push('| File | Words | Inbound |');
  md.push('|---|---:|---:|');
  for (const p of structurallyBroken) md.push(`| \`${p.file}\` | ${p.words} | ${p.inbound} |`);
}
md.push('');

md.push('---');
md.push('');
md.push('## How to use this report');
md.push('');
md.push('1. **Review the Hammer list** — confirm these are the 60 pages worth extraordinary investment. Cut any that feel off-mission; promote any strong KEEPs that belong.');
md.push('2. **Walk the Orphans list** — for each, decide: wire in, merge, or retire. Update `MISSION-CONTROL.md` with the disposition.');
md.push('3. **Investigate Redundancy Clusters** — most will be legitimate, some will reveal a cleanup opportunity.');
md.push('4. **Rerun periodically** — `node strategic-audit.js`. After rewrites, the Hammer list should get stronger and orphan count should drop.');
md.push('');
fs.writeFileSync(path.join(ROOT, 'AUDIT-REPORT.md'), md.join('\n'));
console.log('✓ wrote AUDIT-REPORT.md');

console.log('\n══════════════════════════════════');
console.log(`HAMMER : ${summary.tierCounts.HAMMER}`);
console.log(`KEEP   : ${summary.tierCounts.KEEP}`);
console.log(`THIN   : ${summary.tierCounts.THIN}`);
console.log(`ORPHAN : ${summary.tierCounts.ORPHAN}`);
console.log(`RETIRE : ${summary.tierCounts.RETIRE}`);
console.log(`INFRA  : ${summary.tierCounts.INFRA}`);
console.log('══════════════════════════════════\n');
