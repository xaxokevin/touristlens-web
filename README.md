# Tourist Lens — Official Website

Marketing landing page and legal documentation for **Tourist Lens**, the AI travel companion.

- **Production Domain:** `https://touristlens.app/`
- **GitHub Pages Origin:** `https://xaxokevin.github.io/touristlens-web/`
- **Design Philosophy:** Grounded in Apple's Human Interface Guidelines (HIG) & Liquid Glass craft (`dickwu/apple-design-skill`).

---

## Architecture & Structure
```
touristlens-web/
├── CNAME                    # Custom domain pointer (touristlens.app)
├── DOMAIN_SETUP.md          # Step-by-step DNS & SSL setup guide for touristlens.app
├── index.html               # Apple HIG landing page (English)
├── index.es.html            # Apple HIG landing page (Spanish)
├── app-ads.txt              # Store monetization verification
├── legal/
│   ├── privacy/<lang>.html  # Privacy Policy (8 languages: en, es, fr, it, de, pt, zh, ja)
│   └── terms/<lang>.html    # Terms & Conditions (8 languages)
└── assets/
    ├── css/
    │   └── styles.css       # Apple design system (Liquid glass, OLED black, SF typography, iPhone hardware frame)
    ├── js/
    │   └── main.js          # Interactive segmented controls, video film modal, smooth scroll
    ├── img/
    │   ├── favicon.png               # High-res master icon (192x192)
    │   ├── apple-touch-icon.png      # iOS home screen icon (180x180)
    │   ├── favicon-32x32.png         # Browser tab icon (32x32)
    │   ├── feature-graphic-en.png    # Store & OpenGraph 1024x500 banner (EN)
    │   ├── feature-graphic-es.png    # Store & OpenGraph 1024x500 banner (ES)
    │   └── renders/
    │       ├── en/                   # High-res iPhone app renders & WebP (Camera, Sheet, Passport, Wizard, Map, Itinerary)
    │       └── es/                   # Localized Spanish iPhone app renders & WebP
    └── video/
        ├── brag-en.mp4      # Official 20s cinematic trailer (EN)
        ├── brag-es.mp4      # Official 20s cinematic trailer (ES)
        └── welcome.mp4      # Ambient video
```

---

## Custom Domain Setup
See [DOMAIN_SETUP.md](DOMAIN_SETUP.md) for full instructions on configuring DNS records (A, AAAA, CNAME) and activating SSL on GitHub Pages for `touristlens.app`.

---

## Canonical Store & App Store Connect URLs
- Privacy Policy: `https://touristlens.app/legal/privacy/en.html`
- Terms of Service: `https://touristlens.app/legal/terms/en.html`

---

## Deployment
Push changes to branch `main`:
```bash
git add .
git commit -m "feat(web): redesign with Apple Design Skill and configure touristlens.app domain"
git push origin main
```
GitHub Pages will automatically rebuild and deploy the site to `https://touristlens.app`.
