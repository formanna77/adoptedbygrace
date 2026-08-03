#!/usr/bin/env node
/**
 * fix-stray-progress-bar.js — S196. Idempotent; inert on a clean corpus.
 *
 * THE DEFECT, MEASURED IN A BROWSER (CLAUDE.md PRESENTATION INTEGRITY law 5).
 *
 * 104 pages carried a bare `<div class="progress-bar"></div>` as a direct child
 * of <body>, between the skip-link and the nav. It looks like a reading-progress
 * bar. It is not one.
 *
 *   - The site's real reading bar is `.reading-progress` (global.css 1216/2642),
 *     `position: fixed`, 2px, driven by an inline scroll listener.
 *   - `.progress-bar` (global.css 2612) is the QUIZ / STATISTICS track:
 *     `background: rgba(212,162,84,0.08); height: 8px; margin: 0.8rem 0;`
 *     and crucially NO `position`.
 *
 * So it rendered in normal document flow. Measured at 1196px on
 * reformed-apologetics-moral-argument.html: **1196 x 8px, top=63** — a full-width
 * empty gold-tinted band wedged between the fixed nav and the hero, permanently
 * at 0% because nothing on the page drives it, on the first screen the reader
 * ever sees.
 *
 * Fifteen static checks passed on all 104 pages. The HTML is valid; the class
 * exists; the CSS rule exists. The defect lives in the gap between the class the
 * markup asked for and the rule that class actually resolves to — which is
 * precisely the category law 5 was written for, and precisely what no grep finds.
 *
 * These are removed, not repointed: the 106 pages that want a reading bar
 * already have `.reading-progress` plus its scroll listener, and a page's second
 * progress indicator is not a missing feature.
 *
 * ONLY the empty form is touched. The 9 pages using `.progress-bar` with real
 * content inside it (quiz and statistics tracks — its actual purpose) are left
 * exactly as they are.
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const ROOT = __dirname;

// The empty form only. A .progress-bar with children is a real quiz track.
const STRAY = /[ \t]*<div class="progress-bar"><\/div>\n?/g;

let touched = 0, removed = 0;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

for (const f of files) {
  const p = path.join(ROOT, f);
  const html = fs.readFileSync(p, 'utf8');
  const hits = html.match(STRAY);
  if (!hits) continue;
  const out = html.replace(STRAY, '');
  touched++; removed += hits.length;
  if (!DRY) fs.writeFileSync(p, out);
  console.log(`  ${f}  (-${hits.length})`);
}

console.log(`\n${DRY ? '[dry run] ' : ''}stray .progress-bar: ${removed} element(s) removed from ${touched} page(s).`);
if (touched === 0) console.log('Corpus clean — nothing to do.');
