import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import { JsonLd, homepageJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import { MenuPreview } from '@/components/public/homepage/menu-preview'
import { PricingToggle } from '@/components/public/homepage/pricing-toggle'
import './homepage.css'

const steps = [
  {
    num: '01',
    title: 'Inscrivez-vous',
    desc: "Créez votre compte en 30 secondes. Aucune carte de crédit, aucun engagement — juste votre email.",
  },
  {
    num: '02',
    title: 'Ajoutez vos plats',
    desc: "Noms, descriptions, prix. Organisez par catégories, ajoutez des photos. Ou importez votre carte avec l'IA.",
  },
  {
    num: '03',
    title: 'Partagez le QR',
    desc: "Imprimez-le, posez-le sur vos tables. Vos clients y accèdent en un scan — sans app, sans friction.",
  },
]

export default function LandingPage() {
  const schemas = homepageJsonLd()

  return (
    <div className="mt-redesign">
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      {/* Fraunces (editorial serif) + Work Sans (humanist sans) — scoped to this page */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Work+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ===== NAV ===== */}
      <nav className="mt-nav">
        <div className="mt-container mt-nav-inner">
          <Link href="/" className="mt-logo" aria-label="MonTablo — accueil">
            <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
            <span>MonTablo</span>
          </Link>
          <div className="mt-nav-links">
            <Link href="/fonctionnalites">Fonctionnalités</Link>
            <Link href="/tarifs">Tarifs</Link>
            <Link href="#preview">Exemple</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className="mt-nav-actions">
            <Link href="/login" className="mt-btn mt-btn-ghost mt-btn-sm">
              Connexion
            </Link>
            <CTALink
              href="/signup"
              label="nav_essai"
              className="mt-btn mt-btn-primary mt-btn-sm"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="mt-hero">
        <div className="mt-hero-deco" aria-hidden="true">
          <div className="mt-circle mt-c1" />
          <div className="mt-circle mt-c2" />
        </div>
        <div className="mt-container mt-hero-grid">
          <div className="mt-hero-copy">
            <span className="mt-eyebrow">Menu digital · Restaurants</span>
            <h1>
              Votre carte,<br />
              enfin <em>à la hauteur</em><br />
              de votre cuisine.
            </h1>
            <p className="mt-hero-sub">
              Un menu digital élégant, mis à jour en temps réel. Vos clients scannent —
              vous gardez le contrôle, jusqu&apos;au moindre détail.
            </p>
            <div className="mt-hero-ctas">
              <CTALink
                href="/signup"
                label="hero_essayer"
                className="mt-btn mt-btn-primary"
              >
                Essayer 14 jours gratuitement
              </CTALink>
              <Link href="#preview" className="mt-btn mt-btn-secondary">
                Voir un exemple
              </Link>
            </div>
            <div className="mt-hero-meta">
              <span><span className="mt-dot" />Sans engagement</span>
              <span><span className="mt-dot" />Aucune carte bancaire</span>
              <span><span className="mt-dot" />Prêt en 5 minutes</span>
            </div>
          </div>

          <div className="mt-hero-art">
            <div className="mt-qr-badge" aria-hidden="true">
              <div className="mt-qr" />
              <p>Scanner · Déguster</p>
            </div>

            <div className="mt-phone" aria-hidden="true">
              <div className="mt-phone-screen">
                <div className="mt-phone-brand">
                  <h4>Le Petit Bistrot</h4>
                  <div className="mt-tag">Menu · Carte</div>
                </div>
                <div className="mt-phone-cat">— Entrées —</div>
                <div className="mt-phone-item">
                  <div className="mt-phone-item-name">Soupe à l&apos;oignon</div>
                  <div className="mt-phone-item-price">8,50 €</div>
                  <div className="mt-phone-item-desc">Gratinée au gruyère, pain de campagne</div>
                </div>
                <div className="mt-phone-item">
                  <div className="mt-phone-item-name">Chèvre chaud</div>
                  <div className="mt-phone-item-price">11,00 €</div>
                  <div className="mt-phone-item-desc">Miel, noix, mesclun du potager</div>
                </div>
                <div className="mt-phone-cat">— Plats —</div>
                <div className="mt-phone-item">
                  <div className="mt-phone-item-name">Confit de canard</div>
                  <div className="mt-phone-item-price">19,50 €</div>
                  <div className="mt-phone-item-desc">Pommes sarladaises, jus corsé</div>
                </div>
                <div className="mt-phone-item">
                  <div className="mt-phone-item-name">Bœuf bourguignon</div>
                  <div className="mt-phone-item-price">18,00 €</div>
                  <div className="mt-phone-item-desc">Carottes fondantes, champignons</div>
                </div>
              </div>
            </div>

            <div className="mt-review-badge">
              <div>
                <div className="mt-stars">★★★★★</div>
                <p>« Un menu qui donne faim rien qu&apos;à le regarder. »</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section className="mt-section mt-steps">
        <div className="mt-container">
          <div className="mt-steps-header">
            <span className="mt-eyebrow">Comment ça marche</span>
            <h2>Trois étapes. Cinq minutes.<br />Zéro friction.</h2>
          </div>
          <div className="mt-steps-grid">
            {steps.map((s) => (
              <div key={s.num} className="mt-step">
                <div className="mt-step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE MENU PREVIEW ===== */}
      <section className="mt-section mt-preview" id="preview">
        <div className="mt-container mt-preview-grid">
          <div className="mt-preview-copy">
            <span className="mt-eyebrow">Aperçu client</span>
            <h2>
              Un menu que vos clients <em>ont envie</em> de lire.
            </h2>
            <p>
              Design soigné, navigation fluide, chargement instantané. Le tout aux couleurs
              de votre restaurant — et adaptable à chaque saison.
            </p>
            <CTALink
              href="/signup"
              label="preview_creer_menu"
              className="mt-btn mt-btn-primary"
            >
              Créer mon menu
            </CTALink>
          </div>

          <MenuPreview />
        </div>
      </section>

      {/* ===== FEATURES BENTO ===== */}
      <section className="mt-section mt-features" id="features">
        <div className="mt-container">
          <div className="mt-features-head">
            <div>
              <span className="mt-eyebrow">Pourquoi MonTablo</span>
              <h2>Tout ce qu&apos;il faut.<br />Rien de superflu.</h2>
            </div>
            <p>
              Chaque fonctionnalité a sa raison d&apos;être. Nous avons conçu MonTablo
              avec des restaurateurs, pour des restaurateurs.
            </p>
          </div>

          <div className="mt-features-grid">
            <div className="mt-feature mt-tall">
              <div>
                <div className="mt-feature-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <h3>Mises à jour en temps réel</h3>
                <p>
                  Changez un prix, ajoutez un plat du jour, retirez une rupture — vos clients
                  voient l&apos;update instantanément. Plus jamais de réimpressions le lundi matin.
                </p>
              </div>
              <div className="mt-feature-quote">
                « J&apos;ai retiré la truite à 11h02.<br />
                À 11h03, elle n&apos;était plus sur la carte. »
              </div>
            </div>

            <div className="mt-feature">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h10M4 17h16" />
                </svg>
              </div>
              <h3>Menu du jour</h3>
              <p>Publié en un clic, visible toute la journée, archivé automatiquement.</p>
            </div>

            <div className="mt-feature">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <h3>Promotions programmables</h3>
              <p>Happy hours, offres week-end : programmées à l&apos;avance, publiées toutes seules.</p>
            </div>

            <div className="mt-feature mt-wide">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16v12H4zM4 20l4-4h8" />
                </svg>
              </div>
              <h3>Cartes de fidélité intégrées</h3>
              <p>
                Google Wallet &amp; Apple Wallet. Vos clients ajoutent leur carte en un tap —
                vous gardez le lien, même après la visite.
              </p>
            </div>

            <div className="mt-feature">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M3 12h2M19 12h2M12 3v2M12 19v2" />
                </svg>
              </div>
              <h3>Vos couleurs</h3>
              <p>Logo, palette, typographie — votre identité, pixel près.</p>
            </div>

            <div className="mt-feature">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8l7-5 7 5v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                  <path d="M9 13h6" />
                </svg>
              </div>
              <h3>Bilingue FR / EN</h3>
              <p>Une carte, deux langues, zéro traduction manquée.</p>
            </div>

            <div className="mt-feature">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="7" height="7" />
                  <rect x="13" y="4" width="7" height="7" />
                  <rect x="4" y="13" width="7" height="7" />
                  <path d="M13 13h3M20 13v3M13 20h7" />
                </svg>
              </div>
              <h3>QR personnalisé</h3>
              <p>Votre logo au centre, vos couleurs. Imprimable en haute définition.</p>
            </div>

            <div className="mt-feature">
              <div className="mt-feature-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.8 7.06 17.4 8 11.9 4 8l5.61-1.16z" />
                </svg>
              </div>
              <h3>Import IA</h3>
              <p>Photographiez votre carte papier. On s&apos;occupe du reste en 10 secondes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="mt-section mt-pricing" id="pricing">
        <div className="mt-container">
          <div className="mt-pricing-head">
            <span className="mt-eyebrow">Tarifs</span>
            <h2>Trois formules.<br />Aucune surprise.</h2>
            <p>
              Essentiel pour démarrer, Pro pour fidéliser, Premium pour les groupes.
              Essai gratuit de 14 jours sur Essentiel et Pro — sans carte bancaire.
            </p>
          </div>

          <PricingToggle />

          <p className="mt-price-note" style={{ marginTop: 32 }}>
            <Link href="/tarifs" style={{ color: 'var(--mt-green-core)', fontWeight: 600 }}>
              Voir la comparaison complète →
            </Link>
          </p>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="mt-final-cta">
        <div className="mt-container">
          <h2>
            Vos plats méritent <em>mieux</em><br />qu&apos;un PDF.
          </h2>
          <p>
            Rejoignez les restaurateurs qui ont remplacé leur carte papier par
            une expérience digitale à leur image.
          </p>
          <CTALink
            href="/signup"
            label="footer_cta"
            className="mt-btn mt-btn-primary"
          >
            Créer mon menu gratuitement
          </CTALink>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="mt-footer">
        <div className="mt-container">
          <div className="mt-foot-grid">
            <div className="mt-foot-brand">
              <Link
                href="/"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 4, color: 'var(--mt-cream)' }}
                aria-label="MonTablo — accueil"
              >
                <UtensilsCrossed width={26} height={26} strokeWidth={1.6} />
                <h4 style={{ margin: 0 }}>MonTablo</h4>
              </Link>
              <p>
                Le menu digital pour les restaurants exigeants. Conçu en Haute-Savoie,
                mitonné avec soin.
              </p>
            </div>
            <div className="mt-foot-col">
              <h5>Produit</h5>
              <Link href="/fonctionnalites">Fonctionnalités</Link>
              <Link href="/tarifs">Tarifs</Link>
              <Link href="/menu/demo">Voir un exemple</Link>
              <Link href="/solutions/bistrot">Solutions</Link>
            </div>
            <div className="mt-foot-col">
              <h5>Ressources</h5>
              <Link href="/blog">Blog</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/a-propos">À propos</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="mt-foot-col">
              <h5>Legal</h5>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/cgu">CGU</Link>
              <Link href="/confidentialite">Confidentialité</Link>
              <Link href="/cookies">Cookies</Link>
            </div>
          </div>
          <div className="mt-foot-bottom">
            <span>© {new Date().getFullYear()} MonTablo. Tous droits réservés.</span>
            <span>Fait avec soin en Haute-Savoie 🍷</span>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING CIRCULAR CTA ===== */}
      <CTALink
        href="/signup"
        label="float_cta"
        className="mt-float-cta"
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path
              id="mt-circle-text"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text
            fill="rgba(212, 233, 226, 0.55)"
            fontFamily="Fraunces, serif"
            fontStyle="italic"
            fontSize="10"
            letterSpacing="2"
          >
            <textPath href="#mt-circle-text">
              · Essayer gratuitement · 14 jours offerts
            </textPath>
          </text>
        </svg>
        <div className="mt-inner">
          <strong>Scan</strong>
          <span>Commencer</span>
        </div>
      </CTALink>
    </div>
  )
}
