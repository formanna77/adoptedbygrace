#!/usr/bin/env node
/* S210 factory splicer + lead gate.  Descends from archive/s209-splice.js.
 *
 * TWO CHANGES FROM S209, both earned:
 *
 * 1. THE REGION IS ONE SPAN, NOT AN ANCHOR/END PAIR. S209 asked agents for a
 *    start marker and a separate end marker and then replaced everything
 *    between them — which means a correct anchor and a correct end marker can
 *    still bracket a region neither agent nor gate ever looked at. Here the
 *    agent hands back the EXACT span it is replacing, so what the gate checks
 *    and what gets overwritten are the same bytes by construction.
 *
 * 2. GATE 5 — THE SELF-CHECK. The whole point of this session's Lane A run was
 *    that agents repairing feeling-slips can write fresh ones. So every
 *    replacement is scanned for the certificate shapes before it lands. A
 *    factory that cannot check its own output is a factory for defects.
 *
 * node archive/s210-splice.js            # dry run
 * node archive/s210-splice.js --apply
 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const OUT = process.env.S210_OUT || path.join(__dirname, 's210-out'); // env override so the gate itself can be probed against a deliberately broken block (law 3)
const MANIFEST = new Set(fs.readFileSync(path.join(__dirname,'factory-briefs','PAGE-MANIFEST.txt'),'utf8').split('\n').map(s=>s.trim()).filter(Boolean));

const rxOf = (s) => new RegExp(s.trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+'), 'g');
const countOf = (hay, needle) => (hay.match(rxOf(needle)) || []).length;

const blocks = [];
for (const f of fs.readdirSync(OUT).filter(f => f.endsWith('.txt'))) {
  const txt = fs.readFileSync(path.join(OUT, f), 'utf8');
    // THE LAZY QUANTIFIER CROSSES THE PAGE BOUNDARY. First run of this gate:
  // apologetic-able-to-save-completely is CORRECT-AS-WRITTEN and carries no
  // ANCHOR, so [\s\S]*? happily ran past === END PAGE and stole the NEXT
  // page's anchor, attributing it to the wrong file. Reported as "anchor
  // matches 0x" — a message that describes the file, not the bug. This is
  // CLAUDE.md's documented comment-boundary trap in a second costume: use
  // (?:(?!<delimiter>)[\s\S])*? so the match physically cannot cross it.
  const re = /^=== PAGE: (.+?)\r?\nVERDICT: *(\S+)(?:(?!^=== PAGE:)[\s\S])*?^ANCHOR:\r?\n((?:(?!^=== PAGE:)[\s\S])*?)\r?\n^END_ANCHOR\r?\n^REPLACEMENT:\r?\n((?:(?!^=== PAGE:)[\s\S])*?)\r?\n^END_REPLACEMENT/gm;
  let m;
  while ((m = re.exec(txt))) blocks.push({ src: f, slug: m[1].trim(), verdict: m[2], anchor: m[3], repl: m[4] });
  // count the CORRECT-AS-WRITTEN verdicts too, so the tally proves nothing was lost
  for (const v of txt.matchAll(/^=== PAGE: (.+?)\r?\nVERDICT: *CORRECT-AS-WRITTEN/gm))
    blocks.push({ src: f, slug: v[1].trim(), verdict: 'CORRECT-AS-WRITTEN', noop: true });
}
const edits = blocks.filter(b => !b.noop);
console.log(`parsed ${blocks.length} block(s) from ${path.relative(ROOT,OUT)} — ${edits.length} edit(s), ${blocks.length-edits.length} no-op(s)\n`);

// GATE 5 vocabulary. Interior state offered as evidence of ELECTION (VOICE XXIII.1).
// Deliberately narrow: a wide net here fires on the sanctioned direction and on
// the denial form, which are the two things the site most wants written.
const CERTIFICATE = [
  /\b(that|the|your) (ache|longing|hunger|trembling|stirring|desire|wanting|fear|doubt|grief) (is|was) (not )?(native|the (proof|evidence|sign|mark|fingerprint|dawn|beginning)|your election)/i,
  /\bis (the|your) (proof|evidence) (that|of) (you|your)\b/i,
  /\b(proves|means) (that )?you (are|were|have been) (chosen|his|elect|saved|born)/i,
  /\bthe dead (do not|don't) (wrestle|ache|grieve|long|care)/i,
  /\bnot native to a corpse\b/i,
  /\b(if|when) you (feel|ache|long|hunger|tremble)[^.]{0,60}\byou (are|were) (his|chosen|saved)/i,
];

let fatal = 0, warn = 0;
for (const b of edits) {
  const file = path.join(ROOT, b.slug + '.html');
  const tag = `[${b.slug}]`;
  if (!fs.existsSync(file)) { console.log(`${tag} FATAL no such file`); fatal++; continue; }
  const html = fs.readFileSync(file, 'utf8');

  const ca = countOf(html, b.anchor);
  if (ca !== 1) { console.log(`${tag} FATAL anchor matches ${ca}x (need exactly 1)`); fatal++; continue; }
  const mm = rxOf(b.anchor).exec(html);
  const start = mm.index, stop = start + mm[0].length;
  const region = html.slice(start, stop);
  const rest = html.slice(0, start) + html.slice(stop);

  // GATE 1 — the region must sit inside the article, and must not be furniture.
  const artOpen = html.indexOf('<article'), artClose = html.lastIndexOf('</article>');
  if (artOpen !== -1 && (start < artOpen || (artClose !== -1 && stop > artClose))) {
    console.log(`${tag} FATAL region escapes <article>`); fatal++; continue;
  }
  for (const furn of ['keep-reading','hub-grid','cross-links','related-articles','phase-nav','continue-journey','knowledge-check'])
    if (region.includes(`class="${furn}`)) { console.log(`${tag} FATAL region contains furniture .${furn}`); fatal++; }

  // GATE 2 — links
  const hrefs = [...b.repl.matchAll(/href="\/([a-z0-9\-]+)"/g)].map(m => m[1]);
  for (const h of hrefs) if (!MANIFEST.has(h)) { console.log(`${tag} FATAL broken link -> /${h}`); fatal++; }
  const dupIn = hrefs.filter((h, i) => hrefs.indexOf(h) !== i);
  if (dupIn.length) { console.log(`${tag} FATAL self-duplicate link(s): ${[...new Set(dupIn)].join(', ')}`); fatal++; }
  const removed = [...region.matchAll(/href="\/([a-z0-9\-]+)"/g)].map(m => m[1]);
  const lost = removed.filter(h => !hrefs.includes(h));
  if (lost.length) { console.log(`${tag} WARN  replacement drops link(s): ${[...new Set(lost)].join(', ')}`); warn++; }
  for (const h of new Set(hrefs)) {
    const outside = [...rest.matchAll(new RegExp(`href="/${h}"`, 'g'))].length;
    if (outside) { console.log(`${tag} WARN  /${h} already linked ${outside}x elsewhere — run dedupe-prose-links.js after`); warn++; }
  }

  // GATE 3 — banned tokens, in EVERY encoding CHECK 16 knows about
  const enc = [
    [b.repl.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu), 'literal'],
    [b.repl.match(/\\[0-9a-fA-F]{4,5}/g)?.filter(s => { const c = parseInt(s.slice(1),16); return (c>=0x2600&&c<=0x27BF)||(c>=0x1F300&&c<=0x1FAFF); }), 'CSS escape'],
    [b.repl.match(/&#x?[0-9a-fA-F]+;/g)?.filter(s => { const c = s[2]==='x'||s[2]==='X' ? parseInt(s.slice(3),16) : parseInt(s.slice(2),10); return (c>=0x2600&&c<=0x27BF)||(c>=0x1F300&&c<=0x1FAFF); }), 'HTML entity'],
    [b.repl.match(/\\u\{?[0-9a-fA-F]{4,5}\}?/g)?.filter(s => { const c = parseInt(s.replace(/[\\u{}]/g,''),16); return (c>=0x2600&&c<=0x27BF)||(c>=0x1F300&&c<=0x1FAFF); }), 'JS escape'],
  ];
  for (const [hit, how] of enc) if (hit && hit.length) { console.log(`${tag} FATAL emoji (${how}): ${[...new Set(hit)].join(' ')}`); fatal++; }
  if (/\(NIV\)/.test(b.repl)) { console.log(`${tag} FATAL "(NIV)" suffix`); fatal++; }
  if (/TL;?DR/i.test(b.repl)) { console.log(`${tag} FATAL TL;DR`); fatal++; }
  if (/class="(article-toc|section-nav)"/.test(b.repl)) { console.log(`${tag} FATAL banned nav class`); fatal++; }
  if (/\bCalvinism says\b|\bDear reader\b|\bBeloved,/i.test(b.repl)) { console.log(`${tag} FATAL forbidden move (Calvinism says / pastoral sigh)`); fatal++; }

  // GATE 4 — SPLICE THE DOCUMENT AND MEASURE THE RESULT. DO NOT MEASURE A PROXY.
  //
  // Two wrong versions of this gate ran before this one, and both failed on
  // CORRECT replacements:
  //   S209 required the replacement to be self-balanced. But a surgical
  //   replacement of the TEXT INSIDE a <p> legitimately reads
  //   "...</p> <p>... </p> <p>..." — it closes a tag it did not open and opens
  //   one it does not close, and the surrounding markup completes both. Three
  //   of five good replacements failed.
  //   The first S210 version compared the replacement's balance DELTA against
  //   the region's. Better, and still a proxy: it rejected the shape above,
  //   because the region (bare text) has delta zero and the replacement does
  //   not — even though substituting one for the other yields four perfectly
  //   nested paragraphs.
  //
  // The question was never "is this fragment balanced." It is "does the
  // document survive." So build the spliced article and compare its tag
  // signature to the original's. The corpus's real HTML is not perfectly
  // nested everywhere, so the test is EQUALITY OF SIGNATURE, not perfection:
  // whatever was already true stays true, and nothing new is broken.
  const TAGS = /<(\/?)(p|h1|h2|h3|h4|h5|h6|em|strong|blockquote|cite|a|ul|ol|li|div|span|section|article|aside|nav|figure)\b[^>]*?(\/?)>/g;
  const signature = (s) => {
    const st = []; const orphanClose = []; let mismatch = 0;
    for (const t of s.matchAll(TAGS)) {
      if (t[3] === '/') continue;                       // self-closing
      if (t[1] === '/') {
        if (!st.length) { orphanClose.push(t[2]); continue; }
        if (st[st.length - 1] === t[2]) st.pop();
        else { mismatch++; st.pop(); }
      } else st.push(t[2]);
    }
    return `open:${st.join(',')}|orphan:${orphanClose.join(',')}|mismatch:${mismatch}`;
  };
  const artA = html.indexOf('<article');
  const artB = html.lastIndexOf('</article>');
  const sliceOf = (doc, s, e) => doc.slice(s === -1 ? 0 : s, e === -1 ? doc.length : e + 10);
  const originalArticle = sliceOf(html, artA, artB);
  const splicedDoc = html.slice(0, start) + b.repl + html.slice(stop);
  const splicedArticle = sliceOf(splicedDoc, splicedDoc.indexOf('<article'), splicedDoc.lastIndexOf('</article>'));
  const sigBefore = signature(originalArticle), sigAfter = signature(splicedArticle);
  if (sigBefore !== sigAfter) {
    console.log(tag + ' FATAL splice breaks the article structure');
    console.log('        before  ' + sigBefore);
    console.log('        after   ' + sigAfter);
    fatal++; continue;
  }

  // GATE 5 — did the repair write a fresh certificate? (VOICE XXIII.1)
  const plain = b.repl.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const rx of CERTIFICATE) {
    const h = plain.match(rx);
    if (h) { console.log(`${tag} FATAL feeling-certificate in the REPLACEMENT: "${h[0].trim()}"`); fatal++; }
  }

  const w = s => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`${tag} ok  region ${w(region)}w -> ${w(b.repl)}w  links[${hrefs.join(' ') || 'none'}]`);
  if (APPLY) { fs.writeFileSync(file, html.slice(0, start) + b.repl + html.slice(stop)); console.log(`${tag} APPLIED`); }
}
console.log(`\n${'='.repeat(62)}\nFATAL ${fatal}   WARN ${warn}   ${APPLY ? 'APPLIED' : 'DRY RUN'}`);
process.exit(fatal ? 1 : 0);
