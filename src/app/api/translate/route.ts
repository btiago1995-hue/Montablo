import { NextResponse } from 'next/server'
import { translateBatch } from '@/lib/translate'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    // Auth check: only logged-in users can use the translation API
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await req.json()
    const { texts } = body as { texts: Record<string, string> }

    if (!texts || typeof texts !== 'object') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const translations = await translateBatch(texts)
    return NextResponse.json({ translations })
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
