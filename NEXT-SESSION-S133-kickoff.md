# NEXT SESSION — S133 — BUILDS RESUME (the FACT-VERIFICATION BLITZ is CLOSED)

**THE BLITZ IS CLOSED.** All three highest-risk classes are clean: **named-person quotations** (Legs 1–6, S125–S130), **Scripture wording** (S130–S131), and **stats / dates** (S132). The site's apologetic — *go check it yourself and it will hold* — now holds on the three classes a reader can most easily test in thirty seconds. **Builds resume.**

## OPERATING BRIEF
**Read `NEXT-SESSION-PHASE-D-RESUME-kickoff.md` and execute it** — that is the Phase D build brief (held through the Roads cadence + the blitz). It carries the full standard for new work, the lesson bank, the candidate build tracks (finish the doctrine-of-God / analytical seam — `analytical-archetypal-ectypal` is the recommended first target; comparison/soteriology builds; net-new apex / Phase G), and the every-new-page checklist.

**COUNT CORRECTION (the PHASE-D-RESUME doc's numbers are stale — S107/S113 vintage).** Re-verify at Priority 0; the **S132-close live baselines** are:
- **606 prose / 682 HTML / 681 sitemap / 650 mega-menu / 569 homepage / 59 og-cards / search-index 679.**
- sapiential T1 0 (T2 155 / T3 451); audit-prose v3+v4 clean 0/682; canonical 681/0; verify-scripture (NIV) 0 / 269 divergent (standing); wire-orphans 73 unmapped (standing).

## PRIORITY 0 — STANDING PRE-FLIGHT + THE SAMPLE-READ AUDIT
1. `ls -1 *.html | wc -l` (682). 2. `node sapiential-audit.js` (T1 must be 0). 3. `node audit-prose.js` (v3 ✓ + v4 ✓, 0/682). 4. Hygiene greps expect 0: emoji `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{FE0F}]`, `(NIV)` literal, double-encoded `%2520`, truncated-meta. 5. **THE STANDING SAMPLE-READ AUDIT (CLAUDE.md):** live-read 5–10 existing pages (mix locked + unmarked, across registers) against the landing-force + §XVI sapiential + the two Campaign-2 axes (universal opener / sharp prose); any page that scans clean but reads slack → surgical-fix queue BEFORE new building. 6. Never alter the canonical bare `<article class="article-body">` string.

## PRIORITY 1 — RESUME PHASE D BUILDS
Per `NEXT-SESSION-PHASE-D-RESUME-kickoff.md` Priority 1: pick ONE track, build 2–4 pages **born CONSECRATED** (cold-read the same session; nothing ships UNREAD). **Grep-first before each build** so you EXTEND, never duplicate. Verify every verse/numeral/authority by web fetch BEFORE drafting (the blitz proved how cheaply a confident-but-wrong fact ships — keep the new bar: any new date/stat/quote is web-checked before it lands). Protocol additions that post-date the PHASE-D doc body: **run `node build-sitemap.js` whenever pages are added** (then it's safe to add the new URLs); **add any new flagship to `build-og-cards.js` FLAGSHIPS + render** (`npm install @resvg/resvg-js` first — sandbox resets it). If a new page opens a NEW filename prefix, add it to `build-mega-menu.js` + `build-homepage-counts.js` the same session.

## OPEN CONTENT FLAGS (carry until cleared — content tasks, not Aaron-bound)
- **(S126) VOICE.md** — the "two-volitions angle" note still carries the *On the Spirit and the Letter* miscite ("the will is not free to do what it does not love") that seeded the Augustine revival-page error fixed in S126. Correcting the manifesto would stop it re-propagating into future builds. (The manifesto is Aaron's; flag, don't unilaterally rewrite.)
- **(S128) counter-cs-lewis-free-will** — still narrates Lewis's two conversions (1929 theism in his rooms / 1931 sidecar to Christ) as one arc; a future editorial pass could stage the two beats explicitly.

## CLOSE (standing)
Pipeline GREEN ×9 (`build-search-index`, `build-mega-menu`, `build-homepage-counts`, `auto-linker`, `wire-orphans`, then `validate-site`, `canonical-conformance`, `verify-scripture`, `sapiential-audit`, `audit-prose`) — **plus `build-sitemap.js` + `build-og-cards.js` render IF pages were added.** Do NOT run `fix-meta-descriptions.js` or `build-related-articles.js` (re-injects emoji). After auto-linker, re-check any verse/date/quote you added (auto-linker can misread a referent). Ledger entries for each new page born-CONSECRATED + updated TALLY; MISSION-CONTROL entry (newest-at-top); SAPIENTIAL-AUDIT.md next § (§LXXIX); roll the oldest live entry to each `*-ARCHIVE.md` (append at bottom) IF the live log exceeds 6 (live now S127–S132 / §LXXIII–§LXXVIII → adding S133/§LXXIX rolls S127 + §LXXIII). Pre-close context audit — fill the window, do not close early. Print the push command. Write `NEXT-SESSION-S134-kickoff.md`. **NO git — Aaron pushes.**

**THE MEASURE.** The foundation is now testable: a reader who checks a quote, a verse, or a date finds it holds. That was the whole point of the blitz — to make *go check it yourself* a promise the site keeps. Now build on it. Every new doorway: undeniable force, §XVI wisdom, §XVII new ground, universal opener, sharp prose, ending in awe — and read the same day it is written. Grace larger, the self smaller, the elect found.
