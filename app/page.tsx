import { Metadata } from "next"
import { LandingPage } from "components/ContractWizard/LandingPage"

export const metadata: Metadata = {
  title: "Athlete Agent Labs — NIL Contract Analyzer",
  description: "AI-powered NIL contract analysis for student athletes. Instant risk assessment and compliance checking.",
  twitter: {
    card: "summary_large_image",
  },
}

export default function Home() {
  return <LandingPage />
}
