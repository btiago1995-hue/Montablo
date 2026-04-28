'use client'

import { useState } from 'react'

type MenuItem = {
  name: string
  desc: string
  price: number
  image: string
  tag?: 'Maison' | 'Végétarien' | 'Signature' | 'Poisson'
  promo?: { original: number; promo: number }
  unavailable?: boolean
}

const MENU: Record<string, MenuItem[]> = {
  entrees: [
    {
      name: "Soupe à l'oignon",
      desc: 'Gratinée au gruyère, croûtons dorés',
      price: 8.5,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop',
      tag: 'Maison',
    },
    {
      name: 'Salade de chèvre chaud',
      desc: 'Miel, noix, mesclun de saison',
      price: 11,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop',
      tag: 'Végétarien',
    },
    {
      name: 'Terrine de campagne',
      desc: 'Cornichons, pain grillé',
      price: 9.5,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop',
      tag: 'Maison',
    },
    {
      name: 'Œuf en meurette',
      desc: 'Œuf poché, sauce bourguignonne, lardons',
      price: 10,
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop',
    },
  ],
  plats: [
    {
      name: 'Confit de canard',
      desc: 'Pommes sarladaises, salade verte',
      price: 19.5,
      image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=400&fit=crop',
      tag: 'Signature',
      promo: { original: 19.5, promo: 15 },
    },
    {
      name: 'Bœuf bourguignon',
      desc: 'Carottes, champignons, purée maison',
      price: 18,
      image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=400&fit=crop',
      tag: 'Maison',
    },
    {
      name: 'Filet de bar',
      desc: 'Beurre blanc, légumes de saison',
      price: 22,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop',
      tag: 'Poisson',
    },
    {
      name: 'Risotto aux champignons',
      desc: 'Cèpes, parmesan, truffe noire',
      price: 17,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=400&fit=crop',
      tag: 'Végétarien',
    },
    {
      name: 'Blanquette de veau',
      desc: 'Riz basmati, sauce crémeuse',
      price: 17.5,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop',
      tag: 'Maison',
      unavailable: true,
    },
  ],
  desserts: [
    {
      name: 'Crème brûlée',
      desc: 'Vanille de Madagascar',
      price: 8,
      image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400&h=400&fit=crop',
      tag: 'Signature',
    },
    {
      name: 'Tarte Tatin',
      desc: 'Pommes caramélisées, crème fraîche',
      price: 9,
      image: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?w=400&h=400&fit=crop',
      tag: 'Maison',
    },
    {
      name: 'Mousse au chocolat',
      desc: 'Chocolat noir 70%, éclats de noisettes',
      price: 7.5,
      image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=400&fit=crop',
    },
    {
      name: 'Île flottante',
      desc: 'Meringue, crème anglaise, caramel',
      price: 8.5,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    },
  ],
  boissons: [
    {
      name: 'Verre de vin rouge',
      desc: 'Côtes du Rhône, 15cl',
      price: 5.5,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=400&fit=crop',
    },
    {
      name: 'Verre de vin blanc',
      desc: 'Chablis, 15cl',
      price: 6,
      image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=400&fit=crop',
    },
    {
      name: 'Eau minérale',
      desc: 'Plate ou gazeuse, 50cl',
      price: 3.5,
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
    },
    {
      name: 'Café / Expresso',
      desc: 'Torréfaction artisanale',
      price: 2.5,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    },
    {
      name: 'Digestif — Calvados',
      desc: "Pays d'Auge, 4cl",
      price: 7,
      image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=400&fit=crop',
    },
  ],
}

const TABS: { key: keyof typeof MENU; label: string }[] = [
  { key: 'entrees', label: 'Entrées' },
  { key: 'plats', label: 'Plats' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'boissons', label: 'Boissons' },
]

const formatPrice = (n: number) => `${n.toFixed(2).replace('.', ',')} €`

function tagClasses(tag?: MenuItem['tag']): string {
  if (!tag) return ''
  switch (tag) {
    case 'Maison':
      return 'bg-[#F3E5F5] text-[#6A1B9A]'
    case 'Végétarien':
      return 'bg-[#E8F5E9] text-[#2D6A4F]'
    case 'Signature':
      return 'bg-[#FFF8E1] text-[#8D6E00]'
    case 'Poisson':
      return 'bg-[#E3F2FD] text-[#1565C0]'
  }
}

export function MenuPreview() {
  const [active, setActive] = useState<keyof typeof MENU>('entrees')
  const items = MENU[active]
  const activeLabel = TABS.find((t) => t.key === active)?.label ?? ''

  return (
    <div className="bg-background text-foreground rounded-[28px] p-10 shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] min-h-[620px] relative">
      <div className="flex items-center justify-between pb-5 border-b border-border">
        <h3 className="font-serif italic text-[30px] text-primary font-medium">Le Petit Bistrot</h3>
      </div>
      <div className="flex gap-1.5 my-6 mb-5 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = active === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={
                'px-[18px] py-2 rounded-full text-[13px] font-semibold whitespace-nowrap border border-transparent font-sans transition ' +
                (isActive
                  ? 'bg-primary text-background'
                  : 'bg-transparent text-muted hover:bg-green-mist')
              }
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div className="flex items-baseline gap-3 mt-1 mb-3.5">
        <h4 className="font-serif italic text-[22px] font-medium text-primary m-0">{activeLabel}</h4>
        <span className="text-xs text-muted font-medium">{items.length} articles</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((i) => (
          <div
            key={i.name}
            className={
              'grid grid-cols-[76px_1fr] gap-3.5 items-stretch p-2.5 bg-white border border-border rounded-[14px] ' +
              (i.unavailable ? 'opacity-90' : '')
            }
          >
            <div className="relative w-[76px] h-[76px] rounded-[10px] overflow-hidden bg-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={i.image}
                alt=""
                loading="lazy"
                className={
                  'w-full h-full object-cover block ' +
                  (i.unavailable ? 'grayscale-[0.6] brightness-[0.7]' : '')
                }
              />
              {i.promo && (
                <span className="absolute top-1.5 left-1.5 bg-[#C43E3E] text-white text-[9px] font-bold tracking-[0.08em] px-1.5 py-[3px] rounded">
                  PROMO
                </span>
              )}
              {i.unavailable && (
                <span className="absolute inset-0 grid place-items-center bg-primary/55 text-white text-[9px] font-bold tracking-[0.1em] text-center px-1">
                  INDISPONIBLE
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="font-serif text-[16px] font-medium text-foreground leading-[1.25] mb-0.5">
                {i.name}
              </div>
              <div className="text-xs text-muted leading-[1.35] mb-1.5">{i.desc}</div>
              <div className="flex items-center justify-between gap-2.5">
                {i.promo ? (
                  <div className="font-bold text-foreground text-sm flex items-baseline gap-2">
                    <span className="line-through text-muted text-xs font-medium">
                      {formatPrice(i.promo.original)}
                    </span>
                    <span className="text-[#C43E3E]">{formatPrice(i.promo.promo)}</span>
                  </div>
                ) : (
                  <div className="font-bold text-foreground text-sm">{formatPrice(i.price)}</div>
                )}
                {i.tag && (
                  <span
                    className={
                      'text-[9px] font-bold tracking-[0.08em] px-[7px] py-[3px] rounded whitespace-nowrap ' +
                      tagClasses(i.tag)
                    }
                  >
                    {i.tag.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
