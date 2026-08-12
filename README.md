# Tourist Lens — Website

Marketing landing page and legal documents for **Tourist Lens**, the AI travel companion.

Live site (GitHub Pages): `https://xaxokevin.github.io/touristlens-web/`

## Structure
- `index.html` — landing (what it is, features, store links)
- `index.es.html` — Spanish landing page
- `thanks.html` — early-access confirmation page
- `assets/css/styles.css` — shared design system (glassmorphism dark-luxury theme), used by the landing pages and the legal pages
- `assets/js/main.js` — shared behavior script (nav, reveal animations, early-access modal, etc.)
- `legal/privacy/<lang>.html` — Privacy Policy (en, es, fr, it, de, pt, zh, ja)
- `legal/terms/<lang>.html` — Terms & Conditions (8 languages)

Legal pages are generated from the canonical Markdown in the app repo
(`assets/legal/`). Edit the Markdown there, then regenerate.

## Store / App Store Connect URLs
- Privacy Policy: `https://xaxokevin.github.io/touristlens-web/legal/privacy/en.html`
- Terms: `https://xaxokevin.github.io/touristlens-web/legal/terms/en.html`

## Deploy
GitHub Pages → Settings → Pages → Source: `main` branch, root.
