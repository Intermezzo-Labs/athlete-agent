'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import {
  ArrowLeft,
  Download,
  FileText,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Lock,
  DollarSign,
  Calendar,
  MapPin,
  User,
  GraduationCap,
  Scale,
  ChevronRight,
} from 'lucide-react'

// ── Types ──

interface DealDetail {
  dealId: string
  athleteName: string
  athleteEmail: string
  school: string
  sport: string
  state: string
  overallRisk: string | null
  summary: string | null
  risks: Array<{
    section: string
    level: string
    title: string
    description: string
    recommendation: string
  }> | null
  keyTerms: Array<{ term: string; explanation: string }> | null
  extractionStatus: string
  extractionData: Record<string, unknown> | null
  qualityScore: number | null
  contractS3Key: string | null
  reportS3Key: string | null
  extractionS3Key: string | null
  createdAt: string
  generatedAt: string | null
}

// ── Helpers ──

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function riskBadge(risk: string | null) {
  const colors: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  }
  return colors[risk?.toLowerCase() || ''] || 'bg-navy-100 text-navy-600 border-navy-200'
}

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    COMPLETED: 'bg-emerald-100 text-emerald-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    FAILED: 'bg-red-100 text-red-800',
    PARTIAL: 'bg-amber-100 text-amber-800',
    PENDING: 'bg-navy-100 text-navy-500',
  }
  return colors[status] || 'bg-navy-100 text-navy-500'
}

function formatCurrency(amount: unknown) {
  if (amount == null || typeof amount !== 'number') return '--'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(iso: string | null) {
  if (!iso) return '--'
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

// ── Login Screen (same pattern as listing) ──

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
      if (res.ok) onAuth(password)
      else setError('Invalid password')
    } catch {
      setError('Could not reach server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-speed">
      <Image src="/logo-white.svg" alt="Athlete Agent Labs" width={200} height={30} className="h-7 w-auto mb-8" />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl border-t-4 border-t-gold-500 p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dashboard password"
          className="w-full px-4 py-3 border border-navy-200 rounded-md focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors font-body"
          autoFocus
        />
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
            <p className="text-red-600 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> {error}
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className={clsx(
            'w-full py-3 rounded-md font-bold uppercase tracking-wider transition-colors font-body',
            password
              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 hover:from-gold-600 hover:to-gold-700'
              : 'bg-navy-200 text-navy-400 cursor-not-allowed'
          )}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

// ── Extracted Data Renderer ──

function DataSection({
  title,
  data,
}: {
  title: string
  data: unknown
}) {
  const [open, setOpen] = useState(false)
  if (data == null) return null

  return (
    <div className="border border-navy-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-navy-900 hover:bg-navy-800 transition-colors text-left"
      >
        <span className="font-bold text-sm uppercase tracking-wider text-white">
          {title}
        </span>
        <ChevronRight
          className={clsx(
            'w-4 h-4 text-navy-400 transition-transform',
            open && 'rotate-90'
          )}
        />
      </button>
      {open && (
        <div className="p-4 bg-white">
          <pre className="text-xs text-navy-700 font-mono whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

// ── Tabs ──

type Tab = 'overview' | 'analysis' | 'extraction' | 'compliance'

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'analysis', label: 'Analysis Report' },
  { key: 'extraction', label: 'Extracted Data' },
  { key: 'compliance', label: 'Compliance' },
]

// ── Main Page ──

export default function DealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dealId = params.dealId as string

  const [dashKey, setDashKey] = useState<string | null>(null)
  const [deal, setDeal] = useState<DealDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const headers = useCallback(
    () => ({ 'X-Dashboard-Key': dashKey || '' }),
    [dashKey]
  )

  useEffect(() => {
    if (!dashKey) return
    setLoading(true)
    setError('')

    fetch(`${API_URL}/dashboard/deals/${dealId}`, { headers: headers() })
      .then(async (res) => {
        if (!res.ok) throw new Error('Deal not found')
        return res.json()
      })
      .then(setDeal)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [dashKey, dealId, headers])

  if (!dashKey) return <LoginScreen onAuth={setDashKey} />

  // Extraction data sections (from the schema)
  const ext = (deal?.extractionData || {}) as Record<string, unknown>

  const extractionSections = [
    { title: 'Deal', data: ext.deal },
    { title: 'Student Athlete', data: ext.student_athlete },
    { title: 'Institution', data: ext.institution },
    { title: 'Payor', data: ext.payor },
    { title: 'Agent / Representative', data: ext.agent_representative },
    { title: 'Compensation Components', data: ext.compensation_components },
    { title: 'Deliverables', data: ext.deliverables },
    { title: 'NIL Rights Grant', data: ext.nil_rights_grant },
    { title: 'Restriction Clauses', data: ext.restriction_clauses },
    { title: 'Termination Clause', data: ext.termination_clause },
    { title: 'Dispute Resolution', data: ext.dispute_resolution },
    { title: 'Group Deal Metadata', data: ext.group_deal_metadata },
    { title: 'Revenue Sharing Terms', data: ext.revenue_sharing_terms },
    { title: 'Amendments', data: ext.amendments },
    { title: 'Metadata', data: ext.metadata },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-navy-950 border-b-2 border-b-gold-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.svg" alt="Athlete Agent Labs" width={180} height={28} className="h-6 w-auto" />
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-navy-300 hover:text-gold-400 transition-colors font-body uppercase tracking-wider text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> All Deals
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-navy-400" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-navy-600 font-body">{error}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 text-gold-500 hover:text-gold-400 font-bold uppercase tracking-wider text-sm"
            >
              Back to dashboard
            </button>
          </div>
        ) : deal ? (
          <div className="space-y-6">
            {/* Deal Header */}
            <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-display font-black uppercase tracking-tight text-navy-900">
                    {deal.athleteName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <span className="flex items-center gap-1 uppercase tracking-wider text-xs font-semibold text-navy-500">
                      <GraduationCap className="w-4 h-4 text-gold-500" /> {deal.school}
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-wider text-xs font-semibold text-navy-500">
                      <User className="w-4 h-4 text-gold-500" /> {deal.sport}
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-wider text-xs font-semibold text-navy-500">
                      <MapPin className="w-4 h-4 text-gold-500" /> {deal.state}
                    </span>
                    <span className="flex items-center gap-1 uppercase tracking-wider text-xs font-semibold text-navy-500">
                      <Calendar className="w-4 h-4 text-gold-500" /> {formatDate(deal.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {deal.overallRisk && (
                    <span
                      className={clsx(
                        'px-3 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider capitalize border',
                        riskBadge(deal.overallRisk)
                      )}
                    >
                      {deal.overallRisk} Risk
                    </span>
                  )}
                  <span
                    className={clsx(
                      'px-3 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider',
                      statusBadge(deal.extractionStatus)
                    )}
                  >
                    {deal.extractionStatus}
                  </span>
                </div>
              </div>

              {/* Quality + Compensation bar */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {deal.qualityScore != null && (
                  <div className="flex items-center gap-3 bg-navy-900 rounded-lg px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-navy-300 uppercase tracking-wider text-[10px] font-semibold">Quality Score</p>
                      <p className="font-black text-white font-display">
                        {deal.qualityScore.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
                {!!(ext.deal && typeof ext.deal === 'object' && (ext.deal as Record<string, unknown>).total_compensation_value != null) && (
                  <div className="flex items-center gap-3 bg-navy-900 rounded-lg px-4 py-3">
                    <DollarSign className="w-5 h-5 text-gold-400" />
                    <div>
                      <p className="text-navy-300 uppercase tracking-wider text-[10px] font-semibold">Total Compensation</p>
                      <p className="font-black text-white font-display">
                        {formatCurrency(Number((ext.deal as Record<string, unknown>).total_compensation_value))}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 bg-navy-900 rounded-lg px-4 py-3">
                  <FileText className="w-5 h-5 text-navy-400" />
                  <div>
                    <p className="text-navy-300 uppercase tracking-wider text-[10px] font-semibold">Deal ID</p>
                    <p className="font-mono text-xs text-navy-300 truncate max-w-[200px]">
                      {deal.dealId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-navy-200">
              <nav className="flex gap-0.5 -mb-px">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={clsx(
                      'px-4 py-2.5 font-body border-b-2 transition-colors',
                      activeTab === tab.key
                        ? 'border-b-gold-500 text-navy-900 font-bold uppercase tracking-wider text-sm'
                        : 'border-transparent text-navy-400 hover:text-navy-600 uppercase tracking-wider text-sm font-medium'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 shadow-sm p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {deal.summary && (
                    <div>
                      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900 mb-2">
                        Summary
                      </h3>
                      <p className="text-navy-700 font-body leading-relaxed">
                        {deal.summary}
                      </p>
                    </div>
                  )}

                  {/* Compensation breakdown from extraction */}
                  {Array.isArray(ext.compensation_components) &&
                    ext.compensation_components.length > 0 && (
                      <div>
                        <h3 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900 mb-3">
                          Compensation Breakdown
                        </h3>
                        <div className="space-y-2">
                          {(ext.compensation_components as Array<Record<string, unknown>>).map(
                            (comp, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-3 bg-navy-50 rounded-lg"
                              >
                                <div>
                                  <p className="font-medium text-navy-800 font-body text-sm">
                                    {String(comp.type || 'Component')}
                                  </p>
                                  {!!comp.description && (
                                    <p className="text-xs text-navy-500 mt-0.5">
                                      {String(comp.description)}
                                    </p>
                                  )}
                                </div>
                                <span className="font-black tabular-nums text-navy-900 font-display">
                                  {formatCurrency(comp.amount != null ? Number(comp.amount) : null)}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Deliverables from extraction */}
                  {Array.isArray(ext.deliverables) && ext.deliverables.length > 0 && (
                    <div>
                      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900 mb-3">
                        Deliverables
                      </h3>
                      <div className="grid gap-2">
                        {(ext.deliverables as Array<Record<string, unknown>>).map(
                          (del, i) => (
                            <div
                              key={i}
                              className="p-3 bg-navy-50 rounded-lg"
                            >
                              <p className="font-medium text-navy-800 font-body text-sm">
                                {String(del.type || `Deliverable ${i + 1}`)}
                              </p>
                              {!!del.description && (
                                <p className="text-xs text-navy-500 mt-1">
                                  {String(del.description)}
                                </p>
                              )}
                              <div className="flex gap-4 mt-1 text-xs text-navy-400">
                                {del.quantity != null && (
                                  <span>Qty: {String(del.quantity)}</span>
                                )}
                                {!!del.deadline && (
                                  <span>Due: {String(del.deadline)}</span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Download buttons */}
                  <div className="flex gap-3 pt-2">
                    {deal.extractionS3Key && (
                      <button
                        onClick={() => {
                          const blob = new Blob(
                            [JSON.stringify(deal.extractionData, null, 2)],
                            { type: 'application/json' }
                          )
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `extraction-${deal.dealId}.json`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-navy-200 rounded-md font-semibold uppercase tracking-wider text-xs text-navy-700 hover:border-gold-500 hover:text-gold-600 transition-colors font-body"
                      >
                        <Download className="w-4 h-4" /> Extraction JSON
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Analysis Tab */}
              {activeTab === 'analysis' && (
                <div className="space-y-6">
                  {deal.risks && deal.risks.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900 mb-3">
                        Risk Items
                      </h3>
                      <div className="space-y-3">
                        {deal.risks.map((risk, i) => (
                          <div
                            key={i}
                            className={clsx(
                              'p-4 rounded-lg border-l-4',
                              risk.level === 'high'
                                ? 'border-l-red-500 bg-red-50/50'
                                : risk.level === 'medium'
                                ? 'border-l-amber-500 bg-amber-50/50'
                                : 'border-l-emerald-500 bg-emerald-50/50'
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-navy-900 font-body text-sm">
                                {risk.title}
                              </h4>
                              <span
                                className={clsx(
                                  'shrink-0 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider capitalize',
                                  risk.level === 'high'
                                    ? 'bg-red-100 text-red-700'
                                    : risk.level === 'medium'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                )}
                              >
                                {risk.level}
                              </span>
                            </div>
                            <p className="uppercase tracking-wider text-xs font-semibold text-navy-400 mt-0.5">
                              Section: {risk.section}
                            </p>
                            <p className="text-navy-700 text-sm mt-2 font-body">
                              {risk.description}
                            </p>
                            <div className="mt-2 bg-white/60 rounded-md border-l-2 border-l-gold-500 p-3 text-sm text-navy-600">
                              <span className="font-bold uppercase tracking-wider text-xs">Recommendation:</span>{' '}
                              {risk.recommendation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-navy-400 text-sm">No risk items available.</p>
                  )}

                  {deal.keyTerms && deal.keyTerms.length > 0 && (
                    <div>
                      <h3 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900 mb-3">
                        Key Terms
                      </h3>
                      <dl className="space-y-3">
                        {deal.keyTerms.map((kt, i) => (
                          <div
                            key={i}
                            className="border-l-2 border-l-gold-500 pl-4"
                          >
                            <dt className="font-bold text-navy-900 font-body text-sm">
                              {kt.term}
                            </dt>
                            <dd className="text-navy-600 text-sm mt-1 font-body">
                              {kt.explanation}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </div>
              )}

              {/* Extraction Tab */}
              {activeTab === 'extraction' && (
                <div className="space-y-3">
                  {deal.extractionStatus === 'PENDING' || deal.extractionStatus === 'IN_PROGRESS' ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-navy-400 mx-auto mb-3" />
                      <p className="text-navy-500 font-body">
                        Extraction is {deal.extractionStatus.toLowerCase().replace('_', ' ')}...
                      </p>
                    </div>
                  ) : deal.extractionData ? (
                    <>
                      <p className="text-sm text-navy-500 font-body mb-4">
                        Structured data extracted from the contract. Click a section to expand.
                      </p>
                      {extractionSections.map((section) => (
                        <DataSection
                          key={section.title}
                          title={section.title}
                          data={section.data}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                      <p className="text-navy-500 font-body">
                        No extraction data available.
                        {deal.extractionStatus === 'FAILED' && ' The extraction failed.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Compliance Tab */}
              {activeTab === 'compliance' && (
                <div className="space-y-6">
                  {ext.state_compliance ? (
                    <DataSection
                      title="State Compliance"
                      data={ext.state_compliance}
                    />
                  ) : (
                    <p className="text-navy-400 text-sm font-body">
                      State compliance data not yet extracted.
                    </p>
                  )}

                  {!!ext.nil_rights_grant && (
                    <DataSection
                      title="NIL Rights Grant"
                      data={ext.nil_rights_grant}
                    />
                  )}

                  {!!ext.restriction_clauses && (
                    <DataSection
                      title="Restriction Clauses"
                      data={ext.restriction_clauses}
                    />
                  )}

                  {!!ext.dispute_resolution && (
                    <DataSection
                      title="Dispute Resolution"
                      data={ext.dispute_resolution}
                    />
                  )}

                  {!!ext.termination_clause && (
                    <DataSection
                      title="Termination Clause"
                      data={ext.termination_clause}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
