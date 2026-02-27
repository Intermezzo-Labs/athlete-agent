"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/nil-resources/house-settlement", label: "House Settlement" },
  { href: "/nil-resources/state", label: "State" },
  { href: "/nil-resources/college", label: "College" },
  { href: "/nil-resources/high-school", label: "High School" },
  { href: "/nil-resources/collectives", label: "Collectives" },
  { href: "/nil-resources/ftc-guidelines", label: "FTC Guidelines" },
]

export function ResourceTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b border-neutral-200 bg-white sticky top-0 z-30 shadow-sm">
      <div className="mx-auto max-w-7xl px-0 md:px-12">
        <nav
          className="flex gap-0 overflow-x-auto -mb-px"
          aria-label="NIL Resources navigation"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TABS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex-none whitespace-nowrap py-3.5 px-3.5 sm:px-5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] border-b-2 transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#102243]",
                  active
                    ? "border-[#102243] text-[#102243]"
                    : "border-transparent text-neutral-400 hover:text-neutral-700 hover:border-neutral-300",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
