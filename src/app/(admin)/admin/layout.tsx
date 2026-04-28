import type { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin/sidebar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-foreground flex">
      <AdminSidebar />
      <main className="flex-1 ml-[220px] p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
