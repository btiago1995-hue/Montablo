import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { SettingsForm } from '@/components/dashboard/settings-form'

export default async function SettingsPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Paramètres</h1>
      <p className="text-muted mb-8">Personnalisez votre restaurant et gérez votre abonnement.</p>
      <SettingsForm restaurant={restaurant} />
    </div>
  )
}
