#!/usr/bin/env node
/**
 * auto-linker.js — Adds Wikipedia-style internal hyperlinks to all article pages.
 *
 * Scans every article page's prose content and adds inline <a> links
 * to other pages on the site wherever key concepts, doctrines, Scripture
 * references, theologians, or analogies are mentioned.
 *
 * SAFETY:
 * - Only modifies text inside <p>, <li>, <blockquote>, <h2>, <h3> tags
 * - Never touches HTML attributes, class names, href values, or <script>/<style>
 * - Links first mention only per page (Wikipedia style)
 * - Never nests links (won't add <a> inside existing <a>)
 * - Won't link a page to itself
 *
 * Usage: node auto-linker.js [--dry-run] [--file=specific-page.html]
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DRY_RUN = process.argv.includes('--dry-run');
const SINGLE_FILE = process.argv.find(a => a.startsWith('--file='));

// ═══════════════════════════════════════
// KEYWORD → PAGE MAPPING
// ═══════════════════════════════════════
// Each entry: { url: '/page-slug', keywords: ['phrase1', 'phrase2', ...], priority: N }
// Higher priority = linked preferentially when keywords overlap
// Keywords are case-insensitive. Longer phrases matched first automatically.

const LINK_MAP = [
    // ── SYSTEMATIC THEOLOGY ──
    { url: '/systematic-hamartiology', keywords: ['total depravity', 'hamartiology', 'original sin', 'sin nature', 'depravity of man', 'radical corruption'], priority: 10 },
    { url: '/systematic-election', keywords: ['unconditional election', 'doctrine of election', 'God chose', 'God chooses', 'chose us before', 'elected by God', 'election in Scripture'], priority: 10 },
    { url: '/systematic-atonement', keywords: ['definite atonement', 'limited atonement', 'particular redemption', 'for whom Christ died', 'particular atonement'], priority: 10 },
    { url: '/systematic-soteriology', keywords: ['soteriology', 'order of salvation', 'salvation theology'], priority: 8 },
    { url: '/systematic-regeneration', keywords: ['regeneration', 'born again', 'new birth', 'spiritual rebirth', 'regeneration precedes faith'], priority: 9 },
    { url: '/systematic-justification', keywords: ['justification', 'justified by faith', 'imputed righteousness', 'declared righteous'], priority: 8 },
    { url: '/systematic-ordo-salutis', keywords: ['ordo salutis', 'order of salvation', 'golden chain of salvation', 'golden chain'], priority: 9 },
    { url: '/systematic-christology', keywords: ['christology', 'nature of Christ', 'person of Christ', 'hypostatic union'], priority: 7 },
    { url: '/systematic-pneumatology', keywords: ['pneumatology', 'work of the Holy Spirit', 'work of the Spirit'], priority: 7 },
    { url: '/systematic-theology-proper', keywords: ['theology proper', 'doctrine of God', 'attributes of God', 'nature of God'], priority: 7 },
    { url: '/systematic-trinity', keywords: ['the Trinity', 'triune God', 'three persons'], priority: 7 },
    { url: '/systematic-compatibilism', keywords: ['compatibilism', 'compatibilist', 'divine sovereignty and human responsibility'], priority: 8 },
    { url: '/systematic-divine-decrees', keywords: ['divine decrees', 'decrees of God', 'God\'s eternal decree', 'eternal decree'], priority: 8 },
    { url: '/systematic-covenant-theology', keywords: ['covenant theology', 'covenant of grace', 'covenant of works', 'covenant of redemption'], priority: 7 },
    { url: '/systematic-salvation', keywords: ['doctrines of grace', 'five points of grace', 'sovereign grace'], priority: 9 },
    { url: '/systematic-bibliology', keywords: ['bibliology', 'inerrancy of Scripture', 'authority of Scripture', 'sola scriptura'], priority: 6 },
    { url: '/systematic-anthropology', keywords: ['theological anthropology', 'image of God', 'imago Dei'], priority: 6 },
    { url: '/systematic-ecclesiology', keywords: ['ecclesiology', 'doctrine of the church', 'visible and invisible church'], priority: 5 },
    { url: '/systematic-prolegomena', keywords: ['prolegomena', 'theological method'], priority: 4 },
    { url: '/systematic-resurrection', keywords: ['resurrection of the dead', 'bodily resurrection', 'resurrection theology'], priority: 5 },

    // ── SCRIPTURE QUESTION PAGES ──
    { url: '/question-faithgift', keywords: ['faith is a gift', 'faith as a gift', 'gift of faith', 'Ephesians 2:8-9', 'Ephesians 2:8', 'Eph 2:8-9', 'Eph 2:8'], priority: 10 },
    { url: '/question-john6', keywords: ['John 6:44', 'John 6:37', 'John 6:65', 'no one can come to me unless', 'the Father draws', 'all that the Father gives me'], priority: 10 },
    { url: '/question-romans9', keywords: ['Romans 9', 'Rom 9', 'Jacob I loved', 'Esau I hated', 'potter and clay', 'vessels of wrath', 'vessels of mercy'], priority: 10 },
    { url: '/question-goldchain', keywords: ['Romans 8:29-30', 'Romans 8:28-30', 'Rom 8:29-30', 'foreknew, predestined, called, justified, glorified', 'golden chain of redemption'], priority: 9 },
    { url: '/question-john10', keywords: ['John 10:27', 'John 10:28', 'John 10:26', 'my sheep hear my voice', 'my sheep listen to my voice', 'no one will snatch them'], priority: 9 },
    { url: '/question-chosen', keywords: ['Ephesians 1:4', 'Eph 1:4', 'chose us in him before', 'chosen before the foundation', 'before the creation of the world'], priority: 9 },
    { url: '/question-perseverance', keywords: ['perseverance of the saints', 'eternal security', 'once saved always saved', 'preservation of the saints', 'Philippians 1:6'], priority: 9 },
    { url: '/question-irresistible', keywords: ['irresistible grace', 'effectual calling', 'effectual call', 'efficacious grace'], priority: 9 },
    { url: '/question-foreknowledge', keywords: ['foreknowledge', 'God\'s foreknowledge', 'divine foreknowledge', 'foreknew'], priority: 8 },
    { url: '/question-depravity', keywords: ['dead in sin', 'dead in trespasses', 'dead in transgressions', 'Ephesians 2:1', 'Eph 2:1', 'spiritually dead'], priority: 9 },
    { url: '/question-freewill', keywords: ['free will', 'human free will', 'libertarian free will', 'freedom of the will'], priority: 8 },
    { url: '/question-hardening', keywords: ['God hardened', 'hardening of Pharaoh', 'hardened heart', 'Pharaoh\'s heart'], priority: 7 },
    { url: '/question-newheart', keywords: ['Ezekiel 36:26', 'new heart', 'heart of stone', 'heart of flesh', 'I will give you a new heart'], priority: 8 },
    { url: '/question-john15', keywords: ['John 15:16', 'you did not choose me', 'I chose you'], priority: 8 },
    { url: '/question-john17', keywords: ['John 17', 'high priestly prayer'], priority: 6 },
    { url: '/question-matt11', keywords: ['Matthew 11:27', 'Matt 11:27', 'no one knows the Father except', 'the Son chooses to reveal'], priority: 7 },
    { url: '/question-acts', keywords: ['Acts 13:48', 'appointed for eternal life', 'all who were appointed'], priority: 9 },
    { url: '/question-book-of-life', keywords: ['book of life', 'Lamb\'s book of life', 'names written before'], priority: 7 },
    { url: '/question-sealed', keywords: ['sealed by the Spirit', 'sealed with the Holy Spirit', 'Ephesians 1:13', 'Eph 1:13'], priority: 7 },
    { url: '/question-whosoever', keywords: ['whosoever', 'whoever believes', 'John 3:16'], priority: 8 },
    { url: '/question-boasting', keywords: ['no boasting', 'excludes boasting', 'boasting is excluded'], priority: 7 },
    { url: '/question-parables', keywords: ['parables of grace', 'parable of the sower', 'parable of the talents', 'parables and election'], priority: 6 },
    { url: '/question-sovereignty-logic', keywords: ['sovereignty and logic', 'logical necessity of sovereignty'], priority: 6 },
    { url: '/question-2tim1-9', keywords: ['2 Timothy 1:9', '2 Tim 1:9', 'saved us and called us', 'before the beginning of time'], priority: 7 },
    { url: '/question-1peter1', keywords: ['1 Peter 1:1-2', '1 Peter 1:2', '1 Pet 1:2', 'elect according to foreknowledge', 'chosen according to the foreknowledge'], priority: 7 },
    { url: '/question-1john5-1', keywords: ['1 John 5:1', '1 Jn 5:1', 'everyone who believes is born of God'], priority: 7 },
    { url: '/question-ezekiel37', keywords: ['Ezekiel 37', 'valley of dry bones', 'dry bones'], priority: 7 },
    { url: '/question-isaiah53', keywords: ['Isaiah 53', 'suffering servant'], priority: 6 },
    { url: '/question-psalm139', keywords: ['Psalm 139', 'Ps 139', 'knit me together', 'fearfully and wonderfully made'], priority: 6 },
    { url: '/question-revelation13', keywords: ['Revelation 13:8', 'Rev 13:8', 'slain from the creation of the world', 'written before the foundation'], priority: 7 },
    { url: '/question-titus3', keywords: ['Titus 3:5', 'washing of rebirth', 'renewal by the Holy Spirit', 'not because of righteous things'], priority: 7 },
    { url: '/question-where-did-your-faith-come-from', keywords: ['where did your faith come from', 'origin of faith'], priority: 8 },
    { url: '/question-is-salvation-my-choice-or-gods', keywords: ['is salvation my choice or God\'s'], priority: 6 },
    { url: '/question-predestined-to-hell', keywords: ['predestined to hell', 'reprobation', 'double predestination'], priority: 7 },
    { url: '/question-unfair', keywords: ['is election unfair', 'is predestination unfair', 'God is not fair'], priority: 6 },
    { url: '/question-proverbs-sovereignty', keywords: ['Proverbs and sovereignty', 'Proverbs 16:9', 'Proverbs 16:33', 'Proverbs 21:1'], priority: 6 },
    { url: '/question-cannot', keywords: ['cannot come to God', 'inability to come'], priority: 7 },
    { url: '/question-how-grace-feels', keywords: ['how grace feels', 'what grace feels like', 'experience of grace'], priority: 6 },
    { url: '/question-external-internal-call', keywords: ['external call', 'internal call', 'general call and effectual call', 'outward call'], priority: 7 },

    // ── DEMOLITION PAGES ──
    { url: '/demolition-john3-16', keywords: ['John 3:16 does not teach', 'John 3:16 actually means', 'God so loved the world does not mean'], priority: 7 },
    { url: '/demolition-prevenient-grace', keywords: ['prevenient grace', 'enabling grace', 'preceding grace'], priority: 9 },
    { url: '/demolition-faith-is-not-a-gift', keywords: ['faith is not a gift objection', 'Ephesians 2:8 does not mean'], priority: 7 },
    { url: '/demolition-2peter3-9', keywords: ['2 Peter 3:9', '2 Pet 3:9', 'not wanting anyone to perish', 'not willing that any should perish'], priority: 8 },
    { url: '/demolition-1tim2-4', keywords: ['1 Timothy 2:4', '1 Tim 2:4', 'wants all people to be saved', 'God desires all men to be saved'], priority: 8 },
    { url: '/demolition-joshua24-15', keywords: ['Joshua 24:15', 'choose for yourselves this day', 'choose this day whom you will serve'], priority: 7 },
    { url: '/demolition-rev3-20', keywords: ['Revelation 3:20', 'Rev 3:20', 'I stand at the door and knock', 'behold I stand at the door'], priority: 7 },
    { url: '/demolition-matt23-37', keywords: ['Matthew 23:37', 'Matt 23:37', 'how often I have longed to gather', 'O Jerusalem'], priority: 7 },
    { url: '/demolition-acts7-51', keywords: ['Acts 7:51', 'you always resist the Holy Spirit', 'resisting the Holy Spirit'], priority: 7 },
    { url: '/demolition-hebrews6-4-6', keywords: ['Hebrews 6:4-6', 'Heb 6:4-6', 'fallen away', 'losing salvation', 'impossible to restore'], priority: 7 },
    { url: '/demolition-steel-man-arminianism', keywords: ['steel man Arminianism', 'strongest case for Arminianism', 'best Arminian arguments'], priority: 6 },
    { url: '/demolition-arminian-facts', keywords: ['Arminian facts', 'facts Arminians must face'], priority: 5 },
    { url: '/demolition-romans10-9', keywords: ['Romans 10:9', 'Rom 10:9', 'confess with your mouth', 'believe in your heart'], priority: 7 },
    { url: '/demolition-1john2-2', keywords: ['1 John 2:2', '1 Jn 2:2', 'propitiation for the whole world', 'atoning sacrifice for the whole world'], priority: 7 },

    // ── OBJECTION PAGES ──
    { url: '/objection-fairness', keywords: ['election is unfair', 'predestination is unfair', 'unfairness of election', 'that\'s not fair'], priority: 7 },
    { url: '/objection-robots', keywords: ['robots objection', 'are we robots', 'puppets on strings', 'does election make us robots'], priority: 7 },
    { url: '/objection-love', keywords: ['forced love isn\'t love', 'God can\'t force love', 'love requires free will', 'love must be chosen'], priority: 7 },
    { url: '/objection-author-of-sin', keywords: ['author of sin', 'makes God the author of sin', 'God causes sin'], priority: 7 },
    { url: '/objection-evangelism-pointless', keywords: ['evangelism is pointless', 'why evangelize if God predestines', 'evangelism and predestination'], priority: 7 },
    { url: '/objection-why-pray', keywords: ['why pray if God is sovereign', 'prayer and sovereignty', 'does prayer change God\'s mind'], priority: 7 },
    { url: '/objection-responsibility', keywords: ['human responsibility', 'moral responsibility', 'responsible if God predestines'], priority: 7 },
    { url: '/objection-why-not-save-everyone', keywords: ['why doesn\'t God save everyone', 'why not save all', 'God could save everyone'], priority: 7 },
    { url: '/objection-desire', keywords: ['God desires all to be saved objection', 'if God wants all saved'], priority: 6 },
    { url: '/objection-faith-choice', keywords: ['faith is a choice', 'I chose to believe', 'believing is my choice'], priority: 7 },

    // ── PSYCHOLOGY PAGES ──
    { url: '/psychology-cost-of-rejecting-grace', keywords: ['cost of rejecting grace', 'what it costs to reject grace'], priority: 8 },
    { url: '/psychology-why-we-resist', keywords: ['why we resist grace', 'resistance to grace', 'why people reject election'], priority: 8 },
    { url: '/psychology-identity-threat', keywords: ['identity threat', 'grace threatens identity', 'ego threat'], priority: 7 },
    { url: '/psychology-backfire-effect', keywords: ['backfire effect', 'belief perseverance', 'doubling down'], priority: 7 },
    { url: '/psychology-cognitive-biases', keywords: ['cognitive biases', 'bias against grace', 'self-serving bias'], priority: 6 },
    { url: '/psychology-pride-root-objection', keywords: ['pride is the root', 'root of every objection', 'pride and objections'], priority: 7 },
    { url: '/psychology-suppressing-truth', keywords: ['suppressing the truth', 'Romans 1:18', 'suppress the truth in unrighteousness'], priority: 8 },
    { url: '/psychology-reactance-theory', keywords: ['reactance theory', 'psychological reactance'], priority: 6 },
    { url: '/psychology-illusion-free-will', keywords: ['illusion of free will', 'free will is an illusion'], priority: 7 },
    { url: '/psychology-hostility-reaction', keywords: ['hostility to grace', 'anger at election', 'hostile reaction to sovereignty'], priority: 7 },
    { url: '/psychology-stockholm-syndrome-sin', keywords: ['Stockholm syndrome', 'bondage to sin', 'in love with captivity'], priority: 6 },
    { url: '/psychology-sunk-cost-faith', keywords: ['sunk cost', 'sunk cost fallacy', 'invested too much to change'], priority: 6 },
    { url: '/psychology-fear-control', keywords: ['fear of losing control', 'need for control', 'control and sovereignty'], priority: 6 },
    { url: '/psychology-offense-of-grace', keywords: ['offense of grace', 'scandal of grace', 'grace is offensive'], priority: 7 },
    { url: '/psychology-sincerity-trap', keywords: ['sincerity trap', 'sincerely wrong'], priority: 6 },
    { url: '/psychology-anosognosia-of-sin', keywords: ['anosognosia', 'unaware of own condition', 'cannot see own sin'], priority: 6 },
    { url: '/psychology-autonomy-illusion', keywords: ['autonomy illusion', 'illusion of autonomy', 'false sense of autonomy'], priority: 6 },

    // ── PHILOSOPHY PAGES ──
    { url: '/philosophy-infinite-regress-of-choice', keywords: ['infinite regress of choice', 'infinite regress', 'who chose the chooser'], priority: 7 },
    { url: '/philosophy-self-deception', keywords: ['self-deception', 'self-deceived', 'deceiving yourself', 'we deceive ourselves'], priority: 7 },
    { url: '/philosophy-copernican-revolution', keywords: ['Copernican revolution', 'theological Copernican revolution'], priority: 6 },
    { url: '/philosophy-resistance-is-proof', keywords: ['resistance is proof', 'your resistance proves'], priority: 7 },
    { url: '/philosophy-munchhausen-trilemma', keywords: ['Münchhausen trilemma', 'Munchhausen trilemma', 'bootstrap problem'], priority: 6 },
    { url: '/philosophy-problem-of-merit', keywords: ['problem of merit', 'merit-based salvation'], priority: 6 },
    { url: '/philosophy-phantom-limb-free-will', keywords: ['phantom limb', 'phantom free will'], priority: 5 },

    // ── ANALOGY PAGES ──
    { url: '/analogy-lazarus-grave', keywords: ['Lazarus at the grave', 'Lazarus analogy', 'Lazarus couldn\'t choose to rise'], priority: 7 },
    { url: '/analogy-doctor-corpse', keywords: ['doctor and a corpse', 'you don\'t heal a corpse', 'medicine to a dead man'], priority: 6 },
    { url: '/analogy-drowning-man', keywords: ['drowning man analogy', 'drowning man illustration', 'God didn\'t throw a rope'], priority: 6 },
    { url: '/analogy-light-switch', keywords: ['light switch analogy', 'who flipped the switch'], priority: 5 },
    { url: '/analogy-adoption', keywords: ['adoption analogy', 'adopted by grace', 'spiritual adoption'], priority: 7 },
    { url: '/analogy-orchestra', keywords: ['orchestra analogy', 'divine conductor'], priority: 5 },
    { url: '/analogy-chess-grandmaster', keywords: ['chess grandmaster analogy', 'divine chess', 'God plays chess'], priority: 5 },
    { url: '/analogy-river', keywords: ['river analogy', 'river of grace'], priority: 5 },
    { url: '/analogy-song-you-didnt-compose', keywords: ['song you didn\'t compose', 'faith is a song'], priority: 5 },

    // ── STORY PAGES ──
    { url: '/story-the-dead-city', keywords: ['the dead city', 'city of the dead'], priority: 5 },
    { url: '/story-the-orphanage', keywords: ['the orphanage story', 'orphanage parable'], priority: 5 },
    { url: '/story-the-kings-banquet', keywords: ['the king\'s banquet', 'king\'s banquet parable'], priority: 5 },
    { url: '/story-the-fish-who-chose-the-ocean', keywords: ['fish who chose the ocean', 'fish in a bowl'], priority: 5 },
    { url: '/story-surgeon-stone-heart', keywords: ['surgeon and the stone heart', 'stone heart surgery'], priority: 5 },

    // ── THEOLOGIAN PAGES ──
    { url: '/theologian-augustine', keywords: ['Augustine of Hippo', 'Augustine', 'St. Augustine'], priority: 6 },
    { url: '/theologian-calvin', keywords: ['John Calvin', 'Calvin\'s Institutes', 'Calvin taught'], priority: 6 },
    { url: '/theologian-luther', keywords: ['Martin Luther', 'Luther\'s theology', 'Luther wrote'], priority: 6 },
    { url: '/theologian-edwards', keywords: ['Jonathan Edwards', 'Edwards preached', 'Edwards argued'], priority: 6 },
    { url: '/theologian-spurgeon', keywords: ['Charles Spurgeon', 'Spurgeon preached', 'Spurgeon said', 'the Prince of Preachers'], priority: 6 },
    { url: '/theologian-owen', keywords: ['John Owen', 'Owen\'s Death of Death', 'Owen argued'], priority: 6 },
    { url: '/theologian-whitefield', keywords: ['George Whitefield', 'Whitefield preached'], priority: 5 },
    { url: '/theologian-bunyan', keywords: ['John Bunyan', 'Pilgrim\'s Progress', 'Bunyan wrote'], priority: 5 },
    { url: '/theologian-arminius', keywords: ['Jacobus Arminius', 'Arminius taught', 'Arminius himself'], priority: 5 },
    { url: '/theologian-boston', keywords: ['Thomas Boston', 'The Marrow of Modern Divinity', 'Boston wrote'], priority: 4 },

    // ── HISTORY PAGES ──
    { url: '/history-augustine-pelagius', keywords: ['Pelagian controversy', 'Augustine vs Pelagius', 'Pelagianism', 'Pelagius'], priority: 7 },
    { url: '/history-dort', keywords: ['Synod of Dort', 'Canons of Dort'], priority: 6 },
    { url: '/history-luther', keywords: ['the Reformation', 'Protestant Reformation', '95 theses', 'sola fide', 'sola gratia'], priority: 7 },
    { url: '/history-great-awakening', keywords: ['Great Awakening', 'First Great Awakening'], priority: 5 },
    { url: '/history-calvin-geneva', keywords: ['Calvin in Geneva', 'Geneva Reformation'], priority: 4 },
    { url: '/history-golden-thread', keywords: ['golden thread of grace', 'golden thread through history'], priority: 6 },

    // ── DEVOTIONAL PAGES ──
    { url: '/devotional-never-gives-up', keywords: ['God never gives up', 'He never gives up', 'never gives up on you', 'God will never let you go'], priority: 8 },
    { url: '/devotional-chosen-before-you-were-broken', keywords: ['chosen before you were broken', 'God chose you before'], priority: 7 },
    { url: '/devotional-dead-who-live', keywords: ['the dead who live', 'dead made alive'], priority: 5 },
    { url: '/devotional-my-chains-fell-away', keywords: ['my chains fell away', 'chains fell off'], priority: 5 },
    { url: '/devotional-rescued-without-a-say', keywords: ['rescued without a say'], priority: 5 },
    { url: '/devotional-the-prayer-you-didnt-pray', keywords: ['the prayer you didn\'t pray', 'prayer you never prayed'], priority: 5 },
    { url: '/devotional-love-before-the-world', keywords: ['loved before the world', 'loved before time'], priority: 5 },
    { url: '/devotional-forever-loved', keywords: ['forever loved', 'loved forever'], priority: 5 },
    { url: '/devotional-the-hands-that-hold-you', keywords: ['hands that hold you'], priority: 5 },
    { url: '/devotional-valley-shadow', keywords: ['valley of the shadow', 'through the valley'], priority: 4 },

    // ── COMPARISON PAGES ──
    { url: '/compare-calvinism-arminianism', keywords: ['Calvinism vs Arminianism', 'Calvinism versus Arminianism', 'Reformed vs Arminian'], priority: 7 },
    { url: '/compare-monergism-synergism', keywords: ['monergism', 'synergism', 'monergism vs synergism', 'monergistic', 'synergistic'], priority: 8 },
    { url: '/compare-predestination-foreknowledge', keywords: ['predestination vs foreknowledge', 'predestination or foreknowledge'], priority: 6 },
    { url: '/compare-calvinism-molinism', keywords: ['Molinism', 'middle knowledge', 'Molinist'], priority: 6 },
    { url: '/compare-calvinism-open-theism', keywords: ['open theism', 'open theist'], priority: 5 },
    { url: '/compare-calvinism-catholic-soteriology', keywords: ['Catholic soteriology', 'Catholic view of salvation'], priority: 5 },

    // ── SECULAR EVIDENCE PAGES ──
    { url: '/secular-neuroscience-human-inability', keywords: ['neuroscience and free will', 'neuroscience of inability', 'brain and free will'], priority: 6 },
    { url: '/secular-philosophy-free-will', keywords: ['determinism', 'hard determinism', 'philosophical determinism', 'Sam Harris free will'], priority: 6 },
    { url: '/secular-psychology-bondage-of-will', keywords: ['bondage of the will', 'psychological bondage'], priority: 7 },
    { url: '/secular-billion-decisions', keywords: ['billions of decisions', 'billion decisions', 'predetermined decisions'], priority: 5 },
    { url: '/secular-ai-determinism', keywords: ['AI and determinism', 'artificial intelligence and free will'], priority: 4 },

    // ── OLD TESTAMENT PAGES ──
    { url: '/ot-jacob-esau', keywords: ['Jacob and Esau', 'Jacob I loved, Esau I hated', 'Esau I hated'], priority: 7 },
    { url: '/ot-moses-pharaoh', keywords: ['Moses and Pharaoh', 'Pharaoh and Moses', 'I raised you up, Pharaoh'], priority: 7 },
    { url: '/ot-joseph', keywords: ['Joseph in Egypt', 'Joseph and sovereignty', 'God sent me ahead'], priority: 5 },
    { url: '/ot-abraham', keywords: ['Abraham and election', 'God chose Abraham', 'Abrahamic covenant'], priority: 5 },
    { url: '/ot-david', keywords: ['David and sovereignty', 'God chose David', 'man after God\'s own heart'], priority: 5 },
    { url: '/ot-job', keywords: ['Job and sovereignty', 'God\'s sovereignty in Job', 'book of Job'], priority: 5 },
    { url: '/ot-election', keywords: ['election in the Old Testament', 'OT election', 'Old Testament election'], priority: 6 },
    { url: '/ot-prophets-remnant', keywords: ['the remnant', 'remnant of Israel', 'prophetic remnant', 'faithful remnant'], priority: 6 },
    { url: '/ot-noah', keywords: ['Noah found grace', 'Noah and the flood'], priority: 4 },
    { url: '/ot-jeremiah', keywords: ['Jeremiah 1:5', 'before I formed you', 'I knew you before'], priority: 6 },
    { url: '/ot-israel-chosen', keywords: ['Israel as chosen people', 'God chose Israel', 'chosen nation'], priority: 5 },

    // ── HEALING / PASTORAL PAGES ──
    { url: '/pastoral-assurance', keywords: ['assurance of salvation', 'can I know I\'m saved', 'doubting salvation'], priority: 8 },
    { url: '/pastoral-suffering', keywords: ['sovereignty and suffering', 'God and suffering', 'why does God allow suffering'], priority: 7 },
    { url: '/pastoral-prayer', keywords: ['sovereignty and prayer', 'prayer and God\'s plan'], priority: 6 },
    { url: '/pastoral-evangelism', keywords: ['sovereignty and evangelism', 'evangelism and election'], priority: 6 },

    // ── HEALING HUB ARTICLES ──
    { url: '/anxious-mind-what-if-not-chosen', keywords: ['what if I\'m not chosen', 'am I not chosen', 'what if I\'m not elect'], priority: 7 },
    { url: '/broken-mirror-vessels-for-mercy', keywords: ['vessels for mercy', 'vessels of mercy', 'Romans 9:23'], priority: 7 },
    { url: '/open-wound-sovereignty-in-grief', keywords: ['sovereignty in grief', 'God\'s sovereignty in loss'], priority: 5 },

    // ── KEY STANDALONE / ESSAY PAGES ──
    { url: '/counter-cs-lewis-free-will', keywords: ['C.S. Lewis and free will', 'Lewis on free will', 'mere Christianity free will'], priority: 5 },
    { url: '/scripture-tsunami', keywords: ['Scripture tsunami', 'tsunami of verses'], priority: 5 },
    { url: '/freedom', keywords: ['freedom in sovereignty', 'true freedom'], priority: 4 },
    { url: '/start-here', keywords: ['start here', 'new to these truths', 'where do I begin'], priority: 6 },

    // ── CREED / CONFESSION PAGES ──
    { url: '/creed-canons-dort', keywords: ['Canons of Dort', 'five points of Calvinism origin', 'TULIP origin'], priority: 5 },
    { url: '/creed-heidelberg-catechism', keywords: ['Heidelberg Catechism'], priority: 4 },

    // ── WORKS-RIGHTEOUSNESS (THE CROWN JEWEL IDEA) ──
    { url: '/psychology-cost-of-rejecting-grace', keywords: ['works-righteousness', 'works righteousness', 'works-based salvation', 'self-righteousness', 'trusting in yourself'], priority: 8 },

    // ══════════════════════════════════════════════════════
    // EXPANDED DICTIONARY — April 2026
    // ══════════════════════════════════════════════════════

    // ── ANXIOUS MIND (HEALING) ──
    { url: '/anxious-mind-brain-decides', keywords: ['brain decides before you do', 'neuroscience and free will', 'brain decides first'], priority: 5 },
    { url: '/anxious-mind-fear-of-hell', keywords: ['afraid of hell', 'fear of hell', 'terror of hell'], priority: 6 },
    { url: '/anxious-mind-intrusive-thoughts', keywords: ['intrusive thoughts', 'unwanted thoughts', 'war zone in your mind'], priority: 5 },
    { url: '/anxious-mind-never-meant-to-carry', keywords: ['never meant to carry', 'burden you were never meant to carry'], priority: 4 },
    { url: '/anxious-mind-scrupulosity', keywords: ['scrupulosity', 'religious OCD', 'spiritual OCD'], priority: 6 },
    { url: '/anxious-mind-sovereignty-of-sleep', keywords: ['sovereignty of sleep', 'sleep and sovereignty'], priority: 4 },
    { url: '/anxious-mind-the-loop-that-wont-break', keywords: ['rumination', 'OCD and faith', 'the loop that won\'t break'], priority: 5 },

    // ── BROKEN MIRROR (HEALING) ──
    { url: '/broken-mirror-grace-too-good', keywords: ['grace feels too good to be true', 'too good to be true'], priority: 5 },
    { url: '/broken-mirror-imposter-syndrome', keywords: ['imposter syndrome', 'feel like a fraud', 'spiritual imposter'], priority: 6 },
    { url: '/broken-mirror-not-self-made', keywords: ['self-made', 'not a self-made anything', 'self-made man'], priority: 5 },
    { url: '/broken-mirror-performance-treadmill', keywords: ['performance treadmill', 'doing enough for God', 'earn God\'s approval'], priority: 6 },
    { url: '/broken-mirror-sin-you-repeat', keywords: ['the sin you keep repeating', 'sin you keep returning to', 'habitual sin'], priority: 6 },
    { url: '/broken-mirror-the-relapse', keywords: ['relapse', 'fell back into sin', 'sin you thought you conquered'], priority: 5 },

    // ── INVISIBLE WALL (HEALING) ──
    { url: '/invisible-wall-family', keywords: ['family can\'t follow', 'theological divide in family', 'family doesn\'t understand'], priority: 5 },
    { url: '/invisible-wall-friend-who-left', keywords: ['friend who left', 'lost a friend over theology'], priority: 4 },
    { url: '/invisible-wall-lonely-theological', keywords: ['theological loneliness', 'lonely in your theology'], priority: 5 },
    { url: '/invisible-wall-marriage', keywords: ['theological disagreement in marriage', 'spouse disagrees theologically'], priority: 5 },
    { url: '/invisible-wall-only-one-who-sees', keywords: ['only one who sees it', 'only one who understands'], priority: 5 },
    { url: '/invisible-wall-prayer-feels-empty', keywords: ['prayer feels empty', 'talking to the ceiling', 'prayer feels like nothing'], priority: 5 },
    { url: '/invisible-wall-singing-alone', keywords: ['singing alone', 'alone in your church', 'church doesn\'t see it'], priority: 4 },
    { url: '/invisible-wall-spiritual-envy', keywords: ['spiritual envy', 'watching others feel what you can\'t'], priority: 4 },

    // ── OPEN WOUND (HEALING) ──
    { url: '/open-wound-betrayed-by-church', keywords: ['betrayed by church', 'church hurt', 'church became the wound'], priority: 5 },
    { url: '/open-wound-empty-nursery', keywords: ['empty nursery', 'infertility and sovereignty', 'infertility'], priority: 5 },
    { url: '/open-wound-hospital-room', keywords: ['hospital room', 'why do bad things happen'], priority: 5 },
    { url: '/open-wound-miscarriage', keywords: ['miscarriage', 'infant loss', 'child you never held'], priority: 5 },
    { url: '/open-wound-senseless-death', keywords: ['senseless death', 'death makes no sense', 'grief without explanation'], priority: 5 },
    { url: '/open-wound-terminal-diagnosis', keywords: ['terminal diagnosis', 'terminal illness', 'end you didn\'t choose'], priority: 5 },
    { url: '/open-wound-the-prayer-god-didnt-answer', keywords: ['unanswered prayer', 'prayer God didn\'t answer', 'God didn\'t answer'], priority: 6 },

    // ── SHATTERED LENS (HEALING) ──
    { url: '/shattered-lens-bible-doesnt-make-sense', keywords: ['Bible stopped making sense', 'Bible doesn\'t make sense'], priority: 5 },
    { url: '/shattered-lens-cant-tell-true', keywords: ['can\'t tell what\'s true', 'don\'t know what\'s true anymore'], priority: 4 },
    { url: '/shattered-lens-cant-unsee-it', keywords: ['can\'t unsee it', 'can\'t unsee God\'s sovereignty'], priority: 5 },
    { url: '/shattered-lens-lost-community', keywords: ['lost your community', 'truth cost you your community'], priority: 5 },
    { url: '/shattered-lens-pastor', keywords: ['pastor teaches wrong', 'pastor is wrong', 'when your pastor'], priority: 5 },
    { url: '/shattered-lens-silence-of-god', keywords: ['silence of God', 'God goes silent', 'God is silent'], priority: 6 },
    { url: '/shattered-lens-taught-wrong', keywords: ['everything you were taught was wrong', 'taught wrong'], priority: 5 },
    { url: '/shattered-lens-when-prayer-stopped-working', keywords: ['prayer stopped working', 'when prayer stopped'], priority: 5 },

    // ── ADDITIONAL DEMOLITION PAGES ──
    { url: '/demolition-1cor15-22', keywords: ['1 Corinthians 15:22', '1 Cor 15:22', 'in Christ all shall be made alive'], priority: 7 },
    { url: '/demolition-1tim4-10', keywords: ['1 Timothy 4:10', '1 Tim 4:10', 'savior of all people'], priority: 7 },
    { url: '/demolition-2cor5-14-15', keywords: ['2 Corinthians 5:14', '2 Cor 5:14', 'Christ died for all'], priority: 7 },
    { url: '/demolition-2peter2-1', keywords: ['2 Peter 2:1', '2 Pet 2:1', 'the master who bought them'], priority: 7 },
    { url: '/demolition-acts17-30', keywords: ['Acts 17:30', 'God commands all to repent'], priority: 7 },
    { url: '/demolition-arianism', keywords: ['Arianism', 'Arian heresy'], priority: 5 },
    { url: '/demolition-children-of-satan', keywords: ['children of Satan', 'children of the devil', 'unregenerate nature'], priority: 6 },
    { url: '/demolition-cut-off-from-root', keywords: ['cut off from the root', 'sin doesn\'t just wound'], priority: 5 },
    { url: '/demolition-ezekiel18-23', keywords: ['Ezekiel 18:23', 'Ezek 18:23', 'does God take pleasure in death'], priority: 7 },
    { url: '/demolition-hebrews2-9', keywords: ['Hebrews 2:9', 'Heb 2:9', 'tasted death for everyone'], priority: 7 },
    { url: '/demolition-john12-32', keywords: ['John 12:32', 'I will draw all people', 'draw all men to myself'], priority: 7 },
    { url: '/demolition-matthew-23-37', keywords: ['Matthew 23:37', 'O Jerusalem Jerusalem', 'how often I longed to gather'], priority: 7 },
    { url: '/demolition-orthodox-predestination', keywords: ['Orthodox predestination', 'Eastern Orthodox election'], priority: 5 },
    { url: '/demolition-philippians2-12-13', keywords: ['Philippians 2:12-13', 'Phil 2:12-13', 'work out your salvation', 'God works in you to will and to act'], priority: 8 },
    { url: '/demolition-titus2-11', keywords: ['Titus 2:11', 'grace has appeared to all'], priority: 7 },

    // ── ADDITIONAL DEVOTIONALS ──
    { url: '/devotional-adoption-papers', keywords: ['adoption papers', 'name written before you were born'], priority: 5 },
    { url: '/devotional-cold-church', keywords: ['cold church', 'heart used to burn', 'lukewarm faith'], priority: 5 },
    { url: '/devotional-glory-of-divine-choice', keywords: ['glory of divine choice', 'chosen not because you\'d become worthy'], priority: 5 },
    { url: '/devotional-good-i-cannot-do', keywords: ['the good I cannot do', 'Romans 7:19', 'good that I want to do'], priority: 6 },
    { url: '/devotional-i-cant-feel-god', keywords: ['can\'t feel God', 'I can\'t feel God anymore', 'God feels distant'], priority: 6 },
    { url: '/devotional-i-dont-think-im-saved', keywords: ['don\'t think I\'m saved', 'not sure I\'m saved', 'doubt my salvation'], priority: 7 },
    { url: '/devotional-in-christ', keywords: ['in Christ', 'in Him', 'united with Christ'], priority: 5 },
    { url: '/devotional-joy-of-election', keywords: ['joy of election', 'election is joyful', 'joy in being chosen'], priority: 6 },
    { url: '/devotional-love-letter-before-time', keywords: ['love letter before time', 'God wrote before time'], priority: 4 },
    { url: '/devotional-not-my-will-but-joy', keywords: ['not my will', 'surrendering your will', 'surrender and joy'], priority: 5 },
    { url: '/devotional-the-god-who-wastes-nothing', keywords: ['God wastes nothing', 'suffering has a sovereign purpose', 'nothing is wasted'], priority: 5 },
    { url: '/devotional-the-secretly-ashamed', keywords: ['secretly ashamed', 'hidden shame', 'shame and grace'], priority: 5 },
    { url: '/devotional-weakness-of-gods-strength', keywords: ['God\'s power in weakness', 'power made perfect in weakness', '2 Corinthians 12:9'], priority: 6 },
    { url: '/devotional-when-god-says-no', keywords: ['when God says no', 'God said no'], priority: 5 },

    // ── ADDITIONAL QUESTION PAGES ──
    { url: '/question-acts4', keywords: ['Acts 4:27-28', 'Acts 4:28', 'cross was predestined', 'predestined the cross'], priority: 7 },
    { url: '/question-are-arminians-saved', keywords: ['are Arminians saved', 'Arminian salvation'], priority: 7 },
    { url: '/question-bible-says-sick', keywords: ['Bible says sick not dead', 'spiritually sick vs dead'], priority: 6 },
    { url: '/question-born-again-meaning', keywords: ['born again meaning', 'John 3:3', 'John 3:3-8', 'must be born again'], priority: 7 },
    { url: '/question-calvinist-on-knees', keywords: ['Calvinist on their knees', 'everyone prays like a Calvinist', 'pray like a Calvinist'], priority: 5 },
    { url: '/question-dead-bury-dead', keywords: ['let the dead bury the dead', 'dead bury their dead'], priority: 5 },
    { url: '/question-dead-in-sin-meaning', keywords: ['dead in sin meaning', 'Ephesians 2:1-5', 'what does dead in sin mean'], priority: 7 },
    { url: '/question-does-god-choose-who-goes-to-heaven', keywords: ['does God choose who goes to heaven', 'God chooses who goes to heaven'], priority: 7 },
    { url: '/question-does-god-love-everyone-equally', keywords: ['does God love everyone equally', 'God\'s love for the elect'], priority: 6 },
    { url: '/question-every-conversion-acts', keywords: ['every conversion in Acts', 'conversions in Acts'], priority: 6 },
    { url: '/question-external-call', keywords: ['why some walk away', 'hear the gospel and walk away', 'two calls of God'], priority: 6 },
    { url: '/question-free-will-bible-verses', keywords: ['free will Bible verses', 'Bible verses about free will'], priority: 6 },
    { url: '/question-godwants', keywords: ['God wants everyone saved', 'two wills of God', 'does God want everyone saved'], priority: 7 },
    { url: '/question-is-predestination-in-the-bible', keywords: ['is predestination in the Bible', 'predestination biblical'], priority: 7 },
    { url: '/question-one-question', keywords: ['one question that changes everything'], priority: 5 },
    { url: '/question-secure', keywords: ['can a believer lose salvation', 'lose your salvation', 'fall from grace'], priority: 7 },
    { url: '/question-was-christ-a-robot', keywords: ['was Christ a robot', 'Jesus wasn\'t a robot', 'predestination and robots'], priority: 5 },
    { url: '/question-what-is-sovereign-grace', keywords: ['what is sovereign grace', 'what are the doctrines of grace'], priority: 7 },
    { url: '/question-where-does-your-no-come-from', keywords: ['where does your no come from', 'self-referential trap'], priority: 6 },
    { url: '/question-whose-side-are-you-on', keywords: ['man-centered theology', 'God-centered theology', 'man-centered vs God-centered'], priority: 6 },
    { url: '/question-why-does-god-choose-some-not-others', keywords: ['why does God choose some', 'God choose some and not others'], priority: 7 },
    { url: '/question-why-pray-if-god-is-sovereign', keywords: ['why pray if God is sovereign', 'prayer changes you not God'], priority: 6 },

    // ── ADDITIONAL OBJECTION PAGES ──
    { url: '/objection-babies', keywords: ['babies who die', 'infant salvation', 'babies and election'], priority: 6 },
    { url: '/objection-effort', keywords: ['why even try', 'predetermined why try', 'why bother'], priority: 5 },
    { url: '/objection-god-could-save-all', keywords: ['God could save everyone', 'why not save all people'], priority: 6 },
    { url: '/objection-manipulation', keywords: ['God manipulates', 'sovereignty vs manipulation', 'does God manipulate'], priority: 5 },
    { url: '/objection-unfair-to-choose-some', keywords: ['unfair to choose some', 'only chose some'], priority: 6 },
    { url: '/objection-why-believe', keywords: ['why do we have to believe', 'if already chosen why believe'], priority: 6 },
    { url: '/objection-why-command', keywords: ['why does God command', 'if predestined why command'], priority: 5 },
    { url: '/objection-why-evangelize', keywords: ['why evangelize if predestined', 'if God already chose'], priority: 6 },

    // ── FOR-X LANDING PAGES ──
    { url: '/for-arminians', keywords: ['you love Jesus but', 'missing something'], priority: 4 },
    { url: '/for-deconstructed', keywords: ['deconstructed faith', 'deconstructed everything', 'deconstruction'], priority: 6 },
    { url: '/for-hurting', keywords: ['your world is burning', 'when everything falls apart'], priority: 4 },
    { url: '/for-new-believers', keywords: ['new to election', 'just heard about election', 'new to these truths'], priority: 5 },
    { url: '/for-pastors', keywords: ['preaching sovereign grace', 'pastor and sovereign grace'], priority: 5 },
    { url: '/for-skeptics', keywords: ['intellectual honesty', 'hunting for honesty'], priority: 4 },
    { url: '/just-realized', keywords: ['just realized', 'just figured it out'], priority: 4 },

    // ── ADDITIONAL HISTORY PAGES ──
    { url: '/history-20th-century', keywords: ['Reformed resurgence', '20th century Reformed', 'neo-Calvinism'], priority: 5 },
    { url: '/history-apostolic', keywords: ['early church sovereign grace', 'early church fathers', 'apostolic fathers'], priority: 5 },
    { url: '/history-confessions-story', keywords: ['Reformed confessions', 'story behind the confessions', 'Westminster Confession'], priority: 5 },
    { url: '/history-council-of-orange', keywords: ['Council of Orange', 'Orange 529'], priority: 6 },
    { url: '/history-decision-theology', keywords: ['decision theology', 'altar call', 'invention of the altar call', 'Charles Finney'], priority: 7 },
    { url: '/history-every-revival-sovereign-grace', keywords: ['every revival', 'revival and Calvinism', 'revivals were Calvinist'], priority: 6 },
    { url: '/history-heresy-foreknowledge', keywords: ['foreknowledge heresy', 'foreknowledge objection through history'], priority: 5 },
    { url: '/history-heresy-free-will', keywords: ['free will heresy', 'history of the free will defense'], priority: 5 },
    { url: '/history-korean-revival', keywords: ['Pyongyang Revival', 'Korean revival', 'Korean Christianity'], priority: 4 },
    { url: '/history-medieval', keywords: ['medieval theology', 'gospel almost died', 'dark ages theology'], priority: 4 },
    { url: '/history-puritans', keywords: ['the Puritans', 'Puritan theology', 'Puritan era'], priority: 6 },
    { url: '/history-spurgeon-downgrade', keywords: ['Downgrade Controversy', 'Spurgeon stood alone', 'Spurgeon controversy'], priority: 5 },
    { url: '/history-today', keywords: ['sovereign grace today', 'Reformed movement today'], priority: 4 },
    { url: '/history-whitefield-wesley', keywords: ['Whitefield vs Wesley', 'Wesley and Whitefield', 'two revivals'], priority: 5 },
    { url: '/hymn-amazing-grace', keywords: ['Amazing Grace hymn', 'John Newton', 'amazing grace'], priority: 5 },

    // ── ADDITIONAL PHILOSOPHY PAGES ──
    { url: '/philosophy-bootstrap-paradox', keywords: ['bootstrap paradox', 'believe the sky is green', 'can\'t choose to believe'], priority: 6 },
    { url: '/philosophy-children-argument', keywords: ['didn\'t choose to be born', 'argument from childhood'], priority: 5 },
    { url: '/philosophy-godel-incompleteness', keywords: ['Gödel', 'Godelian', 'incompleteness theorem', 'no soul can save itself'], priority: 5 },
    { url: '/philosophy-gravity-of-grace', keywords: ['gravity of grace', 'never chose to be held'], priority: 5 },
    { url: '/philosophy-immune-system-grace', keywords: ['immune system analogy', 'immune system you never asked for'], priority: 4 },
    { url: '/philosophy-mother-tongue', keywords: ['mother tongue chose you', 'language and sovereignty'], priority: 4 },
    { url: '/philosophy-observer-effect-sin', keywords: ['observer effect of sin', 'observer effect'], priority: 4 },
    { url: '/philosophy-prisoners-dilemma', keywords: ['prisoner\'s dilemma', 'prisoner\'s dilemma of salvation'], priority: 5 },
    { url: '/philosophy-sleep-surrender', keywords: ['can\'t will yourself to sleep', 'sleep and grace'], priority: 5 },
    { url: '/philosophy-theater-script', keywords: ['script you didn\'t write', 'theater of sovereignty'], priority: 4 },
    { url: '/philosophy-what-if-wrong', keywords: ['what if you\'re wrong', 'soteriological Pascal\'s wager', 'Pascal\'s wager'], priority: 5 },

    // ── ADDITIONAL PSYCHOLOGY PAGES ──
    { url: '/psychology-addiction-proof', keywords: ['recovering addict', 'addiction proves depravity', 'addiction and sovereignty'], priority: 6 },
    { url: '/psychology-attribution-error', keywords: ['attribution error', 'fundamental attribution error', 'credit thief'], priority: 5 },
    { url: '/psychology-comfort-self-salvation', keywords: ['comfort of self-salvation', 'self-salvation feels right'], priority: 5 },
    { url: '/psychology-emotional-vs-rational', keywords: ['heart rejects what mind accepts', 'emotional vs rational'], priority: 5 },
    { url: '/psychology-groupthink', keywords: ['groupthink', 'church groupthink', 'why your church all believes the same'], priority: 5 },
    { url: '/psychology-language-acquisition', keywords: ['language acquisition', 'didn\'t choose your mother tongue'], priority: 4 },
    { url: '/psychology-language-you-already-speak', keywords: ['language you already speak', 'own words confess sovereign grace'], priority: 5 },
    { url: '/psychology-system-justification', keywords: ['system justification', 'defend the theology that enslaves'], priority: 5 },
    { url: '/psychology-terror-management', keywords: ['terror management theory', 'terror management'], priority: 5 },
    { url: '/psychology-why-this-objection-proves-our-point', keywords: ['objection proves our point', 'crown jewel defense'], priority: 6 },

    // ── ADDITIONAL COMPARISON PAGES ──
    { url: '/compare-every-decision-point', keywords: ['every decision point', 'Scripture sides with God'], priority: 5 },
    { url: '/compare-grace-reformed-vs-arminian', keywords: ['two versions of grace', 'Reformed vs Arminian grace'], priority: 6 },

    // ── ADDITIONAL OT PAGES ──
    { url: '/ot-abel-cain', keywords: ['Abel and Cain', 'Cain and Abel', 'Bible\'s first election'], priority: 6 },
    { url: '/ot-isaiah-servant', keywords: ['Isaiah and the servant', 'suffering servant prophecy'], priority: 5 },
    { url: '/ot-jonah', keywords: ['Jonah', 'prophet who ran', 'Jonah and sovereignty'], priority: 5 },

    // ── ADDITIONAL THEOLOGIAN PAGES ──
    { url: '/theologian-anselm', keywords: ['Anselm', 'Anselm of Canterbury', 'ontological argument'], priority: 5 },
    { url: '/theologian-bradwardine', keywords: ['Thomas Bradwardine', 'Bradwardine'], priority: 4 },
    { url: '/theologian-gottschalk', keywords: ['Gottschalk', 'Gottschalk of Orbais', 'imprisoned for predestination'], priority: 5 },
    { url: '/theologian-lloydjones', keywords: ['Martyn Lloyd-Jones', 'Lloyd-Jones', 'the Doctor preacher'], priority: 5 },
    { url: '/theologian-machen', keywords: ['J. Gresham Machen', 'Machen', 'Christianity and Liberalism'], priority: 5 },
    { url: '/theologian-sproul', keywords: ['R.C. Sproul', 'Sproul', 'Chosen by God', 'Ligonier'], priority: 6 },
    { url: '/theologian-warfield', keywords: ['B.B. Warfield', 'Warfield', 'Princeton theology'], priority: 5 },
    { url: '/theologian-wycliffe', keywords: ['John Wycliffe', 'Wycliffe', 'Morning Star of the Reformation'], priority: 5 },

    // ── ADDITIONAL STORY PAGES ──
    { url: '/story-children-the-king-who-chose', keywords: ['king who chose his children'], priority: 4 },
    { url: '/story-cross-examination', keywords: ['cross-examination', 'free will on the witness stand'], priority: 5 },
    { url: '/story-dark-the-altar-he-built-himself', keywords: ['altar he built himself', 'religion that almost killed him'], priority: 4 },
    { url: '/story-dark-the-woman-who-earned-her-seat', keywords: ['woman who earned her seat', 'righteousness that damns'], priority: 5 },
    { url: '/story-historical-augustine-pears', keywords: ['Augustine stole the pears', 'Augustine\'s pears'], priority: 4 },
    { url: '/story-historical-luther-storm', keywords: ['Luther\'s thunderstorm', 'Luther thunderstorm'], priority: 4 },
    { url: '/story-humor-committee-to-save-yourself', keywords: ['committee to save yourself', 'satire on works-righteousness'], priority: 4 },
    { url: '/story-humor-the-man-who-sued-god', keywords: ['man who sued God', 'sued God for saving him'], priority: 4 },
    { url: '/story-real-conversions', keywords: ['real conversions', 'what actually happens when God saves'], priority: 5 },
    { url: '/story-tender-the-gardener-who-waited', keywords: ['gardener who waited', 'child walks away from faith'], priority: 4 },
    { url: '/story-the-garden-that-grew-itself', keywords: ['garden that grew itself', 'parable about grace and effort'], priority: 4 },
    { url: '/story-the-letter-before-the-world', keywords: ['letter before the world', 'love letter before time'], priority: 4 },
    { url: '/story-the-person-who-chose-god', keywords: ['person who chose God', 'dark thought experiment'], priority: 5 },
    { url: '/story-the-room-where-you-chose', keywords: ['room where you chose', 'illusion of free will story'], priority: 5 },
    { url: '/story-the-self-made-man', keywords: ['the self-made man'], priority: 4 },
    { url: '/story-thought-the-day-you-chose-again', keywords: ['day you chose again', 'thought experiment about free will'], priority: 4 },
    { url: '/story-thought-the-god-who-let-you-watch', keywords: ['God who let you watch', 'see yourself being chosen'], priority: 4 },

    // ── ADDITIONAL SECULAR EVIDENCE PAGES ──
    { url: '/secular-algorithm-sovereignty', keywords: ['algorithm knows you', 'algorithm and sovereignty', 'algorithm better than you'], priority: 5 },
    { url: '/secular-art-literature-reformed-truth', keywords: ['art and Reformed truth', 'literature and sovereignty', 'greatest writers intuited'], priority: 4 },
    { url: '/secular-economics-depravity', keywords: ['economics and depravity', 'economist assumes depravity'], priority: 5 },
    { url: '/secular-genetics-sovereignty', keywords: ['DNA and sovereignty', 'genetics and sovereignty', 'written in your DNA'], priority: 5 },
    { url: '/secular-hard-problem-consciousness', keywords: ['hard problem of consciousness', 'consciousness and sovereignty'], priority: 5 },
    { url: '/secular-history-sovereignty', keywords: ['secular historians document divine control', 'history and sovereignty'], priority: 4 },
    { url: '/secular-recovery-total-depravity', keywords: ['recovery program', 'twelve steps', '12-step', 'AA and total depravity'], priority: 6 },
    { url: '/secular-sociology-human-inability', keywords: ['social experiment confirms', 'sociology and human inability'], priority: 4 },

    // ── ROMANS DEEP DIVES ──
    { url: '/romans-3-10-18', keywords: ['Romans 3:10-18', 'Rom 3:10', 'there is no one righteous', 'no one who seeks God'], priority: 7 },
    { url: '/romans-8-28-39', keywords: ['Romans 8:28-39', 'Rom 8:28', 'all things work together', 'nothing can separate us'], priority: 8 },
    { url: '/romans-9-1-24', keywords: ['Romans 9:1-24', 'Rom 9:1', 'potter and clay passage', 'God\'s sovereign right to choose'], priority: 8 },

    // ── SCRIPTURE TSUNAMI PAGES ──
    { url: '/scripture-tsunami-faith-as-gift', keywords: ['every verse teaching faith is a gift', 'faith as gift verses'], priority: 5 },
    { url: '/scripture-tsunami-sovereignty', keywords: ['every verse teaching sovereignty', 'sovereignty verses'], priority: 5 },

    // ── RESISTANCE PAGES ──
    { url: '/resistance-last-idol', keywords: ['last idol', 'self-sovereignty is the hardest', 'hardest thing to surrender'], priority: 6 },
    { url: '/resistance-redefining-grace', keywords: ['redefine grace', 'secretly redefine grace', 'redefining grace to include ourselves'], priority: 6 },

    // ── JOY PAGES ──
    { url: '/joy-freedom-of-smallness', keywords: ['freedom of smallness', 'freedom of being small'], priority: 4 },
    { url: '/joy-god-big-enough', keywords: ['God is big enough', 'God big enough'], priority: 4 },
    { url: '/joy-in-suffering', keywords: ['joy in suffering', 'only sovereign grace makes pain bearable'], priority: 6 },
    { url: '/joy-no-other-theology', keywords: ['joy no other theology can offer', 'unmatched joy'], priority: 5 },
    { url: '/joy-security-changes-everything', keywords: ['security changes everything', 'eternal security and joy'], priority: 5 },
    { url: '/joy-staggering-contrast', keywords: ['staggering contrast', 'what two theologies give you'], priority: 5 },
    { url: '/joy-worship-without-ceiling', keywords: ['worship without a ceiling', 'worship without ceiling'], priority: 4 },

    // ── PASTORAL PAGES ──
    { url: '/pastoral-when-truth-lands', keywords: ['when the truth lands', 'what it feels like when truth lands'], priority: 5 },

    // ── APOLOGETIC PAGES (now under Questions) ──
    { url: '/apologetic-babies', keywords: ['what about babies', 'babies and salvation'], priority: 5 },
    { url: '/apologetic-definite-atonement', keywords: ['did Jesus die for everyone', 'extent of the atonement'], priority: 7 },
    { url: '/apologetic-evangelism', keywords: ['election make evangelism pointless', 'doesn\'t election make evangelism'], priority: 6 },
    { url: '/apologetic-perseverance', keywords: ['can you lose your salvation', 'lose salvation'], priority: 7 },
    { url: '/apologetic-unreached', keywords: ['those who never heard', 'unreached people', 'never heard the gospel'], priority: 6 },

    // ── PHILOSOPHY PAGES (newly added) ──
    { url: '/philosophy-exclusive-love', keywords: ['exclusive love', 'love requires distinction', 'particular love', 'love must be exclusive'], priority: 6 },
    { url: '/philosophy-marriage-election', keywords: ['marriage and election', 'wedding proposal', 'marriage proves election', 'exclusive love of God'], priority: 6 },
    { url: '/philosophy-mirror-you-refuse', keywords: ['mirror you refuse', 'grace reveals what we are', 'why we avoid the mirror'], priority: 6 },
    { url: '/philosophy-bootstrap-paradox', keywords: ['bootstrap paradox', 'bootstrap paradox of faith', 'doxastic involuntarism', 'cannot choose to believe'], priority: 7 },
    { url: '/philosophy-gravity-of-grace', keywords: ['gravity of grace', 'grace like gravity', 'sovereignty like gravity'], priority: 5 },
    { url: '/philosophy-immune-system-grace', keywords: ['immune system of grace', 'grace like an immune system', 'grace you never asked for'], priority: 5 },
    { url: '/philosophy-mother-tongue', keywords: ['mother tongue', 'language acquisition and grace', 'faith like language'], priority: 5 },
    { url: '/philosophy-godel-incompleteness', keywords: ['Gödel', 'Godel', 'incompleteness theorem', 'system cannot prove itself'], priority: 5 },
    { url: '/philosophy-observer-effect-sin', keywords: ['observer effect', 'observer effect and sin', 'cannot assess own will'], priority: 5 },

    // ── QUESTION PAGES (newly added) ──
    { url: '/question-regeneration-precedes-faith', keywords: ['regeneration precedes faith', 'new birth before faith', 'born again before believing'], priority: 8 },

    // ── SYSTEMATIC (newly added) ──
    { url: '/systematic-tulip', keywords: ['TULIP', 'five points of Calvinism', 'five points of grace explained'], priority: 7 },

    // ── SPRINT 4 INTERACTIVES & CROWN-JEWEL PAGES (Apr 2026) ──
    { url: '/verse-navigator', keywords: ['verse navigator', 'the twelve sovereignty verses', 'the twelve texts', 'the twelve load-bearing verses'], priority: 7 },
    { url: '/objection-builder', keywords: ['objection builder', 'twelve objections to sovereign grace', 'the objection collapse'], priority: 7 },
    { url: '/testimony-wall', keywords: ['wall of the rescued', 'testimony wall'], priority: 7 },
    { url: '/two-arms', keywords: ['two arms', 'the two arms', 'two-arms architecture', 'demolition and catch'], priority: 8 },
    { url: '/found-you', keywords: ['found you before the foundation', '2am searcher', 'midnight searcher'], priority: 7 },
    { url: '/quotes', keywords: ['gallery of arresting lines', 'quote gallery', 'gallery of lines'], priority: 6 },
    { url: '/essays/the-gift-that-proves-itself', keywords: ['the gift that proves itself', 'eight-part crown-jewel argument'], priority: 7 },
];

// ═══════════════════════════════════════
// PAGES TO SKIP (not article content)
// ═══════════════════════════════════════
const SKIP_FILES = new Set([
    '_nav-template.html', '404.html', 'search.html', 'index.html',
    'about.html', 'contact.html', 'privacy.html', 'terms.html',
    'all-content.html', 'topics.html', 'connections.html', 'explore-map.html',
    'best-reads.html', 'start-here.html', 'start-here-assessment.html',
    'belief-assessment.html', 'quiz.html', 'verse-explorer.html',
    'sitemap.html', 'donate.html', 'creeds-confessions.html',
    // Hub pages (only card content, not prose)
    'questions.html', 'demolition-hub.html', 'psychology-hub.html',
    'philosophy-hub.html', 'stories.html', 'devotionals.html',
    'analogies-illustrations.html', 'secular-evidence.html',
    'systematic-theology.html', 'theologians.html', 'history-timeline.html',
    'ot-hub.html', 'essays.html', 'comparisons-hub.html',
    'invisible-wall-hub.html', 'open-wound-hub.html', 'shattered-lens-hub.html',
    'broken-mirror-hub.html', 'anxious-mind-hub.html', 'pastoral-hub.html',
]);

// ═══════════════════════════════════════
// LINKER ENGINE (optimized — fast regex approach)
// ═══════════════════════════════════════

// Sort keywords longest-first so longer phrases match before shorter subsets
const sortedEntries = [];
for (const entry of LINK_MAP) {
    for (const kw of entry.keywords) {
        sortedEntries.push({ keyword: kw, url: entry.url, priority: entry.priority });
    }
}
sortedEntries.sort((a, b) => b.keyword.length - a.keyword.length || b.priority - a.priority);

function getSlugFromFile(filename) {
    return '/' + filename.replace(/\.html$/, '');
}

/**
 * Extract only the article body region from the HTML.
 * Returns { before, body, after } or null if no body found.
 */
function extractArticleBody(html) {
    const bodyPatterns = [
        /<article[^>]*class="[^"]*article-body[^"]*"[^>]*>/i,
        /<div[^>]*class="[^"]*article-body[^"]*"[^>]*>/i,
        /<div[^>]*class="[^"]*content-section[^"]*"[^>]*>/i,
        /<div[^>]*class="[^"]*article-content[^"]*"[^>]*>/i,
        /<div[^>]*class="[^"]*content-wrap[^"]*"[^>]*>/i,
        /<div[^>]*class="[^"]*story-text[^"]*"[^>]*>/i,
        /<div[^>]*class="[^"]*story-container[^"]*"[^>]*>/i,
        /<main[^>]*>/i,
    ];

    for (const pat of bodyPatterns) {
        const m = html.match(pat);
        if (m) {
            const start = m.index + m[0].length;
            const footerIdx = html.indexOf('<footer', start);
            const end = footerIdx !== -1 ? footerIdx : html.length;
            return {
                before: html.substring(0, start),
                body: html.substring(start, end),
                after: html.substring(end)
            };
        }
    }
    return null;
}

/**
 * Split HTML into an array of segments: { type: 'text'|'tag', content: string }
 * Tags include everything from < to >.
 * We also mark <a>...</a>, <script>...</script>, <style>...</style>,
 * <code>...</code>, <pre>...</pre>, <svg>...</svg> blocks as 'unsafe'.
 */
function splitIntoSegments(html) {
    const segments = [];
    // Split by HTML tags (also handle HTML comments)
    const parts = html.split(/(<[^>]+>|<!--[\s\S]*?-->)/);
    let unsafeDepth = 0;
    const unsafeTagNames = new Set(['a', 'script', 'style', 'code', 'pre', 'svg', 'nav', 'button', 'cite']);

    for (const part of parts) {
        if (!part) continue;
        if (part.startsWith('<')) {
            segments.push({ type: 'tag', content: part });
            // Skip HTML comments
            if (part.startsWith('<!--')) continue;
            const nameMatch = part.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
            if (nameMatch && unsafeTagNames.has(nameMatch[1].toLowerCase())) {
                if (part.startsWith('</')) {
                    unsafeDepth = Math.max(0, unsafeDepth - 1);
                } else if (!part.endsWith('/>')) {
                    unsafeDepth++;
                }
            }
        } else {
            segments.push({ type: unsafeDepth > 0 ? 'unsafe' : 'text', content: part });
        }
    }
    return segments;
}

/**
 * Add links to a single HTML file's content.
 * Returns { modified: boolean, content: string, linksAdded: number }
 */
function addLinksToFile(filename, html) {
    const selfSlug = getSlugFromFile(filename);
    const parts = extractArticleBody(html);
    if (!parts) return { modified: false, content: html, linksAdded: 0 };

    const segments = splitIntoSegments(parts.body);
    const linkedUrls = new Set();
    let linksAdded = 0;

    // For each keyword entry (longest first), scan text segments for first match
    for (const entry of sortedEntries) {
        if (entry.url === selfSlug) continue;
        if (linkedUrls.has(entry.url)) continue;

        const escaped = entry.keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b(${escaped})\\b`, 'i');

        let found = false;
        for (let si = 0; si < segments.length && !found; si++) {
            const seg = segments[si];
            if (seg.type !== 'text') continue;

            const match = seg.content.match(regex);
            if (match) {
                const matchedText = match[1] || match[0];
                const idx = match.index;
                const before = seg.content.substring(0, idx);
                const after = seg.content.substring(idx + match[0].length);
                // Replace this segment with three parts: before-text, link-tag, after-text
                const linkHtml = `<a href="${entry.url}">${matchedText}</a>`;
                segments.splice(si, 1,
                    { type: 'text', content: before },
                    { type: 'tag', content: linkHtml },
                    { type: 'text', content: after }
                );
                linkedUrls.add(entry.url);
                linksAdded++;
                found = true;
            }
        }
    }

    if (linksAdded === 0) return { modified: false, content: html, linksAdded: 0 };

    const newBody = segments.map(s => s.content).join('');
    return {
        modified: true,
        content: parts.before + newBody + parts.after,
        linksAdded
    };
}

// ═══════════════════════════════════════
// MAIN
// ═══════════════════════════════════════

const files = SINGLE_FILE
    ? [SINGLE_FILE.split('=')[1]]
    : fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && !SKIP_FILES.has(f) && !f.startsWith('.') && !f.startsWith('_'));

console.log(`\n🔗 AUTO-LINKER — adoptedbygrace.net`);
console.log(`   Processing ${files.length} article pages...`);
if (DRY_RUN) console.log('   [DRY RUN — no files will be modified]\n');

let totalLinked = 0;
let totalFiles = 0;
let modifiedFiles = 0;
const fileResults = [];

for (const file of files) {
    const filePath = path.join(ROOT, file);
    let html;
    try {
        html = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.log(`  ⚠️ Skipping ${file} (unreadable)`);
        continue;
    }
    totalFiles++;

    const result = addLinksToFile(file, html);
    if (result.modified) {
        modifiedFiles++;
        totalLinked += result.linksAdded;
        fileResults.push({ file, links: result.linksAdded });

        if (!DRY_RUN) {
            fs.writeFileSync(filePath, result.content, 'utf8');
        }
        console.log(`  ✅ ${file} — ${result.linksAdded} links added`);
    }
}

console.log(`\n══════════════════════════════════════`);
console.log(`📊 RESULTS:`);
console.log(`   Files scanned:  ${totalFiles}`);
console.log(`   Files modified: ${modifiedFiles}`);
console.log(`   Total links:    ${totalLinked}`);
console.log(`   Avg per file:   ${modifiedFiles > 0 ? (totalLinked / modifiedFiles).toFixed(1) : 0}`);
if (DRY_RUN) console.log(`   [DRY RUN — no changes written]`);
console.log(`══════════════════════════════════════\n`);
