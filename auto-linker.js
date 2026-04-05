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
