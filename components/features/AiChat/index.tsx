"use client"

export default function AiChat({ comments }: { comments: string }) {
  return (
    <div className="p-4 bg-muted rounded-md">
      <p className="text-sm">{comments}</p>
    </div>
  )
}
