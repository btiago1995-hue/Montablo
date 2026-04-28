# Full App Redesign — Chef's Notebook → Starbucks-Inspired

**Created:** 2026-04-26
**Branch:** `feat/homepage-redesign-starbucks`
**Driver:** Tiago (founder)
**Status:** Plan, awaiting agent execution

## Context

The homepage was redesigned with a "Starbucks-inspired" system (Fraunces serif + Work Sans sans + four-tier green palette `#1E3932 / #00754A / #006241 / #D4E9E2` + warm cream canvas `#F7F4EE`). The redesign is currently scoped under a `.mt-redesign` CSS class on the homepage only.

Launch was postponed — there is now time to bring the **entire app** onto the same design system before going live. Goal: visual coherence end-to-end so a customer who lands from a door-to-door QR scan, signs up, manages their menu in the dashboard, gets billing emails, and receives marketing emails has one consistent brand experience.

**Architecture decision:** A + B combined.
- **A.** Update Tailwind tokens globally (`tailwind.config.ts` + fonts in `layout.tsx`) → ~90% of pages auto-align (they use `bg-primary`, `text-foreground`, etc.)
- **B.** Migrate homepage's scoped CSS to Tailwind utilities so we have ONE design system, not two.

Admin/CRM included.

## Token Mapping

| Token | Old (Chef's Notebook) | New (Starbucks) |
|---|---|---|
| `primary` | `#2C3E2D` | `#1E3932` (mt-green-deep) |
| `primary-light` | `#3D5240` | `#00754A` (mt-green-core) |
| `primary-dark` | `#1E2B1F` | `#0F1F1A` |
| `accent` | `#D4A574` (copper) | `#CBA258` (warm gold, kept warm) |
| `accent-dark` | `#C08E5A` | `#8D6E00` |
| `accent-light` | `#E0BB93` | `#E6CC8A` |
| `background` | `#FAFAF7` | `#F7F4EE` (mt-cream) |
| `surface` | `#F0EDE8` | `#EFEAE0` (mt-cream-deep) |
| `border` | `#E5E5E0` | `#E3DDD0` (mt-line) |
| `foreground` | `#1A1A1A` | `#1E3932` (mt-ink) |
| `muted` | `#6B7280` | `#4A5A54` (mt-ink-soft) |
| Sub-palette | — | Add `green-soft: #D4E9E2`, `green-mist: #EAF3EF` |
| Serif font | `DM Serif Display` | `Fraunces` (variable, optical sizing 9-144) |
| Sans font | `DM Sans` | `Work Sans` (400/500/600/700) |

## File Map (Critical Paths)

### Foundation files (Phase 1 — must be edited first)
- `tailwind.config.ts` — color tokens, fontFamily
- `src/app/layout.tsx` — replace `DM_Sans` + `DM_Serif_Display` with `Work_Sans` + `Fraunces` from `next/font/google`; update `--font-*` CSS variable names
- `src/app/globals.css` — skeleton shimmer gradient, any other global rules
- `src/components/dashboard/color-palette-picker.tsx` — update "Classique" preset to `#1E3932 / #CBA258`
- `src/lib/email-templates.ts` — update `BRAND` constant
- `src/app/api/og/route.tsx` — update default colors
- `src/app/icon.tsx` — update icon BG/text colors
- `src/app/api/ads-image/route.tsx` — update PRIMARY/ACCENT constants

### Homepage migration (Phase 2)
- `src/app/(public)/page.tsx` — replace `mt-*` className references with Tailwind utilities
- `src/app/(public)/homepage.css` — DELETE (or keep for any genuinely page-specific bits like `@keyframes`)
- `src/components/public/homepage/menu-preview.tsx` — re-class with Tailwind
- `src/components/public/homepage/pricing-toggle.tsx` — re-class with Tailwind
- The phone mockup, QR badge, review badge — re-build with Tailwind utilities

### Public marketing (Phase 3)
~30 server-component pages, all already using design tokens (no hardcoded hex). Token swap in Phase 1 should auto-update. Visual QA + manual tweaks per page:
- `(public)/tarifs`, `/fonctionnalites`, `/blog`, `/blog/[slug]`, `/a-propos`, `/contact`, `/faq`
- `(public)/solutions/{bistrot,pizzeria,hotel-restaurant,brasserie,gastronomique,bar-cocktail,food-truck,haute-savoie,haute-savoie/[ville]}`
- `(public)/compare/{montablo-vs-menu-papier,pdf,sunday,tastycloud}`
- `(public)/menu-digital-restaurant`, `/qr-code-restaurant`
- `(public)/{mentions-legales,cgu,confidentialite,cookies}`
- `(public)/menu/[slug]` + `src/components/public/menu-content.tsx`
- Shared: `cta-link.tsx`, `pricing-cards.tsx`, `pricing-comparison-table.tsx`, `review-popup.tsx`

### Auth (Phase 4)
- `src/app/(auth)/login/page.tsx` + `LoginForm`
- `src/app/(auth)/signup/page.tsx` + `SignupForm`
- `src/app/(auth)/forgot-password/page.tsx` + form
- `src/app/(auth)/reset-password/page.tsx` + form
- Replace hardcoded `#2C3E2D`, `bg-[#2C3E2D]`, `border-[#2C3E2D]`, `focus:border-[#2C3E2D]` with `bg-primary`, etc.

### Dashboard core (Phase 5)
- `src/app/dashboard/{page,menu/page,daily-menu/page,promotions/page,categories/page}.tsx`
- `src/components/dashboard/{menu-manager,daily-menu-editor,promotions-manager,menu-import-wizard}.tsx`
- `src/app/dashboard/layout.tsx` + `src/components/dashboard/sidebar.tsx`
- `trial-banner.tsx`, `paywall-overlay.tsx`

### Dashboard secondary (Phase 6)
- `src/app/dashboard/{settings,qr-code,loyalty/*,abonnement,welcome,success}/page.tsx`
- `src/components/dashboard/{settings-form,qr-code-generator,loyalty-setup,loyalty-customers,loyalty-scan,loyalty-new-customer}.tsx`

### Admin/CRM (Phase 7)
- `src/app/(admin)/admin/**/*.tsx` — currently uses `slate-*` palette (decoupled). Decide: align with brand `bg-primary` or keep slate. **Decision: align — admin should feel like it belongs to MonTablo.**

### Cleanup (Phase 8)
- Remove `.mt-redesign` scoping wrapper from homepage (no longer needed once Tailwind everywhere)
- Delete unused homepage.css if empty
- Update `.interface-design/system.md` with new tokens
- Search for orphan hardcoded hex strings (`grep -rE '#[0-9A-Fa-f]{6}'`) and clean up
- Verify `npm run build` passes with zero TS/ESLint errors
- Visual QA all pages on localhost

## Execution Strategy — Parallel Agents

The phases have **dependencies**: Phase 1 must complete before any other phase (it changes the tokens that other phases observe). After Phase 1, phases 3 and 4 can run in **parallel** (independent files). Phase 2 (homepage migration) is independent of 3-7 but should run before Phase 8 cleanup.

```
Phase 1 (Foundation) — sequential, MUST FINISH FIRST
   |
   +-> Phase 2 (Homepage migration)        [parallel-A]
   |
   +-> Phase 3 (Public marketing)          [parallel-B]
   |
   +-> Phase 4 (Auth)                       [parallel-C]
   |
   +-> Phase 5 (Dashboard core)             [parallel-D]
   |
   +-> Phase 6 (Dashboard secondary)        [parallel-E]
   |
   +-> Phase 7 (Admin/CRM)                  [parallel-F]
   |
   +-> Phase 8 (Cleanup) — sequential, MUST RUN LAST after all above
```

Phase 1 executed inline (small, foundational). Phases 2-7 dispatched as 6 parallel general-purpose agents. Phase 8 inline after all agents return.

## Verification (per phase + final)

After each phase:
1. `npm run build` passes (no TS errors)
2. Dev server hot-reloads without errors
3. Spot-check key pages with screenshots (gstack browse)

Final verification before handing back to Tiago:
1. `npm run build` clean
2. Visit homepage, /tarifs, /fonctionnalites, /menu/demo, /login, /signup, /dashboard, /dashboard/menu, /dashboard/settings, /admin (if applicable) — capture desktop + mobile screenshots
3. Confirm fonts loaded (Fraunces + Work Sans visible in network tab, no DM fonts)
4. Confirm no console errors
5. Run `grep -rE '#2C3E2D|#D4A574|DM_Sans|DM_Serif' src/` — should return zero hits
6. Hand back to Tiago for live localhost review BEFORE any commit
