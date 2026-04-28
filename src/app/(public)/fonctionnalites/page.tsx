import Link from 'next/link'
import QRCode from 'qrcode'
import {
  UtensilsCrossed,
  ShieldCheck,
  Wallet,
  ArrowRight,
  Star,
  Bell,
  ScanLine,
  AlertTriangle,
  Camera,
  CalendarClock,
  QrCode,
  Check,
} from 'lucide-react'
import type { Metadata } from 'next'
import { JsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'

export const metadata: Metadata = {
  title:
    'Fonctionnalités — MonTablo : avis Google filtrés, Wallet, multilingue, allergènes',
  description:
    'Toutes les fonctionnalités MonTablo : filtrage avis Google, cartes fidélité Apple/Google Wallet, multilingue FR/EN/DE, allergènes INCO, import IA, menu du jour, QR personnalisé.',
  alternates: { canonical: '/fonctionnalites' },
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
const EYEBROW_DARK =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-accent font-semibold mb-5'

const DEMO_MENU_URL = 'https://www.montablo.com/menu/demo'

export default async function FonctionnalitesPage() {
  const qrSvg = await QRCode.toString(DEMO_MENU_URL, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 0,
    color: { dark: '#1E3932', light: '#0000' },
  })
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="bg-background min-h-screen text-foreground font-sans text-[17px] leading-[1.55] antialiased overflow-x-hidden">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Fonctionnalités', url: `${base}/fonctionnalites` },
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
            <Link
              href="/fonctionnalites"
              className="px-4 py-2.5 text-[15px] text-primary font-semibold rounded-full bg-green-mist transition"
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
              href="/#exemple"
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
      <section className="relative overflow-hidden pt-[70px] pb-20 sm:pb-[100px]">
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute -top-[120px] -right-[120px] w-[420px] h-[420px] rounded-full bg-green-mist" />
          <div className="absolute bottom-10 -left-[100px] w-[220px] h-[220px] rounded-full bg-surface" />
        </div>
        <div className="relative z-10 max-w-[920px] mx-auto px-8 text-center">
          <span className={EYEBROW}>Fonctionnalités</span>
          <h1 className="font-serif font-medium text-primary text-[clamp(40px,5.4vw,72px)] leading-[1.05] tracking-[-0.022em] text-balance">
            Tout ce que MonTablo fait pour votre{' '}
            <em className="italic font-medium text-primary-light">restaurant</em>.
          </h1>
          <p className="text-[19px] text-muted max-w-[620px] mx-auto mt-6 leading-[1.5]">
            Les fonctionnalités qui changent la donne, et celles qui font gagner du temps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink href="/signup" label="features_hero_essai" className={BTN_PRIMARY}>
              Essayer Pro 14 jours gratuitement
            </CTALink>
            <Link href="#avis-google" className={BTN_SECONDARY}>
              Voir les fonctionnalités
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== KILLER FEATURES INTRO (deep green punctuation) ===== */}
      <section className="bg-primary text-background">
        <div className="max-w-[920px] mx-auto px-8 py-20 sm:py-[110px] text-center">
          <span className={EYEBROW_DARK}>Les 3 features qui changent tout</span>
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.1] tracking-tight text-balance">
            Trois fonctionnalités que <em className="italic">personne d&apos;autre</em> ne propose.
          </h2>
          <p className="text-[18px] text-background/80 leading-[1.65] mt-7 max-w-[640px] mx-auto">
            Le filtrage des avis Google, les cartes Wallet géolocalisées et le multilingue
            automatique. C&apos;est ce qui transforme un menu digital en levier de croissance.
          </p>
        </div>
      </section>

      {/* ===== 1. AVIS GOOGLE ===== */}
      <section id="avis-google" className="py-20 sm:py-[100px] scroll-mt-24">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="min-w-0">
            <span className={EYEBROW}>Feature-killer · 1 / 3</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Plus jamais d&apos;avis 1 étoile en{' '}
              <em className="italic">première page</em>.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              À la fin du repas, le client scanne le QR code et est invité à laisser un avis.
              Notre système intercepte la note avant qu&apos;elle ne soit publiée :
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 text-[16px] text-foreground leading-relaxed">
                <Check className="w-5 h-5 text-primary-light shrink-0 mt-0.5" strokeWidth={2.4} />
                <span>
                  Si la note est de 5 étoiles → le client est redirigé vers votre fiche
                  Google pour publier son avis publiquement.
                </span>
              </li>
              <li className="flex gap-3 text-[16px] text-foreground leading-relaxed">
                <Check className="w-5 h-5 text-primary-light shrink-0 mt-0.5" strokeWidth={2.4} />
                <span>
                  Si la note est inférieure à 5 → l&apos;avis reste interne, vous êtes
                  notifié immédiatement, et vous avez l&apos;occasion de réparer la situation
                  avant qu&apos;elle ne devienne publique.
                </span>
              </li>
            </ul>
            <p className="text-[17px] text-muted mt-5 leading-[1.65]">
              C&apos;est légal. C&apos;est éthique. Et ça transforme votre note Google en
              quelques semaines.
            </p>
            <p className="text-[14px] font-semibold text-primary-light mt-6 leading-snug">
              En moyenne : +0,5 étoile sur Google en 2 mois, et 80% des avis publics qui sont
              des 5 étoiles.
            </p>
          </div>

          {/* Visual: avis Google mock */}
          <div className="relative">
            <div className="bg-white rounded-3xl border border-border shadow-[0_30px_60px_rgba(30,57,50,0.10),0_10px_20px_rgba(30,57,50,0.05)] p-8">
              <div className="text-center pb-5 border-b border-border">
                <div className="text-[11px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-2">
                  Comment c&apos;était votre repas ?
                </div>
                <div className="font-serif italic text-[20px] text-primary font-medium">
                  Le Petit Bistrot
                </div>
              </div>

              {/* 5 stars row */}
              <div className="mt-6 p-4 bg-green-mist rounded-2xl border border-green-soft">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" strokeWidth={1.5} />
                  ))}
                </div>
                <div className="text-[12px] text-primary font-semibold">
                  → Redirection vers Google
                </div>
                <div className="text-[12px] text-muted mt-0.5">
                  Le client publie son 5 étoiles publiquement.
                </div>
              </div>

              {/* 3 stars row */}
              <div className="mt-3 p-4 bg-surface rounded-2xl border border-border">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" strokeWidth={1.5} />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-border" strokeWidth={1.5} />
                  ))}
                </div>
                <div className="text-[12px] text-primary font-semibold">
                  → Avis interne uniquement
                </div>
                <div className="text-[12px] text-muted mt-0.5">
                  Vous êtes notifié pour réagir avant publication.
                </div>
              </div>

              {/* Notification toast */}
              <div className="mt-4 flex items-start gap-3 p-3 bg-primary text-background rounded-xl">
                <Bell className="w-4 h-4 shrink-0 mt-0.5 text-accent" strokeWidth={2} />
                <div className="text-[12px] leading-snug">
                  <strong className="font-semibold">Nouvel avis interne</strong>
                  <div className="text-background/75">3 étoiles · il y a 2 minutes</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-accent text-primary text-[11px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 inline -mt-0.5 mr-1" />
              Filtre actif
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. WALLET ===== */}
      <section id="wallet" className="bg-white border-y border-border py-20 sm:py-[100px] scroll-mt-24">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual first (image-left/right alternation) */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-gradient-to-br from-primary to-green-classic rounded-3xl p-7 shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] text-background -rotate-2">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-accent font-semibold mb-1.5">
                    Carte de fidélité
                  </div>
                  <div className="font-serif italic text-[22px] font-medium">Le Petit Bistrot</div>
                </div>
                <Wallet className="w-8 h-8 text-accent" strokeWidth={1.6} />
              </div>
              <div className="text-[12px] text-background/70 mb-2">Tampons</div>
              <div className="grid grid-cols-10 gap-1.5 mb-6">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-full border ${
                      i < 7
                        ? 'bg-accent border-accent'
                        : 'bg-transparent border-background/30'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[11px] text-background/70">Marie D.</div>
                  <div className="text-[13px] font-semibold">7 / 10 visites</div>
                </div>
                <div className="text-[11px] text-accent font-semibold">+ 3 pour offrir</div>
              </div>
            </div>

            {/* GPS pin overlay */}
            <div className="absolute -bottom-4 -right-2 bg-white rounded-2xl shadow-[0_10px_30px_rgba(30,57,50,0.10)] px-4 py-3 rotate-3 max-w-[200px]">
              <div className="text-[11px] tracking-[0.18em] uppercase text-primary-light font-semibold mb-1">
                À 200m
              </div>
              <div className="text-[12px] text-foreground leading-snug">
                Votre carte fidélité <strong>Le Petit Bistrot</strong> est juste à côté.
              </div>
            </div>
          </div>

          <div className="min-w-0 order-1 lg:order-2">
            <span className={EYEBROW}>Feature-killer · 2 / 3</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Vos clients ont votre carte de fidélité dans leur poche, sans rien{' '}
              <em className="italic">télécharger</em>.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              Votre client mange chez vous, vous lui demandez son email, et sa carte de
              fidélité apparaît dans Apple Wallet ou Google Wallet en 30 secondes. À chaque
              visite, elle se met à jour automatiquement.
            </p>
            <p className="text-[17px] text-muted mt-4 leading-[1.65]">
              Et avec la formule Premium et Google Wallet : sa carte apparaît sur l&apos;écran
              d&apos;accueil de son téléphone Android quand il passe à 200 mètres de votre
              restaurant. Vous n&apos;avez rien à faire — votre nom lui revient à l&apos;esprit
              au bon moment. (Apple Wallet : bientôt.)
            </p>
            <p className="text-[14px] font-semibold text-primary-light mt-6 leading-snug">
              → Le coût d&apos;acquisition d&apos;un client fidèle, divisé par 3.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 3. MULTILINGUE ===== */}
      <section id="multilingue" className="py-20 sm:py-[100px] scroll-mt-24">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="min-w-0">
            <span className={EYEBROW}>Feature-killer · 3 / 3</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Votre carte, dans la <em className="italic">langue</em> de chaque client.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              Vous écrivez votre carte en français. Notre IA la traduit en anglais et en
              allemand en quelques secondes. Vous relisez, vous ajustez, c&apos;est en ligne.
            </p>
            <p className="text-[17px] text-muted mt-4 leading-[1.65]">
              Quand un client scanne votre QR code, le menu s&apos;affiche automatiquement
              dans la langue de son téléphone. Pas de menu imprimé en 3 langues à gérer. Pas
              de menu papier supplémentaire à imprimer. Pas de serveur qui doit traduire.
            </p>
            <p className="text-[14px] font-semibold text-primary-light mt-6 leading-snug">
              → Pour les restaurants frontaliers : c&apos;est la fonctionnalité qui change le
              plus l&apos;expérience client.
            </p>
          </div>

          {/* Visual: 3 menu cards in 3 languages */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  flag: '🇫🇷',
                  lang: 'Français',
                  title: 'Soupe à l\'oignon',
                  desc: 'Gratinée au gruyère, croûtons dorés',
                  rotate: '-rotate-2',
                },
                {
                  flag: '🇬🇧',
                  lang: 'English',
                  title: 'French onion soup',
                  desc: 'Gruyère cheese, golden croutons',
                  rotate: 'rotate-1',
                },
                {
                  flag: '🇩🇪',
                  lang: 'Deutsch',
                  title: 'Zwiebelsuppe',
                  desc: 'Mit Gruyère überbacken, Croûtons',
                  rotate: '-rotate-1',
                },
              ].map((m) => (
                <div
                  key={m.lang}
                  className={`bg-white rounded-2xl border border-border shadow-[0_10px_30px_rgba(30,57,50,0.08)] p-4 ${m.rotate}`}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-lg leading-none">{m.flag}</span>
                    <span className="text-[10px] tracking-[0.15em] uppercase text-primary-light font-semibold">
                      {m.lang}
                    </span>
                  </div>
                  <div className="font-semibold text-primary text-[13px] leading-tight mb-1">
                    {m.title}
                  </div>
                  <div className="text-[11px] text-muted italic leading-snug">{m.desc}</div>
                  <div className="mt-3 pt-3 border-t border-dashed border-border text-[12px] font-bold text-primary-light">
                    8,50 €
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-[13px] text-muted">
              <ScanLine className="w-4 h-4 text-primary-light" />
              Détection automatique selon la langue du téléphone
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. ALLERGÈNES INCO ===== */}
      <section className="bg-surface border-y border-border py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-white rounded-3xl border border-border shadow-[0_30px_60px_rgba(30,57,50,0.08)] p-8">
              <div className="font-serif italic text-[20px] text-primary font-medium mb-1">
                Confit de canard
              </div>
              <div className="text-[13px] text-muted italic mb-4">
                Pommes sarladaises, salade verte
              </div>
              <div className="text-[11px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-3">
                Allergènes présents
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'Gluten', emoji: '🌾' },
                  { code: 'Lactose', emoji: '🥛' },
                  { code: 'Œufs', emoji: '🥚' },
                  { code: 'Sulfites', emoji: '🍷' },
                ].map((a) => (
                  <span
                    key={a.code}
                    className="inline-flex items-center gap-1.5 bg-green-mist border border-green-soft text-primary text-[12px] font-medium px-3 py-1.5 rounded-full"
                  >
                    <span>{a.emoji}</span>
                    {a.code}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-border flex items-center gap-2 text-[12px] text-muted">
                <ShieldCheck className="w-4 h-4 text-primary-light" />
                Conforme au règlement UE 1169/2011
              </div>
            </div>
          </div>

          <div className="min-w-0 order-1 lg:order-2">
            <span className={EYEBROW}>Conformité</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              En règle avec la loi, <em className="italic">automatiquement</em>.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              Le règlement européen UE 1169/2011 oblige tous les restaurants à afficher la
              présence des 14 allergènes majeurs sur chaque plat. La majorité des
              établissements sont en infraction sans le savoir.
            </p>
            <p className="text-[17px] text-muted mt-4 leading-[1.65]">
              Avec MonTablo, vous cochez les allergènes présents dans chaque plat (gluten,
              lactose, fruits à coque, etc.). Ils s&apos;affichent automatiquement sur le
              menu public, en pictogrammes lisibles, avec une légende cliquable.
            </p>
            <p className="text-[14px] font-semibold text-primary-light mt-6 leading-snug">
              → Une amende évitée. Et des clients allergiques qui peuvent manger en
              confiance.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5. IMPORT IA ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="min-w-0">
            <span className={EYEBROW}>Rapidité</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Photographiez votre carte. <em className="italic">C&apos;est tout</em>.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              PDF, photo, scan : notre IA lit votre carte actuelle et extrait automatiquement
              tous vos plats, descriptions, prix et catégories en 2 minutes. Vous corrigez ce
              qu&apos;il faut, vous publiez.
            </p>
            <p className="text-[14px] font-semibold text-primary-light mt-6 leading-snug">
              → Pas de saisie manuelle de 80 plats à 22h après le service.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl border border-border shadow-[0_30px_60px_rgba(30,57,50,0.08)] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-mist flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-primary">carte_2026.pdf</div>
                  <div className="text-[11px] text-muted">2,4 Mo · importé</div>
                </div>
                <div className="ml-auto text-[11px] tracking-[0.18em] uppercase text-primary-light font-semibold">
                  IA
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'Soupe à l\'oignon', price: '8,50 €' },
                  { name: 'Salade de chèvre chaud', price: '11,00 €' },
                  { name: 'Confit de canard', price: '19,50 €' },
                  { name: 'Bœuf bourguignon', price: '18,00 €' },
                ].map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 p-2.5 bg-background rounded-xl border border-border animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s`, animationDuration: '2s' }}
                  >
                    <Check className="w-4 h-4 text-primary-light shrink-0" strokeWidth={2.4} />
                    <span className="text-[13px] text-primary font-medium flex-1 truncate">
                      {p.name}
                    </span>
                    <span className="text-[12px] font-bold text-primary-light">{p.price}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border text-center text-[12px] text-muted">
                <strong className="font-semibold text-primary">82 plats</strong> extraits en{' '}
                <strong className="font-semibold text-primary">1 min 47</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. MENU DU JOUR ===== */}
      <section className="bg-white border-y border-border py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-background rounded-3xl border border-border shadow-[0_30px_60px_rgba(30,57,50,0.08)] p-8">
              <div className="flex items-center gap-2 mb-5">
                <CalendarClock className="w-4 h-4 text-primary-light" />
                <span className="text-[11px] tracking-[0.22em] uppercase text-primary-light font-semibold">
                  Menu du jour · jeudi 26 avril
                </span>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-xl border border-border p-3.5 flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-primary-light tracking-wider">
                    ENTRÉE
                  </span>
                  <span className="text-[14px] text-primary font-medium flex-1">
                    Velouté de potimarron
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-border p-3.5 flex items-center gap-3 opacity-50 line-through">
                  <span className="text-[11px] font-semibold text-primary-light tracking-wider no-underline">
                    PLAT
                  </span>
                  <span className="text-[14px] text-primary font-medium flex-1">
                    Joue de bœuf braisée
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-accent bg-primary px-2 py-0.5 rounded-full no-underline">
                    Épuisé
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-border p-3.5 flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-primary-light tracking-wider">
                    DESSERT
                  </span>
                  <span className="text-[14px] text-primary font-medium flex-1">
                    Tarte Tatin maison
                  </span>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                <span className="text-[13px] text-muted">Formule complète</span>
                <span className="font-serif text-[22px] text-primary font-medium">22 €</span>
              </div>
            </div>
          </div>

          <div className="min-w-0 order-1 lg:order-2">
            <span className={EYEBROW}>Quotidien</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Votre ardoise, en <em className="italic">mieux</em>.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              Le matin, vous renseignez le menu du jour : entrée, plat, dessert, prix.
              C&apos;est en ligne avant le service. Le soir, le plat est épuisé ? Un clic, il
              disparaît du menu pour les clients qui scannent.
            </p>
            <p className="text-[14px] font-semibold text-primary-light mt-6 leading-snug">
              → Plus jamais de &laquo; ah désolé, on n&apos;en a plus &raquo; à 21h.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 7. QR CODE PERSONNALISÉ ===== */}
      <section className="py-20 sm:py-[100px]">
        <div className="max-w-[1240px] mx-auto px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="min-w-0">
            <span className={EYEBROW}>Identité</span>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-tight text-primary text-balance">
              Aux <em className="italic">couleurs</em> de votre restaurant.
            </h2>
            <p className="text-[17px] text-muted mt-6 leading-[1.65]">
              Le QR code que vous mettez sur les tables porte vos couleurs.
              Imprimable en haute résolution, prêt pour le passage chez votre imprimeur.
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="bg-white rounded-3xl border border-border shadow-[0_30px_60px_rgba(30,57,50,0.08)] p-8 max-w-[320px] text-center">
              <div className="text-[10px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-3">
                Scanner · Déguster
              </div>
              <div className="font-serif italic text-[22px] text-primary font-medium mb-5">
                Le Petit Bistrot
              </div>
              <a
                href={DEMO_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square bg-background rounded-2xl border-2 border-primary p-5 mb-5 [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
                aria-label="Scanner un menu de démonstration MonTablo"
                role="img"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <div className="flex items-center justify-center gap-2 text-[12px] text-muted">
                <QrCode className="w-4 h-4 text-primary-light" />
                Personnalisable · HD imprimable
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[820px] mx-auto px-8 text-center">
          <span className={EYEBROW}>Prêt à essayer ?</span>
          <h2 className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-tight text-primary text-balance">
            Toutes ces fonctionnalités, <em className="italic">14 jours</em> gratuitement.
          </h2>
          <p className="text-[18px] text-muted mt-5 max-w-[560px] mx-auto leading-relaxed">
            Sans carte bancaire. Sans engagement. Configuration en 5 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
            <CTALink href="/signup" label="features_final_essai" className={BTN_PRIMARY}>
              Démarrer mon essai gratuit
            </CTALink>
            <Link href="/contact" className={BTN_SECONDARY}>
              Demander une démo
            </Link>
          </div>
          <div className="mt-10 inline-flex items-center gap-2 text-[13px] text-muted">
            <AlertTriangle className="w-4 h-4 text-accent" />
            Conforme RGPD · Hébergement européen · Support en français
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
