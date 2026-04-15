import { createClient } from '@/lib/supabase/server'
import { getRestaurant } from '@/lib/supabase/cached'
import Link from 'next/link'
import { ExternalLink, Plus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

function formatFrenchDate(): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

export default async function DashboardPage() {
  const supabase = createClient()
  const restaurant = (await getRestaurant())!

  // Run all independent queries in parallel
  const [
    { count: itemCount },
    { count: categoryCount },
    { count: promoCount },
    { data: reviews },
    { data: recentItems },
    { data: allCategories },
  ] = await Promise.all([
    supabase
      .from('items')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant!.id)
      .eq('is_available', true),
    supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurant!.id),
    supabase
      .from('promotions')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase
      .from('reviews')
      .select('rating')
      .eq('restaurant_id', restaurant!.id),
    supabase
      .from('items')
      .select('id, name_fr, price, image_url, is_available, category_id, tags, created_at')
      .eq('restaurant_id', restaurant!.id)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('categories')
      .select('id, name_fr')
      .eq('restaurant_id', restaurant!.id),
  ])

  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0
    ? (reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount)
    : 0

  const catMap = new Map(allCategories?.map((c) => [c.id, c.name_fr]) ?? [])

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div>
          <h1 className="font-serif text-[28px] tracking-tight text-foreground mb-1">
            {restaurant!.name}
          </h1>
          <p className="text-sm text-muted capitalize">{formatFrenchDate()}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/menu/${restaurant!.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 border-[1.5px] border-border rounded-lg text-sm font-semibold text-foreground hover:bg-white hover:border-muted-light transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Voir mon menu</span>
            <span className="sm:hidden">Menu</span>
          </Link>
          <Link
            href="/dashboard/menu"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-light transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter un plat</span>
            <span className="sm:hidden">Plat</span>
          </Link>
        </div>
      </div>

      {/* Stat bar */}
      <div className="bg-white border border-border rounded-xl p-4 sm:px-5 mb-5">
        {/* Desktop: single row */}
        <div className="hidden sm:flex items-center">
          <div className="flex items-center gap-5 flex-1">
            <div>
              <div className="text-[26px] font-bold tracking-tight text-foreground leading-none">
                {itemCount ?? 0}
              </div>
              <div className="text-[11px] text-muted-light mt-0.5">plats actifs</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="text-[26px] font-bold tracking-tight text-foreground leading-none">
                {categoryCount ?? 0}
              </div>
              <div className="text-[11px] text-muted-light mt-0.5">catégories</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="text-[26px] font-bold tracking-tight text-foreground leading-none">
                {promoCount ?? 0}
              </div>
              <div className="text-[11px] text-muted-light mt-0.5">promos</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-bold tracking-tight text-foreground leading-none">
                  {reviewCount > 0 ? avgRating.toFixed(1) : '—'}
                </span>
                <span className="text-[13px] text-[#FBBC04]">★</span>
              </div>
              <div className="text-[11px] text-muted-light mt-0.5">
                {reviewCount} avis
              </div>
            </div>
          </div>
          <div className="flex gap-1.5 ml-4">
            <Link
              href="/dashboard/daily-menu"
              className="bg-background border border-border rounded-lg px-3.5 py-2 text-xs font-medium text-primary hover:bg-white transition-colors"
            >
              Menu du jour
            </Link>
            <Link
              href="/dashboard/qr-code"
              className="bg-background border border-border rounded-lg px-3.5 py-2 text-xs font-medium text-primary hover:bg-white transition-colors"
            >
              QR Code
            </Link>
          </div>
        </div>

        {/* Mobile: 2x2 grid + links row */}
        <div className="sm:hidden">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-[24px] font-bold tracking-tight text-foreground leading-none">
                {itemCount ?? 0}
              </div>
              <div className="text-xs text-muted-light mt-1">plats actifs</div>
            </div>
            <div>
              <div className="text-[24px] font-bold tracking-tight text-foreground leading-none">
                {categoryCount ?? 0}
              </div>
              <div className="text-xs text-muted-light mt-1">catégories</div>
            </div>
            <div>
              <div className="text-[24px] font-bold tracking-tight text-foreground leading-none">
                {promoCount ?? 0}
              </div>
              <div className="text-xs text-muted-light mt-1">promos</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-[24px] font-bold tracking-tight text-foreground leading-none">
                  {reviewCount > 0 ? avgRating.toFixed(1) : '—'}
                </span>
                <span className="text-sm text-[#FBBC04]">★</span>
              </div>
              <div className="text-xs text-muted-light mt-1">
                {reviewCount} avis
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-3 border-t border-border">
            <Link
              href="/dashboard/daily-menu"
              className="flex-1 text-center bg-background border border-border rounded-lg px-3 py-2.5 text-sm font-medium text-primary"
            >
              Menu du jour
            </Link>
            <Link
              href="/dashboard/qr-code"
              className="flex-1 text-center bg-background border border-border rounded-lg px-3 py-2.5 text-sm font-medium text-primary"
            >
              QR Code
            </Link>
          </div>
        </div>
      </div>

      {/* Items section */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-border">
          <span className="font-serif text-base font-semibold text-foreground">Mes plats</span>
          <Link
            href="/dashboard/menu"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Gérer la carte →
          </Link>
        </div>

        {recentItems && recentItems.length > 0 ? (
          <>
            {/* Mobile: compact list */}
            <div className="sm:hidden divide-y divide-border/30">
              {recentItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3.5 ${
                    !item.is_available ? 'opacity-50' : ''
                  }`}
                >
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt=""
                      className="w-11 h-11 rounded-lg object-cover bg-background flex-shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-background flex items-center justify-center text-muted-light text-base flex-shrink-0">
                      🍽️
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{item.name_fr}</div>
                    <div className="text-xs text-muted-light">
                      {item.category_id ? catMap.get(item.category_id) ?? '—' : '—'}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(item.price)}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.is_available ? 'bg-[#2D6A4F]' : 'bg-muted-light'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: full table */}
            <div className="hidden sm:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-background">
                    <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border">
                      Plat
                    </th>
                    <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border w-[80px]">
                      Prix
                    </th>
                    <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border w-[80px]">
                      Tags
                    </th>
                    <th className="text-left px-5 py-2.5 text-[11px] uppercase tracking-[0.08em] text-muted-light font-semibold border-b border-border w-[70px]">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentItems.map((item) => (
                    <tr
                      key={item.id}
                      className={`border-b border-border/30 last:border-b-0 hover:bg-background/50 transition-colors ${
                        !item.is_available ? 'opacity-50' : ''
                      }`}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {item.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image_url}
                              alt=""
                              className="w-9 h-9 rounded-lg object-cover bg-background"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-muted-light text-sm">
                              🍽️
                            </div>
                          )}
                          <div>
                            <div className="text-[13px] font-semibold text-foreground">{item.name_fr}</div>
                            <div className="text-[11px] text-muted-light">
                              {item.category_id ? catMap.get(item.category_id) ?? '—' : '—'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[13px] font-semibold text-foreground">
                          {formatPrice(item.price)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1 flex-wrap">
                          {item.tags?.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-surface text-muted uppercase tracking-wide"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            item.is_available
                              ? 'bg-[#E8F5E9] text-[#2D6A4F]'
                              : 'bg-background text-muted-light'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.is_available ? 'bg-[#2D6A4F]' : 'bg-muted-light'
                            }`}
                          />
                          {item.is_available ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="px-4 sm:px-5 py-8 text-center text-muted-light text-sm">
            Aucun plat pour l&apos;instant.{' '}
            <Link href="/dashboard/menu" className="text-primary font-semibold hover:underline">
              Ajouter votre premier plat
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
