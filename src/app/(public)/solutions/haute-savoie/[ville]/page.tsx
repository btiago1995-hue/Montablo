import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  ShieldCheck,
  Wallet,
  Languages,
  Wine,
  Pizza,
  Mountain,
  Sandwich,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from '@/components/seo/json-ld'
import { VILLES, getVilleBySlug } from '@/data/haute-savoie'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'

type Props = {
  params: { ville: string }
}

export async function generateStaticParams() {
  return VILLES.map((v) => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const ville = getVilleBySlug(params.ville)
  if (!ville) return {}
  const title = `Menu digital pour restaurants à ${ville.name} — MonTablo`
  const description = `Menu digital QR pour les restaurants de ${ville.name}. Filtrage avis Google, cartes fidélité Apple/Google Wallet, multilingue FR/EN/DE. 14 jours gratuits, à partir de 19€/mois HT.`
  return {
    title,
    description,
    alternates: {
      canonical: `${base}/solutions/haute-savoie/${ville.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${base}/solutions/haute-savoie/${ville.slug}`,
    },
  }
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] whitespace-nowrap border-[1.5px] border-transparent transition hover:-translate-y-px'
const BTN_PRIMARY = `${BTN_BASE} bg-primary text-background hover:bg-primary-light`
const BTN_SECONDARY = `${BTN_BASE} bg-transparent text-primary border-primary hover:bg-primary hover:text-background`
const BTN_GHOST_SM =
  'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm text-primary hover:bg-green-mist transition whitespace-nowrap'
const BTN_PRIMARY_SM =
  'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-primary-light transition whitespace-nowrap'
const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'

const usecases = [
  {
    icon: Wine,
    title: 'Bistrots & brasseries',
    desc: 'Pour ceux qui changent leur ardoise tous les jours.',
    href: '/solutions/bistrot',
  },
  {
    icon: Sandwich,
    title: 'Crêperies & restaurants régionaux',
    desc: 'Pour ceux qui veulent expliquer la fondue aux Anglais sans s’épuiser.',
    href: '/solutions/brasserie',
  },
  {
    icon: Pizza,
    title: 'Pizzerias & trattorias',
    desc: 'Pour ceux qui veulent afficher leurs photos de plats sans réimprimer.',
    href: '/solutions/pizzeria',
  },
  {
    icon: Mountain,
    title: 'Restaurants de station',
    desc: 'Pour ceux dont la clientèle change de pays toutes les 2 semaines.',
    href: '/solutions/haute-savoie',
  },
]

export default function VillePage({ params }: Props) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
  const ville = getVilleBySlug(params.ville)

  if (!ville) {
    notFound()
  }

  const otherVilles = VILLES.filter((v) => v.slug !== ville.slug)

  return (
    <div className="bg-background min-h-screen text-foreground font-sans text-[17px] leading-[1.55] antialiased overflow-x-hidden">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Haute-Savoie', url: `${base}/solutions/haute-savoie` },
          { name: ville.name, url: `${base}/solutions/haute-savoie/${ville.slug}` },
        ])}
      />
      <JsonLd
        data={localBusinessJsonLd({
          name: 'MonTablo',
          url: `${base}/solutions/haute-savoie/${ville.slug}`,
          areaServed: ville.name,
          description: ville.metadata.description,
        })}
      />
      <JsonLd data={faqJsonLd(ville.faq)} />

      {/* ===== NAV ===== */}
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
            <Link
              href="/fonctionnalites"
              className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/tarifs"
              className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition"
            >
              Tarifs
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition"
            >
              Blog
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className={`${BTN_GHOST_SM} hidden sm:inline-flex`}>
              Connexion
            </Link>
            <CTALink href="/signup" label="nav_essai" className={BTN_PRIMARY_SM}>
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1240px] mx-auto px-8 pt-8">
        <nav className="text-[13px] text-muted/70">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/solutions/haute-savoie" className="hover:text-primary transition-colors">Haute-Savoie</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{ville.name}</span>
        </nav>
      </div>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-10 pb-20">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-green-mist" />
          <div className="absolute bottom-10 -left-[100px] w-[220px] h-[220px] rounded-full bg-surface" />
        </div>
        <div className="relative z-10 max-w-[1240px] mx-auto px-8">
          <span className={EYEBROW}>Menu digital · {ville.name}</span>
          <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.022em] text-balance max-w-[900px]">
            Le menu digital qui parle 3 langues, conçu pour les{' '}
            <em className="italic font-medium text-primary-light">restaurants de {ville.name}</em>.
          </h1>
          <p className="text-[19px] text-muted max-w-[620px] my-6 mb-9 leading-[1.5]">
            Une clientèle locale, frontalière et internationale qui mérite mieux qu’une carte
            papier. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <CTALink href="/signup" label="ville_hero_essai" className={BTN_PRIMARY}>
              Essayer Pro 14 jours gratuitement
            </CTALink>
            <Link href="/menu/demo" className={BTN_SECONDARY}>
              Voir un menu en exemple
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== POURQUOI {VILLE} ===== */}
      <section className="bg-white border-y border-border">
        <div className="max-w-[920px] mx-auto px-8 py-20 sm:py-[100px]">
          <span className={EYEBROW}>Pourquoi {ville.name}</span>
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
            Vos clients à {ville.name} méritent un menu à la <em className="italic">hauteur</em>.
          </h2>
          <div className="text-[18px] text-muted leading-[1.65] mt-7 space-y-5">
            <p>{ville.intro[0]}</p>
            <p>{ville.intro[1]}</p>
          </div>
          <p className="text-[17px] text-foreground font-medium mt-7">
            MonTablo vous donne les 3 outils qui font la différence : avis Google filtrés, cartes
            fidélité Wallet, et menu en français, anglais et allemand.
          </p>
        </div>
      </section>

      {/* ===== 3 DIFFÉRENCIATEURS ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <span className={EYEBROW}>Ce qui nous distingue</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Ce que MonTablo fait que les <em className="italic">autres ne font pas</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/fonctionnalites#avis-google"
              className="group bg-white border border-border rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-[22px] text-primary leading-tight mb-3 font-medium">
                Vos avis Google, sous contrôle
              </h3>
              <p className="text-[15px] text-muted leading-relaxed mb-5">
                Les clients très satisfaits (5 étoiles) sont redirigés vers votre fiche Google.
                Les avis moins bons restent en interne : vous êtes notifié et vous pouvez réagir
                avant qu’ils ne deviennent publics.
              </p>
              <div className="mt-auto pt-5 border-t border-border">
                <p className="text-[14px] font-semibold text-primary-light leading-snug inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Voir comment ça marche
                  <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </Link>

            <Link
              href="/fonctionnalites#wallet"
              className="group bg-white border border-border rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-[22px] text-primary leading-tight mb-3 font-medium">
                Une carte de fidélité dans Apple Wallet et Google Wallet
              </h3>
              <p className="text-[15px] text-muted leading-relaxed mb-5">
                Vos clients ajoutent leur carte au Wallet en un scan. Elle apparaît
                automatiquement sur leur écran d’accueil quand ils passent près du restaurant.
                Sans application à télécharger.
              </p>
              <div className="mt-auto pt-5 border-t border-border">
                <p className="text-[14px] font-semibold text-primary-light leading-snug inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Voir comment ça marche
                  <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </Link>

            <Link
              href="/fonctionnalites#multilingue"
              className="group bg-white border border-border rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                <Languages className="w-6 h-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-[22px] text-primary leading-tight mb-3 font-medium">
                Multilingue pour vos clients frontaliers et internationaux
              </h3>
              <p className="text-[15px] text-muted leading-relaxed mb-5">
                Français, anglais, allemand — traduction automatique. Vos clients suisses,
                allemands ou britanniques lisent votre carte dans leur langue, sans télécharger
                d’application.
              </p>
              <div className="mt-auto pt-5 border-t border-border">
                <p className="text-[14px] font-semibold text-primary-light leading-snug inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Voir comment ça marche
                  <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== POUR LES RESTAURANTS DE {VILLE} ===== */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1240px] mx-auto px-8 py-20 sm:py-[100px]">
          <div className="max-w-[700px] mb-12">
            <span className={EYEBROW}>Pour qui c’est fait</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Pour les restaurants de {ville.name}, qu’il s’agisse...
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {usecases.map((u) => {
              const Icon = u.icon
              return (
                <Link
                  key={u.title}
                  href={u.href}
                  className="group bg-white border border-border rounded-2xl p-7 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.08)] transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-mist flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[20px] text-primary leading-tight mb-2 font-medium">
                    {u.title}
                  </h3>
                  <p className="text-[14px] text-muted leading-relaxed">{u.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className={EYEBROW}>FAQ</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Les questions qu’on nous pose à <em className="italic">{ville.name}</em>.
            </h2>
          </div>
          <div className="space-y-4">
            {ville.faq.map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-border rounded-2xl px-6 py-5 open:shadow-[0_10px_30px_rgba(30,57,50,0.06)]"
              >
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-[19px] text-primary font-medium">
                  <span>{item.question}</span>
                  <span className="w-7 h-7 rounded-full bg-green-mist flex items-center justify-center shrink-0 transition group-open:rotate-45">
                    <span className="block w-3 h-px bg-primary relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-primary" />
                  </span>
                </summary>
                <p className="text-[15px] text-muted leading-relaxed mt-4">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AUTRES VILLES DE HAUTE-SAVOIE ===== */}
      <section className="bg-white border-y border-border">
        <div className="max-w-[1240px] mx-auto px-8 py-20 sm:py-[100px]">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={EYEBROW}>Haute-Savoie</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Présent dans toute la <em className="italic">Haute-Savoie</em>.
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-[900px] mx-auto">
            {otherVilles.map((v) => (
              <Link
                key={v.slug}
                href={`/solutions/haute-savoie/${v.slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-background border border-border text-[14px] text-primary font-medium hover:bg-primary hover:text-background hover:border-primary transition"
              >
                {v.name}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/solutions/haute-savoie"
              className="inline-flex items-center gap-2 text-primary font-semibold text-[15px] hover:gap-3 transition-all"
            >
              Voir le hub Haute-Savoie
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[820px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-primary text-balance">
            Essayez MonTablo <em className="italic">14 jours</em>, gratuitement.
          </h2>
          <p className="text-[18px] text-muted mt-5 max-w-[560px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink href="/signup" label="ville_final_essai" className={BTN_PRIMARY}>
              Démarrer mon essai gratuit
            </CTALink>
            <Link href="/contact" className={BTN_SECONDARY}>
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-primary text-background pt-16 pb-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 md:gap-[40px] mb-14">
            <div className="col-span-2 md:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 font-serif text-2xl font-semibold text-background tracking-tight mb-3"
                aria-label="MonTablo — accueil"
              >
                <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
                <span>MonTablo</span>
              </Link>
              <p className="max-w-[300px] text-sm text-background/70 leading-relaxed">
                Conçu à Saint-Julien-en-Genevois pour les restaurants du Genevois français.
              </p>
            </div>
            <FooterCol
              title="Produit"
              links={[
                { href: '/fonctionnalites', label: 'Fonctionnalités' },
                { href: '/tarifs', label: 'Tarifs' },
                { href: '/menu/demo', label: 'Démo' },
              ]}
            />
            <FooterCol
              title="Pour qui"
              links={[
                { href: '/solutions/bistrot', label: 'Bistrots' },
                { href: '/solutions/brasserie', label: 'Brasseries' },
                { href: '/solutions/pizzeria', label: 'Pizzerias' },
                { href: '/solutions/haute-savoie', label: 'Restaurants de station' },
              ]}
            />
            <FooterCol
              title="Ressources"
              links={[
                { href: '/faq', label: 'FAQ' },
                { href: '/blog', label: 'Blog' },
              ]}
            />
            <FooterCol
              title="Entreprise"
              links={[
                { href: '/a-propos', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
                { href: '/mentions-legales', label: 'Mentions légales' },
                { href: '/cgu', label: 'CGV' },
                { href: '/confidentialite', label: 'Confidentialité' },
              ]}
            />
          </div>

          <div className="pt-8 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-background/55">
            <span>© {new Date().getFullYear()} MonTablo. Tous droits réservés.</span>
            <span>Conçu à Saint-Julien-en-Genevois.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h4 className="font-sans text-[12px] tracking-[0.18em] uppercase text-background/45 font-semibold mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[14px] text-background/80 hover:text-accent transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
