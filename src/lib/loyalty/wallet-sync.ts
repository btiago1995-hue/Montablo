import { createAdminClient } from '@/lib/supabase/admin'
import { buildPassData } from './pass-design'
import { ensureLoyaltyClassForResync } from './google-wallet'
import type { Restaurant, LoyaltyProgram, LoyaltyCard } from '@/types/database'

function placeholderCard(program: LoyaltyProgram, restaurant: Restaurant): LoyaltyCard {
  return {
    id: 'sync-placeholder',
    program_id: program.id,
    restaurant_id: restaurant.id,
    customer_name: '',
    customer_email: '',
    customer_phone: null,
    current_value: 0,
    total_redeemed: 0,
    apple_pass_serial: null,
    apple_auth_token: null,
    google_pass_id: null,
    created_at: new Date().toISOString(),
  }
}

export async function syncWalletClassesForRestaurant(restaurantId: string): Promise<void> {
  const admin = createAdminClient()

  const { data: restaurant } = await admin
    .from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single<Restaurant>()
  if (!restaurant) return

  const { data: programs } = await admin
    .from('loyalty_programs')
    .select('*')
    .eq('restaurant_id', restaurantId)
  if (!programs || programs.length === 0) return

  for (const program of programs as LoyaltyProgram[]) {
    const { data: anyCard } = await admin
      .from('loyalty_cards')
      .select('*')
      .eq('program_id', program.id)
      .limit(1)
      .maybeSingle<LoyaltyCard>()

    const card = (anyCard as LoyaltyCard | null) ?? placeholderCard(program, restaurant)
    const passData = buildPassData(restaurant, program, card)

    try {
      await ensureLoyaltyClassForResync(program.id, passData)
    } catch (err) {
      console.error('[wallet-sync] failed for program', program.id, err)
      // Continue syncing remaining programs; do not bubble up.
    }
  }
}
