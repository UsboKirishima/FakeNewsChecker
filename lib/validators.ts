import { z } from "zod"

export const checkNewsSchema = z.object({
  url: z.url("Invalid URL"),
})
