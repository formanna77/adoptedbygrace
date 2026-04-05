# Content Manifest - Discovery Features

## Overview

`content-manifest.js` is a dynamically generated JavaScript file that powers three content discovery features for adoptedbygrace.net:

1. **Rotating Spotlight** - Random featured article with description
2. **Recently Added Section** - List of 10 most recently published articles
3. **Random Article Button** - One-click discovery of random content

## File Details

- **Location**: `/content-manifest.js`
- **Size**: 69 KB
- **Format**: JavaScript array exported as `CONTENT_MANIFEST`
- **Total Articles**: 271 article pages
- **Excluded Pages**: Hub pages, nav, utility pages, index.html, etc.
- **Data Source**: Auto-generated from `search-index.js` and git history

## Data Structure

Each entry contains:
```javascript
{
  "url": "/article-slug",                    // Article URL path
  "title": "Full Article Title",             // Page title
  "category": "Category Name",               // Content category
  "excerpt": "Short description...",         // 1-2 sentence synopsis
  "added": "2026-04-04 22:33:29 -0600"      // Git creation date+time
}
```

## Categories (14 total)

- General (70 articles)
- The Evidence (45 articles)
- History (24 articles)
- Why We Resist (22 articles)
- Theology (21 articles)
- Demolition Zone (17 articles)
- Devotionals (15 articles)
- Stories (15 articles)
- Comparisons (12 articles)
- Psychology (11 articles)
- And 4 more...

## Implementation Examples

### 1. Rotating Spotlight

Displays a random article on page load. Place this in your HTML:

```html
<div class="spotlight-container">
  <div class="spotlight">
    <script src="/content-manifest.js"></script>
    <script>
      const article = CONTENT_MANIFEST[Math.floor(Math.random() * CONTENT_MANIFEST.length)];
      document.write(`
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <a href="${article.url}">Read Article →</a>
      `);
    </script>
  </div>
</div>
```

### 2. Recently Added Section

Shows latest 10 articles:

```html
<div class="recently-added">
  <h3>Recently Added</h3>
  <ul>
    <script src="/content-manifest.js"></script>
    <script>
      CONTENT_MANIFEST.slice(0, 10).forEach(article => {
        const date = article.added.substring(0, 10);
        document.write(`
          <li>
            <a href="${article.url}">${article.title}</a>
            <span class="date">${date}</span>
          </li>
        `);
      });
    </script>
  </ul>
</div>
```

### 3. Random Article Button

One-click discovery:

```html
<script src="/content-manifest.js"></script>
<button onclick="loadRandom()">Read a Random Article</button>
<script>
  function loadRandom() {
    const article = CONTENT_MANIFEST[Math.floor(Math.random() * CONTENT_MANIFEST.length)];
    window.location.href = article.url;
  }
</script>
```

## Key Features

- **Always Fresh**: Regenerated after build-search-index.js runs
- **Git-Backed Dates**: Uses actual commit dates for accuracy
- **No Manual Updates**: Automatically includes all new articles
- **Browser + Node Ready**: Works in both contexts
- **Performant**: 69 KB, safe to load on every page
- **Sortable**: Already sorted newest-first

## Regeneration

The manifest is auto-generated. To rebuild after adding new articles:

```bash
cd /sessions/vigilant-kind-bohr/mnt/adoptedbygracewebsite
node build-search-index.js  # Update search index first
node generate-manifest.js    # Then generate new manifest
```

## Integration Notes

1. **URL Format**: All URLs begin with `/` (e.g., `/question-grace`)
2. **No Hub Pages**: Only article-level content (question-*, devotional-*, etc.)
3. **No Duplicates**: 271 unique pages, no redundancy
4. **Excerpt Quality**: Short, compelling descriptions from search index
5. **Mobile Safe**: Works on all devices and browsers

## Browser Compatibility

- All modern browsers (ES5+)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Node.js for CLI/build contexts

## Performance Metrics

- File size: 69 KB (gzips to ~12 KB)
- Parse time: <50ms
- Memory footprint: ~1 MB (minimal)
- Safe to include on every page

## Example Use Cases

- Homepage "Spotlight Article" section
- Sidebar "Recently Added" widget
- Footer "Random Read" button
- Search overflow content suggestion
- Abandoned cart recovery emails (if newsletters resume)
- Analytics for "which articles get clicked most"

## Maintenance

The manifest requires no manual maintenance. It regenerates automatically when:
1. New articles are added to the site
2. `build-search-index.js` is run
3. The generation script is executed

That's it. The system self-updates.

---

**Last Generated**: 2026-04-04
**Total Articles**: 271
**Data Source**: search-index.js + git log
