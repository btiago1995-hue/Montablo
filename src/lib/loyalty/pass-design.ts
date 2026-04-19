import type { Restaurant, LoyaltyProgram, LoyaltyCard } from '@/types/database'

export type PassData = {
  serialNumber: string
  authToken: string
  backgroundColor: string
  foregroundColor: string
  progressLabel: string
  progressValue: string
  rewardDescription: string
  tagline: string
  customerName: string
  restaurantName: string
  qrMessage: string
  hasReward: boolean
}

export function buildPassData(
  restaurant: Restaurant,
  program: LoyaltyProgram,
  card: LoyaltyCard,
): PassData {
  const hasReward = card.current_value >= program.goal

  let progressLabel: string

  if (program.type === 'visits') {
    progressLabel = `${card.current_value} / ${program.goal} visites`
  } else {
    const current = (card.current_value / 100).toFixed(2)
    const goal = (program.goal / 100).toFixed(2)
    progressLabel = `${current}€ / ${goal}€`
  }

  const progressValue = hasReward ? '🎁 Récompense disponible!' : progressLabel

  // Convert hex color to rgb() string for Apple Wallet
  const hex = restaurant.primary_color.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const backgroundColor = `rgb(${r}, ${g}, ${b})`

  return {
    serialNumber: card.id,
    authToken: card.apple_auth_token!,
    backgroundColor,
    foregroundColor: 'rgb(255, 255, 255)',
    progressLabel: 'PROGRESSION',
    progressValue: hasReward ? '🎁 Récompense disponible!' : progressLabel,
    rewardDescription: program.reward_description,
    tagline: program.card_tagline ?? restaurant.name,
    customerName: card.customer_name,
    restaurantName: restaurant.name,
    qrMessage: card.id,
    hasReward,
  }
}
