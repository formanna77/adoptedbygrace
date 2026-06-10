# Bing Webmaster Tools + IndexNow — Setup

**Built:** 2026-06-10 (S108, Campaign 3 Lane 1d). Bing/DuckDuckGo index young domains faster than Google and feed the AI answer engines — which increasingly are the 90-second searcher's first stop.

## What is already wired (no account needed — ships with the next push)

1. **IndexNow key file** — `e1fe0ab8feb1cc06e7918835bec59ae9.txt` now sits at the repo root and will serve at `https://adoptedbygrace.net/e1fe0ab8feb1cc06e7918835bec59ae9.txt`. IndexNow keys are self-issued; this is all the "verification" the protocol needs.
2. **Ping script** — `indexnow-ping.js` (repo root, dependency-free Node). It reads `sitemap.xml` and submits all ~664 URLs to `api.indexnow.org` in one POST, which propagates to Bing, Seznam, Naver, and Yandex.

## What Aaron must do (account-bound, ~10 minutes total)

### 1. Run the IndexNow ping — after the next deploy

The key file must be live before the ping, so after pushing this session's work:

```
cd ~/Documents/adoptedbygracewebsite && node indexnow-ping.js
```

Expected output: `HTTP 200` or `202`. Re-run it whenever a batch of new pages ships (one POST per deploy is plenty; engines throttle repeat submissions of unchanged URLs on their own).

### 2. Bing Webmaster Tools — verify via GSC import (the one-click path)

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters) and sign in (any Microsoft, Google, or Facebook account).
2. Choose **"Import from Google Search Console"** — since `adoptedbygrace.net` is already verified in GSC, Bing imports the site, the verification, AND the sitemap in one step. No DNS records, no meta tags.
3. Confirm `sitemap.xml` shows under **Sitemaps** after import; submit it manually if not (`https://adoptedbygrace.net/sitemap.xml`).

Once verified, Bing's **URL Submission** tool also accepts up to 10,000 URLs/day for sites verified through IndexNow — far more generous than Google's quota.

### 3. Optional, later: automate the ping per deploy

Netlify has no first-party IndexNow integration; if pinging after each push becomes a chore, the options are a `netlify.toml` build hook that runs `node indexnow-ping.js` post-build, or a GitHub Action on push. Not worth wiring until the manual cadence proves annoying — the site deploys infrequently and one manual ping per deploy is fine.

## What to watch

- **Bing Webmaster Tools → Site Explorer / Index** — indexed-page count. Bing typically indexes a clean static site within days of an IndexNow submit, not months.
- **DuckDuckGo** uses Bing's index; **ChatGPT/Copilot-style answer engines** draw heavily on Bing — indexing here is how the site starts surfacing in AI answers.
- Log milestones in `docs/outreach-log.md`.
