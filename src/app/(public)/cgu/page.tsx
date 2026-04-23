import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation — MonTablo',
}

export default function CGUPage() {
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
        <h1 className="font-serif text-3xl text-foreground mb-2">Conditions Générales d&apos;Utilisation</h1>
        <p className="text-sm text-muted mb-8">Dernière mise à jour : 13 avril 2026</p>

        <div className="prose prose-sm text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et
              l&apos;utilisation de la plateforme MonTablo, un service de menu digital pour les
              restaurants, édité par ROCHA DE BARROS TAVARES SEMEDO Tiago (ci-après &laquo; l&apos;Éditeur &raquo;).
            </p>
            <p>
              L&apos;inscription sur la plateforme implique l&apos;acceptation sans réserve des présentes CGU.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">2. Description du service</h2>
            <p>MonTablo propose aux restaurateurs :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>La création et gestion d&apos;un menu digital accessible via QR code</li>
              <li>La gestion de catégories, plats, prix et descriptions (français/anglais)</li>
              <li>Un menu du jour configurable</li>
              <li>Un système de promotions temporaires</li>
              <li>L&apos;import de menu par intelligence artificielle (photo, PDF ou texte)</li>
              <li>La collecte d&apos;avis clients avec redirection vers Google</li>
              <li>Un QR code personnalisé téléchargeable</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">3. Inscription et compte</h2>
            <p>
              Pour utiliser MonTablo, le restaurateur doit créer un compte en fournissant une
              adresse email valide, un mot de passe et le nom de son restaurant.
            </p>
            <p>
              Le restaurateur est responsable de la confidentialité de ses identifiants et de
              toute activité effectuée depuis son compte.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">4. Essai gratuit et abonnement</h2>
            <p>
              MonTablo propose un essai gratuit de <strong className="text-foreground">14 jours</strong> à
              compter de la création du compte, sans engagement et sans carte bancaire.
            </p>
            <p>
              À l&apos;issue de la période d&apos;essai, l&apos;accès au tableau de bord et le menu public
              seront désactivés jusqu&apos;à la souscription d&apos;un abonnement payant.
            </p>
            <p>Les formules disponibles sont :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong className="text-foreground">Mensuel :</strong> 29,99 &euro; TTC / mois</li>
              <li><strong className="text-foreground">Annuel :</strong> 26,99 &euro; TTC / mois (323,89 &euro; / an)</li>
            </ul>
            <p className="mt-3">
              Le paiement est géré par Stripe. L&apos;abonnement se renouvelle automatiquement sauf
              annulation par le restaurateur depuis ses paramètres.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">5. Droit de rétractation</h2>
            <p>
              Conformément à l&apos;article L221-28 du Code de la consommation, le droit de
              rétractation ne s&apos;applique pas aux services pleinement exécutés avant la fin du
              délai de rétractation et dont l&apos;exécution a commencé avec l&apos;accord du consommateur.
            </p>
            <p>
              La période d&apos;essai gratuit de 14 jours permet de tester le service avant tout
              engagement financier.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">6. Obligations du restaurateur</h2>
            <p>Le restaurateur s&apos;engage à :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Fournir des informations exactes lors de l&apos;inscription</li>
              <li>Publier un contenu conforme à la législation en vigueur (pas de contenu illicite, trompeur ou diffamatoire)</li>
              <li>Ne pas utiliser le service à des fins autres que la gestion de menu de restaurant</li>
              <li>Maintenir à jour les informations de son menu (prix, disponibilité)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">7. Responsabilité</h2>
            <p>
              L&apos;Éditeur met tout en œuvre pour assurer la disponibilité du service mais ne
              garantit pas un fonctionnement ininterrompu. L&apos;Éditeur ne saurait être tenu
              responsable des dommages indirects liés à l&apos;utilisation du service.
            </p>
            <p>
              Le restaurateur est seul responsable du contenu publié sur son menu (exactitude des
              prix, descriptions, allergènes).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">8. Résiliation</h2>
            <p>
              Le restaurateur peut résilier son abonnement à tout moment depuis la page
              Paramètres de son tableau de bord. La résiliation prend effet à la fin de la
              période de facturation en cours.
            </p>
            <p>
              L&apos;Éditeur se réserve le droit de suspendre ou supprimer un compte en cas de
              violation des présentes CGU, après notification par email.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">9. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est décrit dans notre{' '}
              <Link href="/confidentialite" className="text-primary hover:underline">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">10. Modification des CGU</h2>
            <p>
              L&apos;Éditeur se réserve le droit de modifier les présentes CGU. Les utilisateurs seront
              informés par email de toute modification substantielle. L&apos;utilisation du service
              après notification vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">11. Droit applicable et litiges</h2>
            <p>
              Les présentes CGU sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux
              compétents seront ceux du ressort du siège de l&apos;Éditeur.
            </p>
            <p className="mt-3">
              Conformément à l&apos;article L612-1 du Code de la consommation, le consommateur peut
              recourir gratuitement à un médiateur de la consommation en vue de la résolution
              amiable d&apos;un litige.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
