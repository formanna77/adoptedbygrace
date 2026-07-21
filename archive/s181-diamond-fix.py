#!/usr/bin/env python3
"""
S181 — break the eighth cross-page template.

<h2>The Diamond from One More Facet</h2> was identical on 15 apologetic-* pages,
and every one of them opened the section by narrating the site's own editorial
apparatus to the reader: "This is the site's sixth defense of total depravity."

Three violations at once:
  §I.3    — H2s are sentences, not labels. This one is a label, ×15.
  §XVIII.3 — the checklist showing through the paint; the template is the one
             unredeemable failure.
  §XXII.3 — the invisible hand. A reader being told he is reading item #6 in a
             content series is thinking about the publishing schedule, not
             Romans 9. Plus the site referring to itself in the third person,
             the same anonymization scar S178 fixed on wastes-nothing.

What is KEPT: every cross-link. The section does real §XIV.3 / §IX.3 work —
it shows the doctrine proven from independent converging angles, which is the
answer to "you are leaning on one proof-text." That argument is good. It was
just wearing a catalog entry as a coat.

What CHANGES: 15 distinct sentence-H2s, 15 differently-shaped openers, and the
"N facets, one stone" formula (identical on 8) varied per page. Deliberately
NOT rewritten to one better formula — VOICE §XVIII.3.

assert count==1 on every replacement; backups written first.
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP = os.path.join(ROOT, 'archive', 's181-backup')
os.makedirs(BACKUP, exist_ok=True)

OLD_H2 = '<h2>The Diamond from One More Facet</h2>'

# page -> [ (new_h2), (old_fragment, new_fragment), ... ]
EDITS = {

 'apologetic-god-works-the-willing': (
  '<h2>Where the Other Proofs Stop, This One Goes Inside</h2>', [
  ("This is the site's case for <a href=\"/question-irresistible\">irresistible grace</a> proven from its most interior point &mdash; not the opening of a heart or the raising of a corpse, but the working of the will itself from the inside.",
   "Every other proof of <a href=\"/question-irresistible\">irresistible grace</a> describes what God does <em>to</em> a will &mdash; opens it, raises it, cuts the stone out of it. Philippians 2:13 is the one that goes inside and says what He does <em>in</em> it."),
  ("Six facets, one stone: a grace that does not override",
   "Six approaches, one finding: a grace that does not override"),
 ]),

 'apologetic-he-bore-the-sin-of-many': (
  '<h2>The Lines Were Drawn Seven Centuries Early</h2>', [
  ("This is the site's case for <a href=\"/apologetic-definite-atonement\">definite atonement</a> proven from the Old Testament's own deed of substitution &mdash; the doctrine standing in Isaiah's voice seven centuries before the New Testament drew the lines.",
   "The case for <a href=\"/apologetic-definite-atonement\">definite atonement</a> is usually built out of the New Testament, which is what lets the objection stand that the lines were drawn late, by systematizers with a position to protect. Isaiah drew them seven hundred years before there was a system to defend."),
  ("Seven facets, one stone &mdash; and this one was cut before the quarry of the New Testament was opened.",
   "Seven witnesses to one verdict &mdash; and this one was sworn in seven centuries before the trial."),
 ]),

 'apologetic-he-who-began-a-good-work': (
  '<h2>The Doctrine Does Not Rest on This Verse Alone</h2>', [
  ("This is the site's fifth defense of the <a href=\"/question-perseverance\">perseverance of the saints</a>, and each has lit the doctrine from a different angle.",
   "Four other passages carry the <a href=\"/question-perseverance\">perseverance of the saints</a>, each lighting it from a different angle."),
  ("This fifth one proves it through the bookends",
   "Philippians 1:6 proves it through the bookends"),
 ]),

 'apologetic-i-shall-lose-none': (
  '<h2>Why the Hands Never Open</h2>', [
  ("This is the site's case for the <a href=\"/question-perseverance\">perseverance of the saints</a> proven from its deepest root &mdash; not from the believer's tenacity but from the Son's obedience to the Father.",
   "Every other proof of the <a href=\"/question-perseverance\">perseverance of the saints</a> shows you that you are held. John 6 shows you <em>why</em> the grip never slackens &mdash; and the reason is not the believer's tenacity but the Son's obedience to His Father."),
  ("Six facets, one stone &mdash; and the stone is the faithfulness of God to himself.",
   "Six proofs, one foundation &mdash; and the foundation is the faithfulness of God to Himself."),
 ]),

 'apologetic-kept-by-the-power-of-god': (
  '<h2>The Same Security, Approached From the Other Side</h2>', [
  ("This is the site's sixth defense of the <a href=\"/question-perseverance\">perseverance of the saints</a>, and it proves the doctrine through the architecture of keeping &mdash; two verbs, two ends of the road, one Keeper. It joins a chamber already bright with light.",
   "Five other passages carry the <a href=\"/question-perseverance\">perseverance of the saints</a>; 1 Peter 1:5 carries it through the architecture of keeping &mdash; two verbs, two ends of the road, one Keeper."),
  ("Six facets, one stone: the saved are not asked to keep themselves; they are kept.",
   "Six passages, one verdict: the saved are not asked to keep themselves; they are kept."),
 ]),

 'apologetic-only-evil-all-the-time': (
  '<h2>The Spring the Other Diagnoses Flow From</h2>', [
  ("This is the site's case for <a href=\"/systematic-hamartiology\">total depravity</a> proven from its earliest and widest biblical statement &mdash; depravity diagnosed before the law, of all humanity, from childhood, total in every axis.",
   "The other proofs of <a href=\"/systematic-hamartiology\">total depravity</a> examine the disease in one organ at a time. Genesis 6:5 is God's own reading of the spring they all flow from &mdash; before the law, of all humanity, from childhood, total in every axis."),
  ("Seven facets, one stone: a heart that cannot",
   "Seven diagnoses, one disease: a heart that cannot"),
 ]),

 'apologetic-save-his-people': (
  '<h2>The Flock Was Named Before the Manger</h2>', [
  ("This is the site's sixth defense of <a href=\"/apologetic-for-the-sheep\">definite atonement</a>, and it proves the doctrine from the nativity rather than the shepherd's discourse.",
   "Five other passages carry <a href=\"/apologetic-for-the-sheep\">definite atonement</a>; Matthew 1:21 carries it from the nativity rather than the shepherd's discourse."),
  ("Six facets, one stone: a salvation accomplished",
   "Six passages, one conclusion: a salvation accomplished"),
 ]),

 'apologetic-sinful-from-birth': (
  '<h2>As Far Upstream as a Diagnosis Can Go</h2>', [
  ("This is the site's sixth defense of <a href=\"/question-depravity\">total depravity</a>, and it works by moving the diagnosis as far upstream as a diagnosis can go. The other facets catch the disease in the adult and the act:",
   "The other proofs of <a href=\"/question-depravity\">total depravity</a> catch the disease in the adult and the act:"),
 ]),

 'apologetic-the-deceitful-heart': (
  '<h2>The Organ That Would Assess the Damage Is Damaged</h2>', [
  ("This is the site's seventh defense of <a href=\"/question-depravity\">total depravity</a>, and it proves the doctrine from the epistemology of the fall &mdash; not what the heart <em>does</em>, but what the heart <em>cannot see</em> about what it does. It is the inward companion to its siblings.",
   "The other proofs of <a href=\"/question-depravity\">total depravity</a> examine what the heart <em>does</em>. Jeremiah 17:9 examines what the heart <em>cannot see</em> about what it does &mdash; the fall as an epistemology, not only an ethics."),
  ("Four facets, one ruin, seen from inside:",
   "Four diagnoses, one ruin, seen from inside:"),
 ]),

 'apologetic-the-mind-that-cannot-submit': (
  '<h2>The Same Inability, Named in the Will Itself</h2>', [
  ("This is the fifth defense of <a href=\"/question-depravity\">total depravity</a> on the site, and like the others it comes at the linchpin from a fresh elevation.",
   "Four other passages carry <a href=\"/question-depravity\">total depravity</a>, each coming at the linchpin from a fresh elevation."),
  ("This fifth one proves it through the will's allegiance and the will's capacity at once",
   "Romans 8:7 proves it through the will's allegiance and the will's capacity at once"),
 ]),

 'apologetic-the-remnant-chosen-by-grace': (
  '<h2>The Principle Underneath Every Other Proof</h2>', [
  ("This is the site's case for <a href=\"/systematic-election\">unconditional election</a> proven from its load-bearing engine &mdash; not from a narrative or a single verb, but from the very logic of grace as a category.",
   "The other proofs of <a href=\"/systematic-election\">unconditional election</a> establish <em>that</em> God chooses unconditionally. Romans 11:6 establishes why He could not have done otherwise &mdash; not from a narrative or a single verb, but from the logic of grace as a category."),
  ("Six facets, one stone: a people reserved by God",
   "Six passages, one engine: a people reserved by God"),
 ]),

 'apologetic-the-road-to-damascus': (
  '<h2>The Argument Made Flesh, on a Road, at Noon</h2>', [
  ("This is the site's fifth defense of <a href=\"/question-irresistible\">irresistible grace</a>, and it comes at the doctrine through history and testimony rather than through the Greek lexicon.",
   "The other proofs of <a href=\"/question-irresistible\">irresistible grace</a> are made in the lexicon. This one is made in the dust of a road."),
  ("This fifth one proves it through the single most documented conversion in the New Testament:",
   "Acts 9 proves it through the most fully documented conversion in the New Testament:"),
 ]),

 'apologetic-the-valley-of-dry-bones': (
  '<h2>The Promise of Ezekiel 36, Staged as Theater</h2>', [
  ("This is the site's sixth defense of <a href=\"/question-irresistible\">irresistible grace</a>, and it proves the doctrine through prophetic vision rather than narrative or argument. It is the dramatized twin of",
   "Where the other proofs of <a href=\"/question-irresistible\">irresistible grace</a> argue or narrate, this one stages. It is the dramatized twin of"),
 ]),

 'apologetic-those-you-gave-me': (
  '<h2>The Doctrine in the Son&rsquo;s Own Mouth, the Night Before</h2>', [
  ("This is the site's fifth defense of <a href=\"/question-chosen\">unconditional election</a>, and each has come at the doctrine from a different elevation.",
   "Four other passages carry <a href=\"/question-chosen\">unconditional election</a>, each from a different elevation."),
  ("This fifth one proves it from the lips of the Son in His own prayer:",
   "John 17 proves it from the lips of the Son in His own prayer:"),
 ]),

 'apologetic-you-did-not-choose-me': (
  '<h2>The Same Upper Room, From the Disciples&rsquo; Side</h2>', [
  ("This is the site's sixth defense of <a href=\"/question-chosen\">unconditional election</a>, and it is the companion piece to the one drawn from the same upper room.",
   "John 15:16 is the companion piece to the proof drawn from the same upper room, the same night, hours apart."),
  ("This sixth one proves it by simply quoting the Lord",
   "This one proves it by simply quoting the Lord"),
 ]),
}

failures = []
for page, (new_h2, pairs) in EDITS.items():
    path = os.path.join(ROOT, page + '.html')
    if not os.path.exists(path):
        failures.append(f'{page}: FILE MISSING'); continue
    shutil.copy2(path, os.path.join(BACKUP, page + '.html'))
    s = open(path, encoding='utf-8').read()
    orig = s

    n = s.count(OLD_H2)
    if n != 1:
        failures.append(f'{page}: H2 count == {n}, expected 1'); continue
    s = s.replace(OLD_H2, new_h2)

    ok = True
    for old, new in pairs:
        c = s.count(old)
        if c != 1:
            failures.append(f'{page}: fragment count == {c} for: {old[:70]}...')
            ok = False
        else:
            s = s.replace(old, new)
    if not ok:
        continue

    if s != orig:
        open(path, 'w', encoding='utf-8').write(s)
        print(f'  OK  {page}')

print()
if failures:
    print('FAILURES:')
    for f in failures: print('   !', f)
    sys.exit(1)
print('all 15 pages rewritten; backups in archive/s181-backup/')
