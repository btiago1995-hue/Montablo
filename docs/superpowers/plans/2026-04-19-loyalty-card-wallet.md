# Loyalty Card — Apple Wallet & Google Wallet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a digital loyalty card system where restaurant owners configure reward programs, register customers, and send branded Apple Wallet / Google Wallet cards via email — eliminating physical loyalty cards.

**Architecture:** `passkit-generator` (npm) generates `.pkpass` files for Apple Wallet; Google Wallet REST API generates save-to-wallet URLs. All pass generation happens in Next.js API routes. Supabase stores programs, cards, stamps, and Apple push registrations. Resend sends the card email. The restaurant's QR scanner page adds stamps which push updates to Apple Wallet automatically.

**Tech Stack:** Next.js 14 API routes, passkit-generator, Google Wallet REST API, Supabase (admin client), Resend, APNs (Apple Push Notification service for pass updates), Tailwind CSS, Lucide icons.

---

## File Map

### New files
| File | Responsibility |
|---|---|
| `src/lib/loyalty/pass-design.ts` | Build pass visual config from restaurant + card data |
| `src/lib/loyalty/apple-wallet.ts` | Generate `.pkpass` buffer using passkit-generator |
| `src/lib/loyalty/google-wallet.ts` | Generate Google Wallet JWT save URL |
| `src/lib/loyalty/email.ts` | Resend email with Apple + Google Wallet buttons |
| `src/lib/loyalty/apple-wallet-model/pass.json` | Apple Wallet pass template (bundled with app) |
| `src/lib/loyalty/apple-wallet-model/icon.png` | 87×87 pass icon (placeholder — replace with real) |
| `src/lib/loyalty/apple-wallet-model/icon@2x.png` | 174×174 pass icon |
| `src/app/api/loyalty/cards/route.ts` | POST — create card, generate passes, send email |
| `src/app/api/loyalty/cards/[id]/apple/route.ts` | GET — serve `.pkpass` for download |
| `src/app/api/loyalty/cards/[id]/google/route.ts` | GET — redirect to Google Wallet save URL |
| `src/app/api/loyalty/cards/[id]/stamp/route.ts` | POST — add stamp, trigger Apple push update |
| `src/app/api/loyalty/cards/[id]/redeem/route.ts` | POST — redeem reward, reset counter |
| `src/app/api/loyalty/passes/apple/v1/devices/[deviceId]/registrations/[passTypeId]/[serial]/route.ts` | POST/DELETE — Apple device registration |
| `src/app/api/loyalty/passes/apple/v1/passes/[passTypeId]/[serial]/route.ts` | GET — serve updated pass to Apple |
| `src/app/dashboard/loyalty/page.tsx` | Loyalty overview (server component) |
| `src/app/dashboard/loyalty/setup/page.tsx` | Configure program + card design (server) |
| `src/app/dashboard/loyalty/customers/page.tsx` | Customer list (server) |
| `src/app/dashboard/loyalty/customers/new/page.tsx` | Register new customer (server) |
| `src/app/dashboard/loyalty/scan/page.tsx` | QR scanner — add stamps (server + mobile) |
| `src/components/dashboard/loyalty-setup.tsx` | Setup form client component |
| `src/components/dashboard/loyalty-customers.tsx` | Customer list + redeem client component |
| `src/components/dashboard/loyalty-new-customer.tsx` | Register customer form client component |
| `src/components/dashboard/loyalty-scan.tsx` | QR scanner client component |

### Modified files
| File | Change |
|---|---|
| `src/types/database.ts` | Add `LoyaltyProgram`, `LoyaltyCard`, `LoyaltyStamp`, `LoyaltyDeviceRegistration` types |
| `src/components/dashboard/sidebar.tsx` | Add loyalty nav item to gestionItems |

---

## Task 1: Install dependencies

**Files:** `package.json`

- [ ] **Step 1: Install packages**

```bash
cd /Users/tiago/Montablo && npm install passkit-generator google-auth-library
```

- [ ] **Step 2: Verify install**

```bash
node -e "require('passkit-generator'); console.log('ok')"
```
Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install passkit-generator and google-auth-library"
```

---

## Task 2: TypeScript types

**Files:**
- Modify: `src/types/database.ts`

- [ ] **Step 1: Add loyalty types at the end of `src/types/database.ts`**

```typescript
export type LoyaltyProgram = {
  id: string
  restaurant_id: string
  type: 'visits' | 'spend'
  goal: number // visits: count | spend: cents (e.g. 5000 = 50€)
  reward_description: string
  card_tagline: string | null
  is_active: boolean
  created_at: string
}

export type LoyaltyCard = {
  id: string
  program_id: string
  restaurant_id: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  current_value: number // visits: count | spend: cents
  total_redeemed: number
  apple_pass_serial: string | null
  apple_auth_token: string | null
  google_pass_id: string | null
  created_at: string
}

export type LoyaltyStamp = {
  id: string
  card_id: string
  amount: number // 1 for visits, cents for spend
  added_by: string | null
  created_at: string
}

export type LoyaltyDeviceRegistration = {
  id: string
  card_id: string
  device_library_id: string
  push_token: string
  pass_type_id: string
  created_at: string
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/types/database.ts
git commit -m "feat: add loyalty TypeScript types"
```

---

## Task 3: Database migration

Apply via Supabase MCP tool (`mcp__supabase__apply_migration`). Use this SQL:

```sql
-- One loyalty program per restaurant
CREATE TABLE loyalty_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('visits', 'spend')),
  goal INTEGER NOT NULL,
  reward_description TEXT NOT NULL,
  card_tagline TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurant_id)
);

-- One card per customer per restaurant
CREATE TABLE loyalty_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES loyalty_programs(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  current_value INTEGER DEFAULT 0,
  total_redeemed INTEGER DEFAULT 0,
  apple_pass_serial TEXT UNIQUE,
  apple_auth_token TEXT,
  google_pass_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit trail of stamps
CREATE TABLE loyalty_stamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES loyalty_cards(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 1,
  added_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Apple Wallet push registrations
CREATE TABLE loyalty_device_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES loyalty_cards(id) ON DELETE CASCADE,
  device_library_id TEXT NOT NULL,
  push_token TEXT NOT NULL,
  pass_type_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(device_library_id, card_id)
);

-- RLS policies
ALTER TABLE loyalty_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_device_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owners manage their loyalty_programs"
  ON loyalty_programs FOR ALL
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));

CREATE POLICY "owners manage their loyalty_cards"
  ON loyalty_cards FOR ALL
  USING (restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid()));

CREATE POLICY "owners manage their loyalty_stamps"
  ON loyalty_stamps FOR ALL
  USING (card_id IN (
    SELECT lc.id FROM loyalty_cards lc
    JOIN restaurants r ON r.id = lc.restaurant_id
    WHERE r.owner_id = auth.uid()
  ));
```

- [ ] **Step 1: Apply migration via Supabase MCP**

Use `mcp__supabase__apply_migration` with the SQL above. Migration name: `loyalty_tables`.

- [ ] **Step 2: Verify tables exist**

Use `mcp__supabase__execute_sql`:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name LIKE 'loyalty%';
```
Expected: 4 rows — `loyalty_programs`, `loyalty_cards`, `loyalty_stamps`, `loyalty_device_registrations`

---

## Task 4: Apple Wallet model files

Apple Wallet requires template files bundled with the app. These go in `src/lib/loyalty/apple-wallet-model/`.

**Files:**
- Create: `src/lib/loyalty/apple-wallet-model/pass.json`
- Create: `src/lib/loyalty/apple-wallet-model/icon.png` (placeholder — 87×87 px)
- Create: `src/lib/loyalty/apple-wallet-model/icon@2x.png` (placeholder — 174×174 px)

- [ ] **Step 1: Create the directory**

```bash
mkdir -p /Users/tiago/Montablo/src/lib/loyalty/apple-wallet-model
```

- [ ] **Step 2: Create `src/lib/loyalty/apple-wallet-model/pass.json`**

```json
{
  "formatVersion": 1,
  "passTypeIdentifier": "pass.com.montablo.loyalty",
  "teamIdentifier": "REPLACE_WITH_TEAM_ID",
  "organizationName": "MonTablo",
  "description": "Carte de fidélité",
  "backgroundColor": "rgb(26, 26, 26)",
  "foregroundColor": "rgb(255, 255, 255)",
  "labelColor": "rgb(170, 170, 170)",
  "storeCard": {
    "primaryFields": [
      {
        "key": "progress",
        "label": "PROGRESSION",
        "value": "0 / 10"
      }
    ],
    "secondaryFields": [
      {
        "key": "reward",
        "label": "RÉCOMPENSE",
        "value": ""
      }
    ],
    "auxiliaryFields": [
      {
        "key": "tagline",
        "label": "",
        "value": ""
      }
    ],
    "backFields": [
      {
        "key": "customer",
        "label": "CLIENT",
        "value": ""
      },
      {
        "key": "restaurant",
        "label": "RESTAURANT",
        "value": ""
      }
    ]
  },
  "barcode": {
    "message": "",
    "format": "PKBarcodeFormatQR",
    "messageEncoding": "iso-8859-1"
  },
  "barcodes": [
    {
      "message": "",
      "format": "PKBarcodeFormatQR",
      "messageEncoding": "iso-8859-1"
    }
  ]
}
```

> **Important:** Replace `REPLACE_WITH_TEAM_ID` with your actual Apple Team ID from developer.apple.com. Also replace `pass.com.montablo.loyalty` with the Pass Type ID you create in the Apple Developer portal.

- [ ] **Step 3: Create placeholder icon files**

The icon files must exist for passkit-generator to work. Create 87×87 and 174×174 PNG placeholders. You can use any image editor or online tool to create a simple 87×87 dark square PNG and save it as `icon.png`, and 174×174 as `icon@2x.png`.

For the real app, use the MonTablo logo exported as PNG at these sizes.

- [ ] **Step 4: Add model directory to Next.js output file tracing**

Add to `next.config.js` (or `next.config.ts` if it exists):

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config ...
  outputFileTracingIncludes: {
    '/api/loyalty/**': ['./src/lib/loyalty/apple-wallet-model/**'],
  },
}
module.exports = nextConfig
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/loyalty/apple-wallet-model/ next.config.js
git commit -m "feat: add Apple Wallet pass template files"
```

---

## Task 5: pass-design.ts — build pass data

**Files:**
- Create: `src/lib/loyalty/pass-design.ts`

- [ ] **Step 1: Create `src/lib/loyalty/pass-design.ts`**

```typescript
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
  let progressValue: string

  if (program.type === 'visits') {
    progressLabel = `${card.current_value} / ${program.goal} visites`
    progressValue = hasReward ? '🎁 Récompense disponible!' : progressLabel
  } else {
    const current = (card.current_value / 100).toFixed(2)
    const goal = (program.goal / 100).toFixed(2)
    progressLabel = `${current}€ / ${goal}€`
    progressValue = hasReward ? '🎁 Récompense disponible!' : progressLabel
  }

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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/loyalty/pass-design.ts
git commit -m "feat: add loyalty pass-design helper"
```

---

## Task 6: apple-wallet.ts — generate .pkpass

**Files:**
- Create: `src/lib/loyalty/apple-wallet.ts`

**Required environment variables (add to `.env.local` and Vercel):**
```
APPLE_PASS_TYPE_ID=pass.com.montablo.loyalty
APPLE_TEAM_ID=XXXXXXXXXX
APPLE_WWDR_CERT_BASE64=<base64 of Apple WWDR G4 certificate PEM>
APPLE_PASS_CERT_BASE64=<base64 of your Pass Type certificate PEM>
APPLE_PASS_KEY_BASE64=<base64 of your pass private key PEM>
APPLE_PASS_KEY_PASSPHRASE=<optional passphrase for the key>
NEXT_PUBLIC_APP_URL=https://www.montablo.com
```

To get these values:
1. In Apple Developer Portal, create a Pass Type ID (`pass.com.montablo.loyalty`)
2. Generate a Pass Type ID certificate, download it, export as .p12
3. Convert to PEM: `openssl pkcs12 -in certificate.p12 -clcerts -nokeys -out pass_cert.pem`
4. Extract key: `openssl pkcs12 -in certificate.p12 -nocerts -out pass_key.pem`
5. Download WWDR G4 certificate from Apple: https://www.apple.com/certificateauthority/ (Apple Worldwide Developer Relations Certification Authority — G4)
6. Base64 encode each: `base64 -i pass_cert.pem | tr -d '\n'`

- [ ] **Step 1: Create `src/lib/loyalty/apple-wallet.ts`**

```typescript
import path from 'path'
import { PKPass } from 'passkit-generator'
import type { PassData } from './pass-design'

export async function generateApplePass(data: PassData): Promise<Buffer> {
  const modelDir = path.join(process.cwd(), 'src/lib/loyalty/apple-wallet-model')

  const pass = await PKPass.from(
    {
      model: modelDir,
      certificates: {
        wwdr: Buffer.from(process.env.APPLE_WWDR_CERT_BASE64!, 'base64').toString('utf8'),
        signerCert: Buffer.from(process.env.APPLE_PASS_CERT_BASE64!, 'base64').toString('utf8'),
        signerKey: Buffer.from(process.env.APPLE_PASS_KEY_BASE64!, 'base64').toString('utf8'),
        signerKeyPassphrase: process.env.APPLE_PASS_KEY_PASSPHRASE,
      },
    },
    {
      serialNumber: data.serialNumber,
      authenticationToken: data.authToken,
      webServiceURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/loyalty/passes/apple`,
      backgroundColor: data.backgroundColor,
      foregroundColor: data.foregroundColor,
    },
  )

  pass.type = 'storeCard'

  pass.primaryFields.push({
    key: 'progress',
    label: data.progressLabel,
    value: data.progressValue,
  })

  pass.secondaryFields.push({
    key: 'reward',
    label: 'RÉCOMPENSE',
    value: data.rewardDescription,
  })

  if (data.tagline) {
    pass.auxiliaryFields.push({
      key: 'tagline',
      label: '',
      value: data.tagline,
    })
  }

  pass.backFields.push(
    { key: 'customer', label: 'CLIENT', value: data.customerName },
    { key: 'restaurant', label: 'RESTAURANT', value: data.restaurantName },
  )

  pass.setBarcodes(data.qrMessage)

  const buffer = pass.getAsBuffer()
  return buffer
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/loyalty/apple-wallet.ts
git commit -m "feat: add Apple Wallet .pkpass generator"
```

---

## Task 7: google-wallet.ts — generate save URL

**Files:**
- Create: `src/lib/loyalty/google-wallet.ts`

**Required environment variables:**
```
GOOGLE_WALLET_ISSUER_ID=<your issuer ID from Google Pay & Wallet Console>
GOOGLE_SERVICE_ACCOUNT_KEY=<JSON string of service account credentials>
```

To get these:
1. Go to Google Pay & Wallet Console: https://pay.google.com/business/console
2. Enable the Google Wallet API in Google Cloud Console
3. Create an Issuer account, note the Issuer ID
4. Create a service account in Google Cloud IAM, grant it "Google Wallet Object Issuer" role
5. Download the service account JSON key

- [ ] **Step 1: Create `src/lib/loyalty/google-wallet.ts`**

```typescript
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
```

- [ ] **Step 2: Install jsonwebtoken (needed for Google Wallet JWT signing)**

```bash
npm install jsonwebtoken && npm install --save-dev @types/jsonwebtoken
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/loyalty/google-wallet.ts package.json package-lock.json
git commit -m "feat: add Google Wallet JWT generator"
```

---

## Task 8: loyalty email template

**Files:**
- Create: `src/lib/loyalty/email.ts`

- [ ] **Step 1: Create `src/lib/loyalty/email.ts`**

```typescript
import { getResend, EMAIL_FROM } from '@/lib/resend'

export async function sendLoyaltyCardEmail({
  to,
  customerName,
  restaurantName,
  cardId,
  appUrl,
}: {
  to: string
  customerName: string
  restaurantName: string
  cardId: string
  appUrl: string
}) {
  const appleUrl = `${appUrl}/api/loyalty/cards/${cardId}/apple`
  const googleUrl = `${appUrl}/api/loyalty/cards/${cardId}/google`

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F5F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:480px;margin:0 auto;padding:32px 16px">
    <div style="background:#2C3E2D;border-radius:16px;padding:32px;margin-bottom:24px;text-align:center">
      <h1 style="color:white;font-size:28px;margin:0 0 8px">MonTablo</h1>
      <p style="color:rgba(255,255,255,0.6);margin:0;font-size:14px">Carte de fidélité digitale</p>
    </div>
    <div style="background:white;border-radius:16px;padding:32px;margin-bottom:24px">
      <h2 style="color:#1a1a1a;font-size:20px;margin:0 0 8px">Bonjour ${customerName},</h2>
      <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 24px">
        <strong>${restaurantName}</strong> vous offre votre carte de fidélité digitale.
        Plus besoin de carte papier — elle est toujours dans votre téléphone.
      </p>
      <a href="${appleUrl}" style="display:block;background:#000;color:white;text-decoration:none;border-radius:10px;padding:14px 24px;text-align:center;font-size:15px;font-weight:600;margin-bottom:12px">
        🍎 Ajouter à Apple Wallet
      </a>
      <a href="${googleUrl}" style="display:block;background:#1a73e8;color:white;text-decoration:none;border-radius:10px;padding:14px 24px;text-align:center;font-size:15px;font-weight:600">
        🟢 Ajouter à Google Wallet
      </a>
    </div>
    <p style="color:#999;font-size:12px;text-align:center;margin:0">
      Powered by <a href="https://www.montablo.com" style="color:#2C3E2D">MonTablo</a>
    </p>
  </div>
</body>
</html>`

  await getResend().emails.send({
    from: EMAIL_FROM,
    to,
    subject: `Votre carte de fidélité ${restaurantName}`,
    html,
  })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/loyalty/email.ts
git commit -m "feat: add loyalty card email template"
```

---

## Task 9: POST /api/loyalty/cards — create card

**Files:**
- Create: `src/app/api/loyalty/cards/route.ts`

- [ ] **Step 1: Create `src/app/api/loyalty/cards/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { sendLoyaltyCardEmail } from '@/lib/loyalty/email'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })

  const body = await request.json()
  const { customerName, customerEmail, customerPhone } = body

  if (!customerName || !customerEmail) {
    return NextResponse.json({ error: 'customerName and customerEmail required' }, { status: 400 })
  }

  const admin = createAdminClient()
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  // Get loyalty program
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .eq('is_active', true)
    .single()

  if (!program) {
    return NextResponse.json({ error: 'No active loyalty program' }, { status: 404 })
  }

  // Create card
  const authToken = randomUUID().replace(/-/g, '')
  const { data: card, error } = await admin
    .from('loyalty_cards')
    .insert({
      program_id: program.id,
      restaurant_id: restaurant.id,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone ?? null,
      apple_auth_token: authToken,
    })
    .select('*')
    .single()

  if (error || !card) {
    return NextResponse.json({ error: 'Failed to create card' }, { status: 500 })
  }

  // Update apple_pass_serial to match card id
  await admin
    .from('loyalty_cards')
    .update({ apple_pass_serial: card.id })
    .eq('id', card.id)

  // Send email
  await sendLoyaltyCardEmail({
    to: customerEmail,
    customerName,
    restaurantName: restaurant.name,
    cardId: card.id,
    appUrl,
  }).catch(console.error)

  return NextResponse.json({ id: card.id }, { status: 201 })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/loyalty/cards/route.ts
git commit -m "feat: add POST /api/loyalty/cards"
```

---

## Task 10: GET /api/loyalty/cards/[id]/apple — serve .pkpass

**Files:**
- Create: `src/app/api/loyalty/cards/[id]/apple/route.ts`

- [ ] **Step 1: Create `src/app/api/loyalty/cards/[id]/apple/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateApplePass } from '@/lib/loyalty/apple-wallet'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('id', params.id)
    .single()

  if (!card) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const program = (card as any).loyalty_programs
  const passData = buildPassData(restaurant, program, card)

  const buffer = await generateApplePass(passData)

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.apple.pkpass',
      'Content-Disposition': `attachment; filename="${restaurant.slug}-loyalty.pkpass"`,
    },
  })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/loyalty/cards/[id]/apple/route.ts
git commit -m "feat: add GET /api/loyalty/cards/[id]/apple"
```

---

## Task 11: GET /api/loyalty/cards/[id]/google — redirect to Google Wallet

**Files:**
- Create: `src/app/api/loyalty/cards/[id]/google/route.ts`

- [ ] **Step 1: Create `src/app/api/loyalty/cards/[id]/google/route.ts`**

```typescript
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateGoogleWalletUrl } from '@/lib/loyalty/google-wallet'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('id', params.id)
    .single()

  if (!card) return new Response('Not found', { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return new Response('Not found', { status: 404 })

  const program = (card as any).loyalty_programs
  const passData = buildPassData(restaurant, program, card)

  const saveUrl = await generateGoogleWalletUrl(passData, program.id)
  redirect(saveUrl)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/loyalty/cards/[id]/google/route.ts
git commit -m "feat: add GET /api/loyalty/cards/[id]/google"
```

---

## Task 12: POST /api/loyalty/cards/[id]/stamp — add stamp

**Files:**
- Create: `src/app/api/loyalty/cards/[id]/stamp/route.ts`

- [ ] **Step 1: Create `src/app/api/loyalty/cards/[id]/stamp/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData, type PassData } from '@/lib/loyalty/pass-design'
import { generateApplePass } from '@/lib/loyalty/apple-wallet'
import { updateGoogleWalletCard } from '@/lib/loyalty/google-wallet'

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const amount: number = body.amount ?? 1 // 1 visit or amount in cents

  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('id', params.id)
    .single()

  if (!card) return NextResponse.json({ error: 'Card not found' }, { status: 404 })

  // Verify the card belongs to a restaurant owned by this user
  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const program = (card as any).loyalty_programs
  const newValue = card.current_value + amount

  // Record stamp
  await admin.from('loyalty_stamps').insert({
    card_id: card.id,
    amount,
    added_by: user.id,
  })

  // Update card value
  await admin
    .from('loyalty_cards')
    .update({ current_value: newValue })
    .eq('id', card.id)

  const updatedCard = { ...card, current_value: newValue }
  const passData = buildPassData(restaurant, program, updatedCard)

  // Push Apple Wallet update
  await pushAppleWalletUpdate(card.id, passData, admin).catch(console.error)

  // Update Google Wallet
  await updateGoogleWalletCard(passData).catch(console.error)

  return NextResponse.json({ current_value: newValue })
}

async function pushAppleWalletUpdate(
  cardId: string,
  passData: PassData,
  admin: ReturnType<typeof createAdminClient>,
) {
  const { data: registrations } = await admin
    .from('loyalty_device_registrations')
    .select('push_token')
    .eq('card_id', cardId)

  if (!registrations?.length) return

  // Send APNs push notification to each registered device
  for (const reg of registrations) {
    await sendApnsPush(reg.push_token)
  }
}

async function sendApnsPush(pushToken: string) {
  // APNs uses HTTP/2 with the pass certificate. Install: npm install @parse/node-apn
  // For V1, this stub means Apple Wallet updates on next open (not instantly).
  // To enable instant updates, replace this with a real APNs HTTP/2 request:
  // POST https://api.push.apple.com/3/device/{pushToken}
  // Headers: apns-topic = APPLE_PASS_TYPE_ID, apns-push-type = background
  // Body: {} (empty payload for pass updates)
  console.log('[APNs] TODO: send push to:', pushToken)
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors (there may be a warning about the import at the bottom — move it to the top if needed)

- [ ] **Step 3: Fix import order** — move `import type { PassData }` to the top of the file, just after the other imports.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/loyalty/cards/[id]/stamp/route.ts
git commit -m "feat: add POST /api/loyalty/cards/[id]/stamp"
```

---

## Task 13: POST /api/loyalty/cards/[id]/redeem — redeem reward

**Files:**
- Create: `src/app/api/loyalty/cards/[id]/redeem/route.ts`

- [ ] **Step 1: Create `src/app/api/loyalty/cards/[id]/redeem/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { updateGoogleWalletCard } from '@/lib/loyalty/google-wallet'

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('id', params.id)
    .single()

  if (!card) return NextResponse.json({ error: 'Card not found' }, { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const program = (card as any).loyalty_programs

  if (card.current_value < program.goal) {
    return NextResponse.json({ error: 'Reward not yet reached' }, { status: 400 })
  }

  await admin
    .from('loyalty_cards')
    .update({
      current_value: 0,
      total_redeemed: card.total_redeemed + 1,
    })
    .eq('id', card.id)

  const updatedCard = { ...card, current_value: 0, total_redeemed: card.total_redeemed + 1 }
  const passData = buildPassData(restaurant, program, updatedCard)

  await updateGoogleWalletCard(passData).catch(console.error)

  return NextResponse.json({ total_redeemed: updatedCard.total_redeemed })
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/api/loyalty/cards/[id]/redeem/route.ts
git commit -m "feat: add POST /api/loyalty/cards/[id]/redeem"
```

---

## Task 14: Apple PassKit Web Service routes

Apple Wallet calls these routes automatically to register devices and fetch updated passes.

**Files:**
- Create: `src/app/api/loyalty/passes/apple/v1/devices/[deviceId]/registrations/[passTypeId]/[serial]/route.ts`
- Create: `src/app/api/loyalty/passes/apple/v1/passes/[passTypeId]/[serial]/route.ts`

- [ ] **Step 1: Create device registration route**

Create `src/app/api/loyalty/passes/apple/v1/devices/[deviceId]/registrations/[passTypeId]/[serial]/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { headers } from 'next/headers'

type Params = { deviceId: string; passTypeId: string; serial: string }

export async function POST(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('id')
    .eq('apple_pass_serial', params.serial)
    .eq('apple_auth_token', token)
    .single()

  if (!card) return new Response(null, { status: 401 })

  const body = await _req.json()
  const { pushToken } = body

  const { error } = await admin
    .from('loyalty_device_registrations')
    .upsert({
      card_id: card.id,
      device_library_id: params.deviceId,
      push_token: pushToken,
      pass_type_id: params.passTypeId,
    }, { onConflict: 'device_library_id,card_id' })

  if (error) return new Response(null, { status: 500 })
  return new Response(null, { status: 201 })
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  await admin
    .from('loyalty_device_registrations')
    .delete()
    .eq('device_library_id', params.deviceId)

  return new Response(null, { status: 200 })
}
```

- [ ] **Step 2: Create get-updated-pass route**

Create `src/app/api/loyalty/passes/apple/v1/passes/[passTypeId]/[serial]/route.ts`:

```typescript
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateApplePass } from '@/lib/loyalty/apple-wallet'
import { headers } from 'next/headers'

type Params = { passTypeId: string; serial: string }

export async function GET(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('apple_pass_serial', params.serial)
    .eq('apple_auth_token', token)
    .single()

  if (!card) return new Response(null, { status: 401 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return new Response(null, { status: 404 })

  const program = (card as any).loyalty_programs
  const passData = buildPassData(restaurant, program, card)
  const buffer = await generateApplePass(passData)

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.apple.pkpass',
      'Last-Modified': new Date().toUTCString(),
    },
  })
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/api/loyalty/passes/
git commit -m "feat: add Apple PassKit Web Service routes"
```

---

## Task 15: Update sidebar navigation

**Files:**
- Modify: `src/components/dashboard/sidebar.tsx`

- [ ] **Step 1: Add Gift icon import and loyalty nav item to `src/components/dashboard/sidebar.tsx`**

Add `Gift` to the lucide-react import:
```typescript
import {
  LayoutDashboard,
  FileText,
  Star,
  CalendarDays,
  QrCode,
  Settings,
  LogOut,
  Menu,
  X,
  Gift,
} from 'lucide-react'
```

Add loyalty to `gestionItems` array:
```typescript
const gestionItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/menu', label: 'Mon menu', icon: FileText },
  { href: '/dashboard/promotions', label: 'Promotions', icon: Star },
  { href: '/dashboard/daily-menu', label: 'Menu du jour', icon: CalendarDays },
  { href: '/dashboard/loyalty', label: 'Fidélité', icon: Gift },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/sidebar.tsx
git commit -m "feat: add loyalty nav item to sidebar"
```

---

## Task 16: /dashboard/loyalty/setup — configure program

**Files:**
- Create: `src/app/dashboard/loyalty/setup/page.tsx`
- Create: `src/components/dashboard/loyalty-setup.tsx`

- [ ] **Step 1: Create `src/components/dashboard/loyalty-setup.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { LoyaltyProgram } from '@/types/database'

type Props = {
  restaurantId: string
  existing: LoyaltyProgram | null
}

export function LoyaltySetup({ restaurantId, existing }: Props) {
  const router = useRouter()
  const [type, setType] = useState<'visits' | 'spend'>(existing?.type ?? 'visits')
  const [goal, setGoal] = useState(
    existing
      ? existing.type === 'spend'
        ? String(existing.goal / 100)
        : String(existing.goal)
      : '10'
  )
  const [rewardDescription, setRewardDescription] = useState(existing?.reward_description ?? '')
  const [cardTagline, setCardTagline] = useState(existing?.card_tagline ?? '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    const goalValue = type === 'spend' ? Math.round(parseFloat(goal) * 100) : parseInt(goal)

    const res = await fetch('/api/loyalty/program', {
      method: existing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        goal: goalValue,
        rewardDescription,
        cardTagline,
      }),
    })

    if (res.ok) {
      router.push('/dashboard/loyalty')
      router.refresh()
    }
    setSaving(false)
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Type de programme</label>
        <div className="flex gap-3">
          <button
            onClick={() => setType('visits')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              type === 'visits'
                ? 'bg-[#2C3E2D] text-white border-[#2C3E2D]'
                : 'bg-white text-foreground border-[#E8E8E4] hover:border-[#2C3E2D]'
            }`}
          >
            Par visites
          </button>
          <button
            onClick={() => setType('spend')}
            className={`flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
              type === 'spend'
                ? 'bg-[#2C3E2D] text-white border-[#2C3E2D]'
                : 'bg-white text-foreground border-[#E8E8E4] hover:border-[#2C3E2D]'
            }`}
          >
            Par dépenses
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {type === 'visits' ? 'Nombre de visites pour la récompense' : 'Montant en € pour la récompense'}
        </label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={type === 'visits' ? '10' : '50'}
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description de la récompense</label>
        <input
          type="text"
          value={rewardDescription}
          onChange={(e) => setRewardDescription(e.target.value)}
          placeholder="1 café offert"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Slogan du cartão (optionnel)</label>
        <input
          type="text"
          value={cardTagline}
          onChange={(e) => setCardTagline(e.target.value)}
          placeholder="Merci pour votre fidélité !"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving || !goal || !rewardDescription}
        className="w-full bg-[#2C3E2D] text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-[#243325] disabled:opacity-50 transition-colors"
      >
        {saving ? 'Enregistrement...' : 'Enregistrer le programme'}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/api/loyalty/program/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const { type, goal, rewardDescription, cardTagline } = body

  const admin = createAdminClient()
  const { error } = await admin.from('loyalty_programs').insert({
    restaurant_id: restaurant.id,
    type,
    goal,
    reward_description: rewardDescription,
    card_tagline: cardTagline || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}

export async function PUT(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const { type, goal, rewardDescription, cardTagline } = body

  const admin = createAdminClient()
  const { error } = await admin
    .from('loyalty_programs')
    .update({
      type,
      goal,
      reward_description: rewardDescription,
      card_tagline: cardTagline || null,
    })
    .eq('restaurant_id', restaurant.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Create `src/app/dashboard/loyalty/setup/page.tsx`**

```typescript
import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltySetup } from '@/components/dashboard/loyalty-setup'

export default async function LoyaltySetupPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .single()

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Programme de fidélité</h1>
      <p className="text-muted mb-8">Configurez les règles et le design de votre carte.</p>
      <LoyaltySetup restaurantId={restaurant.id} existing={program ?? null} />
    </div>
  )
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/loyalty/setup/ src/components/dashboard/loyalty-setup.tsx src/app/api/loyalty/program/
git commit -m "feat: add loyalty program setup page"
```

---

## Task 17: /dashboard/loyalty/customers — customer list

**Files:**
- Create: `src/app/dashboard/loyalty/customers/page.tsx`
- Create: `src/components/dashboard/loyalty-customers.tsx`

- [ ] **Step 1: Create `src/components/dashboard/loyalty-customers.tsx`**

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'
import { Gift, UserPlus, CheckCircle } from 'lucide-react'

type Props = {
  cards: LoyaltyCard[]
  program: LoyaltyProgram
}

export function LoyaltyCustomers({ cards, program }: Props) {
  const router = useRouter()
  const [redeeming, setRedeeming] = useState<string | null>(null)

  async function handleRedeem(cardId: string) {
    setRedeeming(cardId)
    await fetch(`/api/loyalty/cards/${cardId}/redeem`, { method: 'POST' })
    router.refresh()
    setRedeeming(null)
  }

  const goalLabel = program.type === 'visits'
    ? `${program.goal} visites`
    : `${(program.goal / 100).toFixed(0)}€`

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{cards.length} client{cards.length !== 1 ? 's' : ''} inscrits</p>
        <Link
          href="/dashboard/loyalty/customers/new"
          className="flex items-center gap-2 bg-[#2C3E2D] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#243325] transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Nouveau client
        </Link>
      </div>

      {cards.length === 0 && (
        <div className="text-center py-16 text-muted">
          <Gift className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Aucun client inscrit pour l'instant.</p>
        </div>
      )}

      <div className="space-y-3">
        {cards.map((card) => {
          const hasReward = card.current_value >= program.goal
          const progressText = program.type === 'visits'
            ? `${card.current_value} / ${program.goal} visites`
            : `${(card.current_value / 100).toFixed(2)}€ / ${(program.goal / 100).toFixed(2)}€`

          return (
            <div
              key={card.id}
              className={`bg-white border rounded-xl p-4 flex items-center justify-between ${
                hasReward ? 'border-amber-300 bg-amber-50' : 'border-[#E8E8E4]'
              }`}
            >
              <div>
                <div className="font-medium text-sm text-foreground">{card.customer_name}</div>
                <div className="text-xs text-muted mt-0.5">{card.customer_email}</div>
                <div className={`text-xs mt-1 font-medium ${hasReward ? 'text-amber-600' : 'text-muted'}`}>
                  {hasReward ? '🎁 Récompense disponible !' : progressText}
                </div>
              </div>
              {hasReward && (
                <button
                  onClick={() => handleRedeem(card.id)}
                  disabled={redeeming === card.id}
                  className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-amber-600 disabled:opacity-50 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {redeeming === card.id ? '...' : 'Resgatar'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/app/dashboard/loyalty/customers/page.tsx`**

```typescript
import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltyCustomers } from '@/components/dashboard/loyalty-customers'

export default async function LoyaltyCustomersPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()

  const [{ data: program }, { data: cards }] = await Promise.all([
    admin.from('loyalty_programs').select('*').eq('restaurant_id', restaurant.id).single(),
    admin.from('loyalty_cards').select('*').eq('restaurant_id', restaurant.id).order('created_at', { ascending: false }),
  ])

  if (!program) redirect('/dashboard/loyalty/setup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Clients fidèles</h1>
      <p className="text-muted mb-8">Gérez vos clients et leurs récompenses.</p>
      <LoyaltyCustomers cards={cards ?? []} program={program} />
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/loyalty/customers/page.tsx src/components/dashboard/loyalty-customers.tsx
git commit -m "feat: add loyalty customers list page"
```

---

## Task 18: /dashboard/loyalty/customers/new — register customer

**Files:**
- Create: `src/app/dashboard/loyalty/customers/new/page.tsx`
- Create: `src/components/dashboard/loyalty-new-customer.tsx`

- [ ] **Step 1: Create `src/components/dashboard/loyalty-new-customer.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function LoyaltyNewCustomer() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    const res = await fetch('/api/loyalty/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: name, customerEmail: email, customerPhone: phone || undefined }),
    })

    if (res.ok) {
      setSent(true)
      setTimeout(() => router.push('/dashboard/loyalty/customers'), 2000)
    }
    setSaving(false)
  }

  if (sent) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">✅</div>
        <h2 className="font-serif text-2xl mb-2">Carte envoyée !</h2>
        <p className="text-muted text-sm">Un email a été envoyé à {email} avec la carte de fidélité.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Nom du client *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Marie Dupont"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="marie@exemple.com"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Téléphone (optionnel)</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+33 6 12 34 56 78"
          className="w-full px-4 py-3 border border-[#E8E8E4] rounded-lg text-sm focus:outline-none focus:border-[#2C3E2D]"
        />
      </div>
      <button
        type="submit"
        disabled={saving || !name || !email}
        className="w-full bg-[#2C3E2D] text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-[#243325] disabled:opacity-50 transition-colors"
      >
        {saving ? 'Envoi en cours...' : 'Créer et envoyer la carte'}
      </button>
      <p className="text-xs text-muted">Le client recevra un email avec les boutons Apple Wallet et Google Wallet.</p>
    </form>
  )
}
```

- [ ] **Step 2: Create `src/app/dashboard/loyalty/customers/new/page.tsx`**

```typescript
import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltyNewCustomer } from '@/components/dashboard/loyalty-new-customer'

export default async function NewCustomerPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('id')
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!program) redirect('/dashboard/loyalty/setup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Nouveau client</h1>
      <p className="text-muted mb-8">Inscrivez un client et envoyez-lui sa carte de fidélité.</p>
      <LoyaltyNewCustomer />
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/loyalty/customers/new/ src/components/dashboard/loyalty-new-customer.tsx
git commit -m "feat: add register new loyalty customer page"
```

---

## Task 19: /dashboard/loyalty/scan — QR scanner

**Files:**
- Create: `src/app/dashboard/loyalty/scan/page.tsx`
- Create: `src/components/dashboard/loyalty-scan.tsx`

- [ ] **Step 1: Install QR scanner library**

```bash
npm install html5-qrcode
```

- [ ] **Step 2: Create `src/components/dashboard/loyalty-scan.tsx`**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'

type ScanResult = { customer_name: string; current_value: number } | null

export function LoyaltyScan() {
  const scannerRef = useRef<any>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult>(null)
  const [error, setError] = useState<string | null>(null)
  const [stamping, setStamping] = useState(false)
  const [done, setDone] = useState(false)
  const [scannedCardId, setScannedCardId] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop?.()
      }
    }
  }, [])

  async function startScanner() {
    setError(null)
    setResult(null)
    setDone(false)
    setScannedCardId(null)
    setScanning(true)

    const { Html5Qrcode } = await import('html5-qrcode')
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    await scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      async (decodedText: string) => {
        await scanner.stop()
        setScanning(false)
        setScannedCardId(decodedText)

        // Look up the card
        const res = await fetch(`/api/loyalty/cards/${decodedText}/info`)
        if (!res.ok) {
          setError('Carte non reconnue. Vérifiez le QR code.')
          return
        }
        const data = await res.json()
        setResult(data)
      },
      () => {},
    ).catch(() => {
      setScanning(false)
      setError('Impossible d\'accéder à la caméra.')
    })
  }

  async function handleStamp() {
    if (!scannedCardId) return
    setStamping(true)
    const res = await fetch(`/api/loyalty/cards/${scannedCardId}/stamp`, { method: 'POST' })
    if (res.ok) {
      setDone(true)
    }
    setStamping(false)
  }

  async function handleRedeem() {
    if (!scannedCardId) return
    setStamping(true)
    await fetch(`/api/loyalty/cards/${scannedCardId}/redeem`, { method: 'POST' })
    setDone(true)
    setStamping(false)
  }

  if (done) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="font-serif text-2xl mb-4">Fait !</h2>
        <button
          onClick={() => { setDone(false); setResult(null); setScannedCardId(null) }}
          className="bg-[#2C3E2D] text-white px-6 py-3 rounded-xl text-sm font-medium"
        >
          Scanner un autre client
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      {!result && !scanning && (
        <div className="text-center py-8">
          <button
            onClick={startScanner}
            className="bg-[#2C3E2D] text-white px-8 py-4 rounded-xl text-base font-medium w-full"
          >
            📷 Scanner le QR du client
          </button>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      )}

      {scanning && (
        <div>
          <div id="qr-reader" className="w-full rounded-xl overflow-hidden" />
          <p className="text-center text-sm text-muted mt-3">Pointez la caméra vers le QR code du client</p>
        </div>
      )}

      {result && !done && (
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-6 text-center space-y-4">
          <div className="text-3xl">👤</div>
          <h3 className="font-serif text-xl">{result.customer_name}</h3>
          <p className="text-sm text-muted">Valeur actuelle: {result.current_value}</p>
          <div className="flex gap-3">
            <button
              onClick={handleStamp}
              disabled={stamping}
              className="flex-1 bg-[#2C3E2D] text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {stamping ? '...' : '+ Ajouter carimbo'}
            </button>
            <button
              onClick={handleRedeem}
              disabled={stamping}
              className="flex-1 bg-amber-500 text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              🎁 Resgatar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `src/app/api/loyalty/cards/[id]/info/route.ts`** (used by scanner to look up card)

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { data: card } = await admin
    .from('loyalty_cards')
    .select('customer_name, current_value, restaurant_id, loyalty_programs(goal)')
    .eq('id', params.id)
    .single()

  if (!card) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('owner_id')
    .eq('id', card.restaurant_id)
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  return NextResponse.json({
    customer_name: card.customer_name,
    current_value: card.current_value,
  })
}
```

- [ ] **Step 4: Create `src/app/dashboard/loyalty/scan/page.tsx`**

```typescript
import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltyScan } from '@/components/dashboard/loyalty-scan'

export default async function LoyaltyScanPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('id')
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!program) redirect('/dashboard/loyalty/setup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Scanner</h1>
      <p className="text-muted mb-8">Scannez le QR code du client pour ajouter un carimbo.</p>
      <LoyaltyScan />
    </div>
  )
}
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add src/app/dashboard/loyalty/scan/ src/components/dashboard/loyalty-scan.tsx src/app/api/loyalty/cards/[id]/info/ package.json package-lock.json
git commit -m "feat: add loyalty QR scanner page"
```

---

## Task 20: /dashboard/loyalty — overview page

**Files:**
- Create: `src/app/dashboard/loyalty/page.tsx`

- [ ] **Step 1: Create `src/app/dashboard/loyalty/page.tsx`**

```typescript
import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Gift, Users, QrCode, Settings } from 'lucide-react'

export default async function LoyaltyPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!program) {
    return (
      <div>
        <h1 className="font-serif text-3xl text-foreground mb-2">Fidélité</h1>
        <p className="text-muted mb-8">Remplacez vos cartes papier par un cartão digital dans le téléphone de vos clients.</p>
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-8 text-center max-w-md">
          <Gift className="w-10 h-10 mx-auto mb-4 text-[#2C3E2D] opacity-60" />
          <h2 className="font-serif text-xl mb-2">Configurez votre programme</h2>
          <p className="text-sm text-muted mb-6">Définissez vos règles de fidélité avant d'inscrire des clients.</p>
          <Link
            href="/dashboard/loyalty/setup"
            className="bg-[#2C3E2D] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#243325] transition-colors inline-block"
          >
            Configurer maintenant
          </Link>
        </div>
      </div>
    )
  }

  const [{ count: totalCards }, { count: rewardCount }] = await Promise.all([
    admin.from('loyalty_cards').select('*', { count: 'exact', head: true }).eq('restaurant_id', restaurant.id),
    admin.from('loyalty_cards').select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id)
      .gte('current_value', program.goal),
  ])

  const goalLabel = program.type === 'visits'
    ? `${program.goal} visites`
    : `${(program.goal / 100).toFixed(0)}€`

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Fidélité</h1>
      <p className="text-muted mb-8">Gérez votre programme de fidélité digital.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-5">
          <p className="text-xs text-muted uppercase tracking-wide mb-1">Clients inscrits</p>
          <p className="font-serif text-3xl text-foreground">{totalCards ?? 0}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">Récompenses dispo.</p>
          <p className="font-serif text-3xl text-amber-700">{rewardCount ?? 0}</p>
        </div>
      </div>

      <div className="bg-white border border-[#E8E8E4] rounded-xl p-5 mb-4">
        <p className="text-xs text-muted uppercase tracking-wide mb-1">Programme actuel</p>
        <p className="font-medium text-sm">{program.reward_description}</p>
        <p className="text-xs text-muted mt-0.5">après {goalLabel}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link
          href="/dashboard/loyalty/customers/new"
          className="flex items-center gap-3 bg-[#2C3E2D] text-white px-5 py-4 rounded-xl text-sm font-medium hover:bg-[#243325] transition-colors"
        >
          <Users className="w-5 h-5" />
          Nouveau client
        </Link>
        <Link
          href="/dashboard/loyalty/scan"
          className="flex items-center gap-3 bg-white border border-[#E8E8E4] text-foreground px-5 py-4 rounded-xl text-sm font-medium hover:border-[#2C3E2D] transition-colors"
        >
          <QrCode className="w-5 h-5" />
          Scanner QR
        </Link>
        <Link
          href="/dashboard/loyalty/customers"
          className="flex items-center gap-3 bg-white border border-[#E8E8E4] text-foreground px-5 py-4 rounded-xl text-sm font-medium hover:border-[#2C3E2D] transition-colors"
        >
          <Gift className="w-5 h-5" />
          Voir les clients
        </Link>
      </div>

      <div className="mt-4">
        <Link
          href="/dashboard/loyalty/setup"
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <Settings className="w-4 h-4" />
          Modifier le programme
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/loyalty/page.tsx
git commit -m "feat: add loyalty overview page"
```

---

## Task 21: Production build + environment variables + deploy

**Files:** None (configuration + verification)

- [ ] **Step 1: Add required environment variables to `.env.local` for local testing**

Add to `.env.local` (never commit this file):
```
APPLE_PASS_TYPE_ID=pass.com.montablo.loyalty
APPLE_TEAM_ID=XXXXXXXXXX
APPLE_WWDR_CERT_BASE64=<see Task 6 for how to generate>
APPLE_PASS_CERT_BASE64=<see Task 6 for how to generate>
APPLE_PASS_KEY_BASE64=<see Task 6 for how to generate>
APPLE_PASS_KEY_PASSPHRASE=
GOOGLE_WALLET_ISSUER_ID=<from Google Pay & Wallet Console>
GOOGLE_SERVICE_ACCOUNT_KEY=<JSON string — single line, no newlines>
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors. There may be warnings about `html5-qrcode` (client-only) — these are fine.

- [ ] **Step 3: Add env vars to Vercel**

```bash
# Add each env var using printf to avoid trailing newline issues
printf '%s' 'pass.com.montablo.loyalty' | vercel env add APPLE_PASS_TYPE_ID production
printf '%s' 'YOUR_TEAM_ID' | vercel env add APPLE_TEAM_ID production
# Repeat for APPLE_WWDR_CERT_BASE64, APPLE_PASS_CERT_BASE64, APPLE_PASS_KEY_BASE64
# For GOOGLE_SERVICE_ACCOUNT_KEY: paste the JSON as a single line
```

- [ ] **Step 4: Deploy**

```bash
git push origin main
```

Auto-deploys via Vercel GitHub integration. Monitor at https://vercel.com.

- [ ] **Step 5: Smoke test**
  1. Log in to dashboard → confirm "Fidélité" appears in sidebar
  2. Navigate to `/dashboard/loyalty` → confirm page loads
  3. Navigate to `/dashboard/loyalty/setup` → configure a test program
  4. Navigate to `/dashboard/loyalty/customers/new` → register yourself as a test customer
  5. Check email → click "Ajouter à Apple Wallet" → verify `.pkpass` downloads
  6. Navigate to `/dashboard/loyalty/scan` on phone → scan the QR → add stamp

---

## Pre-requisites Checklist

Before starting Task 6 (Apple Wallet), complete these in the Apple Developer Portal:

- [ ] Create a Pass Type ID: `pass.com.montablo.loyalty` at https://developer.apple.com/account/resources/identifiers/list/passTypeId
- [ ] Generate a Pass Type ID certificate and download `.cer` file
- [ ] Export certificate + key as `.p12` from Keychain Access
- [ ] Convert to PEM format (commands in Task 6)
- [ ] Base64 encode each PEM file
- [ ] Download Apple WWDR G4 certificate from https://www.apple.com/certificateauthority/

Before starting Task 7 (Google Wallet), complete these:

- [ ] Go to https://pay.google.com/business/console and create an issuer account
- [ ] Enable Google Wallet API in Google Cloud Console
- [ ] Create a service account, grant "Google Wallet Object Issuer" role
- [ ] Download service account JSON key
- [ ] Note the Issuer ID
