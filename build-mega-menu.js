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
  'about.html', 'belief-assessment.html', 'quiz.html',
  'explore-map.html', 'sitemap.html', 'topics.html',
  'all-content.html', 'best-reads.html', 'verse-explorer.html',
  // Retired hubs that now redirect
  'analogies-illustrations.html', 'comparisons-hub.html', 'creeds-confessions.html',
]);

// ── UMBRELLA STRUCTURE WITH SUBCATEGORIES (2026-04-04) ──────────────
// This structure maps old flat categories to new umbrella groups.
// Each umbrella can have subcategories, or be a single category (like "Start Here").
const UMBRELLAS = [
  // UMBRELLA 1: Start Here (no subcategories)
  {
    key: 'start-here-umbrella',
    umbrella: 'Start Here',
    icon: '🧭',
    desc: 'Your guided journey into sovereign grace',
    href: '/start-here',
    subcategories: [
      {
        key: 'start-here',
        name: 'Start Here',
        icon: '🧭',
        hub: '/start-here',
        prefixes: ['start-here'],
        extraFiles: ['scripture-tsunami.html'],
      },
      {
        key: 'doorways',
        name: 'Doorways for You',
        icon: '🚪',
        hub: '/start-here',
        prefixes: ['for'],
        extraFiles: ['just-realized.html', 'freedom.html'],
      },
    ],
  },

  // UMBRELLA 2: Questions & Objections
  {
    key: 'questions-objections-umbrella',
    umbrella: 'Questions & Objections',
    icon: '❓',
    desc: 'Every question answered. Every objection dismantled.',
    href: '/questions',
    subcategories: [
      {
        key: 'questions',
        name: 'Scripture Questions',
        icon: '📖',
        hub: '/questions',
        prefixes: ['question', 'apologetic', 'debate'],
        hubFiles: ['questions.html'],
      },
      {
        key: 'objections',
        name: 'Hard Objections',
        icon: '🛡',
        hub: '/questions',
        prefixes: ['objection'],
      },
      {
        key: 'comparisons',
        name: 'Side by Side',
        icon: '⚖',
        hub: '/compare-calvinism-arminianism',
        prefixes: ['compare', 'comparative'],
      },
    ],
  },

  // UMBRELLA 3: Theology
  {
    key: 'theology-umbrella',
    umbrella: 'Theology',
    icon: '📖',
    desc: 'The deep truths of sovereign grace',
    href: '/systematic-theology',
    subcategories: [
      {
        key: 'theology',
        name: 'Systematic Theology',
        icon: '🏛',
        hub: '/systematic-theology',
        prefixes: ['systematic'],
        hubFiles: ['systematic-theology.html'],
      },
      {
        key: 'theological-ethics',
        name: 'Theological Ethics',
        icon: '🌿',
        hub: '/theological-ethics-hub',
        prefixes: ['ethics', 'theological-ethics'],
        extraFiles: ['theological-ethics-hub.html'],
      },
      {
        key: 'ot',
        name: 'Old Testament',
        icon: '📚',
        hub: '/ot-hub',
        prefixes: ['ot', 'psalms', 'psalm'],
        hubFiles: ['ot-hub.html'],
      },
      {
        key: 'scripture-deep-dives',
        name: 'Scripture Deep Dives',
        icon: '🔎',
        hub: '/verse-explorer',
        prefixes: ['romans', 'scripture-tsunami'],
      },
      // Creeds merged into History (creeds-confessions.html now redirects to history-timeline)
      {
        key: 'connections',
        name: 'Connections',
        icon: '🔗',
        hub: '/connections',
        prefixes: [],
        extraFiles: ['connections.html'],
      },
      {
        key: 'essays',
        name: 'Essays',
        icon: '📝',
        hub: '/essays',
        prefixes: [],
        extraFiles: ['essays.html'],
      },
    ],
  },

  // UMBRELLA 4: Demolition Zone
  {
    key: 'demolition-umbrella',
    umbrella: 'Demolition Zone',
    icon: '💥',
    desc: 'Tearing down the lies — from Scripture, logic, and science',
    href: '/demolition-hub',
    subcategories: [
      {
        key: 'demolition',
        name: 'Verse by Verse',
        icon: '💥',
        hub: '/demolition-hub',
        prefixes: ['demolition', 'counter'],
        hubFiles: ['demolition-hub.html'],
      },
      {
        key: 'philosophy',
        name: 'Logic & Philosophy',
        icon: '🔭',
        hub: '/philosophy-problem-of-merit',
        prefixes: ['philosophy'],
      },
      {
        key: 'secular',
        name: 'Secular Evidence',
        icon: '🔬',
        hub: '/secular-evidence',
        prefixes: ['secular'],
        hubFiles: ['secular-evidence.html'],
      },
    ],
  },

  // UMBRELLA 5: Why We Resist
  {
    key: 'why-we-resist-umbrella',
    umbrella: 'Why We Resist',
    icon: '🧠',
    desc: 'Why grace is so hard to accept — and what breaks through',
    href: '/psychology-hub',
    subcategories: [
      {
        key: 'why-we-resist',
        name: 'Psychology of Resistance',
        icon: '🧠',
        hub: '/psychology-hub',
        prefixes: ['psychology', 'resistance'],
        hubFiles: ['psychology-hub.html'],
      },
      {
        key: 'stories',
        name: 'Stories, Parables & Analogies',
        icon: '📜',
        hub: '/stories',
        prefixes: ['story', 'analogy'],
        hubFiles: ['stories.html'],
      },
    ],
  },

  // UMBRELLA 6: Through the Ages
  {
    key: 'through-the-ages-umbrella',
    umbrella: 'Through the Ages',
    icon: '⏳',
    desc: 'Grace throughout church history',
    href: '/history-timeline',
    subcategories: [
      {
        key: 'history',
        name: 'Church History',
        icon: '⏳',
        hub: '/history-timeline',
        prefixes: ['history', 'creed', 'canons'],
        hubFiles: ['history-timeline.html'],
      },
      {
        key: 'theologians',
        name: 'Theologian Profiles',
        icon: '🧓',
        hub: '/theologians',
        prefixes: ['theologian'],
        hubFiles: ['theologians.html'],
        extraFiles: ['hymn-amazing-grace.html'],
      },
    ],
  },

  // UMBRELLA 7: Rest in Grace
  {
    key: 'rest-in-grace-umbrella',
    umbrella: 'Rest in Grace',
    icon: '💚',
    desc: 'When the truth shatters you — grace catches you',
    href: '/devotionals',
    subcategories: [
      {
        key: 'devotionals',
        name: 'Devotionals',
        icon: '🕯',
        hub: '/devotionals',
        prefixes: ['devotional'],
        hubFiles: ['devotionals.html'],
      },
      {
        key: 'healing',
        name: 'Healing & Hope',
        icon: '💚',
        hub: '/anxious-mind-what-if-not-chosen',
        prefixes: ['anxious-mind', 'broken-mirror', 'invisible-wall', 'open-wound', 'shattered-lens'],
      },
      {
        key: 'pastoral',
        name: 'Pastoral',
        icon: '🤝',
        hub: '/pastoral-assurance',
        prefixes: ['pastoral'],
      },
      {
        key: 'joy',
        name: 'Joy of Grace',
        icon: '✨',
        hub: '/joy-hub',
        prefixes: ['joy'],
        hubFiles: ['joy-hub.html'],
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (m) {
    let t = m[1].replace(/<[^>]+>/g, '').trim();
    t = t.replace(/\s*[|\u2014\u2013\u2015–—-]\s*Adopted by Grace.*$/i, '').trim();
    if (t) return decodeHtmlEntities(t);
  }
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return decodeHtmlEntities(h1[1].replace(/<[^>]+>/g, '').trim());
  return '';
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  if (m) return decodeHtmlEntities(m[1].trim());
  const og = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
  if (og) return decodeHtmlEntities(og[1].trim());
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
  let html;
  try {
    html = fs.readFileSync(path.join(SITE_DIR, file), 'utf-8');
  } catch (e) {
    console.log(`  Skipping ${file} (unreadable: ${e.code || e.message})`);
    continue;
  }
  pageData[file] = {
    title: extractTitle(html),
    desc: extractDescription(html),
    url: slugToUrl(file),
  };
}

// Assign pages to subcategories (within umbrellas)
const umbrellaPages = {};  // umbrella.key → { subcategory.key → pages[] }
const assigned = new Set();

// Initialize structure
for (const umbrella of UMBRELLAS) {
  umbrellaPages[umbrella.key] = {};
  for (const subcat of umbrella.subcategories) {
    umbrellaPages[umbrella.key][subcat.key] = [];
  }
}

// Assign pages
for (const umbrella of UMBRELLAS) {
  for (const subcat of umbrella.subcategories) {
    const hubFiles = new Set(subcat.hubFiles || []);
    const extraFiles = new Set(subcat.extraFiles || []);

    for (const file of htmlFiles) {
      if (assigned.has(file)) continue;
      if (hubFiles.has(file)) { assigned.add(file); continue; } // skip hub pages

      // Check if file matches this subcategory
      let matches = false;
      if (extraFiles.has(file)) {
        matches = true;
      } else {
        for (const prefix of subcat.prefixes) {
          if (file.startsWith(prefix + '-') || file === prefix + '.html') {
            matches = true;
            break;
          }
        }
      }

      if (matches) {
        assigned.add(file);
        const data = pageData[file];
        if (data && data.title) {
          umbrellaPages[umbrella.key][subcat.key].push({
            name: data.title,
            href: data.url,
            desc: data.desc || data.title,
          });
        }
      }
    }

    // Sort pages alphabetically by name
    umbrellaPages[umbrella.key][subcat.key].sort((a, b) => a.name.localeCompare(b.name));

    // Pin the crown jewel at the top of "psychology-of-resistance" subcategory
    if (subcat.key === 'why-we-resist') {
      const pages = umbrellaPages[umbrella.key][subcat.key];
      const crownJewelIndex = pages.findIndex(
        item => item.href === '/psychology-cost-of-rejecting-grace'
      );
      if (crownJewelIndex !== -1) {
        const crownJewel = pages[crownJewelIndex];
        // Add indicator to name
        crownJewel.name = '⚡ ' + crownJewel.name;
        // Move to front
        pages.splice(crownJewelIndex, 1);
        pages.unshift(crownJewel);
      }
    }
  }
}

// Report unassigned pages
const unassigned = htmlFiles.filter(f => !assigned.has(f));
if (unassigned.length > 0) {
  console.log(`\nUnassigned pages (${unassigned.length}):`);
  for (const f of unassigned) {
    console.log(`  ${f} — "${pageData[f] ? pageData[f].title : '(unreadable)'}"`);
  }
}

// ── Build the MEGA_MENU_DATA JavaScript string (nested structure) ───
let dataJs = '    var MEGA_MENU_DATA = [\n';

let firstUmbrella = true;
for (const umbrella of UMBRELLAS) {
  // Build subcategory data
  const allPages = [];
  let hasContent = false;

  for (const subcat of umbrella.subcategories) {
    const pages = umbrellaPages[umbrella.key][subcat.key];
    if (pages.length > 0) {
      hasContent = true;
    }
    allPages.push({
      subcat,
      pages,
    });
  }

  // Skip umbrellas with no content
  if (!hasContent) {
    console.log(`  Skipping empty umbrella: ${umbrella.umbrella}`);
    continue;
  }

  if (!firstUmbrella) dataJs += ',\n';
  firstUmbrella = false;

  dataJs += '        {\n';
  dataJs += `            umbrella: '${escapeJsString(umbrella.umbrella)}',\n`;
  dataJs += `            icon: '${umbrella.icon}',\n`;
  dataJs += `            desc: '${escapeJsString(umbrella.desc)}',\n`;
  if (umbrella.href) {
    dataJs += `            href: '${umbrella.href}',\n`;
  }
  dataJs += '            subcategories: [\n';

  for (let s = 0; s < allPages.length; s++) {
    const { subcat, pages } = allPages[s];
    if (pages.length === 0) continue; // Skip empty subcats

    dataJs += '                {\n';
    dataJs += `                    name: '${escapeJsString(subcat.name)}',\n`;
    dataJs += `                    icon: '${subcat.icon}',\n`;
    dataJs += `                    href: '${subcat.hub}',\n`;
    dataJs += `                    count: ${pages.length},\n`;
    dataJs += '                    pages: [\n';

    for (let p = 0; p < pages.length; p++) {
      const page = pages[p];
      const comma = p < pages.length - 1 ? ',' : '';
      dataJs += `                        { name: '${escapeJsString(page.name)}', href: '${page.href}', desc: '${escapeJsString(page.desc)}' }${comma}\n`;
    }

    dataJs += '                    ]\n';
    dataJs += '                }' + (s < allPages.length - 1 ? ',' : '') + '\n';
  }

  dataJs += '            ]\n';
  dataJs += '        }';
}

dataJs += '\n    ];';

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
let totalPages = 0;
let umbrellaCount = 0;
for (const umbrella of UMBRELLAS) {
  let umbrellaTotal = 0;
  for (const subcat of umbrella.subcategories) {
    const n = umbrellaPages[umbrella.key][subcat.key].length;
    if (n > 0) {
      umbrellaTotal += n;
    }
  }
  if (umbrellaTotal > 0) {
    umbrellaCount++;
    totalPages += umbrellaTotal;
    console.log(`  ${umbrella.icon} ${umbrella.umbrella}: ${umbrellaTotal} pages across ${umbrella.subcategories.length} sub-categories`);
  }
}
console.log(`\nTotal: ${umbrellaCount} umbrellas, ${totalPages} articles in mega-menu`);
