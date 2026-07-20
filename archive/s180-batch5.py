#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S180 §C, part 2 — the remaining diagnosed debts.

1. devotional-in-christ said "In fourteen verses" where every meta/OG/JSON-LD
   on the page says twelve. Ephesians 1:3-14 is twelve verses.

2. question-ephesians1 asserted "the longest sentence in the New Testament" in
   hero, meta and JSON-LD (five places) while the body hedged to "one of the
   longest" — and "well over two hundred words" overstates a Greek text of
   about 202. Sources genuinely differ on whether Eph 1:3-14 or Col 1:9-20 is
   longest, which is exactly why the superlative is an unsourced told-claim
   (VOICE §XXII.4) and the hedge is the honest form. Now consistent everywhere.

3. demolition-children-of-satan's trilemma asked "from where does the
   unregenerate derive the capacity?" and treated "From God?" as automatically
   yielding election. But the able Arminian's answer IS "from God" — prevenient
   grace, given to all, resistible — so the strongest opponent walked away
   untouched (§XIX). Wesley's position is now stated at full strength in his own
   terms and then answered on the one point it cannot carry: if the grace is
   identical in both men and only one believes, the deciding factor is supplied
   by the man, and 1 Corinthians 4:7 forecloses it. The non-resistance reply
   (an omission is not a contribution) is closed in the same pass, per §XXII.1.6.

4. question-dead-man-visual, three fixes:
   (a) "The Greek is grammatically airtight" argued from the original while
       naming no term. §XV requires the word. It is dynamai, negated: ou dynatai.
   (b) "this is the crown-jewel argument" leaked internal editorial jargon onto
       a reader-facing page.
   (c) Ezekiel 36:26 was hyperlinked to /question-ezekiel37 — the wrong chapter.
       Repointed to /question-newheart, which is the Ezekiel 36:26 page; the
       page's later duplicate link to the same target is unlinked so the first
       mention carries it (§IX.2).
   (d) THE REAL DEBT: the page told and did not show. Act Two was four Scripture
       citations of abstract inability — the abstract restatement §XIII.3 names
       as non-unpacking — and the reader was twice told the corpse "has your
       face" without being shown one moment from his own week. A concrete mirror
       is added: the enemy-love test, new to the §XIII.2 bench. It works because
       the reader can run it in ten seconds and cannot fake the result, and
       because it isolates the exact disability — the will can manufacture
       intention but cannot manufacture affection.
"""
import io, os, re, shutil

DASH = '—'

EXACT = [

("devotional-in-christ.html",
 '<p>In fourteen verses, Paul uses',
 '<p>In twelve verses, Paul uses'),

("question-ephesians1.html",
 'It is one of the longest sentences in the New Testament ' + DASH + ' well over two hundred words in a single grammatical breath.',
 'It is one of the longest sentences in the Greek New Testament ' + DASH + ' roughly two hundred words in a single grammatical breath.'),

# ---- demolition-children-of-satan: the missing steelman ----------------
("demolition-children-of-satan.html",
 '<p>That is <a href="/systematic-election">election</a>. That is <a href="/question-irresistible">irresistible grace</a>. Not a theological preference ' + DASH + ' a logical necessity forced by Scripture\'s own portrait of the human condition.</p>',
 '<p>And here the ablest opponent answers, and answers well, so let him have the floor at full strength. <em>From God</em> is exactly what he has always said. Wesley never taught that fallen man retains a native power to turn; he taught that God gives to every human being a prior, unearned, universal grace that lifts the disability the fall imposed and restores to each the real ability to accept or refuse. On that account grace is still first, still unmerited, still God\'s doing from beginning to end. It is simply not coercive. God has done everything necessary for everyone, the offer is genuine to all, and no one who is lost was ever denied the means.</p>\n\n'
 '   <p>That is a serious answer and it deserves a serious reply, not a caricature. Here it is. Take two people who receive this prior grace in identical measure ' + DASH + ' which is the doctrine\'s own claim, that it is given to all alike. One believes. One does not. Now name the difference between them. It cannot be the grace; the grace was the same in both. So it lies somewhere in the two men, in whatever the one supplied and the other withheld: call it humility, or honesty, or softness, or a willingness not to resist. And whatever you call it, three things are true of it at once. It is good. It is decisive. And it did not come from God ' + DASH + ' because had God supplied it, He would have supplied it to both, and both would have believed.</p>\n\n'
 '   <p>If you answer that the difference is merely that one man did not resist ' + DASH + ' that a refusal to refuse is not a contribution ' + DASH + ' the arithmetic does not move. An omission that decides an eternal outcome is still the thing that decided it, and it is still the one item on the ledger that God did not place there. Paul shuts the door with two questions he plainly expects no one to answer: <a href="/question-boasting">"For who makes you different from anyone else? What do you have that you did not receive?"</a> Prevenient grace does not dissolve the trilemma. It moves it back one step and leaves it standing there, because the deciding vote is still cast by a man who was, on Scripture\'s own account, dead at the moment he cast it.</p>\n\n'
 '   <p>That is why the answer must run all the way to <a href="/systematic-election">election</a>, and to <a href="/question-irresistible">irresistible grace</a>. Not a theological preference ' + DASH + ' a logical necessity forced by Scripture\'s own portrait of the human condition.</p>'),

# ---- question-dead-man-visual ------------------------------------------
("question-dead-man-visual.html",
 "It is not <em>does not</em>. It is <em>cannot</em>. The Greek is grammatically airtight: the argument isn't that the unregenerate person is choosing badly; the argument is that the faculty required to choose rightly has ceased to function.",
 "It is not <em>does not</em>. It is <em>cannot</em>. The same Greek word carries it every time: <em>dynamai</em>, the plain verb of capacity, negated. <em>Ou dynatai</em> " + DASH + " he is not able. Not unwilling. Unable. The argument is not that the unregenerate person is choosing badly; the argument is that the faculty required to choose rightly has ceased to function."),

("question-dead-man-visual.html",
 '<a href="/question-faithgift">Faith itself is a gift</a> — this is the crown-jewel argument. The hand that reached for God was a hand God Himself moved.',
 '<a href="/question-faithgift">Faith itself is a gift</a>. The hand that reached for God was a hand God Himself moved.'),

("question-dead-man-visual.html",
 'out of the stone He finds in your chest (<a href="/question-ezekiel37">Ezek 36:26</a>). The old heart did not wake up and decide to love Him. The old heart was pried out. A new one was put in. And the <a href="/question-newheart">new heart</a>, now that it is beating,',
 'out of the stone He finds in your chest (<a href="/question-newheart">Ezek 36:26</a>). The old heart did not wake up and decide to love Him. The old heart was pried out. A new one was put in. And the new heart, now that it is beating,'),
]

# the enemy-love mirror, inserted after the "cannot" paragraph
MIRROR = ('\n\n   <p>If that still lands as an abstraction, there is a test you can run in the next ten seconds. '
          'Bring to mind the person you like least. Now try to <em>want</em> good for them. Not resolve to be civil about them; '
          'not decide to pray for them at some later point. Want it, the way you want good for someone you love, and aim that at them. '
          'Watch what your interior actually does. You can produce the words. You can produce the intention, and even a kind of grim charity. '
          'What you cannot produce is the wanting. It is not there, and there is no lever in you that fetches it. '
          'That is the disability Scripture is describing, running in your chest right now with the volume turned nearly all the way down. '
          'Turn it up until the object is God Himself and you have the doctrine, entire.</p>')

os.makedirs('archive/s180-backup', exist_ok=True)
files = {}

def load(fn):
    if fn not in files:
        files[fn] = io.open(fn, encoding='utf-8').read()
    return files[fn]

for fn, old, new in EXACT:
    assert load(fn).count(old) == 1, (fn, load(fn).count(old), old[:70])

# five identical superlatives in hero/meta/OG/JSON-LD
SUP_OLD = 'single unbroken sentence ' + DASH + ' the longest in the New Testament'
SUP_NEW = 'single unbroken sentence ' + DASH + ' among the longest in the New Testament'
assert load('question-ephesians1.html').count(SUP_OLD) == 5, load('question-ephesians1.html').count(SUP_OLD)

BODY_OLD = 'the longest sentence in the New Testament not with'
BODY_NEW = 'one of the longest sentences in the New Testament not with'
assert load('question-ephesians1.html').count(BODY_OLD) == 1

ANCHOR = 'The apparatus by which a will reaches toward anything had stopped four days earlier.'
dm = load('question-dead-man-visual.html')
assert dm.count(ANCHOR) == 1
print('all anchors verified\n')

for fn in set([e[0] for e in EXACT] + ['question-ephesians1.html']):
    if not os.path.exists('archive/s180-backup/' + fn):
        shutil.copy(fn, 'archive/s180-backup/' + fn)

for fn, old, new in EXACT:
    files[fn] = files[fn].replace(old, new, 1)
    print('%-40s %+6d' % (fn[:-5], len(new) - len(old)))

files['question-ephesians1.html'] = files['question-ephesians1.html'].replace(SUP_OLD, SUP_NEW).replace(BODY_OLD, BODY_NEW)
print('%-40s superlative hedged in 6 places' % 'question-ephesians1')

# insert the mirror after the paragraph containing the anchor
s = files['question-dead-man-visual.html']
i = s.index(ANCHOR)
j = s.index('</p>', i) + 4
files['question-dead-man-visual.html'] = s[:j] + MIRROR + s[j:]
print('%-40s +%d  (enemy-love mirror)' % ('question-dead-man-visual', len(MIRROR)))

for fn, s in files.items():
    io.open(fn, 'w', encoding='utf-8').write(s)
print('\ndone.')
