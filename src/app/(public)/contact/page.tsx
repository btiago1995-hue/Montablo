import Link from 'next/link'
import { Mail, MapPin, UtensilsCrossed, ArrowRight } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact — MonTablo | Une question, une demande de démo ?',
  description:
    'Une question, une demande de démo, un partenariat ? Réponse sous 24h ouvrées, directement par le founder.',
  openGraph: {
    title: 'Contact — MonTablo',
    description:
      'Réponse sous 24h ouvrées. C\'est le founder qui répond.',
  },
}

const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'

export default function ContactPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Contact', url: `${base}/contact` },
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
              label="contact_nav"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-primary-light transition"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[820px] mx-auto px-8 pt-16 sm:pt-20 pb-10">
        <span className={EYEBROW}>Contact</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(34px,4.6vw,52px)] leading-[1.05] tracking-[-0.022em] text-balance">
          Une question ? Une demande de démo ? <em className="italic font-medium text-primary-light">Écrivez-nous.</em>
        </h1>
        <p className="text-[18px] text-muted leading-relaxed mt-5 max-w-[600px]">
          Réponse sous 24h ouvrées. Et oui, c&apos;est le founder qui répond.
        </p>
      </section>

      {/* Trust band — self-serve */}
      <section className="max-w-[820px] mx-auto px-8 pb-10">
        <div className="bg-green-mist border border-border rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[14px] text-foreground leading-relaxed">
            Pour démarrer un essai gratuit, pas besoin de nous contacter — c&apos;est 1 clic.
          </p>
          <CTALink
            href="/signup"
            label="contact_self_serve"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-primary-light transition whitespace-nowrap"
          >
            Démarrer l&apos;essai
            <ArrowRight className="w-4 h-4" />
          </CTALink>
        </div>
      </section>

      {/* Form + info grid */}
      <section className="max-w-[1080px] mx-auto px-8 pb-20 grid lg:grid-cols-[1.4fr_0.8fr] gap-10">
        <div>
          <h2 className="font-serif text-[24px] text-primary mb-6 font-medium">
            Le formulaire
          </h2>
          <ContactForm />
        </div>
        <aside className="space-y-5">
          <h2 className="font-serif text-[24px] text-primary mb-2 font-medium">
            Autres moyens
          </h2>
          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-green-soft flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-primary" strokeWidth={1.8} />
            </div>
            <h3 className="font-serif text-[18px] text-primary mb-1.5 font-medium">Email</h3>
            <a
              href="mailto:contact@montablo.com"
              className="text-[14px] text-primary-light font-semibold hover:underline"
            >
              contact@montablo.com
            </a>
            <p className="text-[13px] text-muted mt-2 leading-relaxed">
              Le moyen le plus simple. Réponse sous 24h ouvrées.
            </p>
          </div>
          <div className="bg-white border border-border rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-green-soft flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-primary" strokeWidth={1.8} />
            </div>
            <h3 className="font-serif text-[18px] text-primary mb-1.5 font-medium">Localisation</h3>
            <p className="text-[14px] text-foreground font-medium">
              Saint-Julien-en-Genevois
            </p>
            <p className="text-[13px] text-muted mt-2 leading-relaxed">
              Haute-Savoie, France. À 10 minutes de Genève.
            </p>
          </div>
        </aside>
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
