/**
 * One-off: re-sync ALL Google Wallet loyalty classes with the latest
 * field set (APPROVED status, localized fields, linksModuleData, etc.).
 *
 * Run: npx tsx scripts/resync-google-wallet-classes.ts [--only=<restaurantId>]
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Lightweight .env loader (avoids dotenv dep)
const envContent = readFileSync(resolve(process.cwd(), '.env.production.tmp'), 'utf8')
for (const line of envContent.split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)="?(.*?)"?$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2]
}

import { createClient } from '@supabase/supabase-js'
import { syncWalletClassesForRestaurant } from '../src/lib/loyalty/wallet-sync'

async function main() {
  const onlyArg = process.argv.find(a => a.startsWith('--only='))?.split('=')[1]

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  let query = sb.from('restaurants').select('id, name, slug')
  if (onlyArg) query = query.eq('id', onlyArg)

  const { data: restaurants, error } = await query
  if (error) throw error
  if (!restaurants || restaurants.length === 0) {
    console.log('No restaurants found')
    return
  }

  console.log(`Re-syncing ${restaurants.length} restaurant(s)...`)

  let ok = 0
  let skipped = 0
  let failed = 0

  for (const r of restaurants) {
    process.stdout.write(`[${r.slug}] ${r.name} ... `)
    try {
      // Filter restaurants with at least one loyalty program
      const { data: programs } = await sb
        .from('loyalty_programs')
        .select('id')
        .eq('restaurant_id', r.id)
        .limit(1)
      if (!programs || programs.length === 0) {
        console.log('skipped (no program)')
        skipped++
        continue
      }
      await syncWalletClassesForRestaurant(r.id)
      console.log('ok')
      ok++
    } catch (err) {
      console.log(`FAILED: ${(err as Error).message}`)
      failed++
    }
  }

  console.log(`\nDone. ok=${ok} skipped=${skipped} failed=${failed}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
