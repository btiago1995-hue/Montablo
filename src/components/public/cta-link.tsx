'use client'

import Link from 'next/link'
import { trackCTAClick } from '@/lib/gtag'

interface CTALinkProps {
  href: string
  label: string
  className?: string
  children: React.ReactNode
}

export function CTALink({ href, label, className, children }: CTALinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackCTAClick(label)}
    >
      {children}
    </Link>
  )
}
