import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { MenuImportResult } from '@/types/menu-import'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const MAX_TEXT_LENGTH = 50_000
const MAX_IMPORTS_PER_DAY = 3

const EXTRACTION_PROMPT = `Tu es un assistant spécialisé dans l'extraction de menus de restaurant.
Analyse le contenu du menu fourni et extrais toutes les catégories et leurs items.

Pour chaque catégorie, retourne :
- name_fr : nom de la catégorie en français
- name_en : nom de la catégorie traduit en anglais
- items : tableau des items de cette catégorie

Pour chaque item, retourne :
- name_fr : nom du plat en français
- name_en : nom du plat traduit en anglais
- description_fr : description en français (null si absente)
- description_en : description traduite en anglais (null si absente)
- price : prix en nombre (sans symbole de devise)
- tags : tableau de tags pertinents parmi ["vegetarian", "vegan", "gluten_free", "spicy", "halal", "new", "popular"] (tableau vide si aucun tag ne s'applique)

Retourne UNIQUEMENT du JSON valide, sans aucun texte additionnel, sans blocs markdown. Le format exact attendu est :
{
  "categories": [
    {
      "name_fr": "...",
      "name_en": "...",
      "items": [
        {
          "name_fr": "...",
          "name_en": "...",
          "description_fr": "..." ou null,
          "description_en": "..." ou null,
          "price": 12.50,
          "tags": []
        }
      ]
    }
  ]
}`

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const adminClient = createAdminClient()

    // 1. Auth check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
    }

    // 2. Get restaurant
    const { data: restaurant, error: restError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('owner_id', user.id)
      .single()

    if (restError || !restaurant) {
      return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
    }

    // 3. Rate limit check (using admin client to bypass RLS)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count, error: countError } = await adminClient
      .from('menu_imports')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant.id)
      .gte('created_at', oneDayAgo)

    if (countError) {
      return NextResponse.json({ error: 'Erreur de verification du quota' }, { status: 500 })
    }

    if ((count ?? 0) >= MAX_IMPORTS_PER_DAY) {
      return NextResponse.json(
        { error: 'Limite de 3 imports par jour atteinte. Reessayez demain.' },
        { status: 429 }
      )
    }

    // 4. Parse input (file or text)
    const contentType = request.headers.get('content-type') || ''
    let claudeContent: Anthropic.MessageCreateParams['messages'][0]['content']
    let isTextOnly = false

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File | null

      if (!file) {
        return NextResponse.json({ error: 'Fichier requis' }, { status: 400 })
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Fichier trop volumineux (max 10 Mo)' }, { status: 400 })
      }

      const buffer = Buffer.from(await file.arrayBuffer())
      const base64 = buffer.toString('base64')
      const mimeType = file.type

      if (mimeType === 'application/pdf') {
        claudeContent = [
          {
            type: 'document' as const,
            source: {
              type: 'base64' as const,
              media_type: 'application/pdf' as const,
              data: base64,
            },
          },
          { type: 'text' as const, text: EXTRACTION_PROMPT },
        ]
      } else if (mimeType.startsWith('image/')) {
        claudeContent = [
          {
            type: 'image' as const,
            source: {
              type: 'base64' as const,
              media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              data: base64,
            },
          },
          { type: 'text' as const, text: EXTRACTION_PROMPT },
        ]
      } else {
        return NextResponse.json(
          { error: 'Format non supporte. Utilisez PDF, JPEG, PNG, GIF ou WebP.' },
          { status: 400 }
        )
      }
    } else {
      // JSON body with text
      const body = await request.json()
      const { text } = body as { text?: string }

      if (!text || typeof text !== 'string') {
        return NextResponse.json({ error: 'Texte requis' }, { status: 400 })
      }

      if (text.length > MAX_TEXT_LENGTH) {
        return NextResponse.json(
          { error: `Texte trop long (max ${MAX_TEXT_LENGTH} caracteres)` },
          { status: 400 }
        )
      }

      isTextOnly = true
      claudeContent = [
        {
          type: 'text' as const,
          text: `${EXTRACTION_PROMPT}\n\nVoici le menu a analyser :\n\n${text}`,
        },
      ]
    }

    // 5. Call Claude API
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const model = isTextOnly ? 'claude-haiku-4-5-20251001' : 'claude-sonnet-4-20250514'

    const response = await anthropic.messages.create({
      model,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: claudeContent,
        },
      ],
    })

    // 6. Parse response
    const textBlock = response.content.find((block) => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: "Erreur lors de l'extraction" }, { status: 500 })
    }

    let jsonStr = textBlock.text.trim()
    // Strip markdown fences if present
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '')
    }

    let result: MenuImportResult
    try {
      result = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json(
        { error: "Impossible de parser la reponse de l'IA", raw: jsonStr },
        { status: 500 }
      )
    }

    // Validate basic structure
    if (!result.categories || !Array.isArray(result.categories)) {
      return NextResponse.json(
        { error: 'Format de reponse invalide', raw: jsonStr },
        { status: 500 }
      )
    }

    // 7. Record import for rate limiting
    await adminClient
      .from('menu_imports')
      .insert({ restaurant_id: restaurant.id })

    return NextResponse.json(result)
  } catch (err) {
    console.error('Menu import error:', err)
    return NextResponse.json(
      { error: "Erreur lors de l'import du menu" },
      { status: 500 }
    )
  }
}
