# سیستم طراحی فعلی

این سند وضعیت واقعی CSS و HTML موجود را ثبت می‌کند. موارد این سند الزاماً یک Design System کامل یا استانداردسازی‌شده نیستند؛ هرجا مقدارها فقط در صفحه خاصی دیده شده‌اند، به‌عنوان الگوی پراکنده ثبت شده‌اند.

## توکن‌های مرکزی CSS

در `src/styles/input.css` متغیرهای زیر در `:root` تعریف شده و سپس در `@theme` به رنگ‌های Tailwind نگاشت شده‌اند.

| گروه | متغیر | مقدار | کلاس‌های متناظر |
|---|---|---|---|
| برند | `--brand-700` | `#bd0c0a` | `bg-brand-700`, `text-brand-700`, `border-brand-700` |
| برند | `--brand-800` | `#9e0907` | `bg-brand-800`, معمولاً Hover |
| برند | `--brand-900` | `#7a0605` | `bg-brand-900` |
| برند | `--brand-100` | `#fee2e2` | `bg-brand-100` |
| برند | `--brand-50` | `#fef2f2` | `bg-brand-50` |
| متن | `--primary` | `#191616` | `text-primary`, `bg-primary` |
| متن | `--body` | `#4b5563` | `text-body` |
| متن | `--muted` | `#666464` | `text-muted` |
| متن | `--inactive` | `#989898` | `text-inactive` |
| Border | `--border-light` | `#e6e7e9` | `border-border-light` |
| سطح | `--surface-bg` | `#f5f5f5` | `bg-surface-bg` |
| سطح | `--surface-card` | `#ffffff` | `bg-surface-card` |
| وضعیت | `--success` | `#06ac1c` | `text-success`, `bg-success` |
| وضعیت | `--warning` | `#f59e0b` | `text-warning`, `bg-warning` |
| وضعیت | `--error` | `#be0c0b` | `text-error`, `bg-error` |
| وضعیت | `--info` | `#1d4ed8` | `text-info`, `bg-info` |

این توکن‌ها استاندارد مرکزی پروژه هستند. بااین‌حال HTMLها رنگ‌های مستقیم زیادی نیز دارند؛ نمونه‌های پرتکرار شامل `#dedede`، `#e5e5e5`، `#ddd`، `#19161699`، `#1916161f`، `#bd0c0a1a`، `#6e6e6f`، `#d9d9d9` و `#64748b` است. این مقدارها در `src/styles/input.css` یا یک فایل توکن جداگانه به‌عنوان توکن مرکزی تعریف نشده‌اند.

## فونت و تایپوگرافی

فونت عمومی `Peyda` است و در `src/styles/input.css` برای وزن‌های زیر تعریف شده است:

| وزن | فایل مورد اشاره در CSS |
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

نام دو فایل موجود با نام CSS از نظر حروف بزرگ و کوچک یکسان نیستند: فایل‌های موجود `peydaWeb-extralight.woff2` و `peydaWeb-light.woff2` هستند، درحالی‌که CSS نام‌های `PeydaWeb-ExtraLight.woff2` و `PeydaWeb-Light.woff2` را می‌خواهد. روی میزبان حساس به حروف، این دو وزن ممکن است بارگذاری نشوند. این مورد در این مرحله اصلاح نشده است.

کلاس‌های تایپوگرافی پرتکرار شامل `text-xs` تا `text-4xl`، وزن‌های `font-medium`، `font-semibold`، `font-bold` و `font-extrabold` و اندازه‌های مستقیم مانند `text-[13px]`، `text-[14px]`، `text-[28px]` و `text-[36px]` است. این اندازه‌های مستقیم استاندارد مرکزی جداگانه‌ای ندارند.

## Utilityهای سفارشی

در `src/styles/input.css` این Utilityها تعریف شده‌اند:

- `container-custom`: عرض ۱۰۰٪، حداکثر عرض `1320px` و `margin-inline: auto`. در عرض کمتر از `768px`، Padding افقی `20px` دارد.
- `direction-ltr`: تنظیم `direction: ltr`.
- `direction-rtl`: تنظیم `direction: rtl`.
- `timer`: فاصله داخلی و Border بین آیتم‌های تایمر.
- `most-viewed-articles`: فاصله عمودی و Border بین آیتم‌های فهرست مقالات.

Selectors اختصاصی دیگر:

- `.reviews-track` و انیمیشن `reviews-marquee` برای حرکت نظرات.
- `.deal-swiper` و وضعیت‌های اسلاید آن برای کارت پیشنهادها.
- `.js-swiper` برای اسکرول افقی موبایل و Swiper دسکتاپ.
- `.range-wrap` برای Slider دوگانه قیمت.
- `.swiper-pagination-bullet.swiper-pagination-bullet-active` برای رنگ Pagination.

## Breakpoint و ریسپانسیو

در HTML از Variantهای `sm:`, `md:`, `lg:` و `xl:` استفاده شده است. CSS سفارشی پروژه مرز اصلی موبایل و دسکتاپ را در `767px/768px` تعریف می‌کند:

- موبایل: `max-width: 767px`
- دسکتاپ: `min-width: 768px`

الگوهای پرتکرار عبارت‌اند از:

- Grid دو ستونه محصولات در موبایل و چهارستونه در نمایشگرهای بزرگ‌تر.
- تبدیل `flex-col` به `md:flex-row`.
- پنهان‌سازی یا نمایش عناصر با `md:hidden` و `md:block`.
- تغییر Padding و Radius در `md:`.
- اسکرول افقی Native برای برخی اسلایدرها در موبایل.

این‌ها الگوهای واقعی استفاده‌شده‌اند؛ پروژه فایل جداگانه‌ای برای قرارداد رسمی Breakpointها ندارد.

## الگوهای رابط کاربری

### کارت محصول

در صفحه محصولات و بخش‌های محصولات صفحات دیگر، کارت معمولاً با `product-card flex min-w-0 flex-col rounded-2xl bg-white` ساخته شده است. تصویر `aspect-square` و `object-contain` دارد، مشخصات و امتیاز با متن کوچک نمایش داده می‌شود و قیمت نهایی معمولاً `text-success` است. Badge تخفیف اغلب با `text-brand-700` و پس‌زمینه مستقیم `#bd0c0a1a` ساخته شده است.

### دکمه

الگوی پرتکرار دکمه اصلی:

```text
bg-brand-700 hover:bg-brand-800 rounded-xl px-... py-... font-medium text-white transition
```

اندازه و عرض دکمه در صفحات مختلف متفاوت است؛ بعضی دکمه‌ها `w-full` و بعضی `md:w-[unset]` یا `w-fit` هستند.

### فرم

فیلدهای ورود، تماس، حساب و آدرس معمولاً `rounded-xl`، Border خاکستری، Padding `p-4` یا `p-5`، متن راست‌چین و Focus با `focus:border-brand-700` دارند. رنگ Placeholder در بسیاری موارد مستقیم نوشته شده است.

### Badge و وضعیت

Badgeهای تخفیف، وضعیت سفارش و وضعیت فیلتر از رنگ برند، سبز موفقیت، خاکستری و رنگ‌های مستقیم استفاده می‌کنند. قرارداد مشترک نام‌گذاری برای همه Badgeها وجود ندارد.

### Sidebar و داشبورد

صفحات `pages/Dashboard/` Sidebar مشابهی با آیتم‌های `flex items-center gap-2` و آیکون‌های جهت‌دار دارند. در موبایل، برخی آیتم‌ها با `md:hidden` و `ms-auto` مدیریت می‌شوند. Sidebar به Component مشترک تبدیل نشده و Markup آن در چند صفحه تکرار شده است.

### اسلایدر

Swiper برای محصولات و پیشنهادها از CDN نسخه 11 استفاده می‌شود. در موبایل، `.js-swiper` به اسکرول افقی تبدیل می‌شود؛ در دسکتاپ Swiper Layout را کنترل می‌کند. اسلایدر پیشنهادها با `centeredSlides`, `loop`, `autoplay`, Scale و تایمر معکوس تنظیم شده است.

## RTL و جهت

همه صفحات فعلی `lang="fa"` و `dir="rtl"` دارند. برای کد پیگیری، شماره‌ها و نوارهای قیمت، موارد `dir="ltr"` یا `text-left` نیز استفاده شده است.

کلاس‌های منطقی مانند `ms-auto`، `me-*`، `ps-*`، `pe-*` و `border-e` در کنار کلاس‌های فیزیکی مانند `ml-*`، `mr-*`، `pl-*`، `pr-*`، `text-right` و `text-left دیده می‌شوند. هنگام افزودن نسخه انگلیسی باید این دو گروه جداگانه بررسی شوند؛ تغییر `dir` به‌تنهایی همه رفتارهای جهت‌دار و آیکون‌های Arrow را اصلاح نمی‌کند.

## موارد صفحه‌ای و خارج از استاندارد مرکزی

- رنگ‌های Hex مستقیم، Radiusهای خاص مانند `rounded-[20px]` و اندازه‌های سفارشی در صفحات مختلف پراکنده‌اند.
- ساختار Header، Newsletter، Sidebar و کارت محصول در HTML تکرار شده و Component مشترک ندارند.
- منطق فیلتر محصولات در فایل جداگانه است، اما منطق فرم‌های محصول و خرید Inline است.
- ساختار URL زبان دوم، فونت انگلیسی و قرارداد نهایی LTR هنوز تعریف نشده‌اند.
