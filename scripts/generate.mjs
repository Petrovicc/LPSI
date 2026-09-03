import { writeFile, mkdir, rm } from 'node:fs/promises';
import { render } from '../src/render.js';
import { site, languages } from '../src/data/site.js';

let url = process.env.SITE_URL || site.url || '';
if (url) {
  const parsed = new URL(url);
  if (!['https:', 'http:'].includes(parsed.protocol) || parsed.search || parsed.hash) throw new Error('SITE_URL must be an HTTP(S) URL without query or fragment.');
  url = parsed.href.replace(/\/?$/, '/');
}
for (const lang of languages) {
  const { default: t } = await import(`../src/locales/${lang}.js`);
  await mkdir(lang, { recursive: true });
  await writeFile(`${lang}/index.html`, render(t, { url }));
  if (lang === 'sr') await writeFile('index.html', render(t, { root: true, url }));
}
await writeFile('public/.nojekyll', '');
if (url) {
  const xmlUrl = url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${languages.map(lang=>`<url><loc>${xmlUrl}${lang}/</loc></url>`).join('')}</urlset>`);
  await writeFile('public/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${url}sitemap.xml\n`);
} else {
  await rm('public/sitemap.xml', { force: true });
  await writeFile('public/robots.txt', 'User-agent: *\nAllow: /\n');
}
console.log(`Generated Serbian entry page and ${languages.length} static language routes.`);
