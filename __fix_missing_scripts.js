const fs = require('fs'); const path = require('path');
const ROOT = '/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite';
function walk(d,out=[]){for(const e of fs.readdirSync(d)){
  if(e.startsWith('.'))continue;
  if(e==='node_modules'||e==='Reformed Sources')continue;
  const p=path.join(d,e); const st=fs.statSync(p);
  if(st.isDirectory()) walk(p,out);
  else if(e.endsWith('.html')) out.push(p);
}return out;}
function stripComments(s){return s.replace(/<!--[\s\S]*?-->/g,'');}

let fixed=0;
for(const f of walk(ROOT)){
  let raw = fs.readFileSync(f,'utf8');
  const stripped = stripComments(raw);
  const isArticleOrHub = /class="page-hero"|class="article-body"|class="hub-container"|class="hub-hero"/.test(stripped);
  if(!isArticleOrHub) continue;
  const hasNav = /src=["']\/nav\.js["']/.test(stripped);
  const hasUx  = /src=["']\/ux-enhancements\.js["']/.test(stripped);
  if(hasNav && hasUx) continue;

  const toAdd = [];
  if(!hasNav) toAdd.push('    <script src="/nav.js"></script>');
  if(!hasUx)  toAdd.push('    <script src="/ux-enhancements.js" defer></script>');
  const block = toAdd.join('\n') + '\n';

  // Try inserting before </body>. Use last occurrence to be safe.
  const idx = raw.lastIndexOf('</body>');
  if(idx === -1){ console.log('SKIP (no </body>):', path.relative(ROOT,f)); continue; }
  raw = raw.slice(0, idx) + block + raw.slice(idx);
  fs.writeFileSync(f, raw);
  fixed++;
  console.log('fixed:', path.relative(ROOT,f), '—', toAdd.map(s=>s.includes('nav.js')?'nav':'ux').join('+'));
}
console.log('\n'+fixed+' file(s) fixed.');
