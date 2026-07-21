#!/usr/bin/env python3
"""
S181 — break the NINTH cross-page template: the ethics-category closing machine.

S180 broke this machine's other dialect ("So we confess it, who once ___") on
seven pages and recorded "machine residue site-wide: 0". That residue check
keyed on the PHRASE, not the SHAPE — and the entire ethics category was running
the same device in a different vocabulary. This is the standing lesson in a new
costume: a fix applied at time T does not repair the variants already on disk.

The shape, identical on 11 pages, five parts:
  1. <h2>The Catch — for [audience]</h2>            (meta-label naming the move)
  2. "And now the tenderness..." / "So hear the rest folded inside the doctrine"
  3. "So we confess / So we lift our eyes from X to Y..."
  4. "We adore the Father who... the Son who... the Spirit who..."
     → "To the [Triune] God who..., be the glory forever. Amen."
  5. <p style="margin-top:2rem;"><strong>[one-line aphorism]</strong></p>

Two of the aphorisms were near-verbatim twins ("Worth is conferred, never
earned." / "Dignity is conferred, never computed."), the signature S180 flagged.

NOT a blind cut. The confession/adoration paragraphs carry genuinely page-native
material — "the Son who was Himself once an unborn child in a frightened young
woman's body" is excellent and belongs to ethics-abortion alone. That material
is KEPT and rewoven. What is dissolved is the armature: the roll-call cadence,
the generic doxology, and the stinger stranded after the Amen.

Eleven pages, eleven different shapes, eleven different temperatures — three end
on a kept hammer now integrated into prose, six end on prose, abortion ends as
quietly as anything on the site. Rewriting them to one better formula would be
a regression wearing a fix (VOICE §XVIII.3).
"""
import os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP = os.path.join(ROOT, 'archive', 's181-backup')
os.makedirs(BACKUP, exist_ok=True)
M = '—'

# page: (old_h2_substr, new_h2, old_opener, new_opener, new_close_html)
PAGES = {

'ethics-abortion': (
 'The Catch ' + M + ' for the One Who Has Grieved an Abortion',
 'If You Have Carried This for Years, Read This Part Slowly',
 'And now the page must turn its whole face toward the reader the rest of the internet shouts at, and speak to her in a different voice ' + M + ' because she is reading this, and she is carrying something heavier than any argument.',
 'Someone reading this is carrying something heavier than any argument on this page, and she has been shouted at about it for years.',
 '<p>The God who knits a body together in the dark is the same God who took our own flesh from its very first cell. The Son who was Himself once an unborn child in a frightened young woman\'s body is the one who died to cover the sins we cannot forgive ourselves. Which means the truth that grants the smallest child her worth is the same truth that grants you your pardon, and neither one was earned. He conferred both. He conferred them in the dark, before either of you could ask.</p>'),

'ethics-end-of-life': (
 'The Catch ' + M + ' for the Dying, and for Those Who Watch Them Go',
 'Whose Hands the Deathbed Was Always In',
 'And now the tenderness the doctrine has too often been denied.',
 'There is a tenderness in this doctrine that it has too often been denied.',
 '<p>So the deathbed goes back where it always belonged ' + M + ' not into our hands, which cannot hold it, but into His, which already do. The number of our days was written in love before the first one dawned. The Son walked into death and came out the far side with its keys on His belt. And the Spirit is in every hospice room where a saint is dying, saying the thing the dying cannot yet say for themselves: that the rope is only being let go so the ship can finally sail.</p>'),

'ethics-immigration': (
 'The Catch ' + M + ' For Everyone Who Has Never Belonged',
 'You Were Brought Near While You Were Still Far Away',
 'And now the tenderness, because there is a reader of this page who is not arguing about policy at all.',
 'There is a reader here who is not arguing about policy at all.',
 '<p>Every naturalized citizen confesses the same thing, and so does every Christian: we did not earn the country, did not qualify for the papers, did not cross the border on the strength of our own legs. We were aliens to the covenants, without hope and without God ' + M + ' and we were brought near while we were still far off. The blood paid an admission we could never have afforded. The border we lay dead at the foot of, Another carried us across. You were a stranger at the gate. He carried you in.</p>'),

'ethics-just-war': (
 'The Catch ' + M + ' the Peace No Army Ever Won',
 'The Only Peace That Was Ever Final',
 None, None,
 '<p>We cannot be trusted with the sword, and even our refusals of it can become idols. Vengeance is not ours; the world\'s reckoning was never on our shoulders; the peace we ache for was never ours to manufacture. It was made once, on a hill outside a city wall, by the One who lends authority in trust and reserves judgment to Himself, who bore the sword-stroke we had earned, and who is even now disarming the war inside His own people. The end of war is not a treaty and not a policy. It is a Person, and He has already come.</p>'),

'ethics-marriage': (
 'The Catch ' + M + ' for the Married, the Single, and the Brokenhearted',
 'Every Faithful Marriage Was a Rehearsal',
 'And now the tenderness the doctrine has too often been denied.',
 'Now the tenderness this doctrine is so often stripped of.',
 '<p>Lift your eyes, then, from the marriage to the Marriage. The love the covenant required was never generated by the two people inside it. It was the Father\'s gift, won by the Son who gave Himself up for His Bride, applied by the Spirit who is even now teaching two stubborn hearts to spend themselves on each other. And Scripture promises a day when the icon gives way to the wedding it always foretold ' + M + ' "the wedding of the Lamb has come, and his bride has made herself ready" ' + M + ' and every faithful marriage on earth turns out to have been a rehearsal for the one that does not end. The vow was funded from heaven all along.</p>'),

'ethics-power-authority': (
 'The Catch ' + M + ' For Everyone a Power Has Wounded',
 'The Throne He Reached by Descending',
 'And now the tenderness, for there is a reader who has stopped following the argument because a single word ' + M + ' authority ' + M + ' pulled the floor out.',
 'There is a reader who stopped following the argument several paragraphs ago, because a single word ' + M + ' authority ' + M + ' pulled the floor out.',
 '<p>Everyone who has grasped at a throne comes eventually to the same confession: that we reached for control like Adam, that we made a shrine of every small authority we were handed, that we bore His Name and too often bore it for our own kingdom. The Father ordains authority and entrusts it as a stewardship to be poured out. The Son, having all power, emptied Himself, took the towel, wore the thorns, and reigns now as the Lamb who was slain. The Spirit is at this moment tearing down the throne in His people\'s chests and bending their hands toward service. The King who rules you reached His throne by bleeding for you, and He rules you still with hands that carry the marks.</p>'),

'ethics-race': (
 'The Catch ' + M + ' for the Despised, and for the One Repenting',
 'One Blood, and a Family No Genealogy Could Contain',
 'And now the tenderness.',
 'Now the tenderness.',
 '<p>We did not make our own blood, our own nation, or our own image, and we have nothing to boast in but a grace that chose us owing us nothing. The contempt that has lived in human hearts ' + M + ' including in the church that bears Christ\'s name ' + M + ' is renounced at its root by the truth itself. The Father made all the nations from one and chose a people for Himself out of every one of them. The Son\'s blood was shed for a family no genealogy could contain, and He tore the dividing wall down in His own flesh. There is one race. He made it from one man, and out of every nation and tribe and people and language He is buying it back.</p>'),

'ethics-sexuality': (
 'The Catch ' + M + ' for Everyone Who Has a Body',
 'A Body That Belongs to Someone',
 'So hear the rest folded into the doctrine, and hear it as addressed to every reader, because there is no one this page condemns from a safe distance.',
 'Hear the rest of it, and hear it as spoken to every reader, because no one here is being condemned from a safe distance.',
 '<p>Lift your eyes, then, from the desires to the God who made the body and is redeeming it. We made gods of our cravings and called our autonomy freedom, and the whole time the self we are most truly was never the self we were building. He made us male and female in His image and called it good. He took a body Himself, lived a sinless life inside it, and gave it up on a cross. He is even now teaching our bodies to belong to God. The identity He confers, no desire can shake and no failure can forfeit ' + M + ' which is why the last word on you is not your wanting. You are not your desire. You are His.</p>'),

'ethics-speech': (
 'The Catch ' + M + ' for Everyone Ashamed of What They\'ve Said',
 'The Coal That Touches Unclean Lips',
 'And now the tenderness, for there is a reader who has stopped reading the argument and is just hearing, on a loop, the worst thing they ever said.',
 'There is a reader who stopped following the argument a while ago and is simply hearing, on a loop, the worst thing they ever said.',
 '<p>No one tames his own tongue. Our words have surfaced a heart we are ashamed of, and no resolution ever made at the lips has reached the spring beneath them. But the Father does not wait for clean lips ' + M + ' He sends the coal to touch them. The Son, whose every word was grace, stood silent under accusation so that our careless words could be forgiven. And the Spirit changes the reservoir from the inside until the overflow itself runs clean. Change the spring, and the stream takes care of itself.</p>'),

'ethics-technology-ai': (
 'The Catch ' + M + ' Worth You Did Not Compute, Life You Cannot Code',
 'A Heap of Borrowed Atoms, and the Breath That Is Not',
 'So hear the rest folded inside the doctrine, and hear it especially if you are the one lying awake feeling obsolete.',
 'Hear the rest of it, and hear it especially if you are the one who has begun to feel obsolete.',
 '<p>Lift your eyes from the machine to the Maker. The temptation is the same one it always was; only the hardware has changed. To be like God on our own terms. To save ourselves by our own cleverness. To find in our works the worth that only He can give. He conferred His image on dust and called it very good. He took that dust into Himself, died in it, and rose in it deathless, so that what we could never engineer He simply gives. Before Him the proudest machine is a heap of borrowed atoms. Dignity is conferred. It has never once been computed.</p>'),

'ethics-work-vocation': (
 'The Catch ' + M + ' for the Striver, the Bored, and the Unemployed',
 'Thirty Years at a Bench Before a Public Word',
 'So hear the rest folded inside the doctrine.',
 'Hear the rest of it.',
 '<p>Lift your eyes from the work to the Worker. We tried to build our worth out of our output, and the worth we chased so frantically had been handed to us as a gift before we lifted a finger. The Father worked six days and called His work very good. The Son spent thirty years at a carpenter\'s bench before He spoke a public word, sanctifying ordinary labor by doing it, and then did the one work that could save us and said it was finished. The Westminster Shorter Catechism says our chief end is "to glorify God, and to enjoy him forever," and that end is served at the pulpit and the plough alike. You do not work in order to be loved. You work because you already are.</p>'),
}

CLOSE_RE = re.compile(
    r'<p>(?:(?!</p>)[\s\S])*?We adore the[\s\S]*?</p>\s*'
    r'<p style="margin-top:2rem;"><strong>[\s\S]*?</strong></p>')

failures = []
for page, (old_h2, new_h2, old_op, new_op, new_close) in PAGES.items():
    path = os.path.join(ROOT, page + '.html')
    b = os.path.join(BACKUP, page + '.html')
    if not os.path.exists(b): shutil.copy2(path, b)
    s = open(path, encoding='utf-8').read(); orig = s
    ok = True

    if s.count(old_h2) != 1:
        failures.append(f'{page}: H2 count {s.count(old_h2)}'); ok = False
    else:
        s = s.replace(old_h2, new_h2)

    if old_op is not None:
        if s.count(old_op) != 1:
            failures.append(f'{page}: opener count {s.count(old_op)}'); ok = False
        else:
            s = s.replace(old_op, new_op)

    ms = CLOSE_RE.findall(s)
    if len(ms) != 1:
        failures.append(f'{page}: close-block matches {len(ms)}'); ok = False
    else:
        s = CLOSE_RE.sub(lambda _: new_close, s, count=1)

    if ok and s != orig:
        open(path, 'w', encoding='utf-8').write(s); print(f'  OK  {page}')

print()
if failures:
    print('FAILURES:')
    for f in failures: print('   !', f)
    sys.exit(1)
print('11 ethics closes rebuilt; backups in archive/s181-backup/')
