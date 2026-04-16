'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
} from 'lucide-react'

const navItems = [
  { section: 'Visão geral', items: [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  ]},
  { section: 'Clientes', items: [
    { href: '/admin/restaurants', label: 'Restaurantes', icon: Building2, exact: false },
  ]},
  { section: 'Financeiro', items: [
    { href: '/admin/revenue', label: 'Receita', icon: TrendingUp, exact: false },
  ]},
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] bg-slate-800 border-r border-slate-700 flex flex-col py-5 fixed top-0 left-0 h-full z-40">
      <div className="px-5 pb-5 border-b border-slate-700 mb-3">
        <span className="text-sm font-bold text-slate-100">Montablo</span>
        <span className="ml-2 text-[10px] bg-blue-700 text-blue-200 px-1.5 py-0.5 rounded">ADMIN</span>
      </div>

      {navItems.map(({ section, items }) => (
        <div key={section}>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 px-5 pt-4 pb-1.5">{section}</p>
          {items.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2.5 px-5 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </div>
      ))}
    </aside>
  )
}
