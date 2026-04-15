import Link from 'next/link'
import { ArrowRight, Check, X, UtensilsCrossed, Euro, Zap, Utensils, RefreshCw, Globe, Sparkles, Megaphone, QrCode, Shield, CreditCard } from 'lucide-react'
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MonTablo vs Sunday : comparatif menu digital restaurant — MonTablo',
  description:
    'Comparatif detaille entre MonTablo et Sunday pour votre menu digital de restaurant. Prix, fonctionnalites, simplicite : decouvrez quelle solution choisir.',
  openGraph: {
    title: 'MonTablo vs Sunday : comparatif menu digital restaurant — MonTablo',
    description:
      'MonTablo vs Sunday : quel menu digital choisir pour votre restaurant ? Comparatif prix, fonctionnalites et simplicite.',
  },
}

const comparisonRows = [
  {
    icon: Euro,
    criteria: 'Prix',
    competitor: 'Tarification variable, souvent plus elevee',
    montablo: 'A partir de 26,99 euros/mois, tout inclus',
    advantage: 'montablo' as const,
  },
  {
    icon: Zap,
    criteria: 'Simplicite de mise en place',
    competitor: 'Installation plus complexe (paiement, materiel)',
    montablo: 'Pret en 5 minutes, zero materiel',
    advantage: 'montablo' as const,
  },
  {
    icon: Utensils,
    criteria: 'Focus menu',
    competitor: 'Le menu est secondaire au systeme de paiement',
    montablo: 'Concu 100 % autour du menu digital',
    advantage: 'montablo' as const,
  },
  {
    icon: RefreshCw,
    criteria: 'Menu du jour',
    competitor: 'Fonctionnalite limitee',
    montablo: 'Ajout en 30 secondes, visible instantanement',
    advantage: 'montablo' as const,
  },
  {
    icon: Megaphone,
    criteria: 'Promotions',
    competitor: 'Non oriente promotions',
    montablo: 'Programmables avec dates de debut et de fin',
    advantage: 'montablo' as const,
  },
  {
    icon: Globe,
    criteria: 'Bilingue',
    competitor: 'Support multilingue variable selon l\'offre',
    montablo: 'Bilingue FR/EN integre en standard',
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
    icon: QrCode,
    criteria: 'QR code personnalise',
    competitor: 'QR code standard',
    montablo: 'QR code aux couleurs de votre restaurant',
    advantage: 'montablo' as const,
  },
  {
    icon: Shield,
    criteria: 'Engagement',
    competitor: 'Contrat souvent requis',
    montablo: 'Sans engagement, resiliable a tout moment',
    advantage: 'montablo' as const,
  },
  {
    icon: CreditCard,
    criteria: 'Paiement integre',
    competitor: 'Paiement a table via QR code (point fort)',
    montablo: 'Non inclus (MonTablo se concentre sur le menu)',
    advantage: 'competitor' as const,
  },
]

const faqs = [
  {
    question: 'Quelle est la difference principale entre MonTablo et Sunday ?',
    answer:
      'Sunday est avant tout une solution de paiement a table par QR code, qui propose egalement un menu digital. MonTablo est entierement dedie au menu digital : design, mises a jour instantanees, menu du jour, promotions et import IA. Si votre priorite est le menu, MonTablo est plus adapte. Si vous cherchez principalement le paiement a table, Sunday peut etre plus pertinent.',
  },
  {
    question: 'Sunday est-il plus cher que MonTablo ?',
    answer:
      'Sunday applique generalement une commission sur les transactions de paiement en plus d\'eventuels frais d\'abonnement. MonTablo propose un forfait fixe a partir de 26,99 euros par mois (abonnement annuel) ou 29,99 euros par mois sans engagement, sans commission ni frais caches.',
  },
  {
    question: 'Puis-je utiliser MonTablo et Sunday en meme temps ?',
    answer:
      'Oui, c\'est tout a fait possible. Certains restaurateurs utilisent MonTablo pour leur menu digital (design, menu du jour, promotions) et Sunday pour le paiement a table. Les deux solutions sont complementaires.',
  },
  {
    question: 'MonTablo propose-t-il le paiement a table comme Sunday ?',
    answer:
      'Non. MonTablo se concentre exclusivement sur le menu digital pour offrir la meilleure experience possible : design soigne, import IA, menu du jour, promotions, bilingue. Le paiement a table n\'est pas dans notre perimetre.',
  },
  {
    question: 'Est-ce que Sunday convient aux petits restaurants ?',
    answer:
      'Sunday cible principalement les restaurants de taille moyenne a grande, avec un volume de transactions suffisant pour rentabiliser le systeme de paiement. MonTablo s\'adresse a tous les restaurants, y compris les petits etablissements, avec un prix fixe et accessible.',
  },
]

export default function CompareSundayPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Comparatifs', url: `${base}/compare` },
          { name: 'MonTablo vs Sunday', url: `${base}/compare/montablo-vs-sunday` },
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
          <span className="text-foreground">MonTablo vs Sunday</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-8 pb-16 text-center">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Comparatif
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 text-balance">
          MonTablo vs Sunday : quelle solution pour votre menu digital ?
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Sunday excelle dans le paiement a table. MonTablo se concentre sur le{' '}
          <Link href="/fonctionnalites" className="text-primary hover:underline">
            menu digital
          </Link>
          . Decouvrez quelle solution correspond le mieux a vos besoins.
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
              <span className="text-[13px] font-medium text-muted/60 uppercase tracking-wide">Sunday</span>
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
                  {row.advantage === 'competitor' ? (
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span className="text-[13px] sm:text-[14px] text-muted leading-relaxed">{row.competitor}</span>
                </div>
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-l border-border/50 bg-primary/[0.03] flex items-start gap-2">
                  {row.advantage === 'montablo' ? (
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
            Deux approches differentes pour le QR code en restaurant
          </h2>

          {/* Focus */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Sunday : le paiement avant tout
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Sunday s&apos;est fait connaitre grace a son systeme de paiement a table par
              QR code. Le client scanne, consulte l&apos;addition et paye directement depuis
              son telephone. Le menu digital est propose en complement, mais ce n&apos;est pas
              le coeur de leur produit.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Si votre objectif principal est d&apos;accelerer le paiement et de reduire
              l&apos;attente en caisse, Sunday est une option a considerer. En revanche, si
              votre priorite est un{' '}
              <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
                menu digital soigne et facile a gerer
              </Link>
              , MonTablo sera plus adapte.
            </p>
          </div>

          {/* Price */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Un modele tarifaire plus simple avec MonTablo
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Sunday applique generalement une commission sur chaque transaction de paiement,
              ce qui peut representer un cout significatif pour les restaurants a fort volume.
              Le montant total depend de votre chiffre d&apos;affaires.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              MonTablo propose un{' '}
              <Link href="/tarifs" className="text-primary hover:underline">
                forfait fixe a partir de 26,99 euros par mois
              </Link>
              , sans commission, sans frais caches et sans engagement. Vous savez exactement
              ce que vous payez chaque mois.
            </p>
          </div>

          {/* Menu features */}
          <div className="mb-14">
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Des fonctionnalites menu plus poussees
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              MonTablo a ete concu exclusivement pour le menu digital. Cela se traduit par
              des fonctionnalites dediees : menu du jour ajustable en 30 secondes, promotions
              temporaires programmables, import de votre carte par IA, QR code personnalise
              aux couleurs de votre etablissement.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              Decouvrez l&apos;ensemble de nos{' '}
              <Link href="/fonctionnalites" className="text-primary hover:underline">
                fonctionnalites
              </Link>{' '}
              pensees pour simplifier la gestion quotidienne de votre carte.
            </p>
          </div>

          {/* Honesty */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Quand choisir Sunday plutot que MonTablo ?
            </h3>
            <p className="text-[15px] text-muted leading-relaxed mb-4">
              Si le paiement a table est votre priorite absolue et que vous gerez un
              restaurant de taille moyenne a grande avec un fort volume de couverts,
              Sunday peut etre un choix pertinent. Leur ecosysteme de paiement est
              mature et bien integre.
            </p>
            <p className="text-[15px] text-muted leading-relaxed">
              En revanche, si vous cherchez un menu digital elegant, simple a gerer
              au quotidien et accessible financierement, MonTablo est la solution
              la plus adaptee — et vous pouvez toujours utiliser les deux en parallele.
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
            Pret a creer votre menu digital ?
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
