import Link from 'next/link'
import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — MonTablo | Questions fréquentes sur le menu digital',
  description:
    'Trouvez les réponses à toutes vos questions sur MonTablo : prix, essai gratuit, fonctionnalités, QR code, menu du jour et plus.',
  openGraph: {
    title: 'FAQ — MonTablo | Questions fréquentes',
    description:
      'Trouvez les réponses à toutes vos questions sur MonTablo.',
  },
}

const faqCategories = [
  {
    title: 'Premiers pas',
    faqs: [
      {
        question: 'Qu\'est-ce que MonTablo ?',
        answer:
          'MonTablo est un service en ligne qui permet aux restaurants de créer un menu digital élégant, accessible via QR code. Vos clients scannent le code sur la table et consultent votre carte sur leur téléphone.',
      },
      {
        question: 'Comment créer mon menu digital ?',
        answer:
          'Inscrivez-vous gratuitement, ajoutez vos plats avec noms, descriptions et prix, organisez-les par catégories, puis générez votre QR code. Le tout prend moins de 5 minutes.',
      },
      {
        question: 'Faut-il des compétences techniques ?',
        answer:
          'Non. MonTablo est conçu pour les restaurateurs, pas pour les informaticiens. L\'interface est simple et intuitive. Si vous savez utiliser un smartphone, vous savez utiliser MonTablo.',
      },
      {
        question: 'Puis-je importer ma carte existante ?',
        answer:
          'Oui. Notre fonctionnalité d\'import par IA vous permet de photographier votre carte papier. L\'IA extrait automatiquement vos plats, descriptions et prix.',
      },
    ],
  },
  {
    title: 'Tarifs et essai',
    faqs: [
      {
        question: 'Combien coûte MonTablo ?',
        answer:
          'MonTablo coûte 29,99 euros par mois en abonnement mensuel, ou 26,99 euros par mois en abonnement annuel (soit 323,89 euros par an). Toutes les fonctionnalités sont incluses, sans frais cachés.',
      },
      {
        question: 'L\'essai gratuit est-il vraiment sans carte bancaire ?',
        answer:
          'Oui. Vous bénéficiez de 14 jours d\'essai gratuit sans aucune carte bancaire requise. Vous ne serez jamais débité sans votre accord explicite.',
      },
      {
        question: 'Que se passe-t-il à la fin de l\'essai ?',
        answer:
          'Votre menu reste accessible en lecture seule pour vos clients. Vous ne perdez aucune donnée. Pour retrouver l\'accès à l\'édition, il vous suffit de vous abonner.',
      },
      {
        question: 'Y a-t-il un engagement ?',
        answer:
          'Non. L\'abonnement mensuel est sans engagement, résiliable à tout moment. L\'abonnement annuel est facturé en une fois mais vous pouvez ne pas le renouveler.',
      },
    ],
  },
  {
    title: 'Fonctionnalités',
    faqs: [
      {
        question: 'Puis-je mettre à jour mon menu en temps réel ?',
        answer:
          'Oui. Chaque modification (prix, ajout de plat, désactivation d\'une catégorie) est visible instantanément par vos clients. Plus besoin de réimprimer quoi que ce soit.',
      },
      {
        question: 'Comment fonctionne le menu du jour ?',
        answer:
          'Depuis votre tableau de bord, ajoutez vos plats du jour en quelques secondes chaque matin. Ils apparaissent automatiquement sur votre menu digital et disparaissent le lendemain.',
      },
      {
        question: 'Mon menu peut-il être bilingue ?',
        answer:
          'Oui. MonTablo supporte le français et l\'anglais. Vos clients peuvent changer de langue en un tap. Idéal pour les zones touristiques.',
      },
      {
        question: 'Puis-je ajouter des photos à mes plats ?',
        answer:
          'Oui. Vous pouvez ajouter une photo pour chaque plat. Les images sont optimisées automatiquement pour un chargement rapide sur mobile.',
      },
      {
        question: 'Comment fonctionnent les promotions ?',
        answer:
          'Créez une promotion avec une date de début et de fin. Elle apparaît automatiquement sur votre menu aux dates prévues et disparaît ensuite. Aucune intervention manuelle nécessaire.',
      },
    ],
  },
  {
    title: 'QR code et utilisation',
    faqs: [
      {
        question: 'Comment obtenir mon QR code ?',
        answer:
          'Votre QR code est généré automatiquement avec votre compte. Vous pouvez le personnaliser aux couleurs de votre restaurant et le télécharger en haute résolution pour l\'impression.',
      },
      {
        question: 'Où placer le QR code dans mon restaurant ?',
        answer:
          'Sur chaque table (autocollant, chevalet, ou intégré au set de table), à l\'entrée du restaurant, sur la vitrine, et sur vos supports marketing (carte de visite, flyers).',
      },
      {
        question: 'Mes clients ont-ils besoin d\'une application ?',
        answer:
          'Non. Le menu s\'ouvre directement dans le navigateur du téléphone. Aucun téléchargement ni application nécessaire. Compatible avec tous les smartphones.',
      },
    ],
  },
]

const allFaqs = faqCategories.flatMap((cat) => cat.faqs)

export default function FaqPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={faqJsonLd(allFaqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'FAQ', url: `${base}/faq` },
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
      <div className="max-w-[780px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">FAQ</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[780px] mx-auto px-6 pt-8 pb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
          Questions fréquentes
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Tout ce que vous devez savoir sur MonTablo et le menu digital pour votre restaurant.
        </p>
      </section>

      {/* FAQ sections */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        {faqCategories.map((category) => (
          <div key={category.title} className="mb-12 last:mb-0">
            <h2 className="font-serif text-2xl text-foreground mb-6">{category.title}</h2>
            <div className="space-y-5">
              {category.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-border/50 pb-5">
                  <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                  <p className="text-[15px] text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <div className="border border-border rounded-[20px] py-16 px-8 text-center bg-gradient-to-b from-white to-background">
          <h2 className="font-serif text-2xl text-foreground mb-3">
            Vous avez d&apos;autres questions ?
          </h2>
          <p className="text-muted mb-8">
            Essayez MonTablo gratuitement pendant 14 jours et découvrez par vous-même.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
          >
            Commencer l&apos;essai gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
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
