# Verification — 17 September 2026

- The production build completes without warnings and includes the root page plus all seven language routes: SR, EN, RU, ES, FR, DE and ZH.
- `npm run check` passes translation-key parity, the owner-approved eight-member roster and order, exactly one laboratory head, localized names and academic titles, 22 activities, unique IDs, anchors, local assets and structured data.
- Seven team cards contain a localized official FTN profile action and a confirmed institutional `@uns.ac.rs` email action. All seven external profiles use HTTPS, open in a new tab and include `noopener noreferrer`. Milan Zec appears as the eighth member without an invented or disabled profile control.
- The general LPSI address `petrovicnikola@uns.ac.rs` appears in the contact section, collaboration CTA, footer and organization structured data. No telephone link is present.
- Team interaction and layout were visually reviewed in the browser at 1280, 390 and 320 CSS pixels. The existing four-column, two-column and one-column responsive behavior remains intact, long email addresses wrap inside the cards, and no horizontal overflow occurs.
- The English browser accessibility tree exposes all member profile and email actions with the member name in each accessible label. Keyboard focus remains covered by the existing global focus treatment; the cards use native links rather than clickable containers.
- Browser console inspection at the narrow mobile breakpoint reports no warnings or errors.
- The institutional header links, seven-language dropdown order, project filters, internship section, approved visual identity and all unrelated page sections remain in place.
- The distributed site excludes equipment inventories, private telephone numbers, invented biographies, research interests, photos, external identities and unsupported project claims.

GitHub Pages deployment is configured through the existing Actions workflow for `Petrovicc/LPSI`. The public URL is `https://petrovicc.github.io/LPSI/`; the workflow run and live site are checked after each push to `main`.
