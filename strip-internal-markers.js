#!/usr/bin/env node
/**
 * strip-internal-markers.js  —  S195
 *
 * WHY THIS EXISTS
 * ---------------
 * CHECK 7 asks whether an internal *file* is publicly served. It has never
 * looked *inside* a served file. Until S195, 618 pages shipped HTML comments
 * carrying the site's internal audit vocabulary into public view-source:
 *
 *     <!-- CONSECRATED S43-S58 BORN-APEX -->
 *     <!-- POLISH-LOCKED -->
 *     <!-- HAMMER-LOCKED -->
 *     <!-- CONSECRATED, S78 SAPIENTIAL LIFT (soul-cost angle + circular return) -->
 *
 * VOICE.md XXII.3: a reader who is thinking about the source is not weighing
 * the argument. Session numbers and lock labels in view-source are exactly
 * that intrusion — and they are also stale, since a "LOCKED" page has usually
 * been rewritten several times since the label was applied.
 *
 * SAFETY — read before editing the pattern
 * ----------------------------------------
 * 1. This is DENY-BY-NAME, not deny-by-default. It removes ONLY comments whose
 *    body matches the internal-audit vocabulary below. Structural comments the
 *    build scripts key on are load-bearing and must never be touched:
 *        <!-- RELATED-ARTICLES-START -->  /  <!-- RELATED-ARTICLES-END -->
 *    Ordinary developer comments (<!-- Footer -->, <!-- Project Lighthouse -->)
 *    are left alone: they reveal no internal process to a reader.
 *
 * 2. The comment body is matched with (?:(?!-->)[^])*? so the match CANNOT
 *    cross a comment boundary. The naive /<!--[^]*?MARKER[^]*?-->/ anchors on
 *    the EARLIEST <!-- in the file and swallows everything between — that bug
 *    ate a global.css link on 10 pages in S194. See CLAUDE.md, THE
 *    LITERAL-STRING TRAP.
 *
 * Idempotent: safe to re-run, inert on a clean corpus.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Internal-audit vocabulary. A comment is stripped only if its body matches.
const INTERNAL = /\b(CONSECRATED|POLISH-LOCKED|HAMMER-LOCKED|BORN-APEX|SAPIENTIAL|DIAMOND PASS|BUCKET [A-Z]\b|WIKIPEDIA-CARD|NEEDS-LIFT|S\d{2,3}\s*(?:§|LIFT|REBUILD|PASS|SWEEP))/i;

// Body cannot cross a comment boundary.
const COMMENT = /<!--((?:(?!-->)[^])*?)-->/g;

// Never remove these, whatever else the body says.
const LOAD_BEARING = /RELATED-ARTICLES-(?:START|END)/i;

function stripFile(file) {
  const before = fs.readFileSync(file, 'utf8');
  let removed = 0;

  let after = before.replace(COMMENT, (whole, body) => {
    if (LOAD_BEARING.test(body)) return whole;
    if (!INTERNAL.test(body)) return whole;
    removed++;
    return '';
  });

  if (!removed) return 0;

  // Clean up the blank lines the removal leaves behind, without touching
  // indentation anywhere else in the file.
  after = after.replace(/^[ \t]*\r?\n(?=[ \t]*\r?\n)/gm, '');

  fs.writeFileSync(file, after, 'utf8');
  return removed;
}

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let touched = 0, total = 0;

for (const f of files) {
  const n = stripFile(path.join(ROOT, f));
  if (n) { touched++; total += n; }
}

console.log(`strip-internal-markers: ${total} internal comment(s) removed from ${touched} page(s) (of ${files.length} scanned).`);
if (!total) console.log('  Corpus clean — nothing to strip.');
