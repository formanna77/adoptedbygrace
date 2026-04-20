#!/usr/bin/env node
/**
 * strip-legacy-breadcrumbs.js — Remove the legacy hardcoded
 * `<div class="breadcrumb">…</div>` blocks from every HTML page.
 *
 * Why: ux-enhancements.js already auto-injects a universal <nav class="ux-breadcrumbs">
 * on every article page. The old hand-coded <div class="breadcrumb"> blocks
 * duplicate that breadcrumb at a different size / position, producing visual
 * clutter, inconsistent rendering, and (on pages where the nested wrapper
 * structure is wrong) ~4rem-tall broken breadcrumbs eating the top of the page.
 *
 * Safe because: the universal breadcrumb derives the same hierarchy (Home ›
 * Category › Current Page) from the page's URL slug and h1 — and does it
 * consistently everywhere. The only thing the hand-coded version gives us
 * is a single "← Back to X" link, which is inferior: not consistent, doesn't
 * ladder to Home, doesn't emit JSON-LD for SEO.
 *
 * This script only removes the `.breadcrumb` div. It leaves `<main id="main-content">`
 * and page-hero nesting intact — those are handled separately.
 */
const fs = require('fs');
const path = require('path');

const ROOT = '/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite';

function walk(dir, out = []) {
    for (const entry of fs.readdirSync(dir)) {
        if (entry.startsWith('.')) continue;
        if (entry === 'node_modules' || entry === 'Reformed Sources') continue;
        const p = path.join(dir, entry);
        const st = fs.statSync(p);
        if (st.isDirectory()) walk(p, out);
        else if (entry.endsWith('.html')) out.push(p);
    }
    return out;
}

// Matches <div class="breadcrumb"> … </div> (possibly with extra attrs, multiline).
// We require the class to equal exactly "breadcrumb" (not "breadcrumb-something-else")
// to avoid clobbering unrelated classes.
const RE = /[ \t]*<div\s+class="breadcrumb"[^>]*>[\s\S]*?<\/div>[ \t]*\n?/g;

let changed = 0;
for (const file of walk(ROOT)) {
    const before = fs.readFileSync(file, 'utf8');
    if (!/<div\s+class="breadcrumb"/.test(before)) continue;
    const after = before.replace(RE, '');
    if (after !== before) {
        fs.writeFileSync(file, after);
        changed++;
        console.log('stripped:', path.relative(ROOT, file));
    }
}
console.log(`\n${changed} file(s) cleaned.`);
