import clsx from "clsx"
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import { memo } from "react"
import type { DealSummary, FilterOptions, Filters } from "types/nil"
import { FilterSelect } from "./FilterSelect"
import { formatCurrency, formatDate, riskColor, statusColor } from "./helpers"

// ── Best practice: rendering-hoist-jsx ──
// Table header is static – hoist to avoid JSX recreation on every render.
const tableHead = (
  <thead>
    <tr className="bg-navy-900 text-white text-left">
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Athlete</th>
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">School</th>
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Sport</th>
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Compensation</th>
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Risk</th>
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Extraction</th>
      <th className="px-4 py-3 uppercase tracking-wider text-xs font-bold">Date</th>
      <th className="px-4 py-3" />
    </tr>
  </thead>
)

interface DealsTableProps {
  filteredDeals: DealSummary[]
  totalDeals: number
  filters: Filters
  filterOptions: FilterOptions | null
  filtersExpanded: boolean
  filterCount: number
  onFilterChange: (key: keyof Filters, value: string) => void
  onToggleFilters: () => void
  onClearFilters: () => void
}

// ── Best practice: rerender-memo ──
// DealsTable re-renders only when deals/filters actually change.
export const DealsTable = memo(function DealsTable({
  filteredDeals,
  totalDeals,
  filters,
  filterOptions,
  filtersExpanded,
  filterCount,
  onFilterChange,
  onToggleFilters,
  onClearFilters,
}: DealsTableProps) {
  return (
    <>
      {/* Search + filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            placeholder="Search by athlete, school, sport, state, or deal ID…"
            className="w-full pl-10 pr-4 py-2.5 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={clsx(
            "flex items-center gap-2 px-4 py-2.5 border rounded-md text-sm font-medium font-body transition-colors",
            filtersExpanded || filterCount > 0
              ? "border-gold-500 bg-gold-50 text-gold-700"
              : "border-navy-200 text-navy-600 hover:border-navy-300"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {/* ── Best practice: rendering-conditional-render ── */}
          {filterCount > 0 ? (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-500 text-white text-xs">
              {filterCount}
            </span>
          ) : null}
        </button>
        {filterCount > 0 ? (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-navy-500 hover:text-navy-700 font-body transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear All
          </button>
        ) : null}
      </div>

      {/* Expanded filter panel */}
      {filtersExpanded && filterOptions ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-white rounded-lg border border-navy-100 p-4 shadow-sm">
          <FilterSelect value={filters.sport} onChange={(v) => onFilterChange("sport", v)} options={filterOptions.sports} placeholder="All Sports" />
          <FilterSelect value={filters.state} onChange={(v) => onFilterChange("state", v)} options={filterOptions.states} placeholder="All States" />
          <FilterSelect value={filters.riskLevel} onChange={(v) => onFilterChange("riskLevel", v)} options={filterOptions.riskLevels} placeholder="All Risk Levels" />
          <FilterSelect value={filters.status} onChange={(v) => onFilterChange("status", v)} options={filterOptions.statuses} placeholder="All Statuses" />
          <input
            type="number"
            value={filters.compensationMin}
            onChange={(e) => onFilterChange("compensationMin", e.target.value)}
            placeholder="Min $"
            className="w-full px-3 py-2 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
          />
          <input
            type="number"
            value={filters.compensationMax}
            onChange={(e) => onFilterChange("compensationMax", e.target.value)}
            placeholder="Max $"
            className="w-full px-3 py-2 border border-navy-200 rounded-md text-sm font-body focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors"
          />
        </div>
      ) : null}

      {/* Table */}
      <div className="bg-white rounded-lg border border-navy-100 border-t-4 border-t-gold-500 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            {tableHead}
            <tbody className="divide-y divide-navy-100">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-navy-400">
                    {totalDeals === 0
                      ? "No deals yet. Deals will appear here after an athlete uploads a contract."
                      : "No deals match your filters."}
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => (
                  <tr key={deal.dealId} className="row-athletic hover:bg-navy-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-bold text-navy-900">{deal.athleteName}</p>
                        <p className="text-xs text-navy-400">{deal.athleteEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-navy-700">{deal.school}</td>
                    <td className="px-4 py-3 text-navy-700">{deal.sport}</td>
                    <td className="px-4 py-3 text-navy-900 font-bold tabular-nums">
                      {formatCurrency(deal.totalCompensation)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-block px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider capitalize",
                          riskColor(deal.overallRisk)
                        )}
                      >
                        {deal.overallRisk ?? "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-block px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider",
                          statusColor(deal.extractionStatus)
                        )}
                      >
                        {deal.extractionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-500 whitespace-nowrap">{formatDate(deal.createdAt)}</td>
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
        Showing {filteredDeals.length} of {totalDeals} deals
      </p>
    </>
  )
})
