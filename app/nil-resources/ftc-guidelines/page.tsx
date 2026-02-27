import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FTC Social Media Guidelines | NIL Resources | Athlete Agent Labs",
  description:
    "FTC endorsement and disclosure rules for athletes — what to post, how to disclose paid partnerships, what the FTC can fine you for, and platform-specific guidance.",
}

const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    title: "Why FTC Rules Matter for Athletes",
    body: `The Federal Trade Commission (FTC) enforces consumer protection laws that apply to anyone who is paid to promote a product or service on social media — including college and high school athletes. Since NIL opened, hundreds of athletes have become social media influencers. These rules govern every sponsored post, gifted product, and paid appearance you promote online.

The FTC's primary regulation is the "Guides Concerning the Use of Endorsements and Testimonials in Advertising," which were substantially updated in 2023. Violations can result in civil penalties of up to $51,744 per violation. The FTC has also begun holding individual influencers (not just brands) liable.`,
  },
  {
    id: "disclosure-required",
    label: "When to Disclose",
    title: "When Disclosure Is Required",
    body: `You must disclose a material connection with a brand whenever you post about them if a "material connection" exists. A material connection includes:

• Cash payment (sponsored post, ambassador deal, per-post fee)
• Free products, merchandise, or gear (even if no money changed hands)
• Discounts offered exclusively to you as a brand partner
• Family or employment relationships with the brand
• Equity or ownership stake in the company

The FTC requires disclosure when the connection is not already "reasonably expected" by the audience. If you are a paid athlete ambassador for a shoe brand and you post wearing their shoes, you must disclose — even if you "genuinely love the product."`,
  },
  {
    id: "how-to-disclose",
    label: "How to Disclose",
    title: "How to Properly Disclose",
    body: `The FTC requires disclosures to be:

• Clear: Easy to understand and unambiguous
• Conspicuous: Not buried in hashtags, and not below the fold where viewers must click "more" to see it
• Close to the claim: Near the beginning of the post or caption, not only at the end

ACCEPTABLE DISCLOSURES:
• "#ad" at the beginning of a caption
• "#sponsored" at the beginning of a caption
• "Paid partnership with [Brand]" clearly visible
• "Thanks to [Brand] for sending me this product"
• Instagram and TikTok's built-in "Paid Partnership" labels (though they are not a substitute for explicit caption disclosure)

NOT ACCEPTABLE:
• "#ad" buried among fifteen other hashtags at the end of a caption
• General phrases like "#collab," "#partner," "#sp," "#gifted" alone
• Disclosure only in a comment, not in the original post
• Disclosure that is visible only if you expand the caption
• Verbal-only disclosure in a video without visual text`,
  },
  {
    id: "platform-rules",
    label: "Platform Rules",
    title: "Platform-Specific Guidance",
    body: `Each social media platform has its own branded content policies in addition to FTC requirements. Using a platform's built-in disclosure tool does NOT replace your obligation to comply with FTC rules.

INSTAGRAM:
• Use the "Paid Partnership" label in the post settings
• Also include "#ad" or "Paid partnership with @Brand" in the caption
• Stories: Use the paid partnership label AND include "#ad" in text on screen

TIKTOK:
• Enable "Disclose video content" toggle in the TikTok creator tools
• Select "Your brand" or "Third party" as appropriate
• Also include "#ad" at the beginning of your caption or spoken/on-screen in the video

YOUTUBE:
• Check the "Contains paid promotion" box in video settings
• Also include a verbal disclosure near the beginning of the video, e.g., "This video was sponsored by [Brand]"
• Include the disclosure in the written description as well

X (TWITTER):
• Include "#ad" or "Sponsored by [Brand]" at the beginning of the tweet
• No built-in paid partnership label as of 2025

TWITCH / STREAMING:
• Verbally disclose sponsorships at the start of each session and at regular intervals
• Include visual disclosure on screen (banner or overlay)`,
  },
  {
    id: "reviews",
    label: "Reviews & Testimonials",
    title: "Reviews, Testimonials & True Claims",
    body: `The FTC's 2023 updates specifically target fake or misleading reviews. For athletes:

• You cannot provide a positive testimonial for a product you have not personally used
• You cannot make claims about a product's performance that are not substantiated (e.g., "This supplement added 5 mph to my fastball" must be verifiable)
• You cannot set up, fake, or incentivize reviews for a brand on third-party platforms (Amazon, Google, Yelp)
• You should share your honest opinion — the FTC does not require your review to be positive, only honest
• If you were given a product for free on the condition of a positive review, the disclosure must reflect that condition

The 2023 updates also specifically target "dissociated endorsements" — where brands use your likeness after your deal ends without your current endorsement.`,
  },
  {
    id: "ai-content",
    label: "AI-Generated Content",
    title: "AI-Generated Endorsements & Digital Likenesses",
    body: `The FTC's 2023 revisions addressed AI-generated content. For athletes, this is increasingly relevant:

• Brands may not use AI-generated versions of your name, face, or voice in advertising without your explicit consent
• If a brand uses deepfakes or AI voice/image synthesis to suggest you endorse a product, they are violating FTC rules — and potentially your Right of Publicity
• If you use AI-generated content in a sponsored post (AI-written captions approved by a brand, AI-edited images), disclosure is still required
• Virtual influencer accounts controlled by brands but impersonating real athletes are an FTC enforcement target`,
  },
  {
    id: "enforcement",
    label: "Enforcement",
    title: "FTC Enforcement & Penalties",
    body: `The FTC has increased enforcement actions against individual influencers since 2022. Key enforcement facts:

• Civil penalties: Up to $51,744 per violation (as of 2024)
• The FTC first issues warning letters, but has escalated to formal enforcement orders
• Individual influencers — not just brands — can be personally fined
• The FTC has specifically named athlete influencers in warning campaigns
• The FTC monitors social media for compliance and can investigate based on public complaints

Actions the FTC has taken include:
• Sent warning letters to dozens of celebrity and athlete influencers
• Issued formal enforcement orders to brands using undisclosed influencer networks
• Published the "Endorsement Guides" updated October 2023

Best practice: treat every sponsored post as if the FTC is reviewing it.`,
  },
  {
    id: "nil-specific",
    label: "NIL & FTC",
    title: "FTC Rules in the NIL Context",
    body: `NIL deals often involve social media obligations. Every NIL contract that includes social media posting requirements should be reviewed for FTC compliance. Common NIL contract scenarios and what they require:

AMBASSADOR DEALS: Multi-month arrangements where the athlete wears, uses, and posts about a brand. Every post requires clear disclosure, even if you post freely outside of contractual requirements while wearing the brand's gear.

CAMPUS AMBASSADOR PROGRAMS: These are common first deals for athletes. Even if the compensation is small (free products, campus events), disclosure is required on every promotional post.

PRODUCT-SEEDING: Brands send products unsolicited hoping for organic coverage. Under the 2023 FTC updates, even unsolicited gifted products must be disclosed if you post about them — the exception for truly unsolicited gifts has narrowed.

COLLECTIVE DEALS: If a collective pays you to post about yourself or your team, that constitutes sponsored content and requires disclosure.

SCHOOL PARTNER BRANDS: If your school's athletic department sponsors a content program (e.g., a "student-athlete social media" initiative supported by a brand), posts from that program require disclosure if athletes are compensated.

IMPORTANT: Your NIL contract should address FTC compliance. Always confirm with the brand who is responsible for compliance and ensure you have indemnification language in your deal.`,
  },
  {
    id: "quick-rules",
    label: "Quick Rules",
    title: "The 5 Quick Rules to Follow",
    body: `If you want one printable reference, follow these five rules on every sponsored post:

1. DISCLOSE FIRST — Put "#ad" or "Paid partnership with [Brand]" at the very beginning of your caption or as the first words spoken in a video. Never bury it.

2. BE HONEST — Only endorse products you actually use and have a genuinely positive view of. If your opinion is mixed, say so. The FTC does not require you to be positive.

3. USE THE PLATFORM TOOLS — Enable TikTok's "Disclose video content" switch, use Instagram's "Paid Partnership" label, and check YouTube's "Contains paid promotion" box — in addition to your own caption disclosure.

4. KEEP RECORDS — Save your contracts, posts, and all communications with brands for at least 3 years. FTC investigations can be retroactive.

5. GET YOUR CONTRACTS REVIEWED — Ensure your NIL agreement includes FTC compliance provisions and indemnification if the brand directs your content.`,
  },
]

const QUICK_LINKS = [
  { label: "FTC Endorsement Guides (2023)", url: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" },
  { label: "FTC: Disclosures 101 for Social Media Influencers", url: "https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers" },
  { label: "FTC: Using Consumer Reviews (2023 Update)", url: "https://www.ftc.gov/business-guidance/resources/ftc-guide-using-consumer-reviews" },
]

export default function FtcGuidelinesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Sidebar — hidden on mobile */}
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
              <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-3">Official FTC Links</p>
              <div className="flex flex-col gap-2">
                {QUICK_LINKS.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#102243] hover:underline leading-relaxed">{l.label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <article className="flex-1 min-w-0">

          {/* Warning banner */}
          <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-lg p-5 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-700 mb-1">Compliance Notice</p>
            <p className="text-sm text-amber-900 leading-relaxed">
              FTC violations can result in civil penalties up to <strong>$51,744 per violation</strong>. These rules apply to every sponsored post — regardless of your follower count or deal size.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
            {[
              { value: "$51,744", label: "Max Fine Per Violation" },
              { value: "2023", label: "Guides Last Updated" },
              { value: "100%", label: "Posts That Require Disclosure" },
            ].map(({ value, label }) => (
              <div key={label} className="border border-neutral-200 rounded-lg p-5">
                <p className="text-xl sm:text-2xl font-black text-[#102243]">{value}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-neutral-400 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#102243] mb-4 pb-3 border-b border-neutral-100">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.body.split("\n\n").map((para, i) => {
                    if (para.includes("\n•") || para.includes("\nACCEPTABLE") || para.includes("\nNOT ACCEPTABLE") || para.includes("\nINSTAGRAM") || para.includes("\nIMPORTANT")) {
                      const lines = para.split("\n").filter(Boolean)
                      return (
                        <div key={i} className="mt-3 space-y-2">
                          {lines.map((line, j) => {
                            const isBold = /^[A-Z][A-Z\s]+:/.test(line)
                            const isBullet = line.startsWith("•")
                            const isNumbered = /^\d\./.test(line)
                            if (isBold && !isBullet) {
                              return (
                                <p key={j} className="text-sm font-semibold text-neutral-900 mt-4 first:mt-0">{line}</p>
                              )
                            }
                            return (
                              <div key={j} className={[
                                "flex gap-2 text-sm text-neutral-700",
                                isNumbered ? "mt-2" : "",
                              ].join(" ")}>
                                {isBullet ? (
                                  <><span className="flex-none text-[#102243] font-bold mt-0.5">—</span><span>{line.replace(/^•\s*/, "")}</span></>
                                ) : (
                                  <span>{line}</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )
                    }
                    return <p key={i} className="text-sm text-neutral-700 leading-relaxed">{para}</p>
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Disclosure checker visual */}
          <aside className="mt-14 border border-neutral-200 rounded-lg p-6 bg-neutral-50">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">Quick Disclosure Checklist</p>
            <ul className="space-y-2.5">
              {[
                "Is my #ad or 'Paid partnership with...' disclosure at the top of the caption?",
                "Is the disclosure clearly visible without expanding the post?",
                "Did I enable the platform's built-in 'Paid Partnership' or 'Sponsored' label?",
                "Am I sharing only honest, personal opinions about the product?",
                "Do I have a signed agreement confirming this is a real business relationship?",
                "Have I confirmed my statement about the product is accurate and not misleading?",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                  <span className="flex-none w-5 h-5 border-2 border-neutral-300 rounded mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          {/* CTA */}
          <div className="mt-10 border border-neutral-200 rounded-lg p-8">
            <h3 className="text-lg font-black text-[#102243] mb-2">Is Your NIL Contract FTC Compliant?</h3>
            <p className="text-sm text-neutral-600 mb-5">
              Our analyzer checks for missing compliance provisions and disclosure obligations in your NIL agreements.
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
