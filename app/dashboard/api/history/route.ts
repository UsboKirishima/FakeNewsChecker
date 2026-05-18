import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/server/auth/nextauth"
import { getHistory } from "@/server/actions/search"
import { rateLimiter } from "@/lib/rate-limiter"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const limit = rateLimiter(`history:${session.user.id}`, { windowMs: 60_000, max: 30 })
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429, headers: { "Retry-After": String(limit.reset) } })
  }

  const searches = await getHistory(session.user.id)
  return NextResponse.json(searches)
}
