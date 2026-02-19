import { memo } from "react"
import { formatCurrency } from "./helpers"

interface BarRowProps {
  label: string
  value: number
  max: number
  format?: "currency" | "number" | "percent"
}

// ── Best practice: rerender-memo ──
// Analytics sections can contain dozens of BarRows – memoising avoids cascading
// re-renders when only unrelated state (e.g. active tab) changes.
export const BarRow = memo(function BarRow({ label, value, max, format }: BarRowProps) {
  const width = max > 0 ? Math.round((value / max) * 100) : 0
  const displayValue =
    format === "currency"
      ? formatCurrency(value)
      : format === "percent"
        ? `${value.toFixed(1)}%`
        : String(value)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-muted w-32 truncate" title={label}>
        {label}
      </span>
      <div className="flex-1 bg-subtle rounded-sm h-1.5">
        <div
          className="bg-ink h-1.5 rounded-sm transition-all duration-300 ease-in-out"
          style={{ width: `${Math.max(width, 2)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-ink w-20 text-right tabular-nums">{displayValue}</span>
    </div>
  )
})
