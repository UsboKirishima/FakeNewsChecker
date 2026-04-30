import NewsChecker from "@/components/features/NewsChecker"

export default function DashboardPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Fake News Checker</h1>
      <NewsChecker />
    </main>
  )
}
