import { NextRequest, NextResponse } from "next/server"
import { chatAboutNews } from "@/server/gemini/client"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
  const limit = rateLimiter(`chat:${ip}`, { windowMs: 60_000, max: 20 })
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429, headers: { "Retry-After": String(limit.reset) } })
  }

  const { url, message, history } = await request.json()

  if (!url || !message) {
    return NextResponse.json({ error: "URL and message are required" }, { status: 400 })
  }

  try {
    const reply = await chatAboutNews(url, message, history || [])
    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 })
  }
}
