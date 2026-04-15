import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  Heart,
  Palette,
  Eye,
  Sparkles,
  Mail,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, homepageJsonLd } from '@/components/seo/json-ld'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A propos de MonTablo | Notre mission',
  description:
    'Decouvrez MonTablo : notre mission, nos valeurs et pourquoi nous avons cree la solution de menu digital la plus simple pour les restaurants.',
  openGraph: {
    title: 'A propos de MonTablo',
    description:
      'Notre mission : simplifier la gestion des menus de restaurant avec des outils digitaux elegants.',
  },
}

const values = [
  {
    icon: Sparkles,
    title: 'Simplicite',
    description:
      'Un restaurateur doit pouvoir mettre a jour son menu en quelques secondes, sans formation ni competences techniques. La simplicite n\'est pas une option, c\'est notre obsession.',
  },
  {
    icon: Palette,
    title: 'Qualite du design',
    description:
      'Un menu digital doit etre aussi soigne que la cuisine qu\'il presente. Nous investissons dans le design pour que chaque restaurant soit fier de sa carte en ligne.',
  },
  {
    icon: Eye,
    title: 'Transparence',
    description:
      'Un seul prix, toutes les fonctionnalites incluses, sans frais caches. Nous croyons qu\'un tarif clair et honnete est le fondement d\'une relation de confiance.',
  },
  {
    icon: Heart,
    title: 'Soutenir les petits restaurants',
    description:
      'Les bistrots, brasseries et restaurants de quartier meritent les memes outils que les grandes chaines. MonTablo est concu pour eux, a un prix accessible.',
  },
]

export default function AProposPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  // Extract only the Organization schema from homepageJsonLd
  const allSchemas = homepageJsonLd()
  const organizationSchema = allSchemas.find(
    (schema) => schema['@type'] === 'Organization'
  )

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'A propos', url: `${base}/a-propos` },
        ])}
      />
      {organizationSchema && <JsonLd data={organizationSchema} />}

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
      <div className="max-w-[780px] mx-auto px-6 pt-[100px]">
        <nav className="text-[13px] text-muted/60">
          <Link href="/" className="hover:text-muted transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">A propos</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[780px] mx-auto px-6 pt-8 pb-12">
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4">
          A propos de MonTablo
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Nous simplifions la gestion des menus de restaurant avec des outils digitaux elegants et accessibles.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl text-foreground mb-4">Notre mission</h2>
        <p className="text-[15px] text-muted leading-relaxed mb-4">
          MonTablo a une mission simple : permettre a chaque restaurant de proposer un menu digital elegant,
          facile a gerer et toujours a jour. Nous croyons que la technologie doit simplifier le quotidien
          des restaurateurs, pas le compliquer.
        </p>
        <p className="text-[15px] text-muted leading-relaxed">
          Que vous soyez un bistrot de quartier, une brasserie familiale ou un restaurant gastronomique,
          votre carte merite d&apos;etre presentee avec soin. MonTablo vous donne les outils pour le faire
          en quelques minutes, sans competences techniques.
        </p>
      </section>

      {/* Why we built it */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl text-foreground mb-4">Pourquoi MonTablo existe</h2>
        <p className="text-[15px] text-muted leading-relaxed mb-4">
          Chaque jour, des milliers de restaurateurs perdent du temps et de l&apos;argent a reimprimer
          leurs menus papier. Un plat du jour qui change, un prix a ajuster, un allergene a ajouter :
          a chaque modification, c&apos;est une nouvelle impression, un nouveau cout.
        </p>
        <p className="text-[15px] text-muted leading-relaxed">
          Nous avons cree MonTablo pour resoudre ce probleme. Un menu digital que vous mettez a jour
          en quelques secondes depuis votre telephone, accessible par vos clients via un simple QR code.
          Plus d&apos;impressions, plus de gaspillage, plus de stress.
        </p>
      </section>

      {/* Values */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl text-foreground mb-8">Nos valeurs</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div key={value.title} className="bg-white border border-border/50 rounded-[16px] p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-accent-dark" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-[15px] text-muted leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* The product */}
      <section className="max-w-[780px] mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl text-foreground mb-4">Ce que fait MonTablo</h2>
        <p className="text-[15px] text-muted leading-relaxed mb-4">
          MonTablo est une plateforme en ligne qui permet aux restaurants de creer, gerer et partager
          leur menu digital. En quelques minutes, vous creez votre carte avec vos plats, descriptions,
          prix et photos. Vous generez un QR code personnalise aux couleurs de votre etablissement.
        </p>
        <p className="text-[15px] text-muted leading-relaxed">
          Vos clients scannent le QR code sur la table et decouvrent votre menu sur leur telephone.
          Mises a jour en temps reel, menu du jour, promotions, bilingue francais-anglais, import
          de carte par IA : tout est inclus dans un abonnement unique a partir de 26,99 euros par mois.
        </p>
      </section>

      {/* Contact */}
      <section className="max-w-[780px] mx-auto px-6 pb-24">
        <div className="border border-border rounded-[20px] py-12 px-8 text-center bg-gradient-to-b from-white to-background">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-accent-dark" />
          </div>
          <h2 className="font-serif text-2xl text-foreground mb-3">
            Une question ? Contactez-nous.
          </h2>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Notre equipe est disponible pour repondre a toutes vos questions sur MonTablo.
          </p>
          <a
            href="mailto:contact@montablo.com"
            className="group inline-flex items-center gap-2.5 bg-primary text-white font-medium px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-xl hover:shadow-primary/18 hover:-translate-y-px text-[15px]"
          >
            contact@montablo.com
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
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
