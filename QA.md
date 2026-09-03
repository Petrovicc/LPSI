# Verification — 4 September 2026

- Production build succeeds without warnings. No server bundle or backend is included.
- `npm run check` passes for the root and all four language routes: full translation key parity, eight team members, one head, 22 activities, IDs, anchor targets, structured data and all local asset references.
- All five project filters were exercised in the browser. Category totals: 8 biomedical/cognitive, 5 virtual reality, 4 electrical/infrastructure, 4 software and 1 prototyping activity. Expanding the list reveals all 22; collapsing restores six. Accessible result text and expanded states update correctly.
- All four languages were checked at 320, 768 and 1440 CSS pixels. Serbian was also visually checked at 390 pixels. Long Russian/German headings were corrected; final narrow-screen checks show no horizontal overflow or clipped headings/cards.
- Header and footer language links use real static routes. Changing language preserves the section fragment. The selected language persists; the root correctly redirects to that saved choice.
- Tested the production files on a plain Python static file server mounted under `/lpsi/`, without an SPA fallback. `/lpsi/sr/`, `/lpsi/en/`, `/lpsi/ru/` and `/lpsi/de/` load and refresh, with working images and shared CSS/JS. An unknown route returns HTTP 404.
- Fixed initial deep-link positioning after the page layout settles. Direct refresh and language switching now visibly align the requested section below the sticky header. Hidden project cards are revealed when addressed directly.
- Tested mobile menu opening, section navigation, closing and Escape focus restoration. Visible keyboard focus and reduced-motion CSS are implemented. Non-JavaScript HTML includes the full content and a usable mobile navigation fallback.
- Reviewed desktop/mobile screenshots, image loading and browser console. No runtime warnings or errors were observed. Text contrast was inspected and weak auxiliary labels were darkened.
- Confirmed canonical, hreflang and structured logo URLs with a test deployment URL. No unconfirmed production hostname is embedded. The deployment workflow obtains the actual Pages URL.
- Equipment inventory, device models, invented contact details, project dates/statuses, partners and unsupported achievements are absent from the distributed site.

The owner's follow-up changes were also verified: all eight names and initials follow the selected language; all four internship audience groups and navigation links appear in every language; the navy logo loads in the header and footer. The new section was visually reviewed on desktop and at 390 CSS pixels in German, including mobile menu navigation and card wrapping. The updated production build and static checks pass.

The seven-language revision passes the production build and static checks for all eight entry points. Header and footer language menus are checked against the configured order. French was visually reviewed on desktop and at 320 CSS pixels, Spanish at 390 pixels, and Chinese at 320 pixels. No page or card overflow was found. The dropdown fits the narrow viewport; Escape closes it and restores summary focus. Language switching preserves the selected section.

Final shared assets: approximately 33.6 kB CSS and 5.2 kB JavaScript before compression. All fonts use the local system stack; no third-party requests are required by the page.

GitHub Pages is configured for Actions deployment in `Petrovicc/LPSI`; the verified configured public URL is `https://petrovicc.github.io/LPSI/`. Remote deployment status is available in the repository's Actions history. A Lighthouse score or formal accessibility certification is not claimed. Direct contact channels and a custom domain remain configurable.
