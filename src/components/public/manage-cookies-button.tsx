'use client'

import { openCookieBanner } from './cookie-banner'

export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openCookieBanner()}
      className={
        className ??
        'text-[14px] text-background/80 hover:text-accent transition cursor-pointer'
      }
    >
      Gérer les cookies
    </button>
  )
}
