"use client"

import logo from "@/assets/athlete-agent-labs-logo.svg"
import clsx from "clsx"
import { AlertTriangle, Loader2, Lock } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { API_URL } from "./helpers"

interface LoginScreenProps {
  onAuth: (key: string) => void
}

export function LoginScreen({ onAuth }: LoginScreenProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/dashboard/auth`, {
        method: "POST",
        headers: { "X-Dashboard-Key": password },
      })
      if (res.ok) {
        onAuth(password)
      } else {
        setError("Invalid password")
      }
    } catch {
      setError("Could not reach server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="border border-line rounded-lg p-6 sm:p-8 w-full max-w-sm space-y-6 bg-surface"
      >
        <div className="text-center">
          <Image src={logo} alt="Athlete Agent Labs" className="h-12 sm:h-14 w-auto mb-6 sm:mb-8 mx-auto" />
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-line mb-4">
            <Lock className="w-5 h-5 text-ink-muted" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-ink">
            Dashboard access
          </h1>
          <p className="text-ink-muted mt-1 text-sm">Enter your password to continue.</p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dashboard password"
          className="w-full px-3 py-2.5 border border-line rounded-md text-sm focus:outline-none focus:border-ink bg-surface text-ink transition duration-200 ease-in-out"
          autoFocus
          aria-label="Dashboard password"
        />

        {error ? (
          <p className="text-red-600 text-xs flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" /> {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading || !password}
          className={clsx(
            "w-full py-2.5 rounded-md text-sm font-medium transition duration-200 ease-in-out",
            password
              ? "bg-[#FF6600] text-white hover:opacity-90"
              : "bg-subtle text-ink-faint cursor-not-allowed"
          )}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" aria-hidden="true" /> : "Sign in"}
        </button>
      </form>
    </div>
  )
}
