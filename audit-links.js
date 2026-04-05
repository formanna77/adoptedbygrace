const fs = require('fs');
const path = require('path');

const repoRoot = '/sessions/keen-gifted-heisenberg/mnt/adoptedbygracewebsite';

// Get all HTML files
function getAllHtmlFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'node_modules' && !item.startsWith('.')) {
      files = files.concat(getAllHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  });
  
  return files;
}

// Get set of valid pages (both with and without .html)
function getValidPages() {
  const pages = new Set();
  const fileMap = new Map(); // Map normalized path to actual file
  const htmlFiles = getAllHtmlFiles(repoRoot);
  
  htmlFiles.forEach(file => {
    const relative = path.relative(repoRoot, file);
    const relativeLower = relative.toLowerCase();
    
    // Add with .html extension
    pages.add('/' + relativeLower);
    fileMap.set('/' + relativeLower, file);
    
    // Add without .html extension (for routing)
    if (relativeLower.endsWith('.html')) {
      const withoutExt = '/' + relativeLower.slice(0, -5);
      pages.add(withoutExt);
      fileMap.set(withoutExt, file);
    }
    
    // Add variations
    pages.add('/' + relativeLower + '/');
    if (relativeLower.endsWith('.html')) {
      const withoutExt = '/' + relativeLower.slice(0, -5) + '/';
      pages.add(withoutExt);
    }
  });
  
  return { pages, fileMap };
}

// Extract all href values from HTML
function extractHrefs(htmlContent) {
  const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
  const hrefs = [];
  let match;
  
  while ((match = hrefRegex.exec(htmlContent)) !== null) {
    hrefs.push(match[1]);
  }
  
  return hrefs;
}

// Check if href looks like it's meant to point to a page (not a resource)
function isPageLink(href) {
  // Skip resources
  if (href.endsWith('.css') || href.endsWith('.js') || href.endsWith('.svg') || 
      href.endsWith('.png') || href.endsWith('.jpg') || href.endsWith('.gif') ||
      href.endsWith('.webp') || href.endsWith('.ico') || href.endsWith('.pdf')) {
    return false;
  }
  
  // Skip data URIs
  if (href.startsWith('data:')) {
    return false;
  }
  
  // Skip template variables
  if (href.includes('${')) {
    return false;
  }
  
  // Skip external URLs
  if (href.startsWith('http://') || href.startsWith('https://') || 
      href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('//')) {
    return false;
  }
  
  return true;
}

// Check if a target file exists
function fileExists(targetHref, validPages) {
  // If it's just "#", flag it
  if (targetHref === '#') {
    return false;
  }
  
  // Extract the path part (before #)
  const pathPart = targetHref.split('#')[0];
  
  // If empty after removing anchor, it's a same-page link
  if (!pathPart || pathPart === '') {
    return true;
  }
  
  // If it starts with /, normalize and check
  if (pathPart.startsWith('/')) {
    const normalized = pathPart.toLowerCase();
    if (validPages.pages.has(normalized)) return true;
    if (validPages.pages.has(normalized + '/')) return true;
    if (normalized.endsWith('/') && validPages.pages.has(normalized.slice(0, -1))) return true;
    return false;
  }
  
  // Otherwise it's a relative path - assume valid (these are harder to validate)
  // Check if file exists in repo root with case-insensitive match
  try {
    const items = fs.readdirSync(repoRoot);
    const normalized = pathPart.toLowerCase();
    const found = items.find(item => item.toLowerCase() === normalized);
    return !!found;
  } catch (e) {
    return false;
  }
}

// Check for deleted sections
function isDeletedSection(href) {
  const pathPart = href.split('#')[0].toLowerCase();
  
  const deletedSections = [
    'resources',
    'community',
    'connect',
    'start-here-groups',
    'apologetics-hub',
  ];
  
  return deletedSections.some(section => 
    pathPart.includes(section)
  );
}

// Main audit
console.log('Building valid pages index...');
const { pages, fileMap } = getValidPages();
console.log(`Found ${pages.size} unique page URLs.\n`);

console.log('Scanning all HTML files for broken links...\n');

const htmlFiles = getAllHtmlFiles(repoRoot);
console.log(`Auditing ${htmlFiles.length} HTML files.\n`);

const brokenLinks = [];
const deletedSectionLinks = [];
const placeholderLinks = [];

htmlFiles.forEach((filePath, index) => {
  const relativePath = path.relative(repoRoot, filePath);
  
  if ((index + 1) % 50 === 0) {
    process.stdout.write(`Processing file ${index + 1}/${htmlFiles.length}...\r`);
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hrefs = extractHrefs(content);
    
    hrefs.forEach(href => {
      // Skip non-page links
      if (!isPageLink(href)) {
        return;
      }
      
      // Check for placeholder links
      if (href === '#') {
        placeholderLinks.push({
          file: relativePath,
          href: href
        });
        return;
      }
      
      // Check for deleted sections
      if (isDeletedSection(href)) {
        deletedSectionLinks.push({
          file: relativePath,
          href: href
        });
        return;
      }
      
      // Check if target exists
      if (!fileExists(href, { pages, fileMap })) {
        brokenLinks.push({
          file: relativePath,
          href: href
        });
      }
    });
  } catch (err) {
    console.error(`\nError reading ${relativePath}: ${err.message}`);
  }
});

console.log(`\n${''.padEnd(80)}`);
console.log('\n' + '='.repeat(80));
console.log('LINK AUDIT RESULTS');
console.log('='.repeat(80) + '\n');

// Report broken links
if (brokenLinks.length > 0) {
  console.log(`BROKEN INTERNAL LINKS: ${brokenLinks.length}\n`);
  brokenLinks.forEach(link => {
    console.log(`  File: ${link.file}`);
    console.log(`  Href: ${link.href}`);
    console.log('');
  });
} else {
  console.log('✓ No broken internal links found.\n');
}

// Report deleted section links
if (deletedSectionLinks.length > 0) {
  console.log(`LINKS TO DELETED SECTIONS: ${deletedSectionLinks.length}\n`);
  deletedSectionLinks.forEach(link => {
    console.log(`  File: ${link.file}`);
    console.log(`  Href: ${link.href} (deleted section)`);
    console.log('');
  });
} else {
  console.log('✓ No links to deleted sections found.\n');
}

// Report placeholder links
if (placeholderLinks.length > 0) {
  console.log(`PLACEHOLDER LINKS (#): ${placeholderLinks.length}\n`);
  placeholderLinks.forEach(link => {
    console.log(`  File: ${link.file}`);
    console.log(`  Href: ${link.href}`);
    console.log('');
  });
} else {
  console.log('✓ No placeholder links found.\n');
}

console.log('='.repeat(80));
console.log(`SUMMARY: ${brokenLinks.length} broken, ${deletedSectionLinks.length} deleted sections, ${placeholderLinks.length} placeholders`);
console.log('='.repeat(80));

// Exit with non-zero if issues found
if (brokenLinks.length > 0 || deletedSectionLinks.length > 0 || placeholderLinks.length > 0) {
  process.exit(1);
}
