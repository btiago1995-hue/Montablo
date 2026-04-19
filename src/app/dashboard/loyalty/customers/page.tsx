import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltyCustomers } from '@/components/dashboard/loyalty-customers'

export default async function LoyaltyCustomersPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()

  const [{ data: program }, { data: cards }] = await Promise.all([
    admin.from('loyalty_programs').select('*').eq('restaurant_id', restaurant.id).single(),
    admin.from('loyalty_cards').select('*').eq('restaurant_id', restaurant.id).order('created_at', { ascending: false }),
  ])

  if (!program) redirect('/dashboard/loyalty/setup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Clients fidèles</h1>
      <p className="text-muted mb-8">Gérez vos clients et leurs récompenses.</p>
      <LoyaltyCustomers cards={cards ?? []} program={program} />
    </div>
  )
}
