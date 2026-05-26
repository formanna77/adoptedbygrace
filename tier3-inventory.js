#!/usr/bin/env node
/*
 * tier3-inventory.js — S68 one-time inventory pass of the Tier-3 long tail.
 *
 * Splits the 431-page Tier-3 set into four buckets so the campaign's real
 * remaining surface becomes visible:
 *
 *   BUCKET A — STRUCTURAL-EXEMPT (not a prose doorway; documented out-of-scope)
 *   BUCKET B — BORN-APEX, NEEDS MARKER ONLY (passes the 5-signal apex sniff test)
 *   BUCKET C — GENUINELY NEEDS DEEPENING (the real S69+ work queue)
 *   BUCKET D — UNCERTAIN / NEEDS LIVE-READ (mixed signals; spot-read this session)
 *
 * Output: tier3-inventory.txt + bucket-A/B/C/D files for downstream automation.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const pageSet = new Set(htmlFiles.map(f => f.replace(/\.html$/, '')));

const EXCLUDE = new Set([
  '404','sitemap','search','privacy','terms','contact','donate','quote-cards','all-content','topics','explore-map'
]);

// Explicit BUCKET A allowlist — structural / utility / non-prose-doorway pages that should never
// be held to the §XVI sapiential bar even if they happen to carry an <article class="article-body">.
const STRUCTURAL_EXEMPT_PATTERNS = [
  /^printable-/,
  /^objection-builder$/,
  /^testimony-wall$/,
  /^verse-navigator$/,
  /^verse-explorer$/,
  /^belief-assessment$/,
  /^question-faith-origin-test$/,
  /^404$/,
  /^about$/,
  /^contact$/,
  /^support$/,
  /^connections$/,
  /^sitemap$/,
  /^all-content$/,
  /^search$/,
  /^topics$/,
  /^quotes$/,
  /^start-here$/,             // the staircase hub itself (not the phase pages)
  /^home$/,
  /^index$/,
  /^analogies-illustrations$/, // illustration index
  /^categories$/,
  /^best-reads$/,
  /^reformed-sources$/,
  /^theologians$/,             // the index hub, not theologian-* pages
  /^story-collection$/,        // index of stories
  /^big-picture$/,
  /^doctrines-of-grace$/,      // landing hub
  /^why-sovereignty-matters$/, // hub
  /^questions$/,                // master Q hub
];

// Phase G / Phase D BORN-APEX filename families (S43-S58 build). These were authored to the
// apex bar at birth; many lack only the explicit CONSECRATED marker.
const BORN_APEX_PATTERNS = [
  /^apologetic-/,
  /^ethics-/,
  /^presuppositional-/,
  /^reformed-apologetics-/,
  /^word-study-/,            // Greek/Hebrew word-study series — born-apex §XV exposition
  /^demolition-/,            // demolition cluster
  /^argument-/,              // argument cluster
];

function normHref(h) {
  h = h.split('#')[0].split('?')[0];
  h = h.replace(/^\.?\//, '');
  h = h.replace(/\.html$/, '');
  return h;
}

function isStructuralExempt(name) {
  return STRUCTURAL_EXEMPT_PATTERNS.some(re => re.test(name));
}

function isBornApexFamily(name) {
  return BORN_APEX_PATTERNS.some(re => re.test(name));
}

// 5-signal apex sniff test
function apexSignals(name, html) {
  const signals = {};
  signals.hasArticleBody = html.includes('<article class="article-body">');
  signals.hasInBrief = html.includes('class="tldr"');
  signals.bornApexFamily = isBornApexFamily(name);
  signals.hasMarker = html.includes('HAMMER-LOCKED') || html.includes('CONSECRATED');

  // §XV signature: transliterated Greek/Hebrew in italics. Pattern: <em>lowercase-greekish</em>
  // The site's convention is <em>word</em> for transliterated terms; but to avoid false positives
  // we require either an explicit Greek/Hebrew callout phrase OR a long italic of >=5 chars
  // that looks like a transliteration (lowercase, contains macrons OR explicitly named).
  const transliterationCues = [
    /<em>[a-zA-Z]*ē[a-zA-Z]*<\/em>/,        // macron
    /<em>[a-zA-Z]*ō[a-zA-Z]*<\/em>/,
    /<em>[a-zA-Z]*ē/,
    /<em>[a-zA-Z]*ō/,
    /Greek (?:word|verb|noun|term|root|construction|grammar|tense|voice|mood|case|aorist|perfect|present|future|imperfect|active|passive|middle|subjunctive|indicative|periphrastic|pluperfect)/i,
    /Hebrew (?:word|verb|noun|term|root|construction|grammar|tense)/i,
    /the Greek (?:reads|here|behind|construction|is|of)/i,
    /the Hebrew (?:reads|here|is)/i,
    /tetagmenoi|gegennētai|helkyō|proorizō|proginōskō|exelexato|echaristhē|en Christō|ou mē|hosoi/i,
  ];
  signals.hasGreekHebrewSurfacing = transliterationCues.some(re => re.test(html));

  // Article-body word count
  let words = 0;
  const m = html.indexOf('<article class="article-body">');
  if (m !== -1) {
    let body = html.slice(m);
    const rel = body.indexOf('<!-- RELATED-ARTICLES-START -->');
    if (rel !== -1) body = body.slice(0, rel);
    const text = body.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ');
    words = (text.match(/\S+/g) || []).length;
  }
  signals.words = words;
  signals.longEnough = words >= 1200;

  // Tier (existing locks)
  let tier = 'UNMARKED';
  if (signals.hasMarker) tier = 'APEX';
  else if (html.includes('POLISH-LOCKED')) tier = 'POLISH';
  signals.tier = tier;

  return signals;
}

// Compute inbound counts (same logic as sapiential-audit.js)
const inbound = {};
htmlFiles.forEach(f => { inbound[f.replace(/\.html$/, '')] = 0; });
for (const f of htmlFiles) {
  const name = f.replace(/\.html$/, '');
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const hrefs = html.match(/href="([^"]+)"/g) || [];
  const seen = new Set();
  for (const raw of hrefs) {
    const val = raw.slice(6, -1);
    if (/^(https?:|mailto:|#|tel:)/.test(val)) continue;
    const target = normHref(val);
    if (!target || target === name) continue;
    if (pageSet.has(target) && !seen.has(target)) {
      inbound[target] = (inbound[target] || 0) + 1;
      seen.add(target);
    }
  }
}

// Classify
const allPages = [];
for (const f of htmlFiles) {
  const name = f.replace(/\.html$/, '');
  if (EXCLUDE.has(name)) continue;
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const sig = apexSignals(name, html);
  allPages.push({ name, inbound: inbound[name] || 0, ...sig });
}

// 75th-percentile threshold (same as sapiential-audit.js) to find prose tier
const proseAll = allPages.filter(p => p.hasArticleBody);
const inboundsSorted = proseAll.map(p => p.inbound).sort((a, b) => a - b);
const q75 = inboundsSorted.length ? inboundsSorted[Math.floor(inboundsSorted.length * 0.75)] : 0;
const HIGH = Math.max(q75, 1);

// Tier-3 = prose pages with inbound < HIGH
const tier3 = proseAll.filter(p => p.inbound < HIGH);

// Now bucket Tier-3 into A/B/C/D
const bucketA = []; // structural-exempt
const bucketB = []; // born-apex, needs marker only
const bucketC = []; // genuinely needs deepening
const bucketD = []; // uncertain / spot-read

for (const p of tier3) {
  if (isStructuralExempt(p.name)) {
    bucketA.push({ ...p, reason: 'STRUCTURAL_EXEMPT_ALLOWLIST' });
    continue;
  }

  // BUCKET B test: born-apex
  // EITHER family-match (apologetic-*, ethics-*, presuppositional-*, reformed-apologetics-*,
  //   word-study-*, demolition-*, argument-*) with In-Brief + long
  // OR full 5-signal: hasArticleBody + hasInBrief + ≥1200w + greek/hebrew surfacing
  const fiveSignal = p.hasArticleBody && p.hasInBrief && p.longEnough && p.hasGreekHebrewSurfacing;
  const familyApex = p.bornApexFamily && p.hasInBrief && p.longEnough;
  const apexMarker = p.hasMarker; // already locked

  if (apexMarker) {
    // Already marked; logically shouldn't be Tier-3 unless inbound is very low.
    // Treat as BUCKET B (already at the bar).
    bucketB.push({ ...p, reason: 'ALREADY_MARKED' });
  } else if (fiveSignal && familyApex) {
    bucketB.push({ ...p, reason: 'BORN_APEX_FAMILY+5SIG' });
  } else if (fiveSignal) {
    bucketB.push({ ...p, reason: 'FIVE_SIGNAL_APEX' });
  } else if (familyApex) {
    bucketB.push({ ...p, reason: 'BORN_APEX_FAMILY' });
  } else if (p.bornApexFamily && p.longEnough) {
    // Family-born + long, but no In-Brief — uncertain (might be apex prose lacking on-ramp)
    bucketD.push({ ...p, reason: 'FAMILY_LONG_NO_INBRIEF' });
  } else if (p.hasInBrief && p.longEnough) {
    // Has In-Brief + length but not in apex family and no Greek/Hebrew surfacing.
    // Could still be wisdom-pass; spot-read.
    bucketD.push({ ...p, reason: 'INBRIEF_LONG_NO_GH' });
  } else {
    // Real deepening target
    bucketC.push({ ...p, reason: shortReason(p) });
  }
}

function shortReason(p) {
  const r = [];
  if (!p.hasInBrief) r.push('no-inbrief');
  if (!p.longEnough) r.push(`short-${p.words}w`);
  if (!p.hasGreekHebrewSurfacing) r.push('no-gh');
  if (p.tier === 'UNMARKED') r.push('unmarked');
  return r.join('+') || 'mixed';
}

const byInbound = (a, b) => b.inbound - a.inbound || a.name.localeCompare(b.name);
bucketA.sort(byInbound); bucketB.sort(byInbound); bucketC.sort(byInbound); bucketD.sort(byInbound);

function fmt(p) {
  return `  [${String(p.inbound).padStart(3)} in] [${p.tier.padEnd(8)}] [${String(p.words).padStart(4)}w] ${p.hasInBrief ? '       ' : 'no-brief'} ${p.name.padEnd(50)} :: ${p.reason}`;
}

const out = [];
out.push('TIER-3 INVENTORY PASS — S68 one-time classification of the long tail');
out.push(`Generated ${new Date().toISOString()}`);
out.push('');
out.push(`Tier-3 total: ${tier3.length}`);
out.push(`  BUCKET A — STRUCTURAL-EXEMPT (out-of-scope for §XVI): ${bucketA.length}`);
out.push(`  BUCKET B — BORN-APEX, NEEDS MARKER ONLY: ${bucketB.length}`);
out.push(`  BUCKET C — GENUINELY NEEDS DEEPENING (true work queue): ${bucketC.length}`);
out.push(`  BUCKET D — UNCERTAIN / NEEDS LIVE-READ: ${bucketD.length}`);
out.push('');
out.push('===== BUCKET A — STRUCTURAL-EXEMPT =====');
bucketA.forEach(p => out.push(fmt(p)));
out.push('');
out.push('===== BUCKET B — BORN-APEX, NEEDS MARKER ONLY =====');
bucketB.forEach(p => out.push(fmt(p)));
out.push('');
out.push('===== BUCKET C — GENUINELY NEEDS DEEPENING (the real S69+ work queue) =====');
bucketC.forEach(p => out.push(fmt(p)));
out.push('');
out.push('===== BUCKET D — UNCERTAIN / NEEDS LIVE-READ =====');
bucketD.forEach(p => out.push(fmt(p)));

fs.writeFileSync(path.join(ROOT, 'tier3-inventory.txt'), out.join('\n'));

// Also write bucket lists in machine-readable form for the batch-marker pass
fs.writeFileSync(path.join(ROOT, 'tier3-bucket-A.txt'), bucketA.map(p => p.name).join('\n'));
fs.writeFileSync(path.join(ROOT, 'tier3-bucket-B.txt'), bucketB.map(p => p.name).join('\n'));
fs.writeFileSync(path.join(ROOT, 'tier3-bucket-C.txt'), bucketC.map(p => p.name).join('\n'));
fs.writeFileSync(path.join(ROOT, 'tier3-bucket-D.txt'), bucketD.map(p => p.name).join('\n'));

console.log(`Tier-3 ${tier3.length} | A ${bucketA.length} | B ${bucketB.length} | C ${bucketC.length} | D ${bucketD.length}`);
console.log('Wrote tier3-inventory.txt + tier3-bucket-{A,B,C,D}.txt');
