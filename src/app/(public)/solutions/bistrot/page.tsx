import Link from 'next/link'
import {
  ArrowRight,
  UtensilsCrossed,
  CalendarDays,
  ShieldCheck,
  Languages,
  Wine,
  Quote,
} from 'lucide-react'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bistrots & brasseries — MonTablo : menu digital QR multilingue avec fidélité Wallet',
  description:
    'Le menu digital pour bistrots qui changent leur ardoise tous les jours. Menu du jour, allergènes, multilingue FR/EN. Essai 14 jours gratuit.',
  alternates: { canonical: '/solutions/bistrot' },
  openGraph: {
    title: 'Bistrots & brasseries — MonTablo',
    description:
      'Le menu digital pour bistrots qui changent leur ardoise tous les jours.',
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
  'Réimpression à chaque changement de prix de poisson.',
  'Plats indisponibles annoncés 30 fois par soir.',
  'Clientèle internationale qui n’arrive pas à lire le bourguignon.',
  'Allergènes à expliquer un par un, à chaque table.',
]

const features = [
  {
    icon: CalendarDays,
    title: 'Menu du jour & promotions',
    desc: "Vous changez votre ardoise depuis votre téléphone, en cuisine. La modification est en ligne dans la seconde — vos clients ne commandent jamais un plat épuisé.",
    benefit: 'Plus de réimpression. Plus de tippex sur la carte.',
  },
  {
    icon: ShieldCheck,
    title: 'Conformité allergènes',
    desc: "Les 14 allergènes majeurs sont affichés automatiquement sur chaque plat, conformément au règlement UE 1169/2011. Vous êtes en règle sans y penser.",
    benefit: 'Vos serveurs ne récitent plus la liste des allergènes.',
  },
  {
    icon: Languages,
    title: 'Multilingue FR / EN / DE',
    desc: "Vos clients suisses, allemands ou britanniques lisent votre carte dans leur langue. Traduction automatique, pas de double saisie.",
    benefit: 'Le bourguignon devient compréhensible partout dans le monde.',
  },
]

const faq = [
  {
    q: "Et si je change ma carte tous les jours, c'est lourd à mettre à jour ?",
    a: "Au contraire. Vous ouvrez l'app sur votre téléphone, vous modifiez le prix ou désactivez le plat, c'est en ligne instantanément. Plus rapide que d'effacer une ardoise.",
  },
  {
    q: 'Mes habitués âgés savent-ils utiliser un QR code ?',
    a: "Vous gardez 2-3 cartes papier en réserve pour eux. Le QR couvre la majorité de votre clientèle, y compris les retraités équipés d'un smartphone. Et nos menus sont optimisés pour les yeux qui n'ont plus 20 ans.",
  },
]

export default function BistrotPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="bg-background min-h-screen text-foreground font-sans text-[17px] leading-[1.55] antialiased overflow-x-hidden">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Solutions', url: `${base}/solutions` },
          { name: 'Bistrot', url: `${base}/solutions/bistrot` },
        ])}
      />

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
            <Link href="/fonctionnalites" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">Fonctionnalités</Link>
            <Link href="/tarifs" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">Tarifs</Link>
            <Link href="/blog" className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition">Blog</Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/login" className={`${BTN_GHOST_SM} hidden sm:inline-flex`}>Connexion</Link>
            <CTALink href="/signup" label="bistrot_nav_essai" className={BTN_PRIMARY_SM}>Essai gratuit</CTALink>
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
            <span className={EYEBROW}>Pour les bistrots & brasseries</span>
            <h1 className="font-serif font-medium text-primary text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-[-0.022em] text-balance">
              Le menu digital pour bistrots qui{' '}
              <em className="italic font-medium text-primary-light">changent leur ardoise</em>{' '}
              tous les jours.
            </h1>
            <p className="text-[19px] text-muted max-w-[560px] my-6 mb-8 leading-[1.5]">
              Vos plats du jour évoluent à la semaine, parfois au service. Vos clients méritent une carte qui suit le rythme.
            </p>
            <div className="flex flex-wrap gap-3">
              <CTALink href="/signup" label="bistrot_hero_essai" className={BTN_PRIMARY}>
                Essayer Pro 14 jours gratuitement
              </CTALink>
              <Link href="/menu/demo" className={BTN_SECONDARY}>
                Voir un menu en exemple
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Phone mock illustratif */}
          <div className="relative flex justify-center items-center min-h-[460px] md:min-h-[560px]">
            <div
              className="relative w-[300px] h-[560px] bg-white rounded-[42px] shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] border-[10px] border-primary overflow-hidden -rotate-[3deg]"
              aria-hidden="true"
            >
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[80px] h-5 bg-primary rounded-xl z-[2]" />
              <div className="h-full bg-background pt-[44px] px-5 pb-5">
                <div className="text-center pb-4 border-b border-border">
                  <h4 className="font-serif text-[20px] italic text-primary font-medium">Le Petit Bistrot</h4>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-primary-light mt-1.5 font-semibold">
                    Ardoise du jour
                  </div>
                </div>
                <div className="font-serif italic text-[13px] text-primary-light mt-4 mb-2 tracking-[0.08em] uppercase font-medium">
                  — Aujourd&apos;hui —
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-border">
                    <div className="font-semibold text-primary text-[13px]">Bœuf bourguignon</div>
                    <div className="text-[11px] text-muted italic">Carottes, champignons, purée maison</div>
                    <div className="font-bold text-primary-light text-[13px] mt-1">18,00 €</div>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2.5 border border-border">
                    <div className="font-semibold text-primary text-[13px]">Tartare de bœuf</div>
                    <div className="text-[11px] text-muted italic">Frites maison, salade verte</div>
                    <div className="font-bold text-primary-light text-[13px] mt-1">17,50 €</div>
                  </div>
                  <div className="bg-green-mist rounded-xl px-3 py-2.5 border border-primary-light/30">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-primary-light font-bold mb-0.5">Suggestion</div>
                    <div className="font-semibold text-primary text-[13px]">Filet de bar</div>
                    <div className="text-[11px] text-muted italic">Légumes du marché</div>
                    <div className="font-bold text-primary-light text-[13px] mt-1">22,00 €</div>
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
              Ce qu&apos;on entend tous les jours dans les <em className="italic">bistrots</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {pains.map((pain) => (
              <div
                key={pain}
                className="flex gap-4 bg-background border border-border rounded-2xl p-6"
              >
                <Quote className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.8} />
                <p className="font-serif italic text-[18px] text-primary leading-snug">
                  « {pain} »
                </p>
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
                <div
                  key={f.title}
                  className="bg-white border border-border rounded-3xl p-8 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[22px] text-primary leading-tight mb-3 font-medium">
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-muted leading-relaxed mb-5">{f.desc}</p>
                  <p className="mt-auto pt-5 border-t border-border text-[14px] font-semibold text-primary-light leading-snug">
                    {f.benefit}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ persona ===== */}
      <section className="bg-surface border-y border-border py-20 sm:py-[100px]">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className={EYEBROW}>FAQ bistrot</span>
            <h2 className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.1] tracking-tight text-primary text-balance">
              Les questions qu&apos;on nous pose en <em className="italic">premier</em>.
            </h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group bg-white border border-border rounded-2xl px-6 py-5 open:shadow-[0_10px_30px_rgba(30,57,50,0.06)]"
              >
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
            <Wine className="w-7 h-7 text-primary" strokeWidth={1.6} />
          </div>
          <h2 className="font-serif text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-tight text-primary text-balance">
            Essayez MonTablo <em className="italic">14 jours</em>, gratuitement.
          </h2>
          <p className="text-[18px] text-muted mt-5 max-w-[560px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink href="/signup" label="bistrot_final_essai" className={BTN_PRIMARY}>
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
            <Link href={l.href} className="text-[14px] text-background/80 hover:text-accent transition">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
