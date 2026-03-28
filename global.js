/* ============================================================
   ADOPTED BY GRACE — Global Interactions v2
   Mega-menu dropdowns, scroll reveals, starfield, nav effects
   ============================================================ */

// ===== NAV SCROLL EFFECT =====
(function() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
})();

// ===== HAMBURGER MENU =====
(function() {
    const btn = document.querySelector('.hamburger');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        links.classList.toggle('open');
        btn.setAttribute('aria-expanded', btn.classList.contains('active'));
    });
})();

// ===== MOBILE DROPDOWN TOGGLES =====
(function() {
    const triggers = document.querySelectorAll('.nav-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const li = trigger.parentElement;
            // On mobile, toggle dropdown open/closed
            if (window.innerWidth <= 900) {
                e.preventDefault();
                li.classList.toggle('dropdown-open');
                // Close other dropdowns
                document.querySelectorAll('.nav-links > li.dropdown-open').forEach(item => {
                    if (item !== li) item.classList.remove('dropdown-open');
                });
            }
        });
    });
    // Close mobile menu on link click
    document.querySelectorAll('.nav-dropdown a').forEach(a => {
        a.addEventListener('click', () => {
            const btn = document.querySelector('.hamburger');
            const links = document.querySelector('.nav-links');
            if (btn && links && window.innerWidth <= 900) {
                btn.classList.remove('active');
                links.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

// ===== SCROLL REVEAL =====
(function() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));
})();

// ===== BACK TO TOP =====
(function() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== MINI STARFIELD (sub-pages) =====
(function() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');
    let stars = [];
    const COUNT = 80;
    function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3, vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
            o: Math.random() * 0.4 + 0.15, pulse: Math.random() * Math.PI * 2
        });
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let s of stars) {
            s.x += s.vx; s.y += s.vy; s.pulse += 0.015;
            if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0;
            if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,162,84,${s.o + Math.sin(s.pulse)*0.1})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== AUTO-REVEAL =====
(function() {
    const sections = document.querySelectorAll('.content-section, .card-grid');
    if (!sections.length) return;
    sections.forEach(s => { if (!s.classList.contains('reveal')) s.classList.add('reveal'); });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    sections.forEach(s => observer.observe(s));
})();

// ===== ACCORDION =====
(function() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isOpen = item.classList.contains('open');
            // Close siblings if inside same accordion
            const accordion = item.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                        openItem.querySelector('.accordion-body').style.maxHeight = '0';
                    }
                });
            }
            if (isOpen) {
                item.classList.remove('open');
                body.style.maxHeight = '0';
            } else {
                item.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
    // Open first item by default if has .accordion-open-first
    document.querySelectorAll('.accordion.accordion-open-first .accordion-item:first-child').forEach(item => {
        item.classList.add('open');
        const body = item.querySelector('.accordion-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
    });
})();

// ===== TABS =====
(function() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
        const btns = tabGroup.querySelectorAll('.tab-btn');
        const panels = tabGroup.querySelectorAll('.tab-content');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                btns.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const panel = tabGroup.querySelector(`[data-tab-content="${target}"]`) || tabGroup.querySelector(`#${target}`);
                if (panel) panel.classList.add('active');
            });
        });
        // Activate first tab by default
        if (btns.length && !tabGroup.querySelector('.tab-btn.active')) {
            btns[0].click();
        }
    });
})();

// ===== PROGRESS BARS (animate on scroll) =====
(function() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
})();

// ===== STAT COUNTER ANIMATION =====
(function() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1800;
            const start = performance.now();
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = prefix + Math.round(eased * target).toLocaleString() + suffix;
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });
    counters.forEach(c => observer.observe(c));
})();

// ===== READING PROGRESS BAR =====
(function() {
    const bar = document.querySelector('.reading-progress');
    if (!bar) return;
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
})();

// ===== STAGGER REVEAL =====
(function() {
    const staggers = document.querySelectorAll('.stagger');
    if (!staggers.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    staggers.forEach(s => observer.observe(s));
})();

// ===== SMOOTH ANCHOR SCROLLING =====
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#' || id === '#top') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav')?.offsetHeight || 56;
                window.scrollTo({ top: target.offsetTop - navHeight - 16, behavior: 'smooth' });
            }
        });
    });
})();

// ===== SOCIAL SHARE BUTTONS =====
(function() {
    // Only inject on content pages (pages with a main h1 and article-like content)
    const h1 = document.querySelector('h1');
    const main = document.querySelector('#main-content, .page-hero, .hero');
    if (!h1 || !main) return;
    // Skip pages that already have share buttons or are utility pages
    if (document.querySelector('.share-bar') ||
        window.location.pathname === '/' ||
        window.location.pathname.includes('search') ||
        window.location.pathname.includes('quiz') ||
        window.location.pathname.includes('connect') ||
        window.location.pathname.includes('donate')) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent(h1.textContent + ' — Adopted by Grace');

    const bar = document.createElement('div');
    bar.className = 'share-bar';
    bar.setAttribute('aria-label', 'Share this page');
    bar.innerHTML = `
        <span class="share-label">Share the Truth</span>
        <a href="https://twitter.com/intent/tweet?url=${url}&text=${text}" target="_blank" rel="noopener" class="share-btn share-twitter" aria-label="Share on X/Twitter" title="Share on X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" class="share-btn share-facebook" aria-label="Share on Facebook" title="Share on Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" class="share-btn share-linkedin" aria-label="Share on LinkedIn" title="Share on LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <button class="share-btn share-copy" aria-label="Copy link" title="Copy link to clipboard" onclick="navigator.clipboard.writeText(window.location.href).then(()=>{this.classList.add('copied');this.title='Copied!';setTimeout(()=>{this.classList.remove('copied');this.title='Copy link to clipboard'},2000)})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
    `;

    // Insert after the hero/main-content section
    const insertTarget = document.querySelector('.page-hero') || document.querySelector('.hero') || main;
    if (insertTarget && insertTarget.parentNode) {
        insertTarget.parentNode.insertBefore(bar, insertTarget.nextSibling);
    }
})();
