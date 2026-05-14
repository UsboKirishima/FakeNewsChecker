import { NextRequest, NextResponse } from "next/server"
import { chatAboutNews } from "@/server/gemini/client"

export async function POST(request: NextRequest) {
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
