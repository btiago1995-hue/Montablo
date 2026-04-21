import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltySetup } from '@/components/dashboard/loyalty-setup'

export default async function LoyaltySetupPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .single()

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Programme de fidélité</h1>
      <p className="text-muted mb-8">Configurez les règles et le design de votre carte.</p>
      <LoyaltySetup restaurantId={restaurant.id} existing={program ?? null} restaurant={restaurant} />
    </div>
  )
}
