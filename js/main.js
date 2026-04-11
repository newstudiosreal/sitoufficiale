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

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── ACTIVE NAV LINK ──
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
});
