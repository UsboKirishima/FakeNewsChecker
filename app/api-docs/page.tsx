import Navbar from "@/components/layout/Navbar"
import { Code2, Globe, Shield, Key, ArrowRight, BookOpen, Cpu } from "lucide-react"

const endpoints = [
  {
    method: "POST",
    path: "/api/check",
    description: "Analyze a news article URL and return a verdict with detailed analysis.",
    request: {
      headers: [
        { name: "Content-Type", value: "application/json", required: true },
        { name: "x-api-key", value: "your-api-key", required: false, note: "Required if API_KEY is configured on the server" },
      ],
      body: `{
  "url": "https://example.com/news/article"
}`,
    },
    response: `{
  "verdict": "REAL" | "FAKE" | "UNVERIFIED",
  "confidence": 0.85,
  "summary": "2-3 sentence analysis summary",
  "claims": [
    {
      "claim": "Specific claim from the article",
      "status": "supported" | "contradicted" | "unverifiable",
      "explanation": "Why this claim is supported or not"
    }
  ],
  "sources": [
    {
      "name": "Source Name",
      "url": "https://source.url",
      "reliability": "high" | "medium" | "low"
    }
  ],
  "keyFindings": ["Finding 1", "Finding 2"]
}`,
    example: `curl -X POST https://your-domain.com/api/check \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: your-api-key" \\
  -d '{ "url": "https://example.com/news/article" }'`,
  },
]

const codeExamples = [
  { lang: "curl", code: 'curl -X POST https://your-domain.com/api/check \\\n  -H "Content-Type: application/json" \\\n  -H "x-api-key: your-api-key" \\\n  -d \'{ "url": "https://example.com/news" }\'' },
  { lang: "JavaScript", code: 'fetch("https://your-domain.com/api/check", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "x-api-key": "your-api-key",\n  },\n  body: JSON.stringify({ url: "https://example.com/news" }),\n})\n  .then((r) => r.json())\n  .then(console.log);' },
  { lang: "Python", code: 'import requests\n\nresponse = requests.post(\n    "https://your-domain.com/api/check",\n    headers={\n        "Content-Type": "application/json",\n        "x-api-key": "your-api-key",\n    },\n    json={"url": "https://example.com/news"},\n)\nprint(response.json())' },
]

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <Code2 size={12} />
            API Reference
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Public API
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Integrate fake news detection into your own applications. Our REST API returns structured analysis
            results including verdict, confidence score, claims breakdown, and source reliability.
          </p>
        </div>

        <div className="space-y-3 mb-12">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Key size={16} className="text-zinc-400" />
            Authentication
          </h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              If the server has an <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-800 dark:text-zinc-200">API_KEY</code> environment variable configured, all requests must include
              an <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-800 dark:text-zinc-200">x-api-key</code> header with the matching value. Without the header, the API returns a 401 error.
              If no <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-800 dark:text-zinc-200">API_KEY</code> is set, the API is open (suitable for development).
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-3.5 py-2.5 text-xs text-amber-700 dark:text-amber-400">
              <Shield size={14} className="shrink-0" />
              Always use HTTPS in production. Keep your API key secret.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Globe size={16} className="text-zinc-400" />
            Endpoints
          </h2>

          {endpoints.map((ep, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 px-5 py-3 bg-zinc-50/50 dark:bg-zinc-800/30">
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {ep.method}
                </span>
                <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">{ep.path}</code>
              </div>
              <div className="p-5 space-y-5">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{ep.description}</p>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Request Headers</h4>
                  <div className="space-y-1.5">
                    {ep.request.headers.map((h, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm">
                        <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 shrink-0">
                          {h.name}
                        </code>
                        <code className="text-xs text-zinc-400 font-mono">{h.value}</code>
                        {h.required && <span className="text-xs text-red-500">required</span>}
                        {h.note && <span className="text-xs text-zinc-400">{h.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Request Body</h4>
                  <pre className="rounded-lg bg-zinc-900 dark:bg-zinc-950 p-3.5 overflow-x-auto">
                    <code className="text-xs text-zinc-200 font-mono leading-relaxed">{ep.request.body}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Response</h4>
                  <pre className="rounded-lg bg-zinc-900 dark:bg-zinc-950 p-3.5 overflow-x-auto">
                    <code className="text-xs text-zinc-200 font-mono leading-relaxed">{ep.response}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Example</h4>
                  <pre className="rounded-lg bg-zinc-900 dark:bg-zinc-950 p-3.5 overflow-x-auto">
                    <code className="text-xs text-zinc-200 font-mono leading-relaxed">{ep.example}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <BookOpen size={16} className="text-zinc-400" />
            Code Examples
          </h2>
          {codeExamples.map((ex, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 px-5 py-2.5 bg-zinc-50/50 dark:bg-zinc-800/30">
                <Cpu size={14} className="text-zinc-400" />
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{ex.lang}</span>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">{ex.code}</code>
              </pre>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <ArrowRight size={14} className="text-zinc-400" />
            Response Fields
          </h2>
          <div className="text-sm space-y-2.5">
            {[
              { field: "verdict", type: "string", desc: "Overall assessment: REAL, FAKE, or UNVERIFIED" },
              { field: "confidence", type: "number", desc: "Confidence score between 0 and 1" },
              { field: "summary", type: "string", desc: "Plain-text summary of the analysis" },
              { field: "claims", type: "array", desc: "List of specific claims with individual verdicts" },
              { field: "claims[].claim", type: "string", desc: "The specific claim extracted from the article" },
              { field: "claims[].status", type: "string", desc: "supported, contradicted, or unverifiable" },
              { field: "claims[].explanation", type: "string", desc: "Reasoning behind the claim status" },
              { field: "sources", type: "array", desc: "Sources used in the analysis" },
              { field: "sources[].name", type: "string", desc: "Source name" },
              { field: "sources[].url", type: "string", desc: "Source URL (may be empty)" },
              { field: "sources[].reliability", type: "string", desc: "high, medium, or low" },
              { field: "keyFindings", type: "array", desc: "Key findings as strings" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <code className="shrink-0 rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-700 dark:text-zinc-300 min-w-[140px]">
                  {item.field}
                </code>
                <code className="shrink-0 text-xs text-zinc-400 font-mono min-w-[50px]">{item.type}</code>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
