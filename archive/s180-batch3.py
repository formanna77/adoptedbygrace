#!/usr/bin/env python3
"""S180 batch 3 — the after-the-Amen group, plus a CONSECRATED page carrying
three separate banned moves.

invisible-wall-prayer-feels-empty (labelled CONSECRATED / BORN-APEX) carried,
in its opener and its Circular Return:
  * CRISIS-TRIAGE / SEARCH-INTENT RHETORIC (VOICE §VI, explicitly banned):
    "You found this page by searching for something you were embarrassed to
    type" / "Remember the search bar?" / "a page you almost didn't click."
  * THE ODD-HOUR CRISIS FRAME (§VI): "at an hour when no one else was awake"
    — direct second-person framing of the reader's crisis, not the carveout.
  * THE FEELING-SLIP, form 1, twice: "the very ache to pray is itself the
    quiet evidence that grace still has hold of you" (In Brief) and "the fact
    that you typed it at all... tells you something about where you are."
Its real opener — the bedroom, the clasped hands, the words falling to the
carpet like stones — is universal and excellent, and was buried underneath the
funnel paragraph. The Circular Return now returns to THAT (Move 10 done right),
which also lets the original hammer "Someone was." land harder, because it now
answers the page's own scene instead of a search box.

devotional-cold-church: a styled callout printed after the Amen that both
re-opens a closed page AND reads the reader's felt ache as evidence of grace
("this ache, this stirring... is what it feels like when grace sets fire to a
cold room"), which shames any reader who feels nothing. Cut; the prayer is the
closer.

anxious-mind-the-loop-that-wont-break: prayer, then a paragraph, then a
stinger. The hammer is folded into the paragraph so one beat follows the Amen.

demolition-works-righteousness: prayer, then a nav rail, then a hammer. The
rail is moved above the prayer so the page ends where a demolition must end —
in the catch (§I.1) — and the trailing hammer is cut as a restatement of
"You were not the transaction. You were what was paid for."

question-are-arminians-saved: one residual search-funnel phrase.
"""
import io, os, shutil

EDITS = [

# ============ invisible-wall-prayer-feels-empty ============
("invisible-wall-prayer-feels-empty.html",
 'He <a href="/question-perseverance">holds you through the silent season</a> as surely as through the singing one, and the very ache to pray is itself the quiet evidence that <a href="/question-chosen">grace still has hold of you</a>.',
 'He <a href="/question-perseverance">holds you through the silent season</a> as surely as through the singing one, and <a href="/question-chosen">His grip on you</a> was never a thing your feelings were built to measure.'),

("invisible-wall-prayer-feels-empty.html",
 '<p>You found this page by searching for something you were embarrassed to type. Maybe it was <em><a href="/devotional-i-cant-feel-god">can\'t feel God</a> anymore</em> or <em>prayer feels pointless</em> or just <em>why</em> — just that one word in a search bar at an hour when no one else was awake. And the fact that you typed it at all — that you went looking for help with the very relationship that is supposed to <em>be</em> the help — tells you something about where you are. You are not doubting God as an idea. You are grieving God as a person you used to feel beside you who has gone quiet. That distinction matters. Doubt is academic. This is bereavement.</p>',
 '<p>There is a particular silence that only ever happens to people who have prayed for years. It is not the silence an unbeliever lives in, who expects nothing from the ceiling and is not surprised to get it. It is the silence of someone who once heard something, and it lands in an entirely different part of the chest. You are not doubting God as an idea. You are <a href="/devotional-i-cant-feel-god">grieving God as a person</a> you used to feel beside you and who has gone quiet. That distinction matters more than it looks. Doubt is academic. This is bereavement.</p>'),

("invisible-wall-prayer-feels-empty.html",
 '<p>Remember the search bar? The word you typed in the dark? You went looking for God in a search engine because you couldn\'t find Him in prayer. And here you are — at the bottom of a page you almost didn\'t click — and something has shifted. Not the feeling. The feeling may still be gone. But the ache has a name now. It is not abandonment. It is not punishment. It is the dark night that every saint has walked, and the God who walks it with you is not silent because He left. He is silent because He is teaching your faith to hear in a register deeper than feeling — deeper than warmth, deeper than presence, deeper than the ceiling and the carpet and the cold hands clasped in the dark.</p>',
 '<p>Go back to the bedroom. The hands are still clasped. The words still fall to the carpet like stones and no ripple comes back, and nothing whatever about the room has changed. What has changed is what you now know about the silence in it. It is not abandonment and it is not punishment. It is the dark that nearly every saint whose name you know has walked through, and the One walking it beside you is not quiet because He left. He is quiet because He is teaching your faith to hear in a register deeper than feeling — deeper than warmth, deeper than presence, deeper than the ceiling and the carpet and the cold hands clasped in the dark.</p>'),

("invisible-wall-prayer-feels-empty.html",
 '<p>He is <a href="/question-chosen">the God who chose you</a>. He is singing over you in the silence. And He will not stop until you hear it again — or until you learn that the song was always playing, even at the hour you typed that word into the search bar and thought no one was listening.</p>',
 '<p>He is <a href="/question-chosen">the God who chose you</a>, and He has been singing over that room since long before you ever knelt in it. One day the hearing will come back. Until it does, hold on to what the silence actually was, that first night the words would not rise: you knelt in the dark, certain that no one was there.</p>'),

# ============ devotional-cold-church ============
("devotional-cold-church.html",
 '\n\n   <p style="margin-top: 2rem; font-style: italic; color: var(--text-secondary); border-left: 3px solid var(--accent-gold); padding-left: 1.5rem;">The numbness you walked in with was not peace. This — this ache, this stirring, this tender rupture of your carefully managed religion — this is what it feels like when grace sets fire to a cold room. And the warmth you feel coming is not judgment. It is the heat of the One who loved you before you were born, coming home.</p>',
 ''),

# ============ anxious-mind-the-loop-that-wont-break ============
("anxious-mind-the-loop-that-wont-break.html",
 '<p>The thought may circle back one more time, or ten more times. But something has shifted — not in the loop, but underneath it. There is a throne at the center of the universe, and you are no longer sitting on it. Someone else is. Someone who has never lost sleep over anything, because He has never lost control of anything.</p>\n\n   <p style="margin-top:2rem;"><strong>He is not anxious about you.</strong></p>',
 '<p>The thought may circle back one more time, or ten more times. But something has shifted, and not in the loop — underneath it. There is a throne at the center of the universe and you are no longer sitting on it. Someone else is: Someone who has never once lost sleep over anything, because He has never once lost control of anything. He is not anxious about you.</p>'),

# ============ demolition-works-righteousness ============
("demolition-works-righteousness.html",
 '<h2>A Prayer to Pray Without Holding Anything Back</h2>\n\n   <p><em>Father — I see now the sentence I have been hiding in. I see the column I had quietly reserved for myself. I see the sliver. I thought I was being humble. I was keeping one hand on the wheel. Take it. The zeal I thought was mine, the decision I thought was mine, even the reach of my hand toward You — I give it to You, who gave it to me first. Let the whole ledger be Yours. Let there be nothing I could, at the end, point to and call mine. And let the freedom of that poverty be the joy I did not know I was missing. In Your Son, who carried what I was trying to carry. Amen.</em></p>\n\n   <h2>Next Steps</h2>\n\n   <p>From the demolition, walk toward the catch. If you have begun to see that <a href="/question-faithgift">faith itself is the gift</a>, the next door is <a href="/question-chosen">chosen before the foundation of the world.</a> If you want to see the mechanism underneath — why a corpse could not have reached first — the Linchpin argument is <a href="/question-depravity">total depravity: dead, not sick.</a> When you are ready to stop pointing at your own faith as if it proved something, come and <a href="/devotional-never-gives-up">rest in a salvation that does not depend on your performance.</a></p>\n\n   <p>The Crown Jewel argument <a href="/question-boasting">in its logical endpoint</a> lives next door, and the full order of how God saves — from decree to glory, and every link unbreakable — is laid out in <a href="/systematic-soteriology">the soteriology spine.</a></p>\n\n   <p>You could not have reached first.</p>',
 '<h2>Next Steps</h2>\n\n   <p>From the demolition, walk toward the catch. If you have begun to see that <a href="/question-faithgift">faith itself is the gift</a>, the next door is <a href="/question-chosen">chosen before the foundation of the world.</a> If you want to see the mechanism underneath — why a corpse could not have reached first — the Linchpin argument is <a href="/question-depravity">total depravity: dead, not sick.</a> When you are ready to stop pointing at your own faith as if it proved something, come and <a href="/devotional-never-gives-up">rest in a salvation that does not depend on your performance.</a></p>\n\n   <p>The Crown Jewel argument <a href="/question-boasting">in its logical endpoint</a> lives next door, and the full order of how God saves — from decree to glory, and every link unbreakable — is laid out in <a href="/systematic-soteriology">the soteriology spine.</a></p>\n\n   <h2>A Prayer to Pray Without Holding Anything Back</h2>\n\n   <p><em>Father — I see now the sentence I have been hiding in. I see the column I had quietly reserved for myself. I see the sliver. I thought I was being humble. I was keeping one hand on the wheel. Take it. The zeal I thought was mine, the decision I thought was mine, even the reach of my hand toward You — I give it to You, who gave it to me first. Let the whole ledger be Yours. Let there be nothing I could, at the end, point to and call mine. And let the freedom of that poverty be the joy I did not know I was missing. In Your Son, who carried what I was trying to carry. Amen.</em></p>'),

# ============ question-are-arminians-saved ============
("question-are-arminians-saved.html",
 'It is, for almost everyone who types it into a search bar, a question about somebody',
 'It is, for almost everyone who ever asks it, a question about somebody'),
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
