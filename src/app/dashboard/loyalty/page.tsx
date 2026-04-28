import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Gift, Users, QrCode, Settings, Palette } from 'lucide-react'

export default async function LoyaltyPage() {
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
        <h1 className="font-serif text-3xl text-primary mb-2">Fidélité</h1>
        <p className="text-muted mb-8">Remplacez vos cartes papier par un cartão digital dans le téléphone de vos clients.</p>
        <div className="bg-white border border-border rounded-2xl p-8 text-center max-w-md">
          <Gift className="w-10 h-10 mx-auto mb-4 text-primary opacity-60" />
          <h2 className="font-serif text-xl text-primary mb-2">Configurez votre programme</h2>
          <p className="text-sm text-muted mb-6">Définissez vos règles de fidélité avant d&apos;inscrire des clients.</p>
          <Link
            href="/dashboard/loyalty/setup"
            className="bg-primary text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors inline-block"
          >
            Configurer maintenant
          </Link>
        </div>
      </div>
    )
  }

  const [{ count: totalCards }, { count: rewardCount }] = await Promise.all([
    admin.from('loyalty_cards').select('*', { count: 'exact', head: true }).eq('restaurant_id', restaurant.id),
    admin.from('loyalty_cards').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id)
      .gte('current_value', program.goal),
  ])

  const goalLabel = program.type === 'visits'
    ? `${program.goal} visites`
    : `${(program.goal / 100).toFixed(0)}€`

  return (
    <div>
      <h1 className="font-serif text-3xl text-primary mb-2">Fidélité</h1>
      <p className="text-muted mb-8">Gérez votre programme de fidélité digital.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-border rounded-2xl p-6">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Clients inscrits</p>
          <p className="font-serif text-3xl text-primary">{totalCards ?? 0}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">Récompenses dispo.</p>
          <p className="font-serif text-3xl text-amber-700">{rewardCount ?? 0}</p>
        </div>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 mb-4">
        <p className="text-xs text-muted uppercase tracking-wide mb-1">Programme actuel</p>
        <p className="font-medium text-sm text-foreground">{program.reward_description}</p>
        <p className="text-xs text-muted mt-0.5">après {goalLabel}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          href="/dashboard/loyalty/customers/new"
          className="flex items-center gap-3 bg-primary text-background px-5 py-4 rounded-2xl text-sm font-semibold hover:bg-primary-light transition-colors"
        >
          <Users className="w-5 h-5" />
          Nouveau client
        </Link>
        <Link
          href="/dashboard/loyalty/scan"
          className="flex items-center gap-3 bg-white border border-border text-foreground px-5 py-4 rounded-2xl text-sm font-semibold hover:border-primary/30 hover:bg-surface transition-colors"
        >
          <QrCode className="w-5 h-5" />
          Scanner QR
        </Link>
        <Link
          href="/dashboard/loyalty/customers"
          className="flex items-center gap-3 bg-white border border-border text-foreground px-5 py-4 rounded-2xl text-sm font-semibold hover:border-primary/30 hover:bg-surface transition-colors"
        >
          <Gift className="w-5 h-5" />
          Voir les clients
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <Link
          href="/dashboard/loyalty/personnaliser"
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <Palette className="w-4 h-4" />
          Personnaliser la carte
        </Link>
        <Link
          href="/dashboard/loyalty/setup"
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Modifier le programme
        </Link>
      </div>
    </div>
  )
}
