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
    <tr className="bg-subtle border-b border-line text-left">
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">Athlete</th>
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">School</th>
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">Sport</th>
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">Compensation</th>
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">Risk</th>
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">Extraction</th>
      <th className="px-4 py-3 text-xs font-medium text-ink-muted">Date</th>
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" aria-hidden="true" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            placeholder="Search by athlete, school, sport, state, or deal ID…"
            className="w-full pl-10 pr-4 py-2.5 border border-line rounded-md text-sm focus:outline-none focus:border-ink bg-surface text-ink transition duration-200 ease-in-out"
            aria-label="Search deals"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={clsx(
            "inline-flex items-center gap-2 px-4 py-2.5 border rounded-md text-sm font-medium transition duration-200 ease-in-out",
            filtersExpanded || filterCount > 0
              ? "border-ink bg-subtle text-ink"
              : "border-line text-ink-muted hover:border-ink-faint"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          Filters
          {filterCount > 0 ? (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-ink text-canvas text-xs">
              {filterCount}
            </span>
          ) : null}
        </button>
        {filterCount > 0 ? (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-ink-muted hover:text-ink transition duration-200 ease-in-out"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" /> Clear all
          </button>
        ) : null}
      </div>

      {/* Expanded filter panel */}
      {filtersExpanded && filterOptions ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 border border-line rounded-lg bg-surface p-4">
          <FilterSelect value={filters.sport} onChange={(v) => onFilterChange("sport", v)} options={filterOptions.sports} placeholder="All sports" />
          <FilterSelect value={filters.state} onChange={(v) => onFilterChange("state", v)} options={filterOptions.states} placeholder="All states" />
          <FilterSelect value={filters.riskLevel} onChange={(v) => onFilterChange("riskLevel", v)} options={filterOptions.riskLevels} placeholder="All risk levels" />
          <FilterSelect value={filters.status} onChange={(v) => onFilterChange("status", v)} options={filterOptions.statuses} placeholder="All statuses" />
          <input
            type="number"
            value={filters.compensationMin}
            onChange={(e) => onFilterChange("compensationMin", e.target.value)}
            placeholder="Min $"
            className="w-full px-3 py-2 border border-line rounded-md text-sm focus:outline-none focus:border-ink bg-surface text-ink transition duration-200 ease-in-out"
          />
          <input
            type="number"
            value={filters.compensationMax}
            onChange={(e) => onFilterChange("compensationMax", e.target.value)}
            placeholder="Max $"
            className="w-full px-3 py-2 border border-line rounded-md text-sm focus:outline-none focus:border-ink bg-surface text-ink transition duration-200 ease-in-out"
          />
        </div>
      ) : null}

      {/* Table */}
      <div className="border border-line rounded-lg bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {tableHead}
            <tbody className="divide-y divide-line">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-ink-faint text-sm">
                    {totalDeals === 0
                      ? "No deals yet. Deals will appear here after an athlete uploads a contract."
                      : "No deals match your filters."}
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal) => (
                  <tr key={deal.dealId} className="hover:bg-subtle transition duration-150 ease-in-out">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-ink text-sm">{deal.athleteName}</p>
                        <p className="text-xs text-ink-faint mt-0.5">{deal.athleteEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-muted text-sm">{deal.school}</td>
                    <td className="px-4 py-3 text-ink-muted text-sm">{deal.sport}</td>
                    <td className="px-4 py-3 text-ink font-medium tabular-nums text-sm">
                      {formatCurrency(deal.totalCompensation)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-block px-2 py-0.5 rounded border text-xs font-medium capitalize",
                          riskColor(deal.overallRisk)
                        )}
                      >
                        {deal.overallRisk ?? "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={clsx(
                          "inline-block px-2 py-0.5 rounded border text-xs font-medium",
                          statusColor(deal.extractionStatus)
                        )}
                      >
                        {deal.extractionStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-faint whitespace-nowrap text-xs">{formatDate(deal.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/${deal.dealId}`}
                        className="inline-flex items-center gap-1 text-[#FF6600] hover:opacity-75 font-medium text-xs transition duration-200 ease-in-out"
                      >
                        View <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-ink-faint">
        Showing {filteredDeals.length} of {totalDeals} deals
      </p>
    </>
  )
})
