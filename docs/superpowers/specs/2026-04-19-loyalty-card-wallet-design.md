# Loyalty Card — Apple Wallet & Google Wallet

**Date:** 2026-04-19
**Status:** Approved for implementation

## Problem

Restaurant owners currently pay for physical loyalty card printing, design, and reprinting. Customers lose cards and feel friction carrying them. Montablo eliminates physical loyalty cards entirely — the customer's card lives in Apple Wallet or Google Wallet, always on their phone, never lost.

**Value proposition:** *"Para de imprimir cartões. Os teus clientes têm o cartão no telemóvel — sempre com eles, nunca se perde."*

## Approach

**passkit-generator** (npm) for Apple Wallet `.pkpass` generation + **Google Wallet REST API** directly. All managed within the existing Next.js/Supabase stack under Montablo's Apple Developer account and Google Cloud project.

No third-party SaaS (e.g. OneCup) — Montablo owns the full stack, zero per-pass cost, complete control over design and logic.

## Architecture

### New Dashboard Pages

| Route | Purpose |
|---|---|
| `/dashboard/loyalty` | Overview — program status, active cards count, recent activity |
| `/dashboard/loyalty/setup` | Configure program rules + card design (branding, tagline, reward) |
| `/dashboard/loyalty/customers` | List of registered customers + stamp counts + reward status |
| `/dashboard/loyalty/customers/new` | Register new customer (name + email + optional phone) |
| `/dashboard/loyalty/scan` | Mobile-optimized QR scanner to add stamps |

### New API Routes

| Route | Purpose |
|---|---|
| `POST /api/loyalty/cards` | Create card, generate .pkpass + Google Wallet JWT, send email |
| `GET /api/loyalty/cards/[id]/apple` | Serve `.pkpass` file for download |
| `GET /api/loyalty/cards/[id]/google` | Redirect to Google Wallet save URL |
| `POST /api/loyalty/cards/[id]/stamp` | Add stamp (called from scan page after QR scan) |
| `POST /api/loyalty/cards/[id]/redeem` | Mark reward as redeemed |
| `GET /api/loyalty/passes/apple/[serial]` | PassKit Web Service — serve updated pass to Apple |
| `POST /api/loyalty/passes/apple/register` | Register Apple device for push updates |
| `DELETE /api/loyalty/passes/apple/[deviceId]/[serial]` | Unregister Apple device |
| `POST /api/loyalty/passes/apple/push` | Trigger push update to all registered devices for a card |

### Database Schema (Supabase)

```sql
-- One loyalty program per restaurant
CREATE TABLE loyalty_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('visits', 'spend')),
  goal INTEGER NOT NULL, -- visits: count (e.g. 10) | spend: cents (e.g. 5000 = 50€)
  reward_description TEXT NOT NULL, -- "1 café grátis"
  card_tagline TEXT, -- "Bem-vindo ao nosso clube!"
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(restaurant_id)
);

-- One card per customer per restaurant
CREATE TABLE loyalty_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id UUID REFERENCES loyalty_programs(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  current_value INTEGER DEFAULT 0, -- visits: count | spend: cents (consistent with goal units)
  total_redeemed INTEGER DEFAULT 0,
  apple_pass_serial TEXT UNIQUE,
  apple_auth_token TEXT,
  google_pass_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit trail of every stamp/spend event
CREATE TABLE loyalty_stamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES loyalty_cards(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 1, -- 1 visit OR amount in cents
  added_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Apple Wallet push notification registrations
CREATE TABLE loyalty_device_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES loyalty_cards(id) ON DELETE CASCADE,
  device_library_id TEXT NOT NULL,
  push_token TEXT NOT NULL,
  pass_type_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(device_library_id, card_id)
);
```

## Card Design

Cards are fully branded per restaurant using existing `Restaurant` fields:
- `logo_url` → strip logo + icon
- `primary_color` → background color
- `secondary_color` → accent color
- `loyalty_programs.card_tagline` → tagline text

**Visual style (Variant A — approved):** Dark background, stamp grid for visits (filled circles ✓ vs empty dashed circles), progress bar for spend. QR code at the bottom — customer shows to restaurant for stamping. The QR encodes the card UUID; the scan page reads it and calls the stamp API directly.

**Card adapts automatically** to program type:
- `visits` → grid of N circles (goal count), filled as stamps accumulate
- `spend` → progress bar showing euros spent toward goal

**Reward state:** When `current_value >= goal`, card shows "🎁 Recompensa disponível!" in bold.

## Customer Flow

1. Restaurant owner goes to `/dashboard/loyalty/customers/new`
2. Fills in customer name + email (+ optional phone)
3. System creates `loyalty_card` record, generates `.pkpass` + Google Wallet JWT
4. Resend sends email with two buttons: **"Adicionar ao Apple Wallet"** and **"Adicionar ao Google Wallet"**
5. Customer installs card — it appears in their Wallet app

## Stamping Flow

1. Restaurant owner opens `/dashboard/loyalty/scan` on their phone (mobile-optimized)
2. Scans QR code on the customer's Wallet card
3. Dashboard confirms "✓ Carimbo adicionado" 
4. Apple Wallet card updates automatically via APNs push
5. Google Wallet card updates on next open

## Redemption Flow

Two paths — either side can initiate:
- **Staff-initiated:** Restaurant owner sees customer in `/dashboard/loyalty/customers` with badge "Recompensa disponível" → clicks "Resgatar" → `total_redeemed++`, `current_value` resets to 0, card updates
- **Customer-initiated:** Customer shows card with "🎁 Recompensa disponível!" → staff clicks "Confirmar resgate" in scan page

## Infrastructure Requirements

| Requirement | Details |
|---|---|
| Apple Developer account | Already exists — needs Pass Type ID + certificate created |
| Apple PassKit Web Service | Hosted on existing Next.js deployment (Vercel) |
| Google Cloud project | Exists but not configured — needs Wallet API enabled + service account |
| APNs push | Uses Apple's push service with the Pass certificate |
| Email | Resend (already in use for invoices) |

## Out of Scope

- Multiple loyalty programs per restaurant (one program per restaurant for now)
- SMS sending (email only for V1)
- In-app analytics dashboard (just the customer list with counts for V1)
- Automatic stamp via Stripe payment (manual scan only for V1)
- Push notifications for promotions / daily menu (future integration)
