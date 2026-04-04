#!/usr/bin/env node
/**
 * build-mega-menu.js
 *
 * Scans every HTML page in the site, extracts title + description,
 * auto-categorizes each page, and rewrites the MEGA_MENU_DATA block
 * in /nav.js so the mega-menu always mirrors the full site content.
 *
 * Run:  node build-mega-menu.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const NAV_JS = path.join(SITE_DIR, 'nav.js');

// ── Pages to skip (utility / landing / template) ──────────────────
const SKIP = new Set([
  '_nav-template.html', 'search.html', '404.html',
  'index.html', 'index-old.html', 'index-new.html',
  'google0af1fbedb3c930a8.html',
  'donate.html', 'contact.html', 'privacy.html', 'terms.html',
  'about.html', 'freedom.html', 'belief-assessment.html', 'quiz.html',
  'explore-map.html', 'connections.html', 'essays.html',
  'best-reads.html', 'verse-explorer.html',
]);

// ── Category definitions ───────────────────────────────────────────
// Order matters — this is the display order in the mega-menu.
// "hub" is the landing page for that category (shown as the main href).
// "prefixes" are filename prefixes that auto-assign pages to this category.
const CATEGORIES = [
  {
    key: 'start-here',
    name: 'Start Here',
    icon: '🧭',
    hub: '/start-here',
    desc: 'Your guided journey into sovereign grace',
    prefixes: ['start-here'],
    extraFiles: ['scripture-tsunami.html'],
  },
  {
    key: 'questions',
    name: 'Questions',
    icon: '📖',
    hub: '/questions',
    desc: 'Scripture-driven proofs for sovereign grace',
    prefixes: ['question'],
    hubFiles: ['questions.html'],
  },
  {
    key: 'theology',
    name: 'Theology',
    icon: '🏛',
    hub: '/systematic-theology',
    desc: 'Complete systematic framework',
    prefixes: ['systematic'],
    hubFiles: ['systematic-theology.html'],
  },
  {
    key: 'objections',
    name: 'Objections Answered',
    icon: '🛡',
    hub: '/questions',
    desc: 'Steel-manned and demolished — every hard question',
    prefixes: ['objection'],
  },
  {
    key: 'demolition',
    name: 'Demolition Zone',
    icon: '💥',
    hub: '/demolition-hub',
    desc: 'Arminian proof-texts dismantled verse by verse',
    prefixes: ['demolition', 'counter'],
    hubFiles: ['demolition-hub.html'],
  },
  {
    key: 'apologetics',
    name: 'Apologetics',
    icon: '⚔',
    hub: '/apologetic-evangelism',
    desc: 'Defending and commending the faith',
    prefixes: ['apologetic', 'debate'],
  },
  {
    key: 'why-we-resist',
    name: 'Why We Resist',
    icon: '🧠',
    hub: '/psychology-hub',
    desc: 'The psychology of suppressing truth',
    prefixes: ['psychology', 'resistance'],
    hubFiles: ['psychology-hub.html'],
  },
  {
    key: 'devotionals',
    name: 'Devotionals',
    icon: '🕯',
    hub: '/devotionals',
    desc: 'Where doctrine becomes worship',
    prefixes: ['devotional'],
    hubFiles: ['devotionals.html'],
  },
  {
    key: 'stories',
    name: 'Stories',
    icon: '📜',
    hub: '/stories',
    desc: 'Original parables and narratives',
    prefixes: ['story'],
    hubFiles: ['stories.html'],
  },
  {
    key: 'secular',
    name: 'Secular Evidence',
    icon: '🔬',
    hub: '/secular-evidence',
    desc: 'Even the world confirms it',
    prefixes: ['secular'],
    hubFiles: ['secular-evidence.html'],
  },
  {
    key: 'history',
    name: 'History',
    icon: '⏳',
    hub: '/history-timeline',
    desc: '2,000 years of sovereign grace proclaimed',
    prefixes: ['history'],
    hubFiles: ['history-timeline.html'],
  },
  {
    key: 'theologians',
    name: 'Theologians',
    icon: '🧓',
    hub: '/theologians',
    desc: 'The giants who came before',
    prefixes: ['theologian'],
    hubFiles: ['theologians.html'],
  },
  {
    key: 'analogies',
    name: 'Analogies',
    icon: '💡',
    hub: '/analogies-illustrations',
    desc: 'Pictures that make deep truths click',
    prefixes: ['analogy'],
    hubFiles: ['analogies-illustrations.html'],
  },
  {
    key: 'ot',
    name: 'Old Testament',
    icon: '📚',
    hub: '/ot-election',
    desc: 'Sovereign election in every OT figure',
    prefixes: ['ot', 'psalms', 'psalm'],
    hubFiles: ['ot-election.html'],
  },
  {
    key: 'comparisons',
    name: 'Comparisons',
    icon: '⚖',
    hub: '/compare-calvinism-arminianism',
    desc: 'Side-by-side with rival systems',
    prefixes: ['compare'],
  },
  {
    key: 'creeds',
    name: 'Creeds & Confessions',
    icon: '📜',
    hub: '/creeds-confessions',
    desc: 'Historic statements of faith',
    prefixes: ['creed', 'canons'],
    hubFiles: ['creeds-confessions.html'],
  },
  {
    key: 'pastoral',
    name: 'Pastoral',
    icon: '🤝',
    hub: '/pastoral-assurance',
    desc: 'Living out these truths',
    prefixes: ['pastoral'],
  },
  // Psalms & Poetry category AXED 2026-04-04 — only had 1 page (psalms-election).
  // That page now routes to Old Testament via the 'psalms' prefix below.
  {
    key: 'philosophy',
    name: 'Philosophy of Truth',
    icon: '🔭',
    hub: '/philosophy-of-truth',
    desc: 'Deep philosophical proofs that sovereign grace must be true',
    prefixes: ['philosophy'],
    hubFiles: ['philosophy-of-truth.html'],
  },
  {
    name: 'Healing & Hope',
    icon: '💚',
    hub: '/anxious-mind-hub',
    desc: 'Where real pain meets sovereign grace',
    prefixes: ['anxious-mind', 'broken-mirror', 'invisible-wall', 'open-wound', 'shattered-lens'],
  },
];

// ── Helpers ────────────────────────────────────────────────────────
function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (m) {
    let t = m[1].replace(/<[^>]+>/g, '').trim();
    t = t.replace(/\s*[|\u2014\u2013\u2015–—-]\s*Adopted by Grace.*$/i, '').trim();
    if (t) return t;
  }
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return h1[1].replace(/<[^>]+>/g, '').trim();
  return '';
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (m) return m[1].trim();
  const og = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  if (og) return og[1].trim();
  return '';
}

function slugToUrl(filename) {
  return '/' + filename.replace(/\.html$/, '');
}

function escapeJsString(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, ' ')
    .replace(/\r/g, '')
    .substring(0, 120); // keep descriptions concise
}

// ── Main ───────────────────────────────────────────────────────────
const htmlFiles = fs.readdirSync(SITE_DIR).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (SKIP.has(f)) return false;
  if (f.startsWith('_') || f.startsWith('.')) return false;
  return true;
});

console.log(`Found ${htmlFiles.length} HTML content files...`);

// Build a lookup: filename → { title, desc, url }
const pageData = {};
for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(SITE_DIR, file), 'utf-8');
  pageData[file] = {
    title: extractTitle(html),
    desc: extractDescription(html),
    url: slugToUrl(file),
  };
}

// Assign pages to categories
const categoryPages = {};
const assigned = new Set();

for (const cat of CATEGORIES) {
  categoryPages[cat.key] = [];
  const hubFiles = new Set(cat.hubFiles || []);
  const extraFiles = new Set(cat.extraFiles || []);

  for (const file of htmlFiles) {
    if (assigned.has(file)) continue;
    if (hubFiles.has(file)) { assigned.add(file); continue; } // skip hub pages

    // Check if file matches this category
    let matches = false;
    if (extraFiles.has(file)) {
      matches = true;
    } else {
      for (const prefix of cat.prefixes) {
        if (file.startsWith(prefix + '-') || file === prefix + '.html') {
          matches = true;
          break;
        }
      }
    }

    if (matches) {
      assigned.add(file);
      const data = pageData[file];
      if (data.title) {
        // Clean up title — remove redundant category prefixes
        let cleanTitle = data.title;
        categoryPages[cat.key].push({
          name: cleanTitle,
          href: data.url,
          desc: data.desc || cleanTitle,
        });
      }
    }
  }

  // Sort subs alphabetically by name
  categoryPages[cat.key].sort((a, b) => a.name.localeCompare(b.name));

  // Pin the crown jewel at the top of "Why We Resist" category
  if (cat.key === 'why-we-resist') {
    const crownJewelIndex = categoryPages[cat.key].findIndex(
      item => item.href === '/psychology-cost-of-rejecting-grace'
    );
    if (crownJewelIndex !== -1) {
      const crownJewel = categoryPages[cat.key][crownJewelIndex];
      // Add indicator to name
      crownJewel.name = '⚡ ' + crownJewel.name;
      // Move to front
      categoryPages[cat.key].splice(crownJewelIndex, 1);
      categoryPages[cat.key].unshift(crownJewel);
    }
  }
}

// Report unassigned pages
const unassigned = htmlFiles.filter(f => !assigned.has(f));
if (unassigned.length > 0) {
  console.log(`\nUnassigned pages (${unassigned.length}):`);
  for (const f of unassigned) {
    console.log(`  ${f} — "${pageData[f].title}"`);
  }
}

// ── Build the MEGA_MENU_DATA JavaScript string ─────────────────────
let dataJs = '    var MEGA_MENU_DATA = [\n';

for (let c = 0; c < CATEGORIES.length; c++) {
  const cat = CATEGORIES[c];
  const subs = categoryPages[cat.key];

  // Skip categories with zero sub-pages
  if (subs.length === 0) {
    console.log(`  Skipping empty category: ${cat.name}`);
    continue;
  }

  dataJs += '        {\n';
  dataJs += `            name: '${escapeJsString(cat.name)}',\n`;
  dataJs += `            icon: '${cat.icon}',\n`;
  dataJs += `            href: '${cat.hub}',\n`;
  dataJs += `            desc: '${escapeJsString(cat.desc)}',\n`;
  dataJs += '            subs: [\n';

  for (let s = 0; s < subs.length; s++) {
    const sub = subs[s];
    const comma = s < subs.length - 1 ? ',' : '';
    dataJs += `                { name: '${escapeJsString(sub.name)}', href: '${sub.href}', desc: '${escapeJsString(sub.desc)}' }${comma}\n`;
  }

  dataJs += '            ]\n';
  dataJs += '        }';
  dataJs += c < CATEGORIES.length - 1 ? ',\n' : '\n';
}

dataJs += '    ];';

// ── Replace MEGA_MENU_DATA in nav.js ───────────────────────────────
let navJs = fs.readFileSync(NAV_JS, 'utf-8');

// Match from "var MEGA_MENU_DATA = [" through "];"
const megaDataRegex = /    var MEGA_MENU_DATA = \[[\s\S]*?\n    \];/;

if (!megaDataRegex.test(navJs)) {
  console.error('ERROR: Could not find MEGA_MENU_DATA block in nav.js');
  process.exit(1);
}

const newNavJs = navJs.replace(megaDataRegex, dataJs);

if (newNavJs === navJs) {
  console.log('\nMEGA_MENU_DATA already up to date — no changes needed.');
} else {
  fs.writeFileSync(NAV_JS, newNavJs, 'utf-8');
  console.log('\nUpdated MEGA_MENU_DATA in nav.js');
}

// Summary
let totalSubs = 0;
let catCount = 0;
for (const cat of CATEGORIES) {
  const n = categoryPages[cat.key].length;
  if (n > 0) {
    catCount++;
    totalSubs += n;
    console.log(`  ${cat.icon} ${cat.name}: ${n} pages`);
  }
}
console.log(`\nTotal: ${catCount} categories, ${totalSubs} sub-links in mega-menu`);
