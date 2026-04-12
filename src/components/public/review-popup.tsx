'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

const POPUP_DELAY_MS = 10_000 // 10 seconds
const STORAGE_KEY = 'montablo_review_dismissed'

export function ReviewPopup({
  restaurantId,
  googleReviewUrl,
  restaurantName,
  logoUrl,
  primaryColor,
}: {
  restaurantId: string
  googleReviewUrl: string
  restaurantName: string
  logoUrl: string | null
  primaryColor: string
}) {
  const [visible, setVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [step, setStep] = useState<'stars' | 'thankyou'>('stars')

  useEffect(() => {
    // Don't show if already dismissed in this session
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => {
      setVisible(true)
      requestAnimationFrame(() => setAnimateIn(true))
    }, POPUP_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => {
    setAnimateIn(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
    setTimeout(() => setVisible(false), 300)
  }, [])

  function handleRate(stars: number) {
    setRating(stars)

    // Save rating to backend
    fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId, rating: stars }),
    }).catch(() => {})

    if (stars === 5) {
      // Redirect to Google My Business
      sessionStorage.setItem(STORAGE_KEY, '1')
      window.open(googleReviewUrl, '_blank')
      setAnimateIn(false)
      setTimeout(() => setVisible(false), 300)
    } else {
      // Show thank you message
      setStep('thankyou')
    }
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-colors duration-300 ${
        animateIn ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-t-[24px] w-full max-w-[430px] transition-transform duration-300 ease-out ${
          animateIn ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pt-8 pb-8 text-center">
          {step === 'stars' ? (
            <>
              {logoUrl && (
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 overflow-hidden shadow-sm ring-1 ring-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logoUrl} alt={restaurantName} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-1">
                Votre avis compte !
              </h3>
              <p className="text-sm text-[#6B6B6B] mb-6">
                Comment etait votre experience chez {restaurantName} ?
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => handleRate(star)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill={star <= (hoveredStar || rating) ? '#FBBC04' : 'none'}
                      stroke={star <= (hoveredStar || rating) ? '#FBBC04' : '#D1D5DB'}
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>

              <p className="text-xs text-[#9B9B9B]">
                Touchez une etoile pour evaluer
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-green-50 mx-auto mb-4 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-1">
                Merci pour votre retour !
              </h3>
              <p className="text-sm text-[#6B6B6B] mb-2">
                Nous apprecions vos {rating} etoile{rating > 1 ? 's' : ''} et travaillons chaque jour pour ameliorer votre experience.
              </p>
              <p className="text-xs text-[#9B9B9B] mb-6">
                Votre avis nous aide a progresser.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Fermer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
