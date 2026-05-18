"use client"

import { User, Shield } from "lucide-react"
import { useSession } from "next-auth/react"

export function ProfileCard() {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5">
      <div className="flex items-center gap-4">
        {session.user.image ? (
          <img src={session.user.image} alt="" className="h-12 w-12 rounded-full" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
            <User size={20} className="text-zinc-500 dark:text-zinc-400" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Authenticated</span>
          </div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
            {session.user.name}
          </p>
          <p className="text-xs text-zinc-500 truncate">{session.user.email}</p>
        </div>
      </div>
    </div>
  )
}
