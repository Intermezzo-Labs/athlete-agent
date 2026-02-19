import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "styles/tailwind.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Athlete Agent Labs | NIL Contract Analysis",
  description:
    "Get professional risk analysis of your NIL contracts. Built by a licensed Florida attorney and sports agent.",
  keywords: ["NIL", "NCAA", "athlete", "contract", "analysis", "sports agent"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen bg-slate-50 font-body">{children}</body>
    </html>
  )
}
