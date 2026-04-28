import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'
import { syncWalletClassesForRestaurant } from '@/lib/loyalty/wallet-sync'

const HEX_RE = /^#[0-9A-Fa-f]{6}$/
const HTTPS_RE = /^https:\/\/.+/i

function clean(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length === 0 ? null : trimmed
}

function validateUrl(value: unknown): { ok: true; value: string | null } | { ok: false; error: string } {
  const cleaned = clean(value)
  if (cleaned === null) return { ok: true, value: null }
  if (!HTTPS_RE.test(cleaned)) return { ok: false, error: 'URL doit commencer par https://' }
  return { ok: true, value: cleaned }
}

export async function PATCH(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()

  const update: Record<string, unknown> = {}

  if ('cardTagline' in body) {
    update.card_tagline = clean(body.cardTagline)
  }

  if ('cardColorOverride' in body) {
    const cleaned = clean(body.cardColorOverride)
    if (cleaned !== null && !HEX_RE.test(cleaned)) {
      return NextResponse.json({ error: 'Couleur invalide (format #RRGGBB attendu)' }, { status: 400 })
    }
    update.card_color_override = cleaned
  }

  if ('wideLogoUrl' in body) {
    const r = validateUrl(body.wideLogoUrl)
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 })
    update.wide_logo_url = r.value
  }

  for (const urlField of ['websiteUrl', 'instagramUrl', 'facebookUrl'] as const) {
    if (urlField in body) {
      const r = validateUrl(body[urlField])
      if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 })
      const dbCol = urlField.replace(/([A-Z])/g, '_$1').toLowerCase()
      update[dbCol] = r.value
    }
  }

  for (const boolField of [
    'enableDirections',
    'enableReview',
    'allowMultipleHolders',
    'enableUpdateNotifications',
  ] as const) {
    if (boolField in body) {
      if (typeof body[boolField] !== 'boolean') {
        return NextResponse.json({ error: `${boolField} doit être un booléen` }, { status: 400 })
      }
      const dbCol = boolField.replace(/([A-Z])/g, '_$1').toLowerCase()
      update[dbCol] = body[boolField]
    }
  }

  for (const msgField of ['welcomeMessageFr', 'welcomeMessageEn', 'welcomeMessageDe'] as const) {
    if (msgField in body) {
      const cleaned = clean(body[msgField])
      if (cleaned !== null && cleaned.length > 500) {
        return NextResponse.json({ error: `${msgField} trop long (max 500 caractères)` }, { status: 400 })
      }
      const dbCol = msgField.replace(/([A-Z])/g, '_$1').toLowerCase()
      update[dbCol] = cleaned
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ ok: true, message: 'No changes' })
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('loyalty_programs')
    .update(update as never)
    .eq('restaurant_id', restaurant.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Push changes to Google Wallet (best-effort: don't block on failures)
  syncWalletClassesForRestaurant(restaurant.id).catch(err =>
    console.error('[card-design] wallet sync failed', err),
  )

  return NextResponse.json({ ok: true })
}
