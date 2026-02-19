"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Hero } from "./Hero"

// ── Best practice: bundle-dynamic-imports ──
// The wizard (react-dropzone, multi-step form, report renderer) is heavy client-only
// code not needed on initial load. Dynamically importing with ssr:false means the
// entire chunk only downloads after the user clicks "Analyze My Contract", keeping
// the landing page bundle small and TTI/LCP fast.
const ContractWizard = dynamic(() => import("./ContractWizard"), { ssr: false })

export function LandingPage() {
  const [wizardOpen, setWizardOpen] = useState(false)

  // ── Best practice: rendering-conditional-render ──
  return wizardOpen ? (
    <ContractWizard />
  ) : (
    <Hero onStart={() => setWizardOpen(true)} />
  )
}
