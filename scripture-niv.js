/**
 * scripture-niv.js
 *
 * Hand-curated NIV text for the verses most frequently cited on
 * adoptedbygrace.net. Used by scripture-popups.js to render hovercards.
 *
 * Keys are normalized canonical references:
 *   "Ephesians 2:8-9"   (hyphen, no spaces around it)
 *   "John 6:44"
 *   "1 Corinthians 4:7" (digit + space + book name, no period)
 *
 * Adding a verse:
 *   1. Use the exact NIV text (don't paraphrase).
 *   2. Key format: "Book Chapter:Verse" or "Book Chapter:Verse-Verse".
 *   3. Prefer the full pericope — readers benefit from context.
 *
 * Verses chosen for impact, not completeness. The long tail doesn't need
 * a hovercard; any verse not in this file simply renders as plain text
 * (the popups script is fail-soft).
 */
window.SCRIPTURE_NIV = {
    // ========== EPHESIANS — the grace epistle ==========
    "Ephesians 1:4-5": "For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ, in accordance with his pleasure and will—",
    "Ephesians 1:4": "For he chose us in him before the creation of the world to be holy and blameless in his sight.",
    "Ephesians 1:5": "In love he predestined us for adoption to sonship through Jesus Christ, in accordance with his pleasure and will—",
    "Ephesians 1:11": "In him we were also chosen, having been predestined according to the plan of him who works out everything in conformity with the purpose of his will,",
    "Ephesians 2:1": "As for you, you were dead in your transgressions and sins,",
    "Ephesians 2:3": "All of us also lived among them at one time, gratifying the cravings of our flesh and following its desires and thoughts. Like the rest, we were by nature deserving of wrath.",
    "Ephesians 2:4-5": "But because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions—it is by grace you have been saved.",
    "Ephesians 2:8-9": "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
    "Ephesians 2:10": "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.",

    // ========== ROMANS — the architecture of salvation ==========
    "Romans 3:10-12": "As it is written: 'There is no one righteous, not even one; there is no one who understands; there is no one who seeks God. All have turned away, they have together become worthless; there is no one who does good, not even one.'",
    "Romans 3:11": "there is no one who understands; there is no one who seeks God.",
    "Romans 3:23": "for all have sinned and fall short of the glory of God,",
    "Romans 5:8": "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    "Romans 8:7-8": "The mind governed by the flesh is hostile to God; it does not submit to God's law, nor can it do so. Those who are in the realm of the flesh cannot please God.",
    "Romans 8:28": "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    "Romans 8:29-30": "For those God foreknew he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers and sisters. And those he predestined, he also called; those he called, he also justified; those he justified, he also glorified.",
    "Romans 8:33": "Who will bring any charge against those whom God has chosen? It is God who justifies.",
    "Romans 8:35-39": "Who shall separate us from the love of Christ? Shall trouble or hardship or persecution or famine or nakedness or danger or sword? … No, in all these things we are more than conquerors through him who loved us. For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
    "Romans 8:38-39": "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.",
    "Romans 9:11-13": "Yet, before the twins were born or had done anything good or bad—in order that God's purpose in election might stand: not by works but by him who calls—she was told, 'The older will serve the younger.' Just as it is written: 'Jacob I loved, but Esau I hated.'",
    "Romans 9:15-16": "For he says to Moses, 'I will have mercy on whom I have mercy, and I will have compassion on whom I have compassion.' It does not, therefore, depend on human desire or effort, but on God's mercy.",
    "Romans 9:16": "It does not, therefore, depend on human desire or effort, but on God's mercy.",
    "Romans 9:18": "Therefore God has mercy on whom he wants to have mercy, and he hardens whom he wants to harden.",
    "Romans 9:20-21": "But who are you, a human being, to talk back to God? 'Shall what is formed say to the one who formed it, “Why did you make me like this?”' Does not the potter have the right to make out of the same lump of clay some pottery for special purposes and some for common use?",
    "Romans 9:22-23": "What if God, although choosing to show his wrath and make his power known, bore with great patience the objects of his wrath—prepared for destruction? What if he did this to make the riches of his glory known to the objects of his mercy, whom he prepared in advance for glory—",
    "Romans 10:9": "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
    "Romans 10:17": "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
    "Romans 11:5-6": "So too, at the present time there is a remnant chosen by grace. And if by grace, then it cannot be based on works; if it were, grace would no longer be grace.",
    "Romans 11:6": "And if by grace, then it cannot be based on works; if it were, grace would no longer be grace.",
    "Romans 11:29": "for God's gifts and his call are irrevocable.",
    "Romans 11:33-36": "Oh, the depth of the riches of the wisdom and knowledge of God! How unsearchable his judgments, and his paths beyond tracing out! 'Who has known the mind of the Lord? Or who has been his counselor?' 'Who has ever given to God, that God should repay them?' For from him and through him and for him are all things. To him be the glory forever! Amen.",

    // ========== JOHN — the Good Shepherd ==========
    "John 1:12-13": "Yet to all who did receive him, to those who believed in his name, he gave the right to become children of God—children born not of natural descent, nor of human decision or a husband's will, but born of God.",
    "John 1:13": "children born not of natural descent, nor of human decision or a husband's will, but born of God.",
    "John 3:3": "Jesus replied, 'Very truly I tell you, no one can see the kingdom of God unless they are born again.'",
    "John 3:16": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "John 6:37": "All those the Father gives me will come to me, and whoever comes to me I will never drive away.",
    "John 6:44": "No one can come to me unless the Father who sent me draws them, and I will raise them up at the last day.",
    "John 6:65": "He went on to say, 'This is why I told you that no one can come to me unless the Father has enabled them.'",
    "John 10:27-29": "My sheep listen to my voice; I know them, and they follow me. I give them eternal life, and they shall never perish; no one will snatch them out of my hand. My Father, who has given them to me, is greater than all; no one can snatch them out of my Father's hand.",
    "John 15:16": "You did not choose me, but I chose you and appointed you so that you might go and bear fruit—fruit that will last—and so that whatever you ask in my name the Father will give you.",
    "John 17:9": "I pray for them. I am not praying for the world, but for those you have given me, for they are yours.",
    "John 17:24": "Father, I want those you have given me to be with me where I am, and to see my glory, the glory you have given me because you loved me before the creation of the world.",

    // ========== 1 JOHN — grace remembered ==========
    "1 John 4:10": "This is love: not that we loved God, but that he loved us and sent his Son as an atoning sacrifice for our sins.",
    "1 John 4:19": "We love because he first loved us.",
    "1 John 5:1": "Everyone who believes that Jesus is the Christ is born of God, and everyone who loves the father loves his child as well.",

    // ========== ACTS — grace in history ==========
    "Acts 13:48": "When the Gentiles heard this, they were glad and honored the word of the Lord; and all who were appointed for eternal life believed.",
    "Acts 16:14": "One of those listening was a woman from the city of Thyatira named Lydia, a dealer in purple cloth. She was a worshiper of God. The Lord opened her heart to respond to Paul's message.",
    "Acts 17:26": "From one man he made all the nations, that they should inhabit the whole earth; and he marked out their appointed times in history and the boundaries of their lands.",

    // ========== 1 & 2 CORINTHIANS ==========
    "1 Corinthians 1:26-31": "Brothers and sisters, think of what you were when you were called. Not many of you were wise by human standards; not many were influential; not many were of noble birth. But God chose the foolish things of the world to shame the wise; God chose the weak things of the world to shame the strong. God chose the lowly things of this world and the despised things—and the things that are not—to nullify the things that are, so that no one may boast before him. It is because of him that you are in Christ Jesus, who has become for us wisdom from God—that is, our righteousness, holiness and redemption. Therefore, as it is written: 'Let the one who boasts boast in the Lord.'",
    "1 Corinthians 2:14": "The person without the Spirit does not accept the things that come from the Spirit of God but considers them foolishness, and cannot understand them because they are discerned only through the Spirit.",
    "1 Corinthians 4:7": "For who makes you different from anyone else? What do you have that you did not receive? And if you did receive it, why do you boast as though you did not?",
    "1 Corinthians 15:10": "But by the grace of God I am what I am, and his grace to me was not without effect. No, I worked harder than all of them—yet not I, but the grace of God that was with me.",
    "2 Corinthians 4:6": "For God, who said, 'Let light shine out of darkness,' made his light shine in our hearts to give us the light of the knowledge of God's glory displayed in the face of Christ.",

    // ========== PHILIPPIANS, GALATIANS, COLOSSIANS ==========
    "Galatians 5:4": "You who are trying to be justified by the law have been alienated from Christ; you have fallen away from grace.",
    "Galatians 6:14": "May I never boast except in the cross of our Lord Jesus Christ, through which the world has been crucified to me, and I to the world.",
    "Philippians 1:6": "being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.",
    "Philippians 1:29": "For it has been granted to you on behalf of Christ not only to believe in him, but also to suffer for him,",
    "Philippians 2:12-13": "Therefore, my dear friends, as you have always obeyed—not only in my presence, but now much more in my absence—continue to work out your salvation with fear and trembling, for it is God who works in you to will and to act in order to fulfill his good purpose.",
    "Philippians 2:13": "for it is God who works in you to will and to act in order to fulfill his good purpose.",
    "Colossians 2:13": "When you were dead in your sins and in the uncircumcision of your flesh, God made you alive with Christ. He forgave us all our sins,",

    // ========== 1 & 2 THESSALONIANS, 2 TIMOTHY, TITUS ==========
    "2 Thessalonians 2:13-14": "But we ought always to thank God for you, brothers and sisters loved by the Lord, because God chose you as firstfruits to be saved through the sanctifying work of the Spirit and through belief in the truth. He called you to this through our gospel, that you might share in the glory of our Lord Jesus Christ.",
    "2 Timothy 1:9": "He has saved us and called us to a holy life—not because of anything we have done but because of his own purpose and grace. This grace was given us in Christ Jesus before the beginning of time,",
    "2 Timothy 2:25": "Opponents must be gently instructed, in the hope that God will grant them repentance leading them to a knowledge of the truth,",
    "Titus 3:5": "he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit,",

    // ========== HEBREWS, JAMES, 1 & 2 PETER ==========
    "Hebrews 12:2": "fixing our eyes on Jesus, the pioneer and perfecter of faith. For the joy set before him he endured the cross, scorning its shame, and sat down at the right hand of the throne of God.",
    "James 1:17-18": "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows. He chose to give us birth through the word of truth, that we might be a kind of firstfruits of all he created.",
    "James 1:18": "He chose to give us birth through the word of truth, that we might be a kind of firstfruits of all he created.",
    "1 Peter 1:2": "who have been chosen according to the foreknowledge of God the Father, through the sanctifying work of the Spirit, to be obedient to Jesus Christ and sprinkled with his blood: Grace and peace be yours in abundance.",
    "1 Peter 1:3-5": "Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead, and into an inheritance that can never perish, spoil or fade. This inheritance is kept in heaven for you, who through faith are shielded by God's power until the coming of the salvation that is ready to be revealed in the last time.",
    "1 Peter 2:9-10": "But you are a chosen people, a royal priesthood, a holy nation, God's special possession, that you may declare the praises of him who called you out of darkness into his wonderful light. Once you were not a people, but now you are the people of God; once you had not received mercy, but now you have received mercy.",

    // ========== REVELATION ==========
    "Revelation 13:8": "All inhabitants of the earth will worship the beast—all whose names have not been written in the Lamb's book of life, the Lamb who was slain from the creation of the world.",
    "Revelation 17:8": "The beast, which you saw, once was, now is not, and yet will come up out of the Abyss and go to its destruction. The inhabitants of the earth whose names have not been written in the book of life from the creation of the world will be astonished when they see the beast, because it once was, now is not, and yet will come.",
    "Revelation 21:27": "Nothing impure will ever enter it, nor will anyone who does what is shameful or deceitful, but only those whose names are written in the Lamb's book of life.",

    // ========== OLD TESTAMENT — sovereignty and mercy ==========
    "Genesis 50:20": "You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives.",
    "Deuteronomy 7:7-8": "The Lord did not set his affection on you and choose you because you were more numerous than other peoples, for you were the fewest of all peoples. But it was because the Lord loved you and kept the oath he swore to your ancestors that he brought you out with a mighty hand and redeemed you from the land of slavery, from the power of Pharaoh king of Egypt.",
    "Psalm 51:5": "Surely I was sinful at birth, sinful from the time my mother conceived me.",
    "Psalm 65:4": "Blessed are those you choose and bring near to live in your courts! We are filled with the good things of your house, of your holy temple.",
    "Psalm 115:3": "Our God is in heaven; he does whatever pleases him.",
    "Psalm 139:16": "Your eyes saw my unformed body; all the days ordained for me were written in your book before one of them came to be.",
    "Proverbs 16:9": "In their hearts humans plan their course, but the Lord establishes their steps.",
    "Proverbs 21:1": "In the Lord's hand the king's heart is a stream of water that he channels toward all who please him.",
    "Isaiah 43:25": "I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.",
    "Isaiah 46:9-10": "Remember the former things, those of long ago; I am God, and there is no other; I am God, and there is none like me. I make known the end from the beginning, from ancient times, what is still to come. I say, 'My purpose will stand, and I will do all that I please.'",
    "Isaiah 53:6": "We all, like sheep, have gone astray, each of us has turned to our own way; and the Lord has laid on him the iniquity of us all.",
    "Isaiah 55:8-9": "'For my thoughts are not your thoughts, neither are your ways my ways,' declares the Lord. 'As the heavens are higher than the earth, so are my ways higher than your ways and my thoughts than your thoughts.'",
    "Jeremiah 1:5": "Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations.",
    "Jeremiah 9:23-24": "This is what the Lord says: 'Let not the wise boast of their wisdom or the strong boast of their strength or the rich boast of their riches, but let the one who boasts boast about this: that they have the understanding to know me, that I am the Lord, who exercises kindness, justice and righteousness on earth, for in these I delight,' declares the Lord.",
    "Jeremiah 17:9": "The heart is deceitful above all things and beyond cure. Who can understand it?",
    "Jeremiah 31:3": "The Lord appeared to us in the past, saying: 'I have loved you with an everlasting love; I have drawn you with unfailing kindness.'",
    "Lamentations 3:22-23": "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    "Ezekiel 36:26-27": "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh. And I will put my Spirit in you and move you to follow my decrees and be careful to keep my laws.",
    "Jonah 2:9": "But I, with shouts of grateful praise, will sacrifice to you. What I have vowed I will make good. I will say, 'Salvation comes from the Lord.'",

    // ========== GOSPELS — the Son speaks ==========
    "Matthew 11:27": "All things have been committed to me by my Father. No one knows the Son except the Father, and no one knows the Father except the Son and those to whom the Son chooses to reveal him.",
    "Matthew 11:28-30": "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
    "Matthew 16:17": "Jesus replied, 'Blessed are you, Simon son of Jonah, for this was not revealed to you by flesh and blood, but by my Father in heaven.'",
    "Luke 10:21-22": "At that time Jesus, full of joy through the Holy Spirit, said, 'I praise you, Father, Lord of heaven and earth, because you have hidden these things from the wise and learned, and revealed them to little children. Yes, Father, for this is what you were pleased to do. All things have been committed to me by my Father. No one knows who the Son is except the Father, and no one knows who the Father is except the Son and those to whom the Son chooses to reveal him.'"
};
