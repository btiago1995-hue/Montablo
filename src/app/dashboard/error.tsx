'use client'

import Link from 'next/link'

export default function DashboardError({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F2] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h2 className="font-serif text-2xl text-foreground mb-3">
          Une erreur est survenue
        </h2>
        <p className="text-sm text-muted mb-6">
          Nous n&apos;avons pas pu charger cette page. Veuillez réessayer.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary-light transition-colors text-sm"
          >
            Réessayer
          </button>
          <Link
            href="/login"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
