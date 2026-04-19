'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'
import { Gift, UserPlus, CheckCircle } from 'lucide-react'

type Props = {
  cards: LoyaltyCard[]
  program: LoyaltyProgram
}

export function LoyaltyCustomers({ cards, program }: Props) {
  const router = useRouter()
  const [redeeming, setRedeeming] = useState<string | null>(null)

  async function handleRedeem(cardId: string) {
    setRedeeming(cardId)
    await fetch(`/api/loyalty/cards/${cardId}/redeem`, { method: 'POST' })
    router.refresh()
    setRedeeming(null)
  }

  void (program.type === 'visits'
    ? `${program.goal} visites`
    : `${(program.goal / 100).toFixed(0)}€`)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{cards.length} client{cards.length !== 1 ? 's' : ''} inscrits</p>
        <Link
          href="/dashboard/loyalty/customers/new"
          className="flex items-center gap-2 bg-[#2C3E2D] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#243325] transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Nouveau client
        </Link>
      </div>

      {cards.length === 0 && (
        <div className="text-center py-16 text-muted">
          <Gift className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucun client inscrit pour l&apos;instant.</p>
        </div>
      )}

      <div className="space-y-3">
        {cards.map((card) => {
          const hasReward = card.current_value >= program.goal
          const progressText = program.type === 'visits'
            ? `${card.current_value} / ${program.goal} visites`
            : `${(card.current_value / 100).toFixed(2)}€ / ${(program.goal / 100).toFixed(2)}€`

          return (
            <div
              key={card.id}
              className={`bg-white border rounded-xl p-4 flex items-center justify-between ${
                hasReward ? 'border-amber-300 bg-amber-50' : 'border-[#E8E8E4]'
              }`}
            >
              <div>
                <div className="font-medium text-sm text-foreground">{card.customer_name}</div>
                <div className="text-xs text-muted mt-0.5">{card.customer_email}</div>
                <div className={`text-xs mt-1 font-medium ${hasReward ? 'text-amber-600' : 'text-muted'}`}>
                  {hasReward ? '🎁 Récompense disponible !' : progressText}
                </div>
              </div>
              {hasReward && (
                <button
                  onClick={() => handleRedeem(card.id)}
                  disabled={redeeming === card.id}
                  className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-amber-600 disabled:opacity-50 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {redeeming === card.id ? '...' : 'Resgatar'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
