import './globals.css';
import Nav from '@/components/Nav';
import { SITE_NAME, SITE_URL } from '@/lib/data';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Hyderabad Walkability Explorer & Pedestrian Issue Map`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Explore walkability scores, street audits, and pedestrian infrastructure data for 10 Hyderabad neighbourhoods. Report street hazards, compare Metro access, canopy shade, and footpath quality.',
  keywords: ['Hyderabad walkability', 'walkable Hyderabad', 'Hyderabad pedestrian', 'walk score Hyderabad', 'Hyderabad footpath', 'Hyderabad Metro last mile'],
  authors: [{ name: 'Walkable HYD' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Hyderabad Walkability Explorer`,
    description:
      'Street-audit walkability scores for Jubilee Hills, Necklace Road, Charminar, HITEC City, Banjara Hills, Ameerpet, Gachibowli, and more.',
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Walkable HYD — Hyderabad Walkability Map' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Hyderabad Walkability Explorer`,
    description: 'Street-audit walkability scores, canopy shade, Metro access, and pedestrian issue reporting for Hyderabad neighbourhoods.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/icons/favicon.ico',
  },
  manifest: '/site.webmanifest',
  alternates: { canonical: SITE_URL },
};

export const viewport = {
  themeColor: '#181D23',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="mt-16 border-t border-black/10 bg-white py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-bold text-[#181D23]">Walkable HYD</p>
                <p className="mt-1 text-xs text-[#525866]">Open street-audit data for a more walkable Hyderabad.</p>
              </div>
              <nav aria-label="Footer navigation">
                <p className="text-xs font-bold uppercase tracking-wider text-[#525866]">Pages</p>
                <ul className="mt-2 space-y-1 text-xs text-[#181D23]">
                  <li><a href="/" className="hover:underline">Home</a></li>
                  <li><a href="/area" className="hover:underline">All Neighbourhoods</a></li>
                  <li><a href="/about" className="hover:underline">About &amp; Methodology</a></li>
                  <li><a href="/report" className="hover:underline">Report a Street Issue</a></li>
                </ul>
              </nav>
              <nav aria-label="Neighbourhood links">
                <p className="text-xs font-bold uppercase tracking-wider text-[#525866]">Top Areas</p>
                <ul className="mt-2 space-y-1 text-xs text-[#181D23]">
                  <li><a href="/area/jubilee-hills-kbr" className="hover:underline">Jubilee Hills</a></li>
                  <li><a href="/area/secunderabad-parade-ground" className="hover:underline">Secunderabad</a></li>
                  <li><a href="/area/necklace-road-hussain-sagar" className="hover:underline">Necklace Road</a></li>
                  <li><a href="/area/hitec-city-durgam-cheruvu" className="hover:underline">HITEC City</a></li>
                  <li><a href="/area/gachibowli" className="hover:underline">Gachibowli</a></li>
                </ul>
              </nav>
            </div>
            <p className="mt-6 text-[11px] text-[#525866]">© 2026 Walkable HYD. Data sourced from citizen street audits. Not affiliated with GHMC or Hyderabad Metro Rail.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
