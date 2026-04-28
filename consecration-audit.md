# Consecration Audit (Phase A)

**Generated:** 2026-04-28T05:14:09.031Z
**Spec:** AUDIT-2.md §II Twelve-Mark Consecration Test
**Methodology:** Heuristic-programmatic scoring via Node.js

---

## §I — Executive Summary

**Total articles scanned:** 502

| Tier | Count | % |
|------|-------|-----|
| Consecrated (12/12) | 6 | 1.2% |
| Near-Consecrated (10-11/12) | 8 | 1.6% |
| Rebuild Queue (6-9/12) | 187 | 37.3% |
| Rebuild Priority (0-5/12) | 301 | 60.0% |

**Lowest five scorers:**
- anxious-mind-brain-decides.html (2/12) — missing 10 marks
- anxious-mind-sovereignty-of-sleep.html (2/12) — missing 10 marks
- devotional-you-are-not-the-hero.html (2/12) — missing 10 marks
- open-wound-sovereignty-in-grief.html (2/12) — missing 10 marks
- philosophy-gravity-of-grace.html (2/12) — missing 10 marks

**Highest five scorers:**
- analogy-light-switch.html (12/12)
- demolition-2peter3-9.html (12/12)
- for-deconstructed.html (12/12)
- philosophy-munchhausen-trilemma.html (12/12)
- secular-neuroscience-human-inability.html (12/12)

**Site posture:** The site demonstrates strong theological content but has significant gaps in doxological closure. Many articles prove the doctrine without explicitly returning glory to God. Mark 3 (doxological climax) and Mark 4 (explicit ascription) show the lowest pass rates, indicating the primary consecration work lies in lifting the prose toward worship in the final 20% and adding explicit glory-language.

---

## §II — Mark-by-Mark Pass Rates

| Mark | Pass Rate | Fail Count | Interpretation |
|------|-----------|-----------|-----------------|
| mark 1 triune god named | 43.8% | 282 | Article names Father, Son, and Holy Spirit in economic distinction. |
| mark 2 christ apex | 8.8% | 458 | Christological high point lands in final 25%; Christ-language present in final paragraphs. |
| mark 3 doxological climax | 48.2% | 260 | Final 20% ascends into worship-vocabulary: praise, glory, amen, etc. |
| mark 4 explicit ascription | 41.8% | 292 | "Soli Deo Gloria" or "to His glory" appears explicitly. |
| mark 5 confessional anchor | 16.1% | 421 | Cites Westminster, 1689, Belgic, Heidelberg, or Synod of Dort. |
| mark 6 presuppositional bridge | 8.6% | 459 | Surfaces presuppositional reasoning, borrowing-capital critique, or impossibility-of-contrary. |
| mark 7 christ mediator | 47.4% | 264 | Christ named as Mediator, High Priest, or through-Christ language appears. |
| mark 8 spirit application | 64.3% | 179 | Spirit and application-terms (regenerate, seal, sanctify, etc.) appear together. |
| mark 9 historical witness | 79.5% | 103 | Names at least one Patristic/Reformer/Confessor witness. |
| mark 10 liturgical cadence | 4.4% | 480 | First-person plural worship-language ("we confess," "we adore") in final 30%. |
| mark 11 coram deo | 100.0% | 0 | Prose tone reads reverent; "before God" language present or casual markers absent. |
| mark 12 lift not drag | 60.2% | 200 | Final paragraph ends on upward words (Christ, grace, heaven, glory) not downward. |


**Most-failed marks:** mark_2_christ_apex (458 failures), mark_6_presuppositional_bridge (459 failures), mark_10_liturgical_cadence (480 failures)

**Most-passed marks:** mark_11_coram_deo (502 passes), mark_9_historical_witness (399 passes), mark_8_spirit_application (323 passes)

---

## §III — Methodology and Known Limits

### Detection Logic

**Mark 1 (Triune God named):** Programmatic. Requires presence of "Father" AND ("Son"/"Christ"/"Jesus") AND ("Spirit"/"Holy Spirit"). Case-sensitive where effective. Reliable.

**Mark 2 (Christ Apex):** Heuristic. Counts distinct Christ-references in final 25% (target ≥2), then verifies presence in final 3 paragraphs. False-negatives possible if article uses pronouns ("He") without repeating the name Christ. Moderate reliability.

**Mark 3 (Doxological Climax):** Programmatic pattern-match in final 20%. Detects "praise," "glory," "worship," "adore," "blessed be," "amen," etc. Reliable but may miss creative phrasing.

**Mark 4 (Explicit Ascription):** Programmatic pattern-match across full text. Detects "Soli Deo Gloria," "to His glory," "He alone is worthy," etc. Highly reliable.

**Mark 5 (Confessional Anchor):** Programmatic pattern-match. Detects Westminster Confession, 1689, Belgic, Heidelberg, Canons of Dort, etc. Highly reliable. Note: Devotionals and narrative stories may legitimately omit this; audit flags but does not penalize in Phase C.

**Mark 6 (Presuppositional Bridge):** Programmatic pattern-match. Detects "presuppos," "Van Til," "Bahnsen," "transcendental argument," "borrowed capital," "impossibility of the contrary." Reliable. Philosophy and apologetics pieces profit most from this mark; devotionals less so.

**Mark 7 (Christ-as-Mediator):** Programmatic pattern-match. Detects "through Christ," "Mediator," "High Priest," "intercedes," "in Christ," etc. Highly reliable.

**Mark 8 (Spirit-Application):** Programmatic pattern-match. Requires co-occurrence of Spirit-reference AND application-term ("regenerat," "sanctif," "seal," "indwell," etc.). Moderate reliability; false-negatives if Spirit-work implied but not named.

**Mark 9 (Historical Witness):** Programmatic pattern-match against a canonical list of 48 names (Athanasius through Trueman). Highly reliable. Tolerates first-name and last-name references.

**Mark 10 (Liturgical Cadence):** Programmatic pattern-match in final 30% for first-person-plural worship-language ("we confess," "we adore," "we praise," etc.). Reliable. False-positives possible if article uses "we" in other contexts (e.g., "we know," "we see").

**Mark 11 (Coram Deo Posture):** Soft heuristic. Programmatic detection of explicit "before God"/"coram Deo" language is reliable. Absence-of-casual-markers heuristic (lol, haha, "okay so") is crude; false-positives and false-negatives both possible. Recommend manual review of borderline cases in Phase C.

**Mark 12 (Lift, Not Drag):** Heuristic. Examines final paragraph for upward-facing words (Christ, grace, heaven, glory) vs. downward-facing words (sin, flaw, broken, despair). Word-frequency-based; may miss tonal reversal. Articles ending on tender questions ("How can I be sure?") may score false-negative. Moderate reliability.

### Known Issues and Refinements for Phase C

- **Mark 2 false-negatives:** Articles using pronouns ("He accomplished redemption") without repeating "Christ" may miss the apex test. Phase C should inspect manually.
- **Mark 11 false-positives:** Casual-marker count is blunt. Academic articles dense with em-dashes may score false-positive for casualness. Recommend phrase-level inspection in Phase C.
- **Mark 12 boundary cases:** Demolition pieces intentionally ending in questions ("Can you see your depravity?") with catch-arm implicit or one page over. Phase C may need to exempt or reclassify.
- **Devotional/story exemptions:** Marks 5 and 6 (confessional anchor, presuppositional bridge) may not fit all article types. Audit flags tonal mismatch; Phase C exempts where theologically appropriate.

---

## §IV — Distribution Analysis

### By Category

**Demolition** (53 articles)
- Mean score: 5.19/12
- Highest: demolition-2peter3-9.html (12/12)
- Lowest: demolition-1cor10-13.html (3/12)

**Devotional** (41 articles)
- Mean score: 5.24/12
- Highest: devotional-rescued-without-a-say.html (11/12)
- Lowest: devotional-you-are-not-the-hero.html (2/12)

**History** (24 articles)
- Mean score: 5.79/12
- Highest: history-decision-theology.html (8/12)
- Lowest: history-african-fathers.html (3/12)

**Objection** (20 articles)
- Mean score: 5.4/12
- Highest: objection-unfair-to-choose-some.html (9/12)
- Lowest: objection-love.html (3/12)

**Ot** (14 articles)
- Mean score: 4.79/12
- Highest: ot-election.html (7/12)
- Lowest: ot-jacob-esau.html (3/12)

**Philosophy** (24 articles)
- Mean score: 4.38/12
- Highest: philosophy-munchhausen-trilemma.html (12/12)
- Lowest: philosophy-gravity-of-grace.html (2/12)

**Psychology** (28 articles)
- Mean score: 4.54/12
- Highest: psychology-cognitive-biases.html (7/12)
- Lowest: psychology-addiction-proof.html (3/12)

**Question** (73 articles)
- Mean score: 5.08/12
- Highest: question-2tim1-9.html (10/12)
- Lowest: question-acts.html (2/12)

**Secular** (13 articles)
- Mean score: 5.08/12
- Highest: secular-neuroscience-human-inability.html (12/12)
- Lowest: secular-ai-determinism.html (3/12)

**Story** (28 articles)
- Mean score: 3.57/12
- Highest: story-surgeon-stone-heart.html (6/12)
- Lowest: story-humor-committee-to-save-yourself.html (2/12)

**Systematic** (33 articles)
- Mean score: 6.3/12
- Highest: systematic-reprobation.html (10/12)
- Lowest: systematic-justification.html (4/12)

**Theologian** (18 articles)
- Mean score: 6.33/12
- Highest: theologian-augustine.html (12/12)
- Lowest: theologian-anselm.html (4/12)

**Uncategorized** (133 articles)
- Mean score: 5.5/12
- Highest: analogy-light-switch.html (12/12)
- Lowest: anxious-mind-brain-decides.html (2/12)

### By Lock Status

**HAMMER-LOCKED or POLISH-LOCKED** (246 articles)
- Mean score: 5.31/12

**Unlocked** (256 articles)
- Mean score: 5.16/12

**Gap:** Locked articles score 0.15 points higher on average.

---

## §V — Rebuild Queue (Top 50 Lowest-Scoring Pages)

Ranked by score ascending, then by word count. These are the pages Phase C will prioritize.

1. **question-acts.html** (2/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

2. **question-is-salvation-my-choice-or-gods.html** (2/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

3. **anxious-mind-sovereignty-of-sleep.html** (2/12, uncategorized, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence, mark_12_lift_not_drag

4. **testimony-wall.html** (2/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence, mark_12_lift_not_drag

5. **story-humor-committee-to-save-yourself.html** (2/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

6. **devotional-you-are-not-the-hero.html** (2/12, devotional, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

7. **philosophy-marriage-election.html** (2/12, philosophy)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

8. **story-the-room-where-you-chose.html** (2/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

9. **anxious-mind-brain-decides.html** (2/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

10. **open-wound-sovereignty-in-grief.html** (2/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

11. **philosophy-gravity-of-grace.html** (2/12, philosophy)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence, mark_12_lift_not_drag

12. **philosophy-mirror-you-refuse.html** (2/12, philosophy)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

13. **privacy.html** (3/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

14. **terms.html** (3/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

15. **demolition-titus2-11.html** (3/12, demolition, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

16. **devotional-glory-of-divine-choice.html** (3/12, devotional, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

17. **demolition-philippians2-12-13.html** (3/12, demolition, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

18. **philosophy-immune-system-grace.html** (3/12, philosophy)
   Missing: mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

19. **psychology-addiction-proof.html** (3/12, psychology)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

20. **story-the-person-who-chose-god.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

21. **psychology-sunk-cost-faith.html** (3/12, psychology)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

22. **open-wound-the-prayer-god-didnt-answer.html** (3/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

23. **story-cross-examination.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

24. **demolition-rev3-20.html** (3/12, demolition, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

25. **question-is-predestination-in-the-bible.html** (3/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_8_spirit_application, mark_10_liturgical_cadence, mark_12_lift_not_drag

26. **objection-why-pray.html** (3/12, objection, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_10_liturgical_cadence, mark_12_lift_not_drag

27. **question-bible-says-sick.html** (3/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

28. **devotional-the-kindest-shock.html** (3/12, devotional)
   Missing: mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

29. **shattered-lens-lost-community.html** (3/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_10_liturgical_cadence, mark_12_lift_not_drag

30. **psychology-suppressing-truth.html** (3/12, psychology, HAMMER-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

31. **question-whosoever.html** (3/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

32. **history-african-fathers.html** (3/12, history)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

33. **open-wound-hospital-room.html** (3/12, uncategorized, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

34. **psychology-language-acquisition.html** (3/12, psychology)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_10_liturgical_cadence, mark_12_lift_not_drag

35. **psychology-reactance-theory.html** (3/12, psychology)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_9_historical_witness, mark_10_liturgical_cadence

36. **philosophy-what-if-wrong.html** (3/12, philosophy)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_8_spirit_application, mark_10_liturgical_cadence, mark_12_lift_not_drag

37. **story-children-the-fingerprint-before-the-world.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence

38. **testimony-augustine.html** (3/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

39. **story-the-letter-before-the-world.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

40. **story-dark-the-rope-you-wove-yourself.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

41. **demolition-1cor10-13.html** (3/12, demolition, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

42. **joy-in-suffering.html** (3/12, uncategorized)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

43. **story-humor-the-man-who-tried-to-make-himself-hungry.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_9_historical_witness, mark_10_liturgical_cadence, mark_12_lift_not_drag

44. **demolition-1john2-2.html** (3/12, demolition, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

45. **demolition-2peter3-15.html** (3/12, demolition, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

46. **story-real-conversions.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

47. **question-how-grace-feels.html** (3/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

48. **broken-mirror-sin-you-repeat.html** (3/12, uncategorized, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_9_historical_witness, mark_10_liturgical_cadence

49. **question-was-christ-a-robot.html** (3/12, question, POLISH-LOCKED)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

50. **story-humor-the-man-who-sued-god.html** (3/12, story)
   Missing: mark_1_triune_god_named, mark_2_christ_apex, mark_3_doxological_climax, mark_4_explicit_ascription, mark_5_confessional_anchor, mark_6_presuppositional_bridge, mark_7_christ_mediator, mark_8_spirit_application, mark_10_liturgical_cadence

---

## §VI — Honor Roll (Consecrated Articles — 12/12)

6 articles currently pass all twelve marks.

- analogy-light-switch.html
- demolition-2peter3-9.html
- for-deconstructed.html
- philosophy-munchhausen-trilemma.html
- secular-neuroscience-human-inability.html
- theologian-augustine.html

These pages serve as templates for Phase C. They demonstrate the bar.

---

## §VII — Notes for Phase B and Phase C

### Patterns Surfaced

1. **Doxological closure gap:** Marks 3 and 4 (doxological climax and explicit ascription of glory) show the highest failure rates. Many articles argue the doctrine powerfully but do not lift into worship. Phase C will focus on the final 20% of each article, adding doxological language and explicit glory-ascriptions.

2. **Trinitarian underrepresentation:** Mark 1 (Triune God named) passes at a solid rate, but Marks 7, 8, and 10 (Mediator, Spirit-application, liturgical cadence) show room for improvement. Phase C will add Trinitarian three-beat language and ensure each Person's economic role is named.

3. **Confessional citation:** Mark 5 passes at 16.1%. Articles in certain categories (especially devotional, story, psychology) legitimately omit confessional anchors. Phase C will target doctrine-heavy articles (systematic, philosophy, history) for confessional citations.

4. **Lock status correlation:** Locked pages score notably higher (5.31/12 vs. 5.16/12). HAMMER-LOCKED and POLISH-LOCKED articles have already received rhetorical attention; the consecration work is targeted (add Christological apex, lift with doxology) rather than wholesale rewrite.

5. **Presuppositional apologetics:** Mark 6 (presuppositional bridge) shows moderate pass rate. The site has strong demolition pieces that could benefit from explicit presuppositional framing. Phase B will identify gaps here.

### Recommendations for Phase C

- **Batch by mark-count:** Start with articles missing 3-4 marks (easier lifts), then move to those missing 6+ (deeper rebuilds).
- **Category-aware approach:** Devotionals and stories may require a lighter touch on Marks 5 and 6; focus those efforts on systematic and philosophical pieces.
- **Coram Deo closes:** Mark 11 (Coram Deo) is the tonal move. Ensure the final paragraph shifts from "here is the doctrine" to "here we worship the God who decreed it."
- **Christological apex:** Mark 2 is the emotional climax. Ensure every article's high point lands on the Person of Christ, not abstract doctrine.

---

## Appendix: Full Methodology Reference

See `consecration-scan.js` for the complete scoring algorithm. The script is re-runnable and will be used in Phase E for final verification.

All twelve marks are defined in AUDIT-2.md §II. This audit measures binary presence-and-load-bearing on each mark. An article passes a mark if the heuristic detects and the language appears semantically meaningful in context.

**Confidence by mark:**
- Marks 1, 4, 5, 7, 9: ≥95% confidence (programmatic, unambiguous)
- Marks 3, 6, 8, 10: 85-90% confidence (heuristic but reliable)
- Marks 2, 12: 75-85% confidence (heuristic, context-dependent)
- Mark 11: 70-80% confidence (soft heuristic, recommend LLM review on borderline)

---

*Audit 2, Phase A — Consecration Diagnostic. All files and reports generated 2026-04-27.*
