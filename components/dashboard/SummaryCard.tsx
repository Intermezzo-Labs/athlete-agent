import { memo } from "react"

interface SummaryCardProps {
  label: string
  value: string | number
  icon: React.ElementType
  accent?: string
}

// ── Best practice: rerender-memo ──
// SummaryCard is rendered four times in the header grid. Memoising prevents
// re-renders when only unrelated dashboard state (e.g. selected tab) changes.
export const SummaryCard = memo(function SummaryCard({ label, value, icon: Icon }: SummaryCardProps) {
  return (
    <div className="bg-surface border border-line rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-ink-muted font-medium">{label}</p>
          <p className="text-3xl font-semibold tabular-nums text-ink mt-1">
            {value}
          </p>
        </div>
        <div className="p-2 bg-subtle rounded-md">
          <Icon className="w-4 h-4 text-ink-muted" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
})
