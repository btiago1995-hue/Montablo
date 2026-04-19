declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

const ADS_ID = 'AW-18093408110'
const SIGNUP_LABEL = '3qA3CNWv5ZwcEO7-zbND'

export function trackSignup() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'conversion', {
    send_to: `${ADS_ID}/${SIGNUP_LABEL}`,
    value: 1.0,
    currency: 'EUR',
  })
}

export function trackCTAClick(label: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'generate_lead', {
    send_to: ADS_ID,
    event_label: label,
    value: 0.1,
    currency: 'EUR',
  })
}
