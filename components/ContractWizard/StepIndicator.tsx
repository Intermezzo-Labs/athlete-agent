import clsx from "clsx"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

// ── Best practice: rendering-hoist-jsx ──
// This is a pure presentational component - no 'use client' needed.
export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1 mb-8 max-w-xs mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-navy-700">
            <div
              className={clsx(
                "h-full rounded-full transition-all duration-500",
                i + 1 <= currentStep ? "w-full bg-gradient-to-r from-gold-500 to-gold-400" : "w-0"
              )}
            />
          </div>
          {i < totalSteps - 1 ? (
            <div
              className={clsx(
                "w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300",
                i + 1 < currentStep ? "bg-gold-500" : "bg-navy-700"
              )}
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
