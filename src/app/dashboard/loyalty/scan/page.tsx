import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { LoyaltyScan } from '@/components/dashboard/loyalty-scan'

export default async function LoyaltyScanPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const admin = createAdminClient()
  const { data: program } = await admin
    .from('loyalty_programs')
    .select('id')
    .eq('restaurant_id', restaurant.id)
    .single()

  if (!program) redirect('/dashboard/loyalty/setup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Scanner</h1>
      <p className="text-muted mb-8">Scannez le QR code du client pour ajouter un carimbo.</p>
      <LoyaltyScan />
    </div>
  )
}
