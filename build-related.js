#!/usr/bin/env node
/**
 * build-related.js
 *
 * Reads tags.json and injects a "Related Articles" section into every
 * HTML page on the site. Picks 6 related articles from DIFFERENT categories
 * based on shared topic tags, maximizing cross-category discovery.
 *
 * The injected section is wrapped in a marker comment so it can be
 * cleanly replaced on subsequent runs.
 *
 * Run:  node build-related.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const TAGS_FILE = path.join(SITE_DIR, 'tags.json');

// Pages that should NOT get related articles injected
const SKIP_INJECT = new Set([
  '_nav-template.html', 'search.html', '404.html',
  'index.html', 'index-old.html', 'index-new.html',
  'google0af1fbedb3c930a8.html',
  'donate.html', 'contact.html', 'privacy.html', 'terms.html',
  'about.html', 'freedom.html', 'belief-assessment.html', 'quiz.html',
  'explore-map.html', 'connections.html', 'essays.html',
  'best-reads.html', 'verse-explorer.html',
  'all-content.html', 'topics.html',
]);

const MARKER_START = '<!-- RELATED-ARTICLES-START -->';
const MARKER_END = '<!-- RELATED-ARTICLES-END -->';

// ── Load tags data ─────────────────────────────────────────────────
if (!fs.existsSync(TAGS_FILE)) {
  console.error('ERROR: tags.json not found. Run build-tags.js first.');
  process.exit(1);
}

const tagsData = JSON.parse(fs.readFileSync(TAGS_FILE, 'utf-8'));
const pages = tagsData.pages;

// Build lookup: url → page data
const pageMap = {};
for (const p of pages) {
  pageMap[p.url] = p;
}

// ── Find related articles ──────────────────────────────────────────
function findRelated(currentPage, allPages, count = 6) {
  const candidates = [];

  for (const other of allPages) {
    if (other.url === currentPage.url) continue;

    // Count shared tags
    const sharedTags = currentPage.tags.filter(t => other.tags.includes(t));
    if (sharedTags.length === 0) continue;

    // Score: shared tags + bonus for different category (cross-pollination)
    let score = sharedTags.length;
    if (other.category !== currentPage.category) {
      score += 2; // Boost cross-category links
    }

    candidates.push({ page: other, score, sharedTags });
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  // Pick top results, but try to diversify categories
  const selected = [];
  const usedCategories = new Set();

  // First pass: one from each different category
  for (const c of candidates) {
    if (selected.length >= count) break;
    if (!usedCategories.has(c.page.category)) {
      selected.push(c);
      usedCategories.add(c.page.category);
    }
  }

  // Second pass: fill remaining slots with best scores
  for (const c of candidates) {
    if (selected.length >= count) break;
    if (!selected.includes(c)) {
      selected.push(c);
    }
  }

  return selected;
}

// ── Category icons ─────────────────────────────────────────────────
const CAT_ICONS = {
  'Start Here': '🧭',
  'Questions': '📖',
  'Theology': '🏛',
  'Objections Answered': '🛡',
  'Demolition Zone': '💥',
  'Apologetics': '⚔',
  'Why We Resist': '🧠',
  'Devotionals': '🕯',
  'Stories': '📜',
  'Secular Evidence': '🔬',
  'History': '⏳',
  'Theologians': '🧓',
  'Analogies': '💡',
  'Old Testament': '📚',
  'Comparisons': '⚖',
  'Creeds & Confessions': '📜',
  'Pastoral': '🤝',
  'Psalms & Poetry': '🎵',
  'Healing & Hope': '💚',
  'General': '📄',
};

// ── Generate related HTML ──────────────────────────────────────────
function buildRelatedHTML(related) {
  if (related.length === 0) return '';

  let html = `${MARKER_START}
<section class="related-articles" aria-label="Related articles">
  <div class="related-articles-inner">
    <h2 class="related-articles-heading">Keep Exploring</h2>
    <p class="related-articles-subtitle">Every truth connects to every other truth. Here are more doorways in.</p>
    <div class="related-articles-grid">`;

  for (const r of related) {
    const icon = CAT_ICONS[r.page.category] || '📄';
    const desc = r.page.desc ? r.page.desc.substring(0, 100) + (r.page.desc.length > 100 ? '...' : '') : '';
    html += `
      <a href="${r.page.url}" class="related-article-card">
        <span class="related-article-cat">${icon} ${escapeHtml(r.page.category)}</span>
        <span class="related-article-title">${escapeHtml(r.page.title)}</span>
        <span class="related-article-desc">${escapeHtml(desc)}</span>
      </a>`;
  }

  html += `
    </div>
    <div class="related-articles-browse">
      <a href="/all-content" class="related-browse-link">Browse All 228+ Articles →</a>
      <a href="/topics" class="related-browse-link">Explore by Topic →</a>
    </div>
  </div>
</section>
${MARKER_END}`;

  return html;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// ── Inject into pages ──────────────────────────────────────────────
let injectedCount = 0;
let skippedCount = 0;

const htmlFiles = fs.readdirSync(SITE_DIR).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (SKIP_INJECT.has(f)) return false;
  if (f.startsWith('_') || f.startsWith('.')) return false;
  return true;
});

for (const file of htmlFiles) {
  const filePath = path.join(SITE_DIR, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const url = '/' + file.replace(/\.html$/, '');
  const page = pageMap[url];

  if (!page) {
    skippedCount++;
    continue;
  }

  const related = findRelated(page, pages);
  if (related.length === 0) {
    skippedCount++;
    continue;
  }

  const relatedHTML = buildRelatedHTML(related);

  // Remove existing related section if present
  const markerRegex = new RegExp(
    MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
    '[\\s\\S]*?' +
    MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'g'
  );
  html = html.replace(markerRegex, '');

  // Find injection point: before </footer> or before the last </div> before </body>
  let injected = false;

  // Try before <footer>
  const footerIdx = html.lastIndexOf('<footer');
  if (footerIdx !== -1) {
    html = html.substring(0, footerIdx) + relatedHTML + '\n\n' + html.substring(footerIdx);
    injected = true;
  }

  // Fallback: before </body>
  if (!injected) {
    const bodyEndIdx = html.lastIndexOf('</body>');
    if (bodyEndIdx !== -1) {
      html = html.substring(0, bodyEndIdx) + relatedHTML + '\n\n' + html.substring(bodyEndIdx);
      injected = true;
    }
  }

  if (injected) {
    fs.writeFileSync(filePath, html, 'utf-8');
    injectedCount++;
  } else {
    skippedCount++;
  }
}

console.log(`\nRelated Articles injection complete:`);
console.log(`  ${injectedCount} pages updated with related articles`);
console.log(`  ${skippedCount} pages skipped`);
