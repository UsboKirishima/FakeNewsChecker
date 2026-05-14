import Navbar from "@/components/layout/Navbar"
import SearchHistory from "@/components/features/SearchHistory"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-16">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">Search History</h1>
        <SearchHistory />
      </main>
    </div>
  )
}
