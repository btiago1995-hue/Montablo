import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { MenuManager } from '@/components/dashboard/menu-manager'

export default async function MenuManagementPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const supabase = createClient()

  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase
      .from('categories')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('sort_order'),
    supabase
      .from('items')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('sort_order'),
  ])

  return (
    <div>
      <h1 className="font-serif text-xl sm:text-3xl text-foreground mb-0.5 sm:mb-2">Carte & Plats</h1>
      <p className="text-xs sm:text-base text-muted mb-4 sm:mb-8">Gérez vos catégories et vos plats.</p>
      <MenuManager
        restaurantId={restaurant.id}
        initialCategories={categories ?? []}
        initialItems={items ?? []}
      />
    </div>
  )
}
