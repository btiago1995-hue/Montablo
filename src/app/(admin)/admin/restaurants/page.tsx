// src/app/(admin)/admin/restaurants/page.tsx
import { getAllRestaurants } from '@/lib/admin-data'
import { StatusBadge } from '@/components/admin/status-badge'
import Link from 'next/link'
import type { Restaurant } from '@/types/database'

type SearchParams = { filter?: string }

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
        <h1 className="text-2xl font-bold text-slate-100">Restaurantes</h1>
        <p className="text-sm text-slate-500 mt-1">{all.length} no total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        <Link
          href="/admin/restaurants"
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !filter ? 'bg-blue-700 text-white border-blue-700' : 'border-slate-600 text-slate-400 hover:border-slate-400'
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
                filter === s ? 'bg-blue-700 text-white border-blue-700' : 'border-slate-600 text-slate-400 hover:border-slate-400'
              }`}
            >
              {s === 'active' ? 'Activos' : s === 'trialing' ? 'Trial' : s === 'past_due' ? 'Em atraso' : s === 'canceled' ? 'Cancelados' : 'Inactivos'} ({count})
            </Link>
          )
        })}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-700 bg-slate-800/50">
              <th className="px-5 py-3 text-left">Restaurante</th>
              <th className="px-5 py-3 text-left">Estado</th>
              <th className="px-5 py-3 text-left">Trial expira</th>
              <th className="px-5 py-3 text-left">Criado em</th>
              <th className="px-5 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map(r => (
              <tr key={r.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="px-5 py-3">
                  <p className="text-sm font-medium text-slate-200">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.slug}</p>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={r.subscription_status} />
                </td>
                <td className="px-5 py-3 text-sm text-slate-400">
                  {r.subscription_status === 'trialing'
                    ? <span className={new Date(r.trial_ends_at) < new Date() ? 'text-red-400' : 'text-slate-400'}>
                        {formatDate(r.trial_ends_at)}
                      </span>
                    : '—'}
                </td>
                <td className="px-5 py-3 text-sm text-slate-400">{formatDate(r.created_at)}</td>
                <td className="px-5 py-3">
                  <Link href={`/admin/restaurants/${r.slug}`} className="text-xs text-blue-400 hover:underline">
                    Ver →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {restaurants.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-10">Nenhum restaurante encontrado.</p>
        )}
      </div>
    </div>
  )
}
