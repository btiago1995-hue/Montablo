# MonTablo Design System

## Direction & Feel

**Who:** French restaurant owner (chef-patron, small bistrot/brasserie). Not technical. Opens this between services.
**Task:** Update menu, check stats, manage daily specials. Fast in, fast out.
**Feel:** Like a well-organized chef's notebook — warm, grounded, professional. Bistro warmth, not Silicon Valley clean.

## Palette

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2C3E2D` | Bistro green — sidebar, buttons, links |
| `primary-light` | `#3D5240` | Hover state for primary |
| `primary-dark` | `#1E2B1F` | Pressed state |
| `accent` | `#D4A574` | Copper — highlights, subscription badge |
| `accent-light` | `#E0BB93` | Hover state for accent |
| `accent-dark` | `#C08E5A` | Labels, category markers |
| `background` | `#FAFAF7` | Page canvas, table headers, inset backgrounds |
| `foreground` | `#1A1A1A` | Primary text |
| `muted` | `#6B7280` | Secondary text |
| `muted-light` | `#9B9B9B` | Tertiary text, placeholders, metadata |
| `border` | `#E5E5E0` | All borders — cards, dividers, inputs |
| `surface` | `#F0EDE8` | Warm surface — tag pills, bar backgrounds |

### Semantic colors (not tokenized)
- Active/success: `#E8F5E9` bg, `#2D6A4F` text
- Google star: `#FBBC04`
- Error/danger: `bg-red-600` (Tailwind default)

## Typography

- **Headings:** DM Serif Display (`font-serif`) — restaurant name, section titles, card headings
- **Body:** DM Sans (`font-sans`) — everything else
- **Hierarchy:**
  - Page title: `font-serif text-[28px] tracking-tight text-foreground`
  - Card heading: `font-serif text-base font-semibold text-foreground`
  - Body: `text-sm text-foreground`
  - Secondary: `text-sm text-muted`
  - Metadata: `text-[11px] text-muted-light`
  - Table headers: `text-[11px] uppercase tracking-[0.08em] text-muted-light font-semibold`
  - Table body: `text-[13px] font-semibold`
  - Tags: `text-[11px] font-semibold uppercase tracking-wide`
  - **Minimum font size: 11px** — nothing smaller, for tablet/accessibility readability

## Spacing

- Base unit: 4px (Tailwind default)
- Card padding: `p-4 sm:p-5`
- Section margin: `mb-5`
- Table cell padding: `px-5 py-3`
- Gap between inline elements: `gap-2` to `gap-3`
- Stat bar stat spacing: `gap-5` with `w-px h-8 bg-border` dividers

## Depth Strategy

**Borders only.** No shadows on cards or surfaces. Clean, technical.
- Card borders: `border border-border rounded-xl`
- Row separators: `border-b border-border/30` (softer than card borders)
- Input borders: `border border-border` with `focus:ring-2 focus:ring-primary/20 focus:border-primary`

## Border Radius

- Cards, tables: `rounded-xl` (12px)
- Buttons, inputs: `rounded-lg` (8px)
- Status pills: `rounded-full`
- Tag pills: `rounded` (4px)
- Thumbnails: `rounded-lg` (8px)

## Component Patterns

### Stat Bar
Single white card, one row on desktop, 2×2 grid on mobile. Stats as large numbers (`text-[26px] font-bold`) with tiny labels below. Vertical `w-px h-8 bg-border` dividers between stats. Quick-link buttons right-aligned: `bg-background border border-border rounded-lg px-3.5 py-2 text-xs font-medium text-primary`.

### Items Table
White card with serif heading + action link in header. Column headers on `bg-background`. Rows with thumbnail (w-9 h-9) + name/category, price, tags, status. Inactive rows: `opacity-50`. Tags column hidden on mobile (`hidden sm:table-cell`).

### Page Headers
Restaurant name or page title in serif, subtitle in `text-sm text-muted`. Action buttons right-aligned. Buttons stack below title on mobile.

### Buttons
- Primary: `bg-primary text-white rounded-lg font-semibold hover:bg-primary-light`
- Secondary: `bg-white text-foreground border border-border rounded-lg font-semibold hover:bg-background`
- Links: `text-primary font-semibold hover:underline`

### Status Badges
- Active: `bg-[#E8F5E9] text-[#2D6A4F]` with dot indicator
- Inactive: `bg-background text-muted-light` with dot indicator
- Size: `text-[9px] font-semibold px-2 py-0.5 rounded-full`

## Sidebar

- Background: `bg-primary` (#2C3E2D) — same color as primary, not a separate shade
- Text: white with opacity variants (65% default, 100% active, 35% section labels)
- Active state: `bg-white/[0.12]`
- Width: 260px, hidden on mobile with slide-in overlay

## What to Avoid

- Emoji as UI elements (use Lucide icons or text)
- Separate cards for stats that can be inlined
- Hardcoded hex — always use Tailwind tokens
- Shadows on cards (borders-only depth strategy)
- Different hues for different surfaces (shift lightness only)
- Multiple accent colors
