import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { data: card } = await admin
    .from('loyalty_cards')
    .select('customer_name, current_value, restaurant_id, program_id')
    .eq('id', params.id)
    .single()

  if (!card) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const [{ data: restaurant }, { data: program }] = await Promise.all([
    admin.from('restaurants').select('owner_id').eq('id', card.restaurant_id).eq('owner_id', user.id).single(),
    admin.from('loyalty_programs').select('goal, type').eq('id', card.program_id).single(),
  ])

  if (!restaurant) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  return NextResponse.json({
    customer_name: card.customer_name,
    current_value: card.current_value,
    goal: program?.goal ?? 0,
    program_type: program?.type ?? 'visits',
  })
}
