import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })

  const body = await req.json()
  const { customer_email } = body

  if (!customer_email) return NextResponse.json({ error: 'customer_email required' }, { status: 400 })

  const admin = createAdminClient()
  const { error } = await admin
    .from('loyalty_cards')
    .update({ customer_email })
    .eq('id', params.id)
    .eq('restaurant_id', restaurant.id)

  if (error) return NextResponse.json({ error: 'Failed to update' }, { status: 500 })

  return NextResponse.json({ ok: true })
}
