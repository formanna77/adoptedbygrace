#!/usr/bin/env node
/**
 * build-testimonies.js
 *
 * Renders the CONTEMPORARY reader-testimony stream into testimony-hub.html
 * from the curated, moderated data in testimonies.json.
 *
 * It rewrites only the region between these two markers on the hub:
 *     <!-- TESTIMONY-STREAM:START -->  ...  <!-- TESTIMONY-STREAM:END -->
 * Everything else on the page is left untouched.
 *
 * Empty array  -> a graceful invitation panel (no fabricated testimonies).
 * Non-empty    -> a wall-grid of reader voices, reusing the existing
 *                 .wall-tile / .wall-quote / .wall-body / .wall-cite CSS,
 *                 followed by an "add yours" call to action.
 *
 * Fields per entry (see testimonies.json _README): quote, body, name,
 * location?, year?. quote/body may carry simple inline HTML because Aaron
 * curates the file; only the cite line (name/location/year) is escaped.
 *
 * Run:  node build-testimonies.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const DATA = path.join(SITE_DIR, 'testimonies.json');
const HUB = path.join(SITE_DIR, 'testimony-hub.html');
const START = '<!-- TESTIMONY-STREAM:START -->';
const END = '<!-- TESTIMONY-STREAM:END -->';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Build the uppercase attribution line: NAME · LOCATION · YEAR
function citeLine(t) {
  const parts = [];
  if (t.name && String(t.name).trim()) parts.push(esc(t.name).toUpperCase());
  if (t.location && String(t.location).trim()) parts.push(esc(t.location).toUpperCase());
  if (t.year && String(t.year).trim()) parts.push(esc(t.year));
  return parts.join(' &middot; ') || 'A READER &middot; RESCUED';
}

function renderTile(t) {
  const quote = (t.quote || '').trim();
  const body = (t.body || '').trim();
  return [
    '   <div class="wall-tile">',
    quote ? `   <p class="wall-quote">${quote}</p>` : '',
    body ? `   <p class="wall-body">${body}</p>` : '',
    `   <p class="wall-cite">${citeLine(t)}</p>`,
    '</div>',
  ].filter(Boolean).join('\n');
}

function renderStream(testimonies) {
  if (!testimonies.length) {
    // Honest empty state — an invitation, never a fabricated story.
    return [
      START,
      '   <div class="wall-grid">',
      '   <div class="wall-tile wall-tile-invite">',
      '   <p class="wall-quote">The next name on this wall has not been written yet.</p>',
      '   <p class="wall-body">Augustine in the garden. Luther in the tower. Newton in the storm. The rescue did not end in a finished century &mdash; it reached you. If grace opened eyes in you that you could never have opened yourself, that is no lesser miracle than theirs. It is the same one, still happening. Tell it, and let your story become evidence for the next person God is drawing.</p>',
      '   <p class="wall-cite">YOUR STORY &middot; BEING WRITTEN NOW</p>',
      '</div>',
      '</div>',
      '   <div class="testimony-stream-cta">',
      '   <a href="/share-your-story" class="btn-primary">Share Your Story</a>',
      '</div>',
      END,
    ].join('\n');
  }

  const tiles = testimonies.map(renderTile).join('\n');
  return [
    START,
    '   <div class="wall-grid">',
    tiles,
    '</div>',
    '   <div class="testimony-stream-cta">',
    `   <p class="testimony-stream-cta-line">Sovereign grace found you too. Add your name to the wall.</p>`,
    '   <a href="/share-your-story" class="btn-primary">Share Your Story</a>',
    '</div>',
    END,
  ].join('\n');
}

// ── Main ──────────────────────────────────────────────────────────
let data;
try {
  data = JSON.parse(fs.readFileSync(DATA, 'utf-8'));
} catch (e) {
  console.error(`build-testimonies: cannot read/parse testimonies.json — ${e.message}`);
  process.exit(1);
}
const testimonies = Array.isArray(data.testimonies) ? data.testimonies : [];

let hub = fs.readFileSync(HUB, 'utf-8');
if (!hub.includes(START) || !hub.includes(END)) {
  console.error(`build-testimonies: markers not found in testimony-hub.html. Expected:\n  ${START}\n  ${END}`);
  process.exit(1);
}

const block = renderStream(testimonies);
const re = new RegExp(START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
hub = hub.replace(re, block);
fs.writeFileSync(HUB, hub, 'utf-8');

console.log(`build-testimonies: rendered ${testimonies.length} contemporary testimon${testimonies.length === 1 ? 'y' : 'ies'} into testimony-hub.html${testimonies.length ? '' : ' (invitation panel — array empty)'}`);
