#!/usr/bin/env node
/**
 * detect-gospel-absence.js
 *
 * WHY THIS EXISTS (2026-07-28, S191)
 * ----------------------------------
 * Every scanner on this site was green — validate-site.js all-pass, zero
 * structural rot, zero broken links, canonical conformant — while 17 prose
 * pages argued divine sovereignty from beginning to end and never once named
 * the Savior. `analogy-river` spent 1,529 words proving determinism and closed
 * on "Flow where you were made to flow," which is the Tao Te Ching with a
 * Christian veneer. `demolition-hosea11-7-8` spent 2,922 words on "How can I
 * give you up, Ephraim?" and never reached the One who answered it.
 *
 * No detector could see this, because every detector measured FORM. This one
 * measures whether the page arrives anywhere.
 *
 * CLAUDE.md: "Somewhere tonight, someone chosen by God before the foundation
 * of the world is searching for what is true." A page that proves the decree
 * and withholds the Redeemer has handed that person fatalism.
 *
 * TRIAGE, NOT VERDICT. A low score is a lead. Judge it against the page's job:
 * a hub, a printable, or an index is allowed to be a directory. A prose
 * article is not allowed to be a doorway that opens onto nothing.
 *
 * Usage:
 *   node detect-gospel-absence.js              # full corpus, ranked
 *   node detect-gospel-absence.js <page>.html  # single page detail
 *   node detect-gospel-absence.js --zero       # only the zero-hit pages
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// The vocabulary. Deliberately generous on the PERSON and the WORK, and
// deliberately NOT counting bare "God" / "Lord" / "Father" / "he" — the whole
// point is that a page can say "God" four hundred times and still never arrive
// at the cross. Unitarian-safe words prove nothing here.
// ---------------------------------------------------------------------------
const GOSPEL = new RegExp(
  '\\b(' +
    [
      // the Person
      'jesus', "jesus'", 'christ', "christ's", 'messiah', 'immanuel',
      'son of god', 'son of man', 'the son',
      // the work
      'cross', 'crosses', 'crucified', 'crucify', 'crucifixion', 'calvary',
      'atone', 'atoned', 'atonement', 'propitiation', 'expiation',
      'redeem', 'redeemed', 'redeemer', 'redemption', 'ransom', 'ransomed',
      'substitute', 'substitution', 'substitutionary',
      'blood', 'wounds', 'pierced', 'crushed for',
      'resurrection', 'resurrected', 'risen', 'rose again', 'empty tomb',
      // the office / the announcement
      'savior', 'saviour', 'mediator', 'intercede', 'interceding',
      'intercession', 'high priest', 'lamb of god', 'the lamb',
      'gospel', 'incarnation', 'incarnate',
    ].join('|') +
  ')\\b',
  'gi'
);

// Pages whose job is not prose. A printable, a hub, a widget, a legal page,
// and a form are not doorways in the sense this detector polices.
const EXEMPT_EXACT = new Set([
  'privacy.html',
  'terms.html',
  'share-your-story.html',
  'contact.html',
  '404.html',
]);
const EXEMPT_PREFIX = ['printable-'];

const MIN_WORDS = 200; // below this it is a stub or a card, not an article

function isExempt(file) {
  if (EXEMPT_EXACT.has(file)) return true;
  return EXEMPT_PREFIX.some((p) => file.startsWith(p));
}

/** Pull the prose body only: inside <article class="article-body">, minus the
 *  baked related-articles block (whose cards mention Christ for free) and
 *  minus any continue-journey / banner furniture. */
function extractBody(html) {
  const start = html.indexOf('<article class="article-body">');
  if (start === -1) return null;
  let end = html.lastIndexOf('</article>');
  if (end < start) end = html.length;
  let body = html.slice(start, end);

  // strip the generated related-articles section
  const raStart = body.indexOf('<!-- RELATED-ARTICLES-START -->');
  if (raStart !== -1) {
    const raEnd = body.indexOf('<!-- RELATED-ARTICLES-END -->');
    body = raEnd !== -1
      ? body.slice(0, raStart) + body.slice(raEnd)
      : body.slice(0, raStart);
  }
  // fallback for pages using the class without the comment fences
  const raClass = body.indexOf('<section class="related-articles"');
  if (raClass !== -1) body = body.slice(0, raClass);

  return body;
}

function toText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scanFile(dir, file) {
  const html = fs.readFileSync(path.join(dir, file), 'utf8');
  const body = extractBody(html);
  if (body === null) return null; // not a prose article
  const text = toText(body);
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS) return null;

  const hits = text.match(GOSPEL) || [];
  const uniq = [...new Set(hits.map((h) => h.toLowerCase()))].sort();

  // Where does the first mention fall? A page that names Christ once in
  // paragraph two and never again has not landed in the catch.
  let firstAt = null;
  const m = GOSPEL.exec(text);
  GOSPEL.lastIndex = 0;
  if (m) firstAt = m.index / text.length;

  // The catch is the final 20% (VOICE.md I.4). Is Christ actually IN it?
  const tail = text.slice(Math.floor(text.length * 0.8));
  const tailHits = (tail.match(GOSPEL) || []).length;
  GOSPEL.lastIndex = 0;

  return {
    file,
    words,
    n: hits.length,
    per1k: (hits.length / words) * 1000,
    uniq,
    firstAt,
    tailHits,
  };
}

function main() {
  const dir = process.cwd();
  const args = process.argv.slice(2);
  const single = args.find((a) => a.endsWith('.html'));
  const zeroOnly = args.includes('--zero');

  const files = single
    ? [single]
    : fs.readdirSync(dir).filter((f) => f.endsWith('.html'));

  const rows = [];
  for (const f of files) {
    if (!single && isExempt(f)) continue;
    let r;
    try {
      r = scanFile(dir, f);
    } catch (e) {
      continue;
    }
    if (r) rows.push(r);
  }

  if (single) {
    const r = rows[0];
    if (!r) {
      console.log(`${single}: not a prose article (no article-body, or under ${MIN_WORDS} words).`);
      return;
    }
    console.log(`\n  ${r.file}`);
    console.log(`  words ................ ${r.words}`);
    console.log(`  gospel mentions ...... ${r.n}  (${r.per1k.toFixed(2)} per 1k words)`);
    console.log(`  vocabulary used ...... ${r.uniq.length ? r.uniq.join(', ') : '(none)'}`);
    console.log(`  first mention at ..... ${r.firstAt === null ? '(never)' : (r.firstAt * 100).toFixed(0) + '% through'}`);
    console.log(`  mentions in catch .... ${r.tailHits}  (final 20% — VOICE.md I.4)`);
    console.log('');
    if (r.n === 0) console.log('  VERDICT: ABSENT. This page never reaches the Savior.\n');
    else if (r.tailHits === 0) console.log('  VERDICT: NO LANDING. Christ appears, but not in the catch.\n');
    else if (r.n <= 2) console.log('  VERDICT: THIN. Inspect whether the mention is load-bearing or a token.\n');
    else console.log('  VERDICT: present.\n');
    return;
  }

  rows.sort((a, b) => a.per1k - b.per1k || b.words - a.words);

  const zero = rows.filter((r) => r.n === 0);
  const noLanding = rows.filter((r) => r.n > 0 && r.tailHits === 0);
  const thin = rows.filter((r) => r.n > 0 && r.n <= 2 && r.tailHits > 0);

  console.log('\n============================================================');
  console.log('  GOSPEL-ABSENCE SCAN — does the page arrive at the Savior?');
  console.log('============================================================\n');
  console.log(`  prose pages scanned .............. ${rows.length}`);
  console.log(`  ABSENT (zero mentions) .......... ${zero.length}`);
  console.log(`  NO LANDING (none in final 20%) .. ${noLanding.length}`);
  console.log(`  THIN (1-2 mentions total) ....... ${thin.length}\n`);

  if (zero.length) {
    console.log('  --- ABSENT: never names Christ, the cross, or the gospel ---');
    for (const r of zero) console.log(`    ${String(r.words).padStart(5)}w   ${r.file}`);
    console.log('');
  }
  if (zeroOnly) return;

  if (noLanding.length) {
    console.log('  --- NO LANDING: Christ appears, but never in the catch ---');
    for (const r of noLanding.slice(0, 40)) {
      const at = r.firstAt === null ? '--' : (r.firstAt * 100).toFixed(0) + '%';
      console.log(`    ${String(r.n).padStart(3)} hits  first@${at.padStart(4)}   ${r.file}`);
    }
    if (noLanding.length > 40) console.log(`    ... and ${noLanding.length - 40} more`);
    console.log('');
  }
  if (thin.length) {
    console.log('  --- THIN: 1-2 mentions; check whether load-bearing or token ---');
    for (const r of thin.slice(0, 40)) {
      console.log(`    ${String(r.n).padStart(3)} hits  ${String(r.words).padStart(5)}w   ${r.file}  [${r.uniq.join(',')}]`);
    }
    if (thin.length > 40) console.log(`    ... and ${thin.length - 40} more`);
    console.log('');
  }

  console.log('  TRIAGE, NOT VERDICT. A hub or directory is allowed to be a');
  console.log('  directory. A prose article is not allowed to prove the decree');
  console.log('  and withhold the Redeemer. Inspect: node detect-gospel-absence.js <page>.html\n');
}

main();
