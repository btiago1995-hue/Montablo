# Admin CRM — Montablo

**Data:** 2026-04-16  
**Objetivo:** Painel de administração interno para o fundador gerir todos os clientes do SaaS, acompanhar receita, e executar ações sobre subscrições.

---

## 1. Arquitetura

### Localização
Nova secção `src/app/(admin)/admin/` dentro do projeto Montablo existente. Rota raiz: `/admin`.

O domínio `admin.montablo.com` é adicionado ao Vercel como custom domain apontando ao mesmo deployment de `montablo.com`.

### Proteção
O middleware existente (`src/middleware.ts`) é expandido: se o path começa com `/admin`, verifica que o utilizador autenticado tem email `btiago1995@gmail.com`. Caso contrário, redireciona para `/auth/login?next=/admin`.

Todas as Server Actions e API routes de admin validam novamente o email server-side (nunca confiar apenas no redirect do middleware).

### Dados
- **Supabase**: client admin (`src/lib/supabase/admin.ts`) já existe com service role key — usado para queries sem RLS.
- **Stripe**: `src/lib/stripe.ts` já existe — usado para buscar dados de MRR e subscrições.
- **Resend**: `src/lib/resend.ts` já existe — usado para emails manuais.

---

## 2. Layout

Sidebar fixa à esquerda (220px) com labels de texto, tema dark (`#0f172a` fundo, `#1e293b` sidebar). Conteúdo principal com scroll vertical. Mesma linguagem visual do mockup aprovado.

**Estrutura de navegação:**
```
Visão geral
  └─ Dashboard

Clientes
  └─ Restaurantes
       └─ [slug] — Detalhe

Financeiro
  └─ Receita
```

---

## 3. Páginas

### 3.1 Dashboard (`/admin`)

**KPIs (linha de 4 cards):**
- MRR atual (soma dos restaurantes `active` × preço do plano, via Stripe ou calculado)
- Total de restaurantes
- Em trial (+ quantos expiram nos próximos 7 dias)
- Churn este mês (cancelamentos nos últimos 30 dias)

**Gráfico MRR:** barras mensais dos últimos 6 meses. Dados: contar restaurantes `active` por mês a partir do Supabase (aproximação) ou via Stripe API charges.

**Donut de estados:** distribuição active / trialing / past_due / canceled — dados diretos da tabela `restaurants`.

**Tabela "Trials a expirar esta semana":** restaurantes com `subscription_status = 'trialing'` e `trial_ends_at` nos próximos 7 dias, ordenados por data. Link rápido "Estender →" que abre o detalhe.

---

### 3.2 Restaurantes (`/admin/restaurants`)

Tabela com todos os restaurantes. Colunas: Nome, Slug, Estado (badge), Trial expira, Criado em, Ação (→ detalhe).

Filtros: por estado (active / trialing / past_due / canceled). Pesquisa por nome ou slug (client-side sobre os dados carregados).

Ordenação padrão: mais recentes primeiro.

---

### 3.3 Detalhe do restaurante (`/admin/restaurants/[slug]`)

**Header:** nome, badge de estado, slug, datas de criação e expiração do trial.

**Informação (grid 2 colunas):**
- Email do owner (via `auth.admin.getUserById`)
- Estado da subscrição com label legível
- Stripe Customer ID (link para Stripe Dashboard)
- Idiomas ativos
- Número de categorias e itens de menu

**Histórico (timeline):** eventos ordenados cronologicamente gerados a partir de campos existentes:
- Criação da conta (`created_at`)
- Menu importado (tabela `menu_imports`)
- Onboarding completo (campo `onboarding_step = 'complete'`)
- Subscrição ativada / cancelada (campo `subscription_status` + `updated_at`)

**Ações (card lateral direito):**

| Ação | Implementação |
|------|---------------|
| Estender trial 7 dias | Server Action: `UPDATE restaurants SET trial_ends_at = trial_ends_at + interval '7 days'` |
| Enviar email manual | Modal com campo de assunto e corpo → Resend `emails.send()` para o email do owner |
| Ver menu público | `window.open('https://montablo.com/[slug]')` |
| Cancelar subscrição | Server Action: `stripe.subscriptions.cancel(stripe_subscription_id)` + update `subscription_status = 'canceled'` em Supabase. Requer confirmação (dialog) antes de executar. |

---

### 3.4 Receita (`/admin/revenue`)

**KPIs:** MRR atual, ARR (MRR × 12), total de clientes pagantes, ARPU (MRR / clientes pagantes).

**Gráfico de barras:** MRR mensal dos últimos 12 meses. Fonte: Stripe `charges.list` ou aproximação via Supabase.

**Tabela de subscrições ativas:** nome do restaurante, data de início, valor mensal, próxima cobrança. Dados via Stripe API.

---

## 4. Autenticação das Server Actions

Cada Server Action de admin valida:
```ts
const supabase = createServerClient()
const { data: { user } } = await supabase.auth.getUser()
if (user?.email !== 'btiago1995@gmail.com') {
  throw new Error('Unauthorized')
}
```

---

## 5. Fora de Scope

- Gestão de múltiplos admins / roles
- Notificações push ou alertas em tempo real
- Export CSV de dados
- Impersonar restaurante (login como cliente)

Estas funcionalidades podem ser adicionadas em iterações futuras mas não fazem parte desta versão.

---

## 6. Ficheiros a criar

```
src/app/(admin)/
  admin/
    layout.tsx              ← sidebar + proteção de layout
    page.tsx                ← dashboard
    restaurants/
      page.tsx              ← lista de restaurantes
      [slug]/
        page.tsx            ← detalhe
        actions.ts          ← server actions (extend trial, email, cancel)
    revenue/
      page.tsx              ← página de receita
```

Componentes partilhados de admin em `src/components/admin/` (sidebar, kpi-card, status-badge).
