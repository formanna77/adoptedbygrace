const fs = require('fs'); const path = require('path');
const ROOT = '/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite';
function walk(d,out=[]){for(const e of fs.readdirSync(d)){
  if(e.startsWith('.'))continue;
  if(e==='node_modules'||e==='Reformed Sources')continue;
  const p=path.join(d,e); const st=fs.statSync(p);
  if(st.isDirectory()) walk(p,out);
  else if(e.endsWith('.html')) out.push(p);
}return out;}

// Strip HTML comments to avoid false positives in the nav template boilerplate
function stripComments(s){return s.replace(/<!--[\s\S]*?-->/g,'');}

const files = walk(ROOT);
const missing = { nav:[], ux:[], readingTime:[], scriptureNiv:[], quoteCard:[] };
// Only check pages that look like articles / content pages (have <header class="page-hero"> or <article class="article-body"> or hub-container)
for(const f of files){
  const raw = fs.readFileSync(f,'utf8');
  const s = stripComments(raw);
  const isArticleOrHub = /class="page-hero"|class="article-body"|class="hub-container"|class="hub-hero"/.test(s);
  if(!isArticleOrHub) continue;
  const rel = path.relative(ROOT,f);
  if(!/src=["']\/nav\.js["']/.test(s)) missing.nav.push(rel);
  if(!/src=["']\/ux-enhancements\.js["']/.test(s)) missing.ux.push(rel);
  if(!/src=["']\/reading-time\.js["']/.test(s) && /class="article-body"/.test(s)) missing.readingTime.push(rel);
  if(!/src=["']\/scripture-niv\.js["']/.test(s) && /class="article-body"/.test(s)) missing.scriptureNiv.push(rel);
  if(!/src=["']\/quote-card\.js["']/.test(s) && /class="article-body"/.test(s)) missing.quoteCard.push(rel);
}
console.log('missing nav.js:', missing.nav.length);
missing.nav.slice(0,50).forEach(f=>console.log('  '+f));
console.log('\nmissing ux-enhancements.js:', missing.ux.length);
missing.ux.slice(0,50).forEach(f=>console.log('  '+f));
console.log('\nmissing reading-time.js:', missing.readingTime.length);
missing.readingTime.slice(0,50).forEach(f=>console.log('  '+f));
console.log('\nmissing scripture-niv.js:', missing.scriptureNiv.length);
missing.scriptureNiv.slice(0,50).forEach(f=>console.log('  '+f));
console.log('\nmissing quote-card.js:', missing.quoteCard.length);
missing.quoteCard.slice(0,50).forEach(f=>console.log('  '+f));
