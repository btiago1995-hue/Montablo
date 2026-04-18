import { getUser, getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { PaywallOverlay } from '@/components/dashboard/paywall-overlay'
import { TrialBanner } from '@/components/dashboard/trial-banner'
import { isSubscriptionActive, getSubscriptionStatusLabel } from '@/lib/subscription'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  let restaurant = await getRestaurant()

  // Safety net: if user has no restaurant but has metadata, create one
  if (!restaurant && user.user_metadata?.restaurant_name) {
    const adminClient = createAdminClient()
    const restaurantName = user.user_metadata.restaurant_name as string
    const slug = slugify(restaurantName) + '-' + Math.random().toString(36).slice(2, 6)

    const { data: newRestaurant, error: insertError } = await adminClient
      .from('restaurants')
      .insert({
        owner_id: user.id,
        name: restaurantName,
        slug,
      })
      .select('*')
      .single()

    if (insertError) {
      // Restaurant may already exist (created in callback) — try fetching again with admin
      console.error('[dashboard/layout] Restaurant insert failed, retrying fetch:', insertError.message)
      const { data: retryRestaurant } = await adminClient
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .single()
      restaurant = retryRestaurant
    } else {
      restaurant = newRestaurant
    }
  }

  // If still no restaurant, sign out and redirect to signup to break redirect loop
  if (!restaurant) {
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/signup')
  }

  const subscriptionActive = isSubscriptionActive(restaurant)

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex items-start">
      <Sidebar restaurant={restaurant} />
      <main className="flex-1 min-w-0 px-4 py-6 pt-16 sm:p-6 sm:pt-16 lg:pt-8 lg:p-8 lg:ml-[260px] max-w-[1100px]">
        <TrialBanner restaurant={restaurant} />
        {children}
      </main>
      {!subscriptionActive && (
        <PaywallOverlay statusLabel={getSubscriptionStatusLabel(restaurant)} />
      )}
    </div>
  )
}
