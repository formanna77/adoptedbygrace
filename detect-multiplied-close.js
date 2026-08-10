#!/usr/bin/env node
/**
 * detect-multiplied-close.js — the CLOSE detector (S177)
 *
 * WHY THIS EXISTS
 * ---------------
 * The #1 scanner-invisible defect on this site is the DOUBLED / TRIPLED /
 * OCTUPLED CLOSE: a page lands its catch, then re-lands the identical beat
 * across a second catch + a stinger + a styled callout + a Circular Return.
 * The reader feels the machine and the spell breaks. `audit-prose.js` cannot
 * see it and every kickoff since S136 has said the live cold-read is the only
 * bar — which caps us at a few pages a session.
 *
 * It is not actually invisible. A multiplied close has measurable fingerprints
 * in the last quarter of the article: several TERMINAL BEATS in a row, where a
 * terminal beat is a short absolute paragraph, a bolded standalone stinger, a
 * doxology, or a styled callout. One or two is the prescribed shape
 * (catch + landing, optionally + hammer). Four or more is the defect.
 *
 * This ranks every prose page so the worst can be fixed first. It is a
 * TRIAGE tool, not a verdict — the fix is still a human collapse to ONE clean
 * catch + ONE tender landing (VOICE §I.4, §VIII). Verify-don't-blind-cut: a
 * second climax that is genuinely the page's destination is legitimate.
 *
 * USAGE
 *   node detect-multiplied-close.js              # ranked table, worst first
 *   node detect-multiplied-close.js --top 40     # worst 40 only
 *   node detect-multiplied-close.js page.html    # one page, with the beats shown
 */

const fs = require('fs');

const args = process.argv.slice(2);
const topIdx = args.indexOf('--top');
const TOP = topIdx !== -1 ? parseInt(args[topIdx + 1], 10) : Infinity;
const targets = args.filter((a, i) => !a.startsWith('--') && !(topIdx !== -1 && i === topIdx + 1));

const DOXOLOGY = /\bamen\b|be all glory|all glory (be|to)|to the father who|to the son who|to the spirit who|glory to him|forever and ever/i;
const ABSOLUTE_TAIL = /(He has you|He always did|He came anyway|You are out|So is He|It never was|never did|always was|and He did|He came|It is finished|You were held|He holds you)\.?"?$/i;

/**
 * Pull the article body, minus every trailing furniture block.
 *
 * S177 calibration note: this list must stay generous. Card decks, journey
 * mosaics and "go deeper" rails all render as short block elements, so any
 * that survive get scored as terminal beats and inflate a page that is
 * actually in the prescribed shape (systematic-salvation scored 12 on a clean
 * catch+prayer ending purely because its card rail was still in the window).
 * When adding a new trailing component anywhere on the site, add it here.
 */
const TRAILING_FURNITURE = [
  '<!-- RELATED-ARTICLES-START -->',
  '<section class="keep-reading"',
  '<section class="related-articles"',
  '<section class="continue-journey-global"',
  '<div class="continue-journey',
  '<div class="article-continue-journey-links"',
  '<div class="article-continue-journey"',   // S179: real class has no -links suffix
  '<div class="phase-nav"',
  '<div class="chain-cta"',
  '<div class="go-deeper',
  '<section class="go-deeper',
  '<div class="next-steps',
  '<h2 class="related-articles-heading"',
];
// NOTE: do NOT add bare-text markers like '<h2>Go Deeper' or '<a href="/start-here-phase'
// here. They occur mid-prose on some pages and truncate the body to nothing
// (found-you.html scored "0 blocks" that way during S177 calibration).
// Only structural CONTAINERS belong in this list.

function bodyOf(html) {
  const start = html.indexOf('<article class="article-body">');
  if (start < 0) return null;
  let end = html.length;
  for (const marker of TRAILING_FURNITURE) {
    const i = html.indexOf(marker, start);
    if (i > start && i < end) end = i;
  }
  return html.slice(start, end);
}

/**
 * Card / navigation furniture that is NOT prose. Any block carrying one of
 * these classes — or living inside a card <a> wrapper — is stripped before
 * analysis. Without this the detector scores related-article decks as a
 * twelve-beat close (the S177 calibration false positive).
 */
// S180: FOURTH false-positive class — INTERACTIVE-WIDGET CHROME. the-fork.html
// is a branching widget, not a linear prose page; it topped the queue at 9 on
// nothing but UI. Two of its five "beats" were <div class="fork-actions">
// button rails ("Back  Show me the catch") — those divs wrap only <button>/<a>,
// so the S179 container-div rule does not catch them, and the <a> is too short
// a fraction of the text for the link-only rule. Strip the chrome by class;
// the panel prose (fork-body <p>, fork-catch, fork-lede) is still scored on
// its own merits, so nothing real is lost.
const FURNITURE = /related-article|hub-card|card-title|card-desc|card-meta|card-number|card-footer|card-read|card-scripture|journey-mini|phase-nav|phase-next|browse-link|breadcrumb|nav-|footer-|search-|mega-menu|quiz-|knowledge-check|deep-dive-card|section-label|eyebrow|chain-node|chain-visual|chain-connector|chain-link|diagram-|timeline-|math-|eq-result|fork-actions|fork-btn|fork-progress|fork-stage|next-step/i;

/** Split the body into top-level block elements we care about. */
function blocks(body) {
  // Remove card link-wrappers entirely — everything inside them is furniture.
  // NOTE: many cards carry NO class, only inline `style="display: block…"`, so
  // the class list alone is not enough. The reliable tell is an <a> that WRAPS
  // block-level elements: a link containing <div>/<p>/<h*> is a card, never prose.
  // (S177 calibration: without this, analogy-chess-grandmaster scored 24 on a
  // deck of related-article cards.)
  const cleaned = body
    .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, m => /<(div|p|h[1-6])\b/i.test(m) ? ' ' : m)
    .replace(/<section\b[^>]*class="[^"]*(related-articles|keep-reading|continue-journey|further-reading)[^"]*"[\s\S]*?<\/section>/gi, ' ')
    // S179: the 'Go Deeper' / 'Explore Further' rail also ships as a <div>,
    // and its card blurbs are inline-styled <p>s that scored as 'callout'.
    // (This — not grid connectors — is why objection-why-believe scored 14.)
    .replace(/<div\b[^>]*class="[^"]*(further-reading|article-continue-journey)[^"]*"[\s\S]*?<\/div>/gi, ' ');

  const out = [];
  const re = /<(p|blockquote|div|h2|h3)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const tag = m[1].toLowerCase();
    const attrs = m[2] || '';
    const inner = m[3];
    if (FURNITURE.test(attrs)) continue;
    // S179 ROOT-CAUSE FIX. A <div> that WRAPS other block elements is a
    // container, not a prose block. The regex above is non-greedy and does not
    // track nesting, so a structural wrapper (<div class="chain-link-content">,
    // <div class="further-reading">) captures only up to its FIRST child's
    // </div>. Its text collapses to two or three words and scores as a
    // 'hammer'. This one bug produced ALL THREE known false-positive classes:
    // grid/diagram cells (the-golden-chain, the-two-arms), the baked
    // "Explore Further" / "Continue the Journey" rails (8 pages), and the
    // inflated top of the queue generally. Genuine prose children are matched
    // on their own pass, so no real beat is lost by skipping the wrapper.
    if (tag === 'div' && /<(div|section|p|h[1-6]|blockquote|ul|ol|table)\b/i.test(inner)) continue;
    // a block that is nothing but a link is navigation, not prose
    const stripped = inner.replace(/<[^>]*>/g, '').trim();
    const linkText = [...inner.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(x => x[1].replace(/<[^>]*>/g, '').trim()).join('');
    if (stripped && linkText && linkText.length >= stripped.length * 0.9) continue;
    const text = inner.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    if (!text) continue;
    out.push({ tag, attrs, inner, text, words: text.split(/\s+/).length });
  }
  return out;
}

/** Is this block a "terminal beat" — something that reads as an ending? */
function beatKind(b) {
  const cls = (b.attrs.match(/class\s*=\s*["']([^"']*)["']/i) || [, ''])[1];
  const styled = /style\s*=/.test(b.attrs) || /callout|pullquote|tldr|highlight|closing|final/i.test(cls);

  // a standalone bolded paragraph = the stinger
  const wholeBold = /^\s*<strong>[\s\S]*<\/strong>\s*$/i.test(b.inner.trim()) ||
                    /^\s*<em>\s*<strong>[\s\S]*<\/strong>\s*<\/em>\s*$/i.test(b.inner.trim());

  if (b.tag === 'h2' || b.tag === 'h3') return null;          // headings are structure, not beats
  if (b.tag === 'blockquote') return null;                     // a verse is not a close by itself

  if (DOXOLOGY.test(b.text)) return 'doxology';
  if (wholeBold && b.words <= 60) return 'stinger';
  if (styled && b.words <= 90) return 'callout';
  if (b.words <= 14) return 'hammer';                          // very short absolute line
  if (b.words <= 45 && ABSOLUTE_TAIL.test(b.text)) return 'hammer';
  if (b.words <= 55 && /^(And |So |But |That is |This is |Which is )/i.test(b.text) && /\.$/.test(b.text)) return 'soft-landing';
  return null;
}

function analyse(html) {
  const body = bodyOf(html);
  if (!body) return null;
  const bs = blocks(body);
  if (bs.length < 4) return null;

  // The close region is a FIXED window of the last 8 prose blocks, not a
  // percentage. A percentage window slides earlier every time you cut a beat,
  // so a page's score moved as you fixed it and never converged (S177).
  const tail = bs.slice(-8);

  const beats = [];
  tail.forEach((b, i) => {
    const k = beatKind(b);
    if (k) beats.push({ kind: k, i, text: b.text });
  });

  // consecutive-beat run at the very end is the strongest signal
  let trailingRun = 0;
  for (let i = tail.length - 1; i >= 0; i--) {
    if (beatKind(tail[i])) trailingRun++; else break;
  }

  // S180: does anything RE-OPEN after the Amen? A prayer is a terminal act;
  // a hammer, stinger or callout printed after it re-starts a page the reader
  // had already been released from. This is a genuine cross-page defect
  // (systematic-christology, devotional-cold-church, demolition-works-
  // righteousness, anxious-mind-the-loop-that-wont-break all carried it), and
  // unlike beat-count it is a positional fact, not a judgement call.
  // Only an ACTUAL prayer counts. The DOXOLOGY regex also fires on doxological
  // *prose* ("glory to Him", "forever and ever"), which is not a terminal act
  // and may legitimately be followed by a hammer — that over-fired on 30 pages
  // before this was tightened to a closing "Amen".
  const doxAt = beats.findIndex(b => b.kind === 'doxology' && /\bamen[.!?"'’”\s]*$/i.test(b.text));
  const afterAmen = doxAt !== -1 && doxAt < beats.length - 1;

  const kinds = new Set(beats.map(b => b.kind));
  let score = beats.length + trailingRun;
  // S180 FIFTH false-positive class: TWO beats is the PRESCRIBED shape
  // (one catch + one hammer), yet the doxology bonus alone pushed every such
  // page to 6 — which is what put ~10 apologetic-* pages in the queue on a
  // clean catch+stinger ending. The bonus exists to catch a doxology buried in
  // a STACK, so require an actual stack (3+) before paying it out.
  if (kinds.has('doxology') && kinds.size > 1 && beats.length >= 3) score += 2;
  if (kinds.has('stinger') && kinds.has('callout')) score += 1;
  // Weighted at 1, not 2, deliberately. One short line after a prayer can be a
  // legitimate shape — the prayer is the reader's, the last line is God's word
  // back over him. It becomes a defect when it is mechanical, when it merely
  // restates the prayer, or when it is part of a shared formula (the
  // "So we confess it, who once ___" close-machine, S180). The `!` flag is the
  // finding; the point is a hand-check, not an automatic cut.
  if (afterAmen) score += 1;

  return { beats, trailingRun, score, afterAmen, kinds: [...kinds], tailLen: tail.length };
}

// Legal/utility pages use the article-body wrapper but are not prose and must
// never appear in the close queue (S179: terms.html ranked in the worst 32).
const UTILITY_PAGES = new Set(['terms.html', 'privacy.html', '404.html']);

const files = targets.length ? targets : fs.readdirSync('.').filter(f => f.endsWith('.html')).sort();
const rows = [];

for (const f of files) {
  if (!targets.length && UTILITY_PAGES.has(f)) continue;
  let html;
  try { html = fs.readFileSync(f, 'utf8'); } catch { continue; }
  const a = analyse(html);
  if (!a) continue;
  rows.push({ f, ...a });
}

rows.sort((x, y) => y.score - x.score || y.beats.length - x.beats.length);

if (targets.length === 1 && rows.length === 1) {
  const r = rows[0];
  console.log(`\n${r.f}  —  score ${r.score}  (${r.beats.length} terminal beats, trailing run ${r.trailingRun})`);
  console.log(`kinds: ${r.kinds.join(', ')}`);
  if (r.afterAmen) console.log('*** RE-OPENS AFTER THE AMEN — a beat is printed past the prayer. Nothing may follow it. ***');
  console.log('');
  r.beats.forEach(b => console.log(`  [${b.kind.padEnd(12)}] ${b.text.slice(0, 140)}${b.text.length > 140 ? '…' : ''}\n`));
  console.log('PRESCRIBED SHAPE: one catch + one tender landing (+ optional 7-word hammer).');
  console.log('Fix is near-pure SUBTRACTION. Verify-don\'t-blind-cut: keep the beat that is the page\'s true destination.\n');
} else {
  const flagged = rows.filter(r => r.score >= 6);
  console.log(`\nscanned ${rows.length} prose pages`);
  console.log(`  score >=9  (severe — 4+ endings stacked) : ${rows.filter(r => r.score >= 9).length}`);
  console.log(`  score 6-8  (multiplied — needs a collapse): ${rows.filter(r => r.score >= 6 && r.score < 9).length}`);
  console.log(`  score <6   (prescribed shape or close to it): ${rows.filter(r => r.score < 6).length}\n`);
  console.log(`  of which RE-OPEN AFTER THE AMEN (marked !): ${rows.filter(r => r.afterAmen).length}\n`);
  // S203: machine output for archive/session-brief.js (see note in
  // detect-gospel-absence.js). The roster has an optional '!' column, which
  // is exactly the kind of thing a stdout regex gets wrong by two pages.
  if (process.argv.slice(2).includes('--json')) {
    console.log(JSON.stringify({ flagged: flagged.map(r => r.f) }));
    return;
  }
  console.log('WORST FIRST');
  console.log('score  beats  run  !  kinds                              page');
  for (const r of flagged.slice(0, TOP === Infinity ? flagged.length : TOP)) {
    console.log(
      String(r.score).padStart(5),
      String(r.beats.length).padStart(6),
      String(r.trailingRun).padStart(4),
      (r.afterAmen ? '!' : ' ').padStart(3), ' ',
      r.kinds.join(',').padEnd(34).slice(0, 34),
      r.f
    );
  }
  console.log('\nInspect one page:  node detect-multiplied-close.js <page>.html');
}
