#!/usr/bin/env node
/**
 * archive/prose-body.js — THE ONE PLACE THE PROSE/FURNITURE BOUNDARY IS DECIDED.
 *
 * WHY THIS FILE EXISTS (S210)
 * ---------------------------
 * S206, S207 and S208 each added a missing container name to an allowlist.
 * S209 replaced that habit with three structural rules — the <a>-wraps-block
 * rule, the class-suffix rule, and the guarded furniture-heading rule — and
 * copied them into detect-gospel-absence.js and detect-multiplied-close.js.
 *
 * Copying was the bug one level up. S209's own kickoff said the same three
 * rules were still missing from TWO more consumers: make-factory-brief.js
 * (whose tail window on start-here-phase4 is 100% furniture, so the brief
 * contains no prose to anchor against and a correct agent refuses to write the
 * page — two sessions lost) and session-brief.js's freshness-ledger closer
 * column (whose top closer cadence corpus-wide is "Read" on 65 pages, the card
 * rail's "Read ->" label, and the site footer on four more).
 *
 * Four consumers, one boundary question, four implementations. So the rules
 * live here now and every consumer requires them. A fix applied to one copy
 * was never a fix; the answer is to stop having copies.
 *
 * extractBody(html) -> the article body with furniture excised, or null if the
 * file is not a prose article. ORDER INSIDE IS LOAD-BEARING: the <a>-wrapper
 * blanking MUST run last, after the balanced-tag excision it backs up.
 * Blanking an <a> that contains a <div> removes an opening tag whose closer
 * survives, the depth count goes negative, and the keep-reading rail stops
 * being excised. Measured on devotional-never-gives-up: the body GREW
 * 1786w -> 1821w and the "catch" window ended on card text. Do not reorder.
 */

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
    // S209 — added after the structural rule above, NOT instead of it. A list
    // is a second line of defence and nothing more; the day it is the only
    // defence is the day this bug comes back.
    'cross-links',
    'hub-grid',
    'phase-nav',
    'knowledge-check',
    'further-reading',
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

  // S209 — THE CORRELATIVE FIX, and note where it sits.
  //
  // Every detector that walks the article tail has shared one failure mode:
  // furniture is recognised by an ALLOWLIST of container names, so the day a
  // new component ships the detector silently starts scoring card text as
  // prose. S206 (nav + related cards), S207 (block tags welded to text), S208
  // (`cross-links`, never on the list, scored an eight-card rail as eight
  // hammer closes) were one bug wearing three coats.
  //
  // The rule below does not care what a component is called. An <a> that WRAPS
  // block-level elements is a link-card, never prose — no writer puts a <div>
  // or an <h3> inside a sentence. detect-multiplied-close.js has carried this
  // test since S177; this detector never had it.
  //
  // IT MUST RUN LAST, AND THAT IS NOT A STYLE PREFERENCE. The first S209 draft
  // put it immediately after the article slice, which broke the balanced-tag
  // walker above: blanking an <a> that contains a <div> removes an opening tag
  // whose closing tag survives, the depth count goes negative, and the
  // keep-reading rail stops being excised. Measured on devotional-never-gives-up
  // the body GREW 1786w -> 1821w and the "catch" window ended on the card text
  // "Sealed Forever — The Holy Spirit's guarantee of redemption." A fix that
  // runs before the excision it is meant to back up is not a second line of
  // defence; it is a hole in the first one.
  body = body.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (m) =>
    /<(div|section|article|h[1-6])\b/i.test(m) ? ' ' : m);

  // S209, second half of the same fix — THE SUFFIX RULE. The <a>-wrapper test
  // above catches link-cards. It does not catch a card GRID whose cells are not
  // links: `the-two-arms` renders a six-row left-arm/right-arm diagram as
  // <div class="pair-title"> / <div class="pair-desc"> / <div class="pair-arrow">,
  // no anchors at all, and that diagram IS the whole final 20% of its body. The
  // detector was reading "Left Arm · Demolition / The Fork / → THEN → / Right Arm
  // · Devotion" and reporting that the page never reaches the Savior.
  //
  // Keyed on the grammar of the class name, not on a registry of components:
  // every card part in this corpus is named <something>-title / -desc / -tag /
  // -label / -cat / -arrow / -eyebrow / -meta / -badge / -number / -read, and a
  // component shipped next month will be named the same way. `-body` and
  // `-verse` are deliberately excluded — fork-body and panel-body hold prose.
  // Same rule now lives in detect-multiplied-close.js; a fix applied to one
  // detector is not a fix.
  body = body.replace(
    /<(div|span|section|p|h[1-6])\b[^>]*class="[^"]*\b[a-z0-9]+-(?:title|desc|description|tag|label|cat|category|arrow|eyebrow|meta|badge|number|read)\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi,
    ' ');

  return body;
}

module.exports = { extractBody };
