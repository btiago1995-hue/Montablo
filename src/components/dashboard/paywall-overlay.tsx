'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AlertTriangle, CreditCard } from 'lucide-react'

export function PaywallOverlay({ statusLabel }: { statusLabel: string }) {
  const pathname = usePathname()

  // Never show the overlay on the settings page
  if (pathname === '/dashboard/settings') {
    return null
  }

  return (
    <div className="fixed inset-0 lg:left-[260px] z-30 flex items-center justify-center">
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-[#E8E8E4] p-8 max-w-md mx-4 text-center">
        <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-[#D97706]" />
        </div>

        <h2 className="font-serif text-xl text-[#1A1A1A] mb-2">
          Accès suspendu
        </h2>

        <p className="text-sm text-[#6B6B6B] mb-1">
          {statusLabel}
        </p>

        <p className="text-sm text-[#9B9B9B] mb-6">
          Pour continuer à utiliser MonTablo et rendre votre menu visible à vos clients, veuillez activer votre abonnement.
        </p>

        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 bg-[#2C3E2D] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#3A5140] transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Gérer mon abonnement
        </Link>
      </div>
    </div>
  )
}
