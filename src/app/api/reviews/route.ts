import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const RATE_LIMIT_MAX = 5

export async function POST(request: Request) {
  try {
    const { restaurantId, rating } = await request.json()

    if (!restaurantId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    const headersList = headers()
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      'unknown'

    const supabase = createAdminClient()

    // Validate that the restaurant exists and has an active subscription
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', restaurantId)
      .in('subscription_status', ['trialing', 'active'])
      .single()

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
    }

    // Rate limit: max 5 reviews per IP per restaurant per hour (persisted in Supabase)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('review_rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('restaurant_id', restaurantId)
      .gte('created_at', oneHourAgo)

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: 'Trop de soumissions. Réessayez plus tard.' },
        { status: 429 }
      )
    }

    // Record rate limit entry and insert review in parallel
    const [{ error: reviewError }] = await Promise.all([
      supabase
        .from('reviews')
        .insert({ restaurant_id: restaurantId, rating }),
      supabase
        .from('review_rate_limits')
        .insert({ ip_address: ip, restaurant_id: restaurantId }),
    ])

    if (reviewError) {
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
