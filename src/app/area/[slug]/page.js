import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NEIGHBORHOODS, getNeighborhoodBySlug, getScoreTier, SITE_URL } from '@/lib/data';

export async function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) return {};
  const tier = getScoreTier(n.overall);
  return {
    title: `Is ${n.shortName} walkable? Street Audit ${n.overall}/100 (${tier.grade}) | Walkable HYD`,
    description: `${n.name} walkability score: ${n.overall}/100 (${tier.label}). Shade ${n.scores.shade}/100, Footpath Quality ${n.scores.footpath}/100, Metro Access ${n.scores.metro}/100, Safety ${n.scores.safety}/100. Footpath continuity ${n.footpathContinuity}%, canopy coverage ${n.canopyCoverage}%, nearest Metro: ${n.metroStation} (${n.metroWalkMins} min walk).`,
    alternates: { canonical: `${SITE_URL}/area/${n.slug}` },
    openGraph: {
      title: `Is ${n.shortName} walkable? ${n.overall}/100 (${tier.grade}) — Walkable HYD`,
      description: n.summary,
      url: `${SITE_URL}/area/${n.slug}`,
      type: 'article',
    },
  };
}

const statusColor = { Walkable: '#1F7A4C', 'Needs Repair': '#D96B27', Blocked: '#B91C1C' };
const statusBg   = { Walkable: '#E8F5EE', 'Needs Repair': '#FDF0E7', Blocked: '#FEECEC' };

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) notFound();

  const tier = getScoreTier(n.overall);
  const others = NEIGHBORHOODS.filter((x) => x.slug !== slug).sort((a, b) => b.overall - a.overall).slice(0, 4);

  const PLACE_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: n.name,
    description: n.summary,
    geo: { '@type': 'GeoCoordinates', latitude: n.lat, longitude: n.lng },
    containedInPlace: { '@type': 'City', name: 'Hyderabad', addressCountry: 'IN' },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Walkability Score', value: n.overall, minValue: 0, maxValue: 100 },
      { '@type': 'PropertyValue', name: 'Canopy & Shade', value: n.scores.shade },
      { '@type': 'PropertyValue', name: 'Footpath Quality', value: n.scores.footpath },
      { '@type': 'PropertyValue', name: 'Metro Access', value: n.scores.metro },
      { '@type': 'PropertyValue', name: 'Lighting & Safety', value: n.scores.safety },
    ],
  };

  const pillars = [
    { key: 'shade', label: 'Canopy & Shade', color: '#1F7A4C', desc: `${n.canopyCoverage}% tree canopy coverage. Heat delta: ${n.heatDeltaC > 0 ? '+' : ''}${n.heatDeltaC}°C vs city baseline.` },
    { key: 'footpath', label: 'Footpath Quality', color: '#D96B27', desc: `${n.footpathContinuity}% footpath continuity. Average width: ${n.avgWidthM} m.` },
    { key: 'metro', label: 'Metro & Transit', color: '#0E7C7B', desc: `Nearest station: ${n.metroStation}. Walk time: ${n.metroWalkMins} minutes.` },
    { key: 'safety', label: 'Lighting & Safety', color: '#3B5BDB', desc: `${n.lightsPerKm} streetlights/km. ${n.crossings} marked crossings.` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACE_JSON_LD) }} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#525866]">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/area" className="hover:underline">All Areas</Link>
          <span>/</span>
          <span className="font-semibold text-[#181D23]">{n.shortName}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {/* Hero */}
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#525866]">{n.zone}</span>
                  <h1 className="mt-1 text-2xl font-extrabold leading-tight text-[#181D23]">
                    Is {n.shortName} walkable?
                  </h1>
                  <p className="mt-0.5 text-sm text-[#525866]">{n.name} · Last street audit: {n.lastAudit}</p>
                </div>
                <div className="flex shrink-0 flex-col items-center rounded-2xl px-4 py-3 text-white shadow-sm" style={{ backgroundColor: tier.color }}>
                  <span className="font-mono text-3xl font-extrabold leading-none">{n.overall}</span>
                  <span className="mt-0.5 text-[11px] font-bold uppercase tracking-wider opacity-90">/ 100</span>
                  <span className="mt-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold">{tier.grade} · {tier.label}</span>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#3F4654]">{n.summary}</p>
            </div>

            {/* 4-Pillar Breakdown */}
            <section className="mt-6">
              <h2 className="text-lg font-extrabold text-[#181D23]">Street-Audit Pillar Breakdown</h2>
              <p className="mt-1 text-sm text-[#525866]">Each pillar is scored out of 100. The overall score is their equal-weighted average.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {pillars.map((p) => (
                  <div key={p.key} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#181D23]">{p.label}</span>
                      <span className="font-mono text-lg font-extrabold" style={{ color: p.color }}>{n.scores[p.key]}<span className="text-xs font-normal text-[#525866]">/100</span></span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EFECE5]">
                      <div className="h-full rounded-full transition-all" style={{ width: `${n.scores[p.key]}%`, backgroundColor: p.color }} />
                    </div>
                    <p className="mt-2 text-xs text-[#525866]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Telemetry table */}
            <section className="mt-6">
              <h2 className="text-lg font-extrabold text-[#181D23]">Field Measurement Data</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-black/6">
                    {[
                      ['Footpath Continuity', `${n.footpathContinuity}%`],
                      ['Average Footpath Width', `${n.avgWidthM} m`],
                      ['Tree Canopy Coverage', `${n.canopyCoverage}%`],
                      ['Heat Island Δ vs Baseline', `${n.heatDeltaC > 0 ? '+' : ''}${n.heatDeltaC}°C`],
                      ['Nearest Metro Station', n.metroStation],
                      ['Metro Walk Time', `${n.metroWalkMins} minutes`],
                      ['Streetlights / km', `${n.lightsPerKm}`],
                      ['Marked Pedestrian Crossings', `${n.crossings}`],
                    ].map(([k, v]) => (
                      <tr key={k} className="flex items-center justify-between px-4 py-2.5">
                        <td className="text-xs font-semibold text-[#525866]">{k}</td>
                        <td className="font-mono text-xs font-bold text-[#181D23]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Corridor segments */}
            <section className="mt-6">
              <h2 className="text-lg font-extrabold text-[#181D23]">Audited Street Corridors</h2>
              <p className="mt-1 text-sm text-[#525866]">Status: <strong>Walkable</strong> = unobstructed, adequate width · <strong>Needs Repair</strong> = gaps or hazards · <strong>Blocked</strong> = inaccessible.</p>
              <ul className="mt-3 space-y-3">
                {n.corridors.map((c) => (
                  <li key={c.name} className="rounded-xl border border-black/10 bg-white p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#181D23]">{c.name}</h3>
                        <p className="mt-0.5 text-xs text-[#525866]">{c.km} km · {c.note}</p>
                      </div>
                      <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color: statusColor[c.status], backgroundColor: statusBg[c.status] }}>{c.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Strengths & Pain points */}
            <section className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <h2 className="text-sm font-bold text-emerald-900">What Works</h2>
                <ul className="mt-2 space-y-1 text-xs text-emerald-900">
                  {n.highlights.map((h) => <li key={h}>✓ {h}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
                <h2 className="text-sm font-bold text-orange-900">Friction Points</h2>
                <ul className="mt-2 space-y-1 text-xs text-orange-900">
                  {n.painPoints.map((p) => <li key={p}>⚠ {p}</li>)}
                </ul>
              </div>
            </section>

            {/* CTA */}
            <div className="mt-6 rounded-2xl border border-[#D96B27]/30 bg-orange-50 p-5">
              <h2 className="text-sm font-bold text-[#181D23]">Know a pedestrian hazard in {n.shortName}?</h2>
              <p className="mt-1 text-xs text-[#525866]">Help improve this audit by reporting broken footpaths, missing crossings, encroachments, or dark streets.</p>
              <Link href="/report" className="mt-3 inline-block rounded-xl bg-[#D96B27] px-4 py-2 text-xs font-bold text-white hover:bg-[#C25C1D]">
                Report a Street Issue →
              </Link>
            </div>
          </div>

          {/* Sidebar: related areas */}
          <aside>
            <div className="sticky top-20">
              <h2 className="text-sm font-bold text-[#181D23]">Other Hyderabad Areas</h2>
              <ul className="mt-3 space-y-2">
                {others.map((o) => {
                  const t = getScoreTier(o.overall);
                  return (
                    <li key={o.slug}>
                      <Link href={`/area/${o.slug}`} className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm font-semibold text-[#181D23] hover:border-black/25 hover:shadow-sm">
                        <span>{o.shortName}</span>
                        <span className="font-mono text-xs font-bold" style={{ color: t.color }}>{o.overall}/100</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/area" className="mt-3 block text-center text-xs font-bold text-[#0E7C7B] hover:underline">View all 10 areas →</Link>

              <div className="mt-6 rounded-xl bg-[#F7F5F0] p-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#525866]">How is this score calculated?</h2>
                <p className="mt-1 text-xs text-[#525866]">Equal 25% weight across shade, footpath quality, Metro access, and safety. <Link href="/about" className="font-semibold text-[#0E7C7B] hover:underline">Full methodology →</Link></p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
