import Link from 'next/link'
import { ArrowRight, Check, UtensilsCrossed } from 'lucide-react'
import { PricingToggle } from '@/components/public/pricing-toggle'
import { JsonLd, pricingJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — MonTablo | Menu digital pour restaurants',
  description:
    'Un seul prix, tout inclus. Menu digital avec QR code à partir de 26,99 €/mois. 14 jours d\'essai gratuit, sans carte bancaire.',
  openGraph: {
    title: 'Tarifs — MonTablo | Menu digital pour restaurants',
    description:
      'Un seul prix, tout inclus. Menu digital avec QR code à partir de 26,99 €/mois. 14 jours d\'essai gratuit.',
  },
}

const allFeatures = [
  'Plats et catégories illimités',
  'Menu du jour et promotions',
  'QR code personnalisé',
  'Bilingue FR / EN',
  'Mises à jour en temps réel',
  'Import de menu par IA',
  'Design aux couleurs de votre restaurant',
  'Support prioritaire',
]

const faqs = [
  {
    q: 'Y a-t-il un engagement ?',
    a: 'Non. Vous pouvez résilier à tout moment. L\'abonnement annuel est simplement facturé en une fois pour bénéficier de la réduction.',
  },
  {
    q: 'L\'essai gratuit est-il vraiment sans carte bancaire ?',
    a: 'Oui. Aucune carte bancaire n\'est requise pour commencer votre essai de 14 jours. Vous ne serez débité qu\'après avoir choisi de vous abonner.',
  },
  {
    q: 'Puis-je changer de formule en cours de route ?',
    a: 'Oui, vous pouvez passer du mensuel à l\'annuel (ou inversement) à tout moment depuis votre tableau de bord.',
  },
  {
    q: 'Que se passe-t-il à la fin de l\'essai ?',
    a: 'Votre menu reste accessible en lecture seule. Vous ne perdez aucune donnée. Abonnez-vous pour retrouver l\'accès complet à l\'édition.',
  },
]

export default function TarifsPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={pricingJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Tarifs', url: `${base}/tarifs` },
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
            <Link href="/faq" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              FAQ
            </Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Connexion
            </Link>
            <CTALink
              href="/signup"
              label="tarifs_nav"
              className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1120px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Tarifs</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16 text-center">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Tarif simple
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">
          Un seul prix. Tout inclus.
        </h1>
        <p className="text-lg text-muted max-w-lg mx-auto mb-12">
          Pas de paliers, pas de fonctionnalités cachées.
          Tout ce dont votre restaurant a besoin, dans une seule formule.
        </p>

        <PricingToggle features={allFeatures} />
      </section>

      {/* What's included */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-[1120px] mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">
            Tout est inclus
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 max-w-3xl mx-auto">
            {allFeatures.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent-dark" />
                </span>
                <span className="text-[15px] text-foreground leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-foreground text-center mb-12">
          Questions fréquentes
        </h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-border/50 pb-6">
              <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-20">
        <div className="border border-border rounded-[20px] py-16 px-8 text-center bg-gradient-to-b from-white to-background">
          <h2 className="font-serif text-3xl text-foreground mb-3">
            Prêt à digitaliser votre carte ?
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
          </p>
          <CTALink
            href="/signup"
            label="tarifs_cta"
            className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-10 py-4 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
          >
            Commencer l&apos;essai gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </CTALink>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
              <span className="font-serif text-[15px] text-primary">MonTablo</span>
            </div>
            <p className="text-xs text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted/50">
            <Link href="/mentions-légales" className="hover:text-muted transition-colors">Mentions légales</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cgu" className="hover:text-muted transition-colors">CGU</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/confidentialite" className="hover:text-muted transition-colors">Confidentialité</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cookies" className="hover:text-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
