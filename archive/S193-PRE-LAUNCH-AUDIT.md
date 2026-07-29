# S193 PRE-LAUNCH AUDIT — findings before kickoff
**Run 2026-07-28. Every finding below was verified, not inferred.**

`node validate-site.js` passes all 10 checks. Everything here is **scanner-invisible** — the validator was never built to catch it.

---

## P0-A — THE ANONYMIZATION IS INCOMPLETE. THE TESTIMONY IS STILL LIVE.

`/RE-FORMED.pdf` — 113 KB, repo root, **no rule in `_redirects`** — is served publicly right now at `https://adoptedbygrace.net/RE-FORMED.pdf`. Extracted text, first page:

> `RE-FORMED — Testimony of Aaron Forman`
> *"At eighteen, the spiritual framework of my childhood collapsed…"*

The 2026-06-30 anonymization deleted `essays/re-formed.html` (confirmed gone) and struck the byline. **It never removed the PDF.** The file is unlinked and absent from the sitemap, so nothing crawls to it — but it is directly reachable by anyone who guesses or finds the URL, and `_redirects` line for `re-formed.netlify.app` preserves the trail.

`/fleet-deploy.command` is also public and contains `cd /Users/aaronforman/Documents/adoptedbygracewebsite` — the real name, in a filesystem path, served as plain text.

**Fix:** delete `RE-FORMED.pdf` and `fleet-deploy.command`, and add forced rules anyway.

---

## P0-B — CHECK 7 HAS EXTENSION BLIND SPOTS. 28 MB OF INTERNALS ARE PUBLIC.

`validate-site.js` CHECK 7 gates only four extensions: `.md`, `.js`, `.txt`, `.json`. Everything else at root falls straight through. **27 files, 28 MB, publicly served:**

| What | Why it matters |
|---|---|
| 6 × `deploy-*.zip` (28 MB) | Full Netlify deploy archives sitting in the publish root |
| 8 × `.backup` / `.forge-backup` HTML | Pre-edit versions of live pages — the drafts, readable |
| 4 × internal audit `.csv` | `ISSUES_DETAILED`, `DIAMOND-WEEK-AUDIT-DATA`, `BRIDGE-PAGES-DETAILED`, `SEO-AUDIT` |
| 3 × `broken-links-*.tsv`, `audit-run.log`, `__scan_results.jsonl` | Internal QA output |
| 2 × `.py`, 1 × `.command` | Build scripts, one leaking the local path |
| `sitemap.xml.backup` | — |

**Fix:** move to `archive/`, then extend CHECK 7's `mustBlock` filter to a **deny-by-default** rule — block every root file except an explicit public allowlist (`.html`, `.css`, runtime `.js`, favicons, `og-image.*`, `robots.txt`, `tags.json`, `manifest.webmanifest`, `sitemap.xml`, `_headers`, `_redirects`, and the reader-facing PDFs). Extension-by-extension will keep rotting.

---

## P1 — THE HYPERLINK MANDATE IS BROKEN ON 41% OF THE CORPUS

CLAUDE.md: *"First mention of a concept gets the link."* Measured inside `<p>` prose only (cards and nav excluded):

- **252 of 618 article pages** have at least one target linked **4+ times**
- **62 pages** have a target linked **8+ times**

| Page | Target | Times in prose |
|---|---|---|
| `response-william-lane-craig` | `/compare-calvinism-molinism` | **62** |
| `apologetic-the-cardiac-transplant` | `/question-newheart` | 34 |
| `systematic-reprobation` | `/question-predestined-to-hell` | 31 |
| `apologetic-ekloge-the-greek-of-election` | `/question-romans9` | 31 |
| `systematic-union-with-christ` | `/devotional-in-christ` | 29 |
| `systematic-covenant-works` | `/systematic-covenant-theology` | 29 |

What the reader actually sees, one paragraph of the Craig page (`[[…]]` = link):

> "On the question of how God saves, however, Craig is a [[Molinist]]. He believes that God possesses a kind of knowledge — [[middle knowledge]] or *scientia media* — that lets Him know… God uses this [[middle knowledge]] to select and actualize exactly the world He wants…"

Same target, twice in four sentences. The page is visually striped and the link stops meaning anything.

**Note on cause:** `auto-linker.js` documents itself as first-mention-only, and a dry run right now adds **0 links** — it is not currently the active culprit. The duplication is accumulated from prior sessions/tooling. So the fix is a **one-time de-duplication pass** (keep first prose occurrence per target, unwrap the rest), plus a new validator check that fails on any target linked 3+ times in prose so it cannot re-accumulate.

CHECK 1 only asks whether links *resolve*. All 252 pages pass it.

---

## P2 — FACTUAL ERROR, VERIFIED WRONG

`history-open-theism.html` L208:

> "Sanders was voted out by a hair. Pinnock survived."

**Backwards.** At the 2003 ETS meeting in Atlanta, expulsion required two-thirds. Sanders drew 388 votes (62.7%) — he **survived by 27 votes**. Pinnock drew 219 (32.9%). Neither man was voted out. Sanders lost his post at Huntington University in Nov 2004 — a different institution, a different event, conflated here.

On a page whose authority is historical narration, this is the hole an opponent finds first.

**Fix:** "The motion to expel Sanders fell short of the required two-thirds by twenty-seven votes. Both men kept their membership. Huntington University fired Sanders the next year anyway."

---

## P2 — GREEK THAT DOES NOT EXIST

`theologian-owen.html` L276 quotes John 6:39 as:

> *ek pantos hou dedōken moi mē apolesō ex autou* … "**Two prepositional phrases doing the same work.**"

Every manuscript witness — Nestle, Westcott-Hort, Tischendorf, Byzantine Majority, both TR editions — reads **ἵνα πᾶν ὃ δέδωκέν μοι μὴ ἀπολέσω ἐξ αὐτοῦ** (*hina pan ho dedōken moi*). There is no *ek pantos hou*, and there is **one** preposition in the clause (ἐξ), not two.

Under VOICE §XV this is the worst class of error: the page's most authority-claiming paragraph rests on invented grammar. **The point survives and is stronger correctly stated** — neuter singular collective πᾶν ὅ ("all that," the given people as one indivisible gift) resumed by partitive ἐξ αὐτοῦ ("nothing of it").

Same page L324 prints **KJV** as the Scripture text: *"why are ye fearful, O ye of little faith?"* NIV 2011 reads "You of little faith, why are you so afraid?" — the "open your own Bible" leverage dies for the reader who does. (12 other live pages carry KJV-isms; most are legitimate historical quotation and need a pass to sort.)

---

## P2 — BANNED MOVE: THE MANUFACTURED CRISIS SCENE

Three live pages open or close on a scene the reader will not recognize (VOICE §VI; Aaron 2026-06-06).

**`history-open-theism.html` L200** — the opener, five stacked contingencies:
> "Picture a hospital room at 4am. The machines are doing most of the breathing. The woman in the bed is your mother, or your wife, or your daughter…"

The hedge "*your mother, or your wife, or your daughter*" is the tell. Worse: **L259 "Back to the Hospital Room"** performs a Circular Return into it, and the page's entire tender landing rests there. The universal opener is already in the page at L226 — *"When the phone rings… you do not say, 'God, I know You didn't see this coming.' You say, 'God, You know.'"* — which does identical work in three sentences. Promote it; cut the room.

**`shattered-lens-taught-wrong.html` L251:**
> "It is the shape of waking up at 4am with Ephesians 1 running on a loop in your head."

Reinforced twice more (L249 "keeping you up at night," L305 "the sleepless nights"). The page has decided the reader is an insomniac.

**`open-wound-the-prayer-god-didnt-answer.html` L203:**
> "The one on your knees at 3 AM with your voice breaking."

Then L281 returns straight into it. Most people prayed that prayer in a car, in a corridor, at noon.

*Cleared on inspection (legitimate, leave alone):* `history-korean-revival` (soldiers at 3 AM — actual persecution history), `essays/the-two-graces` (singing at night — an image of assurance, not crisis), `joy-in-suffering` (offered as one of several "perhaps").

---

## P2 — PAGES FAILING THE COLD READ

Two of four sampled failed. Both are top-tier search doorways.

**`open-wound-the-prayer-god-didnt-answer.html` — REBUILD.** Not wrong; *only* correct — the failure state CLAUDE.md names. Its four load-bearing moves (Romans 8:28 "not all things are good," Gethsemane, Psalm 88 "God canonized it," "God is not a vending machine") are the stock set of every evangelical article on unanswered prayer since 1985. Interchangeable with GotQuestions.

Worse, **the catch excludes the reader it was written for.** L283: *"the fact that you are still praying **means** the hands that held you…"* / L285: *"That must **mean** I still believe You are listening."* The assurance rests on the reader's continued emotional engagement. A reader whose prayer life the no actually killed is told in the closing prayer that people like him aren't here. Also L238's H2 — **"Jesus Got No Too"** — read by someone who buried a child last month.

**`shattered-lens-taught-wrong.html` — SURGICAL-FIX (heavy).** Strong first 60%. Then:
- **Two closing paragraphs back to back**, and the second (L311) returns to a kitchen that appears nowhere in the article: *"Look up. There is no one else in the kitchen… The coffee can stay cold."* Delete L311; L309 already closes on the verse that opened the page.
- L247/249: *"Dead men do not wrestle. The fact that you are wrestling means you are alive"* — enthrones experience as the court, on a site that spends its corpus proving the heart cannot read itself (Jer 17:9). A numb reader is told he is dead.
- L292: *"That prayer has never gone unanswered."* Unfalsifiable — and directly contradicted by the sister page above.
- **L224: an editorial stage direction left in the prose** — *"**Describe how this feels:** vertigo. Betrayal."*
- L280–290 drops into advice-column bullets (*Keep reading Scripture / Find one person / Pray honestly*) — the one section a reader could have gotten anywhere.

**`theologian-owen.html` — SURGICAL-FIX.** It argues rather than reports (the eleven graves are the premise, not decoration). But it says its best line four times (L261, 272, 296, 300), and L314 promises *"return — once and only once — to the eleven graves"* after already breaking that promise three times. **The catch never reaches the reader:** the final 20% is Oxford, Cromwell, the Ejection, a deathbed. The last direct address is L290, inside a demolition. The page ends in admiration for a dead man.

**`history-open-theism.html` — REBUILD** (frame + the factual reversal above). Also: L200 and L224 are the same sentence with two words swapped ("*ambushed by your diagnosis… improvising your treatment plan*" / "*surprised by your cancer… improvising your treatment*"), and Molinism — the strongest counter-move available — is dismissed with a one-foot-on-the-dock analogy without the grounding objection ever being named. Any reader who has read Craig closes the tab.

---

## P3 — INDEX AND HOUSEKEEPING DRIFT

- **3 real articles are missing from `tags.json`**: `theologian-anselm`, `theologian-owen`, `theologian-wycliffe` (plus `freedom`, `connections`). They carry `<article class="article-body">` but sit outside the canonical index, so they miss `/all-content`, homepage counts, and the mega-menu. They *are* in the search index and sitemap. Check `build-tags.js` `SKIP` — if the exclusion is deliberate for the utility pages (`author`, `privacy`, `terms`, `share-your-story`, `testimony-thank-you`) it should not be catching three theologian pages.
- **`sitemap.xml` is a week stale** (built Jul 21, 685 URLs). Run `node build-sitemap.js`.
- **CLAUDE.md says the canonical count is 607.** `tags.json` says 608; on-disk `article-body` pages number 618. Update the manifesto line.
- **Structural clutter:** `theologian-owen` stacks **five consecutive link-farm blocks** after its final line (`.cross-refs`, `.continue-journey-global`, `.related-explore`, `.related-articles`, `.article-continue-journey`) — the closing image is buried under ~40 cards. `open-wound-the-prayer…` stacks three and uses a nonstandard footer (`footer-site`, no `footer-container`/`footer-copyright`). Worth a site-wide count.
- **`</article>` placement is inconsistent** relative to `<!-- RELATED-ARTICLES-START -->` (Owen: outside; open-theism: inside). This is the structural-rot v5 signature — worth running the detector corpus-wide.

---

## WHAT IS CLEAN

Genuinely good news, verified:

- **All 10 validator checks pass.** Zero broken internal links across 684 pages. Zero orphans. Every article has nav, `global.css`, `nav.js`, the grace-warning block, and a meta description — **no exceptions found**.
- **Zero emojis** in any reader-facing file. The only hits are console output in `validate-site.js` / `audit-prose.js`.
- **Zero "TL;DR"**, zero `(NIV)` tags, zero `section-nav`/`article-toc` reintroductions.
- **Zero NIV-1984 regressions** of the "controlled by the sinful nature" type.
- **"Aaron Forman" appears in 0 live HTML files.** The HTML anonymization held; only the PDF escaped.
- **In Brief coverage is effectively 100%** — 610 of 618, and the 8 without it are utility pages (`author`, `privacy`, `terms`, `share-your-story`, `testimony-*`) and two interactive widgets. **Benchmarking priority #1 is done.**
- All 38 internal links on the four cold-read pages resolve on disk.

---

## SUGGESTED S193 ORDER

1. Delete `RE-FORMED.pdf` + `fleet-deploy.command`; sweep the other 25 internals into `archive/`; rewrite CHECK 7 as deny-by-default.
2. One-time link de-duplication across 252 pages; add a validator check at 3+ prose links per target.
3. Fix the ETS fact and the John 6:39 Greek. Both are single-paragraph edits with outsized credibility cost.
4. Strip the three manufactured crisis scenes; promote `history-open-theism` L226 to the opener.
5. `shattered-lens-taught-wrong` surgical fix (delete L311, L224 stage direction, L247/249, L292, the bullet section).
6. Rebuild `open-wound-the-prayer-god-didnt-answer` — the catch has to hold the reader who feels nothing.
7. Housekeeping: `build-tags.js` SKIP, `build-sitemap.js`, CLAUDE.md count.
