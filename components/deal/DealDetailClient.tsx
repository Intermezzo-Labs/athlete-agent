"use client"

import logoDark from "@/assets/logo-dark.svg"
import logoWhite from "@/assets/logo-white.svg"
import clsx from "clsx"
import { API_URL, formatCurrency, formatDate } from "components/dashboard/helpers"
import { LoginScreen } from "components/dashboard/LoginScreen"
import { ThemeToggle } from "components/ThemeToggle"
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { DealDetail } from "types/nil"
import { DataSection } from "./DataSection"

const riskBadge = (risk: string | null) => {
  const colors: Record<string, string> = {
    low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-red-50 text-red-700 border-red-200",
  }
  return colors[risk?.toLowerCase() ?? ""] ?? "bg-subtle text-ink-muted border-line"
}

const statusBadge = (status: string) => {
  const colors: Record<string, string> = {
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    IN_PROGRESS: "bg-blue-50 text-blue-700 border-blue-200",
    FAILED: "bg-red-50 text-red-700 border-red-200",
    PARTIAL: "bg-amber-50 text-amber-700 border-amber-200",
    PENDING: "bg-subtle text-ink-muted border-line",
  }
  return colors[status] ?? "bg-subtle text-ink-muted border-line"
}

type Tab = "overview" | "analysis" | "extraction" | "compliance"

// ── Best practice: rendering-hoist-jsx ──
// Tab config is static data – hoist outside component to never recreate.
const TABS: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "analysis", label: "Analysis Report" },
  { key: "extraction", label: "Extracted Data" },
  { key: "compliance", label: "Compliance" },
]

interface DealDetailClientProps {
  dealId: string
}

export function DealDetailClient({ dealId }: DealDetailClientProps) {
  const router = useRouter()
  const [dashKey, setDashKey] = useState<string | null>(null)
  const [deal, setDeal] = useState<DealDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<Tab>("overview")

  // ── Best practice: rerender-dependencies ──
  // Use primitive deps `dashKey` and `dealId` – no function reference in the dep array.
  useEffect(() => {
    if (!dashKey) return
    setLoading(true)
    setError("")

    fetch(`${API_URL}/dashboard/deals/${dealId}`, {
      headers: { "X-Dashboard-Key": dashKey },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Deal not found")
        return res.json() as Promise<DealDetail>
      })
      .then(setDeal)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Unknown error"))
      .finally(() => setLoading(false))
  }, [dashKey, dealId]) // primitive deps

  if (!dashKey) return <LoginScreen onAuth={setDashKey} />

  const ext = (deal?.extractionData ?? {}) as Record<string, unknown>

  const extractionSections = [
    { title: "Deal", data: ext["deal"] },
    { title: "Student Athlete", data: ext["student_athlete"] },
    { title: "Institution", data: ext["institution"] },
    { title: "Payor", data: ext["payor"] },
    { title: "Agent / Representative", data: ext["agent_representative"] },
    { title: "Compensation Components", data: ext["compensation_components"] },
    { title: "Deliverables", data: ext["deliverables"] },
    { title: "NIL Rights Grant", data: ext["nil_rights_grant"] },
    { title: "Restriction Clauses", data: ext["restriction_clauses"] },
    { title: "Termination Clause", data: ext["termination_clause"] },
    { title: "Dispute Resolution", data: ext["dispute_resolution"] },
    { title: "Group Deal Metadata", data: ext["group_deal_metadata"] },
    { title: "Revenue Sharing Terms", data: ext["revenue_sharing_terms"] },
    { title: "Amendments", data: ext["amendments"] },
    { title: "Metadata", data: ext["metadata"] },
  ]

  const tabCls = (tab: Tab) =>
    clsx(
      "px-4 py-2.5 text-sm border-b-2 transition duration-200 ease-in-out",
      activeTab === tab
        ? "border-b-ink text-ink font-medium"
        : "border-transparent text-ink-muted hover:text-ink"
    )

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src={logoDark} alt="Athlete Agent Labs" className="h-7 w-auto dark:hidden" />
            <Image src={logoWhite} alt="Athlete Agent Labs" className="h-7 w-auto hidden dark:block" />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition duration-200 ease-in-out"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All deals
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-6 h-6 animate-spin text-ink-faint" aria-hidden="true" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" aria-hidden="true" />
            <p className="text-ink-muted text-sm">{error}</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-4 text-sm text-[#FF6600] hover:opacity-75 transition duration-200 ease-in-out"
            >
              Back to dashboard
            </button>
          </div>
        ) : deal ? (
          <div className="space-y-6">
            {/* Deal header */}
            <div className="border border-line rounded-lg p-6 bg-surface">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold text-ink">
                    {deal.athleteName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" /> {deal.school}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <User className="w-3.5 h-3.5" aria-hidden="true" /> {deal.sport}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {deal.state}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" /> {formatDate(deal.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {deal.overallRisk ? (
                    <span
                      className={clsx(
                        "px-2.5 py-0.5 rounded border text-xs font-medium capitalize",
                        riskBadge(deal.overallRisk)
                      )}
                    >
                      {deal.overallRisk} risk
                    </span>
                  ) : null}
                  <span className={clsx("px-2.5 py-0.5 rounded border text-xs font-medium", statusBadge(deal.extractionStatus))}>
                    {deal.extractionStatus}
                  </span>
                </div>
              </div>

              {/* Quality + Compensation + Deal ID */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {deal.qualityScore != null ? (
                  <div className="flex items-center gap-3 border border-line rounded-lg px-4 py-3">
                    <CheckCircle className="w-4 h-4 text-ink-faint" aria-hidden="true" />
                    <div>
                      <p className="text-ink-muted text-[10px] font-medium">Quality score</p>
                      <p className="font-semibold text-ink text-sm">{deal.qualityScore.toFixed(1)}%</p>
                    </div>
                  </div>
                ) : null}

                {typeof ext["deal"] === "object" &&
                  ext["deal"] !== null &&
                  (ext["deal"] as Record<string, unknown>)["total_compensation_value"] != null ? (
                  <div className="flex items-center gap-3 border border-line rounded-lg px-4 py-3">
                    <DollarSign className="w-4 h-4 text-ink-faint" aria-hidden="true" />
                    <div>
                      <p className="text-ink-muted text-[10px] font-medium">Total compensation</p>
                      <p className="font-semibold text-ink text-sm">
                        {formatCurrency(Number((ext["deal"] as Record<string, unknown>)["total_compensation_value"]))}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-3 border border-line rounded-lg px-4 py-3">
                  <FileText className="w-4 h-4 text-ink-faint" aria-hidden="true" />
                  <div>
                    <p className="text-ink-muted text-[10px] font-medium">Deal ID</p>
                    <p className="font-mono text-xs text-ink-muted truncate max-w-[200px]">{deal.dealId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-line">
              <nav className="flex gap-0.5 -mb-px" aria-label="Deal sections">
                {TABS.map((tab) => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={tabCls(tab.key)}>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div className="border border-line rounded-lg p-6 bg-surface">
              {/* ── Overview ── */}
              {activeTab === "overview" ? (
                <div className="space-y-6">
                  {deal.summary ? (
                    <div>
                      <h3 className="text-base font-semibold text-ink mb-2">Summary</h3>
                      <p className="text-ink-muted text-sm leading-relaxed">{deal.summary}</p>
                    </div>
                  ) : null}

                  {Array.isArray(ext["compensation_components"]) && (ext["compensation_components"] as unknown[]).length > 0 ? (
                    <div>
                      <h3 className="text-base font-semibold text-black mb-3">Compensation breakdown</h3>
                      <div className="space-y-2">
                        {(ext["compensation_components"] as Array<Record<string, unknown>>).map((comp, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-subtle rounded-md border border-line">
                            <div>
                              <p className="font-medium text-ink text-sm">{String(comp["type"] ?? "Component")}</p>
                              {comp["description"] ? (
                                <p className="text-xs text-ink-muted mt-0.5">{String(comp["description"])}</p>
                              ) : null}
                            </div>
                            <span className="font-semibold tabular-nums text-black text-sm">
                              {formatCurrency(comp["amount"] != null ? Number(comp["amount"]) : null)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {Array.isArray(ext["deliverables"]) && (ext["deliverables"] as unknown[]).length > 0 ? (
                    <div>
                      <h3 className="text-base font-semibold text-black mb-3">Deliverables</h3>
                      <div className="grid gap-2">
                        {(ext["deliverables"] as Array<Record<string, unknown>>).map((del, i) => (
                          <div key={i} className="p-3 bg-subtle rounded-md border border-line">
                            <p className="font-medium text-ink text-sm">
                              {String(del["type"] ?? `Deliverable ${i + 1}`)}
                            </p>
                            {del["description"] ? (
                              <p className="text-xs text-ink-muted mt-1">{String(del["description"])}</p>
                            ) : null}
                            <div className="flex gap-4 mt-1 text-xs text-ink-faint">
                              {del["quantity"] != null ? <span>Qty: {String(del["quantity"])}</span> : null}
                              {del["deadline"] ? <span>Due: {String(del["deadline"])}</span> : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {deal.extractionS3Key ? (
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(deal.extractionData, null, 2)], { type: "application/json" })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = `extraction-${deal.dealId}.json`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                        className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-subtle transition duration-200 ease-in-out"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" /> Extraction JSON
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* ── Analysis ── */}
              {activeTab === "analysis" ? (
                <div className="space-y-6">
                  {deal.risks && deal.risks.length > 0 ? (
                    <div>
                      <h3 className="text-base font-semibold text-ink mb-3">Risk items</h3>
                      <div className="space-y-3">
                        {deal.risks.map((risk, i) => (
                          <div
                            key={i}
                            className={clsx(
                              "p-4 rounded-lg border-l-4",
                              risk.level === "high" ? "border-l-red-400 bg-red-50" :
                                risk.level === "medium" ? "border-l-amber-400 bg-amber-50" :
                                  "border-l-emerald-400 bg-emerald-50"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-ink text-sm">{risk.title}</h4>
                              <span
                                className={clsx(
                                  "shrink-0 px-2 py-0.5 rounded border text-xs font-medium capitalize",
                                  risk.level === "high" ? "bg-red-50 text-red-700 border-red-200" :
                                    risk.level === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                      "bg-emerald-50 text-emerald-700 border-emerald-200"
                                )}
                              >
                                {risk.level}
                              </span>
                            </div>
                            <p className="text-xs text-ink-muted mt-0.5">
                              Section: {risk.section}
                            </p>
                            <p className="text-ink-muted text-sm mt-2 leading-relaxed">{risk.description}</p>
                            <div className="mt-2 bg-surface rounded-md border border-line p-3 text-sm text-ink-muted">
                              <span className="font-medium text-ink">Recommendation:</span>{" "}
                              {risk.recommendation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-ink-faint text-sm">No risk items available.</p>
                  )}

                  {deal.keyTerms && deal.keyTerms.length > 0 ? (
                    <div>
                      <h3 className="text-base font-semibold text-ink mb-3">Key terms</h3>
                      <dl className="space-y-3">
                        {deal.keyTerms.map((kt, i) => (
                          <div key={i} className="border-l-2 border-l-line pl-4">
                            <dt className="font-medium text-ink text-sm">{kt.term}</dt>
                            <dd className="text-ink-muted text-sm mt-1 leading-relaxed">{kt.explanation}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* ── Extraction ── */}
              {activeTab === "extraction" ? (
                <div className="space-y-3">
                  {deal.extractionStatus === "PENDING" || deal.extractionStatus === "IN_PROGRESS" ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-ink-faint mx-auto mb-3" aria-hidden="true" />
                      <p className="text-ink-muted text-sm">
                        Extraction is {deal.extractionStatus.toLowerCase().replace("_", " ")}…
                      </p>
                    </div>
                  ) : deal.extractionData ? (
                    <>
                      <p className="text-sm text-ink-muted mb-4">
                        Structured data extracted from the contract. Click a section to expand.
                      </p>
                      {extractionSections.map((section) => (
                        <DataSection key={section.title} title={section.title} data={section.data} />
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto mb-3" aria-hidden="true" />
                      <p className="text-ink-muted text-sm">
                        No extraction data available.
                        {deal.extractionStatus === "FAILED" ? " The extraction failed." : ""}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              {/* ── Compliance ── */}
              {activeTab === "compliance" ? (
                <div className="space-y-6">
                  {ext["state_compliance"] ? (
                    <DataSection title="State compliance" data={ext["state_compliance"]} />
                  ) : (
                    <p className="text-ink-faint text-sm">State compliance data not yet extracted.</p>
                  )}
                  {ext["nil_rights_grant"] ? <DataSection title="NIL rights grant" data={ext["nil_rights_grant"]} /> : null}
                  {ext["restriction_clauses"] ? <DataSection title="Restriction clauses" data={ext["restriction_clauses"]} /> : null}
                  {ext["dispute_resolution"] ? <DataSection title="Dispute resolution" data={ext["dispute_resolution"]} /> : null}
                  {ext["termination_clause"] ? <DataSection title="Termination clause" data={ext["termination_clause"]} /> : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
