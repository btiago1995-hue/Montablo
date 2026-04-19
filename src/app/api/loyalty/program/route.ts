import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getRestaurant } from '@/lib/supabase/cached'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const { type, goal, rewardDescription, cardTagline } = body

  const admin = createAdminClient()
  const { error } = await admin.from('loyalty_programs').insert({
    restaurant_id: restaurant.id,
    type,
    goal,
    reward_description: rewardDescription,
    card_tagline: cardTagline || null,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}

export async function PUT(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const restaurant = await getRestaurant()
  if (!restaurant) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  const { type, goal, rewardDescription, cardTagline } = body

  const admin = createAdminClient()
  const { error } = await admin
    .from('loyalty_programs')
    .update({
      type,
      goal,
      reward_description: rewardDescription,
      card_tagline: cardTagline || null,
    })
    .eq('restaurant_id', restaurant.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
