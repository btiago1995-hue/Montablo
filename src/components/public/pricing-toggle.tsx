'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export function PricingToggle({ features }: { features: string[] }) {
  const [annual, setAnnual] = useState(true)

  return (
    <>
      {/* Toggle */}
      <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1.5 mb-10">
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

      {/* Card */}
      <div className="bg-white border border-border rounded-[20px] p-12 max-w-sm mx-auto hover:shadow-xl hover:shadow-black/[0.04] transition-shadow duration-300 relative">
        {annual && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[11px] font-bold px-4 py-1 rounded-full">
            Economisez 36 &euro; par an
          </div>
        )}

        <div className="flex items-baseline justify-center gap-1 mb-1">
          <span className="font-serif text-[52px] text-foreground">
            {annual ? '26,99' : '29,99'}&euro;
          </span>
          <span className="text-base text-muted">/mois</span>
        </div>

        {annual ? (
          <p className="text-[13px] text-muted/60 mb-8">
            323,89 &euro; facture annuellement &middot; 14 jours d&apos;essai gratuit
          </p>
        ) : (
          <p className="text-[13px] text-muted/60 mb-8">
            Sans engagement &middot; 14 jours d&apos;essai gratuit
          </p>
        )}

        <ul className="text-left mb-8 space-y-0">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 py-2 border-b border-border/40 last:border-b-0 text-sm text-foreground">
              <Check className="w-4 h-4 text-accent-dark shrink-0" />
              {f}
            </li>
          ))}
          <li className="flex items-center gap-2.5 py-2 text-sm text-foreground">
            <Check className="w-4 h-4 text-accent-dark shrink-0" />
            Import menu par IA
          </li>
        </ul>

        <Link
          href="/signup"
          className="group flex items-center justify-center gap-2 w-full bg-primary text-white font-medium py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15 text-[15px]"
        >
          Commencer l&apos;essai gratuit
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <p className="text-[11px] text-muted/50 mt-4">
          Aucune carte bancaire requise pour l&apos;essai
        </p>
      </div>
    </>
  )
}
