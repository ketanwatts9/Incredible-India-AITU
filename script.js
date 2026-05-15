/**
 * Incredible India — script.js
 * Improved & Production-Grade · AITU Cultural Exchange
 * Fixes: memory leaks, accessibility, mobile nav, quiz progress, error handling
 */

/* ══════════════════════════════════════
   LOADING SCREEN
   ══════════════════════════════════════ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.setAttribute('aria-hidden', 'true');
    setTimeout(() => { loader.style.display = 'none'; }, 800);
  }, 1800);
});

/* ══════════════════════════════════════
   PARTICLES
   ══════════════════════════════════════ */
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COLORS = ['#FF9933', '#D4A017', '#F5C842', '#FFFFFF', '#138808'];
  const COUNT  = 60;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = (1 + Math.random() * 3).toFixed(1) + 'px';
    p.style.cssText = `
      left:${Math.random() * 100}vw;
      width:${size};height:${size};
      animation-duration:${(4 + Math.random() * 8).toFixed(1)}s;
      animation-delay:${(Math.random() * 6).toFixed(1)}s;
      background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
    `;
    fragment.appendChild(p);
  }
  container.appendChild(fragment);
})();

/* ══════════════════════════════════════
   HOLI DOTS
   ══════════════════════════════════════ */
(function initHoliDots() {
  const container = document.getElementById('holi-dots');
  if (!container) return;

  const COLORS  = ['#FF3366','#FF9933','#FFFF00','#33FF99','#3399FF','#FF33FF','#FF6600'];
  const COUNT   = 20;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const d = document.createElement('div');
    d.className = 'holi-dot';
    const w = (4 + Math.random() * 12).toFixed(1);
    const h = (4 + Math.random() * 12).toFixed(1);
    d.style.cssText = `
      width:${w}px;height:${h}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
      animation-delay:${(Math.random() * 3).toFixed(1)}s;
      animation-duration:${(2 + Math.random() * 3).toFixed(1)}s;
    `;
    fragment.appendChild(d);
  }
  container.appendChild(fragment);
})();

/* ══════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
   ══════════════════════════════════════ */
(function initScrollReveal() {
  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // stop observing once revealed
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════
   DID YOU KNOW
   ══════════════════════════════════════ */
const DYK_FACTS = [
  "India is home to the world's oldest civilization — the Indus Valley Civilization, dating back over 5,000 years.",
  "India invented the number zero. Without India's mathematics, there would be no computers.",
  "India has the world's largest vegetarian population — about 400 million people.",
  "Chess (Chaturanga) was invented in India around the 6th century CE.",
  "The world's first university was established in Takshashila, India, in 700 BCE.",
  "India is the only country in the world that has both tigers and lions in the wild.",
  "Shampoo was invented in India — the word comes from the Sanskrit 'champu' (head massage).",
  "The Kumbh Mela is the largest human gathering on Earth — visible from space.",
  "India launched 104 satellites in a single mission in 2017 — a world record at the time.",
  "Yoga is practiced by over 300 million people worldwide — and it began in India.",
  "Bollywood produces more films per year than Hollywood.",
  "India has 40 UNESCO World Heritage Sites — among the highest in the world.",
  "India's UPI processes over 10 billion transactions every month — the world's largest real-time payment system.",
  "India became the first nation to land on the lunar south pole with Chandrayaan-3 in 2023.",
];

let dykIndex = 0;
let dykTimer = null;

function nextFact() {
  const el = document.getElementById('dyk-text');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    dykIndex = (dykIndex + 1) % DYK_FACTS.length;
    el.textContent = DYK_FACTS[dykIndex];
    el.style.opacity = '1';
  }, 400);
  // Reset auto-rotation timer
  clearInterval(dykTimer);
  dykTimer = setInterval(nextFact, 8000);
}

dykTimer = setInterval(nextFact, 8000);

/* ══════════════════════════════════════
   FOOD TABS
   ══════════════════════════════════════ */
function switchFood(btn, id) {
  // Tabs
  document.querySelectorAll('.food-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  // Panels
  document.querySelectorAll('.food-panel').forEach(p => {
    p.classList.remove('active');
  });

  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  const panel = document.getElementById('food-' + id);
  if (panel) panel.classList.add('active');
}

/* ══════════════════════════════════════
   GALLERY SLIDER
   ══════════════════════════════════════ */
(function initGallery() {
  const track  = document.getElementById('gallery-track');
  const dotsEl = document.getElementById('gallery-dots');
  if (!track || !dotsEl) return;

  const slides = track.querySelectorAll('.gallery-slide');
  const total  = slides.length;
  let current  = 0;
  let autoTimer = null;

  // Build dot buttons
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAuto();
    });
    dotsEl.appendChild(dot);
  });

  function goToSlide(n) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.gallery-dot').forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('active', active);
      d.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(current + 1), 4000);
  }

  // Expose to inline onclick
  window.galleryMove = function(dir) {
    goToSlide(current + dir);
    resetAuto();
  };

  // Keyboard navigation
  track.closest('.gallery-slider')?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { window.galleryMove(-1); }
    if (e.key === 'ArrowRight') { window.galleryMove(1); }
  });

  // Touch/swipe support
  let touchStartX = 0;
  const slider = track.closest('.gallery-slider');
  slider?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      window.galleryMove(diff > 0 ? 1 : -1);
      resetAuto();
    }
  }, { passive: true });

  resetAuto();
})();

/* ══════════════════════════════════════
   QUIZ
   ══════════════════════════════════════ */
const QUIZ_QUESTIONS = [
  { q: "Which ancient civilization flourished in the Indus Valley around 3300 BCE?",
    a: 0, opts: ["Harappan Civilization","Mesopotamian Civilization","Egyptian Civilization","Greek Civilization"] },
  { q: "Who is known as the 'Father of the Nation' of India?",
    a: 2, opts: ["Jawaharlal Nehru","Subhas Chandra Bose","Mahatma Gandhi","B.R. Ambedkar"] },
  { q: "Which mathematical concept is credited to ancient India?",
    a: 1, opts: ["Pi (π)","The Number Zero","Trigonometry","Calculus"] },
  { q: "India's ISRO successfully landed on which part of the Moon in 2023?",
    a: 3, opts: ["North Pole","Equator","Far Side","South Pole"] },
  { q: "Which festival is known as the 'Festival of Lights'?",
    a: 0, opts: ["Diwali","Holi","Navratri","Eid"] },
  { q: "What does 'Vasudhaiva Kutumbakam' mean?",
    a: 2, opts: ["India is great","Truth always wins","The World is One Family","Knowledge is power"] },
  { q: "Which dance form originated in Tamil Nadu and is India's oldest classical dance?",
    a: 1, opts: ["Kathak","Bharatanatyam","Bhangra","Odissi"] },
  { q: "On which date does India celebrate its Independence Day?",
    a: 0, opts: ["August 15","January 26","November 14","October 2"] },
  { q: "What is the national sport of India?",
    a: 3, opts: ["Cricket","Kabaddi","Chess","Hockey"] },
  { q: "Who is the current President of India (as of 2026)?",
    a: 1, opts: ["Pratibha Patil","Droupadi Murmu","Ram Nath Kovind","A.P.J. Abdul Kalam"] },
];

let quizIndex  = 0;
let quizScore  = 0;
let quizAnswered = false;

function updateProgressBar() {
  const fill = document.getElementById('quiz-progress-fill');
  if (fill) {
    fill.style.width = `${(quizIndex / QUIZ_QUESTIONS.length) * 100}%`;
  }
}

function loadQuestion() {
  if (quizIndex >= QUIZ_QUESTIONS.length) return;

  const { q, opts } = QUIZ_QUESTIONS[quizIndex];
  const qEl   = document.getElementById('quiz-question');
  const optsEl = document.getElementById('quiz-options');
  const scoreEl = document.getElementById('quiz-score');
  const nextBtn  = document.getElementById('quiz-next');

  if (!qEl || !optsEl || !scoreEl || !nextBtn) return;

  qEl.textContent   = q;
  scoreEl.textContent = `Question ${quizIndex + 1} of ${QUIZ_QUESTIONS.length} · Score: ${quizScore}`;
  nextBtn.style.display = 'none';
  optsEl.innerHTML = '';
  quizAnswered = false;
  updateProgressBar();

  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className   = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerQuestion(i));
    optsEl.appendChild(btn);
  });
}

function answerQuestion(choiceIndex) {
  if (quizAnswered) return;
  quizAnswered = true;

  const { a } = QUIZ_QUESTIONS[quizIndex];
  const btns  = document.querySelectorAll('.quiz-opt');
  const scoreEl = document.getElementById('quiz-score');
  const nextBtn  = document.getElementById('quiz-next');

  // Disable all buttons
  btns.forEach(b => b.disabled = true);

  if (choiceIndex === a) {
    quizScore++;
    btns[choiceIndex].classList.add('correct');
  } else {
    btns[choiceIndex].classList.add('wrong');
    btns[a].classList.add('correct');
  }

  if (scoreEl) {
    scoreEl.textContent = `Question ${quizIndex + 1} of ${QUIZ_QUESTIONS.length} · Score: ${quizScore}`;
  }
  if (nextBtn) {
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent   = quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question →' : '🎉 See Results';
  }
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex < QUIZ_QUESTIONS.length) {
    loadQuestion();
    return;
  }

  // Show results
  const pct    = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100);
  const msgs   = [
    { min: 80, text: '🌟 Excellent! You truly know India!' },
    { min: 50, text: '👍 Good! Keep exploring India!' },
    { min: 0,  text: '🙏 Keep learning — India has much more to offer!' },
  ];
  const msg = msgs.find(m => pct >= m.min)?.text ?? '';

  const qEl  = document.getElementById('quiz-question');
  const optsEl = document.getElementById('quiz-options');
  const scoreEl = document.getElementById('quiz-score');
  const nextBtn  = document.getElementById('quiz-next');
  const fill = document.getElementById('quiz-progress-fill');

  if (fill) fill.style.width = '100%';
  if (qEl) qEl.innerHTML = `
    <strong style="color:var(--saffron);font-size:1.4rem;">${msg}</strong><br><br>
    Final Score: <span style="color:var(--gold);font-size:2rem;">${quizScore}/${QUIZ_QUESTIONS.length}</span>
    <span style="color:var(--text-muted);font-size:1rem;"> (${pct}%)</span>
  `;
  if (optsEl) optsEl.innerHTML = '';
  if (scoreEl) scoreEl.textContent = 'Quiz Complete!';
  if (nextBtn) {
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent   = '🔄 Play Again';
    nextBtn.onclick = () => {
      quizIndex  = 0;
      quizScore  = 0;
      nextBtn.onclick = nextQuestion; // restore
      loadQuestion();
    };
  }
}

// Init quiz
loadQuestion();

/* ══════════════════════════════════════
   MOBILE NAVIGATION
   ══════════════════════════════════════ */
(function initMobileNav() {
  const toggle  = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ══════════════════════════════════════
   NAV SCROLL EFFECT
   ══════════════════════════════════════ */
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.style.borderBottomColor = window.scrollY > 50
          ? 'rgba(212,160,23,0.45)'
          : 'var(--border)';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════
   ACTIVE NAV LINK HIGHLIGHTING
   ══════════════════════════════════════ */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.style.color = isActive ? 'var(--gold)' : '';
          link.style.background = isActive ? 'rgba(212,160,23,0.12)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();

/* ══════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════ */
(function initScrollProgress() {
  const fill = document.getElementById('scroll-progress-fill');
  if (!fill) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        fill.style.width = pct.toFixed(2) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════
   BACK TO TOP BUTTON
   ══════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════
   KEYBOARD SHORTCUTS
   ══════════════════════════════════════ */
(function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Press 'T' to jump to top
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();

/* ══════════════════════════════════════
   STAGGERED GRID REVEALS
   ══════════════════════════════════════ */
(function initStaggeredReveals() {
  // Apply staggered animation delays to grid children when parent becomes visible
  const grids = document.querySelectorAll(
    '.temples-grid, .personalities, .similarities-grid, .festival-grid'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 60}ms`;
          child.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  grids.forEach(g => observer.observe(g));
})();