#!/usr/bin/env node
/**
 * build-all-content.js
 *
 * Bakes the FULL article library into all-content.html as static, crawlable
 * <a> cards — so the page renders the complete list with zero JavaScript.
 * JavaScript then only LAYERS search + category filtering on top of the
 * existing DOM (no fetch, no client-side rendering, nothing to silently fail).
 *
 * Also keeps every visible/meta article count in sync with tags.json, which is
 * the single canonical article index (see build-tags.js). Re-runnable.
 *
 * Run:  node build-all-content.js   (after build-tags.js)
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const TAGS = path.join(SITE_DIR, 'tags.json');
const PAGE = path.join(SITE_DIR, 'all-content.html');

// tags.json is inconsistently encoded: `desc` is already HTML-entity-encoded
// (it was scraped from <meta> attributes), `title`/`tags` are mostly raw.
// Decode any existing entities first, then re-encode once — so output is
// correctly single-encoded no matter how the source was stored.
const decodeEntities = (s) => String(s == null ? '' : s)
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
  .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
  .replace(/&lsquo;/g, '‘').replace(/&rsquo;/g, '’')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&hellip;/g, '…').replace(/&nbsp;/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(parseInt(n, 10)))
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const esc = (s) => decodeEntities(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const data = JSON.parse(fs.readFileSync(TAGS, 'utf8'));
const pages = (data.pages || []).slice().sort((a, b) => a.title.localeCompare(b.title));
const count = pages.length;

// ── Static cards (mirror the old client renderer's markup so global.css applies) ──
const cards = pages.map((p) => {
  const cat = p.category || 'General';
  const tags = (p.tags || []).slice(0, 3);
  const tagsHtml = tags.length
    ? `<div class="article-tags">${tags.map((t) => `<span class="article-tag">${esc(t)}</span>`).join('')}</div>`
    : '';
  const search = esc(decodeEntities([p.title, p.desc, (p.tags || []).join(' ')].join(' ')).toLowerCase());
  return `<div class="article-card" data-category="${esc(cat)}" data-search="${search}">` +
    `<a href="${esc(p.url)}">` +
    `<span class="article-category">${esc(cat)}</span>` +
    `<h3 class="article-title">${esc(p.title)}</h3>` +
    `<p class="article-desc">${esc(p.desc)}</p>` +
    tagsHtml + `</a></div>`;
}).join('\n');

// ── Filter script: operates on the static DOM, no fetch, nothing to fail ──
const filterScript = `    <script>
  // Cards are baked into #articlesGrid at build time (build-all-content.js),
  // so the full library renders with zero JavaScript and is fully crawlable.
  // This only LAYERS search + category filtering on top of the existing DOM.
  (function () {
  var grid = document.getElementById('articlesGrid');
  if (!grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.article-card'));
  var countEl = document.getElementById('articleCount');
  var noResults = document.getElementById('noResults');
  var searchEl = document.getElementById('searchInput2');
  var filterEl = document.getElementById('categoriesFilter');
  var activeCategory = null;
  var term = '';

  var cats = [];
  cards.forEach(function (c) {
  var cat = c.getAttribute('data-category');
  if (cat && cats.indexOf(cat) === -1) cats.push(cat);
  });
  cats.sort();
  cats.forEach(function (cat) {
  var btn = document.createElement('button');
  btn.className = 'category-btn';
  btn.textContent = cat;
  btn.addEventListener('click', function () {
  activeCategory = (activeCategory === cat) ? null : cat;
  document.querySelectorAll('.category-btn').forEach(function (b) {
  b.classList.toggle('active', b.textContent === activeCategory);
  });
  apply();
  });
  filterEl.appendChild(btn);
  });

  function apply() {
  var shown = 0;
  cards.forEach(function (c) {
  var okCat = !activeCategory || c.getAttribute('data-category') === activeCategory;
  var okTerm = !term || (c.getAttribute('data-search') || '').indexOf(term) > -1;
  var visible = okCat && okTerm;
  c.style.display = visible ? '' : 'none';
  if (visible) shown++;
  });
  if (countEl) countEl.textContent = shown;
  if (noResults) noResults.style.display = shown ? 'none' : 'block';
  grid.style.display = shown ? '' : 'none';
  }

  if (searchEl) searchEl.addEventListener('input', function (e) {
  term = (e.target.value || '').toLowerCase();
  apply();
  });
  var clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) clearBtn.addEventListener('click', function (e) {
  e.preventDefault();
  activeCategory = null;
  term = '';
  if (searchEl) searchEl.value = '';
  document.querySelectorAll('.category-btn').forEach(function (b) { b.classList.remove('active'); });
  apply();
  });

  apply();
  })();
    </script>`;

// ── Apply transforms (all re-runnable) ──
let html = fs.readFileSync(PAGE, 'utf8');

// 1. Replace the stale "290+" sentence (entity + plain apostrophe variants)
html = html.replace(
  /Search and filter 290\+ articles on Scripture, God(&#39;|')s sovereignty, election, and redemption\./g,
  (m, ap) => `Browse the complete library of ${count} articles tracing God${ap}s sovereign grace through Scripture, history, philosophy, and the human heart. Search by topic, question, or verse.`
);

// 2. Keep the count fresh on every rebuild
html = html.replace(/library of \d+ articles/g, `library of ${count} articles`);

// 3. Static header count fallback
html = html.replace(/<span id="articleCount">\d+<\/span>/, `<span id="articleCount">${count}</span>`);

// 4. Bake cards into the grid (non-greedy to the </div> that precedes #noResults)
html = html.replace(
  /(<div class="articles-grid" id="articlesGrid">)[\s\S]*?<\/div>(\s*<div id="noResults")/,
  (full, open, tail) => `${open}\n${cards}\n</div>${tail}`
);

// 5. Swap the old fetch-based renderer for the static-DOM filter script
html = html.replace(
  / {4}<script>\s*let allArticles = \[\][\s\S]*?<\/script>/,
  () => filterScript
);

fs.writeFileSync(PAGE, html, 'utf8');
console.log(`all-content.html rebuilt: ${count} static cards baked in, counts synced to ${count}.`);
