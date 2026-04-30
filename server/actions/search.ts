"use server"

import { PrismaClient } from "@prisma/client"
import { checkNewsSchema } from "@/lib/validators"

const prisma = new PrismaClient()

export async function saveSearch(userId: string, url: string) {
  const validated = checkNewsSchema.parse({ url })
  
  const search = await prisma.search.create({
    data: {
      url: validated.url,
      verdict: "UNVERIFIED",
      confidence: 0,
      userId,
    },
  })
  
  return search
}
