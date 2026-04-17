/**
 * French email templates for MonTablo transactional emails.
 * All templates return plain HTML strings — no external dependencies.
 *
 * Customer journey:
 *  1. welcome            — after email confirmation + restaurant created
 *  2. trialExpiryWarning — 3 days and 1 day before trial ends
 *  3. trialExpired       — trial has ended
 *  4. subscriptionConfirmed — after Stripe checkout completed
 *  5. subscriptionCanceled  — after Stripe subscription canceled
 */

const BRAND = {
  primary: '#2C3E2D',
  accent: '#D4A574',
  bg: '#FAFAF7',
  text: '#1A1A1A',
  muted: '#6B7280',
  success: '#16A34A',
  danger: '#DC2626',
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
    <div style="text-align:center;margin-top:24px">
      <p style="font-size:12px;color:${BRAND.muted};margin:0 0 8px">
        &copy; ${new Date().getFullYear()} MonTablo &mdash; Menu digital pour restaurants
      </p>
      <p style="font-size:12px;color:${BRAND.muted};margin:0">
        <a href="https://www.montablo.com" style="color:${BRAND.accent};text-decoration:none">www.montablo.com</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function button(text: string, url: string) {
  return `<div style="text-align:center;margin:24px 0">
    <a href="${url}" style="display:inline-block;background:${BRAND.primary};color:white;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px">${text}</a>
  </div>`
}

function divider() {
  return `<hr style="border:none;border-top:1px solid #E5E5E0;margin:24px 0">`
}

function tip(icon: string, text: string) {
  return `<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:12px">
    <span style="font-size:20px;line-height:1">${icon}</span>
    <span style="font-size:14px;color:${BRAND.text};line-height:1.5">${text}</span>
  </div>`
}

function formatAmount(amountInCents: number, currency: string) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100)
}

function formatPeriod(startTs: number, endTs: number) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const fmt = (ts: number) => new Date(ts * 1000).toLocaleDateString('fr-FR', opts)
  return `${fmt(startTs)} → ${fmt(endTs)}`
}

// ─── 1. Welcome email ───────────────────────────────────────────────

export function welcome(restaurantName: string, dashboardUrl: string) {
  return {
    subject: `Bienvenue sur MonTablo, ${restaurantName} !`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 8px;font-size:22px">
        Bienvenue sur MonTablo !
      </h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
        Votre compte pour <strong>${restaurantName}</strong> est prêt.
        Vous avez <strong>14 jours d'essai gratuit</strong> pour découvrir toutes les fonctionnalités.
      </p>

      ${divider()}

      <p style="font-size:14px;font-weight:600;color:${BRAND.primary};margin:0 0 16px">
        3 étapes pour démarrer&nbsp;:
      </p>
      ${tip('1&#xFE0F;&#x20E3;', '<strong>Importez votre carte</strong> — envoyez une photo de votre menu, notre IA fait le reste.')}
      ${tip('2&#xFE0F;&#x20E3;', '<strong>Personnalisez</strong> — ajustez les couleurs, ajoutez vos photos de plats.')}
      ${tip('3&#xFE0F;&#x20E3;', '<strong>Partagez</strong> — générez votre QR code et posez-le sur vos tables.')}

      ${button('Accéder à mon tableau de bord', dashboardUrl)}

      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0">
        Des questions&nbsp;? Répondez simplement à cet email, nous sommes là pour vous aider.
      </p>
    `),
  }
}

// ─── 2. Trial expiry warning (3 days / 1 day) ───────────────────────

export function trialExpiryWarning(restaurantName: string, daysLeft: number, dashboardUrl: string) {
  const urgency = daysLeft <= 1
    ? `<p style="font-size:16px;color:${BRAND.danger};font-weight:600;margin:0 0 16px">
        Votre essai se termine demain !
      </p>`
    : `<p style="font-size:15px;color:${BRAND.text};margin:0 0 16px">
        Il vous reste <strong>${daysLeft} jours</strong> d'essai gratuit.
      </p>`

  return {
    subject: daysLeft <= 1
      ? `${restaurantName} — Dernier jour d'essai gratuit`
      : `${restaurantName} — Plus que ${daysLeft} jours d'essai`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 16px;font-size:22px">
        Bonjour,
      </h2>
      ${urgency}
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
        Pour continuer à utiliser votre menu digital <strong>${restaurantName}</strong> sans interruption,
        activez votre abonnement avant la fin de votre période d'essai.
      </p>

      ${divider()}

      <p style="font-size:14px;font-weight:600;color:${BRAND.primary};margin:0 0 12px">
        Ce que vous gardez avec MonTablo&nbsp;:
      </p>
      ${tip('&#x2705;', 'Menu digital toujours à jour pour vos clients')}
      ${tip('&#x2705;', 'Import par photo avec intelligence artificielle')}
      ${tip('&#x2705;', 'QR code personnalisé pour vos tables')}
      ${tip('&#x2705;', 'Menu du jour et promotions')}

      <p style="font-size:14px;color:${BRAND.muted};line-height:1.6;margin:16px 0 0">
        À partir de <strong>26,99&nbsp;&euro;/mois</strong> (forfait annuel) &mdash; plats illimités.
      </p>

      ${button('Activer mon abonnement', `${dashboardUrl}/settings`)}

      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0">
        Des questions&nbsp;? Répondez simplement à cet email.
      </p>
    `),
  }
}

// ─── 3. Trial expired ───────────────────────────────────────────────

export function trialExpired(restaurantName: string, dashboardUrl: string) {
  return {
    subject: `${restaurantName} — Votre essai gratuit a expiré`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 16px;font-size:22px">
        Votre essai est terminé
      </h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
        L'essai gratuit de <strong>${restaurantName}</strong> a pris fin.
        Votre menu digital n'est plus visible par vos clients.
      </p>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
        Bonne nouvelle&nbsp;: <strong>toutes vos données sont intactes</strong>. Activez votre abonnement
        pour remettre votre menu en ligne immédiatement.
      </p>
      ${button('Réactiver mon menu', `${dashboardUrl}/settings`)}
      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0">
        Besoin d'aide&nbsp;? Répondez à cet email.
      </p>
    `),
  }
}

// ─── 4. Subscription confirmed ──────────────────────────────────────

export function subscriptionConfirmed(restaurantName: string, dashboardUrl: string) {
  return {
    subject: `${restaurantName} — Abonnement activé !`,
    html: layout(`
      <div style="text-align:center;margin-bottom:24px">
        <div style="display:inline-block;background:${BRAND.success}15;border-radius:50%;width:56px;height:56px;line-height:56px;font-size:28px">
          &#x2705;
        </div>
      </div>
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 8px;font-size:22px;text-align:center">
        Abonnement activé !
      </h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 24px;text-align:center">
        Merci pour votre confiance. Le menu digital de <strong>${restaurantName}</strong>
        est maintenant actif sans limite.
      </p>

      ${divider()}

      <p style="font-size:14px;font-weight:600;color:${BRAND.primary};margin:0 0 16px">
        Profitez de tout MonTablo&nbsp;:
      </p>
      ${tip('&#x1F4F1;', '<strong>Menu digital illimité</strong> — ajoutez autant de plats que vous voulez.')}
      ${tip('&#x1F4F7;', '<strong>Import par IA</strong> — photographiez votre carte, on s\'occupe du reste.')}
      ${tip('&#x1F4CA;', '<strong>Menu du jour</strong> — mettez à jour vos suggestions quotidiennes.')}
      ${tip('&#x1F3AF;', '<strong>QR code</strong> — imprimez et posez sur vos tables.')}

      ${button('Accéder à mon tableau de bord', dashboardUrl)}

      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0">
        Votre facture est disponible par email via Stripe.
        Des questions&nbsp;? Répondez à cet email.
      </p>
    `),
  }
}

// ─── 5. Subscription canceled ───────────────────────────────────────

export function subscriptionCanceled(restaurantName: string, dashboardUrl: string) {
  return {
    subject: `${restaurantName} — Abonnement annulé`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 16px;font-size:22px">
        Abonnement annulé
      </h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
        Votre abonnement MonTablo pour <strong>${restaurantName}</strong> a été annulé.
        Votre menu restera en ligne jusqu'à la fin de votre période de facturation.
      </p>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
        Vos données sont conservées&nbsp;: vous pouvez réactiver à tout moment
        et retrouver votre menu tel quel.
      </p>
      ${button('Réactiver mon abonnement', `${dashboardUrl}/settings`)}
      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0">
        Si vous avez annulé par erreur ou avez besoin d'aide, répondez simplement à cet email.
      </p>
    `),
  }
}

// ─── 6. Invoice issued (every payment) ─────────────────────────────────────

export function invoiceIssued(
  restaurantName: string,
  amountPaid: number,
  currency: string,
  periodStart: number,
  periodEnd: number,
  invoiceUrl: string,
  dashboardUrl: string,
) {
  const amount = formatAmount(amountPaid, currency)
  const period = formatPeriod(periodStart, periodEnd)

  return {
    subject: `${restaurantName} — Votre facture MonTablo est disponible`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 8px;font-size:22px">
        Votre facture est disponible
      </h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 24px">
        Merci pour votre paiement. Voici le récapitulatif de votre abonnement MonTablo
        pour <strong>${restaurantName}</strong>.
      </p>

      ${divider()}

      <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
        <tr>
          <td style="font-size:14px;color:${BRAND.muted};padding:8px 0">Montant payé</td>
          <td style="font-size:14px;color:${BRAND.text};font-weight:600;text-align:right;padding:8px 0">${amount}</td>
        </tr>
        <tr>
          <td style="font-size:14px;color:${BRAND.muted};padding:8px 0;border-top:1px solid #E5E5E0">Période couverte</td>
          <td style="font-size:14px;color:${BRAND.text};text-align:right;padding:8px 0;border-top:1px solid #E5E5E0">${period}</td>
        </tr>
      </table>

      ${button('Voir ma facture', invoiceUrl)}

      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0;text-align:center">
        Vous pouvez également accéder à toutes vos factures depuis votre
        <a href="${dashboardUrl}/settings" style="color:${BRAND.accent};text-decoration:none">tableau de bord</a>.
      </p>
    `),
  }
}
