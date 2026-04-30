import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/features/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Image src="/next.svg" alt="Logo" width={32} height={32} className="dark:invert" />
          <span className="font-bold text-lg">Fake News Checker</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Detect Fake News with AI
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Paste any news article URL and our AI will analyze it using web search to determine if it's real or fake news. Get detailed analysis and confidence scores instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/auth/login"
              className="px-8 py-3 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login#features"
              className="px-8 py-3 border border-zinc-300 rounded-lg font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div id="features" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="p-6 border rounded-lg dark:border-zinc-800">
              <div className="text-3xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">01</div>
              <h3 className="font-semibold text-lg mb-2">Paste URL</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Simply paste any news article link into our checker
              </p>
            </div>
            <div className="p-6 border rounded-lg dark:border-zinc-800">
              <div className="text-3xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">02</div>
              <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Google Gemini analyzes with real-time web search grounding
              </p>
            </div>
            <div className="p-6 border rounded-lg dark:border-zinc-800">
              <div className="text-3xl font-bold mb-3 text-zinc-900 dark:text-zinc-50">03</div>
              <h3 className="font-semibold text-lg mb-2">Get Verdict</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Receive verdict with confidence score and detailed AI comments
              </p>
            </div>
          </div>
      </main>

      <footer className="border-t py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
        <p>© 2026 Fake News Checker. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}
