'use client'

import { useState, useEffect, useCallback } from 'react'
import { formatPrice } from '@/lib/utils'
import { UtensilsCrossed, Info, X } from 'lucide-react'
import type { Category, Item, Promotion, DailyMenu } from '@/types/database'

type Lang = 'fr' | 'en'

function ItemDetail({
  item,
  promo,
  lang,
  onClose,
}: {
  item: Item
  promo?: Promotion
  lang: Lang
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const name = lang === 'en' && item.name_en ? item.name_en : item.name_fr
  const desc = lang === 'en' ? (item.description_en || item.description_fr) : item.description_fr

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 250)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-colors duration-250 ${
        visible ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-t-[20px] w-full max-w-[430px] max-h-[85vh] overflow-y-auto transition-transform duration-250 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {item.image_url && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image_url} alt={name} className="w-full h-[260px] object-cover rounded-t-[20px]" />
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center active:scale-90 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="p-6">
          {!item.image_url && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/10 text-foreground flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <h3 className="font-serif text-2xl tracking-tight mb-2">{name}</h3>
          {desc && <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{desc}</p>}
          {item.tags && item.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className={`text-[11px] font-semibold px-2.5 py-1 rounded ${getTagClass(tag)}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="text-2xl font-bold text-[#2C3E2D]">
            {promo ? (
              <>
                <span className="text-sm text-[#9B9B9B] line-through font-normal mr-2">
                  {formatPrice(promo.original_price)}
                </span>
                <span className="text-[#C43E3E]">{formatPrice(promo.promo_price)}</span>
              </>
            ) : (
              formatPrice(item.price)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function getTagClass(tag: string): string {
  const lower = tag.toLowerCase()
  if (lower.includes('végétarien') || lower.includes('vegetarian') || lower.includes('veg'))
    return 'bg-[#E8F5E9] text-[#2D6A4F]'
  if (lower.includes('maison') || lower.includes('homemade'))
    return 'bg-[#F3E5F5] text-[#6A1B9A]'
  if (lower.includes('nouveau') || lower.includes('new'))
    return 'bg-[#E3F2FD] text-[#1565C0]'
  if (lower.includes('piquant') || lower.includes('spicy'))
    return 'bg-[#FFF3E0] text-[#BF360C]'
  if (lower.includes('signature'))
    return 'bg-[#FFF8E1] text-[#8D6E00]'
  if (lower.includes('poisson') || lower.includes('fish'))
    return 'bg-[#E3F2FD] text-[#1565C0]'
  return 'bg-[#F0EDE8] text-[#6B6B6B]'
}

export function MenuContent({
  categories,
  items,
  promotions,
  dailyMenu,
  unavailableBehavior,
  primaryColor,
}: {
  categories: Category[]
  items: Item[]
  promotions: Promotion[]
  dailyMenu: DailyMenu | null
  unavailableBehavior: string
  primaryColor: string
}) {
  const [lang, setLang] = useState<Lang>('fr')
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id ?? null)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const promoMap = new Map(promotions.map((p) => [p.item_id, p]))

  const filteredItems = unavailableBehavior === 'hidden'
    ? items.filter((item) => item.is_available)
    : items

  // Track which category is in view on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '')
            setActiveCategory(id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )
    for (const cat of categories) {
      const el = document.getElementById(`cat-${cat.id}`)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [categories])

  const scrollToSection = (catId: string) => {
    setActiveCategory(catId)
    const el = document.getElementById(`cat-${catId}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Language toggle (fixed over cover area) */}
      <div className="fixed top-4 right-4 z-30 flex gap-0.5 bg-black/20 backdrop-blur-xl rounded-lg p-[3px]">
        <button
          onClick={() => setLang('fr')}
          className={`px-3 py-1 rounded-md text-xs font-semibold tracking-wide transition-all ${
            lang === 'fr' ? 'bg-white/95 text-[#1A1A1A]' : 'text-white/70'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 rounded-md text-xs font-semibold tracking-wide transition-all ${
            lang === 'en' ? 'bg-white/95 text-[#1A1A1A]' : 'text-white/70'
          }`}
        >
          EN
        </button>
      </div>

      {/* Daily menu banner */}
      {dailyMenu && (
        <div
          className="mx-4 mt-4 rounded-xl p-5 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)` }}
        >
          <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/[0.06] rounded-full" />
          <div className="text-[11px] uppercase tracking-[0.1em] font-semibold opacity-75 mb-2">
            {lang === 'fr' ? 'Menu du jour' : "Today's menu"}
          </div>
          <div className="font-serif text-[19px] leading-snug mb-1.5">
            {lang === 'en' && dailyMenu.title_en ? dailyMenu.title_en : dailyMenu.title_fr}
          </div>
          {(lang === 'en' ? dailyMenu.description_en || dailyMenu.description_fr : dailyMenu.description_fr) && (
            <div className="text-[13px] opacity-80 leading-relaxed mb-3">
              {lang === 'en' ? dailyMenu.description_en : dailyMenu.description_fr}
            </div>
          )}
          {(lang === 'en' ? dailyMenu.items_description_en : dailyMenu.items_description_fr) && (
            <div className="text-[13px] opacity-80 leading-relaxed mb-3 whitespace-pre-line">
              {lang === 'en' ? dailyMenu.items_description_en : dailyMenu.items_description_fr}
            </div>
          )}
          {dailyMenu.price && (
            <div className="text-[22px] font-bold tracking-tight">
              {formatPrice(dailyMenu.price)}
              <span className="text-sm font-normal opacity-70 ml-1">
                / {lang === 'fr' ? 'personne' : 'person'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Allergen notice */}
      <div className="mx-4 mt-3 px-4 py-3 bg-[#FFF8E1] rounded-lg flex items-start gap-2 text-[12px] text-[#8D6E00] leading-relaxed">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        {lang === 'fr'
          ? 'Pour toute information sur les allergènes, veuillez consulter notre équipe.'
          : 'For allergen information, please ask our staff.'}
      </div>

      {/* Category tabs - sticky */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-20 bg-[#FAFAF7]/95 backdrop-blur-md pt-4">
          <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`shrink-0 px-[18px] py-2 rounded-full text-[13px] font-medium border-[1.5px] transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'text-white border-transparent'
                    : 'bg-white border-[#E8E8E4] text-[#6B6B6B] hover:border-[#9B9B9B]'
                }`}
                style={activeCategory === cat.id ? { backgroundColor: primaryColor, borderColor: primaryColor } : undefined}
              >
                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                {lang === 'en' && cat.name_en ? cat.name_en : cat.name_fr}
              </button>
            ))}
          </div>
          <div className="h-px bg-[#E8E8E4]" />
        </div>
      )}

      {/* Menu sections */}
      <div className="pb-6">
        {categories.length > 0 ? (
          categories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.category_id === category.id
            )
            if (categoryItems.length === 0) return null

            return (
              <section key={category.id} id={`cat-${category.id}`} className="px-4 pt-6 pb-2">
                <h2 className="font-serif text-[22px] tracking-tight text-[#1A1A1A] mb-1">
                  {lang === 'en' && category.name_en ? category.name_en : category.name_fr}
                </h2>
                <p className="text-[12px] text-[#9B9B9B] mb-4">
                  {categoryItems.length} {categoryItems.length === 1
                    ? (lang === 'fr' ? 'article' : 'item')
                    : (lang === 'fr' ? 'articles' : 'items')}
                </p>

                <div className="space-y-2.5">
                  {categoryItems.map((item) => {
                    const promo = promoMap.get(item.id)
                    const isUnavailable = !item.is_available
                    const name = lang === 'en' && item.name_en ? item.name_en : item.name_fr
                    const desc = lang === 'en' ? (item.description_en || item.description_fr) : item.description_fr

                    return (
                      <div
                        key={item.id}
                        onClick={() => !isUnavailable && setSelectedItem(item)}
                        className={`flex gap-3.5 bg-white rounded-xl p-3.5 border border-[#E8E8E4] shadow-[0_1px_3px_rgba(0,0,0,0.04)] relative overflow-hidden transition-transform active:scale-[0.985] ${
                          isUnavailable ? 'opacity-[0.45] pointer-events-none' : 'cursor-pointer'
                        }`}
                      >
                        {item.image_url ? (
                          <div className="relative w-[88px] h-[88px] shrink-0 rounded-lg overflow-hidden bg-[#F0EDE8]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image_url}
                              alt={name}
                              className="w-full h-full object-cover animate-[fadeIn_0.3s_ease-out]"
                              loading="lazy"
                            />
                            {promo && (
                              <div className="absolute top-1.5 left-1.5 bg-[#C43E3E] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide z-[2]">
                                Promo
                              </div>
                            )}
                            {isUnavailable && (
                              <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                                <span className="text-white text-[10px] font-semibold uppercase tracking-wide">
                                  {lang === 'fr' ? 'Indisponible' : 'Unavailable'}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : null}

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-[15px] font-semibold leading-snug text-[#1A1A1A] mb-0.5">
                              {name}
                            </h3>
                            {desc && (
                              <p className="text-[12.5px] text-[#6B6B6B] leading-relaxed line-clamp-2">
                                {desc}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-[16px] font-bold tracking-tight">
                              {promo ? (
                                <>
                                  <span className="text-[13px] text-[#9B9B9B] line-through font-normal mr-1.5">
                                    {formatPrice(promo.original_price)}
                                  </span>
                                  <span className="text-[#C43E3E]">{formatPrice(promo.promo_price)}</span>
                                </>
                              ) : (
                                <span className="text-[#2C3E2D]">{formatPrice(item.price)}</span>
                              )}
                            </div>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex gap-1 flex-wrap">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`text-[10px] font-semibold px-[7px] py-[3px] rounded uppercase tracking-wide ${getTagClass(tag)}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })
        ) : (
          <div className="text-center py-16">
            <UtensilsCrossed className="w-12 h-12 text-[#9B9B9B]/30 mx-auto mb-4" />
            <p className="text-[#9B9B9B]">
              {lang === 'fr' ? 'Ce menu est en cours de préparation.' : 'This menu is being prepared.'}
            </p>
          </div>
        )}
      </div>

      {/* Item detail overlay */}
      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          promo={promoMap.get(selectedItem.id)}
          lang={lang}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  )
}
