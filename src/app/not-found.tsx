import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-background text-foreground">
      <UtensilsCrossed className="mb-6 h-16 w-16 text-accent" strokeWidth={1.5} />

      <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl text-primary">
        Page introuvable
      </h1>

      <p className="mt-4 max-w-md text-center font-sans text-lg text-muted">
        Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-primary text-background px-6 py-3 font-sans text-sm font-semibold hover:bg-primary-light transition"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
