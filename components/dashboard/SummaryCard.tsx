import clsx from "clsx"
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
export const SummaryCard = memo(function SummaryCard({ label, value, icon: Icon, accent }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 card-athletic p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="uppercase tracking-wider text-xs font-semibold text-navy-500">{label}</p>
          <p className={clsx("text-3xl font-black tabular-nums font-display mt-1", accent ?? "text-navy-900")}>
            {value}
          </p>
        </div>
        <div className="p-2.5 bg-gold-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-gold-600" />
        </div>
      </div>
    </div>
  )
})
