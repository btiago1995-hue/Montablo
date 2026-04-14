import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { ImportPageClient } from './import-client'

export default async function ImportPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  // If still on welcome step, redirect there
  if (restaurant.onboarding_step === 'welcome') {
    redirect('/dashboard/welcome')
  }

  // Check if restaurant already has items
  const supabase = createClient()
  const { count } = await supabase
    .from('items')
    .select('id', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  if (count && count > 0) {
    redirect('/dashboard')
  }

  return <ImportPageClient restaurantId={restaurant.id} />
}
