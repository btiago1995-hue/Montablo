export type Tier = 'essentiel' | 'pro' | 'premium'
export type BillingCycle = 'monthly' | 'annual'

export type TierConfig = {
  id: Tier
  name: string
  tagline: string
  description: string
  priceMonthlyHt: number | null
  priceAnnualHt: number | null
  priceAnnualTotalHt: number | null
  features: string[]
  cta: { label: string; href: string }
  highlighted: boolean
}

export const TIERS: Record<Tier, TierConfig> = {
  essentiel: {
    id: 'essentiel',
    name: 'Essentiel',
    tagline: 'Pour démarrer simplement',
    description:
      'Idéal pour les bistrots et établissements qui veulent remplacer leur carte papier sans se compliquer la vie.',
    priceMonthlyHt: 19,
    priceAnnualHt: 17.1,
    priceAnnualTotalHt: 205,
    features: [
      'Plats et catégories illimités',
      'QR code personnalisé',
      'Bilingue Français + Anglais',
      'Conformité allergènes INCO 1169/2011',
      'Mises à jour temps réel',
      'Import par IA depuis PDF/photo',
      'Menu du jour basique',
      'Support par email',
    ],
    cta: { label: 'Commencer avec Essentiel', href: '/signup?tier=essentiel' },
    highlighted: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'Pour fidéliser et soigner sa réputation',
    description:
      'La formule complète pour les restaurants qui veulent aller au-delà du menu et transformer chaque client en client fidèle.',
    priceMonthlyHt: 39,
    priceAnnualHt: 35.1,
    priceAnnualTotalHt: 421,
    features: [
      'Tout Essentiel, plus :',
      '🌟 Filtrage automatique des avis Google (5★ → Google, <5 → interne)',
      '💳 Cartes de fidélité Apple Wallet & Google Wallet',
      '🌍 3ème langue au choix (Allemand, Italien, Espagnol)',
      '📅 Menu du jour avancé avec composition guidée',
      '🎯 Promotions programmables avec dates de fin',
      '📊 Statistiques de scan et consultation',
      '💬 Support WhatsApp en heures ouvrées (9h-19h)',
    ],
    cta: { label: 'Essayer Pro 14 jours gratuitement', href: '/signup?tier=pro' },
    highlighted: true,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    tagline: 'Pour les groupes et chaînes',
    description:
      'Pour les exploitants de plusieurs établissements qui veulent une gestion centralisée et un accompagnement sur mesure.',
    priceMonthlyHt: null,
    priceAnnualHt: null,
    priceAnnualTotalHt: null,
    features: [
      'Tout Pro, plus :',
      '📍 Géolocalisation Wallet (notification automatique quand le client passe près du restaurant)',
      '🏢 Multi-établissements (un compte, plusieurs restaurants)',
      '🚀 Setup complet et formation par notre équipe',
      '⏰ Support prioritaire 7j/7',
      '🤝 Account manager dédié',
    ],
    cta: { label: 'Demander un devis', href: '/contact?sujet=premium' },
    highlighted: false,
  },
}

export function stripePriceEnvName(tier: Tier, cycle: BillingCycle): string | null {
  if (tier === 'premium') return null
  const key = `STRIPE_PRICE_ID_${tier.toUpperCase()}_${cycle.toUpperCase()}`
  return key
}

export function priceIdToTier(priceId: string): { tier: Tier; cycle: BillingCycle } | null {
  const map: Array<[string | undefined, Tier, BillingCycle]> = [
    [process.env.STRIPE_PRICE_ID_ESSENTIEL_MONTHLY, 'essentiel', 'monthly'],
    [process.env.STRIPE_PRICE_ID_ESSENTIEL_ANNUAL, 'essentiel', 'annual'],
    [process.env.STRIPE_PRICE_ID_PRO_MONTHLY, 'pro', 'monthly'],
    [process.env.STRIPE_PRICE_ID_PRO_ANNUAL, 'pro', 'annual'],
  ]
  for (const [env, tier, cycle] of map) {
    if (env && env === priceId) return { tier, cycle }
  }
  return null
}

export const LAUNCH_COUPON_ID = 'LANCEMENT_GENEVOIS'
// Stripe UI rejects decimal percent_off, so the live coupon is set to 38%.
// 39 × (1 - 0.38) = 24.18€/month locked price. Marketing pitch rounds to "24€".
export const LAUNCH_DISCOUNT_PERCENT = 38
export const LAUNCH_LOCKED_PRICE_HT = 24.18
