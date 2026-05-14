"use client"

import type { Claim } from "@/lib/types"

const statusConfig = {
  supported: { icon: "✓", label: "Supported", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800" },
  contradicted: { icon: "✗", label: "Contradicted", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40", border: "border-red-200 dark:border-red-800" },
  unverifiable: { icon: "?", label: "Unverifiable", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200 dark:border-amber-800" },
}

export default function ClaimCard({ claim, index }: { claim: Claim; index: number }) {
  const cfg = statusConfig[claim.status]

  return (
    <div
      className={`rounded-lg border ${cfg.border} ${cfg.bg} p-4 transition-all duration-300 animate-in`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${cfg.color} bg-white dark:bg-zinc-900 shadow-sm`}
        >
          {cfg.icon}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
          </div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{claim.claim}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{claim.explanation}</p>
        </div>
      </div>
    </div>
  )
}
