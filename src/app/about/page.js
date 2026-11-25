import Link from 'next/link';
import { SITE_URL } from '@/lib/data';

export const metadata = {
  title: 'About & Methodology — How Hyderabad Walkability Scores Are Calculated',
  description:
    'Full methodology for the Walkable HYD street-audit scores: how canopy shade, footpath quality, Metro access, and lighting & safety are measured and weighted.',
  alternates: { canonical: `${SITE_URL}/about` },
};

const PILLARS = [
  {
    name: 'Canopy & Shade',
    weight: 25,
    color: '#1F7A4C',
    items: [
      'Aerial canopy cover percentage from satellite/drone imagery',
      'Ground-level heat island delta (°C) vs city average measured at 2 PM',
      'Continuity of shaded walking corridors (shaded path length / total path length)',
    ],
  },
  {
    name: 'Footpath Quality',
    weight: 25,
    color: '#D96B27',
    items: [
      'Footpath continuity percentage (paved, unobstructed, connected length / total street length)',
      'Average clear walkway width in metres (target ≥ 1.8 m per IRC)',
      'Presence of kerb ramps, tactile paving, and level surface quality',
    ],
  },
  {
    name: 'Metro & Transit Access',
    weight: 25,
    color: '#0E7C7B',
    items: [
      'Walking distance in minutes to the nearest Hyderabad Metro / MMTS station',
      'Quality of the Metro approach footpath (sub-score)',
      'Availability of signalised pedestrian crossings on the last-mile route',
    ],
  },
  {
    name: 'Lighting & Safety',
    weight: 25,
    color: '#3B5BDB',
    items: [
      'Streetlight density (poles per km)',
      'Count of marked pedestrian crossings (zebra, raised tabletop)',
      'Active frontage index (ground-floor windows, shops, human presence)',
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#525866]">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#181D23]">About &amp; Methodology</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-[#181D23]">About Walkable HYD &amp; How Scores Are Calculated</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#525866]">
        Walkable HYD is a citizen-led street-audit initiative that produces structured walkability data for Hyderabad neighbourhoods. Our goal is to give residents, urban planners, and journalists a clear, comparable picture of where in Hyderabad it is safe, comfortable, and practical to walk.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-[#181D23]">Scoring Methodology</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#525866]">
          Each neighbourhood receives an overall walkability score from 0 to 100, computed as the equal-weighted average of four street-audit pillars. Each pillar is itself scored from 0 to 100 by combining several field measurements into a normalised sub-score.
        </p>

        {/* Score formula */}
        <div className="mt-5 rounded-2xl border border-black/10 bg-white p-5">
          <h3 className="text-sm font-bold text-[#181D23]">Score Formula</h3>
          <p className="mt-2 font-mono text-sm text-[#181D23]">
            Overall = (Shade + Footpath + Metro + Safety) ÷ 4
          </p>
          <p className="mt-1 text-xs text-[#525866]">Each pillar contributes 25%. You can apply custom weights using the interactive explorer on the <Link href="/" className="font-semibold text-[#0E7C7B] hover:underline">homepage map</Link>.</p>
        </div>

        {/* Pillar detail */}
        <div className="mt-6 space-y-4">
          {PILLARS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-xl px-2.5 py-1 font-mono text-xs font-bold text-white" style={{ backgroundColor: p.color }}>{p.weight}%</span>
                <h3 className="text-sm font-bold text-[#181D23]">{p.name}</h3>
              </div>
              <ul className="mt-3 space-y-1 text-xs text-[#525866]">
                {p.items.map((item) => <li key={item} className="flex gap-2"><span>•</span>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-[#181D23]">Data Collection &amp; Sources</h2>
        <ul className="mt-3 space-y-2 text-sm text-[#525866]">
          <li>• <strong className="text-[#181D23]">Citizen street audits:</strong> Trained volunteer walkers conduct timed walks along representative corridors, logging observations with a standardised checklist.</li>
          <li>• <strong className="text-[#181D23]">Satellite imagery analysis:</strong> Canopy cover and footpath continuity are cross-checked against publicly available satellite data.</li>
          <li>• <strong className="text-[#181D23]">OpenStreetMap:</strong> Used for Metro station locations, street lengths, and corridor geometry.</li>
          <li>• <strong className="text-[#181D23]">Government data:</strong> GHMC streetlight density reports and Hyderabad Metro Rail station databases where available.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-[#181D23]">Limitations</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#525866]">
          Scores reflect conditions at the time of the last street audit (shown on each neighbourhood page). Hyderabad's infrastructure changes rapidly; scores may not reflect recent construction, Metro extensions, or GHMC footpath work. Scores cover the representative core of each neighbourhood and not every sub-street. Madhapur, Kondapur, and other sub-localities of larger zones are not yet separately audited.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-[#181D23]">E-E-A-T: Experience, Expertise, Authoritativeness, Trust</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#525866]">
          Our auditors walk each corridor personally (Experience). The methodology aligns with IRC:103-2012 (pedestrian facilities code) and international Walk Score® research (Expertise). We publish raw field data, corridor statuses, and audit dates on each neighbourhood page (Authoritativeness). We actively invite the community to report issues and correct data (Trust).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-[#181D23]">Report an Error or Update</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#525866]">
          If you believe a score is outdated or incorrect, <Link href="/report" className="font-semibold text-[#0E7C7B] hover:underline">file a street issue report</Link> and select "Data Error / Score Dispute". We review corrections within 30 days and re-audit the corridor if supported by evidence.
        </p>
      </section>
    </div>
  );
}
