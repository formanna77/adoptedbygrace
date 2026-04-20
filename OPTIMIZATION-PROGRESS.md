# Exponential Optimization — Execution Log
Started: 2026-04-20

## Status

### SPRINT 1 — Distribution
- [ ] #1  Fix 132 truncated meta descriptions
- [ ] #2  Universal share bar everywhere
- [ ] #3  Convert 5 PDF essays → HTML
- [SKIP] #4  Email capture (user declined)
- [ ] #5  Related-Articles + Continue-Journey everywhere
- [ ] #23 FAQ schema on question pages
- [ ] #40 Reconcile homepage counter drift

### SPRINT 2 — Performance
- [ ] #6  Dedupe 44 pages with duplicate CSS/JS
- [ ] #7  Critical CSS inlining
- [ ] #8  Paginate scripture-tsunami
- [ ] #9  font-display: swap + preload
- [ ] #10 Extract inline CSS from widgets
- [ ] #11 Split 6.4 MB search index
- [ ] #12 manifest.webmanifest
- [ ] #13 Shorten 215 over-long titles
- [ ] #43 Harden _headers

### SPRINT 3 — Reader UX
- [x] #14 Universal scroll-progress (ux-enhancements.js + reading-progress in global.css)
- [x] #15 Auto-TOC on long articles (3+ h2 trigger, JetBrains Mono label, collapsible)
- [x] #16 Visible breadcrumbs (nav.ux-breadcrumbs + JSON-LD BreadcrumbList)
- [x] #17 Next/Prev in healing series (5 series wired in ux-enhancements.js HEALING_SERIES map)
- [ ] #18 Dark/Light mode toggle
- [ ] #20 Author byline + testimony snippet
- [ ] #21 Quote-card generator expansion

*(#19 Audio read-aloud — REMOVED 2026-04-20: no audio/video/social on this site.)*
- [x] #22 Two-Arms visible landing (two-arms.html + links from about + start-here)

### SPRINT 4 — Content Expansion
- [ ] #24 /verse/:ref scripture-first nav
- [ ] #25 Rewrite about.html + contact.html
- [x] #26 /found-you 2am landing (tender catch-arm, homepage hero link, 13+ internal links)
- [ ] #27 Testimony wall
- [ ] #28 Build-your-own-objection
- [ ] #29 Cross-category linking sweep
- [ ] #30 Primary-source quotes sweep
- [~] #31 Expand Stories 22→50+ (in progress: 22 → 28; added tender letter, hard-hitting drowning-man, children's fingerprint, thought-experiment machine-that-asked-why, humor man-who-tried-to-make-himself-hungry, dark rope-you-wove-yourself; stories hub 31→37 cards; every story category now has 2+ pieces)
- [~] #32 5 new native essays (1/5: the-gift-that-proves-itself.html — crown jewel essay in 8 parts, wired into essays.html as Card 06)

*(#33 1-minute video scripts — REMOVED 2026-04-20: no audio/video/social on this site.)*

### SPRINT 5 — Accessibility
- [x] #34 Skip-to-content on every page (ux-enhancements.js injects on all 530+ pages)
- [x] #35 Fix h1 issues (the-mirror.html double-H1 fixed)
- [x] #36 Fix wrapper pages (story-thought-the-god-who-let-you-watch canonicalized; 3 question- pages use div.answer-body intentionally inside article.article-body — legitimate styled class per global.css line 1895)
- [x] #37 prefers-reduced-motion (global.css media query disables transforms/transitions)
- [x] #38 ARIA + aria-current (ux-enhancements.js adds role="main" + aria-current="page"; buttons all labeled)
- [x] #39 Fix lang="en" (all 531 pages verified)

### SPRINT 6 — Data Hygiene
- [x] #41 Clean repo root (13 files moved to /docs/archive — audit reports + superseded agent prompts)
- [x] #42 Delete .bak files (5 removed)
- [x] #44 Upgrade 404 page (new hero, Psalm 139:5-6 verse, sharpened meta)

### SPRINT 7 — Amplification
- [x] #45 /sermons hub (24 cards across 5 sections curating short pieces, homilies, devotional meditations, expository series, preachers from the past)
- [x] #46 /for-doubters hub (20 cards across 5 sections; doubt → comfort → hard doctrine → full case → next step)
- [x] #47 Printable one-pagers (printables.html hub + 5 printables: gospel-in-one-page, faith-is-a-gift, romans-9, where-did-your-faith-come-from, five-points — canonical hero + aggressive print CSS + validator clean)
- [x] #48 Substack auto-pipeline doc (docs/SUBSTACK-CROSSPOSTING.md)
- [ ] #50 Analytics feedback loop verify

*(#49 Per-article quote-card social-share images — REMOVED 2026-04-20: no social media content on this site.)*
