import { NextRequest, NextResponse } from "next/server"
import { checkNews } from "@/server/gemini/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/server/auth/nextauth"
import { createSearch } from "@/server/actions/search"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const key = session?.user?.id || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const limit = rateLimiter(`check-news:${key}`, { windowMs: 60_000, max: 10 })
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429, headers: { "Retry-After": String(limit.reset) } })
  }

  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const result = await checkNews(url)

    if (session?.user?.id) {
      await createSearch({
        url,
        verdict: result.verdict,
        confidence: result.confidence,
        aiComments: JSON.stringify(result),
        userId: session.user.id,
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in check-news:", error)
    return NextResponse.json({ error: "Failed to check news" }, { status: 500 })
  }
}
