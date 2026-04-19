import { getResend, EMAIL_FROM } from '@/lib/resend'

export async function sendLoyaltyCardEmail({
  to,
  customerName,
  restaurantName,
  restaurantLogoUrl,
  restaurantColor,
  cardId,
  appUrl,
}: {
  to: string
  customerName: string
  restaurantName: string
  restaurantLogoUrl: string | null
  restaurantColor: string
  cardId: string
  appUrl: string
}) {
  const appleUrl = `${appUrl}/api/loyalty/cards/${cardId}/apple`
  const googleUrl = `${appUrl}/api/loyalty/cards/${cardId}/google`

  const bgColor = restaurantColor.startsWith('#') ? restaurantColor : `#${restaurantColor}`

  const logoBlock = restaurantLogoUrl
    ? `<img src="${restaurantLogoUrl}" alt="${restaurantName}" style="height:64px;width:64px;object-fit:contain;border-radius:12px;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto">`
    : ''

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F5F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:480px;margin:0 auto;padding:32px 16px">

    <!-- Restaurant header -->
    <div style="background:${bgColor};border-radius:16px;padding:32px;margin-bottom:24px;text-align:center">
      ${logoBlock}
      <h1 style="color:white;font-size:24px;margin:0 0 4px;font-weight:700">${restaurantName}</h1>
      <p style="color:rgba(255,255,255,0.7);margin:0;font-size:14px">Carte de fidélité digitale</p>
    </div>

    <!-- Card body -->
    <div style="background:white;border-radius:16px;padding:32px;margin-bottom:24px">
      <h2 style="color:#1a1a1a;font-size:20px;margin:0 0 12px">Bonjour ${customerName},</h2>
      <p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 28px">
        <strong>${restaurantName}</strong> vous offre votre carte de fidélité digitale.
        Plus besoin de carte papier — elle est toujours dans votre téléphone.
      </p>

      <!-- Apple Wallet button -->
      <a href="${appleUrl}" style="display:block;text-decoration:none;margin-bottom:12px;border-radius:12px;overflow:hidden;border:1.5px solid #000;height:56px;background:#000;text-align:center;line-height:56px">
        <img src="https://www.montablo.com/apple-wallet-logo.png" alt="Ajouter à Apple Wallet" style="height:38px;width:auto;vertical-align:middle;display:inline-block">
      </a>

      <!-- Google Wallet button -->
      <a href="${googleUrl}" style="display:block;text-decoration:none;border-radius:12px;overflow:hidden;border:1.5px solid #dadce0;height:56px;background:#fff;text-align:center;line-height:56px">
        <img src="https://www.montablo.com/google-wallet-logo.png" alt="Ajouter à Google Wallet" style="height:38px;width:auto;vertical-align:middle;display:inline-block">
      </a>
    </div>

    <!-- Footer -->
    <p style="color:#bbb;font-size:11px;text-align:center;margin:0">
      Powered by <a href="https://www.montablo.com" style="color:#bbb">MonTablo</a>
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
