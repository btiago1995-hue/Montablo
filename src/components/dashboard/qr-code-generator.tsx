'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button'
import { Download, Copy, Check, ExternalLink } from 'lucide-react'

export function QRCodeGenerator({
  menuUrl,
  restaurantName,
}: {
  menuUrl: string
  restaurantName: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [size, setSize] = useState(300)
  const [color, setColor] = useState('#1E3932')

  useEffect(() => {
    if (!canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, menuUrl, {
      width: size,
      margin: 2,
      color: {
        dark: color,
        light: '#FFFFFF',
      },
    })
  }, [menuUrl, size, color])

  function handleDownload() {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `qr-${restaurantName.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(menuUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Preview */}
      <div className="bg-white rounded-2xl border border-border p-8 flex flex-col items-center">
        <canvas ref={canvasRef} className="rounded-lg" />
        <p className="mt-4 text-sm text-muted text-center break-all">{menuUrl}</p>
        <div className="flex gap-3 mt-6">
          <Button onClick={handleDownload} variant="primary">
            <Download className="w-4 h-4" />
            Télécharger PNG
          </Button>
          <Button onClick={handleCopy} variant="secondary">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copié !' : 'Copier le lien'}
          </Button>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-serif text-xl text-primary mb-4">Personnalisation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Taille (px)
              </label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value={200}>Petit (200px)</option>
                <option value={300}>Moyen (300px)</option>
                <option value={500}>Grand (500px)</option>
                <option value={800}>Très grand (800px)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Couleur
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                />
                <span className="text-sm text-muted">{color}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <h2 className="font-serif text-xl text-primary mb-3">Conseils</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>• Imprimez le QR code en taille suffisante (min. 3×3 cm)</li>
            <li>• Placez-le sur chaque table, au comptoir, ou en vitrine</li>
            <li>• Testez le scan avant d&apos;imprimer en grande quantité</li>
            <li>• Utilisez un fond blanc pour un meilleur contraste</li>
          </ul>
        </div>

        <a
          href={menuUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          Voir votre menu en ligne
        </a>
      </div>
    </div>
  )
}
