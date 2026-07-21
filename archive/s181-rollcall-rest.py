#!/usr/bin/env python3
"""S181 — the 6 non-ethics pages running the same trinitarian roll-call machine.

Same dissolve as the ethics pass: keep every page-native clause, cut the
roll-call armature and the stinger stranded past the Amen, land each page once.
Six different shapes: two end on a kept hammer now inside the prose, two end on
a fresh turn, one on a new hammer, one very quiet.
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP = os.path.join(ROOT, 'archive', 's181-backup')
os.makedirs(BACKUP, exist_ok=True)
M = '—'

CLOSES = {

'reformed-apologetics-consciousness':
 '<p>Lift your eyes, then, from the mystery of the mind to the Maker of it. The eternal I AM was awake before there was light. The Word through whom we were made, in whom we hold together, took on a human mind and a human soul in order to redeem ours. And the Spirit, who alone knows the deep things of God, breathes the dead awake to know them. Every materialist account of you ends at the machinery. But the thing reading this sentence was breathed into dust and called by name. You are a soul, not software.</p>',

'reformed-apologetics-moral-argument':
 '<p>Lift your eyes from the law to the Lawgiver who became the Lamb. We have known the good and failed it. The witness in our chest has testified against us, and we could never silence that witness or satisfy it ourselves. The Father\'s holy character is the ground of all goodness; the Son kept the law we broke and bore the curse we earned; the Spirit takes a heart that suppresses the truth and makes it love the God it fled. The moral argument ends where every honest conscience ends, with an accusation no one can answer. And then Someone answers it.</p>',

'reformed-apologetics-resurrection':
 '<p>Lift your eyes from the empty tomb to the living Lord who walked out of it. We could never have reasoned our way to faith; the clearest evidence on earth would have left us in our graves had the Spirit not raised us with Christ. The Father raised the Son and vindicated His finished work. The Son is the firstfruits, the conqueror of death, who lives forever to intercede for His own. The Spirit applies that risen life to dead hearts, and will raise our mortal bodies on the last day. The grave had no power over Him. It has no lease on you.</p>',

'reformed-apologetics-transcendental':
 '<p>Lift your eyes from the proof to the One who is the ground of every proof. We used His logic to deny Him, His order to ignore Him, His gift of reason to argue Him away ' + M + ' and even the rebellion ran on borrowed light. He is the source of all truth, the Logos in whom all wisdom is hidden and all things cohere, who became flesh to redeem the minds that fled Him, and whose Spirit takes a heart that suppresses the truth and makes it love the Truth. He is the precondition of every thought you think. Deny Him, and you cannot even mount the denial.</p>',

'apologetic-gave-himself-for-the-bride':
 '<p>The Bride\'s confession has never changed: we did not make ourselves choosable, did not cast the deciding vote, did not pay one coin of our own dowry. We were unlovely when He gave Himself, and the radiance is His doing from first to last ' + M + ' the Father choosing a Bride before the world began, the Son loving the church and giving Himself up for her, the Spirit washing her now and working the gladness of her yes. He will present her without one stain because He died to. And that is the whole difference. He did not die to make a Bride possible. He died to make you His.</p>',

'for-deconstructed':
 '<p>The deconstructed-but-still-standing have always confessed the same thing. We did not save the foundation. We did not pull it from the rubble. The very willingness to keep looking, after every other floor had caved in, was itself the gift of the One whose hands had never let go. The Father\'s decree was the bedrock under every collapse. The Son\'s nail-pierced hands held us through the wreckage. The Spirit would not leave us in the dust. When everything that could be shaken had been shaken, what was left standing was not a proposition you salvaged. It was a Person who had been holding you the whole time. What remained has a name. Jesus.</p>',
}

CLOSE_RE = re.compile(
    r'<p>(?:(?!</p>)[\s\S])*?We adore the[\s\S]*?</p>\s*'
    r'<p style="margin-top:2rem;"><strong>[\s\S]*?</strong></p>')

failures = []
for page, new_close in CLOSES.items():
    path = os.path.join(ROOT, page + '.html')
    b = os.path.join(BACKUP, page + '.html')
    if not os.path.exists(b): shutil.copy2(path, b)
    s = open(path, encoding='utf-8').read()
    n = len(CLOSE_RE.findall(s))
    if n != 1:
        failures.append(f'{page}: {n} matches'); continue
    s = CLOSE_RE.sub(lambda _: new_close, s, count=1)
    open(path, 'w', encoding='utf-8').write(s)
    print(f'  OK  {page}')

print()
if failures:
    print('FAILURES:')
    for f in failures: print('   !', f)
    sys.exit(1)
print('6 rebuilt.')
