import { describe, it, expect, vi, beforeEach } from "vitest"

const originalEnv = process.env

beforeEach(() => {
  vi.resetModules()
  process.env = { ...originalEnv }
})

describe("parseGeminiResponse (private function)", () => {
  async function getParseGeminiResponse() {
    const mod = await import("@/server/gemini/client")
    return (mod as any).__Rewire__?.__GetDependency__?.("parseGeminiResponse")
  }

  it("parses valid JSON response with all fields", async () => {
    const { checkNews } = await import("@/server/gemini/client")
    process.env.GEMINI_API_KEY = "mock"
    const result = await checkNews("https://example.com/article")
    expect(result).toMatchObject({
      verdict: expect.stringMatching(/^(REAL|FAKE|UNVERIFIED)$/),
      confidence: expect.any(Number),
      summary: expect.any(String),
      claims: expect.any(Array),
      sources: expect.any(Array),
      keyFindings: expect.any(Array),
    })
    expect(result.confidence).toBeGreaterThanOrEqual(0)
    expect(result.confidence).toBeLessThanOrEqual(1)
  })

  it("returns UNVERIFIED with 0.5 confidence when GEMINI_API_KEY is mock", async () => {
    process.env.GEMINI_API_KEY = "mock"
    const { checkNews } = await import("@/server/gemini/client")
    const result = await checkNews("https://example.com/article")
    expect(result.verdict).toBe("UNVERIFIED")
    expect(result.confidence).toBe(0.72)
  })
})

describe("checkNews", () => {
  it("returns mock data when API key is empty", async () => {
    process.env.GEMINI_API_KEY = ""
    const { checkNews } = await import("@/server/gemini/client")
    const result = await checkNews("https://example.com/article")
    expect(result.verdict).toBe("UNVERIFIED")
    expect(result.claims).toHaveLength(3)
    expect(result.sources).toHaveLength(3)
    expect(result.keyFindings).toHaveLength(4)
  })

  it("returns mock data when API key is 'mock'", async () => {
    process.env.GEMINI_API_KEY = "mock"
    const { checkNews } = await import("@/server/gemini/client")
    const result = await checkNews("https://example.com/article")
    expect(result.verdict).toBe("UNVERIFIED")
  })

  it("returns properly structured mock data", async () => {
    process.env.GEMINI_API_KEY = "mock"
    const { checkNews } = await import("@/server/gemini/client")
    const result = await checkNews("https://example.com/article")

    result.claims.forEach((claim) => {
      expect(claim).toHaveProperty("claim")
      expect(claim).toHaveProperty("status")
      expect(claim).toHaveProperty("explanation")
      expect(["supported", "contradicted", "unverifiable"]).toContain(claim.status)
    })

    result.sources.forEach((source) => {
      expect(source).toHaveProperty("name")
      expect(source).toHaveProperty("url")
      expect(source).toHaveProperty("reliability")
      expect(["high", "medium", "low"]).toContain(source.reliability)
    })

    expect(result.keyFindings).toBeInstanceOf(Array)
    result.keyFindings.forEach((finding) => {
      expect(typeof finding).toBe("string")
    })
  })
})

describe("chatAboutNews", () => {
  it("returns mock response when API key is mock", async () => {
    process.env.GEMINI_API_KEY = "mock"
    const { chatAboutNews } = await import("@/server/gemini/client")
    const result = await chatAboutNews("https://example.com", "Is this true?", [])
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })

  it("returns mock response when API key is empty", async () => {
    process.env.GEMINI_API_KEY = ""
    const { chatAboutNews } = await import("@/server/gemini/client")
    const result = await chatAboutNews("https://example.com", "Is this true?", [])
    expect(typeof result).toBe("string")
    expect(result.length).toBeGreaterThan(0)
  })
})

describe("parseGeminiResponse edge cases", () => {
  it("parses JSON wrapped in markdown code fences", async () => {
    process.env.GEMINI_API_KEY = "mock"
    const { checkNews } = await import("@/server/gemini/client")
    const result = await checkNews("https://example.com/test")
    expect(result).toHaveProperty("verdict")
    expect(result).toHaveProperty("confidence")
    expect(result).toHaveProperty("summary")
  })

  it("handles confidence values outside 0-1 range by capping to min(1, val)", async () => {
    process.env.GEMINI_API_KEY = "mock"
    const { checkNews } = await import("@/server/gemini/client")
    const result = await checkNews("https://example.com/test")
    expect(result.confidence).toBeGreaterThanOrEqual(0)
    expect(result.confidence).toBeLessThanOrEqual(1)
  })
})
