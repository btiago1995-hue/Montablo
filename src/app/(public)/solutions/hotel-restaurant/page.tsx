import Link from 'next/link'
import { ArrowRight, Languages, LayoutList, Wallet } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { PublicNav, PublicFooter, EYEBROW, BTN_PRIMARY, BTN_SECONDARY } from '@/components/public/site-chrome'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu digital pour hôtels-restaurants — MonTablo',
  description:
    'Petit-déjeuner, déjeuner, dîner, room service : 4 cartes en 3 langues, gérées en un seul tableau de bord. Pour les hôtels-restaurants à clientèle internationale.',
  alternates: { canonical: '/solutions/hotel-restaurant' },
  openGraph: {
    title: 'Menu digital pour hôtels-restaurants — MonTablo',
    description:
      '4 cartes en 3 langues, gérées en un seul tableau de bord.',
  },
}

const features = [
  {
    icon: Languages,
    title: 'Multilingue FR / EN / DE',
    description:
      'Vos clients suisses, allemands, britanniques ou américains lisent votre carte dans leur langue. Traduction automatique, pas d’application à télécharger.',
  },
  {
    icon: LayoutList,
    title: 'Multi-cartes',
    description:
      'Petit-déjeuner, déjeuner, dîner, room service, bar de l’hôtel : créez autant de cartes que nécessaire et activez la bonne au bon moment.',
  },
  {
    icon: Wallet,
    title: 'Cartes fidélité Wallet',
    description:
      'Vos habitués ajoutent leur carte à Apple Wallet et Google Wallet en un scan. Elle apparaît automatiquement quand ils reviennent dans l’hôtel.',
  },
]

export default function HotelRestaurantPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="bg-background min-h-screen text-foreground font-sans antialiased">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Hôtels-restaurants', url: `${base}/solutions/hotel-restaurant` },
        ])}
      />

      <PublicNav ctaLabel="solution_hotel_nav_essai" />

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-8 pt-16 sm:pt-20 pb-16">
        <span className={EYEBROW}>Solution hôtels-restaurants</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.022em] text-balance max-w-[860px]">
          Le menu digital pour hôtels-restaurants qui servent une <em className="italic font-medium text-primary-light">clientèle internationale</em>.
        </h1>
        <p className="text-[18px] text-muted leading-relaxed mt-6 max-w-[640px]">
          Petit-déjeuner, déjeuner, dîner, room service : 4 cartes en 3 langues, gérées en un seul tableau de bord.
        </p>
        <div className="flex flex-wrap gap-3 mt-9">
          <Link href="/signup" className={BTN_PRIMARY}>
            Essayer 14 jours gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/menu/demo" className={BTN_SECONDARY}>
            Voir un menu en exemple
          </Link>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-primary text-background">
        <div className="max-w-[860px] mx-auto px-8 py-20 sm:py-24 text-center">
          <span className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-accent font-semibold mb-5">
            Le constat
          </span>
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-tight text-balance">
            Quatre cartes papier, trois langues — <em className="italic">douze documents</em> à gérer.
          </h2>
          <div className="text-[17px] text-background/80 leading-[1.65] mt-7 space-y-4 max-w-[620px] mx-auto">
            <p>
              Le room service est sur un livret séparé, jamais à jour. Les allergènes sont obligatoires en hôtellerie depuis 2015 et beaucoup d’établissements sont en infraction sans le savoir. Et vos clients changent de pays toutes les nuits.
            </p>
            <p className="text-background font-medium">
              Un seul tableau de bord met tout en règle, dans toutes les langues.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[640px] mb-12">
            <span className={EYEBROW}>Ce que vous gagnez</span>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-tight text-primary text-balance">
              Pensé pour la <em className="italic">complexité hôtelière</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="bg-white border border-border rounded-3xl p-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[22px] text-primary font-medium leading-tight mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-muted leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[820px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-tight text-primary text-balance">
            Essayez MonTablo <em className="italic">14 jours</em>, gratuitement.
          </h2>
          <p className="text-[17px] text-muted mt-5 max-w-[520px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link href="/signup" className={BTN_PRIMARY}>
              Démarrer mon essai gratuit
            </Link>
            <Link href="/contact" className={BTN_SECONDARY}>
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
