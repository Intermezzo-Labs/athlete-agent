import logo from "@/assets/athlete-agent-labs-logo.svg"
import { ResourceTabs } from "components/nil-resources/ResourceTabs"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "NIL Resources | Athlete Agent Labs",
  description:
    "Comprehensive NIL education resources — House Settlement, state laws, college and high school rules, collectives directory, and FTC social media guidelines.",
}

const NAVY = "#102243"

export default function NilResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* ── Site header ─────────────────────────────────────── */}
      <header
        className="flex-none z-40"
        style={{ backgroundColor: NAVY, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-[58px] sm:h-[66px] md:h-[76px]">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center select-none opacity-90 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
              aria-label="Athlete Agent Labs — home"
            >
              <Image
                src={logo}
                alt="Athlete Agent Labs"
                className="h-14 sm:h-16 md:h-20 w-auto"
              />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/50 hover:text-white transition duration-150"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Section header ──────────────────────────────────── */}
      <div style={{ backgroundColor: NAVY }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 pb-7 sm:pb-9 md:pb-10 pt-5 sm:pt-7 md:pt-8">
          <p className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-white/40 mb-2 sm:mb-3">
            Education &amp; Reference
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            NIL Resources
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/50 max-w-xl leading-relaxed">
            A comprehensive reference library for student-athletes, parents, and coaches
            navigating the evolving Name, Image &amp; Likeness landscape.
          </p>
        </div>
      </div>

      {/* ── Tab navigation ──────────────────────────────────── */}
      <ResourceTabs />

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="flex-1 bg-white" id="main-content">
        {children}
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer
        className="border-t py-5 sm:py-6"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">
            Athlete Agent Labs
          </span>
          <p className="text-[11px] text-neutral-400 max-w-sm md:max-w-none">
            This content is for informational purposes only and does not constitute legal advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
