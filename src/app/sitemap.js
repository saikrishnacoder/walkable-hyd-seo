import { NEIGHBORHOODS, SITE_URL } from '@/lib/data';

export default function sitemap() {
  const areaUrls = NEIGHBORHOODS.map((n) => ({
    url: `${SITE_URL}/area/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/area`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/report`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...areaUrls,
  ];
}
