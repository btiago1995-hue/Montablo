# MonTablo Design System

**Updated:** 2026-04-26 — full app migration from "Chef's notebook" to "Starbucks-inspired" palette.

## Direction & Feel

**Who:** French restaurant owner (chef-patron, small bistrot/brasserie). Not technical. Opens this between services.
**Task:** Update menu, check stats, manage daily specials. Fast in, fast out.
**Feel:** Editorial-warm. Premium without being precious. Bistro green + warm gold + cream paper. Fraunces serif gives editorial weight; Work Sans keeps interaction crisp.

## Palette (Tailwind tokens — defined in `tailwind.config.ts`)

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#1E3932` | Deep green — body text, primary buttons, sidebar, dark sections |
| `primary-light` | `#00754A` | Mid green — link hover, active states, secondary emphasis |
| `primary-dark` | `#0F1F1A` | Pressed state, deepest surfaces |
| `accent` | `#CBA258` | Warm gold — brand mark, decorative lines, gold highlights |
| `accent-light` | `#E6CC8A` | Hover gold |
| `accent-dark` | `#8D6E00` | Tag text (signature) |
| `green-deep` | `#1E3932` | Same as primary, semantic alias for sections |
| `green-core` | `#00754A` | Status dots, prices, active indicators |
| `green-classic` | `#006241` | Hover for primary buttons |
| `green-soft` | `#D4E9E2` | Success badges, "active subscription" backgrounds |
| `green-mist` | `#EAF3EF` | Subtle decorative circles, hover ghost backgrounds |
| `background` | `#F7F4EE` | Cream page canvas |
| `surface` | `#EFEAE0` | Slightly deeper cream — table headers, inset panels |
| `border` | `#E3DDD0` | All borders — cards, inputs, dividers |
| `foreground` | `#1E3932` | Primary text (same hex as primary) |
| `muted` | `#4A5A54` | Secondary text |
| `muted-light` | `#7A8985` | Tertiary text, metadata |

### Tag colors (preserved as exact values in MenuPreview / menu-content)
- MAISON: `bg-[#F3E5F5] text-[#6A1B9A]`
- VÉGÉTARIEN: `bg-[#E8F5E9] text-[#2D6A4F]`
- SIGNATURE: `bg-[#FFF8E1] text-[#8D6E00]`
- POISSON: `bg-[#E3F2FD] text-[#1565C0]`
- PROMO badge: `bg-[#C43E3E] text-white`

### Semantic external (not branded)
- Google star: `#FBBC04`
- Error/danger: `bg-red-50 text-red-700` / `bg-red-600 text-white`
- Warning: `bg-amber-50 text-amber-900`

## Typography

- **Headings:** Fraunces (`font-serif`) — variable font, editorial. Use italic spans (`<em className="italic">`) for emphasis on key words ("à la hauteur", "envie", "ont"). Loaded globally via next/font in `src/app/layout.tsx` as `--font-fraunces`.
- **Body:** Work Sans (`font-sans`) — humanist sans, weights 400/500/600/700. Loaded via `--font-work-sans`.
- **Hierarchy:**
  - Hero h1: `font-serif text-[clamp(48px,7vw,96px)] leading-[1.02] tracking-[-0.025em]`
  - Section h2: `font-serif text-3xl sm:text-4xl text-primary` (italic span on emphasis)
  - Card heading: `font-serif text-base font-medium text-primary`
  - Body: `text-base text-foreground`
  - Secondary: `text-sm text-muted`
  - Metadata: `text-xs text-muted-light`
  - Eyebrow (small uppercase label): `text-xs font-semibold tracking-[0.08em] uppercase text-primary-light`
  - Tags: `text-[9px] font-semibold tracking-wide uppercase`
  - Minimum font size: 11px

## Spacing

- Base unit: 4px (Tailwind default)
- Card padding: `p-6` (24px) for content cards, `p-10` (40px) for showcase/hero cards
- Section padding: `py-16 sm:py-[100px]` for marketing, `py-8` for dashboard
- Gap between inline elements: `gap-2` to `gap-3`

## Depth Strategy

**Borders + minimal shadows.** Cards have `border border-border` + `rounded-2xl`. Where elevation is needed (modals, premium showcase cards), add `shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)]`.
- Card: `bg-white border border-border rounded-2xl`
- Inset panel: `bg-surface rounded-xl`
- Premium showcase: `shadow-lg`

## Border Radius

- Cards, big surfaces: `rounded-2xl` (16px) or `rounded-3xl` (24px) for premium
- Inputs, smaller cards: `rounded-xl` (12px)
- Buttons (all): `rounded-full` (pill) — uniform across app
- Status pills, badges: `rounded` (4px) for tags, `rounded-full` for status badges
- Thumbnails: `rounded-lg` (8px) or `rounded-[10px]`

## Component Patterns

### Buttons (canonical)
- **Primary**: `bg-primary text-background rounded-full px-6 py-3 font-semibold hover:bg-primary-light transition` — pill, deep green, cream text
- **Secondary**: `bg-transparent text-primary border-[1.5px] border-primary rounded-full px-6 py-3 font-semibold hover:bg-primary hover:text-background transition`
- **Ghost (small)**: `text-primary px-4 py-2 rounded-full hover:bg-green-mist transition`
- **Destructive**: `bg-red-600 text-white rounded-full hover:bg-red-700`

### Cards
- Standard: `bg-white border border-border rounded-2xl p-6`
- Highlighted: `bg-white border-2 border-primary rounded-2xl p-6` (current plan, active selection)
- Inverted: `bg-primary text-white rounded-2xl p-8` (CTA blocks, "menu preview")

### Tables
- Wrapper: `bg-white border border-border rounded-2xl overflow-hidden`
- Header row: `bg-surface text-muted-light text-xs uppercase tracking-wide font-semibold`
- Body row: `border-b border-border/30 hover:bg-surface/50`
- Cell padding: `px-5 py-3`

### Forms
- Input: `border border-border bg-white rounded-xl px-4 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition`
- Label: `text-sm font-medium text-foreground mb-1.5`
- Error: `bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm`
- Success: `bg-green-soft border border-green-soft text-primary rounded-xl px-4 py-3 text-sm`

### Sidebar (dashboard + admin)
- Background: `bg-primary` (dashboard) or `bg-foreground` (admin = same hex, semantic distinction)
- Text: `text-white/65` default, `text-white` active, `text-white/35` section labels
- Active item: `bg-white/[0.12]`
- Width: 260px desktop, slide-in overlay mobile

### Status Badges
- Active/positive: `bg-green-soft text-primary px-2.5 py-1 rounded-full text-xs font-semibold`
- Pending/warning: `bg-amber-50 text-amber-900`
- Cancelled/danger: `bg-red-50 text-red-700`
- Info: `bg-blue-50 text-blue-900`

## Auth (split panel)

- Left panel: `bg-primary` deep green
  - Top: `← Retour à l'accueil` link in `text-background/70 hover:text-background`
  - Center: `UtensilsCrossed` icon in `text-accent` (gold), then `font-serif text-5xl text-background MonTablo`, gold divider line `w-12 h-0.5 bg-accent`, italic tagline `font-serif italic text-2xl text-background/80`
- Right panel: `bg-background` cream — form + heading `font-serif text-4xl text-primary` with italic emphasis

## What to Avoid

- Hardcoded hex strings — always use Tailwind tokens (exception: tag colors, semantic externals)
- `rounded-lg` for primary CTAs — must be `rounded-full` for brand consistency
- Different hues across surfaces — keep same hue, shift only lightness
- Heavy shadows — borders first, shadows only for elevated surfaces
- DM Sans / DM Serif Display — these were replaced with Work Sans + Fraunces
- Old palette `#2C3E2D` / `#D4A574` / `#FAFAF7` — fully migrated to `#1E3932` / `#CBA258` / `#F7F4EE`
