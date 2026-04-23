import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  QrCode,
  MapPin,
  Printer,
  Eye,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QR Code Restaurant — Guide Complet 2026',
  description:
    'Comment utiliser un QR code dans votre restaurant : placement, design, bonnes pratiques. Générez votre QR code menu en 5 minutes.',
  openGraph: {
    title: 'QR Code Restaurant — Guide Complet 2026',
    description:
      'Comment utiliser un QR code dans votre restaurant : placement, design, bonnes pratiques.',
  },
}

const placements = [
  {
    icon: MapPin,
    location: 'Sur chaque table',
    description:
      'L\'emplacement essentiel. Utilisez un autocollant, un chevalet ou intégrez le QR code directement dans le set de table. Chaque table doit avoir son propre accès au menu.',
    tip: 'Privilegiez un support rigide (chevalet en plexiglas ou bois) pour eviter que le QR code ne s\'abime.',
  },
  {
    icon: Eye,
    location: 'A l\'entrée du restaurant',
    description:
      'Permettez aux passants de consulter votre carte avant même d\'entrer. Un QR code en vitrine attire les clients indécis et facilite la décision.',
    tip: 'Accompagnez le QR code d\'un petit texte : "Découvrez notre carte" ou "Consultez notre menu".',
  },
  {
    icon: Printer,
    location: 'Sur les supports marketing',
    description:
      'Cartes de visite, flyers, sacs a emporter, réseaux sociaux — le QR code peut être imprime sur tous vos supports pour rediriger vers votre menu en ligne.',
    tip: 'Ajoutez le QR code a vos sacs de livraison pour que les clients découvrent l\'ensemble de votre carte.',
  },
  {
    icon: ShieldCheck,
    location: 'En terrasse et a l\'extérieur',
    description:
      'Pour les terrasses, optez pour des supports resistants aux intemperies. Un QR code plastifié ou gravé sur metal fonctionne parfaitement.',
    tip: 'Testez la lisibilité du QR code en plein soleil — certains contrastes de couleur fonctionnent mieux que d\'autres.',
  },
]

const designTips = [
  {
    title: 'Gardez un contraste fort',
    description:
      'Le QR code doit rester lisible. Privilegiez un fond clair avec un motif sombre. Un contraste insuffisant empêchera certains téléphones de lire le code.',
  },
  {
    title: 'Ajoutez votre logo au centre',
    description:
      'La plupart des générateurs de QR code permettent d\'inserer un logo au centre. Cela renforce votre identité visuelle sans nuire a la lisibilité.',
  },
  {
    title: 'Choisissez les couleurs de votre marque',
    description:
      'Un QR code aux couleurs de votre restaurant s\'intégré harmonieusement dans votre décoration. Evitez simplement les couleurs trop claires pour le motif.',
  },
  {
    title: 'Respectez une taille minimum',
    description:
      'Pour une lecture fiable, le QR code doit faire au moins 3 x 3 cm sur un support de table, et au moins 10 x 10 cm pour un affichage en vitrine.',
  },
  {
    title: 'Ajoutez un appel a l\'action',
    description:
      'Ne laissez pas le QR code seul. Ajoutez un texte comme "Scannez pour voir le menu" ou "Découvrez notre carte". Le client doit comprendre immédiatement a quoi sert le code.',
  },
  {
    title: 'Testez avant d\'imprimer',
    description:
      'Scannez toujours votre QR code avec plusieurs téléphones avant de lancer l\'impression. Vérifiez qu\'il fonctionne a différentes distances et sous différents éclairages.',
  },
]

const bestPractices = [
  {
    title: 'Formez votre equipe',
    description:
      'Vos serveurs doivent pouvoir expliquer en une phrase comment scanner le QR code. "Il suffit d\'ouvrir la caméra de votre téléphone et de viser le code" — c\'est aussi simple que cela.',
  },
  {
    title: 'Proposez une alternative',
    description:
      'Gardez quelques menus papier pour les clients qui preferent ou qui n\'ont pas de smartphone. Le QR code est un complement, pas un remplacement force.',
  },
  {
    title: 'Vérifiez régulièrement vos QR codes',
    description:
      'Assurez-vous que tous les QR codes de votre restaurant sont lisibles et renvoient vers la bonne page. Un QR code abime ou un lien casse donne une mauvaise impression.',
  },
  {
    title: 'Mettez à jour votre menu, pas votre QR code',
    description:
      'Avec une solution comme MonTablo, le QR code reste le même. C\'est le contenu du menu qui change. Vous n\'avez jamais besoin de réimprimer vos QR codes pour mettre à jour votre carte.',
  },
  {
    title: 'Optimisez le temps de chargement',
    description:
      'Le menu doit se charger en moins de 3 secondes. Un client qui attend trop longtemps abandonnera et demandera un menu papier. Choisissez une solution qui optimise les performances.',
  },
]

export default function QrCodeRestaurantPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'QR Code Restaurant', url: `${base}/qr-code-restaurant` },
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
      <div className="max-w-[780px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">QR Code Restaurant</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[780px] mx-auto px-6 pt-8 pb-12">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Guide complet
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
          QR code restaurant : le guide complet pour votre établissement
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-8">
          Le QR code est devenu l&apos;outil incontournable pour donner accès a votre{' '}
          <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
            menu digital
          </Link>
          . Découvrez comment le mettre en place, ou le placer et comment l&apos;optimiser
          pour offrir la meilleure expérience a vos clients.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
        >
          Générer mon QR code gratuitement
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* What is a QR code */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Qu&apos;est-ce qu&apos;un QR code pour restaurant ?
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Un QR code (Quick Response code) est un code-barres en deux dimensions que vos
            clients scannent avec la caméra de leur téléphone. En restaurant, il sert
            principalement a donner accès a votre menu digital sans aucun contact physique.
          </p>
          <p>
            Concretement, le client ouvre la caméra de son smartphone, vise le QR code pose sur
            la table, et votre carte s&apos;affiche instantanément dans son navigateur. Aucune
            application a télécharger, aucune inscription nécessaire. Le processus prend moins
            de 3 secondes.
          </p>
          <p>
            Depuis 2020, l&apos;usage des QR codes en restauration a explose en France. Ce qui
            etait un outil de niche est devenu un standard adopte par les bistrots de quartier
            comme par les restaurants étoiles. Les clients y sont habitués et s&apos;attendent
            de plus en plus a trouver un QR code sur la table.
          </p>
        </div>
      </section>

      {/* How to set up */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Comment générer un QR code pour votre restaurant
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Il existe deux approches pour obtenir un QR code menu :
          </p>
          <div className="space-y-6 mt-6">
            <div className="bg-white border border-border/50 rounded-[16px] p-6">
              <h3 className="font-medium text-foreground mb-2">Option 1 : Un générateur gratuit + un PDF</h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Vous créez un PDF de votre carte, le mettez en ligne et générez un QR code
                qui pointe vers ce fichier. C&apos;est gratuit, mais chaque modification de
                votre carte nécessite de regenerer un nouveau PDF et parfois un nouveau QR code.
                L&apos;expérience mobile est médiocre (zoom, defilement horizontal).
              </p>
            </div>
            <div className="bg-white border border-primary/20 rounded-[16px] p-6 ring-1 ring-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-foreground">Option 2 : Une solution dédiée comme MonTablo</h3>
                <span className="text-[11px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-full">Recommande</span>
              </div>
              <p className="text-[14px] text-muted leading-relaxed">
                Vous créez votre{' '}
                <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
                  menu digital
                </Link>{' '}
                sur une plateforme dédiée. Le QR code est généré automatiquement et ne change
                jamais — seul le contenu du menu évolue. L&apos;expérience mobile est optimisee,
                avec un design professionnel et des fonctionnalités avancees (menu du jour,
                promotions, photos, bilingue).
              </p>
            </div>
          </div>
          <p className="mt-4">
            Avec{' '}
            <Link href="/fonctionnalites" className="text-primary hover:underline">
              MonTablo
            </Link>
            , votre QR code est prêt en moins de 5 minutes. Vous le personnalisez aux couleurs
            de votre restaurant et le téléchargez en haute résolution pour l&apos;impression.
          </p>
        </div>
      </section>

      {/* Where to place */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="max-w-[780px] mx-auto mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
            Où placer le QR code dans votre restaurant ?
          </h2>
          <p className="text-[15px] text-muted leading-relaxed">
            L&apos;emplacement du QR code est aussi important que le QR code lui-même. Un code
            mal place ne sera pas scanne. Voici les emplacements stratégiques :
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-[1120px]">
          {placements.map((placement) => {
            const Icon = placement.icon
            return (
              <div
                key={placement.location}
                className="bg-white border border-border/50 rounded-[16px] p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{placement.location}</h3>
                <p className="text-[14px] text-muted leading-relaxed mb-3">{placement.description}</p>
                <div className="flex items-start gap-2 bg-accent/5 rounded-lg p-3">
                  <Lightbulb className="w-4 h-4 text-accent-dark shrink-0 mt-0.5" />
                  <p className="text-[13px] text-muted/70 leading-relaxed">{placement.tip}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Design tips */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Design du QR code : 6 conseils pour un resultat professionnel
        </h2>
        <p className="text-[15px] text-muted leading-relaxed mb-8">
          Un QR code bien designe renforce votre image de marque et incite davantage vos
          clients a le scanner. Voici nos recommandations :
        </p>
        <div className="space-y-6">
          {designTips.map((tip, i) => (
            <div key={tip.title} className="flex gap-5">
              <span className="font-serif text-2xl text-primary/30 font-bold shrink-0 w-10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-medium text-foreground mb-1">{tip.title}</h3>
                <p className="text-[14px] text-muted leading-relaxed">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best practices */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Bonnes pratiques pour le QR code en restaurant
        </h2>
        <p className="text-[15px] text-muted leading-relaxed mb-8">
          Au-dela du design et du placement, quelques bonnes pratiques garantissent une
          expérience optimale pour vos clients et votre equipe :
        </p>
        <div className="space-y-5">
          {bestPractices.map((practice) => (
            <div key={practice.title} className="border-b border-border/50 pb-5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">{practice.title}</h3>
                  <p className="text-[14px] text-muted leading-relaxed">{practice.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Link to menu digital page */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          QR code et menu digital : un duo indissociable
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Le QR code n&apos;est que le point d&apos;entrée. Ce qui compte vraiment, c&apos;est
            la qualite du menu digital vers lequel il renvoie. Un QR code parfaitement place
            mais qui ouvre un simple PDF mal formaté sur mobile ne donnera pas satisfaction a
            vos clients.
          </p>
          <p>
            Pour offrir une expérience complète, optez pour une solution qui combine un QR code
            personnalisé et un{' '}
            <Link href="/menu-digital-restaurant" className="text-primary hover:underline">
              menu digital optimise pour mobile
            </Link>{' '}
            — avec photos, descriptions, allergènes, menu du jour et mises à jour en temps réel.
          </p>
          <p>
            MonTablo reunit les deux dans un seul outil : vous créez votre menu, vous
            personnalisez votre QR code, et vos clients profitent d&apos;une expérience fluide
            et professionnelle. Découvrez toutes nos{' '}
            <Link href="/fonctionnalites" className="text-primary hover:underline">
              fonctionnalités
            </Link>{' '}
            ou consultez nos{' '}
            <Link href="/tarifs" className="text-primary hover:underline">
              tarifs
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ mini section */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">
          Questions fréquentes sur le QR code restaurant
        </h2>
        <div className="space-y-5">
          {[
            {
              q: 'Les clients savent-ils scanner un QR code ?',
              a: 'Oui. Depuis 2020, la quasi-totalite des clients savent scanner un QR code. Sur les smartphones recents (iOS et Android), il suffit d\'ouvrir la caméra et de viser le code. Aucune application supplementaire n\'est nécessaire.',
            },
            {
              q: 'Mon QR code change-t-il si je modifie mon menu ?',
              a: 'Non. Avec MonTablo, le QR code reste identique. C\'est le contenu du menu qui évolue. Vous n\'avez jamais besoin de réimprimer vos QR codes quand vous mettez à jour votre carte.',
            },
            {
              q: 'Quel format pour imprimer mon QR code ?',
              a: 'MonTablo vous fournit votre QR code en haute résolution (PNG). Pour un autocollant de table, un format de 5 x 5 cm est idéal. Pour un affichage en vitrine, prévoyez au moins 15 x 15 cm.',
            },
            {
              q: 'Le QR code fonctionne-t-il en extérieur ?',
              a: 'Oui, a condition de maintenir un bon contraste et de proteger le support des intemperies. Plastifiez vos QR codes ou optez pour un support rigide et resistant.',
            },
          ].map((faq) => (
            <div key={faq.q} className="border-b border-border/50 pb-5">
              <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
              <p className="text-[15px] text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-muted mt-6">
          D&apos;autres questions ? Consultez notre{' '}
          <Link href="/faq" className="text-primary hover:underline">
            FAQ complète
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <div className="bg-primary rounded-[20px] py-16 px-8 text-center">
          <QrCode className="w-10 h-10 text-white/40 mx-auto mb-4" />
          <h2 className="font-serif text-3xl text-white mb-3">
            Générez votre QR code en 5 minutes
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
            QR code personnalisé aux couleurs de votre restaurant.
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
