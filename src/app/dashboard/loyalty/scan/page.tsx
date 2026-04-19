import { getRestaurant } from '@/lib/supabase/cached'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
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
      <Link href="/dashboard/loyalty" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" />
        Retour
      </Link>
      <h1 className="font-serif text-3xl text-foreground mb-2">Scanner</h1>
      <p className="text-muted mb-8">Scannez le QR code du client pour ajouter un tampon.</p>
      <LoyaltyScan />
    </div>
  )
}
