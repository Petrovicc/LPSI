import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { site, languages, navigation } from '../src/data/site.js';
import { team } from '../src/data/team.js';
import { memberTitle } from '../src/data/titles.js';
import { projects, categories } from '../src/data/projects.js';
import { research } from '../src/data/research.js';

const keys = (value, path = '') => Object.entries(value).flatMap(([key,v]) => typeof v === 'object' && v !== null ? keys(v, `${path}${key}.`) : `${path}${key}`).sort();
let reference;
for (const lang of languages) {
  const { default: t } = await import(`../src/locales/${lang}.js`);
  reference ||= keys(t);
  assert.deepEqual(keys(t), reference, `${lang}: translation structure differs`);
  for (const member of team) assert(member.name[lang]?.trim(), `${lang}: missing name for ${member.id}`);
  for (const p of projects) {
    assert(categories.includes(p.category), `Unknown category: ${p.category}`);
    assert(t.projects.items[p.id]?.every(s=>typeof s === 'string' && s.trim()), `${lang}: missing project text for ${p.id}`);
  }
  for (const r of research) assert(t.research.items[r.id]?.length === 2, `${lang}: missing research area ${r.id}`);
}
assert.equal(new Set(projects.map(p=>p.id)).size, projects.length, 'Duplicate project ID');
assert.equal(new Set(team.map(m=>m.id)).size, team.length, 'Duplicate member ID');
assert.equal(team.filter(m=>m.head).length, 1, 'Exactly one laboratory head is required');
assert(team.find(m=>m.head).id === 'nikola-petrovic');

const dist = resolve('dist');
for (const route of ['', ...languages]) {
  const file = resolve(dist, route, 'index.html');
  const html = await readFile(file, 'utf8');
  assert(html.includes(`<html lang="${route || 'sr'}"`), `${route}: wrong language`);
  assert.equal((html.match(/<h1\b/g)||[]).length, 1, `${route}: one H1 required`);
  assert.equal((html.match(/class="person-card/g)||[]).length, team.length);
  const titleLanguage = route || 'sr';
  const renderedTitles = [...html.matchAll(/<p class="academic-title" lang="([^"]+)">([^<]*)<\/p>/g)];
  assert.equal(renderedTitles.length, team.length, `${route}: all member titles must be localized`);
  renderedTitles.forEach((match, index) => {
    assert.equal(match[1], titleLanguage, `${route}: wrong title language`);
    assert(memberTitle(team[index], titleLanguage)?.trim(), `${route}: missing title translation`);
    assert.equal(match[2], memberTitle(team[index], titleLanguage), `${route}: wrong member title`);
    if (!['sr','ru'].includes(titleLanguage)) assert(!/[\u0400-\u04ff]/u.test(match[2]), `${route}: Cyrillic title leaked`);
  });
  assert.equal((html.match(/class="project-card/g)||[]).length, projects.length);
  assert.equal((html.match(/<a class="affiliation-item/g)||[]).length, 3, `${route}: three linked institutional marks required`);
  for (const url of Object.values(site.affiliations)) {
    assert(html.includes(`href="${url}" target="_blank" rel="noopener noreferrer"`), `${route}: missing safe affiliation link ${url}`);
  }
  const languageMenus = [...html.matchAll(/<nav class="language-options"[^>]*>(.*?)<\/nav>/gs)];
  assert.equal(languageMenus.length, 2, `${route}: header and footer language menus required`);
  for (const menu of languageMenus) {
    assert.deepEqual([...menu[1].matchAll(/hreflang="([^"]+)"/g)].map(m=>m[1]), languages, `${route}: language menu order or routes differ`);
  }
  assert(!/Emotiv|Oculus|Arduino|Ender\s*3|Realsense|Edan|списак опреме|equipment inventory/i.test(html), `${route}: equipment inventory leaked`);
  assert(!/undefined|\[object Object\]/.test(html), `${route}: unrendered value`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate HTML ID`);
  for (const id of navigation) assert(ids.includes(id), `${route}: missing section ${id}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (target.startsWith('#')) { assert(ids.includes(target.slice(1)), `${route}: missing anchor ${target}`); continue; }
    if (/^(https?:|mailto:|tel:|data:)/.test(target)) continue;
    let assetPath = target.split(/[?#]/)[0];
    let directory = dirname(file);
    if (assetPath.startsWith('/')) {
      const base = process.env.BASE_PATH || '/';
      assert(assetPath.startsWith(base), `${route}: asset outside configured BASE_PATH: ${target}`);
      assetPath = assetPath.slice(base.length);
      directory = dist;
    }
    const path = resolve(directory, assetPath);
    assert(!relative(dist,path).startsWith('..'), `${route}: path escapes output: ${target}`);
    const info = await stat(path).catch(()=>null);
    assert(info, `${route}: missing local asset ${target}`);
    if(info.isDirectory()) await stat(resolve(path,'index.html'));
  }
  const jsonLd = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.equal(JSON.parse(jsonLd)['@type'], 'ResearchOrganization');
  console.log(`PASS /${route ? `${route}/` : ''}: metadata, content, anchors, images and static paths`);
}
await stat('dist/.nojekyll');
console.log(`PASS ${languages.length} complete locales; ${team.length} members; ${projects.length} activities; no equipment inventory.`);
