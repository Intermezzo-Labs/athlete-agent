"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

// US states TopoJSON from US Atlas (public domain Census Bureau data)
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

// FIPS code → state abbreviation
const FIPS: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
}

export interface StateInfo {
  code: string
  name: string
  hasLaw: boolean
}

interface Props {
  states: StateInfo[]
  activeState: string | null
  onSelectState: (code: string) => void
}

export function StateMap({ states, activeState, onSelectState }: Props) {
  const [tooltip, setTooltip] = useState<{ name: string; hasLaw: boolean } | null>(null)

  const stateMap: Record<string, StateInfo> = {}
  for (const s of states) stateMap[s.code] = s

  return (
    <div className="w-full">
      {/* Hover tooltip bar */}
      <div className="h-7 flex items-center mb-2">
        {tooltip ? (
          <p className="text-sm font-semibold text-[#102243]">
            {tooltip.name}
            <span className="ml-2 text-xs font-normal text-neutral-500">
              {tooltip.hasLaw ? "Has NIL Legislation" : "NCAA / Association Policy Only"}
            </span>
          </p>
        ) : (
          <p className="text-xs text-neutral-400">
            Hover to preview · click to jump to its law summary
          </p>
        )}
      </div>

      {/* Geographic SVG map */}
      <div className="w-full rounded-lg overflow-hidden border border-neutral-100 bg-[#f0f2f6]">
        <ComposableMap
          projection="geoAlbersUsa"
          width={960}
          height={600}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const fips = String(geo.id ?? "").padStart(2, "0")
                const code = FIPS[fips]
                if (!code) return null

                const info = stateMap[code]
                const hasLaw = info?.hasLaw ?? false
                const isActive = activeState === code

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onSelectState(code)}
                    onMouseEnter={() =>
                      setTooltip({ name: info?.name ?? code, hasLaw })
                    }
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: isActive ? "#102243" : hasLaw ? "#1e3f6e" : "#c8d0e0",
                        stroke: "#ffffff",
                        strokeWidth: isActive ? 1.5 : 0.6,
                        outline: "none",
                        cursor: "pointer",
                        transition: "fill 120ms ease-in-out",
                      },
                      hover: {
                        fill: isActive ? "#0d1c35" : hasLaw ? "#102243" : "#a8b4c8",
                        stroke: "#ffffff",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#0d1c35",
                        stroke: "#ffffff",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3 pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#1e3f6e" }} aria-hidden="true" />
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider">Has NIL Law</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#c8d0e0" }} aria-hidden="true" />
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider">NCAA / School Policy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#102243" }} aria-hidden="true" />
          <span className="text-[11px] text-neutral-500 uppercase tracking-wider">Selected</span>
        </div>
      </div>
    </div>
  )
}
