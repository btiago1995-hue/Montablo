import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'
import { sendLoyaltyCardEmail } from '@/lib/loyalty/email'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })

  const body = await request.json()
  const { customerName, customerEmail, customerPhone } = body

  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: 'customerName and customerEmail required' }, { status: 400 })
  }

  const admin = createAdminClient()
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  const { data: program } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .eq('is_active', true)
    .single()

  if (!program) {
    return NextResponse.json({ error: 'No active loyalty program' }, { status: 404 })
  }

  const authToken = randomUUID().replace(/-/g, '')
  const { data: card, error } = await admin
    .from('loyalty_cards')
    .insert({
      program_id: program.id,
      restaurant_id: restaurant.id,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone ?? null,
      apple_auth_token: authToken,
    })
    .select('*')
    .single()

  if (error || !card) {
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 })
  }

  await admin
    .from('loyalty_cards')
    .update({ apple_pass_serial: card.id })
    .eq('id', card.id)

  await sendLoyaltyCardEmail({
    to: customerEmail,
    customerName,
    restaurantName: restaurant.name,
    restaurantLogoUrl: restaurant.logo_url ?? null,
    restaurantColor: restaurant.primary_color,
    cardId: card.id,
    appUrl,
  }).catch(console.error)

  return NextResponse.json({ id: card.id }, { status: 201 })
}
