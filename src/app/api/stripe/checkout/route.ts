import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { stripePriceEnvName, type Tier, type BillingCycle } from '@/lib/pricing'
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

  const body = await request.json().catch(() => ({}))
  const tier: Tier = body.tier === 'essentiel' ? 'essentiel' : 'pro' // premium jamais via checkout
  const cycle: BillingCycle = body.billing_cycle === 'annual' ? 'annual' : 'monthly'

  const envName = stripePriceEnvName(tier, cycle)
  if (!envName) {
    return NextResponse.json({ error: 'Tier invalide' }, { status: 400 })
  }
  const priceId = process.env[envName]
  if (!priceId) {
    return NextResponse.json({ error: `Price ID manquant (${envName})` }, { status: 500 })
  }

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true, // permet la saisie du coupon LANCEMENT_GENEVOIS
    automatic_tax: { enabled: true },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'}/dashboard/abonnement`,
    metadata: {
      restaurant_id: restaurant.id,
      user_id: user.id,
      tier,
      billing_cycle: cycle,
    },
    subscription_data: {
      metadata: {
        restaurant_id: restaurant.id,
        tier,
        billing_cycle: cycle,
      },
    },
  })

  return NextResponse.json({ url: session.url })
}
