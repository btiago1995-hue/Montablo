type KpiCardProps = {
  label: string
  value: string | number
  delta?: string
  deltaType?: 'up' | 'down' | 'neutral'
}

export function KpiCard({ label, value, delta, deltaType = 'neutral' }: KpiCardProps) {
  const deltaColor = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-white/60',
  }[deltaType]

  return (
    <div className="bg-primary-dark border border-white/10 rounded-xl p-5">
      <p className="text-xs uppercase tracking-widest text-white/60 mb-2">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {delta && (
        <p className={`text-xs mt-1 ${deltaColor}`}>{delta}</p>
      )}
    </div>
  )
}
