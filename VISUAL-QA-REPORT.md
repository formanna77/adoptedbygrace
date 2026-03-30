# Visual QA Report
**Last Run:** 2026-03-30T03:04 UTC
**Pages Checked:** 198
**Viewport Sizes Tested:** 320×568, 390×844, 428×926, 768×1024, 1366×768, 2560×1440
**Issues Found:** 0 critical, 0 responsive, 0 broken links

## ✅ ALL CLEAR

All 198 pages passed all checks across all 6 viewport sizes.

No critical issues, no broken layouts, no invisible content, no broken internal links.

## Checks Performed

**Content Visibility:** Every page has >100 characters of meaningful content outside the nav. No pages have empty `<main>` or `<article>` tags. No pages have `.reveal { opacity: 0 }` or `.scroll-reveal { opacity: 0 }` in inline styles or in `global.css`.

**global.css Safety:** Confirmed `.reveal` and `.scroll-reveal` opacity:0 rules remain removed (deleted 2026-03-29). Comment markers are in place at lines 520 and 745 to prevent re-introduction.

**Required Includes:** All 198 pages include `global.css` in `<head>` and `nav.js` before `</body>`.

**Nav Elements:** All pages with a `<nav>` have both `.hamburger` (for mobile ≤968px) and `.nav-right` (for desktop ≥969px) elements present in the DOM.

**Internal Links:** 12,109 internal links checked across all pages — zero broken links found.

## Informational Notes

**41 pages still have `class="reveal"` on content elements.** This is cosmetically harmless since the CSS rule that set `opacity: 0` on `.reveal` was removed from `global.css` on 2026-03-29. The class attributes are inert — they don't hide anything. A future cleanup pass could strip them, but they pose zero risk to visitors.

**Pages with residual `.reveal` classes:** analogies-illustrations, analogy-adoption, analogy-chess-grandmaster, analogy-doctor-corpse, analogy-lazarus-grave, analogy-light-switch, creed-canons-dort, creed-heidelberg-catechism, creeds-confessions, demolition-arianism, devotional-cold-church, devotional-in-christ, history-confessions-story, history-golden-thread, index-new, index, ot-isaiah-servant, ot-prophets-remnant, pastoral-assurance, pastoral-evangelism, pastoral-prayer, pastoral-suffering, psalms-election, psychology-autonomy-illusion, psychology-hub, psychology-why-we-resist, question-depravity, question-faithgift, question-romans9, resistance-last-idol, secular-algorithm-sovereignty, secular-art-literature-reformed-truth, secular-economics-depravity, secular-evidence, secular-history-sovereignty, secular-neuroscience-human-inability, secular-philosophy-free-will, secular-psychology-bondage-of-will, secular-sociology-human-inability, systematic-justification, theologian-arminius.

**`index.html` hero section** uses inline `opacity: 0` with `animation: fadeUp` for intentional entrance animations on hero slides, CTAs, and scroll indicator. This is correct behavior — these are non-content decorative animations that resolve to `opacity: 1` via CSS `forwards` fill mode.

## BROKEN LINKS
None.

## Previous Issues (Resolved)
- `.reveal { opacity: 0 }` in global.css — **removed 2026-03-29**
- `.scroll-reveal { opacity: 0 }` in global.css — **removed 2026-03-29**
- `.stagger { opacity: 0 }` in global.css — **removed 2026-03-29**
