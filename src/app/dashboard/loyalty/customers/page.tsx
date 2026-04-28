import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
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
      <Link href="/dashboard/loyalty" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" />
        Retour
      </Link>
      <h1 className="font-serif text-3xl text-primary mb-2">Clients fidèles</h1>
      <p className="text-muted mb-8">Gérez vos clients et leurs récompenses.</p>
      <LoyaltyCustomers cards={cards ?? []} program={program} />
    </div>
  )
}
