import { NextRequest, NextResponse } from "next/server"
import { checkNews } from "@/server/gemini/client"

export async function POST(request: NextRequest) {
  const { url } = await request.json()

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    const result = await checkNews(url)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: "Failed to check news" }, { status: 500 })
  }
}
