import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { CardDesigner } from '@/components/dashboard/loyalty-card-designer'

export default async function PersonnaliserPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!program) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-primary mb-2">Personnaliser la carte</h1>
        <p className="text-muted mb-8">
          Vous devez d&apos;abord créer un programme de fidélité avant de personnaliser la carte.
        </p>
        <Link
          href="/dashboard/loyalty/setup"
          className="bg-primary text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors inline-block"
        >
          Configurer le programme
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/dashboard/loyalty"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Retour à la fidélité
      </Link>
      <h1 className="font-serif text-3xl text-primary mb-2">Personnaliser la carte</h1>
      <p className="text-muted mb-8">
        Modifiez l&apos;apparence et le contenu de votre carte de fidélité Google Wallet. L&apos;aperçu se met à jour en temps réel.
      </p>
      <CardDesigner restaurant={restaurant} program={program} />
    </div>
  )
}
