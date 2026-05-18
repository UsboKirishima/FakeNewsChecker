import { describe, it, expect, vi, beforeEach } from "vitest"
import type { SearchRecord } from "@/lib/types"

const mockDb = {
  execute: vi.fn(),
}

vi.mock("@/lib/db", () => ({
  db: mockDb,
}))

describe("search actions", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("createSearch", () => {
    it("inserts a search record and returns it with id and createdAt", async () => {
      mockDb.execute.mockResolvedValue({ rows: [] })
      const { createSearch } = await import("@/server/actions/search")

      const result = await createSearch({
        url: "https://example.com/news",
        verdict: "FAKE",
        confidence: 0.85,
        aiComments: '{"summary":"test"}',
        userId: "user-1",
      })

      expect(result).toMatchObject({
        url: "https://example.com/news",
        verdict: "FAKE",
        confidence: 0.85,
        userId: "user-1",
      })
      expect(result).toHaveProperty("id")
      expect(result).toHaveProperty("createdAt")
      expect(typeof result.id).toBe("string")
      expect(typeof result.createdAt).toBe("number")
      expect(mockDb.execute).toHaveBeenCalledTimes(1)
    })

    it("inserts a search record without optional fields", async () => {
      mockDb.execute.mockResolvedValue({ rows: [] })
      const { createSearch } = await import("@/server/actions/search")

      const result = await createSearch({
        url: "https://example.com/news",
        verdict: "REAL",
        confidence: 0.9,
        userId: "user-2",
      })

      expect(result.aiComments).toBeUndefined()
      expect(mockDb.execute).toHaveBeenCalledWith({
        sql: expect.stringContaining("INSERT INTO Search"),
        args: expect.arrayContaining(["user-2"]),
      })
    })

    it("generates unique IDs", async () => {
      mockDb.execute.mockResolvedValue({ rows: [] })
      const { createSearch } = await import("@/server/actions/search")

      const r1 = await createSearch({ url: "https://a.com", verdict: "REAL", confidence: 0.5, userId: "u1" })
      const r2 = await createSearch({ url: "https://b.com", verdict: "FAKE", confidence: 0.5, userId: "u1" })

      expect(r1.id).not.toBe(r2.id)
    })
  })

  describe("getHistory", () => {
    it("retrieves search history for a user ordered by createdAt DESC", async () => {
      const mockRows = [
        { id: "1", url: "https://example.com/1", verdict: "FAKE", confidence: 0.9, aiComments: null, userId: "user-1", createdAt: 2000 },
        { id: "2", url: "https://example.com/2", verdict: "REAL", confidence: 0.8, aiComments: null, userId: "user-1", createdAt: 1000 },
      ] as unknown as SearchRecord[]
      mockDb.execute.mockResolvedValue({ rows: mockRows })
      const { getHistory } = await import("@/server/actions/search")

      const result = await getHistory("user-1")
      expect(result).toHaveLength(2)
      expect(result[0].createdAt).toBe(2000)
      expect(mockDb.execute).toHaveBeenCalledWith({
        sql: expect.stringContaining("WHERE userId = ?"),
        args: ["user-1"],
      })
    })

    it("returns an empty array when no history exists", async () => {
      mockDb.execute.mockResolvedValue({ rows: [] })
      const { getHistory } = await import("@/server/actions/search")

      const result = await getHistory("nonexistent-user")
      expect(result).toEqual([])
    })
  })

  describe("getSearchById", () => {
    it("retrieves a search record by id", async () => {
      const mockRow = { id: "search-1", url: "https://example.com", verdict: "FAKE", confidence: 0.9, aiComments: null, userId: "user-1", createdAt: 1000 } as unknown as SearchRecord
      mockDb.execute.mockResolvedValue({ rows: [mockRow] })
      const { getSearchById } = await import("@/server/actions/search")

      const result = await getSearchById("search-1")
      expect(result).not.toBeNull()
      expect(result!.id).toBe("search-1")
    })

    it("returns null when search not found", async () => {
      mockDb.execute.mockResolvedValue({ rows: [] })
      const { getSearchById } = await import("@/server/actions/search")

      const result = await getSearchById("nonexistent")
      expect(result).toBeNull()
    })
  })
})
