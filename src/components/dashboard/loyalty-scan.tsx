'use client'

import { useEffect, useRef, useState } from 'react'

type ScanResult = { customer_name: string; current_value: number } | null

export function LoyaltyScan() {
  const scannerRef = useRef<{ stop?: () => Promise<void> } | null>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult>(null)
  const [error, setError] = useState<string | null>(null)
  const [stamping, setStamping] = useState(false)
  const [done, setDone] = useState(false)
  const [scannedCardId, setScannedCardId] = useState<string | null>(null)

  useEffect(() => {
    startScanner()
    return () => {
      scannerRef.current?.stop?.()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startScanner() {
    setError(null)
    setResult(null)
    setDone(false)
    setScannedCardId(null)
    setScanning(true)

    const { Html5Qrcode } = await import('html5-qrcode')
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    await scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      async (decodedText: string) => {
        await scanner.stop()
        setScanning(false)
        setScannedCardId(decodedText)

        const res = await fetch(`/api/loyalty/cards/${decodedText}/info`)
        if (!res.ok) {
          setError('Carte non reconnue. Vérifiez le QR code.')
          return
        }
        const data = await res.json()
        setResult(data)
      },
      () => {},
    ).catch(() => {
      setScanning(false)
      setError("Impossible d'accéder à la caméra.")
    })
  }

  async function handleStamp() {
    if (!scannedCardId) return
    setStamping(true)
    const res = await fetch(`/api/loyalty/cards/${scannedCardId}/stamp`, { method: 'POST' })
    if (res.ok) {
      setDone(true)
    }
    setStamping(false)
  }

  async function handleRedeem() {
    if (!scannedCardId) return
    setStamping(true)
    await fetch(`/api/loyalty/cards/${scannedCardId}/redeem`, { method: 'POST' })
    setDone(true)
    setStamping(false)
  }

  if (done) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="font-serif text-2xl mb-4">Fait !</h2>
        <button
          onClick={startScanner}
          className="bg-[#2C3E2D] text-white px-6 py-3 rounded-xl text-sm font-medium"
        >
          Scanner un autre client
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      {scanning && (
        <div>
          <div id="qr-reader" className="w-full rounded-xl overflow-hidden" />
          <p className="text-center text-sm text-muted mt-3">Pointez la caméra vers le QR code du client</p>
        </div>
      )}

      {!scanning && !result && (
        <div className="text-center py-8">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={startScanner}
            className="bg-[#2C3E2D] text-white px-8 py-4 rounded-xl text-base font-medium w-full"
          >
            📷 Réessayer
          </button>
        </div>
      )}

      {result && !done && (
        <div className="bg-white border border-[#E8E8E4] rounded-xl p-6 text-center space-y-4">
          <div className="text-3xl">👤</div>
          <h3 className="font-serif text-xl">{result.customer_name}</h3>
          <p className="text-sm text-muted">Valeur actuelle : {result.current_value}</p>
          <div className="flex gap-3">
            <button
              onClick={handleStamp}
              disabled={stamping}
              className="flex-1 bg-[#2C3E2D] text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {stamping ? '...' : '+ Ajouter un tampon'}
            </button>
            <button
              onClick={handleRedeem}
              disabled={stamping}
              className="flex-1 bg-amber-500 text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              🎁 Utiliser la récompense
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
