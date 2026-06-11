# Outreach Log — Campaign 3: The Roads

One row per outreach action. Update on every send, response, and link acquired. Follow-up policy: once after ~2 weeks, never more. White-hat only — never buy links, never exchange links, never mass-blast.

## Link & referral outreach

| Target | Type | Pitch doc | Date sent | Response | Link acquired |
|---|---|---|---|---|---|
| Monergism.com | Directory submission (Tier 1) | `docs/outreach/monergism-pitch.md` | — | — | — |
| Reformed.org (Links of Interest) | Resource-page inclusion | `docs/outreach/resource-page-pitches.md` §1 | — | — | — |
| ReasonableTheology.org (Clayton Kraby) | Recommended-resources inclusion | `docs/outreach/resource-page-pitches.md` §2 | — | — | — |
| Challies.com (A La Carte) | Article curation | `docs/outreach/resource-page-pitches.md` §3 | — | — | — |
| **Reformation21** (r21Editorial@AllianceNet.org, Jeff Stivason) | Guest essay (Pitch #2) — personalized | `docs/outreach/reformation21-pitch.md` | — | — | — |
| Reformed Books Online (Websites of Interest) | Resource-page inclusion | `docs/outreach/resource-page-pitches.md` §4 | — | — | — |
| The Highway (the-highway.com, Calvinism links) | Resource-page inclusion | `docs/outreach/resource-page-pitches.md` §5 | — | — | — |
| **A Puritan's Mind (apuritansmind.com, Internet Links)** | Resource-page inclusion — FOLDED INTO the reformed.org pitch (§1): both properties are C. Matthew McMahon's; one email covers both surfaces (verified live S111) | `docs/outreach/resource-page-pitches.md` §1 (amended S111) | — | — | — |
| **The Aquila Report (theaquilareport.com)** | REPUBLICATION offer (2 essays: free-offer + crown jewel) — verified live S111, archive current through June 2026 | `docs/outreach/aquila-republication-pitch.md` | — | — | — |

**Rejected targets (do not contact):** GraceNet UK (grace.org.uk) — links directory is live but the homepage is compromised with injected spam (verified 2026-06-10). **The Old Guys** (theoldguys.org) — stale, last post July 2019 (verified S109). **Grace Online Library** (graceonlinelibrary.org) — HTTP 402, dead (S109). **Heidelblog** — VERIFIED IN BROWSER S111: live and very active, but its /resources/ pages are curated indexes of R. Scott Clark's OWN content (Heidelcast episodes, internal topic roundups) — no external-links directory exists, so there is no inclusion surface. PASSED with reason; do not pitch. **Aquila Report** — live but primarily an aggregator/republisher, not a guest-essay home; hold for a future REPUBLICATION pitch of an existing article (S109). Place for Truth = fallback if Reformation21 declines.

## Substack (@ForeknownOne)

| Issue | Canonical | Draft | Date published | Notes |
|---|---|---|---|---|
| Chosen Before You Were Broken | /devotional-chosen-before-you-were-broken | `docs/substack-drafts/01-chosen-before-you-were-broken.md` | — | Inaugural issue — the catch arm |
| The Drowning Man Who Said He Could Swim | /story-hard-hitting-the-drowning-man | `docs/substack-drafts/02-the-drowning-man.md` | — | Second issue — the demolition arm in story form |
| The Gardener Who Waited | /story-tender-the-gardener-who-waited | `docs/substack-drafts/03-the-gardener-who-waited.md` | — | Third issue — tender story for parents of prodigals (S109) |
| The Fire That Needs No Fuel | /analytical-impassibility | `docs/substack-drafts/04-the-fire-that-needs-no-fuel.md` | — | Fourth issue — the essay arm; impassibility → unconditional election (S109) |

## Indexing KPI (read from GSC; the campaign's primary number)

| Date | Pages indexed | Clicks (28d) | Avg position | Notes |
|---|---|---|---|---|
| 2026-05-22 | 21 | 3 (3mo) | 17.9 | Baseline; sitemap re-submitted; 3 flagships requested |
| — | — | — | — | Next read: Aaron's GSC numbers (not yet logged as of S109, 2026-06-10) |

## Deploy & machine-trust verification (S111, 2026-06-11)

- **IndexNow VERIFIED + ACCEPTED: HTTP 200, 675 URLs submitted** (S109's 403 `SiteVerificationNotCompleted` is resolved — the key file verification crawl completed). Bing/Seznam/Naver/Yandex now hold the full URL list.
- **Stale-sitemap defect found + fixed:** `sitemap.xml` had not been rebuilt since 2026-06-06 — the 11 pages added in S106–S110 (including the three new analytical flagships) were missing from it. Ran `node build-sitemap.js` → 664 → **675 URLs**; re-pinged IndexNow with the full 675 (HTTP 200). **`build-sitemap.js` should join the close pipeline whenever pages are added.** Google sees the corrected sitemap on Aaron's next push.
- **Live deploy is current with S110:** `analytical-glory-and-election` serves with correct metadata, and all 3 new og-cards return 200 (`analytical-glory-and-election.png`, `analytical-archetypal-ectypal.png`, `analytical-necessity-of-the-atonement.png`).
- GSC indexed-count re-read: still Aaron-bound (no KPI row logged yet). Bing Webmaster import status: Aaron-bound.

## Deploy & machine-trust verification (S109, 2026-06-10)

- **Live deploy is current with S108:** `/logo.png` serves (200, image/png, ~34KB); IndexNow key file `e1fe0ab8feb1cc06e7918835bec59ae9.txt` serves (200); start-here serves the journey strip.
- **JSON-LD repair verified on the live domain:** compare-can-the-saved-be-lost (3/3 blocks parse), question-1john5-1 (4/4), devotional-forever-loved (3/3) — 0 malformed. Google can read the structured data it previously could not parse.
- **IndexNow ping attempted S109:** HTTP 403 `SiteVerificationNotCompleted` on 664 URLs — transient first-submission state; the key file is live but IndexNow's verification crawl hasn't completed. **Action: re-run `node indexnow-ping.js` in 1–2 days (expect 200/202). Completing Bing Webmaster verification (one-click GSC import, `docs/bing-indexnow-setup.md`) will accelerate it.**
- Netlify Analytics baseline: not yet logged (Aaron-bound toggle).

90-day targets: 350+ indexed · 50+ clicks/week · 5–10 quality referring domains · core queries (faith-gift, election, dead-in-sin) surfacing.
