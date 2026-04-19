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
      <a href="${appleUrl}" style="display:block;text-decoration:none;margin-bottom:12px">
        <div style="background:#000;border-radius:10px;padding:0 20px;height:52px;display:flex;align-items:center;justify-content:center;gap:10px">
          <svg width="22" height="27" viewBox="0 0 22 27" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M18.04 14.26c-.03-3.22 2.63-4.77 2.75-4.85-1.5-2.19-3.83-2.49-4.66-2.52-1.98-.2-3.87 1.17-4.87 1.17-1.01 0-2.57-1.14-4.23-1.11-2.17.03-4.18 1.27-5.3 3.21-2.26 3.93-.58 9.74 1.63 12.93 1.08 1.56 2.36 3.31 4.05 3.25 1.63-.07 2.24-1.05 4.2-1.05 1.96 0 2.52 1.05 4.24 1.02 1.75-.03 2.86-1.58 3.93-3.15 1.24-1.8 1.75-3.55 1.78-3.64-.04-.02-3.41-1.31-3.44-5.19l-.08-.07zM14.8 4.67C15.69 3.6 16.29 2.1 16.12.57c-1.31.06-2.9.87-3.83 1.97-.84.96-1.58 2.5-1.38 3.97 1.46.11 2.95-.74 3.89-1.84z"/></svg>
          <div>
            <div style="color:rgba(255,255,255,0.75);font-size:10px;line-height:1;margin-bottom:2px">Ajouter à</div>
            <div style="color:white;font-size:17px;font-weight:600;line-height:1">Apple Wallet</div>
          </div>
        </div>
      </a>

      <!-- Google Wallet button -->
      <a href="${googleUrl}" style="display:block;text-decoration:none">
        <div style="background:white;border:1.5px solid #dadce0;border-radius:10px;padding:0 20px;height:52px;display:flex;align-items:center;justify-content:center;gap:10px">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          <div>
            <div style="color:#5f6368;font-size:10px;line-height:1;margin-bottom:2px">Ajouter à</div>
            <div style="color:#202124;font-size:17px;font-weight:600;line-height:1">Google Wallet</div>
          </div>
        </div>
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
