import clsx from "clsx"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-10 max-w-xs mx-auto" aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-px overflow-hidden bg-line">
            <div
              className={clsx(
                "h-full transition-all duration-500 ease-in-out",
                i + 1 <= currentStep ? "w-full bg-ink" : "w-0"
              )}
            />
          </div>
          {i < totalSteps - 1 ? (
            <div
              className={clsx(
                "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300",
                i + 1 < currentStep ? "bg-ink" : "bg-ink-faint"
              )}
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
