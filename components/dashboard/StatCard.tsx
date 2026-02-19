import { memo } from "react"

interface StatCardProps {
  label: string
  value: string | number
}

// ── Best practice: rerender-memo ──
export const StatCard = memo(function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="border border-line rounded-lg p-4 text-center bg-surface">
      <p className="text-ink font-semibold text-2xl tabular-nums">{value}</p>
      <p className="text-ink-muted text-xs font-medium mt-1">{label}</p>
    </div>
  )
})
