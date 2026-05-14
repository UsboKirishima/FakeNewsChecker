"use client"

import { useEffect, useState } from "react"

const steps = [
  "Fetching article content...",
  "Analyzing sources...",
  "Cross-referencing claims...",
  "Generating verdict...",
]

export default function ScanAnimation() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100
        return p + 1
      })
    }, 80)

    const stepInterval = setInterval(() => {
      setStep((s) => Math.min(s + 1, steps.length - 1))
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center">
          <div className="absolute h-full w-full rounded-full border-2 border-zinc-200 dark:border-zinc-700" />
          <div
            className="absolute h-full w-full rounded-full border-2 border-t-transparent border-zinc-900 dark:border-zinc-50 animate-spin"
            style={{ animationDuration: "0.8s" }}
          />
          <div className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-50" />
        </div>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 min-w-[220px]">
          {steps[step]}
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-zinc-500 to-zinc-700 dark:from-zinc-400 dark:to-zinc-200 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-center gap-5 text-xs text-zinc-400">
        <span className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${step >= 0 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
          Fetch
        </span>
        <span className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${step >= 1 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
          Analyze
        </span>
        <span className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${step >= 2 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
          Verify
        </span>
        <span className="flex items-center gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${step >= 3 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
          Judge
        </span>
      </div>
    </div>
  )
}
