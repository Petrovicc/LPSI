import { icon } from './components/icons.js';
import { network, projectVisual } from './components/network.js';
import { team, memberInitials } from './data/team.js';
import { memberTitle } from './data/titles.js';
import { projects, categories } from './data/projects.js';
import { research } from './data/research.js';
import { site, languages, languageNames, navigation } from './data/site.js';

export const escape = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const e = escape;
const localized = (value, lang) => typeof value === 'object' && value !== null ? value[lang] : value;
const safeUrl = (value) => /^(https?:\/\/|mailto:|tel:)/.test(value || '') ? e(value) : '';
const asset = (path) => `/assets/${path}`;
const title = (s, extra = '') => `<div class="section-heading ${extra}"><p class="eyebrow">${e(s.eyebrow)}</p><h2>${e(s.title)} <span>${e(s.accent)}</span></h2>${s.intro ? `<p class="section-intro">${e(s.intro)}</p>` : ''}</div>`;

export function render(t, { root = false, url = '' } = {}) {
  const prefix = root ? './' : '../';
  const languageLinks = (footer = false) => `<details class="language-picker${footer ? ' footer-languages' : ''}"><summary aria-label="${e(t.ui.language)}: ${e(languageNames[t.lang])}">${icon('globe')}<span>${t.lang.toUpperCase()}</span>${icon('down')}</summary><nav class="language-options" aria-label="${e(t.ui.language)}">${languages.map(lang => `<a class="language-option language-link" href="${prefix}${lang}/" lang="${lang}" hreflang="${lang}" ${lang === t.lang ? 'aria-current="page"' : ''}><span class="language-code" aria-hidden="true">${lang.toUpperCase()}</span><span>${e(languageNames[lang])}</span>${lang === t.lang ? icon('check') : ''}</a>`).join('')}</nav></details>`;
  const navLinks = (items, cls = '') => items.map(id => `<a class="${cls}" href="#${id}"${id === 'home' && cls ? ' aria-current="location"' : ''}>${e(t.nav[id])}</a>`).join('');
  const brand = (footer = false) => `<a class="brand${footer ? ' brand-footer' : ''}" href="#home" aria-label="${e(t.lab)}"><img src="${asset('logos/lpsi-blue-small.png')}" alt="" width="55" height="49"><span><strong>LPSI<span class="brand-divider">/</span><span class="brand-ase">ASE Lab</span></strong><small>${e(t.shortLab)}</small></span></a>`;
  const projectCards = projects.map((p,i) => {
    const content = t.projects.items[p.id];
    return `<article class="project-card${p.visual ? ' featured' : ''}" data-category="${p.category}" id="project-${p.id}">
    ${p.image ? `<img class="project-image" src="${asset(e(p.image))}" alt="${e(content[0])}" loading="lazy" width="400" height="170">` : p.visual ? `<div class="project-visual visual-${p.visual}">${projectVisual(p.visual)}<span class="visual-index">0${i+1} / LPSI</span></div>` : ''}
    <div class="project-body"><span class="category-label">${e(t.projects.categories[p.category])}</span><h3>${e(content[0])}</h3><p>${e(content[1])}</p>
    ${p.year || p.status ? `<p class="project-meta">${p.year ? e(p.year) : ''}${p.status ? ` · ${e(localized(p.status, t.lang))}` : ''}</p>` : ''}
    ${p.projectUrl || p.publicationUrl ? `<div class="project-links">${p.projectUrl ? `<a href="${safeUrl(p.projectUrl)}">${e(t.ui.project)} ${icon('diagonal')}</a>` : ''}${p.publicationUrl ? `<a href="${safeUrl(p.publicationUrl)}">${e(t.ui.publication)} ${icon('diagonal')}</a>` : ''}</div>` : ''}</div></article>`;
  }).join('');
  const teamCards = team.map(m => {
    const profileLinks = [
      m.ftnProfileUrl && `<a class="person-profile-link" href="${safeUrl(m.ftnProfileUrl)}" target="_blank" rel="noopener noreferrer" aria-label="${e(t.ui.ftnProfile)} — ${e(m.name[t.lang])}"><span>${e(t.ui.ftnProfile)}</span>${icon('diagonal')}</a>`,
      m.email && `<a class="person-email-link" href="${safeUrl(`mailto:${m.email}`)}" aria-label="${e(t.ui.email)} — ${e(m.name[t.lang])}">${icon('mail')}<span>${e(m.email)}</span></a>`,
      ...Object.entries({ orcid: 'ORCID', googleScholar: 'Google Scholar', researchGate: 'ResearchGate', linkedIn: 'LinkedIn', webpage: t.ui.profile })
        .filter(([key]) => m[key])
        .map(([key,label]) => `<a href="${safeUrl(m[key])}" target="_blank" rel="noopener noreferrer" aria-label="${e(label)} — ${e(m.name[t.lang])}"><span>${e(label)}</span>${icon('diagonal')}</a>`),
    ].filter(Boolean).join('');
    return `<article class="person-card${m.head ? ' person-head' : ''}">
    <div class="avatar" aria-hidden="true">${m.photo ? `<img src="${asset(e(m.photo))}" alt="" width="84" height="84" loading="lazy">` : `<span>${e(memberInitials(m,t.lang))}</span>`}</div>
    <p class="academic-title" lang="${t.lang}">${e(memberTitle(m,t.lang))}</p><h3 lang="${t.lang === 'zh' ? 'sr-Latn' : t.lang}">${e(m.name[t.lang])}</h3><p class="person-role">${m.head ? `<span class="role-dot"></span>` : ''}${e(m.head ? t.team.head : t.team.member)}</p>
    ${m.researchInterests ? `<p class="interests"><span class="sr-only">${e(t.ui.interests)}: </span>${e(localized(m.researchInterests, t.lang))}</p>` : ''}
    ${profileLinks ? `<div class="person-links">${profileLinks}</div>` : ''}
  </article>`;
  }).join('');
  const canonical = url ? `${url}${t.lang}/` : '';
  const organization = {
    '@context': 'https://schema.org', '@type': 'ResearchOrganization', name: t.lab,
    alternateName: ['LPSI', 'Applied Software Engineering Lab', 'Лабораторија за примењено софтверско инжењерство'],
    description: t.meta.description,
    parentOrganization: { '@type': 'CollegeOrUniversity', name: t.institution.faculty, parentOrganization: { '@type': 'CollegeOrUniversity', name: t.institution.university } },
    location: { '@type': 'Place', name: t.contact.address.slice(0,2).join(', '), address: { '@type': 'PostalAddress', addressLocality: 'Novi Sad', addressCountry: 'RS' } },
    ...(canonical ? { url: canonical, logo: `${url}assets/logos/lpsi-blue.png` } : {}),
    ...(site.email ? { email: site.email } : {}), ...(site.phone ? { telephone: site.phone } : {}),
  };
  return `<!doctype html>
<html lang="${t.lang}" data-root="${root}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${e(t.meta.title)}</title><meta name="description" content="${e(t.meta.description)}"><meta name="theme-color" content="#122747">
<meta property="og:type" content="website"><meta property="og:title" content="${e(t.meta.title)}"><meta property="og:description" content="${e(t.meta.description)}"><meta property="og:site_name" content="LPSI / ASE Lab"><meta property="og:locale" content="${t.locale}">
${canonical ? `<link rel="canonical" href="${e(canonical)}"><meta property="og:url" content="${e(canonical)}">${languages.map(lang=>`<link rel="alternate" hreflang="${lang}" href="${e(url)}${lang}/">`).join('')}<link rel="alternate" hreflang="x-default" href="${e(url)}sr/">` : '<!-- Set SITE_URL to generate canonical, hreflang, sitemap and absolute organization URLs. -->'}
<link rel="icon" type="image/png" href="${asset('logos/lpsi-blue-favicon.png')}"><link rel="stylesheet" href="${prefix}src/styles.css">
<script type="application/ld+json">${JSON.stringify(organization).replace(/</g,'\\u003c')}</script>
<noscript><style>@media(max-width:1180px){.nav-shell{flex-wrap:wrap;padding-block:12px}.main-nav{display:flex;position:static;flex-wrap:wrap;order:5;flex:1 0 100%;padding:8px 0;box-shadow:none}.nav-link{padding:8px}.menu-toggle{display:none}}</style></noscript>
${root ? `<script>try{const l=localStorage.getItem('lpsi-language');if(${JSON.stringify(languages)}.includes(l))location.replace('./'+l+'/'+location.hash)}catch{}</script>` : ''}
</head>
<body>
<a class="skip-link" href="#main">${e(t.ui.skip)}</a>
<div class="institution-bar"><div class="container institution-inner"><span>${e(t.institution.university)} <span class="institution-separator">/</span> ${e(t.institution.faculty)}</span><span class="institution-city">${icon('pin')}${e(t.institution.city)}</span></div></div>
<header class="site-header"><div class="container nav-shell">${brand()}
<nav id="main-nav" class="main-nav" aria-label="${e(t.ui.navigation)}">${navLinks(navigation,'nav-link')}</nav>
${languageLinks()}<button class="menu-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="${e(t.ui.menu)}" data-open-label="${e(t.ui.menu)}" data-close-label="${e(t.ui.closeMenu)}"><span></span><span></span></button></div></header>
<main id="main" tabindex="-1">
<section class="hero" id="home" aria-labelledby="hero-title"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="tiny-rule"></span>${e(t.hero.eyebrow)}</p><p class="hero-lab">${e(t.lab)}</p><h1 id="hero-title">${e(t.hero.title)}<br><span>${e(t.hero.accent)}</span></h1><p class="hero-intro">${e(t.hero.intro)}</p><div class="hero-actions"><a class="button button-primary" href="#research">${e(t.hero.primary)}${icon('arrow')}</a><a class="text-button" href="#team">${e(t.hero.secondary)}${icon('diagonal')}</a></div><a class="hero-scroll" href="#about"><span>${icon('down')}</span>${e(t.hero.scroll)}</a></div>${network(t)}</div>
<div class="container hero-bottom">${t.hero.bottom.map((s,i)=>`<span>${icon(['globe','code','spark'][i])}${e(s)}</span>`).join('')}</div></section>
<div class="affiliation"><div class="container affiliation-inner"><a class="affiliation-item chair" href="${safeUrl(site.affiliations.chair)}" target="_blank" rel="noopener noreferrer"><img src="${asset('logos/chair.png')}" alt="" width="36" height="36"><span>${e(t.institution.chair)}</span></a><a class="affiliation-item" href="${safeUrl(site.affiliations.faculty)}" target="_blank" rel="noopener noreferrer"><img src="${asset('logos/ftn.png')}" alt="" width="42" height="46"><span>${e(t.institution.faculty)}</span></a><a class="affiliation-item" href="${safeUrl(site.affiliations.university)}" target="_blank" rel="noopener noreferrer"><img src="${asset('logos/university.png')}" alt="" width="44" height="44"><span>${e(t.institution.university)}</span></a></div></div>
<section class="section about-section" id="about"><div class="container">${title(t.about,'wide-heading reveal')}<div class="pillars">${t.about.pillars.map(([h,p],i)=>`<article class="pillar reveal"><div class="pillar-top"><span class="icon-box">${icon(['book','spark','network'][i])}</span><span class="item-number">0${i+1}</span></div><h3>${e(h)}</h3><p>${e(p)}</p>${i<2 ? `<span class="pillar-connector" aria-hidden="true">↔</span>` : ''}</article>`).join('')}</div><div class="goals-heading"><h3>${e(t.about.missionTitle)}</h3><span class="thin-rule"></span></div><div class="goals">${t.about.goals.map(([h,p],i)=>`<article class="goal reveal">${icon(['network','people','globe','spark','book','code'][i])}<div><h4>${e(h)}</h4><p>${e(p)}</p></div></article>`).join('')}</div></div></section>
<section class="section research-section" id="research"><div class="container">${title(t.research,'reveal')}<div class="research-grid">${research.map((r,i)=>`<article class="research-card reveal" id="research-${r.id}"><div class="research-top"><span class="icon-box">${icon(r.icon)}</span><span class="item-number">${String(i+1).padStart(2,'0')}</span></div><h3>${e(t.research.items[r.id][0])}</h3><p>${e(t.research.items[r.id][1])}</p></article>`).join('')}</div></div></section>
<section class="section projects-section" id="projects"><div class="container">${title(t.projects,'reveal')}<div class="project-filters" role="group" aria-label="${e(t.ui.filter)}" hidden><button type="button" class="filter active" data-filter="all" aria-pressed="true">${e(t.ui.all)}</button>${categories.map(c=>`<button type="button" class="filter" data-filter="${c}" aria-pressed="false">${e(t.projects.categories[c])}</button>`).join('')}</div><div class="project-grid" id="project-list">${projectCards}</div><div class="project-controls" hidden><p id="project-results" class="result-count" role="status" data-template="${e(t.ui.results)}"></p><button class="button button-outline" id="show-projects" aria-controls="project-list" aria-expanded="false" data-more="${e(t.ui.showMore)}" data-less="${e(t.ui.showLess)}"><span>${e(t.ui.showMore)}</span>${icon('down')}</button></div></div></section>
<section class="section education-section" id="education"><div class="container education-grid"><div>${title(t.education,'reveal')}<div class="education-paths">${t.education.paths.map(([h,p],i)=>`<article class="education-path reveal"><span class="path-number">0${i+1}</span><div><h3>${e(h)}</h3><p>${e(p)}</p></div></article>`).join('')}</div></div><aside class="courses reveal"><span class="course-icon">${icon('book')}</span><h3>${e(t.education.coursesTitle)}</h3><ol>${t.education.courses.map(s=>`<li>${e(s)}</li>`).join('')}</ol><p class="future-course">${e(t.education.future)}</p><div class="course-decoration" aria-hidden="true">{ }</div></aside></div></section>
<section class="section internships-section" id="internships"><div class="container">${title(t.internships,'reveal')}<div class="internship-grid">${t.internships.groups.map(([h,p],i)=>`<article class="internship-card reveal"><span class="icon-box">${icon(['code','network','spark','book'][i])}</span><h3>${e(h)}</h3><p>${e(p)}</p></article>`).join('')}</div><div class="internship-invitation reveal"><div><h3>${e(t.internships.invitation)}</h3><p>${e(t.internships.note)}</p></div><a class="button button-primary" href="#contact">${e(t.internships.button)}${icon('arrow')}</a></div></div></section>
<section class="section team-section" id="team"><div class="container">${title(t.team,'reveal')}<div class="team-grid">${teamCards}</div></div></section>
<section class="section collaboration-section" id="collaboration"><div class="container collaboration-grid"><div>${title(t.collaboration,'reveal')}<div class="collaboration-tags">${t.collaboration.tags.map(s=>`<span>${icon('check')}${e(s)}</span>`).join('')}</div></div><div class="collaboration-cta reveal"><div class="collaboration-symbol" aria-hidden="true">${icon('globe')}<span>+</span></div><h3>${e(t.collaboration.cta)}</h3><a class="button button-primary" href="${site.email ? safeUrl(`mailto:${site.email}`) : '#contact'}">${e(t.collaboration.button)}${icon('arrow')}</a></div></div>${site.partners.length ? `<div class="container partner-logos" aria-label="${e(t.ui.partners)}">${site.partners.map(p=>`<a href="${safeUrl(p.url)}"><img src="${asset(e(p.logo))}" alt="${e(localized(p.name,t.lang))}" loading="lazy"></a>`).join('')}</div>` : ''}</section>
<section class="contact-section" id="contact"><div class="container contact-grid"><div>${title(t.contact)}<div class="contact-stamp">${icon('pin')}<span>${e(t.contact.visit)}</span></div></div><div class="contact-details"><div class="contact-address"><span class="contact-label">${e(t.contact.location)}</span><address>${t.contact.address.map((s,i)=> i===0 ? `<strong>${e(s)}</strong>` : `<span>${e(s)}</span>`).join('')}</address>${site.mapUrl ? `<a href="${safeUrl(site.mapUrl)}">${e(t.ui.map)} ${icon('diagonal')}</a>` : ''}</div><div class="contact-channels"><span class="contact-label">${e(t.contact.availability)}</span>${site.email ? `<a href="mailto:${e(site.email)}">${e(site.email)}</a>` : ''}${site.phone ? `<a href="tel:${e(site.phone)}">${e(site.phone)}</a>` : ''}${!site.email && !site.phone ? `<p>${e(t.contact.note)}</p>` : ''}${site.contactUrl || site.email ? `<a class="button button-light" href="${safeUrl(site.contactUrl || `mailto:${site.email}`)}">${e(t.ui.contact)} ${icon('arrow')}</a>` : ''}</div></div></div></section>
</main>
<footer class="site-footer"><div class="container"><div class="footer-grid"><div>${brand(true)}<p class="footer-description">${e(t.footer.description)}</p><p class="footer-institution">${e(t.institution.faculty)}<br>${e(t.institution.university)}</p></div><div class="footer-links"><h2>${e(t.footer.explore)}</h2>${navLinks(['about','projects','education','internships','team','collaboration'])}</div><div class="footer-links"><h2>${e(t.footer.research)}</h2>${['software','medicine','virtual','data'].map(id=>`<a href="#research-${id}">${e(t.research.items[id][0])}</a>`).join('')}</div><div class="footer-contact"><h2>${e(t.nav.contact)}</h2><a href="#contact">${e(t.contact.address[0])}<br>${e(t.contact.address[1])}<br>${e(t.contact.address[3])}</a>${site.email ? `<a class="footer-email" href="mailto:${e(site.email)}">${e(site.email)}</a>` : ''}${languageLinks(true)}</div></div><div class="footer-bottom"><p>© <span data-year>${new Date().getFullYear()}</span> LPSI / ASE Lab. ${e(t.footer.rights)}</p><span>${e(t.footer.signature)}</span><a href="#home" aria-label="${e(t.ui.backTop)}">${icon('arrow','up-arrow')}</a></div></div></footer>
<script type="module" src="${prefix}src/main.js"></script>
</body></html>`;
}
