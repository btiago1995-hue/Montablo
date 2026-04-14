/**
 * French email templates for MonTablo transactional emails.
 * All templates return plain HTML strings — no external dependencies.
 */

const BRAND = {
  primary: '#2C3E2D',
  accent: '#D4A574',
  bg: '#FAFAF7',
  text: '#1A1A1A',
  muted: '#6B7280',
}

function layout(content: string) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="text-align:center;margin-bottom:32px">
      <span style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:${BRAND.primary}">Mon</span><span style="font-family:Georgia,serif;font-size:24px;font-weight:bold;color:${BRAND.accent}">Tablo</span>
    </div>
    <div style="background:white;border-radius:12px;padding:32px;border:1px solid #E5E5E0">
      ${content}
    </div>
    <p style="text-align:center;font-size:12px;color:${BRAND.muted};margin-top:24px">
      &copy; ${new Date().getFullYear()} MonTablo &mdash; Menu digital pour restaurants
    </p>
  </div>
</body>
</html>`
}

function button(text: string, url: string) {
  return `<a href="${url}" style="display:inline-block;background:${BRAND.primary};color:white;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;margin-top:8px">${text}</a>`
}

export function trialExpiryWarning(restaurantName: string, daysLeft: number, dashboardUrl: string) {
  const urgency = daysLeft <= 1
    ? `<p style="font-size:15px;color:#DC2626;font-weight:600">Votre essai se termine demain !</p>`
    : `<p style="font-size:15px;color:${BRAND.text}">Il vous reste <strong>${daysLeft} jours</strong> d'essai gratuit.</p>`

  return {
    subject: daysLeft <= 1
      ? `${restaurantName} — Dernier jour d'essai gratuit`
      : `${restaurantName} — Plus que ${daysLeft} jours d'essai`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 16px">Bonjour,</h2>
      ${urgency}
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6">
        Pour continuer à utiliser votre menu digital <strong>${restaurantName}</strong> sans interruption,
        activez votre abonnement avant la fin de votre période d'essai.
      </p>
      <p style="font-size:14px;color:${BRAND.muted};line-height:1.6">
        À partir de <strong>26,99&nbsp;&euro;/mois</strong> (annuel) &mdash; plats illimités, menu du jour, QR code personnalisé.
      </p>
      <div style="text-align:center;margin:24px 0">
        ${button('Activer mon abonnement', `${dashboardUrl}/settings`)}
      </div>
      <p style="font-size:13px;color:${BRAND.muted}">
        Des questions&nbsp;? Répondez simplement à cet email.
      </p>
    `),
  }
}

export function trialExpired(restaurantName: string, dashboardUrl: string) {
  return {
    subject: `${restaurantName} — Votre essai gratuit a expiré`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 16px">Votre essai est terminé</h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6">
        L'essai gratuit de <strong>${restaurantName}</strong> a pris fin.
        Votre menu digital n'est plus visible par vos clients.
      </p>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6">
        Bonne nouvelle&nbsp;: toutes vos données sont intactes. Activez votre abonnement
        pour remettre votre menu en ligne immédiatement.
      </p>
      <div style="text-align:center;margin:24px 0">
        ${button('Réactiver mon menu', `${dashboardUrl}/settings`)}
      </div>
    `),
  }
}
