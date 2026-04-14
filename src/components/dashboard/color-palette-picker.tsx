'use client'

import { useState } from 'react'

const PALETTES = [
  { id: 'classique', name: 'Classique', primary: '#2C3E2D', accent: '#D4A574' },
  { id: 'elegant', name: 'Élégant', primary: '#1B1B2F', accent: '#E8D5B7' },
  { id: 'bistrot', name: 'Bistrot', primary: '#8B2500', accent: '#F5E6C8' },
  { id: 'moderne', name: 'Moderne', primary: '#0D4F4F', accent: '#F0E6D3' },
] as const

export type PaletteId = typeof PALETTES[number]['id']

export function ColorPalettePicker({
  defaultPalette,
  onSelect,
}: {
  defaultPalette?: PaletteId
  onSelect: (primary: string, accent: string) => void
}) {
  const [selected, setSelected] = useState<PaletteId>(defaultPalette ?? 'classique')

  return (
    <div>
      <h3 className="text-[13px] font-bold uppercase tracking-[0.06em] text-muted mb-3">
        Style de votre menu
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setSelected(p.id)
              onSelect(p.primary, p.accent)
            }}
            className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
              selected === p.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-accent'
            }`}
          >
            <div className="flex gap-1">
              <span className="w-6 h-6 rounded-md" style={{ background: p.primary }} />
              <span className="w-6 h-6 rounded-md" style={{ background: p.accent }} />
            </div>
            <span className="text-[13px] font-semibold text-foreground">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
