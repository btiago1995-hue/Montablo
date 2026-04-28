'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { readConsent } from './cookie-banner'

const GOOGLE_ADS_ID = 'AW-18093408110'

/**
 * Loads Google Ads gtag.js only after the user has explicitly accepted cookies.
 * CNIL/RGPD: non-essential analytics cookies require prior consent.
 * Listens for the 'montablo:consent' event to react to live consent changes.
 */
export function AnalyticsScripts() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (existing?.status === 'accepted') setEnabled(true)

    function onConsent(e: Event) {
      const detail = (e as CustomEvent<{ status: 'accepted' | 'rejected' }>).detail
      if (detail?.status === 'accepted') setEnabled(true)
      else setEnabled(false)
    }
    window.addEventListener('montablo:consent', onConsent)
    return () => window.removeEventListener('montablo:consent', onConsent)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  )
}
