import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { WelcomeClient } from './welcome-client'

export default async function WelcomePage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/dashboard')

  if (restaurant.onboarding_step === 'complete') {
    redirect('/dashboard')
  }

  return <WelcomeClient restaurant={restaurant} />
}
