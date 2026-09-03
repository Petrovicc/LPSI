# LPSI / Applied Software Engineering Lab

[Website](https://petrovicc.github.io/LPSI/) · [Source repository](https://github.com/Petrovicc/LPSI) · [Deployment status](https://github.com/Petrovicc/LPSI/actions/workflows/pages.yml)

Static, multilingual website for the laboratory at the Faculty of Technical Sciences, University of Novi Sad. Serbian Cyrillic is the default. English, Russian, Spanish, French, German and Simplified Chinese have complete translations.

A single shared renderer generates real HTML pages at `/`, `/sr/`, `/en/`, `/ru/`, `/es/`, `/fr/`, `/de/` and `/zh/`. Vite bundles the shared CSS and small JavaScript module. Production requires only a static file host: there is no backend, database, authentication, API or runtime Node server. All content is in the HTML, including all research activities; JavaScript enhances filtering, navigation and language persistence.

Language dropdowns in the header and footer follow the owner's order: **SR, EN, RU, ES, FR, DE, ZH**. Native disclosure elements and real links work without JavaScript. With JavaScript, selection preserves the section fragment and language preference; Escape closes the dropdown and restores focus.

## Develop and build

Use Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. CSS and client JavaScript update live. After editing translations, data or `src/render.js`, restart `npm run dev` to regenerate the static pages.

```sh
npm run build
npm run check
npm run preview
```

Deploy **the contents of `dist/`**. `preview` is a local verification server, not a production dependency. Open through HTTP rather than double-clicking a file. Generated root HTML and language directories are ignored by Git and recreated before development/build.

## GitHub Pages

This repository uses GitHub Actions deployment to `https://petrovicc.github.io/LPSI/`. Pushes to `main` automatically rebuild, check and publish all language routes. The instructions below also apply to a fork or a future repository transfer.

1. Push this project to your GitHub repository on `main` (or change the workflow branch).
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
3. Run the included **Deploy LPSI to GitHub Pages** workflow, or push to `main`.

The workflow builds, checks and deploys `dist/`. It uses GitHub's actual Pages URL for canonical links, language alternates, sitemap and structured data. The `.nojekyll` file is included. Refreshing a language route works because every route has its own `index.html`; no SPA fallback or server routing is required.

Deployment references: [GitHub's custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Vite static deployment](https://vite.dev/guide/static-deploy.html).

### Base path and domain

Vite defaults to `base: './'`. Assets, language links and section links work under both a repository path and a domain root without changing source. An optional `BASE_PATH` environment variable can override Vite's base; include leading/trailing slashes for a path. The default is recommended.

For manual deployments, configure the real full URL (including any repository path) using `SITE_URL`, or set `url` in `src/data/site.js`. Example in PowerShell:

```powershell
$env:SITE_URL = 'https://your-confirmed-host.example/your-repository/'
npm run build
```

The example domain is illustrative; it is never shipped. Without a confirmed URL, no invented canonical or sitemap URL is emitted. To test the default relative-path build, remove the environment variable before building again.

For a custom domain, configure it in GitHub Pages and DNS, then add **`public/CNAME`** containing only your confirmed hostname. The build copies it to `dist/CNAME`. Update `SITE_URL`/`site.url` for manual builds; the Actions workflow derives it from Pages configuration. Rebuild after changing the domain.

## Edit content

| Content | Source |
| --- | --- |
| All translated text, project titles/descriptions, courses and location | `src/locales/sr.js`, `en.js`, `ru.js`, `es.js`, `fr.js`, `de.js`, `zh.js` |
| Internship invitation and audience groups in all languages | `src/locales/internships.js` |
| Team and optional profile fields | `src/data/team.js` |
| Activities, original titles, categories and optional metadata | `src/data/projects.js` |
| Research order and icons | `src/data/research.js` |
| Contact channels, canonical URL, partner data and navigation | `src/data/site.js` |
| Shared sections and HTML metadata | `src/render.js` |
| Responsive layout and motion | `src/styles.css` |
| Filters, language preference and navigation | `src/main.js` |

Keep the same translation keys in all seven files. `npm run check` detects mismatches and missing text. Personal names use Serbian Cyrillic for Serbian, Serbian Latin for English/Spanish/French/German/Chinese and adapted Russian Cyrillic for Russian. The Chinese page marks Latin personal names with `lang="sr-Latn"`. Initials follow the selected name. Academic titles retain the original institutional wording, marked with `lang="sr"`; roles and interface labels are translated. Project brand names and the official English laboratory name remain proper nouns.

### Team members

Add/remove a record in `src/data/team.js`. Exactly one record should have `head: true`. Optional fields are omitted from the public interface when `null`; add them to the individual record to override defaults:

```js
{
  id: 'stable-person-id',
  name: { sr: 'Име Презиме', en: 'Ime Prezime', ru: 'Име Презиме', de: 'Ime Prezime' }, // ES, FR and ZH derive Latin spelling from EN.
  title: 'Confirmed academic title', head: false,
  photo: 'people/confirmed-photo.jpg',
  researchInterests: { sr: '...', en: '...', ru: '...', es: '...', fr: '...', de: '...', zh: '...' },
  email: null, orcid: null, googleScholar: null,
  researchGate: null, linkedIn: null, webpage: null
}
```

Photos are relative to `public/assets/`. ORCID, profile and publication fields take complete confirmed HTTPS URLs. Without a photo, initials are derived from the localized name. Supply and review every language form when adding a member. The grid adapts when members are added or removed.

### Research activities

Add a row to `src/data/projects.js`, then add `[title, description]` under the matching stable ID in `projects.items` in **each** locale:

```js
['stable-project-id', 'biomedical', 'Original official title', null, {
  year: null,
  status: null, // Or { sr: '...', en: '...', ru: '...', es: '...', fr: '...', de: '...', zh: '...' }
  image: null,  // Relative to public/assets/
  publicationUrl: null,
  projectUrl: null
}]
```

Available category IDs are in `categories`; adding a category also requires its label in each locale. The fourth field selects an optional abstract illustration (`brain`, `pulse`, `network`), or `null`. A confirmed `image` overrides the illustration. Filters and result counts update automatically.

### Contact and partners

`site.email`, `phone`, `mapUrl`, and `contactUrl` are intentionally `null`. Populate only confirmed values; corresponding links then appear automatically. Contact CTA buttons currently lead to the on-page location and contact section. No form pretends to submit a message.

`site.partners` is empty. Future entries use `{ name: { sr, en, ru, es, fr, de, zh }, logo: 'partners/logo.svg', url: 'https://confirmed-url' }`. Nothing is shown until genuine partners are added.

### Logos

Original marks extracted from the supplied proposal are preserved in `public/assets/logos/`: LPSI, chair, faculty and university. `lpsi.png` is the 975×863 source; `lpsi-small.png` is the smaller original. At the owner's request, the site now uses a dark-blue LPSI variant: `lpsi-blue.png` (975×863), `lpsi-blue-small.png` (320×283, header/footer) and `lpsi-blue-favicon.png` (96×85). The other institutional marks retain their original colors. Replace a raster file at the same path to keep references, or change references in `src/render.js` when supplying SVG. See `CONTENT_SOURCES.md` for provenance.

## Checks

`npm run check` verifies translation completeness, project categories and IDs, team/head records, generated language pages, semantic main headings, local assets, navigation targets, structured data and absence of equipment inventory. The shared client supports reduced motion, visible keyboard focus, menu dismissal with Escape, filter state announcements and localStorage failures. All 22 activities remain available when JavaScript is disabled.

No third-party scripts, analytics, external font requests, embedded maps or external images are required. Content and assets are self-hosted.
