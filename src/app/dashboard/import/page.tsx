import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ImportPageClient } from './import-client'

export default async function ImportPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    redirect('/signup')
  }

  // Check if restaurant already has items
  const { count } = await supabase
    .from('items')
    .select('id', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  if (count && count > 0) {
    redirect('/dashboard')
  }

  return <ImportPageClient restaurantId={restaurant.id} />
}
