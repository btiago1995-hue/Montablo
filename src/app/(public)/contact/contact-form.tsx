'use client'

import { useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function ContactForm() {
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [message, setMessage] = useState('')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Veuillez compléter la vérification anti-robot.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          restaurant,
          message,
          captchaToken: captchaToken ?? undefined,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data?.error ?? 'Une erreur est survenue. Réessayez.')
        turnstileRef.current?.reset()
        setCaptchaToken(null)
        setLoading(false)
        return
      }

      setSent(true)
      setLoading(false)
    } catch {
      setError('Une erreur est survenue. Réessayez.')
      turnstileRef.current?.reset()
      setCaptchaToken(null)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-white border border-border/50 rounded-[16px] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Send className="w-5 h-5 text-accent-dark" />
        </div>
        <h2 className="font-serif text-2xl text-foreground mb-2">Message envoyé</h2>
        <p className="text-muted leading-relaxed max-w-md mx-auto">
          Merci ! Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais à l&apos;adresse <strong className="text-foreground">{email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border/50 rounded-[16px] p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Nom
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={200}
            placeholder="Votre nom"
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
            maxLength={200}
            placeholder="vous@restaurant.fr"
            className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="restaurant" className="block text-sm font-medium text-foreground mb-1.5">
          Nom du restaurant <span className="text-muted/60 font-normal">(optionnel)</span>
        </label>
        <input
          id="restaurant"
          type="text"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
          maxLength={200}
          placeholder="Le Petit Bistrot"
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={5000}
          rows={6}
          placeholder="Comment pouvons-nous vous aider ?"
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
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
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-medium py-3.5 px-6 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none text-[15px]"
      >
        {loading ? 'Envoi...' : 'Envoyer le message'}
        {!loading && <Send className="w-4 h-4" />}
      </button>
    </form>
  )
}
