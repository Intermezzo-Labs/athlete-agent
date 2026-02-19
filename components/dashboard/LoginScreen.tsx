"use client"

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
    <div className="min-h-screen flex items-center justify-center bg-dark-speed">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl border-t-4 border-t-gold-500 p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <Image
            src="/logo-white.svg"
            alt="Athlete Agent Labs"
            width={200}
            height={30}
            className="h-7 w-auto mb-8 mx-auto"
          />
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 mb-4">
            <Lock className="w-7 h-7 text-gold-600" />
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-navy-900">
            Dashboard Access
          </h1>
          <p className="text-navy-500 mt-1 font-body text-sm">Enter your dashboard password to continue.</p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dashboard password"
          className="w-full px-4 py-3 border border-navy-200 rounded-md focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 transition-colors font-body"
          autoFocus
        />

        {/* ── Best practice: rendering-conditional-render ── */}
        {error ? (
          <p className="text-red-600 text-sm flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
            <AlertTriangle className="w-4 h-4" /> {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading || !password}
          className={clsx(
            "w-full py-3 rounded-lg font-body transition-colors",
            password
              ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold uppercase tracking-wider"
              : "bg-navy-100 text-navy-400 cursor-not-allowed"
          )}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Sign In"}
        </button>
      </form>
    </div>
  )
}
