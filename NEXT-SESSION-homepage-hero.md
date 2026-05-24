# NEXT SESSION — Homepage Hero Engagement Refactor

## CONTEXT
Aaron asked whether the main landing homepage (`index.html`) is the best design to engage people *the moment they arrive*. Prior-session audit verdict: **excellent as a hub/directory, but the first three seconds have three fixable weaknesses for a cold, possibly-resistant arrival.** This session executes the fix.

## READ FIRST
- `/Users/aaronforman/Documents/adoptedbygracewebsite/CLAUDE.md` — the manifesto. Especially: Crown Jewel ("Never lead with the accusation. Always lead with the question."), the Two Arms, and benchmarking gap #1 ("the on-ramp for the 90-second searcher — density is a wall").
- `index.html` lines 225–263 — the current hero ("Command Center", rebuilt 2026-04-19).
- `docs/peer-site-benchmarking-2026-05.md` — the on-ramp gap.
- `VOICE.md` — prose register before writing any new hero copy.

## THE THREE DIAGNOSED WEAKNESSES
1. **Asserts before it disarms.** Current tagline ("You were chosen before the foundation of the world — and every argument against that truth collapses under the weight of Scripture") swings the hammer in second one. Violates the Crown Jewel rule for the resistant reader. Lead with the question, not the verdict.
2. **Three co-equal CTAs split focus** (Start Here / Best Reads / 60-Second Case). A landing page needs one dominant action. The 60-Second Case is the best low-commitment cold on-ramp and likely deserves primary weight.
3. **No arresting prose between hero and catalog.** Below the fold is tile-after-tile (≈22 + 9 + 8 + 6 + 12 + 18 cards) — a filing cabinet with no single beautiful, heart-catching moment to stop the scroll before the mind gets a map.

## PRIORITY 0 — SAMPLE-READ AUDIT (mandatory open)
Live-read 5–10 pages (half locked, half unmarked) against the landing-force test before any build. Queue failures for surgical fix.

## THE WORK (this session)
1. **Draft 2–3 alternative hero treatments** for Aaron to choose from. Each must: (a) open question-led / disarming, not accusatory; (b) carry one dominant CTA (test the 60-Second Case as primary, Start Here secondary); (c) preserve the gold/starfield identity and the rotating-scripture supporting role.
2. **Add a disarming prose-bridge** (~3–4 sentences) between the hero and the `content-explorer` grid — leads with "Where did your faith come from?" energy, melts resistance, hands the reader into the catalog instead of dumping them into it. Two-arms compliant (tender catch present).
3. Implement Aaron's chosen direction. **Write, don't Edit** the hero block to preserve persuasive cohesion. No inline `<style>` (index.html is a permitted interactive-widget exception, but keep new hero styling in `/css/home.css` or `/global.css`).
4. Verify every `href` exists before writing it (hyperlinking mandate). Run the 5 build scripts + `node validate-site.js`.

## NON-NEGOTIABLES
- NIV 2011 only; no "(NIV)" tags; translation transparency per CLAUDE.md when leaning on the Greek.
- No git commands — Aaron pushes manually. End with a copy-paste push command + the next kickoff prompt.
- Don't touch the catalog sections unless a tile is broken — the hub is strong; this is a top-of-page engagement fix.

## PUSH COMMAND (after Aaron approves)
```
cd ~/Documents/adoptedbygracewebsite && git add -A && git commit -m "Homepage hero: question-led disarming refactor + prose-bridge for cold arrivals" && git push
```
