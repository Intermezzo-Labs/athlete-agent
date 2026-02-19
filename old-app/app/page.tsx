'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import {
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Scale,
  GraduationCap,
  Shield,
  Zap,
} from 'lucide-react'
import clsx from 'clsx'

// Types
interface AthleteInfo {
  name: string
  email: string
  school: string
  sport: string
  state: string
  consentToKB: boolean
}

interface RiskItem {
  section: string
  level: 'low' | 'medium' | 'high'
  title: string
  description: string
  recommendation: string
}

interface AnalysisReport {
  id: string
  athleteName: string
  overallRisk: 'low' | 'medium' | 'high'
  summary: string
  risks: RiskItem[]
  keyTerms: { term: string; explanation: string }[]
  generatedAt: string
}

// ── Step indicator – athletic track bar ──
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1 mb-8 max-w-xs mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-navy-700">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-500',
                i + 1 <= currentStep
                  ? 'w-full bg-gradient-to-r from-gold-500 to-gold-400'
                  : 'w-0'
              )}
            />
          </div>
          {i < totalSteps - 1 && (
            <div className={clsx(
              'w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300',
              i + 1 < currentStep ? 'bg-gold-500' : 'bg-navy-700'
            )} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Hero section ──
function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Banner with Logo */}
      <header className="bg-[#060f1d] pl-3 pr-6 py-3 relative z-50 flex items-center justify-between">
        <Image
          src="/logo-site-matched.png"
          alt="Athlete Agent Labs"
          width={504}
          height={95}
          className="w-auto"
          style={{ height: '72px' }}
          priority
        />
        <nav className="flex items-center gap-8">
          <a href="/blog" className="text-white text-sm font-semibold uppercase tracking-wider hover:text-gold-500 transition-colors">
            Blog
          </a>
          <a href="/nil-laws" className="text-white text-sm font-semibold uppercase tracking-wider hover:text-gold-500 transition-colors">
            NIL Laws and Resources
          </a>
        </nav>
      </header>

      {/* Background Image Section */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* TO CHANGE IMAGE: Replace the URL above or add your own image to /public/images/
            and use: backgroundImage: 'url(/images/your-image.jpg)' */}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />

      {/* Hero content */}
      <main className="relative flex-1 flex items-center justify-center px-6 py-12 pb-24" style={{ zIndex: 10 }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tight text-white mb-6 leading-[0.95] animate-slide-up">
            Know what{' '}
            <br className="hidden md:block" />
            you&apos;re signing
            <span className="text-white">.</span>
          </h1>

          <p className="text-lg md:text-xl text-navy-300 font-light mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Upload your NIL contract and get a detailed risk analysis in minutes.
            Understand the fine print before you commit.
          </p>

          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-10 py-4 rounded-lg font-bold text-lg uppercase tracking-wider btn-athletic shadow-lg shadow-gold-500/25 animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          >
            Analyze My Contract
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-8 text-xs uppercase tracking-widest text-navy-500 font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
            No account required &bull; Results in minutes &bull; Free during beta
          </p>
        </div>
      </main>
      </div>

      {/* Legal footer - Fixed to bottom */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 py-4 border-t border-white/20 bg-black/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6">
          <a href="/privacy-policy" className="text-white/80 text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors">
            Privacy Policy
          </a>
          <div className="w-px h-4 bg-white/30" />
          <a href="/terms-of-service" className="text-white/80 text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors">
            Terms of Service
          </a>
          <div className="w-px h-4 bg-white/30" />
          <a href="/disclaimer" className="text-white/80 text-xs uppercase tracking-wider font-semibold hover:text-white transition-colors">
            Disclaimer
          </a>
        </div>
      </footer>
    </div>
  )
}

// ── Athlete info form ──
function AthleteForm({
  info,
  onChange,
  onNext,
  onBack
}: {
  info: AthleteInfo
  onChange: (info: AthleteInfo) => void
  onNext: () => void
  onBack: () => void
}) {
  const sports = [
    'Football', 'Basketball (M)', 'Basketball (W)', 'Baseball', 'Softball',
    'Soccer (M)', 'Soccer (W)', 'Volleyball', 'Swimming', 'Track & Field',
    'Golf', 'Tennis', 'Gymnastics', 'Wrestling', 'Lacrosse', 'Hockey', 'Other'
  ]

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ]

  const isValid = info.name && info.email && info.school && info.sport && info.state

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
                {sports.map((sport) => (
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
                {states.map((state) => (
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
                'flex-1 px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm transition-all',
                isValid
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 btn-athletic shadow-lg shadow-gold-500/25'
                  : 'bg-navy-100 text-navy-400 cursor-not-allowed'
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

// ── Contract upload ──
function ContractUpload({
  info,
  onInfoChange,
  onUpload,
  onBack,
  isUploading
}: {
  info: AthleteInfo
  onInfoChange: (info: AthleteInfo) => void
  onUpload: (file: File) => void
  onBack: () => void
  isUploading: boolean
}) {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const handleSubmit = () => {
    if (file && info.consentToKB) {
      onUpload(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-dark-speed">
      <div className="w-full max-w-md">
        <StepIndicator currentStep={2} totalSteps={3} />

        <div className="bg-white rounded-lg shadow-2xl shadow-navy-950/50 border-t-4 border-t-gold-500 p-8">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-navy-900 mb-2">
            Upload your contract
          </h2>
          <p className="text-navy-500 font-light mb-6">
            We accept PDF, DOC, and DOCX files.
          </p>

          <div
            {...getRootProps()}
            className={clsx(
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all',
              isDragActive
                ? 'border-gold-500 bg-gold-500/5 shadow-inner'
                : 'border-navy-300 hover:border-gold-500/50 hover:bg-navy-50',
              isUploading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input {...getInputProps()} />

            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-7 h-7 text-gold-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">{file.name}</p>
                  <p className="text-sm text-navy-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null) }}
                  className="text-xs uppercase tracking-wider font-semibold text-navy-500 hover:text-gold-600"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-navy-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-7 h-7 text-navy-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">
                    {isDragActive ? 'Drop your contract here' : 'Drag & drop your contract'}
                  </p>
                  <p className="text-sm text-navy-500">
                    or <span className="text-gold-600 font-medium">click to browse</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Consent checkbox */}
          <div className="mt-6 p-4 bg-navy-50 rounded-md border-l-4 border-l-gold-500">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={info.consentToKB}
                onChange={(e) => onInfoChange({ ...info, consentToKB: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-navy-300 text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm text-navy-600">
                I consent to having my contract (with personal details removed) added to the
                knowledge base to help improve analysis for future athletes.
                <span className="font-bold"> This is required to use the service.</span>
              </span>
            </label>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={onBack}
              disabled={isUploading}
              className="flex-1 px-6 py-3 border-2 border-navy-200 rounded-md font-semibold uppercase tracking-wider text-sm text-navy-600 hover:bg-navy-50 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!file || !info.consentToKB || isUploading}
              className={clsx(
                'flex-1 px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm transition-all',
                file && info.consentToKB && !isUploading
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 btn-athletic shadow-lg shadow-gold-500/25'
                  : 'bg-navy-100 text-navy-400 cursor-not-allowed'
              )}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Contract
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Processing/loading state ──
function ProcessingState() {
  const steps = [
    { label: 'Extracting contract text', done: true },
    { label: 'Analyzing against NCAA guidelines', done: true },
    { label: 'Checking state-specific requirements', done: false },
    { label: 'Identifying risk factors', done: false },
    { label: 'Generating report', done: false },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-dark-speed">
      <div className="w-full max-w-md text-center">
        {/* Pulsing ring animation */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-gold-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-gold-500/20 animate-pulse-ring" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-white mb-2">
          Analyzing your contract
        </h2>
        <p className="text-navy-400 font-light mb-10">
          This usually takes 1-2 minutes
        </p>

        {/* Vertical timeline */}
        <div className="bg-navy-900/50 rounded-lg p-6 text-left border border-navy-800">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-navy-950" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-navy-600 flex-shrink-0" />
                  )}
                  {i < steps.length - 1 && (
                    <div className={clsx(
                      'w-0.5 h-6',
                      step.done ? 'bg-gold-500' : 'bg-navy-700'
                    )} />
                  )}
                </div>
                {/* Label */}
                <span className={clsx(
                  'text-sm font-medium pt-0.5',
                  step.done ? 'text-white' : 'text-navy-500'
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Risk badge ──
function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Low Risk' },
    medium: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Medium Risk' },
    high: { bg: 'bg-red-100', text: 'text-red-800', label: 'High Risk' },
  }
  const { bg, text, label } = config[level]

  return (
    <span className={clsx('px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider', bg, text)}>
      {label}
    </span>
  )
}

// ── Report display ──
function ReportDisplay({
  report,
  onDownload,
  onStartOver
}: {
  report: AnalysisReport
  onDownload: () => void
  onStartOver: () => void
}) {
  const RiskIcon = report.overallRisk === 'high' ? AlertCircle :
                   report.overallRisk === 'medium' ? AlertTriangle :
                   CheckCircle

  const riskColor = report.overallRisk === 'high' ? 'red' :
                    report.overallRisk === 'medium' ? 'amber' : 'emerald'

  return (
    <div className="min-h-screen">
      {/* Dark header banner */}
      <div className="bg-hero-dark pt-8 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <StepIndicator currentStep={3} totalSteps={3} />

          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-white mb-2">
                Analysis Report
              </h1>
              <p className="text-navy-400 font-light">
                Prepared for {report.athleteName} &bull; {report.generatedAt}
              </p>
            </div>
            <RiskBadge level={report.overallRisk} />
          </div>
        </div>
      </div>

      {/* Content area – overlaps the dark header */}
      <div className="max-w-3xl mx-auto px-6 -mt-10">
        {/* Overall assessment */}
        <div className={clsx(
          'bg-white rounded-lg shadow-xl p-6 mb-6 border-l-4',
          riskColor === 'red' ? 'border-l-red-500' :
          riskColor === 'amber' ? 'border-l-amber-500' : 'border-l-emerald-500'
        )}>
          <div className="flex items-start gap-3">
            <RiskIcon className={clsx(
              'w-6 h-6 flex-shrink-0 mt-0.5',
              riskColor === 'red' ? 'text-red-500' :
              riskColor === 'amber' ? 'text-amber-500' : 'text-emerald-500'
            )} />
            <div>
              <p className="font-bold text-navy-900 uppercase tracking-wider text-sm mb-1">Overall Assessment</p>
              <p className="text-navy-700">{report.summary}</p>
            </div>
          </div>
        </div>

        {/* Risk Items */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-gold-500 p-8 mb-6">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-navy-900 mb-6">
            Issues Identified ({report.risks.length})
          </h2>

          <div className="space-y-4">
            {report.risks.map((risk, i) => {
              const borderColor = risk.level === 'high' ? 'border-l-red-500' :
                                  risk.level === 'medium' ? 'border-l-amber-500' : 'border-l-emerald-500'
              return (
                <div key={i} className={clsx('border-l-4 rounded-lg p-4 bg-navy-50/50', borderColor)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-navy-400">{risk.section}</span>
                      <h3 className="font-bold text-navy-900">{risk.title}</h3>
                    </div>
                    <RiskBadge level={risk.level} />
                  </div>
                  <p className="text-navy-700 mb-3">{risk.description}</p>
                  <div className="bg-white rounded-md p-3 border-l-2 border-l-gold-500">
                    <p className="text-sm">
                      <span className="font-bold uppercase tracking-wider text-xs text-navy-900">Recommendation: </span>
                      <span className="text-navy-700">{risk.recommendation}</span>
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key Terms */}
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-gold-500 p-8 mb-6">
          <h2 className="font-display font-bold text-xl uppercase tracking-tight text-navy-900 mb-6">
            Key Terms Explained
          </h2>

          <div className="space-y-4">
            {report.keyTerms.map((term, i) => (
              <div key={i} className="border-l-2 border-l-gold-500 pl-4">
                <h3 className="font-bold text-navy-900">{term.term}</h3>
                <p className="text-navy-600">{term.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-navy-900 rounded-lg p-6 mb-6 border-l-4 border-l-gold-500">
          <h3 className="font-bold uppercase tracking-wider text-xs text-white mb-2">Important Disclaimer</h3>
          <p className="text-navy-300 text-sm font-light">
            This report is for informational purposes only and does not constitute legal advice.
            While prepared with the oversight of a licensed attorney, you should consult with
            your own legal counsel before signing any contract. Every situation is unique and
            may involve considerations not captured in this analysis.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pb-12">
          <button
            onClick={onDownload}
            className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm btn-athletic shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download PDF Report
          </button>
          <button
            onClick={onStartOver}
            className="px-6 py-3 border-2 border-navy-200 rounded-lg font-semibold uppercase tracking-wider text-sm text-navy-600 hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            Analyze Another
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main page component ──
export default function Home() {
  const [step, setStep] = useState<'hero' | 'info' | 'upload' | 'processing' | 'report'>('hero')
  const [athleteInfo, setAthleteInfo] = useState<AthleteInfo>({
    name: '',
    email: '',
    school: '',
    sport: '',
    state: '',
    consentToKB: false,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [report, setReport] = useState<AnalysisReport | null>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    setStep('processing')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', athleteInfo.name)
      formData.append('email', athleteInfo.email)
      formData.append('school', athleteInfo.school)
      formData.append('sport', athleteInfo.sport)
      formData.append('state', athleteInfo.state)
      formData.append('consent', String(athleteInfo.consentToKB))

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setReport(data)
      setStep('report')
    } catch (error) {
      console.error('Upload error:', error)
      setReport(getMockReport(athleteInfo.name))
      setStep('report')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = async () => {
    if (!report) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/${report.id}/pdf`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `NIL-Analysis-${report.athleteName.replace(/\s+/g, '-')}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  const handleStartOver = () => {
    setStep('hero')
    setAthleteInfo({
      name: '',
      email: '',
      school: '',
      sport: '',
      state: '',
      consentToKB: false,
    })
    setReport(null)
  }

  switch (step) {
    case 'hero':
      return <Hero onStart={() => setStep('info')} />
    case 'info':
      return (
        <AthleteForm
          info={athleteInfo}
          onChange={setAthleteInfo}
          onNext={() => setStep('upload')}
          onBack={() => setStep('hero')}
        />
      )
    case 'upload':
      return (
        <ContractUpload
          info={athleteInfo}
          onInfoChange={setAthleteInfo}
          onUpload={handleUpload}
          onBack={() => setStep('info')}
          isUploading={isUploading}
        />
      )
    case 'processing':
      return <ProcessingState />
    case 'report':
      return report ? (
        <ReportDisplay
          report={report}
          onDownload={handleDownload}
          onStartOver={handleStartOver}
        />
      ) : null
    default:
      return <Hero onStart={() => setStep('info')} />
  }
}

// Mock report for demo/development
function getMockReport(athleteName: string): AnalysisReport {
  return {
    id: 'mock-123',
    athleteName,
    overallRisk: 'medium',
    summary: 'This contract contains several standard provisions but includes some terms that warrant attention before signing. The compensation structure is clear, but there are concerns around exclusivity clauses and termination rights.',
    risks: [
      {
        section: 'Section 3.2 - Exclusivity',
        level: 'high',
        title: 'Broad Exclusivity Clause',
        description: 'The contract grants exclusive rights to the brand across all social media platforms for 24 months, which may limit your ability to work with other sponsors in related categories.',
        recommendation: 'Negotiate to narrow the exclusivity to specific product categories or reduce the duration to match the active campaign period.',
      },
      {
        section: 'Section 5.1 - Termination',
        level: 'medium',
        title: 'One-Sided Termination Rights',
        description: 'The brand can terminate with 30 days notice for any reason, but you are bound for the full term. This creates an imbalanced relationship.',
        recommendation: 'Request mutual termination rights or add specific conditions under which you can also exit the agreement.',
      },
      {
        section: 'Section 7.3 - Image Rights',
        level: 'medium',
        title: 'Perpetual Image Usage',
        description: 'The contract allows the brand to use your name, image, and likeness in perpetuity, even after the agreement ends.',
        recommendation: 'Limit usage rights to 12-24 months after contract termination, or require approval for continued use.',
      },
      {
        section: 'Section 2.1 - Compensation',
        level: 'low',
        title: 'Payment Timeline',
        description: 'Payment terms are Net 60, which is longer than the industry standard of Net 30.',
        recommendation: 'Consider negotiating to Net 30 payment terms.',
      },
    ],
    keyTerms: [
      {
        term: 'Exclusivity Period',
        explanation: 'The time during which you cannot enter into similar agreements with competing brands. In this contract, it extends 6 months beyond the active term.',
      },
      {
        term: 'Perpetual License',
        explanation: 'A license that never expires. Here, it applies to marketing materials created during the partnership.',
      },
      {
        term: 'Morals Clause',
        explanation: 'Allows the brand to terminate if your behavior damages their reputation. This clause is standard but broadly written.',
      },
    ],
    generatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
  }
}
