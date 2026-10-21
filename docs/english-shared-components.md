# Shared English header and footer

All 20 HTML pages under `en/` use the same shell, including login, dashboard and checkout pages. Persian HTML remains unchanged. Page-specific content, dashboard sidebars, search fields and newsletter sections remain in their original pages.

`src/js/english-components.js` owns the English header, native mobile navigation dialog and footer markup. Their layout, branding, icons, contact details and placeholder policies follow root `index.html`. Each English page supplies `data-english-header` and `data-english-footer` mount points. The deferred script replaces those mount points once; it does not fetch partials or create a competing navigation implementation.

The deferred scripts run in this order:

1. `english-components.js` mounts the shell.
2. `categories.js` initializes the existing category menu with English labels and LTR keyboard navigation.
3. `cart-state.js` supplies the existing session cart state.
4. `storefront.js` initializes the language switcher and cart preview, including on secondary English pages.
5. `header.js` initializes the existing mobile dialog, focus handling and dismissal.
6. `homepage-footer.js` initializes the existing responsive footer disclosures.

Paths in the shell are resolved with `new URL(path, new URL('../../', document.currentScript.src))`, matching the existing storefront/category scripts. This supports different page depths, case-sensitive hosts (`en/pages/Login.html`) and deployment beneath a subdirectory without a hardcoded domain or domain-root asset path. Language links retain the matching page, query and fragment through the existing route map. The category hierarchy links to the English catalogue because there is no English categories page. The mobile menu exposes that catalogue and the English cart directly. Special offers link to the existing English homepage section with `id="featured-products"`.

There are no new dependencies or build scripts. Tailwind's existing automatic source detection scans the literal classes in `src/js/english-components.js`; build generated `dist/output.css` with `npm run dev` and stop the watcher after compilation when a one-time build is needed. Direction-specific source CSS is scoped to `html[lang='en']`. Deploy `src/js/`, `dist/`, `assets/` and both language page trees together. JavaScript is required to mount the English shell; there is no server-side include requirement or runtime partial-fetch request.

Social account URLs, certification badges, policy pages and designer attribution were not supplied. As in the Persian footer, these remain clearly labelled, noninteractive English placeholders. The footer telephone is retained from the Persian footer; the address and English business hours match the existing English contact page. This task does not resolve existing placeholder content, links or unfinished page features outside the shared shell.
