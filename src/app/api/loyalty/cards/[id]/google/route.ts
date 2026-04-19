import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from '@/lib/loyalty/pass-design'
import { generateGoogleWalletUrl } from '@/lib/loyalty/google-wallet'
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

  if (!card) return new Response('Not found', { status: 404 })

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', card.restaurant_id)
    .single()

  if (!restaurant) return new Response('Not found', { status: 404 })

  const program = card.loyalty_programs
  const passData = buildPassData(restaurant, program, card)

  try {
    const saveUrl = await generateGoogleWalletUrl(passData, program.id)
    redirect(saveUrl)
  } catch (err) {
    if ((err as { digest?: string }).digest?.startsWith('NEXT_REDIRECT')) throw err
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(msg, { status: 500 })
  }
}
