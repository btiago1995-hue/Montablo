# Invoice Email on Subscription Payment

**Date:** 2026-04-17  
**Status:** Approved

## Goal

Send a branded MonTablo invoice email to the restaurant owner on every successful Stripe payment — both the first subscription payment and all renewals (monthly or annual).

## Scope

- Handle `invoice.payment_succeeded` Stripe webhook event
- Add `invoiceIssued` email template to `src/lib/email-templates.ts`
- Extend the existing webhook handler in `src/app/api/stripe/webhook/route.ts`
- No PDF generation — use Stripe's `hosted_invoice_url`

## Out of Scope

- Generating custom PDF invoices
- Changing the existing `subscriptionConfirmed` email (first payment sends both emails: activation + invoice)
- Stripe Dashboard receipt emails (disabled in favor of MonTablo emails)

## Architecture

### Webhook event flow

```
Stripe fires invoice.payment_succeeded
  → webhook extracts: customer ID, hosted_invoice_url, amount_paid, currency, period_start, period_end
  → look up restaurant by stripe_customer_id
  → call sendEmailToRestaurantOwner with invoiceIssued template
  → send email via Resend (non-blocking, consistent with existing pattern)
```

### Files changed

| File | Change |
|------|--------|
| `src/lib/email-templates.ts` | Add `invoiceIssued(restaurantName, amount, currency, periodStart, periodEnd, invoiceUrl, dashboardUrl)` |
| `src/app/api/stripe/webhook/route.ts` | Add `invoice.payment_succeeded` case; extend `sendEmailToRestaurantOwner` or inline the send (since it needs extra args) |

### Email template — `invoiceIssued`

- Subject: `${restaurantName} — Votre facture du ${month} est disponible`
- Content:
  - Amount paid (formatted, e.g. "32,99 €")
  - Period covered (e.g. "1 mai → 31 mai 2026")
  - CTA button: "Voir ma facture" → `hosted_invoice_url`
  - Footer note about dashboard access

### Webhook handler change

The existing `sendEmailToRestaurantOwner` helper only accepts `(restaurantId, buildEmail)` where `buildEmail(name, dashboardUrl)`. The invoice template needs extra args (amount, period, invoiceUrl), so the `invoice.payment_succeeded` case will inline the lookup + send rather than using the helper, following the same pattern.

## Data from Stripe

From `invoice.payment_succeeded`, the `Stripe.Invoice` object provides:
- `invoice.customer` — Stripe customer ID (used to find restaurant)
- `invoice.hosted_invoice_url` — link to Stripe-hosted invoice page
- `invoice.amount_paid` — integer in cents
- `invoice.currency` — e.g. "eur"
- `invoice.period_start` — Unix timestamp
- `invoice.period_end` — Unix timestamp
- `invoice.billing_reason` — `subscription_create` (first) or `subscription_cycle` (renewal)

## Error Handling

- If restaurant not found by `stripe_customer_id`: log and return (same as existing pattern)
- If email send fails: non-blocking (`.catch(() => {})`) — same as existing pattern
- Webhook always returns `{ received: true }` regardless

## Testing

1. Use Stripe CLI to forward events: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
2. Trigger test event: `stripe trigger invoice.payment_succeeded`
3. Verify email received with correct amount, period, and invoice link
4. Test with both monthly and annual price IDs
