import Anthropic from '@anthropic-ai/sdk'

export type TargetLang = 'en' | 'de'

const LANG_LABELS: Record<TargetLang, string> = {
  en: 'English',
  de: 'German',
}

/**
 * Batch translate multiple French texts to a target language using Anthropic Claude.
 * Returns a map of input-key → translated text (or null if translation failed).
 *
 * Used by the menu manager and daily-menu editor to fill _en / _de columns
 * automatically when the restaurant adds or edits an item in French.
 */
export async function translateBatch(
  texts: Record<string, string>,
  targetLang: TargetLang = 'en'
): Promise<Record<string, string | null>> {
  const entries = Object.entries(texts).filter(([, v]) => v?.trim())
  if (entries.length === 0) return {}

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return Object.fromEntries(entries.map(([k]) => [k, null] as const))
  }

  const anthropic = new Anthropic({ apiKey })
  const targetName = LANG_LABELS[targetLang]

  const systemPrompt = `Tu es un traducteur spécialisé dans les menus de restaurant français. Tu traduis du français vers ${targetName} en respectant ces règles :
- Préserve les noms régionaux français qui n'ont pas d'équivalent direct (tartiflette, fondue savoyarde, Côtes du Rhône, etc.). Tu peux ajouter une brève précision entre parenthèses si utile.
- Conserve les accents et la ponctuation française quand ils restent pertinents.
- Garde le ton concis, appétissant, professionnel d'un menu de restaurant.
- Ne traduis pas une chaîne vide : retourne une chaîne vide.
Tu reçois un tableau JSON ordonné de chaînes en français. Tu retournes EXACTEMENT le même tableau JSON dans le même ordre, mais traduit en ${targetName}, sans aucun texte additionnel ni bloc markdown.`

  try {
    const sources = entries.map(([, v]) => v)
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: 'user', content: JSON.stringify(sources) }],
    })

    const block = response.content.find((c) => c.type === 'text')
    if (!block || block.type !== 'text') return {}

    const cleaned = block.text
      .trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    const parsed = JSON.parse(cleaned)
    if (
      !Array.isArray(parsed) ||
      parsed.length !== sources.length ||
      parsed.some((t) => typeof t !== 'string')
    ) {
      return {}
    }

    return Object.fromEntries(
      entries.map(([k], i) => [k, (parsed[i] as string).trim() || null] as const)
    )
  } catch {
    return Object.fromEntries(entries.map(([k]) => [k, null] as const))
  }
}
