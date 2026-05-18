import { NextRequest, NextResponse } from "next/server"
import { checkNews } from "@/server/gemini/client"
import { rateLimiter } from "@/lib/rate-limiter"
import { checkNewsSchema } from "@/lib/validators"

const API_KEY = process.env.API_KEY

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const limit = rateLimiter(`api-check:${ip}`, { windowMs: 60_000, max: 10 })
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429, headers: { "Retry-After": String(limit.reset) } })
  }

  const apiKey = request.headers.get("x-api-key")

  if (API_KEY && apiKey !== API_KEY) {
    return NextResponse.json({ error: "Unauthorized. Provide a valid API key via x-api-key header." }, { status: 401 })
  }

  let body: { url: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body. Provide { \"url\": \"...\" }" }, { status: 400 })
  }

  const parsed = checkNewsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message || "Invalid URL" }, { status: 400 })
  }

  const { url } = parsed.data

  try {
    const result = await checkNews(url)
    return NextResponse.json(result)
  } catch (error) {
    console.error("API check error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
