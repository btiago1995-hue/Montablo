import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
  }

  // Determine which price to use
  const body = await request.json().catch(() => ({}))
  const plan = body.plan === 'annual' ? 'annual' : 'monthly'
  const priceId = plan === 'annual'
    ? process.env.STRIPE_PRICE_ID_ANNUAL!
    : process.env.STRIPE_PRICE_ID!

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    metadata: {
      restaurant_id: restaurant.id,
      user_id: user.id,
    },
  })

  return NextResponse.json({ url: session.url })
}
