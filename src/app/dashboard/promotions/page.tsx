import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PromotionsManager } from '@/components/dashboard/promotions-manager'

export default async function PromotionsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) redirect('/signup')

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('name_fr')

  const { data: promotions } = await supabase
    .from('promotions')
    .select('*')
    .order('created_at', { ascending: false })

  // Filter promotions to only those belonging to this restaurant's items
  const itemIds = new Set((items ?? []).map((i) => i.id))
  const restaurantPromos = (promotions ?? []).filter((p) => itemIds.has(p.item_id))

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Promotions</h1>
      <p className="text-muted mb-8">Créez des offres spéciales sur vos plats.</p>
      <PromotionsManager
        items={items ?? []}
        initialPromotions={restaurantPromos}
      />
    </div>
  )
}
