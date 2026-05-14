import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/server/auth/nextauth"
import { getHistory } from "@/server/actions/search"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const searches = await getHistory(session.user.id)
  return NextResponse.json(searches)
}
