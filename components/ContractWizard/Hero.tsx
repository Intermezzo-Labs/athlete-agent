"use client"

import logoDark from "@/assets/logo-dark.svg"
import logoWhite from "@/assets/logo-white.svg"
import { ThemeToggle } from "components/ThemeToggle"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface HeroProps {
  onStart: () => void
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* Navigation */}
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={logoDark}
              alt="Athlete Agent Labs"
              className="h-8 w-auto dark:hidden"
              priority
            />
            <Image
              src={logoWhite}
              alt="Athlete Agent Labs"
              className="h-8 w-auto hidden dark:block"
              priority
            />
          </div>
          <nav className="flex items-center gap-6" aria-label="Primary navigation">
            <a
              href="/blog"
              className="text-sm text-ink-muted hover:text-ink transition duration-200 ease-in-out"
            >
              Blog
            </a>
            <a
              href="/nil-laws"
              className="text-sm text-ink-muted hover:text-ink transition duration-200 ease-in-out"
            >
              NIL laws
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center" id="main-content">
        <section className="w-full py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-semibold italic tracking-tight text-ink leading-tight">
              Know what you&rsquo;re signing.
            </h1>

            <p className="mt-6 text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
              Upload your NIL contract and receive a detailed risk analysis in minutes.
              Understand every clause before you commit.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FF6600] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition duration-200 ease-in-out"
                aria-label="Begin contract analysis"
              >
                Analyze my contract
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-8 text-xs text-ink-faint">
              No account required &middot; Results in minutes &middot; Free during beta
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-center gap-6">
          <a
            href="/privacy-policy"
            className="text-xs text-ink-muted hover:text-ink transition duration-200 ease-in-out"
          >
            Privacy policy
          </a>
          <span className="text-ink-faint select-none" aria-hidden="true">·</span>
          <a
            href="/terms-of-service"
            className="text-xs text-ink-muted hover:text-ink transition duration-200 ease-in-out"
          >
            Terms of service
          </a>
          <span className="text-ink-faint select-none" aria-hidden="true">·</span>
          <a
            href="/disclaimer"
            className="text-xs text-ink-muted hover:text-ink transition duration-200 ease-in-out"
          >
            Disclaimer
          </a>
        </div>
      </footer>
    </div>
  )
}
