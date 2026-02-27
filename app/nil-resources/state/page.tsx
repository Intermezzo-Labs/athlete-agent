"use client"

import { StateMap } from "components/nil-resources/StateMap"
import { ChevronDown, ExternalLink } from "lucide-react"
import { useCallback, useRef, useState } from "react"

interface StateLaw {
  code: string
  name: string
  hasLaw: boolean
  effectiveDate: string
  legislation: string
  summary: string
  keyProvisions: string[]
  links: { label: string; url: string }[]
}

const STATE_LAWS: StateLaw[] = [
  {
    code: "AL", name: "Alabama", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 272",
    summary: "Alabama's NIL law permits student-athletes at four-year institutions to earn compensation for their name, image, and likeness. Colleges and universities may not prohibit athlete NIL activities, though the law defers scheduling and activity conflicts to institutional discretion.",
    keyProvisions: ["Athletes may earn NIL compensation without losing eligibility", "Institutions cannot revoke scholarships solely due to NIL earnings", "Athletes must disclose NIL agreements to their institution", "No compensation tied to athletic participation or performance"],
    links: [{ label: "SB 272 Text", url: "https://legiscan.com/AL/text/SB272/id/2376459" }],
  },
  {
    code: "AK", name: "Alaska", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Alaska has not enacted specific NIL legislation. Student-athletes in Alaska follow NCAA and/or NAIA policies, including the post-July 2021 interim NIL policy that permits compensation through third-party deals.",
    keyProvisions: ["Governed by NCAA/NAIA interim NIL policy", "No state-law restrictions on NIL activities", "School policies govern disclosure and conflict-of-interest rules"],
    links: [],
  },
  {
    code: "AZ", name: "Arizona", hasLaw: true,
    effectiveDate: "July 23, 2021", legislation: "SB 1296",
    summary: "Arizona enacted NIL legislation allowing college athletes to receive compensation for their name, image, and likeness. The law prohibits postsecondary institutions from preventing or restricting athlete NIL activities so long as the activities do not conflict with existing team or institutional agreements.",
    keyProvisions: ["Athletes may hire agents and professional advisors", "Institutions cannot prevent NIL activities that don't conflict with existing agreements", "Group licensing permitted", "Athletes retain NIL rights after enrollment"],
    links: [{ label: "SB 1296 Text", url: "https://legiscan.com/AZ/text/SB1296/id/2383256" }],
  },
  {
    code: "AR", name: "Arkansas", hasLaw: true,
    effectiveDate: "April 12, 2021", legislation: "HB 1770",
    summary: "Arkansas was among the earlier states to enact NIL legislation. The law allows Division I, II, and III athletes to earn compensation through NIL deals and prohibits institutions from revoking scholarships or reducing benefits based on NIL earnings.",
    keyProvisions: ["Covers Division I, II, and III athletes", "Scholarship protection upon NIL earnings", "Athletes may use agent representation for NIL deals", "School-approved deal disclosure required"],
    links: [{ label: "HB 1770 Text", url: "https://www.arkleg.state.ar.us/Bills/Detail?id=HB1770&ddBienniumSession=2021%2F2021R" }],
  },
  {
    code: "CA", name: "California", hasLaw: true,
    effectiveDate: "January 1, 2023", legislation: "SB 206 / AB 1207",
    summary: "California's Fair Pay to Play Act (SB 206) was the first NIL law signed in the country (September 2019), with an original effective date of January 1, 2023. A subsequent amendment (AB 1207, 2020) moved the effective date to January 1, 2023 but also allowed the NCAA to investigate and discipline schools. California athletes have strong protections under state law, including the right to retain agents.",
    keyProvisions: ["First NIL law signed in the nation (2019)", "Athletes may earn compensation starting Jan 1, 2023 per original law (NCAA rules supersede in practice)", "Institutions cannot discourage, prevent, or retaliate against NIL activities", "Right to hire and benefit from sports agents for NIL representation"],
    links: [
      { label: "SB 206 (Fair Pay to Play)", url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201920200SB206" },
      { label: "AB 1207 Amendment", url: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201920200AB1207" },
    ],
  },
  {
    code: "CO", name: "Colorado", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 21-1232",
    summary: "Colorado enacted comprehensive NIL legislation effective July 1, 2021. The law allows all college athletes to monetize their NIL and explicitly prohibits institutions from restricting those activities. Colorado also requires schools to provide athletes with financial literacy and life skills education.",
    keyProvisions: ["Covers all college athletes in Colorado", "Schools must provide financial literacy education", "Athletes may earn NIL compensation without losing eligibility", "Group licensing rights recognized"],
    links: [{ label: "HB 21-1232 Text", url: "https://leg.colorado.gov/bills/hb21-1232" }],
  },
  {
    code: "CT", name: "Connecticut", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "Public Act 21-2",
    summary: "Connecticut permits college athletes to earn compensation for their NIL. The law prohibits retaliation by institutions and requires athlete-friendly disclosure processes.",
    keyProvisions: ["NIL compensation permitted", "Anti-retaliation protections for athletes", "Disclosure to institution required within 72 hours of execution"],
    links: [],
  },
  {
    code: "DE", name: "Delaware", hasLaw: true,
    effectiveDate: "September 1, 2021", legislation: "HB 199",
    summary: "Delaware enacted NIL legislation in 2021. The law permits student-athletes to receive NIL compensation without losing eligibility and protects scholarship status.",
    keyProvisions: ["NIL compensation permitted without eligibility loss", "Scholarship cannot be reduced due to NIL earnings", "Prior disclosure to institution required before agreement execution"],
    links: [],
  },
  {
    code: "DC", name: "Washington D.C.", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Washington D.C. has not enacted specific NIL legislation. Athletes at D.C. institutions follow NCAA and institutional policies.",
    keyProvisions: ["Governed by NCAA/applicable association policies"],
    links: [],
  },
  {
    code: "FL", name: "Florida", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 7069 (SB 646)",
    summary: "Florida was the first state to have its NIL law become operative, signing HB 7069 in June 2020 and setting the July 1, 2021 effective date that ultimately pressured the NCAA to loosen its own rules nationwide. Florida's law is considered the catalyst for the national NIL movement.",
    keyProvisions: ["First operative state NIL law in the nation", "Athletes may hire licensed sports agents for NIL representation", "Institutions may not retaliate, penalize, or restrict NIL activities", "No compensation directly tied to athletic participation or enrollment", "Professional sports teams and agents may not compensate athletes for NIL"],
    links: [{ label: "HB 7069 Text", url: "https://www.flsenate.gov/Session/Bill/2020/7069" }],
  },
  {
    code: "GA", name: "Georgia", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 176",
    summary: "Georgia enacted SB 176 allowing college athletes to profit from their NIL. The law provides broad protections and permits athletes to engage agents and attorneys for NIL advice.",
    keyProvisions: ["Broad NIL compensation rights", "Agent representation permitted", "Scholarship protections included", "No institutional compensation for NIL (third-party only, prior to revenue sharing era)"],
    links: [{ label: "SB 176 Text", url: "https://www.legis.ga.gov/legislation/59886" }],
  },
  {
    code: "HI", name: "Hawaii", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Hawaii has not enacted specific NIL legislation. Institutions follow NCAA or NAIA policies. There have been deliberations in the legislature but no bill has been passed to date.",
    keyProvisions: ["NCAA/NAIA policy governs", "No state law restrictions on NIL activities"],
    links: [],
  },
  {
    code: "ID", name: "Idaho", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "S1307 / HB 285",
    summary: "Idaho enacted NIL legislation in 2021. The law permits student-athletes to earn NIL compensation and covers institutions within Idaho's public university system.",
    keyProvisions: ["NIL compensation permitted", "Scholarship cannot be revoked based on NIL earnings", "Disclosure to institution required"],
    links: [],
  },
  {
    code: "IL", name: "Illinois", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 2338",
    summary: "Illinois enacted comprehensive NIL protections. The law permits athletes at 2- and 4-year institutions to earn compensation and requires Illinois institutions to provide financial literacy resources.",
    keyProvisions: ["Covers 2-year and 4-year institutions", "Financial literacy requirement", "Group licensing rights", "Professional advisory services permitted"],
    links: [{ label: "SB 2338", url: "https://www.ilga.gov/legislation/BillStatus.asp?DocNum=2338&GAID=16&DocTypeID=SB&LegID=132696&SessionID=110&GA=102" }],
  },
  {
    code: "IN", name: "Indiana", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 1217",
    summary: "Indiana enacted NIL legislation allowing college athletes to benefit from their NIL rights. The law includes standard provisions prohibiting institutional interference and protecting scholarship status.",
    keyProvisions: ["NIL compensation rights", "Scholarship protections", "Third-party deal disclosure"],
    links: [],
  },
  {
    code: "IA", name: "Iowa", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SF 2389",
    summary: "Iowa enacted NIL legislation effective July 1, 2021, enabling student-athletes to profit from their name, image, and likeness. The law also addresses conflicts of interest with institutional sponsors.",
    keyProvisions: ["NIL compensation permitted", "Conflict-of-interest rules with school sponsors", "Scholarship protection"],
    links: [],
  },
  {
    code: "KS", name: "Kansas", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 2127",
    summary: "Kansas enacted NIL legislation as part of the wave of state laws in 2021. The law permits NIL activities for athletes at Kansas institutions and includes standard protections.",
    keyProvisions: ["NIL compensation rights", "Anti-retaliation protections", "Disclosure requirements"],
    links: [],
  },
  {
    code: "KY", name: "Kentucky", hasLaw: true,
    effectiveDate: "July 14, 2021", legislation: "SB 10",
    summary: "Kentucky enacted NIL legislation providing college athletes the right to monetize their name, image, and likeness through third-party deals. The law prevents institutions from restricting these activities.",
    keyProvisions: ["Broad NIL rights", "Anti-restriction provisions", "Scholarship status protected"],
    links: [],
  },
  {
    code: "LA", name: "Louisiana", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 717 / SB 150",
    summary: "Louisiana enacted NIL legislation in 2021 that is among the more detailed state laws. It includes robust conflict-of-interest provisions and requires institutions to report NIL agreements to the LHSAA and NCAA.",
    keyProvisions: ["Detailed conflict-of-interest rules", "Reporting requirements to governing bodies", "Agent/attorney representation permitted", "Scholarship protections"],
    links: [],
  },
  {
    code: "ME", name: "Maine", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Maine has not enacted specific NIL legislation. Athletes follow NCAA/NAIA policies. The state had limited Division I athletic programs and lower legislative urgency.",
    keyProvisions: ["NCAA/NAIA policy governs"],
    links: [],
  },
  {
    code: "MD", name: "Maryland", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 1350 / SB 867",
    summary: "Maryland enacted comprehensive NIL legislation in 2021. The law covers athletes at all Maryland colleges and universities and includes provisions for financial and legal advisory support.",
    keyProvisions: ["Covers all Maryland higher education institutions", "Advisory services access", "Scholarship protections", "Disclosure within 7 days of agreement execution"],
    links: [],
  },
  {
    code: "MA", name: "Massachusetts", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Massachusetts has not enacted specific NIL legislation. Athletes at Massachusetts institutions follow NCAA/applicable association policies. Several bills have been introduced but not passed.",
    keyProvisions: ["NCAA/NAIA policy governs"],
    links: [],
  },
  {
    code: "MI", name: "Michigan", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 257",
    summary: "Michigan enacted NIL legislation allowing all college athletes in the state to earn compensation from third-party NIL deals. The law includes standard protections and covers the University of Michigan, Michigan State, and all other institutions.",
    keyProvisions: ["Covers all Michigan institutions", "Third-party NIL deals permitted", "Scholarship protections", "Agent representation permitted"],
    links: [],
  },
  {
    code: "MN", name: "Minnesota", hasLaw: true,
    effectiveDate: "August 1, 2021", legislation: "SF 1",
    summary: "Minnesota enacted NIL legislation permitting college athletes to earn compensation. The law was passed in a special legislative session and includes provisions for institutional reporting.",
    keyProvisions: ["NIL compensation permitted", "Institutional reporting requirements", "Standard scholarship protection"],
    links: [],
  },
  {
    code: "MS", name: "Mississippi", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 2313",
    summary: "Mississippi enacted one of the early NIL laws in 2021. The law is broadly permissive, allowing athletes at all postsecondary institutions to earn NIL compensation without losing eligibility.",
    keyProvisions: ["Broadly permissive", "Covers all postsecondary institutions", "No institutional interference allowed", "Scholarship status protected"],
    links: [],
  },
  {
    code: "MO", name: "Missouri", hasLaw: true,
    effectiveDate: "August 28, 2021", legislation: "HB 297",
    summary: "Missouri enacted NIL legislation in 2021, providing college athletes with rights to earn compensation from their NIL. The law includes anti-retaliation protections and scholarship guarantees.",
    keyProvisions: ["NIL compensation rights", "Anti-retaliation", "Scholarship protection", "Agent representation"],
    links: [],
  },
  {
    code: "MT", name: "Montana", hasLaw: true,
    effectiveDate: "October 1, 2021", legislation: "HB 218",
    summary: "Montana enacted NIL legislation in 2021. The law applies to athletes at Montana's colleges and universities and provides standard NIL rights and protections.",
    keyProvisions: ["NIL compensation rights", "Scholarship protection", "Disclosure to institution required"],
    links: [],
  },
  {
    code: "NE", name: "Nebraska", hasLaw: true,
    effectiveDate: "August 28, 2021", legislation: "LB 258",
    summary: "Nebraska enacted NIL legislation effective August 2021. Nebraska was an early mover and its law covers athletes at all Nebraska higher education institutions. The law prohibits institutions from restricting NIL activities and provides scholarship protections.",
    keyProvisions: ["Early-adopter state", "All Nebraska institutions covered", "Anti-restriction provisions", "Scholarship protection"],
    links: [{ label: "LB 258", url: "https://nebraskalegislature.gov/bills/view_bill.php?DocumentID=44089" }],
  },
  {
    code: "NV", name: "Nevada", hasLaw: true,
    effectiveDate: "October 1, 2021", legislation: "SB 386",
    summary: "Nevada enacted NIL legislation in 2021 permitting college athletes to earn compensation. The law covers UNLV, Nevada, and other state institutions.",
    keyProvisions: ["NIL compensation permitted", "Covers all Nevada institutions", "Standard scholarship protection"],
    links: [],
  },
  {
    code: "NH", name: "New Hampshire", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "New Hampshire has not enacted specific NIL legislation. Athletes follow NCAA/applicable association and institutional policies.",
    keyProvisions: ["NCAA/association policy governs"],
    links: [],
  },
  {
    code: "NJ", name: "New Jersey", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "A4396",
    summary: "New Jersey enacted NIL legislation in 2021. The law provides rights for athletes at New Jersey colleges including Rutgers and Seton Hall to earn NIL compensation.",
    keyProvisions: ["NIL compensation rights", "Covers all NJ institutions", "Scholarship protection", "Disclosure within 72 hours"],
    links: [],
  },
  {
    code: "NM", name: "New Mexico", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 1",
    summary: "New Mexico was an early adopter, passing SB 1 in 2021. The law creates a favorable environment for college athletes to earn NIL compensation and includes both anti-restriction and anti-retaliation provisions.",
    keyProvisions: ["Early-adopter state", "Favorable NIL environment", "Anti-restriction and anti-retaliation", "Agent representation permitted"],
    links: [],
  },
  {
    code: "NY", name: "New York", hasLaw: true,
    effectiveDate: "January 1, 2023", legislation: "S5891 / A6709",
    summary: "New York enacted NIL legislation with a January 2023 effective date, slightly later than most states. The New York law is among the most athlete-friendly, providing broad rights and comprehensive advisory service access.",
    keyProvisions: ["Broad and athlete-friendly", "Financial and legal advisory access required", "Agent representation", "Scholarship protection", "Covers all NY institutions"],
    links: [],
  },
  {
    code: "NC", name: "North Carolina", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "S690 / SL 2021-99",
    summary: "North Carolina enacted comprehensive NIL legislation in 2021. The law allows athletes at all NC institutions to earn NIL compensation and provides strong anti-retaliation protections.",
    keyProvisions: ["Comprehensive protections", "Anti-retaliation provisions", "Scholarship status protected", "Covers UNC, NC State, Duke, and all NC institutions"],
    links: [],
  },
  {
    code: "ND", name: "North Dakota", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "North Dakota has not enacted specific NIL legislation. Athletes follow NCAA/applicable association policies.",
    keyProvisions: ["NCAA/association policy governs"],
    links: [],
  },
  {
    code: "OH", name: "Ohio", hasLaw: true,
    effectiveDate: "July 1, 2022", legislation: "HB 29 (2022)",
    summary: "Ohio enacted NIL legislation with a July 2022 effective date. The law is comprehensive, covering all Ohio colleges and universities including Ohio State, Cincinnati, and others. Ohio's law requires prior disclosure to the institution and prohibits agreements that conflict with existing school contracts.",
    keyProvisions: ["Prior disclosure requirement", "No conflict with existing institutional contracts", "Scholarship protection", "Agent and attorney representation rights"],
    links: [{ label: "HB 29", url: "https://www.legislature.ohio.gov/legislation/134-GA/HB29" }],
  },
  {
    code: "OK", name: "Oklahoma", hasLaw: true,
    effectiveDate: "November 1, 2021", legislation: "SB 1001 (Special Session)",
    summary: "Oklahoma passed NIL legislation in a special legislative session in 2021. The law provides college athletes with rights to earn compensation for their NIL and prohibits institutions from restricting these activities.",
    keyProvisions: ["Special session legislation", "NIL rights for all athletes", "Anti-restriction protections", "Scholarship guarantees"],
    links: [],
  },
  {
    code: "OR", name: "Oregon", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 5702",
    summary: "Oregon enacted NIL legislation in 2021. The law covers athletes at Oregon universities including Oregon, Oregon State, and others, allowing them to earn NIL compensation without restriction.",
    keyProvisions: ["NIL compensation rights", "Anti-restriction provisions", "Covers all Oregon institutions", "Scholarship protection"],
    links: [],
  },
  {
    code: "PA", name: "Pennsylvania", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 381",
    summary: "Pennsylvania enacted NIL legislation in 2021, covering athletes at all Pennsylvania colleges including Penn State, Pitt, Temple, and others. The law includes financial literacy requirements.",
    keyProvisions: ["Financial literacy education requirement", "Covers all PA institutions", "Standard NIL rights and scholarship protection", "Disclosure required"],
    links: [],
  },
  {
    code: "RI", name: "Rhode Island", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Rhode Island has not enacted specific NIL legislation. Athletes follow NCAA/applicable association policies.",
    keyProvisions: ["NCAA/association policy governs"],
    links: [],
  },
  {
    code: "SC", name: "South Carolina", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "H4094 / A289",
    summary: "South Carolina enacted NIL legislation in 2021. The law covers athletes at Clemson, South Carolina, and other institutions, providing standard NIL rights and scholarship protections.",
    keyProvisions: ["NIL compensation rights", "Scholarship protection", "Anti-restriction provisions"],
    links: [],
  },
  {
    code: "SD", name: "South Dakota", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "South Dakota has not enacted specific NIL legislation. Athletes follow NCAA/NAIA and institutional policies.",
    keyProvisions: ["NCAA/NAIA policy governs"],
    links: [],
  },
  {
    code: "TN", name: "Tennessee", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 2338 / HB 1800",
    summary: "Tennessee enacted NIL legislation in 2021. The law provides broad NIL rights for athletes at all Tennessee institutions including Tennessee, Vanderbilt, Memphis, and others.",
    keyProvisions: ["Broad NIL rights", "All Tennessee institutions covered", "Agent representation permitted", "Scholarship protection"],
    links: [],
  },
  {
    code: "TX", name: "Texas", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "SB 1385",
    summary: "Texas enacted one of the most significant state NIL laws given the size and influence of Texas athletics. SB 1385 covers athletes at all Texas colleges and universities and prohibits institutional interference with NIL activities.",
    keyProvisions: ["Covers all Texas institutions (UT, Texas A&M, Texas Tech, Baylor, etc.)", "Anti-institutional interference", "Agent and attorney representation rights", "Scholarship protections", "Group licensing rights"],
    links: [{ label: "SB 1385", url: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=87R&Bill=SB1385" }],
  },
  {
    code: "UT", name: "Utah", hasLaw: true,
    effectiveDate: "July 1, 2021", legislation: "HB 55",
    summary: "Utah enacted NIL legislation in 2021, providing athletes at BYU, Utah, Utah State, and other institutions with rights to earn NIL compensation.",
    keyProvisions: ["NIL compensation rights", "Anti-restriction protections", "Scholarship protection", "Disclosure required"],
    links: [],
  },
  {
    code: "VT", name: "Vermont", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Vermont has not enacted specific NIL legislation. Athletes follow NCAA and institutional policies.",
    keyProvisions: ["NCAA policy governs"],
    links: [],
  },
  {
    code: "VA", name: "Virginia", hasLaw: true,
    effectiveDate: "July 1, 2022", legislation: "HB 1207 (2022)",
    summary: "Virginia enacted NIL legislation effective July 2022. The law covers athletes at Virginia, Virginia Tech, George Mason, and all other Virginia institutions. Virginia's law includes robust financial advisory access requirements.",
    keyProvisions: ["Financial advisory access requirement", "Covers all VA institutions", "July 2022 effective date", "Standard NIL rights and scholarship protections"],
    links: [],
  },
  {
    code: "WA", name: "Washington", hasLaw: true,
    effectiveDate: "July 25, 2021", legislation: "SB 5528",
    summary: "Washington enacted NIL legislation in 2021. The law covers athletes at Washington, Washington State, and other institutions. It includes detailed conflict-of-interest provisions relating to school sponsor agreements.",
    keyProvisions: ["Covers UW, WSU, and all WA institutions", "Sponsor conflict-of-interest rules", "Three-day advance disclosure to institution", "Scholarship protection"],
    links: [],
  },
  {
    code: "WV", name: "West Virginia", hasLaw: true,
    effectiveDate: "July 9, 2021", legislation: "HB 2011",
    summary: "West Virginia enacted NIL legislation in 2021, covering athletes at WVU and other state institutions. The law provides standard NIL rights and scholarship protections.",
    keyProvisions: ["NIL compensation rights", "WVU and all WV institutions covered", "Scholarship protection", "Disclosure required"],
    links: [],
  },
  {
    code: "WI", name: "Wisconsin", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Wisconsin has not enacted specific NIL legislation. Athletes at Wisconsin and Marquette follow NCAA/applicable policies. Bills have been introduced but not passed.",
    keyProvisions: ["NCAA policy governs"],
    links: [],
  },
  {
    code: "WY", name: "Wyoming", hasLaw: false,
    effectiveDate: "N/A", legislation: "No Specific Legislation",
    summary: "Wyoming has not enacted specific NIL legislation. Athletes follow NCAA and institutional policies.",
    keyProvisions: ["NCAA policy governs"],
    links: [],
  },
]

export default function StatePage() {
  const [activeState, setActiveState] = useState<string | null>(null)
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const handleSelectState = useCallback((code: string) => {
    setActiveState(code)
    setExpandedStates((prev) => {
      const next = new Set(prev)
      next.add(code)
      return next
    })
    // Scroll to section
    requestAnimationFrame(() => {
      sectionRefs.current[code]?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  const toggleExpand = (code: string) => {
    setExpandedStates((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  const statesForMap = STATE_LAWS.map((s) => ({
    code: s.code,
    name: s.name,
    hasLaw: s.hasLaw,
  }))

  const statesWithLaw = STATE_LAWS.filter((s) => s.hasLaw)
  const statesWithoutLaw = STATE_LAWS.filter((s) => !s.hasLaw)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-16">

      {/* Map section */}
      <div className="mb-14">
        <h2 className="text-2xl font-black text-[#102243] mb-2">
          State NIL Laws
        </h2>
        <p className="text-sm text-neutral-500 mb-8 max-w-2xl">
          Click any state to jump to its NIL law summary. Darker states have enacted specific legislation.
          Lighter states follow NCAA or applicable association policies.
        </p>
        <StateMap
          states={statesForMap}
          activeState={activeState}
          onSelectState={handleSelectState}
        />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-14">
        {[
          { value: statesWithLaw.length.toString(), label: "States With NIL Laws" },
          { value: statesWithoutLaw.length.toString(), label: "No Specific Legislation" },
          { value: "2021", label: "Year NIL Era Began" },
        ].map(({ value, label }) => (
          <div key={label} className="border border-neutral-200 rounded-lg p-5">
            <p className="text-2xl sm:text-3xl font-black text-[#102243]">{value}</p>
            <p className="text-xs uppercase tracking-[0.14em] text-neutral-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* States with laws */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6 pb-3 border-b border-neutral-100">
          States With NIL Legislation ({statesWithLaw.length})
        </h3>
        <div className="space-y-2">
          {STATE_LAWS.sort((a, b) => a.name.localeCompare(b.name)).map((state) => {
            const isExpanded = expandedStates.has(state.code)
            const isActive = activeState === state.code
            return (
              <div
                key={state.code}
                ref={(el) => { sectionRefs.current[state.code] = el }}
                className={[
                  "border rounded-lg overflow-hidden scroll-mt-36 transition-colors duration-150",
                  isActive ? "border-[#102243]" : "border-neutral-200",
                ].join(" ")}
              >
                <button
                  onClick={() => {
                    setActiveState(state.code)
                    toggleExpand(state.code)
                  }}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#102243]"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex-none w-10 h-10 rounded-md flex items-center justify-center text-[11px] font-black uppercase text-white"
                      style={{ backgroundColor: state.hasLaw ? "#102243" : "#d1d5db" }}
                      aria-hidden="true"
                    >
                      {state.code}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{state.name}</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {state.hasLaw
                          ? `${state.legislation} · Effective ${state.effectiveDate}`
                          : "No specific state legislation"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-none ml-4">
                    <span
                      className={[
                        "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full",
                        state.hasLaw
                          ? "bg-[#102243]/10 text-[#102243]"
                          : "bg-neutral-100 text-neutral-400",
                      ].join(" ")}
                    >
                      {state.hasLaw ? "Law Enacted" : "NCAA Policy"}
                    </span>
                    <ChevronDown
                      className={[
                        "w-4 h-4 text-neutral-400 transition-transform duration-200",
                        isExpanded ? "rotate-180" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-6 border-t border-neutral-100 bg-neutral-50">
                    <p className="text-sm text-neutral-600 leading-relaxed mt-5 mb-5">
                      {state.summary}
                    </p>

                    {state.keyProvisions.length > 0 && (
                      <div className="mb-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-3">
                          Key Provisions
                        </p>
                        <ul className="space-y-1.5">
                          {state.keyProvisions.map((p, i) => (
                            <li key={i} className="flex gap-2 text-sm text-neutral-700">
                              <span className="flex-none text-[#102243] font-bold mt-0.5">—</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {state.links.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {state.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#102243] hover:underline"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
