import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MenuContent } from '@/components/public/menu-content'
import { ReviewPopup } from '@/components/public/review-popup'
import { JsonLd, menuPageJsonLd } from '@/components/seo/json-ld'
import { isSubscriptionActive } from '@/lib/subscription'
import type { Restaurant } from '@/types/database'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name, primary_color')
    .eq('slug', params.slug)
    .single()

  if (!restaurant) return { title: 'Menu introuvable' }

  const ogImageUrl = `/api/og?name=${encodeURIComponent(restaurant.name)}&color=${encodeURIComponent(restaurant.primary_color || '#2C3E2D')}`

  return {
    title: `${restaurant.name} — Menu`,
    description: `Consultez le menu de ${restaurant.name}`,
    openGraph: {
      title: `${restaurant.name} — Menu`,
      description: `Consultez le menu de ${restaurant.name}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${restaurant.name} — Menu`,
      description: `Consultez le menu de ${restaurant.name}`,
      images: [ogImageUrl],
    },
  }
}

export default async function PublicMenuPage({ params }: Props) {
  const supabase = createClient()

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!restaurant) notFound()

  if (!isSubscriptionActive(restaurant as Restaurant)) {
    const primaryColor = restaurant.primary_color || '#2C3E2D'
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            🍽️
          </div>
          <h1 className="font-serif text-2xl text-[#1A1A1A] mb-2">
            {restaurant.name}
          </h1>
          <p className="text-[15px] text-[#6B6B6B] leading-relaxed">
            Ce menu n&apos;est pas disponible actuellement.
          </p>
          <div className="mt-8 inline-flex items-center gap-1.5 text-[11px] text-[#9B9B9B]/60">
            Propulsé par{' '}
            <a href="/" className="text-[#D4A574] font-semibold no-underline hover:text-[#C08E5A] transition-colors">
              MonTablo
            </a>
          </div>
        </div>
      </div>
    )
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .eq('is_visible', true)
    .order('sort_order')

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .order('sort_order')

  const { data: promotions } = await supabase
    .from('promotions')
    .select('*')
    .eq('is_active', true)

  const today = new Date().toISOString().split('T')[0]
  const { data: dailyMenu } = await supabase
    .from('daily_menus')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .eq('valid_date', today)
    .eq('is_active', true)
    .single()

  const primaryColor = restaurant.primary_color || '#2C3E2D'

  const jsonLd = menuPageJsonLd({
    restaurant: { name: restaurant.name, slug: restaurant.slug },
    categories: categories ?? [],
    items: items ?? [],
  })

  return (
    <div className="min-h-screen bg-[#FAFAF7] max-w-[430px] mx-auto relative">
      <JsonLd data={jsonLd} />
      {/* Cover */}
      <div className="relative h-[240px] overflow-hidden">
        {restaurant.cover_url ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restaurant.cover_url}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/65" />
          </>
        ) : (
          <div
            className="w-full h-full"
            style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}BB 50%, ${primaryColor}77 100%)` }}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {restaurant.logo_url ? (
            <div className="w-[52px] h-[52px] rounded-xl bg-white flex items-center justify-center mb-3 shadow-lg overflow-hidden ring-2 ring-white/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={restaurant.logo_url} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-3 shadow-lg text-2xl ring-2 ring-white/20"
              style={{ backgroundColor: `${primaryColor}40` }}
            >
              🍽️
            </div>
          )}
          <h1 className="font-serif text-[28px] leading-tight tracking-tight drop-shadow-sm">
            {restaurant.name}
          </h1>
        </div>
      </div>

      <MenuContent
        categories={categories ?? []}
        items={items ?? []}
        promotions={promotions ?? []}
        dailyMenu={dailyMenu}
        unavailableBehavior={restaurant.unavailable_behavior}
        primaryColor={primaryColor}
      />

      {/* Review popup */}
      {restaurant.google_review_url && (
        <ReviewPopup
          restaurantId={restaurant.id}
          googleReviewUrl={restaurant.google_review_url}
          restaurantName={restaurant.name}
          logoUrl={restaurant.logo_url}
          primaryColor={primaryColor}
        />
      )}

      {/* Footer */}
      <footer className="text-center py-10 px-4 border-t border-[#E8E8E4] mt-4">
        <div className="text-[12px] text-[#9B9B9B]">
          Les prix sont en euros, TTC
        </div>
        <div className="inline-flex items-center gap-1.5 mt-3 text-[11px] text-[#9B9B9B]/60">
          Propulsé par{' '}
          <a href="/" className="text-[#D4A574] font-semibold no-underline hover:text-[#C08E5A] transition-colors">
            MonTablo
          </a>
        </div>
      </footer>
    </div>
  )
}
