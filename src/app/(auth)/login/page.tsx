'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState, Suspense } from 'react'
import { Eye, EyeOff, UtensilsCrossed } from 'lucide-react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Veuillez compléter la vérification anti-robot.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken: captchaToken ?? undefined,
      },
    })

    if (error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      turnstileRef.current?.reset()
      setCaptchaToken(null)
      return
    }

    const next = searchParams.get('next')
    const redirectTo = next && next.startsWith('/') ? next : '/dashboard'
    router.push(redirectTo)
    router.refresh()
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
          <p className="font-serif italic text-2xl text-background/80 leading-relaxed">
            Le menu digital pour les restaurants exigeants.
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

          <h2 className="font-serif text-4xl text-primary mb-2">
            <span className="italic">Connexion</span>
          </h2>
          <p className="text-muted mb-8">
            Accédez à votre espace restaurateur.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
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
                  placeholder="••••••••"
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
              <div className="flex justify-end mt-1.5">
                <Link href="/forgot-password" className="text-sm text-primary-light hover:text-primary font-medium transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

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
              disabled={loading || (!!TURNSTILE_SITE_KEY && !captchaToken)}
              className="w-full bg-primary hover:bg-primary-light text-background font-semibold py-3 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-primary-light hover:text-primary font-medium transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
