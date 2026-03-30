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
            name: 'Start Here',
            icon: '🧭',
            href: '/start-here',
            desc: 'Your guided journey into sovereign grace',
            subs: [
                { name: 'The Learning Path', href: '/start-here', desc: '5-phase study progression' },
                { name: 'Beliefs Assessment', href: '/beliefs-assessment', desc: 'Find out where you stand' },
                { name: 'Scripture Tsunami', href: '/scripture-tsunami', desc: '200+ verses in one place' }
            ]
        },
        {
            name: 'Questions',
            icon: '📖',
            href: '/questions',
            desc: '53 Scripture-driven proofs',
            subs: [
                { name: 'Direct Statements of Election', href: '/questions#direct-statements', desc: 'Verses explicitly teaching predestination' },
                { name: "Jesus' Own Words", href: '/questions#jesus-words', desc: 'What Christ himself taught about election' },
                { name: 'The Logical Chain', href: '/questions#logical-chain', desc: 'Depravity → election → faith → perseverance' },
                { name: 'Demolishing Objections', href: '/questions#demolishing', desc: 'Refuting common proof texts used against election' },
                { name: 'Further Refinements', href: '/questions#further', desc: 'Advanced questions and nuanced answers' }
            ]
        },
        {
            name: 'Theology',
            icon: '🏛',
            href: '/systematic-theology',
            desc: 'Complete systematic framework',
            subs: [
                { name: 'God & His Eternal Purpose', href: '/systematic-theology#god-purpose', desc: 'Theology proper, divine decrees, covenant' },
                { name: 'The Doctrine of Salvation', href: '/systematic-theology#salvation', desc: 'Regeneration, justification, ordo salutis' },
                { name: 'Hard Questions', href: '/systematic-theology#hard-questions', desc: 'Practical theological problems' },
                { name: 'How It All Connects', href: '/systematic-theology#connections', desc: 'Christology, pneumatology, ecclesiology' }
            ]
        },
        {
            name: 'Demolition Zone',
            icon: '💥',
            href: '/demolition-hub',
            desc: 'Every objection answered',
            subs: [
                { name: 'Tier 1: The Big Guns', href: '/demolition-hub#tier1', desc: 'John 3:16, 1 Tim 2:4, 2 Peter 3:9 and more' },
                { name: 'Tier 2: Secondary Proof Texts', href: '/demolition-hub#tier2', desc: 'Less common but still important verses' },
                { name: 'Tier 3: Every Remaining Text', href: '/demolition-hub#tier3', desc: 'The complete arsenal' },
                { name: 'Article Demolitions', href: '/demolition-hub#articles', desc: 'Point-by-point refutations of anti-Reformed articles' },
                { name: 'Objections Answered', href: '/demolition-hub#objections', desc: 'God as author of sin, why command if predestined, etc.' }
            ]
        },
        {
            name: 'Why We Resist',
            icon: '🧠',
            href: '/psychology-hub',
            desc: 'The psychology of suppressing truth',
            subs: [
                { name: 'The Psychology of Resistance', href: '/psychology-hub#psychology', desc: 'Autonomy illusion, cognitive biases, terror management' },
                { name: 'Pastoral Application', href: '/psychology-hub#pastoral', desc: 'How to love objectors and trust the Spirit' }
            ]
        },
        {
            name: 'Devotionals',
            icon: '🕯',
            href: '/devotionals',
            desc: 'Where doctrine becomes worship',
            subs: [
                { name: 'All Devotionals', href: '/devotionals', desc: '15 meditations on sovereign grace' },
                { name: 'He Will Never Give Up', href: '/never-gives-up', desc: 'Our most beloved devotional' }
            ]
        },
        {
            name: 'Stories',
            icon: '📜',
            href: '/stories',
            desc: 'Original parables and narratives',
            subs: [
                { name: 'All Stories', href: '/stories', desc: '11 original parables illuminating grace' },
                { name: 'The Fish Who Chose the Ocean', href: '/story-fish-ocean', desc: 'Can a fish choose the water?' },
                { name: 'The Dead City', href: '/story-dead-city', desc: 'A city of corpses and the voice that calls' },
                { name: 'The Room Where You Chose', href: '/story-room-where-you-chose', desc: 'A thought experiment on free will' }
            ]
        },
        {
            name: 'Secular Evidence',
            icon: '🔬',
            href: '/secular-evidence',
            desc: 'Even the world confirms it',
            subs: [
                { name: 'Neuroscience', href: '/secular-neuroscience-predetermination', desc: 'Brain science and human inability' },
                { name: 'Philosophy', href: '/secular-philosophy-free-will', desc: 'The free will debate in philosophy' },
                { name: 'Psychology', href: '/secular-psychology-determinism', desc: 'Research on determinism and motivation' },
                { name: 'Economics', href: '/secular-economics-depravity', desc: 'Markets and total depravity' },
                { name: 'The Billion Decisions', href: '/secular-billion-decisions', desc: "Proof you don't control what you think you do" }
            ]
        },
        {
            name: 'History',
            icon: '⏳',
            href: '/history-timeline',
            desc: '2,000 years of sovereign grace proclaimed',
            subs: [
                { name: 'The Golden Thread', href: '/history-timeline', desc: 'Full chronological timeline' },
                { name: 'Augustine vs. Pelagius', href: '/history-augustine-pelagius', desc: 'The debate that shaped everything' },
                { name: 'The Synod of Dort', href: '/history-dort', desc: 'Where the five points were born' },
                { name: 'The Great Awakening', href: '/history-great-awakening', desc: 'Edwards and sovereign revival' }
            ]
        },
        {
            name: 'Analogies',
            icon: '💡',
            href: '/analogies-illustrations',
            desc: 'Pictures that make deep truths click',
            subs: [
                { name: 'All Analogies', href: '/analogies-illustrations', desc: '10 illustrations of sovereign grace' },
                { name: 'The Doctor & the Corpse', href: '/analogy-doctor-corpse', desc: 'Can a dead man heal himself?' },
                { name: 'The Potter & the Clay', href: '/analogy-potter-clay', desc: 'Romans 9 illustrated' }
            ]
        },
        {
            name: 'Theologians',
            icon: '🧓',
            href: '/theologians',
            desc: 'The giants who came before',
            subs: [
                { name: 'All Theologians', href: '/theologians', desc: '10 profiles across the centuries' },
                { name: 'Augustine', href: '/theologian-augustine', desc: 'The father of Western theology' },
                { name: 'John Calvin', href: '/theologian-calvin', desc: 'The systematizer of Reformed thought' },
                { name: 'Charles Spurgeon', href: '/theologian-spurgeon', desc: 'The prince of preachers' }
            ]
        },
        {
            name: 'Old Testament',
            icon: '📚',
            href: '/ot-election',
            desc: 'Sovereign election in every OT figure',
            subs: [
                { name: 'Patterns of Sovereign Choice', href: '/ot-election#patterns', desc: 'Younger over elder, weakness reveals power' },
                { name: 'The Chosen Characters', href: '/ot-election#characters', desc: 'Jacob, Moses, David, Joseph and more' },
                { name: 'Key OT Election Texts', href: '/ot-election#texts', desc: 'Specific passages on election' }
            ]
        },
        {
            name: 'Comparisons',
            icon: '⚖',
            href: '/compare-calvinism-arminianism',
            desc: 'Side-by-side with rival systems',
            subs: [
                { name: 'Five Points Compared', href: '/compare-calvinism-arminianism#five-points', desc: 'Point-by-point Calvinism vs. Arminianism' },
                { name: 'Deeper Comparisons', href: '/compare-calvinism-arminianism#deeper', desc: 'Molinism, Open Theism, Catholic soteriology' }
            ]
        },
        {
            name: 'Creeds & Confessions',
            icon: '📜',
            href: '/creeds-confessions',
            desc: 'Historic statements of faith',
            subs: [
                { name: 'Canons of Dort', href: '/creed-canons-dort', desc: 'The five points codified' },
                { name: 'Heidelberg Catechism', href: '/creed-heidelberg-catechism', desc: 'Comfort in life and death' },
                { name: 'Westminster Standards', href: '/creeds-confessions#westminster', desc: 'The English Reformed tradition' }
            ]
        },
        {
            name: 'Pastoral',
            icon: '🤝',
            href: '/pastoral-assurance',
            desc: 'Living out these truths',
            subs: [
                { name: 'Election & Assurance', href: '/pastoral-assurance#assurance', desc: 'For the anxious heart' },
                { name: 'Evangelism & Sovereignty', href: '/pastoral-evangelism', desc: 'How election fuels mission' },
                { name: 'Prayer & God\'s Decrees', href: '/pastoral-prayer', desc: 'Why pray if God is sovereign?' },
                { name: 'Suffering & Sovereignty', href: '/pastoral-suffering', desc: 'Finding God in the dark' }
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

    // === BUILD MEGA-MENU (dynamic two-panel layout) ===
    function buildMegaMenu() {
        if (!megaMenu) return;

        // Clear the menu
        megaMenu.innerHTML = '';

        // Build two-panel layout
        var panel = document.createElement('div');
        panel.className = 'mega-menu-panel';

        // Left panel: category list
        var leftPanel = document.createElement('div');
        leftPanel.className = 'mega-menu-cats';

        for (var i = 0; i < MEGA_MENU_DATA.length; i++) {
            var cat = MEGA_MENU_DATA[i];
            var catItem = document.createElement('div');
            catItem.className = 'mega-menu-cat-item' + (i === 0 ? ' active' : '');
            catItem.setAttribute('data-index', String(i));
            catItem.innerHTML = '<span class="mega-menu-cat-icon">' + cat.icon + '</span><span class="mega-menu-cat-name">' + escapeHtml(cat.name) + '</span>';

            (function(index) {
                catItem.addEventListener('click', function() {
                    setActiveMegaMenuCategory(index);
                });
                catItem.addEventListener('mouseenter', function() {
                    setActiveMegaMenuCategory(index);
                });
            })(i);

            leftPanel.appendChild(catItem);
        }

        // Right panel: sub-sections
        var rightPanel = document.createElement('div');
        rightPanel.className = 'mega-menu-detail';
        rightPanel.id = 'megaMenuDetail';

        // Initialize with first category
        setActiveMegaMenuCategory(0);

        panel.appendChild(leftPanel);
        panel.appendChild(rightPanel);
        megaMenu.appendChild(panel);
    }

    function setActiveMegaMenuCategory(index) {
        if (!megaMenu) return;
        var cat = MEGA_MENU_DATA[index];
        if (!cat) return;

        // Update left panel active state
        var catItems = megaMenu.querySelectorAll('.mega-menu-cat-item');
        for (var i = 0; i < catItems.length; i++) {
            catItems[i].classList.remove('active');
        }
        if (catItems[index]) {
            catItems[index].classList.add('active');
        }

        // Update right panel content
        var rightPanel = document.getElementById('megaMenuDetail');
        if (!rightPanel) return;

        var html = '';
        html += '<div class="mega-menu-detail-title">' + escapeHtml(cat.name) + '</div>';
        html += '<div class="mega-menu-detail-desc">' + escapeHtml(cat.desc) + '</div>';

        for (var s = 0; s < cat.subs.length; s++) {
            var sub = cat.subs[s];
            html += '<a href="' + escapeAttr(sub.href) + '" class="mega-menu-sub-link">';
            html += '<div class="mega-menu-sub-name">' + escapeHtml(sub.name) + '</div>';
            html += '<div class="mega-menu-sub-desc">' + escapeHtml(sub.desc) + '</div>';
            html += '</a>';
        }

        html += '<a href="' + escapeAttr(cat.href) + '" class="mega-menu-view-all">View all in ' + escapeHtml(cat.name) + ' →</a>';

        rightPanel.innerHTML = html;
    }

    // === BUILD MOBILE CATEGORIES ACCORDION ===
    function buildMobileCategories() {
        var container = document.getElementById('mobileCategoriesAccordion');
        if (!container) return;

        container.innerHTML = '';
        var html = '<span class="mobile-categories-label">Explore All Categories</span>';

        for (var i = 0; i < MEGA_MENU_DATA.length; i++) {
            var cat = MEGA_MENU_DATA[i];
            var catId = 'mobile-acc-' + i;

            html += '<div class="mobile-accordion-cat">';
            html += '<div class="mobile-accordion-header" data-cat-index="' + i + '">';
            html += '<span class="mobile-accordion-icon">' + cat.icon + '</span>';
            html += '<span class="mobile-accordion-cat-name">' + escapeHtml(cat.name) + '</span>';
            html += '<span class="chevron">▼</span>';
            html += '</div>';
            html += '<div class="mobile-accordion-subs" id="' + catId + '">';

            for (var s = 0; s < cat.subs.length; s++) {
                var sub = cat.subs[s];
                html += '<a href="' + escapeAttr(sub.href) + '" class="mobile-accordion-sub">' + escapeHtml(sub.name) + '</a>';
            }

            html += '</div></div>';
        }

        container.innerHTML = html;

        // Add event listeners for accordion toggle
        var headers = container.querySelectorAll('.mobile-accordion-header');
        for (var h = 0; h < headers.length; h++) {
            (function(header) {
                header.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var index = parseInt(header.getAttribute('data-cat-index'), 10);
                    toggleMobileAccordion(index);
                });
            })(headers[h]);
        }
    }

    function toggleMobileAccordion(activeIndex) {
        var container = document.getElementById('mobileCategoriesAccordion');
        if (!container) return;

        var allHeaders = container.querySelectorAll('.mobile-accordion-header');
        var allSubs = container.querySelectorAll('.mobile-accordion-subs');

        for (var i = 0; i < allHeaders.length; i++) {
            var header = allHeaders[i];
            var subs = allSubs[i];
            var index = parseInt(header.getAttribute('data-cat-index'), 10);

            if (index === activeIndex) {
                // Toggle this one
                var isOpen = subs.classList.contains('open');
                if (isOpen) {
                    subs.classList.remove('open');
                    header.classList.remove('open');
                } else {
                    subs.classList.add('open');
                    header.classList.add('open');
                }
            } else {
                // Close all others
                subs.classList.remove('open');
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
            if (!searchIndex || searchIndex.length === 0) {
                container.innerHTML = '<div style="padding:1rem;text-align:center;color:#807b75;font-size:0.85rem;">Loading...</div>';
                return;
            }

            var tokens = query.split(/\s+/).filter(function (t) { return t.length > 0; });
            var scored = [];

            for (var i = 0; i < searchIndex.length; i++) {
                var page = searchIndex[i];
                var score = 0;
                var titleLower = page.title.toLowerCase();
                var descLower = (page.desc || '').toLowerCase();
                var textLower = (page.text || '').toLowerCase();

                if (titleLower.indexOf(query) !== -1) score += 200;
                if (descLower.indexOf(query) !== -1) score += 100;
                if (textLower.indexOf(query) !== -1) score += 50;

                for (var t = 0; t < tokens.length; t++) {
                    if (titleLower.indexOf(tokens[t]) !== -1) score += 40;
                    if (descLower.indexOf(tokens[t]) !== -1) score += 20;
                    if (textLower.indexOf(tokens[t]) !== -1) score += 10;
                }

                if (score > 0) scored.push({ page: page, score: score });
            }

            scored.sort(function (a, b) { return b.score - a.score; });
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
            if (!searchIndex || searchIndex.length === 0) {
                searchResults.innerHTML = '<div style="padding:1.5rem;text-align:center;color:#807b75;">Search index loading...</div>';
                return;
            }

            var tokens = query.split(/\s+/).filter(function (t) { return t.length > 0; });
            var scored = [];

            for (var i = 0; i < searchIndex.length; i++) {
                var page = searchIndex[i];
                var score = 0;
                var titleLower = page.title.toLowerCase();
                var descLower = (page.desc || '').toLowerCase();
                var textLower = (page.text || '').toLowerCase();

                if (titleLower.indexOf(query) !== -1) score += 200;
                if (descLower.indexOf(query) !== -1) score += 100;
                if (textLower.indexOf(query) !== -1) score += 50;

                for (var t = 0; t < tokens.length; t++) {
                    if (titleLower.indexOf(tokens[t]) !== -1) score += 40;
                    if (descLower.indexOf(tokens[t]) !== -1) score += 20;
                    if (textLower.indexOf(tokens[t]) !== -1) score += 10;
                }

                if (score > 0) scored.push({ page: page, score: score });
            }

            scored.sort(function (a, b) { return b.score - a.score; });

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
