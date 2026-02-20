"use client"

import logo from "@/assets/athlete-agent-labs-logo.svg"
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
const NAVY = "#102243"

export function Hero({ onStart }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="flex flex-col text-white"
      style={{ backgroundColor: NAVY }}
    >

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <header
        className="flex-none z-20"
        style={{ backgroundColor: NAVY, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        role="banner"
      >
        <div className="w-full px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between h-[96px] md:h-[112px]">

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center select-none opacity-95 hover:opacity-100 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
              aria-label="Athlete Agent Labs — home"
            >
              <Image
                src={logo}
                alt="Athlete Agent Labs"
                className="h-24 sm:h-24 md:h-28 w-auto"
              />
            </Link>

            {/* Desktop CTA */}
            <nav className="hidden md:flex items-center" aria-label="Primary navigation">
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 bg-white text-[#102243] px-5 py-[10px] text-[11px] font-black uppercase tracking-[0.16em] rounded-sm hover:bg-white/90 active:scale-[0.98] transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Analyze your NIL contract"
              >
                Analyze Contract
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              </button>
            </nav>

            {/* Mobile hamburger — 44×44 touch target */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-white/60 hover:text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen
                ? <X className="w-[18px] h-[18px]" aria-hidden="true" />
                : <Menu className="w-[18px] h-[18px]" aria-hidden="true" />
              }
            </button>

          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden"
            style={{ backgroundColor: NAVY, borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="px-6 sm:px-10 py-5">
              <button
                onClick={() => { setMenuOpen(false); onStart() }}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-white text-[#102243] py-3.5 text-[11px] font-black uppercase tracking-[0.16em] rounded-sm hover:bg-white/90 active:scale-[0.99] transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102243]/40"
              >
                Analyze My Contract
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero — Full viewport height ────────────────────────────────────── */}
      <section
        className="relative h-screen overflow-hidden"
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
        <div className="absolute top-6 sm:top-8 left-4 sm:left-6 md:left-16">
          <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-white/60">
            NIL Contract Intelligence
          </span>
        </div>

        {/* Headline — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-16 text-center">
          <h1 className="text-[clamp(2.75rem,9vw,9rem)] font-black uppercase leading-none tracking-tight">
            YOUR GAME.
            <br />
            <span className="italic font-light text-white/50">YOUR TERMS.</span>
          </h1>

          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#102243] px-6 sm:px-8 py-3 sm:py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white/90 transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Begin NIL contract analysis"
            >
              Analyze My Contract
              <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" aria-hidden="true" />
            </button>
            <p className="text-xs sm:text-sm text-white/50">
              Free during beta &middot; No account required
            </p>
          </div>
        </div>

      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t py-12" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-white font-bold text-xs tracking-[0.2em] uppercase">
            Athlete Agent Labs
          </span>
          <nav
            className="flex items-center gap-8"
            aria-label="Footer navigation"
          >
            {[
              { href: "/privacy-policy", label: "Privacy" },
              { href: "/terms-of-service", label: "Terms" },
              { href: "/disclaimer", label: "Disclaimer" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs text-white/30 hover:text-white/70 transition duration-200 uppercase tracking-widest"
              >
                {label}
              </a>
            ))}
          </nav>
          <span className="text-[10px] text-white/20 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} All rights reserved
          </span>
        </div>
      </footer>

    </div>
  )
}
