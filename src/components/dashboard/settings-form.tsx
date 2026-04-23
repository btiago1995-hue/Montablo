'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Restaurant } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/ui/image-upload'
import { AlertTriangle, Check, Star, Trash2, X } from 'lucide-react'

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
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [dangerExpanded, setDangerExpanded] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [deleteCountdown, setDeleteCountdown] = useState(5)

  const DELETE_CONFIRM_WORD = 'SUPPRIMER'

  useEffect(() => {
    if (!deleteModalOpen) return
    setDeleteCountdown(5)
    const interval = setInterval(() => {
      setDeleteCountdown((c) => (c > 0 ? c - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [deleteModalOpen])

  async function handleDeleteAccount() {
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
  }
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

  return (
    <div className="max-w-2xl space-y-8">
      {/* Lien vers /dashboard/abonnement */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Abonnement</p>
            <p className="text-sm text-muted">Gérez votre formule depuis la page dédiée.</p>
          </div>
          <Link href="/dashboard/abonnement" className="text-sm font-medium text-primary hover:underline">
            Voir mon abonnement →
          </Link>
        </div>
      </div>

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

      {/* Zone dangereuse (collapsed by default) */}
      <div className="rounded-xl border border-border bg-white p-6">
        <button
          type="button"
          onClick={() => setDangerExpanded((v) => !v)}
          className="flex items-center justify-between w-full text-left"
          aria-expanded={dangerExpanded}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-muted" />
            <h2 className="font-serif text-xl text-foreground">Zone dangereuse</h2>
          </div>
          <span className="text-sm text-muted">
            {dangerExpanded ? 'Masquer' : 'Afficher'}
          </span>
        </button>

        {dangerExpanded && (
          <div className="mt-5 pt-5 border-t border-border">
            <div className="rounded-lg border border-red-200 bg-red-50 p-5">
              <p className="text-sm text-red-800 mb-4 leading-relaxed">
                La suppression de votre compte est <strong>irréversible</strong>. Toutes vos données seront définitivement effacées : restaurant, menu, catégories, plats, promotions et fidélité.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setDeleteConfirmText('')
                  setDeleteModalOpen(true)
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer mon compte
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => !deleteLoading && setDeleteModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-serif text-xl text-foreground">Confirmer la suppression</h3>
              </div>
              {!deleteLoading && (
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="text-muted hover:text-foreground"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="text-sm text-muted mb-4 leading-relaxed">
              Cette action est <strong className="text-foreground">définitive</strong>. Votre restaurant, votre menu et toutes vos données seront effacés. Les clients qui scannent votre QR code ne verront plus votre menu.
            </p>

            <label className="block text-sm font-medium text-foreground mb-2">
              Pour confirmer, tapez <span className="font-mono text-red-600">{DELETE_CONFIRM_WORD}</span> ci-dessous :
            </label>
            <Input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder={DELETE_CONFIRM_WORD}
              autoFocus
              disabled={deleteLoading}
              className="mb-5 font-mono"
            />

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleteLoading}
                className="flex-1 bg-white border border-border text-foreground hover:bg-background"
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={handleDeleteAccount}
                disabled={
                  deleteLoading ||
                  deleteConfirmText !== DELETE_CONFIRM_WORD ||
                  deleteCountdown > 0
                }
                className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                {deleteLoading
                  ? 'Suppression...'
                  : deleteCountdown > 0
                    ? `Supprimer (${deleteCountdown}s)`
                    : 'Supprimer définitivement'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
