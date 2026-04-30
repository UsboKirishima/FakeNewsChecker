"use client"

export default function AiChat({ comments }: { comments: string }) {
  return (
    <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md">
      <p className="text-sm">{comments}</p>
    </div>
  )
}
