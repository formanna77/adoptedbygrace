# ADOPTED BY GRACE — Master Roadmap

> **Purpose:** This file is the living brain of the website's development. Every scheduled session reads this file FIRST, does its work, then updates this file LAST. Nothing gets lost between sessions.

> **Mission:** Make adoptedbygrace.net the most powerful resource on earth for proving the greatness of the glory of the grace of God — through rigorous exegesis, irrefutable logic, and beautiful design. Let the Word do the work.

---

## Current State (as of 2026-03-26)

### Pages Live
- `index.html` — Homepage with hero, featured questions, key verses
- `questions.html` — Hub listing 16 question deep-dives in 4 categories
- `question-chosen.html` — Ephesians 1:3-11 (election in Christ)
- `question-john6.html` — John 6:37-44,65 (the Father's drawing)
- `question-john10.html` — John 10 (my sheep hear my voice)
- `question-john15.html` — John 15 (you did not choose me)
- `question-matt11.html` — Matthew 11 (hidden from the wise)
- `question-romans9.html` — Romans 9 (vessels of mercy)
- `question-sealed.html` — Ephesians 1:13-14 (sealed by the Spirit)
- `question-goldchain.html` — Romans 8:29-30 (the golden chain)
- `question-newheart.html` — Ezekiel 36:26 (new heart)
- `question-acts.html` — Acts 13:48 (appointed to eternal life)
- `question-freewill.html` — Addressing free will objections
- `question-foreknowledge.html` — Foreknowledge vs. predestination
- `question-godwants.html` — "God wants all to be saved" (1 Tim 2:4, 2 Pet 3:9)
- `question-unfair.html` — "Is God unfair?"
- `question-whosoever.html` — "Whosoever will" passages
- `question-boasting.html` — Ephesians 2:8-9 (not of works)
- `question-faithgift.html` — Is faith a gift?
- `question-depravity.html` — Total Depravity (Romans 3, Eph 2, Gen 6 — man's complete inability)
- `about.html` — Mission and audience
- `essays.html` — 6 downloadable PDF essays
- `freedom.html` — Why sovereign grace is the end of fear
- `connections.html` — The Unbreakable Thread (comprehensive proof)

### Design System
- Dark dramatic aesthetic (#0a0a0f bg, gold/ember/violet accents)
- Playfair Display / Inter / JetBrains Mono
- Responsive, mobile-first
- All CSS inline per page (no shared stylesheet yet)

### Known Issues
- ~~OG URLs still reference `re-formed.netlify.app`~~ — **Fixed 2026-03-26**
- No shared CSS — every style change must be replicated across 23 files
- ~~No sitemap.xml or robots.txt~~ — **Fixed 2026-03-26**
- No structured data (JSON-LD) for SEO
- No analytics integration
- No "Start Here" guided reading path for newcomers

---

## Content Backlog (Builder Sessions)

### Priority 1 — Core Doctrine Pages (New)
- [x] **Total Depravity deep-dive** — Romans 3:10-18, Eph 2:1-3, Gen 6:5. Man's complete inability. → `question-depravity.html`
- [ ] **Irresistible Grace deep-dive** — John 6:37, Phil 1:29, Acts 16:14. Effectual calling.
- [ ] **Perseverance of the Saints** — John 10:28-29, Rom 8:35-39, Phil 1:6. Eternal security grounded in God's character.
- [ ] **2 Timothy 1:9 page** — "saved us...not because of our works but because of his own purpose and grace"
- [ ] **Titus 3:3-7 page** — "not because of works done by us in righteousness"
- [ ] **1 Peter 1:1-2 page** — "elect exiles...according to the foreknowledge of God"
- [ ] **Revelation 13:8 / 17:8 page** — "names written before the foundation of the world"

### Priority 2 — Old Testament Election
- [ ] **Deuteronomy 7:6-8 page** — "The LORD your God has chosen you" — not because you were more
- [ ] **Isaiah 46:9-10 / 55:11 page** — God's word accomplishes what He purposes
- [ ] **Malachi 1:2-3 / Jacob and Esau** — "Jacob I loved, Esau I hated" — OT context
- [ ] **Exodus hardening of Pharaoh** — God's sovereignty over hearts
- [ ] **Psalm 65:4 page** — "Blessed is the one you choose and bring near"
- [ ] **Proverbs 16:33 / 21:1 page** — Sovereignty over lots and kings' hearts

### Priority 3 — Thematic Pages
- [ ] **"Start Here" guided reading path** — A curated journey for someone encountering Reformed theology for the first time
- [ ] **The Five Solas page** — Historical and biblical case for each sola
- [ ] **Redemptive History Timeline** — Interactive timeline from creation to consummation showing God's sovereign plan
- [ ] **Glossary of Terms** — Election, predestination, effectual calling, regeneration, justification, sanctification, glorification, monergism, synergism, etc.
- [ ] **Historical Theology page** — Augustine, Luther, Calvin, Edwards, Spurgeon, Whitefield — the cloud of witnesses
- [ ] **Creeds & Confessions page** — Canons of Dort, Westminster Standards, 1689 Baptist Confession — with explanation

### Priority 4 — Apologetic / Objection Pages
- [ ] **"What about the person who never heard?"** — Romans 1, general vs. special revelation
- [ ] **"Did Jesus die for everyone?"** — Definite atonement / limited atonement
- [ ] **"Can you lose your salvation?"** — Comprehensive perseverance case
- [ ] **"Doesn't election make evangelism pointless?"** — Election as the engine of evangelism
- [ ] **"What about babies/children?"** — Grace, covenant, and those who die young

---

## Refinement Backlog (Refiner Sessions)

### Content Quality
- [ ] Audit all 17 question pages for theological precision — verify every Greek claim
- [ ] Add more cross-references between pages (e.g., question-romans9 should link to question-goldchain)
- [ ] Strengthen the weakest arguments on each page
- [ ] Add "Further Reading" sections pointing to other pages on the site
- [ ] Ensure every page has a compelling opening paragraph that hooks the reader
- [ ] Add pull quotes from historic Reformed theologians (Spurgeon, Edwards, Calvin, Augustine)
- [ ] Review and improve the connections.html page — it's the largest but may lack focus
- [x] Refine question-faithgift.html — fix Greek error, add witnesses, cross-references, further reading ✅ (2026-03-26 Refiner)

### Specific Page Fixes (found during refinement)
- [ ] **question-boasting.html:** Fix garbled Greek "ἵνα μὴ κομχθῇ" → should be "ἵνα μὴ καυχήσηται (hina mē kauchēsētai)"; add cross-references and historic quotes
- [ ] **question-acts.html:** Add cross-references to related pages, add historical theologian quotations, add Further Reading section

### Scripture Handling
- [ ] Verify all Scripture quotations are accurate (ESV preferred)
- [ ] Add hover tooltips for Scripture references that show the full verse
- [ ] Ensure Greek transliterations are consistent and accurate across all pages

### Writing Quality
- [ ] Eliminate redundancy across pages
- [ ] Improve transitions between sections within each page
- [ ] Make conclusions more powerful — end with the text of Scripture, not human commentary
- [ ] Ensure the tone is warm and worshipful, not merely academic or combative

---

## Architecture Backlog (Architect Sessions)

### SEO (Critical)
- [x] Create `sitemap.xml` ✅ (2026-03-26 Architect)
- [x] Create `robots.txt` ✅ (2026-03-26 Architect)
- [x] Update all OG meta tags from `re-formed.netlify.app` to `adoptedbygrace.net` ✅ (2026-03-26 Architect)
- [ ] Add JSON-LD structured data (Article schema) to every content page
- [ ] Optimize meta descriptions for every page
- [x] Add canonical URLs to every page ✅ (2026-03-26 Architect)
- [ ] Ensure all heading hierarchy is correct (single H1 per page)

### Performance
- [ ] Extract shared CSS into a single `styles.css` file (reduces total site size dramatically)
- [ ] Minify HTML/CSS for production
- [ ] Add preconnect hints for Google Fonts
- [ ] Optimize font loading with `font-display: swap`
- [ ] Add lazy loading for any below-fold content

### Accessibility
- [ ] Add skip-to-content links on every page
- [ ] Ensure all interactive elements have focus styles
- [ ] Verify color contrast meets WCAG AA standards
- [ ] Add ARIA labels where appropriate
- [ ] Test keyboard navigation on all pages

### Design & UX
- [ ] Add a "Back to Top" button on long pages
- [ ] Add reading progress indicator on question pages
- [ ] Improve mobile navigation (hamburger menu)
- [ ] Add page transition animations
- [ ] Add a search feature (client-side, no server needed)
- [ ] Create a 404 page with helpful navigation
- [ ] Add breadcrumb navigation on deep pages
- [ ] Add social sharing buttons (Twitter/X, Facebook) on content pages

### Infrastructure
- [ ] Set up Netlify deploy configuration properly
- [ ] Add `_headers` file for caching and security headers
- [ ] Add `_redirects` for any needed URL redirects

---

## Session Log

### 2026-03-26 — Refiner Session: question-faithgift.html
- **Page refined:** `question-faithgift.html` (Faith: Gift or Achievement?)
- **Critical Greek error fixed:** Replaced incorrect "ἐκ περισσοῦ (ek perisou)" with correct "οὐκ ἐξ ὑμῶν (ouk ex hymōn)"
- **New section added:** "The Witnesses" — five historical quotations (Augustine, Luther, Calvin, Spurgeon, A.W. Pink)
- **Three theologian pull quotes** embedded throughout the page
- **New argument added:** Argument 5 "The Convergence of Witnesses" (Acts 13:48, 16:14, 18:27; 2 Tim 2:25; John 6:65)
- **New objection added:** 4th objection on God's justice — answered via Romans 9:19-21 and John 3:19
- **Additional Scripture:** 2 Tim 2:25, Acts 18:27, Acts 16:14, Ephesians 2:10 (closing)
- **Cross-references:** Links to 8 other pages on the site
- **Further Reading section** with 6 linked pages
- **Verdict strengthened:** Ends with Ephesians 2:10 instead of human commentary
- **Issues noted:** question-boasting.html has garbled Greek ("κομχθῇ" → should be "καυχήσηται"); question-acts.html needs cross-references and historical quotes

### 2026-03-26 — Deploy Session: FAILED
- **Sanity check passed:** 23 HTML files present, index.html intact, all expected pages accounted for.
- **Deployment failed:** The sandbox environment's outbound proxy blocks connections to npm registry, Netlify API (`api.netlify.com`), Netlify MCP proxy (`netlify-mcp.netlify.app`), and PyPI. The Netlify MCP `deploy-site` tool returns a CLI command requiring `npx @netlify/mcp`, but `npm install` is blocked (403 Forbidden, `blocked-by-allowlist`). Chrome extension was also unavailable for manual dashboard deploy.
- **Action needed:** Deploy must be triggered manually by Aaron, or the proxy allowlist must be updated to permit `registry.npmjs.org` and `netlify-mcp.netlify.app`. Alternatively, a Netlify Git-linked deploy (push to GitHub) would bypass this issue entirely.
- **Site state:** All Architect Session SEO improvements (sitemap.xml, robots.txt, canonical URLs, OG tag fixes) are ready to go live once deployment succeeds.

### 2026-03-26 — Architect Session: SEO Foundation
- Created `sitemap.xml` with all 23 pages, prioritized (homepage 1.0, hub 0.9, content 0.8, utility 0.6-0.7)
- Created `robots.txt` allowing all crawlers, referencing sitemap
- Updated OG `og:url` meta tags on all 23 HTML files from `re-formed.netlify.app` to `adoptedbygrace.net`
- Added `<link rel="canonical">` to all 23 HTML files with correct per-page URLs
- **Next priority:** JSON-LD structured data (Article schema) on content pages, then heading hierarchy audit

### 2026-03-26 — Builder Session: Total Depravity
- Built `question-depravity.html` — "Dead, Not Sick: The Bible's Diagnosis of the Human Condition"
- Covers Romans 3:10-18, Ephesians 2:1-3, Genesis 6:5 with supporting texts (Rom 8:7-8, 1 Cor 2:14, Jer 17:9)
- 6 Greek/Hebrew word analyses (nekros, physis, ekzēteō, yetser, syniēmi, raq)
- 5 major arguments with Scripture grounding
- 5 objections anticipated and answered (including prevenient grace)
- Extensive cross-references to existing pages (newheart, john6, chosen, faithgift, sealed, goldchain, acts, unfair)
- "Connections" section explaining how depravity is the foundation for all other doctrines of grace
- Added as item #18 on questions.html hub page
- Updated questions.html meta descriptions from 16 to 18
- OG URL uses adoptedbygrace.net (not old re-formed.netlify.app domain)
- Current page count: 24 HTML files, 6 PDF essays

### 2026-03-26 — Initial Setup
- Created ROADMAP.md
- Set up 3 scheduled tasks (Builder, Refiner, Architect)
- Current page count: 23 HTML files, 6 PDF essays

---

## Rules for Every Session

1. **Read this file first.** Always.
2. **Pick ONE task from your backlog.** Go deep, not wide.
3. **Match the existing design system exactly.** Use the same CSS variables, fonts, and patterns.
4. **Every new page must have:** proper meta tags, responsive design, navigation, footer, scroll-spy (if long), and internal links to related pages.
5. **Let Scripture speak.** Present the text, explain the text, defend the text. Don't editorialize.
6. **Update this file last.** Check off what you did. Add anything new you discovered.
7. **Never break existing pages.** If refactoring shared elements, verify all 23+ pages still work.
