#!/usr/bin/env node
/**
 * detect-structural-rot.js — the v6 detector (S177)
 *
 * WHY THIS EXISTS
 * ---------------
 * `validate-site.js` and simple open/close TAG COUNTS both pass on pages whose
 * markup is badly mis-nested, because a stray `</div>` in one place silently
 * "balances" an unclosed `<div>` somewhere else. The classic carrier is the
 * baked `continue-journey-global` block: its inner wrapper is never closed and
 * a compensating orphan `</div>` sits hundreds of lines earlier. Counts match.
 * The DOM is wrong. Body content escapes `<article class="article-body">`.
 *
 * This walks a real tag stack (html.parser semantics) and reports genuine
 * mis-nesting, plus the other scanner-invisible defects the re-wash hunts.
 *
 * USAGE
 *   node detect-structural-rot.js            # all *.html, summary
 *   node detect-structural-rot.js --verbose  # every finding
 *   node detect-structural-rot.js page.html  # one page
 *
 * EXIT 0 always (diagnostic, never blocks a build).
 */

const fs = require('fs');
const path = require('path');

const VOID = new Set(['br','img','input','meta','link','hr','source','area',
                      'base','col','embed','param','track','wbr']);
const IGNORE_UNCLOSED = new Set(['html','body','li','p','td','th','tr','thead','tbody','option']);

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const targets = args.filter(a => !a.startsWith('--'));

function files() {
  if (targets.length) return targets;
  return fs.readdirSync('.').filter(f => f.endsWith('.html')).sort();
}

/** Walk tags, return { mismatches, strays, unclosed } */
function walk(html) {
  const stack = [];
  const mismatches = [], strays = [], unclosed = [];
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
  // blank out comments, scripts, styles so their contents never register
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, m => m.replace(/[^\n]/g, ' '))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, m => m.replace(/[^\n]/g, ' '))
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, m => m.replace(/[^\n]/g, ' '));

  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const attrs = m[3] || '';
    if (VOID.has(tag) || attrs.trimEnd().endsWith('/')) continue;
    const line = cleaned.slice(0, m.index).split('\n').length;

    if (!closing) { stack.push({ tag, line }); continue; }

    if (!stack.length) { strays.push({ tag, line, why: 'close with empty stack' }); continue; }
    if (stack[stack.length - 1].tag === tag) { stack.pop(); continue; }

    let found = -1;
    for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === tag) { found = i; break; }
    if (found === -1) {
      strays.push({ tag, line, why: `no open <${tag}> anywhere on the stack` });
    } else {
      const top = stack[stack.length - 1];
      mismatches.push({ tag, line, why: `</${tag}> closed while <${top.tag}> (opened line ${top.line}) was still open` });
      stack.length = found;
    }
  }
  for (const s of stack) if (!IGNORE_UNCLOSED.has(s.tag)) unclosed.push(s);
  return { mismatches, strays, unclosed };
}

/** Secondary axes: the other scanner-invisible defects. */
function auxChecks(html) {
  const out = [];

  // 1. links inside Scripture/quotation blocks (banned)
  const quoteBlocks = [
    /<blockquote[\s\S]*?<\/blockquote>/gi,
    /<div class="scripture-text">[\s\S]*?<\/div>/gi,
    /<div class="passage-verse-text">[\s\S]*?<\/div>/gi,
    /<div class="objection-verse-text">[\s\S]*?<\/div>/gi,
  ];
  for (const re of quoteBlocks) {
    for (const m of html.matchAll(re)) {
      if (/<a\s+href/i.test(m[0])) {
        out.push(`link inside a quotation block: ${m[0].slice(0, 90).replace(/\s+/g, ' ')}…`);
      }
    }
  }

  // 2. article wrapper placement vs related-articles
  const artClose = html.lastIndexOf('</article>');
  const relEnd = html.indexOf('<!-- RELATED-ARTICLES-END -->');
  if (artClose !== -1 && relEnd !== -1 && artClose < relEnd) {
    const gap = relEnd - artClose;
    if (gap > 800) out.push(`</article> closes ${gap} bytes BEFORE related-articles — body content may be escaping the wrapper`);
  }

  // 3. meta-label H2 molds (§XVIII cross-page templates)
  for (const mold of ['<h2>The Steel Man', 'The Socratic Trap', '<h2>The Catch —', '<h2>The Catch Beneath']) {
    if (html.includes(mold)) out.push(`meta-label H2 mold present: "${mold}"`);
  }

  // 4. links inside headings
  for (const m of html.matchAll(/<h([1-6])[^>]*>[\s\S]*?<\/h\1>/gi)) {
    if (/<a\s+href/i.test(m[0])) out.push(`link inside a heading: ${m[0].slice(0, 80).replace(/\s+/g, ' ')}…`);
  }

  // 5. raw-script Greek/Hebrew (§XV wants transliteration)
  const raw = html.match(/[Ͱ-Ͽἀ-῿֐-׿]{3,}/g);
  if (raw) out.push(`raw-script Greek/Hebrew (${raw.length} run(s)) — §XV wants transliterated + italic: ${raw.slice(0,3).join(', ')}`);

  // 6. emoji (banned site-wide)
  const emoji = html.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu);
  if (emoji) out.push(`EMOJI PRESENT (${emoji.length}): ${[...new Set(emoji)].slice(0,6).join(' ')}`);

  // 7. "(NIV)" suffix (banned)
  if (/\(NIV\)/.test(html)) out.push('"(NIV)" suffix present — banned');

  return out;
}

let structural = 0, aux = 0, scanned = 0;
const structuralPages = [];

for (const f of files()) {
  let html;
  try { html = fs.readFileSync(f, 'utf8'); } catch { continue; }
  scanned++;

  const { mismatches, strays, unclosed } = walk(html);
  const a = auxChecks(html);
  const hasStructural = mismatches.length || strays.length || unclosed.length;

  if (hasStructural) { structural++; structuralPages.push(f); }
  if (a.length) aux++;
  if (!hasStructural && !a.length) continue;

  console.log(`\n${f}`);
  for (const x of mismatches) console.log(`  MIS-NEST   line ${x.line}: ${x.why}`);
  for (const x of strays)     console.log(`  STRAY      line ${x.line}: </${x.tag}> — ${x.why}`);
  for (const x of unclosed)   console.log(`  UNCLOSED   <${x.tag}> opened line ${x.line}, never closed`);
  if (VERBOSE || !hasStructural) for (const x of a) console.log(`  AUX        ${x}`);
  else if (a.length)            console.log(`  AUX        ${a.length} secondary finding(s) — rerun with --verbose`);
}

console.log(`\n${'='.repeat(62)}`);
console.log(`scanned ${scanned} page(s)`);
console.log(`  ${structural} with STRUCTURAL rot (mis-nesting / strays / unclosed)`);
console.log(`  ${aux} with secondary findings`);
if (structuralPages.length) {
  console.log(`\nstructural-rot queue:\n  ${structuralPages.join('\n  ')}`);
}
console.log('='.repeat(62));
