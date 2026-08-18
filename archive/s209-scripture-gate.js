#!/usr/bin/env node
/* S209 lead gate — verify EVERY quotation against scripture-niv.js ground truth.
   Agents check Scripture against the brief. The brief is not ground truth. */
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'..');
const raw=fs.readFileSync(path.join(ROOT,'scripture-niv.js'),'utf8');
const MAP={};
for(const m of raw.matchAll(/["']([1-3]?\s?[A-Z][A-Za-z]+ \d+:[\d,\-–\s]*\d)["']\s*:\s*"((?:[^"\\]|\\.)*)"/g)) MAP[m[1]]=m[2].replace(/\\"/g,'"');
console.log(`ground truth: ${Object.keys(MAP).length} verse entries\n`);

const norm=s=>s.replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&')
  .replace(/[‘’']/g,"'").replace(/[“”]/g,'"').replace(/[—–]/g,'-').replace(/\s+/g,' ').trim();
const NORMTRUTH={}; for(const k in MAP) NORMTRUTH[k]=norm(MAP[k]);

const OUT=path.join(__dirname,'s209-out');
let fails=0,checked=0,eyes=0;
for(const f of fs.readdirSync(OUT).filter(f=>f.endsWith('.txt'))){
 const txt=fs.readFileSync(path.join(OUT,f),'utf8');
 for(const b of txt.matchAll(/^=== PAGE: (.+?) ===[\s\S]*?REPLACEMENT:\r?\n([\s\S]*?)\r?\n=== END PAGE ===/gm)){
  const slug=b[1].trim(), repl=b[2];
  // A. cited blockquotes
  for(const q of repl.matchAll(/<blockquote>([\s\S]*?)<\/blockquote>/g)){
   const cite=(q[1].match(/<cite>([^<]+)<\/cite>/)||[])[1];
   const body=(q[1].match(/<p>([\s\S]*?)<\/p>/)||[])[1]||'';
   const quoted=norm(body).replace(/^"|"$/g,'');
   checked++;
   if(!cite){console.log(`FAIL ${slug}: blockquote without <cite>`);fails++;continue;}
   const key=Object.keys(MAP).find(k=>k.toLowerCase()===cite.trim().toLowerCase());
   if(!key){console.log(`FAIL ${slug}: "${cite}" NOT IN GROUND TRUTH — must not be quoted verbatim`);fails++;continue;}
   if(NORMTRUTH[key]===quoted){console.log(`  ok   ${slug}  ${cite}`);continue;}
   const segs=quoted.split(/\s*(?:\.\.\.|…)\s*/).filter(Boolean);
   if(segs.length>1&&segs.every(s=>NORMTRUTH[key].includes(s))){console.log(`  ok   ${slug}  ${cite} (elided; every segment verbatim)`);continue;}
   console.log(`FAIL ${slug}  ${cite}`);
   const a=NORMTRUTH[key],c=quoted; let i=0; while(i<a.length&&i<c.length&&a[i]===c[i])i++;
   console.log(`     diverges at char ${i}: want …${a.slice(Math.max(0,i-25),i+45)}…`);
   console.log(`                            got  …${c.slice(Math.max(0,i-25),i+45)}…`);
   fails++;
  }
  // B. inline quotations (straight or curly), prose only, >=25 chars, no tags inside
  const stripped=repl.replace(/<blockquote>[\s\S]*?<\/blockquote>/g,'');
  for(const m of stripped.matchAll(/["“]([^"“”<>]{25,})["”]/g)){
   const q=norm(m[1]).replace(/[.,;:]$/,'');
   const hit=Object.keys(MAP).find(k=>NORMTRUTH[k].includes(q)||NORMTRUTH[k].includes(q.replace(/[!?.]$/,'')));
   if(hit){console.log(`  ok   ${slug}  inline verbatim <- ${hit}`);checked++;}
   else{console.log(`  eyes ${slug}  inline quote not in ground truth (may be the page's own words): "${q.slice(0,95)}"`);eyes++;}
  }
 }
}
console.log(`\n${'='.repeat(60)}\nchecked ${checked} quotation(s) — FAIL ${fails}, needs-eyes ${eyes}`);
process.exit(fails?1:0);
