// inject-share-bar.js
// Adds <script src="/share-bar.js" defer></script> to every HTML page
// immediately before </body>, if not already present.
// Silent and idempotent — safe to run repeatedly.

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const SCRIPT_TAG = '    <script src="/share-bar.js" defer></script>';
const SCRIPT_MARKER = 'share-bar.js';

function main() {
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !f.startsWith('_'));
  let added = 0, skipped = 0, noBody = 0;
  for (const f of files) {
    const p = path.join(ROOT, f);
    let html = fs.readFileSync(p, 'utf8');
    if (html.includes(SCRIPT_MARKER)) { skipped++; continue; }
    const bodyClose = html.lastIndexOf('</body>');
    if (bodyClose < 0) { noBody++; continue; }
    html = html.slice(0, bodyClose) + SCRIPT_TAG + '\n' + html.slice(bodyClose);
    fs.writeFileSync(p, html);
    added++;
  }
  console.log(`✅ Added share-bar.js tag to ${added} pages`);
  console.log(`   Already had it: ${skipped}`);
  console.log(`   No </body> found: ${noBody}`);
}

main();
