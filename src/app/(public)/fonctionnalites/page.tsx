import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  QrCode,
  CalendarDays,
  Tag,
  Sparkles,
  Globe,
  Palette,
  Zap,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fonctionnalites — MonTablo | Menu digital pour restaurants',
  description:
    'Decouvrez toutes les fonctionnalites de MonTablo : menu digital, QR code, menu du jour, promotions, import IA, bilingue FR/EN et plus encore.',
  openGraph: {
    title: 'Fonctionnalites — MonTablo',
    description:
      'Menu digital, QR code, menu du jour, promotions, import IA, bilingue FR/EN. Tout ce dont votre restaurant a besoin.',
  },
}

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Menu digital elegant',
    description:
      'Creez votre carte en quelques minutes. Organisez par categories, ajoutez des photos, descriptions et prix. Design soigne qui met en valeur vos plats.',
    highlights: ['Plats et categories illimites', 'Photos et descriptions', 'Organisation par categories'],
  },
  {
    icon: QrCode,
    title: 'QR code personnalise',
    description:
      'Generez un QR code aux couleurs de votre restaurant. Imprimez-le, posez-le sur vos tables. Vos clients accedent a votre menu en un scan.',
    highlights: ['Couleurs personnalisables', 'Telechargement en haute resolution', 'Pret a imprimer'],
  },
  {
    icon: CalendarDays,
    title: 'Menu du jour en un clic',
    description:
      'Mettez a jour votre menu du jour chaque matin en quelques secondes. Vos clients voient toujours ce qui est disponible aujourd\'hui.',
    highlights: ['Mise a jour instantanee', 'Visible directement sur le menu', 'Historique conserve'],
  },
  {
    icon: Tag,
    title: 'Promotions temporaires',
    description:
      'Creez des promotions avec dates de debut et de fin. Elles apparaissent et disparaissent automatiquement de votre menu.',
    highlights: ['Programmation automatique', 'Mise en avant visuelle', 'Pas d\'intervention manuelle'],
  },
  {
    icon: Sparkles,
    title: 'Import par IA',
    description:
      'Photographiez votre carte papier existante. Notre IA extrait automatiquement vos plats, descriptions et prix. Pret en quelques secondes.',
    highlights: ['Import depuis photo', 'Extraction automatique des prix', 'Verification avant publication'],
  },
  {
    icon: Globe,
    title: 'Bilingue francais / anglais',
    description:
      'Votre menu est disponible en francais et en anglais. Ideal pour les zones touristiques et les restaurants qui accueillent une clientele internationale.',
    highlights: ['Traduction integree', 'Changement de langue en un tap', 'Ideal pour le tourisme'],
  },
  {
    icon: Palette,
    title: 'Design aux couleurs de votre restaurant',
    description:
      'Personnalisez les couleurs de votre menu pour qu\'il reflète l\'identite visuelle de votre etablissement. Coherent avec votre marque.',
    highlights: ['Couleur primaire personnalisable', 'Typographie soignee', 'Rendu professionnel'],
  },
  {
    icon: Zap,
    title: 'Mises a jour en temps reel',
    description:
      'Modifiez un prix, ajoutez un plat, desactivez une categorie — vos clients voient les changements instantanement. Plus jamais de cartes obsoletes.',
    highlights: ['Changements instantanes', 'Pas de reimpression', 'Toujours a jour'],
  },
]

export default function FonctionnalitesPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Fonctionnalites', url: `${base}/fonctionnalites` },
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
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              Tarifs
            </Link>
            <Link href="/faq" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">
              FAQ
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
          <span className="text-foreground">Fonctionnalites</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Fonctionnalites
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 max-w-[680px] leading-tight">
          Tout ce qu&apos;il faut pour votre menu digital.
        </h1>
        <p className="text-lg text-muted max-w-[520px] mb-10 leading-relaxed">
          Un outil simple et complet pour creer, gerer et partager votre carte.
          Concu pour les restaurateurs, pas pour les informaticiens.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
        >
          Essayer 14 jours gratuitement
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* Features grid */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white border border-border/50 rounded-[16px] p-8 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h2 className="font-serif text-xl text-foreground mb-2">{feature.title}</h2>
                <p className="text-[15px] text-muted leading-relaxed mb-4">{feature.description}</p>
                <ul className="space-y-1.5">
                  {feature.highlights.map((h) => (
                    <li key={h} className="text-[13px] text-muted/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent-dark shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="bg-primary rounded-[20px] py-16 px-8 text-center">
          <h2 className="font-serif text-3xl text-white mb-3">
            Pret a simplifier votre carte ?
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

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
              <span className="font-serif text-[15px] text-primary">MonTablo</span>
            </div>
            <p className="text-xs text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted/50">
            <Link href="/mentions-legales" className="hover:text-muted transition-colors">Mentions legales</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cgu" className="hover:text-muted transition-colors">CGU</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/confidentialite" className="hover:text-muted transition-colors">Confidentialite</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cookies" className="hover:text-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
