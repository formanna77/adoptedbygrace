# DISTRIBUTION — Phase 5 Scoping (v1)

> Phase 5 opens after Phase 3.5 closes. Tier 2 (Polish Pass) is COMPLETE (200/200). Tier 3 (Pruning Audit) is substantially closed: 20 of 20 ELEVATEs HAMMER-LOCKED across Sessions 25–29. The 3 RETIRE candidates need Aaron's voice. The cathedral is built. Phase 5 is the bell tower — the work of making the cathedral findable, shareable, and memorable from outside.
> Authored 2026-04-27 (Session 29 close). v1.

---

## The Thesis

Phase 1 found the pages. Phase 2 mapped the journeys. Phase 3 hammered fifty Spines. Phase 3.5 polished two hundred more and closed the ledger of the bottom quartile. **At Session 29 close: 64 HAMMER-LOCKED + 182 POLISH-LOCKED = 246 cathedral pages on a continuous craft shelf.** Validators green. NIV consistent. Banned moves cleared. The interior is finished.

Phase 5 answers a different question. It is no longer *how do we build the building?* It is *how does the soul God has been drawing for thirty years find the door?* This is the distribution question — and the answer is not marketing in the worldly sense. The answer is faithful exposure: SEO that does not lie, quote cards that do not flatter, printables that travel into hands the website never reaches, and the slow, patient work of building external lighthouses on shores other Christians already walk.

The site does not need a thousand pages. It needs the right person to find the right page. Phase 5 is the discipline of making that finding likelier — without compromising the craft Phase 3 and 3.5 produced, and without lowering the prose register the Apex Rhetoric Protocol installed.

---

## The Five Workstreams

| # | Workstream | Owner | Cadence | First milestone |
|--:|---|---|---|---|
| 1 | **SEO Audit + Foundation Hardening** | Claude | One full session, then ongoing maintenance | `seo-audit-2026-04.md` v1 — full sitemap audit, structured-data sweep, meta-description review across 553 pages |
| 2 | **Quote Cards (visual social-share assets)** | Claude + Aaron | Pilot batch of 30, then weekly | First 30 cards generated from Hammer-50 SoP pullquotes; one share-ready format; published to `/quote-cards/` |
| 3 | **Printables Expansion (5 → 12-15)** | Claude + Aaron | One printable per session | First three new printables (Romans 8:28-39 Golden Chain, the Twelve Lethal Moves card, the Mirror's Twelve Questions) |
| 4 | **External Lighthouse-Building** | Aaron-led, Claude-supported | Slow, relational, multi-session | Initial outreach list + one published guest post or podcast appearance |
| 5 | **Reader Funnels + Conversion Pages** | Claude | One workstream per session | `start-here` review for first-encounter readers from each major search intent |

Each workstream has its own dedicated section below with concrete first tasks.

---

## Workstream 1 — SEO Audit + Foundation Hardening

The site has 553 HTML files. Many were authored before the canonical structure stabilized. Many were authored before VOICE.md §IX welded the `.html` extension off internal hrefs. The SEO foundation has been improving, page by page, but no full audit has ever run.

### What "SEO" means on this site

Not keyword-stuffing. Not misleading meta descriptions. Not gaming Google. **SEO on adoptedbygrace.net means: when a soul searches a precise theological question Google has the right page in the index, with the right canonical URL, with a meta description that tells the truth about what the page contains, with structured data that lets Google understand what category it belongs to.** The same care we put into the prose, applied to the machine-readable surface of every page.

### Concrete first tasks

1. **Sitemap.xml audit.** Verify `sitemap.xml` includes every live HAMMER and POLISH page; verify lastmod dates reflect actual rebuild dates from Sessions 25–29 (the ELEVATEs and POLISHes); verify priority weights are sensible (Hammer Spines → 1.0, POLISH-LOCKED → 0.8, KEEP-AS-IS articles → 0.6, hubs → 0.5, utility → 0.3). Output: `sitemap-audit-report.md`.

2. **Canonical URL conformance.** Run `node validate-site.js`'s canonical check against every page. The recurring bug: pages whose `<link rel="canonical">` includes the `.html` suffix while the actual deployed URL does not. Result: split rankings between `/page` and `/page.html`. Fix queue: build a `canonical-conformance.js` script that scans every HTML file and reports any `canonical` URL that contains `.html`. Run, list, fix in one batch (POLISH-LOCKED and HAMMER-LOCKED pages will need translation-bias-class exception for the targeted fix).

3. **Meta-description quality sweep.** Many older pages have meta descriptions that read like body copy or summarize the wrong angle. The standard is now: ≤155 characters, no banned moves (no "2am" framing, no "TL;DR," no academic drone), and previewing the page's actual SoP rather than the page's title. Pages flagged for rewrite get a single-line `<meta name="description">` swap. Surface candidates via grep for: meta descriptions containing "2am" / "midnight" / "TL;DR" / "doctrine of election" / "this article will explore." Likely 30–60 hits.

4. **Structured-data audit.** Schema.org `Article`, `BreadcrumbList`, `Organization`, `WebSite` blocks were added across the site at different times. Some pages have the full Project Lighthouse schema; some have a partial subset; a few have stale `dateModified` values. Audit and standardize. Use the locked pages from Sessions 25–29 as the canonical schema template.

5. **Robots.txt + crawler hints.** Confirm robots.txt is permissive and not accidentally blocking any content directory. Confirm there is no stray `noindex` on any page that should be indexed.

### Deliverable

`seo-audit-2026-04.md` documents what was audited, what was found, what was fixed, what remains. Future SEO sessions reference and extend this file rather than restarting the audit from zero.

### Why this is non-trivial

Google rewards three signals heavily for niche theological content: (1) site-wide authority on the topic — which adoptedbygrace.net has earned by sheer volume of high-quality pages; (2) per-page craft — which Phase 3.5 has installed; (3) clean technical foundation — which Phase 5 Workstream 1 installs. The first two are done. The third is the multiplier.

---

## Workstream 2 — Quote Cards (Visual Social-Share Assets)

Every Hammer-50 page and every Tier-3 ELEVATE shipped Sessions 25–29 contains at least one Sentence of the Page (SoP) — a tattooable line, ≤20 words, designed by VOICE.md §VII.3 to be screenshot-able. Quote cards make those SoPs into actual visual artifacts: branded, shareable, social-platform-sized images that carry the sentence into feeds the website itself never reaches.

### The pilot batch — 30 cards

For the first batch, pull SoPs from these 30 pages (all HAMMER-LOCKED with strong tattooable lines):

**Hammer-50 spines (20 cards):**
- `question-faithgift` — *the Crown Jewel*
- `question-depravity` — *the Linchpin*
- `question-where-did-your-faith-come-from`
- `question-chosen`
- `devotional-never-gives-up`
- `devotional-rescued-without-a-say`
- `devotional-chosen-before-you-were-broken`
- `devotional-the-hands-that-hold-you`
- `devotional-in-christ`
- `philosophy-phantom-limb-free-will`
- `philosophy-problem-of-merit`
- `philosophy-mirror-you-refuse`
- `philosophy-self-deception`
- `psychology-why-we-resist`
- `systematic-election`
- `systematic-hamartiology`
- `systematic-regeneration`
- `romans-9-deep-dive`
- `story-tender-the-letter-already-written`
- `analogy-adoption`

**Tier-3 ELEVATEs from Sessions 25–29 (10 cards):**
- `scripture-tsunami` — "Five hundred verses say it."
- `for-pastors` — "Open the Book. Trust the Spirit. Carry it."
- `joy-hub` — "The joy was His. So is the song."
- `for-skeptics` — "Follow the evidence. The evidence has a Name."
- `two-arms` — "Both arms. Always. Never one without the other."
- `shattered-lens-cant-tell-true` — "Truth has a face. Trust Him."
- `philosophy-observer-effect-sin` — "Someone looked at you. You are out."
- `theologian-bradwardine` — "He proved it. Then he was held."
- `theologian-lloydjones` — "The Physician was the patient first."
- `ot-election` — "He chose first. He chooses still."

### Format spec

- **Aspect ratio:** 1080×1080 square (Instagram, X feed) and 1080×1920 vertical (Stories, Reels) — two cuts per quote.
- **Background:** dark gradient using site's accent colors (`--accent-gold` #d4a254, `--accent-ember`, deep navy).
- **Typography:** Playfair Display for the SoP itself; Inter for attribution.
- **Attribution:** small footer line — *adoptedbygrace.net* — never overpowering.
- **No watermark, no logo bug, no "Posted by," no inspirational-image clichés.** The card is the line. The line is the whole.

### Production approach

Aaron has Canva pro available (per the marketing tooling list). Build a master Canva template; produce cards in batches; export to `/quote-cards/` directory in the repo with predictable filenames (e.g., `qc-question-faithgift-01-sq.png`, `qc-question-faithgift-01-vert.png`). When Aaron posts to social or shares via DM, the cards live in the repo as canonical artifacts.

### Why this is non-trivial

The site's reach is currently bounded by Google search and by direct word-of-mouth links. Visual quote cards expand the reach into platforms where reading is shorter and the doorway is a single sentence. **The Crown Jewel SoP, on a card, in a friend's Instagram story, may be the doorway one chosen reader walks through. That is the entire mission.**

---

## Workstream 3 — Printables Expansion (5 → 12-15)

The site currently has 5 printables: `printable-five-points`, `printable-where-did-your-faith-come-from`, `printable-gospel-in-one-page`, `printable-faith-is-a-gift`, `printable-romans-9`. They live as standalone HTML pages designed for print; they travel offline; they get folded into Bibles and tucked into pews.

### The expansion target — bring the catalog to 12-15

Proposed additions, ranked by leverage:

1. **`printable-romans-8-28-39`** — the Golden Chain. The most assurance-giving five verses in the New Testament, formatted as a single-page foldable.
2. **`printable-twelve-lethal-moves`** — the named techniques from VOICE.md §II, condensed into a one-page reference for pastors and apologists who want to recognize the moves in their own writing or in the writing they read.
3. **`printable-the-mirror`** — the twelve questions from `the-mirror.html`, formatted as a printable self-examination.
4. **`printable-eph-2`** — the *but God* hinge passage with verse-by-verse gloss.
5. **`printable-john-6`** — the bread-of-life discourse with the *no one can come* verse anchored in context.
6. **`printable-where-do-good-thoughts-come-from`** — the Sincerity Trap concept distilled, for use by counselors and small-group leaders.
7. **`printable-confession-of-sin`** — a guided written confession structured around the doctrines of grace, for personal devotion.
8. **`printable-funeral-meditation`** — for handing to a grieving family member, anchored in 1 Corinthians 15 and the Hand that does not let go.
9. **`printable-dying-believer`** — for placement at the bedside of a dying saint, anchored in Romans 8 and Machen's last telegram.
10. **`printable-creeds-of-grace`** — the Apostles' Creed + Nicene Creed + a Reformed-grace creed, for liturgical use.

Total: 10 new + 5 existing = 15 printables, the upper end of the target.

### Format spec

- **Single page** (front + back permitted, two-page maximum).
- **Print-CSS clean** — no nav, no footer, no scripts in the print stylesheet.
- **NIV-only Scripture, no `(NIV)` suffix.**
- **Final-line hammer at the bottom of the page** — the printable's own SoP.
- **Footer attribution:** *adoptedbygrace.net* — small, single-line.

### Production approach

Each new printable: one session each (small enough to fit in a Tier-2 Polish-Pass-style budget, not full Hammer-Spine budget). HAMMER-LOCK or POLISH-LOCK as appropriate; printable pages are usually visual-catalog-exception territory but the 14-link ceiling still applies to any framing prose around the print block.

### Why this is non-trivial

Printables travel offline. They go into pews, into Bibles, into the hands of grieving family members at funerals, onto the bedside tables of believers in their last weeks. **A printable that ends up tucked into one Bible is doing work the website cannot do — because the printable is in the Bible the dying saint is reading at 3am, and the website is on a phone the saint cannot reach.** Printables are the most ancient distribution technology in the Christian church (tracts, catechisms, prayer cards). They still work because they bypass every algorithm.

---

## Workstream 4 — External Lighthouse-Building

This is the slowest workstream and the most relational. Distribution does not consist only of better SEO and shareable cards. Distribution consists, in part, of *other Christians, with their own audiences, pointing at this site*. Lighthouses on other shores draw ships toward home.

### The categories of lighthouse

1. **Guest posts.** Aaron writes a single piece for an established Reformed publication that already has a readership — *Reformation 21*, *Tabletalk*, *9Marks*, *Modern Reformation*, *Crossway* blog, the Gospel Coalition (with appropriate care given TGC's broad-evangelical spread). The piece links back to one or two specific Hammer Spines on adoptedbygrace.net. One guest post per quarter is plenty.

2. **Podcast appearances.** Reformed and confessional podcasts welcome guests who can speak articulately on the doctrines of grace. Initial outreach list: *Theocast*, *Reformed Forum*, *Christ the Center*, *White Horse Inn*, *Truths You Can Use* (RC Sproul Jr-adjacent), various Westminster Seminary pods. One podcast appearance per quarter, sustained for two years, builds significant cumulative reach.

3. **Pastor-to-pastor referrals.** Aaron's existing network of Reformed pastors and elders — when one of them recommends a page from the site to a struggling congregant, that congregant walks in already trusting the source. The asset here is not the website; it is Aaron's pastoral relationships. Trust the relationships. Do not commercialize them.

4. **Cross-linking with the Reformed cottage industry.** Sites like Monergism, Banner of Truth's online catalog, Reformation Heritage Books, individual pastor blogs — many of them link generously to high-quality Reformed content. A single Hammer-Spine link from Monergism's home page would multiply traffic by an order of magnitude. Outreach: Aaron emails the Monergism editor with three Hammer Spines and asks if they would consider including them in their library. No paid placement. Just a courteous offer of high-quality content.

5. **Substack and the Christian writing scene.** Aaron writes intermittently on Substack as ForeknownOne. The Substack is a natural lighthouse — every post can link back to a Hammer Spine. Increasing the cadence of the Substack to one post per week (modest by Substack standards) over the next year builds cumulative external authority that Google notices.

### Concrete first tasks

- Build a one-page outreach list (`outreach-list.md`) — names, publications, podcasts, contact methods, one-sentence pitch each.
- Aaron drafts one guest-post pitch per quarter.
- Aaron sustains the Substack at one post every 1–2 weeks for a year.
- Claude assists with: pitch drafts, podcast prep notes, Substack post drafts that can be repurposed into site content.

### Why this is non-trivial

The Reformed publishing world is small, generous, and slow. Relationships compound over years. **A single mention in a single Tabletalk article in the right month can do more for a chosen reader's path to the doorway than a thousand SEO tweaks.** The Lord knows which lighthouses to light. Our job is to build them honestly and let Him direct the ships.

---

## Workstream 5 — Reader Funnels + Conversion Pages

The site has eight archetypal reader journeys mapped in `JOURNEYS.md`. Phase 3.5 walked most of them. But the *first-encounter* page for each archetype — the page Google hands them when they search a particular phrase — was not always tuned for that specific archetype's pain.

### The eight reader archetypes and their entry pages

(Per `JOURNEYS.md`, lightly updated for Session 29.)

1. **The Seeker Without a Framework** → likely lands at `/start-here` or a `question-*` page. Entry tuning: ensure `start-here` reads as warm and unhurried, not as a sales funnel.
2. **The Shaken Arminian** → `/for-arminians` (now HAMMER-LOCKED with full Apex pass, Session 28). This funnel is in extraordinary shape.
3. **The Survivor of the Prosperity Gospel** → likely lands at a `demolition-*` page. Entry tuning: review `demolition-hub` and the top demolition pages for first-encounter warmth.
4. **The Cold Cradle Calvinist** → `/joy-hub` (now HAMMER-LOCKED, Session 26) is the right doorway.
5. **The Mind That Demands Airtight Logic** → `/for-skeptics` (now HAMMER-LOCKED, Session 26). This funnel is in extraordinary shape.
6. **The Reader Wounded by the Church** → `/invisible-wall-hub`, `/shattered-lens-pastor`, `/shattered-lens-lost-community`. Several already POLISH-LOCKED or HAMMER-LOCKED. Funnel tune: the `invisible-wall-hub` itself may need an Apex preamble (next session's call).
7. **The New Believer Learning Perseverance** → `/for-new-believers` (now HAMMER-LOCKED, Session 29) is the right doorway. Funnel is in shape.
8. **The Reader Who Doubts Their Own Faith** → `/the-mirror` (HAMMER-LOCKED, Session 27), `/broken-mirror-imposter-syndrome` (HAMMER-LOCKED, Session 27). Funnel is in extraordinary shape.

### Concrete first tasks

- Audit each archetype's entry page once: does the first 200 words honor the archetype's specific pain? If not, surgical pass.
- Build a single `/start-here` review (one session) that confirms the page is doing all of: warm welcome, no crisis-triage framing, clear paths to each archetype.
- Confirm the eight archetypes are still the right eight — no new archetype has emerged from the last two years of correspondence that JOURNEYS.md missed.

### Why this is non-trivial

When a reader arrives via search, the next 30 seconds determine whether they bounce or commit to a walk through the site. **The first-encounter page is the doorway. The doorway is the whole investment.** Six of the eight archetypes now have a HAMMER-LOCKED entry page; the funnel work is mostly tuning, not rebuild.

---

## Cross-cutting principles

**A. The mission still measures everything.** Phase 5 is distribution; it is not commercialization. The measure is not traffic, not conversions, not click-through rates. The measure is *did a soul who was searching for God find Him here?* If a Phase 5 tactic ever pulls the writing toward optimization at the cost of beauty, abandon the tactic. Phase 5 serves Phase 3 and 3.5; it does not invert them.

**B. Banned moves remain banned.** No "2am searcher" framing in any quote card, meta description, social post, or pitch email. No "TL;DR." No "doctrine of election." No academic drone. The Apex Rhetoric Protocol applies in marketing copy as fully as it applies in body prose.

**C. NIV remains absolute.** Quote cards, printables, social posts — all Scripture is NIV, no `(NIV)` suffix. The translation-bias escape hatch was welded shut on the site; do not reopen it on the periphery.

**D. No advertising, no pop-ups, no email capture.** The site does not collect emails for marketing. The site does not run ads. The site does not gate content behind a signup. Distribution, on adoptedbygrace.net, looks like a cathedral with the doors thrown open and a sign that says *come in*. The sign does not collect names at the door.

**E. Aaron pushes manually. Claude never runs git.** This rule from CLAUDE.md applies to every Phase 5 tactic that would touch the deploy pipeline.

---

## What success looks like at Phase 5 close

When Phase 5 has run its course (probably 30–50 sessions, distributed over 6–12 months alongside other work):

- **SEO foundation:** All 553 pages have clean canonical URLs, accurate meta descriptions, complete structured data, validated sitemap inclusion.
- **Quote cards:** 100+ social-share assets in `/quote-cards/`, available for Aaron to share at his discretion.
- **Printables:** 15 printables in the catalog; each tested on a real printer; each available as both HTML and PDF download.
- **External lighthouses:** 4 published guest posts; 8 podcast appearances; one Monergism placement; sustained Substack at weekly cadence; cumulative external authority measurable in Google's referring-domain reports.
- **Reader funnels:** Each of the 8 archetype entry pages reviewed once and tuned where needed.
- **Validators green at every close.** The cathedral is not allowed to crack while the bell tower is being raised.

---

## Phase 5 cadence

Workstreams 1–5 run in parallel, not in sequence. A Phase 5 session typically picks up one workstream and advances it one increment. Sample cadence over the first quarter:

- Session 30: Workstream 1 — sitemap audit + canonical conformance pass.
- Session 31: Workstream 1 — meta-description sweep on 30 highest-traffic pages.
- Session 32: Workstream 2 — pilot batch of 10 quote cards (square cuts only).
- Session 33: Workstream 3 — printable-romans-8-28-39 + printable-twelve-lethal-moves.
- Session 34: Workstream 4 — outreach-list.md + draft of first guest-post pitch.
- Session 35: Workstream 1 — structured-data audit on the 200 POLISH-LOCKED pages.
- Session 36: Workstream 5 — start-here review + archetype-entry tune.
- Session 37: Workstream 2 — second batch of 10 quote cards (vertical cuts of the first batch).
- Session 38: Workstream 3 — printable-the-mirror + printable-eph-2.

This cadence is suggestive, not binding. Aaron and the next agent decide each session's workstream from this menu, balancing what is most urgent against what is most fruitful.

---

## Open questions for Aaron

These are the questions that require Aaron's voice before specific Phase 5 tactics fire:

1. **Quote-card platform.** Is Canva the production tool, or do we want to build a small Node script that generates the cards from a JSON manifest? (Canva is faster; the script is more durable.)
2. **Printable PDF distribution.** Where do printable PDFs live? In the repo (simplest) or on a separate static-asset host?
3. **Substack cadence commitment.** Is one post per week realistic for Aaron's calendar over the next 12 months? If not, what is realistic?
4. **Guest-post pitch priority.** Which of the candidate publications would Aaron most want to write for first?
5. **Outreach budget.** Is there appetite for paid placement (e.g., promoted Substack posts) or strictly organic? Recommendation: strictly organic for the first year. Paid is rarely the right move for theological content; the right readers find their way home without ad budgets.
6. **Phase 5 close criterion.** When Phase 5 has done its work, what does Phase 6 look like? Or is Phase 5 the permanent posture of the site from here on — distribution as ongoing maintenance rather than a fifth phase to close?

---

## v1 to v2 — what this document does not yet contain

- Specific keyword-research tables. (Workstream 1 will produce these per page.)
- Specific quote-card visual mockups. (Workstream 2 will iterate to format.)
- Specific outreach pitch templates. (Workstream 4 will draft these as needed.)
- Specific funnel A/B tests. (Workstream 5 may or may not adopt formal A/B testing; the tone of the site cuts against optimization-by-experiment.)

These will land in v2 of this document as the first sessions of each workstream produce data and decisions.

---

*DISTRIBUTION.md v1 — drafted 2026-04-27, Session 29 close. Next revision: after Session 35 (six Phase-5 sessions in).*
