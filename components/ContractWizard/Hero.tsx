"use client"

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface HeroProps {
  onStart: () => void
}

// ── Sports image sources (Unsplash) ──────────────────────────────────────────
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80",
  editorial: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=700&q=80",
  feature1: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",
  feature2: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&q=80",
  feature3: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=700&q=80",
  cta: "https://images.unsplash.com/photo-1508098682722-e99c643083a5?w=1920&q=80",
}

export function Hero({ onStart }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const heroCTARef = useRef<HTMLButtonElement>(null)

  // Show sticky bar once the hero CTA button scrolls out of view (y.co pattern)
  useEffect(() => {
    const el = heroCTARef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setStickyVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-black text-white">

      {/* ── Fixed Navigation ──────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md"
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a
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
                <path d="M0 40L48 0L52 0L20 40Z" fill="#FFD60A" />
                <path d="M10 40L50 6L54 6L26 40Z" fill="#FFD60A" opacity="0.7" />
                <path d="M20 40L52 12L56 12L32 40Z" fill="#FFD60A" opacity="0.4" />
              </g>
              {/* Text */}
              <text
                x="66"
                y="35"
                fontFamily="'Arial Black', 'Impact', sans-serif"
                fontWeight="900"
                fontSize="26"
                fill="#FFD60A"
                letterSpacing="3"
              >
                ATHLETE AGENT LABS
              </text>
            </svg>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#features", label: "Features" },
              { href: "#stats", label: "Why Us" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs tracking-widest uppercase text-white/60 hover:text-white transition duration-200 ease-in-out"
              >
                {label}
              </a>
            ))}
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 bg-[#FFD60A] text-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#f0c800] transition duration-200 ease-in-out"
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
            className="md:hidden border-t border-white/10 bg-black"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {[
                { href: "#how-it-works", label: "How It Works" },
                { href: "#features", label: "Features" },
                { href: "#stats", label: "Why Us" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition duration-200"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onStart() }}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#FFD60A] text-black px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-sm"
              >
                Analyze Contract
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero — Full Viewport ───────────────────────────────────────────── */}
      <section
        className="relative h-screen overflow-hidden"
        aria-label="Hero"
      >
        <Image
          src={IMAGES.hero}
          alt="Athletes competing on a stadium track"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Layered dark overlays for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Small-caps overline */}
        <div className="absolute top-28 left-6 md:left-16">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#FFD60A]">
            NIL Contract Intelligence
          </span>
        </div>

        {/* Headline — bottom-left, y.co editorial positioning */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 md:px-16 md:pb-24">
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none tracking-tight">
            YOUR GAME.
            <br />
            <span className="italic font-light text-[#FFD60A]">YOUR TERMS.</span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              ref={heroCTARef}
              onClick={onStart}
              className="inline-flex items-center gap-3 bg-[#FFD60A] text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#f0c800] transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 right-6 md:right-16"
          aria-hidden="true"
        >
          <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
        </div>
      </section>

      {/* ── Editorial — "More Than a Tool" ────────────────────────────────── */}
      <section
        id="how-it-works"
        className="bg-black py-28 md:py-36"
        aria-label="About"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#FFD60A] block mb-8">
                More Than a Tool
              </span>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tight">
                KNOW WHAT
                <br />
                YOU&apos;RE
                <br />
                <span className="italic font-light">SIGNING</span>
              </h2>
              <p className="mt-10 text-base text-white/50 leading-relaxed max-w-md">
                Every word in your NIL contract matters. Our AI reads between the lines —
                flagging exclusivity traps, unfair revenue splits, and binding clauses that
                can lock you out of future deals.
              </p>
              <p className="mt-4 text-base text-white/50 leading-relaxed max-w-md">
                Built by a licensed Florida sports attorney, every analysis reflects
                real-world legal standards — not just pattern matching.
              </p>
              <button
                onClick={onStart}
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white border-b-2 border-[#FFD60A] pb-1 hover:text-[#FFD60A] transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD60A]"
              >
                Start your analysis <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Editorial image */}
            <div
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
              aria-hidden="true"
            >
              <Image
                src={IMAGES.editorial}
                alt="Athlete on basketball court"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Yellow left-edge accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD60A]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Cards — "What We Analyze" ────────────────────────────── */}
      <section
        id="features"
        className="bg-neutral-950 py-28 md:py-36"
        aria-label="Features"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">

          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#FFD60A] block mb-6">
                What We Analyze
              </span>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tight">
                IN YOUR
                <br />
                <span className="italic font-light">CORNER</span>
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Comprehensive AI-powered review across every clause type that
              student-athletes encounter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                img: IMAGES.feature1,
                label: "01",
                title: "Risk Detection",
                body: "Instant identification of high, medium, and low-risk clauses covering compensation, exclusivity, termination rights, and IP ownership.",
              },
              {
                img: IMAGES.feature2,
                label: "02",
                title: "NIL Compliance",
                body: "Cross-referenced against NCAA, NAIA, and all 50 state NIL laws. Know exactly where you stand before a single signature.",
              },
              {
                img: IMAGES.feature3,
                label: "03",
                title: "Plain-English Report",
                body: "Zero legalese. Every clause translated into clear, actionable language with specific recommendations and red-flag alerts.",
              },
            ].map((card) => (
              <article
                key={card.label}
                className="bg-neutral-950 p-8 group"
              >
                <div className="relative aspect-[3/2] overflow-hidden mb-8">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <span className="text-[#FFD60A] text-[10px] tracking-[0.3em] uppercase">
                  {card.label}
                </span>
                <h3 className="text-xl font-bold uppercase mt-3 mb-4 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section
        id="stats"
        className="bg-[#FFD60A] py-20"
        aria-label="Key statistics"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-16">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { num: "2 min", label: "Average analysis time" },
              { num: "47+", label: "Risk categories checked" },
              { num: "50", label: "State NIL laws covered" },
              { num: "100%", label: "Confidential & secure" },
            ].map(({ num, label }) => (
              <div key={label}>
                <dt className="text-5xl md:text-6xl font-black text-black leading-none">
                  {num}
                </dt>
                <dd className="mt-3 text-[10px] text-black/50 uppercase tracking-[0.2em]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Full-Bleed CTA ────────────────────────────────────────────────── */}
      <section
        className="relative h-[65vh] overflow-hidden"
        aria-label="Call to action"
      >
        <Image
          src={IMAGES.cta}
          alt="Athlete celebrating victory"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#FFD60A] mb-8">
            Free During Beta
          </span>
          <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-none tracking-tight">
            DON&apos;T SIGN
            <br />
            <span className="italic font-light">BLIND</span>
          </h2>
          <button
            onClick={onStart}
            className="mt-14 inline-flex items-center gap-3 bg-[#FFD60A] text-black px-10 py-5 text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#f0c800] transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Start NIL contract analysis"
          >
            Analyze My Contract
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <p className="mt-5 text-white/30 text-xs tracking-wide">
            No account required &middot; Results in minutes
          </p>
        </div>
      </section>

      {/* ── Sticky Mobile CTA — visible once hero button leaves viewport ── */}
      <div
        role="complementary"
        aria-label="Sticky call to action"
        className={[
          "md:hidden fixed bottom-0 left-0 right-0 z-50",
          "transition-transform duration-300 ease-in-out",
          stickyVisible ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {/* Gradient fade above the bar for depth */}
        <div className="h-8 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="bg-black border-t border-white/10 px-4 py-3">
          <button
            onClick={onStart}
            className="w-full inline-flex items-center justify-center gap-3 bg-[#FFD60A] text-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#f0c800] active:scale-[0.98] transition duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Analyze your NIL contract"
          >
            Analyze My Contract
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <p className="mt-2 text-center text-[10px] text-white/25 tracking-wide">
            Free during beta &middot; No account required
          </p>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/10 py-12 pb-28 md:pb-12">
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
