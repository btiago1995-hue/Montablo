# MonTablo Site Structure & URL Architecture

> **Date:** April 15, 2026
> **Based on:** SaaS template adapted for French restaurant digital menu market

---

## Current URL Structure

```
www.montablo.com/
├── /                           ← Landing page (homepage)
├── /login                      ← Auth
├── /signup                     ← Auth
├── /forgot-password            ← Auth
├── /reset-password             ← Auth
├── /menu/[slug]                ← Public menu pages (user-generated)
├── /cgu                        ← Legal
├── /mentions-legales           ← Legal
├── /confidentialite            ← Legal
├── /cookies                    ← Legal
└── /dashboard/                 ← Protected (blocked by robots.txt)
    ├── /                       ← Dashboard home
    ├── /menu                   ← Menu management
    ├── /qr-code                ← QR code generator
    ├── /promotions             ← Promotions management
    ├── /daily-menu             ← Menu du jour
    ├── /import                 ← AI menu import
    ├── /settings               ← Restaurant settings
    ├── /welcome                ← Onboarding
    └── /success                ← Onboarding success
```

---

## Target URL Structure (Full Build-Out)

```
www.montablo.com/
│
├── /                                   ← Homepage (hero, value prop, pricing preview)
│
├── /tarifs                             ← Dedicated pricing page
├── /fonctionnalites                    ← Features overview
│   ├── /fonctionnalites/menu-digital       ← Feature: digital menu creation
│   ├── /fonctionnalites/qr-code            ← Feature: QR code generation
│   ├── /fonctionnalites/menu-du-jour       ← Feature: daily menu
│   ├── /fonctionnalites/promotions         ← Feature: promotions
│   ├── /fonctionnalites/import-ia          ← Feature: AI menu import
│   └── /fonctionnalites/bilingue           ← Feature: bilingual menus
│
├── /menu-digital-restaurant            ← Pillar page (core keyword target)
├── /qr-code-restaurant                 ← Pillar page (QR code keyword target)
│
├── /solutions/                         ← Solution pages by restaurant type
│   ├── /solutions/bistrot
│   ├── /solutions/brasserie
│   ├── /solutions/gastronomique
│   ├── /solutions/pizzeria
│   ├── /solutions/food-truck
│   ├── /solutions/bar-cocktail
│   └── /solutions/hotel-restaurant
│
├── /compare/                           ← Comparison pages
│   ├── /compare/montablo-vs-sunday
│   ├── /compare/montablo-vs-tastycloud
│   ├── /compare/montablo-vs-menu-papier
│   ├── /compare/montablo-vs-pdf
│   └── /compare/montablo-vs-gratuit
│
├── /blog/                              ← Blog index
│   ├── /blog/creer-menu-digital-restaurant
│   ├── /blog/menu-papier-vs-menu-digital
│   ├── /blog/qr-code-restaurant-guide
│   ├── /blog/menu-du-jour-digital
│   ├── /blog/prix-menu-digital
│   └── ... (see content calendar for full list)
│
├── /clients/                           ← Customer stories / case studies
│   ├── /clients/[restaurant-name]
│   └── ...
│
├── /faq                                ← FAQ page
│
├── /menu/[slug]                        ← Public menus (user-generated, dynamic)
│
├── /a-propos                           ← About page (E-E-A-T building)
│
├── /login                              ← Auth (noindex)
├── /signup                             ← Auth (indexed — conversion page)
│
├── /cgu                                ← Legal
├── /mentions-legales                   ← Legal
├── /confidentialite                    ← Legal
├── /cookies                            ← Legal
│
└── /dashboard/                         ← Protected (blocked by robots.txt)
```

---

## Internal Linking Strategy

### Hub-and-Spoke Model

```
                    ┌─────────────────┐
                    │   Homepage (/)   │
                    └────────┬────────┘
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
      ┌───────────┐  ┌───────────┐  ┌───────────┐
      │  /tarifs   │  │/fonctions │  │   /blog    │
      └───────────┘  └─────┬─────┘  └─────┬─────┘
                           │               │
                    ┌──────┴──────┐  ┌─────┴──────┐
                    ▼             ▼  ▼            ▼
              /fonctions/   /fonctions/  Blog     Blog
              menu-digital  qr-code      posts    posts
                    │             │       │        │
                    └──────┬──────┘       └───┬────┘
                           ▼                  ▼
                   Pillar pages         Comparison
                   (/menu-digital-      pages
                    restaurant,         (/compare/...)
                    /qr-code-restaurant)
```

### Link rules
1. **Every blog post** links to: the relevant feature page + pricing + at least 1 other blog post
2. **Every feature page** links to: pricing + the parent pillar page + signup CTA
3. **Every comparison page** links to: pricing + relevant feature pages + signup CTA
4. **Every solution page** links to: features + pricing + relevant blog posts
5. **Homepage** links to: features, pricing, blog (latest 3), pillar pages
6. **Pillar pages** link to: all related blog posts (content cluster)

### Navigation structure

**Main nav:**
```
Logo | Fonctionnalités | Tarifs | Blog | FAQ | Connexion | [Essai gratuit]
```

**Footer:**
```
MonTablo                    Produit              Ressources           Légal
─────                       ─────                ─────                ─────
À propos                    Fonctionnalités      Blog                 CGU
                            Tarifs               FAQ                  Mentions légales
                            QR Code              Guide démarrage      Confidentialité
                            Menu du jour                              Cookies
                            Import IA
```

---

## Sitemap Strategy

### Static sitemap entries (manual)
All pages under `/`, `/tarifs`, `/fonctionnalites/*`, `/solutions/*`, `/compare/*`, `/blog/*`, `/faq`, `/a-propos`, `/clients/*`

### Dynamic sitemap entries (auto-generated)
- `/menu/[slug]` — All published public menus
- Only include menus that have at least 3 items (quality gate)
- Set `changeFrequency: 'weekly'` for active menus
- Set `priority: 0.5` for menu pages

### Sitemap index (when > 50K URLs)
Split into:
- `sitemap-static.xml` — core pages, features, solutions, comparisons
- `sitemap-blog.xml` — blog posts
- `sitemap-menus.xml` — public menu pages

---

## Page-Level SEO Requirements

### Every indexable page must have:
- [ ] Unique `<title>` tag (< 60 characters)
- [ ] Unique `<meta description>` (< 155 characters)
- [ ] Canonical URL (`<link rel="canonical">`)
- [ ] Open Graph tags (title, description, image)
- [ ] JSON-LD structured data (page-type specific)
- [ ] Breadcrumb navigation (except homepage)
- [ ] H1 tag containing primary keyword
- [ ] Internal links (minimum 3)
- [ ] Mobile-responsive layout
- [ ] < 3 second load time (LCP)

### Pages to noindex:
- `/login`
- `/forgot-password`
- `/reset-password`
- `/dashboard/*` (already blocked by robots.txt)

### Pages to index (currently not in sitemap):
- `/signup` — important conversion page, should be indexed
- All new content pages as they're created
