# Deep Site Audit — adoptedbygrace.net
**Date:** 2026-07-21 · **Scope:** all ~687 HTML pages, build/index artifacts, `_redirects`, live HTTP behavior

This audit went beyond `validate-site.js` (which passes all 9 checks) to test the things the validator and prose scanner do **not** catch: live public exposure, cross-page anchors, index/stat drift, footer drift, and emoji ranges. Findings are ordered by severity. Counts are false-positive-filtered.

---

## STATUS — fixes applied 2026-07-21

- **P1 (footers) — FIXED in repo.** Removed all empty `<li></li>` bullets (16 pages) and the dead `#search` link (8 pages; removed the whole `<li>`, since the canonical footer has no Search link and search lives in the nav toggle on every page).
- **P2 (anchor + counts) — FIXED in repo.** `index.html` tile now points to `/questions#demolishing-the-objections`; `questions.html` subtitle corrected 75→82 (matches the hero stat + 5 other references); `stories.html` meta corrected 29→34 (matches hero stat + 34 listed works).
- Ran the full 7-script build pipeline + `build-sitemap.js`; `node validate-site.js` passes all 9 checks.
- **P0 (VOICE.md) — STILL OPEN. Requires a deploy (push).** The repo fix is already in place; the leak closes only when the live site redeploys. Nothing to edit.
- P3 items left as-is (style/cosmetic judgment calls).

---

## P0 — CRITICAL: VOICE.md is publicly served right now

`https://adoptedbygrace.net/VOICE.md` returns the **complete 640-line style bible** over HTTP as `text/markdown` (75 KB confirmed live). That document contains §II "The Twelve Lethal Moves" and §XXII's line *"I don't want anyone who reads this website to know an artificial intelligence wrote it."* A searcher who finds it stops weighing Romans 9. This is the exact incident CLAUDE.md Integrity Law 6 was written to prevent.

**Diagnosis (verified, not assumed):**
- `/CLAUDE.md`, `/MISSION-CONTROL.md`, `/REFORMED-SOURCES-INDEX.md` are all correctly **blocked** live (return the 410/404 page). Only `/VOICE.md` leaks. So this is **not** a general stale deploy.
- The local `_redirects` **does** contain the correct forced rule: `/VOICE.md  /404.html  410!` (line 177), identical in form to the working `/CLAUDE.md` rule. `validate-site.js` CHECK 7 passes.
- Therefore the blocking rule exists in the repo but the **live deploy predates it** — the fix is committed/pending but has not reached Netlify. (`.git/COMMIT_EDITMSG` shows a commit at 17:40 today; `_redirects` was edited 13:01 today.)

**Fix:** Deploy the current `_redirects`. Nothing to edit — the rule is already correct locally. This requires a push (per git policy, Aaron pushes manually). After deploy, re-verify:
```
curl -sI https://adoptedbygrace.net/VOICE.md   # expect 410, not 200 text/markdown
```

---

## P1 — 15 pages carry a stale legacy footer (broken UI, live)

These pages render **empty bullet points** (leftover `<li></li>` from removed "Resources"/newsletter links) and, on 8 of them, a **dead `href="#search"` link** — there is no `id="search"` anywhere on the site, so the link is a no-op. Confirmed live on `/stories` (the footer shows bare `-` bullets under "Resources" and "Connect", plus `[Search](#search)`).

The other ~671 pages use the current canonical footer (`Truth` / `Explore` / `Connect` columns with working links). These 15 simply never got updated.

**All 15 (identified by the legacy `<h4>Resources</h4>` block):**
```
anxious-mind-brain-decides.html          philosophy-exclusive-love.html
anxious-mind-fear-of-hell.html           philosophy-marriage-election.html
anxious-mind-never-meant-to-carry.html   philosophy-phantom-limb-free-will.html
broken-mirror-not-self-made.html         philosophy-problem-of-merit.html
invisible-wall-prayer-feels-empty.html   psychology-hub.html
pastoral-hub.html                        psychology-why-we-resist.html
shattered-lens-bible-doesnt-make-sense.html   shattered-lens-lost-community.html
stories.html
```
(`explore-map.html` and `question-ezekiel37.html` also have an empty `<li></li>` but a slightly different footer — check them too.)

**Fix:** Replace the footer block on these pages with the canonical footer (copy from any good page, e.g. `about.html`). The required `footer-grace-warning` block is already present on all of them, so only the column links need swapping.

---

## P2 — Broken anchor + count contradictions

**1. Dead jump-link from the homepage.** `index.html` (line 355) links to `/questions#objections`, but `questions.html` has no `id="objections"` — the actual heading id is `demolishing-the-objections`. Clicking the homepage tile lands on the page but never scrolls to the section.
*Fix:* change the href to `/questions#demolishing-the-objections`, or add `id="objections"` to that `<h2>`.

**2. Count claims disagree between SEO meta and the visible page** on at least two hubs — a Google snippet will show one number, the page another:
- `questions.html`: meta/title/OG/Twitter say **"82 investigations"** (5 places); the visible `hub-subtitle` says **"75 investigations"** (line 182).
- `stories.html`: meta/OG/Twitter say **"29 original works"**; the visible hero stat says **"34 Works"** (and 34 cards are listed).

*Fix:* Pick the true number for each and reconcile every occurrence. Worth a quick grep across all hubs for other stat/meta drift, since this pattern recurs whenever cards are added without updating the meta.

---

## P3 — Minor / notes (not breakage)

- **`search-index.js` is 9.6 MB** and loads via a blocking `<script src>` — but **only on `/search`**, not site-wide (correct scoping). Still heavy for a mobile visitor to that one page; consider `defer`, lazy-load on first keystroke, or a slimmer index.
- **Raw Greek/Hebrew** appears on ~theologian and word-study pages (e.g. `ἕλκω`, `μεταμορφοῦσθε`, `πᾶς`) where VOICE §XV prefers transliterated + italic. The site's own `detect-structural-rot.js` flags ~dozens as "secondary findings." Style, not a bug.
- **Favicon references use 5 different forms** across pages (`./favicon.svg`, `/favicon.svg`, `/favicon.ico`, `/favicon.png`, `favicon.svg`). All target files exist, so this is cosmetic inconsistency only — standardize if desired.
- **Odd-hour references** (VOICE §II bans manufactured 2am/3am crisis scenes) appear on ~3 pages, but they sit on anxiety-topic pages where insomnia is the literal subject (e.g. `anxious-mind-brain-decides.html`: "awake at 3 AM… what insomnia whispers") or a deliberate literary frame (`dialogue-arminian-pastor…` "2:07 AM"). Likely defensible — flagged only for a cold-read judgment call, not an automatic fix.

---

## Verified CLEAN (no action needed)

- `validate-site.js`: all 9 checks pass (links, orphans, structure, inline-style allowlist, canonical format, CSS braces, internal-file blocking, hero classes, duplicate titles).
- **0** broken internal page links; **0** broken images, CSS/JS assets, or PDF deep-links (all `%20`-encoded Reformed Sources links resolve).
- **0** actual emojis. 634 files contain typographic arrows (`→ ← ↑ ↓ ↻`) — all outside the banned emoji ranges (U+1F300+, U+2600–U+27BF, U+FE0F, flags). The ban holds.
- **0** duplicate element IDs; **0** pages missing `<meta name="description">`; all 686 descriptions unique.
- **0** pages missing `global.css`, `nav.js`, or the `footer-grace-warning` block.
- **0** real structural rot (mis-nesting / stray nodes / escaped article wrappers).
- `robots.txt` correct and points to the sitemap; `sitemap.xml` has 685 URLs and **0** pointing at missing files; `tags.json` regenerated today, 608 pages (7 utility pages excluded intentionally via `SKIP`).
- `_redirects`: 106 forced `410!` rules; `CLAUDE.md`, `MISSION-CONTROL*`, `SAPIENTIAL-AUDIT*` all correctly pinned.
- No mixed-content (`http://`) links, no `localhost` refs, no stub/placeholder/TODO text.
- External links go only to reputable hosts (Google Fonts, Google Tag Manager, PayPal, Substack, X, Bible Gateway).

---

### Suggested order of operations
1. **Deploy** to close the VOICE.md leak (P0) — highest urgency, and it needs a push regardless of anything else.
2. Swap the 15 legacy footers (P1).
3. Fix the `#objections` anchor and reconcile the two count contradictions (P2).
4. Run the 7-script build pipeline + `node validate-site.js` after edits.
