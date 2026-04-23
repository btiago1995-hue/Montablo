'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { formatPrice } from '@/lib/utils'
import { UtensilsCrossed, Info, X } from 'lucide-react'
import type { Category, Item, Promotion, DailyMenu, Allergen } from '@/types/database'
import {
  ALLERGENS,
  getAllergen,
  getAllergenLabel,
  ALLERGEN_FOOTER,
  ALLERGEN_LEGEND_TITLE,
} from '@/lib/allergens'

type Lang = 'fr' | 'en' | 'de'

const LANG_LABELS: Record<Lang, { flag: string; code: string; name: string }> = {
  fr: { flag: '🇫🇷', code: 'FR', name: 'Français' },
  en: { flag: '🇬🇧', code: 'EN', name: 'English' },
  de: { flag: '🇩🇪', code: 'DE', name: 'Deutsch' },
}

const UI_STRINGS: Record<Lang, Record<string, string>> = {
  fr: {
    dailyMenu: 'Menu du jour',
    perPerson: 'personne',
    article: 'article',
    articles: 'articles',
    unavailable: 'Indisponible',
    menuComing: 'Ce menu est en cours de préparation.',
    allergenNotice: 'Pour toute information sur les allergènes, veuillez consulter notre équipe.',
  },
  en: {
    dailyMenu: "Today's menu",
    perPerson: 'person',
    article: 'item',
    articles: 'items',
    unavailable: 'Unavailable',
    menuComing: 'This menu is being prepared.',
    allergenNotice: 'For allergen information, please ask our staff.',
  },
  de: {
    dailyMenu: 'Tagesmenü',
    perPerson: 'Person',
    article: 'Artikel',
    articles: 'Artikel',
    unavailable: 'Nicht verfügbar',
    menuComing: 'Dieses Menü wird gerade vorbereitet.',
    allergenNotice: 'Für Informationen zu Allergenen wenden Sie sich bitte an unser Personal.',
  },
}

function t(lang: Lang, key: string): string {
  return UI_STRINGS[lang][key] ?? UI_STRINGS.fr[key] ?? key
}

function localized<T extends { name_fr: string; name_en: string | null }>(
  entity: T,
  lang: Lang
): string {
  if (lang === 'en' && entity.name_en) return entity.name_en
  return entity.name_fr
}

function localizedDesc(
  entity: { description_fr: string | null; description_en: string | null },
  lang: Lang
): string | null {
  if (lang === 'en' && entity.description_en) return entity.description_en
  return entity.description_fr
}

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
  const name = localized(item, lang)
  const desc = localizedDesc(item, lang)
  const allergens = item.allergens ?? []
  const allergenLocale = lang === 'de' ? 'de' : lang === 'en' ? 'en' : 'fr'

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
          {allergens.length > 0 && (
            <div className="mb-4 p-3 bg-[#FFF8E1] rounded-lg">
              <p className="text-[10.5px] uppercase tracking-wide font-semibold text-[#8D6E00] mb-2">
                {ALLERGEN_LEGEND_TITLE[allergenLocale]}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {allergens.map((code) => {
                  const def = getAllergen(code)
                  return (
                    <span
                      key={code}
                      className="inline-flex items-center gap-1 text-[11.5px] text-[#8D6E00] bg-white/60 px-2 py-1 rounded"
                    >
                      <span aria-hidden>{def.icon}</span>
                      {getAllergenLabel(code, allergenLocale)}
                    </span>
                  )
                })}
              </div>
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
  languages,
}: {
  categories: Category[]
  items: Item[]
  promotions: Promotion[]
  dailyMenu: DailyMenu | null
  unavailableBehavior: string
  primaryColor: string
  languages?: string[]
}) {
  const enabledLangs = useMemo<Lang[]>(() => {
    const known: Lang[] = ['fr', 'en', 'de']
    const filtered = (languages ?? ['fr', 'en']).filter((l): l is Lang => known.includes(l as Lang))
    return filtered.length > 0 ? filtered : ['fr']
  }, [languages])

  const [lang, setLang] = useState<Lang>(enabledLangs[0] ?? 'fr')
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id ?? null)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const promoMap = new Map(promotions.map((p) => [p.item_id, p]))

  const filteredItems = unavailableBehavior === 'hidden'
    ? items.filter((item) => item.is_available)
    : items

  const allergenLocale = lang === 'de' ? 'de' : lang === 'en' ? 'en' : 'fr'

  const usedAllergens = useMemo<Allergen[]>(() => {
    const set = new Set<Allergen>()
    for (const it of filteredItems) {
      for (const a of it.allergens ?? []) set.add(a)
    }
    return ALLERGENS.filter((a) => set.has(a.code)).map((a) => a.code)
  }, [filteredItems])

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
      {enabledLangs.length > 1 && (
        <div className="fixed top-4 right-4 z-30 flex gap-0.5 bg-black/20 backdrop-blur-xl rounded-lg p-[3px]">
          {enabledLangs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-label={LANG_LABELS[l].name}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide transition-all flex items-center gap-1 ${
                lang === l ? 'bg-white/95 text-[#1A1A1A]' : 'text-white/70'
              }`}
            >
              <span aria-hidden>{LANG_LABELS[l].flag}</span>
              {LANG_LABELS[l].code}
            </button>
          ))}
        </div>
      )}

      {/* Daily menu banner */}
      {dailyMenu && (
        <div
          className="mx-4 mt-4 rounded-xl p-5 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}CC 100%)` }}
        >
          <div className="absolute -top-5 -right-5 w-20 h-20 bg-white/[0.06] rounded-full" />
          <div className="text-[11px] uppercase tracking-[0.1em] font-semibold opacity-75 mb-2">
            {t(lang, 'dailyMenu')}
          </div>
          <div className="font-serif text-[19px] leading-snug mb-1.5">
            {lang === 'en' && dailyMenu.title_en ? dailyMenu.title_en : dailyMenu.title_fr}
          </div>
          {(lang === 'en' ? dailyMenu.description_en || dailyMenu.description_fr : dailyMenu.description_fr) && (
            <div className="text-[13px] opacity-80 leading-relaxed mb-3">
              {lang === 'en' && dailyMenu.description_en ? dailyMenu.description_en : dailyMenu.description_fr}
            </div>
          )}
          {(lang === 'en' ? dailyMenu.items_description_en : dailyMenu.items_description_fr) && (
            <div className="text-[13px] opacity-80 leading-relaxed mb-3 whitespace-pre-line">
              {lang === 'en' && dailyMenu.items_description_en ? dailyMenu.items_description_en : dailyMenu.items_description_fr}
            </div>
          )}
          {dailyMenu.price && (
            <div className="text-[22px] font-bold tracking-tight">
              {formatPrice(dailyMenu.price)}
              <span className="text-sm font-normal opacity-70 ml-1">
                / {t(lang, 'perPerson')}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Allergen notice (INCO) */}
      <div className="mx-4 mt-3 px-4 py-3 bg-[#FFF8E1] rounded-lg flex items-start gap-2 text-[12px] text-[#8D6E00] leading-relaxed">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <span>{t(lang, 'allergenNotice')}</span>
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
                  {categoryItems.length} {categoryItems.length === 1 ? t(lang, 'article') : t(lang, 'articles')}
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
                                  {t(lang, 'unavailable')}
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
                            {item.allergens && item.allergens.length > 0 && (
                              <div className="flex gap-0.5 mt-1" aria-label={ALLERGEN_LEGEND_TITLE[allergenLocale]}>
                                {item.allergens.map((code) => {
                                  const def = getAllergen(code)
                                  return (
                                    <span
                                      key={code}
                                      title={getAllergenLabel(code, allergenLocale)}
                                      className="text-[12px] leading-none"
                                      aria-hidden
                                    >
                                      {def.icon}
                                    </span>
                                  )
                                })}
                              </div>
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
            <p className="text-[#9B9B9B]">{t(lang, 'menuComing')}</p>
          </div>
        )}

        {/* Allergen legend + INCO legal footer */}
        {usedAllergens.length > 0 && (
          <div className="mx-4 mt-6 p-4 bg-white border border-[#E8E8E4] rounded-xl">
            <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6B6B6B] mb-3">
              {ALLERGEN_LEGEND_TITLE[allergenLocale]}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {usedAllergens.map((code) => {
                const def = getAllergen(code)
                return (
                  <span
                    key={code}
                    className="inline-flex items-center gap-1 text-[11.5px] text-[#4B4B4B] bg-[#FAFAF7] px-2 py-1 rounded border border-[#E8E8E4]"
                  >
                    <span aria-hidden>{def.icon}</span>
                    {getAllergenLabel(code, allergenLocale)}
                  </span>
                )
              })}
            </div>
          </div>
        )}
        <p className="mx-4 mt-4 text-[10.5px] text-[#9B9B9B] leading-relaxed">
          {ALLERGEN_FOOTER[allergenLocale]}
        </p>
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
