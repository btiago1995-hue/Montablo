import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { updateGoogleWalletCard } from '@/lib/loyalty/google-wallet'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'

type CardWithProgram = LoyaltyCard & { loyalty_programs: LoyaltyProgram }

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: card } = await (admin as any)
    .from('loyalty_cards')
    .select('*, loyalty_programs(*)')
    .eq('id', params.id)
    .single() as { data: CardWithProgram | null }

  if (!card) return NextResponse.json({ error: 'Card not found' }, { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const program = card.loyalty_programs

  if (card.current_value < program.goal) {
    return NextResponse.json({ error: 'Reward not yet reached' }, { status: 400 })
  }

  await admin
    .from('loyalty_cards')
    .update({
      current_value: 0,
      total_redeemed: card.total_redeemed + 1,
    })
    .eq('id', card.id)

  const updatedCard = { ...card, current_value: 0, total_redeemed: card.total_redeemed + 1 }
  const passData = buildPassData(restaurant, program, updatedCard)

  await updateGoogleWalletCard(passData).catch(console.error)

  return NextResponse.json({ total_redeemed: updatedCard.total_redeemed })
}
