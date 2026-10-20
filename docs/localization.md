# راهنمای Localization نسخه انگلیسی

این سند قرارداد پیشنهادی برای افزودن نسخه انگلیسی سایت تراک پاور است. پروژه فعلی یک سایت استاتیک چندصفحه‌ای با HTML، Tailwind CSS نسخه 4.3.3 و Vanilla JavaScript است. صفحات فارسی در مسیرهای فعلی باقی می‌مانند و این سند هیچ صفحه انگلیسی را ایجاد یا کپی نمی‌کند.

## دامنه و ساختار فعلی

نسخه انگلیسی باید هر ۲۰ صفحه HTML فعلی را پوشش دهد: صفحه ریشه، ۸ صفحه عمومی، ۷ صفحه داشبورد و ۴ صفحه خرید و Checkout. هیچ Router، Template Engine، Framework یا سیستم ترجمه‌ای در پروژه ثبت نشده است. پیاده‌سازی انگلیسی باید همچنان با HTML مستقل، Tailwind موجود و Vanilla JavaScript انجام شود؛ افزودن Framework، Router، Translation Library یا وابستگی جدید نیازمند تصمیم جداگانه است.

## ساختار URL پیشنهادی

نسخه انگلیسی در پوشه ریشه‌ای `en/` قرار می‌گیرد و ساختار صفحات فارسی را با همان نام فایل‌ها و پسوند `.html` آینه می‌کند:

| صفحه فارسی | صفحه انگلیسی |
|---|---|
| `index.html` | `en/index.html` |
| `pages/FandQ.html` | `en/pages/FandQ.html` |
| `pages/about-us.html` | `en/pages/about-us.html` |
| `pages/all-products.html` | `en/pages/all-products.html` |
| `pages/blog.html` | `en/pages/blog.html` |
| `pages/contact.html` | `en/pages/contact.html` |
| `pages/login.html` | `en/pages/login.html` |
| `pages/product.html` | `en/pages/product.html` |
| `pages/single-blog.html` | `en/pages/single-blog.html` |
| `pages/Dashboard/account.html` | `en/pages/Dashboard/account.html` |
| `pages/Dashboard/addresses.html` | `en/pages/Dashboard/addresses.html` |
| `pages/Dashboard/dashboard.html` | `en/pages/Dashboard/dashboard.html` |
| `pages/Dashboard/favourite.html` | `en/pages/Dashboard/favourite.html` |
| `pages/Dashboard/order-detail.html` | `en/pages/Dashboard/order-detail.html` |
| `pages/Dashboard/tickets.html` | `en/pages/Dashboard/tickets.html` |
| `pages/Dashboard/traucks.html` | `en/pages/Dashboard/traucks.html` |
| `pages/shopnig-card/cart.html` | `en/pages/shopnig-card/cart.html` |
| `pages/shopnig-card/order-status.html` | `en/pages/shopnig-card/order-status.html` |
| `pages/shopnig-card/payment.html` | `en/pages/shopnig-card/payment.html` |
| `pages/shopnig-card/shipping.html` | `en/pages/shopnig-card/shipping.html` |

نام‌های `FandQ.html`، `traucks.html` و `shopnig-card/` در این قرارداد حفظ می‌شوند؛ اصلاح املای آن‌ها تصمیم مستقلی است. صفحات فارسی در مکان فعلی خود می‌مانند.

پوشه‌های `assets/`، `src/` و `dist/` فقط یک نسخه مشترک در ریشه دارند و داخل `en/` کپی نمی‌شوند. مسیرها باید نسبت به محل واقعی هر HTML محاسبه شوند:

| صفحه انگلیسی | CSS خروجی | دارایی‌ها و JavaScript |
|---|---|---|
| `en/index.html` | `../dist/output.css` | `../assets/...` و `../src/js/...` |
| `en/pages/about-us.html` | `../../dist/output.css` | `../../assets/...` و `../../src/js/...` |
| `en/pages/Dashboard/dashboard.html` | `../../../dist/output.css` | `../../../assets/...` و `../../../src/js/...` |
| `en/pages/shopnig-card/cart.html` | `../../../dist/output.css` | `../../../assets/...` و `../../../src/js/...` |

این مسیرها برای ساختار پیشنهادی هستند و هنگام ایجاد هر فایل باید با مقصد واقعی بررسی شوند. مسیرهای root-relative مانند `/assets/...` بدون دانستن روش Hosting الزام نیستند و ممکن است در اجرای مستقیم با `file://` رفتار متفاوتی داشته باشند.

## زبان و جهت صفحه

```html
<!-- فارسی -->
<html lang="fa" dir="rtl">

<!-- انگلیسی -->
<html lang="en" dir="ltr">
```

تغییر `dir` به‌تنهایی کافی نیست. در هر صفحه انگلیسی باید آیکون‌های Arrow، کلاس‌های فیزیکی `ml-*`، `mr-*`، `pl-*`، `pr-*`، `left-*` و `right-*`، `text-right` و `text-left`، `border-l` و `border-r`، `space-x-*`، `order-*`، `col-start-*`، Gridها، فرم‌ها، Sidebar، Swiper و Overrideهای داخلی `dir` جداگانه بازبینی شوند.

کلاس‌های منطقی موجود مانند `ms-*`، `me-*`، `ps-*`، `pe-*` و `border-e` در موارد مناسب برای هر دو زبان قابل استفاده‌اند. نباید بدون بررسی همه کلاس‌های فعلی با جایگزین‌های منطقی عوض شوند؛ برخی مقدارهای موجود بخشی از چیدمان صفحه خاص هستند. کد پیگیری، شماره تلفن، عدد یا نوار قیمت ممکن است حتی در صفحه انگلیسی به `dir="ltr"` داخلی نیاز داشته باشد.

## فونت و دارایی‌ها

در `src/styles/input.css` فونت `Peyda` با وزن‌های ۱۰۰ تا ۹۰۰ تعریف شده است. استفاده از Peyda برای انگلیسی هنوز تصمیم قطعی نیست. پیش از ساخت صفحات انگلیسی باید انتخاب شود که Peyda برای هر دو زبان استفاده شود یا فونت لاتین جداگانه با Fallback مناسب برای `lang="en"` تعریف شود. این تصمیم باید خوانایی حروف لاتین، وزن‌ها، ارتفاع خطوط و ظاهر اعداد را پوشش دهد.

دو اختلاف نام فایل واقعی و CSS ثبت شده است:

- CSS: `PeydaWeb-ExtraLight.woff2`؛ فایل موجود: `peydaWeb-extralight.woff2`
- CSS: `PeydaWeb-Light.woff2`؛ فایل موجود: `peydaWeb-light.woff2`

این اختلاف در سیستم‌فایل حساس به حروف می‌تواند بارگذاری فونت را مختل کند و در این مرحله اصلاح نمی‌شود. تصاویر، آیکون‌ها و فایل‌های CSS/JavaScript تا حد امکان مشترک می‌مانند. اگر آیکونی جهت‌دار یا تصویری دارای متن داخلی باشد، باید جداگانه ارزیابی شود. `alt` تصاویر باید برای هر زبان متن مناسب داشته باشد.

## Tailwind CSS و خروجی Build

- منبع CSS: `src/styles/input.css`
- خروجی تولیدشده: `dist/output.css`
- نسخه `tailwindcss` و `@tailwindcss/cli`: `4.3.3`
- دستور فعلی Watch: `npm run dev`

`dist/output.css` فایل تولیدی است و نباید مستقیم ویرایش شود. با اضافه شدن `en/`، فرایند Tailwind باید کلاس‌های صفحات انگلیسی را نیز شناسایی کند. قبل از پیاده‌سازی باید Source Detection فعلی Tailwind v4 و محدوده فایل‌های اسکن‌شده تأیید شود؛ نباید فرض کرد خروجی موجود همه کلاس‌های جدید را دارد. Build باید کلاس‌های استفاده‌شده در هر دو درخت فارسی و انگلیسی را حفظ کند. در این مرحله Build یا تغییر تنظیمات Tailwind انجام نمی‌شود.

## JavaScript و رفتار وابسته به زبان

### فیلتر محصولات

`src/js/all-products.js` از `new Intl.NumberFormat('fa-IR')` استفاده می‌کند، ارقام فارسی را با Regex به عدد تبدیل می‌کند و متن دکمه فیلتر را به فارسی تولید می‌کند (`مشاهده ... محصول`). در نسخه انگلیسی Formatter، تبدیل ورودی، جداکننده هزارگان، متن دکمه و واحد قیمت باید زبان‌محور شوند. منطق عددی باید داده‌های موجود محصول و ورودی‌های لاتین را درست مدیریت کند.

### Swiper و تایمر

`src/js/swiper-config.js` تایمر را با تابع `toFa` به ارقام فارسی تبدیل می‌کند و در صفحات فعلی با `dir="rtl"`، آیکون‌های جهت‌دار، `centeredSlides`، `loop`، `autoplay` و اسکرول افقی موبایل کار می‌کند. در انگلیسی نمایش اعداد، جهت اسلاید، drag، navigation، pagination و حرکت بخش Reviews باید بررسی شوند. Swiper نسخه ۱۱ از CDN بارگذاری می‌شود و در `package.json` وابستگی npm نیست.

### JavaScript Inline

- `pages/product.html`: تعویض تصویر اصلی با کلیک روی Thumbnail؛ منطق زبانی نیست، اما مسیر تصاویر و وضعیت Ring باید بررسی شود.
- `pages/shopnig-card/shipping.html`: روش ارسال، قیمت، زمان‌ها و توضیحات را با Template String تولید می‌کند و متن‌های فارسی را داخل JavaScript دارد. داده متن انگلیسی باید جدا و قابل نگهداری باشد.
- `pages/shopnig-card/payment.html`: پیام انتقال به درگاه فارسی Hardcode شده است.
- `pages/shopnig-card/cart.html`: منطق تعداد و حذف متن‌محور نیست، اما واحد قیمت و Empty State باید ترجمه شوند.

روش پیشنهادی بدون وابستگی جدید این است که متن‌ها و Formatterهای زبان‌محور در یک آبجکت ساده در ابتدای اسکریپت یا فایل JavaScript مشترک موجود نگه داشته شوند، زبان از `document.documentElement.lang` خوانده شود و Formatter عدد/تاریخ بر اساس آن انتخاب شود. DOM و Selectorهای مشترک حفظ شوند و متن‌های Dynamic از Template Stringهای پراکنده جدا بمانند.

## قواعد ترجمه و بومی‌سازی

همه موارد زیر باید ترجمه و بازبینی شوند: `<title>`، Breadcrumb، Navigation، Heading، توضیحات، CTA، Label، Placeholder، Validation، Empty State، وضعیت موفقیت/خطا، نام و توضیحات و مشخصات محصول، برند و فیلترها، وضعیت سفارش و تیکت، متن حمل‌ونقل و پرداخت، Newsletter، FAQ، `alt` تصاویر و متن‌های قابل دسترس برای Screen Reader.

ترجمه باید طبیعی و متناسب با اصطلاحات قطعات خودروهای سنگین باشد؛ ترجمه تحت‌اللفظی اصطلاحات فنی بدون بررسی واژگان محصول مجاز نیست.

برای نسخه انگلیسی باید پیش از پیاده‌سازی تصمیم گرفته شود:

- اعداد لاتین یا قالب دیگری نمایش داده شوند.
- واحد `تومان` حفظ شود یا واحد دیگری نمایش داده شود.
- جداکننده هزارگان چه باشد.
- تاریخ شمسی حفظ شود یا میلادی شود.
- ساعت ۱۲ یا ۲۴ ساعته باشد.

تا زمان تصمیم مستقل، داده و معنای تجاری فعلی محصولات و قیمت‌ها حفظ می‌شود. شماره تلفن، کد پیگیری، کد OEM و مقادیر ترکیبی باید با `dir="ltr"` یا Container مناسب بررسی شوند.

## Language Switcher

هر صفحه انگلیسی باید به صفحه فارسی متناظر و هر صفحه فارسی، در صورت وجود نسخه انگلیسی، به مسیر متناظر در `en/` لینک شود. نگاشت بر اساس مسیر کامل صفحه است:

- `index.html` ↔ `en/index.html`
- `pages/about-us.html` ↔ `en/pages/about-us.html`
- `pages/Dashboard/dashboard.html` ↔ `en/pages/Dashboard/dashboard.html`
- `pages/shopnig-card/cart.html` ↔ `en/pages/shopnig-card/cart.html`

Fragmentهایی مانند `#products` باید حفظ شوند. Query Parameterها نباید بدون تصمیم مستقل حذف یا ترجمه شوند. اگر صفحه متناظر هنوز ایجاد نشده، لینک به مقصد ناموجود اضافه نشود. مسیر لینک باید از محل همان HTML محاسبه شود. لینک `/` در `pages/login.html` به ریشه وب‌سرور وابسته است و باید در مدل انتشار بررسی شود.

## SEO و انتشار

صفحات فعلی اطلاعات پایه مانند `charset`، `viewport` و `<title>` دارند، اما `description`، `canonical` و `hreflang` ندارند. برای انتشار دو زبانه، هر صفحه در آینده به `<title>` و `meta description` مستقل، Canonical همان URL، `hreflang="fa"`، `hreflang="en"` و در صورت نیاز `x-default` نیاز دارد. Sitemap باید URLهای هر دو زبان را پوشش دهد و Open Graph در صورت نیاز محصول اضافه شود.

دامنه Production، URL نهایی Canonical و مقدار `x-default` هنوز مشخص نشده‌اند و نباید حدس زده شوند. `hreflang` فقط بین صفحات واقعاً متناظر قرار گیرد؛ صفحه ترجمه‌نشده نباید مقصد اعلام شود.

## نگهداری صفحات مشترک

Header، Newsletter، Sidebar و Product Card در HTML تکرار شده‌اند و Component یا Template مشترک ندارند. تا تصمیم بعدی:

1. ساختار DOM و Selectorهای دو نسخه تا حد امکان یکسان بماند.
2. CSS، تصاویر، آیکون‌ها و اسکریپت‌های عمومی مشترک بمانند.
3. تغییرات مشترک در Header، Sidebar و فرم‌ها با چک‌لیست در هر دو نسخه اعمال و بررسی شوند.
4. متن و داده زبان‌محور از Layout ثابت جدا نگه داشته شود.
5. هیچ `assets/`، `src/` یا `dist/` داخل `en/` ایجاد نشود.

این قرارداد به معنای ایجاد سیستم Template جدید نیست؛ برای پروژه فعلی، کپی کنترل‌شده HTML با نگاشت ثبت‌شده از افزودن Runtime یا Framework کم‌ریسک‌تر است.

## ترتیب پیشنهادی پیاده‌سازی

### فاز ۱: تثبیت قرارداد

تأیید `/en/` و نگاشت ۲۰ صفحه، تصمیم فونت، اعداد، تاریخ، قیمت، Hosting، دامنه Canonical/hreflang و Source Detection Tailwind.

### فاز ۲: صفحه نمونه

ابتدا `pages/about-us.html` به `en/pages/about-us.html` تبدیل شود. این صفحه Layout عمومی، Breadcrumb، دارایی تصویری، Newsletter، `lang`/`dir`، Typography و Language Switcher را برای اعتبارسنجی پوشش می‌دهد. سپس `contact.html` برای فرم و `all-products.html` برای JavaScript بررسی شوند.

### فاز ۳: صفحات عمومی

`FandQ.html`، `contact.html`، `blog.html`، `single-blog.html` و `login.html`.

### فاز ۴: محصولات

`all-products.html` و سپس `product.html`؛ شامل Formatter، Filter، Sort، قیمت، Gallery، جدول مشخصات و اسلایدر.

### فاز ۵: داشبورد

ابتدا `dashboard.html`، سپس `account.html` و `addresses.html`، بعد `favourite.html`، `tickets.html`، `order-detail.html` و `traucks.html`.

### فاز ۶: خرید و Checkout

به‌ترتیب جریان: `cart.html`، `shipping.html`، `payment.html` و `order-status.html`. متن‌های Dynamic ارسال و پرداخت، واحد قیمت، فرم‌ها و مسیر مراحل باید با فارسی تطبیق داده شوند.

### فاز ۷: لینک زبان و اعتبارسنجی

لینک رفت‌وبرگشت، Fragment و Query Parameter، مسیرهای داخلی، لینک‌های Checkout و نبود مقصد ناموجود بررسی شوند؛ سپس هر ۲۰ صفحه در موبایل و دسکتاپ آزمون شوند.

## چک‌لیست تأیید نسخه انگلیسی

### بررسی‌های محلی

- [ ] هر ۲۰ مسیر انگلیسی وجود دارد و صفحات فارسی در مسیر فعلی باقی مانده‌اند.
- [ ] هر صفحه `lang="en"` و `dir="ltr"` دارد.
- [ ] مسیر CSS، JavaScript، تصویر، آیکون و فونت از عمق واقعی درست است.
- [ ] پوشه‌های `assets/`، `src/` و `dist/` داخل `en/` تکرار نشده‌اند.
- [ ] نام‌های `FandQ.html`، `traucks.html` و `shopnig-card/` حفظ شده‌اند.
- [ ] لینک‌های داخلی، Anchorها و Language Switcher معتبرند.
- [ ] لینک‌های خراب شناخته‌شده و Placeholderها گزارش یا تعیین تکلیف شده‌اند.
- [ ] متن یا عدد فارسی ناخواسته باقی نمانده است.
- [ ] Title، Label، Placeholder، Alt، پیام خطا و Empty State ترجمه شده‌اند.
- [ ] Formatter قیمت، عدد، تاریخ، تلفن و کد پیگیری بررسی شده است.
- [ ] فیلتر برند، فیلتر قیمت، Sort و شمارش محصولات کار می‌کند.
- [ ] Thumbnail محصول، فرم‌ها و تعاملات Inline کار می‌کنند.
- [ ] Swiper، pagination، navigation، drag و تایمر بررسی شده‌اند.
- [ ] جریان Cart → Shipping → Payment → Order Status کار می‌کند.
- [ ] فرم‌های تماس، لاگین، حساب، آدرس و تیکت بررسی شده‌اند.
- [ ] Layout در موبایل و دسکتاپ بررسی شده است.
- [ ] کلاس‌های جهت‌محور و Overrideهای داخلی `dir` بازبینی شده‌اند.

### بررسی‌های وابسته به Hosting

- [ ] URLهای `/en/` با پسوند `.html` در Hosting واقعی سرو می‌شوند.
- [ ] مسیرهای نسبی در دامنه و زیرمسیر واقعی درست resolve می‌شوند.
- [ ] CDN مربوط به Swiper در محیط واقعی در دسترس است.
- [ ] فونت‌ها با حساسیت حروف واقعی سرور بارگذاری می‌شوند.
- [ ] Canonical و `hreflang` با دامنه واقعی ساخته شده‌اند.
- [ ] Sitemap هر دو زبان منتشر شده است.
- [ ] Metadata در ابزارهای Crawling و اشتراک‌گذاری بررسی شده است.
- [ ] لینک‌های واقعی و 404های سرور پس از Deploy بررسی شده‌اند.

این فایل فقط قرارداد و الزامات Localization را تعریف می‌کند. ایجاد صفحات انگلیسی، اصلاح لینک‌های خراب، تغییر فونت، CSS/JavaScript و تصمیم‌های باز محصولی باید در وظایف جداگانه انجام شوند.
