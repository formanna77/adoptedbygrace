# Internal Links Audit - adoptedbygrace.net

## Quick Summary
**Status: ✓ PASSED**
- **Total links scanned:** 8,790 internal links
- **Broken links found:** 0
- **Link integrity:** 100%

## Report Details

| Metric | Count |
|--------|-------|
| HTML files scanned | 198 |
| Total href attributes | 10,641 |
| External links (skipped) | 1,006 |
| Anchor-only links (skipped) | 841 |
| Template variables (skipped) | 3 |
| Data URIs (skipped) | 1 |
| **Internal links checked** | **8,790** |
| **Broken links** | **0** |

## How It Works

The link checker:
1. Extracts all `href` attributes from anchor tags in HTML files
2. Filters out external links (http/https), anchors (#), mailto:, tel:, javascript:, and template variables
3. Resolves internal link paths accounting for URL rewriting:
   - `/` → `index.html`
   - `/page-name` → `page-name.html`
   - Relative paths resolved from source file directory
4. Verifies each resolved path exists as a file or directory with index.html

## Generated Files

### Scripts
- **check-broken-links-final.sh** - Production-ready TSV output script
  ```bash
  ./check-broken-links-final.sh 2>/dev/null
  ```
  Output: TSV with columns `source_file | broken_href | resolved_target | status`

- **check-links-detailed-report.sh** - Human-readable detailed report
  ```bash
  ./check-links-detailed-report.sh
  ```
  Output: Summary statistics and any broken links found

### Reports
- **BROKEN-LINKS-SCAN-RESULTS.txt** - Comprehensive audit report
- **broken-links-final.tsv** - TSV format (header only, no broken links)

## Link Categories Verified

✓ Navigation menu links (/, /start-here, /explore-map, etc.)
✓ Relative asset links (./global.css, ./favicon.svg, etc.)
✓ Cross-content links (between pages, devotionals, stories, etc.)
✓ Subdirectory references (assets, essays, svg, etc.)

## Conclusion

All internal links on adoptedbygrace.net are valid and properly functional. No remediation needed.

---
*Audit Date: 2026-03-28*
