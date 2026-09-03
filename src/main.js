const currentLanguage = document.documentElement.lang;
try { if (document.documentElement.dataset.root !== 'true') localStorage.setItem('lpsi-language', currentLanguage); } catch { /* Browsing without storage remains fully functional. */ }
document.querySelectorAll('.language-link').forEach(link => {
  link.addEventListener('click', () => {
    try { localStorage.setItem('lpsi-language', link.hreflang); } catch { /* Storage is optional. */ }
    const target = new URL(link.href);
    target.hash = location.hash;
    link.href = target.href;
  });
});
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// Native details/links also work without JavaScript; enhancement handles dismissal.
const languagePickers = [...document.querySelectorAll('.language-picker')];
function closeLanguages(except = null) {
  languagePickers.forEach(picker => { if (picker !== except) picker.open = false; });
}
languagePickers.forEach(picker => {
  picker.addEventListener('toggle', () => {
    if (picker.open) { closeLanguages(picker); setMenu(false); }
  });
});
document.addEventListener('click', event => {
  closeLanguages(event.target.closest('.language-picker'));
});
document.addEventListener('focusin', event => {
  closeLanguages(event.target.closest('.language-picker'));
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openPicker = languagePickers.find(picker => picker.open);
  if (openPicker) { closeLanguages(); openPicker.querySelector('summary').focus(); }
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
function setMenu(open, restoreFocus = false) {
  if (open) closeLanguages();
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  setMenu(false);
  if (open) {
    const target = document.querySelector(link.hash);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
}));
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false, toggle.getAttribute('aria-expanded') === 'true'); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header') && toggle.getAttribute('aria-expanded') === 'true') setMenu(false); });
document.addEventListener('focusin', event => { if (!event.target.closest('.site-header') && toggle.getAttribute('aria-expanded') === 'true') setMenu(false); });
matchMedia('(min-width: 1181px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const more = document.querySelector('#show-projects');
const results = document.querySelector('#project-results');
let selected = 'all';
let expanded = false;
function updateProjects() {
  const matching = cards.filter(card => selected === 'all' || card.dataset.category === selected);
  const visible = expanded ? matching : matching.slice(0, 6);
  cards.forEach(card => { card.hidden = !visible.includes(card); });
  filters.forEach(filter => { const active = filter.dataset.filter === selected; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
  more.hidden = matching.length <= 6;
  more.setAttribute('aria-expanded', String(expanded));
  more.querySelector('span').textContent = expanded ? more.dataset.less : more.dataset.more;
  results.textContent = results.dataset.template.replace('{shown}', visible.length).replace('{total}', matching.length);
}
filters.forEach(filter => filter.addEventListener('click', () => { selected = filter.dataset.filter; expanded = false; updateProjects(); }));
more.addEventListener('click', () => {
  expanded = !expanded;
  updateProjects();
  if (expanded) {
    const firstNew = cards.filter(card => !card.hidden)[6];
    firstNew.setAttribute('tabindex', '-1');
    firstNew.focus({ preventScroll: true });
    firstNew.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
  } else {
    document.querySelector('#projects').scrollIntoView({ behavior: 'instant' });
  }
});
document.querySelector('.project-filters').hidden = false;
document.querySelector('.project-controls').hidden = false;
updateProjects();

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  if (!reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('will-reveal'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('will-reveal'); revealObserver.observe(el); }
    });
    reduceMotion.addEventListener('change', event => { if (event.matches) { document.querySelectorAll('.will-reveal').forEach(el=>el.classList.remove('will-reveal')); revealObserver.disconnect(); } });
  }
  const links = [...nav.querySelectorAll('.nav-link')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => { if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id]').forEach(el => sectionObserver.observe(el));
}

// Restore a shared section URL after the initial layout and project filtering settle.
// Explicit alignment also handles full-page language switches and direct refreshes.
function alignInitialAnchor() {
  if (!location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  if (target.matches('.project-card') && target.hidden) {
    expanded = true;
    updateProjects();
  }
  requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
}
if (document.readyState === 'complete') alignInitialAnchor();
else window.addEventListener('load', alignInitialAnchor, { once: true });
