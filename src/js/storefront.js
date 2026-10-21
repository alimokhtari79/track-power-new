(() => {
  const root = new URL('../../', document.currentScript.src);
  const asset = (path) => new URL(path, root).href;
  const en = document.documentElement.lang === 'en';
  const lang = en ? 'en' : 'fa';
  const number = new Intl.NumberFormat(en ? 'en-US' : 'fa-IR');
  const text = en ? {
    cart: 'Shopping cart', yourCart: 'Your shopping cart', items: 'items', checkout: 'Place order',
    empty: 'Your cart is empty.', browse: 'Browse products', increase: 'Increase quantity', decrease: 'Decrease quantity',
    remove: 'Remove item', language: 'Select language', missing: 'English translation unavailable',
    home: 'Home', categories: 'Categories (FA)', profile: 'Profile', login: 'Sign in / Register',
    currency: 'toman', total: 'Total', quantity: 'Quantity',
  } : {
    cart: 'سبد خرید', yourCart: 'سبد خرید شما', items: 'کالا', checkout: 'ثبت سفارش',
    empty: 'سبد خرید شما خالی است.', browse: 'مشاهده محصولات', increase: 'افزایش تعداد', decrease: 'کاهش تعداد',
    remove: 'حذف محصول', language: 'انتخاب زبان', missing: 'ترجمهٔ انگلیسی موجود نیست',
    home: 'خانه', categories: 'دسته‌بندی‌ها', profile: 'پروفایل', login: 'ورود و ثبت نام',
    currency: 'تومان', total: 'جمع کل', quantity: 'تعداد',
  };
  const routes = {
    "index.html": {
      "fa": "index.html",
      "en": "en/index.html"
    },
    "pages/blog.html": {
      "fa": "pages/blog.html",
      "en": "en/pages/blog.html"
    },
    "pages/product.html": {
      "fa": "pages/product.html",
      "en": "en/pages/product.html"
    },
    "pages/all-products.html": {
      "fa": "pages/all-products.html",
      "en": "en/pages/all-products.html"
    },
    "pages/contact.html": {
      "fa": "pages/contact.html",
      "en": "en/pages/contact.html"
    },
    "pages/login.html": {
      "fa": "pages/login.html",
      "en": "en/pages/Login.html"
    },
    "pages/about-us.html": {
      "fa": "pages/about-us.html",
      "en": "en/pages/about-us.html"
    },
    "pages/FandQ.html": {
      "fa": "pages/FandQ.html",
      "en": "en/pages/FandQ.html"
    },
    "pages/single-blog.html": {
      "fa": "pages/single-blog.html",
      "en": "en/pages/single-blog.html"
    },
    "pages/categories.html": {
      "fa": "pages/categories.html",
      "en": null
    },
    "pages/shopnig-card/payment.html": {
      "fa": "pages/shopnig-card/payment.html",
      "en": "en/pages/shopnig-card/payment.html"
    },
    "pages/shopnig-card/shipping.html": {
      "fa": "pages/shopnig-card/shipping.html",
      "en": "en/pages/shopnig-card/shipping.html"
    },
    "pages/shopnig-card/cart.html": {
      "fa": "pages/shopnig-card/cart.html",
      "en": "en/pages/shopnig-card/cart.html"
    },
    "pages/shopnig-card/order-status.html": {
      "fa": "pages/shopnig-card/order-status.html",
      "en": "en/pages/shopnig-card/order-status.html"
    },
    "pages/Dashboard/favourite.html": {
      "fa": "pages/Dashboard/favourite.html",
      "en": "en/pages/Dashboard/favourite.html"
    },
    "pages/Dashboard/traucks.html": {
      "fa": "pages/Dashboard/traucks.html",
      "en": "en/pages/Dashboard/traucks.html"
    },
    "pages/Dashboard/order-detail.html": {
      "fa": "pages/Dashboard/order-detail.html",
      "en": "en/pages/Dashboard/order-detail.html"
    },
    "pages/Dashboard/tickets.html": {
      "fa": "pages/Dashboard/tickets.html",
      "en": "en/pages/Dashboard/tickets.html"
    },
    "pages/Dashboard/dashboard.html": {
      "fa": "pages/Dashboard/dashboard.html",
      "en": "en/pages/Dashboard/dashboard.html"
    },
    "pages/Dashboard/account.html": {
      "fa": "pages/Dashboard/account.html",
      "en": "en/pages/Dashboard/account.html"
    },
    "pages/Dashboard/addresses.html": {
      "fa": "pages/Dashboard/addresses.html",
      "en": "en/pages/Dashboard/addresses.html"
    }
  };
  const current = decodeURI(location.pathname).slice(decodeURI(root.pathname).length) || 'index.html';
  const entry = Object.values(routes).find((route) => route.fa === current || route.en === current);
  const isHome = current === 'index.html' || current === 'en/index.html';
  const isCart = current.endsWith('/shopnig-card/cart.html');
  const isCategories = current === 'pages/categories.html';
  const route = (path) => asset(routes[path]?.[lang] || path);
  const money = (value) => `${number.format(value)} ${text.currency}`;
  const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = (name) => `<img src="${asset(`assets/icons/${name}.svg`)}" width="24" height="24" alt="">`;
  let storage = null;
  try { storage = window.sessionStorage; } catch { /* Storage may be blocked or unavailable on file URLs. */ }
  const cart = window.TrakCart.createCart(storage);
  const product = cart.snapshot().product;
  const desktop = matchMedia('(min-width: 768px)');
  const languageIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M6 8h12M12 5v3M9 8c.5 4 3 7 6 9M15 8c-.5 4-3 7-6 9"/></svg>';

  function languageURL(target) {
    if (!entry?.[target]) return null;
    const destination = new URL(entry[target], root);
    destination.search = location.search;
    destination.hash = location.hash;
    return destination.href;
  }
  function languageMarkup() {
    return `<summary aria-label="${text.language}">${languageIcon}<span>${en ? 'English' : 'فارسی'}</span></summary><div class="commerce-language__options">${['fa','en'].map((target) => {
      const href = languageURL(target);
      const label = target === 'fa' ? 'فارسی' : 'English';
      const inner = `<span class="commerce-flag" aria-hidden="true">${target === 'fa' ? '🇮🇷' : '🇺🇸'}</span><span lang="${target}">${label}</span>`;
      return href ? `<a href="${escape(href)}" hreflang="${target}" lang="${target}" ${target === lang ? 'aria-current="true"' : ''}>${inner}</a>` : `<span class="commerce-language__unavailable" aria-disabled="true" title="${text.missing}">${inner}</span>`;
    }).join('')}</div>`;
  }
  // Retain the existing details node so the homepage drawer's handlers stay valid.
  let language = document.querySelector('[data-header-language]');
  if (!language) language = document.createElement('details');
  language.classList.add('commerce-language');
  language.innerHTML = languageMarkup();
  let actions = document.querySelector('.homepage-header__actions');
  if (isHome) {
    if (!actions) {
      actions = document.createElement('div');
      actions.className = 'commerce-actions';
      const header = document.querySelector('body > header');
      header.classList.add('commerce-header');
      const brand = document.createElement('a');
      brand.href = route('index.html');
      brand.textContent = en ? 'Trak Power' : 'تراک پاور';
      brand.className = 'commerce-brand';
      header.prepend(brand);
      header.append(actions);
    }
    actions.classList.add('commerce-actions');
    if (!language.isConnected) actions.prepend(language);
    if (!actions.querySelector('.homepage-header__account')) {
      const account = document.createElement('a');
      account.className = 'commerce-account';
      account.href = route('pages/login.html');
      account.innerHTML = `${icon('user')}<span>${text.login}</span>`;
      actions.append(account);
    }
  } else {
    const existing = document.querySelector('a[hreflang]');
    if (existing) existing.replaceWith(language);
    else {
      const row = document.createElement('div');
      row.className = 'commerce-language-row';
      row.append(language);
      (document.querySelector('[data-cart-heading]') || document.querySelector('main') || document.body).prepend(row);
    }
  }
  const languages = [language];
  // The existing mobile drawer uses links, not another popup.
  function updateLanguageLinks() {
    document.querySelectorAll('a[hreflang]').forEach((link) => {
      const destination = languageURL(link.hreflang);
      if (destination) link.href = destination;
    });
  }
  updateLanguageLinks();
  window.addEventListener('hashchange', updateLanguageLinks);
  language.addEventListener('toggle', () => { if (language.open) closeCart(); });

  function priceMarkup() {
    const percent = new Intl.NumberFormat(en ? 'en-US' : 'fa-IR', {maximumFractionDigits: 1}).format((1 - product.price / product.originalPrice) * 100);
    return `<div class="commerce-price"><div class="commerce-price__previous"><del data-cart-original></del><span>${percent}${en ? '%' : '٪'}</span></div><strong data-cart-total></strong></div>`;
  }
  function itemMarkup() {
    return `<article class="commerce-item" data-cart-item>
      <div class="commerce-item__picture"><img src="${asset(product.image)}" alt="" width="110" height="110"><img class="commerce-item__brand" src="${asset(product.badge)}" alt="MAN" width="30" height="22"></div>
      <div class="commerce-item__description"><h2><a href="${route('pages/product.html')}">${product.name[lang]}</a></h2><p>${product.brand[lang]} <bdi>${product.id}</bdi></p></div>
      <div class="commerce-quantity" role="group" aria-label="${text.quantity}"><button type="button" data-cart-action="decrease" aria-label="${text.decrease}">−</button><output data-cart-quantity></output><button type="button" data-cart-action="increase" aria-label="${text.increase}">+</button></div>
      <div class="commerce-item__price">${priceMarkup()}</div>
      <button type="button" class="commerce-remove" data-cart-action="remove" aria-label="${text.remove}">${icon('delete-01')}</button>
    </article>`;
  }
  function cartMarkup(preview) {
    return `${preview ? `<div class="commerce-cart__heading"><a href="${route('pages/shopnig-card/cart.html')}">${text.yourCart}</a><span data-cart-item-count></span></div>` : ''}
      <div class="commerce-cart__items">${itemMarkup()}</div>
      <div class="commerce-empty" data-cart-empty hidden><p>${text.empty}</p><a href="${route('pages/all-products.html')}">${text.browse}</a></div>
      <div class="commerce-checkout" data-cart-checkout><div aria-label="${text.total}">${priceMarkup()}</div><a class="commerce-checkout__button" href="${route('pages/shopnig-card/shipping.html')}">${text.checkout}</a></div>`;
  }
  let cartTrigger;
  let preview;
  function closeCart(focus = false) {
    if (!preview || preview.hidden) return;
    preview.hidden = true;
    cartTrigger.setAttribute('aria-expanded', 'false');
    if (focus) cartTrigger.focus();
  }
  if (isHome) {
    const wrapper = document.createElement('div');
    wrapper.className = 'commerce-cart';
    wrapper.innerHTML = `<button class="commerce-cart__trigger" type="button" aria-expanded="false" aria-controls="cart-preview"><span data-cart-count></span><span>${icon('shopping-cart-01')}</span></button><section id="cart-preview" class="commerce-cart__preview" aria-label="${text.yourCart}" hidden>${cartMarkup(true)}</section>`;
    const oldCart = actions.querySelector('.homepage-header__cart');
    if (oldCart) oldCart.replaceWith(wrapper); else actions.append(wrapper);
    cartTrigger = wrapper.querySelector('button');
    preview = wrapper.querySelector('#cart-preview');
    cartTrigger.addEventListener('click', () => {
      if (!desktop.matches) { location.href = route('pages/shopnig-card/cart.html'); return; }
      if (!preview.hidden) { closeCart(); return; }
      language.open = false;
      preview.hidden = false;
      cartTrigger.setAttribute('aria-expanded', 'true');
    });
  }
  if (isCart) document.querySelector('[data-cart-view]').innerHTML = cartMarkup(false);

  // The bottom navigation is shared with categories; never create a second bar.
  if (isHome || isCart || isCategories) {
    const icons = {
      home: '<path d="m3 10 7-6a3 3 0 0 1 4 0l7 6v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"/><path d="M12 15v4"/>',
      categories: '<rect x="2" y="2" width="8" height="8" rx="2.5"/><rect x="14" y="2" width="8" height="8" rx="2.5"/><rect x="2" y="14" width="8" height="8" rx="2.5"/><rect x="14" y="14" width="8" height="8" rx="2.5"/>',
      cart: '<path d="M2 8h20l-3 12a2 2 0 0 1-2 1H7a2 2 0 0 1-2-1L2 8Zm5 0 3-6m7 6-3-6M9 12h6"/>',
      profile: '<circle cx="12" cy="7" r="5"/><path d="M3 22a9 9 0 0 1 18 0"/>',
    };
    const bottom = document.createElement('nav');
    bottom.className = 'category-bottom-nav commerce-bottom-nav';
    bottom.setAttribute('aria-label', en ? 'Bottom navigation' : 'ناوبری پایین صفحه');
    const active = isCart ? 'cart' : isCategories ? 'categories' : 'home';
    bottom.innerHTML = [['home', 'index.html'], ['categories', 'pages/categories.html'], ['cart', 'pages/shopnig-card/cart.html'], ['profile', 'pages/Dashboard/dashboard.html']].map(([id, path]) => `<a href="${route(path)}" ${id === active ? 'aria-current="page"' : ''} ${id === 'cart' ? 'data-cart-link' : ''}><svg viewBox="0 0 24 24" fill="${id === active && (id === 'categories' || id === 'cart') ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[id]}</svg><span>${text[id]}</span></a>`).join('');
    document.body.append(bottom);
    document.body.classList.add('has-category-navigation');
  }

  const announcement = document.createElement('span');
  announcement.className = 'sr-only';
  announcement.setAttribute('role', 'status');
  document.body.append(announcement);
  function render(state, announce = false) {
    document.querySelectorAll('[data-cart-count], [data-cart-quantity]').forEach((el) => { el.textContent = number.format(state.quantity); });
    document.querySelectorAll('[data-cart-item-count]').forEach((el) => { el.textContent = `${number.format(state.quantity)} ${text.items}`; });
    document.querySelectorAll('[data-cart-total]').forEach((el) => { el.textContent = money(state.subtotal); });
    document.querySelectorAll('[data-cart-original]').forEach((el) => { el.textContent = money(state.originalTotal); });
    document.querySelectorAll('[data-cart-item], [data-cart-checkout]').forEach((el) => { el.hidden = state.quantity === 0; });
    document.querySelectorAll('[data-cart-empty]').forEach((el) => { el.hidden = state.quantity !== 0; });
    document.querySelectorAll('[data-cart-link]').forEach((el) => { el.setAttribute('aria-label', `${text.cart}, ${number.format(state.quantity)} ${text.items}`); });
    if (cartTrigger) cartTrigger.setAttribute('aria-label', `${text.cart}, ${number.format(state.quantity)} ${text.items}`);
    if (announce) announcement.textContent = `${text.cart}: ${number.format(state.quantity)} ${text.items}, ${money(state.subtotal)}`;
  }
  cart.subscribe((state) => render(state, true));
  render(cart.snapshot());
  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-cart-action]');
    if (action) {
      const quantity = cart.snapshot().quantity;
      cart.setQuantity(action.dataset.cartAction === 'remove' ? 0 : Math.max(0, quantity + (action.dataset.cartAction === 'increase' ? 1 : -1)));
      if (cart.snapshot().quantity === 0) action.closest('.commerce-cart__preview, [data-cart-view]')?.querySelector('[data-cart-empty] a')?.focus();
    }
    if (preview && !preview.hidden && !event.target.closest('.commerce-cart')) closeCart();
    languages.forEach((control) => { if (control.open && !control.contains(event.target)) control.open = false; });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeCart(true);
    languages.forEach((control) => { if (control.open) { control.open = false; control.querySelector('summary').focus(); } });
  });
  document.addEventListener('focusin', (event) => {
    if (preview && !preview.hidden && !event.target.closest('.commerce-cart')) closeCart();
    languages.forEach((control) => { if (control.open && !control.contains(event.target)) control.open = false; });
  });
  desktop.addEventListener('change', () => { closeCart(); language.open = false; });
  window.addEventListener('pageshow', () => {
    // Refresh snapshots restored by the back/forward cache from the same session store.
    const restored = storage ? window.TrakCart.createCart(storage).snapshot() : cart.snapshot();
    cart.setQuantity(restored.quantity);
    closeCart(); language.open = false; updateLanguageLinks();
  });
})();
