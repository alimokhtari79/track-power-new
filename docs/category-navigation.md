# Category navigation

The Persian homepage loads `src/js/categories.js`. It enhances the existing Categories link into a disclosure button. `src/js/storefront.js` now owns the shared mobile bottom navigation for the Persian/English homepages, cart pages, and Persian categories page. The dedicated mobile route is `pages/categories.html`; it also remains usable when opened on desktop. The category hierarchy itself remains Persian-only; English navigation explicitly labels its categories destination as FA.

The script owns a single hierarchy, transcribed from the supplied references, shared by the desktop four-column layout and mobile native `details` accordions. The eight main tabs are reversed vertically on mobile to match the design. Air and pneumatic systems is selected initially; a category hash preserves the selected tab on the dedicated page. Arrow keys, Home and End navigate the tabs. Escape, the trigger, outside clicks, focus leaving the menu, category links and crossing the 768px boundary dismiss the desktop disclosure.

All product links use the existing `pages/all-products.html#products` route. There are no category-specific product routes or catalog data for the other seven top-level categories, so those tabs show their all-products link without invented child categories. The product listing remains the existing static catalog; category-specific filtering is not implemented. The search form forwards `q` to that listing, which currently has no text-search backend. The camera is a decorative reference asset, not a nonfunctional control. The back-to-home link and bottom Home item provide deterministic back navigation; browser Back also works.

The existing homepage header uses a 1024px boundary. The category trigger is additionally exposed at 768–1023px without changing the unrelated drawer or language controls. Below 768px the bottom Categories link opens the dedicated page. Bottom navigation is installed on the homepages, cart pages and Persian categories page; it is not injected into unrelated page layouts. CSS is appended to `src/styles/input.css`; `dist/output.css` is generated using the established `npm run dev` watcher, stopped after compilation.

The desktop reference's promotional artwork reuses `Screw-image.png` and `hero-line.svg`. At 768–1199px the promotional panel is hidden to keep the four link columns readable. Mobile uses the supplied 428px reference proportions, with flexible columns for narrower screens and safe-area padding for the bottom bar.

## Verification for this implementation

- `node --check src/js/categories.js` passed.
- A temporary Node DOM simulation exercised rendering, tab selection, arrow-key movement, trigger toggle, outside click, Escape/focus return, link dismissal, and switching desktop/mobile modes; all assertions passed. It does not validate browser layout or native accordion behavior.
- A Python path check passed for the new page, script asset/route literals and generated CSS assets. `git diff --check` passed.
- `npm run dev` compiled successfully with Tailwind 4.3.3 after allowing the watcher outside the sandbox; the watcher was then stopped. The initial sandbox attempt failed with an FSEvents error.
- Browser visual checks, narrow-screen overflow inspection, real click/touch navigation and screenshot comparison remain unverified: Computer Use did not receive approval to access Chrome. No pixel-accuracy claim is made.
