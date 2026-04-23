import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  LayoutGrid,
  Tag,
  Clock,
  Layers,
  Smartphone,
  Globe,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu digital pour brasserie | MonTablo',
  description:
    'Gerez le menu digital de votre brasserie facilement. Catégories illimitées, promotions happy hour, carte organisee pour le service continu.',
  openGraph: {
    title: 'Menu digital pour brasserie | MonTablo',
    description:
      'Catégories illimitées, promotions happy hour, carte organisee. La solution pour les brasseries.',
  },
}

const benefits = [
  {
    icon: LayoutGrid,
    title: 'Catégories illimitées',
    description:
      'Entrées, plats, grillades, poissons, desserts, boissons, vins... Organisez votre carte en autant de catégories que nécessaire, sans aucune limite.',
  },
  {
    icon: Tag,
    title: 'Promotions happy hour',
    description:
      'Programmez vos promotions avec dates de debut et de fin. Les offres happy hour apparaissent et disparaissent automatiquement.',
  },
  {
    icon: Clock,
    title: 'Service continu, carte adaptee',
    description:
      'Activez ou désactivez des catégories selon le moment de la journee. Carte du midi, carte du soir, tout se géré en quelques taps.',
  },
]

const features = [
  {
    icon: Layers,
    title: 'Organisation par catégories',
    description: 'Créez autant de catégories et sous-groupes que vous le souhaitez. Votre carte reste claire même avec 100 plats.',
  },
  {
    icon: Tag,
    title: 'Promotions temporaires',
    description: 'Happy hour, formules du midi, offres du week-end. Programmez vos promotions et elles apparaissent automatiquement.',
  },
  {
    icon: Clock,
    title: 'Mises à jour instantanées',
    description: 'Changez un prix, ajoutez un plat, désactivez une catégorie. Vos clients voient les modifications en temps réel.',
  },
  {
    icon: Smartphone,
    title: 'QR code personnalisé',
    description: 'Un QR code aux couleurs de votre brasserie, prêt a imprimer et a poser sur vos tables ou au comptoir.',
  },
  {
    icon: Globe,
    title: 'Bilingue français / anglais',
    description: 'Accueillez une clientèle internationale avec un menu disponible en français et en anglais.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Design professionnel',
    description: 'Un menu digital élégant qui reflète l\'image de votre brasserie. Couleurs personnalisables, typographie soignée.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Importez votre carte',
    description: 'Ajoutez vos plats manuellement ou photographiez votre carte existante. Notre IA fait le reste.',
  },
  {
    number: '2',
    title: 'Organisez par catégories',
    description: 'Créez vos catégories, ordonnez vos plats, ajoutez photos et descriptions.',
  },
  {
    number: '3',
    title: 'Publiez et partagez',
    description: 'Générez votre QR code, posez-le sur les tables. Votre brasserie a son menu digital.',
  },
]

export default function BrasseriePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Brasserie', url: `${base}/solutions/brasserie` },
        ])}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Fonctionnalités
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
          <span className="hover:text-muted transition-colors">Solutions</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">Brasserie</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Solution brasserie
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 max-w-[680px] leading-tight">
          Le menu digital taille pour les brasseries.
        </h1>
        <p className="text-lg text-muted max-w-[520px] mb-10 leading-relaxed">
          Une carte longue avec de nombreuses catégories, un service continu du matin au soir.
          MonTablo organise tout clairement pour vos clients.
        </p>
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
          Pourquoi MonTablo pour votre brasserie
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
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

      {/* How it works */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">
          Comment ca marche
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-medium text-primary">{step.number}</span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{step.title}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature highlights */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">
          Les fonctionnalités clés pour votre brasserie
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="bg-white border border-border/50 rounded-[16px] p-8 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{feature.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="bg-primary rounded-[20px] py-16 px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-3">
            Prêt a moderniser la carte de votre brasserie ?
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
            <Link
              href="/tarifs"
              className="text-white/80 hover:text-white text-[15px] transition-colors"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/60">
          <Link href="/fonctionnalites" className="hover:text-muted transition-colors">Fonctionnalités</Link>
          <Link href="/tarifs" className="hover:text-muted transition-colors">Tarifs</Link>
          <Link href="/menu-digital-restaurant" className="hover:text-muted transition-colors">Menu digital restaurant</Link>
          <Link href="/qr-code-restaurant" className="hover:text-muted transition-colors">QR code restaurant</Link>
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
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalités</Link>
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
                <Link href="/mentions-légales" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Mentions légales</Link>
                <Link href="/cgu" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">CGU</Link>
                <Link href="/confidentialite" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Confidentialité</Link>
                <Link href="/cookies" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
