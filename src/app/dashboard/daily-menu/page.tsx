import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { DailyMenuEditor } from '@/components/dashboard/daily-menu-editor'

export default async function DailyMenuPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  const today = new Date().toISOString().split('T')[0]

  const supabase = createClient()
  const { data: dailyMenu } = await supabase
    .from('daily_menus')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .eq('valid_date', today)
    .single()

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Menu du jour</h1>
      <p className="text-muted mb-8">Configurez le menu du jour affiché à vos clients.</p>
      <DailyMenuEditor
        restaurantId={restaurant.id}
        initialMenu={dailyMenu}
        today={today}
      />
    </div>
  )
}
