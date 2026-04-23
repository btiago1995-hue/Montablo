import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
import { createClient } from '@supabase/supabase-js'
import { getResend, EMAIL_FROM } from '@/lib/resend'
import { trialExpiryWarning, trialExpired, trialChoosePlan } from '@/lib/email-templates'

// Use service role to access auth.users emails
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getAdminClient()
  const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const dashboardUrl = `${appUrl}/dashboard`

  // Get all trialing restaurants
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select('id, name, owner_id, trial_ends_at, trial_reminder_3d_sent, trial_reminder_1d_sent, trial_expired_sent, trial_choose_plan_sent')
    .eq('subscription_status', 'trialing')

  if (error || !restaurants) {
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 })
  }

  const now = new Date()
  const results: string[] = []

  for (const r of restaurants) {
    const trialEnd = new Date(r.trial_ends_at)
    const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / 86400000)

    // Determine which email to send
    let emailType: 'choose_plan' | '3d' | '1d' | 'expired' | null = null

    if (daysLeft <= 0 && !r.trial_expired_sent) {
      emailType = 'expired'
    } else if (daysLeft === 1 && !r.trial_reminder_1d_sent) {
      emailType = '1d'
    } else if (daysLeft <= 3 && daysLeft > 1 && !r.trial_reminder_3d_sent) {
      emailType = '3d'
    } else if (daysLeft === 4 && !r.trial_choose_plan_sent) {
      emailType = 'choose_plan'
    }

    if (!emailType) continue

    // Get user email from auth.users
    const { data: { user } } = await supabase.auth.admin.getUserById(r.owner_id)
    if (!user?.email) continue

    // Build email
    const email =
      emailType === 'expired'
        ? trialExpired(r.name, dashboardUrl)
        : emailType === 'choose_plan'
          ? trialChoosePlan(r.name, dashboardUrl)
          : trialExpiryWarning(r.name, daysLeft, dashboardUrl)

    // Send via Resend (individual send per CLAUDE.md)
    const { error: sendError } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: user.email,
      subject: email.subject,
      html: email.html,
    })

    if (sendError) {
      results.push(`FAIL: ${r.name} (${emailType}) — ${sendError.message}`)
      continue
    }

    // Mark as sent
    const updateField =
      emailType === 'expired'
        ? { trial_expired_sent: true }
        : emailType === '1d'
          ? { trial_reminder_1d_sent: true }
          : emailType === '3d'
            ? { trial_reminder_3d_sent: true }
            : { trial_choose_plan_sent: true }

    await supabase.from('restaurants').update(updateField).eq('id', r.id)
    results.push(`OK: ${r.name} (${emailType})`)
  }

  return NextResponse.json({
    processed: restaurants.length,
    sent: results.filter(r => r.startsWith('OK')).length,
    details: results,
  })
}
