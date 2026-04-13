import { cache } from 'react'
import { createClient } from './server'
import type { Restaurant } from '@/types/database'

/**
 * Cached per-request: deduplicates auth.getUser() across middleware, layout, and pages.
 */
export const getUser = cache(async () => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

/**
 * Cached per-request: deduplicates the restaurant query across layout and pages.
 */
export const getRestaurant = cache(async (): Promise<Restaurant | null> => {
  const user = await getUser()
  if (!user) return null

  const supabase = createClient()
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  return restaurant
})
