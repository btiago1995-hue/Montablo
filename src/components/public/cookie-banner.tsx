'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'montablo_cookie_consent'
const CONSENT_VERSION = 1

type ConsentStatus = 'accepted' | 'rejected'

type ConsentRecord = {
  version: number
  status: ConsentStatus
  timestamp: string
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentRecord
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function writeConsent(status: ConsentStatus) {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    status,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  window.dispatchEvent(new CustomEvent('montablo:consent', { detail: record }))
}

export function openCookieBanner() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('montablo:open-consent'))
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (!existing) {
      const t = setTimeout(() => {
        setVisible(true)
        requestAnimationFrame(() => setAnimateIn(true))
      }, 600)
      return () => clearTimeout(t)
    }

    function onOpen() {
      setVisible(true)
      requestAnimationFrame(() => setAnimateIn(true))
    }
    window.addEventListener('montablo:open-consent', onOpen)
    return () => window.removeEventListener('montablo:open-consent', onOpen)
  }, [])

  function close() {
    setAnimateIn(false)
    setTimeout(() => setVisible(false), 250)
  }

  function handleAccept() {
    writeConsent('accepted')
    close()
  }

  function handleReject() {
    writeConsent('rejected')
    close()
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className={`fixed inset-x-0 bottom-0 z-[60] px-3 sm:px-6 pb-3 sm:pb-6 pointer-events-none transition-opacity duration-250 ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`pointer-events-auto max-w-[920px] mx-auto bg-white border border-border rounded-2xl shadow-[0_30px_60px_rgba(30,57,50,0.18),0_10px_20px_rgba(30,57,50,0.08)] p-5 sm:p-6 transition-transform duration-250 ${
          animateIn ? 'translate-y-0' : 'translate-y-3'
        }`}
      >
        <div className="grid sm:grid-cols-[1fr_auto] gap-5 sm:gap-8 items-start sm:items-center">
          <div>
            <p
              id="cookie-banner-title"
              className="font-serif text-[18px] sm:text-[20px] text-primary font-medium leading-snug mb-1.5"
            >
              Quelques cookies, en toute transparence.
            </p>
            <p className="text-[14px] text-muted leading-relaxed">
              MonTablo utilise des cookies essentiels pour faire fonctionner le site
              (connexion, sécurité). Avec votre accord, nous ajoutons un cookie de mesure
              d&apos;audience Google pour comprendre d&apos;où viennent nos visiteurs.{' '}
              <Link
                href="/cookies"
                className="text-primary underline-offset-2 hover:underline font-medium"
              >
                En savoir plus
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReject}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-primary bg-white border border-primary hover:bg-primary hover:text-background transition whitespace-nowrap"
            >
              Tout refuser
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-primary text-background hover:bg-green-classic transition whitespace-nowrap"
            >
              Tout accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
