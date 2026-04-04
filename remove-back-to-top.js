const fs = require('fs');
const path = require('path');

const repoDir = __dirname;
const htmlFiles = fs.readdirSync(repoDir).filter(f => f.endsWith('.html'));

let filesModified = 0;
let buttonsRemoved = 0;
let scriptsRemoved = 0;
let stylesRemoved = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(repoDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // 1. Remove <button class="back-to-top"...>...</button> elements
  const buttonRegex = /<button\s+class="back-to-top"[^>]*>[\s\S]*?<\/button>/g;
  if (buttonRegex.test(content)) {
    buttonsRemoved += (content.match(buttonRegex) || []).length;
    content = content.replace(buttonRegex, '');
  }

  // 2. Remove JavaScript blocks containing back-to-top or backToTop references
  // This includes inline scripts with scroll-to-top toggle functionality
  const scriptRegex = /<script[^>]*>[\s\S]*?(?:back-to-top|backToTop)[\s\S]*?<\/script>/gi;
  if (scriptRegex.test(content)) {
    scriptsRemoved += (content.match(scriptRegex) || []).length;
    content = content.replace(scriptRegex, '');
  }

  // 3. Remove inline CSS .back-to-top { ... } style definitions
  // Match .back-to-top and consume the entire rule block
  const styleRegex = /\.back-to-top\s*\{[^}]*\}/g;
  if (styleRegex.test(content)) {
    stylesRemoved += (content.match(styleRegex) || []).length;
    content = content.replace(styleRegex, '');
  }

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
  }
});

console.log(`✓ Processed ${htmlFiles.length} HTML files`);
console.log(`✓ Files modified: ${filesModified}`);
console.log(`✓ Button elements removed: ${buttonsRemoved}`);
console.log(`✓ Script blocks removed: ${scriptsRemoved}`);
console.log(`✓ Style definitions removed: ${stylesRemoved}`);
