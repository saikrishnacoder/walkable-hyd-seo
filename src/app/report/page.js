import Link from 'next/link';
import { SITE_URL } from '@/lib/data';

export const metadata = {
  title: 'Report a Pedestrian Street Issue — Walkable HYD',
  description: 'Report broken footpaths, missing crossings, encroachments, or unsafe lighting in Hyderabad. Help improve pedestrian infrastructure data.',
  alternates: { canonical: `${SITE_URL}/report` },
};

export default function ReportPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#525866]">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="font-semibold text-[#181D23]">Report an Issue</span>
      </nav>

      <h1 className="text-2xl font-extrabold text-[#181D23]">Report a Pedestrian Street Issue in Hyderabad</h1>
      <p className="mt-2 text-sm leading-relaxed text-[#525866]">
        Spotted a broken footpath, missing zebra crossing, encroachment, or dark street? Fill out the form below. Reports are reviewed and added to the neighbourhood audit data within 48 hours.
      </p>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-xs text-[#525866]">
          The interactive issue reporter with live map pin placement is available on the{' '}
          <a href="https://walkable-hyd.vercel.app" className="font-semibold text-[#0E7C7B] hover:underline">
            full app
          </a>
          . A lightweight static form is coming to this page shortly.
        </p>

        <form className="mt-5 space-y-4" aria-label="Report a pedestrian issue">
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-[#181D23]">Issue Summary *</label>
            <input id="title" name="title" type="text" required placeholder="e.g. Broken kerb ramp blocking wheelchair access" className="mt-1 w-full rounded-xl border border-black/15 bg-[#FAF9F6] px-3 py-2 text-sm text-[#181D23] placeholder:text-[#88909E]" />
          </div>
          <div>
            <label htmlFor="street" className="block text-xs font-bold text-[#181D23]">Street / Landmark *</label>
            <input id="street" name="street" type="text" required placeholder="e.g. Road No. 36, near Jubilee Hills Check Post Pillar 1564" className="mt-1 w-full rounded-xl border border-black/15 bg-[#FAF9F6] px-3 py-2 text-sm text-[#181D23] placeholder:text-[#88909E]" />
          </div>
          <div>
            <label htmlFor="description" className="block text-xs font-bold text-[#181D23]">Description *</label>
            <textarea id="description" name="description" rows={3} required placeholder="Describe what makes walking difficult here..." className="mt-1 w-full rounded-xl border border-black/15 bg-[#FAF9F6] px-3 py-2 text-sm text-[#181D23] placeholder:text-[#88909E]" />
          </div>
          <div>
            <label htmlFor="reporter" className="block text-xs font-bold text-[#181D23]">Your Name (optional)</label>
            <input id="reporter" name="reporter" type="text" placeholder="e.g. Priya D." className="mt-1 w-full rounded-xl border border-black/15 bg-[#FAF9F6] px-3 py-2 text-sm text-[#181D23] placeholder:text-[#88909E]" />
          </div>
          <button type="submit" className="rounded-xl bg-[#D96B27] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#C25C1D]">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
