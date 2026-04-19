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
