# MonTablo SEO Strategy

> **Date:** April 15, 2026
> **Domain:** www.montablo.com
> **Business type:** SaaS — digital menu platform for restaurants
> **Primary market:** France (French-speaking restaurateurs)
> **Secondary markets:** Belgium, Switzerland, Quebec, French-speaking Africa

---

## Executive Summary

MonTablo is a SaaS product that lets restaurants create, manage, and share digital menus via QR code. The site currently has **5 indexed pages** (homepage + 4 legal pages), no blog, no structured data, and no content marketing presence. This plan transforms MonTablo from a single-page marketing site into a content-rich authority in the "menu digital restaurant" niche.

The French restaurant digital menu market is emerging — competitors are mostly small players with weak SEO. This is a window of opportunity: whoever builds topical authority first will own organic traffic for years.

---

## Current State Assessment

### What exists
- Landing page with clear value prop, pricing, and CTAs
- Public menu pages at `/menu/[slug]` (user-generated, not in sitemap)
- Auth flows (login, signup, forgot/reset password)
- Dashboard (menu management, QR code, promotions, daily menu, import, settings)
- Legal pages (CGU, mentions légales, confidentialité, cookies)
- OG meta tags and Twitter cards
- robots.txt blocking `/dashboard/` and `/api/`
- Vercel Analytics
- Bilingual FR/EN menu support

### What's missing
- **No blog or content pages** — zero top/mid-funnel content
- **No structured data** (no JSON-LD schema markup)
- **No dedicated pricing page** (pricing is a section on homepage)
- **No feature pages** (features listed as bullet points only)
- **No comparison/alternative pages**
- **No customer showcase or case studies**
- **No FAQ page**
- **Minimal sitemap** (5 URLs, no dynamic menu pages)
- **No hreflang tags** (despite bilingual capability)
- **No internal linking structure** beyond nav/footer
- **No content pillars or topical clusters**

---

## Target Keywords

### Primary (high intent, direct product fit)

| Keyword | Est. Monthly Volume (FR) | Difficulty | Intent |
|---------|--------------------------|------------|--------|
| menu digital restaurant | 500-1K | Low-Med | Commercial |
| menu qr code restaurant | 300-500 | Low | Commercial |
| carte restaurant numérique | 200-400 | Low | Commercial |
| menu digital qr code | 200-400 | Low | Commercial |
| créer menu restaurant en ligne | 100-300 | Low | Transactional |
| logiciel menu restaurant | 100-200 | Low-Med | Commercial |

### Secondary (feature-related)

| Keyword | Est. Monthly Volume (FR) | Difficulty | Intent |
|---------|--------------------------|------------|--------|
| qr code restaurant gratuit | 500-1K | Med | Commercial |
| menu du jour digital | 100-200 | Low | Commercial |
| carte digitale restaurant | 200-400 | Low | Informational |
| menu sans contact restaurant | 100-200 | Low | Commercial |
| application menu restaurant | 100-300 | Med | Commercial |

### Long-tail (blog/content targets)

| Keyword | Est. Monthly Volume (FR) | Intent |
|---------|--------------------------|--------|
| comment créer un menu digital pour son restaurant | 50-100 | Informational |
| avantages menu digital restaurant | 30-80 | Informational |
| qr code menu restaurant comment ça marche | 50-150 | Informational |
| remplacer carte papier restaurant | 20-50 | Informational |
| menu digital restaurant prix | 50-100 | Commercial |
| tendances restauration 2026 | 100-300 | Informational |

---

## Content Pillars

### Pillar 1: "Menu Digital Restaurant" (core product)
Hub page: `/menu-digital-restaurant`
- What is a digital menu
- How to create one
- Benefits vs paper menus
- Cost comparison
- QR code implementation guide

### Pillar 2: "Gestion de Restaurant" (industry authority)
Hub page: `/blog` with category `/blog/gestion-restaurant`
- Restaurant management tips
- Trends in hospitality tech
- Customer experience optimization
- Cost reduction strategies

### Pillar 3: "QR Code Restaurant" (feature-specific)
Hub page: `/qr-code-restaurant`
- How restaurant QR codes work
- Design and placement tips
- QR code menu best practices
- Customer adoption strategies

---

## Schema Markup Plan

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | Organization, WebSite, SoftwareApplication |
| Pricing (new page) | SoftwareApplication + Offer with pricing |
| Blog posts | Article, BlogPosting, BreadcrumbList |
| FAQ page | FAQPage |
| Feature pages | WebPage, SoftwareApplication |
| Public menus `/menu/[slug]` | Menu (schema.org/Menu), Restaurant |
| Comparison pages | WebPage, FAQPage |

---

## Technical SEO Priorities

1. **Add JSON-LD structured data** to all page types (see schema plan above)
2. **Expand sitemap** to include all public menu pages dynamically
3. **Create dedicated URL routes** for pricing, features, FAQ, blog
4. **Implement breadcrumbs** with BreadcrumbList schema
5. **Add hreflang tags** for FR/EN bilingual menus
6. **Optimize Core Web Vitals** — already good on Vercel/Next.js, verify LCP < 2.5s
7. **Add canonical tags** on all pages
8. **Internal linking** — every blog post links to product pages, every feature page links to signup
9. **Image optimization** — add alt tags, use next/image for all images
10. **Mobile-first audit** — verify all new pages are fully responsive

---

## E-E-A-T Building Strategy

### Experience
- Customer testimonials with real restaurant names/locations
- "Built by restaurateurs" narrative if applicable
- Screenshots and case studies showing real menus

### Expertise
- Blog content written with industry knowledge
- Practical guides with specific, actionable advice
- Industry statistics and data-driven insights

### Authoritativeness
- Author bios on blog posts
- Press mentions and media features
- Partnerships with restaurant associations

### Trustworthiness
- Transparent pricing (already good)
- Customer reviews/testimonials
- SSL, privacy policy, clear data practices (already in place)
- Physical address and contact info

---

## KPI Targets

| Metric | Current (Baseline) | 3 Months | 6 Months | 12 Months |
|--------|-------------------|----------|----------|-----------|
| Indexed Pages | 5 | 25 | 60 | 120+ |
| Organic Traffic (monthly) | ~0 | 200-500 | 1,000-2,500 | 5,000-10,000 |
| Keyword Rankings (top 20) | 0 | 10-15 | 30-50 | 80-120 |
| Domain Authority | ~0 | 5-10 | 15-20 | 25-35 |
| Blog Posts Published | 0 | 8-10 | 25 | 50+ |
| Organic Signups/month | 0 | 5-15 | 30-60 | 100-200 |
| Core Web Vitals | Pass | Pass | Pass | Pass |

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Low domain authority limits ranking potential | Focus on low-competition long-tail keywords first; build authority gradually |
| French-only content limits market size | Start with FR market (less competition), add EN content in Phase 3 |
| Thin content from auto-generated menu pages | Ensure menu pages have sufficient unique content; don't rely on them for rankings |
| Competitor copying strategy | Move fast, build content moat, focus on quality over quantity |
| Algorithm updates | Diversify traffic sources; maintain white-hat practices throughout |
