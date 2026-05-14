import Link from "next/link"
import Navbar from "@/components/layout/Navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pb-32 sm:pt-36">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
            <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent dark:from-zinc-800/30 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-in" style={{ animationDelay: "0ms" }}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
                  Powered by Google Gemini AI
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl text-balance animate-in" style={{ animationDelay: "100ms" }}>
                Detect{" "}
                <span className="bg-gradient-to-r from-red-500 via-zinc-800 to-emerald-600 bg-clip-text text-transparent dark:from-red-400 dark:via-zinc-200 dark:to-emerald-400 animate-gradient">
                  Fake News
                </span>{" "}
                with AI-Powered Precision
              </h1>

              <p className="mt-5 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg max-w-xl mx-auto text-balance animate-in" style={{ animationDelay: "200ms" }}>
                Paste any news article URL and get an instant, AI-driven analysis. We cross-reference claims
                across the web to tell you what&apos;s real, what&apos;s fake, and what&apos;s worth a second look.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3 animate-in" style={{ animationDelay: "300ms" }}>
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-700 hover:shadow-xl hover:-translate-y-0.5 dark:bg-zinc-50 dark:text-zinc-900 dark:shadow-zinc-50/10 dark:hover:bg-zinc-200"
                >
                  Start Checking
                </Link>
                <Link
                  href="/#features"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative mx-auto mt-16 max-w-5xl animate-in" style={{ animationDelay: "400ms" }}>
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-900/5">
                <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs text-zinc-400">fake-news-checker.app</span>
                </div>
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 py-2.5">
                    <span className="text-sm text-zinc-400">https://</span>
                    <span className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">example.com/news/article</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-300 animate-shimmer" />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">Analyzing...</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Fetching", "Cross-referencing", "Generating verdict"].map((s, i) => (
                      <div key={i} className="rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 p-2.5 text-center">
                        <div className={`mx-auto mb-1 h-1.5 w-1.5 rounded-full ${i < 2 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
                        <span className="text-[11px] text-zinc-500">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-zinc-100 dark:bg-zinc-800 blur-3xl" />
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-zinc-100 dark:border-zinc-800 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl text-balance">
                How it works
              </h2>
              <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
                Three simple steps to separate fact from fiction.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Paste a URL",
                  desc: "Drop any news article link into our checker. No account needed to see how it works.",
                  gradient: "from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900",
                },
                {
                  num: "02",
                  title: "AI Analysis",
                  desc: "Gemini AI reads the article, searches the live web, and cross-references every claim.",
                  gradient: "from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800",
                },
                {
                  num: "03",
                  title: "Get the Verdict",
                  desc: "See a clear verdict with confidence score, key findings, and detailed source analysis.",
                  gradient: "from-zinc-400 to-zinc-300 dark:from-zinc-600 dark:to-zinc-700",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/5"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-lg font-bold mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      {feature.num}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 dark:border-zinc-800 py-20 sm:py-28 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl text-balance">
                Transparent, detailed analysis
              </h2>
              <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
                Every verdict comes with evidence so you can decide for yourself.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { value: "90%+", label: "Detection Accuracy", color: "from-emerald-500 to-emerald-600" },
                { value: "3s", label: "Average Analysis Time", color: "from-blue-500 to-blue-600" },
                { value: "100+", label: "Articles Analyzed", color: "from-violet-500 to-violet-600" },
                { value: "99.9%", label: "Uptime", color: "from-amber-500 to-amber-600" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`inline-flex bg-gradient-to-br ${stat.color} bg-clip-text text-transparent text-3xl font-bold tabular-nums`}>
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-100 dark:border-zinc-800 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="relative isolate overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 px-6 py-14 sm:px-14 sm:py-20 text-center">
              <div className="absolute inset-0 -z-10">
                <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
                Start verifying news today
              </h2>
              <p className="mt-3 mx-auto max-w-md text-base text-zinc-400">
                No credit card required. Just paste a link and get answers immediately.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-100 hover:-translate-y-0.5"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/#features"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-50">
                <span className="text-[10px] font-bold text-white dark:text-zinc-900">FC</span>
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Fake News Checker</span>
            </div>
            <p className="text-xs text-zinc-400">
              &copy; 2026 Fake News Checker. Powered by Davide Usberti & Luca Coppellotti.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
