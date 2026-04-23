import { NextResponse } from 'next/server'
import { getResend, EMAIL_FROM } from '@/lib/resend'
import { contactLimiter, getClientIp } from '@/lib/rate-limit'

const CONTACT_TO = 'contact@montablo.com'
const MAX_MESSAGE_LENGTH = 5000
const MAX_FIELD_LENGTH = 200

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    const data = (await res.json()) as { success: boolean }
    return data.success
  } catch {
    return false
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]!))
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
    }

    const { name, email, restaurant, message, captchaToken } = body as {
      name?: string
      email?: string
      restaurant?: string
      message?: string
      captchaToken?: string
    }

    const cleanName = name?.trim() ?? ''
    const cleanEmail = email?.trim() ?? ''
    const cleanRestaurant = restaurant?.trim() ?? ''
    const cleanMessage = message?.trim() ?? ''

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 })
    }

    if (
      cleanName.length > MAX_FIELD_LENGTH ||
      cleanEmail.length > MAX_FIELD_LENGTH ||
      cleanRestaurant.length > MAX_FIELD_LENGTH ||
      cleanMessage.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json({ error: 'Contenu trop long.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 })
    }

    const ip = getClientIp(request)

    if (contactLimiter) {
      const { success } = await contactLimiter.limit(ip)
      if (!success) {
        return NextResponse.json(
          { error: 'Trop de soumissions. Réessayez plus tard.' },
          { status: 429 },
        )
      }
    }

    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!captchaToken) {
        return NextResponse.json(
          { error: 'Vérification anti-robot requise.' },
          { status: 400 },
        )
      }
      const ok = await verifyTurnstile(captchaToken, ip)
      if (!ok) {
        return NextResponse.json(
          { error: 'Vérification anti-robot échouée.' },
          { status: 400 },
        )
      }
    }

    const restaurantRow = cleanRestaurant
      ? `<tr><td style="padding:8px 0;color:#6b7280;width:120px">Restaurant</td><td style="padding:8px 0;color:#111827">${escapeHtml(cleanRestaurant)}</td></tr>`
      : ''

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111827">
        <h2 style="margin:0 0 16px;font-size:20px">Nouveau message de contact</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px">Nom</td><td style="padding:8px 0;color:#111827">${escapeHtml(cleanName)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0;color:#111827">${escapeHtml(cleanEmail)}</td></tr>
          ${restaurantRow}
        </table>
        <div style="padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(cleanMessage)}</div>
        <p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Répondez directement à cet email pour contacter ${escapeHtml(cleanName)}.</p>
      </div>
    `

    const resend = getResend()
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_TO,
      replyTo: cleanEmail,
      subject: `[MonTablo] Contact — ${cleanName}`,
      html,
    })

    if (error) {
      console.error('Resend contact error:', error)
      return NextResponse.json({ error: 'Erreur d\'envoi.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
