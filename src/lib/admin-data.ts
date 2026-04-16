// src/lib/admin-data.ts
import { createAdminClient } from '@/lib/supabase/admin'
import { getStripe } from '@/lib/stripe'
import type { Restaurant } from '@/types/database'

// ─── Restaurants ─────────────────────────────────────────────

export async function getAllRestaurants(): Promise<Restaurant[]> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('restaurants')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export async function getRestaurantOwnerEmail(ownerId: string): Promise<string | null> {
  const supabase = createAdminClient()
  const { data } = await supabase.auth.admin.getUserById(ownerId)
  return data.user?.email ?? null
}

export async function getRestaurantStats(restaurantId: string) {
  const supabase = createAdminClient()
  const [{ count: categoryCount }, { count: itemCount }, { data: imports }] = await Promise.all([
    supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId),
    supabase
      .from('items')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId),
    supabase
      .from('menu_imports')
      .select('created_at')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: true })
      .limit(1),
  ])
  return {
    categoryCount: categoryCount ?? 0,
    itemCount: itemCount ?? 0,
    firstImportAt: imports?.[0]?.created_at ?? null,
  }
}

// ─── Dashboard stats ──────────────────────────────────────────

export async function getDashboardStats() {
  const restaurants = await getAllRestaurants()

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const active = restaurants.filter(r => r.subscription_status === 'active')
  const trialing = restaurants.filter(r => r.subscription_status === 'trialing')
  const trialExpiringThisWeek = trialing.filter(r => new Date(r.trial_ends_at) <= sevenDaysFromNow)
  const churnedThisMonth = restaurants.filter(
    r => r.subscription_status === 'canceled' && new Date(r.updated_at) >= thirtyDaysAgo
  )

  return {
    totalRestaurants: restaurants.length,
    activeCount: active.length,
    trialingCount: trialing.length,
    trialExpiringCount: trialExpiringThisWeek.length,
    churnThisMonth: churnedThisMonth.length,
    trialExpiringList: trialExpiringThisWeek
      .sort((a, b) => new Date(a.trial_ends_at).getTime() - new Date(b.trial_ends_at).getTime()),
    statusBreakdown: {
      active: active.length,
      trialing: trialing.length,
      past_due: restaurants.filter(r => r.subscription_status === 'past_due').length,
      canceled: restaurants.filter(r => r.subscription_status === 'canceled').length,
    },
  }
}

// ─── MRR ─────────────────────────────────────────────────────

export async function getMRR(): Promise<number> {
  const stripe = getStripe()
  const subscriptions = await stripe.subscriptions.list({
    status: 'active',
    limit: 100,
    expand: ['data.items.data.price'],
  })

  let mrrCents = 0
  for (const sub of subscriptions.data) {
    const item = sub.items.data[0]
    if (!item?.price) continue
    const amount = item.price.unit_amount ?? 0
    const interval = item.price.recurring?.interval
    mrrCents += interval === 'year' ? Math.round(amount / 12) : amount
  }
  return mrrCents / 100
}

// ─── Monthly signups (chart data) ────────────────────────────

export async function getMonthlySignups(months = 6): Promise<Array<{ month: string; count: number }>> {
  const restaurants = await getAllRestaurants()
  const result: Record<string, number> = {}

  const now = new Date()
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = d.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' })
    result[key] = 0
  }

  for (const r of restaurants) {
    const d = new Date(r.created_at)
    const key = d.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' })
    if (key in result) result[key]++
  }

  return Object.entries(result).map(([month, count]) => ({ month, count }))
}

// ─── Stripe subscriptions list (revenue page) ────────────────

export type StripeSubRow = {
  restaurantName: string
  slug: string
  startDate: string
  interval: string
  amountEur: number
  currentPeriodEnd: string
}

export async function getActiveStripeSubscriptions(): Promise<StripeSubRow[]> {
  const supabase = createAdminClient()
  const stripe = getStripe()

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('id, name, slug, stripe_subscription_id')
    .eq('subscription_status', 'active')
    .not('stripe_subscription_id', 'is', null)

  if (!restaurants?.length) return []

  const rows: StripeSubRow[] = []
  await Promise.all(
    restaurants.map(async (r) => {
      try {
        const sub = await stripe.subscriptions.retrieve(r.stripe_subscription_id!, {
          expand: ['items.data.price'],
        })
        const item = sub.items.data[0]
        // current_period_end is present at runtime but removed from newer Stripe SDK types
        const subAny = sub as unknown as { current_period_end: number }
        rows.push({
          restaurantName: r.name,
          slug: r.slug,
          startDate: new Date(sub.start_date * 1000).toLocaleDateString('pt-PT'),
          interval: item?.price?.recurring?.interval === 'year' ? 'Anual' : 'Mensal',
          amountEur: (item?.price?.unit_amount ?? 0) / 100,
          currentPeriodEnd: new Date(subAny.current_period_end * 1000).toLocaleDateString('pt-PT'),
        })
      } catch {
        // Subscription may have been deleted from Stripe
      }
    })
  )
  return rows.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName))
}
