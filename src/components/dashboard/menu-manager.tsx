'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Category, Item } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input, Textarea } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import { ImageUpload } from '@/components/ui/image-upload'
import { MenuImportWizard } from '@/components/dashboard/menu-import-wizard'
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Languages,
  Sparkles,
} from 'lucide-react'

async function autoTranslate(texts: Record<string, string>): Promise<Record<string, string | null>> {
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts }),
    })
    if (!res.ok) return {}
    const { translations } = await res.json()
    return translations ?? {}
  } catch {
    return {}
  }
}

// ─── Category Form ──────────────────────────────────────────────────

function CategoryForm({
  initial,
  restaurantId,
  onDone,
}: {
  initial?: Category
  restaurantId: string
  onDone: () => void
}) {
  const [nameFr, setNameFr] = useState(initial?.name_fr ?? '')
  const [nameEn, setNameEn] = useState(initial?.name_en ?? '')
  const [showEn, setShowEn] = useState(!!initial?.name_en)
  const [icon, setIcon] = useState(initial?.icon ?? '')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    // Auto-translate if no manual English override
    let finalNameEn = nameEn || null
    if (!nameEn && nameFr.trim()) {
      const translations = await autoTranslate({ name: nameFr })
      finalNameEn = translations.name || null
    }

    if (initial) {
      await supabase
        .from('categories')
        .update({ name_fr: nameFr, name_en: finalNameEn, icon: icon || null })
        .eq('id', initial.id)
    } else {
      await supabase.from('categories').insert({
        restaurant_id: restaurantId,
        name_fr: nameFr,
        name_en: finalNameEn,
        icon: icon || null,
      })
    }

    router.refresh()
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom *"
        value={nameFr}
        onChange={(e) => setNameFr(e.target.value)}
        required
        placeholder="Entrées, Plats, Desserts..."
      />
      <Input
        label="Icône (emoji)"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="🥗"
      />
      {showEn ? (
        <Input
          label="Traduction anglaise (optionnel)"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder="Starters, Mains, Desserts..."
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowEn(true)}
          className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          <Languages className="w-3.5 h-3.5" />
          Modifier la traduction anglaise
        </button>
      )}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-[#9B9B9B] flex items-center gap-1">
          <Languages className="w-3 h-3" />
          Traduction automatique FR → EN
        </span>
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onDone}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading || !nameFr.trim()}>
            {loading ? 'Traduction & sauvegarde...' : initial ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </div>
    </form>
  )
}

// ─── Item Form ──────────────────────────────────────────────────────

function ItemForm({
  initial,
  restaurantId,
  categories,
  defaultCategoryId,
  onDone,
}: {
  initial?: Item
  restaurantId: string
  categories: Category[]
  defaultCategoryId?: string
  onDone: () => void
}) {
  const [nameFr, setNameFr] = useState(initial?.name_fr ?? '')
  const [nameEn, setNameEn] = useState(initial?.name_en ?? '')
  const [descFr, setDescFr] = useState(initial?.description_fr ?? '')
  const [descEn, setDescEn] = useState(initial?.description_en ?? '')
  const [price, setPrice] = useState(initial?.price?.toString() ?? '')
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? defaultCategoryId ?? categories[0]?.id ?? '')
  const [tags, setTags] = useState(initial?.tags?.join(', ') ?? '')
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? null)
  const [showEn, setShowEn] = useState(!!(initial?.name_en || initial?.description_en))
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()

    // Auto-translate French fields that don't have manual English overrides
    let finalNameEn = nameEn || null
    let finalDescEn = descEn || null

    const toTranslate: Record<string, string> = {}
    if (!nameEn && nameFr.trim()) toTranslate.name = nameFr
    if (!descEn && descFr.trim()) toTranslate.desc = descFr

    if (Object.keys(toTranslate).length > 0) {
      const translations = await autoTranslate(toTranslate)
      if (!nameEn && translations.name) finalNameEn = translations.name
      if (!descEn && translations.desc) finalDescEn = translations.desc
    }

    const data = {
      name_fr: nameFr,
      name_en: finalNameEn,
      description_fr: descFr || null,
      description_en: finalDescEn,
      price: parseFloat(price),
      category_id: categoryId || null,
      image_url: imageUrl,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }

    if (initial) {
      await supabase.from('items').update(data).eq('id', initial.id)
    } else {
      await supabase.from('items').insert({
        ...data,
        restaurant_id: restaurantId,
      })
    }

    router.refresh()
    onDone()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom du plat *"
        value={nameFr}
        onChange={(e) => setNameFr(e.target.value)}
        required
        placeholder="Salade César"
      />
      <Textarea
        label="Description"
        value={descFr}
        onChange={(e) => setDescFr(e.target.value)}
        placeholder="Laitue romaine, croûtons, parmesan..."
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Prix (€) *"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="12.50"
        />
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Catégorie
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Sans catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon ? `${cat.icon} ` : ''}{cat.name_fr}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Photo du plat
        </label>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          className="w-32 h-32"
          hint="600 × 600 px"
        />
      </div>
      <Input
        label="Tags (séparés par des virgules)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Végétarien, Sans gluten, Épicé"
      />
      {showEn ? (
        <div className="space-y-3 p-4 bg-[#F5F5F2] rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6B6B6B] flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              Traduction anglaise (optionnel)
            </span>
            <button
              type="button"
              onClick={() => { setShowEn(false); setNameEn(''); setDescEn('') }}
              className="text-[11px] text-[#9B9B9B] hover:text-[#1A1A1A]"
            >
              Utiliser la traduction auto
            </button>
          </div>
          <Input
            label="Nom (EN)"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="Caesar Salad"
          />
          <Textarea
            label="Description (EN)"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Romaine lettuce, croutons, parmesan..."
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowEn(true)}
          className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          <Languages className="w-3.5 h-3.5" />
          Modifier la traduction anglaise
        </button>
      )}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-[#9B9B9B] flex items-center gap-1">
          <Languages className="w-3 h-3" />
          Traduction automatique FR → EN
        </span>
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onDone}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading || !nameFr.trim() || !price}>
            {loading ? 'Traduction & sauvegarde...' : initial ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      </div>
    </form>
  )
}

// ─── Main Manager ───────────────────────────────────────────────────

export function MenuManager({
  restaurantId,
  initialCategories,
  initialItems,
}: {
  restaurantId: string
  initialCategories: Category[]
  initialItems: Item[]
}) {
  const router = useRouter()
  const [showImport, setShowImport] = useState(false)
  const [catModal, setCatModal] = useState<{ open: boolean; edit?: Category }>({ open: false })
  const [itemModal, setItemModal] = useState<{ open: boolean; edit?: Item; defaultCategoryId?: string }>({ open: false })
  const [expanded, setExpanded] = useState<Set<string>>(new Set(initialCategories.map((c) => c.id)))
  const [deleting, setDeleting] = useState<string | null>(null)

  const supabase = createClient()

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function deleteCategory(id: string) {
    if (!confirm('Supprimer cette catégorie ? Les plats ne seront pas supprimés.')) return
    setDeleting(id)
    await supabase.from('categories').delete().eq('id', id)
    router.refresh()
    setDeleting(null)
  }

  async function deleteItem(id: string) {
    if (!confirm('Supprimer ce plat ?')) return
    setDeleting(id)
    await supabase.from('items').delete().eq('id', id)
    router.refresh()
    setDeleting(null)
  }

  async function toggleAvailability(item: Item) {
    await supabase.from('items').update({ is_available: !item.is_available }).eq('id', item.id)
    router.refresh()
  }

  async function toggleCategoryVisibility(cat: Category) {
    await supabase.from('categories').update({ is_visible: !cat.is_visible }).eq('id', cat.id)
    router.refresh()
  }

  // Items without a category
  const uncategorizedItems = initialItems.filter((item) => !item.category_id)

  return (
    <div className="space-y-6">
      {/* Action bar */}
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

      {showImport && (
        <Modal open={showImport} onClose={() => setShowImport(false)} title="Importer un menu">
          <MenuImportWizard
            restaurantId={restaurantId}
            mode="existing"
            onComplete={() => {
              setShowImport(false)
              router.refresh()
            }}
          />
        </Modal>
      )}

      {/* Categories with items */}
      {initialCategories.map((category) => {
        const catItems = initialItems.filter((item) => item.category_id === category.id)
        const isExpanded = expanded.has(category.id)

        return (
          <div key={category.id} className="bg-white rounded-xl border border-border overflow-hidden">
            {/* Category header */}
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-background/50 transition-colors"
              onClick={() => toggleExpand(category.id)}
            >
              <GripVertical className="w-4 h-4 text-muted/40 shrink-0" />
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted shrink-0" />
              )}
              <span className="text-lg mr-1">{category.icon}</span>
              <h3 className="font-medium text-foreground flex-1">
                {category.name_fr}
                {category.name_en && (
                  <span className="text-muted font-normal ml-2 text-sm">
                    / {category.name_en}
                  </span>
                )}
              </h3>
              <span className="text-xs text-muted bg-background px-2 py-1 rounded-full">
                {catItems.length} plat{catItems.length !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center gap-1 ml-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => toggleCategoryVisibility(category)}
                  className="p-1.5 text-muted hover:text-foreground transition-colors"
                  title={category.is_visible ? 'Masquer' : 'Afficher'}
                >
                  {category.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setCatModal({ open: true, edit: category })}
                  className="p-1.5 text-muted hover:text-foreground transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  disabled={deleting === category.id}
                  className="p-1.5 text-muted hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            {isExpanded && (
              <div className="border-t border-border divide-y divide-border">
                {catItems.length === 0 ? (
                  <div className="px-5 py-6 text-center text-sm text-muted">
                    Aucun plat dans cette catégorie.
                    <button
                      onClick={() => setItemModal({ open: true, defaultCategoryId: category.id })}
                      className="text-primary hover:underline ml-1"
                    >
                      Ajouter un plat
                    </button>
                  </div>
                ) : (
                  catItems.map((item) => (
                    <ItemRow
                      key={item.id}
                      item={item}
                      deleting={deleting === item.id}
                      onEdit={() => setItemModal({ open: true, edit: item })}
                      onDelete={() => deleteItem(item.id)}
                      onToggle={() => toggleAvailability(item)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Uncategorized items */}
      {uncategorizedItems.length > 0 && (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-medium text-muted">Sans catégorie</h3>
          </div>
          <div className="divide-y divide-border">
            {uncategorizedItems.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                deleting={deleting === item.id}
                onEdit={() => setItemModal({ open: true, edit: item })}
                onDelete={() => deleteItem(item.id)}
                onToggle={() => toggleAvailability(item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {initialCategories.length === 0 && initialItems.length === 0 && (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <p className="text-muted mb-4">
            Commencez par créer une catégorie, puis ajoutez vos plats.
          </p>
          <Button onClick={() => setCatModal({ open: true })}>
            <Plus className="w-4 h-4" />
            Créer une catégorie
          </Button>
        </div>
      )}

      {/* Modals */}
      <Modal
        open={catModal.open}
        onClose={() => setCatModal({ open: false })}
        title={catModal.edit ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
      >
        <CategoryForm
          initial={catModal.edit}
          restaurantId={restaurantId}
          onDone={() => setCatModal({ open: false })}
        />
      </Modal>

      <Modal
        open={itemModal.open}
        onClose={() => setItemModal({ open: false })}
        title={itemModal.edit ? 'Modifier le plat' : 'Nouveau plat'}
      >
        <ItemForm
          initial={itemModal.edit}
          restaurantId={restaurantId}
          categories={initialCategories}
          defaultCategoryId={itemModal.defaultCategoryId}
          onDone={() => setItemModal({ open: false })}
        />
      </Modal>
    </div>
  )
}

// ─── Item Row ───────────────────────────────────────────────────────

function ItemRow({
  item,
  deleting,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: Item
  deleting: boolean
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}) {
  return (
    <div className={`flex items-center gap-4 px-5 py-3 ${!item.is_available ? 'opacity-50' : ''}`}>
      <GripVertical className="w-4 h-4 text-muted/40 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-foreground truncate">{item.name_fr}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="hidden sm:flex gap-1">
              {item.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs bg-background text-muted px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {item.description_fr && (
          <p className="text-sm text-muted truncate">{item.description_fr}</p>
        )}
      </div>
      <span className="font-medium text-foreground shrink-0">{formatPrice(item.price)}</span>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onToggle}
          className="p-1.5 text-muted hover:text-foreground transition-colors"
          title={item.is_available ? 'Marquer indisponible' : 'Marquer disponible'}
        >
          {item.is_available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button
          onClick={onEdit}
          className="p-1.5 text-muted hover:text-foreground transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="p-1.5 text-muted hover:text-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
