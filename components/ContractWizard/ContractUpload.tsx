"use client"

import clsx from "clsx"
import { ArrowLeft, ArrowRight, FileText, Loader2, Upload } from "lucide-react"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import type { AthleteInfo } from "types/nil"
import { StepIndicator } from "./StepIndicator"

interface ContractUploadProps {
  info: AthleteInfo
  onInfoChange: (info: AthleteInfo) => void
  onUpload: (file: File) => void
  onBack: () => void
  isUploading: boolean
}

export function ContractUpload({ info, onInfoChange, onUpload, onBack, isUploading }: ContractUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const first = acceptedFiles[0]
    if (first) setFile(first)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  const handleSubmit = () => {
    if (file && info.consentToKB) onUpload(file)
  }

  const canSubmit = !!(file && info.consentToKB && !isUploading)

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <StepIndicator currentStep={2} totalSteps={3} />

          <div className="border border-line rounded-lg p-8 bg-surface">
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Upload your contract
            </h2>
            <p className="text-ink-muted text-sm mb-8">We accept PDF, DOC, and DOCX files.</p>

            <div
              {...getRootProps()}
              className={clsx(
                "border border-dashed rounded-lg p-8 text-center cursor-pointer transition duration-200 ease-in-out",
                isDragActive
                  ? "border-ink bg-subtle"
                  : "border-line hover:border-ink-faint hover:bg-subtle",
                isUploading && "opacity-50 cursor-not-allowed"
              )}
            >
              <input {...getInputProps()} />

              {file ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-subtle rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-ink-muted" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">{file.name}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null) }}
                    className="text-xs text-ink-muted hover:text-ink transition duration-200 ease-in-out"
                  >
                    Choose a different file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-subtle rounded-lg flex items-center justify-center">
                    <Upload className="w-6 h-6 text-ink-muted" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {isDragActive ? "Drop your contract here" : "Drag and drop your contract"}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      or <span className="text-[#FF6600]">browse files</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Consent */}
            <div className="mt-6 p-4 bg-subtle rounded-md border border-line">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={info.consentToKB}
                  onChange={(e) => onInfoChange({ ...info, consentToKB: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded border-line text-ink focus:ring-[#FF6600]"
                  aria-label="Consent to knowledge base"
                />
                <span className="text-xs text-ink-muted leading-relaxed">
                  I consent to having my contract (with personal details removed) added to the knowledge base to help
                  improve analysis for future athletes.
                  <span className="font-medium text-ink"> Required to use the service.</span>
                </span>
              </label>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={onBack}
                disabled={isUploading}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink hover:bg-subtle transition duration-200 ease-in-out disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={clsx(
                  "flex-1 inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition duration-200 ease-in-out",
                  canSubmit
                    ? "bg-[#FF6600] text-white hover:opacity-90"
                    : "bg-subtle text-ink-faint cursor-not-allowed"
                )}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    Analyze contract
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
