import { describe, it, expect } from "vitest"
import { checkNewsSchema, normalizeUrl } from "@/lib/validators"

describe("normalizeUrl", () => {
  it("prepends https:// when protocol is missing", () => {
    expect(normalizeUrl("testsite.com/article.html")).toBe("https://testsite.com/article.html")
  })

  it("prepends https:// for bare domain", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com")
  })

  it("keeps https:// when already present", () => {
    expect(normalizeUrl("https://example.com")).toBe("https://example.com")
  })

  it("keeps http:// when already present", () => {
    expect(normalizeUrl("http://example.com")).toBe("http://example.com")
  })

  it("handles subdomains", () => {
    expect(normalizeUrl("sub.domain.com/path?q=1")).toBe("https://sub.domain.com/path?q=1")
  })

  it("returns text without a dot unchanged", () => {
    expect(normalizeUrl("not-a-url")).toBe("not-a-url")
  })

  it("trims whitespace", () => {
    expect(normalizeUrl("  example.com/page  ")).toBe("https://example.com/page")
  })

  it("returns empty string unchanged", () => {
    expect(normalizeUrl("")).toBe("")
  })
})

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

  it("accepts a domain without protocol and normalizes it", () => {
    const result = checkNewsSchema.safeParse({ url: "testsite.com/article.html" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.url).toBe("https://testsite.com/article.html")
    }
  })

  it("accepts a bare domain and normalizes it", () => {
    const result = checkNewsSchema.safeParse({ url: "example.com" })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.url).toBe("https://example.com")
    }
  })

  it("rejects an empty string", () => {
    const result = checkNewsSchema.safeParse({ url: "" })
    expect(result.success).toBe(false)
  })

  it("rejects a plain string without protocol or dot", () => {
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
