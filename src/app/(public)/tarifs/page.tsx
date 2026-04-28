import Link from 'next/link'
import { UtensilsCrossed, Check, ArrowRight } from 'lucide-react'
import { PricingCards } from '@/components/public/pricing-cards'
import { PricingComparisonTable } from '@/components/public/pricing-comparison-table'
import { JsonLd, pricingJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import { FAQS } from './faqs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — MonTablo | Un tarif clair, sans engagement',
  description:
    '3 formules : Essentiel 19€ HT/mois, Pro 39€ HT/mois, Premium sur devis. 14 jours d\'essai gratuit sur Pro, sans carte bancaire.',
  openGraph: {
    title: 'Tarifs MonTablo — 3 formules, sans engagement',
    description:
      'Essentiel 19€, Pro 39€, Premium sur devis. 14 jours d\'essai gratuit sur Pro.',
  },
}

const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'

const trustItems = [
  'Sans engagement',
  'Support en français',
  'Hébergement en Europe',
  'Conforme RGPD',
]

const proReasons = [
  {
    title: 'Avis Google filtrés',
    body:
      'Les clients très satisfaits sont redirigés vers votre fiche Google. Les avis moins bons restent en interne — vous êtes notifié et vous pouvez réagir avant qu\'ils ne deviennent publics. Sur 6 mois, c\'est plusieurs dixièmes de note Google gagnés.',
  },
  {
    title: 'Cartes de fidélité Apple & Google Wallet',
    body:
      'Vos clients ajoutent leur carte au Wallet en un scan. Elle apparaît sur leur écran d\'accueil quand ils passent près du restaurant. Pas d\'application à installer. Les clients reviennent.',
  },
  {
    title: 'Multilingue FR / EN / DE',
    body:
      'Traduction automatique pour votre clientèle frontalière et internationale. Vos clients suisses, allemands ou britanniques lisent votre carte dans leur langue. Indispensable dans le Genevois.',
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
      <nav className="sticky top-0 z-50 backdrop-blur-[14px] bg-background/80 border-b border-primary/5">
        <div className="max-w-[1240px] mx-auto px-8 flex items-center justify-between h-[76px]">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-serif text-2xl font-semibold text-primary tracking-tight"
            aria-label="MonTablo — accueil"
          >
            <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
            <span>MonTablo</span>
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            <Link href="/fonctionnalites" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              Fonctionnalités
            </Link>
            <Link href="/tarifs" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              Tarifs
            </Link>
            <Link href="/faq" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm text-primary hover:bg-green-mist transition">
              Connexion
            </Link>
            <CTALink
              href="/signup"
              label="tarifs_nav"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-primary-light transition"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[920px] mx-auto px-8 pt-16 sm:pt-20 pb-10 text-center">
        <span className={EYEBROW}>Tarifs</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.022em] text-balance">
          Un tarif clair. <em className="italic font-medium text-primary-light">Sans engagement.</em>
        </h1>
        <p className="text-[18px] text-muted max-w-[560px] mx-auto mt-5 leading-relaxed">
          14 jours d&apos;essai gratuits sur Pro. Sans carte bancaire.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-[1120px] mx-auto px-6 pb-12">
        <PricingCards />
      </section>

      {/* Trust band */}
      <section className="max-w-[1120px] mx-auto px-6 pb-20">
        <div className="bg-white border border-border rounded-2xl px-6 py-5">
          <p className="text-center text-[12px] tracking-[0.18em] uppercase text-primary-light font-semibold mb-4">
            Toutes les formules incluent
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-[14px] text-foreground">
                <Check className="w-4 h-4 text-primary-light" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white border-y border-border">
        <div className="max-w-[1120px] mx-auto px-6 py-20">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={EYEBROW}>Comparatif</span>
            <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-tight text-primary text-balance">
              Ce que vous obtenez, <em className="italic">formule par formule</em>.
            </h2>
          </div>
          <PricingComparisonTable />
        </div>
      </section>

      {/* Why pay Pro vs free */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-[920px] mx-auto px-8 py-20">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={EYEBROW}>Pourquoi Pro</span>
            <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-tight text-primary text-balance">
              Pourquoi payer Pro vs un menu QR <em className="italic">gratuit</em> ?
            </h2>
            <p className="text-muted text-[16px] mt-4 leading-relaxed">
              Un QR code qui affiche un PDF, c&apos;est gratuit partout. Ce que Pro fait en plus,
              ce sont trois choses qui rentabilisent l&apos;abonnement dès le premier mois.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {proReasons.map((r) => (
              <div key={r.title} className="bg-white border border-border rounded-2xl p-7">
                <h3 className="font-serif text-[20px] text-primary leading-tight mb-3 font-medium">
                  {r.title}
                </h3>
                <p className="text-[14px] text-muted leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[14px] text-muted mt-10 max-w-[600px] mx-auto leading-relaxed">
            Un menu QR gratuit affiche votre carte. Pro travaille pour vous : il filtre vos avis,
            ramène vos clients, et parle aux frontaliers.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[860px] mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <span className={EYEBROW}>FAQ tarifs</span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-tight text-primary text-balance">
            Les questions qu&apos;on nous pose <em className="italic">sur les prix</em>.
          </h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white border border-border rounded-2xl px-6 py-5 open:shadow-[0_10px_30px_rgba(30,57,50,0.06)]"
            >
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-[18px] text-primary font-medium">
                <span>{faq.q}</span>
                <span className="w-7 h-7 rounded-full bg-green-mist flex items-center justify-center shrink-0 transition group-open:rotate-45">
                  <span className="block w-3 h-px bg-primary relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-primary" />
                </span>
              </summary>
              <p className="text-[15px] text-muted leading-relaxed mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[820px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-tight text-primary text-balance">
            Essayez Pro <em className="italic">14 jours</em>, gratuitement.
          </h2>
          <p className="text-[17px] text-muted mt-5 max-w-[520px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink
              href="/signup"
              label="tarifs_final_essai"
              className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] bg-primary text-background hover:bg-primary-light transition"
            >
              Démarrer mon essai gratuit
            </CTALink>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] border-[1.5px] border-primary text-primary hover:bg-primary hover:text-background transition"
            >
              Demander une démo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
