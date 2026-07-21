#!/usr/bin/env python3
"""S181 — the 7 Diamond pages whose fragments use LITERAL em-dashes, not &mdash;."""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP = os.path.join(ROOT, 'archive', 's181-backup')
os.makedirs(BACKUP, exist_ok=True)
OLD_H2 = '<h2>The Diamond from One More Facet</h2>'
M = '—'  # literal em dash

EDITS = {

 'apologetic-god-works-the-willing': (
  '<h2>Where the Other Proofs Stop, This One Goes Inside</h2>', [
  (f"This is the site's case for <a href=\"/question-irresistible\">irresistible grace</a> proven from its most interior point {M} not the opening of a heart or the raising of a corpse, but the working of the will itself from the inside.",
   f"Every other proof of <a href=\"/question-irresistible\">irresistible grace</a> describes what God does <em>to</em> a will {M} opens it, raises it, cuts the stone out of it. Philippians 2:13 is the one that goes inside and says what He does <em>in</em> it."),
  ("Six facets, one stone: a grace that does not override",
   "Six approaches, one finding: a grace that does not override"),
 ]),

 'apologetic-he-bore-the-sin-of-many': (
  '<h2>The Lines Were Drawn Seven Centuries Early</h2>', [
  (f"This is the site's case for <a href=\"/apologetic-definite-atonement\">definite atonement</a> proven from the Old Testament's own deed of substitution {M} the doctrine standing in Isaiah's voice seven centuries before the New Testament drew the lines.",
   f"The case for <a href=\"/apologetic-definite-atonement\">definite atonement</a> is usually built out of the New Testament, which is what lets the objection stand that the lines were drawn late, by systematizers with a position to protect. Isaiah drew them seven hundred years before there was a system to defend."),
  (f"Seven facets, one stone {M} and this one was cut before the quarry of the New Testament was opened.",
   f"Seven witnesses to one verdict {M} and this one was sworn in seven centuries before the trial."),
 ]),

 'apologetic-i-shall-lose-none': (
  '<h2>Why the Hands Never Open</h2>', [
  (f"This is the site's case for the <a href=\"/question-perseverance\">perseverance of the saints</a> proven from its deepest root {M} not from the believer's tenacity but from the Son's obedience to the Father.",
   f"Every other proof of the <a href=\"/question-perseverance\">perseverance of the saints</a> shows you that you are held. John 6 shows you <em>why</em> the grip never slackens {M} and the reason is not the believer's tenacity but the Son's obedience to His Father."),
  (f"Six facets, one stone {M} and the stone is the faithfulness of God to himself.",
   f"Six proofs, one foundation {M} and the foundation is the faithfulness of God to Himself."),
 ]),

 'apologetic-kept-by-the-power-of-god': (
  '<h2>The Same Security, Approached From the Other Side</h2>', [
  (f"This is the site's sixth defense of the <a href=\"/question-perseverance\">perseverance of the saints</a>, and it proves the doctrine through the architecture of keeping {M} two verbs, two ends of the road, one Keeper. It joins a chamber already bright with light.",
   f"Five other passages carry the <a href=\"/question-perseverance\">perseverance of the saints</a>; 1 Peter 1:5 carries it through the architecture of keeping {M} two verbs, two ends of the road, one Keeper."),
  ("Six facets, one stone: the saved are not asked to keep themselves; they are kept.",
   "Six passages, one verdict: the saved are not asked to keep themselves; they are kept."),
 ]),

 'apologetic-only-evil-all-the-time': (
  '<h2>The Spring the Other Diagnoses Flow From</h2>', [
  (f"This is the site's case for <a href=\"/systematic-hamartiology\">total depravity</a> proven from its earliest and widest biblical statement {M} depravity diagnosed before the law, of all humanity, from childhood, total in every axis.",
   f"The other proofs of <a href=\"/systematic-hamartiology\">total depravity</a> examine the disease one organ at a time. Genesis 6:5 is God's own reading of the spring they all flow from {M} before the law, of all humanity, from childhood, total in every axis."),
  ("Seven facets, one stone: a heart that cannot",
   "Seven diagnoses, one disease: a heart that cannot"),
 ]),

 'apologetic-the-deceitful-heart': (
  '<h2>The Organ That Would Assess the Damage Is Damaged</h2>', [
  (f"This is the site's seventh defense of <a href=\"/question-depravity\">total depravity</a>, and it proves the doctrine from the epistemology of the fall {M} not what the heart <em>does</em>, but what the heart <em>cannot see</em> about what it does. It is the inward companion to its siblings.",
   f"The other proofs of <a href=\"/question-depravity\">total depravity</a> examine what the heart <em>does</em>. Jeremiah 17:9 examines what the heart <em>cannot see</em> about what it does {M} the fall as an epistemology, not only an ethics."),
  ("Four facets, one ruin, seen from inside:",
   "Four diagnoses, one ruin, seen from inside:"),
 ]),

 'apologetic-the-remnant-chosen-by-grace': (
  '<h2>The Principle Underneath Every Other Proof</h2>', [
  (f"This is the site's case for <a href=\"/systematic-election\">unconditional election</a> proven from its load-bearing engine {M} not from a narrative or a single verb, but from the very logic of grace as a category.",
   f"The other proofs of <a href=\"/systematic-election\">unconditional election</a> establish <em>that</em> God chooses unconditionally. Romans 11:6 establishes why He could not have done otherwise {M} not from a narrative or a single verb, but from the logic of grace as a category."),
  ("Six facets, one stone: a people reserved by God",
   "Six passages, one engine: a people reserved by God"),
 ]),
}

failures = []
for page, (new_h2, pairs) in EDITS.items():
    path = os.path.join(ROOT, page + '.html')
    b = os.path.join(BACKUP, page + '.html')
    if not os.path.exists(b): shutil.copy2(path, b)
    s = open(path, encoding='utf-8').read(); orig = s
    if s.count(OLD_H2) != 1:
        failures.append(f'{page}: H2 count {s.count(OLD_H2)}'); continue
    s = s.replace(OLD_H2, new_h2)
    ok = True
    for old, new in pairs:
        c = s.count(old)
        if c != 1:
            failures.append(f'{page}: count {c} for: {old[:70]}'); ok = False
        else:
            s = s.replace(old, new)
    if not ok: continue
    if s != orig:
        open(path, 'w', encoding='utf-8').write(s); print(f'  OK  {page}')

print()
if failures:
    print('FAILURES:')
    for f in failures: print('   !', f)
    sys.exit(1)
print('all 7 rewritten.')
