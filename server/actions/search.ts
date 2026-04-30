import { prisma } from "@/lib/prisma"

export async function createSearch(data: {
  url: string
  verdict: string
  confidence: number
  aiComments?: string
  operations?: string
  userId: string
}) {
  return await prisma.search.create({
    data,
  })
}

export async function getHistory(userId: string) {
  return await prisma.search.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
}
