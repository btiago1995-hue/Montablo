import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { AbonnementClient } from './abonnement-client'

export default async function AbonnementPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary mb-2">Abonnement</h1>
      <p className="text-muted mb-8">
        Gérez votre formule, changez de plan ou résiliez à tout moment.
      </p>
      <AbonnementClient restaurant={restaurant} />
    </div>
  )
}
