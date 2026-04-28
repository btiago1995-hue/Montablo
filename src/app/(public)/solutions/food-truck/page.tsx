import Link from 'next/link'
import { ArrowRight, CalendarDays, Camera, QrCode } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { PublicNav, PublicFooter, EYEBROW, BTN_PRIMARY, BTN_SECONDARY } from '@/components/public/site-chrome'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu digital pour food trucks — MonTablo',
  description:
    'Une carte unique, accessible par QR code. Vos clients voient vos plats avant même de faire la queue. Pour les food trucks qui changent d’emplacement.',
  alternates: { canonical: '/solutions/food-truck' },
  openGraph: {
    title: 'Menu digital pour food trucks — MonTablo',
    description:
      'Une carte unique, accessible par QR code. Pour les food trucks qui changent d’emplacement.',
  },
}

const features = [
  {
    icon: CalendarDays,
    title: 'Menu du jour',
    description:
      'Le plat du jour change selon l’événement ou l’humeur. Modifiez la carte en 30 secondes depuis votre téléphone, entre deux services.',
  },
  {
    icon: Camera,
    title: 'Photos par plat',
    description:
      'Une photo par plat, importée en quelques secondes. Vos clients choisissent en regardant, pas en demandant.',
  },
  {
    icon: QrCode,
    title: 'QR personnalisé',
    description:
      'Un QR code aux couleurs de votre camion, prêt à coller sur la fenêtre, le comptoir ou la carrosserie. Imprimé une fois, valable partout.',
  },
]

export default function FoodTruckPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="bg-background min-h-screen text-foreground font-sans antialiased">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Food trucks', url: `${base}/solutions/food-truck` },
        ])}
      />

      <PublicNav ctaLabel="solution_foodtruck_nav_essai" />

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-8 pt-16 sm:pt-20 pb-16">
        <span className={EYEBROW}>Solution food trucks</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.022em] text-balance max-w-[820px]">
          Le menu digital pour food trucks qui <em className="italic font-medium text-primary-light">changent d’emplacement</em>.
        </h1>
        <p className="text-[18px] text-muted leading-relaxed mt-6 max-w-[600px]">
          Une carte unique, accessible par QR. Vos clients voient vos plats avant même de faire la queue.
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
            L’ardoise lavable, ça <em className="italic">finit par s’user</em>.
          </h2>
          <div className="text-[17px] text-background/80 leading-[1.65] mt-7 space-y-4 max-w-[620px] mx-auto">
            <p>
              Les photos sont absentes, parce qu’on ne va pas plastifier un menu pour le détruire en deux semaines. Le plat du jour est griffonné au feutre. Quand vous faites un événement ponctuel, vous bricolez une nouvelle carte sur place.
            </p>
            <p className="text-background font-medium">
              Un QR code sur le camion remplace tout ça.
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
              Trois choses qui changent <em className="italic">tout de suite</em>.
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
