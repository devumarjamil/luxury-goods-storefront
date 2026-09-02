/* ==========================================================================
   UMAR — app.js
   Router, global interactions, motion
   ========================================================================== */

import { PRODUCTS, getProduct, catName, CATEGORIES } from './data.js';
import {
  state,
  subscribe,
  money,
  totals,
  cartLines,
  cartCount,
  addToCart,
  setQty,
  removeFromCart,
  clearCart,
  applyCoupon,
  toggleWishlist,
  toggleCompare,
  clearCompare,
  inWishlist,
  inCompare,
  placeOrder,
  setTheme,
  toggleTheme,
  toast,
  stockLabel,
  pctOff,
} from './store.js';
import { icons, logoMark, stars, productCard } from './ui.js';
import * as V from './views.js';
import * as C from './commerce.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ==========================================================================
   Route parsing
   ========================================================================== */
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '') || '';
  const [path, qs] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  const query = {};
  new URLSearchParams(qs || '').forEach((v, k) => (query[k] = v));
  return { name: parts[0] || 'home', param: parts[1] || '', query };
}

function buildQuery(q) {
  const s = new URLSearchParams(
    Object.entries(q).filter(([, v]) => v !== '' && v != null && v !== false)
  ).toString();
  return s ? `?${s}` : '';
}

/* ==========================================================================
   Render
   ========================================================================== */
const TITLES = {
  home: 'UMAR — Maison of Modern Luxury',
  shop: 'The Collection — UMAR',
  categories: 'Categories — UMAR',
  product: 'UMAR',
  cart: 'Shopping bag — UMAR',
  checkout: 'Secure checkout — UMAR',
  confirmation: 'Order confirmed — UMAR',
  track: 'Order tracking — UMAR',
  about: 'About UMAR',
  contact: 'Contact — UMAR',
  account: 'Account — UMAR',
  wishlist: 'Wishlist — UMAR',
  compare: 'Comparison — UMAR',
};

let currentRoute = null;

function render() {
  const route = parseHash();
  currentRoute = route;
  const view = $('#view');
  closeDrawer();
  closeSearch();
  closeMobile();

  let html = '';
  switch (route.name) {
    case 'shop':
      html = V.shop(route.query);
      break;
    case 'categories':
      html = V.categories();
      break;
    case 'product':
      html = V.product(route.param);
      break;
    case 'about':
      html = V.about();
      break;
    case 'contact':
      html = V.contact();
      break;
    case 'wishlist':
      html = V.wishlist();
      break;
    case 'compare':
      html = V.compare();
      break;
    case 'cart':
      html = C.cart();
      break;
    case 'checkout':
      html = C.checkout();
      break;
    case 'confirmation':
      html = C.confirmation(route.param || route.query.id);
      break;
    case 'track':
      html = C.track(route.query.id || '');
      break;
    case 'account':
      html = C.account(route.query.tab || 'orders');
      break;
    default:
      html = V.home();
  }

  view.innerHTML = html;
  view.classList.remove('view-anim');
  void view.offsetWidth;
  view.classList.add('view-anim');

  const p = route.name === 'product' ? getProduct(route.param) : null;
  document.title = p ? `${p.name} — UMAR` : TITLES[route.name] || TITLES.home;

  markNav(route.name);
  window.scrollTo({ top: 0, behavior: 'auto' });

  initReveals();
  initTilt();
  initParallax();
  initCountdown();
  if (route.name === 'shop') initShop(route.query);
  if (route.name === 'product') initProduct();
  if (route.name === 'checkout') initCheckout();
}

function markNav(name) {
  $$('[data-nav]').forEach((a) => {
    const on = a.dataset.nav === name;
    if (on) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

/* ==========================================================================
   Header badges
   ========================================================================== */
function syncBadges() {
  const map = { cart: cartCount(), wish: state.wishlist.length, compare: state.compare.length };
  Object.entries(map).forEach(([k, n]) => {
    $$(`[data-badge="${k}"]`).forEach((el) => {
      el.textContent = n;
      el.classList.toggle('is-on', n > 0);
    });
  });

  const tray = $('#compare-tray');
  if (tray) {
    tray.classList.toggle('is-on', state.compare.length > 0);
    $('#compare-tray-thumbs').innerHTML = state.compare
      .map(getProduct)
      .filter(Boolean)
      .map((p) => `<img src="${p.img}" alt="${p.name}">`)
      .join('');
    $('#compare-tray-label').textContent = `${state.compare.length} of 4 selected`;
  }

  $$('[data-act="wish"]').forEach((b) => {
    const on = inWishlist(b.dataset.id);
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  $$('[data-act="compare"]').forEach((b) => {
    const on = inCompare(b.dataset.id);
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });

  renderDrawer();
}

/* ==========================================================================
   Cart drawer
   ========================================================================== */
function renderDrawer() {
  const body = $('#drawer-body');
  if (!body) return;
  const lines = cartLines();
  const t = totals();

  body.innerHTML = lines.length
    ? lines
        .map(
          (l) => `
      <div class="mini-line">
        <a href="#/product/${l.id}"><img src="${l.product.img}" alt="${l.product.name}" loading="lazy"></a>
        <div>
          <a class="mini-line__name" href="#/product/${l.id}">${l.product.name}</a>
          <div class="mini-line__meta">${money(l.product.price)} · qty ${l.qty}</div>
          <div style="margin-top:var(--space-2);display:flex;gap:var(--space-3);align-items:center">
            <button class="line__remove" data-act="qty-dec" data-id="${l.id}">−</button>
            <button class="line__remove" data-act="qty-inc" data-id="${l.id}">+</button>
            <button class="line__remove" data-act="remove" data-id="${l.id}">Remove</button>
          </div>
        </div>
        <div>${money(l.product.price * l.qty)}</div>
      </div>`
        )
        .join('')
    : `<p class="muted" style="padding-block:var(--space-12);text-align:center;font-size:var(--text-sm)">
         Your bag is empty.<br><a class="link-arrow" href="#/shop" style="margin-top:var(--space-4)">Browse the collection</a>
       </p>`;

  $('#drawer-subtotal').textContent = money(t.subtotal);
  $('#drawer-count').textContent = `${cartCount()} item${cartCount() === 1 ? '' : 's'}`;
}

const openDrawer = () => {
  renderDrawer();
  $('#drawer').classList.add('is-open');
  document.body.style.overflow = 'hidden';
};
const closeDrawer = () => {
  $('#drawer').classList.remove('is-open');
  document.body.style.overflow = '';
};

/* ==========================================================================
   Search overlay
   ========================================================================== */
function openSearch() {
  const o = $('#search');
  o.classList.add('is-open');
  setTimeout(() => $('#search-input').focus(), 60);
  searchRender('');
}
function closeSearch() {
  $('#search').classList.remove('is-open');
}
function searchRender(q) {
  const term = q.trim().toLowerCase();
  const host = $('#search-results');
  const list = term
    ? PRODUCTS.filter((p) =>
        `${p.name} ${catName(p.cat)} ${p.blurb}`.toLowerCase().includes(term)
      ).slice(0, 8)
    : PRODUCTS.filter((p) => p.bestseller || p.new).slice(0, 5);

  if (!list.length) {
    host.innerHTML = `<p class="search-empty">No piece matches “${q}”. Try “oud”, “gold” or “leather”.</p>`;
    return;
  }
  host.innerHTML =
    (term ? '' : '<p class="search-empty" style="padding:var(--space-3) var(--space-5);text-align:left">Suggested</p>') +
    list
      .map(
        (p) => `
      <a class="search-row" href="#/product/${p.id}" data-act="search-go">
        <img src="${p.img}" alt="" loading="lazy">
        <div><div class="search-row__name">${p.name}</div><div class="search-row__meta">${catName(p.cat)}</div></div>
        <div class="search-row__price">${money(p.price)}</div>
      </a>`
      )
      .join('');
}

/* ==========================================================================
   Quick view
   ========================================================================== */
function openQuickView(id) {
  const p = getProduct(id);
  if (!p) return;
  const st = stockLabel(p);
  $('#modal-body').innerHTML = `
    <div class="qv">
      <div class="qv__media"><img src="${p.img}" alt="${p.name}"></div>
      <div class="qv__body">
        <p class="eyebrow">${catName(p.cat)}</p>
        <h3>${p.name}</h3>
        ${stars(p.rating, p.reviews)}
        <div class="pdp__price">
          <span class="price">${money(p.price)}</span>
          ${p.was ? `<span class="price--was">${money(p.was)}</span><span class="price--off">−${pctOff(p)}%</span>` : ''}
        </div>
        <span class="stock ${st.cls}">${st.text}</span>
        <p class="muted" style="font-size:var(--text-sm)">${p.blurb}</p>
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-2)">
          <button class="btn btn--gold btn--sm" data-act="add" data-id="${p.id}" ${p.stock === 0 ? 'aria-disabled="true"' : ''}>Add to bag</button>
          <a class="btn btn--ghost btn--sm" href="#/product/${p.id}" data-act="close-modal">Full details</a>
        </div>
      </div>
    </div>`;
  $('#modal').classList.add('is-open');
}
const closeModal = () => $('#modal').classList.remove('is-open');

/* ==========================================================================
   Motion
   ========================================================================== */
let revealObserver;
function initReveals() {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
    return;
  }
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.02 }
  );
  $$('.reveal').forEach((el) => revealObserver.observe(el));

  // Safety net: never leave above-the-fold content hidden if the observer
  // does not fire (restored scroll positions, sandboxed iframes, fast paints).
  const sweep = () => {
    $$('.reveal:not(.is-in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 1.05 && r.bottom > -40) {
        el.classList.add('is-in');
        revealObserver.unobserve(el);
      }
    });
  };
  requestAnimationFrame(sweep);
  setTimeout(sweep, 700);
  setTimeout(sweep, 1600);
}

function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  $$('.tilt').forEach((el) => {
    if (el.dataset.tiltOn) return;
    el.dataset.tiltOn = '1';
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

let parallaxItems = [];
function initParallax() {
  parallaxItems = $$('[data-parallax]').map((el) => ({ el, k: parseFloat(el.dataset.parallax) }));
}
function onScrollFrame() {
  const y = window.scrollY;
  parallaxItems.forEach(({ el, k }) => {
    el.style.transform = `translate3d(0, ${y * k}px, 0)`;
  });
  const hero = $('#hero');
  if (hero) {
    const img = $('.hero__media img', hero);
    const inner = $('.hero__inner', hero);
    const h = hero.offsetHeight || 1;
    const p = Math.min(1, y / h);
    if (img) img.style.transform = `scale(${1.08 + p * 0.1})`;
    if (inner) {
      inner.style.opacity = String(Math.max(0, 1 - p * 1.35));
      inner.style.filter = `blur(${p * 4}px)`;
    }
  }
  $('#header').classList.toggle('is-stuck', y > 12);
}

let ticking = false;
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScrollFrame();
      ticking = false;
    });
  },
  { passive: true }
);

function initCountdown() {
  const host = $('[data-countdown]');
  if (!host) return;
  const end = Date.now() + 3 * 864e5 + 7 * 36e5 + 42 * 6e4;
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    if (!document.body.contains(host)) return clearInterval(iv);
    let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
    const d = Math.floor(s / 86400);
    s -= d * 86400;
    const h = Math.floor(s / 3600);
    s -= h * 3600;
    const m = Math.floor(s / 60);
    s -= m * 60;
    $('[data-unit="d"]', host).textContent = pad(d);
    $('[data-unit="h"]', host).textContent = pad(h);
    $('[data-unit="m"]', host).textContent = pad(m);
    $('[data-unit="s"]', host).textContent = pad(s);
  };
  const iv = setInterval(tick, 1000);
  tick();
}

/* ==========================================================================
   Shop view behaviour
   ========================================================================== */
function initShop(query) {
  const form = $('[data-filters]');
  const results = $('[data-results]');
  const countEl = $('[data-count]');
  const sortEl = $('[data-sort]');
  const chips = $('[data-chips]');
  if (!form || !results) return;

  const readForm = () => {
    const fd = new FormData(form);
    return {
      q: (fd.get('q') || '').toString().trim(),
      cat: fd.getAll('cat').join(','),
      max: fd.get('max'),
      instock: fd.get('instock') ? '1' : '',
      sale: fd.get('sale') ? '1' : '',
      newonly: fd.get('newonly') ? '1' : '',
      sort: sortEl.value,
    };
  };

  const paint = (q) => {
    const list = V.filterProducts(q);
    countEl.textContent = `${list.length} piece${list.length === 1 ? '' : 's'}${
      q.cat ? ` in ${q.cat.split(',').map(catName).join(', ')}` : ''
    }`;

    const active = [];
    q.cat && q.cat.split(',').forEach((c) => active.push({ k: 'cat', v: c, label: catName(c) }));
    if (q.q) active.push({ k: 'q', v: q.q, label: `“${q.q}”` });
    if (q.instock) active.push({ k: 'instock', v: '1', label: 'In stock' });
    if (q.sale) active.push({ k: 'sale', v: '1', label: 'On sale' });
    if (q.newonly) active.push({ k: 'newonly', v: '1', label: 'New & limited' });
    chips.innerHTML = active
      .map(
        (a) =>
          `<span class="chip">${a.label}<button data-act="chip-off" data-k="${a.k}" data-v="${a.v}" aria-label="Remove filter">✕</button></span>`
      )
      .join('');

    results.innerHTML = list.length
      ? list.map((p, i) => productCard(p, i)).join('')
      : `<div style="grid-column:1/-1">
          <div class="empty">${icons.box}<h3>No pieces match those filters</h3>
          <p>Try widening the price range or clearing a category.</p>
          <button class="btn btn--ghost btn--sm" data-act="reset-filters">Clear all filters</button></div>
        </div>`;
    initReveals();
    initTilt();
    syncBadges();
  };

  const commit = () => {
    const q = readForm();
    const out = $('[data-out="max"]');
    if (out) out.textContent = money(Number(q.max));
    history.replaceState(null, '', `#/shop${buildQuery(q)}`);
    paint(q);
  };

  form.addEventListener('input', commit);
  form.addEventListener('submit', (e) => e.preventDefault());
  sortEl.addEventListener('change', commit);
  form.addEventListener('reset', () => setTimeout(() => (location.hash = '#/shop'), 0));

  // initial paint with a short skeleton beat
  setTimeout(() => paint({ ...query, sort: sortEl.value }), 260);
}

/* ==========================================================================
   Product view behaviour
   ========================================================================== */
function initProduct() {
  const stage = $('[data-stage]');
  if (stage) {
    stage.addEventListener('pointerenter', () => stage.classList.add('is-zoom'));
    stage.addEventListener('pointerleave', () => {
      stage.classList.remove('is-zoom');
      const img = $('img', stage);
      if (img) img.style.transformOrigin = 'center center';
    });
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const img = $('img', stage);
      if (img)
        img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${
          ((e.clientY - r.top) / r.height) * 100
        }%`;
    });
  }
}

/* ==========================================================================
   Checkout behaviour
   ========================================================================== */
let coStep = 1;

function initCheckout() {
  coStep = 1;
  paintCheckoutStep();
  const form = $('#checkout-form');
  if (!form) return;
  form.addEventListener('change', () => {
    const fd = new FormData(form);
    const t = totals({ method: fd.get('method'), cod: fd.get('payment') === 'cod' });
    const box = $('[data-co-summary]');
    if (box) box.innerHTML = C.checkoutSummary(t);
    const cardFields = $('[data-card-fields]');
    if (cardFields) cardFields.style.display = fd.get('payment') === 'card' ? '' : 'none';
  });
}

function paintCheckoutStep() {
  $$('[data-cstep]').forEach((s) => (s.hidden = Number(s.dataset.cstep) !== coStep));
  $$('[data-steps] .step').forEach((s) => {
    const n = Number(s.dataset.step);
    s.classList.toggle('is-active', n === coStep);
    s.classList.toggle('is-done', n < coStep);
  });
  const back = $('[data-act="co-back"]');
  const next = $('[data-act="co-next"]');
  if (back) back.hidden = coStep === 1;
  if (next)
    next.textContent =
      coStep === 1 ? 'Continue to delivery' : coStep === 2 ? 'Continue to payment' : 'Place order';
}

function validateStep() {
  const section = $(`[data-cstep="${coStep}"]`);
  if (!section) return true;
  let ok = true;
  $$('input[required], textarea[required]', section).forEach((el) => {
    const field = el.closest('.field');
    const bad =
      !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(el.value));
    field?.classList.toggle('has-error', bad);
    el.setAttribute('aria-invalid', String(bad));
    if (bad && ok) el.focus();
    if (bad) ok = false;
  });
  if (coStep === 3) {
    const fd = new FormData($('#checkout-form'));
    if (fd.get('payment') === 'card') {
      const digits = String(fd.get('card') || '').replace(/\D/g, '');
      const el = $('[name="card"]');
      const bad = digits.length !== 16;
      el.closest('.field')?.classList.toggle('has-error', bad);
      if (bad) {
        el.focus();
        ok = false;
      }
    }
    const t = totals({ cod: fd.get('payment') === 'cod' });
    if (fd.get('payment') === 'cod' && t.total > 2000) {
      toast('Cash on delivery is limited to $2,000. Please choose another method.', { kind: 'error' });
      ok = false;
    }
  }
  if (!ok) toast('Please complete the highlighted fields', { kind: 'error' });
  return ok;
}

function submitOrder() {
  const form = $('#checkout-form');
  const fd = new FormData(form);
  const details = Object.fromEntries(fd.entries());
  const btn = $('[data-act="co-next"]');
  btn.setAttribute('aria-disabled', 'true');
  btn.textContent = 'Authorising payment…';

  setTimeout(() => {
    const order = placeOrder(details);
    if (!state.user) state.user = { name: order.name, email: order.email };
    location.hash = `#/confirmation/${order.id}`;
  }, 1100);
}

/* ==========================================================================
   Global delegated events
   ========================================================================== */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-act]');

  // close overlays on scrim / outside
  if (e.target.matches('.drawer__scrim')) closeDrawer();
  if (e.target.matches('.modal__scrim')) closeModal();
  if (e.target.matches('.mobile-nav__scrim')) closeMobile();
  if (e.target.matches('.search-overlay')) closeSearch();

  if (!t) return;
  const act = t.dataset.act;
  const id = t.dataset.id;

  switch (act) {
    case 'theme':
      toggleTheme();
      $$('[data-theme-icon]').forEach(
        (el) => (el.innerHTML = state.theme === 'dark' ? icons.sun : icons.moon)
      );
      break;

    case 'open-search':
      openSearch();
      break;
    case 'close-search':
      closeSearch();
      break;
    case 'search-go':
      closeSearch();
      break;

    case 'open-cart':
      e.preventDefault();
      openDrawer();
      break;
    case 'close-drawer':
      closeDrawer();
      break;

    case 'open-mobile':
      openMobile();
      break;
    case 'close-mobile':
      closeMobile();
      break;

    case 'add':
      e.preventDefault();
      if (t.getAttribute('aria-disabled') === 'true') {
        toast('We will notify you when this piece returns');
        break;
      }
      addToCart(id, 1);
      break;

    case 'add-detail': {
      e.preventDefault();
      if (t.getAttribute('aria-disabled') === 'true') break;
      const input = $(`.pdp__buy input[data-id="${id}"]`);
      addToCart(id, Math.max(1, parseInt(input?.value || '1', 10)));
      openDrawer();
      break;
    }

    case 'buy-now': {
      if (t.getAttribute('aria-disabled') === 'true') break;
      const input = $(`.pdp__buy input[data-id="${id}"]`);
      addToCart(id, Math.max(1, parseInt(input?.value || '1', 10)), { silent: true });
      location.hash = '#/checkout';
      break;
    }

    case 'quickview':
      openQuickView(id);
      break;
    case 'close-modal':
      closeModal();
      break;

    case 'wish':
      toggleWishlist(id);
      if (currentRoute?.name === 'wishlist' || currentRoute?.name === 'account') render();
      break;

    case 'compare':
      toggleCompare(id);
      if (currentRoute?.name === 'compare') render();
      break;
    case 'clear-compare':
      clearCompare();
      render();
      break;

    case 'qty-inc':
    case 'qty-dec': {
      const delta = act === 'qty-inc' ? 1 : -1;
      const box = t.closest('.qty');
      const input = box ? $('input', box) : null;
      if (input && !state.cart.some((l) => l.id === id)) {
        const p = getProduct(id);
        const next = Math.min(Math.max(1, p ? p.stock : 1), Math.max(1, parseInt(input.value, 10) + delta));
        input.value = next;
      } else {
        const line = state.cart.find((l) => l.id === id);
        setQty(id, (line ? line.qty : 1) + delta);
        if (['cart', 'checkout'].includes(currentRoute?.name)) render();
      }
      break;
    }

    case 'remove':
      removeFromCart(id);
      if (['cart', 'checkout'].includes(currentRoute?.name)) render();
      break;

    case 'clear-cart':
      clearCart();
      render();
      break;

    case 'coupon': {
      const v = $('#coupon')?.value;
      if (applyCoupon(v)) render();
      break;
    }

    case 'toggle-filters': {
      const f = $('#filters');
      const open = f.classList.toggle('is-open');
      t.setAttribute('aria-expanded', String(open));
      break;
    }

    case 'reset-filters':
      location.hash = '#/shop';
      break;

    case 'chip-off': {
      const q = { ...currentRoute.query };
      if (t.dataset.k === 'cat') {
        q.cat = (q.cat || '')
          .split(',')
          .filter((c) => c && c !== t.dataset.v)
          .join(',');
      } else {
        delete q[t.dataset.k];
      }
      location.hash = `#/shop${buildQuery(q)}`;
      render();
      break;
    }

    case 'thumb': {
      const src = t.dataset.src;
      $('[data-stage] img').src = src;
      $$('[data-act="thumb"]').forEach((b) => b.setAttribute('aria-selected', String(b === t)));
      break;
    }

    case 'co-next':
      if (t.getAttribute('aria-disabled') === 'true') break;
      if (!validateStep()) break;
      if (coStep < 3) {
        coStep += 1;
        paintCheckoutStep();
        $('[data-steps]').scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        submitOrder();
      }
      break;

    case 'co-back':
      coStep = Math.max(1, coStep - 1);
      paintCheckoutStep();
      break;

    case 'acct-tab':
      location.hash = `#/account?tab=${t.dataset.tab}`;
      break;

    case 'signout':
      state.user = null;
      toast('Signed out');
      location.hash = '#/account';
      render();
      break;

    case 'save-profile':
      toast('Profile updated');
      break;

    case 'add-address':
      toast('Address form would open here in production');
      break;

    default:
      break;
  }
});

/* Tabs (product page) */
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-tab]:not([data-act])');
  if (!b || !b.closest('.tabs__nav')) return;
  const wrap = b.closest('[data-tabs]');
  $$('.tabs__nav button', wrap).forEach((x) => x.setAttribute('aria-selected', String(x === b)));
  $$('[data-panel]', wrap).forEach((p) => (p.hidden = p.dataset.panel !== b.dataset.tab));
});

/* Quantity typing */
document.addEventListener('change', (e) => {
  const input = e.target.closest('input[data-act="qty-set"]');
  if (!input) return;
  const id = input.dataset.id;
  const n = Math.max(1, parseInt(input.value, 10) || 1);
  if (state.cart.some((l) => l.id === id)) {
    setQty(id, n);
    if (['cart', 'checkout'].includes(currentRoute?.name)) render();
  } else {
    const p = getProduct(id);
    input.value = Math.min(n, p ? Math.max(1, p.stock) : n);
  }
});

/* Forms */
document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[data-form]');
  if (!form) return;
  e.preventDefault();
  const kind = form.dataset.form;
  const fd = new FormData(form);

  if (kind === 'newsletter') {
    const email = String(fd.get('email') || '');
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      toast('Please enter a valid email address', { kind: 'error' });
      return;
    }
    form.reset();
    toast('Welcome to the Private List');
    return;
  }

  if (kind === 'contact') {
    let ok = true;
    $$('input[required], textarea[required]', form).forEach((el) => {
      const bad = !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(el.value));
      el.closest('.field')?.classList.toggle('has-error', bad);
      if (bad) ok = false;
    });
    if (!ok) return toast('Please complete the highlighted fields', { kind: 'error' });
    form.reset();
    toast('Message sent — our concierge replies within two hours');
    return;
  }

  if (kind === 'track') {
    const id = String(fd.get('id') || '').trim();
    location.hash = `#/track?id=${encodeURIComponent(id)}`;
    render();
    return;
  }

  if (kind === 'signin') {
    const email = String(fd.get('email') || '');
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
      toast('Enter a valid email address', { kind: 'error' });
      return;
    }
    state.user = { name: 'Umar Jamil', email };
    toast('Signed in');
    location.hash = '#/account?tab=orders';
    render();
    return;
  }
});

/* Search input */
document.addEventListener('input', (e) => {
  if (e.target.id === 'search-input') searchRender(e.target.value);
});

/* Keyboard */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
    closeDrawer();
    closeModal();
    closeMobile();
  }
  if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea/i.test(e.target.tagName))) {
    e.preventDefault();
    openSearch();
  }
});

/* ==========================================================================
   Mobile nav
   ========================================================================== */
const openMobile = () => {
  $('#mobile-nav').classList.add('is-open');
  document.body.style.overflow = 'hidden';
};
const closeMobile = () => {
  $('#mobile-nav').classList.remove('is-open');
  document.body.style.overflow = '';
};

/* ==========================================================================
   Chrome (header / footer / overlays)
   ========================================================================== */
const NAV = [
  ['home', 'Home', '#/'],
  ['shop', 'Shop', '#/shop'],
  ['categories', 'Categories', '#/categories'],
  ['about', 'About', '#/about'],
  ['contact', 'Contact', '#/contact'],
];

function mountChrome() {
  $('#chrome-top').innerHTML = `
  <div class="promo-strip" role="region" aria-label="Announcements">
    <div class="promo-strip__track">
      ${Array(2)
        .fill(
          `<span>Complimentary insured delivery above <b>$2,500</b></span>
           <span>Autumn private sale — up to <b>15% off</b> archive pieces</span>
           <span><b>30-day</b> returns, collection arranged</span>
           <span>Cash on delivery available in selected markets</span>
           <span>Hand engraving <b>complimentary</b> on all jewelry</span>`
        )
        .join('')}
    </div>
  </div>

  <header class="header" id="header">
    <div class="wrap header__bar">
      ${logoMark('#/')}
      <nav class="header__nav" aria-label="Primary">
        ${NAV.map(([k, label, href]) => `<a class="navlink" data-nav="${k}" href="${href}">${label}</a>`).join('')}
      </nav>
      <div class="header__actions">
        <button class="icon-btn" data-act="open-search" aria-label="Search products">${icons.search}</button>
        <a class="icon-btn hide-sm" href="#/wishlist" aria-label="Wishlist">${icons.heart}<span class="count-badge" data-badge="wish">0</span></a>
        <a class="icon-btn hide-sm" href="#/compare" aria-label="Comparison">${icons.compare}<span class="count-badge" data-badge="compare">0</span></a>
        <a class="icon-btn" href="#/cart" data-act="open-cart" aria-label="Shopping bag">${icons.bag}<span class="count-badge" data-badge="cart">0</span></a>
        <a class="icon-btn hide-sm" href="#/account" aria-label="Account">${icons.user}</a>
        <button class="icon-btn" data-act="theme" aria-label="Switch theme"><span data-theme-icon>${icons.sun}</span></button>
        <button class="icon-btn burger" data-act="open-mobile" aria-label="Open menu">${icons.menu}</button>
      </div>
    </div>
  </header>`;

  $('#chrome-bottom').innerHTML = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__about">
          ${logoMark('#/')}
          <p>A modern maison working in timepieces, fragrance, leather, eyewear, jewelry and objects for the home. Founded 2014.</p>
          <div class="footer__pay">
            <span class="pay-chip">Visa</span><span class="pay-chip">Mastercard</span>
            <span class="pay-chip">Amex</span><span class="pay-chip">Apple Pay</span>
            <span class="pay-chip">Google Pay</span><span class="pay-chip">Bank transfer</span>
            <span class="pay-chip">Cash on delivery</span>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul role="list">
            ${CATEGORIES.map((c) => `<li><a href="#/shop?cat=${c.id}">${c.name}</a></li>`).join('')}
            <li><a href="#/shop?sale=1">Archive sale</a></li>
          </ul>
        </div>
        <div>
          <h4>Client care</h4>
          <ul role="list">
            <li><a href="#/track">Track an order</a></li>
            <li><a href="#/contact">Shipping &amp; returns</a></li>
            <li><a href="#/contact">Repairs &amp; servicing</a></li>
            <li><a href="#/contact">Size &amp; fit guide</a></li>
            <li><a href="#/contact">Contact concierge</a></li>
          </ul>
        </div>
        <div>
          <h4>The house</h4>
          <ul role="list">
            <li><a href="#/about">About UMAR</a></li>
            <li><a href="#/about">Our workshops</a></li>
            <li><a href="#/about">Sustainability</a></li>
            <li><a href="#/account">Client account</a></li>
            <li><a href="#/compare">Compare pieces</a></li>
          </ul>
        </div>
        <div>
          <h4>Boutiques</h4>
          <ul role="list">
            <li><a href="#/contact">New York — Madison Ave</a></li>
            <li><a href="#/contact">Geneva — Rue du Rhône</a></li>
            <li><a href="#/contact">Florence — Atelier</a></li>
            <li><a href="#/contact">Islamabad — F-6 Markaz</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} UMAR Maison de Luxe. All rights reserved.</span>
        <span>Privacy · Terms · Cookies · Accessibility · Demonstration storefront</span>
      </div>
    </div>
  </footer>`;

  $('#overlays').innerHTML = `
  <div class="search-overlay" id="search" role="dialog" aria-modal="true" aria-label="Search">
    <div class="search-panel">
      <div class="search-panel__input">
        ${icons.search}
        <input id="search-input" type="text" autocomplete="off" placeholder="Search timepieces, fragrance, leather…" aria-label="Search products">
        <button class="icon-btn" data-act="close-search" aria-label="Close search">${icons.close}</button>
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  </div>

  <div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
    <div class="drawer__scrim"></div>
    <div class="drawer__panel">
      <div class="drawer__head">
        <div><h3>Your bag</h3><span class="tiny" id="drawer-count">0 items</span></div>
        <button class="icon-btn" data-act="close-drawer" aria-label="Close bag">${icons.close}</button>
      </div>
      <div class="drawer__body" id="drawer-body"></div>
      <div class="drawer__foot">
        <div class="summary__total" style="margin:0;padding:0;border:0"><span>Subtotal</span><b id="drawer-subtotal">$0</b></div>
        <p class="tiny">Duties and insured delivery calculated at checkout</p>
        <a class="btn btn--gold btn--block" href="#/cart" data-act="close-drawer">View bag</a>
        <a class="btn btn--ghost btn--block" href="#/checkout" data-act="close-drawer">Checkout</a>
      </div>
    </div>
  </div>

  <div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">
    <div class="mobile-nav__scrim"></div>
    <div class="mobile-nav__panel">
      <div style="display:flex;justify-content:space-between;align-items:center">
        ${logoMark('#/')}
        <button class="icon-btn" data-act="close-mobile" aria-label="Close menu">${icons.close}</button>
      </div>
      <nav class="mobile-nav__links" aria-label="Mobile">
        ${NAV.map(([, label, href]) => `<a href="${href}" data-act="close-mobile">${label}</a>`).join('')}
        <a href="#/cart" data-act="close-mobile">Cart</a>
        <a href="#/account" data-act="close-mobile">Account</a>
        <a href="#/track" data-act="close-mobile">Track order</a>
        <a href="#/wishlist" data-act="close-mobile">Wishlist</a>
      </nav>
      <div style="margin-top:var(--space-8)">
        <p class="tiny">Concierge</p>
        <p class="muted" style="font-size:var(--text-sm)">concierge@umar.com<br>+1 (212) 555-0148</p>
      </div>
    </div>
  </div>

  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-label="Quick view">
    <div class="modal__scrim"></div>
    <div class="modal__panel">
      <button class="icon-btn modal__close" data-act="close-modal" aria-label="Close">${icons.close}</button>
      <div id="modal-body"></div>
    </div>
  </div>

  <div class="tray" id="compare-tray">
    <div class="tray__thumbs" id="compare-tray-thumbs"></div>
    <span id="compare-tray-label">0 of 4 selected</span>
    <a class="btn btn--gold btn--sm" href="#/compare">Compare</a>
    <button class="icon-btn" data-act="clear-compare" aria-label="Clear comparison">${icons.close}</button>
  </div>
  <a class="whatsapp-float" href="https://wa.me/923257800500" target="_blank" rel="noopener noreferrer" aria-label="Chat with UMAR concierge on WhatsApp">
    <span class="whatsapp-float__ping" aria-hidden="true"></span>
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
      <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.36.66 4.56 1.8 6.44L4 29l7.7-1.76a11.98 11.98 0 0 0 4.32.8h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.86h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.57 1.05 1.08-4.46-.24-.38a9.85 9.85 0 0 1-1.51-5.43c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.16 1.04 7.04 2.92a9.87 9.87 0 0 1 2.9 7.02c0 5.48-4.46 9.94-9.94 9.94zm5.45-7.44c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.07 2.87 1.22 3.06.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/>
    </svg>
  </a>
  <div class="toasts" id="toasts" aria-live="polite"></div>`;
}

/* ==========================================================================
   Boot
   ========================================================================== */
function boot() {
  document.documentElement.dataset.theme = state.theme || 'dark';
  mountChrome();
  $$('[data-theme-icon]').forEach(
    (el) => (el.innerHTML = state.theme === 'dark' ? icons.sun : icons.moon)
  );
  subscribe(syncBadges);
  window.addEventListener('hashchange', render);
  render();
  syncBadges();
  onScrollFrame();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
