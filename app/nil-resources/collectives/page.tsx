import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "NIL Collectives | NIL Resources | Athlete Agent Labs",
  description:
    "Complete directory of college NIL collectives organized by conference — links, school affiliations, and what each collective does.",
}

interface Collective {
  school: string
  name: string
  url?: string
  notes?: string
}
interface Conference {
  name: string
  collectives: Collective[]
}

const CONFERENCES: Conference[] = [
  {
    name: "ACC",
    collectives: [
      { school: "Boston College", name: "Friends of the Heights", url: "https://www.friendsoftheheights.org/" },
      { school: "Clemson University", name: "Reign", url: "https://clemsontigers.com/reign/where/" },
      { school: "Clemson University", name: "Tiger Impact", url: "https://www.tigerimpact.org/" },
      { school: "Clemson University", name: "110 Society", url: "https://www.110society.com/" },
      { school: "Duke University", name: "Durham Devils Club", url: "https://www.durhamdevilsclub.com/" },
      { school: "Florida State University", name: "Rising Spear", url: "https://risingspear.com/" },
      { school: "Georgia Tech", name: "The Tech Way", url: "https://www.thetechway.com/" },
      { school: "University of Louisville", name: "502 Circle", url: "https://502circle.com/" },
      { school: "University of Louisville", name: "Derby City NIL Club", url: "https://www.derbycitynilclub.com/" },
      { school: "University of Miami", name: "Canes Connection", url: "https://canesconnection.com/" },
      { school: "NC State University", name: "One Pack NIL", url: "https://onepacknil.com/" },
      { school: "UNC Chapel Hill", name: "Heels4Life", url: "https://heels4life.org/" },
      { school: "Notre Dame", name: "FUND Foundation", url: "https://www.fundfoundation.org/", notes: "Notre Dame is only in ACC for basketball" },
      { school: "University of Pittsburgh", name: "Alliance 412", url: "https://www.alliance412.com/" },
      { school: "Stanford University", name: "Lifetime Cardinal", url: "https://lifetimecardinal.com/" },
      { school: "SMU", name: "Boulevard Collective", url: "https://boulevardcollective.com/" },
      { school: "Syracuse University", name: "Orange United", url: "https://www.orangeunited.com/" },
      { school: "University of Virginia", name: "Cav Futures", url: "https://www.cavfutures.com/" },
      { school: "Virginia Tech", name: "Triumph NIL", url: "https://vt.triumphnil.com/" },
      { school: "Wake Forest University", name: "Roll the Quad", url: "https://www.rollthequad.com/" },
    ],
  },
  {
    name: "A-10 (Atlantic 10)",
    collectives: [
      { school: "Davidson College", name: "NIL Portal", url: "https://davidsonwildcats.com/news/2023/2/15/general-davidson-announces-nil-portal-to-benefit-scholar-athletes" },
      { school: "University of Dayton", name: "Dayton 6th", url: "https://dayton6th.com/" },
      { school: "Duquesne University", name: "Red and Blue Collective", url: "https://redandbluecollective.com/" },
      { school: "Fordham University", name: "The Rose Hill Exchange", url: "https://fordhamsports.com/news/2023/11/13/general-fordham-unveils-rose-hill-exchange-to-aid-in-nil-efforts.aspx" },
      { school: "George Washington University", name: "Friends of George", url: "https://fogcollective.com/" },
      { school: "La Salle University", name: "Explorers United", url: "https://explorersunited.org/" },
      { school: "University of Massachusetts", name: "The Massachusetts Collective", url: "https://www.themasscollective.com/" },
      { school: "University of Richmond", name: "Spider Collective", url: "https://spidersnil.com/" },
      { school: "University of Rhode Island", name: "Rhode to Excellence", url: "https://rhodyexcellence.com/" },
      { school: "Saint Bonaventure University", name: "Team Unfurl", url: "https://www.teamunfurl.com/" },
      { school: "Saint Joseph's University", name: "Hawk Hill Alliance", url: "https://www.hawkhillalliance.com/" },
      { school: "Virginia Commonwealth University", name: "Havoc Unlimited", url: "https://havocunltd.com/" },
    ],
  },
  {
    name: "American Athletic Conference",
    collectives: [
      { school: "University of Cincinnati", name: "Cincy Reigns", url: "https://cincyreigns.org/" },
      { school: "Florida Atlantic University", name: "NIL Paradise", url: "https://www.thelinku.com/school-detail/florida-atlantic-university" },
      { school: "Florida Atlantic University", name: "The Paradise Collective", url: "https://www.theparadisecollective.com/" },
      { school: "Florida Atlantic University", name: "The Owl Collective", url: "https://www.theowlcollective.com/" },
      { school: "Florida Atlantic University", name: "Power Owls Club", url: "https://openlocker.io/pages/powerowls" },
      { school: "UCF", name: "The Kingdom NIL", url: "https://kingdomnil.com/" },
      { school: "University of Memphis", name: "901 Fund", url: "https://www.901fund.org/" },
      { school: "University of Memphis", name: "Bluff City Collective", url: "https://www.bluffcitycollective.com/" },
      { school: "East Carolina University", name: "Team Boneyard", url: "https://teamboneyard.org/" },
      { school: "University of South Florida", name: "Flower Avenue", url: "https://www.fowleravenue.com/" },
      { school: "UNC Charlotte", name: "The Goldmine Alliance", url: "https://goldmine-alliance.com/" },
      { school: "University of North Texas", name: "Light the Tower Collective", url: "https://www.lightthetowercollective.com/" },
      { school: "Tulane University", name: "Fear The Wave", url: "https://ftwcollective.com/" },
      { school: "UTSA", name: "Runners Rising Project", url: "https://runnersrisingproject.org/" },
      { school: "Wichita State University", name: "Armchair Strategies", url: "https://armchairstrategies.com/" },
      { school: "Temple University", name: "The Tuff Fund", url: "https://tuff-fund.com/" },
      { school: "University of Tulsa", name: "Hurricane Impact", url: "https://www.hurricaneimpact.org/" },
    ],
  },
  {
    name: "Atlantic Sun Conference",
    collectives: [
      { school: "Eastern Kentucky University", name: "Maroon Fund", url: "https://maroonfunds.com/" },
      { school: "Florida Gulf Coast University", name: "SWFL Flight Crew", url: "https://swflflightcrew.com/" },
      { school: "Kennesaw State University", name: "Owls Collective", url: "https://owlscollective.com/" },
    ],
  },
  {
    name: "Big 10",
    collectives: [
      { school: "University of Illinois", name: "Icon", url: "https://www.iconforillini.com/" },
      { school: "Indiana University", name: "Hoosiers Connect", url: "https://hoosiersconnect.com/" },
      { school: "Indiana University", name: "Hoosier Hysterics", url: "https://www.hhnil.com/" },
      { school: "Indiana University", name: "Hoosiers For Good", url: "https://hoosiersforgood.org/" },
      { school: "Iowa University", name: "Swarm Collective", url: "https://iowaswarm.com/" },
      { school: "Iowa University", name: "Flight", url: "https://hawkeyesports.com/flight/" },
      { school: "University of Maryland", name: "Turtle NIL", url: "https://turtlenil.com/" },
      { school: "University of Maryland", name: "One Maryland Collective", url: "https://onemarylandnil.com/" },
      { school: "University of Michigan", name: "Valiant Management Group", url: "https://valiantuofm.com/" },
      { school: "University of Michigan", name: "Champions Circle", url: "https://www.championscircleuofm.com/" },
      { school: "University of Michigan", name: "Stadium and Main", url: "https://stadiumandmain.org/" },
      { school: "Ohio State University", name: "The Foundation", url: "https://www.thefoundationohio.com/" },
      { school: "Ohio State University", name: "The 1870 Society", url: "https://www.the1870society.com/" },
      { school: "Michigan State University", name: "East Lansing NIL Club", url: "https://www.eastlansingnilclub.com/" },
      { school: "Michigan State University", name: "Spartan Dawgs 4 Life", url: "https://spartandawgs.com/" },
      { school: "University of Minnesota", name: "Dinkytown Athletes", url: "https://dinkytownathletes.com/" },
      { school: "University of Nebraska", name: "The 1890 Initiative", url: "https://www.1890nebraska.com/" },
      { school: "University of Nebraska", name: "The Big Red Collaborative", url: "https://bigredcollaborative.com/" },
      { school: "Northwestern University", name: "TrueNU", url: "https://truenu.org/" },
      { school: "Penn State", name: "Happy Valley United", url: "https://happyvalleyunited.com/" },
      { school: "Purdue University", name: "Boilermaker Alliance", url: "https://www.boilermakeralliance.com/" },
      { school: "Rutgers University", name: "Knights of the Raritan", url: "https://www.knightsoftheraritan.com/" },
    ],
  },
  {
    name: "Big 12",
    collectives: [
      { school: "Baylor University", name: "Waco NIL Club", url: "https://www.waconilclub.com/" },
      { school: "Baylor University", name: "GXG Elite", url: "https://www.gxg.startupwaco.com/" },
      { school: "BYU", name: "The Royal Blue Collective", url: "https://www.royalbluecollective.org/" },
      { school: "BYU", name: "Provo NIL Club", url: "https://www.provonilclub.com/" },
      { school: "BYU", name: "Cougar Connect", url: "https://cougconnect.com/", notes: "Not affiliated with BYU" },
      { school: "UCF", name: "The Kingdom NIL", url: "https://kingdomnil.com/" },
      { school: "University of Cincinnati", name: "Cincy Reigns", url: "https://cincyreigns.org/" },
      { school: "University of Houston", name: "LinkingCoogs", url: "https://www.thelinku.com/school-detail/university-of-houston" },
      { school: "University of Houston", name: "Hoop and Holler", url: "https://hoopandhollerhouston.weebly.com/" },
      { school: "Iowa State University", name: "We Will Collective", url: "https://www.wewillcollective.com/" },
      { school: "Iowa State University", name: "AMES NIL Club", url: "https://www.amesnilclub.com/" },
      { school: "Iowa State University", name: "The Iowa State NIL Club", url: "https://iowastate.nil.store/" },
      { school: "University of Kansas", name: "Jayhawks Ascend", url: "https://kuathletics.com/nil/" },
      { school: "University of Kansas", name: "Mass St. Collective", url: "https://massstnil.com/" },
      { school: "Kansas State University", name: "Wildcat NIL", url: "https://catsnil.com/" },
      { school: "Oklahoma University", name: "The Sooner Nation Collective", url: "https://thesoonernation.org/" },
      { school: "Oklahoma University", name: "Crimson and Cream Collective", url: "https://www.crimsoncreamcollective.com/" },
      { school: "Oklahoma State University", name: "OSU NIL", url: "https://static.okstate.com/custompages/osu-nil/index.html" },
      { school: "Oklahoma State University", name: "Pokes With a Purpose", url: "https://www.pokeswithapurpose.com/" },
      { school: "TCU", name: "Flying T Club", url: "https://flyingtclub.com/" },
      { school: "University of Texas, Austin", name: "Clark Field Collective", url: "https://clarkfieldcollective.com/" },
      { school: "University of Texas, Austin", name: "Horns With Heart", url: "https://hornswithheart.org/" },
      { school: "Texas Tech", name: "The Matador Club", url: "https://www.matadorclub.org/" },
      { school: "West Virginia University", name: "Country Roads Trust LLC", url: "https://countryroadstrust.com/" },
    ],
  },
  {
    name: "Big East",
    collectives: [
      { school: "Butler University", name: "All Good Dawgs", url: "https://www.allgooddawgs.org/" },
      { school: "UCONN", name: "D'Amelio Collective", url: "https://dameliohuskies.com/" },
      { school: "Creighton University", name: "Heart Mind Soul Collective", url: "https://heartmindsoulcollective.com/" },
      { school: "DePaul University", name: "Under The L", url: "https://underthel.org/" },
      { school: "Georgetown University", name: "Hoyas Rising", url: "https://guhoyas.com/news/2023/5/23/general-hoyas-rising-an-nil-collaborative-for-georgetown-student-athletes-launches-today.aspx" },
      { school: "Marquette University", name: "Be The Difference NIL", url: "https://bethedifferencenil.org/" },
      { school: "Providence College", name: "The Friar Family Collective", url: "https://friarfamilynil.com/" },
      { school: "St. John's University", name: "Johnnies Collective", url: "https://johnniescollective.com/" },
      { school: "Seton Hall University", name: "Onward Setonia", url: "https://www.onwardsetonia.com/" },
      { school: "Villanova University", name: "Friends of Nova", url: "https://friendsofnova.com/" },
      { school: "Xavier University", name: "Final 2 %", url: "https://final2percent.com/" },
    ],
  },
  {
    name: "Big Sky Conference",
    collectives: [
      { school: "Montana State University", name: "The Bobcat Collective", url: "https://bobcatcollective.com/" },
      { school: "University of Northern Colorado", name: "Bear Pride Collective", url: "https://bearpridecollective.com/" },
      { school: "Weber State University", name: "Purple Dub Club", url: "https://www.purpledubclub.org/" },
    ],
  },
  {
    name: "Big South Conference",
    collectives: [
      { school: "High Point University", name: "Friends of High Point University", url: "https://friendsofhpu.com/" },
      { school: "Longwood University", name: "Excellence Through Service", url: "https://excellencethroughservice.com/" },
      { school: "UNC Asheville", name: "Rocky's Collective", url: "https://rockyscollective.com/" },
    ],
  },
  {
    name: "Conference USA",
    collectives: [
      { school: "Florida International University", name: "The Blueprint Collective", url: "https://www.blueprintnil.com/" },
      { school: "Jacksonville State University", name: "Gamecock-NIL", url: "https://www.gamecock-nil.com/" },
      { school: "Liberty University", name: "Flames Rising NIL Collective", url: "https://www.aseaofred.com/flames-rising-nil-collective-powered-by-asor-now-live/" },
      { school: "Louisiana Tech University", name: "Bulldog Community Outreach", url: "https://buildthelegacy.com/sports/2024/2/4/nil-home-page.aspx" },
      { school: "MTSU", name: "Raiders Rising", url: "https://www.raidersrising.com/" },
      { school: "New Mexico State University", name: "A-Mountain Sports NIL Collective", url: "https://aggienil.com/" },
      { school: "UTEP", name: "The Miner Collective", url: "https://www.theminercollective.com/" },
      { school: "Western Kentucky University", name: "Red Towel Trust", url: "https://www.redtoweltrust.com/" },
    ],
  },
  {
    name: "MEAC",
    collectives: [
      { school: "Delaware State University", name: "NIL Marketplace", url: "https://dsuhornets.com/news/2024/1/9/general-delaware-state-athletics-partners-with-opendorse-to-launch-official-nil-marketplace.aspx" },
      { school: "Howard University", name: "The Mecca Society", url: "https://themeccasociety.org/" },
      { school: "Morgan State University", name: "NIL Club", url: "https://nilclub.com/" },
      { school: "Norfolk State University", name: "NIL Club", url: "https://nilclub.com/" },
      { school: "North Carolina Central", name: "NIL Club", url: "https://nilclub.com/" },
    ],
  },
  {
    name: "Missouri Valley Conference",
    collectives: [
      { school: "Bradley University", name: "Home of the Brave", url: "https://hotbrave.com/" },
      { school: "Drake University", name: "DU Great Collective", url: "https://dugreatcollective.org/" },
    ],
  },
  {
    name: "Mountain West Conference",
    collectives: [
      { school: "Boise State University", name: "The Horseshoe Collective", url: "https://twitter.com/horseshoe_bsu" },
    ],
  },
  {
    name: "Pac-12 (Legacy)",
    collectives: [
      { school: "University of Arizona", name: "Arizona Assist Club", url: "https://arizonaassist.com/", notes: "Men's Basketball" },
      { school: "University of Arizona", name: "Friends of Wilbur and Wilma", url: "https://friendsofwilburandwilma.com/" },
      { school: "Arizona State University", name: "Sun Angel Collective", url: "https://sunangels.org/" },
      { school: "Arizona State University", name: "Tempe NIL Club", url: "https://www.tempenil.com/" },
      { school: "UC Berkeley", name: "California Legends Collective", url: "https://calegends.com/" },
      { school: "UCLA", name: "Men of Westwood", url: "https://menofwestwood.com/" },
      { school: "University of Washington", name: "Montlake Futures", url: "https://www.montlakefutures.com/" },
      { school: "University of Oregon", name: "Division Street", url: "https://www.divisionst.com/" },
    ],
  },
  {
    name: "SEC",
    collectives: [
      { school: "University of Alabama", name: "High Tide Traditions", url: "https://www.hightidetraditions.com/" },
      { school: "University of Alabama", name: "Tuscaloosa NIL Club", url: "https://www.tuscaloosanilclub.com/" },
      { school: "University of Arkansas", name: "Fayetteville NIL Club", url: "https://www.fayettevillenilclub.com/" },
      { school: "University of Arkansas", name: "ONEArkansas NIL", url: "https://onearkansasnil.com/" },
      { school: "Auburn University", name: "NIL Auburn LLC", url: "https://www.nilauburn.com/" },
      { school: "Auburn University", name: "On To Victory", url: "https://ontovictory.com/" },
      { school: "Auburn University", name: "Plains NIL Club", url: "https://www.plainsnilclub.com/" },
      { school: "University of Georgia", name: "Classic City Collective", url: "https://classiccitycollective.com/" },
      { school: "University of South Carolina", name: "Garnet Trust", url: "https://garnettrust.com/" },
      { school: "University of Tennessee", name: "Spyre Sports Group", url: "https://www.spyresports.com/" },
      { school: "University of Tennessee", name: "Friends of Basevols", url: "https://friendsofbasevols.com/" },
      { school: "UT Austin", name: "Occupy Left Field", url: "https://www.occupyleftfield.org/" },
    ],
  },
  {
    name: "Southern Conference",
    collectives: [
      { school: "UT Chattanooga", name: "Rep the C", url: "https://www.supportrepthec.com/" },
    ],
  },
  {
    name: "SWAC",
    collectives: [
      { school: "Grambling University", name: "The Icon Collective", url: "https://theiconcollective.org/" },
    ],
  },
  {
    name: "West Coast Conference",
    collectives: [
      { school: "Gonzaga University", name: "Friends of Spike", url: "https://friendsofspike.com/" },
    ],
  },
]

export default function CollectivesPage() {
  const totalCollectives = CONFERENCES.reduce((sum, c) => sum + c.collectives.length, 0)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-16">

      {/* Header */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-[#102243] mb-2">NIL Collectives Directory</h2>
        <p className="text-sm text-neutral-500 max-w-2xl mb-8">
          A comprehensive directory of NIL collectives organized by conference. Collectives are booster-organized groups that create NIL opportunities for athletes at a specific school.
          Learn what collectives are{" "}
          <a href="https://www.theesquirecoach.com/blog/what-are-nil-collectives"
            target="_blank" rel="noopener noreferrer"
            className="text-[#102243] underline underline-offset-2 hover:opacity-70 transition duration-150">
            here
          </a>.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { value: totalCollectives.toString() + "+", label: "Collectives Listed" },
            { value: CONFERENCES.length.toString(), label: "Conferences" },
            { value: "2021", label: "Era Began" },
          ].map(({ value, label }) => (
            <div key={label} className="border border-neutral-200 rounded-lg p-5">
              <p className="text-2xl sm:text-3xl font-black text-[#102243]">{value}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-neutral-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Jump nav */}
      <div className="border border-neutral-200 rounded-lg p-5 mb-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-3">Jump to Conference</p>
        <div className="flex flex-wrap gap-2">
          {CONFERENCES.map((conf) => (
            <a key={conf.name} href={`#conf-${conf.name.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-xs font-medium text-[#102243] bg-[#102243]/5 hover:bg-[#102243]/10 px-3 py-1.5 rounded-sm transition duration-150">
              {conf.name}
            </a>
          ))}
        </div>
      </div>

      {/* Conferences */}
      <div className="space-y-12">
        {CONFERENCES.map((conf) => (
          <section
            key={conf.name}
            id={`conf-${conf.name.replace(/\s+/g, "-").toLowerCase()}`}
            className="scroll-mt-32"
          >
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
              <h3 className="text-lg font-black text-[#102243]">{conf.name}</h3>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">
                {conf.collectives.length} collective{conf.collectives.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {conf.collectives.map((c, i) => (
                <div key={i} className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors duration-150">
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">{c.school}</p>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-bold text-[#102243] hover:underline underline-offset-2 inline-flex items-center gap-1">
                      {c.name}
                      <svg className="w-3 h-3 flex-none opacity-50" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M3.5 8.5L8.5 3.5M8.5 3.5H5M8.5 3.5v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-neutral-700">{c.name}</p>
                  )}
                  {c.notes && (
                    <p className="text-[11px] text-neutral-400 mt-1 italic">{c.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 border border-neutral-200 rounded-lg p-8">
        <h3 className="text-lg font-black text-[#102243] mb-2">Received a Deal from a Collective?</h3>
        <p className="text-sm text-neutral-600 mb-5">
          Collective agreements have unique structures. Get yours reviewed instantly.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 bg-[#102243] text-white px-6 py-3 text-xs font-black uppercase tracking-[0.15em] rounded-sm hover:bg-[#1a3560] transition duration-200">
          Analyze My Contract
        </Link>
      </div>
    </div>
  )
}
