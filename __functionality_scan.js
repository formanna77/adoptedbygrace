/* Site-wide functionality scanner — jsdom-based.
 * Loads representative pages, executes their scripts (nav.js, ux-enhancements.js,
 * page-local inline scripts), simulates clicks on every interactive control,
 * and records console errors + failed interactions.
 */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const REPO = __dirname;
const INTERNAL_SCRIPTS = new Set([
  '/nav.js',
  '/ux-enhancements.js',
  '/global.js',
  '/reading-time.js',
  '/scripture-niv.js',
  '/scripture-popups.js',
  '/quote-card.js',
  '/share-bar.js',
  '/content-manifest.js',
  '/search-concepts.js',
  '/search-index.js',
]);

// Auto-discover every HTML page in the repo root, except partials/redirect stubs.
// Excluded:
//   _nav-template.html — partial fragment, not a page
//   404.html           — error page, served by Netlify; nav not required
//   creeds-confessions.html, analogies-illustrations.html — meta-refresh
//                        redirect stubs, intentionally have no nav.js
const EXCLUDE = new Set([
  '_nav-template.html',
  '404.html',
  'creeds-confessions.html',
  'analogies-illustrations.html',
]);
const ALL_PAGES = fs.readdirSync(REPO)
  .filter(f => f.endsWith('.html') && !EXCLUDE.has(f))
  .sort();

// Batch support: --batch=START-END selects a slice (0-indexed, inclusive start,
// exclusive end) so the scan can be run across multiple 45-second bash calls.
// Results are appended to __scan_results.jsonl for later aggregation.
let batchStart = 0, batchEnd = ALL_PAGES.length;
for (const arg of process.argv.slice(2)) {
  const m = arg.match(/^--batch=(\d+)-(\d+)$/);
  if (m) { batchStart = +m[1]; batchEnd = +m[2]; }
}
const SAMPLE_PAGES = ALL_PAGES.slice(batchStart, batchEnd);

function exists(p) { try { fs.accessSync(p); return true; } catch(e) { return false; } }

async function loadPage(htmlFile) {
  const htmlPath = path.join(REPO, htmlFile);
  if (!exists(htmlPath)) return { file: htmlFile, skipped: 'missing' };
  const html = fs.readFileSync(htmlPath, 'utf8');

  const errors = [];
  const warnings = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push('jsdom:' + (e.message || e)));
  vc.on('error', (...a) => errors.push('console.error:' + a.map(String).join(' ')));
  vc.on('warn',  (...a) => warnings.push(a.map(String).join(' ')));

  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    url: 'http://localhost/' + htmlFile,
    virtualConsole: vc,
    resources: undefined, // never fetch — we inject manually
    beforeParse(window) {
      // Install stubs before any page scripts run
      window.IntersectionObserver = class { constructor(){} observe(){} unobserve(){} disconnect(){} };
      window.matchMedia = () => ({ matches:false, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} });
      window.scrollTo = () => {};
      // Return an empty-but-successful response so pages that fetch JSON
      // at startup don't spuriously throw — we're testing button wiring,
      // not data loading.
      window.fetch = () => Promise.resolve({ ok:true, status:200, json:()=>Promise.resolve([]), text:()=>Promise.resolve('[]') });
      try { window.HTMLElement.prototype.scrollIntoView = function(){}; } catch(e){}
      try {
        const stubCtx = {
          clearRect(){}, fillRect(){}, strokeRect(){}, fill(){}, stroke(){}, beginPath(){}, moveTo(){}, lineTo(){}, arc(){}, closePath(){}, scale(){}, save(){}, restore(){}, translate(){}, rotate(){}, drawImage(){}, putImageData(){}, getImageData(){return{data:[]};}, createLinearGradient(){return{addColorStop(){}};}, createRadialGradient(){return{addColorStop(){}};}, setLineDash(){}, measureText(){return{width:0};}, fillText(){}, strokeText(){},
          set fillStyle(v){}, set strokeStyle(v){}, set lineWidth(v){}, set font(v){}, set textAlign(v){}, set textBaseline(v){}, set globalAlpha(v){}, set lineCap(v){}, set lineJoin(v){}, set globalCompositeOperation(v){}
        };
        window.HTMLCanvasElement.prototype.getContext = function(){ return stubCtx; };
      } catch(e){}
    }
  });

  const { window } = dom;

  // Let the parser settle, then inject referenced internal scripts manually
  await new Promise(res => setTimeout(res, 20));

  // Gather unique script refs in order — query raw HTML (jsdom drops
  // <script src> tags when resource loading is disabled)
  const rawRefs = [];
  const srcRx = /<script[^>]+src=["']([^"']+)["']/g;
  let sm;
  while ((sm = srcRx.exec(html))) rawRefs.push(sm[1]);
  const scriptRefs = rawRefs.filter(s => s && s.startsWith('/') && INTERNAL_SCRIPTS.has(s.split('?')[0]));
  const seen = new Set();
  for (const ref of scriptRefs) {
    const clean = ref.split('?')[0];
    if (seen.has(clean)) continue;
    seen.add(clean);
    const localPath = path.join(REPO, clean.slice(1));
    if (!exists(localPath)) { errors.push('MISSING_SCRIPT:' + clean); continue; }
    try {
      const code = fs.readFileSync(localPath, 'utf8');
      const s = window.document.createElement('script');
      s.textContent = code;
      window.document.head.appendChild(s);
    } catch(e) {
      errors.push('RUNTIME_SCRIPT_ERR(' + clean + '):' + e.message);
    }
  }

  // Fire DOMContentLoaded (jsdom only fires for initial parse, not appended scripts)
  try {
    const evt = new window.Event('DOMContentLoaded', { bubbles: true, cancelable: false });
    window.document.dispatchEvent(evt);
  } catch(e) {}
  try {
    const evt2 = new window.Event('load', { bubbles: false, cancelable: false });
    window.dispatchEvent(evt2);
  } catch(e) {}

  await new Promise(res => setTimeout(res, 60));

  // === INTERACTION CHECKS ===
  const results = { file: htmlFile, errors, warnings, checks: {} };
  const doc = window.document;

  function click(el) {
    const ev = new window.Event('click', { bubbles: true, cancelable: true });
    el.dispatchEvent(ev);
  }

  // 1. Hamburger opens nav-links
  const hamb = doc.querySelector('.hamburger');
  const navLinks = doc.querySelector('.nav-links');
  if (hamb && navLinks) {
    click(hamb);
    results.checks.hamburger = navLinks.classList.contains('open') ? 'pass' : 'FAIL';
    // Close it again
    click(hamb);
  } else {
    results.checks.hamburger = hamb ? 'no-navlinks' : 'no-hamburger';
  }

  // 2. Mega-menu toggle
  const mmt = doc.getElementById('megaMenuToggle');
  const mega = doc.getElementById('megaMenu');
  if (mmt && mega) {
    click(mmt);
    results.checks.megaMenu = mega.classList.contains('open') ? 'pass' : 'FAIL';
    // Close via second click
    click(mmt);
  } else {
    results.checks.megaMenu = mmt ? 'no-megaMenu' : 'no-toggle';
  }

  // 3. Search toggle opens overlay
  // EXCEPTION: search.html intentionally focuses the on-page input instead
  // of opening the overlay (you're already on the search page).
  const st = doc.getElementById('searchToggle');
  const so = doc.getElementById('searchOverlay');
  if (htmlFile === 'search.html') {
    const pageInp = doc.getElementById('pageSearchInput');
    results.checks.searchOverlay = pageInp ? 'pass (page-search override)' : 'FAIL';
  } else if (st && so) {
    click(st);
    results.checks.searchOverlay = so.classList.contains('open') || so.classList.contains('active') ? 'pass' : 'FAIL';
    const sc = doc.getElementById('searchClose');
    if (sc) click(sc);
  } else {
    results.checks.searchOverlay = 'missing';
  }

  // 4. Scan all <button> and <a onclick> inline handlers for JS errors when clicked
  const buttons = Array.from(doc.querySelectorAll('button, a[onclick], [onclick]'));
  let inlineErr = 0, inlineClicks = 0;
  for (const btn of buttons.slice(0, 40)) { // cap to avoid runaway
    // Skip nav already-tested controls
    if (btn === hamb || btn === mmt || btn === st) continue;
    // Skip controls that trigger navigation (jsdom can't follow)
    const onc = btn.getAttribute && btn.getAttribute('onclick') || '';
    if (/discoverRandom|location\.(href|assign|replace)/.test(onc)) continue;
    if (btn.id === 'discoverBtn') continue;
    try {
      inlineClicks++;
      click(btn);
    } catch(e) {
      inlineErr++;
      errors.push('BTN_CLICK_ERR(' + (btn.id || btn.className || btn.tagName) + '):' + e.message);
    }
  }
  results.checks.buttonsClicked = inlineClicks + ' clicked, ' + inlineErr + ' errors';

  // 5. Mobile categories accordion should have built its content
  const mobileCats = doc.getElementById('mobileCategoriesAccordion');
  results.checks.mobileCats = mobileCats ? (mobileCats.children.length > 0 ? 'built' : 'EMPTY') : 'missing';

  // 6. Mega menu should have built its content
  results.checks.megaMenuBuilt = mega ? (mega.children.length > 0 ? 'built' : 'EMPTY') : 'missing';

  // 7. Page-specific interactive widgets
  // verse-explorer — has a search/filter input?
  if (htmlFile === 'verse-explorer.html') {
    const inp = doc.querySelector('#verseSearch, input[type=search], input[placeholder*=Search]');
    results.checks.verseSearch = inp ? 'present' : 'MISSING';
  }
  // fork-in-the-road — has window.forkRestart?
  if (htmlFile === 'fork-in-the-road.html') {
    results.checks.forkRestart = typeof window.forkRestart === 'function' ? 'defined' : 'MISSING';
  }
  // start-here-phase4 — toggleObj defined?
  if (htmlFile === 'start-here-phase4.html') {
    results.checks.toggleObj = typeof window.toggleObj === 'function' ? 'defined' : 'MISSING';
  }
  // index — loadSpotlight, discoverRandom defined?
  if (htmlFile === 'index.html') {
    results.checks.loadSpotlight = typeof window.loadSpotlight === 'function' ? 'defined' : 'MISSING';
    results.checks.discoverRandom = typeof window.discoverRandom === 'function' ? 'defined' : 'MISSING';
    results.checks.loadRecent = typeof window.loadRecent === 'function' ? 'defined' : 'MISSING';
    // Verify spotlight grid actually populated
    const grid = doc.getElementById('spotlightGrid');
    results.checks.spotlightPopulated = grid && grid.children.length > 0 ? 'yes' : 'EMPTY';
  }

  dom.window.close();
  return results;
}

function classify(r) {
  const { checks = {}, errors = [], fatal, skipped } = r;
  const failStates = ['FAIL', 'EMPTY', 'MISSING', 'missing', 'no-hamburger', 'no-toggle', 'no-navlinks', 'no-megaMenu'];
  const bad = Object.entries(checks).filter(([_,v]) => failStates.includes(v));
  const hasFatal = fatal || skipped;
  const significantErrors = errors.filter(e =>
    !e.includes('Could not load') &&
    !e.includes('resource') &&
    !e.includes('CSSStyleDeclaration')
  );
  return { ok: !hasFatal && bad.length === 0 && significantErrors.length === 0, bad, hasFatal, significantErrors };
}

(async () => {
  const all = [];
  const total = SAMPLE_PAGES.length;
  let done = 0;
  const startTime = Date.now();
  const resultsFile = path.join(REPO, '__scan_results.jsonl');

  // If this is the first batch, truncate the results file
  if (batchStart === 0) {
    try { fs.writeFileSync(resultsFile, ''); } catch(e){}
  }

  // Run sequentially — jsdom's per-page setup is heavy and parallelism doesn't
  // help much because each page still has to fully parse + execute.
  for (const page of SAMPLE_PAGES) {
    let r;
    try {
      r = await loadPage(page);
    } catch(e) {
      r = { file: page, fatal: e.message };
    }
    all.push(r);
    // Append to JSONL so partial progress survives if a batch is killed.
    try { fs.appendFileSync(resultsFile, JSON.stringify(r) + '\n'); } catch(e){}
    done++;
    if (done % 25 === 0 || done === total) {
      const pct = ((done / total) * 100).toFixed(0);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stderr.write('  progress: ' + done + '/' + total + ' batch (' + pct + '%) ' + elapsed + 's\n');
    }
  }

  // Only print FAIL pages in detail. Summary at end.
  let failing = 0;
  for (const r of all) {
    const { file, checks = {}, fatal, skipped } = r;
    const { ok, bad, hasFatal, significantErrors } = classify(r);
    if (ok) continue;
    failing++;
    console.log('FAIL ' + file);
    if (hasFatal) console.log('   fatal:', fatal || skipped);
    for (const [k,v] of Object.entries(checks)) {
      // Print every check but especially the bad ones
      console.log('   ' + k + ': ' + v);
    }
    if (significantErrors.length) {
      console.log('   errors:');
      significantErrors.slice(0,5).forEach(e => console.log('     · ' + e.slice(0,200)));
    }
  }

  console.log('\n== summary ==');
  console.log('pages tested:', all.length);
  console.log('pages passed:', all.length - failing);
  console.log('pages failed:', failing);
  if (failing === 0) console.log('ALL CHECKS PASS — hamburger, Explore, search, interactive widgets.');
  process.exit(failing > 0 ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
