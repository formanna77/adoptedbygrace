const { chromium } = require('playwright-core');
const fs = require('fs'); const path = require('path'); const http = require('http');
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
  const ctx=await b.newContext({viewport:{width:1440,height:900}});
  const p=await ctx.newPage();
  await p.goto(`http://localhost:${port}/anxious-mind-brain-decides.html`,{waitUntil:'networkidle'});
  await p.waitForTimeout(800);
  const d = await p.evaluate(()=>{
    const el = document.querySelector('.ux-breadcrumbs');
    const list = document.querySelector('.ux-breadcrumbs-list');
    const cur = document.querySelector('.ux-breadcrumbs-current');
    const cs = getComputedStyle(el);
    const lcs = list ? getComputedStyle(list) : null;
    return {
      text: el.textContent.replace(/\s+/g,' ').trim(),
      height: el.getBoundingClientRect().height,
      width: el.getBoundingClientRect().width,
      lineHeight: cs.lineHeight,
      fontSize: cs.fontSize,
      padding: cs.padding,
      listFlexWrap: lcs ? lcs.flexWrap : null,
      curWhiteSpace: cur ? getComputedStyle(cur).whiteSpace : null,
      curDisplay: cur ? getComputedStyle(cur).display : null,
      curMaxWidth: cur ? getComputedStyle(cur).maxWidth : null,
      curText: cur ? cur.textContent : null,
      curRect: cur ? cur.getBoundingClientRect() : null,
      listRect: list ? list.getBoundingClientRect() : null,
      lis: Array.from(document.querySelectorAll('.ux-breadcrumbs-list li')).map(li=>({
        text: li.textContent.trim(),
        rect: li.getBoundingClientRect()
      }))
    };
  });
  console.log('DESKTOP:', JSON.stringify(d,null,2));
  await ctx.close(); await b.close(); server.close();
})();
