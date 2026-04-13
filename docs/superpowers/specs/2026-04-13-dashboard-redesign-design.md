# Dashboard Redesign — Design Spec

## Goal

Redesign the MonTablo dashboard homepage to be compact, scannable, and purpose-built for a restaurant owner checking in between services. Replace 7 separate UI blocks (3 stat cards + review widget + 3 emoji quick-action cards + items table) with 3: header, stat bar, items table.

## User

French restaurant owner (chef-patron, small bistrot/brasserie). Not technical. Opens the dashboard between lunch and dinner service — on a phone behind the bar or a laptop in the back office. Needs to see the state of their menu at a glance, then get back to work.

## Design Decisions

### Layout: Menu-First (single column)

- **Header** → restaurant name + today's date + action buttons
- **Stat bar** → single integrated horizontal bar with 4 metrics + 2 quick links
- **Items table** → structured table with column headers, takes center stage

### What's removed

- 3 separate stat cards (Plats actifs, Catégories, Promotions) → folded into stat bar
- Review widget with distribution chart → review score folded into stat bar as `4.3 ★ (12 avis)`
- 3 emoji quick-action cards (Menu du jour, Nouvelle promo, QR Code) → 2 inline quick-link buttons in stat bar (Menu du jour, QR Code). "Nouvelle promo" accessible from sidebar.
- "Tableau de bord" heading → replaced with restaurant name

## Components

### 1. Header

```
[Restaurant Name (serif, 28px)]          [Voir mon menu ↗] [+ Ajouter un plat]
[Today's date, e.g. "Dimanche 13 avril"]
```

- Restaurant name uses `font-serif` (DM Serif Display), same as current but replaces "Tableau de bord"
- Date: `text-sm text-muted`, formatted in French locale (day name + date + month)
- Buttons: same as current — secondary for "Voir mon menu", primary for "Ajouter un plat"
- **Mobile:** buttons stack below title

### 2. Stat Bar

Single white card, one row, `border border-border rounded-xl p-4`:

```
[24 plats actifs] | [5 catégories] | [2 promos] | [4.3 ★ 12 avis]    [Menu du jour] [QR Code]
```

- Each stat: number in `text-[26px] font-bold tracking-tight text-foreground`, label in `text-[10px] text-muted`
- Dividers: `w-px h-8 bg-border` between each stat
- Review stat: number + gold star (★ in `text-[#FBBC04]`) + count as label
- Quick links: `bg-background border border-border rounded-lg px-3.5 py-2 text-xs font-medium text-primary` — link to `/dashboard/daily-menu` and `/dashboard/qr-code`
- **Mobile:** stats wrap to 2×2 grid, quick links move to row below

### 3. Items Table

White card with `border border-border rounded-xl overflow-hidden`:

**Card header:**
```
[Mes plats (serif)]                      [Gérer la carte →]
```
- "Mes plats" in `font-serif text-base font-semibold`
- "Gérer la carte →" links to `/dashboard/menu`, styled as `text-xs font-semibold text-primary`

**Column headers:**
- Row with `bg-[#FAFAF7]` (will become `bg-background`), columns: Plat (2fr), Prix (80px), Tags (80px), Statut (70px)
- Headers: `text-[10px] uppercase tracking-widest text-muted font-semibold`

**Item rows:**
- Grid: `grid-template-columns: 2fr 80px 80px 70px`
- Plat cell: 36px thumbnail (rounded-lg, image or placeholder emoji) + name (`text-xs font-semibold`) + category name (`text-[10px] text-muted`)
- Prix: `text-xs font-semibold`
- Tags: small pills `text-[9px] uppercase font-semibold bg-[#F0EDE8] text-muted px-1.5 py-0.5 rounded`
- Status: pill badge — active: `bg-[#E8F5E9] text-[#2D6A4F]`, inactive: `bg-background text-muted`
- Inactive rows: `opacity-50` on entire row
- Row separator: `border-b border-border/30` (softer than card borders)
- Shows 6 most recent items, sorted by `created_at desc`
- **Mobile:** Tags column hidden, grid becomes `2fr 70px 60px`

## Token Cleanup

All hardcoded hex values in the dashboard page will be replaced with Tailwind theme tokens:

| Hardcoded | Token |
|-----------|-------|
| `#1A1A1A` | `text-foreground` |
| `#6B6B6B`, `#9B9B9B` | `text-muted` |
| `#E8E8E4`, `#E5E5E0` | `border-border` |
| `#F5F5F2`, `#FAFAF7` | `bg-background` |
| `#2C3E2D` | `text-primary`, `bg-primary` |
| `#D4A574` | `text-accent` |
| `#F0EDE8` | `bg-accent/10` or new token |

**New tokens to add to Tailwind config:**
- `muted-light: '#9B9B9B'` — for tertiary text (currently used inconsistently as both `#9B9B9B` and `#6B7280`)
- `surface: '#F0EDE8'` — warm surface for tag pills and distribution bars

## Files Changed

1. **`src/app/dashboard/page.tsx`** — Complete rewrite of the dashboard page layout
2. **`tailwind.config.ts`** — Add `muted-light` and `surface` color tokens

## Files NOT Changed

- Sidebar, dashboard layout, all other dashboard pages, public menu, landing page — untouched
- UI components (Button, Input, Modal) — untouched
- Database queries — same data, different presentation

## Mobile Behavior

- **< 640px (sm breakpoint):**
  - Header: title + date stack, buttons wrap below
  - Stat bar: 2×2 grid for stats, quick links row below
  - Table: Tags column hidden, narrower Prix/Statut columns
- **640px+:** Single-row stat bar, full table columns

## Empty States

- **No items:** Table shows centered message "Aucun plat pour l'instant. Ajouter votre premier plat" (same as current)
- **No reviews:** Star stat shows "— ★" with "0 avis" label
- **No promos:** Shows "0" in promo stat (not hidden)

## Out of Scope

- Other dashboard pages (menu manager, settings, promotions, daily menu, QR code)
- Public menu page
- Landing page
- New features or data model changes
- Review distribution chart (removed from dashboard, could be added to a dedicated reviews page later)
