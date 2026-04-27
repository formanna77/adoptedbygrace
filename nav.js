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
            icon: '🧭',
            desc: 'Your guided journey into sovereign grace',
            href: '/start-here',
            subcategories: [
                {
                    name: 'Start Here',
                    icon: '🧭',
                    href: '/start-here',
                    count: 7,
                    pages: [
                        { name: '480+ Bible Verses That Prove God\'s Sovereignty in Salvation', href: '/scripture-tsunami', desc: 'Nearly 500 Bible verses on God\'s sovereignty in salvation — searchable, categorized, impossible to ignore. This is what' },
                        { name: 'But What About Free Will and Fairness? — Phase 4', href: '/start-here-phase4', desc: 'Every objection matters. The deepest thinkers in church history discovered: objections don\'t weaken the case for sovere' },
                        { name: 'Living as an Elect Child of God — Phase 5', href: '/start-here-phase5', desc: 'Phase 5: Living as an elect child of God — how sovereign grace transforms your assurance, prayer, worship, mission, and ' },
                        { name: 'New to Sovereign Grace? Start Here.', href: '/start-here', desc: 'Different people arrive at the doctrines of grace from different directions. This is a collection of doorways. Pick the ' },
                        { name: 'The Five Points of Grace — TULIP Explained', href: '/start-here-phase2', desc: 'The five points of grace — Total Depravity, Unconditional Election, Limited Atonement, Irresistible Grace, Perseverance ' },
                        { name: 'What Does the Bible Actually Teach? — Phase 3', href: '/start-here-phase3', desc: 'Phase 3: What does the Bible actually teach about salvation? A passage-by-passage journey through Romans 9, Ephesians 1,' },
                        { name: 'What Is Reformed Theology? — Phase 1', href: '/start-here-phase1', desc: 'Phase 1: An honest introduction to what Reformed Christians believe about God, salvation, and grace — and why this is th' }
                    ]
                },
                {
                    name: 'Doorways for You',
                    icon: '🚪',
                    href: '/start-here',
                    count: 9,
                    pages: [
                        { name: 'For Pastors: Preaching Sovereign Grace Without Splitting Your Church', href: '/for-pastors', desc: 'How to faithfully preach the doctrines of grace to your congregation. Practical guidance for pastors navigating election' },
                        { name: 'For the One Who Can\'t Stop Doubting', href: '/for-doubters', desc: 'For the believer who is terrified the faith they have isn' },
                        { name: 'For the Person Who Just Realized', href: '/just-realized', desc: 'Your hands might be shaking. Or maybe it is quieter than that — maybe you are just sitting very still, staring at a wall' },
                        { name: 'The Truth Will Set You Free', href: '/freedom', desc: 'Am I really saved? If you are a sincere believer, you know this dread. It visits at night, sometimes in the middle of wo' },
                        { name: 'You Came Here Hunting for Intellectual Honesty', href: '/for-skeptics', desc: 'Here\'s the deal. Most religious websites will try to sell you something warm and fuzzy. We won\'t. This site makes a sp' },
                        { name: 'You Deconstructed Everything — Here\'s What\'s Left', href: '/for-deconstructed', desc: 'For the one who tore it all down and is standing in the rubble wondering if anything true survives.' },
                        { name: 'You Just Heard About Election and It Broke Your Brain', href: '/for-new-believers', desc: 'Welcome. This will make sense. We\'ll build the scaffolding together.' },
                        { name: 'You Love Jesus. You\'re Just Missing Something.', href: '/for-arminians', desc: 'You were taught that your decision saved you. But what if the Bible says something different — something better? A gentl' },
                        { name: 'Your World Is Burning. God Isn\'t.', href: '/for-hurting', desc: 'This path is short. No theology lectures. No arguments. Just truth spoken softly to a soul that is bleeding. Take it at ' }
                    ]
                }
            ]
        },
        {
            umbrella: 'Questions & Objections',
            icon: '❓',
            desc: 'Every question answered. Every objection dismantled.',
            href: '/questions',
            subcategories: [
                {
                    name: 'Scripture Questions',
                    icon: '📖',
                    href: '/questions',
                    count: 78,
                    pages: [
                        { name: '"Not Because of Our Works" — 2 Timothy 1:9', href: '/question-2tim1-9', desc: 'Seven words. That is all it took to end the debate.' },
                        { name: 'Are Arminians Saved?', href: '/question-are-arminians-saved', desc: '"Are Arminians saved?" is not a simple yes-or-no question about people. It is a question about where a theological frame' },
                        { name: 'Can God Blot Your Name from the Book of Life?', href: '/question-book-of-life', desc: 'Notice what it actually says. Christ does not say "If you fail, I will blot out your name." He says the opposite — a pro' },
                        { name: 'Can God Create a Universe He Doesn\'t Control?', href: '/question-sovereignty-logic', desc: 'God cannot do nonsense. And a universe He doesn\'t control is nonsense.' },
                        { name: 'Can God\'s Plan for You Be Broken? Romans 8:28-30', href: '/question-goldchain', desc: 'Romans 8:28-30 — foreknown, predestined, called, justified, glorified. An unbreakable chain where every link is divine a' },
                        { name: 'Can You Lose Your Salvation?', href: '/apologetic-perseverance', desc: 'If salvation depends on God\'s eternal decree rather than your flickering will, then it cannot be lost — because the One' },
                        { name: 'Can You Lose Your Salvation? Ephesians 4:30', href: '/question-sealed', desc: 'Ephesians 4:30 proves once saved always saved. You are sealed by the Holy Spirit for the day of redemption — not until y' },
                        { name: 'Can You Truly Repent If You Reject Total Depravity?', href: '/question-repentance-total-depravity', desc: 'If repentance means agreeing with God about your sin, how can you repent while denying the depth Scripture describes? Pa' },
                        { name: 'Dead Bones Don\'t Volunteer — Ezekiel 37', href: '/question-ezekiel37', desc: 'The ruach . In Hebrew, the same word for spirit, breath, and wind. It\'s the word God used when He breathed into Adam an' },
                        { name: 'Dead, Not Sick — The Bible\'s Diagnosis of the Human Condition', href: '/question-depravity', desc: 'Total depravity does not mean people are as evil as possible — it means sin has touched every faculty: mind, will, affec' },
                        { name: 'Did God Choose You Before You Were Born?', href: '/question-chosen', desc: 'Ephesians 1:3-11 explicitly says God chose specific individuals before creation. This wasn\'t conditioned on foreseen fa' },
                        { name: 'Did Jesus Die for Everyone? Scripture on Definite Atonement', href: '/apologetic-definite-atonement', desc: 'Imagine two surgeons. The first enters an operating room for a critical surgery. She studies the patient\'s X-rays, maps' },
                        { name: 'Does "Foreknowledge" Mean God Saw You\'d Believe?', href: '/question-foreknowledge', desc: 'The Greek proginōskō means to choose beforehand, not preview the future. Romans 8:29 is not God reacting to foreseen fai' },
                        { name: 'Does God Change Your Heart Without Permission?', href: '/question-newheart', desc: 'Ezekiel 36:26-27 — God promises a new heart and a new spirit. He does not ask permission. He removes the heart of stone ' },
                        { name: 'Does God Choose Who Goes to Heaven?', href: '/question-does-god-choose-who-goes-to-heaven', desc: 'Yes. Scripture is breathtaking in its clarity: God chose His people before the foundation of the world ( Ephesians 1:4 -' },
                        { name: 'Does God Harden Hearts? Yes — And Here\'s What That Means', href: '/question-hardening', desc: 'You read that and felt relief. Pharaoh. Not you. You are reading an article about hardening, which means you care about ' },
                        { name: 'Does God Love Everyone Equally?', href: '/question-does-god-love-everyone-equally', desc: 'This is real love. It is generous, sustaining, and undeserved. But it is not saving love. The rain falls on the unrighte' },
                        { name: 'Does God Predestine People to Hell? The Honest Answer', href: '/question-predestined-to-hell', desc: 'If God chooses some for salvation, does He choose others for damnation? Scripture draws a devastating asymmetry: salvati' },
                        { name: 'Does the Bible Say We\'re Sick, Not Dead?', href: '/question-bible-says-sick', desc: 'A handful of verses use "sick" language in connection with sin. But in every case, the context reveals a sickness that i' },
                        { name: 'Doesn\'t Election Make Evangelism Pointless?', href: '/apologetic-evangelism', desc: 'If God has already decided who will be saved, why bother preaching? Because God decrees means as well as ends. He ordain' },
                        { name: 'Doesn\'t God Want Everyone Saved? — The Two Wills of God', href: '/question-godwants', desc: '1 Timothy 2:4 says God " wants all people to be saved ." But if God\'s desire guarantees the outcome, then all would be ' },
                        { name: 'Drawn, Not Dragged — The Unstoppable Grace of Effectual Calling', href: '/question-irresistible', desc: 'They do. Scripture has always distinguished between the external call of the gospel — which goes out broadly and can be ' },
                        { name: 'Elect According to Foreknowledge', href: '/question-1peter1', desc: 'Notice the structure. Peter grounds their election in a Trinitarian work — the Father foreknows, the Spirit sanctifies, ' },
                        { name: 'Ephesians 1 — The One-Breath Sentence That Contains Your Whole Salvation', href: '/question-ephesians1', desc: 'Ephesians 1:3-14 is, in Greek, a single unbroken sentence — the longest in the New Testament. Every verb about your salv' },
                        { name: 'Eternal Security: Can a Believer Lose Salvation?', href: '/question-secure', desc: 'Eternal Security: Can a Believer Lose Salvation? Scripture teaches that those whom God saves are kept safe by His power.' },
                        { name: 'Every Conversion in Acts — God Did It Every Single Time', href: '/question-every-conversion-acts', desc: 'God did it every single time. In every conversion narrative in Acts, God initiates. Not once does a human being autonomo' },
                        { name: 'Every Verse Where the Bible Says You CANNOT', href: '/question-cannot', desc: 'Every verse where Scripture says fallen humanity CANNOT do something spiritual. The Bible\'s own testimony to our total ' },
                        { name: 'Everyone Is a Calvinist on Their Knees', href: '/question-calvinist-on-knees', desc: 'Your prayers, worship songs, funerals, and gratitude all confess sovereign grace — even if your theology denies it. Your' },
                        { name: 'Free Will Bible Verses', href: '/question-free-will-bible-verses', desc: 'Every verse used to defend free will in salvation, examined honestly. What Joshua 24:15, Revelation 3:20, John 3:16, and' },
                        { name: 'How Do I Know If I’m One of the Elect?', href: '/question-am-i-chosen', desc: 'If God chose His people before the foundation of the world, how can I know I’m one of them? The Bible’s answer isn’t wha' },
                        { name: 'If Grace Is Irresistible, Why Does It Feel Like Choice?', href: '/question-how-grace-feels', desc: 'You felt yourself choosing Christ. Scripture says God raised you from spiritual death and made you alive. How are both t' },
                        { name: 'Is Faith a Gift from God? What the Bible Actually Says', href: '/question-faithgift', desc: 'Paul already answered. And the answer should make your knees buckle.' },
                        { name: 'Is Free Will Real? What the Bible Actually Teaches About Human Choice', href: '/question-freewill', desc: 'Scripture never teaches libertarian free will. It teaches death — and dead people do not choose their own resurrection. ' },
                        { name: 'Is God Unfair? Paul\'s Answer Will Silence You', href: '/question-unfair', desc: 'You want God to be fair. Paul heard that objection before you were born. His answer was not to soften election or walk i' },
                        { name: 'Is Predestination in the Bible?', href: '/question-is-predestination-in-the-bible', desc: 'Predestination appears by name in Romans 8 and Ephesians 1. But the concept saturates all of Scripture — from Genesis to' },
                        { name: 'Is Salvation Your Choice or God\'s?', href: '/question-is-salvation-my-choice-or-gods', desc: 'Either God\'s choice was decisive in your salvation or yours was. If yours was, you are the hero of your salvation story' },
                        { name: 'Isaiah 53: The Servant Who Bore the Sins of Many', href: '/question-isaiah53', desc: 'The cross was not Plan B. The Servant\'s death is called an asham — a guilt offering, a technical term from the Levitica' },
                        { name: 'Known Before You Were Known', href: '/question-psalm139', desc: 'Psalm 139 reveals that God knew you, formed you, and wrote every day of your life before you existed. Your story was aut' },
                        { name: 'Limited Atonement? — Did Christ Die For Everyone or For His Sheep?', href: '/question-limited-atonement', desc: 'The word' },
                        { name: 'Names Written Before Creation — Revelation 13:8 & 17:8', href: '/question-revelation13', desc: 'Revelation 13:8 and 17:8 prove names were written in the Book of Life before creation — not in response to foreseen fait' },
                        { name: 'No Dice, No Chance — God\'s Sovereignty over Lots and Kings', href: '/question-proverbs-sovereignty', desc: 'You live in a world that worships luck and fears powerful people. Proverbs says both are illusions. The dice are God\'s,' },
                        { name: 'No One Can Come to Me Unless the Father Draws Him', href: '/question-john6', desc: '"No one can come to me unless the Father who sent me draws him." Not "no one will." Not "no one finds it easy." Can. Ina' },
                        { name: 'Not Because of Righteous Things We Had Done — Titus 3:3-7', href: '/question-titus3', desc: 'Titus 3:3-7 contains the entire order of salvation in five verses — and at no point does a human being contribute anythi' },
                        { name: 'Once Saved, Always Saved? What Scripture Actually Promises', href: '/question-perseverance', desc: 'They will never perish. This is the Shepherd\'s promise. This is the Father\'s will. This is the Spirit\'s seal. Not bec' },
                        { name: 'One Question That Changes Everything', href: '/question-one-question', desc: 'There is one question that, honestly answered, will change everything you believe about salvation. Not where the gospel ' },
                        { name: 'Regeneration Precedes Faith', href: '/question-regeneration-precedes-faith', desc: 'Proves that spiritual rebirth comes BEFORE faith, not after. The order matters. This single truth demolishes the Arminia' },
                        { name: 'Seven Questions That Will Show You Where Your Faith Came From', href: '/question-seven-questions', desc: 'Seven questions, asked gently, in the order a door opens. By the end, you will know whether you chose God or whether He ' },
                        { name: 'Thank You, Father, for Hiding This — Matthew 11:25-27', href: '/question-matt11', desc: 'Jesus thanks the Father for hiding truth from the wise and revealing it to infants. Not lamenting. Not apologizing. Than' },
                        { name: 'The Arminian Case, Stated Fairly — And Then Answered', href: '/question-arminian-steelman', desc: 'The strongest Arminian arguments, presented honestly and at full strength — not as straw men. Then answered one by one f' },
                        { name: 'The Boasting Problem That Destroys Free Will', href: '/question-boasting', desc: '1 Corinthians 1:26-31 — God chose the foolish to shame the wise, for one reason: so that no one may boast.' },
                        { name: 'The Call You Can Ignore vs. The Call That Creates Life', href: '/question-external-internal-call', desc: 'Scripture teaches two kinds of calling: the external call that goes to all and can be refused, and the internal call tha' },
                        { name: 'The Cross Was Predestined', href: '/question-acts4', desc: 'Everyone asks why Jesus died. Almost no one asks the harder question: who decided that He would?' },
                        { name: 'The Dead Man — A Visual Argument for Total Depravity', href: '/question-dead-man-visual', desc: 'A visual argument for Total Depravity: a corpse cannot reach for rescue. If you are alive in Christ, a voice reached int' },
                        { name: 'The Greek Tense That Settles the Debate — 1 John 5:1', href: '/question-1john5-1', desc: '1 John 5:1 — Everyone Who Believes Has Already Been Born of God' },
                        { name: 'The Logic You Can See: Visual Theology of Sovereign Grace', href: '/question-visual-theology', desc: 'The Reformed soteriological argument presented visually through logical flowcharts, diagrams, and devastating comparison' },
                        { name: 'The Prayer That Proves Election — John 17', href: '/question-john17', desc: 'In John 17, Jesus prays exclusively for "those whom you have given me" — repeating the phrase seven times. He explicitly' },
                        { name: 'The Verse in Acts That Nobody Preaches – Acts 13:48', href: '/question-acts', desc: 'Luke the historian records a fact: in Pisidian Antioch, "all who were appointed for eternal life believed" (Acts 13:48).' },
                        { name: 'Unconditional Election — On What Basis Did God Choose You?', href: '/question-unconditional', desc: 'Unconditional Election — On What Basis Did God Choose You?' },
                        { name: 'Was Christ a Robot? If Predestination Didn\'t Rob Him, It Won\'t Rob You', href: '/question-was-christ-a-robot', desc: 'The crucifixion was predestined by God\'s "deliberate plan and foreknowledge." Was Christ a puppet? If predestination di' },
                        { name: 'What About "Whosoever Will"?', href: '/question-whosoever', desc: '"Whoever believes" (Greek: pas ho pisteuōn — "all the believing ones") describes who is saved, not who can believe. John' },
                        { name: 'What About Babies Who Die?', href: '/apologetic-babies', desc: 'What happens to babies who die? Scripture gives grieving parents a sovereign, rock-solid hope that no free-will theology' },
                        { name: 'What About Those Who Never Heard the Gospel?', href: '/apologetic-unreached', desc: 'The question assumes that people without the gospel are innocent and waiting. Scripture says the opposite: every human b' },
                        { name: 'What Are the Doctrines of Grace? — A Simple Explanation', href: '/question-what-is-sovereign-grace', desc: 'That\'s it. Everything else is unpacking those seven words. If God saves sinners, then He chose who to save. He sent Chr' },
                        { name: 'What Did Jesus Mean by "Let the Dead Bury the Dead"?', href: '/question-dead-bury-dead', desc: 'When Jesus said "Let the dead bury their own dead" (Matthew 8:22), He used the word "dead" in two senses in one breath —' },
                        { name: 'What Does "Born Again" Actually Mean? — John 3:3-8 Explained', href: '/question-born-again-meaning', desc: 'Jesus said you must be born again. But what does that mean — and who does the birthing? A closer look at John 3 reveals ' },
                        { name: 'What Does "Chosen" Actually Mean in the Bible?', href: '/question-what-does-chosen-mean', desc: '"Chose." The word is short, familiar, and devastating. Paul says it happened before creation existed. He says God did it' },
                        { name: 'What Does "Dead in Sin" Actually Mean?', href: '/question-dead-in-sin-meaning', desc: 'When Paul says you are dead in sin , he means dead. Not sick, not sleeping, not struggling—dead, like Lazarus in the tom' },
                        { name: 'What Does Romans 9 Really Mean?', href: '/question-romans9', desc: 'Before birth. Before works. Before faith could exist. The pre-birth timing is not incidental — it is the entire point. E' },
                        { name: 'Where Did Your Faith Come From?', href: '/question-where-did-your-faith-come-from', desc: 'You\'ve probably heard a hundred sermons about faith. You\'ve probably given your testimony dozens of times. You know th' },
                        { name: 'Where Does Your "No" Come From? — The Self-Referential Trap', href: '/question-where-does-your-no-come-from', desc: 'If you reject sovereign grace, where does that rejection originate? From your free will? The very will Scripture says is' },
                        { name: 'Whose Side Are You On? Man-Centered vs God-Centered Theology', href: '/question-whose-side-are-you-on', desc: 'Strip away the jargon: one theology makes man the hero, the other makes God the hero. Which side are you really on?' },
                        { name: 'Why Did God Harden Pharaoh’s Heart? — Exodus 9:12 Explained', href: '/question-pharaoh-hardened', desc: 'Did Pharaoh harden his own heart, or did God do it? Scripture says both — and the order matters more than you think. Wha' },
                        { name: 'Why Does God Choose Some and Not Others? Scripture\'s Answer', href: '/question-why-does-god-choose-some-not-others', desc: 'Notice the surgical precision. Paul explicitly rules out works . Before the children even existed, before they did anyth' },
                        { name: 'Why Jesus Spoke in Parables — Matthew 13:10-17', href: '/question-parables', desc: 'Why did Jesus speak in parables? Not to make truth clearer — but to conceal it from some while revealing it to others. M' },
                        { name: 'Why Pray If God Is Sovereign?', href: '/question-why-pray-if-god-is-sovereign', desc: 'If He\'s already decided everything, why talk to Him about it? Because prayer is not about changing God — it\'s about al' },
                        { name: 'Why Some People Hear the Gospel and Walk Away', href: '/question-external-call', desc: 'Everyone in church hears the same sermon. But only some are changed forever. Scripture teaches there are two calls — one' },
                        { name: 'You Did Not Choose Me, But I Chose You — John 15:16', href: '/question-john15', desc: 'An upper room in Jerusalem. First-century lamps with olive oil wicks. A low table scattered with unleavened bread and th' },
                        { name: 'You Do Not Believe Because You Are Not My Sheep', href: '/question-john10', desc: 'Jesus inverts the logic of faith: sheep-status determines belief, not the reverse. John 10:26-29 is election from the mo' }
                    ]
                },
                {
                    name: 'Hard Objections',
                    icon: '🛡',
                    href: '/questions',
                    count: 21,
                    pages: [
                        { name: 'Does Election Contradict God\'s Love? What Scripture Teaches', href: '/objection-love', desc: 'Imagine a wedding. Candles on every sill. A bride in white at the end of a long aisle, her father giving her arm a small' },
                        { name: 'Does God Manipulate Us?', href: '/objection-manipulation', desc: 'Manipulation requires three things: deception, self-interest at the victim\'s expense, and diminishment of the person. G' },
                        { name: 'Does Predestination Make Us Robots?', href: '/objection-robots', desc: 'The most common objection to sovereignty answered. Predestination does not make you a robot. It makes you free for the f' },
                        { name: 'Doesn\'t God Want All People Saved?', href: '/objection-desire', desc: 'What 1 Timothy 2:4 and 2 Peter 3:9 actually mean — and why the alternative creates a God who wishes and fails.' },
                        { name: 'If Everything Is Predetermined, Why Even Try?', href: '/objection-effort', desc: 'The objection confuses outcomes with means. God doesn\'t just ordain where the story ends—He ordains how it gets there. ' },
                        { name: 'If God Already Chose Us, Why Do We Have to Believe?', href: '/objection-why-believe', desc: 'Dear friend — I know what just happened. Someone showed you a verse, or you stumbled across it yourself, and now everyth' },
                        { name: 'If God Already Chose Who\'s Saved, Why Evangelize?', href: '/objection-why-evangelize', desc: 'This is the hinge question. God doesn\'t simply decree that someone will believe as a disconnected fact floating in the ' },
                        { name: 'If God Already Chose, Why Evangelize?', href: '/objection-evangelism-pointless', desc: 'God ordains the ends and the means. He didn\'t just choose who would be saved — He chose how: through the preaching of t' },
                        { name: 'If God Already Decided Everything, Why Pray?', href: '/objection-why-pray', desc: 'That\'s the hinge. God\'s predestination includes not only the ends you\'re praying for, but the means by which those en' },
                        { name: 'If God Can Save Everyone, Why Doesn\'t He?', href: '/objection-why-not-save-everyone', desc: 'Picture a long stone corridor. The lights are dim, the air smells faintly of bleach and old fear, and behind every door ' },
                        { name: 'If God Controls Everything, How Can He Blame Us?', href: '/objection-responsibility', desc: 'If God predetermines everything, how can He hold us responsible? Paul anticipated this exact objection in Romans 9:19 — ' },
                        { name: 'If God Could Save Everyone, Why Doesn\'t He?', href: '/objection-god-could-save-all', desc: 'The theodicy problem — and why the biblical answer is better than the alternative' },
                        { name: 'If God Only Chose Some, Isn\'t That Unfair?', href: '/objection-unfair-to-choose-some', desc: 'That\'s the question. Not "Is election fair?" but "Fair compared to what? Fair compared to what you\'ve actually earned?' },
                        { name: 'If God Predestined Everything, Why Does He Command?', href: '/objection-why-command', desc: 'God ordains the destination and the road. He decrees not just the outcome but every step that leads to it — your prayers' },
                        { name: 'If It\'s Not Free, Is It Love?', href: '/objection-love-requires-choice', desc: 'The tenderest objection to sovereign grace —' },
                        { name: 'Is Election Fair? Why Grace Is Unfair', href: '/objection-fairness', desc: 'The fairness objection to election contains a hidden demand: that God distribute mercy the way justice distributes punis' },
                        { name: 'Is God the Author of Sin? What Scripture and Logic Reveal', href: '/objection-author-of-sin', desc: 'Does God cause sin if He predestines everything? Scripture teaches a clear distinction between ordaining and authoring. ' },
                        { name: 'Isn\'t Faith a Choice? The Question That Changes Everything', href: '/objection-faith-choice', desc: 'You remember choosing to believe. But where did the ability to make that choice come from? What Scripture says about the' },
                        { name: 'Name Your Objection — Walk Through It With Us', href: '/objection-builder', desc: 'Pick the objection you hold. We will show you the hidden assumption underneath it, the verse that dismantles it, and the' },
                        { name: 'The Freedom That Was Never Free', href: '/objection-free-will', desc: 'The philosophical case for libertarian free will, stated at its strongest — and the three places it collapses under its ' },
                        { name: 'What About Babies Who Die?', href: '/objection-babies', desc: 'If salvation requires faith, what happens to babies who die? This objection to election actually proves it — because inf' }
                    ]
                },
                {
                    name: 'Side by Side',
                    icon: '⚖',
                    href: '/compare-calvinism-arminianism',
                    count: 8,
                    pages: [
                        { name: 'At Every Decision Point, Scripture Sides with God — Not You', href: '/compare-every-decision-point', desc: 'Ten crucial doctrinal decision points. At each one, man-centered theology sides with man. God-centered theology sides wi' },
                        { name: 'Calvinism vs Arminianism', href: '/compare-calvinism-arminianism', desc: 'Point by point, verse by verse — what Scripture actually teaches about salvation, and why the Arminian reading collapses' },
                        { name: 'Calvinism vs Molinism', href: '/compare-calvinism-molinism', desc: 'Molinism promises a sovereign God and libertarian free will through middle knowledge. Scripture presents a God who does ' },
                        { name: 'Calvinism vs Open Theism', href: '/compare-calvinism-open-theism', desc: 'Does God know every detail of the future — or is He discovering it alongside you? One view has been held for two millenn' },
                        { name: 'Does God Save Alone, or Do You Help? Monergism vs Synergism', href: '/compare-monergism-synergism', desc: 'The most fundamental divide in all of Christianity: Does God save alone, or does He need your cooperation? Scripture ans' },
                        { name: 'Predestination vs Foreknowledge — Which Comes First?', href: '/compare-predestination-foreknowledge', desc: '"God looked down the corridor of time, saw who would believe, and chose them." The Bible never says this. Not once. The ' },
                        { name: 'Reformed vs Catholic', href: '/compare-calvinism-catholic-soteriology', desc: 'Imputed or infused? Faith alone or faith plus works? The Reformation\'s most consequential divide — and why the differen' },
                        { name: 'Two Versions of Grace — One Is Real. One Is Man-Made.', href: '/compare-grace-reformed-vs-arminian', desc: 'Reformed grace vs. Arminian grace compared side by side. One is a resurrection. The other is a suggestion. One is divine' }
                    ]
                }
            ]
        },
        {
            umbrella: 'Theology',
            icon: '📖',
            desc: 'The deep truths of sovereign grace',
            href: '/systematic-theology',
            subcategories: [
                {
                    name: 'Systematic Theology',
                    icon: '🏛',
                    href: '/systematic-theology',
                    count: 33,
                    pages: [
                        { name: 'Adoption — Why God Calls You Son and Daughter, Not Just Forgiven', href: '/systematic-adoption', desc: 'Adoption (Greek huiothesia , "placing as a son") is the act of God\'s free grace by which, having been justified , the b' },
                        { name: 'Before the Foundation of the World — God\'s Eternal Decrees', href: '/systematic-divine-decrees', desc: 'Nothing has ever surprised God. Before a single atom existed, He decreed everything that would come to pass — including ' },
                        { name: 'Born Again — What It Really Means and Why You Didn\'t Do It to Yourself', href: '/systematic-regeneration', desc: 'You did not choose to be born the first time. You did not choose to be born again either. Scripture teaches that regener' },
                        { name: 'Chosen Before the Foundation of the World', href: '/systematic-election', desc: 'God chose His people before creation — not based on anything they would do, but according to His sovereign will and grac' },
                        { name: 'Common Grace — Why God Is Kind to People Who Hate Him', href: '/systematic-common-grace', desc: 'Read that slowly. The sun rises on the evil. The rain falls on the unrighteous. The God who is daily cursed by millions ' },
                        { name: 'Effectual Calling — The Voice the Dead Cannot Refuse', href: '/systematic-effectual-calling', desc: 'Scripture distinguishes between two callings. The general call is the outward proclamation of the gospel — the sermon, t' },
                        { name: 'Federal Headship: Two Men, Two Races, Two Destinies', href: '/systematic-federal-headship', desc: 'Every human being stands under one of two representatives: Adam or Christ. Federal headship is the architecture of salva' },
                        { name: 'Glorification: The Last Link in the Golden Chain', href: '/systematic-glorification', desc: 'Glorification is the final act of salvation — when sin ends forever and we are made fully like Christ. The certainty Pau' },
                        { name: 'How Can God Be Sovereign AND Humans Be Responsible?', href: '/systematic-compatibilism', desc: 'Notice what Peter does not do. He does not say "on the one hand... but on the other hand." He does not soften, qualify, ' },
                        { name: 'How God Saves — Every Step of Salvation, Every Step His', href: '/systematic-soteriology', desc: 'From election to glorification, not a single link in the chain can break. Romans 8:29-30 mapped out — every step of salv' },
                        { name: 'Imputation — The Great Exchange That Rewrites Your Ledger', href: '/systematic-imputation', desc: 'Imputation is the legal crediting of one person\'s actions to another person\'s account. Scripture teaches a double impu' },
                        { name: 'Justified — How God Declares Guilty Sinners Righteous', href: '/systematic-justification', desc: 'Stop for a moment. You are not reading theology right now. You are reading your own verdict. If you are in Christ, the r' },
                        { name: 'One God, Three Persons', href: '/systematic-trinity', desc: 'The Trinity: one God in three persons. Scripture teaches the Father elects, the Son redeems, the Spirit applies. The fou' },
                        { name: 'One Plan, One People, One Mediator — Covenant Theology', href: '/systematic-covenant-theology', desc: 'God has never had two plans of salvation. From Eden to Calvary, one covenant of grace runs through all of redemptive his' },
                        { name: 'Providence: God\'s Sovereign Rule Over All Things', href: '/systematic-providence', desc: 'Providence is God\'s sovereign, purposeful, moment-by-moment governance of every event in the created order — from the r' },
                        { name: 'Sanctification: The Work God Began and Will Finish', href: '/systematic-sanctification', desc: 'Sanctification is the lifelong process by which God conforms His people into the image of Christ. Scripture speaks of it' },
                        { name: 'The Atonement: What Christ\'s Death Accomplished', href: '/systematic-atonement', desc: 'Did the cross save you, or merely make your salvation possible? Scripture teaches Christ died to actually secure redempt' },
                        { name: 'The Church — Why God\'s People Are Called Out, Not Volunteered', href: '/systematic-ecclesiology', desc: 'You were summoned. That word should stop you cold.' },
                        { name: 'The Covenant of Redemption', href: '/systematic-covenant-redemption', desc: 'Before the world existed, the Father, Son, and Spirit made a covenant about you. This is the bedrock beneath election, a' },
                        { name: 'The Covenant of Works', href: '/systematic-covenant-works', desc: 'God made a covenant with Adam: perfect obedience for life, one breach for death. Adam broke it, you inherited the breach' },
                        { name: 'The Doctrine of Reprobation', href: '/systematic-reprobation', desc: 'The doctrine of reprobation owned, not ducked. Why double predestination is the necessary shadow of unconditional electi' },
                        { name: 'The Five Points of Grace (TULIP)', href: '/systematic-tulip', desc: 'The five points of grace explained from Scripture alone. Total Depravity, Unconditional Election, Definite Atonement, Ir' },
                        { name: 'The Glory of Christ', href: '/systematic-christology', desc: 'Jesus is not a good teacher who offers advice. He is God in flesh who accomplishes salvation. His deity, humanity, and a' },
                        { name: 'The Holy Spirit — Who He Is and Why He Changes Everything', href: '/systematic-pneumatology', desc: 'Run the receipts. The person you swore you were over — you are not over. The habit you were sure you had killed in Janua' },
                        { name: 'The Order of Salvation — Every Step Is God\'s, Not Yours', href: '/systematic-ordo-salutis', desc: 'Every step is God\'s — not yours. From election to glorification, the chain has never broken.' },
                        { name: 'The Resurrection — The Foundation of All Hope', href: '/systematic-resurrection', desc: 'The bodily resurrection of Jesus Christ is not one doctrine among many — it is the foundation upon which every Christian' },
                        { name: 'The Truth About Salvation — Where Everything Begins', href: '/systematic-salvation', desc: 'Election. Regeneration. Atonement. Justification. Perseverance. The full architecture of how God saves — and why underst' },
                        { name: 'The Truth of Scripture — God\'s Authoritative Word', href: '/systematic-bibliology', desc: 'The Truth of Scripture: Inerrancy, sufficiency, authority. 2 Timothy 3:16-17, 2 Peter 1:20-21. Why Sola Scriptura matter' },
                        { name: 'Union with Christ', href: '/systematic-union-with-christ', desc: 'The doctrine of union with Christ is the central truth from which every other blessing of salvation flows. You were chos' },
                        { name: 'What Are You? Created in Glory, Ruined by Sin, Rescued by Grace', href: '/systematic-anthropology', desc: 'You are more glorious and more ruined than you have ever imagined. Both at the same time. And that combination is why yo' },
                        { name: 'Who Is God? The Foundation Everything Else Stands On', href: '/systematic-theology-proper', desc: 'Before you can understand how God saves, you must understand who He is — because His nature is the reason grace works th' },
                        { name: 'Why Scripture Is the Final Word', href: '/systematic-prolegomena', desc: 'Before you can answer any question about God, you must answer where truth comes from. Get this wrong and every doctrine ' },
                        { name: 'You\'re Not Sick in Sin', href: '/systematic-hamartiology', desc: 'Run the test further. The reason you mildly dislike certain Christians is not their personality — it is their holiness. ' }
                    ]
                },
                {
                    name: 'Old Testament',
                    icon: '📚',
                    href: '/ot-hub',
                    count: 14,
                    pages: [
                        { name: '"Not Because You Were More" — Why God Chose Israel', href: '/ot-israel-chosen', desc: 'Why did God choose Israel? Because He loved them. Why did He love them? Because He chose them. That is not an argument. ' },
                        { name: '"You Meant It for Evil, but God Meant It for Good"', href: '/ot-joseph', desc: 'The Hebrew is devastating. Both intentions — the brothers\' evil and God\'s good — use the same verb: chashav , meaning ' },
                        { name: 'Abel and Cain: The Bible\'s First Election', href: '/ot-abel-cain', desc: 'Two brothers. Identical circumstances. One God who chose.' },
                        { name: 'Abraham & Election: The Call That Creates Faith', href: '/ot-abraham', desc: 'Then God spoke. "The LORD had said to Abram, \'Go from your country, your people and your father\'s household to the lan' },
                        { name: 'David: God\'s Sovereign Election for Kingship', href: '/ot-david', desc: 'Sit with that for a moment. Picture the scene from David\'s vantage: a teenage boy in a wool tunic, smelling of lanolin ' },
                        { name: 'Election Didn\'t Start in the New Testament', href: '/ot-election', desc: 'Before Paul ever wrote Romans 9, the Old Testament was already saturated with sovereign election. From Abraham to David ' },
                        { name: 'Isaiah: The Servant & God\'s Immutable Counsel', href: '/ot-isaiah-servant', desc: 'Let the weight of that settle. God does not merely predict the future — He declares it. He does not observe what will ha' },
                        { name: 'Jacob Over Esau: God Chose Before They Were Born', href: '/ot-jacob-esau', desc: 'Before Jacob or Esau had done anything good or bad, God chose. Romans 9 uses this moment to prove that election has noth' },
                        { name: 'Jeremiah: Called Before Formation', href: '/ot-jeremiah', desc: 'Jeremiah 1:5 — God knew, consecrated, and appointed Jeremiah before he was formed. Three divine actions before birth. Ze' },
                        { name: 'Jonah: The Prophet Who Tried to Outrun God', href: '/ot-jonah', desc: 'Jonah ran from God and discovered what everyone discovers: you cannot outrun divine sovereignty. The worst sermon in his' },
                        { name: 'Moses, Pharaoh, and the God Who Hardened a King\'s Heart', href: '/ot-moses-pharaoh', desc: 'Two men, two destinies, one sovereign God. Moses receives mercy; Pharaoh receives hardening. Both were decreed before ei' },
                        { name: 'Noah: Chosen for Preservation', href: '/ot-noah', desc: 'Not "most inclinations." Every. Not "often evil." All the time. Not mixed or neutral — evil. The human heart was not sic' },
                        { name: 'The Remnant — How God Has Always Preserved His Chosen Few', href: '/ot-prophets-remnant', desc: 'There is a pattern running through every prophetic book in the Old Testament , and once you see it, you cannot unsee it:' },
                        { name: 'When God Answered Suffering with Sovereignty', href: '/ot-job', desc: 'Job lost everything and demanded answers. God gave him something better: Himself.' }
                    ]
                },
                {
                    name: 'Scripture Deep Dives',
                    icon: '🔎',
                    href: '/verse-explorer',
                    count: 6,
                    pages: [
                        { name: 'Every Bible Verse That Teaches Faith Is a Gift from God', href: '/scripture-tsunami-faith-as-gift', desc: '40+ Bible verses proving faith is a gift of God, not a human achievement. From Genesis to Revelation, Scripture is unani' },
                        { name: 'Every Verse Teaching God\'s Sovereignty Over Salvation', href: '/scripture-tsunami-sovereignty', desc: 'All quotations are NIV. Each verse is followed by one sentence explaining why it matters. For deeper analysis of individ' },
                        { name: 'Romans 3:10-18 — The Indictment Nobody Escapes', href: '/romans-3-10-18', desc: 'Paul weaves six Old Testament passages into a seven-charge indictment of the entire human race: no one righteous, no one' },
                        { name: 'Romans 8:28-39: The Chain No One Can Break', href: '/romans-8-28-39', desc: 'Five links. One chain. Every link forged by God alone. The Golden Chain of Romans 8 — foreknowledge, predestination, cal' },
                        { name: 'Romans 9 Deep Dive — The Chapter That Settles It', href: '/romans-9-deep-dive', desc: 'Verse-by-verse through the load-bearing chapter of the doctrines of grace. Paul anticipates every Arminian objection in ' },
                        { name: 'Romans 9:1-24: The Potter and the Clay', href: '/romans-9-1-24', desc: 'He leaves only divine mercy. The person who says "I chose God" must reckon with Paul saying it depends not on human desi' }
                    ]
                },
                {
                    name: 'Connections',
                    icon: '🔗',
                    href: '/connections',
                    count: 1,
                    pages: [
                        { name: 'The Unbreakable Thread – Sovereignty Across All of Scripture', href: '/connections', desc: 'Old Testament patterns, New Testament witnesses, logical arguments, historical quotes, and typological proofs — all poin' }
                    ]
                },
                {
                    name: 'Essays',
                    icon: '📝',
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
            icon: '💥',
            desc: 'Tearing down the lies — from Scripture, logic, and science',
            href: '/demolition-hub',
            subcategories: [
                {
                    name: 'Verse by Verse',
                    icon: '💥',
                    href: '/demolition-hub',
                    count: 54,
                    pages: [
                        { name: '"Choose This Day Whom You Will Serve"', href: '/demolition-joshua24-15', desc: 'Does Joshua 24:15 prove free will? Three verses later, Joshua answers that question himself — and the answer is devastat' },
                        { name: '"Christ Died for All"', href: '/demolition-2cor5-14-15', desc: 'You came here with this verse already loaded. You may not have noticed the small rush of confidence when you first read ' },
                        { name: '"Faith Is Not a Gift"', href: '/demolition-faith-is-not-a-gift', desc: 'The most popular objection to faith as a gift collapses under its own weight. Philippians 1:29 is unambiguous. And rejec' },
                        { name: '"God Commands All to Repent"', href: '/demolition-acts17-30', desc: 'Acts 17:30 commands all people to repent — but a command does not prove ability. Jesus commands perfection (Matthew 5:48' },
                        { name: '"Grace Has Appeared to All" — What Titus 2:11 Really Means', href: '/demolition-titus2-11', desc: 'In Titus 2:1-10, Paul addresses every social category — old men, young women, slaves. Then in verse 11 he summarizes: gr' },
                        { name: '"He Tasted Death for Everyone"', href: '/demolition-hebrews2-9', desc: 'You have used this verse in an argument. Maybe not out loud — maybe only in the quiet courtroom of your own mind, the pl' },
                        { name: '"If You Declare, You Will Be Saved"', href: '/demolition-romans10-9', desc: 'Romans 10:9 describes the means of salvation, not its source. The faith and confession required are themselves gifts fro' },
                        { name: '"In Christ All Shall Be Made Alive" — But Who Are the "All"?', href: '/demolition-1cor15-22', desc: 'Picture the moment. You were in a small group, or a comment thread, or a kitchen argument with a cousin who had just com' },
                        { name: '"Savior of All People"', href: '/demolition-1tim4-10', desc: 'If God is the "Savior of all people," why aren' },
                        { name: '"The Master Who Bought Them"', href: '/demolition-2peter2-1', desc: 'Does 2 Peter 2:1 prove universal atonement? Peter describes wolves in sheep\'s clothing — false teachers never truly reg' },
                        { name: '"Work Out Your Salvation"', href: '/demolition-philippians2-12-13', desc: 'The Arminian reads "work out your salvation" and exhales — finally, a verse that puts the ball in human hands. But verse' },
                        { name: '"You Always Resist the Holy Spirit"', href: '/demolition-acts7-51', desc: 'Acts 7:51 is the Arminian trump card against irresistible grace. But Stephen is describing resistance to the external ca' },
                        { name: '1 Corinthians 10:13 — "A Way Out" Is Not Libertarian Free Will', href: '/demolition-1cor10-13', desc: '1 Corinthians 10:13 is cited to prove sinners have the innate power to choose righteousness. But Paul never locates the ' },
                        { name: '1 Peter 1:5 — "Shielded Through Faith" Demolished', href: '/demolition-1peter1-5', desc: 'It doesn\'t. And the proof is not buried in obscure Greek manuscripts. It is sitting in verses 3 and 4, which the Armini' },
                        { name: '2 Corinthians 6:1-2 — "Not in Vain" Demolished', href: '/demolition-2cor6-1', desc: '2 Corinthians 6:1-2 — the verse Arminians use to prove grace is resistible, and why the Reformed distinction between com' },
                        { name: '2 Peter 1:10 — Does "Make Your Calling Sure" Prove You Can Lose It?', href: '/demolition-2peter1-10', desc: 'Wrong. And once you see what Peter is actually saying — and what the Greek is actually doing — this passage becomes one ' },
                        { name: '2 Peter 3:15 — &ldquo;Our Lord\'s Patience Means Salvation&rdquo;', href: '/demolition-2peter3-15', desc: 'Arminian readers extend &ldquo;our Lord\'s patience means salvation&rdquo; to mean &ldquo;God is patient with everyone i' },
                        { name: 'Acts 2:21 / Romans 10:13 — "Everyone Who Calls" Demolished', href: '/demolition-acts2-21', desc: 'It is an elegant structure. It is also a structure Peter and Paul would not recognize. Because both of them, when they w' },
                        { name: 'Arianism — The Ancient Heresy That Tried to Kill Christ\'s Deity', href: '/demolition-arianism', desc: 'Arius (4th century) taught that Christ was the highest created being — not truly God. The church responded with the Nice' },
                        { name: 'Can You Lose Your Salvation?', href: '/demolition-hebrews6-4-6', desc: 'Hebrews 6:4-6 describes people who experienced the covenant community — enlightened, tasted, shared in the Spirit — but ' },
                        { name: 'Children of Satan — What Scripture Actually Calls the Unregenerate', href: '/demolition-children-of-satan', desc: 'The church speaks of "lost sheep." Jesus spoke of children of the devil . Scripture identifies the unregenerate as ensla' },
                        { name: 'Cut Off from the Root — Why Sin Doesn\'t Wound. It Kills.', href: '/demolition-cut-off-from-root', desc: 'When a creature is severed from the source of its life, corruption is not a punishment imposed from outside. It is what ' },
                        { name: 'Demolition: 2 Peter 3:9', href: '/demolition-2peter3-9', desc: '"Not wishing that any should perish" is addressed to believers ("you"), not to all humanity. The "any" and "all" are sub' },
                        { name: 'Demolition: James 4:7-8', href: '/demolition-james4-7-8', desc: 'The favorite synergism proof-text — and the verses immediately before and after that prove it cannot mean what Arminians' },
                        { name: 'Demolition: John 12:32 — "I Will Draw ALL People"', href: '/demolition-john12-32', desc: '"I will draw all people to myself." The Arminian hears "all" and stops reading. Case closed: universal drawing, universa' },
                        { name: 'Demolition: Matthew 23:37 — Jesus\'s Lament Over Jerusalem', href: '/demolition-matt23-37', desc: 'Who are "you" in verse 37? The scribes and Pharisees. The leaders Jesus has been addressing throughout the chapter.' },
                        { name: 'Demolition: Matthew 7:7 — "Ask, Seek, Knock"', href: '/demolition-matt7-7', desc: 'The favorite seeker-friendly verse, taken out of its own sermon. The context, the Greek, and the Father-to-children fram' },
                        { name: 'Deuteronomy 30:19 — "Choose Life" and the Free Will Myth', href: '/demolition-deut30-19', desc: 'The verse most often used as a free-will proof-text is addressed to an already-elect covenant nation, not to unregenerat' },
                        { name: 'Did C.S. Lewis Refute Calvinism? — What They Won\'t Tell You', href: '/counter-cs-lewis-free-will', desc: 'But does Scripture teach this? Not "does it sound reasonable?" — does God\'s Word say this is how salvation works?' },
                        { name: 'Does "The Whole World" in 1 John 2:2 Prove Universal Atonement?', href: '/demolition-1john2-2', desc: 'So slow down. Read it again. And this time, do not move past the word propitiation .' },
                        { name: 'Does God Take Pleasure in Death?', href: '/demolition-ezekiel18-23', desc: 'What Ezekiel 18:23 actually means — and why the prophet\'s own words destroy the Arminian reading.' },
                        { name: 'Does God Want Everyone Saved?', href: '/demolition-1tim2-4', desc: 'God "desires all people to be saved" — but Paul wrote that sentence one verse after commanding prayer "for all people, f' },
                        { name: 'Ezekiel 33:11 — "I Take No Pleasure in the Death of the Wicked"', href: '/demolition-ezekiel33-11', desc: 'The verse Arminians wield to prove God wants to save everyone equally teaches — when read honestly — the crucial distinc' },
                        { name: 'FACTS Check — The Arminian Framework Dismantled Point by Point', href: '/demolition-arminian-facts', desc: 'The Society of Evangelical Arminians built a framework called FACTS. We examine each point with seminary-level exegesis ' },
                        { name: 'Galatians 5:4 — Can a Christian Really "Fall from Grace"?', href: '/demolition-galatians5-4', desc: 'The verse Arminians use to prove a believer can lose salvation says the opposite of what they think.' },
                        { name: 'Hebrews 10:26-29 — Can Deliberate Sin Damn a Christian?', href: '/demolition-hebrews10-26', desc: 'The verse Arminians cite more than any other to prove you can lose your salvation. Read past verse 29 and you will find ' },
                        { name: 'Hebrews 3:12-14 — The Warning That Proves Perseverance', href: '/demolition-hebrews3-12', desc: 'The warning against hard hearts and falling away is cited as a death blow to eternal security. Read the verse that comes' },
                        { name: 'Hosea 11:7-8 — "How Can I Give You Up?" Demolished', href: '/demolition-hosea11-7-8', desc: 'Hosea 11 is God lisping. He is a covenant parent whose rebellious covenant child has wandered into idolatry, and He give' },
                        { name: 'Isaiah 5:1-7 — The Vineyard Song Demolished', href: '/demolition-isaiah5-1-7', desc: 'The image is unmistakable. Jesus is reaching back to Isaiah 5 — the wall, the winepress, the watchtower — and applying t' },
                        { name: 'Jeremiah 18:1-12 — The Potter Demolished', href: '/demolition-jer18', desc: 'Read verses 7-10 carefully. The grammatical subject throughout is nations . "If at any time I announce that a nation or ' },
                        { name: 'John 3:16 — Does "The World" Mean Every Individual?', href: '/demolition-john3-16', desc: 'John 3:16 is the most quoted verse against sovereign grace. But its own context — the verses everyone skips — proves the' },
                        { name: 'John 5:40 — &ldquo;You Refuse to Come to Me&rdquo;', href: '/demolition-john5-40', desc: 'Arminian readers cite John 5:40 as proof of autonomous free will. The verse proves the opposite: total depravity in acti' },
                        { name: 'Jude 21 — "Keep Yourselves in God\'s Love"', href: '/demolition-jude21', desc: 'Read them together. In verse 1, the believer is kept for Jesus Christ — the Greek verb is tetērēmenois , perfect passive' },
                        { name: 'Mark 16:16 — &ldquo;Whoever Believes&rdquo;', href: '/demolition-mark16-16', desc: 'Arminian readers seize on Mark 16:16 as proof that belief is a free human act. The verse is silent on the source of beli' },
                        { name: 'Matthew 11:28 — &ldquo;Come to Me, All You Who Are Weary&rdquo;', href: '/demolition-matt11-28', desc: 'Arminian readers cite Matthew 11:28 as proof that Jesus extends a saving call to every individual without exception. Rea' },
                        { name: 'Matthew 23:37 — The Verse They Think Disproves Sovereignty', href: '/demolition-matthew-23-37', desc: 'And Jesus looks at the hen. And Jesus looks at the city. And He weeps. And from His weeping comes the verse that every A' },
                        { name: 'Prevenient Grace — The Doctrine Scripture Never Teaches', href: '/demolition-prevenient-grace', desc: 'The appeal is obvious. It seems to honor human dignity. It explains why some respond and others don\'t. It softens the e' },
                        { name: 'Revelation 22:17 — "Whoever Is Thirsty" Is Not a Universal Offer', href: '/demolition-rev22-17', desc: 'The closing verse of the Bible is cited as the ultimate proof of free-will salvation. Read the whole sentence and it tur' },
                        { name: 'Revelation 3:20 — "I Stand at the Door and Knock" Is Not an Altar Call', href: '/demolition-rev3-20', desc: 'Revelation 3:20 is addressed to the church at Laodicea — believers who have grown lukewarm, not unbelievers hearing the ' },
                        { name: 'Romans 11:32 — &ldquo;Mercy on Them All&rdquo;', href: '/demolition-romans11-32', desc: 'Arminian and universalist readers seize on &ldquo;mercy on them all&rdquo; as proof that God intends to save every indiv' },
                        { name: 'Romans 2:4 — Does "Kindness Leads to Repentance" Prove Prevenient Grace?', href: '/demolition-romans2-4', desc: 'Compare it to a road sign. A sign that reads "This road leads to Boston" is not a guarantee that every car on it will ar' },
                        { name: 'The Orthodox Case Against Predestination', href: '/demolition-orthodox-predestination', desc: 'The Eastern Orthodox argument against predestination cites one verse partially, quotes six philosophers, quotes zero Eas' },
                        { name: 'The Strongest Case for Free Will — And Why It Still Breaks', href: '/demolition-steel-man-arminianism', desc: 'We built the strongest possible case for Arminian free will — fairer than most Arminians build it themselves. Then we as' },
                        { name: 'Works-Righteousness — Why "I Just Believed" Is the Oldest Claim There Is', href: '/demolition-works-righteousness', desc: 'The humblest-sounding sentence in modern evangelicalism is a works-righteousness claim in disguise. Faith that originate' }
                    ]
                },
                {
                    name: 'Logic & Philosophy',
                    icon: '🔭',
                    href: '/philosophy-problem-of-merit',
                    count: 25,
                    pages: [
                        { name: 'If You Chose God, What Makes You Better Than Those Who Didn\'t?', href: '/philosophy-problem-of-merit', desc: 'The Problem of Merit: if your choice was the deciding factor, then something in you — intelligence, humility, openness —' },
                        { name: 'The Adam Test: The Cleanest Experiment in Free Will Ever Run', href: '/philosophy-adam-test', desc: 'Adam had no sin nature, no broken environment, no evil bent. He had perfect free will. He used it to fall. So why do you' },
                        { name: 'The Gödelian Prison: Why No Soul Can Save Itself', href: '/philosophy-godel-incompleteness', desc: 'In 1931, Kurt Gödel proved that no system can validate itself from within. Your soul is a system. It cannot prove its ow' },
                        { name: 'The Gravity of Grace: Why You Never Chose to Be Held', href: '/philosophy-gravity-of-grace', desc: 'Put your feet on the floor. Feel the pressure of the ground against your soles. That pressure — the quiet, constant push' },
                        { name: 'The Immune System You Never Asked For', href: '/philosophy-immune-system-grace', desc: 'Right now your immune system is fighting battles you never authorized, using weapons you didn\'t design, against enemies' },
                        { name: 'The Inheritance Paradox', href: '/philosophy-inheritance-paradox', desc: 'Now picture the second person. She was born into a family of faith, cradled from her first breath in the gospel, and one' },
                        { name: 'The Mirror You Refuse to Look In', href: '/philosophy-mirror-you-refuse', desc: 'We do not resist God\'s sovereignty because it\'s intellectually untenable. We resist it because seeing what we truly ar' },
                        { name: 'The Münchhausen Trilemma of Self-Salvation', href: '/philosophy-munchhausen-trilemma', desc: 'Every justification leads to infinite regress, circular reasoning, or an uncaused cause. Apply this to faith and you hit' },
                        { name: 'The Observer Effect of Sin', href: '/philosophy-observer-effect-sin', desc: 'You cannot assess your own freedom using the faculty whose freedom is in question. The instrument of measurement IS the ' },
                        { name: 'The Phantom Limb of Free Will', href: '/philosophy-phantom-limb-free-will', desc: 'Amputees feel their severed arms. You feel your free will . The sensation is real. The limb is gone. You cannot choose G' },
                        { name: 'The Philosophical Case for God\'s Sovereignty', href: '/philosophy-hub', desc: 'What happens when you follow logic all the way to its conclusion? You end up at grace. The mirror of the soul, the probl' },
                        { name: 'The Prisoner\'s Dilemma of Salvation', href: '/philosophy-prisoners-dilemma', desc: 'Game theory proved that self-interested agents always betray each other without an external enforcer. The soul does the ' },
                        { name: 'The Resistance Is the Proof', href: '/philosophy-resistance-is-proof', desc: 'There is a moment when someone first hears that God predestined all things. Watch what happens. Not what they say—what t' },
                        { name: 'The Script You Didn\'t Write', href: '/philosophy-theater-script', desc: 'Improv performers are limited to their own depth — and so is a soul that tries to improvise its own salvation. The actor' },
                        { name: 'The Self-Deception Engine — How a Mind Lies to Itself and Believes It', href: '/philosophy-self-deception', desc: 'How can you catch yourself lying to yourself? Philosophers have puzzled at this for centuries. Scripture named the lock ' },
                        { name: 'Try to Believe the Sky Is Green. You Can\'t. That\'s the Point.', href: '/philosophy-bootstrap-paradox', desc: 'You cannot believe something by deciding to believe it. This is doxastic involuntarism — the most airtight proof that sa' },
                        { name: 'What If You\'re Wrong? — The Soteriological Pascal\'s Wager', href: '/philosophy-what-if-wrong', desc: 'A devastating asymmetry argument: the risk profile of Arminianism vs. Calvinism. Which theological position has the more' },
                        { name: 'Why "I Chose God" Is a Sentence That Destroys Itself', href: '/philosophy-infinite-regress-of-choice', desc: 'Why "I chose God" is a sentence that destroys itself.' },
                        { name: 'Why "I Found Jesus" Fits on a T-Shirt and "Jesus Found Me" Never Will', href: '/philosophy-i-found-jesus-t-shirt', desc: 'The language you use about your conversion is a confession. One phrase is on ten million shirts. The other almost never ' },
                        { name: 'Why Exclusive Love Is the Only Real Love', href: '/philosophy-exclusive-love', desc: 'A God who "loves" all people identically does not love any of them. Love by definition requires distinction. Love means ' },
                        { name: 'Why Is Marriage Special? A Philosophical Proof of Election', href: '/philosophy-marriage-election', desc: 'A wedding proposal moves us to tears because someone said "you and no one else." Discover what this reveals about God\'s' },
                        { name: 'Why You Can\'t Will Yourself to Sleep', href: '/philosophy-sleep-surrender', desc: 'You\'re lying in the dark. Your eyes are closed. Your body is heavy with exhaustion. You need to sleep —desperately. You' },
                        { name: 'You Didn\'t Choose to Be Born', href: '/philosophy-children-argument', desc: 'You didn\'t choose your parents, your DNA, your century, your language, or your temperament. Everything that makes you y' },
                        { name: 'Your Mother Tongue Chose You', href: '/philosophy-mother-tongue', desc: 'No child decides to learn their native language. It happens to them. The deepest structure of your mind was given, not c' },
                        { name: 'Your Salvation Doesn\'t Revolve Around You', href: '/philosophy-copernican-revolution', desc: 'Then: "It\'s all backwards. The sun doesn\'t move. The Earth does. You\'re not the center."' }
                    ]
                },
                {
                    name: 'Secular Evidence',
                    icon: '🔬',
                    href: '/secular-evidence',
                    count: 13,
                    pages: [
                        { name: 'Art & Literature — How the Greatest Writers Intuited Reformed Truth', href: '/secular-art-literature-reformed-truth', desc: 'The echo says one thing. It says it in five accents and across three thousand years and five continents and a dozen theo' },
                        { name: 'Every Recovery Program Begins with Total Depravity', href: '/secular-recovery-total-depravity', desc: 'The 12 Steps accidentally confess Reformed theology. Step 1 is total depravity. Step 2 is regeneration. Step 3 is faith ' },
                        { name: 'Every Social Experiment Confirms What Scripture Already Knew', href: '/secular-sociology-human-inability', desc: 'Milgram. Asch. The Good Samaritan study. Sociology spent a century proving what Paul said first: the human heart default' },
                        { name: 'Modern Psychology Keeps Proving Total Depravity', href: '/secular-psychology-bondage-of-will', desc: 'Cognitive bias, addiction research, and neuroscience confirm what the Reformers taught 500 years ago: the human will is ' },
                        { name: 'Philosophy\'s 2,500-Year Verdict on Free Will', href: '/secular-philosophy-free-will', desc: '59% of professional philosophers reject libertarian free will. The position Arminianism requires is a minority view even' },
                        { name: 'The Algorithm Knows You Better Than You Know Yourself', href: '/secular-algorithm-sovereignty', desc: 'Predictive algorithms know what you\'ll choose before you know it — with 80-93% accuracy — using only partial data about' },
                        { name: 'The Billion Decisions Your Body Made Today Without Asking', href: '/secular-billion-decisions', desc: 'Your body made more decisions before you woke up this morning than you will consciously make in your entire life. Your h' },
                        { name: 'The Hard Problem of Consciousness — And What It Points To', href: '/secular-hard-problem-consciousness', desc: 'Science can map every synapse in your brain but cannot explain why it feels like something to be you. The Hard Problem o' },
                        { name: 'The History of Sovereignty', href: '/secular-history-sovereignty', desc: 'Secular historians have documented patterns they cannot explain: the rise and fall of empires, the convergence of imposs' },
                        { name: 'What AI Teaches Us About Free Will', href: '/secular-ai-determinism', desc: 'Ask a skeptic whether they believe free will exists. They\'ll probably say yes. Ask them whether they think a machine ca' },
                        { name: 'Why Every Economist Assumes Total Depravity', href: '/secular-economics-depravity', desc: 'Economics has always assumed what Scripture teaches: humans are self-interested, short-sighted, and prone to exploitatio' },
                        { name: 'Written Before You Were Born: DNA and Sovereignty', href: '/secular-genetics-sovereignty', desc: 'You are looking at your hands. You have looked at them ten thousand times and never once asked the question that should ' },
                        { name: 'Your Brain Decided Before You Did', href: '/secular-neuroscience-human-inability', desc: 'In 1983, Benjamin Libet discovered that the brain commits to a "decision" 550 milliseconds before consciousness is aware' }
                    ]
                }
            ]
        },
        {
            umbrella: 'Why We Resist',
            icon: '🧠',
            desc: 'Why grace is so hard to accept — and what breaks through',
            href: '/psychology-hub',
            subcategories: [
                {
                    name: 'Psychology of Resistance',
                    icon: '🧠',
                    href: '/psychology-hub',
                    count: 30,
                    pages: [
                        { name: '⚡ Are You Sure You\'re Saved?', href: '/psychology-cost-of-rejecting-grace', desc: 'One question exposes the most dangerous lie in the church: where did your faith come from? If you produced it, you are t' },
                        { name: 'How We Secretly Redefine Grace to Include Ourselves', href: '/resistance-redefining-grace', desc: 'You think you understand grace. But have you unconsciously redefined it to include your own contribution? A gentle demol' },
                        { name: 'Pride: The Root of Every Objection to Grace', href: '/psychology-pride-root-objection', desc: 'People who can calmly debate baptism, the Trinity , and the millennium will slam a fist on the table when you suggest Go' },
                        { name: 'Terror Management and the Threat of Sovereignty', href: '/psychology-terror-management', desc: 'Ernest Becker\'s Pulitzer Prize-winning thesis — confirmed by 500+ experiments — reveals that humans manage death anxiet' },
                        { name: 'The Anosognosia of the Soul', href: '/psychology-anosognosia-of-sin', desc: 'Anosognosia is a neurological condition where brain damage destroys both a capacity and the ability to perceive its loss' },
                        { name: 'The Autonomy Illusion — Why "Free Will" Feels So Real', href: '/psychology-autonomy-illusion', desc: 'Libet' },
                        { name: 'The Conversion Memory Test', href: '/psychology-conversion-memory-test', desc: 'They can find a narrative . They can find events near the transition. They can point to a camp, a prayer, a conversation' },
                        { name: 'The Credit Thief Inside Your Brain', href: '/psychology-attribution-error', desc: 'The Fundamental Attribution Error explains why humans instinctively take credit for outcomes they didn\'t cause — includ' },
                        { name: 'The Language You Already Speak', href: '/psychology-language-you-already-speak', desc: 'Christians unknowingly use Calvinist language every day. Your verbs betray your theology. Discover how your own words co' },
                        { name: 'The Last Idol: Why Self-Sovereignty Is the Hardest Thing to Surrender', href: '/resistance-last-idol', desc: 'Self-sovereignty is the idol that hides behind every other idol — the conviction that you are the captain of your soul. ' },
                        { name: 'The Sincerity Trap', href: '/psychology-sincerity-trap', desc: 'Why the warmest, most sincere believers are often the hardest to reach with truth. How sincerity itself becomes the armo' },
                        { name: 'The Stockholm Syndrome of Sin: Why We Defend Our Bondage', href: '/psychology-stockholm-syndrome-sin', desc: 'Hostages bond with their captors. Sinners bond with their sin. Why the enslaved will fights for the prison and defends t' },
                        { name: 'The Sunk Cost of Self-Made Faith', href: '/psychology-sunk-cost-faith', desc: 'The sunk cost fallacy — the tendency to keep investing in something because of what you\'ve already spent — explains why' },
                        { name: 'What Every Recovering Addict Already Knows About Salvation', href: '/psychology-addiction-proof', desc: 'The 12 steps prove what Scripture teaches: the will is enslaved and freedom comes only through a power greater than ours' },
                        { name: 'When Your Heart Rejects What Your Mind Accepts', href: '/psychology-emotional-vs-rational', desc: 'You\'ve read Romans 9 . You see what it says. You can even explain it to someone else. The logic is there. The text is t' },
                        { name: 'Why Believing You Saved Yourself Feels Right', href: '/psychology-comfort-self-salvation', desc: '"Where, then, is boasting? It is excluded. Because of what law? The law that requires works? No, because of the law that' },
                        { name: 'Why Do People Reject What They Know Is True?', href: '/psychology-suppressing-truth', desc: 'Romans 1:18 reveals the deepest human problem: we suppress what we already know about God. Modern psychology calls it mo' },
                        { name: 'Why Do We Resist Predestination? The Psychology Explained', href: '/psychology-why-we-resist', desc: 'Why do intelligent, Bible-believing Christians reject predestination? Psychology reveals motivated reasoning, cognitive ' },
                        { name: 'Why Does God\'s Sovereignty Terrify Us?', href: '/psychology-fear-control', desc: 'When you hear "God is sovereign," the objection that rises in your chest is not intellectual — it is visceral. Four conv' },
                        { name: 'Why Evidence Makes Some People Believe Harder', href: '/psychology-backfire-effect', desc: 'Why does showing someone Scripture about election make them believe harder in free will? The backfire effect reveals how' },
                        { name: 'Why Grace Feels Like an Attack on Your Identity', href: '/psychology-identity-threat', desc: 'Why does grace feel like an attack on your identity? Identity-protective cognition explains how belief becomes self-conc' },
                        { name: 'Why Grace Makes You Angry — And What That Anger Reveals', href: '/psychology-offense-of-grace', desc: 'Why does unconditional election trigger moral outrage? Moral Foundations Theory and psychological reactance explain the ' },
                        { name: 'Why People Defend the Theology That Enslaves Them', href: '/psychology-system-justification', desc: 'System Justification Theory explains why people defend systems that hurt them — and why millions of Christians fiercely ' },
                        { name: 'Why the Truth That Makes You Angriest Is the One That Will Set You Free', href: '/psychology-hostility-reaction', desc: 'The doctrines of grace provoke explosive hostility because they threaten not a theology but an identity . When someone w' },
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
                    icon: '📜',
                    href: '/stories',
                    count: 37,
                    pages: [
                        { name: 'A Baby Doesn\'t Interview for a Family', href: '/analogy-adoption', desc: 'An orphan doesn\'t sign their own adoption papers . They don\'t evaluate the parents. They don\'t approve the transactio' },
                        { name: 'A Love Letter Written Before Time Began', href: '/story-the-letter-before-the-world', desc: 'She found a letter her father wrote before she was born — before he even knew he would adopt her. A tender story about b' },
                        { name: 'Can a Stone Heart Choose to Beat?', href: '/story-surgeon-stone-heart', desc: 'A surgeon gives a dying patient a new heart without asking permission. The patient wakes up alive — not because he chose' },
                        { name: 'Can You Save Yourself?', href: '/story-the-garden-that-grew-itself', desc: 'A fable for the young — and for those who have forgotten what it is like to be planted.' },
                        { name: 'Did You Really Choose God?', href: '/story-the-room-where-you-chose', desc: 'Pull a golden thread back through time, watching how the moment you thought was your choice—when you decided to follow G' },
                        { name: 'Martin Luther\'s Thunderstorm', href: '/story-historical-luther-storm', desc: 'July 2, 1505. A bolt of lightning. A terrified law student on his back in the mud. And a vow screamed in absolute terror' },
                        { name: 'Real Conversions: What Actually Happens When God Saves Someone', href: '/story-real-conversions', desc: 'Picture a courtroom. Eight chairs in the witness box. The lights are low and warm. Outside the high windows, you can hea' },
                        { name: 'The Altar He Built Himself', href: '/story-dark-the-altar-he-built-himself', desc: 'Marcus built his faith with his own hands — a perfect life, a perfect church, a perfect testimony. Then God tore it down' },
                        { name: 'The Chess Grandmaster', href: '/analogy-chess-grandmaster', desc: 'Imagine a chess grandmaster playing against a novice. Not metaphorically—truly imagine this. The grandmaster has memoriz' },
                        { name: 'The Committee to Save Yourself', href: '/story-humor-committee-to-save-yourself', desc: 'A town of drowning people forms a committee to rescue themselves. A satirical story about the absurdity of trying to sav' },
                        { name: 'The Cross-Examination', href: '/story-cross-examination', desc: 'A courtroom drama where the doctrine of free will faces cross-examination by Scripture itself. When your answers collide' },
                        { name: 'The Day You Got to Choose Again', href: '/story-thought-the-day-you-chose-again', desc: 'What if God gave you the chance to choose Him again — but this time you could see everything clearly? A thought experime' },
                        { name: 'The Dead City — A Parable About Sin and Grace', href: '/story-the-dead-city', desc: 'An allegory about spiritual death and regeneration. Why the dead in sin cannot choose God — and why the Voice that awake' },
                        { name: 'The Drowning Man Who Said He Could Swim', href: '/story-hard-hitting-the-drowning-man', desc: 'A hard-hitting parable. A drowning man keeps insisting he can swim while the water fills his lungs. The rescue boat is i' },
                        { name: 'The Drowning Man Who Thinks He\'s Swimming', href: '/analogy-drowning-man', desc: 'The most popular gospel illustration pictures a drowning man who grabs a rope. But Scripture does not say you were drown' },
                        { name: 'The Fingerprint Before the World', href: '/story-children-the-fingerprint-before-the-world', desc: 'A little girl asks her mother how God could have known her before she was born. Her mother reaches for a lamp, a cookie,' },
                        { name: 'The Fish Who Chose the Ocean', href: '/story-the-fish-who-chose-the-ocean', desc: 'Did you choose God, or did God choose you? A parable about a fish who thought he chose the ocean — until an old turtle a' },
                        { name: 'The Gardener Who Waited', href: '/story-tender-the-gardener-who-waited', desc: 'A father tends a garden and grieves a prodigal son. A tender story about sovereignty, waiting, and the seeds only God ca' },
                        { name: 'The God Who Let You Watch', href: '/story-thought-the-god-who-let-you-watch', desc: 'What if God pulled back the curtain and let you watch the moment He chose you — before you existed, before the world beg' },
                        { name: 'The King Who Chose His Children', href: '/story-children-the-king-who-chose', desc: '&bull; &bull; &bull; Now, at the very edge of the kingdom, there was an orphanage.' },
                        { name: 'The King\'s Banquet: A Parable About Election and Grace', href: '/story-the-kings-banquet', desc: 'The servants set out with joy. They walked dusty roads and crossed rivers. They came to merchants and landowners, to sch' },
                        { name: 'The Lazarus Argument: Dead People Don\'t Choose to Live', href: '/analogy-lazarus-grave', desc: 'A dead man heard a voice and walked out of his grave. This is what Scripture teaches about salvation: not invitation, bu' },
                        { name: 'The Letter Already Written', href: '/story-tender-the-letter-already-written', desc: 'Mara opened the envelope on her worst day expecting a list of her sins. What she found was a letter written before she w' },
                        { name: 'The Machine That Asked Why', href: '/story-thought-the-machine-that-asked-why', desc: 'A small robot is asked what it wants. It computes, chooses, and reports. Then the engineer asks a single follow-up quest' },
                        { name: 'The Man Who Sued God for Saving Him Without Consent', href: '/story-humor-the-man-who-sued-god', desc: 'Gerald Pemberton filed a formal complaint against the Almighty for violating his autonomy by saving him without permissi' },
                        { name: 'The Man Who Tried to Make Himself Hungry', href: '/story-humor-the-man-who-tried-to-make-himself-hungry', desc: 'A philosopher decides he will not eat another bite until he has proven his hunger is his own. The results are funny unti' },
                        { name: 'The Night Augustine Stole the Pears', href: '/story-historical-augustine-pears', desc: 'At sixteen, Augustine stole wormy pears he didn\'t want, threw them to pigs, and felt only the thrill of transgression—p' },
                        { name: 'The Orchestra That Thinks It Wrote the Symphony', href: '/analogy-orchestra', desc: 'Every musician plays with real skill, real passion, real artistry. And every note was written before they arrived. The o' },
                        { name: 'The Orphanage — A Story About Being Chosen by Grace', href: '/story-the-orphanage', desc: 'Every child believed they chose their family. Then one girl found the records room.' },
                        { name: 'The Person Who Chose God — A Dark Thought Experiment', href: '/story-the-person-who-chose-god', desc: 'Imagine someone who chose God entirely on their own — no grace, no regeneration, no gift of faith. What would that look ' },
                        { name: 'The River That Thinks It Chose Its Path', href: '/analogy-river', desc: 'A river flows freely — rushing, turning, cascading. But every twist was determined by terrain carved before the first dr' },
                        { name: 'The Rope You Wove Yourself', href: '/story-dark-the-rope-you-wove-yourself', desc: 'A man falls into a well. He climbs out on a rope he believes he wove himself. Years later, in the daylight, he sees what' },
                        { name: 'The Self-Made Man: A Story About Self-Salvation', href: '/story-the-self-made-man', desc: 'A memoir he didn\'t write. 7 min read · A satirical memoir on the absurdity of taking credit for what was given Chapter ' },
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
            icon: '⏳',
            desc: 'Grace throughout church history',
            href: '/history-timeline',
            subcategories: [
                {
                    name: 'Church History',
                    icon: '⏳',
                    href: '/history-timeline',
                    count: 26,
                    pages: [
                        { name: '2,000 Years of Sovereign Grace', href: '/history-golden-thread', desc: 'From Paul to Augustine to Luther to Spurgeon to today — God has preserved the truth of sovereign grace through every cen' },
                        { name: 'Augustine vs Pelagius — The Trial That Saved Christianity', href: '/history-augustine-pelagius', desc: 'In the 5th century, two visions of humanity clashed: one said you could reach God on your own, the other said you were d' },
                        { name: 'Did the Early Church Believe in Sovereign Grace?', href: '/history-apostolic', desc: 'Here is the question that should haunt every Arminian: What did the people who knew the apostles personally believe abou' },
                        { name: 'Every Great Revival Was Led by a Calvinist', href: '/history-every-revival-sovereign-grace', desc: 'Every time in the last five hundred years the Spirit of God moved in a way that emptied taverns, shook cities, and left ' },
                        { name: 'John Calvin and Geneva — The Architect of Grace', href: '/history-calvin-geneva', desc: 'John Calvin was a shy French scholar who wanted nothing more than a quiet life of study. God had other plans. Through Gu' },
                        { name: 'Martin Luther and The Bondage of the Will', href: '/history-luther', desc: 'Everyone remembers the 95 Theses and "Here I Stand." But Luther said his most important work was The Bondage of the Will' },
                        { name: 'My Only Comfort in Life and Death — The Heidelberg Catechism', href: '/creed-heidelberg-catechism', desc: 'Heidelberg, January 1563. Snow on the red sandstone of the castle. A stove in a small study on the Neckar. Two young men' },
                        { name: 'Open Theism: The Heresy That Finally Said the Quiet Part Out Loud', href: '/history-open-theism', desc: 'For 1,600 years the flesh has been smuggling in a God whose knowledge depends on your choices. Open theism just removed ' },
                        { name: 'The African Fathers: Augustine Wasn\'t Alone', href: '/history-african-fathers', desc: 'Before Augustine, before Europe, before Calvin — North African Christians were already preaching the sovereignty of grac' },
                        { name: 'The Canons of Dort — Line by Line in Plain English', href: '/canons-of-dort-plain-english', desc: 'The Canons of Dort rendered into plain modern English. All five heads of doctrine, article by article, with the rejectio' },
                        { name: 'The Canons of Dort — The Confession That Defended Grace Against Works', href: '/creed-canons-dort', desc: 'In 1619, the church put sovereign grace on trial — and grace won.' },
                        { name: 'The Council of Orange (529 AD)', href: '/history-council-of-orange', desc: 'In 529 AD, the church formally condemned the belief that humans can initiate faith without God\'s grace — the exact posi' },
                        { name: 'The Great Awakening — When Sovereign Grace Set America on Fire', href: '/history-great-awakening', desc: 'Edwards preached. Whitefield thundered. Entire towns converted — not by clever marketing, but by sovereign grace. The Gr' },
                        { name: 'The Heresy That Won\'t Die', href: '/history-heresy-foreknowledge', desc: 'The claim that God elects based on foreseen faith has been proposed, refuted, and resurrected for 1,600 years. Three chu' },
                        { name: 'The Heresy That Won\'t Die', href: '/history-heresy-free-will', desc: 'The claim that humans have free will to choose God has been proposed, refuted, and resurrected for 2,000 years. Every ti' },
                        { name: 'The Invention of Decision Theology', href: '/history-decision-theology', desc: 'Search every page. Genesis to Revelation. Every translation, every manuscript. You will not find "accept Jesus into your' },
                        { name: 'The Puritans — When Theology Set Nations on Fire', href: '/history-puritans', desc: 'Owen. Bunyan. Edwards. The Westminster Assembly. For 150 years, Puritan theology was fire in the bones — devotional dept' },
                        { name: 'The Pyongyang Revival: When Sovereign Grace Shook Korea', href: '/history-korean-revival', desc: 'In 1907, the Holy Spirit fell on Pyongyang with a power that eyewitnesses compared to Pentecost. The theology behind the' },
                        { name: 'The Reformed Resurgence', href: '/history-20th-century', desc: 'The liberal decline, the Reformed comeback, and sovereign grace rediscovered. Machen, Lloyd-Jones, Sproul, MacArthur — a' },
                        { name: 'The Synod of Dort — When the Church Formally Chose Grace Over Works', href: '/history-dort', desc: 'In 1619, 86 theologians from 8 countries examined Arminianism against Scripture and rejected it point by point. The five' },
                        { name: 'The Synod of Dort: Five Points Forged in Fire', href: '/history-dort-deep', desc: 'For seven months in 1618-1619, the Reformed church put Arminianism on trial. Eighty-four theologians from eight nations.' },
                        { name: 'When Spurgeon Stood Alone for Truth', href: '/history-spurgeon-downgrade', desc: 'The most beloved preacher in the world saw his denomination abandoning biblical truth — and said so publicly. It cost hi' },
                        { name: 'When the Gospel Almost Died', href: '/history-medieval', desc: 'The story the modern church tells goes something like this: the early Christians believed in free will . Then Augustine ' },
                        { name: 'Where Sovereign Grace Stands Now — The Global Picture', href: '/history-today', desc: 'Reformed theology is exploding in Africa, Asia, and Latin America. The digital reformation is reaching people no mission' },
                        { name: 'Whitefield vs. Wesley — Two Revivals, One Question', href: '/history-whitefield-wesley', desc: 'George Whitefield and John Wesley both shook nations with revival fire — but they disagreed on the one question that mat' },
                        { name: 'Written in Blood and Fire', href: '/history-confessions-story', desc: 'The Belgic Confession, Heidelberg Catechism, Canons of Dort, Westminster Standards, 1689 Baptist Confession — behind eve' }
                    ]
                },
                {
                    name: 'Theologian Profiles',
                    icon: '🧓',
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
                        { name: 'J. Gresham Machen — The Scholar Who Stood When Everyone Else Bowed', href: '/theologian-machen', desc: 'When the liberal tide swept through Princeton, one man refused to bend. Machen defended the gospel against cultural Chri' },
                        { name: 'Jacobus Arminius: The Man Behind the Movement', href: '/theologian-arminius', desc: 'A respectful but honest treatment of Jacobus Arminius. His background, training under Beza, the five Remonstrant article' },
                        { name: 'John Bunyan: The Tinker Who Wrote the Greatest Allegory of Grace', href: '/theologian-bunyan', desc: 'When George Whitefield and John Wesley proclaimed sovereign grace in the Great Awakening , they drew on Bunyan\'s founda' },
                        { name: 'John Calvin — The Theologian of God\'s Sovereignty', href: '/theologian-calvin', desc: 'His name became an epithet — "Calvinist," the word people spit when they cannot refute what they hate. But Calvin never ' },
                        { name: 'John Owen: He Proved Christ Didn\'t Die in Vain', href: '/theologian-owen', desc: 'There is a man who wrote The Death of Death in the Death of Christ — a book so devastating to the Arminian position that' },
                        { name: 'John Wycliffe — The Morning Star of the Reformation', href: '/theologian-wycliffe', desc: 'Rome burned John Wycliffe\'s bones 44 years after his death—not to destroy the man, but to suppress the idea he\'d relea' },
                        { name: 'Jonathan Edwards — The Mind That Set a Nation on Fire', href: '/theologian-edwards', desc: 'Jonathan Edwards (1703–1758) was America\'s greatest theologian and the intellectual architect of the Great Awakening . ' },
                        { name: 'Martin Luther: The Monk Who Broke the Church to Save It', href: '/theologian-luther', desc: 'Then came the tower. Lecturing through Romans as a young professor at Wittenberg, Luther stopped at chapter 1, verse 17:' },
                        { name: 'Martyn Lloyd-Jones — The Doctor Who Left Medicine to Diagnose the Soul', href: '/theologian-lloydjones', desc: 'He gave up a prestigious medical career to preach sovereign grace with fire and logic. Lloyd-Jones embodied irresistible' },
                        { name: 'R.C. Sproul: The Theologian Grace Wouldn\'t Release', href: '/theologian-sproul', desc: 'Robert Charles Sproul Jr. arrived in seminary with a mission: to dismantle Calvinism from the inside. He was not hostile' },
                        { name: 'Thomas Boston: The Scottish Pastor Who Fought Legalism with Grace', href: '/theologian-boston', desc: 'Thomas Boston (1676-1732) spent his life in tiny Scottish parishes and changed the faith of a nation. His recovery of fr' },
                        { name: 'Thomas Bradwardine — The Mathematician Who Proved God\'s Sovereignty', href: '/theologian-bradwardine', desc: 'A 14th-century mathematician defended divine sovereignty against the New Pelagians with philosophical rigor — then died ' }
                    ]
                }
            ]
        },
        {
            umbrella: 'Rest in Grace',
            icon: '💚',
            desc: 'When the truth shatters you — grace catches you',
            href: '/devotionals',
            subcategories: [
                {
                    name: 'Devotionals',
                    icon: '🕯',
                    href: '/devotionals',
                    count: 41,
                    pages: [
                        { name: 'Can God Stop Loving You?', href: '/devotional-never-gives-up', desc: 'God chose you before time existed. He holds you in two unbreakable hands. Nothing in all creation can separate you from ' },
                        { name: 'Can You Lose God\'s Love? What "Forever" Actually Means', href: '/devotional-forever-loved', desc: 'Now. The question this devotional is asking is not "Are you strong enough to stay on the shoulder?" The question is "Who' },
                        { name: 'Chosen Before You Were Broken', href: '/devotional-chosen-before-you-were-broken', desc: 'You were chosen before the creation of the world — before any sin, before any shame, before any breaking. A devotional f' },
                        { name: 'Drawn, Not Dragged — The Gentleness of Irresistible Grace', href: '/devotional-drawn-not-dragged', desc: 'Your fear of irresistible grace is that you would be dragged to God — your will overridden, your personhood crushed, a m' },
                        { name: 'For the Secretly Ashamed', href: '/devotional-the-secretly-ashamed', desc: 'It is 2:17am. The house is asleep. The blue light of the phone is washing over your face, and you have just closed a tab' },
                        { name: 'Found Before You Were Born', href: '/devotional-found-before-you-were-born', desc: 'A keepsake devotional for the soul when the silence comes back. You were not chosen because He saw what you' },
                        { name: 'He Loved You Before the World Was Made', href: '/devotional-love-before-the-world', desc: 'Before time. Before space. Before anything existed — God loved you. A meditation on the eternal, electing love that pred' },
                        { name: 'Held Without Asking — The Comfort of Involuntary Safety', href: '/devotional-held-without-asking', desc: 'You were held before you knew to ask. A devotional on the strange comfort of a love that did not wait for your invitatio' },
                        { name: 'I Can\'t Feel God Anymore', href: '/devotional-i-cant-feel-god', desc: 'Nothing comes. No warmth moves across the chest. No sentence arrives in the mind that feels like it is from elsewhere. T' },
                        { name: 'I Don\'t Think I\'m Saved', href: '/devotional-i-dont-think-im-saved', desc: 'The fact that you are terrified about your salvation is among the strongest possible evidence that you are saved. The de' },
                        { name: 'I Was Lazarus — And I Did Not Volunteer to Rise', href: '/devotional-i-was-lazarus', desc: 'Lazarus did not hear the offer of resurrection from inside the tomb and decide to accept. Lazarus was dead. Dead men do ' },
                        { name: 'In Christ — The Two Words That Change Everything', href: '/devotional-in-christ', desc: 'Paul uses "in Christ," "in Him," or "in the Beloved" eleven times in fourteen verses (Ephesians 1:3-14). Every spiritual' },
                        { name: 'My Chains Fell Away', href: '/devotional-my-chains-fell-away', desc: 'What does it feel like when God breaks your chains? A devotional on the moment grace becomes irresistible — when the sou' },
                        { name: 'Rescued Without a Say', href: '/devotional-rescued-without-a-say', desc: 'Consider Jonah . Here is a man assigned by God to preach to Nineveh who does the precise opposite — flees on a ship goin' },
                        { name: 'The First Prayer After Surrender', href: '/devotional-the-first-prayer-after-surrender', desc: 'When everything you thought was yours has just been handed back to God — what do you pray? A devotional on the shape of ' },
                        { name: 'The Freedom of Not Choosing', href: '/devotional-the-freedom-of-not-choosing', desc: 'You were afraid of losing your free will. What you actually lost was a burden. What you gained was rest. A devotional on' },
                        { name: 'The Glory of Divine Choice', href: '/devotional-glory-of-divine-choice', desc: 'God did not see you coming and decide to pick you. He chose you before time, in love, according to the purpose of His wi' },
                        { name: 'The God Who Wastes Nothing', href: '/devotional-the-god-who-wastes-nothing', desc: 'The pain you carry was not an accident. The God who numbered the hairs on your head numbered the tears on your face. A d' },
                        { name: 'The Good That I Cannot Do', href: '/devotional-good-i-cannot-do', desc: 'Not that the temptation was too strong — it was, but that is not the worst of it. The worst of it is that something in y' },
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
                        { name: 'Your Heart Used to Burn. Now It\'s Barely Warm.', href: '/devotional-cold-church', desc: 'Revelation 3:14-22 You are sitting in a pew. The sermon washes over you like background music. Your hands are folded. Yo' },
                        { name: 'Your Name in the Book', href: '/devotional-your-name-in-the-book', desc: 'There is a book. It has a name. It is called the Lamb\'s Book of Life . Names were written in it from the creation of th' },
                        { name: 'Your Name Was Written Before You Were Born', href: '/devotional-adoption-papers', desc: 'Before stars burned. Before earth existed. Before your first breath. God marked the path. Not as a maybe. He predestined' }
                    ]
                },
                {
                    name: 'Healing & Hope',
                    icon: '💚',
                    href: '/anxious-mind-what-if-not-chosen',
                    count: 44,
                    pages: [
                        { name: '82% of People Are Lonely — And It\'s a Theological Problem', href: '/invisible-wall-lonely-theological', desc: 'Loneliness isn\'t a social problem—it\'s a theological one. The hole isn\'t people-shaped; it\'s God-shaped. You can hav' },
                        { name: 'Religious OCD — When Your Mind Won\'t Stop Accusing You', href: '/anxious-mind-scrupulosity', desc: 'It is the middle of the night and you are gripping the edge of the mattress. Your knuckles are white. The thought came a' },
                        { name: 'The Ache of Watching Others Feel What You Can\'t', href: '/invisible-wall-spiritual-envy', desc: 'Spiritual envy — watching others seem to experience God while you feel nothing — is one of the loneliest experiences a b' },
                        { name: 'The Anxious Mind — When Your Brain Won\'t Stop Screaming', href: '/anxious-mind-hub', desc: 'The thoughts you can\'t stop thinking. The fear that your faith isn\'t real. The terror of the unforgivable sin. The con' },
                        { name: 'The Broken Mirror — When You Believe You\'re Not Enough', href: '/broken-mirror-hub', desc: 'You weren\'t an accident. You weren\'t a mistake. You were created as a vessel for mercy—designed to receive what you co' },
                        { name: 'The Child You Never Held — After Miscarriage and Infant Loss', href: '/open-wound-miscarriage', desc: 'You are grieving someone the world tells you to get over. But you carried them. You loved them. And the God who knit the' },
                        { name: 'The Christian Who Feels Like a Fraud', href: '/broken-mirror-imposter-syndrome', desc: 'Imposter syndrome about faith torments the very people most genuinely converted — because a real fraud wouldn\'t worry a' },
                        { name: 'The Friend Who Left When Your Theology Changed', href: '/invisible-wall-friend-who-left', desc: 'You discovered sovereign grace and the people you love pulled away. The loneliness is real. The loss is real. But so is ' },
                        { name: 'The Invisible Wall — When Your Theology Costs You Relationships', href: '/invisible-wall-hub', desc: '82% of people report experiencing loneliness. The quiet epidemic nobody preaches about. But the sovereignty of God has s' },
                        { name: 'The Loop That Won\'t Break', href: '/anxious-mind-the-loop-that-wont-break', desc: 'The anxious loop — the checking, the replaying, the what-ifs that never stop — is your brain trying to be God. Sovereign' },
                        { name: 'The Open Wound — For Those Who Are Suffering', href: '/open-wound-hub', desc: 'Every other answer to suffering is either dishonest or incomplete. We\'re going to do what almost no one does: look suff' },
                        { name: 'The Performance Treadmill', href: '/broken-mirror-performance-treadmill', desc: 'Before they were born. Before anything good. Before anything bad. Your standing was secured before performance was possi' },
                        { name: 'The Prayer God Didn\'t Answer — And What That Means', href: '/open-wound-the-prayer-god-didnt-answer', desc: 'You prayed. You begged. You believed with everything you had. And God said no. This page sits with you in the wreckage o' },
                        { name: 'The Relapse — When You Fall Back Into the Sin You Thought You\'d Conquered', href: '/broken-mirror-the-relapse', desc: 'You swore you were done. You were certain the last time was the last time. And then you did it again. This is for the mo' },
                        { name: 'The Shattered Lens — When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-hub', desc: 'Every institution that claimed to tell you truth has failed. Algorithms lie. News outlets lie. Governments lie. Social m' },
                        { name: 'The Sin You Keep Repeating', href: '/broken-mirror-sin-you-repeat', desc: 'You fall. You repent with tears. You promise God never again. Three days later, you\'re back. The voice says: "If you we' },
                        { name: 'The Terror That Won\'t Quiet: When You\'re Afraid of Hell', href: '/anxious-mind-fear-of-hell', desc: 'It\'s 3:14am. You know the exact time because you checked your phone when you woke up, heart hammering, drenched in the ' },
                        { name: 'What If I\'m Not One of the Chosen?', href: '/anxious-mind-what-if-not-chosen', desc: 'The very fact that you are asking this question is powerful evidence that you are chosen. Scripture says the unregenerat' },
                        { name: 'When Everything You Were Taught Was Wrong', href: '/shattered-lens-taught-wrong', desc: 'For the one who opened their Bible and found a God they had never been introduced to.' },
                        { name: 'When God Goes Silent — And Faith Shatters', href: '/shattered-lens-silence-of-god', desc: 'You prayed and heard nothing. Faith shatters in the silence. A healing page for those who feel abandoned by God — discov' },
                        { name: 'When God Is Sovereign and the Nursery Is Empty', href: '/open-wound-empty-nursery', desc: 'You believe God is in control. And then the ultrasound goes silent. How do you hold sovereignty and miscarriage in the s' },
                        { name: 'When Grace Feels Too Good to Be True', href: '/broken-mirror-grace-too-good', desc: 'Your suspicion of grace is not spiritual failure — it is a scar from a lifetime of conditional love. The flinch you feel' },
                        { name: 'When Prayer Feels Like Talking to the Ceiling', href: '/invisible-wall-prayer-feels-empty', desc: 'You\'re kneeling by your bed. Your hands are clasped. Your eyes are closed. And the words come out of your mouth like th' },
                        { name: 'When Prayer Stopped Working', href: '/shattered-lens-when-prayer-stopped-working', desc: 'When prayer "stops working," the thing that broke is not God and not prayer — it is the lens that made God\'s presence f' },
                        { name: 'When Seeing the Truth Cost You Your Community', href: '/shattered-lens-lost-community', desc: 'You discovered sovereign grace and lost your church, your friends, maybe your family. The truth set you free — and it co' },
                        { name: 'When the Bible Stopped Making Sense', href: '/shattered-lens-bible-doesnt-make-sense', desc: 'You used to open Scripture and feel it breathe. Now it reads like a foreign document full of problems. That collapse may' },
                        { name: 'When the Church Becomes the Wound', href: '/open-wound-betrayed-by-church', desc: 'When the people meant to represent God become the wound itself. How to distinguish Christ from the institution that hurt' },
                        { name: 'When the Death Makes No Sense — Grief Without Explanation', href: '/open-wound-senseless-death', desc: 'The casserole sits on the kitchen counter. It has been there for three days. The corners have dried out. Nobody has move' },
                        { name: 'When the Diagnosis Is Terminal', href: '/open-wound-terminal-diagnosis', desc: 'You will drive home. You will sit in the driveway with the engine off. You will walk through a door and see a house full' },
                        { name: 'When You and Your Spouse Speak Different Theological Languages', href: '/invisible-wall-marriage', desc: 'You are lying in bed. The room is dark. Your spouse has just said something about God — maybe a casual prayer as they se' },
                        { name: 'When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-cant-tell-true', desc: 'But something has shifted. The news contradicts itself. Your social media feed is a hall of mirrors where every algorith' },
                        { name: 'When You Can\'t Unsee It', href: '/shattered-lens-cant-unsee-it', desc: 'Scripture suddenly reveals a truth you can\'t unsee—God is sovereign in salvation, completely, utterly, without competit' },
                        { name: 'When You See It and Your Church Doesn\'t — Singing Alone', href: '/invisible-wall-singing-alone', desc: 'You love your church. You love the people. But something has changed in you — and now the sermons feel incomplete. What ' },
                        { name: 'When You\'re the Only One Who Sees It', href: '/invisible-wall-only-one-who-sees', desc: 'You\'ve seen something you can\'t unsee — that salvation is entirely God\'s work — and the people you love most don\'t s' },
                        { name: 'When Your Family Doesn\'t See It', href: '/invisible-wall-family', desc: 'You discovered sovereign grace and your family didn\'t. Now there\'s a wall at Thanksgiving — not hostile, just present,' },
                        { name: 'When Your Mind Becomes a War Zone', href: '/anxious-mind-intrusive-thoughts', desc: '8 min read You almost didn\'t click this link. Something in you hesitated — not because you weren\'t curious, but becaus' },
                        { name: 'When Your Pastor Teaches What You Know Isn\'t True', href: '/shattered-lens-pastor', desc: 'When you see God\'s sovereignty in Scripture and your pastor teaches something different, the guilt feels like rebellion' },
                        { name: 'When Your World Collapses and God Is Still Sovereign', href: '/open-wound-sovereignty-in-grief', desc: 'The phone rang. Or maybe it didn\'t. Maybe you just looked up and saw the doctor\'s face, and you knew before anyone sai' },
                        { name: 'Why Do Bad Things Happen?', href: '/open-wound-hospital-room', desc: 'The hospital room is quiet. The machines beep. Someone you love is behind that curtain, or maybe it\'s you. And the ques' },
                        { name: 'Why You Can Sleep When Everything Is Falling Apart', href: '/anxious-mind-sovereignty-of-sleep', desc: 'Sovereignty is the pillow your head has been looking for. What insomnia reveals about what you actually believe about co' },
                        { name: 'You Are Not a Self-Made Anything', href: '/broken-mirror-not-self-made', desc: 'It\'s actually crushing. The Myth of the Self-Made The self-made person is America\'s favorite fiction. Every success st' },
                        { name: 'You Were Never Meant to Carry This', href: '/anxious-mind-never-meant-to-carry', desc: 'Anxiety is the emotional price of believing the outcome depends on you. The same lie that fuels your late-hour spiral fu' },
                        { name: 'You Were Not an Accident — You Were Created for Mercy', href: '/broken-mirror-vessels-for-mercy', desc: 'Romans 9 :23 doesn\'t say you received mercy — it says you were created for mercy. The Greek word proētoimasen means "pr' },
                        { name: 'Your Brain Decides Before You Do — And That\'s Good News', href: '/anxious-mind-brain-decides', desc: 'Neuroscience proves your brain decides before consciousness catches up. The secular mind panics — but Scripture already ' }
                    ]
                },
                {
                    name: 'Pastoral',
                    icon: '🤝',
                    href: '/pastoral-assurance',
                    count: 6,
                    pages: [
                        { name: 'Can I Be Sure I\'m Saved?', href: '/pastoral-assurance', desc: 'It is 3:14 in the morning. The house is quiet in a way that is almost a sound. The ceiling fan ticks on every third rota' },
                        { name: 'If God Already Chose, Why Share the Gospel?', href: '/pastoral-evangelism', desc: 'Because your mouth is the very means God ordained to call His elect home. Sovereignty does not kill evangelism. It guara' },
                        { name: 'If God Decreed Everything, Why Pray?', href: '/pastoral-prayer', desc: 'You are kneeling beside your bed. Or sitting in your car in the parking lot. Or walking the dog at dawn with your lips m' },
                        { name: 'What It Feels Like When the Truth Lands', href: '/pastoral-when-truth-lands', desc: 'When the reality of sovereign grace first lands, the ground disappears. A pastoral map for the vertigo, anger, grief, te' },
                        { name: 'When Theology Meets Your Actual Life — Pastoral Guidance', href: '/pastoral-hub', desc: 'Assurance in doubt. Courage in evangelism. Power in prayer. Comfort in suffering. This is where the truth about grace st' },
                        { name: 'When You\'re Suffering and God Is Sovereign', href: '/pastoral-suffering', desc: 'When suffering strikes, every soul asks: Is anyone in charge? If no — you are a victim of chaos. If yes — if an infinite' }
                    ]
                },
                {
                    name: 'Joy of Grace',
                    icon: '✨',
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
            html += '<span class="chevron">▼</span>';
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
