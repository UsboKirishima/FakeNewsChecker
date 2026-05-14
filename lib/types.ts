export type Claim = {
  claim: string
  status: "supported" | "contradicted" | "unverifiable"
  explanation: string
}

export type Source = {
  name: string
  url: string
  reliability: "high" | "medium" | "low"
}

export type AnalysisResult = {
  verdict: "REAL" | "FAKE" | "UNVERIFIED"
  confidence: number
  summary: string
  claims: Claim[]
  sources: Source[]
  keyFindings: string[]
}

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export type SearchRecord = {
  id: string
  url: string
  verdict: string
  confidence: number
  aiComments: string | null
  userId: string
  createdAt: number
}
