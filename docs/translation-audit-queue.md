# Translation Audit — Genuine-Error Fix Queue (Audit A)

**Generated 2026-05-23.** Standard: **NIV 2011** (see CLAUDE.md / VOICE.md §XV).

## Method
`verify-scripture.js` (consistency, in the pipeline) + a one-off **NIV-1984 differ** (substring-match every site quotation against the full NIV 1984 text Aaron uploaded). The differ confirmed **1,461 of 2,682** quoted passages as verbatim-correct (verses identical across editions → matching 1984 = matching 2011). It flagged 860; a subagent adjudicated those into ~770 legitimate 2011 renderings, ~60 extractor-noise, and **~34 genuine errors** (ESV/KJV/paraphrase quoted as if NIV).

**Re-run the differ:** upload `NIVBible_1984.pdf` to the chat → `pdftotext -enc UTF-8 NIVBible_1984.pdf niv1984.txt` → run the differ script (archived in scratch `outputs/__niv1984_differ.js`). The de-wrapped `niv1984-flow.txt` lets you grep authoritative NIV-1984 readings for edition-identical verses.

## DONE (PDF-verified, edition-identical, fixed 2026-05-23)
Isaiah 45:22 (story-real-conversions), Psalm 51:10 (psychology-emotional-vs-rational), John 1:3 (systematic-trinity), Romans 1:17 (history-luther), Matthew 7:3 ×2 (psychology-cognitive-biases). Plus the earlier 18 NIV-exactness fixes + 1 John 5:1 resolution.

## ✅ REMAINING QUEUE — CLEARED IN SESSION 52 (2026-05-23)

**All items below were fixed**, each NIV 2011 reading verified first (edition-identical via the de-wrapped 1984 PDF `niv1984-flow.txt`; edition-divergent via per-verse Bible Gateway NIV lookups — Heb 9:27-28, Prov 12:15, Prov 22:6, Heb 11:1, Rom 8:6, Gen 6:5, John 3:3/3:5, Heb 5:7, Ps 30:5, Rom 11:6, Eph 1:3-6, Rom 8:15-17, Hab 2:13, Matt 7:6, Rom 3:11-12, Ps 139:1-4, Mark 4:12, John 12:24, Rom 9:21). The Ezekiel 36:26 `<a>`-tag-woven quotes (story-surgeon-stone-heart, counter-cs-lewis-free-will, compare-monergism-synergism) were restructured preserving links. Mark 4:12 fixed with a §XV Greek note (*mēpote* — NIV renders "otherwise," force is "lest").

**Additional same-class instances found beyond the listed files and ALSO fixed** (the misquotes had propagated): scripture-tsunami (Gen 6:5, Rom 9:21-23), devotional-adoption-papers + analogy-adoption (Rom 8:15-17), essays/you-cannot-escape-the-text + essays/the-two-graces (Eph 1:3-6), devotional-glory-of-divine-choice + devotional-chosen-before-you-were-broken (Eph 1:4), demolition-deut30-19 (Rom 3:11 paraphrase), argument-arminian-sermon-illustrations-refuted (Rom 9:22-23 — its Rom 9:20-21 nested-quote clay sentence LEFT for a future pass, needs v20 verification), essays/why-you-cant-remember (John 6:44 him→them, John 3:3), question-cannot (John 3:3, John 3:5).

**🔴 CORRECTION — Romans 7:18 (was in UNCERTAIN): the queue's assumption was BACKWARDS.** Web-verified NIV 2011 Rom 7:18 main text = "...that is, in my **sinful nature**" (footnote: *Or my flesh*) — NOT "in my flesh." So the 3 files using "in my sinful nature" (essays/why-you-cant-remember, devotional-good-i-cannot-do, broken-mirror-sin-you-repeat) are CORRECT for 2011 and were LEFT untouched; scripture-tsunami's "in my flesh" is the footnote reading, left in place. This conflicts with CLAUDE.md's general "avoid sinful-nature-for-sarx" guidance, so **Rom 7:18 is flagged for Aaron's adjudication** (not changed this session). John 6:67 and Gen 8:21 confirmed already-correct.

## REMAINING QUEUE (ARCHIVED — all cleared Session 52) — verify each NIV 2011 reading before fixing (do NOT apply from memory)
For **edition-identical** verses, grep `niv1984-flow.txt` for the authoritative reading. For **edition-divergent** verses (gender language, "sinful nature"→"flesh", reworded), the 1984 PDF is NOT the standard — confirm the 2011 via a per-verse lookup (as with 1 John 5:1).

Grouped by file (the 5 hotspots first):

### theologian-whitefield.html
- **Hebrews 9:27-28** — pure KJV ("as it is appointed unto men once to die…") → NIV 2011 ("Just as people are destined to die once, and after that to face judgment, so Christ was sacrificed once to take away the sins of many; and he will appear a second time, not to bear sin, but to bring salvation to those who are waiting for him."). [edition-divergent: man→people]

### secular-economics-depravity.html
- **Genesis 6:5** (×2) — ESV "every intention…only evil continually" → NIV "every inclination of the thoughts of the human heart was only evil all the time." [verify 2011]
- **Romans 3:11-12** — ESV "No one seeks for God. All have turned aside…worthless…" → NIV "there is no one who understands; there is no one who seeks God. All have turned away…become worthless; there is no one who does good, not even one."
- **Proverbs 12:15** — ESV "The way of a fool is right in his own eyes, but a wise man listens to advice." → NIV "The way of fools seems right to them, but the wise listen to advice."

### secular-art-literature-reformed-truth.html
- **Genesis 6:5** — ESV "only evil continually" → NIV (as above).

### psychology-cognitive-biases.html
- **Matthew 7:6** — ESV "Do not give dogs what is holy…pearls before pigs, lest they trample…turn to attack you." → NIV "Do not give dogs what is sacred; do not throw your pearls to pigs. If you do, they may trample them under their feet, and turn and tear you to pieces."
- **Proverbs 12:15** — (as above).
- **Proverbs 22:6** — KJV "Train up a child…he will not depart from it." → NIV 2011 "Start children off on the way they should go, and even when they are old they will not turn from it." [edition-divergent]

### psychology-emotional-vs-rational.html
- **Hebrews 11:1** — ESV "assurance of things hoped for, the conviction of things not seen" → NIV "Now faith is confidence in what we hope for and assurance about what we do not see."
- **Romans 8:6** — ESV "to set the mind on the flesh is death…" → NIV "The mind governed by the flesh is death, but the mind governed by the Spirit is life and peace."

### compare-monergism-synergism.html
- **John 1:12-13** — ESV "Born, not of blood nor of the will of the flesh nor of the will of man, but of God" → NIV "children born not of natural descent, nor of human decision or a husband's will, but born of God."

### Other files
- **story-the-orphanage.html** — Romans 3:11 "there is none who seeks God" → NIV "there is no one who seeks God."
- **compare-every-decision-point.html** — Romans 3:11 (ESV) → NIV (as above).
- **story-surgeon-stone-heart.html** — Ezekiel 36:26 (ESV; NOTE: woven with `<a>` tags — restructure carefully) → NIV "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh." [PDF-verified reading]
- **counter-cs-lewis-free-will.html** — Ezekiel 36:26 (ESV) → NIV (as above). [PDF-verified]
- **analogy-lazarus-grave.html** — John 10:14 ESV/NASB "I know My own and My own know Me" → NIV "I am the good shepherd; I know my sheep and my sheep know me."
- **broken-mirror-not-self-made.html** — Romans 9:22-23 ESV "vessels of wrath…vessels of mercy" → NIV "objects of his wrath…objects of his mercy" ("bore with great patience").
- **question-parables.html** — Mark 4:12 ESV → NIV "so that, 'they may be ever seeing but never perceiving…' otherwise they might turn and be forgiven!"
- **psychology-fear-control.html** — John 12:24 ESV "grain of wheat…earth…bears much fruit" → NIV "kernel of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds."
- **pastoral-prayer.html** — Hebrews 5:7 ESV "In the days of his flesh…supplications…" → NIV "During the days of Jesus' life on earth, he offered up prayers and petitions with fervent cries and tears to the one who could save him from death, and he was heard because of his reverent submission."
- **open-wound-sovereignty-in-grief.html** — Psalm 30:5 ESV "Weeping may tarry…joy comes with the morning" → NIV "weeping may stay for the night, but rejoicing comes in the morning."
- **question-psalm139.html** — Psalm 139:1-4 ESV → NIV ("you perceive my thoughts from afar…before a word is on my tongue you, LORD, know it completely").
- **story-hard-hitting-the-drowning-man.html** — John 3:3 ESV/word-order → NIV "no one can see the kingdom of God unless they are born again." [edition-divergent: he→they]
- **argument-if-arminianism-true-consequences.html** — Habakkuk 2:13 "Is not the LORD Almighty determined…" → NIV "Has not the LORD Almighty determined…"
- **story-the-person-who-chose-god.html** — Romans 11:6 paraphrase → NIV "And if by grace, then it cannot be based on works; if it were, grace would no longer be grace." (the site's own correct rendering is in apologetic-the-remnant-chosen-by-grace.html)
- **systematic-soteriology.html** — Romans 8:15 ESV "Spirit of adoption as sons" → NIV "The Spirit you received brought about your adoption to sonship. And by him we cry, 'Abba, Father.'"
- **systematic-trinity.html** — Ephesians 1:4 ESV "adoption as sons…holy and blameless before him" → NIV "to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ."

## UNCERTAIN — verify before touching
John 6:67; Romans 7:18 ("in my sinful nature" = 1984 holdover → 2011 "in my flesh"); John 8:34-36 (conflation); Matthew 12:31; Job 42:3-6; Genesis 8:21 (apologetic-only-evil-all-the-time — likely fine).

## Residual gaps (this method cannot catch)
Single-instance quotes of edition-divergent verses that read correctly in 2011 but not 1984 (cleared as bucket A) — fully definitive only with a licensed NIV 2011 corpus to diff against.
