#!/usr/bin/env node
/**
 * inject-reading-time.js
 *
 * Batch-inject <script defer src="/reading-time.js"></script> into every
 * HTML page that doesn't already have it.
 *
 * The reading-time.js script is self-gating — it only renders the badge on
 * pages with a real .article-body, so it's safe to add to every page.
 *
 * Idempotent — running twice does nothing on the second run.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const TAG = '<script defer src="/reading-time.js"></script>';

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

        if (html.includes('reading-time.js')) {
            skipped++;
            continue;
        }

        // Insert before </body>. If </body> is missing we skip gracefully.
        const bodyCloseIdx = html.lastIndexOf('</body>');
        if (bodyCloseIdx === -1) {
            skipped++;
            continue;
        }

        const before = html.slice(0, bodyCloseIdx);
        const after = html.slice(bodyCloseIdx);
        // Insert with a newline + indentation matching existing script tags.
        const newHtml = before + '    ' + TAG + '\n' + after;
        fs.writeFileSync(fullPath, newHtml);
        modified++;
    }

    console.log('─'.repeat(60));
    console.log('READING-TIME INJECTION');
    console.log('─'.repeat(60));
    console.log(`Scanned:  ${files.length} pages`);
    console.log(`Modified: ${modified}`);
    console.log(`Skipped:  ${skipped} (already had tag or missing </body>)`);
    console.log('─'.repeat(60));
}

main();
