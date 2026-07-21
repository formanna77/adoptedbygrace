#!/usr/bin/env node
/**
 * detect-self-repeating-close.js
 *
 * THE DEFECT (found by hand in S184; `detect-multiplied-close.js` is structurally
 * blind to it, and reported 0 severe on every page where it was found):
 *
 *   A page lands its tattoo line -- the one load-bearing sentence the whole page
 *   was built to deliver -- and then REPEATS THAT SAME LINE, verbatim or nearly so,
 *   one or two paragraphs later. The hammer is deflated at the exact moment it
 *   should fall. VOICE SS VII.3 says every page has ONE tattooable sentence; saying
 *   it twice proves the writer did not trust it the first time.
 *
 *   Confirmed instances, S184:
 *     ethics-marriage   "The vow was always funded from heaven" / "funded from heaven all along"
 *     ethics-just-war   "The end of war is not a policy. It is a Person." (twice)
 *     ethics-speech     the coal on unclean lips, invoked three times
 *
 * WHY THE MULTIPLIED-CLOSE DETECTOR CANNOT SEE IT: that detector counts STACKED
 * ENDINGS -- distinct closing beats piled on each other. This defect is a single
 * close that eats its own tail. Different shape, different tool.
 *
 * WHAT THIS FLAGS: any >=6-word span of PROSE that occurs in two or more separate
 * blocks of the same page. Severity rises when the second occurrence lands in the
 * final quarter of the page, because that is where the deflation costs the most.
 *
 * WHAT THIS DELIBERATELY DOES NOT FLAG (each of these is sanctioned or legitimate):
 *   - Quoted Scripture. A verse quoted early and returned to at the close is
 *     VOICE SS V.5 / Move 10, not a defect. Blockquotes and every "..."-quoted span
 *     are masked out before matching.
 *   - Anaphora inside a single paragraph ("You did not earn this. You did not
 *     deserve this.") -- SS III.4 expressly sanctions it. Only CROSS-BLOCK repeats count.
 *   - Related-article decks, hub cards, nav, footer boilerplate: all outside
 *     <article class="article-body">, which is the only region read.
 *   - Spans that are mostly function words. A repeat must carry >=3 content words,
 *     or "the fact that you are not" would bury every real finding.
 *
 * TRIAGE, NOT VERDICT. A repeated span can be a deliberate Circular Return (Move 10)
 * -- the page's spine restated with the truth now inside it. Read the two occurrences
 * in context before cutting. The question is never "does it repeat" but "does the
 * second occurrence LAND HARDER than the first, or does it spend what the first earned?"
 *
 * Usage:
 *   node detect-self-repeating-close.js              # rank the whole corpus
 *   node detect-self-repeating-close.js <page>.html  # inspect one page, with context
 *   node detect-self-repeating-close.js --all        # include LOW findings in the corpus run
 */

const fs = require('fs');
const path = require('path');

const N = 6;                 // minimum span length, in words
const MIN_CONTENT = 3;       // minimum non-function words in a flagged span
const CLOSE_ZONE = 0.75;     // "final quarter" boundary, as a fraction of blocks

const FUNCTION_WORDS = new Set([
  'the','a','an','and','or','but','if','then','than','that','this','these','those',
  'is','are','was','were','be','been','being','am','do','does','did','done',
  'have','has','had','having','will','would','shall','should','can','could','may',
  'might','must','of','in','on','at','to','for','with','from','by','as','into',
  'about','over','under','out','up','down','off','it','its','he','him','his','she',
  'her','hers','they','them','their','we','us','our','you','your','yours','i','me',
  'my','mine','who','whom','whose','which','what','when','where','why','how','not',
  'no','nor','so','too','very','just','only','also','even','ever','never','all',
  'any','some','one','two','there','here','because','while','after','before','again'
]);

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, ' ');
}

/** The only region we read. Non-prose utilities (hubs, printables, widgets) have none. */
function extractArticleBody(html) {
  const open = html.search(/<article[^>]*class="[^"]*\barticle-body\b[^"]*"[^>]*>/i);
  if (open === -1) return null;
  const afterTag = html.indexOf('>', open) + 1;
  // Walk to the matching </article>, honouring nested <article> (augustine-pears has one).
  let depth = 1, i = afterTag;
  const tagRe = /<(\/?)article\b/gi;
  tagRe.lastIndex = afterTag;
  let m;
  while ((m = tagRe.exec(html)) !== null) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) { i = m.index; break; }
  }
  return html.slice(afterTag, i);
}

/** Remove everything that is legitimately allowed to repeat. */
function scrub(body) {
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, ' ')          // quoted Scripture
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
    // "In Brief" (div.tldr) EXISTS to compress the page's spine into one scannable
    // paragraph. The body restating that spine is the design, not the defect --
    // masking this removed the largest false-positive class on the first run
    // (systematic-tulip's 17-word "hit" was its own In Brief, quite correctly echoed).
    .replace(/<div[^>]*class="[^"]*\btldr\b[^"]*"[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div[^>]*class="[^"]*\b(related-articles|hub-grid|card-|go-deeper|explore)[^"]*"[\s\S]*?<\/div>/gi, ' ')
    .replace(/<(p|div|li|h[1-6])[^>]*class="[^"]*\b(scripture|verse|passage|pull|epigraph)[^"]*"[\s\S]*?<\/\1>/gi, ' ');
}

/** Split into prose blocks (paragraphs and headings) BEFORE tags are stripped. */
function toBlocks(scrubbed) {
  const blocks = [];
  const re = /<(p|h2|h3|h4|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(scrubbed)) !== null) {
    const tag = m[1].toLowerCase();
    const raw = m[2];
    // Mask quoted spans -- a page may legitimately re-quote itself quoting someone else.
    const masked = raw.replace(/"[^"]*"/g, '  ').replace(/“[^”]*”/g, '  ');
    const text = masked
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;|&#8212;/g, ' ')
      .replace(/&[a-z]+;|&#\d+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text.length < 25) continue;
    blocks.push({ tag, text });
  }
  return blocks;
}

function words(text) {
  return text
    .toLowerCase()
    .replace(/[‘’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function contentCount(ws) {
  return ws.filter(w => !FUNCTION_WORDS.has(w) && w.length > 2).length;
}

function analyse(file, html) {
  const body = extractArticleBody(stripComments(html));
  if (!body) return null;
  const blocks = toBlocks(scrub(body));
  if (blocks.length < 6) return null;

  // Map every N-gram to the blocks it appears in.
  const grams = new Map();
  blocks.forEach((b, bi) => {
    const ws = words(b.text);
    for (let i = 0; i + N <= ws.length; i++) {
      const key = ws.slice(i, i + N).join(' ');
      if (!grams.has(key)) grams.set(key, []);
      const hits = grams.get(key);
      if (!hits.length || hits[hits.length - 1].block !== bi) hits.push({ block: bi, at: i });
    }
  });

  // Keep only cross-block repeats carrying real content.
  const raw = [];
  for (const [key, hits] of grams) {
    if (hits.length < 2) continue;
    if (contentCount(key.split(' ')) < MIN_CONTENT) continue;
    raw.push({ key, hits });
  }
  if (!raw.length) return null;

  // Merge overlapping N-grams into maximal spans so a 14-word repeat reports once, not nine times.
  raw.sort((a, b) => a.hits[0].block - b.hits[0].block || a.hits[0].at - b.hits[0].at);
  const spans = [];
  for (const r of raw) {
    const prev = spans[spans.length - 1];
    const sameShape = prev &&
      prev.hits.length === r.hits.length &&
      prev.hits.every((h, i) => h.block === r.hits[i].block && r.hits[i].at === h.at + prev.len - N + 1);
    if (sameShape) {
      prev.len += 1;
      prev.key += ' ' + r.key.split(' ').pop();
    } else {
      spans.push({ key: r.key, len: N, hits: r.hits });
    }
  }

  const closeStart = Math.floor(blocks.length * CLOSE_ZONE);
  const findings = spans.map(s => {
    const last = s.hits[s.hits.length - 1].block;
    const first = s.hits[0].block;
    const inClose = last >= closeStart;
    const spread = last - first;
    let severity;
    if (inClose && s.len >= 8) severity = 'SEVERE';
    else if (inClose && spread >= 2) severity = 'HIGH';
    else if (s.hits.length >= 3) severity = 'HIGH';
    else severity = 'LOW';
    return { ...s, first, last, inClose, spread, severity, blocks: blocks.length, closeStart };
  });

  const rank = { SEVERE: 3, HIGH: 2, LOW: 1 };
  findings.sort((a, b) => rank[b.severity] - rank[a.severity] || b.len - a.len);
  return { file, blockCount: blocks.length, closeStart, blocks, findings };
}

function main() {
  const arg = process.argv[2];
  const showAll = process.argv.includes('--all');
  const dir = __dirname;

  if (arg && arg.endsWith('.html')) {
    const p = path.join(dir, arg);
    if (!fs.existsSync(p)) { console.error('no such page: ' + arg); process.exit(1); }
    const r = analyse(arg, fs.readFileSync(p, 'utf8'));
    if (!r) { console.log(arg + ': no article-body prose, or too short to score.'); return; }
    console.log('\n' + arg + '  --  ' + r.blockCount + ' prose blocks, close zone starts at block ' + r.closeStart + '\n');
    if (!r.findings.length) { console.log('  no cross-block repeated spans.\n'); return; }
    for (const f of r.findings) {
      if (f.severity === 'LOW' && !showAll) continue;
      console.log('  [' + f.severity + ']  ' + f.len + ' words, blocks ' + f.hits.map(h => h.block).join(' + ') +
                  (f.inClose ? '  <-- second landing is INSIDE THE CLOSE' : ''));
      console.log('      "' + f.key + '"');
      for (const h of f.hits) {
        const t = r.blocks[h.block].text;
        console.log('        b' + h.block + ' (' + r.blocks[h.block].tag + '): ' + (t.length > 190 ? t.slice(0, 190) + '...' : t));
      }
      console.log('');
    }
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html')).sort();
  const rows = [];
  let scored = 0;
  for (const f of files) {
    const r = analyse(f, fs.readFileSync(path.join(dir, f), 'utf8'));
    if (!r) continue;
    scored++;
    const sev = r.findings.filter(x => x.severity === 'SEVERE').length;
    const high = r.findings.filter(x => x.severity === 'HIGH').length;
    const low = r.findings.filter(x => x.severity === 'LOW').length;
    if (sev || high || (showAll && low)) rows.push({ f, sev, high, low, top: r.findings[0] });
  }

  // Default ranking is by the LENGTH of the longest repeated span, not by how many
  // spans repeat. A page with one 14-word verbatim echo has the defect; a page with
  // nine 6-word echoes is usually just carrying its central image (SS IV.1).
  if (process.argv.includes('--bycount')) rows.sort((a, b) => b.sev - a.sev || b.high - a.high || b.top.len - a.top.len);
  else rows.sort((a, b) => b.top.len - a.top.len || b.sev - a.sev || b.high - a.high);

  console.log('\n  LEN  SEV  HIGH  LOW   longest repeated span (page)\n  ' + '-'.repeat(96));
  for (const r of rows) {
    const t = r.top;
    const snip = t.key.length > 56 ? t.key.slice(0, 56) + '...' : t.key;
    console.log('  ' + String(t.len).padStart(3) + String(r.sev).padStart(5) + String(r.high).padStart(6) + String(r.low).padStart(5) +
                '   "' + snip + '"' + (t.inClose ? ' [CLOSE]' : '') + '\n' + ' '.repeat(23) + r.f);
  }
  console.log('\n  ' + scored + ' prose page(s) scored | ' +
              rows.filter(r => r.sev).length + ' with SEVERE | ' +
              rows.filter(r => !r.sev && r.high).length + ' with HIGH only');
  console.log('\n  TRIAGE, NOT VERDICT. Read both occurrences before cutting: a Circular Return');
  console.log('  (Move 10) restates the spine with the truth now inside it, and that is apex work.');
  console.log('  The defect is the tattoo line spent twice, which deflates the hammer.');
  console.log('  Inspect: node detect-self-repeating-close.js <page>.html\n');
}

main();
