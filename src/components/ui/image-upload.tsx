'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ImageUpload({
  value,
  onChange,
  className,
  aspect = 'square',
  hint,
}: {
  value: string | null
  onChange: (url: string | null) => void
  className?: string
  aspect?: 'square' | 'wide'
  hint?: string
}) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setUploading(false); return }

    const ext = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, file, { upsert: true })

    if (error) {
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(data.path)

    onChange(publicUrl)
    setUploading(false)
  }

  function handleRemove() {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div
      className={cn(
        'relative border-2 border-dashed border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors group',
        aspect === 'wide' ? 'aspect-[3/1]' : 'aspect-square',
        className
      )}
      onClick={() => !uploading && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {value ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleRemove() }}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted gap-2">
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Upload className="w-6 h-6" />
              <span className="text-xs">Cliquez pour ajouter</span>
              {hint && <span className="text-[10px] text-muted/60">{hint}</span>}
            </>
          )}
        </div>
      )}
    </div>
  )
}
