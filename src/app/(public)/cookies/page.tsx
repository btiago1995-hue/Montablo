import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'
import { ManageCookiesButton } from '@/components/public/manage-cookies-button'

export const metadata: Metadata = {
  title: 'Politique de cookies — MonTablo',
  description:
    'Liste détaillée des cookies utilisés par MonTablo, leur finalité et leur durée. Conforme RGPD et recommandations CNIL.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 max-w-[780px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-[780px] mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl text-foreground mb-2">Politique de cookies</h1>
        <p className="text-sm text-muted mb-8">Dernière mise à jour : 28 avril 2026</p>

        <div className="text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier déposé sur votre navigateur (ou un équivalent
              technique : localStorage, sessionStorage) lors de votre visite. Il permet au site
              de mémoriser des informations utiles entre les pages ou entre les visites :
              maintenir votre session, retenir vos préférences, ou mesurer la fréquentation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">2. Notre approche</h2>
            <p>
              MonTablo utilise le minimum de cookies nécessaires. Nous distinguons clairement
              les cookies <strong className="text-foreground">strictement nécessaires</strong>{' '}
              (qui ne requièrent pas votre accord, conformément à l&apos;article 82 de la loi
              Informatique et Libertés) et les cookies de mesure d&apos;audience{' '}
              <strong className="text-foreground">soumis à votre consentement préalable</strong>.
            </p>
            <p className="mt-3">
              Au premier chargement du site, une bannière vous propose de tout accepter ou de
              tout refuser. Vous pouvez modifier votre choix à tout moment via le lien{' '}
              <ManageCookiesButton className="text-primary font-semibold underline-offset-2 hover:underline cursor-pointer" />{' '}
              en bas de chaque page.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">3. Cookies strictement nécessaires</h2>
            <p>
              Indispensables au fonctionnement du service. Aucun consentement requis.
            </p>
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden mt-3">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Cookie</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Émetteur</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Finalité</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2 text-foreground">sb-*-auth-token</td>
                  <td className="px-4 py-2">Supabase</td>
                  <td className="px-4 py-2">Authentification de session du tableau de bord</td>
                  <td className="px-4 py-2">1 an</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2 text-foreground">cf_chl_*</td>
                  <td className="px-4 py-2">Cloudflare Turnstile</td>
                  <td className="px-4 py-2">Protection anti-bot des formulaires (signup, login)</td>
                  <td className="px-4 py-2">30 minutes</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2 text-foreground">__stripe_mid, __stripe_sid</td>
                  <td className="px-4 py-2">Stripe</td>
                  <td className="px-4 py-2">Traitement sécurisé du paiement (lors du checkout uniquement)</td>
                  <td className="px-4 py-2">Session / 1 an</td>
                </tr>
                <tr className="border-b border-border/40">
                  <td className="px-4 py-2 text-foreground">montablo_cookie_consent</td>
                  <td className="px-4 py-2">MonTablo</td>
                  <td className="px-4 py-2">Mémorise votre choix concernant les cookies</td>
                  <td className="px-4 py-2">12 mois (localStorage)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-foreground">montablo_review_dismissed</td>
                  <td className="px-4 py-2">MonTablo</td>
                  <td className="px-4 py-2">Évite de re-proposer le pop-up d&apos;avis client dans la même session</td>
                  <td className="px-4 py-2">Session (sessionStorage)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">4. Cookies soumis à consentement</h2>
            <p>
              Ces cookies ne sont déposés que si vous avez cliqué sur{' '}
              <strong className="text-foreground">« Tout accepter »</strong> dans la bannière.
            </p>
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden mt-3">
              <thead>
                <tr className="bg-surface">
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Cookie</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Émetteur</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Finalité</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 text-foreground">_gcl_au, _ga, _gid</td>
                  <td className="px-4 py-2">Google (gtag.js)</td>
                  <td className="px-4 py-2">Mesure d&apos;audience et performance des campagnes Google Ads</td>
                  <td className="px-4 py-2">Jusqu&apos;à 13 mois</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">5. Vercel Analytics</h2>
            <p>
              Notre hébergeur Vercel collecte des statistiques agrégées (pages vues, pays,
              navigateur) <strong className="text-foreground">sans cookies et sans identifiant
              persistant</strong>. Ces données ne permettent pas de vous identifier
              individuellement et ne sont pas soumises à consentement selon la doctrine actuelle
              de la CNIL pour les traceurs strictement limités à la mesure d&apos;audience
              respectueuse de la vie privée.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">6. Comment retirer votre consentement</h2>
            <p>
              À tout moment, vous pouvez :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>
                Cliquer sur{' '}
                <ManageCookiesButton className="text-primary font-semibold underline-offset-2 hover:underline cursor-pointer" />{' '}
                en bas de page pour rouvrir la bannière et changer votre choix.
              </li>
              <li>Configurer votre navigateur pour bloquer ou supprimer tous les cookies.</li>
              <li>
                Utiliser le mode navigation privée pour ne déposer aucun cookie au-delà de la
                session.
              </li>
            </ul>
            <p className="mt-3">
              Le retrait du consentement n&apos;affecte pas la licéité des traitements effectués
              avant ce retrait.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation et de portabilité de vos données. Voir notre{' '}
              <Link href="/confidentialite" className="text-primary font-semibold underline-offset-2 hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">8. Contact</h2>
            <p>
              Pour toute question relative aux cookies ou à vos données :{' '}
              <strong className="text-foreground">contact@montablo.com</strong>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
