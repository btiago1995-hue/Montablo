import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: '#FAFAF7' }}
    >
      <UtensilsCrossed
        className="mb-6 h-16 w-16"
        style={{ color: '#D4A574' }}
        strokeWidth={1.5}
      />

      <h1
        className="font-serif text-4xl font-bold tracking-tight sm:text-5xl"
        style={{ color: '#2C3E2D' }}
      >
        Page introuvable
      </h1>

      <p
        className="mt-4 max-w-md text-center font-sans text-lg"
        style={{ color: '#2C3E2D', opacity: 0.7 }}
      >
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg px-6 py-3 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#2C3E2D' }}
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
