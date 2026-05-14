import Navbar from "@/components/layout/Navbar"
import NewsChecker from "@/components/features/NewsChecker"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pb-20">
        <div className="mb-10 text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Fake News Checker
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Paste any news article URL and our AI will analyze it using live web search to determine its credibility.
          </p>
        </div>
        <NewsChecker />
      </div>
    </div>
  )
}
