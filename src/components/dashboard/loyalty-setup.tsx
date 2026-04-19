'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LoyaltyProgram } from '@/types/database'

type Props = {
  restaurantId: string
  existing: LoyaltyProgram | null
}

export function LoyaltySetup({ restaurantId, existing }: Props) {
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
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Type de programme</label>
        <div className="flex gap-3">
          <button
            onClick={() => setType('visits')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              type === 'visits'
                ? 'bg-[#2C3E2D] text-white border-[#2C3E2D]'
                : 'bg-white text-foreground border-[#E8E8E4] hover:border-[#2C3E2D]'
            }`}
          >
            Par visites
          </button>
          <button
            onClick={() => setType('spend')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              type === 'spend'
                ? 'bg-[#2C3E2D] text-white border-[#2C3E2D]'
                : 'bg-white text-foreground border-[#E8E8E4] hover:border-[#2C3E2D]'
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
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description de la récompense</label>
        <input
          type="text"
          value={rewardDescription}
          onChange={(e) => setRewardDescription(e.target.value)}
          placeholder="1 café offert"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Slogan du cartão (optionnel)</label>
        <input
          type="text"
          value={cardTagline}
          onChange={(e) => setCardTagline(e.target.value)}
          placeholder="Merci pour votre fidélité !"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving || !goal || !rewardDescription}
        className="w-full bg-[#2C3E2D] text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-[#243325] disabled:opacity-50 transition-colors"
      >
        {saving ? 'Enregistrement...' : 'Enregistrer le programme'}
      </button>
    </div>
  )
}
