import { updateSession } from '@/lib/supabase/middleware'
import {
  forgotPasswordLimiter,
  getClientIp,
  loginLimiter,
  signupLimiter,
} from '@/lib/rate-limit'
import { NextResponse, type NextRequest } from 'next/server'

const AUTH_LIMITERS: Record<string, typeof signupLimiter> = {
  '/signup': signupLimiter,
  '/login': loginLimiter,
  '/forgot-password': forgotPasswordLimiter,
}

export async function middleware(request: NextRequest) {
  // Redirect admin.montablo.com root to /admin
  const host = request.headers.get('host') ?? ''
  if (host.startsWith('admin.') && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  const limiter = AUTH_LIMITERS[request.nextUrl.pathname]
  if (limiter) {
    const ip = getClientIp(request)
    const { success, reset } = await limiter.limit(ip)
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
      return new NextResponse(
        'Trop de tentatives. Veuillez réessayer plus tard.',
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'Content-Type': 'text/plain; charset=utf-8',
          },
        }
      )
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/admin',
    '/login',
    '/signup',
    '/forgot-password',
    '/',
  ],
}
