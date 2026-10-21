(() => {
  const header = document.querySelector('[data-site-header]');
  if (!header || header.dataset.initialized === 'true') return;

  const trigger = header.querySelector('[data-drawer-open]');
  const drawer = document.getElementById(trigger?.getAttribute('aria-controls'));
  if (!trigger || !drawer) return;
  header.dataset.initialized = 'true';

  const closeButton = drawer.querySelector('[data-drawer-close]');
  const language = header.querySelector('[data-header-language]');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const body = document.body;
  const lockProperties = ['position', 'top', 'left', 'right', 'overflow', 'padding-inline-end'];
  let savedScroll = null;
  let closeTimer;

  function lockScroll() {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    savedScroll = {
      x: window.scrollX,
      y: window.scrollY,
      styles: lockProperties.map((property) => [
        property,
        body.style.getPropertyValue(property),
        body.style.getPropertyPriority(property),
      ]),
    };
    const padding = parseFloat(getComputedStyle(body).paddingInlineEnd) || 0;
    body.style.position = 'fixed';
    body.style.top = `-${savedScroll.y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingInlineEnd = `${padding + scrollbar}px`;
  }

  function restorePage() {
    clearTimeout(closeTimer);
    trigger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-closing');
    if (!savedScroll) return;

    const { x, y, styles } = savedScroll;
    savedScroll = null;
    styles.forEach(([property, value, priority]) => {
      if (value) body.style.setProperty(property, value, priority);
      else body.style.removeProperty(property);
    });
    window.scrollTo({ left: x, top: y, behavior: 'instant' });
    const focusTarget = desktop.matches ? header.querySelector('a') : trigger;
    focusTarget.focus({ preventScroll: true });
  }

  function finishClosing() {
    if (drawer.open) drawer.close();
    restorePage();
  }

  function closeDrawer(immediate = false) {
    if (!drawer.open) return;
    clearTimeout(closeTimer);
    if (immediate || reducedMotion.matches) {
      finishClosing();
      return;
    }
    drawer.classList.add('is-closing');
    // Keep the dialog modal during its exit animation; the fallback also works
    // when transitions are interrupted or the tab is backgrounded.
    closeTimer = window.setTimeout(finishClosing, 240);
  }

  function openDrawer() {
    if (desktop.matches || drawer.open) return;
    clearTimeout(closeTimer);
    if (language) language.open = false;
    drawer.classList.remove('is-closing');
    lockScroll();
    drawer.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    closeButton.focus({ preventScroll: true });
  }

  trigger.addEventListener('click', openDrawer);
  closeButton.addEventListener('click', () => closeDrawer());
  drawer.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeDrawer();
  });
  drawer.addEventListener('close', () => {
    // A queued native close event can arrive after a fast reopen.
    if (!drawer.open) restorePage();
  });
  drawer.addEventListener('transitionend', (event) => {
    if (
      event.target === drawer &&
      event.propertyName === 'transform' &&
      drawer.classList.contains('is-closing')
    ) {
      finishClosing();
    }
  });

  let backdropPointerDown = false;
  function isOutsideDrawer(event) {
    const bounds = drawer.getBoundingClientRect();
    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  }
  drawer.addEventListener('pointerdown', (event) => {
    backdropPointerDown = event.target === drawer && isOutsideDrawer(event);
  });
  drawer.addEventListener('click', (event) => {
    if (event.target === drawer && backdropPointerDown && isOutsideDrawer(event)) {
      closeDrawer();
    }
    backdropPointerDown = false;
    // Restore scrolling before the browser follows an in-page section link.
    if (event.target.closest('a[href]')) closeDrawer(true);
  });
  drawer.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...drawer.querySelectorAll('a[href], button:not([disabled])')]
      .filter((element) => element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  desktop.addEventListener('change', () => {
    if (desktop.matches) closeDrawer(true);
    if (language) language.open = false;
  });
  document.addEventListener('click', (event) => {
    if (language?.open && !language.contains(event.target)) language.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && language?.open) {
      language.open = false;
      language.querySelector('summary').focus();
    }
  });
  header.addEventListener('focusout', (event) => {
    if (language?.open && !language.contains(event.relatedTarget)) language.open = false;
  });
  window.addEventListener('pageshow', () => {
    if (drawer.open) closeDrawer(true);
  });
})();
