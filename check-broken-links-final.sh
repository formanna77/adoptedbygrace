#!/bin/bash

# Script to find broken internal links in HTML files
# Accounts for URL rewriting: /about -> about.html, / -> index.html
# Output: TSV format: source_file \t broken_href \t resolved_target \t status

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
        # Absolute path from root - remove leading /
        href="${href#/}"
        if [ -z "$href" ]; then
            # Root link
            echo "./index.html"
        else
            echo "./$href"
        fi
    else
        # Relative path - resolve from source directory
        echo "$source_dir/$href"
    fi
}

# Function to check if a link target exists
# Tries multiple variations: direct file, .html extension, index.html in dir
check_link_exists() {
    local target="$1"

    # Remove leading ./
    target="${target#./}"

    # Try as direct file (relative path)
    if [ -e "$target" ]; then
        return 0
    fi

    # Try with .html extension
    if [ -e "$target.html" ]; then
        return 0
    fi

    # Try as directory with index.html
    if [ -e "$target/index.html" ]; then
        return 0
    fi

    return 1
}

# Extract all hrefs from HTML files
for html_file in $(find . -name "*.html" -type f | sort); do
    # Skip node_modules, .git, etc.
    if [[ "$html_file" =~ (node_modules|\.git|Claude|distribution) ]]; then
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

        # Skip template variables (Angular, Vue, etc.)
        if [[ "$href" =~ \$\{ ]]; then
            continue
        fi

        # Skip data URIs
        if [[ "$href" =~ ^data: ]]; then
            continue
        fi

        # This is an internal link - store it
        echo "$html_file|$href" >> "$TEMP_FILE"
    done
done

# Check each link and output broken ones
echo -e "source_file\tbroken_href\tresolved_target\tstatus"
while IFS='|' read -r source_file href; do
    # Resolve the link
    resolved=$(resolve_link "$source_file" "$href")

    # Check if the resolved path exists
    if ! check_link_exists "$resolved"; then
        # This is a broken link
        echo -e "$source_file\t$href\t$resolved\tBROKEN"
    fi
done < "$TEMP_FILE" | sort -u
