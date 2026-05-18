import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("joins multiple class names with a space", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("filters out falsy values", () => {
    expect(cn("foo", false, "bar", undefined, "baz", "")).toBe("foo bar baz")
  })

  it("returns empty string for no args", () => {
    expect(cn()).toBe("")
  })

  it("returns empty string when all falsy", () => {
    expect(cn(false, undefined, "")).toBe("")
  })

  it("handles a single class", () => {
    expect(cn("only")).toBe("only")
  })
})
