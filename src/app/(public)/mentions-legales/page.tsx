import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — MonTablo',
}

export default function MentionsLegalesPage() {
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
        <h1 className="font-serif text-3xl text-foreground mb-8">Mentions légales</h1>

        <div className="prose prose-sm text-muted leading-relaxed space-y-6">
          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">1. Editeur du site</h2>
            <p>
              Le site <strong className="text-foreground">montablo.vercel.app</strong> est
              edite par :
            </p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li><strong className="text-foreground">Nom :</strong> ROCHA DE BARROS TAVARES SEMEDO Tiago</li>
              <li><strong className="text-foreground">Statut :</strong> Entrepreneur individuel</li>
              <li><strong className="text-foreground">SIREN :</strong> 908 728 942</li>
              <li>
                <strong className="text-foreground">Adresse :</strong> 17 rue Amedee VIII de Savoie, APP 16,
                74160 Saint-Julien-en-Genevois, France
              </li>
              <li><strong className="text-foreground">Email :</strong> contact@montablo.com</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">2. Directeur de la publication</h2>
            <p>ROCHA DE BARROS TAVARES SEMEDO Tiago</p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">3. Hebergement</h2>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li><strong className="text-foreground">Hebergeur :</strong> Vercel Inc.</li>
              <li><strong className="text-foreground">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, Etats-Unis</li>
              <li><strong className="text-foreground">Site :</strong> vercel.com</li>
            </ul>
            <p className="mt-3">
              Les donnees sont stockees par Supabase Inc. (serveurs situes dans l&apos;Union
              europeenne, region eu-west).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">4. Propriete intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site MonTablo (textes, graphismes, logos, icones, images,
              logiciels) est la propriete exclusive de l&apos;editeur ou de ses partenaires et est protege
              par les lois francaises et internationales relatives a la propriete intellectuelle.
            </p>
            <p>
              Toute reproduction, representation, modification ou adaptation, totale ou partielle,
              est interdite sans autorisation prealable ecrite de l&apos;editeur.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">5. Donnees personnelles</h2>
            <p>
              Pour toute information relative au traitement de vos donnees personnelles,
              consultez notre{' '}
              <Link href="/confidentialite" className="text-primary hover:underline">
                Politique de confidentialite
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-foreground mt-8 mb-3">6. Droit applicable</h2>
            <p>
              Les presentes mentions legales sont soumises au droit francais. En cas de litige,
              les tribunaux francais seront seuls competents.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
