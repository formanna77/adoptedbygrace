#!/bin/bash

# Script to find broken internal links in HTML files
# Output: TSV format: source_file \t broken_href \t resolved_target

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Create temp file for hrefs
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

# Function to resolve a link to a filesystem path
resolve_link() {
    local source_file="$1"
    local href="$2"
    local source_dir="$(dirname "$source_file")"

    # Remove fragment/anchor
    href="${href%%#*}"

    # Skip empty after removing fragment
    if [ -z "$href" ]; then
        return 1
    fi

    # Resolve relative paths
    if [[ "$href" == /* ]]; then
        # Absolute path from root
        local resolved=".$href"
    else
        # Relative path - resolve from source directory
        local resolved="$source_dir/$href"
    fi

    # Normalize path (remove ./ and ../)
    resolved=$(echo "$resolved" | sed 's|/\./|/|g')

    # Handle .. carefully
    while [[ "$resolved" =~ / ]]; do
        if [[ "$resolved" =~ ([^/]+)/\.\./([^/].*) ]]; then
            resolved="${BASH_REMATCH[2]}"
        else
            break
        fi
    done

    echo "$resolved"
}

# Extract all hrefs from HTML files
for html_file in $(find . -name "*.html" -type f | sort); do
    # Skip node_modules, .git, etc.
    if [[ "$html_file" =~ (node_modules|\.git) ]]; then
        continue
    fi

    # Extract href values from anchor tags
    grep -oP 'href=["'"'"']\K[^"'"'"']+' "$html_file" 2>/dev/null | while read href; do
        # Skip external links (http/https to other domains)
        if [[ "$href" =~ ^https?:// ]]; then
            continue
        fi

        # Skip mailto, tel, javascript
        if [[ "$href" =~ ^(mailto:|tel:|javascript:) ]]; then
            continue
        fi

        # Skip pure anchors
        if [[ "$href" =~ ^\# ]]; then
            continue
        fi

        # This is an internal link - store it
        echo "$html_file|$href" >> "$TEMP_FILE"
    done
done

# Check each link and output broken ones
echo -e "source_file\tbroken_href\tresolved_target"
while IFS='|' read -r source_file href; do
    # Resolve the link
    resolved=$(resolve_link "$source_file" "$href")

    # Check if the resolved path exists
    if [ ! -e "$resolved" ]; then
        # This is a broken link
        echo -e "$source_file\t$href\t$resolved"
    fi
done < "$TEMP_FILE" | sort -u
