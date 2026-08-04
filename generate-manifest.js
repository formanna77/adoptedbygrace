#!/usr/bin/env node
/**
 * Generate Content Manifest  —  git-free, ledger-backed
 *
 * Builds content-manifest.js, which powers THREE reader-facing doors on the
 * homepage: the Spotlight cards, the "Discover Random" button, and the
 * "Recently Added" list. A page missing from this file cannot be found
 * through any of the three.
 *
 * WHY THIS WAS REWRITTEN (S198, 2026-08-04)
 * -----------------------------------------
 * The previous version derived each page's "added" date by shelling out to
 * `git log --diff-filter=A`. CLAUDE.md's GIT POLICY reads "Do not run any git
 * commands. ZERO EXCEPTIONS" — so no session would run it, it silently fell
 * out of the seven-script pipeline, and the manifest froze on 2026-05-27 with
 * its newest entry dated 2026-04-04. By August the homepage was presenting
 * April articles as the site's newest content and 127 prose pages — 20% of
 * the corpus, including every analytical-* page — could not appear in the
 * Spotlight, the Random button, or the Recent list at all. This is the same
 * failure that let tags.json run three months stale.
 *
 * THE LEDGER
 * ----------
 * Dates now live in archive/manifest-dates.json and are WRITE-ONCE: a page's
 * date is stamped the first time it is seen and never recomputed. That is what
 * makes this deterministic without git. mtime is deliberately NOT used — the
 * build pipeline rewrites files constantly, so mtime would reshuffle "Recently
 * Added" on every run.
 *
 * New pages are dated from their own JSON-LD "datePublished", which is what we
 * already publish to search engines; using anything else would make the
 * homepage and the structured data contradict each other.
 *
 * The ledger lives in archive/ because CLAUDE.md requires internal files there
 * (the repo root is served by Netlify) — archive/ is covered by the forced
 * splat in _redirects, so it can never be exposed. It is load-bearing. Do not
 * delete it: deleting it re-dates the entire corpus to today and destroys the
 * ordering of "Recently Added" permanently.
 *
 * Usage:  node generate-manifest.js  [--check]
 *   --check   report what would change; write nothing (exit 1 if stale)
 *
 * Must run AFTER build-search-index.js.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const LEDGER = path.join(ROOT, 'archive', 'manifest-dates.json');
const CHECK_ONLY = process.argv.includes('--check');

// ── Pages excluded from the manifest ──────────────────────────────────────
// Hubs, utilities, forms and system pages. These are doorways to content, not
// content — a reader who hits "Discover Random" should land on an argument.
const EXCLUDE_PATTERNS = [
  'index.html',
  'about.html',
  'author.html',
  'best-reads.html',
  'start-here.html',
  'contact.html',
  'donate.html',
  'privacy.html',
  '404.html',
  'search.html',
  'sitemap.html',
  'quiz.html',
  'freedom.html',
  'all-content.html',
  'topics.html',
  'scripture-tsunami.html',
  'belief-assessment.html',
  'connections.html',
  'debate-free-will.html',
  'share-your-story.html',
  'testimony-thank-you.html',
  '_nav-template.html',
];

function shouldExclude(url) {
  const filename = url.replace(/^\//, '') + '.html';
  if (EXCLUDE_PATTERNS.includes(filename)) return true;
  if (filename.endsWith('-hub.html')) return true;
  if (filename.startsWith('start-here-')) return true;
  if (filename.startsWith('printable-')) return true;
  if (filename === 'analogies-illustrations.html') return true;
  if (filename === 'creeds-confessions.html') return true;
  if (filename === 'comparisons-hub.html') return true;
  return false;
}

// ── Load the ledger ───────────────────────────────────────────────────────
let ledger = {};
if (fs.existsSync(LEDGER)) {
  const raw = JSON.parse(fs.readFileSync(LEDGER, 'utf8'));
  ledger = raw.dates || {};
  console.log(`Ledger loaded: ${Object.keys(ledger).length} dated page(s)`);
} else {
  console.log('No ledger found — bootstrapping from the existing manifest.');
  const mp = path.join(ROOT, 'content-manifest.js');
  if (fs.existsSync(mp)) {
    const prev = fs.readFileSync(mp, 'utf8');
    const re = /"url":\s*"([^"]+)"[\s\S]*?"added":\s*"([^"]+)"/g;
    let m, n = 0;
    while ((m = re.exec(prev)) !== null) { ledger[m[1]] = m[2]; n++; }
    console.log(`  Recovered ${n} date(s) from content-manifest.js (git-derived, authoritative).`);
  }
}

// ── Read the search index ─────────────────────────────────────────────────
console.log('Loading search index...');
const indexContent = fs.readFileSync(path.join(ROOT, 'search-index.js'), 'utf8');
const match = indexContent.match(/window\.SEARCH_INDEX = \[(.*?)\];/s);
if (!match) {
  console.error('ERROR: Could not find SEARCH_INDEX in search-index.js');
  console.error('Ensure build-search-index.js has been run first.');
  process.exit(1);
}
let data;
try {
  data = JSON.parse('[' + match[1] + ']');
} catch (e) {
  console.error('ERROR: Could not parse SEARCH_INDEX:', e.message);
  process.exit(1);
}
console.log(`Found ${data.length} indexed pages`);

// Only pages that exist on disk AND are real prose articles.
const articles = data.filter(item => {
  if (shouldExclude(item.url)) return false;
  const f = path.join(ROOT, item.url.replace(/^\//, '') + '.html');
  if (!fs.existsSync(f)) return false;
  return fs.readFileSync(f, 'utf8').includes('<article class="article-body"');
});
console.log(`Filtered to ${articles.length} article pages`);

// ── Date every page (write-once) ──────────────────────────────────────────
const TODAY = new Date().toISOString().slice(0, 10);
const newlyStamped = [];
const undated = [];

function datePublishedOf(slugFile) {
  const html = fs.readFileSync(slugFile, 'utf8');
  const m = html.match(/"datePublished":\s*"([0-9]{4}-[0-9]{2}-[0-9]{2})/);
  return m ? m[1] : null;
}

for (const item of articles) {
  if (ledger[item.url]) continue;                       // write-once: never recompute
  const f = path.join(ROOT, item.url.replace(/^\//, '') + '.html');
  const d = datePublishedOf(f);
  if (d) {
    ledger[item.url] = d;
    newlyStamped.push(`${item.url}  ${d}  (JSON-LD)`);
  } else {
    ledger[item.url] = TODAY;
    undated.push(item.url);
    newlyStamped.push(`${item.url}  ${TODAY}  (no JSON-LD — stamped today)`);
  }
}

// ── Build ─────────────────────────────────────────────────────────────────
const manifest = articles.map(item => {
  let excerpt = (item.desc || '').trim();
  const sentenceMatch = excerpt.match(/^[^.!?]*[.!?]/);
  if (sentenceMatch) excerpt = sentenceMatch[0];
  if (excerpt.length > 150) {
    excerpt = excerpt.substring(0, 150).trim();
    if (!/[.!?]$/.test(excerpt)) excerpt += '...';
  }
  return {
    url: item.url,
    title: item.title,
    category: item.cat,
    excerpt,
    added: ledger[item.url],
  };
});

// Newest first. index.html's loadRecent() slices the first 8 and trusts this.
manifest.sort((a, b) => {
  const d = new Date(b.added) - new Date(a.added);
  return d !== 0 ? d : a.title.localeCompare(b.title);   // stable, no run-to-run churn
});

// ── Report / write ────────────────────────────────────────────────────────
if (newlyStamped.length) {
  console.log(`\nNewly stamped (${newlyStamped.length}):`);
  newlyStamped.slice(0, 15).forEach(l => console.log('  ' + l));
  if (newlyStamped.length > 15) console.log(`  ... and ${newlyStamped.length - 15} more`);
}
if (undated.length) {
  console.log(`\n  WARNING: ${undated.length} page(s) had no JSON-LD datePublished and were stamped today:`);
  undated.forEach(u => console.log('     ' + u));
  console.log('  Give them a datePublished, delete their ledger line, and re-run.');
}

if (CHECK_ONLY) {
  const prev = fs.existsSync(path.join(ROOT, 'content-manifest.js'))
    ? fs.readFileSync(path.join(ROOT, 'content-manifest.js'), 'utf8') : '';
  const prevCount = (prev.match(/"url":/g) || []).length;
  console.log(`\n[--check] manifest would hold ${manifest.length} page(s); currently holds ${prevCount}.`);
  if (prevCount !== manifest.length || newlyStamped.length) {
    console.log('[--check] STALE — run without --check.');
    process.exit(1);
  }
  console.log('[--check] manifest is current.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(LEDGER), { recursive: true });
fs.writeFileSync(LEDGER, JSON.stringify({
  _README: 'LOAD-BEARING BUILD INPUT — do not delete. Write-once record of when each page first entered the manifest. Deleting this file re-dates the whole corpus to today and permanently destroys the ordering of the homepage "Recently Added" list. Written by generate-manifest.js. Lives in archive/ because the repo root is publicly served.',
  updated: new Date().toISOString(),
  dates: Object.fromEntries(Object.entries(ledger).sort(([a], [b]) => a.localeCompare(b))),
}, null, 2) + '\n');

const output = `const CONTENT_MANIFEST = ${JSON.stringify(manifest, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTENT_MANIFEST;
}
`;
fs.writeFileSync(path.join(ROOT, 'content-manifest.js'), output);

console.log('\n=== MANIFEST GENERATED ===');
console.log(`Total articles: ${manifest.length}`);
console.log(`Categories: ${new Set(manifest.map(m => m.category)).size}`);
console.log(`Newest: ${manifest[0].title}`);
console.log(`  Added: ${manifest[0].added.substring(0, 10)}`);
console.log(`Oldest: ${manifest[manifest.length - 1].title}`);
console.log(`  Added: ${manifest[manifest.length - 1].added.substring(0, 10)}`);
console.log(`\nLedger: archive/manifest-dates.json (${Object.keys(ledger).length} entries)`);
console.log(`File: content-manifest.js  —  ${(output.length / 1024).toFixed(1)} KB`);
