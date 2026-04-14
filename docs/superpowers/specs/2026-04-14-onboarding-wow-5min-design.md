# Onboarding "Wow em 5 Minutos" — Design Spec

**Date:** 2026-04-14
**Goal:** Maximize trial→paid conversion by reducing time-to-value to under 5 minutes for new restaurant signups, especially in porta-a-porta sales context.

## Context

- Primary acquisition channel: direct sales (porta-a-porta)
- Typical scenario: founder sits with restaurateur, creates account together in ~15 min
- Current flow: Signup → Import AI (works well) → Menu management page
- Problem: no guided experience before/after import, no celebration moment, no urgency signals

## Flow

```
Signup → [NEW] Welcome Screen → Import AI (unchanged) → [NEW] Success Screen → Dashboard (with trial banner)
```

## Screen 1: Welcome Screen

**Route:** `/dashboard/welcome` (new page)
**When:** First visit after signup, only shown once (redirect to import if already seen)

### Content
- MonTablo logo + progress bar: **Personnaliser** (active) → Importer → Publier
- Heading: "Bienvenue, {restaurant.name} !"
- Subtext: "Personnalisez l'apparence de votre menu digital. Vous pourrez toujours modifier ces choix plus tard."

### Color Palette Picker
4 pre-built palettes the user can click to select:
- **Classique:** primary #2C3E2D, accent #D4A574 (current default)
- **Élégant:** primary #1B1B2F, accent #E8D5B7
- **Bistrot:** primary #8B2500, accent #F5E6C8
- **Moderne:** primary #0D4F4F, accent #F0E6D3

Selection updates `restaurant.primary_color` and `restaurant.secondary_color` in Supabase.

### Logo Upload
- Optional logo upload using existing `ImageUpload` component
- Text: "📷 Ajouter votre logo (optionnel)"

### CTA
- Button: "Continuer → Importer mon menu"
- Navigates to `/dashboard/import`

### Tracking
- Add `onboarding_step` field to restaurants table: `'welcome' | 'import' | 'complete' | null`
- Set to `'welcome'` on signup, `'import'` after welcome, `'complete'` after success screen

## Screen 2: Success Screen

**Route:** `/dashboard/success` (new page)
**When:** After import completes and items exist, only shown once

### Content
- Progress bar: Personnaliser (done ✓) → Importer (done ✓) → **Publier** (active)
- Green check circle animation
- Heading: "Votre menu est prêt !"
- Subtext: "Tout a été importé avec succès."
- Stats: "{X} plats importés" + "{Y} catégories" (fetched from DB)

### Menu Preview
- Embedded preview of the public menu (`/menu/{slug}`) rendered as a card
- Shows restaurant name, first few items by category
- Styled as a phone-like card with the restaurant's chosen colors

### CTAs (side by side)
- **"Voir mon menu"** (secondary) → opens `/menu/{slug}` in new tab
- **"Mon QR Code"** (primary) → navigates to `/dashboard/qr-code`
- Skip link: "Aller au tableau de bord →" → `/dashboard`

### On visit
- Set `onboarding_step` to `'complete'`

## Component 3: Trial Banner

**Location:** Dashboard layout (all dashboard pages)
**When:** `subscription_status === 'trialing'` and trial not expired

### Content
- Full-width bar at top of dashboard, above existing content
- Background: primary (#2C3E2D), text: white/80
- Text: "🕐 Essai gratuit — **{X} jours restants**"
- CTA button: "Souscrire maintenant" (accent color) → `/dashboard/settings` (scrolls to subscription section)

### Behavior
- Hidden when `subscription_status === 'active'`
- Days calculated from `trial_ends_at`
- When 3 days or less: text turns more urgent, e.g. "⚠️ Plus que {X} jour(s) !"
- When expired: "Votre essai a expiré" with red styling

## Database Changes

Add column to `restaurants` table:
```sql
ALTER TABLE restaurants ADD COLUMN onboarding_step text DEFAULT 'welcome';
```

## Routing Logic

In `/dashboard/import/page.tsx`, update the redirect logic:
- If `onboarding_step === 'welcome'` → redirect to `/dashboard/welcome`
- After import completes (items exist) and `onboarding_step !== 'complete'` → redirect to `/dashboard/success`

In the signup flow (`signup/page.tsx`):
- After signup, redirect to `/dashboard/welcome` instead of `/dashboard/import`

## Files to Create
- `src/app/dashboard/welcome/page.tsx` — Welcome screen (server component + client form)
- `src/app/dashboard/success/page.tsx` — Success screen (server component)
- `src/components/dashboard/trial-banner.tsx` — Trial countdown banner
- `src/components/dashboard/color-palette-picker.tsx` — Palette selector component

## Files to Modify
- `src/app/dashboard/layout.tsx` — Add trial banner
- `src/app/dashboard/import/page.tsx` — Add onboarding routing logic
- `src/app/(auth)/signup/page.tsx` — Redirect to welcome instead of import
- `src/components/dashboard/menu-import-wizard.tsx` — After import success, redirect to success screen

## Out of Scope
- A/B testing of palettes or CTAs
- Analytics event tracking (post-launch improvement)
- Animated transitions between steps
- Mobile-specific layouts (responsive via Tailwind is sufficient)
