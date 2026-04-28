import { GoogleAuth } from 'google-auth-library'
import type { PassData } from './pass-design'

const WALLET_API = 'https://walletobjects.googleapis.com/walletobjects/v1'

function getAuth() {
  return new GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
  })
}

function hexColor(color: string): string {
  return color.startsWith('#') ? color : `#${color}`
}

// Google Wallet's heroImage/programLogo accept JPEG/PNG/GIF only.
// WebP uploads (our default) are silently dropped. Route through
// images.weserv.nl which converts on-the-fly at no cost.
function walletCompatImageUrl(url: string): string {
  if (!/\.webp(\?|$)/i.test(url)) return url
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=png`
}

function localized(value: string) {
  return {
    defaultValue: { language: 'fr', value },
    translatedValues: [
      { language: 'en', value },
      { language: 'de', value },
    ],
  }
}

function localizedTriple(fr: string, en: string, de: string) {
  return {
    defaultValue: { language: 'fr', value: fr },
    translatedValues: [
      { language: 'en', value: en },
      { language: 'de', value: de },
    ],
  }
}

function buildStampGrid(current: number, goal: number): string {
  const filled = Math.min(current, goal)
  const empty = goal - filled
  const stamps = [...Array(filled).fill('●'), ...Array(empty).fill('○')]
  const rows: string[] = []
  for (let i = 0; i < stamps.length; i += 5) {
    rows.push(stamps.slice(i, i + 5).join('  '))
  }
  return rows.join('\n')
}

function buildProgressBar(current: number, goal: number): string {
  const pct = Math.min(current / goal, 1)
  const filled = Math.round(pct * 10)
  const empty = 10 - filled
  return '█'.repeat(filled) + '░'.repeat(empty) + `  ${Math.round(pct * 100)}%`
}

function buildTextModules(data: PassData) {
  if (data.hasReward) {
    return [
      {
        id: 'reward_available',
        header: '🎁 RÉCOMPENSE DISPONIBLE',
        body: 'Montrez cette carte au restaurant pour récupérer votre récompense !',
        localizedHeader: localizedTriple(
          '🎁 RÉCOMPENSE DISPONIBLE',
          '🎁 REWARD AVAILABLE',
          '🎁 BELOHNUNG VERFÜGBAR',
        ),
        localizedBody: localizedTriple(
          'Montrez cette carte au restaurant pour récupérer votre récompense !',
          'Show this card at the restaurant to claim your reward!',
          'Zeigen Sie diese Karte im Restaurant, um Ihre Belohnung einzulösen!',
        ),
      },
    ]
  }

  const remaining = data.goalValue - data.currentValue

  if (data.programType === 'visits') {
    return [
      {
        id: 'stamps',
        header: 'TAMPONS',
        body: buildStampGrid(data.currentValue, data.goalValue),
        localizedHeader: localizedTriple('TAMPONS', 'STAMPS', 'STEMPEL'),
      },
      {
        id: 'remaining',
        header: 'IL MANQUE',
        body: remaining === 1
          ? '1 tampon avant la récompense'
          : `${remaining} tampons avant la récompense`,
        localizedHeader: localizedTriple('IL MANQUE', 'REMAINING', 'NOCH'),
        localizedBody: localizedTriple(
          remaining === 1 ? '1 tampon avant la récompense' : `${remaining} tampons avant la récompense`,
          remaining === 1 ? '1 stamp until reward' : `${remaining} stamps until reward`,
          remaining === 1 ? '1 Stempel bis zur Belohnung' : `${remaining} Stempel bis zur Belohnung`,
        ),
      },
    ]
  } else {
    const remainingEuros = (remaining / 100).toFixed(2)
    return [
      {
        id: 'progress',
        header: 'PROGRESSION',
        body: buildProgressBar(data.currentValue, data.goalValue),
        localizedHeader: localizedTriple('PROGRESSION', 'PROGRESS', 'FORTSCHRITT'),
      },
      {
        id: 'remaining',
        header: 'IL MANQUE',
        body: `${remainingEuros}€ avant la récompense`,
        localizedHeader: localizedTriple('IL MANQUE', 'REMAINING', 'NOCH'),
        localizedBody: localizedTriple(
          `${remainingEuros}€ avant la récompense`,
          `€${remainingEuros} until reward`,
          `${remainingEuros}€ bis zur Belohnung`,
        ),
      },
    ]
  }
}

function buildLoyaltyPoints(data: PassData) {
  if (data.programType === 'visits') {
    return {
      label: 'TAMPONS',
      localizedLabel: localizedTriple('TAMPONS', 'STAMPS', 'STEMPEL'),
      balance: { string: `${data.currentValue} / ${data.goalValue}` },
    }
  }
  return {
    label: 'TOTAL DÉPENSÉ',
    localizedLabel: localizedTriple('TOTAL DÉPENSÉ', 'TOTAL SPENT', 'GESAMTAUSGABEN'),
    balance: { string: `${(data.currentValue / 100).toFixed(2)}€` },
  }
}

function buildLinksModule(data: PassData) {
  const uris: Array<{ id: string; uri: string; description: string; localizedDescription: ReturnType<typeof localizedTriple> }> = []

  // Restaurant menu (always present)
  uris.push({
    id: 'menu',
    uri: `https://www.montablo.com/menu/${data.restaurantSlug}`,
    description: 'Voir le menu',
    localizedDescription: localizedTriple('Voir le menu', 'View menu', 'Speisekarte ansehen'),
  })

  // Maps directions (if GPS available + enabled)
  if (data.enableDirections && data.latitude !== null && data.longitude !== null) {
    const query = data.addressLine
      ? encodeURIComponent(`${data.addressLine}, ${data.postalCode ?? ''} ${data.city ?? ''}`.trim())
      : `${data.latitude},${data.longitude}`
    uris.push({
      id: 'directions',
      uri: `https://www.google.com/maps/search/?api=1&query=${query}`,
      description: 'Itinéraire',
      localizedDescription: localizedTriple('Itinéraire', 'Directions', 'Wegbeschreibung'),
    })
  }

  // Google review (if set + enabled)
  if (data.enableReview && data.googleReviewUrl) {
    uris.push({
      id: 'review',
      uri: data.googleReviewUrl,
      description: 'Laisser un avis',
      localizedDescription: localizedTriple('Laisser un avis', 'Leave a review', 'Bewertung abgeben'),
    })
  }

  // Custom website
  if (data.websiteUrl) {
    uris.push({
      id: 'website',
      uri: data.websiteUrl,
      description: 'Site web',
      localizedDescription: localizedTriple('Site web', 'Website', 'Webseite'),
    })
  }

  // Instagram
  if (data.instagramUrl) {
    uris.push({
      id: 'instagram',
      uri: data.instagramUrl,
      description: 'Instagram',
      localizedDescription: localizedTriple('Instagram', 'Instagram', 'Instagram'),
    })
  }

  // Facebook
  if (data.facebookUrl) {
    uris.push({
      id: 'facebook',
      uri: data.facebookUrl,
      description: 'Facebook',
      localizedDescription: localizedTriple('Facebook', 'Facebook', 'Facebook'),
    })
  }

  return uris.length > 0 ? { uris } : undefined
}

async function ensureLoyaltyClass(
  classId: string,
  data: PassData,
) {
  const auth = getAuth()
  const client = await auth.getClient()
  const token = await client.getAccessToken()

  const logoUri = walletCompatImageUrl(data.logoUrl ?? 'https://www.montablo.com/logo.png')
  const classBody: Record<string, unknown> = {
    id: classId,
    issuerName: data.restaurantName,
    localizedIssuerName: localized(data.restaurantName),
    programName: data.tagline,
    localizedProgramName: localized(data.tagline),
    programLogo: {
      sourceUri: { uri: logoUri },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    },
    hexBackgroundColor: hexColor(data.primaryColor),
    countryCode: 'FR',
    // Google API only accepts DRAFT or UNDER_REVIEW from issuers; backend
    // auto-promotes to APPROVED for approved issuer accounts.
    reviewStatus: 'UNDER_REVIEW',
    accountIdLabel: 'ID de membre',
    localizedAccountIdLabel: localizedTriple('ID de membre', 'Member ID', 'Mitgliedsnr.'),
    accountNameLabel: 'Nom de membre',
    localizedAccountNameLabel: localizedTriple('Nom de membre', 'Member name', 'Mitgliedsname'),
    multipleDevicesAndHoldersAllowedStatus: data.allowMultipleHolders
      ? 'MULTIPLE_HOLDERS'
      : 'ONE_USER_ALL_DEVICES',
  }

  if (data.enableUpdateNotifications) {
    classBody.notifyPreference = 'NOTIFY_ON_UPDATE'
  }

  if (data.wideLogoUrl) {
    classBody.wideProgramLogo = {
      sourceUri: { uri: walletCompatImageUrl(data.wideLogoUrl) },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    }
  }

  if (data.heroImageUrl) {
    classBody.heroImage = {
      sourceUri: { uri: walletCompatImageUrl(data.heroImageUrl) },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    }
  }

  // merchantLocations replaces deprecated `locations` field
  // and is the only way to trigger geo notifications.
  if (data.latitude !== null && data.longitude !== null) {
    classBody.merchantLocations = [
      {
        merchantName: data.restaurantName,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    ]
  }

  // Welcome message as textModuleData on the class
  if (data.welcomeMessageFr) {
    classBody.textModulesData = [
      {
        id: 'welcome',
        header: 'Bienvenue',
        body: data.welcomeMessageFr,
        localizedHeader: localizedTriple('Bienvenue', 'Welcome', 'Willkommen'),
        localizedBody: localizedTriple(
          data.welcomeMessageFr,
          data.welcomeMessageEn ?? data.welcomeMessageFr,
          data.welcomeMessageDe ?? data.welcomeMessageFr,
        ),
      },
    ]
  }

  const linksModuleData = buildLinksModule(data)
  if (linksModuleData) {
    classBody.linksModuleData = linksModuleData
  }

  const checkRes = await fetch(`${WALLET_API}/loyaltyClass/${classId}`, {
    headers: { Authorization: `Bearer ${token.token}` },
  })

  if (checkRes.status === 404) {
    const createRes = await fetch(`${WALLET_API}/loyaltyClass`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(classBody),
    })
    if (!createRes.ok) {
      const body = await createRes.text()
      throw new Error(`Failed to create loyalty class: ${createRes.status} ${body}`)
    }
  } else if (checkRes.ok) {
    const patchRes = await fetch(`${WALLET_API}/loyaltyClass/${classId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerName: classBody.issuerName,
        localizedIssuerName: classBody.localizedIssuerName,
        programName: classBody.programName,
        localizedProgramName: classBody.localizedProgramName,
        programLogo: classBody.programLogo,
        wideProgramLogo: classBody.wideProgramLogo ?? null,
        hexBackgroundColor: classBody.hexBackgroundColor,
        heroImage: classBody.heroImage ?? null,
        merchantLocations: classBody.merchantLocations ?? null,
        linksModuleData: classBody.linksModuleData ?? null,
        textModulesData: classBody.textModulesData ?? null,
        accountIdLabel: classBody.accountIdLabel,
        localizedAccountIdLabel: classBody.localizedAccountIdLabel,
        accountNameLabel: classBody.accountNameLabel,
        localizedAccountNameLabel: classBody.localizedAccountNameLabel,
        multipleDevicesAndHoldersAllowedStatus: classBody.multipleDevicesAndHoldersAllowedStatus,
        notifyPreference: classBody.notifyPreference ?? null,
        // Required when patching an already-approved class:
        // Google rejects edits unless we explicitly demote it for review.
        // The backend re-approves automatically since the issuer is approved.
        reviewStatus: 'UNDER_REVIEW',
      }),
    })
    if (!patchRes.ok) {
      const body = await patchRes.text()
      console.error('[google-wallet] class PATCH failed', classId, patchRes.status, body)
    }
  } else {
    const body = await checkRes.text()
    throw new Error(`Failed to check loyalty class: ${checkRes.status} ${body}`)
  }
}

export async function generateGoogleWalletUrl(
  data: PassData,
  programId: string,
): Promise<string> {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!
  const classId = `${issuerId}.program_${programId}`
  const objectId = `${issuerId}.card_${data.serialNumber}`

  await ensureLoyaltyClass(classId, data)

  const loyaltyObject = {
    id: objectId,
    classId,
    state: 'ACTIVE',
    accountId: data.shortCode,
    accountName: data.customerName,
    loyaltyPoints: buildLoyaltyPoints(data),
    secondaryLoyaltyPoints: {
      label: 'RÉCOMPENSE',
      localizedLabel: localizedTriple('RÉCOMPENSE', 'REWARD', 'BELOHNUNG'),
      balance: { string: data.rewardDescription },
    },
    textModulesData: buildTextModules(data),
    barcode: {
      type: 'QR_CODE',
      value: data.qrMessage,
      alternateText: data.shortCode,
    },
    hexBackgroundColor: hexColor(data.primaryColor),
  }

  const auth = getAuth()
  const client = await auth.getClient()
  const token = await client.getAccessToken()

  const checkRes = await fetch(`${WALLET_API}/loyaltyObject/${objectId}`, {
    headers: { Authorization: `Bearer ${token.token}` },
  })

  if (checkRes.status === 404) {
    const createRes = await fetch(`${WALLET_API}/loyaltyObject`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(loyaltyObject),
    })
    if (!createRes.ok) {
      const body = await createRes.text()
      throw new Error(`Failed to create loyalty object: ${createRes.status} ${body}`)
    }
  } else if (checkRes.ok) {
    // Update existing object with latest data
    await fetch(`${WALLET_API}/loyaltyObject/${objectId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId: data.shortCode,
        accountName: data.customerName,
        loyaltyPoints: buildLoyaltyPoints(data),
        secondaryLoyaltyPoints: loyaltyObject.secondaryLoyaltyPoints,
        textModulesData: buildTextModules(data),
        barcode: loyaltyObject.barcode,
        hexBackgroundColor: hexColor(data.primaryColor),
      }),
    })
  }

  const claims = {
    iss: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!).client_email,
    aud: 'google',
    typ: 'savetowallet',
    iat: Math.floor(Date.now() / 1000),
    payload: { loyaltyObjects: [{ id: objectId }] },
  }

  const { sign } = await import('jsonwebtoken')
  const privateKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!).private_key
  const token2 = sign(claims, privateKey, { algorithm: 'RS256' })

  return `https://pay.google.com/gp/v/save/${token2}`
}

export async function ensureLoyaltyClassForResync(
  programId: string,
  data: PassData,
): Promise<void> {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!
  const classId = `${issuerId}.program_${programId}`
  await ensureLoyaltyClass(classId, data)
}

export async function updateGoogleWalletCard(data: PassData): Promise<void> {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!
  const objectId = `${issuerId}.card_${data.serialNumber}`

  const auth = getAuth()
  const client = await auth.getClient()
  const token = await client.getAccessToken()

  await fetch(`${WALLET_API}/loyaltyObject/${objectId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      loyaltyPoints: buildLoyaltyPoints(data),
      textModulesData: buildTextModules(data),
    }),
  })
}
