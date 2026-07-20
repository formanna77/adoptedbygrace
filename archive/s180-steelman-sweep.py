#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S180 §B — break the sixth and seventh cross-page templates.

  <h2>The Steel Man — ...>   64 pages
  <h2>The Socratic Trap...>  20 pages   (SIX of them carried the IDENTICAL
                                        heading, "Three Questions the Arminian
                                        Cannot Answer")

Both are labels for a MOVE, printed where a heading should be doing work. VOICE
§I.3: H2s are sentences, not labels, and they speak to the reader. §XVIII.3:
if an agent can feel the checklist through the prose, the page has failed with
every box ticked — and a heading that names the technique is the checklist
showing through the paint.

The fix is not a new uniform: most of these pages already carried the objection
in the reader's own voice immediately after the label, so stripping the label
leaves a genuinely varied set (quoted objections, bare declaratives, direct
questions, first-person admissions). The ones that were flat category labels
("The Multiverse", "The Naturalistic Theories", "of the Counter-Move") are
rewritten by hand from that page's own argument.

Two Steel Man headings collided after stripping ("But People Do Fall Away" on
both apologetic-kept-by-the-power-of-god and systematic-perseverance); each was
differentiated.

The Socratic Trap headings also dropped the camp label. "Three Questions the
Arminian Cannot Answer" both names a party where Scripture should be named
(CLAUDE.md) and taunts, which §XIX forbids: dismantle the argument, never the
arguer.
"""
import io, os, re, shutil

DASH = '—'  # em dash

# ---- Steel Man: pages needing a hand-written heading ---------------------
STEEL_BESPOKE = {
 'apologetic-hilasterion-the-mercy-seat.html':
   'Sufficient for All, Efficient for the Elect ' + DASH + " Isn't That the Whole Answer?",
 'apologetic-the-eulogy-greek-of-ephesians-1.html':
   'Paul Chose a Church, Not a List of Names',
 'apologetic-the-unbroken-chain.html':
   'The Past Tense Is a Pattern, Not a Promise',
 'apologetic-not-because-but-because.html':
   "Wasn't It Abraham's Faith That God Saw?",
 'reformed-apologetics-fine-tuning.html':
   'With Enough Universes, One of Them Had to Look Like This',
 'reformed-apologetics-resurrection.html':
   'Someone Moved the Body, or They Saw What They Needed to See',
 'reformed-apologetics-theodicy.html':
   'Free Will Accounts for the Evil, and Suffering Makes Souls',
 'reformed-apologetics-transcendental.html':
   'Logic Is Just Convention, and Your Argument Runs in a Circle',
 'reformed-apologetics-moral-argument.html':
   'Evolution Explains My Conscience, and Euthyphro Explains Away Your God',
 'ethics-abortion.html':
   'But What About the Woman in an Impossible Place?',
 'ethics-just-war.html':
   'Christ Forbade the Sword, and the Pacifist Is Right to Refuse It',
 # de-collide the two identical "But People Do Fall Away" headings
 'apologetic-kept-by-the-power-of-god.html':
   'But I Have Watched People Fall Away',
 'systematic-perseverance.html':
   'Then What About the Ones Who Walked Away?',
}

# ---- Socratic Trap: pages needing a hand-written heading -----------------
SOCRATIC_BESPOKE = {
 'demolition-1peter1-5.html':   'Whose Hand Is on the Leash?',
 'demolition-2cor6-1.html':     'Two Verses, One Apostle, Months Apart ' + DASH + ' Which Will You Deny?',
 'demolition-acts2-21.html':    'If Everyone Can Call, Why Does Paul Say No One Seeks?',
 'demolition-hosea11-7-8.html': 'What Is Verse 9 Doing in the Paragraph?',
 'demolition-isaiah5-1-7.html': 'Where Does Isaiah Authorize the Move From a Nation to You?',
 'demolition-jer18.html':       'On What Basis Does a Nation Become a Soul?',
 'demolition-james4-7-8.html':  'Can a Slave Submit? Can a Son of the Devil Resist His Own Father?',
 'demolition-matt7-7.html':     'Who Is the Seeker, and How Did He Come to Be Seeking?',
 'philosophy-bootstrap-paradox.html': 'Could You Choose to Stop Believing Right Now?',
 'resistance-redefining-grace.html':  'Two People Hear the Same Sermon. Which One Should Boast?',
}

STEEL_RE    = re.compile(r'<h2>The Steel Man[^<]*</h2>')
SOCRATIC_RE = re.compile(r'<h2>The Socratic Trap[^<]*</h2>')

os.makedirs('archive/s180-backup', exist_ok=True)

plan = []
for fn in sorted(os.listdir('.')):
    if not fn.endswith('.html'):
        continue
    s = io.open(fn, encoding='utf-8').read()
    new = s
    notes = []

    for RE, bespoke, label in ((STEEL_RE, STEEL_BESPOKE, 'steel'),
                               (SOCRATIC_RE, SOCRATIC_BESPOKE, 'socratic')):
        ms = RE.findall(new)
        if not ms:
            continue
        assert len(ms) == 1, (fn, label, len(ms))
        old_h = ms[0]
        if fn in bespoke:
            head = bespoke[fn]
        else:
            # strip the label prefix; whatever follows IS the objection
            inner = old_h[len('<h2>'):-len('</h2>')]
            head = re.sub(r'^The (Steel Man|Socratic Trap)\s*[' + DASH + r':-]\s*', '', inner).strip()
            assert head and not head.startswith('The Steel Man') and not head.startswith('The Socratic Trap'), (fn, repr(head))
        new_h = '<h2>' + head + '</h2>'
        new = new.replace(old_h, new_h, 1)
        notes.append((label, old_h[4:-5], head))

    if notes:
        plan.append((fn, s, new, notes))

print('pages to rewrite: %d\n' % len(plan))
for fn, old_s, new_s, notes in plan:
    shutil.copy(fn, 'archive/s180-backup/' + fn) if not os.path.exists('archive/s180-backup/' + fn) else None
    io.open(fn, 'w', encoding='utf-8').write(new_s)
    for label, was, now in notes:
        print('%-48s %-8s %s' % (fn[:-5], label, now))
print('\ndone.')
