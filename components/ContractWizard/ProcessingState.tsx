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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-dark-speed">
      <div className="w-full max-w-md text-center">
        {/* Pulsing ring */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-gold-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-gold-500/20 animate-pulse-ring" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-white mb-2">
          Analyzing your contract
        </h2>
        <p className="text-navy-400 font-light mb-10">This usually takes 1–2 minutes</p>

        <div className="bg-navy-900/50 rounded-lg p-6 text-left border border-navy-800">
          <div className="space-y-0">
            {PROCESSING_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-navy-950" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-navy-600 flex-shrink-0" />
                  )}
                  {/* ── Best practice: rendering-conditional-render ── */}
                  {i < PROCESSING_STEPS.length - 1 ? (
                    <div className={clsx("w-0.5 h-6", step.done ? "bg-gold-500" : "bg-navy-700")} />
                  ) : null}
                </div>
                <span className={clsx("text-sm font-medium pt-0.5", step.done ? "text-white" : "text-navy-500")}>
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
