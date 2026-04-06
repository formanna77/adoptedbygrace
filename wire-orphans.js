#!/usr/bin/env node
/**
 * wire-orphans.js — Finds all article pages not linked from their hub page,
 * then inserts a .hub-card for each orphan into the correct hub.
 *
 * Usage: node wire-orphans.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

// ═══════════════════════════════════════════════════════
// HUB MAPPING: prefix → { hub, eyebrow, scripture? }
// ═══════════════════════════════════════════════════════
const HUB_MAP = [
  { prefix: 'question-',       hub: 'questions.html',              eyebrow: 'Questions' },
  { prefix: 'objection-',      hub: 'questions.html',              eyebrow: 'Questions' },
  { prefix: 'demolition-',     hub: 'demolition-hub.html',         eyebrow: 'Demolition' },
  { prefix: 'psychology-',     hub: 'psychology-hub.html',         eyebrow: 'Psychology' },
  { prefix: 'philosophy-',     hub: 'philosophy-hub.html',         eyebrow: 'Philosophy' },
  { prefix: 'story-',          hub: 'stories.html',                eyebrow: 'Stories' },
  { prefix: 'devotional-',     hub: 'devotionals.html',            eyebrow: 'Devotionals' },
  { prefix: 'analogy-',        hub: 'analogies-illustrations.html', eyebrow: 'Analogies' },
  { prefix: 'secular-',        hub: 'secular-evidence.html',       eyebrow: 'Secular Evidence' },
  { prefix: 'systematic-',     hub: 'systematic-theology.html',    eyebrow: 'Systematic Theology' },
  { prefix: 'theologian-',     hub: 'theologians.html',            eyebrow: 'Theologians' },
  { prefix: 'history-',        hub: 'history-timeline.html',       eyebrow: 'History' },
  { prefix: 'compare-',        hub: 'comparisons-hub.html',        eyebrow: 'Comparisons' },
  { prefix: 'pastoral-',       hub: 'pastoral-hub.html',           eyebrow: 'Pastoral' },
  { prefix: 'essay-',          hub: 'essays.html',                 eyebrow: 'Essays' },
  { prefix: 'ot-',             hub: 'ot-hub.html',                 eyebrow: 'Old Testament' },
  { prefix: 'invisible-wall-', hub: 'invisible-wall-hub.html',     eyebrow: 'The Invisible Wall' },
  { prefix: 'open-wound-',     hub: 'open-wound-hub.html',         eyebrow: 'The Open Wound' },
  { prefix: 'shattered-lens-', hub: 'shattered-lens-hub.html',     eyebrow: 'The Shattered Lens' },
  { prefix: 'broken-mirror-',  hub: 'broken-mirror-hub.html',      eyebrow: 'The Broken Mirror' },
  { prefix: 'anxious-mind-',   hub: 'anxious-mind-hub.html',       eyebrow: 'The Anxious Mind' },
  { prefix: 'resistance-',     hub: 'psychology-hub.html',         eyebrow: 'Psychology' },
  { prefix: 'apologetic-',     hub: 'questions.html',              eyebrow: 'Questions' },
  { prefix: 'hymn-',           hub: 'devotionals.html',            eyebrow: 'Devotionals' },
  { prefix: 'counter-',        hub: 'demolition-hub.html',         eyebrow: 'Demolition' },
  { prefix: 'creed-',          hub: 'history-timeline.html',       eyebrow: 'History' },
  { prefix: 'debate-',         hub: 'philosophy-hub.html',         eyebrow: 'Philosophy' },
  { prefix: 'psalms-',         hub: 'ot-hub.html',                 eyebrow: 'Old Testament' },
  { prefix: 'romans-8',        hub: 'questions.html',              eyebrow: 'Questions' },
  { prefix: 'romans-9',        hub: 'questions.html',              eyebrow: 'Questions' },
  { prefix: 'scripture-tsunami-faith', hub: 'questions.html',      eyebrow: 'Questions' },
  { prefix: 'freedom',         hub: 'philosophy-hub.html',         eyebrow: 'Philosophy' },
  { prefix: 'for-arminians',   hub: 'demolition-hub.html',         eyebrow: 'Demolition' },
];

// Pages that are NOT articles — skip these
const SKIP_PAGES = new Set([
  'index.html', 'about.html', 'contact.html', 'donate.html', 'search.html',
  'sitemap.html', 'privacy.html', 'terms.html', 'start-here.html', '404.html',
  'belief-assessment.html', 'question-faith-origin-test.html', 'verse-explorer.html',
  'scripture-tsunami.html', 'best-reads.html', 'for-deconstructed.html',
  'for-hurting.html', 'for-pastors.html', 'romans-8.html', 'romans-9.html',
  '_nav-template.html', 'all-content.html', 'connections.html', 'explore-map.html',
  'quiz.html', 'start-here-assessment.html', 'topics.html',
  'start-here-phase1.html', 'start-here-phase2.html', 'start-here-phase3.html',
  'start-here-phase4.html', 'start-here-phase5.html',
  // Hub pages themselves
  'questions.html', 'demolition-hub.html', 'psychology-hub.html', 'philosophy-hub.html',
  'stories.html', 'devotionals.html', 'analogies-illustrations.html', 'secular-evidence.html',
  'systematic-theology.html', 'theologians.html', 'history-timeline.html', 'essays.html',
  'comparisons-hub.html', 'pastoral-hub.html', 'ot-hub.html',
  'invisible-wall-hub.html', 'open-wound-hub.html', 'shattered-lens-hub.html',
  'broken-mirror-hub.html', 'anxious-mind-hub.html',
  'creeds-confessions.html', 'best-reads.html',
]);

// ═══════════════════════════════════════════════════════
// STEP 1: Scan all HTML files and find their hub assignment
// ═══════════════════════════════════════════════════════
const allFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !SKIP_PAGES.has(f));

function getHub(filename) {
  for (const mapping of HUB_MAP) {
    if (filename.startsWith(mapping.prefix)) {
      return mapping;
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════
// STEP 2: For each hub, find which articles are already linked
// ═══════════════════════════════════════════════════════
function getLinkedPages(hubFile) {
  if (!fs.existsSync(hubFile)) return new Set();
  const content = fs.readFileSync(hubFile, 'utf8');
  const linked = new Set();
  // Match href="/filename" or href="filename" or href="/filename.html"
  const regex = /href=["']\/?([\w-]+(?:\.html)?)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    let page = match[1];
    if (!page.endsWith('.html')) page += '.html';
    linked.add(page);
  }
  return linked;
}

// ═══════════════════════════════════════════════════════
// STEP 3: Extract title and description from article page
// ═══════════════════════════════════════════════════════
function getPageMeta(filename) {
  const content = fs.readFileSync(filename, 'utf8');

  // Extract <title>
  let title = '';
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1].replace(/\s*\|.*$/, '').replace(/\s*[–—].*$/, '').trim();
  }

  // Try h1 if title is empty or generic
  if (!title || title === 'Adopted by Grace') {
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match) title = h1Match[1].trim();
  }

  // Extract meta description
  let description = '';
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) {
    description = descMatch[1].trim();
  }

  // Fallback: first <p> inside article-body
  if (!description) {
    const pMatch = content.match(/<article[^>]*class=["'][^"']*article-body[^"']*["'][^>]*>[\s\S]*?<p>([^<]{20,200})/i);
    if (pMatch) {
      description = pMatch[1].trim();
      if (description.length > 160) description = description.substring(0, 157) + '...';
    }
  }

  // Extract a scripture reference if present
  let scripture = '';
  const scriptureMatch = content.match(/<cite>([^<]+)<\/cite>/i);
  if (scriptureMatch) {
    scripture = scriptureMatch[1].trim().toUpperCase();
  }

  if (!description) description = title;

  return { title, description, scripture };
}

// ═══════════════════════════════════════════════════════
// STEP 4: Generate hub-card HTML
// ═══════════════════════════════════════════════════════
function makeCard(filename, number, meta) {
  const href = '/' + filename.replace('.html', '');
  const scriptureDiv = meta.scripture
    ? `\n                    <div class="card-scripture">${meta.scripture}</div>`
    : '';

  return `                <a href="${href}" class="hub-card">
                    <div class="card-number">${String(number).padStart(2, '0')}</div>
                    <h3 class="card-title">${meta.title}</h3>
                    <p class="card-description">${meta.description}</p>${scriptureDiv}
                    <div class="card-footer">
                        <span class="card-read">Read <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg></span>
                    </div>
                </a>`;
}

// ═══════════════════════════════════════════════════════
// STEP 5: Find the last .hub-grid in the hub and insert cards
// ═══════════════════════════════════════════════════════
function insertCardsIntoHub(hubFile, cards) {
  let content = fs.readFileSync(hubFile, 'utf8');

  // Find the last closing </div> of a .hub-grid section
  // Strategy: find all hub-grid divs, insert into the last one
  const gridOpenRegex = /<div\s+class=["']hub-grid["']/g;
  let lastGridPos = -1;
  let match;
  while ((match = gridOpenRegex.exec(content)) !== null) {
    lastGridPos = match.index;
  }

  if (lastGridPos === -1) {
    // No hub-grid found — try to find hub-container and add a grid
    const containerMatch = content.match(/<div\s+class=["']hub-container["']/);
    if (containerMatch) {
      // Find closing </div> of hub-container by looking for </div> before footer
      const footerPos = content.indexOf('<footer');
      if (footerPos === -1) {
        console.log(`  ⚠ Cannot find insertion point in ${hubFile}`);
        return 0;
      }
      const insertPos = content.lastIndexOf('</div>', footerPos);
      const newGrid = `\n            <h2 class="hub-section-title">More Articles</h2>\n            <div class="hub-grid">\n${cards.join('\n')}\n            </div>\n`;
      content = content.slice(0, insertPos) + newGrid + content.slice(insertPos);
    } else {
      console.log(`  ⚠ No hub-grid or hub-container found in ${hubFile}`);
      return 0;
    }
  } else {
    // Find the closing </div> for this grid
    // Count nested divs to find the matching close
    let depth = 0;
    let i = lastGridPos;
    let foundClose = -1;
    while (i < content.length) {
      if (content.substr(i, 4) === '<div') {
        depth++;
      } else if (content.substr(i, 6) === '</div>') {
        depth--;
        if (depth === 0) {
          foundClose = i;
          break;
        }
      }
      i++;
    }

    if (foundClose === -1) {
      console.log(`  ⚠ Cannot find closing </div> for hub-grid in ${hubFile}`);
      return 0;
    }

    // Insert cards before the closing </div>
    const insertion = '\n' + cards.join('\n') + '\n            ';
    content = content.slice(0, foundClose) + insertion + content.slice(foundClose);
  }

  if (!DRY_RUN) {
    fs.writeFileSync(hubFile, content, 'utf8');
  }
  return cards.length;
}

// ═══════════════════════════════════════════════════════
// STEP 6: Count existing cards in hub to set correct numbering
// ═══════════════════════════════════════════════════════
function countExistingCards(hubFile) {
  if (!fs.existsSync(hubFile)) return 0;
  const content = fs.readFileSync(hubFile, 'utf8');
  return (content.match(/class=["']hub-card/g) || []).length;
}

// ═══════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════');
console.log('  ORPHAN WIRING SCRIPT');
console.log('  Mode:', DRY_RUN ? 'DRY RUN' : 'LIVE');
console.log('═══════════════════════════════════════════\n');

// Group orphans by hub
const orphansByHub = {};
const unmapped = [];
let totalOrphans = 0;

for (const file of allFiles) {
  const mapping = getHub(file);
  if (!mapping) {
    // Check if it's a known standalone page we missed
    if (!file.startsWith('start-here-phase')) {
      unmapped.push(file);
    }
    continue;
  }

  const linked = getLinkedPages(mapping.hub);
  const fileNoExt = file.replace('.html', '');

  if (!linked.has(file) && !linked.has(fileNoExt)) {
    if (!orphansByHub[mapping.hub]) {
      orphansByHub[mapping.hub] = { pages: [], eyebrow: mapping.eyebrow };
    }
    orphansByHub[mapping.hub].pages.push(file);
    totalOrphans++;
  }
}

console.log(`Total article files scanned: ${allFiles.length}`);
console.log(`Total orphans found: ${totalOrphans}`);
console.log(`Unmapped files (no hub prefix): ${unmapped.length}`);
if (unmapped.length > 0) {
  console.log('  Unmapped:', unmapped.join(', '));
}
console.log('');

// Process each hub
let totalWired = 0;
const hubsModified = [];

for (const [hubFile, data] of Object.entries(orphansByHub)) {
  const { pages, eyebrow } = data;
  console.log(`\n📖 ${hubFile} — ${pages.length} orphans to wire`);

  if (!fs.existsSync(hubFile)) {
    console.log(`  ⚠ Hub file does not exist! Skipping.`);
    continue;
  }

  let existingCount = countExistingCards(hubFile);
  const cards = [];

  for (const page of pages.sort()) {
    existingCount++;
    const meta = getPageMeta(page);
    if (!meta.title) {
      console.log(`  ⚠ No title found for ${page}, skipping`);
      continue;
    }
    const card = makeCard(page, existingCount, meta);
    cards.push(card);
    console.log(`  ✅ ${page} → "${meta.title}"`);
  }

  if (cards.length > 0) {
    const inserted = insertCardsIntoHub(hubFile, cards);
    totalWired += inserted;
    if (inserted > 0) hubsModified.push(hubFile);
    console.log(`  → Inserted ${inserted} cards into ${hubFile}`);
  }
}

console.log('\n═══════════════════════════════════════════');
console.log(`  RESULTS`);
console.log(`  Orphans found: ${totalOrphans}`);
console.log(`  Cards inserted: ${totalWired}`);
console.log(`  Hubs modified: ${hubsModified.length} (${hubsModified.join(', ')})`);
console.log(`  Unmapped: ${unmapped.length}`);
console.log('═══════════════════════════════════════════');
