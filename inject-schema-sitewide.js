#!/usr/bin/env node
/**
 * inject-schema-sitewide.js
 *
 * PROJECT LIGHTHOUSE — Pillar 2: STRUCTURED DATA
 *
 * Guarantees every HTML page carries the schema.org JSON-LD blocks that
 * Google uses to build rich results, featured snippets, breadcrumb
 * trails, and site-link search boxes. This is how a site becomes the
 * "zero-position" answer — the thing Google displays ABOVE the first
 * blue link.
 *
 * For every page we inject (idempotent, non-destructive):
 *
 *   1. An Organization + WebSite block with SearchAction so Google
 *      renders a sitelinks search box under the main result.
 *   2. A per-page primary schema:
 *        - WebSite / CollectionPage for index + hubs
 *        - Article for every other page
 *   3. A BreadcrumbList trail (Home › Hub › Page).
 *
 * If the page already contains a JSON-LD block of a given @type, we
 * leave the existing block in place — agents have written hand-crafted
 * Article/FAQPage blocks on dozens of pages and we must not overwrite
 * their richer content. We only ADD what's missing.
 *
 * Run this as many times as you like. It is fully idempotent.
 */

const fs = require('fs');
const path = require('path');

const SITE = 'https://adoptedbygrace.net';
const SITE_NAME = 'Adopted by Grace';
const OG_IMAGE = SITE + '/og-image.png';

const SKIP_FILES = new Set([
  '_nav-template.html',
]);

// Hub -> { label, file }
const HUBS = {
  'questions.html': { label: 'Questions', slug: 'questions' },
  'demolition-hub.html': { label: 'Demolition', slug: 'demolition-hub' },
  'psychology-hub.html': { label: 'Psychology', slug: 'psychology-hub' },
  'philosophy-hub.html': { label: 'Philosophy', slug: 'philosophy-hub' },
  'stories.html': { label: 'Stories & Analogies', slug: 'stories' },
  'devotionals.html': { label: 'Devotionals', slug: 'devotionals' },
  'secular-evidence.html': { label: 'Secular Evidence', slug: 'secular-evidence' },
  'systematic-theology.html': { label: 'Systematic Theology', slug: 'systematic-theology' },
  'theologians.html': { label: 'Theologians', slug: 'theologians' },
  'history-timeline.html': { label: 'History', slug: 'history-timeline' },
  'ot-hub.html': { label: 'Old Testament', slug: 'ot-hub' },
  'essays.html': { label: 'Essays', slug: 'essays' },
  'comparisons-hub.html': { label: 'Comparisons', slug: 'comparisons-hub' },
  'pastoral-hub.html': { label: 'Pastoral', slug: 'pastoral-hub' },
  'testimony-hub.html': { label: 'Testimony', slug: 'testimony-hub' },
  'invisible-wall-hub.html': { label: 'The Invisible Wall', slug: 'invisible-wall-hub' },
  'open-wound-hub.html': { label: 'The Open Wound', slug: 'open-wound-hub' },
  'shattered-lens-hub.html': { label: 'The Shattered Lens', slug: 'shattered-lens-hub' },
  'broken-mirror-hub.html': { label: 'The Broken Mirror', slug: 'broken-mirror-hub' },
  'anxious-mind-hub.html': { label: 'The Anxious Mind', slug: 'anxious-mind-hub' },
};

// Prefix -> hub file
const PREFIX_HUBS = [
  ['question-',         'questions.html'],
  ['objection-',        'questions.html'],
  ['demolition-',       'demolition-hub.html'],
  ['psychology-',       'psychology-hub.html'],
  ['philosophy-',       'philosophy-hub.html'],
  ['story-',            'stories.html'],
  ['parable-',          'stories.html'],
  ['analogy-',          'stories.html'],
  ['illustration-',     'stories.html'],
  ['devotional-',       'devotionals.html'],
  ['meditation-',       'devotionals.html'],
  ['secular-',          'secular-evidence.html'],
  ['systematic-',       'systematic-theology.html'],
  ['theologian-',       'theologians.html'],
  ['history-',          'history-timeline.html'],
  ['ot-',               'ot-hub.html'],
  ['essay-',            'essays.html'],
  ['compare-',          'comparisons-hub.html'],
  ['counter-',          'comparisons-hub.html'],
  ['pastoral-',         'pastoral-hub.html'],
  ['testimony-',        'testimony-hub.html'],
  ['invisible-wall-',   'invisible-wall-hub.html'],
  ['open-wound-',       'open-wound-hub.html'],
  ['shattered-lens-',   'shattered-lens-hub.html'],
  ['broken-mirror-',    'broken-mirror-hub.html'],
  ['anxious-mind-',     'anxious-mind-hub.html'],
];

function loadHtml(file) {
  return fs.readFileSync(file, 'utf8');
}

function saveHtml(file, html) {
  fs.writeFileSync(file, html);
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (!m) return null;
  // Strip trailing " | Adopted by Grace"
  return m[1].replace(/\s*[|—-]\s*Adopted by Grace\s*$/i, '').trim();
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  return m ? m[1].trim() : null;
}

function canonicalFor(file) {
  const base = path.basename(file);
  if (base === 'index.html') return SITE + '/';
  return SITE + '/' + base.replace(/\.html$/, '');
}

function isHub(file) {
  return Object.prototype.hasOwnProperty.call(HUBS, path.basename(file));
}

function isIndex(file) {
  return path.basename(file) === 'index.html';
}

function resolveHubForPage(file) {
  const base = path.basename(file);
  if (isIndex(file) || isHub(file)) return null;
  for (const [prefix, hub] of PREFIX_HUBS) {
    if (base.startsWith(prefix)) return hub;
  }
  return null;
}

/**
 * Return the set of JSON-LD @type values already present on a page.
 * (We don't parse strictly; a regex lookup is sufficient for the
 * "do we already have one of these?" question.)
 */
function existingSchemaTypes(html) {
  const blocks = html.match(/<script[^>]+application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || [];
  const types = new Set();
  for (const b of blocks) {
    const typeMatches = b.match(/"@type"\s*:\s*"([^"]+)"/g) || [];
    for (const t of typeMatches) {
      const m = t.match(/"@type"\s*:\s*"([^"]+)"/);
      if (m) types.add(m[1]);
    }
  }
  return types;
}

function organizationAndWebSiteBlock() {
  // This block applies to the whole site — safe on every page.
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "${SITE}/#organization",
      "name": "${SITE_NAME}",
      "url": "${SITE}",
      "logo": {
        "@type": "ImageObject",
        "url": "${OG_IMAGE}",
        "width": 1200,
        "height": 630
      },
      "sameAs": [
        "https://twitter.com/ForeknownOne",
        "https://foreknownone.substack.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "${SITE}/#website",
      "url": "${SITE}",
      "name": "${SITE_NAME}",
      "description": "The biblical case for divine sovereignty — you were chosen before the foundation of the world.",
      "publisher": { "@id": "${SITE}/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "${SITE}/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US"
    }
  ]
}
</script>`;
}

function articleBlock({ title, description, url }) {
  const today = new Date().toISOString().split('T')[0];
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(title)},
  "description": ${JSON.stringify(description)},
  "image": "${OG_IMAGE}",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "${url}" },
  "author": { "@type": "Organization", "name": "${SITE_NAME}", "url": "${SITE}" },
  "publisher": { "@type": "Organization", "name": "${SITE_NAME}", "logo": { "@type": "ImageObject", "url": "${OG_IMAGE}" } },
  "datePublished": "2026-01-01",
  "dateModified": "${today}",
  "inLanguage": "en-US"
}
</script>`;
}

function collectionPageBlock({ title, description, url }) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": ${JSON.stringify(title)},
  "description": ${JSON.stringify(description)},
  "url": "${url}",
  "isPartOf": { "@id": "${SITE}/#website" },
  "publisher": { "@id": "${SITE}/#organization" },
  "inLanguage": "en-US"
}
</script>`;
}

function breadcrumbBlock(file, pageTitle) {
  const base = path.basename(file);
  const url = canonicalFor(file);
  const items = [
    { name: 'Home', item: SITE + '/' },
  ];
  const hubFile = resolveHubForPage(file);
  if (hubFile && HUBS[hubFile]) {
    items.push({
      name: HUBS[hubFile].label,
      item: SITE + '/' + HUBS[hubFile].slug,
    });
  } else if (isHub(file)) {
    // Hub itself — one level trail is still useful
  }
  items.push({
    name: pageTitle,
    item: url,
  });
  const elements = items.map((it, i) => {
    const el = {
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
    };
    if (it.item) el.item = it.item;
    return el;
  });
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": ${JSON.stringify(elements, null, 2)}
}
</script>`;
}

/**
 * Remove our previous Lighthouse schema block (if any) so we can rewrite
 * fresh. Any hand-crafted JSON-LD blocks outside our marker are left alone.
 */
function stripLighthouseSchema(html) {
  return html.replace(
    /\n?\s*<!-- Project Lighthouse: Structured Data -->[\s\S]*?<!-- \/Project Lighthouse Schema -->\n?/g,
    ''
  );
}

function injectBeforeHeadClose(html, block) {
  return html.replace(/<\/head>/i, block + '\n</head>');
}

function process(file) {
  let html = loadHtml(file);

  const title = extractTitle(html) || `${SITE_NAME} — The Biblical Case for Divine Sovereignty`;
  const description =
    extractDescription(html) ||
    'The biblical case for divine sovereignty. You were chosen before the foundation of the world — and grace will never let you go.';
  const url = canonicalFor(file);

  // 1. Remove prior Lighthouse schema block so we rewrite fresh.
  html = stripLighthouseSchema(html);

  // 2. Inspect what handcrafted schema the page already has.
  const types = existingSchemaTypes(html);

  const parts = [];

  // Organization + WebSite root block — always safe; goes on every page.
  // (We check by @id inside @graph to avoid duplication on idempotent runs.)
  if (!/"@id"\s*:\s*"https:\/\/adoptedbygrace\.net\/#website"/.test(html)) {
    parts.push(organizationAndWebSiteBlock());
  }

  // Primary per-page schema — only if no existing Article/CollectionPage/WebSite.
  const hasPrimary =
    types.has('Article') ||
    types.has('NewsArticle') ||
    types.has('BlogPosting') ||
    types.has('CollectionPage') ||
    (types.has('WebSite') && !isIndex(file)); // index fine if already set

  if (!hasPrimary) {
    if (isIndex(file) || isHub(file)) {
      parts.push(collectionPageBlock({ title, description, url }));
    } else {
      parts.push(articleBlock({ title, description, url }));
    }
  }

  // Breadcrumb — only if not already present.
  if (!types.has('BreadcrumbList')) {
    parts.push(breadcrumbBlock(file, title));
  }

  if (parts.length === 0) return false; // nothing to do

  const block =
    '\n<!-- Project Lighthouse: Structured Data -->\n' +
    parts.join('\n') +
    '\n<!-- /Project Lighthouse Schema -->';

  html = injectBeforeHeadClose(html, block);
  saveHtml(file, html);
  return true;
}

function main() {
  const files = fs
    .readdirSync('.')
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !SKIP_FILES.has(f));

  let processed = 0;
  let updated = 0;
  let errors = 0;
  for (const f of files) {
    try {
      if (process(f)) updated++;
      processed++;
    } catch (err) {
      errors++;
      console.error(`  ✗ ${f} — ${err.message}`);
    }
  }

  console.log(`✓ Project Lighthouse schema: ${updated} / ${processed} pages updated (${errors} errors)`);
}

if (require.main === module) {
  main();
}

module.exports = { process };
