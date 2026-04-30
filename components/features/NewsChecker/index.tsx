"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ScanAnimation from "@/components/features/ScanAnimation"
import ResultDisplay from "@/components/features/ResultDisplay"

export default function NewsChecker() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<null | { verdict: string; confidence: number; aiComments: string }>(null)

  async function handleCheck() {
    setLoading(true)
    setResult(null)
    const res = await fetch("/api/check-news", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="max-w-xl space-y-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste news article URL..."
        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-zinc-900"
      />
      <Button onClick={handleCheck} disabled={loading || !url}>
        Check News
      </Button>
      {loading && <ScanAnimation />}
      {result && <ResultDisplay result={result} />}
    </div>
  )
}
