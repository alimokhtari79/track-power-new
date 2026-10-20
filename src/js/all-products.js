(() => {
  const mobileFilters = document.getElementById('mobile-filters');
  const filterTriggers = document.querySelectorAll('.filter-trigger');
  const closeButton = document.querySelector('.filter-close');
  const applyButton = document.querySelector('.filter-apply');
  const clearButtons = document.querySelectorAll('[data-clear]');
  const brandInputs = document.querySelectorAll('.brand-filter');
  const cards = [...document.querySelectorAll('.product-card')];
  const resultCount = document.getElementById('result-count');
  const mobileResultCount = document.getElementById('mobile-result-count');
  const sortButtons = document.querySelectorAll('.sort-trigger');
  const priceRanges = [...document.querySelectorAll('.range-wrap input[type="range"]')];
  const numberInputs = document.querySelectorAll('.price-input');
  const isEnglish = document.documentElement.lang === 'en';
  const formatter = new Intl.NumberFormat(isEnglish ? 'en-US' : 'fa-IR');
  const toNumber = (value) => Number(String(value).replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[^0-9]/g, '')) || 0;
  const productLabel = (count) => `${formatter.format(count)} ${count === 1 ? 'product' : 'products'}`;

  const setFilterState = (open) => {
    mobileFilters.classList.toggle('hidden', !open);
    document.body.classList.toggle('overflow-hidden', open);
    filterTriggers.forEach((trigger) => trigger.setAttribute('aria-expanded', String(open)));
    if (open) closeButton.focus();
  };
  filterTriggers.forEach((trigger) => trigger.addEventListener('click', () => setFilterState(true)));
  closeButton.addEventListener('click', () => setFilterState(false));
  applyButton.addEventListener('click', () => { applyFilters(); setFilterState(false); });
  mobileFilters.addEventListener('click', (event) => { if (event.target === mobileFilters) setFilterState(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !mobileFilters.classList.contains('hidden')) setFilterState(false); });

  const updateRange = (range) => {
    const wrap = range.parentElement;
    const [minInput, maxInput] = [...wrap.querySelectorAll('input')];
    let min = Number(minInput.value); let max = Number(maxInput.value);
    if (min > max) { if (range === minInput) min = max; else max = min; }
    minInput.value = String(min); maxInput.value = String(max);
    wrap.style.setProperty('--min', `${((min - Number(minInput.min)) / (Number(minInput.max) - Number(minInput.min))) * 100}%`);
    wrap.style.setProperty('--max', `${((max - Number(maxInput.min)) / (Number(maxInput.max) - Number(maxInput.min))) * 100}%`);
    numberInputs.forEach((input) => { if (input.dataset.bound === 'min') input.value = formatter.format(min); if (input.dataset.bound === 'max') input.value = formatter.format(max); });
  };
  priceRanges.forEach((range) => { range.addEventListener('input', () => { const pair = document.getElementById(range.id.replace('mobile-', '')); if (pair && pair !== range) pair.value = range.value; updateRange(range); priceRanges.forEach(updateRange); applyFilters(); }); updateRange(range); });
  numberInputs.forEach((input) => input.addEventListener('change', () => {
    const value = Math.min(120000000, Math.max(1200000, toNumber(input.value)));
    priceRanges.forEach((range) => { if ((input.dataset.bound === 'min' && range.id.includes('min')) || (input.dataset.bound === 'max' && range.id.includes('max'))) range.value = String(value); });
    priceRanges.forEach(updateRange); applyFilters();
  }));

  const applyFilters = () => {
    const brands = [...brandInputs].filter((input) => input.checked).map((input) => input.value);
    const activeRange = document.getElementById('price-min');
    const min = activeRange ? Number(activeRange.value) : 1200000;
    const max = document.getElementById('price-max') ? Number(document.getElementById('price-max').value) : 120000000;
    let visible = 0;
    cards.forEach((card) => {
      const matchesBrand = !brands.length || brands.includes(card.dataset.brand);
      const matchesPrice = Number(card.dataset.price) >= min && Number(card.dataset.price) <= max;
      const show = matchesBrand && matchesPrice;
      card.classList.toggle('hidden', !show); if (show) visible += 1;
    });
    const count = visible || 0;
    if (resultCount) resultCount.textContent = formatter.format(count);
    if (mobileResultCount) mobileResultCount.textContent = formatter.format(count);
    if (applyButton) applyButton.textContent = isEnglish
      ? `View ${productLabel(count || 0)}`
      : `مشاهده ${formatter.format(count || 0)} محصول`;
  };
  brandInputs.forEach((input) => input.addEventListener('change', applyFilters));
  clearButtons.forEach((button) => button.addEventListener('click', () => { brandInputs.forEach((input) => { input.checked = false; }); priceRanges.forEach((range) => { range.value = range.id.includes('min') ? range.min : range.max; }); priceRanges.forEach(updateRange); applyFilters(); }));

  sortButtons.forEach((button) => button.addEventListener('click', () => {
    const mode = button.dataset.sort;
    sortButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    const sorted = [...cards].sort((a, b) => {
      const aPrice = Number(a.dataset.price); const bPrice = Number(b.dataset.price);
      if (mode === 'low') return aPrice - bPrice; if (mode === 'high') return bPrice - aPrice; return 0;
    });
    sorted.forEach((card) => card.parentElement.appendChild(card));
  }));

  document.querySelectorAll('.filter-heading').forEach((heading) => heading.addEventListener('click', () => {
    const expanded = heading.getAttribute('aria-expanded') === 'true'; heading.setAttribute('aria-expanded', String(!expanded));
    const icon = heading.querySelector('span:last-child'); if (icon) icon.textContent = expanded ? '⌄' : '⌃';
    const content = heading.parentElement?.querySelector(':scope > div');
    if (content) content.hidden = expanded;
  }));
})();
