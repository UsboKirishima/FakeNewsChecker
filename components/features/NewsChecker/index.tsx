"use client"

import { useState } from "react"
import { ArrowRight, Globe, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScanAnimation from "@/components/features/ScanAnimation"
import ResultDisplay from "@/components/features/ResultDisplay"
import type { AnalysisResult } from "@/lib/types"
import { normalizeUrl } from "@/lib/validators"

function isValidUrl(str: string): boolean {
  if (!str) return false
  try {
    const u = new URL(normalizeUrl(str))
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

export default function NewsChecker() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")

  const trimmed = url.trim()
  const normalized = normalizeUrl(trimmed)
  const urlInvalid = trimmed.length > 0 && !isValidUrl(trimmed)

  async function handleCheck() {
    if (!isValidUrl(trimmed)) return
    setLoading(true)
    setResult(null)
    setError("")

    try {
      const res = await fetch("/dashboard/api/check-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Failed to analyze article")
      } else {
        setResult(data)
      }
    } catch {
      setError("Network error. Please try again.")
    }
    setLoading(false)
  }

  function handleReset() {
    setResult(null)
    setError("")
    setUrl("")
  }

  if (result) {
    return (
      <div className="space-y-6 items-center">
        <ResultDisplay result={result} url={normalized} />
        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full gap-2 items-center"
        >
          <RotateCcw size={14} />
          Check Another Article
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800/50 rounded-2xl" />
        <div className="relative p-1">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-4 py-2 focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-500 transition-all">
            <Globe size={18} className="shrink-0 text-zinc-400" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="Paste a news article URL to verify..."
              className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-zinc-400 text-zinc-900 dark:text-zinc-100"
            />
            <Button onClick={handleCheck} disabled={loading || !trimmed || urlInvalid} className="shrink-0 gap-1.5">
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Checking
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Check
                  <ArrowRight size={14} />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {urlInvalid && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-5 py-3 text-sm text-red-600 dark:text-red-400">
          Please enter a valid URL starting with http:// or https://
        </div>
      )}

      {error && !urlInvalid && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-5 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {loading && <ScanAnimation />}
    </div>
  )
}
