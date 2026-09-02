/* ==========================================================================
   UMAR — ui.js
   Icons and reusable component markup
   ========================================================================== */

import { money, pctOff, stockLabel, inWishlist, inCompare } from './store.js';
import { catName } from './data.js';

const s = (d, extra = '') =>
  `<svg width="18" height="18" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;

export const icons = {
  search: s('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/>'),
  heart: s('<path d="M12 20s-7-4.6-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7-2.6c0 4.8-7 14.6-7 14.6z"/>'),
  heartFull:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.4S4.2 15.4 4.2 10.2A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.8 2.8c0 5.2-7.8 10.2-7.8 10.2z"/></svg>',
  bag: s('<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8"/>'),
  user: s('<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4"/>'),
  compare: s('<path d="M4 7h7M4 17h7M17 4v16"/><path d="M14 8l3-3 3 3"/>'),
  sun: s('<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>'),
  moon: s('<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>'),
  menu: s('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: s('<path d="M6 6l12 12M18 6L6 18"/>'),
  chevron: s('<path d="M9 6l6 6-6 6"/>'),
  plus: s('<path d="M12 5v14M5 12h14"/>'),
  minus: s('<path d="M5 12h14"/>'),
  check: s('<path d="M20 6L9 17l-5-5"/>'),
  shield: s('<path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>'),
  truck: s('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>'),
  gift: s('<path d="M4 10h16v10H4zM4 10l2-4h5l1 4M20 10l-2-4h-5l-1 4M12 10v10"/>'),
  refresh: s('<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4h-4"/>'),
  lock: s('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>'),
  eye: s('<path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.6"/>'),
  spark: s('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>'),
  pin: s('<path d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10z"/><circle cx="12" cy="11" r="2.2"/>'),
  mail: s('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3.5 7.5L12 13l8.5-5.5"/>'),
  phone: s('<path d="M6 3h3l1.6 4-2 1.4a11 11 0 0 0 5 5L15 11.4 19 13v3a2 2 0 0 1-2.2 2A15 15 0 0 1 4 5.2A2 2 0 0 1 6 3z"/>'),
  box: s('<path d="M4 8l8-4 8 4v8l-8 4-8-4V8z"/><path d="M4 8l8 4 8-4M12 12v8"/>'),
};

export const logoSVG = `
<svg viewBox="0 0 44 44" aria-hidden="true">
  <path d="M6 7.5h32" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M11 13v11.5a11 11 0 0 0 22 0V13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M22 30.5v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M22 36.5l2.2 2.2L22 40.9l-2.2-2.2z" fill="currentColor"/>
</svg>`;

export const logoMark = (href = '#/') => `
<a class="logo" href="${href}" aria-label="UMAR — home">
  ${logoSVG}
  <span>
    <span class="logo__word">UMAR</span>
    <span class="logo__sub">Maison de Luxe</span>
  </span>
</a>`;

/* ---------------- Stars ---------------- */
export function stars(rating, count) {
  const pct = (rating / 5) * 100;
  return `<span class="stars" aria-label="${rating} out of 5">
    <span class="stars__row">★★★★★<span class="stars__fill" style="width:${pct}%">★★★★★</span></span>
    ${count != null ? `<span class="stars__n">${rating.toFixed(1)} (${count.toLocaleString('en-US')})</span>` : ''}
  </span>`;
}

/* ---------------- Product card ---------------- */
export function productCard(p, i = 0) {
  const off = pctOff(p);
  const st = stockLabel(p);
  const out = p.stock === 0;
  const flags = [];
  if (off) flags.push(`<span class="flag flag--sale">−${off}%</span>`);
  if (p.new) flags.push('<span class="flag flag--new">New</span>');
  if (p.limited) flags.push('<span class="flag flag--new">Limited</span>');
  if (p.bestseller) flags.push('<span class="flag">Bestseller</span>');
  if (out) flags.push('<span class="flag flag--out">Sold out</span>');

  return `
  <article class="pcard reveal tilt" data-id="${p.id}" style="--reveal-delay:${Math.min(i, 7) * 55}ms">
    <div class="pcard__media">
      <a href="#/product/${p.id}" aria-label="${p.name}">
        <img class="pcard__main" src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="800" height="1000">
        <img class="pcard__alt" src="${p.images[1]}" alt="" loading="lazy" decoding="async" aria-hidden="true">
      </a>
      <div class="pcard__flags">${flags.join('')}</div>
      <div class="pcard__tools">
        <button class="pcard__tool ${inWishlist(p.id) ? 'is-active' : ''}" data-act="wish" data-id="${p.id}"
          aria-label="Save ${p.name} to wishlist" aria-pressed="${inWishlist(p.id)}">${icons.heart}</button>
        <button class="pcard__tool ${inCompare(p.id) ? 'is-active' : ''}" data-act="compare" data-id="${p.id}"
          aria-label="Compare ${p.name}" aria-pressed="${inCompare(p.id)}">${icons.compare}</button>
        <button class="pcard__tool" data-act="quickview" data-id="${p.id}" aria-label="Quick view ${p.name}">${icons.eye}</button>
      </div>
      <div class="pcard__quick">
        <button class="btn btn--sm" data-act="add" data-id="${p.id}" ${out ? 'aria-disabled="true"' : ''}>
          ${out ? 'Notify me' : 'Add to bag'}
        </button>
      </div>
    </div>
    <div class="pcard__body">
      <span class="pcard__cat">${catName(p.cat)}</span>
      <h3 class="pcard__name"><a href="#/product/${p.id}">${p.name}</a></h3>
      ${stars(p.rating, p.reviews)}
      <div class="pcard__foot">
        <span class="price">${money(p.price)}</span>
        ${p.was ? `<span class="price--was">${money(p.was)}</span><span class="price--off">Save ${money(p.was - p.price)}</span>` : ''}
      </div>
      <span class="stock ${st.cls}">${st.text}</span>
    </div>
  </article>`;
}

/* ---------------- Small pieces ---------------- */
export const qtyControl = (id, qty, small = false) => `
<div class="qty ${small ? 'qty--sm' : ''}">
  <button data-act="qty-dec" data-id="${id}" aria-label="Decrease quantity">${icons.minus}</button>
  <input type="text" inputmode="numeric" value="${qty}" data-act="qty-set" data-id="${id}" aria-label="Quantity">
  <button data-act="qty-inc" data-id="${id}" aria-label="Increase quantity">${icons.plus}</button>
</div>`;

export const emptyState = (title, body, cta) => `
<div class="empty">
  ${icons.box}
  <h3>${title}</h3>
  <p>${body}</p>
  ${cta || ''}
</div>`;

export const crumbs = (trail) =>
  `<nav class="crumbs" aria-label="Breadcrumb">` +
  trail
    .map((t, i) =>
      t.href
        ? `<a href="${t.href}">${t.label}</a>${i < trail.length - 1 ? '<span>/</span>' : ''}`
        : `<span>${t.label}</span>`
    )
    .join('') +
  `</nav>`;

export const trustRow = () => `
<section class="trust">
  <div class="wrap">
    <div class="trust__grid">
      <div class="trust__item">${icons.truck}<div><b>Insured worldwide delivery</b><span>Free above $2,500 · 2–5 business days</span></div></div>
      <div class="trust__item">${icons.shield}<div><b>Certified authenticity</b><span>Serialised and hallmarked at the atelier</span></div></div>
      <div class="trust__item">${icons.refresh}<div><b>30-day returns</b><span>Collection arranged by our concierge</span></div></div>
      <div class="trust__item">${icons.gift}<div><b>Signature packaging</b><span>Complimentary gifting and engraving</span></div></div>
    </div>
  </div>
</section>`;

export const newsletter = () => `
<section class="newsletter section--tight section">
  <div class="newsletter__bg"><img src="img/texture-silk.webp" alt="" loading="lazy" decoding="async"></div>
  <div class="wrap">
    <div class="newsletter__inner reveal">
      <p class="eyebrow">The Private List</p>
      <h2 class="newsletter__title">First access to new arrivals</h2>
      <p class="muted" style="margin-top:var(--space-4);font-size:var(--text-sm)">
        Limited editions are released to our list forty-eight hours before they reach the boutique.
        One considered email a month, never more.
      </p>
      <form data-form="newsletter" novalidate>
        <input class="input" type="email" name="email" placeholder="your@email.com" aria-label="Email address" required>
        <button class="btn btn--gold" type="submit">Join the list</button>
      </form>
      <p class="tiny" style="margin-top:var(--space-4)">No resale of data. Unsubscribe in one click.</p>
    </div>
  </div>
</section>`;
