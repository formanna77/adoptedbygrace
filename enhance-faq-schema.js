#!/usr/bin/env node
/**
 * EVANGELIST — Replace weak auto-generated FAQ schemas with hand-crafted ones
 * on high-priority question and demolition pages.
 */

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

// Hand-crafted FAQs for high-priority pages
const FAQ_UPGRADES = {
  'question-cannot.html': [
    { q: "What does the Bible say humans cannot do spiritually?", a: "Scripture repeatedly teaches that fallen humans cannot come to God on their own (John 6:44), cannot understand spiritual things (1 Corinthians 2:14), cannot please God in the flesh (Romans 8:8), and cannot change their own nature (Jeremiah 13:23). The Bible's portrait is not of a sick patient who needs help — but a dead person who needs resurrection." },
    { q: "Does the Bible teach total inability?", a: "Yes. Dozens of verses declare that apart from God's sovereign intervention, humans are unable to seek God (Romans 3:11), believe in Christ (John 6:65), or do anything spiritually good (John 15:5). This is what theologians call total inability — not that humans are as bad as they could be, but that sin affects every part of their being." },
    { q: "If humans can't choose God, how is anyone saved?", a: "That is precisely the point. Salvation must come entirely from God. Jesus said, 'No one can come to me unless the Father who sent me draws them' (John 6:44). God must first give new life, new eyes, and a new heart before anyone believes — which is why faith itself is called a gift (Ephesians 2:8-9)." }
  ],
  'question-boasting.html': [
    { q: "Why does the Bible say no one may boast about salvation?", a: "Ephesians 2:8-9 and 1 Corinthians 1:26-31 are emphatic: salvation is structured so that no one can boast. If your decision was the decisive factor in your salvation, you have something the unsaved person doesn't — a better will, a better choice. That is boasting, even if you don't call it that." },
    { q: "Does choosing God count as boasting?", a: "Paul's logic in 1 Corinthians 1:26-31 leaves no room for human contribution. God deliberately chose the weak, foolish, and lowly 'so that no one may boast before him.' If your choice saves you, you have a basis for boasting that Paul says cannot exist." }
  ],
  'question-goldchain.html': [
    { q: "What is the golden chain of salvation in Romans 8:28-30?", a: "Romans 8:29-30 describes an unbreakable sequence: those God foreknew, he predestined; those he predestined, he called; those he called, he justified; those he justified, he glorified. Not a single person is lost between links. Everyone foreknown ends up glorified — with zero dropouts." },
    { q: "Can God's plan of salvation be broken?", a: "No. Romans 8:28-30 presents salvation as a completed chain with no missing links. The same group that was foreknown is glorified — Paul even uses the past tense for glorification, as though it's already done. If you are in Christ, your glorification is as certain as your justification." }
  ],
  'question-irresistible.html': [
    { q: "What is irresistible grace?", a: "Irresistible grace (effectual calling) means that when God purposes to save someone, His call accomplishes what it intends. It is not that people are forced against their will — it's that God changes the will itself, making the person willing and eager to come. As Jesus said, 'All those the Father gives me will come to me' (John 6:37)." },
    { q: "Does irresistible grace mean God forces people to believe?", a: "No. God doesn't drag unwilling people into heaven. He makes unwilling people willing by giving them new hearts (Ezekiel 36:26). The person who was once dead in sin is made alive — and the newly alive person comes to Christ freely, joyfully, and irresistibly, because that is what new life does." }
  ],
  'question-newheart.html': [
    { q: "Does God change your heart without asking permission?", a: "Ezekiel 36:26 says 'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.' Notice: God does not ask for cooperation. He doesn't wait for the stone heart to soften itself. He removes it and replaces it — because a heart of stone cannot choose its own replacement." },
    { q: "Why can't we change our own hearts?", a: "Because a heart of stone cannot will itself into becoming flesh any more than a corpse can will itself back to life. Jeremiah 13:23 asks, 'Can an Ethiopian change his skin or a leopard its spots?' The point is devastating: you cannot change what you are at the deepest level. Only God can." }
  ],
  'question-john10.html': [
    { q: "What does John 10:26 mean by 'you do not believe because you are not my sheep'?", a: "Jesus does not say 'you are not my sheep because you don't believe.' He reverses the order: unbelief is the result of not being His sheep, not the cause. Being a sheep comes first — belief follows. This destroys the Arminian reading that people become sheep by choosing to believe." },
    { q: "Can anyone snatch believers out of God's hand?", a: "Jesus gives an absolute guarantee in John 10:28-29: 'I give them eternal life, and they shall never perish; no one will snatch them out of my hand.' This includes the believer themselves — Jesus doesn't say 'no one except you.' The security is total and unconditional." }
  ],
  'question-john15.html': [
    { q: "What does 'You did not choose me, but I chose you' mean?", a: "In John 15:16, Jesus tells His disciples — and through them all believers — that the initiative in salvation belongs entirely to God. The choosing flows from God to the believer, not the other way around. You did not find God. God found you." },
    { q: "Did the disciples choose to follow Jesus?", a: "From a human perspective, yes. But Jesus clarifies the deeper reality: behind their decision was His prior choice. 'You did not choose me, but I chose you and appointed you' (John 15:16). Their choice was real — but it was the fruit of His election, not the cause of it." }
  ],
  'question-john17.html': [
    { q: "Does Jesus's prayer in John 17 prove election?", a: "Yes. Jesus prays exclusively for those 'the Father gave him' (John 17:6, 9, 24). He explicitly says, 'I am not praying for the world, but for those you have given me' (v.9). This is not a general prayer for all humanity — it is a targeted prayer for a specific group chosen by the Father." },
    { q: "Who did the Father give to Jesus?", a: "John 17 reveals that the Father gave a specific group of people to Jesus before the foundation of the world (v.24). These are the ones Jesus keeps (v.12), sanctifies (v.17), and brings to glory (v.24). Not one of them is lost — 'none has been lost except the one doomed to destruction' (v.12)." }
  ],
  'question-ezekiel37.html': [
    { q: "What does the valley of dry bones teach about salvation?", a: "Ezekiel 37 is the most vivid picture of salvation in the Old Testament. God commands dead, dry, scattered bones to live — and they do. The bones don't volunteer. They don't cooperate. They don't give God permission. They are dead, and God raises them. That is how salvation works." },
    { q: "Can dead bones choose to live?", a: "No — and that is precisely the point. Ezekiel's valley of dry bones shows that spiritual resurrection is God's work alone. The bones were not merely sick or sleeping; they were completely dead. God's Word and Spirit bring life where there was none. This is the Old Testament picture of what Jesus teaches in John 5:21: 'The Son gives life to whom he is pleased to give it.'" }
  ],
  'question-secure.html': [
    { q: "Can a true believer lose their salvation?", a: "Scripture teaches that genuine believers are kept by God's power, not their own. Jesus promises 'I give them eternal life, and they shall never perish' (John 10:28). Paul declares that nothing 'will be able to separate us from the love of God' (Romans 8:39). If salvation depends on God's choice, then only God's faithfulness — not ours — determines its permanence." },
    { q: "What about people who walked away from the faith?", a: "1 John 2:19 addresses this directly: 'They went out from us, but they did not really belong to us.' Those who permanently abandon the faith demonstrate they were never truly regenerated. Genuine saving faith — the kind God gives as a gift (Ephesians 2:8-9) — perseveres because God preserves it." }
  ],
  'question-whosoever.html': [
    { q: "Does 'whosoever believes' mean anyone can choose to believe?", a: "The word 'whosoever' (Greek: pas ho pisteuōn — 'all the believing ones') describes who is saved, not who can believe. It says everyone who believes will be saved — but it doesn't say everyone has the ability to believe. John 6:44 answers that question: 'No one can come to me unless the Father draws them.'" },
    { q: "Does John 3:16 teach that God offers salvation to every individual?", a: "John 3:16 teaches that God's love is so vast it extends to the 'world' — not just Israel — and that the means of salvation is faith. But the verse doesn't address who gives the faith or who enables belief. Jesus answers that question elsewhere: 'No one can come to me unless the Father who sent me draws them' (John 6:44)." }
  ],
  'question-book-of-life.html': [
    { q: "Can your name be blotted out of the Book of Life?", a: "Revelation 3:5 says Christ 'will never blot out the name' of the one who overcomes. This is a promise of security, not a threat of removal. The double negative in Greek (ou mē) is the strongest possible negation — 'I will absolutely never erase your name.' It is a guarantee, not a warning." },
    { q: "Were names written in the Book of Life before creation?", a: "Revelation 17:8 speaks of those 'whose names have not been written in the book of life from the creation of the world.' This implies the names were written before creation — which aligns with Ephesians 1:4, where God chose His people 'before the creation of the world.'" }
  ],
  'demolition-john3-16.html': [
    { q: "Does 'the world' in John 3:16 mean every individual person?", a: "The Greek word kosmos ('world') has multiple meanings in John's writings. In John 3:16, it means God's love extends to all kinds of people — every tribe, nation, and tongue — not that God has saving love for every individual without exception. John himself uses 'world' to mean different things in different verses (compare John 12:19, 1 John 5:19)." },
    { q: "Does John 3:16 disprove election?", a: "No. John 3:16 teaches that God loved the world enough to send His Son, and that everyone who believes will be saved. But it doesn't address the question of who enables belief. Jesus answers that in John 6:44 and 6:65 — no one can believe unless God draws them and grants them faith." },
    { q: "If God loved the 'whole world,' why doesn't He save everyone?", a: "Because 'world' in John 3:16 speaks to the scope of God's redemptive plan (not limited to Israel) rather than the extent of saving love to every individual. God's saving love — the love that actually redeems — is directed toward those He chose before the foundation of the world (Ephesians 1:4-5)." }
  ],
  'demolition-2peter3-9.html': [
    { q: "Does 2 Peter 3:9 mean God wants to save everyone?", a: "Context is decisive. Peter addresses his letter to 'you' — the elect (2 Peter 1:1, 3:1). 'Not wanting anyone to perish' refers to anyone among the elect, not every human being. God is patient toward 'you,' wanting none of you to perish — ensuring every chosen one comes to repentance in God's timing." },
    { q: "If God wants everyone saved, why isn't everyone saved?", a: "If 2 Peter 3:9 meant God desires every individual's salvation but can't achieve it, then God's will is frustrated by human choice — making humans more sovereign than God. The text actually says God is patient toward His people ('you'), ensuring all of them come to repentance." }
  ],
  'demolition-matt23-37.html': [
    { q: "Does Jesus weeping over Jerusalem prove humans can resist God's saving will?", a: "Jesus laments the religious leaders ('Jerusalem, Jerusalem, you who kill the prophets') who prevented the people from coming. Notice the distinction: 'I wanted to gather your children' — the children are not the same as 'you.' The leaders resisted; the children Jesus longed to gather are the elect within Israel whom the Father would draw (John 6:44)." },
    { q: "Did Jesus fail to save Jerusalem?", a: "Jesus mourns the consequences of the leaders' rejection, but His saving purposes were never thwarted. The elect from Jerusalem — the 3,000 saved at Pentecost, the early church — were gathered exactly as God intended. The lament is over the judgment the leaders brought upon themselves, not over a failure of God's redemptive plan." }
  ],
  'demolition-joshua24-15.html': [
    { q: "Does 'choose this day whom you will serve' prove free will?", a: "Joshua 24:15 is a command to choose between idols and the Lord — but commands don't prove ability. God commands what He requires, not what sinners can do on their own. Jesus commands 'Be perfect' (Matthew 5:48) — no one concludes humans can be perfect. Joshua calls for a choice; only God can enable the right one." },
    { q: "Can unregenerate people choose to serve God?", a: "Joshua's own words answer this: 'You are not able to serve the Lord. He is a holy God' (Joshua 24:19). Joshua recognized that Israel, left to themselves, would choose idolatry every time. The command exposes inability — it doesn't prove capability." }
  ],
  'demolition-rev3-20.html': [
    { q: "Is Revelation 3:20 about Jesus knocking on your heart's door?", a: "This verse is addressed to the church at Laodicea — already professing believers, not unbelievers. Jesus is calling a lukewarm church to repentance, not offering an evangelistic invitation. Using this verse as a salvation 'altar call' text is a modern invention that ignores its actual audience and context." },
    { q: "Does 'I stand at the door and knock' mean salvation requires human permission?", a: "No. In context, Jesus is rebuking an existing church for complacency. And even if applied broadly, the verse actually supports sovereign grace: Jesus initiates, Jesus comes, Jesus knocks. The human does not seek Jesus — Jesus seeks the human. 'If anyone hears my voice and opens the door' — but who gives the ears to hear? (Matthew 13:9-16)." }
  ],
  'demolition-romans10-9.html': [
    { q: "Does Romans 10:9 prove that salvation is a human decision?", a: "Romans 10:9 describes the means of salvation (confession and belief) but doesn't address the source of that belief. Paul himself answers where faith comes from in the same chapter: 'Faith comes from hearing the message' (Romans 10:17) — and in Ephesians 2:8-9 he calls faith a gift of God. The confession is real; the ability to make it comes from God." },
    { q: "If you confess with your mouth, does that mean salvation depends on you?", a: "Paul is describing what saving faith looks like, not what causes it. A thermometer describes fever but doesn't cause it. Confession and belief are the evidence of regeneration, not the cause. As Jesus taught, 'No one can say, \"Jesus is Lord,\" except by the Holy Spirit' (1 Corinthians 12:3)." }
  ],
  'demolition-hebrews6-4-6.html': [
    { q: "Can a Christian lose their salvation according to Hebrews 6:4-6?", a: "Hebrews 6:4-6 describes people who experienced the community of faith (tasting, being enlightened, sharing in the Spirit) but fell away — indicating they were never truly regenerated. The description matches someone who sat in the light without becoming light. Crucially, the passage says it's 'impossible' to renew them — which would be pointless to say if genuine believers could simply re-choose God." },
    { q: "What does it mean to 'fall away' in Hebrews 6?", a: "The 'falling away' describes the apostasy of those who experienced the external benefits of the covenant community without possessing genuine saving faith. 1 John 2:19 explains the pattern: 'They went out from us, but they did not really belong to us.' The falling away reveals what was always true — not a loss of something they had." }
  ]
};

let count = 0;

for (const [filename, faqs] of Object.entries(FAQ_UPGRADES)) {
  const filepath = path.join(ROOT, filename);
  if (!fs.existsSync(filepath)) {
    console.log(`SKIP: ${filename} does not exist`);
    continue;
  }

  let html = fs.readFileSync(filepath, 'utf8');

  // Build the new FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const schemaJson = JSON.stringify(faqSchema, null, 4);
  const newScript = `    <script type="application/ld+json">\n    ${schemaJson}\n    </script>`;

  // Remove existing FAQPage schema block
  const faqRegex = /\s*<script type="application\/ld\+json">\s*\{[^}]*"@type"\s*:\s*"FAQPage"[\s\S]*?\}\s*<\/script>/;
  if (html.match(faqRegex)) {
    html = html.replace(faqRegex, '');
  }

  // Insert new FAQPage schema before </head>
  html = html.replace('</head>', `${newScript}\n</head>`);

  fs.writeFileSync(filepath, html, 'utf8');
  count++;
  console.log(`✓ ${filename} — ${faqs.length} FAQs`);
}

console.log(`\nEnhanced FAQPage schema on ${count} pages.`);
