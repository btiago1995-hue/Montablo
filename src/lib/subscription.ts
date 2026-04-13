import type { Restaurant } from '@/types/database'

/**
 * Returns true if the restaurant has an active subscription or is within a valid trial period.
 * Returns false for canceled, inactive, past_due, or expired trial.
 */
export function isSubscriptionActive(restaurant: Restaurant): boolean {
  if (restaurant.subscription_status === 'active') {
    return true
  }

  if (restaurant.subscription_status === 'trialing') {
    const trialEnd = new Date(restaurant.trial_ends_at)
    return trialEnd > new Date()
  }

  return false
}

/**
 * Returns a user-friendly French label for the current subscription status.
 */
export function getSubscriptionStatusLabel(restaurant: Restaurant): string {
  switch (restaurant.subscription_status) {
    case 'trialing': {
      const trialEnd = new Date(restaurant.trial_ends_at)
      if (trialEnd <= new Date()) {
        return 'Votre essai gratuit a expiré'
      }
      return 'En période d\'essai'
    }
    case 'active':
      return 'Abonnement actif'
    case 'past_due':
      return 'Paiement en retard'
    case 'canceled':
      return 'Abonnement annulé'
    case 'inactive':
      return 'Abonnement inactif'
    default:
      return 'Abonnement inactif'
  }
}
