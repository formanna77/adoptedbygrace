#!/usr/bin/env node
/*
 * inject-hub-jump-nav.js
 * --------------------------------------------------------------
 * Adds a "jump to" table-of-contents nav to every hub page.
 * - Finds all hubs (pages with class="hub-hero" in <header>)
 * - Scans for section headings: <h2 class="hub-section-title">
 *   AND bare <h2> inside .hub-container
 * - Slugifies headings → assigns id + adds .hub-jump-target
 * - Inserts <nav class="hub-jump-nav"> right after </header>
 * - Idempotent: removes any prior auto-generated nav before re-adding
 *
 * Skips hubs with fewer than 3 sections (no nav needed).
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MARKER_START = '<!-- HUB-JUMP-NAV:START (auto-generated, do not edit) -->';
const MARKER_END = '<!-- HUB-JUMP-NAV:END -->';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function findHubFiles() {
  return fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .filter(f => {
      try {
        const c = fs.readFileSync(path.join(ROOT, f), 'utf8');
        return /class="hub-hero"/.test(c);
      } catch { return false; }
    });
}

function processHub(file) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const original = html;

  // 1) Remove any prior auto-generated jump nav (escape regex metachars in markers)
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockRe = new RegExp(
    `\\s*${escRe(MARKER_START)}[\\s\\S]*?${escRe(MARKER_END)}\\s*`, 'g'
  );
  html = html.replace(blockRe, '\n    ');

  // 2) Find the end of the hub-hero element. Could be <header class="hub-hero">
  //    or <section class="hub-hero">. Walk forward to find its matching close tag.
  const heroOpenMatch = html.match(/<(header|section)([^>]*?)class="hub-hero"([^>]*?)>/);
  if (!heroOpenMatch) return { file, status: 'no-hub-hero' };
  const heroTag = heroOpenMatch[1]; // 'header' or 'section'
  const heroOpenIdx = heroOpenMatch.index;

  // Find matching close tag — track nesting
  const openRe = new RegExp(`<${heroTag}\\b`, 'g');
  const closeRe = new RegExp(`</${heroTag}>`, 'g');
  openRe.lastIndex = heroOpenIdx + heroOpenMatch[0].length;
  let depth = 1;
  let heroEnd = -1;
  while (depth > 0) {
    closeRe.lastIndex = openRe.lastIndex;
    const closeM = closeRe.exec(html);
    if (!closeM) break;
    // Are there any opens between current pos and this close?
    const segment = html.slice(openRe.lastIndex, closeM.index);
    const opensInBetween = (segment.match(openRe) || []).length;
    depth += opensInBetween - 1;
    openRe.lastIndex = closeM.index + closeM[0].length;
    if (depth === 0) {
      heroEnd = closeM.index + closeM[0].length;
      break;
    }
  }
  if (heroEnd === -1) return { file, status: 'no-hero-close' };

  const before = html.slice(0, heroEnd);
  let body = html.slice(heroEnd);

  const headings = [];
  const h2Re = /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g;
  let m;
  let pos = 0;
  const replacements = [];
  while ((m = h2Re.exec(body)) !== null) {
    const fullTag = m[0];
    const attrs = m[1] || '';
    const inner = m[2];
    // Skip card-title etc.
    if (/class="[^"]*card-title/.test(attrs)) continue;
    // Skip if it appears to be inside a card (rough check: look back 200 chars)
    const lookback = body.slice(Math.max(0, m.index - 300), m.index);
    if (/<div class="hub-card[^"]*"[^>]*>\s*$/.test(lookback)) continue;

    const text = stripTags(inner);
    if (!text || text.length < 2) continue;

    let id;
    const idMatch = attrs.match(/\sid="([^"]+)"/);
    if (idMatch) {
      id = idMatch[1];
    } else {
      id = slugify(text);
      if (!id) continue;
    }

    // Ensure uniqueness
    let unique = id, n = 2;
    while (headings.some(h => h.id === unique)) {
      unique = `${id}-${n++}`;
    }
    headings.push({ id: unique, text, fullTag, attrs, inner, index: m.index });
  }

  // FALLBACK: if we found fewer than 3 section headings, use card titles instead.
  // This catches hubs that are just walls of cards with no section organization.
  let usingCardFallback = false;
  if (headings.length < 3) {
    headings.length = 0;
    const cardRe = /<h3(\s[^>]*)?class="([^"]*\bcard-title\b[^"]*)"([^>]*)>([\s\S]*?)<\/h3>/g;
    let cm;
    while ((cm = cardRe.exec(body)) !== null) {
      const text = stripTags(cm[4]);
      if (!text || text.length < 2) continue;
      let id = slugify(text);
      if (!id) continue;
      let unique = id, n = 2;
      while (headings.some(h => h.id === unique)) {
        unique = `${id}-${n++}`;
      }
      headings.push({
        id: unique,
        text,
        fullTag: cm[0],
        attrsBefore: cm[1] || '',
        classes: cm[2],
        attrsAfter: cm[3] || '',
        inner: cm[4],
        index: cm.index,
        isCard: true,
      });
    }
    usingCardFallback = true;
  }

  if (headings.length < 3) {
    // Still nothing useful — restore and skip
    if (html !== original) {
      fs.writeFileSync(fp, html);
      return { file, status: 'cleaned-only', sections: headings.length };
    }
    return { file, status: 'skip-too-few', sections: headings.length };
  }

  // 3) Inject id + hub-jump-target class into each heading
  // Process in reverse so indices stay valid
  let newBody = body;
  for (let i = headings.length - 1; i >= 0; i--) {
    const h = headings[i];
    let newTag;
    if (h.isCard) {
      // h3 card-title — preserve existing classes, add id + hub-jump-target
      const newClasses = h.classes.includes('hub-jump-target')
        ? h.classes
        : `${h.classes} hub-jump-target`;
      let attrsBefore = h.attrsBefore || '';
      // Strip any existing id from attrsBefore/attrsAfter
      attrsBefore = attrsBefore.replace(/\sid="[^"]*"/, '');
      let attrsAfter = h.attrsAfter.replace(/\sid="[^"]*"/, '');
      newTag = `<h3${attrsBefore}class="${newClasses}" id="${h.id}"${attrsAfter}>${h.inner}</h3>`;
    } else {
      let attrs = h.attrs || '';
      if (/\sid="/.test(attrs)) {
        attrs = attrs.replace(/\sid="[^"]*"/, ` id="${h.id}"`);
      } else {
        attrs = ` id="${h.id}"` + attrs;
      }
      if (/\sclass="/.test(attrs)) {
        attrs = attrs.replace(/\sclass="([^"]*)"/, (mm, c) => {
          if (c.includes('hub-jump-target')) return mm;
          return ` class="${c} hub-jump-target"`;
        });
      } else {
        attrs = ` class="hub-jump-target"` + attrs;
      }
      newTag = `<h2${attrs}>${h.inner}</h2>`;
    }
    newBody = newBody.slice(0, h.index) + newTag + newBody.slice(h.index + h.fullTag.length);
  }

  // 4) Build the jump-nav block
  const items = headings.map(h =>
    `            <li><a href="#${h.id}">${h.text}</a></li>`
  ).join('\n');

  const labelText = usingCardFallback ? 'Jump to an article' : 'Jump to a section';
  const ariaLabel = usingCardFallback ? 'Jump to article' : 'Jump to section';
  const extraClass = usingCardFallback ? ' hub-jump-nav--articles' : '';

  const navBlock = `
    ${MARKER_START}
    <nav class="hub-jump-nav${extraClass}" aria-label="${ariaLabel}">
        <p class="hub-jump-nav-label">${labelText}</p>
        <ul class="hub-jump-nav-list">
${items}
        </ul>
    </nav>
    ${MARKER_END}
`;

  // 5) Stitch back together with nav inserted right after </header>
  const finalHtml = before + navBlock + newBody;

  fs.writeFileSync(fp, finalHtml);
  return { file, status: 'updated', sections: headings.length };
}

function main() {
  const hubs = findHubFiles();
  console.log(`Found ${hubs.length} hub pages.\n`);
  let updated = 0, skipped = 0;
  for (const f of hubs) {
    const r = processHub(f);
    if (r.status === 'updated') {
      updated++;
      console.log(`  ✓ ${r.file}  (${r.sections} sections)`);
    } else if (r.status === 'skip-too-few') {
      skipped++;
      console.log(`  - ${r.file}  (only ${r.sections} sections, skipped)`);
    } else {
      console.log(`  ! ${r.file}  ${r.status}`);
    }
  }
  console.log(`\nDone. Updated: ${updated}. Skipped: ${skipped}. Total hubs: ${hubs.length}.`);
}

main();
