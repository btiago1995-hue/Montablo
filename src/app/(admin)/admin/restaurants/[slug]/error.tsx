'use client'

export default function RestaurantDetailError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="p-8 bg-red-950 border border-red-800 rounded-xl text-sm font-mono">
      <p className="text-red-300 font-bold mb-2">Erro ao carregar restaurante</p>
      <p className="text-red-400">{error.message}</p>
      {error.digest && <p className="text-slate-500 mt-1">Digest: {error.digest}</p>}
    </div>
  )
}
