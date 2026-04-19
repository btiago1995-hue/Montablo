import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'
import { sendLoyaltyCardEmail } from '@/lib/loyalty/email'

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })

  const admin = createAdminClient()
  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*')
    .eq('id', params.id)
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!card) return NextResponse.json({ error: 'Card not found' }, { status: 404 })

  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  await sendLoyaltyCardEmail({
    to: card.customer_email,
    customerName: card.customer_name,
    restaurantName: restaurant.name,
    restaurantLogoUrl: restaurant.logo_url ?? null,
    restaurantColor: restaurant.primary_color,
    cardId: card.id,
    appUrl,
  })

  return NextResponse.json({ ok: true })
}
