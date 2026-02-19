'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import {
  Search,
  ChevronDown,
  BarChart3,
  DollarSign,
  FileCheck,
  Activity,
  LogOut,
  Lock,
  ArrowRight,
  Loader2,
  AlertTriangle,
  SlidersHorizontal,
  X,
} from 'lucide-react'

// ── Types ──

interface DealSummary {
  dealId: string
  athleteName: string
  athleteEmail: string
  school: string
  sport: string
  state: string
  dealType: string | null
  totalCompensation: number | null
  overallRisk: string | null
  extractionStatus: string
  qualityScore: number | null
  createdAt: string
}

interface DashboardSummary {
  totalDeals: number
  dealsByStatus: Record<string, number>
  dealsBySport: Record<string, number>
  dealsByRisk: Record<string, number>
  dealsBySchool: Record<string, number>
  totalCompensation: number
  averageCompensation: number
  extractionSuccessRate: number
  averageQualityScore: number
  dealsByState: Record<string, number>
  dealsByDealType: Record<string, number>
  compensationBySport: Record<string, number>
  compensationByState: Record<string, number>
  compensationByDealType: Record<string, number>
  riskBySport: Record<string, Record<string, number>>
  compensationPercentiles: Record<string, number>
  monthlyDealVolume: Record<string, number>
}

interface FilterOptions {
  sports: string[]
  states: string[]
  schools: string[]
  riskLevels: string[]
  dealTypes: string[]
  statuses: string[]
  compensationRange: { min: number; max: number }
}

interface Filters {
  searchQuery: string
  sport: string
  state: string
  riskLevel: string
  status: string
  dealType: string
  school: string
  compensationMin: string
  compensationMax: string
}

interface AnalyticsData {
  dealsAnalyzed: number
  payorTypeDistribution: Record<string, number>
  compensationTypeDistribution: Record<string, number>
  exclusivityBreakdown: { exclusive: number; non_exclusive: number }
  perpetualRightsCount: number
  clawbackCount: number
  clawbackRate: number
  disputeResolutionDistribution: Record<string, number>
}

const EMPTY_FILTERS: Filters = {
  searchQuery: '',
  sport: '',
  state: '',
  riskLevel: '',
  status: '',
  dealType: '',
  school: '',
  compensationMin: '',
  compensationMax: '',
}

// ── Helpers ──

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function riskColor(risk: string | null) {
  switch (risk?.toLowerCase()) {
    case 'low':
      return 'bg-emerald-100 text-emerald-800'
    case 'medium':
      return 'bg-amber-100 text-amber-800'
    case 'high':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-navy-100 text-navy-500'
  }
}

function statusColor(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-emerald-100 text-emerald-800'
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800'
    case 'FAILED':
      return 'bg-red-100 text-red-800'
    case 'PARTIAL':
      return 'bg-amber-100 text-amber-800'
    default:
      return 'bg-navy-100 text-navy-500'
  }
}

function formatCurrency(amount: number | null) {
  if (amount == null) return '--'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function activeFilterCount(filters: Filters): number {
  let count = 0
  if (filters.sport) count++
  if (filters.state) count++
  if (filters.riskLevel) count++
  if (filters.status) count++
  if (filters.dealType) count++
  if (filters.school) count++
  if (filters.compensationMin) count++
  if (filters.compensationMax) count++
  return count
}

// ── Reusable Components ──

function LoginScreen({ onAuth }: { onAuth: (key: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/dashboard/auth`, {
        method: 'POST',
        headers: { 'X-Dashboard-Key': password },
      })
      if (res.ok) {
        onAuth(password)
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Could not reach server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-speed">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl border-t-4 border-t-gold-500 p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <Image src="/logo-white.svg" alt="Athlete Agent Labs" width={200} height={30} className="h-7 w-auto mb-8" />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Lock className="w-7 h-7 text-gold-600" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-navy-900">
            Dashboard Access
          </h1>
          <p className="text-navy-500 mt-1 font-body text-sm">
            Enter your dashboard password to continue.
          </p>
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Dashboard password"
            className="w-full px-4 py-3 border border-navy-200 rounded-md focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors font-body"
            autoFocus
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
            <AlertTriangle className="w-4 h-4" /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className={clsx(
            'w-full py-3 rounded-lg font-body transition-colors',
            password
              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold uppercase tracking-wider'
              : 'bg-navy-100 text-navy-400 cursor-not-allowed'
          )}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string
  value: string | number
  icon: React.ElementType
  accent?: string
}) {
  return (
    <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 card-athletic p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="uppercase tracking-wider text-xs font-semibold text-navy-500">{label}</p>
          <p
            className={clsx(
              'text-3xl font-black tabular-nums font-display mt-1',
              accent || 'text-navy-900'
            )}
          >
            {value}
          </p>
        </div>
        <div className="p-2.5 bg-gold-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-gold-600" />
        </div>
      </div>
    </div>
  )
}

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full pl-3 pr-8 py-2 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 bg-white transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-navy-400 pointer-events-none" />
    </div>
  )
}

function BarRow({
  label,
  value,
  max,
  format,
}: {
  label: string
  value: number
  max: number
  format?: 'currency' | 'number' | 'percent'
}) {
  const width = max > 0 ? Math.round((value / max) * 100) : 0
  let displayValue: string
  if (format === 'currency') {
    displayValue = formatCurrency(value)
  } else if (format === 'percent') {
    displayValue = `${value.toFixed(1)}%`
  } else {
    displayValue = String(value)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-navy-600 w-32 truncate font-body" title={label}>
        {label}
      </span>
      <div className="flex-1 bg-navy-100 rounded-sm h-3">
        <div
          className="bg-gradient-to-r from-gold-500 to-gold-400 h-3 rounded-sm transition-all"
          style={{ width: `${Math.max(width, 2)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-navy-900 w-20 text-right font-body">
        {displayValue}
      </span>
    </div>
  )
}

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 p-6 shadow-sm">
      <h3 className="uppercase tracking-wider text-xs font-bold text-navy-700 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-navy-900 rounded-lg p-4 text-center">
      <p className="text-gold-400 font-black text-2xl tabular-nums font-display">{value}</p>
      <p className="text-navy-300 uppercase tracking-wider text-[10px] font-semibold mt-1">{label}</p>
    </div>
  )
}

// ── Analytics Tab ──

function AnalyticsSection({
  summary,
  analytics,
  analyticsLoading,
}: {
  summary: DashboardSummary
  analytics: AnalyticsData | null
  analyticsLoading: boolean
}) {
  const sortedEntries = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])

  const maxVal = (obj: Record<string, number>) =>
    Math.max(...Object.values(obj), 1)

  return (
    <div className="space-y-6">
      {/* Section A — Compensation Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Percentiles */}
        {Object.keys(summary.compensationPercentiles).length > 0 && (
          <SectionCard title="Compensation Percentiles">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['p25', 'p50', 'p75', 'p90'].map((key) => (
                <StatCard
                  key={key}
                  label={key.toUpperCase()}
                  value={formatCurrency(
                    summary.compensationPercentiles[key] ?? 0
                  )}
                />
              ))}
            </div>
          </SectionCard>
        )}

        {/* By Sport */}
        {Object.keys(summary.compensationBySport).length > 0 && (
          <SectionCard title="Avg Compensation by Sport">
            <div className="space-y-2.5">
              {sortedEntries(summary.compensationBySport)
                .slice(0, 8)
                .map(([label, value]) => (
                  <BarRow
                    key={label}
                    label={label}
                    value={value}
                    max={maxVal(summary.compensationBySport)}
                    format="currency"
                  />
                ))}
            </div>
          </SectionCard>
        )}

        {/* By State */}
        {Object.keys(summary.compensationByState).length > 0 && (
          <SectionCard title="Avg Compensation by State">
            <div className="space-y-2.5">
              {sortedEntries(summary.compensationByState)
                .slice(0, 8)
                .map(([label, value]) => (
                  <BarRow
                    key={label}
                    label={label}
                    value={value}
                    max={maxVal(summary.compensationByState)}
                    format="currency"
                  />
                ))}
            </div>
          </SectionCard>
        )}

        {/* By Deal Type */}
        {Object.keys(summary.compensationByDealType).length > 0 && (
          <SectionCard title="Avg Compensation by Deal Type">
            <div className="space-y-2.5">
              {sortedEntries(summary.compensationByDealType)
                .slice(0, 8)
                .map(([label, value]) => (
                  <BarRow
                    key={label}
                    label={label}
                    value={value}
                    max={maxVal(summary.compensationByDealType)}
                    format="currency"
                  />
                ))}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Section B — Deal Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.keys(summary.dealsBySport).length > 0 && (
          <SectionCard title="Deals by Sport">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsBySport)
                .slice(0, 8)
                .map(([label, value]) => (
                  <BarRow
                    key={label}
                    label={label}
                    value={value}
                    max={maxVal(summary.dealsBySport)}
                  />
                ))}
            </div>
          </SectionCard>
        )}

        {Object.keys(summary.dealsByState).length > 0 && (
          <SectionCard title="Deals by State">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsByState)
                .slice(0, 8)
                .map(([label, value]) => (
                  <BarRow
                    key={label}
                    label={label}
                    value={value}
                    max={maxVal(summary.dealsByState)}
                  />
                ))}
            </div>
          </SectionCard>
        )}

        {Object.keys(summary.dealsByDealType).length > 0 && (
          <SectionCard title="Deals by Type">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsByDealType)
                .slice(0, 8)
                .map(([label, value]) => (
                  <BarRow
                    key={label}
                    label={label}
                    value={value}
                    max={maxVal(summary.dealsByDealType)}
                  />
                ))}
            </div>
          </SectionCard>
        )}

        {Object.keys(summary.dealsByRisk).length > 0 && (
          <SectionCard title="Deals by Risk Level">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsByRisk).map(([label, value]) => (
                <BarRow
                  key={label}
                  label={label}
                  value={value}
                  max={maxVal(summary.dealsByRisk)}
                />
              ))}
            </div>
          </SectionCard>
        )}
      </div>

      {/* Risk by Sport (grouped) */}
      {Object.keys(summary.riskBySport).length > 0 && (
        <SectionCard title="Risk Distribution by Sport">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-navy-900 text-white text-left">
                  <th className="px-4 py-2 uppercase tracking-wider text-xs font-bold">Sport</th>
                  <th className="px-4 py-2 uppercase tracking-wider text-xs font-bold text-center">Low</th>
                  <th className="px-4 py-2 uppercase tracking-wider text-xs font-bold text-center">Medium</th>
                  <th className="px-4 py-2 uppercase tracking-wider text-xs font-bold text-center">High</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {Object.entries(summary.riskBySport)
                  .sort(
                    (a, b) =>
                      Object.values(b[1]).reduce((s, v) => s + v, 0) -
                      Object.values(a[1]).reduce((s, v) => s + v, 0)
                  )
                  .slice(0, 10)
                  .map(([sport, risks]) => (
                    <tr key={sport}>
                      <td className="py-2 px-4 text-navy-700">{sport}</td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          {risks['Low'] || risks['low'] || 0}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          {risks['Medium'] || risks['medium'] || 0}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800">
                          {risks['High'] || risks['high'] || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {/* Monthly Volume */}
      {Object.keys(summary.monthlyDealVolume).length > 0 && (
        <SectionCard title="Monthly Deal Volume">
          <div className="space-y-2.5">
            {Object.entries(summary.monthlyDealVolume)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .slice(-12)
              .map(([month, count]) => (
                <BarRow
                  key={month}
                  label={month}
                  value={count}
                  max={maxVal(summary.monthlyDealVolume)}
                />
              ))}
          </div>
        </SectionCard>
      )}

      {/* Section C — Contract Patterns (from /analytics endpoint) */}
      {analyticsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-navy-400" />
          <span className="ml-2 text-sm text-navy-500 font-body">
            Loading contract patterns...
          </span>
        </div>
      ) : (
        analytics &&
        analytics.dealsAnalyzed > 0 && (
          <>
            <h2 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900">
              Contract Patterns ({analytics.dealsAnalyzed} extracted)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.keys(analytics.payorTypeDistribution).length > 0 && (
                <SectionCard title="Payor Type Distribution">
                  <div className="space-y-2.5">
                    {sortedEntries(analytics.payorTypeDistribution).map(
                      ([label, value]) => (
                        <BarRow
                          key={label}
                          label={label}
                          value={value}
                          max={maxVal(analytics.payorTypeDistribution)}
                        />
                      )
                    )}
                  </div>
                </SectionCard>
              )}

              {Object.keys(analytics.compensationTypeDistribution).length >
                0 && (
                <SectionCard title="Compensation Component Types">
                  <div className="space-y-2.5">
                    {sortedEntries(analytics.compensationTypeDistribution).map(
                      ([label, value]) => (
                        <BarRow
                          key={label}
                          label={label}
                          value={value}
                          max={maxVal(analytics.compensationTypeDistribution)}
                        />
                      )
                    )}
                  </div>
                </SectionCard>
              )}

              {Object.keys(analytics.disputeResolutionDistribution).length >
                0 && (
                <SectionCard title="Dispute Resolution Methods">
                  <div className="space-y-2.5">
                    {sortedEntries(analytics.disputeResolutionDistribution).map(
                      ([label, value]) => (
                        <BarRow
                          key={label}
                          label={label}
                          value={value}
                          max={maxVal(analytics.disputeResolutionDistribution)}
                        />
                      )
                    )}
                  </div>
                </SectionCard>
              )}

              <SectionCard title="Key Contract Indicators">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    label="Exclusivity Rate"
                    value={`${
                      analytics.exclusivityBreakdown.exclusive +
                        analytics.exclusivityBreakdown.non_exclusive >
                      0
                        ? Math.round(
                            (analytics.exclusivityBreakdown.exclusive /
                              (analytics.exclusivityBreakdown.exclusive +
                                analytics.exclusivityBreakdown.non_exclusive)) *
                              100
                          )
                        : 0
                    }%`}
                  />
                  <StatCard
                    label="Clawback Rate"
                    value={`${analytics.clawbackRate}%`}
                  />
                  <StatCard
                    label="Perpetual Rights"
                    value={analytics.perpetualRightsCount}
                  />
                  <StatCard
                    label="Deals Analyzed"
                    value={analytics.dealsAnalyzed}
                  />
                </div>
              </SectionCard>
            </div>
          </>
        )
      )}

    </div>
  )
}

// ── Main Page ──

export default function DashboardPage() {
  const [dashKey, setDashKey] = useState<string | null>(null)
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [deals, setDeals] = useState<DealSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'deals' | 'analytics'>('deals')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  const headers = useCallback(
    () => ({ 'X-Dashboard-Key': dashKey || '' }),
    [dashKey]
  )

  const updateFilter = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  // Fetch data after auth
  useEffect(() => {
    if (!dashKey) return
    setLoading(true)

    Promise.all([
      fetch(`${API_URL}/dashboard/summary`, { headers: headers() }).then((r) =>
        r.json()
      ),
      fetch(`${API_URL}/dashboard/deals?limit=500`, {
        headers: headers(),
      }).then((r) => r.json()),
      fetch(`${API_URL}/dashboard/filter-options`, {
        headers: headers(),
      }).then((r) => r.json()),
    ])
      .then(([summaryData, dealsData, filterData]) => {
        setSummary(summaryData)
        setDeals(dealsData.deals || [])
        setFilterOptions(filterData)
      })
      .catch((err) => console.error('Failed to load dashboard:', err))
      .finally(() => setLoading(false))
  }, [dashKey, headers])

  // Fetch analytics when tab switches
  useEffect(() => {
    if (activeTab !== 'analytics' || !dashKey || analytics) return
    setAnalyticsLoading(true)
    fetch(`${API_URL}/dashboard/analytics`, { headers: headers() })
      .then((r) => r.json())
      .then((data) => setAnalytics(data))
      .catch((err) => console.error('Failed to load analytics:', err))
      .finally(() => setAnalyticsLoading(false))
  }, [activeTab, dashKey, headers, analytics])

  if (!dashKey) {
    return <LoginScreen onAuth={setDashKey} />
  }

  // Compound AND filtering
  const filteredDeals = deals.filter((d) => {
    if (filters.sport && d.sport !== filters.sport) return false
    if (filters.state && d.state !== filters.state) return false
    if (filters.riskLevel && d.overallRisk !== filters.riskLevel) return false
    if (filters.status && d.extractionStatus !== filters.status) return false
    if (filters.dealType && d.dealType !== filters.dealType) return false
    if (filters.school && d.school !== filters.school) return false

    if (filters.compensationMin) {
      const min = parseFloat(filters.compensationMin)
      if (!isNaN(min) && (d.totalCompensation == null || d.totalCompensation < min))
        return false
    }
    if (filters.compensationMax) {
      const max = parseFloat(filters.compensationMax)
      if (!isNaN(max) && (d.totalCompensation == null || d.totalCompensation > max))
        return false
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-navy-950 border-b-2 border-b-gold-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.svg" alt="Athlete Agent Labs" width={180} height={28} className="h-6 w-auto" />
          </div>
          <button
            onClick={() => setDashKey(null)}
            className="flex items-center gap-2 text-navy-300 uppercase tracking-wider text-xs font-bold hover:text-gold-400 transition-colors font-body"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-navy-400" />
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryCard
                label="Total Deals"
                value={summary?.totalDeals ?? 0}
                icon={BarChart3}
              />
              <SummaryCard
                label="Avg Compensation"
                value={formatCurrency(summary?.averageCompensation ?? 0)}
                icon={DollarSign}
              />
              <SummaryCard
                label="Extraction Success"
                value={`${(summary?.extractionSuccessRate ?? 0).toFixed(0)}%`}
                icon={FileCheck}
              />
              <SummaryCard
                label="Avg Quality Score"
                value={`${(summary?.averageQualityScore ?? 0).toFixed(1)}%`}
                icon={Activity}
              />
            </div>

            {/* Tab Bar */}
            <div className="border-b border-navy-200 flex gap-6">
              <button
                onClick={() => setActiveTab('deals')}
                className={clsx(
                  'px-1 pb-3 transition-colors',
                  activeTab === 'deals'
                    ? 'border-b-2 border-b-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm'
                    : 'border-b-2 border-transparent text-navy-500 hover:text-navy-700 font-medium uppercase tracking-wider text-sm'
                )}
              >
                Deals
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={clsx(
                  'px-1 pb-3 transition-colors',
                  activeTab === 'analytics'
                    ? 'border-b-2 border-b-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm'
                    : 'border-b-2 border-transparent text-navy-500 hover:text-navy-700 font-medium uppercase tracking-wider text-sm'
                )}
              >
                Analytics
              </button>
            </div>

            {activeTab === 'deals' ? (
              <>
                {/* Filters — Row 1: Search + toggle */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                    <input
                      type="text"
                      value={filters.searchQuery}
                      onChange={(e) =>
                        updateFilter('searchQuery', e.target.value)
                      }
                      placeholder="Search by athlete, school, sport, state, or deal ID..."
                      className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => setFiltersExpanded(!filtersExpanded)}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2.5 border rounded-md text-sm font-medium font-body transition-colors',
                      filtersExpanded || filterCount > 0
                        ? 'border-gold-500 bg-gold-50 text-gold-700'
                        : 'border-navy-200 text-navy-600 hover:border-navy-300'
                    )}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {filterCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-500 text-white text-xs">
                        {filterCount}
                      </span>
                    )}
                  </button>
                  {filterCount > 0 && (
                    <button
                      onClick={() => setFilters(EMPTY_FILTERS)}
                      className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-navy-500 hover:text-navy-700 font-body transition-colors"
                    >
                      <X className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>

                {/* Filters — Row 2: Expanded panel */}
                {filtersExpanded && filterOptions && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-white rounded-lg border border-navy-100 p-4 shadow-sm">
                    <FilterSelect
                      value={filters.sport}
                      onChange={(v) => updateFilter('sport', v)}
                      options={filterOptions.sports}
                      placeholder="All Sports"
                    />
                    <FilterSelect
                      value={filters.state}
                      onChange={(v) => updateFilter('state', v)}
                      options={filterOptions.states}
                      placeholder="All States"
                    />
                    <FilterSelect
                      value={filters.riskLevel}
                      onChange={(v) => updateFilter('riskLevel', v)}
                      options={filterOptions.riskLevels}
                      placeholder="All Risk Levels"
                    />
                    <FilterSelect
                      value={filters.status}
                      onChange={(v) => updateFilter('status', v)}
                      options={filterOptions.statuses}
                      placeholder="All Statuses"
                    />
                    <div>
                      <input
                        type="number"
                        value={filters.compensationMin}
                        onChange={(e) =>
                          updateFilter('compensationMin', e.target.value)
                        }
                        placeholder="Min $"
                        className="w-full px-3 py-2 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={filters.compensationMax}
                        onChange={(e) =>
                          updateFilter('compensationMax', e.target.value)
                        }
                        placeholder="Max $"
                        className="w-full px-3 py-2 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Deals Table */}
                <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                      <thead>
                        <tr className="bg-navy-900 text-white text-left">
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Athlete</th>
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">School</th>
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Sport</th>
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">
                            Compensation
                          </th>
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Risk</th>
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">
                            Extraction
                          </th>
                          <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Date</th>
                          <th className="px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-100">
                        {filteredDeals.length === 0 ? (
                          <tr>
                            <td
                              colSpan={8}
                              className="px-4 py-12 text-center text-navy-400"
                            >
                              {deals.length === 0
                                ? 'No deals yet. Deals will appear here after an athlete uploads a contract.'
                                : 'No deals match your filters.'}
                            </td>
                          </tr>
                        ) : (
                          filteredDeals.map((deal) => (
                            <tr
                              key={deal.dealId}
                              className="row-athletic hover:bg-navy-50/50 transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-bold text-navy-900">
                                    {deal.athleteName}
                                  </p>
                                  <p className="text-xs text-navy-400">
                                    {deal.athleteEmail}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-navy-700">
                                {deal.school}
                              </td>
                              <td className="px-4 py-3 text-navy-700">
                                {deal.sport}
                              </td>
                              <td className="px-4 py-3 text-navy-900 font-bold tabular-nums">
                                {formatCurrency(deal.totalCompensation)}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={clsx(
                                    'inline-block px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider capitalize',
                                    riskColor(deal.overallRisk)
                                  )}
                                >
                                  {deal.overallRisk || 'N/A'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={clsx(
                                    'inline-block px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider',
                                    statusColor(deal.extractionStatus)
                                  )}
                                >
                                  {deal.extractionStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-navy-500 whitespace-nowrap">
                                {formatDate(deal.createdAt)}
                              </td>
                              <td className="px-4 py-3">
                                <Link
                                  href={`/dashboard/${deal.dealId}`}
                                  className="inline-flex items-center gap-1 text-gold-600 hover:text-gold-500 font-bold uppercase tracking-wider text-xs transition-colors"
                                >
                                  View <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <p className="text-center text-xs text-navy-400 font-body uppercase tracking-wider font-semibold">
                  Showing {filteredDeals.length} of {deals.length} deals
                </p>
              </>
            ) : (
              summary && (
                <AnalyticsSection
                  summary={summary}
                  analytics={analytics}
                  analyticsLoading={analyticsLoading}
                />
              )
            )}
          </>
        )}
      </main>
    </div>
  )
}
