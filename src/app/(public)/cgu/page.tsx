import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Generales d\'Utilisation — MonTablo',
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
        <h1 className="font-serif text-3xl text-foreground mb-2">Conditions Generales d&apos;Utilisation</h1>
        <p className="text-sm text-muted mb-8">Derniere mise a jour : 13 avril 2026</p>

        <div className="prose prose-sm text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">1. Objet</h2>
            <p>
              Les presentes Conditions Generales d&apos;Utilisation (CGU) regissent l&apos;acces et
              l&apos;utilisation de la plateforme MonTablo, un service de menu digital pour les
              restaurants, edite par ROCHA DE BARROS TAVARES SEMEDO Tiago (ci-apres &laquo; l&apos;Editeur &raquo;).
            </p>
            <p>
              L&apos;inscription sur la plateforme implique l&apos;acceptation sans reserve des presentes CGU.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">2. Description du service</h2>
            <p>MonTablo propose aux restaurateurs :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>La creation et gestion d&apos;un menu digital accessible via QR code</li>
              <li>La gestion de categories, plats, prix et descriptions (francais/anglais)</li>
              <li>Un menu du jour configurable</li>
              <li>Un systeme de promotions temporaires</li>
              <li>L&apos;import de menu par intelligence artificielle (photo, PDF ou texte)</li>
              <li>La collecte d&apos;avis clients avec redirection vers Google</li>
              <li>Un QR code personnalise telechargeable</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">3. Inscription et compte</h2>
            <p>
              Pour utiliser MonTablo, le restaurateur doit creer un compte en fournissant une
              adresse email valide, un mot de passe et le nom de son restaurant.
            </p>
            <p>
              Le restaurateur est responsable de la confidentialite de ses identifiants et de
              toute activite effectuee depuis son compte.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">4. Essai gratuit et abonnement</h2>
            <p>
              MonTablo propose un essai gratuit de <strong className="text-foreground">14 jours</strong> a
              compter de la creation du compte, sans engagement et sans carte bancaire.
            </p>
            <p>
              A l&apos;issue de la periode d&apos;essai, l&apos;acces au tableau de bord et le menu public
              seront desactives jusqu&apos;a la souscription d&apos;un abonnement payant.
            </p>
            <p>Les formules disponibles sont :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong className="text-foreground">Mensuel :</strong> 29,99 &euro; TTC / mois</li>
              <li><strong className="text-foreground">Annuel :</strong> 26,99 &euro; TTC / mois (323,89 &euro; / an)</li>
            </ul>
            <p className="mt-3">
              Le paiement est gere par Stripe. L&apos;abonnement se renouvelle automatiquement sauf
              annulation par le restaurateur depuis ses parametres.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">5. Droit de retractation</h2>
            <p>
              Conformement a l&apos;article L221-28 du Code de la consommation, le droit de
              retractation ne s&apos;applique pas aux services pleinement executes avant la fin du
              delai de retractation et dont l&apos;execution a commence avec l&apos;accord du consommateur.
            </p>
            <p>
              La periode d&apos;essai gratuit de 14 jours permet de tester le service avant tout
              engagement financier.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">6. Obligations du restaurateur</h2>
            <p>Le restaurateur s&apos;engage a :</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Fournir des informations exactes lors de l&apos;inscription</li>
              <li>Publier un contenu conforme a la legislation en vigueur (pas de contenu illicite, trompeur ou diffamatoire)</li>
              <li>Ne pas utiliser le service a des fins autres que la gestion de menu de restaurant</li>
              <li>Maintenir a jour les informations de son menu (prix, disponibilite)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">7. Responsabilite</h2>
            <p>
              L&apos;Editeur met tout en oeuvre pour assurer la disponibilite du service mais ne
              garantit pas un fonctionnement ininterrompu. L&apos;Editeur ne saurait etre tenu
              responsable des dommages indirects lies a l&apos;utilisation du service.
            </p>
            <p>
              Le restaurateur est seul responsable du contenu publie sur son menu (exactitude des
              prix, descriptions, allergenes).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">8. Resiliation</h2>
            <p>
              Le restaurateur peut resilier son abonnement a tout moment depuis la page
              Parametres de son tableau de bord. La resiliation prend effet a la fin de la
              periode de facturation en cours.
            </p>
            <p>
              L&apos;Editeur se reserve le droit de suspendre ou supprimer un compte en cas de
              violation des presentes CGU, apres notification par email.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">9. Donnees personnelles</h2>
            <p>
              Le traitement des donnees personnelles est decrit dans notre{' '}
              <Link href="/confidentialite" className="text-primary hover:underline">
                Politique de confidentialite
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">10. Modification des CGU</h2>
            <p>
              L&apos;Editeur se reserve le droit de modifier les presentes CGU. Les utilisateurs seront
              informes par email de toute modification substantielle. L&apos;utilisation du service
              apres notification vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">11. Droit applicable et litiges</h2>
            <p>
              Les presentes CGU sont soumises au droit francais. En cas de litige, une solution
              amiable sera recherchee avant toute action judiciaire. A defaut, les tribunaux
              competents seront ceux du ressort du siege de l&apos;Editeur.
            </p>
            <p className="mt-3">
              Conformement a l&apos;article L612-1 du Code de la consommation, le consommateur peut
              recourir gratuitement a un mediateur de la consommation en vue de la resolution
              amiable d&apos;un litige.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
