export default function ScanAnimation() {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin dark:border-zinc-50" />
      <span className="text-zinc-600 dark:text-zinc-400">Analyzing article...</span>
    </div>
  )
}
