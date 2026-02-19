// ── Shared dashboard helper utilities ──

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export function riskColor(risk: string | null): string {
  switch (risk?.toLowerCase()) {
    case "low":    return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "medium": return "bg-amber-50 text-amber-700 border-amber-200"
    case "high":   return "bg-red-50 text-red-700 border-red-200"
    default:       return "bg-subtle text-ink-muted border-line"
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case "COMPLETED":   return "bg-emerald-50 text-emerald-700 border-emerald-200"
    case "IN_PROGRESS": return "bg-blue-50 text-blue-700 border-blue-200"
    case "FAILED":      return "bg-red-50 text-red-700 border-red-200"
    case "PARTIAL":     return "bg-amber-50 text-amber-700 border-amber-200"
    default:            return "bg-subtle text-ink-muted border-line"
  }
}

export function formatCurrency(amount: number | null): string {
  if (amount == null) return "--"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch {
    return iso
  }
}
