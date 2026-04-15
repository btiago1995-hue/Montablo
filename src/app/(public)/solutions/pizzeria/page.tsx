import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  Camera,
  DollarSign,
  Layers,
  Smartphone,
  Zap,
  Pizza,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu digital pour pizzeria | MonTablo',
  description:
    'Creez le menu digital de votre pizzeria. Photos de pizzas, categories claires, mise a jour des prix instantanee. Ideal pour pizzerias et livraison.',
  openGraph: {
    title: 'Menu digital pour pizzeria | MonTablo',
    description:
      'Photos, categories claires, prix modifiables en un clic. La solution pour les pizzerias.',
  },
}

const benefits = [
  {
    icon: Layers,
    title: 'Categories structurees',
    description:
      'Pizzas, pastas, salades, desserts, boissons. Organisez votre carte avec des categories claires pour que vos clients trouvent tout facilement.',
  },
  {
    icon: Camera,
    title: 'Photos qui donnent envie',
    description:
      'Ajoutez des photos de vos pizzas et plats. Un menu visuel qui donne envie de commander, bien plus efficace qu\'une simple liste de noms.',
  },
  {
    icon: DollarSign,
    title: 'Prix modifiables instantanement',
    description:
      'Le cout des ingredients change ? Mettez a jour vos prix en quelques secondes. Plus besoin de reimprimer toute la carte.',
  },
]

const features = [
  {
    icon: Pizza,
    title: 'Menu visuel avec photos',
    description: 'Mettez en avant vos pizzas avec de belles photos. Vos clients choisissent plus vite et commandent plus.',
  },
  {
    icon: Layers,
    title: 'Categories claires',
    description: 'Pizzas classiques, pizzas speciales, pastas, salades, desserts. Chaque plat a sa place, votre carte reste lisible.',
  },
  {
    icon: DollarSign,
    title: 'Prix mis a jour en un clic',
    description: 'Le prix de la mozzarella augmente ? Mettez a jour tous vos prix en quelques minutes, sans reimprimer.',
  },
  {
    icon: Smartphone,
    title: 'QR code pour la salle et la livraison',
    description: 'Un QR code sur les tables et sur vos emballages de livraison. Vos clients accedent a votre menu partout.',
  },
  {
    icon: Zap,
    title: 'Mises a jour en temps reel',
    description: 'Un ingredient est en rupture ? Desactivez le plat en un tap. Vos clients ne commanderont que ce qui est disponible.',
  },
  {
    icon: Camera,
    title: 'Import par photo',
    description: 'Photographiez votre carte actuelle. Notre IA extrait automatiquement vos plats, descriptions et prix.',
  },
]

const steps = [
  {
    number: '1',
    title: 'Ajoutez vos plats',
    description: 'Creez vos categories, ajoutez vos pizzas avec photos, descriptions et prix.',
  },
  {
    number: '2',
    title: 'Personnalisez le design',
    description: 'Choisissez les couleurs de votre pizzeria. Votre menu reflète votre identite.',
  },
  {
    number: '3',
    title: 'Partagez en un scan',
    description: 'Imprimez votre QR code pour la salle, le comptoir ou vos boites de livraison.',
  },
]

export default function PizzeriaPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Pizzeria', url: `${base}/solutions/pizzeria` },
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
          <span className="hover:text-muted transition-colors">Solutions</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">Pizzeria</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Solution pizzeria
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 max-w-[680px] leading-tight">
          Le menu digital ideal pour les pizzerias.
        </h1>
        <p className="text-lg text-muted max-w-[520px] mb-10 leading-relaxed">
          Photos appetissantes, categories structurees, prix modifiables en un instant.
          Donnez a vos clients une carte qui donne envie de commander.
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
          Pourquoi MonTablo pour votre pizzeria
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
          Les fonctionnalites cles pour votre pizzeria
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
            Pret a creer le menu digital de votre pizzeria ?
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
          <Link href="/fonctionnalites" className="hover:text-muted transition-colors">Fonctionnalites</Link>
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
