# Google Search Console — Live Findings (2026-05-22)

Read directly from the verified `adoptedbygrace.net` domain property in Search
Console. This is the real data behind "why isn't the site getting traffic."

## The headline numbers (last 3 months)

| Metric | Value | What it means |
|---|---|---|
| Total clicks | **3** | Almost no one is arriving from Google search. |
| Total impressions | **883** | Google *did* show the site ~883 times — so it's not invisible. |
| Average CTR | **0.3%** | Brutal, but expected at this position. |
| Average position | **17.9** | Page 2 of Google. Page 2 gets almost no clicks. |

The story these four numbers tell: the site **ranks, but on page two**, where
traffic rounds to zero. This is the classic young-domain signature — indexed and
surfacing, just not high enough to be seen.

## What the site actually surfaces for

The 883 impressions are spread thin across **66 queries**, and the top ones are
**not** the core message. The highest-impression queries were peripheral:
*"martin luther german monk"* (and many variants) and *"munchausen trilemma"* —
incidental hits on the Luther theologian page and the Münchhausen-trilemma
philosophy page. The **max impressions for any single query was 9.** The
crown-jewel soteriology pages are not surfacing meaningfully yet.

## The deeper problem: indexing

This is the biggest finding. The Page Indexing report:

- **Indexed: 21 pages**
- **Not indexed: 28 pages** — broken down as: 21 "Crawled – currently not
  indexed," 4 "Page with redirect," 2 "Alternate page with proper canonical
  tag," 1 "Not found (404)."

That is **~49 pages known to Google out of 599.** Pages that aren't indexed
**cannot rank for anything** — so roughly 550 of the site's pages are currently
invisible to Google.

Two distinct causes:

1. **Discovery gap.** The Sitemaps report showed the sitemap was *last read
   April 2* — seven weeks stale — and Google had discovered only **265** of the
   599 URLs. Google literally didn't know about ~334 pages.
2. **Crawl/trust gap.** Of what Google does know, the flagship pages show
   **"Discovered – currently not indexed," Last crawl: N/A** — meaning Google
   has not even *crawled* the crown-jewel content yet. On a young, low-authority
   domain, Google rations crawl budget and declines to index pages it hasn't
   been given a reason to trust. The 21 "Crawled – currently not indexed" pages
   are Google saying "I saw it, not convinced it's worth index space yet."

## Actions taken this session (2026-05-22)

1. **Re-submitted the sitemap** in Search Console to force a re-read (it now
   shows submitted today). This should let Google discover all 599 URLs over the
   coming days instead of the stale 265.
2. **Requested indexing** (priority crawl queue) for 3 flagship pages that had
   never been crawled: `/question-faithgift`, `/question-am-i-chosen`,
   `/question-where-did-your-faith-come-from`.

These are nudges, not cures. Request-indexing pushes a page into the crawl queue
but Google still decides whether to index based on perceived quality and
authority. The durable fix is **authority** (see
`backlink-outreach-plan-2026-05.md`).

## What to watch (check GSC monthly)

- **Indexed page count** — should climb from 21 as the re-read sitemap is
  processed and authority grows. This is the single most important number right
  now. Target: get the bulk of the 599 indexed.
- **"Crawled – currently not indexed"** — if this stays high while pages get
  crawled, it confirms the bottleneck is trust/authority, not technical.
- **Average position** — moving from ~18 toward the top 10 is the click unlock.
- **Impressions on core queries** — watch for the faith-gift / election / "dead
  in sin" queries starting to appear, replacing the peripheral Luther/Münchhausen
  ones. That's the sign the right content is surfacing.

## Honest framing

The technical SEO is excellent and the content is deep, but none of that earns
traffic until Google (a) indexes the pages and (b) trusts the domain enough to
rank them on page one. Right now it's done neither at scale. The two levers are
**get indexed** (sitemap freshness — done; internal linking — already strong;
time) and **earn trust** (editorial backlinks — the plan). Everything else is
secondary until those move.
