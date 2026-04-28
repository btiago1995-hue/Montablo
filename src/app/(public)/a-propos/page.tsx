import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Mail, MapPin } from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, homepageJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos — MonTablo | Conçu à Saint-Julien-en-Genevois',
  description:
    'MonTablo est conçu à Saint-Julien-en-Genevois pour les restaurants du Genevois français. Founder-led, support direct, mises à jour en temps réel.',
  openGraph: {
    title: 'À propos de MonTablo',
    description:
      'Conçu à Saint-Julien-en-Genevois pour les restaurants du Genevois français.',
  },
}

const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'

export default function AProposPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  const allSchemas = homepageJsonLd()
  const organizationSchema = allSchemas.find(
    (schema) => schema['@type'] === 'Organization'
  )

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'À propos', url: `${base}/a-propos` },
        ])}
      />
      {organizationSchema && <JsonLd data={organizationSchema} />}

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
            <Link href="/faq" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm text-primary hover:bg-green-mist transition">
              Connexion
            </Link>
            <CTALink
              href="/signup"
              label="apropos_nav"
              className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-primary-light transition"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[820px] mx-auto px-8 pt-16 sm:pt-20 pb-12">
        <span className={EYEBROW}>À propos</span>
        <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.022em] text-balance">
          MonTablo, conçu à Saint-Julien pour les restaurants du <em className="italic font-medium text-primary-light">Genevois</em>.
        </h1>
        <p className="text-[18px] text-muted leading-relaxed mt-6 max-w-[640px]">
          Pas une plateforme générique. Un produit pensé pour une zone précise — où les
          clients viennent de France, de Suisse, d&apos;Allemagne et d&apos;ailleurs, parfois
          dans la même soirée.
        </p>
      </section>

      {/* Pourquoi MonTablo existe */}
      <section className="bg-white border-y border-border">
        <div className="max-w-[820px] mx-auto px-8 py-16 sm:py-20">
          <span className={EYEBROW}>Le problème</span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] text-primary leading-[1.1] tracking-tight text-balance mb-6">
            Pourquoi MonTablo <em className="italic">existe</em>.
          </h2>
          <div className="space-y-5 text-[16px] text-muted leading-relaxed">
            <p>
              Dans le Genevois, les restaurants vivent une réalité que les outils SaaS génériques
              ignorent : une carte qui change avec la saison, une clientèle qui parle trois
              langues, des avis Google qui pèsent lourd sur le chiffre d&apos;affaires, et des
              clients qui passent une fois et qu&apos;on ne revoit jamais.
            </p>
            <p>
              Réimprimer la carte papier coûte cher. Expliquer la fondue à un client allemand
              prend du temps. Recevoir un avis 2 étoiles parce qu&apos;il manquait du sel ruine
              une note moyenne. Et personne ne sait combien de clients reviennent vraiment.
            </p>
            <p className="text-foreground font-medium">
              MonTablo est conçu pour régler ces quatre problèmes — pas un de plus, pas un de moins.
            </p>
          </div>
        </div>
      </section>

      {/* Pour qui c'est fait */}
      <section className="max-w-[820px] mx-auto px-8 py-16 sm:py-20">
        <span className={EYEBROW}>Pour qui</span>
        <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] text-primary leading-[1.1] tracking-tight text-balance mb-6">
          Pour qui c&apos;est <em className="italic">vraiment</em> fait.
        </h2>
        <div className="space-y-5 text-[16px] text-muted leading-relaxed">
          <p>
            Bistrots, brasseries, crêperies, pizzerias, restaurants de station. Des
            établissements qui font 30 à 200 couverts par jour, qui changent leur ardoise
            souvent, qui servent une clientèle mélangée locale et frontalière.
          </p>
          <p>
            Pas pour les chaînes avec un service informatique. Pas pour les restaurants qui
            veulent un système de commande et paiement en ligne (ce n&apos;est pas notre métier).
            Pour les restaurateurs qui veulent une carte numérique propre, des avis sous
            contrôle, et des clients qui reviennent.
          </p>
        </div>
      </section>

      {/* Comment on travaille */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[820px] mx-auto px-8 py-16 sm:py-20">
          <span className={EYEBROW}>Comment on travaille</span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] text-primary leading-[1.1] tracking-tight text-balance mb-8">
            Comment <em className="italic">on travaille</em>.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white border border-border rounded-2xl p-7">
              <h3 className="font-serif text-[20px] text-primary leading-tight mb-3 font-medium">
                Mises à jour en temps réel
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Vous changez un prix depuis votre téléphone, vos clients voient la nouvelle
                carte en moins d&apos;une seconde. Aucune réimpression, aucun délai.
              </p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-7">
              <h3 className="font-serif text-[20px] text-primary leading-tight mb-3 font-medium">
                Support direct
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Vous écrivez, c&apos;est le founder qui répond. Pas de ticket, pas de chatbot,
                pas de centre d&apos;appel offshore. Réponse sous 24h ouvrées.
              </p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-7">
              <h3 className="font-serif text-[20px] text-primary leading-tight mb-3 font-medium">
                Setup chez vous, pour les 20 premiers
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Pour les 20 premiers restaurants du Genevois, je viens personnellement faire
                le setup chez vous. Photo de la carte, import IA, QR code imprimé sur la table.
                Vous êtes en ligne avant la fin du déjeuner.
              </p>
            </div>
            <div className="bg-white border border-border rounded-2xl p-7">
              <h3 className="font-serif text-[20px] text-primary leading-tight mb-3 font-medium">
                Sans engagement, sans surprise
              </h3>
              <p className="text-[14px] text-muted leading-relaxed">
                Tarif clair affiché publiquement. Résiliation en un clic. Vos données
                exportables à tout moment. Hébergement en Europe, conforme RGPD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="max-w-[820px] mx-auto px-8 py-16 sm:py-20">
        <span className={EYEBROW}>Le founder</span>
        <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] text-primary leading-[1.1] tracking-tight text-balance mb-6">
          Qui est <em className="italic">derrière</em> MonTablo.
        </h2>
        <div className="space-y-5 text-[16px] text-muted leading-relaxed">
          <p>
            MonTablo est créé et opéré par Tiago, basé à Saint-Julien-en-Genevois. Pas une
            équipe, pas un fonds, pas un comité produit : un founder qui code le produit,
            répond aux emails, et fait du porte-à-porte chez les restaurateurs du coin.
          </p>
          <p>
            C&apos;est volontaire. Tant que MonTablo est petit, vous parlez directement à la
            personne qui décide. Quand vous demandez une fonctionnalité, elle est étudiée le
            jour même. Quand quelque chose ne va pas, c&apos;est réglé en heures, pas en
            semaines.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-primary text-background">
        <div className="max-w-[820px] mx-auto px-8 py-16 sm:py-20 text-center">
          <span className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-accent font-semibold mb-5">
            Nous contacter
          </span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] leading-[1.1] tracking-tight text-balance mb-6">
            Une question ? <em className="italic">Écrivez-nous.</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] text-background/85 mb-10">
            <a href="mailto:contact@montablo.com" className="inline-flex items-center gap-2 hover:text-accent transition">
              <Mail className="w-4 h-4" />
              contact@montablo.com
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Saint-Julien-en-Genevois
            </span>
          </div>
          <CTALink
            href="/signup"
            label="apropos_final_essai"
            className="inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] bg-background text-primary hover:bg-accent transition"
          >
            Démarrer mon essai gratuit
            <ArrowRight className="w-4 h-4" />
          </CTALink>
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
