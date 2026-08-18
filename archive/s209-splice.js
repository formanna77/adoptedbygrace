#!/usr/bin/env node
/* S209 factory splicer + lead gate.
   Refuses on count(anchor)!=1. Whitespace-normalised matching.
   node archive/s209-splice.js [--apply]   (default = dry run) */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const OUT = path.join(__dirname, 's209-out');
const MANIFEST = new Set(fs.readFileSync(path.join(__dirname,'factory-briefs','PAGE-MANIFEST.txt'),'utf8').split('\n').map(s=>s.trim()).filter(Boolean));

function rxOf(s){
  const esc = s.trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return new RegExp(esc.replace(/\s+/g,'\\s+'),'g');
}
function countOf(hay, needle){ const m = hay.match(rxOf(needle)); return m ? m.length : 0; }

const blocks = [];
for (const f of fs.readdirSync(OUT).filter(f=>f.endsWith('.txt'))){
  const txt = fs.readFileSync(path.join(OUT,f),'utf8');
  const re = /^=== PAGE: (.+?) ===\r?\nANCHOR: ([\s\S]*?)\r?\nEND_ANCHOR: ([\s\S]*?)\r?\nREPLACEMENT:\r?\n([\s\S]*?)\r?\n=== END PAGE ===/gm;
  let m; while ((m = re.exec(txt))) blocks.push({src:f, slug:m[1].trim(), anchor:m[2], end:m[3], repl:m[4]});
}
console.log(`parsed ${blocks.length} block(s) from ${OUT}\n`);

let fatal = 0, warn = 0;
for (const b of blocks){
  const file = path.join(ROOT, b.slug + '.html');
  const tag = `[${b.slug}]`;
  if (!fs.existsSync(file)){ console.log(`${tag} FATAL no such file`); fatal++; continue; }
  const html = fs.readFileSync(file,'utf8');

  const ca = countOf(html, b.anchor), ce = countOf(html, b.end);
  if (ca !== 1 || ce !== 1){ console.log(`${tag} FATAL anchor=${ca} end=${ce} (need 1/1)`); fatal++; continue; }

  const ai = html.search(rxOf(b.anchor));
  const em = rxOf(b.end); em.lastIndex = ai; const emm = em.exec(html);
  if (!emm || emm.index < ai){ console.log(`${tag} FATAL end_anchor precedes anchor`); fatal++; continue; }
  const start = ai, stop = emm.index + emm[0].length;
  const region = html.slice(start, stop);
  const rest = html.slice(0,start) + html.slice(stop);

  // --- GATE 1: article boundary. Region must sit inside <article ...> and above furniture.
  const artOpen = html.indexOf('<article');
  const artClose = html.lastIndexOf('</article>');
  if (artOpen !== -1 && (start < artOpen || (artClose !== -1 && stop > artClose))){
    console.log(`${tag} FATAL region escapes <article>`); fatal++; continue;
  }
  for (const furn of ['keep-reading','hub-grid','cross-links','related-articles','phase-nav','continue-journey']){
    if (region.includes(`class="${furn}`)){ console.log(`${tag} FATAL region contains furniture .${furn}`); fatal++; }
  }
  // --- GATE 2: links
  const hrefs = [...b.repl.matchAll(/href="\/([a-z0-9\-]+)"/g)].map(m=>m[1]);
  for (const h of hrefs) if (!MANIFEST.has(h)){ console.log(`${tag} FATAL broken link -> /${h}`); fatal++; }
  const dupIn = hrefs.filter((h,i)=>hrefs.indexOf(h)!==i);
  if (dupIn.length) { console.log(`${tag} FATAL self-duplicate link(s): ${[...new Set(dupIn)].join(', ')}`); fatal++; }
  for (const h of new Set(hrefs)){
    // prose link already present OUTSIDE the replaced region?
    const outside = [...rest.matchAll(new RegExp(`href="/${h}"`,'g'))].length;
    if (outside) {
      // is it inside a card rail (allowed) or in prose (CHECK 11 violation)?
      let proseDup = 0;
      for (const mm of rest.matchAll(new RegExp(`href="/${h}"`,'g'))){
        const before = rest.slice(Math.max(0,mm.index-1400), mm.index);
        const isCard = /class="(hub-card|cross-link|keep-reading-card|journey-mini-card|phase-nav-box|related-article)/.test(before.slice(-400)) || /<(nav|footer)\b/.test(before.slice(-1400).split(/<\/(nav|footer)>/).pop()||'');
        if (!isCard) proseDup++;
      }
      if (proseDup) { console.log(`${tag} WARN  /${h} may already be linked in prose (${proseDup}x) — dedupe after`); warn++; }
    }
  }
  // --- GATE 3: banned tokens
  const emoji = b.repl.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2700}-\u{27BF}]/gu);
  if (emoji) { console.log(`${tag} FATAL emoji: ${[...new Set(emoji)].join(' ')}`); fatal++; }
  if (/\(NIV\)/.test(b.repl)) { console.log(`${tag} FATAL "(NIV)" suffix`); fatal++; }
  if (/TL;?DR/i.test(b.repl)) { console.log(`${tag} FATAL TL;DR`); fatal++; }
  if (/class="(article-toc|section-nav)"/.test(b.repl)) { console.log(`${tag} FATAL banned nav class`); fatal++; }
  if (/<div|style=|class="(?!landing-line)/.test(b.repl)) { console.log(`${tag} WARN  new div/style/class in replacement`); warn++; }
  // --- GATE 4: balanced tags in replacement
  const st=[]; let bad=null;
  for (const mm of b.repl.matchAll(/<(\/?)(p|h2|h3|em|strong|blockquote|cite|a|ul|li|ol)\b[^>]*>/g)){
    if (mm[1]==='/'){ if (st.pop()!==mm[2]) bad = mm[2]; } else st.push(mm[2]);
  }
  if (bad || st.length){ console.log(`${tag} FATAL unbalanced tags (${bad||''} ${st.join(',')})`); fatal++; }

  const wOld = region.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
  const wNew = b.repl.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length;
  console.log(`${tag} ok  region ${wOld}w -> ${wNew}w  links[${hrefs.join(' ')||'none'}]`);

  if (APPLY){
    fs.writeFileSync(file, html.slice(0,start) + b.repl + html.slice(stop));
    console.log(`${tag} APPLIED`);
  }
}
console.log(`\n${'='.repeat(60)}\nFATAL ${fatal}   WARN ${warn}   ${APPLY?'APPLIED':'DRY RUN'}`);
process.exit(fatal ? 1 : 0);
