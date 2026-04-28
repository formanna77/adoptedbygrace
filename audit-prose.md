# Prose Integrity Audit (Phase F) — Scanner v2

**Generated:** 2026-04-28T06:26:20.217Z
**Spec:** `audit-prose.js v2` — redundancy (Jaccard ≥ 0.35 on significant-word bags) with **eight-class exemption filter** (closing-recurrence, Scripture-tsunami, pedagogical-anaphora, antithetical-parallelism, confessional-translation, historical-document-quotation, exegetical-comparison, research→pairing structural) + sentence-coherence heuristic with **anaphora/chiasm/embedded-quotation positive suppressors** + new **vehicle-tenor mismatch detector** (catches the original Aaron failure mode: simile whose vehicle and tenor are in incompatible domains).

**Mandate (Aaron, 2026-04-27):** "many articles repeat themselves usually a couple times but sometimes even 3 times within the article... also some sentences don't make sense... we do not start expanding the website until every last sentence, paragraph, and article are written perfectly."

**v2 design goal (Aaron, 2026-04-28):** "robust and comprehensive as well as efficient and effective." The v2 scanner suppresses apex-tier false positives at the eight known exemption classes while adding a dedicated detector for the failure mode that triggered Phase F (vehicle-tenor mismatch in similes — the broken-roof-being-lifted-off failure).

---

## §I — Aggregate

| Metric | Value |
|---|---|
| Articles audited | 502 |
| Articles entirely clean | 170 (33.9%) |
| Articles with (genuine) redundancy | 15 (3.0%) |
| Articles with (genuine) flagged sentences | 324 (64.5%) |
| **Total redundancy pairs flagged (genuine)** | **16** |
| **Total sentences flagged (genuine)** | **729** |
| Redundancy pairs suppressed (apex-tier exemptions) | 19 |
| Sentence flags suppressed (coherence-positive) | 101 |

### Suppression breakdown by exemption class

| Class | Pairs suppressed |
|---|---:|
| scripture-tsunami | 10 |
| confessional-translation | 6 |
| pedagogical-anaphora | 2 |
| antithetical-parallelism | 1 |

**Composite score** = redundancy_pairs × 2 + flagged_sentences. Articles ranked by descending score below.

---

## §II — Top 50 Most Broken Articles (Rebuild Queue, post-suppression)

1. **canons-of-dort-plain-english.html** — score 28 (0 redundancy pairs, 28 flagged sentences, 98 paragraphs) *[1 pairs + 11 sentences auto-suppressed]*
2. **response-jerry-walls.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 63 paragraphs)
3. **argument-cost-of-being-wrong.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 63 paragraphs)
4. **story-dark-the-rope-you-wove-yourself.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 49 paragraphs)
5. **theologian-augustine.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 43 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
6. **theologian-gottschalk.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 28 paragraphs)
7. **ot-joseph.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 26 paragraphs)
8. **systematic-covenant-redemption.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 61 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
9. **systematic-effectual-calling.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 35 paragraphs)
10. **westminster-chapter-3-plain-english.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 93 paragraphs) *[5 pairs + 2 sentences auto-suppressed]*
11. **demolition-romans2-4.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 22 paragraphs)
12. **devotional-i-cant-feel-god.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 44 paragraphs)
13. **devotional-joy-of-election.html** — score 5 (1 redundancy pair, 3 flagged sentences, 52 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
14. **devotional-the-hands-that-hold-you.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 32 paragraphs)
15. **devotional-the-secretly-ashamed.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 36 paragraphs)
16. **devotional-valley-shadow.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 38 paragraphs)
17. **history-open-theism.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 27 paragraphs)
18. **history-spurgeon-downgrade.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 22 paragraphs)
19. **letters-senior-demon-arminianism.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 49 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
20. **philosophy-adam-test.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 42 paragraphs)
21. **question-chosen.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 37 paragraphs)
22. **question-predestined-to-hell.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 45 paragraphs)
23. **question-revelation13.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 30 paragraphs) *[1 pairs + 1 sentences auto-suppressed]*
24. **response-william-lane-craig.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 57 paragraphs)
25. **romans-9-deep-dive.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 82 paragraphs)
26. **story-the-garden-that-grew-itself.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 42 paragraphs)
27. **systematic-prolegomena.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 28 paragraphs)
28. **theologian-bradwardine.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 29 paragraphs)
29. **analogy-song-you-didnt-compose.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 41 paragraphs)
30. **counter-cs-lewis-free-will.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 33 paragraphs)
31. **demolition-1cor15-22.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 35 paragraphs)
32. **demolition-2peter3-15.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 24 paragraphs)
33. **demolition-acts17-30.html** — score 4 (2 redundancy pairs, 0 flagged sentences, 35 paragraphs)
34. **devotional-forever-loved.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 35 paragraphs) *[1 pairs + 0 sentences auto-suppressed]*
35. **history-council-of-orange.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 37 paragraphs)
36. **history-every-revival-sovereign-grace.html** — score 4 (1 redundancy pair, 2 flagged sentences, 24 paragraphs)
37. **invisible-wall-prayer-feels-empty.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 48 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
38. **joy-freedom-of-smallness.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 31 paragraphs)
39. **ot-israel-chosen.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 21 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
40. **ot-jonah.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 30 paragraphs)
41. **psychology-comfort-self-salvation.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 24 paragraphs)
42. **question-boasting.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 36 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
43. **question-titus3.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 29 paragraphs)
44. **response-andy-stanley.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 38 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
45. **response-dave-hunt.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 53 paragraphs)
46. **response-leighton-flowers.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 61 paragraphs)
47. **response-roger-olson.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 41 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
48. **response-sbc-traditional-statement.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 57 paragraphs)
49. **story-tender-the-letter-already-written.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 36 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
50. **systematic-common-grace.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 56 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*

---

## §III — Per-Article Detail (Top 30 by score)

### canons-of-dort-plain-english.html — score 28

**Flagged sentences (28):**

- [long:52w] (¶2): "The Canons of Dort are structured in Five Heads of Doctrine . (The Third and Fourth heads are combined into one section in the original  —  because the Synod saw them as two halves of the same argumen…"
- [long:57w] (¶13): "Article 7 (plain English): Election is the unchangeable purpose of God, by which, before the foundation of the world, He chose, from the whole human race (which had fallen from original integrity into…"
- [long:56w] (¶13): "So, in order to actually save them, He also determined to give them to Christ, effectively call them, draw them into fellowship with Christ by His Word and Spirit, grant them true faith in Him , justi…"
- [long:53w] (¶15): "Scripture teaches that there is one good pleasure, one purpose, one plan of God  —  according to which He has elected us from eternity both to grace and to glory, to salvation and to the way of salvat…"
- [long:51w] (¶21): "Article 13 (plain English): In their awareness and assurance of this election, the children of God find daily reason to humble themselves before Him, to adore the depth of His mercies, to cleanse them…"
- [long:102w] (¶23): "Article 14 (plain English): Just as this teaching of divine election, by the most wise counsel of God, was proclaimed through the prophets, Christ Himself, and the apostles, and handed down in the Hol…"
- [long:77w] (¶25): "Out of His completely free, most just, irreprehensible, and unchangeable good pleasure, God has decreed to leave them in the common misery into which they have, by their own fault, plunged themselves;…"
- [long:73w] (¶27): "Article 16 (plain English): Those who do not yet actively feel a living faith in Christ , or an assured confidence in their soul, peace of conscience, serious effort at childlike obedience, and gloryi…"
- … and 20 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 redundancy pair suppressed: confessional-translation
- 11 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### response-jerry-walls.html — score 9

**Flagged sentences (9):**

- [long:108w] (¶11): "The Reformed have always taught that there are at least three distinct loves of God in Scripture, all of them genuine: (a) love of benevolence  —  the love that creates, sustains, and restrains evil f…"
- [long:82w] (¶18): "If you derive your standard of love from Scripture itself  —  from a God who chooses Israel out of all nations not because they were better but because of love (Deuteronomy 7:7-8), who hardens Pharaoh…"
- [long:50w] (¶23): "Walls  —  a brilliant, sincere, rigorous Christian philosopher  —  has stated publicly that he would prefer eternal conscious torment, separated forever from the love of God, to eternal joy in the unm…"
- [long:46w] (¶32): "And so Walls is forced into a move that quietly unravels his whole system: the saints in heaven are confirmed by grace in such a way that they cannot fall  —  but this is exactly what the Reformed hav…"
- [long:47w] (¶36): "He begins with philosophical commitments  —  libertarian free will is constitutive of personhood, divine love must be univocal across contexts, hell must be morally intelligible by human moral standar…"
- [long:48w] (¶48): "To find that the will you protected with such ferocity is the very thing that needed to die so that the will God gave back to you in Christ  —  the will whose deepest delight is to be moved by Him  — …"
- [long:56w] (¶54): "And we know  —  we know from the inside  —  that the only thing that finally moved us was God Himself, breaking the fortress and walking into the rubble, and giving us back a freedom we had never know…"
- [long:49w] (¶55): "And we pray for every reader of Walls who feels the resonance of his confession  —  that the God who never let any of us go will, in His own time, in His own way, walk into the fortress of your autono…"
- … and 1 more.

### argument-cost-of-being-wrong.html — score 8

**Flagged sentences (8):**

- [long:47w] (¶0): "If Arminianism is true and you believed sovereign grace, you have lived for years giving God credit for gifts He didn't quite give, thanked Him for a salvation that was actually co-produced with your …"
- [direction-mismatch:\b(rose|rising|ascended|climbing|climbed] (¶18): "Your assurance rose and fell with your performance.…"
- [long:60w] (¶20): "When you say it now, out of the new theology, it reads differently: the pull you felt in the back of the sanctuary; the verse that lit up in chapel that morning; the death of your uncle that loosened …"
- [long:48w] (¶27): "Even in the best case where Arminianism is true and you believed it, you live inside a smaller comfort and a smaller God  —  because the God you believe in cannot be bigger than the system you hold, a…"
- [long:49w] (¶41): "If sovereign grace is true and the church believes Arminian, the pulpit under-preaches the Bible's highest doctrine, the pews under-rest in assurance, the prayer meetings ask for less than God offers,…"
- [long:50w] (¶42): "If Arminianism is true and the church believes sovereign grace, the pulpit risks occasionally over-attributing the Spirit's work, the pews risk a quiet passivity ("God will bring them home whether I g…"
- [long:51w] (¶60): "And when the demolition is done, walk into the devotional on the God who never gives up , because the God whose glory the ledger is defending is the Father who has been running toward you, against eve…"
- [long:52w] (¶61): "The same honesty, pressed a layer deeper into the Christian story, requires not merely faith but sovereign faith  —  faith in a God whose rescue is entire, whose grace is irreversible, whose love chos…"

### story-dark-the-rope-you-wove-yourself.html — score 8

**Flagged sentences (8):**

- [padding-modifier:in the dark] (¶0): "The man fell into the well in the dark, and so for many years he did not know how he had fallen.…"
- [padding-modifier:into the dark] (¶20): "He saw it stretching down into the dark below him.…"
- [long-simile:13w] (¶22): "The few rough strips he had torn from his shirt were there, yes  —  woven in, here and there, like a child's clumsy stitching set into a tapestry  —  but they bore no weight.…"
- [padding-modifier:in the dark] (¶27): "It had been lowered in the dark, where he could not see, and woven onto whatever scraps he had been working on, and quietly, every night, made longer than his weaving had made it.…"
- [padding-modifier:in the dark] (¶31): "He had been working, all those years in the dark, on the speech he would give at the top.…"
- [long:56w] (¶33): "The speech is your kindergarten artwork that you were going to present, with great seriousness, to the gallery  —  only to discover that the gallery is full of canvases you did not paint, and the rope…"
- [long:46w] (¶35): "This is the moment when the mirror finally shows you what you were  —  not a hero who climbed out, but a man who was lifted out by hands he did not see, who all that time mistook the lifting for a wor…"
- [padding-modifier:in the dark] (¶43): "The work you did in the dark  —  the desperate, brave, painful, real work of trying to get out  —  was not wasted, but it was not what saved you.…"

### theologian-augustine.html — score 8

**Flagged sentences (8):**

- [long:55w] (¶3): "He goes into the house and tells Monica, and Monica  —  who has been praying through his adolescence and through his Manichaean phase and through his mistress and through his ambition  —  weeps harder…"
- [long:49w] (¶4): "By twenty he has found Manichaeism, a dualist cult that assures him his warring flesh is not his fault  —  there is a bad substance in him and a good substance, and they are at war, and if he could ju…"
- [long:51w] (¶17): "Every prayer she offered, every tear she wept over her son's running, every candle she lit in the dark of the North African night  —  she was writing, into the deep tissue of his unconscious, one sent…"
- [long:58w] (¶20): "Fifteen years after the garden, a British monk named Pelagius arrived in Rome and began teaching that the human will is morally neutral, that sin is an accumulation of bad habits rather than an inheri…"
- [long:50w] (¶28): "What remains standing is a salvation entirely of God , which is the only kind that ever worked in the first place, which is the only kind Scripture ever taught, and which is the only kind that can rea…"
- [long:52w] (¶35): "You have to let yourself be held  —  and even the letting is His gift, reached into you by the same hand that reached into the garden and broke whatever was broken in the will of a rhetorician with a …"
- [long:46w, padding-modifier:in the dark] (¶36): "The Spirit who hovered over the chaos at creation hovered over the chaos in Augustine's chest, regenerated the dead heart, illumined the page of Romans, and sealed for the day of redemption a man who …"
- [long:48w] (¶40): "We confess that every prayer Monica prayed, and every prayer you have ever prayed, and every prayer you will ever pray, is a sound the Spirit Himself has put in our throats  —  that we might pray it b…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### theologian-gottschalk.html — score 8

**Flagged sentences (8):**

- [long:57w] (¶18): "The message is that you "choose Jesus." You "invite Him into your heart." You "make a decision." And anyone who stands up and says what Gottschalk said  —  that your choice is itself a gift of God , t…"
- [long:74w] (¶20): "Box A: A sovereign God who had set His love on Gottschalk before the foundation of the world was actively, moment by moment, hour by hour, year by year, sustaining a faith that Gottschalk could not ha…"
- [long:66w] (¶20): "Box B: Gottschalk possessed an uncommon strength of will the rest of us happen to lack  —  a moral fiber, a backbone, a constitution  —  that allowed him to outlast the cell on his own steam, and the …"
- [long:46w] (¶26): "There is a piece of parchment on the floor  —  smuggled in, perhaps, by a sympathetic novice  —  and on it, in ink mixed with ash, he is composing what will be one of his last sentences in defense of …"
- [padding-modifier:in the dark] (¶26): "Outside the slit window, somewhere in the dark, a bell is ringing for compline, and he can hear, faintly, the brothers chanting an antiphon he taught them as a young man.…"
- [padding-modifier:in the silence] (¶26): "And in the silence between the words of the chant drifting in through the stones, he is  —  with absolutely no audience, no expectation of vindication, no posthumous fame he can imagine  —  still argu…"
- [long:50w] (¶27): "The question is: what kind of God is real, if a man you have never met held a sentence under torture for twenty years so that you, in your warm room, scrolling on your screen at this very hour, could …"
- [padding-modifier:in the dark] (¶27): "The same Hand that held Gottschalk in the dark is the Hand that is holding you in your light .…"

### ot-joseph.html — score 7

**Flagged sentences (7):**

- [long:49w] (¶0): "After decades of betrayal, slavery, false accusation, and imprisonment  —  after Joseph has risen from the pit to the right hand of Pharaoh and his terrified brothers stand before him begging for merc…"
- [long:72w] (¶5): "The flesh has a deeply trained reflex that fires the moment Scripture insists God is more sovereign over our suffering than we are comfortable allowing  —  because if God genuinely governs the pit, th…"
- [long:47w] (¶14): "The parallels between Joseph and Christ are so precise they cannot be accidental: beloved son, betrayed by his own, sold for silver, falsely accused, innocent suffering, raised from the pit, exalted t…"
- [long:70w] (¶19): "Box A: The cross was sovereignly purposed before the foundation of the world by the same Father who, in Joseph's words, devised good through the evil men did, and the very chashav that governed the pi…"
- [long:48w] (¶19): "Box B: The cross was the unforeseen tragedy God responded to creatively after the fact  —  Pilate's decision, the Sanhedrin's decision, Judas's decision, all genuinely outside the divine decree, and G…"
- [long:49w] (¶23): "And the God who sent Joseph through slavery to save a nation is the same God who chose you before the foundation of the world  —  and who is working every detail of your life, including the parts that…"
- [long:48w] (¶24): "He does not know there will be a famine, or a reunion, or a sentence about what they meant and what God meant, or a son named Manasseh, or a tomb in Shechem, or a coffin carried out of Egypt four hund…"

### systematic-covenant-redemption.html — score 6

**Flagged sentences (6):**

- [long:51w] (¶5): "The answer is the covenant of redemption  —  what Reformed theologians have called the pactum salutis , the Latin for "covenant of salvation." It is the eternal agreement among the Father, Son, and Ho…"
- [padding-modifier:in the silence] (¶7): "And it means that your name  —  if you are in Christ  —  was spoken in the silence before starlight, when the Three were one and already agreeing on the rescue that would unfold through galaxies and m…"
- [long:57w, long-simile:21w] (¶14): "Read the whole chapter with this in mind and it reads like a legal proceeding  —  the Son reporting back to the Father that He has completed the work He was sent to do, that He has kept every one entr…"
- [long:52w] (¶17): "Ephesians 1 is Paul's breathless attempt to trace salvation back to its ultimate source, and what he finds there is not a divine whim  —  he finds a plan , a purpose , a mystery of his will , an etern…"
- [long:70w] (¶23): "The phrase translated "harmony between the two" is in Hebrew the ʿatsath shalom  —  literally, "a counsel of peace." Reformed theologians from Witsius to Herman Bavinck have pointed here: between the …"
- [long:111w] (¶60): "→ Unconditional election  —  the decree that flows directly from this covenant. → Federal headship  —  the doctrine that explains why the covenant applies to you specifically. → Imputation  —  the mec…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### systematic-effectual-calling.html — score 6

**Flagged sentences (6):**

- [long:48w] (¶1): "And by Tuesday afternoon, one hundred and ninety-eight have forgotten it ever happened, one is irritated and tells a friend the pastor was too intense, and one cannot stop weeping because something in…"
- [long:52w] (¶26): "If your salvation depended on your continued ability to keep responding well to the general call  —  to keep hearing it, keep wanting it, keep reaching for it  —  then any week of dryness, any month o…"
- [long:53w] (¶27): "But if the effectual call is what brought you in  —  if the voice you heard underneath the sermon was not the pastor's but the One who speaks galaxies into being and calls dead Lazarus from the tomb  …"
- [long:52w] (¶32): "If you have read this far, and something in you is leaning forward  —  if there is a recognition rising in your chest that this might be the truest description of your own conversion you have ever enc…"
- [long:58w] (¶33): "He spoke into the silence of your spiritual tomb, and you came out, blinking and bewildered, with the grave clothes still hanging from you, into a world you did not make, held by a Father you did not …"
- [long:56w] (¶34): "And on the last day, when His voice calls one more time  —  not to your soul, but to the dust of your body  —  you will rise out of that grave for the same reason you rose out of the first one: becaus…"

### westminster-chapter-3-plain-english.html — score 6

**Flagged sentences (6):**

- [long:50w] (¶17): "God's decree is not based on foreknowledge , because foreknowledge (in the Arminian sense) would require a future to already exist for God to look at  —  which would mean the future exists independent…"
- [long:53w] (¶33): "Plain English: The human beings God has predestined to life were chosen by Him in Christ , before the foundation of the world, in accordance with His eternal and unchangeable purpose and the secret co…"
- [long:47w] (¶40): "Therefore: the elect, though fallen in Adam, are redeemed by Christ , are effectually called to faith in Christ by the Spirit's work in His own time , are justified , are adopted , are sanctified , an…"
- [long:73w] (¶47): "Plain English: As for the rest of mankind  —  those not elected  —  God was pleased, according to the unsearchable counsel of His own will (the same counsel by which He freely extends or withholds mer…"
- [long:47w] (¶54): "Original: "The doctrine of this high mystery of predestination is to be handled with special prudence and care, that men, attending the will of God revealed in His Word, and yielding obedience thereun…"
- [long:53w] (¶77): "You have a salvation that is to the praise of His glorious grace  —  meaning you will spend eternity not pointing to your decision but to His decree, not boasting in your perseverance but in His faith…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 5 redundancy pairs suppressed: confessional-translation
- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### demolition-romans2-4.html — score 5

**Flagged sentences (5):**

- [long:59w] (¶9): "If something inside the will determines the choice (a natural inclination, a spiritual sensitivity, a softness of heart), then those qualities are themselves either gifts of God (in which case God eff…"
- [long:46w] (¶11): "The doctrine was systematically formulated by Jacobus Arminius and his disciples in the late 16th and early 17th centuries, refined by John Wesley in the 18th, and only became the standard evangelical…"
- [long:48w] (¶18): "If you have used Romans 2:4 to reassure yourself that God has enabled your free will to choose Him  —  that you are safe because grace has done its preparatory work and now the ball is in your court  …"
- [long:61w] (¶18): "The longer you assume God's kindness has put you in a position to decide, the longer your heart hardens against the only thing that can actually save you: the discovery that you cannot decide, that yo…"
- [long:64w] (¶19): "If God's kindness has actually been leading you to repentance  —  if you find yourself softening as you read this, if the moralist Paul is describing makes you uncomfortable in a way you cannot dismis…"

### devotional-i-cant-feel-god.html — score 5

**Flagged sentences (5):**

- [padding-modifier:in the dark] (¶14): "You are grieving a warmth you cannot summon and a Voice you cannot hear and a nearness you cannot feel, and the grief itself is so sharp you are willing to read a devotional in the dark to make sense …"
- [padding-modifier:in the dark] (¶14): "That is the behavior of a child who has been held and now, in the dark, cannot tell where the hand went, and is terrified because the hand was the thing.…"
- [abstract-simile:like a memory] (¶33): "My faith feels like a memory of something I used to have.…"
- [padding-modifier:in the dark] (¶35): "So hold me in the dark.…"
- [long:47w, long-simile:19w] (¶42): "And in the morning, when the cold mug is in the sink and the sun is coming through the blinds and you are brushing your teeth like a person who does not remember why she was weeping just hours ago  — …"

### devotional-joy-of-election.html — score 5

**Redundancy pairs (1):**

- Paragraphs 22 ↔ 42 (similarity 0.52)
  - A: ""For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future…"
  - B: "That is joy. That is the joy. And nothing — not death, not life, not angels, not demons, not the present, not …"

**Flagged sentences (3):**

- [long:50w] (¶3): "When the truth of sovereign grace first landed  —  when I first understood that God chose His people before the foundation of the world , that faith itself is a gift , that the most important choice i…"
- [long-simile:19w] (¶31): "Like a child picked up by a Father who is strong enough to carry you and kind enough to want to.…"
- [long:59w] (¶39): "And when it comes  —  when the gravity of election finally settles, when the terror gives way to wonder, when you stop seeing sovereign grace as the truth that stole your autonomy and start seeing it …"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### devotional-the-hands-that-hold-you.html — score 5

**Flagged sentences (5):**

- [padding-modifier:in the dark] (¶3): "Maybe it was the night you prayed and heard nothing but your own voice echoing in the dark.…"
- [long:48w] (¶7): ""To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy  —  to the only God our Savior be glory, majesty, power and authority, t…"
- [long:60w] (¶21): "To let go is to admit that the entire performance was unnecessary  —  that the God who set the universe in motion was not standing on the riverbank waiting for you to grab the rope, that He had alread…"
- [long:47w] (¶24): "And the One on the other end of it has not let go in eternity past, will not let go in eternity future, and is not going to let go now just because you finally noticed that He was the one with the gri…"
- [long:54w] (¶28): "And cradled between those two hands moves the breath of the Holy Spirit  —  the Spirit who regenerated your dead heart, gave you the very faith you have, seals you for the day of redemption, and whose…"

### devotional-the-secretly-ashamed.html — score 5

**Flagged sentences (5):**

- [long:56w] (¶5): "It looks like rehearsing a confession in your car on the way to meet your accountability partner and then, when you sit down across from them, saying "It's been a pretty good week." It looks like open…"
- [long-simile:21w] (¶5): "It looks like a sermon on James 5:16  —  confess your sins to one another  —  and your whole body going rigid in the pew, as if the pastor might somehow say your name.…"
- [padding-modifier:in the dark] (¶30): "Hold me in the dark.…"
- [padding-modifier:in the dark] (¶32): "Not because He is a prison guard, but because He is a Father who refuses to let His child sit alone in the dark.…"
- [padding-modifier:in the dark] (¶33): "And for the first time in a long time you notice something you have been too ashamed to notice: there is someone sitting across from you in the dark.…"

### devotional-valley-shadow.html — score 5

**Flagged sentences (5):**

- [padding-modifier:in the dark] (¶2): "He does not say, "I will never enter the valley." He does not say, "God will lift me over it." He does not say, "If I have enough faith, the valley disappears." He says  —  with the calm of a man who …"
- [abstract-simile:like a creed recited from memory] (¶8): "He restores my soul." The Shepherd is present, but described at a distance  —  like a truth in a textbook, like a creed recited from memory, like a doctrine affirmed in the light.…"
- [padding-modifier:in the dark] (¶18): "Nothing in all creation  —  nothing in the valley, nothing in the dark, nothing in death itself  —  can separate you from the love of God in Christ Jesus.…"
- [padding-modifier:in the dark] (¶22): "Because if it was  —  if you generated it, if you sustain it, if it rises and falls with your emotional bandwidth  —  then you are about to discover that none of it has any power to hold you up in the…"
- [long:61w] (¶35): "It is the floor of a room where One who neither slumbers nor sleeps is watching over a child He chose before the stars were made, bought with blood He counted the cost of in eternity past, and will no…"

### history-open-theism.html — score 5

**Flagged sentences (5):**

- [long-simile:27w] (¶0): "But something about it keeps scratching at the back of your skull like a loose screw behind drywall: if God didn't cause this  —  if He is as surprised by it as you are  —  then who is running the roo…"
- [long:56w] (¶3): "Their argument was devastatingly simple: if you really believe  —  as classical Arminianism has always claimed  —  that human beings have libertarian free will , that God never coerces a decision, and…"
- [padding-modifier:in the dark] (¶11): "You are confessing that the God you actually need in the dark is not the one your theology advertises in the daylight.…"
- [long:46w] (¶17): "For anyone with eyes to see, the choice is now starkly clear: either you worship the God of Scripture, who declares the end from the beginning, or you worship the limited-knowledge god of open theism …"
- [long:63w] (¶24): "Because you can hear a different sentence now  —  older, steadier, coming not from the hallway but from somewhere underneath the floor of the room, underneath the foundation of the building, underneat…"

### history-spurgeon-downgrade.html — score 5

**Flagged sentences (5):**

- [long:47w] (¶8): "He called for the Baptist Union to adopt a clear confession of faith  —  not something exotic, just a reaffirmation of what Christians had believed for eighteen centuries: biblical inerrancy , the dei…"
- [padding-modifier:in the dark] (¶13): "The God who pursued him across a snowy morning in Colchester is the God who would still be holding him in the dark when half of Christian England turned away.…"
- [long:52w] (¶17): "Spurgeon's life calls us to something higher  —  not grim determination, but the overflowing joy of standing on truths that outlast every fashion, every compromise, and every fog that settles over the…"
- [long:46w] (¶20): "All that was left in the last year was for a tired body to lie down, and for the Shepherd who had been carrying him the whole time to finally set him down in the country he had been walking toward sin…"
- [long:52w] (¶21): "You need only to notice the hand that has been holding you  —  the hand that was already there on the snowy morning you thought was your own idea, the hand that is here now as you read this  —  and to…"

### letters-senior-demon-arminianism.html — score 5

**Flagged sentences (5):**

- [long:52w] (¶2): "It is the single most useful doctrine we have ever persuaded them to carry into the sanctuary: the notion that somewhere in the wreckage of their fallen faculties there still exists a sovereign little…"
- [long:55w] (¶5): "You ask what to do if he ever stumbles on the uncomfortable passages  —  the valley of dry bones , who certainly did not choose to reassemble themselves; the corpse in Ephesians 2, who certainly did n…"
- [long:51w] (¶13): "And he will begin to remember  —  and this you must at all costs prevent  —  the patient's own conversion: the strange pull he could not explain, the Scripture that ambushed him, the inability to stop…"
- [long:47w] (¶19): "And if the patient ever sees himself as he actually was before the Enemy raised him  —  inert, unable, unwilling, hostile to the very idea of the Enemy  —  he will know with unbearable clarity that hi…"
- [long:57w] (¶33): "Inform him that if the Enemy chose him and drew him and gave him the faith itself, then he was a robot , a puppet, a meat-marionette jerking on predetermined strings; and no one can love a robot; ther…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### philosophy-adam-test.html — score 5

**Flagged sentences (5):**

- [long:65w] (¶13): "You are claiming that your will, operating in a fallen body, dragging a sin nature inherited from this same Adam, surrounded by a corrupted world, deafened by competing voices, blinded by your own sel…"
- [long-simile:18w] (¶15): "It would be like a quadriplegic in a hospital bed insisting he can outrun an Olympic sprinter who tripped at the starting line.…"
- [long:46w] (¶23): "And here is the part nobody wants to face: if Adam, standing on the high ground of sinlessness , could not maintain his footing, then those of us standing on the rubble below him have exactly zero hop…"
- [long:47w] (¶32): "(b) You concede that even unfallen will did not save Adam, and therefore something other than human will must be the cause of every salvation that has ever occurred  —  which is the doctrine of sovere…"
- [long:51w] (¶35): "The story you may have been telling yourself  —  that you chose God, that your sincerity was the deciding factor, that the difference between you and the unsaved is something inside you  —  that story…"

### question-chosen.html — score 5

**Flagged sentences (5):**

- [padding-modifier:in the dark] (¶9): "A surveyor walking the edge of a plot of land in the dark, driving stakes into the ground before the owner arrives.…"
- [long:49w] (¶10): "There is a small catch somewhere  —  at the base of the throat, or between the shoulder blades, or just under the sternum  —  the part of you that has been sure, for as long as you can remember, that …"
- [long:47w] (¶31): "Let it be what it actually is: the Father of Jesus Christ, looking at you across the whole span of creation, and saying  —  before He made a single molecule of the universe He was about to give you to…"
- [long:49w] (¶32): "You are loved by the kind of love that set a universe in motion just so it could eventually find you in an ordinary room, reading an ordinary screen, on an ordinary Tuesday, with the ordinary ache in …"
- [long:52w] (¶33): "And the entire story of redemption  —  Egypt, Sinai, Bethlehem, Calvary, the empty tomb, the Spirit poured out, the book you are reading right now, the quiet stirring under your ribs as you read these…"

### question-predestined-to-hell.html — score 5

**Flagged sentences (5):**

- [padding-modifier:in the dark] (¶1): "The ceiling is somewhere above you in the dark, and you cannot see it, but you know it is there the way you know the floor of an ocean is there under a boat at night.…"
- [padding-modifier:in the dark] (¶23): "Lie still again in the dark bedroom.…"
- [padding-modifier:into the dark] (¶37): "Vessels of wrath do not lie awake weeping into the dark that they might not be chosen.…"
- [padding-modifier:in the dark] (¶39): "And you are lying in the dark, and the pressure in your chest is not condemnation any longer  —  it is ache.…"
- [padding-modifier:in the dark] (¶40): "So hear this in the dark.…"

### question-revelation13.html — score 5

**Flagged sentences (5):**

- [long:52w] (¶1): "It comes at the end of a hard week, or at the funeral of a believer more faithful than you, or in the hour you lie down on your back and stare at the dark ceiling of your bedroom and try to remember w…"
- [long-simile:15w] (¶1): "And because the voice is quiet you have treated it like a draft coming in under a door you cannot find  —  you turn up the heat, you wear another sweater, you look away.…"
- [long-simile:23w] (¶23): "If this truth has broken something in you  —  if the sovereignty of God feels more like a storm than a shelter  —  then listen: the same hand that wrote the book is the hand that was nailed to the cro…"
- [padding-modifier:in the dark] (¶24): "When doubt comes in the dark  —  and it will  —  you do not need to wonder if your page was torn out.…"
- [long:62w] (¶29): "And they went on working, side by side, in eternity past, over the page where your name had just been set, until every stroke of every letter of you had been loved into being  —  before you were a pra…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 redundancy pair suppressed: scripture-tsunami
- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### response-william-lane-craig.html — score 5

**Flagged sentences (5):**

- [long:55w] (¶31): "If God, in middle knowledge , consults the CCFs and selects the world in which exactly the elect freely believe and exactly the non-elect freely reject, and if God then actualizes precisely that world…"
- [long:53w] (¶34): "The Molinist construction is clever, philosophically interesting, historically important  —  but it is a route that travels several hundred pages through middle knowledge , CCFs, feasible worlds, tran…"
- [long:49w] (¶44): "You can return to the simpler, older, more biblically-rooted picture: God chose you before the foundation of the world , and holds you by a grip you could never have given Him , and works in you both …"
- [long:52w] (¶49): "We pray that the God who is sovereign in a way the system cannot finally name will draw all of us  —  Craig, his students, the Molinist readers of this page, and the Reformed who write it  —  deeper i…"
- [long:47w] (¶52): "Go to the page that names the love that chose you before the foundation of the world , then to the quiet page about being loved before time began , and finally to the hands that are not yours but that…"

### romans-9-deep-dive.html — score 5

**Flagged sentences (5):**

- [long:53w] (¶17): "Yet, before the twins were born or had done anything good or bad  —  in order that God's purpose in election might stand: not by works but by him who calls  —  she was told, 'The older will serve the …"
- [long:51w] (¶28): "For Scripture says to Pharaoh: 'I raised you up for this very purpose, that I might display my power in you and that my name might be proclaimed in all the earth.' Therefore God has mercy on whom he w…"
- [long:48w] (¶36): "Who can resist His will?" The objection presupposes that the reader has just heard a teaching in which (a) human beings are held responsible for their actions, and yet (b) God's will is so sovereign a…"
- [long:50w] (¶54): "Throughout the Old Testament, the remnant concept always refers to those whom God sovereignly preserves, not those who by their own willpower held onto faith. 1 Kings 19  —  Elijah thinks he is the on…"
- [long:63w] (¶62): "Paul has, in a single chapter, established the doctrine of unconditional individual election, anticipated and refused both the Arminian escape hatch (make it fair) and the Calvinist pastoral anxiety (…"

### story-the-garden-that-grew-itself.html — score 5

**Flagged sentences (5):**

- [padding-modifier:in the dark] (¶12): "I was in the dark, and then I felt warmth above me, and I pushed upward, and now I'm here.…"
- [padding-modifier:in the dark] (¶32): "But with a knowing deeper than memory, deeper than choosing, it understood: the one who planted it in the dark had already decided.…"
- [padding-modifier:in the dark] (¶34): "And the Gardener still comes in the dark.…"
- [padding-modifier:in the dark] (¶36): "And the Gardener, who planted you in the dark before you had eyes to see or hands to reach, went unmentioned.…"
- [padding-modifier:in the dark] (¶37): "You were loved in the dark.…"

### systematic-prolegomena.html — score 5

**Flagged sentences (5):**

- [long:51w] (¶2): "The thing in you that bristled at wrong is the very faculty this article is about: the silent supreme court that lives inside every fallen mind, the one that does not announce itself but quietly grade…"
- [long:54w] (¶19): "You open Romans 9 and read that God chose Jacob over Esau before either had done anything good or bad  —  and you cannot dismiss it as "just Paul's opinion." You encounter Ephesians 1:4 declaring that…"
- [long:68w] (¶26): "Twenty centuries from now, on a backlit screen in a dark room, someone scrolling at two in the morning will read what he is writing right now and the breath will go out of them, because the same Spiri…"
- [long:58w] (¶27): "And the moment you stop trying to overrule what the text plainly says and simply let it sit on you with the weight it has always had, you will discover that what you took to be your reservations were …"
- [long:61w] (¶27): "And the breath is in the sigh that escapes you, sometimes, in the middle of an ordinary afternoon, when an old verse comes to mind unbidden and you know  —  you do not reason your way to it, you know …"

### theologian-bradwardine.html — score 5

**Flagged sentences (5):**

- [long:56w] (¶1): "A man who spent his life proving that God controls all things  —  that nothing escapes His sovereignty, that the very concept of human autonomy is a polite philosophical fiction  —  ascended to the hi…"
- [long:52w] (¶4): "Nearly a thousand pages of dense Latin proving that the creature does not initiate, does not generate, does not cooperate as primary mover; that the creature is the recipient of God's prior willing; t…"
- [long:49w] (¶14): "It was ruinous because, as Bradwardine showed page after page, the moment you grant the creature even one square inch of autonomous initiative  —  even the smallest spark of willingness that the creat…"
- [long:60w] (¶25): "The God who set the boundaries of nations before Jacob or Esau had done anything is the same God who set the boundaries of your life  —  the parents you were born to, the year you were born in, the mo…"
- [long:50w] (¶26): "Humans are creatures held in the hand of an infinite God who can take them away in a heartbeat  —  and who never lets His chosen go , not even through the valley of plague, even when the bells of Cant…"

### analogy-song-you-didnt-compose.html — score 4

**Flagged sentences (4):**

- [long:48w] (¶14): "Lewis spoke often of his fiction as something he had received rather than manufactured  —  the Narnia stories, he said, began with a single mental picture (a faun carrying parcels in a snowy wood) tha…"
- [padding-modifier:in the dark] (¶34): "The hands that hold you now are the hands that wove you in the dark.…"
- [long:54w, padding-modifier:in the dark] (¶39): "And now, in the dark, listen under the silence  —  under the applause that is about to come  —  and you will hear an older song, one you did not notice because it has been playing your whole life, the…"
- [padding-modifier:in the dark] (¶40): "You are the instrument He picked up in the dark and has been tuning, string by string, for this one moment  —  the moment you finally stop composing and start listening.…"

### counter-cs-lewis-free-will.html — score 4

**Flagged sentences (4):**

- [long-simile:16w] (¶13): "Did it feel like a decision you made from a menu of options  —  or like something that happened TO you?…"
- [long:60w] (¶23): "Box A: The Hound of Heaven, having pursued a man through Norse myth and George MacDonald and Tolkien's Addison's Walk argument and an entire Oxford career of deflection, finally caught him  —  soverei…"
- [long:48w] (¶29): "The thirty-year-old don in the sidecar  —  wool overcoat, pipe cold in his pocket, the Headington fog coming in off the fields  —  is, by every measure he can articulate, a happy atheist who has won e…"
- [long:63w] (¶31): "The question is whether you are willing to sit in the sidecar with him for a moment and notice that the same Hand that closed in on Lewis on that road has been closing in on you for years  —  through …"

---

## §IV — Methodology (v2)

### Redundancy detection

Each pair of paragraphs in an article is compared by Jaccard similarity over the bag of significant words (≥ 4 chars, not in stopword list). Pairs with similarity ≥ 0.35 (each side ≥ 8 significant words) are *candidates*. Each candidate then runs through the eight-class exemption filter:

1. **Confessional-translation** — pages whose method is "Original / Plain English" rendering of a confession (filename ends in `-plain-english.html` or page contains the structural `<strong>Original:</strong>` / `<strong>Plain English:</strong>` markers). All redundancy pairs auto-suppressed.
2. **Historical-document-quotation** — paragraphs starting with "Article N" / "Section N" markers (Westminster, Dort, Belgic, etc., quoting historical confessions in their internal divisions).
3. **Pedagogical-anaphora** — articles where 3+ paragraphs share an identical structural opener (e.g., "Step N", "The shared premise:", "The question Arminians have not asked:", "First objection:") get those repeating-opener pairs auto-suppressed.
4. **Scripture-tsunami** — paragraphs that are ≥ 40% Scripture-quotation by character count, or contain visible verse references, or are wrapped in `<blockquote>`/`<cite>` markers. Pairs where both paragraphs are Scripture-dominated are auto-suppressed (deliberate verse-stacking).
5. **Research → pairing structural** — pages that use the `pairing-science` / `pairing-scripture` / `pairing-row` CSS classes for side-by-side science/Scripture layouts. Pairs spanning the introduction-section and the pairing-section are auto-suppressed.
6. **Antithetical-parallelism** — paragraph pairs that both start with "If [X]" where one is negated and the other affirmed (e.g., "If faith is not a gift" / "If faith is a gift"). Auto-suppressed.
7. **Closing-recurrence** — pairs where the second paragraph is in the article's final 15% AND at least one paragraph is a Scripture-quote, AND the gap between the two is ≥ 15% of total paragraphs. The thesis-restatement-at-close exemption from PROSE-INTEGRITY.md §I.1.
8. **Exegetical-comparison** — one paragraph quotes a verse cleanly and the other quotes the same verse with bracket-clarifications `[believers]`/`[of you]`. The article's exegetical method, not redundancy.

### Sentence-coherence heuristic

Each sentence is flagged if any of the following fire:

- **(a) Length** — non-quoted word count > 45. v2 subtracts embedded Scripture-quotations from the count.
- **(b) Long simile** — "like a/an [X]" tail > 12 words.
- **(c) Direction-mismatch** — "came down ... lifted off", "rose ... fell", "opened ... closed", "thrown out ... welcomed in", etc.
- **(d) Padding modifier** — "in the dark" / "in the night" / "in the silence" at clause-end with no anchor (no following "of [X]" and no following participle modifier).
- **(e) Abstract simile** — "like a [...] silence / memory / absence / forgetting / whisper".
- **(f) v2 NEW: Vehicle-tenor mismatch** — simile whose tenor (subject clause) and vehicle (post-"like a/an" clause) are in disjoint image domains. This is the dedicated detector for the original Aaron failure mode ("the verdict came down like a roof being lifted off a house in the dark" — tenor is courtroom, vehicle is building, no bridge).
- **(g) Mixed metaphor** — keywords from ≥ 3 distinct image domains in the *same clause window* (commas/em-dashes/semicolons split clauses). v2 also masks out concrete-historical-referent contexts (Eden as garden, Calvary as tree, "the dark of the North African night" as concrete location, grammatical-technical "sentence" / "verdict") so they don't trip the counter.

### Coherence-positive suppressors (v2 NEW)

Length-flagged sentences are auto-suppressed if any of the following positive coherence patterns hold:

- **Anaphora** — 3+ clauses (split on commas/dashes/semicolons) sharing an identical 1- or 2-word opening prefix. Catches "every prayer / every tear / every candle" and "the arm that holds / the arm that whispers / the arm that stands."
- **Chiasm / antithetical parallelism** — sentence contains a contrast conjunction (but / while / whereas / yet) AND has 2+ significant words each appearing 2+ times in the sentence (mirrored repeated keywords).
- **Embedded Scripture quotation** — when raw word count exceeds non-quoted word count by 15+ words, the length is dominated by the verse and the prose is short.

### What v2 does NOT do

- It does not check across articles for site-wide repetition.
- It does not check tldr / In Brief / pullquote blocks.
- It does not check related-articles auto-injected blocks.
- It does not check theological correctness.
- The exemption filters are conservative — when the scanner suppresses a pair, it logs the suppression to `suppressed_redundancy` so the human reviewer can audit the decisions and re-tune the thresholds.

### Tuning notes

If a future cycle finds that v2 is suppressing genuine errors, the per-class suppression breakdown in §I should reveal which class is over-firing. The exemption rules can be tightened (e.g., require ≥ 4 paragraphs sharing an opening for the pedagogical-anaphora rule, or ≥ 50% Scripture for the Scripture-tsunami rule) and the script re-run.

---

*Audit 2 / Phase F — Prose Integrity v2. Re-runnable: `node audit-prose.js`. Outputs: `audit-prose.json` + `audit-prose.md`.*
