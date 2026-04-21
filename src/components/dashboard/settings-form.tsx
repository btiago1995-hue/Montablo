'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Restaurant } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/ui/image-upload'
import { Check, CreditCard, Star, Trash2 } from 'lucide-react'

export function SettingsForm({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter()
  const [name, setName] = useState(restaurant.name)
  const [primaryColor, setPrimaryColor] = useState(restaurant.primary_color)
  const [secondaryColor, setSecondaryColor] = useState(restaurant.secondary_color)
  const [behavior, setBehavior] = useState(restaurant.unavailable_behavior)
  const [logoUrl, setLogoUrl] = useState(restaurant.logo_url)
  const [coverUrl, setCoverUrl] = useState(restaurant.cover_url)
  const [googleReviewUrl, setGoogleReviewUrl] = useState(restaurant.google_review_url ?? '')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [billingLoading, setBillingLoading] = useState(false)
  const [billingPlan, setBillingPlan] = useState<'monthly' | 'annual'>('annual')
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [addressLine, setAddressLine] = useState(restaurant.address_line ?? '')
  const [city, setCity] = useState(restaurant.city ?? '')
  const [postalCode, setPostalCode] = useState(restaurant.postal_code ?? '')
  const [geocodeStatus, setGeocodeStatus] = useState<'idle' | 'ok' | 'warn'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)
    setGeocodeStatus('idle')

    const res = await fetch('/api/restaurant/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        logo_url: logoUrl,
        cover_url: coverUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        unavailable_behavior: behavior,
        google_review_url: googleReviewUrl.trim() || null,
        address_line: addressLine.trim() || null,
        city: city.trim() || null,
        postal_code: postalCode.trim() || null,
        country_code: 'FR',
      }),
    })

    setLoading(false)

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      setErrorMsg(data.error ?? 'Erreur lors de l\'enregistrement.')
      return
    }

    const data = (await res.json()) as { geocoded: boolean | null }
    if (data.geocoded === false) {
      setGeocodeStatus('warn')
    } else {
      setGeocodeStatus('ok')
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    router.refresh()
  }

  async function handleSubscribe() {
    setBillingLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: billingPlan }),
      })
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

        {/* Google Reviews */}
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#FBBC04]" />
            <h3 className="font-medium text-foreground">Avis Google</h3>
          </div>
          <p className="text-sm text-muted">
            Ajoutez votre lien Google pour rediriger les clients satisfaits vers votre page d&apos;avis.
          </p>
          <Input
            label="Lien Google My Business"
            value={googleReviewUrl}
            onChange={(e) => setGoogleReviewUrl(e.target.value)}
            placeholder="https://g.page/r/votre-restaurant/review"
          />
          <p className="text-xs text-muted">
            5 etoiles → redirige vers Google pour un avis public.
            Moins de 5 → remerciement interne.
          </p>
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <div>
            <h3 className="font-medium text-foreground">Adresse du restaurant</h3>
            <p className="text-sm text-muted mt-1">
              La géolocalisation permet à la carte de fidélité d&apos;apparaître automatiquement
              sur l&apos;écran du téléphone de vos clients quand ils passent près du restaurant.
            </p>
          </div>

          <Input
            label="Adresse"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            placeholder="12 Rue de la République"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Annecy"
            />
            <Input
              label="Code postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="74000"
            />
          </div>

          {geocodeStatus === 'ok' && saved && (
            <p className="text-sm text-green-700">
              📍 Adresse enregistrée — votre restaurant est sur la carte.
            </p>
          )}
          {geocodeStatus === 'warn' && (
            <p className="text-sm text-amber-700">
              ⚠️ Adresse enregistrée, mais nous n&apos;avons pas pu la localiser sur la carte.
              Vérifiez l&apos;orthographe.
            </p>
          )}
          {errorMsg && (
            <p className="text-sm text-red-700">{errorMsg}</p>
          )}
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
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBillingPlan('monthly')}
                className={`flex-1 p-3 rounded-lg border-2 text-left transition-all ${
                  billingPlan === 'monthly'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="text-sm font-semibold text-foreground">Mensuel</div>
                <div className="text-lg font-bold text-foreground">29,99 &euro;<span className="text-xs font-normal text-muted">/mois</span></div>
              </button>
              <button
                type="button"
                onClick={() => setBillingPlan('annual')}
                className={`flex-1 p-3 rounded-lg border-2 text-left transition-all relative ${
                  billingPlan === 'annual'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <span className="absolute -top-2.5 right-2 text-[10px] font-bold bg-green-600 text-white px-2 py-0.5 rounded-full">-10%</span>
                <div className="text-sm font-semibold text-foreground">Annuel</div>
                <div className="text-lg font-bold text-foreground">26,99 &euro;<span className="text-xs font-normal text-muted">/mois</span></div>
                <div className="text-[11px] text-muted">323,89 &euro;/an</div>
              </button>
            </div>
            <Button onClick={handleSubscribe} disabled={billingLoading} className="w-full">
              <CreditCard className="w-4 h-4" />
              {billingLoading ? 'Redirection...' : 'Souscrire un abonnement'}
            </Button>
          </div>
        )}
      </div>

      {/* Zone dangereuse */}
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h2 className="font-serif text-xl text-red-900">Zone dangereuse</h2>
        </div>
        <p className="text-sm text-red-800 mb-4">
          La suppression de votre compte est irréversible. Toutes vos données seront définitivement effacées : restaurant, menu, catégories et plats.
        </p>
        <Button
          type="button"
          disabled={deleteLoading}
          onClick={async () => {
            const confirmed = window.confirm(
              'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront perdues.'
            )
            if (!confirmed) return

            setDeleteLoading(true)
            try {
              const res = await fetch('/api/account/delete', { method: 'POST' })
              if (res.ok) {
                window.location.href = '/'
              } else {
                alert('Une erreur est survenue. Veuillez réessayer.')
                setDeleteLoading(false)
              }
            } catch {
              alert('Une erreur est survenue. Veuillez réessayer.')
              setDeleteLoading(false)
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Trash2 className="w-4 h-4" />
          {deleteLoading ? 'Suppression...' : 'Supprimer mon compte'}
        </Button>
      </div>
    </div>
  )
}
