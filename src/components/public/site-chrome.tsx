import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import { CTALink } from './cta-link'
import { ManageCookiesButton } from './manage-cookies-button'

const NAV_LINK = 'px-4 py-2.5 text-[15px] text-primary font-medium rounded-full hover:bg-green-mist transition'
const BTN_GHOST_SM =
  'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm text-primary hover:bg-green-mist transition whitespace-nowrap'
const BTN_PRIMARY_SM =
  'inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-green-classic transition whitespace-nowrap'

export function PublicNav({ ctaLabel = 'nav_essai' }: { ctaLabel?: string }) {
  return (
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
          <Link href="/fonctionnalites" className={NAV_LINK}>
            Fonctionnalités
          </Link>
          <Link href="/tarifs" className={NAV_LINK}>
            Tarifs
          </Link>
          <Link href="/blog" className={NAV_LINK}>
            Blog
          </Link>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/login" className={`${BTN_GHOST_SM} hidden sm:inline-flex`}>
            Connexion
          </Link>
          <CTALink href="/signup" label={ctaLabel} className={BTN_PRIMARY_SM}>
            Essai gratuit
          </CTALink>
        </div>
      </div>
    </nav>
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

export function PublicFooter() {
  return (
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
  )
}

export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] whitespace-nowrap border-[1.5px] border-transparent transition hover:-translate-y-px bg-primary text-background hover:bg-green-classic'
export const BTN_SECONDARY =
  'inline-flex items-center justify-center gap-2.5 h-[50px] px-7 rounded-full font-semibold text-[15px] whitespace-nowrap border-[1.5px] border-primary transition hover:-translate-y-px bg-transparent text-primary hover:bg-primary hover:text-background'
export const EYEBROW =
  'inline-block font-sans text-[12px] tracking-[0.22em] uppercase text-primary-light font-semibold mb-5'
