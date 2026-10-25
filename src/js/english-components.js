// English shared shell. Keep these layouts aligned with the Persian homepage.
// Deferred scripts mount this before categories, storefront, header and footer initialize.
(() => {
  if (document.documentElement.lang !== 'en') return;
  const root = new URL('../../', document.currentScript.src);
  function mount(selector, markup) {
    const target = document.querySelector(selector);
    if (!target) return;
    const template = document.createElement('template');
    template.innerHTML = markup;
    template.content.querySelectorAll('[href], [src]').forEach((element) => {
      ['href', 'src'].forEach((attribute) => {
        const path = element.getAttribute(attribute);
        if (path) element.setAttribute(attribute, new URL(path, root).href);
      });
    });
    template.content.querySelectorAll('a:not([hreflang])').forEach((link) => {
      const url = new URL(link.href);
      const current = location.pathname.endsWith('/')
        ? new URL('index.html', location.href).pathname
        : location.pathname;
      if (url.pathname === current && !url.hash) link.setAttribute('aria-current', 'page');
    });
    target.replaceWith(template.content);
  }
  mount(
    '[data-english-header]',
    `
    <header class="homepage-header text-primary" data-site-header>
      <div class="homepage-header__bar container-custom flex items-center justify-between">
        <div class="flex items-center">
          <a
            class="homepage-header__brand flex shrink-0 items-center font-extrabold"
            href="en/index.html"
            aria-label="Trak Power home"
          >
            <!-- Temporary brand mark: replace this existing truck asset with the final logo. -->
            <img
              class="homepage-header__logo"
              src="assets/icons/header-logo.svg"
              width="56"
              height="48"
              alt=""
            />
            <span>Trak Power</span>
          </a>
          <nav
            class="homepage-header__navigation hidden items-center lg:flex"
            aria-label="Main navigation"
          >
            <a
              class="homepage-header__categories flex items-center gap-2 font-medium"
              href="en/pages/all-products.html#products"
            >
              <img src="assets/icons/menu-square.svg" width="24" height="24" alt="" />
              <span>Categories</span>
            </a>
            <span class="homepage-header__divider" aria-hidden="true"></span>
            <ul class="homepage-header__links text-muted flex items-center">
              <li><a href="en/index.html">Home</a></li>
              <li><a href="en/pages/contact.html">Contact us</a></li>
              <li><a href="en/pages/blog.html">Blog</a></li>
              <li><a href="en/pages/about-us.html">About us</a></li>
            </ul>
          </nav>
        </div>
        <div class="homepage-header__actions hidden items-center lg:flex">
          <details class="homepage-header__language relative" data-header-language></details>
          <span class="homepage-header__divider" aria-hidden="true"></span>
          <a
            aria-label="Sign in / Register"
            class="homepage-header__account flex items-center gap-2 font-medium"
            href="en/pages/Login.html"
          >
            <img src="assets/icons/user.svg" width="24" height="24" alt="" />
            <span>Sign in / Register</span>
          </a>
          <a
            class="homepage-header__cart flex items-center rounded-xl bg-white"
            href="en/pages/shopnig-card/cart.html"
            aria-label="Shopping cart, 0 items"
          >
            <span class="homepage-header__cart-count text-center" data-cart-count>0</span>
            <span class="bg-surface-bg flex items-center justify-center rounded-lg">
              <img src="assets/icons/shopping-cart-01.svg" width="24" height="24" alt="" />
            </span>
          </a>
        </div>
        <button
          class="homepage-header__toggle flex cursor-pointer items-center justify-center lg:hidden"
          type="button"
          aria-label="Open main menu"
          aria-expanded="false"
          aria-controls="homepage-navigation"
          data-drawer-open
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M2 3h20M2 12h13M2 21h20"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
    <dialog
      id="homepage-navigation"
      class="homepage-drawer text-primary"
      aria-label="Main menu"
      aria-modal="true"
      data-header-drawer
    >
      <div class="homepage-drawer__layout flex h-full flex-col">
        <div class="homepage-drawer__top flex shrink-0 items-center justify-between">
          <a
            class="homepage-header__brand flex items-center font-extrabold"
            href="en/index.html"
            aria-label="Trak Power home"
          >
            <img
              class="homepage-header__logo"
              src="assets/icons/header-logo.svg"
              width="44"
              height="38"
              alt=""
            />
            <span>Trak Power</span>
          </a>
          <button
            class="homepage-drawer__close flex cursor-pointer items-center justify-center"
            type="button"
            aria-label="Close main menu"
            data-drawer-close
            autofocus
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m5 5 14 14M19 5 5 19"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div class="homepage-drawer__content min-h-0 flex-1">
          <div class="homepage-drawer__language flex items-center justify-between">
            <span class="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M7 8h10M12 5.5V8M9 8c.5 4 3 7 6 9M15 8c-.5 4-3 7-6 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Language
            </span>
            <nav
              class="homepage-drawer__languages flex items-center rounded-lg p-1 text-sm"
              aria-label="Select language"
            >
              <a
                class="rounded-md px-3 py-1.5 font-medium"
                href="index.html"
                lang="fa"
                hreflang="fa"
                >Persian</a
              >
              <a
                class="text-muted rounded-md px-3 py-1.5"
                href="en/index.html"
                lang="en"
                hreflang="en"
                aria-current="true"
                dir="ltr"
                >English</a
              >
            </nav>
          </div>
          <nav aria-label="Mobile navigation">
            <ul class="">
              <li><a class="flex items-center" href="en/pages/all-products.html#products">Categories</a></li>
              <li><a class="flex items-center" href="en/pages/shopnig-card/cart.html" data-cart-link>Shopping cart</a></li>
              <li><a class="flex items-center" href="en/index.html">Home</a></li>
              <li><a class="flex items-center" href="en/pages/contact.html">Contact us</a></li>
              <li><a class="flex items-center" href="en/pages/blog.html">Blog</a></li>
              <li><a class="flex items-center" href="en/pages/about-us.html">About us</a></li>
            </ul>
            <a
              class="homepage-drawer__featured text-brand-700 flex items-center gap-2 text-sm font-medium"
              href="en/index.html#featured-products"
            >
              <img src="assets/icons/discount.svg" width="24" height="24" alt="" />
              <span>Special offers</span>
            </a>
          </nav>
        </div>
        <div class="homepage-drawer__footer shrink-0">
          <a
            class="homepage-drawer__login flex items-center justify-center gap-2 rounded-[10px] text-sm font-medium"
            href="en/pages/Login.html"
          >
            <img src="assets/icons/user.svg" width="24" height="24" alt="" />
            <span>Sign in / Register</span>
          </a>
        </div>
      </div>
    </dialog>
  `
  );
  mount(
    '[data-english-footer]',
    `
    <footer class="homepage-footer" aria-label="Trak Power footer">
      <div class="homepage-footer__inner container-custom">
        <div class="homepage-footer__layout">
          <div class="homepage-footer__brand">
            <!-- Temporary logo, using the same truck asset as the current homepage header. -->
            <a
              class="homepage-footer__logo"
              href="en/index.html"
              aria-label="Trak Power home"
              title="Trak Power logo placeholder"
            >
              <img
                src="assets/icons/header-logo.svg"
                width="80"
                height="70"
                alt=""
                loading="lazy"
              />
            </a>
            <p class="text-base leading-5.5 md:text-sm md:leading-6.5">
              Trak Power specializes in parts for DAF and MAN trucks. From small consumables to
              heavy mechanical assemblies, find the parts you need with detailed information,
              up-to-date prices and compatibility checks.
            </p>
            <!-- Explicit placeholders, not certification claims or verification links. -->
            <ul
              class="homepage-footer__badges"
              aria-label="Badge placeholders; images and certifications have not been added"
            >
              <li class="homepage-footer__badge" title="Badge placeholder; image and certification unavailable">
                <span aria-hidden="true">◇</span><span>Badge placeholder 1</span>
              </li>
              <li class="homepage-footer__badge" title="Badge placeholder; image and certification unavailable">
                <span aria-hidden="true">◇</span><span>Badge placeholder 2</span>
              </li>
              <li class="homepage-footer__badge" title="Badge placeholder; image and certification unavailable">
                <span aria-hidden="true">◇</span><span>Badge placeholder 3</span>
              </li>
            </ul>
          </div>
          <nav class="homepage-footer__navigation" aria-label="Footer navigation">
            <details class="homepage-footer__section" data-footer-section data-mobile-open open>
              <summary>
                Useful links<img
                  src="assets/icons/arrow-down-01-round.svg"
                  width="16"
                  height="16"
                  alt=""
                />
              </summary>
              <ul class="text-muted text-sm font-normal md:text-base">
                <li><a href="en/pages/blog.html">Blog</a></li>
                <li><a href="en/pages/about-us.html">About us</a></li>
                <li><a href="en/pages/contact.html">Contact us</a></li>
                <li><a href="en/pages/FandQ.html">FAQs</a></li>
                <li>
                  <span
                    class="homepage-footer__pending"
                    title="The terms and conditions page is not yet available"
                    >Terms and conditions</span
                  >
                </li>
              </ul>
            </details>
            <details class="homepage-footer__section" data-footer-section open>
              <summary>
                Customer service<img
                  src="assets/icons/arrow-down-01-round.svg"
                  width="16"
                  height="16"
                  alt=""
                />
              </summary>
              <ul class="text-muted text-sm font-normal md:text-base">
                <li><a href="en/pages/FandQ.html">Frequently asked questions</a></li>
                <li>
                  <span
                    class="homepage-footer__pending"
                    title="The returns policy page is not yet available"
                    >Returns policy</span
                  >
                </li>
                <li>
                  <span class="homepage-footer__pending" title="The terms of use page is not yet available"
                    >Terms of use</span
                  >
                </li>
                <li>
                  <span class="homepage-footer__pending" title="The privacy policy page is not yet available"
                    >Privacy policy</span
                  >
                </li>
                <li><a href="en/pages/contact.html">Report a bug</a></li>
              </ul>
            </details>
            <details class="homepage-footer__section" data-footer-section open>
              <summary>
                Customer service<img
                  src="assets/icons/arrow-down-01-round.svg"
                  width="16"
                  height="16"
                  alt=""
                />
              </summary>
              <ul class="text-muted text-sm font-normal md:text-base">
                <li><a href="en/pages/FandQ.html">Frequently asked questions</a></li>
                <li>
                  <span
                    class="homepage-footer__pending"
                    title="The returns policy page is not yet available"
                    >Returns policy</span
                  >
                </li>
                <li>
                  <span class="homepage-footer__pending" title="The terms of use page is not yet available"
                    >Terms of use</span
                  >
                </li>
                <li>
                  <span class="homepage-footer__pending" title="The privacy policy page is not yet available"
                    >Privacy policy</span
                  >
                </li>
                <li><a href="en/pages/contact.html">Report a bug</a></li>
              </ul>
            </details>
          </nav>
          <details
            class="homepage-footer__section homepage-footer__contact"
            data-footer-section
            open
          >
            <summary>
              Contact details<img
                src="assets/icons/arrow-down-01-round.svg"
                width="16"
                height="16"
                alt=""
              />
            </summary>
            <address>
              <a href="tel:02122147912">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 5.2 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 10.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
                  />
                </svg>
                <bdi dir="ltr">021-22147912</bdi>
              </a>
              <p>
                <img src="assets/icons/clock.svg" width="24" height="24" alt="" />Saturday to Thursday, 8 AM to 7 PM
              </p>
              <a class="homepage-footer__address" href="en/pages/contact.html"
                ><img src="assets/icons/location-01.svg" width="24" height="24" alt="" />Tehran, Saadat Abad, Kaj Square, Sarvestan Mall, first floor, No. 47</a
              >
            </address>
          </details>
        </div>
        <div class="homepage-footer__bottom">
          <p>
            All rights reserved.<span class="homepage-footer__credit">
              Designed by
              <span class="homepage-footer__pending" title="Designer name has not been provided"
                >—</span
              ></span
            >
          </p>
          <!-- Social accounts are pending: these are non-interactive placeholders. -->
          <ul
            class="homepage-footer__social"
            aria-label="Social media placeholders; account URLs have not been provided"
          >
            <li class="flex size-10 items-center justify-center md:size-10.5">
              <span role="img" aria-label="Facebook placeholder" title="Facebook URL has not been provided"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5Z"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                    stroke="#141B34"
                  />
                  <path
                    d="M17 8H16C14.1144 8 13.1716 8 12.5858 8.58579C12 9.17157 12 10.1144 12 12V14M12 14V21.5M12 14H10M12 14H15"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#141B34"
                  />
                </svg>
              </span>
            </li>
            <li>
              <span
                class="flex size-10 items-center justify-center md:size-10.5"
                role="img"
                aria-label="Telegram placeholder"
                title="Telegram URL has not been provided"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#141B34"
                  />
                </svg>
              </span>
            </li>
            <li>
              <span
                class="flex size-10 items-center justify-center md:size-10.5"
                role="img"
                aria-label="YouTube placeholder"
                title="YouTube URL has not been provided"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.1534 19.9934C15.5451 20.3212 13.8097 20.5 12 20.5C10.1903 20.5 8.45489 20.3212 6.84656 19.9934C4.83766 19.5839 3.83321 19.3791 2.9166 18.2006C2 17.0221 2 15.6693 2 12.9635V11.0365C2 8.33073 2 6.97787 2.9166 5.79937C3.83321 4.62088 4.83766 4.41613 6.84656 4.00662C8.45489 3.67877 10.1903 3.5 12 3.5C13.8097 3.5 15.5451 3.67877 17.1534 4.00662C19.1623 4.41613 20.1668 4.62088 21.0834 5.79937C22 6.97787 22 8.33073 22 11.0365V12.9635C22 15.6693 22 17.0221 21.0834 18.2006C20.1668 19.3791 19.1623 19.5839 17.1534 19.9934Z"
                    stroke-width="1.5"
                    stroke="#141B34"
                  />
                  <path
                    d="M13.4449 14.2241C15.0241 13.3538 15.8137 12.9187 15.9621 12.3129C16.0126 12.1067 16.0126 11.8933 15.9621 11.6871C15.8137 11.0813 15.0241 10.6462 13.4449 9.77593C11.7272 8.82945 10.8684 8.35621 10.1728 8.53854C9.9372 8.60029 9.7202 8.70886 9.53799 8.85618C9 9.29112 9 10.1941 9 12C9 13.8059 9 14.7089 9.53799 15.1438C9.7202 15.2911 9.9372 15.3997 10.1728 15.4615C10.8684 15.6438 11.7272 15.1705 13.4449 14.2241Z"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                    stroke="#141B34"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  `
  );
})();
