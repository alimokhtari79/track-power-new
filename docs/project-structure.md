# Trak Power Project Structure

This project is a static, multi-page website built primarily in Persian. All current pages use `lang="fa"` and `dir="rtl"`. No templating system, router, or JavaScript framework is currently configured in the project.

## Key File and Directory Structure

```text
.
├── index.html
├── pages/
│   ├── FandQ.html
│   ├── about-us.html
│   ├── all-products.html
│   ├── blog.html
│   ├── contact.html
│   ├── login.html
│   ├── product.html
│   ├── single-blog.html
│   ├── Dashboard/
│   │   ├── account.html
│   │   ├── addresses.html
│   │   ├── dashboard.html
│   │   ├── favourite.html
│   │   ├── order-detail.html
│   │   ├── tickets.html
│   │   └── traucks.html
│   └── shopnig-card/
│       ├── cart.html
│       ├── order-status.html
│       ├── payment.html
│       └── shipping.html
├── src/
│   ├── js/
│   │   ├── all-products.js
│   │   └── swiper-config.js
│   └── styles/input.css
├── dist/output.css
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── package.json
├── package-lock.json
├── .prettierrc
├── .prettierignore
├── .gitignore
└── test
```

The `test` file is a standalone HTML test page. It is not configured as a test entry point or build input in the project's scripts.

## Pages

The homepage is `index.html`.

The public-facing pages are:

- `FandQ.html`
- `about-us.html`
- `all-products.html`
- `blog.html`
- `contact.html`
- `login.html`
- `product.html`
- `single-blog.html`

Account and dashboard pages are located in `pages/Dashboard/`. The filename `traucks.html` is the current filename and must not be changed as part of unrelated tasks.

Cart and checkout-related pages are located in `pages/shopnig-card/`. The directory name `shopnig-card` is also intentional in the current project structure and must not be renamed to `shopping-card` based on an assumption.

## CSS and Tailwind CSS

- **Tailwind CSS input:** `src/styles/input.css`
- **CSS output loaded by pages:** `dist/output.css`
- **Installed versions of `tailwindcss` and `@tailwindcss/cli`:** `4.3.3`

The input stylesheet begins with `@import 'tailwindcss'`. It also contains font definitions, color variables, `@theme` mappings, custom utility classes, and selectors related to sliders and the price filter.

HTML pages load the generated stylesheet at `dist/output.css` rather than importing the source stylesheet directly.

## JavaScript and Dependencies

`src/js/all-products.js` handles the product listing page's brand and price filters, sorting, mobile filters, and expandable or collapsible sections.

`src/js/swiper-config.js` controls product sliders, promotional sliders, countdown timers, and progress bars.

Swiper is not listed as an npm dependency in `package.json`. Pages using this functionality load Swiper version 11 from the jsDelivr CDN.

Some product and checkout functionality is also implemented using inline JavaScript within the corresponding HTML files.

## Available Project Scripts

The following scripts are defined in `package.json`:

```text
npm run dev
npm run format:tailwind
npm test
```

### `npm run dev`

Runs the following Tailwind CLI command in watch mode and may generate or update `dist/output.css`:

```text
npx @tailwindcss/cli -i ./src/styles/input.css -o ./dist/output.css --watch
```

### `npm run format:tailwind`

Runs Prettier against the entire project directory.

### `npm test`

No actual automated tests are configured. The script exits with an error message indicating that no tests are specified.

There is currently no separate production build command defined in `package.json`.

## Relative Paths

Asset and script paths must be resolved relative to the location of each HTML file.

- **`index.html`:** CSS paths use `./dist/output.css`, and JavaScript paths use `./src/js/`.
- **Pages directly inside `pages/`:** CSS and asset paths generally use `../` to reference the project root. JavaScript paths use `../src/js/`.
- **Pages inside `pages/Dashboard/` and `pages/shopnig-card/`:** CSS and asset paths generally use `../../` to reference the project root. JavaScript paths use `../../src/js/`.

Whenever a page is created or moved, calculate every relative path from that page's actual location and verify that the destination exists.

The following links currently use `../index.html` and do not resolve to an existing destination:

- `pages/shopnig-card/cart.html`
- `pages/shopnig-card/shipping.html`
- `pages/shopnig-card/payment.html`

These issues have not been fixed as part of the current documentation work.

Many `href="#"` values are also present and serve as placeholders.

## Current Limitations

- The generated CSS is separate from the source stylesheet, and there is no dedicated production build command.
- No real automated test suite is configured.
- Swiper depends on an external CDN.
- Headers, sidebars, newsletter sections, and some product cards are duplicated across HTML pages rather than implemented as shared components.
- A language-aware URL structure for the future English version has not yet been defined.