#!/usr/bin/env node
/**
 * inject-quote-card-and-perf.js
 *
 * PROJECT LIGHTHOUSE — Pillar 4 + 5: AMPLIFY + PERFORM
 *
 * For every HTML page:
 *   1. Adds <script src="/quote-card.js" defer></script> just before
 *      </body> if not already present. This enables the highlight-to-share
 *      quote card mechanism site-wide.
 *   2. Adds Core Web Vitals preconnect/dns-prefetch hints in <head>
 *      to make the first paint faster on slow connections.
 *
 * Idempotent — safe to run repeatedly.
 */

const fs = require('fs');

const SKIP_FILES = new Set([
  '_nav-template.html',
]);

const PRECONNECT_BLOCK = `
    <!-- Project Lighthouse: Performance hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <!-- /Project Lighthouse Performance -->`;

const QUOTE_CARD_TAG = '<script src="/quote-card.js" defer></script>';

function inject(file) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Preconnects (idempotent: keyed on the comment marker)
  if (!html.includes('Project Lighthouse: Performance hints')) {
    if (/<\/head>/i.test(html)) {
      html = html.replace(/<\/head>/i, PRECONNECT_BLOCK + '\n</head>');
      changed = true;
    }
  }

  // 2. Quote-card script (idempotent: keyed on the script src)
  if (!html.includes('quote-card.js')) {
    if (/<\/body>/i.test(html)) {
      html = html.replace(/<\/body>/i, '    ' + QUOTE_CARD_TAG + '\n</body>');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, html);
  }
  return changed;
}

function main() {
  const files = fs
    .readdirSync('.')
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !SKIP_FILES.has(f));

  let updated = 0;
  let skipped = 0;
  for (const f of files) {
    try {
      if (inject(f)) updated++;
      else skipped++;
    } catch (err) {
      console.error(`  ✗ ${f} — ${err.message}`);
    }
  }
  console.log(`✓ Lighthouse Pillars 4+5: ${updated} pages updated, ${skipped} already current (${files.length} total)`);
}

if (require.main === module) {
  main();
}

module.exports = { inject };
