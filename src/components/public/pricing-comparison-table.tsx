import { Check, X } from 'lucide-react'

type Row = {
  label: string
  essentiel: boolean | string
  pro: boolean | string
  premium: boolean | string
}

const ROWS: Row[] = [
  { label: 'Plats et catégories illimités', essentiel: true, pro: true, premium: true },
  { label: 'QR code personnalisé', essentiel: true, pro: true, premium: true },
  { label: 'Langues', essentiel: '2 (FR+EN)', pro: '3', premium: '3+' },
  { label: 'Allergènes conformes INCO', essentiel: true, pro: true, premium: true },
  { label: 'Import IA (PDF/photo)', essentiel: true, pro: true, premium: true },
  { label: 'Mises à jour temps réel', essentiel: true, pro: true, premium: true },
  { label: 'Menu du jour', essentiel: 'Basique', pro: 'Avancé', premium: 'Avancé' },
  { label: 'Promotions programmables', essentiel: false, pro: true, premium: true },
  { label: 'Filtrage avis Google', essentiel: false, pro: true, premium: true },
  { label: 'Cartes fidélité Wallet', essentiel: false, pro: true, premium: true },
  { label: 'Géolocalisation Wallet', essentiel: false, pro: false, premium: true },
  { label: 'Multi-établissements', essentiel: false, pro: false, premium: true },
  { label: 'Statistiques', essentiel: false, pro: true, premium: true },
  { label: 'Support', essentiel: 'Email', pro: 'WhatsApp 9h-19h', premium: '7j/7 + Account manager' },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-accent/10">
        <Check className="w-3 h-3 text-accent-dark" />
      </span>
    )
  if (value === false) return <X className="w-4 h-4 text-muted/40" />
  return <span className="text-[13px] text-foreground">{value}</span>
}

export function PricingComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead className="sticky top-[140px] bg-background z-30 border-b border-border">
          <tr>
            <th className="py-4 pr-4 text-[13px] font-medium tracking-[0.08em] uppercase text-muted">
              Fonctionnalité
            </th>
            <th className="py-4 px-4 text-center text-[13px] font-medium text-foreground">Essentiel</th>
            <th className="py-4 px-4 text-center text-[13px] font-medium text-primary">Pro</th>
            <th className="py-4 px-4 text-center text-[13px] font-medium text-foreground">Premium</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b border-border/40">
              <td className="py-3 pr-4 text-[14px] text-foreground">{r.label}</td>
              <td className="py-3 px-4 text-center"><Cell value={r.essentiel} /></td>
              <td className="py-3 px-4 text-center"><Cell value={r.pro} /></td>
              <td className="py-3 px-4 text-center"><Cell value={r.premium} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
