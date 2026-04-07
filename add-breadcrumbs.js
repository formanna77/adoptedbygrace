#!/usr/bin/env node
// Evangelist: batch-add BreadcrumbList schema to content pages missing it
const fs = require('fs');

const BASE = 'https://adoptedbygrace.net';

// Map of file => [hubName, hubSlug]
const MAP = {
  'counter-cs-lewis-free-will.html': ['Demolition', 'demolition-hub'],
  'history-every-revival-sovereign-grace.html': ['History', 'history-timeline'],
  'joy-freedom-of-smallness.html': ['Joy of Grace', 'joy-hub'],
  'joy-god-big-enough.html': ['Joy of Grace', 'joy-hub'],
  'joy-in-suffering.html': ['Joy of Grace', 'joy-hub'],
  'joy-security-changes-everything.html': ['Joy of Grace', 'joy-hub'],
  'joy-staggering-contrast.html': ['Joy of Grace', 'joy-hub'],
  'joy-worship-without-ceiling.html': ['Joy of Grace', 'joy-hub'],
  'philosophy-children-argument.html': ['Philosophy', 'philosophy-hub'],
  'psychology-language-you-already-speak.html': ['Psychology', 'psychology-hub'],
  'question-repentance-total-depravity.html': ['Questions', 'questions'],
  'question-visual-theology.html': ['Questions', 'questions'],
  'secular-recovery-total-depravity.html': ['Secular Evidence', 'secular-evidence'],
  'start-here.html': ['Start Here', 'start-here'],
  'start-here-phase1.html': ['Start Here', 'start-here'],
  'start-here-phase2.html': ['Start Here', 'start-here'],
  'start-here-phase3.html': ['Start Here', 'start-here'],
  'start-here-phase4.html': ['Start Here', 'start-here'],
  'start-here-phase5.html': ['Start Here', 'start-here'],
  'story-cross-examination.html': ['Stories', 'stories'],
  'story-real-conversions.html': ['Stories', 'stories'],
  'systematic-tulip.html': ['Systematic Theology', 'systematic-theology'],
  'analogies-illustrations.html': ['Stories', 'stories'],
  'creeds-confessions.html': ['History', 'history-timeline'],
};

let added = 0, skipped = 0;
for (const [file, [hubName, hubSlug]] of Object.entries(MAP)) {
  if (!fs.existsSync(file)) { console.log(`SKIP missing: ${file}`); skipped++; continue; }
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('BreadcrumbList')) { skipped++; continue; }

  // Extract title
  const titleMatch = html.match(/<title>([^<|]+?)(?:\s*\|[^<]*)?<\/title>/);
  let pageTitle = titleMatch ? titleMatch[1].trim() : file.replace(/\.html$/, '').replace(/-/g, ' ');
  // Escape quotes for JSON
  pageTitle = pageTitle.replace(/"/g, '\\"').replace(/'/g, "\u2019");

  const slug = file.replace(/\.html$/, '');
  const schema = `    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "${BASE}/"},
            {"@type": "ListItem", "position": 2, "name": "${hubName}", "item": "${BASE}/${hubSlug}"},
            {"@type": "ListItem", "position": 3, "name": "${pageTitle}"}
        ]
    }
    </script>
`;

  // Insert before </head>
  if (!html.includes('</head>')) { console.log(`SKIP no </head>: ${file}`); skipped++; continue; }
  html = html.replace('</head>', schema + '</head>');
  fs.writeFileSync(file, html);
  added++;
  console.log(`✅ ${file}`);
}
console.log(`\nAdded BreadcrumbList to ${added} pages (${skipped} skipped)`);
