# Analytics Review — Netlify + Google Search Console — 2026-08-09

Windows: Netlify Web Analytics, Jul 10 – Aug 9 (30 days). Google Search Console,
May 8 – Aug 9 (90 days). Both read live.

**Headline:** four malfunctions found and fixed. But the important discovery was not
a defect — it was that Search Console has been connected since May and nobody had
read it. It says something the Netlify dashboard structurally cannot: Google is not
ignoring this site. **Google is ranking it on page 4, and every query that surfaces
it is biographical, not doctrinal.**

---

## 1. MALFUNCTIONS FOUND AND FIXED

### 1.1 Four internal build scripts were live on the public internet

`_redirects` ended like this:

```
/*  /404.html  404
/strip-internal-markers.js   /404.html   410!
/fix-orphaned-cards.js       /404.html   410!
/fix-stray-progress-bar.js   /404.html   410!
/fix-jsonld-answers.js       /404.html   410!
```

Netlify takes the **first** matching rule and stops. `/*` matches everything. All
four `410!` rules were below it and had never fired once. Verified live over HTTP —
each returned **200 `application/javascript`**.

**Why nothing caught it.** CHECK 7 built its allowlist with one whole-file regex. It
asked *"does the text appear?"* and never *"will Netlify reach it?"* Worse, the four
rules were almost certainly pasted from the `FIX:` line **CHECK 7 itself prints** —
appended to the end of the file, which is exactly where a suggested fix goes to die.

**Fixed:** rules moved above the catch-all; CHECK 7 now builds `forced` only from
lines above it and reports every rule below as dead; the printed `FIX:` line says
where to paste. Proven to fail before being trusted.

### 1.2 Every sitemap URL contradicted its own page

Of 685 URLs, the number whose `<lastmod>` agreed with that page's JSON-LD
`dateModified` was **zero**. 457 contradicted outright (`about.html`: sitemap said
2026-07-29, the page said 2026-04-20); 228 pages carried no JSON-LD date at all.
637 URLs shared one date.

The cause was a `: TODAY` fallback in `build-sitemap.js`. The hash-reuse idea was
sound, but the pipeline rewrites every HTML file on every run, so the hash always
differed and every page got stamped with the day the script last ran.

**This one had a measurable consequence** — see §3.4. Google last read the sitemap
on **May 25**, eleven weeks ago.

**Fixed** without fabricating a date, per PRESENTATION INTEGRITY law 11. `lastmod`
now comes from the page's own JSON-LD `dateModified`, then `datePublished` (an
honest lower bound), then a genuine hash match, then **omitted**. Omitting says
*unknown*, which is true. Stamping today says *changed today*, which is not.
Result: **639 agree, 0 contradict, 46 honestly omitted.**

### 1.3 547 pages opened a DNS connection to Google Analytics — which is not installed

Every one of 547 pages carried `<link rel="dns-prefetch" href="https://www.googletagmanager.com">`.
There is no GA on this site: zero `gtag('config')` calls, zero GTM containers.

Identical fingerprint to the webfont disaster in CLAUDE.md — *"340 pages carried
`preconnect` to fonts.googleapis.com and never requested a font."* Same automated
pass, same residue, different host. Beyond the wasted round trip, uBlock, Brave,
Pi-hole and NextDNS all flag `googletagmanager.com`: a site that tracks nobody was
tripping tracker warnings on half its pages.

**Fixed:** stripped from all 547. The `fonts.googleapis.com` and `fonts.gstatic.com`
hints were checked and **left alone** — gstatic serves the font binaries, discovered
from the CSS, so no HTML reference to it is expected. `plausible` and `fathom` also
matched the grep and turned out to be prose — *"plausible reasons," "fathoms of
darkness."* Grep locates; it does not establish.

### 1.4 Thirteen dead URLs Google is still crawling — and a concept resolving two ways

Search Console's *Not found (404)* report named 13 URLs Google keeps trying. **None
appear in Netlify's top-15 404 list** (too low-volume to surface) and none are
reachable from the site, so CHECK 1 cannot see them either. They are fossils of
ELIMINATED FEATURES: six `resources-*` external-link pages, the newsletter, a
community page, a scratch index, and three deleted articles.

A 404 discards whatever authority Google still assigns them. All 13 now 301 to their
genuine successor — the six library pages to `/reformed-sources`, the reader-facing
library of 113 works that did not exist when they were deleted.

While wiring them, a second defect surfaced: `/resources-catechisms` redirected to
`/start-here.html` while `/resources-catechisms.html` was about to go to
`/reformed-sources`. **The same concept resolving to two destinations is a signal
crawlers punish.** All extensionless/`.html` pairs were retargeted to agree, and a
check now confirms it: *every pair agrees, 218 rules.*

**All 20 checks pass. Full pipeline re-run.**

---

## 2. THE NETLIFY 404 INDEX, READ

| Path | Requests | What it is |
|---|---|---|
| `/xmlrpc.php` | 69 | WordPress exploit probe |
| `/` | 48 | see below |
| `.env` family (5 paths) | 155 | credential scanners |
| `/.git/HEAD` | 34 | repo-exposure scanner |
| credential/config family (5 paths) | 131 | credential scanners |
| `/graphql`, `/actuator/env` | 47 | API / Spring Boot probes |

**14 of 15 are hostile automated probes needing no action.** All correctly return
404. Nothing they seek exists.

**`/` × 48** is not a malfunction. Verified live: the apex returns 200 and `www`
301s to it correctly. `index.html` is a real file, and un-forced rules are shadowed
by real files, so nothing in `_redirects` can shadow the root. 1.6 hits/day with no
referrer is bots hitting the load balancer by IP or with an unrecognized `Host`
header — consistent with `75.2.60.5`, a Netlify load-balancer address, appearing in
the *referrer* list, which no real browser sends.

**The finding is what is absent: zero real site paths.** No broken internal links,
no dead links from the old `re-formed.netlify.app` domain. The link graph is intact.

---

## 3. WHAT SEARCH CONSOLE SAYS — the part Netlify cannot see

The property (`sc-domain:adoptedbygrace.net`) has been verified and collecting since
early May. No setup was needed. Nobody had opened it.

### 3.1 The site ranks on page 4

| Metric | 90 days |
|---|---|
| Total clicks | **18** |
| Total impressions | **4,100** |
| Average CTR | 0.4% |
| **Average position** | **32.3** |

This reframes everything. Google is *not* ignoring the site — it surfaced these
pages 4,100 times. It surfaced them at **position 32**, which is page four, which
nobody reaches. And 0.4% CTR is roughly *normal* for position 32: the titles and
descriptions are not the problem. The position is the only problem.

The gap between 23,361 Netlify pageviews and 18 Google clicks also settles a question
from §4.2 below: organic search accounts for well under 0.1% of the traffic on this
site.

### 3.2 Only 41% of the corpus is indexed

**280 indexed. 269 not indexed.** Of the 685 submitted URLs, Google has stored fewer
than half. The reasons:

| Reason | Pages |
|---|---|
| Crawled – currently not indexed | **213** |
| Alternate page with proper canonical tag | 33 |
| Not found (404) | 13 → fixed, §1.4 |
| Page with redirect | 6 |
| Duplicate without user-selected canonical | 4 |

**"Crawled – currently not indexed" is the one that matters.** It is not an error and
there is no bug to fix. It is Google saying *I fetched this page and decided it was
not worth storing.* On 213 pages. That is a verdict about perceived authority, not
about prose quality — and authority is the thing the site has none of.

### 3.3 Every query that finds this site is biographical

Top impression drivers, 90 days (617 queries total):

| Query | Impressions | Clicks |
|---|---|---|
| luther monk | 39 | 0 |
| charles spurgeon | 34 | 0 |
| martin luther the monk | 34 | 0 |
| john owen jones | 30 | 0 |
| monk martin luther | 27 | 0 |
| martin luther german monk | 26 | 0 |
| martin luther priest | 23 | 0 |
| john owen the death of christ | 23 | 0 |

Not one doctrinal query. Not *unconditional election*, not *irresistible grace*, not
*does God choose who is saved*. 611 articles arguing the doctrines of grace, and the
search demand actually touching them is people looking up **who Martin Luther was**.

The pages that earned the 18 clicks say the same thing: `demolition-hub` (2), then
one each for `theologian-boston`, `theologian-anselm`, `theologian-bradwardine`,
`theologian-augustine`, `theologian-bunyan`, `history-apostolic`,
`demolition-acts17-30`, `objection-manipulation`. **Five of the nine are theologian
biographies.**

This confirms, from Google's own data, the inference drawn from the Netlify numbers
before Search Console was opened: `/story-historical-luther-storm` pulls 2,064
pageviews on **10** inbound internal links while `/demolition-1tim2-4` pulls 220 on
**52**. Internal linking was never what moved it. "luther monk" was.

### 3.4 The sitemap has not been read in eleven weeks

Submitted May 22. **Last read May 25, 2026.** Status *Success*, 657 pages discovered.

Every page written, rewritten, and repaired since May 25 has been invisible to that
channel. The uniform-`lastmod` defect fixed in §1.2 is the most likely cause: a
sitemap that claims one date for 637 URLs, and contradicts its own pages on all of
them, gives a crawler no reason to come back.

---

## 4. WHAT IS WORKING

- **Technically clean.** 20/20 checks. Zero broken internal links. Fonts delivered
  everywhere. All heavy JS off the critical path. Search index loads on demand.
- **Google's crawler is not blocked or confused.** 4,100 impressions and 280 indexed
  pages mean the technical SEO floor is sound. Nothing below is caused by a defect.
- **The narrative and biographical pages genuinely work.** They are the only doorway
  the site currently has, and they opened without anyone trying.
- **Volume and bandwidth are healthy.** 23,361 pageviews, 1 GB, no runaway asset.

---

## 5. WHAT IS NOT WORKING

### 5.1 Position 32 is an authority problem, not a content problem

Nothing in the Search Console data suggests the pages are badly built. They are
indexed, crawled, rendered, and shown. They lose on ranking, and ranking at this
distance is overwhelmingly a function of external links. **The Netlify sources list
contains no referring website at all** — only search engines and one bare IP.
Nothing on the internet links here.

611 more articles will not move position 32. This is the bottleneck, and writing is
not the lever that moves it.

### 5.2 The site answers questions nobody is typing

The corpus is organized by theological proposition — `demolition-1tim2-4`,
`systematic-reprobation`, `question-predestined-to-hell`. Those are the categories a
Reformed theologian uses. The 617 real queries are things like *luther monk*.

This is not an argument for writing worse pages. It is the observation that the
doorways Google is already offering — Luther, Spurgeon, Owen, Augustine, Anselm,
Bradwardine, Bunyan — are being offered to people who came for a history lesson.
That is not a compromise of the mission; it is the mission's best available on-ramp.
Someone searching *martin luther german monk* is one click from the storm at
Stotternheim, and one page from why a terrified man could not save himself.

### 5.3 Roughly half of July's traffic was crawler-shaped

Reconstructed from the daily charts (pixel-derived, ±5%):

| Window | Pageviews | Pages per visitor |
|---|---|---|
| Jul 14–21 | ~11,400 (49% of month) | ~1.2 |
| Jul 22 – Aug 9 | ~9,600 | ~1.5, with days at 2.7–4.0 |

An eight-day burst carried half the month at barely more than one page per visitor,
then collapsed. Singapore is the #2 country at 3,325 pageviews (14%), ahead of Canada
and the UK. A Netlify load-balancer IP appears as a referrer. 79% of traffic reports
no referrer at all — and now we know only 18 of those visits came from Google.

Singapore does have a genuine Reformed community, so this is not certain. But the
shape — huge unique count, one page each, eight days, gone — is a scraper.

---

## 6. NEXT STEPS, IN ORDER

1. **Push.** The sitemap fix, the 13 redirects and the four blocked scripts are all
   on disk only. Until the deploy runs, the build scripts are still public.
2. **Re-submit `sitemap.xml` in Search Console** *after* the deploy — not before, or
   Google re-reads the broken one. This forces the first read since May 25.
3. **Watch *Pages → Crawled, currently not indexed*.** If the corrected `lastmod` and
   a fresh read pull that 213 down, the sitemap defect was the cause. If it holds
   flat, the cause is authority, and only §5.1 moves it.
4. **Treat the theologian and history pages as the front door.** They are the only
   pages with demonstrated search demand. Every one of them should carry its best
   link into the doctrinal core.
5. **Leave the Netlify 404 list alone.** It is bot noise and always will be. The only
   maintenance it needs is a monthly check for a *real* site path appearing.

---

## FILES CHANGED

| File | Change |
|---|---|
| `_redirects` | 4 dead rules moved above the catch-all; 13 Search-Console 404s redirected to their successors; `resources-*` pairs harmonized to `/reformed-sources` |
| `validate-site.js` | CHECK 7 gains a dead-rule pass; allowlist built only from above the catch-all; `FIX:` line corrected |
| `build-sitemap.js` | `lastmod` derived from JSON-LD, never invented; omitted when unknown |
| `sitemap.xml` | regenerated — 639 agree, 0 contradict, 46 omitted |
| 547 `.html` pages | dead `googletagmanager` dns-prefetch removed |

Full eight-script pipeline re-run. `node validate-site.js` → **ALL 20 CHECKS PASSED**.
