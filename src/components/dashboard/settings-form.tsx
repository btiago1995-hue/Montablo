'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Restaurant } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/ui/image-upload'
import { Check, CreditCard } from 'lucide-react'

export function SettingsForm({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter()
  const [name, setName] = useState(restaurant.name)
  const [primaryColor, setPrimaryColor] = useState(restaurant.primary_color)
  const [secondaryColor, setSecondaryColor] = useState(restaurant.secondary_color)
  const [behavior, setBehavior] = useState(restaurant.unavailable_behavior)
  const [logoUrl, setLogoUrl] = useState(restaurant.logo_url)
  const [coverUrl, setCoverUrl] = useState(restaurant.cover_url)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [billingLoading, setBillingLoading] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    await supabase
      .from('restaurants')
      .update({
        name,
        logo_url: logoUrl,
        cover_url: coverUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        unavailable_behavior: behavior,
      })
      .eq('id', restaurant.id)

    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  async function handleSubscribe() {
    setBillingLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setBillingLoading(false)
    }
  }

  const trialDaysLeft = restaurant.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(restaurant.trial_ends_at).getTime() - Date.now()) / 86400000))
    : 0

  return (
    <div className="max-w-2xl space-y-8">
      {/* Restaurant info */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-border p-6 space-y-5">
        <h2 className="font-serif text-xl text-foreground">Informations</h2>

        <Input
          label="Nom du restaurant"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-[128px_1fr] gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Logo
            </label>
            <ImageUpload
              value={logoUrl}
              onChange={setLogoUrl}
              className="w-32 h-32"
              hint="512 × 512 px"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Photo de couverture
            </label>
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              aspect="wide"
              hint="1200 × 400 px"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Slug (URL)
          </label>
          <div className="px-4 py-2.5 rounded-lg border border-border bg-background text-muted text-sm">
            /menu/<span className="text-foreground">{restaurant.slug}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Couleur principale
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-border cursor-pointer"
              />
              <span className="text-sm text-muted">{primaryColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Couleur accent
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-border cursor-pointer"
              />
              <span className="text-sm text-muted">{secondaryColor}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Plats indisponibles
          </label>
          <select
            value={behavior}
            onChange={(e) => setBehavior(e.target.value as Restaurant['unavailable_behavior'])}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="greyed_out">Afficher en grisé</option>
            <option value="hidden">Masquer complètement</option>
          </select>
        </div>

        <Button type="submit" disabled={loading}>
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Enregistré !
            </>
          ) : loading ? (
            'Enregistrement...'
          ) : (
            'Enregistrer'
          )}
        </Button>
      </form>

      {/* Subscription */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="font-serif text-xl text-foreground mb-4">Abonnement</h2>

        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              restaurant.subscription_status === 'active'
                ? 'bg-green-50 text-green-700'
                : restaurant.subscription_status === 'trialing'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {restaurant.subscription_status === 'active' && 'Actif'}
            {restaurant.subscription_status === 'trialing' && `Essai gratuit — ${trialDaysLeft} jour${trialDaysLeft !== 1 ? 's' : ''} restant${trialDaysLeft !== 1 ? 's' : ''}`}
            {restaurant.subscription_status === 'past_due' && 'Paiement en retard'}
            {restaurant.subscription_status === 'canceled' && 'Annulé'}
            {restaurant.subscription_status === 'inactive' && 'Inactif'}
          </span>
        </div>

        {restaurant.subscription_status !== 'active' && (
          <Button onClick={handleSubscribe} disabled={billingLoading}>
            <CreditCard className="w-4 h-4" />
            {billingLoading ? 'Redirection...' : 'Souscrire un abonnement'}
          </Button>
        )}
      </div>
    </div>
  )
}
