"use client"

import clsx from "clsx"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

interface DataSectionProps {
  title: string
  data: unknown
}

// Collapsible section for extracted data fields.
export function DataSection({ title, data }: DataSectionProps) {
  const [open, setOpen] = useState(false)
  if (data == null) return null

  return (
    <div className="border border-navy-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-navy-900 hover:bg-navy-800 transition-colors text-left"
      >
        <span className="font-bold text-sm uppercase tracking-wider text-white">{title}</span>
        {/* ── Best practice: rendering-conditional-render ── */}
        <ChevronRight className={clsx("w-4 h-4 text-navy-400 transition-transform", open ? "rotate-90" : null)} />
      </button>
      {open ? (
        <div className="p-4 bg-white">
          <pre className="text-xs text-navy-700 font-mono whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}
