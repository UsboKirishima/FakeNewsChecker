"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/layout/Navbar"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Welcome back</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Sign in to verify news articles</p>
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" }, { prompt: "select_account" })}
              className="w-full"
            >
              Sign in with Google
            </Button>
            <Button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              variant="outline"
              className="w-full"
            >
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
