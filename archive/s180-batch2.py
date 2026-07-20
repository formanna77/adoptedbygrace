#!/usr/bin/env python3
"""S180 batch 2 — the individually-confirmed close defects, plus two
guardrail failures found while reading them.

question-whose-side-are-you-on: asks its own title question twice in the
close, the second time AFTER the paragraph that answers it. Worse, the
mid-page form ("Which side do you want to be on?") hands the reader the
deciding vote on a page whose whole thesis is that he never had it.

question-external-call: the identical beat re-landed near-verbatim
("You needed both. And God provided both." / "You needed both. He provided
both.") — a textbook doubled close, with the first instance pre-empting the
Circular Return that is the page's true destination.

question-is-predestination-in-the-bible: two real problems.
 (1) It ends "The only question is whether you will believe it." On a page
     arguing that faith is God's gift, the final sentence hands the deciding
     vote back to the reader — a VOICE §XX guardrail failure, and the page
     refutes itself in its own last line.
 (2) "No serious biblical scholar... denies" is an unsourced evaluative
     authority claim (§XXII.4). Replaced with the countable record: the six
     occurrences of proorizo, which is stronger AND verifiable.
"""
import io, os, shutil

EDITS = [
 # ---- question-whose-side-are-you-on ----------------------------------
 ("question-whose-side-are-you-on.html",
  "   <p>Which side do you want to be on?</p>",
  "   <p>Two accounts of how you got here. Only one of them is true.</p>"),

 ("question-whose-side-are-you-on.html",
  '   <p style="font-size: 1.05rem; line-height: 1.8; color: var(--accent-ember); font-weight: 500;">\n  Whose side are you on?\n</p>\n',
  ''),

 # ---- question-external-call ------------------------------------------
 ("question-external-call.html",
  '<p><strong>The <a href="/question-external-internal-call">external call</a> is the invitation. The <a href="/question-irresistible">effectual call</a> is the resurrection. You needed both. And God provided both.</strong></p>',
  '<p><strong>The <a href="/question-external-internal-call">external call</a> is the invitation. The <a href="/question-irresistible">effectual call</a> is the resurrection.</strong></p>'),

 # ---- question-is-predestination-in-the-bible --------------------------
 ("question-is-predestination-in-the-bible.html",
  "<p><strong>First: Is it in the Bible?</strong> Yes. The word appears by name. The concept saturates Scripture. No serious biblical scholar, regardless of their theological camp, denies that predestination is taught in the New Testament.</p>",
  "<p><strong>First: Is it in the Bible?</strong> Yes, and not by inference. The verb <em>proorizō</em> — to mark out beforehand — stands six times in the Greek New Testament: Acts 4:28, Romans 8:29, Romans 8:30, 1 Corinthians 2:7, Ephesians 1:5 and Ephesians 1:11. Every camp in the church has to do something with those six. The argument has never been about whether the word is there.</p>"),

 ("question-is-predestination-in-the-bible.html",
  "<p>That is what predestination means. And now you know — it's not in dispute. It's in your Bible. The only question is whether you will believe it.</p>",
  "<p>That is what predestination means, and it is not a disputed reading smuggled in from outside. It is in the Bible already on your shelf. Whether you can yet rest in it is a separate matter — and notice that it is not, finally, a question about your resolve. Nobody argues himself into believing he was chosen before he existed. If this is going to settle in you, the One it is about will settle it. Which is the doctrine proving itself on the way in.</p>"),
]

os.makedirs('archive/s180-backup', exist_ok=True)

# PASS 1 — verify every anchor before touching anything.
files = {}
for fn, old, new in EDITS:
    if fn not in files:
        files[fn] = io.open(fn, encoding='utf-8').read()
    assert files[fn].count(old) == 1, (fn, files[fn].count(old), old[:70])
print('all %d anchors verified\n' % len(EDITS))

# PASS 2 — apply.
for fn in files:
    if not os.path.exists('archive/s180-backup/' + fn):
        shutil.copy(fn, 'archive/s180-backup/' + fn)
for fn, old, new in EDITS:
    files[fn] = files[fn].replace(old, new, 1)
    print('%-46s  %+5d chars' % (fn, len(new) - len(old)))
for fn, s in files.items():
    io.open(fn, 'w', encoding='utf-8').write(s)
print('\ndone.')
