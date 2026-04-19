import { GoogleAuth } from 'google-auth-library'
import type { PassData } from './pass-design'

const WALLET_API = 'https://walletobjects.googleapis.com/walletobjects/v1'

function getAuth() {
  return new GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
  })
}

async function ensureLoyaltyClass(classId: string, restaurantName: string, rewardDescription: string) {
  const auth = getAuth()
  const client = await auth.getClient()
  const token = await client.getAccessToken()

  const checkRes = await fetch(`${WALLET_API}/loyaltyClass/${classId}`, {
    headers: { Authorization: `Bearer ${token.token}` },
  })

  if (checkRes.status === 404) {
    await fetch(`${WALLET_API}/loyaltyClass`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: classId,
        issuerName: restaurantName,
        programName: rewardDescription,
        programLogo: {
          sourceUri: { uri: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png` },
          contentDescription: { defaultValue: { language: 'fr', value: restaurantName } },
        },
        reviewStatus: 'UNDER_REVIEW',
      }),
    })
  }
}

export async function generateGoogleWalletUrl(
  data: PassData,
  programId: string,
): Promise<string> {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!
  const classId = `${issuerId}.program_${programId}`
  const objectId = `${issuerId}.card_${data.serialNumber}`

  await ensureLoyaltyClass(classId, data.restaurantName, data.rewardDescription)

  const loyaltyObject = {
    id: objectId,
    classId,
    state: 'ACTIVE',
    accountId: data.serialNumber,
    accountName: data.customerName,
    loyaltyPoints: {
      label: data.progressLabel,
      balance: {
        string: data.progressValue,
      },
    },
    barcode: {
      type: 'QR_CODE',
      value: data.qrMessage,
    },
  }

  const auth = getAuth()
  const client = await auth.getClient()
  const serviceAccountEmail = (auth as any)._cachedProjectId ?? ''

  // Create the object if it doesn't exist
  const token = await client.getAccessToken()
  const checkRes = await fetch(`${WALLET_API}/loyaltyObject/${objectId}`, {
    headers: { Authorization: `Bearer ${token.token}` },
  })
  if (checkRes.status === 404) {
    await fetch(`${WALLET_API}/loyaltyObject`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loyaltyObject),
    })
  }

  // Generate a signed JWT save URL
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

export async function updateGoogleWalletCard(data: PassData): Promise<void> {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!
  const objectId = `${issuerId}.card_${data.serialNumber}`

  const auth = getAuth()
  const client = await auth.getClient()
  const token = await client.getAccessToken()

  await fetch(`${WALLET_API}/loyaltyObject/${objectId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      loyaltyPoints: {
        label: data.progressLabel,
        balance: { string: data.progressValue },
      },
    }),
  })
}
