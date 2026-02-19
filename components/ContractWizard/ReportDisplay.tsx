"use client"

import clsx from "clsx"
import { AlertCircle, AlertTriangle, CheckCircle, Download } from "lucide-react"
import type { AnalysisReport } from "types/nil"
import { RiskBadge } from "./RiskBadge"
import { StepIndicator } from "./StepIndicator"

interface ReportDisplayProps {
  report: AnalysisReport
  onDownload: () => void
  onStartOver: () => void
}

// Disclaimer block is static.
const disclaimer = (
  <div className="border border-line rounded-lg p-6 mb-6 bg-subtle">
    <h3 className="text-xs font-semibold text-ink mb-2">Important disclaimer</h3>
    <p className="text-ink-muted text-sm leading-relaxed">
      This report is for informational purposes only and does not constitute legal advice. While prepared with the
      oversight of a licensed attorney, you should consult with your own legal counsel before signing any contract.
      Every situation is unique and may involve considerations not captured in this analysis.
    </p>
  </div>
)

export function ReportDisplay({ report, onDownload, onStartOver }: ReportDisplayProps) {
  const RiskIcon =
    report.overallRisk === "high" ? AlertCircle : report.overallRisk === "medium" ? AlertTriangle : CheckCircle

  const riskColor =
    report.overallRisk === "high" ? "red" : report.overallRisk === "medium" ? "amber" : "emerald"

  return (
    <div className="min-h-screen bg-canvas">
      {/* Page header */}
      <div className="border-b border-line px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={3} totalSteps={3} />
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold italic text-ink">
                Analysis report
              </h1>
              <p className="text-sm text-ink-muted mt-1">
                Prepared for {report.athleteName} &middot; {report.generatedAt}
              </p>
            </div>
            <RiskBadge level={report.overallRisk} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Overall assessment */}
        <div
          className={clsx(
            "border rounded-lg p-6 mb-6",
            riskColor === "red" ? "border-red-200 bg-red-50" : riskColor === "amber" ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"
          )}
        >
          <div className="flex items-start gap-3">
            <RiskIcon
              className={clsx(
                "w-5 h-5 flex-shrink-0 mt-0.5",
                riskColor === "red" ? "text-red-600" : riskColor === "amber" ? "text-amber-600" : "text-emerald-600"
              )}
              aria-hidden="true"
            />
            <div>
              <p className="font-medium text-ink text-sm mb-1">Overall assessment</p>
              <p className="text-sm text-ink-muted leading-relaxed">{report.summary}</p>
            </div>
          </div>
        </div>

        {/* Risk Items */}
        <div className="border border-line rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-ink mb-6">
            Issues identified ({report.risks.length})
          </h2>
          <div className="space-y-4">
            {report.risks.map((risk, i) => {
              const borderColor =
                risk.level === "high"
                  ? "border-l-red-400"
                  : risk.level === "medium"
                    ? "border-l-amber-400"
                    : "border-l-emerald-400"
              return (
                <div key={i} className={clsx("border-l-4 rounded-r-lg p-4 bg-subtle", borderColor)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs text-ink-muted">
                        {risk.section}
                      </span>
                      <h3 className="font-medium text-ink text-sm">{risk.title}</h3>
                    </div>
                    <RiskBadge level={risk.level} />
                  </div>
                  <p className="text-sm text-ink-muted mb-3 leading-relaxed">{risk.description}</p>
                  <div className="bg-surface rounded-md p-3 border border-line">
                    <p className="text-xs">
                      <span className="font-medium text-ink">Recommendation: </span>
                      <span className="text-ink-muted">{risk.recommendation}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Terms */}
        <div className="border border-line rounded-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-ink mb-6">
            Key terms explained
          </h2>
          <div className="space-y-4">
            {report.keyTerms.map((term, i) => (
              <div key={i} className="border-l-2 border-l-line pl-4">
                <h3 className="font-medium text-ink text-sm">{term.term}</h3>
                <p className="text-sm text-ink-muted leading-relaxed mt-0.5">{term.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {disclaimer}

        {/* Actions */}
        <div className="flex gap-3 pb-12">
          <button
            onClick={onDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-[#FF6600] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition duration-200 ease-in-out"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Download PDF report
          </button>
          <button
            onClick={onStartOver}
            className="inline-flex items-center justify-center rounded-md border border-line px-6 py-3 text-sm font-medium text-ink hover:bg-subtle transition duration-200 ease-in-out"
          >
            Analyze another
          </button>
        </div>
      </div>
    </div>
  )
}
