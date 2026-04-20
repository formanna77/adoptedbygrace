/* ============================================================
   ADOPTED BY GRACE — UX ENHANCEMENTS v1
   Universal on-page enhancements injected on every article:
     1. Skip-to-content link (a11y)
     2. Universal scroll-progress bar
     3. Breadcrumbs above article body
     4. Auto-TOC on long articles (3+ h2s)
     5. Next/Prev navigation for healing series

   This file is loaded AFTER nav.js on every page.
   All styling lives in /global.css (.ux-breadcrumbs, .article-toc,
   .series-nav, .skip-to-content, .reading-progress).

   All enhancements honor prefers-reduced-motion via CSS.
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
        // Get article title from h1 inside hero
        const h1 = hero.querySelector('h1');
        const title = h1 ? (h1.textContent || '').trim() : document.title;

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

    // ---------- 4. Auto-TOC on long articles ----------
    function injectAutoTOC() {
        const article = document.querySelector('article.article-body');
        if (!article) return;
        if (article.querySelector('.article-toc')) return;
        const h2s = Array.from(article.querySelectorAll(':scope > h2, :scope > section > h2'));
        if (h2s.length < 3) return;

        // Build the TOC
        const toc = document.createElement('nav');
        toc.className = 'article-toc';
        toc.setAttribute('aria-label', 'Table of contents');

        const details = document.createElement('details');
        details.className = 'article-toc-details';
        details.open = true;

        const summary = document.createElement('summary');
        summary.className = 'article-toc-summary';
        summary.innerHTML = '<span class="article-toc-label">On This Page</span>' +
            '<span class="article-toc-chevron" aria-hidden="true">▾</span>';
        details.appendChild(summary);

        const list = document.createElement('ol');
        list.className = 'article-toc-list';

        h2s.forEach((h, i) => {
            if (!h.id) {
                const base = slugify(h.textContent) || ('section-' + (i + 1));
                h.id = base;
            }
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = (h.textContent || '').trim();
            li.appendChild(a);
            list.appendChild(li);
        });

        details.appendChild(list);
        toc.appendChild(details);

        // Insert after the TL;DR / In Brief if present, else at article top
        const tldr = article.querySelector('.tldr');
        if (tldr && tldr.parentNode === article) {
            tldr.insertAdjacentElement('afterend', toc);
        } else {
            article.insertBefore(toc, article.firstChild);
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
        try { injectAutoTOC(); } catch (e) { /* silent */ }
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
