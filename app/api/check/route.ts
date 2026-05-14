import { NextRequest, NextResponse } from "next/server"
import { checkNews } from "@/server/gemini/client"

const API_KEY = process.env.API_KEY

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key")

  if (API_KEY && apiKey !== API_KEY) {
    return NextResponse.json({ error: "Unauthorized. Provide a valid API key via x-api-key header." }, { status: 401 })
  }

  let url: string
  try {
    const body = await request.json()
    url = body.url
  } catch {
    return NextResponse.json({ error: "Invalid JSON body. Provide { \"url\": \"...\" }" }, { status: 400 })
  }

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing or invalid 'url' field" }, { status: 400 })
  }

  try {
    const result = await checkNews(url)
    return NextResponse.json(result)
  } catch (error) {
    console.error("API check error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
