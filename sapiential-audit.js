#!/usr/bin/env node
/*
 * sapiential-audit.js — the standing full-site flag pass for the Sapiential Standard (VOICE.md §XVI).
 *
 * The wisdom bar cannot be detected by regex — only by live-reading. This script does NOT
 * claim to measure wisdom. It surfaces the SIGNALS that tell a future session WHERE to spend
 * its scarce live-read + deepening budget for maximum leverage:
 *
 *   - inbound  : how many other pages link here (a proxy for first-encounter importance —
 *                a high-inbound page is read by many, so deepening it has the widest reach)
 *   - tier     : APEX (HAMMER/CONSECRATED) | POLISH | UNMARKED  (locks are NOT exemptions, but
 *                APEX pages are closer to the bar, so non-apex high-traffic pages rank first)
 *   - words    : article-body word count (a weak depth proxy — very short prose pages are suspect)
 *   - inBrief  : has the In-Brief on-ramp box
 *
 * Tiering (leverage = importance x distance-from-the-bar):
 *   TIER 1  high inbound  AND  not APEX        -> most-seen, least-hammered: deepen first
 *   TIER 2  high inbound  AND  APEX            -> re-read against the NEW wisdom bar (locks not exempt)
 *   TIER 3  the long tail                       -> deepen opportunistically
 *
 * "High inbound" = at or above the 75th-percentile inbound count among prose pages (computed live).
 * Output: sapiential-audit-report.txt  (review it; it does not mutate any page).
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const pageSet = new Set(htmlFiles.map(f => f.replace(/\.html$/, '')));

// Utility / non-prose pages to exclude from the queue even if they somehow carry an article-body.
const EXCLUDE = new Set([
  '404','sitemap','search','privacy','terms','contact','donate','quote-cards','all-content','topics','explore-map'
]);

function normHref(h) {
  // strip query/anchor, leading ./ or /, trailing .html
  h = h.split('#')[0].split('?')[0];
  h = h.replace(/^\.?\//, '');
  h = h.replace(/\.html$/, '');
  return h;
}

const pages = {}; // name -> {tier, words, inBrief, inbound, isProse}
const inbound = {};
htmlFiles.forEach(f => { inbound[f.replace(/\.html$/, '')] = 0; });

for (const f of htmlFiles) {
  const name = f.replace(/\.html$/, '');
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const isProse = html.includes('<article class="article-body">');

  // lock tier
  let tier = 'UNMARKED';
  if (html.includes('HAMMER-LOCKED') || html.includes('CONSECRATED')) tier = 'APEX';
  else if (html.includes('POLISH-LOCKED')) tier = 'POLISH';

  // article-body word count
  let words = 0;
  const m = html.indexOf('<article class="article-body">');
  if (m !== -1) {
    let body = html.slice(m);
    const rel = body.indexOf('<!-- RELATED-ARTICLES-START -->');
    if (rel !== -1) body = body.slice(0, rel);
    const text = body.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ');
    words = (text.match(/\S+/g) || []).length;
  }

  const inBrief = html.includes('class="tldr"');
  pages[name] = { tier, words, inBrief, isProse };

  // count outbound internal links -> inbound for targets
  const hrefs = html.match(/href="([^"]+)"/g) || [];
  const seenFromThisPage = new Set();
  for (const raw of hrefs) {
    const val = raw.slice(6, -1);
    if (/^(https?:|mailto:|#|tel:)/.test(val)) continue;
    const target = normHref(val);
    if (!target || target === name) continue;
    if (pageSet.has(target) && !seenFromThisPage.has(target)) {
      inbound[target] = (inbound[target] || 0) + 1;
      seenFromThisPage.add(target);
    }
  }
}
Object.keys(pages).forEach(n => { pages[n].inbound = inbound[n] || 0; });

// prose pages in scope
const prose = Object.keys(pages)
  .filter(n => pages[n].isProse && !EXCLUDE.has(n))
  .map(n => ({ name: n, ...pages[n] }));

// 75th-percentile inbound among prose pages
const inboundsSorted = prose.map(p => p.inbound).sort((a, b) => a - b);
const q75 = inboundsSorted.length
  ? inboundsSorted[Math.floor(inboundsSorted.length * 0.75)]
  : 0;
const HIGH = Math.max(q75, 1);

const tier1 = prose.filter(p => p.inbound >= HIGH && p.tier !== 'APEX');
const tier2 = prose.filter(p => p.inbound >= HIGH && p.tier === 'APEX');
const tier3 = prose.filter(p => p.inbound < HIGH);

const byInboundDesc = (a, b) => b.inbound - a.inbound || a.words - b.words;
tier1.sort(byInboundDesc); tier2.sort(byInboundDesc); tier3.sort(byInboundDesc);

const shortProse = prose.filter(p => p.words > 0 && p.words < 900).sort((a, b) => a.words - b.words);
const noInBrief = prose.filter(p => !p.inBrief).sort(byInboundDesc);

function fmt(p) {
  return `  [${String(p.inbound).padStart(3)} in] [${p.tier.padEnd(8)}] [${String(p.words).padStart(4)}w] ${p.inBrief ? '       ' : 'no-brief'} ${p.name}`;
}

const lines = [];
lines.push('SAPIENTIAL FLAG PASS — signal report for the Sapiential Standard (VOICE.md §XVI)');
lines.push(`Generated ${new Date().toISOString()}`);
lines.push('');
lines.push(`Prose pages in scope: ${prose.length}  |  high-inbound threshold (75th pct): >= ${HIGH}`);
lines.push(`  TIER 1 (high inbound, NOT apex — deepen first): ${tier1.length}`);
lines.push(`  TIER 2 (high inbound, apex — re-read vs the new bar): ${tier2.length}`);
lines.push(`  TIER 3 (long tail): ${tier3.length}`);
lines.push(`  Short prose (<900 words, depth-suspect): ${shortProse.length}`);
lines.push('');
lines.push('NOTE: this is a SIGNAL report, not a wisdom verdict. The bar is met or missed only on live-read.');
lines.push('Columns: [inbound] [tier] [words] [in-brief?] name');
lines.push('');
lines.push('===== TIER 1 — highest leverage (most-seen, least-hammered) =====');
tier1.forEach(p => lines.push(fmt(p)));
lines.push('');
lines.push('===== TIER 2 — apex pages to re-read against the new bar (locks not exempt) =====');
tier2.forEach(p => lines.push(fmt(p)));
lines.push('');
lines.push('===== SHORT PROSE (<900 words) — depth-suspect regardless of tier =====');
shortProse.forEach(p => lines.push(fmt(p)));
lines.push('');
lines.push('===== TIER 3 — long tail (top 60 by inbound) =====');
tier3.slice(0, 60).forEach(p => lines.push(fmt(p)));
lines.push('');
lines.push(`(${tier3.length - Math.min(60, tier3.length)} more tier-3 pages not shown)`);

fs.writeFileSync(path.join(ROOT, 'sapiential-audit-report.txt'), lines.join('\n'));
console.log(`Prose pages: ${prose.length} | HIGH>=${HIGH} | T1 ${tier1.length} / T2 ${tier2.length} / T3 ${tier3.length} | short ${shortProse.length}`);
console.log('Wrote sapiential-audit-report.txt');
