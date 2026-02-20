"use client"

import { ArrowRight, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface HeroProps {
  onStart: () => void
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80"

// Navy blue palette
const NAVY = "#0B1F3A"

export function Hero({ onStart }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    // Single-screen: h-screen + overflow-hidden prevents any scrolling
    <div
      className="h-screen overflow-hidden flex flex-col text-white"
      style={{ backgroundColor: NAVY }}
    >

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <header
        className="flex-none border-b border-white/10 backdrop-blur-md"
        style={{ backgroundColor: `${NAVY}e6` }}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="select-none"
            aria-label="Athlete Agent Labs — home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 48"
              fill="none"
              className="h-7 w-auto"
              aria-hidden="true"
            >
              {/* Speed lines icon */}
              <g transform="translate(0, 4)">
                <path d="M0 40L48 0L52 0L20 40Z" fill="white" />
                <path d="M10 40L50 6L54 6L26 40Z" fill="white" opacity="0.7" />
                <path d="M20 40L52 12L56 12L32 40Z" fill="white" opacity="0.4" />
              </g>
              {/* Text */}
              <text
                x="66"
                y="35"
                fontFamily="'Arial Black', 'Impact', sans-serif"
                fontWeight="900"
                fontSize="26"
                fill="white"
                letterSpacing="3"
              >
                ATHLETE AGENT LABS
              </text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-4"
            aria-label="Primary navigation"
          >
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 bg-white text-[#0B1F3A] px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white/90 transition duration-200 ease-in-out"
              aria-label="Analyze your NIL contract"
            >
              Analyze Contract
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white transition duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-white/10"
            style={{ backgroundColor: NAVY }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              <button
                onClick={() => { setMenuOpen(false); onStart() }}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0B1F3A] px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-white/90 transition duration-200 ease-in-out"
              >
                Analyze Contract
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero — Fills remaining viewport height, no scroll ─────────────── */}
      <section
        className="relative flex-1 overflow-hidden"
        aria-label="Hero"
      >
        <Image
          src={HERO_IMAGE}
          alt="Athletes competing on a stadium track"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Navy overlay for brand consistency */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${NAVY} 0%, ${NAVY}99 30%, ${NAVY}33 70%, ${NAVY}1a 100%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${NAVY}99 0%, transparent 60%)`,
          }}
        />

        {/* Small-caps overline */}
        <div className="absolute top-8 left-6 md:left-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/60">
            NIL Contract Intelligence
          </span>
        </div>

        {/* Headline — bottom-left editorial positioning */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-16 md:pb-16">
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none tracking-tight">
            YOUR GAME.
            <br />
            <span className="italic font-light text-white/50">YOUR TERMS.</span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 bg-white text-[#0B1F3A] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white/90 transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Begin NIL contract analysis"
            >
              Analyze My Contract
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <p className="text-sm text-white/50">
              Free during beta &middot; No account required
            </p>
          </div>
        </div>

        {/* Footer link row — anchored to bottom-right */}
        <div className="absolute bottom-6 right-6 md:right-16 hidden md:flex items-center gap-6">
          {[
            { href: "/privacy-policy", label: "Privacy" },
            { href: "/terms-of-service", label: "Terms" },
            { href: "/disclaimer", label: "Disclaimer" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[10px] text-white/25 hover:text-white/60 uppercase tracking-widest transition duration-200"
            >
              {label}
            </a>
          ))}
          <span className="text-[10px] text-white/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Athlete Agent Labs
          </span>
        </div>
      </section>

    </div>
  )
}
