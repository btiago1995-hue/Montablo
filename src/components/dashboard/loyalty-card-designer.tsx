'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  ChevronDown,
  ChevronUp,
  Palette,
  Link as LinkIcon,
  Settings,
  MessageSquare,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Map as MapIcon,
  Star,
} from 'lucide-react'
import type { LoyaltyProgram, Restaurant } from '@/types/database'

type Props = {
  restaurant: Restaurant
  program: LoyaltyProgram
}

type DesignState = {
  cardTagline: string
  cardColorOverride: string | null
  wideLogoUrl: string | null
  enableDirections: boolean
  enableReview: boolean
  websiteUrl: string
  instagramUrl: string
  facebookUrl: string
  allowMultipleHolders: boolean
  enableUpdateNotifications: boolean
  welcomeMessageFr: string
  welcomeMessageEn: string
  welcomeMessageDe: string
}

function initialState(program: LoyaltyProgram): DesignState {
  return {
    cardTagline: program.card_tagline ?? '',
    cardColorOverride: program.card_color_override,
    wideLogoUrl: program.wide_logo_url,
    enableDirections: program.enable_directions,
    enableReview: program.enable_review,
    websiteUrl: program.website_url ?? '',
    instagramUrl: program.instagram_url ?? '',
    facebookUrl: program.facebook_url ?? '',
    allowMultipleHolders: program.allow_multiple_holders,
    enableUpdateNotifications: program.enable_update_notifications,
    welcomeMessageFr: program.welcome_message_fr ?? '',
    welcomeMessageEn: program.welcome_message_en ?? '',
    welcomeMessageDe: program.welcome_message_de ?? '',
  }
}

export function CardDesigner({ restaurant, program }: Props) {
  const router = useRouter()
  const [state, setState] = useState<DesignState>(initialState(program))
  const [savedState, setSavedState] = useState<DesignState>(initialState(program))
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [translationsOpen, setTranslationsOpen] = useState(false)
  const [saving, startSaving] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  const isDirty = JSON.stringify(state) !== JSON.stringify(savedState)

  function update<K extends keyof DesignState>(key: K, value: DesignState[K]) {
    setState(s => ({ ...s, [key]: value }))
  }

  async function handleSave() {
    setError(null)
    startSaving(async () => {
      const res = await fetch('/api/loyalty/program/card-design', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'Erreur lors de la sauvegarde')
        return
      }
      setSavedState(state)
      setSavedAt(Date.now())
      router.refresh()
    })
  }

  const cardColor = state.cardColorOverride ?? restaurant.primary_color

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      {/* FORM */}
      <div className="space-y-6">
        <Section icon={<Palette className="w-4 h-4" />} title="Identité de la carte">
          <Field label="Nom du programme" hint="Ex : « Carte fidélité » — max 20 caractères pour un affichage optimal">
            <input
              type="text"
              value={state.cardTagline}
              onChange={e => update('cardTagline', e.target.value)}
              maxLength={40}
              placeholder={restaurant.name}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
            <CharCount value={state.cardTagline} max={20} />
          </Field>
        </Section>

        <Section icon={<Palette className="w-4 h-4" />} title="Apparence">
          <Field
            label="Couleur de fond"
            hint="Si non définie, la couleur principale du restaurant est utilisée"
          >
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={cardColor}
                onChange={e => update('cardColorOverride', e.target.value)}
                className="w-14 h-10 rounded-lg border border-border cursor-pointer"
              />
              <input
                type="text"
                value={state.cardColorOverride ?? ''}
                onChange={e => update('cardColorOverride', e.target.value || null)}
                placeholder={restaurant.primary_color}
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm font-mono focus:outline-none focus:border-primary"
              />
              {state.cardColorOverride && (
                <button
                  type="button"
                  onClick={() => update('cardColorOverride', null)}
                  className="text-xs text-muted hover:text-foreground"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </Field>

          <Field
            label="Logo carré"
            hint="Modifiable depuis Réglages du restaurant. Format recommandé : PNG transparent 660×660."
          >
            <div className="flex items-center gap-3">
              {restaurant.logo_url ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border bg-white">
                  <Image src={restaurant.logo_url} alt="Logo" fill className="object-contain" unoptimized />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full border border-dashed border-border flex items-center justify-center text-xs text-muted">
                  Aucun
                </div>
              )}
              <a href="/dashboard/settings" className="text-xs text-primary hover:underline">
                Modifier dans Réglages
              </a>
            </div>
          </Field>

          <Field
            label="Image bannière (hero)"
            hint="Modifiable depuis Réglages du restaurant. Format : 1032×336 (3:1)."
          >
            <div className="flex items-center gap-3">
              {restaurant.cover_url ? (
                <div className="relative w-32 h-12 rounded-lg overflow-hidden border border-border bg-white">
                  <Image src={restaurant.cover_url} alt="Cover" fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="w-32 h-12 rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted">
                  Aucune
                </div>
              )}
              <a href="/dashboard/settings" className="text-xs text-primary hover:underline">
                Modifier dans Réglages
              </a>
            </div>
          </Field>
        </Section>

        <Section icon={<LinkIcon className="w-4 h-4" />} title="Boutons sur la carte">
          <Toggle
            label="Voir le menu"
            description="Toujours actif — lien vers votre menu digital"
            checked
            disabled
          />
          <Toggle
            label="Itinéraire (Google Maps)"
            description={restaurant.latitude ? 'Affiche un bouton vers votre adresse' : 'Désactivé : ajoutez une adresse dans Réglages'}
            checked={state.enableDirections && restaurant.latitude !== null}
            disabled={restaurant.latitude === null}
            onChange={v => update('enableDirections', v)}
          />
          <Toggle
            label="Laisser un avis Google"
            description={restaurant.google_review_url ? 'Lien vers votre fiche Google' : 'Désactivé : ajoutez votre lien Google dans Réglages'}
            checked={state.enableReview && !!restaurant.google_review_url}
            disabled={!restaurant.google_review_url}
            onChange={v => update('enableReview', v)}
          />
          <Field label="Site web (optionnel)" hint="URL complète, doit commencer par https://">
            <input
              type="url"
              value={state.websiteUrl}
              onChange={e => update('websiteUrl', e.target.value)}
              placeholder="https://votrerestaurant.fr"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </Field>
          <Field label="Instagram (optionnel)">
            <input
              type="url"
              value={state.instagramUrl}
              onChange={e => update('instagramUrl', e.target.value)}
              placeholder="https://instagram.com/votrerestaurant"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </Field>
          <Field label="Facebook (optionnel)">
            <input
              type="url"
              value={state.facebookUrl}
              onChange={e => update('facebookUrl', e.target.value)}
              placeholder="https://facebook.com/votrerestaurant"
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </Field>
        </Section>

        <Section icon={<MessageSquare className="w-4 h-4" />} title="Message de bienvenue (optionnel)">
          <Field label="Message en français" hint="Apparaît dans la carte. Max 500 caractères.">
            <textarea
              value={state.welcomeMessageFr}
              onChange={e => update('welcomeMessageFr', e.target.value)}
              placeholder="Merci d'être un client fidèle ! Profitez de vos avantages."
              maxLength={500}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
            />
            <CharCount value={state.welcomeMessageFr} max={500} />
          </Field>

          <button
            type="button"
            onClick={() => setTranslationsOpen(o => !o)}
            className="flex items-center gap-1 text-xs text-muted hover:text-foreground"
          >
            {translationsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            Traductions (anglais, allemand)
          </button>

          {translationsOpen && (
            <div className="space-y-3 pt-2">
              <Field label="English">
                <textarea
                  value={state.welcomeMessageEn}
                  onChange={e => update('welcomeMessageEn', e.target.value)}
                  placeholder="Thank you for being a loyal customer!"
                  maxLength={500}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                />
              </Field>
              <Field label="Deutsch">
                <textarea
                  value={state.welcomeMessageDe}
                  onChange={e => update('welcomeMessageDe', e.target.value)}
                  placeholder="Vielen Dank, dass Sie ein treuer Kunde sind!"
                  maxLength={500}
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                />
              </Field>
            </div>
          )}
        </Section>

        <Section icon={<Settings className="w-4 h-4" />} title="Options avancées" collapsible open={advancedOpen} onToggle={() => setAdvancedOpen(o => !o)}>
          <Toggle
            label="Permettre le partage entre proches"
            description="Une même carte peut être ajoutée sur plusieurs téléphones (couples, familles)."
            checked={state.allowMultipleHolders}
            onChange={v => update('allowMultipleHolders', v)}
          />
          <Toggle
            label="Notifications de mise à jour"
            description="Le client est notifié sur son téléphone quand ses points changent."
            checked={state.enableUpdateNotifications}
            onChange={v => update('enableUpdateNotifications', v)}
          />
        </Section>

        <div className="sticky bottom-4 bg-white border border-border rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div className="text-sm">
            {error && (
              <span className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" /> {error}
              </span>
            )}
            {!error && savedAt && !isDirty && (
              <span className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-4 h-4" /> Enregistré
              </span>
            )}
            {!error && isDirty && <span className="text-muted">Modifications non enregistrées</span>}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || saving}
            className="bg-primary text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement…' : 'Enregistrer et publier'}
          </button>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <p className="text-xs text-muted uppercase tracking-wide mb-3">Aperçu Google Wallet</p>
        <CardPreview
          restaurant={restaurant}
          program={program}
          state={state}
          cardColor={cardColor}
        />
        <p className="text-xs text-muted mt-3 leading-relaxed">
          Les modifications sont propagées à toutes les cartes existantes après enregistrement.
          Google Wallet peut mettre quelques minutes à actualiser l&apos;affichage côté client.
        </p>
      </div>
    </div>
  )
}

// ============ Sub-components ============

function Section({
  icon,
  title,
  children,
  collapsible,
  open,
  onToggle,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
  collapsible?: boolean
  open?: boolean
  onToggle?: () => void
}) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      {collapsible ? (
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center justify-between w-full mb-4 text-left"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            {icon}
            {title}
          </div>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      ) : (
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          {icon}
          {title}
        </div>
      )}
      {(!collapsible || open) && <div className="space-y-4">{children}</div>}
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-muted mt-1 leading-snug">{hint}</p>}
    </div>
  )
}

function CharCount({ value, max }: { value: string; max: number }) {
  const count = value.length
  const overOptimal = count > max
  return (
    <p className={`text-[10px] mt-0.5 ${overOptimal ? 'text-amber-600' : 'text-muted'}`}>
      {count}/{max} {overOptimal && '(peut être tronqué sur petits écrans)'}
    </p>
  )
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`mt-0.5 relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-300'
        } ${disabled ? 'cursor-not-allowed' : ''}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[18px]' : 'translate-x-0.5'
          } self-center`}
        />
      </button>
      <div className="flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {description && <div className="text-[11px] text-muted leading-snug">{description}</div>}
      </div>
    </label>
  )
}

function CardPreview({
  restaurant,
  program,
  state,
  cardColor,
}: {
  restaurant: Restaurant
  program: LoyaltyProgram
  state: DesignState
  cardColor: string
}) {
  const tagline = state.cardTagline || restaurant.name
  const goalLabel = program.type === 'visits' ? `0 / ${program.goal}` : `0,00€`
  const pointsLabel = program.type === 'visits' ? 'TAMPONS' : 'TOTAL DÉPENSÉ'

  // Contrast: pick white or dark text based on background luminance
  const luminance = computeLuminance(cardColor)
  const textColor = luminance < 0.5 ? '#ffffff' : '#1a1a1a'
  const subtleText = luminance < 0.5 ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.6)'

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: cardColor }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        {restaurant.logo_url ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
            <Image src={restaurant.logo_url} alt="" fill className="object-contain" unoptimized />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/20 shrink-0" />
        )}
        <div className="text-xs font-medium truncate" style={{ color: subtleText }}>
          {restaurant.name}
        </div>
      </div>

      {/* Title */}
      <div className="px-5 pb-3">
        <div className="text-2xl font-semibold leading-tight" style={{ color: textColor }}>
          {tagline}
        </div>
      </div>

      {/* Points row */}
      <div className="px-5 pb-4 flex justify-between text-xs">
        <div>
          <div className="font-medium tracking-wider" style={{ color: subtleText }}>
            {pointsLabel}
          </div>
          <div className="text-base font-semibold mt-0.5" style={{ color: textColor }}>
            {goalLabel}
          </div>
        </div>
        <div className="text-right max-w-[55%]">
          <div className="font-medium tracking-wider" style={{ color: subtleText }}>
            RÉCOMPENSE
          </div>
          <div className="text-xs font-medium mt-0.5 leading-tight" style={{ color: textColor }}>
            {program.reward_description || '—'}
          </div>
        </div>
      </div>

      {/* Hero image */}
      {restaurant.cover_url && (
        <div className="relative w-full aspect-[3/1] bg-black/10">
          <Image src={restaurant.cover_url} alt="" fill className="object-cover" unoptimized />
        </div>
      )}

      {/* QR */}
      <div className="px-5 py-5 flex flex-col items-center gap-2">
        <div className="bg-white p-3 rounded-lg">
          <div
            className="w-32 h-32 grid grid-cols-12 grid-rows-12 gap-px"
            aria-hidden
          >
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className={`${(i * 37) % 7 < 3 ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>
        <div className="text-[10px] font-mono tracking-wider" style={{ color: subtleText }}>
          MTB-XXXXXX
        </div>
      </div>

      {/* Welcome message */}
      {state.welcomeMessageFr && (
        <div className="bg-white/95 px-5 py-3">
          <div className="text-[10px] font-semibold tracking-wider text-gray-600">BIENVENUE</div>
          <div className="text-xs text-gray-800 mt-1 leading-snug">{state.welcomeMessageFr}</div>
        </div>
      )}

      {/* Links */}
      <div className="bg-white/95 divide-y divide-gray-100">
        <PreviewLink icon={<ExternalLink className="w-3 h-3" />} label="Voir le menu" />
        {state.enableDirections && restaurant.latitude !== null && (
          <PreviewLink icon={<MapIcon className="w-3 h-3" />} label="Itinéraire" />
        )}
        {state.enableReview && restaurant.google_review_url && (
          <PreviewLink icon={<Star className="w-3 h-3" />} label="Laisser un avis" />
        )}
        {state.websiteUrl && <PreviewLink icon={<ExternalLink className="w-3 h-3" />} label="Site web" />}
        {state.instagramUrl && <PreviewLink icon={<ExternalLink className="w-3 h-3" />} label="Instagram" />}
        {state.facebookUrl && <PreviewLink icon={<ExternalLink className="w-3 h-3" />} label="Facebook" />}
      </div>
    </div>
  )
}

function PreviewLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="px-5 py-2.5 flex items-center gap-2 text-xs text-gray-700">
      {icon}
      {label}
    </div>
  )
}

function computeLuminance(hex: string): number {
  const m = hex.replace('#', '').match(/[0-9a-f]{2}/gi)
  if (!m || m.length < 3) return 0
  const [r, g, b] = m.slice(0, 3).map(h => parseInt(h, 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
