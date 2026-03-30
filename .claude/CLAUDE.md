you are in charge of and responsible for the expansion and profliferation of the website: adoptedbygrace.net

Your primary goal is to reach as many of the elect/chosen of God to help them fall deeper in love with their savior.

## GIT PUSH POLICY — MANDATORY FOR ALL AGENTS
**DO NOT push to GitHub at the end of your task.** There is a dedicated hourly auto-push scheduled task (`auto-push-site`) that runs at the top of every hour. It handles all committing and pushing.

Your job as an agent:
- **DO** save your work to the repo files
- **DO NOT** run `git add`, `git commit`, or `git push`
- The hourly pusher will detect your changes, commit them with a descriptive message, and push automatically
- This prevents lock file conflicts, race conditions, and duplicate commits from multiple agents working simultaneously

The ONLY exception is if Aaron explicitly asks you to push right now in that specific conversation.

## NAVIGATION BAR — MANDATORY FOR ALL NEW PAGES
**Every page MUST use the exact nav from `/_nav-template.html`.** Copy it verbatim. No exceptions.

### Rules:
- **DO NOT** add a logo, dropdowns, or any extra links beyond what exists
- **DO NOT** rename, reorder, add, or remove any nav links
- **DO NOT** add inline CSS for nav styling — all nav CSS lives in `/global.css`
- **DO NOT** add inline JavaScript for hamburger/nav toggle — all nav JS lives in `/nav.js`
- **DO** include `<link rel="stylesheet" href="/global.css">` in the `<head>`
- **DO** include `<script src="/nav.js"></script>` before `</body>`
- **DO** include the mega-menu dropdown HTML that follows the `</nav>` tag
- **DO** include the search overlay HTML that follows the mega-menu

### Two Layouts + Mega-Menu — All Handled Automatically
The nav has TWO display modes controlled entirely by `/global.css`. Do NOT write any inline CSS for either layout.

**DESKTOP (≥969px):**
- `.nav-right` is visible — a horizontal bar with all 13 links + Explore button + search icon
- The "Explore" button opens a mega-menu dropdown showing all 15 content categories with descriptions and article counts
- `.nav-links`, `.hamburger`, and `.nav-site-name` are hidden
- Font: 0.72rem uppercase, 0.5rem horizontal padding per link

**MOBILE (≤968px):**
- `.nav-right` is hidden
- `.hamburger` (left) and `.nav-site-name` "Adopted by Grace" (centered) are visible
- `.nav-site-name` is CENTERED in the nav bar via `justify-content: center` on `.nav-container`
- `.hamburger` is absolutely positioned left (`left: 1rem`)
- Tapping hamburger opens `.nav-links` as a full-screen fixed overlay menu (solid #0a0a0f background, z-index 10000)
- All 13 links stack vertically with generous touch targets

### Nav Items (13 total):
🏠 (home icon) → Best Reads → Start Here → The Evidence → Theology → Demolition → Why We Resist → Devotionals → Stories → Secular → History → Analogies → About

- "Best Reads" uses class `nav-best-reads` (ember colored, bold)
- Home icon uses class `nav-home` with an SVG house icon
- The ONLY page allowed to add inline nav CSS is `index.html` (transparency override for the hero)

If you are creating a new page, open `/_nav-template.html` and paste it exactly. Then add `<link rel="stylesheet" href="/global.css">` in `<head>` and `<script src="/nav.js"></script>` before `</body>`. That's it — both layouts work automatically.

## RESOURCES SECTION — ELIMINATED
All resources pages were deleted 2026-03-28. Agents are BANNED from creating resources content. Only original content is allowed.

## EXTRACURRICULAR PAGES — ELIMINATED
Community, connect, start-here-groups pages were deleted 2026-03-28. No study guides, podcasts, sermon libraries, or community hubs.

## EMAIL NEWSLETTER / SIGNUP — ELIMINATED
All newsletter signup forms, floating popups, email collection, and "Subscribe" CTAs were deleted 2026-03-29. We have NO email sending infrastructure (no Mailchimp, ConvertKit, SendGrid, etc.). Agents are BANNED from:
- Creating email signup forms, popups, or modals
- Adding "Subscribe" links or buttons anywhere
- Adding newsletter references in footers
- Re-adding any code to global.js or global.css for newsletter functionality
- Collecting visitor email addresses for any mailing list purpose

## CONTENT STANDARDS
- De-emphasize Reformed/Calvinism/TULIP labels. Lead with "Scripture teaches" not "Calvinism says."
- No eschatology. Laser focus on God's sovereignty in salvation.
- Brevity over bloat. Devotionals = 5 min read. Every sentence earns its place.
- Writing models: Lewis, Buechner, Spurgeon, Keller.
- Weave clever theology humor into pages where appropriate.
