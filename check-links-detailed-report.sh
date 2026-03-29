#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== BROKEN INTERNAL LINKS REPORT ==="
echo "Report generated: $(date)"
echo ""
echo "Scanning all HTML files for broken internal links..."
echo ""

TOTAL_LINKS=0
BROKEN_COUNT=0
EXTERNAL_SKIPPED=0
ANCHOR_SKIPPED=0
TEMPLATE_SKIPPED=0
DATA_URI_SKIPPED=0

# Temp file
TEMP=$(mktemp)
trap "rm -f $TEMP" EXIT

# Extract all links
for html in $(find . -name "*.html" -type f | grep -v -E '(node_modules|\.git|Claude|distribution)' | sort); do
    grep -oP 'href=["'"'"']\K[^"'"'"']+' "$html" 2>/dev/null | while read href; do
        echo "$html|$href"
    done
done > "$TEMP"

# Categorize and check
while IFS='|' read -r source href; do
    ((TOTAL_LINKS++))
    
    if [[ "$href" =~ ^https?:// ]]; then
        ((EXTERNAL_SKIPPED++))
        continue
    fi
    
    if [[ "$href" =~ ^\# ]]; then
        ((ANCHOR_SKIPPED++))
        continue
    fi
    
    if [[ "$href" =~ ^(mailto:|tel:|javascript:) ]]; then
        continue
    fi
    
    if [[ "$href" =~ \$\{ ]]; then
        ((TEMPLATE_SKIPPED++))
        continue
    fi
    
    if [[ "$href" =~ ^data: ]]; then
        ((DATA_URI_SKIPPED++))
        continue
    fi
    
    # This is an internal link to check
    # Remove fragment
    check_href="${href%%#*}"
    
    # Resolve path
    if [[ "$check_href" == /* ]]; then
        check_href="${check_href#/}"
        if [ -z "$check_href" ]; then
            target="index.html"
        else
            target="$check_href"
        fi
    else
        source_dir="$(dirname "$source")"
        target="$source_dir/$check_href"
    fi
    
    # Check existence
    if [ ! -e "$target" ] && [ ! -e "$target.html" ] && [ ! -e "$target/index.html" ]; then
        ((BROKEN_COUNT++))
        echo "BROKEN: $source -> $href (resolves to: $target)"
    fi
done < "$TEMP"

echo ""
echo "=== SUMMARY ==="
echo "Total href attributes found: $TOTAL_LINKS"
echo "External links (http/https): $EXTERNAL_SKIPPED"
echo "Anchor-only links (#...): $ANCHOR_SKIPPED"
echo "Template variables (\${...}): $TEMPLATE_SKIPPED"
echo "Data URIs (data:...): $DATA_URI_SKIPPED"
echo "Internal links checked: $((TOTAL_LINKS - EXTERNAL_SKIPPED - ANCHOR_SKIPPED - TEMPLATE_SKIPPED - DATA_URI_SKIPPED))"
echo ""
echo "BROKEN INTERNAL LINKS FOUND: $BROKEN_COUNT"
echo ""

if [ $BROKEN_COUNT -eq 0 ]; then
    echo "✓ All internal links are valid!"
else
    echo "✗ Found $BROKEN_COUNT broken links (see above)"
fi
