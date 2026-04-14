'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { UtensilsCrossed } from 'lucide-react'
import { ImageUpload } from '@/components/ui/image-upload'
import { ColorPalettePicker } from '@/components/dashboard/color-palette-picker'
import { Button } from '@/components/ui/button'
import type { Restaurant } from '@/types/database'

function ProgressBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = ['Personnaliser', 'Importer', 'Publier']
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center">
          {i > 0 && (
            <div className={`w-10 sm:w-12 h-0.5 mx-2 sm:mx-3 ${i < step ? 'bg-[#2D6A4F]' : 'bg-border'}`} />
          )}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i + 1 < step
                  ? 'bg-[#2D6A4F] text-white'
                  : i + 1 === step
                    ? 'bg-primary text-white'
                    : 'bg-border text-muted'
              }`}
            >
              {i + 1 < step ? '✓' : i + 1}
            </div>
            <span className={`text-[13px] font-semibold hidden sm:inline ${i + 1 <= step ? 'text-foreground' : 'text-muted'}`}>
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function WelcomeClient({ restaurant }: { restaurant: Restaurant }) {
  const router = useRouter()
  const [primaryColor, setPrimaryColor] = useState(restaurant.primary_color)
  const [accentColor, setAccentColor] = useState(restaurant.secondary_color)
  const [logoUrl, setLogoUrl] = useState(restaurant.logo_url)
  const [loading, setLoading] = useState(false)

  async function handleContinue() {
    setLoading(true)
    const supabase = createClient()
    await supabase
      .from('restaurants')
      .update({
        primary_color: primaryColor,
        secondary_color: accentColor,
        logo_url: logoUrl,
        onboarding_step: 'import',
      })
      .eq('id', restaurant.id)

    router.push('/dashboard/import')
    router.refresh()
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
      <div className="flex items-center gap-2 mb-10">
        <UtensilsCrossed className="w-7 h-7 text-primary" />
        <span className="font-serif text-xl text-primary">MonTablo</span>
      </div>

      <ProgressBar step={1} />

      <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 max-w-[520px] w-full">
        <h1 className="font-serif text-[26px] text-foreground mb-2">
          Bienvenue, {restaurant.name} !
        </h1>
        <p className="text-[15px] text-muted mb-8 leading-relaxed">
          Personnalisez l&apos;apparence de votre menu digital.
          Vous pourrez toujours modifier ces choix plus tard.
        </p>

        <div className="space-y-6">
          <ColorPalettePicker
            onSelect={(primary, accent) => {
              setPrimaryColor(primary)
              setAccentColor(accent)
            }}
          />

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-muted mb-3">
              Logo (optionnel)
            </h3>
            <ImageUpload
              value={logoUrl}
              onChange={setLogoUrl}
              className="w-32 h-32"
              hint="512 × 512 px"
            />
          </div>

          <Button onClick={handleContinue} disabled={loading} className="w-full">
            {loading ? 'Enregistrement...' : 'Continuer → Importer mon menu'}
          </Button>
        </div>
      </div>
    </div>
  )
}
