#!/usr/bin/env node
/**
 * fix-italic-scripture-links.js — S186
 *
 * Companion to `sweep-quoted-links.js --italic`. The paired sweep keys on
 * quotation marks; this handles the shape it is structurally blind to —
 * Scripture set in ITALICS with no marks at all, with internal links woven
 * through the Bible's own words.
 *
 * The test for "is this link inside Scripture" is not a guess about what looks
 * scriptural. It is a lookup against the site's own NIV data (`scripture-niv.js`):
 * the link is inside Scripture iff a 7-word shingle OVERLAPPING the anchor's
 * words appears in the Bible text the site itself ships.
 *
 * SAFETY: only unwraps when the href already occurs ELSEWHERE on the same page,
 * so the page loses no link. Everything else is left for hand re-homing.
 *
 *   node fix-italic-scripture-links.js           # dry run
 *   node fix-italic-scripture-links.js --apply   # write (backs up first)
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const APPLY = process.argv.includes('--apply');
const BACKUP = path.join(ROOT, 'archive', 's186-backup-italic');
const SHINGLE = 7;

const SKIP_DIRS = new Set(['archive', '.s137-bak', 'node_modules', '.git', 'Reformed Sources', 'docs']);
const SKIP_FILES = new Set(['all-content.html', '404.html']);
const normWords = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);

function walk(d, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue; walk(path.join(d, e.name), o); }
    else if (e.name.endsWith('.html') && !SKIP_FILES.has(e.name)) o.push(path.join(d, e.name));
  }
  return o;
}

const NIV = (() => {
  const set = new Set();
  const raw = fs.readFileSync(path.join(ROOT, 'scripture-niv.js'), 'utf8');
  const data = JSON.parse(raw.slice(raw.indexOf('{')).replace(/;\s*$/, ''));
  for (const t of Object.values(data)) {
    const w = normWords(String(t));
    for (let i = 0; i + SHINGLE <= w.length; i++) set.add(w.slice(i, i + SHINGLE).join(' '));
  }
  return set;
})();

let files = 0, unwrapped = 0, left = 0;
const log = [];

for (const f of walk(ROOT)) {
  let html = fs.readFileSync(f, 'utf8');
  const original = html;
  const pageHrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  const edits = [];

  const spanRe = /<(em|i)\b[^>]*>((?:(?!<\/?(?:em|i)\b)[\s\S])*?)<\/\1>/gi;  // S188: pair to NEAREST close
  let m;
  while ((m = spanRe.exec(html))) {
    const inner = m[2], innerOffset = m.index + m[0].indexOf(inner);
    const plain = inner.replace(/<[^>]*>/g, '').trim();
    if (plain.length < 40 || /^["“]/.test(plain)) continue;

    const aRe = /<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let a;
    while ((a = aRe.exec(inner))) {
      const before = normWords(inner.slice(0, a.index).replace(/<[^>]*>/g, ' '));
      const linkW = normWords(a[2].replace(/<[^>]*>/g, ' '));
      const after = normWords(inner.slice(a.index + a[0].length).replace(/<[^>]*>/g, ' '));
      if (!linkW.length) continue;
      const all = [...before, ...linkW, ...after];
      const lo = before.length, hi = lo + linkW.length - 1;
      let inside = false;
      for (let i = Math.max(0, lo - SHINGLE + 1); i + SHINGLE <= all.length && i <= hi; i++) {
        if (NIV.has(all.slice(i, i + SHINGLE).join(' '))) { inside = true; break; }
      }
      if (!inside) continue;
      if (pageHrefs.filter(h => h === a[1]).length < 2) { left++; continue; }  // sole link — hand re-home
      edits.push({ start: innerOffset + a.index, end: innerOffset + a.index + a[0].length, inner: a[2], href: a[1], text: a[2].replace(/<[^>]*>/g, '').trim() });
    }
  }

  if (!edits.length) continue;
  edits.sort((x, y) => y.start - x.start);
  for (const e of edits) html = html.slice(0, e.start) + e.inner + html.slice(e.end);
  files++; unwrapped += edits.length;
  log.push(`  ${path.relative(ROOT, f).padEnd(50)} ${String(edits.length).padStart(2)}  ${edits.map(e => '"' + e.text + '"').join(', ').slice(0, 70)}`);

  if (APPLY) {
    fs.mkdirSync(BACKUP, { recursive: true });
    fs.writeFileSync(path.join(BACKUP, path.basename(f)), original);
    fs.writeFileSync(f, html);
  }
}

console.log(`\n  ${APPLY ? 'APPLIED' : 'DRY RUN'} — links unwrapped from UNMARKED (italic) Scripture\n`);
console.log(log.sort().join('\n'));
console.log(`\n  ${files} file(s) · ${unwrapped} unwrapped · ${left} left for hand re-homing (sole link on the page)\n`);
