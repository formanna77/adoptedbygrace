#!/bin/bash

echo "PAGES WITH CONTENT SECTIONS OUTSIDE MAX-WIDTH WRAPPERS"
echo "======================================================"
echo ""

for f in *.html; do
  # Skip hub pages
  if [[ "$f" =~ ^(index|404|search|topics|_nav|belief-assessment|question-faith|verse-explorer)\.html$ ]] || 
     [[ "$f" == *"-hub.html" ]] ||
     [[ "$f" == "about.html" ]] ||
     [[ "$f" == "best-reads.html" ]] ||
     [[ "$f" == "start-here.html" ]]; then
    continue
  fi
  
  # Check for <section class="overview-table" or similar BEFORE article-body wrapper
  # These are content sections that sit outside max-width containers
  bad_sections=$(sed -n '/<\/nav>/,/<\(article\|div\) class="article-body/p' "$f" | \
    grep -E '<(section|div) class="(overview-table|section-nav|content|section-block|definition|comparison-|point-section|container-comparison|ov-grid)"' | wc -l)
  
  if [ "$bad_sections" -gt 0 ]; then
    echo "❌ $f — $bad_sections full-width sections before article-body wrapper"
    sed -n '/<\/nav>/,/<\(article\|div\) class="article-body/p' "$f" | \
      grep -oE '<(section|div) class="[^"]*"' | grep -v mega-menu | grep -v search-overlay | sort | uniq
    echo ""
  fi
done
