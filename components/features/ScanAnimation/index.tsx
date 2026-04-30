export default function ScanAnimation() {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-muted-foreground">Analyzing article...</span>
    </div>
  )
}
