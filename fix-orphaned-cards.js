#!/usr/bin/env node
/**
 * fix-orphaned-cards.js — S196. Idempotent; inert on a clean corpus.
 *
 * REPAIRS THE DAMAGE DONE BY THE dedupe-prose-links.js CARD MASK.
 *
 * That mask was a regex with a non-greedy body, so it stopped at the first
 * </div> inside a card deck — `<div class="card-number">01</div>` — and left
 * every card after the first one exposed to the link unwrapper. Any deck card
 * pointing at a target the prose above had already linked had its <a> wrapper
 * stripped. What remains renders as a card-shaped block of text, in the grid,
 * beside working cards, that cannot be clicked.
 *
 * This is the worst class of defect the site can ship, because the page is
 * otherwise perfect and the reader simply finds a door that will not open.
 * validate-site.js CHECK 1 cannot see it: it asks whether links RESOLVE, and
 * there is no longer a link there to resolve.
 *
 * The mask is fixed (a real tag-balance walker) and a second guard now refuses
 * to unwrap any anchor containing card markup. This script repairs what the old
 * one already ate.
 *
 * HOW THE LOST href IS RECOVERED — in strict order, never guessed:
 *   1. the same file in an archive backup directory, matched by card title
 *   2. any OTHER live page whose intact deck carries a card with the same title
 * If neither yields an href, the card is REPORTED AND LEFT ALONE. A wrong link
 * is worse than a visibly missing one.
 *
 * Cards that are non-clickable BY DESIGN are excluded and must stay excluded:
 *   - best-reads.html      — `<div class="hub-card" style="cursor:default;">`
 *   - systematic-salvation.html — `.truth-card`, a display grid, not a deck
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const ROOT = path.resolve(__dirname);
const ARCHIVE = path.join(ROOT, 'archive');

// Decks that are deliberately not links.
const BY_DESIGN = /style="cursor:default|class="truth-card/;

// Four cards whose href predates every surviving backup, resolved by hand
// against the live corpus. Each title matches exactly one real page, and each
// target was confirmed to exist on disk. Keyed by "file::title" so a title that
// means different things on different pages can never cross-contaminate.
const MANUAL = {
  'devotional-held-without-asking.html::The Doctrine of Providence': '/systematic-providence',
  'romans-3-10-18.html::Total Depravity Explained': '/question-depravity',
  'shattered-lens-pastor.html::You Can\'t Unsee It': '/shattered-lens-cant-unsee-it',
  'story-the-fish-who-chose-the-ocean.html::What About Free Will?': '/question-freewill',
};

function cardStarts(html) {
  // A card begins at `<div class="card-number">` OR `<div class="card-meta">`
  // that is NOT already inside an open <a>. Walk back to the nearest <a and the
  // nearest </a>: if the last thing behind us is a CLOSE, this card has no
  // wrapper.
  //
  // S196: keying on card-number ALONE missed an entire second deck style. Decks
  // built by a different generator lead with `<div class="card-meta">DEVOTIONAL</div>`
  // and carry no card-number at all, so a whole class of orphan was invisible to
  // the first pass and the fixer cheerfully reported "corpus clean."
  const out = [];
  const re = /<div class="card-(?:number|meta)">/g;
  let m;
  while ((m = re.exec(html))) {
    // The lookback must be wide enough to reach the card's own <a> opener. Some
    // decks put card-meta at the END of the card, after a long description, so a
    // 500-char window landed mid-card and reported a false orphan. It declined
    // to act (no title in range), but a detector that cries wolf gets ignored.
    const before = html.slice(Math.max(0, m.index - 1600), m.index);
    if (BY_DESIGN.test(before.slice(-260))) continue;
    const lastOpen = before.lastIndexOf('<a ');
    const lastClose = before.lastIndexOf('</a>');
    if (lastOpen === -1 || lastClose > lastOpen) out.push(m.index);
  }
  return out;
}

// NOTE: decks in this corpus use h2, h3 AND h4 for the card title, sometimes on
// the same page. Matching only h3 silently skipped a third of the orphans.
function titleAt(html, start) {
  const seg = html.slice(start, start + 900);
  const m = seg.match(/<h[234] class="card-title">([\s\S]*?)<\/h[234]>/);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : null;
}

// End of the card = the </div> that closes `<div class="card-footer">`.
function cardEnd(html, start) {
  const f = html.indexOf('<div class="card-footer">', start);
  if (f === -1 || f - start > 1400) return -1;
  const scan = /<(\/?)div\b[^>]*>/g;
  scan.lastIndex = f + '<div class="card-footer">'.length;
  let depth = 1, t;
  while ((t = scan.exec(html))) {
    depth += t[1] ? -1 : 1;
    if (depth === 0) return t.index + t[0].length;
  }
  return -1;
}

// Build title -> href from every intact deck card on the site, plus backups.
function buildIndex() {
  const idx = new Map();
  const add = html => {
    const re = /<a\s+href="(\/[^"#]*)"[^>]*class="[^"]*hub-card[^"]*"[^>]*>([\s\S]{0,900}?)<\/h[234]>/gi;
    let m;
    while ((m = re.exec(html))) {
      const t = (m[2].match(/<h[234] class="card-title">([\s\S]*?)$/) || [])[1];
      if (!t) continue;
      const key = t.replace(/<[^>]+>/g, '').trim();
      if (key && !idx.has(key)) idx.set(key, m[1]);
    }
  };
  for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
    add(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  }
  if (fs.existsSync(ARCHIVE)) {
    for (const d of fs.readdirSync(ARCHIVE)) {
      const dir = path.join(ARCHIVE, d);
      if (!fs.statSync(dir).isDirectory() || !/backup/i.test(d)) continue;
      for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
        add(fs.readFileSync(path.join(dir, f), 'utf8'));
      }
    }
  }
  return idx;
}

// Per-file index from THIS page's own archived backups. This must win over the
// global one: two different pages can carry cards with the same title pointing
// at different targets ("Perseverance of the Saints" resolves to
// /systematic-perseverance on one page and /question-perseverance on another),
// and the global index would hand back whichever it happened to see first.
function backupIndexFor(file) {
  const idx = new Map();
  if (!fs.existsSync(ARCHIVE)) return idx;
  for (const d of fs.readdirSync(ARCHIVE)) {
    const fp = path.join(ARCHIVE, d, file);
    if (!/backup/i.test(d) || !fs.existsSync(fp)) continue;
    const html = fs.readFileSync(fp, 'utf8');
    const re = /<a\s+href="(\/[^"#]*)"[^>]*class="[^"]*hub-card[^"]*"[^>]*>([\s\S]{0,900}?)<\/h[234]>/gi;
    let m;
    while ((m = re.exec(html))) {
      const t = (m[2].match(/<h[234] class="card-title">([\s\S]*?)$/) || [])[1];
      if (!t) continue;
      const key = t.replace(/<[^>]+>/g, '').trim();
      if (key && !idx.has(key)) idx.set(key, m[1]);
    }
  }
  return idx;
}

const index = buildIndex();
console.log(`  card-title -> href index built from ${index.size} intact cards (live + backups)\n`);

let fixed = 0, unresolved = [], pages = 0;

for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
  const p = path.join(ROOT, f);
  let html = fs.readFileSync(p, 'utf8');
  const starts = cardStarts(html);
  if (!starts.length) continue;

  const own = backupIndexFor(f);
  let n = 0;
  // Right to left, so earlier offsets stay valid.
  for (let i = starts.length - 1; i >= 0; i--) {
    const s = starts[i];
    const title = titleAt(html, s);
    const e = cardEnd(html, s);
    if (!title || e === -1) { unresolved.push(`${f}: card @${s} (no title or no card-footer)`); continue; }
    const href = MANUAL[`${f}::${title}`] || own.get(title) || index.get(title);
    if (!href) { unresolved.push(`${f}: "${title}" — no href recoverable`); continue; }
    if (!fs.existsSync(path.join(ROOT, href.replace(/^\//, '') + '.html'))) {
      unresolved.push(`${f}: "${title}" -> ${href} DOES NOT EXIST`); continue;
    }
    html = html.slice(0, s) + `<a href="${href}" class="hub-card">\n   ` + html.slice(s, e) + `\n</a>` + html.slice(e);
    n++;
    console.log(`  ${f.padEnd(48)} "${title}" -> ${href}`);
  }
  if (n) { pages++; fixed += n; if (!DRY) fs.writeFileSync(p, html, 'utf8'); }
}

console.log(`\n${DRY ? '[dry run] ' : ''}restored ${fixed} orphaned card(s) across ${pages} page(s).`);
if (unresolved.length) {
  console.log(`\n  ${unresolved.length} NOT repaired (left alone deliberately — a wrong link is worse than a missing one):`);
  unresolved.forEach(u => console.log(`    ${u}`));
}
if (!fixed && !unresolved.length) console.log('Corpus clean — nothing to do.');
