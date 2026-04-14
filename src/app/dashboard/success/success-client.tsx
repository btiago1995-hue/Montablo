'use client'

import Link from 'next/link'
import { UtensilsCrossed, ExternalLink, QrCode } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Restaurant } from '@/types/database'

function ProgressBar() {
  const steps = ['Personnaliser', 'Importer', 'Publier']
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          {i > 0 && <div className="w-10 sm:w-12 h-0.5 mx-2 sm:mx-3 bg-[#2D6A4F]" />}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < 2 ? 'bg-[#2D6A4F] text-white' : 'bg-primary text-white'
              }`}
            >
              {i < 2 ? '✓' : '3'}
            </div>
            <span className="text-[13px] font-semibold text-foreground hidden sm:inline">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SuccessClient({
  restaurant,
  itemCount,
  categoryCount,
  previewItems,
  catMap,
}: {
  restaurant: Restaurant
  itemCount: number
  categoryCount: number
  previewItems: { name_fr: string; price: number; category_id: string | null }[]
  catMap: Record<string, string>
}) {
  const grouped = previewItems.reduce<Record<string, { name_fr: string; price: number }[]>>((acc, item) => {
    const catName = (item.category_id ? catMap[item.category_id] : null) ?? 'Autres'
    if (!acc[catName]) acc[catName] = []
    acc[catName].push({ name_fr: item.name_fr, price: item.price })
    return acc
  }, {})

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-12 px-4">
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="w-7 h-7 text-primary" />
        <span className="font-serif text-xl text-primary">MonTablo</span>
      </div>

      <ProgressBar />

      <div className="w-16 h-16 rounded-full bg-[#2D6A4F] flex items-center justify-center mb-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-8 h-8">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-serif text-[30px] text-foreground mb-2">Votre menu est prêt !</h1>
      <p className="text-[15px] text-muted mb-4">Tout a été importé avec succès.</p>

      <div className="flex gap-8 mb-8">
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-foreground">{itemCount}</div>
          <div className="text-xs text-muted">plats importés</div>
        </div>
        <div className="text-center">
          <div className="text-[28px] font-extrabold text-foreground">{categoryCount}</div>
          <div className="text-xs text-muted">catégories</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden max-w-[380px] w-full shadow-lg mb-8">
        <div className="p-6 text-center" style={{ background: restaurant.primary_color }}>
          <h2 className="font-serif text-xl text-white">{restaurant.name}</h2>
          <span className="text-white/50 text-xs">Menu</span>
        </div>
        <div className="p-5">
          {Object.entries(grouped).map(([catName, items]) => (
            <div key={catName}>
              <p className="text-[11px] font-bold uppercase tracking-[0.06em] mt-4 mb-2 first:mt-0"
                 style={{ color: restaurant.secondary_color }}>
                {catName}
              </p>
              {items.map((item) => (
                <div key={item.name_fr} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm font-medium text-foreground">{item.name_fr}</span>
                  <span className="text-sm font-semibold text-foreground ml-4">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 max-w-[380px] w-full">
        <Link
          href={`/menu/${restaurant.slug}`}
          target="_blank"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Voir mon menu
        </Link>
        <Link
          href="/dashboard/qr-code"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-light transition-colors"
        >
          <QrCode className="w-4 h-4" />
          Mon QR Code
        </Link>
      </div>

      <Link href="/dashboard" className="mt-4 text-[13px] text-muted hover:text-foreground transition-colors">
        Aller au tableau de bord →
      </Link>
    </div>
  )
}
