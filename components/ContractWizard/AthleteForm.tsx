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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-dark-speed">
      <div className="w-full max-w-md">
        <StepIndicator currentStep={1} totalSteps={3} />

        <div className="bg-white rounded-lg shadow-2xl shadow-navy-950/50 border-t-4 border-t-gold-500 p-8">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-navy-900 mb-2">
            Tell us about yourself
          </h2>
          <p className="text-navy-500 font-light mb-6">
            This helps us tailor the analysis to your specific situation.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-navy-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={info.name}
                onChange={(e) => onChange({ ...info, name: e.target.value })}
                className="w-full px-4 py-3 border border-navy-200 rounded-md bg-white text-navy-900 focus:border-gold-500 transition-colors"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-navy-600 mb-1.5">
                School Email
              </label>
              <input
                type="email"
                value={info.email}
                onChange={(e) => onChange({ ...info, email: e.target.value })}
                className="w-full px-4 py-3 border border-navy-200 rounded-md bg-white text-navy-900 focus:border-gold-500 transition-colors"
                placeholder="jsmith@university.edu"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-navy-600 mb-1.5">
                School / University
              </label>
              <input
                type="text"
                value={info.school}
                onChange={(e) => onChange({ ...info, school: e.target.value })}
                className="w-full px-4 py-3 border border-navy-200 rounded-md bg-white text-navy-900 focus:border-gold-500 transition-colors"
                placeholder="University of Florida"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-navy-600 mb-1.5">
                Sport
              </label>
              <select
                value={info.sport}
                onChange={(e) => onChange({ ...info, sport: e.target.value })}
                className="w-full px-4 py-3 border border-navy-200 rounded-md bg-white text-navy-900 focus:border-gold-500 transition-colors"
              >
                <option value="">Select your sport</option>
                {SPORTS.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-navy-600 mb-1.5">
                State (where school is located)
              </label>
              <select
                value={info.state}
                onChange={(e) => onChange({ ...info, state: e.target.value })}
                className="w-full px-4 py-3 border border-navy-200 rounded-md bg-white text-navy-900 focus:border-gold-500 transition-colors"
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
              className="flex-1 px-6 py-3 border-2 border-navy-200 rounded-md font-semibold uppercase tracking-wider text-sm text-navy-600 hover:bg-navy-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!isValid}
              className={clsx(
                "flex-1 px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm transition-all",
                isValid
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 btn-athletic shadow-lg shadow-gold-500/25"
                  : "bg-navy-100 text-navy-400 cursor-not-allowed"
              )}
            >
              Continue
              <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
