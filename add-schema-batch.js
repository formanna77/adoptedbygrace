#!/usr/bin/env node
/**
 * EVANGELIST BATCH SCRIPT — Add BreadcrumbList + FAQPage + Article schema
 *
 * This script:
 * 1. Adds BreadcrumbList schema to ALL article pages that don't have it
 * 2. Adds FAQPage schema to question-* and demolition-* pages that don't have it
 * 3. Adds Article schema to pages that have NO schema at all
 *
 * Safe to run repeatedly — checks for existing schema before adding.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Hub mapping for breadcrumbs
const HUB_MAP = {
  'question-': { name: 'Questions', url: 'https://adoptedbygrace.net/questions.html' },
  'demolition-': { name: 'Demolition', url: 'https://adoptedbygrace.net/demolition-hub.html' },
  'psychology-': { name: 'Psychology', url: 'https://adoptedbygrace.net/psychology-hub.html' },
  'philosophy-': { name: 'Philosophy', url: 'https://adoptedbygrace.net/philosophy-hub.html' },
  'story-': { name: 'Stories', url: 'https://adoptedbygrace.net/stories.html' },
  'devotional-': { name: 'Devotionals', url: 'https://adoptedbygrace.net/devotionals.html' },
  'secular-': { name: 'Secular Evidence', url: 'https://adoptedbygrace.net/secular-evidence.html' },
  'systematic-': { name: 'Systematic Theology', url: 'https://adoptedbygrace.net/systematic-theology.html' },
  'theologian-': { name: 'Theologians', url: 'https://adoptedbygrace.net/theologians.html' },
  'history-': { name: 'History', url: 'https://adoptedbygrace.net/history-timeline.html' },
  'ot-': { name: 'Old Testament', url: 'https://adoptedbygrace.net/ot-hub.html' },
  'analogy-': { name: 'Stories & Analogies', url: 'https://adoptedbygrace.net/stories.html' },
  'compare-': { name: 'Comparisons', url: 'https://adoptedbygrace.net/comparisons-hub.html' },
  'pastoral-': { name: 'Pastoral', url: 'https://adoptedbygrace.net/pastoral-hub.html' },
  'hymn-': { name: 'History', url: 'https://adoptedbygrace.net/history-timeline.html' },
  'objection-': { name: 'Questions', url: 'https://adoptedbygrace.net/questions.html' },
  'romans-': { name: 'Old Testament', url: 'https://adoptedbygrace.net/ot-hub.html' },
  'resistance-': { name: 'Psychology', url: 'https://adoptedbygrace.net/psychology-hub.html' },
  'apologetic-': { name: 'Questions', url: 'https://adoptedbygrace.net/questions.html' },
  'invisible-wall-': { name: 'The Invisible Wall', url: 'https://adoptedbygrace.net/invisible-wall-hub.html' },
  'open-wound-': { name: 'The Open Wound', url: 'https://adoptedbygrace.net/open-wound-hub.html' },
  'shattered-lens-': { name: 'The Shattered Lens', url: 'https://adoptedbygrace.net/shattered-lens-hub.html' },
  'broken-mirror-': { name: 'The Broken Mirror', url: 'https://adoptedbygrace.net/broken-mirror-hub.html' },
  'anxious-mind-': { name: 'The Anxious Mind', url: 'https://adoptedbygrace.net/anxious-mind-hub.html' },
  'for-': { name: 'Start Here', url: 'https://adoptedbygrace.net/start-here.html' },
  'essays': { name: 'Essays', url: 'https://adoptedbygrace.net/essays.html' },
  'scripture-': { name: 'Old Testament', url: 'https://adoptedbygrace.net/ot-hub.html' },
  'creed-': { name: 'History', url: 'https://adoptedbygrace.net/history-timeline.html' },
};

// Pages to skip (hubs, special pages, templates)
const SKIP_PAGES = new Set([
  '_nav-template.html', 'index.html', 'sitemap.html', 'topics.html', 'all-content.html',
  'search.html', 'about.html', 'contact.html', 'best-reads.html', 'start-here.html',
  'questions.html', 'demolition-hub.html', 'psychology-hub.html', 'philosophy-hub.html',
  'stories.html', 'devotionals.html', 'secular-evidence.html', 'systematic-theology.html',
  'theologians.html', 'history-timeline.html', 'ot-hub.html', 'comparisons-hub.html',
  'pastoral-hub.html', 'invisible-wall-hub.html', 'open-wound-hub.html',
  'shattered-lens-hub.html', 'broken-mirror-hub.html', 'anxious-mind-hub.html',
  'essays.html', 'analogies-illustrations.html', 'creeds-confessions.html',
  'belief-assessment.html', 'question-faith-origin-test.html', 'verse-explorer.html',
  'start-here-assessment.html', '404.html', 'privacy.html', 'terms.html',
]);

// Hub pages that need SiteNavigationElement schema
const HUB_PAGES = [
  'questions.html', 'demolition-hub.html', 'psychology-hub.html', 'philosophy-hub.html',
  'stories.html', 'devotionals.html', 'secular-evidence.html', 'systematic-theology.html',
  'theologians.html', 'history-timeline.html', 'ot-hub.html', 'comparisons-hub.html',
  'pastoral-hub.html', 'invisible-wall-hub.html', 'open-wound-hub.html',
  'shattered-lens-hub.html', 'broken-mirror-hub.html', 'anxious-mind-hub.html',
  'essays.html',
];

function getHub(filename) {
  // Sort prefixes by length descending so longer prefixes match first
  const prefixes = Object.keys(HUB_MAP).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (filename.startsWith(prefix)) {
      return HUB_MAP[prefix];
    }
  }
  return null;
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (!match) return null;
  return match[1].replace(/\s*\|\s*Adopted by Grace\s*$/i, '').trim();
}

function extractDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (!match) {
    const match2 = html.match(/<meta\s+content="([^"]+)"\s+name="description"/i);
    return match2 ? match2[1] : '';
  }
  return match[1];
}

function extractH1(html) {
  const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return match ? match[1].trim() : null;
}

function extractH2s(html) {
  const matches = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)];
  return matches.map(m => m[1].trim());
}

function extractFirstParagraphAfterH2(html, h2Text) {
  const escapedH2 = h2Text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<h2[^>]*>${escapedH2}<\/h2>\\s*(?:<[^p][^>]*>[\\s\\S]*?<\/[^p][^>]*>\\s*)*<p[^>]*>([\\s\\S]*?)<\/p>`, 'i');
  const match = html.match(regex);
  if (match) {
    // Strip HTML tags from the paragraph
    return match[1].replace(/<[^>]+>/g, '').trim().substring(0, 300);
  }
  return null;
}

function generateBreadcrumbSchema(filename, hub, title) {
  const baseUrl = 'https://adoptedbygrace.net';
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      { "@type": "ListItem", "position": 2, "name": hub.name, "item": hub.url },
      { "@type": "ListItem", "position": 3, "name": title }
    ]
  }, null, 4);
}

function generateArticleSchema(filename, title, description) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `https://adoptedbygrace.net/${filename}`,
    "author": { "@type": "Person", "name": "Aaron Forman", "url": "https://adoptedbygrace.net/about.html" },
    "publisher": { "@type": "Organization", "name": "Adopted by Grace", "url": "https://adoptedbygrace.net" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://adoptedbygrace.net/${filename}` }
  }, null, 4);
}

function generateFAQSchema(questions) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  }, null, 4);
}

// Extract FAQ-worthy questions from page content
function extractFAQsFromContent(html, filename, title) {
  const faqs = [];
  const h2s = extractH2s(html);

  // Strategy: Use H2 headings that are questions or can be turned into questions
  for (const h2 of h2s) {
    if (faqs.length >= 3) break;

    const paragraph = extractFirstParagraphAfterH2(html, h2);
    if (!paragraph || paragraph.length < 30) continue;

    // If H2 is already a question, use it directly
    if (h2.includes('?')) {
      faqs.push({
        question: h2,
        answer: paragraph.substring(0, 280) + (paragraph.length > 280 ? '...' : '')
      });
    }
  }

  // If we couldn't get enough from H2 questions, create from title
  if (faqs.length === 0) {
    const desc = extractDescription(html);
    if (title && desc) {
      // For question pages, the title is often already a question
      if (title.includes('?')) {
        faqs.push({
          question: title,
          answer: desc.substring(0, 280) + (desc.length > 280 ? '...' : '')
        });
      } else {
        // Turn the title into a question
        faqs.push({
          question: `What does the Bible teach about ${title.toLowerCase().replace(/^(the |a |an )/i, '')}?`,
          answer: desc.substring(0, 280) + (desc.length > 280 ? '...' : '')
        });
      }
    }
  }

  return faqs;
}

function insertSchemaBeforeHeadClose(html, schemaJson) {
  const scriptTag = `    <script type="application/ld+json">\n    ${schemaJson}\n    </script>`;
  // Insert before </head>
  return html.replace('</head>', `${scriptTag}\n</head>`);
}

// ─── MAIN ───
let stats = {
  breadcrumbAdded: 0,
  faqAdded: 0,
  articleAdded: 0,
  skipped: 0,
  errors: 0,
  filesModified: new Set(),
};

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !SKIP_PAGES.has(f));

for (const filename of files) {
  const filepath = path.join(ROOT, filename);
  let html = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  const title = extractTitle(html) || extractH1(html) || filename.replace('.html', '');
  const description = extractDescription(html);
  const hub = getHub(filename);

  // Skip if no hub mapping (special pages)
  if (!hub) {
    stats.skipped++;
    continue;
  }

  // 1. Add BreadcrumbList if missing
  if (!html.includes('BreadcrumbList')) {
    const breadcrumbJson = generateBreadcrumbSchema(filename, hub, title);
    html = insertSchemaBeforeHeadClose(html, breadcrumbJson);
    stats.breadcrumbAdded++;
    modified = true;
  }

  // 2. Add Article schema if missing entirely
  if (!html.includes('"@type": "Article"') && !html.includes('"@type":"Article"')) {
    const articleJson = generateArticleSchema(filename, title, description);
    html = insertSchemaBeforeHeadClose(html, articleJson);
    stats.articleAdded++;
    modified = true;
  }

  // 3. Add FAQPage schema to question-* and demolition-* pages if missing
  if ((filename.startsWith('question-') || filename.startsWith('demolition-')) &&
      !html.includes('FAQPage') &&
      !filename.includes('faith-origin-test')) {
    const faqs = extractFAQsFromContent(html, filename, title);
    if (faqs.length > 0) {
      const faqJson = generateFAQSchema(faqs);
      html = insertSchemaBeforeHeadClose(html, faqJson);
      stats.faqAdded++;
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filepath, html, 'utf8');
    stats.filesModified.add(filename);
  }
}

// Also handle hub pages — add BreadcrumbList for hubs
for (const hubFile of HUB_PAGES) {
  const filepath = path.join(ROOT, hubFile);
  if (!fs.existsSync(filepath)) continue;

  let html = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  const title = extractTitle(html) || hubFile.replace('.html', '');

  if (!html.includes('BreadcrumbList')) {
    const breadcrumbJson = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adoptedbygrace.net/" },
        { "@type": "ListItem", "position": 2, "name": title }
      ]
    }, null, 4);
    html = insertSchemaBeforeHeadClose(html, breadcrumbJson);
    stats.breadcrumbAdded++;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filepath, html, 'utf8');
    stats.filesModified.add(hubFile);
  }
}

console.log('\n══════════════════════════════════════');
console.log('  SCHEMA BATCH SCRIPT — RESULTS');
console.log('══════════════════════════════════════');
console.log(`BreadcrumbList schemas added: ${stats.breadcrumbAdded}`);
console.log(`FAQPage schemas added:        ${stats.faqAdded}`);
console.log(`Article schemas added:        ${stats.articleAdded}`);
console.log(`Files modified:               ${stats.filesModified.size}`);
console.log(`Files skipped:                ${stats.skipped}`);
console.log(`Errors:                       ${stats.errors}`);
console.log('\nModified files:');
for (const f of [...stats.filesModified].sort()) {
  console.log(`  ✓ ${f}`);
}
