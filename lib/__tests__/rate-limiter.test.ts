import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { rateLimiter } from "@/lib/rate-limiter"

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe("rateLimiter", () => {
  it("allows requests within the limit", () => {
    const result = rateLimiter("test-key", { windowMs: 60_000, max: 3 })
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it("blocks requests when limit is exceeded", () => {
    rateLimiter("test-key-2", { windowMs: 60_000, max: 2 })
    rateLimiter("test-key-2", { windowMs: 60_000, max: 2 })
    const result = rateLimiter("test-key-2", { windowMs: 60_000, max: 2 })
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it("resets after the window passes", () => {
    rateLimiter("test-key-3", { windowMs: 60_000, max: 1 })
    const blocked = rateLimiter("test-key-3", { windowMs: 60_000, max: 1 })
    expect(blocked.success).toBe(false)

    vi.advanceTimersByTime(60_001)

    const allowed = rateLimiter("test-key-3", { windowMs: 60_000, max: 1 })
    expect(allowed.success).toBe(true)
    expect(allowed.remaining).toBe(0)
  })

  it("uses default config when not provided", () => {
    for (let i = 0; i < 10; i++) {
      const result = rateLimiter("default-key")
      if (i < 10) expect(result.success).toBe(true)
    }
    const blocked = rateLimiter("default-key")
    expect(blocked.success).toBe(false)
  })

  it("tracks remaining count correctly", () => {
    rateLimiter("remaining-key", { windowMs: 60_000, max: 5 })
    rateLimiter("remaining-key", { windowMs: 60_000, max: 5 })
    const result = rateLimiter("remaining-key", { windowMs: 60_000, max: 5 })
    expect(result.remaining).toBe(2)
  })

  it("uses separate windows per key", () => {
    rateLimiter("key-a", { windowMs: 60_000, max: 1 })
    const resultA = rateLimiter("key-a", { windowMs: 60_000, max: 1 })
    expect(resultA.success).toBe(false)

    const resultB = rateLimiter("key-b", { windowMs: 60_000, max: 1 })
    expect(resultB.success).toBe(true)
  })

  it("returns reset timestamp in seconds", () => {
    const now = Date.now()
    const result = rateLimiter("reset-key", { windowMs: 60_000, max: 5 })
    expect(result.reset).toBe(Math.ceil((now + 60_000) / 1000))
  })
})
