import clsx from "clsx"

interface RiskBadgeProps {
  level: "low" | "medium" | "high"
}

// ── Best practice: rendering-hoist-jsx ──
// Config object is hoisted outside the component.
const CONFIG = {
  low: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Low Risk" },
  medium: { bg: "bg-amber-100", text: "text-amber-800", label: "Medium Risk" },
  high: { bg: "bg-red-100", text: "text-red-800", label: "High Risk" },
} as const

export function RiskBadge({ level }: RiskBadgeProps) {
  const { bg, text, label } = CONFIG[level]
  return (
    <span className={clsx("px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider", bg, text)}>
      {label}
    </span>
  )
}
