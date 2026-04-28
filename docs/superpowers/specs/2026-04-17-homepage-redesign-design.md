# Homepage Redesign — Design Spec

**Date:** 2026-04-17  
**Status:** Approved  
**Inspiration:** resst.io — dark SaaS landing with product animations

---

## Goal

Transform the Montablo homepage from a static information page into a high-converting SaaS landing that demonstrates the product visually, addresses real pains, and builds urgency — all while keeping the existing cream/forest-green brand identity.

---

## Architecture

All new sections are Client Components (animations require `use client`). The page itself stays a Server Component and imports these isolated interactive islands. Nav, footer, and static sections remain server-rendered.

File structure:
```
src/components/public/
  hero-phone-animation.tsx      # cycling phone mockup (client)
  pain-points.tsx               # static pain scenarios
  product-showcase.tsx          # tabbed dashboard screenshots (client)
  stats-counter.tsx             # intersection observer count-up (client)
src/app/(public)/page.tsx       # updated to include new sections
```

---

## Section 1 — Hero (enhanced)

**Current:** text only, no product visual.  
**New:** 2-column layout. Left: headline + CTAs (unchanged). Right: animated phone mockup showing the Montablo menu cycling through French → English → German with a CSS crossfade every 2.5s.

The phone mockup is pure CSS/Tailwind — a rounded-[2.5rem] border div containing a mini menu card. Three "language states" cycle via CSS `@keyframes` opacity, each showing the same dishes with translated names and a language badge (🇫🇷 / 🇬🇧 / 🇩🇪).

Also add a soft glow to the primary CTA button: `shadow-[0_0_24px_rgba(44,62,45,0.25)] hover:shadow-[0_0_32px_rgba(44,62,45,0.35)]`

---

## Section 2 — Pain Points (new, after hero proof strip)

**Headline:** "Ces scènes vous parlent ?"  
Three scenario cards, dark surface background (`bg-foreground` text on `bg-surface`), each with:
- An emoji icon
- A short real scenario (2 lines max)
- A red cost badge: "→ **X€ perdus**"

Scenarios:
1. 🍽️ Client commande sans comprendre → mauvais avis 1 étoile — *"30 futurs clients dissuadés"*
2. 🥜 Famille avec allergie aux noix repart chez le voisin — *"Table de 4 × 35€ = 140€ perdus"*  
3. 🖨️ Menu saisonnier mis à jour → réimpression 200€ × 4/an — *"800€/an en impressions"*

---

## Section 3 — Stats Counter (new, replaces proof strip or adds after)

3 stats that count up when the section enters the viewport:

| Value | Label |
|---|---|
| 30s | Pour créer votre menu |
| 100% | Des mises à jour en temps réel |
| 0€ | De réimpression, pour toujours |

Uses `IntersectionObserver` + `requestAnimationFrame` count-up. Numbers animate from 0 to final value over 1.2s with easeOut.

---

## Section 4 — Product Showcase (new, after "how it works")

Tabbed section — headline: "Tout ce dont vous avez besoin, dans un seul tableau de bord."

5 tabs: **Tableau de bord** / **Éditeur de menu** / **QR Codes** / **Menu du jour** / **Promotions**

Each tab shows a CSS-based UI mockup (not real screenshots — avoids dependency on app state). Mockups are polished Tailwind components that accurately represent each feature. Tab switch uses fade + subtle slide transition (200ms).

The tab bar scrolls horizontally on mobile.

---

## Section 5 — CTA Button Glow (global tweak)

All primary CTA buttons add: `shadow-[0_0_24px_rgba(44,62,45,0.2)] hover:shadow-[0_0_32px_rgba(44,62,45,0.3)]`

Applied to the 3 CTA buttons in: hero, menu-preview section, final CTA section.

---

## Constraints

- No new dependencies. Pure React + Tailwind + CSS animations.
- Keep existing brand: cream background (#FAFAF7), forest green primary (#2C3E2D), amber accent (#D4A574).
- All new components must pass `npm run build` (no TypeScript errors).
- Mobile-first: every section works at 375px.
- Animations respect `prefers-reduced-motion` via `@media (prefers-reduced-motion: reduce)`.

---

## Success Criteria

1. `npm run build` passes with zero errors.
2. Hero phone cycles 3 language states visually.
3. Pain points section shows 3 cards with cost badges.
4. Stats section counts up on scroll.
5. Product showcase tabs switch content with animation.
6. CTA buttons have subtle glow.
7. No layout breaks on mobile (375px) or desktop (1440px).
