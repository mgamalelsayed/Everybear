import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { BRANDS } from '@/lib/work';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://everybear.net';

const STATIC_PATHS = ['', '/work', '/studio', '/connect'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
    for (const brand of BRANDS) {
      entries.push({
        url: `${BASE_URL}/${locale}/work/${brand.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
