import { ChevronDown } from "lucide-react"
import { memo } from "react"

interface FilterSelectProps {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}

// ── Best practice: rerender-memo ──
// Prevents re-render when sibling filters change.
export const FilterSelect = memo(function FilterSelect({ value, onChange, options, placeholder }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full pl-3 pr-8 py-2 border border-line rounded-md text-sm focus:outline-none focus:border-ink bg-surface text-ink transition duration-200 ease-in-out"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-faint pointer-events-none" aria-hidden="true" />
    </div>
  )
})
