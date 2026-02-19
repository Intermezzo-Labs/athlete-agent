import clsx from "clsx"
import { CheckCircle, Loader2 } from "lucide-react"

interface ProcessingStep {
  label: string
  done: boolean
}

// ── Best practice: rendering-hoist-jsx ──
// Static steps array hoisted outside component – recreating it on every render is wasteful.
const PROCESSING_STEPS: ProcessingStep[] = [
  { label: "Extracting contract text", done: true },
  { label: "Analyzing against NCAA guidelines", done: true },
  { label: "Checking state-specific requirements", done: false },
  { label: "Identifying risk factors", done: false },
  { label: "Generating report", done: false },
]

// Pure presentational component – no 'use client' needed.
export function ProcessingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-canvas">
      <div className="w-full max-w-md text-center">
        {/* Spinner */}
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-8 rounded-full border border-line">
          <Loader2 className="w-6 h-6 text-ink-faint animate-spin" aria-hidden="true" />
        </div>

        <h2 className="text-2xl font-semibold text-ink mb-2">
          Analyzing your contract
        </h2>
        <p className="text-ink-muted text-sm mb-10">This usually takes 1–2 minutes.</p>

        <div className="border border-line rounded-lg p-6 text-left">
          <div className="space-y-0">
            {PROCESSING_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <div className="w-5 h-5 rounded-full bg-ink flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-canvas" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-line flex-shrink-0" />
                  )}
                  {i < PROCESSING_STEPS.length - 1 ? (
                    <div className={clsx("w-px h-6 mt-1", step.done ? "bg-ink" : "bg-line")} />
                  ) : null}
                </div>
                <span className={clsx("text-sm pt-0.5", step.done ? "text-ink font-medium" : "text-ink-faint")}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
