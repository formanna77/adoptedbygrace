#!/usr/bin/env node
/**
 * fix-quoted-links.js — unwrap the mechanically-safe links inside quoted
 * Scripture (S186). Companion to sweep-quoted-links.js / analyze-quoted-links.js.
 *
 * ONLY touches Class A and Class C:
 *   A — the anchor's href is duplicated by a citation label adjacent to the
 *       same quotation. The link survives on the label; unwrapping loses nothing.
 *   C — the href occurs elsewhere on the same page. Same reasoning.
 *
 * Class B (sole occurrence on the page) is DELIBERATELY LEFT ALONE: unwrapping
 * it would drop a link off the page and push it toward the §IX floor. Those are
 * editorial — the link must be re-homed into the prose gloss beside the verse
 * by hand.
 *
 * Unwrapping preserves the anchor's inner markup exactly; only <a ...> and </a>
 * are removed. Backups are written to archive/s186-backup/ before any write.
 *
 *   node fix-quoted-links.js            # dry run — report only
 *   node fix-quoted-links.js --apply    # write
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const APPLY = process.argv.includes('--apply');
const BACKUP = path.join(ROOT, 'archive', 's186-backup');
const NEAR = 260;

const SKIP_DIRS = new Set(['archive', '.s137-bak', 'node_modules', '.git', 'Reformed Sources', 'docs']);
const SKIP_FILES = new Set(['all-content.html', '404.html']);
const REF_RE = /\b(?:[1-3]\s?)?(?:[A-Z][a-zA-Z]{2,}|[A-Z]{3,})\.?\s+\d{1,3}\s?:\s?\d{1,3}/;
const LABEL_ONLY_RE = /^\s*(?:[—–-]\s*)?(?:[1-3]\s?)?[A-Za-z][A-Za-z ]{1,20}\.?\s*\d{1,3}\s?:\s?\d{1,3}(?:\s?[-–]\s?\d{1,3})?\s*$/;
const CITATION_CLASS_RE = /class="[^"]*(?:verse-ref|passage-verse|scripture-ref|cite|chain-link-greek)[^"]*"/i;
const CARD_CLASS_RE = /class="[^"]*(?:card|tile|door|cta|nav-|pill|hub-|grid-item|verse-box|topic-|chip)[^"]*"/i;
const isCard = (an, html) => CARD_CLASS_RE.test(an.tag) ||
  /<(?:div|h[1-6]|section|article|ul|ol|table)\b/i.test(html.slice(an.contentStart, an.end));

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue; walk(path.join(d, e.name), o); }
    else if (e.name.endsWith('.html') && !SKIP_FILES.has(e.name)) o.push(path.join(d, e.name));
  }
  return o;
}

function tokenize(html) {
  const tokens = [], anchors = [], stack = [];
  let inTag = false, tagStart = 0, skipUntil = null;
  for (let i = 0; i < html.length; i++) {
    const c = html[i];
    if (skipUntil) { if (c === '<' && html.startsWith(skipUntil, i)) { i += skipUntil.length - 1; skipUntil = null; } continue; }
    if (!inTag && c === '<') {
      const lo = html.slice(i, i + 8).toLowerCase();
      if (lo.startsWith('<script')) { const e = html.indexOf('>', i); if (e > -1) { i = e; skipUntil = '</script'; continue; } }
      if (lo.startsWith('<style'))  { const e = html.indexOf('>', i); if (e > -1) { i = e; skipUntil = '</style';  continue; } }
      if (html.startsWith('<!--', i)) { const e = html.indexOf('-->', i); if (e > -1) { i = e + 2; continue; } }
      inTag = true; tagStart = i; continue;
    }
    if (inTag) {
      if (c === '>') {
        const tag = html.slice(tagStart, i + 1), lo = tag.toLowerCase();
        if (lo.startsWith('<a ') || lo === '<a>') stack.push({ open: tagStart, contentStart: i + 1, tag });
        else if (lo.startsWith('</a')) {
          const a = stack.pop();
          if (a) anchors.push({ start: a.open, contentStart: a.contentStart, closeStart: tagStart, end: i + 1, tag: a.tag,
                                text: html.slice(a.contentStart, tagStart).replace(/<[^>]*>/g, '').trim() });
        }
        inTag = false;
      }
      continue;
    }
    if (c === '"' || c === '“' || c === '”') tokens.push({ pos: i, depth: stack.length, anchorOpen: stack.length ? stack[stack.length - 1].open : null });
  }
  return { tokens, anchors };
}

const href = t => (t.match(/href="([^"]*)"/) || [, ''])[1];

let filesTouched = 0, unwrapped = 0, skippedB = 0;
const log = [];

for (const f of walk(ROOT)) {
  const html = fs.readFileSync(f, 'utf8');
  const { tokens, anchors } = tokenize(html);
  const pageHrefs = anchors.map(a => href(a.tag));
  const targets = [];

  for (let k = 0; k + 1 < tokens.length; k += 2) {
    const a = tokens[k], b = tokens[k + 1];
    const plain = html.slice(a.pos, b.pos + 1).replace(/<[^>]*>/g, '');
    if (plain.length < 20 || plain.length > 600) continue;
    const after = html.slice(b.pos + 1, b.pos + 161).replace(/<[^>]*>/g, ' ');
    if (!REF_RE.test(plain) && !REF_RE.test(after)) continue;

    const nearHrefs = new Set(anchors
      .filter(an => (an.start > b.pos && an.start < b.pos + NEAR) || (an.end < a.pos && an.end > a.pos - NEAR))
      .map(an => href(an.tag)));

    for (const an of anchors.filter(x => x.start > a.pos && x.start < b.pos)) {
      if (LABEL_ONLY_RE.test(an.text) || CITATION_CLASS_RE.test(an.tag) || isCard(an, html)) continue;
      const h = href(an.tag);
      const safe = nearHrefs.has(h) || pageHrefs.filter(x => x === h).length > 1;
      if (!safe) { skippedB++; continue; }
      targets.push(an);
    }
  }

  if (!targets.length) continue;
  targets.sort((x, y) => y.start - x.start);          // apply from the end backwards
  let out = html;
  for (const an of targets) {
    out = out.slice(0, an.closeStart) + out.slice(an.end);   // drop </a>
    out = out.slice(0, an.start) + out.slice(an.contentStart); // drop <a ...>
  }
  filesTouched++; unwrapped += targets.length;
  log.push(`  ${path.relative(ROOT, f).padEnd(52)} ${String(targets.length).padStart(3)} unwrapped`);

  if (APPLY) {
    fs.mkdirSync(BACKUP, { recursive: true });
    fs.writeFileSync(path.join(BACKUP, path.basename(f)), html);
    fs.writeFileSync(f, out);
  }
}

console.log(`\n  ${APPLY ? 'APPLIED' : 'DRY RUN'} — unwrapping links woven into quoted Scripture\n`);
console.log(log.sort().join('\n'));
console.log(`\n  ${filesTouched} file(s) · ${unwrapped} anchor(s) unwrapped · ${skippedB} Class-B left for hand re-homing\n`);
if (!APPLY) console.log('  Re-run with --apply to write. Backups land in archive/s186-backup/.\n');
