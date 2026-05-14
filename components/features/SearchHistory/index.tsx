"use client"

import { useEffect, useState } from "react"
import { Clock, ExternalLink, Search } from "lucide-react"
import type { SearchRecord } from "@/lib/types"
import SearchDetail from "@/components/features/SearchDetail"

export default function SearchHistory() {
  const [searches, setSearches] = useState<SearchRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/dashboard/api/history")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSearches(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (selectedId) {
    return <SearchDetail searchId={selectedId} onBack={() => setSelectedId(null)} />
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 animate-pulse">
            <div className="h-4 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800 mb-3" />
            <div className="h-3 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    )
  }

  if (searches.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center space-y-3">
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Search size={20} className="text-zinc-400" />
          </div>
        </div>
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">No searches yet</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Your analyzed articles will appear here once you start checking news.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {searches.map((s) => {
        const date = s.createdAt * 1000 > 1e12 ? s.createdAt : s.createdAt * 1000
        const ts = new Date(date)
        const verdictColor =
          s.verdict === "FAKE" ? "text-red-600 dark:text-red-400" : s.verdict === "REAL" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"

        return (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            className="w-full text-left rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${verdictColor}`}>{s.verdict}</span>
                  <span className="text-xs text-zinc-400">
                    {(s.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{s.url}</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Clock size={12} />
                  {ts.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <ExternalLink size={14} className="shrink-0 text-zinc-300 dark:text-zinc-600 mt-1" />
            </div>
          </button>
        )
      })}
    </div>
  )
}
