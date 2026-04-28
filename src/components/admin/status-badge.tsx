import type { Restaurant } from '@/types/database'
type SubscriptionStatus = Restaurant['subscription_status']

const styles: Record<SubscriptionStatus, string> = {
  active: 'bg-emerald-950 text-emerald-400',
  trialing: 'bg-blue-950 text-blue-400',
  past_due: 'bg-orange-950 text-orange-400',
  canceled: 'bg-white/10 text-white/60',
  inactive: 'bg-white/10 text-white/60',
}

const labels: Record<SubscriptionStatus, string> = {
  active: 'Ativo',
  trialing: 'Trial',
  past_due: 'Em atraso',
  canceled: 'Cancelado',
  inactive: 'Inativo',
}

export function StatusBadge({ status }: { status: SubscriptionStatus }) {
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
