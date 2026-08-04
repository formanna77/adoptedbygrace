#!/usr/bin/env node
/**
 * MOBILE RENDER CHECK — measured in a real browser at phone and tablet width
 *
 * Companion to archive/s196-render-check.js, which measures 1196px and 1600px.
 * Both are needed. This one exists because of what the desktop-only check could
 * not see (S198, 2026-08-04):
 *
 *   psychology-why-we-resist  —  .pairing-scripture carried `white-space: nowrap`
 *   from a design where it held a short verse reference. All 15 live uses hold
 *   real prose (73-748 chars), so whole Scripture quotations rendered on one
 *   unbreakable line 3,182px wide. On a 390px phone the reader saw about 12% of
 *   Romans 1:18 and had no way to know the rest was there.
 *
 *   the-golden-chain  —  .chain-cta is a grid inside a flex parent; a flex item's
 *   default min-width:auto refuses to shrink below min-content, which
 *   minmax(250px,1fr) computes as 782px. 432px of the closing call-to-action
 *   sat off-screen.
 *
 * WHY NO CHECK COULD HAVE CAUGHT THESE
 * ------------------------------------
 * global.css sets `body { overflow-x: hidden }`. That does not prevent overflow;
 * it CONCEALS it. documentElement.scrollWidth reports zero no matter how far
 * content spills past the right edge — no scrollbar, no warning, the text simply
 * gone. So this tool must NOT trust scrollWidth. It walks every painted element
 * and compares getBoundingClientRect().right against the viewport directly.
 *
 * READ BEFORE REWRITING. Intentional full-bleed (e.g. `.mirror-progress` uses
 * `margin: 0 -1.5rem` to run a sticky bar to the container edge) will show a few
 * px past the viewport and is CORRECT — its inner track carries its own padding,
 * so nothing is clipped. Elements under a deliberate `overflow-x: auto` ancestor
 * are already excluded. Triage, not verdict.
 *
 * Usage:
 *   node archive/s198-mobile-check.js               # widgets + a 1-in-9 sample
 *   node archive/s198-mobile-check.js --all         # every page (slow)
 *   node archive/s198-mobile-check.js <page.html>   # one page
 *
 * Needs the same Playwright setup as s196-render-check.js; see the S198 kickoff.
 * Exits 1 if anything overflows, so it can gate a session.
 *
 * RUNTIME: roughly 8-12 minutes for the default ~97-page sample across both
 * widths. Run it in the background and read the log; a single page finishes in
 * about 10 seconds if you only need to re-verify one fix.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8917;
const WIDTHS = [390, 768];
const TOLERANCE = 12;   // px past the viewport before it counts; full-bleed sits under this

let chromium;
try {
  chromium = require('playwright-core').chromium;
} catch {
  console.error('playwright-core not found. See the kickoff for the sandbox setup:');
  console.error('  cd /tmp && npm i playwright-core @playwright/browser-chromium');
  console.error('  node /tmp/node_modules/@playwright/browser-chromium/install.js');
  process.exit(2);
}

function findExecutable() {
  if (process.env.EXE) return process.env.EXE;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH ||
    path.join(process.env.HOME || '', '.cache', 'ms-playwright');
  if (!fs.existsSync(base)) return undefined;
  for (const d of fs.readdirSync(base)) {
    for (const rel of ['chrome-linux/chrome', 'chrome-linux/headless_shell']) {
      const p = path.join(base, d, rel);
      if (fs.existsSync(p)) return p;
    }
  }
  return undefined;
}

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
};

function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let u = decodeURIComponent(req.url.split('?')[0]);
      if (u === '/') u = '/index.html';
      let f = path.join(ROOT, u);
      if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
      if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(fs.readFileSync(f));
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

function pickPages() {
  const arg = process.argv.find(a => a.endsWith('.html'));
  const all = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '_nav-template.html');
  if (arg) return [arg];
  if (process.argv.includes('--all')) return all;

  // Widgets and CSS-diagram pages carry the hand-written layout, so they break
  // first and are always included. The rest is a spread across the corpus.
  const priority = [
    'fork-in-the-road', 'scripture-tsunami', 'the-60-second-case', 'the-breath-prayer',
    'the-fork', 'the-golden-chain', 'the-mirror', 'the-objection-collapse',
    'the-scripture-cascade', 'question-visual-theology', 'the-two-arms', 'connections',
    'explore-map', 'verse-explorer', 'belief-assessment', 'objection-builder',
    'verse-navigator', 'quiz', 'quote-cards', 'search', 'index', 'all-content',
    'psychology-why-we-resist', 'psychology-cognitive-biases', 'psychology-offense-of-grace',
  ].map(s => s + '.html').filter(f => all.includes(f));

  const rest = all.filter(f => !priority.includes(f));
  return [...priority, ...rest.filter((_, i) => i % 9 === 0)];
}

(async () => {
  const server = await serve();
  const browser = await chromium.launch({ executablePath: findExecutable(), args: ['--no-sandbox'] });
  const pages = pickPages();

  console.log('\nMOBILE RENDER CHECK — measured in a real browser, not reasoned about');
  console.log(`  ${pages.length} page(s) x ${WIDTHS.join('px, ')}px  ·  tolerance ${TOLERANCE}px`);
  console.log('  NOTE: body{overflow-x:hidden} makes scrollWidth useless here; this');
  console.log('  walks element rects instead.\n');

  const offenders = [];

  for (const width of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width, height: 844 },
      isMobile: width < 600,
      hasTouch: width < 600,
      deviceScaleFactor: width < 600 ? 3 : 2,
    });

    let n = 0;
    for (const f of pages) {
      n++;
      // Progress on one rewritten line. A long-running check that prints nothing
      // is indistinguishable from a hung one — which cost this tool two restarts
      // before anyone could tell the difference.
      process.stdout.write(`\r  ${width}px  [${n}/${pages.length}]  ${f.slice(0, 44).padEnd(46)}`);
      try {
        await page.goto(`http://127.0.0.1:${PORT}/${f}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await page.waitForTimeout(250);

        // ORDER MATTERS HERE, and it is the difference between 2 seconds and a
        // hang. The first draft called getComputedStyle() on every element
        // before looking at its rect. getComputedStyle forces style resolution
        // and is one of the most expensive calls in the DOM; on all-content.html
        // (611 cards, ~20k nodes) it never finished. getBoundingClientRect is
        // cheap by comparison, and it rejects >99% of elements immediately — so
        // measure first, and only ask for computed style about the handful of
        // candidates that are actually off-screen.
        const found = await page.evaluate(([vw, tol]) => {
          const out = [];
          const els = document.querySelectorAll('body *');
          for (const el of els) {
            const r = el.getBoundingClientRect();
            if (r.width <= 0 || r.height <= 0) continue;
            if (r.right <= vw + tol) continue;

            const cs = getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;

            // A deliberate horizontal scroller is not a defect.
            let p = el.parentElement, scrolls = false;
            while (p && p !== document.body) {
              const c = getComputedStyle(p);
              if (c.overflowX === 'auto' || c.overflowX === 'scroll') { scrolls = true; break; }
              p = p.parentElement;
            }
            if (scrolls) continue;

            const cls = typeof el.className === 'string' && el.className.trim()
              ? '.' + el.className.trim().split(/\s+/)[0] : '';
            out.push({ sel: el.tagName.toLowerCase() + cls, right: Math.round(r.right), w: Math.round(r.width) });
          }
          const seen = new Set();
          return out.filter(o => !seen.has(o.sel) && seen.add(o.sel))
                    .sort((a, b) => b.right - a.right).slice(0, 3);
        }, [width, TOLERANCE]);

        if (found.length) offenders.push({ f, width, worst: found[0].right, items: found });
      } catch (e) {
        console.log(`  ! ${f} @${width}px — ${e.message.split('\n')[0]}`);
      }
    }
    process.stdout.write(`\r  ${width}px  [${pages.length}/${pages.length}]  done${' '.repeat(46)}\n`);
    await page.close();
  }
  console.log('');

  if (offenders.length) {
    console.log(`  ${offenders.length} page/width combination(s) push content off-screen:\n`);
    offenders.sort((a, b) => b.worst - a.worst).forEach(o => {
      console.log(`  ${o.f} @${o.width}px — ${o.worst - o.width}px hidden past the right edge`);
      o.items.forEach(i => console.log(`       ${i.sel}  width=${i.w}  right=${i.right}`));
    });
    console.log('\n  Read each one before rewriting: intentional full-bleed is legitimate.');
    console.log('  Common causes: white-space:nowrap on a prose block; a grid with');
    console.log('  minmax(Npx,1fr) inside a flex parent (use min(Npx,100%) + min-width:0);');
    console.log('  a fixed px width; a table or <pre> without overflow-x:auto.');
  } else {
    console.log('  PASSED — nothing pushed off-screen at any tested width.');
  }

  await browser.close();
  server.close();
  process.exit(offenders.length ? 1 : 0);
})();
