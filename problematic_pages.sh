#!/bin/bash

echo "PAGES WITH FULL-WIDTH CONTENT SECTIONS (OUTSIDE MAX-WIDTH)"
echo "=========================================================="
echo ""

# List of problematic class patterns that should be inside a max-width wrapper
PROBLEM_CLASSES="overview-table|section-nav|content\"|section-block|point-section|container-comparison|comparison-box|definition|answer-body"

count=0
while IFS= read -r f; do
  # Skip non-article pages
  if [[ "$f" =~ ^(index|404|search|topics|_nav|belief-assessment|question-faith|verse-explorer|all-content)\.html$ ]] || 
     [[ "$f" == *"-hub.html" ]] ||
     [[ "$f" == "about.html" ]] ||
     [[ "$f" == "best-reads.html" ]] ||
     [[ "$f" == "start-here.html" ]]; then
    continue
  fi
  
  # Check for problematic sections BEFORE article-body
  bad=$(sed -n '/<\/nav>/,/<\(article\|div\) class="article-body/p' "$f" 2>/dev/null | \
    grep -E "<(section|div) class=\"($PROBLEM_CLASSES)" | wc -l)
  
  if [ "$bad" -gt 0 ]; then
    echo "$f: $bad problematic sections"
    ((count++))
  fi
done < <(find . -maxdepth 1 -name "*.html" | sort)

echo ""
echo "Total pages with issues: $count"
