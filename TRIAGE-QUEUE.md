# TRIAGE QUEUE — PAGES AWAITING RESCUE

**Created:** 2026-04-07
**Reason for existence:** The Forge was silently flagging pages as "TRIAGE" with nowhere for those flags to go. No downstream agent read the flags. Every flagged page rotted. This file is the fix. Triage flags now live HERE, every creator agent reads this file on startup, and no flagged page is allowed to sit in the queue longer than seven days.

---

## ⚠️ THE APRIL MANDATE — NORTH STAR FOR THIS FILE

**By the end of April 2026, not a single article on adoptedbygrace.net may score below 9/10 on the Forge diagnostic.** That is the explicit directive from Aaron, received 2026-04-07.

This queue is the chokepoint. If weak pages are not captured here and rebuilt by creator agents, the April Mandate cannot be met. Every agent that participates in this queue — by writing to it, reading from it, or pulling pages out of it — is participating in the rescue of the site's weakest content. Treat this file as load-bearing infrastructure, not a todo list.

---

## WHAT GOES IN THIS FILE

A page belongs in this queue if ANY of the following are true:

1. **The Forge diagnosed it at 1-3/10.** Mode A (amplification) is impossible because there is no embers to preserve. Mode B (demolition) collapses into from-scratch rebuild, which is a creator agent's job, not the Forge's.
2. **The Enhancer, Scout, or Strategist found it in the bottom tier during a scan.** Any agent that stumbles onto a structurally broken, stub-quality, or argumentatively empty page flags it here.
3. **Aaron explicitly flagged it.** The user can drop a page into this queue at any time and it jumps to the top of the priority order.

---

## WHAT COMES OUT OF THIS FILE

Every creator agent — Creator, Storyteller, Apologist, Exegete, Historian, Philosopher, Evangelist — **reads this queue as the first action of its startup sequence.** If any page in the queue matches the agent's lane, pulling that page from the queue and rebuilding it from scratch is the agent's **first-priority page of the session.** This is not optional. A creator agent that ignores a matching triage flag in favor of "greenfield" work is in violation of the April Mandate.

The Enhancer also reads this queue. If a flagged page is a structural/wrapper/missing-nav failure (not a content-quality failure), the Enhancer can handle it faster than a creator agent — those cases stay with the Enhancer.

The Overseer and Strategist monitor this queue every session. If the queue is growing instead of shrinking, they escalate to Aaron immediately — the system is failing and it needs manual intervention.

---

## LANE ROUTING — WHICH AGENT HANDLES WHICH TRIAGE

When flagging a page, add a suggested lane based on the page's content type:

| Page type                                        | Primary agent      | Backup            |
|--------------------------------------------------|--------------------|-------------------|
| `question-*.html` (apologetic Q&A)               | Apologist          | Creator           |
| `story-*.html`, `analogy-*.html`, `parable-*.html` | Storyteller      | Creator           |
| `systematic-*.html` (theology proper)            | Exegete            | Creator           |
| `history-*.html`, `theologian-*.html`            | Historian          | Creator           |
| `philosophy-*.html`, `demolition-*.html`         | Philosopher        | Creator           |
| `devotional-*.html`, `healing-*.html`            | Evangelist         | Creator           |
| `psychology-*.html`                              | Philosopher        | Creator           |
| Structural/wrapper failure only                  | Enhancer           | Guardian          |
| Unknown / cross-category                         | Creator            | Strategist routes |

If an agent is unsure whether a page matches its lane, it should default to pulling the oldest flagged page in the queue regardless of perfect fit. **A slightly-off-lane rescue is infinitely better than no rescue.** The April Mandate does not care about lane purity.

---

## QUEUE SCHEMA

Every entry in the queue below must use this exact format. Do not deviate.

```
### [PAGE-FILENAME.html]
- **Flagged by:** [agent name]
- **Flagged on:** [YYYY-MM-DD]
- **Score:** [N/10]
- **Lane:** [primary agent from routing table]
- **Why it's weak:** [1-2 sentence diagnosis — be specific. "Stub quality" is not enough. Say WHAT is missing.]
- **What a rebuild should contain:** [1-3 sentence sketch of the page a 9+/10 version would be]
- **Status:** OPEN | IN PROGRESS (agent: X, since YYYY-MM-DD) | CLOSED (rebuilt YYYY-MM-DD, new score N/10)
```

When an agent starts rebuilding a flagged page, it updates the Status line to IN PROGRESS with its name and date. When the page is rebuilt and scores 9+ on re-diagnosis, the entry is updated to CLOSED with the new score. **Closed entries remain in this file for history — they are never deleted.** The queue is append-only, like the Forge Ledger.

---

## SEVEN-DAY ESCALATION RULE

If a page sits in this queue with Status OPEN for more than seven days, **any agent that reads the queue must treat rebuilding it as their top priority**, regardless of normal lane routing. A flag older than seven days is evidence that no lane-matched creator agent has picked it up, and the April Mandate deadline is getting closer every day the flag sits there. After seven days, lane purity is abandoned. Whoever sees it first, fixes it.

---

## THE OPEN QUEUE

*(No pages currently flagged. When the Forge, Enhancer, Scout, or Strategist encounters a 1-3/10 page during a scan, it appends the entry below this line using the schema above.)*

---

## THE CLOSED LOG

*(When a flagged page is rebuilt and re-diagnosed at 9+, move its entry below this line and update Status to CLOSED. Do not delete. The log is proof the system works.)*
