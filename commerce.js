/* ==========================================================================
   UMAR — commerce.js
   Cart, checkout, order confirmation, tracking, account
   ========================================================================== */

import { getProduct, catName, TRACK_STAGES } from './data.js';
import { state, money, totals, cartLines, allOrders, findOrder } from './store.js';
import { icons, qtyControl, emptyState, crumbs, trustRow, newsletter, stars } from './ui.js';

/* ==========================================================================
   CART
   ========================================================================== */
export function cart() {
  const lines = cartLines();
  if (!lines.length) {
    return `
    <header class="page-head"><div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Shopping bag' }])}
      <h1 class="page-head__title">Your bag</h1>
    </div></header>
    <section class="section"><div class="wrap">${emptyState(
      'Your bag is empty',
      'Once you add a piece it will appear here with duties and delivery calculated.',
      '<a class="btn btn--gold" href="#/shop">Browse the collection</a>'
    )}</div></section>
    ${trustRow()}`;
  }

  const t = totals();

  return `
  <header class="page-head"><div class="wrap">
    ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Shopping bag' }])}
    <h1 class="page-head__title">Your bag</h1>
    <p>${lines.length} line${lines.length > 1 ? 's' : ''} · held for 60 minutes. Duties and insured delivery are calculated below.</p>
  </div></header>

  <div class="wrap">
    <div class="cart-layout">
      <div>
        ${lines
          .map(
            (l) => `
          <div class="line" data-line="${l.id}">
            <a href="#/product/${l.id}"><img class="line__img" src="${l.product.img}" alt="${l.product.name}" loading="lazy"></a>
            <div>
              <span class="line__cat">${catName(l.product.cat)}</span>
              <a class="line__name" href="#/product/${l.id}">${l.product.name}</a>
              <div style="margin-top:var(--space-1)"><span class="price">${money(l.product.price)}</span> each</div>
              <div class="line__ctrl">
                ${qtyControl(l.id, l.qty, true)}
                <button class="line__remove" data-act="remove" data-id="${l.id}">Remove</button>
                <button class="line__remove" data-act="wish" data-id="${l.id}">Move to wishlist</button>
              </div>
            </div>
            <div class="line__total">${money(l.product.price * l.qty)}</div>
          </div>`
          )
          .join('')}

        <div style="margin-top:var(--space-8);display:flex;gap:var(--space-3);flex-wrap:wrap">
          <a class="btn btn--ghost btn--sm" href="#/shop">Continue shopping</a>
          <button class="btn btn--ghost btn--sm" data-act="clear-cart">Empty bag</button>
        </div>
      </div>

      <aside class="summary">
        <h3>Order summary</h3>
        <div class="promo-code">
          <input class="input" id="coupon" placeholder="Promotion code" aria-label="Promotion code" value="${state.coupon || ''}">
          <button class="btn btn--ghost btn--sm" data-act="coupon">Apply</button>
        </div>
        <p class="tiny">Try UMAR10 or SHIPFREE</p>
        ${summaryRows(t)}
        <div style="margin-top:var(--space-6);display:grid;gap:var(--space-3)">
          <a class="btn btn--gold btn--block" href="#/checkout">${icons.lock} Secure checkout</a>
        </div>
        <div class="secure-note">${icons.shield}<span>256-bit TLS · Visa, Mastercard, Amex, Apple Pay &amp; cash on delivery</span></div>
      </aside>
    </div>
  </div>
  ${trustRow()}`;
}

function summaryRows(t) {
  return `
  <div>
    <div class="summary__row"><span>Subtotal</span><b>${money(t.subtotal)}</b></div>
    ${t.discount ? `<div class="summary__row"><span>Discount (${t.coupon.label})</span><b style="color:var(--color-accent)">−${money(t.discount)}</b></div>` : ''}
    <div class="summary__row"><span>Insured delivery</span><b>${t.shipping ? money(t.shipping) : 'Complimentary'}</b></div>
    ${t.codFee ? `<div class="summary__row"><span>Cash on delivery handling</span><b>${money(t.codFee)}</b></div>` : ''}
    <div class="summary__row"><span>Estimated duties &amp; tax</span><b>${money(t.duties)}</b></div>
    <div class="summary__total"><span>Total</span><b>${money(t.total)}</b></div>
  </div>`;
}

/* ==========================================================================
   CHECKOUT
   ========================================================================== */
export function checkout(step = 1) {
  const lines = cartLines();
  if (!lines.length) {
    return `
    <header class="page-head"><div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Checkout' }])}
      <h1 class="page-head__title">Checkout</h1>
    </div></header>
    <section class="section"><div class="wrap">${emptyState(
      'Nothing to check out',
      'Add a piece to your bag and the checkout will open automatically.',
      '<a class="btn btn--gold" href="#/shop">Browse the collection</a>'
    )}</div></section>`;
  }

  const t = totals({ method: 'express' });

  return `
  <header class="page-head"><div class="wrap">
    ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Shopping bag', href: '#/cart' }, { label: 'Checkout' }])}
    <h1 class="page-head__title">Secure checkout</h1>
  </div></header>

  <div class="wrap" style="padding-top:var(--space-10)">
    <div class="steps" data-steps>
      ${['Information', 'Delivery', 'Payment']
        .map(
          (s, i) => `
        <div class="step ${i === 0 ? 'is-active' : ''}" data-step="${i + 1}"><i>${i + 1}</i>${s}</div>
        ${i < 2 ? '<span class="step__sep"></span>' : ''}`
        )
        .join('')}
    </div>

    <div class="cart-layout" style="padding-top:0">
      <form id="checkout-form" novalidate>
        <section class="panel" data-cstep="1">
          <h3>Customer information</h3>
          <div class="form-grid">
            <label class="field"><span>First name</span><input class="input" name="firstName" autocomplete="given-name" required><small class="field__error">Required</small></label>
            <label class="field"><span>Last name</span><input class="input" name="lastName" autocomplete="family-name" required><small class="field__error">Required</small></label>
            <label class="field"><span>Email</span><input class="input" type="email" name="email" autocomplete="email" placeholder="you@email.com" required><small class="field__error">Enter a valid email</small></label>
            <label class="field"><span>Phone</span><input class="input" type="tel" name="phone" autocomplete="tel" placeholder="+92 300 0000000" required><small class="field__error">Required</small></label>
          </div>
          <label class="check" style="margin-top:var(--space-5)"><input type="checkbox" name="news" checked><span>Send me new arrivals before public release</span></label>
        </section>

        <section class="panel" data-cstep="2" hidden>
          <h3>Shipping address</h3>
          <div class="form-grid">
            <label class="field span-2"><span>Street address</span><input class="input" name="address" autocomplete="street-address" required><small class="field__error">Required</small></label>
            <label class="field"><span>Apartment / floor</span><input class="input" name="address2" autocomplete="address-line2"></label>
            <label class="field"><span>City</span><input class="input" name="city" autocomplete="address-level2" required><small class="field__error">Required</small></label>
            <label class="field"><span>Postal code</span><input class="input" name="zip" autocomplete="postal-code" required><small class="field__error">Required</small></label>
            <label class="field"><span>Country</span>
              <select class="select" name="country">
                <option>Pakistan</option><option>United States</option><option>United Kingdom</option>
                <option>United Arab Emirates</option><option>Saudi Arabia</option><option>France</option>
                <option>Germany</option><option>Japan</option><option>Singapore</option><option>Australia</option>
              </select>
            </label>
            <label class="field span-2"><span>Delivery note (optional)</span><textarea class="textarea" name="note" rows="2" placeholder="Gift wrapping, engraving initials, concierge instructions…"></textarea></label>
          </div>

          <h3 style="margin-top:var(--space-8)">Delivery method</h3>
          <label class="pay-option">
            <input type="radio" name="method" value="express" checked>
            <div><b>Insured express — 2–3 business days</b><span>$45, complimentary above $2,500. Signature required.</span></div>
          </label>
          <label class="pay-option">
            <input type="radio" name="method" value="standard">
            <div><b>Standard — 4–7 business days</b><span>Complimentary on every order, fully insured.</span></div>
          </label>
        </section>

        <section class="panel" data-cstep="3" hidden>
          <h3>Payment</h3>
          <label class="pay-option">
            <input type="radio" name="payment" value="card" checked>
            <div><b>Credit or debit card</b><span>Visa, Mastercard, American Express — processed over 256-bit TLS</span></div>
          </label>
          <div class="pay-fields" data-card-fields>
            <label class="field" style="grid-column:1/-1"><span>Card number</span><input class="input" name="card" inputmode="numeric" placeholder="4242 4242 4242 4242" autocomplete="cc-number"><small class="field__error">Enter 16 digits</small></label>
            <label class="field"><span>Name on card</span><input class="input" name="cardName" autocomplete="cc-name"></label>
            <label class="field"><span>Expiry</span><input class="input" name="exp" placeholder="MM/YY" autocomplete="cc-exp"></label>
            <label class="field"><span>CVC</span><input class="input" name="cvc" inputmode="numeric" placeholder="123" autocomplete="cc-csc"></label>
          </div>

          <label class="pay-option">
            <input type="radio" name="payment" value="wallet">
            <div><b>Apple Pay / Google Pay</b><span>Authenticate with your device — no card details stored</span></div>
          </label>
          <label class="pay-option">
            <input type="radio" name="payment" value="bank">
            <div><b>Bank transfer</b><span>Instructions issued on confirmation. Dispatch on clearance.</span></div>
          </label>
          <label class="pay-option">
            <input type="radio" name="payment" value="cod">
            <div><b>Cash on delivery</b><span>Selected markets, orders under $2,000 · $12 handling fee</span></div>
          </label>

          <div class="secure-note">${icons.lock}<span>This is a demonstration storefront. No payment is captured and no card data leaves your browser.</span></div>
        </section>

        <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap">
          <button class="btn btn--ghost" type="button" data-act="co-back" hidden>Back</button>
          <button class="btn btn--gold" type="button" data-act="co-next">Continue to delivery</button>
        </div>
      </form>

      <aside class="summary">
        <h3>Order summary</h3>
        <div style="max-height:18rem;overflow-y:auto;margin-bottom:var(--space-4)">
          ${lines
            .map(
              (l) => `
            <div class="mini-line">
              <img src="${l.product.img}" alt="${l.product.name}" loading="lazy">
              <div><div class="mini-line__name">${l.product.name}</div><div class="mini-line__meta">Qty ${l.qty} · ${money(l.product.price)}</div></div>
              <div>${money(l.product.price * l.qty)}</div>
            </div>`
            )
            .join('')}
        </div>
        <div data-co-summary>${summaryRows(t)}</div>
        <div class="secure-note">${icons.shield}<span>Fully insured in transit · 30-day returns · serialised certificate included</span></div>
        <div class="footer__pay" style="margin-top:var(--space-4)">
          <span class="pay-chip">Visa</span><span class="pay-chip">Mastercard</span>
          <span class="pay-chip">Amex</span><span class="pay-chip">Apple Pay</span><span class="pay-chip">COD</span>
        </div>
      </aside>
    </div>
  </div>`;
}

export const checkoutSummary = (t) => summaryRows(t);

/* ==========================================================================
   ORDER CONFIRMATION
   ========================================================================== */
export function confirmation(orderId) {
  const order = findOrder(orderId);
  if (!order) {
    return `<div class="wrap section">${emptyState(
      'Order not found',
      'This confirmation link has expired. Track any order from the tracking page.',
      '<a class="btn btn--gold" href="#/track">Track an order</a>'
    )}</div>`;
  }

  return `
  <div class="wrap">
    <div class="confirm">
      <div class="confirm__seal">${icons.check}</div>
      <h1>Thank you${order.name ? `, ${order.name.split(' ')[0]}` : ''}</h1>
      <p>
        Your order is confirmed. A receipt is on its way to ${order.email || 'your inbox'}, and our
        atelier will notify you the moment your piece is sealed and handed to the courier.
      </p>
      <div class="confirm__id">Order ${order.id}</div>

      <div class="order-card" style="margin-top:var(--space-10);text-align:left">
        <div class="kv"><span>Placed</span><b>${order.placed}</b></div>
        <div class="kv"><span>Estimated arrival</span><b>${order.eta}</b></div>
        <div class="kv"><span>Total paid</span><b>${money(order.total)}</b></div>
        <div class="kv"><span>Payment</span><b>${labelPayment(order.payment)}</b></div>
        <div class="kv" style="grid-column:1/-1"><span>Shipping to</span><b>${order.address || '—'}</b></div>
      </div>

      <div style="text-align:left">
        ${order.items
          .map((it) => {
            const p = getProduct(it.id);
            return p
              ? `<div class="mini-line">
                  <img src="${p.img}" alt="${p.name}" loading="lazy">
                  <div><div class="mini-line__name">${p.name}</div><div class="mini-line__meta">Qty ${it.qty}</div></div>
                  <div>${money(p.price * it.qty)}</div>
                </div>`
              : '';
          })
          .join('')}
      </div>

      <div style="margin-top:var(--space-10);display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap">
        <a class="btn btn--gold" href="#/track?id=${order.id}">Track this order</a>
        <a class="btn btn--ghost" href="#/shop">Continue shopping</a>
      </div>
    </div>
  </div>
  ${trustRow()}`;
}

const labelPayment = (p) =>
  ({ card: 'Card · ending 4242', wallet: 'Apple Pay', bank: 'Bank transfer', cod: 'Cash on delivery' }[p] ||
  'Card');

/* ==========================================================================
   TRACKING
   ========================================================================== */
export function track(id = '') {
  const order = id ? findOrder(id) : null;
  const demo = allOrders()[0];

  return `
  <header class="page-head"><div class="wrap">
    ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Order tracking' }])}
    <h1 class="page-head__title">Track your order</h1>
    <p>Enter the order reference from your confirmation email. Every UMAR shipment is insured and requires a signature.</p>
  </div></header>

  <section class="section">
    <div class="wrap">
      <form class="track-form" data-form="track" novalidate>
        <input class="input" name="id" value="${id}" placeholder="UMR-0000-0000" aria-label="Order reference" required>
        <button class="btn btn--gold" type="submit">Track order</button>
      </form>
      <p class="tiny" style="margin-top:var(--space-3)">Try the sample reference ${demo ? demo.id : ''}</p>

      <div data-track-result style="margin-top:var(--space-10)">
        ${
          id
            ? order
              ? trackPanel(order)
              : emptyState(
                  'No order under that reference',
                  'Check the reference from your confirmation email, or contact the concierge and we will locate it.',
                  '<a class="btn btn--ghost btn--sm" href="#/contact">Contact concierge</a>'
                )
            : ''
        }
      </div>
    </div>
  </section>
  ${trustRow()}`;
}

export function trackPanel(order) {
  return `
  <div class="order-card reveal is-in">
    <div class="kv"><span>Order</span><b>${order.id}</b></div>
    <div class="kv"><span>Placed</span><b>${order.placed}</b></div>
    <div class="kv"><span>Status</span><b style="color:var(--color-accent)">${order.status}</b></div>
    <div class="kv"><span>Estimated arrival</span><b>${order.eta}</b></div>
    <div class="kv"><span>Carrier</span><b>${order.carrier}</b></div>
    <div class="kv"><span>Destination</span><b>${order.address}</b></div>
  </div>

  <div class="cart-layout" style="padding-top:0">
    <div class="panel">
      <h3>Shipment progress</h3>
      <div class="timeline">
        ${TRACK_STAGES.map(
          (s, i) => `
          <div class="tl ${i < order.stage ? 'is-done' : ''} ${i === order.stage ? 'is-current is-done' : ''}">
            <div class="tl__dot"><i></i></div>
            <div>
              <b>${s.name}</b>
              <span>${i <= order.stage ? 'Completed' : 'Pending'}</span>
              <p>${s.note}</p>
            </div>
          </div>`
        ).join('')}
      </div>
    </div>

    <aside class="panel">
      <h3>In this shipment</h3>
      ${order.items
        .map((it) => {
          const p = getProduct(it.id);
          return p
            ? `<div class="mini-line">
                <img src="${p.img}" alt="${p.name}" loading="lazy">
                <div><div class="mini-line__name">${p.name}</div><div class="mini-line__meta">Qty ${it.qty}</div></div>
                <div>${money(p.price * it.qty)}</div>
              </div>`
            : '';
        })
        .join('')}
      <div class="summary__total"><span>Order total</span><b>${money(order.total)}</b></div>
      <div style="margin-top:var(--space-5);display:grid;gap:var(--space-3)">
        <a class="btn btn--ghost btn--sm btn--block" href="#/contact">Contact concierge</a>
      </div>
    </aside>
  </div>`;
}

/* ==========================================================================
   ACCOUNT
   ========================================================================== */
export function account(tab = 'orders') {
  const user = state.user;
  if (!user) return accountAuth();

  const orders = allOrders();
  const tabs = { orders: 'Orders', profile: 'Profile', addresses: 'Addresses', wishlist: 'Wishlist' };

  const panels = {
    orders: orders.length
      ? orders
          .map(
            (o) => `
        <div class="order-row">
          <div class="kv"><span>Order</span><b>${o.id}</b></div>
          <div class="kv"><span>Placed</span><b>${o.placed}</b></div>
          <div class="kv"><span>Total</span><b>${money(o.total)}</b></div>
          <span class="pill ${o.stage >= 4 ? 'pill--done' : 'pill--live'}">${o.status}</span>
          <a class="btn btn--ghost btn--sm" href="#/track?id=${o.id}">Track</a>
        </div>`
          )
          .join('')
      : emptyState('No orders yet', 'Your order history will appear here.', '<a class="btn btn--gold" href="#/shop">Start shopping</a>'),

    profile: `
      <div class="panel">
        <h3>Profile</h3>
        <div class="form-grid">
          <label class="field"><span>Name</span><input class="input" value="${user.name}"></label>
          <label class="field"><span>Email</span><input class="input" value="${user.email}"></label>
          <label class="field"><span>Phone</span><input class="input" value="+92 300 1234567"></label>
          <label class="field"><span>Preferred currency</span><select class="select"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>AED (د.إ)</option></select></label>
        </div>
        <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap">
          <button class="btn btn--gold btn--sm" data-act="save-profile" type="button">Save changes</button>
          <button class="btn btn--ghost btn--sm" data-act="signout" type="button">Sign out</button>
        </div>
      </div>`,

    addresses: `
      <div class="panel">
        <h3>Saved addresses</h3>
        <div class="boutique"><b>Default · Home</b><p>Kohsar Block, F-6 Markaz, Islamabad 44000, Pakistan</p></div>
        <div class="boutique"><b>Office</b><p>Blue Area, Jinnah Avenue, Islamabad 44000, Pakistan</p></div>
        <div style="margin-top:var(--space-6)"><button class="btn btn--ghost btn--sm" data-act="add-address" type="button">Add an address</button></div>
      </div>`,

    wishlist: state.wishlist.length
      ? `<div class="panel"><h3>Saved pieces</h3>${state.wishlist
          .map(getProduct)
          .filter(Boolean)
          .map(
            (p) => `
        <div class="mini-line">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <div><div class="mini-line__name">${p.name}</div><div class="mini-line__meta">${money(p.price)} · ${catName(p.cat)}</div></div>
          <button class="btn btn--ghost btn--sm" data-act="add" data-id="${p.id}">Add to bag</button>
        </div>`
          )
          .join('')}</div>`
      : emptyState('Wishlist empty', 'Save pieces with the heart icon to find them here.', '<a class="btn btn--gold" href="#/shop">Browse</a>'),
  };

  return `
  <header class="page-head"><div class="wrap">
    ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Account' }])}
    <h1 class="page-head__title">Welcome back, ${user.name.split(' ')[0]}</h1>
    <p>Client since 2024 · ${orders.length} orders · Private List member</p>
  </div></header>

  <div class="wrap">
    <div class="acct">
      <nav class="acct__nav" aria-label="Account sections">
        ${Object.entries(tabs)
          .map(
            ([k, v]) =>
              `<button data-act="acct-tab" data-tab="${k}" aria-current="${k === tab}">${v}</button>`
          )
          .join('')}
      </nav>
      <div>${panels[tab] || panels.orders}</div>
    </div>
  </div>
  ${newsletter()}`;
}

function accountAuth() {
  return `
  <header class="page-head"><div class="wrap">
    ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Account' }])}
    <h1 class="page-head__title">Client account</h1>
    <p>Sign in to follow orders, keep your wishlist, and receive private-release invitations.</p>
  </div></header>

  <div class="wrap">
    <div class="contact-grid">
      <div class="reveal">
        <form class="panel" data-form="signin" novalidate>
          <h3>Sign in</h3>
          <div class="form-grid">
            <label class="field span-2"><span>Email</span><input class="input" type="email" name="email" value="demo@umar.com" required><small class="field__error">Enter a valid email</small></label>
            <label class="field span-2"><span>Password</span><input class="input" type="password" name="password" value="demo1234" required><small class="field__error">Required</small></label>
          </div>
          <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center">
            <button class="btn btn--gold" type="submit">Sign in</button>
            <span class="tiny">Demo credentials are pre-filled</span>
          </div>
        </form>
      </div>
      <div class="reveal">
        <div class="panel">
          <h3>Client privileges</h3>
          <ul class="assure" style="border:0;padding:0;background:none">
            <li>${icons.spark}<span>Forty-eight-hour early access to limited releases</span></li>
            <li>${icons.gift}<span>Complimentary engraving and signature gift packaging</span></li>
            <li>${icons.truck}<span>Priority insured delivery on every order</span></li>
            <li>${icons.shield}<span>Lifetime repair register tied to your account</span></li>
            <li>${icons.user}<span>A named concierge, reachable within two hours</span></li>
          </ul>
          <div style="margin-top:var(--space-6)">${stars(4.8, 12400)}</div>
        </div>
      </div>
    </div>
  </div>
  ${trustRow()}`;
}
