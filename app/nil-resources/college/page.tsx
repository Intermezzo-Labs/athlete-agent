import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "College NIL | NIL Resources | Athlete Agent Labs",
  description:
    "College NIL rules explained — NCAA interim policy, revenue sharing, deal types, disclosure requirements, and what Division I, II, and III athletes need to know.",
}

const SECTIONS = [
  {
    id: "ncaa-overview",
    label: "NCAA Policy",
    title: "The NCAA's NIL Framework",
    body: `On July 1, 2021, the NCAA adopted an interim NIL policy permitting all college athletes across Divisions I, II, and III to monetize their name, image, and likeness through third-party endorsements, social media content, personal appearances, lessons, autograph signings, and more. This change came after years of legal pressure, culminating in the Supreme Court's unanimous June 2021 ruling in NCAA v. Alston, which held that certain NCAA compensation limits violated antitrust law.

The interim policy deferred heavily to state law where state laws existed, and to institutional and conference policies where they did not. This created a patchwork of rules that has since been largely replaced by the House Settlement's revenue sharing framework.`,
  },
  {
    id: "revenue-sharing",
    label: "Revenue Sharing",
    title: "Direct Revenue Sharing (Post-House Settlement)",
    body: `Starting with the 2025–26 academic year, Division I institutions may directly pay athletes from their own athletic revenues — a first in NCAA history. The framework is as follows:

• Annual per-school cap begins at approximately $20–22 million
• Cap increases ~4% per year, recalculated every three years
• Schools are not required to share revenue — it is permissive
• Distributions are contractual arrangements, not employment
• Most schools will focus revenue sharing on football and basketball but are free to allocate across sports

This is separate from third-party NIL deals. Athletes can simultaneously receive direct school payments and earn independently through brand deals and personal appearances.`,
  },
  {
    id: "permitted-activities",
    label: "Permitted Activities",
    title: "What College Athletes Can Do",
    body: `College athletes may earn compensation from a wide range of NIL activities, including:

• Social media sponsorships and brand partnerships on Instagram, TikTok, YouTube, X, etc.
• Personal appearances, autograph signings, and meet-and-greets
• Youth camps and clinics (instruction-for-pay)
• Podcast, media, and broadcasting appearances
• Merchandise and licensed products featuring the athlete's name, number, or likeness
• Group licensing agreements organized through the school or collective
• Entrepreneurial ventures and business ownership
• Acting, modeling, and entertainment work

Athletes cannot receive "pay for play" — compensation directly tied to athletic participation or in-game performance. NIL deals must be for legitimate business purposes.`,
  },
  {
    id: "restricted",
    label: "Restrictions",
    title: "What Is Still Prohibited",
    body: `Despite the opening of NIL, several restrictions remain:

• No pay-for-play: compensation cannot be conditioned on athletic participation, scoring, or performance
• No inducement: boosters and collectives cannot offer NIL as an inducement for enrollment decisions (though this line has become highly contested and is increasingly difficult to enforce)
• No institutional employment: schools cannot directly pay athletes as employees for their athletic services
• Prohibited categories: state laws and NCAA guidance restrict NIL deals in certain industries (e.g., alcohol, tobacco, cannabis, sports gambling, adult content — varies by state and school)
• Conflict with sponsor agreements: athletes generally cannot enter NIL deals that directly conflict with existing school or conference sponsor agreements (e.g., an Adidas-sponsored school cannot allow athletes to wear or promote Nike)`,
  },
  {
    id: "disclosure",
    label: "Disclosure",
    title: "Disclosure & Reporting Requirements",
    body: `Most state NIL laws require athletes to disclose NIL agreements to their institution within a short window, typically 7–72 hours after execution. Federal legislation could standardize this. Disclosure typically includes:

• The parties to the agreement
• The nature of the services required
• The compensation amount or range
• The duration of the agreement
• Any exclusivity provisions

Schools review disclosures for conflicts with existing school or conference agreements. Schools cannot withhold approval or refuse to process a disclosure as a means to block NIL activity.`,
  },
  {
    id: "tax",
    label: "Taxes",
    title: "Tax Obligations",
    body: `NIL compensation is taxable income. Athletes earning more than $600 from a single source in a calendar year will typically receive a Form 1099-NEC. Key tax considerations:

• Federal income tax: NIL earnings are subject to federal income tax at the athlete's marginal rate
• Self-employment tax: If the athlete is classified as an independent contractor (most common), they owe ~15.3% self-employment tax on NIL income
• State income tax: varies by state; athletes who compete in multiple states may owe "jock taxes" to states where they perform
• Business expenses: equipment, travel, and professional fees related to NIL activities may be deductible
• Quarterly estimated payments: athletes with significant NIL income should make quarterly estimated tax payments to avoid underpayment penalties

Schools that receive over $20M in annual athletic revenue are required (under the House Settlement) to provide access to tax advisory services for their athletes.`,
  },
  {
    id: "agents",
    label: "Agents",
    title: "Working with Agents & Advisors",
    body: `College athletes may now engage licensed sports agents and attorneys to assist with NIL transactions. What you need to know:

• Licensed sports agents must be registered under the applicable state's Athletic Agents Act
• Florida, Georgia, Texas, and most other states with NIL laws explicitly permit agent representation for NIL deals
• Athletes should verify the agent's registration before signing a representation agreement
• Agent fees: The proposed SCORE Act would cap NIL agent fees at 5% of total compensation
• Disputes with agents over NIL contracts are handled in state civil courts, not by the NCAA
• You can terminate an NIL agent relationship without risking eligibility (unlike traditional agent use under prior NCAA rules) — though contractual penalty provisions in the agent agreement may still apply`,
  },
  {
    id: "collectives",
    label: "Collectives",
    title: "NIL Collectives",
    body: `NIL collectives are booster-organized groups that pool funds to create NIL opportunities for athletes at a specific school. They emerged as a vehicle to work within the NCAA's prohibition on institutional pay-for-play.

Collectives typically operate by:
• Contracting directly with athletes for content, appearances, or social media posts
• Providing a marketplace for local businesses to connect with athletes
• Organizing group deals across the entire team or program

Post-House Settlement, many collectives are expected to formalize into more structured entities or merge with athletic department operations, since schools can now pay athletes directly. Collectives may continue to supplement direct school payments.

See our Collectives page for a full conference-by-conference directory of NIL collectives.`,
  },
  {
    id: "transfer",
    label: "Transfer Portal",
    title: "NIL & the Transfer Portal",
    body: `The transfer portal and NIL have become deeply intertwined. Athletes frequently transfer to gain access to better NIL opportunities at schools with larger collectives or higher revenue sharing capacity.

Key points:
• Moving schools (via the transfer portal) does not cancel existing valid NIL agreements
• New schools may offer their own NIL opportunities as part of the recruiting process
• Schools and collectives may not offer NIL as an illegal inducement — but regulators and enforcement bodies have found it nearly impossible to disentangle legitimate NIL from recruiting inducement in practice
• A transfer athlete's existing third-party contracts should be reviewed before the move to check for any geographic exclusivity, school-branding restrictions, or termination provisions`,
  },
]

const QUICK_LINKS = [
  { label: "NCAA NIL Central", url: "https://www.ncaa.org/sports/2021/4/21/nil-faq.aspx" },
  { label: "NCAA v. Alston Decision", url: "https://www.supremecourt.gov/opinions/20pdf/20-512_gfbh.pdf" },
  { label: "House Settlement Info", url: "https://www.housevsncaa.com/" },
]

export default function CollegePage() {
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
                  {s.label}
                </a>
              ))}
            </nav>
            <div className="mt-10 pt-8 border-t border-neutral-100">
              <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-3">Quick Links</p>
              <div className="flex flex-col gap-2">
                {QUICK_LINKS.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#102243] hover:underline">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="flex-1 min-w-0">
          {/* Banner */}
          <div className="border border-neutral-200 rounded-lg p-6 mb-12 bg-neutral-50">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-2">Key Date</p>
            <p className="text-xl sm:text-2xl font-black text-[#102243]">July 1, 2021</p>
            <p className="text-sm text-neutral-500 mt-1">NCAA interim NIL policy takes effect — college athletes may earn NIL compensation</p>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-4 pt-5 border-t border-neutral-200">
              {[
                { label: "Divisions Covered", value: "I, II, III" },
                { label: "Revenue Share Cap", value: "~$22M/yr" },
                { label: "Sports", value: "All" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-lg sm:text-xl font-black text-[#102243]">{value}</p>
                  <p className="text-[11px] text-neutral-500 uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#102243] mb-4 pb-3 border-b border-neutral-100">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.split("\n\n").map((para, i) => {
                    if (para.includes("\n•")) {
                      const lines = para.split("\n").filter(Boolean)
                      return (
                        <ul key={i} className="space-y-1.5 list-none pl-0 mt-3">
                          {lines.map((line, j) => (
                            <li key={j} className="flex gap-2 text-sm text-neutral-700">
                              {line.startsWith("•") ? (
                                <><span className="flex-none text-[#102243] font-bold mt-0.5">—</span><span>{line.replace(/^•\s*/, "")}</span></>
                              ) : (
                                <span className="font-medium text-neutral-800">{line}</span>
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

          <div className="mt-16 border border-neutral-200 rounded-lg p-8">
            <h3 className="text-lg font-black text-[#102243] mb-2">Need Your NIL Contract Reviewed?</h3>
            <p className="text-sm text-neutral-600 mb-5">Upload your NIL agreement and get instant AI-powered risk analysis.</p>
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
