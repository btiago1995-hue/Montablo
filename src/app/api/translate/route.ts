import { NextResponse } from 'next/server'
import { translateBatch, type TargetLang } from '@/lib/translate'
import { createClient } from '@/lib/supabase/server'

const VALID_LANGS: TargetLang[] = ['en', 'de']
const MAX_TEXTS = 50
const MAX_TEXT_LENGTH = 500

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = (await req.json()) as {
      texts?: Record<string, string>
      targetLang?: string
    }

    const targetLang: TargetLang =
      body.targetLang && VALID_LANGS.includes(body.targetLang as TargetLang)
        ? (body.targetLang as TargetLang)
        : 'en'

    const texts = body.texts
    if (!texts || typeof texts !== 'object') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const entries = Object.entries(texts)
    if (entries.length > MAX_TEXTS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_TEXTS} textes par requête` },
        { status: 400 }
      )
    }
    if (entries.some(([, v]) => typeof v !== 'string' || v.length > MAX_TEXT_LENGTH)) {
      return NextResponse.json(
        { error: `Chaque texte doit faire moins de ${MAX_TEXT_LENGTH} caractères` },
        { status: 400 }
      )
    }

    const translations = await translateBatch(texts, targetLang)
    return NextResponse.json({ translations })
  } catch {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
  }
}
