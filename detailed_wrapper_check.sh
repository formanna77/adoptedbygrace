#!/bin/bash

echo "DETAILED STRUCTURE CHECK FOR ARTICLE PAGES"
echo "==========================================="
echo ""

for f in *.html; do
  # Skip hub pages and special pages
  if [[ "$f" =~ ^(index|404|search|topics|_nav|belief-assessment|question-faith|verse-explorer)\.html$ ]] || 
     [[ "$f" == *"-hub.html" ]] ||
     [[ "$f" == "about.html" ]] ||
     [[ "$f" == "best-reads.html" ]] ||
     [[ "$f" == "start-here.html" ]]; then
    continue
  fi
  
  # Extract structure between </nav> and </body>
  # Look for top-level divs/sections with class attributes
  wrapper_check=$(sed -n '/<\/nav>/,/<\/article>/p' "$f" | \
    grep -o '<[^>]*class="[^"]*"' | head -5)
  
  # Count custom non-standard wrapper classes
  custom=$(sed -n '/<\/nav>/,/<\/article>/p' "$f" | \
    grep -E '<(div|section|article|aside|main) class="' | \
    grep -v 'class="article-body\|class="content\|class="wrapper\|class="container\|class="mega-menu\|class="search-overlay' | \
    wc -l)
  
  if [ "$custom" -gt 3 ]; then
    echo "$f: $custom custom sections outside standard wrapper"
    sed -n '/<\/nav>/,/<div class="(article-body|content|wrapper|container|mega-menu|search-overlay)/p' "$f" | \
      grep -oE '<(div|section|article) class="[^"]*"' | sort | uniq | head -5
    echo ""
  fi
done
