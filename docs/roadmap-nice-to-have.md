# MonTablo — Backlog "Nice to Have"

**Atualizado:** 2026-04-28
**Contexto:** items adiados para depois das primeiras vendas. Não bloqueiam o lançamento. A maioria são features que o copy do site **antes prometia** mas não estavam implementadas — agora o copy foi suavizado, e estes builds permitem voltar a prometer com integridade.

---

## P1 — Features prometidas no copy, suavizadas até estarem prontas

### 1. Statistiques de consultation (analytics) — ~6h
**Promessa atual:** removida de `/fonctionnalites` (secção #8 deletada).

**O que fazer:**
- Tabela `menu_views` (event_type, restaurant_id, item_id, category_id, language, device, ip_hash, created_at)
- Endpoint `/api/track` (rate-limit 60/min/IP, IP hashed com salt diário rotativo, fire-and-forget 204)
- Tracking em `menu-content.tsx` com `navigator.sendBeacon` (page load → menu_scan, item click → item_view)
- Dashboard widget em `/dashboard` ou novo `/dashboard/stats` com:
  - KPIs (today / 7d / 30d)
  - Top 5 plats + Top 3 catégories
  - Heure de pic (chart 24h)
  - Répartition langue FR/EN/DE
  - Selector período
- Restaurar secção #8 em `/fonctionnalites` com texto "Sachez ce que vos clients regardent vraiment"
- Job de limpeza mensal (delete > 12 meses)
- Mencionar em `/confidentialite` como "telemetria anónima"

**Por que vale a pena:** diferenciador real vs concorrentes free. Sales pitch concreto. Ganha valor com 10+ restaurantes (precisa de dados primeiro).

---

### 2. Apple Wallet — geolocation (relevantLocations) — ~2h
**Promessa atual:** copy diz "Sur Android" / "Apple Wallet : bientôt." em `/fonctionnalites` e homepage.

**O que fazer:**
- Adicionar `relevantLocations: [{ latitude, longitude, relevantText: "Bienvenue chez {restaurant.name}" }]` ao `pass-design.ts` para Apple Wallet
- Já há `restaurant.latitude` e `restaurant.longitude` na DB (usado por Google Wallet)
- Re-sign do .pkpass quando lat/lng mudam (já temos infra `wallet-sync.ts`)
- Testar em iPhone real (lock screen notification quando passa perto)
- Atualizar copy: tirar "(Apple Wallet : bientôt.)" e "Sur Android" → unificar para "Sur Android et iPhone"

**Por que vale a pena:** clientela frontaliera tem mix iOS/Android, perder iPhone é deixar 50% do mercado fora.

---

### 3. QR avec logo au centre — ~3h
**Promessa atual:** copy não diz "votre logo au centre" (removido de `/fonctionnalites`).

**O que fazer:**
- Lib: `qrcode-with-logos` (npm) OU canvas overlay manual
- Em `qr-code-generator.tsx`:
  - Fallback se restaurante não tem `logo_url`: QR sem logo (atual)
  - Se tem logo: render logo num círculo central (~20% width, com border-correction)
  - Garantir error correction level alto (`H`) para suportar overlay sem partir scan
- Testar com vários telefones para confirmar scan
- Atualizar copy `/fonctionnalites` e blog `/qr-code-restaurant` para mencionar "logo au centre"

**Por que vale a pena:** diferenciador visual forte para impressão (cartões de mesa). Salesperson pode mostrar QR personalizado vs QR genérico.

---

### 4. Multilingue : Italien + Espagnol — ~4h
**Promessa atual:** removida de `/fonctionnalites` (apenas FR/EN/DE).

**O que fazer:**
- DB migration: adicionar `name_it`, `description_it`, `name_es`, `description_es` em categories/items/daily_menus
- Update `types/database.ts`
- Update `menu-content.tsx` Lang type para incluir `'it' | 'es'`
- Update `lib/translate.ts` LANG_LABELS com Italian/Spanish
- Update `settings-form.tsx` toggles para IT + ES
- Update `/fonctionnalites #3` copy: voltar a "anglais, allemand, italien et espagnol"

**Por que vale a pena:** mercado da Haute-Savoie tem clientela italiana (próximo da Itália) — IT é mais relevante que ES. Mas só fazer se houver pedido real de cliente.

---

## P2 — Polishing / Loose ends

### 5. Cidades em falta no hub Haute-Savoie
**Por que:** Saint-Julien-en-Genevois (HQ MonTablo!) e La-Roche-sur-Foron não estão em `src/data/haute-savoie.ts`. Sitemap perde duas páginas SEO valiosas.

**O que fazer:**
- Adicionar entries em `VILLES` array com `name`, `slug`, `intro`, `faq` (cada com 2-3 paragrafos + 3 perguntas)
- Validar no sitemap.xml após
- Considerar adicionar Bellegarde-sur-Valserine, Ferney-Voltaire, Saint-Genis-Pouilly (cluster Genevois alargado)

### 6. Apóstrofo francês no template `[ville]`
**Por que:** atualmente mostra "restaurants de Annecy" / "de Évian" — gramaticalmente incorreto antes de vogal.

**O que fazer:**
- Helper `prefixDe(name)`: `name[0]` é vogal? → `d'${name}` : `de ${name}`
- Aplicar em todos os H1/sub que têm `de {city}` no template

### 7. Validação de números no copy
**Por que:** "+0,5 étoile en 2 mois", "x3 fidélité" foram escritos no brief mas não há dados ainda.

**O que fazer:**
- Coletar métricas dos primeiros 5-10 restaurantes durante 2 meses
- Se confirma: manter copy
- Se não: suavizar para "peut atteindre +0,5 étoile selon le contexte"
- Se for ainda melhor: actualizar para o número real

### 8. Témoignages clients
**Por que:** brief original previa secção "preuve sociale" (omitida por enquanto).

**O que fazer:**
- Quando 3-5 clientes Pro tiverem 1+ mês de uso, recolher testemunhos curtos (2-3 frases + nome + restaurante + cidade + photo opcional)
- Adicionar secção "Ce que disent nos restaurateurs" antes do CTA final na homepage
- Reusar em /a-propos e personas pages

### 9. Páginas /pour/* (personas dedicadas com URL distinta)
**Por que:** brief original sugeria criar `/pour/bistrots-brasseries`, `/pour/creperies-restaurants-regionaux`, `/pour/pizzerias-trattorias`, `/pour/restaurants-de-station`. Atualmente reusamos `/solutions/*` que cobre território semelhante mas com URL diferente.

**Decisão pendente:** manter `/solutions/*` (como está) ou criar redirect /pour/* → /solutions/* ou novas pages? Provavelmente keep `/solutions/*` é suficiente — `/pour/*` traria SEO duplicate content.

### 10. Email de pacote de OG image gen
**Por que:** templates de email têm Georgia serif fallback. Se queres mais polish, podemos gerar OG image dinâmica por restaurante (já existe rota /api/og) e usá-la nos emails de welcome/invoice como header.

---

## P3 — Long-term / quando crescer

- **Multi-établissement** (Premium tier) — UI para gerir várias localizações sob 1 conta
- **Account manager dédié** (Premium) — onboarding personalizado registado
- **Webhook de payments** para integradores (PMS hôtels)
- **Reservation widget** (integração SevenRooms / TheFork lite)
- **POS integration** (Square / Lightspeed) para sync prix automático
- **API publique** para sincronização inversa (Pro+)
- **PWA mode** (install on home screen)
- **Modo dark menu** opt-in (estética bistrot/bar/cocktail)
- **Imagens IA por plat** (geração para restaurantes sem fotos próprias)
- **A/B testing** de prix / descrições per item

---

## Notas operacionais

- Antes de qualquer P1: confirmar com primeiros clientes Pro o que é mais pedido
- P2.5 (apóstrofo) e P2.5 (cidades) podem ser feitos em <1h cada — fazer quando der disposição
- Statistics + Apple Wallet GPS são os 2 que mais aumentam o "ticket pitch" para vendas

---

**Lembrar:** o copy do site **suavizado em 2026-04-28** já não promete o que não está construído. Quando uma feature da P1 fica pronta, voltar a ativar a respectiva secção/menção no copy.
