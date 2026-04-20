#!/usr/bin/env node
/**
 * audit-two-arms.js
 *
 * Enforces the Two Arms architecture mandated in CLAUDE.md:
 *   Demolition without devotion = despair
 *   Devotion without demolition = complacency
 *   Demolition + devotion       = transformation
 *
 * For every page whose filename begins with a "demolition arm" prefix
 * (demolition-, question-, objection-, philosophy-, psychology-,
 *  secular-, systematic-hamartiology, demolition of an argument),
 * this script checks that the page links to at least ONE catch-arm page
 * in its final 25% of body content.
 *
 * Catch-arm pages are: devotional-*, pastoral-*, anxious-*, broken-mirror-*,
 * open-wound-*, invisible-wall-*, shattered-lens-*, or the devotionals hub.
 *
 * Pages that fail the audit are printed with an actionable suggestion.
 *
 * Non-zero exit code indicates failed pages exist.
 *
 * Run:  node audit-two-arms.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const REPORT_PATH = path.join(SITE_DIR, 'TWO-ARMS-AUDIT.md');

// Pages that tear down (left arm) — every one must catch (right arm)
const DEMOLITION_PREFIXES = [
  'demolition-',
  'question-',
  'objection-',
  'philosophy-',
  'psychology-',
  'secular-',
];

// Catch-arm (right arm) — any of these counts as a valid catch
const CATCH_PATTERNS = [
  /href="\/devotional-/i,
  /href="\/devotionals(\.html)?"/i,
  /href="\/pastoral-/i,
  /href="\/anxious-mind-/i,
  /href="\/broken-mirror-/i,
  /href="\/open-wound-/i,
  /href="\/invisible-wall-/i,
  /href="\/shattered-lens-/i,
  /href="\/pastoral-hub(\.html)?"/i,
];

// Exempt pages (hubs, catch-arm pages themselves, system pages, internal tools)
const EXEMPT = new Set([
  'demolition-hub.html',
  'psychology-hub.html',
  'philosophy-hub.html',
  'questions.html',
  'secular-evidence.html',
  'pastoral-hub.html',
]);

function walk(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .filter(f => !f.startsWith('_'));
}

function getArticleBody(html) {
  // Read the entire post-header, pre-footer content zone.
  // The "catch arm" legitimately includes post-article navigation sections
  // ("Continue the Journey", "Related Articles"), so scanning only inside
  // <article>...</article> produces false negatives. The rule we enforce is:
  // "does the reader encounter a catch before reaching the footer?"
  //
  // Nested <header> tags are common (page header + hero subhead), so we must
  // take everything AFTER the first </header> — all segments joined — then
  // clip at <footer>.
  const headerParts = html.split(/<\/header>/i);
  const afterHeader = headerParts.length > 1
    ? headerParts.slice(1).join('</header>')
    : html;
  const beforeFooter = afterHeader.split(/<footer/i)[0] || afterHeader;
  return beforeFooter;
}

function isDemolitionPage(filename) {
  if (EXEMPT.has(filename)) return false;
  return DEMOLITION_PREFIXES.some(prefix => filename.startsWith(prefix));
}

function hasCatchLink(body) {
  return CATCH_PATTERNS.some(pat => pat.test(body));
}

function catchLinksInFinalQuarter(body) {
  const cutoff = Math.floor(body.length * 0.75);
  const tail = body.slice(cutoff);
  return CATCH_PATTERNS.some(pat => pat.test(tail));
}

function countCatchLinks(body) {
  let n = 0;
  for (const pat of CATCH_PATTERNS) {
    const m = body.match(new RegExp(pat.source, 'gi'));
    if (m) n += m.length;
  }
  return n;
}

function main() {
  const files = walk(SITE_DIR);
  const pages = files.filter(isDemolitionPage);

  const failures = [];        // no catch link anywhere
  const weak = [];            // has catch link somewhere but not in final 25%
  const passing = [];

  for (const file of pages) {
    const fullPath = path.join(SITE_DIR, file);
    let html;
    try { html = fs.readFileSync(fullPath, 'utf8'); }
    catch { continue; }

    const body = getArticleBody(html);
    const hasAny = hasCatchLink(body);
    const hasLate = catchLinksInFinalQuarter(body);
    const count = countCatchLinks(body);

    if (!hasAny) {
      failures.push({ file, count });
    } else if (!hasLate) {
      weak.push({ file, count });
    } else {
      passing.push({ file, count });
    }
  }

  const total = pages.length;
  const lines = [];
  lines.push('# Two Arms Audit');
  lines.push('');
  lines.push(`_Generated: ${new Date().toISOString().slice(0,10)}_`);
  lines.push('');
  lines.push('> *"Demolition without devotion = despair. Devotion without demolition = complacency. Demolition + devotion = transformation."* — CLAUDE.md');
  lines.push('');
  lines.push(`**Demolition-arm pages scanned:** ${total}`);
  lines.push(`**Passing (catch in final 25%):** ${passing.length}`);
  lines.push(`**Weak (catch link present but not in final 25%):** ${weak.length}`);
  lines.push(`**Failing (no catch link at all):** ${failures.length}`);
  lines.push('');

  if (failures.length) {
    lines.push('## Failing pages — no catch-arm link anywhere');
    lines.push('');
    lines.push('These pages tear down without catching. Priority fix: add at least one devotional link in the final section.');
    lines.push('');
    for (const f of failures) {
      lines.push(`- \`${f.file}\` — 0 catch links`);
    }
    lines.push('');
  }

  if (weak.length) {
    lines.push('## Weak pages — catch link present but not in final quarter');
    lines.push('');
    lines.push('These pages have a catch link somewhere, but not where the reader lands after the collapse. Move a devotional link to the closing section.');
    lines.push('');
    for (const w of weak) {
      lines.push(`- \`${w.file}\` — ${w.count} catch link(s), none in final 25%`);
    }
    lines.push('');
  }

  if (!failures.length && !weak.length) {
    lines.push('## Status: GREEN');
    lines.push('');
    lines.push('Every demolition-arm page ends with a catch. Every wound has a balm. Soli Deo Gloria.');
    lines.push('');
  }

  fs.writeFileSync(REPORT_PATH, lines.join('\n'));

  // Console output
  console.log('─'.repeat(60));
  console.log('TWO ARMS AUDIT');
  console.log('─'.repeat(60));
  console.log(`Scanned:  ${total} demolition-arm pages`);
  console.log(`Passing:  ${passing.length}`);
  console.log(`Weak:     ${weak.length}`);
  console.log(`Failing:  ${failures.length}`);
  console.log('─'.repeat(60));
  if (failures.length) {
    console.log(`\nFAILING PAGES (no catch link at all) — first 20:`);
    failures.slice(0, 20).forEach(f => console.log(`  ✗  ${f.file}`));
    if (failures.length > 20) console.log(`  ... and ${failures.length - 20} more. See TWO-ARMS-AUDIT.md`);
  }
  if (weak.length) {
    console.log(`\nWEAK PAGES (catch link not in final 25%) — first 10:`);
    weak.slice(0, 10).forEach(w => console.log(`  ~  ${w.file}  (${w.count} catch link(s))`));
    if (weak.length > 10) console.log(`  ... and ${weak.length - 10} more. See TWO-ARMS-AUDIT.md`);
  }
  console.log(`\nFull report: TWO-ARMS-AUDIT.md`);

  process.exit(failures.length > 0 ? 1 : 0);
}

main();
