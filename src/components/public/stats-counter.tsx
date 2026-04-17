'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 30, unit: 's', label: 'Pour créer votre menu' },
  { value: 100, unit: '%', label: 'Des mises à jour en temps réel' },
  { value: 0, unit: '€', label: 'De réimpression, pour toujours' },
]

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active || target === 0) {
      setCount(target)
      return
    }
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return count
}

function StatItem({
  value,
  unit,
  label,
  active,
}: {
  value: number
  unit: string
  label: string
  active: boolean
}) {
  const count = useCountUp(value, 1200, active)
  return (
    <div className="text-center px-4">
      <div className="font-serif text-[44px] sm:text-[60px] leading-none text-foreground mb-2">
        {count}{unit}
      </div>
      <p className="text-sm text-muted leading-snug">{label}</p>
    </div>
  )
}

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="border-y border-border bg-white">
      <div className="max-w-[1120px] mx-auto px-6 py-14 sm:py-20">
        <div className="grid grid-cols-3 gap-6 sm:gap-12 divide-x divide-border">
          {STATS.map((stat, i) => (
            <StatItem key={i} {...stat} active={active} />
          ))}
        </div>
      </div>
    </div>
  )
}
