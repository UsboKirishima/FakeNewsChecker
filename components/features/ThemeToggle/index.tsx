"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/lib/theme-provider"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        aria-label="Toggle theme"
        className="w-10 h-10 p-0 flex items-center justify-center"
      >
        <Sun size={18} />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-10 h-10 p-0 flex items-center justify-center"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
