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

// ── Best practice: rendering-hoist-jsx ──
// Disclaimer block is static – hoist to avoid recreating jsx on every render.
const disclaimer = (
  <div className="bg-navy-900 rounded-lg p-6 mb-6 border-l-4 border-l-gold-500">
    <h3 className="font-bold uppercase tracking-wider text-xs text-white mb-2">Important Disclaimer</h3>
    <p className="text-navy-300 text-sm font-light">
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
    <div className="min-h-screen">
      {/* Dark header banner */}
      <div className="bg-hero-dark pt-8 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={3} totalSteps={3} />
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-white mb-2">
                Analysis Report
              </h1>
              <p className="text-navy-400 font-light">
                Prepared for {report.athleteName} &bull; {report.generatedAt}
              </p>
            </div>
            <RiskBadge level={report.overallRisk} />
          </div>
        </div>
      </div>

      {/* Content area – overlaps the dark header */}
      <div className="max-w-3xl mx-auto px-6 -mt-10">
        {/* Overall assessment */}
        <div
          className={clsx(
            "bg-white rounded-lg shadow-xl p-6 mb-6 border-l-4",
            riskColor === "red" ? "border-l-red-500" : riskColor === "amber" ? "border-l-amber-500" : "border-l-emerald-500"
          )}
        >
          <div className="flex items-start gap-3">
            <RiskIcon
              className={clsx(
                "w-6 h-6 flex-shrink-0 mt-0.5",
                riskColor === "red" ? "text-red-500" : riskColor === "amber" ? "text-amber-500" : "text-emerald-500"
              )}
            />
            <div>
              <p className="font-bold text-navy-900 uppercase tracking-wider text-sm mb-1">Overall Assessment</p>
              <p className="text-navy-700">{report.summary}</p>
            </div>
          </div>
        </div>

        {/* Risk Items */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-gold-500 p-8 mb-6">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-navy-900 mb-6">
            Issues Identified ({report.risks.length})
          </h2>
          <div className="space-y-4">
            {report.risks.map((risk, i) => {
              const borderColor =
                risk.level === "high"
                  ? "border-l-red-500"
                  : risk.level === "medium"
                    ? "border-l-amber-500"
                    : "border-l-emerald-500"
              return (
                <div key={i} className={clsx("border-l-4 rounded-lg p-4 bg-navy-50/50", borderColor)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-navy-400">
                        {risk.section}
                      </span>
                      <h3 className="font-bold text-navy-900">{risk.title}</h3>
                    </div>
                    <RiskBadge level={risk.level} />
                  </div>
                  <p className="text-navy-700 mb-3">{risk.description}</p>
                  <div className="bg-white rounded-md p-3 border-l-2 border-l-gold-500">
                    <p className="text-sm">
                      <span className="font-bold uppercase tracking-wider text-xs text-navy-900">Recommendation: </span>
                      <span className="text-navy-700">{risk.recommendation}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Terms */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-gold-500 p-8 mb-6">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-navy-900 mb-6">
            Key Terms Explained
          </h2>
          <div className="space-y-4">
            {report.keyTerms.map((term, i) => (
              <div key={i} className="border-l-2 border-l-gold-500 pl-4">
                <h3 className="font-bold text-navy-900">{term.term}</h3>
                <p className="text-navy-600">{term.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {disclaimer}

        {/* Actions */}
        <div className="flex gap-4 pb-12">
          <button
            onClick={onDownload}
            className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm btn-athletic shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>
          <button
            onClick={onStartOver}
            className="px-6 py-3 border-2 border-navy-200 rounded-lg font-semibold uppercase tracking-wider text-sm text-navy-600 hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            Analyze Another
          </button>
        </div>
      </div>
    </div>
  )
}
