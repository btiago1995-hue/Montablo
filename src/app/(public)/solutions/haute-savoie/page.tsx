import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Globe, Zap, CalendarDays, Mountain } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from '@/components/seo/json-ld'
import { VILLES } from '@/data/haute-savoie'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu digital restaurant Haute-Savoie (74) — MonTablo',
  description:
    'MonTablo, solution de menu digital QR code pour les restaurants de Haute-Savoie. Annecy, Chamonix, Thonon, Megève... Bilingue FR/EN, mises à jour instantanées. Essai gratuit 14 jours.',
  alternates: {
    canonical: 'https://www.montablo.com/solutions/haute-savoie',
  },
  openGraph: {
    title: 'Menu digital restaurant Haute-Savoie — MonTablo',
    description:
      'La solution de menu digital pour les restaurants de Haute-Savoie. Bilingue, QR code, temps réel.',
    url: 'https://www.montablo.com/solutions/haute-savoie',
  },
}

const benefits = [
  {
    icon: Globe,
    title: 'Menu bilingue français / anglais',
    description:
      'Indispensable en Haute-Savoie où la clientèle internationale est majoritaire dans les stations et sur les rives du lac. Vos clients choisissent leur langue en un tap.',
  },
  {
    icon: CalendarDays,
    title: 'Menus saisonniers sans effort',
    description:
      'Fondues en hiver, salades en été. Modifiez votre carte en quelques secondes selon la saison, sans réimprimer quoi que ce soit.',
  },
  {
    icon: Zap,
    title: 'Mises à jour en temps réel',
    description:
      'Un plat épuisé ? Désactivez-le en un tap. Vos clients ne voient jamais un plat indisponible. Idéal pour les services chargés des hautes saisons.',
  },
  {
    icon: Mountain,
    title: 'Simple pour les petites équipes de montagne',
    description:
      'Pas besoin d\'un service informatique. MonTablo se gère depuis un téléphone en 5 minutes par jour. Conçu pour les restaurateurs, pas pour les techniciens.',
  },
]

const faqItems = [
  {
    question: 'Qu\'est-ce que MonTablo pour les restaurants de Haute-Savoie ?',
    answer:
      'MonTablo est une solution de menu digital avec QR code conçue pour les restaurants. En Haute-Savoie, elle est particulièrement adaptée grâce à son menu bilingue français/anglais, ses mises à jour en temps réel et sa simplicité d\'utilisation — idéale pour les restaurants des stations de ski et des bords de lac.',
  },
  {
    question: 'Dans quelles villes de Haute-Savoie MonTablo est-il disponible ?',
    answer:
      'MonTablo est disponible pour tous les restaurants de Haute-Savoie (département 74), notamment à Annecy, Chamonix, Annemasse, Thonon-les-Bains, Megève, Cluses, Sallanches, La Clusaz, Évian-les-Bains et Bonneville.',
  },
  {
    question: 'Combien coûte MonTablo pour un restaurant en Haute-Savoie ?',
    answer:
      'MonTablo propose un essai gratuit de 14 jours sans carte bancaire, puis 29,99 € / mois sans engagement ou 26,99 € / mois en annuel (323,89 € / an). Plats illimités, mises à jour illimitées, QR code inclus.',
  },
]

export default function HauteSavoiePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Haute-Savoie', url: `${base}/solutions/haute-savoie` },
        ])}
      />
      <JsonLd
        data={localBusinessJsonLd({
          name: 'MonTablo',
          url: `${base}/solutions/haute-savoie`,
          areaServed: 'Haute-Savoie',
          description:
            'MonTablo est une solution de menu digital avec QR code pour les restaurants de Haute-Savoie. Bilingue français/anglais, mises à jour en temps réel, essai gratuit 14 jours.',
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

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
          <span className="text-foreground">Haute-Savoie</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Haute-Savoie — Département 74
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 max-w-[680px] leading-tight">
          Le menu digital pour les restaurants de Haute-Savoie.
        </h1>
        <p className="text-lg text-muted max-w-[560px] mb-10 leading-relaxed">
          Annecy, Chamonix, Megève, Thonon... La Haute-Savoie accueille des millions de touristes internationaux chaque année. MonTablo vous donne un menu bilingue, toujours à jour, accessible en un scan.
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
          Pourquoi MonTablo pour les restaurants de Haute-Savoie
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
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

      {/* Cities grid */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-4">
          Votre ville en Haute-Savoie
        </h2>
        <p className="text-[15px] text-muted mb-10 max-w-[520px]">
          MonTablo est disponible pour tous les restaurants du département 74. Trouvez les conseils adaptés à votre ville.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {VILLES.map((ville) => (
            <Link
              key={ville.slug}
              href={`/solutions/haute-savoie/${ville.slug}`}
              className="group flex items-center justify-between bg-white border border-border/50 rounded-[14px] px-6 py-5 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300"
            >
              <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                {ville.name}
              </span>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-foreground mb-10">Questions fréquentes</h2>
        <div className="space-y-8">
          {faqItems.map((item) => (
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
            Prêt à digitaliser votre carte en Haute-Savoie ?
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

      {/* Internal links */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/60">
          <Link href="/menu-digital-restaurant" className="hover:text-muted transition-colors">Menu digital restaurant</Link>
          <Link href="/qr-code-restaurant" className="hover:text-muted transition-colors">QR code restaurant</Link>
          <Link href="/fonctionnalites" className="hover:text-muted transition-colors">Fonctionnalités</Link>
          <Link href="/tarifs" className="hover:text-muted transition-colors">Tarifs</Link>
          <Link href="/blog" className="hover:text-muted transition-colors">Blog</Link>
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
