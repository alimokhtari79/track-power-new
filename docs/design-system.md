# Current Design System

This document describes the actual CSS and HTML patterns currently implemented in the project. The items documented here do not necessarily constitute a complete or fully standardized design system. Where a value or pattern has only been observed on specific pages, it is documented as an existing implementation pattern rather than an official project-wide standard.

## Core CSS Design Tokens

The following variables are defined in `:root` in `src/styles/input.css` and mapped to Tailwind color utilities through `@theme`.

| Category | Variable | Value | Corresponding Utility Classes |
|---|---|---|---|
| Brand | `--brand-700` | `#bd0c0a` | `bg-brand-700`, `text-brand-700`, `border-brand-700` |
| Brand | `--brand-800` | `#9e0907` | `bg-brand-800`, commonly used for hover states |
| Brand | `--brand-900` | `#7a0605` | `bg-brand-900` |
| Brand | `--brand-100` | `#fee2e2` | `bg-brand-100` |
| Brand | `--brand-50` | `#fef2f2` | `bg-brand-50` |
| Text | `--primary` | `#191616` | `text-primary`, `bg-primary` |
| Text | `--body` | `#4b5563` | `text-body` |
| Text | `--muted` | `#666464` | `text-muted` |
| Text | `--inactive` | `#989898` | `text-inactive` |
| Border | `--border-light` | `#e6e7e9` | `border-border-light` |
| Surface | `--surface-bg` | `#f5f5f5` | `bg-surface-bg` |
| Surface | `--surface-card` | `#ffffff` | `bg-surface-card` |
| Status | `--success` | `#06ac1c` | `text-success`, `bg-success` |
| Status | `--warning` | `#f59e0b` | `text-warning`, `bg-warning` |
| Status | `--error` | `#be0c0b` | `text-error`, `bg-error` |
| Status | `--info` | `#1d4ed8` | `text-info`, `bg-info` |

These tokens are the project's central color definitions. However, many HTML files also use hardcoded color values. Frequently occurring examples include `#dedede`, `#e5e5e5`, `#ddd`, `#19161699`, `#1916161f`, `#bd0c0a1a`, `#6e6e6f`, `#d9d9d9`, and `#64748b`.

These values are not currently defined as shared design tokens in `src/styles/input.css` or in a separate token file.

## Typography and Fonts

The project uses `Peyda` as its primary font family. The following font weights are defined in `src/styles/input.css`.

| Font Weight | File Referenced in CSS |
|---:|---|
| 100 | `PeydaWeb-Thin.woff2` |
| 200 | `PeydaWeb-ExtraLight.woff2` |
| 300 | `PeydaWeb-Light.woff2` |
| 400 | `PeydaWeb-Regular.woff2` |
| 500 | `PeydaWeb-Medium.woff2` |
| 600 | `PeydaWeb-SemiBold.woff2` |
| 700 | `PeydaWeb-Bold.woff2` |
| 800 | `PeydaWeb-ExtraBold.woff2` |
| 900 | `PeydaWeb-Black.woff2` |

Two font filenames differ from their CSS references in letter casing. The actual files are `peydaWeb-extralight.woff2` and `peydaWeb-light.woff2`, while the CSS references `PeydaWeb-ExtraLight.woff2` and `PeydaWeb-Light.woff2`, respectively.

On case-sensitive file systems, these mismatches may prevent the corresponding font weights from loading. This issue has not yet been fixed.

Common typography utilities include `text-xs` through `text-4xl`, font weights such as `font-medium`, `font-semibold`, `font-bold`, and `font-extrabold`, and arbitrary font sizes such as `text-[13px]`, `text-[14px]`, `text-[28px]`, and `text-[36px]`.

These arbitrary font sizes do not currently belong to a separately defined, centralized typography scale.

## Custom Utility Classes and Selectors

The following custom utilities are defined in `src/styles/input.css`:

- `container-custom`: Sets the width to `100%`, limits the maximum width to `1320px`, and centers the container using `margin-inline: auto`. Below `768px`, it applies `20px` of horizontal padding.
- `direction-ltr`: Sets `direction: ltr`.
- `direction-rtl`: Sets `direction: rtl`.
- `timer`: Applies spacing and borders between timer items.
- `most-viewed-articles`: Applies vertical spacing and borders between items in article lists.

Other custom selectors and styles include:

- `.reviews-track` and the `reviews-marquee` animation for the scrolling reviews section.
- `.deal-swiper` and its slide-state styles for promotional product cards.
- `.js-swiper` for native horizontal scrolling on mobile and Swiper layouts on desktop.
- `.range-wrap` for the dual-range price slider.
- `.swiper-pagination-bullet.swiper-pagination-bullet-active` for the active pagination bullet color.

## Breakpoints and Responsive Behavior

The HTML uses Tailwind responsive variants such as `sm:`, `md:`, `lg:`, and `xl:`. The project's custom CSS establishes the primary mobile/desktop boundary at `767px` and `768px`.

- **Mobile:** `max-width: 767px`
- **Desktop:** `min-width: 768px`

Common responsive patterns include:

- Two-column product grids on mobile and four-column grids on larger screens.
- Switching from `flex-col` to `md:flex-row`.
- Showing or hiding elements with `md:hidden` and `md:block`.
- Adjusting padding and border radius at the `md:` breakpoint.
- Using native horizontal scrolling for selected mobile sliders.

These are patterns observed in the existing implementation. The project does not currently have a separate document defining an official breakpoint convention.

## UI Component Patterns

### Product Cards

Product cards appear on the product listing page and in product sections across other pages. A common structure uses classes such as:

`product-card flex min-w-0 flex-col rounded-2xl bg-white`

The product image typically uses `aspect-square` and `object-contain`. Product details and ratings are displayed using small text sizes, while the final price commonly uses `text-success`.

Discount badges often use `text-brand-700` with the hardcoded background color `#bd0c0a1a`.

These are recurring implementation patterns, not a fully standardized component specification.

### Buttons

A frequently used primary button pattern is:

```text
bg-brand-700 hover:bg-brand-800 rounded-xl px-... py-... font-medium text-white transition
```

Button dimensions and widths vary by page. Some buttons use `w-full`, while others use `md:w-[unset]` or `w-fit`.

### Forms

Input fields on login, contact, account, and address pages commonly use:

- `rounded-xl`
- Gray border colors
- `p-4` or `p-5` for padding
- Right-aligned text
- `focus:border-brand-700` for focus styling

Placeholder colors are often specified directly rather than through a shared token or utility convention.

### Badges and Status Indicators

Discount badges, order-status indicators, and filter-status badges use brand colors, success green, gray, and other hardcoded colors.

There is currently no shared naming convention covering all badge variants.

### Sidebar and Dashboard

Pages under `pages/Dashboard/` contain similar sidebars with navigation items that commonly use `flex items-center gap-2` and directional icons.

On mobile, some items are controlled using utilities such as `md:hidden` and `ms-auto`.

The sidebar markup has not been extracted into a shared component and is repeated across multiple pages.

### Sliders

Swiper 11 is loaded from a CDN and is used for product sliders and promotional sections.

On mobile, `.js-swiper` uses native horizontal scrolling. On desktop, Swiper controls the slider layout.

The promotional slider uses `centeredSlides`, `loop`, `autoplay`, slide scaling, and a countdown timer.

## Right-to-Left (RTL) Layout and Directionality

All current pages use `lang="fa"` and `dir="rtl"`.

Some elements, including tracking codes, numeric values, and price-range controls, explicitly use `dir="ltr"` or `text-left` where needed.

Both logical and physical spacing utilities appear in the codebase:

- **Logical utilities:** `ms-auto`, `me-*`, `ps-*`, `pe-*`, and `border-e`.
- **Physical utilities:** `ml-*`, `mr-*`, `pl-*`, `pr-*`, `text-right`, and `text-left`.

When introducing the English version, these two groups must be reviewed separately. Changing `dir` alone will not correct every direction-dependent layout, spacing rule, or arrow icon.

## Page-Specific Patterns and Areas Outside the Centralized System

The following limitations and inconsistencies exist in the current implementation:

- Hardcoded hexadecimal colors, custom border radii such as `rounded-[20px]`, and arbitrary dimensions are scattered across multiple pages.
- Header, newsletter, sidebar, and product-card markup is repeated rather than implemented through shared components.
- Product filtering logic is separated into its own JavaScript file, while product forms and purchasing logic include inline JavaScript.
- The URL structure for a second language, English font selection, and the final LTR conventions have not yet been defined.

These items describe the current state of the project. They should not be treated as requirements to refactor or standardize everything at once. Any future changes should be based on verified usage, explicit requirements, and the scope of the task.