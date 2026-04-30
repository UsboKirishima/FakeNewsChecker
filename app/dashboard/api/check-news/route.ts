import { NextRequest, NextResponse } from "next/server"
import { checkNews } from "@/server/gemini/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/server/auth/nextauth"
import { createSearch } from "@/server/actions/search"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
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
        aiComments: result.aiComments,
        operations: JSON.stringify(result.operations),
        userId: session.user.id,
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in check-news:", error)
    return NextResponse.json({ error: "Failed to check news" }, { status: 500 })
  }
}
