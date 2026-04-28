'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export default function ForgotPasswordPage() {
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Veuillez compléter la vérification anti-robot.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/api/auth/callback?next=/reset-password',
      captchaToken: captchaToken ?? undefined,
    })

    if (error) {
      setError('Une erreur est survenue. Veuillez réessayer.')
      setLoading(false)
      turnstileRef.current?.reset()
      setCaptchaToken(null)
      return
    }

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

          {emailSent ? (
            <>
              <h2 className="font-serif text-4xl text-primary mb-2">
                <span className="italic">Email envoyé</span>
              </h2>
              <p className="text-muted mb-6">
                Un email de réinitialisation a été envoyé à <strong className="text-foreground">{email}</strong>.
              </p>
              <div className="bg-green-soft border border-green-soft text-primary text-sm px-4 py-3 rounded-xl mb-6">
                Cliquez sur le lien dans l&apos;email pour réinitialiser votre mot de passe.
              </div>
              <p className="text-center text-sm text-muted">
                <Link href="/login" className="text-primary-light hover:text-primary font-medium transition-colors">
                  Retour à la connexion
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-4xl text-primary mb-2">
                <span className="italic">Mot de passe oublié</span>
              </h2>
              <p className="text-muted mb-8">
                Entrez votre email pour recevoir un lien de réinitialisation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                <Link href="/login" className="text-primary-light hover:text-primary font-medium transition-colors">
                  Retour à la connexion
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
