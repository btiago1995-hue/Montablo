# Invoice Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Send a branded MonTablo invoice email to the restaurant owner on every successful Stripe payment (first subscription + all renewals, monthly and annual).

**Architecture:** Add `invoiceIssued` template to the existing email templates file, then handle `invoice.payment_succeeded` in the existing Stripe webhook handler. Lookup restaurant by `stripe_customer_id`, get owner email via Supabase admin, send via Resend.

**Tech Stack:** Stripe webhooks, Resend, Next.js API routes, Supabase admin client, TypeScript

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/lib/email-templates.ts` | Modify | Add `invoiceIssued` template function |
| `src/app/api/stripe/webhook/route.ts` | Modify | Add `invoice.payment_succeeded` case |

---

### Task 1: Add `invoiceIssued` email template

**Files:**
- Modify: `src/lib/email-templates.ts`

- [ ] **Step 1: Add two helper functions at the top of the file (after the existing `tip` helper, before the `// ─── 1. Welcome` comment)**

In `src/lib/email-templates.ts`, add after the `tip()` function:

```typescript
function formatAmount(amountInCents: number, currency: string) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountInCents / 100)
}

function formatPeriod(startTs: number, endTs: number) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  const fmt = (ts: number) => new Date(ts * 1000).toLocaleDateString('fr-FR', opts)
  return `${fmt(startTs)} → ${fmt(endTs)}`
}
```

- [ ] **Step 2: Add the `invoiceIssued` template at the bottom of `src/lib/email-templates.ts` (after `subscriptionCanceled`)**

```typescript
// ─── 6. Invoice issued (every payment) ─────────────────────────────

export function invoiceIssued(
  restaurantName: string,
  amountPaid: number,
  currency: string,
  periodStart: number,
  periodEnd: number,
  invoiceUrl: string,
  dashboardUrl: string,
) {
  const amount = formatAmount(amountPaid, currency)
  const period = formatPeriod(periodStart, periodEnd)

  return {
    subject: `${restaurantName} — Votre facture MonTablo est disponible`,
    html: layout(`
      <h2 style="font-family:Georgia,serif;color:${BRAND.primary};margin:0 0 8px;font-size:22px">
        Votre facture est disponible
      </h2>
      <p style="font-size:15px;color:${BRAND.text};line-height:1.6;margin:0 0 24px">
        Merci pour votre paiement. Voici le récapitulatif de votre abonnement MonTablo
        pour <strong>${restaurantName}</strong>.
      </p>

      ${divider()}

      <table style="width:100%;border-collapse:collapse;margin:0 0 24px">
        <tr>
          <td style="font-size:14px;color:${BRAND.muted};padding:8px 0">Montant payé</td>
          <td style="font-size:14px;color:${BRAND.text};font-weight:600;text-align:right;padding:8px 0">${amount}</td>
        </tr>
        <tr>
          <td style="font-size:14px;color:${BRAND.muted};padding:8px 0;border-top:1px solid #E5E5E0">Période couverte</td>
          <td style="font-size:14px;color:${BRAND.text};text-align:right;padding:8px 0;border-top:1px solid #E5E5E0">${period}</td>
        </tr>
      </table>

      ${button('Voir ma facture', invoiceUrl)}

      <p style="font-size:13px;color:${BRAND.muted};line-height:1.5;margin:0;text-align:center">
        Vous pouvez également accéder à toutes vos factures depuis votre
        <a href="${dashboardUrl}/settings" style="color:${BRAND.accent};text-decoration:none">tableau de bord</a>.
      </p>
    `),
  }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/tiago/Montablo && npx tsc --noEmit
```

Expected: no errors related to `email-templates.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/email-templates.ts
git commit -m "feat: add invoiceIssued email template"
```

---

### Task 2: Handle `invoice.payment_succeeded` in the Stripe webhook

**Files:**
- Modify: `src/app/api/stripe/webhook/route.ts`

- [ ] **Step 1: Add the import for `invoiceIssued` at the top of the webhook file**

In `src/app/api/stripe/webhook/route.ts`, line 4, update the import:

```typescript
import { subscriptionConfirmed, subscriptionCanceled, invoiceIssued } from '@/lib/email-templates'
```

- [ ] **Step 2: Add the `invoice.payment_succeeded` case to the switch statement**

In `src/app/api/stripe/webhook/route.ts`, add after the `customer.subscription.deleted` case (before the closing `}` of the switch):

```typescript
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string

      if (!invoice.hosted_invoice_url) break

      const { data: restaurant } = await supabase
        .from('restaurants')
        .select('id, name, owner_id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (!restaurant) break

      const { data: { user } } = await supabase.auth.admin.getUserById(restaurant.owner_id)
      if (!user?.email) break

      const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.montablo.com'
      const email = invoiceIssued(
        restaurant.name,
        invoice.amount_paid,
        invoice.currency,
        invoice.period_start,
        invoice.period_end,
        invoice.hosted_invoice_url,
        `${appUrl}/dashboard`,
      )

      await getResend().emails.send({
        from: EMAIL_FROM,
        to: user.email,
        subject: email.subject,
        html: email.html,
      }).catch(() => {})

      break
    }
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/tiago/Montablo && npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Run build to confirm no regressions**

```bash
cd /Users/tiago/Montablo && npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/stripe/webhook/route.ts
git commit -m "feat: send invoice email on invoice.payment_succeeded webhook"
```

---

### Task 3: Test end-to-end with Stripe CLI

**Files:** none (testing only)

- [ ] **Step 1: Install Stripe CLI if not already installed**

```bash
stripe --version
```

If not installed: `brew install stripe/stripe-cli/stripe`

- [ ] **Step 2: Start the local dev server**

```bash
cd /Users/tiago/Montablo && npm run dev
```

- [ ] **Step 3: In a second terminal, forward Stripe events to local webhook**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Note the webhook signing secret printed — it must match `STRIPE_WEBHOOK_SECRET` in `.env.local`. If not, update `.env.local` temporarily for local testing.

- [ ] **Step 4: Trigger a test `invoice.payment_succeeded` event**

```bash
stripe trigger invoice.payment_succeeded
```

- [ ] **Step 5: Verify the webhook processed correctly**

In the `stripe listen` terminal, confirm:
```
--> invoice.payment_succeeded [evt_xxx]
<-- [POST /api/stripe/webhook] 200 OK
```

In the dev server logs, confirm no TypeScript or runtime errors.

- [ ] **Step 6: Check email received**

Since the test event uses a synthetic customer not linked to a real restaurant in the DB, the handler will exit at `if (!restaurant) break` — which is correct. To test the full flow with a real restaurant, trigger a real checkout session using a Stripe test card.

To verify the email template renders correctly, add a temporary log or use Resend's dashboard to inspect sent emails after a real test checkout.

- [ ] **Step 7: Deploy to production**

```bash
git push origin main
```

Vercel auto-deploys on push to main. Monitor at https://www.montablo.com after deploy.

- [ ] **Step 8: Verify Stripe webhook is registered for `invoice.payment_succeeded` in production**

In the Stripe Dashboard → Developers → Webhooks → select the production webhook endpoint for `https://www.montablo.com/api/stripe/webhook` → confirm `invoice.payment_succeeded` is in the list of subscribed events. If not, add it.
