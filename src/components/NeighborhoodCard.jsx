import Link from 'next/link';
import { NEIGHBORHOODS, getScoreTier } from '@/lib/data';

export default function NeighborhoodCard({ n }) {
  const tier = getScoreTier(n.overall);
  const statusColor = { Walkable: '#1F7A4C', 'Needs Repair': '#D96B27', Blocked: '#B91C1C' };
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-black/25 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#525866]">{n.zone}</span>
          <h2 className="mt-0.5 text-sm font-bold text-[#181D23]">
            <Link href={`/area/${n.slug}`} className="hover:text-[#0E7C7B] hover:underline">
              {n.name}
            </Link>
          </h2>
        </div>
        <div
          className="flex shrink-0 flex-col items-center rounded-xl px-2.5 py-1.5 text-white"
          style={{ backgroundColor: tier.color }}
          aria-label={`Overall walkability score ${n.overall} out of 100, Grade ${tier.grade}`}
        >
          <span className="font-mono text-lg font-extrabold leading-none">{n.overall}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider opacity-90">{tier.grade}</span>
        </div>
      </div>

      {/* 4-pillar mini bars */}
      <div className="mt-3 grid grid-cols-4 gap-1 text-[10px]">
        {[
          { key: 'shade', label: 'Shade', color: '#1F7A4C' },
          { key: 'footpath', label: 'Path', color: '#D96B27' },
          { key: 'metro', label: 'Metro', color: '#0E7C7B' },
          { key: 'safety', label: 'Safety', color: '#3B5BDB' },
        ].map((p) => (
          <div key={p.key} className="space-y-0.5">
            <div className="flex justify-between font-semibold text-[#525866]">
              <span>{p.label}</span>
              <span className="font-mono text-[#181D23]">{n.scores[p.key]}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#EFECE5]">
              <div className="h-full rounded-full" style={{ width: `${n.scores[p.key]}%`, backgroundColor: p.color }} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#525866]">{n.summary}</p>

      <div className="mt-3 flex items-center justify-between border-t border-black/6 pt-2 text-xs">
        <span className="text-[#525866]">Metro: <strong className="text-[#181D23]">{n.metroWalkMins} min walk</strong></span>
        <Link
          href={`/area/${n.slug}`}
          className="font-bold text-[#0E7C7B] hover:underline"
          aria-label={`Full street audit for ${n.name}`}
        >
          Full audit →
        </Link>
      </div>
    </article>
  );
}
