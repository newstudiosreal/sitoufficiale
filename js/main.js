// ── NAV DRAWER ──
const mobileBtn = document.getElementById('navMobileBtn');
const drawer    = document.getElementById('navDrawer');
const drawerClose = document.getElementById('drawerClose');

if (mobileBtn && drawer) {
  mobileBtn.addEventListener('click', () => drawer.classList.toggle('open'));
  drawerClose?.addEventListener('click', () => drawer.classList.remove('open'));
  drawer.querySelectorAll('.drawer-link').forEach(l =>
    l.addEventListener('click', () => drawer.classList.remove('open'))
  );
}

// ── TOPBAR SCROLL ──
const topbar = document.querySelector('.topbar');
if (topbar) {
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── ACTIVE NAV LINK ──
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});

// ── PROJECT ROWS: stagger on hover group ──
document.querySelectorAll('.project-row').forEach((row, i) => {
  row.style.transitionDelay = `${i * 0.04}s`;
});

// ── STAT COUNTER ANIMATION ──
const animateCount = (el, target, suffix = '') => {
  const isNum = !isNaN(parseInt(target));
  if (!isNum) return;
  const num = parseInt(target);
  let start = 0;
  const duration = 1200;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * num) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
};

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const vals = e.target.querySelectorAll('.stat-value');
      vals.forEach(v => {
        const raw = v.textContent;
        const suffix = raw.replace(/[0-9]/g, '');
        animateCount(v, raw, '');
      });
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-row').forEach(el => statsObs.observe(el));
