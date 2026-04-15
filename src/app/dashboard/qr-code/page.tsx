import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { QRCodeGenerator } from '@/components/dashboard/qr-code-generator'

export default async function QRCodePage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const menuUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'}/menu/${restaurant.slug}`

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">QR Code</h1>
      <p className="text-muted mb-8">Générez et téléchargez votre QR code pour vos tables.</p>
      <QRCodeGenerator menuUrl={menuUrl} restaurantName={restaurant.name} />
    </div>
  )
}
