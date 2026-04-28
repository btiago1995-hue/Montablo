'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import type { DailyMenu } from '@/types/database'
import { CalendarDays, Check, Languages } from 'lucide-react'

type TargetLang = 'en' | 'de'

async function autoTranslate(
  texts: Record<string, string>,
  targetLang: TargetLang = 'en'
): Promise<Record<string, string | null>> {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, targetLang }),
    })
    if (!res.ok) return {}
    const { translations } = await res.json()
    return translations ?? {}
  } catch {
    return {}
  }
}

export function DailyMenuEditor({
  restaurantId,
  initialMenu,
  today,
}: {
  restaurantId: string
  initialMenu: DailyMenu | null
  today: string
}) {
  const router = useRouter()
  const [titleFr, setTitleFr] = useState(initialMenu?.title_fr ?? 'Menu du jour')
  const [titleEn, setTitleEn] = useState(initialMenu?.title_en ?? '')
  const [titleDe, setTitleDe] = useState(initialMenu?.title_de ?? '')
  const [descFr, setDescFr] = useState(initialMenu?.description_fr ?? '')
  const [descEn, setDescEn] = useState(initialMenu?.description_en ?? '')
  const [descDe, setDescDe] = useState(initialMenu?.description_de ?? '')
  const [itemsDescFr, setItemsDescFr] = useState(initialMenu?.items_description_fr ?? '')
  const [itemsDescEn, setItemsDescEn] = useState(initialMenu?.items_description_en ?? '')
  const [itemsDescDe, setItemsDescDe] = useState(initialMenu?.items_description_de ?? '')
  const [showTranslations, setShowTranslations] = useState(
    !!(initialMenu?.title_en || initialMenu?.description_en || initialMenu?.items_description_en ||
       initialMenu?.title_de || initialMenu?.description_de || initialMenu?.items_description_de)
  )
  const [price, setPrice] = useState(initialMenu?.price?.toString() ?? '')
  const [isActive, setIsActive] = useState(initialMenu?.is_active ?? true)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    // Auto-translate French fields without manual overrides (EN + DE)
    let finalTitleEn = titleEn || null
    let finalDescEn = descEn || null
    let finalItemsDescEn = itemsDescEn || null
    let finalTitleDe = titleDe || null
    let finalDescDe = descDe || null
    let finalItemsDescDe = itemsDescDe || null

    const toEn: Record<string, string> = {}
    const toDe: Record<string, string> = {}
    if (!titleEn && titleFr.trim()) toEn.title = titleFr
    if (!descEn && descFr.trim()) toEn.desc = descFr
    if (!itemsDescEn && itemsDescFr.trim()) toEn.items = itemsDescFr
    if (!titleDe && titleFr.trim()) toDe.title = titleFr
    if (!descDe && descFr.trim()) toDe.desc = descFr
    if (!itemsDescDe && itemsDescFr.trim()) toDe.items = itemsDescFr

    const [trEn, trDe] = await Promise.all([
      Object.keys(toEn).length > 0 ? autoTranslate(toEn, 'en') : Promise.resolve({} as Record<string, string | null>),
      Object.keys(toDe).length > 0 ? autoTranslate(toDe, 'de') : Promise.resolve({} as Record<string, string | null>),
    ])

    if (!titleEn && trEn.title) finalTitleEn = trEn.title
    if (!descEn && trEn.desc) finalDescEn = trEn.desc
    if (!itemsDescEn && trEn.items) finalItemsDescEn = trEn.items
    if (!titleDe && trDe.title) finalTitleDe = trDe.title
    if (!descDe && trDe.desc) finalDescDe = trDe.desc
    if (!itemsDescDe && trDe.items) finalItemsDescDe = trDe.items

    const data = {
      title_fr: titleFr,
      title_en: finalTitleEn,
      title_de: finalTitleDe,
      description_fr: descFr || null,
      description_en: finalDescEn,
      description_de: finalDescDe,
      items_description_fr: itemsDescFr || null,
      items_description_en: finalItemsDescEn,
      items_description_de: finalItemsDescDe,
      price: price ? parseFloat(price) : null,
      is_active: isActive,
    }

    if (initialMenu) {
      await supabase.from('daily_menus').update(data).eq('id', initialMenu.id)
    } else {
      await supabase.from('daily_menus').insert({
        ...data,
        restaurant_id: restaurantId,
        valid_date: today,
      })
    }

    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-border p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <CalendarDays className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted">
            {new Date(today).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <Input
          label="Titre"
          value={titleFr}
          onChange={(e) => setTitleFr(e.target.value)}
          placeholder="Menu du jour"
        />

        <Textarea
          label="Description"
          value={descFr}
          onChange={(e) => setDescFr(e.target.value)}
          placeholder="Notre sélection du jour..."
        />

        <Textarea
          label="Composition"
          value={itemsDescFr}
          onChange={(e) => setItemsDescFr(e.target.value)}
          placeholder="Entrée : Soupe à l'oignon&#10;Plat : Bœuf bourguignon&#10;Dessert : Tarte tatin"
        />

        <Input
          label="Prix (€)"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="15.90"
        />

        {showTranslations ? (
          <div className="space-y-5 p-4 bg-surface rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                Traductions (optionnel)
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowTranslations(false)
                  setTitleEn(''); setDescEn(''); setItemsDescEn('')
                  setTitleDe(''); setDescDe(''); setItemsDescDe('')
                }}
                className="text-[11px] text-muted-light hover:text-foreground"
              >
                Utiliser la traduction auto
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-primary-light">Anglais</p>
              <Input label="Titre (EN)" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="Daily menu" />
              <Textarea label="Description (EN)" value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder="Our daily selection..." />
              <Textarea label="Composition (EN)" value={itemsDescEn} onChange={(e) => setItemsDescEn(e.target.value)} placeholder="Starter: Onion soup&#10;Main: Beef bourguignon&#10;Dessert: Tarte tatin" />
            </div>
            <div className="space-y-3 pt-3 border-t border-border">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-primary-light">Allemand</p>
              <Input label="Titel (DE)" value={titleDe} onChange={(e) => setTitleDe(e.target.value)} placeholder="Tagesmenü" />
              <Textarea label="Beschreibung (DE)" value={descDe} onChange={(e) => setDescDe(e.target.value)} placeholder="Unsere tägliche Auswahl..." />
              <Textarea label="Zusammensetzung (DE)" value={itemsDescDe} onChange={(e) => setItemsDescDe(e.target.value)} placeholder="Vorspeise: Zwiebelsuppe&#10;Hauptgang: Rindergulasch&#10;Nachtisch: Tarte Tatin" />
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowTranslations(true)}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            Modifier les traductions (EN, DE)
          </button>
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              isActive ? 'bg-primary' : 'bg-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                isActive ? 'translate-x-5' : ''
              }`}
            />
          </button>
          <span className="text-sm text-foreground">
            {isActive ? 'Actif — visible par les clients' : 'Inactif — masqué'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#9B9B9B] flex items-center gap-1">
          <Languages className="w-3 h-3" />
          Traduction automatique FR → EN
        </span>
        <Button type="submit" disabled={loading}>
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Enregistré !
            </>
          ) : loading ? (
            'Traduction & sauvegarde...'
          ) : (
            'Enregistrer le menu du jour'
          )}
        </Button>
      </div>
    </form>
  )
}
