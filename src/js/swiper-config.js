const newProductMq = window.matchMedia('(min-width: 768px)');
let newProductSwiper = null;

function setupNewProductSlider() {
  const newProductSlider = document.querySelector('.new-product .swiper');

  if (newProductMq.matches && !newProductSwiper && newProductSlider) {
    // دسکتاپ: Swiper فعال
    newProductSwiper = new Swiper('.new-product .swiper', {
      slidesPerView: 5,
      spaceBetween: 20,
      navigation: {
        nextEl: '.new-btn-next',
        prevEl: '.new-btn-prev',
      },
      pagination: {
        el: '.new-dots',
        clickable: true,
      },
    });
  } else if (!newProductMq.matches && newProductSwiper) {
    newProductSwiper.destroy(true, true);
    newProductSwiper = null;
  }
}

setupNewProductSlider();
newProductMq.addEventListener('change', setupNewProductSlider);

const popularProductMq = window.matchMedia('(min-width: 768px)');
let popularProductSwiper = null;

function setupPopularProductSlider() {
  const popularProductSlider = document.querySelector('.popular-product .swiper');

  if (popularProductMq.matches && !popularProductSwiper && popularProductSlider) {
    // دسکتاپ: Swiper فعال
    popularProductSwiper = new Swiper('.popular-product .swiper', {
      slidesPerView: 5,
      spaceBetween: 20,
      navigation: {
        nextEl: '.popular-btn-next',
        prevEl: '.popular-btn-prev',
      },
      pagination: {
        el: '.popular-dots',
        clickable: true,
      },
    });
  } else if (!popularProductMq.matches && popularProductSwiper) {
    popularProductSwiper.destroy(true, true);
    popularProductSwiper = null;
  }
}

setupPopularProductSlider();
popularProductMq.addEventListener('change', setupPopularProductSlider);

const relatedArticlesMq = window.matchMedia('(min-width: 768px)');
let relatedArticlesSwiper = null;

function setupRelatedArticlesSlider() {
  const relatedArticlesSlider = document.querySelector('.related-articles .swiper');

  if (relatedArticlesMq.matches && !relatedArticlesSwiper && relatedArticlesSlider) {
    // دسکتاپ: Swiper فعال
    relatedArticlesSwiper = new Swiper('.related-articles .swiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: '.related-articles-next',
        prevEl: '.related-articles-prev',
      },
    });
  } else if (!relatedArticlesMq.matches && relatedArticlesSwiper) {
    relatedArticlesSwiper.destroy(true, true);
    relatedArticlesSwiper = null;
  }
}

setupRelatedArticlesSlider();
relatedArticlesMq.addEventListener('change', setupRelatedArticlesSlider);

// ---------- Swiper ----------
const PEEK = 18; // مقدار بیرون‌زدگی لبه کارت‌های پشتی (px)
const SCALE = 0.88; // باید با scale در CSS یکی باشد

// فاصله منفی => اسلایدها روی هم می‌افتند
const calcSpace = () => {
  const slide = document.querySelector('.deal-swiper .swiper-slide');

  if (!slide) return 0;

  const w = slide.offsetWidth;
  const offset = w / 2 + PEEK - (w * SCALE) / 2;

  return offset - w;
};

let dealSwiper = null;

if (document.querySelector('.deal-swiper')) {
  dealSwiper = new Swiper('.deal-swiper', {
    loop: true,
    loopAdditionalSlides: 4,
    initialSlide: 1,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: calcSpace(),
    grabCursor: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}

window.addEventListener('resize', () => {
  if (dealSwiper) {
    dealSwiper.params.spaceBetween = calcSpace();
    dealSwiper.update();
  }
});

// ---------- تایمر معکوس + نوار پیشرفت ----------
const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
const pad = (n) => String(n).padStart(2, '0');
const startedAt = Date.now();

function tick() {
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);

  document.querySelectorAll('.countdown').forEach((el) => {
    const total = Number(el.dataset.total);
    const remaining = Math.max(0, Number(el.dataset.seconds) - elapsed);

    el.textContent = toFa(`${pad(Math.floor(remaining / 60))}:${pad(remaining % 60)}`);

    const bar = el.closest('.swiper-slide')?.querySelector('.countdown-bar');

    if (bar && total > 0) {
      bar.style.width = `${(remaining / total) * 100}%`;
    }
  });
}

tick();
setInterval(tick, 1000);
