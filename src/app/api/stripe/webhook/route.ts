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

      if (restaurantId) {
        await supabase
          .from('restaurants')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_status: 'active',
          })
          .eq('id', restaurantId)

        // Send subscription confirmed email
        await sendEmailToRestaurantOwner(restaurantId, subscriptionConfirmed)
      }
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

      await supabase
        .from('restaurants')
        .update({
          subscription_status: statusMap[subscription.status] || 'inactive',
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
      }).catch(() => {})

      break
    }
  }

  return NextResponse.json({ received: true })
}
