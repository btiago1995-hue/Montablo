# MonTablo — Spec MVP

**Nome:** MonTablo
**Domínio:** montablo.com
**Branding:** "Tablō" no logo, "MonTablo" em URLs e comunicação

## O que é
Menu digital interativo para restaurantes. O cliente scan um QR code na mesa e vê o menu no telemóvel. O restaurador gere tudo num backoffice web.

**Mercado:** Haute-Savoie (França) + Suíça romande
**Preço:** €29/mês flat, sem comissões
**Stack:** Next.js 14 (App Router) + Supabase + Vercel + Stripe
**Língua da app:** Francês (menus multilingue FR/EN)

---

## Arquitetura

```
┌─────────────────────────────────────┐
│           Vercel (Next.js)          │
│                                     │
│  /menu/[slug]     → Menu público    │
│  /dashboard/*     → Backoffice      │
│  /api/*           → API routes      │
│  /                → Landing page    │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │  Supabase   │
        │  - Auth     │
        │  - Database │
        │  - Storage  │
        │  (images)   │
        └─────────────┘
               │
        ┌──────┴──────┐
        │   Stripe    │
        │  (billing)  │
        └─────────────┘
```

---

## Funcionalidades MVP

### Menu público (client-side)
- Acesso via QR code → `/menu/[restaurant-slug]`
- Categorias com scroll horizontal ou vertical
- Cada prato: nome, descrição, preço, foto, badges (nouveau, promotion, végétarien, etc.)
- Toggle "Indisponible" — prato aparece greyed out ou escondido (config do restaurador)
- Promoções: banner ou badge com preço barrado + novo preço
- Menu du jour: secção especial com data de validade automática
- Multilingue: FR por defeito, toggle EN (para turistas)
- Zero login, zero download, zero fricção
- Branding do restaurante: logo, cores, cover photo

### Backoffice restaurador
- Auth: email + password (Supabase Auth)
- Onboarding: nome restaurante, logo, cores, slug personalizado
- CRUD categorias (ex: Entrées, Plats, Desserts, Boissons)
- CRUD pratos:
  - Nome (FR + EN)
  - Description (FR + EN)
  - Prix (€)
  - Photo (upload → Supabase Storage, resize automático)
  - Catégorie
  - Badges/tags (végétarien, vegan, sans gluten, épicé, maison, nouveau)
  - Disponibilité (toggle on/off instant)
  - Ordre de affichage (drag & drop)
- Promotions:
  - Prix barré + nouveau prix
  - Date début / fin (automático)
  - Badge "Promotion" no menu
- Menu du jour:
  - Secção especial
  - Date de validade (desaparece automaticamente)
- QR Code:
  - Geração automática do QR
  - Download PNG/PDF para imprimir
  - Preview do menu em tempo real
- Paramètres:
  - Nom, logo, couleurs, slug
  - Comportement "indisponible" (greyed out vs. caché)
  - Langues activées

### Landing page
- Proposta de valor clara
- Demo interativa (menu exemplo)
- Pricing (€29/mês)
- CTA → signup
- Testemunhos (quando houver)

### Billing (Stripe)
- Trial: 14 dias grátis
- Plano único: €29/mês
- Stripe Checkout para subscrição
- Webhook para ativar/desativar conta
- Portal Stripe para gestão de pagamento

---

## Schema Base de Dados (Supabase/PostgreSQL)

### restaurants
```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  cover_url TEXT,
  primary_color TEXT DEFAULT '#1A1A1A',
  secondary_color TEXT DEFAULT '#D4A574',
  unavailable_behavior TEXT DEFAULT 'greyed_out' CHECK (unavailable_behavior IN ('greyed_out', 'hidden')),
  languages TEXT[] DEFAULT '{fr}',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'inactive')),
  trial_ends_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '14 days',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name_fr TEXT NOT NULL,
  name_en TEXT,
  icon TEXT, -- emoji ou lucide icon name
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### items (pratos)
```sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name_fr TEXT NOT NULL,
  name_en TEXT,
  description_fr TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}', -- végétarien, vegan, sans_gluten, épicé, maison, nouveau
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### promotions
```sql
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  original_price DECIMAL(10,2) NOT NULL,
  promo_price DECIMAL(10,2) NOT NULL,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### daily_menus (menu du jour)
```sql
CREATE TABLE daily_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  title_fr TEXT NOT NULL DEFAULT 'Menu du jour',
  title_en TEXT DEFAULT 'Daily menu',
  description_fr TEXT,
  description_en TEXT,
  price DECIMAL(10,2),
  items_description_fr TEXT, -- texto livre: "Entrée + Plat + Dessert"
  items_description_en TEXT,
  valid_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)
```sql
-- Restaurants: owner pode ler/escrever, público pode ler dados básicos
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner full access" ON restaurants
  FOR ALL USING (owner_id = auth.uid());

CREATE POLICY "Public read for active restaurants" ON restaurants
  FOR SELECT USING (subscription_status IN ('trialing', 'active'));

-- Categories, items, promotions, daily_menus: mesmo padrão
-- Owner full CRUD, público read-only para restaurantes ativos
```

---

## Indexes
```sql
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_items_restaurant ON items(restaurant_id);
CREATE INDEX idx_items_category ON items(category_id);
CREATE INDEX idx_categories_restaurant ON categories(restaurant_id);
CREATE INDEX idx_promotions_item ON promotions(item_id);
CREATE INDEX idx_daily_menus_restaurant_date ON daily_menus(restaurant_id, valid_date);
```

---

## Estrutura de Pastas (Next.js App Router)
```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing page
│   │   └── menu/[slug]/page.tsx        # Menu público
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                  # Sidebar + auth guard
│   │   ├── page.tsx                    # Overview
│   │   ├── menu/page.tsx               # Gestão pratos + categorias
│   │   ├── promotions/page.tsx
│   │   ├── daily-menu/page.tsx
│   │   ├── qr-code/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── stripe/
│       │   ├── checkout/route.ts
│       │   └── webhook/route.ts
│       └── upload/route.ts
├── components/
│   ├── menu/                           # Componentes do menu público
│   ├── dashboard/                      # Componentes do backoffice
│   └── ui/                             # Componentes base (buttons, inputs, etc.)
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── stripe.ts
│   └── utils.ts
└── types/
    └── database.ts                     # Types gerados do Supabase
```

---

## Roadmap MVP (2-3 semanas)

### Semana 1: Backend + Auth
- Setup Supabase (schema, RLS, storage bucket)
- Auth (signup, login, forgot password)
- CRUD API para categorias e pratos
- Upload de imagens (Supabase Storage + resize)
- Stripe integration (checkout, webhook, portal)

### Semana 2: Backoffice
- Dashboard layout (sidebar, responsive)
- Gestão de categorias (criar, editar, reordenar, apagar)
- Gestão de pratos (CRUD completo com upload foto)
- Toggle disponibilidade
- Promoções (criar, agendar)
- Menu du jour
- Geração QR code + download

### Semana 3: Menu público + Landing
- Menu público responsive (mobile-first)
- Multilingue (FR/EN)
- Branding dinâmico (cores, logo)
- Landing page
- Testes finais + deploy

---

## O que NÃO está no MVP
- Pagamento na mesa (commande)
- Sistema de pedidos / cozinha
- Integrações POS
- Reservas
- Analytics avançado
- App nativa
- Multi-établissement (1 conta = 1 restaurante)

Tudo isto é fase 2, só depois de validar que restauradores pagam €29/mês.

---

## Métricas de Sucesso (3 meses)
- 10 restaurantes a pagar → €290/mês
- Taxa de churn < 10%/mês
- Tempo de onboarding < 30 min (restaurador sozinho)
