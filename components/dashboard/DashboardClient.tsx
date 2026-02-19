"use client"

import logoDark from "@/assets/logo-dark.svg"
import logoWhite from "@/assets/logo-white.svg"
import clsx from "clsx"
import { ThemeToggle } from "components/ThemeToggle"
import { Activity, BarChart3, DollarSign, FileCheck, Loader2, LogOut } from "lucide-react"
import Image from "next/image"
import { startTransition, useCallback, useEffect, useState } from "react"
import type { AnalyticsData, DashboardSummary, DealSummary, FilterOptions, Filters } from "types/nil"
import { AnalyticsSection } from "./AnalyticsSection"
import { DealsTable } from "./DealsTable"
import { API_URL, formatCurrency } from "./helpers"
import { LoginScreen } from "./LoginScreen"
import { SummaryCard } from "./SummaryCard"

const EMPTY_FILTERS: Filters = {
  searchQuery: "", sport: "", state: "", riskLevel: "",
  status: "", dealType: "", school: "", compensationMin: "", compensationMax: "",
}

function activeFilterCount(filters: Filters): number {
  return (
    (filters.sport ? 1 : 0) +
    (filters.state ? 1 : 0) +
    (filters.riskLevel ? 1 : 0) +
    (filters.status ? 1 : 0) +
    (filters.dealType ? 1 : 0) +
    (filters.school ? 1 : 0) +
    (filters.compensationMin ? 1 : 0) +
    (filters.compensationMax ? 1 : 0)
  )
}

export function DashboardClient() {
  const [dashKey, setDashKey] = useState<string | null>(null)
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [deals, setDeals] = useState<DealSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"deals" | "analytics">("deals")
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  // ── Best practice: rerender-functional-setstate ──
  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  // ── Best practice: rerender-dependencies ──
  // Pass `dashKey` (primitive string) directly to the effect instead of the
  // `headers()` function object – prevents spurious re-runs on referential change.
  useEffect(() => {
    if (!dashKey) return
    setLoading(true)

    // ── Best practice: async-parallel ──
    // Start all three fetches concurrently – no sequential waterfall.
    Promise.all([
      fetch(`${API_URL}/dashboard/summary`, { headers: { "X-Dashboard-Key": dashKey } }).then((r) => r.json()),
      fetch(`${API_URL}/dashboard/deals?limit=500`, { headers: { "X-Dashboard-Key": dashKey } }).then((r) => r.json()),
      fetch(`${API_URL}/dashboard/filter-options`, { headers: { "X-Dashboard-Key": dashKey } }).then((r) => r.json()),
    ])
      .then(([summaryData, dealsData, filterData]) => {
        setSummary(summaryData as DashboardSummary)
        setDeals((dealsData as { deals: DealSummary[] }).deals ?? [])
        setFilterOptions(filterData as FilterOptions)
      })
      .catch((err) => console.error("Failed to load dashboard:", err))
      .finally(() => setLoading(false))
  }, [dashKey]) // primitive dep – not a function reference

  // ── Best practice: rerender-transitions ──
  // Switching to the analytics tab triggers a network fetch. Wrapping it in
  // startTransition keeps the tab click feeling instant and marks the data load
  // as a non-urgent background update so the current UI stays responsive.
  const handleTabChange = (tab: "deals" | "analytics") => {
    startTransition(() => {
      setActiveTab(tab)
    })

    if (tab === "analytics" && dashKey && !analytics) {
      setAnalyticsLoading(true)
      fetch(`${API_URL}/dashboard/analytics`, { headers: { "X-Dashboard-Key": dashKey } })
        .then((r) => r.json())
        .then((data) => setAnalytics(data as AnalyticsData))
        .catch((err) => console.error("Failed to load analytics:", err))
        .finally(() => setAnalyticsLoading(false))
    }
  }

  if (!dashKey) return <LoginScreen onAuth={setDashKey} />

  // ── Best practice: rerender-derived-state-no-effect ──
  // Compute filtered deals during render – no separate effect or state needed.
  const filteredDeals = deals.filter((d) => {
    if (filters.sport && d.sport !== filters.sport) return false
    if (filters.state && d.state !== filters.state) return false
    if (filters.riskLevel && d.overallRisk !== filters.riskLevel) return false
    if (filters.status && d.extractionStatus !== filters.status) return false
    if (filters.dealType && d.dealType !== filters.dealType) return false
    if (filters.school && d.school !== filters.school) return false

    if (filters.compensationMin) {
      const min = parseFloat(filters.compensationMin)
      if (!isNaN(min) && (d.totalCompensation == null || d.totalCompensation < min)) return false
    }
    if (filters.compensationMax) {
      const max = parseFloat(filters.compensationMax)
      if (!isNaN(max) && (d.totalCompensation == null || d.totalCompensation > max)) return false
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase()
      return (
        d.athleteName.toLowerCase().includes(q) ||
        d.school.toLowerCase().includes(q) ||
        d.sport.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.dealId.toLowerCase().includes(q)
      )
    }
    return true
  })

  const filterCount = activeFilterCount(filters)

  const tabCls = (tab: "deals" | "analytics") =>
    clsx(
      "px-1 pb-3 text-sm transition duration-200 ease-in-out",
      activeTab === tab
        ? "border-b-2 border-b-ink text-ink font-medium"
        : "border-b-2 border-transparent text-ink-muted hover:text-ink"
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
            <button
              onClick={() => setDashKey(null)}
              className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition duration-200 ease-in-out"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-6 h-6 animate-spin text-ink-faint" aria-hidden="true" />
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard label="Total deals" value={summary?.totalDeals ?? 0} icon={BarChart3} />
              <SummaryCard label="Avg compensation" value={formatCurrency(summary?.averageCompensation ?? 0)} icon={DollarSign} />
              <SummaryCard label="Extraction success" value={`${(summary?.extractionSuccessRate ?? 0).toFixed(0)}%`} icon={FileCheck} />
              <SummaryCard label="Avg quality score" value={`${(summary?.averageQualityScore ?? 0).toFixed(1)}%`} icon={Activity} />
            </div>

            {/* Tab bar */}
            <div className="border-b border-line flex gap-6">
              <button onClick={() => handleTabChange("deals")} className={tabCls("deals")}>Deals</button>
              <button onClick={() => handleTabChange("analytics")} className={tabCls("analytics")}>Analytics</button>
            </div>

            {/* ── Best practice: rendering-conditional-render ── */}
            {activeTab === "deals" ? (
              <DealsTable
                filteredDeals={filteredDeals}
                totalDeals={deals.length}
                filters={filters}
                filterOptions={filterOptions}
                filtersExpanded={filtersExpanded}
                filterCount={filterCount}
                onFilterChange={updateFilter}
                onToggleFilters={() => setFiltersExpanded((v) => !v)}
                onClearFilters={() => setFilters(EMPTY_FILTERS)}
              />
            ) : summary ? (
              <AnalyticsSection
                summary={summary}
                analytics={analytics}
                analyticsLoading={analyticsLoading}
              />
            ) : null}
          </>
        )}
      </main>
    </div>
  )
}
