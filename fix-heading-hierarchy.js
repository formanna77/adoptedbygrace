#!/usr/bin/env node
/**
 * fix-heading-hierarchy.js — S198-PRE, sixth pass
 *
 * WHY THIS EXISTS
 * ---------------
 * 440 of 687 pages skipped a heading level, and on 395 of them the skip was in
 * exactly one place: the FOOTER. Its column headings are <h4> ("Truth",
 * "Explore", "Understand", "Connect"), and the heading immediately before them
 * is the <h2 class="related-articles-heading">Keep Exploring</h2>. So the
 * document outline reads h2 -> h4 on more than half the corpus.
 *
 * A screen-reader user navigating by heading level hears a level vanish. It is
 * WCAG 1.3.1, it is invisible to every one of the eighteen checks, and — like
 * the 362 pages missing their font link — it has ONE root cause and therefore
 * one fix. Nothing keys on the footer's h4 (verified across every .js in the
 * repo); the only consumers are four CSS rules, updated in the same pass.
 *
 * SCOPE, DELIBERATELY NARROW
 * --------------------------
 * Only headings BETWEEN <footer ...> and </footer> are touched. Body <h4>s are
 * legitimate — `.card-title` sits under an <h3> and is correctly a level down.
 * The 45 pages whose skip is in the BODY are NOT touched here: each needs a
 * human decision about what the heading means, and a script that guesses would
 * be renumbering an argument's structure. `--report` lists them.
 *
 * Idempotent. Inert on a corpus already fixed.
 *
 *   node fix-heading-hierarchy.js            # apply
 *   node fix-heading-hierarchy.js --dry-run  # show what would change
 *   node fix-heading-hierarchy.js --report   # list the 45 body-level skips
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const dry = process.argv.includes('--dry-run');
const reportOnly = process.argv.includes('--report');

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

// --- report mode: which pages still skip, and where -------------------------
function skipsIn(html) {
  const fi = html.search(/<footer\b/i);
  const hs = [...html.matchAll(/<h([1-6])\b/gi)].map(m => ({ lvl: +m[1], idx: m.index }));
  const out = [];
  for (let i = 1; i < hs.length; i++) {
    if (hs[i].lvl - hs[i - 1].lvl > 1) {
      out.push({ from: hs[i - 1].lvl, to: hs[i].lvl, inFooter: fi > -1 && hs[i].idx > fi });
    }
  }
  return out;
}

if (reportOnly) {
  let body = [];
  for (const f of files) {
    const s = skipsIn(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    const b = s.filter(x => !x.inFooter);
    if (b.length) body.push(`${f}  ${b.map(x => 'h' + x.from + '->h' + x.to).join(', ')}`);
  }
  console.log(`Pages with a heading skip OUTSIDE the footer: ${body.length}`);
  body.forEach(b => console.log('  ' + b));
  console.log('\nThese are NOT auto-fixed. Each is a judgement about what the heading means.');
  process.exit(0);
}

// --- apply ------------------------------------------------------------------
let changed = 0, headings = 0;
for (const f of files) {
  const p = path.join(ROOT, f);
  const html = fs.readFileSync(p, 'utf8');

  const open = html.search(/<footer\b/i);
  if (open === -1) continue;
  const close = html.indexOf('</footer>', open);
  if (close === -1) continue;

  const before = html.slice(0, open);
  const footer = html.slice(open, close + '</footer>'.length);
  const after = html.slice(close + '</footer>'.length);

  const n = (footer.match(/<h4\b/gi) || []).length;
  if (!n) continue;

  // GUARD, and it is the whole reason this script is not a one-line sed.
  // 29 pages carry an <h3> INSIDE the footer ("Continue Your Journey",
  // "Explore More") with the h4 columns nested beneath it. There the outline
  // already reads h2 -> h3 -> h4, which is correct, and promoting the h4s
  // would DESTROY a real level rather than restore one. Only footers whose
  // h4s are the top heading inside the footer are touched.
  if (/<h3\b/i.test(footer)) continue;

  const fixed = footer.replace(/<h4\b/gi, '<h3').replace(/<\/h4>/gi, '</h3>');
  headings += n;
  changed++;
  if (!dry) fs.writeFileSync(p, before + fixed + after);
}

console.log(dry ? '[dry-run] no files written' : 'applied');
console.log(`  ${changed} page(s), ${headings} footer heading(s) h4 -> h3`);
if (changed === 0) console.log('  (inert — corpus already correct)');
console.log('\nRemember the four CSS rules: .footer-section h4 and .footer-column h4 in global.css.');
