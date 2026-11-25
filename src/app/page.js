import Link from 'next/link';
import { NEIGHBORHOODS, getScoreTier, SITE_URL, SITE_NAME } from '@/lib/data';
import NeighborhoodCard from '@/components/NeighborhoodCard';

export const metadata = {
  title: `${SITE_NAME} — Which areas of Hyderabad are most walkable?`,
  description:
    'Street-audit walkability scores for 10 Hyderabad neighbourhoods — Jubilee Hills, Necklace Road, Charminar, HITEC City, Banjara Hills, Ameerpet, Gachibowli, Secunderabad, Abids and Sainikpuri. Covers shade, footpath quality, Metro access, and safety.',
  alternates: { canonical: SITE_URL },
};

const FAQ = [
  {
    q: 'Which areas of Hyderabad are most walkable?',
    a: 'Secunderabad Parade Ground (80/100), Jubilee Hills & KBR Perimeter (77/100), and Necklace Road & Hussain Sagar (75/100) are the top three walkable neighbourhoods in this audit. Secunderabad scores highest because of its dual Metro interchange, mature cantonment avenue trees, and compact grid.',
  },
  {
    q: 'Is Gachibowli walkable?',
    a: 'Gachibowli is partially walkable (62/100). It has wide, newly built footpaths and a dedicated cycle track near the Botanical Garden, but its Metro access score is very low (34/100) because the nearest Metro station (Raidurg) is a 28-minute walk away. It is good for leisure walking, but poor for car-free commuting.',
  },
  {
    q: 'Is HITEC City good for walking?',
    a: 'HITEC City scores 72/100 — somewhat walkable. It has excellent Metro access via HITEC City and Raidurg stations (5-min walk) and wide footpaths in the Mindspace and Durgam Cheruvu areas. Its biggest weakness is very low shade and a +1.7°C heat-island effect, making midday walks uncomfortable.',
  },
  {
    q: 'Is Madhapur walkable?',
    a: 'Madhapur is a sub-locality of the HITEC City / Raidurg corridor. The area benefits from good Metro access via the Blue Line, but pedestrian infrastructure along Hitec City Road and Laxmi Cyber City junction suffers from fast-moving traffic and limited shade. We expect to add a dedicated Madhapur audit in a future update.',
  },
  {
    q: 'Is Banjara Hills walkable?',
    a: 'Banjara Hills scores 68/100 — somewhat walkable. The leafy avenues near JV Rao Park and the cafe stretch on Road No. 12 are pleasant to walk. However, steep gradients, utility pole obstructions, and a 13-minute walk to the nearest Metro station (Panjagutta Red Line) limit overall walkability.',
  },
  {
    q: 'How is the walkability score calculated?',
    a: 'Each neighbourhood is scored out of 100 across four pillars: Canopy & Shade (25%), Footpath Quality (25%), Metro & Transit Access (25%), and Lighting & Safety (25%). The overall score is the weighted average. Full methodology is explained on the About & Methodology page.',
  },
];

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Street-audit walkability scores and pedestrian issue reporting for Hyderabad neighbourhoods.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/area?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'Open street-audit walkability data for Hyderabad.',
  areaServed: { '@type': 'City', name: 'Hyderabad', addressCountry: 'IN' },
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const sorted = [...NEIGHBORHOODS].sort((a, b) => b.overall - a.overall);

export default function HomePage() {
  const cityAvg = Math.round(NEIGHBORHOODS.reduce((s, n) => s + n.overall, 0) / NEIGHBORHOODS.length);
  const topArea = sorted[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />

      {/* Hero */}
      <section className="bg-[#181D23] py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F39C6B]">Hyderabad Street-Audit Atlas</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              Which areas of Hyderabad are most walkable?
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              Citizen-audited walkability scores across 10 Hyderabad neighbourhoods — measuring tree canopy shade, footpath continuity, Metro access, and street safety. City average: <strong className="text-white">{cityAvg}/100</strong>. Top area: <strong><Link href={`/area/${topArea.slug}`} className="underline hover:text-[#F39C6B]">{topArea.shortName} ({topArea.overall}/100)</Link></strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/area" className="rounded-xl bg-[#D96B27] px-5 py-2.5 text-sm font-bold hover:bg-[#C25C1D]">
                Explore All Areas
              </Link>
              <Link href="/about" className="rounded-xl border border-white/25 px-5 py-2.5 text-sm font-bold hover:bg-white/10">
                How Scores Work
              </Link>
            </div>
          </div>

          {/* Stat chips */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Neighbourhoods audited', value: '10' },
              { label: 'City walkability average', value: `${cityAvg}/100` },
              { label: 'Metro stations mapped', value: '9' },
              { label: 'Street issues logged', value: '10+' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/8 p-3">
                <div className="font-mono text-xl font-extrabold text-white">{s.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ranked list */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#181D23]">Walkability Rankings — Hyderabad 2026</h2>
            <p className="mt-1 text-sm text-[#525866]">Sorted by overall score. Click any area for the full street audit.</p>
          </div>
          <Link href="/area" className="shrink-0 text-sm font-bold text-[#0E7C7B] hover:underline">View all →</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((n) => (
            <NeighborhoodCard key={n.slug} n={n} />
          ))}
        </div>
      </section>

      {/* Score scale explainer */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-lg font-extrabold text-[#181D23]">Walkability Grade Scale</h2>
          <p className="mt-1 text-sm text-[#525866]">Each neighbourhood is graded on a 100-point composite score across four street-audit pillars.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {[
              { grade: 'A', range: '78–100', label: "Walker's Haven", color: '#1F7A4C', desc: 'Excellent footpaths, shade, Metro access, and safe crossings. Comfortable to walk for most daily errands.' },
              { grade: 'B+', range: '70–77', label: 'Very Walkable', color: '#0E7C7B', desc: 'Good overall experience. One or two pillars need improvement.' },
              { grade: 'B', range: '60–69', label: 'Somewhat Walkable', color: '#D96B27', desc: 'Some areas work well on foot; others have significant gaps.' },
              { grade: 'C', range: '<60', label: 'Car-Dependent', color: '#B91C1C', desc: 'Pedestrian infrastructure is poor, unconnected, or unsafe for most residents.' },
            ].map((g) => (
              <div key={g.grade} className="rounded-2xl border border-black/10 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl font-mono text-base font-extrabold text-white" style={{ backgroundColor: g.color }}>{g.grade}</span>
                  <div>
                    <div className="text-xs font-bold text-[#181D23]">{g.label}</div>
                    <div className="font-mono text-[11px] text-[#525866]">{g.range}/100</div>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#525866]">{g.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#525866]">
            <Link href="/about" className="font-semibold text-[#0E7C7B] hover:underline">Read the full methodology →</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-extrabold text-[#181D23]">Frequently Asked Questions</h2>
        <p className="mt-1 text-sm text-[#525866]">Common questions about walkability in Hyderabad.</p>
        <div className="mt-6 space-y-4">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group rounded-2xl border border-black/10 bg-white px-5 py-4 open:shadow-sm">
              <summary className="cursor-pointer text-sm font-bold text-[#181D23] marker:content-none group-open:text-[#0E7C7B]">
                {q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#525866]">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
