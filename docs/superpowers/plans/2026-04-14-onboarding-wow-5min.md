# Onboarding "Wow em 5 Minutos" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a guided 3-step onboarding flow (Welcome → Import → Success) with trial banner to maximize trial→paid conversion.

**Architecture:** Two new dashboard pages (`/dashboard/welcome`, `/dashboard/success`) wrap the existing import flow. A new `onboarding_step` column on the `restaurants` table controls routing. A `TrialBanner` component is added to the dashboard layout.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, Supabase, existing UI components (`ImageUpload`, `Button`)

**Spec:** `docs/superpowers/specs/2026-04-14-onboarding-wow-5min-design.md`

---

### Task 1: Add `onboarding_step` Column to Database

**Files:**
- Modify: Supabase migration (via MCP)

- [ ] **Step 1: Apply migration**

Use Supabase MCP `apply_migration`:
- Name: `add_onboarding_step`
- Query:
```sql
ALTER TABLE restaurants ADD COLUMN onboarding_step text DEFAULT 'welcome';
```

- [ ] **Step 2: Update TypeScript types**

Modify: `src/types/database.ts`

Find the `Restaurant` type and add:
```typescript
onboarding_step: 'welcome' | 'import' | 'complete' | null
```

- [ ] **Step 3: Commit**

```bash
git add src/types/database.ts
git commit -m "feat: add onboarding_step column to restaurants"
```

---

### Task 2: Create Color Palette Picker Component

**Files:**
- Create: `src/components/dashboard/color-palette-picker.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/dashboard/color-palette-picker.tsx`:

```tsx
'use client'

import { useState } from 'react'

const PALETTES = [
  { id: 'classique', name: 'Classique', primary: '#2C3E2D', accent: '#D4A574' },
  { id: 'elegant', name: 'Élégant', primary: '#1B1B2F', accent: '#E8D5B7' },
  { id: 'bistrot', name: 'Bistrot', primary: '#8B2500', accent: '#F5E6C8' },
  { id: 'moderne', name: 'Moderne', primary: '#0D4F4F', accent: '#F0E6D3' },
] as const

export type PaletteId = typeof PALETTES[number]['id']

export function ColorPalettePicker({
  defaultPalette,
  onSelect,
}: {
  defaultPalette?: PaletteId
  onSelect: (primary: string, accent: string) => void
}) {
  const [selected, setSelected] = useState<PaletteId>(defaultPalette ?? 'classique')

  return (
    <div>
      <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-muted mb-3">
        Style de votre menu
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setSelected(p.id)
              onSelect(p.primary, p.accent)
            }}
            className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
              selected === p.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-accent'
            }`}
          >
            <div className="flex gap-1">
              <span className="w-6 h-6 rounded-md" style={{ background: p.primary }} />
              <span className="w-6 h-6 rounded-md" style={{ background: p.accent }} />
            </div>
            <span className="text-[13px] font-semibold text-foreground">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/color-palette-picker.tsx
git commit -m "feat: add color palette picker component"
```

---

### Task 3: Create Welcome Screen Page

**Files:**
- Create: `src/app/dashboard/welcome/page.tsx`

- [ ] **Step 1: Create the welcome page**

Create `src/app/dashboard/welcome/page.tsx`:

```tsx
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { WelcomeClient } from './welcome-client'

export default async function WelcomePage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  // Already completed onboarding — skip to dashboard
  if (restaurant.onboarding_step === 'complete') {
    redirect('/dashboard')
  }

  return <WelcomeClient restaurant={restaurant} />
}
```

- [ ] **Step 2: Create the client component**

Create `src/app/dashboard/welcome/welcome-client.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { UtensilsCrossed } from 'lucide-react'
import { ImageUpload } from '@/components/ui/image-upload'
import { ColorPalettePicker } from '@/components/dashboard/color-palette-picker'
import { Button } from '@/components/ui/button'
import type { Restaurant } from '@/types/database'

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ['Personnaliser', 'Importer', 'Publier']
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          {i > 0 && (
            <div className={`w-10 sm:w-12 h-0.5 mx-2 sm:mx-3 ${i < step ? 'bg-[#2D6A4F]' : 'bg-border'}`} />
          )}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i + 1 < step
                  ? 'bg-[#2D6A4F] text-white'
                  : i + 1 === step
                    ? 'bg-primary text-white'
                    : 'bg-border text-muted'
              }`}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className={`text-[13px] font-semibold hidden sm:inline ${i + 1 <= step ? 'text-foreground' : 'text-muted'}`}>
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function WelcomeClient({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter()
  const [primaryColor, setPrimaryColor] = useState(restaurant.primary_color)
  const [accentColor, setAccentColor] = useState(restaurant.secondary_color)
  const [logoUrl, setLogoUrl] = useState(restaurant.logo_url)
  const [loading, setLoading] = useState(false)

  async function handleContinue() {
    setLoading(true)
    const supabase = createClient()
    await supabase
      .from('restaurants')
      .update({
        primary_color: primaryColor,
        secondary_color: accentColor,
        logo_url: logoUrl,
        onboarding_step: 'import',
      })
      .eq('id', restaurant.id)

    router.push('/dashboard/import')
    router.refresh()
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="flex items-center gap-2 mb-10">
        <UtensilsCrossed className="w-7 h-7 text-primary" />
        <span className="font-serif text-xl text-primary">MonTablo</span>
      </div>

      <ProgressBar step={1} />

      <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 max-w-[520px] w-full">
        <h1 className="font-serif text-[26px] text-foreground mb-2">
          Bienvenue, {restaurant.name} !
        </h1>
        <p className="text-[15px] text-muted mb-8 leading-relaxed">
          Personnalisez l&apos;apparence de votre menu digital.
          Vous pourrez toujours modifier ces choix plus tard.
        </p>

        <div className="space-y-6">
          <ColorPalettePicker
            onSelect={(primary, accent) => {
              setPrimaryColor(primary)
              setAccentColor(accent)
            }}
          />

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-muted mb-3">
              Logo (optionnel)
            </h3>
            <ImageUpload
              value={logoUrl}
              onChange={setLogoUrl}
              className="w-32 h-32"
              hint="512 × 512 px"
            />
          </div>

          <Button onClick={handleContinue} disabled={loading} className="w-full">
            {loading ? 'Enregistrement...' : 'Continuer → Importer mon menu'}
          </Button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/welcome/page.tsx src/app/dashboard/welcome/welcome-client.tsx
git commit -m "feat: add welcome screen for onboarding"
```

---

### Task 4: Create Success Screen Page

**Files:**
- Create: `src/app/dashboard/success/page.tsx`

- [ ] **Step 1: Create the success page**

Create `src/app/dashboard/success/page.tsx`:

```tsx
import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { SuccessClient } from './success-client'

export default async function SuccessPage() {
  const supabase = createClient()
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  // Already completed — go to dashboard
  if (restaurant.onboarding_step === 'complete') {
    redirect('/dashboard')
  }

  // Fetch stats
  const [{ count: itemCount }, { count: categoryCount }, { data: previewItems }] = await Promise.all([
    supabase
      .from('items')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
    supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
    supabase
      .from('items')
      .select('name_fr, price, category_id')
      .eq('restaurant_id', restaurant.id)
      .order('created_at', { ascending: true })
      .limit(6),
  ])

  // Get category names for preview
  const { data: cats } = await supabase
    .from('categories')
    .select('id, name_fr')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order', { ascending: true })

  const catMap = new Map(cats?.map((c) => [c.id, c.name_fr]) ?? [])

  // Mark onboarding complete
  await supabase
    .from('restaurants')
    .update({ onboarding_step: 'complete' })
    .eq('id', restaurant.id)

  return (
    <SuccessClient
      restaurant={restaurant}
      itemCount={itemCount ?? 0}
      categoryCount={categoryCount ?? 0}
      previewItems={previewItems ?? []}
      catMap={Object.fromEntries(catMap)}
    />
  )
}
```

- [ ] **Step 2: Create the client component**

Create `src/app/dashboard/success/success-client.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { UtensilsCrossed, ExternalLink, QrCode } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Restaurant } from '@/types/database'

function ProgressBar() {
  const steps = ['Personnaliser', 'Importer', 'Publier']
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          {i > 0 && <div className="w-10 sm:w-12 h-0.5 mx-2 sm:mx-3 bg-[#2D6A4F]" />}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < 2 ? 'bg-[#2D6A4F] text-white' : 'bg-primary text-white'
              }`}
            >
              {i < 2 ? '✓' : '3'}
            </div>
            <span className="text-[13px] font-semibold text-foreground hidden sm:inline">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SuccessClient({
  restaurant,
  itemCount,
  categoryCount,
  previewItems,
  catMap,
}: {
  restaurant: Restaurant
  itemCount: number
  categoryCount: number
  previewItems: { name_fr: string; price: number; category_id: string }[]
  catMap: Record<string, string>
}) {
  // Group items by category for preview
  const grouped = previewItems.reduce<Record<string, { name_fr: string; price: number }[]>>((acc, item) => {
    const catName = catMap[item.category_id] ?? 'Autres'
    if (!acc[catName]) acc[catName] = []
    acc[catName].push({ name_fr: item.name_fr, price: item.price })
    return acc
  }, {})

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-12 px-4">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="w-7 h-7 text-primary" />
        <span className="font-serif text-xl text-primary">MonTablo</span>
      </div>

      <ProgressBar />

      {/* Check icon */}
      <div className="w-16 h-16 rounded-full bg-[#2D6A4F] flex items-center justify-center mb-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-8 h-8">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-serif text-[30px] text-foreground mb-2">Votre menu est prêt !</h1>
      <p className="text-[15px] text-muted mb-4">Tout a été importé avec succès.</p>

      {/* Stats */}
      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-foreground">{itemCount}</div>
          <div className="text-xs text-muted">plats importés</div>
        </div>
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-foreground">{categoryCount}</div>
          <div className="text-xs text-muted">catégories</div>
        </div>
      </div>

      {/* Menu preview card */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden max-w-[380px] w-full shadow-lg mb-8">
        <div className="p-6 text-center" style={{ background: restaurant.primary_color }}>
          <h2 className="font-serif text-xl text-white">{restaurant.name}</h2>
          <span className="text-white/50 text-xs">Menu</span>
        </div>
        <div className="p-5">
          {Object.entries(grouped).map(([catName, items]) => (
            <div key={catName}>
              <p className="text-[11px] font-bold uppercase tracking-[0.06em] mt-4 mb-2 first:mt-0"
                 style={{ color: restaurant.secondary_color }}>
                {catName}
              </p>
              {items.map((item) => (
                <div key={item.name_fr} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm font-medium text-foreground">{item.name_fr}</span>
                  <span className="text-sm font-semibold text-foreground ml-4">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 max-w-[380px] w-full">
        <Link
          href={`/menu/${restaurant.slug}`}
          target="_blank"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Voir mon menu
        </Link>
        <Link
          href="/dashboard/qr-code"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors"
        >
          <QrCode className="w-4 h-4" />
          Mon QR Code
        </Link>
      </div>

      <Link href="/dashboard" className="mt-4 text-[13px] text-muted hover:text-foreground transition-colors">
        Aller au tableau de bord →
      </Link>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/success/page.tsx src/app/dashboard/success/success-client.tsx
git commit -m "feat: add success screen for onboarding"
```

---

### Task 5: Create Trial Banner Component

**Files:**
- Create: `src/components/dashboard/trial-banner.tsx`

- [ ] **Step 1: Create the banner component**

Create `src/components/dashboard/trial-banner.tsx`:

```tsx
import Link from 'next/link'
import type { Restaurant } from '@/types/database'

export function TrialBanner({ restaurant }: { restaurant: Restaurant }) {
  if (restaurant.subscription_status === 'active') return null
  if (restaurant.subscription_status !== 'trialing') return null

  const trialEnd = new Date(restaurant.trial_ends_at)
  const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000))
  const isUrgent = daysLeft <= 3
  const isExpired = daysLeft === 0

  return (
    <div className={`rounded-xl px-4 py-3 mb-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center ${
      isExpired
        ? 'bg-red-50 border border-red-200'
        : isUrgent
          ? 'bg-amber-50 border border-amber-200'
          : 'bg-primary text-white'
    }`}>
      <p className={`text-[13px] ${
        isExpired ? 'text-red-800' : isUrgent ? 'text-amber-800' : 'text-white/80'
      }`}>
        {isExpired ? (
          <>Votre essai gratuit a expiré</>
        ) : isUrgent ? (
          <>⚠️ Plus que <strong className="text-amber-900">{daysLeft} jour{daysLeft !== 1 ? 's' : ''}</strong> d&apos;essai !</>
        ) : (
          <>🕐 Essai gratuit — <strong className="text-accent">{daysLeft} jours restants</strong></>
        )}
      </p>
      <Link
        href="/dashboard/settings"
        className={`text-xs font-bold px-4 py-1.5 rounded-md transition-colors ${
          isExpired
            ? 'bg-red-600 text-white hover:bg-red-700'
            : isUrgent
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-accent text-foreground hover:bg-accent-light'
        }`}
      >
        Souscrire maintenant
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/dashboard/trial-banner.tsx
git commit -m "feat: add trial countdown banner component"
```

---

### Task 6: Wire Up Routing and Layout

**Files:**
- Modify: `src/app/dashboard/layout.tsx`
- Modify: `src/app/dashboard/import/import-client.tsx`
- Modify: `src/app/(auth)/signup/page.tsx`

- [ ] **Step 1: Add trial banner to dashboard layout**

In `src/app/dashboard/layout.tsx`, add the import at the top:
```tsx
import { TrialBanner } from '@/components/dashboard/trial-banner'
```

Then inside the return, add `<TrialBanner>` as the first child of `<main>`:
```tsx
<main className="flex-1 px-4 py-6 pt-16 sm:p-6 sm:pt-16 lg:pt-8 lg:p-8 lg:ml-[260px] max-w-[1100px]">
  <TrialBanner restaurant={restaurant} />
  {children}
</main>
```

- [ ] **Step 2: Update import page redirect to success**

In `src/app/dashboard/import/import-client.tsx`, change the `onComplete` callback from:
```tsx
onComplete={() => {
  router.push('/dashboard')
  router.refresh()
}}
```
To:
```tsx
onComplete={() => {
  router.push('/dashboard/success')
  router.refresh()
}}
```

- [ ] **Step 3: Update signup redirect to welcome**

In `src/app/(auth)/signup/page.tsx`, change line 68 from:
```tsx
router.push('/dashboard/import')
```
To:
```tsx
router.push('/dashboard/welcome')
```

- [ ] **Step 4: Update import page to redirect to welcome if needed**

In `src/app/dashboard/import/page.tsx`, add onboarding check. Replace the existing content with:

```tsx
import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { ImportPageClient } from './import-client'

export default async function ImportPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  // If still on welcome step, redirect there
  if (restaurant.onboarding_step === 'welcome') {
    redirect('/dashboard/welcome')
  }

  // Check if restaurant already has items
  const supabase = createClient()
  const { count } = await supabase
    .from('items')
    .select('id', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  if (count && count > 0) {
    redirect('/dashboard')
  }

  return <ImportPageClient restaurantId={restaurant.id} />
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/layout.tsx src/app/dashboard/import/import-client.tsx src/app/dashboard/import/page.tsx src/app/\(auth\)/signup/page.tsx
git commit -m "feat: wire onboarding routing and trial banner"
```

---

### Task 7: Build Verification

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: Build passes with 0 TypeScript errors. New routes visible:
- `/dashboard/welcome`
- `/dashboard/success`

- [ ] **Step 2: Fix any build errors**

If TypeScript errors occur, fix them and re-run build.

- [ ] **Step 3: Final commit and push**

```bash
git add -A
git commit -m "feat: complete onboarding wow-5-min flow"
git push origin main
```
