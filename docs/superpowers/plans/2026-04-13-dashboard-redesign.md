# Dashboard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the dashboard homepage from 7 stacked blocks to 3 compact sections (header + stat bar + items table), clean up hardcoded hex values, and add missing Tailwind tokens.

**Architecture:** Single-page rewrite of `src/app/dashboard/page.tsx`. Same Supabase queries, completely new JSX layout. Two new color tokens added to `tailwind.config.ts`. No new components — everything lives in the page file since it's server-rendered and self-contained.

**Tech Stack:** Next.js 14 (App Router, server components), Tailwind CSS, Supabase, TypeScript

**Spec:** `docs/superpowers/specs/2026-04-13-dashboard-redesign-design.md`

---

### Task 1: Add Tailwind color tokens

**Files:**
- Modify: `tailwind.config.ts:11-27`

- [ ] **Step 1: Add `surface` and `muted-light` tokens to Tailwind config**

In `tailwind.config.ts`, update the `colors` object inside `theme.extend`:

```ts
colors: {
  primary: {
    DEFAULT: '#2C3E2D',
    light: '#3D5240',
    dark: '#1E2B1F',
  },
  accent: {
    DEFAULT: '#D4A574',
    light: '#E0BB93',
    dark: '#C08E5A',
  },
  background: '#FAFAF7',
  foreground: '#1A1A1A',
  muted: {
    DEFAULT: '#6B7280',
    light: '#9B9B9B',
  },
  border: '#E5E5E0',
  surface: '#F0EDE8',
},
```

Changes:
- `muted` becomes an object with `DEFAULT` (keeps existing `text-muted` working) and `light` variant
- New `surface: '#F0EDE8'` for warm tag/bar backgrounds

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds. Existing `text-muted`, `bg-muted`, `border-border` classes still work because `muted.DEFAULT` preserves the value.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: add surface and muted-light color tokens to Tailwind config"
```

---

### Task 2: Rewrite dashboard header section

**Files:**
- Modify: `src/app/dashboard/page.tsx:1-88`

- [ ] **Step 1: Update imports**

Replace the current imports at the top of `src/app/dashboard/page.tsx`:

```tsx
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ExternalLink, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
```

Remove `UtensilsCrossed`, `FolderOpen`, `Tag`, `Star` — they're no longer used.

- [ ] **Step 2: Add date formatting helper**

Add this function before the default export in `src/app/dashboard/page.tsx`:

```tsx
function formatFrenchDate(): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}
```

- [ ] **Step 3: Rewrite the header JSX**

Replace the current header block (the `<div className="flex flex-col sm:flex-row ...">` with "Tableau de bord") with:

```tsx
{/* Header */}
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
  <div>
    <h1 className="font-serif text-[28px] tracking-tight text-foreground mb-1">
      {restaurant!.name}
    </h1>
    <p className="text-sm text-muted capitalize">{formatFrenchDate()}</p>
  </div>
  <div className="flex gap-2">
    <Link
      href={`/menu/${restaurant!.slug}`}
      target="_blank"
      className="inline-flex items-center gap-2 px-4 py-2.5 border-[1.5px] border-border rounded-lg text-sm font-semibold text-foreground hover:bg-white hover:border-muted-light transition-all"
    >
      <ExternalLink className="w-4 h-4" />
      <span className="hidden sm:inline">Voir mon menu</span>
      <span className="sm:hidden">Menu</span>
    </Link>
    <Link
      href="/dashboard/menu"
      className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all"
    >
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Ajouter un plat</span>
      <span className="sm:hidden">Plat</span>
    </Link>
  </div>
</div>
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: replace dashboard header with restaurant name and date"
```

---

### Task 3: Build the integrated stat bar

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Replace stat cards, review widget, and quick-action cards with stat bar**

Remove the three existing sections:
1. The `grid grid-cols-3 gap-2 sm:gap-4 mb-7` stats grid
2. The `bg-white border border-border rounded-xl p-4 sm:p-5 mb-7` reviews widget
3. The `grid grid-cols-3 gap-2 sm:gap-3 mb-7` quick actions grid

Replace all three with this single stat bar:

```tsx
{/* Stat bar */}
<div className="bg-white border border-border rounded-xl p-4 sm:px-5 mb-5">
  {/* Desktop: single row */}
  <div className="hidden sm:flex items-center">
    <div className="flex items-center gap-5 flex-1">
      <div>
        <div className="text-[26px] font-bold tracking-tight text-foreground leading-none">
          {itemCount ?? 0}
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">plats actifs</div>
      </div>
      <div className="w-px h-8 bg-border" />
      <div>
        <div className="text-[26px] font-bold tracking-tight text-foreground leading-none">
          {categoryCount ?? 0}
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">catégories</div>
      </div>
      <div className="w-px h-8 bg-border" />
      <div>
        <div className="text-[26px] font-bold tracking-tight text-foreground leading-none">
          {promoCount ?? 0}
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">promos</div>
      </div>
      <div className="w-px h-8 bg-border" />
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-[26px] font-bold tracking-tight text-foreground leading-none">
            {reviewCount > 0 ? avgRating.toFixed(1) : '—'}
          </span>
          <span className="text-[13px] text-[#FBBC04]">★</span>
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">
          {reviewCount} avis
        </div>
      </div>
    </div>
    <div className="flex gap-1.5 ml-4">
      <Link
        href="/dashboard/daily-menu"
        className="bg-background border border-border rounded-lg px-3.5 py-2 text-xs font-medium text-primary hover:bg-white transition-colors"
      >
        Menu du jour
      </Link>
      <Link
        href="/dashboard/qr-code"
        className="bg-background border border-border rounded-lg px-3.5 py-2 text-xs font-medium text-primary hover:bg-white transition-colors"
      >
        QR Code
      </Link>
    </div>
  </div>

  {/* Mobile: 2x2 grid + links row */}
  <div className="sm:hidden">
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <div className="text-[22px] font-bold tracking-tight text-foreground leading-none">
          {itemCount ?? 0}
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">plats actifs</div>
      </div>
      <div>
        <div className="text-[22px] font-bold tracking-tight text-foreground leading-none">
          {categoryCount ?? 0}
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">catégories</div>
      </div>
      <div>
        <div className="text-[22px] font-bold tracking-tight text-foreground leading-none">
          {promoCount ?? 0}
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">promos</div>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-[22px] font-bold tracking-tight text-foreground leading-none">
            {reviewCount > 0 ? avgRating.toFixed(1) : '—'}
          </span>
          <span className="text-[12px] text-[#FBBC04]">★</span>
        </div>
        <div className="text-[10px] text-muted-light mt-0.5">
          {reviewCount} avis
        </div>
      </div>
    </div>
    <div className="flex gap-1.5 pt-3 border-t border-border">
      <Link
        href="/dashboard/daily-menu"
        className="flex-1 text-center bg-background border border-border rounded-lg px-3 py-2 text-xs font-medium text-primary"
      >
        Menu du jour
      </Link>
      <Link
        href="/dashboard/qr-code"
        className="flex-1 text-center bg-background border border-border rounded-lg px-3 py-2 text-xs font-medium text-primary"
      >
        QR Code
      </Link>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: replace stat cards, reviews, and quick actions with integrated stat bar"
```

---

### Task 4: Rewrite the items table

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Replace the items table**

Remove the current `<div className="bg-white border border-[#E8E8E4] rounded-xl overflow-hidden">` table section and replace with:

```tsx
{/* Items table */}
<div className="bg-white border border-border rounded-xl overflow-hidden">
  <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
    <span className="font-serif text-base font-semibold text-foreground">Mes plats</span>
    <Link
      href="/dashboard/menu"
      className="text-xs font-semibold text-primary hover:underline"
    >
      Gérer la carte →
    </Link>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-background">
          <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border">
            Plat
          </th>
          <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border w-[80px]">
            Prix
          </th>
          <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border w-[80px] hidden sm:table-cell">
            Tags
          </th>
          <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border w-[70px]">
            Statut
          </th>
        </tr>
      </thead>
      <tbody>
        {recentItems && recentItems.length > 0 ? (
          recentItems.map((item) => (
            <tr
              key={item.id}
              className={`border-b border-border/30 last:border-b-0 hover:bg-background/50 transition-colors ${
                !item.is_available ? 'opacity-50' : ''
              }`}
            >
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt=""
                      className="w-9 h-9 rounded-lg object-cover bg-background"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-muted-light text-sm">
                      🍽️
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-semibold text-foreground">{item.name_fr}</div>
                    <div className="text-[10px] text-muted-light">
                      {item.category_id ? catMap.get(item.category_id) ?? '—' : '—'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3">
                <span className="text-xs font-semibold text-foreground">
                  {formatPrice(item.price)}
                </span>
              </td>
              <td className="px-5 py-3 hidden sm:table-cell">
                <div className="flex gap-1 flex-wrap">
                  {item.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-surface text-muted uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    item.is_available
                      ? 'bg-[#E8F5E9] text-[#2D6A4F]'
                      : 'bg-background text-muted-light'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.is_available ? 'bg-[#2D6A4F]' : 'bg-muted-light'
                    }`}
                  />
                  {item.is_available ? 'Actif' : 'Inactif'}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="px-5 py-8 text-center text-muted-light text-sm">
              Aucun plat pour l&apos;instant.{' '}
              <Link href="/dashboard/menu" className="text-primary font-semibold hover:underline">
                Ajouter votre premier plat
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
```

- [ ] **Step 2: Clean up unused variables**

The `distribution` array and individual star SVG rendering code from the old review widget are no longer used. Remove these lines from the data-fetching section:

```tsx
// Remove these lines:
const distribution = [0, 0, 0, 0, 0]
reviews?.forEach((r) => { distribution[r.rating - 1]++ })
```

Keep `reviewCount` and `avgRating` — they're used in the stat bar.

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors and no unused variable warnings.

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: rewrite items table with refined styling and token cleanup"
```

---

### Task 5: Final verification and build

**Files:**
- Read: `src/app/dashboard/page.tsx` (full file review)

- [ ] **Step 1: Read the complete file and check for remaining hardcoded hex values**

Read `src/app/dashboard/page.tsx` in full. Search for any remaining `#` hex color values that should use tokens. Acceptable exceptions:
- `#FBBC04` (Google star yellow — not part of our design system)
- `#E8F5E9` and `#2D6A4F` (semantic green for active status — would need a proper semantic token system, out of scope)

Any `#E8E8E4`, `#F5F5F2`, `#FAFAF7`, `#1A1A1A`, `#6B6B6B`, `#9B9B9B`, `#2C3E2D`, `#D4A574`, `#F0EDE8` should be replaced with their token equivalents.

- [ ] **Step 2: Run final build**

Run: `npm run build`
Expected: Clean build, no errors, no warnings.

- [ ] **Step 3: Commit if any cleanup was needed**

```bash
git add src/app/dashboard/page.tsx
git commit -m "chore: clean up remaining hardcoded hex values in dashboard"
```

Skip this step if no changes were needed.
