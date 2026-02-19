import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "components/ThemeProvider"
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
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-canvas font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
