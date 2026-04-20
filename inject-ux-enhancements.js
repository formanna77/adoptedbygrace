#!/usr/bin/env node
/**
 * inject-ux-enhancements.js
 *
 * Adds <script src="/ux-enhancements.js" defer></script> to every HTML page
 * immediately after the nav.js include (or failing that, before </body>).
 * Silent and idempotent — safe to run repeatedly.
 *
 * Ships: scroll-progress, breadcrumbs, auto-TOC, healing-series next/prev,
 * skip-to-content link. CSS lives in global.css under "UX ENHANCEMENTS".
 */

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const TAG       = '<script src="/ux-enhancements.js" defer></script>';
const MARKER    = 'ux-enhancements.js';
const NAV_TAG_R = /<script\s+src=["']\/?nav\.js["'][^>]*><\/script>/i;

const IGNORE = new Set(['_nav-template.html']);

function main() {
    const files = fs.readdirSync(ROOT).filter(f =>
        f.endsWith('.html') &&
        !f.startsWith('_') &&
        !IGNORE.has(f)
    );

    let added = 0, skipped = 0, noBody = 0;

    for (const f of files) {
        const p = path.join(ROOT, f);
        let html = fs.readFileSync(p, 'utf8');

        if (html.includes(MARKER)) { skipped++; continue; }

        const navMatch = html.match(NAV_TAG_R);
        if (navMatch) {
            // Insert right after the nav.js script tag, matching its indentation
            const idx = navMatch.index + navMatch[0].length;
            // Preserve leading whitespace on the line
            const lineStart = html.lastIndexOf('\n', navMatch.index) + 1;
            const indent = html.slice(lineStart, navMatch.index);
            html = html.slice(0, idx) + '\n' + indent + TAG + html.slice(idx);
        } else {
            const bodyClose = html.lastIndexOf('</body>');
            if (bodyClose < 0) { noBody++; continue; }
            html = html.slice(0, bodyClose) + '    ' + TAG + '\n' + html.slice(bodyClose);
        }

        fs.writeFileSync(p, html);
        added++;
    }

    console.log(`✅ ux-enhancements.js wired into ${added} pages`);
    console.log(`   Already had it: ${skipped}`);
    if (noBody) console.log(`   No </body> (skipped): ${noBody}`);
}

main();
