'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, UtensilsCrossed } from 'lucide-react'
import { slugify } from '@/lib/utils'

export default function SignupPage() {
  const router = useRouter()
  const [restaurantName, setRestaurantName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      setLoading(false)
      return
    }

    const supabase = createClient()

    // 1. Create user — store restaurant name in metadata for later use
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        data: {
          restaurant_name: restaurantName,
        },
      },
    })

    if (authError) {
      setError('Erreur lors de la création du compte. Réessayez.')
      setLoading(false)
      return
    }

    // Check if user has a session (no email confirmation required)
    if (authData.session) {
      // User is immediately authenticated — create restaurant now
      const slug = slugify(restaurantName) + '-' + Math.random().toString(36).slice(2, 6)
      const { error: restaurantError } = await supabase.from('restaurants').insert({
        owner_id: authData.user!.id,
        name: restaurantName,
        slug,
      })

      if (restaurantError) {
        setError('Erreur lors de la création du restaurant.')
        setLoading(false)
        return
      }

      router.push('/dashboard/import')
      router.refresh()
      return
    }

    // Email confirmation is required — show confirmation message
    setEmailSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-center">
          <UtensilsCrossed className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="font-serif text-4xl text-white mb-4">MonTablo</h1>
          <p className="text-white/70 text-lg">
            Créez votre menu digital en quelques minutes. 14 jours d&apos;essai gratuit.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            <span className="font-serif text-2xl text-primary">MonTablo</span>
          </div>

          {emailSent ? (
            <>
              <h2 className="font-serif text-3xl text-foreground mb-2">Vérifiez votre email</h2>
              <p className="text-muted mb-6">
                Un email de confirmation a été envoyé à <strong className="text-foreground">{email}</strong>.
              </p>
              <div className="bg-primary/5 border border-primary/20 text-foreground text-sm px-4 py-4 rounded-lg mb-6">
                Cliquez sur le lien dans l&apos;email pour activer votre compte et accéder à votre tableau de bord.
              </div>
              <p className="text-center text-sm text-muted">
                Pas reçu ?{' '}
                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="text-primary font-medium hover:underline"
                >
                  Réessayer
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-3xl text-foreground mb-2">Créer un compte</h2>
              <p className="text-muted mb-8">
                Commencez votre essai gratuit de 14 jours.
              </p>

              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label htmlFor="restaurant" className="block text-sm font-medium text-foreground mb-1.5">
                    Nom du restaurant
                  </label>
                  <input
                    id="restaurant"
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    required
                    placeholder="Le Petit Bistrot"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="vous@restaurant.fr"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Minimum 6 caractères"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Création...' : 'Commencer l\'essai gratuit'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Se connecter
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
