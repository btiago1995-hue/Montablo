import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Redirect admin.montablo.com root to /admin
  const host = request.headers.get('host') ?? ''
  if (host.startsWith('admin.') && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/admin', '/login', '/signup', '/'],
}
