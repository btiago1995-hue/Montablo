# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 new animated sections (hero phone mockup, pain points, stats counter, product showcase) and CTA glow to convert the Montablo homepage from static text into a high-converting SaaS landing.

**Architecture:** Each new section is an isolated Client Component dropped into the existing Server Component page. No new dependencies — pure React hooks + Tailwind + CSS `@keyframes`. The page file (`src/app/(public)/page.tsx`) imports and positions each island.

**Tech Stack:** Next.js 14.2, TypeScript, Tailwind CSS, React hooks (useState, useEffect, useRef), IntersectionObserver API

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/public/hero-phone-animation.tsx` | Create | Animated phone mockup cycling FR→EN→DE |
| `src/components/public/pain-points.tsx` | Create | 3 pain scenario cards with cost badges |
| `src/components/public/stats-counter.tsx` | Create | 3 stats with count-up on scroll |
| `src/components/public/product-showcase.tsx` | Create | 5-tab product feature showcase |
| `src/app/(public)/page.tsx` | Modify | Wire all new sections + add CTA glow |

---

## Task 1: Hero Phone Animation

**Files:**
- Create: `src/components/public/hero-phone-animation.tsx`

- [ ] **Step 1: Create the component file**

```tsx
// src/components/public/hero-phone-animation.tsx
'use client'

import { useEffect, useState } from 'react'

const LANGUAGES = [
  {
    flag: '🇫🇷',
    label: 'Français',
    badge: 'fr',
    items: [
      { name: 'Soupe à l\'oignon', desc: 'Gratinée au gruyère', price: '8,50 €' },
      { name: 'Confit de canard', desc: 'Pommes sarladaises', price: '19,50 €' },
      { name: 'Tarte Tatin', desc: 'Crème fraîche maison', price: '7,00 €' },
    ],
  },
  {
    flag: '🇬🇧',
    label: 'English',
    badge: 'en',
    items: [
      { name: 'French Onion Soup', desc: 'Gratin with gruyère', price: '8.50 €' },
      { name: 'Duck Confit', desc: 'Sarladaise potatoes', price: '19.50 €' },
      { name: 'Tarte Tatin', desc: 'Homemade crème fraîche', price: '7.00 €' },
    ],
  },
  {
    flag: '🇩🇪',
    label: 'Deutsch',
    badge: 'de',
    items: [
      { name: 'Französische Zwiebelsuppe', desc: 'Überbacken mit Gruyère', price: '8,50 €' },
      { name: 'Entenconfit', desc: 'Sarladaise-Kartoffeln', price: '19,50 €' },
      { name: 'Tarte Tatin', desc: 'Hausgemachte Crème fraîche', price: '7,00 €' },
    ],
  },
]

export function HeroPhoneAnimation() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % LANGUAGES.length)
        setFading(false)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const lang = LANGUAGES[current]

  return (
    <div className="relative flex items-center justify-center lg:justify-end">
      {/* Phone shell */}
      <div className="relative w-[260px] sm:w-[280px] bg-white rounded-[2.5rem] border-[6px] border-foreground/10 shadow-[0_32px_80px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Status bar */}
        <div className="bg-background px-5 pt-3 pb-1 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-foreground/40">9:41</span>
          <div className="w-16 h-4 bg-foreground/8 rounded-full" />
          <span className="text-[10px] font-semibold text-foreground/40">●●●</span>
        </div>

        {/* Menu content */}
        <div
          className="px-5 pb-6 pt-3 min-h-[340px] transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          {/* Restaurant header */}
          <div className="text-center mb-4 pb-3 border-b border-border/40">
            <p className="font-serif text-[15px] text-foreground">Le Petit Bistrot</p>
            <div className="inline-flex items-center gap-1 mt-1 bg-surface px-2 py-0.5 rounded-full">
              <span className="text-xs">{lang.flag}</span>
              <span className="text-[10px] font-medium text-muted">{lang.label}</span>
            </div>
          </div>

          {/* Category */}
          <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-accent-dark mb-2">
            Menu
          </p>

          {/* Items */}
          <div className="space-y-0">
            {lang.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-baseline py-2.5 border-b border-border/25 last:border-b-0"
              >
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-[12px] font-medium text-foreground leading-tight">{item.name}</p>
                  <p className="text-[10px] text-muted mt-0.5 leading-tight">{item.desc}</p>
                </div>
                <span className="text-[11px] font-semibold text-foreground whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Language indicator dots */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {LANGUAGES.map((_, i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-300 ${
              i === current
                ? 'w-4 h-1.5 bg-primary'
                : 'w-1.5 h-1.5 bg-border'
            }`}
          />
        ))}
      </div>

      {/* Decorative floating badge */}
      <div className="absolute -top-3 -right-3 sm:-right-6 bg-white border border-border rounded-xl px-3 py-2 shadow-lg">
        <p className="text-[10px] font-semibold text-foreground">Mis à jour</p>
        <p className="text-[9px] text-muted">il y a 2 min</p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -20
```
Expected: no TypeScript errors mentioning `hero-phone-animation`

- [ ] **Step 3: Commit**

```bash
cd /Users/tiago/Montablo
git add src/components/public/hero-phone-animation.tsx
git commit -m "feat: add animated hero phone mockup cycling FR/EN/DE"
```

---

## Task 2: Pain Points Section

**Files:**
- Create: `src/components/public/pain-points.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/public/pain-points.tsx
const PAINS = [
  {
    icon: '🍽️',
    scenario: 'Un couple japonais commande au hasard, reçoit un plat qu\'il n\'aime pas, laisse un avis 1 étoile.',
    label: '"Mauvaise expérience"',
    cost: '30 futurs clients dissuadés',
    costColor: 'text-red-600 bg-red-50',
  },
  {
    icon: '🥜',
    scenario: 'Une famille avec une allergie aux noix ne comprend pas la carte et préfère partir chez le concurrent.',
    label: 'Table vide',
    cost: 'Table de 4 × 35 € = 140 € perdus',
    costColor: 'text-red-600 bg-red-50',
  },
  {
    icon: '🖨️',
    scenario: 'Vous changez la carte saisonnière. Traducteur : 200 €, une semaine d\'attente. Et dans 3 semaines, ça recommence.',
    label: 'Réimpression',
    cost: '800 € – 1 200 € par an',
    costColor: 'text-red-600 bg-red-50',
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
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full w-fit ${pain.costColor}`}>
              <span>→</span>
              <span>{pain.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -10
```
Expected: clean build

- [ ] **Step 3: Commit**

```bash
cd /Users/tiago/Montablo
git add src/components/public/pain-points.tsx
git commit -m "feat: add pain points section with cost scenarios"
```

---

## Task 3: Stats Counter

**Files:**
- Create: `src/components/public/stats-counter.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/public/stats-counter.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 30, unit: 's', label: 'Pour créer votre menu', prefix: '' },
  { value: 100, unit: '%', label: 'Des mises à jour en temps réel', prefix: '' },
  { value: 0, unit: '€', label: 'De réimpression, pour toujours', prefix: '' },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) {
      setCount(target)
      return
    }
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return count
}

function StatItem({ value, unit, label, prefix, active }: {
  value: number
  unit: string
  label: string
  prefix: string
  active: boolean
}) {
  const count = useCountUp(value, 1200, active)
  return (
    <div className="text-center">
      <div className="font-serif text-[52px] sm:text-[64px] leading-none text-foreground mb-2">
        {prefix}{count}{unit}
      </div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  )
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="border-y border-border bg-white">
      <div className="max-w-[1120px] mx-auto px-6 py-14 sm:py-20">
        <div className="grid grid-cols-3 gap-6 sm:gap-12 divide-x divide-border">
          {STATS.map((stat, i) => (
            <StatItem key={i} {...stat} active={active} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -10
```
Expected: clean build

- [ ] **Step 3: Commit**

```bash
cd /Users/tiago/Montablo
git add src/components/public/stats-counter.tsx
git commit -m "feat: add animated stats counter with IntersectionObserver"
```

---

## Task 4: Product Showcase Tabs

**Files:**
- Create: `src/components/public/product-showcase.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/public/product-showcase.tsx
'use client'

import { useState } from 'react'
import { Check, QrCode, Utensils, BarChart3, Calendar, Tag } from 'lucide-react'

const TABS = [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: BarChart3,
    headline: 'Tout en un coup d\'œil',
    desc: 'Visualisez vos scans en temps réel, gérez vos menus actifs et accédez aux actions rapides depuis un seul tableau de bord.',
    features: ['Statistiques de scans du jour', 'Menus actifs en un clic', 'Alertes de mise à jour'],
    preview: <DashboardPreview />,
  },
  {
    id: 'editor',
    label: 'Éditeur de menu',
    icon: Utensils,
    headline: 'Modifiez votre carte en 30 secondes',
    desc: 'Ajoutez, modifiez ou supprimez des plats avec photos, prix et allergènes. Les changements s\'affichent instantanément.',
    features: ['Drag & drop des catégories', 'Photos par plat', 'Allergènes intégrés'],
    preview: <EditorPreview />,
  },
  {
    id: 'qr',
    label: 'QR Codes',
    icon: QrCode,
    headline: 'Imprimez une fois. Mettez à jour à l\'infini.',
    desc: 'Vos QR codes sont permanents. Changez le menu demain, vos clients voient la nouvelle version sans rien imprimer.',
    features: ['QR code aux couleurs du restaurant', 'Téléchargement haute résolution', 'Statistiques de scan par table'],
    preview: <QrPreview />,
  },
  {
    id: 'daily',
    label: 'Menu du jour',
    icon: Calendar,
    headline: 'Le menu du jour en un clic',
    desc: 'Publiez votre ardoise du jour depuis le dashboard. Elle apparaît automatiquement en haut de la carte de vos clients.',
    features: ['Publication instantanée', 'Désactivation automatique le soir', 'Historique des menus du jour'],
    preview: <DailyMenuPreview />,
  },
  {
    id: 'promos',
    label: 'Promotions',
    icon: Tag,
    headline: 'Promotions temporaires automatisées',
    desc: 'Programmez une happy hour, un menu de fête ou une offre spéciale. Elle s\'active et se désactive automatiquement.',
    features: ['Activation par plage horaire', 'Badge promo sur le plat', 'Aucune intervention requise'],
    preview: <PromosPreview />,
  },
]

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
              className="absolute bottom-0 left-0 right-0 bg-primary rounded-sm transition-all"
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
        { name: 'Soupe à l\'oignon', price: '8,50 €', img: true },
        { name: 'Salade de chèvre chaud', price: '11,00 €', img: false },
        { name: 'Foie gras maison', price: '16,00 €', img: true },
      ].map((item) => (
        <div key={item.name} className="flex items-center gap-3 p-2.5 rounded-xl border border-border/60 hover:border-primary/30 transition-colors cursor-pointer group">
          <div className={`w-10 h-10 rounded-lg shrink-0 ${item.img ? 'bg-accent/20' : 'bg-border flex items-center justify-center'}`}>
            {!item.img && <span className="text-[10px] text-muted">+</span>}
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
      <div className="w-32 h-32 bg-foreground rounded-xl flex items-center justify-center">
        <div className="grid grid-cols-3 gap-1 p-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-sm ${[0,2,6,8,4].includes(i) ? 'bg-white' : 'bg-foreground border border-white/20'}`} />
          ))}
        </div>
      </div>
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
          <span className="text-sm text-foreground font-medium">Table 1</span>
          <button className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Télécharger</button>
        </div>
        <div className="flex items-center justify-between bg-surface rounded-xl px-4 py-3">
          <span className="text-sm text-foreground font-medium">Table 2</span>
          <button className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">Télécharger</button>
        </div>
      </div>
    </div>
  )
}

function DailyMenuPreview() {
  return (
    <div className="bg-background rounded-2xl border border-border p-5 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-serif text-base text-foreground">Menu du jour</p>
        <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">Actif</span>
      </div>
      {[
        { course: 'Entrée', name: 'Velouté de potiron', price: '7,00 €' },
        { course: 'Plat', name: 'Dos de cabillaud, beurre blanc', price: '16,00 €' },
        { course: 'Dessert', name: 'Fondant au chocolat', price: '6,50 €' },
      ].map((item) => (
        <div key={item.course} className="flex items-baseline justify-between py-2 border-b border-border/40 last:border-b-0">
          <div>
            <span className="text-[10px] font-bold tracking-wide uppercase text-accent-dark mr-2">{item.course}</span>
            <span className="text-sm text-foreground">{item.name}</span>
          </div>
          <span className="text-sm font-semibold text-foreground ml-3">{item.price}</span>
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
          <div className={`w-2 h-2 rounded-full shrink-0 ${promo.active ? 'bg-green-500' : 'bg-border'}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{promo.name}</p>
            <p className="text-[11px] text-muted">{promo.time}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${promo.active ? 'bg-accent/15 text-accent-dark' : 'bg-border/50 text-muted'}`}>
            {promo.discount}
          </span>
        </div>
      ))}
    </div>
  )
}

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
  const Icon = tab.icon

  return (
    <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[100px]">
      <p className="text-sm font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
        Le produit
      </p>
      <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-10 sm:mb-12 max-w-[560px] leading-tight">
        Tout ce dont vous avez besoin, dans un seul tableau de bord.
      </h2>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide -mx-2 px-2">
        {TABS.map((t, i) => {
          const TIcon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => switchTab(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                i === active
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface text-muted hover:text-foreground hover:bg-border/50'
              }`}
            >
              <TIcon className="w-4 h-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div
        className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-opacity duration-150"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
            <Icon className="w-5 h-5 text-primary" />
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
        <div className="lg:pl-4">
          {tab.preview}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Build check**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -20
```
Expected: clean build. If TypeScript errors, fix the specific lines reported.

- [ ] **Step 3: Commit**

```bash
cd /Users/tiago/Montablo
git add src/components/public/product-showcase.tsx
git commit -m "feat: add product showcase with 5 animated tabs"
```

---

## Task 5: Wire Everything Into page.tsx

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Replace page.tsx with the updated version**

The new page:
1. Imports all new components
2. Makes the Hero 2-column with `HeroPhoneAnimation` on the right
3. Inserts `PainPoints` after the proof strip
4. Inserts `StatsCounter` after `PainPoints`
5. Inserts `ProductShowcase` after "how it works" steps
6. Adds glow shadow to all 3 primary CTAs
7. Keeps everything else (nav, steps, menu-preview, benefits, pricing, final CTA, footer) unchanged

```tsx
import Link from 'next/link'
import { ArrowRight, Check, UtensilsCrossed } from 'lucide-react'
import { PricingToggle } from '@/components/public/pricing-toggle'
import { JsonLd, homepageJsonLd } from '@/components/seo/json-ld'
import { HeroPhoneAnimation } from '@/components/public/hero-phone-animation'
import { PainPoints } from '@/components/public/pain-points'
import { StatsCounter } from '@/components/public/stats-counter'
import { ProductShowcase } from '@/components/public/product-showcase'

const steps = [
  { num: '01', title: 'Inscrivez-vous', desc: 'Créez votre compte en 30 secondes. Aucune carte de crédit requise.' },
  { num: '02', title: 'Ajoutez vos plats', desc: 'Noms, descriptions, prix. Organisez par catégories, ajoutez des photos si vous voulez.' },
  { num: '03', title: 'Partagez le QR code', desc: 'Imprimez-le, posez-le sur vos tables. Vos clients y accèdent en un scan.' },
]

const benefits = [
  'Mise à jour instantanée, plus de réimpressions',
  'Menu du jour en un clic',
  'Promotions temporaires automatisées',
  'Design aux couleurs de votre restaurant',
  'Bilingue français / anglais',
  'QR code personnalisable',
]

const pricingFeatures = [
  'Plats et catégories illimités',
  'Menu du jour et promotions',
  'QR code personnalisé',
  'Bilingue FR / EN',
  'Mises à jour en temps réel',
]

const menuItems = {
  entrees: [
    { name: 'Soupe à l\'oignon', desc: 'Gratinée au gruyère', price: '8,50 €' },
    { name: 'Salade de chèvre chaud', desc: 'Miel, noix, mesclun', price: '11,00 €' },
  ],
  plats: [
    { name: 'Confit de canard', desc: 'Pommes sarladaises', price: '19,50 €' },
    { name: 'Bœuf bourguignon', desc: 'Carottes, champignons', price: '18,00 €' },
  ],
}

export default function LandingPage() {
  const schemas = homepageJsonLd()

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      {/* Nav — unchanged */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Fonctionnalites</Link>
            <Link href="/tarifs" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Tarifs</Link>
            <Link href="/blog" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Blog</Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Connexion</Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — 2-column with phone animation */}
      <section className="max-w-[1120px] mx-auto px-6 pt-[120px] pb-16 sm:pt-[160px] sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-5">
              Le menu digital pour les restaurants exigeants
            </p>
            <h1 className="font-serif text-[32px] sm:text-5xl lg:text-[56px] text-foreground leading-[1.1] mb-6 max-w-[580px]">
              Votre carte, enfin à la hauteur de votre cuisine.
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-[480px] mb-10">
              Un menu digital élégant que vous mettez à jour en temps réel.
              Vos clients scannent, vous gardez le contrôle.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2.5 bg-primary text-white font-medium px-8 py-4 sm:py-3.5 rounded-full hover:bg-primary-light transition-all shadow-[0_0_24px_rgba(44,62,45,0.2)] hover:shadow-[0_0_32px_rgba(44,62,45,0.35)] hover:-translate-y-px text-base sm:text-[15px]"
              >
                Essayer 14 jours gratuitement
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/menu/demo"
                className="group inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium px-6 py-4 sm:py-3.5 rounded-full hover:border-foreground/30 hover:bg-muted/5 transition-all text-base sm:text-[15px]"
              >
                Voir un exemple
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-end pb-8">
            <HeroPhoneAnimation />
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <div className="border-y border-border bg-white">
        <div className="max-w-[1120px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-10">
          <span className="text-sm text-muted/60">Sans engagement</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="text-sm text-muted/60">Aucune carte bancaire</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
          <span className="text-sm text-muted/60">Prêt en 5 minutes</span>
        </div>
      </div>

      {/* Pain points — NEW */}
      <PainPoints />

      {/* Stats counter — NEW */}
      <StatsCounter />

      {/* How it works */}
      <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[120px]">
        <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
          Comment ça marche
        </p>
        <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-10 sm:mb-16 max-w-lg leading-tight">
          Trois étapes. Cinq minutes. Zéro friction.
        </h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.num} className="group">
              <span className="font-serif text-[48px] sm:text-[64px] leading-none text-border group-hover:text-accent transition-colors duration-300">
                {step.num}
              </span>
              <h3 className="font-serif text-xl text-foreground mt-4 mb-2">{step.title}</h3>
              <p className="text-base sm:text-[15px] text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product showcase — NEW */}
      <div className="bg-white border-y border-border/50">
        <ProductShowcase />
      </div>

      {/* Menu preview */}
      <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[100px]">
        <div className="bg-primary rounded-[20px] p-8 sm:p-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="font-serif text-[28px] sm:text-4xl text-white leading-snug mb-4">
              Un menu que vos clients ont envie de lire.
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Design soigné, navigation fluide, chargement instantané.
              Le tout aux couleurs de votre restaurant.
            </p>
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2.5 bg-accent text-foreground font-medium px-8 py-4 sm:py-3.5 rounded-full hover:bg-accent-light transition-all text-base sm:text-[15px] w-full sm:w-auto shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:shadow-[0_0_28px_rgba(212,165,116,0.4)]"
            >
              Créer mon menu
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="bg-background rounded-3xl p-8 max-w-[340px] mx-auto shadow-2xl">
            <div className="text-center mb-6 pb-5 border-b border-border/50">
              <h3 className="font-serif text-lg text-foreground">Le Petit Bistrot</h3>
              <span className="text-xs text-muted/60 block mt-1">Menu</span>
            </div>
            {Object.entries(menuItems).map(([cat, items]) => (
              <div key={cat}>
                <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-accent-dark mt-5 mb-3">
                  {cat === 'entrees' ? 'Entrées' : 'Plats'}
                </p>
                {items.map((item) => (
                  <div key={item.name} className="flex justify-between items-baseline py-2.5 border-b border-border/30 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground whitespace-nowrap ml-4">{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[120px] grid lg:grid-cols-5 gap-8 lg:gap-20">
          <div className="lg:col-span-2">
            <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
              Pourquoi MonTablo
            </p>
            <h2 className="font-serif text-[28px] sm:text-4xl text-foreground leading-tight">
              Tout ce qu&apos;il faut. Rien de superflu.
            </h2>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-1">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 rounded-xl hover:bg-background transition-colors">
                <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent-dark" />
                </span>
                <span className="text-base sm:text-[15px] text-foreground leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-[1120px] mx-auto px-6 py-16 sm:py-[120px]">
        <div className="text-center">
          <p className="text-sm sm:text-[13px] font-medium tracking-[0.08em] uppercase text-accent-dark mb-3">
            Tarif simple
          </p>
          <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-2">
            Un seul prix. Tout inclus.
          </h2>
          <p className="text-base sm:text-[17px] text-muted mb-10 sm:mb-12">
            Pas de paliers, pas de fonctionnalités cachées.
          </p>
          <PricingToggle features={pricingFeatures} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1120px] mx-auto px-6 pb-16 sm:pb-[120px]">
        <div className="border border-border rounded-[20px] py-16 sm:py-24 px-6 sm:px-8 text-center bg-gradient-to-b from-white to-background">
          <h2 className="font-serif text-[28px] sm:text-4xl text-foreground mb-3 text-balance">
            Vos plats méritent mieux qu&apos;un PDF.
          </h2>
          <p className="text-base sm:text-[17px] text-muted mb-8 sm:mb-10 max-w-md mx-auto">
            Rejoignez les restaurateurs qui ont remplacé leur carte papier
            par une expérience digitale à leur image.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center gap-2.5 bg-primary text-white font-medium px-10 py-4 rounded-full hover:bg-primary-light transition-all shadow-[0_0_24px_rgba(44,62,45,0.2)] hover:shadow-[0_0_32px_rgba(44,62,45,0.35)] hover:-translate-y-px text-base sm:text-[15px] w-full sm:w-auto"
          >
            Créer mon menu gratuitement
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* Footer — unchanged */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
                <span className="font-serif text-base text-primary">MonTablo</span>
              </div>
              <p className="text-[13px] text-muted/60 leading-relaxed">Le menu digital pour les restaurants exigeants.</p>
              <Link href="/a-propos" className="block text-[13px] text-muted/60 hover:text-muted transition-colors mt-3">A propos</Link>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Produit</p>
              <div className="space-y-3">
                <Link href="/fonctionnalites" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Fonctionnalites</Link>
                <Link href="/tarifs" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Tarifs</Link>
                <Link href="/menu/demo" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Voir un exemple</Link>
                <Link href="/solutions/bistrot" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Solutions</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Ressources</p>
              <div className="space-y-3">
                <Link href="/blog" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Blog</Link>
                <Link href="/faq" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground mb-3">Legal</p>
              <div className="space-y-3">
                <Link href="/mentions-legales" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Mentions legales</Link>
                <Link href="/cgu" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">CGU</Link>
                <Link href="/confidentialite" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Confidentialite</Link>
                <Link href="/cookies" className="block text-[13px] text-muted/60 hover:text-muted transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 text-center">
            <p className="text-sm text-muted/60">&copy; {new Date().getFullYear()} MonTablo. Tous droits reserves.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Run build to verify zero errors**

```bash
cd /Users/tiago/Montablo && npm run build 2>&1 | tail -30
```
Expected: `✓ Compiled successfully` with no TypeScript errors.

- [ ] **Step 3: Start dev server and do visual QA**

```bash
cd /Users/tiago/Montablo && npm run dev
```

Check in browser at http://localhost:3000:
- [ ] Hero shows 2-column layout with phone on right (desktop)
- [ ] Phone mockup cycles FR→EN→DE with crossfade
- [ ] Pain points section shows 3 cards with red cost badges
- [ ] Stats counter animates on scroll
- [ ] Product showcase tabs switch content
- [ ] CTAs have subtle glow
- [ ] Mobile (375px) shows single column, phone hidden

- [ ] **Step 4: Commit**

```bash
cd /Users/tiago/Montablo
git add src/app/\(public\)/page.tsx
git commit -m "feat: wire homepage redesign — phone animation, pain points, stats, showcase"
```
