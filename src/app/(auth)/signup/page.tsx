'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Eye, EyeOff, UtensilsCrossed } from 'lucide-react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { slugify } from '@/lib/utils'
import { trackSignup } from '@/lib/gtag'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function SignupPage() {
  const router = useRouter()
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const [restaurantName, setRestaurantName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [acceptedCGU, setAcceptedCGU] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      setLoading(false)
      return
    }

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Veuillez compléter la vérification anti-robot.')
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
        captchaToken: captchaToken ?? undefined,
        data: {
          restaurant_name: restaurantName,
        },
      },
    })

    if (authError) {
      setError('Erreur lors de la création du compte. Réessayez.')
      setLoading(false)
      turnstileRef.current?.reset()
      setCaptchaToken(null)
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

      trackSignup()
      router.push('/dashboard/welcome')
      router.refresh()
      return
    }

    trackSignup()
    // Email confirmation is required — show confirmation message
    setEmailSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative">
        <Link href="/" className="absolute top-8 left-8 text-background/70 hover:text-background text-sm font-medium transition-colors">
          ← Retour à l&apos;accueil
        </Link>
        <div className="max-w-md">
          <UtensilsCrossed className="w-14 h-14 text-accent mb-8" />
          <h1 className="font-serif text-5xl text-background mb-6 leading-tight">MonTablo</h1>
          <div className="w-16 h-px bg-accent mb-6" />
          <p className="font-serif italic text-2xl text-background/80 leading-relaxed mb-8">
            Le menu digital pour les restaurants exigeants.
          </p>
          <p className="text-background/60 text-sm">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            <span className="font-serif text-2xl text-primary">MonTablo</span>
          </div>

          {emailSent ? (
            <>
              <h2 className="font-serif text-4xl text-primary mb-2">
                <span className="italic">Vérifiez votre email</span>
              </h2>
              <p className="text-muted mb-6">
                Un email de confirmation a été envoyé à <strong className="text-foreground">{email}</strong>.
              </p>
              <div className="bg-green-soft border border-green-soft text-primary text-sm px-4 py-3 rounded-xl mb-3">
                Cliquez sur le lien dans l&apos;email pour activer votre compte et accéder à votre tableau de bord.
              </div>
              <p className="text-center text-xs text-muted mb-6">
                Si vous ne le voyez pas, vérifiez votre dossier <strong>spam ou courrier indésirable</strong>.
              </p>
              <p className="text-center text-sm text-muted">
                Pas reçu ?{' '}
                <button
                  type="button"
                  onClick={() => setEmailSent(false)}
                  className="text-primary-light hover:text-primary font-medium transition-colors"
                >
                  Réessayer
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-4xl text-primary mb-2">
                <span className="italic">Créer un compte</span>
              </h2>
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
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
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
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
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
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition pr-12"
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

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedCGU}
                    onChange={(e) => setAcceptedCGU(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    J&apos;accepte les{' '}
                    <Link href="/cgu" target="_blank" className="text-primary-light hover:text-primary font-medium transition-colors">
                      Conditions Générales d&apos;Utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link href="/confidentialite" target="_blank" className="text-primary-light hover:text-primary font-medium transition-colors">
                      Politique de confidentialité
                    </Link>
                  </span>
                </label>

                {TURNSTILE_SITE_KEY && (
                  <div className="flex justify-center">
                    <Turnstile
                      ref={turnstileRef}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setCaptchaToken(token)}
                      onError={() => setCaptchaToken(null)}
                      onExpire={() => setCaptchaToken(null)}
                      options={{ theme: 'light' }}
                    />
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !acceptedCGU || (!!TURNSTILE_SITE_KEY && !captchaToken)}
                  className="w-full bg-primary hover:bg-primary-light text-background font-semibold py-3 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Création...' : 'Commencer l\'essai gratuit'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-primary-light hover:text-primary font-medium transition-colors">
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
