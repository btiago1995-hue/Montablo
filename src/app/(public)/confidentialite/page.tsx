import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — MonTablo',
}

export default function ConfidentialitePage() {
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
        <h1 className="font-serif text-3xl text-foreground mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-muted mb-8">Dernière mise à jour : 13 avril 2026</p>

        <div className="prose prose-sm text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">1. Responsable du traitement</h2>
            <p>
              ROCHA DE BARROS TAVARES SEMEDO Tiago, entrepreneur individuel, SIREN 908 728 942,
              17 rue Amédée VIII de Savoie, APP 16, 74160 Saint-Julien-en-Genevois, France.
            </p>
            <p>Contact : contact@montablo.com</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong className="text-foreground">Restaurateurs (compte) :</strong> adresse email, mot de passe (chiffré), nom du restaurant</li>
              <li><strong className="text-foreground">Visiteurs du menu :</strong> note de satisfaction (1-5 étoiles), adresse IP (pour limitation de fréquence uniquement, non conservée au-delà d&apos;1 heure)</li>
              <li><strong className="text-foreground">Paiement :</strong> les informations bancaires sont traitées directement par Stripe et ne transitent jamais par nos serveurs</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">3. Finalités du traitement</h2>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Gestion des comptes restaurateurs et de leurs menus</li>
              <li>Affichage du menu public aux clients du restaurant</li>
              <li>Collecte de satisfaction client (avis)</li>
              <li>Gestion des abonnements et de la facturation</li>
              <li>Sécurité et prévention des abus (limitation de fréquence)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">4. Base légale</h2>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong className="text-foreground">Exécution du contrat</strong> (Art. 6.1.b RGPD) : gestion du compte, du menu et de l&apos;abonnement</li>
              <li><strong className="text-foreground">Intérêt légitime</strong> (Art. 6.1.f RGPD) : sécurité et prévention des abus</li>
              <li><strong className="text-foreground">Consentement</strong> (Art. 6.1.a RGPD) : dépôt de cookies non essentiels (le cas échéant)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">5. Sous-traitants et transferts</h2>
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden mt-3">
              <thead>
                <tr className="bg-white">
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Service</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Finalité</th>
                  <th className="text-left px-4 py-2 border-b border-border text-foreground">Localisation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="px-4 py-2">Supabase</td>
                  <td className="px-4 py-2">Base de données, authentification</td>
                  <td className="px-4 py-2">UE (eu-west)</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="px-4 py-2">Vercel</td>
                  <td className="px-4 py-2">Hébergement de l&apos;application</td>
                  <td className="px-4 py-2">États-Unis / UE</td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="px-4 py-2">Stripe</td>
                  <td className="px-4 py-2">Paiement et facturation</td>
                  <td className="px-4 py-2">États-Unis / UE</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Anthropic</td>
                  <td className="px-4 py-2">Import de menu par IA</td>
                  <td className="px-4 py-2">États-Unis</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3">
              Les transferts vers les États-Unis sont encadrés par les Clauses Contractuelles
              Types (CCT) de la Commission européenne et/ou le EU-US Data Privacy Framework.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">6. Durée de conservation</h2>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong className="text-foreground">Compte restaurateur :</strong> durée de la relation contractuelle + 3 ans après suppression</li>
              <li><strong className="text-foreground">Données de paiement :</strong> conservées par Stripe selon ses propres politiques</li>
              <li><strong className="text-foreground">Avis clients :</strong> durée de vie du compte restaurant</li>
              <li><strong className="text-foreground">Adresses IP (rate limit) :</strong> 1 heure maximum</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition et de limitation du traitement</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à : <strong className="text-foreground">contact@montablo.com</strong>
            </p>
            <p className="mt-3">
              Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL
              (Commission Nationale de l&apos;Informatique et des Libertés) : <span className="text-foreground">www.cnil.fr</span>
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">8. Cookies</h2>
            <p>
              MonTablo utilise uniquement des cookies strictement nécessaires au fonctionnement
              du service (authentification de session). Aucun cookie de tracking ou publicitaire
              n&apos;est utilisé. Pour plus de détails, consultez notre{' '}
              <Link href="/cookies" className="text-primary hover:underline">
                Politique de cookies
              </Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
