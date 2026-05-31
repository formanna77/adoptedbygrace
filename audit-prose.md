# Prose Integrity Audit (Phase F) — Scanner v2

**Generated:** 2026-05-31T22:52:08.273Z
**Spec:** `audit-prose.js v2` — redundancy (Jaccard ≥ 0.35 on significant-word bags) with **eight-class exemption filter** (closing-recurrence, Scripture-tsunami, pedagogical-anaphora, antithetical-parallelism, confessional-translation, historical-document-quotation, exegetical-comparison, research→pairing structural) + sentence-coherence heuristic with **anaphora/chiasm/embedded-quotation positive suppressors** + new **vehicle-tenor mismatch detector** (catches the original Aaron failure mode: simile whose vehicle and tenor are in incompatible domains).

**Mandate (Aaron, 2026-04-27):** "many articles repeat themselves usually a couple times but sometimes even 3 times within the article... also some sentences don't make sense... we do not start expanding the website until every last sentence, paragraph, and article are written perfectly."

**v2 design goal (Aaron, 2026-04-28):** "robust and comprehensive as well as efficient and effective." The v2 scanner suppresses apex-tier false positives at the eight known exemption classes while adding a dedicated detector for the failure mode that triggered Phase F (vehicle-tenor mismatch in similes — the broken-roof-being-lifted-off failure).

---

## §I — Aggregate

| Metric | Value |
|---|---|
| Articles audited | 589 |
| Articles entirely clean | 144 (24.4%) |
| Articles with (genuine) redundancy | 12 (2.0%) |
| Articles with (genuine) flagged sentences | 439 (74.5%) |
| **Total redundancy pairs flagged (genuine)** | **12** |
| **Total sentences flagged (genuine)** | **1282** |
| Redundancy pairs suppressed (apex-tier exemptions) | 20 |
| Sentence flags suppressed (coherence-positive) | 182 |

### Suppression breakdown by exemption class

| Class | Pairs suppressed |
|---|---:|
| scripture-tsunami | 11 |
| confessional-translation | 6 |
| pedagogical-anaphora | 2 |
| antithetical-parallelism | 1 |

**Composite score** = redundancy_pairs × 2 + flagged_sentences. Articles ranked by descending score below.

---

## §II — Top 50 Most Broken Articles (Rebuild Queue, post-suppression)

1. **canons-of-dort-plain-english.html** — score 28 (0 redundancy pairs, 28 flagged sentences, 98 paragraphs) *[1 pairs + 11 sentences auto-suppressed]*
2. **apologetic-tetagmenoi-acts-13-48.html** — score 12 (0 redundancy pairs, 12 flagged sentences, 47 paragraphs) *[0 pairs + 4 sentences auto-suppressed]*
3. **apologetic-lydias-heart.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 42 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
4. **apologetic-not-because-but-because.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 40 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
5. **apologetic-revival-and-sovereign-grace.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 33 paragraphs)
6. **apologetic-the-cardiac-transplant.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 41 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
7. **apologetic-the-cardiology-of-the-fall.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 48 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
8. **apologetic-the-eulogy-greek-of-ephesians-1.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 37 paragraphs)
9. **apologetic-the-unbroken-chain.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 39 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
10. **ethics-sexuality.html** — score 10 (0 redundancy pairs, 10 flagged sentences, 13 paragraphs)
11. **apologetic-darkened-in-their-understanding.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 19 paragraphs)
12. **apologetic-hilasterion-the-mercy-seat.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 36 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
13. **ephesians-1-3-14.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 33 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
14. **reformed-apologetics-fine-tuning.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 15 paragraphs)
15. **response-jerry-walls.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 63 paragraphs)
16. **systematic-perseverance.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 34 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
17. **apologetic-light-shine-out-of-darkness.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 11 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
18. **apologetic-nothing-can-separate.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 27 paragraphs)
19. **apologetic-the-once-for-all-ephapax.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 43 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
20. **apologetic-the-prayer-you-never-spontaneously-prayed.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 35 paragraphs) *[0 pairs + 4 sentences auto-suppressed]*
21. **argument-cost-of-being-wrong.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 63 paragraphs)
22. **ethics-immigration.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 18 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
23. **ethics-marriage.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 14 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
24. **story-dark-the-rope-you-wove-yourself.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 49 paragraphs)
25. **theologian-augustine.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 43 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
26. **theologian-gottschalk.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 28 paragraphs)
27. **apologetic-gave-himself-for-the-bride.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 14 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
28. **apologetic-he-did-not-spare-his-own-son.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 11 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
29. **apologetic-loved-darkness-rather-than-light.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 13 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
30. **apologetic-purchased-from-every-tribe.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 12 paragraphs)
31. **ethics-power-authority.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 16 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
32. **ot-joseph.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 26 paragraphs)
33. **apologetic-ekloge-the-greek-of-election.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 44 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
34. **apologetic-the-double-grip-of-john-10.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 40 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
35. **apologetic-the-road-to-damascus.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 21 paragraphs)
36. **apologetic-the-washing-of-rebirth.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 15 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
37. **apologetic-those-you-gave-me.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 23 paragraphs)
38. **ethics-end-of-life.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 15 paragraphs)
39. **ethics-race.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 14 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
40. **history-puritans.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 26 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
41. **presuppositional-impossibility-of-the-contrary.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 14 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
42. **question-predestined-to-hell.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 45 paragraphs)
43. **reformed-apologetics-resurrection.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 12 paragraphs)
44. **romans-9-deep-dive.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 85 paragraphs)
45. **systematic-covenant-redemption.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 61 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
46. **systematic-effectual-calling.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 35 paragraphs)
47. **westminster-chapter-3-plain-english.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 93 paragraphs) *[5 pairs + 2 sentences auto-suppressed]*
48. **apologetic-for-the-sheep.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 25 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
49. **apologetic-he-bore-the-sin-of-many.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 15 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
50. **apologetic-the-remnant-chosen-by-grace.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 13 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*

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

### apologetic-tetagmenoi-acts-13-48.html — score 12

**Flagged sentences (12):**

- [long:54w] (¶7): "Third, the auxiliary. Ēsan is the third-person plural imperfect indicative of eimi , "to be." When the imperfect of eimi is combined with a perfect passive participle, the result is the periphrastic p…"
- [long:54w] (¶10): "The synergist will note this ambiguity and propose that tetagmenoi in Acts 13:48 could be read as middle rather than passive  —  yielding the translation "as many as had disposed themselves to eternal…"
- [long:51w] (¶23): "The authorities that exist have been established by God." The Greek behind both established forms is from tassō , and the second occurrence is tetagmenai eisin  —  the periphrastic perfect passive, th…"
- [long:47w] (¶27): "The destination of the appointing  —  eis zōēn aiōnian , "into eternal life"  —  was the same eternal life Paul had just named in verse 46 as the inheritance that the rejecting Jews had judged themsel…"
- [long:58w] (¶28): "The same Luke records Christ Himself, in the Gospel that bears the same author's name, saying in Luke 10:21-22 : "At that time Jesus, full of joy through the Holy Spirit, said, 'I praise you, Father, …"
- [long:50w] (¶28): "No one knows who the Son is except the Father, and no one knows who the Father is except the Son and those to whom the Son chooses to reveal him.'" The same Greek root  —  eudokia ("good pleasure") be…"
- [long:66w] (¶31): "The reader, two thousand years later, is being told that the same sorting was happening at his own first hearing of the gospel  —  that the same Lord was, by the same logic, marking some hearers as ap…"
- [long:89w] (¶32): "Either you have, somewhere in your past or your present, found yourself believing in the Lord Jesus Christ  —  in which case the Greek of Acts 13:48 says of you, with no possibility of softening, that…"
- … and 4 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 4 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-lydias-heart.html — score 11

**Flagged sentences (11):**

- [direction-mismatch:\bclosed[^.]{0,40}?\bopened\b] (¶2): "It is a thoroughgoing opening, an opening from the inside out, an opening of something that was closed in such a way that it could not have opened itself.…"
- [long:66w] (¶10): "And John himself, the same writer, uses helkyō later in his Gospel for two unmistakable purposes: in John 18:10 , Peter draws his sword (you do not "invite" a sword from a scabbard); in John 21:11, th…"
- [long:46w] (¶13): "The Westminster Divines, sitting in a side room at Westminster Abbey in the 1640s with no MRI scanners, no positron emission tomography, no functional connectivity studies, no concept of the dopaminer…"
- [direction-mismatch:\bopened[^.]{0,40}?\bclosed\b] (¶15): "The opened heart that was closed is, in the very moment of its opening, an opened heart that wants what it now sees.…"
- [long:57w] (¶16): "And the reader who has been around long enough to watch their own preferences shift over a decade  —  to find themselves loving books they would have hated at twenty, music they would have walked out …"
- [long:64w] (¶17): "The Reformed tradition, four centuries before cognitive neuroscience existed as a discipline, articulated the mechanism cognitive neuroscience would later confirm: that the human will operates on top …"
- [long:61w] (¶21): "The thing she had not wanted at sunrise had become the only thing she wanted by noon, and the wanting felt as much hers as anything had ever felt hers, because the wanting was hers  —  only now it was…"
- [padding-modifier:in the silence] (¶22): "The conscious self of Lydia announces its yes and the announcement is genuine, but the announcement is not the cause; the cause is the diēnoixen that took place in the silence beneath.…"
- … and 3 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 3 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-not-because-but-because.html — score 11

**Flagged sentences (11):**

- [long:54w] (¶5): "And the same verse provides the empirical refutation of any reading that would seek a more flattering grounding: ki-attem ha-me'at mikol-ha'amim  —  "for you are the fewest of all the peoples." The se…"
- [long:63w] (¶11): "Deuteronomy 9:4-6, two chapters later, addresses this form directly: "After the LORD your God has driven them out before you, do not say to yourself, 'The LORD has brought me here to take possession o…"
- [long:53w] (¶11): "It is not because of your righteousness or your integrity that you are going in to take possession of their land; but on account of the wickedness of these nations, the LORD your God will drive them o…"
- [long:49w] (¶11): "Understand, then, that it is not because of your righteousness that the LORD your God is giving you this good land to possess, for you are a stiff-necked people." Moses repeats the denial three times …"
- [long:47w] (¶12): "If numerical and moral grounds are excluded, and if Moses' explanation of the asymmetry is that the LORD loved Israel and kept the oath , then the reason for the love and the oath is not a property of…"
- [long:47w] (¶17): "I will make you into a great nation, and I will bless you, and I will make your name great, and you will be a blessing.'" The LORD is the speaker; Abraham is the addressee; the verb of moving is in th…"
- [long:55w] (¶25): "The election of Levi over the other tribes for priestly service in Exodus 32-34 is grounded in the response of the tribe to Moses' call to side with the LORD against the golden calf  —  but the respon…"
- [long:55w] (¶26): "The election of David over his brothers in 1 Samuel 16 is grounded in the LORD's seeing the heart, not the appearance, and the text explicitly contrasts David's election with the prior election of Sau…"
- … and 3 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 3 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-revival-and-sovereign-grace.html — score 11

**Flagged sentences (11):**

- [long:60w] (¶0): "When the Spirit of God has descended on a town or a country in an outpouring so undeniable that even hostile observers conceded something supernatural was occurring, the question worth asking  —  quie…"
- [long:60w] (¶1): "Across three of the most-studied awakenings of the last three centuries  —  New England in the 1730s and 1740s, Wales in 1859, Pyongyang in 1907  —  the doctrine the awakened were preaching, the doctr…"
- [long:62w] (¶3): "The pattern: a sudden conviction of sin so deep the person could not shake it; a desperation that could not be alleviated by any moral reform; an arrival, often abrupt, of an apprehension of Christ as…"
- [long:67w] (¶4): "The Spirit poured out in measurable, observable, sociologically documented power, and the message that was being preached when the outpouring came was the message that the human being is dead in trans…"
- [long:49w] (¶6): "Its national spread came through itinerant preachers who criss-crossed the colonies in the 1740s  —  most famously George Whitefield , the English evangelist whose voice could be heard, by Benjamin Fr…"
- [long:50w] (¶8): "Compare this with the contemporary work of Charles Finney , whose Pelagianizing methods produced large numerical results but, by Finney's own later admission in his Memoirs , an attrition rate so deva…"
- [long:88w] (¶12): "Letters and diaries from the period record the experience again and again: a congregation gathered for an ordinary service; the minister rose to preach what he had prepared; before he had finished his…"
- [long:46w] (¶23): "The conclusion is more modest and more disturbing: when the Spirit's outpouring has been sustained, undeniable, and historically transformative, the doctrine being preached at the pulpit has, with rem…"
- … and 3 more.

### apologetic-the-cardiac-transplant.html — score 11

**Flagged sentences (11):**

- [long:46w] (¶3): "The human party in these sentences is grammatically the object  —  the one to whom things are done  —  and the agent in these sentences is the LORD God of Israel, who alone has the authority and the s…"
- [long:48w] (¶17): "The walking happens because the causing happens; the causing happens because the Spirit-indwelling happens; the Spirit-indwelling happens because the new heart has been installed; the new heart has be…"
- [long:53w] (¶22): "From the outside  —  from the narrator's point of view, from God's point of view, from Luke's editorial point of view  —  the experience is one of divine cardiac surgery performed on a heart that was,…"
- [long:59w] (¶24): "The heart, the modern reader knows, is a muscular pump; the seat of the will is in the brain; the prefrontal cortex makes decisions in concert with the limbic system; preferences are forged from genet…"
- [long:53w] (¶25): "If the seat of the will is in the brain  —  if every preference is the output of a brain state  —  then the question becomes: what kind of brain state would have to obtain for a human being whose defa…"
- [long:62w] (¶34): "Each grounded in a different register  —  apostolic narrative, historical pattern, prophetic oracle  —  but each arriving at the same observation: when grace reaches the elect heart, the grace is not …"
- [long:64w] (¶34): "Add to those three the Greek of eklogē and the eulogy of Ephesians 1 for unconditional election ; the priest's onyx stones , the Owen Trilemma , the mercy seat in Greek , and the ephapax chain in Hebr…"
- [long:47w] (¶35): "A heart that has, somewhere along the way, come to love what it once did not love and to hate what it once hated is looking at the empirical evidence of a cardiac transplant it does not remember conse…"
- … and 3 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-cardiology-of-the-fall.html — score 11

**Flagged sentences (11):**

- [long:47w] (¶1): "Twice in the Hebrew Bible  —  once in Genesis, once in Jeremiah, six centuries apart, by two writers who never met, in two completely different genres of literature  —  the LORD looks at the chart of …"
- [long:59w] (¶5): "The yetzer of a thing is what it has been shaped to incline toward; it is the engineered bent, the default trajectory. machshvot  —  "thoughts, plans, devisings"  —  the plural of machshavah , the cog…"
- [long:59w] (¶10): "The kingdom of Israel has split, the northern tribes have been carried into Assyria, the southern kingdom of Judah is on the verge of being carried into Babylon, and the prophet Jeremiah is standing a…"
- [long:47w] (¶19): "The entire architecture of therapy, of authenticity ethics, of "follow your heart," of "trust your gut," of "you do you," of every diagnostic the reader has ever applied to her own life depends on a h…"
- [long:55w] (¶31): "This is what Augustine meant by his famous remark that the virtues of the pagans are, at best, "splendid vices"  —  the actions look like virtues from the outside but, when traced to the inclination b…"
- [long:47w] (¶38): "Vekhol-yetzer raq ra kol-hayom  —  every inclination only evil all the time  —  is the diagnosis that makes the Son's definite atonement necessary, because nothing less than a substitute who actually …"
- [long:57w] (¶40): "The angle joins the previously-deployed angles of the unprompted-prayer test ( start-here-phase1 ), the flesh-vs.-Bible test (the drowning-man analogy ), the infant-sin test, the sleep-test, the good-…"
- [long:96w] (¶41): "Add to the depravity case the four facets the site has built for the other four doctrines of grace  —  the Greek of eklogē and the eulogy of Ephesians 1 for election ; the priest's onyx stones , the O…"
- … and 3 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-eulogy-greek-of-ephesians-1.html — score 11

**Flagged sentences (11):**

- [long:48w] (¶0): "Three times the passage says why: "to the praise of his glory." Election was never cold arithmetic; it is the overflow of a Father's delight, and the only fitting response to being chosen before time …"
- [long:79w] (¶1): "Two hundred and one words in the Greek, no period anywhere in the middle, no full stop until the end of verse fourteen  —  a single grammatical structure of breathtaking length, ornamented like a cath…"
- [long:49w] (¶10): "The Son was set apart as the Lamb before the world was made; the believer was set apart as the Bride before the world was made; and the temporal unfolding of redemption is the working out of an agreem…"
- [long:49w] (¶11): "If you wished to insert a foreseen-faith basis into pro katabolēs kosmou , you would have to argue that God, before the cosmos existed, looked forward into a future He had not yet decreed and observed…"
- [long:61w] (¶12): "The wisest theologians in the Christian tradition have always paused here in something more like silence than speech, because the noun-and-preposition pair is doing what no human noun-and-preposition …"
- [long:55w] (¶14): "The preposition kata here governs the standard or pattern according to which an action is taken; eudokia is the compound noun from eu (good) and dokein (to seem, to think, to deem)  —  literally, that…"
- [long:52w] (¶25): "To be elect in Christ is to be a member of the body of Christ; and to be a member of the body of Christ is, by Paul's repeated insistence, to have been placed there by the Spirit who applied the Fathe…"
- [long:63w] (¶30): "Add to those readings the Aaron's-onyx-stones case for definite atonement , the down-payment case for perseverance , the proleptic-aorist case for perseverance , the Acts 16:14 case for irresistible g…"
- … and 3 more.

### apologetic-the-unbroken-chain.html — score 11

**Flagged sentences (11):**

- [long:48w] (¶4): "The fifth  —  glorification  —  is the resurrection-body, sinless-presence-with-God state that the Roman believers were still hoping for in the next chapter, the one Paul will spend chapters 9 through…"
- [long:46w] (¶9): "The human being's salvation is being told to her from the perspective of the seat above the world, where the wedding has already happened, the trumpet has already sounded, the dead have already been r…"
- [long:48w] (¶13): "The unbroken pronoun and the unbroken aorist together close the door on every reading in which the believer's perseverance is conditioned on her own ongoing faithfulness, and they open the door wide o…"
- [long:59w] (¶21): "The aorist of glorification is the grammar of an accomplishment so secure that the apostle's rhetorical position is to look back on it from the future, the way a parent looks back on the graduation of…"
- [long:54w] (¶26): "Neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the…"
- [long:53w] (¶29): "The Father chooses; the Son atones; the Spirit indwells; the Father's choice is the cause of the Son's atonement; the Son's atonement is the cause of the Spirit's indwelling; and the Spirit's indwelli…"
- [long:51w] (¶29): "Add to those facets the deep-Greek of Romans 9 election , the neuroscience-of-conversion case for irresistible grace at Lydia's heart , the trilemma of Owen's argument for definite atonement , and the…"
- [long:77w] (¶31): "If not, the chain has not yet begun for that soul, and the more pressing question is whether the Father will give the gift of faith by which the chain begins. (He gives it generously, to every soul wh…"
- … and 3 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### ethics-sexuality.html — score 10

**Flagged sentences (10):**

- [long:56w] (¶1): "The gospel's whole counter-testimony is that the autonomous self is an illusion, that our desires are not a reliable compass but a fallen instrument , and that our truest identity is not something we …"
- [long:55w] (¶5): "The thoughtful critic says: "You are asking a whole category of human beings to accept a life without romantic love, without partnership, without the comfort of a body beside theirs  —  not for a seas…"
- [long:62w] (¶6): "The celibate has been, across two thousand years of Christian history, not a tragic figure but often the freest and most fruitful of saints; the Lord Jesus Himself lived a fully human life of perfect …"
- [long:62w] (¶6): "The answer to the church's failure of love is not to abandon the ethic but finally to obey the rest of it: to make the local church a true family, where the celibate believer is not consigned to lonel…"
- [long:49w] (¶7): "The modern self is constructed : you look inward, find your deepest desire, and build your identity on it  —  "I am my sexuality." The Christian self is conferred : you look upward, receive who God ha…"
- [long:51w] (¶7): "And this is liberating in a way the modern story can never be, because an identity you construct from your desires is at the mercy of your desires  —  it shifts when they shift, it shatters when they …"
- [long:69w] (¶8): "And the Spirit who is sanctifying you supplies, day by day, the strength to walk a road you could not walk alone  —  not by gritted willpower scraping toward a verdict, for the verdict was never earne…"
- [long:51w] (¶9): "The same Christ who calls you to costly faithfulness offers you Himself  —  union with the Bridegroom of whom every earthly marriage was only ever a picture, and a family in the church that should hav…"
- … and 2 more.

### apologetic-darkened-in-their-understanding.html — score 9

**Flagged sentences (9):**

- [long:64w] (¶0): "Some of the most powerful minds who have ever lived  —  physicists who can hold the architecture of the cosmos in their heads, philosophers who can dismantle an argument you spent a week building, sch…"
- [long-simile:13w] (¶4): "It does not mean the mind occasionally dims; it means the mind has been darkened and now exists in a fixed state of darkness, like a room whose lights were switched off long ago and never came back on…"
- [long:57w] (¶5): "So read it backward, in the order of actual causation, and the chain is this: it begins with the hardening of the heart  —  the Greek is pōrōsis , a word borrowed from medicine, used for the chalky ca…"
- [long:51w] (¶6): "But Paul has just told you the darkness in the mind is downstream of a hardness in the heart, which means you can pour light into the window all day and the room stays dark, because the windows were b…"
- [long:47w] (¶7): "It means that the corruption sits in the wanting , upstream of the thinking, so that the same mind that is dazzling about everything else goes strangely, specifically dark about God  —  because it doe…"
- [long:50w] (¶11): "Ask the honest question of yourself: if every intellectual objection I have were answered to my full satisfaction  —  every hard text resolved, the problem of evil addressed, the evidence laid out bey…"
- [long:58w] (¶14): "It pairs with the promise in Ezekiel, the only cure deep enough  —  the heart of stone removed and a heart of flesh given , the pōrōsis reversed at the root, so that the softened heart breeds knowledg…"
- [long:66w] (¶15): "Perhaps you have spent years trying to think your way to faith  —  reading the books, weighing the arguments, waiting to be convinced  —  and the more you read, the further the thing seems to recede, …"
- … and 1 more.

### apologetic-hilasterion-the-mercy-seat.html — score 9

**Flagged sentences (9):**

- [long:46w] (¶4): "The blood does not atone if it is sprinkled outside the most holy place; it does not atone if it is sprinkled on the floor; it does not atone if it is sprinkled on the curtain or on the menorah or on …"
- [long:46w] (¶7): "He does not prove His love by making it abstract; He proves it by narrowing it to a particular blood for a particular people on a particular day  —  not because the love is small but because the love …"
- [long:58w] (¶10): "He is saying: that thing the high priest sprinkles blood on once a year for the covenant people  —  Jesus is that thing, and His blood is the blood that has been sprinkled there, and the day when aton…"
- [long:50w] (¶11): "To apply it to Christ is to say the same thing with respect to Christ that was always true with respect to the lid: the atonement is made here, with this blood, for these people, by the divine arrange…"
- [long:57w] (¶15): "If the Son's atoning work is grounded in His high-priestly intercession (as Hebrews 7:25 and 9:24 explicitly teach), then the people for whom the atonement was made are the people for whom the prayer …"
- [long:48w] (¶22): "The atonement is universal in its sufficiency  —  the value of Christ's blood is infinite and would be enough to cover every sin of every human being who ever lived  —  but particular in its efficienc…"
- [long:53w] (¶25): "If the atonement was made for the non-elect, then the non-elect have had their sins atoned for; and if their sins have been atoned for, then God cannot justly punish them in hell for those sins, becau…"
- [long:69w] (¶27): "Add to those three the Greek-of-election arguments for unconditional election ( Romans 9 and Ephesians 1's eulogy ), the Greek-of-perseverance arguments ( arrabōn and the proleptic aorist ), the irres…"
- … and 1 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### ephesians-1-3-14.html — score 9

**Flagged sentences (9):**

- [long:48w] (¶0): "In the Greek of the earliest manuscripts, Ephesians 1:3 through 1:14 is a single, unpunctuated, breathlessly cascading sentence  —  202 words without a period, 8 finite verbs, 12 participles, 11 prepo…"
- [long:50w] (¶1): "Paul is composing, in twelve consecutive verses, a eulogy for the work of the Triune God in the salvation of the elect. (The Greek of the sentence is treated exhaustively in the eulogy Greek of Ephesi…"
- [long:57w] (¶2): "Each movement closes with the same refrain: eis epainon doxēs autou , "to the praise of His glory." The refrain functions as the rhyme in a sonnet  —  it falls at the end of each section, marks the se…"
- [long:89w] (¶16): "And the Spirit is named, in verse 14, as ho arrabōn tēs klēronomias hēmōn  —  "the down payment of our inheritance." The Greek arrabōn is a commercial term from the marketplace: the first installment …"
- [long:62w] (¶18): "On this reading, God before the foundation of the world chose Christ , and chose that there would be a people in Christ ; the individual believer enters this elect group by his own free decision to be…"
- [long:46w] (¶23): "If God's choosing of Christ is what verse 4 is about, then the phrase before the foundation of the world is filler  —  of course the eternal Son was eternally with the Father; of course there was no c…"
- [long:49w] (¶25): "Which means  —  and this is where the crown jewel lands  —  that if you have come to believe in Christ , your believing is the historical evidence of an eternal love that has been pursuing you since b…"
- [long:65w] (¶30): "The grace is not a partial achievement of human and divine working together; the grace is the unilateral act of a sovereign God whose decision to save you was made before you existed, executed in a So…"
- … and 1 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 3 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### reformed-apologetics-fine-tuning.html — score 9

**Flagged sentences (9):**

- [long:54w] (¶1): "If it were larger by a fraction that physicists express as roughly one part in ten followed by a hundred and twenty zeros, the universe would have flown apart too fast for any galaxy ever to form; if …"
- [long:103w] (¶1): "The astronomer Fred Hoyle, no friend of religion, discovered that the production of carbon in stars depends on an energy resonance tuned so exactly that he wrote his atheism could not survive it: "a c…"
- [long:59w] (¶4): "If our universe is one of an immense, perhaps infinite, ensemble of universes, each with its own randomly assigned constants, then a life-permitting one is no longer a miracle  —  it is a statistical …"
- [long:54w] (¶5): "First, a universe-generating multiverse is not a free lunch: the inflationary machinery and the landscape themselves require finely tuned starting conditions and physical laws to produce universes at …"
- [long:56w] (¶5): "Second, the multiverse is, by the nature of the proposal, unobservable in principle: other universes are causally disconnected from ours, which means the theory is invoked precisely where it cannot be…"
- [long:48w] (¶5): "Third, infinite-universe scenarios collapse into paradox  —  the "Boltzmann brain" problem, in which it becomes overwhelmingly more probable that you are a momentary fluctuation hallucinating a cohere…"
- [long:59w] (¶8): "On the Christian account it is no mystery at all: the world was spoken into being by the eternal Logos , the Word in whom "all things hold together" (Colossians 1:17  —  the Greek synestēken is a perf…"
- [long:55w] (¶11): "If the case has done its work, you can no longer hide in the comforting story that the universe is a blind machine that neither made you on purpose nor knows you exist  —  that you are, as one famous …"
- … and 1 more.

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

### systematic-perseverance.html — score 9

**Flagged sentences (9):**

- [long:48w] (¶1): "People call it "eternal security," or "once saved, always saved," and those slogans are true as far as they go  —  but they have a way of sliding into the ear and lodging as a kind of fire-insurance p…"
- [padding-modifier:in the night] (¶2): "Your hand on God is the hand of a drowning man  —  it grips, it slips, it grips again, it goes slack in the night and clutches in the panic of the morning.…"
- [long:69w] (¶3): "If you were dead in sin and God made you alive; if He chose you before the foundation of the world without consulting your merit; if Christ did not merely make you savable but actually secured your sa…"
- [long:46w] (¶11): "Two omnipotent grips, one nested inside the other, and the question is no longer whether your faith is strong enough to hold the rope, but whether anything in creation is strong enough to tear you out…"
- [long:54w] (¶16): "The same hands that began the good work of your salvation  —  reaching into a dead heart and breathing life where there had been none  —  are the hands that will complete it, and the completion is as …"
- [long:46w] (¶26): "It teaches that God ordains ends together with the means to those ends  —  and one of the appointed means by which He preserves His saints is precisely these warnings, which He uses to provoke the gen…"
- [long:47w] (¶28): "That returning  —  the holy unrest that will not let you be comfortable in sin, the homesickness that pulls you back to the Father after every wandering  —  is itself the Spirit's work in you, and it …"
- [long:48w] (¶29): "This is why the genuine believer's experience of perseverance is not complacency but a holy restlessness  —  a war against sin that never fully quiets, a grief over failure that an apostate does not f…"
- … and 1 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 3 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-light-shine-out-of-darkness.html — score 8

**Flagged sentences (8):**

- [long:48w] (¶0): "Or was it that something happened to you, underneath the deciding, that made the deciding possible at all  —  that a light came on in a room that had been dark your whole life, and only then could you…"
- [long:48w] (¶5): "Paul's image is verse 4 to verse 6: a man who is blind , and a God who creates light "in our hearts." God is not switching on a lamp for a working eye; He is making sight where there was blindness, li…"
- [mixed-metaphor:courtroom+light+dark] (¶6): "Paul says the god of this age blinded them  —  but elsewhere he says they are "without excuse," and Jesus says the verdict is that "people loved darkness instead of light because their deeds were evil…"
- [long:52w, padding-modifier:in the dark] (¶6): "That God speaks light into some of them is not injustice to the rest; it is sheer, unowed mercy to any  —  and the only reason you are not still in the dark is that He chose, freely, to say over your …"
- [long:47w] (¶7): "The whole creative act  —  the word over your darkness, the sight given to your blindness  —  was aimed at one sight: the face of Jesus Christ, where the glory of the invisible God became something a …"
- [long:57w] (¶8): "So the question the verse leaves you with is no longer "did I decide well enough?" but "whose voice woke me?"  —  and if you can see the glory of God in the face of Christ at all, if that face means a…"
- [long:47w, mixed-metaphor:fire+light+dark] (¶9): "So we confess it, who once sat in a dark we could not name and called it the only world there was: that we did not kindle the light, did not open our own eyes, did not author the first true sight we e…"
- [padding-modifier:into the dark] (¶9): "To the Father who said "let there be light" over the void and over our hearts, to the Son in whose face that glory shines, to the Spirit who carried the creating word into the dark  —  be all glory, t…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-nothing-can-separate.html — score 8

**Flagged sentences (8):**

- [long:54w] (¶0): "The closing paragraph of Romans 8 is a courtroom and a battlefield and a search party all at once, and Paul runs the whole proceeding through a hammer-blow series of questions that the Greek calls tis…"
- [long:55w] (¶12): "To a world terrified of the stars, of horoscopes, of the iron grip of fate written in the sky, Paul says: the highest point of cosmic power and the lowest abyss of it  —  the entire span of everything…"
- [long:47w] (¶13): "And Paul, having swept heaven and earth, having named death and life and angels and demons and the stars at the zenith and the abyss at the bottom, throws the net one final time over everything that h…"
- [long:62w] (¶17): "But the chain of Romans 8 was never your grip on God; it was always God's grip on you  —  the same truth the double-hand grip of John 10 presses from the Greek of the Good Shepherd: no one will snatch…"
- [long:46w] (¶18): "If a believer could finally separate himself by apostasy, then a link in the chain of verses 29–30 would snap, and the one God justified would not be glorified  —  and Paul's whole argument, built to …"
- [long:69w] (¶20): "He conducted the most exhaustive search in Scripture for the one thing that could place a person outside the love of God  —  and he ransacked death, life, the spirit-world, time, power, the stars at t…"
- [long:48w] (¶22): "This fourth one is the crescendo the chain was always building toward: the seven questions of Romans 8:31-39, where Paul takes the doctrine the chain established and shouts it into every realm of real…"
- [long:49w] (¶24): "If you have read this and the security still feels too good to trust  —  if the old engine of fear is whispering that a promise this total must have fine print you have not read  —  then go back and r…"

### apologetic-the-once-for-all-ephapax.html — score 8

**Flagged sentences (8):**

- [long:46w] (¶0): "It said, in a sentence the worshipper could not yet hear in full: somewhere on the far side of all these repetitions, a final sprinkling is coming, and after that, the curtain will not be crossed agai…"
- [long:52w] (¶5): "The aorist eisēlthen (he entered) is bolted to ephapax ; the aorist middle participle heuramenos (having obtained, having secured) governs aiōnian lutrōsin  —  eternal redemption  —  and the middle vo…"
- [long:52w] (¶10): "Christ has offered Himself once for all; entered the Most Holy Place once for all; obtained eternal redemption; appeared at the end of the ages to abolish sin; been sacrificed to take away the sins of…"
- [long:97w] (¶16): "If the sacrifice was offered for the non-elect in the same sense in which it was offered for the elect, then the verbs in the chain would have to be downgraded for the non-elect: obtained eternal rede…"
- [long:50w] (¶25): "The High Priest does not need to die again because the death was sufficient once for all; He does need to keep living and keep interceding, because the people for whom He died are still on the way to …"
- [long:81w] (¶27): "The fuller treatment lives in the systematic apologetic for definite atonement ; the present article only need note the relevant contour. 1 Timothy 2:6's pantōn is governed, in context, by the same lo…"
- [long:50w] (¶34): "Add to those four the Greek of eklogē and the eulogy of Ephesians 1 for unconditional election ; the arrabōn and unbroken chain for perseverance ; the Lord's opening of Lydia's heart and the historica…"
- [long:80w] (¶39): "The whole sweep of the doctrine  —  the Father's eternal election in the eulogy of Ephesians 1 , the Son's atonement at the mercy seat , the Spirit's effectual opening of the heart at Lydia's riverban…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-prayer-you-never-spontaneously-prayed.html — score 8

**Flagged sentences (8):**

- [long:49w] (¶0): "Take the unprompted, undisturbed, no-stakes-in-the-room moments  —  the long walks where nothing is happening, the early morning when no alarm has gone off and the coffee has not yet been started, the…"
- [long:52w] (¶9): "But the awe is directed at a Cause-in-General  —  a felt sense of something larger than the self  —  not at the holy God of Israel whose attributes are revealed in particular Scripture, whose Son is n…"
- [long:48w] (¶11): "The child who addresses words to God before any catechesis has reached him is, on careful inspection, addressing words to whatever cosmic presence his parents have implied by their behavior  —  a kind…"
- [long:46w] (¶11): "The child is not the exception that disproves the rule; the child is the species at its most fully natural and the species at its most fully natural is the species curved inward, naming whatever rises…"
- [long:60w] (¶20): "If prevenient grace is universal and restores the minimal capacity for spontaneous God-ward love, then we should expect to find instances of spontaneous God-ward love distributed across the unreached …"
- [long:56w] (¶27): "If you are reading this and you find, somewhere in your interior, that you do now want  —  spontaneously, undisturbed, in the quiet ordinary moments  —  to address the holy God of Israel in a prayer o…"
- [long:55w] (¶30): "If you are reading this and you have run the diagnostic on yourself and found nothing  —  if your interior, examined honestly, returns no instance of spontaneous prayer of pure love to the holy God of…"
- [long:83w] (¶32): "The whole sweep of the doctrine  —  the Father's eternal election in the eulogy of Ephesians 1 , the Son's once-for-all atonement at the mercy seat, the Spirit's effectual cardiac transplant by which …"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 4 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

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

### ethics-immigration.html — score 8

**Flagged sentences (8):**

- [long:51w] (¶2): "In verse 18 it gives the command that the whole world has heard, the command Jesus called the second greatest, the command even the secular borrow when they want to sound moral: "Do not seek revenge o…"
- [long:50w] (¶3): "Verse 18 says ve'ahavta lere'akha kamokha  —  "and you shall love your neighbor as yourself." Verse 34 says ve'ahavta lo kamokha  —  "and you shall love him as yourself," the same construction, the sa…"
- [long:50w] (¶6): "The nation is not the church, and the magistrate's vocation is not the believer's hospitality; God really did lend the sword to the state and really does hold it responsible for order, and a Christian…"
- [long:49w] (¶7): "You can hold the most defensible border policy in the world and still hold it from a heart that despises the stranger, that thanks God it was born inside the wall, that treats its citizenship  —  eart…"
- [long:54w] (¶12): "This is the staggering thing the immigration debate keeps you from feeling if you only ever stand inside the wall: God ran His border for the good of the people inside, and then He opened it, at the p…"
- [long:46w] (¶13): "Not because every prudential policy must collapse into open borders  —  Romans 13 still stands, and the state still bears its sword  —  but because the heart of stone that drew the circle of "mine" ar…"
- [long:58w] (¶15): "He set a place at the household table with your name carved into it before the foundation of the world, and He keeps it set , and He will not strike your name from the citizenship rolls of heaven, bec…"
- [long:56w] (¶16): "We adore the Father who loves the foreigner and defends the one with no defender; the Son whose blood paid the admission of those who could never afford it and whose cross is the only naturalization a…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### ethics-marriage.html — score 8

**Flagged sentences (8):**

- [long:48w] (¶5): "Two sinners are asked to act out, in the unglamorous theater of a shared kitchen and a shared bed and a shared mortgage, the greatest love story in the universe  —  and to do it so faithfully that any…"
- [long:54w] (¶7): "The cure for the abuse of headship is not the deletion of the text but the recovery of it: a husband who actually loved as Christ loved would lay down his life, his preferences, his very self, for the…"
- [long:46w] (¶7): "The Westminster Confession is blunt that the marriage covenant can be broken by the sinful party, and the Reformed tradition has never read "submit" as "endure violence"; the same Scripture that calls…"
- [long:47w] (¶8): "Both are being asked to keep a promise of permanent, self-spending faithfulness toward another sinner across decades  —  through illness, disappointment, financial fear, the slow erosions of familiari…"
- [long:46w] (¶10): "The God who began a good work in you will carry it on to completion , and the same God who keeps His own covenant when His Bride is unfaithful is the One who pours into a faltering marriage a love its…"
- [long:46w] (¶11): "The unmarried believer is not waiting in the lobby of the gospel  —  they are already the Bride of Christ, already loved with the very love marriage merely sketches, and Scripture honors singleness as…"
- [long:46w] (¶11): "And if you carry the grief of a marriage that ended  —  through your sin, through another's, through the slow catastrophe of two broken people  —  the One who witnessed your vow is also the One who bo…"
- [long:52w] (¶12): "We confess that we did not have the love the covenant required, and that the love poured into us was the Father's gift, won by the Son who gave Himself up for His Bride, applied by the Spirit who is e…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

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

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

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

### apologetic-gave-himself-for-the-bride.html — score 7

**Flagged sentences (7):**

- [long:64w] (¶4): "The objector says: "You are building a wall out of one pronoun while ignoring a flood of texts that go the other way. 'For God so loved the world that he gave his one and only Son' (John 3:16). 'He is…"
- [long:50w] (¶4): "The love of God is genuinely wide; the gospel really is to be preached to every person without exception; God really "wants all people to be saved and to come to a knowledge of the truth" (1 Timothy 2…"
- [long:50w] (¶5): "They establish that the cross bursts every ethnic and national boundary  —  world in John's vocabulary is the great undamming of grace beyond Israel, Jew and Gentile, every tribe and tongue; and they …"
- [long:47w] (¶5): "So the careful believer holds two things at once, and refuses to collapse either: God's revealed desire that all be saved is real, and the offer of Christ to all is sincere and free; and the Father's …"
- [long:64w] (¶7): "If Christ gave Himself with identical intent for every person who has ever lived, in order to present them all radiant and without blemish , then either every person will in fact be presented radiant …"
- [long:53w] (¶11): "The fearful Christian asks, but how do I know I am included?  —  and the answer is not a syllogism but a wedding ring: you are included if you have come to Him, because the coming itself is the eviden…"
- [long:49w] (¶12): "We adore the Father who chose a Bride before the world began; the Son who loved the church and gave Himself up for her, who will present her without one stain because He died to; the Spirit who is was…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-he-did-not-spare-his-own-son.html — score 7

**Flagged sentences (7):**

- [long:65w] (¶0): "Paul has been climbing toward it for a whole chapter  —  no condemnation, the Spirit's witness, the groaning creation, the unbreakable chain of "foreknew, predestined, called, justified, glorified"  —…"
- [long:60w] (¶1): "And Paul reaches for the single greatest gift in the universe  —  not a kidney, not a rescue, but the Father's "own Son," the eternal beloved, handed over to a Roman cross  —  and says: if that has al…"
- [long:66w] (¶4): "The cross and the intercession are the two halves of one priestly act, and they cover exactly the same people  —  the chosen, the given, the "us all." This is what the older writers meant by a definit…"
- [long:49w] (¶5): "And the whole Bible breathes a love for the world: 'God so loved the world that he gave his one and only Son.' Your 'definite atonement' makes God stingy, shrinks His love down to a chosen few, and tu…"
- [long:57w] (¶6): "Run it out: if the gift of the Son guarantees "all things" including final glory, and the Son was given for every person without exception, then every person without exception will be glorified  —  un…"
- [long:56w] (¶8): "The logic runs from Calvary forward and it never breaks, because the premise stands forever on a hill outside Jerusalem where a Father did not withhold His Son, and a Son did not refuse the cup, and a…"
- [long:48w] (¶9): "So we confess it, who once measured our safety by the strength of our own hold: that we were bought, not browsed; saved, not merely offered; that the Son was given for us by name, and the Father who d…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-loved-darkness-rather-than-light.html — score 7

**Flagged sentences (7):**

- [long:57w] (¶0): "Think of the one area of your life you would least want fully examined  —  not by strangers, but by someone who loved you and saw everything: the private browsing, the resentment you rehearse, the way…"
- [padding-modifier:into the dark] (¶1): "God did not leave humanity squinting into the dark for want of revelation; He sent the true Light, the Word made flesh, into the very room.…"
- [long:47w] (¶3): "The refusal is the symptom, and the reason Jesus gives is psychologically exact: "for fear that their deeds will be exposed." The light is hated not because it is false but because it is true  —  beca…"
- [long:46w] (¶4): "Notice it in yourself and in everyone you know: the way a hard conversation gets deflected with a joke; the way the convicting verse gets explained away; the way the quiet moment that might become pra…"
- [long:66w, padding-modifier:into the dark] (¶6): "Either you were, by some native superiority, the rare exception who loved the light when everyone else loved the dark  —  in which case the credit for your salvation is finally yours, and you have qui…"
- [long:47w, padding-modifier:into the dark] (¶10): "He so loved the world  —  He so loved you  —  that He gave the Son into the dark to be lifted up like the serpent in the wilderness, so that the very ones who hated the light might be made, by soverei…"
- [long:53w, padding-modifier:into the dark] (¶11): "So we confess it, who once loved the darkness and called our fleeing a search: that the light came and we hid; that we hated the exposure that was our only hope; and that we came into the light at las…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-purchased-from-every-tribe.html — score 7

**Flagged sentences (7):**

- [long:48w] (¶3): "The song says the Lamb purchased "persons from every tribe and language and people and nation." The Greek is ek pasēs phylēs kai glōssēs kai laou kai ethnous  —  and the load-bearing word is ek , "out…"
- [long:49w] (¶4): "The atonement here is not "every individual without exception." It is "particular persons out of every nation without distinction." This is the precise pattern the rest of Scripture draws everywhere: …"
- [long:47w] (¶5): "The man who thinks the cross only made salvation possible must hope his preaching tips the balance; the man who knows the Lamb has already purchased a people out of every nation goes to the nations ce…"
- [long:46w] (¶6): "Reading ek as a quiet limitation feels like theological sleight of hand: you have taken the most globe-spanning verse about the atonement and turned it into a fence." That is the strongest form of the…"
- [long:46w] (¶8): "It is about people the Lamb reached down and bought, out of every place where the lost are scattered  —  and if your heart aches to belong to Him, if the name of the Lamb is precious to you, that long…"
- [long:50w] (¶9): "If you are His, your voice was written into the new song before you were born, and on the day the scroll is fully opened you will sing it  —  not as a guest who slipped in, but as one of the very pers…"
- [long:50w] (¶10): "So we confess it, who once wondered whether the cross had room for us: that the Lamb was slain, and with His blood He purchased for God a people out of every tribe and language and people and nation  …"

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
