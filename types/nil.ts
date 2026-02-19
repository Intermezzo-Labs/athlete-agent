// ── Shared NIL contract analysis types ──

export interface AthleteInfo {
  name: string
  email: string
  school: string
  sport: string
  state: string
  consentToKB: boolean
}

export interface RiskItem {
  section: string
  level: "low" | "medium" | "high"
  title: string
  description: string
  recommendation: string
}

export interface AnalysisReport {
  id: string
  athleteName: string
  overallRisk: "low" | "medium" | "high"
  summary: string
  risks: RiskItem[]
  keyTerms: { term: string; explanation: string }[]
  generatedAt: string
}

// ── Dashboard types ──

export interface DealSummary {
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

export interface DashboardSummary {
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

export interface FilterOptions {
  sports: string[]
  states: string[]
  schools: string[]
  riskLevels: string[]
  dealTypes: string[]
  statuses: string[]
  compensationRange: { min: number; max: number }
}

export interface Filters {
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

export interface AnalyticsData {
  dealsAnalyzed: number
  payorTypeDistribution: Record<string, number>
  compensationTypeDistribution: Record<string, number>
  exclusivityBreakdown: { exclusive: number; non_exclusive: number }
  perpetualRightsCount: number
  clawbackCount: number
  clawbackRate: number
  disputeResolutionDistribution: Record<string, number>
}

export interface DealDetail {
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
