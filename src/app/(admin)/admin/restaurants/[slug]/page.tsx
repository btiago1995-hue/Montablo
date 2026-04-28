// src/app/(admin)/admin/restaurants/[slug]/page.tsx
export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, ExternalLink, XCircle } from 'lucide-react'
import { getRestaurantBySlug, getRestaurantOwnerEmail, getRestaurantStats } from '@/lib/admin-data'
import { StatusBadge } from '@/components/admin/status-badge'
import { EmailModal } from '@/components/admin/email-modal'
import { ConfirmDialog } from '@/components/admin/confirm-dialog'
import { extendTrial, sendManualEmail, cancelSubscription } from './actions'

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
}

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default async function RestaurantDetailPage({ params }: { params: { slug: string } }) {
  const restaurant = await getRestaurantBySlug(params.slug)
  if (!restaurant) notFound()

  const [ownerEmail, stats] = await Promise.all([
    getRestaurantOwnerEmail(restaurant.owner_id),
    getRestaurantStats(restaurant.id),
  ])

  // Build timeline events from known data points
  const timeline = [
    { label: 'Conta criada', date: restaurant.created_at, color: 'bg-blue-500' },
    stats.firstImportAt ? { label: `Menu importado — ${stats.itemCount} itens`, date: stats.firstImportAt, color: 'bg-emerald-500' } : null,
    restaurant.onboarding_step === 'complete' ? { label: 'Onboarding completo', date: restaurant.updated_at, color: 'bg-blue-500' } : null,
    restaurant.subscription_status === 'active' ? { label: 'Subscrição activada', date: restaurant.updated_at, color: 'bg-emerald-500' } : null,
    restaurant.subscription_status === 'canceled' ? { label: 'Subscrição cancelada', date: restaurant.updated_at, color: 'bg-red-500' } : null,
  ].filter(Boolean).sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime())

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div>
      <p className="text-xs text-white/60 mb-4">
        <Link href="/admin/restaurants" className="text-accent hover:underline">Restaurantes</Link>
        {' / '}{restaurant.name}
      </p>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-lg font-bold text-primary flex-shrink-0">
          {initials(restaurant.name)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">
            {restaurant.name}
            <span className="ml-2 align-middle">
              <StatusBadge status={restaurant.subscription_status} />
            </span>
          </h1>
          <p className="text-sm text-white/60 mt-0.5">
            {restaurant.slug} · Criado a {formatDate(restaurant.created_at)}
            {restaurant.subscription_status === 'trialing' && restaurant.trial_ends_at && (
              <> · Trial expira a <span className={new Date(restaurant.trial_ends_at) < new Date() ? 'text-red-400' : 'text-orange-400'}>
                {formatDate(restaurant.trial_ends_at)}
              </span></>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left: info + timeline */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Info */}
          <div className="bg-primary-dark border border-white/10 rounded-xl">
            <div className="px-5 py-3 border-b border-white/10 text-sm font-semibold text-white/80">Informação</div>
            <div className="p-5 grid grid-cols-2 gap-4">
              {[
                { label: 'Email do owner', value: ownerEmail ?? '—' },
                { label: 'Subscrição', value: restaurant.subscription_status },
                { label: 'Stripe Customer', value: restaurant.stripe_customer_id ?? '—' },
                { label: 'Idiomas', value: restaurant.languages?.join(', ') || '—' },
                { label: 'Categorias', value: `${stats.categoryCount}` },
                { label: 'Itens de menu', value: `${stats.itemCount}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-wider text-white/60 mb-0.5">{label}</p>
                  <p className="text-sm text-white/90">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-primary-dark border border-white/10 rounded-xl">
            <div className="px-5 py-3 border-b border-white/10 text-sm font-semibold text-white/80">Histórico</div>
            <div className="px-5 py-3 flex flex-col gap-0">
              {timeline.map((event, i) => (
                <div key={i} className="flex gap-3 py-2.5 border-b border-white/10 last:border-b-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${event!.color}`} />
                  <div>
                    <p className="text-sm text-white/90">{event!.label}</p>
                    <p className="text-xs text-white/60 mt-0.5">{formatDate(event!.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="bg-primary-dark border border-white/10 rounded-xl h-fit">
          <div className="px-5 py-3 border-b border-white/10 text-sm font-semibold text-white/80">Ações</div>
          <div className="p-4 flex flex-col gap-2">
            <ConfirmDialog
              label="Estender trial 7 dias"
              description={`Vai estender o trial de "${restaurant.name}" por 7 dias a partir de agora.`}
              confirmLabel="Estender"
              icon={<Clock className="w-4 h-4" />}
              onConfirm={extendTrial.bind(null, restaurant.id, restaurant.slug)}
            />

            {ownerEmail && (
              <EmailModal onSend={sendManualEmail.bind(null, ownerEmail)} />
            )}

            <a
              href={`${siteUrl}/${restaurant.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/5 border border-white/20 text-white/90 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Ver menu público
            </a>

            {restaurant.stripe_subscription_id && (
              <ConfirmDialog
                label="Cancelar subscrição"
                description={`Isto irá cancelar imediatamente a subscrição de "${restaurant.name}" no Stripe. Esta acção não pode ser revertida.`}
                confirmLabel="Confirmar cancelamento"
                variant="danger"
                icon={<XCircle className="w-4 h-4" />}
                onConfirm={cancelSubscription.bind(null, restaurant.id, restaurant.stripe_subscription_id!, restaurant.slug)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
