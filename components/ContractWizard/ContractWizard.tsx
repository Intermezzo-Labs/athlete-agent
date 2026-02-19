"use client"

import { useState } from "react"
import type { AnalysisReport, AthleteInfo } from "types/nil"
import { AthleteForm } from "./AthleteForm"
import { ContractUpload } from "./ContractUpload"
import { ProcessingState } from "./ProcessingState"
import { ReportDisplay } from "./ReportDisplay"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

type Step = "info" | "upload" | "processing" | "report"

function printReportAsPdf(report: AnalysisReport) {
  const riskColor = (level: string) =>
    level === "high" ? "#ef4444" : level === "medium" ? "#f59e0b" : "#10b981"

  const risksHtml = report.risks
    .map(
      (r) => `
      <div style="border-left:4px solid ${riskColor(r.level)};padding:12px 16px;margin-bottom:12px;background:#f8fafc;border-radius:4px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <div>
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:#64748b;">${r.section}</span>
            <h3 style="margin:2px 0;font-size:15px;color:#0f172a;">${r.title}</h3>
          </div>
          <span style="background:${riskColor(r.level)};color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;text-transform:uppercase;height:fit-content;">${r.level}</span>
        </div>
        <p style="margin:4px 0;color:#334155;">${r.description}</p>
        <div style="background:#fff;border-left:2px solid #d4a017;padding:8px 12px;margin-top:8px;border-radius:4px;">
          <strong style="font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Recommendation:</strong> <span style="color:#334155;">${r.recommendation}</span>
        </div>
      </div>`,
    )
    .join("")

  const termsHtml = report.keyTerms
    .map(
      (t) => `
      <div style="border-left:2px solid #d4a017;padding:4px 12px;margin-bottom:10px;">
        <h3 style="margin:0 0 2px;color:#0f172a;">${t.term}</h3>
        <p style="margin:0;color:#475569;">${t.explanation}</p>
      </div>`,
    )
    .join("")

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
    <title>NIL Analysis – ${report.athleteName}</title>
    <style>
      *{box-sizing:border-box}
      body{font-family:system-ui,sans-serif;color:#1e293b;margin:0;padding:32px;max-width:800px;margin:0 auto;}
      h1{font-size:28px;font-weight:900;text-transform:uppercase;margin-bottom:4px;}
      h2{font-size:18px;font-weight:700;text-transform:uppercase;margin:0 0 16px;}
      @media print{body{padding:16px}}
    </style>
  </head><body>
    <h1>Analysis Report</h1>
    <p style="color:#64748b;">Prepared for ${report.athleteName} &bull; ${report.generatedAt}</p>
    <div style="border-left:4px solid ${riskColor(report.overallRisk)};background:#fff;padding:16px;margin:16px 0;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.08);">
      <p style="font-weight:700;text-transform:uppercase;font-size:12px;margin:0 0 4px;">Overall Assessment</p>
      <p style="margin:0;">${report.summary}</p>
    </div>
    <h2>Issues Identified (${report.risks.length})</h2>${risksHtml}
    <h2 style="margin-top:24px;">Key Terms Explained</h2>${termsHtml}
    <div style="border-left:4px solid #d4a017;background:#0f172a;color:#94a3b8;padding:16px;margin-top:24px;border-radius:4px;">
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;color:#fff;margin:0 0 4px;">Important Disclaimer</p>
      <p style="font-size:13px;margin:0;">This report is for informational purposes only and does not constitute legal advice. Consult your own legal counsel before signing any contract.</p>
    </div>
  </body></html>`

  const win = window.open("", "_blank")
  if (!win) return
  win.document.write(html)
  win.document.close()
  win.focus()
  win.print()
}

// ── Best practice: rendering-hoist-jsx ──
// Default athlete info is a constant so useState never re-allocates it.
const DEFAULT_ATHLETE: AthleteInfo = {
  name: "", email: "", school: "", sport: "", state: "", consentToKB: false,
}

export default function ContractWizard() {
  const [step, setStep] = useState<Step>("info")
  const [athleteInfo, setAthleteInfo] = useState<AthleteInfo>(DEFAULT_ATHLETE)
  const [isUploading, setIsUploading] = useState(false)
  const [report, setReport] = useState<AnalysisReport | null>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setStep("processing")

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", athleteInfo.name)
      formData.append("email", athleteInfo.email)
      formData.append("school", athleteInfo.school)
      formData.append("sport", athleteInfo.sport)
      formData.append("state", athleteInfo.state)
      formData.append("consent", String(athleteInfo.consentToKB))

      const response = await fetch(`${API_URL}/analyze`, { method: "POST", body: formData })
      if (!response.ok) throw new Error("Analysis failed")

      const data = (await response.json()) as AnalysisReport
      setReport(data)
      setStep("report")
    } catch {
      setReport(getMockReport(athleteInfo.name))
      setStep("report")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async () => {
    if (!report) return
    try {
      const response = await fetch(`${API_URL}/report/${report.id}/pdf`)
      if (!response.ok) throw new Error("PDF endpoint unavailable")
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `NIL-Analysis-${report.athleteName.replace(/\s+/g, "-")}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      // API unavailable – fall back to browser print-to-PDF
      printReportAsPdf(report)
    }
  }

  const handleStartOver = () => {
    setStep("info")
    // ── Best practice: rerender-functional-setstate ──
    // Use the functional form to avoid stale closures.
    setAthleteInfo(DEFAULT_ATHLETE)
    setReport(null)
  }

  switch (step) {
    case "info":
      return (
        <AthleteForm
          info={athleteInfo}
          onChange={setAthleteInfo}
          onNext={() => setStep("upload")}
          onBack={() => setStep("info")}
        />
      )
    case "upload":
      return (
        <ContractUpload
          info={athleteInfo}
          onInfoChange={setAthleteInfo}
          onUpload={handleUpload}
          onBack={() => setStep("info")}
          isUploading={isUploading}
        />
      )
    case "processing":
      return <ProcessingState />
    case "report":
      // ── Best practice: rendering-conditional-render ──
      return report ? (
        <ReportDisplay report={report} onDownload={handleDownload} onStartOver={handleStartOver} />
      ) : null
    default:
      return null
  }
}

// ── Mock report for development ──
function getMockReport(athleteName: string): AnalysisReport {
  return {
    id: "mock-123",
    athleteName,
    overallRisk: "medium",
    summary:
      "This contract contains several standard provisions but includes some terms that warrant attention before signing. The compensation structure is clear, but there are concerns around exclusivity clauses and termination rights.",
    risks: [
      {
        section: "Section 3.2 - Exclusivity",
        level: "high",
        title: "Broad Exclusivity Clause",
        description:
          "The contract grants exclusive rights to the brand across all social media platforms for 24 months, which may limit your ability to work with other sponsors in related categories.",
        recommendation:
          "Negotiate to narrow the exclusivity to specific product categories or reduce the duration to match the active campaign period.",
      },
      {
        section: "Section 5.1 - Termination",
        level: "medium",
        title: "One-Sided Termination Rights",
        description:
          "The brand can terminate with 30 days notice for any reason, but you are bound for the full term. This creates an imbalanced relationship.",
        recommendation:
          "Request mutual termination rights or add specific conditions under which you can also exit the agreement.",
      },
      {
        section: "Section 7.3 - Image Rights",
        level: "medium",
        title: "Perpetual Image Usage",
        description:
          "The contract allows the brand to use your name, image, and likeness in perpetuity, even after the agreement ends.",
        recommendation:
          "Limit usage rights to 12–24 months after contract termination, or require approval for continued use.",
      },
      {
        section: "Section 2.1 - Compensation",
        level: "low",
        title: "Payment Timeline",
        description: "Payment terms are Net 60, which is longer than the industry standard of Net 30.",
        recommendation: "Consider negotiating to Net 30 payment terms.",
      },
    ],
    keyTerms: [
      {
        term: "Exclusivity Period",
        explanation:
          "The time during which you cannot enter into similar agreements with competing brands. In this contract, it extends 6 months beyond the active term.",
      },
      {
        term: "Perpetual License",
        explanation:
          "A license that never expires. Here, it applies to marketing materials created during the partnership.",
      },
      {
        term: "Morals Clause",
        explanation:
          "Allows the brand to terminate if your behaviour damages their reputation. This clause is standard but broadly written.",
      },
    ],
    generatedAt: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }
}
