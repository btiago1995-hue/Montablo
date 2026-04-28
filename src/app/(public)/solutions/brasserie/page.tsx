import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  Languages,
  Camera,
  Wallet,
  Sandwich,
  Quote,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crêperies & restaurants régionaux — MonTablo : menu digital QR multilingue avec fidélité Wallet',
  description:
    'Le menu digital pour crêperies et tables régionales qui servent une clientèle internationale. Multilingue FR/EN/DE, photos par plat, fidélité Wallet. Essai 14 jours gratuit.',
  alternates: { canonical: '/solutions/brasserie' },
  openGraph: {
    title: 'Crêperies & restaurants régionaux — MonTablo',
    description: 'Le menu digital pour les tables régionales qui servent une clientèle internationale.',
  },
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] whitespace-nowrap border-[1.5px] border-transparent transition hover:-translate-y-px'
const BTN_PRIMARY = `${BTN_BASE} bg-primary text-background hover:bg-green-classic`
const BTN_SECONDARY = `${BTN_BASE} bg-transparent text-primary border-primary hover:bg-primary hover:text-background`
const BTN_GHOST_SM =
  'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm text-primary hover:bg-green-mist transition whitespace-nowrap'
const BTN_PRIMARY_SM =
  'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-green-classic transition whitespace-nowrap'
const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'

const pains = [
  "Expliquer la fondue, la galette complète ou le bourguignon en anglais 50 fois par soir.",
  "Faux pas culturels (lait, gluten) sans pictogrammes sur la carte.",
  "Photos de plats régionaux qui ne tiennent pas dans la carte papier.",
  "Touristes qui choisissent au hasard et ne reviennent jamais.",
]

const features = [
  {
    icon: Languages,
    title: 'Multilingue FR / EN / DE',
    desc: "Vos clients britanniques, suisses ou allemands lisent la galette complète, la fondue ou le farçon dans leur langue. Traduction automatique, vérifiable plat par plat.",
    benefit: "Vos serveurs arrêtent de mimer la raclette en anglais.",
  },
  {
    icon: Camera,
    title: 'Photos par plat',
    desc: "Une vraie photo par spécialité. Les clients étrangers voient ce qu'ils commandent avant de se lancer — et osent enfin la fondue ou la tartiflette.",
    benefit: "Le ticket moyen monte parce que les plats régionaux deviennent désirables.",
  },
  {
    icon: Wallet,
    title: 'Cartes de fidélité Wallet',
    desc: "Vos clients ajoutent leur carte à Apple Wallet ou Google Wallet en un scan. Quand ils repassent en vacances l'année suivante, leur carte les rappelle à vous via la géolocalisation.",
    benefit: "Le touriste de l'an dernier devient un habitué.",
  },
]

const faq = [
  {
    q: "Mes plats régionaux ont des noms intraduisibles. Comment ça marche ?",
    a: "Vous gardez le nom français (fondue, farçon, galette complète) et MonTablo ajoute une description traduite en anglais et allemand. Les noms régionaux restent — c'est ce que cherchent vos clients étrangers — et la description leur explique ce qu'il y a dedans.",
  },
  {
    q: 'Les cartes Wallet, ça marche vraiment pour des touristes ?',
    a: "Oui. Apple Wallet et Google Wallet fonctionnent dans tous les pays. Un client suisse, allemand ou britannique scanne le QR à la fin du repas, ajoute la carte, et la retrouve à sa prochaine visite — même un an plus tard.",
  },
]

export default function BrasseriePage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="bg-background min-h-screen text-foreground font-sans text-[17px] leading-[1.55] antialiased overflow-x-hidden">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Crêperies & régionaux', url: `${base}/solutions/brasserie` },
        ])}
      />

      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 backdrop-blur-[14px] bg-background/80 border-b border-primary/5">
        <div className="max-w-[1240px] mx-auto px-8 flex items-center justify-between h-[76px]">
          <Link href="/" className="flex items-center gap-2.5 font-serif text-2xl font-semibold text-primary tracking-tight">
            <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
            <span>MonTablo</span>
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            <Link href="/fonctionnalites" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">Fonctionnalités</Link>
            <Link href="/tarifs" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">Tarifs</Link>
            <Link href="/blog" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">Blog</Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className={`${BTN_GHOST_SM} hidden sm:inline-flex`}>Connexion</Link>
            <CTALink href="/signup" label="creperie_nav_essai" className={BTN_PRIMARY_SM}>Essai gratuit</CTALink>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-[70px] pb-20">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-green-mist" />
          <div className="absolute bottom-10 -left-[100px] w-[220px] h-[220px] rounded-full bg-surface" />
        </div>
        <div className="relative z-10 max-w-[1240px] mx-auto px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-[60px] md:gap-20 items-center">
          <div className="min-w-0">
            <span className={EYEBROW}>Pour les crêperies & tables régionales</span>
            <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.022em] text-balance">
              Le menu digital pour crêperies qui servent une{' '}
              <em className="italic font-medium text-primary-light">clientèle internationale</em>.
            </h1>
            <p className="text-[19px] text-muted max-w-[560px] my-6 mb-8 leading-[1.5]">
              Vos clients viennent de loin pour découvrir vos spécialités. Encore faut-il qu&apos;ils comprennent ce qu&apos;il y a dedans.
            </p>
            <div className="flex flex-wrap gap-3">
              <CTALink href="/signup" label="creperie_hero_essai" className={BTN_PRIMARY}>
                Essayer Pro 14 jours gratuitement
              </CTALink>
              <Link href="/menu/demo" className={BTN_SECONDARY}>
                Voir un menu en exemple
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Phone mock — multilingue */}
          <div className="relative flex justify-center items-center min-h-[460px] md:min-h-[560px]">
            <div className="relative w-[300px] h-[560px] bg-white rounded-[42px] shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] border-[10px] border-primary overflow-hidden -rotate-[3deg]" aria-hidden="true">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-5 bg-primary rounded-xl z-[2]" />
              <div className="h-full bg-background pt-[44px] px-5 pb-5">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h4 className="font-serif text-[18px] italic text-primary font-medium">La Crêperie</h4>
                  <div className="flex gap-1">
                    <span className="text-[10px] font-bold bg-primary text-background px-2 py-0.5 rounded-full">FR</span>
                    <span className="text-[10px] font-medium bg-white text-primary border border-border px-2 py-0.5 rounded-full">EN</span>
                    <span className="text-[10px] font-medium bg-white text-primary border border-border px-2 py-0.5 rounded-full">DE</span>
                  </div>
                </div>
                <div className="font-serif italic text-[12px] text-primary-light mt-4 mb-2 tracking-[0.08em] uppercase font-medium">
                  — Galettes salées —
                </div>
                <div className="space-y-2.5">
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-border">
                    <div className="font-semibold text-primary text-[13px]">Complète</div>
                    <div className="text-[11px] text-muted italic">Jambon, œuf, emmental</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[9px] bg-green-soft text-primary px-1.5 py-0.5 rounded font-semibold">Gluten</span>
                      <span className="text-[9px] bg-green-soft text-primary px-1.5 py-0.5 rounded font-semibold">Œuf</span>
                      <span className="text-[9px] bg-green-soft text-primary px-1.5 py-0.5 rounded font-semibold">Lait</span>
                    </div>
                    <div className="font-bold text-primary-light text-[13px] mt-1.5">9,50 €</div>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-border">
                    <div className="font-semibold text-primary text-[13px]">Forestière</div>
                    <div className="text-[11px] text-muted italic">Champignons, crème, persillade</div>
                    <div className="font-bold text-primary-light text-[13px] mt-1.5">10,00 €</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOULEURS ===== */}
      <section className="bg-white border-y border-border">
        <div className="max-w-[1040px] mx-auto px-8 py-20 sm:py-[100px]">
          <div className="max-w-[640px] mb-12">
            <span className={EYEBROW}>Vos douleurs</span>
            <h2 className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.1] tracking-tight text-primary text-balance">
              Ce qu&apos;on entend tous les jours en <em className="italic">crêperie</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {pains.map((pain) => (
              <div key={pain} className="flex gap-4 bg-background border border-border rounded-2xl p-6">
                <Quote className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.8} />
                <p className="font-serif italic text-[18px] text-primary leading-snug">« {pain} »</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CE QUE MONTABLO CHANGE ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <span className={EYEBROW}>Ce que MonTablo change</span>
            <h2 className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.1] tracking-tight text-primary text-balance">
              MonTablo répond à ces <em className="italic">3 défis</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white border border-border rounded-3xl p-8 flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[22px] text-primary leading-tight mb-3 font-medium">{f.title}</h3>
                  <p className="text-[15px] text-muted leading-relaxed mb-5">{f.desc}</p>
                  <p className="mt-auto pt-5 border-t border-border text-[14px] font-semibold text-primary-light leading-snug">{f.benefit}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-surface border-y border-border py-20 sm:py-[100px]">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className={EYEBROW}>FAQ crêperie</span>
            <h2 className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.1] tracking-tight text-primary text-balance">
              Les questions qu&apos;on nous pose en <em className="italic">premier</em>.
            </h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group bg-white border border-border rounded-2xl px-6 py-5 open:shadow-[0_10px_30px_rgba(30,57,50,0.06)]">
                <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-serif text-[19px] text-primary font-medium">
                  <span>{item.q}</span>
                  <span className="w-7 h-7 rounded-full bg-green-mist flex items-center justify-center shrink-0 transition group-open:rotate-45">
                    <span className="block w-3 h-px bg-primary relative before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-primary" />
                  </span>
                </summary>
                <p className="text-[15px] text-muted leading-relaxed mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[820px] mx-auto px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-soft flex items-center justify-center mx-auto mb-6">
            <Sandwich className="w-7 h-7 text-primary" strokeWidth={1.6} />
          </div>
          <h2 className="font-serif text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-tight text-primary text-balance">
            Essayez MonTablo <em className="italic">14 jours</em>, gratuitement.
          </h2>
          <p className="text-[18px] text-muted mt-5 max-w-[560px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink href="/signup" label="creperie_final_essai" className={BTN_PRIMARY}>Démarrer mon essai gratuit</CTALink>
            <Link href="/contact" className={BTN_SECONDARY}>Demander une démo</Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-primary text-background pt-16 pb-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 md:gap-[40px] mb-14">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5 font-serif text-2xl font-semibold text-background tracking-tight mb-3">
                <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
                <span>MonTablo</span>
              </Link>
              <p className="max-w-[300px] text-sm text-background/70 leading-relaxed">
                Conçu à Saint-Julien-en-Genevois pour les restaurants du Genevois français.
              </p>
            </div>
            <FooterCol title="Produit" links={[
              { href: '/fonctionnalites', label: 'Fonctionnalités' },
              { href: '/tarifs', label: 'Tarifs' },
              { href: '/menu/demo', label: 'Démo' },
            ]} />
            <FooterCol title="Pour qui" links={[
              { href: '/solutions/bistrot', label: 'Bistrots' },
              { href: '/solutions/brasserie', label: 'Crêperies & régionaux' },
              { href: '/solutions/pizzeria', label: 'Pizzerias' },
              { href: '/solutions/haute-savoie', label: 'Restaurants de station' },
            ]} />
            <FooterCol title="Ressources" links={[
              { href: '/faq', label: 'FAQ' },
              { href: '/blog', label: 'Blog' },
            ]} />
            <FooterCol title="Entreprise" links={[
              { href: '/a-propos', label: 'À propos' },
              { href: '/contact', label: 'Contact' },
              { href: '/mentions-legales', label: 'Mentions légales' },
              { href: '/cgu', label: 'CGV' },
              { href: '/confidentialite', label: 'Confidentialité' },
            ]} />
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

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-sans text-[12px] tracking-[0.18em] uppercase text-background/45 font-semibold mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[14px] text-background/80 hover:text-accent transition">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
