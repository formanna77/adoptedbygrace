# Netlify Web Analytics Review — 2026-08-09

Window: Jul 10 – Aug 9, 2026 (30 days). Source: Netlify Web Analytics, read live.

**Headline:** 23,361 pageviews, 11,647 unique visitors, 1 GB bandwidth. Three real
malfunctions found and fixed. The 404 index is clean of site paths — every entry in
it is a bot probe. The problem is not that the site is broken. The problem is that
almost nobody is being sent to it.

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
four `410!` rules were below it and had never fired once. Verified live over HTTP
on 2026-08-09 — each returned **200 `application/javascript`**.

This is the exposure class CLAUDE.md was written around after `/CLAUDE.md` and
`/VOICE.md` were found being served. The mechanism this time was subtler: the rules
existed, they were correctly forced, they were simply in a position Netlify never
reaches.

**Why nothing caught it.** CHECK 7 built its allowlist with one whole-file regex.
It asked *"does the text appear?"* and never *"will Netlify reach it?"* Those are
different questions, and the gap between them was on the internet. Worse, the four
rules were almost certainly pasted from the `FIX:` line **CHECK 7 itself prints** —
appended to the end of the file, which is exactly where a suggested fix goes to die.

**Fixed:**
- Rules moved above the catch-all; the catch-all is now documented as necessarily last.
- CHECK 7 now builds `forced` **only from lines above the catch-all**, and reports
  every rule below it as dead. A rule below `/*` is not a weak rule; it is not a rule.
- The printed `FIX:` line now says where to paste it.
- Proven to fail before being trusted: a test rule appended below the catch-all was
  caught and named by line number, then removed.

### 1.2 Every sitemap URL contradicted its own page

Of 685 URLs, the number whose `<lastmod>` agreed with that page's JSON-LD
`dateModified` was **zero**. 457 contradicted outright (`about.html`: sitemap said
2026-07-29, the page said 2026-04-20); the other 228 pages carried no JSON-LD date
at all. 637 URLs shared the single date 2026-07-29.

The cause was a `: TODAY` fallback in `build-sitemap.js`. The hash-reuse idea was
sound, but the eight-script pipeline rewrites every HTML file on every run, so the
hash always differed and every page got stamped with the day the script last ran.
A bulk stamp wearing a freshness signal's clothes. Google discounts `lastmod` from
a sitemap it can prove unreliable, and a site disagreeing with itself on 100% of
URLs is the cleanest possible proof.

**Fixed** — without fabricating a single date, per PRESENTATION INTEGRITY law 11.
`lastmod` is now taken from the page's own JSON-LD `dateModified`, then
`datePublished` (an honest lower bound), then a genuine hash match (an observed
fact), and then **omitted**. `<lastmod>` is optional in the protocol; omitting it
says *unknown*, which is true. Stamping today says *changed today*, which is not.

Result: **639 agree, 0 contradict, 46 honestly omitted.** The date spread went from
one bulk value to a real distribution across March–August.

### 1.3 547 pages were opening a DNS connection to Google Analytics — which is not installed

Every one of 547 pages carried:

```html
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
```

There is no Google Analytics on this site. Zero `gtag('config')` calls, zero GTM
container scripts, nothing. Every reader's browser was resolving a Google tracking
domain on page load for no reason.

This is the **identical fingerprint** CLAUDE.md records for the webfont disaster:
*"340 of those 362 pages carried `preconnect` to fonts.googleapis.com and never
requested a font. An automated performance pass had added connection warm-ups for
a stylesheet that was not there."* Same pass, same residue, different host.

Beyond the wasted round trip, it is a bad look: uBlock, Brave, Pi-hole and NextDNS
all flag `googletagmanager.com`. A site that tracks nobody was tripping tracker
warnings on half its pages.

**Fixed:** stripped from all 547. The `fonts.googleapis.com` and `fonts.gstatic.com`
hints were checked and **left alone** — those are load-bearing (gstatic serves the
font binaries, discovered from the CSS, so no HTML reference to it is expected).
`plausible` and `fathom` also matched the grep and turned out to be ordinary prose
— *"plausible reasons," "fathoms of darkness."* Grep locates; it does not establish.

**All 20 checks pass. Full pipeline re-run after the HTML edits.**

---

## 2. THE 404 INDEX, READ

| Path | Requests | What it is |
|---|---|---|
| `/xmlrpc.php` | 69 | WordPress exploit probe |
| `/` | 48 | see below |
| `/.env.production`, `/.env.backup`, `/.env.development`, `/.env.old`, `/api/.env` | 155 | credential scanners |
| `/.git/HEAD` | 34 | repo-exposure scanner |
| `/.aws/credentials`, `/credentials.json`, `/secrets.json`, `/config.json`, `/api/config` | 131 | credential scanners |
| `/graphql`, `/actuator/env` | 47 | API/Spring Boot probes |

**14 of 15 are hostile automated probes and require no action.** They are internet
background radiation; every public site gets them. All correctly return 404. Nothing
they are looking for exists.

**`/` × 48** was the one entry worth chasing, and it is not a malfunction. Verified
live: `https://adoptedbygrace.net/` returns 200, and `https://www.adoptedbygrace.net/`
correctly 301s to the apex. Nothing in `_redirects` shadows the root — `index.html`
is a real file, and un-forced rules are shadowed by real files. 48 hits over 30 days
(1.6/day) with no referrer is the signature of bots hitting the load balancer by IP
or with an unrecognized `Host` header. Consistent with `75.2.60.5` — a Netlify
load-balancer address — appearing in your *referrer* list, which no real browser sends.

### The finding is what is NOT in that list

**Zero real site paths appear.** No broken internal links, no dead links from the old
`re-formed.netlify.app` domain, no mistyped hrefs anywhere in 611 articles, no missing
assets. CHECK 1 agrees. The link graph is genuinely intact — that is a real result and
it is worth stating plainly.

---

## 3. WHAT IS WORKING

- **Volume is real.** 23,361 pageviews and 11,647 uniques in 30 days is not nothing.
- **The right country is first.** United States 9,584 (41%).
- **Bandwidth is sane.** 1 GB/month, peak 124.8 MB/day. No runaway asset.
- **Technically clean.** 20/20 checks. 685 sitemap URLs, all resolving. `robots.txt`
  open. Fonts delivered everywhere. All heavy JS off the critical path. Search index
  loads on demand.
- **The infrastructure is not the bottleneck.** Nothing below is caused by a defect.

---

## 4. WHAT IS NOT WORKING

### 4.1 The site is effectively invisible in search

**109 Google referrals in 30 days. Across 611 articles.** Bing 8. DuckDuckGo 7.

And there is not one referring website in the entire sources list — only search
engines and one bare IP. Nothing on the internet links to adoptedbygrace.net. That
is the root cause: search rankings are largely a function of external links, and the
site has effectively none. The content is not the problem; the isolation is.

### 4.2 Roughly half the month's traffic is crawler-shaped

Reconstructed from the daily charts (pixel-derived, ±5%):

| Window | Pageviews | Pages per visitor |
|---|---|---|
| Jul 14–21 | ~11,400 (49% of month) | ~1.2 |
| Jul 22 – Aug 9 | ~9,600 | ~1.5, with days at 2.7–4.0 |

An eight-day burst carried half the month at barely more than one page per visitor,
then collapsed. Supporting signals: **Singapore is the #2 country at 3,325 pageviews
(14%)** — ahead of Canada and the UK, and one of the densest datacenter and VPN
regions on earth; a Netlify load-balancer IP appears as a referrer; and 79% of all
traffic reports no referrer at all.

Singapore does have a genuine Reformed community, so this is not certain. But the
shape — huge unique count, one page each, eight days, then gone — is a scraper, not
a readership.

### 4.3 Below the top four pages, the corpus is invisible

| Page | Pageviews |
|---|---|
| `/scripture-tsunami` | 2,362 |
| `/story-historical-luther-storm` | 2,064 |
| `/` | 1,518 |
| `/demolition-1tim2-4` | 220 |
| everything else | ≤ 157 |

The top 15 pages hold 7,140 of 23,361 pageviews. There are 611 articles. The cliff
between #3 and #4 is a factor of seven.

One detail worth sitting with: `/story-historical-luther-storm` has **10** inbound
internal links and gets 2,064 pageviews. `/demolition-1tim2-4` has **52** and gets
220. Internal linking is not what is moving traffic. Something external is — and
with only 109 Google referrals site-wide, it is not search either.

### 4.4 You cannot tell a reader from a scraper with the data you have

This is the deepest problem, and it is a measurement gap, not a site defect. Netlify
Web Analytics is server-log based. It has **no bot filtering, no session tracking, no
scroll depth, no query data, and no way to know whether anyone read a word.** Every
question that actually matters for the mission — *did a person find this, and did it
hold them?* — is unanswerable from this dashboard. The two biggest pages on the site
cannot be explained, and that will stay true no matter how long the dashboard is stared at.

---

## 5. RECOMMENDED NEXT STEPS, IN ORDER

1. **Connect Google Search Console.** Free, no JavaScript, zero page weight, no
   privacy cost. It answers what Netlify structurally cannot: which queries surface
   the site, at what position, how many impressions convert to clicks, and which of
   the 685 submitted URLs Google has actually indexed versus silently dropped. If
   only 200 of 685 pages are indexed, that is the whole story and it is invisible today.
   Add Bing Webmaster Tools at the same time — it also feeds DuckDuckGo.

2. **Then re-read this review.** Search Console will confirm or kill section 4.2 in a
   single day. Everything downstream depends on knowing which half of the traffic is human.

3. **Address the isolation, not the corpus.** 611 excellent articles and zero inbound
   links is the actual bottleneck. No amount of further writing changes it.

4. **Leave the 404 list alone.** It is bot noise and it will never stop. Rechecking it
   monthly for the appearance of a *real* site path is the only maintenance it needs —
   that would mean a broken link, and today there are none.

---

## FILES CHANGED

| File | Change |
|---|---|
| `_redirects` | four dead rules moved above the catch-all; catch-all documented as last |
| `validate-site.js` | CHECK 7 gains a dead-rule pass; allowlist built only from above the catch-all; `FIX:` line corrected |
| `build-sitemap.js` | `lastmod` derived from JSON-LD, never invented; omitted when unknown |
| `sitemap.xml` | regenerated — 639 agree, 0 contradict, 46 omitted |
| 547 `.html` pages | dead `googletagmanager` dns-prefetch removed |

Full eight-script pipeline re-run. `node validate-site.js` → **ALL 20 CHECKS PASSED**.
