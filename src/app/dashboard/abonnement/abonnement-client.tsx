'use client'

import { useState } from 'react'
import type { Restaurant } from '@/types/database'
import { TIERS, type Tier, type BillingCycle } from '@/lib/pricing'
import { Check, Loader2 } from 'lucide-react'

export function AbonnementClient({ restaurant }: { restaurant: Restaurant }) {
  const [cycle, setCycle] = useState<BillingCycle>(restaurant.billing_cycle ?? 'monthly')
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null)

  async function subscribe(tier: Tier) {
    setLoadingTier(tier)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billing_cycle: cycle }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setLoadingTier(null)
    }
  }

  const currentTier = restaurant.tier
  const isTrialing = restaurant.subscription_status === 'trialing'
  const isActive = restaurant.subscription_status === 'active'
  const trialDaysLeft = restaurant.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(restaurant.trial_ends_at).getTime() - Date.now()) / 86400000))
    : 0

  return (
    <div className="max-w-4xl space-y-6">
      {/* État actuel */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <p className="text-sm font-medium tracking-wide uppercase text-muted mb-2">Formule actuelle</p>
        {isTrialing && (
          <>
            <p className="font-serif text-2xl text-foreground">Essai Pro</p>
            <p className="text-sm text-muted">
              Il vous reste <strong>{trialDaysLeft} jour{trialDaysLeft > 1 ? 's' : ''}</strong>. Choisissez une formule ci-dessous avant la fin de l&apos;essai.
            </p>
          </>
        )}
        {isActive && currentTier && (
          <>
            <p className="font-serif text-2xl text-foreground">
              {TIERS[currentTier].name}{' '}
              <span className="text-base text-muted">({restaurant.billing_cycle === 'annual' ? 'Annuel' : 'Mensuel'})</span>
            </p>
            {restaurant.is_launch_offer && (
              <p className="text-sm text-green-700 mt-1">
                🎉 Tarif lancement verrouillé à {restaurant.launch_offer_locked_price}€ HT/mois à vie
              </p>
            )}
          </>
        )}
      </div>

      {/* Toggle cycle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1.5">
          <button
            onClick={() => setCycle('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              cycle === 'monthly' ? 'bg-white text-foreground shadow-sm' : 'text-muted'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setCycle('annual')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              cycle === 'annual' ? 'bg-white text-foreground shadow-sm' : 'text-muted'
            }`}
          >
            Annuel
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-10%</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['essentiel', 'pro'] as const).map((key) => {
          const t = TIERS[key]
          const price = cycle === 'annual' ? t.priceAnnualHt! : t.priceMonthlyHt!
          const isCurrent = isActive && currentTier === key && restaurant.billing_cycle === cycle
          return (
            <div
              key={t.id}
              className={`bg-white rounded-2xl p-6 border ${
                isCurrent ? 'border-2 border-primary' : t.highlighted ? 'border-2 border-primary' : 'border border-border'
              }`}
            >
              <h3 className="font-serif text-xl text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-muted mb-4">{t.tagline}</p>
              <p className="mb-4">
                <span className="font-serif text-3xl text-foreground">
                  {price.toFixed(2).replace('.', ',')}€
                </span>
                <span className="text-sm text-muted"> HT/mois</span>
              </p>
              <ul className="space-y-2 mb-5 text-[13px] text-foreground">
                {t.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(key)}
                disabled={loadingTier !== null || isCurrent}
                className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all ${
                  isCurrent
                    ? 'bg-surface text-muted cursor-default'
                    : 'bg-primary text-background hover:bg-primary-light'
                }`}
              >
                {loadingTier === key ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : isCurrent ? (
                  'Formule actuelle'
                ) : isActive ? (
                  `Passer à ${t.name}`
                ) : (
                  `Choisir ${t.name}`
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Premium */}
      <div className="bg-surface rounded-2xl border border-dashed border-border p-6 text-center">
        <h3 className="font-serif text-xl text-primary mb-1">Besoin de plus ?</h3>
        <p className="text-sm text-muted mb-4">
          Multi-établissements, géolocalisation Wallet, account manager dédié.
        </p>
        <a
          href="/contact?sujet=premium"
          className="inline-block border border-border bg-white text-foreground font-semibold px-5 py-2.5 rounded-full text-sm hover:border-primary/30 hover:bg-surface transition-all"
        >
          Demander un devis Premium
        </a>
      </div>
    </div>
  )
}
