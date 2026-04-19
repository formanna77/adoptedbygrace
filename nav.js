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
                        { name: '480+ Bible Verses That Prove God\'s Sovereignty in Salvation | Scripture Tsunami', href: '/scripture-tsunami', desc: 'They told you' },
                        { name: 'But What About Free Will and Fairness? — Phase 4', href: '/start-here-phase4', desc: 'Phase 4: The hardest objections to biblical theology answered — free will, fairness, John 3:16,' },
                        { name: 'Living as an Elect Child of God — Phase 5', href: '/start-here-phase5', desc: 'Phase 5: Living as an elect child of God — how sovereign grace transforms your assurance, prayer, worship, mission, and ' },
                        { name: 'New to Sovereign Grace? Start Here.', href: '/start-here', desc: 'Curious, skeptical, or searching? Pick your doorway into sovereign grace. Whether you' },
                        { name: 'The Five Points of Grace — TULIP Explained', href: '/start-here-phase2', desc: 'The five points of grace — Total Depravity, Unconditional Election, Limited Atonement, Irresistible Grace, Perseverance ' },
                        { name: 'What Does the Bible Actually Teach? — Phase 3', href: '/start-here-phase3', desc: 'Phase 3: What does the Bible actually teach about salvation? A passage-by-passage journey through Romans 9, Ephesians 1,' },
                        { name: 'What Is Reformed Theology? — Phase 1', href: '/start-here-phase1', desc: 'Phase 1: An honest introduction to what Reformed Christians believe about God, salvation, and grace — and why it matters' }
                    ]
                },
                {
                    name: 'Doorways for You',
                    icon: '🚪',
                    href: '/start-here',
                    count: 8,
                    pages: [
                        { name: 'For Pastors: Preaching Sovereign Grace Without Splitting Your Church', href: '/for-pastors', desc: 'How to faithfully preach the doctrines of grace to your congregation. Practical guidance for pastors navigating election' },
                        { name: 'For the Person Who Just Realized', href: '/just-realized', desc: 'You' },
                        { name: 'The Truth Will Set You Free', href: '/freedom', desc: 'God' },
                        { name: 'You Came Here Hunting for Intellectual Honesty', href: '/for-skeptics', desc: 'You don' },
                        { name: 'You Deconstructed Everything — Here\'s What\'s Left', href: '/for-deconstructed', desc: 'You tore it all down. The certainty. The structure. The God you thought you knew. But something survived. Something you ' },
                        { name: 'You Just Heard About Election and It Broke Your Brain', href: '/for-new-believers', desc: 'Someone told you God chooses who gets saved and your world tilted. That' },
                        { name: 'You Love Jesus. You\'re Just Missing Something.', href: '/for-arminians', desc: 'You were taught that your decision saved you. But what if the Bible says something different — something better? A gentl' },
                        { name: 'Your World Is Burning. God Isn\'t.', href: '/for-hurting', desc: 'You don' }
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
                    count: 72,
                    pages: [
                        { name: '"Not Because of Our Works" — 2 Timothy 1:9', href: '/question-2tim1-9', desc: '2 Timothy 1:9: God saved us' },
                        { name: 'Are Arminians Saved? What Scripture Actually Teaches About Grace and Works', href: '/question-are-arminians-saved', desc: 'Are Arminians saved? The most honest answer the Reformed world won' },
                        { name: 'Can God Blot Your Name from the Book of Life?', href: '/question-book-of-life', desc: 'If God warns He' },
                        { name: 'Can God Create a Universe He Doesn\'t Control? The Omnipotence Paradox Answered', href: '/question-sovereignty-logic', desc: 'Can God make a rock too heavy to lift? Can He create a world He doesn' },
                        { name: 'Can God\'s Plan for You Be Broken? Romans 8:28-30', href: '/question-goldchain', desc: 'Romans 8:28-30 — foreknown, predestined, called, justified, glorified. An unbreakable chain where every link is divine a' },
                        { name: 'Can You Lose Your Salvation?', href: '/apologetic-perseverance', desc: 'The Bible says you are held by two hands — yours and God' },
                        { name: 'Can You Lose Your Salvation? Ephesians 4:30', href: '/question-sealed', desc: 'Ephesians 4:30 proves once saved always saved. You are sealed by the Holy Spirit for the day of redemption — not until y' },
                        { name: 'Can You Truly Repent If You Reject Total Depravity?', href: '/question-repentance-total-depravity', desc: 'If repentance means agreeing with God about your sin, how can you repent while denying the depth Scripture describes? Pa' },
                        { name: 'Dead Bones Don\'t Volunteer — Ezekiel 37', href: '/question-ezekiel37', desc: 'Ezekiel 37' },
                        { name: 'Dead, Not Sick — The Bible\'s Diagnosis of the Human Condition', href: '/question-depravity', desc: 'Total depravity is not about being as bad as possible — it' },
                        { name: 'Did God Choose You Before You Were Born?', href: '/question-chosen', desc: 'Before the foundation of the world, God chose you. Ephesians 1:3-11 doesn' },
                        { name: 'Did Jesus Die for Everyone? Scripture on Definite Atonement', href: '/apologetic-definite-atonement', desc: 'Did Jesus die for everyone? Scripture teaches that Christ' },
                        { name: 'Does "Foreknowledge" Mean God Saw You\'d Believe? Not Even Close.', href: '/question-foreknowledge', desc: 'The Greek proginōskō means to choose beforehand, not preview the future. Romans 8:29 is not God reacting to foreseen fai' },
                        { name: 'Does God Change Your Heart Without Permission?', href: '/question-newheart', desc: 'Ezekiel 36:26-27 — God promises a new heart and a new spirit. He does not ask permission. He removes the heart of stone ' },
                        { name: 'Does God Choose Who Goes to Heaven? What the Bible Actually Says', href: '/question-does-god-choose-who-goes-to-heaven', desc: 'Does God choose who goes to heaven? Yes. The Bible is clear: God chose His people before the foundation of the world. He' },
                        { name: 'Does God Harden Hearts? Yes — And Here\'s What That Means', href: '/question-hardening', desc: 'God hardened Pharaoh' },
                        { name: 'Does God Love Everyone Equally? What Scripture Actually Teaches', href: '/question-does-god-love-everyone-equally', desc: 'Does God love everyone the same? Scripture' },
                        { name: 'Does God Predestine People to Hell? The Honest Answer', href: '/question-predestined-to-hell', desc: 'If God chooses some for salvation, does He choose others for damnation? Scripture draws a devastating asymmetry: salvati' },
                        { name: 'Does the Bible Say We\'re Sick, Not Dead?', href: '/question-bible-says-sick', desc: 'Every' },
                        { name: 'Doesn\'t Election Make Evangelism Pointless?', href: '/apologetic-evangelism', desc: 'Does election make evangelism pointless? No—it' },
                        { name: 'Doesn\'t God Want Everyone Saved? — The Two Wills of God', href: '/question-godwants', desc: '1 Timothy 2:4 says God desires all people to be saved. But if God' },
                        { name: 'Drawn, Not Dragged — The Unstoppable Grace of Effectual Calling', href: '/question-irresistible', desc: 'Irresistible grace is liberation, not coercion. God transforms wills; He doesn' },
                        { name: 'Elect According to Foreknowledge — But What Does "Foreknowledge" Mean?', href: '/question-1peter1', desc: '1 Peter 1:1-2 is the Arminian trump card —' },
                        { name: 'Eternal Security: Can a Believer Lose Salvation?', href: '/question-secure', desc: 'Eternal Security: Can a Believer Lose Salvation? Scripture teaches that those whom God saves are kept safe by His power.' },
                        { name: 'Every Conversion in Acts — God Did It Every Single Time', href: '/question-every-conversion-acts', desc: 'Walk through every conversion in Acts and see the pattern: God initiates every time. The Spirit falls, hearts are opened' },
                        { name: 'Every Verse Where the Bible Says You CANNOT — The Inability Page', href: '/question-cannot', desc: 'Scripture' },
                        { name: 'Everyone Is a Calvinist on Their Knees', href: '/question-calvinist-on-knees', desc: 'Your prayers, worship songs, funerals, and gratitude all confess sovereign grace — even if your theology denies it. Your' },
                        { name: 'Free Will Bible Verses — Do They Actually Teach What You Think?', href: '/question-free-will-bible-verses', desc: 'Every verse used to defend free will in salvation, examined honestly. What Joshua 24:15, Revelation 3:20, John 3:16, and' },
                        { name: 'How Do I Know If I’m One of the Elect? — The Only Answer That Brings Peace', href: '/question-am-i-chosen', desc: 'If God chose His people before the foundation of the world, how can I know I’m one of them? The Bible’s answer isn’t wha' },
                        { name: 'If Grace Is Irresistible, Why Does It Feel Like Choice?', href: '/question-how-grace-feels', desc: 'If God' },
                        { name: 'Is Faith a Gift from God? What the Bible Actually Says', href: '/question-faithgift', desc: 'Philippians 1:29 says faith has been' },
                        { name: 'Is Free Will Real? What the Bible Actually Teaches About Human Choice', href: '/question-freewill', desc: 'Scripture never teaches libertarian free will. It teaches death — and dead people do not choose their own resurrection. ' },
                        { name: 'Is God Unfair? Paul\'s Answer Will Silence You — Romans 9:19-23', href: '/question-unfair', desc: 'You want to accuse God of injustice. Paul anticipated your objection 2,000 years ago — and his answer isn' },
                        { name: 'Is Predestination in the Bible? — Yes. It Saturates Scripture.', href: '/question-is-predestination-in-the-bible', desc: 'Predestination appears by name in Romans 8 and Ephesians 1. But the concept saturates all of Scripture — from Genesis to' },
                        { name: 'Is Salvation Your Choice or God\'s? There Are Only Two Options.', href: '/question-is-salvation-my-choice-or-gods', desc: 'If salvation is your choice, you' },
                        { name: 'Isaiah 53: The Servant Who Bore the Sins of Many', href: '/question-isaiah53', desc: 'Isaiah 53 doesn' },
                        { name: 'Known Before You Were Known — Psalm 139 and the God Who Wrote Your Story Before It Began', href: '/question-psalm139', desc: 'Psalm 139 reveals that God knew you, formed you, and wrote every day of your life before you existed. Your story was aut' },
                        { name: 'Names Written Before Creation — Revelation 13:8 & 17:8', href: '/question-revelation13', desc: 'Revelation 13:8 and 17:8 prove names were written in the Book of Life before creation — not in response to foreseen fait' },
                        { name: 'No Dice, No Chance — God\'s Sovereignty over Lots and Kings', href: '/question-proverbs-sovereignty', desc: 'Proverbs 16:33 and 21:1 prove God controls every roll of the dice and every ruler' },
                        { name: 'No One Can Come to Me Unless the Father Draws Him – John 6:37-44,65', href: '/question-john6', desc: 'Jesus said' },
                        { name: 'Not Because of Righteous Things We Had Done — Titus 3:3-7', href: '/question-titus3', desc: 'Titus 3:3-7 contains the entire order of salvation in five verses — and at no point does a human being contribute anythi' },
                        { name: 'Once Saved, Always Saved? What Scripture Actually Promises', href: '/question-perseverance', desc: 'Perseverance of the saints is not about your grip on God — it' },
                        { name: 'One Question That Changes Everything — Where Did Your Faith Come From?', href: '/question-one-question', desc: 'There is one question that, honestly answered, will change everything you believe about salvation. Not where the gospel ' },
                        { name: 'Regeneration Precedes Faith — The Skeleton Key That Unlocks Everything', href: '/question-regeneration-precedes-faith', desc: 'Proves that spiritual rebirth comes BEFORE faith, not after. The order matters. This single truth demolishes the Arminia' },
                        { name: 'Thank You, Father, for Hiding This — Matthew 11:25-27', href: '/question-matt11', desc: 'Jesus thanks the Father for hiding truth from the wise and revealing it to infants. Not lamenting. Not apologizing. Than' },
                        { name: 'The Boasting Problem That Destroys Free Will', href: '/question-boasting', desc: '1 Corinthians 1:26-31 — God chose the foolish to shame the wise. His election strategy is designed to eliminate all huma' },
                        { name: 'The Call You Can Ignore vs. The Call That Creates Life', href: '/question-external-internal-call', desc: 'Scripture teaches two kinds of calling: the external call that goes to all and can be refused, and the internal call tha' },
                        { name: 'The Cross Was Predestined — Acts 4:27-28 and the Sovereignty Behind Calvary', href: '/question-acts4', desc: 'The most evil act in history — the murder of God' },
                        { name: 'The Greek Tense That Settles the Debate — 1 John 5:1', href: '/question-1john5-1', desc: 'One Greek verb tense in 1 John 5:1 proves regeneration precedes faith. The perfect tense' },
                        { name: 'The Logic You Can See: Visual Theology of Sovereign Grace', href: '/question-visual-theology', desc: 'The Reformed soteriological argument presented visually through logical flowcharts, diagrams, and devastating comparison' },
                        { name: 'The Prayer That Proves Election — John 17', href: '/question-john17', desc: 'Jesus' },
                        { name: 'The Verse in Acts That Nobody Preaches – Acts 13:48', href: '/question-acts', desc: 'Acts 13:48:' },
                        { name: 'Was Christ a Robot? If Predestination Didn\'t Rob Him, It Won\'t Rob You', href: '/question-was-christ-a-robot', desc: 'The crucifixion was the most predestined event in history. Was Christ a puppet? If predestination didn' },
                        { name: 'What About "Whosoever Will"?', href: '/question-whosoever', desc: 'John 3:16 tells you what happens to believers. It does not tell you who will believe. The Greek participle, the meaning ' },
                        { name: 'What About Babies Who Die?', href: '/apologetic-babies', desc: 'What happens to babies who die? Scripture gives grieving parents a sovereign, rock-solid hope that no free-will theology' },
                        { name: 'What About Those Who Never Heard the Gospel?', href: '/apologetic-unreached', desc: 'What about the billions who never heard the gospel? Scripture reveals God' },
                        { name: 'What Are the Doctrines of Grace? — A Simple Explanation', href: '/question-what-is-sovereign-grace', desc: 'The doctrines of grace teach that salvation is entirely God' },
                        { name: 'What Did Jesus Mean by "Let the Dead Bury the Dead"?', href: '/question-dead-bury-dead', desc: 'In a single sentence, Jesus split the human race into the living and the dead — and the dead don' },
                        { name: 'What Does "Born Again" Actually Mean? — John 3:3-8 Explained', href: '/question-born-again-meaning', desc: 'Jesus said you must be born again. But what does that mean — and who does the birthing? A closer look at John 3 reveals ' },
                        { name: 'What Does "Chosen" Actually Mean in the Bible? — Ephesians 1:4 Explained', href: '/question-what-does-chosen-mean', desc: 'When Scripture says God' },
                        { name: 'What Does "Dead in Sin" Actually Mean? — Ephesians 2:1-5 Explained', href: '/question-dead-in-sin-meaning', desc: 'If we are' },
                        { name: 'What Does Romans 9 Really Mean?', href: '/question-romans9', desc: 'Romans 9 is the Bible' },
                        { name: 'Where Did Your Faith Come From? The Most Important Question You\'ve Never Asked', href: '/question-where-did-your-faith-come-from', desc: 'Not where the gospel came from. Not where the Bible came from. Where did your FAITH come from? Trace it back far enough ' },
                        { name: 'Where Does Your "No" Come From? — The Self-Referential Trap', href: '/question-where-does-your-no-come-from', desc: 'If you reject sovereign grace, where does that rejection originate? From your free will? The very will Scripture says is' },
                        { name: 'Whose Side Are You On? Man-Centered vs God-Centered Theology', href: '/question-whose-side-are-you-on', desc: 'Strip away the jargon: one theology makes man the hero, the other makes God the hero. Which side are you really on?' },
                        { name: 'Why Did God Harden Pharaoh’s Heart? — Exodus 9:12 Explained', href: '/question-pharaoh-hardened', desc: 'Did Pharaoh harden his own heart, or did God do it? Scripture says both — and the order matters more than you think. Wha' },
                        { name: 'Why Does God Choose Some and Not Others? Scripture\'s Answer', href: '/question-why-does-god-choose-some-not-others', desc: 'The hardest question in theology: why some and not others? Scripture' },
                        { name: 'Why Jesus Spoke in Parables — Matthew 13:10-17', href: '/question-parables', desc: 'Why did Jesus speak in parables? Not to make truth clearer — but to conceal it from some while revealing it to others. M' },
                        { name: 'Why Pray If God Is Sovereign? Because Prayer Changes You, Not God', href: '/question-why-pray-if-god-is-sovereign', desc: 'If God has already decided everything, why pray? Because prayer is not about changing God' },
                        { name: 'Why Some People Hear the Gospel and Walk Away — The Two Calls of God', href: '/question-external-call', desc: 'Everyone in church hears the same sermon. But only some are changed forever. Scripture teaches there are two calls — one' },
                        { name: 'You Did Not Choose Me, But I Chose You — John 15:16', href: '/question-john15', desc: 'You Did Not Choose Me, But I Chose You — John 15:16' },
                        { name: 'You Do Not Believe Because You Are Not My Sheep — John 10:26-29', href: '/question-john10', desc: 'Jesus inverts the logic of faith: sheep-status determines belief, not the reverse. John 10:26-29 is election from the mo' }
                    ]
                },
                {
                    name: 'Hard Objections',
                    icon: '🛡',
                    href: '/questions',
                    count: 18,
                    pages: [
                        { name: 'Does Election Contradict God\'s Love? What Scripture Teaches', href: '/objection-love', desc: 'Does election contradict God' },
                        { name: 'Does God Manipulate Us? Why Sovereignty Is the Opposite of Control', href: '/objection-manipulation', desc: 'Manipulation requires deception, self-interest, and diminishment. God' },
                        { name: 'Does Predestination Make Us Robots?', href: '/objection-robots', desc: 'The most common objection to sovereignty answered. Predestination does not make you a robot. It makes you free for the f' },
                        { name: 'Doesn\'t God Want All People Saved? What 1 Timothy 2:4 and 2 Peter 3:9 Actually Mean', href: '/objection-desire', desc: '1 Timothy 2:4 and 2 Peter 3:9 are cited as proof against election. But read in context, they actually support God' },
                        { name: 'If Everything Is Predetermined, Why Even Try?', href: '/objection-effort', desc: 'If God already predetermined everything, why bother trying? Because your effort isn' },
                        { name: 'If God Already Chose Us, Why Do We Have to Believe?', href: '/objection-why-believe', desc: 'A letter to the sincere Christian who just discovered election and wonders if faith is meaningless. Exploring how God' },
                        { name: 'If God Already Chose Who\'s Saved, Why Evangelize?', href: '/objection-why-evangelize', desc: 'If God already chose who' },
                        { name: 'If God Already Chose, Why Evangelize?', href: '/objection-evangelism-pointless', desc: 'If God already chose who will be saved, why evangelize? Because God ordains the means as well as the ends. Election does' },
                        { name: 'If God Already Decided Everything, Why Pray?', href: '/objection-why-pray', desc: 'If God has predetermined everything, why pray? Isn' },
                        { name: 'If God Can Save Everyone, Why Doesn\'t He?', href: '/objection-why-not-save-everyone', desc: 'If God is all-powerful and all-loving, why doesn' },
                        { name: 'If God Controls Everything, How Can He Blame Us?', href: '/objection-responsibility', desc: 'If God predetermines everything, how can He hold us responsible? Paul anticipated this exact objection in Romans 9:19 — ' },
                        { name: 'If God Could Save Everyone, Why Doesn\'t He?', href: '/objection-god-could-save-all', desc: 'The hardest question in Reformed theology. If God can irresistibly save, why doesn' },
                        { name: 'If God Only Chose Some, Isn\'t That Unfair?', href: '/objection-unfair-to-choose-some', desc: 'If God only chose some for salvation, isn' },
                        { name: 'If God Predestined Everything, Why Does He Command?', href: '/objection-why-command', desc: 'If God predestined everything, why does He command? Because God' },
                        { name: 'Is Election Fair? Why Grace Is Unfair', href: '/objection-fairness', desc: 'If God chooses some and passes over others, isn' },
                        { name: 'Is God the Author of Sin? What Scripture and Logic Reveal', href: '/objection-author-of-sin', desc: 'Does God cause sin if He predestines everything? Scripture teaches a clear distinction between ordaining and authoring. ' },
                        { name: 'Isn\'t Faith a Choice? The Question That Changes Everything', href: '/objection-faith-choice', desc: 'You remember choosing to believe. But where did the ability to make that choice come from? What Scripture says about the' },
                        { name: 'What About Babies Who Die? Election, Infant Salvation, and the God Who Saves Without Permission', href: '/objection-babies', desc: 'If salvation requires faith, what happens to babies who die? This objection to election actually proves it — because inf' }
                    ]
                },
                {
                    name: 'Side by Side',
                    icon: '⚖',
                    href: '/compare-calvinism-arminianism',
                    count: 8,
                    pages: [
                        { name: 'At Every Decision Point, Scripture Sides with God — Not You', href: '/compare-every-decision-point', desc: 'Ten crucial doctrinal decision points. At each one, man-centered theology sides with man. God-centered theology sides wi' },
                        { name: 'Calvinism vs Arminianism — What Does the Bible Actually Teach?', href: '/compare-calvinism-arminianism', desc: 'Point by point, verse by verse — what Scripture actually teaches about salvation, and why the Arminian reading collapses' },
                        { name: 'Calvinism vs Molinism — Does God Use "Middle Knowledge" to Sovereignly Choose?', href: '/compare-calvinism-molinism', desc: 'Molinism says God uses middle knowledge to select the best possible world. But does this actually preserve sovereignty, ' },
                        { name: 'Calvinism vs Open Theism — Does God Actually Know the Future?', href: '/compare-calvinism-open-theism', desc: 'Open Theism says God learns alongside us, that the future is genuinely open. But if God doesn' },
                        { name: 'Does God Save Alone, or Do You Help? Monergism vs Synergism', href: '/compare-monergism-synergism', desc: 'The most fundamental divide in all of Christianity: Does God save alone, or does He need your cooperation? Scripture ans' },
                        { name: 'Predestination vs Foreknowledge — Which Comes First?', href: '/compare-predestination-foreknowledge', desc: 'Predestination vs Foreknowledge — Which Comes First?' },
                        { name: 'Reformed vs Catholic — How Are We Actually Justified Before God?', href: '/compare-calvinism-catholic-soteriology', desc: 'Imputed or infused? Faith alone or faith plus works? A biblical examination of the Reformation' },
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
                        { name: 'Adoption — Why God Calls You Son and Daughter, Not Just Forgiven', href: '/systematic-adoption', desc: 'Justification declares you not guilty. Adoption declares you beloved. Scripture' },
                        { name: 'Before the Foundation of the World — God\'s Eternal Decrees', href: '/systematic-divine-decrees', desc: 'Nothing has ever surprised God. Before a single atom existed, He decreed everything that would come to pass — including ' },
                        { name: 'Born Again — What It Really Means and Why You Didn\'t Do It to Yourself', href: '/systematic-regeneration', desc: 'You didn' },
                        { name: 'Chosen Before the Foundation of the World — What Scripture Teaches About Election', href: '/systematic-election', desc: 'God chose His people before creation — not based on anything they would do, but according to His sovereign will and grac' },
                        { name: 'Common Grace — Why God Is Kind to People Who Hate Him', href: '/systematic-common-grace', desc: 'Every sunrise on a murderer. Every laugh in an atheist' },
                        { name: 'Effectual Calling — The Voice the Dead Cannot Refuse', href: '/systematic-effectual-calling', desc: 'There is a general call that goes out to all, and an inner call that the dead actually hear. Scripture' },
                        { name: 'Federal Headship: Two Men, Two Races, Two Destinies', href: '/systematic-federal-headship', desc: 'Every human being stands under one of two representatives: Adam or Christ. Federal headship is the architecture of salva' },
                        { name: 'Glorification: The Last Link in the Golden Chain', href: '/systematic-glorification', desc: 'Glorification is the final act of salvation — when sin ends forever and we are made fully like Christ. The certainty Pau' },
                        { name: 'How Can God Be Sovereign AND Humans Be Responsible? Both Are True.', href: '/systematic-compatibilism', desc: 'The biggest objection to sovereignty:' },
                        { name: 'How God Saves — Every Step of Salvation, Every Step His', href: '/systematic-soteriology', desc: 'From election to glorification, not a single link in the chain can break. Romans 8:29-30 mapped out — every step of salv' },
                        { name: 'Imputation — The Great Exchange That Rewrites Your Ledger', href: '/systematic-imputation', desc: 'Scripture' },
                        { name: 'Justified — How God Declares Guilty Sinners Righteous', href: '/systematic-justification', desc: 'Justification is God' },
                        { name: 'One God, Three Persons — The Trinity in Scripture and Salvation', href: '/systematic-trinity', desc: 'The Trinity: one God in three persons. Scripture teaches the Father elects, the Son redeems, the Spirit applies. The fou' },
                        { name: 'One Plan, One People, One Mediator — Covenant Theology', href: '/systematic-covenant-theology', desc: 'God has never had two plans of salvation. One covenant of grace runs from Eden to Calvary, sealed in Christ' },
                        { name: 'Providence: God\'s Sovereign Rule Over All Things', href: '/systematic-providence', desc: 'Not a sparrow falls apart from the Father. Not a hair leaves your head without His consent. Providence is God' },
                        { name: 'Sanctification: The Work God Began and Will Finish', href: '/systematic-sanctification', desc: 'Sanctification is not your project — it is God' },
                        { name: 'The Atonement: What Christ\'s Death Accomplished', href: '/systematic-atonement', desc: 'Did the cross save you, or merely make your salvation possible? Scripture teaches Christ died to actually secure redempt' },
                        { name: 'The Church — Why God\'s People Are Called Out, Not Volunteered', href: '/systematic-ecclesiology', desc: 'The church isn' },
                        { name: 'The Covenant of Redemption — Salvation Decided Before Time Began', href: '/systematic-covenant-redemption', desc: 'Before the world existed, the Father, Son, and Spirit made a covenant about you. This is the bedrock beneath election, a' },
                        { name: 'The Covenant of Works — Why Your Best Effort Was Always Going to Fail', href: '/systematic-covenant-works', desc: 'God made a covenant with Adam: perfect obedience for life, one breach for death. Adam broke it, you inherited the breach' },
                        { name: 'The Doctrine of Reprobation — The Half the Reformed World Won\'t Speak', href: '/systematic-reprobation', desc: 'The doctrine of reprobation owned, not ducked. Why double predestination is the necessary shadow of unconditional electi' },
                        { name: 'The Five Points of Grace (TULIP) — What Scripture Actually Teaches', href: '/systematic-tulip', desc: 'The five points of grace explained from Scripture alone. Total Depravity, Unconditional Election, Definite Atonement, Ir' },
                        { name: 'The Glory of Christ — Who Jesus Is and Why It Matters for Your Salvation', href: '/systematic-christology', desc: 'Jesus is not a good teacher who offers advice. He is God in flesh who accomplishes salvation. His deity, humanity, and a' },
                        { name: 'The Holy Spirit — Who He Is and Why He Changes Everything', href: '/systematic-pneumatology', desc: 'The Spirit doesn' },
                        { name: 'The Order of Salvation — Every Step Is God\'s, Not Yours', href: '/systematic-ordo-salutis', desc: 'From election to glorification, every link in the chain of salvation is forged by sovereign grace. Not one step depends ' },
                        { name: 'The Resurrection — The Foundation of All Hope', href: '/systematic-resurrection', desc: 'The Resurrection: Christ' },
                        { name: 'The Truth About Salvation — Where Everything Begins', href: '/systematic-salvation', desc: 'Election. Regeneration. Atonement. Justification. Perseverance. The full architecture of how God saves — and why underst' },
                        { name: 'The Truth of Scripture — God\'s Authoritative Word', href: '/systematic-bibliology', desc: 'The Truth of Scripture: Inerrancy, sufficiency, authority. 2 Timothy 3:16-17, 2 Peter 1:20-21. Why Sola Scriptura matter' },
                        { name: 'Union with Christ — The Center of Every Blessing You Have Ever Been Given', href: '/systematic-union-with-christ', desc: 'Every spiritual blessing Scripture promises is given' },
                        { name: 'What Are You? Created in Glory, Ruined by Sin, Rescued by Grace', href: '/systematic-anthropology', desc: 'You were made to reflect God. Then sin shattered the mirror. Now grace is putting the pieces back — but not the way you' },
                        { name: 'Who Is God? The Foundation Everything Else Stands On', href: '/systematic-theology-proper', desc: 'Before you can understand salvation, you must understand the God who saves. His attributes aren' },
                        { name: 'Why Scripture Is the Final Word — And Why That Matters for Grace', href: '/systematic-prolegomena', desc: 'Before you can answer any question about God, you must answer this one: Where does truth come from? Scripture' },
                        { name: 'You\'re Not Sick in Sin — You\'re Dead. Here\'s What That Means.', href: '/systematic-hamartiology', desc: 'Sin didn' }
                    ]
                },
                {
                    name: 'Old Testament',
                    icon: '📚',
                    href: '/ot-hub',
                    count: 14,
                    pages: [
                        { name: '"Not Because You Were More" — Why God Chose Israel', href: '/ot-israel-chosen', desc: 'Deuteronomy 7:6-8 destroys the merit argument in four words:' },
                        { name: '"You Meant It for Evil, but God Meant It for Good" — Joseph and Sovereignty', href: '/ot-joseph', desc: 'Genesis 50:20 is the clearest statement of God' },
                        { name: 'Abel and Cain: The Bible\'s First Election', href: '/ot-abel-cain', desc: 'Genesis 4 is the first election narrative in Scripture. Two brothers, identical circumstances, one God who chose. Where ' },
                        { name: 'Abraham & Election: The Call That Creates Faith', href: '/ot-abraham', desc: 'Abraham didn' },
                        { name: 'David: God\'s Sovereign Election for Kingship', href: '/ot-david', desc: 'God chose the youngest, most overlooked son to be Israel' },
                        { name: 'Election Didn\'t Start in the New Testament — The Old Testament Proves It', href: '/ot-election', desc: 'Before Paul ever wrote Romans 9, the Old Testament was already saturated with sovereign election. From Abraham to David ' },
                        { name: 'Isaiah: The Servant & God\'s Immutable Counsel', href: '/ot-isaiah-servant', desc: 'Isaiah reveals God' },
                        { name: 'Jacob Over Esau: God Chose Before They Were Born', href: '/ot-jacob-esau', desc: 'Before Jacob or Esau had done anything good or bad, God chose. Romans 9 uses this moment to prove that election has noth' },
                        { name: 'Jeremiah: Called Before Formation', href: '/ot-jeremiah', desc: 'Jeremiah 1:5 — God knew, consecrated, and appointed Jeremiah before he was formed. Three divine actions before birth. Ze' },
                        { name: 'Jonah: The Prophet Who Tried to Outrun God', href: '/ot-jonah', desc: 'Jonah ran from God and discovered what everyone discovers: you cannot outrun divine sovereignty. The worst sermon in his' },
                        { name: 'Moses, Pharaoh, and the God Who Hardened a King\'s Heart', href: '/ot-moses-pharaoh', desc: 'Two men, two destinies, one sovereign God. Moses receives mercy; Pharaoh receives hardening. Both were decreed before ei' },
                        { name: 'Noah: Chosen for Preservation', href: '/ot-noah', desc: 'Noah: Chosen for Preservation — God' },
                        { name: 'The Remnant — How God Has Always Preserved His Chosen Few', href: '/ot-prophets-remnant', desc: 'Every prophet confirms it: God preserves a chosen remnant through judgment. From Jeremiah' },
                        { name: 'When God Answered Suffering with Sovereignty — Not Explanation', href: '/ot-job', desc: 'Job lost everything and demanded an answer. God gave him one — but not the one he wanted. God' }
                    ]
                },
                {
                    name: 'Scripture Deep Dives',
                    icon: '🔎',
                    href: '/verse-explorer',
                    count: 6,
                    pages: [
                        { name: 'Every Bible Verse That Teaches Faith Is a Gift from God — Scripture Tsunami', href: '/scripture-tsunami-faith-as-gift', desc: '40+ Bible verses proving faith is a gift of God, not a human achievement. From Genesis to Revelation, Scripture is unani' },
                        { name: 'Every Verse Teaching God\'s Sovereignty Over Salvation — Scripture Tsunami', href: '/scripture-tsunami-sovereignty', desc: '60+ verses from Genesis to Revelation proving that salvation is entirely God' },
                        { name: 'Romans 3:10-18 — The Indictment Nobody Escapes', href: '/romans-3-10-18', desc: 'Romans 3:10-18 is the Bible' },
                        { name: 'Romans 8:28-39: The Chain No One Can Break', href: '/romans-8-28-39', desc: 'Five links. One chain. Every link forged by God alone. The Golden Chain of Romans 8 — foreknowledge, predestination, cal' },
                        { name: 'Romans 9 Deep Dive — The Chapter That Settles It', href: '/romans-9-deep-dive', desc: 'Verse-by-verse through the load-bearing chapter of the doctrines of grace. Paul anticipates every Arminian objection in ' },
                        { name: 'Romans 9:1-24: The Potter and the Clay — God\'s Sovereign Right to Choose', href: '/romans-9-1-24', desc: 'Verse-by-verse walkthrough of Romans 9:1-24. Paul' }
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
                        { name: 'Essays — The Case for Sovereign Grace, Argued in Full', href: '/essays', desc: 'Long-form arguments that leave no escape. Six essays making the full case for sovereign grace — from Scripture, logic, a' }
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
                    count: 48,
                    pages: [
                        { name: '"Choose This Day Whom You Will Serve" — Does Joshua 24:15 Prove Free Will?', href: '/demolition-joshua24-15', desc: 'Joshua 24:15 is the most quoted Arminian proof text. But three verses later, Joshua says' },
                        { name: '"Christ Died for All" — Why 2 Corinthians 5:14 Proves the Opposite', href: '/demolition-2cor5-14-15', desc: '"Christ Died for All" — Why 2 Corinthians 5:14 Proves the Opposite' },
                        { name: '"Faith Is Not a Gift" — Why the Most Popular Objection to Grace Collapses', href: '/demolition-faith-is-not-a-gift', desc: 'The most popular objection to faith as a gift collapses under its own weight. Philippians 1:29 is unambiguous. And rejec' },
                        { name: '"God Commands All to Repent" — Does Acts 17:30 Disprove Election?', href: '/demolition-acts17-30', desc: 'God commands all people to repent. But does a command prove ability? A king commands his prisoners to be free — that doe' },
                        { name: '"Grace Has Appeared to All" — What Titus 2:11 Really Means', href: '/demolition-titus2-11', desc: 'They cite Titus 2:11 as proof that grace is universal. But Paul' },
                        { name: '"He Tasted Death for Everyone" — What Hebrews 2:9 Actually Means', href: '/demolition-hebrews2-9', desc: '"He Tasted Death for Everyone" — What Hebrews 2:9 Actually Means' },
                        { name: '"If You Confess, You Will Be Saved" — Does Romans 10:9 Prove Human Decision?', href: '/demolition-romans10-9', desc: 'Romans 10:9 describes the means of salvation, not its source. The faith and confession required are themselves gifts fro' },
                        { name: '"In Christ All Shall Be Made Alive" — But Who Are the "All"?', href: '/demolition-1cor15-22', desc: 'They quote 1 Corinthians 15:22 to prove universal atonement. But the' },
                        { name: '"Savior of All People" — Does 1 Timothy 4:10 Prove Universal Atonement?', href: '/demolition-1tim4-10', desc: '"Savior of All People" — Does 1 Timothy 4:10 Prove Universal Atonement?' },
                        { name: '"The Master Who Bought Them" — Does 2 Peter 2:1 Prove Universal Atonement?', href: '/demolition-2peter2-1', desc: 'False teachers were' },
                        { name: '"Work Out Your Salvation" — They Quote Verse 12 and Forget Verse 13', href: '/demolition-philippians2-12-13', desc: 'Philippians 2:12 says' },
                        { name: '"You Always Resist the Holy Spirit" — Does Acts 7:51 Disprove Irresistible Grace?', href: '/demolition-acts7-51', desc: 'Acts 7:51 is the Arminian trump card against irresistible grace. But Stephen is describing resistance to the external ca' },
                        { name: '1 Corinthians 10:13 — "A Way Out" Is Not Libertarian Free Will', href: '/demolition-1cor10-13', desc: 'The' },
                        { name: '1 Peter 1:5 — "Shielded Through Faith" Demolished', href: '/demolition-1peter1-5', desc: 'Arminians claim' },
                        { name: '2 Corinthians 6:1-2 — "Not in Vain" Demolished', href: '/demolition-2cor6-1', desc: 'Arminians cite' },
                        { name: '2 Peter 1:10 — Does "Make Your Calling Sure" Prove You Can Lose It?', href: '/demolition-2peter1-10', desc: 'Peter' },
                        { name: 'Acts 2:21 / Romans 10:13 — "Everyone Who Calls" Demolished', href: '/demolition-acts2-21', desc: 'The Arminian reads' },
                        { name: 'Arianism — The Ancient Heresy That Tried to Kill Christ\'s Deity', href: '/demolition-arianism', desc: 'Arius said Jesus was created. The church said no — and staked everything on it. Why Christ' },
                        { name: 'Can You Lose Your Salvation? What Hebrews 6:4-6 Actually Teaches', href: '/demolition-hebrews6-4-6', desc: 'The most feared passage in the Bible:' },
                        { name: 'Children of Satan — What Scripture Actually Calls the Unregenerate', href: '/demolition-children-of-satan', desc: 'Jesus didn' },
                        { name: 'Cut Off from the Root — Why Sin Doesn\'t Wound. It Kills.', href: '/demolition-cut-off-from-root', desc: 'When a creature is severed from the source of its life, corruption is not a punishment imposed from outside. It is what ' },
                        { name: 'Demolition: 2 Peter 3:9 — Does God\'s Patience Prove Universal Salvation?', href: '/demolition-2peter3-9', desc: '2 Peter 3:9 examined:' },
                        { name: 'Demolition: James 4:7-8 — "Come Near to God and He Will Come Near to You"', href: '/demolition-james4-7-8', desc: 'The favorite synergism proof-text — and the verses immediately before and after that prove it cannot mean what Arminians' },
                        { name: 'Demolition: John 12:32 — "I Will Draw ALL People"', href: '/demolition-john12-32', desc: 'Exegetical demolition of the Arminian proof text John 12:32. The Greek text, context, and cross-references reveal' },
                        { name: 'Demolition: Matthew 23:37 — Jesus\'s Lament Over Jerusalem', href: '/demolition-matt23-37', desc: 'Matthew 23:37 demolition: Jesus' },
                        { name: 'Demolition: Matthew 7:7 — "Ask, Seek, Knock"', href: '/demolition-matt7-7', desc: 'The favorite seeker-friendly verse, taken out of its own sermon. The context, the Greek, and the Father-to-children fram' },
                        { name: 'Deuteronomy 30:19 — "Choose Life" and the Free Will Myth', href: '/demolition-deut30-19', desc: 'The verse most often used as a free-will proof-text is addressed to an already-elect covenant nation, not to unregenerat' },
                        { name: 'Did C.S. Lewis Refute Calvinism? — What They Won\'t Tell You', href: '/counter-cs-lewis-free-will', desc: 'Anti-Reformed writers love quoting Lewis against sovereignty. But Lewis' },
                        { name: 'Does "The Whole World" in 1 John 2:2 Prove Universal Atonement?', href: '/demolition-1john2-2', desc: '1 John 2:2 says Christ is the propitiation' },
                        { name: 'Does God Take Pleasure in Death? What Ezekiel 18:23 Actually Means', href: '/demolition-ezekiel18-23', desc: 'Ezekiel 18:23 reveals God' },
                        { name: 'Does God Want Everyone Saved? What 1 Timothy 2:4 Actually Says', href: '/demolition-1tim2-4', desc: 'They say God wants every individual saved. But Paul wrote this to Timothy about praying for kings — not about God' },
                        { name: 'Ezekiel 33:11 — "I Take No Pleasure in the Death of the Wicked"', href: '/demolition-ezekiel33-11', desc: 'The verse Arminians use to prove God wants to save everyone equally is, in context, a covenant call to Israel — and teac' },
                        { name: 'FACTS Check — The Arminian Framework Dismantled Point by Point', href: '/demolition-arminian-facts', desc: 'The Society of Evangelical Arminians built a framework called FACTS. We examine each point with seminary-level exegesis ' },
                        { name: 'Galatians 5:4 — Can a Christian Really "Fall from Grace"?', href: '/demolition-galatians5-4', desc: 'The verse Arminians use to prove a Christian can lose salvation says the opposite of what they think. Read it in context' },
                        { name: 'Hebrews 10:26-29 — Can Deliberate Sin Damn a Christian?', href: '/demolition-hebrews10-26', desc: 'The verse Arminians cite more than any other to prove you can lose your salvation. Read past verse 29 and you will find ' },
                        { name: 'Hebrews 3:12-14 — The Warning That Proves Perseverance', href: '/demolition-hebrews3-12', desc: 'The warning against hard hearts and falling away is cited as a death blow to eternal security. Read the verse that comes' },
                        { name: 'Hosea 11:7-8 — "How Can I Give You Up?" Demolished', href: '/demolition-hosea11-7-8', desc: 'Arminians use God' },
                        { name: 'Isaiah 5:1-7 — The Vineyard Song Demolished', href: '/demolition-isaiah5-1-7', desc: 'Arminians use' },
                        { name: 'Jeremiah 18:1-12 — The Potter Demolished', href: '/demolition-jer18', desc: 'Arminians cite' },
                        { name: 'John 3:16 — Does "The World" Mean Every Individual?', href: '/demolition-john3-16', desc: 'John 3:16 is the most quoted verse against sovereign grace. But its own context — the verses everyone skips — proves the' },
                        { name: 'Jude 21 — "Keep Yourselves in God\'s Love": Is Your Salvation Up to You?', href: '/demolition-jude21', desc: 'Jude 21' },
                        { name: 'Matthew 23:37 — The Verse They Think Disproves Sovereignty', href: '/demolition-matthew-23-37', desc: 'Jesus wept over Jerusalem — proof He wanted to save them but couldn' },
                        { name: 'Prevenient Grace — The Doctrine Scripture Never Teaches', href: '/demolition-prevenient-grace', desc: 'Arminianism' },
                        { name: 'Revelation 22:17 — "Whoever Is Thirsty" Is Not a Universal Offer', href: '/demolition-rev22-17', desc: 'The closing verse of the Bible is cited as the ultimate proof of free-will salvation. Read the whole sentence and it tur' },
                        { name: 'Revelation 3:20 — "I Stand at the Door and Knock" Is Not an Altar Call', href: '/demolition-rev3-20', desc: 'Revelation 3:20 is the most misused evangelistic text in history. It' },
                        { name: 'Romans 2:4 — Does "Kindness Leads to Repentance" Prove Prevenient Grace?', href: '/demolition-romans2-4', desc: 'The verse Arminians cite for prevenient grace is Paul' },
                        { name: 'The Orthodox Case Against Predestination — And Why It Collapses', href: '/demolition-orthodox-predestination', desc: 'The Eastern Orthodox argument against predestination cites one verse partially, quotes six philosophers, quotes zero Eas' },
                        { name: 'The Strongest Case for Free Will — And Why It Still Breaks', href: '/demolition-steel-man-arminianism', desc: 'We built the strongest possible case for Arminian free will — fairer than most Arminians build it themselves. Then we as' }
                    ]
                },
                {
                    name: 'Logic & Philosophy',
                    icon: '🔭',
                    href: '/philosophy-problem-of-merit',
                    count: 22,
                    pages: [
                        { name: 'If You Chose God, What Makes You Better Than Those Who Didn\'t?', href: '/philosophy-problem-of-merit', desc: 'The Problem of Merit: if your choice was the deciding factor, then something in you — intelligence, humility, openness —' },
                        { name: 'The Gödelian Prison: Why No Soul Can Save Itself', href: '/philosophy-godel-incompleteness', desc: 'In 1931, Kurt Gödel proved that no system can validate itself from within. Your soul is a system. It cannot prove its ow' },
                        { name: 'The Gravity of Grace: Why You Never Chose to Be Held', href: '/philosophy-gravity-of-grace', desc: 'Gravity doesn' },
                        { name: 'The Immune System You Never Asked For', href: '/philosophy-immune-system-grace', desc: 'Your body fights battles you never knew about, using weapons you didn' },
                        { name: 'The Mirror You Refuse to Look In: Why Grace Reveals What We Really Are', href: '/philosophy-mirror-you-refuse', desc: 'We reject God' },
                        { name: 'The Münchhausen Trilemma of Self-Salvation', href: '/philosophy-munchhausen-trilemma', desc: 'Every justification leads to infinite regress, circular reasoning, or an uncaused cause. Apply this to faith and you hit' },
                        { name: 'The Observer Effect of Sin', href: '/philosophy-observer-effect-sin', desc: 'You cannot assess your own freedom using the faculty whose freedom is in question. The instrument of measurement IS the ' },
                        { name: 'The Phantom Limb of Free Will: Feeling Free While Being Bound', href: '/philosophy-phantom-limb-free-will', desc: 'The brain feels sensation in amputated limbs that no longer exist. Fallen humanity feels free will in a faculty that was' },
                        { name: 'The Philosophical Case for God\'s Sovereignty — Logic That Leads to Grace', href: '/philosophy-hub', desc: 'What happens when you follow logic all the way to its conclusion? You end up at grace. The mirror of the soul, the probl' },
                        { name: 'The Prisoner\'s Dilemma of Salvation: Why Self-Interest Always Betrays', href: '/philosophy-prisoners-dilemma', desc: 'Game theory proved that self-interested agents always betray each other without an external enforcer. The soul does the ' },
                        { name: 'The Resistance Is the Proof: Why We Blame God Before Ourselves', href: '/philosophy-resistance-is-proof', desc: 'When confronted with God' },
                        { name: 'The Script You Didn\'t Write', href: '/philosophy-theater-script', desc: 'Every actor receives a script they didn' },
                        { name: 'Try to Believe the Sky Is Green. You Can\'t. That\'s the Point.', href: '/philosophy-bootstrap-paradox', desc: 'You cannot believe something by deciding to believe it. This is doxastic involuntarism — the most airtight proof that sa' },
                        { name: 'What If You\'re Wrong? — The Soteriological Pascal\'s Wager', href: '/philosophy-what-if-wrong', desc: 'A devastating asymmetry argument: the risk profile of Arminianism vs. Calvinism. Which theological position has the more' },
                        { name: 'Why "I Chose God" Is a Sentence That Destroys Itself', href: '/philosophy-infinite-regress-of-choice', desc: 'Before you chose God, something caused you to choose. What caused that? And what caused THAT? The infinite regress of ch' },
                        { name: 'Why Exclusive Love Is the Only Real Love — And What It Proves About Election', href: '/philosophy-exclusive-love', desc: 'A love extended to everyone equally is not love — it is policy. Real love requires distinction. Real love means you, not' },
                        { name: 'Why Is Marriage Special? A Philosophical Proof of Election', href: '/philosophy-marriage-election', desc: 'Why is marriage special? Because someone chose YOU and no one else. Discover what this reveals about God' },
                        { name: 'Why You Can\'t See Your Own Spiritual Blindness — And Only God Can', href: '/philosophy-self-deception', desc: 'The heart is deceitful above all things. Jeremiah 17:9 diagnosed what philosophy calls the self-deception problem: the v' },
                        { name: 'Why You Can\'t Will Yourself to Sleep — And What It Proves About Grace', href: '/philosophy-sleep-surrender', desc: 'Why you can' },
                        { name: 'You Didn\'t Choose to Be Born — The Argument from Childhood That Destroys Free Will', href: '/philosophy-children-argument', desc: 'You didn' },
                        { name: 'Your Mother Tongue Chose You', href: '/philosophy-mother-tongue', desc: 'No child decides to learn their native language. It happens to them. The deepest structure of your mind was given, not c' },
                        { name: 'Your Salvation Doesn\'t Revolve Around You — The Copernican Revolution of the Soul', href: '/philosophy-copernican-revolution', desc: 'Just as Copernicus showed the Earth isn' }
                    ]
                },
                {
                    name: 'Secular Evidence',
                    icon: '🔬',
                    href: '/secular-evidence',
                    count: 13,
                    pages: [
                        { name: 'Art & Literature — How the Greatest Writers Intuited Reformed Truth', href: '/secular-art-literature-reformed-truth', desc: 'Shakespeare, Dostoevsky, O' },
                        { name: 'Every Recovery Program Begins with Total Depravity', href: '/secular-recovery-total-depravity', desc: 'The 12 Steps accidentally confess Reformed theology. Step 1 is total depravity. Step 2 is regeneration. Step 3 is faith ' },
                        { name: 'Every Social Experiment Confirms What Scripture Already Knew', href: '/secular-sociology-human-inability', desc: 'Milgram. Asch. The Good Samaritan study. Sociology spent a century proving what Paul said first: the human heart default' },
                        { name: 'Modern Psychology Keeps Proving Total Depravity', href: '/secular-psychology-bondage-of-will', desc: 'Cognitive bias, addiction research, and neuroscience confirm what the Reformers taught 500 years ago: the human will is ' },
                        { name: 'Philosophy\'s 2,500-Year Verdict on Free Will — It Doesn\'t Exist', href: '/secular-philosophy-free-will', desc: '59% of professional philosophers reject libertarian free will. The position Arminianism requires is a minority view even' },
                        { name: 'The Algorithm Knows You Better Than You Know Yourself', href: '/secular-algorithm-sovereignty', desc: 'Netflix knows what you' },
                        { name: 'The Billion Decisions Your Body Made Today Without Asking', href: '/secular-billion-decisions', desc: 'Your heart beat 100,000 times yesterday without asking permission. If God didn' },
                        { name: 'The Hard Problem of Consciousness — And What It Points To', href: '/secular-hard-problem-consciousness', desc: 'Science can map every synapse in your brain but cannot explain why it feels like something to be you. The Hard Problem o' },
                        { name: 'The History of Sovereignty — When Secular Historians Document Divine Control', href: '/secular-history-sovereignty', desc: 'Secular historians have documented patterns they cannot explain: the rise and fall of empires, the convergence of imposs' },
                        { name: 'What AI Teaches Us About Free Will — And Why It Matters for Grace', href: '/secular-ai-determinism', desc: 'Large language models are entirely deterministic — yet their outputs appear free and creative. This is compatibilism run' },
                        { name: 'Why Every Economist Assumes Total Depravity', href: '/secular-economics-depravity', desc: 'Economics has always assumed what Scripture teaches: humans are self-interested, short-sighted, and prone to exploitatio' },
                        { name: 'Written Before You Were Born: DNA and Sovereignty', href: '/secular-genetics-sovereignty', desc: 'Behavioral genetics proves that personality, temperament, and moral intuitions are substantially heritable. You didn' },
                        { name: 'Your Brain Decided Before You Did — The Neuroscience of Inability', href: '/secular-neuroscience-human-inability', desc: 'Neuroscience reveals that conscious' }
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
                    count: 29,
                    pages: [
                        { name: '⚡ Are You Sure You\'re Saved?', href: '/psychology-cost-of-rejecting-grace', desc: 'One question exposes the most dangerous lie in the church: where did your faith come from? If you produced it, you are t' },
                        { name: 'How We Secretly Redefine Grace to Include Ourselves', href: '/resistance-redefining-grace', desc: 'You think you understand grace. But have you unconsciously redefined it to include your own contribution? A gentle demol' },
                        { name: 'Pride: The Root of Every Objection to Grace', href: '/psychology-pride-root-objection', desc: 'Why does grace provoke fury? Psychology and Scripture reveal the answer: pride. Every objection to sovereignty defends t' },
                        { name: 'Terror Management and the Threat of Sovereignty', href: '/psychology-terror-management', desc: 'Terror Management Theory explains why God' },
                        { name: 'The Anosognosia of the Soul: Why You Can\'t See Your Own Spiritual Paralysis', href: '/psychology-anosognosia-of-sin', desc: 'A neurological condition reveals a spiritual reality: the damage that destroys your capacity to choose God also destroys' },
                        { name: 'The Autonomy Illusion: Why "Free Will" Feels So Real', href: '/psychology-autonomy-illusion', desc: 'Neuroscience reveals that your sense of autonomous choice may be the brain' },
                        { name: 'The Credit Thief Inside Your Brain — Why You Think You Chose God', href: '/psychology-attribution-error', desc: 'The Fundamental Attribution Error explains why humans instinctively take credit for outcomes they didn' },
                        { name: 'The Language You Already Speak — How Your Own Words Confess Sovereign Grace', href: '/psychology-language-you-already-speak', desc: 'Christians unknowingly use Calvinist language every day. Your verbs betray your theology. Discover how your own words co' },
                        { name: 'The Last Idol: Why Self-Sovereignty Is the Hardest Thing to Surrender', href: '/resistance-last-idol', desc: 'Self-sovereignty is the idol that hides behind every other idol — the conviction that you are the captain of your soul. ' },
                        { name: 'The Sincerity Trap — Why the Most Genuine Believers Are the Hardest to Reach', href: '/psychology-sincerity-trap', desc: 'Why the warmest, most sincere believers are often the hardest to reach with truth. How sincerity itself becomes the armo' },
                        { name: 'The Stockholm Syndrome of Sin: Why We Defend Our Bondage', href: '/psychology-stockholm-syndrome-sin', desc: 'Hostages bond with their captors. Sinners bond with their sin. Why the enslaved will fights for the prison and defends t' },
                        { name: 'The Sunk Cost of Self-Made Faith', href: '/psychology-sunk-cost-faith', desc: 'The sunk cost fallacy explains why believers resist grace the longer they' },
                        { name: 'What Every Recovering Addict Already Knows About Salvation', href: '/psychology-addiction-proof', desc: 'The 12 steps prove what Scripture teaches: the will is enslaved and freedom comes only through a power greater than ours' },
                        { name: 'When Your Heart Rejects What Your Mind Accepts', href: '/psychology-emotional-vs-rational', desc: 'When your head knows sovereignty is biblical but your heart rejects it. Dual-process theory, affect heuristic, and Haidt' },
                        { name: 'Why Believing You Saved Yourself Feels Right', href: '/psychology-comfort-self-salvation', desc: 'Five psychological mechanisms make' },
                        { name: 'Why Do People Reject What They Know Is True?', href: '/psychology-suppressing-truth', desc: 'Romans 1:18 reveals the deepest human problem: we suppress what we already know about God. Modern psychology calls it mo' },
                        { name: 'Why Do We Resist Predestination? The Psychology Explained', href: '/psychology-why-we-resist', desc: 'Why do intelligent, Bible-believing Christians reject predestination? Psychology reveals motivated reasoning, cognitive ' },
                        { name: 'Why Does God\'s Sovereignty Terrify Us?', href: '/psychology-fear-control', desc: 'Why does God' },
                        { name: 'Why Evidence Makes Some People Believe Harder', href: '/psychology-backfire-effect', desc: 'Why does showing someone Scripture about election make them believe harder in free will? The backfire effect reveals how' },
                        { name: 'Why Grace Feels Like an Attack on Your Identity', href: '/psychology-identity-threat', desc: 'Why does grace feel like an attack on your identity? Identity-protective cognition explains how belief becomes self-conc' },
                        { name: 'Why Grace Makes You Angry — And What That Anger Reveals', href: '/psychology-offense-of-grace', desc: 'Why does unconditional election trigger moral outrage? Moral Foundations Theory and psychological reactance explain the ' },
                        { name: 'Why People Defend the Theology That Enslaves Them', href: '/psychology-system-justification', desc: 'System Justification Theory explains why people defend systems that hurt them — and why millions of Christians fiercely ' },
                        { name: 'Why the Truth That Makes You Angriest Is the One That Will Set You Free', href: '/psychology-hostility-reaction', desc: 'When a lifelong Christian suddenly becomes enraged at the doctrines of grace, something deeper than theology is happenin' },
                        { name: 'Why This Objection Proves Our Point', href: '/psychology-why-this-objection-proves-our-point', desc: 'The most common objection to the Crown Jewel argument —' },
                        { name: 'Why Your Church All Believes the Same Thing', href: '/psychology-groupthink', desc: 'Why do church friends all believe the same theology? Discover how conformity bias, groupthink, and social identity keep ' },
                        { name: 'Why Your Soul Rebels When It Hears the Truth', href: '/psychology-reactance-theory', desc: 'Reactance theory explains the automatic psychological resistance to God' },
                        { name: 'You Didn\'t Choose Your Mother Tongue', href: '/psychology-language-acquisition', desc: 'No child decides to learn language. Grammar arrives uninvited, rewires the brain, and gives the child a world they never' },
                        { name: 'Your Brain Decides Before You Do', href: '/psychology-illusion-free-will', desc: 'Neuroscience reveals what Scripture has always known: your brain decides before you do. What this means for' },
                        { name: 'Your Brain Is Lying to You — And the Bible Knew It First', href: '/psychology-cognitive-biases', desc: 'Cognitive biases mapped to biblical descriptions of fallen thinking. Confirmation bias, anchoring, Dunning-Kruger — mode' }
                    ]
                },
                {
                    name: 'Stories, Parables & Analogies',
                    icon: '📜',
                    href: '/stories',
                    count: 31,
                    pages: [
                        { name: 'A Baby Doesn\'t Interview for a Family — What Adoption Teaches About Election', href: '/analogy-adoption', desc: 'A baby doesn' },
                        { name: 'A Love Letter Written Before Time Began', href: '/story-the-letter-before-the-world', desc: 'She found a letter her father wrote before she was born — before he even knew he would adopt her. A tender story about b' },
                        { name: 'Can a Stone Heart Choose to Beat? — A Parable About Regeneration', href: '/story-surgeon-stone-heart', desc: 'A surgeon gives a dying patient a new heart without asking permission. The patient wakes up alive — not because he chose' },
                        { name: 'Can You Save Yourself? A Parable About Grace and Human Effort', href: '/story-the-garden-that-grew-itself', desc: 'A powerful children' },
                        { name: 'Did You Really Choose God? — A Story About the Illusion of Free Will', href: '/story-the-room-where-you-chose', desc: 'Follow a golden thread back through time to discover the origin of your most important choice. A story about free will, ' },
                        { name: 'Martin Luther\'s Thunderstorm: How God Chose a Monk Before He Chose God', href: '/story-historical-luther-storm', desc: 'July 2, 1505. A terrified law student is knocked flat by lightning and screams a vow that changes history. The story of ' },
                        { name: 'Real Conversions: What Actually Happens When God Saves Someone', href: '/story-real-conversions', desc: 'Eight real conversion stories from church history showing that nobody' },
                        { name: 'The Altar He Built Himself — A Story About the Religion That Almost Killed Him', href: '/story-dark-the-altar-he-built-himself', desc: 'Marcus built his faith with his own hands — a perfect life, a perfect church, a perfect testimony. Then God tore it down' },
                        { name: 'The Chess Grandmaster — How God Controls Everything Without Making You a Robot', href: '/analogy-chess-grandmaster', desc: 'A grandmaster knows every move you' },
                        { name: 'The Committee to Save Yourself', href: '/story-humor-committee-to-save-yourself', desc: 'A town of drowning people forms a committee to rescue themselves. A satirical story about the absurdity of trying to sav' },
                        { name: 'The Cross-Examination — When Sovereign Grace Puts Free Will on the Witness Stand', href: '/story-cross-examination', desc: 'A courtroom drama where the doctrine of free will faces cross-examination by Scripture itself. When your answers collide' },
                        { name: 'The Day You Got to Choose Again — A Thought Experiment About Free Will and Grace', href: '/story-thought-the-day-you-chose-again', desc: 'What if God gave you the chance to choose Him again — but this time you could see everything clearly? A thought experime' },
                        { name: 'The Dead City — A Parable About Sin and Grace', href: '/story-the-dead-city', desc: 'An allegory about spiritual death and regeneration. Why the dead in sin cannot choose God — and why the Voice that awake' },
                        { name: 'The Drowning Man Who Thinks He\'s Swimming', href: '/analogy-drowning-man', desc: 'The crucial distinction isn' },
                        { name: 'The Fish Who Chose the Ocean', href: '/story-the-fish-who-chose-the-ocean', desc: 'Did you choose God, or did God choose you? A parable about a fish who thought he chose the ocean — until an old turtle a' },
                        { name: 'The Gardener Who Waited — When Your Child Walks Away from Faith', href: '/story-tender-the-gardener-who-waited', desc: 'A father tends a garden and grieves a prodigal son. A tender story about sovereignty, waiting, and the seeds only God ca' },
                        { name: 'The God Who Let You Watch — What If You Could See Yourself Being Chosen?', href: '/story-thought-the-god-who-let-you-watch', desc: 'What if God pulled back the curtain and let you watch the moment He chose you — before you existed, before the world beg' },
                        { name: 'The King Who Chose His Children — A Story About Being Chosen by God', href: '/story-children-the-king-who-chose', desc: 'A children' },
                        { name: 'The King\'s Banquet: A Parable About Election and Grace', href: '/story-the-kings-banquet', desc: 'Why doesn' },
                        { name: 'The Lazarus Argument: Dead People Don\'t Choose to Live', href: '/analogy-lazarus-grave', desc: 'A dead man heard a voice and walked out of his grave. This is what Scripture teaches about salvation: not invitation, bu' },
                        { name: 'The Man Who Sued God for Saving Him Without Consent', href: '/story-humor-the-man-who-sued-god', desc: 'Gerald Pemberton filed a formal complaint against the Almighty for violating his autonomy by saving him without permissi' },
                        { name: 'The Night Augustine Stole the Pears — A Story About Total Depravity', href: '/story-historical-augustine-pears', desc: 'A story about Augustine at sixteen, stealing pears he didn' },
                        { name: 'The Orchestra That Thinks It Wrote the Symphony', href: '/analogy-orchestra', desc: 'Every musician plays with real skill, real passion, real artistry. And every note was written before they arrived. The o' },
                        { name: 'The Orphanage — A Story About Being Chosen by Grace', href: '/story-the-orphanage', desc: 'A girl discovers adoption papers signed before she was born. A parable revealing that God' },
                        { name: 'The Person Who Chose God — A Dark Thought Experiment', href: '/story-the-person-who-chose-god', desc: 'Imagine someone who chose God entirely on their own — no grace, no regeneration, no gift of faith. What would that look ' },
                        { name: 'The River That Thinks It Chose Its Path', href: '/analogy-river', desc: 'A river flows freely — rushing, turning, cascading. But every twist was determined by terrain carved before the first dr' },
                        { name: 'The Self-Made Man: A Story About Self-Salvation', href: '/story-the-self-made-man', desc: 'The self-made man who took credit for everything he didn' },
                        { name: 'The Song You Didn\'t Compose — Why Beauty Proves Grace', href: '/analogy-song-you-didnt-compose', desc: 'Beauty moves you without your permission. It acts on you from outside. That is exactly how grace works — and the proof i' },
                        { name: 'The Woman Who Earned Her Seat', href: '/story-dark-the-woman-who-earned-her-seat', desc: 'She tithed. She served. She never missed a Sunday. Then the worst sinner in town walked into her church forgiven, and sh' },
                        { name: 'Who Turns On the Light? — A Simple Picture of How Faith Works', href: '/analogy-light-switch', desc: 'You' },
                        { name: 'Why the Spiritually Dead Cannot Choose God', href: '/analogy-doctor-corpse', desc: 'A corpse cannot cooperate with its own resurrection. Neither can the spiritually dead choose God. The doctor-and-corpse ' }
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
                        { name: '2,000 Years of Sovereign Grace — The Golden Thread Through Church History', href: '/history-golden-thread', desc: 'From Paul to Augustine to Luther to Spurgeon to today — God has preserved the truth of sovereign grace through every cen' },
                        { name: 'Augustine vs Pelagius — The Trial That Saved Christianity', href: '/history-augustine-pelagius', desc: 'In the 5th century, two visions of humanity clashed: one said you could reach God on your own, the other said you were d' },
                        { name: 'Did the Early Church Believe in Sovereign Grace? (100-300 AD)', href: '/history-apostolic', desc: 'What did the earliest Christians after the apostles believe about grace, election, and God' },
                        { name: 'Every Great Revival Was Led by a Calvinist — The Fruit That Proves the Tree', href: '/history-every-revival-sovereign-grace', desc: 'History' },
                        { name: 'John Calvin and Geneva — The Architect of Grace', href: '/history-calvin-geneva', desc: 'Calvin didn' },
                        { name: 'Martin Luther and The Bondage of the Will — The Debate That Changed Everything', href: '/history-luther', desc: 'Luther called The Bondage of the Will his most important work — more important than the 95 Theses. Why? Because it prove' },
                        { name: 'My Only Comfort in Life and Death — The Heidelberg Catechism', href: '/creed-heidelberg-catechism', desc: 'My Only Comfort in Life and Death — The Heidelberg Catechism' },
                        { name: 'Open Theism: The Heresy That Finally Said the Quiet Part Out Loud', href: '/history-open-theism', desc: 'For 1,600 years the flesh has been smuggling in a God whose knowledge depends on your choices. Open theism just removed ' },
                        { name: 'The African Fathers: Augustine Wasn\'t Alone', href: '/history-african-fathers', desc: 'Before Augustine, before Europe, before Calvin — North African Christians were already preaching the sovereignty of grac' },
                        { name: 'The Canons of Dort — Line by Line in Plain English', href: '/canons-of-dort-plain-english', desc: 'The Canons of Dort rendered into plain modern English. All five heads of doctrine, article by article, with the rejectio' },
                        { name: 'The Canons of Dort — The Confession That Defended Grace Against Works', href: '/creed-canons-dort', desc: 'In 1619, delegates from eight countries gathered at Dordrecht and issued a verdict that still echoes: salvation is entir' },
                        { name: 'The Council of Orange (529 AD) — The Church Already Settled This', href: '/history-council-of-orange', desc: 'In 529 AD, the church formally condemned the belief that humans can initiate faith without God' },
                        { name: 'The Great Awakening — When Sovereign Grace Set America on Fire', href: '/history-great-awakening', desc: 'Edwards preached. Whitefield thundered. Entire towns converted — not by clever marketing, but by sovereign grace. The Gr' },
                        { name: 'The Heresy That Won\'t Die: 1,600 Years of the Foreknowledge Objection', href: '/history-heresy-foreknowledge', desc: 'The claim that God elects based on foreseen faith has been proposed, refuted, and resurrected for 1,600 years. Three chu' },
                        { name: 'The Heresy That Won\'t Die: 2,000 Years of the Free Will Defense', href: '/history-heresy-free-will', desc: 'The claim that humans have free will to choose God has been proposed, refuted, and resurrected for 2,000 years. Every ti' },
                        { name: 'The Invention of Decision Theology: How the Altar Call Replaced the Gospel', href: '/history-decision-theology', desc: 'The phrase' },
                        { name: 'The Puritans — When Theology Set Nations on Fire', href: '/history-puritans', desc: 'Owen. Bunyan. Edwards. The Westminster Assembly. For 150 years, Puritan theology was fire in the bones — devotional dept' },
                        { name: 'The Pyongyang Revival: When Sovereign Grace Shook Korea', href: '/history-korean-revival', desc: 'In 1907, the Holy Spirit fell on Pyongyang with a power that eyewitnesses compared to Pentecost. The theology behind the' },
                        { name: 'The Reformed Resurgence — How Sovereign Grace Came Back in the 20th Century', href: '/history-20th-century', desc: 'The liberal decline, the Reformed comeback, and sovereign grace rediscovered. Machen, Lloyd-Jones, Sproul, MacArthur — a' },
                        { name: 'The Synod of Dort — When the Church Formally Chose Grace Over Works', href: '/history-dort', desc: 'In 1619, 84 theologians from 8 countries examined Arminianism against Scripture and rejected it point by point. The five' },
                        { name: 'The Synod of Dort: Five Points Forged in Fire', href: '/history-dort-deep', desc: 'For seven months in 1618-1619, the Reformed church put Arminianism on trial. Eighty-four theologians from eight nations.' },
                        { name: 'When Spurgeon Stood Alone for Truth — The Downgrade Controversy', href: '/history-spurgeon-downgrade', desc: 'The most beloved preacher in the world saw his denomination abandoning biblical truth — and said so publicly. It cost hi' },
                        { name: 'When the Gospel Almost Died — Medieval Theology (300-1400 AD)', href: '/history-medieval', desc: 'Augustine vs Pelagius. Semi-Pelagianism' },
                        { name: 'Where Sovereign Grace Stands Now — The Global Picture', href: '/history-today', desc: 'Reformed theology is exploding in Africa, Asia, and Latin America. The digital reformation is reaching people no mission' },
                        { name: 'Whitefield vs. Wesley — Two Revivals, One Question: Where Does Faith Come From?', href: '/history-whitefield-wesley', desc: 'George Whitefield and John Wesley both shook nations with revival fire — but they disagreed on the one question that mat' },
                        { name: 'Written in Blood and Fire — The Story Behind the Reformed Confessions', href: '/history-confessions-story', desc: 'The Belgic Confession, Heidelberg Catechism, Canons of Dort, Westminster Standards, 1689 Baptist Confession — behind eve' }
                    ]
                },
                {
                    name: 'Theologian Profiles',
                    icon: '🧓',
                    href: '/theologians',
                    count: 19,
                    pages: [
                        { name: 'Amazing Grace: The Hymn That Proves What You Already Believe', href: '/hymn-amazing-grace', desc: 'You' },
                        { name: 'Anselm of Canterbury — The Man Who Proved You Can\'t Think Your Way to God', href: '/theologian-anselm', desc: 'The medieval philosopher who showed that reason itself leads to sovereignty. Anselm' },
                        { name: 'Augustine: The Rebel God Hunted Down', href: '/theologian-augustine', desc: 'Augustine of Hippo spent decades running from God — through lust, philosophy, and heresy. God caught him anyway. His the' },
                        { name: 'B.B. Warfield: The Lion of Princeton', href: '/theologian-warfield', desc: 'Benjamin Breckinridge Warfield (1851-1921) — Reformed theologian who defended inerrancy and sovereign grace for 34 years' },
                        { name: 'Charles Spurgeon — The Prince of Preachers Who Couldn\'t Stop Talking About Grace', href: '/theologian-spurgeon', desc: 'Charles Haddon Spurgeon: the greatest preacher of the nineteenth century, who proved that Calvinism is not cold theology' },
                        { name: 'George Whitefield: The Voice That Shook a Nation Awake', href: '/theologian-whitefield', desc: 'George Whitefield: the greatest evangelist of the Great Awakening, a thoroughgoing Calvinist who proved that election fu' },
                        { name: 'Gottschalk of Orbais — Imprisoned 20 Years for Preaching Predestination', href: '/theologian-gottschalk', desc: 'A 9th-century monk taught double predestination from Augustine and was beaten, imprisoned, and silenced for 20 years. He' },
                        { name: 'J. Gresham Machen — The Scholar Who Stood When Everyone Else Bowed', href: '/theologian-machen', desc: 'When the liberal tide swept through Princeton, one man refused to bend. Machen defended the gospel against cultural Chri' },
                        { name: 'Jacobus Arminius: The Man Behind the Movement', href: '/theologian-arminius', desc: 'A respectful but honest treatment of Jacobus Arminius. His background, training under Beza, the five Remonstrant article' },
                        { name: 'John Bunyan: The Tinker Who Wrote the Greatest Allegory of Grace', href: '/theologian-bunyan', desc: 'The Tinker of Bedford: John Bunyan' },
                        { name: 'John Calvin — The Theologian of God\'s Sovereignty', href: '/theologian-calvin', desc: 'He didn' },
                        { name: 'John Owen: He Proved Christ Didn\'t Die in Vain', href: '/theologian-owen', desc: 'John Owen (1616–1683) — the theologian' },
                        { name: 'John Wycliffe — The Morning Star of the Reformation', href: '/theologian-wycliffe', desc: 'He gave England the Bible in their own language and defended God' },
                        { name: 'Jonathan Edwards — The Mind That Set a Nation on Fire', href: '/theologian-edwards', desc: 'How a quiet pastor in Northampton became the greatest theologian America ever produced — and why his vision of God' },
                        { name: 'Martin Luther: The Monk Who Broke the Church to Save It', href: '/theologian-luther', desc: 'Martin Luther (1483–1546): The Reformation' },
                        { name: 'Martyn Lloyd-Jones — The Doctor Who Left Medicine to Diagnose the Soul', href: '/theologian-lloydjones', desc: 'He gave up a prestigious medical career to preach sovereign grace with fire and logic. Lloyd-Jones embodied irresistible' },
                        { name: 'R.C. Sproul: The Theologian Grace Wouldn\'t Release', href: '/theologian-sproul', desc: 'R.C. Sproul' },
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
                    count: 24,
                    pages: [
                        { name: 'Can God Stop Loving You?', href: '/devotional-never-gives-up', desc: 'Can God stop loving you? What if He decided before your birth to love you forever—and nothing you do could change His mi' },
                        { name: 'Can You Lose God\'s Love? What "Forever" Actually Means', href: '/devotional-forever-loved', desc: 'You' },
                        { name: 'Chosen Before You Were Broken', href: '/devotional-chosen-before-you-were-broken', desc: 'You were chosen before the creation of the world — before any sin, before any shame, before any breaking. A devotional f' },
                        { name: 'For the Secretly Ashamed', href: '/devotional-the-secretly-ashamed', desc: 'The thing you' },
                        { name: 'He Loved You Before the World Was Made', href: '/devotional-love-before-the-world', desc: 'Before time. Before space. Before anything existed — God loved you. A meditation on the eternal, electing love that pred' },
                        { name: 'I Can\'t Feel God Anymore', href: '/devotional-i-cant-feel-god', desc: 'You pray and hear nothing. You read Scripture and it' },
                        { name: 'I Don\'t Think I\'m Saved', href: '/devotional-i-dont-think-im-saved', desc: 'You' },
                        { name: 'In Christ — The Two Words That Change Everything', href: '/devotional-in-christ', desc: 'Every spiritual blessing flows from two words:' },
                        { name: 'My Chains Fell Away', href: '/devotional-my-chains-fell-away', desc: 'What does it feel like when God breaks your chains? A devotional on the moment grace becomes irresistible — when the sou' },
                        { name: 'Rescued Without a Say — You Didn\'t Ask to Be Saved. God Did It Anyway.', href: '/devotional-rescued-without-a-say', desc: 'Grace didn' },
                        { name: 'The Glory of Divine Choice', href: '/devotional-glory-of-divine-choice', desc: 'You were chosen before the creation of the world. Not because you' },
                        { name: 'The God Who Wastes Nothing — When Your Suffering Has a Sovereign Purpose', href: '/devotional-the-god-who-wastes-nothing', desc: 'The pain you carry was not an accident. The God who numbered the hairs on your head numbered the tears on your face. A d' },
                        { name: 'The Good That I Cannot Do', href: '/devotional-good-i-cannot-do', desc: 'You have tried to be good. You know what happened. A devotional on Romans 7, human inability, and why' },
                        { name: 'The Hands That Hold You — Your Faith Was Never Yours to Lose', href: '/devotional-the-hands-that-hold-you', desc: 'Your faith is not held up by your grip. It is held in the hands of God. A devotional for anyone terrified they will lose' },
                        { name: 'The Joy of Election — Why Sovereign Grace Is the Most Joyful Truth in the Universe', href: '/devotional-joy-of-election', desc: 'For years the truth of election terrified me. Then one day the gravity settled and I saw what I had missed — there is no' },
                        { name: 'The Love Letter God Wrote Before Time Began', href: '/devotional-love-letter-before-time', desc: 'What if you found a letter written to you before you were born — before the world was born? Ephesians 1:3-14 as God' },
                        { name: 'The Prayer You Didn\'t Pray', href: '/devotional-the-prayer-you-didnt-pray', desc: 'You think you reached out to God. But what if God reached out first — and the prayer was the proof? A devotional on the ' },
                        { name: 'Valley of the Shadow', href: '/devotional-valley-shadow', desc: 'Psalm 23 doesn' },
                        { name: 'What Does "Dead in Sin" Actually Mean? More Than You Think.', href: '/devotional-dead-who-live', desc: 'Ephesians 2:1 says you were dead — not struggling, not searching, dead. This devotional explores what spiritual death re' },
                        { name: 'What If Surrendering Your Will Is Where Joy Begins?', href: '/devotional-not-my-will-but-joy', desc: 'Sovereignty sounds like prison until you' },
                        { name: 'When God Says No — A Devotional on Unanswered Prayer', href: '/devotional-when-god-says-no', desc: 'Sometimes God says no. And His refusal is more loving than our yes would have been. A devotional meditation on unanswere' },
                        { name: 'When God\'s Power Works Through Your Weakness', href: '/devotional-weakness-of-gods-strength', desc: 'God' },
                        { name: 'Your Heart Used to Burn. Now It\'s Barely Warm.', href: '/devotional-cold-church', desc: 'You used to feel something when you worshipped. Now the fire is out. Revelation 3 was written to a church exactly like y' },
                        { name: 'Your Name Was Written Before You Were Born — Adoption and Grace', href: '/devotional-adoption-papers', desc: 'A baby doesn' }
                    ]
                },
                {
                    name: 'Healing & Hope',
                    icon: '💚',
                    href: '/anxious-mind-what-if-not-chosen',
                    count: 44,
                    pages: [
                        { name: '82% of People Are Lonely — And It\'s a Theological Problem', href: '/invisible-wall-lonely-theological', desc: 'Loneliness is not a social problem — it' },
                        { name: 'Religious OCD — When Your Mind Won\'t Stop Accusing You', href: '/anxious-mind-scrupulosity', desc: 'The intrusive blasphemous thoughts. The fear of the unforgivable sin. The terror that your faith isn' },
                        { name: 'The Ache of Watching Others Feel What You Can\'t', href: '/invisible-wall-spiritual-envy', desc: 'Everyone around you seems to feel God' },
                        { name: 'The Anxious Mind — When Your Brain Won\'t Stop Screaming', href: '/anxious-mind-hub', desc: 'Intrusive thoughts. The terror that your faith isn' },
                        { name: 'The Broken Mirror — When You Believe You\'re Not Enough', href: '/broken-mirror-hub', desc: 'You believe your worth depends on your performance. That you must earn God' },
                        { name: 'The Child You Never Held — After Miscarriage and Infant Loss', href: '/open-wound-miscarriage', desc: 'You are grieving someone the world tells you to get over. But you carried them. You loved them. And the God who knit the' },
                        { name: 'The Christian Who Feels Like a Fraud', href: '/broken-mirror-imposter-syndrome', desc: 'You feel like you don' },
                        { name: 'The Friend Who Left When Your Theology Changed', href: '/invisible-wall-friend-who-left', desc: 'You discovered sovereign grace and the people you love pulled away. The loneliness is real. The loss is real. But so is ' },
                        { name: 'The Invisible Wall — When Your Theology Costs You Relationships', href: '/invisible-wall-hub', desc: 'You discovered sovereign grace and now your family doesn' },
                        { name: 'The Loop That Won\'t Break — OCD, Rumination, and the God Who Holds Your Mind', href: '/anxious-mind-the-loop-that-wont-break', desc: 'The anxious loop — the checking, the replaying, the what-ifs that never stop — is your brain trying to be God. Sovereign' },
                        { name: 'The Open Wound — For Those Who Are Suffering', href: '/open-wound-hub', desc: 'For those who have lost someone, who live with pain, who survived abuse, or who asked why bad things happen. God' },
                        { name: 'The Performance Treadmill — When Doing Enough for God Becomes a Prison', href: '/broken-mirror-performance-treadmill', desc: 'You believe God' },
                        { name: 'The Prayer God Didn\'t Answer — And What That Means', href: '/open-wound-the-prayer-god-didnt-answer', desc: 'You prayed. You begged. You believed. And God said no. What do you do with a sovereign God who could have said yes — and' },
                        { name: 'The Relapse — When You Fall Back Into the Sin You Thought You\'d Conquered', href: '/broken-mirror-the-relapse', desc: 'You swore you were done. You were sure the last time was the last time. And then you did it again. Grace doesn' },
                        { name: 'The Shattered Lens — When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-hub', desc: 'Deepfakes, AI, misinformation, pastoral manipulation — truth feels impossible to find. But the sovereignty of God is the' },
                        { name: 'The Sin You Keep Repeating — And Why It Doesn\'t Disqualify You', href: '/broken-mirror-sin-you-repeat', desc: 'You fall. You repent with tears. You promise God never again. Three days later, you' },
                        { name: 'The Terror That Won\'t Quiet: When You\'re Afraid of Hell', href: '/anxious-mind-fear-of-hell', desc: 'You can' },
                        { name: 'What If I\'m Not One of the Chosen?', href: '/anxious-mind-what-if-not-chosen', desc: 'The question terrifies you. Here is the beautiful paradox: the fear itself is evidence that you are. Dead hearts don' },
                        { name: 'When Everything You Were Taught Was Wrong', href: '/shattered-lens-taught-wrong', desc: 'You grew up believing one thing about God. Now Scripture is showing you something different. That disorientation isn' },
                        { name: 'When God Goes Silent — And Faith Shatters', href: '/shattered-lens-silence-of-god', desc: 'You prayed and heard nothing. Faith shatters in the silence. A healing page for those who feel abandoned by God — discov' },
                        { name: 'When God Is Sovereign and the Nursery Is Empty', href: '/open-wound-empty-nursery', desc: 'You believe God is in control. And then the ultrasound goes silent. How do you hold sovereignty and miscarriage in the s' },
                        { name: 'When Grace Feels Too Good to Be True', href: '/broken-mirror-grace-too-good', desc: 'Your suspicion of grace isn' },
                        { name: 'When Prayer Feels Like Talking to the Ceiling', href: '/invisible-wall-prayer-feels-empty', desc: 'You used to feel God when you prayed. Now you feel nothing. The silence doesn' },
                        { name: 'When Prayer Stopped Working', href: '/shattered-lens-when-prayer-stopped-working', desc: 'You used to pray and feel something. Now you pray and hear nothing. The silence is deafening — and you' },
                        { name: 'When Seeing the Truth Cost You Your Community', href: '/shattered-lens-lost-community', desc: 'You discovered sovereign grace and lost your church, your friends, maybe your family. The truth set you free — and it co' },
                        { name: 'When the Bible Stopped Making Sense', href: '/shattered-lens-bible-doesnt-make-sense', desc: 'You used to open Scripture and feel it breathe. Now it reads like a foreign document full of problems. That collapse may' },
                        { name: 'When the Church Becomes the Wound', href: '/open-wound-betrayed-by-church', desc: 'When the people meant to represent God become the wound itself. How to distinguish Christ from the institution that hurt' },
                        { name: 'When the Death Makes No Sense — Grief Without Explanation', href: '/open-wound-senseless-death', desc: 'A gentle place to grieve a death that seems pointless, arbitrary, cruel. You don' },
                        { name: 'When the Diagnosis Is Terminal — Sovereignty and the End You Didn\'t Choose', href: '/open-wound-terminal-diagnosis', desc: 'When the doctor says there' },
                        { name: 'When You and Your Spouse Speak Different Theological Languages', href: '/invisible-wall-marriage', desc: 'For believers whose spouse doesn' },
                        { name: 'When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-cant-tell-true', desc: 'Misinformation, AI, deepfakes, and political chaos have created an epistemological crisis. But Romans 1 predicted it. Go' },
                        { name: 'When You Can\'t Unsee It — The Beautiful Terror of Seeing God\'s Sovereignty', href: '/shattered-lens-cant-unsee-it', desc: 'The Bible suddenly revealed something you can' },
                        { name: 'When You See It and Your Church Doesn\'t — Singing Alone', href: '/invisible-wall-singing-alone', desc: 'You love your church. You love the people. But something has changed in you — and now the sermons feel incomplete. What ' },
                        { name: 'When You\'re the Only One Who Sees It', href: '/invisible-wall-only-one-who-sees', desc: 'The loneliness of understanding sovereign grace when no one around you does. You' },
                        { name: 'When Your Family Doesn\'t See It', href: '/invisible-wall-family', desc: 'You discovered sovereign grace and your family didn' },
                        { name: 'When Your Mind Becomes a War Zone — Intrusive Thoughts and Faith', href: '/anxious-mind-intrusive-thoughts', desc: 'Intrusive thoughts, blasphemous images, unwanted mental loops — they don' },
                        { name: 'When Your Pastor Teaches What You Know Isn\'t True', href: '/shattered-lens-pastor', desc: 'The pain of disagreeing with your pastor' },
                        { name: 'When Your World Collapses and God Is Still Sovereign', href: '/open-wound-sovereignty-in-grief', desc: 'Grief doesn' },
                        { name: 'Why Do Bad Things Happen? The Question That Haunts Every Hospital Room', href: '/open-wound-hospital-room', desc: 'The question everyone asks but no one wants the real answer to. Scripture' },
                        { name: 'Why You Can Sleep When Everything Is Falling Apart', href: '/anxious-mind-sovereignty-of-sleep', desc: 'Sovereignty is the pillow your head has been looking for. What insomnia reveals about what you actually believe about co' },
                        { name: 'You Are Not a Self-Made Anything', href: '/broken-mirror-not-self-made', desc: 'Culture screams' },
                        { name: 'You Were Never Meant to Carry This', href: '/anxious-mind-never-meant-to-carry', desc: 'You Were Never Meant to Carry This — why anxiety is the logical result of believing everything depends on you, and how G' },
                        { name: 'You Were Not an Accident — You Were Created for Mercy', href: '/broken-mirror-vessels-for-mercy', desc: 'You weren' },
                        { name: 'Your Brain Decides Before You Do — And That\'s Good News', href: '/anxious-mind-brain-decides', desc: 'Neuroscience shows your brain makes decisions before' }
                    ]
                },
                {
                    name: 'Pastoral',
                    icon: '🤝',
                    href: '/pastoral-assurance',
                    count: 6,
                    pages: [
                        { name: 'Can I Be Sure I\'m Saved? What Sovereign Grace Means for Assurance', href: '/pastoral-assurance', desc: 'You' },
                        { name: 'If God Already Chose, Why Share the Gospel?', href: '/pastoral-evangelism', desc: 'If God has already chosen who will be saved, why evangelize? Because your mouth is the very means God ordained to call H' },
                        { name: 'If God Decreed Everything, Why Pray?', href: '/pastoral-prayer', desc: 'If God has already decreed all things, why pray? Because prayer is not plan B — it is the very means God ordained to acc' },
                        { name: 'What It Feels Like When the Truth Lands', href: '/pastoral-when-truth-lands', desc: 'When the reality of sovereign grace first lands, the ground disappears. A pastoral map for the vertigo, anger, grief, te' },
                        { name: 'When Theology Meets Your Actual Life — Pastoral Guidance', href: '/pastoral-hub', desc: 'Assurance in doubt. Courage in evangelism. Power in prayer. Comfort in suffering. This is where the truth about grace st' },
                        { name: 'When You\'re Suffering and God Is Sovereign — How Both Can Be True', href: '/pastoral-suffering', desc: 'No pain is random. No tear is wasted. No trial escapes His decree. How God' }
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
                        { name: 'The Security That Changes Everything', href: '/joy-security-changes-everything', desc: 'Assurance of salvation is not arrogance—it is the only rational response to a salvation you didn' },
                        { name: 'The Staggering Contrast: What Two Theologies Actually Give You', href: '/joy-staggering-contrast', desc: 'A devastating side-by-side comparison of what Reformed theology and Arminian theology actually produce in the human hear' },
                        { name: 'Worship Without a Ceiling', href: '/joy-worship-without-ceiling', desc: 'When you see that every atom of your salvation is grace, your gratitude has no upper limit. Discover why sovereign grace' }
                    ]
                }
            ]
        }
    ];

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
            if (window.innerWidth < 969) {
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
        if (window.innerWidth >= 969 && navLinks && navLinks.classList.contains('open')) {
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
        if (window.innerWidth < 969) {
            closeMegaMenu();
        }
    });

    // === INITIALIZE MEGA-MENU AND MOBILE CATEGORIES ===
    function initMegaMenus() {
        buildMegaMenu();
        buildMobileCategories();
    }

    // Call on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMegaMenus);
    } else {
        // If script loads after DOM is ready
        initMegaMenus();
    }
})();
