import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  // Delete restaurant and all associated data (cascade handles child records)
  await supabase.from('restaurants').delete().eq('owner_id', user.id)

  // Sign out
  await supabase.auth.signOut()

  return NextResponse.json({ success: true })
}
