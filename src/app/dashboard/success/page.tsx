import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { SuccessClient } from './success-client'

export default async function SuccessPage() {
  const supabase = createClient()
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  if (restaurant.onboarding_step === 'complete') {
    redirect('/dashboard')
  }

  const [{ count: itemCount }, { count: categoryCount }, { data: previewItems }] = await Promise.all([
    supabase
      .from('items')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
    supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id),
    supabase
      .from('items')
      .select('name_fr, price, category_id')
      .eq('restaurant_id', restaurant.id)
      .order('created_at', { ascending: true })
      .limit(6),
  ])

  const { data: cats } = await supabase
    .from('categories')
    .select('id, name_fr')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order', { ascending: true })

  const catMap = new Map(cats?.map((c) => [c.id, c.name_fr]) ?? [])

  await supabase
    .from('restaurants')
    .update({ onboarding_step: 'complete' })
    .eq('id', restaurant.id)

  return (
    <SuccessClient
      restaurant={restaurant}
      itemCount={itemCount ?? 0}
      categoryCount={categoryCount ?? 0}
      previewItems={previewItems ?? []}
      catMap={Object.fromEntries(catMap)}
    />
  )
}
