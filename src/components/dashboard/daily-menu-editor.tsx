'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import type { DailyMenu } from '@/types/database'
import { CalendarDays, Check, Languages } from 'lucide-react'

async function autoTranslate(texts: Record<string, string>): Promise<Record<string, string | null>> {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts }),
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
  const [descFr, setDescFr] = useState(initialMenu?.description_fr ?? '')
  const [descEn, setDescEn] = useState(initialMenu?.description_en ?? '')
  const [itemsDescFr, setItemsDescFr] = useState(initialMenu?.items_description_fr ?? '')
  const [itemsDescEn, setItemsDescEn] = useState(initialMenu?.items_description_en ?? '')
  const [showEn, setShowEn] = useState(!!(initialMenu?.title_en || initialMenu?.description_en || initialMenu?.items_description_en))
  const [price, setPrice] = useState(initialMenu?.price?.toString() ?? '')
  const [isActive, setIsActive] = useState(initialMenu?.is_active ?? true)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()

    // Auto-translate French fields without manual English overrides
    let finalTitleEn = titleEn || null
    let finalDescEn = descEn || null
    let finalItemsDescEn = itemsDescEn || null

    const toTranslate: Record<string, string> = {}
    if (!titleEn && titleFr.trim()) toTranslate.title = titleFr
    if (!descEn && descFr.trim()) toTranslate.desc = descFr
    if (!itemsDescEn && itemsDescFr.trim()) toTranslate.items = itemsDescFr

    if (Object.keys(toTranslate).length > 0) {
      const translations = await autoTranslate(toTranslate)
      if (!titleEn && translations.title) finalTitleEn = translations.title
      if (!descEn && translations.desc) finalDescEn = translations.desc
      if (!itemsDescEn && translations.items) finalItemsDescEn = translations.items
    }

    const data = {
      title_fr: titleFr,
      title_en: finalTitleEn,
      description_fr: descFr || null,
      description_en: finalDescEn,
      items_description_fr: itemsDescFr || null,
      items_description_en: finalItemsDescEn,
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

        {showEn ? (
          <div className="space-y-3 p-4 bg-[#F5F5F2] rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#6B6B6B] flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                Traduction anglaise (optionnel)
              </span>
              <button
                type="button"
                onClick={() => { setShowEn(false); setTitleEn(''); setDescEn(''); setItemsDescEn('') }}
                className="text-[11px] text-[#9B9B9B] hover:text-[#1A1A1A]"
              >
                Utiliser la traduction auto
              </button>
            </div>
            <Input
              label="Titre (EN)"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="Daily menu"
            />
            <Textarea
              label="Description (EN)"
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Our daily selection..."
            />
            <Textarea
              label="Composition (EN)"
              value={itemsDescEn}
              onChange={(e) => setItemsDescEn(e.target.value)}
              placeholder="Starter: Onion soup&#10;Main: Beef bourguignon&#10;Dessert: Tarte tatin"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowEn(true)}
            className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            Modifier la traduction anglaise
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
