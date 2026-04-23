import Link from 'next/link'
import type { Restaurant } from '@/types/database'

export function TrialBanner({ restaurant }: { restaurant: Restaurant }) {
  if (restaurant.subscription_status === 'active') return null
  if (restaurant.subscription_status !== 'trialing') return null

  const trialEnd = new Date(restaurant.trial_ends_at)
  const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000))
  const isUrgent = daysLeft <= 3
  const isExpired = daysLeft === 0

  return (
    <div className={`rounded-xl px-4 py-3 mb-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center ${
      isExpired
        ? 'bg-red-50 border border-red-200'
        : isUrgent
          ? 'bg-amber-50 border border-amber-200'
          : 'bg-primary text-white'
    }`}>
      <p className={`text-[13px] ${
        isExpired ? 'text-red-800' : isUrgent ? 'text-amber-800' : 'text-white/80'
      }`}>
        {isExpired ? (
          <>Votre essai Pro a expiré — choisissez une formule pour continuer</>
        ) : isUrgent ? (
          <>⚠️ Plus que <strong className="text-amber-900">{daysLeft} jour{daysLeft !== 1 ? 's' : ''}</strong> d&apos;essai Pro — choisissez une formule</>
        ) : (
          <>🕐 Essai Pro — <strong className="text-accent">{daysLeft} jours restants</strong></>
        )}
      </p>
      <Link
        href="/dashboard/abonnement"
        className={`text-xs font-bold px-4 py-1.5 rounded-md transition-colors ${
          isExpired
            ? 'bg-red-600 text-white hover:bg-red-700'
            : isUrgent
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-accent text-foreground hover:bg-accent-light'
        }`}
      >
        Choisir mon plan
      </Link>
    </div>
  )
}
