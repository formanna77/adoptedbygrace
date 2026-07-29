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

  // S191 CORRECTION — the terminal navigation furniture.
  //
  // The first cut of this detector stripped only the related-articles block and
  // then measured "the final 20%" of what was left. On 100+ pages what was left
  // still ended in a `keep-reading` / `article-continue-journey` /
  // `continue-journey-global` card grid occupying 25-30% of the body — so the
  // window the detector called "the catch" was, on those pages, ENTIRELY card
  // text. It was scoring the sitemap and reporting on the sermon. The prose
  // catch, which named Christ and landed correctly, sat above the cut line and
  // was never looked at.
  //
  // These blocks are always terminal inside <article class="article-body">, so
  // truncating at the earliest marker is safe and restores the measurement to
  // the thing being measured: the last fifth of the PROSE.
  // NOTE these blocks are NOT always terminal — `philosophy-sleep-surrender`
  // carries one between section 01 and section 02 — so they are EXCISED by
  // balanced-tag matching, never truncated to end of body. Truncating cost that
  // page 80% of its prose on the first attempt and would have reported a
  // 2,300-word article as a 453-word one.
  const FURNITURE = [
    'keep-reading',
    'article-continue-journey',
    'continue-journey-global',
    'journey-mini-card',
  ];
  const OPEN = /<(div|section|nav|aside)\b/gi;
  for (const cls of FURNITURE) {
    for (;;) {
      const hit = body.indexOf(`class="${cls}"`);
      if (hit === -1) break;
      const open = body.lastIndexOf('<', hit);
      const tag = (body.slice(open + 1).match(/^[a-z]+/i) || ['div'])[0];
      // walk forward counting same-name tags until the matching close
      const re = new RegExp(`</?${tag}\\b`, 'gi');
      re.lastIndex = open;
      let depth = 0, end = body.length;
      let m;
      while ((m = re.exec(body))) {
        if (m[0][1] === '/') {
          depth--;
          if (depth === 0) { end = m.index + m[0].length + 1; break; }
        } else depth++;
      }
      body = body.slice(0, open) + ' ' + body.slice(end);
    }
  }
  void OPEN;

  // Second pass: the furniture that carries NO distinguishing class. Roughly a
  // third of the corpus marks its navigation block with nothing but a heading
  // ("Keep Reading", "Continue Your Study", "Continue the Investigation"). On
  // `analogy-chess-grandmaster` and `compare-calvinism-molinism` that block is
  // the entire final 30% of the body, so the class-based pass above left them
  // still being scored on card text.
  //
  // Excised from the furniture heading to the NEXT non-furniture heading (or to
  // the end), never blindly to the end — same lesson as above.
  const FURNITURE_HEADING =
    /^(keep reading|keep exploring|continue (the|your) (journey|study|investigation|exploration|reading)|related reading|next steps?|where to (go|next)|explore (further|more)|go deeper|dig deeper)\b/i;
  const HEADING = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi;
  // S192 — a heading INSIDE a card is not a section boundary, it is the card's
  // own title, and treating it as one is why this pass was failing silently.
  // The excision runs from the furniture heading to the next NON-furniture
  // heading; the decks under "Keep Reading" mark each card with
  // `<h3 class="card-title">`, so the very first card ENDED the excision. On
  // `apologetic-unreached` and `psychology-sunk-cost-faith` that left the whole
  // deck standing and scored it as the catch. Decks whose cards happen to use
  // `<h4>` were excised correctly, which is the only reason this looked like it
  // worked at all.
  const CARD_HEADING = /class="[^"]*(card-title|hub-card|related-article|journey|keep-reading)/i;
  const spans = [];
  let hm;
  while ((hm = HEADING.exec(body))) {
    if (CARD_HEADING.test(hm[2])) continue;
    const label = hm[3].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();
    spans.push({ at: hm.index, end: HEADING.lastIndex, furniture: FURNITURE_HEADING.test(label) });
  }
  // S192 — and the excision must be BOUNDED, or this pass deletes the sermon.
  // `psychology-autonomy-illusion` closes with `<h2>Where to Go Next</h2>`, then
  // a paragraph of links, and THEN its actual catch. With no heading after the
  // furniture heading to stop at, this loop ran to end-of-body and cut the catch
  // out — so the detector reported the page as landing on "they are stacked, in
  // that order," a line that is not the page's ending at all. A furniture
  // heading is not a promise that everything below it is furniture. Where no
  // heading bounds the span, excise only the unbroken run of link-dominated
  // elements and stop at the first one that is real prose.
  const share = (s) => {
    const t = (x) => x.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    const tot = t(s).split(/\s+/).filter(Boolean).length;
    if (!tot) return 1;
    let inA = 0;
    const A = /<a\s[^>]*>([\s\S]*?)<\/a>/gi;
    let am;
    while ((am = A.exec(s))) inA += t(am[1]).split(/\s+/).filter(Boolean).length;
    return inA / tot;
  };
  for (let i = spans.length - 1; i >= 0; i--) {
    if (!spans[i].furniture) continue;
    let stop = null;
    for (let j = i + 1; j < spans.length; j++) {
      if (!spans[j].furniture) { stop = spans[j].at; break; }
    }
    if (stop === null) {
      // no bounding heading — walk the top-level elements and stop at prose
      const EL = /<(p|div|section|nav|aside|ul|ol|blockquote)\b[^>]*>/gi;
      EL.lastIndex = spans[i].end;
      stop = body.length;
      let em, cursor = spans[i].end;
      while ((em = EL.exec(body))) {
        const nextEl = EL.lastIndex;
        const chunk = body.slice(em.index, body.indexOf('>', nextEl - 1) === -1 ? body.length : nextEl);
        void chunk;
        // measure this element's whole subtree cheaply: to the next top-level open tag
        const probe = new RegExp(`<(p|div|section|nav|aside|ul|ol|blockquote)\\b`, 'gi');
        probe.lastIndex = nextEl;
        const pm = probe.exec(body);
        const segEnd = pm ? pm.index : body.length;
        if (share(body.slice(em.index, segEnd)) < 0.45) { stop = em.index; break; }
        cursor = segEnd;
      }
      if (stop === body.length) stop = Math.max(cursor, spans[i].end);
    }
    body = body.slice(0, spans[i].at) + ' ' + body.slice(stop);
  }

  // S192 CORRECTION — THE THIRD PASS, AND IT IS THE ONE THAT DOES NOT ROT.
  //
  // The two passes above are both ALLOWLISTS: a list of container classes and a
  // list of heading labels. An allowlist cannot see a name nobody put on it, and
  // the corpus keeps inventing names. `letters-senior-demon-arminianism` closes
  // with `<h2>Continue the Inversion</h2>` over a `class="related-grid"` card
  // deck — a label in neither list and a class in neither list — so 380 words of
  // pure card text were still being scored as that page's catch. Twenty-five
  // more pages close under `<h2>Keep Going</h2>`. This is S191's lesson one turn
  // further down: it is not enough to fix the span, the span has to be found by
  // something that cannot be outvoted by a writer picking a fresh heading.
  //
  // So: measure the block instead of recognizing its name. Walk every container
  // that opens in the body and ask what the text from there to the end is made
  // of. A card deck is text that lives almost entirely INSIDE its own anchors;
  // prose is not. Cut at the EARLIEST container whose suffix is three-plus links
  // and at least 45% anchor text — earliest, because that is the top of the deck
  // rather than somewhere in its middle.
  //
  // And one guard, which is the whole reason this is written as a suffix search
  // and not a heading search. `the-fork` closes with its catch — "You were found
  // before you were born," the Jeremiah 31:3 line — and THEN a six-card deck.
  // Anchored at the heading, or at the container one step too far back, the cut
  // takes the catch out with the cards and the page is scored as landing on
  // nothing. So a suffix containing any paragraph of 25-plus words that is not
  // inside an anchor is not furniture, however many cards follow it. That is the
  // difference between excising the sitemap and deleting the sermon.
  const txt = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  const wc = (s) => (txt(s) ? txt(s).split(/\s+/).length : 0);
  const CONTAINER = /<(div|section|nav|aside|ul)\b/gi;
  const cuts = [];
  let cm;
  while ((cm = CONTAINER.exec(body))) cuts.push(cm.index);
  for (const cut of cuts) {
    const seg = body.slice(cut);
    if ((seg.match(/<a\s[^>]*href=/gi) || []).length < 3) continue;
    const total = wc(seg);
    if (!total) continue;
    let inA = 0;
    const A = /<a\s[^>]*>([\s\S]*?)<\/a>/gi;
    let am;
    while ((am = A.exec(seg))) inA += wc(am[1]);
    if (inA / total < 0.45) continue;
    // the prose guard — never cut a paragraph the reader is meant to read
    const outside = seg.replace(/<a\s[^>]*>[\s\S]*?<\/a>/gi, ' ');
    const P = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
    let pm, prose = false;
    while ((pm = P.exec(outside))) if (wc(pm[1]) >= 25) { prose = true; break; }
    if (prose) continue;
    body = body.slice(0, cut);
    break;
  }

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
