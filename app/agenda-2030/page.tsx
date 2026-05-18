import Navbar from "@/components/layout/Navbar"
import { Newspaper, Shield, Target, Globe, CheckCircle, BookOpen, Heart, Users, Scale } from "lucide-react"

const goals = [
  {
    icon: Shield,
    title: "Peace, Justice & Strong Institutions",
    desc: "By fighting disinformation, we strengthen democratic institutions and ensure citizens can make informed decisions. Access to truthful news is a foundation of justice and accountable governance.",
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    desc: "We promote media literacy and critical thinking. Every analysis educates users on how to evaluate sources, recognize bias, and distinguish fact from fiction.",
  },
  {
    icon: Globe,
    title: "Partnerships for the Goals",
    desc: "Our platform collaborates with AI technology and open web search to create a replicable model for truth verification. We believe in shared tools for a shared future.",
  },
  {
    icon: Heart,
    title: "Good Health & Well-being",
    desc: "Misinformation, especially in healthcare, can cause real harm. By flagging fake medical news, we help protect public health and well-being.",
  },
  {
    icon: Users,
    title: "Reduced Inequalities",
    desc: "Access to verified information should not be a privilege. Our free and open platform ensures everyone — regardless of background — can verify what they read.",
  },
  {
    icon: Scale,
    title: "Responsible Consumption",
    desc: "We encourage responsible information consumption. Just as we make informed choices about products, we should make informed choices about the news we trust and share.",
  },
]

export default function Agenda2030Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-3.5 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <Target size={12} />
            Agenda 2030
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Why Fake News Detection Matters
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Democracy depends on a free and informed press. Our mission is aligned with the United Nations
            Sustainable Development Goals for 2030.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 mb-10 space-y-5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Newspaper size={18} className="text-zinc-400" />
            Free Press, Strong Democracy
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A functioning democracy relies on free and independent journalism. Citizens need access to
            accurate information to make informed decisions about their leaders, their health, and their
            communities. When fake news spreads, it erodes trust in institutions, deepens social divisions,
            and threatens the very fabric of democratic society.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our platform uses AI-powered analysis to detect fake news, helping readers separate fact from
            fiction. By promoting media literacy and providing transparent, evidence-based verdicts, we
            empower individuals to become responsible consumers of information.
          </p>
          <div className="flex items-start gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4">
            <CheckCircle size={18} className="shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Our Commitment</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                Every article analyzed contributes to a more informed public. We are building the tools for a
                truth-resilient society.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 mb-10 space-y-5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Target size={18} className="text-zinc-400" />
            The Problem: Disinformation in the Digital Age
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Misinformation spreads faster than ever. Social media algorithms amplify sensational content
            regardless of its truthfulness. Malicious actors exploit these systems to manipulate public
            opinion, interfere with elections, and spread harmful health advice. The result is a world where
            seeing a story online is no guarantee of its accuracy.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Fake news is not just a nuisance — it is a threat to democracy, public health, and social
            cohesion. Without reliable tools to verify information, citizens are left vulnerable to
            manipulation.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Misinformation", desc: "False or inaccurate information shared without malicious intent" },
              { label: "Disinformation", desc: "Deliberately false information created to deceive" },
              { label: "Malinformation", desc: "True information shared out of context to cause harm" },
            ].map((item, i) => (
              <div key={i} className="rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-3.5">
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">{item.label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <Globe size={18} className="text-zinc-400" />
            Our Contribution to the UN Sustainable Development Goals
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 -mt-4">
            Agenda 2030 is a global framework for peace, prosperity, and sustainability. Here is how our
            mission contributes.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal, i) => (
              <div
                key={i}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50">
                    <goal.icon size={18} className="text-white dark:text-zinc-900" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{goal.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{goal.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 px-6 py-8 text-center">
          <h2 className="text-xl font-bold text-white sm:text-2xl">A shared responsibility</h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
            Fighting fake news is not just the job of platforms and governments. Every share, every click,
            every check makes a difference. Together, we can build a more informed world.
          </p>
        </div>
      </div>
    </div>
  )
}
