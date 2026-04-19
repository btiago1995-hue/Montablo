import { createAdminClient } from '@/lib/supabase/admin'
import { headers } from 'next/headers'

type Params = { deviceId: string; passTypeId: string; serial: string }

export async function POST(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  const { data: card } = await admin
    .from('loyalty_cards')
    .select('id')
    .eq('apple_pass_serial', params.serial)
    .eq('apple_auth_token', token)
    .single()

  if (!card) return new Response(null, { status: 401 })

  const body = await _req.json()
  const { pushToken } = body

  const { error } = await admin
    .from('loyalty_device_registrations')
    .upsert({
      card_id: card.id,
      device_library_id: params.deviceId,
      push_token: pushToken,
      pass_type_id: params.passTypeId,
    }, { onConflict: 'device_library_id,card_id' })

  if (error) return new Response(null, { status: 500 })
  return new Response(null, { status: 201 })
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const authHeader = headers().get('Authorization')
  const token = authHeader?.replace('ApplePass ', '')
  if (!token) return new Response(null, { status: 401 })

  const admin = createAdminClient()

  await admin
    .from('loyalty_device_registrations')
    .delete()
    .eq('device_library_id', params.deviceId)

  return new Response(null, { status: 200 })
}
