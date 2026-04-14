import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File
  // Hardcode bucket to 'images' only -- ignore user-provided value to prevent bucket enumeration
  const bucket = 'images'

  if (!file) {
    return NextResponse.json({ error: 'Fichier requis' }, { status: 400 })
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 5 Mo)' }, { status: 400 })
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Format non supporté. Utilisez JPEG, PNG, WebP ou GIF.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${ext}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
