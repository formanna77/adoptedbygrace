#!/usr/bin/env node
/**
 * THE CARTOGRAPHER — Batch Journey Section Adder
 * Adds "Continue the Journey" sections to pages that don't have them.
 * Uses intelligent category-based recommendations following the Two Arms mandate.
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════
// JOURNEY MAPPING — Each category gets contextual recommendations
// Two Arms: demolition pages → link to devotional/healing
//           comfort pages → link to challenge/question
//           question pages → link to answer + emotional landing
// ═══════════════════════════════════════════════════════

const JOURNEY_MAP = {
  // ─── DEMOLITION PAGES ───
  // Pattern: deeper demolition + healing/devotional catch
  'demolition-john3-16': [
    { href: '/question-does-god-love-everyone-equally.html', title: 'Does God Love Everyone Equally?', desc: 'The question John 3:16 opens leads straight here.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'If His love is truly unconditional, it was set on you before you existed.' },
    { href: '/analogy-lazarus-grave.html', title: 'Lazarus at the Grave', desc: 'An analogy that makes the kind of love in John 3:16 impossible to misunderstand.' }
  ],
  'demolition-1cor15-22': [
    { href: '/systematic-atonement.html', title: 'The Atonement — What the Cross Actually Accomplished', desc: 'If all die in Adam, then all who live do so in Christ. What does that mean?' },
    { href: '/devotional-dead-who-live.html', title: 'The Dead Who Live', desc: 'You were the dead. He made you alive. Rest in that.' },
    { href: '/question-boasting.html', title: 'Why Can\'t We Boast?', desc: 'If salvation is by representation, where does boasting fit?' }
  ],
  'demolition-1tim2-4': [
    { href: '/demolition-2peter3-9.html', title: 'God Is Patient — But With Whom?', desc: '2 Peter 3:9 uses the same "all" language. See who Peter is writing to.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'When God wills to save, He doesn\'t ask permission.' }
  ],
  'demolition-1tim4-10': [
    { href: '/systematic-atonement.html', title: 'What the Cross Actually Accomplished', desc: 'The distinction between "all men" and "those who believe" changes everything.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'If He is the Savior especially of those who believe — those hands are holding you.' }
  ],
  'demolition-2cor5-14-15': [
    { href: '/systematic-soteriology.html', title: 'Soteriology — The Full Doctrine of Salvation', desc: 'Unpack what "one died for all" means in the fullness of Scripture.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'When Christ died for you, your chains didn\'t loosen. They shattered.' }
  ],
  'demolition-2peter2-1': [
    { href: '/question-perseverance.html', title: 'Can You Lose Your Salvation?', desc: 'If false teachers were "bought," what does that mean for real believers?' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'The answer to every "what if I fall away" fear.' }
  ],
  'demolition-2peter3-9': [
    { href: '/demolition-1tim2-4.html', title: 'God Desires All to Be Saved — But What Does "All" Mean?', desc: 'The same word appears in 1 Timothy. Context reveals everything.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'His patience toward "us" is not indecision. It is faithfulness.' }
  ],
  'demolition-acts17-30': [
    { href: '/systematic-regeneration.html', title: 'Regeneration — Born Again Before You Believed', desc: 'God commands repentance — and gives the ability to obey.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'If repentance is a gift, then even your turning to God was His work.' }
  ],
  'demolition-acts7-51': [
    { href: '/question-irresistible.html', title: 'Is Grace Really Irresistible?', desc: 'Israel resisted. So why does grace still win?' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'The same Spirit they resisted is the one who overcame their resistance.' }
  ],
  'demolition-arianism': [
    { href: '/systematic-christology.html', title: 'Christology — Who Christ Really Is', desc: 'The full doctrine that Arianism attempted to undermine.' },
    { href: '/systematic-trinity.html', title: 'The Trinity', desc: 'If Christ is less than God, the atonement fails. Here\'s why.' }
  ],
  'demolition-arminian-facts': [
    { href: '/compare-calvinism-arminianism.html', title: 'Calvinism vs. Arminianism — Side by Side', desc: 'The complete comparison, point by point.' },
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'The question that collapses the Arminian framework.' }
  ],
  'demolition-children-of-satan': [
    { href: '/systematic-hamartiology.html', title: 'Hamartiology — The Doctrine of Sin', desc: 'If we are children of the devil by nature, what must God do to change our nature?' },
    { href: '/devotional-adoption-papers.html', title: 'The Adoption Papers', desc: 'You were born into the wrong family. God adopted you into His.' }
  ],
  'demolition-cut-off-from-root': [
    { href: '/question-perseverance.html', title: 'Can You Lose Your Salvation?', desc: 'Romans 11\'s olive tree metaphor answered in full.' },
    { href: '/devotional-forever-loved.html', title: 'Forever Loved', desc: 'The branches that remain are held by the root — not by themselves.' }
  ],
  'demolition-ezekiel18-23': [
    { href: '/question-why-does-god-choose-some-not-others.html', title: 'Why Does God Choose Some and Not Others?', desc: 'The hardest question. The most honest answer.' },
    { href: '/devotional-the-god-who-wastes-nothing.html', title: 'The God Who Wastes Nothing', desc: 'His desire for none to perish does not conflict with His sovereignty — it fulfills it.' }
  ],
  'demolition-faith-is-not-a-gift': [
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'The full exegetical case from Ephesians 2:8-9.' },
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The question that ends the debate.' }
  ],
  'demolition-hebrews2-9': [
    { href: '/systematic-atonement.html', title: 'What the Cross Actually Accomplished', desc: 'He tasted death for everyone — but who is "everyone"?' },
    { href: '/devotional-in-christ.html', title: 'In Christ', desc: 'To be "in Christ" means His death was yours. His life is yours.' }
  ],
  'demolition-hebrews6-4-6': [
    { href: '/question-perseverance.html', title: 'Can You Lose Your Salvation?', desc: 'The passage everyone uses to say yes. Here\'s what it actually says.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'If this passage terrifies you — that fear is evidence you\'re still His.' }
  ],
  'demolition-john12-32': [
    { href: '/demolition-john3-16.html', title: 'John 3:16 — What It Actually Says', desc: '"All men" in John 12 meets "the world" in John 3. The pattern is the same.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'When Christ draws you, the chains don\'t just loosen — they shatter.' }
  ],
  'demolition-joshua24-15': [
    { href: '/question-freewill.html', title: 'Does the Bible Teach Free Will?', desc: 'Joshua said "choose." Does that mean you can?' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'The deepest freedom isn\'t choosing God. It\'s God choosing you.' }
  ],
  'demolition-matthew-23-37': [
    { href: '/demolition-matt23-37.html', title: 'Jerusalem, Jerusalem — The Full Argument', desc: 'The extended treatment of this devastating passage.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'He wept over Jerusalem. He did not let His elect go.' }
  ],
  'demolition-matt23-37': [
    { href: '/question-irresistible.html', title: 'Is Grace Really Irresistible?', desc: 'Jerusalem refused. The elect within her could not.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'The lament is real. The love is older than the rebellion.' }
  ],
  'demolition-philippians2-12-13': [
    { href: '/systematic-soteriology.html', title: 'The Full Doctrine of Salvation', desc: '"Work out" because God "works in." The whole chain explained.' },
    { href: '/devotional-good-i-cannot-do.html', title: 'The Good I Cannot Do', desc: 'The tension between our effort and His power — resolved in grace.' }
  ],
  'demolition-prevenient-grace': [
    { href: '/compare-calvinism-arminianism.html', title: 'Calvinism vs. Arminianism', desc: 'Prevenient grace is the keystone of Arminianism. Remove it and the system collapses.' },
    { href: '/systematic-pneumatology.html', title: 'The Holy Spirit\'s Work', desc: 'What the Spirit actually does — not merely enables, but accomplishes.' }
  ],
  'demolition-rev3-20': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'The door has no handle on the outside. But He opens it from within.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'He didn\'t wait for your invitation. He came anyway.' }
  ],
  'demolition-romans10-9': [
    { href: '/question-is-salvation-my-choice-or-gods.html', title: 'Is Salvation My Choice or God\'s?', desc: '"Confess and believe" — but where does the belief come from?' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'You confessed because He gave you the lips to confess.' }
  ],
  'demolition-steel-man-arminianism': [
    { href: '/compare-calvinism-arminianism.html', title: 'The Full Comparison', desc: 'The steelmanned version still fails. Here\'s the side-by-side proof.' },
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'Even the strongest version of Arminianism cannot answer this question.' }
  ],
  'demolition-titus2-11': [
    { href: '/systematic-election.html', title: 'The Doctrine of Election', desc: 'Grace appeared to all — but it teaches godliness to those who are His.' },
    { href: '/devotional-glory-of-divine-choice.html', title: 'The Glory of Divine Choice', desc: 'That grace appeared at all is the miracle. That it appeared to YOU is election.' }
  ],
  'demolition-orthodox-predestination': [
    { href: '/history-augustine-pelagius.html', title: 'Augustine vs. Pelagius', desc: 'The original predestination debate — 1,600 years ago.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'East and West may differ, but the love precedes them both.' }
  ],

  // ─── DEVOTIONAL PAGES ───
  // Pattern: related comfort + one challenge/question
  'devotional-glory-of-divine-choice': [
    { href: '/systematic-election.html', title: 'Election — The Full Doctrine', desc: 'The theological foundation beneath this devotional.' },
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'The question that leads to the rest this devotional offers.' }
  ],
  'devotional-i-cant-feel-god': [
    { href: '/shattered-lens-silence-of-god.html', title: 'When God Goes Silent', desc: 'The silence doesn\'t mean He left. It means He\'s working beneath what you can feel.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Feeling held and being held are not the same thing.' }
  ],
  'devotional-i-dont-think-im-saved': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'The fact that you\'re asking is evidence He did.' },
    { href: '/pastoral-assurance.html', title: 'Assurance of Salvation', desc: 'When doubt won\'t leave, here is where to stand.' }
  ],
  'devotional-the-god-who-wastes-nothing': [
    { href: '/ot-joseph.html', title: 'Joseph — Sovereignty in Suffering', desc: 'The man who lived this truth in real time.' },
    { href: '/open-wound-senseless-death.html', title: 'When Death Makes No Sense', desc: 'For the pain that feels wasted — it isn\'t.' }
  ],
  'devotional-the-hands-that-hold-you': [
    { href: '/question-goldchain.html', title: 'The Golden Chain of Salvation', desc: 'The theological chain those hands will never release.' },
    { href: '/broken-mirror-performance-treadmill.html', title: 'The Performance Treadmill', desc: 'You can step off. The hands hold you whether you perform or not.' }
  ],
  'devotional-the-prayer-you-didnt-pray': [
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'If your faith was a gift, so was the prayer.' },
    { href: '/psychology-sincerity-trap.html', title: 'The Sincerity Trap', desc: 'Why sincere prayers can still be self-trust in disguise.' }
  ],
  'devotional-the-secretly-ashamed': [
    { href: '/broken-mirror-sin-you-repeat.html', title: 'The Sin You Keep Repeating', desc: 'You are not alone. And the shame is not the final word.' },
    { href: '/devotional-good-i-cannot-do.html', title: 'The Good I Cannot Do', desc: 'Paul understood this war. So does God.' }
  ],
  'devotional-valley-shadow': [
    { href: '/pastoral-suffering.html', title: 'Sovereignty and Suffering', desc: 'The theological truth that makes the valley bearable.' },
    { href: '/open-wound-hospital-room.html', title: 'In the Hospital Room', desc: 'When the valley isn\'t a metaphor.' }
  ],
  'devotional-when-god-says-no': [
    { href: '/devotional-the-god-who-wastes-nothing.html', title: 'The God Who Wastes Nothing', desc: 'His "no" is not rejection. It is redirection.' },
    { href: '/open-wound-the-prayer-god-didnt-answer.html', title: 'The Prayer God Didn\'t Answer', desc: 'What happens when silence follows your deepest cry.' }
  ],
  'devotional-adoption-papers': [
    { href: '/analogy-adoption.html', title: 'The Adoption Analogy', desc: 'You did not choose your family. Your Father chose you.' },
    { href: '/systematic-election.html', title: 'Election — The Full Doctrine', desc: 'The theology behind your adoption papers.' }
  ],

  // ─── PSYCHOLOGY PAGES ───
  // Pattern: deeper psychology + healing/devotional catch
  'psychology-autonomy-illusion': [
    { href: '/philosophy-infinite-regress-of-choice.html', title: 'The Infinite Regress of Choice', desc: 'The philosophical proof that autonomy is logically impossible.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'Losing autonomy isn\'t loss. It\'s freedom.' }
  ],
  'psychology-backfire-effect': [
    { href: '/psychology-cognitive-biases.html', title: 'Cognitive Biases and Depravity', desc: 'The backfire effect is just one of the biases that keep us blind.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'Grace doesn\'t debate your defenses. It bypasses them.' }
  ],
  'psychology-cognitive-biases': [
    { href: '/psychology-anosognosia-of-sin.html', title: 'The Anosognosia of Sin', desc: 'What happens when you can\'t even see your own blindness.' },
    { href: '/broken-mirror-imposter-syndrome.html', title: 'Imposter Syndrome and Grace', desc: 'Your brain lies about who you are. Grace tells the truth.' }
  ],
  'psychology-comfort-self-salvation': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The comfort collapses when you ask this question.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'Real comfort isn\'t "I chose God." It\'s "He chose me."' }
  ],
  'psychology-emotional-vs-rational': [
    { href: '/psychology-hostility-reaction.html', title: 'Why Grace Makes People Angry', desc: 'The emotional rejection has a neurological basis.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'When emotion and reason both fail, grace still holds.' }
  ],
  'psychology-fear-control': [
    { href: '/philosophy-sleep-surrender.html', title: 'The Sleep Argument', desc: 'You surrender control every night. Why not to God?' },
    { href: '/anxious-mind-never-meant-to-carry.html', title: 'You Were Never Meant to Carry This', desc: 'The weight you\'re afraid to put down was never yours to carry.' }
  ],
  'psychology-groupthink': [
    { href: '/psychology-system-justification.html', title: 'System Justification', desc: 'Why groups defend beliefs that hurt them.' },
    { href: '/invisible-wall-only-one-who-sees.html', title: 'When You\'re the Only One Who Sees', desc: 'Breaking free from the group doesn\'t mean you\'re wrong.' }
  ],
  'psychology-hostility-reaction': [
    { href: '/psychology-backfire-effect.html', title: 'The Backfire Effect', desc: 'The neuroscience behind the anger.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'The love you\'re raging against was set on you before you could rage.' }
  ],
  'psychology-identity-threat': [
    { href: '/psychology-terror-management.html', title: 'Terror Management Theory', desc: 'Why grace threatens the self at its deepest level.' },
    { href: '/broken-mirror-not-self-made.html', title: 'You Are Not Self-Made', desc: 'The identity that feels threatened was never really yours.' }
  ],
  'psychology-illusion-free-will': [
    { href: '/question-freewill.html', title: 'Does the Bible Teach Free Will?', desc: 'The biblical case matches the psychological evidence.' },
    { href: '/philosophy-phantom-limb-free-will.html', title: 'The Phantom Limb of Free Will', desc: 'You feel it. It isn\'t there.' }
  ],
  'psychology-language-acquisition': [
    { href: '/philosophy-mother-tongue.html', title: 'Grace as Mother Tongue', desc: 'You didn\'t choose your first language. You didn\'t choose your faith.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'The words you speak to God were given to you before you spoke them.' }
  ],
  'psychology-offense-of-grace': [
    { href: '/psychology-pride-root-objection.html', title: 'Pride: The Root of Every Objection', desc: 'The offense isn\'t intellectual. It\'s pride.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'The offense of grace melts when you see what it means for you.' }
  ],
  'psychology-reactance-theory': [
    { href: '/psychology-fear-control.html', title: 'The Fear of Losing Control', desc: 'Reactance is the surface. Fear is the root.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'The loss of control you\'re resisting is actually the door to freedom.' }
  ],
  'psychology-sincerity-trap': [
    { href: '/question-are-arminians-saved.html', title: 'Are Arminians Saved?', desc: 'Sincerity matters. But sincerity about the wrong thing is still wrong.' },
    { href: '/devotional-the-secretly-ashamed.html', title: 'The Secretly Ashamed', desc: 'When sincerity becomes a performance — grace meets you there too.' }
  ],
  'psychology-stockholm-syndrome-sin': [
    { href: '/systematic-hamartiology.html', title: 'The Doctrine of Sin', desc: 'Why we love our captor — the full theology of bondage.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'You loved your chains. Grace broke them anyway.' }
  ],
  'psychology-sunk-cost-faith': [
    { href: '/psychology-sincerity-trap.html', title: 'The Sincerity Trap', desc: 'Sunk cost and sincerity work together to keep you stuck.' },
    { href: '/shattered-lens-taught-wrong.html', title: 'When You Were Taught Wrong', desc: 'Forty years of investment doesn\'t make the investment right.' }
  ],
  'psychology-suppressing-truth': [
    { href: '/systematic-hamartiology.html', title: 'The Doctrine of Sin', desc: 'Romans 1 says we suppress truth. Hamartiology explains why.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You suppressed the truth. Grace broke through anyway.' }
  ],
  'psychology-system-justification': [
    { href: '/psychology-groupthink.html', title: 'Groupthink and Grace', desc: 'Systems protect themselves. So do theological traditions.' },
    { href: '/invisible-wall-singing-alone.html', title: 'Singing Alone', desc: 'When the system justifies itself and you can\'t join the chorus anymore.' }
  ],
  'psychology-terror-management': [
    { href: '/psychology-identity-threat.html', title: 'Identity Threat', desc: 'Grace threatens the self. Terror management explains why.' },
    { href: '/devotional-forever-loved.html', title: 'Forever Loved', desc: 'The terror dissolves when you see you are eternally held.' }
  ],
  'psychology-why-this-objection-proves-our-point': [
    { href: '/psychology-cost-of-rejecting-grace.html', title: 'The Cost of Rejecting Grace', desc: 'The objection proves the point. Here is what it costs.' },
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The question that makes the objection dissolve.' }
  ],
  'psychology-why-we-resist': [
    { href: '/psychology-pride-root-objection.html', title: 'Pride: The Root of Every Objection', desc: 'The deepest reason we resist grace.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You resist. He holds. The hands never let go.' }
  ],
  'psychology-addiction-proof': [
    { href: '/systematic-hamartiology.html', title: 'The Doctrine of Sin', desc: 'Addiction proves what theology already taught: we are in bondage.' },
    { href: '/broken-mirror-the-relapse.html', title: 'The Relapse', desc: 'When the cycle proves you can\'t save yourself — grace is waiting.' }
  ],
  'psychology-attribution-error': [
    { href: '/psychology-pride-root-objection.html', title: 'Pride: The Root of Every Objection', desc: 'Attribution error is pride wearing a lab coat.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'When you stop attributing salvation to yourself, joy arrives.' }
  ],
  'psychology-pride-root-objection': [
    { href: '/question-boasting.html', title: 'Why Can\'t We Boast?', desc: 'Pride is the root. Boasting is the fruit.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Pride collapses when you see how chosen you are despite yourself.' }
  ],
  'psychology-cost-of-rejecting-grace': [
    { href: '/question-are-arminians-saved.html', title: 'Are Arminians Saved?', desc: 'The cost of rejecting grace raises an unavoidable question.' },
    { href: '/devotional-forever-loved.html', title: 'Forever Loved', desc: 'The cost is high. But grace pays it anyway.' }
  ],

  // ─── ANXIOUS MIND PAGES ───
  'anxious-mind-brain-decides': [
    { href: '/psychology-illusion-free-will.html', title: 'The Illusion of Free Will', desc: 'Your brain decides before "you" do. The science is devastating.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'If your brain is beyond your control, how much more your salvation?' }
  ],
  'anxious-mind-intrusive-thoughts': [
    { href: '/anxious-mind-scrupulosity.html', title: 'Scrupulosity and Grace', desc: 'When the intrusive thoughts are about God — and you can\'t make them stop.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'Your thoughts assault you. His love doesn\'t waver.' }
  ],
  'anxious-mind-never-meant-to-carry': [
    { href: '/philosophy-sleep-surrender.html', title: 'The Sleep Argument', desc: 'You surrender the weight every night. Why not during the day?' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'The weight you were never meant to carry — He carries it.' }
  ],
  'anxious-mind-scrupulosity': [
    { href: '/devotional-i-dont-think-im-saved.html', title: 'I Don\'t Think I\'m Saved', desc: 'Scrupulosity whispers you\'re not enough. Grace says you never had to be.' },
    { href: '/pastoral-assurance.html', title: 'Assurance of Salvation', desc: 'The antidote to scrupulosity is not more effort. It\'s assurance.' }
  ],
  'anxious-mind-sovereignty-of-sleep': [
    { href: '/philosophy-sleep-surrender.html', title: 'The Sleep Argument', desc: 'The philosophical extension of what sleep proves about sovereignty.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You sleep because you are held. Not the other way around.' }
  ],
  'anxious-mind-the-loop-that-wont-break': [
    { href: '/broken-mirror-sin-you-repeat.html', title: 'The Sin You Keep Repeating', desc: 'The loop isn\'t just anxiety. It\'s the condition grace meets you in.' },
    { href: '/devotional-good-i-cannot-do.html', title: 'The Good I Cannot Do', desc: 'Paul knew the loop. God broke it — not Paul.' }
  ],
  'anxious-mind-what-if-not-chosen': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'The question burning in your chest at 3am — answered.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'The fact that you\'re asking proves you were.' }
  ],

  // ─── BROKEN MIRROR PAGES ───
  'broken-mirror-grace-too-good': [
    { href: '/devotional-adoption-papers.html', title: 'The Adoption Papers', desc: 'Grace isn\'t too good to be true. It\'s too good to be earned.' },
    { href: '/question-boasting.html', title: 'Why Can\'t We Boast?', desc: 'If it feels too good, it\'s because you didn\'t earn it.' }
  ],
  'broken-mirror-imposter-syndrome': [
    { href: '/devotional-in-christ.html', title: 'In Christ', desc: 'You are not an imposter. You are in Christ.' },
    { href: '/broken-mirror-performance-treadmill.html', title: 'The Performance Treadmill', desc: 'Imposter syndrome and performance are two sides of the same coin.' }
  ],
  'broken-mirror-not-self-made': [
    { href: '/psychology-attribution-error.html', title: 'Attribution Error', desc: 'The science behind the "self-made" illusion.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You are not self-made. You are God-made.' }
  ],
  'broken-mirror-performance-treadmill': [
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Step off the treadmill. The hands hold you whether you perform or not.' },
    { href: '/systematic-justification.html', title: 'Justification', desc: 'The legal reality that makes the treadmill unnecessary.' }
  ],
  'broken-mirror-sin-you-repeat': [
    { href: '/devotional-good-i-cannot-do.html', title: 'The Good I Cannot Do', desc: 'Paul knew this war. You are not alone in it.' },
    { href: '/systematic-regeneration.html', title: 'Regeneration', desc: 'The new nature is real even when the old one still fights.' }
  ],
  'broken-mirror-the-relapse': [
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'You relapsed. He didn\'t.' },
    { href: '/pastoral-assurance.html', title: 'Assurance of Salvation', desc: 'The relapse doesn\'t disprove your salvation. Here\'s why.' }
  ],
  'broken-mirror-vessels-for-mercy': [
    { href: '/question-romans9.html', title: 'Romans 9 Explained', desc: 'The passage that calls you a vessel — and means it as love.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'A vessel for mercy was always the plan.' }
  ],

  // ─── INVISIBLE WALL PAGES ───
  'invisible-wall-family': [
    { href: '/invisible-wall-lonely-theological.html', title: 'The Loneliness of Seeing What Others Don\'t', desc: 'When your family doesn\'t see it — you\'re not crazy.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'He pursues your family too. In His timing.' }
  ],
  'invisible-wall-friend-who-left': [
    { href: '/invisible-wall-singing-alone.html', title: 'Singing Alone', desc: 'When the friend leaves, the worship feels hollow. But it isn\'t.' },
    { href: '/devotional-forever-loved.html', title: 'Forever Loved', desc: 'People leave. He doesn\'t.' }
  ],
  'invisible-wall-lonely-theological': [
    { href: '/shattered-lens-cant-unsee-it.html', title: 'When You Can\'t Unsee It', desc: 'The loneliness comes from seeing what others haven\'t yet.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You are not alone even when you feel alone.' }
  ],
  'invisible-wall-marriage': [
    { href: '/philosophy-marriage-election.html', title: 'Marriage as Election Analogy', desc: 'Your marriage might be the best picture of election you\'ll ever see.' },
    { href: '/invisible-wall-family.html', title: 'When Your Family Doesn\'t See It', desc: 'When the wall runs through your home.' }
  ],
  'invisible-wall-only-one-who-sees': [
    { href: '/psychology-groupthink.html', title: 'Groupthink and Grace', desc: 'The group sees differently. That doesn\'t make you wrong.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Being the only one who sees is part of being chosen.' }
  ],
  'invisible-wall-singing-alone': [
    { href: '/devotional-cold-church.html', title: 'The Cold Church', desc: 'When the worship is real but the church around you is not.' },
    { href: '/invisible-wall-only-one-who-sees.html', title: 'When You\'re the Only One Who Sees', desc: 'You sing alone because you see what they don\'t yet.' }
  ],

  // ─── OPEN WOUND PAGES ───
  'open-wound-betrayed-by-church': [
    { href: '/devotional-cold-church.html', title: 'The Cold Church', desc: 'When the church that hurt you is the church you still love.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'The church betrayed you. God didn\'t.' }
  ],
  'open-wound-empty-nursery': [
    { href: '/open-wound-miscarriage.html', title: 'Miscarriage and Sovereignty', desc: 'For the wound that has no words — only silence and sovereignty.' },
    { href: '/devotional-the-god-who-wastes-nothing.html', title: 'The God Who Wastes Nothing', desc: 'Even this. Even here. He wastes nothing.' }
  ],
  'open-wound-hospital-room': [
    { href: '/pastoral-suffering.html', title: 'Sovereignty and Suffering', desc: 'The theology that holds when the monitors beep.' },
    { href: '/devotional-valley-shadow.html', title: 'The Valley of the Shadow', desc: 'He walks through it with you. He always has.' }
  ],
  'open-wound-miscarriage': [
    { href: '/open-wound-empty-nursery.html', title: 'The Empty Nursery', desc: 'The room that should have been full.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'He holds what you cannot hold anymore.' }
  ],
  'open-wound-senseless-death': [
    { href: '/ot-job.html', title: 'Job — When God Doesn\'t Explain', desc: 'The oldest question in the world, answered not with reason but with presence.' },
    { href: '/devotional-the-god-who-wastes-nothing.html', title: 'The God Who Wastes Nothing', desc: 'It feels senseless. He is not.' }
  ],
  'open-wound-sovereignty-in-grief': [
    { href: '/pastoral-suffering.html', title: 'Sovereignty and Suffering', desc: 'The full pastoral treatment of what you\'re living through.' },
    { href: '/devotional-valley-shadow.html', title: 'The Valley of the Shadow', desc: 'Grief is a valley. He is in it with you.' }
  ],
  'open-wound-terminal-diagnosis': [
    { href: '/devotional-valley-shadow.html', title: 'The Valley of the Shadow', desc: 'You are walking through it. Not to it. Through.' },
    { href: '/question-goldchain.html', title: 'The Golden Chain of Salvation', desc: 'The chain holds to the end. And beyond.' }
  ],
  'open-wound-the-prayer-god-didnt-answer': [
    { href: '/devotional-when-god-says-no.html', title: 'When God Says No', desc: 'The silence is not absence. It is sovereignty.' },
    { href: '/devotional-the-god-who-wastes-nothing.html', title: 'The God Who Wastes Nothing', desc: 'Even unanswered prayers serve His purpose.' }
  ],

  // ─── SHATTERED LENS PAGES ───
  'shattered-lens-cant-tell-true': [
    { href: '/psychology-anosognosia-of-sin.html', title: 'The Anosognosia of Sin', desc: 'When you can\'t tell true from false — that IS the condition.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You couldn\'t tell. He could. He came anyway.' }
  ],
  'shattered-lens-cant-unsee-it': [
    { href: '/invisible-wall-lonely-theological.html', title: 'The Loneliness of Seeing', desc: 'When you can\'t unsee it and no one else sees it yet.' },
    { href: '/devotional-glory-of-divine-choice.html', title: 'The Glory of Divine Choice', desc: 'What you now see is glorious. Rest in it.' }
  ],
  'shattered-lens-pastor': [
    { href: '/shattered-lens-taught-wrong.html', title: 'When You Were Taught Wrong', desc: 'The pastor who shattered your lens may have been taught wrong too.' },
    { href: '/devotional-cold-church.html', title: 'The Cold Church', desc: 'When the shepherd wounds the sheep.' }
  ],
  'shattered-lens-silence-of-god': [
    { href: '/devotional-i-cant-feel-god.html', title: 'I Can\'t Feel God', desc: 'When silence feels like absence — but it isn\'t.' },
    { href: '/ot-job.html', title: 'Job — When God Doesn\'t Explain', desc: 'God was silent to Job too. Then He spoke.' }
  ],
  'shattered-lens-taught-wrong': [
    { href: '/history-decision-theology.html', title: 'The Invention of Decision Theology', desc: 'What you were taught was invented. Here\'s when and by whom.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Being taught wrong doesn\'t mean you were unchosen.' }
  ],
  'shattered-lens-when-prayer-stopped-working': [
    { href: '/open-wound-the-prayer-god-didnt-answer.html', title: 'The Prayer God Didn\'t Answer', desc: 'When prayer stops working — it hasn\'t. Not the way you think.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'When prayer stops, the hands don\'t.' }
  ],

  // ─── PHILOSOPHY PAGES ───
  'philosophy-bootstrap-paradox': [
    { href: '/philosophy-infinite-regress-of-choice.html', title: 'The Infinite Regress of Choice', desc: 'Bootstrap meets regress: two proofs of the same impossibility.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You cannot bootstrap yourself. Someone had to reach in.' }
  ],
  'philosophy-copernican-revolution': [
    { href: '/philosophy-gravity-of-grace.html', title: 'The Gravity of Grace', desc: 'The revolution isn\'t just about the center. It\'s about the force.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'When you stop being the center, everything falls into place.' }
  ],
  'philosophy-exclusive-love': [
    { href: '/question-does-god-love-everyone-equally.html', title: 'Does God Love Everyone Equally?', desc: 'Exclusive love in theology — answered from Scripture.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'Exclusive love means He chose YOU. Not vaguely. Specifically.' }
  ],
  'philosophy-godel-incompleteness': [
    { href: '/philosophy-munchhausen-trilemma.html', title: 'The Münchhausen Trilemma', desc: 'Gödel proved systems can\'t validate themselves. Münchhausen proves the same from another angle.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You cannot complete yourself. The proof comes from outside.' }
  ],
  'philosophy-gravity-of-grace': [
    { href: '/philosophy-copernican-revolution.html', title: 'The Copernican Revolution of Grace', desc: 'Gravity only makes sense when you know what the center is.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'You didn\'t fall toward God. You were drawn by a force older than the universe.' }
  ],
  'philosophy-immune-system-grace': [
    { href: '/psychology-backfire-effect.html', title: 'The Backfire Effect', desc: 'Your immune system rejects grace. Psychology explains the mechanism.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'Grace doesn\'t ask your immune system for permission.' }
  ],
  'philosophy-infinite-regress-of-choice': [
    { href: '/philosophy-bootstrap-paradox.html', title: 'The Bootstrap Paradox', desc: 'Two impossibilities, one conclusion: choice cannot ground itself.' },
    { href: '/question-freewill.html', title: 'Does the Bible Teach Free Will?', desc: 'Philosophy and Scripture agree: the regress has no bottom.' }
  ],
  'philosophy-marriage-election': [
    { href: '/systematic-election.html', title: 'Election — The Full Doctrine', desc: 'The theology that the marriage analogy makes visible.' },
    { href: '/devotional-love-letter-before-time.html', title: 'A Love Letter Before Time', desc: 'He chose you the way a spouse chooses — before you were ready.' }
  ],
  'philosophy-mirror-you-refuse': [
    { href: '/psychology-suppressing-truth.html', title: 'Suppressing the Truth', desc: 'The mirror you refuse to look in — Romans 1 explains why.' },
    { href: '/shattered-lens-cant-tell-true.html', title: 'When You Can\'t Tell True from False', desc: 'Refusing the mirror is its own kind of blindness.' }
  ],
  'philosophy-mother-tongue': [
    { href: '/psychology-language-acquisition.html', title: 'Language Acquisition and Faith', desc: 'The psychology behind the analogy: you didn\'t choose your mother tongue.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'Grace is the language you were born into — before you could speak.' }
  ],
  'philosophy-munchhausen-trilemma': [
    { href: '/philosophy-godel-incompleteness.html', title: 'Gödel\'s Incompleteness', desc: 'The mathematical proof of what the trilemma proves philosophically.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Every chain of justification ends. Grace doesn\'t.' }
  ],
  'philosophy-observer-effect-sin': [
    { href: '/psychology-anosognosia-of-sin.html', title: 'The Anosognosia of Sin', desc: 'You cannot observe your own sin clearly. The lens is corrupted.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'If observation changes reality, grace changes the observer.' }
  ],
  'philosophy-phantom-limb-free-will': [
    { href: '/psychology-illusion-free-will.html', title: 'The Illusion of Free Will', desc: 'The feeling is real. The limb isn\'t.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'The phantom limb of free will hides the real freedom: being held.' }
  ],
  'philosophy-prisoners-dilemma': [
    { href: '/systematic-hamartiology.html', title: 'The Doctrine of Sin', desc: 'Game theory proves what theology already knew: the structure guarantees defection.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'The covenant that restructured the impossible game.' }
  ],
  'philosophy-problem-of-merit': [
    { href: '/question-boasting.html', title: 'Why Can\'t We Boast?', desc: 'If merit is impossible, boasting is absurd.' },
    { href: '/devotional-adoption-papers.html', title: 'The Adoption Papers', desc: 'Not merit. Gift. The papers were signed before you existed.' }
  ],
  'philosophy-resistance-is-proof': [
    { href: '/psychology-hostility-reaction.html', title: 'Why Grace Makes People Angry', desc: 'The resistance you feel IS the proof — psychology explains the mechanism.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Your resistance was foreseen. He chose you anyway.' }
  ],
  'philosophy-self-deception': [
    { href: '/psychology-anosognosia-of-sin.html', title: 'The Anosognosia of Sin', desc: 'Self-deception has a clinical name. It\'s a feature of the fall.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You deceived yourself. He saw through it and came anyway.' }
  ],
  'philosophy-sleep-surrender': [
    { href: '/anxious-mind-sovereignty-of-sleep.html', title: 'The Sovereignty of Sleep', desc: 'The anxious mind version of the same argument.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You surrender every night. The hands hold you through it.' }
  ],
  'philosophy-theater-script': [
    { href: '/systematic-divine-decrees.html', title: 'The Divine Decrees', desc: 'The script was written before the stage was built.' },
    { href: '/devotional-love-letter-before-time.html', title: 'A Love Letter Before Time', desc: 'Your part in the script was a love letter, not a sentence.' }
  ],

  // ─── STORY PAGES ───
  'story-children-the-king-who-chose': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'The King chose. The story is yours.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'He chose before the story began.' }
  ],
  'story-dark-the-altar-he-built-himself': [
    { href: '/question-boasting.html', title: 'Why Can\'t We Boast?', desc: 'An altar you built yourself is boasting in stone.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'The altar you built was never what saved you.' }
  ],
  'story-dark-the-woman-who-earned-her-seat': [
    { href: '/systematic-justification.html', title: 'Justification', desc: 'You cannot earn a seat at this table. It was set for you.' },
    { href: '/broken-mirror-performance-treadmill.html', title: 'The Performance Treadmill', desc: 'She earned. And earned. And the treadmill never stopped.' }
  ],
  'story-historical-augustine-pears': [
    { href: '/theologian-augustine.html', title: 'Augustine — The Rebel God Hunted Down', desc: 'The full biography of the man who stole the pears.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'Augustine\'s chains fell in a garden. So can yours.' }
  ],
  'story-historical-luther-storm': [
    { href: '/theologian-luther.html', title: 'Martin Luther — The Monk Who Broke the Church', desc: 'The full biography of the man in the storm.' },
    { href: '/history-luther.html', title: 'The Reformation', desc: 'The storm that changed the world.' }
  ],
  'story-humor-committee-to-save-yourself': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The committee failed. The question remains.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'No committee required. He came without one.' }
  ],
  'story-humor-the-man-who-sued-god': [
    { href: '/question-unfair.html', title: 'Is Predestination Fair?', desc: 'The lawsuit is the objection in narrative form.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'You can drop the lawsuit. What you find is better.' }
  ],
  'story-surgeon-stone-heart': [
    { href: '/systematic-regeneration.html', title: 'Regeneration', desc: 'The stone heart replaced — the doctrine this story illustrates.' },
    { href: '/question-newheart.html', title: 'The New Heart', desc: 'Ezekiel promised it. The Surgeon delivers it.' }
  ],
  'story-tender-the-gardener-who-waited': [
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'The Gardener waited. He always does.' },
    { href: '/question-irresistible.html', title: 'Is Grace Really Irresistible?', desc: 'The garden grew — not because it chose to, but because He tended it.' }
  ],
  'story-the-dead-city': [
    { href: '/question-depravity.html', title: 'Total Depravity Explained', desc: 'The dead city is the doctrine made visible.' },
    { href: '/devotional-dead-who-live.html', title: 'The Dead Who Live', desc: 'The city was dead. Then the Voice spoke.' }
  ],
  'story-the-fish-who-chose-the-ocean': [
    { href: '/psychology-autonomy-illusion.html', title: 'The Autonomy Illusion', desc: 'The fish thought it chose the ocean. The illusion runs deeper than you think.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'The ocean was there before the fish. So was His love.' }
  ],
  'story-the-garden-that-grew-itself': [
    { href: '/systematic-regeneration.html', title: 'Regeneration', desc: 'No garden grows itself. No soul regenerates itself.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'The garden didn\'t plant itself. Neither did your faith.' }
  ],
  'story-the-kings-banquet': [
    { href: '/systematic-election.html', title: 'Election — The Full Doctrine', desc: 'The King\'s guest list was set before the feast was prepared.' },
    { href: '/devotional-glory-of-divine-choice.html', title: 'The Glory of Divine Choice', desc: 'You were invited. Not because you earned a seat.' }
  ],
  'story-the-letter-before-the-world': [
    { href: '/devotional-love-letter-before-time.html', title: 'A Love Letter Before Time', desc: 'The letter and the devotional — two expressions of the same love.' },
    { href: '/systematic-divine-decrees.html', title: 'The Divine Decrees', desc: 'The letter was written before the world existed. The decree explains how.' }
  ],
  'story-the-orphanage': [
    { href: '/analogy-adoption.html', title: 'The Adoption Analogy', desc: 'You were in the orphanage. He came and signed the papers.' },
    { href: '/devotional-adoption-papers.html', title: 'The Adoption Papers', desc: 'The papers were signed in eternity. The orphanage was temporary.' }
  ],
  'story-the-person-who-chose-god': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The person who "chose God" — where did the choice come from?' },
    { href: '/philosophy-infinite-regress-of-choice.html', title: 'The Infinite Regress of Choice', desc: 'Trace the choice backward. You\'ll never find the bottom.' }
  ],
  'story-the-room-where-you-chose': [
    { href: '/question-is-salvation-my-choice-or-gods.html', title: 'Is Salvation My Choice or God\'s?', desc: 'The room had no door you could reach.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You didn\'t choose the room. He brought you there.' }
  ],
  'story-the-self-made-man': [
    { href: '/psychology-attribution-error.html', title: 'Attribution Error', desc: 'The self-made man is an attribution error in the flesh.' },
    { href: '/broken-mirror-not-self-made.html', title: 'You Are Not Self-Made', desc: 'The mirror shows someone who was made, not someone who made himself.' }
  ],
  'story-thought-the-day-you-chose-again': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'You chose again. But where did the choosing come from?' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'The day you "chose again" was the day He renewed you.' }
  ],
  'story-thought-the-god-who-let-you-watch': [
    { href: '/systematic-divine-decrees.html', title: 'The Divine Decrees', desc: 'He let you watch because He wrote the script.' },
    { href: '/devotional-the-god-who-wastes-nothing.html', title: 'The God Who Wastes Nothing', desc: 'Everything you watched had a purpose.' }
  ],

  // ─── ANALOGY PAGES ───
  'analogy-adoption': [
    { href: '/devotional-adoption-papers.html', title: 'The Adoption Papers', desc: 'The devotional that makes this analogy personal.' },
    { href: '/systematic-election.html', title: 'Election — The Full Doctrine', desc: 'Adoption is election in family language.' }
  ],
  'analogy-doctor-corpse': [
    { href: '/question-depravity.html', title: 'Total Depravity Explained', desc: 'The doctor sees a corpse. The doctrine explains why.' },
    { href: '/devotional-dead-who-live.html', title: 'The Dead Who Live', desc: 'The corpse doesn\'t stay dead. That\'s the whole point.' }
  ],
  'analogy-lazarus-grave': [
    { href: '/question-ezekiel37.html', title: 'Ezekiel 37 — The Valley of Dry Bones', desc: 'Lazarus was one man. Ezekiel saw an entire valley.' },
    { href: '/devotional-dead-who-live.html', title: 'The Dead Who Live', desc: 'He called Lazarus by name. He calls you by name.' }
  ],
  'analogy-orchestra': [
    { href: '/systematic-divine-decrees.html', title: 'The Divine Decrees', desc: 'The orchestra analogy shows what the decrees look like in motion.' },
    { href: '/devotional-love-letter-before-time.html', title: 'A Love Letter Before Time', desc: 'Your part was written before the symphony began.' }
  ],
  'analogy-river': [
    { href: '/philosophy-gravity-of-grace.html', title: 'The Gravity of Grace', desc: 'The river flows downhill. Grace flows toward you.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'You didn\'t swim upstream. The river carried you home.' }
  ],
  'analogy-song-you-didnt-compose': [
    { href: '/philosophy-mother-tongue.html', title: 'Grace as Mother Tongue', desc: 'You didn\'t compose the song. You didn\'t choose the language.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'The song and the prayer — both were given to you.' }
  ],
  'analogy-light-switch': [
    { href: '/systematic-regeneration.html', title: 'Regeneration', desc: 'The light switch was flipped for you. That\'s regeneration.' },
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'You didn\'t flip the switch. Someone else turned on the light.' }
  ],
  'analogy-drowning-man': [
    { href: '/question-depravity.html', title: 'Total Depravity Explained', desc: 'The drowning man can\'t save himself. The dead man can\'t even drown.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'The rescue didn\'t wait for your permission.' }
  ],

  // ─── COMPARE PAGES ───
  'compare-calvinism-catholic-soteriology': [
    { href: '/compare-calvinism-arminianism.html', title: 'Calvinism vs. Arminianism', desc: 'The Protestant comparison — how does it differ from the Catholic one?' },
    { href: '/systematic-justification.html', title: 'Justification', desc: 'The doctrine where Protestantism and Catholicism divide most sharply.' }
  ],
  'compare-calvinism-open-theism': [
    { href: '/systematic-theology-proper.html', title: 'The Doctrine of God', desc: 'Open theism redefines God. Here\'s who He actually is.' },
    { href: '/question-foreknowledge.html', title: 'Foreknowledge vs. Predestination', desc: 'Open theism denies both. Scripture affirms both.' }
  ],
  'compare-every-decision-point': [
    { href: '/compare-calvinism-arminianism.html', title: 'The Full Comparison', desc: 'Every decision point comes from this fundamental divide.' },
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'The decision point that determines all other decision points.' }
  ],
  'compare-grace-reformed-vs-arminian': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The question that separates the two views.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'The Reformed view of grace in its most personal form.' }
  ],
  'compare-predestination-foreknowledge': [
    { href: '/question-foreknowledge.html', title: 'Foreknowledge Explained', desc: 'The full treatment of the foreknowledge debate.' },
    { href: '/history-heresy-foreknowledge.html', title: 'The Foreknowledge Heresy', desc: 'How the foreknowledge view has been rejected throughout church history.' }
  ],

  // ─── QUESTION PAGES (that lack journey sections) ───
  'question-1john5-1': [
    { href: '/systematic-regeneration.html', title: 'Regeneration', desc: 'Being "born of God" comes before believing — not after.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'You were born of God before you prayed your first prayer.' }
  ],
  'question-bible-says-sick': [
    { href: '/question-depravity.html', title: 'Total Depravity Explained', desc: 'Scripture doesn\'t say sick. It says dead.' },
    { href: '/analogy-doctor-corpse.html', title: 'The Doctor and the Corpse', desc: 'The difference between sick and dead changes everything.' }
  ],
  'question-book-of-life': [
    { href: '/systematic-election.html', title: 'Election', desc: 'Names written before the foundation of the world.' },
    { href: '/devotional-love-letter-before-time.html', title: 'A Love Letter Before Time', desc: 'Your name was in the book before you drew breath.' }
  ],
  'question-cannot': [
    { href: '/systematic-hamartiology.html', title: 'The Doctrine of Sin', desc: '"Cannot" is the key word. Here\'s why we can\'t.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'You could not come. He came to you.' }
  ],
  'question-dead-bury-dead': [
    { href: '/question-depravity.html', title: 'Total Depravity Explained', desc: 'Jesus said let the dead bury the dead. He meant it.' },
    { href: '/devotional-dead-who-live.html', title: 'The Dead Who Live', desc: 'The dead who bury are not the dead who live.' }
  ],
  'question-does-god-choose-who-goes-to-heaven': [
    { href: '/systematic-election.html', title: 'Election', desc: 'The full doctrine behind the question.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'He chooses. And the choosing is good news.' }
  ],
  'question-faith-origin-test': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The essay version of what the test revealed.' },
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'The exegetical case for what the test is measuring.' }
  ],
  'question-how-grace-feels': [
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'This is how grace feels when it finally breaks through.' },
    { href: '/shattered-lens-cant-unsee-it.html', title: 'When You Can\'t Unsee It', desc: 'Grace doesn\'t just feel like something. It changes what you see.' }
  ],
  'question-is-predestination-in-the-bible': [
    { href: '/question-romans9.html', title: 'Romans 9 Explained', desc: 'The most explicit predestination passage in the Bible.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'Predestination isn\'t cold theology. It\'s love with a plan.' }
  ],
  'question-john17': [
    { href: '/systematic-atonement.html', title: 'The Atonement', desc: 'Jesus prays for those the Father gave Him. The atonement follows.' },
    { href: '/devotional-forever-loved.html', title: 'Forever Loved', desc: 'He prayed for you by name before the cross.' }
  ],
  'question-predestined-to-hell': [
    { href: '/question-unfair.html', title: 'Is Predestination Fair?', desc: 'The fairness question that this one always leads to.' },
    { href: '/question-why-does-god-choose-some-not-others.html', title: 'Why Some and Not Others?', desc: 'The hardest question in all of theology — answered honestly.' }
  ],
  'question-sovereignty-logic': [
    { href: '/philosophy-munchhausen-trilemma.html', title: 'The Münchhausen Trilemma', desc: 'The logical proof that sovereignty isn\'t just biblical — it\'s logically necessary.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'Sovereignty in logic leads to rest in life.' }
  ],
  'question-was-christ-a-robot': [
    { href: '/systematic-christology.html', title: 'Christology', desc: 'Christ was fully God and fully human. Neither a robot nor autonomous.' },
    { href: '/systematic-compatibilism.html', title: 'Compatibilism', desc: 'The answer to "robot or free" is: neither. Here\'s the third option.' }
  ],
  'question-where-does-your-no-come-from': [
    { href: '/psychology-hostility-reaction.html', title: 'Why Grace Makes People Angry', desc: 'The "no" has roots deeper than reason.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Your "no" was anticipated. His "yes" was older.' }
  ],
  'question-whose-side-are-you-on': [
    { href: '/question-are-arminians-saved.html', title: 'Are Arminians Saved?', desc: 'The question behind the question: whose side is the right side?' },
    { href: '/devotional-in-christ.html', title: 'In Christ', desc: 'There is only one side that matters — in Him.' }
  ],
  'question-why-does-god-choose-some-not-others': [
    { href: '/question-unfair.html', title: 'Is Predestination Fair?', desc: 'The companion question — and the companion answer.' },
    { href: '/devotional-glory-of-divine-choice.html', title: 'The Glory of Divine Choice', desc: 'The "why" leads to worship when you see the glory in it.' }
  ],
  'question-why-pray-if-god-is-sovereign': [
    { href: '/pastoral-prayer.html', title: 'Prayer and Sovereignty', desc: 'The pastoral answer to the philosophical question.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'Prayer isn\'t changing God\'s mind. It\'s joining His work.' }
  ],

  // ─── SECULAR EVIDENCE PAGES ───
  'secular-ai-determinism': [
    { href: '/secular-algorithm-sovereignty.html', title: 'The Algorithm of Sovereignty', desc: 'AI determinism in its theological form.' },
    { href: '/devotional-not-my-will-but-joy.html', title: 'Not My Will — But Joy', desc: 'If even machines reveal determinism, how much more our souls?' }
  ],
  'secular-billion-decisions': [
    { href: '/systematic-divine-decrees.html', title: 'The Divine Decrees', desc: 'A billion decisions, all decreed.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'Every decision was known. Every one was held.' }
  ],
  'secular-genetics-sovereignty': [
    { href: '/systematic-anthropology.html', title: 'Theological Anthropology', desc: 'Genetics reveals what theology already taught about human nature.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Your DNA was chosen. So were you.' }
  ],
  'secular-hard-problem-consciousness': [
    { href: '/philosophy-godel-incompleteness.html', title: 'Gödel\'s Incompleteness', desc: 'The hard problem and Gödel agree: the system can\'t explain itself.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Consciousness can\'t explain itself. But it can know it\'s held.' }
  ],
  'secular-sociology-human-inability': [
    { href: '/systematic-hamartiology.html', title: 'The Doctrine of Sin', desc: 'Sociology proves inability. Theology names it.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'Society can\'t save itself. Neither can you. He came anyway.' }
  ],

  // ─── HISTORY PAGES ───
  'history-augustine-pelagius': [
    { href: '/theologian-augustine.html', title: 'Augustine', desc: 'The full biography of the man who won the debate.' },
    { href: '/history-council-of-orange.html', title: 'The Council of Orange', desc: 'When the church officially settled the question Augustine raised.' }
  ],
  'history-council-of-orange': [
    { href: '/history-augustine-pelagius.html', title: 'Augustine vs. Pelagius', desc: 'The debate that led to this council.' },
    { href: '/history-heresy-free-will.html', title: 'The Free Will Heresy', desc: 'The council condemned it. But it kept coming back.' }
  ],
  'history-decision-theology': [
    { href: '/demolition-prevenient-grace.html', title: 'The Myth of Prevenient Grace', desc: 'Decision theology requires prevenient grace. Neither is biblical.' },
    { href: '/history-great-awakening.html', title: 'The Great Awakening', desc: 'What revival looked like before decision theology was invented.' }
  ],
  'history-golden-thread': [
    { href: '/history-timeline.html', title: 'The Full Timeline', desc: 'Follow the golden thread through 2,000 years of church history.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'The thread never broke because the God who holds it never lets go.' }
  ],
  'history-heresy-foreknowledge': [
    { href: '/question-foreknowledge.html', title: 'Foreknowledge Explained', desc: 'The heresy refuted — now see what Scripture actually teaches.' },
    { href: '/compare-predestination-foreknowledge.html', title: 'Predestination vs. Foreknowledge', desc: 'The comparison that settles the debate.' }
  ],
  'history-heresy-free-will': [
    { href: '/question-freewill.html', title: 'Does the Bible Teach Free Will?', desc: 'The heresy in scriptural context.' },
    { href: '/philosophy-phantom-limb-free-will.html', title: 'The Phantom Limb of Free Will', desc: 'You feel it. The church condemned it. It\'s not there.' }
  ],
  'history-korean-revival': [
    { href: '/history-great-awakening.html', title: 'The Great Awakening', desc: 'Another grace-driven revival — different continent, same theology.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'A century of war and persecution. The Korean church survived. Grace held.' }
  ],
  'history-spurgeon-downgrade': [
    { href: '/theologian-spurgeon.html', title: 'Spurgeon', desc: 'The man who fought the Downgrade and paid for it.' },
    { href: '/shattered-lens-pastor.html', title: 'When Your Pastor Gets It Wrong', desc: 'Spurgeon knew what it was like when the church drifts.' }
  ],

  // ─── THEOLOGIAN PAGES ───
  'theologian-anselm': [
    { href: '/systematic-atonement.html', title: 'The Atonement', desc: 'Anselm wrote Cur Deus Homo. The atonement doctrine he shaped.' },
    { href: '/theologian-augustine.html', title: 'Augustine', desc: 'Anselm stood on Augustine\'s shoulders.' }
  ],
  'theologian-boston': [
    { href: '/history-puritans.html', title: 'The Puritans', desc: 'Boston\'s world — the Puritans who shaped Scottish theology.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Boston fought legalism with grace. The hands hold you still.' }
  ],
  'theologian-bradwardine': [
    { href: '/history-medieval.html', title: 'Medieval Church History', desc: 'Bradwardine\'s era — when grace was nearly lost.' },
    { href: '/theologian-wycliffe.html', title: 'John Wycliffe', desc: 'Bradwardine\'s student who carried the torch forward.' }
  ],
  'theologian-bunyan': [
    { href: '/story-the-dead-city.html', title: 'The Dead City', desc: 'A modern parable in the tradition of Bunyan\'s Pilgrim.' },
    { href: '/devotional-my-chains-fell-away.html', title: 'My Chains Fell Away', desc: 'Bunyan\'s chains fell in Bedford Jail. So can yours.' }
  ],
  'theologian-gottschalk': [
    { href: '/history-medieval.html', title: 'Medieval Church History', desc: 'Gottschalk\'s imprisonment for teaching predestination — the cost of truth.' },
    { href: '/theologian-augustine.html', title: 'Augustine', desc: 'Gottschalk was teaching Augustine\'s theology. They punished him for it.' }
  ],
  'theologian-lloydjones': [
    { href: '/pastoral-assurance.html', title: 'Assurance of Salvation', desc: 'Lloyd-Jones on assurance — the pastoral heart behind the doctrine.' },
    { href: '/theologian-spurgeon.html', title: 'Spurgeon', desc: 'Two preachers, one century apart, one message: sovereign grace.' }
  ],
  'theologian-machen': [
    { href: '/history-20th-century.html', title: '20th Century Church History', desc: 'Machen\'s era — when liberalism threatened the church.' },
    { href: '/theologian-warfield.html', title: 'B.B. Warfield', desc: 'Machen\'s Princeton predecessor in defending the faith.' }
  ],
  'theologian-sproul': [
    { href: '/systematic-theology-proper.html', title: 'The Doctrine of God', desc: 'Sproul\'s passion: the holiness of God.' },
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'Sproul taught millions to ask this question — and find rest in the answer.' }
  ],
  'theologian-warfield': [
    { href: '/theologian-machen.html', title: 'J. Gresham Machen', desc: 'Warfield\'s student who carried his legacy forward.' },
    { href: '/systematic-bibliology.html', title: 'Bibliology', desc: 'Warfield\'s contribution: the doctrine of Scripture itself.' }
  ],
  'theologian-whitefield': [
    { href: '/history-great-awakening.html', title: 'The Great Awakening', desc: 'Whitefield\'s revival — sovereign grace on two continents.' },
    { href: '/history-whitefield-wesley.html', title: 'Whitefield vs. Wesley', desc: 'Friends who disagreed on everything that mattered most.' }
  ],
  'theologian-wycliffe': [
    { href: '/theologian-bradwardine.html', title: 'Thomas Bradwardine', desc: 'Wycliffe\'s teacher who revived Augustinian grace.' },
    { href: '/history-medieval.html', title: 'Medieval Church History', desc: 'The era Wycliffe tried to reform — 150 years before Luther.' }
  ],

  // ─── OT PAGES ───
  'ot-abel-cain': [
    { href: '/systematic-election.html', title: 'Election', desc: 'Abel and Cain — the first picture of election in Scripture.' },
    { href: '/ot-jacob-esau.html', title: 'Jacob and Esau', desc: 'The pattern repeats. God chooses. Man does not.' }
  ],
  'ot-jeremiah': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: '"Before I formed you in the womb I knew you." That\'s election.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'Known before formed. Loved before born.' }
  ],
  'ot-noah': [
    { href: '/ot-abraham.html', title: 'Abraham', desc: 'Noah found grace. Abraham was called by grace. The pattern continues.' },
    { href: '/systematic-covenant-theology.html', title: 'Covenant Theology', desc: 'Noah\'s covenant — the beginning of God\'s covenant faithfulness.' }
  ],
  'ot-prophets-remnant': [
    { href: '/systematic-election.html', title: 'Election', desc: 'The remnant IS the elect. Always has been.' },
    { href: '/history-golden-thread.html', title: 'The Golden Thread', desc: 'The remnant through history — the thread that never breaks.' }
  ],

  // ─── PASTORAL PAGES ───
  'pastoral-assurance': [
    { href: '/question-goldchain.html', title: 'The Golden Chain', desc: 'Assurance rests on the unbreakable chain of Romans 8:29-30.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'Assurance isn\'t a feeling. It\'s a fact about who holds you.' }
  ],
  'pastoral-evangelism': [
    { href: '/history-korean-revival.html', title: 'The Korean Revival', desc: 'Proof that sovereign grace and evangelistic fire are the same thing.' },
    { href: '/theologian-whitefield.html', title: 'George Whitefield', desc: 'The greatest evangelist in English-speaking history — a Calvinist.' }
  ],
  'pastoral-prayer': [
    { href: '/question-why-pray-if-god-is-sovereign.html', title: 'Why Pray If God Is Sovereign?', desc: 'The question your congregation is asking.' },
    { href: '/devotional-the-prayer-you-didnt-pray.html', title: 'The Prayer You Didn\'t Pray', desc: 'Prayer isn\'t changing God. It\'s joining Him.' }
  ],
  'pastoral-suffering': [
    { href: '/ot-job.html', title: 'Job', desc: 'The oldest sufferer. The deepest answer.' },
    { href: '/devotional-valley-shadow.html', title: 'The Valley of the Shadow', desc: 'When suffering is not a metaphor.' }
  ],

  // ─── FOR- LANDING PAGES ───
  'for-arminians': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The question that starts the journey.' },
    { href: '/compare-calvinism-arminianism.html', title: 'The Full Comparison', desc: 'Side by side. Point by point. Let Scripture decide.' }
  ],
  'for-deconstructed': [
    { href: '/philosophy-copernican-revolution.html', title: 'The Copernican Revolution of Grace', desc: 'Deconstruction might have been the beginning, not the end.' },
    { href: '/devotional-i-cant-feel-god.html', title: 'I Can\'t Feel God', desc: 'When deconstruction left you empty — He didn\'t leave.' }
  ],
  'for-hurting': [
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Start here. You are held.' },
    { href: '/devotional-valley-shadow.html', title: 'The Valley of the Shadow', desc: 'He walks through it with you.' }
  ],

  // ─── SYSTEMATIC PAGES (those without journey sections) ───
  'systematic-theology': [
    { href: '/systematic-prolegomena.html', title: 'Prolegomena — First Principles', desc: 'Start at the beginning: how do we know what we know about God?' },
    { href: '/systematic-theology-proper.html', title: 'The Doctrine of God', desc: 'Before salvation, before sin — there is God Himself.' }
  ],
};


// ═══════════════════════════════════════════════════════
// DEFAULT FALLBACK MAPPINGS BY CATEGORY PREFIX
// For pages not in JOURNEY_MAP, assign based on category
// ═══════════════════════════════════════════════════════

const CATEGORY_DEFAULTS = {
  'demolition': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The question that arrives after every demolition.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You\'ve been demolished. Now be held.' }
  ],
  'devotional': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'The question that leads to even deeper rest.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'More grace. More rest. More of Him.' }
  ],
  'psychology': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'Psychology explains the resistance. This question cuts through it.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Your psychology can\'t override His choice.' }
  ],
  'anxious-mind': [
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'The anxiety says you\'re alone. The hands say otherwise.' },
    { href: '/pastoral-assurance.html', title: 'Assurance of Salvation', desc: 'When anxiety lies about your salvation — here is the truth.' }
  ],
  'broken-mirror': [
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'The mirror is broken. But you were chosen before it shattered.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Even the broken are held.' }
  ],
  'open-wound': [
    { href: '/devotional-valley-shadow.html', title: 'The Valley of the Shadow', desc: 'He is in this valley with you.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'The wound is open. His faithfulness is not in question.' }
  ],
  'invisible-wall': [
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'The wall separates you from them. Not from Him.' },
    { href: '/shattered-lens-cant-unsee-it.html', title: 'When You Can\'t Unsee It', desc: 'The wall is real. What you see is also real.' }
  ],
  'shattered-lens': [
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'The lens shattered. But you were seen before it broke.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'When everything you believed falls apart — grace was waiting underneath.' }
  ],
  'philosophy': [
    { href: '/question-sovereignty-logic.html', title: 'Is Sovereignty Logically Necessary?', desc: 'The philosophical argument extends into theology.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Philosophy leads to a conclusion. Grace leads to rest.' }
  ],
  'question': [
    { href: '/systematic-election.html', title: 'Election — The Full Doctrine', desc: 'Questions lead to the doctrine that answers them all.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Every question about election leads here: you were chosen.' }
  ],
  'story': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The story points to the question. The question points to grace.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'Every story on this site ends the same way: He came for you.' }
  ],
  'analogy': [
    { href: '/question-depravity.html', title: 'Total Depravity Explained', desc: 'The analogy illustrates what the doctrine proves.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Every analogy points to the same truth: you are held.' }
  ],
  'compare': [
    { href: '/question-faithgift.html', title: 'Is Faith a Gift from God?', desc: 'The comparison resolves here: where does faith come from?' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'After comparing — rest in what\'s true.' }
  ],
  'history': [
    { href: '/history-golden-thread.html', title: 'The Golden Thread', desc: 'Every era connects. The thread runs through all of history.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'History proves it: He has never abandoned His people.' }
  ],
  'theologian': [
    { href: '/history-golden-thread.html', title: 'The Golden Thread', desc: 'This theologian is one link in a chain that spans 2,000 years.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'They wrote about the hands. The hands hold you still.' }
  ],
  'secular': [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The secular evidence points to the theological question.' },
    { href: '/devotional-rescued-without-a-say.html', title: 'Rescued Without a Say', desc: 'Science confirms what grace already knew: you couldn\'t save yourself.' }
  ],
  'ot': [
    { href: '/systematic-election.html', title: 'Election', desc: 'The Old Testament is the story of election before it had a name.' },
    { href: '/devotional-love-before-the-world.html', title: 'Love Before the World', desc: 'The love you see in the Old Testament was set before it began.' }
  ],
  'pastoral': [
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Pastoral wisdom leads to pastoral rest.' },
    { href: '/devotional-never-gives-up.html', title: 'The God Who Never Gives Up', desc: 'The God your pastor points you to never lets go.' }
  ],
  'systematic': [
    { href: '/question-chosen.html', title: 'Did God Choose Me?', desc: 'Theology answers the question the heart is asking.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'Doctrine without devotion is dead. Here is the devotion.' }
  ],
  'for': [
    { href: '/start-here.html', title: 'Start Here', desc: 'Not sure where to begin? Start here.' },
    { href: '/devotional-chosen-before-you-were-broken.html', title: 'Chosen Before You Were Broken', desc: 'Wherever you\'re coming from — you were chosen.' }
  ],
};


const JOURNEY_HTML_TEMPLATE = (cards) => {
  const cardHTML = cards.map((card, i) => `        <a href="${card.href}" class="hub-card">
            <div class="card-number">${String(i + 1).padStart(2, '0')}</div>
            <h4 class="card-title">${card.title}</h4>
            <p class="card-description">${card.desc}</p>
            <div class="card-footer">
                <span class="card-read">Read <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg></span>
            </div>
        </a>`).join('\n');

  return `
    <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
        <h3 style="color: var(--accent-gold); margin-bottom: 2rem;">Continue the Journey</h3>
        <div class="hub-grid">
${cardHTML}
        </div>
    </div>`;
};

function getCategory(filename) {
  const base = filename.replace('.html', '');
  // Try specific matches first
  for (const prefix of ['anxious-mind', 'broken-mirror', 'open-wound', 'invisible-wall', 'shattered-lens']) {
    if (base.startsWith(prefix)) return prefix;
  }
  // Then general prefix
  const firstPart = base.split('-')[0];
  return firstPart;
}

function getJourneyCards(filename) {
  const base = filename.replace('.html', '');

  // Check specific mapping first
  if (JOURNEY_MAP[base]) {
    return JOURNEY_MAP[base];
  }

  // Fall back to category defaults
  const category = getCategory(filename);
  if (CATEGORY_DEFAULTS[category]) {
    return CATEGORY_DEFAULTS[category];
  }

  // Ultimate fallback
  return [
    { href: '/question-where-did-your-faith-come-from.html', title: 'Where Did Your Faith Come From?', desc: 'The question that changes everything.' },
    { href: '/devotional-the-hands-that-hold-you.html', title: 'The Hands That Hold You', desc: 'You are held. That is the truth beneath every truth.' }
  ];
}

// ═══════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Skip hub pages, non-content pages, and pages that already have journey sections
const SKIP_PAGES = new Set([
  '_nav-template.html', '404.html', 'about.html', 'all-content.html', 'best-reads.html',
  'contact.html', 'donate.html', 'explore-map.html', 'index.html', 'privacy-policy.html',
  'search.html', 'start-here.html', 'verse-explorer.html', 'belief-assessment.html',
  'question-faith-origin-test.html', // interactive widget
  'analogies-illustrations.html', 'creeds-confessions.html', // redirects
  'questions.html', 'demolition-hub.html', 'psychology-hub.html', 'philosophy-hub.html',
  'stories.html', 'devotionals.html', 'secular-evidence.html', 'systematic-theology.html',
  'theologians.html', 'history-timeline.html', 'comparisons-hub.html', 'pastoral-hub.html',
  'essays.html', 'ot-hub.html', 'anxious-mind-hub.html', 'broken-mirror-hub.html',
  'invisible-wall-hub.html', 'open-wound-hub.html', 'shattered-lens-hub.html',
]);

let added = 0;
let skippedAlready = 0;
let skippedNonContent = 0;
let errors = [];

for (const file of files) {
  if (SKIP_PAGES.has(file)) {
    skippedNonContent++;
    continue;
  }

  const filepath = path.join(dir, file);
  let content;
  try {
    content = fs.readFileSync(filepath, 'utf8');
  } catch (e) {
    errors.push(`Could not read ${file}: ${e.message}`);
    continue;
  }

  // Skip if already has a journey section
  if (content.includes('Continue the Journey') || content.includes('Continue Your Journey') ||
      content.includes('What to Read Next') || content.includes('Where to Go Next') ||
      content.includes('Read Next')) {
    skippedAlready++;
    continue;
  }

  // Must have a footer to insert before
  if (!content.includes('<footer')) {
    errors.push(`${file}: No <footer> found — skipping`);
    continue;
  }

  // Get journey cards
  const cards = getJourneyCards(file);

  // Verify that linked pages exist
  const validCards = cards.filter(card => {
    const targetFile = card.href.replace('/', '').replace(/^\//, '');
    return fs.existsSync(path.join(dir, targetFile));
  });

  if (validCards.length === 0) {
    errors.push(`${file}: No valid link targets exist — skipping`);
    continue;
  }

  // Generate journey HTML
  const journeyHTML = JOURNEY_HTML_TEMPLATE(validCards);

  // Insert before the first <footer> tag
  // Look for </article> first, insert after it. Otherwise insert before <footer>
  let newContent;
  if (content.includes('</article>')) {
    newContent = content.replace('</article>', `</article>\n${journeyHTML}`);
  } else {
    // Insert before footer
    const footerIdx = content.indexOf('<footer');
    newContent = content.slice(0, footerIdx) + journeyHTML + '\n\n    ' + content.slice(footerIdx);
  }

  try {
    fs.writeFileSync(filepath, newContent, 'utf8');
    added++;
  } catch (e) {
    errors.push(`Could not write ${file}: ${e.message}`);
  }
}

console.log(`\n═══════════════════════════════════════`);
console.log(`CARTOGRAPHER JOURNEY SECTION RESULTS`);
console.log(`═══════════════════════════════════════`);
console.log(`Pages with journey sections ADDED: ${added}`);
console.log(`Pages already had journey sections: ${skippedAlready}`);
console.log(`Pages skipped (non-content/hub): ${skippedNonContent}`);
console.log(`Errors: ${errors.length}`);
if (errors.length > 0) {
  console.log(`\nERRORS:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
console.log(`\nTotal HTML files processed: ${files.length}`);
