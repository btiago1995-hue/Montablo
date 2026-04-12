import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { restaurantId, rating } = await request.json()

    if (!restaurantId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { error } = await supabase
      .from('reviews')
      .insert({ restaurant_id: restaurantId, rating })

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de l\'enregistrement' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
