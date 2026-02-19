import { DealDetailClient } from "components/deal/DealDetailClient"

interface DealDetailPageProps {
  params: Promise<{ dealId: string }>
}

export default async function DealDetailPage({ params }: DealDetailPageProps) {
  const { dealId } = await params
  return <DealDetailClient dealId={dealId} />
}
