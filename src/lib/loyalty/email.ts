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
