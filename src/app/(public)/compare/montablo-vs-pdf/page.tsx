import Link from 'next/link'
import { ArrowRight, Check, X, UtensilsCrossed, Smartphone, Zap, RefreshCw, Search, Accessibility, Palette, BarChart3, Globe, Heart } from 'lucide-react'
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu PDF vs menu digital : pourquoi abandonner le PDF — MonTablo',
  description:
    'Comparatif entre le menu PDF et le menu digital MonTablo. Experience mobile, mises a jour, SEO, accessibilite : decouvrez pourquoi le PDF n\'est plus adapte.',
  openGraph: {
    title: 'Menu PDF vs menu digital : pourquoi abandonner le PDF — MonTablo',
    description:
      'Menu PDF vs menu digital : pourquoi le PDF nuit a l\'experience client de votre restaurant et comment MonTablo resout le probleme.',
  },
}

const comparisonRows = [
  {
    icon: Smartphone,
    criteria: 'Experience mobile',
    competitor: 'Texte minuscule, zoom obligatoire, illisible',
    montablo: 'Concu mobile-first, navigation fluide',
    advantage: 'montablo' as const,
  },
  {
    icon: Zap,
    criteria: 'Vitesse de chargement',
    competitor: 'Fichier lourd, long a telecharger',
    montablo: 'Chargement instantane, pages optimisees',
    advantage: 'montablo' as const,
  },
  {
    icon: RefreshCw,
    criteria: 'Processus de mise a jour',
    competitor: 'Modifier le fichier, re-exporter, re-uploader',
    montablo: 'Modification en temps reel depuis votre telephone',
    advantage: 'montablo' as const,
  },
  {
    icon: Search,
    criteria: 'Referencement SEO',
    competitor: 'Invisible pour Google (contenu non indexable)',
    montablo: 'Pages HTML indexees, schema.org integre',
    advantage: 'montablo' as const,
  },
  {
    icon: Accessibility,
    criteria: 'Accessibilite',
    competitor: 'Non accessible (pas de lecteur d\'ecran, pas de zoom adaptatif)',
    montablo: 'Texte adaptatif, contraste, structure semantique',
    advantage: 'montablo' as const,
  },
  {
    icon: Palette,
    criteria: 'Design et presentation',
    competitor: 'Statique, meme rendu sur tous les ecrans',
    montablo: 'Design responsive adapte a chaque appareil',
    advantage: 'montablo' as const,
  },
  {
    icon: BarChart3,
    criteria: 'Statistiques',
    competitor: 'Aucune donnee sur la consultation',
    montablo: 'Nombre de vues, plats les plus consultes',
    advantage: 'montablo' as const,
  },
  {
    icon: Globe,
    criteria: 'Multilingue',
    competitor: 'Un fichier PDF par langue',
    montablo: 'Bilingue FR/EN integre, changement en un tap',
    advantage: 'montablo' as const,
  },
  {
    icon: Heart,
    criteria: 'Experience client',
    competitor: 'Frustration, pinch-to-zoom, abandon frequent',
    montablo: 'Navigation intuitive, photos, design soigne',
    advantage: 'montablo' as const,
  },
]

const faqs = [
  {
    question: 'Pourquoi le menu PDF est-il mauvais sur mobile ?',
    answer:
      'Un fichier PDF est concu pour l\'impression au format A4, pas pour un ecran de smartphone. Le texte est minuscule, le client doit zoomer et faire defiler dans tous les sens pour lire les plats et les prix. Selon plusieurs etudes, plus de 60 % des utilisateurs quittent un PDF avant de l\'avoir lu entierement sur mobile.',
  },
  {
    question: 'Le menu PDF est-il vraiment gratuit ?',
    answer:
      'Le PDF lui-meme ne coute rien a heberger, c\'est vrai. Mais les couts caches sont reels : le temps passe a mettre a jour le fichier a chaque changement de carte, la perte de clients frustres par l\'experience mobile, l\'absence de referencement sur Google, et l\'impossibilite de proposer un menu multilingue facilement. Ces couts invisibles depassent largement les 26,99 euros par mois d\'un menu digital.',
  },
  {
    question: 'Google peut-il indexer un menu PDF ?',
    answer:
      'Google peut techniquement lire le texte d\'un PDF, mais il le traite comme un document secondaire, pas comme une page web. Le contenu d\'un PDF n\'apparait pratiquement jamais dans les resultats de recherche locaux. Un menu digital HTML avec schema.org integre est beaucoup mieux reference.',
  },
  {
    question: 'Comment passer d\'un menu PDF a un menu digital ?',
    answer:
      'Avec MonTablo, la transition est immediate. Notre import par IA peut extraire automatiquement les plats, descriptions et prix de votre menu existant — qu\'il soit en PDF, en photo ou sur papier. En moins de 5 minutes, votre menu digital est en ligne.',
  },
  {
    question: 'Dois-je supprimer mon PDF si je passe au menu digital ?',
    answer:
      'Non, vous pouvez conserver votre PDF en complement. Mais une fois votre menu digital MonTablo en place, la plupart des restaurateurs abandonnent le PDF naturellement : le menu digital est plus facile a mettre a jour, plus agreable pour les clients et mieux reference.',
  },
]

export default function ComparePdfPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Comparatifs', url: `${base}/compare` },
          { name: 'Menu PDF vs menu digital', url: `${base}/compare/montablo-vs-pdf` },
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
              Fonctionnalites
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
          <span className="text-foreground">Menu PDF vs menu digital</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16 text-center">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Comparatif
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 text-balance">
          Menu PDF vs menu digital : pourquoi abandonner le PDF
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Beaucoup de restaurants utilisent encore un PDF comme menu en ligne.
          Decouvrez pourquoi c&apos;est une erreur et comment un{' '}
          <Link href="/fonctionnalites" className="text-primary hover:underline">
            menu digital
          </Link>{' '}
          transforme l&apos;experience client.
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
              <span className="text-[13px] font-medium text-muted/60 uppercase tracking-wide">Menu PDF</span>
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
                  <span className="text-[13px] sm:text-[14px] text-muted leading-relaxed">{row.competitor}</span>
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
            Pourquoi le PDF nuit a votre restaurant
          </h2>

          {/* Mobile experience */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Une experience mobile desastreuse
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Plus de 80 % de vos clients consulteront votre menu depuis un smartphone.
              Un PDF au format A4 sur un ecran de 6 pouces est illisible sans zoomer.
              Le client doit pincer, faire defiler horizontalement et verticalement,
              chercher les prix... C&apos;est frustrant et beaucoup abandonnent.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Un{' '}
              <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
                menu digital
              </Link>{' '}
              comme MonTablo est concu mobile-first : le texte est lisible, la navigation
              est intuitive, les photos sont optimisees. L&apos;experience est comparable
              a celle d&apos;une application.
            </p>
          </div>

          {/* Updates */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Des mises a jour penibles
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Pour mettre a jour un menu PDF, il faut ouvrir le fichier source (Word,
              InDesign, Canva...), effectuer les modifications, re-exporter en PDF,
              puis re-uploader le fichier sur votre site ou l&apos;envoyer a nouveau
              sur vos reseaux. Beaucoup de restaurateurs repoussent ces mises a jour
              et gardent des menus obsoletes pendant des semaines.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Avec MonTablo, vous modifiez un prix ou ajoutez un plat du jour en
              30 secondes depuis votre telephone. La modification est visible
              instantanement.
            </p>
          </div>

          {/* SEO */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Invisible sur Google
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Un PDF heberge sur votre site est traite comme un document annexe par
              Google, pas comme une page web a part entiere. Le contenu de votre menu
              n&apos;apparaitra pas dans les resultats de recherche locaux quand un
              client cherche &quot;restaurant italien pres de moi&quot;.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              MonTablo genere des pages HTML optimisees avec des donnees structurees
              (schema.org Restaurant et Menu). Votre carte est indexee et peut apparaitre
              directement dans les resultats Google.
            </p>
          </div>

          {/* Hidden costs */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Le vrai cout du &quot;gratuit&quot;
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Oui, heberger un PDF ne coute rien. Mais les couts caches sont bien
              reels : le temps perdu a chaque mise a jour, les clients frustres qui
              ne reviennent pas, le manque de visibilite sur Google, l&apos;impossibilite
              de proposer un menu multilingue simplement.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              A{' '}
              <Link href="/tarifs" className="text-primary hover:underline">
                26,99 euros par mois
              </Link>
              , MonTablo vous fait gagner du temps, ameliore l&apos;experience de vos
              clients et renforce votre presence en ligne. C&apos;est un investissement
              qui se rentabilise des le premier mois. Et vous pouvez consulter notre{' '}
              <Link href="/blog/menu-papier-vs-menu-digital" className="text-primary hover:underline">
                article complet
              </Link>{' '}
              sur le sujet.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-foreground text-center mb-12">
          Questions frequentes
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
            Pret a remplacer votre menu PDF ?
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
            Ou decouvrez nos{' '}
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
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalites</Link>
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
                <Link href="/mentions-legales" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Mentions legales</Link>
                <Link href="/cgu" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">CGU</Link>
                <Link href="/confidentialite" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Confidentialite</Link>
                <Link href="/cookies" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
