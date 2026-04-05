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
    'stories.html': ['story-'],
    'devotionals.html': ['devotional-'],
    'analogies-illustrations.html': ['analogy-'],
    'secular-evidence.html': ['secular-'],
    'systematic-theology.html': ['systematic-'],
    'theologians.html': ['theologian-'],
    'history-timeline.html': ['history-'],
    'creeds-confessions.html': ['creed-'],
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
    ...UTILITY_PAGES, ...HUB_FILES, ...IGNORE_FILES,
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

process.exit(errors > 0 ? 1 : 0);
