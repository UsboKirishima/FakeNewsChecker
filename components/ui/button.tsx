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
        variant === "default" && "bg-primary text-white hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent",
        className
      )}
      {...props}
    />
  )
}
