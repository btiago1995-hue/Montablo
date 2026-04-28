// src/app/(admin)/admin/restaurants/page.tsx
export const dynamic = 'force-dynamic'

import { getAllRestaurants } from '@/lib/admin-data'
import { StatusBadge } from '@/components/admin/status-badge'
import Link from 'next/link'
import type { Restaurant } from '@/types/database'

type SearchParams = { filter?: string }

const filterLabels: Record<'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive', string> = {
  active: 'Ativos',
  trialing: 'Trial',
  past_due: 'Em atraso',
  canceled: 'Cancelados',
  inactive: 'Inativos',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function RestaurantsPage({ searchParams }: { searchParams: SearchParams }) {
  const all = await getAllRestaurants()

  const filter = searchParams.filter
  const restaurants: Restaurant[] = filter
    ? all.filter(r => r.subscription_status === filter)
    : all

  const statuses = ['active', 'trialing', 'past_due', 'canceled', 'inactive'] as const

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Restaurantes</h1>
        <p className="text-sm text-white/60 mt-1">{all.length} no total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        <Link
          href="/admin/restaurants"
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !filter ? 'bg-accent text-primary border-accent' : 'border-white/20 text-white/70 hover:border-white/50'
          }`}
        >
          Todos ({all.length})
        </Link>
        {statuses.map(s => {
          const count = all.filter(r => r.subscription_status === s).length
          if (count === 0) return null
          return (
            <Link
              key={s}
              href={`/admin/restaurants?filter=${s}`}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filter === s ? 'bg-accent text-primary border-accent' : 'border-white/20 text-white/70 hover:border-white/50'
              }`}
            >
              {filterLabels[s]} ({count})
            </Link>
          )
        })}
      </div>

      <div className="bg-primary-dark border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-white/60 border-b border-white/10 bg-white/5">
              <th className="px-5 py-3 text-left">Restaurante</th>
              <th className="px-5 py-3 text-left">Estado</th>
              <th className="px-5 py-3 text-left">Trial expira</th>
              <th className="px-5 py-3 text-left">Criado em</th>
              <th className="px-5 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="px-5 py-3">
                  <p className="text-sm font-medium text-white/90">{r.name}</p>
                  <p className="text-xs text-white/50">{r.slug}</p>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={r.subscription_status} />
                </td>
                <td className="px-5 py-3 text-sm text-white/70">
                  {r.subscription_status === 'trialing'
                    ? <span className={new Date(r.trial_ends_at) < new Date() ? 'text-red-400' : 'text-white/70'}>
                        {formatDate(r.trial_ends_at)}
                      </span>
                    : '—'}
                </td>
                <td className="px-5 py-3 text-sm text-white/70">{formatDate(r.created_at)}</td>
                <td className="px-5 py-3">
                  <Link href={`/admin/restaurants/${r.slug}`} className="text-xs text-accent hover:underline">
                    Ver →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {restaurants.length === 0 && (
          <p className="text-sm text-white/60 text-center py-10">Nenhum restaurante encontrado.</p>
        )}
      </div>
    </div>
  )
}
