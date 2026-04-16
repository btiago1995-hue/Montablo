# Google Ads Asset Group — Design Spec
**Date:** 2026-04-16  
**Goal:** Resolve "Ad strength is poor / Eligible (Limited)" on Campaign #1 by adding missing image formats and improving text copy.

## Problem

Asset Group 1 is limited to a narrow set of ad formats because:
1. Only 1 landscape, 1 square, 1 logo image — Google needs 3–5 per format
2. Portrait format (960×1200) is completely missing — blocks mobile Story/Gmail placements
3. All images share a single visual concept — limits A/B signal for the algorithm

## Solution

### New Image Assets (6 images via `/api/ads-image`)

Two visual concepts approved:
- **Concept A — Economia**: "Fini les menus imprimés" — price comparison (300€/year paper vs 14J gratuit)
- **Concept C — Régional**: "Les restaurants de Haute-Savoie adoptent MonTablo" — regional identity + testimonial card

| Format | Dimensions | Concept A | Concept C |
|--------|-----------|-----------|-----------|
| Landscape | 1200×628 | `?format=landscape-economia` | `?format=landscape-social` |
| Square | 1200×1200 | `?format=square-economia` | `?format=square-social` |
| Portrait | 960×1200 | `?format=portrait-economia` | `?format=portrait-social` |

Implementation: add 6 new format branches to `src/app/api/ads-image/route.tsx`. Keep existing landscape/square/logo untouched.

### Design Details

**Concept A (Economia) visual language:**
- Background: `#2C3E2D` (brand green)
- Top/bottom accent bars: `#D4A574`
- Headline: "Fini les menus imprimés" in serif white + `#D4A574` accent on "imprimés"
- Sub: "Mettez à jour votre carte en temps réel. Sans impression. Sans frais."
- Right/bottom panel: price comparison card — "Menu papier ~300€/an" (red) vs "MonTablo 14J Gratuit" (gold)
- CTA button: `#D4A574` background, "Essai Gratuit →"

**Concept C (Régional) visual language:**
- Background: `#1a2a1b` (darker green for differentiation)
- Top/bottom accent bars: `#D4A574`
- Geo tag: "Haute-Savoie · Annecy · Chamonix" in gold uppercase
- Headline: "Les restaurants savoyards adoptent MonTablo"
- Testimonial card: white card, "Plus besoin de réimprimer le menu à chaque saison" — Le Chalet · Annecy
- CTA button: "14J Gratuit →"

**Portrait-specific layout:** Single column, stacked — logo top, headline middle, value prop card, CTA button bottom.

### Text Copy (13 assets)

**Headlines (max 30 chars):**
1. Fini les menus imprimés (23)
2. Menu digital, 14J gratuit (25)
3. Haute-Savoie choisit MonTablo (29)
4. QR Code pour votre restaurant (29)
5. Carte à jour en temps réel (26)

**Long Headlines (max 90 chars):**
1. Fini les menus imprimés — mettez votre carte à jour en temps réel, sans frais. (79)
2. Les restaurants de Haute-Savoie adoptent MonTablo — menu bilingue FR/EN inclus. (80)
3. Créez votre menu QR Code en quelques minutes. Essai 14 jours offert, sans CB. (78)

**Descriptions (max 90 chars):**
1. Menu QR Code bilingue FR/EN, photos HD, mise à jour instantanée. 14J gratuits. (80)
2. Les restaurants savoyards digitalisent leur carte avec MonTablo. Sans engagement. (81)
3. Économisez sur l'impression. Carte toujours à jour. Essai gratuit, sans CB. (75)
4. Menu numérique élégant en 10 minutes. QR Code, photos HD, bilingue FR/EN. (74)
5. Les restaurants de Haute-Savoie adoptent MonTablo. Menu digital, QR Code inclus. (81)

## Implementation Plan

1. Add 6 new format handlers to `src/app/api/ads-image/route.tsx`
2. Run `npm run build` to verify no TypeScript errors
3. Push to main → auto-deploy to Vercel
4. Generate all 6 images by hitting the API URLs
5. Download as PNG and upload to Google Ads Asset Group 1
6. Manually enter text copy in Google Ads UI

## Out of Scope

- Changing existing landscape/square/logo formats
- Video assets
- Multiple asset groups
