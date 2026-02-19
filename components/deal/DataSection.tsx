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
    <div className="border border-line rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-subtle hover:bg-surface transition duration-200 ease-in-out text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-ink">{title}</span>
        <ChevronRight
          className={clsx("w-4 h-4 text-ink-faint transition-transform duration-200", open ? "rotate-90" : null)}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="p-4 bg-canvas border-t border-line">
          <pre className="text-xs text-ink-muted font-mono whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}
