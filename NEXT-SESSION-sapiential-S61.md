# NEXT SESSION KICKOFF — S61 — Sapiential Deepening Run (continue the queue)

CONTEXT — This is the second leg of the Sapiential Deepening campaign. Aaron's standing directive (VOICE.md §XVI; CLAUDE.md; SAPIENTIAL-AUDIT.md): the whole site must reach the deepest, most profound prose conceivable — the register of Ravi Zacharias (the question beneath the question; the ache under the objection) and Malcolm Muggeridge (disillusioned clarity toward the world's idols; the eternal seen through the ordinary; the spare, devastating line). Excellence is the floor; **wisdom is the ceiling and the standard.** A page that argues correctly but leaves the reader merely persuaded — not *wiser* — is a regression. The cardinal guardrail: **depth comes from seeing more truly, NEVER from sounding grander.** Inflated diction is the counterfeit of wisdom — if a passage feels profound, check whether the *insight* deepened or only the *diction*; if only the diction, cut it.

S60 (last session) executed the S59 triage and deepened/consecrated 11 high-traffic Tier-1 pages (history-timeline + question-newheart full write-overs; 9 others). Tier 1 fell 107 → 96, Tier 2 rose 45 → 56. Your job: continue down the Tier-1 queue.

READ FIRST (in order): `SAPIENTIAL-AUDIT.md` — the rubric §I, the queue §III, and especially **§VI (the S60 execution log + the S61 next-read rotation = your work order)**. Then `VOICE.md §XVI` (the Sapiential Register) and `VOICE.md §XV` (translation transparency). Then `CLAUDE.md`.

PRIORITY 0 — Refresh, then sample-read. First run `node sapiential-audit.js` to regenerate the live Tier-1 ranking (it shifts as pages get consecrated). Then open with a Landing-Force + Sapiential sample-read of 5–8 pages — a mix of newly-CONSECRATED S60 pages (spot-check the locks held: `history-timeline`, `question-newheart`, `theologian-calvin`) and unread Tier-1 candidates. Any page that reads merely competent goes on the surgical-fix queue before new work proceeds. Locks are not exemptions.

THE WORK — live-read down Tier-1 pages 12–30 (NOT yet read as of S60), top-down by inbound. Pull in this order and record a verdict for each in `SAPIENTIAL-AUDIT.md §VI` as you go (PASS = consecrate as-is · NEAR-PASS = one light wisdom touch then consecrate · DEEPEN = full write-over):

1. `romans-9-deep-dive` (#12, ~6379w — the big one; read for whether the length earns its depth)
2. `analogy-lazarus-grave` (#13)
3. `systematic-ordo-salutis` (#14)
4. `systematic-effectual-calling` (#15)
5. `question-sealed` (#16)
6. `question-acts` (#17)
7. `systematic-compatibilism` (#18)
8. `ot-jacob-esau` (#19) — prime Muggeridge long-view candidate
9. `question-boasting` (#20)
10. then descend 21–30: `objection-fairness`, `history-luther`, `devotional-love-letter-before-time`, `demolition-prevenient-grace`, `theologian-luther`, `romans-8-28-39`, `broken-mirror-performance-treadmill`, `systematic-providence`, `systematic-trinity`, `psychology-anosognosia-of-sin`. (`history-luther` / `theologian-luther` are Muggeridge candidates; the `question-*`/`systematic-*` cluster is the Zacharias question-beneath register.)

Write-over (never Edit) for a full DEEPEN; light Edits are fine for a NEAR-PASS touch. Preserve each page's existing argument + canonical structure — deepen the *sight*, not the volume. Re-verify every `<a href>` on disk before saving. Sweep the recurring craft gap wherever you touch a page: **labelly H2 crescendos** (The Text / The Arguments / The Verdict / Analogies / A Final Objection) rewritten as escalating sentences (§I.3). Watch for **reused central images** (S60 found question-newheart had cloned cardiac-transplant's surgeon frame — re-spine onto a page-native image rather than duplicate).

CLOSE: re-run `node sapiential-audit.js`, then the build pipeline (`build-search-index`, `build-mega-menu`, `build-homepage-counts`, `build-sitemap`, `auto-linker`, `wire-orphans`, `build-related-articles`) and `node validate-site.js` (must be GREEN — 0 broken links, 0 orphans). Update `SAPIENTIAL-AUDIT.md §VI` with what you deepened + the S62 next-read rotation; add a MISSION-CONTROL session log entry (Session 61); print the copy-paste push command. Write the S62 kickoff prompt.

NON-NEGOTIABLES: NIV 2011 only; no "(NIV)" suffixes; §XV translation transparency (surface the Greek/Hebrew where the NIV under-translates the point a page argues — and fix any transliteration/grammar errors you find, as S60 did on question-newheart). Two-arms architecture (every page ends in the right arm) + In-Brief on-ramp. Consecrated pages get `<!-- CONSECRATED -->` right after `<article class="article-body">`. Verify edits saved (grep after writing). **Do not run any git commands** — Aaron pushes manually.
