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
            name: 'Start Here',
            icon: '🧭',
            href: '/start-here',
            desc: 'Your guided journey into sovereign grace',
            subs: [
                { name: '500+ Bible Verses That Prove God\'s Sovereignty in Salvation | Scripture Tsunami', href: '/scripture-tsunami', desc: 'They told you' },
                { name: 'But What About Free Will and Fairness? — Phase 4', href: '/start-here-phase4', desc: 'Phase 4: The hardest objections to biblical theology answered — free will, fairness, John 3:16,' },
                { name: 'Find Your Starting Point', href: '/start-here-assessment', desc: 'Discover your starting point on the 5-phase journey to understanding God' },
                { name: 'Living as an Elect Child of God — Phase 5', href: '/start-here-phase5', desc: 'Phase 5: Living as an elect child of God — how sovereign grace transforms your assurance, prayer, worship, mission, and ' },
                { name: 'Start Here — Your Journey into Sovereign Grace', href: '/start-here', desc: 'New to biblical theology? A guided 5-phase journey from curiosity to conviction about salvation, grace, and God' },
                { name: 'The Five Points of Grace — Phase 2', href: '/start-here-phase2', desc: 'The five biblical doctrines of grace explained: Total Depravity, Unconditional Election, Definite Atonement, Irresistibl' },
                { name: 'What Does the Bible Actually Teach? — Phase 3', href: '/start-here-phase3', desc: 'Phase 3: What does the Bible actually teach about salvation? A passage-by-passage journey through Romans 9, Ephesians 1,' },
                { name: 'What Is Reformed Theology? — Phase 1', href: '/start-here-phase1', desc: 'Phase 1: What is biblical theology? An honest, accessible introduction to what Reformed Christians believe about God, sa' }
            ]
        },
        {
            name: 'Questions',
            icon: '📖',
            href: '/questions',
            desc: 'Scripture-driven proofs for sovereign grace',
            subs: [
                { name: 'Can God Create a Universe Where He Isn\'t Sovereign?', href: '/question-sovereignty-logic', desc: 'Can God make a rock too heavy for Him to lift? Can He create a universe He doesn' },
                { name: 'Chosen Before the Foundation of the World – Ephesians 1:3-11', href: '/question-chosen', desc: 'Ephesians 1:3-11 examined in depth. God chose us in Christ before the foundation of the world. Greek analysis, arguments' },
                { name: 'Dead Bones Don\'t Volunteer — Ezekiel 37', href: '/question-ezekiel37', desc: 'Ezekiel 37' },
                { name: 'Dead, Not Sick — The Bible\'s Diagnosis of the Human Condition', href: '/question-depravity', desc: 'Total depravity is not about being as bad as possible — it' },
                { name: 'Doesn\'t God Want Everyone Saved? – 1 Timothy 2:4', href: '/question-godwants', desc: 'Does God want everyone saved? 1 Timothy 2:4 and the two wills of God — His revealed will and His sovereign decree.' },
                { name: 'Drawn, Not Dragged — The Unstoppable Grace of Effectual Calling', href: '/question-irresistible', desc: 'Irresistible grace is liberation, not coercion. God transforms wills; He doesn' },
                { name: 'Elect Exiles According to the Foreknowledge of God – 1 Peter 1:1-2', href: '/question-1peter1', desc: 'A rigorous exegetical examination of 1 Peter 1:1-2 and the doctrine of unconditional election. Demolishes the Arminian c' },
                { name: 'Eternal Security: Can a Believer Lose Salvation?', href: '/question-secure', desc: 'Eternal Security: Can a Believer Lose Salvation? Scripture teaches that those whom God saves are kept safe by His power.' },
                { name: 'External and Internal Calling: What\'s the Difference?', href: '/question-external-internal-call', desc: 'External and Internal Calling: What' },
                { name: 'Faith: Gift or Achievement? – Philippians 1:29 & Ephesians 2:8-9', href: '/question-faithgift', desc: 'Is faith a human achievement or a divine gift? Philippians 1:29 and Ephesians 2:8-9 answer definitively: faith is grante' },
                { name: 'Free Will: The Doctrine the Bible Never Actually Teaches – Ephesians 2:1-5, Romans 8:7-8', href: '/question-freewill', desc: 'You' },
                { name: 'God\'s Hardening: Does God Make People Sin?', href: '/question-hardening', desc: 'God' },
                { name: 'Is God Unfair? – Romans 9:19-23', href: '/question-unfair', desc: 'Is God unfair? Romans 9:19-23 — Paul confronts the moral objection to election head-on and does not soften the answer.' },
                { name: 'Isaiah 53: The Servant Who Bore the Sins of Many', href: '/question-isaiah53', desc: 'Deep exegesis of Isaiah 53 — the Suffering Servant bore the sins of MANY, not all. Hebrew word studies, the will of the ' },
                { name: 'Jacob, Esau, and the Chapter That Changes Everything – Romans 9:6-24', href: '/question-romans9', desc: 'Romans 9 is the most direct chapter on election in the Bible. Jacob and Esau, Pharaoh, the potter and the clay — examine' },
                { name: 'Kept by God — The Perseverance of the Saints', href: '/question-perseverance', desc: 'Perseverance of the saints: not human effort, but divine commitment. Those God saves, He keeps. John 10:28-29, Romans 8:' },
                { name: 'Known Before You Were Known — Psalm 139 and the God Who Wrote Your Story Before It Began', href: '/question-psalm139', desc: 'Psalm 139 reveals that God knew you, formed you, and wrote every day of your life before you existed. Your story was aut' },
                { name: 'Names Written Before the Foundation of the World – Revelation 13:8 & 17:8', href: '/question-revelation13', desc: 'Revelation 13:8 and 17:8 show that names were written in the Book of Life before the foundation of the world — devastati' },
                { name: 'No Dice, No Chance — God\'s Sovereignty over Lots and Kings', href: '/question-proverbs-sovereignty', desc: 'Proverbs 16:33 and 21:1 prove God controls every roll of the dice and every ruler' },
                { name: 'No One Can Come to Me Unless the Father Draws Him – John 6:37-44,65', href: '/question-john6', desc: 'John 6:44:' },
                { name: 'Not Because of Our Works — 2 Timothy 1:9', href: '/question-2tim1-9', desc: 'A deep dive into 2 Timothy 1:9:' },
                { name: 'Not Because of Works Done by Us — Titus 3:3-7', href: '/question-titus3', desc: 'Titus 3:3-7 examined: God saved us not because of works done by us in righteousness, but according to his own mercy. Gre' },
                { name: 'Sealed for the Day of Redemption – Ephesians 4:30', href: '/question-sealed', desc: 'Ephesians 4:30 proves once saved always saved. You are sealed by the Holy Spirit for the day of redemption — not until y' },
                { name: 'Thank You, Father, for Hiding This – Matthew 11:25-27', href: '/question-matt11', desc: 'Matthew 11:25-27 — Jesus thanks the Father for hiding truth from the wise and revealing it to babes. Revelation is selec' },
                { name: 'The Boasting Problem That Destroys Free Will – 1 Corinthians 1:26-31', href: '/question-boasting', desc: '1 Corinthians 1:26-31 — God chose the foolish to shame the wise. His election strategy is designed to eliminate all huma' },
                { name: 'The CANNOT Page: Scripture\'s Testimony to Human Inability', href: '/question-cannot', desc: 'Scripture' },
                { name: 'The Cross Was Predestined — Acts 4:27-28 and the Sovereignty Behind Calvary', href: '/question-acts4', desc: 'The most evil act in history — the murder of God' },
                { name: 'The External Call vs The Effectual Call', href: '/question-external-call', desc: 'The External Call vs The Effectual Call: Scripture teaches that God calls all people to salvation, but only the elect tr' },
                { name: 'The New Heart You Didn\'t Ask For – Ezekiel 36:26-27', href: '/question-newheart', desc: 'Ezekiel 36:26-27 — God promises a new heart and a new spirit. He does not ask permission. He removes the heart of stone ' },
                { name: 'The Prayer That Proves Election — John 17', href: '/question-john17', desc: 'Explore Jesus' },
                { name: 'The Unbreakable Chain: Foreknown, Predestined, Called, Justified, Glorified – Romans 8:28-30', href: '/question-goldchain', desc: 'Romans 8:28-30 — foreknown, predestined, called, justified, glorified. An unbreakable chain where every link is divine a' },
                { name: 'The Verse in Acts That Nobody Preaches – Acts 13:48', href: '/question-acts', desc: 'Acts 13:48 unpacked:' },
                { name: 'The Verse That Settles the Order — 1 John 5:1', href: '/question-1john5-1', desc: 'The Greek perfect tense in 1 John 5:1 proves regeneration precedes faith. Deep exegesis with Greek word study, seven arg' },
                { name: 'What About \'Whosoever Will\'? – John 3:16 & 2 Peter 3:9', href: '/question-whosoever', desc: 'What About \'Whosoever Will\'? – John 3:16 & 2 Peter 3:9' },
                { name: 'What About Predestination Based on Foreknowledge? – Romans 8:29', href: '/question-foreknowledge', desc: 'Does foreknowledge mean foresight of faith? Romans 8:29 examined. Greek proginōskō means to choose beforehand, not merel' },
                { name: 'What Did Jesus Mean by \'Let the Dead Bury the Dead\'?', href: '/question-dead-bury-dead', desc: 'When Jesus said' },
                { name: 'Why Does Grace Feel Like a Choice?', href: '/question-how-grace-feels', desc: 'When you come to faith, it feels like you chose God. When a pastor preaches, he speaks as if choice matters. How does th' },
                { name: 'Why Jesus Spoke in Parables — Matthew 13:10-17', href: '/question-parables', desc: 'Why did Jesus speak in parables? Not to make truth clearer — but to conceal it from some while revealing it to others. M' },
                { name: 'You Did Not Choose Me, But I Chose You – John 15:16', href: '/question-john15', desc: 'John 15:16:' },
                { name: 'You Do Not Believe Because You Are Not My Sheep – John 10:26-29', href: '/question-john10', desc: 'John 10:26-29:' }
            ]
        },
        {
            name: 'Theology',
            icon: '🏛',
            href: '/systematic-theology',
            desc: 'Complete systematic framework',
            subs: [
                { name: 'Before the Foundation of the World — God\'s Eternal Decrees', href: '/systematic-divine-decrees', desc: 'God' },
                { name: 'Compatibilism', href: '/systematic-compatibilism', desc: 'Compatibilism: God' },
                { name: 'Divine Election — Chosen Before the Foundation of the World', href: '/systematic-election', desc: 'Systematic Theology: Divine Election. Scripture teaches that God chose His people before the foundation of the world—not' },
                { name: 'Ecclesiology: The Bride of Christ', href: '/systematic-ecclesiology', desc: 'Systematic Theology: Ecclesiology. The doctrine of the church as the Bride of Christ, the assembly of the elect called o' },
                { name: 'Justification by Faith Alone', href: '/systematic-justification', desc: 'Justification by Faith Alone: How God declares sinners righteous through the imputed righteousness of Christ, received b' },
                { name: 'One God, Three Persons — The Trinity in Scripture and Salvation', href: '/systematic-trinity', desc: 'The Trinity: one God in three persons. Scripture teaches the Father elects, the Son redeems, the Spirit applies. The fou' },
                { name: 'One Plan, One People, One Mediator — Covenant Theology', href: '/systematic-covenant-theology', desc: 'Covenant Theology: God' },
                { name: 'Prolegomena — Scripture & Authority', href: '/systematic-prolegomena', desc: 'Systematic Theology: Prolegomena — The authority, inspiration, and sufficiency of Scripture as the foundation of all Chr' },
                { name: 'Regeneration — Born Again by the Power of God', href: '/systematic-regeneration', desc: 'Systematic Theology: Regeneration (The New Birth). Scripture teaches that God causes us to be born again—that regenerati' },
                { name: 'Systematic Soteriology — The Doctrine of Salvation', href: '/systematic-soteriology', desc: 'Systematic Soteriology: The Doctrine of Salvation. From election through glorification, Scripture' },
                { name: 'Systematic Theology: Hamartiology — The Doctrine of Sin', href: '/systematic-hamartiology', desc: 'Systematic Theology: Hamartiology — The doctrine of sin. Understanding the nature, origin, and consequences of sin, and ' },
                { name: 'Systematic Theology: Pneumatology', href: '/systematic-pneumatology', desc: 'Systematic Theology: Pneumatology - The Holy Spirit' },
                { name: 'Systematic Theology: The Glory of Christ', href: '/systematic-christology', desc: 'Systematic Theology: Christology - The Person and Work of Christ. An in-depth exploration of Jesus Christ' },
                { name: 'The Atonement: What Christ\'s Death Accomplished', href: '/systematic-atonement', desc: 'What did Christ' },
                { name: 'The Doctrine of Salvation — Gateway to Soteriology', href: '/systematic-salvation', desc: 'The Doctrine of Salvation: A gateway to understanding soteriology. Explore election, regeneration, atonement, justificat' },
                { name: 'The Doctrine of Scripture — God\'s Authoritative Word', href: '/systematic-bibliology', desc: 'The Doctrine of Scripture: Inerrancy, sufficiency, authority. 2 Timothy 3:16-17, 2 Peter 1:20-21. Why Sola Scriptura mat' },
                { name: 'The Ordo Salutis: The Order of Salvation', href: '/systematic-ordo-salutis', desc: 'The Ordo Salutis: God' },
                { name: 'The Resurrection — The Foundation of All Hope', href: '/systematic-resurrection', desc: 'The Resurrection: Christ' },
                { name: 'Theological Anthropology: Created, Fallen, Redeemed', href: '/systematic-anthropology', desc: 'Systematic theology on anthropology—the doctrine of man. Explore what it means to be created in God' },
                { name: 'Theology Proper: The God Who Is There', href: '/systematic-theology-proper', desc: 'Theology Proper: Exploring God' }
            ]
        },
        {
            name: 'Objections Answered',
            icon: '🛡',
            href: '/questions',
            desc: 'Steel-manned and demolished — every hard question',
            subs: [
                { name: 'How Can a Loving God Choose Some and Not Others?', href: '/objection-love', desc: 'If God is love, why doesn' },
                { name: 'If Everything Is Predetermined, Why Even Try?', href: '/objection-effort', desc: 'If God already predetermined everything, why bother trying? Because your effort isn' },
                { name: 'If God Already Chose Us, Why Do We Have to Believe?', href: '/objection-why-believe', desc: 'A letter to the sincere Christian who just discovered election and wonders if faith is meaningless. Exploring how God' },
                { name: 'If God Already Chose Who Will Be Saved, Why Evangelize?', href: '/objection-evangelism-pointless', desc: 'If God already chose who will be saved, why evangelize? Because God ordains the means as well as the ends. Election does' },
                { name: 'If God Controls Everything, How Can He Blame Us?', href: '/objection-responsibility', desc: 'If God predetermines everything, how can He hold us responsible? Romans 9:19 answered with Scripture, compatibilism, and' },
                { name: 'If God Could Save Everyone, Why Doesn\'t He?', href: '/objection-god-could-save-all', desc: 'The hardest question in Reformed theology. If God can irresistibly save, why doesn' },
                { name: 'If God Predestined Everything, Are We Just Robots?', href: '/objection-robots', desc: 'If God predestined everything, are we just robots? No. Scripture teaches something far more beautiful: we are free creat' },
                { name: 'If God Predestined Everything, Why Does He Command Us?', href: '/objection-why-command', desc: 'If God predestined everything, why pray? Why obey? The answer reveals why commands aren' },
                { name: 'Is God the Author of Sin? The Predestination Problem Answered', href: '/objection-author-of-sin', desc: 'Does God cause sin? If He predestines everything, how is He not responsible for evil? Scripture teaches a clear distinct' },
                { name: 'Is Predestination Fair?', href: '/objection-fairness', desc: 'Is predestination fair? Doesn' }
            ]
        },
        {
            name: 'Demolition Zone',
            icon: '💥',
            href: '/demolition-hub',
            desc: 'Arminian proof-texts dismantled verse by verse',
            subs: [
                { name: '1 Corinthians 15:22 — Verse Demolition #4', href: '/demolition-1cor15-22', desc: 'Demolition #4: 1 Corinthians 15:22 proves particular redemption, not universal atonement. The parallel is representation' },
                { name: '1 John 2:2 — Verse Demolition #7', href: '/demolition-1john2-2', desc: '1 John 2:2 — Does' },
                { name: '1 Timothy 2:4 — Verse Demolition #2', href: '/demolition-1tim2-4', desc: 'Demolition #2: Does God Desire the Salvation of Every Individual? A Reformed analysis of 1 Timothy 2:4 that dismantles A' },
                { name: '1 Timothy 4:10 — Verse Demolition #12', href: '/demolition-1tim4-10', desc: 'Demolition #12: Does 1 Timothy 4:10 Prove Universal Atonement? A Reformed analysis that reveals how' },
                { name: '2 Corinthians 5:14-15 — Verse Demolition #6', href: '/demolition-2cor5-14-15', desc: 'Demolition #6: 2 Corinthians 5:14-15 —' },
                { name: '2 Peter 2:1 — Verse Demolition #11', href: '/demolition-2peter2-1', desc: '2 Peter 2:1 — Does' },
                { name: 'Acts 17:30 — Verse Demolition #7', href: '/demolition-acts17-30', desc: 'Demolition #7: Acts 17:30 —' },
                { name: 'Acts 7:51 — Verse Demolition #6', href: '/demolition-acts7-51', desc: 'Demolition #6: Does Acts 7:51 Prove that Grace Can Be Resisted? A Reformed exegesis of Stephen' },
                { name: 'Demolition Zone: Arianism and the Deity of Christ', href: '/demolition-arianism', desc: 'Arius and his teaching. Council of Nicaea. Athanasius contra mundum. Why Christ' },
                { name: 'Demolition: 2 Peter 3:9 — Does God\'s Patience Prove Universal Salvation?', href: '/demolition-2peter3-9', desc: '2 Peter 3:9 examined:' },
                { name: 'Demolition: John 12:32 — "I Will Draw ALL People"', href: '/demolition-john12-32', desc: 'Exegetical demolition of the Arminian proof text John 12:32. The Greek text, context, and cross-references reveal' },
                { name: 'Demolition: John 3:16 — Does "The World" Mean Every Individual?', href: '/demolition-john3-16', desc: 'John 3:16 examined:' },
                { name: 'Demolition: Matthew 23:37 — Jesus\'s Lament Over Jerusalem', href: '/demolition-matt23-37', desc: 'Matthew 23:37 demolition: Jesus' },
                { name: 'Demolition: Revelation 3:20 — \'I Stand at the Door and Knock\'', href: '/demolition-rev3-20', desc: 'Revelation 3:20 examined:' },
                { name: 'Demolition: Romans 10:9-10 — "If You Confess... You Will Be Saved"', href: '/demolition-romans10-9', desc: 'Romans 10:9-10 — Does' },
                { name: 'Demolition: The Prevenient Grace Reckoning', href: '/demolition-prevenient-grace', desc: 'The Prevenient Grace Reckoning: A comprehensive demolition of Arminian prevenient grace doctrine. Scripture teaches that' },
                { name: 'Did C.S. Lewis Refute Calvinism? — What They Won\'t Tell You', href: '/counter-cs-lewis-free-will', desc: 'Did C.S. Lewis refute Calvinism? A careful examination of how anti-Reformed writers misuse Lewis' },
                { name: 'Does God Take Pleasure in Death? — Ezekiel 18:23 Explained', href: '/demolition-ezekiel18-23', desc: 'Exegetical demolition of the Arminian misuse of Ezekiel 18:23,32. Explores the two wills of God, covenantal context, and' },
                { name: 'FACTS Check: Dismantling the Arminian Framework Point by Point', href: '/demolition-arminian-facts', desc: 'Seminary-level exegetical analysis dismantling the Society of Evangelical Arminians' },
                { name: 'Hebrews 2:9 — Verse Demolition #5', href: '/demolition-hebrews2-9', desc: 'Demolition #5: Hebrews 2:9 —' },
                { name: 'Hebrews 6:4-6 — Verse Demolition #10', href: '/demolition-hebrews6-4-6', desc: 'Demolition #10: Hebrews 6:4-6 — The' },
                { name: 'Joshua 24:15 — Verse-by-Verse Demolition', href: '/demolition-joshua24-15', desc: 'Verse-by-verse exegetical demolition of the Arminian use of Joshua 24:15 as proof of libertarian free will. Scripture te' },
                { name: 'Philippians 2:12-13 — Verse Demolition #3', href: '/demolition-philippians2-12-13', desc: 'Demolition #3: Philippians 2:12-13 proves monergistic grace, not human autonomy. God works in you to both will and work.' },
                { name: 'Steel Man: Arminianism at Its Absolute Best', href: '/demolition-steel-man-arminianism', desc: 'We present Arminianism using its strongest scholars and best arguments—then show why Scripture points to something deepe' },
                { name: 'Titus 2:11 — "The Grace of God Has Appeared to All"', href: '/demolition-titus2-11', desc: 'Demolition #17: Titus 2:11 and the' },
                { name: 'When Philosophy Replaces Exegesis — Dismantling the Orthodox Case Against Predestination', href: '/demolition-orthodox-predestination', desc: 'A thorough exegetical dismantling of the Eastern Orthodox argument against Reformed predestination — exposing the geneti' }
            ]
        },
        {
            name: 'Apologetics',
            icon: '⚔',
            href: '/apologetic-evangelism',
            desc: 'Defending and commending the faith',
            subs: [
                { name: 'Can You Lose Your Salvation?', href: '/apologetic-perseverance', desc: 'Can you lose your salvation? Scripture' },
                { name: 'Did Jesus Die for Everyone? Scripture on Definite Atonement', href: '/apologetic-definite-atonement', desc: 'Did Jesus die for everyone? Scripture teaches that Christ' },
                { name: 'Doesn\'t Election Make Evangelism Pointless?', href: '/apologetic-evangelism', desc: 'Does election make evangelism pointless? No—it' },
                { name: 'The Great Debate: Does Man Have Free Will?', href: '/debate-free-will', desc: 'A rigorous formal debate: Does man have free will? Two positions argue their strongest cases—libertarian free will vs. b' },
                { name: 'What About Babies Who Die? — Grace, Covenant, and the Littlest Lambs', href: '/apologetic-babies', desc: 'What happens to babies and children who die? Scripture gives the grieving parent a sovereign, rock-solid hope that no fr' },
                { name: 'What About Those Who Never Heard the Gospel?', href: '/apologetic-unreached', desc: 'What about the billions who never heard the gospel? Scripture reveals God' }
            ]
        },
        {
            name: 'Why We Resist',
            icon: '🧠',
            href: '/psychology-hub',
            desc: 'The psychology of suppressing truth',
            subs: [
                { name: 'Cognitive Biases and the Blindness of Sin', href: '/psychology-cognitive-biases', desc: 'Cognitive biases mapped to biblical descriptions of fallen thinking. Confirmation bias, anchoring, Dunning-Kruger — mode' },
                { name: 'Fear of Losing Control: Why God\'s Sovereignty Terrifies Us', href: '/psychology-fear-control', desc: 'Why does God' },
                { name: 'Pride: The Root of Every Objection to God\'s Sovereignty', href: '/psychology-pride-root-objection', desc: 'Why do the doctrines of grace provoke such fury? Psychology reveals the answer: pride. Every objection to God' },
                { name: 'Suppressing the Truth', href: '/psychology-suppressing-truth', desc: 'Romans 1:18 reveals the deepest human problem: we suppress what we already know about God. Modern psychology calls it mo' },
                { name: 'Terror Management and the Threat of Sovereignty', href: '/psychology-terror-management', desc: 'Terror Management Theory explains why God' },
                { name: 'The Autonomy Illusion: Why "Free Will" Feels So Real', href: '/psychology-autonomy-illusion', desc: 'Neuroscience reveals that our sense of autonomous choice may be the brain' },
                { name: 'The Comfort of Believing You Saved Yourself', href: '/psychology-comfort-self-salvation', desc: 'Why does the idea that you chose God feel so right? Psychology reveals it' },
                { name: 'The Last Idol: Why Self-Sovereignty Is the Hardest Thing to Surrender', href: '/resistance-last-idol', desc: 'Why self-sovereignty is the last idol to fall — even for believers. A deep psychological and theological exploration of ' },
                { name: 'The Offense of Grace', href: '/psychology-offense-of-grace', desc: 'Why does unconditional election trigger moral outrage? Moral Foundations Theory, psychological reactance, and System Jus' },
                { name: 'When Your Heart Rejects What Your Mind Accepts', href: '/psychology-emotional-vs-rational', desc: 'When your head knows sovereignty is biblical but your heart rejects it. Dual-process theory, affect heuristic, and Haidt' },
                { name: 'Where Did Your Faith Come From? The Question That Changes Everything', href: '/psychology-cost-of-rejecting-grace', desc: 'You love Jesus. You give God the glory. But have you ever asked where your faith came from? Follow one simple question t' },
                { name: 'Why the Truth That Makes You Angriest Is the One That Will Set You Free', href: '/psychology-hostility-reaction', desc: 'When a lifelong Christian suddenly becomes enraged at the doctrines of grace, something deeper than theology is happenin' },
                { name: 'Why We Resist: The Psychology of Rejecting God\'s Sovereignty', href: '/psychology-why-we-resist', desc: 'Why do smart, Bible-loving Christians reject what the Bible clearly says about God' }
            ]
        },
        {
            name: 'Devotionals',
            icon: '🕯',
            href: '/devotionals',
            desc: 'Where doctrine becomes worship',
            subs: [
                { name: 'A Letter to the Cold Church', href: '/devotional-cold-church', desc: 'A warm, pastoral devotional on Revelation 3:14-22 and spiritual lukewarmness. How sovereign grace melts cold hearts.' },
                { name: 'Adoption Papers', href: '/devotional-adoption-papers', desc: 'Adoption Papers: A meditative reflection on being chosen and adopted as God' },
                { name: 'Forever Loved', href: '/devotional-forever-loved', desc: 'Forever Loved: A meditative reflection on God' },
                { name: 'He Will Never Give Up On You', href: '/devotional-never-gives-up', desc: 'What if the God of the universe decided to love you before you were born — and nothing you could ever do could make Him ' },
                { name: 'In Christ: The Two Words That Change Everything', href: '/devotional-in-christ', desc: 'A devotional meditation on union with Christ — the two most powerful words in Scripture. Every spiritual blessing flows ' },
                { name: 'Love Before the World Was Made', href: '/devotional-love-before-the-world', desc: 'A meditative devotion on God' },
                { name: 'My Chains Fell Away', href: '/devotional-my-chains-fell-away', desc: 'What does it feel like when God breaks your chains? A devotional on the moment grace becomes irresistible — when the sou' },
                { name: 'Not My Will, But Joy – Devotional', href: '/devotional-not-my-will-but-joy', desc: 'A meditative reflection on divine sovereignty and joyful surrender. Discover how yielding to God' },
                { name: 'Rescued Without a Say – Devotional', href: '/devotional-rescued-without-a-say', desc: 'A meditative reflection on Irresistible Grace and the sovereign work of God in salvation. Discover how grace comes not a' },
                { name: 'The Dead Who Live — What Does It Mean to Be Spiritually Dead?', href: '/devotional-dead-who-live', desc: 'Ephesians 2:1 says you were dead — not struggling, not searching, dead. This devotional explores what spiritual death re' },
                { name: 'The Glory of Divine Choice', href: '/devotional-glory-of-divine-choice', desc: 'A meditative devotion on election and divine choice—the glory of being chosen before the foundation of the world.' },
                { name: 'The Good That I Cannot Do', href: '/devotional-good-i-cannot-do', desc: 'You have tried to be good. You know what happened. A devotional on Romans 7, human inability, and why' },
                { name: 'The Love Letter Dated Before Time', href: '/devotional-love-letter-before-time', desc: 'What if you found a letter written to you before you were born — before the world was born? Ephesians 1:3-14 as God' },
                { name: 'The Weakness of God\'s Strength', href: '/devotional-weakness-of-gods-strength', desc: 'A meditative reflection on divine sovereignty in suffering. Explore how God' },
                { name: 'Valley of the Shadow', href: '/devotional-valley-shadow', desc: 'Psalm 23 doesn' },
                { name: 'When God Says No — A Devotional on Unanswered Prayer', href: '/devotional-when-god-says-no', desc: 'Sometimes God says no. And His refusal is more loving than our yes would have been. A devotional meditation on unanswere' }
            ]
        },
        {
            name: 'Stories',
            icon: '📜',
            href: '/stories',
            desc: 'Original parables and narratives',
            subs: [
                { name: 'Can a Stone Heart Choose? The Surgeon\'s Parable on Regeneration', href: '/story-surgeon-stone-heart', desc: 'Can a stone heart choose? A surgeon gives a new heart without asking. A parable about regeneration and why dead hearts n' },
                { name: 'Did You Choose God or Did God Choose You?', href: '/story-the-fish-who-chose-the-ocean', desc: 'Did you really choose God? A fable about the fish who chose the ocean and why God' },
                { name: 'Did You Really Choose God? — A Story About the Illusion of Free Will', href: '/story-the-room-where-you-chose', desc: 'Follow a golden thread back through time to discover the origin of your most important choice. A story about free will, ' },
                { name: 'The Dead City - Dead People Can\'t Choose', href: '/story-the-dead-city', desc: 'Why dead people can' },
                { name: 'The Garden That Grew Itself — A Children\'s Story', href: '/story-the-garden-that-grew-itself', desc: 'A children' },
                { name: 'The King\'s Banquet — What Is Irresistible Grace?', href: '/story-the-kings-banquet', desc: 'What is irresistible grace? The King' },
                { name: 'The Letter Before the World — A Story of Election as God\'s Most Intimate Love', href: '/story-the-letter-before-the-world', desc: 'She found a letter her father wrote before she was born — before he even knew he would adopt her. A tender story about b' },
                { name: 'The Orphanage - What is Election in the Bible?', href: '/story-the-orphanage', desc: 'What is election in the Bible? Every child chose their family - until adoption papers dated before birth were found.' },
                { name: 'The Self-Made Man - Why Self-Salvation is an Illusion', href: '/story-the-self-made-man', desc: 'The self-made man who took credit for everything he didn' }
            ]
        },
        {
            name: 'Secular Evidence',
            icon: '🔬',
            href: '/secular-evidence',
            desc: 'Even the world confirms it',
            subs: [
                { name: 'Art & Literature — How the Greatest Writers Intuited Reformed Truth', href: '/secular-art-literature-reformed-truth', desc: 'Shakespeare, Dostoevsky, Flannery O' },
                { name: 'Sociology & Human Inability — Every Experiment Confirms Depravity', href: '/secular-sociology-human-inability', desc: 'The Milgram experiment, Stanford Prison Study, mob psychology, and groupthink research all confirm what Scripture teache' },
                { name: 'The Algorithm Knows You Better Than You Know Yourself', href: '/secular-algorithm-sovereignty', desc: 'Netflix knows what you' },
                { name: 'The Billion Decisions You Didn\'t Make Today', href: '/secular-billion-decisions', desc: 'Your body made billions of sovereign decisions today without asking your permission. Your heart beat. Your cells divided' },
                { name: 'The Economics of Depravity — How Markets Prove Total Depravity', href: '/secular-economics-depravity', desc: 'Economics has always assumed what Scripture teaches: humans are self-interested, short-sighted, and prone to exploitatio' },
                { name: 'The History of Sovereignty — When Secular Historians Document Divine Control', href: '/secular-history-sovereignty', desc: 'Secular historians have documented patterns they cannot explain: the rise and fall of empires, the convergence of imposs' },
                { name: 'The Neuroscience of Inability — Your Brain Decided Before You Did', href: '/secular-neuroscience-human-inability', desc: 'Neuroscience reveals that conscious' },
                { name: 'The Philosophy of the Unfree Will — Secular Confirmation of Reformed Compatibilism', href: '/secular-philosophy-free-will', desc: 'Secular philosophy' },
                { name: 'The Psychology of Bondage — Secular Science Proves Total Depravity', href: '/secular-psychology-bondage-of-will', desc: 'Modern psychology confirms what the Reformers taught 500 years ago: the human will is in bondage. Cognitive bias, addict' }
            ]
        },
        {
            name: 'History',
            icon: '⏳',
            href: '/history-timeline',
            desc: '2,000 years of sovereign grace proclaimed',
            subs: [
                { name: '20th Century Reformed Resurgence', href: '/history-20th-century', desc: 'The liberal decline, the Reformed comeback, and sovereign grace rediscovered. J. Gresham Machen, Martyn Lloyd-Jones, R.C' },
                { name: 'Augustine vs Pelagius: The First Great Battle for Grace', href: '/history-augustine-pelagius', desc: 'The theological clash that shaped Christianity: Augustine' },
                { name: 'John Calvin and Geneva', href: '/history-calvin-geneva', desc: 'John Calvin and Geneva: The Institutes of the Christian Religion, Geneva as a city on a hill, TULIP crystallized, and Ca' },
                { name: 'Martin Luther and the Reformation (1517+)', href: '/history-luther', desc: 'Martin Luther and the Reformation: the 95 Theses, The Bondage of the Will, Sola Fide, Sola Gratia, and the rediscovery o' },
                { name: 'Medieval Theology and the Seeds of Reform (300-1400 AD)', href: '/history-medieval', desc: 'Medieval theology: Augustine vs Pelagius, Semi-Pelagianism' },
                { name: 'The Apostolic Fathers and Early Church (100-300 AD)', href: '/history-apostolic', desc: 'The Apostolic Fathers (100-300 AD) on grace, election, and God' },
                { name: 'The Doctrines of Grace Today', href: '/history-today', desc: 'Where sovereign grace stands now. Global spread of Reformed theology. Africa, Asia, Latin America. The digital reformati' },
                { name: 'The Golden Thread — 2,000 Years of Sovereign Grace', href: '/history-golden-thread', desc: 'The Golden Thread: how God preserved the doctrines of grace through 2,000 years of church history — from Paul to Augusti' },
                { name: 'The Great Awakening: Sovereign Grace Sets a Continent on Fire', href: '/history-great-awakening', desc: 'The story of Jonathan Edwards and George Whitefield: how Calvinism ignited the Great Awakening and proved that sovereign' },
                { name: 'The Prince Who Would Not Bow: Spurgeon & the Downgrade Controversy', href: '/history-spurgeon-downgrade', desc: 'Charles Spurgeon' },
                { name: 'The Puritans and Reformed Orthodoxy', href: '/history-puritans', desc: 'Explore the golden age of Reformed theology. The Puritans' },
                { name: 'The Synod of Dort (1618-1619) — TULIP Forged in Fire', href: '/history-dort', desc: 'Discover how the Synod of Dort crystallized the Five Points of Calvinism in response to Arminianism. The moment when the' },
                { name: 'Written in Blood and Fire — The Story of the Reformed Confessions', href: '/history-confessions-story', desc: 'The dramatic stories behind the Reformed confessions: how martyrs, assemblies, and pastors forged the Heidelberg Catechi' }
            ]
        },
        {
            name: 'Theologians',
            icon: '🧓',
            href: '/theologians',
            desc: 'The giants who came before',
            subs: [
                { name: 'Augustine of Hippo | The Doctor of Grace', href: '/theologian-augustine', desc: 'Explore the life, theology, and enduring legacy of Augustine of Hippo—the Doctor of Grace whose writings on predestinati' },
                { name: 'Charles Haddon Spurgeon', href: '/theologian-spurgeon', desc: 'Charles Haddon Spurgeon — the Prince of Preachers. Explore the life, theology, and enduring legacy of the greatest preac' },
                { name: 'George Whitefield | Theologian', href: '/theologian-whitefield', desc: 'George Whitefield: the greatest evangelist of the Great Awakening, a thoroughgoing Calvinist who proved that election fu' },
                { name: 'Jacobus Arminius: The Man Behind the Movement', href: '/theologian-arminius', desc: 'A respectful but honest treatment of Jacobus Arminius. His background, training under Beza, the five Remonstrant article' },
                { name: 'John Bunyan', href: '/theologian-bunyan', desc: 'The Tinker of Bedford: John Bunyan' },
                { name: 'John Calvin: Theologian of God\'s Sovereignty', href: '/theologian-calvin', desc: 'A comprehensive theological biography of John Calvin, the theologian of God' },
                { name: 'John Owen — The Theologian\'s Theologian', href: '/theologian-owen', desc: 'John Owen (1616–1683) — the theologian' },
                { name: 'Jonathan Edwards', href: '/theologian-edwards', desc: 'Jonathan Edwards: America' },
                { name: 'Martin Luther', href: '/theologian-luther', desc: 'Martin Luther (1483–1546): The Reformation' },
                { name: 'Thomas Boston', href: '/theologian-boston', desc: 'The life and theology of Thomas Boston (1676–1732), the Marrow theologian who fought for free grace against legalism in ' }
            ]
        },
        {
            name: 'Analogies',
            icon: '💡',
            href: '/analogies-illustrations',
            desc: 'Pictures that make deep truths click',
            subs: [
                { name: 'Can a Spiritually Dead Person Choose God? Why Salvation Must Be God\'s Work Alone', href: '/analogy-doctor-corpse', desc: 'Why can' },
                { name: 'Can You Choose to Believe? The Light Switch & Spiritual Blindness', href: '/analogy-light-switch', desc: 'Can you choose to believe on your own? Explore why your ability to have faith is a gift from God, not something you gene' },
                { name: 'Did Lazarus Choose to Rise? God\'s Sovereign Calling Explained', href: '/analogy-lazarus-grave', desc: 'Does God force salvation or respect free will? John 11 shows how effectual calling works through Lazarus' },
                { name: 'Did You Choose God or Did God Choose You? The Adoption Analogy', href: '/analogy-adoption', desc: 'A baby doesn' },
                { name: 'Does God Control Everything? The Chess Grandmaster Analogy', href: '/analogy-chess-grandmaster', desc: 'Does God control everything? The chess grandmaster analogy explains how divine sovereignty and human choice coexist with' }
            ]
        },
        {
            name: 'Old Testament',
            icon: '📚',
            href: '/ot-election',
            desc: 'Sovereign election in every OT figure',
            subs: [
                { name: 'Abel and Cain: The First Election', href: '/ot-abel-cain', desc: 'Genesis 4 reveals God' },
                { name: 'Abraham & Election', href: '/ot-abraham', desc: 'God' },
                { name: 'David: God\'s Sovereign Election for Kingship', href: '/ot-david', desc: 'God' },
                { name: 'Isaiah: The Servant &amp; God\'s Immutable Counsel', href: '/ot-isaiah-servant', desc: 'Isaiah reveals God' },
                { name: 'Israel: God\'s Chosen Nation', href: '/ot-israel-chosen', desc: 'A comprehensive biblical study of Israel' },
                { name: 'Jacob Over Esau: God\'s Sovereign Election Before Birth', href: '/ot-jacob-esau', desc: 'Jacob and Esau: God' },
                { name: 'Jeremiah: Called Before Formation — "Before I Formed You I Knew You"', href: '/ot-jeremiah', desc: 'Deep exegesis of Jeremiah 1:5 — God knew, consecrated, and appointed Jeremiah before he was formed. Hebrew word study, s' },
                { name: 'Job: When God Answered Suffering with Sovereignty', href: '/ot-job', desc: 'Job lost everything — and God' },
                { name: 'Jonah: The Prophet Who Tried to Outrun God', href: '/ot-jonah', desc: 'Deep exegesis of Jonah — the prophet who ran from God' },
                { name: 'Joseph & God\'s Sovereignty', href: '/ot-joseph', desc: 'Explore God' },
                { name: 'Moses & Pharaoh: God\'s Sovereign Election to Mercy and Hardening', href: '/ot-moses-pharaoh', desc: 'Moses and Pharaoh: God' },
                { name: 'Noah: Chosen for Preservation', href: '/ot-noah', desc: 'Noah: Chosen for Preservation — Explore how God' },
                { name: 'The Prophets: Remnant Theology &amp; the Elect Preserved Through Judgment', href: '/ot-prophets-remnant', desc: 'Jeremiah, Ezekiel, Hosea, Amos, Malachi — every prophet confirms it: God preserves a chosen remnant through judgment. Sa' }
            ]
        },
        {
            name: 'Comparisons',
            icon: '⚖',
            href: '/compare-calvinism-arminianism',
            desc: 'Side-by-side with rival systems',
            subs: [
                { name: 'Calvinism vs Arminianism: A Biblical Comparison', href: '/compare-calvinism-arminianism', desc: 'A comprehensive, point-by-point biblical comparison of Calvinism and Arminianism across all five points of TULIP. Steelm' },
                { name: 'Calvinism vs Molinism: Middle Knowledge and Sovereignty', href: '/compare-calvinism-molinism', desc: 'Calvinism vs Molinism compared: middle knowledge, counterfactuals, and God' },
                { name: 'Calvinism vs Open Theism: Does God Know the Future?', href: '/compare-calvinism-open-theism', desc: 'Calvinism vs Open Theism compared: Does God know the future exhaustively, or is He learning alongside us? A biblical exa' },
                { name: 'Monergism vs Synergism: Does God Save Alone?', href: '/compare-monergism-synergism', desc: 'Monergism vs Synergism explained from Scripture: Does God save alone, or does man cooperate? The fundamental divide in s' },
                { name: 'Predestination vs Foreknowledge: Which Comes First?', href: '/compare-predestination-foreknowledge', desc: 'Predestination vs Foreknowledge: Does God predestine based on what He foresees, or does He foreknow because He predestin' },
                { name: 'Reformed vs Catholic Soteriology: How Are We Justified?', href: '/compare-calvinism-catholic-soteriology', desc: 'Reformed vs Catholic soteriology compared: justification by faith alone vs. faith plus works, imputed vs. infused righte' }
            ]
        },
        {
            name: 'Creeds & Confessions',
            icon: '📜',
            href: '/creeds-confessions',
            desc: 'Historic statements of faith',
            subs: [
                { name: 'The Canons of Dort — The Confessional Heart of Sovereign Grace', href: '/creed-canons-dort', desc: 'The Canons of Dort (1619): Full text with modern commentary on God' },
                { name: 'The Heidelberg Catechism — My Only Comfort in Life and Death', href: '/creed-heidelberg-catechism', desc: 'The Heidelberg Catechism (1563): Key questions and answers on comfort, sin, deliverance, and gratitude — with modern com' }
            ]
        },
        {
            name: 'Pastoral',
            icon: '🤝',
            href: '/pastoral-assurance',
            desc: 'Living out these truths',
            subs: [
                { name: 'Election &amp; Assurance: When Anxiety Attacks Your Faith', href: '/pastoral-assurance', desc: 'How the doctrines of grace give deep, unshakeable assurance to Christians struggling with anxiety and depression. God ch' },
                { name: 'Evangelism &amp; God\'s Sovereignty', href: '/pastoral-evangelism', desc: 'If God has already chosen who will be saved, why share the gospel? Because Scripture teaches that evangelism is the very' },
                { name: 'Prayer &amp; God\'s Sovereign Decrees', href: '/pastoral-prayer', desc: 'If God has already decreed all things, why pray? Because Scripture teaches that prayer is not a backup plan — it is the ' },
                { name: 'Suffering &amp; the Sovereignty of God', href: '/pastoral-suffering', desc: 'How God' }
            ]
        },
        {
            name: 'Psalms & Poetry',
            icon: '🎵',
            href: '/psalms-election',
            desc: 'Singing the sovereignty of God',
            subs: [
                { name: 'Election in the Psalms', href: '/psalms-election', desc: 'How David understood himself as chosen by grace, not merit. Election themes throughout the Psalms—Psalm 65:4, 33:12, 135' }
            ]
        },
        {
            name: 'Healing & Hope',
            icon: '💚',
            href: '/anxious-mind-hub',
            desc: 'Where real pain meets sovereign grace',
            subs: [
                { name: '82% of People Are Lonely — Why That\'s a Theological Problem', href: '/invisible-wall-lonely-theological', desc: 'Loneliness is not a social problem—it' },
                { name: 'The Anxious Mind', href: '/anxious-mind-hub', desc: 'The Anxious Mind — exploring anxiety, depression, burnout, and OCD through the lens of God' },
                { name: 'The Broken Mirror — Identity, Worth & Purpose', href: '/broken-mirror-hub', desc: 'The Broken Mirror — Identity, Worth & Purpose. You are not a self-made anything. Discover who God made you to be before ' },
                { name: 'The Invisible Wall: Relationships, Loneliness & Forgiveness', href: '/invisible-wall-hub', desc: '82% of people report experiencing loneliness. But God' },
                { name: 'The Open Wound — Suffering & God\'s Sovereignty', href: '/open-wound-hub', desc: 'The Open Wound: Suffering, Grief & Trauma. For those who have lost someone, live with pain, survived abuse, or asked why' },
                { name: 'The Question That Haunts Every Hospital Room', href: '/open-wound-hospital-room', desc: 'The Question That Haunts Every Hospital Room: Why do bad things happen to good people? Scripture' },
                { name: 'The Shattered Lens — Truth, Trust & the Modern Crisis of Belief', href: '/shattered-lens-hub', desc: 'The Shattered Lens: Truth, Trust & the Modern Crisis of Belief. In a world of deepfakes, AI, misinformation, and politic' },
                { name: 'What If I\'m Not One of the Chosen?', href: '/anxious-mind-what-if-not-chosen', desc: 'What if I' },
                { name: 'When Everything You Were Taught Was Wrong', href: '/shattered-lens-taught-wrong', desc: 'You grew up believing one thing about God. Now Scripture is showing you something different. That disorientation isn' },
                { name: 'When God Is Sovereign and Your World Just Collapsed', href: '/open-wound-sovereignty-in-grief', desc: 'When God Is Sovereign and Your World Just Collapsed: Grief doesn' },
                { name: 'When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-cant-tell-true', desc: 'When You Can' },
                { name: 'You Are Not a Self-Made Anything', href: '/broken-mirror-not-self-made', desc: 'You Are Not a Self-Made Anything. Culture screams' },
                { name: 'You Were Never Meant to Carry This', href: '/anxious-mind-never-meant-to-carry', desc: 'You Were Never Meant to Carry This — why anxiety is the logical result of believing everything depends on you, and how G' },
                { name: 'You Were Not an Accident — You Were Created for Mercy', href: '/broken-mirror-vessels-for-mercy', desc: 'You weren' },
                { name: 'Your Brain Decides Before You Do — And That\'s Good News', href: '/anxious-mind-brain-decides', desc: 'Neuroscience shows your brain decides before' }
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

    // === BUILD MEGA-MENU (dynamic two-panel layout) ===
    function buildMegaMenu() {
        if (!megaMenu) return;

        // Clear the menu
        megaMenu.innerHTML = '';

        // Build two-panel layout
        var panel = document.createElement('div');
        panel.className = 'mega-menu-panel';

        // Left panel: category list
        var leftPanel = document.createElement('div');
        leftPanel.className = 'mega-menu-cats';

        for (var i = 0; i < MEGA_MENU_DATA.length; i++) {
            var cat = MEGA_MENU_DATA[i];
            var catItem = document.createElement('div');
            catItem.className = 'mega-menu-cat-item' + (i === 0 ? ' active' : '');
            catItem.setAttribute('data-index', String(i));
            catItem.innerHTML = '<span class="mega-menu-cat-icon">' + cat.icon + '</span><span class="mega-menu-cat-name">' + escapeHtml(cat.name) + '</span>';

            (function(index) {
                catItem.addEventListener('click', function() {
                    setActiveMegaMenuCategory(index);
                });
                catItem.addEventListener('mouseenter', function() {
                    setActiveMegaMenuCategory(index);
                });
            })(i);

            leftPanel.appendChild(catItem);
        }

        // Right panel: sub-sections
        var rightPanel = document.createElement('div');
        rightPanel.className = 'mega-menu-detail';
        rightPanel.id = 'megaMenuDetail';

        // Initialize with first category
        setActiveMegaMenuCategory(0);

        panel.appendChild(leftPanel);
        panel.appendChild(rightPanel);
        megaMenu.appendChild(panel);
    }

    function setActiveMegaMenuCategory(index) {
        if (!megaMenu) return;
        var cat = MEGA_MENU_DATA[index];
        if (!cat) return;

        // Update left panel active state
        var catItems = megaMenu.querySelectorAll('.mega-menu-cat-item');
        for (var i = 0; i < catItems.length; i++) {
            catItems[i].classList.remove('active');
        }
        if (catItems[index]) {
            catItems[index].classList.add('active');
        }

        // Update right panel content
        var rightPanel = document.getElementById('megaMenuDetail');
        if (!rightPanel) return;

        var html = '';
        html += '<div class="mega-menu-detail-title">' + escapeHtml(cat.name) + '</div>';
        html += '<div class="mega-menu-detail-desc">' + escapeHtml(cat.desc) + '</div>';

        for (var s = 0; s < cat.subs.length; s++) {
            var sub = cat.subs[s];
            html += '<a href="' + escapeAttr(sub.href) + '" class="mega-menu-sub-link">';
            html += '<div class="mega-menu-sub-name">' + escapeHtml(sub.name) + '</div>';
            html += '<div class="mega-menu-sub-desc">' + escapeHtml(sub.desc) + '</div>';
            html += '</a>';
        }

        html += '<a href="' + escapeAttr(cat.href) + '" class="mega-menu-view-all">View all in ' + escapeHtml(cat.name) + ' →</a>';

        rightPanel.innerHTML = html;
    }

    // === BUILD MOBILE CATEGORIES ACCORDION ===
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

        // All categories with full sub-pages
        for (var i = 0; i < MEGA_MENU_DATA.length; i++) {
            var cat = MEGA_MENU_DATA[i];
            var catId = 'mobile-acc-' + i;
            var subCount = cat.subs ? cat.subs.length : 0;

            html += '<div class="mobile-accordion-cat">';
            html += '<div class="mobile-accordion-header" data-cat-index="' + i + '">';
            html += '<span class="mobile-accordion-icon">' + cat.icon + '</span>';
            html += '<span class="mobile-accordion-cat-name">' + escapeHtml(cat.name) + '</span>';
            html += '<span class="mobile-accordion-cat-count">' + subCount + '</span>';
            html += '<span class="chevron">▼</span>';
            html += '</div>';
            html += '<div class="mobile-accordion-subs" id="' + catId + '">';

            for (var s = 0; s < cat.subs.length; s++) {
                var sub = cat.subs[s];
                html += '<a href="' + escapeAttr(sub.href) + '" class="mobile-accordion-sub">' + escapeHtml(sub.name) + '</a>';
            }

            // "View all" link at bottom of each category
            html += '<a href="' + escapeAttr(cat.href) + '" class="mobile-accordion-view-all">View all ' + escapeHtml(cat.name) + ' \u2192</a>';

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

        // Add event listeners for accordion toggle
        var headers = container.querySelectorAll('.mobile-accordion-header');
        for (var h = 0; h < headers.length; h++) {
            (function(header) {
                header.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var index = parseInt(header.getAttribute('data-cat-index'), 10);
                    toggleMobileAccordion(index);
                });
            })(headers[h]);
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
        var allSubs = container.querySelectorAll('.mobile-accordion-subs');

        for (var i = 0; i < allHeaders.length; i++) {
            var header = allHeaders[i];
            var subs = allSubs[i];
            var index = parseInt(header.getAttribute('data-cat-index'), 10);

            if (index === activeIndex) {
                // Toggle this one
                var isOpen = subs.classList.contains('open');
                if (isOpen) {
                    subs.classList.remove('open');
                    header.classList.remove('open');
                } else {
                    subs.classList.add('open');
                    header.classList.add('open');
                }
            } else {
                // Close all others
                subs.classList.remove('open');
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
            if (!searchIndex || searchIndex.length === 0) {
                container.innerHTML = '<div style="padding:1rem;text-align:center;color:#807b75;font-size:0.85rem;">Loading...</div>';
                return;
            }

            var tokens = query.split(/\s+/).filter(function (t) { return t.length > 0; });
            var scored = [];

            for (var i = 0; i < searchIndex.length; i++) {
                var page = searchIndex[i];
                var score = 0;
                var titleLower = page.title.toLowerCase();
                var descLower = (page.desc || '').toLowerCase();
                var textLower = (page.text || '').toLowerCase();

                if (titleLower.indexOf(query) !== -1) score += 200;
                if (descLower.indexOf(query) !== -1) score += 100;
                if (textLower.indexOf(query) !== -1) score += 50;

                for (var t = 0; t < tokens.length; t++) {
                    if (titleLower.indexOf(tokens[t]) !== -1) score += 40;
                    if (descLower.indexOf(tokens[t]) !== -1) score += 20;
                    if (textLower.indexOf(tokens[t]) !== -1) score += 10;
                }

                if (score > 0) scored.push({ page: page, score: score });
            }

            scored.sort(function (a, b) { return b.score - a.score; });
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
            if (!searchIndex || searchIndex.length === 0) {
                searchResults.innerHTML = '<div style="padding:1.5rem;text-align:center;color:#807b75;">Search index loading...</div>';
                return;
            }

            var tokens = query.split(/\s+/).filter(function (t) { return t.length > 0; });
            var scored = [];

            for (var i = 0; i < searchIndex.length; i++) {
                var page = searchIndex[i];
                var score = 0;
                var titleLower = page.title.toLowerCase();
                var descLower = (page.desc || '').toLowerCase();
                var textLower = (page.text || '').toLowerCase();

                if (titleLower.indexOf(query) !== -1) score += 200;
                if (descLower.indexOf(query) !== -1) score += 100;
                if (textLower.indexOf(query) !== -1) score += 50;

                for (var t = 0; t < tokens.length; t++) {
                    if (titleLower.indexOf(tokens[t]) !== -1) score += 40;
                    if (descLower.indexOf(tokens[t]) !== -1) score += 20;
                    if (textLower.indexOf(tokens[t]) !== -1) score += 10;
                }

                if (score > 0) scored.push({ page: page, score: score });
            }

            scored.sort(function (a, b) { return b.score - a.score; });

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
