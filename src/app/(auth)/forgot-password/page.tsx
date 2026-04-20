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
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-center">
          <UtensilsCrossed className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="font-serif text-4xl text-white mb-4">MonTablo</h1>
          <p className="text-white/70 text-lg">
            Le menu digital qui fait la différence pour votre restaurant.
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
              <h2 className="font-serif text-3xl text-foreground mb-2">Email envoyé</h2>
              <p className="text-muted mb-6">
                Un email de réinitialisation a été envoyé à <strong className="text-foreground">{email}</strong>.
              </p>
              <div className="bg-primary/5 border border-primary/20 text-foreground text-sm px-4 py-4 rounded-lg mb-6">
                Cliquez sur le lien dans l&apos;email pour réinitialiser votre mot de passe.
              </div>
              <p className="text-center text-sm text-muted">
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Retour à la connexion
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-3xl text-foreground mb-2">Mot de passe oublié</h2>
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || (!!TURNSTILE_SITE_KEY && !captchaToken)}
                  className="w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi...' : 'Envoyer le lien'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                <Link href="/login" className="text-primary font-medium hover:underline">
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
