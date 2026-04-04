#!/bin/bash

# Internal Link Density Audit for N-Z Sector Article Pages
# Guardian Agent - adoptedbygrace.net

cd /sessions/gracious-exciting-ramanujan/mnt/adoptedbygracewebsite

# Hub pages to exclude
HUBS="questions.html|stories.html|objections-hub.html|psychology-hub.html|secular-evidence.html|systematic-theology.html|theologians.html|ot-election.html|pastoral-assurance.html|scripture-tsunami.html|shattered-lens-hub.html|open-wound-hub.html|search.html|quiz.html|topics.html|verse-explorer.html|start-here.html"

# Support pages to exclude
SUPPORT="privacy.html|terms.html|404.html|index.html|_nav-template.html"

echo "═══════════════════════════════════════════════════════════════"
echo "INTERNAL LINK DENSITY AUDIT — N-Z SECTOR ARTICLE PAGES"
echo "═══════════════════════════════════════════════════════════════"
echo ""

TOTAL=0
CRITICAL=0
WARNING=0
OK=0
TOTAL_LINKS=0

# Temp arrays to collect results
declare -a FILES
declare -a LINKS
declare -a STATUS

# Find all HTML files starting with n-z (n, o, p, q, r, s, t, u, v, w, x, y, z)
for file in [n-z]*.html; do
  [ -f "$file" ] || continue
  
  # Skip hubs and support pages
  if echo "$file" | grep -qE "^($HUBS|$SUPPORT)$"; then
    continue
  fi
  
  # Count internal links: href="/" patterns pointing to .html
  LINK_COUNT=$(grep -o 'href="[^"]*\.html"' "$file" | grep 'href="/' | wc -l)
  
  FILES+=("$file")
  LINKS+=("$LINK_COUNT")
  
  TOTAL=$((TOTAL + 1))
  TOTAL_LINKS=$((TOTAL_LINKS + LINK_COUNT))
  
  # Determine status
  if [ "$LINK_COUNT" -lt 6 ]; then
    STATUS+=("CRITICAL")
    CRITICAL=$((CRITICAL + 1))
    MARKER="🔴 CRITICAL"
  elif [ "$LINK_COUNT" -lt 8 ]; then
    STATUS+=("WARNING")
    WARNING=$((WARNING + 1))
    MARKER="🟡 WARNING"
  else
    STATUS+=("OK")
    OK=$((OK + 1))
    MARKER="✅ OK"
  fi
  
  printf "%-40s %2d links   %s\n" "$file" "$LINK_COUNT" "$MARKER"
  
done

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo "Total article pages checked:    $TOTAL"
echo "Pages with <6 links (CRITICAL): $CRITICAL"
echo "Pages with 6-7 links (WARNING): $WARNING"
echo "Pages with 8+ links (OK):       $OK"
if [ "$TOTAL" -gt 0 ]; then
  AVG=$((TOTAL_LINKS / TOTAL))
  echo "Average links per page:         $AVG"
fi
echo ""
