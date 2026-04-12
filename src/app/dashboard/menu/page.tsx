import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MenuManager } from '@/components/dashboard/menu-manager'

export default async function MenuManagementPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) redirect('/signup')

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order')

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Carte & Plats</h1>
      <p className="text-muted mb-8">Gérez vos catégories et vos plats.</p>
      <MenuManager
        restaurantId={restaurant.id}
        initialCategories={categories ?? []}
        initialItems={items ?? []}
      />
    </div>
  )
}
