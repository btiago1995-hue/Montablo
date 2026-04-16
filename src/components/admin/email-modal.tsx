// src/components/admin/email-modal.tsx
'use client'

import { useState, useTransition } from 'react'
import { Mail, X } from 'lucide-react'

type Props = {
  onSend: (subject: string, body: string) => Promise<{ error?: string }>
}

export function EmailModal({ onSend }: Props) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isPending, startTransition] = useTransition()

  function handleSend() {
    startTransition(async () => {
      const result = await onSend(subject, body)
      if (result.error) {
        setStatus('error')
      } else {
        setStatus('success')
        setSubject('')
        setBody('')
        setTimeout(() => { setOpen(false); setStatus('idle') }, 1500)
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 text-sm font-medium hover:bg-emerald-900 transition-colors w-full"
      >
        <Mail className="w-4 h-4" />
        Enviar email manual
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
              <h2 className="text-sm font-semibold text-slate-200">Enviar email</h2>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Assunto"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full"
              />
              <textarea
                placeholder="Corpo do email..."
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={6}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full resize-none"
              />
              {status === 'error' && <p className="text-xs text-red-400">Erro ao enviar. Tenta de novo.</p>}
              {status === 'success' && <p className="text-xs text-emerald-400">Email enviado com sucesso.</p>}
            </div>
            <div className="px-5 pb-5 flex gap-2 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleSend}
                disabled={!subject || !body || isPending}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'A enviar...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
