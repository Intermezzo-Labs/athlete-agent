"use client"

import clsx from "clsx"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { AthleteInfo } from "types/nil"
import { StepIndicator } from "./StepIndicator"

interface AthleteFormProps {
  info: AthleteInfo
  onChange: (info: AthleteInfo) => void
  onNext: () => void
  onBack: () => void
}

// ── Best practice: rendering-hoist-jsx ──
// Static data arrays hoisted outside component – avoids re-creation on every render.
const SPORTS = [
  "Football", "Basketball (M)", "Basketball (W)", "Baseball", "Softball",
  "Soccer (M)", "Soccer (W)", "Volleyball", "Swimming", "Track & Field",
  "Golf", "Tennis", "Gymnastics", "Wrestling", "Lacrosse", "Hockey", "Other",
]

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
]

export function AthleteForm({ info, onChange, onNext, onBack }: AthleteFormProps) {
  const isValid = !!(info.name && info.email && info.school && info.sport && info.state)

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <StepIndicator currentStep={1} totalSteps={3} />

          <div className="border border-line rounded-lg p-8 bg-surface">
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Tell us about yourself
            </h2>
            <p className="text-ink-muted text-sm mb-8">
              This helps us tailor the analysis to your specific situation.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5" htmlFor="af-name">
                  Full name
                </label>
                <input
                  id="af-name"
                  type="text"
                  value={info.name}
                  onChange={(e) => onChange({ ...info, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-line rounded-md bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition duration-200 ease-in-out text-sm"
                  placeholder="Jordan Smith"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5" htmlFor="af-email">
                  School email
                </label>
                <input
                  id="af-email"
                  type="email"
                  value={info.email}
                  onChange={(e) => onChange({ ...info, email: e.target.value })}
                  className="w-full px-3 py-2.5 border border-line rounded-md bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition duration-200 ease-in-out text-sm"
                  placeholder="jsmith@university.edu"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5" htmlFor="af-school">
                  School or university
                </label>
                <input
                  id="af-school"
                  type="text"
                  value={info.school}
                  onChange={(e) => onChange({ ...info, school: e.target.value })}
                  className="w-full px-3 py-2.5 border border-line rounded-md bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition duration-200 ease-in-out text-sm"
                  placeholder="University of Florida"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5" htmlFor="af-sport">
                  Sport
                </label>
                <select
                  id="af-sport"
                  value={info.sport}
                  onChange={(e) => onChange({ ...info, sport: e.target.value })}
                  className="w-full px-3 py-2.5 border border-line rounded-md bg-surface text-ink focus:outline-none focus:border-ink transition duration-200 ease-in-out text-sm"
                >
                  <option value="">Select your sport</option>
                  {SPORTS.map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-muted mb-1.5" htmlFor="af-state">
                  State where school is located
                </label>
                <select
                  id="af-state"
                  value={info.state}
                  onChange={(e) => onChange({ ...info, state: e.target.value })}
                  className="w-full px-3 py-2.5 border border-line rounded-md bg-surface text-ink focus:outline-none focus:border-ink transition duration-200 ease-in-out text-sm"
                >
                  <option value="">Select state</option>
                  {US_STATES.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onBack}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-subtle transition duration-200 ease-in-out"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </button>
              <button
                onClick={onNext}
                disabled={!isValid}
                className={clsx(
                  "flex-1 inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition duration-200 ease-in-out",
                  isValid
                    ? "bg-[#FF6600] text-white hover:opacity-90"
                    : "bg-subtle text-ink-faint cursor-not-allowed"
                )}
              >
                Continue
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
