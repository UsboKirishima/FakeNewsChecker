"use client"

import { useState } from "react"

export default function ResultDisplay({ result }: { result: { verdict: string; confidence: number; aiComments: string } }) {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="p-4 border rounded-md space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-bold">Verdict:</span>
        <span className={result.verdict === "FAKE" ? "text-red-500" : "text-green-500"}>
          {result.verdict}
        </span>
        <span className="text-muted-foreground">({(result.confidence * 100).toFixed(0)}% confidence)</span>
      </div>
      <button onClick={() => setShowComments(!showComments)} className="text-blue-500 underline text-sm">
        {showComments ? "Hide" : "Show"} AI Comments
      </button>
      {showComments && <p className="text-sm text-muted-foreground">{result.aiComments}</p>}
    </div>
  )
}
