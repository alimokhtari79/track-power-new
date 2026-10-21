(() => {
  const footer = document.querySelector('.homepage-footer');
  if (!footer) return;
  const desktop = matchMedia('(min-width: 768px)');
  const sections = [...footer.querySelectorAll('[data-footer-section]')];
  const mobileState = new Map(sections.map((section) => [section, section.hasAttribute('data-mobile-open')]));

  function syncLayout() {
    sections.forEach((section) => {
      section.open = desktop.matches || mobileState.get(section);
      const summary = section.querySelector('summary');
      if (desktop.matches) {
        summary.tabIndex = -1;
        summary.setAttribute('aria-disabled', 'true');
      } else {
        summary.removeAttribute('tabindex');
        summary.removeAttribute('aria-disabled');
      }
    });
  }
  sections.forEach((section) => {
    section.querySelector('summary').addEventListener('click', (event) => {
      // Desktop columns stay expanded; mobile retains native keyboard/touch behavior.
      if (desktop.matches) event.preventDefault();
      else mobileState.set(section, !section.open);
    });
  });
  desktop.addEventListener('change', syncLayout);
  syncLayout();
})();
