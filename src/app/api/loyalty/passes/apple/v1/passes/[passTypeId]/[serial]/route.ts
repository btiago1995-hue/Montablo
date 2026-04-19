import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateApplePass } from '@/lib/loyalty/apple-wallet'
import { headers } from 'next/headers'

type Params = { passTypeId: string; serial: string }

export async function GET(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('apple_pass_serial', params.serial)
    .eq('apple_auth_token', token)
    .single()

  if (!card) return new Response(null, { status: 401 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return new Response(null, { status: 404 })

  const program = (card as any).loyalty_programs
  const passData = buildPassData(restaurant, program, card)
  const buffer = await generateApplePass(passData)

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.apple.pkpass',
      'Last-Modified': new Date().toUTCString(),
    },
  })
}
