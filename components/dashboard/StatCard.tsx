import { memo } from "react"

interface StatCardProps {
  label: string
  value: string | number
}

// ── Best practice: rerender-memo ──
export const StatCard = memo(function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-navy-900 rounded-lg p-4 text-center">
      <p className="text-gold-400 font-black text-2xl tabular-nums font-display">{value}</p>
      <p className="text-navy-300 uppercase tracking-wider text-[10px] font-semibold mt-1">{label}</p>
    </div>
  )
})
