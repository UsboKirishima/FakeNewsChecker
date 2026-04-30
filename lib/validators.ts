import { z } from "zod"

export const checkNewsSchema = z.object({
  url: z.string().url("Invalid URL"),
})
