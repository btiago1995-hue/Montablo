# Pricing 3 Tiers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le pricing actuel (un seul tier 26,99€ TTC) par 3 tiers en HT (Essentiel 19€ / Pro 39€ / Premium sur devis), avec toggle mensuel/annuel (−10%) et coupon de lancement `LANCEMENT_GENEVOIS` (−38,46% sur Pro mensuel à vie).

**Architecture :**
- L'état d'abonnement vit déjà dans la table `restaurants` (colonnes `stripe_customer_id`, `subscription_status`, `trial_ends_at`). On étend avec 4 colonnes (`tier`, `billing_cycle`, `is_launch_offer`, `launch_offer_locked_price`) — pas de nouvelle table `subscriptions`, pour éviter un refactor du webhook et rester cohérent avec le code existant.
- 4 prix Stripe (Essentiel/Pro × Mensuel/Annuel) + 1 coupon `LANCEMENT_GENEVOIS`. Premium hors Stripe (manuel sur devis).
- Page `/tarifs` refondue en 3 colonnes + tableau comparatif + FAQ 8 questions. Toggle mensuel/annuel central et sticky.
- Dashboard gagne une page dédiée `/dashboard/abonnement` ; la gestion quitte `/dashboard/settings`.
- Greenfield côté DB (0 abonnement actif confirmé) → migration destructive OK.

**Tech Stack :** Next.js 14.2, TypeScript, Tailwind, Supabase (Postgres + RLS), Stripe (subscriptions + coupons), Resend (emails), Vercel (deploy + cron).

**Testing note :** Le projet n'a pas de test runner (`npm run build` + `npm run lint` uniquement). La stratégie de vérification par tâche est :
- DB → `supabase` MCP `execute_sql` pour valider la migration.
- API routes → `curl` local après `npm run dev`, vérifier le JSON retourné.
- Pages → `npm run build` (doit passer sans erreur TS/lint) + ouvrir `http://localhost:3000/<route>` dans le navigateur pour vérif visuelle.

---

## File Structure

**Create:**
- `supabase/migrations/2026-04-22-pricing-tiers.sql` — migration DB
- `src/lib/pricing.ts` — constantes partagées (tier definitions, prices, Stripe price ID mapping)
- `src/components/public/pricing-cards.tsx` — composant client des 3 colonnes (toggle + cartes)
- `src/components/public/pricing-comparison-table.tsx` — tableau comparatif sticky
- `src/app/(public)/tarifs/faqs.ts` — données FAQ (8 questions)
- `src/app/dashboard/abonnement/page.tsx` — page serveur Abonnement
- `src/app/dashboard/abonnement/abonnement-client.tsx` — client avec boutons upgrade/downgrade
- `src/components/dashboard/trial-banner.tsx` — bannière « Essai Pro — il vous reste X jours »
- `docs/features/pricing-3-tiers.md` — doc de référence du pricing

**Modify:**
- `src/types/database.ts` — ajouter `tier`, `billing_cycle`, `is_launch_offer`, `launch_offer_locked_price` au type `Restaurant`
- `supabase/schema.sql` — mirror la migration
- `src/app/api/stripe/checkout/route.ts` — accepter `tier` + `billing_cycle`
- `src/app/api/stripe/webhook/route.ts` — persister `tier` + `billing_cycle` + détecter coupon
- `src/components/public/pricing-toggle.tsx` — supprimé, remplacé par `pricing-cards.tsx`
- `src/app/(public)/tarifs/page.tsx` — refonte complète
- `src/app/(public)/page.tsx` — bloc pricing homepage remplacé par mini-3-tiers
- `src/components/seo/json-ld.tsx` — `pricingJsonLd()` avec 3 offres
- `src/lib/email-templates.ts` — mise à jour `welcome`, ajout `trialChoosePlan` (J+10), `trialExpired` mis à jour
- `src/app/api/cron/trial-expiry/route.ts` — envoyer l'email J+10
- `src/app/dashboard/layout.tsx` — monter `<TrialBanner />` au-dessus du contenu pendant trial
- `src/components/dashboard/settings-form.tsx` — retirer la section abonnement (migrée sur `/dashboard/abonnement`)

---

# Phase 1 — DB + Stripe Foundation

### Task 1: DB migration — ajouter colonnes pricing à `restaurants`

**Files:**
- Create: `supabase/migrations/2026-04-22-pricing-tiers.sql`
- Modify: `supabase/schema.sql`

- [ ] **Step 1 : écrire la migration**

Créer `supabase/migrations/2026-04-22-pricing-tiers.sql` :

```sql
-- 2026-04-22 : pricing 3 tiers (Essentiel / Pro / Premium)

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS tier TEXT
    CHECK (tier IN ('essentiel', 'pro', 'premium'));

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS billing_cycle TEXT
    CHECK (billing_cycle IN ('monthly', 'annual'));

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS is_launch_offer BOOLEAN DEFAULT false;

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS launch_offer_locked_price NUMERIC(10,2);

ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS trial_choose_plan_sent BOOLEAN DEFAULT false;

-- Comment pour rappel : les restos en trialing sont implicitement « Pro » jusqu'au choix à J+14.
COMMENT ON COLUMN restaurants.tier IS 'NULL pendant trialing ; essentiel|pro|premium après choix du plan';
COMMENT ON COLUMN restaurants.launch_offer_locked_price IS 'Prix HT mensuel verrouillé à vie pour les bénéficiaires du coupon LANCEMENT_GENEVOIS (ex: 24.00)';
```

- [ ] **Step 2 : appliquer la migration via Supabase MCP**

Utiliser l'outil MCP `mcp__supabase__apply_migration` avec le SQL ci-dessus, ou via `execute_sql` si la migration est déjà dans un fichier `.sql`.

Vérification :

```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'restaurants'
  AND column_name IN ('tier', 'billing_cycle', 'is_launch_offer', 'launch_offer_locked_price', 'trial_choose_plan_sent');
```

Attendu : 5 lignes avec les bons types (TEXT, TEXT, BOOLEAN, NUMERIC, BOOLEAN).

- [ ] **Step 3 : mirror dans `schema.sql`**

Ajouter à la fin de `supabase/schema.sql` :

```sql
-- 2026-04-22: pricing 3 tiers
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS tier TEXT CHECK (tier IN ('essentiel', 'pro', 'premium'));
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'annual'));
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS is_launch_offer BOOLEAN DEFAULT false;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS launch_offer_locked_price NUMERIC(10,2);
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS trial_choose_plan_sent BOOLEAN DEFAULT false;
```

- [ ] **Step 4 : commit**

```bash
git add supabase/migrations/2026-04-22-pricing-tiers.sql supabase/schema.sql
git commit -m "feat(db): add pricing tier columns to restaurants"
```

---

### Task 2 : mettre à jour le type `Restaurant`

**Files:**
- Modify: `src/types/database.ts:21`

- [ ] **Step 1 : ajouter les champs**

Dans `src/types/database.ts`, après la ligne `subscription_status: ...`, ajouter :

```typescript
  tier: 'essentiel' | 'pro' | 'premium' | null
  billing_cycle: 'monthly' | 'annual' | null
  is_launch_offer: boolean
  launch_offer_locked_price: number | null
  trial_choose_plan_sent: boolean
```

- [ ] **Step 2 : vérifier TS compile**

```bash
npm run build
```

Attendu : build passe (ou échoue uniquement sur des fichiers qu'on va modifier plus tard — checkout/webhook/settings-form).

- [ ] **Step 3 : commit**

```bash
git add src/types/database.ts
git commit -m "feat(types): extend Restaurant with tier/billing_cycle/launch_offer fields"
```

---

### Task 3 : créer `src/lib/pricing.ts` — source de vérité des tiers

**Files:**
- Create: `src/lib/pricing.ts`

- [ ] **Step 1 : écrire le module**

```typescript
// src/lib/pricing.ts
// Source de vérité pour les tiers de pricing. Utilisée par :
//  - /tarifs (affichage)
//  - /api/stripe/checkout (mapping tier+cycle → Stripe price ID)
//  - /api/stripe/webhook (mapping Stripe price ID → tier+cycle)
//  - /dashboard/abonnement (affichage + changement de formule)

export type Tier = 'essentiel' | 'pro' | 'premium'
export type BillingCycle = 'monthly' | 'annual'

export type TierConfig = {
  id: Tier
  name: string
  tagline: string
  description: string
  priceMonthlyHt: number | null // null pour Premium (sur devis)
  priceAnnualHt: number | null
  priceAnnualTotalHt: number | null
  features: string[]
  cta: { label: string; href: string }
  highlighted: boolean
}

export const TIERS: Record<Tier, TierConfig> = {
  essentiel: {
    id: 'essentiel',
    name: 'Essentiel',
    tagline: 'Pour démarrer simplement',
    description:
      'Idéal pour les bistrots et établissements qui veulent remplacer leur carte papier sans se compliquer la vie.',
    priceMonthlyHt: 19,
    priceAnnualHt: 17.1,
    priceAnnualTotalHt: 205,
    features: [
      'Plats et catégories illimités',
      'QR code personnalisé',
      'Bilingue Français + Anglais',
      'Conformité allergènes INCO 1169/2011',
      'Mises à jour temps réel',
      'Import par IA depuis PDF/photo',
      'Menu du jour basique',
      'Support par email',
    ],
    cta: { label: 'Commencer avec Essentiel', href: '/signup?tier=essentiel' },
    highlighted: false,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'Pour fidéliser et soigner sa réputation',
    description:
      'La formule complète pour les restaurants qui veulent aller au-delà du menu et transformer chaque client en client fidèle.',
    priceMonthlyHt: 39,
    priceAnnualHt: 35.1,
    priceAnnualTotalHt: 421,
    features: [
      'Tout Essentiel, plus :',
      '🌟 Filtrage automatique des avis Google (5★ → Google, <5 → interne)',
      '💳 Cartes de fidélité Apple Wallet & Google Wallet',
      '🌍 3ème langue au choix (Allemand, Italien, Espagnol)',
      '📅 Menu du jour avancé avec composition guidée',
      '🎯 Promotions programmables avec dates de fin',
      '📊 Statistiques de scan et consultation',
      '💬 Support WhatsApp en heures ouvrées (9h-19h)',
    ],
    cta: { label: 'Essayer Pro 14 jours gratuitement', href: '/signup?tier=pro' },
    highlighted: true,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    tagline: 'Pour les groupes et chaînes',
    description:
      'Pour les exploitants de plusieurs établissements qui veulent une gestion centralisée et un accompagnement sur mesure.',
    priceMonthlyHt: null,
    priceAnnualHt: null,
    priceAnnualTotalHt: null,
    features: [
      'Tout Pro, plus :',
      '📍 Géolocalisation Wallet (notification automatique quand le client passe près du restaurant)',
      '🏢 Multi-établissements (un compte, plusieurs restaurants)',
      '🚀 Setup complet et formation par notre équipe',
      '⏰ Support prioritaire 7j/7',
      '🤝 Account manager dédié',
    ],
    cta: { label: 'Demander un devis', href: '/contact?sujet=premium' },
    highlighted: false,
  },
}

// Mapping tier+cycle → Stripe price ID env var name
export function stripePriceEnvName(tier: Tier, cycle: BillingCycle): string | null {
  if (tier === 'premium') return null
  const key = `STRIPE_PRICE_ID_${tier.toUpperCase()}_${cycle.toUpperCase()}`
  return key
}

// Inverse : Stripe price ID → tier+cycle (pour webhook)
export function priceIdToTier(priceId: string): { tier: Tier; cycle: BillingCycle } | null {
  const map: Array<[string | undefined, Tier, BillingCycle]> = [
    [process.env.STRIPE_PRICE_ID_ESSENTIEL_MONTHLY, 'essentiel', 'monthly'],
    [process.env.STRIPE_PRICE_ID_ESSENTIEL_ANNUAL, 'essentiel', 'annual'],
    [process.env.STRIPE_PRICE_ID_PRO_MONTHLY, 'pro', 'monthly'],
    [process.env.STRIPE_PRICE_ID_PRO_ANNUAL, 'pro', 'annual'],
  ]
  for (const [env, tier, cycle] of map) {
    if (env && env === priceId) return { tier, cycle }
  }
  return null
}

export const LAUNCH_COUPON_ID = 'LANCEMENT_GENEVOIS'
// Pro mensuel (39€ HT) × (1 - 0.3846) = 24€ HT exactement
export const LAUNCH_DISCOUNT_PERCENT = 38.46
export const LAUNCH_LOCKED_PRICE_HT = 24.0
```

- [ ] **Step 2 : vérifier TS compile**

```bash
npm run build
```

Attendu : build passe.

- [ ] **Step 3 : commit**

```bash
git add src/lib/pricing.ts
git commit -m "feat(pricing): add tier config module as single source of truth"
```

---

### Task 4 : créer les produits + prix + coupon Stripe (manuel)

**Files:** aucun code — documentation uniquement. Le founder (ou un admin) crée les ressources dans le dashboard Stripe.

- [ ] **Step 1 : créer 2 produits dans Stripe Dashboard → Products**

Pour chaque produit :

1. Produit « MonTablo Essentiel »
   - Description : « Menu digital pour restaurants — formule Essentiel »
   - Ajouter 2 prix :
     - Prix 1 : `19.00 EUR` HT, récurrence mensuelle → copier `price_xxx` dans `STRIPE_PRICE_ID_ESSENTIEL_MONTHLY`
     - Prix 2 : `205.00 EUR` HT, récurrence annuelle → copier dans `STRIPE_PRICE_ID_ESSENTIEL_ANNUAL`
2. Produit « MonTablo Pro »
   - Description : « Menu digital + fidélité + avis Google — formule Pro »
   - Ajouter 2 prix :
     - Prix 1 : `39.00 EUR` HT, récurrence mensuelle → `STRIPE_PRICE_ID_PRO_MONTHLY`
     - Prix 2 : `421.00 EUR` HT, récurrence annuelle → `STRIPE_PRICE_ID_PRO_ANNUAL`

**Note HT** : activer la collecte automatique de TVA dans Stripe → Settings → Tax. Les prix ci-dessus sont hors taxes, Stripe calcule la TVA à l'affichage.

- [ ] **Step 2 : créer le coupon `LANCEMENT_GENEVOIS`**

Dans Stripe Dashboard → Coupons → New :
- ID (exact) : `LANCEMENT_GENEVOIS`
- Type : Percentage discount
- Amount off : `38.46%`
- Duration : **Forever**
- Applies to : restreindre au produit « MonTablo Pro », prix mensuel uniquement (via « Apply to specific products »)
- Max redemptions : `20`

- [ ] **Step 3 : ajouter les 4 env vars aux 3 environnements Vercel**

Pour `development`, `preview`, `production`, utiliser `printf` (pas `echo` — voir CLAUDE.md global) :

```bash
printf "price_xxx_essentiel_monthly" | vercel env add STRIPE_PRICE_ID_ESSENTIEL_MONTHLY production
printf "price_xxx_essentiel_annual"  | vercel env add STRIPE_PRICE_ID_ESSENTIEL_ANNUAL  production
printf "price_xxx_pro_monthly"       | vercel env add STRIPE_PRICE_ID_PRO_MONTHLY       production
printf "price_xxx_pro_annual"        | vercel env add STRIPE_PRICE_ID_PRO_ANNUAL        production
```

Répéter pour `preview` et `development`. Ajouter aussi dans `.env.local` pour le dev.

- [ ] **Step 4 : supprimer les anciennes env vars**

```bash
vercel env rm STRIPE_PRICE_ID        production
vercel env rm STRIPE_PRICE_ID_ANNUAL production
# idem preview + development
```

(À faire **après** le déploiement du code qui n'y fait plus référence — voir Task 5.)

- [ ] **Step 5 : commit (documentation)**

Créer `docs/features/pricing-3-tiers.md` qui documente :
- Les 4 price IDs Stripe (sans valeurs)
- Le coupon `LANCEMENT_GENEVOIS` (existence, objectif, max 20)
- Comment un admin applique le coupon à un client (via Stripe Dashboard → Customer → Add coupon)

```bash
git add docs/features/pricing-3-tiers.md
git commit -m "docs(pricing): document 3-tier Stripe products and launch coupon"
```

---

### Task 5 : mettre à jour `/api/stripe/checkout` — accepter `tier` + `billing_cycle`

**Files:**
- Modify: `src/app/api/stripe/checkout/route.ts`

- [ ] **Step 1 : réécrire le handler**

```typescript
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { stripePriceEnvName, type Tier, type BillingCycle } from '@/lib/pricing'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const tier: Tier = body.tier === 'essentiel' ? 'essentiel' : 'pro' // premium jamais via checkout
  const cycle: BillingCycle = body.billing_cycle === 'annual' ? 'annual' : 'monthly'

  const envName = stripePriceEnvName(tier, cycle)
  if (!envName) {
    return NextResponse.json({ error: 'Tier invalide' }, { status: 400 })
  }
  const priceId = process.env[envName]
  if (!priceId) {
    return NextResponse.json({ error: `Price ID manquant (${envName})` }, { status: 500 })
  }

  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true, // permet la saisie du coupon LANCEMENT_GENEVOIS
    automatic_tax: { enabled: true },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'}/dashboard/abonnement`,
    metadata: {
      restaurant_id: restaurant.id,
      user_id: user.id,
      tier,
      billing_cycle: cycle,
    },
    subscription_data: {
      metadata: {
        restaurant_id: restaurant.id,
        tier,
        billing_cycle: cycle,
      },
    },
  })

  return NextResponse.json({ url: session.url })
}
```

- [ ] **Step 2 : vérifier le build**

```bash
npm run build
```

Attendu : passe.

- [ ] **Step 3 : test manuel (dev)**

```bash
npm run dev
```

Dans un autre terminal (authentifié en cookie, via login dans le navigateur puis copier le cookie, ou avec `curl` + cookie) :

```bash
curl -X POST http://localhost:3000/api/stripe/checkout \
  -H 'Content-Type: application/json' \
  -H 'Cookie: <session cookie>' \
  -d '{"tier":"pro","billing_cycle":"monthly"}'
```

Attendu : `{"url":"https://checkout.stripe.com/..."}`

Cas d'erreur à tester :
- `{"tier":"premium"}` → `{"error":"Tier invalide"}` (car `premium` n'est pas dans le mapping)
- Sans auth → `{"error":"Non autorisé"}` (401)

- [ ] **Step 4 : commit**

```bash
git add src/app/api/stripe/checkout/route.ts
git commit -m "feat(stripe): checkout accepts tier + billing_cycle and enables promo codes"
```

---

### Task 6 : mettre à jour `/api/stripe/webhook` — persister `tier` + `billing_cycle` + coupon

**Files:**
- Modify: `src/app/api/stripe/webhook/route.ts`

- [ ] **Step 1 : enrichir `checkout.session.completed`**

Remplacer le bloc `case 'checkout.session.completed'` existant par :

```typescript
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const restaurantId = session.metadata?.restaurant_id
      const tier = session.metadata?.tier as 'essentiel' | 'pro' | undefined
      const billingCycle = session.metadata?.billing_cycle as 'monthly' | 'annual' | undefined

      if (!restaurantId) break

      // Détecter si le coupon LANCEMENT_GENEVOIS a été appliqué
      let isLaunchOffer = false
      let lockedPrice: number | null = null
      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string,
          { expand: ['discount.coupon'] },
        )
        const couponId = sub.discount?.coupon?.id
        if (couponId === 'LANCEMENT_GENEVOIS') {
          isLaunchOffer = true
          lockedPrice = 24.0
        }
      }

      await supabase
        .from('restaurants')
        .update({
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_status: 'active',
          tier: tier ?? 'pro',
          billing_cycle: billingCycle ?? 'monthly',
          is_launch_offer: isLaunchOffer,
          launch_offer_locked_price: lockedPrice,
        })
        .eq('id', restaurantId)

      await sendEmailToRestaurantOwner(restaurantId, subscriptionConfirmed)
      break
    }
```

- [ ] **Step 2 : gérer les changements de plan via `customer.subscription.updated`**

Enrichir le bloc existant pour synchroniser `tier` + `billing_cycle` depuis le price ID :

```typescript
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const statusMap: Record<string, Restaurant['subscription_status']> = {
        active: 'active',
        past_due: 'past_due',
        canceled: 'canceled',
        unpaid: 'inactive',
      }

      // Lire le premier price ID pour savoir quel tier / cycle
      const priceId = subscription.items.data[0]?.price.id
      const { priceIdToTier } = await import('@/lib/pricing')
      const mapped = priceId ? priceIdToTier(priceId) : null

      await supabase
        .from('restaurants')
        .update({
          subscription_status: statusMap[subscription.status] || 'inactive',
          ...(mapped ? { tier: mapped.tier, billing_cycle: mapped.cycle } : {}),
        })
        .eq('stripe_customer_id', customerId)
      break
    }
```

- [ ] **Step 3 : build**

```bash
npm run build
```

Attendu : passe.

- [ ] **Step 4 : test local via Stripe CLI**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Puis dans un autre terminal, déclencher un checkout complet en mode test (via la page /dashboard/abonnement une fois Task 16 livré — ou via Stripe CLI directement) et vérifier dans Supabase que `tier`, `billing_cycle`, `is_launch_offer` sont bien écrits.

- [ ] **Step 5 : commit**

```bash
git add src/app/api/stripe/webhook/route.ts
git commit -m "feat(stripe): webhook persists tier/billing_cycle + detects launch coupon"
```

---

# Phase 2 — Page /tarifs refondue

### Task 7 : créer `PricingCards` component (toggle + 3 colonnes)

**Files:**
- Create: `src/components/public/pricing-cards.tsx`

- [ ] **Step 1 : écrire le composant**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { TIERS } from '@/lib/pricing'

export function PricingCards() {
  const [annual, setAnnual] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Toggle (sticky au scroll) */}
      <div
        className={`sticky top-[72px] z-40 flex justify-center py-4 transition-all ${
          scrolled ? 'bg-background/85 backdrop-blur-xl border-b border-border/50' : ''
        }`}
      >
        <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1.5">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              !annual ? 'bg-white text-foreground shadow-sm' : 'text-muted hover:text-foreground'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              annual ? 'bg-white text-foreground shadow-sm' : 'text-muted hover:text-foreground'
            }`}
          >
            Annuel
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              -10%
            </span>
          </button>
        </div>
      </div>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {(['essentiel', 'pro', 'premium'] as const).map((key) => {
          const t = TIERS[key]
          const price =
            t.priceMonthlyHt === null
              ? null
              : annual
                ? t.priceAnnualHt
                : t.priceMonthlyHt

          const cardClass = t.highlighted
            ? 'relative bg-white border-2 border-primary rounded-[20px] p-8 shadow-xl shadow-primary/10'
            : 'bg-white border border-border rounded-[20px] p-8'

          const ctaClass = t.highlighted
            ? 'flex items-center justify-center w-full bg-primary text-white font-medium py-3.5 rounded-full hover:bg-primary-light transition-all hover:shadow-lg text-[15px]'
            : 'flex items-center justify-center w-full border border-foreground text-foreground font-medium py-3.5 rounded-full hover:bg-foreground hover:text-white transition-all text-[15px]'

          return (
            <div key={t.id} className={cardClass}>
              {t.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                  Le plus populaire
                </div>
              )}

              <h3 className="font-serif text-2xl text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-muted mb-6">{t.tagline}</p>

              <div className="flex items-baseline gap-1 mb-2">
                {price === null ? (
                  <span className="font-serif text-[36px] text-foreground">Sur devis</span>
                ) : (
                  <>
                    <span className="font-serif text-[44px] text-foreground">
                      {price.toFixed(2).replace('.', ',')}€
                    </span>
                    <span className="text-sm text-muted">HT /mois</span>
                  </>
                )}
              </div>
              {annual && t.priceAnnualTotalHt !== null && (
                <p className="text-xs text-muted/60 mb-6">
                  {t.priceAnnualTotalHt}€ HT facturé annuellement
                </p>
              )}
              {!annual && price !== null && (
                <p className="text-xs text-muted/60 mb-6">Sans engagement</p>
              )}
              {price === null && <p className="text-xs text-muted/60 mb-6">Tarification sur mesure</p>}

              <p className="text-[14px] text-muted leading-relaxed mb-6">{t.description}</p>

              <ul className="space-y-2.5 mb-8">
                {t.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-foreground">
                    <Check className="w-4 h-4 text-accent-dark shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={t.cta.href} className={ctaClass}>
                {t.cta.label}
              </Link>
              {t.highlighted && (
                <p className="text-xs text-muted/60 text-center mt-3">
                  Aucune carte bancaire requise
                </p>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
```

- [ ] **Step 2 : build**

```bash
npm run build
```

Attendu : passe (la page `/tarifs` va encore référencer `PricingToggle` qu'on supprime en Task 9 — on corrigera alors).

- [ ] **Step 3 : commit**

```bash
git add src/components/public/pricing-cards.tsx
git commit -m "feat(tarifs): PricingCards component with 3 tiers + sticky toggle"
```

---

### Task 8 : créer `PricingComparisonTable` component

**Files:**
- Create: `src/components/public/pricing-comparison-table.tsx`

- [ ] **Step 1 : écrire le composant**

```tsx
import { Check, X } from 'lucide-react'

type Row = {
  label: string
  essentiel: boolean | string
  pro: boolean | string
  premium: boolean | string
}

const ROWS: Row[] = [
  { label: 'Plats et catégories illimités', essentiel: true, pro: true, premium: true },
  { label: 'QR code personnalisé', essentiel: true, pro: true, premium: true },
  { label: 'Langues', essentiel: '2 (FR+EN)', pro: '3', premium: '3+' },
  { label: 'Allergènes conformes INCO', essentiel: true, pro: true, premium: true },
  { label: 'Import IA (PDF/photo)', essentiel: true, pro: true, premium: true },
  { label: 'Mises à jour temps réel', essentiel: true, pro: true, premium: true },
  { label: 'Menu du jour', essentiel: 'Basique', pro: 'Avancé', premium: 'Avancé' },
  { label: 'Promotions programmables', essentiel: false, pro: true, premium: true },
  { label: 'Filtrage avis Google', essentiel: false, pro: true, premium: true },
  { label: 'Cartes fidélité Wallet', essentiel: false, pro: true, premium: true },
  { label: 'Géolocalisation Wallet', essentiel: false, pro: false, premium: true },
  { label: 'Multi-établissements', essentiel: false, pro: false, premium: true },
  { label: 'Statistiques', essentiel: false, pro: true, premium: true },
  { label: 'Support', essentiel: 'Email', pro: 'WhatsApp 9h-19h', premium: '7j/7 + Account manager' },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-accent/10">
        <Check className="w-3 h-3 text-accent-dark" />
      </span>
    )
  if (value === false) return <X className="w-4 h-4 text-muted/40" />
  return <span className="text-[13px] text-foreground">{value}</span>
}

export function PricingComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead className="sticky top-[140px] bg-background z-30 border-b border-border">
          <tr>
            <th className="py-4 pr-4 text-[13px] font-medium tracking-[0.08em] uppercase text-muted">
              Fonctionnalité
            </th>
            <th className="py-4 px-4 text-center text-[13px] font-medium text-foreground">Essentiel</th>
            <th className="py-4 px-4 text-center text-[13px] font-medium text-primary">Pro</th>
            <th className="py-4 px-4 text-center text-[13px] font-medium text-foreground">Premium</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b border-border/40">
              <td className="py-3 pr-4 text-[14px] text-foreground">{r.label}</td>
              <td className="py-3 px-4 text-center"><Cell value={r.essentiel} /></td>
              <td className="py-3 px-4 text-center"><Cell value={r.pro} /></td>
              <td className="py-3 px-4 text-center"><Cell value={r.premium} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2 : build**

```bash
npm run build
```

- [ ] **Step 3 : commit**

```bash
git add src/components/public/pricing-comparison-table.tsx
git commit -m "feat(tarifs): comparison table component with sticky header"
```

---

### Task 9 : refondre la page `/tarifs`

**Files:**
- Modify: `src/app/(public)/tarifs/page.tsx`
- Create: `src/app/(public)/tarifs/faqs.ts`

_Note d'ordonnancement : `pricing-toggle.tsx` est aussi utilisé par la homepage. On ne le supprime qu'en Task 11, une fois la homepage migrée._

- [ ] **Step 1 : créer le fichier FAQs**

Créer `src/app/(public)/tarifs/faqs.ts` :

```typescript
export const FAQS = [
  {
    q: 'Puis-je changer de formule à tout moment ?',
    a: 'Oui, à la hausse comme à la baisse, sans frais. Le changement est effectif immédiatement depuis votre tableau de bord.',
  },
  {
    q: 'Y a-t-il un engagement ?',
    a: 'Non. Sans engagement, résiliable à tout moment depuis votre tableau de bord.',
  },
  {
    q: 'Comment fonctionne l\'essai gratuit ?',
    a: '14 jours gratuits sur le tier Pro. Aucune carte bancaire requise. À la fin, vous choisissez de continuer (Essentiel ou Pro) ou d\'arrêter.',
  },
  {
    q: 'Pourquoi les prix sont en HT ?',
    a: 'Parce que vous récupérez la TVA. En TTC, ça donne : Essentiel 22,80 €, Pro 46,80 €.',
  },
  {
    q: 'Comment fonctionne le filtrage des avis Google ?',
    a: 'À la fin du repas, vos clients reçoivent une demande d\'avis. Si la note est de 5★, ils sont redirigés vers votre fiche Google pour publier l\'avis publiquement. Si la note est inférieure, l\'avis reste interne et vous recevez une notification pour pouvoir réagir directement.',
  },
  {
    q: 'Que comprennent les cartes de fidélité Wallet ?',
    a: 'Vos clients ajoutent leur carte de fidélité à Apple Wallet ou Google Wallet en un scan. La carte se met à jour automatiquement (tampons, récompenses) et apparaît sur l\'écran d\'accueil de leur téléphone.',
  },
  {
    q: 'Je suis seul, je n\'ai qu\'un restaurant. Quelle formule choisir ?',
    a: 'Essentiel si vous voulez juste digitaliser votre carte. Pro dès que vous voulez fidéliser vos clients ou améliorer votre note Google.',
  },
  {
    q: 'Le tarif inclut-il l\'impression du QR code ?',
    a: 'Le QR code est généré et téléchargeable depuis votre dashboard. L\'impression est à votre charge (ou nous pouvons vous mettre en relation avec un imprimeur partenaire).',
  },
]
```

- [ ] **Step 2 : réécrire `src/app/(public)/tarifs/page.tsx`**

```tsx
import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'
import { PricingCards } from '@/components/public/pricing-cards'
import { PricingComparisonTable } from '@/components/public/pricing-comparison-table'
import { JsonLd, pricingJsonLd, breadcrumbJsonLd } from '@/components/seo/json-ld'
import { CTALink } from '@/components/public/cta-link'
import { FAQS } from './faqs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarifs — MonTablo | Menu digital pour restaurants',
  description:
    '3 formules claires : Essentiel 19€ HT/mois, Pro 39€ HT/mois, Premium sur devis. 14 jours d\'essai gratuit sur Pro, sans carte bancaire.',
  openGraph: {
    title: 'Tarifs MonTablo — 3 formules, sans engagement',
    description:
      'Essentiel 19€, Pro 39€, Premium sur devis. 14 jours d\'essai gratuit sur Pro.',
  },
}

export default function TarifsPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={pricingJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Accueil', url: base },
          { name: 'Tarifs', url: `${base}/tarifs` },
        ])}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1120px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl text-primary tracking-tight">MonTablo</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/fonctionnalites" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Fonctionnalités</Link>
            <Link href="/faq" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">FAQ</Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors hidden sm:block">Connexion</Link>
            <CTALink
              href="/signup"
              label="tarifs_nav"
              className="text-sm font-medium bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-light transition-all hover:shadow-lg hover:shadow-primary/15"
            >
              Essai gratuit
            </CTALink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-[120px] pb-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-3">
          Un tarif clair. Sans engagement.
        </h1>
        <p className="text-lg text-muted max-w-lg mx-auto">
          14 jours d&apos;essai gratuits sur Pro. Sans carte bancaire.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-[1120px] mx-auto px-6 pb-20">
        <PricingCards />
      </section>

      {/* Comparison table */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-[1120px] mx-auto px-6 py-20">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">
            Comparatif détaillé
          </h2>
          <PricingComparisonTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[780px] mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-foreground text-center mb-12">
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.q} className="border-b border-border/50 pb-4 group">
              <summary className="font-medium text-foreground cursor-pointer py-2 flex items-center justify-between">
                {faq.q}
                <span className="text-muted group-open:rotate-45 transition-transform text-xl leading-none">+</span>
              </summary>
              <p className="text-[15px] text-muted leading-relaxed mt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-[18px] h-[18px] text-primary" />
              <span className="font-serif text-[15px] text-primary">MonTablo</span>
            </div>
            <p className="text-xs text-muted/60">
              &copy; {new Date().getFullYear()} MonTablo. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted/50">
            <Link href="/mentions-legales" className="hover:text-muted transition-colors">Mentions légales</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cgu" className="hover:text-muted transition-colors">CGU</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/confidentialite" className="hover:text-muted transition-colors">Confidentialité</Link>
            <span className="hidden sm:inline">&middot;</span>
            <Link href="/cookies" className="hover:text-muted transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 3 : build + dev + vérif visuelle**

```bash
npm run build && npm run dev
```

Ouvrir `http://localhost:3000/tarifs` et vérifier :
- 3 colonnes visibles sur desktop, stack vertical sur mobile
- Pro mis en avant avec badge « Le plus populaire »
- Toggle Mensuel/Annuel change les prix (19→17,10, 39→35,10)
- Premium affiche « Sur devis »
- Tableau comparatif scrollable horizontalement sur mobile
- FAQ se déplie en accordéon

- [ ] **Step 4 : commit**

```bash
git add src/app/(public)/tarifs/page.tsx src/app/(public)/tarifs/faqs.ts
git commit -m "feat(tarifs): refonte complète avec 3 tiers + tableau comparatif + 8 FAQ"
```

---

### Task 10 : mettre à jour `pricingJsonLd`

**Files:**
- Modify: `src/components/seo/json-ld.tsx:63-93`

- [ ] **Step 1 : remplacer la fonction `pricingJsonLd`**

```typescript
export function pricingJsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MonTablo',
    url: `${base}/tarifs`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        name: 'Essentiel — Mensuel',
        price: '19.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '19.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1M',
          valueAddedTaxIncluded: false,
        },
        description: 'Essentiel mensuel — 19€ HT/mois, sans engagement',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Essentiel — Annuel',
        price: '205.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '205.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1Y',
          valueAddedTaxIncluded: false,
        },
        description: 'Essentiel annuel — 205€ HT/an (équivalent 17,10€/mois, -10%)',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro — Mensuel',
        price: '39.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '39.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1M',
          valueAddedTaxIncluded: false,
        },
        description: 'Pro mensuel — 39€ HT/mois, 14 jours d\'essai gratuit',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Pro — Annuel',
        price: '421.00',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '421.00',
          priceCurrency: 'EUR',
          billingIncrement: 'P1Y',
          valueAddedTaxIncluded: false,
        },
        description: 'Pro annuel — 421€ HT/an (équivalent 35,10€/mois, -10%)',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Premium — Sur devis',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
        },
        description: 'Premium pour groupes et chaînes — tarification sur mesure',
        availability: 'https://schema.org/InStock',
      },
    ],
  }
}
```

- [ ] **Step 2 : build**

```bash
npm run build
```

- [ ] **Step 3 : valider le JSON-LD via rich-results test**

Une fois déployé en preview, coller l'URL dans https://search.google.com/test/rich-results. Attendu : 5 offers détectées sans warning.

- [ ] **Step 4 : commit**

```bash
git add src/components/seo/json-ld.tsx
git commit -m "feat(seo): pricingJsonLd expose 5 offers (3 tiers × cycles)"
```

---

# Phase 3 — Homepage mini-pricing

### Task 11 : remplacer le bloc pricing sur la homepage

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1 : localiser le bloc pricing actuel**

Lire `src/app/(public)/page.tsx` et repérer le bloc qui utilise `<PricingToggle features={pricingFeatures} />`. Il se trouve dans la section pricing (après `steps` et `benefits`).

- [ ] **Step 2 : retirer l'import et la constante**

Retirer ces lignes :

```typescript
import { PricingToggle } from '@/components/public/pricing-toggle'
// ...
const pricingFeatures = [
  'Plats et catégories illimités',
  'Menu du jour et promotions',
  'QR code personnalisé',
  'Bilingue FR / EN',
  'Mises à jour en temps réel',
]
```

Ajouter :

```typescript
import { TIERS } from '@/lib/pricing'
```

- [ ] **Step 3 : remplacer la section pricing**

Remplacer la section entière qui contenait `<PricingToggle />` par :

```tsx
      {/* Pricing mini */}
      <section className="max-w-[1120px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
            3 formules, sans engagement
          </h2>
          <p className="text-muted max-w-md mx-auto">
            À partir de 39€/mois HT pour la formule Pro recommandée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {(['essentiel', 'pro', 'premium'] as const).map((key) => {
            const t = TIERS[key]
            return (
              <div
                key={t.id}
                className={`bg-white rounded-2xl p-6 border ${
                  t.highlighted ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'
                }`}
              >
                <h3 className="font-serif text-xl text-foreground mb-1">{t.name}</h3>
                <p className="text-xs text-muted mb-3">{t.tagline}</p>
                {t.priceMonthlyHt === null ? (
                  <p className="font-serif text-2xl text-foreground mb-0">Sur devis</p>
                ) : (
                  <p className="mb-0">
                    <span className="font-serif text-3xl text-foreground">
                      {t.priceMonthlyHt}€
                    </span>
                    <span className="text-sm text-muted"> HT/mois</span>
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tarifs"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Voir tous les détails <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
```

- [ ] **Step 4 : build + vérif visuelle**

```bash
npm run build && npm run dev
```

Ouvrir `http://localhost:3000` et vérifier : les 3 tiers apparaissent en mini-cards, le CTA « Voir tous les détails » pointe vers `/tarifs`.

- [ ] **Step 5 : supprimer l'ancien composant `pricing-toggle.tsx`**

Plus aucun fichier ne l'importe (vérifier via `grep -r "pricing-toggle"` — seul le fichier lui-même doit apparaître).

```bash
rm src/components/public/pricing-toggle.tsx
```

Re-build pour confirmer :

```bash
npm run build
```

- [ ] **Step 6 : commit**

```bash
git add src/app/(public)/page.tsx
git rm src/components/public/pricing-toggle.tsx
git commit -m "feat(home): remplacer bloc pricing unique par résumé 3 tiers + nettoyer pricing-toggle"
```

---

# Phase 4 — Dashboard /abonnement

### Task 12 : créer la page `/dashboard/abonnement`

**Files:**
- Create: `src/app/dashboard/abonnement/page.tsx`
- Create: `src/app/dashboard/abonnement/abonnement-client.tsx`

- [ ] **Step 1 : créer la page serveur**

```tsx
// src/app/dashboard/abonnement/page.tsx
import { getRestaurant } from '@/lib/supabase/cached'
import { redirect } from 'next/navigation'
import { AbonnementClient } from './abonnement-client'

export default async function AbonnementPage() {
  const restaurant = await getRestaurant()
  if (!restaurant) redirect('/signup')

  return (
    <div>
      <h1 className="font-serif text-3xl text-foreground mb-2">Abonnement</h1>
      <p className="text-muted mb-8">
        Gérez votre formule, changez de plan ou résiliez à tout moment.
      </p>
      <AbonnementClient restaurant={restaurant} />
    </div>
  )
}
```

- [ ] **Step 2 : créer le client**

```tsx
// src/app/dashboard/abonnement/abonnement-client.tsx
'use client'

import { useState } from 'react'
import type { Restaurant } from '@/types/database'
import { TIERS, type Tier, type BillingCycle } from '@/lib/pricing'
import { Check, Loader2 } from 'lucide-react'

export function AbonnementClient({ restaurant }: { restaurant: Restaurant }) {
  const [cycle, setCycle] = useState<BillingCycle>(restaurant.billing_cycle ?? 'monthly')
  const [loadingTier, setLoadingTier] = useState<Tier | null>(null)

  async function subscribe(tier: Tier) {
    setLoadingTier(tier)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billing_cycle: cycle }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setLoadingTier(null)
    }
  }

  const currentTier = restaurant.tier
  const isTrialing = restaurant.subscription_status === 'trialing'
  const isActive = restaurant.subscription_status === 'active'
  const trialDaysLeft = restaurant.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(restaurant.trial_ends_at).getTime() - Date.now()) / 86400000))
    : 0

  return (
    <div className="max-w-4xl space-y-6">
      {/* État actuel */}
      <div className="bg-white rounded-xl border border-border p-6">
        <p className="text-sm font-medium tracking-wide uppercase text-muted mb-2">Formule actuelle</p>
        {isTrialing && (
          <>
            <p className="font-serif text-2xl text-foreground">Essai Pro</p>
            <p className="text-sm text-muted">
              Il vous reste <strong>{trialDaysLeft} jour{trialDaysLeft > 1 ? 's' : ''}</strong>. Choisissez une formule ci-dessous avant la fin de l&apos;essai.
            </p>
          </>
        )}
        {isActive && currentTier && (
          <>
            <p className="font-serif text-2xl text-foreground">
              {TIERS[currentTier].name}{' '}
              <span className="text-base text-muted">({restaurant.billing_cycle === 'annual' ? 'Annuel' : 'Mensuel'})</span>
            </p>
            {restaurant.is_launch_offer && (
              <p className="text-sm text-green-700 mt-1">
                🎉 Tarif lancement verrouillé à {restaurant.launch_offer_locked_price}€ HT/mois à vie
              </p>
            )}
          </>
        )}
      </div>

      {/* Toggle cycle */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 bg-background border border-border rounded-full p-1.5">
          <button
            onClick={() => setCycle('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              cycle === 'monthly' ? 'bg-white text-foreground shadow-sm' : 'text-muted'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setCycle('annual')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              cycle === 'annual' ? 'bg-white text-foreground shadow-sm' : 'text-muted'
            }`}
          >
            Annuel
            <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">-10%</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['essentiel', 'pro'] as const).map((key) => {
          const t = TIERS[key]
          const price = cycle === 'annual' ? t.priceAnnualHt! : t.priceMonthlyHt!
          const isCurrent = isActive && currentTier === key && restaurant.billing_cycle === cycle
          return (
            <div
              key={t.id}
              className={`bg-white rounded-xl p-6 border ${
                t.highlighted ? 'border-primary' : 'border-border'
              }`}
            >
              <h3 className="font-serif text-xl text-foreground mb-1">{t.name}</h3>
              <p className="text-sm text-muted mb-4">{t.tagline}</p>
              <p className="mb-4">
                <span className="font-serif text-3xl text-foreground">
                  {price.toFixed(2).replace('.', ',')}€
                </span>
                <span className="text-sm text-muted"> HT/mois</span>
              </p>
              <ul className="space-y-2 mb-5 text-[13px] text-foreground">
                {t.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-dark shrink-0 mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => subscribe(key)}
                disabled={loadingTier !== null || isCurrent}
                className={`w-full py-2.5 rounded-full font-medium text-sm transition-all ${
                  isCurrent
                    ? 'bg-background text-muted cursor-default'
                    : t.highlighted
                      ? 'bg-primary text-white hover:bg-primary-light'
                      : 'border border-foreground text-foreground hover:bg-foreground hover:text-white'
                }`}
              >
                {loadingTier === key ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : isCurrent ? (
                  'Formule actuelle'
                ) : isActive ? (
                  `Passer à ${t.name}`
                ) : (
                  `Choisir ${t.name}`
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Premium */}
      <div className="bg-background rounded-xl border border-dashed border-border p-6 text-center">
        <h3 className="font-serif text-xl text-foreground mb-1">Besoin de plus ?</h3>
        <p className="text-sm text-muted mb-4">
          Multi-établissements, géolocalisation Wallet, account manager dédié.
        </p>
        <a
          href="/contact?sujet=premium"
          className="inline-block border border-foreground text-foreground font-medium px-6 py-2.5 rounded-full text-sm hover:bg-foreground hover:text-white transition-all"
        >
          Demander un devis Premium
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 3 : build + dev**

```bash
npm run build && npm run dev
```

Ouvrir `http://localhost:3000/dashboard/abonnement` (authentifié). Vérifier :
- État actuel (« Essai Pro — X jours »)
- Toggle Mensuel/Annuel fonctionne
- Bouton « Choisir Pro » redirige vers Stripe Checkout

- [ ] **Step 4 : commit**

```bash
git add src/app/dashboard/abonnement/
git commit -m "feat(dashboard): nouvelle page /dashboard/abonnement avec upgrade/downgrade"
```

---

### Task 13 : retirer la section abonnement de `/dashboard/settings`

**Files:**
- Modify: `src/components/dashboard/settings-form.tsx`

- [ ] **Step 1 : identifier les éléments à retirer**

Lire le fichier et repérer :
- Le state `billingLoading`, `billingPlan`
- La fonction `handleSubscribe`
- Le bloc JSX « Abonnement » (probablement une section avec `<CreditCard />` icon)
- L'import `CreditCard` de lucide si devenu inutile

- [ ] **Step 2 : supprimer**

Retirer les 3 states, la fonction, et le bloc JSX. Laisser uniquement : restaurant info, adresse, couleurs, logo/cover, Google review URL, suppression de compte.

Ajouter en remplacement, juste après le `<h1>Paramètres</h1>`, un lien discret vers `/dashboard/abonnement` :

```tsx
<div className="bg-white rounded-xl border border-border p-4 mb-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="font-medium text-foreground">Abonnement</p>
      <p className="text-sm text-muted">Gérez votre formule depuis la page dédiée.</p>
    </div>
    <Link href="/dashboard/abonnement" className="text-sm font-medium text-primary hover:underline">
      Voir mon abonnement →
    </Link>
  </div>
</div>
```

(Importer `Link` si pas déjà fait.)

- [ ] **Step 3 : build**

```bash
npm run build
```

- [ ] **Step 4 : commit**

```bash
git add src/components/dashboard/settings-form.tsx
git commit -m "refactor(dashboard): retirer section abonnement de settings, déplacer vers /dashboard/abonnement"
```

---

### Task 14 : créer `TrialBanner` et la monter dans le layout

**Files:**
- Create: `src/components/dashboard/trial-banner.tsx`
- Modify: `src/app/dashboard/layout.tsx`

- [ ] **Step 1 : créer le composant**

```tsx
// src/components/dashboard/trial-banner.tsx
import Link from 'next/link'
import type { Restaurant } from '@/types/database'

export function TrialBanner({ restaurant }: { restaurant: Restaurant }) {
  if (restaurant.subscription_status !== 'trialing') return null

  const daysLeft = restaurant.trial_ends_at
    ? Math.max(0, Math.ceil((new Date(restaurant.trial_ends_at).getTime() - Date.now()) / 86400000))
    : 0

  const urgent = daysLeft <= 3
  const bg = urgent ? 'bg-amber-50 border-amber-200' : 'bg-accent/10 border-accent/20'
  const text = urgent ? 'text-amber-900' : 'text-foreground'

  return (
    <div className={`${bg} border rounded-xl px-4 py-3 mb-6 flex items-center justify-between gap-3`}>
      <p className={`text-sm ${text}`}>
        <strong>Essai Pro</strong> — il vous reste <strong>{daysLeft} jour{daysLeft > 1 ? 's' : ''}</strong>
        {urgent ? '. Choisissez une formule pour continuer.' : '.'}
      </p>
      <Link
        href="/dashboard/abonnement"
        className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
      >
        Choisir mon plan →
      </Link>
    </div>
  )
}
```

- [ ] **Step 2 : monter dans le layout**

Lire `src/app/dashboard/layout.tsx` pour trouver l'endroit où le contenu (`{children}`) est rendu. Ajouter `<TrialBanner restaurant={restaurant} />` juste au-dessus.

Exemple (à adapter selon le layout existant) :

```tsx
import { TrialBanner } from '@/components/dashboard/trial-banner'
import { getRestaurant } from '@/lib/supabase/cached'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const restaurant = await getRestaurant()
  // ... existing sidebar etc
  return (
    <div className="...">
      {/* sidebar existant */}
      <main className="...">
        {restaurant && <TrialBanner restaurant={restaurant} />}
        {children}
      </main>
    </div>
  )
}
```

Si le layout n'a pas accès au restaurant actuellement, injecter via un Server Component.

- [ ] **Step 3 : build + dev**

```bash
npm run build && npm run dev
```

Ouvrir `/dashboard` avec un compte en trialing. Vérifier que la bannière apparaît ; tester avec un `trial_ends_at` proche (<=3 jours) via `UPDATE` direct pour voir le style urgent.

- [ ] **Step 4 : commit**

```bash
git add src/components/dashboard/trial-banner.tsx src/app/dashboard/layout.tsx
git commit -m "feat(dashboard): bannière essai Pro en haut du dashboard"
```

---

# Phase 5 — Emails onboarding + Cron

### Task 15 : mettre à jour l'email `welcome` (mentionner « Essai Pro 14 jours »)

**Files:**
- Modify: `src/lib/email-templates.ts` (fonction `welcome`)

- [ ] **Step 1 : localiser et adapter**

Lire `src/lib/email-templates.ts`, trouver `export function welcome(...)`. Ajouter une ligne dans le corps de l'email qui clarifie :

> « Vous démarrez avec **14 jours d'essai Pro offerts** — toutes les fonctionnalités débloquées. À la fin, vous choisissez Essentiel (19€/mois HT), Pro (39€/mois HT) ou d'arrêter. »

Insérer cette phrase juste avant le bouton CTA vers le dashboard.

- [ ] **Step 2 : build**

```bash
npm run build
```

- [ ] **Step 3 : commit**

```bash
git add src/lib/email-templates.ts
git commit -m "feat(email): welcome explicite l'essai Pro 14 jours et les tiers"
```

---

### Task 16 : ajouter `trialChoosePlan` (J+10) et adapter `trialExpired`

**Files:**
- Modify: `src/lib/email-templates.ts`

- [ ] **Step 1 : ajouter la fonction `trialChoosePlan`**

À la fin de `src/lib/email-templates.ts`, avant l'export final :

```typescript
export function trialChoosePlan(restaurantName: string, dashboardUrl: string) {
  const content = `
    <p style="font-size:16px;color:${BRAND.text};margin:0 0 16px">Bonjour,</p>
    <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
      Plus que <strong>4 jours</strong> avant la fin de votre essai gratuit pour <strong>${restaurantName}</strong>.
    </p>
    <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
      C'est le moment de choisir la formule qui vous convient :
    </p>
    <ul style="font-size:15px;color:${BRAND.text};line-height:1.8;margin:0 0 16px;padding-left:20px">
      <li><strong>Essentiel — 19€ HT/mois</strong> : menu digital + QR code + allergènes INCO</li>
      <li><strong>Pro — 39€ HT/mois</strong> : Essentiel + avis Google filtrés + cartes fidélité Wallet</li>
    </ul>
    <p style="font-size:14px;color:${BRAND.muted};line-height:1.6;margin:0 0 16px">
      Besoin de multi-établissements ou géolocalisation ? Répondez à cet email pour un devis Premium.
    </p>
    ${button('Choisir mon plan', `${dashboardUrl}/abonnement`)}
  `
  return {
    subject: `Plus que 4 jours pour choisir votre formule MonTablo`,
    html: layout(content),
  }
}
```

- [ ] **Step 2 : adapter `trialExpired`**

Modifier la fonction `trialExpired` existante pour pointer vers `/dashboard/abonnement` et proposer Essentiel OU Pro :

```typescript
export function trialExpired(restaurantName: string, dashboardUrl: string) {
  const content = `
    <p style="font-size:16px;color:${BRAND.text};margin:0 0 16px">Bonjour,</p>
    <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
      Votre essai gratuit pour <strong>${restaurantName}</strong> est terminé.
      Votre menu est toujours visible par vos clients, mais l'édition est désactivée.
    </p>
    <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 16px">
      Choisissez une formule pour retrouver l'accès complet :
    </p>
    <ul style="font-size:15px;color:${BRAND.text};line-height:1.8;margin:0 0 24px;padding-left:20px">
      <li><strong>Essentiel</strong> — 19€ HT/mois</li>
      <li><strong>Pro</strong> — 39€ HT/mois</li>
    </ul>
    ${button('Choisir ma formule', `${dashboardUrl}/abonnement`)}
  `
  return {
    subject: `Votre essai MonTablo est terminé — choisissez votre formule`,
    html: layout(content),
  }
}
```

- [ ] **Step 3 : build**

```bash
npm run build
```

- [ ] **Step 4 : commit**

```bash
git add src/lib/email-templates.ts
git commit -m "feat(email): ajout trialChoosePlan (J+10) + trialExpired propose Essentiel ou Pro"
```

---

### Task 17 : mettre à jour le cron trial-expiry pour envoyer J+10

**Files:**
- Modify: `src/app/api/cron/trial-expiry/route.ts`

- [ ] **Step 1 : enrichir la logique**

Le cron actuel gère `3d`, `1d`, `expired`. On ajoute `choose_plan` à J+10 (= 4 jours avant la fin).

Remplacer la section qui détermine `emailType` :

```typescript
    // Determine which email to send
    let emailType: 'choose_plan' | '3d' | '1d' | 'expired' | null = null

    if (daysLeft <= 0 && !r.trial_expired_sent) {
      emailType = 'expired'
    } else if (daysLeft === 1 && !r.trial_reminder_1d_sent) {
      emailType = '1d'
    } else if (daysLeft <= 3 && daysLeft > 1 && !r.trial_reminder_3d_sent) {
      emailType = '3d'
    } else if (daysLeft === 4 && !r.trial_choose_plan_sent) {
      emailType = 'choose_plan'
    }
```

Dans le SELECT, ajouter `trial_choose_plan_sent` à la liste des colonnes :

```typescript
    .select('id, name, owner_id, trial_ends_at, trial_reminder_3d_sent, trial_reminder_1d_sent, trial_expired_sent, trial_choose_plan_sent')
```

Dans le switch sur `emailType` (construction de l'email), ajouter le cas `choose_plan` :

```typescript
    const email =
      emailType === 'expired'
        ? trialExpired(r.name, dashboardUrl)
        : emailType === 'choose_plan'
          ? trialChoosePlan(r.name, dashboardUrl)
          : trialExpiryWarning(r.name, daysLeft, dashboardUrl)
```

Dans la mise à jour de flag, ajouter le cas :

```typescript
    const updateField =
      emailType === 'expired'
        ? { trial_expired_sent: true }
        : emailType === '1d'
          ? { trial_reminder_1d_sent: true }
          : emailType === '3d'
            ? { trial_reminder_3d_sent: true }
            : { trial_choose_plan_sent: true }
```

Ajouter l'import en haut du fichier :

```typescript
import { trialExpiryWarning, trialExpired, trialChoosePlan } from '@/lib/email-templates'
```

- [ ] **Step 2 : build**

```bash
npm run build
```

- [ ] **Step 3 : test manuel (optionnel, requiert CRON_SECRET)**

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/trial-expiry
```

Attendu : JSON `{processed: N, sent: M, details: [...]}`. Inspecter le champ `details` pour vérifier les codes `OK: xxx (choose_plan)`.

- [ ] **Step 4 : commit**

```bash
git add src/app/api/cron/trial-expiry/route.ts
git commit -m "feat(cron): envoyer email choose_plan à J+10 (4 jours avant fin)"
```

---

# Phase 6 — Vérification finale + Deploy

### Task 18 : vérification complète avant merge

**Files:** aucune modification — checklist de vérif.

- [ ] **Step 1 : build propre**

```bash
npm run build && npm run lint
```

Attendu : `npm run build` passe sans erreur ; `npm run lint` sans warning (ou seulement des warnings préexistants non liés).

- [ ] **Step 2 : checklist manuelle en local (`npm run dev`)**

- [ ] `/tarifs` — 3 colonnes, toggle mensuel/annuel change les prix, Premium affiche « Sur devis »
- [ ] `/tarifs` — tableau comparatif affiche 14 lignes + header sticky
- [ ] `/tarifs` — FAQ déplie 8 questions
- [ ] `/` — bloc pricing = 3 mini-cards + lien vers `/tarifs`
- [ ] `/dashboard/abonnement` — état « Essai Pro », toggle cycle, bouton subscribe redirige Stripe
- [ ] `/dashboard/settings` — plus de section abonnement, lien vers `/dashboard/abonnement`
- [ ] `/dashboard` (trialing) — bannière « Essai Pro X jours »

- [ ] **Step 3 : vérif Stripe Checkout**

Depuis `/dashboard/abonnement`, cliquer « Choisir Pro » → Stripe Checkout s'ouvre avec :
- Prix `39,00 €` (ou `421,00 €` pour annuel)
- TVA auto ajoutée (20 %)
- Champ « Ajouter un code promotionnel » visible (saisir `LANCEMENT_GENEVOIS`, vérifier que le prix passe à `24,00 €`)

- [ ] **Step 4 : merger la branche feature**

```bash
git checkout main
git pull
git merge --no-ff <feature-branch>
git push origin main
```

Vercel déploie automatiquement. Vérifier le déploiement via :

```bash
vercel ls --prod
```

- [ ] **Step 5 : sanity check prod**

- Ouvrir https://www.montablo.com/tarifs → 3 colonnes OK
- Ouvrir https://search.google.com/test/rich-results?url=https://www.montablo.com/tarifs → 5 offers détectées

- [ ] **Step 6 : commit doc release**

Créer `docs/features/pricing-3-tiers.md` (complété avec les price IDs réels) s'il ne l'est pas déjà, et commit.

```bash
git add docs/features/pricing-3-tiers.md
git commit -m "docs: release notes pour pricing 3 tiers"
git push origin main
```

---

## Couverture de la spec — self-check

| Spec | Task(s) |
|---|---|
| Schéma DB (tier, billing_cycle, is_launch_offer, launch_offer_locked_price) | Task 1, 2 |
| 4 produits/prix Stripe + coupon LANCEMENT_GENEVOIS | Task 4 |
| Page /tarifs : hero, toggle sticky, 3 colonnes, tableau comparatif, FAQ 8 Q | Task 7, 8, 9 |
| JSON-LD Product/Offer avec 3 tiers | Task 10 |
| Homepage : résumé 3 tiers + lien /tarifs | Task 11 |
| Dashboard /abonnement : upgrade/downgrade self-service | Task 12 |
| Retrait section abonnement de /settings | Task 13 |
| Bannière « Essai Pro X jours » dans dashboard | Task 14 |
| Email welcome mentionne essai Pro 14j | Task 15 |
| Email J+10 choose plan | Task 16, 17 |
| Email J+14 trialExpired adapté | Task 16 |
| Ne pas exposer LANCEMENT_GENEVOIS publiquement | Respecté : coupon saisi par l'utilisateur via `allow_promotion_codes: true`, non affiché |
| Ne pas afficher prix Premium | Task 7 (affichage « Sur devis ») |
| Pas de tier gratuit | Respecté partout |
| HT partout, pas de « À partir de 19€ » mis en avant homepage | Task 11 met « À partir de 39€/mois HT pour Pro recommandée » |
