import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "House Settlement | NIL Resources | Athlete Agent Labs",
  description:
    "Key facts about the House v. NCAA settlement — revenue sharing, backpay, Title IX obligations, and what it means for student-athletes.",
}

const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    title: "What Is the House Settlement?",
    body: `House v. NCAA is a federal antitrust class action lawsuit originally filed in 2020 by former Arizona State swimmer Grant House and three other student-athletes. The case challenged the NCAA's restrictions on athlete compensation, arguing that the system violated antitrust law by artificially capping what schools could pay athletes for their NIL rights and for participating in national broadcasts.\n\nOn May 23, 2024, the parties announced a landmark settlement agreement worth approximately $2.8 billion to be paid out over ten years. U.S. District Judge Claudia Wilken granted final approval of the settlement on July 7, 2025. The settlement fundamentally changes the economic model of college athletics.`,
  },
  {
    id: "backpay",
    label: "Back Pay",
    title: "Back Pay for Former Athletes",
    body: `The settlement includes approximately $2.8 billion in damages for past NIL losses. Former student-athletes who competed between 2016 and 2024 may be eligible for compensation based on the sport they played, the division level, and how their NIL was used in broadcasts and other media.\n\nEligible claimants include:\n• Division I football and men's basketball players (highest awards)\n• Division I women's basketball players\n• All other Division I athletes in revenue and non-revenue sports\n• Division II and Division III athletes in some limited broadcast categories\n\nClaimants were required to submit a claim by the court-ordered deadline. Payout amounts vary based on sport type, years of eligibility used, and media usage data compiled by experts.`,
  },
  {
    id: "revenue-sharing",
    label: "Revenue Sharing",
    title: "Direct Revenue Sharing with Athletes",
    body: `Starting with the 2025–26 academic year, Division I schools may share up to approximately $20–22 million per year directly with their student-athletes. This represents the most dramatic structural change in college athletics: for the first time, schools can pay athletes from their own athletic revenues — not just third-party NIL deals.\n\nKey revenue sharing details:\n• The per-school annual cap begins near $20.5M and increases by approximately 4% per year\n• The cap is recalculated every three years based on average Division I athletic revenue\n• Distributions are contractual arrangements between the school and athlete — not employment agreements\n• Schools decide how to divide the pool across sports and athletes (football/basketball will likely receive the largest shares)\n• Schools are NOT required to share revenue — it is permissive, not mandatory`,
  },
  {
    id: "athlete-rights",
    label: "Athlete Rights",
    title: "Required Benefits & Protections",
    body: `Schools with annual athletic revenue over $20 million are required to provide a floor of benefits to student-athletes, including:\n\n• Mental health services and counseling programs\n• Access to legal counsel and tax advisory services\n• Career readiness and financial literacy counseling\n• Degree completion assistance after eligibility ends\n• Post-eligibility medical benefits for injuries sustained during participation\n• Prohibition on scholarship revocation based on athletic performance, illness, injury, or mental or physical condition`,
  },
  {
    id: "title-ix",
    label: "Title IX",
    title: "Title IX Implications",
    body: `The settlement does not preempt or alter the requirements of Title IX of the Education Amendments of 1972, which prohibits sex discrimination in federally funded education programs. Schools must ensure that revenue sharing distributions do not create or exacerbate unlawful gender inequities.\n\nThe U.S. Department of Education and plaintiffs' counsel have indicated that schools should track distributions by gender to ensure compliance. Schools distributing significantly more to men's sports than women's sports may face scrutiny. The settlement creates pressure on schools to expand revenue sharing to women's programs.`,
  },
  {
    id: "roster-limits",
    label: "Roster Limits",
    title: "New Roster Limits",
    body: `As part of the settlement, the NCAA and conferences agreed to replace scholarship limits with hard roster limits for each sport. This change, which took effect for many sports beginning in the 2025–26 academic year, has significant recruiting implications.\n\nSelected new roster limits:\n• FBS Football: 105 players (up from 85 scholarship max)\n• Men's Basketball: 15 players\n• Women's Basketball: 15 players\n• Baseball: 34 players\n• Softball: 25 players\n\nAthletes already on scholarship retain their aid regardless of roster changes. Walk-ons may now receive scholarship money if schools choose.`,
  },
  {
    id: "eligibility",
    label: "Eligibility",
    title: "Student-Athlete Status",
    body: `Critically, the settlement does not reclassify student-athletes as employees. The agreement explicitly provides that no individual may be considered an employee of a school, conference, or the NCAA based solely on participation in intercollegiate athletics.\n\nHowever, the settlement does not preclude states or the National Labor Relations Board from separately pursuing employment classification. Several states and the NLRA have ongoing proceedings that could still result in employee status for some athletes at unionized schools.`,
  },
  {
    id: "score-act",
    label: "SCORE Act",
    title: "Proposed Federal Legislation: The SCORE Act",
    body: `In September 2025, members of Congress introduced the Student Compensation & Opportunity Through Rights & Endorsement (SCORE) Act, which aims to codify the House Settlement as federal law and add additional protections.\n\nKey provisions of the SCORE Act:\n• $2.8 billion in backpay for former student-athletes (mirrors settlement)\n• 22% of annual athletic revenue sharing for current athletes\n• 4% annual increase in the revenue cap, recalculated every three years\n• Non-employee status: athletes are explicitly not employees under the act\n• Cap on agent fees at 5% of total NIL earnings\n• Agents may be terminated up to six months into an athlete's enrollment\n• Preemption of 30+ differing state NIL laws with one uniform federal standard\n• Preservation requirement: schools over $20M in revenue must maintain at least 16 varsity sports\n• Broad protections for non-revenue and Olympic sports\n• Title IX compliance: the SCORE Act does not reduce obligations under Title IX\n\nSource: McGuireWoods, "The Goals of the SCORE Act," September 2025.`,
  },
  {
    id: "agents",
    label: "Agents & Advisors",
    title: "Agent Fees & Representation",
    body: `The existing settlement and proposed SCORE Act both contemplate new rules for sports agents and NIL advisors working with college athletes:\n\n• Agent fees are proposed to be capped at 5% of total NIL compensation\n• Athletes may terminate agent agreements within six months of initial enrollment\n• Schools with revenue above $20M are required to provide athletes with access to legal and tax advisory services at no charge\n• Licensed sports agents must comply with state athlete agent registration laws, which vary significantly by state\n\nFor athletes evaluating representation, the House settlement era increases the value of having a licensed advocate. Deals are larger, more complex, and have longer-term tax and eligibility consequences.`,
  },
]

export default function HouseSettlementPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* ── Sticky sidebar TOC — hidden on mobile ────────────── */}
        <aside className="hidden lg:block lg:w-56 flex-none">
          <div className="lg:sticky lg:top-[120px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-4">
              On This Page
            </p>
            <nav className="flex flex-col gap-1" aria-label="Section links">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-neutral-500 hover:text-[#102243] transition-colors duration-150 py-1 border-l-2 border-transparent hover:border-[#102243] pl-3 -ml-px"
                >
                  {s.label}
                </a>
              ))}
            </nav>

            <div className="mt-10 pt-8 border-t border-neutral-100">
              <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-3">Quick Links</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.ncaa.org/sports/2024/7/9/house-settlement.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#102243] hover:underline"
                >
                  NCAA Settlement Info ↗
                </a>
                <a
                  href="https://www.housevsncaa.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#102243] hover:underline"
                >
                  Official Claims Site ↗
                </a>
                <a
                  href="https://www.mcguirewoods.com/client-resources/alerts/2025/9/the-goals-of-the-score-act-what-lawmakers-aim-to-achieve/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#102243] hover:underline"
                >
                  SCORE Act Analysis ↗
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content ────────────────────────────────────── */}
        <article className="flex-1 min-w-0">

          {/* Hero callout */}
          <div className="border border-neutral-200 rounded-lg p-6 mb-12 bg-neutral-50">
            <div className="flex items-start gap-4">
              <div
                className="flex-none w-9 h-9 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-white text-sm font-black"
                style={{ backgroundColor: "#102243" }}
                aria-hidden="true"
              >
                $
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-1">Settlement Amount</p>
                <p className="text-2xl sm:text-3xl font-black text-[#102243] leading-none">$2.8 Billion</p>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500">Paid over 10 years · Final approval July 7, 2025</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-neutral-200">
              {[
                { label: "Revenue Share Cap", value: "~$22M/yr" },
                { label: "Annual Cap Increase", value: "4%" },
                { label: "Agent Fee Cap", value: "5%" },
                { label: "Effective Date", value: "2025–26" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-base sm:text-lg font-black text-[#102243]">{value}</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#102243] mb-4 pb-3 border-b border-neutral-100">
                  {section.title}
                </h2>
                <div className="prose prose-neutral max-w-none text-sm leading-relaxed">
                  {section.body.split("\n\n").map((para, i) => {
                    if (para.startsWith("•") || para.includes("\n•")) {
                      const lines = para.split("\n").filter(Boolean)
                      return (
                        <ul key={i} className="mt-3 space-y-1.5 list-none pl-0">
                          {lines.map((line, j) => (
                            <li key={j} className="flex gap-2 text-sm text-neutral-700">
                              <span className="flex-none text-[#102243] font-bold mt-0.5">—</span>
                              <span>{line.replace(/^•\s*/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <p key={i} className="text-neutral-700 leading-relaxed mt-3 first:mt-0">
                        {para}
                      </p>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 border border-neutral-200 rounded-lg p-8">
            <h3 className="text-lg font-black text-[#102243] mb-2">
              Have a NIL Contract to Review?
            </h3>
            <p className="text-sm text-neutral-600 mb-5">
              Our AI-powered analyzer reviews your NIL deal against current rules and flags risks in seconds.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#102243] text-white px-6 py-3 text-xs font-black uppercase tracking-[0.15em] rounded-sm hover:bg-[#1a3560] transition duration-200"
            >
              Analyze My Contract
            </Link>
          </div>

        </article>
      </div>
    </div>
  )
}
