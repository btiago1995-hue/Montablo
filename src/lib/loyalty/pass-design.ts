import type { Restaurant, LoyaltyProgram, LoyaltyCard } from '@/types/database'

export type PassData = {
  serialNumber: string
  authToken: string
  backgroundColor: string
  foregroundColor: string
  primaryColor: string
  logoUrl: string | null
  wideLogoUrl: string | null
  progressLabel: string
  progressValue: string
  rewardDescription: string
  tagline: string
  customerName: string
  restaurantName: string
  restaurantSlug: string
  qrMessage: string
  shortCode: string
  hasReward: boolean
  programType: 'visits' | 'spend'
  currentValue: number
  goalValue: number
  heroImageUrl: string | null
  latitude: number | null
  longitude: number | null
  addressLine: string | null
  city: string | null
  postalCode: string | null
  googleReviewUrl: string | null
  enableDirections: boolean
  enableReview: boolean
  websiteUrl: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  allowMultipleHolders: boolean
  enableUpdateNotifications: boolean
  welcomeMessageFr: string | null
  welcomeMessageEn: string | null
  welcomeMessageDe: string | null
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

  // Convert hex color to rgb() string for Apple Wallet
  const hex = restaurant.primary_color.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const backgroundColor = `rgb(${r}, ${g}, ${b})`

  const shortCode = `MTB-${card.id.slice(-6).toUpperCase()}`
  const cardColor = program.card_color_override ?? restaurant.primary_color

  return {
    serialNumber: card.id,
    authToken: card.apple_auth_token!,
    backgroundColor,
    foregroundColor: 'rgb(255, 255, 255)',
    primaryColor: cardColor,
    logoUrl: restaurant.logo_url ?? null,
    wideLogoUrl: program.wide_logo_url,
    progressLabel: 'PROGRESSION',
    progressValue: hasReward ? '🎁 Récompense disponible!' : progressLabel,
    rewardDescription: program.reward_description,
    tagline: program.card_tagline ?? restaurant.name,
    customerName: card.customer_name,
    restaurantName: restaurant.name,
    restaurantSlug: restaurant.slug,
    qrMessage: card.id,
    shortCode,
    hasReward,
    programType: program.type as 'visits' | 'spend',
    currentValue: card.current_value,
    goalValue: program.goal,
    heroImageUrl: restaurant.cover_url,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    addressLine: restaurant.address_line,
    city: restaurant.city,
    postalCode: restaurant.postal_code,
    googleReviewUrl: restaurant.google_review_url,
    enableDirections: program.enable_directions,
    enableReview: program.enable_review,
    websiteUrl: program.website_url,
    instagramUrl: program.instagram_url,
    facebookUrl: program.facebook_url,
    allowMultipleHolders: program.allow_multiple_holders,
    enableUpdateNotifications: program.enable_update_notifications,
    welcomeMessageFr: program.welcome_message_fr,
    welcomeMessageEn: program.welcome_message_en,
    welcomeMessageDe: program.welcome_message_de,
  }
}
