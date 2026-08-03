#!/usr/bin/env node
/**
 * s196-render-check.js — CLAUDE.md PRESENTATION INTEGRITY law 5.
 *
 *   "THE VALIDATOR CANNOT SEE THE PAGE. OPEN IT."
 *
 * S195 wrote law 5 and could not obey it: the agent sandbox is arm64 Linux and
 * Puppeteer's bundled Chrome is x86-64, so `archive/s195-render-check.js` (which
 * drives a Mac's installed Chrome via puppeteer-core) has never run in-sandbox.
 *
 * THIS version runs entirely inside the sandbox and tests THE REPO, not the
 * deployed site — which matters, because the deployed site always lags the work
 * of the session doing the checking.
 *
 * HOW IT WORKS
 *   1. Serves the repo root over plain HTTP on 127.0.0.1 (so the site's absolute
 *      asset paths — /global.css, /nav.js — resolve; file:// URLs do not).
 *   2. Drives Playwright's arm64 Chromium build.
 *   3. Loads one page of every archetype at 1196px (deliberately inside the
 *      retuned 1181-1400px nav band) and at 1600px.
 *
 * WHAT IT ASSERTS
 *   1. Playfair Display and Inter actually LOADED   (document.fonts.check)
 *   2. the h1 RENDERS in Playfair — not falling back to Times
 *   3. body copy RENDERS in Inter — not falling back to Arial/Helvetica
 *   4. the nav wordmark does not overlap the first nav link (bounding boxes)
 *   5. no nav item has wrapped to a second row
 *   6. nothing overflows the viewport horizontally
 *   7. no element renders above the nav in document flow (the S196 finding:
 *      a bare <div class="progress-bar"> resolves to the quiz track, which is
 *      NOT position:fixed, and painted an empty 8px gold band over the top of
 *      104 pages)
 *
 * SETUP (once per sandbox — Chrome for Testing has no arm64 Linux build, but
 * Playwright does):
 *
 *     cd /tmp && npm i playwright-core @playwright/browser-chromium
 *     cd /tmp/libs && apt-get download libxdamage1 && dpkg-deb -x libxdamage1*.deb ./x
 *
 * RUN (from the repo root):
 *
 *     LD_LIBRARY_PATH=/tmp/libs/x/usr/lib/aarch64-linux-gnu \
 *       node archive/s196-render-check.js
 *
 * Exits non-zero if any assertion fails.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname, '..');
const PORT = 8731;

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
  '.txt': 'text/plain', '.xml': 'application/xml',
};

// One page of every archetype on the site.
const PAGES = [
  ['article',    '/theologian-owen.html'],
  ['article2',   '/reformed-apologetics-moral-argument.html'],
  ['hub',        '/theologians.html'],
  ['homepage',   '/index.html'],
  ['widget',     '/the-golden-chain.html'],
  ['printable',  '/printable-five-points.html'],
];

const WIDTHS = [1196, 1600];

function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      let file = path.join(ROOT, p);
      if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); return res.end('not found');
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

const SERIF_FALLBACKS = /^(Times|Times New Roman|Liberation Serif|Tinos|DejaVu Serif|serif)$/i;
const SANS_FALLBACKS = /^(Arial|Helvetica|Liberation Sans|Arimo|DejaVu Sans|sans-serif)$/i;

async function main() {
  const { chromium } = require('/tmp/node_modules/playwright-core');
  const exe = path.join(os.homedir(), '.cache/ms-playwright/chromium-1234/chrome-linux/chrome');

  const server = await serve();
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

  const failures = [];
  const notes = [];

  for (const [archetype, url] of PAGES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const tag = `${archetype} @${width}px`;
      try {
        await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(400);

        const r = await page.evaluate(() => {
          const out = {};
          const cs = el => el ? getComputedStyle(el) : null;

          out.playfairLoaded = document.fonts.check('700 2rem "Playfair Display"');
          out.interLoaded = document.fonts.check('400 1rem "Inter"');

          const h1 = document.querySelector('h1');
          out.h1Exists = !!h1;
          if (h1) {
            out.h1Family = cs(h1).fontFamily;
            // What is ACTUALLY painting, not what was requested.
            out.h1Rendered = (document.fonts.check(`${cs(h1).fontWeight} ${cs(h1).fontSize} "Playfair Display"`));
          }
          const p = document.querySelector('article p, main p, body p');
          if (p) out.pFamily = cs(p).fontFamily;

          // nav geometry
          const wordmark = document.querySelector('.nav-logo, .logo, .nav-brand, header a[class*="logo"]');
          // NOTE (S196): the wordmark is vertically CENTERED in the 51px bar
          // (top=12) while the nav links are full-height (top=0). Counting it as
          // a row makes every page on the site report a phantom second row.
          // Measured, not reasoned about. Exclude it.
          const links = Array.from(document.querySelectorAll('.nav-links a, nav a')).filter(a => {
            const b = a.getBoundingClientRect();
            if (a.classList.contains('nav-site-name')) return false;
            return b.width > 0 && b.height > 0 && b.top < 200;
          });
          out.navLinkCount = links.length;
          if (wordmark && links.length) {
            const w = wordmark.getBoundingClientRect();
            const f = links.find(a => !wordmark.contains(a) && a !== wordmark);
            if (f) {
              const b = f.getBoundingClientRect();
              out.overlapPx = Math.max(0, Math.min(w.right, b.right) - Math.max(w.left, b.left));
              out.verticallyOverlapping = !(w.bottom <= b.top || b.bottom <= w.top);
            }
          }
          // nav wrap: more than one distinct top-offset row among nav links
          const tops = [...new Set(links.map(a => Math.round(a.getBoundingClientRect().top / 6) * 6))];
          out.navRows = tops.length;

          out.scrollWidth = document.documentElement.scrollWidth;
          out.clientWidth = document.documentElement.clientWidth;

          // THE STRAY BAND CHECK (S196 finding). An element with no text and no
          // children has nothing to say, so any visible height it occupies in
          // normal flow is a band painted across the page by accident. This is
          // exactly how a bare <div class="progress-bar"></div> — which resolves
          // to the QUIZ track (8px, gold-tinted, NOT position:fixed), not to the
          // reading bar — laid an empty gold stripe under the nav on 104 pages
          // while all fifteen static checks stayed green.
          out.strayBands = [];
          document.querySelectorAll('body *').forEach(el => {
            if (el.children.length || (el.textContent || '').trim()) return;
            const st = getComputedStyle(el);
            if (st.position === 'fixed' || st.position === 'absolute') return;
            if (st.display === 'none' || st.visibility === 'hidden') return;
            if (/^(br|hr|img|input|svg|path|iframe|canvas|source|track)$/i.test(el.tagName)) return;
            const b = el.getBoundingClientRect();
            if (b.height > 2 && b.width > 200) {
              out.strayBands.push(`${el.tagName.toLowerCase()}.${el.className || '(no class)'} ${Math.round(b.width)}x${Math.round(b.height)} @top=${Math.round(b.top)}`);
            }
          });
          return out;
        });

        const fail = m => failures.push(`  [${tag}] ${m}`);

        if (!r.playfairLoaded) fail('Playfair Display did NOT load');
        if (!r.interLoaded) fail('Inter did NOT load');
        if (r.h1Exists) {
          const first = r.h1Family.split(',')[0].replace(/['"]/g, '').trim();
          if (SERIF_FALLBACKS.test(first)) fail(`h1 is falling back to a system serif: ${r.h1Family}`);
          if (!r.h1Rendered) fail(`h1 requests Playfair but that face is not available at its weight/size (${r.h1Family})`);
        }
        if (r.pFamily) {
          const first = r.pFamily.split(',')[0].replace(/['"]/g, '').trim();
          if (SANS_FALLBACKS.test(first)) fail(`body copy is falling back to a system sans: ${r.pFamily}`);
        }
        if (r.verticallyOverlapping && r.overlapPx > 0) {
          fail(`wordmark OVERLAPS the first nav link by ${Math.round(r.overlapPx)}px`);
        }
        if (r.navRows > 1) fail(`nav has wrapped to ${r.navRows} rows`);
        if (r.scrollWidth > r.clientWidth + 1) {
          fail(`horizontal overflow: scrollWidth ${r.scrollWidth} > viewport ${r.clientWidth}`);
        }
        if (r.strayBands && r.strayBands.length) {
          fail(`empty element(s) painting a visible band in normal flow: ${r.strayBands.join(' | ')}`);
        }

        notes.push(`  ${tag.padEnd(22)} links=${r.navLinkCount} rows=${r.navRows} sw=${r.scrollWidth}/${r.clientWidth} h1=${(r.h1Family||'-').split(',')[0]}`);
      } catch (e) {
        failures.push(`  [${tag}] THREW: ${e.message.split('\n')[0]}`);
      }
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log('\nRENDER CHECK — measured in a real browser against the repo\n');
  notes.forEach(n => console.log(n));
  if (failures.length) {
    console.log(`\n✖ ${failures.length} RENDER FAILURE(S):\n`);
    failures.forEach(f => console.log(f));
    process.exit(1);
  }
  console.log('\n✔ RENDER CHECK PASSED — fonts load, nothing overlaps, nothing overflows, nothing paints above the nav.\n');
}

main().catch(e => { console.error(e); process.exit(1); });
