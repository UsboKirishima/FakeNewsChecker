"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Shield, AlertTriangle, Info, Newspaper, Scale, MessageCircle } from "lucide-react"
import type { AnalysisResult } from "@/lib/types"
import ConfidenceGauge from "./ConfidenceGauge"
import ClaimCard from "./ClaimCard"
import ChatPanel from "./ChatPanel"

type Props = {
  result: AnalysisResult
  url: string
}

const verdictConfig = {
  REAL: { icon: Shield, label: "Likely Real", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40", border: "border-emerald-200 dark:border-emerald-800", gradient: "from-emerald-500 to-emerald-600" },
  FAKE: { icon: AlertTriangle, label: "Likely Fake", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40", border: "border-red-200 dark:border-red-800", gradient: "from-red-500 to-red-600" },
  UNVERIFIED: { icon: Info, label: "Unverifiable", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", border: "border-amber-200 dark:border-amber-800", gradient: "from-amber-500 to-amber-600" },
}

export default function ResultDisplay({ result, url }: Props) {
  const [showClaims, setShowClaims] = useState(true)
  const [showSources, setShowSources] = useState(true)
  const [showChat, setShowChat] = useState(false)

  const vc = verdictConfig[result.verdict]
  const Icon = vc.icon

  return (
    <div className="space-y-4 animate-in" style={{ animationDuration: "0.5s" }}>
      <div className={`rounded-xl border ${vc.border} ${vc.bg} overflow-hidden transition-all duration-500`}>
        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <ConfidenceGauge confidence={result.confidence} />
            <div className="text-center sm:text-left flex-1 space-y-2">
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${vc.color} bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border ${vc.border}`}>
                <Icon size={16} />
                {vc.label}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{result.summary}</p>
            </div>
          </div>
        </div>
      </div>

      {result.keyFindings.length > 0 && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Scale size={16} className="text-zinc-500" />
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Key Findings</h3>
          </div>
          <ul className="space-y-2">
            {result.keyFindings.map((finding, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                {finding}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.claims.length > 0 && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <button
            onClick={() => setShowClaims(!showClaims)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-zinc-500" />
              Claims Analysis ({result.claims.length})
            </div>
            {showClaims ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showClaims && (
            <div className="px-5 pb-5 space-y-2.5">
              {result.claims.map((claim, i) => (
                <ClaimCard key={i} claim={claim} index={i} />
              ))}
            </div>
          )}
        </div>
      )}

      {result.sources.length > 0 && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <button
            onClick={() => setShowSources(!showSources)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-zinc-500" />
              Sources ({result.sources.length})
            </div>
            {showSources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showSources && (
            <div className="px-5 pb-5 space-y-2">
              {result.sources.map((source, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        source.reliability === "high" ? "bg-emerald-500" : source.reliability === "medium" ? "bg-amber-500" : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">{source.name}</span>
                  </div>
                  <span className={`text-xs font-medium capitalize ${
                    source.reliability === "high" ? "text-emerald-600 dark:text-emerald-400" : source.reliability === "medium" ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {source.reliability}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-4 pt-1 text-xs text-zinc-400">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> High reliability</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Medium reliability</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Low reliability</span>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => setShowChat(!showChat)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 dark:text-zinc-400 transition-all"
      >
        <MessageCircle size={16} />
        {showChat ? "Hide Chat" : "Ask Follow-up Questions"}
      </button>

      {showChat && <ChatPanel url={url} />}
    </div>
  )
}
