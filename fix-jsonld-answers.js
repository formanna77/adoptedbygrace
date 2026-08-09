#!/usr/bin/env node
/**
 * fix-jsonld-answers.js — repair the FAQPage answers the site ships to crawlers.
 *
 * WHY THIS EXISTS (S199). 168 pages ship FAQPage structured data — 440 answers —
 * and until now nothing had ever READ one. CHECK 18 (added S198-PRE) proved the
 * JSON *parses*; it never asked whether the sentences inside it were sentences.
 * They were not:
 *
 *   1. TRUNCATED MID-WORD. 22 answers across 11 pages were cut at a hard ~798
 *      character cap with an ellipsis pasted on the end, mid-word. Google renders
 *      the FAQ answer verbatim in the rich result, so `question-chosen` was
 *      telling searchers "Which means faith is a gif…". The JSON is flawless.
 *      The English is not.
 *
 *   2. SCRAPE ARTIFACTS. 92 whitespace defects across 23 pages — `spiritually
 *      dead .`, `( Ephesians 2:1 )`, `they cannot choose to believe .` — the
 *      fingerprint of an inline tag (<em>, <a>) stripped without rejoining the
 *      text around it. Exactly the artifact class S198 found inside
 *      scripture-niv.js, one layer out: the file was fine, the recipient's copy
 *      was not.
 *
 * THE REPAIR RULE, and it is deliberately narrow so it can be checked afterward:
 *   - Truncated answer  -> cut back to the last COMPLETE sentence, drop the
 *     ellipsis. Nothing is authored. Nothing is summarised. The answer only ever
 *     gets shorter, and it always ends where its own writer put a full stop.
 *   - Artifact          -> pure whitespace normalisation. No word is added,
 *     removed, or reordered; the script asserts this before writing.
 *
 * It edits the RAW JSON string in place rather than re-serialising the block, so
 * formatting, key order and every untouched byte survive. Every modified block is
 * re-parsed before the file is written; if a block would not parse, the file is
 * skipped whole and reported.
 *
 * Idempotent. Inert on a clean corpus. `--dry-run` reports and writes nothing.
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const ROOT = __dirname;

// ---------------------------------------------------------------- repair rules

/** Trailing ellipsis = the ~798ch cap. Cut back to the last complete sentence. */
function repairTruncation(text) {
  if (!/…\s*$/.test(text)) return null;
  const body = text.replace(/\s*…\s*$/, '');
  // Last sentence-ending punctuation followed by a space, or at the very end.
  // Guard against abbreviations by requiring the next char to be an uppercase
  // letter or quote when mid-string — but simplest reliable signal here is the
  // last ". " / "! " / "? " and any trailing close-quote/paren that belongs to it.
  let best = -1;
  for (const m of body.matchAll(/[.!?]["'’”)\]]*(?=\s)/g)) {
    best = m.index + m[0].length;
  }
  if (best <= 0) return null;               // no sentence boundary — leave alone
  const kept = body.slice(0, best).trim();
  if (kept.length < 80) return null;        // would gut the answer — leave alone
  return kept;
}

/** Whitespace-only normalisation of inline-tag-strip artifacts. */
function repairArtifacts(text) {
  const out = text
    .replace(/\s+([.,;:!?])/g, '$1')        // `dead .`      -> `dead.`
    .replace(/\(\s+/g, '(')                 // `( Ephesians` -> `(Ephesians`
    .replace(/\s+\)/g, ')')                 // `2:1 )`       -> `2:1)`
    .replace(/\s{2,}/g, ' ')
    .trim();
  return out === text ? null : out;
}

/** Safety net: the artifact pass may only move whitespace, never words. */
function sameWords(a, b) {
  const w = s => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(/\s+/).join('');
  return w(a) === w(b);
}

// ---------------------------------------------------------------------- driver

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let filesChanged = 0, truncFixed = 0, artFixed = 0, skipped = [];
const log = [];

for (const file of files) {
  const original = fs.readFileSync(path.join(ROOT, file), 'utf8');
  let html = original;
  let pageTrunc = 0, pageArt = 0, bad = false;

  const blocks = [...original.matchAll(
    /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g
  )];

  for (const block of blocks) {
    const raw = block[1];
    let parsed;
    try { parsed = JSON.parse(raw); } catch { continue; }  // CHECK 18 owns invalid JSON

    // collect every FAQ answer string in this block
    const answers = [];
    (function walk(node) {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node && typeof node === 'object') {
        if (node['@type'] === 'Question' &&
            node.acceptedAnswer && typeof node.acceptedAnswer.text === 'string') {
          answers.push(node.acceptedAnswer.text);
        }
        Object.values(node).forEach(walk);
      }
    })(parsed);

    let newRaw = raw;
    for (const before of answers) {
      let after = before;

      const untruncated = repairTruncation(after);
      if (untruncated !== null) { after = untruncated; pageTrunc++; }

      const cleaned = repairArtifacts(after);
      if (cleaned !== null) {
        if (!sameWords(after, cleaned)) {
          skipped.push(`${file}: artifact pass would alter words — refused`);
          continue;
        }
        after = cleaned; pageArt++;
      }

      if (after === before) continue;

      // Replace inside the RAW json text, preserving all surrounding formatting.
      const needle = JSON.stringify(before).slice(1, -1);
      const repl   = JSON.stringify(after).slice(1, -1);
      if (!newRaw.includes(needle)) {
        skipped.push(`${file}: could not locate answer string in raw JSON — refused`);
        bad = true; continue;
      }
      newRaw = newRaw.replace(needle, repl);
      log.push(`  ${file}\n      - ${before.slice(-72)}\n      + ${after.slice(-72)}`);
    }

    if (newRaw === raw) continue;

    // Never ship a block we just broke.
    try { JSON.parse(newRaw); } catch (e) {
      skipped.push(`${file}: repaired block no longer parses (${e.message}) — file skipped`);
      bad = true; break;
    }
    html = html.replace(raw, newRaw);
  }

  if (bad || html === original) continue;
  filesChanged++; truncFixed += pageTrunc; artFixed += pageArt;
  if (!DRY) fs.writeFileSync(path.join(ROOT, file), html);
}

console.log(`\n  JSON-LD ANSWER REPAIR${DRY ? ' — DRY RUN, nothing written' : ''}\n`);
if (log.length) console.log(log.join('\n'));
console.log(`\n  files changed        ${filesChanged}`);
console.log(`  truncations repaired ${truncFixed}`);
console.log(`  artifacts repaired   ${artFixed}`);
if (skipped.length) {
  console.log(`\n  REFUSED (${skipped.length}):`);
  skipped.forEach(s => console.log('   ! ' + s));
}
console.log(filesChanged ? '' : '\n  Corpus clean — nothing to do.\n');
