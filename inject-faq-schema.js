#!/usr/bin/env node
/**
 * inject-faq-schema.js
 *
 * PROJECT LIGHTHOUSE — Pillar 6: "PEOPLE ALSO ASK" DOMINATION
 *
 * Adds FAQPage JSON-LD to every question-*, objection-*, and
 * compare-* and counter-* page that doesn't already have one. The schema
 * is extracted directly from the page content — real Q&A pairs, not
 * hallucinated stubs.
 *
 * EXTRACTION STRATEGY (in order of preference):
 *   1. Any <h2>/<h3> whose text contains '?' OR begins with a
 *      question word (What, Why, How, When, Where, Who, Can, Does,
 *      Do, Is, Are, Should) — pair with the following paragraph(s).
 *   2. Fallback: pair the page's <h1> with the first substantial
 *      paragraph inside .article-body.
 *
 * WHY THIS MATTERS:
 * FAQ-structured content is what Google uses to build the "People also
 * ask" accordion and the voice-assistant direct-answer responses. A
 * page with three good FAQ entries can capture four search results
 * instead of one.
 *
 * Idempotent. Skips any page that already has FAQPage schema.
 */

const fs = require('fs');

const SKIP_FILES = new Set(['_nav-template.html']);

// Only touch pages in these families — these are where FAQ actually maps to content
const FAQ_PAGE_PATTERNS = [
  /^question-.*\.html$/,
  /^objection-.*\.html$/,
  /^compare-.*\.html$/,
  /^counter-.*\.html$/,
];

const QUESTION_WORDS = /^(what|why|how|when|where|who|can|does|do|is|are|should|did|would|will|was|were|have|has)\b/i;

function isFaqCandidate(file) {
  return FAQ_PAGE_PATTERNS.some((re) => re.test(file));
}

function hasFaq(html) {
  return /"@type"\s*:\s*"FAQPage"/.test(html);
}

function stripHtmlToText(htmlChunk) {
  return htmlChunk
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&hellip;/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractArticleBody(html) {
  const m = html.match(/<article[^>]*class=["'][^"']*article-body[^"']*["'][^>]*>([\s\S]*?)<\/article>/i);
  return m ? m[1] : html;
}

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripHtmlToText(h1[1]);
  const t = html.match(/<title>([^<]*)<\/title>/i);
  if (t) return t[1].replace(/\s*[|—-]\s*Adopted by Grace\s*$/i, '').trim();
  return '';
}

function looksLikeQuestion(text) {
  if (!text) return false;
  if (text.length > 300 || text.length < 6) return false;
  if (text.includes('?')) return true;
  if (QUESTION_WORDS.test(text.trim())) return true;
  return false;
}

/**
 * Pull (question, answer) pairs by walking H2/H3 headings inside
 * the article body. Answer is the concatenation of following <p>
 * elements until the next heading.
 */
function extractQAPairs(html) {
  const body = extractArticleBody(html);
  const pairs = [];
  // Match ALL headings (h2,h3) and paragraphs/blockquotes in order
  const nodeRegex = /<(h2|h3|p|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  let currentQ = null;
  let currentABuf = [];

  const flush = () => {
    if (currentQ) {
      const answer = currentABuf.join(' ').trim();
      if (answer.length >= 40) {
        pairs.push({ q: currentQ, a: answer });
      }
      currentQ = null;
      currentABuf = [];
    }
  };

  while ((m = nodeRegex.exec(body)) !== null) {
    const tag = m[1].toLowerCase();
    const text = stripHtmlToText(m[2]);
    if (tag === 'h2' || tag === 'h3') {
      flush();
      if (looksLikeQuestion(text)) {
        currentQ = text.replace(/\s+/g, ' ').trim();
        // Ensure question mark for display
        if (!currentQ.endsWith('?')) currentQ = currentQ + '?';
      }
    } else if (currentQ) {
      // Accumulate answer text — cap at ~3 paragraphs worth
      if (currentABuf.length < 3) {
        currentABuf.push(text);
      }
    }
  }
  flush();
  return pairs;
}

/**
 * Fallback: use the page <h1> as the question and the first
 * substantial paragraph as the answer.
 */
function extractTitleFallback(html) {
  const title = extractTitle(html);
  if (!title) return [];
  const body = extractArticleBody(html);
  const pMatch = body.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  for (const p of pMatch) {
    const text = stripHtmlToText(p);
    if (text.length >= 80) {
      const q = title.endsWith('?') ? title : title + '?';
      return [{ q, a: text }];
    }
  }
  return [];
}

function faqBlock(pairs) {
  const items = pairs.slice(0, 8).map((pair) => ({
    '@type': 'Question',
    name: pair.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: pair.a.length > 800 ? pair.a.slice(0, 797).trim() + '…' : pair.a,
    },
  }));
  return `<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items,
}, null, 2)}
</script>`;
}

function inject(file) {
  let html = fs.readFileSync(file, 'utf8');
  if (hasFaq(html)) return { updated: false, reason: 'already has FAQPage' };
  let pairs = extractQAPairs(html);
  if (pairs.length === 0) pairs = extractTitleFallback(html);
  if (pairs.length === 0) return { updated: false, reason: 'no extractable Q&A' };

  const block = '\n<!-- Project Lighthouse: FAQ Schema -->\n' + faqBlock(pairs) + '\n<!-- /Project Lighthouse FAQ -->';
  html = html.replace(/<\/head>/i, block + '\n</head>');
  fs.writeFileSync(file, html);
  return { updated: true, count: pairs.length };
}

function main() {
  const files = fs
    .readdirSync('.')
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !SKIP_FILES.has(f))
    .filter((f) => isFaqCandidate(f));

  let updated = 0;
  let skipped = 0;
  let noContent = 0;
  let totalPairs = 0;
  for (const f of files) {
    try {
      const res = inject(f);
      if (res.updated) {
        updated++;
        totalPairs += res.count;
      } else if (res.reason === 'no extractable Q&A') {
        noContent++;
      } else {
        skipped++;
      }
    } catch (err) {
      console.error(`  ✗ ${f} — ${err.message}`);
    }
  }
  console.log(`✓ FAQ Schema: ${updated} pages updated (${totalPairs} total Q&A pairs), ${skipped} already had FAQ, ${noContent} skipped (no Q&A extractable)`);
}

if (require.main === module) {
  main();
}

module.exports = { inject };
