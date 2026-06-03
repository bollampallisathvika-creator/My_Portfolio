/* ================================================
   BOLLAMPALLI SATHVIKA — PORTFOLIO
   script.js  |  Interactions & Animations
   ================================================ */

/* ==========================================
   1. CUSTOM CURSOR
   ========================================== */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand ring on hover over interactive elements
document.querySelectorAll('a, button, input, textarea, .project-card, .cert-card, .internship-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
});


/* ==========================================
   2. NAVBAR — SCROLL + MOBILE TOGGLE
   ========================================== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) link.style.color = (scrollPos >= top && scrollPos < top + height) ? 'var(--accent)' : '';
  });
});


/* ==========================================
   3. DARK / LIGHT THEME TOGGLE
   ========================================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

// Restore saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
}


/* ==========================================
   4. SCROLL REVEAL ANIMATION
   ========================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in same parent
      const siblings = Array.from(entry.target.parentNode.children).filter(c => c.classList.contains('reveal'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ==========================================
   5. SKILL BAR ANIMATION
   ========================================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));


/* ==========================================
   6. CONTACT FORM
   ========================================== */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="ri-loader-4-line spin"></i> Sending…';
  btn.disabled = true;

  // Simulate async send (replace with real API endpoint)
  await new Promise(resolve => setTimeout(resolve, 1800));

  formStatus.className = 'form-status success';
  formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
  btn.innerHTML = original;
  btn.disabled = false;
  contactForm.reset();

  // Hide status after 5s
  setTimeout(() => { formStatus.className = 'form-status'; }, 5000);
});

// Add loader spin style dynamically
const spinStyle = document.createElement('style');
spinStyle.textContent = `.spin { display: inline-block; animation: spinAnim 0.8s linear infinite; } @keyframes spinAnim { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);


/* ==========================================
   7. SMOOTH HERO TEXT ENTRANCE
   ========================================== */
window.addEventListener('DOMContentLoaded', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    el.style.transitionDelay = `${i * 120 + 100}ms`;
    setTimeout(() => el.classList.add('visible'), 50);
  });
});


/* ==========================================
   8. TYPING EFFECT ON HERO TITLE
   ========================================== */
const titles = [
  'ECE Undergraduate | Aspiring Software Developer',
  'React & Web Development Enthusiast',
  'Python & AI/ML Learner',
  'Embedded Systems Explorer',
];

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  let ti = 0, ci = 0, deleting = false;
  const accent = '<span class="accent">|</span>';

  function typeLoop() {
    const current = titles[ti];
    if (!deleting) {
      const partial = current.substring(0, ci + 1);
      heroTitle.innerHTML = partial + accent;
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    } else {
      const partial = current.substring(0, ci - 1);
      heroTitle.innerHTML = partial + accent;
      ci--;
      if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; setTimeout(typeLoop, 400); return; }
    }
    setTimeout(typeLoop, deleting ? 40 : 65);
  }

  // Start after initial reveal
  setTimeout(typeLoop, 1200);
}


/* ==========================================
   9. PARALLAX ORB
   ========================================== */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  if (orb1) orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
});


/* ==========================================
   10. COUNTER ANIMATION FOR STATS
   ========================================== */
function animateCounter(el, target, suffix) {
  let current = 0;
  const step  = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = current + suffix;
  }, 35);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent;
        const num  = parseFloat(text);
        const suffix = text.replace(/[\d.]/g, '');
        animateCounter(el, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.8 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);