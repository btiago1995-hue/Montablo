const PAINS = [
  {
    icon: '🍽️',
    scenario:
      "Un couple japonais commande au hasard, reçoit un plat qu'il n'aime pas, laisse un avis 1 étoile.",
    cost: '30 futurs clients dissuadés',
  },
  {
    icon: '🥜',
    scenario:
      'Une famille avec une allergie aux noix ne comprend pas la carte et préfère partir chez le concurrent.',
    cost: 'Table de 4 × 35 € = 140 € perdus',
  },
  {
    icon: '🖨️',
    scenario:
      'Vous changez la carte saisonnière. Traducteur : 200 €, une semaine d\'attente. Et dans 3 semaines, ça recommence.',
    cost: '800 € – 1 200 € par an',
  },
]

export function PainPoints() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[100px]">
      <p className="text-sm font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
        Ces scènes vous parlent ?
      </p>
      <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-10 sm:mb-14 max-w-[560px] leading-tight">
        Chaque semaine sans MonTablo, c&apos;est de l&apos;argent que vous ne récupérerez pas.
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {PAINS.map((pain) => (
          <div
            key={pain.icon}
            className="bg-surface border border-border/60 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-3xl">{pain.icon}</span>
            <p className="text-sm text-muted leading-relaxed flex-1">{pain.scenario}</p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit text-red-600 bg-red-50">
              <span>→</span>
              <span>{pain.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
