import { NextResponse } from 'next/server'
import { translateBatch } from '@/lib/translate'

export async function POST(req: Request) {
  try {
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
