import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateApplePass } from '@/lib/loyalty/apple-wallet'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'

type CardWithProgram = LoyaltyCard & { loyalty_programs: LoyaltyProgram }

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const admin = createAdminClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: card } = await (admin as any)
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('id', params.id)
    .single() as { data: CardWithProgram | null }

  if (!card) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const program = card.loyalty_programs
  const passData = buildPassData(restaurant, program, card)

  const buffer = await generateApplePass(passData)

  return new Response(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/vnd.apple.pkpass',
      'Content-Disposition': `attachment; filename="${restaurant.slug}-loyalty.pkpass"`,
    },
  })
}
