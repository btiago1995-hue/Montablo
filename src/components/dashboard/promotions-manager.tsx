'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Item, Promotion } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import { Plus, Trash2, Tag } from 'lucide-react'

function PromoForm({
  items,
  onDone,
}: {
  items: Item[]
  onDone: () => void
}) {
  const [itemId, setItemId] = useState('')
  const [promoPrice, setPromoPrice] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const selectedItem = items.find((i) => i.id === itemId)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedItem) return
    setLoading(true)

    const supabase = createClient()
    await supabase.from('promotions').insert({
      item_id: itemId,
      original_price: selectedItem.price,
      promo_price: parseFloat(promoPrice),
      ends_at: endsAt || null,
    })

    router.refresh()
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Plat *
        </label>
        <select
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Sélectionner un plat</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name_fr} — {formatPrice(item.price)}
            </option>
          ))}
        </select>
      </div>

      {selectedItem && (
        <div className="bg-background rounded-lg p-3 text-sm">
          <span className="text-muted">Prix actuel :</span>{' '}
          <span className="font-medium">{formatPrice(selectedItem.price)}</span>
        </div>
      )}

      <Input
        label="Prix promotionnel (€) *"
        type="number"
        step="0.01"
        min="0"
        value={promoPrice}
        onChange={(e) => setPromoPrice(e.target.value)}
        required
        placeholder="9.90"
      />

      <Input
        label="Date de fin (optionnel)"
        type="datetime-local"
        value={endsAt}
        onChange={(e) => setEndsAt(e.target.value)}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onDone}>
          Annuler
        </Button>
        <Button type="submit" disabled={loading || !itemId || !promoPrice}>
          {loading ? 'Création...' : 'Créer la promotion'}
        </Button>
      </div>
    </form>
  )
}

export function PromotionsManager({
  items,
  initialPromotions,
}: {
  items: Item[]
  initialPromotions: Promotion[]
}) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const supabase = createClient()
  const itemMap = new Map(items.map((i) => [i.id, i]))

  async function deletePromo(id: string) {
    if (!confirm('Supprimer cette promotion ?')) return
    await supabase.from('promotions').delete().eq('id', id)
    router.refresh()
  }

  async function togglePromo(promo: Promotion) {
    await supabase
      .from('promotions')
      .update({ is_active: !promo.is_active })
      .eq('id', promo.id)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setShowModal(true)}>
        <Plus className="w-4 h-4" />
        Nouvelle promotion
      </Button>

      {initialPromotions.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <Tag className="w-10 h-10 text-muted/30 mx-auto mb-3" />
          <p className="text-muted">Aucune promotion en cours.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border divide-y divide-border">
          {initialPromotions.map((promo) => {
            const item = itemMap.get(promo.item_id)
            return (
              <div key={promo.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">
                    {item?.name_fr ?? 'Plat supprimé'}
                  </p>
                  <div className="flex items-center gap-3 text-sm mt-1">
                    <span className="text-muted line-through">
                      {formatPrice(promo.original_price)}
                    </span>
                    <span className="font-semibold text-red-600">
                      {formatPrice(promo.promo_price)}
                    </span>
                    <span className="text-muted">
                      (-{Math.round((1 - promo.promo_price / promo.original_price) * 100)}%)
                    </span>
                  </div>
                  {promo.ends_at && (
                    <p className="text-xs text-muted mt-1">
                      Expire le{' '}
                      {new Date(promo.ends_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => togglePromo(promo)}
                  className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
                    promo.is_active
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-gray-100 text-muted hover:bg-gray-200'
                  }`}
                >
                  {promo.is_active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => deletePromo(promo.id)}
                  className="p-1.5 text-muted hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Nouvelle promotion"
      >
        <PromoForm items={items} onDone={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}
