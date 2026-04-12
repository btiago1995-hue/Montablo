'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import type { MenuImportResult, ImportedCategory, ImportedItem } from '@/types/menu-import'
import {
  Upload,
  Loader2,
  Trash2,
  Plus,
  ChevronDown,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Check,
} from 'lucide-react'

type Step = 'input' | 'loading' | 'preview' | 'error' | 'success'

const AVAILABLE_TAGS = [
  'végétarien',
  'végan',
  'sans gluten',
  'épicé',
  'poisson',
  'viande',
  'dessert',
  'entrée',
  'boisson',
]

const ACCEPTED_FILE_TYPES = '.pdf,image/jpeg,image/png,image/webp'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function MenuImportWizard({
  restaurantId,
  mode,
  onComplete,
}: {
  restaurantId: string
  mode: 'onboarding' | 'existing'
  onComplete: () => void
}) {
  const [step, setStep] = useState<Step>('input')
  const [errorMessage, setErrorMessage] = useState('')
  const [categories, setCategories] = useState<ImportedCategory[]>([])
  const [expandedCats, setExpandedCats] = useState<Set<number>>(new Set())
  const [successCounts, setSuccessCounts] = useState({ categories: 0, items: 0 })

  // Input step state
  const [menuText, setMenuText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ─── Input Step Handlers ─────────────────────────────────────────

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) validateAndSetFile(dropped)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (selected) validateAndSetFile(selected)
  }

  function validateAndSetFile(f: File) {
    if (f.size > MAX_FILE_SIZE) {
      setErrorMessage('Le fichier ne doit pas dépasser 10 Mo.')
      setStep('error')
      return
    }
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(f.type)) {
      setErrorMessage('Format non supporté. Utilisez PDF, JPEG, PNG ou WebP.')
      setStep('error')
      return
    }
    setFile(f)
    setMenuText('')
  }

  async function handleSubmit() {
    setStep('loading')
    try {
      let res: Response

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('restaurantId', restaurantId)
        res = await fetch('/api/menu-import', {
          method: 'POST',
          body: formData,
        })
      } else {
        res = await fetch('/api/menu-import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: menuText, restaurantId }),
        })
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erreur lors de l\'analyse du menu.')
      }

      const data: MenuImportResult = await res.json()
      setCategories(data.categories)
      setExpandedCats(new Set(data.categories.map((_, i) => i)))
      setStep('preview')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue.')
      setStep('error')
    }
  }

  // ─── Preview Step Handlers ───────────────────────────────────────

  function toggleCat(index: number) {
    setExpandedCats((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function updateItem(catIdx: number, itemIdx: number, field: keyof ImportedItem, value: string | number | string[]) {
    setCategories((prev) => {
      const next = [...prev]
      const cat = { ...next[catIdx], items: [...next[catIdx].items] }
      cat.items[itemIdx] = { ...cat.items[itemIdx], [field]: value }
      next[catIdx] = cat
      return next
    })
  }

  function toggleTag(catIdx: number, itemIdx: number, tag: string) {
    const item = categories[catIdx].items[itemIdx]
    const tags = item.tags.includes(tag)
      ? item.tags.filter((t) => t !== tag)
      : [...item.tags, tag]
    updateItem(catIdx, itemIdx, 'tags', tags)
  }

  function deleteItem(catIdx: number, itemIdx: number) {
    setCategories((prev) => {
      const next = [...prev]
      const cat = { ...next[catIdx], items: next[catIdx].items.filter((_, i) => i !== itemIdx) }
      next[catIdx] = cat
      return next
    })
  }

  function deleteCategory(catIdx: number) {
    setCategories((prev) => prev.filter((_, i) => i !== catIdx))
  }

  function addItem(catIdx: number) {
    setCategories((prev) => {
      const next = [...prev]
      const cat = {
        ...next[catIdx],
        items: [
          ...next[catIdx].items,
          { name_fr: '', name_en: '', description_fr: null, description_en: null, price: 0, tags: [] },
        ],
      }
      next[catIdx] = cat
      return next
    })
    setExpandedCats((prev) => new Set(Array.from(prev).concat(catIdx)))
  }

  const handleReset = useCallback(() => {
    setStep('input')
    setFile(null)
    setMenuText('')
    setCategories([])
    setErrorMessage('')
  }, [])

  async function handleConfirm() {
    setStep('loading')
    try {
      const res = await fetch('/api/menu-import/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId,
          categories,
          mode: mode === 'onboarding' ? 'replace' : 'append',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erreur lors de la confirmation.')
      }

      const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
      setSuccessCounts({ categories: categories.length, items: totalItems })
      setStep('success')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue.')
      setStep('error')
    }
  }

  // ─── Render ──────────────────────────────────────────────────────

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted text-sm">Analyse de votre menu en cours...</p>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-foreground text-sm text-center max-w-md">{errorMessage}</p>
        <Button variant="secondary" onClick={handleReset}>
          Réessayer
        </Button>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-serif text-xl text-foreground">Menu importé avec succès !</h3>
        <p className="text-muted text-sm">
          {successCounts.categories} catégorie{successCounts.categories !== 1 ? 's' : ''} et{' '}
          {successCounts.items} plat{successCounts.items !== 1 ? 's' : ''} importés.
        </p>
        <Button onClick={onComplete}>Continuer</Button>
      </div>
    )
  }

  if (step === 'preview') {
    return (
      <div className="space-y-4">
        {categories.map((cat, catIdx) => {
          const isExpanded = expandedCats.has(catIdx)
          return (
            <div key={catIdx} className="border border-border rounded-lg overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-background/50">
                <button type="button" onClick={() => toggleCat(catIdx)} className="shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted" />
                  )}
                </button>
                <span className="font-medium text-foreground flex-1 text-sm">
                  {cat.name_fr}
                  {cat.name_en && (
                    <span className="text-muted font-normal ml-2">/ {cat.name_en}</span>
                  )}
                </span>
                <span className="text-xs text-muted">
                  {cat.items.length} plat{cat.items.length !== 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  onClick={() => deleteCategory(catIdx)}
                  className="p-1 text-muted hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              {isExpanded && (
                <div className="divide-y divide-border">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="px-4 py-3 space-y-2">
                      {/* Fields grid: responsive */}
                      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-2 items-start">
                        <input
                          type="text"
                          value={item.name_fr}
                          onChange={(e) => updateItem(catIdx, itemIdx, 'name_fr', e.target.value)}
                          placeholder="Nom (FR)"
                          className="px-3 py-1.5 text-sm rounded border border-border bg-white text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
                        />
                        <input
                          type="text"
                          value={item.name_en}
                          onChange={(e) => updateItem(catIdx, itemIdx, 'name_en', e.target.value)}
                          placeholder="Name (EN)"
                          className="px-3 py-1.5 text-sm rounded border border-border bg-white text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20"
                        />
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.price || ''}
                          onChange={(e) => updateItem(catIdx, itemIdx, 'price', parseFloat(e.target.value) || 0)}
                          placeholder="Prix"
                          className="px-3 py-1.5 text-sm rounded border border-border bg-white text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 w-full sm:w-24"
                        />
                        <button
                          type="button"
                          onClick={() => deleteItem(catIdx, itemIdx)}
                          className="p-1.5 text-muted hover:text-red-600 transition-colors self-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {AVAILABLE_TAGS.map((tag) => {
                          const active = item.tags.includes(tag)
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(catIdx, itemIdx, tag)}
                              className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                                active
                                  ? 'bg-primary text-white border-primary'
                                  : 'bg-white text-muted border-border hover:border-primary/40'
                              }`}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                  {/* Add item button */}
                  <div className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => addItem(catIdx)}
                      className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Ajouter un plat
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="secondary" onClick={handleReset} className="flex-1 sm:flex-none">
            Recommencer
          </Button>
          <Button onClick={handleConfirm} className="flex-1 sm:flex-none sm:ml-auto">
            <Sparkles className="w-4 h-4" />
            Confirmer l&apos;import
          </Button>
        </div>
      </div>
    )
  }

  // ─── Input Step ──────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* File drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-primary bg-primary/5'
            : file
              ? 'border-primary/40 bg-primary/5'
              : 'border-border hover:border-primary/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="w-8 h-8 text-muted mx-auto mb-3" />
        {file ? (
          <p className="text-sm text-foreground font-medium">{file.name}</p>
        ) : (
          <>
            <p className="text-sm text-foreground font-medium">
              Glissez un PDF ou une image de votre menu
            </p>
            <p className="text-xs text-muted mt-1">PDF, JPEG, PNG, WebP - max 10 Mo</p>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted font-medium uppercase">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Text input */}
      <div>
        <textarea
          value={menuText}
          onChange={(e) => {
            setMenuText(e.target.value)
            if (e.target.value) setFile(null)
          }}
          placeholder="Collez le texte de votre menu ici..."
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none text-sm"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!file && !menuText.trim()}
        className="w-full"
      >
        <Sparkles className="w-4 h-4" />
        Analyser le texte
      </Button>
    </div>
  )
}
