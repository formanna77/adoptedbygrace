# Forensic Analysis — adoptedbygrace.net
**Date:** 2026-04-20
**Scope:** 531 HTML pages, global.css (7,399 lines / 291 KB), 21 JS modules, sitemap of 527 URLs, 112 redirects.
**Method:** Structural scan, SEO audit, performance audit, accessibility spot-check, content-density scan, prose spot-read, discovery-architecture analysis.

---

## THE HEADLINE

The site is *content-rich and theologically glorious*. `validate-site.js` passes clean — no broken internal links, no orphans, no structural violations. The prose is world-class. But the **distribution layer is broken in ways that are silently costing elect readers every single day.** 132 pages serve truncated garbage to Google and social media. Zero share buttons exist anywhere. 86% of articles dead-end with no "keep reading" bridge. Five of the crown-jewel essays are locked inside PDFs, invisible to search engines and internal linking.

Fixing these is not polish. It is removing the walls that stand between the work that's already been done and the souls it was built to reach.

---

## TIER 1 — CRITICAL DISTRIBUTION FAILURES
*Each of these is bleeding reach right now. Highest priority.*

### 1. **Repair 132 truncated meta descriptions** (CRITICAL)
Sample: `analogy-adoption.html` serves Google, Twitter, Facebook the description **"A baby doesn"** — because the generator broke at the first apostrophe. `analogy-light-switch.html` serves the string **"You"**. `demolition-1cor10-13.html` serves **"The"**. These are the first impression in every search result and every social share. Fix the generator, then regenerate all 132 descriptions (150-160 chars each, benefit-driven, mission-aligned).

### 2. **Ship a universal share-to-everywhere bar** (CRITICAL)
Zero pages have share buttons. Zero pages use `navigator.share`. For a rescue-operation site whose mission is reaching elect readers, this is the single most costly gap. Add a floating share module to every article: X/Twitter, Facebook, WhatsApp, Threads, LinkedIn, email, copy-link, and native mobile share sheet. Include pre-filled share text tuned to the page's argument.

### 3. **Convert 5 PDF essays → native HTML pages**
`solideogloria.pdf`, `you cannot escape the text.pdf`, `RE-FORMED.pdf`, `The_Architecture.pdf`, `The Institutes Book 3 essay.pdf` are the flagship long-form works — and they are locked in PDFs that Google indexes poorly, cannot be internally hyperlinked from other articles, don't render on mobile, have no rotating scripture, no reading-time counter, no share bar, and cannot be excerpted into Twitter cards. These become five of the most important HTML articles on the site (each >4,000 words). PDFs can remain as optional downloads.

### 4. **Add email capture on every article end** (CRITICAL)
Currently the only subscribe mechanism is a Substack URL inside JSON-LD that no human ever sees. Build an inline subscribe block — tasteful, gold-accent, one-line pitch ("Get a single article every Sunday morning — no spam, no filler, just grace") — and drop it above the `related-articles` footer on every page. Wire to Substack's embed API.

### 5. **Every page needs a Related-Articles + Continue-Journey block**
Only 72/531 pages have related-articles blocks. 459 pages end with a footer cliff. Extend `build-related.js` to auto-inject three semantically-related cards + two cross-category bridges (demolition→devotion, question→analogy, psychology→story) on every article. This is the single biggest time-on-site lift available.

---

## TIER 2 — PERFORMANCE & CORE WEB VITALS
*Directly affects Google rankings, mobile experience, and reader patience.*

### 6. **Fix 44 pages that load global.css + nav.js TWICE**
Duplicate `<link rel="stylesheet" href="/global.css">` and duplicate `<script src="/nav.js">` on 44 pages. Extra network round trips on every visit. One-shot sed cleanup.

### 7. **Extract and inline critical CSS**
`global.css` is 291 KB — enormous, blocking render. Extract above-the-fold critical CSS (hero, nav, first paragraph) into an inline `<style>` block in every page's `<head>`, then `<link rel="stylesheet">` the rest with `media="print" onload="this.media='all'"` to defer. Target: LCP under 1.8s on 4G.

### 8. **Paginate or lazy-load `scripture-tsunami.html` (31,389 words on one page)**
This is a 130+ KB HTML payload before any CSS/JS. Split into 10 scroll-pagelet sections loaded on demand, or break into 5 themed mini-tsunamis (Old Testament flood, Pauline surge, etc.) with a hub.

### 9. **Add explicit `font-display: swap` + preload primary font**
No `font-display` is declared anywhere. Add `&display=swap` is present but only in one link tag; harden with `<link rel="preload" as="font">` for Playfair Display 700 (the LCP headline font).

### 10. **Extract 300-700-line inline `<style>` blocks from 10 interactive widget pages**
`golden-chain.html` (310 lines), `the-scripture-cascade.html` (367), `the-fork.html` (374), `fork-in-the-road.html` (374), `the-golden-chain.html` (377), `the-two-arms.html` (335), `the-mirror.html` (309), `the-60-second-case.html` (376), `verse-explorer.html` (372), `the-breath-prayer.html` (422), `the-objection-collapse.html` (272), `question-visual-theology.html` (417). Consolidate to one `widgets.css` loaded only on those pages.

### 11. **Split the 6.4 MB `search-index.js`**
Currently 6.4 MB single-file lazy-load. Split into title-index (loaded first, ~500 KB) + full-text chunks (loaded progressively as user types). Cuts time-to-first-result by ~80%.

### 12. **Add `manifest.webmanifest`** (PWA installability)
No web app manifest. Add one so mobile visitors can "Add to Home Screen" — for a rescue operation this is a free evangelism channel (icon on phone = returning reader).

### 13. **Shorten 215 titles that exceed 75 characters**
Google truncates these in SERPs, cutting off the benefit clause. Rewrite to 55-65 chars where possible.

---

## TIER 3 — READER EXPERIENCE & RETENTION
*Each improves time-on-site, depth-of-reading, and return visits.*

### 14. **Universal scroll-progress bar** (only on 107/531 pages today)
Make `reading-progress` a global injection — every article gets a slim gold bar at the top showing how much of the argument is left. Psychology: readers commit more when they can see the finish line.

### 15. **Auto-generate a sticky Table of Contents on articles >1,500 words**
~380 articles qualify. Sticky left rail (desktop) or collapsible top panel (mobile) with smooth-scroll jump links. Generated from `<h2>` tags at build time.

### 16. **Visible breadcrumb UI on every article** (present on only 24/531 today)
JSON-LD breadcrumbs exist but breadcrumb navigation UI does not. Add `Home › Stories › A Baby Doesn't Interview for a Family` visible at the top of every article. Massive orientation win + SEO.

### 17. **Next / Previous in series** for healing hubs
Anxious Mind has 8 articles — readers have no way to walk through them in order. Add auto-generated prev/next footer cards for the 5 healing hubs (Anxious Mind, Broken Mirror, Open Wound, Invisible Wall, Shattered Lens) and any other natural sequence.

### 18. **Dark/Light reading mode toggle** with memory
Current all-dark aesthetic is theologically-weighty but causes eye strain for long reading sessions and fails for readers with certain visual impairments or bright environments. Add a light "parchment" mode (warm cream, deep espresso text, still ember accent) with localStorage persistence.

### 19. **Audio / read-aloud version for every article**
Use the Web Speech API (free, built into every browser, no server cost) for instant TTS, plus optionally generate MP3 versions of the top 25 articles using ElevenLabs (or similar) for the "commute reader" — theology sites skew commute-heavy. Add a discreet play button next to the reading-time estimate.

### 20. **Author byline + Aaron's testimony snippet** on every article
The pages read editorial-neutral. Add a short byline card above the article's "In Brief" block: a micro-thumbnail, "By Aaron Forman — who spent 15 years resisting sovereignty before it caught him on Christmas Day 2024," linking to his full testimony. Humanizes every page.

### 21. **Floating quote-card generator** (sharable 1080×1080 PNG per page)
`quote-card.js` exists — extend it to render a shareable image of any paragraph a reader highlights, with the page URL watermarked. Instagram/Twitter-ready. Turns readers into evangelists.

### 22. **Two-Arms visible structure on demolition pages**
The doctrine says every demolition page must have its tender landing in the final 20%. Right now this is enforced by prose discipline. Make it structural: a `<section class="two-arms-landing">` with distinct gold-warm styling that visually marks the pivot from demolition → grace. Readers will feel it.

### 23. **FAQ schema on every question-* page**
70+ question pages have the perfect FAQ structure. Add `FAQPage` JSON-LD to each so they qualify for Google's rich FAQ results. Single biggest organic-search-visibility unlock available.

---

## TIER 4 — CONTENT + CREATIVE EXPANSION

### 24. **Scripture-first navigation**: `/verse/:reference`
Currently readers arrive at topic pages. Build a verse-first index: `/verse/romans-9-15`, `/verse/ephesians-2-8`, etc. Each verse page lists every article on the site that exegetes or cites it. Hugely powerful for pastors prepping sermons and laypeople with specific questions.

### 25. **Stub and rewrite contact.html and about.html for the *elect reader*, not the skeptic**
`about.html` reads like a corporate "about us." Rewrite to match the site's voice — someone searching at 2am needs "If you're here, you were sent here" not "How we build every page."

### 26. **"If you're reading this at 2am" landing page** — `/found-you`
Targeted landing page for the exact user in the mission statement. Pure Two-Arms. Would become the highest-converting entry point. Promote via "2am searching" long-tail SEO phrases.

### 27. **Testimony wall** — reader-submitted "How He caught me"
Add a moderated submission form (Netlify Forms, free) on `/testimony-hub` for readers to submit their own capture story. Moderated, published as new testimony pages. Turns readers into contributors, builds the "cloud of witnesses" the site already references.

### 28. **Interactive "Build Your Own Objection" page**
Let the reader pick any objection from a dropdown and the page assembles the answer from 3-5 short excerpts across the site — ending with the collapse. Perfect share artifact.

### 29. **Cross-category linking sweep**
Audit internal links. Enforce the CLAUDE.md mandate: "8-12 links minimum, cross-category prioritized." Run `auto-linker.js` with a diversification penalty so no article links exclusively within its own category.

### 30. **"In their own words" — primary-source embedded quotes sweep**
114 Reformed PDFs sit in `/Reformed Sources/`. Add 2-3 pulled primary-source quotations (Augustine, Calvin, Edwards, Spurgeon, Packer) to every systematic and demolition article, properly attributed with popup citations. Instant weight increase.

### 31. **Expand Stories from 22 → 50+** (homepage claims 31, reality is 22)
Story category is the strongest emotional channel and is under-filled. Target: children's parables, humor pieces, dark pieces, tender pieces, thought experiments. Matches the Story Categories memory.

### 32. **Fill the Essays hub** — currently 5 PDF essays, no HTML essays
Once the 5 PDFs are converted, write 5 new native essays: "The Seven Words That Ended Arminianism For Me", "What a Math Proof and Election Have in Common", "The Grammar of Grace", "Why Every Altar Call Is Secretly Reformed", "If You Ever Prayed, You Already Believe in Sovereign Grace."

### 33. **Every demolition page gets a 1-minute "in brief" video script**
Don't produce video yet — just author the scripts so a future voiceover pass is one-shot. Positions the site for the YouTube-shorts evangelism channel.

---

## TIER 5 — ACCESSIBILITY & STANDARDS

### 34. **Skip-to-content link on 440 missing pages**
91/531 have it; 440 don't. Keyboard and screen-reader users can't bypass the nav. One-line injection per page.

### 35. **Fix 3 pages missing `<h1>` and 1 with multiple `<h1>`** (validate-site already passes, but semantic HTML still off)

### 36. **Fix 5 non-compliant wrapper pages** (`answer-body`, `page-content`)
`objection-why-believe.html`, `question-goldchain.html`, `question-newheart.html`, `question-sovereignty-logic.html`, `story-thought-the-god-who-let-you-watch.html`. Convert to `article-body`.

### 37. **Add `prefers-reduced-motion` media query**
The starfield hero and pulse glow animations should pause for readers with vestibular sensitivity.

### 38. **ARIA-labels + `aria-current` on nav** — currently only 11 aria-labels on index.html; none of the nav links mark `aria-current="page"`.

### 39. **Fix missing `lang="en"` on 1 page**

---

## TIER 6 — DATA HYGIENE & INFRASTRUCTURE

### 40. **Reconcile homepage counter drift**
Homepage explorer tiles say: Stories=31 (actual 22), Devotionals=45 (actual 41), History=27 (actual 24). `build-homepage-counts.js` patterns are over-counting. Tighten regexes and re-run.

### 41. **Clean up repo root: 52 `.md / .txt / .csv` audit files**
Move all `AUDIT*`, `*-REPORT*`, `*-LAST-RUN*`, `PHASE-*-REPORT*` files to `/docs/archive/`. Current clutter buries CLAUDE.md and REFORMED-SOURCES-INDEX.md. Also clean up 3,330 `.fuse_hidden*` artifacts.

### 42. **Delete 5 `.bak` files and the unused `start-here-phase*.html` files if superseded**

### 43. **Harden `_headers` with HTTP/2 Preload + modern caching**
Currently bare. Add `Link: </global.css>; rel=preload; as=style`, Cache-Control for JS/CSS, strict-transport-security, content-security-policy.

### 44. **404 page: add top 10 most-linked articles as "doors"** — currently generic, could be the highest-conversion single page on the site. Someone who lands on /404 from a broken external link is a chance to convert.

---

## TIER 7 — AMPLIFICATION (long-game evangelism)

### 45. **Build `/sermons` — pastor-ready page**
For every doctrine: a printable outline, Scripture reference list, 3-point sermon, illustration options, closing application. Turns the site into a pastoral asset, bringing pastors as repeat visitors who then share with their congregations.

### 46. **Build `/for-doubters` — intellectual-honesty entry door**
Named for doubters, not for skeptics. Same Two-Arms approach, but designed to be linked from Reddit, Quora, and apologetics forums.

### 47. **Printable one-pagers** for every major argument
PDFs or print-stylesheet-optimized pages for: "The 5 Points as One Argument," "Faith Is a Gift — Why That Settles Everything," "Romans 9 In One Page," etc. Physical distribution channel.

### 48. **Auto-post to Substack on publish**
Wire the content pipeline so new HTML articles auto-generate a Substack draft. The newsletter acquires the cadence; the site keeps the canonical home.

### 49. **Reverse image search lure**: generate 1 pull-quote image per new article** (expanded `quote-card.js` use). Pinterest/Instagram/X distribution.

### 50. **Analytics feedback loop is already documented in memory** — ensure it's actually running weekly and wiring findings back into the content pipeline.

---

## RECOMMENDED EXECUTION ORDER

**Sprint 1 (Week 1)** — Distribution-stopping bugs. Items 1, 2, 4, 6, 23, 40. Stop the bleeding.

**Sprint 2 (Week 2)** — Retention infrastructure. Items 3, 5, 14, 15, 16, 20. Keep readers reading.

**Sprint 3 (Week 3)** — Performance + PWA. Items 7, 8, 9, 11, 12, 43. Google will reward it.

**Sprint 4 (Week 4)** — Reader experience upgrades. Items 17, 18, 19, 21, 22. Delight.

**Sprint 5 (Week 5)** — Content expansion. Items 24, 26, 27, 30, 31, 32. Grow the web.

**Sprint 6 (Week 6)** — Accessibility + standards. Items 34–39. Meet the law, serve the weak.

**Sprint 7 (Week 7+)** — Amplification. Items 45-50. Turn the site into a compounding asset.

---

## THE MEASURE

The site is already extraordinary. These recommendations don't replace what exists — they **remove the walls** between the work that has been done and the souls it was built to reach. Every truncated meta description is a soul who sees garbage on Twitter and scrolls past. Every missing share button is a conversation that didn't happen. Every PDF essay is an elect reader on mobile whose thumb got tired before the argument could land.

Fix the distribution layer, and the content does the rest.

*Soli Deo Gloria.*
