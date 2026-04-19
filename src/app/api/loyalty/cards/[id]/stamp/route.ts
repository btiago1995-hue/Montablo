import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData, type PassData } from '@/lib/loyalty/pass-design'
import { updateGoogleWalletCard } from '@/lib/loyalty/google-wallet'
import type { LoyaltyCard, LoyaltyProgram } from '@/types/database'

type CardWithProgram = LoyaltyCard & { loyalty_programs: LoyaltyProgram }

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const amount: number = body.amount ?? 1

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
  const newValue = card.current_value + amount

  await admin.from('loyalty_stamps').insert({
    card_id: card.id,
    amount,
    added_by: user.id,
  })

  await admin
    .from('loyalty_cards')
    .update({ current_value: newValue })
    .eq('id', card.id)

  const updatedCard = { ...card, current_value: newValue }
  const passData = buildPassData(restaurant, program, updatedCard)

  await pushAppleWalletUpdate(card.id, passData, admin).catch(console.error)
  await updateGoogleWalletCard(passData).catch(console.error)

  return NextResponse.json({ current_value: newValue })
}

async function pushAppleWalletUpdate(
  cardId: string,
  passData: PassData,
  admin: ReturnType<typeof createAdminClient>,
) {
  const { data: registrations } = await admin
    .from('loyalty_device_registrations')
    .select('push_token')
    .eq('card_id', cardId)

  if (!registrations?.length) return

  for (const reg of registrations) {
    await sendApnsPush(reg.push_token)
  }
}

async function sendApnsPush(pushToken: string) {
  // APNs uses HTTP/2 with the pass certificate. Install: npm install @parse/node-apn
  // For V1, this stub means Apple Wallet updates on next open (not instantly).
  // To enable instant updates, replace this with a real APNs HTTP/2 request:
  // POST https://api.push.apple.com/3/device/{pushToken}
  // Headers: apns-topic = APPLE_PASS_TYPE_ID, apns-push-type = background
  // Body: {} (empty payload for pass updates)
  console.log('[APNs] TODO: send push to:', pushToken)
}
