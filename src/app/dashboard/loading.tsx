export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div>
          <div className="h-8 w-48 bg-border/50 rounded mb-2" />
          <div className="h-4 w-32 bg-border/30 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-border/30 rounded-lg" />
          <div className="h-10 w-28 bg-border/30 rounded-lg" />
        </div>
      </div>

      {/* Stat bar skeleton */}
      <div className="bg-white border border-border rounded-xl p-4 sm:px-5 mb-5">
        <div className="flex items-center gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-5">
              <div>
                <div className="h-7 w-10 bg-border/40 rounded mb-1" />
                <div className="h-3 w-16 bg-border/30 rounded" />
              </div>
              {i < 3 && <div className="w-px h-8 bg-border" />}
            </div>
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <div className="h-5 w-24 bg-border/40 rounded" />
          <div className="h-4 w-28 bg-border/30 rounded" />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-border/30">
            <div className="w-9 h-9 bg-border/30 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-border/40 rounded mb-1" />
              <div className="h-3 w-20 bg-border/30 rounded" />
            </div>
            <div className="h-4 w-12 bg-border/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
