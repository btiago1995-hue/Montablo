# Loyalty Card — Hero Image + GPS Location (Google Wallet)

**Date:** 2026-04-21
**Status:** Design approved, pending implementation plan
**Scope:** Google Wallet only (Apple Wallet parity deferred until Apple Developer Account is active)

## Goal

Make MonTablo's loyalty cards more attractive and useful for end customers by adding two Google Wallet features:

1. **Hero image** — large banner at the top of the card, reusing the restaurant's existing `cover_url`
2. **GPS location** — the card surfaces on the customer's lock screen / Wallet quick access when they are near the restaurant (~150m default Google radius)

Both features are restaurant-level configurations managed by the owner from `/dashboard/settings`. All existing loyalty cards already issued in production are upgraded automatically via `loyaltyClass` PATCH propagation.

## Non-goals

- Push notifications to cardholders (separate spec, later)
- Interactive map picker for precise GPS placement (start with address + geocoding, add map later if users complain)
- Multi-location support (one GPS per restaurant)
- Dedicated `loyalty_hero_url` field separate from `cover_url` (YAGNI; 1 image for cover + wallet covers 90%+ of use cases)
- Apple Wallet integration of these new fields (fields will exist in `PassData`, consumption deferred)
- Google Geocoding API (cost + billing setup; Nominatim is sufficient for ~1 geocode per restaurant)

## Architecture

### Database schema

New columns on `restaurants`:

```sql
alter table restaurants add column address_line text;
alter table restaurants add column city text;
alter table restaurants add column postal_code text;
alter table restaurants add column country_code text default 'FR';
alter table restaurants add column latitude double precision;
alter table restaurants add column longitude double precision;
alter table restaurants add column geocoded_at timestamptz;
```

Structured fields (rather than a single free-text address) are chosen because these same fields will later power schema.org LocalBusiness SEO markup, Google Maps links, and postal-code validation. All fields are nullable — legacy restaurants with no address continue to work; the GPS feature simply does not light up for them.

No new columns for hero image: reuse the existing `restaurants.cover_url`.

### Geocoding

**Provider:** Nominatim (OpenStreetMap) public API at `https://nominatim.openstreetmap.org/search`.

**Why Nominatim:**
- Free, no API key, no billing setup
- Sufficient accuracy for restaurant locations
- Volume is tiny: ~1 geocode per restaurant, only when address fields change
- Google Geocoding would require billing enablement and a second API key; overkill here

**Compliance:**
- Rate limit: 1 request/second (trivial at our volume)
- User-Agent header required: `MonTablo/1.0 (contact@montablo.com)`
- Attribution line added to the legal/terms page

**Flow:**
1. Owner saves address fields in `/dashboard/settings`
2. `PUT /api/restaurant/location` updates the DB row with the new address fields
3. Server queries Nominatim with `"<address_line>, <postal_code> <city>, France"`
4. On success: store `latitude`, `longitude`, `geocoded_at = now()`
5. On failure or empty result: store address fields, leave `latitude`/`longitude` null, return warning to UI
6. If any address field changes later, re-geocode

### Google Wallet integration

All changes live in two files:

**`src/lib/loyalty/pass-design.ts`** — extend `PassData`:

```typescript
export type PassData = {
  // ... existing fields
  heroImageUrl: string | null   // from restaurant.cover_url
  latitude: number | null        // from restaurant.latitude
  longitude: number | null       // from restaurant.longitude
}
```

Populate in `buildPassData` from the already-fetched `Restaurant` row.

**`src/lib/loyalty/google-wallet.ts`** — in `ensureLoyaltyClass`, extend `classBody`:

```typescript
heroImage: data.heroImageUrl ? {
  sourceUri: { uri: data.heroImageUrl },
  contentDescription: {
    defaultValue: { language: 'fr', value: data.restaurantName }
  },
} : undefined,

locations: (data.latitude !== null && data.longitude !== null) ? [{
  latitude: data.latitude,
  longitude: data.longitude,
}] : undefined,
```

Both fields are also included in the PATCH body used when the class already exists, so updates propagate.

**Propagation to existing cards:** Google Wallet's data model is class → object. All `loyaltyObject`s inherit `heroImage` and `locations` from their `loyaltyClass`. Therefore, a single PATCH of the class updates every card issued under that program — no per-card migration needed. Clients see the update within minutes on their next Wallet sync.

### API surface

**Current state:** [src/components/dashboard/settings-form.tsx](src/components/dashboard/settings-form.tsx) writes directly to Supabase from the browser using the client-side SDK — there is no server-side handler today. That bypass means any Wallet re-sync triggered by a settings change (cover, logo, primary color, name) currently does not happen at all. Adding hero image + GPS makes this gap blocking.

**Resolution:** introduce a single server-side route that owns ALL restaurant-level settings writes, and refactor `settings-form.tsx` to POST to it.

| Route | Method | Purpose |
|---|---|---|
| `/api/restaurant/settings` | `PUT` | Update any restaurant field, geocode if address changed, re-sync Wallet classes if any Wallet-visible field changed |

**Handler responsibilities:**
1. Auth — owner must own the restaurant
2. Validate postal code format (`\d{5}`) when `country_code = 'FR'` and `postal_code` is provided
3. Load current `restaurants` row for change detection
4. Apply updates to the `restaurants` row (only fields present in the request body)
5. If any of `address_line`, `city`, `postal_code`, `country_code` changed → call Nominatim; update `latitude`/`longitude`/`geocoded_at`. Failure does not roll back the row; return `geocoded: false` in the response.
6. If any of `name`, `logo_url`, `cover_url`, `primary_color`, `latitude`, `longitude` changed → fetch all `loyalty_programs` for this restaurant and call `ensureLoyaltyClass(classId, passData)` for each (PATCH path) via a shared helper `syncWalletClassesForRestaurant(restaurantId)`
7. Wallet sync errors are logged but do not fail the request — the DB update succeeded, so the UI should show success for the save itself; a separate log/alert captures sync failures
8. Return `{ ok: true, geocoded: true|false|null }` — `null` when no geocoding was needed this request

**Client refactor:** `settings-form.tsx` swaps its direct `supabase.from('restaurants').update(...)` call for `fetch('/api/restaurant/settings', { method: 'PUT', body: ... })`. No other behavior changes.

**Why one route, not two:** Consolidating cover / logo / color / address into a single endpoint avoids duplicating the change-detection + Wallet-sync logic, and avoids a race where two separate saves trigger overlapping Wallet PATCH calls.

### UI

**`/dashboard/settings`** — add a new "Localização du restaurant" section:

```
┌─ Localização du restaurant ─────────────────┐
│ Adresse                                      │
│ [ 12 Rue de la République            ]       │
│                                              │
│ Ville              Code postal               │
│ [ Annecy        ]  [ 74000        ]          │
│                                              │
│ 💡 La géolocalisation permet à la carte     │
│    d'apparaître automatiquement sur l'écran │
│    du téléphone de vos clients quand ils    │
│    passent près du restaurant.               │
│                                              │
│ [ Enregistrer ]                              │
└──────────────────────────────────────────────┘
```

Feedback after save:
- ✅ Green toast: "Adresse enregistrée — votre restaurant est sur la carte 📍"
- ⚠️ Yellow toast: "Adresse enregistrée, mais nous n'avons pas pu la localiser sur la carte. Vérifiez l'orthographe."

**`/dashboard/loyalty/setup`** — add a discoverability banner when hero image or GPS are missing:

```
💡 Pour une carte plus attrayante:
  ☐ Ajoute une image de couverture dans Settings
  ☐ Ajoute l'adresse du restaurant dans Settings
```

Each checkbox links to the relevant anchor in `/dashboard/settings`. Filled items show ✅ instead of ☐.

## Error handling

| Scenario | Behavior |
|---|---|
| Nominatim offline / 5xx | Save address, leave lat/lng null, return warning in API response |
| Nominatim returns zero results | Same as above: address saved, warning surfaced |
| Invalid postal code format | 400 to UI before any DB write |
| Google Wallet API failure during re-sync | Settings save still succeeds (DB write is committed), Wallet sync error is logged to Vercel logs; dashboard shows green toast for the save itself. Customers' cards pick up the change on the next owner-triggered settings edit that retriggers the sync. |
| Restaurant has no `cover_url` | `heroImage` field is omitted from the class; card renders without a banner (same as today) |
| Restaurant has no coordinates | `locations` field is omitted; card has no proximity trigger |

No feature flags. The feature is purely additive: existing restaurants without address or cover simply keep the current card appearance.

## Testing plan

Manual end-to-end (golden path + edge cases):

1. Owner fills valid address → ✅ toast, lat/lng stored, test loyalty card gains `locations`
2. Owner fills invalid address ("dfgdfg") → ⚠️ toast, address saved, lat/lng null
3. Owner updates `cover_url` → hero image appears on existing cards within a Wallet sync cycle (< 5 min observed)
4. New customer issues a card → receives hero + location on first Save-to-Wallet redirect
5. Existing customer with a card already in Wallet → card receives the update without re-adding
6. Restaurant with no address configured → card renders exactly as it does today (no regression)
7. Nominatim rate limit / outage (simulate by pointing to invalid URL) → address still saves; warning toast shown

Automated: unit tests for the geocoding helper (mock fetch), and a unit test for `buildPassData` covering the new fields.

## Rollout

- No feature flag
- Deploy directly to production after `npm run build` passes
- Monitor Vercel logs for Wallet API 4xx/5xx and Nominatim failures for the first 48h
- Rollback path: the new columns are nullable. Reverting the new fields in [src/lib/loyalty/google-wallet.ts](src/lib/loyalty/google-wallet.ts) and [src/lib/loyalty/pass-design.ts](src/lib/loyalty/pass-design.ts) disables hero/GPS immediately. The settings-form refactor is independent — even if kept after a rollback of the Wallet changes, the app continues to function normally (address fields simply aren't consumed). Schema stays in place.

## Out of scope (future specs)

- Push notifications to cardholders (stamp earned, reward ready, promotional)
- Interactive map picker for manual GPS adjustment
- Multi-location support (restaurant chains)
- Dedicated hero image separate from cover
- Apple Wallet consumption of `heroImageUrl` + `latitude` / `longitude` (fields exist in `PassData` but are not yet read by `apple-wallet.ts`; mirrored when Apple Developer Account is active)
- VIP tier system (`rewardsTier`)
- Info module (hours, phone, website links)
