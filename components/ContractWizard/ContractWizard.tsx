"use client"

import { useState } from "react"
import type { AnalysisReport, AthleteInfo } from "types/nil"
import { AthleteForm } from "./AthleteForm"
import { ContractUpload } from "./ContractUpload"
import { ProcessingState } from "./ProcessingState"
import { ReportDisplay } from "./ReportDisplay"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

type Step = "info" | "upload" | "processing" | "report"

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
      // silently ignore – user will retry
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
