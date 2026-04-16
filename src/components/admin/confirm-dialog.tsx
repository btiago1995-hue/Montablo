// src/components/admin/confirm-dialog.tsx
'use client'

import { useState, useTransition } from 'react'
import type { ReactNode } from 'react'

type Props = {
  label: string
  description: string
  confirmLabel: string
  onConfirm: () => Promise<{ error?: string }>
  variant?: 'danger' | 'default'
  icon?: ReactNode
}

export function ConfirmDialog({ label, description, confirmLabel, onConfirm, variant = 'default', icon }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleConfirm() {
    startTransition(async () => {
      const result = await onConfirm()
      if (result.error) {
        setError(result.error)
      } else {
        setOpen(false)
      }
    })
  }

  const btnClass = variant === 'danger'
    ? 'bg-red-700 hover:bg-red-600 text-white'
    : 'bg-blue-600 hover:bg-blue-500 text-white'

  const triggerClass = variant === 'danger'
    ? 'bg-red-950 border-red-900 text-red-400 hover:bg-red-900'
    : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'

  return (
    <>
      <button
        type="button"
        onClick={() => { setError(null); setOpen(true) }}
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors w-full ${triggerClass}`}
      >
        {icon}
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-sm p-6">
            <h2 className="text-sm font-semibold text-slate-200 mb-2">{label}</h2>
            <p className="text-sm text-slate-400 mb-5">{description}</p>
            {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className={`px-4 py-2 text-sm rounded-lg font-medium disabled:opacity-50 ${btnClass}`}
              >
                {isPending ? 'A processar...' : confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
