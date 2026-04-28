import Link from 'next/link'
import { ArrowRight, Check, X, UtensilsCrossed, Euro, Palette, MousePointerClick, RefreshCw, Megaphone, Sparkles, Globe, Clock, Smartphone } from 'lucide-react'
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MonTablo vs Tastycloud : comparatif menus digitaux — MonTablo',
  description:
    'Comparatif détaillé entre MonTablo et Tastycloud pour votre menu digital de restaurant. Design, prix, simplicite, import IA : découvrez quelle solution choisir.',
  openGraph: {
    title: 'MonTablo vs Tastycloud : comparatif menus digitaux — MonTablo',
    description:
      'MonTablo vs Tastycloud : quel menu digital choisir ? Comparatif complet des fonctionnalités, prix et expérience utilisateur.',
  },
}

const comparisonRows = [
  {
    icon: Euro,
    criteria: 'Prix',
    competitor: 'Plusieurs paliers tarifaires, coût variable',
    montablo: '3 formules : Essentiel 19 € HT, Pro 39 € HT, Premium sur devis',
    advantage: 'montablo' as const,
  },
  {
    icon: Palette,
    criteria: 'Qualite du design',
    competitor: 'Design fonctionnel mais vieillissant',
    montablo: 'Design moderne et soigné, adapte a votre identité',
    advantage: 'montablo' as const,
  },
  {
    icon: MousePointerClick,
    criteria: 'Facilite d\'utilisation',
    competitor: 'Interface riche mais plus complexe a prendre en main',
    montablo: 'Interface intuitive, prise en main immédiate',
    advantage: 'montablo' as const,
  },
  {
    icon: RefreshCw,
    criteria: 'Menu du jour',
    competitor: 'Disponible selon l\'offre choisie',
    montablo: 'Inclus en standard, ajout en 30 secondes',
    advantage: 'montablo' as const,
  },
  {
    icon: Megaphone,
    criteria: 'Promotions',
    competitor: 'Fonctionnalité limitee ou en option',
    montablo: 'Programmables avec dates de debut et de fin',
    advantage: 'montablo' as const,
  },
  {
    icon: Sparkles,
    criteria: 'Import IA du menu',
    competitor: 'Non disponible',
    montablo: 'Photographiez votre carte, l\'IA fait le reste',
    advantage: 'montablo' as const,
  },
  {
    icon: Globe,
    criteria: 'Bilingue',
    competitor: 'Multilingue disponible (selon l\'offre)',
    montablo: 'Bilingue FR/EN intégré en standard',
    advantage: 'tie' as const,
  },
  {
    icon: Clock,
    criteria: 'Temps de mise en place',
    competitor: 'Configuration plus longue (nombreuses options)',
    montablo: 'Menu en ligne en moins de 5 minutes',
    advantage: 'montablo' as const,
  },
  {
    icon: Smartphone,
    criteria: 'Experience mobile',
    competitor: 'Correcte mais pas toujours optimisee',
    montablo: 'Conçu mobile-first, expérience fluide',
    advantage: 'montablo' as const,
  },
]

const faqs = [
  {
    question: 'Quelle est la différence entre MonTablo et Tastycloud ?',
    answer:
      'Tastycloud est une solution de menu digital etablie en France avec de nombreuses fonctionnalités et integrations. MonTablo est une alternative plus recente, focalisee sur la simplicite, le design moderne et un prix unique transparent. MonTablo propose aussi l\'import de menu par IA, une fonctionnalité absente chez Tastycloud.',
  },
  {
    question: 'Tastycloud est-il plus cher que MonTablo ?',
    answer:
      'Tastycloud propose plusieurs paliers tarifaires selon les fonctionnalités souhaitees, ce qui peut vite faire monter la facture. MonTablo propose un tarif unique à partir de 19 € HT par mois (Essentiel) ou 39 € HT par mois (Pro), avec −10 % en annuel, avec toutes les fonctionnalités incluses.',
  },
  {
    question: 'Puis-je migrer de Tastycloud vers MonTablo facilement ?',
    answer:
      'Oui. Avec l\'import par IA de MonTablo, il suffit de photographier votre menu actuel ou de copier-coller son contenu. Vos plats, descriptions et prix sont extraits automatiquement. La migration prend moins de 10 minutes.',
  },
  {
    question: 'Tastycloud propose-t-il des fonctionnalités que MonTablo n\'a pas ?',
    answer:
      'Tastycloud dispose d\'un historique plus long sur le marche et propose certaines integrations avec des systemes de caisse et des plateformes de commande en ligne. Si ces integrations sont essentielles pour votre activite, Tastycloud peut être un choix a considerer.',
  },
  {
    question: 'Pourquoi choisir MonTablo plutot que Tastycloud ?',
    answer:
      'MonTablo se distingue par son design plus moderne, sa simplicite d\'utilisation, l\'import de menu par IA, un prix unique sans paliers, et une expérience mobile optimisee. C\'est la solution idéale si vous voulez un menu digital élégant et facile a gérer sans complexite inutile.',
  },
]

export default function CompareTastyCloudPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Comparatifs', url: `${base}/compare` },
          { name: 'MonTablo vs Tastycloud', url: `${base}/compare/montablo-vs-tastycloud` },
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
          <span className="hover:text-muted transition-colors">Comparatifs</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">MonTablo vs Tastycloud</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16 text-center">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Comparatif
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 text-balance">
          MonTablo vs Tastycloud : la comparaison honnête.
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Deux solutions de{' '}
          <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
            menu digital
          </Link>
          , deux approches. Fonctionnalités, prix, expérience client : ce qui les sépare vraiment.
        </p>
      </section>

      {/* Comparison table */}
      <section className="max-w-[960px] mx-auto px-6 pb-20">
        <div className="border border-border rounded-[20px] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr] bg-white border-b border-border">
            <div className="px-4 sm:px-6 py-4">
              <span className="text-[13px] font-medium text-muted/60 uppercase tracking-wide">Critere</span>
            </div>
            <div className="px-4 sm:px-6 py-4 border-l border-border">
              <span className="text-[13px] font-medium text-muted/60 uppercase tracking-wide">Tastycloud</span>
            </div>
            <div className="px-4 sm:px-6 py-4 border-l border-border bg-primary/[0.03]">
              <span className="text-[13px] font-medium text-primary uppercase tracking-wide">MonTablo</span>
            </div>
          </div>

          {/* Table rows */}
          {comparisonRows.map((row, i) => {
            const Icon = row.icon
            return (
              <div
                key={row.criteria}
                className={`grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr] ${i < comparisonRows.length - 1 ? 'border-b border-border/50' : ''}`}
              >
                <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-start gap-3">
                  <Icon className="w-4 h-4 text-muted/40 shrink-0 mt-0.5 hidden sm:block" />
                  <span className="text-[14px] sm:text-[15px] font-medium text-foreground">{row.criteria}</span>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-l border-border/50 flex items-start gap-2">
                  {row.advantage === 'montablo' ? (
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  )}
                  <span className="text-[13px] sm:text-[14px] text-muted leading-relaxed">{row.competitor}</span>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-l border-border/50 bg-primary/[0.03] flex items-start gap-2">
                  {row.advantage === 'montablo' || row.advantage === 'tie' ? (
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span className="text-[13px] sm:text-[14px] text-foreground leading-relaxed">{row.montablo}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Detailed breakdown */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-[780px] mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl text-foreground text-center mb-16">
            Ce qui distingue MonTablo de Tastycloud
          </h2>

          {/* Design */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Un design moderne et soigné
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Tastycloud est present sur le marche depuis plusieurs années et propose
              un design fonctionnel. MonTablo a été conçu plus recemment avec une approche
              design-first : chaque element est pense pour mettre vos plats en valeur
              avec une esthetique moderne et élégante.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Le resultat : un menu qui reflète la qualite de votre cuisine et donne
              envie de commander. Découvrez nos{' '}
              <Link href="/fonctionnalites" className="text-primary hover:underline">
                fonctionnalités
              </Link>{' '}
              de personnalisation.
            </p>
          </div>

          {/* Simplicity */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              La simplicite comme philosophie
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Tastycloud propose de nombreuses options et integrations, ce qui peut
              rendre la prise en main plus longue. MonTablo fait le choix de la
              simplicite : vous créez votre menu en quelques minutes, sans formation
              ni configuration complexe.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              L&apos;import par IA est un bon exemple : photographiez votre carte
              existante et MonTablo extrait automatiquement vos plats, descriptions
              et prix. Votre{' '}
              <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
                menu digital
              </Link>{' '}
              est en ligne en moins de 5 minutes.
            </p>
          </div>

          {/* Pricing */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Un prix unique et transparent
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Tastycloud propose plusieurs paliers tarifaires avec des fonctionnalités
              différentes selon l&apos;offre choisie. Il faut souvent monter en gamme
              pour accéder a certaines options.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              MonTablo propose un{' '}
              <Link href="/tarifs" className="text-primary hover:underline">
                tarif unique
              </Link>{' '}
              avec toutes les fonctionnalités incluses : menu du jour, promotions,
              bilingue, import IA, QR code personnalisé. Pas de paliers, pas de
              surprises.
            </p>
          </div>

          {/* Honesty */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Quand Tastycloud peut être un meilleur choix
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Tastycloud dispose d&apos;un historique plus long sur le marche français
              et propose des integrations avec certains systemes de caisse et plateformes
              de commande en ligne. Si ces integrations specifiques sont essentielles
              pour votre activite, Tastycloud merite d&apos;être considere.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Pour la majorite des restaurants qui cherchent un menu digital simple,
              élégant et abordable, MonTablo offre un meilleur rapport qualite-prix
              avec une expérience utilisateur plus fluide.
            </p>
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
            <div key={faq.question} className="border-b border-border/50 pb-6">
              <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-20">
        <div className="border border-border rounded-[20px] py-16 px-8 text-center bg-gradient-to-b from-white to-background">
          <h2 className="font-serif text-3xl text-foreground mb-3">
            Prêt a découvrir MonTablo ?
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Essayez MonTablo gratuitement pendant 14 jours. Aucune carte bancaire requise.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-10 py-4 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
          >
            Commencer l&apos;essai gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="text-[13px] text-muted/50 mt-4">
            Ou découvrez nos{' '}
            <Link href="/tarifs" className="text-primary hover:underline">tarifs</Link>
            {' '}et consultez la{' '}
            <Link href="/faq" className="text-primary hover:underline">FAQ</Link>
          </p>
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
