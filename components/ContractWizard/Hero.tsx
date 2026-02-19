"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface HeroProps {
  onStart: () => void
}

// ── Best practice: rendering-hoist-jsx ──
// Static nav links hoisted as constants to avoid recreating JSX every render.
const footerLinks = (
  <footer className="fixed bottom-0 left-0 right-0 px-6 py-4 border-t border-white/20 bg-black/80 backdrop-blur-sm z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
      <a href="/privacy-policy" className="text-white/80 text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors">
        Privacy Policy
      </a>
      <div className="w-px h-4 bg-white/30" />
      <a href="/terms-of-service" className="text-white/80 text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors">
        Terms of Service
      </a>
      <div className="w-px h-4 bg-white/30" />
      <a href="/disclaimer" className="text-white/80 text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors">
        Disclaimer
      </a>
    </div>
  </footer>
)

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#060f1d] pl-3 pr-6 py-3 relative z-50 flex items-center justify-between">
        <Image
          src="/logo-site-matched.png"
          alt="Athlete Agent Labs"
          width={504}
          height={95}
          className="w-auto"
          style={{ height: "72px" }}
          priority
        />
        <nav className="flex items-center gap-8">
          <a href="/blog" className="text-white text-sm font-semibold uppercase tracking-wider hover:text-gold-500 transition-colors">
            Blog
          </a>
          <a href="/nil-laws" className="text-white text-sm font-semibold uppercase tracking-wider hover:text-gold-500 transition-colors">
            NIL Laws and Resources
          </a>
        </nav>
      </header>

      {/* Background image section */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />

        <main className="relative flex-1 flex items-center justify-center px-6 py-12 pb-24" style={{ zIndex: 10 }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight text-white mb-6 leading-[0.95] animate-slide-up">
              Know what{" "}
              <br className="hidden md:block" />
              you&apos;re signing
              <span className="text-white">.</span>
            </h1>

            <p
              className="text-lg md:text-xl text-navy-300 font-light mb-10 max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Upload your NIL contract and get a detailed risk analysis in minutes. Understand the fine print before you
              commit.
            </p>

            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-10 py-4 rounded-lg font-bold text-lg uppercase tracking-wider btn-athletic shadow-lg shadow-gold-500/25 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Analyze My Contract
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <p
              className="mt-8 text-xs uppercase tracking-widest text-navy-500 font-medium animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              No account required &bull; Results in minutes &bull; Free during beta
            </p>
          </div>
        </main>
      </div>

      {footerLinks}
    </div>
  )
}
