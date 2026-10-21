(() => {
  // One hierarchy drives both the desktop columns and the mobile accordions.
  const script = document.currentScript;
  const root = new URL('../../', script.src);
  const url = (path) => new URL(path, root).href;
  const products = url('pages/all-products.html#products');
  const groups = [
    ['سیستم باد و پنوماتیک', ['کمپرسور کامل', 'کیت تعمیر کمپرسور', 'پیستون و رینگ کمپرسور', 'سوپاپ کمپرسور', 'سرسیلندر کمپرسور', 'واشر و اورینگ کمپرسور', 'متعلقات کمپرسور']],
    ['خشک‌کن هوا (Air Dryer)', ['خشک‌کن کامل', 'کارتریج خشک‌کن', 'شیر خشک‌کن', 'کیت تعمیر خشک‌کن', 'سوپاپ خشک‌کن', 'رطوبت‌گیر و متعلقات']],
    ['مخازن باد', ['مخزن باد اصلی', 'مخزن مدار ترمز', 'مخزن تعلیق', 'مخزن کمکی', 'شیر تخلیه مخزن', 'پایه و بست مخزن']],
    ['شیرهای پنوماتیک', ['شیر چهارمداره', 'شیر محافظ فشار', 'شیر کنترل فشار', 'شیر محدودکننده فشار', 'شیر یک‌طرفه', 'شیر تخلیه', 'شیر رله', 'شیر سریع', 'شیر ترمز', 'شیر دستی', 'شیر برقی پنوماتیک']],
    ['شیرهای ترمز و سیستم EBS/ABS', ['شیر EBS', 'شیر ABS', 'شیر رله EBS', 'شیر کنترل تریلر', 'شیر ترمز پایی', 'شیر ترمز دستی', 'شیر کنترل فشار ترمز']],
    ['لوله و شیلنگ باد', ['شیلنگ باد', 'لوله پنوماتیک', 'شیلنگ فنری', 'شیلنگ ترمز', 'اتصالات لوله باد']],
  ];
  const categories = [
    ['brakes', 'سیستم ترمز'], ['transmission', 'گیربکس و کلاچ'],
    ['steering', 'فرمان و هیدرولیک'], ['air', 'سیستم باد و پنوماتیک', groups],
    ['engine', 'قطعات موتور'], ['electrical', 'برق و الکترونیک'],
    ['body', 'کابین و بدنه'], ['filters', 'فیلترها و قطعات مصرفی'],
  ];
  const isPage = document.body.hasAttribute('data-categories-page');
  const desktop = matchMedia('(min-width: 768px)');
  const chevron = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 10 4 4 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const arrow = `<img src="${url('assets/icons/arrow-left.svg')}" width="20" height="20" alt="">`;
  let selected = location.hash.slice(1);
  if (!categories.some(([id]) => id === selected)) selected = 'air';
  let trigger;
  let overlay;

  const navigation = document.createElement('nav');
  navigation.className = 'category-navigation';
  navigation.setAttribute('aria-label', 'دسته‌بندی قطعات');
  navigation.innerHTML = `
    <div class="category-tabs" role="tablist" aria-label="دسته‌های اصلی">${categories.map(([id, label]) => `
      <button type="button" role="tab" id="category-tab-${id}" data-category="${id}" aria-controls="category-panel" aria-selected="false" tabindex="-1">${label}</button>`).join('')}
    </div>
    <div class="category-panel" id="category-panel" role="tabpanel" tabindex="0">
      <div class="category-content"></div>
      <aside class="category-promotion" aria-label="قطعات تراک پاور">
        <p>از ریزترین تا<br><strong>درشت‌ترین قطعات</strong></p>
        <p class="category-promotion__description">از کوچک‌ترین پیچ تا بزرگ‌ترین قطعات<br>را از ما بخواهید.</p>
        <img class="category-promotion__image" src="${url('assets/images/Screw-image.png')}" alt="" width="353" height="351">
        <a href="${products}">مشاهده محصولات ${arrow}</a>
      </aside>
    </div>`;
  const content = navigation.querySelector('.category-content');
  const tabs = [...navigation.querySelectorAll('[role="tab"]')];
  const panel = navigation.querySelector('[role="tabpanel"]');

  function render() {
    const [, label, children = []] = categories.find(([id]) => id === selected);
    tabs.forEach((tab) => {
      const active = tab.dataset.category === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    navigation.querySelector('[role="tablist"]').setAttribute('aria-orientation', desktop.matches ? 'horizontal' : 'vertical');
    panel.setAttribute('aria-labelledby', `category-tab-${selected}`);
    const all = `<a class="category-all" href="${products}">همه محصولات ${label}${chevron}</a>`;
    content.innerHTML = all + (desktop.matches
      ? `<div class="category-columns">${children.map(([heading, items]) => `<h3>${heading}</h3>${items.map((item) => `<a href="${products}">${item}</a>`).join('')}`).join('')}</div>`
      : `<div class="category-accordions">${children.map(([heading, items], index) => `<details ${index === 0 ? 'open' : ''}><summary>${heading}${chevron}</summary><ul>${items.map((item) => `<li><a href="${products}">${item}</a></li>`).join('')}</ul></details>`).join('')}</div>`);
  }

  function select(tab, focus = false) {
    selected = tab.dataset.category;
    render();
    if (isPage) history.replaceState(null, '', `#${selected}`);
    if (focus) tab.focus();
  }
  tabs.forEach((tab) => tab.addEventListener('click', () => select(tab)));
  navigation.querySelector('[role="tablist"]').addEventListener('keydown', (event) => {
    const ordered = desktop.matches ? tabs : [...tabs].reverse();
    const index = ordered.indexOf(document.activeElement);
    if (index === -1) return;
    let next;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = ordered.length - 1;
    if (event.key === (desktop.matches ? 'ArrowLeft' : 'ArrowDown')) next = (index + 1) % ordered.length;
    if (event.key === (desktop.matches ? 'ArrowRight' : 'ArrowUp')) next = (index - 1 + ordered.length) % ordered.length;
    if (next !== undefined) { event.preventDefault(); select(ordered[next], true); }
  });

  function close(focus = false) {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (focus) trigger.focus();
  }
  if (isPage) {
    document.querySelector('[data-category-interface]').append(navigation);
  } else {
    const existing = document.querySelector('.homepage-header__categories');
    trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = `${existing?.className || ''} category-trigger`;
    trigger.innerHTML = `<img src="${url('assets/icons/menu-square.svg')}" width="24" height="24" alt=""><span>دسته‌بندی‌ها</span>`;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'category-mega-menu');
    if (existing) existing.replaceWith(trigger);
    else document.querySelector('header')?.append(trigger);
    overlay = document.createElement('div');
    overlay.className = 'category-overlay';
    overlay.id = 'category-mega-menu';
    overlay.hidden = true;
    overlay.append(navigation);
    document.body.append(overlay);
    trigger.addEventListener('click', () => {
      if (!desktop.matches) { location.href = url('pages/categories.html'); return; }
      if (!overlay.hidden) { close(); return; }
      const language = document.querySelector('[data-header-language]');
      if (language) language.open = false;
      const bottom = document.querySelector('header').getBoundingClientRect().bottom;
      overlay.style.setProperty('--category-top', `${Math.max(0, bottom)}px`);
      overlay.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      tabs.find((tab) => tab.dataset.category === selected).focus();
    });
    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !trigger.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close(true);
    });
    document.addEventListener('focusin', (event) => {
      if (!overlay.hidden && !navigation.contains(event.target) && !trigger.contains(event.target)) close();
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a[href]')) close();
    });
    window.addEventListener('pageshow', () => close());
  }
  desktop.addEventListener('change', () => { close(); render(); });
  render();

})();
