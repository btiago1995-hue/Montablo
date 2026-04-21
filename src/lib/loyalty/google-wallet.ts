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
        header: '🎁 RÉCOMPENSE DISPONIBLE',
        body: 'Montrez cette carte au restaurant pour récupérer votre récompense !',
      },
    ]
  }

  const remaining = data.goalValue - data.currentValue

  if (data.programType === 'visits') {
    return [
      {
        header: 'TAMPONS',
        body: buildStampGrid(data.currentValue, data.goalValue),
      },
      {
        header: 'IL MANQUE',
        body: remaining === 1
          ? '1 tampon avant la récompense'
          : `${remaining} tampons avant la récompense`,
      },
    ]
  } else {
    const remainingEuros = (remaining / 100).toFixed(2)
    return [
      {
        header: 'PROGRESSION',
        body: buildProgressBar(data.currentValue, data.goalValue),
      },
      {
        header: 'IL MANQUE',
        body: `${remainingEuros}€ avant la récompense`,
      },
    ]
  }
}

function buildLoyaltyPoints(data: PassData) {
  if (data.programType === 'visits') {
    return {
      label: 'TAMPONS',
      balance: { string: `${data.currentValue} / ${data.goalValue}` },
    }
  }
  return {
    label: 'TOTAL DÉPENSÉ',
    balance: { string: `${(data.currentValue / 100).toFixed(2)}€` },
  }
}

async function ensureLoyaltyClass(
  classId: string,
  data: PassData,
) {
  const auth = getAuth()
  const client = await auth.getClient()
  const token = await client.getAccessToken()

  const logoUri = data.logoUrl ?? 'https://www.montablo.com/logo.png'
  const classBody: Record<string, unknown> = {
    id: classId,
    issuerName: data.restaurantName,
    programName: data.tagline,
    programLogo: {
      sourceUri: { uri: logoUri },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    },
    hexBackgroundColor: hexColor(data.primaryColor),
    reviewStatus: 'UNDER_REVIEW',
  }

  if (data.heroImageUrl) {
    classBody.heroImage = {
      sourceUri: { uri: data.heroImageUrl },
      contentDescription: { defaultValue: { language: 'fr', value: data.restaurantName } },
    }
  }

  if (data.latitude !== null && data.longitude !== null) {
    classBody.locations = [{ latitude: data.latitude, longitude: data.longitude }]
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
    await fetch(`${WALLET_API}/loyaltyClass/${classId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        issuerName: classBody.issuerName,
        programName: classBody.programName,
        programLogo: classBody.programLogo,
        hexBackgroundColor: classBody.hexBackgroundColor,
        heroImage: classBody.heroImage ?? null,
        locations: classBody.locations ?? null,
      }),
    })
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
    accountId: data.serialNumber,
    accountName: data.customerName,
    loyaltyPoints: buildLoyaltyPoints(data),
    secondaryLoyaltyPoints: {
      label: 'RÉCOMPENSE',
      balance: { string: data.rewardDescription },
    },
    textModulesData: buildTextModules(data),
    barcode: {
      type: 'QR_CODE',
      value: data.qrMessage,
      alternateText: 'Scanner la carte',
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
        loyaltyPoints: buildLoyaltyPoints(data),
        secondaryLoyaltyPoints: loyaltyObject.secondaryLoyaltyPoints,
        textModulesData: buildTextModules(data),
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
