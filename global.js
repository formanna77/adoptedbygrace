/* ============================================================
   ADOPTED BY GRACE — Global Interactions
   Scroll reveals, nav effects, starfield, back-to-top
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
    // Close on link click (mobile)
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btn.classList.remove('active');
            links.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });
})();

// ===== SCROLL REVEAL =====
(function() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
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

// ===== MINI STARFIELD (for sub-pages) =====
// Lighter version than homepage — subtle animated dots in page-hero
(function() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');
    let stars = [];
    const COUNT = 80;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            o: Math.random() * 0.4 + 0.15,
            pulse: Math.random() * Math.PI * 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let s of stars) {
            s.x += s.vx;
            s.y += s.vy;
            s.pulse += 0.015;
            if (s.x < 0) s.x = canvas.width;
            if (s.x > canvas.width) s.x = 0;
            if (s.y < 0) s.y = canvas.height;
            if (s.y > canvas.height) s.y = 0;
            let flicker = s.o + Math.sin(s.pulse) * 0.1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 162, 84, ${flicker})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== AUTO-REVEAL content sections for pages without .reveal classes =====
(function() {
    const sections = document.querySelectorAll('.content-section, .card-grid');
    if (!sections.length) return;
    sections.forEach(s => {
        if (!s.classList.contains('reveal')) {
            s.classList.add('reveal');
        }
    });
    // Re-observe after adding classes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    sections.forEach(s => observer.observe(s));
})();
