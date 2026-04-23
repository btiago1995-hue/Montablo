import Link from 'next/link'
import { Mail, UtensilsCrossed } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact — MonTablo | Contactez notre équipe',
  description:
    'Une question, un projet, un besoin d\'accompagnement ? Contactez l\'équipe MonTablo et nous vous répondrons rapidement.',
  openGraph: {
    title: 'Contact — MonTablo',
    description:
      'Contactez l\'équipe MonTablo. Nous vous répondons rapidement.',
  },
}

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
      <div className="max-w-[720px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Contact</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[720px] mx-auto px-6 pt-8 pb-10">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Contact
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
          Parlons de votre projet.
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Une question sur MonTablo, un besoin d&apos;accompagnement, une demande presse ou
          partenariat ? Écrivez-nous ci-dessous, nous vous répondons rapidement.
        </p>
      </section>

      {/* Form */}
      <section className="max-w-[720px] mx-auto px-6 pb-12">
        <ContactForm />
      </section>

      {/* Direct contact info */}
      <section className="max-w-[720px] mx-auto px-6 pb-24">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Mail className="w-4 h-4 text-accent-dark" />
          <span>
            Vous pouvez aussi nous écrire directement à{' '}
            <a
              href="mailto:contact@montablo.com"
              className="text-primary font-medium hover:underline"
            >
              contact@montablo.com
            </a>
          </span>
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
