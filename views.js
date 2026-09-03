/* ==========================================================================
    UMAR — views.js
    Storefront views: home, categories, shop, product, about, contact,
    wishlist, comparison
    ========================================================================== */

import {
  PRODUCTS,
  CATEGORIES,
  TESTIMONIALS,
  REVIEWS,
  getProduct,
  catName,
  countIn,
  priceBounds,
} from './data.js';
import {
  state,
  money,
  pctOff,
  stockLabel,
  inWishlist,
  inCompare,
} from './store.js';
import {
  icons,
  stars,
  productCard,
  qtyControl,
  emptyState,
  crumbs,
  trustRow,
  newsletter,
} from './ui.js';

/* ==========================================================================
    HOME
    ========================================================================== */
export function home() {
  const featured = ['p01', 'p05', 'p09', 'p17', 'p13', 'p21', 'p02', 'p23'].map(getProduct);
  const arrivals = PRODUCTS.filter((p) => p.new || p.limited).concat(
    PRODUCTS.filter((p) => p.bestseller)
  );

  return `
  <section class="hero" id="hero">
    <div class="hero__media" data-parallax="0.18">
      <img src="hero.webp" alt="A gold chronograph, black crystal flacon and folded calfskin arranged on dark marble under cinematic light" width="1536" height="1024" fetchpriority="high" decoding="async">
    </div>
    <div class="hero__veil"></div>
    <div class="wrap"><div class="hero__inner">
      <p class="eyebrow">Est. 2014 · Geneva · Florence · New York</p>
      <h1 class="hero__title">Objects made<br>to be <em>inherited</em></h1>
      <p class="hero__lede">
        UMAR is a modern maison working across timepieces, fragrance, leather and fine
        jewelry. Every piece is finished by hand, serialised, and guaranteed for life.
      </p>
      <div class="hero__cta">
        <a class="btn btn--gold" href="#/shop">Explore the collection</a>
        <a class="btn btn--ghost" href="#/about">The atelier</a>
      </div>
      <div class="hero__stats">
        <div class="hero__stat"><b>24</b><span>Signature pieces</span></div>
        <div class="hero__stat"><b>68</b><span>Countries served</span></div>
        <div class="hero__stat"><b>4.8/5</b><span>12,400 reviews</span></div>
      </div>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true"><i></i><span>Scroll</span></div>
  </section>

  ${trustRow()}

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow">The Collections</p>
          <h2 class="section-head__title">Six disciplines, one standard</h2>
          <p>Each category is produced in a single specialist workshop rather than outsourced by season.</p>
        </div>
        <a class="link-arrow" href="#/categories">All categories ${icons.chevron}</a>
      </div>
      <div class="cat-grid">
        ${CATEGORIES.map(
          (c, i) => `
          <a class="cat-card reveal tilt ${i === 0 ? 'cat-card--tall' : ''}" href="#/shop?cat=${c.id}" style="--reveal-delay:${i * 60}ms">
            <img src="${c.img}" alt="${c.name}" loading="lazy" decoding="async">
            <span class="cat-card__scrim"></span>
            <div class="cat-card__body">
              <span class="cat-card__count">${countIn(c.id)} pieces</span>
              <h3 class="cat-card__name">${c.name}</h3>
              <p class="cat-card__desc">${c.desc}</p>
            </div>
          </a>`
        ).join('')}
      </div>
    </div>
  </section>

  <section class="section" id="featured">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow">Signature Selection</p>
          <h2 class="section-head__title">The pieces we are known for</h2>
        </div>
        <a class="link-arrow" href="#/shop">Shop all 24 ${icons.chevron}</a>
      </div>
      <div class="product-grid">
        ${featured.map((p, i) => productCard(p, i)).join('')}
      </div>
    </div>
  </section>

  <section class="section--tight section">
    <div class="wrap">
      <div class="promo reveal">
        <div class="promo__bg"><img src="promo-banner.webp" alt="" loading="lazy" decoding="async"></div>
        <div class="promo__body">
          <p class="eyebrow">Autumn Private Sale</p>
          <h2 class="promo__title">Up to 15% on <em>selected</em> archive pieces</h2>
          <p>
            A short window on discontinued references and single-hide leathers. Once a
            piece leaves the archive it is not reproduced.
          </p>
          <div class="promo__timer" data-countdown role="timer" aria-label="Offer countdown">
            <div class="promo__unit"><b data-unit="d">00</b><span>Days</span></div>
            <div class="promo__unit"><b data-unit="h">00</b><span>Hours</span></div>
            <div class="promo__unit"><b data-unit="m">00</b><span>Minutes</span></div>
            <div class="promo__unit"><b data-unit="s">00</b><span>Seconds</span></div>
          </div>
          <div class="hero__cta">
            <a class="btn btn--gold" href="#/shop?sale=1">Shop the sale</a>
            <a class="btn btn--ghost" href="#/shop?sort=new">New arrivals</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow">New & Limited</p>
          <h2 class="section-head__title">Recently released</h2>
        </div>
      </div>
      <div class="product-grid">
        ${arrivals.slice(0, 4).map((p, i) => productCard(p, i)).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="split">
        <div class="split__media reveal reveal--mask">
          <img src="packaging.webp" alt="A UMAR order boxed in signature packaging with a ribbon and certificate" loading="lazy" decoding="async">
        </div>
        <div class="reveal">
          <p class="eyebrow">About UMAR</p>
          <h2 class="split__title">A house built on patience</h2>
          <p>
            UMAR began in 2014 with a single premise: that a small house, working directly
            with the best workshops in Europe, could hold a higher standard than a
            conglomerate ever could. Twelve years later we still produce fewer than
            forty thousand pieces a year, and every one of them is inspected by a person
            whose name is recorded against it.
          </p>
          <ul class="value-list" role="list">
            <li><i>I</i><div><b>Made by hand, verified by name</b><span>Each piece carries the initials of the artisan who finished it.</span></div></li>
            <li><i>II</i><div><b>Guaranteed for life</b><span>Repair, not replace. Our workshops service every reference we have ever sold.</span></div></li>
            <li><i>III</i><div><b>Traceable materials</b><span>Gold refined from certified sources, hides from tanneries we audit annually.</span></div></li>
          </ul>
          <div style="margin-top:var(--space-8)"><a class="link-arrow" href="#/about">Read our story ${icons.chevron}</a></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow">Client Voices</p>
          <h2 class="section-head__title">Trusted in 68 countries</h2>
        </div>
        <div class="stars" style="gap:var(--space-3)">${stars(4.8, 12400)}</div>
      </div>
      <div class="quote-grid">
        ${TESTIMONIALS.map(
          (t, i) => `
          <figure class="quote reveal tilt" style="--reveal-delay:${i * 70}ms">
            <span class="eyebrow">${icons.spark}</span>
            <blockquote>"${t.quote}"</blockquote>
            <figcaption><b>${t.name}</b>${t.role}</figcaption>
          </figure>`
        ).join('')}
      </div>
      <div class="stat-strip reveal" style="margin-top:var(--space-16)">
        <div><b>4.8/5</b><span>Average rating</span></div>
        <div><b>98%</b><span>Would buy again</span></div>
        <div><b>&lt;2h</b><span>Concierge response</span></div>
        <div><b>Lifetime</b><span>Repair guarantee</span></div>
      </div>
    </div>
  </section>

  ${newsletter()}`;
}

/* ==========================================================================
    CATEGORIES
    ========================================================================== */
export function categories() {
  return `
  <header class="page-head">
    <div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Categories' }])}
      <h1 class="page-head__title">Categories</h1>
      <p>Six disciplines, each produced in a dedicated workshop. Choose a house to begin.</p>
    </div>
  </header>
  <section class="section">
    <div class="wrap">
      <div class="cat-grid">
        ${CATEGORIES.map(
          (c, i) => `
          <a class="cat-card cat-card--tall reveal tilt" href="#/shop?cat=${c.id}" style="--reveal-delay:${i * 60}ms">
            <img src="${c.img}" alt="${c.name}" loading="lazy" decoding="async">
            <span class="cat-card__scrim"></span>
            <div class="cat-card__body">
              <span class="cat-card__count">${countIn(c.id)} pieces · from ${money(
                Math.min(...PRODUCTS.filter((p) => p.cat === c.id).map((p) => p.price))
              )}</span>
              <h3 class="cat-card__name">${c.name}</h3>
              <p class="cat-card__desc">${c.desc}</p>
            </div>
          </a>`
        ).join('')}
      </div>
    </div>
  </section>
  ${trustRow()}
  ${newsletter()}`;
}

/* ==========================================================================
    SHOP
    ========================================================================== */
const SORTS = {
  featured: 'Featured',
  new: 'Newest first',
  'price-asc': 'Price: low to high',
  'price-desc': 'Price: high to low',
  rating: 'Highest rated',
  discount: 'Biggest saving',
};

export function shop(query = {}) {
  let [min, max] = priceBounds();
  min = Math.floor(min / 100) * 100;
  max = Math.ceil(max / 100) * 100;
  const cats = (query.cat || '').split(',').filter(Boolean);
  const maxPrice = Number(query.max || max);
  const sort = query.sort || 'featured';
  const q = (query.q || '').toLowerCase();

  return `
  <header class="page-head">
    <div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Shop' }])}
      <h1 class="page-head__title">${cats.length === 1 ? catName(cats[0]) : 'The Collection'}</h1>
      <p>${
        cats.length === 1
          ? CATEGORIES.find((c) => c.id === cats[0]).desc
          : 'Twenty-four pieces across six disciplines. Filter by house, price or availability.'
      }</p>
    </div>
  </header>

  <div class="wrap">
    <div class="shop">
      <aside>
        <button class="btn btn--ghost btn--sm filters-toggle" data-act="toggle-filters" aria-expanded="false">
          ${icons.compare} Filters &amp; sorting
        </button>
        <form class="filters" id="filters" data-filters>
          <div class="filter-group">
            <h4>Search</h4>
            <input class="input" type="search" name="q" value="${q}" placeholder="Search pieces…" aria-label="Search products">
          </div>
          <div class="filter-group">
            <h4>Category</h4>
            ${CATEGORIES.map(
              (c) => `
              <label class="check">
                <input type="checkbox" name="cat" value="${c.id}" ${cats.includes(c.id) ? 'checked' : ''}>
                <span>${c.name}</span><span class="n">${countIn(c.id)}</span>
              </label>`
            ).join('')}
          </div>
          <div class="filter-group">
            <h4>Maximum price</h4>
            <div class="range">
              <input type="range" name="max" min="${min}" max="${max}" step="10" value="${maxPrice}" aria-label="Maximum price">
              <div class="range__out"><span>${money(min)}</span><span data-out="max">${money(maxPrice)}</span></div>
            </div>
          </div>
          <div class="filter-group">
            <h4>Availability</h4>
            <label class="check"><input type="checkbox" name="instock" ${query.instock ? 'checked' : ''}><span>In stock only</span></label>
            <label class="check"><input type="checkbox" name="sale" ${query.sale ? 'checked' : ''}><span>On sale</span></label>
            <label class="check"><input type="checkbox" name="newonly" ${query.newonly ? 'checked' : ''}><span>New &amp; limited</span></label>
          </div>
          <button class="btn btn--ghost btn--sm btn--block" type="reset" data-act="reset-filters">Clear all</button>
        </form>
      </aside>

      <div>
        <div class="shop__bar">
          <span class="shop__count" data-count>Loading…</span>
          <label class="sr-only" for="sort">Sort</label>
          <select class="select" id="sort" name="sort" data-sort>
            ${Object.entries(SORTS)
              .map(([k, v]) => `<option value="${k}" ${sort === k ? 'selected' : ''}>${v}</option>`)
              .join('')}
          </select>
        </div>
        <div class="chips" data-chips></div>
        <div class="product-grid" data-results>
          ${Array.from({ length: 6 }, () => '<div class="skel skel--card"></div>').join('')}
        </div>
      </div>
    </div>
  </div>
  ${newsletter()}`;
}

export function filterProducts(query = {}) {
  const cats = (query.cat || '').split(',').filter(Boolean);
  const q = (query.q || '').toLowerCase().trim();
  const maxPrice = query.max ? Number(query.max) : Infinity;

  let list = PRODUCTS.filter((p) => {
    if (cats.length && !cats.includes(p.cat)) return false;
    if (p.price > maxPrice) return false;
    if (query.instock && p.stock === 0) return false;
    if (query.sale && !p.was) return false;
    if (query.newonly && !(p.new || p.limited)) return false;
    if (q) {
      const hay = `${p.name} ${catName(p.cat)} ${p.blurb}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const sorters = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    discount: (a, b) => pctOff(b) - pctOff(a),
    new: (a, b) => Number(!!b.new || !!b.limited) - Number(!!a.new || !!a.limited),
    featured: (a, b) => b.reviews * b.rating - a.reviews * a.rating,
  };
  list = [...list].sort(sorters[query.sort] || sorters.featured);
  return list;
}

/* ==========================================================================
    PRODUCT DETAIL
    ========================================================================== */
export function product(id) {
  const p = getProduct(id);
  if (!p) {
    return `<div class="wrap section">${emptyState(
      'Piece not found',
      'This reference may have left the archive. Browse the current collection instead.',
      '<a class="btn btn--gold" href="#/shop">Back to shop</a>'
    )}</div>`;
  }
  const st = stockLabel(p);
  const off = pctOff(p);
  const revs = REVIEWS[p.id] || [];
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    s,
    n: revs.filter((r) => r.stars === s).length,
  }));
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return `
  <div class="wrap" style="padding-top:var(--space-8)">
    ${crumbs([
      { label: 'Home', href: '#/' },
      { label: 'Shop', href: '#/shop' },
      { label: catName(p.cat), href: `#/shop?cat=${p.cat}` },
      { label: p.name },
    ])}
  </div>

  <div class="wrap">
    <div class="pdp">
      <div class="gallery" data-gallery>
        <div class="gallery__stage" data-stage>
          <img src="${p.images[0]}" alt="${p.name}" width="900" height="1125" decoding="async">
        </div>
        <div class="gallery__thumbs" role="tablist" aria-label="Product images">
          ${p.images
            .map(
              (src, i) => `
            <button class="gallery__thumb" role="tab" aria-selected="${i === 0}" data-act="thumb" data-src="${src}">
              <img src="${src}" alt="View ${i + 1} of ${p.name}" loading="lazy" decoding="async">
            </button>`
            )
            .join('')}
        </div>
        <p class="tiny" style="text-align:center">Hover the image to magnify</p>
      </div>

      <div class="pdp__info">
        <p class="eyebrow">${catName(p.cat)}${p.limited ? ' · Limited edition' : ''}</p>
        <h1 class="pdp__title">${p.name}</h1>
        <div class="pdp__meta">
          ${stars(p.rating, p.reviews)}
          <span class="stock ${st.cls}">${st.text}</span>
        </div>
        <div class="pdp__price">
          <span class="price">${money(p.price)}</span>
          ${p.was ? `<span class="price--was">${money(p.was)}</span><span class="price--off">−${off}% · save ${money(p.was - p.price)}</span>` : ''}
        </div>
        <p class="pdp__desc">${p.blurb}</p>

        <div class="pdp__buy">
          ${qtyControl(p.id, 1)}
          <button class="btn btn--gold" data-act="add-detail" data-id="${p.id}" ${p.stock === 0 ? 'aria-disabled="true"' : ''}>
            ${icons.bag} ${p.stock === 0 ? 'Sold out' : 'Add to bag'}
          </button>
          <button class="btn btn--ghost" data-act="buy-now" data-id="${p.id}" ${p.stock === 0 ? 'aria-disabled="true"' : ''}>Buy now</button>
        </div>

        <div class="pdp__sub">
          <button data-act="wish" data-id="${p.id}" class="${inWishlist(p.id) ? 'is-active' : ''}">${icons.heart} ${
            inWishlist(p.id) ? 'Saved' : 'Add to wishlist'
          }</button>
          <button data-act="compare" data-id="${p.id}" class="${inCompare(p.id) ? 'is-active' : ''}">${icons.compare} ${
            inCompare(p.id) ? 'In comparison' : 'Compare'
          }</button>
        </div>

        <ul class="assure" role="list">
          <li>${icons.truck}<span>Insured express delivery — complimentary above $2,500</span></li>
          <li>${icons.shield}<span>Serialised certificate of authenticity in the box</span></li>
          <li>${icons.refresh}<span>30-day returns, collection arranged for you</span></li>
          <li>${icons.gift}<span>Signature packaging and hand engraving on request</span></li>
        </ul>
      </div>
    </div>

    <div class="tabs" data-tabs>
      <div class="tabs__nav" role="tablist">
        <button role="tab" aria-selected="true" data-tab="details">Description</button>
        <button role="tab" aria-selected="false" data-tab="specs">Specification</button>
        <button role="tab" aria-selected="false" data-tab="ship">Shipping &amp; returns</button>
        <button role="tab" aria-selected="false" data-tab="reviews">Reviews (${p.reviews})</button>
      </div>

      <div class="tabs__panel" data-panel="details">
        <p>${p.desc}</p>
        <p style="margin-top:var(--space-5)">
          Every ${catName(p.cat).toLowerCase().replace(/s$/, '')} leaves our workshop with a serialised
          certificate, a care guide, and access to the lifetime service programme. Should you wish to
          have the piece engraved, our concierge will arrange it before dispatch at no cost.
        </p>
      </div>

      <div class="tabs__panel" data-panel="specs" hidden>
        <table class="spec-table">
          <tbody>
            ${Object.entries(p.specs)
              .map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`)
              .join('')}
            <tr><th scope="row">Reference</th><td>${p.id.toUpperCase()}-${p.cat.slice(0, 3).toUpperCase()}</td></tr>
          </tbody>
        </table>
      </div>

      <div class="tabs__panel" data-panel="ship" hidden>
        <p>
          Orders placed before 14:00 CET are dispatched the same working day. Express delivery is
          insured for the full value of the piece and requires a signature at handover.
        </p>
        <table class="spec-table" style="margin-top:var(--space-6)">
          <tbody>
            <tr><th scope="row">Express (2–3 days)</th><td>$45 — complimentary above $2,500</td></tr>
            <tr><th scope="row">Standard (4–7 days)</th><td>Complimentary on all orders</td></tr>
            <tr><th scope="row">Cash on delivery</th><td>Available in selected markets · $12 handling</td></tr>
            <tr><th scope="row">Returns</th><td>30 days, unworn, in original packaging</td></tr>
            <tr><th scope="row">Duties</th><td>Estimated at checkout, prepaid on your behalf</td></tr>
          </tbody>
        </table>
      </div>

      <div class="tabs__panel" data-panel="reviews" hidden>
        <div class="reviews">
          <aside class="review-summary">
            <b>${p.rating.toFixed(1)}</b>
            <div style="margin-top:var(--space-2)">${stars(p.rating)}</div>
            <p class="tiny" style="margin-top:var(--space-2)">${p.reviews} verified reviews</p>
            ${dist
              .map(
                (d) => `
              <div class="bar"><span>${d.s} ★</span><i style="--w:${
                  revs.length ? (d.n / revs.length) * 100 : 0
                }%"></i><span>${d.n}</span></div>`
              )
              .join('')}
          </aside>
          <div>
            ${revs
              .map(
                (r) => `
              <article class="review">
                <div class="review__head">
                  <span class="avatar">${r.name.split(' ')[0][0]}${r.name.split(' ')[1] ? r.name.split(' ')[1][0] : ''}</span>
                  <div>
                    <div class="review__name">${r.name} · ${r.country}</div>
                    ${r.verified ? '<span class="verified">Verified purchase</span>' : ''}
                  </div>
                  <span class="review__date">${r.date}</span>
                </div>
                <div style="margin-top:var(--space-3)">${stars(r.stars)}</div>
                <p>${r.text}</p>
              </article>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow">You may also consider</p>
          <h2 class="section-head__title">From the same house</h2>
        </div>
        <a class="link-arrow" href="#/shop?cat=${p.cat}">All ${catName(p.cat).toLowerCase()} ${icons.chevron}</a>
      </div>
      <div class="product-grid">${related.map((r, i) => productCard(r, i)).join('')}</div>
    </div>
  </section>
  ${trustRow()}`;
}

/* ==========================================================================
    ABOUT
    ========================================================================== */
export function about() {
  return `
  <header class="page-head">
    <div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'About' }])}
      <h1 class="page-head__title">About UMAR</h1>
      <p>A small house with three workshops, one standard, and a refusal to grow faster than our artisans can.</p>
    </div>
  </header>

  <section class="section">
    <div class="wrap">
      <div class="split">
        <div class="split__media reveal reveal--mask">
          <img src="atelier.webp" alt="An artisan finishing a component at a workbench" loading="lazy" decoding="async">
        </div>
        <div class="reveal">
          <p class="eyebrow">Our story</p>
          <h2 class="split__title">Founded on a single objection</h2>
          <p>
            In 2014 our founder was told that a watch could not be finished by hand and sold
            below five figures. UMAR exists to disprove that. By working directly with the
            workshops that supply the largest houses in Europe — and skipping the distributors,
            the licensing, and the seasonal churn — we deliver the same craft at a fraction
            of the customary markup.
          </p>
          <p>
            Today the house spans six disciplines. Movements are assembled in Geneva, leather is
            cut in Florence, fragrance is composed in Grasse, and every order is dispatched from
            our New York vault with a serialised certificate.
          </p>
        </div>
      </div>

      <div class="stat-strip reveal" style="margin-top:clamp(var(--space-16),7vw,var(--space-24))">
        <div><b>2014</b><span>Founded</span></div>
        <div><b>3</b><span>Owned workshops</span></div>
        <div><b>68</b><span>Countries served</span></div>
        <div><b>112</b><span>Artisans</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap wrap--narrow">
      <div class="section-head reveal" style="justify-content:center;text-align:center">
        <div>
          <p class="eyebrow">Our values</p>
          <h2 class="section-head__title">Four commitments, in writing</h2>
        </div>
      </div>
      <ul class="value-list reveal" role="list">
        <li><i>I</i><div><b>Repair before replace</b><span>Every reference we have ever sold remains serviceable in our workshops. Parts are held for a minimum of thirty years.</span></div></li>
        <li><i>II</i><div><b>Named accountability</b><span>The artisan who finishes a piece signs for it. Their initials appear on the movement, the lining, or the certificate.</span></div></li>
        <li><i>III</i><div><b>Traceable materials</b><span>Gold is refined from certified recycled and Fairmined sources. Hides come from four tanneries we audit in person each year.</span></div></li>
        <li><i>IV</i><div><b>Honest pricing</b><span>No seasonal markdown theatre. Prices move only when material costs do, and archive sales are genuine end-of-run.</span></div></li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow">Client voices</p>
          <h2 class="section-head__title">What is said about us</h2>
        </div>
      </div>
      <div class="quote-grid">
        ${TESTIMONIALS.map(
          (t, i) => `
          <figure class="quote reveal" style="--reveal-delay:${i * 70}ms">
            <span class="eyebrow">${icons.spark}</span>
            <blockquote>"${t.quote}"</blockquote>
            <figcaption><b>${t.name}</b>${t.role}</figcaption>
          </figure>`
        ).join('')}
      </div>
    </div>
  </section>

  ${trustRow()}
  ${newsletter()}`;
}

/* ==========================================================================
    CONTACT
    ========================================================================== */
export function contact() {
  return `
  <header class="page-head">
    <div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Contact' }])}
      <h1 class="page-head__title">Contact the concierge</h1>
      <p>Our team answers within two hours, seven days a week, in English, French, Arabic and Urdu.</p>
    </div>
  </header>

  <div class="wrap">
    <div class="contact-grid">
      <div class="reveal">
        <div class="boutique">
          <b>${icons.mail ? '' : ''}Concierge</b>
          <p>concierge@umar.com<br>+92 325-7800500 · WhatsApp available</p>
        </div>
        <div class="boutique">
          <b>New York — Flagship</b>
          <p>412 Madison Avenue, NY 10017<br>Mon–Sat, 10:00–19:00</p>
        </div>
        <div class="boutique">
          <b>Geneva — Watch atelier</b>
          <p>Rue du Rhône 62, 1204 Genève<br>By appointment</p>
        </div>
        <div class="boutique">
          <b>Islamabad — Client office</b>
          <p>Kohsar Block, F-6 Markaz<br>Mon–Fri, 11:00–18:00 PKT</p>
        </div>
      </div>

      <div class="reveal">
        <form class="panel" data-form="contact" novalidate>
          <h3>Send a message</h3>
          <div class="form-grid">
            <label class="field"><span>First name</span><input class="input" name="firstName" required><small class="field__error">Required</small></label>
            <label class="field"><span>Last name</span><input class="input" name="lastName" required><small class="field__error">Required</small></label>
            <label class="field span-2"><span>Email</span><input class="input" type="email" name="email" required><small class="field__error">Enter a valid email</small></label>
            <label class="field span-2"><span>Subject</span>
              <select class="select" name="subject">
                <option>Product enquiry</option>
                <option>Order or delivery</option>
                <option>Returns and service</option>
                <option>Private appointment</option>
                <option>Press and partnerships</option>
              </select>
            </label>
            <label class="field span-2"><span>Message</span><textarea class="textarea" name="message" rows="5" required></textarea><small class="field__error">Required</small></label>
          </div>
          <div style="margin-top:var(--space-6)">
            <button class="btn btn--gold" type="submit">Send message</button>
          </div>
        </form>

        <div class="faq" style="margin-top:var(--space-10)">
          <h3 class="display" style="font-size:var(--text-lg);margin-bottom:var(--space-4)">Frequent questions</h3>
          <details><summary>Do you ship to my country?</summary><p>We ship insured to 68 countries. Duties are estimated at checkout and prepaid on your behalf, so nothing is collected on delivery.</p></details>
          <details><summary>Is cash on delivery available?</summary><p>Yes, in selected markets including Pakistan, the UAE and Saudi Arabia, for orders up to $2,000. A $12 handling fee applies.</p></details>
          <details><summary>Can a piece be engraved?</summary><p>Hand engraving of up to three initials is complimentary on jewelry, leather and selected timepieces. Add a note at checkout or contact our concierge.</p></details>
          <details><summary>How does the lifetime guarantee work?</summary><p>Manufacturing defects are repaired free of charge for life. Wear-and-tear servicing is charged at cost, and we hold parts for a minimum of thirty years.</p></details>
          <details><summary>What is your return window?</summary><p>Thirty days from delivery, unworn and in the original packaging. We arrange and pay for insured collection.</p></details>
        </div>
      </div>
    </div>
  </div>
  ${newsletter()}`;
}

/* ==========================================================================
    WISHLIST
    ========================================================================== */
export function wishlist() {
  const items = state.wishlist.map(getProduct).filter(Boolean);
  return `
  <header class="page-head">
    <div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Wishlist' }])}
      <h1 class="page-head__title">Wishlist</h1>
      <p>${items.length ? `${items.length} piece${items.length > 1 ? 's' : ''} saved. Saved pieces are held in your session, not reserved in stock.` : 'Nothing saved yet.'}</p>
    </div>
  </header>
  <section class="section">
    <div class="wrap">
      ${
        items.length
          ? `<div class="product-grid">${items.map((p, i) => productCard(p, i)).join('')}</div>`
          : emptyState(
              'Your wishlist is empty',
              'Tap the heart on any piece to keep it here while you decide.',
              '<a class="btn btn--gold" href="#/shop">Browse the collection</a>'
            )
      }
    </div>
  </section>
  ${newsletter()}`;
}

/* ==========================================================================
    COMPARE
    ========================================================================== */
export function compare() {
  const items = state.compare.map(getProduct).filter(Boolean);
  if (!items.length) {
    return `
    <header class="page-head"><div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Compare' }])}
      <h1 class="page-head__title">Comparison</h1>
    </div></header>
    <section class="section"><div class="wrap">${emptyState(
      'Nothing to compare yet',
      'Add up to four pieces using the comparison icon on any product card.',
      '<a class="btn btn--gold" href="#/shop">Browse the collection</a>'
    )}</div></section>`;
  }

  const rows = [
    ['Price', (p) => `<span class="price">${money(p.price)}</span>${p.was ? ` <span class="price--was">${money(p.was)}</span>` : ''}`],
    ['Category', (p) => catName(p.cat)],
    ['Rating', (p) => stars(p.rating, p.reviews)],
    ['Availability', (p) => `<span class="stock ${stockLabel(p).cls}">${stockLabel(p).text}</span>`],
    ['Saving', (p) => (p.was ? `−${pctOff(p)}%` : '—')],
    ['Highlights', (p) => p.blurb],
    ...['Warranty', 'Origin', 'Material', 'Movement', 'Volume'].map((k) => [
      k,
      (p) => p.specs[k] || '—',
    ]),
    [
      'Actions',
      (p) => `
      <div style="display:grid;gap:var(--space-2)">
        <button class="btn btn--gold btn--sm" data-act="add" data-id="${p.id}">Add to bag</button>
        <button class="btn btn--ghost btn--sm" data-act="compare" data-id="${p.id}">Remove</button>
      </div>`,
    ],
  ];

  return `
  <header class="page-head">
    <div class="wrap">
      ${crumbs([{ label: 'Home', href: '#/' }, { label: 'Compare' }])}
      <h1 class="page-head__title">Comparison</h1>
      <p>${items.length} of 4 pieces side by side.</p>
    </div>
  </header>
  <section class="section">
    <div class="wrap">
      <div class="compare-wrap reveal">
        <table class="compare-table">
          <thead>
            <tr>
              <th scope="row">Piece</th>
              ${items
                .map(
                  (p) => `<td>
                <a href="#/product/${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
                <div class="display" style="font-size:1.15rem">${p.name}</div>
              </td>`
                )
                .join('')}
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                ([label, fn]) =>
                  `<tr><th scope="row">${label}</th>${items.map((p) => `<td>${fn(p)}</td>`).join('')}</tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);flex-wrap:wrap">
        <button class="btn btn--ghost btn--sm" data-act="clear-compare">Clear comparison</button>
        <a class="btn btn--ghost btn--sm" href="#/shop">Add more pieces</a>
      </div>
    </div>
  </section>`;
}
