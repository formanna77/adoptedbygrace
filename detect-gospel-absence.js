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
      // S209 — THE TITLES. A fourth failure mode, and not a boundary this time
      // but a VOCABULARY gap: `apologetic-you-did-not-choose-me` closes on "a
      // hand it could not see had planted it in the living Vine … His hand
      // closed first," which is Christ named by the title He chose for Himself
      // in John 15, and the detector reported the page as never reaching the
      // Savior. Only titles that are unambiguously His are listed — 'the rock'
      // and a bare 'the shepherd' are not here, because Scripture gives both to
      // the Father as well, and a triage detector may miss a real absence far
      // more cheaply than it may clear a page that has one.
      'the true vine', 'the living vine', 'the vine',
      'good shepherd', 'the bridegroom', 'bread of life',
      'the word made flesh', 'the second adam', 'the last adam',
      'firstborn from the dead', 'the lord jesus', 'emmanuel',
      'man of sorrows', 'the advocate', 'the cornerstone',
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

/** Pull the prose body only. THE IMPLEMENTATION MOVED to archive/prose-body.js
 *  in S210 — four consumers were each carrying their own copy of the same
 *  prose/furniture boundary rules and drifting apart. See that file's header. */
const { extractBody } = require('./archive/prose-body.js');

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
    tail,
  };
}

function main() {
  const dir = process.cwd();
  const args = process.argv.slice(2);
  const single = args.find((a) => a.endsWith('.html'));
  const zeroOnly = args.includes('--zero');
  // --queue: the whole NO LANDING queue, word count DESCENDING, nothing truncated.
  // The kickoffs have asked every session since S190 to "work by word count
  // descending"; the default report sorts by mentions-per-1k and cuts at 40, so
  // that instruction could not actually be followed without this.
  const queue = args.includes('--queue');
  const closes = args.some((a) => a === '--closes' || a.startsWith('--closes='));

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
    // S191's law: a detector that measures the wrong SPAN cannot see anything
    // at all. So print the span. Never trust the verdict without reading it.
    console.log('  --- THE MEASURED CATCH (final 20% of prose, furniture excised) ---\n');
    console.log('  ' + r.tail.replace(/(.{92}\s)/g, '$1\n  ').trim() + '\n');
    console.log('  ------------------------------------------------------------------\n');
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

  if (queue) {
    const q = [...noLanding].sort((a, b) => b.words - a.words);
    console.log(`\n  NO LANDING QUEUE — ${q.length} pages, word count descending\n`);
    for (const r of q) {
      const at = r.firstAt === null ? '--' : (r.firstAt * 100).toFixed(0) + '%';
      console.log(
        `  ${String(r.words).padStart(5)}w  ${String(r.n).padStart(2)} hits  first@${at.padStart(4)}  ${r.file}`
      );
    }
    console.log('');
    return;
  }

  // --closes: the LAST WORDS of every page on the queue, so the whole thing can
  // actually be hand-read. The queue is triage, never verdict — most of these
  // pages land on a Person by pronoun and are not defective at all — and the
  // only way to tell a pronoun-landing from a proposition-landing is to read the
  // sentence. This prints the sentence.
  if (closes) {
    const n = Number((args.find((a) => a.startsWith('--closes=')) || '').split('=')[1]) || 45;
    const q = [...noLanding].sort((a, b) => b.words - a.words);
    for (const r of q) {
      const w = r.tail.split(/\s+/).filter(Boolean);
      console.log(`\n${r.file}  (${r.words}w, ${r.n} hits)`);
      console.log('  … ' + w.slice(-n).join(' '));
    }
    console.log('');
    return;
  }

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

  // S203: machine output for archive/session-brief.js. The human report
  // truncates its roster at 40 rows, so anything parsing stdout silently
  // sees 40 of 127 and looks like it worked. Routers read this, not that.
  if (args.includes('--json')) {
    console.log(JSON.stringify({
      absent: zero.map(r => r.file),
      noLanding: noLanding.map(r => r.file),
      thin: thin.map(r => r.file),
    }));
    return;
  }

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
