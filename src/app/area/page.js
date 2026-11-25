import Link from 'next/link';
import { NEIGHBORHOODS, getScoreTier, SITE_URL } from '@/lib/data';
import NeighborhoodCard from '@/components/NeighborhoodCard';

export const metadata = {
  title: 'All Walkable Hyderabad Neighbourhoods',
  description: 'Street-audit walkability scores for 10 Hyderabad neighbourhoods. Find out if your area has good footpaths, shade, Metro access, and safe crossings.',
  alternates: { canonical: `${SITE_URL}/area` },
};

const sorted = [...NEIGHBORHOODS].sort((a, b) => b.overall - a.overall);

export default function AllAreasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#525866]">
        <Link href="/" className="hover:text-[#181D23] hover:underline">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#181D23]">All Areas</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-[#181D23]">All Hyderabad Walkability Audits</h1>
      <p className="mt-2 text-sm leading-relaxed text-[#525866]">
        10 Hyderabad neighbourhoods ranked by walkability. Each area is audited across four pillars: <strong>Canopy &amp; Shade</strong>, <strong>Footpath Quality</strong>, <strong>Metro &amp; Transit Access</strong>, and <strong>Lighting &amp; Safety</strong>. Click any area for the full street-audit report.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((n) => <NeighborhoodCard key={n.slug} n={n} />)}
      </div>

      {/* Quick table for crawlers */}
      <section className="mt-12">
        <h2 className="text-lg font-extrabold text-[#181D23]">Walkability Score Summary Table</h2>
        <p className="mt-1 text-sm text-[#525866]">All scores out of 100. Higher is better.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/8 text-[11px] font-bold uppercase tracking-wider text-[#525866]">
                <th className="px-4 py-3">Neighbourhood</th>
                <th className="px-4 py-3">Zone</th>
                <th className="px-4 py-3 text-right">Overall</th>
                <th className="px-4 py-3 text-right">Shade</th>
                <th className="px-4 py-3 text-right">Footpath</th>
                <th className="px-4 py-3 text-right">Metro</th>
                <th className="px-4 py-3 text-right">Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/6">
              {sorted.map((n) => {
                const tier = getScoreTier(n.overall);
                return (
                  <tr key={n.slug} className="hover:bg-[#FAF9F6]">
                    <td className="px-4 py-3 font-semibold text-[#181D23]">
                      <Link href={`/area/${n.slug}`} className="hover:text-[#0E7C7B] hover:underline">{n.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#525866]">{n.zone}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-block rounded-lg px-2 py-0.5 font-mono text-xs font-bold text-white" style={{ backgroundColor: tier.color }}>{n.overall}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{n.scores.shade}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{n.scores.footpath}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{n.scores.metro}</td>
                    <td className="px-4 py-3 text-right font-mono text-xs">{n.scores.safety}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
