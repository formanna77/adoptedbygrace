// fix-meta-descriptions.js
// Repairs truncated/empty meta descriptions across the site.
// Root cause: past generator broke at first apostrophe.
// Strategy:
//   1) Identify meta/og/twitter descriptions that are < 50 chars OR end on a non-terminating word.
//   2) Extract a proper description from article body:
//        - First choice: paragraph after "In Brief:" (strong or h2 style).
//        - Second choice: first full <p> in <article class="article-body">.
//        - Third choice: first meaningful paragraph after <body>.
//   3) Trim to ~157 chars at word boundary, append "…" if truncated.
//   4) Escape HTML entities safely for an attribute value.
//   5) Update <meta name="description">, og:description, twitter:description, and Article JSON-LD.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function encodeAttr(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function trimToBoundary(text, max = 157) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return cut.replace(/[,;:\-–—\s]+$/, '') + '…';
}

// Extract a description from HTML body.
function extractDescription(html, filename) {
  // Special-case the 404 page
  if (/^404\.html$/i.test(filename)) {
    return "Page not found — but you were not lost. God has known your name since before the foundation of the world. Try the homepage or one of our best reads.";
  }

  // 1) Look for "In Brief:" strong block
  const inBriefStrong = html.match(/<strong>\s*In Brief\s*[:：]?\s*<\/strong>\s*([\s\S]{20,1200}?)<\/p>/i);
  if (inBriefStrong) {
    const txt = stripTags(inBriefStrong[1]);
    if (txt.length >= 40) return txt;
  }
  // 2) Look for <h2>In Brief</h2> followed by a paragraph
  const inBriefH = html.match(/<h2[^>]*>\s*In Brief\s*<\/h2>\s*<p[^>]*>([\s\S]{20,1200}?)<\/p>/i);
  if (inBriefH) {
    const txt = stripTags(inBriefH[1]);
    if (txt.length >= 40) return txt;
  }
  // 3) Hub page: use .hub-subtitle or .page-hero subtitle
  const hubSub = html.match(/<p\s+class="[^"]*(?:hub-subtitle|page-subtitle)[^"]*"[^>]*>([\s\S]{20,1500}?)<\/p>/i);
  if (hubSub) {
    const txt = stripTags(hubSub[1]);
    if (txt.length >= 40) return txt;
  }
  // 4) First meaningful <p> in article-body
  const article = html.match(/<article[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
  const scope = article ? article[1] : html;
  // Strip out card-description, card-number, card-title, share-bar, related-articles blocks
  let cleaned = scope
    .replace(/<p\s+class="[^"]*card-[^"]*"[^>]*>[\s\S]*?<\/p>/gi, ' ')
    .replace(/<div\s+class="[^"]*card-[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<div\s+class="[^"]*(?:share-bar|related|continue-journey|byline|read-time)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, ' ')
    .replace(/<section\s+class="[^"]*(?:hub|related|share)[^"]*"[^>]*>[\s\S]*?<\/section>/gi, ' ');
  const paragraphs = [...cleaned.matchAll(/<p(?:\s[^>]*)?>([\s\S]{30,1500}?)<\/p>/gi)];
  for (const m of paragraphs) {
    const txt = stripTags(m[1]);
    // Skip: starts with "NN" card-number pattern, very short, all-quote
    if (/^\d{1,3}\s/.test(txt)) continue;
    if (/^["'"]/.test(txt) && txt.length < 120) continue; // pull quote
    if (txt.length >= 80) return txt;
  }
  // 5) Fallback — any paragraph over 40 chars
  for (const m of paragraphs) {
    const txt = stripTags(m[1]);
    if (txt.length >= 40 && !/^\d{1,3}\s/.test(txt)) return txt;
  }
  return null;
}

function currentDescription(html) {
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? m[1] : '';
}

function isTruncated(desc) {
  if (!desc) return true;
  // Decode entities for analysis
  const clean = desc
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
  if (clean.length < 50) return true;
  // Starts with card-number pattern
  if (/^\d{1,3}\s+[A-Z]/.test(clean)) return true;
  // Nondescript short intro
  if (clean.length < 90 && /^(That|This|It|He|She|They)\s/.test(clean)) return true;
  // Ends without any terminal punctuation — likely truncated mid-sentence
  if (!/[.?!…"'"»)]$/.test(clean)) return true;
  return false;
}

function updateMetaDescriptions(html, newDesc) {
  const enc = encodeAttr(newDesc);
  let changed = false;
  const replacers = [
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${enc}">`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${enc}">`],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${enc}">`],
    [/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:description" content="${enc}">`],
  ];
  for (const [re, repl] of replacers) {
    if (re.test(html)) {
      html = html.replace(re, repl);
      changed = true;
    }
  }
  // Insert any missing meta tags before </head>
  const headEnd = html.indexOf('</head>');
  if (headEnd > -1) {
    const head = html.slice(0, headEnd);
    const inserts = [];
    if (!/<meta\s+name="description"/i.test(head)) {
      inserts.push(`    <meta name="description" content="${enc}">`);
    }
    if (!/<meta\s+property="og:description"/i.test(head)) {
      inserts.push(`    <meta property="og:description" content="${enc}">`);
    }
    if (!/<meta\s+(name|property)="twitter:description"/i.test(head)) {
      inserts.push(`    <meta name="twitter:description" content="${enc}">`);
    }
    if (inserts.length) {
      html = head + '\n' + inserts.join('\n') + '\n' + html.slice(headEnd);
      changed = true;
    }
  }
  // Update Article JSON-LD description
  html = html.replace(/("@type"\s*:\s*"(?:Article|NewsArticle|BlogPosting)"[\s\S]*?"description"\s*:\s*")[^"]*(")/g,
    (_m, pre, post) => {
      changed = true;
      return pre + newDesc.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + post;
    });
  return { html, changed };
}

function main() {
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !f.startsWith('_'));
  let fixed = 0, skipped = 0, noExtract = 0;
  const changes = [];
  for (const f of files) {
    const p = path.join(ROOT, f);
    let html = fs.readFileSync(p, 'utf8');
    const current = currentDescription(html);
    if (!isTruncated(current)) { skipped++; continue; }
    const extracted = extractDescription(html, f);
    if (!extracted) { noExtract++; continue; }
    const newDesc = trimToBoundary(extracted, 157);
    const { html: updated, changed } = updateMetaDescriptions(html, newDesc);
    if (changed && updated !== html) {
      fs.writeFileSync(p, updated);
      fixed++;
      changes.push({ file: f, old: current, new: newDesc });
    } else {
      skipped++;
    }
  }
  console.log(`\n✅ Fixed meta descriptions on ${fixed} files`);
  console.log(`   Skipped (already fine): ${skipped}`);
  console.log(`   Could not extract: ${noExtract}`);
  console.log(`\nFirst 10 changes:`);
  for (const c of changes.slice(0, 10)) {
    console.log(`\n📄 ${c.file}`);
    console.log(`  OLD: ${c.old}`);
    console.log(`  NEW: ${c.new}`);
  }
  fs.writeFileSync(path.join(ROOT, 'docs-meta-fix-log.json'), JSON.stringify(changes, null, 2));
  console.log(`\nFull log: docs-meta-fix-log.json`);
}

main();
