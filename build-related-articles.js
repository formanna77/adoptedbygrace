// build-related-articles.js
// Generates <!-- RELATED-ARTICLES-START --> blocks for every article page.
// Strategy:
//   1) Build a catalog of all articles (url, title, desc, category).
//   2) For each article, pick 6 related items:
//        - 2 sibling (same category prefix)
//        - 1 from a paired category (e.g., demolition ↔ question, analogy ↔ psychology)
//        - 3 cross-category rotators (randomized for variety)
//   3) Replace or insert a delimited <!-- RELATED-ARTICLES-START -->...<!-- RELATED-ARTICLES-END --> block.
//   4) Place it before </article> or, if not present, before the share bar script/closing body.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const CATEGORIES = [
  { key: 'question',        emoji: '❓',  label: 'Questions',            prefixes: ['question-'] },
  { key: 'demolition',      emoji: '💥',  label: 'Demolition',           prefixes: ['demolition-', 'counter-'] },
  { key: 'objection',       emoji: '🛡',  label: 'Objections',           prefixes: ['objection-'] },
  { key: 'analogy',         emoji: '🧩',  label: 'Analogies',            prefixes: ['analogy-'] },
  { key: 'story',           emoji: '📖',  label: 'Stories',              prefixes: ['story-'] },
  { key: 'devotional',      emoji: '🕯',  label: 'Devotionals',          prefixes: ['devotional-', 'hymn-'] },
  { key: 'psychology',      emoji: '🧠',  label: 'Psychology',           prefixes: ['psychology-'] },
  { key: 'philosophy',      emoji: '🧭',  label: 'Philosophy',           prefixes: ['philosophy-'] },
  { key: 'systematic',      emoji: '📚',  label: 'Systematic Theology',  prefixes: ['systematic-'] },
  { key: 'secular',         emoji: '🔬',  label: 'Secular Evidence',     prefixes: ['secular-'] },
  { key: 'history',         emoji: '⏳',  label: 'Church History',       prefixes: ['history-', 'creed-', 'canons-', 'westminster-', 'heidelberg-'] },
  { key: 'theologian',      emoji: '🧓',  label: 'Theologians',          prefixes: ['theologian-'] },
  { key: 'ot',              emoji: '📜',  label: 'Old Testament',        prefixes: ['ot-', 'psalm-', 'psalms-'] },
  { key: 'compare',         emoji: '⚖',  label: 'Comparisons',          prefixes: ['compare-', 'comparison-'] },
  { key: 'anxious-mind',    emoji: '💚',  label: 'Anxious Mind',         prefixes: ['anxious-mind-'] },
  { key: 'broken-mirror',   emoji: '🪞',  label: 'Broken Mirror',        prefixes: ['broken-mirror-'] },
  { key: 'open-wound',      emoji: '🩹',  label: 'Open Wound',           prefixes: ['open-wound-'] },
  { key: 'invisible-wall',  emoji: '🧱',  label: 'Invisible Wall',       prefixes: ['invisible-wall-'] },
  { key: 'shattered-lens',  emoji: '🔍',  label: 'Shattered Lens',       prefixes: ['shattered-lens-'] },
  { key: 'pastoral',        emoji: '🙏',  label: 'Pastoral',             prefixes: ['pastoral-', 'for-pastors'] },
  { key: 'joy',             emoji: '✨',  label: 'Joy of Grace',         prefixes: ['joy-'] },
  { key: 'response',        emoji: '💬',  label: 'Responses',            prefixes: ['response-'] },
  { key: 'romans',          emoji: '📖',  label: 'Romans Study',         prefixes: ['romans-'] },
  { key: 'start-here',      emoji: '🧭',  label: 'Start Here',           prefixes: ['start-here-', 'phase-'] },
  { key: 'testimony',       emoji: '🌅',  label: 'Testimony',            prefixes: ['testimony-'] },
];

// Paired "cross-category" recommendations — each key pairs naturally with these
const PAIRS = {
  'question':       ['demolition', 'analogy', 'psychology', 'devotional'],
  'demolition':     ['question', 'systematic', 'analogy'],
  'objection':      ['question', 'demolition', 'philosophy'],
  'analogy':        ['story', 'question', 'devotional'],
  'story':          ['devotional', 'analogy', 'testimony'],
  'devotional':     ['joy', 'pastoral', 'story', 'anxious-mind'],
  'psychology':     ['philosophy', 'question', 'broken-mirror'],
  'philosophy':     ['psychology', 'secular', 'systematic'],
  'systematic':     ['question', 'demolition', 'theologian'],
  'secular':        ['philosophy', 'psychology', 'systematic'],
  'history':        ['theologian', 'systematic', 'devotional'],
  'theologian':     ['history', 'systematic', 'devotional'],
  'ot':             ['systematic', 'question', 'devotional'],
  'compare':        ['systematic', 'question', 'demolition'],
  'anxious-mind':   ['devotional', 'pastoral', 'broken-mirror'],
  'broken-mirror':  ['devotional', 'psychology', 'anxious-mind'],
  'open-wound':     ['devotional', 'pastoral', 'story'],
  'invisible-wall': ['psychology', 'pastoral', 'anxious-mind'],
  'shattered-lens': ['psychology', 'devotional', 'question'],
  'pastoral':       ['devotional', 'joy', 'story'],
  'joy':            ['devotional', 'pastoral', 'testimony'],
  'response':       ['demolition', 'question', 'systematic'],
  'romans':         ['systematic', 'question', 'devotional'],
  'start-here':     ['question', 'devotional', 'systematic'],
  'testimony':      ['story', 'devotional', 'joy'],
  'unknown':        ['question', 'devotional', 'analogy'],
};

const SKIP_FILES = new Set([
  'index.html', '_nav-template.html', '404.html', 'search.html',
  'all-content.html', 'topics.html', 'connections.html', 'explore-map.html',
  'best-reads.html', 'sitemap.html', 'donate.html', 'privacy.html', 'terms.html',
  'google0af1fbedb3c930a8.html',
  'belief-assessment.html', 'verse-explorer.html', 'question-faith-origin-test.html',
]);

function classify(file) {
  for (const c of CATEGORIES) {
    if (c.prefixes.some(p => file.startsWith(p))) return c;
  }
  return { key: 'unknown', emoji: '📄', label: 'Essay', prefixes: [] };
}

function extractField(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function encodeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function truncate(s, n) {
  s = s.replace(/\s+/g, ' ').trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  const space = cut.lastIndexOf(' ');
  return (space > n * 0.6 ? cut.slice(0, space) : cut) + '…';
}

// Build the catalog
console.log('Building catalog...');
const catalog = [];
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !f.startsWith('_') && !SKIP_FILES.has(f));

for (const f of files) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const title = stripTags(extractField(html, /<title>([\s\S]*?)<\/title>/i))
    .replace(/\s*\|\s*Adopted by Grace.*$/i, '').trim();
  const desc = decodeEntities(extractField(html, /<meta\s+name="description"\s+content="([^"]*)"/i));
  const h1 = stripTags(extractField(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const cat = classify(f);
  const url = '/' + f.replace(/\.html$/, '');
  if (!title && !h1) continue;
  catalog.push({
    file: f,
    url,
    title: title || h1 || f,
    desc: truncate(desc, 140) || truncate(h1, 140) || '',
    cat,
  });
}
console.log(`Indexed ${catalog.length} articles.`);

// Index by category key
const byCat = {};
for (const item of catalog) {
  (byCat[item.cat.key] = byCat[item.cat.key] || []).push(item);
}

// Stable pseudo-random picker — deterministic per seed
function pickN(arr, n, seed) {
  const pool = arr.slice();
  const out = [];
  let s = seed;
  while (out.length < n && pool.length) {
    s = (s * 9301 + 49297) % 233280;
    const idx = Math.floor((s / 233280) * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function related(item) {
  const seen = new Set([item.url]);
  const out = [];
  const seed = hashSeed(item.file);

  // 2 from same category
  const siblings = (byCat[item.cat.key] || []).filter(x => !seen.has(x.url));
  for (const s of pickN(siblings, 2, seed)) { out.push(s); seen.add(s.url); }

  // 1 from paired category
  const pairs = (PAIRS[item.cat.key] || PAIRS.unknown);
  for (const p of pairs) {
    if (out.filter(x => x.cat.key === p).length) continue;
    const pool = (byCat[p] || []).filter(x => !seen.has(x.url));
    const picked = pickN(pool, 1, seed + 7);
    if (picked.length) { out.push(picked[0]); seen.add(picked[0].url); break; }
  }

  // 3 cross-category (excluding same + already used)
  const allKeys = Object.keys(byCat).filter(k => k !== item.cat.key && !out.find(x => x.cat.key === k));
  const shuffled = pickN(allKeys, allKeys.length, seed + 13);
  for (const k of shuffled) {
    if (out.length >= 6) break;
    const pool = (byCat[k] || []).filter(x => !seen.has(x.url));
    if (!pool.length) continue;
    const picked = pickN(pool, 1, seed + allKeys.indexOf(k));
    if (picked.length) { out.push(picked[0]); seen.add(picked[0].url); }
  }

  while (out.length < 6) {
    const extra = pickN(catalog.filter(x => !seen.has(x.url)), 1, seed + out.length * 31);
    if (!extra.length) break;
    out.push(extra[0]);
    seen.add(extra[0].url);
  }
  return out.slice(0, 6);
}

function renderBlock(relatedItems) {
  const cards = relatedItems.map(r => {
    const cat = `${r.cat.emoji} ${r.cat.label}`;
    return (
      `      <a href="${r.url}" class="related-article-card">\n` +
      `        <span class="related-article-cat">${cat}</span>\n` +
      `        <span class="related-article-title">${encodeAttr(r.title)}</span>\n` +
      `        <span class="related-article-desc">${encodeAttr(r.desc)}</span>\n` +
      `      </a>`
    );
  }).join('\n');
  return (
    `<!-- RELATED-ARTICLES-START -->\n` +
    `<section class="related-articles" aria-label="Related articles">\n` +
    `  <div class="related-articles-inner">\n` +
    `    <h2 class="related-articles-heading">Keep Exploring</h2>\n` +
    `    <p class="related-articles-subtitle">Every truth connects to every other truth. Here are more doorways in.</p>\n` +
    `    <div class="related-articles-grid">\n` +
    cards + '\n' +
    `    </div>\n` +
    `    <div class="related-articles-browse">\n` +
    `      <a href="/all-content" class="related-browse-link">Browse All Articles →</a>\n` +
    `      <a href="/topics" class="related-browse-link">Explore by Topic →</a>\n` +
    `    </div>\n` +
    `  </div>\n` +
    `</section>\n` +
    `<!-- RELATED-ARTICLES-END -->`
  );
}

function insertBlock(html, block) {
  const existing = /<!--\s*RELATED-ARTICLES-START\s*-->[\s\S]*?<!--\s*RELATED-ARTICLES-END\s*-->/;
  if (existing.test(html)) {
    return html.replace(existing, block);
  }
  // Insert immediately before </article> closing tag of the article-body
  const articleClose = html.lastIndexOf('</article>');
  if (articleClose > -1) {
    return html.slice(0, articleClose) + '\n' + block + '\n' + html.slice(articleClose);
  }
  // Fallback — insert before </main> or before footer
  const mainClose = html.lastIndexOf('</main>');
  if (mainClose > -1) {
    return html.slice(0, mainClose) + '\n' + block + '\n' + html.slice(mainClose);
  }
  // Last resort — before footer
  const footerOpen = html.indexOf('<footer');
  if (footerOpen > -1) {
    return html.slice(0, footerOpen) + block + '\n\n' + html.slice(footerOpen);
  }
  return html;
}

// Apply
let updated = 0, already = 0, skipped = 0;
for (const item of catalog) {
  const p = path.join(ROOT, item.file);
  let html = fs.readFileSync(p, 'utf8');
  // Only article-body pages get related-articles
  if (!/class="[^"]*article-body/.test(html)) { skipped++; continue; }
  const block = renderBlock(related(item));
  const newHtml = insertBlock(html, block);
  if (newHtml !== html) {
    fs.writeFileSync(p, newHtml);
    updated++;
  } else {
    already++;
  }
}

console.log(`✅ Related-articles updated on ${updated} pages`);
console.log(`   Already identical: ${already}`);
console.log(`   Skipped (no article-body): ${skipped}`);
