#!/usr/bin/env python3
"""
Link Analysis Script for adoptedbygracewebsite
Analyzes all HTML files and reports on links
"""

import os
import re
from collections import defaultdict
from urllib.parse import urlparse
from pathlib import Path

def extract_hrefs(html_content):
    """Extract all href attributes from anchor and link tags"""
    hrefs = []

    # Match <a href="..."> and <link href="...">
    pattern = r'(?:href|HREF)\s*=\s*["\']([^"\']*)["\']'
    matches = re.findall(pattern, html_content)

    for match in matches:
        hrefs.append(match)

    return hrefs

def categorize_link(href):
    """Categorize a link by type"""
    if not href or href.strip() == "":
        return "empty"

    href = href.strip()

    if href.startswith("javascript:"):
        return "javascript"
    elif href.startswith("mailto:"):
        return "mailto"
    elif href.startswith("#"):
        return "anchor"
    elif href.startswith("http://") or href.startswith("https://"):
        return "external"
    elif href.startswith("//"):
        return "protocol-relative"
    elif href.endswith(".html") or "/" in href and not href.startswith("/"):
        return "internal"
    elif href.startswith("/"):
        return "absolute"
    else:
        return "other"

def get_internal_target(href):
    """Get the target filename for an internal link"""
    # Remove query parameters and anchors
    target = href.split("?")[0].split("#")[0]

    # Handle relative paths
    if target.startswith("./"):
        target = target[2:]

    if not target:
        return None

    return target

def extract_domain(url):
    """Extract domain from a URL"""
    try:
        parsed = urlparse(url)
        return parsed.netloc
    except:
        return "unknown"

def main():
    base_dir = "/sessions/affectionate-practical-volta/mnt/adoptedbygracewebsite"

    # Find all HTML files
    html_files = []
    for file in os.listdir(base_dir):
        if file.endswith(".html"):
            html_files.append(file)

    html_files.sort()

    # Statistics
    stats = {
        "total_files": len(html_files),
        "total_links": 0,
        "by_page": {},
        "broken_internal": [],
        "external_by_domain": defaultdict(list),
        "mailto_links": set(),
        "anchor_links": 0,
        "javascript_links": 0,
        "empty_links": [],
        "malformed_links": []
    }

    print(f"Analyzing {len(html_files)} HTML files...\n")

    # Process each HTML file
    for filename in html_files:
        filepath = os.path.join(base_dir, filename)

        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {filename}: {e}")
            continue

        hrefs = extract_hrefs(content)

        if not hrefs:
            continue

        stats["by_page"][filename] = {
            "total": len(hrefs),
            "by_type": defaultdict(int),
            "broken_links": [],
            "external_links": set(),
            "mailto_links": set()
        }

        for href in hrefs:
            stats["total_links"] += 1
            category = categorize_link(href)
            stats["by_page"][filename]["by_type"][category] += 1

            # Track specific categories
            if category == "empty":
                stats["empty_links"].append((filename, href))
            elif category == "javascript":
                stats["javascript_links"] += 1
            elif category == "mailto":
                mailto_addr = href.replace("mailto:", "").split("?")[0]
                stats["mailto_links"].add(mailto_addr)
                stats["by_page"][filename]["mailto_links"].add(mailto_addr)
            elif category == "anchor":
                stats["anchor_links"] += 1
            elif category == "internal":
                target = get_internal_target(href)
                if target:
                    target_path = os.path.join(base_dir, target)
                    if not os.path.exists(target_path):
                        stats["broken_internal"].append((filename, href, target))
                        stats["by_page"][filename]["broken_links"].append((href, target))
            elif category == "external":
                domain = extract_domain(href)
                stats["external_by_domain"][domain].append((filename, href))
                stats["by_page"][filename]["external_links"].add(domain)
            elif category == "other":
                stats["malformed_links"].append((filename, href))

    # Generate Report
    print("=" * 80)
    print("LINK ANALYSIS REPORT")
    print("=" * 80)
    print()

    print("SUMMARY")
    print("-" * 80)
    print(f"Total HTML files analyzed: {stats['total_files']}")
    print(f"Total links found: {stats['total_links']}")
    print(f"Broken internal links: {len(stats['broken_internal'])}")
    print(f"External domains: {len(stats['external_by_domain'])}")
    print(f"Mailto links: {len(stats['mailto_links'])}")
    print(f"Anchor-only links: {stats['anchor_links']}")
    print(f"JavaScript links: {stats['javascript_links']}")
    print(f"Empty hrefs: {len(stats['empty_links'])}")
    print(f"Malformed/other links: {len(stats['malformed_links'])}")
    print()

    # Report broken internal links
    if stats["broken_internal"]:
        print("=" * 80)
        print("BROKEN INTERNAL LINKS")
        print("=" * 80)
        print(f"Found {len(stats['broken_internal'])} broken internal links:\n")

        for source_page, href, target in sorted(stats["broken_internal"]):
            print(f"  Source: {source_page}")
            print(f"  Link:   {href}")
            print(f"  Target: {target}")
            print()

    # Report external links by domain
    if stats["external_by_domain"]:
        print("=" * 80)
        print("EXTERNAL LINKS BY DOMAIN")
        print("=" * 80)
        print()

        for domain in sorted(stats["external_by_domain"].keys()):
            links = stats["external_by_domain"][domain]
            print(f"{domain} ({len(links)} links):")

            # Show unique URLs per domain
            unique_urls = set()
            for source, url in links:
                unique_urls.add(url)

            for url in sorted(unique_urls)[:5]:  # Show first 5
                print(f"  - {url}")

            if len(unique_urls) > 5:
                print(f"  ... and {len(unique_urls) - 5} more")
            print()

    # Report mailto links
    if stats["mailto_links"]:
        print("=" * 80)
        print("MAILTO LINKS FOUND")
        print("=" * 80)
        for email in sorted(stats["mailto_links"]):
            print(f"  {email}")
        print()

    # Report empty/malformed links
    if stats["empty_links"]:
        print("=" * 80)
        print("EMPTY HREFS")
        print("=" * 80)
        for page, href in stats["empty_links"][:10]:
            print(f"  {page}: href='{href}'")
        if len(stats["empty_links"]) > 10:
            print(f"  ... and {len(stats['empty_links']) - 10} more")
        print()

    if stats["malformed_links"]:
        print("=" * 80)
        print("MALFORMED/OTHER LINKS")
        print("=" * 80)
        for page, href in stats["malformed_links"][:10]:
            print(f"  {page}: {href}")
        if len(stats["malformed_links"]) > 10:
            print(f"  ... and {len(stats['malformed_links']) - 10} more")
        print()

    # Detailed per-page report
    print("=" * 80)
    print("LINK COUNT BY PAGE")
    print("=" * 80)
    print()

    for page in sorted(stats["by_page"].keys()):
        page_stats = stats["by_page"][page]
        print(f"{page}: {page_stats['total']} links")

        if page_stats["broken_links"]:
            print(f"  BROKEN ({len(page_stats['broken_links'])}):")
            for href, target in page_stats["broken_links"]:
                print(f"    - {href} -> {target}")

        if page_stats["external_links"]:
            print(f"  External domains: {', '.join(sorted(page_stats['external_links']))}")

        if page_stats["mailto_links"]:
            print(f"  Mailto: {', '.join(sorted(page_stats['mailto_links']))}")

        print()

if __name__ == "__main__":
    main()
