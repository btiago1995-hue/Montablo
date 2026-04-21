import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'
import { geocodeAddress } from '@/lib/geocoding'
import { syncWalletClassesForRestaurant } from '@/lib/loyalty/wallet-sync'
import type { Restaurant } from '@/types/database'

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
  const update: Partial<Restaurant> = {} as Partial<Restaurant>
  for (const key of allowedKeys) {
    if (key in body) (update as Record<string, unknown>)[key] = body[key]
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
