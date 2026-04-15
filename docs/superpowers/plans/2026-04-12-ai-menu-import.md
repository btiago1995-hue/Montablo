# AI Menu Import — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restaurant owners upload a PDF/photo/text of their existing menu, Claude AI extracts it into structured data, and they confirm before bulk creating categories and items.

**Architecture:** New API route `/api/menu-import` sends files/text to Claude API (Anthropic SDK), returns structured JSON. A reusable `MenuImportWizard` client component handles upload → loading → preview → confirm. Rate limited to 3/restaurant/day via `menu_imports` table.

**Tech Stack:** Next.js 14.2, Anthropic SDK (`@anthropic-ai/sdk`), Supabase, TypeScript

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/types/menu-import.ts` | Shared types for import data |
| Create | `src/app/api/menu-import/route.ts` | AI extraction endpoint |
| Create | `src/app/api/menu-import/confirm/route.ts` | Bulk insert endpoint |
| Create | `src/components/dashboard/menu-import-wizard.tsx` | Upload → preview → confirm wizard |
| Create | `src/app/dashboard/import/page.tsx` | Onboarding import page |
| Modify | `src/components/dashboard/menu-manager.tsx` | Add "Scanner un menu" button |
| Modify | `src/app/(auth)/signup/page.tsx` | Redirect to /dashboard/import |
| Modify | `src/app/api/auth/callback/route.ts` | Redirect to /dashboard/import |

---

### Task 1: Install Anthropic SDK + add env var

**Files:**
- Modify: `package.json`
- Modify: `.env.local`

- [ ] **Step 1: Install the Anthropic SDK**

```bash
cd /Users/tiago/Montablo && npm install @anthropic-ai/sdk
```

- [ ] **Step 2: Add ANTHROPIC_API_KEY to .env.local**

Add this line to `/Users/tiago/Montablo/.env.local`:

```
ANTHROPIC_API_KEY=<your-key>
```

- [ ] **Step 3: Add ANTHROPIC_API_KEY to Vercel env vars**

```bash
printf '<your-key>' | vercel env add ANTHROPIC_API_KEY production --yes
```

---

### Task 2: Create shared types

**Files:**
- Create: `src/types/menu-import.ts`

- [ ] **Step 1: Create the types file**

```typescript
// src/types/menu-import.ts

export type ImportedItem = {
  name_fr: string
  name_en: string
  description_fr: string | null
  description_en: string | null
  price: number
  tags: string[]
}

export type ImportedCategory = {
  name_fr: string
  name_en: string
  items: ImportedItem[]
}

export type MenuImportResult = {
  categories: ImportedCategory[]
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/menu-import.ts
git commit -m "feat: add shared types for AI menu import"
```

---

### Task 3: Create `menu_imports` rate-limit table

**Files:**
- Modify: `supabase/schema.sql` (documentation only)
- Applied via Supabase MCP

- [ ] **Step 1: Apply migration via Supabase MCP**

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

- [ ] **Step 2: Verify table exists**

```sql
SELECT * FROM menu_imports LIMIT 1;
```

- [ ] **Step 3: Commit schema docs**

```bash
git add supabase/
git commit -m "feat: add menu_imports rate-limit table"
```

---

### Task 4: Create `/api/menu-import` extraction route

**Files:**
- Create: `src/app/api/menu-import/route.ts`

- [ ] **Step 1: Create the API route**

```typescript
// src/app/api/menu-import/route.ts

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import type { MenuImportResult } from '@/types/menu-import'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_TEXT_LENGTH = 50_000
const DAILY_LIMIT = 3

const EXTRACTION_PROMPT = `Tu es un assistant qui extrait les données d'un menu de restaurant.

Analyse ce menu et retourne un JSON structuré avec:
- Les catégories (name_fr, name_en traduit en anglais)
- Pour chaque catégorie, les items avec:
  - name_fr: nom du plat en français
  - name_en: traduction anglaise du nom
  - description_fr: description en français (si disponible, sinon null)
  - description_en: traduction anglaise de la description (si disponible, sinon null)
  - price: prix en nombre décimal (ex: 14.50). Si pas de prix visible, mettre 0.
  - tags: tableau de tags suggérés parmi: végétarien, végan, sans gluten, épicé, poisson, viande, dessert, entrée, boisson

Retourne UNIQUEMENT le JSON valide, sans texte autour, sans markdown.

Format exact:
{"categories":[{"name_fr":"Entrées","name_en":"Starters","items":[{"name_fr":"Soupe à l'oignon","name_en":"French onion soup","description_fr":"Soupe gratinée au fromage","description_en":"Cheese-topped gratinéed soup","price":8.50,"tags":["végétarien"]}]}]}`

export async function POST(request: Request) {
  // 1. Auth check
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  // 2. Get restaurant
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
  }

  // 3. Rate limit check
  const adminClient = createAdminClient()
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count } = await adminClient
    .from('menu_imports')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)
    .gte('created_at', oneDayAgo)

  if ((count ?? 0) >= DAILY_LIMIT) {
    return NextResponse.json(
      { error: 'Limite atteinte : 3 imports par jour maximum.' },
      { status: 429 }
    )
  }

  // 4. Parse input
  const contentType = request.headers.get('content-type') || ''
  let messageContent: Anthropic.MessageCreateParams['messages'][0]['content']

  if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 10 Mo)' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    const mediaType = file.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf'
    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf'

    if (!isImage && !isPdf) {
      return NextResponse.json({ error: 'Format non supporté. Utilisez PDF, JPG, PNG ou WEBP.' }, { status: 400 })
    }

    if (isPdf) {
      messageContent = [
        { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
        { type: 'text', text: EXTRACTION_PROMPT },
      ]
    } else {
      messageContent = [
        { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
        { type: 'text', text: EXTRACTION_PROMPT },
      ]
    }
  } else {
    const body = await request.json()
    const text = body.text as string

    if (!text || text.length === 0) {
      return NextResponse.json({ error: 'Texte manquant' }, { status: 400 })
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json({ error: 'Texte trop long (max 50 000 caractères)' }, { status: 400 })
    }

    messageContent = [
      { type: 'text', text: `${EXTRACTION_PROMPT}\n\nVoici le menu:\n\n${text}` },
    ]
  }

  // 5. Call Claude API
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const hasVision = Array.isArray(messageContent) && messageContent.some(
    (c) => c.type === 'image' || c.type === 'document'
  )

  try {
    const response = await anthropic.messages.create({
      model: hasVision ? 'claude-sonnet-4-20250514' : 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: messageContent }],
    })

    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'Réponse AI invalide' }, { status: 500 })
    }

    // Parse JSON from response (strip potential markdown fences)
    let jsonText = textBlock.text.trim()
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    const result: MenuImportResult = JSON.parse(jsonText)

    // 6. Record import for rate limiting
    await adminClient
      .from('menu_imports')
      .insert({ restaurant_id: restaurant.id })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Menu import error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse du menu. Réessayez.' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Run build to verify**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/menu-import/route.ts
git commit -m "feat: add AI menu extraction API route with rate limiting"
```

---

### Task 5: Create `/api/menu-import/confirm` bulk insert route

**Files:**
- Create: `src/app/api/menu-import/confirm/route.ts`

- [ ] **Step 1: Create the confirm route**

```typescript
// src/app/api/menu-import/confirm/route.ts

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { MenuImportResult } from '@/types/menu-import'

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant introuvable' }, { status: 404 })
  }

  const body = await request.json()
  const { categories, mode } = body as { categories: MenuImportResult['categories']; mode: 'replace' | 'append' }

  if (!categories || !Array.isArray(categories)) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
  }

  // If replace mode, delete existing data
  if (mode === 'replace') {
    await supabase.from('items').delete().eq('restaurant_id', restaurant.id)
    await supabase.from('categories').delete().eq('restaurant_id', restaurant.id)
  }

  let totalCategories = 0
  let totalItems = 0

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]

    const { data: newCat, error: catError } = await supabase
      .from('categories')
      .insert({
        restaurant_id: restaurant.id,
        name_fr: cat.name_fr,
        name_en: cat.name_en || null,
        sort_order: i,
      })
      .select('id')
      .single()

    if (catError || !newCat) continue
    totalCategories++

    for (let j = 0; j < cat.items.length; j++) {
      const item = cat.items[j]

      const { error: itemError } = await supabase
        .from('items')
        .insert({
          restaurant_id: restaurant.id,
          category_id: newCat.id,
          name_fr: item.name_fr,
          name_en: item.name_en || null,
          description_fr: item.description_fr || null,
          description_en: item.description_en || null,
          price: item.price,
          tags: item.tags || [],
          sort_order: j,
        })

      if (!itemError) totalItems++
    }
  }

  return NextResponse.json({
    success: true,
    categories: totalCategories,
    items: totalItems,
  })
}
```

- [ ] **Step 2: Run build to verify**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/menu-import/confirm/route.ts
git commit -m "feat: add bulk insert confirmation route for menu import"
```

---

### Task 6: Create `MenuImportWizard` component

**Files:**
- Create: `src/components/dashboard/menu-import-wizard.tsx`

- [ ] **Step 1: Create the wizard component**

```typescript
// src/components/dashboard/menu-import-wizard.tsx

'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Upload, FileText, Type, Loader2, Trash2, Plus, ChevronDown, ChevronRight,
  Sparkles, AlertCircle, Check,
} from 'lucide-react'
import type { MenuImportResult, ImportedCategory, ImportedItem } from '@/types/menu-import'

const AVAILABLE_TAGS = [
  'végétarien', 'végan', 'sans gluten', 'épicé',
  'poisson', 'viande', 'dessert', 'entrée', 'boisson',
]

type Step = 'input' | 'loading' | 'preview' | 'error' | 'success'

export function MenuImportWizard({
  restaurantId,
  mode,
  onComplete,
}: {
  restaurantId: string
  mode: 'onboarding' | 'existing'
  onComplete: () => void
}) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<Step>('input')
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<ImportedCategory[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [confirming, setConfirming] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [result, setResult] = useState<{ categories: number; items: number } | null>(null)

  // ─── Upload / Extract ─────────────────────────────────────────────

  async function handleFile(file: File) {
    setStep('loading')
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/menu-import', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'analyse')
        setStep('error')
        return
      }

      const importResult = data as MenuImportResult
      setCategories(importResult.categories)
      setExpanded(new Set(importResult.categories.map((_, i) => i)))
      setStep('preview')
    } catch {
      setError('Erreur réseau. Réessayez.')
      setStep('error')
    }
  }

  async function handleText() {
    if (!textInput.trim()) return
    setStep('loading')
    setError(null)

    try {
      const res = await fetch('/api/menu-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'analyse')
        setStep('error')
        return
      }

      const importResult = data as MenuImportResult
      setCategories(importResult.categories)
      setExpanded(new Set(importResult.categories.map((_, i) => i)))
      setStep('preview')
    } catch {
      setError('Erreur réseau. Réessayez.')
      setStep('error')
    }
  }

  // ─── Drag & drop ──────────────────────────────────────────────────

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  // ─── Preview editing ──────────────────────────────────────────────

  function updateItem(catIdx: number, itemIdx: number, field: keyof ImportedItem, value: string | number | string[]) {
    setCategories(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as ImportedCategory[]
      ;(next[catIdx].items[itemIdx] as Record<string, unknown>)[field] = value
      return next
    })
  }

  function updateCategoryName(catIdx: number, field: 'name_fr' | 'name_en', value: string) {
    setCategories(prev => {
      const next = [...prev]
      next[catIdx] = { ...next[catIdx], [field]: value }
      return next
    })
  }

  function removeItem(catIdx: number, itemIdx: number) {
    setCategories(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as ImportedCategory[]
      next[catIdx].items.splice(itemIdx, 1)
      return next
    })
  }

  function removeCategory(catIdx: number) {
    setCategories(prev => prev.filter((_, i) => i !== catIdx))
  }

  function addItem(catIdx: number) {
    setCategories(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as ImportedCategory[]
      next[catIdx].items.push({
        name_fr: '', name_en: '', description_fr: null, description_en: null, price: 0, tags: [],
      })
      return next
    })
  }

  function toggleTag(catIdx: number, itemIdx: number, tag: string) {
    setCategories(prev => {
      const next = JSON.parse(JSON.stringify(prev)) as ImportedCategory[]
      const item = next[catIdx].items[itemIdx]
      if (item.tags.includes(tag)) {
        item.tags = item.tags.filter((t: string) => t !== tag)
      } else {
        item.tags.push(tag)
      }
      return next
    })
  }

  // ─── Confirm ──────────────────────────────────────────────────────

  async function handleConfirm() {
    setConfirming(true)

    try {
      const res = await fetch('/api/menu-import/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categories,
          mode: mode === 'onboarding' ? 'replace' : 'append',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erreur lors de la création')
        setConfirming(false)
        return
      }

      setResult(data)
      setStep('success')
    } catch {
      setError('Erreur réseau. Réessayez.')
      setConfirming(false)
    }
  }

  // ─── Render ───────────────────────────────────────────────────────

  // INPUT step
  if (step === 'input') {
    return (
      <div className="space-y-6">
        {/* Drag & drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-[#2C3E2D] bg-[#2C3E2D]/5'
              : 'border-[#E8E8E4] hover:border-[#2C3E2D]/40 hover:bg-[#FAFAF7]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
          <Upload className="w-10 h-10 text-[#9B9B9B] mx-auto mb-3" />
          <div className="text-[15px] font-semibold text-[#1A1A1A] mb-1">
            Déposez votre menu ici
          </div>
          <div className="text-sm text-[#9B9B9B]">
            PDF, JPG, PNG ou WEBP — max 10 Mo
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#E8E8E4]" />
          <span className="text-xs text-[#9B9B9B] font-medium">OU</span>
          <div className="flex-1 h-px bg-[#E8E8E4]" />
        </div>

        {/* Text input */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
            Coller le texte du menu
          </label>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Entrées&#10;Soupe à l'oignon — 8.50€&#10;Salade César — 12.00€&#10;&#10;Plats principaux&#10;..."
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-[#E8E8E4] bg-white text-[#1A1A1A] placeholder:text-[#9B9B9B]/50 focus:outline-none focus:ring-2 focus:ring-[#2C3E2D]/20 focus:border-[#2C3E2D] transition-colors resize-none text-sm"
          />
          <Button
            onClick={handleText}
            disabled={!textInput.trim()}
            className="mt-3"
          >
            <Sparkles className="w-4 h-4" />
            Analyser le texte
          </Button>
        </div>
      </div>
    )
  }

  // LOADING step
  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-[#2C3E2D] animate-spin mb-4" />
        <div className="text-lg font-semibold text-[#1A1A1A] mb-1">
          Analyse de votre menu en cours...
        </div>
        <div className="text-sm text-[#9B9B9B]">
          Extraction des catégories, plats et prix
        </div>
      </div>
    )
  }

  // ERROR step
  if (step === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
        <div className="text-lg font-semibold text-[#1A1A1A] mb-1">
          Erreur d&apos;analyse
        </div>
        <div className="text-sm text-[#9B9B9B] mb-6 text-center max-w-md">
          {error}
        </div>
        <Button onClick={() => { setStep('input'); setError(null) }}>
          Réessayer
        </Button>
      </div>
    )
  }

  // SUCCESS step
  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-4">
          <Check className="w-7 h-7 text-[#2D6A4F]" />
        </div>
        <div className="text-lg font-semibold text-[#1A1A1A] mb-1">
          Menu importé avec succès !
        </div>
        <div className="text-sm text-[#9B9B9B] mb-6">
          {result?.categories} catégorie{(result?.categories ?? 0) > 1 ? 's' : ''} et {result?.items} plat{(result?.items ?? 0) > 1 ? 's' : ''} créés
        </div>
        <Button onClick={onComplete}>
          {mode === 'onboarding' ? 'Accéder au tableau de bord' : 'Voir mon menu'}
        </Button>
      </div>
    )
  }

  // PREVIEW step
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-[#9B9B9B]">
            {categories.length} catégorie{categories.length > 1 ? 's' : ''} · {totalItems} plat{totalItems > 1 ? 's' : ''}
          </div>
        </div>
        <Button onClick={() => { setStep('input'); setCategories([]) }} variant="secondary">
          Recommencer
        </Button>
      </div>

      {categories.map((cat, catIdx) => {
        const isExpanded = expanded.has(catIdx)
        return (
          <div key={catIdx} className="bg-white rounded-xl border border-[#E8E8E4] overflow-hidden">
            {/* Category header */}
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#FAFAF7] transition-colors"
              onClick={() => setExpanded(prev => {
                const next = new Set(prev)
                next.has(catIdx) ? next.delete(catIdx) : next.add(catIdx)
                return next
              })}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4 text-[#9B9B9B]" /> : <ChevronRight className="w-4 h-4 text-[#9B9B9B]" />}
              <input
                value={cat.name_fr}
                onChange={(e) => updateCategoryName(catIdx, 'name_fr', e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-[#1A1A1A] bg-transparent border-none focus:outline-none focus:ring-0 flex-1 min-w-0"
              />
              <span className="text-xs text-[#9B9B9B] mr-2">{cat.items.length} plat{cat.items.length > 1 ? 's' : ''}</span>
              <button
                onClick={(e) => { e.stopPropagation(); removeCategory(catIdx) }}
                className="text-[#9B9B9B] hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            {isExpanded && (
              <div className="border-t border-[#E8E8E4]">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="px-4 py-3 border-b border-[#E8E8E4] last:border-b-0">
                    <div className="grid grid-cols-[1fr_1fr_80px_auto] gap-2 mb-2">
                      <input
                        value={item.name_fr}
                        onChange={(e) => updateItem(catIdx, itemIdx, 'name_fr', e.target.value)}
                        placeholder="Nom (FR)"
                        className="text-sm px-2 py-1.5 rounded border border-[#E8E8E4] focus:outline-none focus:border-[#2C3E2D]"
                      />
                      <input
                        value={item.name_en}
                        onChange={(e) => updateItem(catIdx, itemIdx, 'name_en', e.target.value)}
                        placeholder="Name (EN)"
                        className="text-sm px-2 py-1.5 rounded border border-[#E8E8E4] focus:outline-none focus:border-[#2C3E2D]"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updateItem(catIdx, itemIdx, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="Prix"
                        className="text-sm px-2 py-1.5 rounded border border-[#E8E8E4] focus:outline-none focus:border-[#2C3E2D] text-right"
                      />
                      <button
                        onClick={() => removeItem(catIdx, itemIdx)}
                        className="text-[#9B9B9B] hover:text-red-500 transition-colors px-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {AVAILABLE_TAGS.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(catIdx, itemIdx, tag)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                            item.tags.includes(tag)
                              ? 'bg-[#2C3E2D] text-white'
                              : 'bg-[#F0EDE8] text-[#6B6B6B] hover:bg-[#E8E8E4]'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addItem(catIdx)}
                  className="w-full px-4 py-2.5 text-sm text-[#2C3E2D] font-medium hover:bg-[#FAFAF7] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Ajouter un plat
                </button>
              </div>
            )}
          </div>
        )
      })}

      <div className="flex justify-end gap-3 pt-2">
        <Button onClick={() => { setStep('input'); setCategories([]) }} variant="secondary">
          Annuler
        </Button>
        <Button onClick={handleConfirm} disabled={confirming || categories.length === 0}>
          {confirming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Création...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Confirmer l&apos;import ({totalItems} plat{totalItems > 1 ? 's' : ''})
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run build to verify**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/menu-import-wizard.tsx
git commit -m "feat: add MenuImportWizard component with upload, preview, and confirm"
```

---

### Task 7: Create `/dashboard/import` onboarding page

**Files:**
- Create: `src/app/dashboard/import/page.tsx`

- [ ] **Step 1: Create the import page**

```typescript
// src/app/dashboard/import/page.tsx

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MenuImportWizard } from '@/components/dashboard/menu-import-wizard'
import Link from 'next/link'

export default async function ImportPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  if (!restaurant) redirect('/signup')

  // If restaurant already has items, skip import
  const { count } = await supabase
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('restaurant_id', restaurant.id)

  if ((count ?? 0) > 0) redirect('/dashboard')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-[28px] tracking-tight text-[#1A1A1A] mb-2">
          Importez votre menu
        </h1>
        <p className="text-sm text-[#6B6B6B]">
          Téléchargez un PDF, prenez une photo ou collez le texte de votre menu existant.
          Notre IA l&apos;analysera automatiquement.
        </p>
      </div>

      <MenuImportWizard
        restaurantId={restaurant.id}
        mode="onboarding"
        onComplete={() => {}}
      />

      <div className="text-center mt-8">
        <Link
          href="/dashboard"
          className="text-sm text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
        >
          Passer cette étape →
        </Link>
      </div>
    </div>
  )
}
```

Note: The `onComplete` callback uses an empty function because navigation is handled client-side in the wizard via `router.push('/dashboard')`. Update the wizard's success button to navigate:

In `MenuImportWizard`, the success step's `onComplete` call will be replaced with direct navigation. The page passes `onComplete={() => {}}` and the wizard handles its own routing in the success handler.

- [ ] **Step 2: Run build to verify**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/import/page.tsx
git commit -m "feat: add onboarding import page"
```

---

### Task 8: Update signup and auth callback redirects

**Files:**
- Modify: `src/app/(auth)/signup/page.tsx`
- Modify: `src/app/api/auth/callback/route.ts`

- [ ] **Step 1: Update signup redirect**

In `src/app/(auth)/signup/page.tsx`, change line 67 from:

```typescript
      router.push('/dashboard')
```

to:

```typescript
      router.push('/dashboard/import')
```

- [ ] **Step 2: Update auth callback redirect**

In `src/app/api/auth/callback/route.ts`, change the default `next` value on line 9 from:

```typescript
  const next = searchParams.get('next') ?? '/dashboard'
```

to:

```typescript
  const next = searchParams.get('next') ?? '/dashboard/import'
```

- [ ] **Step 3: Run build to verify**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add "src/app/(auth)/signup/page.tsx" src/app/api/auth/callback/route.ts
git commit -m "feat: redirect new signups to menu import page"
```

---

### Task 9: Add "Scanner un menu" button to MenuManager

**Files:**
- Modify: `src/components/dashboard/menu-manager.tsx`

- [ ] **Step 1: Add import and state**

At the top of `menu-manager.tsx`, add the import:

```typescript
import { MenuImportWizard } from '@/components/dashboard/menu-import-wizard'
import { Sparkles } from 'lucide-react'
```

Note: `Sparkles` may already be imported via another icon. Add it to the existing lucide-react import if not present.

Inside the `MenuManager` component, add state:

```typescript
const [showImport, setShowImport] = useState(false)
```

- [ ] **Step 2: Add button and modal to the action bar**

In the action bar (around line 387), add the "Scanner un menu" button after the existing buttons:

```typescript
<div className="flex flex-wrap gap-3">
  <Button onClick={() => setCatModal({ open: true })} variant="secondary">
    <Plus className="w-4 h-4" />
    Catégorie
  </Button>
  <Button onClick={() => setItemModal({ open: true })}>
    <Plus className="w-4 h-4" />
    Plat
  </Button>
  <Button onClick={() => setShowImport(true)} variant="secondary">
    <Sparkles className="w-4 h-4" />
    Scanner un menu
  </Button>
</div>
```

- [ ] **Step 3: Add the import modal**

After the action bar div, add:

```typescript
{showImport && (
  <Modal open={showImport} onClose={() => setShowImport(false)} title="Importer un menu">
    <MenuImportWizard
      restaurantId={restaurantId}
      mode="existing"
      onComplete={() => { setShowImport(false); router.refresh() }}
    />
  </Modal>
)}
```

- [ ] **Step 4: Run build to verify**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/menu-manager.tsx
git commit -m "feat: add 'Scanner un menu' button to menu manager"
```

---

### Task 10: Build, deploy, and test end-to-end

**Files:** None (deployment only)

- [ ] **Step 1: Full build**

```bash
cd /Users/tiago/Montablo && npm run build
```

- [ ] **Step 2: Deploy to Vercel**

```bash
vercel deploy --prod
```

- [ ] **Step 3: Test onboarding flow**

1. Create a new account on `https://montablo.vercel.app/signup`
2. After signup, should redirect to `/dashboard/import`
3. Upload a PDF or paste text of a menu
4. Verify AI extracts categories and items
5. Edit if needed, click "Confirmer"
6. Verify redirect to `/dashboard` with menu populated

- [ ] **Step 4: Test existing user flow**

1. Log in to existing account
2. Go to "Mon menu"
3. Click "Scanner un menu"
4. Upload/paste a menu
5. Verify items are appended (not replaced)

- [ ] **Step 5: Test rate limiting**

1. Try importing 4 times in one day
2. 4th attempt should return "Limite atteinte : 3 imports par jour maximum."

- [ ] **Step 6: Test abuse protection**

1. Try uploading a file > 10MB — should be rejected
2. Try pasting text > 50,000 chars — should be rejected
3. Try without auth — should return 401
