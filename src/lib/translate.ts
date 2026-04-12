const MYMEMORY_URL = 'https://api.mymemory.translated.net/get'

/**
 * Translate French text to English using MyMemory free API.
 * Falls back to null if translation fails (graceful degradation).
 * Free tier: 1000 requests/day, no API key needed.
 */
export async function translateFrToEn(text: string): Promise<string | null> {
  if (!text || !text.trim()) return null

  try {
    const params = new URLSearchParams({
      q: text.trim(),
      langpair: 'fr|en',
    })

    const res = await fetch(`${MYMEMORY_URL}?${params}`, {
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) return null

    const data = await res.json()

    if (data.responseStatus !== 200) return null

    const translated = data.responseData?.translatedText
    if (!translated) return null

    // MyMemory sometimes returns the input unchanged for short phrases
    // or returns all-caps. Clean it up.
    const cleaned = translated.trim()
    if (cleaned.toLowerCase() === text.trim().toLowerCase()) return null

    return cleaned
  } catch {
    return null
  }
}

/**
 * Batch translate multiple French texts to English.
 * Returns a map of original → translated.
 */
export async function translateBatch(
  texts: Record<string, string>
): Promise<Record<string, string | null>> {
  const entries = Object.entries(texts).filter(([, v]) => v?.trim())
  const results = await Promise.all(
    entries.map(async ([key, value]) => {
      const translated = await translateFrToEn(value)
      return [key, translated] as const
    })
  )
  return Object.fromEntries(results)
}
