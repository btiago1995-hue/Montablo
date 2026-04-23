'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { TIERS } from '@/lib/pricing'

export function PricingCards() {
  const [annual, setAnnual] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Toggle (sticky au scroll) */}
      <div
        className={`sticky top-[72px] z-40 flex justify-center py-4 transition-all ${
          scrolled ? 'bg-background/85 backdrop-blur-xl border-b border-border/50' : ''
        }`}
      >
        <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1.5">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              !annual ? 'bg-white text-foreground shadow-sm' : 'text-muted hover:text-foreground'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              annual ? 'bg-white text-foreground shadow-sm' : 'text-muted hover:text-foreground'
            }`}
          >
            Annuel
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              -10%
            </span>
          </button>
        </div>
      </div>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {(['essentiel', 'pro', 'premium'] as const).map((key) => {
          const t = TIERS[key]
          const price =
            t.priceMonthlyHt === null
              ? null
              : annual
                ? t.priceAnnualHt
                : t.priceMonthlyHt

          const cardClass = t.highlighted
            ? 'relative bg-white border-2 border-primary rounded-[20px] p-8 shadow-xl shadow-primary/10'
            : 'bg-white border border-border rounded-[20px] p-8'

          const ctaClass = t.highlighted
            ? 'flex items-center justify-center w-full bg-primary text-white font-medium py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-lg text-[15px]'
            : 'flex items-center justify-center w-full border border-foreground text-foreground font-medium py-3.5 rounded-full hover:bg-foreground hover:text-white transition-all text-[15px]'

          return (
            <div key={t.id} className={cardClass}>
              {t.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  Le plus populaire
                </div>
              )}

              <h3 className="font-serif text-2xl text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-muted mb-6">{t.tagline}</p>

              <div className="flex items-baseline gap-1 mb-2">
                {price === null ? (
                  <span className="font-serif text-[36px] text-foreground">Sur devis</span>
                ) : (
                  <>
                    <span className="font-serif text-[44px] text-foreground">
                      {price.toFixed(2).replace('.', ',')}€
                    </span>
                    <span className="text-sm text-muted">HT /mois</span>
                  </>
                )}
              </div>
              {annual && t.priceAnnualTotalHt !== null && (
                <p className="text-xs text-muted/60 mb-6">
                  {t.priceAnnualTotalHt}€ HT facturé annuellement
                </p>
              )}
              {!annual && price !== null && (
                <p className="text-xs text-muted/60 mb-6">Sans engagement</p>
              )}
              {price === null && <p className="text-xs text-muted/60 mb-6">Tarification sur mesure</p>}

              <p className="text-[14px] text-muted leading-relaxed mb-6">{t.description}</p>

              <ul className="space-y-2.5 mb-8">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-foreground">
                    <Check className="w-4 h-4 text-accent-dark shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={t.cta.href} className={ctaClass}>
                {t.cta.label}
              </Link>
              {t.highlighted && (
                <p className="text-xs text-muted/60 text-center mt-3">
                  Aucune carte bancaire requise
                </p>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
