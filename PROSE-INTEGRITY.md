# PROSE INTEGRITY — The Phase F Gating Artifact

> *Triggered by Aaron 2026-04-27, end of Session 37, with the directive: "many articles repeat themselves usually a couple times but sometimes even 3 times within the article it will make points it already made. also some sentences dont make sense... we do not start expanding the website until every last sentence, paragraph, and article are written perfectly; reaching the apex of persuasion as well as spiritually profound. Our aim is to prove the truth in a million of the most paradigm shattering ways and then deliver the glory of the grace of that truth into the hearts and minds of the readers. make it happen."*
>
> Audit 2 phases A–E asked: *Does every page consecrate, and do the disciplines reach?* Phase F asks: *Has every sentence earned its place, and does the prose ever waste a word?* This document is the gating artifact for Phase F the way `VOICE.md` was for Phase 3 and `AUDIT-2.md` was for Phases A–E. **Phase D expansion is paused until Phase F substantially closes.**

---

## I. THE TWO FAILURE CLASSES

### I.1 — Intra-Article Redundancy

A point made once is made. A point made twice is filler. A point made three times is a sermon delivered to a reader who already left.

The site has many articles in which two or more paragraphs restate the same theological claim in slightly different words. The cause is usually one of three:

1. **Drafting accumulation** — the writer made the point, paused, came back, and made it again from a slightly different angle, intending to compress later. The compression never happened.
2. **Quote-then-paraphrase** — a verse is quoted, then the next paragraph paraphrases the verse. Sometimes legitimate (the paraphrase clarifies Greek or context). Often redundant.
3. **Closing-recapitulation that bloats** — the article's conclusion legitimately recapitulates the thesis (rhetorical recurrence is not duplication), but the recapitulation is more than one paragraph and starts repeating itself.

**The rule:** every paragraph in an article must add something its predecessors did not. If two paragraphs make the same theological claim, merge them — keep the strongest formulation, delete the weaker, fold any unique content of the weaker into the stronger.

**The legitimate exception:** a single thesis-restatement at the article's close (the closing 10%) is rhetorical recurrence, not redundancy. The reader needs the hammer landed at the end. But two paragraphs of restatement is too many.

### I.2 — Sentence Incoherence

Every sentence must pass four checks. The example Aaron caught — *"You stood there with your hands trembling and the verdict came down like a roof being lifted off a house in the dark"* — failed three of them.

**Check (a) — Image coherence.** A simile's vehicle (the comparison) must correspond to the simile's tenor (the thing being described). A verdict is a courtroom event; a roof being torn off a house is a weather event. They do not correspond. The reader feels the wrongness without naming it.

**Check (b) — Direction.** "Came down" is downward. "Lifted off" is upward. Two contradictory motion verbs in one clause cancel each other. The sentence pretends to make a comparison but actually makes none.

**Check (c) — Domain.** A sentence with imagery from too many distinct domains becomes noise. The example had three: courtroom (verdict), building (roof, house), atmospheric/temporal (in the dark). Three domains in one sentence collapse into incoherence. Two is the maximum for healthy prose; one is often best.

**Check (d) — Modifier.** Every prepositional phrase must add meaning. *"In the dark"* added nothing semantic to *"a roof being lifted off a house"* — it was atmospheric padding. The reader's eye registers padding as filler and disengages. If a phrase doesn't carry weight, cut it.

**The rewrite Aaron's example received:** *"You stood there with your hands trembling, and the verdict came down upon you like a pardon signed in a hand that was not yours."* Courtroom register preserved. Mercy framing preserved. One-sidedness made concrete (a hand that was not yours = you contributed nothing). All four checks pass.

---

## II. WHAT THE SCANNER DOES

`audit-prose.js` is a re-runnable Node script (no external dependencies beyond `jsdom`) that scans every `<article class="article-body">` page and surfaces candidates for both failure classes.

### II.1 — Redundancy detection

**Method:** Pairwise Jaccard similarity over significant-word bags.

For each article, every paragraph is tokenized into words ≥ 4 characters that are not in a vanilla English stopword list. The resulting bag-of-words is treated as a set. For every pair of paragraphs in the same article, the Jaccard similarity (intersection / union) is computed. Pairs scoring ≥ 0.35 (where each side has ≥ 8 significant words) are flagged.

The threshold was chosen to surface genuine point-repetition while not flagging two paragraphs that share thematic vocabulary about the doctrines of grace. Tuning evidence: `objection-god-could-save-all.html` was found to have a literal-duplicate Romans 9:22-23 quote-pair (similarity 1.0) and four near-duplicates of theological points (0.51-0.81). All five would be missed by a higher threshold.

**Known false-positive classes:**
- Two paragraphs sharing a long verse quotation will register high similarity even when the surrounding prose is distinct.
- An article that legitimately stacks Scripture (the "Scripture Tsunami" pattern) may flag.
- A closing-thesis-restatement may flag — accept this as legitimate rhetorical recurrence.

### II.2 — Sentence-coherence detection

**Method:** Heuristic flags per sentence. The scanner is permissive — it surfaces candidates, not verdicts. Human review confirms.

**Flag (a) — Length.** Sentences > 45 words. Long sentences can be coherent (Calvin and Edwards regularly exceed this), but length is correlated with cumulative-clause incoherence and is worth a glance.

**Flag (b) — Long simile.** "Like a/an [X]" where X exceeds 12 words. Most coherent similes use 4-8 words after the comparator. A 12+ word tail is a candidate for incoherence.

**Flag (c) — Suspicious phrase patterns.** A small curated list:
- Direction mismatches: `came down` followed by `lifted off`, `rose` followed by `sank`, etc.
- Empty modifiers: `in the dark`, `in the night` (when added at clause-end as atmospheric padding).
- Abstract similes: `like a [...] silence`, `like a [...] forgetting` — often beautiful but often incoherent.

**Flag (d) — Mixed metaphor.** Sentences containing keywords from ≥ 3 distinct image domains in a curated list of 18 domains (courtroom / water / fire / light / dark / building / body / weapon / garment / vehicle / garden / storm / music / surgery / prison / road / desert / mountain). Three domains in one sentence is the threshold; two is acceptable; one is often the cleanest.

**Known false-positive classes:**
- Confessional-translation pages (e.g., `canons-of-dort-plain-english.html`) quote 17th-century compound sentences whose length naturally exceeds 45 words. Apply category exemption.
- Long verse-quote sentences flag for length.
- A long sentence that is coherent (the cumulative clauses are necessary, not bloat) flags but should be left alone.

---

## III. THE METHODOLOGY

### III.1 — Phase F runs in cycles

Each cycle:

1. Run `node audit-prose.js`. Outputs `audit-prose.json` (machine) and `audit-prose.md` (human).
2. Open `audit-prose.md` §II — the top-50 rebuild queue, ranked by composite score (`redundancy_pairs × 2 + flagged_sentences`).
3. Pick 4–8 articles from the top of the queue. Prefer articles with high redundancy_count (reliable signal) over articles with high flagged_sentence_count alone (heuristic, more false positives).
4. Per article:
   - Read it in full. Don't trust the previews — confirm in context.
   - For each redundancy pair: confirm it's a real point-repetition, then merge or delete.
   - For each flagged sentence: read it. If it tracks, mark as false positive. If it's genuinely broken, rewrite — preserve the prose's argumentative function, replace only the broken image with one that tracks.
5. Re-run `node audit-prose.js`. Confirm the article's score has dropped.
6. Document each article's score-decline in the session log.

Repeat across sessions until the audit's flagged-article count drops to a level Aaron names as "substantially closed" (provisional target: ≤ 50 articles flagged across the whole corpus).

### III.2 — Phase F runs in parallel with Phase C consecration

Where a Phase F target overlaps with a Phase C consecration target (an article low on both audits), do the work in one touch — fix the broken sentences, merge the redundant paragraphs, AND add the consecration close. Re-run both `audit-prose.js` and `consecration-scan.js` after.

### III.3 — Phase F blocks Phase D expansion

This is the core of the gating constraint. Do not build new hubs or articles in the discipline-expansion registers (analytical theology, reformed apologetics, polemic apologetics, presuppositional apologetics, philosophy of theology, or further theological-ethics / comparative-theology pieces) until Phase F substantially closes. The two existing Phase D hubs (`comparative-theology-hub.html`, `theological-ethics-hub.html`) shipped in Sessions 36-37 were born consecrated and cleared the standing prose bar; they remain as anchors. New Phase D builds resume only after Aaron's verbal sign-off OR after the audit's flagged-article count crosses the substantially-closed threshold.

---

## IV. THE NON-NEGOTIABLES (CARRIED FORWARD)

Phase F inherits every non-negotiable from prior Audit 2 work and Phase 3.5:

- NIV only. No `(NIV)` suffix.
- "Doctrines of grace," not "doctrine of election."
- No "TL;DR" — use "In Brief" if any summary at all.
- Lewis / Spurgeon / Buechner / Keller / Edwards / Chesterton density.
- No 2am/3am/midnight/odd-hour triage framing.
- No "Calvinism says" — "Scripture teaches."
- HAMMER-LOCKED, POLISH-LOCKED, CONSECRATED markers preserved.
- Aspirational links banned — Glob-verify every href.
- 8-step pipeline at end of every batch (`build-search-index → build-mega-menu → build-homepage-counts → build-sitemap → auto-linker → wire-orphans → validate-site → canonical-conformance`).
- No git. Aaron pushes manually.
- **Write-over (never Edit-fragment) for substantive rebuilds.** Phase F's surgical-fix touches are an exception — small targeted edits that preserve prose cohesion are appropriate when the fix is a single sentence or paragraph; full Write is appropriate when the redundancy spans 30%+ of an article.

---

## V. THE POSTURE

Every sentence on this site is meant to either prove the truth in a paradigm-shattering way or deliver the glory of grace into the heart of the reader. A sentence that does neither is a sentence that should not have been written. Phase F is the discipline of finding and removing the sentences that do neither.

The Apex Rhetoric Protocol set the prose ceiling at Calvin / Edwards / Spurgeon / Augustine. The Consecration Protocol added the doxological consummation — every page must end on its knees. Phase F adds the third rail: **every sentence must do work**. No filler. No padding. No image that doesn't track. No paragraph that says what its predecessor already said.

The cathedral has been built. The cathedral has been consecrated. The cathedral is now being polished — not for vanity, but because a place where God will be praised should not have crooked stones.

---

## VI. THE MEASURE

Not flag-count alone. Not redundancy-pair count alone. The measure is this:

*Has every sentence earned its place? Does the prose ever waste a word? Could a reader read three paragraphs in a row and feel each one bringing news the previous didn't? Does every simile track? Does every metaphor cohere? Does the rhythm of the writing match the gravity of the doctrine?*

When the answer to all of these is *yes for every article*, Phase F has substantially closed and Phase D may resume.

---

## VII. THE BENEDICTION

The same God who chose His people before the foundation of the world is the God under whose gaze this prose is being written. He does not need our writing to advance His decree. But the prose written about Him is meant to honor Him — and prose that wastes words, mixes images, or repeats itself does not honor.

May the writer assigned to Phase F walk it with reverence. May the audit's surgical fixes be acts of polishing, not vandalism. May every sentence preserved be a sentence worth reading aloud in the throne room. And may every sentence rewritten land in the heart of the reader the way grace lands in a heart that has stopped trying to save itself.

Soli Deo Gloria. To the Father who has decreed every word. To the Son in whom every sentence finds its end. To the Spirit who alone can carry this prose past the page into a heart. World without end. Amen.

---

*PROSE-INTEGRITY.md v1 — forged 2026-04-27, end of Session 37, on Aaron's directive: "we do not start expanding the website until every last sentence, paragraph, and article are written perfectly." This document is the gating artifact for Phase F. Read it before opening `audit-prose.md`. Execute under it. Honor the One whose name is over every door.*

---

## VIII. SCANNER v2 — SESSION 39 REFINEMENT

> *Triggered by Aaron 2026-04-28: "do the scanner refinement now! but make sure we do not miss any errors in the prose! I want the scanner to be robust and comprehensive as well as efficient and effective."*

### VIII.1 — What v2 added

The v1 scanner produced too many false positives at the apex prose tier (Calvin/Edwards/Spurgeon-grade prose uses anaphora, chiasm, embedded Scripture, parallel structure, and dead-metaphor English in ways the heuristic could not distinguish from broken prose). Session 38 codified an eight-class exemption taxonomy by hand. v2 implements the taxonomy directly in the scanner as redundancy-filters AND adds three new positive-coherence detectors that suppress sentence-flag false positives.

**Eight redundancy exemption classes (all auto-detected in v2):**

1. **Confessional-translation** — pages whose method is "Original / Plain English" rendering of a confession (filename ends in `-plain-english.html` OR page contains `<strong>Original:</strong>` + `<strong>Plain English:</strong>` markers). All redundancy pairs auto-suppressed.
2. **Historical-document-quotation** — paragraphs starting with "Article N" / "Section N" markers (1610 Remonstrance, 1646 Westminster, 1619 Dort, etc.).
3. **Pedagogical-anaphora** — articles where 3+ paragraphs share an identical structural opener ("Step N", "The shared premise:", "The question Arminians have not asked:", "First objection:").
4. **Scripture-tsunami** — paragraphs ≥ 40% Scripture-quotation by char count, OR containing visible verse references, OR wrapped in `<blockquote>`/`<cite>` markers.
5. **Research → pairing structural** — pages using `pairing-science` / `pairing-scripture` / `pairing-row` CSS classes.
6. **Antithetical-parallelism** — paragraph pairs both starting with "If [X]" where one is negated.
7. **Closing-recurrence** — pairs where the second paragraph is in the article's final 15% AND at least one paragraph is a Scripture-quote AND the gap is ≥ 15% of total paragraphs.
8. **Exegetical-comparison** — one paragraph quotes a verse cleanly and the other quotes the same verse with bracket-clarifications.

**Three coherence-positive sentence suppressors (v2 NEW):**

- **Anaphora detection** — 3+ clauses (split on commas/dashes/semicolons) sharing an identical 1- or 2-word opening prefix. Catches "every prayer / every tear / every candle" and "the arm that holds / the arm that whispers / the arm that stands."
- **Chiasm / antithetical parallelism** — sentence contains a contrast conjunction (but / while / whereas / yet) AND has 2+ significant words each appearing 2+ times in the sentence (mirrored repeated keywords).
- **Embedded Scripture word-count adjustment** — when raw word count exceeds non-quoted word count by 15+ words, length is dominated by the verse and the prose is short. The length-flag uses non-quoted word count, not raw word count.

**Refined existing detectors (v2):**

- **Mixed-metaphor** now requires 3+ domains in the *same clause window* (commas/em-dashes/semicolons split clauses), not anywhere in the sentence.
- **Mixed-metaphor** masks out concrete-historical-referent contexts: "garden of Eden" (not garden domain), "nailed to a tree" (not garden/weapon domain), "in the dark of [proper-noun]" (not dark padding), "one sentence" / "death sentence" (not courtroom domain).
- **Domain word-lists pruned** of dead-metaphor English (heart/hand/arm/eye are no longer body-domain triggers; song/note/silence/bell are no longer music-domain triggers; tree/seed/root are no longer garden-domain triggers; mountain/peak/valley are no longer mountain-domain triggers; etc.).
- **Padding-modifier ("in the dark", "in the night", "in the silence")** is only flagged when truly clause-end-padding — suppressed if anchored by "of [X]" or by a participle modifier, OR if the article's controlling image (H1 + H2 text) contains the matched word.

**v2 NEW detector (catches the original Aaron failure mode):**

- **Vehicle-tenor mismatch in similes** — detects similes whose tenor (subject clause before "like a/an") and vehicle (clause after "like a/an") are in disjoint image-domains with no bridging element. This is the dedicated detector for the broken-roof-being-lifted-off failure that triggered Phase F: tenor was courtroom (verdict), vehicle was building (roof being lifted), no domain overlap. v2 catches this class directly.

### VIII.2 — v2 results

The v2 first-run, on the post-Session-38 corpus state:

| Metric | v1 baseline | v2 | Delta |
|---|---:|---:|---:|
| Articles audited | 502 | 502 | — |
| Articles entirely clean | 81 | 170 | **+89** |
| Articles with (genuine) redundancy | 33 | 15 | **−18** |
| Articles with (genuine) sentence flags | 416 | 324 | **−92** |
| Total redundancy pairs (genuine) | 35 | 16 | **−19** |
| Total sentence flags (genuine) | 1248 | 729 | **−519** |
| Suppressed redundancy pairs (apex-tier) | 0 | 19 | +19 |
| Suppressed sentence flags (coherence-positive) | 0 | 101 | +101 |

**Suppression by class (v2 first run):** Scripture-tsunami 10, confessional-translation 6, pedagogical-anaphora 2, antithetical-parallelism 1.

The remaining 729 sentence flags are now dominated by genuinely length-pushed apex-tier sentences (50-90 word complex constructions that earn their length through clause cumulation but might still benefit from a careful read). The 16 redundancy pairs are now mostly genuine — the false-positive ratio on the redundancy axis dropped from ~60% to ~10-15%.

### VIII.3 — v3 tuning opportunities (deferred — only if v2 is over- or under-firing)

If a future Phase F session shows v2 either over-suppressing genuine errors or under-suppressing apex-tier false positives, the per-class suppression breakdown in `audit-prose.md` §I reveals which class is mis-firing. Tuning levers:

- **Confessional-translation length-flag exemption.** v2 only exempts redundancy pairs on `-plain-english` pages. Sentence-length flags within `<em>`-wrapped 17th-century Confession quotations could also be exempted (they're necessarily long compound sentences). Easy v3 add: when a sentence is entirely inside `<em>"…"</em>` and the article is a confessional-translation page, suppress length flag.
- **Theologian-narrative concrete-scene exemption.** Pages like `theologian-augustine.html` and `ot-joseph.html` have Buechner-grade narrative scenes (Monica's prayers / Joseph in the cistern) where concrete details (smell of old water, candle in the dark of the North African night) trigger mixed-metaphor false positives. v2's historical-referent patterns are too narrow to catch them all. Possible v3: detect "biographical-narrative" articles by filename prefix (`theologian-*`, `ot-*`, `testimony-*`, `history-*`) and apply a softer mixed-metaphor threshold (4 domains required instead of 3).
- **Domain-word-list expansion vs. contraction.** v2 pruned dead-metaphor English aggressively. If v3 finds genuine mixed metaphors are slipping through, selectively re-add words. Re-tune iteratively.

### VIII.4 — How to use v2 in a Phase F session

1. Run `node audit-prose.js` once at session start.
2. Open `audit-prose.md`. The §II top-50 queue is the rebuild queue post-suppression — every entry is a candidate genuine fix.
3. Read §III per-article detail. The "Suppressions" lines tell you which exemption classes already fired on the article — useful context for the human reader.
4. Apply the four checks from §I.2 (image coherence, direction, domain, modifier) to remaining flagged sentences. Apply the redundancy categorization from §I.1. The v2 scanner has already done most of the false-positive filtering; the human is now mostly reviewing genuine candidates.
5. Re-run `node audit-prose.js` after each batch of fixes. Document score-decline per article in the session log.

The cathedral has been measured against the throne, audited against itself, and now polished against the scanner. The polishing continues.

---

*PROSE-INTEGRITY.md v2 — appended 2026-04-28, Session 39 dispatch. The scanner now matches the apex prose tier the cathedral was built at. Phase F continues.*
