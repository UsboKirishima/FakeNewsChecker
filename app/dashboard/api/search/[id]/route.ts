import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/server/auth/nextauth"
import { getSearchById } from "@/server/actions/search"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const search = await getSearchById(id)

  if (!search) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (search.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  let result = null
  if (search.aiComments) {
    try {
      result = JSON.parse(search.aiComments)
    } catch {
      result = { verdict: search.verdict, confidence: search.confidence, summary: search.aiComments, claims: [], sources: [], keyFindings: [] }
    }
  }

  return NextResponse.json({ search, result })
}
