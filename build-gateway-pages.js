#!/usr/bin/env node
// Evangelist: generate gateway pages from structured content definitions
const fs = require('fs');

const NAV_BLOCK = fs.readFileSync('/tmp/body-nav-only.html', 'utf8');
const FOOTER_BLOCK = fs.readFileSync('/tmp/footer-block.txt', 'utf8');

const BASE = 'https://adoptedbygrace.net';
const TODAY = '2026-04-06';

function headFor({slug, title, metaDesc, ogTitle, ogDesc, keywords, faqs, h1}) {
  const faqEntities = faqs.map(([q, a]) => `            {
                "@type": "Question",
                "name": "${q.replace(/"/g, '\\"')}",
                "acceptedAnswer": {"@type": "Answer", "text": "${a.replace(/"/g, '\\"')}"}
            }`).join(',\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Adopted by Grace</title>
    <meta name="description" content="${metaDesc}">
    <link rel="canonical" href="${BASE}/${slug}">
    <meta property="og:title" content="${ogTitle}">
    <meta property="og:description" content="${ogDesc}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${BASE}/${slug}">
    <meta name="keywords" content="${keywords}">
    <link rel="icon" type="image/svg+xml" href="./favicon.svg">
    <link rel="stylesheet" href="/global.css">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${ogTitle.replace(/"/g, '\\"')}",
        "description": "${ogDesc.replace(/"/g, '\\"')}",
        "url": "${BASE}/${slug}",
        "author": {"@type": "Person", "name": "Aaron Forman", "url": "${BASE}/about"},
        "publisher": {"@type": "Organization", "name": "Adopted by Grace", "url": "${BASE}"},
        "mainEntityOfPage": {"@type": "WebPage", "@id": "${BASE}/${slug}"},
        "datePublished": "${TODAY}"
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "${BASE}/"},
            {"@type": "ListItem", "position": 2, "name": "Questions", "item": "${BASE}/questions"},
            {"@type": "ListItem", "position": 3, "name": "${h1.replace(/"/g, '\\"')}"}
        ]
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
${faqEntities}
        ]
    }
    </script>
</head>
`;
}

function heroFor({eyebrow, h1, subtitle}) {
  return `    <header class="page-hero">
        <span class="eyebrow">${eyebrow}</span>
        <h1>${h1}</h1>
        <p class="hub-subtitle">${subtitle}</p>
    </header>

`;
}

// ============================================================
// PAGE 1: How Do I Know If I'm One of the Elect?
// ============================================================
const PAGE_1 = {
  slug: 'question-am-i-chosen',
  file: 'question-am-i-chosen.html',
  title: 'How Do I Know If I\u2019m One of the Elect? — The Only Answer That Brings Peace',
  metaDesc: 'If God chose His people before the foundation of the world, how can I know I\u2019m one of them? The Bible\u2019s answer isn\u2019t what you expect — and it\u2019s far better than you hoped.',
  ogTitle: 'How Do I Know If I\u2019m One of the Elect?',
  ogDesc: 'If God chose His people before the foundation of the world, how can I know I\u2019m one of them? The Bible\u2019s answer is better than you hoped.',
  keywords: 'am I elect, am I chosen by God, how do I know if I\'m saved, assurance of salvation, election anxiety, am I one of the chosen, doctrine of election',
  eyebrow: 'Questions',
  h1: 'How Do I Know If I\u2019m One of the Elect?',
  subtitle: 'The fact that you are asking this question is itself the first answer.',
  faqs: [
    ['How can I know if I am one of the elect?', 'Scripture never asks you to peer into the secret decree of God. It asks you a simpler question: are you looking to Christ right now? The elect are those who come when He calls (John 6:37). If you are reaching for Him \u2014 even trembling, even uncertain \u2014 that reaching is evidence the Father has drawn you. Spiritual corpses do not long for Christ. They ignore Him. The very fact that you care is the first sign that grace has begun its work.'],
    ['Does the Bible say we can know we are saved?', 'Yes. 1 John 5:13 says, "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life." Assurance is not presumption \u2014 it is the normal experience of the believer. The tests of 1 John are simple: Do you love the brothers? Do you believe Jesus is the Christ? Do you walk in the light? None of these require peering into God\u2019s hidden will. They only require honest self-examination.'],
    ['What if I am anxious about whether I am chosen?', 'Anxiety about election is almost never the mark of a reprobate \u2014 it is the mark of a heart the Spirit is stirring. The truly lost do not worry about their election. They are comfortable in their autonomy. If you are losing sleep over whether you belong to Him, that sleeplessness is mercy. It is the Spirit\u2019s way of driving you to the only refuge: Christ Himself.'],
    ['Should I try to figure out if I\u2019m predestined before I come to Christ?', 'No. This is the great error. Scripture never tells you to resolve the question of election first and come to Christ second. It tells you to come to Christ \u2014 and in the coming, the election is revealed. "Whoever comes to me I will never drive away" (John 6:37). Come. Then look back and see: you were held all along.'],
  ],
  body: `        <p>You are afraid to hope.</p>

        <p>You have heard it said that before the foundation of the world, God chose His people — a specific number, a particular flock, names written in the Lamb\u2019s book of life. And something in that truth has both drawn you and terrified you. Drawn you, because the idea that God would choose anyone is staggering grace. Terrified you, because a quiet voice in your chest keeps asking: <em>what if He didn\u2019t choose me?</em></p>

        <p>So you came here, typing the question no one else will answer honestly. You have probably tried to shake it off. You have probably told yourself not to think about it. But the question will not let you go. So let me tell you what Scripture actually says about how a person knows they are one of the elect of God — and let me tell you gently, because the answer is not what most teachers will give you.</p>

        <h2>The Short Answer</h2>

        <p>You are looking in the wrong place.</p>

        <p>Assurance of election does not come from peering up into the secret decrees of heaven, trying to spot your name on a list you were never given access to. Scripture calls those things "the secret things [that] belong to the Lord our God" (Deuteronomy 29:29). You cannot climb up to read them. No one can. The moment you try, you will fall into despair — because the question "am I elect?" is a question you have no instrument to answer from the top down.</p>

        <p>But the Bible gives you an instrument to answer it from the bottom up. And the instrument is this:</p>

        <blockquote>
            <p>"All those the Father gives me will come to me, and whoever comes to me I will never drive away."</p>
            <cite>JOHN 6:37</cite>
        </blockquote>

        <p>Read that verse carefully. Jesus draws a perfect equation. Everyone the Father has given Him <em>will come</em>. And everyone who <em>comes</em> will never be driven away. Those two groups are the same group. Which means the question "am I one of the ones the Father gave to the Son?" has a test you can run right now — from where you are sitting. Are you coming to Him? Are you reaching, however tremblingly, however uncertainly, toward Christ?</p>

        <p>Then the coming is the evidence. The reaching is the receipt. You are doing the very thing the non-elect cannot do.</p>

        <h2>The Thing No One Tells You</h2>

        <p>Here is what most people miss: <strong>spiritually dead people do not ask this question.</strong></p>

        <p>The truly lost — the ones who have never been touched by grace — are not lying awake at night wondering if they belong to God. They are not frightened by the possibility of reprobation. They are not searching the internet at 2am for an answer. They are, as Paul says, "dead in [their] transgressions and sins" (Ephesians 2:1) — and corpses have no anxieties. The dead do not worry about dying. They are already gone. If you were one of them, this question would bore you. You would click away from this page. You would roll your eyes.</p>

        <p>But you are still reading. Which means something in you is alive. Which means something has already stirred. Which means the question you are asking is itself the first answer.</p>

        <p>This is what Paul meant when he wrote: "Therefore, my dear friends, as you have always obeyed — not only in my presence, but now much more in my absence — continue to work out your salvation with fear and trembling, for it is God who works in you to will and to act in order to fulfill his good purpose" (Philippians 2:12-13). Fear and trembling are not signs of reprobation. They are signs that God is <em>at work in you</em>. The reprobate does not tremble before God. He shrugs. The elect, touched by grace, begin to feel the weight of holiness — and that weight is mercy.</p>

        <h2>The Test Scripture Actually Gives You</h2>

        <p>1 John was written for exactly this moment. John says plainly: "I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life" (1 John 5:13). Knowing is possible. Assurance is not presumption. The whole letter is a series of simple tests — not metaphysical tests about hidden decrees, but practical tests about the shape of your heart:</p>

        <p>Do you love the brothers? (1 John 3:14 — "We know that we have passed from death to life, because we love each other.") Do you confess that Jesus is the Christ, come in the flesh? (1 John 4:2.) Do you walk in the light — not perfectly, but persistently? (1 John 1:7.) Do you grieve over sin when you fall into it, rather than celebrating it? (1 John 3:9.)</p>

        <p>None of these require you to read God\u2019s secret books. They only require honest self-examination. And notice what they all have in common: they are things only grace produces. A dead heart does not love other believers. A dead heart does not confess Christ. A dead heart does not walk in the light. A dead heart does not grieve over sin. If these things are present — even faintly, even imperfectly — they are the fingerprints of the Spirit on a life He has touched.</p>

        <h2>The Mercy Hidden in Your Anxiety</h2>

        <p>One of the great ironies of the Christian life is this: the people most anxious about their election are almost always the people who have been most deeply touched by it. The hardened sinner is not anxious. The smug religious man is not anxious. The person who has convinced himself he is good enough is not anxious. But the soul that has caught even a glimpse of God\u2019s holiness and its own unworthiness — that soul trembles. And that trembling is grace.</p>

        <p>Spurgeon knew this. He said once that the devil\u2019s favorite trick is to take the elect and convince them they are not elect — to steal their assurance not by removing their salvation but by hiding it. So if you are currently in the grip of that fear, hear this carefully: <strong>the anxiety itself is being used by God to drive you to Christ.</strong> It is not a sign you are lost. It is the Spirit tightening the rope that pulls you home.</p>

        <blockquote>
            <p>"My sheep listen to my voice; I know them, and they follow me. I give them eternal life, and they shall never perish; no one will snatch them out of my hand."</p>
            <cite>JOHN 10:27-28</cite>
        </blockquote>

        <h2>Come, and Find That You Were Held All Along</h2>

        <p>Stop trying to verify your election from above. You were never given that job. Your job is the simpler one: come to Christ. Reach. Cry out. Cling. And in the coming, the election will reveal itself — not as a list you read, but as a hand you find already holding yours. You were held all along. You just did not know it until you tried to pull away and found you could not.</p>

        <p>Aaron Forman, who built this site, spent a decade running from God. He tried to make God give up on him. He rebelled, traveled, drank, doubted, ran. And every time he was sure he had finally gotten free, he would find himself whispering into the dark: <em>please don\u2019t let me go.</em> That prayer was the rope. That prayer was the election. The very inability to stop caring was the mark of a sheep who could hear his shepherd even from the far country.</p>

        <p>If you are reading this, you are not too far. You are not too late. You are not disqualified by your doubts. Come to Christ today — not because you have proven yourself elect, but because the coming is how the elect are revealed. <a href="/question-dead-in-sin-meaning">The dead are raised when God speaks</a>. <a href="/devotional-joy-of-election">The joy of election</a> is not in peering into heaven\u2019s files — it is in finding yourself, at last, unable to walk away from the Shepherd who will never let you go.</p>

        <p>If you want to see <a href="/pastoral-assurance">how Scripture grounds assurance</a>, go deeper. If you want to know <a href="/question-sealed">the promise that holds the saints</a>, read it. And if the anxiety is still there, come <a href="/devotional-held-by-god">rest in the hand that has held you since before the stars were lit</a>.</p>

        <p>You are asking because He is pulling. The pull is the answer.</p>
`,
};

// ============================================================
// PAGE 2: Why Did God Harden Pharaoh's Heart?
// ============================================================
const PAGE_2 = {
  slug: 'question-pharaoh-hardened',
  file: 'question-pharaoh-hardened.html',
  title: 'Why Did God Harden Pharaoh\u2019s Heart? — Exodus 9:12 Explained',
  metaDesc: 'Did Pharaoh harden his own heart, or did God do it? Scripture says both — and the order matters more than you think. What Exodus really teaches about human will and divine sovereignty.',
  ogTitle: 'Why Did God Harden Pharaoh\u2019s Heart?',
  ogDesc: 'Did Pharaoh harden his own heart, or did God do it? Scripture says both — and the order matters more than you think.',
  keywords: 'why did God harden Pharaoh\'s heart, Exodus 9:12, Pharaoh hardened heart, Romans 9:17, God hardens hearts, free will Exodus, divine sovereignty',
  eyebrow: 'Questions',
  h1: 'Why Did God Harden Pharaoh\u2019s Heart?',
  subtitle: 'If God hardened his heart, how could it be fair to judge him? Paul anticipated that exact objection — and answered it with a question of his own.',
  faqs: [
    ['Did God really harden Pharaoh\u2019s heart?', 'Yes. Exodus states it at least ten times: "The Lord hardened Pharaoh\u2019s heart" (Exodus 9:12; 10:20, 27; 11:10; 14:8). It also says Pharaoh hardened his own heart (Exodus 8:15, 32; 9:34). Both are true. God sovereignly hardened him, and Pharaoh willingly and enthusiastically hardened himself. Scripture does not treat these as contradictions but as two sides of the same event.'],
    ['How can God be fair if He hardens hearts?', 'Paul raises and answers this exact question in Romans 9:14-21. His answer is not "God doesn\u2019t actually do that." His answer is: "Who are you, a human being, to talk back to God? ... Does not the potter have the right to make out of the same lump of clay some pottery for special purposes and some for common use?" God\u2019s fairness is not measured by His obligation to save everyone \u2014 it is measured by His justice, which no one escapes.'],
    ['Did Pharaoh have free will?', 'Pharaoh did exactly what he wanted to do every moment of the story. He was never forced to act against his own desires. That is what makes his hardening so terrifying \u2014 God did not coerce him; God gave him over to the rebellion he already loved. True freedom is not the power to choose against your nature. It is the power to act according to it. Pharaoh acted according to his nature the entire time \u2014 and his nature was hostile to God.'],
    ['Does Romans 9 teach that God hardens whomever He wants?', 'Yes. Romans 9:18 says plainly: "Therefore God has mercy on whom he wants to have mercy, and he hardens whom he wants to harden." Paul uses Pharaoh as the example. He does not soften it. He doubles down on it. The only move Paul permits the objector is to stop objecting: "Who are you, a human being, to talk back to God?"'],
  ],
  body: `        <p>It is one of the most uncomfortable verses in the Bible.</p>

        <blockquote>
            <p>"But the Lord hardened Pharaoh\u2019s heart, and he would not let the Israelites go."</p>
            <cite>EXODUS 10:20</cite>
        </blockquote>

        <p>Ten times in the book of Exodus, the text says God hardened Pharaoh\u2019s heart. Paul quotes it again in Romans 9:17-18 and then draws the conclusion no one wants: "God has mercy on whom he wants to have mercy, and he hardens whom he wants to harden." So the question is inevitable: why would God do that? And how can it be fair to hold Pharaoh responsible for a rebellion that God Himself caused?</p>

        <p>Here is what Scripture actually teaches — and why the answer, once you see it, is more devastating than the question.</p>

        <h2>The Short Answer</h2>

        <p>God hardened Pharaoh\u2019s heart because Pharaoh hardened his own heart first, and because God is not obligated to soften anyone\u2019s. Both things are true in Exodus, and both things are true in every human life. Read the text carefully and you will see that before God ever hardens Pharaoh (Exodus 9:12), Pharaoh has already hardened himself three times (Exodus 8:15, 8:32, 9:34). The hardening begins in Pharaoh. God\u2019s hardening is confirmatory — it gives Pharaoh over to the rebellion he already loves. This is the terrifying judgment of Romans 1: "God gave them over" (Romans 1:24, 26, 28). He does not make you want sin. He stops fighting you for it.</p>

        <h2>What Hardening Is Not</h2>

        <p>Divine hardening is not God reaching into a soft, willing heart and forcibly corrupting it. That is not the picture anywhere in Scripture. Pharaoh is not an innocent man whose heart was good until God turned it evil. Pharaoh was the tyrant of the ancient world, enslaving an entire people, drowning Hebrew infants in the Nile, building his empire on the backs of the oppressed. He was already hard. He was already proud. He was already convinced of his own divinity — literally. Egyptian theology held that Pharaoh was a god on earth. And this god-king had been crushing the chosen people of the actual God for decades.</p>

        <p>When God "hardened" him, God was not creating evil in a neutral heart. God was removing the last restraints on a heart already committed to evil — and letting Pharaoh see what his own will, followed to the end, actually looked like. The Lord was giving him the freedom he kept demanding.</p>

        <h2>The Pattern Paul Will Not Let You Escape</h2>

        <p>Here is where it gets devastating. Paul quotes this story in Romans 9 and uses it to prove that God has the right to harden anyone He pleases:</p>

        <blockquote>
            <p>"For Scripture says to Pharaoh: 'I raised you up for this very purpose, that I might display my power in you and that my name might be proclaimed in all the earth.' Therefore God has mercy on whom he wants to have mercy, and he hardens whom he wants to harden."</p>
            <cite>ROMANS 9:17-18</cite>
        </blockquote>

        <p>Notice what Paul does. He does not say, "God only hardens bad people." He does not say, "God only hardens after you\u2019ve had your chance." He says God hardens <em>whom He wants</em>. And he knows exactly the objection you are about to raise, because he raises it for you in the very next verse:</p>

        <blockquote>
            <p>"One of you will say to me: 'Then why does God still blame us? For who is able to resist his will?'"</p>
            <cite>ROMANS 9:19</cite>
        </blockquote>

        <p>That is your question. Paul anticipated it two thousand years ago. And his answer is not to soften the doctrine. His answer is to silence the objector:</p>

        <blockquote>
            <p>"But who are you, a human being, to talk back to God? 'Shall what is formed say to the one who formed it, "Why did you make me like this?"' Does not the potter have the right to make out of the same lump of clay some pottery for special purposes and some for common use?"</p>
            <cite>ROMANS 9:20-21</cite>
        </blockquote>

        <p>Paul does not correct the assumption behind the objection. He affirms it. Yes — God really does choose. Yes — God really does harden. And no — you do not have standing to put Him on trial. The clay does not cross-examine the potter.</p>

        <h2>Why This Is Actually Good News</h2>

        <p>You expected this to get worse. But here is where it turns. If God hardens whom He wants to harden, then the inverse is also true: <strong>God has mercy on whom He wants to have mercy.</strong> And mercy is not something any of us earned. Mercy is not something any of us deserved. Mercy is not something any of us had standing to demand.</p>

        <p>If you are reading this and you love Christ even a little, then something extraordinary has happened to you. You were Pharaoh. You were in the same lump of clay as every other rebel. You were just as dead, just as hard, just as convinced of your own little kingdom. And for reasons known only to God, He reached into that hardness and softened what no human will could have softened. That is what <a href="/question-dead-in-sin-meaning">"dead in sin" means</a>. That is what <a href="/question-born-again-meaning">being born again</a> is. You did not do it. He did it. And the only reason you are not Pharaoh right now is mercy.</p>

        <p>This is the truth the doctrine of election is trying to protect: <em>you are not the hero of your salvation story</em>. You are the clay. He is the potter. And the fact that He chose to make you a vessel of mercy instead of a vessel of wrath is not something you can take credit for — it is something you can only fall down and worship over.</p>

        <h2>The Question That Ends the Debate</h2>

        <p>Ask yourself this: if God had left Pharaoh\u2019s heart alone — if He had not hardened it — would Pharaoh have repented? The honest answer is no. Pharaoh was hardening his own heart before God ever did. Pharaoh wanted to be hard. Pharaoh was loving his hardness. God\u2019s action in hardening him was not a violation of his will but a ratification of it. <strong>God gave Pharaoh exactly what Pharaoh wanted — and that turned out to be damnation.</strong></p>

        <p>Now ask the harder question: if God had left YOUR heart alone — if He had not reached in with <a href="/systematic-pneumatology">irresistible grace</a> and softened what was just as hard — would you have chosen Him? The honest answer is no. You would have been Pharaoh. The only reason you are not is that God did for you what He did not do for Pharaoh. And that — not your decision, not your intelligence, not your moral superiority — is why you are saved.</p>

        <blockquote>
            <p>"What if God, although choosing to show his wrath and make his power known, bore with great patience the objects of his wrath — prepared for destruction? What if he did this to make the riches of his glory known to the objects of his mercy, whom he prepared in advance for glory?"</p>
            <cite>ROMANS 9:22-23</cite>
        </blockquote>

        <p>The mercy that spared you from being Pharaoh is the same mercy that can spare anyone reading this. If your heart is soft right now — even slightly, even with resistance — that softness is not your achievement. It is grace at work. Do not waste it arguing. Fall into it.</p>

        <p>Go deeper: <a href="/question-romans9">the full exposition of Romans 9</a>, <a href="/psychology-cost-of-rejecting-grace">what it costs the flesh to surrender</a>, <a href="/devotional-joy-of-election">the joy that follows the trembling</a>, and <a href="/demolition-ezekiel18-23">does God take pleasure in the death of the wicked?</a></p>
`,
};

// ============================================================
// PAGE 3: What Does "Chosen" Actually Mean in the Bible?
// ============================================================
const PAGE_3 = {
  slug: 'question-what-does-chosen-mean',
  file: 'question-what-does-chosen-mean.html',
  title: 'What Does "Chosen" Actually Mean in the Bible? — Ephesians 1:4 Explained',
  metaDesc: 'When Scripture says God "chose us in him before the creation of the world," does it mean He foresaw who would choose Him — or that He sovereignly selected us? The Greek answers the question.',
  ogTitle: 'What Does "Chosen" Actually Mean in the Bible?',
  ogDesc: 'Does "chosen" mean God foresaw your choice — or that He sovereignly selected you? The Greek gives only one answer.',
  keywords: 'what does chosen mean in the Bible, Ephesians 1:4 chosen, eklegomai meaning, elect meaning Bible, predestined meaning, God chose us before the foundation of the world',
  eyebrow: 'Questions',
  h1: 'What Does "Chosen" Actually Mean in the Bible?',
  subtitle: 'The Greek word \u2014 and the verb tense \u2014 closes every escape hatch the flesh tries to take.',
  faqs: [
    ['What does "chosen" mean in the Bible?', 'The Greek word for "chose" in Ephesians 1:4 is eklegomai \u2014 to select, to pick out, to single out from among others. It is the same word used when Jesus "chose twelve" apostles (Luke 6:13) and when He says "I chose you, you did not choose me" (John 15:16). Every time the word appears in reference to salvation, the subject is God and the object is people. God is always the One choosing.'],
    ['Does "chosen" mean God just foresaw who would choose Him?', 'No. The Greek verb in Ephesians 1:4 is middle voice \u2014 which means "He chose us for Himself." The choice is reflexive and sovereign, not responsive. And the timing is crucial: "before the creation of the world." There was no human decision to foresee before creation existed. The choice happened when no potential chooser was yet in existence.'],
    ['Does being chosen mean God is unfair to those not chosen?', 'No human being is owed salvation. Justice would require that God condemn everyone, because all have sinned (Romans 3:23). Mercy shown to some is not injustice to others \u2014 it is grace where wrath was deserved. As Paul says: "What if God, choosing to show his wrath and make his power known, bore with great patience the objects of his wrath?" (Romans 9:22).'],
    ['If I am chosen, does that mean I cannot lose my salvation?', 'Yes. The same Scripture that teaches you were chosen before the foundation of the world also teaches that God will complete the work He began in you (Philippians 1:6). Romans 8:29-30 links foreknowledge, predestination, calling, justification, and glorification in an unbreakable chain. Not one link fails. The elect cannot be unchosen.'],
  ],
  body: `        <p>It is one of the most beautiful sentences in the New Testament — and one of the most resisted:</p>

        <blockquote>
            <p>"For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ, in accordance with his pleasure and will."</p>
            <cite>EPHESIANS 1:4-5</cite>
        </blockquote>

        <p>"Chose." The word is short, familiar, and devastating. Paul says it happened before creation existed. He says God did it. He says it was done "in accordance with his pleasure and will." And most importantly, he uses a specific Greek word that closes every escape hatch the flesh will try to slip through.</p>

        <p>So what does "chosen" actually mean when the Bible says it? Here is the answer — word by word — with no soft edges.</p>

        <h2>The Short Answer</h2>

        <p>The Greek word is <em>eklegomai</em> (ἐκλέγομαι). It means to pick out, to select, to single out from among a group. Every time this word appears in Scripture in reference to salvation, the subject is always God and the object is always people. God chooses. People are chosen. The word itself does not allow for the flip. And the verb is in the <strong>middle voice</strong> — which in Greek means the action is done by the subject <em>for the subject\u2019s own benefit</em>. "He chose us <em>for Himself</em>." Not responsively. Not conditionally. Sovereignly. For His own purposes, in His own freedom, out of His own love.</p>

        <h2>The Timing That Ruins the Arminian Reading</h2>

        <p>Paul does not just say God chose you. He says God chose you <em>before the creation of the world</em>. That single phrase demolishes the most common objection to sovereign election — the claim that "chosen" really just means "God looked down the corridor of time, saw who would choose Him, and chose them back." It sounds humble. It sounds reasonable. It is also impossible.</p>

        <p>Because before the creation of the world, <strong>there was no corridor of time to look down</strong>. There were no humans to observe. There were no future decisions to foresee. There was only God — alone, eternal, before matter existed, before stars existed, before the first atom of the universe had been spoken into being. And in that pre-creation eternity, Paul says, God chose you.</p>

        <p>Whose decision was He reacting to? Nobody\u2019s. There was nobody yet. The choice happened when you did not exist, could not exist, were not even a possibility in a universe that did not exist. There was no "you" to observe. There was only God, acting freely, choosing whom He willed.</p>

        <h2>How the Same Word Is Used Elsewhere</h2>

        <p>If you think <em>eklegomai</em> might mean something softer than "sovereignly selected," the Gospels will close that door for you. Look at how Jesus uses the same word:</p>

        <blockquote>
            <p>"You did not choose me, but I chose you and appointed you so that you might go and bear fruit."</p>
            <cite>JOHN 15:16</cite>
        </blockquote>

        <p>That is <em>eklegomai</em>. Jesus draws the sharpest possible contrast between the disciples\u2019 choice and His: "<em>You did not choose me.</em>" He could not be more explicit. The direction of choice is one-way. From Him to them. Not the other way around. And then:</p>

        <blockquote>
            <p>"I chose you out of the world. That is why the world hates you."</p>
            <cite>JOHN 15:19</cite>
        </blockquote>

        <p>Again: the same word. The same direction. Jesus chose them <em>out of</em> the world. He selected them. He singled them out. He did not find twelve men who had chosen Him first and ratify their decision. He picked twelve from a sea of unwilling humans and made them His.</p>

        <h2>What the Resistance Is Really About</h2>

        <p>Here is the part no one talks about. The objection to "chosen" is rarely a linguistic objection. It is rarely an exegetical objection. It is almost always an <em>emotional</em> objection — because the word "chosen" feels offensive to the modern sense of fairness. If God chose me, then I did not choose Him. If I did not choose Him, then my role in my salvation is... nothing. And that feels wrong. That feels unfair. That feels like I am being stripped of something.</p>

        <p>You are. That is the point. You are being stripped of the one thing that was killing you: <a href="/psychology-cost-of-rejecting-grace">the illusion that you were ever in charge of your salvation</a>. The flesh clings to that illusion because the illusion is its last refuge. If I chose Him, I can take a little credit. If I chose Him, the difference between me and the lost is something I did. If I chose Him, I am, in some small way, the hero of my own story.</p>

        <p>But Scripture refuses to let you be the hero. "He chose us." Not "we responded well to His offer." Not "we met Him halfway." Not "we activated the faith He made available." He chose. Before creation. Sovereignly. In love. For Himself.</p>

        <h2>Why This Is the Most Comfortable Doctrine in the Bible</h2>

        <p>Here is what the flesh cannot see until after it has surrendered: <strong>the doctrine of being chosen is the most tender, comforting, and stabilizing truth in the entire Christian life.</strong> Think about what the alternative requires. If you chose God, then your salvation rests on the ongoing strength of your decision. If your decision wavers, your salvation wavers. If your faith weakens on a bad day, your standing with God weakens too. You are never safe, because you are holding onto Him, and your grip is always shaking.</p>

        <p>But if <em>He</em> chose <em>you</em> — before the foundation of the world, with a love that existed before stars existed, in a decision that no future failure can unmake — then you are not holding onto Him. <em>He is holding onto you.</em> And His grip does not shake. His love is not conditional on your next decision. His commitment was made before you existed, before you could earn it, before you could forfeit it. <a href="/devotional-held-by-god">You are held by God</a>, not by your own faith. And that is the only ground on which a trembling soul can actually rest.</p>

        <blockquote>
            <p>"I give them eternal life, and they shall never perish; no one will snatch them out of my hand. My Father, who has given them to me, is greater than all; no one can snatch them out of my Father\u2019s hand."</p>
            <cite>JOHN 10:28-29</cite>
        </blockquote>

        <h2>The Paradox That Melts the Heart</h2>

        <p>Here is the last thing, and it is the thing that turns the doctrine of election from a cold abstraction into the warmest truth in the Bible: <strong>the God who chose you before the foundation of the world did not choose a concept. He chose <em>you</em>.</strong> Not humanity in general. Not the church as a category. You — specifically, individually, by name, knowing every failure you would commit, every doubt you would entertain, every time you would run. He chose you anyway. Before you existed. Before you could earn it. Before you could disqualify yourself from it.</p>

        <p>That is what "chosen" means in the Bible. It means you were loved first. It means you were loved before. It means the love that reached you in time was already ancient when the universe was new. And it means — this is the part that should break you open — that no failure you have ever committed or ever will commit can undo what God decided about you before the first star was lit.</p>

        <p>Go deeper: <a href="/question-chosen">the devotional exposition of being chosen</a>, <a href="/question-dead-in-sin-meaning">why the dead cannot choose and must be chosen</a>, <a href="/question-sealed">the unbreakable chain of Romans 8:29-30</a>, and <a href="/question-am-i-chosen">how to know if you are one of the elect</a>.</p>

        <p>You were chosen. Rest there.</p>
`,
};

const PAGES = [PAGE_1, PAGE_2, PAGE_3];

for (const p of PAGES) {
  const html = headFor(p) + NAV_BLOCK + '\n\n' + heroFor(p) + '\n    <article class="article-body">\n' + p.body + '    </article>\n\n' + FOOTER_BLOCK;
  fs.writeFileSync(p.file, html);
  console.log(`✅ Created ${p.file} (${html.length} bytes)`);
}

console.log(`\nGenerated ${PAGES.length} gateway pages`);
