/* ============================================================
   ADOPTED BY GRACE — UX ENHANCEMENTS v2
   Universal on-page enhancements injected on every article:
     1. Skip-to-content link (a11y)
     2. Universal scroll-progress bar
     3. Breadcrumbs above article body
     4. Next/Prev navigation for healing series
     5. aria-current on the site nav

   This file is loaded AFTER nav.js on every page.
   All styling lives in /global.css (.ux-breadcrumbs,
   .series-nav, .skip-to-content, .reading-progress).

   All enhancements honor prefers-reduced-motion via CSS.

   ==== BANNED FEATURE: AUTO-TOC / "JUMP TO" / SECTION-NAV ====
   There is NO in-page jump-to nav of any kind in this file
   and there must not be one. Two patterns are banned:
     - .article-toc   (old JS-injected auto-TOC)
     - .section-nav   (hardcoded block formerly pasted into
                       21+ pages — removed 2026-04-20)
   If a future agent re-adds injectAutoTOC(), hardcodes a
   <div class="section-nav"> / <nav class="section-nav">
   block, or builds any equivalent in-page anchor-link nav,
   DELETE IT. Rationale: these navs collided with the site
   nav on /found-you, /history-apostolic, and elsewhere, and
   added clutter without a navigation benefit — h2s + the
   main site nav are enough. purgeStrayAutoTOC() below runs
   on every page as a fuse. Keep it.
   See /.claude/CLAUDE.md ELIMINATED FEATURES.
   ============================================================ */

(function () {
    'use strict';

    // ---------- Utilities ----------
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn, { once: true });
        } else {
            fn();
        }
    }

    function slugify(text) {
        return (text || '')
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }

    // Guard against running on nav template or a page with no body
    if (!document.body) return;

    // ---------- 1. Skip-to-content + main landmark (a11y) ----------
    function injectSkipToContent() {
        if (document.querySelector('.skip-to-content')) return;
        const article = document.querySelector('article.article-body, main, .hub-container');
        if (article && !article.id) article.id = 'main-content';
        // Add role="main" so screen readers recognize the content landmark.
        // Only set if no explicit <main> exists and the target doesn't already have a role.
        if (article && article.tagName !== 'MAIN' && !article.hasAttribute('role') &&
            !document.querySelector('main, [role="main"]')) {
            article.setAttribute('role', 'main');
        }
        const targetId = article ? (article.id || 'main-content') : 'main-content';
        const link = document.createElement('a');
        link.href = '#' + targetId;
        link.className = 'skip-to-content';
        link.textContent = 'Skip to content';
        document.body.insertBefore(link, document.body.firstChild);
    }

    // ---------- 2. Reading-progress bar ----------
    function injectReadingProgress() {
        if (document.querySelector('.reading-progress')) return;
        // Only show on article pages and hub pages (not on search, 404, etc.)
        const isArticle = !!document.querySelector('article.article-body');
        const isHub = !!document.querySelector('.hub-container, .hub-hero');
        if (!isArticle && !isHub) return;

        const bar = document.createElement('div');
        bar.className = 'reading-progress';
        bar.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(bar, document.body.firstChild);

        let ticking = false;
        function update() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
            ticking = false;
        }
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }

    // ---------- 3. Breadcrumbs ----------
    // Category display names keyed by URL prefix — kept in sync with the hub registry
    // in validate-site.js. Order matters: more-specific prefixes must come before shorter ones
    // (e.g. 'anxious-mind-' before nothing else; 'history-' before… nothing else).
    const BREADCRUMB_CATEGORIES = [
        { prefix: 'anxious-mind-',   label: 'Anxious Mind',    href: '/anxious-mind-hub' },
        { prefix: 'broken-mirror-',  label: 'Broken Mirror',   href: '/broken-mirror-hub' },
        { prefix: 'open-wound-',     label: 'Open Wound',      href: '/open-wound-hub' },
        { prefix: 'invisible-wall-', label: 'Invisible Wall',  href: '/invisible-wall-hub' },
        { prefix: 'shattered-lens-', label: 'Shattered Lens',  href: '/shattered-lens-hub' },
        { prefix: 'question-',       label: 'Questions',       href: '/questions' },
        { prefix: 'objection-',      label: 'Questions',       href: '/questions' },
        { prefix: 'apologetic-',     label: 'Questions',       href: '/questions' },
        { prefix: 'devotional-',     label: 'Rest in Grace',   href: '/devotionals' },
        { prefix: 'systematic-',     label: 'Theology',        href: '/systematic-theology' },
        { prefix: 'demolition-',     label: 'Demolition',      href: '/demolition-hub' },
        { prefix: 'psychology-',     label: 'Why We Resist',   href: '/psychology-hub' },
        { prefix: 'theologian-',     label: 'Theologians',     href: '/theologians' },
        { prefix: 'history-',        label: 'Church History',  href: '/history-timeline' },
        { prefix: 'creed-',          label: 'Church History',  href: '/history-timeline' },
        { prefix: 'philosophy-',     label: 'Philosophy',      href: '/philosophy-hub' },
        { prefix: 'story-',          label: 'Stories',         href: '/stories' },
        { prefix: 'analogy-',        label: 'Analogies',       href: '/analogies-illustrations' },
        { prefix: 'pastoral-',       label: 'Rest in Grace',   href: '/pastoral-hub' },
        { prefix: 'compare-',        label: 'Comparisons',     href: '/comparisons-hub' },
        { prefix: 'secular-',        label: 'Secular Evidence', href: '/secular-evidence' },
        { prefix: 'ot-',             label: 'Old Testament',   href: '/ot-hub' },
        { prefix: 'counter-',        label: 'Essays',          href: '/essays' }
    ];

    function getBreadcrumbCategory() {
        // Derive slug from URL path (strip /, .html, query)
        let path = window.location.pathname || '';
        path = path.replace(/^\//, '').replace(/\.html$/, '').split('?')[0].split('#')[0];
        if (!path) return null;
        for (const cat of BREADCRUMB_CATEGORIES) {
            if (path.startsWith(cat.prefix)) return cat;
        }
        return null;
    }

    function injectBreadcrumbs() {
        if (document.querySelector('.ux-breadcrumbs')) return;
        const article = document.querySelector('article.article-body');
        if (!article) return;
        // Require a page-hero above (means this is a content page in canonical shape)
        const hero = document.querySelector('header.page-hero');
        if (!hero) return;

        const cat = getBreadcrumbCategory();
        // Get article title from h1 inside hero. Trim the breadcrumb label to
        // the primary phrase before an em-dash / en-dash / colon / pipe —
        // long headlines like "Your Brain Decides Before You Do — And That's
        // Good News" wrap to 6+ lines in the crumb bar on mobile and clobber
        // the visual rhythm. The full title still lives in the <h1>; the
        // breadcrumb is a navigational aid, not a headline reprint.
        const h1 = hero.querySelector('h1');
        const fullTitle = h1 ? (h1.textContent || '').trim() : document.title;
        let title = fullTitle.split(/\s+[—–\-\|:]\s+/)[0].trim();
        // Cap at 60 chars even after segmentation as a safety net.
        if (title.length > 60) title = title.slice(0, 57).replace(/\s+\S*$/, '') + '…';

        const nav = document.createElement('nav');
        nav.className = 'ux-breadcrumbs';
        nav.setAttribute('aria-label', 'Breadcrumb');

        const parts = [
            '<a href="/">Home</a>'
        ];
        if (cat) {
            parts.push('<span class="ux-breadcrumbs-sep" aria-hidden="true">›</span>');
            parts.push('<a href="' + cat.href + '">' + cat.label + '</a>');
        }
        parts.push('<span class="ux-breadcrumbs-sep" aria-hidden="true">›</span>');
        parts.push('<span class="ux-breadcrumbs-current" aria-current="page">' +
            title.replace(/</g, '&lt;') + '</span>');

        nav.innerHTML = '<ol class="ux-breadcrumbs-list">' +
            parts.map(p => '<li>' + p + '</li>').join('') + '</ol>';

        // Insert right before the article
        article.parentNode.insertBefore(nav, article);

        // JSON-LD BreadcrumbList for SEO
        const items = [{ name: 'Home', url: 'https://adoptedbygrace.net/' }];
        if (cat) items.push({ name: cat.label, url: 'https://adoptedbygrace.net' + cat.href });
        items.push({ name: title, url: window.location.href });
        const ld = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map((it, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: it.name,
                item: it.url
            }))
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(ld);
        document.head.appendChild(script);
    }

    // ---------- 4. BANNED: Auto-TOC / "On This Page" / Jump-to / section-nav ----------
    // Removed 2026-04-20. Two separate patterns once rendered in-page
    // jump-to navs and both collided with the site nav:
    //   (1) JS-injected .article-toc (old injectAutoTOC function — deleted)
    //   (2) Hardcoded   .section-nav / .section-nav-container blocks
    //                   (pasted into 21+ pages, ripped out the same day)
    // This function is a runtime fuse: if any stray jump-to node slips
    // into a page via old cached HTML, a rogue agent, or a future
    // regression, it gets removed on DOMContentLoaded. Keep it. Do not
    // repurpose it. Do not add anything that BUILDS a jump-to nav here —
    // the h2 headings plus the main site nav are enough navigation.
    // Hardened 2026-04-20 (pass 2): widened the selector net, added a
    // MutationObserver so anything injected post-load is killed on sight,
    // and made the match case-insensitive on aria-label / class fragments.
    // A single reader seeing a cached "on this page" bar on /the-60-second-case
    // was enough to justify treating any such node as a production incident.
    function purgeStrayAutoTOC() {
        var selectors = [
            '.article-toc',
            '.article-toc-container',
            '.article-toc-inner',
            '.article-toc-wrapper',
            '.section-nav',
            '.section-nav-container',
            '.section-nav-inner',
            '.section-nav-wrapper',
            '.page-toc',
            '.page-nav',
            '.on-this-page',
            '.in-page-nav',
            '.jump-to-nav',
            '.jump-nav',
            '.scroll-nav',
            '.sticky-toc',
            '.toc-sticky',
            '.toc-container',
            '.chapter-nav',
            '.mini-nav',
            '.floating-toc',
            '.sidebar-toc',
            '[class*="toc-sticky" i]',
            '[class*="on-this-page" i]',
            '[class*="jump-to" i]',
            '[class*="article-toc" i]',
            '[class*="section-nav" i]',
            'nav[aria-label*="table of contents" i]',
            'nav[aria-label*="on this page" i]',
            'nav[aria-label*="jump" i]',
            'nav[aria-label*="contents" i]',
            'aside[aria-label*="table of contents" i]',
            'aside[aria-label*="on this page" i]',
            'aside[aria-label*="contents" i]',
            'div[aria-label*="on this page" i]',
            'div[aria-label*="table of contents" i]'
        ].join(', ');

        function matches(node) {
            try { return node.matches && node.matches(selectors); }
            catch (e) { return false; }
        }

        function sweep(root) {
            if (!root || !root.querySelectorAll) return;
            // Remove the root itself if it matches.
            if (matches(root)) { try { root.remove(); return; } catch (e) {} }
            var hits = root.querySelectorAll(selectors);
            for (var i = 0; i < hits.length; i++) {
                try { hits[i].remove(); } catch (e) {}
            }
        }

        sweep(document.body || document.documentElement);

        // MutationObserver: if a cached script, a rogue agent's leftover,
        // or a future regression injects a jump-nav after DOMContentLoaded,
        // kill it before the paint the user sees. One observer per page;
        // scoped to body subtree; detached after 30s to avoid perf cost.
        if (typeof MutationObserver === 'function' && document.body && !document.body.__tocFuseObserver) {
            var obs = new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    var added = mutations[i].addedNodes;
                    if (!added || !added.length) continue;
                    for (var j = 0; j < added.length; j++) {
                        var n = added[j];
                        if (n && n.nodeType === 1) sweep(n);
                    }
                }
            });
            obs.observe(document.body, { childList: true, subtree: true });
            document.body.__tocFuseObserver = obs;
            setTimeout(function () {
                try { obs.disconnect(); } catch (e) {}
                try { delete document.body.__tocFuseObserver; } catch (e) {}
            }, 30000);
        }
    }

    // ---------- 5. Healing series Next/Prev ----------
    // Ordered lists match the hub page order. Do not reorder without syncing the hubs.
    // Order follows the hub card order on each *-hub.html page.
    // Keep in sync with the hubs; the build scripts do not regenerate this list.
    const HEALING_SERIES = {
        'anxious-mind': {
            hub: '/anxious-mind-hub',
            label: 'Anxious Mind',
            items: [
                'anxious-mind-scrupulosity',
                'anxious-mind-what-if-not-chosen',
                'anxious-mind-intrusive-thoughts',
                'anxious-mind-the-loop-that-wont-break',
                'anxious-mind-brain-decides',
                'anxious-mind-never-meant-to-carry',
                'anxious-mind-sovereignty-of-sleep',
                'anxious-mind-fear-of-hell'
            ]
        },
        'broken-mirror': {
            hub: '/broken-mirror-hub',
            label: 'Broken Mirror',
            items: [
                'broken-mirror-vessels-for-mercy',
                'broken-mirror-not-self-made',
                'broken-mirror-grace-too-good',
                'broken-mirror-imposter-syndrome',
                'broken-mirror-performance-treadmill',
                'broken-mirror-sin-you-repeat',
                'broken-mirror-the-relapse'
            ]
        },
        'open-wound': {
            hub: '/open-wound-hub',
            label: 'Open Wound',
            items: [
                'open-wound-hospital-room',
                'open-wound-sovereignty-in-grief',
                'open-wound-empty-nursery',
                'open-wound-senseless-death',
                'open-wound-terminal-diagnosis',
                'open-wound-betrayed-by-church',
                'open-wound-miscarriage',
                'open-wound-the-prayer-god-didnt-answer'
            ]
        },
        'invisible-wall': {
            hub: '/invisible-wall-hub',
            label: 'Invisible Wall',
            items: [
                'invisible-wall-lonely-theological',
                'invisible-wall-marriage',
                'invisible-wall-family',
                'invisible-wall-friend-who-left',
                'invisible-wall-only-one-who-sees',
                'invisible-wall-singing-alone',
                'invisible-wall-prayer-feels-empty',
                'invisible-wall-spiritual-envy'
            ]
        },
        'shattered-lens': {
            hub: '/shattered-lens-hub',
            label: 'Shattered Lens',
            items: [
                'shattered-lens-cant-tell-true',
                'shattered-lens-cant-unsee-it',
                'shattered-lens-taught-wrong',
                'shattered-lens-pastor',
                'shattered-lens-when-prayer-stopped-working',
                'shattered-lens-silence-of-god',
                'shattered-lens-bible-doesnt-make-sense',
                'shattered-lens-lost-community'
            ]
        }
    };

    function injectSeriesNav() {
        const article = document.querySelector('article.article-body');
        if (!article) return;
        if (article.querySelector('.series-nav')) return;

        const slug = window.location.pathname.replace(/^\//, '').replace(/\.html$/, '').split('?')[0].split('#')[0];
        let match = null;
        for (const key of Object.keys(HEALING_SERIES)) {
            const series = HEALING_SERIES[key];
            const idx = series.items.indexOf(slug);
            if (idx !== -1) {
                match = { key, series, idx };
                break;
            }
        }
        if (!match) return;

        const { series, idx } = match;
        const prev = idx > 0 ? series.items[idx - 1] : null;
        const next = idx < series.items.length - 1 ? series.items[idx + 1] : null;

        const nav = document.createElement('nav');
        nav.className = 'series-nav';
        nav.setAttribute('aria-label', series.label + ' series navigation');

        const parts = [];
        parts.push('<div class="series-nav-meta">' +
            '<span class="series-nav-label">' + series.label + '</span>' +
            '<span class="series-nav-progress">Part ' + (idx + 1) + ' of ' + series.items.length + '</span>' +
            '<a class="series-nav-hub" href="' + series.hub + '">View all →</a>' +
            '</div>');

        const row = ['<div class="series-nav-row">'];
        if (prev) {
            row.push('<a class="series-nav-link series-nav-prev" href="/' + prev + '" rel="prev">' +
                '<span class="series-nav-arrow" aria-hidden="true">←</span>' +
                '<span class="series-nav-direction">Previous</span>' +
                '</a>');
        } else {
            row.push('<span class="series-nav-link series-nav-disabled" aria-hidden="true">' +
                '<span class="series-nav-arrow">←</span>' +
                '<span class="series-nav-direction">Start of series</span>' +
                '</span>');
        }
        if (next) {
            row.push('<a class="series-nav-link series-nav-next" href="/' + next + '" rel="next">' +
                '<span class="series-nav-direction">Next</span>' +
                '<span class="series-nav-arrow" aria-hidden="true">→</span>' +
                '</a>');
        } else {
            row.push('<span class="series-nav-link series-nav-disabled" aria-hidden="true">' +
                '<span class="series-nav-direction">End of series</span>' +
                '<span class="series-nav-arrow">→</span>' +
                '</span>');
        }
        row.push('</div>');
        parts.push(row.join(''));

        nav.innerHTML = parts.join('');
        article.appendChild(nav);
    }

    // ---------- Run everything ----------
    onReady(function () {
        try { injectSkipToContent(); } catch (e) { /* silent */ }
        try { injectReadingProgress(); } catch (e) { /* silent */ }
        try { injectBreadcrumbs(); } catch (e) { /* silent */ }
        try { purgeStrayAutoTOC(); } catch (e) { /* silent */ }
        try { injectSeriesNav(); } catch (e) { /* silent */ }
        try { markCurrentNavLink(); } catch (e) { /* silent */ }
    });

    // ---------- 6. aria-current on nav links (a11y) ----------
    function markCurrentNavLink() {
        var here = (location.pathname || '/').replace(/\/$/, '') || '/';
        var hereFile = here.replace(/^\/+/, '').replace(/\.html$/, '');
        var links = document.querySelectorAll('nav a[href], .mega-menu a[href]');
        links.forEach(function (a) {
            var href = a.getAttribute('href') || '';
            if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
            var target = href.replace(/^\/+/, '').replace(/\.html$/, '');
            if (target === hereFile || (hereFile === '' && (target === '' || target === 'index'))) {
                a.setAttribute('aria-current', 'page');
            }
        });
    }
})();
