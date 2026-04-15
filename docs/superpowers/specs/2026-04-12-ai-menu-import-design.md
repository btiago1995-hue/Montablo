# AI Menu Import — Design Spec

## Summary

Restaurant owners can upload a PDF, photo, or paste text of their existing menu. Claude API extracts categories, items (name, description, price), translates FR→EN, and suggests tags. The owner previews and edits before confirming bulk creation.

## User Flow

### Onboarding (post-signup)

1. After signup + restaurant creation, redirect to `/dashboard/import` instead of `/dashboard`
2. Page offers three input methods: Upload PDF, Upload photo, Paste text
3. File/text sent to `/api/menu-import` → Claude API extracts structured menu data
4. Preview page shows extracted menu in editable form (categories + items)
5. Owner reviews, edits corrections, clicks "Confirmer"
6. Bulk insert into Supabase → redirect to `/dashboard`
7. "Passer cette étape" link to skip and go straight to dashboard

### Menu Management page (existing users)

- New button "Scanner un menu" next to Catégorie/Plat buttons
- Same flow (upload → preview → confirm)
- Adds to existing items instead of replacing

## Architecture

```
[Upload PDF/Image/Text]
       |
[POST /api/menu-import]
       |
[Rate limit check: 3/restaurant/day]
       |
[Claude API with vision — extraction prompt]
       |
[JSON: { categories: [{ name_fr, name_en, items: [{ name_fr, name_en, description_fr, description_en, price, tags }] }] }]
       |
[Preview page — editable table]
       |
[POST /api/menu-import/confirm]
       |
[Bulk insert: categories + items in Supabase]
```

## API Routes

### `POST /api/menu-import`

**Input:** multipart form data with either:
- `file`: PDF or image (JPG, PNG, WEBP) — max 10MB
- `text`: plain text — max 50,000 characters
- `restaurant_id`: string (for rate limiting)

**Auth:** Required. Validates user owns the restaurant.

**Rate limit:** 3 requests per restaurant per day. Tracked via `menu_imports` table in Supabase.

**Process:**
1. Validate auth + ownership
2. Check rate limit (count imports for restaurant today)
3. If file: convert to base64, send to Claude API with vision
4. If text: send to Claude API as text
5. Return structured JSON

**Claude API prompt:**
```
Tu es un assistant qui extrait les données d'un menu de restaurant.

Analyse ce menu et retourne un JSON structuré avec:
- Les catégories (name_fr, name_en traduit en anglais)
- Pour chaque catégorie, les items avec:
  - name_fr: nom du plat en français
  - name_en: traduction anglaise du nom
  - description_fr: description en français (si disponible)
  - description_en: traduction anglaise de la description
  - price: prix en nombre décimal (ex: 14.50)
  - tags: tableau de tags suggérés parmi: végétarien, végan, sans gluten, épicé, poisson, viande, dessert, entrée, boisson

Retourne UNIQUEMENT le JSON, sans texte autour.

Format exact:
{
  "categories": [
    {
      "name_fr": "Entrées",
      "name_en": "Starters",
      "items": [
        {
          "name_fr": "Soupe à l'oignon",
          "name_en": "French onion soup",
          "description_fr": "Soupe gratinée au fromage",
          "description_en": "Cheese-topped gratinéed soup",
          "price": 8.50,
          "tags": ["végétarien"]
        }
      ]
    }
  ]
}
```

**Output:**
```typescript
{
  categories: {
    name_fr: string
    name_en: string
    items: {
      name_fr: string
      name_en: string
      description_fr: string | null
      description_en: string | null
      price: number
      tags: string[]
    }[]
  }[]
}
```

### `POST /api/menu-import/confirm`

**Input:** JSON body with the (possibly edited) menu structure + restaurant_id + mode ('replace' | 'append')

**Auth:** Required. Validates user owns the restaurant.

**Process:**
1. Validate auth + ownership
2. If mode is 'replace': delete existing categories and items for this restaurant
3. For each category: insert into `categories` table, get ID
4. For each item in category: insert into `items` table with category_id
5. Return success with counts

## Database

### New table: `menu_imports`

```sql
CREATE TABLE menu_imports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_imports_restaurant_date
  ON menu_imports(restaurant_id, created_at);

ALTER TABLE menu_imports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owner full access" ON menu_imports
  FOR ALL USING (
    restaurant_id IN (SELECT id FROM restaurants WHERE owner_id = auth.uid())
  );
```

## Components

### `MenuImportWizard` (client component)

Used in both `/dashboard/import` and within `MenuManager`.

**Props:**
- `restaurantId: string`
- `mode: 'onboarding' | 'existing'` — controls whether to show "skip" and whether confirm replaces or appends
- `onComplete: () => void` — callback after successful import

**States:**
1. **Input** — drag & drop zone for PDF/image + textarea for text paste + file picker
2. **Loading** — "Analyse de votre menu en cours..." with spinner animation
3. **Preview** — editable form with extracted categories and items
4. **Error** — retry option if extraction fails

**Preview form:**
- Categories shown as collapsible sections
- Each item row: name_fr, name_en, description_fr, price, tags (as checkboxes)
- "Supprimer" button per item/category
- "Ajouter un item" button per category
- "Confirmer l'import" primary button at bottom

### Integration points

**Signup page:** After successful signup with session, redirect to `/dashboard/import` instead of `/dashboard`.

**Auth callback:** After email confirmation + restaurant creation, redirect to `/dashboard/import`.

**Dashboard import page** (`/dashboard/import`):
- Server component that checks if restaurant has any items
- If items exist, redirect to `/dashboard` (already imported)
- Otherwise, render `MenuImportWizard` with mode='onboarding'

**Menu manager:** Add "Scanner un menu" button that opens `MenuImportWizard` in a modal with mode='existing'.

## Abuse Protection

| Protection | Value | Rationale |
|-----------|-------|-----------|
| Auth required | Yes | Only logged-in restaurant owners |
| Rate limit | 3 imports / restaurant / day | No restaurant needs more |
| Max file size | 10 MB | Covers any reasonable menu PDF/photo |
| Max text length | 50,000 chars | Covers any reasonable pasted menu |
| Claude API max_tokens | 4,096 | Caps response cost per request |

Rate limit is enforced server-side by counting rows in `menu_imports` for the restaurant where `created_at > now() - interval '1 day'`.

## Environment Variable

- `ANTHROPIC_API_KEY` — Claude API key for menu extraction

## Cost Estimate

- ~$0.01-0.05 per extraction (Claude Haiku for text, Sonnet for vision)
- With 3/day limit and typical usage: negligible monthly cost
- Model choice: Claude Haiku 4.5 for text-only input, Claude Sonnet 4.6 for PDF/image (vision required)

## Out of Scope

- OCR preprocessing (Claude handles it natively)
- Menu template detection
- Multi-page PDF pagination (Claude handles multi-page)
- Image cropping/editing before upload
