'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'
import { Gift, UserPlus, CheckCircle, Search, Mail, Pencil, X, Check } from 'lucide-react'

type Props = {
  cards: LoyaltyCard[]
  program: LoyaltyProgram
}

export function LoyaltyCustomers({ cards, program }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [redeeming, setRedeeming] = useState<string | null>(null)
  const [resending, setResending] = useState<string | null>(null)
  const [editingEmail, setEditingEmail] = useState<string | null>(null)
  const [emailDraft, setEmailDraft] = useState('')
  const [savingEmail, setSavingEmail] = useState(false)

  const filtered = cards.filter((c) => {
    const q = search.toLowerCase()
    return c.customer_name.toLowerCase().includes(q) || c.customer_email.toLowerCase().includes(q)
  })

  async function handleRedeem(cardId: string) {
    setRedeeming(cardId)
    await fetch(`/api/loyalty/cards/${cardId}/redeem`, { method: 'POST' })
    router.refresh()
    setRedeeming(null)
  }

  async function handleResend(cardId: string) {
    setResending(cardId)
    await fetch(`/api/loyalty/cards/${cardId}/resend`, { method: 'POST' })
    setResending(null)
  }

  function startEditEmail(card: LoyaltyCard) {
    setEditingEmail(card.id)
    setEmailDraft(card.customer_email)
  }

  async function saveEmail(cardId: string) {
    setSavingEmail(true)
    await fetch(`/api/loyalty/cards/${cardId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_email: emailDraft }),
    })
    setSavingEmail(false)
    setEditingEmail(null)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">{cards.length} client{cards.length !== 1 ? 's' : ''} inscrits</p>
        <Link
          href="/dashboard/loyalty/customers/new"
          className="flex items-center gap-2 bg-[#2C3E2D] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#243325] transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Nouveau client
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Rechercher par nom ou email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-[#E8E8E4] rounded-lg text-sm bg-white focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      {cards.length === 0 && (
        <div className="text-center py-16 text-muted">
          <Gift className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucun client inscrit pour l&apos;instant.</p>
        </div>
      )}

      {cards.length > 0 && filtered.length === 0 && (
        <div className="text-center py-10 text-muted text-sm">
          Aucun client trouvé pour &quot;{search}&quot;.
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((card) => {
          const hasReward = card.current_value >= program.goal
          const progressText = program.type === 'visits'
            ? `${card.current_value} / ${program.goal} visites`
            : `${(card.current_value / 100).toFixed(2)}€ / ${(program.goal / 100).toFixed(2)}€`

          return (
            <div
              key={card.id}
              className={`bg-white border rounded-xl p-4 ${hasReward ? 'border-amber-300 bg-amber-50' : 'border-[#E8E8E4]'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground">{card.customer_name}</div>

                  {editingEmail === card.id ? (
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="email"
                        value={emailDraft}
                        onChange={(e) => setEmailDraft(e.target.value)}
                        className="flex-1 text-xs border border-[#2C3E2D] rounded px-2 py-1 focus:outline-none min-w-0"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEmail(card.id)}
                        disabled={savingEmail}
                        className="text-[#2C3E2D] hover:text-[#1a2b1b] disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingEmail(null)}
                        className="text-muted hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-muted truncate">{card.customer_email}</span>
                      <button
                        onClick={() => startEditEmail(card)}
                        className="text-muted hover:text-foreground flex-shrink-0"
                        title="Modifier l'email"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <div className={`text-xs mt-1 font-medium ${hasReward ? 'text-amber-600' : 'text-muted'}`}>
                    {hasReward ? '🎁 Récompense disponible !' : progressText}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  {hasReward && (
                    <button
                      onClick={() => handleRedeem(card.id)}
                      disabled={redeeming === card.id}
                      className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-amber-600 disabled:opacity-50 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      {redeeming === card.id ? '…' : 'Utiliser'}
                    </button>
                  )}
                  <button
                    onClick={() => handleResend(card.id)}
                    disabled={resending === card.id}
                    className="flex items-center gap-1.5 border border-[#E8E8E4] text-muted px-3 py-2 rounded-lg text-xs font-medium hover:border-[#2C3E2D] hover:text-foreground disabled:opacity-50 transition-colors"
                    title="Renvoyer la carte par email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {resending === card.id ? '…' : 'Renvoyer'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
