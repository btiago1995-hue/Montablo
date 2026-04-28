import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  QrCode,
  Zap,
  Euro,
  Leaf,
  Smartphone,
  Clock,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu Digital Restaurant — Guide Complet 2026',
  description:
    'Tout savoir sur le menu digital pour restaurant : avantages, fonctionnement, coût et mise en place. Modernisez votre carte des aujourd\'hui.',
  openGraph: {
    title: 'Menu Digital Restaurant — Guide Complet 2026',
    description:
      'Tout savoir sur le menu digital pour restaurant : avantages, fonctionnement, coût et mise en place.',
  },
}

const benefits = [
  {
    icon: Zap,
    title: 'Mise à jour instantanée',
    description:
      'Modifiez un prix, ajoutez un plat ou désactivez une catégorie en quelques secondes. Vos clients voient les changements immédiatement, sans aucune réimpression.',
  },
  {
    icon: Euro,
    title: 'Economies considerables',
    description:
      'Fini les coûts d\'impression a chaque changement de prix ou de saison. Un menu digital s\'amortit en quelques semaines seulement.',
  },
  {
    icon: Leaf,
    title: 'Demarche eco-responsable',
    description:
      'Reduisez votre consommation de papier et d\'encre. Un argument de plus en plus apprécié par vos clients soucieux de l\'environnement.',
  },
  {
    icon: Smartphone,
    title: 'Experience client moderne',
    description:
      'Offrez a vos clients une expérience fluide sur leur propre téléphone. Photos des plats, descriptions détaillées, allergènes — tout est accessible en un scan.',
  },
  {
    icon: Clock,
    title: 'Gain de temps au quotidien',
    description:
      'Le menu du jour se met à jour en quelques secondes chaque matin. Les promotions apparaissent et disparaissent automatiquement aux dates prévues.',
  },
  {
    icon: TrendingUp,
    title: 'Image professionnelle',
    description:
      'Un menu digital soigné renvoie une image moderne et professionnelle. Vos clients savent que votre établissement est a la pointe.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Créez votre compte',
    description:
      'Inscrivez-vous gratuitement en moins d\'une minute. Aucune carte bancaire n\'est requise pour l\'essai de 14 jours.',
  },
  {
    number: '02',
    title: 'Ajoutez vos plats',
    description:
      'Saisissez vos plats manuellement ou photographiez votre carte papier — notre IA extrait automatiquement noms, descriptions et prix.',
  },
  {
    number: '03',
    title: 'Personnalisez votre menu',
    description:
      'Choisissez les couleurs de votre restaurant, organisez vos catégories, ajoutez des photos de vos plats.',
  },
  {
    number: '04',
    title: 'Générez votre QR code',
    description:
      'Telechargez votre QR code personnalisé en haute résolution. Imprimez-le et placez-le sur vos tables.',
  },
]

const comparisons = [
  { feature: 'Coût par modification', paper: 'Reimpression complète', digital: 'Gratuit et instantané' },
  { feature: 'Mise à jour', paper: 'Plusieurs jours', digital: 'Quelques secondes' },
  { feature: 'Photos des plats', paper: 'Coût d\'impression élevé', digital: 'Incluses sans surcout' },
  { feature: 'Menu du jour', paper: 'Ardoise ou feuille volante', digital: 'Integre et automatisé' },
  { feature: 'Langues', paper: 'Un menu par langue', digital: 'Bilingue FR/EN en un tap' },
  { feature: 'Impact ecologique', paper: 'Papier et encre', digital: 'Zéro déchet' },
  { feature: 'Hygiene', paper: 'Manipule par tous', digital: 'Sans contact' },
]

export default function MenuDigitalRestaurantPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Menu Digital Restaurant', url: `${base}/menu-digital-restaurant` },
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
          <span className="text-foreground">Menu Digital Restaurant</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[780px] mx-auto px-6 pt-8 pb-12">
        <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Guide complet
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
          Menu digital restaurant : tout ce que vous devez savoir en 2026
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-8">
          Le menu digital est devenu un outil incontournable pour les restaurants modernes.
          Découvrez comment il fonctionne, pourquoi l&apos;adopter et comment le mettre en
          place dans votre établissement en quelques minutes.
        </p>
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
        >
          Créer mon menu digital gratuitement
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* What is a digital menu */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Qu&apos;est-ce qu&apos;un menu digital pour restaurant ?
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Un menu digital restaurant est une version numérique de votre carte, accessible
            depuis le téléphone de vos clients. Au lieu de distribuer des menus papier, vous
            placez un{' '}
            <Link href="/qr-code-restaurant" className="text-primary hover:underline">
              QR code sur chaque table
            </Link>
            . Vos clients le scannent avec leur téléphone et accèdent instantanément a votre
            carte complète : plats, descriptions, prix, photos et allergènes.
          </p>
          <p>
            Contrairement a une simple photo de votre carte en PDF, un vrai menu digital est
            interactif, mis à jour en temps réel et optimise pour la lecture sur mobile. Il se
            charge en moins de deux secondes, s&apos;adapte a tous les ecrans et ne nécessite
            aucune application a télécharger.
          </p>
          <p>
            En France, l&apos;adoption du menu digital a explose depuis 2020. Aujourd&apos;hui,
            plus de 40 % des restaurants proposent une version numérique de leur carte. Les
            clients, habitués aux usages digitaux, apprécient la simplicite et la rapidite de
            consultation.
          </p>
        </div>
      </section>

      {/* Why restaurants need one */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Pourquoi votre restaurant a besoin d&apos;un menu digital
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Les attentes de vos clients évoluent. Ils veulent consulter votre carte rapidement,
            voir des photos appétissantes et connaître les allergènes sans avoir a demander au
            serveur. Un menu digital répond a toutes ces attentes de maniere fluide.
          </p>
          <p>
            Mais les bénéfices vont bien au-dela de l&apos;expérience client. Pour le
            restaurateur, le menu digital est un outil de gestion quotidien : modifier un prix
            prend 10 secondes, ajouter le menu du jour se fait chaque matin en quelques clics,
            et les promotions se programment a l&apos;avance.
          </p>
          <p>
            Selon une étude de TheFork, les restaurants qui proposent un menu avec photos voient
            leurs ventes augmenter de 15 a 30 %. Les clients commandent davantage lorsqu&apos;ils
            visualisent les plats, ce qui se traduit par un ticket moyen plus élevé.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-8 max-w-[780px] mx-auto">
          Les 6 avantages clés du menu digital
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-white border border-border/50 rounded-[16px] p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-[14px] text-muted leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-8">
          Comment mettre en place un menu digital ?
        </h2>
        <p className="text-[15px] text-muted leading-relaxed mb-8">
          Avec une solution comme{' '}
          <Link href="/fonctionnalites" className="text-primary hover:underline">
            MonTablo
          </Link>
          , la mise en place prend moins de 10 minutes. Aucune compétence technique n&apos;est
          requise. Voici les étapes :
        </p>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-5">
              <span className="font-serif text-2xl text-primary/30 font-bold shrink-0 w-10">
                {step.number}
              </span>
              <div>
                <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                <p className="text-[14px] text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-muted leading-relaxed mt-8">
          C&apos;est tout. Votre menu digital est en ligne et accessible a vos clients. Vous
          pouvez le modifier a tout moment depuis votre téléphone ou votre ordinateur.
          Consultez notre{' '}
          <Link href="/faq" className="text-primary hover:underline">
            FAQ
          </Link>{' '}
          pour plus de détails.
        </p>
      </section>

      {/* Paper vs digital comparison */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Menu papier vs menu digital : la comparaison
        </h2>
        <p className="text-[15px] text-muted leading-relaxed mb-8">
          Le menu papier a ses qualites, mais il présente des limites de plus en plus évidentes
          face aux attentes modernes. Voici un comparatif objectif :
        </p>
        <div className="border border-border/50 rounded-[16px] overflow-hidden">
          <div className="grid grid-cols-3 bg-accent/5 border-b border-border/50 p-4">
            <span className="text-[13px] font-medium text-foreground"></span>
            <span className="text-[13px] font-medium text-foreground text-center">Menu papier</span>
            <span className="text-[13px] font-medium text-primary text-center">Menu digital</span>
          </div>
          {comparisons.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 p-4 ${i < comparisons.length - 1 ? 'border-b border-border/50' : ''}`}
            >
              <span className="text-[13px] font-medium text-foreground">{row.feature}</span>
              <span className="text-[13px] text-muted text-center">{row.paper}</span>
              <span className="text-[13px] text-primary text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                {row.digital}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cost overview */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Combien coûte un menu digital pour restaurant ?
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Le coût d&apos;un menu digital varie selon la solution choisie. Les options gratuites
            sont souvent limitees (pas de personnalisation, publicite, fonctionnalités restreintes).
            Les solutions professionnelles se situent generalement entre 20 et 80 euros par mois.
          </p>
          <p>
            <Link href="/tarifs" className="text-primary hover:underline">
              MonTablo propose un tarif simple et transparent
            </Link>{' '}
            : 19 € HT par mois (Essentiel) à 39 € HT par mois (Pro), avec −10 % en annuel. Toutes les
            fonctionnalités sont incluses, sans frais cachés : plats illimités, QR code
            personnalisé, menu du jour, promotions, import IA, bilingue FR/EN.
          </p>
          <p>
            Pour mettre ce coût en perspective : une seule réimpression de 50 menus papier coûte
            entre 150 et 300 euros. Avec un menu digital, vous économisez des la première
            modification de prix. L&apos;investissement est rentabilise en quelques semaines.
          </p>
          <p>
            De plus, MonTablo offre un essai gratuit de 14 jours, sans carte bancaire. Vous
            pouvez tester toutes les fonctionnalités avant de vous engager.
          </p>
        </div>
      </section>

      {/* QR code section - link to sibling page */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Le QR code : la clé d&apos;accès a votre menu digital
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Le menu digital fonctionne grace a un QR code que vos clients scannent avec la caméra
            de leur téléphone. Ce QR code est unique a votre restaurant et renvoie directement
            vers votre carte en ligne. Aucune application a télécharger, aucune inscription
            nécessaire.
          </p>
          <p>
            L&apos;emplacement du QR code est stratégique : sur les tables, a l&apos;entrée, en
            vitrine, sur vos cartes de visite. Pour tout savoir sur l&apos;utilisation optimale
            du QR code dans votre restaurant, consultez notre{' '}
            <Link href="/qr-code-restaurant" className="text-primary hover:underline">
              guide complet sur le QR code en restauration
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Who is it for */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">
          Pour quels types de restaurants ?
        </h2>
        <div className="space-y-4 text-[15px] text-muted leading-relaxed">
          <p>
            Le menu digital s&apos;adapte a tous les types d&apos;établissements de restauration :
          </p>
          <ul className="space-y-2.5 ml-1">
            {[
              'Restaurants traditionnels et gastronomiques',
              'Bistrots et brasseries',
              'Restaurants rapides et fast-casual',
              'Cafes, salons de the et bars',
              'Food trucks et restaurants éphémères',
              'Hôtels et restaurants d\'hôtel',
              'Restaurants de plage et terrasses saisonnières',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-dark shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
          <p>
            Que vous ayez 10 plats ou 200, que votre carte change tous les jours ou une fois par
            saison, le menu digital s&apos;adapte a votre rythme. C&apos;est particulierement
            utile pour les restaurants qui ont un menu du jour, des plats saisonniers ou des
            promotions régulières.
          </p>
        </div>
      </section>

      {/* FAQ mini section */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">
          Questions fréquentes sur le menu digital
        </h2>
        <div className="space-y-5">
          {[
            {
              q: 'Mes clients ont-ils besoin d\'une application ?',
              a: 'Non. Le menu s\'ouvre directement dans le navigateur du téléphone, sans aucun téléchargement. Compatible avec tous les smartphones iOS et Android.',
            },
            {
              q: 'Puis-je garder mon menu papier en complement ?',
              a: 'Bien sur. Beaucoup de restaurants proposent les deux. Le menu digital ne remplace pas forcement le papier — il le complète. Certains clients prefereront toujours le papier, et c\'est parfaitement normal.',
            },
            {
              q: 'Le menu digital fonctionne-t-il sans connexion internet ?',
              a: 'Vos clients ont besoin d\'une connexion internet (WiFi ou 4G/5G) pour accéder au menu. Aujourd\'hui, la quasi-totalite des clients disposent d\'un forfait mobile suffisant.',
            },
            {
              q: 'Est-ce que cela remplace les serveurs ?',
              a: 'Non. Le menu digital ne remplace pas le service humain — il le simplifie. Vos serveurs passent moins de temps a expliquer la carte et plus de temps a conseiller et servir vos clients.',
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
            Créez votre menu digital en 5 minutes
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            14 jours d&apos;essai gratuit. Aucune carte bancaire requise.
            Toutes les fonctionnalités incluses.
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
