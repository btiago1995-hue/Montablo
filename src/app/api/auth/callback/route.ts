import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/utils'
import { getResend, EMAIL_FROM } from '@/lib/resend'
import { welcome } from '@/lib/email-templates'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard/import'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Check if user needs a restaurant created (post email-confirmation signup)
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const adminClient = createAdminClient()
        const { data: existingRestaurant } = await adminClient
          .from('restaurants')
          .select('id')
          .eq('owner_id', user.id)
          .single()

        if (!existingRestaurant && user.user_metadata?.restaurant_name) {
          const restaurantName = user.user_metadata.restaurant_name as string
          const slug = slugify(restaurantName) + '-' + Math.random().toString(36).slice(2, 6)

          await adminClient.from('restaurants').insert({
            owner_id: user.id,
            name: restaurantName,
            slug,
          })

          // Send welcome email
          const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
          const email = welcome(restaurantName, `${appUrl}/dashboard`)

          if (user.email) {
            await getResend().emails.send({
              from: EMAIL_FROM,
              to: user.email,
              subject: email.subject,
              html: email.html,
            }).catch(() => {
              // Non-blocking: don't fail the callback if email fails
            })
          }
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
