'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  {
    flag: '🇫🇷',
    label: 'Français',
    items: [
      { name: "Soupe à l'oignon", desc: 'Gratinée au gruyère', price: '8,50 €' },
      { name: 'Confit de canard', desc: 'Pommes sarladaises', price: '19,50 €' },
      { name: 'Tarte Tatin', desc: 'Crème fraîche maison', price: '7,00 €' },
    ],
  },
  {
    flag: '🇬🇧',
    label: 'English',
    items: [
      { name: 'French Onion Soup', desc: 'Gratin with gruyère', price: '8.50 €' },
      { name: 'Duck Confit', desc: 'Sarladaise potatoes', price: '19.50 €' },
      { name: 'Tarte Tatin', desc: 'Homemade crème fraîche', price: '7.00 €' },
    ],
  },
  {
    flag: '🇩🇪',
    label: 'Deutsch',
    items: [
      { name: 'Französische Zwiebelsuppe', desc: 'Überbacken mit Gruyère', price: '8,50 €' },
      { name: 'Entenconfit', desc: 'Sarladaise-Kartoffeln', price: '19,50 €' },
      { name: 'Tarte Tatin', desc: 'Hausgemachte Crème fraîche', price: '7,00 €' },
    ],
  },
]

export function HeroPhoneAnimation() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % LANGUAGES.length)
        setFading(false)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const lang = LANGUAGES[current]

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      {/* Phone shell */}
      <div className="relative w-[260px] sm:w-[280px] bg-white rounded-[2.5rem] border-[6px] border-foreground/10 shadow-[0_32px_80px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Status bar */}
        <div className="bg-background px-5 pt-3 pb-1 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-foreground/40">9:41</span>
          <div className="w-16 h-4 rounded-full bg-black/5" />
          <span className="text-[10px] font-semibold text-foreground/40">●●●</span>
        </div>

        {/* Menu content */}
        <div
          className="px-5 pb-6 pt-3 min-h-[340px] transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {/* Restaurant header */}
          <div className="text-center mb-4 pb-3 border-b border-border/40">
            <p className="font-serif text-[15px] text-foreground">Le Petit Bistrot</p>
            <div className="inline-flex items-center gap-1 mt-1 bg-surface px-2 py-0.5 rounded-full">
              <span className="text-xs">{lang.flag}</span>
              <span className="text-[10px] font-medium text-muted">{lang.label}</span>
            </div>
          </div>

          {/* Category */}
          <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-accent-dark mb-2">
            Menu
          </p>

          {/* Items */}
          <div className="space-y-0">
            {lang.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-baseline py-2.5 border-b border-border/25 last:border-b-0"
              >
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-[12px] font-medium text-foreground leading-tight">{item.name}</p>
                  <p className="text-[10px] text-muted mt-0.5 leading-tight">{item.desc}</p>
                </div>
                <span className="text-[11px] font-semibold text-foreground whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Language indicator dots */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {LANGUAGES.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${
              i === current
                ? 'w-4 h-1.5 bg-primary'
                : 'w-1.5 h-1.5 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Decorative floating badge */}
      <div className="absolute -top-3 -right-3 sm:-right-6 bg-white border border-border rounded-xl px-3 py-2 shadow-lg">
        <p className="text-[10px] font-semibold text-foreground">Mis à jour</p>
        <p className="text-[9px] text-muted">il y a 2 min</p>
      </div>
    </div>
  )
}
