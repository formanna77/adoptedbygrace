/* ============================================================
   ADOPTED BY GRACE — Global Navigation JS
   Hamburger toggle, search overlay, scroll detection.
   Loaded on EVERY page via <script src="/nav.js"></script>
   ============================================================ */

(function () {
    'use strict';

    // === HAMBURGER MENU ===
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const isOpen = navLinks.classList.contains('open');
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(!isOpen));
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        // Close menu when a link is tapped
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // === SEARCH OVERLAY ===
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    function openSearch() {
        if (searchOverlay) {
            searchOverlay.classList.add('open');
            if (searchInput) searchInput.focus();
            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('open');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (searchToggle) searchToggle.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    // Also handle mobile search toggle
    var mobileSearchToggle = document.getElementById('mobileSearchToggle');
    if (mobileSearchToggle) mobileSearchToggle.addEventListener('click', openSearch);

    // Escape key closes search
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (searchOverlay && searchOverlay.classList.contains('open')) closeSearch();
            if (navLinks && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
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

    // === CLOSE MENU ON RESIZE TO DESKTOP ===
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 969 && navLinks && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
})();
