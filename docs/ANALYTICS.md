# Analytics — adoptedbygrace.net

**Status:** Server-side only. No client-side tracker installed.
**Last verified:** 2026-04-20 (Sprint 7 #49)

---

## What is installed

**Netlify Analytics (server-side).** Netlify observes the request log of the
CDN edge itself — it sees every pageview, every unique visitor, every top
referrer, every country, every 404 — without ever sending a byte of
JavaScript to the reader. There is no cookie, no fingerprint, no third-party
call, and nothing for an ad-blocker to nuke. If someone reads this page,
Netlify knows.

That is the entirety of our analytics stack. It is intentional.

## What is NOT installed

- No Google Analytics (gtag / GA4)
- No Google Tag Manager
- No Plausible, Fathom, Umami, Matomo, Mixpanel, Amplitude, PostHog, Hotjar
- No conversion pixels, no social pixels, no retargeting scripts
- No session replay, no heatmap recorder
- No A/B test framework

## Why

Three reasons, in descending order of importance.

**The mission.** This site exists to reach the elect of God at 2am. The
reader is often in a fragile state. A third-party tracking script is an
uninvited guest we do not owe them. Every line of JavaScript we ship is a
claim we can defend at judgment. Analytics is not a hill to die on.

**The Content Security Policy.** Our `_headers` declares
`connect-src 'self'`, which forbids any outbound XHR / fetch / beacon to
third-party hosts. The browser will refuse to transmit analytics data even
if the script somehow loaded. Installing client analytics would require
widening the CSP, which weakens the whole file.

**Ad-blockers.** 40%+ of desktop traffic in our demographic runs uBlock
Origin. Google Analytics data from Reformed theology readers is already
structurally biased. Server-side counts don't have that hole.

## How to look at the numbers

Netlify dashboard → adoptedbygrace → **Analytics** tab. The toggle is paid
(~$9/site/month as of this writing). When it is on, you see real pageviews,
top pages, top referrers, and bandwidth — the things that matter for
judging which essays are finding the chosen.

## What was removed

Until 2026-04-20, every page carried:

```html
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
```

These were leftover hints from a plan that was never implemented. Because
there was no gtag() call, no GTM container, and no GA measurement ID
anywhere on the site, the hints only served to warm a handshake that was
never used, while silently touching a Google endpoint on every visit.

`strip-dead-analytics-hints.js` removed them from all 533 HTML pages. If
analytics is ever added in future, re-add the hints only on the same commit
as the tracker code.

## Guardrails for future work

- **Do not add a client tracker without discussion.** The default is
  server-side only.
- **Do not widen `connect-src`** beyond `'self'` without re-reading this
  doc.
- **Do not add preconnect / dns-prefetch hints to third-party hosts** unless
  a corresponding script is loading from that host on the same page.

---

> "You know when I sit and when I rise; you perceive my thoughts from
> afar." — Psalm 139:2
>
> The Father who numbers the hairs on the head of every reader does not
> need Google Analytics to find them. Neither do we.
