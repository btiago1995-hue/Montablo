import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN

const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

function build(limit: number, window: `${number} ${'s' | 'm' | 'h'}`, prefix: string) {
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `montablo:${prefix}`,
    analytics: true,
  })
}

export const signupLimiter = build(5, '1 h', 'signup')
export const loginLimiter = build(10, '15 m', 'login')
export const forgotPasswordLimiter = build(3, '1 h', 'forgot')
export const contactLimiter = build(5, '1 h', 'contact')

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real
  return 'unknown'
}
