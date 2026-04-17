'use client'

import { useState } from 'react'
import { Check, QrCode, Utensils, BarChart3, Calendar, Tag } from 'lucide-react'

function DashboardPreview() {
  return (
    <div className="bg-background rounded-2xl border border-border p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted uppercase tracking-wide">Scans aujourd&apos;hui</p>
          <p className="font-serif text-3xl text-foreground mt-1">47</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-muted uppercase tracking-wide">Cette semaine</p>
          <p className="font-serif text-3xl text-foreground mt-1">312</p>
        </div>
      </div>
      <div className="flex gap-1 items-end h-12">
        {[20, 35, 28, 47, 38, 52, 47].map((h, i) => (
          <div key={i} className="flex-1 bg-primary/15 rounded-sm relative overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-primary rounded-sm"
              style={{ height: `${(h / 52) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-accent/10 rounded-xl p-3">
          <p className="text-[11px] text-muted mb-0.5">Menu actif</p>
          <p className="text-sm font-semibold text-foreground">Carte été 2026</p>
        </div>
        <div className="flex-1 bg-green-50 rounded-xl p-3">
          <p className="text-[11px] text-muted mb-0.5">Statut</p>
          <p className="text-sm font-semibold text-green-700">● En ligne</p>
        </div>
      </div>
    </div>
  )
}

function EditorPreview() {
  return (
    <div className="bg-background rounded-2xl border border-border p-5 space-y-2">
      <p className="text-[10px] font-bold tracking-widest uppercase text-accent-dark mb-3">Entrées</p>
      {[
        { name: "Soupe à l'oignon", price: '8,50 €', hasImg: true },
        { name: 'Salade de chèvre chaud', price: '11,00 €', hasImg: false },
        { name: 'Foie gras maison', price: '16,00 €', hasImg: true },
      ].map((item) => (
        <div
          key={item.name}
          className="flex items-center gap-3 p-2.5 rounded-xl border border-border/60 hover:border-primary/30 transition-colors"
        >
          <div
            className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center ${
              item.hasImg ? 'bg-accent/20' : 'bg-border'
            }`}
          >
            {!item.hasImg && <span className="text-[10px] text-muted">+</span>}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
          </div>
          <span className="text-sm font-semibold text-foreground shrink-0">{item.price}</span>
        </div>
      ))}
      <button className="w-full mt-2 border border-dashed border-border rounded-xl py-2.5 text-xs text-muted hover:border-primary/40 hover:text-primary transition-colors">
        + Ajouter un plat
      </button>
    </div>
  )
}

function QrPreview() {
  return (
    <div className="bg-background rounded-2xl border border-border p-5 flex flex-col items-center gap-4">
      <div className="w-28 h-28 bg-foreground rounded-xl p-3 grid grid-cols-7 gap-0.5">
        {Array.from({ length: 49 }).map((_, i) => {
          const corners = [0,1,2,7,8,9,14,15,16,32,33,34,39,40,41,46,47,48]
          const center = [3,4,5,10,11,12,17,18,19]
          return (
            <div
              key={i}
              className={`rounded-[1px] ${
                corners.includes(i) ? 'bg-white' : center.includes(i) ? 'bg-white/40' : 'bg-white/20'
              }`}
            />
          )
        })}
      </div>
      <div className="w-full space-y-2">
        {['Table 1', 'Table 2', 'Table 3'].map((t) => (
          <div key={t} className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
            <span className="text-sm text-foreground font-medium">{t}</span>
            <button className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Télécharger
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function DailyMenuPreview() {
  return (
    <div className="bg-background rounded-2xl border border-border p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-serif text-base text-foreground">Menu du jour</p>
        <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
          Actif
        </span>
      </div>
      {[
        { course: 'Entrée', name: 'Velouté de potiron', price: '7,00 €' },
        { course: 'Plat', name: 'Dos de cabillaud, beurre blanc', price: '16,00 €' },
        { course: 'Dessert', name: 'Fondant au chocolat', price: '6,50 €' },
      ].map((item) => (
        <div
          key={item.course}
          className="flex items-baseline justify-between py-2 border-b border-border/40 last:border-b-0"
        >
          <div>
            <span className="text-[10px] font-bold tracking-wide uppercase text-accent-dark mr-2">
              {item.course}
            </span>
            <span className="text-sm text-foreground">{item.name}</span>
          </div>
          <span className="text-sm font-semibold text-foreground ml-3 shrink-0">{item.price}</span>
        </div>
      ))}
      <div className="bg-accent/10 rounded-xl px-4 py-2.5 flex items-center justify-between">
        <span className="text-sm text-foreground">Menu complet</span>
        <span className="font-serif text-lg text-foreground">29,50 €</span>
      </div>
    </div>
  )
}

function PromosPreview() {
  return (
    <div className="bg-background rounded-2xl border border-border p-5 space-y-3">
      <p className="font-serif text-base text-foreground mb-1">Promotions actives</p>
      {[
        { name: 'Happy Hour', time: '17h – 19h', discount: '-20%', active: true },
        { name: 'Menu étudiant', time: 'Lun – Ven midi', discount: '-15%', active: true },
        { name: 'Saint-Valentin', time: '14 fév', discount: 'Menu spécial', active: false },
      ].map((promo) => (
        <div key={promo.name} className="flex items-center gap-3 p-3 rounded-xl border border-border/60">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${promo.active ? 'bg-green-500' : 'bg-border'}`}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{promo.name}</p>
            <p className="text-[11px] text-muted">{promo.time}</p>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              promo.active ? 'bg-accent/15 text-accent-dark' : 'bg-border/50 text-muted'
            }`}
          >
            {promo.discount}
          </span>
        </div>
      ))}
    </div>
  )
}

const TABS = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    Icon: BarChart3,
    headline: "Tout en un coup d'œil",
    desc: 'Visualisez vos scans en temps réel, gérez vos menus actifs et accédez aux actions rapides depuis un seul tableau de bord.',
    features: ['Statistiques de scans du jour', 'Menus actifs en un clic', 'Alertes de mise à jour'],
    preview: <DashboardPreview />,
  },
  {
    id: 'editor',
    label: 'Éditeur de menu',
    Icon: Utensils,
    headline: 'Modifiez votre carte en 30 secondes',
    desc: "Ajoutez, modifiez ou supprimez des plats avec photos, prix et allergènes. Les changements s'affichent instantanément.",
    features: ['Drag & drop des catégories', 'Photos par plat', 'Allergènes intégrés'],
    preview: <EditorPreview />,
  },
  {
    id: 'qr',
    label: 'QR Codes',
    Icon: QrCode,
    headline: 'Imprimez une fois. Mettez à jour à l\'infini.',
    desc: 'Vos QR codes sont permanents. Changez le menu demain, vos clients voient la nouvelle version sans rien imprimer.',
    features: ['QR code aux couleurs du restaurant', 'Téléchargement haute résolution', 'Statistiques de scan par table'],
    preview: <QrPreview />,
  },
  {
    id: 'daily',
    label: 'Menu du jour',
    Icon: Calendar,
    headline: 'Le menu du jour en un clic',
    desc: "Publiez votre ardoise du jour depuis le dashboard. Elle apparaît automatiquement en haut de la carte de vos clients.",
    features: ['Publication instantanée', 'Désactivation automatique le soir', 'Historique des menus du jour'],
    preview: <DailyMenuPreview />,
  },
  {
    id: 'promos',
    label: 'Promotions',
    Icon: Tag,
    headline: 'Promotions temporaires automatisées',
    desc: "Programmez une happy hour, un menu de fête ou une offre spéciale. Elle s'active et se désactive automatiquement.",
    features: ['Activation par plage horaire', 'Badge promo sur le plat', 'Aucune intervention requise'],
    preview: <PromosPreview />,
  },
]

export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const switchTab = (i: number) => {
    if (i === active) return
    setTransitioning(true)
    setTimeout(() => {
      setActive(i)
      setTransitioning(false)
    }, 150)
  }

  const tab = TABS[active]

  return (
    <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[100px]">
      <p className="text-sm font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
        Le produit
      </p>
      <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-10 sm:mb-12 max-w-[560px] leading-tight">
        Tout ce dont vous avez besoin, dans un seul tableau de bord.
      </h2>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-2 px-2">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => switchTab(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              i === active
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-muted hover:text-foreground hover:bg-border/50'
            }`}
          >
            <t.Icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-opacity duration-150"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <tab.Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">{tab.headline}</h3>
          <p className="text-base text-muted leading-relaxed mb-6">{tab.desc}</p>
          <ul className="space-y-2.5">
            {tab.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-accent-dark" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:pl-4">{tab.preview}</div>
      </div>
    </section>
  )
}
