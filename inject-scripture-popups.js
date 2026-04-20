#!/usr/bin/env node
/**
 * inject-scripture-popups.js
 *
 * Batch-inject the two scripts that power the site-wide Scripture hovercard
 * system into every HTML page that doesn't already have them:
 *
 *   <script defer src="/scripture-niv.js"></script>
 *   <script defer src="/scripture-popups.js"></script>
 *
 * Ordering matters: scripture-niv.js must load BEFORE scripture-popups.js
 * so window.SCRIPTURE_NIV is populated when the popup client boots.
 *
 * Both scripts are self-gating — scripture-popups.js only wraps references
 * inside .article-body/.card-description/legacy content wrappers, so it's
 * safe to include on every page (hubs, widgets, homepage included).
 *
 * Idempotent — running twice does nothing on the second run.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const TAG_NIV = '<script defer src="/scripture-niv.js"></script>';
const TAG_POPUPS = '<script defer src="/scripture-popups.js"></script>';

function main() {
    const files = fs.readdirSync(SITE_DIR)
        .filter(f => f.endsWith('.html'))
        .filter(f => !f.startsWith('_'));

    let modified = 0;
    let skipped = 0;

    for (const file of files) {
        const fullPath = path.join(SITE_DIR, file);
        let html;
        try { html = fs.readFileSync(fullPath, 'utf8'); }
        catch { continue; }

        const hasNiv = html.includes('scripture-niv.js');
        const hasPopups = html.includes('scripture-popups.js');

        // Already wired — skip.
        if (hasNiv && hasPopups) {
            skipped++;
            continue;
        }

        // Find the </body> tag for insertion.
        const bodyCloseIdx = html.lastIndexOf('</body>');
        if (bodyCloseIdx === -1) {
            skipped++;
            continue;
        }

        const before = html.slice(0, bodyCloseIdx);
        const after = html.slice(bodyCloseIdx);

        let insertion = '';
        if (!hasNiv)    insertion += '    ' + TAG_NIV + '\n';
        if (!hasPopups) insertion += '    ' + TAG_POPUPS + '\n';

        const newHtml = before + insertion + after;
        fs.writeFileSync(fullPath, newHtml);
        modified++;
    }

    console.log('─'.repeat(60));
    console.log('SCRIPTURE-POPUPS INJECTION');
    console.log('─'.repeat(60));
    console.log(`Scanned:  ${files.length} pages`);
    console.log(`Modified: ${modified}`);
    console.log(`Skipped:  ${skipped} (already wired or missing </body>)`);
    console.log('─'.repeat(60));
}

main();
