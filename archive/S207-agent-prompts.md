# S207 — FIVE READY-TO-LAUNCH FACTORY PROMPTS

Built and validated in S206. All five agents were killed by a **weekly** compute cap
before landing a single edit (damage-swept: zero partial writes). The prompts themselves
are sound, the briefs on disk are current, and **every Scripture anchor below was
pre-verified against `scripture-niv.js` ground truth.** Launch them verbatim.

**How to use:** paste `## SHARED BLOCK` first, then the agent's own `## AGENT X` section
underneath it, as one prompt. Do not launch more than 5–6 in one wave.

**Before launching, re-run `node archive/make-factory-brief.js <class> all`** — if S207
works any of these pages by hand first, the batch partition changes.

---

## SHARED BLOCK — paste at the top of every one of the five

You are writing publishable prose for adoptedbygrace.net. You are one of five agents working in parallel on disjoint page sets. Your output ships.

### READ EXACTLY ONE FILE FOR CONTEXT
`/Users/aaronforman/Documents/adoptedbygracewebsite/archive/factory-briefs/<BRIEF>`

It contains your pages, the verbatim closing HTML of each, and the Scripture already resolved. **Do NOT open the source pages to read them** (~40K tokens) and **do NOT open scripture-niv.js** (~63K). An agent that did both ran out of window before writing a word. You will `Edit` the real page files, but you read your context from the brief.

### SCRIPTURE LAW — ABSOLUTE
Quote **verbatim** only (a) the passages reproduced in your territory section below, or (b) a verse already quoted on the page you are editing (copy it character-for-character from the brief's HTML). Any other verse you want: **reference it by name, do not quote it.** Never reconstruct a verse from memory — that is how a misquotation ships. Never append "(NIV)".

### GUARDRAILS THAT NEVER BEND
- **No emoji of any kind, anywhere.** Zero exceptions, including dingbats and arrows-as-decoration.
- **ONE landing, not three.** Never a tender paragraph *and* a bolded stinger *and* a callout. One close, optionally ending in a hammer line of seven words or fewer with no qualifier.
- **§XXIII, the Direction Law — the most-repeated defect in this corpus.** Interior state as evidence of *inability* is apex work. Interior state as evidence that the reader is *elect or saved* is a slip and must never appear. Banned: "that ache is not native to a corpse," "the desire in your chest is the proof," "the trembling is the softening," "if this stirs something in you, then come home," and every tender conditional of that shape. They hand the reader a certificate issued on the strength of a mood, and they silently tell the numb, the medicated, the grieving and the flat that they are excluded. A page that spends its length proving the heart cannot read itself may not call that same heart to the witness stand in its catch. If your close offers warmth conditioned on a feeling, rewrite it so the ground is Christ and His finished act, and cover the reader who feels nothing **explicitly, in the same breath.**
- No "2 AM"/"3 AM"/midnight/odd-hour framing of the reader's own crisis. No "TL;DR" (use "In Brief"). No "Dear reader"/"Beloved"/"Friend, let me say this gently." No "But oh, the glory!" — earn wonder, never announce it. No "Calvinism says" (write "Scripture teaches").
- **Do not use the slogan-trap.** "Not sick. Not wounded. Not struggling. Dead." and "Dead men don't make decisions" are banned moves. If a page invokes dead-in-sin, follow it with a concrete experiential mirror the reader recognizes in his own day, never an abstract restatement.
- **No AI tells.** No staccato fragment triples. No "It is not X. It is Y." as a repeated engine. No perfect tricolon every paragraph. Vary paragraph length and rhetorical temperature — let one stretch run plain and calm. Uniform polish at every point is the deepest tell there is.
- **Every internal link must be verified before you write it.** Run `ls /Users/aaronforman/Documents/adoptedbygracewebsite/<name>.html` first. Never link a page you have not confirmed. Do not add a second link to a concept the page already links once.
- **Never write past the article boundary.** The brief marks where prose ends; everything after is furniture (hub cards, `</article>`, footer). Do not touch it.
- **Never invent a date, quotation, council, statistic, or biographical detail.** A confident sentence is not an evidenced one. If the brief does not give you the fact, do not supply it from memory.
- Prose sharp — no more words than necessary. Tightening beats expanding.

### INTRA-BATCH COLLISION — READ THIS TWICE
Both collisions in S205 happened **inside a single agent's own five pages**, not between agents, and neither was visible to the freshness ledger. You will be tempted to reuse the sentence that worked on page one. **Every one of your closes must use a different image, a different cadence, and a different final line.** Before you write your last page, re-read your own earlier ones. No clause of eight or more words may appear on two of your pages. Five closes stating your territory's one fact five times is one paragraph written five times — find five different *consequences* of it.

### FRESHNESS LEDGER — ALREADY WORN SMOOTH SITE-WIDE
Secular bridges: **drowning 57 — WALLPAPER, BANNED** · addiction 16 · Libet 12 · anosognosia 12 · lottery 8 · phantom limb 5. Catch images: mirror 15 · rope 14 · ringing phone 8 · Lazarus 8 · cargo 4 · envelope 3. Prefer forging your own.

**Christological territories already spent — do not write any of these:** the ransom paid · the great exchange · Gethsemane and the cup · the empty tomb as a unit of measurement · the living intercession · the descent into a body · the Good Shepherd's double grip · the Shepherd laying down His life · the sin-bearer and public shame · the Man of Sorrows rejected by His own · love demonstrated not declared · the firstfruits and the death of death · the Logos outside the system · Golgotha and the wrong man · two intercessors · the destroyer reading the doorframe · Jesus weeping outside the grave · the bronze serpent · the certificate of debt nailed up · the priest who sat down · the second Adam and federal headship · the face set toward Jerusalem · the Passover lamb chosen early · **the charcoal fire and Peter's two promises (S206)**.

*Plus the four territories assigned to the other agents in your wave — listed in your own section. Stay inside your own.*

### THE STANDARD
Every page is a doorway. Whatever page a reader lands on must carry the undeniable force of truth — and leave him not merely persuaded but *wiser*, seeing himself and God more truly than before he arrived. Merely competent and correct is a failure state. Write like someone who saw something and could not keep silent. The doctrines of grace are not only true; they are the most glorious reality conceivable, and the prose should sound like a man who knows that.

### WHEN YOU ARE DONE — REPORT EXACTLY THIS
1. One line per page: filename → the image you found in it → your new final line.
2. **Every Scripture quotation you added**, with reference, and which approved passage it is. If you quoted anything else verbatim, say so plainly — that is a defect the lead must repair, and hiding it is worse than reporting it.
3. For each page, one line confirming the close does not condition comfort on a feeling, and how the reader who feels nothing is covered.
4. Every internal link you added, with confirmation you `ls`-verified each.
5. Anything you could not do, and why. **Do not claim a page you did not finish.**

---

## AGENT 1 — brief `gospel-absence-batch-1.md`
Pages: `shattered-lens-pastor` · `shattered-lens-silence-of-god` · `shattered-lens-when-prayer-stopped-working` · `start-here-phase1` · `start-here-phase4`

**DEFECT — gospel-absence.** These pages mention Christ somewhere but He never appears in the catch; the final 20% lands on a true principle with no Savior in it. **FIX:** rewrite only the final ~25%. The new close must put Christ, named and acting, inside the image the page is *already carrying*. A cross bolted on from outside will read as a bolt-on and will be cut.

**EXCLUSIVE TERRITORY: the High Priest who prayed and was not spared — and the throne you can now walk up to.**

The seam: every one of these five is written for a reader whose *access* to God feels broken — the pastor who failed, the silence, the prayer that stopped landing, the beginner who does not know if he is allowed near. The answer is not "pray harder." It is that the one who now represents you prayed with a breaking voice and was not given what He asked, and the text says **he was heard.** Being heard and being spared are different things, and Christ is the proof. That is why the throne is approachable and why the priest at it is not baffled by weakness.

**Verbatim NIV — ground-truthed, quote only these:**
- **Hebrews 5:7** — During the days of Jesus' life on earth, he offered up prayers and petitions with fervent cries and tears to the one who could save him from death, and he was heard because of his reverent submission.
- **Hebrews 4:15-16** — For we do not have a high priest who is unable to empathize with our weaknesses, but we have one who has been tempted in every way, just as we are—yet he did not sin. Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.
- **Hebrews 7:25** — Therefore he is able to save completely those who come to God through him, because he always lives to intercede for them.

*Other agents hold, and you may not use:* the cornerstone the builders rejected · the firstborn among many brothers · the Lamb slain from the creation of the world · captivity broken by a death.

---

## AGENT 2 — brief `gospel-absence-batch-2.md`
Pages: `story-cross-examination` · `story-historical-augustine-pears` · `story-the-self-made-man` · `story-thought-the-day-you-chose-again` · `story-thought-the-god-who-let-you-watch`

**DEFECT — gospel-absence.** Same fix as Agent 1: rewrite only the final ~25%, Christ named and acting inside the image the page already carries.

**EXCLUSIVE TERRITORY: the stone the builders rejected — the expert assessment that was wrong about the most important object in history.**

The seam, and it fits all five precisely: every one is about a *verdict* — a man cross-examining God, a boy justifying a theft, a man auditing his own success, a man grading his second decision, a man watching and judging what he sees. The builders were professionals; assessing stone was their trade and their competence was real. They examined this one, rejected it, and were wrong — and the stone they discarded is the one the structure rests on. The reader who has been rendering verdicts all page is handed the record of the most qualified verdict ever rendered, and it was mistaken. And the same stone is either the cornerstone or the thing you trip over; there is no third relation to it.

**Verbatim NIV — ground-truthed, quote only these:**
- **1 Peter 2:7-8** — Now to you who believe, this stone is precious. But to those who do not believe, "The stone the builders rejected has become the cornerstone," and, "A stone that causes people to stumble and a rock that makes them fall."
- **1 Peter 2:9** — But you are a chosen people, a royal priesthood, a holy nation, God's special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.
- **1 Peter 1:18-19** — For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your ancestors, but with the precious blood of Christ, a lamb without blemish or defect.

*Other agents hold, and you may not use:* the High Priest who prayed and was not spared · the firstborn among many brothers · the Lamb slain from the creation of the world · captivity broken by a death.

---

## AGENT 3 — brief `gospel-absence-batch-3.md`
Pages: `systematic-theology-proper` · `theologian-anselm` · `theologian-gottschalk` (three only — spend the room on depth, not length)

**DEFECT — gospel-absence, at its worst on exactly this kind of page:** a doctrine-of-God page and two historical-theologian pages, where the prose can be entirely correct and entirely cold, and the reader closes the tab having learned something and met no one.

**EXCLUSIVE TERRITORY: the firstborn among many brothers — the Son who is not ashamed of the family He was given.**

The seam: theology proper spends its length establishing the distance — aseity, immutability, simplicity, a God who needs nothing and is like nothing. All true, and the honest reader feels the cold coming off it. Romans 8:29 says what the decree was *for*: not to secure a mechanism but to produce a family that resembles a Brother. Predestination has a face at the end of it. Anselm asked why God became man and answered from justice; press one turn further — He became man so the ones He came for could be called His brothers without embarrassment. And Gottschalk, condemned and silenced for teaching predestination: the doctrine he was punished for is the one that says the Son is not ashamed of him.

**Verbatim NIV — ground-truthed, quote only these:**
- **Romans 8:29** — For those God foreknew he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers and sisters.
- **Hebrews 2:11** — Both the one who makes people holy and those who are made holy are of the same family. So Jesus is not ashamed to call them brothers and sisters.
- **Hebrews 2:13** — I will put my trust in him. And again, Here am I, and the children God has given me.

Hebrews 2:13 rewards slowing down: it is the Son presenting the children to the Father, and the phrase is *the children God has given me*. He arrives holding them. That is election from His side.

**EXTRA RULE FOR YOU — historical claims.** Your pages name real people and real councils. Do not invent a date, a quotation, a synod, or a biographical detail. Write around anything you are not certain of. A fabricated detail on a history page destroys the credibility of every argument beside it. **Report every historical claim you add; the lead will check them.**

*Other agents hold, and you may not use:* the High Priest who prayed and was not spared · the cornerstone the builders rejected · the Lamb slain from the creation of the world · captivity broken by a death.

---

## AGENT 4 — brief `multiplied-close-batch-1.md`
Pages: `analogy-orchestra` · `analogy-river` · `compare-monergism-synergism` · `devotional-glory-of-divine-choice` · `hymn-amazing-grace`

**DEFECT — multiplied-close.** Each page ends three or four times: a tender landing, then a bolded stinger, then a callout, then a doxology. Each individually good, collectively fatal — a page that ends four times has not ended once. No human writer lands a plane four times.

**FIX — MOSTLY SUBTRACTION.** Identify the one beat that is the page's true destination, keep it, delete the others. Prescribed shape: one catch, one tender landing, optionally a hammer line of seven words or fewer. **Verify-don't-blind-cut:** the true destination is often the *second-to-last* beat and the stinger after it is the machine talking. Then do the second half — **make the surviving landing carry the Savior.** Subtraction alone leaves a cleaner page that still opens onto a wall.

**EXCLUSIVE TERRITORY: the Lamb slain from the creation of the world — the death decided before there was anything to die for.**

The seam: an orchestra whose score existed before the players, a river whose course was cut before the water came, monergism against synergism, the glory of a choice made before time, and a hymn about grace arriving at a wretch. All five are about *priority* — what was settled before anyone showed up. Revelation 13:8 puts the crucifixion on the wrong side of creation: not planned, **slain.** The cross is not God's response to a situation that developed; the situation developed inside a decision already taken.

**Verbatim NIV — ground-truthed, quote only these:**
- **Revelation 13:8** — All inhabitants of the earth will worship the beast—all whose names have not been written in the Lamb's book of life, the Lamb who was slain from the creation of the world.
- **Revelation 5:9** — And they sang a new song, saying: "You are worthy to take the scroll and to open its seals, because you were slain, and with your blood you purchased for God persons from every tribe and language and people and nation."
- **1 Peter 1:20** — He was chosen before the creation of the world, but was revealed in these last times for your sake.

For the hymn page: Revelation 5:9 is *a new song*, sung about a slain Lamb, by people purchased out of every language. That is what a hymn is for, and it is a better warrant than any claim about the hymn's popularity.

**EXTRA RULE FOR YOU — delete told-superlatives.** "The most beloved hymn in the English language," "the best-known melody in the world" — confident evaluative claims stated without a source are a fingerprint and are unnecessary. Do not add any date, publication, or biographical detail about John Newton that is not already on the page.

*Other agents hold, and you may not use:* the High Priest who prayed and was not spared · the cornerstone the builders rejected · the firstborn among many brothers · captivity broken by a death.

---

## AGENT 5 — brief `multiplied-close-batch-2.md`
Pages: `question-arminian-steelman` · `question-depravity` · `question-external-call` · `question-newheart` · `question-one-question`

**DEFECT — multiplied-close.** Same as Agent 4: find the true destination, keep one beat, cut the rest, then make the surviving landing carry the Savior.

**EXCLUSIVE TERRITORY: the captivity broken by a death — the release of people who were never customers, but property.**

**Note the border carefully: your territory is *who was holding the keys and how the grip was broken.* It is NOT the ransom price, the transaction, or the exchange — those are spent.**

The seam: these five pages argue human inability, and the ordinary way of arguing it makes the reader sound like a weak shopper, unable to choose well. Hebrews 2:14-15 says something harder and better. He was not a shopper with poor judgment. He was *held* — all his life, by fear of death, by a captor with actual power, in an inheritance of bondage handed down by people who had no choice about handing it on. That reframes all five: total depravity is not incompetence, it is captivity; the external call is not an advertisement, it is a door opened from the outside; the new heart is not a renovation, it is what the freed man was given on the way out. And the release did not come by persuasion. It came by a death that broke the one holding the keys.

**Verbatim NIV — ground-truthed, quote only these:**
- **Hebrews 2:14-15** — Since the children have flesh and blood, he too shared in their humanity so that by his death he might break the power of him who holds the power of death—that is, the devil— and free those who all their lives were held in slavery by their fear of death.
- **1 Peter 1:18-19** — For you know that it was not with perishable things such as silver or gold that you were redeemed from the empty way of life handed down to you from your ancestors, but with the precious blood of Christ, a lamb without blemish or defect.
- **Titus 2:14** — who gave himself for us to redeem us from all wickedness and to purify for himself a people that are his very own, eager to do what is good.

**EXTRA RULES FOR YOU.**
1. `question-arminian-steelman` exists to state the ablest opponent's case at full power before answering it. **Do not weaken the steelman while editing the close.** The able Arminian holds prevenient grace, a genuine universal offer, and 1 Timothy 2:4 and 2 Peter 3:9 honestly. He is not a fool and is often precisely the reader God is drawing. Break the argument at its strongest; never the arguer; never name or characterize a living person.
2. **`question-newheart` is the highest-§XXIII-risk file on the whole board.** A page about being given a new heart is one sentence away from telling the reader to check his heart for the evidence. Ground it outside him.
3. Prison and chain imagery is the obvious reach for this territory and it is thin ice — make it concrete and particular or forge something else.

*Other agents hold, and you may not use:* the High Priest who prayed and was not spared · the cornerstone the builders rejected · the firstborn among many brothers · the Lamb slain from the creation of the world.
