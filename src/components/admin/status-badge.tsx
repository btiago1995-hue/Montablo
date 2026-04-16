type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'inactive'

const styles: Record<SubscriptionStatus, string> = {
  active: 'bg-emerald-950 text-emerald-400',
  trialing: 'bg-blue-950 text-blue-400',
  past_due: 'bg-orange-950 text-orange-400',
  canceled: 'bg-slate-800 text-slate-500',
  inactive: 'bg-slate-800 text-slate-500',
}

const labels: Record<SubscriptionStatus, string> = {
  active: 'Actif',
  trialing: 'Trial',
  past_due: 'En retard',
  canceled: 'Annulé',
  inactive: 'Inactif',
}

export function StatusBadge({ status }: { status: SubscriptionStatus }) {
  return (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
