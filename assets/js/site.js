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

document.querySelectorAll('table').forEach((table) => {
  if (table.parentElement?.classList.contains('table-scroll')) return;
  const wrapper = document.createElement('div');
  wrapper.className = 'table-scroll';
  wrapper.tabIndex = 0;
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Scrollable data table');
  table.parentNode?.insertBefore(wrapper, table);
  wrapper.append(table);
});

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
