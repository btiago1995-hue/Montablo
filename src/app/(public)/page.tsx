import Link from 'next/link'
import { ArrowRight, Check, UtensilsCrossed } from 'lucide-react'
import { PricingToggle } from '@/components/public/pricing-toggle'
import { JsonLd, homepageJsonLd } from '@/components/seo/json-ld'
import { HeroPhoneAnimation } from '@/components/public/hero-phone-animation'
import { PainPoints } from '@/components/public/pain-points'
import { StatsCounter } from '@/components/public/stats-counter'
import { ProductShowcase } from '@/components/public/product-showcase'

const steps = [
  { num: '01', title: 'Inscrivez-vous', desc: 'Créez votre compte en 30 secondes. Aucune carte de crédit requise.' },
  { num: '02', title: 'Ajoutez vos plats', desc: 'Noms, descriptions, prix. Organisez par catégories, ajoutez des photos si vous voulez.' },
  { num: '03', title: 'Partagez le QR code', desc: 'Imprimez-le, posez-le sur vos tables. Vos clients y accèdent en un scan.' },
]

const benefits = [
  'Mise à jour instantanée, plus de réimpressions',
  'Menu du jour en un clic',
  'Promotions temporaires automatisées',
  'Design aux couleurs de votre restaurant',
  'Bilingue français / anglais',
  'QR code personnalisable',
]

const pricingFeatures = [
  'Plats et catégories illimités',
  'Menu du jour et promotions',
  'QR code personnalisé',
  'Bilingue FR / EN',
  'Mises à jour en temps réel',
]

const menuItems = {
  entrees: [
    { name: 'Soupe à l\'oignon', desc: 'Gratinée au gruyère', price: '8,50 €' },
    { name: 'Salade de chèvre chaud', desc: 'Miel, noix, mesclun', price: '11,00 €' },
  ],
  plats: [
    { name: 'Confit de canard', desc: 'Pommes sarladaises', price: '19,50 €' },
    { name: 'Bœuf bourguignon', desc: 'Carottes, champignons', price: '18,00 €' },
  ],
}

export default function LandingPage() {
  const schemas = homepageJsonLd()

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Fonctionnalites</Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Tarifs</Link>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Blog</Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Connexion</Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — 2-column with phone animation */}
      <section className="max-w-[1120px] mx-auto px-6 pt-[120px] pb-16 sm:pt-[160px] sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-5">
              Le menu digital pour les restaurants exigeants
            </p>
            <h1 className="font-serif text-[32px] sm:text-5xl lg:text-[56px] text-foreground leading-[1.1] mb-6 max-w-[580px]">
              Votre carte, enfin à la hauteur de votre cuisine.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-[480px] mb-10">
              Un menu digital élégant que vous mettez à jour en temps réel.
              Vos clients scannent, vous gardez le contrôle.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2.5 bg-primary text-white font-medium px-8 py-4 sm:py-3.5 rounded-full hover:bg-primary-light transition-all shadow-[0_0_24px_rgba(44,62,45,0.2)] hover:shadow-[0_0_32px_rgba(44,62,45,0.35)] hover:-translate-y-px text-base sm:text-[15px]"
              >
                Essayer 14 jours gratuitement
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/menu/demo"
                className="group inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium px-6 py-4 sm:py-3.5 rounded-full hover:border-foreground/30 hover:bg-muted/5 transition-all text-base sm:text-[15px]"
              >
                Voir un exemple
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-end pb-8">
            <HeroPhoneAnimation />
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <div className="border-y border-border bg-white">
        <div className="max-w-[1120px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10">
          <span className="text-sm text-muted/60">Sans engagement</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="text-sm text-muted/60">Aucune carte bancaire</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="text-sm text-muted/60">Prêt en 5 minutes</span>
        </div>
      </div>

      {/* Pain points */}
      <PainPoints />

      {/* Stats counter */}
      <StatsCounter />

      {/* How it works */}
      <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[120px]">
        <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Comment ça marche
        </p>
        <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-10 sm:mb-16 max-w-lg leading-tight">
          Trois étapes. Cinq minutes. Zéro friction.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="group">
              <span className="font-serif text-[48px] sm:text-[64px] leading-none text-border group-hover:text-accent transition-colors duration-300">
                {step.num}
              </span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-2">{step.title}</h3>
              <p className="text-base sm:text-[15px] text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product showcase */}
      <div className="bg-white border-y border-border/50">
        <ProductShowcase />
      </div>

      {/* Menu preview */}
      <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[100px]">
        <div className="bg-primary rounded-[20px] p-8 sm:p-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="font-serif text-[28px] sm:text-4xl text-white leading-snug mb-4">
              Un menu que vos clients ont envie de lire.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Design soigné, navigation fluide, chargement instantané.
              Le tout aux couleurs de votre restaurant.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2.5 bg-accent text-foreground font-medium px-8 py-4 sm:py-3.5 rounded-full hover:bg-accent-light transition-all text-base sm:text-[15px] w-full sm:w-auto shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:shadow-[0_0_28px_rgba(212,165,116,0.4)]"
            >
              Créer mon menu
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="bg-background rounded-3xl p-8 max-w-[340px] mx-auto shadow-2xl">
            <div className="text-center mb-6 pb-5 border-b border-border/50">
              <h3 className="font-serif text-lg text-foreground">Le Petit Bistrot</h3>
              <span className="text-xs text-muted/60 block mt-1">Menu</span>
            </div>
            {Object.entries(menuItems).map(([cat, items]) => (
              <div key={cat}>
                <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-accent-dark mt-5 mb-3">
                  {cat === 'entrees' ? 'Entrées' : 'Plats'}
                </p>
                {items.map((item) => (
                  <div key={item.name} className="flex justify-between items-baseline py-2.5 border-b border-border/30 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground whitespace-nowrap ml-4">{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[120px] grid lg:grid-cols-5 gap-8 lg:gap-20">
          <div className="lg:col-span-2">
            <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
              Pourquoi MonTablo
            </p>
            <h2 className="font-serif text-[28px] sm:text-4xl text-foreground leading-tight">
              Tout ce qu&apos;il faut. Rien de superflu.
            </h2>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-1">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 rounded-xl hover:bg-background transition-colors">
                <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent-dark" />
                </span>
                <span className="text-base sm:text-[15px] text-foreground leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[120px]">
        <div className="text-center">
          <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
            Tarif simple
          </p>
          <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-2">
            Un seul prix. Tout inclus.
          </h2>
          <p className="text-base sm:text-[17px] text-muted mb-10 sm:mb-12">
            Pas de paliers, pas de fonctionnalités cachées.
          </p>
          <PricingToggle features={pricingFeatures} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16 sm:pb-[120px]">
        <div className="border border-border rounded-[20px] py-16 sm:py-24 px-6 sm:px-8 text-center bg-gradient-to-b from-white to-background">
          <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-3 text-balance">
            Vos plats méritent mieux qu&apos;un PDF.
          </h2>
          <p className="text-base sm:text-[17px] text-muted mb-8 sm:mb-10 max-w-md mx-auto">
            Rejoignez les restaurateurs qui ont remplacé leur carte papier
            par une expérience digitale à leur image.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center gap-2.5 bg-primary text-white font-medium px-10 py-4 rounded-full hover:bg-primary-light transition-all shadow-[0_0_24px_rgba(44,62,45,0.2)] hover:shadow-[0_0_32px_rgba(44,62,45,0.35)] hover:-translate-y-px text-base sm:text-[15px] w-full sm:w-auto"
          >
            Créer mon menu gratuitement
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
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
              <p className="text-[13px] text-muted/60 leading-relaxed">Le menu digital pour les restaurants exigeants.</p>
              <Link href="/a-propos" className="block text-[13px] text-muted/60 hover:text-muted transition-colors mt-3">A propos</Link>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Produit</p>
              <div className="space-y-3">
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalites</Link>
                <Link href="/tarifs" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Tarifs</Link>
                <Link href="/menu/demo" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Voir un exemple</Link>
                <Link href="/solutions/bistrot" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Solutions</Link>
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
            <p className="text-sm text-muted/60">&copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
