#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S180 §C — the scientific-accuracy debts (diagnosed S178, unpaid until now).

systematic-christology
  (a) A pullquote — "Your coins did not clear the debt. They made a mess on top
      of a receipt." — sat roughly a thousand words BEFORE the tetelestai
      passage that earns it, with no antecedent for coins, debt or receipt at
      that position. It is not a relocation problem: the identical sentence
      already closes the tetelestai paragraph, exactly where it lands. The
      premature copy is deleted.
  (b) "Embodied-cognition researchers have spent three decades proving..." —
      an overclaim on a literature that includes physical-warmth priming
      (Williams & Bargh 2008), among the most prominent failed replications in
      social psychology, and the page leaned on the warmth/insula version of
      it. Rebuilt on semantic somatotopy (Hauk, Johnsrude & Pulvermuller 2004),
      which has held, and the limit is stated out loud. Same exposure class as
      the Libet item: a hostile expert would have ended the page there.

secular-neuroscience-human-inability
  (c) Soon et al. (2008) reported without its accuracy figure. Decoding ran at
      roughly 60% against a 50% baseline; stated as a bare "prediction" it
      reads as near-determinism, which is both false and unnecessary. The
      honest number is the better argument: a faint early bias ten seconds out
      is precisely what the doctrine predicts, where mind-reading is not.
  (d) "Neuroscience has demonstrated five things" overclaims a contested
      literature. Restated at the strength the data actually support, with the
      concession made explicitly - which a hostile reader will respect and
      which costs the argument nothing.
"""
import io, os, shutil

EDITS = [

("systematic-christology.html",
 '   <blockquote class="pullquote">Your coins did not clear the debt. They made a mess on top of a receipt.</blockquote>\n\n',
 ''),

("systematic-christology.html",
 '<p>Embodied-cognition researchers have spent three decades proving something you already half-knew — that the brain does not store the word <em>weight</em> in a cold, abstract dictionary; it stores the word in the same motor networks that actually bear weight. Read <em>weight</em> and your arms twitch a signal. Read <em>warm</em> and your insula, the temperature-sensing region, flickers a whisper of heat. Now read what Paul said again.',
 '<p>Set one finding from cognitive neuroscience beside that sentence. When people silently read the words <em>lick</em>, <em>pick</em> and <em>kick</em>, the motor strip lights up in three separate places — the tongue region, the hand region, the foot region — laid out in the same order as the body itself. The brain does not file a verb in a cold abstract dictionary. It files it in the machinery that would carry the verb out. Much of the wider embodied-cognition literature has had a hard decade under replication; this particular result has held. Now read what Paul said again.'),

("secular-neuroscience-human-inability.html",
 '<p>If Libet\'s half-second gap was unsettling, what came next was devastating. In 2008, researchers at the Max Planck Institute used fMRI imaging to decode brain activity patterns. They found that a subject\'s "free" choice between pressing a left or right button could be predicted from brain activity up to <strong>10 seconds</strong> before the subject was conscious of having decided.</p>',
 '<p>If Libet\'s half-second gap was unsettling, what came next was stranger. In 2008 a team at the Max Planck Institute used fMRI to decode activity in the prefrontal and parietal cortex, and found that a subject\'s "free" choice between a left and a right button could be read off the brain up to <strong>ten seconds</strong> before he was conscious of having decided.</p>\n\n   <p>One number belongs with that sentence, and the popular retellings almost always drop it: the decoding ran at roughly sixty percent accuracy against a fifty-percent baseline. That is not a machine reading your mind, and anyone who tells you it is has oversold it. It is something quieter and, for our purposes, more interesting — a faint but real bias, present and measurable a full ten seconds before you had any sense that a choice was being made. A thumb already resting on one side of the scale before you knew there was a scale.</p>'),

("secular-neuroscience-human-inability.html",
 '<p>Neuroscience has demonstrated five things: decisions begin unconsciously; brain states predict "free" choices up to 10 seconds early; the DMN shapes desires beneath awareness; addiction demonstrates the will\'s bondage; and <a href="/secular-hard-problem-consciousness">consciousness itself</a> remains unexplained — the self that claims autonomy cannot even account for its own existence.</p>',
 '<p>Set the findings side by side, each stated no more strongly than the data allow. Decisions have measurable antecedents before we are aware of them. Brain states carry an early bias toward the choices we experience as free — weakly, but reliably. The default mode network shapes what we want at a level we cannot inspect. Addiction is the bondage of the will rendered visible on a scan. And <a href="/secular-hard-problem-consciousness">consciousness itself</a> remains unexplained, so that the self claiming autonomy cannot give an account of its own existence. No one of these proves a doctrine, and it would be dishonest to say otherwise. Together they are a converging picture — and the picture is not of a free agent surveying his options from some neutral place above them.</p>'),
]

os.makedirs('archive/s180-backup', exist_ok=True)
files = {}
for fn, old, new in EDITS:
    if fn not in files:
        files[fn] = io.open(fn, encoding='utf-8').read()
    assert files[fn].count(old) == 1, (fn, files[fn].count(old), old[:80])
print('all %d anchors verified\n' % len(EDITS))
for fn in files:
    if not os.path.exists('archive/s180-backup/' + fn):
        shutil.copy(fn, 'archive/s180-backup/' + fn)
for fn, old, new in EDITS:
    files[fn] = files[fn].replace(old, new, 1)
    print('%-46s  %+5d chars' % (fn, len(new) - len(old)))
for fn, s in files.items():
    io.open(fn, 'w', encoding='utf-8').write(s)
print('\ndone.')
