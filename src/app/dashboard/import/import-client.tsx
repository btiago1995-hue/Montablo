'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MenuImportWizard } from '@/components/dashboard/menu-import-wizard'

export function ImportPageClient({ restaurantId }: { restaurantId: string }) {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl text-foreground mb-2">Importez votre menu</h1>
        <p className="text-muted">
          Uploadez un PDF, une photo ou collez le texte de votre menu. Notre IA extraira
          automatiquement vos plats et catégories.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <MenuImportWizard
          restaurantId={restaurantId}
          mode="onboarding"
          onComplete={() => {
            router.push('/dashboard/success')
            router.refresh()
          }}
        />
      </div>

      <div className="text-center mt-6">
        <Link
          href="/dashboard"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          Passer cette étape &rarr;
        </Link>
      </div>
    </div>
  )
}
