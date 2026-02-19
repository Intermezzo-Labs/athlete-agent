import clsx from "clsx"

interface RiskBadgeProps {
  level: "low" | "medium" | "high"
}

const CONFIG = {
  low:    { bg: "bg-emerald-50",  text: "text-emerald-700", border: "border-emerald-200", label: "Low risk" },
  medium: { bg: "bg-amber-50",    text: "text-amber-700",   border: "border-amber-200",   label: "Medium risk" },
  high:   { bg: "bg-red-50",      text: "text-red-700",     border: "border-red-200",     label: "High risk" },
} as const

export function RiskBadge({ level }: RiskBadgeProps) {
  const { bg, text, border, label } = CONFIG[level]
  return (
    <span className={clsx("inline-block px-2.5 py-0.5 rounded border text-xs font-medium", bg, text, border)}>
      {label}
    </span>
  )
}
