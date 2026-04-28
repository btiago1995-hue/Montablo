'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LoyaltyNewCustomer() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const res = await fetch('/api/loyalty/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: name, customerEmail: email, customerPhone: phone || undefined }),
    })

    if (res.ok) {
      setSent(true)
      setTimeout(() => router.push('/dashboard/loyalty/customers'), 2000)
    }
    setSaving(false)
  }

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="font-serif text-2xl mb-2">Carte envoyée !</h2>
        <p className="text-muted text-sm">Un email a été envoyé à {email} avec la carte de fidélité.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Nom du client *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Marie Dupont"
          className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="marie@exemple.com"
          className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Téléphone (optionnel)</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+33 6 12 34 56 78"
          className="w-full px-4 py-2.5 border border-border bg-white rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        disabled={saving || !name || !email}
        className="w-full bg-primary text-background py-2.5 px-5 rounded-full text-sm font-semibold hover:bg-primary-light disabled:opacity-50 transition-colors"
      >
        {saving ? 'Envoi en cours...' : 'Créer et envoyer la carte'}
      </button>
      <p className="text-xs text-muted">Le client recevra un email avec les boutons Apple Wallet et Google Wallet.</p>
    </form>
  )
}
