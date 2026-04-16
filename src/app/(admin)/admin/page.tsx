// src/app/(admin)/admin/page.tsx
export const dynamic = 'force-dynamic'

import { KpiCard } from '@/components/admin/kpi-card'
import { StatusBadge } from '@/components/admin/status-badge'
import { getDashboardStats, getMRR, getMonthlySignups } from '@/lib/admin-data'
import Link from 'next/link'

function formatEur(value: number) {
  return `€ ${value.toLocaleString('pt-PT', { minimumFractionDigits: 0 })}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminDashboard() {
  const [stats, mrr, monthlySignups] = await Promise.all([
    getDashboardStats(),
    getMRR(),
    getMonthlySignups(6),
  ])

  const maxSignups = Math.max(...monthlySignups.map(m => m.count), 1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          {new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="MRR" value={formatEur(mrr)} />
        <KpiCard label="Total restaurantes" value={stats.totalRestaurants} />
        <KpiCard
          label="Em trial"
          value={stats.trialingCount}
          delta={stats.trialExpiringCount > 0 ? `${stats.trialExpiringCount} expiram esta semana` : undefined}
          deltaType="neutral"
        />
        <KpiCard
          label="Churn este mês"
          value={stats.churnThisMonth}
          delta={stats.churnThisMonth > 0 ? 'cancelamentos nos últimos 30d' : undefined}
          deltaType={stats.churnThisMonth > 0 ? 'down' : 'neutral'}
        />
      </div>

      {/* Chart + Donut */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Bar chart */}
        <div className="col-span-2 bg-slate-800 border border-slate-700 rounded-xl">
          <div className="px-5 py-4 border-b border-slate-700 text-sm font-semibold text-slate-200">
            Novos clientes / mês
          </div>
          <div className="flex items-end gap-2 px-5 py-4 h-40">
            {monthlySignups.map(({ month, count }) => (
              <div key={month} className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full bg-blue-600 rounded-t"
                  style={{ height: `${Math.round((count / maxSignups) * 80)}px`, minHeight: count > 0 ? '4px' : '0' }}
                />
                <span className="text-[10px] text-slate-500">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl">
          <div className="px-5 py-4 border-b border-slate-700 text-sm font-semibold text-slate-200">
            Estado das subscrições
          </div>
          <div className="px-5 py-4 flex flex-col gap-3">
            {Object.entries(stats.statusBreakdown).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <StatusBadge status={status as 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive'} />
                <span className="text-sm font-semibold text-slate-300">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trials expiring */}
      {stats.trialExpiringList.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-200">Trials a expirar esta semana</span>
            <Link href="/admin/restaurants?filter=trialing" className="text-xs text-blue-400 hover:underline">
              Ver todos →
            </Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-700">
                <th className="px-5 py-3 text-left">Restaurante</th>
                <th className="px-5 py-3 text-left">Trial expira</th>
                <th className="px-5 py-3 text-left">Estado</th>
                <th className="px-5 py-3 text-left">Ação</th>
              </tr>
            </thead>
            <tbody>
              {stats.trialExpiringList.map(r => (
                <tr key={r.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-5 py-3 text-sm text-slate-300">{r.name}</td>
                  <td className="px-5 py-3 text-sm text-orange-400">{formatDate(r.trial_ends_at)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={r.subscription_status} />
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/restaurants/${r.slug}`} className="text-xs text-blue-400 hover:underline">
                      Gerir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
