import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  // Safety net: if user has no restaurant but has metadata, create one
  if (!restaurant && user.user_metadata?.restaurant_name) {
    const adminClient = createAdminClient()
    const restaurantName = user.user_metadata.restaurant_name as string
    const slug = slugify(restaurantName) + '-' + Math.random().toString(36).slice(2, 6)

    const { data: newRestaurant } = await adminClient
      .from('restaurants')
      .insert({
        owner_id: user.id,
        name: restaurantName,
        slug,
      })
      .select('*')
      .single()

    restaurant = newRestaurant
  }

  if (!restaurant) {
    redirect('/signup')
  }

  return (
    <div className="min-h-screen bg-[#F5F5F2] flex">
      <Sidebar restaurant={restaurant} />
      <main className="flex-1 p-6 pt-16 lg:pt-8 lg:p-8 lg:ml-[260px] max-w-[1100px]">
        {children}
      </main>
    </div>
  )
}
