import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ExternalLink, Plus, UtensilsCrossed, FolderOpen, Tag, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user!.id)
    .single()

  const { count: itemCount } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant!.id)
    .eq('is_available', true)

  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant!.id)

  const { count: promoCount } = await supabase
    .from('promotions')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // Reviews metrics
  const { data: reviews } = await supabase
    .from('reviews')
    .select('rating')
    .eq('restaurant_id', restaurant!.id)

  const reviewCount = reviews?.length ?? 0
  const avgRating = reviewCount > 0
    ? (reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount)
    : 0
  const distribution = [0, 0, 0, 0, 0]
  reviews?.forEach((r) => { distribution[r.rating - 1]++ })

  // Recent items for the table
  const { data: recentItems } = await supabase
    .from('items')
    .select('*')
    .eq('restaurant_id', restaurant!.id)
    .order('created_at', { ascending: false })
    .limit(6)

  // Get categories for display
  const { data: allCategories } = await supabase
    .from('categories')
    .select('id, name_fr')
    .eq('restaurant_id', restaurant!.id)

  const catMap = new Map(allCategories?.map((c) => [c.id, c.name_fr]) ?? [])

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="font-serif text-[28px] tracking-tight text-[#1A1A1A] mb-1">Tableau de bord</h1>
          <p className="text-sm text-[#6B6B6B]">Gérez votre menu en temps réel</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/menu/${restaurant!.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 border-[1.5px] border-[#E8E8E4] rounded-lg text-sm font-semibold text-[#1A1A1A] hover:bg-white hover:border-[#9B9B9B] transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Voir mon menu</span>
            <span className="sm:hidden">Menu</span>
          </Link>
          <Link
            href="/dashboard/menu"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2C3E2D] text-white rounded-lg text-sm font-semibold hover:bg-[#243324] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter un plat</span>
            <span className="sm:hidden">Plat</span>
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-7">
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-3 sm:p-5 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="text-[10px] sm:text-[12px] text-[#9B9B9B] uppercase tracking-[0.06em] font-semibold leading-tight">Plats actifs</div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#2C3E2D]/[0.07] flex-shrink-0 flex items-center justify-center">
              <UtensilsCrossed className="w-3 h-3 sm:w-4 sm:h-4 text-[#2C3E2D]" />
            </div>
          </div>
          <div className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#1A1A1A]">{itemCount ?? 0}</div>
        </div>
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-3 sm:p-5 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="text-[10px] sm:text-[12px] text-[#9B9B9B] uppercase tracking-[0.06em] font-semibold leading-tight">Catégories</div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#2C3E2D]/[0.07] flex-shrink-0 flex items-center justify-center">
              <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 text-[#2C3E2D]" />
            </div>
          </div>
          <div className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#1A1A1A]">{categoryCount ?? 0}</div>
        </div>
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-3 sm:p-5 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="text-[10px] sm:text-[12px] text-[#9B9B9B] uppercase tracking-[0.06em] font-semibold leading-tight">Promotions</div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#D4A574]/[0.12] flex-shrink-0 flex items-center justify-center">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4A574]" />
            </div>
          </div>
          <div className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#1A1A1A]">{promoCount ?? 0}</div>
        </div>
      </div>

      {/* Reviews metrics */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl p-4 sm:p-5 mb-7">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-[#FBBC04]" />
          <span className="text-[14px] font-semibold text-[#1A1A1A]">Avis clients</span>
          <span className="text-[12px] text-[#9B9B9B] ml-auto">{reviewCount} avis</span>
        </div>
        {reviewCount > 0 ? (
          <div className="flex items-center gap-6">
            {/* Average */}
            <div className="text-center shrink-0">
              <div className="text-[32px] font-bold tracking-tight text-[#1A1A1A]">{avgRating.toFixed(1)}</div>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24"
                    fill={s <= Math.round(avgRating) ? '#FBBC04' : 'none'}
                    stroke={s <= Math.round(avgRating) ? '#FBBC04' : '#D1D5DB'}
                    strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
            {/* Distribution bars */}
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[star - 1]
                const pct = reviewCount > 0 ? (count / reviewCount) * 100 : 0
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-[11px] text-[#9B9B9B] w-4 text-right">{star}</span>
                    <div className="flex-1 h-2 bg-[#F0EDE8] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: star >= 4 ? '#FBBC04' : star === 3 ? '#F59E0B' : '#EF4444' }}
                      />
                    </div>
                    <span className="text-[11px] text-[#9B9B9B] w-6">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#9B9B9B] text-center py-4">
            Aucun avis pour l&apos;instant. Les avis apparaitront ici quand vos clients evalueront votre menu.
          </p>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-7">
        <Link href="/dashboard/daily-menu" className="bg-white border-[1.5px] border-dashed border-[#E8E8E4] rounded-xl p-3 sm:p-5 text-center hover:border-[#2C3E2D] hover:border-solid hover:bg-[#F8F8F5] transition-all">
          <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📋</div>
          <div className="text-[11px] sm:text-[13px] font-semibold text-[#1A1A1A]">Menu du jour</div>
          <div className="text-[10px] sm:text-[12px] text-[#9B9B9B] mt-0.5 hidden sm:block">Configurer pour aujourd&apos;hui</div>
        </Link>
        <Link href="/dashboard/promotions" className="bg-white border-[1.5px] border-dashed border-[#E8E8E4] rounded-xl p-3 sm:p-5 text-center hover:border-[#2C3E2D] hover:border-solid hover:bg-[#F8F8F5] transition-all">
          <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🏷️</div>
          <div className="text-[11px] sm:text-[13px] font-semibold text-[#1A1A1A]">Nouvelle promo</div>
          <div className="text-[10px] sm:text-[12px] text-[#9B9B9B] mt-0.5 hidden sm:block">Créer une promotion</div>
        </Link>
        <Link href="/dashboard/qr-code" className="bg-white border-[1.5px] border-dashed border-[#E8E8E4] rounded-xl p-3 sm:p-5 text-center hover:border-[#2C3E2D] hover:border-solid hover:bg-[#F8F8F5] transition-all">
          <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📱</div>
          <div className="text-[11px] sm:text-[13px] font-semibold text-[#1A1A1A]">QR Code</div>
          <div className="text-[10px] sm:text-[12px] text-[#9B9B9B] mt-0.5 hidden sm:block">Télécharger / imprimer</div>
        </Link>
      </div>

      {/* Recent items table */}
      <div className="bg-white border border-[#E8E8E4] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E8E4]">
          <span className="text-[16px] font-semibold text-[#1A1A1A]">Mes plats</span>
          <Link
            href="/dashboard/menu"
            className="text-[13px] font-semibold text-[#2C3E2D] hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FAFAF7]">
                <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.08em] text-[#9B9B9B] font-semibold border-b border-[#E8E8E4]">Plat</th>
                <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.08em] text-[#9B9B9B] font-semibold border-b border-[#E8E8E4]">Prix</th>
                <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.08em] text-[#9B9B9B] font-semibold border-b border-[#E8E8E4]">Tags</th>
                <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.08em] text-[#9B9B9B] font-semibold border-b border-[#E8E8E4]">Disponible</th>
              </tr>
            </thead>
            <tbody>
              {recentItems && recentItems.length > 0 ? (
                recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAFAF7] border-b border-[#E8E8E4] last:border-b-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {item.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image_url}
                            alt=""
                            className="w-11 h-11 rounded-lg object-cover bg-[#F5F5F2]"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-[#F5F5F2] flex items-center justify-center text-[#9B9B9B] text-lg">
                            🍽️
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-[#1A1A1A]">{item.name_fr}</div>
                          <div className="text-[12px] text-[#9B9B9B]">
                            {item.category_id ? catMap.get(item.category_id) ?? '—' : '—'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1 flex-wrap">
                        {item.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F0EDE8] text-[#6B6B6B] uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full ${
                        item.is_available
                          ? 'bg-[#E8F5E9] text-[#2D6A4F]'
                          : 'bg-[#F5F5F2] text-[#9B9B9B]'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.is_available ? 'bg-[#2D6A4F]' : 'bg-[#9B9B9B]'}`} />
                        {item.is_available ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-[#9B9B9B] text-sm">
                    Aucun plat pour l&apos;instant.{' '}
                    <Link href="/dashboard/menu" className="text-[#2C3E2D] font-semibold hover:underline">
                      Ajouter votre premier plat
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
