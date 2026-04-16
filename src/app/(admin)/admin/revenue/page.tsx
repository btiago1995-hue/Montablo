// src/app/(admin)/admin/revenue/page.tsx
export const dynamic = 'force-dynamic'

import { KpiCard } from '@/components/admin/kpi-card'
import { getMRR, getActiveStripeSubscriptions, getMonthlySignups, getAllRestaurants } from '@/lib/admin-data'

function formatEur(value: number) {
  return `€ ${value.toLocaleString('pt-PT', { minimumFractionDigits: 0 })}`
}

export default async function RevenuePage() {
  const [mrr, subscriptions, allRestaurants, monthlySignups] = await Promise.all([
    getMRR(),
    getActiveStripeSubscriptions(),
    getAllRestaurants(),
    getMonthlySignups(12),
  ])

  const payingCount = allRestaurants.filter(r => r.subscription_status === 'active').length
  const arr = mrr * 12
  const arpu = payingCount > 0 ? mrr / payingCount : 0
  const maxSignups = Math.max(...monthlySignups.map(m => m.count), 1)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Receita</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard label="MRR" value={formatEur(mrr)} />
        <KpiCard label="ARR" value={formatEur(arr)} />
        <KpiCard label="Clientes pagantes" value={payingCount} />
        <KpiCard label="ARPU" value={formatEur(arpu)} />
      </div>

      {/* Monthly signups chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl mb-6">
        <div className="px-5 py-4 border-b border-slate-700 text-sm font-semibold text-slate-200">
          Novos clientes — últimos 12 meses
        </div>
        <div className="flex items-end gap-2 px-5 py-4 h-48">
          {monthlySignups.map(({ month, count }) => (
            <div key={month} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-xs text-slate-400">{count > 0 ? count : ''}</span>
              <div
                className="w-full bg-blue-600 rounded-t"
                style={{ height: `${Math.round((count / maxSignups) * 100)}px`, minHeight: count > 0 ? '4px' : '0' }}
              />
              <span className="text-[9px] text-slate-500 rotate-45 origin-left ml-2">{month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active subscriptions table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <div className="px-5 py-4 border-b border-slate-700 text-sm font-semibold text-slate-200">
          Subscrições activas ({subscriptions.length})
        </div>
        {subscriptions.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-10">Nenhuma subscrição activa no Stripe.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-700">
                <th className="px-5 py-3 text-left">Restaurante</th>
                <th className="px-5 py-3 text-left">Plano</th>
                <th className="px-5 py-3 text-left">Valor</th>
                <th className="px-5 py-3 text-left">Início</th>
                <th className="px-5 py-3 text-left">Próx. cobrança</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map(sub => (
                <tr key={sub.slug} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-5 py-3 text-sm text-slate-300">{sub.restaurantName}</td>
                  <td className="px-5 py-3 text-sm text-slate-400">{sub.interval}</td>
                  <td className="px-5 py-3 text-sm text-slate-200 font-medium">{formatEur(sub.amountEur)}</td>
                  <td className="px-5 py-3 text-sm text-slate-400">{sub.startDate}</td>
                  <td className="px-5 py-3 text-sm text-slate-400">{sub.currentPeriodEnd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
