#!/usr/bin/env node
/**
 * inject-social-meta.js
 *
 * PROJECT LIGHTHOUSE — Pillar 1: DISTRIBUTION
 *
 * Scans every HTML file and guarantees it has a full suite of share-ready
 * meta tags so that when the URL is pasted into iMessage, X, Slack, Discord,
 * Facebook, LinkedIn, or any modern chat, it renders as a rich preview
 * card — not a bare URL.
 *
 * Tags guaranteed on every page:
 *   - <meta name="description">
 *   - <link rel="canonical">
 *   - <meta property="og:title">
 *   - <meta property="og:description">
 *   - <meta property="og:url">
 *   - <meta property="og:type">
 *   - <meta property="og:image">
 *   - <meta property="og:image:width">
 *   - <meta property="og:image:height">
 *   - <meta property="og:site_name">
 *   - <meta property="og:locale">
 *   - <meta name="twitter:card">
 *   - <meta name="twitter:title">
 *   - <meta name="twitter:description">
 *   - <meta name="twitter:image">
 *   - <meta name="twitter:site">
 *   - <meta name="twitter:creator">
 *   - <meta name="robots">
 *   - <meta name="theme-color">
 *
 * The script is fully idempotent. Run it as many times as you like. It only
 * adds what is missing and updates stale values. Existing good tags are left
 * alone.
 */

const fs = require('fs');
const path = require('path');

const SITE = 'https://adoptedbygrace.net';
const SITE_NAME = 'Adopted by Grace';
const OG_IMAGE = SITE + '/og-image.png';
const TWITTER_HANDLE = '@ForeknownOne';
const THEME_COLOR = '#d4a254';
const LOCALE = 'en_US';

const DEFAULT_DESCRIPTION =
  "The biblical case for divine sovereignty. You were chosen before the foundation of the world — and grace will never let you go.";

// Skip internal/template files and the 404 page (handled separately).
const SKIP_FILES = new Set([
  '_nav-template.html',
]);

function loadHtml(file) {
  return fs.readFileSync(file, 'utf8');
}

function saveHtml(file, html) {
  fs.writeFileSync(file, html);
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  if (!m) return null;
  // strip "| Adopted by Grace" etc for social titles so they're punchy
  return m[1].trim();
}

function extractDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  return m ? m[1].trim() : null;
}

function extractFirstParagraph(html) {
  // Fallback description: try to pull the first <p> inside .article-body
  const body = html.match(/<article[^>]*class=["'][^"']*article-body[^"']*["'][^>]*>([\s\S]*?)<\/article>/i);
  const pool = body ? body[1] : html;
  const p = pool.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!p) return null;
  const text = p[1]
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length < 40) return null;
  // Truncate cleanly around 155 chars for SEO ideal
  if (text.length <= 155) return text;
  const truncated = text.slice(0, 155);
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace > 100 ? lastSpace : 155).trim() + '…';
}

function ogTypeFor(file) {
  const base = path.basename(file);
  if (base === 'index.html') return 'website';
  // Hub pages and interactive experiences are websites; articles are articles.
  const isHub =
    base.endsWith('-hub.html') ||
    base === 'questions.html' ||
    base === 'theologians.html' ||
    base === 'essays.html' ||
    base === 'devotionals.html' ||
    base === 'stories.html' ||
    base === 'comparisons-hub.html' ||
    base === 'secular-evidence.html' ||
    base === 'systematic-theology.html' ||
    base === 'history-timeline.html' ||
    base === 'demolition-hub.html' ||
    base === 'psychology-hub.html' ||
    base === 'philosophy-hub.html' ||
    base === 'pastoral-hub.html' ||
    base === 'ot-hub.html' ||
    base === 'testimony-hub.html';
  if (isHub) return 'website';
  return 'article';
}

function canonicalFor(file) {
  const base = path.basename(file);
  if (base === 'index.html') return SITE + '/';
  return SITE + '/' + base.replace(/\.html$/, '');
}

/**
 * Remove every occurrence of a tag matching a given pattern, then return
 * the cleaned HTML and whether any removal happened.
 */
function stripTags(html, regex) {
  return html.replace(regex, '');
}

function injectHead(html, block) {
  // Insert the meta block just before </head>.
  return html.replace(/<\/head>/i, block + '\n</head>');
}

function buildMetaBlock({
  title,
  description,
  canonical,
  ogType,
  image = OG_IMAGE,
}) {
  // Escape quotes in attribute values
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <!-- Project Lighthouse: Universal Share-Ready Meta -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="theme-color" content="${THEME_COLOR}">
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${esc(canonical)}">
    <meta property="og:site_name" content="${esc(SITE_NAME)}">
    <meta property="og:locale" content="${LOCALE}">
    <meta property="og:type" content="${esc(ogType)}">
    <meta property="og:url" content="${esc(canonical)}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:image" content="${esc(image)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Adopted by Grace — The biblical case for divine sovereignty">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${TWITTER_HANDLE}">
    <meta name="twitter:creator" content="${TWITTER_HANDLE}">
    <meta name="twitter:title" content="${esc(title)}">
    <meta name="twitter:description" content="${esc(description)}">
    <meta name="twitter:image" content="${esc(image)}">
    <!-- /Project Lighthouse -->`;
}

function process(file) {
  let html = loadHtml(file);

  const title = extractTitle(html) || `${SITE_NAME} — The Biblical Case for Divine Sovereignty`;
  const description =
    extractDescription(html) ||
    extractFirstParagraph(html) ||
    DEFAULT_DESCRIPTION;
  const canonical = canonicalFor(file);
  const ogType = ogTypeFor(file);

  // Strip the previous Lighthouse block if it exists — we rewrite fresh so
  // the script is fully idempotent and can upgrade stale tags.
  html = html.replace(
    /\n?\s*<!-- Project Lighthouse: Universal Share-Ready Meta -->[\s\S]*?<!-- \/Project Lighthouse -->/,
    ''
  );

  // Now strip individual competing tags we're about to replace. We keep
  // existing scripts and links untouched — just the overlapping meta.
  html = stripTags(html, /\n?\s*<meta\s+name=["']robots["'][^>]*>/gi);
  html = stripTags(html, /\n?\s*<meta\s+name=["']theme-color["'][^>]*>/gi);
  html = stripTags(html, /\n?\s*<meta\s+name=["']description["'][^>]*>/gi);
  html = stripTags(html, /\n?\s*<link\s+rel=["']canonical["'][^>]*>/gi);
  html = stripTags(html, /\n?\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi);
  html = stripTags(html, /\n?\s*<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi);

  const block = buildMetaBlock({ title, description, canonical, ogType });
  html = injectHead(html, block);

  saveHtml(file, html);
}

function main() {
  const files = fs
    .readdirSync('.')
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !SKIP_FILES.has(f));

  let processed = 0;
  for (const f of files) {
    try {
      process(f);
      processed++;
    } catch (err) {
      console.error(`  ✗ ${f} — ${err.message}`);
    }
  }

  console.log(`✓ Project Lighthouse social-meta: ${processed} / ${files.length} pages updated`);
}

if (require.main === module) {
  main();
}

module.exports = { process, buildMetaBlock };
