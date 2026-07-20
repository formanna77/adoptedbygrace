#!/usr/bin/env python3
"""S180 — break the seven-page shared closing machine.

Seven pages closed with the identical six-part device:
  "So we confess it, who once ___:" / a tricolon of that-clauses /
  "We did not A; He B." / "To the Father who…, to the Son who…, to the
  Spirit who…" / "be all the glory of every ___" / "Amen." / a bolded stinger.

Two of the italic closing quotations were near-verbatim across pages
("Even my faith was Yours. The whole way, it was Yours." /
 "It was You. The whole way, it was You.").

That is VOICE §XVIII.3 (the template) and §XXII.5 (uniformity, the deepest
tell) in their purest form, and these pages cross-link to one another, so a
reader meets the same machine three times in an hour.

Each replacement rides that page's OWN central image, in a different
architecture and at a deliberately different temperature (§XXII.5: vary the
temperature, not the standard). Three keep a stinger, four end on prose.
"""
import io, os, shutil, sys

REPL = {

# 1 — Acts 20:28. Image: the purchase, the price, the flock.
# Architecture: plain second-person, cool, no tricolon, no stinger.
# New ground: the price reveals the BUYER's desire, not the object's worth —
# a correction of the "you're worth the blood of Jesus" sentimentality, which
# quietly makes the sinner the thing of value.
"apologetic-bought-with-his-own-blood.html": (
    '<p>There is one more thing to say about a purchase, and it is the plainest thing in the world: what has been bought is no longer for sale. The transaction does not reopen on your worst day. It does not lapse because you forgot about it for a decade. Whatever else about you is unsettled, your ownership is not, because your ownership was never a fact about you at all. It is a fact about what was paid.</p>\n\n'
    '   <p>So stop trying to price yourself. You will never find a figure that makes sense of that blood, and you were never meant to. People say the cross proves how valuable you are, and they mean well, but they have the arrow backwards. A price does not reveal what the object was worth. It reveals what the buyer was willing to spend. Read it that way and the whole thing changes: the blood of God does not tell you that you were precious. It tells you that He wanted you anyway, at that cost, having counted it. He has you at that cost still.</p>\n\n'
),

# 2 — Eph 4:18. Image: light spoken over dark; the cave; "let there be light."
# Architecture: very short and still. The paragraph before it already lands
# ("The ache is the dawn"), so the close must not re-argue — only settle.
# Feeling-slip cure: the light does not depend on the quality of your looking.
"apologetic-darkened-in-their-understanding.html": (
    '<p>Genesis does not record the void\'s consent. It records a voice, and then a world with light in it. That is the whole order of the thing, and the order has never once been reversed: not a darkness that reached for the dawn, but a dawn spoken over darkness that could not have wanted it. Whatever you can or cannot see this morning, the light does not depend on the quality of your looking. It depends on the One who said <em>let there be</em> — and He has never had to say it twice.</p>\n\n'
    '   <p style="margin-top:2rem;"><strong>No one lights his own dark. God spoke, and you saw.</strong></p>\n\n'
),

# 3 — John 3:19-20. Image: hiding from the light; the serpent lifted up.
# Architecture: hot. This is the verdict page; let it burn, then relent.
# Also repairs a conditional-comfort shape in the old stinger
# ("If you now love it, Someone changed what you love").
"apologetic-loved-darkness-rather-than-light.html": (
    '<p>John 3:19 is almost always read as a sentence passed on somebody else. It is not. It is a finding of fact about the species, entered into the record before you were born and confirmed by every hour you have ever spent steering the conversation away from the one subject that could have saved you. Men loved the darkness. Not endured it. Not settled for it. Loved it.</p>\n\n'
    '   <p>And then the thing no court has ever done before or since: the Judge went into the dark after the condemned. He did not switch on a light at the edge of it and wait to see who would come. He was lifted up in the dark, at night, outside the city, so that people whose whole appetite ran the other way would be given an appetite they had never had and could not have manufactured. That is why the light is still standing open in front of you this minute. It was not held open on the strength of your interest in it.</p>\n\n'
    '   <p style="margin-top:2rem;"><strong>The light never waited to be wanted.</strong></p>\n\n'
),

# 4 — Rev 5:9. Image: the marketplace, the new song, every tribe.
# Architecture: warm, lyrical — the page that should SING (§I.5, the note of joy).
"apologetic-purchased-from-every-tribe.html": (
    '<p>Every song you have ever loved, you learned. You did not compose a melody in the womb. You heard one, and something in you answered before you could have explained why, and by the time you were able to sing it the song had somehow become yours. The new song is being taught the same way right now, in languages that have never been written down, to people who will stand in that number beside you and whom you would not have looked at twice on the street.</p>\n\n'
    '   <p>You will not have to learn your part when the day comes. You were bought into the choir.</p>\n\n'
    '   <p style="margin-top:2rem;"><strong>Out of every tribe — a definite people, bought, and singing.</strong></p>\n\n'
),

# 5 — Eph 2:8-9. Image: the empty hand holding a fortune.
# Architecture: cool and precise, one turn deeper — faith as the transparent
# medium you look THROUGH, never AT. Kills the introspection loop the page's
# own penultimate paragraph flirts with.
"systematic-faith.html": (
    '<p>There is a reason Scripture almost never asks you to measure your faith and almost always asks you what your faith is <em>in</em>. A hand is not the sort of thing you evaluate. Neither is a window: you look through it, never at it, and the day you find yourself studying the glass is the day you have stopped seeing anything outside. Faith is the glass. It was never the view.</p>\n\n'
    '   <p>So look through it. The One on the other side has been standing there the entire time you were busy inspecting your grip, and He does not hold you more firmly on the days your fingers are steady or more loosely on the days they are not. Your grip was never the thing under discussion.</p>\n\n'
    '   <p style="margin-top:2rem;"><strong>Your faith did not earn the gift. Your faith was the gift.</strong></p>\n\n'
),

# 6 — Rom 8:29-30, John 10:28-29. Image: the trembling hand, the unbroken chain.
# Architecture: the QUIETEST close on the site — no image-stacking, no stinger,
# nothing decorative. The site needs at least one page that ends almost in a
# whisper (§XXII.5). Deliberately avoids the page's own drowning-man line so it
# advances rather than restates (§VI, wordiness).
"systematic-perseverance.html": (
    '<p>One day you will look back on the years you spent afraid you would not make it, and the fear will have gone strange on you. It will look the way a child\'s fear of a dark bedroom looks to him twenty years later, standing in the same room in the middle of an ordinary afternoon. Nothing in that room ever moved. There was never anything in the corner. What changed was not the room but the light, and he did not bring the light in either.</p>\n\n'
    '   <p>That afternoon is coming. Until it does, you have this, which is enough and was always meant to be enough: you are not the one keeping you.</p>\n\n'
),

# 7 — the turning, the road, the new heart. Architecture: brisk and corrective,
# then warm. New ground in the grammar of "turn" — a turn is defined by what it
# faces, never by its force. Avoids the prodigal (22 pages) deliberately.
"systematic-repentance.html": (
    '<p>Look at what repentance actually is, structurally. A turn is not something you perform on yourself. It is something that happens because there is something over there. No one turns in an empty room. Which means the turning was never the accomplishment — the accomplishment is that Someone was standing in the doorway worth turning toward, and that you were given eyes that could finally make Him out.</p>\n\n'
    '   <p>So turn. Keep turning; you will need to tomorrow, and the day after that, and this will go on for the rest of your life. But stop auditing the turn. Every second you spend grading the quality of your own repentance is a second spent looking in exactly the wrong direction.</p>\n\n'
    '   <p style="margin-top:2rem;"><strong>You did not turn yourself around. Grace turned you.</strong></p>\n\n'
),
}

START = '<p>So we confess it'
END = '<!-- RELATED-ARTICLES-START -->'

os.makedirs('archive/s180-backup', exist_ok=True)

# PASS 1 — verify every anchor before touching a single file.
plan = []
for fn, new in REPL.items():
    s = io.open(fn, encoding='utf-8').read()
    assert s.count(START) == 1, (fn, 'START count', s.count(START))
    assert s.count(END) == 1, (fn, 'END count', s.count(END))
    i = s.index(START); j = s.index(END)
    assert i < j, (fn, 'order')
    old = s[i:j]
    assert 'be all the glory' in old, (fn, 'not the machine')
    assert 'Amen.' in old, (fn, 'no Amen')
    assert '<a ' not in old, (fn, 'CUT WOULD DESTROY A LINK')
    plan.append((fn, s, i, j, old, new))

print('all %d anchors verified\n' % len(plan))

# PASS 2 — apply.
for fn, s, i, j, old, new in plan:
    shutil.copy(fn, 'archive/s180-backup/' + fn)
    out = s[:i] + new + s[j:]
    io.open(fn, 'w', encoding='utf-8').write(out)
    print('%-52s  -%4d chars  +%4d chars' % (fn, len(old), len(new)))

print('\ndone.')
