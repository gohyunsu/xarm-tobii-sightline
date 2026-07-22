document.body.classList.add('js-ready');

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function setMenu(open) {
  navLinks?.classList.toggle('open', open);
  navToggle?.setAttribute('aria-expanded', String(open));
}

if (navToggle) {
  navToggle.setAttribute('aria-label', 'Toggle primary navigation');
  navToggle.addEventListener('click', () => setMenu(!navLinks?.classList.contains('open')));
}
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.querySelector('.site-header')?.append(progress);

function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
  progress.style.transform = 'scaleX(' + ratio + ')';
}
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

document.querySelectorAll('[data-reading-time]').forEach((node) => {
  const words = (document.querySelector('main')?.textContent || '').trim().split(/\s+/).length;
  node.textContent = Math.max(1, Math.ceil(words / 220)) + ' min read';
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = [...document.querySelectorAll('.hero, main > .section')];
if ('IntersectionObserver' in window && !reduceMotion) {
  revealTargets.forEach((node) => node.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealTargets.forEach((node, index) => {
    if (index === 0) node.classList.add('is-visible');
    else observer.observe(node);
  });
}

const search = document.querySelector('[data-paper-search]');
const family = document.querySelector('[data-paper-family]');
const role = document.querySelector('[data-paper-role]');
const papers = [...document.querySelectorAll('[data-paper]')];
const empty = document.querySelector('.empty');

function filterPapers() {
  if (!papers.length) return;
  const query = (search?.value || '').trim().toLowerCase();
  const selectedFamily = family?.value || 'all';
  const selectedRole = role?.value || 'all';
  let visible = 0;
  papers.forEach((paper) => {
    const matchesQuery = !query || paper.textContent.toLowerCase().includes(query);
    const matchesFamily = selectedFamily === 'all' || paper.dataset.family === selectedFamily;
    const matchesRole = selectedRole === 'all' || paper.dataset.role === selectedRole;
    const show = matchesQuery && matchesFamily && matchesRole;
    paper.hidden = !show;
    if (show) visible += 1;
  });
  if (empty) empty.style.display = visible ? 'none' : 'block';
}

[search, family, role].forEach((control) => {
  control?.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', filterPapers);
});
