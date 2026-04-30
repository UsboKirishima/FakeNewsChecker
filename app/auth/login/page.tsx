"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Fake News Checker</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-center">Sign in to verify news articles</p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
          <Button onClick={() => signIn("github")} variant="outline">Sign in with GitHub</Button>
        </div>
      </div>
    </div>
  )
}
