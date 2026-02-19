// ── Shared dashboard helper utilities ──

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

export function riskColor(risk: string | null): string {
  switch (risk?.toLowerCase()) {
    case "low":    return "bg-emerald-100 text-emerald-800"
    case "medium": return "bg-amber-100 text-amber-800"
    case "high":   return "bg-red-100 text-red-800"
    default:       return "bg-navy-100 text-navy-500"
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case "COMPLETED":   return "bg-emerald-100 text-emerald-800"
    case "IN_PROGRESS": return "bg-blue-100 text-blue-800"
    case "FAILED":      return "bg-red-100 text-red-800"
    case "PARTIAL":     return "bg-amber-100 text-amber-800"
    default:            return "bg-navy-100 text-navy-500"
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
