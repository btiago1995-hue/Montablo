import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { getResend, EMAIL_FROM } from '@/lib/resend'
import { subscriptionConfirmed, subscriptionCanceled, invoiceIssued } from '@/lib/email-templates'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import type { Restaurant } from '@/types/database'

async function sendEmailToRestaurantOwner(
  restaurantId: string,
  buildEmail: (restaurantName: string, dashboardUrl: string) => { subject: string; html: string },
) {
  const supabase = createAdminClient()
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, owner_id')
    .eq('id', restaurantId)
    .single()

  if (!restaurant) return

  const { data: { user } } = await supabase.auth.admin.getUserById(restaurant.owner_id)
  if (!user?.email) return

  const email = buildEmail(restaurant.name, `${appUrl}/dashboard`)

  await getResend().emails.send({
    from: EMAIL_FROM,
    to: user.email,
    subject: email.subject,
    html: email.html,
  }).catch(() => {
    // Non-blocking
  })
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  const stripe = getStripe()

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalide' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const restaurantId = session.metadata?.restaurant_id
      const tier = session.metadata?.tier as 'essentiel' | 'pro' | undefined
      const billingCycle = session.metadata?.billing_cycle as 'monthly' | 'annual' | undefined

      if (!restaurantId) break

      // Détecter si le coupon LANCEMENT_GENEVOIS a été appliqué
      let isLaunchOffer = false
      let lockedPrice: number | null = null
      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string,
          { expand: ['discounts'] },
        )
        const firstDiscount = sub.discounts?.[0]
        const coupon = typeof firstDiscount === 'object' && firstDiscount !== null
          ? firstDiscount.source?.coupon
          : null
        const couponId = typeof coupon === 'object' && coupon !== null ? coupon.id : coupon
        if (couponId === 'LANCEMENT_GENEVOIS') {
          isLaunchOffer = true
          lockedPrice = 24.0
        }
      }

      await supabase
        .from('restaurants')
        .update({
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_status: 'active',
          tier: tier ?? 'pro',
          billing_cycle: billingCycle ?? 'monthly',
          is_launch_offer: isLaunchOffer,
          launch_offer_locked_price: lockedPrice,
        })
        .eq('id', restaurantId)

      await sendEmailToRestaurantOwner(restaurantId, subscriptionConfirmed)
      break
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const statusMap: Record<string, Restaurant['subscription_status']> = {
        active: 'active',
        past_due: 'past_due',
        canceled: 'canceled',
        unpaid: 'inactive',
      }

      // Lire le premier price ID pour savoir quel tier / cycle
      const priceId = subscription.items.data[0]?.price.id
      const { priceIdToTier } = await import('@/lib/pricing')
      const mapped = priceId ? priceIdToTier(priceId) : null

      await supabase
        .from('restaurants')
        .update({
          subscription_status: statusMap[subscription.status] || 'inactive',
          ...(mapped ? { tier: mapped.tier, billing_cycle: mapped.cycle } : {}),
        })
        .eq('stripe_customer_id', customerId)
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      // Get restaurant ID before updating status
      const { data: restaurant } = await supabase
        .from('restaurants')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      await supabase
        .from('restaurants')
        .update({ subscription_status: 'canceled' })
        .eq('stripe_customer_id', customerId)

      // Send cancellation email
      if (restaurant) {
        await sendEmailToRestaurantOwner(restaurant.id, subscriptionCanceled)
      }
      break
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string

      if (!invoice.hosted_invoice_url) break

      const { data: restaurant } = await supabase
        .from('restaurants')
        .select('id, name, owner_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (!restaurant) break

      const { data: { user } } = await supabase.auth.admin.getUserById(restaurant.owner_id)
      if (!user?.email) break

      const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
      const email = invoiceIssued(
        restaurant.name,
        invoice.amount_paid,
        invoice.currency,
        invoice.period_start,
        invoice.period_end,
        invoice.hosted_invoice_url,
        `${appUrl}/dashboard`,
      )

      await getResend().emails.send({
        from: EMAIL_FROM,
        to: user.email,
        subject: email.subject,
        html: email.html,
      }).catch(() => {
        /* Non-blocking */
      })

      break
    }
  }

  return NextResponse.json({ received: true })
}
