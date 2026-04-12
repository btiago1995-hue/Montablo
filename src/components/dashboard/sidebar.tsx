'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  FileText,
  Star,
  CalendarDays,
  QrCode,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Restaurant } from '@/types/database'

const gestionItems = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/dashboard/menu', label: 'Mon menu', icon: FileText },
  { href: '/dashboard/promotions', label: 'Promotions', icon: Star },
  { href: '/dashboard/daily-menu', label: 'Menu du jour', icon: CalendarDays },
]

const outilsItems = [
  { href: '/dashboard/qr-code', label: 'QR Code', icon: QrCode },
  { href: '/dashboard/settings', label: 'Paramètres', icon: Settings },
]

export function Sidebar({ restaurant }: { restaurant: Restaurant }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
          isActive
            ? 'bg-white/[0.12] text-white'
            : 'text-white/65 hover:bg-white/[0.08] hover:text-white'
        )}
      >
        <Icon className={cn('w-[18px] h-[18px]', isActive ? 'opacity-100' : 'opacity-70')} />
        {label}
      </Link>
    )
  }

  const status = restaurant.subscription_status === 'active'
    ? 'Actif'
    : restaurant.subscription_status === 'trialing'
    ? 'Essai gratuit'
    : 'Inactif'

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-[#E8E8E4] rounded-lg p-2 shadow-sm"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-[260px] bg-[#2C3E2D] text-white z-50 flex flex-col transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h1 className="font-serif text-[22px] tracking-tight">MonTablo</h1>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/60">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Restaurant name */}
        <div className="px-6 pb-8">
          <span className="text-[13px] text-white/60 truncate block">{restaurant.name}</span>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 px-3">
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-semibold px-3 mb-2">
              Gestion
            </div>
            <div className="space-y-0.5">
              {gestionItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-semibold px-3 mb-2">
              Outils
            </div>
            <div className="space-y-0.5">
              {outilsItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-colors w-full"
          >
            <LogOut className="w-[18px] h-[18px] opacity-70" />
            Déconnexion
          </button>
        </div>

        {/* Footer badge */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[12px] text-[#D4A574] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
            {status} · 29€/mois
          </div>
        </div>
      </aside>
    </>
  )
}
