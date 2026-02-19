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
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-dark-speed">
      <div className="w-full max-w-md">
        <StepIndicator currentStep={2} totalSteps={3} />

        <div className="bg-white rounded-lg shadow-2xl shadow-navy-950/50 border-t-4 border-t-gold-500 p-8">
          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-navy-900 mb-2">
            Upload your contract
          </h2>
          <p className="text-navy-500 font-light mb-6">We accept PDF, DOC, and DOCX files.</p>

          <div
            {...getRootProps()}
            className={clsx(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
              isDragActive
                ? "border-gold-500 bg-gold-500/5 shadow-inner"
                : "border-navy-300 hover:border-gold-500/50 hover:bg-navy-50",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} />

            {/* ── Best practice: rendering-conditional-render ── */}
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-7 h-7 text-gold-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900">{file.name}</p>
                  <p className="text-sm text-navy-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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
                    {isDragActive ? "Drop your contract here" : "Drag & drop your contract"}
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
                I consent to having my contract (with personal details removed) added to the knowledge base to help
                improve analysis for future athletes.
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
              disabled={!canSubmit}
              className={clsx(
                "flex-1 px-6 py-3 rounded-md font-bold uppercase tracking-wider text-sm transition-all",
                canSubmit
                  ? "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 btn-athletic shadow-lg shadow-gold-500/25"
                  : "bg-navy-100 text-navy-400 cursor-not-allowed"
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
