# Prose Integrity Audit (Phase F) — Scanner v2

**Generated:** 2026-05-21T02:14:24.874Z
**Spec:** `audit-prose.js v2` — redundancy (Jaccard ≥ 0.35 on significant-word bags) with **eight-class exemption filter** (closing-recurrence, Scripture-tsunami, pedagogical-anaphora, antithetical-parallelism, confessional-translation, historical-document-quotation, exegetical-comparison, research→pairing structural) + sentence-coherence heuristic with **anaphora/chiasm/embedded-quotation positive suppressors** + new **vehicle-tenor mismatch detector** (catches the original Aaron failure mode: simile whose vehicle and tenor are in incompatible domains).

**Mandate (Aaron, 2026-04-27):** "many articles repeat themselves usually a couple times but sometimes even 3 times within the article... also some sentences don't make sense... we do not start expanding the website until every last sentence, paragraph, and article are written perfectly."

**v2 design goal (Aaron, 2026-04-28):** "robust and comprehensive as well as efficient and effective." The v2 scanner suppresses apex-tier false positives at the eight known exemption classes while adding a dedicated detector for the failure mode that triggered Phase F (vehicle-tenor mismatch in similes — the broken-roof-being-lifted-off failure).

---

## §I — Aggregate

| Metric | Value |
|---|---|
| Articles audited | 527 |
| Articles entirely clean | 169 (32.1%) |
| Articles with (genuine) redundancy | 13 (2.5%) |
| Articles with (genuine) flagged sentences | 351 (66.6%) |
| **Total redundancy pairs flagged (genuine)** | **13** |
| **Total sentences flagged (genuine)** | **910** |
| Redundancy pairs suppressed (apex-tier exemptions) | 19 |
| Sentence flags suppressed (coherence-positive) | 138 |

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
2. **apologetic-lydias-heart.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 42 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
3. **apologetic-not-because-but-because.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 40 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
4. **apologetic-revival-and-sovereign-grace.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 33 paragraphs)
5. **apologetic-the-cardiac-transplant.html** — score 11 (0 redundancy pairs, 11 flagged sentences, 38 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
6. **apologetic-tetagmenoi-acts-13-48.html** — score 10 (0 redundancy pairs, 10 flagged sentences, 45 paragraphs) *[0 pairs + 4 sentences auto-suppressed]*
7. **apologetic-the-cardiology-of-the-fall.html** — score 10 (0 redundancy pairs, 10 flagged sentences, 46 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
8. **apologetic-the-unbroken-chain.html** — score 10 (0 redundancy pairs, 10 flagged sentences, 38 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
9. **apologetic-the-eulogy-greek-of-ephesians-1.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 34 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
10. **ephesians-1-3-14.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 33 paragraphs) *[0 pairs + 3 sentences auto-suppressed]*
11. **response-jerry-walls.html** — score 9 (0 redundancy pairs, 9 flagged sentences, 63 paragraphs)
12. **apologetic-hilasterion-the-mercy-seat.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 34 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
13. **apologetic-nothing-can-separate.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 27 paragraphs)
14. **apologetic-the-once-for-all-ephapax.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 41 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
15. **apologetic-the-prayer-you-never-spontaneously-prayed.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 35 paragraphs) *[0 pairs + 4 sentences auto-suppressed]*
16. **argument-cost-of-being-wrong.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 63 paragraphs)
17. **story-dark-the-rope-you-wove-yourself.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 49 paragraphs)
18. **theologian-augustine.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 43 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
19. **theologian-gottschalk.html** — score 8 (0 redundancy pairs, 8 flagged sentences, 28 paragraphs)
20. **ot-joseph.html** — score 7 (0 redundancy pairs, 7 flagged sentences, 26 paragraphs)
21. **apologetic-ekloge-the-greek-of-election.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 44 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
22. **apologetic-the-double-grip-of-john-10.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 40 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
23. **question-predestined-to-hell.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 45 paragraphs)
24. **systematic-covenant-redemption.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 61 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
25. **systematic-effectual-calling.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 35 paragraphs)
26. **westminster-chapter-3-plain-english.html** — score 6 (0 redundancy pairs, 6 flagged sentences, 93 paragraphs) *[5 pairs + 2 sentences auto-suppressed]*
27. **apologetic-for-the-sheep.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 25 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
28. **demolition-romans2-4.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 22 paragraphs)
29. **devotional-i-cant-feel-god.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 44 paragraphs)
30. **devotional-joy-of-election.html** — score 5 (1 redundancy pair, 3 flagged sentences, 52 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
31. **devotional-the-hands-that-hold-you.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 32 paragraphs)
32. **devotional-the-secretly-ashamed.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 36 paragraphs)
33. **devotional-valley-shadow.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 38 paragraphs)
34. **history-open-theism.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 27 paragraphs)
35. **history-spurgeon-downgrade.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 22 paragraphs)
36. **letters-senior-demon-arminianism.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 49 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
37. **philosophy-adam-test.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 42 paragraphs)
38. **question-chosen.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 37 paragraphs)
39. **question-revelation13.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 30 paragraphs) *[1 pairs + 1 sentences auto-suppressed]*
40. **response-william-lane-craig.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 57 paragraphs)
41. **romans-9-deep-dive.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 82 paragraphs)
42. **story-the-garden-that-grew-itself.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 42 paragraphs)
43. **systematic-prolegomena.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 28 paragraphs)
44. **theologian-bradwardine.html** — score 5 (0 redundancy pairs, 5 flagged sentences, 29 paragraphs)
45. **acts-13-48.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 33 paragraphs) *[0 pairs + 2 sentences auto-suppressed]*
46. **analogy-song-you-didnt-compose.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 41 paragraphs)
47. **apologetic-arrabon-the-down-payment.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 32 paragraphs)
48. **apologetic-the-conscience-that-only-accuses.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 25 paragraphs)
49. **apologetic-the-fourth-day-corpse.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 31 paragraphs) *[0 pairs + 1 sentences auto-suppressed]*
50. **counter-cs-lewis-free-will.html** — score 4 (0 redundancy pairs, 4 flagged sentences, 33 paragraphs)

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
- [long:67w] (¶4): "The Spirit poured out in measurable, observable, sociologically documented power, and the message that was being preached when the outpouring came was the message that the human being is dead in tresp…"
- [long:49w] (¶6): "Its national spread came through itinerant preachers who criss-crossed the colonies in the 1740s  —  most famously George Whitefield , the English evangelist whose voice could be heard, by Benjamin Fr…"
- [long:50w] (¶8): "Compare this with the contemporary work of Charles Finney , whose Pelagianizing methods produced large numerical results but, by Finney's own later admission in his Memoirs , an attrition rate so deva…"
- [long:88w] (¶12): "Letters and diaries from the period record the experience again and again: a congregation gathered for an ordinary service; the minister rose to preach what he had prepared; before he had finished his…"
- [long:46w] (¶23): "The conclusion is more modest and more disturbing: when the Spirit's outpouring has been sustained, undeniable, and historically transformative, the doctrine being preached at the pulpit has, with rem…"
- … and 3 more.

### apologetic-the-cardiac-transplant.html — score 11

**Flagged sentences (11):**

- [long:46w] (¶2): "The human party in these sentences is grammatically the object  —  the one to whom things are done  —  and the agent in these sentences is the LORD God of Israel, who alone has the authority and the s…"
- [long:48w] (¶16): "The walking happens because the causing happens; the causing happens because the Spirit-indwelling happens; the Spirit-indwelling happens because the new heart has been installed; the new heart has be…"
- [long:53w] (¶21): "From the outside  —  from the narrator's point of view, from God's point of view, from Luke's editorial point of view  —  the experience is one of divine cardiac surgery performed on a heart that was,…"
- [long:59w] (¶23): "The heart, the modern reader knows, is a muscular pump; the seat of the will is in the brain; the prefrontal cortex makes decisions in concert with the limbic system; preferences are forged from genet…"
- [long:53w] (¶24): "If the seat of the will is in the brain  —  if every preference is the output of a brain state  —  then the question becomes: what kind of brain state would have to obtain for a human being whose defa…"
- [long:62w] (¶31): "Each grounded in a different register  —  apostolic narrative, historical pattern, prophetic oracle  —  but each arriving at the same observation: when grace reaches the elect heart, the grace is not …"
- [long:64w] (¶31): "Add to those three the Greek of eklogē and the eulogy of Ephesians 1 for unconditional election ; the priest's onyx stones , the Owen Trilemma , the mercy seat in Greek , and the ephapax chain in Hebr…"
- [long:54w] (¶32): "If you are reading this with a heart that has, somewhere along the way, come to love what it once did not love and to hate what it once hated, you are looking at the empirical evidence of a cardiac tr…"
- … and 3 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-tetagmenoi-acts-13-48.html — score 10

**Flagged sentences (10):**

- [long:54w] (¶7): "Third, the auxiliary. Ēsan is the third-person plural imperfect indicative of eimi , "to be." When the imperfect of eimi is combined with a perfect passive participle, the result is the periphrastic p…"
- [long:54w] (¶10): "The synergist will note this ambiguity and propose that tetagmenoi in Acts 13:48 could be read as middle rather than passive  —  yielding the translation "as many as had disposed themselves to eternal…"
- [long:50w] (¶23): "The authorities that exist have been established by God." The Greek behind both established forms is from tassō , and the second occurrence is tetagmenai eisin  —  the periphrastic perfect passive, th…"
- [long:47w] (¶27): "The destination of the appointing  —  eis zōēn aiōnian , "into eternal life"  —  was the same eternal life Paul had just named in verse 46 as the inheritance that the rejecting Jews had judged themsel…"
- [long:58w] (¶28): "The same Luke records Christ Himself, in the Gospel that bears the same author's name, saying in Luke 10:21-22 : "At that time Jesus, full of joy through the Holy Spirit, said, 'I praise you, Father, …"
- [long:50w] (¶28): "No one knows who the Son is except the Father, and no one knows who the Father is except the Son and those to whom the Son chooses to reveal him.'" The same Greek root  —  eudokia ("good pleasure") be…"
- [long:66w] (¶31): "The reader, two thousand years later, is being told that the same sorting was happening at his own first hearing of the gospel  —  that the same Lord was, by the same logic, marking some hearers as ap…"
- [long:89w] (¶32): "Either you have, somewhere in your past or your present, found yourself believing in the Lord Jesus Christ  —  in which case the Greek of Acts 13:48 says of you, with no possibility of softening, that…"
- … and 2 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 4 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-cardiology-of-the-fall.html — score 10

**Flagged sentences (10):**

- [long:47w] (¶1): "Twice in the Hebrew Bible  —  once in Genesis, once in Jeremiah, six centuries apart, by two writers who never met, in two completely different genres of literature  —  the LORD looks at the chart of …"
- [long:59w] (¶5): "The yetzer of a thing is what it has been shaped to incline toward; it is the engineered bent, the default trajectory. machshvot  —  "thoughts, plans, devisings"  —  the plural of machshavah , the cog…"
- [long:59w] (¶10): "The kingdom of Israel has split, the northern tribes have been carried into Assyria, the southern kingdom of Judah is on the verge of being carried into Babylon, and the prophet Jeremiah is standing a…"
- [long:55w] (¶29): "This is what Augustine meant by his famous remark that the virtues of the pagans are, at best, "splendid vices"  —  the actions look like virtues from the outside but, when traced to the inclination b…"
- [long:47w] (¶36): "Vekhol-yetzer raq ra kol-hayom  —  every inclination only evil all the time  —  is the diagnosis that makes the Son's definite atonement necessary, because nothing less than a substitute who actually …"
- [long:57w] (¶38): "The angle joins the previously-deployed angles of the unprompted-prayer test ( start-here-phase1 ), the flesh-vs.-Bible test (the drowning-man analogy ), the infant-sin test, the sleep-test, the good-…"
- [long:96w] (¶39): "Add to the depravity case the four facets the site has built for the other four doctrines of grace  —  the Greek of eklogē and the eulogy of Ephesians 1 for election ; the priest's onyx stones , the O…"
- [long:58w] (¶41): "The fact that the refinement is ongoing  —  that you still catch the heart in moments of self-deception , that the rehearsed grievance still surfaces, that the affection for God still feels weaker tha…"
- … and 2 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-unbroken-chain.html — score 10

**Flagged sentences (10):**

- [long:48w] (¶3): "The fifth  —  glorification  —  is the resurrection-body, sinless-presence-with-God state that the Roman believers were still hoping for in the next chapter, the one Paul will spend chapters 9 through…"
- [long:46w] (¶8): "The human being's salvation is being told to her from the perspective of the seat above the world, where the wedding has already happened, the trumpet has already sounded, the dead have already been r…"
- [long:48w] (¶12): "The unbroken pronoun and the unbroken aorist together close the door on every reading in which the believer's perseverance is conditioned on her own ongoing faithfulness, and they open the door wide o…"
- [long:59w] (¶20): "The aorist of glorification is the grammar of an accomplishment so secure that the apostle's rhetorical position is to look back on it from the future, the way a parent looks back on the graduation of…"
- [long:54w] (¶25): "Neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the…"
- [long:53w] (¶28): "The Father chooses; the Son atones; the Spirit indwells; the Father's choice is the cause of the Son's atonement; the Son's atonement is the cause of the Spirit's indwelling; and the Spirit's indwelli…"
- [long:51w] (¶28): "Add to those facets the deep-Greek of Romans 9 election , the neuroscience-of-conversion case for irresistible grace at Lydia's heart , the trilemma of Owen's argument for definite atonement , and the…"
- [long:86w] (¶30): "If you were not, then the chain has not yet begun for you, and the more pressing question is whether the Father will give you the gift of faith tonight by which the chain begins. (He gives it generous…"
- … and 2 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-eulogy-greek-of-ephesians-1.html — score 9

**Flagged sentences (9):**

- [long:79w] (¶0): "Two hundred and one words in the Greek, no period anywhere in the middle, no full stop until the end of verse fourteen  —  a single grammatical structure of breathtaking length, ornamented like a cath…"
- [long:49w] (¶9): "The Son was set apart as the Lamb before the world was made; the believer was set apart as the Bride before the world was made; and the temporal unfolding of redemption is the working out of an agreem…"
- [long:49w] (¶10): "If you wished to insert a foreseen-faith basis into pro katabolēs kosmou , you would have to argue that God, before the cosmos existed, looked forward into a future He had not yet decreed and observed…"
- [long:55w] (¶11): "The preposition kata here governs the standard or pattern according to which an action is taken; eudokia is the compound noun from eu (good) and dokein (to seem, to think, to deem)  —  literally, that…"
- [long:52w] (¶22): "To be elect in Christ is to be a member of the body of Christ; and to be a member of the body of Christ is, by Paul's repeated insistence, to have been placed there by the Spirit who applied the Fathe…"
- [long:63w] (¶27): "Add to those readings the Aaron's-onyx-stones case for definite atonement , the down-payment case for perseverance , the proleptic-aorist case for perseverance , the Acts 16:14 case for irresistible g…"
- [long:66w] (¶27): "Every Greek word, every historical episode, every philosophical move converging on the same observation that the apostle Paul, the Reformer Calvin, the Puritan Owen, the awakened Edwards, and the Wels…"
- [long:84w] (¶30): "The eulogy is enrolling you, by the very act of reading, in the doxological refrain  —  to the praise of His glory  —  which is the only sane response a creature can have to the discovery that her exi…"
- … and 1 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### ephesians-1-3-14.html — score 9

**Flagged sentences (9):**

- [long:48w] (¶0): "In the Greek of the earliest manuscripts, Ephesians 1:3 through 1:14 is a single, unpunctuated, breathlessly cascading sentence  —  202 words without a period, 8 finite verbs, 12 participles, 11 prepo…"
- [long:50w] (¶1): "Paul is composing, in twelve consecutive verses, a eulogy for the work of the Triune God in the salvation of the elect. (The Greek of the sentence is treated exhaustively in the eulogy Greek of Ephesi…"
- [long:57w] (¶2): "Each movement closes with the same refrain: eis epainon doxēs autou , "to the praise of His glory." The refrain functions as the rhyme in a sonnet  —  it falls at the end of each section, marks the se…"
- [long:89w] (¶16): "And the Spirit is named, in verse 14, as ho arrabōn tēs klēronomias hēmōn  —  "the down payment of our inheritance." The Greek arrabōn is a commercial term from the marketplace: the first installment …"
- [long:62w] (¶18): "On this reading, God before the foundation of the world chose Christ , and chose that there would be a people in Christ ; the individual believer enters this elect group by his own free decision to be…"
- [long:46w] (¶23): "If God's choosing of Christ is what verse 4 is about, then the phrase before the foundation of the world is filler  —  of course the eternal Son was eternally with the Father; of course there was no c…"
- [long:48w] (¶25): "Which means  —  and this is where the crown jewel lands  —  that if you have come to believe in Christ, your believing is the historical evidence of an eternal love that has been pursuing you since be…"
- [long:65w] (¶30): "The grace is not a partial achievement of human and divine working together; the grace is the unilateral act of a sovereign God whose decision to save you was made before you existed, executed in a So…"
- … and 1 more.

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 3 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

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

### apologetic-hilasterion-the-mercy-seat.html — score 8

**Flagged sentences (8):**

- [long:46w] (¶4): "The blood does not atone if it is sprinkled outside the most holy place; it does not atone if it is sprinkled on the floor; it does not atone if it is sprinkled on the curtain or on the menorah or on …"
- [long:58w] (¶8): "He is saying: that thing the high priest sprinkles blood on once a year for the covenant people  —  Jesus is that thing, and His blood is the blood that has been sprinkled there, and the day when aton…"
- [long:50w] (¶9): "To apply it to Christ is to say the same thing with respect to Christ that was always true with respect to the lid: the atonement is made here, with this blood, for these people, by the divine arrange…"
- [long:57w] (¶13): "If the Son's atoning work is grounded in His high-priestly intercession (as Hebrews 7:25 and 9:24 explicitly teach), then the people for whom the atonement was made are the people for whom the prayer …"
- [long:48w] (¶20): "The atonement is universal in its sufficiency  —  the value of Christ's blood is infinite and would be enough to cover every sin of every human being who ever lived  —  but particular in its efficienc…"
- [long:53w] (¶23): "If the atonement was made for the non-elect, then the non-elect have had their sins atoned for; and if their sins have been atoned for, then God cannot justly punish them in hell for those sins, becau…"
- [long:68w] (¶25): "Add to those three the Greek-of-election arguments for unconditional election ( Romans 9 and Ephesians 1's eulogy ), the Greek-of-perseverance arguments ( arrabōn and the proleptic aorist ), the irres…"
- [long:90w] (¶31): "The whole sweep of the doctrine  —  the Father's eternal-past election in the eulogy of Ephesians 1, the Son's particular atonement at the mercy seat in Romans 3:25, the Spirit's effectual call at the…"

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
- [long:97w] (¶14): "If the sacrifice was offered for the non-elect in the same sense in which it was offered for the elect, then the verbs in the chain would have to be downgraded for the non-elect: obtained eternal rede…"
- [long:50w] (¶23): "The High Priest does not need to die again because the death was sufficient once for all; He does need to keep living and keep interceding, because the people for whom He died are still on the way to …"
- [long:81w] (¶25): "The fuller treatment lives in the systematic apologetic for definite atonement ; the present article only need note the relevant contour. 1 Timothy 2:6's pantōn is governed, in context, by the same lo…"
- [long:50w] (¶32): "Add to those four the Greek of eklogē and the eulogy of Ephesians 1 for unconditional election ; the arrabōn and unbroken chain for perseverance ; the Lord's opening of Lydia's heart and the historica…"
- [long:80w] (¶37): "The whole sweep of the doctrine  —  the Father's eternal election in the eulogy of Ephesians 1 , the Son's atonement at the mercy seat , the Spirit's effectual opening of the heart at Lydia's riverban…"

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

### apologetic-ekloge-the-greek-of-election.html — score 6

**Flagged sentences (6):**

- [long:47w] (¶3): "In the Septuagint it is the standard word for God choosing Israel out of all the nations of the earth  —  an act in which Israel had not yet been formed as a nation, could not have lobbied for the cho…"
- [long:50w] (¶3): "In the New Testament, Luke uses it for Jesus choosing the Twelve out of His broader following, and Paul uses the related noun eklogē seven times  —  every single instance referring to a divine selecti…"
- [long:51w] (¶6): "And inside that beam are two Greek words  —  eklogē and prothesis  —  that we are now going to take down and examine separately, because the apostle has set them in load-bearing positions and the hear…"
- [long:55w] (¶21): "The second escape attempt is the corporate-election reading: that Romans 9 is about Israel as a nation, not about individuals; that Jacob and Esau stand for the peoples of Israel and Edom; that the el…"
- [long:54w] (¶24): "The chapter that follows opens with "It is not as though God's word had failed" and develops the point through a series of singular-recipient examples: Pharaoh (an individual), the potter and the lump…"
- [long:48w] (¶35): "The weight of my salvation rests not on the strength of my grip but on the disposition of the One whose mercy reached me before I was born, before I had done anything good or bad, before my will or my…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

### apologetic-the-double-grip-of-john-10.html — score 6

**Flagged sentences (6):**

- [long:47w] (¶1): "One day in the late autumn of 29 AD, at the Feast of Dedication, in the colonnade of Solomon's portico on the temple mount, the Good Shepherd Himself faced down a group of Pharisees who had been deman…"
- [long:49w] (¶1): "He told them they did not believe Him because they were not His sheep  —  and then He told them, in two sentences of Koine Greek so dense with grammatical force that no English translation can carry t…"
- [long:47w] (¶9): "The synergistic objection that the sheep might wander off on their own does not even come into view in Jesus' grammar, because Jesus is naming the most extreme thing that could be attempted against th…"
- [long:67w] (¶19): "Wesley's case for the possibility of apostasy held, in its most generous form, that perseverance is conditioned on continuing faith; that the believer who ceases to believe ceases to be a believer; th…"
- [long-simile:19w] (¶36): "This is why the believer's faith, even at its weakest, even when it is mustard-seed small, even when it feels like a smoldering wick that the next breeze will extinguish  —  is sufficient evidence tha…"
- [long:73w] (¶38): "The whole sweep of the doctrine  —  the Father's eternal election in Ephesians 1's eulogy , the Son's once-for-all atonement at the mercy seat, the Spirit's cardiac transplant of Ezekiel 36, the Spiri…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 2 sentence flags suppressed (anaphora / chiasm / embedded-quotation)

### question-predestined-to-hell.html — score 6

**Flagged sentences (6):**

- [padding-modifier:in the dark] (¶1): "The ceiling is somewhere above you in the dark, and you cannot see it, but you know it is there the way you know the floor of an ocean is there under a boat at night.…"
- [padding-modifier:in the dark] (¶23): "Lie still again in the dark bedroom.…"
- [padding-modifier:into the dark] (¶37): "Vessels of wrath do not lie awake weeping into the dark that they might not be chosen.…"
- [padding-modifier:in the dark] (¶39): "And you are lying in the dark, and the pressure in your chest is not condemnation any longer  —  it is ache.…"
- [padding-modifier:in the dark] (¶40): "So hear this in the dark.…"
- [padding-modifier:in the dark] (¶42): "But because it has been answered, and the Answer is already in bed with you holding you like a Father holds a frightened child in the dark, whispering the one sentence that will finally let you sleep:…"

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

### apologetic-for-the-sheep.html — score 5

**Flagged sentences (5):**

- [long:46w] (¶0): "And it is, at the same time, one of the clearest texts in the New Testament for a doctrine many of those same believers have been taught to fear: that the cross had a definite design, a specific inten…"
- [long:48w] (¶2): "The good shepherd lays down his life for the sheep." (John 10:11) And again, four verses later, with the relationship spelled out: "I am the good shepherd; I know my sheep and my sheep know me  —  jus…"
- [long:64w] (¶3): "The preposition hyper , when it governs the genitive case as it does here, is the preposition of substitution and benefit: "on behalf of," "in the place of," "for the sake of." It is the same preposit…"
- [long:51w] (¶21): "But if, somewhere underneath your fear, the voice of Christ in this discourse does not repel you but draws you  —  if "the Lord is my shepherd" makes something in your chest lean toward Him rather tha…"
- [long:59w] (¶22): "And if it sounds like the one your whole life has been straining to hear, then come  —  and discover on the inside of the fold that the Shepherd knew your name before you knew His, and laid down His l…"

**Suppressions** (auto-filtered as exemptions / coherence-positives):

- 1 sentence flag suppressed (anaphora / chiasm / embedded-quotation)

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
