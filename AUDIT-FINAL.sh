#!/bin/bash

# FINAL VERIFICATION AUDIT - 20-point checklist
# CONTENT PAGES ONLY (root directory + legitimate subdirs)

BASE_DIR="/sessions/keen-gifted-heisenberg/mnt/adoptedbygracewebsite"
cd "$BASE_DIR"

# Initialize counters
declare -A ISSUES
ISSUES["missing_global_css"]=0
ISSUES["missing_nav_js"]=0
ISSUES["missing_viewport"]=0
ISSUES["malformed_html"]=0
ISSUES["missing_title"]=0
ISSUES["duplicate_title"]=0
ISSUES["inline_style"]=0
ISSUES["duplicate_includes"]=0
ISSUES["missing_nav_tag"]=0
ISSUES["missing_grace_warning"]=0
ISSUES["missing_mega_menu"]=0
ISSUES["missing_search_overlay"]=0
ISSUES["broken_internal_links"]=0
ISSUES["placeholder_links"]=0
ISSUES["deleted_page_links"]=0
ISSUES["apologetics_label"]=0
ISSUES["doctrine_in_footer"]=0
ISSUES["newsletter_elements"]=0
ISSUES["back_to_top"]=0
ISSUES["deleted_page_nav_links"]=0

# List of deleted pages to check for
DELETED_PAGES="donate.html start-here-groups.html community.html community-hub.html connect.html resources.html apologetics-hub.html"

# Array to store detailed findings
declare -a FINDINGS

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        FINAL VERIFICATION AUDIT - CONTENT PAGES ONLY           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Find ONLY root-level HTML files (actual content), exclude node_modules, dist, etc.
HTML_FILES=$(find . -maxdepth 1 -name "*.html" -type f ! -name "_nav-template.html" | sort)
TOTAL_FILES=$(echo "$HTML_FILES" | wc -l)

echo "[*] Scanning $TOTAL_FILES root-level HTML files (content pages)..."
echo ""

FILE_COUNT=0
for FILE in $HTML_FILES; do
  FILE_COUNT=$((FILE_COUNT + 1))
  FILENAME=$(basename "$FILE")

  # Read file content
  CONTENT=$(cat "$FILE" 2>/dev/null)

  # 1. Check for global.css link
  if ! echo "$CONTENT" | grep -q 'link rel="stylesheet" href="/global.css"'; then
    ISSUES["missing_global_css"]=$((ISSUES["missing_global_css"] + 1))
    FINDINGS+=("ISSUE #1: $FILENAME - missing <link rel=\"stylesheet\" href=\"/global.css\">")
  fi

  # 2. Check for nav.js script
  if ! echo "$CONTENT" | grep -q 'script src="/nav.js"'; then
    ISSUES["missing_nav_js"]=$((ISSUES["missing_nav_js"] + 1))
    FINDINGS+=("ISSUE #2: $FILENAME - missing <script src=\"/nav.js\"></script>")
  fi

  # 3. Check for viewport meta tag
  if ! echo "$CONTENT" | grep -q 'meta name="viewport"'; then
    ISSUES["missing_viewport"]=$((ISSUES["missing_viewport"] + 1))
    FINDINGS+=("ISSUE #3: $FILENAME - missing <meta name=\"viewport\">")
  fi

  # 4. Check for malformed HTML (missing closing head or body tags)
  if ! echo "$CONTENT" | grep -q '</head>'; then
    ISSUES["malformed_html"]=$((ISSUES["malformed_html"] + 1))
    FINDINGS+=("ISSUE #4: $FILENAME - missing closing </head> tag")
  fi
  if ! echo "$CONTENT" | grep -q '<body' || ! echo "$CONTENT" | grep -q '</body>'; then
    ISSUES["malformed_html"]=$((ISSUES["malformed_html"] + 1))
    FINDINGS+=("ISSUE #4: $FILENAME - missing <body> or </body> tags")
  fi

  # 5. Check for title tag
  if ! echo "$CONTENT" | grep -q '<title>'; then
    ISSUES["missing_title"]=$((ISSUES["missing_title"] + 1))
    FINDINGS+=("ISSUE #5: $FILENAME - missing <title> tag")
  fi

  # 6. Check for duplicate title tags
  TITLE_COUNT=$(echo "$CONTENT" | grep -o '<title>' | wc -l)
  if [ "$TITLE_COUNT" -gt 1 ]; then
    ISSUES["duplicate_title"]=$((ISSUES["duplicate_title"] + 1))
    FINDINGS+=("ISSUE #6: $FILENAME - has $TITLE_COUNT <title> tags (should be 1)")
  fi

  # 7. Check for inline <style> blocks (except index.html)
  if [ "$FILENAME" != "index.html" ]; then
    if echo "$CONTENT" | grep -q '<style'; then
      ISSUES["inline_style"]=$((ISSUES["inline_style"] + 1))
      FINDINGS+=("ISSUE #7: $FILENAME - has <style> block (not allowed except index.html)")
    fi
  fi

  # 8. Check for duplicate global.css or nav.js includes
  CSS_COUNT=$(echo "$CONTENT" | grep -o 'href="/global.css"' | wc -l)
  JS_COUNT=$(echo "$CONTENT" | grep -o 'src="/nav.js"' | wc -l)
  if [ "$CSS_COUNT" -gt 1 ]; then
    ISSUES["duplicate_includes"]=$((ISSUES["duplicate_includes"] + 1))
    FINDINGS+=("ISSUE #8: $FILENAME - includes global.css $CSS_COUNT times (should be 1)")
  fi
  if [ "$JS_COUNT" -gt 1 ]; then
    ISSUES["duplicate_includes"]=$((ISSUES["duplicate_includes"] + 1))
    FINDINGS+=("ISSUE #8: $FILENAME - includes nav.js $JS_COUNT times (should be 1)")
  fi

  # 9. Check for nav tag
  if ! echo "$CONTENT" | grep -q '<nav'; then
    ISSUES["missing_nav_tag"]=$((ISSUES["missing_nav_tag"] + 1))
    FINDINGS+=("ISSUE #9: $FILENAME - missing <nav tag")
  fi

  # 10. Check for footer-grace-warning
  if ! echo "$CONTENT" | grep -q 'footer-grace-warning'; then
    ISSUES["missing_grace_warning"]=$((ISSUES["missing_grace_warning"] + 1))
    FINDINGS+=("ISSUE #10: $FILENAME - missing footer-grace-warning div")
  fi

  # 11. Check for mega-menu div
  if ! echo "$CONTENT" | grep -q 'class="mega-menu"'; then
    ISSUES["missing_mega_menu"]=$((ISSUES["missing_mega_menu"] + 1))
    FINDINGS+=("ISSUE #11: $FILENAME - missing mega-menu div")
  fi

  # 12. Check for search-overlay div
  if ! echo "$CONTENT" | grep -q 'search-overlay'; then
    ISSUES["missing_search_overlay"]=$((ISSUES["missing_search_overlay"] + 1))
    FINDINGS+=("ISSUE #12: $FILENAME - missing search-overlay div")
  fi

  # 13. Check for broken internal links (links to .html files that don't exist)
  HREFS=$(echo "$CONTENT" | grep -oP 'href="[^"]*\.html"' | sed 's/href="//g' | sed 's/"//g' | sort -u)
  while IFS= read -r HREF; do
    [ -z "$HREF" ] && continue
    # Skip anchor links and external links
    if [[ ! "$HREF" =~ ^# ]] && [[ ! "$HREF" =~ ^http ]]; then
      TARGET_FILE="${BASE_DIR}${HREF}"
      if [ ! -f "$TARGET_FILE" ]; then
        ISSUES["broken_internal_links"]=$((ISSUES["broken_internal_links"] + 1))
        FINDINGS+=("ISSUE #13: $FILENAME - broken link to: $HREF")
      fi
    fi
  done <<< "$HREFS"

  # 14. Check for placeholder href="#" links (excluding onclick handlers and anchor IDs)
  if echo "$CONTENT" | grep -q 'href="#"'; then
    ISSUES["placeholder_links"]=$((ISSUES["placeholder_links"] + 1))
    FINDINGS+=("ISSUE #14: $FILENAME - has placeholder href=\"#\" link")
  fi

  # 15. Check for links to deleted pages
  for DELETED in $DELETED_PAGES; do
    if echo "$CONTENT" | grep -q "href=\".*$DELETED"; then
      ISSUES["deleted_page_links"]=$((ISSUES["deleted_page_links"] + 1))
      FINDINGS+=("ISSUE #15: $FILENAME - links to deleted page: $DELETED")
    fi
  done

  # 16. Check for "Apologetics" as category label (avoid false positives from filenames)
  if echo "$CONTENT" | grep -iE '<span[^>]*class="[^"]*category' | grep -qi 'Apologetics'; then
    ISSUES["apologetics_label"]=$((ISSUES["apologetics_label"] + 1))
    FINDINGS+=("ISSUE #16: $FILENAME - has 'Apologetics' as category label")
  fi

  # 17. Check for "Doctrine" in footer headers (more specific check)
  if echo "$CONTENT" | grep -A5 '<footer' | grep -qE '<h[3-6][^>]*>.*Doctrine'; then
    ISSUES["doctrine_in_footer"]=$((ISSUES["doctrine_in_footer"] + 1))
    FINDINGS+=("ISSUE #17: $FILENAME - footer uses 'Doctrine' instead of 'Truth'")
  fi

  # 18. Check for newsletter/subscribe elements
  if echo "$CONTENT" | grep -qE '(newsletter|email.*signup|Mailchimp|ConvertKit|SendGrid|class="subscribe)'; then
    ISSUES["newsletter_elements"]=$((ISSUES["newsletter_elements"] + 1))
    FINDINGS+=("ISSUE #18: $FILENAME - has newsletter/subscribe elements")
  fi

  # 19. Check for back-to-top button
  if echo "$CONTENT" | grep -qE '(class="back-to-top"|id="back-to-top")'; then
    ISSUES["back_to_top"]=$((ISSUES["back_to_top"] + 1))
    FINDINGS+=("ISSUE #19: $FILENAME - has back-to-top button")
  fi

  # 20. Check for links to deleted page paths
  for DELETED in "/connections" "/community" "/resources"; do
    if echo "$CONTENT" | grep -q "href=\"$DELETED"; then
      ISSUES["deleted_page_nav_links"]=$((ISSUES["deleted_page_nav_links"] + 1))
      FINDINGS+=("ISSUE #20: $FILENAME - nav links to deleted path: $DELETED")
    fi
  done
done

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                      AUDIT RESULTS SUMMARY                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

TOTAL_ISSUES=0
echo "Issue Category                                Count"
echo "─────────────────────────────────────────────────────"
for KEY in $(echo "${!ISSUES[@]}" | tr ' ' '\n' | sort); do
  COUNT=${ISSUES[$KEY]}
  TOTAL_ISSUES=$((TOTAL_ISSUES + COUNT))
  printf "%-45s %5d\n" "$KEY" "$COUNT"
done

echo "─────────────────────────────────────────────────────"
printf "%-45s %5d\n" "TOTAL ISSUES" "$TOTAL_ISSUES"
echo ""

if [ "$TOTAL_ISSUES" -eq 0 ]; then
  echo "✓ CLEAN BILL OF HEALTH - All $TOTAL_FILES files pass audit!"
  echo ""
else
  echo "✗ ISSUES FOUND: $TOTAL_ISSUES problems detected"
  echo ""
  echo "DETAILED FINDINGS:"
  echo "════════════════════════════════════════════════════════════════"
  for FINDING in "${FINDINGS[@]}"; do
    echo "  $FINDING"
  done
  echo "════════════════════════════════════════════════════════════════"
  echo ""
fi

exit $([ "$TOTAL_ISSUES" -eq 0 ] && echo 0 || echo 1)
