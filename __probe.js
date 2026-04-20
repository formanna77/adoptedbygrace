const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const http = require('http');
const EXEC='/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite/node_modules/playwright-core/.local-browsers/chromium_headless_shell-1217/chrome-linux/headless_shell';
const REPO = '/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite';
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
const server = http.createServer((req,res)=>{
  let u = decodeURIComponent((req.url||'/').split('?')[0]); if(u.endsWith('/'))u+='index.html';
  let abs=path.join(REPO,u); if(!fs.existsSync(abs)&&fs.existsSync(abs+'.html'))abs+='.html';
  if(!fs.existsSync(abs)||fs.statSync(abs).isDirectory()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(abs).toLowerCase()]||'text/plain'});
  fs.createReadStream(abs).pipe(res);
});
(async()=>{
  await new Promise(r=>server.listen(0,r));
  const port=server.address().port;
  const b=await chromium.launch({executablePath:EXEC,args:['--no-sandbox']});
  for(const t of ['anxious-mind-brain-decides.html','question-romans9.html','golden-chain.html']){
    const ctx=await b.newContext({viewport:{width:1440,height:900}});
    const p=await ctx.newPage();
    p.on('pageerror',e=>console.log(t,'PAGEERR',e.message));
    p.on('console',m=>{if(m.type()==='error')console.log(t,'CONSOLE',m.text());});
    await p.goto(`http://localhost:${port}/${t}`,{waitUntil:'networkidle'});
    await p.waitForTimeout(800);
    const diag = await p.evaluate(()=>({
      hasBread: !!document.querySelector('.ux-breadcrumbs'),
      hasHero: !!document.querySelector('header.page-hero'),
      hasArticle: !!document.querySelector('article.article-body'),
      path: location.pathname,
      readyState: document.readyState,
    }));
    console.log(t, JSON.stringify(diag));
    await ctx.close();
  }
  await b.close(); server.close();
})();
