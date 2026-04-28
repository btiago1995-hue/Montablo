'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LoyaltyProgram, Restaurant } from '@/types/database'

type Props = {
  restaurantId: string
  existing: LoyaltyProgram | null
  restaurant: Restaurant
}

export function LoyaltySetup({ existing, restaurant }: Props) {
  const router = useRouter()
  const [type, setType] = useState<'visits' | 'spend'>(existing?.type ?? 'visits')
  const [goal, setGoal] = useState(
    existing
      ? existing.type === 'spend'
        ? String(existing.goal / 100)
        : String(existing.goal)
      : '10'
  )
  const [rewardDescription, setRewardDescription] = useState(existing?.reward_description ?? '')
  const [cardTagline, setCardTagline] = useState(existing?.card_tagline ?? '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    const goalValue = type === 'spend' ? Math.round(parseFloat(goal) * 100) : parseInt(goal)

    const res = await fetch('/api/loyalty/program', {
      method: existing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        goal: goalValue,
        rewardDescription,
        cardTagline,
      }),
    })

    if (res.ok) {
      router.push('/dashboard/loyalty')
      router.refresh()
    }
    setSaving(false)
  }

  return (
    <div className="max-w-lg space-y-6">
      {(!restaurant.cover_url || restaurant.latitude === null) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <p className="font-medium text-amber-900 mb-2">
            💡 Pour une carte plus attrayante :
          </p>
          <ul className="space-y-1.5 text-amber-900">
            <li>
              {restaurant.cover_url ? '✅' : '☐'}{' '}
              <a href="/dashboard/settings" className="underline">
                Ajoutez une image de couverture
              </a>
            </li>
            <li>
              {restaurant.latitude !== null ? '✅' : '☐'}{' '}
              <a href="/dashboard/settings" className="underline">
                Ajoutez l&apos;adresse du restaurant
              </a>
            </li>
          </ul>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Type de programme</label>
        <div className="flex gap-3">
          <button
            onClick={() => setType('visits')}
            className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-colors ${
              type === 'visits'
                ? 'bg-primary text-background border-primary'
                : 'bg-white text-foreground border-border hover:border-primary/30 hover:bg-surface'
            }`}
          >
            Par visites
          </button>
          <button
            onClick={() => setType('spend')}
            className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-colors ${
              type === 'spend'
                ? 'bg-primary text-background border-primary'
                : 'bg-white text-foreground border-border hover:border-primary/30 hover:bg-surface'
            }`}
          >
            Par dépenses
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {type === 'visits' ? 'Nombre de visites pour la récompense' : 'Montant en € pour la récompense'}
        </label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={type === 'visits' ? '10' : '50'}
          className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description de la récompense</label>
        <input
          type="text"
          value={rewardDescription}
          onChange={(e) => setRewardDescription(e.target.value)}
          placeholder="1 café offert"
          className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Slogan du cartão (optionnel)</label>
        <input
          type="text"
          value={cardTagline}
          onChange={(e) => setCardTagline(e.target.value)}
          placeholder="Merci pour votre fidélité !"
          className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving || !goal || !rewardDescription}
        className="w-full bg-primary text-background py-2.5 px-5 rounded-full text-sm font-semibold hover:bg-primary-light disabled:opacity-50 transition-colors"
      >
        {saving ? 'Enregistrement...' : 'Enregistrer le programme'}
      </button>
    </div>
  )
}
