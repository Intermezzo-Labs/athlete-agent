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
      <span className="text-sm text-navy-600 w-32 truncate font-body" title={label}>
        {label}
      </span>
      <div className="flex-1 bg-navy-100 rounded-sm h-3">
        <div
          className="bg-gradient-to-r from-gold-500 to-gold-400 h-3 rounded-sm transition-all"
          style={{ width: `${Math.max(width, 2)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-navy-900 w-20 text-right font-body">{displayValue}</span>
    </div>
  )
})
