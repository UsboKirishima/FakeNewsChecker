import { z } from "zod"

export function normalizeUrl(val: string): string {
  const trimmed = val.trim()
  if (!/^https?:\/\//i.test(trimmed) && /[.]/.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

export const checkNewsSchema = z.object({
  url: z.string().transform(normalizeUrl).pipe(z.url("Provide a valid URL (e.g. https://example.com/article)")),
})

export type CheckNewsInput = z.infer<typeof checkNewsSchema>
