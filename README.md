# UMAR — Luxury E-Commerce Storefront

A modern luxury e-commerce storefront for timepieces, fragrance, leather goods, eyewear and fine jewelry. Built entirely with **vanilla HTML, CSS and JavaScript** — no framework, no build step, no dependencies.


## ✨ Features

- 🛍️ **Product Catalog** — Browse by category (timepieces, fragrance, leather, eyewear, jewelry)
- 🛒 **Shopping Cart** — Add, update quantity, remove items with live totals
- ❤️ **Wishlist** — Save favorite pieces for later
- ⚖️ **Compare** — Compare up to 4 products side by side
- 💳 **Checkout** — Multi-step checkout with coupon codes, shipping methods & COD support
- 📦 **Order Tracking** — Track orders by order ID
- 🌗 **Dark / Light Theme** — Toggle between brand dark mode and light mode
- 🔍 **Live Search** — Instant product search overlay
- 💬 **WhatsApp Support** — Floating WhatsApp button on every page for instant concierge contact
- 📱 **Fully Responsive** — Mobile-first, works across all screen sizes
- ⚡ **Hash-routed SPA** — Fast client-side routing with no page reloads

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (design tokens), no framework
- **Vanilla JavaScript (ES Modules)** — No React, no build tools required

## 📁 Project Structure

```
umar/
├── index.html          # Entry point
├── css/
│   ├── base.css         # Reset, design tokens, typography
│   └── styles.css       # Component & layout styles
├── js/
│   ├── app.js            # Router, chrome (header/footer/overlays), boot logic
│   ├── views.js          # Page views (home, shop, product, contact, etc.)
│   ├── ui.js              # Reusable UI components & icons
│   ├── store.js          # State management (cart, wishlist, compare, orders)
│   ├── commerce.js    # Checkout & order logic
│   ├── data.js            # Product catalog data                
│   └── favicon.png.jpg
└── img/                   # Product & site imagery
```

## 🚀 Getting Started

No build step required — this is a static site.

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Serve it locally (any static server works, since ES modules require `http://`, not `file://`):
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

## 📞 Contact / Support

For product enquiries or support, reach out via the WhatsApp button on the site, or:
- **Email:** umarjamil.nwl.pk@gmail.com
- **WhatsApp:** +92 325 7800500

## 📄 License

This project is private and intended for demonstration/client use.
