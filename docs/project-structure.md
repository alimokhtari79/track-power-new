# ساختار پروژه تراک پاور

این پروژه یک سایت استاتیک چندصفحه‌ای فارسی است. صفحات فعلی با `lang="fa"` و `dir="rtl"` نوشته شده‌اند. هیچ سیستم Template، Router یا فریم‌ورک JavaScript در پروژه ثبت نشده است.

## درخت فایل‌های مهم

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

`test` یک فایل HTML آزمایشی مستقل است و در دستورهای پروژه به‌عنوان تست یا ورودی Build استفاده نشده است.

## صفحات

صفحه اصلی در `index.html` است. صفحات عمومی عبارت‌اند از `FandQ.html`، `about-us.html`، `all-products.html`، `blog.html`، `contact.html`، `login.html`، `product.html` و `single-blog.html`.

صفحات حساب کاربری در `pages/Dashboard/` قرار دارند. نام `traucks.html` نام فعلی فایل است و در این مرحله تغییر نمی‌کند.

صفحات سبد خرید و پرداخت در `pages/shopnig-card/` قرار دارند. نام `shopnig-card` نیز نام فعلی پوشه است و نباید از روی حدس به `shopping-card` تغییر داده شود.

## CSS و Tailwind

- ورودی Tailwind: `src/styles/input.css`
- خروجی مورد استفاده صفحات: `dist/output.css`
- نسخه ثبت‌شده `tailwindcss` و `@tailwindcss/cli`: `4.3.3`

ورودی CSS با `@import 'tailwindcss'` شروع می‌شود و فونت‌ها، متغیرهای رنگ، `@theme`، Utilityهای سفارشی و Selectors مربوط به اسلایدر و فیلتر قیمت را نیز در خود دارد. صفحات HTML فقط خروجی `dist/output.css` را بارگذاری می‌کنند.

## JavaScript و وابستگی‌ها

`src/js/all-products.js` منطق فیلتر برند و قیمت، مرتب‌سازی، فیلتر موبایل و باز و بسته شدن بخش‌ها را در صفحه محصولات اجرا می‌کند.

`src/js/swiper-config.js` اسلایدر محصولات، اسلایدر پیشنهادها، تایمر و نوار پیشرفت را کنترل می‌کند. Swiper در `package.json` وابستگی npm نیست و در صفحات استفاده‌کننده از این منطق، نسخه 11 آن از jsDelivr CDN بارگذاری می‌شود. بخشی از منطق صفحات محصول و خرید نیز به‌صورت Inline داخل همان HTMLها نوشته شده است.

## دستورهای ثبت‌شده

```text
npm run dev
npm run format:tailwind
npm test
```

`npm run dev` دستور Watch زیر را اجرا می‌کند و ممکن است `dist/output.css` را تولید یا به‌روزرسانی کند:

```text
npx @tailwindcss/cli -i ./src/styles/input.css -o ./dist/output.css --watch
```

`npm run format:tailwind` با Prettier کل مسیر پروژه را هدف می‌گیرد. `npm test` تست واقعی ندارد و با پیام خطا خارج می‌شود. دستور Build تولیدی جداگانه در `package.json` ثبت نشده است.

## مسیرهای نسبی

- `index.html`: CSS در `./dist/output.css` و JavaScript در `./src/js/`.
- صفحات مستقیم داخل `pages/`: CSS و دارایی‌ها معمولاً با `../` به ریشه اشاره می‌کنند؛ JavaScript نیز `../src/js/` است.
- صفحات `pages/Dashboard/` و `pages/shopnig-card/`: CSS و دارایی‌ها معمولاً با `../../` به ریشه اشاره می‌کنند؛ JavaScript نیز `../../src/js/` است.

هنگام ایجاد یا جابه‌جایی صفحه، هر مسیر را از محل همان فایل محاسبه و وجود مقصد را بررسی کنید. در وضعیت فعلی، لینک `../index.html` در `pages/shopnig-card/cart.html`، `shipping.html` و `payment.html` به مقصد موجودی نمی‌رسد؛ این محدودیت در این مرحله اصلاح نشده است. تعداد زیادی `href="#"` نیز Placeholder هستند.

## محدودیت‌های فعلی

- CSS خروجی از CSS منبع جداست و دستور Build تولیدی مستقل ندارد.
- تست خودکار واقعی وجود ندارد.
- Swiper به CDN خارجی وابسته است.
- Header، Sidebar، Newsletter و برخی کارت‌ها در HTML صفحات تکرار شده‌اند و Component مشترکی ندارند.
- ساختار URL زبان‌محور برای نسخه انگلیسی هنوز تعریف نشده است.
