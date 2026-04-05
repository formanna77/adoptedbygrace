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
                    count: 8,
                    pages: [
                        { name: '480+ Bible Verses That Prove God\'s Sovereignty in Salvation | Scripture Tsunami', href: '/scripture-tsunami', desc: 'They told you' },
                        { name: 'But What About Free Will and Fairness? — Phase 4', href: '/start-here-phase4', desc: 'Phase 4: The hardest objections to biblical theology answered — free will, fairness, John 3:16,' },
                        { name: 'Find Your Starting Point', href: '/start-here-assessment', desc: 'Discover your starting point on the 5-phase journey to understanding God' },
                        { name: 'Living as an Elect Child of God — Phase 5', href: '/start-here-phase5', desc: 'Phase 5: Living as an elect child of God — how sovereign grace transforms your assurance, prayer, worship, mission, and ' },
                        { name: 'New to Sovereign Grace? Start Here.', href: '/start-here', desc: 'Curious, skeptical, or searching? Pick your doorway into sovereign grace. Whether you' },
                        { name: 'The Five Points of Grace — Phase 2', href: '/start-here-phase2', desc: 'The five biblical doctrines of grace explained: Total Depravity, Unconditional Election, Definite Atonement, Irresistibl' },
                        { name: 'What Does the Bible Actually Teach? — Phase 3', href: '/start-here-phase3', desc: 'Phase 3: What does the Bible actually teach about salvation? A passage-by-passage journey through Romans 9, Ephesians 1,' },
                        { name: 'What Is Reformed Theology? — Phase 1', href: '/start-here-phase1', desc: 'Phase 1: What is biblical theology? An honest, accessible introduction to what Reformed Christians believe about God, sa' }
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
                    count: 59,
                    pages: [
                        { name: 'Can God Blot Your Name from the Book of Life?', href: '/question-book-of-life', desc: 'If God warns He will blot names from the Book of Life, doesn' },
                        { name: 'Can God Create a Universe Where He Isn\'t Sovereign?', href: '/question-sovereignty-logic', desc: 'Can God make a rock too heavy for Him to lift? Can He create a universe He doesn' },
                        { name: 'Can God\'s Plan for You Be Broken? Romans 8:28-30', href: '/question-goldchain', desc: 'Romans 8:28-30 — foreknown, predestined, called, justified, glorified. An unbreakable chain where every link is divine a' },
                        { name: 'Can You Lose Your Salvation?', href: '/apologetic-perseverance', desc: 'Can you lose your salvation? Scripture' },
                        { name: 'Can You Lose Your Salvation? Ephesians 4:30', href: '/question-sealed', desc: 'Ephesians 4:30 proves once saved always saved. You are sealed by the Holy Spirit for the day of redemption — not until y' },
                        { name: 'Dead Bones Don\'t Volunteer — Ezekiel 37', href: '/question-ezekiel37', desc: 'Ezekiel 37' },
                        { name: 'Dead, Not Sick — The Bible\'s Diagnosis of the Human Condition', href: '/question-depravity', desc: 'Total depravity is not about being as bad as possible — it' },
                        { name: 'Did God Choose You Before You Were Born?', href: '/question-chosen', desc: 'Before the foundation of the world, God chose you. Ephesians 1:3-11 doesn' },
                        { name: 'Did Jesus Die for Everyone? Scripture on Definite Atonement', href: '/apologetic-definite-atonement', desc: 'Did Jesus die for everyone? Scripture teaches that Christ' },
                        { name: 'Does God Change Your Heart Without Permission?', href: '/question-newheart', desc: 'Ezekiel 36:26-27 — God promises a new heart and a new spirit. He does not ask permission. He removes the heart of stone ' },
                        { name: 'Does God Choose Who Goes to Heaven? What the Bible Actually Says', href: '/question-does-god-choose-who-goes-to-heaven', desc: 'Does God choose who goes to heaven? Yes. The Bible is clear: God chose His people before the foundation of the world. He' },
                        { name: 'Does God Predestine People to Hell? What Scripture Actually Teaches', href: '/question-predestined-to-hell', desc: 'Does God send people to hell on purpose? Discover the biblical distinction between election and reprobation—and why the ' },
                        { name: 'Does the Bible Say We\'re Sick, Not Dead?', href: '/question-bible-says-sick', desc: 'A forensic exegetical investigation into every Bible verse where' },
                        { name: 'Doesn\'t Election Make Evangelism Pointless?', href: '/apologetic-evangelism', desc: 'Does election make evangelism pointless? No—it' },
                        { name: 'Doesn\'t God Want Everyone Saved? – 1 Timothy 2:4', href: '/question-godwants', desc: 'Does God want everyone saved? 1 Timothy 2:4 and the two wills of God — His revealed will and His sovereign decree.' },
                        { name: 'Drawn, Not Dragged — The Unstoppable Grace of Effectual Calling', href: '/question-irresistible', desc: 'Irresistible grace is liberation, not coercion. God transforms wills; He doesn' },
                        { name: 'Elect Exiles According to the Foreknowledge of God – 1 Peter 1:1-2', href: '/question-1peter1', desc: 'A rigorous exegetical examination of 1 Peter 1:1-2 and the truth of unconditional election. Demolishes the Arminian clai' },
                        { name: 'Eternal Security: Can a Believer Lose Salvation?', href: '/question-secure', desc: 'Eternal Security: Can a Believer Lose Salvation? Scripture teaches that those whom God saves are kept safe by His power.' },
                        { name: 'External and Internal Calling: What\'s the Difference?', href: '/question-external-internal-call', desc: 'External and Internal Calling: What' },
                        { name: 'God\'s Hardening: Does God Make People Sin?', href: '/question-hardening', desc: 'God' },
                        { name: 'If Grace Is Irresistible, Why Does It Feel Like Choice?', href: '/question-how-grace-feels', desc: 'If God' },
                        { name: 'Is Faith a Gift from God? What the Bible Actually Says', href: '/question-faithgift', desc: 'Is faith a human achievement or a divine gift? Philippians 1:29 and Ephesians 2:8-9 answer definitively: faith is grante' },
                        { name: 'Is Free Will Real? What Scripture Teaches', href: '/question-freewill', desc: 'Is free will real? What the Bible actually teaches about human choice. Explore why spiritual death, not autonomy, is wha' },
                        { name: 'Is God Unfair? – Romans 9:19-23', href: '/question-unfair', desc: 'Is God unfair? Romans 9:19-23 — Paul confronts the moral objection to election head-on and does not soften the answer.' },
                        { name: 'Is Predestination in the Bible? Yes — and It Saturates Scripture', href: '/question-is-predestination-in-the-bible', desc: 'Predestination appears by name in Romans 8:29-30 and Ephesians 1:5,11. But the concept saturates all of Scripture — from' },
                        { name: 'Is Salvation My Choice or God\'s? The Only Two Options', href: '/question-is-salvation-my-choice-or-gods', desc: 'If salvation is your choice, you' },
                        { name: 'Isaiah 53: The Servant Who Bore the Sins of Many', href: '/question-isaiah53', desc: 'Deep exegesis of Isaiah 53 — the Suffering Servant bore the sins of MANY, not all. Hebrew word studies, the will of the ' },
                        { name: 'Known Before You Were Known — Psalm 139 and the God Who Wrote Your Story Before It Began', href: '/question-psalm139', desc: 'Psalm 139 reveals that God knew you, formed you, and wrote every day of your life before you existed. Your story was aut' },
                        { name: 'Names Written Before the Foundation — Revelation 13 & 17', href: '/question-revelation13', desc: 'Revelation 13:8 and 17:8 show that names were written in the Book of Life before the creation of the world — devastating' },
                        { name: 'No Dice, No Chance — God\'s Sovereignty over Lots and Kings', href: '/question-proverbs-sovereignty', desc: 'Proverbs 16:33 and 21:1 prove God controls every roll of the dice and every ruler' },
                        { name: 'No One Can Come to Me Unless the Father Draws Him – John 6:37-44,65', href: '/question-john6', desc: 'John 6:44:' },
                        { name: 'Not Because of Our Works — 2 Timothy 1:9', href: '/question-2tim1-9', desc: 'A deep dive into 2 Timothy 1:9:' },
                        { name: 'Not Because of Works Done by Us — Titus 3:3-7', href: '/question-titus3', desc: 'Titus 3:3-7 examined: God saved us not because of works done by us in righteousness, but according to his own mercy. Gre' },
                        { name: 'Once Saved Always Saved: What Scripture Teaches', href: '/question-perseverance', desc: 'Perseverance of the saints: not human effort, but divine commitment. Those God saves, He keeps. John 10:28-29, Romans 8:' },
                        { name: 'Thank You, Father, for Hiding This – Matthew 11:25-27', href: '/question-matt11', desc: 'Matthew 11:25-27 — Jesus thanks the Father for hiding truth from the wise and revealing it to babes. Revelation is selec' },
                        { name: 'The Boasting Problem That Destroys Free Will – 1 Corinthians 1:26-31', href: '/question-boasting', desc: '1 Corinthians 1:26-31 — God chose the foolish to shame the wise. His election strategy is designed to eliminate all huma' },
                        { name: 'The CANNOT Page: Scripture\'s Testimony to Human Inability', href: '/question-cannot', desc: 'Scripture' },
                        { name: 'The Cross Was Predestined — Acts 4:27-28 and the Sovereignty Behind Calvary', href: '/question-acts4', desc: 'The most evil act in history — the murder of God' },
                        { name: 'The External Call vs The Effectual Call', href: '/question-external-call', desc: 'The External Call vs The Effectual Call: Scripture teaches that God calls all people to salvation, but only the elect tr' },
                        { name: 'The Faith Origin Test — Where Did Your Faith Come From?', href: '/question-faith-origin-test', desc: 'An interactive self-examination that traces your faith back to its ultimate source. 10 questions. No tricks. Just follow' },
                        { name: 'The Great Debate: Does Man Have Free Will?', href: '/debate-free-will', desc: 'A rigorous formal debate: Does man have free will? Two positions argue their strongest cases—libertarian free will vs. b' },
                        { name: 'The Prayer That Proves Election — John 17', href: '/question-john17', desc: 'Explore Jesus' },
                        { name: 'The Verse in Acts That Nobody Preaches – Acts 13:48', href: '/question-acts', desc: 'Acts 13:48 unpacked:' },
                        { name: 'The Verse That Settles the Order — 1 John 5:1', href: '/question-1john5-1', desc: 'The Greek perfect tense in 1 John 5:1 proves regeneration precedes faith. Deep exegesis with Greek word study, seven arg' },
                        { name: 'Was Christ a Robot? If Predestination Didn\'t Rob Him, It Won\'t Rob You', href: '/question-was-christ-a-robot', desc: 'The crucifixion was predestined by God' },
                        { name: 'What About \'Whosoever Will\'? – John 3:16 & 2 Peter 3:9', href: '/question-whosoever', desc: 'What About \'Whosoever Will\'? – John 3:16 & 2 Peter 3:9' },
                        { name: 'What About Babies Who Die? — Grace, Covenant, and the Littlest Lambs', href: '/apologetic-babies', desc: 'What happens to babies and children who die? Scripture gives the grieving parent a sovereign, rock-solid hope that no fr' },
                        { name: 'What About Predestination Based on Foreknowledge? – Romans 8:29', href: '/question-foreknowledge', desc: 'Does foreknowledge mean foresight of faith? Romans 8:29 examined. Greek proginōskō means to choose beforehand, not merel' },
                        { name: 'What About Those Who Never Heard the Gospel?', href: '/apologetic-unreached', desc: 'What about the billions who never heard the gospel? Scripture reveals God' },
                        { name: 'What Did Jesus Mean by \'Let the Dead Bury the Dead\'?', href: '/question-dead-bury-dead', desc: 'When Jesus said' },
                        { name: 'What Does Romans 9 Really Mean? Verse by Verse', href: '/question-romans9', desc: 'Romans 9 is the most direct chapter on election in the Bible. Jacob and Esau, Pharaoh, the potter and the clay — examine' },
                        { name: 'Where Did Your Faith Come From? Is Faith a Gift from God', href: '/question-where-did-your-faith-come-from', desc: 'Is faith a gift from God or your choice? Explore where faith come from in this Socratic journey into the most important ' },
                        { name: 'Where Does Your \'No\' Come From? – The Self-Referential Trap', href: '/question-where-does-your-no-come-from', desc: 'Where does your' },
                        { name: 'Whose Side Are You On? Man-Centered vs God-Centered Theology', href: '/question-whose-side-are-you-on', desc: 'Strip away the jargon: one theology makes man the hero, the other makes God the hero. Which side are you really on?' },
                        { name: 'Why Does God Choose Some People and Not Others?', href: '/question-why-does-god-choose-some-not-others', desc: 'Why does God choose some people and not others? Scripture teaches election is according to God' },
                        { name: 'Why Jesus Spoke in Parables — Matthew 13:10-17', href: '/question-parables', desc: 'Why did Jesus speak in parables? Not to make truth clearer — but to conceal it from some while revealing it to others. M' },
                        { name: 'Why Pray If God Is Sovereign? Because Prayer Changes You, Not God', href: '/question-why-pray-if-god-is-sovereign', desc: 'If God has already decided everything, why pray? Because prayer is not about changing God' },
                        { name: 'You Did Not Choose Me, But I Chose You – John 15:16', href: '/question-john15', desc: 'John 15:16:' },
                        { name: 'You Do Not Believe Because You Are Not My Sheep – John 10:26-29', href: '/question-john10', desc: 'John 10:26-29:' }
                    ]
                },
                {
                    name: 'Hard Objections',
                    icon: '🛡',
                    href: '/questions',
                    count: 18,
                    pages: [
                        { name: 'Does Election Contradict God\'s Love? What Scripture Teaches', href: '/objection-love', desc: 'Does election contradict God' },
                        { name: 'Does God Manipulate Us? Sovereignty vs. Control Explained', href: '/objection-manipulation', desc: 'Does predestination make God a manipulator? Sovereignty and manipulation are actually opposites. Why election is not pup' },
                        { name: 'Does Predestination Make Us Robots?', href: '/objection-robots', desc: 'Does predestination make us robots or puppets? Scripture says no. You are truly free because God makes you willing, not ' },
                        { name: 'Doesn\'t God Want All People Saved? The Answer From Scripture', href: '/objection-desire', desc: '1 Timothy 2:4 and 2 Peter 3:9 are cited as proof against election. But read in context, they actually support God' },
                        { name: 'If Everything Is Predetermined, Why Even Try?', href: '/objection-effort', desc: 'If God already predetermined everything, why bother trying? Because your effort isn' },
                        { name: 'If God Already Chose Us, Why Do We Have to Believe?', href: '/objection-why-believe', desc: 'A letter to the sincere Christian who just discovered election and wonders if faith is meaningless. Exploring how God' },
                        { name: 'If God Already Chose Who\'s Saved, Why Evangelize?', href: '/objection-why-evangelize', desc: 'If God already chose who' },
                        { name: 'If God Already Chose, Why Evangelize?', href: '/objection-evangelism-pointless', desc: 'If God already chose who will be saved, why evangelize? Because God ordains the means as well as the ends. Election does' },
                        { name: 'If God Already Decided Everything, Why Pray?', href: '/objection-why-pray', desc: 'If God has predetermined everything, why pray? Isn' },
                        { name: 'If God Can Save Everyone, Why Doesn\'t He?', href: '/objection-why-not-save-everyone', desc: 'If God is all-powerful and all-loving, why doesn' },
                        { name: 'If God Controls Everything, How Can He Blame Us?', href: '/objection-responsibility', desc: 'If God predetermines everything, how can He hold us responsible? Romans 9:19 answered with Scripture, compatibilism, and' },
                        { name: 'If God Could Save Everyone, Why Doesn\'t He?', href: '/objection-god-could-save-all', desc: 'The hardest question in Reformed theology. If God can irresistibly save, why doesn' },
                        { name: 'If God Only Chose Some, Isn\'t That Unfair?', href: '/objection-unfair-to-choose-some', desc: 'If God only chose some for salvation, isn' },
                        { name: 'If God Predestined Everything, Why Does He Command?', href: '/objection-why-command', desc: 'If God predestined everything, why does He command? The answer shatters the objection: God' },
                        { name: 'Is Election Fair? Why Grace Is Unfair', href: '/objection-fairness', desc: 'Is election fair? Does God' },
                        { name: 'Is God the Author of Sin? What Scripture and Logic Reveal', href: '/objection-author-of-sin', desc: 'Does God cause sin if He predestines everything? Scripture teaches a clear distinction between ordaining and authoring. ' },
                        { name: 'Isn\'t Faith a Choice? The Question That Changes Everything', href: '/objection-faith-choice', desc: 'Is faith a choice? Discover what Scripture actually teaches about where your faith came from—and why claiming you chose ' },
                        { name: 'What About Babies Who Die? Election, Infant Salvation, and the God Who Saves Without Permission', href: '/objection-babies', desc: 'If salvation requires faith, what happens to babies who die before they can believe? This objection to election actually' }
                    ]
                },
                {
                    name: 'Side by Side',
                    icon: '⚖',
                    href: '/compare-calvinism-arminianism',
                    count: 8,
                    pages: [
                        { name: 'Calvinism vs Arminianism: A Biblical Comparison', href: '/compare-calvinism-arminianism', desc: 'The definitive comparison of Calvinism and Arminianism. What does Scripture actually teach about salvation—and why the A' },
                        { name: 'Calvinism vs Molinism: Middle Knowledge and Sovereignty', href: '/compare-calvinism-molinism', desc: 'Calvinism vs Molinism compared: middle knowledge, counterfactuals, and God' },
                        { name: 'Calvinism vs Open Theism: Does God Know the Future?', href: '/compare-calvinism-open-theism', desc: 'Calvinism vs Open Theism compared: Does God know the future exhaustively, or is He learning alongside us? A biblical exa' },
                        { name: 'Every Decision Point: Which Side Do the Scriptures Really Take?', href: '/compare-every-decision-point', desc: 'A systematic comparison of ten crucial doctrinal decision points. At each one, man-centered theology sides with man. God' },
                        { name: 'Monergism vs Synergism: Does God Save Alone?', href: '/compare-monergism-synergism', desc: 'Monergism vs Synergism explained from Scripture: Does God save alone, or does man cooperate? The fundamental divide in s' },
                        { name: 'Predestination vs Foreknowledge: Which Comes First?', href: '/compare-predestination-foreknowledge', desc: 'Predestination vs Foreknowledge: Does God predestine based on what He foresees, or does He foreknow because He predestin' },
                        { name: 'Reformed vs Catholic Soteriology: How Are We Justified?', href: '/compare-calvinism-catholic-soteriology', desc: 'Reformed vs Catholic soteriology compared: justification by faith alone vs. faith plus works, imputed vs. infused righte' },
                        { name: 'Two Graces: One Divine, One Man-Made', href: '/compare-grace-reformed-vs-arminian', desc: 'The grace of Reformed theology vs the grace of Arminianism compared side by side. One is a resurrection. The other is a ' }
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
                    count: 20,
                    pages: [
                        { name: 'Before the Foundation of the World — God\'s Eternal Decrees', href: '/systematic-divine-decrees', desc: 'God' },
                        { name: 'Divine Election — Chosen Before the Foundation of the World', href: '/systematic-election', desc: 'Systematic Theology: Divine Election. Scripture teaches that God chose His people before the creation of the world—not b' },
                        { name: 'How Can God Be Sovereign AND Humans Be Responsible? Both Are True.', href: '/systematic-compatibilism', desc: 'The biggest objection to sovereignty:' },
                        { name: 'How God Saves — The Complete Biblical Truth of Salvation', href: '/systematic-soteriology', desc: 'From the moment God chose you to the moment He glorifies you, not a single link in the chain can break. Romans 8:29-30 m' },
                        { name: 'Justification by Faith Alone', href: '/systematic-justification', desc: 'Justification by Faith Alone: How God declares sinners righteous through the imputed righteousness of Christ, received b' },
                        { name: 'One God, Three Persons — The Trinity in Scripture and Salvation', href: '/systematic-trinity', desc: 'The Trinity: one God in three persons. Scripture teaches the Father elects, the Son redeems, the Spirit applies. The fou' },
                        { name: 'One Plan, One People, One Mediator — Covenant Theology', href: '/systematic-covenant-theology', desc: 'Covenant Theology: God' },
                        { name: 'Regeneration — Born Again by the Power of God', href: '/systematic-regeneration', desc: 'Systematic Theology: Regeneration (The New Birth). Scripture teaches that God causes us to be born again—that regenerati' },
                        { name: 'Systematic Theology: The Glory of Christ', href: '/systematic-christology', desc: 'Systematic Theology: Christology - The Person and Work of Christ. An in-depth exploration of Jesus Christ' },
                        { name: 'The Atonement: What Christ\'s Death Accomplished', href: '/systematic-atonement', desc: 'What did Christ' },
                        { name: 'The Church — Why God\'s People Are Called Out, Not Volunteered', href: '/systematic-ecclesiology', desc: 'The church isn' },
                        { name: 'The Holy Spirit — Who He Is and Why He Changes Everything', href: '/systematic-pneumatology', desc: 'The Spirit doesn' },
                        { name: 'The Ordo Salutis: The Order of Salvation', href: '/systematic-ordo-salutis', desc: 'The Ordo Salutis: God' },
                        { name: 'The Resurrection — The Foundation of All Hope', href: '/systematic-resurrection', desc: 'The Resurrection: Christ' },
                        { name: 'The Truth of Salvation — Gateway to Soteriology', href: '/systematic-salvation', desc: 'The Truth of Salvation: A gateway to understanding soteriology. Explore election, regeneration, atonement, justification' },
                        { name: 'The Truth of Scripture — God\'s Authoritative Word', href: '/systematic-bibliology', desc: 'The Truth of Scripture: Inerrancy, sufficiency, authority. 2 Timothy 3:16-17, 2 Peter 1:20-21. Why Sola Scriptura matter' },
                        { name: 'Theology Proper: The God Who Is There', href: '/systematic-theology-proper', desc: 'Theology Proper: Exploring God' },
                        { name: 'What Are You? Created in Glory, Ruined by Sin, Rescued by Grace', href: '/systematic-anthropology', desc: 'You were made to reflect God. Then sin shattered the mirror. Now grace is putting the pieces back — but not the way you' },
                        { name: 'Why Scripture Is the Final Word — And Why That Matters for Grace', href: '/systematic-prolegomena', desc: 'Before you can answer any question about God, you need to answer this one: Where does truth come from? Scripture' },
                        { name: 'You\'re Not Sick in Sin — You\'re Dead. Here\'s What That Means.', href: '/systematic-hamartiology', desc: 'Sin didn' }
                    ]
                },
                {
                    name: 'Old Testament',
                    icon: '📚',
                    href: '/ot-election',
                    count: 15,
                    pages: [
                        { name: 'Abel & Cain: The First Election', href: '/ot-abel-cain', desc: 'Genesis 4 reveals God' },
                        { name: 'Abraham & Election', href: '/ot-abraham', desc: 'God' },
                        { name: 'David: God\'s Sovereign Election for Kingship', href: '/ot-david', desc: 'God' },
                        { name: 'Election in the Psalms', href: '/psalms-election', desc: 'How David understood himself as chosen by grace, not merit. Election themes throughout the Psalms—Psalm 65:4, 33:12, 135' },
                        { name: 'Isaiah: The Servant & God\'s Immutable Counsel', href: '/ot-isaiah-servant', desc: 'Isaiah reveals God' },
                        { name: 'Israel: God\'s Chosen Nation', href: '/ot-israel-chosen', desc: 'A comprehensive biblical study of Israel' },
                        { name: 'Jacob Over Esau: God\'s Sovereign Election Before Birth', href: '/ot-jacob-esau', desc: 'Jacob and Esau: God' },
                        { name: 'Jeremiah: Called Before Formation — "Before I Formed You I Knew You"', href: '/ot-jeremiah', desc: 'Deep exegesis of Jeremiah 1:5 — God knew, consecrated, and appointed Jeremiah before he was formed. Hebrew word study, s' },
                        { name: 'Job: When God Answered Suffering with Sovereignty', href: '/ot-job', desc: 'Job lost everything — and God' },
                        { name: 'Jonah: The Prophet Who Tried to Outrun God', href: '/ot-jonah', desc: 'Deep exegesis of Jonah — the prophet who ran from God' },
                        { name: 'Joseph & God\'s Sovereignty', href: '/ot-joseph', desc: 'Explore God' },
                        { name: 'Moses & Pharaoh: God\'s Sovereign Election to Mercy and Hardening', href: '/ot-moses-pharaoh', desc: 'Moses and Pharaoh: God' },
                        { name: 'Noah: Chosen for Preservation', href: '/ot-noah', desc: 'Noah: Chosen for Preservation — Explore how God' },
                        { name: 'Sovereignty in the Old Testament', href: '/ot-hub', desc: 'Explore God' },
                        { name: 'The Prophets: Remnant Theology & the Elect Preserved Through Judgment', href: '/ot-prophets-remnant', desc: 'Jeremiah, Ezekiel, Hosea, Amos, Malachi — every prophet confirms it: God preserves a chosen remnant through judgment. Sa' }
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
                    count: 30,
                    pages: [
                        { name: '"Christ Died for All" — Why 2 Corinthians 5:14 Proves the Opposite', href: '/demolition-2cor5-14-15', desc: '"Christ Died for All" — Why 2 Corinthians 5:14 Proves the Opposite' },
                        { name: '"Faith Is Not a Gift from God"? — Why the Most Popular Objection to Grace Collapses', href: '/demolition-faith-is-not-a-gift', desc: 'A systematic demolition of the anti-gift reading of Ephesians 2:8. Why the Greek grammar argument fails, why Philippians' },
                        { name: '"God Commands All to Repent" — Does Acts 17:30 Disprove Election?', href: '/demolition-acts17-30', desc: 'God commands all people to repent. But does a command prove ability? A king commands his prisoners to be free — that doe' },
                        { name: '"He Tasted Death for Everyone" — What Hebrews 2:9 Actually Means', href: '/demolition-hebrews2-9', desc: '"He Tasted Death for Everyone" — What Hebrews 2:9 Actually Means' },
                        { name: '"Savior of All People" — Does 1 Timothy 4:10 Prove Universal Atonement?', href: '/demolition-1tim4-10', desc: '"Savior of All People" — Does 1 Timothy 4:10 Prove Universal Atonement?' },
                        { name: '"Work Out Your Salvation" — Does Philippians 2:12 Prove Free Will?', href: '/demolition-philippians2-12-13', desc: 'They quote verse 12 and stop. But verse 13 changes everything:' },
                        { name: '1 Corinthians 15:22 — Verse Demolition #4', href: '/demolition-1cor15-22', desc: 'Demolition #4: 1 Corinthians 15:22 proves particular redemption, not universal atonement. The parallel is representation' },
                        { name: '1 Timothy 2:4 — Verse Demolition #2', href: '/demolition-1tim2-4', desc: 'Demolition #2: Does God Desire the Salvation of Every Individual? A Reformed analysis of 1 Timothy 2:4 that dismantles A' },
                        { name: '2 Peter 2:1 — Verse Demolition #11', href: '/demolition-2peter2-1', desc: '2 Peter 2:1 — Does' },
                        { name: 'Acts 7:51 — Verse Demolition #6', href: '/demolition-acts7-51', desc: 'Demolition #6: Does Acts 7:51 Prove that Grace Can Be Resisted? A Reformed exegesis of Stephen' },
                        { name: 'Children of Satan — Demolition', href: '/demolition-children-of-satan', desc: 'Demolition: Children of Satan — Every passage where the Bible identifies unregenerate humans as children of the devil, s' },
                        { name: 'Cut Off From the Root — Demolition', href: '/demolition-cut-off-from-root', desc: 'When a creature rebels against its Creator, the consequences are total and irreversible. The relationship is destroyed—b' },
                        { name: 'Demolition Zone: Arianism and the Deity of Christ', href: '/demolition-arianism', desc: 'Arius and his teaching. Council of Nicaea. Athanasius contra mundum. Why Christ' },
                        { name: 'Demolition: 2 Peter 3:9 — Does God\'s Patience Prove Universal Salvation?', href: '/demolition-2peter3-9', desc: '2 Peter 3:9 examined:' },
                        { name: 'Demolition: John 12:32 — "I Will Draw ALL People"', href: '/demolition-john12-32', desc: 'Exegetical demolition of the Arminian proof text John 12:32. The Greek text, context, and cross-references reveal' },
                        { name: 'Demolition: John 3:16 — Does "The World" Mean Every Individual?', href: '/demolition-john3-16', desc: 'John 3:16 examined:' },
                        { name: 'Demolition: Matthew 23:37 — Jesus\'s Lament Over Jerusalem', href: '/demolition-matt23-37', desc: 'Matthew 23:37 demolition: Jesus' },
                        { name: 'Demolition: Revelation 3:20 — \'I Stand at the Door and Knock\'', href: '/demolition-rev3-20', desc: 'Revelation 3:20 examined:' },
                        { name: 'Demolition: Romans 10:9-10 — "If You Confess... You Will Be Saved"', href: '/demolition-romans10-9', desc: 'Romans 10:9-10 — Does' },
                        { name: 'Did C.S. Lewis Refute Calvinism? — What They Won\'t Tell You', href: '/counter-cs-lewis-free-will', desc: 'Did C.S. Lewis refute Calvinism? A careful examination of how anti-Reformed writers misuse Lewis' },
                        { name: 'Does "The Whole World" in 1 John 2:2 Prove Universal Atonement?', href: '/demolition-1john2-2', desc: '1 John 2:2 — Does' },
                        { name: 'Does God Take Pleasure in Death? — Ezekiel 18:23 Explained', href: '/demolition-ezekiel18-23', desc: 'Exegetical demolition of the Arminian misuse of Ezekiel 18:23,32. Explores the two wills of God, covenantal context, and' },
                        { name: 'FACTS Check: Dismantling the Arminian Framework Point by Point', href: '/demolition-arminian-facts', desc: 'Seminary-level exegetical analysis dismantling the Society of Evangelical Arminians' },
                        { name: 'Hebrews 6:4-6 — Verse Demolition #10', href: '/demolition-hebrews6-4-6', desc: 'Demolition #10: Hebrews 6:4-6 — The' },
                        { name: 'Joshua 24:15 — Verse-by-Verse Demolition', href: '/demolition-joshua24-15', desc: 'Verse-by-verse exegetical demolition of the Arminian use of Joshua 24:15 as proof of libertarian free will. Scripture te' },
                        { name: 'Matthew 23:37 & Divine Sovereignty', href: '/demolition-matthew-23-37', desc: 'Matthew 23:37 is one of the top Arminian proof-texts. This page rescues the verse from misreading and shows how it actua' },
                        { name: 'Titus 2:11 — "The Grace of God Has Appeared to All"', href: '/demolition-titus2-11', desc: 'Demolition #17: Titus 2:11 and the' },
                        { name: 'What Is Prevenient Grace? Scripture\'s Answer', href: '/demolition-prevenient-grace', desc: 'The Prevenient Grace Reckoning: A comprehensive demolition of Arminian prevenient grace doctrine. Scripture teaches that' },
                        { name: 'What\'s the Strongest Case for Free Will?', href: '/demolition-steel-man-arminianism', desc: 'We present the best theological arguments for free will—then show why Scripture teaches something deeper about salvation' },
                        { name: 'When Philosophy Replaces Exegesis — Dismantling the Orthodox Case Against Predestination', href: '/demolition-orthodox-predestination', desc: 'A thorough exegetical dismantling of the Eastern Orthodox argument against Reformed predestination — exposing the geneti' }
                    ]
                },
                {
                    name: 'Logic & Philosophy',
                    icon: '🔭',
                    href: '/philosophy-problem-of-merit',
                    count: 12,
                    pages: [
                        { name: 'If You Chose God, What Makes You Different From Those Who Didn\'t?', href: '/philosophy-problem-of-merit', desc: 'The Problem of Merit: If you chose God, what makes you different from those who didn' },
                        { name: 'The Copernican Revolution of the Soul: Why Your Salvation Doesn\'t Revolve Around You', href: '/philosophy-copernican-revolution', desc: 'Just as Copernicus showed the Earth isn' },
                        { name: 'The Infinite Regress of Choice', href: '/philosophy-infinite-regress-of-choice', desc: 'Why' },
                        { name: 'The Mirror You Refuse to Look In: Why Grace Reveals What We Really Are', href: '/philosophy-mirror-you-refuse', desc: 'We reject God' },
                        { name: 'The Münchhausen Trilemma of Self-Salvation', href: '/philosophy-munchhausen-trilemma', desc: 'Every justification leads to infinite regress, circular reasoning, or an uncaused cause. Apply this to faith and you hit' },
                        { name: 'The Phantom Limb of Free Will: Feeling Free While Being Bound', href: '/philosophy-phantom-limb-free-will', desc: 'The brain feels sensation in amputated limbs that no longer exist. Fallen humanity feels free will in a faculty that was' },
                        { name: 'The Philosophical Case for Sovereignty', href: '/philosophy-hub', desc: 'Philosophical arguments for God' },
                        { name: 'The Resistance Is the Proof: Why We Blame God Before Ourselves', href: '/philosophy-resistance-is-proof', desc: 'When confronted with God' },
                        { name: 'Why Exclusive Love Is the Only Real Love', href: '/philosophy-exclusive-love', desc: 'A love that is extended to everyone equally is not love—it is policy. Real love requires distinction. Real love means yo' },
                        { name: 'Why Is Marriage Special? A Philosophical Proof of Election', href: '/philosophy-marriage-election', desc: 'Why is marriage special? Because someone chose YOU and no one else. Discover what this reveals about God' },
                        { name: 'Why You Can\'t See Your Own Spiritual Blindness', href: '/philosophy-self-deception', desc: 'Why you can' },
                        { name: 'Why You Can\'t Will Yourself to Sleep — And What It Proves About Grace', href: '/philosophy-sleep-surrender', desc: 'Why you can' }
                    ]
                },
                {
                    name: 'Secular Evidence',
                    icon: '🔬',
                    href: '/secular-evidence',
                    count: 12,
                    pages: [
                        { name: 'Art & Literature — How the Greatest Writers Intuited Reformed Truth', href: '/secular-art-literature-reformed-truth', desc: 'Shakespeare, Dostoevsky, Flannery O' },
                        { name: 'Sociology & Human Inability — Every Experiment Confirms Depravity', href: '/secular-sociology-human-inability', desc: 'The Milgram experiment, Stanford Prison Study, mob psychology, and groupthink research all confirm what Scripture teache' },
                        { name: 'The Algorithm Knows You Better Than You Know Yourself', href: '/secular-algorithm-sovereignty', desc: 'Netflix knows what you' },
                        { name: 'The Billion Decisions You Didn\'t Make Today', href: '/secular-billion-decisions', desc: 'Your body made billions of sovereign decisions today without asking your permission. Your heart beat. Your cells divided' },
                        { name: 'The Economics of Depravity — How Markets Prove Total Depravity', href: '/secular-economics-depravity', desc: 'Economics has always assumed what Scripture teaches: humans are self-interested, short-sighted, and prone to exploitatio' },
                        { name: 'The Hard Problem of Consciousness', href: '/secular-hard-problem-consciousness', desc: 'Science can map every synapse but cannot explain why it feels like something to be you. The Hard Problem of Consciousnes' },
                        { name: 'The History of Sovereignty — When Secular Historians Document Divine Control', href: '/secular-history-sovereignty', desc: 'Secular historians have documented patterns they cannot explain: the rise and fall of empires, the convergence of imposs' },
                        { name: 'The Neuroscience of Inability — Your Brain Decided Before You Did', href: '/secular-neuroscience-human-inability', desc: 'Neuroscience reveals that conscious' },
                        { name: 'The Philosophy of the Unfree Will — Secular Confirmation of Reformed Compatibilism', href: '/secular-philosophy-free-will', desc: 'Secular philosophy' },
                        { name: 'The Psychology of Bondage — Secular Science Proves Total Depravity', href: '/secular-psychology-bondage-of-will', desc: 'Modern psychology confirms what the Reformers taught 500 years ago: the human will is in bondage. Cognitive bias, addict' },
                        { name: 'What AI Teaches Us About Free Will and God\'s Sovereignty', href: '/secular-ai-determinism', desc: 'Large language models operate entirely deterministically—yet their choices appear free. This is compatibilism. And it' },
                        { name: 'Written Before You Were Born: DNA and Sovereignty', href: '/secular-genetics-sovereignty', desc: 'Behavioral genetics proves that personality, temperament, and moral intuitions are substantially heritable. You didn' }
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
                    count: 27,
                    pages: [
                        { name: '⚡ Are You Sure You\'re Saved?', href: '/psychology-cost-of-rejecting-grace', desc: 'This is not a theology lesson. This is an intervention. One question, five minutes, and the truth about whether your fai' },
                        { name: 'Reactance Theory & Divine Authority', href: '/psychology-reactance-theory', desc: 'Why your soul rebels when it hears the truth: reactance theory explains the automatic psychological resistance to God' },
                        { name: 'Terror Management and the Threat of Sovereignty', href: '/psychology-terror-management', desc: 'Terror Management Theory explains why God' },
                        { name: 'The Anosognosia of the Soul: Why You Can\'t See Your Own Spiritual Paralysis', href: '/psychology-anosognosia-of-sin', desc: 'A neurological condition reveals a spiritual reality: the damage that destroys your capacity to choose God also destroys' },
                        { name: 'The Art of Redefining Grace: How We Turn a Gift Into an Achievement', href: '/resistance-redefining-grace', desc: 'You think you understand grace. But have you unconsciously redefined it to include your own contribution? A gentle demol' },
                        { name: 'The Autonomy Illusion: Why "Free Will" Feels So Real', href: '/psychology-autonomy-illusion', desc: 'Neuroscience reveals that our sense of autonomous choice may be the brain' },
                        { name: 'The Credit Thief Inside Your Brain: Why You Think You Chose God', href: '/psychology-attribution-error', desc: 'The Fundamental Attribution Error explains why humans instinctively take credit for outcomes they didn' },
                        { name: 'The Last Idol: Why Self-Sovereignty Is the Hardest Thing to Surrender', href: '/resistance-last-idol', desc: 'Why self-sovereignty is the last idol to fall — even for believers. A deep psychological and theological exploration of ' },
                        { name: 'The Offense of Grace', href: '/psychology-offense-of-grace', desc: 'Why does unconditional election trigger moral outrage? Moral Foundations Theory, psychological reactance, and System Jus' },
                        { name: 'The Stockholm Syndrome of Sin: Why We Defend Our Bondage', href: '/psychology-stockholm-syndrome-sin', desc: 'Hostages bond with their captors. Sinners bond with their sin. Why the enslaved will fights for the prison and defends t' },
                        { name: 'The Sunk Cost of Self-Made Faith', href: '/psychology-sunk-cost-faith', desc: 'The sunk cost fallacy explains why believers resist grace the longer they' },
                        { name: 'What Every Recovering Addict Already Knows About Salvation', href: '/psychology-addiction-proof', desc: 'The 12 steps prove what Scripture teaches: the will is enslaved to sin, and freedom comes only through a power greater t' },
                        { name: 'When Your Heart Rejects What Your Mind Accepts', href: '/psychology-emotional-vs-rational', desc: 'When your head knows sovereignty is biblical but your heart rejects it. Dual-process theory, affect heuristic, and Haidt' },
                        { name: 'Why Believing You Saved Yourself Feels Right', href: '/psychology-comfort-self-salvation', desc: 'Why does it feel right that you chose God? Psychology reveals your ego' },
                        { name: 'Why Do People Reject What They Know Is True?', href: '/psychology-suppressing-truth', desc: 'Romans 1:18 reveals the deepest human problem: we suppress what we already know about God. Modern psychology calls it mo' },
                        { name: 'Why Do We Reject Grace? Pride Is the Root', href: '/psychology-pride-root-objection', desc: 'Why does grace provoke fury? Psychology and Scripture both reveal the answer: pride. Every objection to sovereignty defe' },
                        { name: 'Why Do We Resist Predestination? The Psychology Explained', href: '/psychology-why-we-resist', desc: 'Why do intelligent, Bible-believing Christians reject predestination? Psychology reveals motivated reasoning, cognitive ' },
                        { name: 'Why Does God\'s Sovereignty Terrify Us?', href: '/psychology-fear-control', desc: 'Why does God' },
                        { name: 'Why Evidence Makes Some People Believe Harder', href: '/psychology-backfire-effect', desc: 'Why does showing someone Scripture about election make them believe harder in free will? The backfire effect reveals how' },
                        { name: 'Why Grace Feels Like an Attack on Your Identity', href: '/psychology-identity-threat', desc: 'Why does grace feel like an attack on your identity? Identity-protective cognition explains how belief becomes self-conc' },
                        { name: 'Why People Defend the Theology That Enslaves Them', href: '/psychology-system-justification', desc: 'System Justification Theory explains why people defend unfair systems — even ones that hurt them. It also explains why m' },
                        { name: 'Why the Most Sincere Believers Are the Hardest to Reach', href: '/psychology-sincerity-trap', desc: 'Why the warmest, most sincere believers are often the hardest to reach. How sincerity becomes the armor against truth.' },
                        { name: 'Why the Truth That Makes You Angriest Is the One That Will Set You Free', href: '/psychology-hostility-reaction', desc: 'When a lifelong Christian suddenly becomes enraged at the doctrines of grace, something deeper than theology is happenin' },
                        { name: 'Why This Objection Proves Our Point — The Psychology of the Crown Jewel Defense', href: '/psychology-why-this-objection-proves-our-point', desc: 'The most common objection to the Crown Jewel argument —' },
                        { name: 'Why Your Church All Believes the Same Thing', href: '/psychology-groupthink', desc: 'Why do church friends all believe the same theology? Discover how conformity bias, groupthink, and social identity keep ' },
                        { name: 'Your Brain Decides Before You Do', href: '/psychology-illusion-free-will', desc: 'Neuroscience reveals what Scripture has always known: your brain decides before you do. What this means for' },
                        { name: 'Your Brain Is Lying to You — And the Bible Knew It First', href: '/psychology-cognitive-biases', desc: 'Cognitive biases mapped to biblical descriptions of fallen thinking. Confirmation bias, anchoring, Dunning-Kruger — mode' }
                    ]
                },
                {
                    name: 'Stories & Parables',
                    icon: '📜',
                    href: '/stories',
                    count: 20,
                    pages: [
                        { name: 'A Love Letter Written Before Time Began', href: '/story-the-letter-before-the-world', desc: 'She found a letter her father wrote before she was born — before he even knew he would adopt her. A tender story about b' },
                        { name: 'Can a Stone Heart Choose? The Surgeon\'s Parable on Regeneration', href: '/story-surgeon-stone-heart', desc: 'Can a stone heart choose? A surgeon gives a new heart without asking. A parable about regeneration and why dead hearts n' },
                        { name: 'Can You Save Yourself? A Parable About Grace and Human Effort', href: '/story-the-garden-that-grew-itself', desc: 'A powerful children' },
                        { name: 'Did You Really Choose God? — A Story About the Illusion of Free Will', href: '/story-the-room-where-you-chose', desc: 'Follow a golden thread back through time to discover the origin of your most important choice. A story about free will, ' },
                        { name: 'Did You Really Choose God? The Fish Who Thought He Chose the Ocean', href: '/story-the-fish-who-chose-the-ocean', desc: 'Did you choose God, or did God choose you? A parable about a fish who thought he chose the ocean—revealing the truth abo' },
                        { name: 'Martin Luther\'s Thunderstorm: How God Chose a Monk Before He Chose God', href: '/story-historical-luther-storm', desc: 'July 2, 1505. Martin Luther, a terrified law student, is struck by lightning and screams a vow that changes history. The' },
                        { name: 'The Altar He Built Himself — A Story About the Religion That Almost Killed Him', href: '/story-dark-the-altar-he-built-himself', desc: 'Marcus built his faith with his own hands — a perfect life, a perfect church, a perfect testimony. Then God tore it down' },
                        { name: 'The Committee to Save Yourself — A Satire on Works-Righteousness', href: '/story-humor-committee-to-save-yourself', desc: 'A town of drowning people forms a committee to rescue themselves. A satirical story about the absurdity of trying to sav' },
                        { name: 'The Day You Got to Choose Again — A Thought Experiment About Free Will and Grace', href: '/story-thought-the-day-you-chose-again', desc: 'What if God gave you the chance to choose Him again — but this time you could see everything clearly? A thought experime' },
                        { name: 'The Gardener Who Waited — When Your Child Walks Away from Faith', href: '/story-tender-the-gardener-who-waited', desc: 'A father tends a garden and grieves a prodigal son. A tender story about sovereignty, waiting, and the seeds only God ca' },
                        { name: 'The God Who Let You Watch — What If You Could See Yourself Being Chosen?', href: '/story-thought-the-god-who-let-you-watch', desc: 'What if God pulled back the curtain and let you watch the moment He chose you — before you existed, before the world beg' },
                        { name: 'The King Who Chose His Children — A Story About Being Chosen by God', href: '/story-children-the-king-who-chose', desc: 'A children' },
                        { name: 'The King\'s Banquet: A Parable About Election and Grace', href: '/story-the-kings-banquet', desc: 'Why doesn' },
                        { name: 'The Man Who Sued God for Saving Him Without Consent — A Satire on Free Will', href: '/story-humor-the-man-who-sued-god', desc: 'Gerald Pemberton filed a formal complaint against the Almighty for violating his autonomy by saving him without permissi' },
                        { name: 'The Night Augustine Stole the Pears — A Story About Total Depravity', href: '/story-historical-augustine-pears', desc: 'A story about Augustine at sixteen, stealing pears he didn' },
                        { name: 'The Orphanage: A Story About Being Chosen by Grace', href: '/story-the-orphanage', desc: 'The Orphanage: A powerful allegory exploring divine election. A girl discovers adoption papers signed before she was bor' },
                        { name: 'The Person Who Chose God — A Dark Thought Experiment', href: '/story-the-person-who-chose-god', desc: 'A haunting parable: Imagine someone who chose God entirely on their own—no grace, no regeneration, no gift of faith. Wha' },
                        { name: 'The Self-Made Man: A Story About Self-Salvation', href: '/story-the-self-made-man', desc: 'The self-made man who took credit for everything he didn' },
                        { name: 'The Woman Who Earned Her Seat — A Story About the Righteousness That Damns', href: '/story-dark-the-woman-who-earned-her-seat', desc: 'She tithed. She served. She never missed a Sunday. And when the worst sinner in town walked into her church forgiven, sh' },
                        { name: 'What If Everyone Was Dead and Didn\'t Know It? A Parable About Sin', href: '/story-the-dead-city', desc: 'An allegory about spiritual death and regeneration. Why the dead in sin cannot choose God—and why the Voice that awakens' }
                    ]
                },
                {
                    name: 'Analogies',
                    icon: '💡',
                    href: '/analogies-illustrations',
                    count: 9,
                    pages: [
                        { name: 'God\'s Sovereignty and Free Will: Does God Control Everything? (Explained)', href: '/analogy-chess-grandmaster', desc: 'Does God control everything? The chess grandmaster analogy explains how divine sovereignty and human choice coexist with' },
                        { name: 'The Drowning Man Who Thinks He\'s Swimming', href: '/analogy-drowning-man', desc: 'The crucial distinction between drowning and dead. Why' },
                        { name: 'The Lazarus Argument: Dead People Don\'t Choose to Live', href: '/analogy-lazarus-grave', desc: 'Does God force salvation or respect free will? John 11 shows how effectual calling works through Lazarus' },
                        { name: 'The Orchestra That Thinks It Wrote the Symphony', href: '/analogy-orchestra', desc: 'The Orchestra That Thinks It Wrote the Symphony — How an orchestra illuminates the relationship between God' },
                        { name: 'The River That Thinks It Chose Its Path', href: '/analogy-river', desc: 'A river flows freely—rushing, turning, cascading. But every twist was determined by terrain carved before the first drop' },
                        { name: 'The Song You Didn\'t Compose: Why Beauty Proves Grace', href: '/analogy-song-you-didnt-compose', desc: 'Beauty moves us without our permission. It acts on us from outside. That is exactly how grace works—and it' },
                        { name: 'What Does Adoption Teach About God\'s Choice?', href: '/analogy-adoption', desc: 'A baby doesn' },
                        { name: 'Who Turns On the Light? A Simple Picture of Regeneration', href: '/analogy-light-switch', desc: 'Can you choose to believe on your own? Explore why your ability to have faith is a gift from God, not something you gene' },
                        { name: 'Why the Spiritually Dead Cannot Choose God', href: '/analogy-doctor-corpse', desc: 'A corpse cannot choose to live. Neither can a spiritually dead person choose God. This stark analogy shatters the myth o' }
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
                    count: 16,
                    pages: [
                        { name: '20th Century Reformed Resurgence', href: '/history-20th-century', desc: 'The liberal decline, the Reformed comeback, and sovereign grace rediscovered. J. Gresham Machen, Martyn Lloyd-Jones, R.C' },
                        { name: 'John Calvin in Geneva: The Man Behind the Reformation\'s Theology', href: '/history-calvin-geneva', desc: 'John Calvin and Geneva: The Institutes of the Christian Religion, Geneva as a city on a hill, TULIP crystallized, and Ca' },
                        { name: 'Martin Luther and the Bondage of the Will: The Debate That Changed Everything', href: '/history-luther', desc: 'Martin Luther and the Reformation: the 95 Theses, The Bondage of the Will, Sola Fide, Sola Gratia, and the rediscovery o' },
                        { name: 'Medieval Theology and the Seeds of Reform (300-1400 AD)', href: '/history-medieval', desc: 'Medieval theology: Augustine vs Pelagius, Semi-Pelagianism' },
                        { name: 'The Apostolic Fathers and Early Church (100-300 AD)', href: '/history-apostolic', desc: 'The Apostolic Fathers (100-300 AD) on grace, election, and God' },
                        { name: 'The Canons of Dort — The Confessional Heart of Sovereign Grace', href: '/creed-canons-dort', desc: 'The Canons of Dort (1619): Full text with modern commentary on God' },
                        { name: 'The Council of Orange (529 AD) — The Heresy the Church Already Condemned', href: '/history-council-of-orange', desc: 'In 529 AD, the church formally condemned the belief that humans can initiate faith without God' },
                        { name: 'The Downgrade Controversy: When Spurgeon Stood Alone for Truth', href: '/history-spurgeon-downgrade', desc: 'Charles Spurgeon' },
                        { name: 'The Golden Thread — 2,000 Years of Sovereign Grace', href: '/history-golden-thread', desc: 'The Golden Thread: how God preserved the doctrines of grace through 2,000 years of church history — from Paul to Augusti' },
                        { name: 'The Great Awakening: When God\'s Sovereignty Set America on Fire', href: '/history-great-awakening', desc: 'The story of Jonathan Edwards and George Whitefield: how Calvinism ignited the Great Awakening and proved that sovereign' },
                        { name: 'The Heidelberg Catechism — My Only Comfort in Life and Death', href: '/creed-heidelberg-catechism', desc: 'The Heidelberg Catechism (1563): Key questions and answers on comfort, sin, deliverance, and gratitude — with modern com' },
                        { name: 'The Puritans and Reformed Orthodoxy', href: '/history-puritans', desc: 'Explore the golden age of Reformed theology. The Puritans' },
                        { name: 'The Synod of Dort: How the Church Defended Grace Against Works', href: '/history-dort', desc: 'Discover how the Synod of Dort crystallized the Five Points of Calvinism in response to Arminianism. The moment when the' },
                        { name: 'The Trial That Saved Christianity: Augustine vs Pelagius', href: '/history-augustine-pelagius', desc: 'The theological clash that shaped Christianity: Augustine' },
                        { name: 'The Truths of Grace Today', href: '/history-today', desc: 'Where sovereign grace stands now. Global spread of Reformed theology. Africa, Asia, Latin America. The digital reformati' },
                        { name: 'Written in Blood and Fire — The Story of the Reformed Confessions', href: '/history-confessions-story', desc: 'The dramatic stories behind the Reformed confessions: how martyrs, assemblies, and pastors forged the Heidelberg Catechi' }
                    ]
                },
                {
                    name: 'Theologian Profiles',
                    icon: '🧓',
                    href: '/theologians',
                    count: 11,
                    pages: [
                        { name: 'Amazing Grace: The Hymn That Proves What You Already Believe', href: '/hymn-amazing-grace', desc: 'You' },
                        { name: 'Augustine: The Rebel God Hunted Down and Made a Theologian', href: '/theologian-augustine', desc: 'Explore the life, theology, and enduring legacy of Augustine of Hippo—the Doctor of Grace whose writings on predestinati' },
                        { name: 'George Whitefield: The Voice That Shook a Nation Awake', href: '/theologian-whitefield', desc: 'George Whitefield: the greatest evangelist of the Great Awakening, a thoroughgoing Calvinist who proved that election fu' },
                        { name: 'Jacobus Arminius: The Man Behind the Movement', href: '/theologian-arminius', desc: 'A respectful but honest treatment of Jacobus Arminius. His background, training under Beza, the five Remonstrant article' },
                        { name: 'John Bunyan: The Tinker Who Wrote the Greatest Allegory of Grace', href: '/theologian-bunyan', desc: 'The Tinker of Bedford: John Bunyan' },
                        { name: 'John Calvin: Theologian of God\'s Sovereignty', href: '/theologian-calvin', desc: 'A comprehensive theological biography of John Calvin, the theologian of God' },
                        { name: 'John Owen: He Proved Christ Didn\'t Die in Vain', href: '/theologian-owen', desc: 'John Owen (1616–1683) — the theologian' },
                        { name: 'Jonathan Edwards: The Man Who Saw God\'s Sovereignty and Trembled', href: '/theologian-edwards', desc: 'Jonathan Edwards: America' },
                        { name: 'Martin Luther: The Monk Who Broke the Church to Save It', href: '/theologian-luther', desc: 'Martin Luther (1483–1546): The Reformation' },
                        { name: 'Spurgeon: The Prince of Preachers Who Couldn\'t Stop Talking About Grace', href: '/theologian-spurgeon', desc: 'Charles Haddon Spurgeon — the Prince of Preachers. Explore the life, theology, and enduring legacy of the greatest preac' },
                        { name: 'Thomas Boston: The Scottish Pastor Who Fought Legalism with Grace', href: '/theologian-boston', desc: 'The life and theology of Thomas Boston (1676–1732), the Marrow theologian who fought for free grace against legalism in ' }
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
                    count: 21,
                    pages: [
                        { name: 'A Letter to the Cold Church', href: '/devotional-cold-church', desc: 'Your heart used to burn. Now it' },
                        { name: 'Can God Stop Loving You?', href: '/devotional-never-gives-up', desc: 'Can God stop loving you? What if He decided before your birth to love you forever—and nothing you do could change His mi' },
                        { name: 'Can You Lose God\'s Love? What "Forever" Actually Means', href: '/devotional-forever-loved', desc: 'You' },
                        { name: 'Chosen Before You Were Broken', href: '/devotional-chosen-before-you-were-broken', desc: 'You were chosen before the creation of the world—before any sin, before any shame, before any breaking. A devotional for' },
                        { name: 'I Don\'t Think I\'m Saved', href: '/devotional-i-dont-think-im-saved', desc: 'You' },
                        { name: 'In Christ: The Two Words That Change Everything', href: '/devotional-in-christ', desc: 'A devotional meditation on union with Christ — the two most powerful words in Scripture. Every spiritual blessing flows ' },
                        { name: 'Love Before the World Was Made', href: '/devotional-love-before-the-world', desc: 'A meditative devotion on God' },
                        { name: 'My Chains Fell Away', href: '/devotional-my-chains-fell-away', desc: 'What does it feel like when God breaks your chains? A devotional on the moment grace becomes irresistible — when the sou' },
                        { name: 'The Dead Who Live — What Does It Mean to Be Spiritually Dead?', href: '/devotional-dead-who-live', desc: 'Ephesians 2:1 says you were dead — not struggling, not searching, dead. This devotional explores what spiritual death re' },
                        { name: 'The Glory of Divine Choice', href: '/devotional-glory-of-divine-choice', desc: 'You were chosen before the creation of the world. Not because you' },
                        { name: 'The God Who Wastes Nothing — When Your Suffering Has a Sovereign Purpose', href: '/devotional-the-god-who-wastes-nothing', desc: 'The pain you carry was not an accident. The God who numbered the hairs on your head numbered the tears on your face. A d' },
                        { name: 'The Good That I Cannot Do', href: '/devotional-good-i-cannot-do', desc: 'You have tried to be good. You know what happened. A devotional on Romans 7, human inability, and why' },
                        { name: 'The Hands That Hold You', href: '/devotional-the-hands-that-hold-you', desc: 'Your faith is not held up by your grip. It is held in the hands of God. A devotional for anyone terrified they will lose' },
                        { name: 'The Love Letter Dated Before Time', href: '/devotional-love-letter-before-time', desc: 'What if you found a letter written to you before you were born — before the world was born? Ephesians 1:3-14 as God' },
                        { name: 'The Prayer You Didn\'t Pray — When Even Crying Out Is Grace', href: '/devotional-the-prayer-you-didnt-pray', desc: 'You think you reached out to God. But what if God reached out first—and the prayer was the proof? A devotional on the gr' },
                        { name: 'The Weakness of God\'s Strength', href: '/devotional-weakness-of-gods-strength', desc: 'A meditative reflection on divine sovereignty in suffering. Explore how God' },
                        { name: 'Valley of the Shadow', href: '/devotional-valley-shadow', desc: 'Psalm 23 doesn' },
                        { name: 'What If Surrendering Your Will Is Where Joy Begins?', href: '/devotional-not-my-will-but-joy', desc: 'Sovereignty sounds like prison until you' },
                        { name: 'When God Says No — A Devotional on Unanswered Prayer', href: '/devotional-when-god-says-no', desc: 'Sometimes God says no. And His refusal is more loving than our yes would have been. A devotional meditation on unanswere' },
                        { name: 'You Didn\'t Ask to Be Saved. God Did It Anyway.', href: '/devotional-rescued-without-a-say', desc: 'Grace didn' },
                        { name: 'Your Name Was Written Before You Were Born — Adoption and Grace', href: '/devotional-adoption-papers', desc: 'A baby doesn' }
                    ]
                },
                {
                    name: 'Healing & Hope',
                    icon: '💚',
                    href: '/anxious-mind-what-if-not-chosen',
                    count: 36,
                    pages: [
                        { name: '82% of People Are Lonely — Why That\'s a Theological Problem', href: '/invisible-wall-lonely-theological', desc: 'Loneliness is not a social problem—it' },
                        { name: 'The Anxious Mind: Intrusive Thoughts, Fear & Faith', href: '/anxious-mind-hub', desc: 'The intrusive thoughts. The terror that your faith isn' },
                        { name: 'The Broken Mirror: Identity, Performance & Self-Worth', href: '/broken-mirror-hub', desc: 'You believe you' },
                        { name: 'The Child You Never Held — Miscarriage, Infant Loss, and the God Who Knows Their Name', href: '/open-wound-miscarriage', desc: 'You are grieving someone the world tells you to get over. But you carried them. You loved them. And the God who knit the' },
                        { name: 'The Christian Who Feels Like a Fraud', href: '/broken-mirror-imposter-syndrome', desc: 'The Christian who feels like a fraud. Imposter syndrome about faith, and why sovereignty destroys it entirely.' },
                        { name: 'The Friend Who Left When Your Theology Changed', href: '/invisible-wall-friend-who-left', desc: 'What happens when you discover the truth about God' },
                        { name: 'The Invisible Wall: Relationships, Loneliness & Forgiveness', href: '/invisible-wall-hub', desc: '82% of people report experiencing loneliness. But God' },
                        { name: 'The Open Wound — Suffering & God\'s Sovereignty', href: '/open-wound-hub', desc: 'The Open Wound: Suffering, Grief & Trauma. For those who have lost someone, live with pain, survived abuse, or asked why' },
                        { name: 'The Performance Treadmill: When \'Doing Enough for God\' Becomes a Prison', href: '/broken-mirror-performance-treadmill', desc: 'You believe God' },
                        { name: 'The Question That Haunts Every Hospital Room', href: '/open-wound-hospital-room', desc: 'The Question That Haunts Every Hospital Room: Why do bad things happen to good people? Scripture' },
                        { name: 'The Shattered Lens — Truth, Trust & the Modern Crisis of Belief', href: '/shattered-lens-hub', desc: 'The Shattered Lens: Truth, Trust & the Modern Crisis of Belief. In a world of deepfakes, AI, misinformation, and politic' },
                        { name: 'The Sin You Keep Repeating', href: '/broken-mirror-sin-you-repeat', desc: 'Trapped in recurring sin and believing you' },
                        { name: 'The Thoughts You Can\'t Stop — When Your Mind Becomes a War Zone', href: '/anxious-mind-intrusive-thoughts', desc: 'Intrusive thoughts, blasphemous images, unwanted mental loops — they don' },
                        { name: 'The Thoughts You Can\'t Stop Thinking', href: '/anxious-mind-scrupulosity', desc: 'The intrusive blasphemous thoughts, the fear of the unforgivable sin, the terror that your faith isn' },
                        { name: 'What If I\'m Not One of the Chosen?', href: '/anxious-mind-what-if-not-chosen', desc: 'What if I' },
                        { name: 'When Everything You Were Taught Was Wrong', href: '/shattered-lens-taught-wrong', desc: 'You grew up believing one thing about God. Now Scripture is showing you something different. That disorientation isn' },
                        { name: 'When God Goes Silent', href: '/shattered-lens-silence-of-god', desc: 'When God goes silent and faith shatters. A healing page for those who prayed and heard nothing—discovering that silence ' },
                        { name: 'When God Is Sovereign and the Nursery Is Empty: Sovereignty and Miscarriage', href: '/open-wound-empty-nursery', desc: 'You believe God is in control. And then the ultrasound goes silent. How do you hold sovereignty and miscarriage in the s' },
                        { name: 'When God Is Sovereign and Your World Just Collapsed', href: '/open-wound-sovereignty-in-grief', desc: 'When God Is Sovereign and Your World Just Collapsed: Grief doesn' },
                        { name: 'When Grace Feels Too Good to Be True', href: '/broken-mirror-grace-too-good', desc: 'Your suspicion of grace isn' },
                        { name: 'When Prayer Stopped Working', href: '/shattered-lens-when-prayer-stopped-working', desc: 'You used to pray and feel something. Now you pray and hear nothing. The silence is deafening — and you' },
                        { name: 'When the Church Becomes the Wound', href: '/open-wound-betrayed-by-church', desc: 'When the people meant to represent God become the wound itself. A healing page for those betrayed by the church, disting' },
                        { name: 'When the Death Makes No Sense: Sovereignty and the Loss That Has No Explanation', href: '/open-wound-senseless-death', desc: 'A gentle place to grieve a death that seems pointless, arbitrary, cruel. You don' },
                        { name: 'When the Diagnosis Is Terminal: Sovereignty and the End You Didn\'t Choose', href: '/open-wound-terminal-diagnosis', desc: 'When the doctor says there' },
                        { name: 'When You and Your Spouse Speak Different Languages', href: '/invisible-wall-marriage', desc: 'For Reformed believers whose spouse doesn' },
                        { name: 'When You Can\'t Tell What\'s True Anymore', href: '/shattered-lens-cant-tell-true', desc: 'When You Can' },
                        { name: 'When You Can\'t Unsee It: The Beautiful Terror of Seeing Clearly', href: '/shattered-lens-cant-unsee-it', desc: 'When the Bible suddenly reveals God' },
                        { name: 'When You See It and Your Church Doesn\'t: The Loneliness of Singing Alone', href: '/invisible-wall-singing-alone', desc: 'You love your church. You love the people. But something has changed in you—and now the sermons feel incomplete. What do' },
                        { name: 'When You\'re the Only One Who Sees It', href: '/invisible-wall-only-one-who-sees', desc: 'You' },
                        { name: 'When Your Family Can\'t Follow You: The Invisible Wall at the Dinner Table', href: '/invisible-wall-family', desc: 'What happens when God changes your theology and your family doesn' },
                        { name: 'When Your Pastor Teaches What You Know Isn\'t True', href: '/shattered-lens-pastor', desc: 'Navigating the pain of disagreeing with your pastor' },
                        { name: 'Why You Can Sleep When the World Is Falling Apart', href: '/anxious-mind-sovereignty-of-sleep', desc: 'Why You Can Sleep When the World Is Falling Apart — How God' },
                        { name: 'You Are Not a Self-Made Anything', href: '/broken-mirror-not-self-made', desc: 'You Are Not a Self-Made Anything. Culture screams' },
                        { name: 'You Were Never Meant to Carry This', href: '/anxious-mind-never-meant-to-carry', desc: 'You Were Never Meant to Carry This — why anxiety is the logical result of believing everything depends on you, and how G' },
                        { name: 'You Were Not an Accident — You Were Created for Mercy', href: '/broken-mirror-vessels-for-mercy', desc: 'You weren' },
                        { name: 'Your Brain Decides Before You Do — And That\'s Good News', href: '/anxious-mind-brain-decides', desc: 'Neuroscience shows your brain decides before' }
                    ]
                },
                {
                    name: 'Pastoral',
                    icon: '🤝',
                    href: '/pastoral-assurance',
                    count: 5,
                    pages: [
                        { name: 'Can I Be Sure I\'m Saved? Assurance of Salvation in Reformed Theology', href: '/pastoral-assurance', desc: 'Can I be sure I' },
                        { name: 'Evangelism & God\'s Sovereignty', href: '/pastoral-evangelism', desc: 'If God has already chosen who will be saved, why share the gospel? Because Scripture teaches that evangelism is the very' },
                        { name: 'Prayer & God\'s Sovereign Decrees', href: '/pastoral-prayer', desc: 'If God has already decreed all things, why pray? Because Scripture teaches that prayer is not a backup plan — it is the ' },
                        { name: 'Suffering & the Sovereignty of God', href: '/pastoral-suffering', desc: 'How God' },
                        { name: 'When Theology Meets Your Soul — Pastoral Guidance in Grace', href: '/pastoral-hub', desc: 'Pastoral guidance for the soul: assurance in doubt, courage in evangelism, power in prayer, comfort in suffering. Grace ' }
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

        html += '<div class="mega-menu-detail-title">' + subcat.icon + ' ' + escapeHtml(subcat.name) + '</div>';
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

        if (subcat.pages.length > maxShow) {
            html += '<a href="' + escapeAttr(subcat.href) + '" class="mega-menu-view-all-subcat">View all ' + subcat.count + ' articles in ' + escapeHtml(subcat.name) + ' →</a>';
        } else if (subcat.href) {
            html += '<a href="' + escapeAttr(subcat.href) + '" class="mega-menu-view-all-subcat">Go to ' + escapeHtml(subcat.name) + ' hub →</a>';
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
            html += '<span class="mobile-accordion-icon">' + umbrella.icon + '</span>';
            html += '<span class="mobile-accordion-umbrella-name">' + escapeHtml(umbrella.umbrella) + '</span>';
            html += '<span class="mobile-accordion-umbrella-count">' + totalPages + '</span>';
            html += '<span class="chevron">▼</span>';
            html += '</div>';
            html += '<div class="mobile-accordion-subcats" id="' + umbrellaId + '">';

            // Hub page link (first item in expanded umbrella)
            if (umbrella.href) {
                html += '<a href="' + escapeAttr(umbrella.href) + '" class="mobile-accordion-hub-link">' + umbrella.icon + ' View ' + escapeHtml(umbrella.umbrella) + ' Hub →</a>';
            }

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
                if (subcat.pages.length > mobileMax) {
                    html += '<a href="' + escapeAttr(subcat.href) + '" class="mobile-accordion-view-all-subcat">View all ' + subcat.count + ' articles →</a>';
                } else if (subcat.href) {
                    html += '<a href="' + escapeAttr(subcat.href) + '" class="mobile-accordion-view-all-subcat">Go to ' + escapeHtml(subcat.name) + ' →</a>';
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
