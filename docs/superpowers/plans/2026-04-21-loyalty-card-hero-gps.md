# Loyalty Card — Hero Image + GPS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hero banner image (reusing `restaurants.cover_url`) and GPS location to Google Wallet loyalty cards so cards surface on customers' lock screens near the restaurant, and refactor the restaurant-settings save so that any Wallet-visible change (name, logo, cover, color, location) propagates automatically to every issued card via `loyaltyClass` PATCH.

**Architecture:** New structured address columns on `restaurants`. A thin Nominatim-backed geocoder converts address → lat/lng. A new `PUT /api/restaurant/settings` route owns all restaurant-level settings writes; when relevant fields change it re-syncs the Google Wallet class, which Google then propagates to every cardholder automatically. Hero image maps to Google Wallet's `heroImage` class field; lat/lng maps to the `locations` array.

**Tech Stack:** Next.js 14 API routes, Supabase (admin client), Google Wallet REST API (`google-auth-library`, `jsonwebtoken`), Nominatim public API, Tailwind CSS.

**Spec:** [docs/superpowers/specs/2026-04-21-loyalty-card-hero-gps-design.md](../specs/2026-04-21-loyalty-card-hero-gps-design.md)

---

## File Map

### New files
| File | Responsibility |
|---|---|
| `src/lib/geocoding.ts` | Nominatim call + compliant User-Agent; returns `{ latitude, longitude } \| null` |
| `src/lib/loyalty/wallet-sync.ts` | `syncWalletClassesForRestaurant(restaurantId)` — PATCH every loyalty class owned by the restaurant |
| `src/app/api/restaurant/settings/route.ts` | `PUT` — owner-auth'd settings update with geocoding + wallet re-sync side effects |

### Modified files
| File | Change |
|---|---|
| `supabase/schema.sql` | Append `ALTER TABLE` block for the new restaurant address columns |
| `src/types/database.ts` | Extend `Restaurant` with 7 new nullable address/GPS fields |
| `src/lib/loyalty/pass-design.ts` | Add `heroImageUrl`, `latitude`, `longitude` to `PassData`; populate in `buildPassData` |
| `src/lib/loyalty/google-wallet.ts` | Add `heroImage` + `locations` to class create body and class PATCH body |
| `src/components/dashboard/settings-form.tsx` | Swap direct Supabase write for `fetch('/api/restaurant/settings')`; add "Localização" section |
| `src/components/dashboard/loyalty-setup.tsx` | Add discoverability banner linking to `/dashboard/settings` when cover/address missing |

---

## Task 1: Database migration — add restaurant address columns

**Files:**
- Modify: `supabase/schema.sql`
- Apply via: Supabase MCP `apply_migration`

- [ ] **Step 1: Apply the migration against the live database**

Use Supabase MCP `apply_migration` with name `add_restaurant_address_and_gps` and this SQL:

```sql
ALTER TABLE restaurants ADD COLUMN address_line TEXT;
ALTER TABLE restaurants ADD COLUMN city TEXT;
ALTER TABLE restaurants ADD COLUMN postal_code TEXT;
ALTER TABLE restaurants ADD COLUMN country_code TEXT DEFAULT 'FR';
ALTER TABLE restaurants ADD COLUMN latitude DOUBLE PRECISION;
ALTER TABLE restaurants ADD COLUMN longitude DOUBLE PRECISION;
ALTER TABLE restaurants ADD COLUMN geocoded_at TIMESTAMPTZ;
```

Expected: migration succeeds; no error.

- [ ] **Step 2: Mirror the migration in `supabase/schema.sql`**

Append at the very end of the file (after all existing statements), in a single trailing block:

```sql
-- 2026-04-21: restaurant address + GPS for Google Wallet hero + locations
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS address_line TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS country_code TEXT DEFAULT 'FR';
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS geocoded_at TIMESTAMPTZ;
```

`IF NOT EXISTS` keeps `schema.sql` idempotent so a fresh replay does not fail on a database where the migration has already been applied.

- [ ] **Step 3: Verify with Supabase MCP**

Use Supabase MCP `list_tables` with schemas=`["public"]` and confirm the `restaurants` table shows the 7 new columns with their correct types.

- [ ] **Step 4: Commit**

```bash
git add supabase/schema.sql
git commit -m "feat(db): add restaurant address + GPS columns"
```

---

## Task 2: Extend `Restaurant` type

**Files:**
- Modify: `src/types/database.ts:1-20` (the `Restaurant` type definition)

- [ ] **Step 1: Add 7 nullable fields to `Restaurant`**

Insert these lines inside the `Restaurant` type, after `languages: string[]`:

```typescript
  address_line: string | null
  city: string | null
  postal_code: string | null
  country_code: string | null
  latitude: number | null
  longitude: number | null
  geocoded_at: string | null
```

All fields are nullable because the migration did not backfill existing rows.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build`
Expected: PASS (no new type errors; existing code reads `restaurant.name`, `restaurant.cover_url`, etc., and does not touch the new fields yet).

- [ ] **Step 3: Commit**

```bash
git add src/types/database.ts
git commit -m "feat(types): add address + GPS fields to Restaurant"
```

---

## Task 3: Nominatim geocoding helper

**Files:**
- Create: `src/lib/geocoding.ts`

- [ ] **Step 1: Write the geocoding helper**

Create the file with this exact content:

```typescript
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const USER_AGENT = 'MonTablo/1.0 (contact@montablo.com)'

export type GeocodeInput = {
  addressLine: string
  city: string | null
  postalCode: string | null
  countryCode: string
}

export type GeocodeResult = {
  latitude: number
  longitude: number
}

export async function geocodeAddress(input: GeocodeInput): Promise<GeocodeResult | null> {
  const parts = [input.addressLine, input.postalCode, input.city, input.countryCode]
    .filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
  const query = parts.join(', ')
  if (!query) return null

  const url = `${NOMINATIM_URL}?q=${encodeURIComponent(query)}&format=json&limit=1`

  let res: Response
  try {
    res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store',
    })
  } catch {
    return null
  }

  if (!res.ok) return null

  const data = (await res.json()) as Array<{ lat: string; lon: string }>
  if (!Array.isArray(data) || data.length === 0) return null

  const first = data[0]
  const latitude = Number(first.lat)
  const longitude = Number(first.lon)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null

  return { latitude, longitude }
}
```

Design notes:
- Returns `null` for any failure (network, HTTP error, zero results, malformed response). Callers decide how to surface the warning.
- No retry loop: Nominatim is called at most once per settings save. A failed geocode leaves `latitude`/`longitude` untouched so the owner can try again by editing the address.
- `cache: 'no-store'` because Next.js would otherwise cache the response.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Manual smoke test in a dev shell**

Create a throwaway script `/tmp/geocode-smoke.ts`:

```typescript
import { geocodeAddress } from '@/lib/geocoding'
geocodeAddress({
  addressLine: '12 Rue de la République',
  city: 'Annecy',
  postalCode: '74000',
  countryCode: 'FR',
}).then(r => console.log('result:', r))
```

Run: `npx tsx /tmp/geocode-smoke.ts` (or add a temp dev route if tsx is unavailable).
Expected: logs `{ latitude: 45.89..., longitude: 6.12... }`. Delete the scratch file after verifying.

- [ ] **Step 4: Commit**

```bash
git add src/lib/geocoding.ts
git commit -m "feat(geo): Nominatim address geocoder"
```

---

## Task 4: Extend `PassData` with hero + GPS fields

**Files:**
- Modify: `src/lib/loyalty/pass-design.ts`

- [ ] **Step 1: Add fields to the `PassData` type**

Inside the `PassData` type, below `goalValue`, add:

```typescript
  heroImageUrl: string | null
  latitude: number | null
  longitude: number | null
```

- [ ] **Step 2: Populate them in `buildPassData`**

At the bottom of the returned object (after `goalValue: program.goal,`), add:

```typescript
    heroImageUrl: restaurant.cover_url,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: PASS. The two consumers of `PassData` are `google-wallet.ts` and `apple-wallet.ts`; both ignore unknown-to-them fields, so the build stays green without touching them yet.

- [ ] **Step 4: Commit**

```bash
git add src/lib/loyalty/pass-design.ts
git commit -m "feat(loyalty): carry hero image + GPS in PassData"
```

---

## Task 5: Consume hero + GPS in `google-wallet.ts`

**Files:**
- Modify: `src/lib/loyalty/google-wallet.ts` — `ensureLoyaltyClass` function (around `src/lib/loyalty/google-wallet.ts:88-138`)

- [ ] **Step 1: Add `heroImage` and `locations` to the class body**

Locate the `classBody` object inside `ensureLoyaltyClass`. Replace the existing assignment with:

```typescript
  const classBody: Record<string, unknown> = {
    id: classId,
    issuerName: data.restaurantName,
    programName: data.tagline,
    programLogo: {
      sourceUri: { uri: logoUri },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    },
    hexBackgroundColor: hexColor(data.primaryColor),
    reviewStatus: 'UNDER_REVIEW',
  }

  if (data.heroImageUrl) {
    classBody.heroImage = {
      sourceUri: { uri: data.heroImageUrl },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    }
  }

  if (data.latitude !== null && data.longitude !== null) {
    classBody.locations = [{ latitude: data.latitude, longitude: data.longitude }]
  }
```

Rationale for conditional inclusion: if a restaurant has no cover or no geocoded address, we must NOT send an empty `heroImage` or `locations: []` to Google — those values are rejected.

- [ ] **Step 2: Include the same fields in the PATCH body**

Still inside `ensureLoyaltyClass`, find the existing `PATCH` call (the `else if (checkRes.ok)` branch). Replace its `body: JSON.stringify({...})` payload with:

```typescript
      body: JSON.stringify({
        issuerName: classBody.issuerName,
        programName: classBody.programName,
        programLogo: classBody.programLogo,
        hexBackgroundColor: classBody.hexBackgroundColor,
        heroImage: classBody.heroImage ?? null,
        locations: classBody.locations ?? null,
      }),
```

Sending `null` for absent fields explicitly clears a previously-set value on Google's side when the owner removes their cover image or address — this is what owners expect.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/lib/loyalty/google-wallet.ts
git commit -m "feat(wallet): hero image + locations on Google loyalty class"
```

---

## Task 6: Wallet sync helper

**Files:**
- Create: `src/lib/loyalty/wallet-sync.ts`

- [ ] **Step 1: Write the helper**

Create the file with this exact content:

```typescript
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from './pass-design'
import { ensureLoyaltyClassForResync } from './google-wallet'
import type { Restaurant, LoyaltyProgram, LoyaltyCard } from '@/types/database'

function placeholderCard(program: LoyaltyProgram, restaurant: Restaurant): LoyaltyCard {
  return {
    id: 'sync-placeholder',
    program_id: program.id,
    restaurant_id: restaurant.id,
    customer_name: '',
    customer_email: '',
    customer_phone: null,
    current_value: 0,
    total_redeemed: 0,
    apple_pass_serial: null,
    apple_auth_token: null,
    google_pass_id: null,
    created_at: new Date().toISOString(),
  }
}

export async function syncWalletClassesForRestaurant(restaurantId: string): Promise<void> {
  const admin = createAdminClient()

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single<Restaurant>()
  if (!restaurant) return

  const { data: programs } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurantId)
  if (!programs || programs.length === 0) return

  for (const program of programs as LoyaltyProgram[]) {
    const { data: anyCard } = await admin
      .from('loyalty_cards')
      .select('*')
      .eq('program_id', program.id)
      .limit(1)
      .maybeSingle<LoyaltyCard>()

    const card = (anyCard as LoyaltyCard | null) ?? placeholderCard(program, restaurant)
    const passData = buildPassData(restaurant, program, card)

    try {
      await ensureLoyaltyClassForResync(program.id, passData)
    } catch (err) {
      console.error('[wallet-sync] failed for program', program.id, err)
      // Continue syncing remaining programs; do not bubble up.
    }
  }
}
```

Design notes:
- `buildPassData` requires a `LoyaltyCard`, but the Google Wallet *class* body (which is all we PATCH here) only reads restaurant + program fields (`restaurantName`, `tagline`, `primaryColor`, `logoUrl`, `heroImageUrl`, `latitude`, `longitude`). The card-specific fields (`serialNumber`, `customerName`, etc.) feed the *object* body, which we are not touching in a resync. A placeholder card is therefore safe and lets resync work even before any customer exists.
- Errors are logged, not thrown: Google's API failing should not block the owner's settings save.
- The helper is a server-only module (imports `@/lib/supabase/admin`). Do not import it from client components.

- [ ] **Step 2: Expose a resync entry point in `google-wallet.ts`**

`ensureLoyaltyClass` is currently private. Add a thin exported wrapper at the bottom of `src/lib/loyalty/google-wallet.ts`:

```typescript
export async function ensureLoyaltyClassForResync(
  programId: string,
  data: PassData,
): Promise<void> {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!
  const classId = `${issuerId}.program_${programId}`
  await ensureLoyaltyClass(classId, data)
}
```

This reuses the existing `ensureLoyaltyClass` (no logic duplication) and keeps the `classId` construction consistent with `generateGoogleWalletUrl`.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/lib/loyalty/wallet-sync.ts src/lib/loyalty/google-wallet.ts
git commit -m "feat(wallet): syncWalletClassesForRestaurant helper"
```

---

## Task 7: `PUT /api/restaurant/settings` route

**Files:**
- Create: `src/app/api/restaurant/settings/route.ts`

- [ ] **Step 1: Write the route handler**

Create the file with this exact content:

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'
import { geocodeAddress } from '@/lib/geocoding'
import { syncWalletClassesForRestaurant } from '@/lib/loyalty/wallet-sync'

type Body = {
  name?: string
  logo_url?: string | null
  cover_url?: string | null
  primary_color?: string
  secondary_color?: string
  unavailable_behavior?: 'greyed_out' | 'hidden'
  google_review_url?: string | null
  address_line?: string | null
  city?: string | null
  postal_code?: string | null
  country_code?: string | null
}

const WALLET_TRIGGER_FIELDS = [
  'name',
  'logo_url',
  'cover_url',
  'primary_color',
] as const

const ADDRESS_FIELDS = [
  'address_line',
  'city',
  'postal_code',
  'country_code',
] as const

export async function PUT(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = (await request.json()) as Body

  // Reject unknown keys defensively — only allow the documented set
  const allowedKeys: Array<keyof Body> = [
    'name', 'logo_url', 'cover_url', 'primary_color', 'secondary_color',
    'unavailable_behavior', 'google_review_url',
    'address_line', 'city', 'postal_code', 'country_code',
  ]
  const update: Record<string, unknown> = {}
  for (const key of allowedKeys) {
    if (key in body) update[key] = body[key]
  }

  // Postal-code format check for France
  const countryCode = (body.country_code ?? restaurant.country_code ?? 'FR') as string
  const postalCode = (body.postal_code ?? null) as string | null
  if (countryCode === 'FR' && postalCode && !/^\d{5}$/.test(postalCode)) {
    return NextResponse.json({ error: 'Code postal invalide' }, { status: 400 })
  }

  // Detect which buckets of fields changed
  const walletChanged = WALLET_TRIGGER_FIELDS.some(
    (k) => k in body && body[k] !== (restaurant as Record<string, unknown>)[k],
  )
  const addressChanged = ADDRESS_FIELDS.some(
    (k) => k in body && body[k] !== (restaurant as Record<string, unknown>)[k],
  )

  // Geocode if address changed
  let geocoded: boolean | null = null
  if (addressChanged) {
    const input = {
      addressLine: (body.address_line ?? restaurant.address_line ?? '') as string,
      city: (body.city ?? restaurant.city ?? null) as string | null,
      postalCode: (body.postal_code ?? restaurant.postal_code ?? null) as string | null,
      countryCode,
    }
    if (input.addressLine.trim().length === 0) {
      // Owner cleared the address — null out GPS as well
      update.latitude = null
      update.longitude = null
      update.geocoded_at = null
      geocoded = null
    } else {
      const result = await geocodeAddress(input)
      if (result) {
        update.latitude = result.latitude
        update.longitude = result.longitude
        update.geocoded_at = new Date().toISOString()
        geocoded = true
      } else {
        update.latitude = null
        update.longitude = null
        update.geocoded_at = null
        geocoded = false
      }
    }
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('restaurants')
    .update(update)
    .eq('id', restaurant.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Wallet re-sync (fire-and-forget style; errors logged in helper)
  if (walletChanged || addressChanged) {
    // Re-fetch the updated row so the helper works off the latest state
    await syncWalletClassesForRestaurant(restaurant.id)
  }

  return NextResponse.json({ ok: true, geocoded })
}
```

Design notes:
- `getRestaurant()` returns the owner's restaurant, scoped by RLS — no need to re-check ownership here.
- `body[k] !== restaurant[k]` treats absence as unchanged, so a partial PATCH-style payload works.
- Wallet sync is `await`ed, not fire-and-forget: Vercel serverless kills orphan promises. We rely on `syncWalletClassesForRestaurant` catching its own errors so it never throws.

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/restaurant/settings/route.ts
git commit -m "feat(api): PUT /api/restaurant/settings with geocoding + wallet sync"
```

---

## Task 8: Refactor `settings-form.tsx` to use the new route, add location section

**Files:**
- Modify: `src/components/dashboard/settings-form.tsx`

- [ ] **Step 1: Add state for address fields and a `geocodeStatus` signal**

Inside `SettingsForm`, below the existing `useState` calls (around `src/components/dashboard/settings-form.tsx:20`), add:

```typescript
  const [addressLine, setAddressLine] = useState(restaurant.address_line ?? '')
  const [city, setCity] = useState(restaurant.city ?? '')
  const [postalCode, setPostalCode] = useState(restaurant.postal_code ?? '')
  const [geocodeStatus, setGeocodeStatus] = useState<'idle' | 'ok' | 'warn'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
```

- [ ] **Step 2: Replace `handleSave` with the API-backed version**

Replace the entire current `handleSave` (lines `src/components/dashboard/settings-form.tsx:27-49`) with:

```typescript
  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setGeocodeStatus('idle')

    const res = await fetch('/api/restaurant/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        logo_url: logoUrl,
        cover_url: coverUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        unavailable_behavior: behavior,
        google_review_url: googleReviewUrl.trim() || null,
        address_line: addressLine.trim() || null,
        city: city.trim() || null,
        postal_code: postalCode.trim() || null,
        country_code: 'FR',
      }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setErrorMsg(data.error ?? 'Erreur lors de l\'enregistrement.')
      return
    }

    const data = (await res.json()) as { geocoded: boolean | null }
    if (data.geocoded === false) {
      setGeocodeStatus('warn')
    } else {
      setGeocodeStatus('ok')
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    router.refresh()
  }
```

- [ ] **Step 3: Remove the now-unused Supabase client import**

At the top of the file, remove:

```typescript
import { createClient } from '@/lib/supabase/client'
```

The form no longer reaches Supabase directly. The build will flag unused imports — this clears that.

- [ ] **Step 4: Add the "Localização" section to the form JSX**

Insert this block **before** the closing `</form>` of the first form (immediately before the existing "Submit" button, around `src/components/dashboard/settings-form.tsx:183`):

```tsx
        <div className="pt-4 border-t border-border space-y-4">
          <div>
            <h3 className="font-medium text-foreground">Adresse du restaurant</h3>
            <p className="text-sm text-muted mt-1">
              La géolocalisation permet à la carte de fidélité d&apos;apparaître automatiquement
              sur l&apos;écran du téléphone de vos clients quand ils passent près du restaurant.
            </p>
          </div>

          <Input
            label="Adresse"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            placeholder="12 Rue de la République"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Annecy"
            />
            <Input
              label="Code postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="74000"
            />
          </div>

          {geocodeStatus === 'ok' && saved && (
            <p className="text-sm text-green-700">
              📍 Adresse enregistrée — votre restaurant est sur la carte.
            </p>
          )}
          {geocodeStatus === 'warn' && (
            <p className="text-sm text-amber-700">
              ⚠️ Adresse enregistrée, mais nous n&apos;avons pas pu la localiser sur la carte.
              Vérifiez l&apos;orthographe.
            </p>
          )}
          {errorMsg && (
            <p className="text-sm text-red-700">{errorMsg}</p>
          )}
        </div>
```

- [ ] **Step 5: Verify the build passes**

Run: `npm run build`
Expected: PASS with no unused-import warnings.

- [ ] **Step 6: Manual browser smoke test**

Run: `npm run dev`
1. Open `/dashboard/settings` in the browser.
2. Fill the address fields with a real address (e.g., the address of a known restaurant in Annecy).
3. Click "Enregistrer".
4. Expect the green 📍 toast and the address fields to stay filled on refresh.
5. Change the address to "gibberish zzzzz" and save again.
6. Expect the amber ⚠️ warning.
7. Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/components/dashboard/settings-form.tsx
git commit -m "feat(settings): address fields + API-backed save"
```

---

## Task 9: Discoverability banner on loyalty setup

**Files:**
- Modify: `src/app/dashboard/loyalty/setup/page.tsx` (pass restaurant down) and `src/components/dashboard/loyalty-setup.tsx`

- [ ] **Step 1: Pass the restaurant into the client component**

Check `src/app/dashboard/loyalty/setup/page.tsx`: if it does not already pass `restaurant` to `<LoyaltySetup />`, add it. The existing server component already fetches the restaurant via `getRestaurant()` for the auth check. Concretely, ensure the JSX renders:

```tsx
<LoyaltySetup restaurantId={restaurant.id} existing={existing} restaurant={restaurant} />
```

- [ ] **Step 2: Accept the new prop in `LoyaltySetup`**

In `src/components/dashboard/loyalty-setup.tsx`, extend the `Props` type (around `src/components/dashboard/loyalty-setup.tsx:7-10`):

```typescript
import type { LoyaltyProgram, Restaurant } from '@/types/database'

type Props = {
  restaurantId: string
  existing: LoyaltyProgram | null
  restaurant: Restaurant
}

export function LoyaltySetup({ existing, restaurant }: Props) {
```

- [ ] **Step 3: Add the banner near the top of the returned JSX**

At the very top of the returned `<div className="max-w-lg space-y-6">` (around `src/components/dashboard/loyalty-setup.tsx:48-49`), insert:

```tsx
      {(!restaurant.cover_url || restaurant.latitude === null) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <p className="font-medium text-amber-900 mb-2">
            💡 Pour une carte plus attrayante :
          </p>
          <ul className="space-y-1.5 text-amber-900">
            <li>
              {restaurant.cover_url ? '✅' : '☐'}{' '}
              <a href="/dashboard/settings" className="underline">
                Ajoutez une image de couverture
              </a>
            </li>
            <li>
              {restaurant.latitude !== null ? '✅' : '☐'}{' '}
              <a href="/dashboard/settings" className="underline">
                Ajoutez l&apos;adresse du restaurant
              </a>
            </li>
          </ul>
        </div>
      )}
```

- [ ] **Step 4: Verify the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Manual browser smoke test**

Run: `npm run dev`
1. Open `/dashboard/loyalty/setup` with an account that has *no* cover and *no* address.
2. Expect the amber banner showing both ☐ items.
3. Fill the cover (upload a real image in settings) and address, return to the loyalty setup page.
4. Expect the banner to disappear entirely once both cover and address are set (the `(!cover || lat === null)` condition is false when both are present).

- [ ] **Step 6: Commit**

```bash
git add src/app/dashboard/loyalty/setup/page.tsx src/components/dashboard/loyalty-setup.tsx
git commit -m "feat(loyalty): discoverability banner for hero + GPS setup"
```

---

## Task 10: End-to-end verification with a real wallet card

**Files:** None modified. This is a pure verification pass.

- [ ] **Step 1: Issue a new loyalty card as a customer**

Run: `npm run dev`
1. In the dashboard, create a loyalty program if none exists.
2. Register a new customer using your own email.
3. Check your inbox; open the email on an Android device (or Google Pay on a desktop).
4. Click "Add to Google Wallet".
5. Expect the card to show: the hero banner (cover image), the restaurant name, the primary color, and a location pin metadata (Google Wallet UI shows "On the go" notifications setting).

- [ ] **Step 2: Propagation test (existing card receives hero + GPS update)**

1. With the card still added to Google Wallet on the test device, go to `/dashboard/settings`.
2. Swap the cover image to a different picture. Save.
3. Wait 1–5 minutes, then open the card in Google Wallet.
4. Expect the hero banner to have updated to the new image without re-issuing the card.

- [ ] **Step 3: Missing-data fallback test**

1. In `/dashboard/settings`, clear the address fields. Save.
2. Issue a brand-new card as a different customer.
3. Open the new card in Google Wallet.
4. Expect NO "locations" metadata, no errors — card renders normally.

- [ ] **Step 4: If all three pass, commit a doc marker**

No code change. This confirms the rollout criteria from the spec are met. Run:

```bash
git log --oneline -10
```

Expected: see the chain of 8 commits from Tasks 1–9.

---

## Task 11: Deploy

**Files:** None.

- [ ] **Step 1: Final build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

Vercel auto-deploys on push.

- [ ] **Step 3: Smoke test in production**

Open `https://www.montablo.com/dashboard/settings` in a browser with a real owner account.
1. Confirm the "Adresse du restaurant" section renders.
2. Save with a valid address; confirm the green toast.
3. Check Vercel logs (`vercel logs`) for the 2 minutes after the save for any Wallet API 4xx/5xx errors.

- [ ] **Step 4: Watch for 48h**

Monitor Vercel logs and the Supabase `restaurants` table (`geocoded_at` column should be non-null for any restaurant that saved an address).

---

## Out of scope / future work

Deliberately NOT in this plan (tracked in the spec's "Out of scope" section):
- Push notifications on stamp / reward (next feature)
- Interactive map picker
- Multi-location restaurants
- Dedicated hero field separate from cover
- Apple Wallet consumption of `heroImageUrl` / lat / lng (fields already flow through `PassData`; wiring happens when Apple Developer Account is active)
- VIP tier system
- Info module (hours, phone, links) on the card
