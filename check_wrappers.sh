#!/bin/bash

# Standard wrapper classes we consider valid
WRAPPERS="article-body|content-wrap|content-wrapper|content-section|content|section|main-content|article-content|content-main"

# Hub pages to skip
SKIP_PATTERNS="index.html|404.html|search.html|topics.html|*-hub.html|questions.html|devotionals.html|stories.html|essays.html|best-reads.html|start-here.html|analogies-illustrations.html|secular-evidence.html|systematic-theology.html|theologians.html|history-timeline.html|creeds-confessions.html|ot-hub.html|pastoral-hub.html|comparisons-hub.html|invisible-wall-hub.html|open-wound-hub.html|shattered-lens-hub.html|broken-mirror-hub.html|anxious-mind-hub.html|about.html|_nav-template.html|belief-assessment.html|question-faith-origin-test.html|verse-explorer.html"

declare -A problem_pages

for f in *.html; do
  # Skip hub pages and special pages
  if [[ "$f" =~ ^(index|404|search|topics|_nav|belief-assessment|question-faith|verse-explorer)\.html$ ]] || 
     [[ "$f" == *"-hub.html" ]] ||
     [[ "$f" == "about.html" ]] ||
     [[ "$f" == "best-reads.html" ]] ||
     [[ "$f" == "start-here.html" ]]; then
    continue
  fi
  
  # Check for content between </nav> and first standard wrapper
  if ! grep -q 'class="\(article-body\|content-wrap\|content-wrapper\|content-section\|main-content\|article-content\)' "$f"; then
    # Check if it has ANY content-bearing sections outside wrappers
    outside_sections=$(sed -n '/<\/nav>/,/<\(div\|section\|article\) class="/p' "$f" | \
      grep -E '<(div|section|table|ul|ol) class="(overview-table|section-nav|section-block|definition|compare-|point-section|container-comparison|ov-grid|section-label|def-row|intro-section|content|knowledge-diagram)' | wc -l)
    
    if [ "$outside_sections" -gt 0 ]; then
      problem_pages["$f"]=$outside_sections
    fi
  fi
done

# Report findings
if [ ${#problem_pages[@]} -eq 0 ]; then
  echo "No pages found with problematic content outside standard wrappers."
else
  echo "PAGES WITH CONTENT OUTSIDE STANDARD WRAPPERS:"
  echo ""
  for page in "${!problem_pages[@]}"; do
    printf "%-50s %d sections\n" "$page" "${problem_pages[$page]}"
  done | sort -k2 -rn
fi
