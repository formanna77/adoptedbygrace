#!/usr/bin/env node
/**
 * s195-render-check.js — PRIORITY 0.5, CLAUDE.md PRESENTATION INTEGRITY law 5.
 *
 * "THE VALIDATOR CANNOT SEE THE PAGE. OPEN IT."
 *
 * Fifteen static checks pass green while the wordmark sits on top of the first
 * nav link, or 347 articles render in Times New Roman. Neither is findable by
 * grep. Only by loading the page in a real browser and looking at it.
 *
 * This loads one page of each archetype at a narrow desktop width (~1200px,
 * inside the 1181-1400px nav band that S194-infra had to retune by measurement)
 * and a wide one, and asserts:
 *   1. Playfair Display + Inter actually LOADED (document.fonts.check)
 *   2. the h1 is actually RENDERING in Playfair, not falling back to Times
 *   3. the nav wordmark does not overlap the first nav link (getBoundingClientRect)
 *   4. no nav item has wrapped to a second row
 *   5. nothing overflows the viewport horizontally
 *
 * HOW TO RUN (from the repo root):
 *
 *     npm i puppeteer-core
 *     node archive/s195-render-check.js
 *
 * It drives the Chrome already installed on the machine — it does NOT download
 * one. On macOS it finds Chrome automatically; elsewhere set CHROME_PATH.
 *
 * S195 NOTE — THIS CHECK IS OWED, NOT DONE. It could not be executed in S195:
 * the agent sandbox is arm64 Linux and Puppeteer's bundled Chrome is x86-64
 * (`Syntax error: "(" unexpected` is the shell trying to run an x86 ELF), and
 * the Claude-in-Chrome extension was not connected. The script is written,
 * committed and ready. RUN IT FIRST THING IN S196.
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const chromePath = CANDIDATES.find(p => { try { return fs.existsSync(p); } catch { return false; } });
if (!chromePath) {
  console.error('No Chrome/Chromium found. Set CHROME_PATH=/path/to/chrome and re-run.');
  console.error('Tried:\n  ' + CANDIDATES.join('\n  '));
  process.exit(2);
}
console.log(`Driving: ${chromePath}\n`);

let puppeteer;
try { puppeteer = require('puppeteer-core'); }
catch { try { puppeteer = require('puppeteer'); }
  catch { console.error('Install a driver first:  npm i puppeteer-core'); process.exit(2); } }

const ROOT = path.resolve(__dirname, '..');

const ARCHETYPES = [
  ['article',     'theologian-owen.html'],
  ['article',     'shattered-lens-taught-wrong.html'],
  ['hub',         'devotionals.html'],
  ['homepage',    'index.html'],
  ['widget',      'the-golden-chain.html'],
  ['printable',   'printable-the-golden-chain.html'],
];

const WIDTHS = [1196, 1600];   // 1196 is INSIDE the retuned 1181-1400 nav band

const probe = () => {
  const out = { errors: [], notes: [] };

  // 1 + 2 — fonts loaded AND actually applied
  out.playfairLoaded = document.fonts.check('700 2rem "Playfair Display"');
  out.interLoaded    = document.fonts.check('400 1rem "Inter"');
  const h1 = document.querySelector('h1');
  out.h1Font = h1 ? getComputedStyle(h1).fontFamily : '(no h1)';
  const body = document.body;
  out.bodyFont = getComputedStyle(body).fontFamily;
  if (!out.playfairLoaded) out.errors.push('Playfair Display did NOT load — headings are falling back');
  if (!out.interLoaded)    out.errors.push('Inter did NOT load — body is falling back to Arial');
  if (h1 && /Times|serif$/i.test(out.h1Font) && !/Playfair/i.test(out.h1Font))
    out.errors.push('h1 computed font has no Playfair: ' + out.h1Font);

  // 3 — wordmark vs first nav link overlap
  const mark = document.querySelector('.nav-site-name');
  const links = [...document.querySelectorAll('.nav-links a')]
    .filter(a => a.offsetParent !== null);
  if (mark && links.length) {
    const m = mark.getBoundingClientRect();
    const first = links[0].getBoundingClientRect();
    out.wordmarkRight = Math.round(m.right);
    out.firstLinkLeft = Math.round(first.left);
    out.gap = Math.round(first.left - m.right);
    if (out.gap < 0) out.errors.push(`WORDMARK OVERLAPS first nav link by ${-out.gap}px`);
    else if (out.gap < 4) out.notes.push(`wordmark clear by only ${out.gap}px`);

    // 4 — nav wrapped to a second row?
    const tops = new Set(links.map(a => Math.round(a.getBoundingClientRect().top / 5) * 5));
    out.navRows = tops.size;
    out.navItems = links.length;
    if (tops.size > 1) out.errors.push(`nav wrapped onto ${tops.size} rows (${links.length} visible items)`);
  } else {
    out.notes.push('no desktop nav visible at this width');
  }

  // 5 — horizontal overflow
  out.scrollW = document.documentElement.scrollWidth;
  out.clientW = document.documentElement.clientWidth;
  if (out.scrollW > out.clientW + 1)
    out.errors.push(`horizontal overflow: scrollWidth ${out.scrollW} > clientWidth ${out.clientW}`);

  return out;
};

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });
  let fail = 0, ran = 0;

  for (const [kind, file] of ARCHETYPES) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) { console.log(`  SKIP  ${file} (not found)`); continue; }

    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 900 });
      await page.goto('file://' + full, { waitUntil: 'networkidle2', timeout: 30000 });
      try { await page.evaluate(() => document.fonts.ready); } catch (e) {}
      const r = await page.evaluate(probe);
      ran++;

      const bad = r.errors.length > 0;
      if (bad) fail++;
      console.log(`\n${bad ? 'FAIL' : ' OK '}  [${kind}] ${file} @ ${w}px`);
      console.log(`      fonts: Playfair=${r.playfairLoaded} Inter=${r.interLoaded}`);
      console.log(`      h1 -> ${String(r.h1Font).slice(0, 60)}`);
      if (r.gap !== undefined)
        console.log(`      nav: wordmark ends ${r.wordmarkRight}px, first link at ${r.firstLinkLeft}px, gap ${r.gap}px, ${r.navItems} items on ${r.navRows} row(s)`);
      console.log(`      layout: scrollW ${r.scrollW} / clientW ${r.clientW}`);
      r.errors.forEach(e => console.log(`      ERROR: ${e}`));
      r.notes.forEach(n  => console.log(`      note:  ${n}`));

      await page.close();
    }
  }

  await browser.close();
  console.log(`\n${'='.repeat(56)}`);
  console.log(fail === 0
    ? `RENDER CHECK CLEAN — ${ran} page-loads, 0 failures`
    : `RENDER CHECK: ${fail} of ${ran} page-loads FAILED`);
  console.log('='.repeat(56));
  process.exit(fail ? 1 : 0);
})();
