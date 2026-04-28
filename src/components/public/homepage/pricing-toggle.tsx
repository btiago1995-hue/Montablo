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

const BTN_BASE =
  'inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] whitespace-nowrap border-[1.5px] border-transparent transition hover:-translate-y-px w-full'
const BTN_PRIMARY = `${BTN_BASE} bg-primary text-background hover:bg-green-classic`
const BTN_SECONDARY = `${BTN_BASE} bg-transparent text-primary border-primary hover:bg-primary hover:text-background`

export function PricingToggle() {
  const [cycle, setCycle] = useState<Cycle>('monthly')

  return (
    <>
      <div
        className="inline-flex bg-white p-1 rounded-full mt-8 mb-12 border border-border gap-1"
        role="tablist"
        aria-label="Cycle de facturation"
      >
        <button
          type="button"
          role="tab"
          aria-selected={cycle === 'monthly'}
          onClick={() => setCycle('monthly')}
          className={
            'h-10 px-6 rounded-full border-0 font-sans font-semibold text-sm cursor-pointer transition flex items-center gap-2 ' +
            (cycle === 'monthly'
              ? 'bg-primary text-background'
              : 'bg-transparent text-muted')
          }
        >
          Mensuel
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={cycle === 'annual'}
          onClick={() => setCycle('annual')}
          className={
            'h-10 px-6 rounded-full border-0 font-sans font-semibold text-sm cursor-pointer transition flex items-center gap-2 ' +
            (cycle === 'annual'
              ? 'bg-primary text-background'
              : 'bg-transparent text-muted')
          }
        >
          Annuel{' '}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-white tracking-[0.1em] font-bold">
            −10%
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1080px] mx-auto text-left">
        {ORDER.map((key) => {
          const t = TIERS[key]
          const price = cycle === 'monthly' ? t.priceMonthlyHt : t.priceAnnualHt
          const hasPrice = price !== null
          const amount = hasPrice ? formatAmount(price!) : null

          const isHi = !!t.highlighted

          return (
            <div
              key={t.id}
              className={
                'relative overflow-hidden bg-white rounded-[28px] p-10 px-8 flex flex-col ' +
                (isHi
                  ? 'border-2 border-primary shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)]'
                  : 'border border-border shadow-[0_1px_2px_rgba(30,57,50,0.06),0_2px_8px_rgba(30,57,50,0.04)]')
              }
            >
              {isHi && (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-[140px] h-[140px] bg-green-mist rounded-full translate-x-[40%] -translate-y-[40%]"
                  />
                  <div className="absolute top-5 right-5 z-[2] text-[10px] tracking-[0.18em] uppercase text-primary-light font-bold bg-green-mist px-2.5 py-1 rounded-full">
                    Recommandée
                  </div>
                </>
              )}

              <div className="font-serif text-[28px] text-primary italic mb-1 font-medium">
                {t.name}
              </div>
              <p className="text-[13px] text-muted mb-6">{t.tagline}</p>

              {hasPrice ? (
                <div className="font-serif text-[64px] leading-none text-primary font-medium tracking-[-0.03em]">
                  {amount!.euros}
                  <sup className="text-[22px] align-super font-normal text-primary">
                    ,{amount!.cents}€
                  </sup>
                </div>
              ) : (
                <div className="font-serif text-[32px] italic text-primary leading-none">
                  Sur devis
                </div>
              )}

              <div className="text-[13px] text-muted mt-0.5">
                {hasPrice
                  ? cycle === 'monthly'
                    ? 'HT · par mois'
                    : 'HT · par mois · facturé annuellement'
                  : 'Tarification personnalisée'}
              </div>
              <div className="text-xs text-muted mt-1.5 mb-5 pb-[18px] border-b border-border">
                {hasPrice && cycle === 'annual' && t.priceAnnualTotalHt !== null
                  ? `${t.priceAnnualTotalHt} € HT / an · économisez ~10 %`
                  : hasPrice
                  ? "Facturation mensuelle · 14 jours d'essai gratuit"
                  : 'Devis sous 24 h · accompagnement dédié'}
              </div>

              <ul className="list-none p-0 m-0 mb-7 flex flex-col gap-2.5 flex-1">
                {t.features.slice(0, 6).map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-primary leading-[1.45]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex-none w-[18px] h-[18px] rounded-full bg-green-mist mt-0.5 bg-no-repeat bg-center bg-contain"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 10.5 L8.5 14 L15 7' stroke='%2300754A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <CTALink
                href={t.cta.href}
                label={`pricing_${t.id}`}
                className={isHi ? BTN_PRIMARY : BTN_SECONDARY}
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
