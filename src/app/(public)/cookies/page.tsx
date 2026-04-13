import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de cookies — MonTablo',
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
        <p className="text-sm text-muted mb-8">Derniere mise a jour : 13 avril 2026</p>

        <div className="prose prose-sm text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte depose sur votre navigateur lors de la visite
              d&apos;un site web. Il permet au site de se souvenir de vos actions et preferences
              pendant une periode donnee.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">2. Cookies utilises par MonTablo</h2>
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden mt-3">
              <thead>
                <tr className="bg-white">
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Cookie</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Type</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Finalite</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Duree</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="px-4 py-2 text-foreground">sb-*-auth-token</td>
                  <td className="px-4 py-2">Strictement necessaire</td>
                  <td className="px-4 py-2">Authentification de session (Supabase)</td>
                  <td className="px-4 py-2">Session / 1 an</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">3. Cookies tiers</h2>
            <p>
              MonTablo <strong className="text-foreground">n&apos;utilise aucun cookie de tracking,
              publicitaire ou analytique</strong>. Aucun cookie Google Analytics, Facebook Pixel
              ou equivalent n&apos;est depose.
            </p>
            <p>
              Le service de paiement Stripe peut deposer ses propres cookies strictement
              necessaires lors du processus de paiement. Consultez la{' '}
              <span className="text-foreground">politique de cookies de Stripe</span> pour plus
              de details.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">4. Gestion des cookies</h2>
            <p>
              Les cookies strictement necessaires ne requierent pas de consentement car ils sont
              indispensables au fonctionnement du service (article 82 de la loi Informatique et
              Libertes, transposant la directive ePrivacy).
            </p>
            <p>
              Vous pouvez neanmoins configurer votre navigateur pour bloquer les cookies, mais
              cela empechera l&apos;utilisation du tableau de bord MonTablo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">5. Contact</h2>
            <p>
              Pour toute question relative aux cookies, contactez-nous a :{' '}
              <strong className="text-foreground">contact@montablo.com</strong>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
