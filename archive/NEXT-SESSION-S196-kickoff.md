# S196 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the **S195** entry at the top of `MISSION-CONTROL.md` — that entry only, not the log and never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## PRIORITY 0.0 — RUN THE RENDER CHECK. IT IS OWED FROM S195.

Two minutes, first thing, before anything else:

```bash
npm i puppeteer-core
node archive/s195-render-check.js
```

It drives the Chrome already on the machine (no download) and tests article / hub / homepage / widget / printable at **1196px** — deliberately inside the retuned 1181–1400 nav band — and at 1600px, asserting: Playfair and Inter actually loaded, the `h1` is not silently falling back to Times, the wordmark does not overlap the first nav link, the nav has not wrapped to a second row, and nothing overflows horizontally.

**S195 wrote CLAUDE.md's PRESENTATION INTEGRITY law 5 and then could not obey it**: the agent sandbox is arm64 and Puppeteer's bundled Chrome is x86-64, and the Chrome extension was not connected. The script is written and ready. This is the check that found a 27px nav overlap and 347 pages in Times New Roman when fifteen static checks were green. **Do not close another session without running it.**

---

## THE LAW THAT IS NOW THREE-FOR-THREE

**Cold-read what the previous session shipped, before you build anything new.**

- S193 shipped 4 pages unread → S194 read them → **2 failed.**
- S194 shipped 5 pages unread → S195 read them → **5 of 5 failed.**

And S195's two worst were not craft failures but **integrity** failures: a Greek warrant that is not in the Greek (*lavished* welded across ἐπερίσσευσεν and δέδωκεν — an English-only, NIV-only pun) and a Hebrews 4:12 quotation that is not in the NIV ("two-edged" for "double-edged"), which four consecutive sessions had scanned past.

**The generalization, sharpened:** a repair session verifies facts and structure and has no instrument for checking (a) whether the argument it just wrote survives the strongest opponent, or (b) whether the warrant it just invented is actually in the text. Nothing in the pipeline can see either. Only the cold read can.

**So: your P0 is the four pages S195 touched.** `theologian-owen`, `reformed-apologetics-moral-argument`, `devotional-you-were-wanted-before-you-were`, `shattered-lens-taught-wrong`. Read them cold. Expect to find something.

**When you check a language claim, check the lexeme, not the English.** The S195 failure would have been caught by one question: *is the same Greek word actually behind both English words?* Make that question reflex for every §XV move you write or inherit.

---

## PRIORITY 1 — FINISH `shattered-lens-taught-wrong`. IT SHIPPED **PARTIAL**.

The NIV breach is fixed. The seam list is not. Full spec, each item confirmed by a cold read:

1. **THE PAGE REFUTES ITS OWN BOLDED SENTENCE — fix this first.** Line ~240, in bold: *"this is not your faith falling apart. This is God laying bedrock."* Line ~253: *"there is a cheap version of this argument and it will fail you the first time you feel nothing. The cheap version says: your wrestling proves you are alive."* **Line 240 IS the cheap version, still standing, in bold.** Ground it outside the reader: cut "the disorientation, the desperate reading, the silent arguments with yourself" from the subject position and make the object-side claim (*the old foundation was sand; sand cannot hold you, and no amount of standing very still on it will make it stone*). Then **re-sync both carriers** — the In Brief (*"The vertigo feels like losing your faith — but it is the lie of self-rescue collapsing"*) and `shattered-lens-hub.html` line ~222 (*"That disorientation isn't destruction—it's reconstruction."*), which sits three inches above the link.
2. **The orphaned *costume* image.** A prior session cut the three sentences that built it and kept the one that cashes it; the reader now meets *costume*, italicized, as a garment nobody put on him. Restore one setup clause or cut the word.
3. **The close reassigns the rubble.** *"Jesus Christ came down into a world in precisely this condition"* asserts the world He entered was in a state of *theological disorientation*. He came into sin and death. "It" in "the rubble of it" now resolves to *the world*, not the reader's collapsed foundation, which is where the page's image lives.
4. **Multiplied close.** Four of five paragraphs in the final section end on a closer-cadence hammer. *"You are reading it to meet the One who wrote it"* is already a complete ending; *"He has not moved"* is the right final hammer; *"And He was already doing that while you were still arguing"* is redundant **and temporally incoherent.** Cut one. Also **"He finishes what He starts. Always."** — Move 11 forbids the appended qualifier.
5. **~18 antitheses in ~35 paragraphs.** "It is not X, it is Y" once every other paragraph is §XXII.4's named machine. Convert at least eight to plain declaratives, and let two or three paragraphs run **cool** — then do not go back and make them sparkle (§XXII.5).
6. **The Arminian is caricatured and then mocked.** *"That God is exhausted — He has done everything possible and now He is waiting, hoping"* — nobody holds this; prevenient grace is never named. And the one place the opponent speaks he gets his weakest line plus a sneer (*"Apparently the Holy Spirit forgot to mention the looking-ahead part"*) — an applause line that violates §XIX.3. Give the foreknowledge reading one honest sentence at full strength (Romans 8:29's *proegnō*) and answer it.
7. **THE LARGEST UPGRADE AVAILABLE: the question beneath the question is never asked.** A reader discovering unconditional election has exactly one terror — ***what if He did not choose me?*** VOICE §XVI.4 names this case verbatim. The page never raises it and instead asserts the answer eleven times without earning it. To that reader, unearned assurance reads as evasion. Raise the fear out loud and answer it **from the standing invitation, not from his interior** (the John 6:37b move that repaired `theologian-owen` this session is the model).
8. Smaller: the fish-in-a-bowl analogy contradicts itself (for a fish, the way out of the bowl is death); **"The Promise" is a label H2**, which §I.3 bans; *"which is all negative"* reads as "all bad" (means grammatically negative); *"This is the hardest part to believe. But it is true"* is throat-clearing on the most important section; three manufactured biographical details ("your small group", "fifteen years", "the familiar songs going off-key"); target ~1,350 words from ~1,650.

---

## PRIORITY 2 — THE UNDER-LINKED QUEUE AND THE GOSPEL-ABSENCE QUEUE, BOTH UNTOUCHED IN S195

P0 correctly consumed the session. Both queues are where S194 left them.

**Under-linked:** 44 pages below the 8-link floor (`terms` and `privacy` are utility pages and **exempt** — the real queue is 42). Regenerate with the snippet in `archive/NEXT-SESSION-S195-kickoff.md`. **`archive/s195-page-inventory.txt` is current (618 valid article slugs, regenerated this session).** Give it to any subagent doing link work with the hard rule: *every href must appear verbatim in this file.* That constraint produced 66 links across 10 pages in S194 with zero broken and zero duplicates — and in S195 it caught `/psychology-performance-treadmill`, an aspirational link that would have shipped (the real page is `broken-mirror-performance-treadmill`).

**Gospel-absence:** `node detect-gospel-absence.js --queue` for word-count-descending order, `--closes=N` to read the endings. **The craft law, now proven over six sessions: derive the catch from the page's own central image.** S195's example — a devotional about being *wanted* landed on *eperisseusen*, the word for **surplus**, and therefore on the twelve basketfuls left on the grass after five thousand men had eaten their fill: *"Not a sum that barely covered it. Baskets left over."* That came out of material the page already had and had walked past.

---

## WATCH ITEMS

1. **`reformed-apologetics-moral-argument` came back from repair at 4,242 words** and was compressed, but is still long against a sibling range of 2,024–3,273. Compression pass owed.
2. **The 21 scripts still use the brittle `includes('<article class="article-body">')` exact-match.** CHECK 14 is the guardrail, not the cure. Sweeping them to a tolerant regex is still owed.
3. **178 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch.
4. **CHECK 10 sits at 724 attributes / 235 pages.** Ratchet — do not raise it.
5. `detect-feeling-slip.js` remains triage. **The hand-read obligation is permanent** — every session since S186 has found slips the detector cannot see, and the closing catch is still the densest slip real-estate on the site.
6. **`.fuse_hidden*` files are FUSE mount artifacts, not repo files.** The agent sandbox mounts this repo over FUSE, and every rewrite of an open file orphans the old inode under a *new* hex name — so enumerating them in `_redirects` is a treadmill that never converges. **CHECK 7 now skips them by pattern** (they are gitignored, and a file git never commits is a file Netlify never serves); the skip is documented in `validate-site.js` and was verified not to weaken the check — a real internal file still fails it. All artifacts were deleted in S195. If `rm` ever returns `Operation not permitted` on them, that is the sandbox, not the repo.
7. **Subagents can be killed mid-edit by session limits.** Three were in S195. If it happens, **check every file they touched for structural integrity before doing anything else** (article tags balanced, nav / footer-grace-warning / global.css / `</body>` present) — then finish their work by hand rather than re-dispatching.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all seven build scripts, then `node validate-site.js` — **now FIFTEEN checks**. Fix everything it flags. Also run `canonical-conformance.js` and `verify-scripture.js` (the latter is a report, not a gate). If you add CHECK 16, add it **above** the verdict block.
2. **Run `node archive/s195-render-check.js`** (Priority 0.0 above). The validator cannot see the page.
3. Stamp every page you lift: `node archive/coverage.js stamp <page.html> 196 lifted|partial "<note>"`, then `node archive/coverage.js report --session=196` and copy the **END-OF-SESSION STANDING** block into both the Session Log and the closing chat message.
4. Write the S196 entry at the **top** of `MISSION-CONTROL.md`'s Session Log; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live).
5. Write `archive/NEXT-SESSION-S197-kickoff.md`.
6. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
7. New internal docs go in `archive/`, never the repo root. Any new root-level tooling needs its own forced `410!` line in `_redirects` in the same session — CHECK 7 will tell you the exact line.
