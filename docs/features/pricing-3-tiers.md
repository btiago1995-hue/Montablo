# Pricing 3 Tiers — Stripe Setup Reference

Source of truth for tiers: [`src/lib/pricing.ts`](../../src/lib/pricing.ts).

## Stripe products & prices

Two products are created manually in the Stripe Dashboard. Prices are stored HT — VAT is collected automatically by Stripe (Settings → Tax).

| Product              | Cycle    | Amount HT   | Env var                              |
| -------------------- | -------- | ----------- | ------------------------------------ |
| MonTablo Essentiel   | Monthly  | 19,00 EUR   | `STRIPE_PRICE_ID_ESSENTIEL_MONTHLY`  |
| MonTablo Essentiel   | Annual   | 205,00 EUR  | `STRIPE_PRICE_ID_ESSENTIEL_ANNUAL`   |
| MonTablo Pro         | Monthly  | 39,00 EUR   | `STRIPE_PRICE_ID_PRO_MONTHLY`        |
| MonTablo Pro         | Annual   | 421,00 EUR  | `STRIPE_PRICE_ID_PRO_ANNUAL`         |

The **Premium** tier has no Stripe price (sur devis — handled via `/contact`).

Each price ID must be set in the three Vercel environments (`development`, `preview`, `production`) using `printf` (not `echo`) to avoid trailing newlines, and mirrored in `.env.local` for local dev.

## Launch coupon — `LANCEMENT_GENEVOIS`

Hand-applied by an admin to customers acquired during the Haute-Savoie launch push.

- **ID** (exact): `LANCEMENT_GENEVOIS`
- **Type**: Percentage discount — **38,46 %** off
- **Duration**: Forever
- **Applies to**: Product *MonTablo Pro*, monthly price only
- **Max redemptions**: 20
- **Effective locked price**: `24,00 EUR HT / mois` (used to compute `launch_offer_locked_price` in DB)

### Applying the coupon to a customer

From Stripe Dashboard → Customers → pick the customer → **Add coupon** → select `LANCEMENT_GENEVOIS`. The next invoice cycle reflects the discount; the app webhook detects the coupon on `checkout.session.completed` and writes `is_launch_offer = true` + `launch_offer_locked_price = 24.0` on the `restaurants` row.

## Related code

- `src/lib/pricing.ts` — `TIERS`, `stripePriceEnvName()`, `priceIdToTier()`, `LAUNCH_*` constants
- `src/app/api/stripe/checkout/route.ts` — reads `tier` + `billing_cycle` from request body
- `src/app/api/stripe/webhook/route.ts` — persists tier/cycle + detects launch coupon
