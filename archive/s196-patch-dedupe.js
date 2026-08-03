// S196 one-shot patch for dedupe-prose-links.js — see the comments it installs.
const fs = require('fs');
const P = require('path').resolve(__dirname, '..', 'dedupe-prose-links.js');
let s = fs.readFileSync(P, 'utf8');
const NUL = String.fromCharCode(0);

const OLD_MASK_START = '// Blocks inside the article that are link-lists by design.';
const OLD_MASK_END = "explore-more|read-next)[^\"]*\"[\\s\\S]*?<\\/(?:div|nav|section|aside|footer)>/gi;";
const a = s.indexOf(OLD_MASK_START);
const b = s.indexOf(OLD_MASK_END);
if (a === -1 || b === -1) { console.error('MASK ANCHOR NOT FOUND'); process.exit(1); }

const NEW_MASK = `// Blocks inside the article that are link-lists by design.
//
// S196 — THIS MASK USED TO BE A REGEX, AND IT WAS EATING THE CORPUS.
//
// It was:
//   /<(?:div|nav|...)[^>]*class="[^"]*(?:keep-reading|...)[^"]*"[\\s\\S]*?<\\/(?:div|nav|...)>/gi
//
// The [\\s\\S]*? is NON-GREEDY, so the mask ended at the FIRST closing tag inside
// the deck — which is <div class="card-number">01</div>. Measured on
// devotional-you-were-wanted-before-you-were.html, the mask covered 185 bytes of
// a 1,582-byte keep-reading section. TWELVE PERCENT. Everything past card 01's
// number — cards 02 and 03 — was left fully exposed to the unwrapper below.
//
// So on any page whose deck pointed at a target the prose had already linked, the
// deck's own <a> wrapper was "de-duplicated": stripped, leaving the card's title
// and description sitting in the grid as unclickable text. A doorway rendered as
// a dead end, silently, every time the pipeline ran. CHECK 1 could never see it —
// it asks whether links RESOLVE, and there was no longer a link to resolve.
// 41 orphaned cards across 21 pages had accumulated by the time it was caught.
//
// Nested HTML is not a regular language and cannot be matched by a regex. The
// mask is now a real tag-balance walker.
const DECK_CLASS = /(related-articles|related-explore|cross-refs|continue-journey|keep-reading|article-continue|next-steps|further-reading|explore-more|read-next)/i;
const DECK_OPEN = /<(div|nav|section|aside|footer)([^>]*)>/gi;

function maskDecks(body, masked) {
  DECK_OPEN.lastIndex = 0;
  const spans = [];
  let m;
  while ((m = DECK_OPEN.exec(body))) {
    const [full, tag, attrs] = m;
    if (!DECK_CLASS.test(attrs)) continue;
    if (spans.length && m.index < spans[spans.length - 1][1]) continue; // nested in an already-masked deck
    // Walk forward counting this tag name until the opener is balanced.
    const scan = new RegExp('<(/?)' + tag + '\\\\b[^>]*>', 'gi');
    scan.lastIndex = m.index + full.length;
    let depth = 1, end = -1, t;
    while ((t = scan.exec(body))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) { end = t.index + t[0].length; break; }
    }
    if (end === -1) continue; // unbalanced markup: mask nothing rather than guess
    spans.push([m.index, end]);
  }
  // Replace right-to-left so the earlier offsets stay valid.
  for (let i = spans.length - 1; i >= 0; i--) {
    const [s0, e0] = spans[i];
    masked.push(body.slice(s0, e0));
    body = body.slice(0, s0) + SENTINEL + 'CARD' + (masked.length - 1) + SENTINEL + body.slice(e0);
  }
  return body;
}

// Belt and braces. Even if a deck someday uses a class outside DECK_CLASS, an
// anchor that WRAPS A CARD is never a duplicated prose link and must never be
// unwrapped. This second guard is what makes the failure above unrepeatable.
const IS_CARD_ANCHOR = /class="[^"]*(?:hub-card|card-)|<[^>]+class="[^"]*card-(?:number|title|description|read|footer|meta)/i;`;

s = s.slice(0, a) + NEW_MASK + s.slice(b + OLD_MASK_END.length);

// --- swap the masking call for the walker ---
const OLD_CALL = '  const masked = [];\n  body = body.replace(CARD_BLOCK, m => {\n    masked.push(m);\n    return `' + NUL + 'CARD${masked.length - 1}' + NUL + '`;\n  });';
if (!s.includes(OLD_CALL)) { console.error('CALL ANCHOR NOT FOUND'); process.exit(1); }
s = s.replace(OLD_CALL, '  const masked = [];\n  body = maskDecks(body, masked);');

// --- the unwrap guard ---
const OLD_UNWRAP = "      if (!seen.has(key)) { seen.add(key); return full; }";
if (!s.includes(OLD_UNWRAP)) { console.error('UNWRAP ANCHOR NOT FOUND'); process.exit(1); }
s = s.replace(OLD_UNWRAP, OLD_UNWRAP + "\n      if (IS_CARD_ANCHOR.test(full)) return full; // never unwrap a card (S196)");

// --- the un-masking regex must match the sentinel form the walker writes ---
const OLD_UNMASK = 'body = body.replace(/' + NUL + 'CARD(\\d+)' + NUL + '/g, (_, i) => masked[+i]);';
if (s.includes(OLD_UNMASK)) {
  s = s.replace(OLD_UNMASK, "body = body.replace(new RegExp(SENTINEL + 'CARD(\\\\d+)' + SENTINEL, 'g'), (_, i) => masked[+i]);");
} else {
  console.error('UNMASK ANCHOR NOT FOUND — check by hand'); process.exit(1);
}

// --- declare the sentinel once, near the top ---
s = s.replace("const ROOT = __dirname;", "const ROOT = __dirname;\n\n// A byte that cannot occur in the HTML, so a masked deck can never collide with\n// real page content while it is parked.\nconst SENTINEL = String.fromCharCode(0);");

fs.writeFileSync(P, s, 'utf8');
console.log('PATCHED dedupe-prose-links.js →', s.length, 'bytes');
