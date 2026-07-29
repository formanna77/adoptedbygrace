#!/usr/bin/env node
/**
 * validate-site.js — Site integrity validator for adoptedbygrace.net
 *
 * Run this BEFORE finishing any session that modifies HTML files.
 * Checks for: broken internal links, orphaned pages, missing hub wiring,
 * duplicate cards, missing structural elements, and CSS issues.
 *
 * Usage: node validate-site.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Safe file reader — skips locked/unreadable files
function safeReadFileSync(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}
const IGNORE_FILES = new Set(['_nav-template.html', '404.html', 'search.html']);
// S186: the three meta-refresh stubs that used to live here (creeds-confessions,
// analogies-illustrations, demolition-matt23-37) were DELETED and replaced with
// forced 301s in _redirects. A <meta http-equiv="refresh"> page is a soft redirect:
// slower for the reader, leaky for link equity, and indexable as a thin page —
// and each of these was ALSO shadowing its own rule, because Netlify serves a real
// file in preference to an un-forced redirect. Keep this set empty unless a genuine
// stub returns; a forced 301! in _redirects is always the better instrument.
const REDIRECT_PAGES = new Set([]); // minimal redirect pages — skip structural checks
const UTILITY_PAGES = new Set([
    'index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html',
    'all-content.html', 'topics.html', 'connections.html', 'explore-map.html',
    'best-reads.html', 'start-here.html', 'start-here-assessment.html',
    'belief-assessment.html', 'quiz.html', 'freedom.html', 'scripture-tsunami.html',
    'scripture-tsunami-faith-as-gift.html', 'debate-free-will.html',
    'romans-8-28-39.html', 'romans-9-1-24.html', 'psalms-election.html',
    'hymn-amazing-grace.html', 'verse-explorer.html', 'resistance-last-idol.html',
    'resistance-redefining-grace.html'
]);

// Hub page registry — which hub owns which prefix
const HUB_REGISTRY = {
    'questions.html': ['question-', 'objection-', 'apologetic-'],
    'demolition-hub.html': ['demolition-'],
    'psychology-hub.html': ['psychology-'],
    'philosophy-hub.html': ['philosophy-'],
    'stories.html': ['story-', 'analogy-'],
    'devotionals.html': ['devotional-'],
    // S186: analogies-illustrations.html was a redirect stub pointing at /stories.
    // Stub deleted; stories.html already links all 10 analogy-* pages, so it owns
    // the prefix now. Without this, every analogy-* page reads as an orphan.
    'secular-evidence.html': ['secular-'],
    'systematic-theology.html': ['systematic-'],
    'theologians.html': ['theologian-'],
    'history-timeline.html': ['history-', 'creed-'],
    'ot-hub.html': ['ot-'],
    'essays.html': ['counter-'],
    // newsletter section ELIMINATED 2026-04-04
    'invisible-wall-hub.html': ['invisible-wall-'],
    'open-wound-hub.html': ['open-wound-'],
    'shattered-lens-hub.html': ['shattered-lens-'],
    'broken-mirror-hub.html': ['broken-mirror-'],
    'anxious-mind-hub.html': ['anxious-mind-'],
    'pastoral-hub.html': ['pastoral-'],
    'comparisons-hub.html': ['compare-'],
    'start-here.html': ['start-here-phase']
};

let errors = 0;
let warnings = 0;

function error(msg) { console.log(`  ❌ ERROR: ${msg}`); errors++; }
function warn(msg) { console.log(`  ⚠️  WARN: ${msg}`); warnings++; }
function ok(msg) { console.log(`  ✅ ${msg}`); }

// Get all HTML files
const htmlFiles = fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html') && !IGNORE_FILES.has(f))
    .filter(f => !f.startsWith('.'));

const existingFiles = new Set(htmlFiles);

console.log(`\n🔍 SITE INTEGRITY VALIDATOR — adoptedbygrace.net`);
console.log(`   Scanning ${htmlFiles.length} HTML files...\n`);

// ═══════════════════════════════════════
// CHECK 1: Broken Internal Links
// ═══════════════════════════════════════
console.log('━━━ CHECK 1: Broken Internal Links ━━━');
let brokenLinks = 0;

for (const file of htmlFiles) {
    const content = safeReadFileSync(path.join(ROOT, file));
    if (!content) continue;
    // Match href attributes pointing to local .html files
    const hrefRegex = /href=["'](?:\/)?([a-z0-9_-]+(?:\.html)?)["']/gi;
    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
        let target = match[1];
        // Normalize: add .html if missing
        if (!target.endsWith('.html') && !target.includes('.') && !target.startsWith('http') && !target.startsWith('#') && !target.startsWith('mailto')) {
            target = target + '.html';
        }
        if (target.endsWith('.html') && !existingFiles.has(target)) {
            error(`${file} → broken link to "${match[1]}" (file not found: ${target})`);
            brokenLinks++;
        }
    }
}
if (brokenLinks === 0) ok('No broken internal links found');

// ═══════════════════════════════════════
// CHECK 2: Orphaned Pages (not linked from any hub)
// ═══════════════════════════════════════
console.log('\n━━━ CHECK 2: Orphaned Pages ━━━');
let orphanCount = 0;

// Build a map of which files are linked from hub pages
const hubLinkedFiles = new Set();
for (const [hubFile, prefixes] of Object.entries(HUB_REGISTRY)) {
    if (!existingFiles.has(hubFile)) {
        warn(`Hub page ${hubFile} doesn't exist`);
        continue;
    }
    const hubContent = safeReadFileSync(path.join(ROOT, hubFile));
    if (!hubContent) continue;
    const linkRegex = /href=["'](?:\/)?([a-z0-9_-]+(?:\.html)?)["']/gi;
    let m;
    while ((m = linkRegex.exec(hubContent)) !== null) {
        let target = m[1];
        if (!target.endsWith('.html')) target += '.html';
        hubLinkedFiles.add(target);
    }
}

// Check each content file
for (const file of htmlFiles) {
    if (UTILITY_PAGES.has(file)) continue;
    // Skip redirect stubs — intentionally not linked from any hub
    if (REDIRECT_PAGES.has(file)) continue;
    // Skip hub pages themselves
    if (Object.keys(HUB_REGISTRY).includes(file)) continue;
    // Skip files that don't match any known prefix
    const matchesPrefix = Object.values(HUB_REGISTRY).flat().some(prefix => file.startsWith(prefix));
    if (!matchesPrefix) continue;

    if (!hubLinkedFiles.has(file)) {
        warn(`ORPHAN: ${file} — not linked from any hub page`);
        orphanCount++;
    }
}
if (orphanCount === 0) ok('No orphaned content pages');

// ═══════════════════════════════════════
// CHECK 3: Missing Structural Elements
// ═══════════════════════════════════════
console.log('\n━━━ CHECK 3: Structural HTML ━━━');
let structuralIssues = 0;

for (const file of htmlFiles) {
    if (REDIRECT_PAGES.has(file)) continue;
    const content = safeReadFileSync(path.join(ROOT, file));
    if (!content) continue;

    if (!content.includes('global.css')) {
        error(`${file} — missing global.css link`);
        structuralIssues++;
    }
    if (!content.includes('nav.js')) {
        error(`${file} — missing nav.js script`);
        structuralIssues++;
    }
    if (!content.includes('footer-grace-warning')) {
        error(`${file} — missing footer-grace-warning`);
        structuralIssues++;
    }
    if (!content.includes('nav-container')) {
        error(`${file} — missing navigation`);
        structuralIssues++;
    }
}
if (structuralIssues === 0) ok('All pages have required structural elements');

// ═══════════════════════════════════════
// CHECK 4: Hub pages with inline styles (banned)
// ═══════════════════════════════════════
console.log('\n━━━ CHECK 4: Inline Styles on Hub Pages ━━━');
let styleIssues = 0;

for (const hubFile of Object.keys(HUB_REGISTRY)) {
    if (!existingFiles.has(hubFile)) continue;
    const content = safeReadFileSync(path.join(ROOT, hubFile));
    if (!content) continue;
    if (content.includes('<style')) {
        error(`${hubFile} — has inline <style> block (BANNED on hub pages)`);
        styleIssues++;
    }
}
if (styleIssues === 0) ok('No inline styles on hub pages');

// ═══════════════════════════════════════
// CHECK 5: CANONICAL DESIGN FORMAT COMPLIANCE
// ═══════════════════════════════════════
console.log('\n━━━ CHECK 5: Canonical Design Format ━━━');
let designIssues = 0;

// Banned class names — these were all replaced with canonical equivalents
const BANNED_CLASSES = [
    { pattern: 'class="article-hero"', fix: 'class="page-hero"' },
    { pattern: 'class="article-subtitle"', fix: 'class="subtitle"' },
    { pattern: 'class="article-meta"', fix: 'class="eyebrow"' },
    { pattern: 'class="hero-eyebrow"', fix: 'class="eyebrow"' },
    { pattern: 'class="topic-label"', fix: 'class="eyebrow"' },
    { pattern: 'class="category-tag"', fix: 'class="eyebrow"' },
    { pattern: 'class="hero-topic"', fix: 'class="eyebrow"' },
    { pattern: 'class="hero-subtitle"', fix: 'class="subtitle"' },
    { pattern: 'class="hero-description"', fix: 'class="subtitle"' },
    { pattern: 'class="hero-section"', fix: 'class="page-hero"' },
    { pattern: 'class="article-section"', fix: 'class="article-body"' },
];

// Hub pages that use hub-hero (exempt from page-hero check)
const HUB_FILES = new Set(Object.keys(HUB_REGISTRY));
const EXEMPT_FROM_HERO = new Set([
    ...UTILITY_PAGES, ...HUB_FILES, ...IGNORE_FILES, ...REDIRECT_PAGES,
    'index.html', '_nav-template.html'
]);

for (const file of htmlFiles) {
    const content = safeReadFileSync(path.join(ROOT, file));
    if (!content) continue;

    // Check for banned class names
    for (const { pattern, fix } of BANNED_CLASSES) {
        if (content.includes(pattern)) {
            error(`${file} — uses banned "${pattern}" → should be "${fix}"`);
            designIssues++;
        }
    }

    // Check article pages have page-hero with eyebrow
    if (!EXEMPT_FROM_HERO.has(file) && !content.includes('hub-hero')) {
        if (!content.includes('page-hero')) {
            error(`${file} — missing page-hero class (canonical hero)`);
            designIssues++;
        } else if (!content.includes('class="eyebrow"')) {
            warn(`${file} — has page-hero but missing .eyebrow element`);
            designIssues++;
        }
    }

    // Check article pages use content-section or article-body (not bare unstyled content)
    if (!EXEMPT_FROM_HERO.has(file) && !content.includes('hub-hero')) {
        const hasContentContainer = content.includes('content-section') ||
                                     content.includes('article-body') ||
                                     content.includes('article-content') ||
                                     content.includes('content-wrap') ||
                                     content.includes('story-text') ||
                                     content.includes('story-container') ||
                                     content.includes('class="content"') ||
                                     content.includes('class="section"');
        if (!hasContentContainer) {
            warn(`${file} — no content container class (content-section/article-body/content/section)`);
            designIssues++;
        }
    }

    // Check for <article class="article-container"> wrapper (banned)
    if (content.includes('<article class="article-container">') || content.includes('<div class="article-container">')) {
        error(`${file} — uses banned article-container wrapper`);
        designIssues++;
    }
}
if (designIssues === 0) ok('All pages follow canonical design format');

// ═══════════════════════════════════════
// CHECK 6: CSS brace balance
// ═══════════════════════════════════════
console.log('\n━━━ CHECK 6: CSS Integrity ━━━');
const cssPath = path.join(ROOT, 'global.css');
if (fs.existsSync(cssPath)) {
    const css = fs.readFileSync(cssPath, 'utf8');
    const opens = (css.match(/\{/g) || []).length;
    const closes = (css.match(/\}/g) || []).length;
    if (opens === closes) {
        ok(`global.css braces balanced (${opens} pairs)`);
    } else {
        error(`global.css brace MISMATCH: ${opens} opens vs ${closes} closes`);
    }
}

// ═══════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════
console.log('\n══════════════════════════════════');
if (errors === 0 && warnings === 0) {
    console.log('🎉 ALL CHECKS PASSED — site integrity verified');
} else {
    if (errors > 0) console.log(`❌ ${errors} ERROR(S) — must fix before finishing`);
    if (warnings > 0) console.log(`⚠️  ${warnings} WARNING(S) — should fix if possible`);
}
console.log('══════════════════════════════════\n');


// ============================================================
// CHECK 7: Internal files must not be publicly served
// ------------------------------------------------------------
// Netlify publishes the repo root, so anything committed here is served.
// On 2026-07-20 /CLAUDE.md and /VOICE.md were both verified live over HTTP,
// returning the manifesto and the complete style bible as text/markdown.
//
// The block lives in _redirects, and the FORCED status ("410!") is
// load-bearing: Netlify redirect rules are SHADOWED by real files, so an
// un-forced rule against a file that exists on disk does nothing at all.
// That is exactly how the first attempt at this fix silently failed.
//
// This check exists so the protection cannot rot. The runtime allowlist is
// DERIVED from the actual <script src> tags in the HTML rather than hardcoded,
// so adding a real front-end script needs no edit here — but adding a build
// script, an internal .md, or an audit .txt without a rule FAILS the build.
// ============================================================
console.log('\n━━━ CHECK 7: Internal Files Not Publicly Served ━━━');

const redirectsTxt = fs.existsSync('_redirects') ? fs.readFileSync('_redirects', 'utf8') : '';
const forced = new Set(
  [...redirectsTxt.matchAll(/^\/(\S+)\s+\S+\s+\d+!\s*$/gm)].map(m => m[1])
);
const archiveSplat = /^\/archive\/\*\s+\S+\s+\d+!/m.test(redirectsTxt);

// Runtime assets are whatever the pages actually load.
const runtimeJs = new Set();
for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/src="\/?([A-Za-z0-9_.-]+\.js)"/g)) runtimeJs.add(m[1]);
}

// ------------------------------------------------------------
// DENY BY DEFAULT (rewritten S193, 2026-07-28).
//
// The old logic gated four extensions — .md .js .txt .json — and let
// EVERYTHING else through. That blind spot was not theoretical: 27 internal
// files totalling 28 MB were being served, including six Netlify deploy
// archives, eight .backup/.forge-backup copies of live pages, four internal
// audit .csv files, and RE-FORMED.pdf — the author's real-name testimony,
// which the 2026-06-30 anonymization had removed from the HTML but never
// from disk. Extension-by-extension gating rots the moment anyone writes a
// file type nobody thought of.
//
// So the rule is inverted: at the repo root, EVERY file is internal unless
// it is on the public allowlist below. Adding a new deliverable means adding
// it here on purpose — which is the point.
// ------------------------------------------------------------
const PUBLIC_EXACT = new Set([
  // Netlify + crawler control
  '_headers', '_redirects', 'netlify.toml', 'robots.txt', 'sitemap.xml',
  'manifest.webmanifest', 'e1fe0ab8feb1cc06e7918835bec59ae9.txt',
  // runtime data consumed by the front end
  'tags.json', 'testimonies.json',
  // brand assets
  'favicon.ico', 'favicon.png', 'favicon.svg', 'logo.png',
  'og-image.png', 'og-image.svg',
  'apple-touch-icon.png', 'apple-touch-icon-precomposed.png',
  // reader-facing PDFs (linked from the site; add new ones deliberately)
  "Jesus' Path to Eternal Life.pdf",
  'The Institutes Book 3 essay.pdf',
  'The_Architecture.pdf',
  'The_Question_of_the_Hour.pdf',
  'solideogloria.pdf',
  'you cannot escape the text.pdf',
]);

// .html and .css at root are the site itself. Everything else must earn it.
const isPublic = f =>
  f.endsWith('.html') || f.endsWith('.css') ||
  PUBLIC_EXACT.has(f) ||
  (f.endsWith('.js') && runtimeJs.has(f));

const mustBlock = fs.readdirSync('.').filter(f => {
  if (!fs.statSync(f).isFile()) return false;
  return !isPublic(f);
});

const unblocked = mustBlock.filter(f => !forced.has(f));
if (!archiveSplat) {
  console.log('  ❌ MISSING the forced /archive/* splat in _redirects');
  console.log('     Internal docs live under archive/ and rely on it.');
  errors++;
}
if (unblocked.length) {
  console.log(`  ❌ ${unblocked.length} internal file(s) would be served publicly:`);
  unblocked.slice(0, 25).forEach(f => console.log(`     ${f}`));
  if (unblocked.length > 25) console.log(`     …and ${unblocked.length - 25} more`);
  console.log('     FIX: move it into archive/, or add to _redirects:');
  console.log(`     /${unblocked[0]}   /404.html   410!`);
  console.log('     The trailing ! is required — un-forced rules are ignored.');
  errors++;
} else {
  console.log(`  ✅ All internal files blocked (${mustBlock.length} rules, ${runtimeJs.size} runtime assets public)`);
}

// ═══════════════════════════════════════
// CHECK 8: Inline <style> allowlist (ALL pages, not just hubs)
// ═══════════════════════════════════════
//
// WHY THIS EXISTS (S186). CLAUDE.md has carried an inline-<style> allowlist
// since the early sessions — index.html, belief-assessment.html,
// question-faith-origin-test.html, verse-explorer.html — and CHECK 4 enforces
// the ban on HUB pages only. Nothing has ever enforced the allowlist itself.
// After that drift ran unchecked, an audit found the list dead in BOTH
// directions: two of the four named pages NO LONGER EXIST, the other two carry
// NO inline <style> at all, and 27 pages that DO carry one were on no list
// anywhere. A rule with no enforcement is a rule that quietly stops being true.
//
// The allowlist below is rebuilt from what is actually on disk and actually
// justified, in three honest categories. Anything not listed is a prose article
// someone decorated, and belongs in /global.css.
const STYLE_ALLOWED = new Set([
  // 1. Interactive widgets — inline JS drives UI state, CSS is scoped to it
  'fork-in-the-road.html', 'scripture-tsunami.html', 'the-60-second-case.html',
  'the-breath-prayer.html', 'the-fork.html', 'the-golden-chain.html',
  'the-mirror.html', 'the-objection-collapse.html', 'the-scripture-cascade.html',
  // 2. CSS-diagram pages — the stylesheet IS the illustration (flowcharts,
  //    timelines, chain boxes, the two-panel split). No JS; nothing to extract.
  'question-visual-theology.html', 'the-two-arms.html',
  // 3. Print utilities + system pages — @media print rules by definition
  'printable-adoption.html', 'printable-effectual-call.html', 'printable-eph-2.html',
  'printable-faith-is-a-gift.html', 'printable-five-points.html',
  'printable-gospel-in-one-page.html', 'printable-john-6.html',
  'printable-perseverance.html', 'printable-romans-8-28-39.html',
  'printable-romans-9.html', 'printable-the-cross.html', 'printable-the-mirror.html',
  'printable-total-depravity.html', 'printable-twelve-lethal-moves.html',
  'printable-where-did-your-faith-come-from.html',
  '404.html',
]);

console.log('\n━━━ CHECK 8: Inline <style> Allowlist ━━━');
const styleOffenders = [];
for (const f of fs.readdirSync(ROOT)) {
  if (!f.endsWith('.html') || STYLE_ALLOWED.has(f)) continue;
  const content = safeReadFileSync(path.join(ROOT, f));
  if (content && content.includes('<style')) styleOffenders.push(f);
}
const staleAllow = [...STYLE_ALLOWED].filter(f => {
  const c = fs.existsSync(path.join(ROOT, f)) ? safeReadFileSync(path.join(ROOT, f)) : null;
  return c === null || !c.includes('<style');
});
if (styleOffenders.length) {
  console.log(`  ❌ ${styleOffenders.length} page(s) carry an inline <style> and are not allowlisted:`);
  styleOffenders.forEach(f => console.log(`     ${f}`));
  console.log('     FIX: move the rules into /global.css — or, if the page is a genuine');
  console.log('     interactive widget, CSS-diagram page, or print utility, add it to');
  console.log('     STYLE_ALLOWED in validate-site.js AND to the allowlist in CLAUDE.md.');
  errors++;
} else if (staleAllow.length) {
  // Not an error — a dead entry breaks nothing. But it is exactly how the last
  // list rotted, so say it out loud rather than letting it drift again.
  console.log(`  ✅ No unlisted inline <style> (${STYLE_ALLOWED.size} allowlisted)`);
  console.log(`  ⚠  ${staleAllow.length} stale allowlist entr(y/ies) — gone or no longer styled: ${staleAllow.join(', ')}`);
} else {
  console.log(`  ✅ No unlisted inline <style> (${STYLE_ALLOWED.size} allowlisted, none stale)`);
}

// ═══════════════════════════════════════
// CHECK 9: Hero subtitle class + duplicate <title>
// ═══════════════════════════════════════
//
// WHY THIS EXISTS (S186). `.hub-subtitle` is styled in global.css ONLY as
// `.hub-hero .hub-subtitle`. Article pages use `.page-hero`, never `.hub-hero`.
// So every article carrying `<p class="hub-subtitle">` rendered its hero
// subtitle — the first line under the headline — COMPLETELY UNSTYLED: default
// body text, wrong colour, wrong size, full width, no centering. 452 pages were
// in that state and nothing detected it, because no check has ever asked
// whether a class a page uses is actually defined for the context it sits in.
// Fixed site-wide; this check keeps it fixed.
//
// Duplicate <title> is bundled here for the same reason: two genuinely
// different pages shipped the identical title AND h1 ("The Heresy That Won't
// Die"), which is a search-result collision and a reader dead-end.
console.log('\n━━━ CHECK 9: Hero Subtitle Class + Duplicate Titles ━━━');
let heroIssues = 0;
const titleMap = new Map();
for (const f of fs.readdirSync(ROOT)) {
  if (!f.endsWith('.html') || IGNORE_FILES.has(f)) continue;
  const c = safeReadFileSync(path.join(ROOT, f));
  if (!c) continue;
  // hub-subtitle is only styled under .hub-hero; on a .page-hero it is dead CSS
  if (c.includes('class="hub-subtitle"') && c.includes('page-hero') && !c.includes('hub-hero')) {
    error(`${f} — <p class="hub-subtitle"> on a .page-hero renders UNSTYLED (use class="subtitle")`);
    heroIssues++;
  }
  const t = c.match(/<title>([\s\S]*?)<\/title>/);
  if (t) {
    const key = t[1].trim();
    if (!titleMap.has(key)) titleMap.set(key, []);
    titleMap.get(key).push(f);
  }
}
const dupes = [...titleMap.entries()].filter(([, v]) => v.length > 1);
for (const [t, files] of dupes) {
  error(`duplicate <title> "${t.slice(0, 60)}" on: ${files.join(', ')}`);
  heroIssues++;
}
if (heroIssues === 0) ok('Hero subtitles correctly classed; no duplicate <title>');

// ─────────────────────────────────────────────────────────────────────────────
// CHECK 10: Inline style= ATTRIBUTES inside prose bodies — a one-way ratchet.
//
// CHECK 8 polices inline <style> TAGS. It has never looked at style= attributes,
// so those went entirely unpoliced, and 236 prose pages have accumulated 733 of
// them — whole card grids styled by hand inside <article class="article-body">
// (`psychology-why-we-resist`, `psychology-emotional-vs-rational`, and the worst
// offender, `secular-genetics-sovereignty`, at 58).
//
// That backlog is too large to sweep in one session and too easy to grow in one
// edit. So this check is deliberately NOT a zero-tolerance rule: it is a budget.
// Every page's current count is recorded in archive/inline-style-budget.json,
// and the check fails if any page goes ABOVE its recorded number, or if a page
// with no entry introduces one. Counts may only fall. When they fall, re-baseline
// with `node validate-site.js --rebaseline-styles` and the ceiling drops with
// them — the debt can shrink and can never quietly grow back.
console.log('\n━━━ CHECK 10: Inline style= Attributes (ratchet) ━━━');
const BUDGET_PATH = path.join(ROOT, 'archive', 'inline-style-budget.json');
const countInlineStyles = (c) => {
  const s = c.indexOf('<article class="article-body">');
  if (s === -1) return null;
  let e = c.lastIndexOf('</article>');
  if (e < s) e = c.length;
  const body = c
    .slice(s, e)
    .replace(/<!-- RELATED-ARTICLES-START -->[\s\S]*?<!-- RELATED-ARTICLES-END -->/g, '');
  return (body.match(/\sstyle="/g) || []).length;
};
const current = {};
for (const f of fs.readdirSync(ROOT)) {
  if (!f.endsWith('.html') || IGNORE_FILES.has(f)) continue;
  const c = safeReadFileSync(path.join(ROOT, f));
  if (!c) continue;
  const n = countInlineStyles(c);
  if (n !== null && n > 0) current[f] = n;
}
if (process.argv.includes('--rebaseline-styles')) {
  fs.writeFileSync(BUDGET_PATH, JSON.stringify(current, null, 2) + '\n');
  ok(`re-baselined: ${Object.keys(current).length} pages, ${Object.values(current).reduce((a, b) => a + b, 0)} attributes`);
} else {
  let budget = {};
  try {
    budget = JSON.parse(fs.readFileSync(BUDGET_PATH, 'utf8'));
  } catch {
    budget = null;
  }
  if (!budget) {
    fs.writeFileSync(BUDGET_PATH, JSON.stringify(current, null, 2) + '\n');
    ok(`budget file created: ${Object.keys(current).length} pages, ${Object.values(current).reduce((a, b) => a + b, 0)} attributes`);
  } else {
    let over = 0;
    for (const [f, n] of Object.entries(current)) {
      const cap = budget[f] || 0;
      if (n > cap) {
        error(`${f} — ${n} inline style= attributes in the prose body, budget is ${cap}. Move the rules to /global.css.`);
        over++;
      }
    }
    const total = Object.values(current).reduce((a, b) => a + b, 0);
    const capTotal = Object.values(budget).reduce((a, b) => a + b, 0);
    if (over === 0) {
      ok(
        `no page over budget (${total} attributes across ${Object.keys(current).length} pages` +
          (total < capTotal ? `; down ${capTotal - total} — run --rebaseline-styles to lower the ceiling` : '') +
          ')'
      );
    }
  }
}

// ═══════════════════════════════════════
// CHECK 11: One link per concept, per page
// ═══════════════════════════════════════
// CLAUDE.md: "First mention of a concept gets the link."
//
// This was broken on 41% of the corpus before S193 and nothing caught it,
// because CHECK 1 only ever asked whether a link RESOLVES. Every one of the
// 5,047 duplicate anchors pointed at a real page. response-william-lane-craig
// linked /compare-calvinism-molinism 62 times; the reader saw blue stripes and
// the link stopped meaning anything.
//
// Card/navigation blocks are exempt: those are lists of links by design, and a
// repeat there is the point.
console.log('\n━━━ CHECK 11: One Prose Link Per Concept ━━━');
{
  const CARD_BLOCK = /<(?:div|nav|section|aside|footer)[^>]*class="[^"]*(?:related-articles|related-explore|cross-refs|continue-journey|keep-reading|article-continue|next-steps|further-reading|explore-more|read-next)[^"]*"[\s\S]*?<\/(?:div|nav|section|aside|footer)>/gi;
  const offenders = [];

  for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) {
    const html = fs.readFileSync(f, 'utf8');
    const open = html.indexOf('<article class="article-body"');
    if (open === -1) continue;
    const bodyEnd = html.lastIndexOf('</article>');
    if (bodyEnd === -1) continue;

    const body = html
      .slice(html.indexOf('>', open) + 1, bodyEnd)
      .replace(CARD_BLOCK, ' ');

    const counts = {};
    for (const m of body.matchAll(/<a\s+href="(\/[^"#]*)"/gi)) {
      const key = m[1].replace(/\/$/, '');
      counts[key] = (counts[key] || 0) + 1;
    }
    const dupes = Object.entries(counts).filter(([, n]) => n > 1);
    if (dupes.length) {
      dupes.sort((a, b) => b[1] - a[1]);
      offenders.push({ f, dupes });
    }
  }

  if (offenders.length) {
    console.log(`  ❌ ${offenders.length} page(s) link the same target more than once in prose:`);
    offenders.slice(0, 15).forEach(o =>
      console.log(`     ${o.f} — ${o.dupes.map(([u, n]) => `${u} x${n}`).join(', ')}`)
    );
    if (offenders.length > 15) console.log(`     …and ${offenders.length - 15} more`);
    console.log('     FIX: run `node dedupe-prose-links.js` (keeps the first mention, unwraps the rest).');
    errors++;
  } else {
    console.log('  ✅ Every concept linked once per page; first mention preserved');
  }
}

process.exit(errors > 0 ? 1 : 0);
