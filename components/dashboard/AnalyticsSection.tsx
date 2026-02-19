import { Loader2 } from "lucide-react"
import { memo } from "react"
import type { AnalyticsData, DashboardSummary } from "types/nil"
import { BarRow } from "./BarRow"
import { formatCurrency } from "./helpers"
import { SectionCard } from "./SectionCard"
import { StatCard } from "./StatCard"

interface AnalyticsSectionProps {
  summary: DashboardSummary
  analytics: AnalyticsData | null
  analyticsLoading: boolean
}

// ── Best practice: rerender-memo ──
// AnalyticsSection is expensive to render (many BarRows, tables). Memoising means
// it only re-renders when its own props change, not on filter/search updates.
export const AnalyticsSection = memo(function AnalyticsSection({
  summary,
  analytics,
  analyticsLoading,
}: AnalyticsSectionProps) {
  const sortedEntries = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])

  const maxVal = (obj: Record<string, number>) => Math.max(...Object.values(obj), 1)

  return (
    <div className="space-y-6">
      {/* Compensation Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Best practice: rendering-conditional-render ── */}
        {Object.keys(summary.compensationPercentiles).length > 0 ? (
          <SectionCard title="Compensation Percentiles">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["p25", "p50", "p75", "p90"].map((key) => (
                <StatCard
                  key={key}
                  label={key.toUpperCase()}
                  value={formatCurrency(summary.compensationPercentiles[key] ?? 0)}
                />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {Object.keys(summary.compensationBySport).length > 0 ? (
          <SectionCard title="Avg Compensation by Sport">
            <div className="space-y-2.5">
              {sortedEntries(summary.compensationBySport).slice(0, 8).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.compensationBySport)} format="currency" />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {Object.keys(summary.compensationByState).length > 0 ? (
          <SectionCard title="Avg Compensation by State">
            <div className="space-y-2.5">
              {sortedEntries(summary.compensationByState).slice(0, 8).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.compensationByState)} format="currency" />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {Object.keys(summary.compensationByDealType).length > 0 ? (
          <SectionCard title="Avg Compensation by Deal Type">
            <div className="space-y-2.5">
              {sortedEntries(summary.compensationByDealType).slice(0, 8).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.compensationByDealType)} format="currency" />
              ))}
            </div>
          </SectionCard>
        ) : null}
      </div>

      {/* Deal Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.keys(summary.dealsBySport).length > 0 ? (
          <SectionCard title="Deals by Sport">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsBySport).slice(0, 8).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.dealsBySport)} />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {Object.keys(summary.dealsByState).length > 0 ? (
          <SectionCard title="Deals by State">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsByState).slice(0, 8).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.dealsByState)} />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {Object.keys(summary.dealsByDealType).length > 0 ? (
          <SectionCard title="Deals by Type">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsByDealType).slice(0, 8).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.dealsByDealType)} />
              ))}
            </div>
          </SectionCard>
        ) : null}

        {Object.keys(summary.dealsByRisk).length > 0 ? (
          <SectionCard title="Deals by Risk Level">
            <div className="space-y-2.5">
              {sortedEntries(summary.dealsByRisk).map(([label, value]) => (
                <BarRow key={label} label={label} value={value} max={maxVal(summary.dealsByRisk)} />
              ))}
            </div>
          </SectionCard>
        ) : null}
      </div>

      {/* Risk by Sport */}
      {Object.keys(summary.riskBySport).length > 0 ? (
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
                  .sort((a, b) =>
                    Object.values(b[1]).reduce((s, v) => s + v, 0) -
                    Object.values(a[1]).reduce((s, v) => s + v, 0)
                  )
                  .slice(0, 10)
                  .map(([sport, risks]) => (
                    <tr key={sport}>
                      <td className="py-2 px-4 text-navy-700">{sport}</td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                          {risks["Low"] ?? risks["low"] ?? 0}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          {risks["Medium"] ?? risks["medium"] ?? 0}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800">
                          {risks["High"] ?? risks["high"] ?? 0}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      ) : null}

      {/* Monthly Volume */}
      {Object.keys(summary.monthlyDealVolume).length > 0 ? (
        <SectionCard title="Monthly Deal Volume">
          <div className="space-y-2.5">
            {Object.entries(summary.monthlyDealVolume)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .slice(-12)
              .map(([month, count]) => (
                <BarRow key={month} label={month} value={count} max={maxVal(summary.monthlyDealVolume)} />
              ))}
          </div>
        </SectionCard>
      ) : null}

      {/* Contract Patterns */}
      {analyticsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-navy-400" />
          <span className="ml-2 text-sm text-navy-500 font-body">Loading contract patterns…</span>
        </div>
      ) : analytics && analytics.dealsAnalyzed > 0 ? (
        <>
          <h2 className="text-lg font-display font-bold uppercase tracking-tight text-navy-900">
            Contract Patterns ({analytics.dealsAnalyzed} extracted)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.keys(analytics.payorTypeDistribution).length > 0 ? (
              <SectionCard title="Payor Type Distribution">
                <div className="space-y-2.5">
                  {sortedEntries(analytics.payorTypeDistribution).map(([label, value]) => (
                    <BarRow key={label} label={label} value={value} max={maxVal(analytics.payorTypeDistribution)} />
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {Object.keys(analytics.compensationTypeDistribution).length > 0 ? (
              <SectionCard title="Compensation Component Types">
                <div className="space-y-2.5">
                  {sortedEntries(analytics.compensationTypeDistribution).map(([label, value]) => (
                    <BarRow key={label} label={label} value={value} max={maxVal(analytics.compensationTypeDistribution)} />
                  ))}
                </div>
              </SectionCard>
            ) : null}

            {Object.keys(analytics.disputeResolutionDistribution).length > 0 ? (
              <SectionCard title="Dispute Resolution Methods">
                <div className="space-y-2.5">
                  {sortedEntries(analytics.disputeResolutionDistribution).map(([label, value]) => (
                    <BarRow key={label} label={label} value={value} max={maxVal(analytics.disputeResolutionDistribution)} />
                  ))}
                </div>
              </SectionCard>
            ) : null}

            <SectionCard title="Key Contract Indicators">
              <div className="grid grid-cols-2 gap-3">
                <StatCard
                  label="Exclusivity Rate"
                  value={`${analytics.exclusivityBreakdown.exclusive + analytics.exclusivityBreakdown.non_exclusive > 0
                      ? Math.round(
                        (analytics.exclusivityBreakdown.exclusive /
                          (analytics.exclusivityBreakdown.exclusive + analytics.exclusivityBreakdown.non_exclusive)) *
                        100
                      )
                      : 0
                    }%`}
                />
                <StatCard label="Clawback Rate" value={`${analytics.clawbackRate}%`} />
                <StatCard label="Perpetual Rights" value={analytics.perpetualRightsCount} />
                <StatCard label="Deals Analyzed" value={analytics.dealsAnalyzed} />
              </div>
            </SectionCard>
          </div>
        </>
      ) : null}
    </div>
  )
})
