import Link from 'next/link'
import { ArrowRight, Check, X, UtensilsCrossed, Euro, RefreshCw, Globe, Sparkles, Leaf, Camera, Heart, Clock, Megaphone } from 'lucide-react'
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu papier vs menu digital — MonTablo',
  description:
    'Comparatif complet entre le menu papier et le menu digital MonTablo pour votre restaurant. Coût, flexibilite, hygiène, expérience client : découvrez pourquoi passer au digital.',
  openGraph: {
    title: 'Menu papier vs menu digital — MonTablo',
    description:
      'Comparatif complet entre le menu papier et le menu digital pour restaurant. Découvrez les avantages du menu digital MonTablo.',
  },
}

const comparisonRows = [
  {
    icon: Euro,
    criteria: 'Coût annuel',
    paper: '400 a 1 200 € (impressions repetees)',
    montablo: 'À partir de 19 € HT/mois (Essentiel)',
    advantage: 'montablo' as const,
  },
  {
    icon: Clock,
    criteria: 'Vitesse de mise à jour',
    paper: 'Plusieurs jours (graphiste + imprimeur)',
    montablo: 'Instantanee, en quelques secondes',
    advantage: 'montablo' as const,
  },
  {
    icon: Heart,
    criteria: 'Hygiene',
    paper: 'Manipule par tous les clients',
    montablo: 'Zéro contact — le client utilise son téléphone',
    advantage: 'montablo' as const,
  },
  {
    icon: Globe,
    criteria: 'Support multilingue',
    paper: 'Un menu par langue (coût x2, x3...)',
    montablo: 'Bilingue FR/EN intégré, changement en un tap',
    advantage: 'montablo' as const,
  },
  {
    icon: RefreshCw,
    criteria: 'Menu du jour',
    paper: 'Ardoise manuelle ou feuille volante',
    montablo: 'Ajout en 30 secondes, visible instantanément',
    advantage: 'montablo' as const,
  },
  {
    icon: Megaphone,
    criteria: 'Promotions',
    paper: 'Impossible sans réimprimer',
    montablo: 'Programmables avec dates de debut et de fin',
    advantage: 'montablo' as const,
  },
  {
    icon: Leaf,
    criteria: 'Impact environnemental',
    paper: 'Papier, encre, transport a chaque changement',
    montablo: 'Zéro papier, zéro déchet',
    advantage: 'montablo' as const,
  },
  {
    icon: Sparkles,
    criteria: 'Experience client',
    paper: 'Statique, parfois abimee ou obsolète',
    montablo: 'Design moderne, toujours à jour',
    advantage: 'montablo' as const,
  },
  {
    icon: Camera,
    criteria: 'Photos des plats',
    paper: 'Coût d\'impression élevé en couleur',
    montablo: 'Photos optimisees pour chaque plat',
    advantage: 'montablo' as const,
  },
]

const faqs = [
  {
    question: 'Combien coûte un menu papier par an pour un restaurant ?',
    answer:
      'Un restaurant qui met à jour sa carte 3 a 4 fois par an depense entre 400 et 1 200 euros en frais d\'impression, graphisme et livraison. Avec MonTablo, vous payez un forfait fixe à partir de 19 € HT par mois, mises à jour illimitées incluses.',
  },
  {
    question: 'Le menu digital remplace-t-il totalement le menu papier ?',
    answer:
      'La plupart des restaurants qui adoptent MonTablo abandonnent complètement le menu papier. Le QR code sur la table suffit : vos clients scannent et consultent la carte sur leur téléphone. Vous pouvez neanmoins conserver quelques cartes papier en complement si vous le souhaitez.',
  },
  {
    question: 'Les clients ages arrivent-ils a utiliser un menu digital ?',
    answer:
      'Oui. Le menu MonTablo s\'ouvre directement dans le navigateur du téléphone, sans application a télécharger. L\'interface est simple et lisible. 95 % des Français de plus de 60 ans possedent un smartphone. Et pour les rares exceptions, votre equipe peut présenter le menu sur une tablette.',
  },
  {
    question: 'Le menu digital est-il vraiment plus hygienique ?',
    answer:
      'Absolument. Le menu papier est manipule par des dizaines de clients chaque jour et constitue un vecteur de transmission de germes. Avec un menu digital, chaque client consulte la carte sur son propre téléphone — zéro contact partage.',
  },
  {
    question: 'Comment passer du menu papier au menu digital rapidement ?',
    answer:
      'Avec MonTablo, la transition prend moins de 5 minutes. Photographiez votre carte papier et notre IA extrait automatiquement vos plats, descriptions et prix. Générez ensuite votre QR code et placez-le sur vos tables. C\'est tout.',
  },
]

export default function ComparePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Comparatifs', url: `${base}/compare` },
          { name: 'MonTablo vs Menu papier', url: `${base}/compare/montablo-vs-menu-papier` },
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
          <span className="text-foreground">MonTablo vs Menu papier</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16 text-center">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Comparatif
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 text-balance">
          MonTablo vs menu papier : la comparaison honnête.
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Coût, mise à jour, hygiène, multilingue. Ce que vous gagnez vraiment en passant au{' '}
          <Link href="/fonctionnalites" className="text-primary hover:underline">
            menu digital
          </Link>
          , et ce que vous perdez.
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
              <span className="text-[13px] font-medium text-muted/60 uppercase tracking-wide">Menu papier</span>
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
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-[13px] sm:text-[14px] text-muted leading-relaxed">{row.paper}</span>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-l border-border/50 bg-primary/[0.03] flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
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
            Pourquoi le menu digital est un meilleur choix
          </h2>

          {/* Cost */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Un coût maîtrise et previsible
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Un restaurant qui change sa carte 3 a 4 fois par an depense en moyenne entre
              400 et 1 200 euros en impression (graphiste, imprimeur, livraison). A cela
              s&apos;ajoutent les coûts imprevus : une erreur de prix, un plat en rupture,
              une nouvelle reglementation sur les allergènes.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Avec MonTablo, vous payez un{' '}
              <Link href="/tarifs" className="text-primary hover:underline">
                forfait fixe à partir de 19 € HT par mois (Essentiel)
              </Link>
              . Mises à jour illimitées, aucun coût supplementaire. Le retour sur
              investissement est immédiat des le deuxieme mois.
            </p>
          </div>

          {/* Flexibility */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Une flexibilite totale au quotidien
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Avec un menu papier, chaque modification est un projet : appeler le graphiste,
              valider les epreuves, attendre l&apos;impression, distribuer les nouvelles
              cartes. Resultat : beaucoup de restaurateurs gardent des menus obsolètes
              pendant des semaines.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Avec MonTablo, vous modifiez un prix, ajoutez un plat du jour ou lancez une
              promotion en quelques secondes depuis votre téléphone. La modification est
              visible instantanément par vos clients. Fini les menus biffes au stylo.
            </p>
          </div>

          {/* Customer expérience */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Une expérience client moderne
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Les clients d&apos;aujourd&apos;hui sont habitués au digital. Un menu avec
              des photos appétissantes, une navigation fluide et la possibilite de changer
              de langue fait la différence — surtout en zone touristique.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              MonTablo propose un design élégant, adapte aux couleurs de votre restaurant.
              Vos plats sont mis en valeur avec des{' '}
              <Link href="/fonctionnalites" className="text-primary hover:underline">
                photos optimisees
              </Link>
              , et le menu bilingue français/anglais est intégré en standard.
            </p>
          </div>

          {/* Sustainability */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Un geste concret pour l&apos;environnement
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Chaque réimpression de carte represente du papier, de l&apos;encre et du
              transport. Multiplie par des milliers de restaurants, l&apos;impact
              environnemental est considerable.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Passer au menu digital, c&apos;est supprimer ces déchets a la source. Un
              argument qui compte de plus en plus pour vos clients, et un engagement que
              vous pouvez afficher fierement.
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
            Prêt a remplacer votre menu papier ?
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
