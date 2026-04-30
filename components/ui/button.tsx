import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium",
        variant === "default" && "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900",
        variant === "outline" && "border border-zinc-300 bg-background hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800",
        className
      )}
      {...props}
    />
  )
}
