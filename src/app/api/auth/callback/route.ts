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

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth`)
  }

  try {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[auth/callback] Exchange error:', error.message)
      return NextResponse.redirect(`${origin}/login?error=auth`)
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      try {
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

          // Send welcome email (non-blocking)
          const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
          const email = welcome(restaurantName, `${appUrl}/dashboard`)

          if (user.email) {
            getResend().emails.send({
              from: EMAIL_FROM,
              to: user.email,
              subject: email.subject,
              html: email.html,
            }).catch((err) => {
              console.error('[auth/callback] Welcome email failed:', err)
            })
          }
        }
      } catch (err) {
        console.error('[auth/callback] Restaurant creation error:', err)
        // Don't block login even if restaurant creation fails
      }
    }

    return NextResponse.redirect(`${origin}${next}`)
  } catch (err) {
    console.error('[auth/callback] Unexpected error:', err)
    return NextResponse.redirect(`${origin}/login?error=auth`)
  }
}
