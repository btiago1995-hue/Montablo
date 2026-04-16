// src/app/(admin)/admin/restaurants/[slug]/actions.ts
'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { getResend, EMAIL_FROM } from '@/lib/resend'
import { revalidatePath } from 'next/cache'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!

async function assertAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.email !== ADMIN_EMAIL) throw new Error('Unauthorized')
}

export async function extendTrial(restaurantId: string, slug: string): Promise<{ error?: string }> {
  try {
    await assertAdmin()
    const supabase = createAdminClient()
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('trial_ends_at')
      .eq('id', restaurantId)
      .single()

    if (!restaurant) return { error: 'Restaurante não encontrado' }

    const currentEnd = new Date(restaurant.trial_ends_at)
    const base = currentEnd > new Date() ? currentEnd : new Date()
    const newEnd = new Date(base.getTime() + 7 * 24 * 60 * 60 * 1000)

    await supabase
      .from('restaurants')
      .update({
        trial_ends_at: newEnd.toISOString(),
        subscription_status: 'trialing',
      })
      .eq('id', restaurantId)

    revalidatePath(`/admin/restaurants/${slug}`)
    revalidatePath('/admin')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro desconhecido' }
  }
}

export async function sendManualEmail(
  ownerEmail: string,
  subject: string,
  body: string
): Promise<{ error?: string }> {
  try {
    await assertAdmin()
    const resend = getResend()
    await resend.emails.send({
      from: EMAIL_FROM,
      to: ownerEmail,
      subject,
      html: `<p style="font-family:sans-serif;white-space:pre-wrap">${body.replace(/\n/g, '<br>')}</p>`,
    })
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro ao enviar email' }
  }
}

export async function cancelSubscription(
  restaurantId: string,
  stripeSubscriptionId: string,
  slug: string
): Promise<{ error?: string }> {
  try {
    await assertAdmin()
    const stripe = getStripe()
    await stripe.subscriptions.cancel(stripeSubscriptionId)

    const supabase = createAdminClient()
    await supabase
      .from('restaurants')
      .update({ subscription_status: 'canceled' })
      .eq('id', restaurantId)

    revalidatePath(`/admin/restaurants/${slug}`)
    revalidatePath('/admin')
    return {}
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erro ao cancelar subscrição' }
  }
}
