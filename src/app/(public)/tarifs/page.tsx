import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import { PricingCards } from '@/components/public/pricing-cards'
import { PricingComparisonTable } from '@/components/public/pricing-comparison-table'
import { JsonLd, pricingJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import { FAQS } from './faqs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — MonTablo | Menu digital pour restaurants',
  description:
    '3 formules claires : Essentiel 19€ HT/mois, Pro 39€ HT/mois, Premium sur devis. 14 jours d\'essai gratuit sur Pro, sans carte bancaire.',
  openGraph: {
    title: 'Tarifs MonTablo — 3 formules, sans engagement',
    description:
      'Essentiel 19€, Pro 39€, Premium sur devis. 14 jours d\'essai gratuit sur Pro.',
  },
}

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

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-[120px] pb-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">
          Un tarif clair. Sans engagement.
        </h1>
        <p className="text-lg text-muted max-w-lg mx-auto">
          14 jours d&apos;essai gratuits sur Pro. Sans carte bancaire.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-[1120px] mx-auto px-6 pb-20">
        <PricingCards />
      </section>

      {/* Comparison table */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-[1120px] mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">
            Comparatif détaillé
          </h2>
          <PricingComparisonTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-foreground text-center mb-12">
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.q} className="border-b border-border/50 pb-4 group">
              <summary className="font-medium text-foreground cursor-pointer py-2 flex items-center justify-between">
                {faq.q}
                <span className="text-muted group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="text-[15px] text-muted leading-relaxed mt-2">{faq.a}</p>
            </details>
          ))}
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
            <Link href="/mentions-legales" className="hover:text-muted transition-colors">Mentions légales</Link>
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
