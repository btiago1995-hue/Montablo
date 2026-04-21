const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const USER_AGENT = 'MonTablo/1.0 (contact@montablo.com)'

export type GeocodeInput = {
  addressLine: string
  city: string | null
  postalCode: string | null
  countryCode: string
}

export type GeocodeResult = {
  latitude: number
  longitude: number
}

export async function geocodeAddress(input: GeocodeInput): Promise<GeocodeResult | null> {
  const parts = [input.addressLine, input.postalCode, input.city, input.countryCode]
    .filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
  const query = parts.join(', ')
  if (!query) return null

  const url = `${NOMINATIM_URL}?q=${encodeURIComponent(query)}&format=json&limit=1`

  let res: Response
  try {
    res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store',
    })
  } catch {
    return null
  }

  if (!res.ok) return null

  const data = (await res.json()) as Array<{ lat: string; lon: string }>
  if (!Array.isArray(data) || data.length === 0) return null

  const first = data[0]
  const latitude = Number(first.lat)
  const longitude = Number(first.lon)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null

  return { latitude, longitude }
}
