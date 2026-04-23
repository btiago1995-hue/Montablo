'use client'

import { useState } from 'react'
import { TIERS, type Tier } from '@/lib/pricing'
import { CTALink } from '@/components/public/cta-link'

type Cycle = 'monthly' | 'annual'

const ORDER: Tier[] = ['essentiel', 'pro', 'premium']

function formatAmount(value: number): { euros: string; cents: string } {
  const [e, c] = value.toFixed(2).replace('.', ',').split(',')
  return { euros: e, cents: c }
}

export function PricingToggle() {
  const [cycle, setCycle] = useState<Cycle>('monthly')

  return (
    <>
      <div className="mt-toggle" role="tablist" aria-label="Cycle de facturation">
        <button
          type="button"
          role="tab"
          aria-selected={cycle === 'monthly'}
          className={cycle === 'monthly' ? 'mt-active' : ''}
          onClick={() => setCycle('monthly')}
        >
          Mensuel
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={cycle === 'annual'}
          className={cycle === 'annual' ? 'mt-active' : ''}
          onClick={() => setCycle('annual')}
        >
          Annuel <span className="mt-save">−10%</span>
        </button>
      </div>

      <div className="mt-price-grid">
        {ORDER.map((key) => {
          const t = TIERS[key]
          const price = cycle === 'monthly' ? t.priceMonthlyHt : t.priceAnnualHt
          const hasPrice = price !== null
          const amount = hasPrice ? formatAmount(price!) : null

          return (
            <div
              key={t.id}
              className={`mt-price-card${t.highlighted ? ' mt-highlighted' : ''}`}
            >
              {t.highlighted && <div className="mt-price-ribbon">Recommandée</div>}

              <div className="mt-price-name">{t.name}</div>
              <p className="mt-price-tagline">{t.tagline}</p>

              {hasPrice ? (
                <div className="mt-price-amount">
                  {amount!.euros}
                  <sup>,{amount!.cents}€</sup>
                </div>
              ) : (
                <div className="mt-price-quote">Sur devis</div>
              )}

              <div className="mt-price-period">
                {hasPrice
                  ? cycle === 'monthly'
                    ? 'HT · par mois'
                    : 'HT · par mois · facturé annuellement'
                  : 'Tarification personnalisée'}
              </div>
              <div className="mt-price-billed">
                {hasPrice && cycle === 'annual' && t.priceAnnualTotalHt !== null
                  ? `${t.priceAnnualTotalHt} € HT / an · économisez ~10 %`
                  : hasPrice
                  ? "Facturation mensuelle · 14 jours d'essai gratuit"
                  : 'Devis sous 24 h · accompagnement dédié'}
              </div>

              <ul className="mt-price-features">
                {t.features.slice(0, 6).map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <CTALink
                href={t.cta.href}
                label={`pricing_${t.id}`}
                className={`mt-btn ${t.highlighted ? 'mt-btn-primary' : 'mt-btn-secondary'}`}
              >
                {t.cta.label}
              </CTALink>
            </div>
          )
        })}
      </div>
    </>
  )
}
