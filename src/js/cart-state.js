((host) => {
  // Existing cart fixture: same identity, translations, prices and image in FA/EN.
  const product = {
    id: '81.30301-0629',
    name: { fa: 'دیسک و صفحه کلاچ MAN TGX', en: 'MAN TGX clutch disc and pressure plate' },
    brand: { fa: 'آلمان SACHS', en: 'SACHS / Germany' },
    price: 29000000,
    originalPrice: 30000000,
    image: 'assets/images/Wheel-drive-spring-image.png',
    badge: 'assets/images/product-item-band-image.png',
  };
  const key = 'trak-power-cart-v1';
  function createCart(storage = null) {
    let quantity = 1;
    const listeners = new Set();
    if (storage) {
      try {
        const saved = JSON.parse(storage.getItem(key));
        if (saved?.version === 1 && Number.isSafeInteger(saved.quantity) && saved.quantity >= 0 && Number.isSafeInteger(saved.quantity * product.originalPrice)) quantity = saved.quantity;
      } catch { /* Unavailable or invalid storage keeps the original fixture. */ }
    }
    const snapshot = () => ({
      quantity, product, subtotal: quantity * product.price,
      originalTotal: quantity * product.originalPrice,
      savings: quantity * (product.originalPrice - product.price),
    });
    return {
      snapshot,
      setQuantity(value) {
        if (!Number.isSafeInteger(value) || value < 0 || !Number.isSafeInteger(value * product.originalPrice)) return;
        quantity = value;
        if (storage) {
          try { storage.setItem(key, JSON.stringify({version: 1, quantity})); } catch { /* Memory remains usable. */ }
        }
        listeners.forEach((listener) => listener(snapshot()));
      },
      subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    };
  }
  const api = { createCart, product };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else host.TrakCart = api;
})(globalThis);
