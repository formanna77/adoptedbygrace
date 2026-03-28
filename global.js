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
