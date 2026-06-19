# Structural-Rot Audit (v3 — v5 article-tag-position detector)

**Generated:** 2026-06-19T17:36:25.374Z
**Method:** walk `<article>`/`</article>` tag stack to outer `</article>`; flag iff gap to `<section class="related-articles">` exceeds 800 bytes AND there is at least one orphaned `<h2>` or `<p>` in the gap. Canonical wired-in pattern places related-articles ~50 bytes after `</article>` (`wire-orphans.js` sibling injection). Real rot orphans thousands of bytes outside the wrapper.

**Files scanned:** 682
**Files flagged:** 0

✓ All files pass the v5 article-tag-position check.
