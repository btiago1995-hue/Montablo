import Link from 'next/link'
import { ArrowRight, UtensilsCrossed } from 'lucide-react'
import { JsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — MonTablo | Toutes les réponses sur le menu digital',
  description:
    'Découverte, configuration, tarifs, fonctionnalités, conformité — toutes les réponses sur MonTablo, le menu digital pour les restaurants du Genevois.',
  openGraph: {
    title: 'FAQ — MonTablo | Toutes les réponses',
    description:
      'Toutes les questions sur MonTablo, le menu digital pour les restaurants.',
  },
}

const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'

const faqCategories = [
  {
    title: 'Découverte du produit',
    faqs: [
      {
        question: 'Et mes clients âgés qui ne savent pas utiliser un QR code ?',
        answer:
          'Vous gardez 2-3 cartes papier en réserve pour eux. Le QR code est pour la majorité de votre clientèle qui a un smartphone, y compris les retraités. Et tous nos menus sont optimisés pour les yeux qui n\'ont plus 20 ans : grandes typos, contraste fort, photos lisibles, navigation sans pincement.',
      },
      {
        question: 'Je n\'ai pas le temps de tout configurer.',
        answer:
          'Vous prenez une photo de votre carte actuelle avec votre téléphone. Notre IA extrait tous les plats, prix et descriptions en 2 minutes. Vous corrigez ce qu\'il faut, et c\'est en ligne. Pour les 20 premiers restaurants du Genevois, je viens personnellement faire le setup chez vous : photo, import, QR code imprimé sur la table — vous êtes prêt avant la fin du déjeuner.',
      },
      {
        question: 'Les allergènes, c\'est obligatoire ?',
        answer:
          'Oui, depuis 2015 (règlement UE 1169/2011). Beaucoup de restaurants sont en infraction sans le savoir. MonTablo affiche automatiquement les 14 allergènes majeurs sur chaque plat, conformément à la loi. Vous cochez les allergènes une fois lors de la création du plat, et c\'est affiché à vie. Vous êtes en règle sans y penser.',
      },
      {
        question: 'Qu\'est-ce que MonTablo, concrètement ?',
        answer:
          'Une plateforme en ligne qui permet aux restaurants de créer un menu digital accessible par QR code. Vos clients scannent le code sur la table et consultent votre carte sur leur téléphone, dans leur langue, avec photos, allergènes et prix à jour.',
      },
    ],
  },
  {
    title: 'Configuration',
    faqs: [
      {
        question: 'Comment importer ma carte actuelle ?',
        answer:
          'Vous prenez une photo de votre carte papier avec votre téléphone (ou vous uploadez un PDF). Notre IA détecte les catégories, les noms de plats, les descriptions et les prix automatiquement. Vous relisez, ajustez ce qu\'il faut, et publiez. Comptez 5 à 10 minutes pour une carte standard.',
      },
      {
        question: 'Combien de temps pour être en ligne ?',
        answer:
          'Cinq minutes en autonomie via l\'import IA. Pour les 20 premiers restaurants du Genevois, je passe chez vous et on fait l\'installation ensemble en moins d\'une heure : compte créé, carte importée, QR code imprimé et collé sur les tables.',
      },
      {
        question: 'Puis-je modifier mon menu après publication ?',
        answer:
          'Oui, à tout moment, depuis votre téléphone ou ordinateur. Vous changez un prix, vous désactivez un plat en rupture, vous ajoutez le plat du jour : vos clients voient la nouvelle version en moins d\'une seconde. Aucune réimpression, aucun délai.',
      },
      {
        question: 'Faut-il des compétences techniques ?',
        answer:
          'Non. Si vous savez utiliser un smartphone, vous savez utiliser MonTablo. L\'interface est conçue pour des restaurateurs, pas pour des développeurs.',
      },
    ],
  },
  {
    title: 'Tarifs et facturation',
    faqs: [
      {
        question: 'Quelle différence entre Essentiel et Pro ?',
        answer:
          'Essentiel (19€ HT/mois) digitalise votre carte : QR code, menu en ligne, mises à jour temps réel, allergènes, photos. Pro (39€ HT/mois) ajoute les trois fonctionnalités qui rentabilisent l\'abonnement : filtrage des avis Google, cartes de fidélité Apple/Google Wallet, multilingue FR/EN/DE. Pour la plupart des restaurants du Genevois, Pro est le bon choix.',
      },
      {
        question: 'Que comprend Premium ?',
        answer:
          'Premium est sur devis, conçu pour les groupes multi-établissements (3 restaurants ou plus). Vous avez un tableau de bord centralisé, plusieurs comptes utilisateurs avec rôles, et une remise sur le tarif par établissement. Contactez-nous pour un devis.',
      },
      {
        question: 'L\'essai gratuit est-il vraiment sans carte bancaire ?',
        answer:
          'Oui. 14 jours d\'essai gratuit sur Pro, sans aucune carte bancaire requise. Vous ne serez jamais débité sans votre accord explicite. À la fin de l\'essai, vous choisissez : vous abonnez (Essentiel ou Pro), vous repassez en lecture seule gratuite, ou vous fermez votre compte.',
      },
      {
        question: 'Comment résilier ?',
        answer:
          'En un clic depuis votre tableau de bord. Aucun engagement, aucun préavis. La résiliation prend effet à la fin du mois en cours pour le mensuel, à la fin de la période payée pour l\'annuel. Vos données restent exportables 30 jours après la résiliation.',
      },
    ],
  },
  {
    title: 'Fonctionnalités spécifiques',
    faqs: [
      {
        question: 'Comment ça marche pour les avis Google ?',
        answer:
          'Après leur repas, vos clients sont invités à laisser un avis sur le menu digital. Les notes 4-5 étoiles sont redirigées vers votre fiche Google publique. Les notes 1-3 étoiles restent en interne : vous recevez une notification, vous pouvez contacter le client et résoudre le problème avant qu\'il ne devienne un avis public. Sur 6 mois, c\'est plusieurs dixièmes de note Google gagnés. (Disponible sur Pro.)',
      },
      {
        question: 'Compatible avec quels téléphones ?',
        answer:
          'Tous. Le menu s\'ouvre dans le navigateur web standard de tous les smartphones (iPhone, Android, Huawei). Aucune application à télécharger, aucun compte à créer. Compatible avec les téléphones lents et les connexions 3G : nous optimisons les images automatiquement.',
      },
      {
        question: 'Combien de plats puis-je avoir ?',
        answer:
          'Aucune limite. Vous pouvez avoir 20 plats ou 200, ça ne change rien au prix. Les catégories, sous-catégories, plats du jour, menus du midi, cartes des vins — tout est inclus.',
      },
      {
        question: 'Comment fonctionne le menu du jour ?',
        answer:
          'Depuis votre tableau de bord, vous ajoutez vos plats du jour en quelques secondes le matin. Ils apparaissent automatiquement sur votre menu digital, avec un badge visuel. À la fin de la journée, ils disparaissent ou vous les reportez en un tap.',
      },
      {
        question: 'Multilingue : c\'est traduit comment ?',
        answer:
          'Traduction automatique français vers anglais et allemand. Vous pouvez relire et corriger chaque traduction si vous voulez (utile pour les noms de plats régionaux comme "fondue savoyarde" ou "tartiflette"). Vos clients changent de langue en un tap. (Disponible sur Pro.)',
      },
    ],
  },
  {
    title: 'Conformité et sécurité',
    faqs: [
      {
        question: 'Que se passe-t-il avec mes données clients ?',
        answer:
          'Elles vous appartiennent. Nous ne les vendons à personne, nous ne les utilisons pas pour de la publicité, et vous pouvez les exporter ou les supprimer à tout moment. Les données collectées (avis, inscriptions fidélité) sont stockées dans des bases européennes et accessibles uniquement par vous.',
      },
      {
        question: 'RGPD : c\'est conforme ?',
        answer:
          'Oui. MonTablo est conforme au RGPD : consentement explicite pour la collecte d\'avis et l\'inscription fidélité, droit d\'accès et d\'effacement automatisé, registre des traitements à votre disposition. Notre politique de confidentialité est claire et lisible.',
      },
      {
        question: 'Où sont hébergés mes menus ?',
        answer:
          'En Europe (Francfort, Allemagne) sur des serveurs Vercel et Supabase. Aucun transfert de données hors UE. Sauvegardes quotidiennes chiffrées. SSL obligatoire sur tous les menus.',
      },
      {
        question: 'Que se passe-t-il si MonTablo ferme ?',
        answer:
          'Vous récupérez vos données en un clic (export JSON et CSV). Vos QR codes continuent de fonctionner pendant 30 jours après une éventuelle fermeture, le temps que vous migriez vers une autre solution. Nous ne sommes pas un piège — vos données vous appartiennent.',
      },
    ],
  },
]

const allFaqs = faqCategories.flatMap((cat) =>
  cat.faqs.map((f) => ({ question: f.question, answer: f.answer }))
)

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
      <nav className="sticky top-0 z-50 backdrop-blur-[14px] bg-background/80 border-b border-primary/5">
        <div className="max-w-[1240px] mx-auto px-8 flex items-center justify-between h-[76px]">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-serif text-2xl font-semibold text-primary tracking-tight"
            aria-label="MonTablo — accueil"
          >
            <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
            <span>MonTablo</span>
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            <Link href="/fonctionnalites" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              Fonctionnalités
            </Link>
            <Link href="/tarifs" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              Tarifs
            </Link>
            <Link href="/blog" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm text-primary hover:bg-green-mist transition">
              Connexion
            </Link>
            <CTALink
              href="/signup"
              label="faq_nav"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-primary-light transition"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[820px] mx-auto px-8 pt-16 sm:pt-20 pb-12 text-center">
        <span className={EYEBROW}>FAQ</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.022em] text-balance">
          Toutes les réponses, <em className="italic font-medium text-primary-light">sans détour</em>.
        </h1>
        <p className="text-[18px] text-muted leading-relaxed mt-5 max-w-[560px] mx-auto">
          Cinq catégories. Vingt-et-une questions. Des réponses concrètes, pas du marketing.
        </p>
      </section>

      {/* Category nav */}
      <section className="max-w-[860px] mx-auto px-8 pb-10">
        <ul className="flex flex-wrap justify-center gap-2.5">
          {faqCategories.map((cat) => {
            const slug = cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            return (
              <li key={cat.title}>
                <a
                  href={`#${slug}`}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-border text-[13px] text-primary font-medium hover:bg-green-mist transition"
                >
                  {cat.title}
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      {/* FAQ sections */}
      <section className="max-w-[860px] mx-auto px-8 pb-20">
        {faqCategories.map((category) => {
          const slug = category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
          return (
            <div key={category.title} id={slug} className="mb-14 last:mb-0 scroll-mt-24">
              <h2 className="font-serif text-[clamp(24px,3vw,32px)] text-primary leading-[1.15] tracking-tight mb-6 font-medium">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group bg-white border border-border rounded-2xl px-6 py-5 open:shadow-[0_10px_30px_rgba(30,57,50,0.06)]"
                  >
                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-[18px] text-primary font-medium">
                      <span>{faq.question}</span>
                      <span className="w-7 h-7 rounded-full bg-green-mist flex items-center justify-center shrink-0 transition group-open:rotate-45">
                        <span className="block w-3 h-px bg-primary relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-primary" />
                      </span>
                    </summary>
                    <p className="text-[15px] text-muted leading-relaxed mt-4">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* CTA */}
      <section className="max-w-[820px] mx-auto px-8 pb-24">
        <div className="bg-primary text-background rounded-3xl py-14 px-8 text-center">
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-tight text-balance mb-4">
            Vous avez d&apos;autres questions ? <em className="italic">Contactez-nous.</em>
          </h2>
          <p className="text-background/80 text-[16px] mb-8 max-w-[520px] mx-auto leading-relaxed">
            Réponse sous 24h ouvrées, directement par le founder. Ou démarrez l&apos;essai et
            posez vos questions en cours de route.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] bg-background text-primary hover:bg-accent transition"
            >
              Nous écrire
              <ArrowRight className="w-4 h-4" />
            </Link>
            <CTALink
              href="/signup"
              label="faq_final_essai"
              className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] border-[1.5px] border-background text-background hover:bg-background hover:text-primary transition"
            >
              Démarrer l&apos;essai gratuit
            </CTALink>
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
              &copy; {new Date().getFullYear()} MonTablo. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted/50">
            <Link href="/mentions-legales" className="hover:text-muted transition-colors">Mentions légales</Link>
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
