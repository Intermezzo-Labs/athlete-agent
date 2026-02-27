import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "High School NIL | NIL Resources | Athlete Agent Labs",
  description:
    "High school NIL rules by state — state athletic association policies, what activities are permitted, recruiting implications, and what parents need to know.",
}

interface StatePolicyItem {
  state: string
  policy: string
  status: "permitted" | "restricted" | "prohibited" | "pending"
  notes: string
  source?: string
}

const STATE_POLICIES: StatePolicyItem[] = [
  { state: "Alabama", policy: "AHSAA", status: "permitted", notes: "AHSAA allows NIL with prior approval. Students must not use school marks, uniforms, or facilities. No agent representation during evaluation period.", },
  { state: "California", policy: "CIF", status: "permitted", notes: "CIF updated its bylaws in 2021 to align with state NIL law. High school athletes may earn NIL compensation. Deals may not use school name, logo, or mascot without written permission.", },
  { state: "Colorado", policy: "CHSAA", status: "permitted", notes: "CHSAA permits NIL activities consistent with the state's college NIL law. Schools may not restrict NIL activities outside of conflict-of-interest provisions.", },
  { state: "Florida", policy: "FHSAA", status: "permitted", notes: "Florida high school athletes may engage in NIL. The FHSAA adopted policies aligning with state law. Athletes must disclose deals to their principal. No use of school identity without school consent.", source: "https://www.fhsaa.org/", },
  { state: "Georgia", policy: "GHSA", status: "permitted", notes: "The GHSA permits NIL compensation for high school athletes. Athletes may not be compensated for in-game performance. School marks/facilities may not be used without approval.", },
  { state: "Illinois", policy: "IHSA", status: "permitted", notes: "IHSA policy permits NIL for high school athletes effective 2022-23. Deals may not use IHSA or school branding. Prior disclosure to the principal is required.", },
  { state: "Indiana", policy: "IHSAA", status: "restricted", notes: "Indiana's IHSAA has strict eligibility rules. While not fully prohibiting NIL, the IHSAA has significant restrictions on advertising, endorsements, and use of social media for compensation during the season.", },
  { state: "Louisiana", policy: "LHSAA", status: "permitted", notes: "Louisiana permits high school NIL subject to LHSAA bylaws. Athletes must receive prior written approval. No use of LHSAA or school marks in endorsements.", },
  { state: "Maryland", policy: "MPSSAA", status: "permitted", notes: "Maryland high school athletes may earn NIL compensation. MPSSAA aligned its rules with state law. Disclosure and conflict-of-interest reviews apply.", },
  { state: "Michigan", policy: "MHSAA", status: "restricted", notes: "Michigan's MHSAA has historically been more restrictive. While the organization has updated policies, athletes must be cautious about commercial endorsements during the school year. Consult your athletic director.", },
  { state: "Ohio", policy: "OHSAA", status: "permitted", notes: "Ohio high school athletes may engage in NIL activities per OHSAA's updated policy. Athletes may not reference their school affiliation or use school marks without written permission.", },
  { state: "Texas", policy: "UIL", status: "permitted", notes: "Texas UIL updated its policies to allow NIL for high school athletes. UIL requires prior approval from the principal for deals involving the school's name or marks. Athletes may not use UIL trademarks without authorization.", source: "https://www.uiltexas.org/", },
  { state: "Washington", policy: "WIAA", status: "permitted", notes: "Washington high school athletes may earn NIL compensation per WIAA policy updates. Prior disclosure to the school is required. No use of school identity without written consent.", },
]

const SECTIONS = [
  {
    id: "overview",
    title: "High School NIL: An Overview",
    body: `Unlike college athletics, where a single federal settlement and state laws create a (largely) unified framework, high school NIL is governed by individual state athletic associations (SAAAs) — organizations like the FHSAA (Florida), UIL (Texas), CIF (California), and GHSA (Georgia). Each association sets its own eligibility rules.

As of 2025, many state athletic associations have updated their bylaws to permit high school athletes to earn NIL compensation, but the policies vary dramatically. Some states are broadly permissive; others maintain strict restrictions on endorsements and advertising during the academic year.`,
  },
  {
    id: "common-rules",
    title: "Common High School NIL Rules",
    body: `While rules vary by state, several provisions appear consistently across most state athletic association NIL policies:

• No use of school marks, logos, uniforms, or facilities without written institutional consent
• No compensation directly tied to athletic performance or enrollment at a school
• Athletes may not suggest or imply school endorsement of a brand
• Disclosure to the principal, athletic director, or association is typically required
• During recruiting evaluation periods, agent representation and NIL activity may be restricted
• Athletes must independently negotiate and sign NIL contracts — parents or guardians co-sign for minors
• No NIL deal may compromise or create conflicts with existing school or conference sponsor agreements`,
  },
  {
    id: "what-allowed",
    title: "What High School Athletes Can Typically Do",
    body: `Subject to your state's specific association rules, high school athletes can commonly:

• Post paid content on social media (Instagram, TikTok, YouTube) for brands or products
• Earn compensation for personal appearances, autograph signings, and meet-and-greets
• Run paid camps and clinics using their own name (not school name or marks)
• License their name and likeness to local businesses for advertising
• Partner with sports equipment brands, apparel companies, or regional businesses
• Sell merchandise featuring their own name (not school logos)
• Work with agents and attorneys for advice and deal negotiation

These activities must be performed using the athlete's own identity — not through their team affiliation.`,
  },
  {
    id: "recruiting",
    title: "Recruiting & NIL: Critical Rules",
    body: `The intersection of high school NIL and recruiting is among the most legally sensitive areas. Key principles:

• Colleges and boosters may NOT offer NIL as an inducement to sign with a specific school
• High school athletes who receive NIL offers contingent on their college enrollment decision may be deemed ineligible under both the school's rules and applicable NCAA rules once they enroll
• Athletes should carefully document when and how NIL conversations began during the recruiting process
• Agents engaged for NIL representation of a recruit must comply with state Athletic Agents Act registration requirements
• Several states are actively investigating booster and collective use of NIL as an illegal inducement in the high school recruiting context`,
  },
  {
    id: "minors",
    title: "Legal Considerations for Minors",
    body: `Most high school athletes are minors (under 18). This creates unique legal considerations:

• Contracts: In most states, minors cannot enter legally binding contracts without parental or guardian co-signature. NIL agreements signed by a minor alone may be voidable.
• Parents and contracts: A parent or guardian typically must review and co-sign any NIL agreement. Some states have specific minor entertainment contract protections (California's Coogan Law) that require parental approval and court supervision for significant earnings.
• Taxes: NIL income earned by a minor is still taxable. Parents may need to file a separate return for the minor's earned income.
• Financial accounts: Many brands pay via direct deposit or wire transfer. Minors may need a custodial or joint bank account with a parent to receive funds.
• Protecting future opportunities: Signing exclusivity agreements while in high school can limit future earning potential in college and professionally. Always have an attorney review before signing exclusive deals.`,
  },
  {
    id: "tips",
    title: "Practical Tips for High School Athletes",
    body: `If you are a high school athlete exploring NIL:

1. Know your state's rules — check your state's athletic association website for their current NIL policy
2. Always disclose to your athletic director before signing any deal
3. Never use your school's logo, name, or uniform in any brand content without written permission
4. Have a parent review and co-sign any agreement
5. Hire an attorney for any deal over $500 — the cost is worth avoiding eligibility mistakes
6. Keep records of all NIL income and report it as taxable income
7. Be careful during the NCAA recruiting process — NIL conversations with boosters affiliated with specific schools carry significant risk
8. Understand that most NIL platforms charging fees or claiming exclusive representation are not necessary — you can navigate deals independently or with an attorney`,
  },
]

const QUICK_LINKS = [
  { label: "NFHS NIL Resources", url: "https://www.nfhs.org/" },
  { label: "FHSAA NIL Policy", url: "https://www.fhsaa.org/" },
  { label: "UIL (Texas) Policy", url: "https://www.uiltexas.org/" },
  { label: "CIF (California)", url: "https://www.cifstate.org/" },
]

export default function HighSchoolPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Sidebar TOC — hidden on mobile */}
        <aside className="hidden lg:block lg:w-56 flex-none">
          <div className="lg:sticky lg:top-[120px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">On This Page</p>
            <nav className="flex flex-col gap-1" aria-label="Section links">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}
                  className="text-sm text-neutral-500 hover:text-[#102243] transition-colors duration-150 py-1 border-l-2 border-transparent hover:border-[#102243] pl-3 -ml-px">
                  {s.title.split(":")[0]}
                </a>
              ))}
              <a href="#state-table"
                className="text-sm text-neutral-500 hover:text-[#102243] transition-colors duration-150 py-1 border-l-2 border-transparent hover:border-[#102243] pl-3 -ml-px">
                State Policies
              </a>
            </nav>
            <div className="mt-10 pt-8 border-t border-neutral-100">
              <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-3">Quick Links</p>
              <div className="flex flex-col gap-2">
                {QUICK_LINKS.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#102243] hover:underline">{l.label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="flex-1 min-w-0">

          {/* Alert banner */}
          <div className="border-l-4 border-[#102243] bg-neutral-50 rounded-r-lg p-5 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#102243] mb-1">Important</p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              High school NIL rules are set by each state's athletic association, not the NCAA. Always check your specific state association's current policy before entering any NIL agreement.
            </p>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
            {[
              { value: STATE_POLICIES.filter(s => s.status === "permitted").length.toString(), label: "States Permitting HS NIL" },
              { value: STATE_POLICIES.filter(s => s.status === "restricted").length.toString(), label: "States With Restrictions" },
              { value: "50+", label: "Governing Associations" },
            ].map(({ value, label }) => (
              <div key={label} className="border border-neutral-200 rounded-lg p-5">
                <p className="text-2xl sm:text-3xl font-black text-[#102243]">{value}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-400 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Main sections */}
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#102243] mb-4 pb-3 border-b border-neutral-100">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.split("\n\n").map((para, i) => {
                    if (para.includes("\n•") || para.match(/^\d\./)) {
                      const lines = para.split("\n").filter(Boolean)
                      return (
                        <ul key={i} className="space-y-2 mt-3">
                          {lines.map((line, j) => (
                            <li key={j} className="flex gap-2 text-sm text-neutral-700">
                              {line.startsWith("•") ? (
                                <><span className="flex-none text-[#102243] font-bold mt-0.5">—</span><span>{line.replace(/^•\s*/, "")}</span></>
                              ) : (
                                <span>{line}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )
                    }
                    return <p key={i} className="text-sm text-neutral-700 leading-relaxed">{para}</p>
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* State association table */}
          <section id="state-table" className="mt-14 scroll-mt-32">
            <h2 className="text-xl md:text-2xl font-black text-[#102243] mb-4 pb-3 border-b border-neutral-100">
              State Athletic Association Policies
            </h2>
            <p className="text-sm text-neutral-500 mb-8">A sample of state association positions. Policies change frequently — always verify with your association.</p>
            <div className="space-y-2">
              {STATE_POLICIES.map((item) => (
                <div key={item.state} className="border border-neutral-200 rounded-lg p-5 flex items-start gap-4">
                  <div
                    className={[
                      "flex-none w-2 h-2 rounded-full mt-2",
                      item.status === "permitted" ? "bg-[#102243]" :
                        item.status === "restricted" ? "bg-yellow-500" :
                          item.status === "prohibited" ? "bg-red-500" : "bg-neutral-300",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <p className="text-sm font-bold text-neutral-900">{item.state}</p>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">{item.policy}</span>
                      <span className={[
                        "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        item.status === "permitted" ? "bg-[#102243]/10 text-[#102243]" :
                          item.status === "restricted" ? "bg-yellow-50 text-yellow-700" :
                            "bg-neutral-100 text-neutral-500",
                      ].join(" ")}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.notes}</p>
                    {item.source && (
                      <a href={item.source} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#102243] hover:underline mt-2">
                        Official Policy ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-16 border border-neutral-200 rounded-lg p-8">
            <h3 className="text-lg font-black text-[#102243] mb-2">Reviewing an NIL Agreement?</h3>
            <p className="text-sm text-neutral-600 mb-5">
              Our analyzer reviews NIL contracts for common risks and eligibility concerns — free during beta.
            </p>
            <Link href="/"
              className="inline-flex items-center gap-2 bg-[#102243] text-white px-6 py-3 text-xs font-black uppercase tracking-[0.15em] rounded-sm hover:bg-[#1a3560] transition duration-200">
              Analyze My Contract
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
