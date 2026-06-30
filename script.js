/* ==============================
   BHASKAR KUMAR — PORTFOLIO JS
   Shared across all pages
   ============================== */

/* ---------- Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ---------- Scroll reveal (Intersection Observer) ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars if inside this element
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });

        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => {
    el.classList.add('visible');
    el.querySelectorAll('.skill-fill').forEach(b => b.style.width = b.dataset.pct + '%');
  });
}

/* ---------- Typing animation (Home page only) ---------- */
const typedEl = document.getElementById('typedText');
if (typedEl) {
  const roles = [
    'App Support Engineer',
    'Flutter Developer',
    'Problem Solver',
    'CS Student'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 60 : 95);
  }
  type();
}

/* ---------- Floating particles (Home page only) ---------- */
const particlesEl = document.getElementById('heroParticles');
if (particlesEl) {
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';
    p.style.animationDuration  = (6 + Math.random() * 10) + 's';
    p.style.animationDelay    = (Math.random() * 8) + 's';
    p.style.width  = (2 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    particlesEl.appendChild(p);
  }
}

/* ---------- Skill bars — also trigger if already visible ---------- */
window.addEventListener('load', () => {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.width = bar.dataset.pct + '%';
    }
  });
});
