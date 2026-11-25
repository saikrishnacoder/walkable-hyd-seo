import Link from 'next/link';
import { NEIGHBORHOODS, getScoreTier, SITE_NAME } from '@/lib/data';

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#181D23]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#181D23] text-sm text-white">🚶</span>
          <span className="text-base font-extrabold tracking-tight">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 text-sm font-semibold text-[#525866] sm:flex">
          <Link href="/" className="hover:text-[#181D23]">Home</Link>
          <Link href="/area" className="hover:text-[#181D23]">All Areas</Link>
          <Link href="/about" className="hover:text-[#181D23]">About &amp; Methodology</Link>
        </nav>
        <Link
          href="/report"
          className="rounded-xl bg-[#D96B27] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#C25C1D]"
        >
          Report Issue
        </Link>
      </div>
    </header>
  );
}
