/* ==========================================================================
   UMAR — store.js
   Client state: cart, wishlist, comparison, orders, theme, toasts
   State is held in memory for the life of the page. The app is a hash-routed
   SPA, so navigation never drops it. To persist across full reloads on your
   own hosting, fill in the two bodies of `safe` below with a Web Storage or
   backend call — nothing else in the codebase needs to change.
   ========================================================================== */

import { getProduct, DEMO_ORDERS } from './data.js';

/* Storage key, used when you wire  to real persistence. */
export const STATE_KEY = 'umar.state.v1';

/* Single persistence seam. Default implementation is a session-lifetime
   in-memory slot so the storefront runs inside sandboxed preview frames
   where Web Storage is unavailable. */
let memoSlot = null;

const safe = {
  read() {
    try {
      return memoSlot ? JSON.parse(memoSlot) : null;
    } catch {
      return null;
    }
  },
  write(v) {
    try {
      memoSlot = JSON.stringify(v);
    } catch {
      /* ignore */
    }
  },
};

const initial = {
  cart: [], // { id, qty }
  wishlist: [],
  compare: [],
  orders: [],
  coupon: null,
  user: null,
  theme: 'dark',
};

export const state = Object.assign({}, initial, safe.read() || {});

const listeners = new Set();
export const subscribe = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
const emit = () => {
  safe.write(state);
  listeners.forEach((fn) => fn(state));
};

/* ---------------- Formatting ---------------- */
export const money = (n) =>
  '$' +
  Number(n).toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });

export const pctOff = (p) => (p.was ? Math.round(((p.was - p.price) / p.was) * 100) : 0);

export const stockLabel = (p) => {
  if (p.stock === 0) return { cls: 'stock--out', text: 'Out of stock' };
  if (p.stock <= 5) return { cls: 'stock--low', text: `Only ${p.stock} left` };
  return { cls: '', text: 'In stock' };
};

/* ---------------- Cart ---------------- */
export const cartCount = () => state.cart.reduce((s, l) => s + l.qty, 0);

export const cartLines = () =>
  state.cart
    .map((l) => ({ ...l, product: getProduct(l.id) }))
    .filter((l) => l.product);

export function addToCart(id, qty = 1, opts = {}) {
  const p = getProduct(id);
  if (!p || p.stock === 0) return false;
  const line = state.cart.find((l) => l.id === id);
  const max = Math.max(1, p.stock);
  if (line) line.qty = Math.min(max, line.qty + qty);
  else state.cart.push({ id, qty: Math.min(max, qty) });
  emit();
  if (!opts.silent) {
    toast(`${p.name} added to bag`, { img: p.img });
  }
  return true;
}

export function setQty(id, qty) {
  const p = getProduct(id);
  const line = state.cart.find((l) => l.id === id);
  if (!line) return;
  const next = Math.max(0, Math.min(p ? Math.max(1, p.stock) : 99, qty));
  if (next === 0) return removeFromCart(id);
  line.qty = next;
  emit();
}

export function removeFromCart(id) {
  state.cart = state.cart.filter((l) => l.id !== id);
  emit();
}

export function clearCart() {
  state.cart = [];
  state.coupon = null;
  emit();
}

/* ---------------- Totals ---------------- */
export const COUPONS = {
  UMAR10: { type: 'pct', value: 10, label: '10% welcome credit' },
  ATELIER15: { type: 'pct', value: 15, label: '15% atelier preview' },
  SHIPFREE: { type: 'ship', value: 0, label: 'Complimentary express shipping' },
};

export function applyCoupon(code) {
  const key = String(code || '').trim().toUpperCase();
  if (!COUPONS[key]) {
    toast('That code is not recognised', { kind: 'error' });
    return false;
  }
  state.coupon = key;
  emit();
  toast(`Applied — ${COUPONS[key].label}`);
  return true;
}

export function removeCoupon() {
  state.coupon = null;
  emit();
}

export function totals({ method = 'express', cod = false } = {}) {
  const lines = cartLines();
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const c = state.coupon ? COUPONS[state.coupon] : null;
  const discount = c && c.type === 'pct' ? (subtotal * c.value) / 100 : 0;

  let shipping = subtotal === 0 ? 0 : method === 'standard' ? 0 : 45;
  if (subtotal - discount >= 2500 || (c && c.type === 'ship')) shipping = 0;

  const codFee = cod ? 12 : 0;
  const taxable = Math.max(0, subtotal - discount);
  const duties = Math.round(taxable * 0.05 * 100) / 100;
  const total = Math.max(0, taxable + shipping + codFee + duties);

  return { lines, subtotal, discount, shipping, codFee, duties, total, coupon: c };
}

/* ---------------- Wishlist ---------------- */
export const inWishlist = (id) => state.wishlist.includes(id);

export function toggleWishlist(id) {
  const p = getProduct(id);
  if (inWishlist(id)) {
    state.wishlist = state.wishlist.filter((x) => x !== id);
    toast(`${p.name} removed from wishlist`);
  } else {
    state.wishlist.push(id);
    toast(`${p.name} saved to wishlist`, { img: p.img });
  }
  emit();
  return inWishlist(id);
}

/* ---------------- Compare ---------------- */
export const inCompare = (id) => state.compare.includes(id);

export function toggleCompare(id) {
  const p = getProduct(id);
  if (inCompare(id)) {
    state.compare = state.compare.filter((x) => x !== id);
  } else {
    if (state.compare.length >= 4) {
      toast('Comparison holds four pieces at a time', { kind: 'error' });
      return false;
    }
    state.compare.push(id);
    toast(`${p.name} added to comparison`, { img: p.img });
  }
  emit();
  return inCompare(id);
}

export function clearCompare() {
  state.compare = [];
  emit();
}

/* ---------------- Orders ---------------- */
export const allOrders = () => [...state.orders, ...DEMO_ORDERS];
export const findOrder = (id) =>
  allOrders().find((o) => o.id.toLowerCase() === String(id || '').trim().toLowerCase());

export function placeOrder(details) {
  const t = totals({ method: details.method, cod: details.payment === 'cod' });
  const n = () => Math.floor(1000 + Math.random() * 8999);
  const order = {
    id: `UMR-${n()}-${n()}`,
    email: details.email,
    name: `${details.firstName} ${details.lastName}`,
    placed: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    eta: new Date(Date.now() + 5 * 864e5).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    total: t.total,
    status: 'Order confirmed',
    stage: 0,
    payment: details.payment,
    method: details.method,
    carrier: 'UMAR Secure Courier · pending handover',
    address: `${details.address}, ${details.city} ${details.zip}, ${details.country}`,
    items: t.lines.map((l) => ({ id: l.id, qty: l.qty })),
  };
  state.orders.unshift(order);
  clearCart();
  return order;
}

/* ---------------- Theme ---------------- */
export function setTheme(next) {
  state.theme = next;
  document.documentElement.dataset.theme = next;
  emit();
}
export function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
}

/* ---------------- Toasts ---------------- */
const ICON_CHECK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
const ICON_ALERT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg>';

export function toast(message, { img, kind = 'ok', timeout = 3200 } = {}) {
  const host = document.getElementById('toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.innerHTML =
    (img ? `<img src="${img}" alt="">` : kind === 'error' ? ICON_ALERT : ICON_CHECK) +
    `<span>${message}</span>`;
  host.appendChild(el);
  setTimeout(() => {
    el.classList.add('is-out');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, timeout);
}
