import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, UtensilsCrossed, Globe, Zap, CalendarDays } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from '@/components/seo/json-ld'
import { VILLES, getVilleBySlug } from '@/data/haute-savoie'
import type { Metadata } from 'next'

type Props = {
  params: { ville: string }
}

export async function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ville = getVilleBySlug(params.ville)
  if (!ville) return {}
  return {
    title: ville.metadata.title,
    description: ville.metadata.description,
    openGraph: {
      title: ville.metadata.title,
      description: ville.metadata.description,
    },
  }
}

const sharedBenefits = [
  {
    icon: Globe,
    title: 'Menu bilingue français / anglais',
    description:
      'Vos clients internationaux choisissent leur langue en un tap. Aucune impression supplémentaire, aucun menu séparé.',
  },
  {
    icon: Zap,
    title: 'Mises à jour en temps réel',
    description:
      'Modifiez votre carte depuis votre téléphone en quelques secondes, même en plein service.',
  },
  {
    icon: CalendarDays,
    title: 'Menu du jour en un clic',
    description:
      'Publiez votre formule du midi chaque matin en quelques taps. Vos clients voient toujours ce qui est disponible.',
  },
]

export default function VillePage({ params }: Props) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const ville = getVilleBySlug(params.ville)

  if (!ville) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Haute-Savoie', url: `${base}/solutions/haute-savoie` },
          { name: ville.name, url: `${base}/solutions/haute-savoie/${ville.slug}` },
        ])}
      />
      <JsonLd
        data={localBusinessJsonLd({
          name: 'MonTablo',
          url: `${base}/solutions/haute-savoie/${ville.slug}`,
          areaServed: ville.name,
          description: ville.metadata.description,
        })}
      />
      <JsonLd data={faqJsonLd(ville.faq)} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Fonctionnalites
            </Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Tarifs
            </Link>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Blog
            </Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1120px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/solutions/haute-savoie" className="hover:text-muted transition-colors">Haute-Savoie</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{ville.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Haute-Savoie — {ville.name}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 max-w-[680px] leading-tight">
          Menu digital pour restaurants à {ville.name}.
        </h1>
        <div className="space-y-4 text-lg text-muted max-w-[560px] mb-10 leading-relaxed">
          <p>{ville.intro[0]}</p>
          <p>{ville.intro[1]}</p>
        </div>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
        >
          Essayer 14 jours gratuitement
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* Benefits */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">
          Pourquoi MonTablo pour votre restaurant à {ville.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {sharedBenefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div key={benefit.title} className="bg-white border border-border/50 rounded-[16px] p-8 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{benefit.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">Questions fréquentes</h2>
        <div className="space-y-8">
          {ville.faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-serif text-xl text-foreground mb-3">{item.question}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="bg-primary rounded-[20px] py-16 px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-3">
            Prêt à digitaliser votre carte à {ville.name} ?
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2.5 bg-accent text-foreground font-medium px-8 py-3.5 rounded-full hover:bg-accent-light transition-all text-[15px]"
            >
              Commencer l&apos;essai gratuit
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="/tarifs" className="text-white/80 hover:text-white text-[15px] transition-colors">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Back to hub + internal links */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/60">
          <Link href="/solutions/haute-savoie" className="inline-flex items-center gap-1.5 hover:text-muted transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Toutes les villes de Haute-Savoie
          </Link>
          <Link href="/menu-digital-restaurant" className="hover:text-muted transition-colors">Menu digital restaurant</Link>
          <Link href="/qr-code-restaurant" className="hover:text-muted transition-colors">QR code restaurant</Link>
          <Link href="/tarifs" className="hover:text-muted transition-colors">Tarifs</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
                <span className="font-serif text-base text-primary">MonTablo</span>
              </div>
              <p className="text-[13px] text-muted/60 leading-relaxed">
                Le menu digital pour les restaurants exigeants.
              </p>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Produit</p>
              <div className="space-y-3">
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalites</Link>
                <Link href="/tarifs" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Tarifs</Link>
                <Link href="/menu/demo" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Voir un exemple</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Ressources</p>
              <div className="space-y-3">
                <Link href="/blog" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Blog</Link>
                <Link href="/faq" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Legal</p>
              <div className="space-y-3">
                <Link href="/mentions-legales" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Mentions legales</Link>
                <Link href="/cgu" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">CGU</Link>
                <Link href="/confidentialite" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Confidentialite</Link>
                <Link href="/cookies" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
