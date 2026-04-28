import Link from 'next/link'
import QRCode from 'qrcode'
import {
  UtensilsCrossed,
  ShieldCheck,
  Wallet,
  Languages,
  Wine,
  Pizza,
  Mountain,
  Sandwich,
  ArrowRight,
} from 'lucide-react'
import type { Metadata } from 'next'
import { JsonLd, homepageJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import { ManageCookiesButton } from '@/components/public/manage-cookies-button'
import { MenuPreview } from '@/components/public/homepage/menu-preview'

export const metadata: Metadata = {
  title:
    'MonTablo — Le menu digital qui filtre vos avis Google et fidélise vos clients',
  description:
    'Menu digital QR pour restaurants. Filtrage automatique des avis Google, cartes de fidélité Apple/Google Wallet, multilingue FR/EN/DE. 14 jours d’essai gratuits. À partir de 19€/mois HT.',
  alternates: { canonical: '/' },
}

const DEMO_MENU_URL = 'https://www.montablo.com/menu/demo'

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

const personas = [
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

const faq = [
  {
    q: 'Et mes clients âgés qui ne savent pas utiliser un QR code ?',
    a: 'Vous gardez 2-3 cartes papier en réserve pour eux. Le QR code est pour la majorité de votre clientèle qui a un smartphone, y compris les retraités. Et tous nos menus sont optimisés pour les yeux qui n’ont plus 20 ans : grandes typos, contraste fort, photos lisibles.',
  },
  {
    q: 'Je n’ai pas le temps de tout configurer.',
    a: 'Vous prenez une photo de votre carte actuelle avec votre téléphone. Notre IA extrait tous les plats, prix et descriptions en 2 minutes. Vous corrigez ce qu’il faut, et c’est en ligne. Pour les 20 premiers restaurants du Genevois, je viens personnellement faire le setup chez vous.',
  },
  {
    q: 'Les allergènes, c’est obligatoire ?',
    a: 'Oui, depuis 2015 (règlement UE 1169/2011). Beaucoup de restaurants sont en infraction sans le savoir. MonTablo affiche automatiquement les 14 allergènes majeurs sur chaque plat, conformément à la loi. Vous êtes en règle sans y penser.',
  },
]

const tiers = [
  {
    name: 'Essentiel',
    price: '19€',
    priceSuffix: '/mois HT',
    desc: 'Pour digitaliser votre carte, sans plus.',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '39€',
    priceSuffix: '/mois HT',
    desc: 'La formule complète. Avis Google, fidélité, multilingue.',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 'Sur devis',
    priceSuffix: '',
    desc: 'Pour les groupes multi-établissements.',
    highlighted: false,
  },
]

export default async function LandingPage() {
  const schemas = homepageJsonLd()
  const qrSvg = await QRCode.toString(DEMO_MENU_URL, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 0,
    color: { dark: '#1E3932', light: '#0000' },
  })

  return (
    <div className="bg-background min-h-screen text-foreground font-sans text-[17px] leading-[1.55] antialiased overflow-x-hidden">
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

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
              href="#exemple"
              className="px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition"
            >
              Exemple
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

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-[70px] pb-20">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-green-mist" />
          <div className="absolute bottom-10 -left-[100px] w-[220px] h-[220px] rounded-full bg-surface" />
        </div>
        <div className="relative z-10 max-w-[1240px] mx-auto px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-[60px] md:gap-20 items-center">
          <div className="min-w-0">
            <span className={EYEBROW}>Menu digital · Genevois français</span>
            <h1 className="font-serif font-medium text-primary text-[clamp(40px,5.6vw,76px)] leading-[1.04] tracking-[-0.022em] text-balance">
              Le menu digital qui{' '}
              <em className="italic font-medium text-primary-light">filtre vos avis Google</em>,
              fidélise vos clients et parle 3 langues.
            </h1>
            <p className="text-[19px] text-muted max-w-[560px] my-6 mb-8 leading-[1.5]">
              Conçu pour les restaurants du Genevois français qui servent une clientèle locale,
              frontalière et internationale toute l’année.
            </p>
            <ul className="flex flex-col gap-2.5 text-[15px] text-foreground mb-9">
              <li className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                <strong className="font-semibold">Prêt en 5 minutes</strong>
                <span className="text-muted">— Import IA de votre carte actuelle</span>
              </li>
              <li className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                <strong className="font-semibold">14 jours d’essai</strong>
                <span className="text-muted">— Sans carte bancaire</span>
              </li>
              <li className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                <strong className="font-semibold">Sans engagement</strong>
                <span className="text-muted">— Résiliable à tout moment</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <CTALink href="/signup" label="hero_pro_essai" className={BTN_PRIMARY}>
                Essayer Pro 14 jours gratuitement
              </CTALink>
              <Link href="#exemple" className={BTN_SECONDARY}>
                Voir un menu en exemple
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Phone + QR */}
          <div className="relative flex justify-center items-center min-h-[560px] md:min-h-[680px]">
            <a
              href={DEMO_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -right-[8%] top-[2%] z-30 w-[140px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] p-3.5 text-center rotate-[6deg] hover:[transform:rotate(6deg)_translateY(-2px)] hover:shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] transition no-underline text-foreground"
              aria-label="Voir un exemple de menu MonTablo"
            >
              <span
                className="block w-full aspect-square rounded-lg overflow-hidden bg-white [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
                role="img"
                aria-label="QR code du menu démo"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p className="mt-2.5 text-[11px] font-semibold text-primary tracking-[0.1em] uppercase">
                Scanner · Déguster
              </p>
            </a>

            <div
              className="relative w-[340px] h-[680px] bg-white rounded-[46px] shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] border-[10px] border-primary overflow-hidden -rotate-[4deg] max-sm:[transform:rotate(-2deg)_scale(0.88)]"
              aria-hidden="true"
            >
              {/* notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-6 bg-primary rounded-xl z-[2]" />
              <div className="h-full bg-background pt-[50px] px-[22px] pb-[22px] overflow-hidden">
                <div className="text-center pb-5 border-b border-border">
                  <h4 className="font-serif text-[22px] italic text-primary font-medium">Le Petit Bistrot</h4>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-primary-light mt-1.5 font-semibold">
                    Menu · Carte
                  </div>
                </div>
                <div className="font-serif italic text-[14px] text-primary-light mt-[18px] mb-2.5 tracking-[0.08em] uppercase font-medium">
                  — Entrées —
                </div>
                <PhoneItem
                  img="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop"
                  name="Soupe à l'oignon"
                  desc="Gratinée au gruyère, croûtons dorés"
                  price="8,50 €"
                />
                <PhoneItem
                  img="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop"
                  name="Salade de chèvre chaud"
                  desc="Miel, noix, mesclun de saison"
                  price="11,00 €"
                />
                <div className="font-serif italic text-[14px] text-primary-light mt-[18px] mb-2.5 tracking-[0.08em] uppercase font-medium">
                  — Plats —
                </div>
                <PhoneItem
                  img="https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=200&h=200&fit=crop"
                  name="Confit de canard"
                  desc="Pommes sarladaises, salade verte"
                  price="19,50 €"
                />
                <PhoneItem
                  img="https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=200&h=200&fit=crop"
                  name="Bœuf bourguignon"
                  desc="Carottes, champignons, purée maison"
                  price="18,00 €"
                />
              </div>
            </div>

            <div className="absolute left-[2%] bottom-[6%] z-30 max-w-[220px] bg-white rounded-[20px] shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] px-[18px] py-4 -rotate-[5deg]">
              <div>
                <div className="text-accent text-sm tracking-[2px]">★★★★★</div>
                <p className="text-xs mt-1 text-muted italic">
                  « Un menu qui donne faim rien qu&apos;à le regarder. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3 DIFFÉRENCIATEURS ===== */}
      <section className="bg-white border-y border-border">
        <div className="max-w-[1240px] mx-auto px-8 py-20 sm:py-[100px]">
          <div className="text-center max-w-[640px] mx-auto mb-14">
            <span className={EYEBROW}>Ce qui nous distingue</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Pas qu’un simple <em className="italic">menu digital</em>.
            </h2>
            <p className="text-muted text-[18px] mt-4">
              MonTablo fait 3 choses que les autres ne font pas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Carte 1 */}
            <Link
              href="/fonctionnalites#avis-google"
              className="group bg-background border border-border rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-[24px] text-primary leading-tight mb-3 font-medium">
                Vos avis Google, sous contrôle
              </h3>
              <p className="text-[15px] text-muted leading-relaxed mb-5">
                Les clients très satisfaits (5 étoiles) sont redirigés vers votre fiche Google.
                Les avis moins bons restent en interne : vous êtes notifié et vous pouvez
                réagir avant qu’ils ne deviennent publics.
              </p>
              <div className="mt-auto pt-5 border-t border-border">
                <p className="text-[14px] font-semibold text-primary-light leading-snug inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Voir comment ça marche
                  <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </Link>

            {/* Carte 2 */}
            <Link
              href="/fonctionnalites#wallet"
              className="group bg-background border border-border rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-[24px] text-primary leading-tight mb-3 font-medium">
                Une carte de fidélité dans Apple Wallet et Google Wallet
              </h3>
              <p className="text-[15px] text-muted leading-relaxed mb-5">
                Vos clients ajoutent leur carte au Wallet en un scan. Sur Android, elle
                apparaît automatiquement quand ils passent près du restaurant. Sans
                application à télécharger.
              </p>
              <div className="mt-auto pt-5 border-t border-border">
                <p className="text-[14px] font-semibold text-primary-light leading-snug inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Voir comment ça marche
                  <ArrowRight className="w-4 h-4" />
                </p>
              </div>
            </Link>

            {/* Carte 3 */}
            <Link
              href="/fonctionnalites#multilingue"
              className="group bg-background border border-border rounded-3xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.10),0_2px_6px_rgba(30,57,50,0.05)] transition"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-soft flex items-center justify-center mb-6">
                <Languages className="w-6 h-6 text-primary" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-[24px] text-primary leading-tight mb-3 font-medium">
                Multilingue pour vos clients frontaliers et internationaux
              </h3>
              <p className="text-[15px] text-muted leading-relaxed mb-5">
                Français, anglais, allemand — traduction automatique. Vos clients suisses,
                allemands ou britanniques lisent votre carte dans leur langue, sans
                télécharger d’application.
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

      {/* ===== LE PROBLÈME ===== */}
      <section className="relative overflow-hidden bg-primary text-background">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -top-[140px] -right-[140px] w-[420px] h-[420px] rounded-full border border-green-soft/15" />
          <div className="absolute -bottom-[120px] -left-[120px] w-[300px] h-[300px] rounded-full border border-green-soft/10" />
        </div>
        <div className="relative z-10 max-w-[920px] mx-auto px-8 py-20 sm:py-[110px] text-center">
          <span className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-accent font-semibold mb-5">
            Le constat
          </span>
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.1] tracking-tight text-balance">
            Votre carte papier vous coûte plus cher que vous ne le <em className="italic">pensez</em>.
          </h2>
          <div className="text-[18px] text-background/80 leading-[1.65] mt-8 space-y-5 max-w-[680px] mx-auto">
            <p>
              Réimpression à chaque changement de prix. Plats indisponibles annoncés 30 fois
              par soir. Clientèle internationale qui n’arrive pas à lire. Allergènes à
              expliquer un par un. Et toujours pas un seul moyen de savoir si vos clients
              reviennent.
            </p>
            <p className="text-background font-medium">
              MonTablo règle tout ça en une seule plateforme.
            </p>
          </div>
          <Link
            href="/fonctionnalites"
            className="inline-flex items-center gap-2 mt-10 text-accent font-semibold text-[15px] hover:gap-3 transition-all"
          >
            Voir comment ça marche
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== POUR QUI C'EST FAIT ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="max-w-[640px] mb-14">
            <span className={EYEBROW}>Pour qui c’est fait</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Pensé pour les restaurants qui servent une <em className="italic">clientèle exigeante</em>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {personas.map((p) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group bg-white border border-border rounded-2xl p-7 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,57,50,0.08)] transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-mist flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[20px] text-primary leading-tight mb-2 font-medium">
                    {p.title}
                  </h3>
                  <p className="text-[14px] text-muted leading-relaxed">{p.desc}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== EXEMPLE (menu preview interactif) ===== */}
      <section id="exemple" className="relative overflow-hidden bg-primary text-background">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -bottom-[160px] -right-[160px] w-[480px] h-[480px] rounded-full border border-green-soft/12" />
        </div>
        <div className="relative z-10 max-w-[1240px] mx-auto px-8 py-20 sm:py-[100px] grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-accent font-semibold mb-5">
              Aperçu client
            </span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-balance">
              Voilà ce que vos clients <em className="italic">voient vraiment</em>.
            </h2>
            <p className="text-[18px] text-background/75 mt-5 leading-relaxed max-w-[480px]">
              Photos de plats, prix à jour, allergènes intégrés, badges promotionnels,
              tout dans la langue du client. Aucune application à installer.
            </p>
            <CTALink
              href="/signup"
              label="exemple_creer"
              className={`${BTN_BASE} mt-9 bg-background text-primary hover:bg-accent`}
            >
              Créer mon menu
            </CTALink>
          </div>
          <div className="lg:pl-4">
            <MenuPreview />
          </div>
        </div>
      </section>

      {/* ===== OBJECTIONS / FAQ ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[860px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className={EYEBROW}>FAQ</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Les questions qu’on nous pose en <em className="italic">premier</em>.
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
          <p className="text-center mt-10 text-[15px] text-muted">
            Plus de questions ?{' '}
            <Link href="/faq" className="text-primary font-semibold hover:underline">
              Voir la FAQ complète →
            </Link>
          </p>
        </div>
      </section>

      {/* ===== TARIFS ===== */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-[1240px] mx-auto px-8 py-20 sm:py-[100px]">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <span className={EYEBROW}>Tarifs</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Un tarif clair. <em className="italic">Sans engagement.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-[1040px] mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative bg-white rounded-3xl p-8 flex flex-col ${
                  t.highlighted
                    ? 'border-2 border-primary shadow-[0_30px_60px_rgba(30,57,50,0.10)]'
                    : 'border border-border'
                }`}
              >
                {t.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full">
                    Recommandée
                  </span>
                )}
                <h3 className="font-serif italic text-[28px] text-primary font-medium mb-2">
                  {t.name}
                </h3>
                <p className="text-[14px] text-muted mb-6">{t.desc}</p>
                <div className="font-serif text-[40px] text-primary font-medium leading-none">
                  {t.price}
                  {t.priceSuffix && (
                    <span className="text-[14px] font-sans font-medium text-muted ml-1.5">
                      {t.priceSuffix}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 text-primary font-semibold text-[15px] hover:gap-3 transition-all"
            >
              Voir tous les détails
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[14px] text-muted mt-3">
              14 jours d’essai gratuit sur Pro. Sans carte bancaire.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-primary text-background pt-32 sm:pt-[140px] pb-20 sm:pb-28">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full border border-green-soft/15" />
          <div className="absolute top-[40px] -right-[180px] w-[420px] h-[420px] rounded-full border border-green-soft/12" />
        </div>
        <div className="relative z-10 max-w-[820px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-balance">
            Essayez MonTablo <em className="italic text-green-soft">14 jours</em>, gratuitement.
          </h2>
          <p className="text-[18px] text-background/70 mt-5 max-w-[560px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink
              href="/signup"
              label="final_essai"
              className={`${BTN_BASE} bg-background text-primary hover:bg-accent`}
            >
              Démarrer mon essai gratuit
            </CTALink>
            <Link
              href="/contact"
              className={`${BTN_BASE} bg-transparent text-background border-background/40 hover:bg-background hover:text-primary`}
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-primary text-background pt-16 pb-10">
        <div className="max-w-[1240px] mx-auto px-8 pt-10 border-t border-green-soft/12">
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
            <div className="flex items-center gap-4">
              <ManageCookiesButton className="text-[13px] text-background/55 hover:text-accent transition cursor-pointer" />
              <span>Conçu à Saint-Julien-en-Genevois.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PhoneItem({
  img,
  name,
  desc,
  price,
}: {
  img: string
  name: string
  desc: string
  price: string
}) {
  return (
    <div className="grid grid-cols-[44px_1fr_auto] gap-2.5 items-center py-[9px] border-b border-dashed border-border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt="" loading="lazy" className="w-11 h-11 rounded-lg object-cover block" />
      <div className="min-w-0">
        <div className="font-semibold text-primary text-[13px] leading-[1.2] truncate">{name}</div>
        <div className="text-[11px] text-muted italic mt-0.5 leading-[1.3] truncate">{desc}</div>
      </div>
      <div className="font-bold text-primary-light text-[13px] self-center">{price}</div>
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
