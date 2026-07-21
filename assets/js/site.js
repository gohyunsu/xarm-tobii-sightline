document.querySelector('.nav-toggle')?.addEventListener('click', (event) => {
  const links = document.querySelector('.nav-links');
  const open = links.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
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
