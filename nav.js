/* ============================================================
   ADOPTED BY GRACE — Global Navigation JS v3
   Hamburger toggle, mega-menu, search overlay, mobile search,
   mobile category menu, scroll detection.
   Loaded on EVERY page via <script src="/nav.js"></script>
   ============================================================ */

(function () {
  'use strict';

  // === MEGA-MENU DATA ===
 var MEGA_MENU_DATA = [
 {
 umbrella: 'Start Here',
 icon: '',
 desc: 'Your guided journey into sovereign grace',
 href: '/start-here',
 subcategories: [
 {
 name: 'Start Here',
 icon: '',
 href: '/start-here',
 count: 7,
 pages: [
 { name: '470 Bible Verses That Prove God\'s Sovereignty in Salvation', href: '/scripture-tsunami', desc: 'Nearly 500 Bible verses on God\'s sovereignty in salvation — searchable, categorized, impossible to ignore. This is what' },
 { name: 'But What About Free Will and Fairness? — Phase 4', href: '/start-here-phase4', desc: 'Every objection matters. The deepest thinkers in church history discovered: objections don\'t weaken the case for sovere' },
 { name: 'Living as an Elect Child of God — Phase 5', href: '/start-here-phase5', desc: 'Phase 5: Living as an elect child of God — how sovereign grace transforms your assurance, prayer, worship, mission, and ' },
 { name: 'New to Sovereign Grace? Start Here.', href: '/start-here', desc: 'A guided journey into sovereign grace for the curious, skeptical, and seeking.' },
 { name: 'The Five Points of Grace — TULIP Explained', href: '/start-here-phase2', desc: 'The five points of grace — Total Depravity, Unconditional Election, Limited Atonement, Irresistible Grace, Perseverance ' },
 { name: 'What Does the Bible Actually Teach? — Phase 3', href: '/start-here-phase3', desc: 'Phase 3: What does the Bible actually teach about salvation? A passage-by-passage journey through Romans 9, Ephesians 1,' },
 { name: 'What Is Reformed Theology? — Phase 1', href: '/start-here-phase1', desc: 'Phase 1: An honest introduction to what Reformed Christians believe about God, salvation, and grace — and why this is th' }
 ]
 },
 {
 name: 'Doorways for You',
 icon: '',
 href: '/start-here',
 count: 9,
 pages: [
 { name: 'For Pastors: Preaching Sovereign Grace Without Splitting Your Church', href: '/for-pastors', desc: 'How to faithfully preach the doctrines of grace to your congregation. Practical guidance for pastors navigating election' },
 { name: 'For the One Who Can\'t Stop Doubting', href: '/for-doubters', desc: 'For the believer who is terrified the faith they have isn' },
 { name: 'For the Person Who Just Realized', href: '/just-realized', desc: 'If your hands are shaking because a verse just said something it never said before, you are not losing your faith — you ' },
 { name: 'The Truth Will Set You Free', href: '/freedom', desc: 'Am I really saved? The dread visits sincere believers in worship, in the car after church, in the quiet. The doctrines o' },
 { name: 'You Came Here Hunting for Intellectual Honesty', href: '/for-skeptics', desc: 'You do not believe — or you are not sure. That is not stupid. That is a starting point.' },
 { name: 'You Deconstructed Everything — Here\'s What\'s Left', href: '/for-deconstructed', desc: 'For the one who tore it all down and is standing in the rubble wondering if anything true survives.' },
 { name: 'You Just Heard About Election and It Broke Your Brain', href: '/for-new-believers', desc: 'Welcome. Someone said God chooses who gets saved and the ground shifted under your feet. This path builds the scaffoldin' },
 { name: 'You Love Jesus. You\'re Just Missing Something.', href: '/for-arminians', desc: 'You were taught that your decision saved you. Walk with us, in respect and care, through what Scripture actually teaches' },
 { name: 'Your World Is Burning. God Isn\'t.', href: '/for-hurting', desc: 'If you\'re here, something is wrong. Maybe something shattered recently. Maybe it shattered a long time ago and no one n' }
 ]
 },
 {
 name: 'Featured Experiences',
 icon: '',
 href: '/the-fork',
 count: 11,
 pages: [
 { name: 'The 60-Second Case — The Whole Argument, One Minute', href: '/the-60-second-case', desc: 'Something real happened to you. A day, a moment, a conversation, a quiet night when it all finally broke through. You he' },
 { name: 'The Breath Prayer', href: '/the-breath-prayer', desc: 'A guided contemplative prayer synced to your breathing. The ancient Jesus Prayer — inhaled as mercy, exhaled as surrende' },
 { name: 'The Fork — One Question Splits Everything', href: '/the-fork', desc: 'Every human ever born walks the same road until one question splits it forever: where did your faith come from? Walk the' },
 { name: 'The Fork in the Road — Where Did Your Faith Come From?', href: '/fork-in-the-road', desc: 'Only two answers to the question that changes everything: Did God cause your faith, or did you activate it? Walk the log' },
 { name: 'The Golden Chain', href: '/the-golden-chain', desc: 'Romans 8:29-30 as a scroll experience. Five links. One chain. Forged before the foundation of the world. Unbreakable.' },
 { name: 'The Mirror', href: '/the-mirror', desc: 'Twelve quiet questions. Not about your theology — about your heart. The mirror Scripture holds up, in interactive form.' },
 { name: 'The Objection Collapse', href: '/the-objection-collapse', desc: 'Pick any Arminian objection. Watch Scripture walk it to the ground. Twelve objections, twelve collapses — in interactive' },
 { name: 'The Scripture Cascade', href: '/the-scripture-cascade', desc: 'Fifty-one passages. Five doctrines of grace. No commentary. Just the text, falling one after another until the escape ro' },
 { name: 'The Two Arms — How This Site Reaches You', href: '/two-arms', desc: 'Every page here operates with two arms. One demolishes the lie that you saved yourself. The other catches you in the sov' },
 { name: 'The Two Arms — The Visual Map', href: '/the-two-arms', desc: 'The left arm tears down the lie of self-salvation. The right arm catches the one who falls. Both arms, always — because ' },
 { name: 'You Were Found Before You Knew You Were Lost', href: '/found-you', desc: 'The love that found you did not wait for you to be looking for it. You were chosen before the foundation of the world, a' }
 ]
 }
 ]
 },
 {
 umbrella: 'Questions & Objections',
 icon: '',
 desc: 'Every question answered. Every objection dismantled.',
 href: '/questions',
 subcategories: [
 {
 name: 'The Five Points',
 icon: '',
 href: '/apologetics',
 count: 63,
 pages: [
 { name: 'A Remnant Chosen by Grace — The Engine That Ends the Debate (Romans 11:5-6)', href: '/apologetic-the-remnant-chosen-by-grace', desc: 'Paul states the engine that decides the whole debate over election: if by grace, then it cannot be based on works; if it' },
 { name: 'A Slave to Sin — The Bondage You Mistook for Freedom', href: '/apologetic-a-slave-to-sin', desc: 'Jesus said everyone who sins is a slave to sin — no exceptions, no escape by the slave' },
 { name: 'Able to Save Completely — The Priest Who Always Lives to Pray You Home (Hebrews 7:25)', href: '/apologetic-able-to-save-completely', desc: 'Hebrews 7:25 grounds your final salvation not in your strength but in the permanence of your Priest. Because Jesus alway' },
 { name: 'Born Not of Human Will — The New Birth No One Decides (John 1:12-13)', href: '/apologetic-born-not-of-human-will', desc: 'John 1:12-13 — the new birth is' },
 { name: 'Bought With His Own Blood — The Price That Names the Flock (Acts 20:28)', href: '/apologetic-bought-with-his-own-blood', desc: 'The church of God,' },
 { name: 'Can You Lose Your Salvation?', href: '/apologetic-perseverance', desc: 'If salvation depends on God\'s eternal decree rather than your flickering will, then it cannot be lost — because the One' },
 { name: 'Chosen As Firstfruits to Be Saved — When the Choice Came Before the Belief (2 Thessalonians 2:13)', href: '/apologetic-chosen-as-firstfruits', desc: '2 Thessalonians 2:13 says God chose you' },
 { name: 'Darkened in Their Understanding — Why the Mind Is Dark Because the Heart Is Stone', href: '/apologetic-darkened-in-their-understanding', desc: 'Brilliant people reject the gospel they cannot refute. Ephesians 4:18 explains why: the mind is darkened not for lack of' },
 { name: 'Did Jesus Die for Everyone? Scripture on Definite Atonement', href: '/apologetic-definite-atonement', desc: 'Did Jesus die for everyone, or for His sheep? The two-surgeons picture, the actual language of John 10, John 17, and Heb' },
 { name: 'Doesn\'t Election Make Evangelism Pointless?', href: '/apologetic-evangelism', desc: 'If God has already decided who will be saved, why bother preaching? Because God decrees means as well as ends.' },
 { name: 'Ephapax — The Single Greek Adverb That Settles Definite Atonement', href: '/apologetic-the-once-for-all-ephapax', desc: 'Ephapax — once for all. The Greek adverb the writer of Hebrews uses to bolt the door of the atonement against any readin' },
 { name: 'For the Sheep — The Particular Pronoun of John 10', href: '/apologetic-for-the-sheep', desc: 'Jesus does not say the good shepherd lays down his life for everyone. He says he lays it down for the sheep — hyper ton ' },
 { name: 'God Is Faithful — Why Your Security Rests on His Character, Not Yours (1 Corinthians 1:8-9)', href: '/apologetic-he-is-faithful', desc: '1 Corinthians 1:8-9 promises the most carnal church in the New Testament that God will keep them firm to the end — becau' },
 { name: 'God Works the Willing — The Deepest Answer to Free Will (Philippians 2:13)', href: '/apologetic-god-works-the-willing', desc: 'Paul commands us to work out our salvation, then grounds the command in something staggering: for it is God who works in' },
 { name: 'Grace Given Before Time — The Verse That Dates Your Election (2 Timothy 1:9)', href: '/apologetic-his-own-purpose-and-grace', desc: 'Grace was given to us in Christ before the beginning of time, not because of anything we have done. The verse excludes m' },
 { name: 'He Bore the Sin of Many — The Servant\'s Definite "Many" (Isaiah 53:11-12)', href: '/apologetic-he-bore-the-sin-of-many', desc: 'Seven centuries before the cross, Isaiah named the work and its scope: my righteous servant will justify many, and he bo' },
 { name: 'He Did Not Spare His Own Son — The Cross-Logic That Cannot Be Broken (Romans 8:32-34)', href: '/apologetic-he-did-not-spare-his-own-son', desc: 'Romans 8:32 argues from greater to lesser: if the Father did not spare His own Son, He will surely give His people every' },
 { name: 'He Gave Himself Up for Her — The Bridegroom and the Cross (Ephesians 5:25)', href: '/apologetic-gave-himself-for-the-bride', desc: 'A bridegroom does not give himself for women in general; he gives himself for his bride. Ephesians 5:25 makes the scope ' },
 { name: 'He Who Began a Good Work — The Divine Bookends of Perseverance', href: '/apologetic-he-who-began-a-good-work', desc: 'Paul does not say you will carry your salvation to completion. He says he who began the good work will carry it on — the' },
 { name: 'He Will Save His People — The Scope Named at the Cradle (Matthew 1:21)', href: '/apologetic-save-his-people', desc: 'Before the child was born, the angel named both the work and its object: he will save his people from their sins. Not of' },
 { name: 'I Have Many People in This City — Named Before They Believed (Acts 18:10)', href: '/apologetic-many-people-in-this-city', desc: 'Acts 18:10 — God calls a city of unconverted pagans' },
 { name: 'I Know Whom I Have Believed — The Soul You Deposited in an Unbreakable Vault (2 Timothy 1:12)', href: '/apologetic-i-know-whom-i-have-believed', desc: 'Paul' },
 { name: 'I Never Knew You — The Sentence That Ends Every Résumé', href: '/apologetic-i-never-knew-you', desc: 'They arrive at the judgment with prophecy, exorcisms, and miracles on the books — and Jesus does not dispute one line. H' },
 { name: 'I Shall Lose None — The Guarantee Built Into Christ\'s Obedience (John 6:37-39)', href: '/apologetic-i-shall-lose-none', desc: 'Jesus binds the security of every believer to his own obedience: this is the will of the Father, that I shall lose none ' },
 { name: 'I Will Move You — The Grace That Causes the Walking (Ezekiel 36:26-27)', href: '/apologetic-i-will-move-you', desc: 'Ezekiel 36 is a monologue of pure divine action — eight first-person I wills, and the human heart contributes only the s' },
 { name: 'Kept by the Power of God — The Garrison at Both Ends (1 Peter 1:3-5)', href: '/apologetic-kept-by-the-power-of-god', desc: 'Peter says the inheritance is kept in heaven for you, and you are shielded by God' },
 { name: 'Let Light Shine Out of Darkness — The Voice That Made the Universe Made You See (2 Corinthians 4:6)', href: '/apologetic-light-shine-out-of-darkness', desc: 'The same God who commanded light out of the primordial dark made His light shine in our hearts. The darkness of Genesis ' },
 { name: 'Lydia\'s Heart — The Greek and the Neuroscience of an Irresistibly Opened Will', href: '/apologetic-lydias-heart', desc: 'A single Greek verb at a riverside prayer meeting in Philippi — diēnoixen — and a parallel verb in John 6:44 — helkyō — ' },
 { name: 'No One Can Come Unless — The Helkyō of John 6', href: '/apologetic-no-one-can-come-unless', desc: 'The verb Jesus chose for the Father' },
 { name: 'Not Because — Deuteronomy 7 and the Hebrew Asymmetry of Election', href: '/apologetic-not-because-but-because', desc: 'Three Hebrew verses on the plains of Moab — Deuteronomy 7:6-8 — establish the Old Testament paradigm for unconditional e' },
 { name: 'Nothing Can Separate — The Seven Questions of Romans 8', href: '/apologetic-nothing-can-separate', desc: 'Paul ends Romans 8 by conducting a search — seven rhetorical questions ransacking every category of reality for one thin' },
 { name: 'Only Evil All the Time — The Diagnosis the Flood Could Not Cure (Genesis 6:5)', href: '/apologetic-only-evil-all-the-time', desc: 'Before the law, God read the human heart and pronounced a verdict total in every direction: every inclination of the tho' },
 { name: 'People Loved the Darkness — Why the Problem Was Never the Light (John 3:19-20)', href: '/apologetic-loved-darkness-rather-than-light', desc: 'John 3:19 locates our lostness not in a lack of light but in a love of darkness. The light has come; the trouble is the ' },
 { name: 'Purchased From Every Tribe — The New Song That Counts the Cost (Revelation 5:9)', href: '/apologetic-purchased-from-every-tribe', desc: 'Revelation 5:9 — the Lamb' },
 { name: 'Sinful From Birth — Why David Traced His Sin to the Womb (Psalm 51:5)', href: '/apologetic-sinful-from-birth', desc: 'On the worst night of his life, David dug for the root of his sin and did not stop at the deed. Surely I was sinful at b' },
 { name: 'Tetagmenoi — The Pluperfect Periphrastic That Says Who Believed', href: '/apologetic-tetagmenoi-acts-13-48', desc: 'One Greek participle in Luke' },
 { name: 'The Cardiac Transplant — Ezekiel 36:26 and the Five Unilateral "I Will" Verbs', href: '/apologetic-the-cardiac-transplant', desc: 'Ezekiel 36 stacks five unbroken first-person divine verbs — I will give, I will remove, I will put, I will move, I will ' },
 { name: 'The Cardiology of the Fall — Genesis 6:5, Jeremiah 17:9, and the Hebrew Diagnosis', href: '/apologetic-the-cardiology-of-the-fall', desc: 'Two Hebrew verses — Genesis 6:5 and Jeremiah 17:9 — converge on the same diagnosis: the heart of fallen man is structura' },
 { name: 'The Chain Whose Last Link Is Already Welded — Romans 8:29-30 and the Past Tense for a Future Verb', href: '/apologetic-the-unbroken-chain', desc: 'Five Greek aorist verbs in a chain Paul writes in the past tense — for an event that has not yet happened. The grammar o' },
 { name: 'The Conscience That Only Accuses — Romans 2:14-15', href: '/apologetic-the-conscience-that-only-accuses', desc: 'Paul says the conscience bears joint-witness against the sinner. But notice what it cannot do: it knows the good, names ' },
 { name: 'The Deceitful Heart — The Witness That Lies to Its Owner First (Jeremiah 17:9)', href: '/apologetic-the-deceitful-heart', desc: 'The heart is deceitful above all things and beyond cure. Who can understand it? The one organ you trust to assess yourse' },
 { name: 'The Double Grip — John 10:28-29 and the Two Hands That Will Not Open', href: '/apologetic-the-double-grip-of-john-10', desc: 'John 10:28-29 stacks the strongest negation in Koine Greek (ou mē), the most violent abduction verb in the language (har' },
 { name: 'The Down-Payment That Cannot Be Lost — How the Greek of Arrabōn Settles Perseverance', href: '/apologetic-arrabon-the-down-payment', desc: 'Arrabōn — the Greek Paul reaches for three times for the Holy Spirit, and the same word modern Greek still uses for an e' },
 { name: 'The Everlasting Covenant — God Secures Both Sides (Jeremiah 32:40)', href: '/apologetic-the-everlasting-covenant', desc: 'God promises not only to keep doing good to His people but to put His own fear in their hearts so they will never turn a' },
 { name: 'The Fourth-Day Corpse — Why Lazarus Settles the Question of Spiritual Death', href: '/apologetic-the-fourth-day-corpse', desc: 'John 11 is not a touching miracle story. It is a structural argument. The narrative is shaped as a circle that the dead ' },
 { name: 'The Greek That Will Not Bend — Eklogē, Prothesis, and the Verbs That Foreclose Conditional Election', href: '/apologetic-ekloge-the-greek-of-election', desc: 'Two Greek words at the hinge of Romans 9 — eklogē and prothesis — and the verb tenses around them that lock the door aga' },
 { name: 'The Lord Knows Those Who Are His — The Seal With Two Inscriptions (2 Timothy 2:19)', href: '/apologetic-the-lord-knows-those-who-are-his', desc: '2 Timothy 2:19 — God' },
 { name: 'The Mercy Seat in Greek — How a Single Furniture Word Settles Definite Atonement', href: '/apologetic-hilasterion-the-mercy-seat', desc: 'Hilastērion — the Greek word for the lid of the Ark of the Covenant. Paul applies this single furniture word to Christ i' },
 { name: 'The Mind That Cannot Submit — The Double "Cannot" of Romans 8', href: '/apologetic-the-mind-that-cannot-submit', desc: 'Paul does not say the unspiritual mind will not submit to God. He says it cannot — oude gar dynatai. The carnal mind is ' },
 { name: 'The One-Sentence Doxology That Settles Election — Reading Ephesians 1:3-14 in the Original Greek', href: '/apologetic-the-eulogy-greek-of-ephesians-1', desc: 'Ephesians 1:3-14 is a single sentence in the Greek — twelve verses, no period. The prepositional architecture (en autō, ' },
 { name: 'The Pioneer and Perfecter of Faith — Hebrews 12:2', href: '/apologetic-the-pioneer-and-perfecter', desc: 'Hebrews 12:2 calls Jesus the pioneer and perfecter of faith. The Greek says He both originates faith and completes it — ' },
 { name: 'The Prayer You Have Never Spontaneously Prayed', href: '/apologetic-the-prayer-you-never-spontaneously-prayed', desc: 'A single behavioral diagnostic that demonstrates total depravity from the reader' },
 { name: 'The Priest Who Cannot Forget Their Names — How the Vestments Settle the Atonement Question', href: '/apologetic-priest-shoulders', desc: 'The whole question of who Christ died for — settled by two onyx stones on Aaron' },
 { name: 'The Road to Damascus — The Conversion No One Chose', href: '/apologetic-the-road-to-damascus', desc: 'The most violent enemy the early church had was converted while marching to arrest Christians. Saul was not seeking, not' },
 { name: 'The Trilemma John Owen Set in 1647 — And Why It Has Never Been Answered', href: '/apologetic-owen-trilemma', desc: 'John Owen' },
 { name: 'The Valley of Dry Bones — How the Dead Are Made to Live (Ezekiel 37)', href: '/apologetic-the-valley-of-dry-bones', desc: 'God set Ezekiel in a valley of very dry bones and asked, can these bones live? They did not stir until the word was prea' },
 { name: 'The Washing of Rebirth — Born Again Before You Believed (Titus 3:5)', href: '/apologetic-the-washing-of-rebirth', desc: 'Paul says God saved us not because of righteous things we had done, but through the washing of rebirth and renewal by th' },
 { name: 'There Is No One Who Seeks God — The Verse That Ends the Seeker Myth (Romans 3:10-18)', href: '/apologetic-no-one-righteous', desc: 'Everyone believes they were a seeker who found God. Romans 3:10-12 says the opposite in the most absolute negation in Sc' },
 { name: 'Those You Gave Me — The Given Ones of John 17', href: '/apologetic-those-you-gave-me', desc: 'Five times in His longest recorded prayer, Jesus calls the people He came to save the ones the Father gave Him — hous de' },
 { name: 'What About Babies Who Die?', href: '/apologetic-babies', desc: 'What happens to babies who die? Scripture gives grieving parents a sovereign, rock-solid hope that no free-will theology' },
 { name: 'What About Those Who Never Heard the Gospel?', href: '/apologetic-unreached', desc: 'The question assumes that people without the gospel are innocent and waiting.' },
 { name: 'When the Spirit Moves in Obvious Power — What Three Centuries of Revival Reveal About the Doctrine the Awakened Were Pre', href: '/apologetic-revival-and-sovereign-grace', desc: 'Three centuries of revival history converge on a single observation: where the Spirit moved in obvious power, the doctri' },
 { name: 'You Did Not Choose Me — The Reversed Arrow of John 15:16', href: '/apologetic-you-did-not-choose-me', desc: 'On the last night, Jesus took the one thing every believer is proudest of — the day they chose Him — and flatly denied i' }
 ]
 },
 {
 name: 'Reformed Apologetics',
 icon: '',
 href: '/reformed-apologetics-hub',
 count: 6,
 pages: [
 { name: 'The Fine-Tuning of the Cosmos — The Universe That Was Set for Life (Psalm 19:1)', href: '/reformed-apologetics-fine-tuning', desc: 'The constants of physics are calibrated for life on a razor' },
 { name: 'The Hard Problem of Consciousness — The One Thing Matter Cannot Become (Genesis 2:7)', href: '/reformed-apologetics-consciousness', desc: 'Why is there something it is like to be you? Physicalism can map the brain and never explain the inner light of experien' },
 { name: 'The Moral Argument — The Law You Cannot Stop Obeying (Romans 2:14-15)', href: '/reformed-apologetics-moral-argument', desc: 'If there is no God, nothing is actually wrong — only unpopular. But no one can live that way. The conscience that condem' },
 { name: 'The Problem of Evil — The Question That Has a Wounded Answer (Genesis 50:20)', href: '/reformed-apologetics-theodicy', desc: 'The single greatest objection to God, taken at full strength — and the answer the doctrines of grace give that no other ' },
 { name: 'The Resurrection in History — The Fact That Will Not Be Explained Away (1 Corinthians 15)', href: '/reformed-apologetics-resurrection', desc: 'The empty tomb, the appearances, and the men who died for what they had seen. The historical case for the resurrection n' },
 { name: 'The Transcendental Argument — The Proof Behind Every Proof (Colossians 2:3)', href: '/reformed-apologetics-transcendental', desc: 'The laws of logic, the reliability of reason, and the uniformity of nature are the tools the unbeliever uses to argue ag' }
 ]
 },
 {
 name: 'Presuppositional Apologetics',
 icon: '',
 href: '/presuppositional-apologetics-hub',
 count: 3,
 pages: [
 { name: 'Borrowed Capital — How the Atheist Spends a Fortune He Says Does Not Exist (Colossians 1:17)', href: '/presuppositional-borrowed-capital', desc: 'Every time the atheist reasons, predicts, or condemns, he draws on three accounts his worldview cannot fund: logic, the ' },
 { name: 'The Impossibility of the Contrary — The One Proof That Cannot Be Refuted Without Using It (Proverbs 1:7)', href: '/presuppositional-impossibility-of-the-contrary', desc: 'The transcendental argument does not put God on the table to be weighed. It shows that without God you could not have a ' },
 { name: 'The Myth of Neutrality — There Is No Chair to Judge God From (Romans 1:21-22)', href: '/presuppositional-no-neutral-ground', desc: 'The skeptic asks the Christian to prove God from neutral ground, as if the mind were an impartial judge. But neutrality ' }
 ]
 },
 {
 name: 'Scripture Questions',
 icon: '',
 href: '/questions',
 count: 78,
 pages: [
 { name: '"Not Because of Our Works" — 2 Timothy 1:9', href: '/question-2tim1-9', desc: 'Seven words. That is all it took to end the debate.' },
 { name: 'Are Arminians Saved?', href: '/question-are-arminians-saved', desc: 'The Arminian framework, when followed honestly to its logical conclusion, places the decisive factor in salvation on a h' },
 { name: 'Can God Blot Your Name from the Book of Life?', href: '/question-book-of-life', desc: 'Revelation 3:5 is a promise, not a threat. Christ never says "If you fail, I will blot out your name." He vows the oppos' },
 { name: 'Can God Create a Universe He Doesn\'t Control?', href: '/question-sovereignty-logic', desc: 'God cannot do nonsense. And a universe He doesn\'t control is nonsense.' },
 { name: 'Can God\'s Plan for You Be Broken? Romans 8:28-30', href: '/question-goldchain', desc: 'Romans 8:28-30 — foreknown, predestined, called, justified, glorified. An unbreakable chain where every link is divine a' },
 { name: 'Can You Lose Your Salvation? Once Saved, Always Saved Explained', href: '/question-perseverance', desc: 'Those whom God saves, He keeps — not because believers hold on, but because God does not abandon His own work . Jesus pr' },
 { name: 'Can You Truly Repent If You Reject Total Depravity?', href: '/question-repentance-total-depravity', desc: 'If repentance means agreeing with God about your sin, how can you repent while denying the depth Scripture describes? Pa' },
 { name: 'Dead Bones Don\'t Volunteer — Ezekiel 37', href: '/question-ezekiel37', desc: 'Ezekiel 37 answers the oldest objection: dry bones do not assemble themselves. The breath comes from outside — and the d' },
 { name: 'Dead, Not Sick — The Bible\'s Diagnosis of the Human Condition', href: '/question-depravity', desc: 'Total depravity does not mean people are as evil as possible — it means sin has touched every faculty: mind, will, affec' },
 { name: 'Did God Choose You Before You Were Born?', href: '/question-chosen', desc: 'Ephesians 1:3-14 is one Greek sentence with eleven divine verbs and one human one.' },
 { name: 'Does "Foreknowledge" Mean God Saw You\'d Believe?', href: '/question-foreknowledge', desc: 'In Romans 8:29 God foreknows persons, not facts about their faith. Romans 8:29 is not God reacting to foreseen faith — i' },
 { name: 'Does God Change Your Heart Without Permission?', href: '/question-newheart', desc: 'Ezekiel 36:26-27 — God promises a new heart and a new spirit. He does not ask permission. He removes the heart of stone ' },
 { name: 'Does God Choose Who Goes to Heaven?', href: '/question-does-god-choose-who-goes-to-heaven', desc: 'Yes. Scripture is breathtaking in its clarity: God chose His people before the foundation of the world ( Ephesians 1:4 -' },
 { name: 'Does God Harden Hearts? Yes — And Here\'s What That Means', href: '/question-hardening', desc: 'Does God harden hearts? Scripture says yes — but hardening is never the creation of evil; it is the just withdrawal of r' },
 { name: 'Does God Love Everyone Equally?', href: '/question-does-god-love-everyone-equally', desc: 'Love that refuses to distinguish is not love but indifference wearing a sentimental mask.' },
 { name: 'Does God Predestine People to Hell? The Honest Answer', href: '/question-predestined-to-hell', desc: 'If God chooses some for salvation, does He choose others for damnation? Scripture draws a devastating asymmetry: salvati' },
 { name: 'Does the Bible Say We\'re Sick, Not Dead?', href: '/question-bible-says-sick', desc: 'A handful of verses use "sick" language in connection with sin. But in every case, the context reveals a sickness that i' },
 { name: 'Doesn\'t God Want Everyone Saved? — The Two Wills of God', href: '/question-godwants', desc: '1 Timothy 2:4 says God wants all people to be saved. But if God\'s desire guaranteed the outcome, all would be saved — w' },
 { name: 'Drawn, Not Dragged — The Unstoppable Grace of Effectual Calling', href: '/question-irresistible', desc: '"Irresistible grace" is a terrible name for a beautiful truth. It sounds like coercion. It is liberation.' },
 { name: 'Effectual Calling: The Call You Can Ignore vs. the Call That Creates Life', href: '/question-external-internal-call', desc: 'Scripture teaches two kinds of calling: the external call that goes to all and can be refused, and the internal call tha' },
 { name: 'Elect According to Foreknowledge', href: '/question-1peter1', desc: 'Arminians claim " foreknowledge " in 1 Peter 1:2 means God looked ahead and saw who would believe, then elected them on ' },
 { name: 'Ephesians 1 — The One-Breath Sentence That Contains Your Whole Salvation', href: '/question-ephesians1', desc: 'Ephesians 1:3-14 is, in Greek, a single unbroken sentence — among the longest in the New Testament. Every verb that deci' },
 { name: 'Every Conversion in Acts — God Did It Every Single Time', href: '/question-every-conversion-acts', desc: 'God did it every single time. In every conversion narrative in Acts, God initiates. Not once does a human being autonomo' },
 { name: 'Every Verse Where the Bible Says You CANNOT', href: '/question-cannot', desc: 'Every verse where Scripture says fallen humanity CANNOT do something spiritual. The Bible\'s own testimony to our total ' },
 { name: 'Everyone Is a Calvinist on Their Knees', href: '/question-calvinist-on-knees', desc: 'Your prayers, worship songs, funerals, and gratitude all confess sovereign grace — even if your theology denies it. Your' },
 { name: 'Free Will Bible Verses', href: '/question-free-will-bible-verses', desc: 'Every verse used to defend free will in salvation, examined honestly. What Joshua 24:15, Revelation 3:20, John 3:16, and' },
 { name: 'How Do I Know If I’m One of the Elect?', href: '/question-am-i-chosen', desc: 'If God chose His people before the foundation of the world, how can I know I’m one of them? The Bible’s answer isn’t wha' },
 { name: 'I Want to Believe, But I Can\'t', href: '/question-i-cant-believe', desc: 'You cannot command belief the way you command your hand. The most honest sentence in the Bible was spoken by a man who b' },
 { name: 'If Grace Is Irresistible, Why Does It Feel Like Choice?', href: '/question-how-grace-feels', desc: 'You felt yourself choosing Christ. Scripture says God raised you from spiritual death and made you alive. How are both t' },
 { name: 'If You Chose God, You Can Boast — The Boasting Problem with Free Will', href: '/question-boasting', desc: '1 Corinthians 1:26-31 — God chose the foolish to shame the wise, for one reason: so that no one may boast.' },
 { name: 'Is Faith a Gift from God? What the Bible Actually Says', href: '/question-faithgift', desc: 'Paul already answered. And the answer should make your knees buckle.' },
 { name: 'Is Free Will Real? What the Bible Actually Teaches About Human Choice', href: '/question-freewill', desc: 'Scripture never teaches libertarian free will. It teaches death — and dead people do not choose their own resurrection. ' },
 { name: 'Is God Unjust? Romans 9 and Paul\'s Answer to the Charge', href: '/question-unfair', desc: 'You want God to be fair. Paul heard the objection before you were born — and his answer was not to soften election but t' },
 { name: 'Is It Too Late for Me?', href: '/question-is-it-too-late', desc: 'Every' },
 { name: 'Is Predestination in the Bible?', href: '/question-is-predestination-in-the-bible', desc: 'Predestination appears by name in Romans 8 and Ephesians 1. But the concept saturates all of Scripture — from Genesis to' },
 { name: 'Is Salvation Your Choice or God\'s?', href: '/question-is-salvation-my-choice-or-gods', desc: 'Either God\'s choice was decisive in your salvation or yours was. If yours was, you are the hero of your salvation story' },
 { name: 'Isaiah 53: The Servant Who Bore the Sins of Many', href: '/question-isaiah53', desc: 'Isaiah 53 — written 700 years before Calvary — is the most detailed prophecy of the cross in the Old Testament.' },
 { name: 'Known Before You Were Known', href: '/question-psalm139', desc: 'Psalm 139 reveals that God knew you, formed you, and wrote every day of your life before you existed. Your story was aut' },
 { name: 'Limited Atonement? — Did Christ Die For Everyone or For His Sheep?', href: '/question-limited-atonement', desc: 'The word' },
 { name: 'Names Written Before Creation — Revelation 13:8 & 17:8', href: '/question-revelation13', desc: 'Revelation 13:8 and 17:8 prove names were written in the Book of Life before creation — not in response to foreseen fait' },
 { name: 'No Dice, No Chance — God\'s Sovereignty over Lots and Kings', href: '/question-proverbs-sovereignty', desc: 'You live in a world that worships luck and fears powerful people. Proverbs says both are illusions. The dice are God\'s,' },
 { name: 'No One Can Come to Me Unless the Father Draws Them', href: '/question-john6', desc: '"No one can come to me unless the Father who sent me draws them." Not "no one will." Cannot.' },
 { name: 'Not Because of Righteous Things We Had Done — Titus 3:3-7', href: '/question-titus3', desc: 'Titus 3:3-7 contains the entire order of salvation in five verses — and at no point does a human being contribute anythi' },
 { name: 'One Question That Reveals Where Your Faith Came From', href: '/question-one-question', desc: 'There is one question that, honestly answered, will change everything you believe about salvation. Not where the gospel ' },
 { name: 'Regeneration Precedes Faith', href: '/question-regeneration-precedes-faith', desc: 'Proves that spiritual rebirth comes BEFORE faith, not after. The order matters. This single truth demolishes the Arminia' },
 { name: 'Sealed by the Holy Spirit for the Day of Redemption — Ephesians 4:30', href: '/question-sealed', desc: 'What does it mean to be sealed by the Holy Spirit? Ephesians 4:30 says you are sealed for the day of redemption — not un' },
 { name: 'Seven Questions That Will Show You Where Your Faith Came From', href: '/question-seven-questions', desc: 'Seven questions, asked gently, in the order a door opens. By the end, you will know whether you chose God or whether He ' },
 { name: 'Thank You, Father, for Hiding This — Matthew 11:25-27', href: '/question-matt11', desc: 'Jesus thanks the Father for hiding truth from the wise and revealing it to infants. Not lamenting. Not apologizing. Than' },
 { name: 'The Arminian Case, Stated Fairly — And Then Answered', href: '/question-arminian-steelman', desc: 'The strongest Arminian arguments, presented honestly and at full strength — not as straw men. Then answered one by one f' },
 { name: 'The Cross Was Predestined', href: '/question-acts4', desc: 'Everyone asks why Jesus died. Almost no one asks the harder question: who decided that He would?' },
 { name: 'The Dead Man — A Visual Argument for Total Depravity', href: '/question-dead-man-visual', desc: 'A visual argument for Total Depravity: a corpse cannot reach for rescue. If you are alive in Christ, a voice reached int' },
 { name: 'The Doctrines of Grace, Explained Visually — Sovereign Grace You Can See', href: '/question-visual-theology', desc: 'The Reformed soteriological argument presented visually through logical flowcharts, diagrams, and devastating comparison' },
 { name: 'The Free Offer of the Gospel', href: '/question-free-offer-of-the-gospel', desc: 'If God has already chosen, why does the gospel command and beg every soul to come? The free offer is no performance — an' },
 { name: 'The Greek Tense That Settles the Debate — 1 John 5:1', href: '/question-1john5-1', desc: 'In 1 John 5:1 “believes” is present tense and “has been born” is the Greek perfect: the birth already happened, and the ' },
 { name: 'The Prayer That Proves Election — John 17', href: '/question-john17', desc: 'In John 17, on the last night of His life, Jesus prays — and He prays not for the world in general but, seven separate t' },
 { name: 'The Verse in Acts That Nobody Preaches – Acts 13:48', href: '/question-acts', desc: 'Luke the historian records a fact: in Pisidian Antioch, "all who were appointed for eternal life believed" (Acts 13:48).' },
 { name: 'Unconditional Election — On What Basis Did God Choose You?', href: '/question-unconditional', desc: 'Unconditional Election — On What Basis Did God Choose You?' },
 { name: 'Was Christ a Robot? If Predestination Didn\'t Rob Him, It Won\'t Rob You', href: '/question-was-christ-a-robot', desc: 'The crucifixion is the most predestined event in human history (Acts 2:23, 4:27-28). Yet no Christian has ever called Ch' },
 { name: 'What About "Whosoever Will"?', href: '/question-whosoever', desc: '"Whoever believes" (Greek: pas ho pisteuōn — "all the believing ones") describes who is saved, not who can believe. John' },
 { name: 'What Are the Doctrines of Grace? — A Simple Explanation', href: '/question-what-is-sovereign-grace', desc: 'Every Christian says salvation is by grace; the doctrines of grace ask how much — and answer, all of it.' },
 { name: 'What Did Jesus Mean by "Let the Dead Bury the Dead"?', href: '/question-dead-bury-dead', desc: 'When Jesus said "Let the dead bury their own dead" (Matthew 8:22), He used the word "dead" in two senses in one breath —' },
 { name: 'What Does "Born Again" Actually Mean? — John 3:3-8 Explained', href: '/question-born-again-meaning', desc: 'Jesus said you must be born again. But what does that mean — and who does the birthing? A closer look at John 3 reveals ' },
 { name: 'What Does "Chosen" Actually Mean in the Bible?', href: '/question-what-does-chosen-mean', desc: '"Chosen" means exactly what the timing forbids you to soften: God chose you "before the creation of the world," before y' },
 { name: 'What Does "Dead in Sin" Actually Mean?', href: '/question-dead-in-sin-meaning', desc: 'When Paul says you are dead in sin, he reaches for the Greek word a coroner writes on a chart — nekros — the same word u' },
 { name: 'What Does Romans 9 Really Mean?', href: '/question-romans9', desc: 'You already know what this chapter says. That is why you have been avoiding it.' },
 { name: 'What Is Eternal Security? The Believer Kept Safe by God\'s Power', href: '/question-secure', desc: 'What is eternal security? Scripture teaches that those whom God saves are kept safe by His power. John 10:27-29, Romans ' },
 { name: 'What Is the Gospel?', href: '/question-what-is-the-gospel', desc: 'Most of what gets called the gospel is advice — something you must do. The real gospel is news — something already done,' },
 { name: 'What Must I Do to Be Saved?', href: '/question-what-must-i-do-to-be-saved', desc: 'It is the most direct question a person can ask God — and it hides a trap in its first verb. The one place Scripture ask' },
 { name: 'Where Did Your Faith Come From?', href: '/question-where-did-your-faith-come-from', desc: 'Where did your faith come from? Trace it honestly and every road dead-ends in God.' },
 { name: 'Where Does Your "No" to God Come From? Free Will and the Unwilling Heart', href: '/question-where-does-your-no-come-from', desc: 'If you reject sovereign grace, where does that rejection originate? From your free will? The very will Scripture says is' },
 { name: 'Whose Side Are You On? Man-Centered vs God-Centered Theology', href: '/question-whose-side-are-you-on', desc: 'Strip away the jargon: one theology makes man the hero, the other makes God the hero. Which side are you really on?' },
 { name: 'Why Did God Harden Pharaoh’s Heart? — Exodus 9:12 Explained', href: '/question-pharaoh-hardened', desc: 'Did Pharaoh harden his own heart, or did God do it? Scripture says both — and the order matters more than you think. Wha' },
 { name: 'Why Does God Choose Some and Not Others? Scripture\'s Answer', href: '/question-why-does-god-choose-some-not-others', desc: 'Scripture is blunt: God\'s choice rests on "not by works but by him who calls" — nothing you did, deserved, or were fore' },
 { name: 'Why Jesus Spoke in Parables — Matthew 13:10-17', href: '/question-parables', desc: 'Why did Jesus speak in parables? Not to make truth clearer — but to conceal it from some while revealing it to others. M' },
 { name: 'Why Pray If God Is Sovereign?', href: '/question-why-pray-if-god-is-sovereign', desc: 'If He\'s already decided everything, why talk to Him about it? Because prayer is not about changing God — it\'s about al' },
 { name: 'Why Some People Hear the Gospel and Walk Away — The Outward vs. Effectual Call', href: '/question-external-call', desc: 'Everyone in church hears the same sermon. But only some are changed forever. Scripture teaches there are two calls — one' },
 { name: 'You Did Not Choose Me, But I Chose You — John 15:16', href: '/question-john15', desc: '“You did not choose me, but I chose you and appointed you” (John 15:16). Jesus locates the origin of the relationship in' },
 { name: 'You Do Not Believe Because You Are Not My Sheep', href: '/question-john10', desc: 'Jesus inverts the logic of faith: sheep-status determines belief, not the reverse. John 10:26-29 is election from the mo' }
 ]
 },
 {
 name: 'Answering the Critics',
 icon: '',
 href: '/questions',
 count: 15,
 pages: [
 { name: 'A Response to Andy Stanley', href: '/response-andy-stanley', desc: 'A careful, respectful response to Andy Stanley' },
 { name: 'A Response to Dave Hunt — What Love Is This, Really?', href: '/response-dave-hunt', desc: 'A response to Dave Hunt’s What Love Is This? — the popular anti-Calvinist polemic — answering its central charges with S' },
 { name: 'A Response to Jerry Walls', href: '/response-jerry-walls', desc: 'Jerry Walls is the most rigorous philosophical Arminian of his generation — a Notre-Dame trained analytic philosopher wh' },
 { name: 'A Response to Leighton Flowers', href: '/response-leighton-flowers', desc: 'A careful, respectful, thorough answer to the central arguments of Leighton Flowers and Soteriology 101 — ten moves exam' },
 { name: 'A Response to Norman Geisler', href: '/response-norman-geisler', desc: 'Norman Geisler (1932–2019) was one of the most prolific evangelical philosophers and apologists of the late twentieth ce' },
 { name: 'A Response to Roger Olson', href: '/response-roger-olson', desc: 'Roger Olson, for decades a professor at Baylor\'s Truett Seminary, is the Arminian the Reformed tradition ought to take ' },
 { name: 'A Response to the SBC Traditional Statement (2012)', href: '/response-sbc-traditional-statement', desc: 'The 2012 Traditional Statement denied the imputation of Adam\'s guilt — and with it, the tradition it claimed. A move-by' },
 { name: 'A Response to William Lane Craig', href: '/response-william-lane-craig', desc: 'Molinism is the most sophisticated attempt to rescue libertarian freedom from Reformed sovereignty — and it is an elegan' },
 { name: 'Arminianism Secretly Assumes Calvinism', href: '/argument-arminianism-secretly-assumes-calvinism', desc: 'The Arminian position, followed honestly at every critical juncture, smuggles in the Calvinist assumptions it spends the' },
 { name: 'Five Articles vs. Five Heads', href: '/argument-five-points-vs-five-articles', desc: 'The Five Articles of the Remonstrance (1610) vs. the Five Heads of the Canons of Dort (1619) — the actual points contest' },
 { name: 'If Arminianism Were True', href: '/argument-if-arminianism-true-consequences', desc: 'A lived reductio. Walk out of the doctrine and into the world it would actually produce — the prayers you could not pray' },
 { name: 'The Cost of Being Wrong', href: '/argument-cost-of-being-wrong', desc: 'Blaise Pascal\'s famous Wager asked: if God may or may not exist, what do you lose by believing, and what do you lose by' },
 { name: 'The Logical Collapse of Arminianism — A Seven-Step Reductio', href: '/argument-logical-collapse-arminianism', desc: 'The Arminian system does not survive its own logic. Seven steps — each one accepted by Arminians themselves — that arriv' },
 { name: 'The Pastor Who Couldn\'t Sleep — An Interior Dialogue in the Dark', href: '/dialogue-arminian-pastor-questions-himself', desc: 'An Arminian pastor walks himself through Romans 9 the night before preaching it. A dialogue in one head — slow, honest, ' },
 { name: 'Twenty Arminian Sermon Illustrations, Refuted One by One', href: '/argument-arminian-sermon-illustrations-refuted', desc: 'The drowning man. The door with the handle on the inside. God voting for you. Twenty beloved illustrations, examined — a' }
 ]
 },
 {
 name: 'Hard Objections',
 icon: '',
 href: '/questions',
 count: 21,
 pages: [
 { name: 'Does Election Contradict God\'s Love? What Scripture Teaches', href: '/objection-love', desc: 'A husband who tells his wife "I love you no more than I love every other woman on earth" has not described love — he has' },
 { name: 'Does God Manipulate Us?', href: '/objection-manipulation', desc: 'Manipulation requires three things: deception, self-interest at the victim\'s expense, and diminishment of the person.' },
 { name: 'Does Prayer Change God\'s Mind? Prayer and the Sovereign Decree', href: '/objection-why-pray', desc: 'If God already decided everything, why pray? Because God\'s sovereignty includes the means as well as the ends — and pra' },
 { name: 'Does Predestination Make Evangelism Pointless? God Ordains the Means', href: '/objection-evangelism-pointless', desc: 'God ordains the ends and the means. He didn\'t just choose who would be saved — He chose how: through the preaching of t' },
 { name: 'Does Predestination Make Us Robots?', href: '/objection-robots', desc: 'The most common objection to sovereignty answered. Predestination does not make you a robot. It makes you free for the f' },
 { name: 'If Everything Is Predetermined, Why Even Try?', href: '/objection-effort', desc: 'The objection confuses outcomes with means. God ordains not just where the story ends but how it gets there — your effor' },
 { name: 'If God Already Chose Us, Why Do We Have to Believe?', href: '/objection-why-believe', desc: 'If God already chose us, why must we still believe? Because God ordains the destination and the road to it — and faith i' },
 { name: 'If God Already Chose Who\'s Saved, Why Evangelize?', href: '/objection-why-evangelize', desc: 'If God already chose the saved, why evangelize? Because election does not work around the gospel — it works through it.' },
 { name: 'If God Controls Everything, How Can He Blame Us?', href: '/objection-responsibility', desc: 'If God predetermines everything, how can He hold us responsible? Romans 9 contains the objection you are about to make —' },
 { name: 'If God Could Save Everyone, Why Doesn\'t He?', href: '/objection-god-could-save-all', desc: 'The theodicy problem — and why the biblical answer is better than the alternative' },
 { name: 'If God Predestined Everything, Why Does He Command?', href: '/objection-why-command', desc: 'God ordains the destination and the road. He decrees not just the outcome but every step that leads to it — your prayers' },
 { name: 'If It\'s Not Free, Is It Love?', href: '/objection-love-requires-choice', desc: 'The tenderest objection to sovereign grace —' },
 { name: 'Is Election Fair? Why Grace Is Unfair', href: '/objection-fairness', desc: 'The fairness objection to election contains a hidden demand: that God distribute mercy the way justice distributes punis' },
 { name: 'Is God the Author of Sin? What Scripture and Logic Reveal', href: '/objection-author-of-sin', desc: 'Does God cause sin if He predestines everything? Scripture teaches a clear distinction between ordaining and authoring. ' },
 { name: 'Isn\'t Faith a Choice? The Question That Changes Everything', href: '/objection-faith-choice', desc: 'You remember choosing to believe. But where did the ability to make that choice come from? What Scripture says about the' },
 { name: 'Isn\'t It Unfair That God Chose Only Some? Fair Compared to What?', href: '/objection-unfair-to-choose-some', desc: 'That\'s the question. Not "Is election fair?" but "Fair compared to what? Fair compared to what you\'ve actually earned?' },
 { name: 'Name Your Objection — Walk Through It With Us', href: '/objection-builder', desc: 'Pick the objection you hold. We will show you the hidden assumption underneath it, the verse that dismantles it, and the' },
 { name: 'The Freedom That Was Never Free', href: '/objection-free-will', desc: 'The philosophical case for libertarian free will, stated at its strongest — and the three places it collapses under its ' },
 { name: 'The Problem of Evil: Is God Unjust to Leave Some Unsaved?', href: '/objection-why-not-save-everyone', desc: 'The objection assumes humans are in a neutral position that God is choosing to override. Scripture teaches the opposite:' },
 { name: 'What About Babies Who Die?', href: '/objection-babies', desc: 'If salvation requires faith, what happens to babies who die? This objection to election actually proves it — because inf' },
 { name: 'What Does 1 Timothy 2:4 Mean? God Wants All People to Be Saved', href: '/objection-desire', desc: 'What 1 Timothy 2:4 and 2 Peter 3:9 actually mean — and why the alternative creates a God who wishes and fails.' }
 ]
 },
 {
 name: 'Side by Side',
 icon: '',
 href: '/compare-calvinism-arminianism',
 count: 17,
 pages: [
 { name: 'At Every Decision Point, Scripture Sides with God — Not You', href: '/compare-every-decision-point', desc: 'Ten crucial doctrinal decision points. At each one, man-centered theology sides with man. God-centered theology sides wi' },
 { name: 'Calvinism vs Arminianism', href: '/compare-calvinism-arminianism', desc: 'Point by point, verse by verse — what Scripture actually teaches about salvation, and why the Arminian reading collapses' },
 { name: 'Calvinism vs Everything — What Scripture Actually Teaches', href: '/comparisons-hub', desc: 'Theological comparisons examined: Calvinism vs Arminianism, Catholicism, Molinism, Open Theism. What does Scripture actu' },
 { name: 'Calvinism vs Molinism', href: '/compare-calvinism-molinism', desc: 'Molinism promises a sovereign God and libertarian free will through middle knowledge. Scripture presents a God who does ' },
 { name: 'Calvinism vs Open Theism', href: '/compare-calvinism-open-theism', desc: 'Does God know every detail of the future — or is He discovering it alongside you? One view has been held for two millenn' },
 { name: 'Can the Saved Be Lost?', href: '/compare-can-the-saved-be-lost', desc: 'Lutherans say a regenerate soul can fall away. But a corpse that could not raise itself cannot re-bury itself — and the ' },
 { name: 'Comparative Theology — Christ Among the Religions of the World', href: '/comparative-theology-hub', desc: 'Comparative theology engages the world' },
 { name: 'Does God Save Alone, or Do You Help? Monergism vs Synergism', href: '/compare-monergism-synergism', desc: 'The most fundamental divide in all of Christianity: Does God save alone, or does He need your cooperation? Scripture ans' },
 { name: 'Predestination vs Foreknowledge — Which Comes First?', href: '/compare-predestination-foreknowledge', desc: '"God looked down the corridor of time, saw who would believe, and chose them." The Bible never says this. Not once.' },
 { name: 'Reformed vs Catholic — How Are We Actually Justified Before God?', href: '/compare-calvinism-catholic-soteriology', desc: 'Imputed or infused? Faith alone or faith plus works? The Reformation\'s most consequential divide — and why the differen' },
 { name: 'Reformed vs. Eastern Orthodox', href: '/compare-reformed-vs-eastern-orthodox', desc: 'Eastern Orthodoxy aims salvation at the highest goal in Christendom — union with God Himself — and rests the first step ' },
 { name: 'Reformed vs. Hyper-Calvinism', href: '/compare-hyper-calvinism', desc: 'Hyper-Calvinism is not strong Calvinism — it is the distortion that denies the free offer of the gospel and the duty of ' },
 { name: 'Reformed vs. Lutheran', href: '/compare-lutheranism', desc: 'Lutheran and Reformed soteriology agree that a dead man cannot raise himself — and then part at two places. The closest ' },
 { name: 'Reformed vs. Provisionism', href: '/compare-provisionism', desc: 'Provisionism rejects both Calvin' },
 { name: 'Reformed vs. Wesleyan', href: '/compare-wesleyan-methodism', desc: 'Wesley believed in human inability more deeply than most who quote him — then built a holiness machine that put the self' },
 { name: 'Single vs. Double Predestination', href: '/compare-single-vs-double-predestination', desc: 'If God chose to save some, did He choose to pass over the rest? The crux theologorum, the Lutheran fear, and the asymmet' },
 { name: 'Two Versions of Grace — One Is Real. One Is Man-Made.', href: '/compare-grace-reformed-vs-arminian', desc: 'Reformed grace vs. Arminian grace compared side by side. One is a resurrection. The other is a suggestion. One is divine' }
 ]
 }
 ]
 },
 {
 umbrella: 'Theology',
 icon: '',
 desc: 'The deep truths of sovereign grace',
 href: '/systematic-theology',
 subcategories: [
 {
 name: 'Systematic Theology',
 icon: '',
 href: '/systematic-theology',
 count: 36,
 pages: [
 { name: 'Adoption — Why God Calls You Son and Daughter, Not Just Forgiven', href: '/systematic-adoption', desc: 'Adoption (Greek huiothesia , "placing as a son") is the act of God\'s free grace by which, having been justified , the b' },
 { name: 'Before the Foundation of the World — God\'s Eternal Decrees', href: '/systematic-divine-decrees', desc: 'Nothing has ever surprised God. Before a single atom existed, He decreed everything that would come to pass — including ' },
 { name: 'Born Again — What It Really Means and Why You Didn\'t Do It to Yourself', href: '/systematic-regeneration', desc: 'You did not choose to be born the first time. You did not choose to be born again either.' },
 { name: 'Chosen Before the Foundation of the World', href: '/systematic-election', desc: 'God chose His people before creation — not based on anything they would do, but according to His sovereign will and grac' },
 { name: 'Common Grace — Why God Is Kind to People Who Hate Him', href: '/systematic-common-grace', desc: 'God keeps the sun rising on the men who curse Him and the rain falling on fields that will never thank Him. The non-savi' },
 { name: 'Effectual Calling — The Voice the Dead Cannot Refuse', href: '/systematic-effectual-calling', desc: 'Scripture distinguishes between two callings. The general call is the outward proclamation of the gospel — the sermon, t' },
 { name: 'Federal Headship: Two Men, Two Races, Two Destinies', href: '/systematic-federal-headship', desc: 'Every human being stands under one of two representatives: Adam or Christ. Federal headship is the architecture of salva' },
 { name: 'Glorification: The Last Link in the Golden Chain', href: '/systematic-glorification', desc: 'Glorification is the final act of salvation — when sin ends forever and we are made fully like Christ. The certainty Pau' },
 { name: 'How Can God Be Sovereign AND Humans Be Responsible?', href: '/systematic-compatibilism', desc: 'God\'s sovereign decree and genuine human agency are not in tension — they operate at different levels.' },
 { name: 'How God Saves — Every Step of Salvation, Every Step His', href: '/systematic-soteriology', desc: 'From election to glorification, not a single link in the chain can break. Romans 8:29-30 mapped out — every step of salv' },
 { name: 'Imputation — The Great Exchange That Rewrites Your Ledger', href: '/systematic-imputation', desc: 'Imputation is the legal crediting of one person\'s actions to another person\'s account. Scripture teaches a double impu' },
 { name: 'Justified — How God Declares Guilty Sinners Righteous', href: '/systematic-justification', desc: 'Stop for a moment. You are not reading theology right now. You are reading your own verdict. If you are in Christ, the r' },
 { name: 'One God, Three Persons', href: '/systematic-trinity', desc: 'The Trinity: one God in three persons. Scripture teaches the Father elects, the Son redeems, the Spirit applies. The fou' },
 { name: 'One Plan, One People, One Mediator — Covenant Theology', href: '/systematic-covenant-theology', desc: 'Most people read the Bible like a library — sixty-six disconnected books. But it is a single contract.' },
 { name: 'Perseverance of the Saints — The Grip That Does Not Slip', href: '/systematic-perseverance', desc: 'The fifth point of grace, properly understood: not that the saints hold on, but that God holds them. Perseverance rests ' },
 { name: 'Providence: God\'s Sovereign Rule Over All Things', href: '/systematic-providence', desc: 'Providence is God\'s sovereign, purposeful, moment-by-moment governance of every event in the created order — from the r' },
 { name: 'Repentance — The Turning God Works in You', href: '/systematic-repentance', desc: 'Repentance is not the penance you pay to earn forgiveness, but the turning of the whole person that God Himself works in' },
 { name: 'Sanctification: The Work God Began and Will Finish', href: '/systematic-sanctification', desc: 'Sanctification is the lifelong process by which God conforms His people into the image of Christ. Scripture speaks of it' },
 { name: 'Saving Faith — The Empty Hand That Receives', href: '/systematic-faith', desc: 'What saving faith actually is — knowledge, assent, and trust — and why Scripture calls it a gift. Faith is the empty han' },
 { name: 'The Atonement: What Christ\'s Death Accomplished', href: '/systematic-atonement', desc: 'Did the cross save you, or merely make your salvation possible? Scripture teaches Christ died to actually secure redempt' },
 { name: 'The Church — Why God\'s People Are Called Out, Not Volunteered', href: '/systematic-ecclesiology', desc: 'You were summoned. That word should stop you cold.' },
 { name: 'The Covenant of Redemption', href: '/systematic-covenant-redemption', desc: 'Before the world existed, the Father, Son, and Spirit made a covenant about you. This is the bedrock beneath election, a' },
 { name: 'The Covenant of Works', href: '/systematic-covenant-works', desc: 'God made a covenant with Adam: perfect obedience for life, one breach for death. Adam broke it, you inherited the breach' },
 { name: 'The Doctrine of Reprobation', href: '/systematic-reprobation', desc: 'The doctrine of reprobation owned, not ducked. Why double predestination is the necessary shadow of unconditional electi' },
 { name: 'The Five Points of Grace (TULIP)', href: '/systematic-tulip', desc: 'The five points of grace explained from Scripture alone. Total Depravity, Unconditional Election, Definite Atonement, Ir' },
 { name: 'The Glory of Christ', href: '/systematic-christology', desc: 'Jesus is not a good teacher who offers advice. He is God in flesh who accomplishes salvation. His deity, humanity, and a' },
 { name: 'The Holy Spirit — Who He Is and Why He Changes Everything', href: '/systematic-pneumatology', desc: 'The Holy Spirit is not a force or a feeling — He is God, the Third Person of the Trinity , who does what no human being ' },
 { name: 'The Order of Salvation — Every Step Is God\'s, Not Yours', href: '/systematic-ordo-salutis', desc: 'Every step is God\'s — not yours. From election to glorification, the chain has never broken.' },
 { name: 'The Resurrection — The Foundation of All Hope', href: '/systematic-resurrection', desc: 'The bodily resurrection of Jesus Christ is not one doctrine among many — it is the foundation upon which every Christian' },
 { name: 'The Truth About Salvation — Where Everything Begins', href: '/systematic-salvation', desc: 'Election. Regeneration. Atonement. Justification. Perseverance. The full architecture of how God saves — and why underst' },
 { name: 'The Truth of Scripture — God\'s Authoritative Word', href: '/systematic-bibliology', desc: 'The Truth of Scripture: Inerrancy, sufficiency, authority. 2 Timothy 3:16-17, 2 Peter 1:20-21. Why Sola Scriptura matter' },
 { name: 'Union with Christ', href: '/systematic-union-with-christ', desc: 'The doctrine of union with Christ is the central truth from which every other blessing of salvation flows. You were chos' },
 { name: 'What Are You? Created in Glory, Ruined by Sin, Rescued by Grace', href: '/systematic-anthropology', desc: 'You carry the image of God — stamped into your being, ineradicable, magnificent — and a corruption so total it has twist' },
 { name: 'Who Is God? The Foundation Everything Else Stands On', href: '/systematic-theology-proper', desc: 'Before you can understand how God saves, you must understand who He is — because His nature is the reason grace works th' },
 { name: 'Why Scripture Is the Final Word', href: '/systematic-prolegomena', desc: 'Every theological argument starts somewhere. And where it starts determines where it ends.' },
 { name: 'You\'re Not Sick in Sin', href: '/systematic-hamartiology', desc: 'Sin is not a list of mistakes. It is a nature — hamartia, the bent of a heart that loves the world and not God. The diag' }
 ]
 },
 {
 name: 'Theological Ethics',
 icon: '',
 href: '/theological-ethics-hub',
 count: 13,
 pages: [
 { name: 'Immigration and the Sojourner — You Are the Alien Who Was Brought Near (Leviticus 19)', href: '/ethics-immigration', desc: 'Before you decide what should happen at the border of a nation, settle what already happened at the border of the Kingdo' },
 { name: 'Just War and the Sword — When May a Christian Take Up Force? (Romans 13)', href: '/ethics-just-war', desc: 'May a Christian take up force? The pacifist and the militarist both arrogate to the self what God reserves to Himself. T' },
 { name: 'Marriage — The Covenant That Pictures Christ and His Church (Ephesians 5)', href: '/ethics-marriage', desc: 'Marriage is not a contract between two autonomous selves but a covenant that images Christ and the church. Paul calls it' },
 { name: 'Power and Authority — The Throne You Reach by Kneeling (Mark 10, 1 Peter 5)', href: '/ethics-power-authority', desc: 'Every heart grasps at control and turns every authority it holds into a self-monument. The Servant-King reverses it: the' },
 { name: 'Race — One Blood, One Image, One Ransomed Family (Acts 17:26)', href: '/ethics-race', desc: 'Racism is a works-righteousness of the blood — worth located in an ancestry no one produced. Total depravity levels the ' },
 { name: 'Sexuality — Identity Conferred, Not Constructed (Genesis 1-2)', href: '/ethics-sexuality', desc: 'The modern sexual ethic rests on the autonomy lie this whole site dismantles. The gospel says identity is conferred in C' },
 { name: 'Speech — The Mouth Reports a Heart You Cannot See (Matthew 12)', href: '/ethics-speech', desc: 'The tongue, James says, no human being can tame. The mouth speaks the overflow of the heart — so speech is never managed' },
 { name: 'Technology and AI — The Image No Machine Can Wear (Genesis 1 & 3)', href: '/ethics-technology-ai', desc: 'Human dignity is not computed from capacity; it is conferred by God. A machine may out-think you and never bear His imag' },
 { name: 'The End of Life — Whose Days Were They Anyway? (Psalm 139)', href: '/ethics-end-of-life', desc: 'My life, my death, my choice is the last frontier of human autonomy. Scripture says all your days were ordained before o' },
 { name: 'The Image in the Womb — The Sanctity of Life and the Grace That Stoops (Psalm 139)', href: '/ethics-abortion', desc: 'The dignity of the unborn rests not on capacity or being wanted, but on the image of God conferred from conception. The ' },
 { name: 'Theological Ethics — Grace That Changes How You Live', href: '/theological-ethics-hub', desc: 'Theological ethics applies the doctrines of grace to lived life — abortion, sexuality, marriage, work, wealth, technolog' },
 { name: 'Wealth and Stewardship — You Cannot Serve God and Money (Matthew 6:24)', href: '/ethics-wealth-stewardship', desc: 'Jesus treats money not as a neutral tool but as a rival god. Grace breaks its grip: generosity is not a tax on the Chris' },
 { name: 'Work and Vocation — Why Your Job Is Not Your Justification (Colossians 3:23)', href: '/ethics-work-vocation', desc: 'Work is older than the fall and dignified by the God who works. But grace pulls work down from the throne the modern wor' }
 ]
 },
 {
 name: 'Old Testament',
 icon: '',
 href: '/ot-hub',
 count: 14,
 pages: [
 { name: '"Not Because You Were More" — Why God Chose Israel', href: '/ot-israel-chosen', desc: 'There may be no passage in the Old Testament that demolishes merit-based theology more thoroughly than Deuteronomy 7:6-8' },
 { name: '"You Meant It for Evil, but God Meant It for Good"', href: '/ot-joseph', desc: 'Genesis 50:20 is the clearest statement of God\'s sovereignty over evil in all of Scripture. Joseph\'s brothers devised ' },
 { name: 'Abel and Cain: The Bible\'s First Election', href: '/ot-abel-cain', desc: 'Two brothers. Identical circumstances. One God who chose.' },
 { name: 'Abraham & Election: The Call That Creates Faith', href: '/ot-abraham', desc: 'Then God spoke. "The LORD had said to Abram, \'Go from your country, your people and your father\'s household to the lan' },
 { name: 'David: God\'s Sovereign Election for Kingship', href: '/ot-david', desc: 'God sends Samuel to Bethlehem with a mission: anoint a new king from the house of Jesse. What follows is a masterclass i' },
 { name: 'Election Didn\'t Start in the New Testament — The Old Testament Proves It', href: '/ot-election', desc: 'Before Paul ever wrote Romans 9, the Old Testament was already saturated with sovereign election. From Abel to the proph' },
 { name: 'Isaiah: The Servant & God\'s Immutable Counsel', href: '/ot-isaiah-servant', desc: 'Isaiah\'s God declares the end from the beginning and accomplishes all His purpose — and the Servant of the Songs is His' },
 { name: 'Jacob Over Esau: God Chose Before They Were Born', href: '/ot-jacob-esau', desc: 'Before Jacob or Esau had done anything good or bad, God chose. Romans 9 uses this moment to prove that election has noth' },
 { name: 'Jeremiah: Called Before Formation', href: '/ot-jeremiah', desc: 'Jeremiah 1:5 — God knew, consecrated, and appointed Jeremiah before he was formed. Three divine actions before birth. Ze' },
 { name: 'Jonah: The Prophet Who Tried to Outrun God', href: '/ot-jonah', desc: 'Jonah ran from God and discovered what everyone discovers: you cannot outrun divine sovereignty. The worst sermon in his' },
 { name: 'Moses, Pharaoh, and the God Who Hardened a King\'s Heart', href: '/ot-moses-pharaoh', desc: 'Two men, two destinies, one sovereign God. Moses receives mercy; Pharaoh receives hardening. Both were decreed before ei' },
 { name: 'Noah: Chosen for Preservation', href: '/ot-noah', desc: 'Not "most inclinations." Every. Not "often evil." All the time. Not mixed or neutral — evil. The human heart was not sic' },
 { name: 'The Remnant — How God Has Always Preserved His Chosen Few', href: '/ot-prophets-remnant', desc: 'A pattern runs through every prophetic book: judgment falls, nations crumble — and God preserves a remnant He chose. Jer' },
 { name: 'When God Answered Suffering with Sovereignty', href: '/ot-job', desc: 'Job lost everything and demanded answers. God gave him something better: Himself.' }
 ]
 },
 {
 name: 'Scripture Deep Dives',
 icon: '',
 href: '/verse-explorer',
 count: 10,
 pages: [
 { name: '2 Thessalonians 2:13 — God Chose You as Firstfruits to Be Saved', href: '/2-thessalonians-2-13', desc: 'Paul' },
 { name: 'Acts 13:48 — All Who Were Appointed for Eternal Life Believed', href: '/acts-13-48', desc: 'Luke' },
 { name: 'Ephesians 1:3-14 — The One-Sentence Eulogy of Eternal Election', href: '/ephesians-1-3-14', desc: 'Twelve verses. One sentence in Greek. Three movements — Father, Son, Spirit — with the same refrain at the seam of each:' },
 { name: 'Every Bible Verse That Teaches Faith Is a Gift from God', href: '/scripture-tsunami-faith-as-gift', desc: '30+ Bible verses proving faith is a gift of God, not a human achievement. From Genesis to Revelation, Scripture is unani' },
 { name: 'Every Verse Teaching God\'s Sovereignty Over Salvation', href: '/scripture-tsunami-sovereignty', desc: 'This page does not hand you one verse to parry; it hands you the whole Bible, from Genesis to Revelation, testifying wit' },
 { name: 'John 6:37-44 — All Those the Father Gives Me Will Come', href: '/john-6-37-44', desc: 'In one paragraph at Capernaum, Jesus stacked four monergistic claims: the Father gives, the given come, the Son loses no' },
 { name: 'Romans 3:10-18 — The Indictment Nobody Escapes', href: '/romans-3-10-18', desc: 'Paul weaves six Old Testament passages into a seven-charge indictment of the entire human race: no one righteous, no one' },
 { name: 'Romans 8:28-39: The Chain No One Can Break', href: '/romans-8-28-39', desc: 'Five links. One chain. Every link forged by God alone. The Golden Chain of Romans 8 — foreknowledge, predestination, cal' },
 { name: 'Romans 9 Deep Dive — The Chapter That Settles It', href: '/romans-9-deep-dive', desc: 'Verse-by-verse through the load-bearing chapter of the doctrines of grace. Paul anticipates every Arminian objection in ' },
 { name: 'Romans 9:1-24: The Potter and the Clay', href: '/romans-9-1-24', desc: 'Romans 9 walked verse by verse — Jacob and Esau, Pharaoh, the potter and the clay. Paul removes every human contribution' }
 ]
 },
 {
 name: 'Connections',
 icon: '',
 href: '/connections',
 count: 1,
 pages: [
 { name: 'The Unbreakable Thread – Sovereignty Across All of Scripture', href: '/connections', desc: 'Old Testament patterns, New Testament witnesses, logical arguments, historical quotes, and typological proofs — all poin' }
 ]
 },
 {
 name: 'Essays',
 icon: '',
 href: '/essays',
 count: 1,
 pages: [
 { name: 'Essays — The Case for Sovereign Grace, Argued in Full', href: '/essays', desc: 'Long-form arguments that leave no escape. Eleven essays making the full case for sovereign grace — from Scripture, logic' }
 ]
 }
 ]
 },
 {
 umbrella: 'Demolition Zone',
 icon: '',
 desc: 'Tearing down the lies — from Scripture, logic, and science',
 href: '/demolition-hub',
 subcategories: [
 {
 name: 'Verse by Verse',
 icon: '',
 href: '/demolition-hub',
 count: 57,
 pages: [
 { name: '"Choose This Day Whom You Will Serve"', href: '/demolition-joshua24-15', desc: 'Does Joshua 24:15 prove free will? Three verses later, Joshua answers that question himself — and the answer is devastat' },
 { name: '"Christ Died for All"', href: '/demolition-2cor5-14-15', desc: '"One died for all, and therefore all died" — Paul\'s logic is union, not arithmetic.' },
 { name: '"Faith Is Not a Gift"', href: '/demolition-faith-is-not-a-gift', desc: 'The most popular objection to faith as a gift collapses under its own weight. Philippians 1:29 is unambiguous. And rejec' },
 { name: '"God Commands All to Repent"', href: '/demolition-acts17-30', desc: 'Acts 17:30 commands all people to repent — but a command does not prove ability. Jesus commands perfection (Matthew 5:48' },
 { name: '"Grace Has Appeared to All" — What Titus 2:11 Really Means', href: '/demolition-titus2-11', desc: 'In Titus 2:1-10, Paul addresses every social category — old men, young women, slaves.' },
 { name: '"He Tasted Death for Everyone"', href: '/demolition-hebrews2-9', desc: '"He tasted death for everyone" feels like a wall against particular redemption — until you let the author define "everyo' },
 { name: '"If You Declare, You Will Be Saved"', href: '/demolition-romans10-9', desc: 'Romans 10:9 describes the means of salvation, not its source. The faith and confession required are themselves gifts fro' },
 { name: '"In Christ All Will Be Made Alive" — But Who Are the "All"?', href: '/demolition-1cor15-22', desc: '1 Corinthians 15:22 — “As in Adam all die, so in Christ all will be made alive.” The two “alls” are parallel: all who ar' },
 { name: '"Savior of All People"', href: '/demolition-1tim4-10', desc: 'If God is the "Savior of all people," why aren' },
 { name: '"The Master Who Bought Them"', href: '/demolition-2peter2-1', desc: 'Does 2 Peter 2:1 prove universal atonement? Peter describes wolves in sheep\'s clothing — false teachers never truly reg' },
 { name: '"Work Out Your Salvation"', href: '/demolition-philippians2-12-13', desc: 'The Arminian reads "work out your salvation" and exhales — finally, a verse that puts the ball in human hands.' },
 { name: '"You Always Resist the Holy Spirit"', href: '/demolition-acts7-51', desc: 'Acts 7:51 is the Arminian trump card against irresistible grace. But Stephen is describing resistance to the external ca' },
 { name: '1 Corinthians 10:13 — "A Way Out" Is Not Libertarian Free Will', href: '/demolition-1cor10-13', desc: '1 Corinthians 10:13 is cited to prove sinners have the innate power to choose righteousness.' },
 { name: '1 Peter 1:5 — "Shielded Through Faith" Demolished', href: '/demolition-1peter1-5', desc: '"Who through faith are shielded by God\'s power until the coming of the salvation that is ready to be revealed in the la' },
 { name: '2 Corinthians 6:1-2 — "Not in Vain" Demolished', href: '/demolition-2cor6-1', desc: '"As God\'s co-workers we urge you not to receive God\'s grace in vain." Arminians read this as proof that real saving gr' },
 { name: '2 Peter 1:10 — Does "Make Your Calling Sure" Prove You Can Lose It?', href: '/demolition-2peter1-10', desc: 'Peter' },
 { name: '2 Peter 2:20-22 — Does "A Dog Returns to Its Vomit" Prove the Saved Can Be Lost?', href: '/demolition-2pet2-20', desc: 'Peter does not call them fallen sheep. He calls them a dog and a washed pig — animals whose nature never changed. The wa' },
 { name: '2 Peter 3:15 — &ldquo;Our Lord\'s Patience Means Salvation&rdquo;', href: '/demolition-2peter3-15', desc: 'Arminian readers extend &ldquo;our Lord\'s patience means salvation&rdquo; to mean &ldquo;God is patient with everyone i' },
 { name: 'Acts 2:21 / Romans 10:13 — "Everyone Who Calls" Demolished', href: '/demolition-acts2-21', desc: '"Everyone who calls on the name of the Lord will be saved" is read as proof that every human being possesses the native ' },
 { name: 'Arianism — The Ancient Heresy That Tried to Kill Christ\'s Deity', href: '/demolition-arianism', desc: 'Arius (4th century) taught that Christ was the highest created being — not truly God.' },
 { name: 'Can You Lose Your Salvation?', href: '/demolition-hebrews6-4-6', desc: 'Hebrews 6:4-6 names the enlightened, the tasters, the sharers — everything except born again. What the warning passage a' },
 { name: 'Children of Satan — What Scripture Actually Calls the Unregenerate', href: '/demolition-children-of-satan', desc: 'The church speaks of "lost sheep." Jesus spoke of children of the devil . Scripture identifies the unregenerate as ensla' },
 { name: 'Colossians 1:23 — "If You Continue in Your Faith" Demolished', href: '/demolition-col1-23', desc: 'The' },
 { name: 'Cut Off and Thrown Into the Fire — Does John 15 Mean You Can Lose Your Salvation?', href: '/demolition-john15-2', desc: 'He cuts off every branch in me that bears no fruit — does John 15 teach you can lose your salvation? Judas had just left' },
 { name: 'Cut Off from the Root — Why Sin Doesn\'t Wound. It Kills.', href: '/demolition-cut-off-from-root', desc: 'When a creature is severed from the source of its life, corruption is not a punishment imposed from outside. It is what ' },
 { name: 'Demolition: 2 Peter 3:9', href: '/demolition-2peter3-9', desc: '"Not wanting anyone to perish" is addressed to believers ("you"), not to all humanity. The "anyone" and "everyone" are s' },
 { name: 'Demolition: James 4:7-8', href: '/demolition-james4-7-8', desc: 'The favorite synergism proof-text — and the verses immediately before and after that prove it cannot mean what Arminians' },
 { name: 'Demolition: John 12:32 — "I Will Draw ALL People"', href: '/demolition-john12-32', desc: '"I will draw all people to myself" sounds like universal grace until you meet the Greek — helkō, the word for hauling, d' },
 { name: 'Demolition: Matthew 7:7 — "Ask, Seek, Knock"', href: '/demolition-matt7-7', desc: 'The favorite seeker-friendly verse, taken out of its own sermon. The context, the Greek, and the Father-to-children fram' },
 { name: 'Deuteronomy 30:19 — "Choose Life" and the Free Will Myth', href: '/demolition-deut30-19', desc: 'The verse most often used as a free-will proof-text is addressed to an already-elect covenant nation, not to unregenerat' },
 { name: 'Did C.S. Lewis Refute Calvinism? — What They Won\'t Tell You', href: '/counter-cs-lewis-free-will', desc: 'But does Scripture teach this? Not "does it sound reasonable?" — does God\'s Word say this is how salvation works?' },
 { name: 'Does "The Whole World" in 1 John 2:2 Prove Universal Atonement?', href: '/demolition-1john2-2', desc: 'So slow down. Read it again. And this time, do not move past the word propitiation.' },
 { name: 'Does God Take Pleasure in Death?', href: '/demolition-ezekiel18-23', desc: 'What Ezekiel 18:23 actually means — and why the prophet\'s own words destroy the Arminian reading.' },
 { name: 'Does God Want Everyone Saved?', href: '/demolition-1tim2-4', desc: 'God "wants all people to be saved" — but Paul wrote that sentence two verses after commanding prayer "for all people' },
 { name: 'Ezekiel 33:11 — "I Take No Pleasure in the Death of the Wicked"', href: '/demolition-ezekiel33-11', desc: 'God takes no pleasure in the death of the wicked — the verse brought out when every other argument fails. Read in contex' },
 { name: 'FACTS Check — The Arminian Framework Dismantled Point by Point', href: '/demolition-arminian-facts', desc: 'The Society of Evangelical Arminians built a framework called FACTS. We examine each point with seminary-level exegesis ' },
 { name: 'Galatians 5:4 — Can a Christian Really "Fall from Grace"?', href: '/demolition-galatians5-4', desc: 'The verse Arminians use to prove a believer can lose salvation says the opposite of what they think.' },
 { name: 'Hebrews 10:26-29 — Can Deliberate Sin Damn a Christian?', href: '/demolition-hebrews10-26', desc: 'The verse Arminians cite more than any other to prove you can lose your salvation. Read past verse 29 and you will find ' },
 { name: 'Hebrews 3:12-14 — The Warning That Proves Perseverance', href: '/demolition-hebrews3-12', desc: 'The warning against hard hearts and falling away is cited as a death blow to eternal security. Read the verse that comes' },
 { name: 'Hosea 11:7-8 — "How Can I Give You Up?" Demolished', href: '/demolition-hosea11-7-8', desc: 'Hosea 11:8 — “How can I give you up, Ephraim?” Read on to verse 9, God’s anguished love is covenant faithfulness that wi' },
 { name: 'Isaiah 5:1-7 — The Vineyard Song Demolished', href: '/demolition-isaiah5-1-7', desc: 'Isaiah 5’s Song of the Vineyard — “What more could I have done?” is covenant-lawsuit rhetoric against national Israel, n' },
 { name: 'Jeremiah 18:1-12 — The Potter Demolished', href: '/demolition-jer18', desc: 'Jeremiah 18’s potter and clay: the conditional warnings to nations don’t make God’s sovereignty conditional — they displ' },
 { name: 'John 1:29 — Does "the Lamb of God" Take Away the Sin of Every Individual?', href: '/demolition-john1-29', desc: 'If the Lamb actually takes away the sin of every individual, hell is empty. The verb is too strong for the universal rea' },
 { name: 'John 3:16 — Does "The World" Mean Every Individual?', href: '/demolition-john3-16', desc: 'John 3:16 is the most quoted verse against sovereign grace. But its own context — the verses everyone skips — proves the' },
 { name: 'John 5:40 — &ldquo;You Refuse to Come to Me&rdquo;', href: '/demolition-john5-40', desc: 'Arminian readers cite John 5:40 as proof of autonomous free will. The verse proves the opposite: total depravity in acti' },
 { name: 'Jude 21 — "Keep Yourselves in God\'s Love"', href: '/demolition-jude21', desc: 'The Arminian argument from Jude 21 runs simply: if Jude commands Christians to keep themselves in God\'s love, it must b' },
 { name: 'Mark 16:16 — &ldquo;Whoever Believes&rdquo;', href: '/demolition-mark16-16', desc: 'Arminian readers seize on Mark 16:16 as proof that belief is a free human act. The verse is silent on the source of beli' },
 { name: 'Matthew 11:28 — &ldquo;Come to Me, All You Who Are Weary&rdquo;', href: '/demolition-matt11-28', desc: 'Arminian readers cite Matthew 11:28 as proof that Jesus extends a saving call to every individual without exception. Rea' },
 { name: 'Matthew 23:37 — The Verse They Think Disproves Sovereignty', href: '/demolition-matthew-23-37', desc: 'The verse Arminians throw — "you were not willing" — turns on two wills and two subjects: Christ longed to gather the ch' },
 { name: 'Prevenient Grace — The Doctrine Scripture Never Teaches', href: '/demolition-prevenient-grace', desc: 'This is the doctrine that lets the Arminian sleep at night. The invisible scaffolding holding up the entire "I chose God' },
 { name: 'Revelation 22:17 — "Whoever Is Thirsty" Is Not a Universal Offer', href: '/demolition-rev22-17', desc: 'The closing verse of the Bible is cited as the ultimate proof of free-will salvation. Read the whole sentence and it tur' },
 { name: 'Revelation 3:20 — "I Stand at the Door and Knock" Is Not an Altar Call', href: '/demolition-rev3-20', desc: 'Revelation 3:20 is addressed to the church at Laodicea — believers who have grown lukewarm, not unbelievers hearing the ' },
 { name: 'Romans 11:32 — &ldquo;Mercy on Them All&rdquo;', href: '/demolition-romans11-32', desc: 'Arminian and universalist readers seize on &ldquo;mercy on them all&rdquo; as proof that God intends to save every indiv' },
 { name: 'Romans 2:4 — Does "Kindness Leads to Repentance" Prove Prevenient Grace?', href: '/demolition-romans2-4', desc: 'Romans 2:4 is the great proof-text for prevenient grace. But in context, Paul is indicting the unrepentant moralist — an' },
 { name: 'The Orthodox Case Against Predestination', href: '/demolition-orthodox-predestination', desc: 'The Eastern Orthodox argument against predestination cites one verse partially, quotes six philosophers, quotes zero Eas' },
 { name: 'The Strongest Case for Free Will — And Why It Still Breaks', href: '/demolition-steel-man-arminianism', desc: 'We built the strongest possible case for Arminian free will — fairer than most Arminians build it themselves. Then we as' },
 { name: 'Works-Righteousness — Why "I Just Believed" Is the Oldest Claim There Is', href: '/demolition-works-righteousness', desc: 'The humblest-sounding sentence in modern evangelicalism is a works-righteousness claim in disguise. Faith that originate' }
 ]
 },
 {
 name: 'Logic & Philosophy',
 icon: '',
 href: '/philosophy-problem-of-merit',
 count: 36,
 pages: [
 { name: 'Could God Not Simply Forgive? — Why the Cross Had to Happen', href: '/analytical-necessity-of-the-atonement', desc: 'If forgiveness is free — release the grudge, move on — the cross looks like overkill. But forgiveness has never once bee' },
 { name: 'For His Own Sake — Is God\'s Glory Divine Ego?', href: '/analytical-glory-and-election', desc: 'If God chose you for His glory, are you a child or a trophy? The objection has teeth — until you notice which attribute ' },
 { name: 'If You Chose God, What Makes You Better Than Those Who Didn\'t?', href: '/philosophy-problem-of-merit', desc: 'The Problem of Merit: if your choice was the deciding factor, then something in you — intelligence, humility, openness —' },
 { name: 'No God Behind God — Divine Simplicity and the Character of Election', href: '/analytical-divine-simplicity', desc: 'The oldest fear in religion is that behind the loving Christ stands a colder will signing lists. Divine simplicity close' },
 { name: 'People Change — Immutability and the God Who Cannot', href: '/analytical-immutability', desc: 'Two words have ended more loves than death has: people change. Malachi hangs your survival on the one Being who cannot b' },
 { name: 'The Adam Test: The Cleanest Experiment in Free Will Ever Run', href: '/philosophy-adam-test', desc: 'Adam had no sin nature, no broken environment, no evil bent. He had perfect free will. He used it to fall. So why do you' },
 { name: 'The Fire That Needs No Fuel — Impassibility and the Love That Cannot Be Provoked', href: '/analytical-impassibility', desc: 'Every love you have ever known had to be fed — and every love that is fed can starve. The first thing God showed Moses w' },
 { name: 'The God Who Owes Nothing — Aseity and the Logic of the Decree', href: '/analytical-aseity-and-decree', desc: 'God has life in Himself and needs nothing from anyone. Follow that one attribute with logical rigor and conditional elec' },
 { name: 'The Gödelian Prison: Why No Soul Can Save Itself', href: '/philosophy-godel-incompleteness', desc: 'In 1931, Kurt Gödel proved that no system can validate itself from within. Your soul is a system. It cannot prove its ow' },
 { name: 'The Gravity of Grace: Why You Never Chose to Be Held', href: '/philosophy-gravity-of-grace', desc: 'The pressure of the floor against your feet is a force you never chose, never consented to, and never once resented — an' },
 { name: 'The Immune System You Never Asked For', href: '/philosophy-immune-system-grace', desc: 'Right now your immune system is fighting battles you never authorized, using weapons you didn\'t design, against enemies' },
 { name: 'The Inheritance Paradox', href: '/philosophy-inheritance-paradox', desc: 'We celebrate the man who inherits a fortune he never earned, yet we bristle at grace given on the same terms — unmerited' },
 { name: 'The Letter That Thinks It Wrote Itself — Information and the Image of God', href: '/analytical-information-and-imago', desc: 'Information theory has one unbreakable law: messages do not write themselves. Your DNA is a text you received. Your lang' },
 { name: 'The Mirror You Refuse to Look In — Why Grace Reveals What We Really Are', href: '/philosophy-mirror-you-refuse', desc: 'There is a mirror in every soul, and we arrange our whole lives never to stand before it. The intellectual objections to' },
 { name: 'The Münchhausen Trilemma of Self-Salvation', href: '/philosophy-munchhausen-trilemma', desc: 'Every justification leads to infinite regress, circular reasoning, or an uncaused cause. Apply this to faith and you hit' },
 { name: 'The Observer Effect of Sin', href: '/philosophy-observer-effect-sin', desc: 'You cannot assess your own freedom using the faculty whose freedom is in question. The instrument of measurement IS the ' },
 { name: 'The Overflow and the Gift — Answering Modal Collapse', href: '/analytical-modal-collapse-answered', desc: 'The sharpest objection to sovereign grace says a necessary God with an eternal decree makes everything necessary — freed' },
 { name: 'The Phantom Limb of Free Will', href: '/philosophy-phantom-limb-free-will', desc: 'An amputee feels fingers that are no longer there — the brain\'s map persists after the limb is gone, generating vivid s' },
 { name: 'The Philosophical Case for God\'s Sovereignty', href: '/philosophy-hub', desc: 'What happens when you follow logic all the way to its conclusion? You end up at grace. The mirror of the soul, the probl' },
 { name: 'The Prisoner\'s Dilemma of Salvation', href: '/philosophy-prisoners-dilemma', desc: 'Game theory proved that self-interested agents always betray each other without an external enforcer. The soul does the ' },
 { name: 'The Resistance Is the Proof — Why We Blame God Before We Blame Ourselves', href: '/philosophy-resistance-is-proof', desc: 'Show someone the case for God' },
 { name: 'The Same Self, Made New — Personal Identity and the New Birth', href: '/analytical-identity-regeneration', desc: 'If God removes your heart of stone and gives you a new one — new birth, new creation, new self — who exactly got saved? ' },
 { name: 'The Script You Didn\'t Write', href: '/philosophy-theater-script', desc: 'Improv performers are limited to their own depth — and so is a soul that tries to improvise its own salvation.' },
 { name: 'The Self-Deception Engine — How a Mind Lies to Itself and Believes It', href: '/philosophy-self-deception', desc: 'How can you catch yourself lying to yourself? Philosophers have puzzled at this for centuries. Scripture named the lock ' },
 { name: 'The Truth With No Truthmaker — The Grounding Objection to Molinism', href: '/analytical-grounding-objection-molinism', desc: 'Molinism rescues free will by giving God a library of truths no one wrote — what every possible person would freely do. ' },
 { name: 'The Whisper Is True — Knowing God Without Comprehending Him', href: '/analytical-archetypal-ectypal', desc: 'You can look up almost anything — so a God you cannot fully understand feels like a defect. The old theologians knew bet' },
 { name: 'Try to Believe the Sky Is Green. You Can\'t. That\'s the Point.', href: '/philosophy-bootstrap-paradox', desc: 'You cannot believe something by deciding to believe it. This is doxastic involuntarism — the most airtight proof that sa' },
 { name: 'What If You\'re Wrong? — The Soteriological Pascal\'s Wager', href: '/philosophy-what-if-wrong', desc: 'A devastating asymmetry argument: the risk profile of Arminianism vs. Calvinism. Which theological position has the more' },
 { name: 'Why "I Chose God" Is a Sentence That Destroys Itself', href: '/philosophy-infinite-regress-of-choice', desc: 'Why "I chose God" is a sentence that destroys itself.' },
 { name: 'Why "I Found Jesus" Fits on a T-Shirt and "Jesus Found Me" Never Will', href: '/philosophy-i-found-jesus-t-shirt', desc: 'One phrase is on ten million shirts. The other almost never appears. The grammar of how we tell our conversion is a tell' },
 { name: 'Why Exclusive Love Is the Only Real Love', href: '/philosophy-exclusive-love', desc: 'The word "love" has been stretched until it means mere benevolence — wishing everyone well in general.' },
 { name: 'Why Is Marriage Special? A Philosophical Proof of Election', href: '/philosophy-marriage-election', desc: 'A proposal moves us to tears not because someone offered marriage but because someone, surveying a world of billions, sa' },
 { name: 'Why You Can\'t Will Yourself to Sleep', href: '/philosophy-sleep-surrender', desc: 'You cannot command sleep into coming — the harder you try, the more it flees. The insomniac meets the wall where the wil' },
 { name: 'You Didn\'t Choose to Be Born', href: '/philosophy-children-argument', desc: 'You didn\'t choose your parents, your DNA, your century, your language, or your temperament. Everything that makes you y' },
 { name: 'Your Mother Tongue Chose You', href: '/philosophy-mother-tongue', desc: 'No child decides to learn their native language. It happens to them. The deepest structure of your mind was given, not c' },
 { name: 'Your Salvation Doesn\'t Revolve Around You', href: '/philosophy-copernican-revolution', desc: 'For a lifetime, salvation seemed to revolve around your decision. The Copernican shift of the soul is discovering the ce' }
 ]
 },
 {
 name: 'Secular Evidence',
 icon: '',
 href: '/secular-evidence',
 count: 13,
 pages: [
 { name: 'Art & Literature — How the Greatest Writers Intuited Reformed Truth', href: '/secular-art-literature-reformed-truth', desc: 'Shakespeare, Dostoevsky, Flannery O’Connor, McCarthy — the greatest writers keep testifying to total depravity and grace' },
 { name: 'Every Recovery Program Begins with Total Depravity', href: '/secular-recovery-total-depravity', desc: 'The 12 Steps accidentally confess Reformed theology. Step 1 is total depravity. Step 2 is regeneration. Step 3 is faith ' },
 { name: 'Every Social Experiment Confirms What Scripture Already Knew', href: '/secular-sociology-human-inability', desc: 'Milgram. Asch. The Good Samaritan study. Sociology spent a century proving what Paul said first: the human heart default' },
 { name: 'Modern Psychology Keeps Proving Total Depravity', href: '/secular-psychology-bondage-of-will', desc: 'Cognitive bias, addiction research, and neuroscience confirm what the Reformers taught 500 years ago: the human will is ' },
 { name: 'Philosophy\'s 2,500-Year Verdict on Free Will', href: '/secular-philosophy-free-will', desc: '59% of professional philosophers reject libertarian free will. The position Arminianism requires is a minority view even' },
 { name: 'The Algorithm Knows You Better Than You Know Yourself', href: '/secular-algorithm-sovereignty', desc: 'Predictive algorithms know what you\'ll choose before you know it — with 80-93% accuracy — using only partial data about' },
 { name: 'The Billion Decisions Your Body Made Today Without Asking', href: '/secular-billion-decisions', desc: 'Your body made more decisions before you woke up this morning than you will consciously make in your entire life.' },
 { name: 'The Hard Problem of Consciousness — And What It Points To', href: '/secular-hard-problem-consciousness', desc: 'Science can map every synapse in your brain but cannot explain why it feels like something to be you. The Hard Problem o' },
 { name: 'The History of Sovereignty', href: '/secular-history-sovereignty', desc: 'Secular historians have documented patterns they cannot explain: the rise and fall of empires, the convergence of imposs' },
 { name: 'What AI Teaches Us About Free Will', href: '/secular-ai-determinism', desc: 'The skeptic insists his will is free while denying a machine could ever be — yet his desires were shaped by data, upbrin' },
 { name: 'Why Every Economist Assumes Total Depravity', href: '/secular-economics-depravity', desc: 'Economics has always assumed what Scripture teaches: humans are self-interested, short-sighted, and prone to exploitatio' },
 { name: 'Written Before You Were Born: DNA and Sovereignty', href: '/secular-genetics-sovereignty', desc: 'You did not choose your genes, your temperament, the wiring that makes you reach for a book instead of a ball — and the ' },
 { name: 'Your Brain Decided Before You Did', href: '/secular-neuroscience-human-inability', desc: 'In 1983, Benjamin Libet discovered that the brain commits to a "decision" a third of a second before consciousness is aw' }
 ]
 }
 ]
 },
 {
 umbrella: 'Why We Resist',
 icon: '',
 desc: 'Why grace is so hard to accept — and what breaks through',
 href: '/psychology-hub',
 subcategories: [
 {
 name: 'Psychology of Resistance',
 icon: '',
 href: '/psychology-hub',
 count: 31,
 pages: [
 { name: ' Are You Sure You\'re Saved?', href: '/psychology-cost-of-rejecting-grace', desc: 'One question exposes the most dangerous lie in the church: where did your faith come from? If you produced it, you are t' },
 { name: 'How We Secretly Redefine Grace to Include Ourselves', href: '/resistance-redefining-grace', desc: 'You think you understand grace. But have you unconsciously redefined it to include your own contribution? A gentle demol' },
 { name: 'Pride: The Root of Every Objection to Grace', href: '/psychology-pride-root-objection', desc: 'People who can calmly debate baptism, the Trinity , and the millennium will slam a fist on the table when you suggest Go' },
 { name: 'Terror Management and the Threat of Sovereignty', href: '/psychology-terror-management', desc: 'Ernest Becker\'s Pulitzer Prize-winning thesis — studied across 500+ experiments — reveals that humans manage death anxi' },
 { name: 'The Anosognosia of the Soul', href: '/psychology-anosognosia-of-sin', desc: 'Anosognosia is a neurological condition where brain damage destroys both a capacity and the ability to perceive its loss' },
 { name: 'The Autonomy Illusion — Why "Free Will" Feels So Real', href: '/psychology-autonomy-illusion', desc: 'Libet' },
 { name: 'The Conversion Memory Test', href: '/psychology-conversion-memory-test', desc: 'Try to locate the exact instant you chose God and your memory dissolves — not the season, not the sermon, but the precis' },
 { name: 'The Credit Thief Inside Your Brain', href: '/psychology-attribution-error', desc: 'The fundamental attribution error: we credit our own good choices to wisdom and others’ to luck. Applied to faith, it ex' },
 { name: 'The Language You Already Speak', href: '/psychology-language-you-already-speak', desc: 'Christians instinctively narrate their conversion in the passive voice — found, drawn, rescued, broken. That instinct is' },
 { name: 'The Last Idol: Why Self-Sovereignty Is the Hardest Thing to Surrender', href: '/resistance-last-idol', desc: 'Self-sovereignty is the idol that hides behind every other idol — the conviction that you are the captain of your soul. ' },
 { name: 'The Question Beneath the Question', href: '/psychology-the-question-beneath-the-question', desc: 'Every objection to grace is a refraction of a deeper question the objector has not yet been brave enough to ask.' },
 { name: 'The Sincerity Trap', href: '/psychology-sincerity-trap', desc: 'Why the warmest, most sincere believers are often the hardest to reach with truth. How sincerity itself becomes the armo' },
 { name: 'The Stockholm Syndrome of Sin: Why We Defend Our Bondage', href: '/psychology-stockholm-syndrome-sin', desc: 'Hostages bond with their captors. Sinners bond with their sin. Why the enslaved will fights for the prison and defends t' },
 { name: 'The Sunk Cost of Self-Made Faith', href: '/psychology-sunk-cost-faith', desc: 'The sunk cost fallacy — the tendency to keep investing in something because of what you\'ve already spent — explains why' },
 { name: 'What Every Recovering Addict Already Knows About Salvation', href: '/psychology-addiction-proof', desc: 'The 12 steps prove what Scripture teaches: the will is enslaved and freedom comes only through a power greater than ours' },
 { name: 'When Your Heart Rejects What Your Mind Accepts', href: '/psychology-emotional-vs-rational', desc: 'You can read Romans 9 , follow the logic, even teach it — and still feel your heart refuse what your mind concedes.' },
 { name: 'Why Believing You Saved Yourself Feels Right', href: '/psychology-comfort-self-salvation', desc: '"Where, then, is boasting? It is excluded. Because of what law? The law that requires works? No, because of the law that' },
 { name: 'Why Do People Reject What They Know Is True?', href: '/psychology-suppressing-truth', desc: 'Romans 1:18 reveals the deepest human problem: we suppress what we already know about God. Modern psychology calls it mo' },
 { name: 'Why Do We Resist Predestination? The Psychology Explained', href: '/psychology-why-we-resist', desc: 'Why do intelligent, Bible-believing Christians reject predestination? Psychology reveals motivated reasoning, cognitive ' },
 { name: 'Why Does God\'s Sovereignty Terrify Us?', href: '/psychology-fear-control', desc: 'When you hear "God is sovereign," the objection that rises in your chest is not intellectual — it is visceral. Four psyc' },
 { name: 'Why Evidence Makes Some People Believe Harder', href: '/psychology-backfire-effect', desc: 'Why does showing someone Scripture about election make them believe harder in free will? The backfire effect reveals how' },
 { name: 'Why Grace Feels Like an Attack on Your Identity', href: '/psychology-identity-threat', desc: 'Why does grace feel like an attack on your identity? Identity-protective cognition explains how belief becomes self-conc' },
 { name: 'Why Grace Makes You Angry — And What That Anger Reveals', href: '/psychology-offense-of-grace', desc: 'Why does unconditional election trigger moral outrage? Moral Foundations Theory and psychological reactance explain the ' },
 { name: 'Why People Defend the Theology That Enslaves Them', href: '/psychology-system-justification', desc: 'System Justification Theory explains why people defend systems that hurt them — and why millions of Christians fiercely ' },
 { name: 'Why the Truth That Makes You Angriest Is the One That Will Set You Free', href: '/psychology-hostility-reaction', desc: 'Why the doctrines of grace provoke explosive hostility: they threaten not a theology but an identity. The amygdala fires' },
 { name: 'Why This Objection Proves Our Point', href: '/psychology-why-this-objection-proves-our-point', desc: 'The most common objection to the Crown Jewel argument — "I don\'t claim credit for my salvation; I just chose to accept ' },
 { name: 'Why Your Church All Believes the Same Thing', href: '/psychology-groupthink', desc: 'Why do church friends all believe the same theology? Discover how conformity bias, groupthink, and social identity keep ' },
 { name: 'Why Your Soul Rebels When It Hears the Truth', href: '/psychology-reactance-theory', desc: 'In 1966, psychologist Jack Brehm documented what happens when someone threatens your perceived freedom: your brain fires' },
 { name: 'You Didn\'t Choose Your Mother Tongue', href: '/psychology-language-acquisition', desc: 'No child decides to learn language. Grammar arrives uninvited, rewires the brain, and gives the child a world they never' },
 { name: 'Your Brain Decides Before You Do', href: '/psychology-illusion-free-will', desc: 'In 1983, Benjamin Libet proved that the brain commits to an action 350-550 milliseconds before conscious awareness. In 2' },
 { name: 'Your Brain Is Lying to You — And the Bible Knew It First', href: '/psychology-cognitive-biases', desc: 'Cognitive biases mapped to biblical descriptions of fallen thinking. Confirmation bias, anchoring, Dunning-Kruger — mode' }
 ]
 },
 {
 name: 'Stories, Parables & Analogies',
 icon: '',
 href: '/stories',
 count: 39,
 pages: [
 { name: 'A Baby Doesn\'t Interview for a Family', href: '/analogy-adoption', desc: 'An orphan does not sign their own adoption papers . They do not evaluate the parents. They do not approve the transactio' },
 { name: 'A Love Letter Written Before Time Began', href: '/story-the-letter-before-the-world', desc: 'She found a letter her father wrote before she was born — before he even knew he would adopt her. A tender story about b' },
 { name: 'Can a Stone Heart Choose to Beat?', href: '/story-surgeon-stone-heart', desc: 'A surgeon gives a dying patient a new heart without asking permission. The patient wakes up alive — not because he chose' },
 { name: 'Did You Really Choose God?', href: '/story-the-room-where-you-chose', desc: 'Pull a golden thread back through time, watching how the moment you thought was your choice—when you decided to follow G' },
 { name: 'Letters from a Senior Demon', href: '/letters-senior-demon-arminianism', desc: 'Four letters from a senior demon to his junior tempter, on the usefulness of keeping an evangelical inside the Arminian ' },
 { name: 'Martin Luther\'s Thunderstorm', href: '/story-historical-luther-storm', desc: 'A terrified young man caught in a thunderstorm vows to become a monk, then spends years trying to earn a peace that will' },
 { name: 'Real Conversions: What Actually Happens When God Saves Someone', href: '/story-real-conversions', desc: 'Seven witnesses across the centuries — Augustine in the garden, Luther in his cell, Newton on a sinking ship — take the ' },
 { name: 'The Altar He Built Himself', href: '/story-dark-the-altar-he-built-himself', desc: 'Marcus built his faith with his own hands — a perfect life, a perfect church, a perfect testimony. Then God tore it down' },
 { name: 'The Chess Grandmaster', href: '/analogy-chess-grandmaster', desc: 'A grandmaster does not cheat the novice of real moves; she simply cannot lose. So with God — your choices are genuinely ' },
 { name: 'The Committee to Save Yourself', href: '/story-humor-committee-to-save-yourself', desc: 'A town of drowning people forms a committee to rescue themselves. A satirical story about the absurdity of trying to sav' },
 { name: 'The Cross-Examination', href: '/story-cross-examination', desc: 'A courtroom drama where the doctrine of free will faces cross-examination by Scripture itself. When your answers collide' },
 { name: 'The Day You Got to Choose Again', href: '/story-thought-the-day-you-chose-again', desc: 'What if God gave you the chance to choose Him again — but this time you could see everything clearly? A thought experime' },
 { name: 'The Dead City — A Parable About Sin and Grace', href: '/story-the-dead-city', desc: 'An allegory about spiritual death and regeneration. Why the dead in sin cannot choose God — and why the Voice that awake' },
 { name: 'The Drowning Man Who Said He Could Swim', href: '/story-hard-hitting-the-drowning-man', desc: 'A hard-hitting parable. A drowning man keeps insisting he can swim while the water fills his lungs. The rescue boat is i' },
 { name: 'The Drowning Man Who Thinks He\'s Swimming', href: '/analogy-drowning-man', desc: 'The most popular gospel illustration pictures a drowning man who grabs a rope. But Scripture does not say you were drown' },
 { name: 'The Fingerprint Before the World', href: '/story-children-the-fingerprint-before-the-world', desc: 'A little girl asks her mother how God could have known her before she was born. Her mother reaches for a lamp, a cookie,' },
 { name: 'The Fish Who Chose the Ocean', href: '/story-the-fish-who-chose-the-ocean', desc: 'Did you choose God, or did God choose you? A parable about a fish who thought he chose the ocean — until an old turtle a' },
 { name: 'The Garden That Grew Itself — Can You Save Yourself?', href: '/story-the-garden-that-grew-itself', desc: 'A fable for the young — and for those who have forgotten what it is like to be planted.' },
 { name: 'The Gardener Who Waited', href: '/story-tender-the-gardener-who-waited', desc: 'A father tends a garden and grieves a prodigal son. A tender story about sovereignty, waiting, and the seeds only God ca' },
 { name: 'The God Who Let You Watch', href: '/story-thought-the-god-who-let-you-watch', desc: 'What if God pulled back the curtain and let you watch the moment He chose you — before you existed, before the world beg' },
 { name: 'The King Who Chose His Children', href: '/story-children-the-king-who-chose', desc: 'A children\'s story about a King who chose his children before they could ask — and the God whose choosing works the sam' },
 { name: 'The King\'s Banquet: A Parable About Election and Grace', href: '/story-the-kings-banquet', desc: 'A King prepares a feast, and those first invited refuse. So the servants are sent to "compel them to come in" — and the ' },
 { name: 'The Lazarus Argument: Dead People Don\'t Choose to Live', href: '/analogy-lazarus-grave', desc: 'A dead man heard a voice and walked out of his grave. This is what Scripture teaches about salvation: not invitation, bu' },
 { name: 'The Letter Already Written', href: '/story-tender-the-letter-already-written', desc: 'Mara opened the envelope on her worst day expecting a list of her sins. What she found was a letter written before she w' },
 { name: 'The Machine That Asked Why', href: '/story-thought-the-machine-that-asked-why', desc: 'A small robot is asked what it wants. It computes, chooses, and reports. Then the engineer asks a single follow-up quest' },
 { name: 'The Man Who Sued God for Saving Him Without Consent', href: '/story-humor-the-man-who-sued-god', desc: 'Gerald Pemberton filed a formal complaint against the Almighty for violating his autonomy by saving him without permissi' },
 { name: 'The Man Who Tried to Make Himself Hungry', href: '/story-humor-the-man-who-tried-to-make-himself-hungry', desc: 'A philosopher decides he will not eat another bite until he has proven his hunger is his own. The results are funny unti' },
 { name: 'The Night Augustine Stole the Pears', href: '/story-historical-augustine-pears', desc: 'At sixteen, Augustine stole wormy pears he didn\'t want, threw them to pigs, and felt only the thrill of transgression—p' },
 { name: 'The Orchestra That Thinks It Wrote the Symphony', href: '/analogy-orchestra', desc: 'Every musician plays with real skill, real passion, real artistry. And every note was written before they arrived. The o' },
 { name: 'The Orphanage — A Story About Being Chosen by Grace', href: '/story-the-orphanage', desc: 'Every child believed they chose their family. Then one girl found the records room.' },
 { name: 'The Person Who Chose God — A Dark Thought Experiment', href: '/story-the-person-who-chose-god', desc: 'Imagine someone who chose God entirely on their own — no grace, no regeneration, no gift of faith. What would that look ' },
 { name: 'The Prodigal Was Already Home', href: '/analogy-the-prodigal-already-home', desc: 'The boy was the father' },
 { name: 'The River That Thinks It Chose Its Path', href: '/analogy-river', desc: 'A river flows freely — rushing, turning, cascading. But every twist was determined by terrain shaped before the first dr' },
 { name: 'The Rope You Wove Yourself', href: '/story-dark-the-rope-you-wove-yourself', desc: 'A man falls into a well. He climbs out on a rope he believes he wove himself. Years later, in the daylight, he sees what' },
 { name: 'The Self-Made Man: A Story About Self-Salvation', href: '/story-the-self-made-man', desc: 'A man takes credit for everything — his parents, his mind, his fortune, even his finding of God — and the comedy curdles' },
 { name: 'The Song You Didn\'t Compose — Why Beauty Proves Grace', href: '/analogy-song-you-didnt-compose', desc: 'Beauty moves you without your permission. It acts on you from outside. That is exactly how grace works — and the proof i' },
 { name: 'The Woman Who Earned Her Seat', href: '/story-dark-the-woman-who-earned-her-seat', desc: 'She tithed. She served. She never missed a Sunday. Then the worst sinner in town walked into her church forgiven, and sh' },
 { name: 'Who Turns On the Light?', href: '/analogy-light-switch', desc: 'Faith is like a light switch — real, necessary, genuinely flipped by you. But if there\'s no electricity, the switch doe' },
 { name: 'Why the Spiritually Dead Cannot Choose God', href: '/analogy-doctor-corpse', desc: 'A corpse does not cooperate with its own resurrection. Neither did you.' }
 ]
 }
 ]
 },
 {
 umbrella: 'Through the Ages',
 icon: '',
 desc: 'Grace throughout church history',
 href: '/history-timeline',
 subcategories: [
 {
 name: 'Church History',
 icon: '',
 href: '/history-timeline',
 count: 27,
 pages: [
 { name: '2,000 Years of Sovereign Grace', href: '/history-golden-thread', desc: 'From Paul to Augustine to Luther to Spurgeon to today — God has preserved the truth of sovereign grace through every cen' },
 { name: 'Augustine vs Pelagius — The Trial That Saved Christianity', href: '/history-augustine-pelagius', desc: 'In the 5th century, two visions of humanity clashed: one said you could reach God on your own, the other said you were d' },
 { name: 'Did the Early Church Believe in Sovereign Grace?', href: '/history-apostolic', desc: 'What did the people who learned the faith directly from the apostles believe about salvation?' },
 { name: 'Every Great Revival Was Led by a Calvinist', href: '/history-every-revival-sovereign-grace', desc: 'Every time in the last five hundred years the Spirit of God moved in a way that emptied taverns, shook cities, and left ' },
 { name: 'John Calvin and Geneva — The Architect of Grace', href: '/history-calvin-geneva', desc: 'John Calvin was a shy French scholar who wanted nothing more than a quiet life of study. God had other plans.' },
 { name: 'Martin Luther and The Bondage of the Will', href: '/history-luther', desc: 'The world remembers the hammer, the ninety-five theses, the cry of "Here I stand." Luther remembered something else.' },
 { name: 'My Only Comfort in Life and Death — The Heidelberg Catechism', href: '/creed-heidelberg-catechism', desc: 'The Heidelberg Catechism (1563): its famous first question asks “What is your only comfort in life and in death?” — that' },
 { name: 'Open Theism: The Heresy That Finally Said the Quiet Part Out Loud', href: '/history-open-theism', desc: 'For 1,600 years the flesh has been smuggling in a God whose knowledge depends on your choices. Open theism just removed ' },
 { name: 'The African Fathers: Augustine Wasn\'t Alone', href: '/history-african-fathers', desc: 'Before Augustine, before Europe, before Calvin — North African Christians were already preaching the sovereignty of grac' },
 { name: 'The Canons of Dort — Line by Line in Plain English', href: '/canons-of-dort-plain-english', desc: 'The Canons of Dort rendered into plain modern English. All five heads of doctrine, article by article, with the rejectio' },
 { name: 'The Canons of Dort — The Confession That Defended Grace Against Works', href: '/creed-canons-dort', desc: 'In 1619, the church put sovereign grace on trial — and grace won.' },
 { name: 'The Council of Orange (529 AD)', href: '/history-council-of-orange', desc: 'In 529 AD, the church formally condemned the belief that humans can initiate faith without God\'s grace — the exact posi' },
 { name: 'The Great Awakening — When Sovereign Grace Set America on Fire', href: '/history-great-awakening', desc: 'Edwards preached. Whitefield thundered. Entire towns converted — not by clever marketing, but by sovereign grace. The Gr' },
 { name: 'The Heresy That Won\'t Die — Election by Foreseen Faith', href: '/history-heresy-foreknowledge', desc: 'The claim that God elects based on foreseen faith has been proposed, refuted, and resurrected for 1,600 years. Three chu' },
 { name: 'The Heresy That Won\'t Die — The Free Will Defense', href: '/history-heresy-free-will', desc: 'The claim that humans have free will to choose God has been proposed, refuted, and resurrected for 2,000 years. Every ti' },
 { name: 'The Invention of Decision Theology', href: '/history-decision-theology', desc: 'The phrase "accept Jesus into your heart" is not in the Bible.' },
 { name: 'The Puritans — When Theology Set Nations on Fire', href: '/history-puritans', desc: 'Owen. Bunyan. Edwards. The Westminster Assembly. For 150 years, Puritan theology was fire in the bones — devotional dept' },
 { name: 'The Pyongyang Revival: When Sovereign Grace Shook Korea', href: '/history-korean-revival', desc: 'In 1907, the Holy Spirit fell on Pyongyang with a power that eyewitnesses compared to Pentecost. The theology behind the' },
 { name: 'The Reformed Resurgence — How Sovereign Grace Came Back in the 20th Century', href: '/history-20th-century', desc: 'Liberal theology gutted the mainline before 1920. God raised Machen, Lloyd-Jones, Sproul, and MacArthur as guardians of ' },
 { name: 'The Synod of Dort — When the Church Formally Chose Grace Over Works', href: '/history-dort', desc: 'In 1619, 89 theologians from 8 countries examined Arminianism against Scripture and rejected it point by point. The five' },
 { name: 'The Synod of Dort: Five Points Forged in Fire', href: '/history-dort-deep', desc: 'For six months in 1618-1619, the Reformed church put Arminianism on trial. Eighty-four theologians from eight nations. F' },
 { name: 'Westminster Confession Chapter 3 in Plain English', href: '/westminster-chapter-3-plain-english', desc: 'The Westminster Confession of Faith was written by roughly 150 of the finest theological minds in seventeenth-century En' },
 { name: 'When Spurgeon Stood Alone for Truth', href: '/history-spurgeon-downgrade', desc: 'The most beloved preacher in the world saw his denomination abandoning biblical truth — and said so publicly. It cost hi' },
 { name: 'When the Gospel Almost Died', href: '/history-medieval', desc: 'Sovereign grace is the ancient stream — works and merit crept in late. A thousand years of medieval theology, and the ha' },
 { name: 'Where Sovereign Grace Stands Now — The Global Picture', href: '/history-today', desc: 'Reformed theology is exploding in Africa, Asia, and Latin America. The digital reformation is reaching people no mission' },
 { name: 'Whitefield vs. Wesley — Two Revivals, One Question', href: '/history-whitefield-wesley', desc: 'George Whitefield and John Wesley both shook nations with revival fire — but they disagreed on the one question that mat' },
 { name: 'Written in Blood and Fire', href: '/history-confessions-story', desc: 'The Belgic Confession, Heidelberg Catechism, Canons of Dort, Westminster Standards, 1689 Baptist Confession — behind eve' }
 ]
 },
 {
 name: 'Theologian Profiles',
 icon: '',
 href: '/theologians',
 count: 19,
 pages: [
 { name: 'Amazing Grace: The Hymn That Proves What You Already Believe', href: '/hymn-amazing-grace', desc: 'Every line of "Amazing Grace" is a confession of sovereign grace . "Wretch" confesses total depravity . "Lost" and "blin' },
 { name: 'Anselm of Canterbury', href: '/theologian-anselm', desc: 'Anselm proved God exists through reason alone—proving God must be sovereign. His atonement theology showed salvation can' },
 { name: 'Augustine: The Rebel God Hunted Down', href: '/theologian-augustine', desc: 'Augustine of Hippo spent decades running from God — through lust, philosophy, and heresy. God caught him anyway. His the' },
 { name: 'B.B. Warfield: The Lion of Princeton', href: '/theologian-warfield', desc: 'Benjamin Breckinridge Warfield (1851-1921) — Reformed theologian who defended inerrancy and sovereign grace for 34 years' },
 { name: 'Charles Spurgeon', href: '/theologian-spurgeon', desc: 'Charles Haddon Spurgeon: the greatest preacher of the nineteenth century, who proved that Calvinism is not cold theology' },
 { name: 'George Whitefield: The Voice That Shook a Nation Awake', href: '/theologian-whitefield', desc: 'George Whitefield: the greatest evangelist of the Great Awakening, a thoroughgoing Calvinist who proved that election fu' },
 { name: 'Gottschalk of Orbais', href: '/theologian-gottschalk', desc: 'A 9th-century monk taught double predestination from Augustine and was beaten, imprisoned, and silenced for 20 years. He' },
 { name: 'J. Gresham Machen — The Scholar Who Stood When Everyone Else Bowed', href: '/theologian-machen', desc: 'When liberalism captured Princeton, J. Gresham Machen refused to bend. He proved that liberalism was not Christianity at' },
 { name: 'Jacobus Arminius: The Man Behind the Movement', href: '/theologian-arminius', desc: 'A respectful but honest treatment of Jacobus Arminius. His background, training under Beza, the five Remonstrant article' },
 { name: 'John Bunyan: The Tinker Who Could Not Mend His Own Soul', href: '/theologian-bunyan', desc: 'John Bunyan mended pots for a living and could not mend his own soul. From a Bedford jail cell he wrote The Pilgrim' },
 { name: 'John Calvin — The Theologian of God\'s Sovereignty', href: '/theologian-calvin', desc: 'His name became an epithet — "Calvinist," the word people spit when they cannot refute what they hate. But Calvin never ' },
 { name: 'John Owen: The Cross That Loses None', href: '/theologian-owen', desc: 'John Owen buried all eleven of his children. He also wrote the book — The Death of Death in the Death of Christ — that h' },
 { name: 'John Wycliffe — The Morning Star of the Reformation', href: '/theologian-wycliffe', desc: 'Rome burned John Wycliffe\'s bones 44 years after his death—not to destroy the man, but to suppress the idea he\'d relea' },
 { name: 'Jonathan Edwards — The Mind That Set a Nation on Fire', href: '/theologian-edwards', desc: 'Jonathan Edwards saw that the will is never free in the way we imagine — it always follows what the heart most loves, an' },
 { name: 'Martin Luther: The Monk Who Broke the Church to Save It', href: '/theologian-luther', desc: 'In 1505, a twenty-one-year-old law student was nearly killed by lightning outside Erfurt. In terror he cried out to St. ' },
 { name: 'Martyn Lloyd-Jones — The Doctor Who Left Medicine to Diagnose the Soul', href: '/theologian-lloydjones', desc: 'He left a royal physician' },
 { name: 'R.C. Sproul: The Theologian Grace Wouldn\'t Release', href: '/theologian-sproul', desc: 'Robert Charles Sproul arrived in seminary determined to refute Calvinism from the inside — and walked out conquered by R' },
 { name: 'Thomas Boston: The Scottish Pastor Who Fought Legalism with Grace', href: '/theologian-boston', desc: 'Thomas Boston (1676-1732) spent his life in tiny Scottish parishes and changed the faith of a nation. His recovery of fr' },
 { name: 'Thomas Bradwardine — The Mathematician Who Proved God\'s Sovereignty', href: '/theologian-bradwardine', desc: 'A 14th-century mathematician brought equations to bear on the doctrines of grace — and forty days after becoming Archbis' }
 ]
 }
 ]
 },
 {
 umbrella: 'Go Deeper',
 icon: '',
 desc: 'The scholarly depth — sources, word studies, sermons, and printables',
 href: '/reformed-sources',
 subcategories: [
 {
 name: 'The Reformed Library',
 icon: '',
 href: '/reformed-sources',
 count: 1,
 pages: [
 { name: 'The Reformed Source Library — Read the Tradition Itself', href: '/reformed-sources', desc: 'A free library of 113 complete Reformed and Puritan works — Augustine, Calvin, Luther, Owen, Edwards, Spurgeon, Bavinck,' }
 ]
 },
 {
 name: 'Word Studies',
 icon: '',
 href: '/word-study-every-all',
 count: 2,
 pages: [
 { name: 'The Word "All" — A Lexical Study of Pas / Panta', href: '/word-study-every-all', desc: 'Arminian theology lives or dies on a handful of verses.' },
 { name: 'The Word "World" — A Lexical Study of Kosmos', href: '/word-study-every-world', desc: 'The Greek word kosmos carries at least five distinct senses in the New Testament. The universal-atonement reading leans ' }
 ]
 },
 {
 name: 'Sermons & Quotes',
 icon: '',
 href: '/sermons',
 count: 3,
 pages: [
 { name: 'Quote Cards — Single Sentences You Can Share', href: '/quote-cards', desc: 'Ten quote cards drawn from the final-line hammers of the printables. 1080×1080 SVG. Free to download. Free to share. Fre' },
 { name: 'Sermons & Meditations — Written to Be Read Aloud', href: '/sermons', desc: 'A curated path through the pieces on this site that were written to be spoken — for the pastor preparing a homily, the s' },
 { name: 'The Gallery of Arresting Lines', href: '/quotes', desc: 'Twenty-four sentences from across this site, pulled out and framed like paintings. Each one points back to the page that' }
 ]
 },
 {
 name: 'Printables & Tools',
 icon: '',
 href: '/printables',
 count: 17,
 pages: [
 { name: 'Adopted by Grace — The Papers Were Signed Before You Were Born (Printable One-Pager)', href: '/printable-adoption', desc: 'The doctrine of adoption on one printable page. Huiothesia — the Greek word for placement as a son. Abba, the Aramaic th' },
 { name: 'But God — Ephesians 2:1-10 on a Printable Page', href: '/printable-eph-2', desc: 'Ephesians 2:1-10 in one printable page. The two words that split history in two — But God. Dead in sin, made alive with ' },
 { name: 'Dead, Not Sick — Total Depravity on a Printable Page', href: '/printable-total-depravity', desc: 'The doctrine the other four points rest upon, distilled to one printable page. Genesis 6:5, Jeremiah 17:9, Romans 3:10-1' },
 { name: 'Faith Is a Gift — The Crown Jewel on a Printable Page', href: '/printable-faith-is-a-gift', desc: 'Ephesians 2:8-9 closes every escape hatch. Faith is the gift. To claim credit for your faith is the very works-righteous' },
 { name: 'Held Forever — Perseverance on a Printable Page', href: '/printable-perseverance', desc: 'The doctrine the saints have died with on one printable page. John 10:28-29, Philippians 1:6, 1 Peter 1:5, Hebrews 7:25 ' },
 { name: 'It Is Finished — The Cross You Cannot Add To (Printable One-Pager)', href: '/printable-the-cross', desc: 'The cross interpreted by the doctrines of grace, on one printable page. Tetelestai — the Greek word that closes the ledg' },
 { name: 'Printable One-Pagers — Handouts You Can Take Off the Screen', href: '/printables', desc: 'Single-page printable handouts distilling the core arguments of this site — the gospel, the five points, Romans 9, the c' },
 { name: 'Romans 9 — The Chapter the Church Tried to Soften (Printable One-Pager)', href: '/printable-romans-9', desc: 'Romans 9:10-24 in NIV with seven observations no honest reader can dodge. The twins before they existed, the mercy that ' },
 { name: 'The Bread No One Can Eat Alone — John 6 on a Printable Page', href: '/printable-john-6', desc: 'John 6:35-68 in one printable page. The bread-of-life discourse, the verse the church has tried to soften for two thousa' },
 { name: 'The Five Points — Plain English Printable One-Pager', href: '/printable-five-points', desc: 'Not TULIP as a slogan. Each point in one plain-English sentence, one anchor verse, one sentence of catch. Five points, f' },
 { name: 'The Golden Chain — Romans 8:28-39 on a Printable Page', href: '/printable-romans-8-28-39', desc: 'Romans 8:28-39 in one printable page. Five links no one forged. One Hand no one can pry open. The chapter that has held ' },
 { name: 'The Gospel in One Page — Printable Handout', href: '/printable-gospel-in-one-page', desc: 'The full gospel of sovereign grace — from dead in sin to held forever — on one printable page. Handout for a friend who ' },
 { name: 'The Mirror — Twelve Questions on a Printable Page', href: '/printable-the-mirror', desc: 'Twelve quiet questions on one printable page. Not about your theology — about your heart. The mirror Scripture holds up,' },
 { name: 'The Twelve Lethal Moves — A Pastoral Reference Card', href: '/printable-twelve-lethal-moves', desc: 'The twelve named techniques the church' },
 { name: 'The Voice That Wakes the Dead — The Effectual Call on a Printable Page', href: '/printable-effectual-call', desc: 'The effectual call on one printable page. The general invitation that goes out to all and the particular summons that ra' },
 { name: 'Verse Navigator — The Twelve Texts That Built the Case', href: '/verse-navigator', desc: 'Twelve verses, four groups, one conclusion. Before time began, the drawing, the gift of faith, and the promise you canno' },
 { name: 'Where Did Your Faith Come From? — Printable One-Pager', href: '/printable-where-did-your-faith-come-from', desc: 'Seven questions, each something the reader already believes, walking to one unavoidable conclusion: your faith was given' }
 ]
 }
 ]
 },
 {
 umbrella: 'Rest in Grace',
 icon: '',
 desc: 'When the truth shatters you — grace catches you',
 href: '/devotionals',
 subcategories: [
 {
 name: 'Devotionals',
 icon: '',
 href: '/devotionals',
 count: 41,
 pages: [
 { name: 'Can God Stop Loving You?', href: '/devotional-never-gives-up', desc: 'God chose you before time existed. He holds you in two unbreakable hands. Nothing in all creation can separate you from ' },
 { name: 'Can You Lose God\'s Love? What "Forever" Actually Means', href: '/devotional-forever-loved', desc: 'Nothing in creation can separate you from a love that was set on you before the world existed. Paul searched the cosmos ' },
 { name: 'Chosen Before You Were Broken', href: '/devotional-chosen-before-you-were-broken', desc: 'You were chosen before the creation of the world — before any sin, before any shame, before any breaking. The love that ' },
 { name: 'Drawn, Not Dragged — The Gentleness of Irresistible Grace', href: '/devotional-drawn-not-dragged', desc: 'Your fear of irresistible grace is that you would be dragged to God — your will overridden, your personhood crushed, a m' },
 { name: 'For the Secretly Ashamed', href: '/devotional-the-secretly-ashamed', desc: 'The tab closed too fast, the heart still racing in the dark — and the shame whispers that someone who loves Jesus could ' },
 { name: 'Found Before You Were Born', href: '/devotional-found-before-you-were-born', desc: 'A keepsake devotional for the soul when the silence comes back. You were not chosen because He saw what you' },
 { name: 'He Loved You Before the World Was Made', href: '/devotional-love-before-the-world', desc: 'Before time. Before space. Before anything existed — God loved you. A meditation on the eternal, electing love that pred' },
 { name: 'Held Without Asking — The Comfort of Involuntary Safety', href: '/devotional-held-without-asking', desc: 'You were held before you knew to ask. A devotional on the strange comfort of a love that did not wait for your invitatio' },
 { name: 'I Can\'t Feel God Anymore', href: '/devotional-i-cant-feel-god', desc: 'You pray and nothing comes back. No warmth, no whisper. The numbness is not abandonment — your standing never rested on ' },
 { name: 'I Don\'t Think I\'m Saved', href: '/devotional-i-dont-think-im-saved', desc: 'The house is asleep around you and the thought sitting on your chest is a stone: I don\'t think I\'m really saved. Read ' },
 { name: 'I Was Lazarus — And I Did Not Volunteer to Rise', href: '/devotional-i-was-lazarus', desc: 'Lazarus did not hear the offer of resurrection from inside the tomb and decide to accept. Lazarus was dead. Dead men do ' },
 { name: 'In Christ — The Two Words That Change Everything', href: '/devotional-in-christ', desc: 'Paul uses "in Christ," "in Him," or "in the Beloved" eleven times in twelve verses (Ephesians 1:3-14).' },
 { name: 'My Chains Fell Away', href: '/devotional-my-chains-fell-away', desc: 'What does it feel like when God breaks your chains? A devotional on the moment grace becomes irresistible — when the sou' },
 { name: 'Rescued Without a Say', href: '/devotional-rescued-without-a-say', desc: 'A child unconscious in a smoke-filled room does not consent to the firefighter, does not vote, does not assist — and is ' },
 { name: 'The First Prayer After Surrender', href: '/devotional-the-first-prayer-after-surrender', desc: 'When everything you thought was yours has just been handed back to God — what do you pray? A devotional on the shape of ' },
 { name: 'The Freedom of Not Choosing', href: '/devotional-the-freedom-of-not-choosing', desc: 'You were afraid of losing your free will. What you actually lost was a burden. What you gained was rest. A devotional on' },
 { name: 'The Glory of Divine Choice', href: '/devotional-glory-of-divine-choice', desc: 'God did not see you coming and decide to pick you. He chose you before time, in love, according to the purpose of His wi' },
 { name: 'The God Who Wastes Nothing', href: '/devotional-the-god-who-wastes-nothing', desc: 'The pain you carry was not an accident. The God who numbered the hairs on your head numbered the tears on your face. A d' },
 { name: 'The Good That I Cannot Do', href: '/devotional-good-i-cannot-do', desc: 'Paul' },
 { name: 'The Ground Disappeared — And Something Caught You', href: '/devotional-the-ground-disappeared', desc: 'A devotional for the reader whose foundation just collapsed. The demolition was real. But the arms underneath were older' },
 { name: 'The Hands That Hold You — Your Faith Was Never Yours to Lose', href: '/devotional-the-hands-that-hold-you', desc: 'Your faith is not held up by your grip. It is held in the hands of God. A devotional for anyone terrified they will lose' },
 { name: 'The Joy of Election', href: '/devotional-joy-of-election', desc: 'For years the truth of election terrified me. Then one day the gravity settled and I saw what I had missed — there is no' },
 { name: 'The Kindest Shock — Why Sovereignty Felt Violent and Was Actually Love', href: '/devotional-the-kindest-shock', desc: 'The moment sovereignty landed on you, it felt violent. Like being hit. Like being exposed. Like losing control. You are ' },
 { name: 'The Love Letter God Wrote Before Time Began', href: '/devotional-love-letter-before-time', desc: 'Your grandmother dies. You clean out the attic. In a box of yellowed letters, one envelope has your name on it.' },
 { name: 'The Morning You Wake Up New', href: '/devotional-the-morning-you-wake-up-new', desc: 'For the reader facing the first morning after surrender. The old self is dead. The new self is unfamiliar. A devotional ' },
 { name: 'The Prayer You Didn\'t Pray', href: '/devotional-the-prayer-you-didnt-pray', desc: 'You think you reached out to God. But what if God reached out first — and the prayer was the proof? A devotional on the ' },
 { name: 'The Quiet After the Storm', href: '/devotional-the-quiet-after-the-storm', desc: 'The arguing is over. The defenses are down. A devotional for the reader on the other side of the paradigm shatter, sitti' },
 { name: 'The Shepherd Came Looking', href: '/devotional-the-shepherd-came-looking', desc: 'The lost sheep does not find its way home. The Shepherd leaves the ninety-nine and comes looking. A devotional on being ' },
 { name: 'The Weight Lifted — What Comes Off When You Let Go', href: '/devotional-the-weight-lifted', desc: 'For years you were carrying a weight you did not know you were carrying. The weight of being your own savior. A devotion' },
 { name: 'Valley of the Shadow', href: '/devotional-valley-shadow', desc: 'Psalm 23 does not promise God will remove the valley. It promises He walks through it with you — and because He is sover' },
 { name: 'What Does "Dead in Sin" Actually Mean? More Than You Think.', href: '/devotional-dead-who-live', desc: 'Ephesians 2:1 says you were dead — not struggling, not searching, dead. This devotional explores what spiritual death re' },
 { name: 'What If Surrendering Your Will Is Where Joy Begins?', href: '/devotional-not-my-will-but-joy', desc: 'In Gethsemane, the one Person with the greatest claim to His own will surrendered it completely. A devotional on the joy' },
 { name: 'When God Says No — A Devotional on Unanswered Prayer', href: '/devotional-when-god-says-no', desc: 'Sometimes God says no. And His refusal is more loving than our yes would have been. A devotional meditation on unanswere' },
 { name: 'When God\'s Power Works Through Your Weakness', href: '/devotional-weakness-of-gods-strength', desc: 'Paul begged God three times to remove the thorn. God said no — then filled the refusal with something better: "My power ' },
 { name: 'When Pride Dies — The Funeral You Didn\'t Know You Needed', href: '/devotional-when-pride-dies', desc: 'The death of the hero-self is the birth of the beloved-self. A devotional for the reader standing at the funeral of thei' },
 { name: 'You Are Not the Hero', href: '/devotional-you-are-not-the-hero', desc: 'You spent your life trying to be the hero of your own story. A devotional for the exhausted reader who has just realized' },
 { name: 'You Cannot Undo Being Chosen', href: '/devotional-you-cannot-undo-being-chosen', desc: 'You woke up this morning certain you had finally done it — the sin, the doubt, the failure that proved you weren\'t one ' },
 { name: 'You Were Wanted Before You Were', href: '/devotional-you-were-wanted-before-you-were', desc: 'Before you existed, you were loved. Before your heart had beaten once, your name was being said in eternity. A devotiona' },
 { name: 'Your Heart Used to Burn. Now It\'s Barely Warm.', href: '/devotional-cold-church', desc: 'The numbness you have named peace may be lukewarmness, a sleep so quiet it feels like faith. You cannot warm your own he' },
 { name: 'Your Name in the Book', href: '/devotional-your-name-in-the-book', desc: 'There is a book. It has a name. It is called the Lamb\'s Book of Life . Names were written in it from the creation of th' },
 { name: 'Your Name Was Written Before You Were Born', href: '/devotional-adoption-papers', desc: 'A child does not negotiate his own adoption; the papers are signed over his head, his name written by another\'s hand. S' }
 ]
 },
 {
 name: 'Healing & Hope',
 icon: '',
 href: '/anxious-mind-what-if-not-chosen',
 count: 44,
 pages: [
 { name: 'Religious OCD — When Your Mind Won\'t Stop Accusing You', href: '/anxious-mind-scrupulosity', desc: 'The blasphemous thought that ambushes your prayers is not your heart speaking. It is your fear speaking — and a soul ind' },
 { name: 'The Ache of Watching Others Feel What You Can\'t', href: '/invisible-wall-spiritual-envy', desc: 'Spiritual envy — watching others seem to experience God while you feel nothing — is one of the loneliest experiences a b' },
 { name: 'The Anxious Mind — When Your Brain Won\'t Stop Screaming', href: '/anxious-mind-hub', desc: 'For those whose minds won\'t stop screaming. God holds you despite what your mind keeps screaming.' },
 { name: 'The Broken Mirror — When You Believe You\'re Not Enough', href: '/broken-mirror-hub', desc: 'You weren\'t an accident. You weren\'t a mistake. You were created as a vessel for mercy—designed to receive what you co' },
 { name: 'The Child You Never Held — After Miscarriage and Infant Loss', href: '/open-wound-miscarriage', desc: 'You are grieving someone the world tells you to get over. But you carried them. You loved them. And the God who knit the' },
 { name: 'The Christian Who Feels Like a Fraud', href: '/broken-mirror-imposter-syndrome', desc: 'Imposter syndrome about faith torments the very people most genuinely converted — because a real fraud would not worry a' },
 { name: 'The Friend Who Left When Your Theology Changed', href: '/invisible-wall-friend-who-left', desc: 'You discovered sovereign grace and the people you love pulled away. The loneliness is real. The loss is real. But so is ' },
 { name: 'The Invisible Wall — When Your Theology Costs You Relationships', href: '/invisible-wall-hub', desc: 'Three in five adults now report being lonely. God\'s sovereignty reveals why—and how you\'re never truly alone.' },
 { name: 'The Loop That Won\'t Break', href: '/anxious-mind-the-loop-that-wont-break', desc: 'The anxious loop — the checking, the replaying, the what-ifs that never stop — is your brain trying to be God. Sovereign' },
 { name: 'The Open Wound — For Those Who Are Suffering', href: '/open-wound-hub', desc: 'For those who have lost someone, live with chronic pain, survived abuse, or asked why bad things happen to good people.' },
 { name: 'The Performance Treadmill', href: '/broken-mirror-performance-treadmill', desc: 'The first thought of the day — what have I not yet done for God? — is the treadmill, and self-care will never stop it be' },
 { name: 'The Prayer God Didn\'t Answer — And What That Means', href: '/open-wound-the-prayer-god-didnt-answer', desc: 'You prayed. You begged. And God said no. Underneath the question why is a harder one: am I still wanted? There are two p' },
 { name: 'The Relapse — When You Fall Back Into the Sin You Thought You\'d Conquered', href: '/broken-mirror-the-relapse', desc: 'You swore you were done. You were certain the last time was the last time. And then you did it again. This is for the mo' },
 { name: 'The Shattered Lens — When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-hub', desc: 'The Shattered Lens: Truth, Trust & the Modern Crisis of Belief. In a world of deepfakes, AI, misinformation, and politic' },
 { name: 'The Sin You Keep Repeating', href: '/broken-mirror-sin-you-repeat', desc: 'You fall. You repent with tears. You promise God never again. Three days later, you\'re back. The voice says: "If you we' },
 { name: 'The Terror That Won\'t Quiet: When You\'re Afraid of Hell', href: '/anxious-mind-fear-of-hell', desc: 'The fear that you might be going to hell is not the verdict it feels like. Fear cannot read the Book of Life — but it ca' },
 { name: 'Three in Five Are Lonely — And It\'s a Theological Problem', href: '/invisible-wall-lonely-theological', desc: 'Loneliness isn\'t a social problem—it\'s a theological one. No friendship count touches it, because humans can never fil' },
 { name: 'What If I\'m Not One of the Chosen?', href: '/anxious-mind-what-if-not-chosen', desc: 'You were never asked to read the sealed decree. God answers this question at an open door: whoever comes is never driven' },
 { name: 'When Everything You Were Taught Was Wrong', href: '/shattered-lens-taught-wrong', desc: 'For the one who opened their Bible and found a God they had never been introduced to.' },
 { name: 'When God Goes Silent — And Faith Shatters', href: '/shattered-lens-silence-of-god', desc: 'You prayed and heard nothing. Faith shatters in the silence. A healing page for those who feel abandoned by God — discov' },
 { name: 'When God Is Sovereign and the Nursery Is Empty', href: '/open-wound-empty-nursery', desc: 'You believe God is in control. And then the ultrasound goes silent. How do you hold sovereignty and miscarriage in the s' },
 { name: 'When Grace Feels Too Good to Be True', href: '/broken-mirror-grace-too-good', desc: 'Your suspicion of grace is not spiritual failure — it is a scar from a lifetime of conditional love.' },
 { name: 'When Prayer Feels Like Talking to the Ceiling', href: '/invisible-wall-prayer-feels-empty', desc: 'You came here because prayer has begun to feel like talking to the ceiling, and you are afraid the silence means God has' },
 { name: 'When Prayer Stopped Working', href: '/shattered-lens-when-prayer-stopped-working', desc: 'When prayer "stops working," the thing that broke is not God and not prayer — it is the lens that made God\'s presence f' },
 { name: 'When Seeing the Truth Cost You Your Community', href: '/shattered-lens-lost-community', desc: 'You discovered sovereign grace and lost your church, your friends, maybe your family. The truth set you free — and it co' },
 { name: 'When the Bible Stopped Making Sense', href: '/shattered-lens-bible-doesnt-make-sense', desc: 'You used to open Scripture and feel it breathe. Now it reads like a foreign document full of problems. That collapse may' },
 { name: 'When the Church Becomes the Wound', href: '/open-wound-betrayed-by-church', desc: 'When the people meant to represent God become the wound itself. How to distinguish Christ from the institution that hurt' },
 { name: 'When the Death Makes No Sense — Grief Without Explanation', href: '/open-wound-senseless-death', desc: 'The casserole has been on the counter for three days because the world that eats casseroles no longer makes sense.' },
 { name: 'When the Diagnosis Is Terminal', href: '/open-wound-terminal-diagnosis', desc: 'The word has been spoken, and your life is partitioned into before and after. The responses people offer — denial, false' },
 { name: 'When You and Your Spouse Speak Different Theological Languages', href: '/invisible-wall-marriage', desc: 'You see something your spouse cannot yet see, and the covenant you share now runs along an invisible wall.' },
 { name: 'When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-cant-tell-true', desc: 'Truth did not break. Your instruments did. The God who cannot lie has been sovereign over every algorithm and every head' },
 { name: 'When You Can\'t Unsee It', href: '/shattered-lens-cant-unsee-it', desc: 'Scripture suddenly reveals a truth you can\'t unsee—God is sovereign in salvation, completely, utterly, without competit' },
 { name: 'When You See It and Your Church Doesn\'t — Singing Alone', href: '/invisible-wall-singing-alone', desc: 'You love your church. You love the people. But something has changed in you — and now the sermons feel incomplete. What ' },
 { name: 'When You\'re the Only One Who Sees It', href: '/invisible-wall-only-one-who-sees', desc: 'You\'ve seen something you can\'t unsee — that salvation is entirely God\'s work — and the people you love most don\'t s' },
 { name: 'When Your Family Doesn\'t See It', href: '/invisible-wall-family', desc: 'You discovered sovereign grace and your family didn\'t. Now there\'s a wall at Thanksgiving — not hostile, just present,' },
 { name: 'When Your Mind Becomes a War Zone', href: '/anxious-mind-intrusive-thoughts', desc: 'The thoughts you cannot stop are not the verdict on your soul — the verdict was rendered elsewhere, and not by your inne' },
 { name: 'When Your Pastor Teaches What You Know Isn\'t True', href: '/shattered-lens-pastor', desc: 'When you see God\'s sovereignty in Scripture and your pastor teaches something different, the guilt feels like rebellion' },
 { name: 'When Your World Collapses and God Is Still Sovereign', href: '/open-wound-sovereignty-in-grief', desc: 'The world you knew ended in a sentence, and now a lie waits in the pain: that if God is sovereign, He must not be good —' },
 { name: 'Why Do Bad Things Happen?', href: '/open-wound-hospital-room', desc: 'Machines, monitors, and the oldest question in the world: why? Every other answer fails you here — random chance leaves ' },
 { name: 'Why You Can Sleep When Everything Is Falling Apart', href: '/anxious-mind-sovereignty-of-sleep', desc: 'Sovereignty is the pillow your head has been looking for. What insomnia reveals about what you actually believe about co' },
 { name: 'You Are Not a Self-Made Anything', href: '/broken-mirror-not-self-made', desc: 'The self-made person is America\'s favorite fiction — and a crushing one to live. You did not author yourself, and that ' },
 { name: 'You Were Never Meant to Carry This', href: '/anxious-mind-never-meant-to-carry', desc: 'Anxiety is the emotional price of believing the outcome depends on you. The same lie that fuels your anxious spiral fuel' },
 { name: 'You Were Not an Accident — You Were Created for Mercy', href: '/broken-mirror-vessels-for-mercy', desc: 'Romans 9 :23 doesn\'t say you received mercy — it says you were created for mercy. The Greek word proētoimasen means "pr' },
 { name: 'Your Brain Decides Before You Do — And That\'s Good News', href: '/anxious-mind-brain-decides', desc: 'Neuroscience suggests your brain stirs before you know your own mind. The secular mind panics — but Scripture already kn' }
 ]
 },
 {
 name: 'Pastoral',
 icon: '',
 href: '/pastoral-assurance',
 count: 6,
 pages: [
 { name: 'Can I Be Sure I\'m Saved?', href: '/pastoral-assurance', desc: 'Assurance does not rest on the strength of your faith or the steadiness of your feelings — it rests on God' },
 { name: 'If God Already Chose, Why Share the Gospel?', href: '/pastoral-evangelism', desc: 'Because your mouth is the very means God ordained to call His elect home. Sovereignty does not kill evangelism. It guara' },
 { name: 'If God Decreed Everything, Why Pray?', href: '/pastoral-prayer', desc: 'If God has already decided everything, why pray? Because He ordained your prayer as one of the means by which His decree' },
 { name: 'What It Feels Like When the Truth Lands', href: '/pastoral-when-truth-lands', desc: 'When the reality of sovereign grace first lands, the ground disappears. A pastoral map for the vertigo, anger, grief, te' },
 { name: 'When Theology Meets Your Actual Life — Pastoral Guidance', href: '/pastoral-hub', desc: 'Assurance in doubt. Courage in evangelism. Power in prayer. Comfort in suffering. This is where the truth about grace st' },
 { name: 'When You\'re Suffering and God Is Sovereign', href: '/pastoral-suffering', desc: 'When suffering strikes, every soul asks: Is anyone in charge? If the answer is no, pain is noise.' }
 ]
 },
 {
 name: 'Joy of Grace',
 icon: '',
 href: '/joy-hub',
 count: 7,
 pages: [
 { name: 'Joy in Suffering: Why Only Sovereign Grace Makes Pain Bearable', href: '/joy-in-suffering', desc: 'When the ground shakes, only one theology holds. Romans 8:28 is bedrock — but only if God is actually sovereign over you' },
 { name: 'The Freedom of Smallness', href: '/joy-freedom-of-smallness', desc: 'You are not the hero of your salvation story. And that is the most liberating discovery of your life.' },
 { name: 'The God Who Is Big Enough', href: '/joy-god-big-enough', desc: 'Your joy can never exceed the size of your God. Discover why sovereign grace reveals a God so infinitely powerful that H' },
 { name: 'The Joy No Other Theology Can Offer', href: '/joy-no-other-theology', desc: 'Why sovereign grace produces a joy that no other theology can match — not incrementally higher, but categorically differ' },
 { name: 'The Security That Changes Everything', href: '/joy-security-changes-everything', desc: 'Assurance of salvation is not arrogance. It is the only rational response to a salvation you didn\'t start and can\'t lo' },
 { name: 'The Staggering Contrast', href: '/joy-staggering-contrast', desc: 'A devastating side-by-side comparison of what Reformed theology and Arminian theology actually produce in the human hear' },
 { name: 'Worship Without a Ceiling', href: '/joy-worship-without-ceiling', desc: 'When you see that every atom of your salvation is grace, your gratitude has no upper limit. Discover why sovereign grace' }
 ]
 },
 {
 name: 'Testimonies',
 icon: '',
 href: '/testimony-hub',
 count: 7,
 pages: [
 { name: 'Augustine — The Voice in the Garden', href: '/testimony-augustine', desc: 'Augustine of Hippo wrestled God for over a decade — until a child\'s voice singing over a garden wall split his fortress' },
 { name: 'Charles Spurgeon — The Snowstorm and the Sentence', href: '/testimony-spurgeon', desc: 'A fifteen-year-old, snowbound in Colchester in January 1850, ducks into a tiny chapel where a substitute lay-preacher re' },
 { name: 'John Bunyan — Grace Abounding to the Chief of Sinners', href: '/testimony-bunyan', desc: 'A swearing tinker convinced he had committed the unforgivable sin spends years in spiritual agony — until a sentence abo' },
 { name: 'John Newton — The Slave-Trader Who Became the Hymn', href: '/testimony-newton', desc: 'A blasphemous slave-ship sailor cries the first sincere prayer of his life on a foundering vessel in the north Atlantic ' },
 { name: 'Martin Luther — The Tower of Mercy', href: '/testimony-luther', desc: 'Martin Luther entered an Augustinian monastery in 1505 to escape divine judgment and met it everywhere he turned. He fas' },
 { name: 'The Wall of the Rescued — Two Thousand Years of "He Found Me"', href: '/testimony-wall', desc: 'Not a list. A wall. Short, searing moments from Scripture and church history where a fugitive was caught by mercy. Two t' },
 { name: 'Your Story Is Received', href: '/testimony-thank-you', desc: 'Your testimony has been received. A real person will read every word.' }
 ]
 }
 ]
 }
 ];

  // === DOM-SAFE INITIALIZATION WRAPPER ===
  // Wraps every handler attachment below so listeners bind even when
  // this script is loaded before the nav markup (some pages have
  // <script src="/nav.js"> up at the top of the body rather than
  // just before </body>). If the DOM isn't ready yet, we defer the
  // whole block to DOMContentLoaded.
  function _navInit() {

  // === HAMBURGER MENU ===
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
  // === NUCLEAR: clone the button to strip ALL prior event listeners ===
  var cleanBtn = hamburger.cloneNode(true);
  hamburger.parentNode.replaceChild(cleanBtn, hamburger);
  hamburger = cleanBtn;

  hamburger.addEventListener('click', function () {
  var isOpen = navLinks.classList.contains('open');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', String(!isOpen));
  document.body.style.overflow = isOpen ? '' : 'hidden';
  // Close mega-menu if open
  closeMegaMenu();
  });

  // Close menu when a link is tapped (but not search input or category section)
  navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  });
  });
  }

  // === MEGA-MENU ===
  var megaMenuToggle = document.getElementById('megaMenuToggle');
  var megaMenu = document.getElementById('megaMenu');

  function openMegaMenu() {
  if (megaMenu) {
  megaMenu.classList.add('open');
  if (megaMenuToggle) {
  megaMenuToggle.classList.add('active');
  megaMenuToggle.setAttribute('aria-expanded', 'true');
  }
  // Close search if open
  closeSearch();
  }
  }

  function closeMegaMenu() {
  if (megaMenu) {
  megaMenu.classList.remove('open');
  if (megaMenuToggle) {
  megaMenuToggle.classList.remove('active');
  megaMenuToggle.setAttribute('aria-expanded', 'false');
  }
  }
  }

  function toggleMegaMenu() {
  if (megaMenu && megaMenu.classList.contains('open')) {
  closeMegaMenu();
  } else {
  openMegaMenu();
  }
  }

  if (megaMenuToggle) {
  megaMenuToggle.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMegaMenu();
  });
  }

  // Close mega-menu when clicking a link inside it
  if (megaMenu) {
  megaMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
  closeMegaMenu();
  });
  });
  }

  // Close mega-menu when clicking outside
  document.addEventListener('click', function (e) {
  if (megaMenu && megaMenu.classList.contains('open')) {
  if (!megaMenu.contains(e.target) && e.target !== megaMenuToggle && !megaMenuToggle.contains(e.target)) {
  closeMegaMenu();
  }
  }
  });

  // === BUILD MEGA-MENU (nested umbrellas with subcategories) ===
  function buildMegaMenu() {
  if (!megaMenu) return;

  // Clear the menu
  megaMenu.innerHTML = '';

  // Build two-panel layout
  var panel = document.createElement('div');
  panel.className = 'mega-menu-panel';

  // Left panel: umbrella list
  var leftPanel = document.createElement('div');
  leftPanel.className = 'mega-menu-cats';

  for (var i = 0; i < MEGA_MENU_DATA.length; i++) {
  var umbrella = MEGA_MENU_DATA[i];
  var umbrellaItem = document.createElement('div');
  umbrellaItem.className = 'mega-menu-cat-item' + (i === 0 ? ' active' : '');
  umbrellaItem.setAttribute('data-index', String(i));
  umbrellaItem.innerHTML = '<span class="mega-menu-cat-icon">' + umbrella.icon + '</span><span class="mega-menu-cat-name">' + escapeHtml(umbrella.umbrella) + '</span>';

  (function(index) {
  umbrellaItem.addEventListener('click', function() {
  setActiveMegaMenuUmbrella(index);
  });
  umbrellaItem.addEventListener('mouseenter', function() {
  setActiveMegaMenuUmbrella(index);
  });
  })(i);

  leftPanel.appendChild(umbrellaItem);
  }

  // Right panel: subcategories with pages
  var rightPanel = document.createElement('div');
  rightPanel.className = 'mega-menu-detail';
  rightPanel.id = 'megaMenuDetail';

  panel.appendChild(leftPanel);
  panel.appendChild(rightPanel);
  megaMenu.appendChild(panel);

  // Initialize with first umbrella (MUST be after DOM insertion so getElementById works)
  setActiveMegaMenuUmbrella(0);
  }

  // Track which subcategory is expanded (null = show subcategory cards only)
  var expandedSubcat = null;

  function setActiveMegaMenuUmbrella(index) {
  if (!megaMenu) return;
  var umbrella = MEGA_MENU_DATA[index];
  if (!umbrella) return;

  // Reset expanded subcategory when switching umbrellas
  expandedSubcat = null;

  // Update left panel active state
  var umbrellaItems = megaMenu.querySelectorAll('.mega-menu-cat-item');
  for (var i = 0; i < umbrellaItems.length; i++) {
  umbrellaItems[i].classList.remove('active');
  }
  if (umbrellaItems[index]) {
  umbrellaItems[index].classList.add('active');
  }

  // Show Level 2: subcategory cards (no articles yet)
  renderSubcategoryCards(index);
  }

  // LEVEL 2: Show subcategory cards for an umbrella (no article list)
  function renderSubcategoryCards(umbrellaIndex) {
  var rightPanel = document.getElementById('megaMenuDetail');
  if (!rightPanel) return;
  var umbrella = MEGA_MENU_DATA[umbrellaIndex];
  if (!umbrella) return;

  var totalPages = 0;
  for (var t = 0; t < umbrella.subcategories.length; t++) {
  totalPages += umbrella.subcategories[t].count;
  }

  var html = '';
  if (umbrella.href) {
  html += '<a href="' + escapeAttr(umbrella.href) + '" class="mega-menu-detail-title mega-menu-hub-link">' + umbrella.icon + ' ' + escapeHtml(umbrella.umbrella) + ' <span class="mega-menu-hub-arrow">→</span></a>';
  } else {
  html += '<div class="mega-menu-detail-title">' + umbrella.icon + ' ' + escapeHtml(umbrella.umbrella) + '</div>';
  }
  html += '<div class="mega-menu-detail-desc">' + escapeHtml(umbrella.desc) + ' <span class="mega-menu-total-count">' + totalPages + ' articles</span></div>';

  // If only 1 subcategory, skip straight to articles
  if (umbrella.subcategories.length === 1) {
  renderSubcategoryArticles(umbrellaIndex, 0);
  return;
  }

  html += '<div class="mega-menu-subcat-grid">';
  for (var s = 0; s < umbrella.subcategories.length; s++) {
  var subcat = umbrella.subcategories[s];
  if (subcat.pages.length === 0) continue;

  html += '<div class="mega-menu-subcat-card" data-umbrella="' + umbrellaIndex + '" data-subcat="' + s + '">';
  html += '<div class="mega-menu-subcat-card-icon">' + subcat.icon + '</div>';
  html += '<div class="mega-menu-subcat-card-name">' + escapeHtml(subcat.name) + '</div>';
  html += '<div class="mega-menu-subcat-card-count">' + subcat.count + ' articles</div>';
  html += '<div class="mega-menu-subcat-card-arrow">Browse →</div>';
  html += '</div>';
  }
  html += '</div>';

  rightPanel.innerHTML = html;

  // Add click listeners to subcategory cards
  var cards = rightPanel.querySelectorAll('.mega-menu-subcat-card');
  for (var c = 0; c < cards.length; c++) {
  (function(card) {
  card.addEventListener('click', function(e) {
  e.stopPropagation(); // Prevent document click handler from closing mega-menu
  var ui = parseInt(card.getAttribute('data-umbrella'), 10);
  var si = parseInt(card.getAttribute('data-subcat'), 10);
  renderSubcategoryArticles(ui, si);
  });
  })(cards[c]);
  }
  }

  // LEVEL 3: Show articles for a specific subcategory (max 8, then "View all")
  function renderSubcategoryArticles(umbrellaIndex, subcatIndex) {
  var rightPanel = document.getElementById('megaMenuDetail');
  if (!rightPanel) return;
  var umbrella = MEGA_MENU_DATA[umbrellaIndex];
  if (!umbrella) return;
  var subcat = umbrella.subcategories[subcatIndex];
  if (!subcat) return;

  var maxShow = 8;
  var html = '';

  // Back button (unless single subcategory)
  if (umbrella.subcategories.length > 1) {
  html += '<div class="mega-menu-back" data-umbrella="' + umbrellaIndex + '">← Back to ' + escapeHtml(umbrella.umbrella) + '</div>';
  }

  if (subcat.href) {
  html += '<a href="' + escapeAttr(subcat.href) + '" class="mega-menu-detail-title mega-menu-hub-link">' + subcat.icon + ' ' + escapeHtml(subcat.name) + ' <span class="mega-menu-hub-arrow">→</span></a>';
  } else {
  html += '<div class="mega-menu-detail-title">' + subcat.icon + ' ' + escapeHtml(subcat.name) + '</div>';
  }
  html += '<div class="mega-menu-detail-desc">' + subcat.count + ' articles</div>';

  html += '<div class="mega-menu-subcat-pages">';
  var showCount = Math.min(subcat.pages.length, maxShow);
  for (var p = 0; p < showCount; p++) {
  var page = subcat.pages[p];
  html += '<a href="' + escapeAttr(page.href) + '" class="mega-menu-page-link">';
  html += '<div class="mega-menu-page-name">' + escapeHtml(page.name) + '</div>';
  html += '</a>';
  }
  html += '</div>';

  if (subcat.pages.length > maxShow && subcat.href) {
  html += '<a href="' + escapeAttr(subcat.href) + '" class="mega-menu-view-all-subcat">+ ' + (subcat.count - maxShow) + ' more →</a>';
  }

  rightPanel.innerHTML = html;

  // Add back button listener
  var backBtn = rightPanel.querySelector('.mega-menu-back');
  if (backBtn) {
  backBtn.addEventListener('click', function(e) {
  e.stopPropagation(); // Prevent document click handler from closing mega-menu
  var ui = parseInt(backBtn.getAttribute('data-umbrella'), 10);
  renderSubcategoryCards(ui);
  });
  }
  }

  // === BUILD MOBILE CATEGORIES ACCORDION (with nested umbrellas) ===
  function buildMobileCategories() {
  var container = document.getElementById('mobileCategoriesAccordion');
  if (!container) return;

  container.innerHTML = '';

  // Quick links: Home + Best Reads (pill buttons at top)
  var html = '';
  html += '<div class="mobile-quick-links">';
  html += '<a href="/" class="mobile-quick-link mobile-quick-link-home">';
  html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  html += ' Home</a>';
  html += '<a href="/best-reads" class="mobile-quick-link mobile-quick-link-best">';
  html += '\uD83D\uDD25 Best Reads</a>';
  html += '</div>';

  // Category label
  html += '<span class="mobile-categories-label">Explore All Categories</span>';

  // All umbrellas with subcategories (progressive reveal: umbrella → subcats → articles)
  for (var i = 0; i < MEGA_MENU_DATA.length; i++) {
  var umbrella = MEGA_MENU_DATA[i];
  var umbrellaId = 'mobile-acc-' + i;
  var totalPages = 0;
  for (var tc = 0; tc < umbrella.subcategories.length; tc++) {
  totalPages += umbrella.subcategories[tc].count;
  }

  html += '<div class="mobile-accordion-umbrella">';
  html += '<div class="mobile-accordion-header" data-umbrella-index="' + i + '">';
  if (umbrella.href) {
  html += '<a href="' + escapeAttr(umbrella.href) + '" class="mobile-accordion-name-link" onclick="event.stopPropagation();">';
  html += '<span class="mobile-accordion-icon">' + umbrella.icon + '</span>';
  html += '<span class="mobile-accordion-umbrella-name">' + escapeHtml(umbrella.umbrella) + '</span>';
  html += '</a>';
  } else {
  html += '<span class="mobile-accordion-icon">' + umbrella.icon + '</span>';
  html += '<span class="mobile-accordion-umbrella-name">' + escapeHtml(umbrella.umbrella) + '</span>';
  }
  html += '<span class="mobile-accordion-umbrella-count">' + totalPages + '</span>';
  html += '<span class="chevron"></span>';
  html += '</div>';
  html += '<div class="mobile-accordion-subcats" id="' + umbrellaId + '">';

  // LEVEL 2: Show subcategory names as clickable items (no articles yet)
  for (var s = 0; s < umbrella.subcategories.length; s++) {
  var subcat = umbrella.subcategories[s];
  if (subcat.pages.length === 0) continue;
  var subcatId = 'mobile-subcat-' + i + '-' + s;

  html += '<div class="mobile-accordion-subcat">';
  html += '<div class="mobile-accordion-subcat-header" data-umbrella-index="' + i + '" data-subcat-index="' + s + '">';
  html += '<span class="mobile-accordion-subcat-icon">' + subcat.icon + '</span>';
  html += '<span class="mobile-accordion-subcat-name">' + escapeHtml(subcat.name) + '</span>';
  html += '<span class="mobile-accordion-subcat-count">' + subcat.count + '</span>';
  html += '<span class="chevron-small">›</span>';
  html += '</div>';

  // LEVEL 3: Articles (hidden until subcat is tapped)
  html += '<div class="mobile-accordion-pages" id="' + subcatId + '">';
  var mobileMax = 6;
  var showCount = Math.min(subcat.pages.length, mobileMax);
  for (var p = 0; p < showCount; p++) {
  var page = subcat.pages[p];
  html += '<a href="' + escapeAttr(page.href) + '" class="mobile-accordion-page">' + escapeHtml(page.name) + '</a>';
  }
  if (subcat.href) {
  var moreCount = subcat.pages.length > mobileMax ? subcat.count - mobileMax : 0;
  var linkText = moreCount > 0 ? 'See all ' + subcat.count + ' →' : 'Explore ' + escapeHtml(subcat.name) + ' →';
  html += '<a href="' + escapeAttr(subcat.href) + '" class="mobile-accordion-view-all-subcat">' + linkText + '</a>';
  }
  html += '</div>';
  html += '</div>';
  }

  html += '</div></div>';
  }

  // Footer: About, Contact, Donate, Explore Map
  html += '<div class="mobile-menu-footer">';
  html += '<a href="/about">About</a>';
  html += '<span class="footer-separator">\u00B7</span>';
  html += '<a href="/contact">Contact</a>';
  html += '<span class="footer-separator">\u00B7</span>';
  html += '<a href="/donate">Donate</a>';
  html += '<span class="footer-separator">\u00B7</span>';
  html += '<a href="/explore-map">Site Map</a>';
  html += '</div>';

  container.innerHTML = html;

  // Add event listeners for umbrella accordion toggle
  var headers = container.querySelectorAll('.mobile-accordion-header');
  for (var h = 0; h < headers.length; h++) {
  (function(header) {
  header.addEventListener('click', function(e) {
  e.stopPropagation();
  e.preventDefault();
  var index = parseInt(header.getAttribute('data-umbrella-index'), 10);
  toggleMobileAccordion(index);
  });
  })(headers[h]);
  }

  // Add event listeners for subcategory accordion toggle (Level 3)
  var subcatHeaders = container.querySelectorAll('.mobile-accordion-subcat-header');
  for (var sh = 0; sh < subcatHeaders.length; sh++) {
  (function(subHeader) {
  subHeader.addEventListener('click', function(e) {
  e.stopPropagation();
  e.preventDefault();
  var ui = subHeader.getAttribute('data-umbrella-index');
  var si = subHeader.getAttribute('data-subcat-index');
  var pagesEl = document.getElementById('mobile-subcat-' + ui + '-' + si);
  if (!pagesEl) return;

  // Toggle this subcategory's articles
  var isOpen = pagesEl.classList.contains('open');

  // Close all other subcategory pages within same umbrella
  var siblingPages = subHeader.closest('.mobile-accordion-subcats').querySelectorAll('.mobile-accordion-pages');
  var siblingHeaders = subHeader.closest('.mobile-accordion-subcats').querySelectorAll('.mobile-accordion-subcat-header');
  for (var sp = 0; sp < siblingPages.length; sp++) {
  siblingPages[sp].classList.remove('open');
  }
  for (var sph = 0; sph < siblingHeaders.length; sph++) {
  siblingHeaders[sph].classList.remove('open');
  }

  if (!isOpen) {
  pagesEl.classList.add('open');
  subHeader.classList.add('open');
  }
  });
  })(subcatHeaders[sh]);
  }

  // Close mobile menu when any link inside accordion is tapped
  container.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
  if (navLinks) {
  navLinks.classList.remove('open');
  if (hamburger) {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
  }
  });
  });
  }

  function toggleMobileAccordion(activeIndex) {
  var container = document.getElementById('mobileCategoriesAccordion');
  if (!container) return;

  var allHeaders = container.querySelectorAll('.mobile-accordion-header');
  var allSubcats = container.querySelectorAll('.mobile-accordion-subcats');

  for (var i = 0; i < allHeaders.length; i++) {
  var header = allHeaders[i];
  var subcats = allSubcats[i];
  var index = parseInt(header.getAttribute('data-umbrella-index'), 10);

  if (index === activeIndex) {
  // Toggle this one
  var isOpen = subcats.classList.contains('open');
  if (isOpen) {
  subcats.classList.remove('open');
  header.classList.remove('open');
  } else {
  subcats.classList.add('open');
  header.classList.add('open');
  }
  } else {
  // Close all others
  subcats.classList.remove('open');
  header.classList.remove('open');
  }
  }
  }

  // === SEARCH OVERLAY (with full-text index) ===
  var searchToggle = document.getElementById('searchToggle');
  var searchOverlay = document.getElementById('searchOverlay');
  var searchInput = document.getElementById('searchInput');
  var searchClose = document.getElementById('searchClose');
  var searchResults = document.getElementById('searchResults');
  var mobileSearchToggle = document.getElementById('mobileSearchToggle');
  var mobileMenuSearchInput = document.getElementById('mobileMenuSearchInput');

  // Track whether we're on the dedicated search page (which has its own engine)
  var isSearchPage = !!document.getElementById('pageSearchInput');

  // Lazy-load the search index
  var searchIndex = null;
  var indexLoading = false;
  var conceptsLoading = false;

  function ensureIndex(callback) {
  // If already loaded globally (e.g. search.html loaded it)
  if (window.SEARCH_INDEX) {
  searchIndex = window.SEARCH_INDEX;
  if (callback) callback();
  return;
  }
  if (searchIndex) {
  if (callback) callback();
  return;
  }
  if (indexLoading) {
  // Wait for it
  var check = setInterval(function () {
  if (window.SEARCH_INDEX || searchIndex) {
  clearInterval(check);
  searchIndex = window.SEARCH_INDEX || searchIndex;
  if (callback) callback();
  }
  }, 100);
  return;
  }
  indexLoading = true;
  var script = document.createElement('script');
  script.src = '/search-index.js';
  script.onload = function () {
  searchIndex = window.SEARCH_INDEX || [];
  indexLoading = false;
  if (callback) callback();
  };
  script.onerror = function () {
  indexLoading = false;
  searchIndex = [];
  if (callback) callback();
  };
  document.head.appendChild(script);
  }

  // Load the theological concept map for intelligent search
  var conceptMap = null;

  function ensureConcepts(callback) {
  if (window.SEARCH_CONCEPTS) {
  conceptMap = window.SEARCH_CONCEPTS;
  if (callback) callback();
  return;
  }
  if (conceptMap) {
  if (callback) callback();
  return;
  }
  if (conceptsLoading) {
  var check = setInterval(function () {
  if (window.SEARCH_CONCEPTS || conceptMap) {
  clearInterval(check);
  conceptMap = window.SEARCH_CONCEPTS || conceptMap;
  if (callback) callback();
  }
  }, 100);
  return;
  }
  conceptsLoading = true;
  var script = document.createElement('script');
  script.src = '/search-concepts.js';
  script.onload = function () {
  conceptMap = window.SEARCH_CONCEPTS || {};
  conceptsLoading = false;
  if (callback) callback();
  };
  script.onerror = function () {
  conceptsLoading = false;
  conceptMap = {};
  if (callback) callback();
  };
  document.head.appendChild(script);
  }

  // Expand query using theological concept map
  function expandQuery(query, tokens) {
  if (!conceptMap) return { expandedTerms: tokens, expandedPhrases: [] };

  var expandedSet = {};
  var expandedPhrases = [];

  // Add original tokens
  for (var t = 0; t < tokens.length; t++) {
  expandedSet[tokens[t]] = true;
  }

  // Check if query matches a phrase in the phrase map
  if (conceptMap.phrases && conceptMap.phrases[query]) {
  var phraseMappings = conceptMap.phrases[query];
  for (var p = 0; p < phraseMappings.length; p++) {
  expandedSet[phraseMappings[p]] = true;
  expandedPhrases.push(phraseMappings[p]);
  }
  }

  // Check if any token maps to a concept
  if (conceptMap.concepts) {
  for (var t = 0; t < tokens.length; t++) {
  var token = tokens[t];
  if (conceptMap.concepts[token]) {
  var synonyms = conceptMap.concepts[token];
  for (var s = 0; s < synonyms.length; s++) {
  expandedSet[synonyms[s]] = true;
  }
  }
  }
  }

  // Check if query matches a Scripture reference
  if (conceptMap.scriptures) {
  for (var verse in conceptMap.scriptures) {
  // Check if verse reference is in the query
  if (query.indexOf(verse) !== -1 || query.indexOf(verse.replace(' ', '').toLowerCase()) !== -1) {
  var phrasings = conceptMap.scriptures[verse];
  for (var ph = 0; ph < phrasings.length; ph++) {
  expandedSet[phrasings[ph]] = true;
  expandedPhrases.push(phrasings[ph]);
  }
  }
  }
  }

  var expandedTerms = Object.keys(expandedSet);
  return { expandedTerms: expandedTerms, expandedPhrases: expandedPhrases };
  }

  // Enhanced scoring function
  function scorePageAdvanced(page, query, tokens) {
  var score = 0;
  var titleLower = page.title.toLowerCase();
  var descLower = (page.desc || '').toLowerCase();
  var textLower = (page.text || '').toLowerCase();

  // EXACT PHRASE MATCHING (highest weight)
  if (titleLower.indexOf(query) !== -1) score += 200;
  if (descLower.indexOf(query) !== -1) score += 100;
  if (textLower.indexOf(query) !== -1) score += 50;

  // INDIVIDUAL TOKEN MATCHING
  for (var t = 0; t < tokens.length; t++) {
  var token = tokens[t];
  if (titleLower.indexOf(token) !== -1) score += 40;
  if (descLower.indexOf(token) !== -1) score += 20;
  if (textLower.indexOf(token) !== -1) score += 10;
  }

  // CONCEPT-EXPANDED MATCHING
  var expansion = expandQuery(query, tokens);
  if (expansion.expandedPhrases.length > 0) {
  for (var ep = 0; ep < expansion.expandedPhrases.length; ep++) {
  var phrase = expansion.expandedPhrases[ep];
  // Concept matches get a bonus but less than exact matches
  if (titleLower.indexOf(phrase) !== -1) score += 25;
  if (descLower.indexOf(phrase) !== -1) score += 15;
  if (textLower.indexOf(phrase) !== -1) score += 8;
  }
  }

  // BONUS: Title starts with query
  if (titleLower.indexOf(query) === 0) score += 80;

  // BONUS: Count occurrences in full text
  if (score > 0 && textLower.length > 0) {
  var count = 0;
  var pos = 0;
  while ((pos = textLower.indexOf(query, pos)) !== -1) {
  count++;
  pos += query.length;
  if (count >= 20) break;
  }
  score += count * 3;
  }

  return score;
  }

  function openSearch() {
  if (isSearchPage) {
  // On the search page, focus the main search input instead
  var pageInput = document.getElementById('pageSearchInput');
  if (pageInput) pageInput.focus();
  return;
  }
  if (searchOverlay) {
  searchOverlay.classList.add('open');
  if (searchInput) setTimeout(function () { searchInput.focus(); }, 100);
  // Close mobile menu if open
  if (navLinks) navLinks.classList.remove('open');
  if (hamburger) {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  }
  closeMegaMenu();
  document.body.style.overflow = 'hidden';
  // Start loading the index
  ensureIndex();
  }
  }

  function closeSearch() {
  if (searchOverlay) {
  searchOverlay.classList.remove('open');
  document.body.style.overflow = '';
  if (searchInput) searchInput.value = '';
  if (searchResults) searchResults.innerHTML = '';
  }
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // === MOBILE SEARCH TOGGLE ===
  // Tapping the search icon in the mobile nav bar opens the hamburger menu
  // and focuses the search input inside it
  if (mobileSearchToggle) {
  mobileSearchToggle.addEventListener('click', function () {
  if (navLinks && !navLinks.classList.contains('open')) {
  navLinks.classList.add('open');
  if (hamburger) {
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  }
  document.body.style.overflow = 'hidden';
  }
  // Focus the mobile menu search input
  if (mobileMenuSearchInput) {
  setTimeout(function () { mobileMenuSearchInput.focus(); }, 150);
  }
  ensureIndex();
  });
  }

  // === MOBILE MENU SEARCH (inline in hamburger menu) ===
  var mobileSearchDebounce;
  if (mobileMenuSearchInput) {
  // Prevent menu from closing when interacting with search
  mobileMenuSearchInput.addEventListener('click', function (e) {
  e.stopPropagation();
  });

  mobileMenuSearchInput.addEventListener('input', function () {
  clearTimeout(mobileSearchDebounce);
  mobileSearchDebounce = setTimeout(function () { mobileMenuSearch(); }, 200);
  });

  // Handle Enter key to go to search results page
  mobileMenuSearchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
  var q = mobileMenuSearchInput.value.trim();
  if (q.length > 0) {
  window.location.href = '/search?q=' + encodeURIComponent(q);
  }
  }
  });
  }

  // Container for mobile search results (injected dynamically)
  var mobileSearchResultsEl = null;

  function getMobileSearchResults() {
  if (mobileSearchResultsEl) return mobileSearchResultsEl;
  if (!mobileMenuSearchInput) return null;
  // Create results container after the search input
  mobileSearchResultsEl = document.createElement('div');
  mobileSearchResultsEl.className = 'mobile-search-results';
  mobileSearchResultsEl.style.cssText = 'max-height:50vh;overflow-y:auto;-webkit-overflow-scrolling:touch;';
  mobileMenuSearchInput.parentNode.appendChild(mobileSearchResultsEl);
  return mobileSearchResultsEl;
  }

  function mobileMenuSearch() {
  if (!mobileMenuSearchInput) return;
  var container = getMobileSearchResults();
  if (!container) return;

  var query = mobileMenuSearchInput.value.trim().toLowerCase();
  if (query.length < 2) {
  container.innerHTML = '';
  // Show the nav links and categories again
  showMobileMenuContent(true);
  return;
  }

  // Hide the regular nav items to make room for results
  showMobileMenuContent(false);

  ensureIndex(function () {
  ensureConcepts(function () {
  if (!searchIndex || searchIndex.length === 0) {
  container.innerHTML = '<div style="padding:1rem;text-align:center;color:#807b75;font-size:0.85rem;">Loading...</div>';
  return;
  }

  var tokens = query.split(/\s+/).filter(function (t) { return t.length > 0; });
  var scored = [];

  for (var i = 0; i < searchIndex.length; i++) {
  var page = searchIndex[i];
  var score = scorePageAdvanced(page, query, tokens);
  if (score > 0) scored.push({ page: page, score: score });
  }

  // Sort by priority first (crown jewel always first), then by score
  scored.sort(function (a, b) {
  var aPriority = a.page.priority || 0;
  var bPriority = b.page.priority || 0;
  if (aPriority !== bPriority) return bPriority - aPriority;
  return b.score - a.score;
  });
  if (scored.length > 12) scored = scored.slice(0, 12);

  if (scored.length === 0) {
  container.innerHTML = '<div style="padding:1rem;text-align:center;color:#807b75;font-size:0.85rem;">No results found. Try different keywords.</div>';
  return;
  }

  var html = '';
  for (var r = 0; r < scored.length; r++) {
  var p = scored[r].page;
  html += '<a href="' + escapeAttr(p.url) + '" style="display:block;padding:0.7rem 1rem;text-decoration:none;border-bottom:1px solid rgba(212,162,84,0.06);">' +
  '<div style="font-size:0.7rem;color:#d4a254;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.15rem;">' + escapeHtml(p.cat) + '</div>' +
  '<div style="font-size:0.88rem;color:#f0ece4;font-weight:600;">' + escapeHtml(p.title) + '</div>' +
  '</a>';
  }
  html += '<a href="/search?q=' + encodeURIComponent(mobileMenuSearchInput.value.trim()) + '" style="display:block;padding:0.8rem 1rem;text-align:center;color:#d4a254;font-weight:600;font-size:0.85rem;text-decoration:none;">See all results &rarr;</a>';

  container.innerHTML = html;
  });
  });
  }

  // Show/hide regular nav content when mobile search is active
  function showMobileMenuContent(visible) {
  if (!navLinks) return;
  var items = navLinks.children;
  for (var i = 0; i < items.length; i++) {
  var el = items[i];
  // Skip the search container itself and the results
  if (el.classList.contains('mobile-menu-search')) continue;
  if (el === mobileSearchResultsEl) continue;
  el.style.display = visible ? '' : 'none';
  }
  }

  // --- Overlay search logic (desktop) ---
  var overlayDebounce;
  if (searchInput && !isSearchPage) {
  searchInput.addEventListener('input', function () {
  clearTimeout(overlayDebounce);
  overlayDebounce = setTimeout(function () { overlaySearch(); }, 200);
  });
  }

  function overlaySearch() {
  if (!searchInput || !searchResults) return;
  var query = searchInput.value.trim().toLowerCase();
  if (query.length < 2) {
  searchResults.innerHTML = '';
  return;
  }

  ensureIndex(function () {
  ensureConcepts(function () {
  if (!searchIndex || searchIndex.length === 0) {
  searchResults.innerHTML = '<div style="padding:1.5rem;text-align:center;color:#807b75;">Search index loading...</div>';
  return;
  }

  var tokens = query.split(/\s+/).filter(function (t) { return t.length > 0; });
  var scored = [];

  for (var i = 0; i < searchIndex.length; i++) {
  var page = searchIndex[i];
  var score = scorePageAdvanced(page, query, tokens);
  if (score > 0) scored.push({ page: page, score: score });
  }

  // Sort by priority first (crown jewel always first), then by score
  scored.sort(function (a, b) {
  var aPriority = a.page.priority || 0;
  var bPriority = b.page.priority || 0;
  if (aPriority !== bPriority) return bPriority - aPriority;
  return b.score - a.score;
  });

  // Show top 15 in overlay
  if (scored.length > 15) scored = scored.slice(0, 15);

  if (scored.length === 0) {
  searchResults.innerHTML = '<div class="search-no-results" style="padding:1.5rem;text-align:center;color:#807b75;">No pages found. Try different keywords.</div>';
  return;
  }

  var html = '';
  for (var r = 0; r < scored.length; r++) {
  var p = scored[r].page;
  html += '<a href="' + escapeAttr(p.url) + '" class="search-result-item">' +
  '<div class="search-result-category">' + escapeHtml(p.cat) + '</div>' +
  '<div class="search-result-title">' + escapeHtml(p.title) + '</div>' +
  '<div class="search-result-snippet">' + escapeHtml(p.desc || extractBrief(p.text, query)) + '</div>' +
  '</a>';
  }

  // Add "See all results" link
  html += '<a href="/search?q=' + encodeURIComponent(searchInput.value.trim()) + '" class="search-result-item" style="text-align:center;color:#d4a254;font-weight:600;font-size:0.9rem;">See all results &rarr;</a>';

  searchResults.innerHTML = html;
  });
  });
  }

  function extractBrief(text, query) {
  if (!text) return '';
  var lower = text.toLowerCase();
  var idx = lower.indexOf(query);
  if (idx === -1) return text.slice(0, 100) + '...';
  var start = Math.max(0, idx - 40);
  var end = Math.min(text.length, idx + query.length + 60);
  return (start > 0 ? '...' : '') + text.slice(start, end).trim() + (end < text.length ? '...' : '');
  }

  function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
  return escapeHtml(str);
  }

  // === KEYBOARD SHORTCUTS ===
  document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
  if (megaMenu && megaMenu.classList.contains('open')) closeMegaMenu();
  if (searchOverlay && searchOverlay.classList.contains('open')) closeSearch();
  if (navLinks && navLinks.classList.contains('open')) {
  navLinks.classList.remove('open');
  if (hamburger) {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
  // Reset mobile search
  if (mobileMenuSearchInput) mobileMenuSearchInput.value = '';
  if (mobileSearchResultsEl) mobileSearchResultsEl.innerHTML = '';
  showMobileMenuContent(true);
  }
  }
  // Ctrl+K / Cmd+K opens search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
  e.preventDefault();
  // On mobile, open the hamburger menu with search focused
  if (window.innerWidth < 1181) {
  if (mobileSearchToggle) mobileSearchToggle.click();
  } else {
  openSearch();
  }
  }
  });

  // === SCROLL DETECTION (nav background) ===
  var nav = document.querySelector('nav');
  if (nav) {
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 50) {
  nav.classList.add('scrolled');
  } else {
  nav.classList.remove('scrolled');
  }
  lastScroll = scrollTop;
  }, { passive: true });
  }

  // === CLOSE MENUS ON RESIZE TO DESKTOP ===
  window.addEventListener('resize', function () {
  if (window.innerWidth >= 1181 && navLinks && navLinks.classList.contains('open')) {
  navLinks.classList.remove('open');
  if (hamburger) {
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
  // Reset mobile search state
  if (mobileMenuSearchInput) mobileMenuSearchInput.value = '';
  if (mobileSearchResultsEl) mobileSearchResultsEl.innerHTML = '';
  showMobileMenuContent(true);
  }
  // Close mega-menu if resized to mobile
  if (window.innerWidth < 1181) {
  closeMegaMenu();
  }
  });

  // === INITIALIZE MEGA-MENU AND MOBILE CATEGORIES ===
  buildMegaMenu();
  buildMobileCategories();

  } // end _navInit

  // Run the full nav init once the DOM is ready so handler
  // attachment is independent of where /nav.js sits in the page.
  if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _navInit);
  } else {
  _navInit();
  }
})();
