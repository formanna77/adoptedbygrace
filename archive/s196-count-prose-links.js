#!/usr/bin/env node
/* S196 — under-linked queue regenerator.
 * For every root .html containing `<article class="article-body"`, extract the
 * article body (open tag -> matching </article>), strip card/deck/nav/footer
 * anchors, and count DISTINCT internal prose hrefs.
 * Output: COUNT\tslug  (ascending)
 */
const fs = require('fs');
const path = require('path');

// S197: was hardcoded to S196's sandbox mount path, which does not exist in any
// later session — the script threw EACCES on first use and the queue it writes
// went stale without anyone noticing. Resolve from the file's own location, the
// way s196-render-check.js already did.
const ROOT = path.resolve(__dirname, '..');
const OPEN = '<article class="article-body"';

const MASK = ['hub-card','card-','related','breadcrumb','nav','footer','share','cta-','pill','tag-','eyebrow'];
const NESTED_MASK = ['card-title','card-description','card-read'];
const ASSET = /\.(pdf|css|js|png|jpg|jpeg|gif|svg|webp|ico|xml|txt|zip|mp3|mp4|json|woff2?|ttf|eot)(\?|#|$)/i;

// ---- extract article body via matching </article> (nesting-aware) ----
function extractBody(html) {
  const start = html.indexOf(OPEN);
  if (start === -1) return null;
  const bodyStart = html.indexOf('>', start) + 1;
  let depth = 1;
  let i = bodyStart;
  const openRe = /<article\b/gi;
  const closeRe = /<\/article\s*>/gi;
  while (depth > 0) {
    openRe.lastIndex = i; closeRe.lastIndex = i;
    const o = openRe.exec(html);
    const c = closeRe.exec(html);
    if (!c) return html.slice(bodyStart);            // unbalanced: take rest
    if (o && o.index < c.index) { depth++; i = o.index + 8; }
    else { depth--; i = c.index + c[0].length; if (depth === 0) return html.slice(bodyStart, c.index); }
  }
  return html.slice(bodyStart);
}

// ---- build a tag stream so we can know each anchor's ancestor classes ----
function classesOf(tag) {
  const m = /\sclass\s*=\s*("([^"]*)"|'([^']*)')/i.exec(tag);
  return m ? (m[2] !== undefined ? m[2] : m[3]) : '';
}
function masked(cls) {
  if (!cls) return false;
  const lc = cls.toLowerCase();
  return MASK.some(k => lc.includes(k));
}

const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

function countLinks(body) {
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>/g;
  const stack = [];          // {name, masked}
  let maskDepth = 0;
  let m;
  const urls = new Set();

  while ((m = tagRe.exec(body)) !== null) {
    const closing = m[1] === '/';
    const name = m[2].toLowerCase();
    const full = m[0];
    const selfClosing = /\/>$/.test(full) || VOID.has(name);

    if (!closing) {
      const cls = classesOf(full);
      const isMasked = masked(cls);
      if (name === 'a') {
        // anchor: check own classes + ancestor mask + nested-card content
        const hrefM = /\shref\s*=\s*("([^"]*)"|'([^']*)')/i.exec(full);
        const href = hrefM ? (hrefM[2] !== undefined ? hrefM[2] : hrefM[3]) : null;
        // find this anchor's inner HTML for the nested-card check
        const aStart = m.index + full.length;
        const aEnd = body.toLowerCase().indexOf('</a>', aStart);
        const inner = aEnd === -1 ? '' : body.slice(aStart, aEnd);
        const nestedCard = NESTED_MASK.some(k => new RegExp('class\\s*=\\s*["\'][^"\']*' + k, 'i').test(inner));

        const excluded = isMasked || maskDepth > 0 || nestedCard;
        if (!excluded && href) {
          const h = href.trim();
          if (h.startsWith('/') && !h.startsWith('//') && !h.startsWith('#') && !ASSET.test(h)) {
            urls.add(h.split('#')[0].split('?')[0].replace(/\/+$/,'') || '/');
          }
        }
      }
      if (!selfClosing) {
        stack.push({ name, masked: isMasked });
        if (isMasked) maskDepth++;
      }
    } else {
      // pop to matching open
      for (let k = stack.length - 1; k >= 0; k--) {
        if (stack[k].name === name) {
          for (let j = stack.length - 1; j >= k; j--) {
            if (stack[j].masked) maskDepth--;
          }
          stack.length = k;
          break;
        }
      }
    }
  }
  return urls.size;
}

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const rows = [];
for (const f of files) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  if (!html.includes(OPEN)) continue;
  const body = extractBody(html);
  if (body === null) continue;
  rows.push([countLinks(body), f.replace(/\.html$/, '')]);
}
rows.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
console.log(rows.map(r => r[0] + '\t' + r[1]).join('\n'));
console.error('TOTAL ARTICLES: ' + rows.length);
