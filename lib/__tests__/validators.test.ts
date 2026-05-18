import { describe, it, expect } from "vitest"
import { checkNewsSchema } from "@/lib/validators"

describe("checkNewsSchema", () => {
  it("accepts a valid https URL", () => {
    const result = checkNewsSchema.safeParse({ url: "https://example.com/news/article" })
    expect(result.success).toBe(true)
  })

  it("accepts a valid http URL", () => {
    const result = checkNewsSchema.safeParse({ url: "http://example.com/news" })
    expect(result.success).toBe(true)
  })

  it("accepts a URL with query params", () => {
    const result = checkNewsSchema.safeParse({ url: "https://example.com/article?id=123&ref=home" })
    expect(result.success).toBe(true)
  })

  it("rejects an empty string", () => {
    const result = checkNewsSchema.safeParse({ url: "" })
    expect(result.success).toBe(false)
  })

  it("rejects a plain string without protocol", () => {
    const result = checkNewsSchema.safeParse({ url: "not-a-url" })
    expect(result.success).toBe(false)
  })

  it("rejects missing url field", () => {
    const result = checkNewsSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it("rejects null", () => {
    const result = checkNewsSchema.safeParse({ url: null })
    expect(result.success).toBe(false)
  })

  it("rejects a number", () => {
    const result = checkNewsSchema.safeParse({ url: 123 })
    expect(result.success).toBe(false)
  })
})
