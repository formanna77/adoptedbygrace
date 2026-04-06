#!/usr/bin/env node
/**
 * EVANGELIST — Add author field to Article schema blocks that are missing it.
 * Also adds datePublished if missing.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

let fixed = 0;
const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '_nav-template.html');

for (const filename of files) {
  const filepath = path.join(ROOT, filename);
  let html = fs.readFileSync(filepath, 'utf8');

  // Find Article schema blocks missing author
  const articleRegex = /<script type="application\/ld\+json">\s*(\{[\s\S]*?"@type"\s*:\s*"Article"[\s\S]*?\})\s*<\/script>/g;
  let match;
  let modified = false;

  while ((match = articleRegex.exec(html)) !== null) {
    const block = match[1];

    if (!block.includes('"author"')) {
      // Add author after publisher or after mainEntityOfPage
      let newBlock = block;

      // Add author
      const authorStr = `"author": {"@type": "Person", "name": "Aaron Forman", "url": "https://adoptedbygrace.net/about.html"},`;

      if (newBlock.includes('"publisher"')) {
        // Add author before publisher
        newBlock = newBlock.replace('"publisher"', `${authorStr}\n        "publisher"`);
      } else if (newBlock.includes('"mainEntityOfPage"')) {
        newBlock = newBlock.replace('"mainEntityOfPage"', `${authorStr}\n        "mainEntityOfPage"`);
      } else {
        // Add before the closing brace
        const lastBrace = newBlock.lastIndexOf('}');
        newBlock = newBlock.substring(0, lastBrace) + `,\n        ${authorStr.replace(/,$/, '')}\n    ` + newBlock.substring(lastBrace);
      }

      html = html.replace(block, newBlock);
      modified = true;
    }

    // Also add datePublished if missing
    if (!block.includes('"datePublished"') && !html.includes('"datePublished"')) {
      // We'll add a generic date for existing pages
      const dateStr = `"datePublished": "2026-04-01",`;
      let newHtml = html;
      if (html.includes('"mainEntityOfPage"')) {
        newHtml = html.replace(/"mainEntityOfPage"/, `${dateStr}\n        "mainEntityOfPage"`);
        if (newHtml !== html) {
          html = newHtml;
          modified = true;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filepath, html, 'utf8');
    fixed++;
  }
}

console.log(`Fixed Article schema author/date on ${fixed} pages.`);
