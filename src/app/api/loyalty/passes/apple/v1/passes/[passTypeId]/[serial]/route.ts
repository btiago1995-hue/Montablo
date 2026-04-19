import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateApplePass } from '@/lib/loyalty/apple-wallet'
import { headers } from 'next/headers'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'

type Params = { passTypeId: string; serial: string }
type CardWithProgram = LoyaltyCard & { loyalty_programs: LoyaltyProgram }

export async function GET(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: card } = await (admin as any)
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('apple_pass_serial', params.serial)
    .eq('apple_auth_token', token)
    .single() as { data: CardWithProgram | null }

  if (!card) return new Response(null, { status: 401 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return new Response(null, { status: 404 })

  const program = card.loyalty_programs
  const passData = buildPassData(restaurant, program, card)
  const buffer = await generateApplePass(passData)

  return new Response(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/vnd.apple.pkpass',
      'Last-Modified': new Date().toUTCString(),
    },
  })
}
